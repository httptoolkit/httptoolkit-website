---
title: "Inspecting Android HTTP with a fake VPN"
date: '2020-08-25T12:20'
cover_image: './header-images/vpn-active.jpg'
hackerNewsUrl: https://news.ycombinator.com/item?id=24270698
redditUrl: https://www.reddit.com/r/androiddev/comments/igbe2p/inspecting_android_http_with_a_fake_vpn/
twitterUrl: https://twitter.com/HttpToolkit/status/1298241363444727808
---

**Can you build an Android app that can inspect & rewrite the network traffic from every other app on the device?**

In turns out that, yes, you can. **[HTTP Toolkit](/android/)** does exactly this, by building an app on top of the Android VPN APIs that fully simulates a fake VPN connection entirely within the device.

Here I want to talk through how that works, look at the code that makes it happen, and show you how you can do the same thing for yourself.

To be clear, this is not intended (or very effective) as a attack on the security of traffic from the device. When you actually do this Android provides clear warnings & permission prompts to the user during setup, and requires persistent UI notifications any time this is active. In addition this doesn't give you any way to read the contents of encrypted traffic, by default (in the next post, we'll talk about how HTTP Toolkit _can_ do that).

There are some interesting & constructive use cases this opens up though for developer tooling. For example:

* Inspecting & rewriting mobile traffic for testing & debugging (this is [HTTP Toolkit](/android/)'s raison d'être).
* Building a firewall for Android that blocks outgoing app connections according to your custom rules.
* Recording metrics on the traffic sent & received by your device.
* Simulating connection issues by adding delays or randomly injecting packet resets.

## How do Android VPNs work?

