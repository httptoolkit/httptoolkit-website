---
name: 'iOS'
title: 'Intercepting iOS HTTP'
order: 2
---

HTTP Toolkit can intercept traffic from any iOS device, including iPhones and iPads. This does not yet work totally automatically, but it's easy to do with some initial manual setup.

If you're interested in fully automated setup, see the [issue on GitHub](https://github.com/httptoolkit/httptoolkit/issues/11) tracking this feature, and +1 there to vote for this, or subscribe to that issue via GitHub to hear once that's available.

## Manual setup

To manually intercept HTTP, HTTPS & WebSocket traffic from an iPhone or iPad:

1. [Download](/) and install HTTP Toolkit on your computer, if you haven't already.
1. Start HTTP Toolkit on your computer and click the 'Anything' option on the Intercept page, to show the manual configuration details.
1. Ensure your iOS device is connected to the same WiFi network as your computer.
1. In the iOS WiFi settings, select the Wifi network -> Configure Proxy, and select Manual and set your device's proxy configuration to use your HTTP Toolkit's proxy port (as shown in the 'Anything' area, 8000 by default) and your computer's IP address on your local network.
1. Visit http://amiusing.httptoolkit.tech/certificate (n.b. HTTP, not HTTPS) in Safari on your iOS device when connected to the proxy, and it will download HTTP Toolkit's profile (the HTTPS CA certificate) and prompt you to install it.
    * Alternatively, you can export the certificate manually using the button in the 'Anything' option, transfer it to your phone and open it there to install the certificate.
1. Then go to Settings -> General -> About -> Certificate Trust, and enable "Full trust" for the HTTP Toolkit certificate.


You can confirm that the setup is working by visiting https://amiusing.httptoolkit.tech (note the HTTPS) in Safari. If this loads correctly showing the "You're being intercepted by HTTP Toolkit" message, then you're all set up and all traffic is being sent through HTTP Toolkit.

To disable interception when you're done, just remove the proxy configuration from your WiFi settings in iOS. There's no need to remove the CA certificate (the certificate is unique to your HTTP Toolkit install, and does not allow interception by anybody else) but you can remove that too if you'd prefer.