The Android developer docs have a [VPN guide](https://developer.android.com/guide/topics/connectivity/vpn), which is a good starting point.

These VPN APIs allow you to register a service in your app, which when activated is given a file descriptor that backs a network tunnel interface.

That tunnel interface is then used by the whole device for all network traffic. In addition, your VPN service is given the power to create protected sockets that don't use this tunnel, so the VPN app can communicate with the network without going through itself.

Once this is activated, when an app sends some data, instead of that going out to the network, each IP packet is buffered behind this file descriptor. When you read from it you're given raw network bytes directly, and when you write bytes to it they're treated as bytes received directly from the network interface.

This is designed to allow implementing a VPN connection in your app. In that case, your app would forward all the read bytes directly to a VPN provider over some protected separate connection, without any substantial processing of them on the device. The VPN provider would then forward that data on as part of the VPN's traffic, forward response packets back to your app over your connection, and you'd write the resulting packets back to the file descriptor.

That's what's this is primarily designed for, but that doesn't mean that that's all we can do with it.

## When is a VPN not a VPN?

Once we have a VPN service running, our app will receive every network byte the device sends, and has the power to inject raw bytes back.

**Things get interesting if rather than forwarding these bytes to a VPN provider, we examine them, and then simply put them straight back on the real network**. In that case, we get to see every network byte, but we don't interfere with the network connection of the device, and we don't need an externally hosted VPN provider to do it.

Unfortunately that's easier said than done. Our file descriptor works with raw IP data, but Android doesn't actually have an API for us to send raw IP data anywhere else. Instead, we have higher level APIs for TCP and UDP, and the IP part is always done invisibly under the hood.

If we want to proxy these bytes, we need to match these two APIs up. We need to:

* When we read an IP packet from our tunnel:
    * Parse the raw packet bytes into an IP packet.
    * Parse the TCP/UDP packet within and extract its content.
    * (For TCP) Track the connection state of the overall TCP connection, and ack/fin/etc each packet in the session appropriately.
    * Send the equivalent TCP/UDP content upstream, using Android's TCP/UDP APIs.
* When we receive a TCP/UDP response from upstream:
    * (For TCP) Match that to the tunnelled TCP connection.
    * Build our own complete TCP/UDP + IP packet data around the received data.
    * Write the resulting bytes back into the tunnel.
    * Cleanly (or messily) close connections when the upstream socket is done.

This is quite complicated. We effectively need to reimplement UDP & TCP from scratch!

Fortunately, we're not the first people to want to do this. Most of the existing implementations are unmaintained demos, but they are open-source so we can build upon them! My own solution is based on a GitHub proof-of-concept called [ToyShark](https://github.com/LipiLee/ToyShark) (a pun on Wireshark, I assume) which was in turn based on some of the open-source network collection internals of an old AT&T project called [Application Resource Optimizer](https://web.archive.org/web/20220303181059/https://www.att.com/gen/press-room?pid=22388) ([source](https://github.com/attdevsupport/ARO/tree/master/ClientCollectors/Non-rooted-ARODataCollector/ARO.Android.Net/src/main/java/com/att/aro/android/arocollector)).

The resulting HTTP Toolkit Android app implements all the above. This is 100% free & open-source (**[github.com/httptoolkit/httptoolkit-android](https://github.com/httptoolkit/httptoolkit-android)**) so similar open-source implementations in future can build upon it in turn.

This implementation acts as a VPN, while proxying all traffic back onto the real network, all without native code, just powered by [Java NIO](https://en.wikipedia.org/wiki/Non-blocking_I/O_(Java)).

The core VPN implementation is in [src/main/java/tech/httptoolkit/android/vpn](https://github.com/httptoolkit/httptoolkit-android/tree/070830e3ea3d2cadf141468a83c83b6d078272ac/app/src/main/java/tech/httptoolkit/android/vpn), and there's a README there with an outline of the implementation details. We'll explore this a little more below, as we look at ways to extend it.

There is a performance penalty to all this of course, in both network bandwidth and latency. The impact isn't really noticeable in normal usage on any modern device though. On cellular connections it's usually dwarfed by the underlying connection performance, and even on wifi you can reach quite acceptable numbers:

![Android speed test screenshot](./android-interception-performance.jpeg)

This could probably be improved further by rewriting the Java code as a native code, but that entails significant extra complexity. For the HTTP Toolkit use case (targeted debugging, rather than heavy everyday usage) it's not worth it.

With that in place, we now transparently receive every network packet from the device. We can inspect it as we'd like, and even edit that traffic, through either the raw IP stream or the parsed TCP/UDP packet data. To what end?

## How can we use this?

In HTTP Toolkit's case, the usage of this is very direct: we forcibly redirect all HTTP(S) traffic via the debugging proxy (which is running on your local development machine). That proxy then lets you inspect and rewrite all the traffic there as you see fit.

There's a demo video on [the Android page](/android/) if you want to see this in action.

To do this, we check the target port of outgoing TCP connections, and rewrite the address if it's one of our configured HTTP ports (e.g. 80, 443, ...), by just adding the following lines into [TCP session setup](https://github.com/httptoolkit/httptoolkit-android/blob/b4cb5a97d48d299958b4e7a907b41fc9b44d2129/app/src/main/java/tech/httptoolkit/android/vpn/SessionManager.java#L169-L212):

```java{9,10,11}
public Session createNewTCPSession(int ip, int port, int srcIp, int srcPort)
        throws IOException {
    // ...

    String ips = PacketUtil.intToIPAddress(ip);

    // Use the given target address, unless tcpPortRedirection has specified
    // a different target address for traffic on this port:
    SocketAddress socketAddress = tcpPortRedirection.get(port) != null
        ? tcpPortRedirection.get(port)
        : new InetSocketAddress(ips, port);

    channel.connect(socketAddress);

    // ...
}
```

That forcibly sends all the matching traffic to the proxy, and immediately gives us full visibility into HTTP traffic. On Android 10 we also set [a VPN proxy configuration](https://developer.android.com/reference/android/net/VpnService.Builder#setHttpProxy(android.net.ProxyInfo)), which catches most traffic on further ports that aren't explicitly matched (although in that case it's advisory default configuration, rather than enforced redirection).

That's enough to redirect traffic for remote inspection & rewriting. How else could you extend this? Let's talk about the 3 other use cases I mentioned at the start:

### Blocking outgoing connections

To block outgoing connections to specific addresses or on specific ports, you just need to throw away the packets after you receive them from the VPN interface, once you've parsed them to work out where they're going.

You can use this to block specific hosts you don't like, block DNS requests for certain addresses to build an on-device [Pi-Hole](https://pi-hole.net/), or allow traffic only to a short trusted list of hosts to lock down your networking entirely.

In HTTP Toolkit's implementation, SessionHandler's [`handlePacket`](https://github.com/httptoolkit/httptoolkit-android/blob/070830e3ea3d2cadf141468a83c83b6d078272ac/app/src/main/java/tech/httptoolkit/android/vpn/SessionHandler.java#L79) is where we handle the raw packet data that the device wants to send. It looks like this:

```java{9}
public void handlePacket(@NonNull ByteBuffer stream)
        throws PacketHeaderException, IOException {
    final byte[] rawPacket = new byte[stream.limit()];
    stream.get(rawPacket, 0, stream.limit());
    stream.rewind();

    final IPv4Header ipHeader = IPPacketFactory.createIPv4Header(stream);

    // TODO: inspect ipHeader here, and 'return' to drop the packet

    if (ipHeader.getProtocol() == 6) {
        handleTCPPacket(stream, ipHeader);
    } else if (ipHeader.getProtocol() == 17) {
        handleUDPPacket(stream, ipHeader);
    } else if (ipHeader.getProtocol() == 1) {
        handleICMPPacket(stream, ipHeader);
    } else {
        Log.w(TAG, "Unsupported IP protocol: " + ipHeader.getProtocol());
    }
}
```

From that we can drop packets entirely based on the target address or port in the IP header, by simply doing nothing.

Dropping a packet here is literally packet loss, where the app sending the original request will never hear any response at all.

Alternatively, for more complex rules you can make changes within specific protocol handling, e.g. the `handleTCPPacket` or `handleUDPPacket` methods above. In both cases you can examine the parsed TCP/UDP packets, and drop them there (or in the TCP case, inject an immediate RST packet to tell the app the connection failed).

### Recording traffic metrics

Want to know what your device sends and receives? Normally Android makes that more or less invisible. Within a fake VPN application like this though you have every network byte, so it's easy to examine and record data about outgoing & incoming packets.

It's simplest to do total byte metrics by address and/or port, but you could also build more complex analyses of packet data itself. E.g. tracking the duration of TCP sessions with certain hosts, recording metrics about the unencrypted data available, or looking at DNS UDP packets to examine which hostnames you're looking up.

For this codebase, we can easily capture outgoing traffic in the `handlePacket` method above. We have the raw IP packet data there, and the full TCP & UDP data is just a little more parsing away.

To track incoming traffic, we'd need to look at the code that handles the upstream connections. For example in [`readTCP`](https://github.com/httptoolkit/httptoolkit-android/blob/070830e3ea3d2cadf141468a83c83b6d078272ac/app/src/main/java/tech/httptoolkit/android/vpn/socket/SocketChannelReader.java#L85-L117) from `SocketChannelReader`, where upstream TCP data is received:

```java
private void readTCP(@NonNull Session session) {
    // ...

    try {
        do {
            len = channel.read(buffer);
            if (len > 0) {
                // We're received some TCP data from the external network:
                sendToRequester(buffer, len, session);
                buffer.clear();
            } else if (len == -1) {
                // The external network connection is finished:
                sendFin(session);
                session.setAbortingConnection(true);
            }
        } while (len > 0);
    }

    // ...
}
```

At this point, we're handling the contents of the TCP connection, before we pack it back up into the raw bytes for the VPN interface.

By examining the TCP data read here and associating it with the IP & port of the TCP session, you can quickly start to build a view into your device's network communication.

### Simulating connection issues

It's possible to simulate connection issues on the device too. That's especially useful to test how applications handle low-quality internet connections and network errors.

Unfortunately you can't simulate _all_ issues, as Android's APIs give us limited control of upstream traffic. We control the contents of upstream TCP & UDP packets, but not the raw network connection itself. That means, for example, we can't simulate our device sending the wrong upstream packet sequence number or corrupting a TCP checksum, but we can simulate the device receiving such packets.

There's still a lot of interesting things you can simulate with this:

* Incoming or outgoing packet loss, where some packets simply disappear in transit.
* Repeated or misordered packets.
* Random connection resets (similar to [tcpkill](https://en.wikipedia.org/wiki/Tcpkill)).
* Delays to packets, in either direction.

In each case you'd normally do this probabilistically, so that 10% of connections fail, or packets are delayed by 500ms on average.

When you do this, you'll often see some surprising results and errors in your app. In effect we're doing on-device [chaos engineering](https://en.wikipedia.org/wiki/Chaos_engineering).

Adding random connection resets like this will usually result in very visible TCP connection failures, causing random HTTP requests, raw network sockets or whatever else to suddenly fail and disconnect.

Packet loss and ordering issues meanwhile are normally be handled at the TCP level, invisibly to your application code, but the process of doing so can result in unpredictable performance, and cause real issues at the application level.

During day-to-day development it's very easy to never see these issues, given the fast & reliable wifi in your office or at home, and simulating rural 2G issues like this can be eye-opening!

You do most of this at a very low level, just hooking into the places where individual raw IP packets are passed to and from the VPN. For TCP error simulation though, you'll need a lot more information about the TCP connection itself, to find packets to reorder, or to inject RSTs into active connections.

In the HTTP Toolkit app specifically:

* [`ClientPacketWriter`](https://github.com/httptoolkit/httptoolkit-android/blob/070830e3ea3d2cadf141468a83c83b6d078272ac/app/src/main/java/tech/httptoolkit/android/vpn/ClientPacketWriter.java#L67) is where raw IP data is written back to the VPN (incoming IP packets). At this stage we can easily drop, corrupt or delay incoming packets at the IP level.
* [`handlePacket`](https://github.com/httptoolkit/httptoolkit-android/blob/master/app/src/main/java/tech/httptoolkit/android/vpn/SessionHandler.java#L74-L95) again in `SessionHandler`, would allow us to drop, delay or otherwise react to outgoing packets.
* SessionHandler also controls the TCP flow of each connection to process each packet, allowing us to hook into that flow directly. For example, you could extend [`replySynAck`](https://github.com/httptoolkit/httptoolkit-android/blob/master/app/src/main/java/tech/httptoolkit/android/vpn/SessionHandler.java#L360-L386) to schedule a connection reset (just a call to `resetConnection`) for 50% of new connections 2s after they're created.
* [`SessionManager`](https://github.com/httptoolkit/httptoolkit-android/blob/master/app/src/main/java/tech/httptoolkit/android/vpn/SessionManager.java) stores the state controlled by `SessionHandler`. Given the list of active connections there, we could select random active TCP sessions and kill them according to whatever criteria you like.

As we've seen, the Android VPN APIs are powerful, and there's a lot of potential here.

With a few tricks like this to hook into network traffic, there's a whole world of interesting tools you can build. Give it a go! Have any thoughts or feedback? [Let me know](https://twitter.com/pimterry).

**Want to take your Android debugging to the next level? [HTTP Toolkit](/android/) gives you one-click HTTP(S) inspection & mocking for any Android app (plus lots of other tools too).**