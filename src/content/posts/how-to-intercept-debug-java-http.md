---
title: How to intercept & debug all Java HTTPS
date: '2021-03-17T18:00'
cover_image: 'header-images/java.jpg'
tags: debugging, java, interception, tls
---

Java and the JVM more generally are widely used for services everywhere, but often challenging to debug and manually test, particularly in complicated microservice architectures.

HTTP requests and responses are the core of interactions between these services, and with their external APIs, but they're also often invisible and inaccessible. It's hard to examine all outgoing requests, simulate unusual responses & errors in a running system, or mock dependencies during manual testing & prototyping.

Over the last couple of weeks, I've built a Java agent which can do this, completely automatically. It can seize control of all HTTP & HTTPS requests in any JVM, either at startup or attaching later, to redirect them to a proxy and trust that proxy to decrypt all HTTPS, allowing MitM of all JVM traffic. Zero code changes or manual configuration required.

This means you can pick any JVM process - your own locally running service, Gradle, Intellij, anything you like - and inspect, breakpoint, and mock all of its HTTP(S) requests in 2 seconds flat.

In this article, I want to walk you through the details of how this is possible, so you can understand some of the secret powers of the JVM, learn how to transform raw bytecode for yourself, and build on the examples and [source code](https://github.com/httptoolkit/jvm-http-proxy-agent) behind this to build your own debugging & instrumentation tools.

**If you just want to try this out right now, [go download HTTP Toolkit](https://httptoolkit.com/java/)**.

If you want to know how on earth this is possible, and how you can write code that does the same, read on:

## What's going on here?

In some ways, intercepting all HTTP(S) should be easy: the JVM has standard HTTP proxy and SSL context configuration settings (e.g. `-Dhttp.proxy` and `-Djavax.net.ssl.trustStore`) so you could try to configure this externally by setting those options at startup.

Unfortunately for you, that doesn't work. Most modern libraries ignore these settings by default, opting to provide their own defaults and configuration interfaces. Even when the library doesn't, many applications define their own connection & TLS configuration explicitly. This is often convenient and sensible in general, but very inconvenient later when you want to start debugging and manually testing your HTTP interactions.

Instead of setting config values at startup that nobody uses, we can capture HTTP by force, using a Java agent. Java agents allow us to hook into a JVM process from the outside, to run our own code and rewrite existing bytecode.

When our agent is attached to the JVM (either at startup before everything loads, or later on) we match against specific classes used within built-in packages and a long list of popular external libraries, looking for everything from TLS configuration state to connection pool logic, and we inject a few small changes throughout. This lets us change defaults, ignore custom settings, recreate existing connections, and reconfigure all HTTP(S) to be intercepted by our HTTPS-intercepting proxy.

This is really cool! From outside a JVM process, we can use this to reliably rewrite arbitrary bytecode to change how all HTTP in a codebase works, and take control of the entire thing ourselves. It's aspect-orientated programming on steroids, and it's surprisingly easy to do.

Let's talk about the details.

## What's a Java agent?

A Java agent is a special type of JAR file, which can attach to other JVM processes, and is given extra powers by the JVM to transform and instrument bytecode.

They're widely used by JVM tooling, for everything from [application monitoring with New Relic](https://docs.newrelic.com/docs/agents/java-agent/) to [mutation testing with PiTest](https://github.com/hcoles/pitest/blob/master/pitest/src/main/java/org/pitest/boot/HotSwapAgent.java).

Despite the name, they're _not_ Java-only; they work for anything that runs on the JVM.

There's two ways to use a Java agent. You can either attach it at startup, like so:

```
java -javaagent:<agent-path.jar>=<agent args> -jar <your-jar.jar>
```

or you can attach it later dynamically, like so:

```java
// Using com.sun.tools.attach.VirtualMachine:
VirtualMachine vm = VirtualMachine.attach(pid)
vm.loadAgent(jarPath, agentArgS)
vm.detach()
```

The agent can have two separate entry points in its JAR manifest to manage this: one for attachment at startup, and one for attachment later. There are also JAR manifest attributes that opt into transformation of bytecode. Configuring that for a JAR built by gradle looks like this:

```groovy
jar {
    // A class which defines a static void premain(args: String, instrumentation: Instrumentation),
    // function that will run before the Main() of the primary JAR:
    attributes 'Premain-Class': 'tech.httptoolkit.javaagent.HttpProxyAgent'

    // A class (can be the same) which defines a similar 'agentmain' function, that will
    // run within the target JVM once the agent is attached:
    attributes 'Agent-Class': 'tech.httptoolkit.javaagent.HttpProxyAgent'

    // Can this agent do transformations, which receive class bytecode and transform it?
    attributes 'Can-Retransform-Classes': 'true'

    // Can this agent redefine classes entirely? This is an older API that is strictly more
    // limited I think, but you might as well take all the powers you can get...
    attributes 'Can-Redefine-Classes': 'true'
}
```

Lastly, you have an agent class that implements these methods. Like so:

```java
class AgentMain {
    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("Agent attached at startup");
    }

    public static void agentmain(String agentArgs, Instrumentation inst) {
        System.out.println("Agent attached to running VM");
    }
}
```

That [Instrumentation class](https://docs.oracle.com/en/java/javase/14/docs/api/java.instrument/java/lang/instrument/Instrumentation.html) we're given here provides us with methods like `addTransformer` and `redefineClasses` which we can use to read and overwrite the raw bytecode of any class in the VM.

HTTP Toolkit includes [an agent JAR](https://github.com/httptoolkit/jvm-http-proxy-agent) built from all the above, which allows it to attach to any JVM application, run code within that application (to set defaults and configuration values using normal APIs, where possible) and to transform and hook internals of all HTTP-related classes we care about.

The agent setup is just the first step though: this gives us almost complete power to change what the target application is doing, but working out how to transform classes is complicated, there are some limitations to our transformations, and handling raw bytecode isn't easy...

## How do you transform raw bytecode?

In short: using [Byte Buddy](https://bytebuddy.net/#/).

This is a complex library, which can do a lot of powerful things with bytecode including generating subclasses and interface implementations dynamically at runtime (e.g. for mocking frameworks), manually mutating classes and methods, and transforming bytecode automatically through templates.

In agent cases like HTTP Toolkit's, we're interested in the template approach, because there is a Java agent limitation: when reloading already loaded classes, the new definition must match the same class schema. That means we can add new logic into existing method bodies, but we can't create new methods or fields on existing classes, or make changes to existing method signatures.

To handle this, Byte Buddy's built-in 'advice' system defines method transformation templates, which it can apply for us whilst guaranteeing that the schema is never changed in any other way.

First, we need to set up Byte Buddy. This configuration seems to work nicely:

```java
var agentBuilder = new AgentBuilder.Default(
    // This allows you to transform non-Java classes, e.g. Kotlin (used in OkHttp)
    ByteBuddy().with(TypeValidation.DISABLED)
)
// Transform *everything* including some of the JVMs own built-in classes:
.ignore(none())
// Enable full transformation without class changes:
.with(AgentBuilder.TypeStrategy.Default.REDEFINE)
.with(AgentBuilder.RedefinitionStrategy.RETRANSFORMATION)
.disableClassFormatChanges()
// Log as we go (can be noisy - try withErrorsOnly/withTransformationsOnly if so):
.with(Listener.StreamWriting.toSystemOut());
```

Then, we define an Advice class which will transform our target. Advice classes look something like this:

```java
public class ReturnProxyAdvice {
    @Advice.OnMethodExit
    public static void proxy(@Advice.Return(readOnly = false) Proxy returnValue) {
        returnValue = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(
                HttpProxyAgent.getAgentProxyHost(),
                HttpProxyAgent.getAgentProxyPort()
        ));
    }
}
```

This says "at the end of the targeted method body, insert extra logic which replaces the return value with [our proxy value]".

The code here is effectively injected into the end of the method body (because of `Advice.OnMethodExit`), and annotations can be used on method parameters (like `@Advice.Return`) to link variables in this template method to method arguments, field values, `this`, or return values in the existing method body.

To tie this all together, we have to tell Byte Buddy when to apply this advice, like so:

```java
agentBuilder = agentBuilder
    .type(
        // Match the class we're interested in:
        named("com.squareup.okhttp.OkHttpClient")
    ).transform(
        // Provide a transformer that transforms that class:
        new AgentBuilder.Transformer() {
            @Override
            public DynamicType.Builder transform(
                DynamicType.Builder builder,
                TypeDescription typeDescription,
                ClassLoader classloader
            ) {
                // Map the advice class to a method (in this case: OkHttpClient.getProxy())
                return builder
                    .visit(Advice.to(ReturnProxyAdvice.class))
                        .on(hasMethodName("getProxy"))
            }
        });
```

Byte Buddy uses this fluent API to build maps from type matchers (like `named` here) to type transformers, and then build transformations that apply specific advice templates to methods matching certain patterns (e.g. `hasMethodName("getProxy")`).

The above code is effectively the real implementation logic we use to intercept OkHttp: for all OkHttpClient instances, even ones that are already instantiated when we attach, we override `getProxy()` so it always returns our proxy configuration, regardless of its previous configuration. This ensures that all new connections from all OkHttp clients go to our proxy.

This is just part of one simple case though (the full OkHttp logic is [here](https://github.com/httptoolkit/jvm-http-proxy-agent/blob/main/src/main/kotlin/tech/httptoolkit/javaagent/OkHttpClientTransformers.kt)) and doing this for _all_ HTTP is significantly more involved...

## What transformations allow you to capture all HTTPS?

With the above, we can build a Java agent that can attach to a JVM target, and easily arbitrarily transform method bodies.

Usefully intercepting HTTP(S) still requires us to find the method bodies we care about though, and work out how to transform them.

In practice, there's three steps to transforming any target library to intercept HTTPS:

* Redirect new connections to go via the HTTP Toolkit proxy server
* Trust the HTTP Toolkit certificate during HTTPS connection setup
* Reset/stop using any open non-proxied connections when attaching to already running applications

I'm not going to walk through the detailed implementation of that for every version of every supported library (if you're interested, feel free to [explore the full source](https://github.com/httptoolkit/jvm-http-proxy-agent)) but let's look at a couple of illustrative examples.

Some of this logic is written in Kotlin, and it uses a few helpers on top of the above, but if you've read the above and you understand Java you'll get the gist:

### Intercepting Apache HttpClient:

Apache HttpClient is part of their [HttpComponents project](https://hc.apache.org/index.html), a successor to the venerable Commons HttpClient library.

It's been around for a long time in various forms, it's very widely used, and fortunately it's very easy to intercept.

For v5, for example, all outgoing traffic runs through an implementation of the `HttpRoutePlanner` interface, which decides where requests should be sent.

We just need to change the return value for all implementations of that interface:

```java
// First, we create an advice class that modifies the existing return value of this method:
public class ApacheV5ReturnProxyRouteAdvice {
    @Advice.OnMethodExit
    public static void determineRoute(
            @Advice.Return(readOnly = false) HttpRoute returnValue
    ) {
        returnValue = new HttpRoute(
            returnValue.getTargetHost(),
            returnValue.getLocalAddress(),
            new HttpHost(
                HttpProxyAgent.getAgentProxyHost(),
                HttpProxyAgent.getAgentProxyPort()
            ),
            returnValue.isSecure()
        );
    }
}

// Then, elsewhere, we apply that to all implementations that plan routes:
class ApacheClientRoutingV5Transformer(logger: TransformationLogger) : MatchingAgentTransformer(logger) {
    override fun register(builder: AgentBuilder): AgentBuilder {
        // Match all concrete implementations of a given type:
        return builder.type(
            hasSuperType(named("org.apache.hc.client5.http.routing.HttpRoutePlanner"))
        ).and(
            not(isInterface())
        ).transform(this)
    }

    override fun transform(builder: DynamicType.Builder<*>): DynamicType.Builder<*> {
        // Match the method defined in the interface, and apply the above Advice:
        return builder.visit(
            Advice.to(ApacheV5ReturnProxyRouteAdvice.class)
                .on(hasMethodName("determineRoute"))
        )
    }
}
```

With that alone, we've redirected all traffic elsewhere.

Meanwhile resetting all SSL connections requires [prepending to SSL socket creation](https://github.com/httptoolkit/jvm-http-proxy-agent/blob/d5b59627a3a57add84f4ca192ed44552ec429c77/src/main/kotlin/tech/httptoolkit/javaagent/ApacheClientTransformers.kt#L47-L69) to change the SSL configuration.

As a nice bonus, the above `HttpRoutePlanner` approach means we don't even need to reset connections: request routes no longer match existing open connections, so requests immediately stop using those connections, start using our proxy instead, and the existing connections harmlessly time out.

### Intercepting Java's built-in ProxySelector:

Let's try something more difficult: we can rewrite a built-in Java class? Yes we can.

When our agent first attaches, it [changes the default ProxySelector](https://github.com/httptoolkit/jvm-http-proxy-agent/blob/d5b59627a3a57add84f4ca192ed44552ec429c77/src/main/kotlin/tech/httptoolkit/javaagent/AgentMain.kt#L166-L168) using the normal public APIs, so that any code using Java's default proxy selector automatically uses our proxy with no transformation required.

Unfortunately though, some applications manually manage proxy selectors, and this could result in HTTP not being intercepted.

To fix this, we set the proxy selector using the normal `ProxySelector.setDefault()` API during agent setup, and then later we transform the built-in class to disable that setter completely, so nobody else can change it.

That looks like this:

```java
// First, we define an advice that tells Byte Buddy to skip a method body entirely:
public class SkipMethodAdvice {
    // This will run before the method, and will skip the real body if we return true
    @Advice.OnMethodEnter(skipOn = Advice.OnNonDefaultValue.class)
    public static boolean skipMethod() {
        // Then we just return true to trigger the skip:
        return true;
    }
}

// Second, we apply the advice template:
class ProxySelectorTransformer(logger: TransformationLogger): MatchingAgentTransformer(logger) {
    override fun register(builder: AgentBuilder): AgentBuilder {
        return builder
            // Match the built-in ProxySelector class:
            .type(
                named("java.net.ProxySelector")
            ).transform(this)
    }

    override fun transform(builder: DynamicType.Builder<*>): DynamicType.Builder<*> {
        return builder
            // Transform the static "setDefault" method with our advice:
            .visit(
                Advice.to(SkipMethodAdvice.class)
                    .on(hasMethodName("setDefault")));
    }
}
```

Transforming build-in classes does come with some caveats, e.g. you need to set `.ignore(none()` during Byte Buddy setup (see the example above) and you can't reference any non-built-in types within your advice class. For simple changes like this though, that's no big problem.

### Intercepting Spring WebClient HTTP:

Ok, last example, let's see a more complicated case. How does Spring's WebClient work?

Spring WebClient is a relatively new client on the block - it's a reactive client released as part of Spring 5, offering a Spring-integrated API built over the top of Reactor-Netty by default (but configurable to use other engines too).

I suspect the vast majority of users use the default Reactor-Netty engine, and if they don't then they use an engine that's already intercepted by another one of our configurations. That means we just need to intercept Reactor-Netty, and we'll capture all Spring WebClient traffic ready for debugging.

Extremely helpfully, Reactor Netty stores all the state we care about (both proxy & SSL context) in one place: the HttpClientConfig class. We need to reset that internal state somehow for all instances, but it's not conveniently exposed in the public APIs...

Even more helpfully though, their HttpClient class is cloned during each request, passing the config to the request's client, giving us the perfect hook to grab the config and modify it before every request.

That looks like this:

```java
// First an advice class to reset all config. More complicated this time!
public class ReactorNettyResetAllConfigAdvice {

    // We statically create a proxy provider, for our target proxy:
    public static final ProxyProvider agentProxyProvider = ProxyProvider.builder()
        .type(ProxyProvider.Proxy.HTTP)
        .address(new InetSocketAddress(
            HttpProxyAgent.getAgentProxyHost(),
            HttpProxyAgent.getAgentProxyPort()
        ))
        .build();

    // We also create an SSL provider that trusts our certificate:
    public static final SslProvider agentSslProvider;

    // And we store references to the relevant private fields using reflection, to
    // avoid the overhead of doing this on every request:
    public static final Field configSslField;
    public static final Field proxyProviderField;

    static {
        try {
            // Initialize our intercepted SSL provider:
            agentSslProvider = SslProvider.builder()
                .sslContext(
                    SslContextBuilder
                    .forClient()
                    .trustManager(HttpProxyAgent.getInterceptedTrustManagerFactory())
                    .build()
                ).build();

            // Rewrite the fields we want to mess with in the client config:
            configSslField = HttpClientConfig.class.getDeclaredField("sslProvider");
            configSslField.setAccessible(true);

            proxyProviderField = ClientTransportConfig.class.getDeclaredField("proxyProvider");
            proxyProviderField.setAccessible(true);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Then we hook the HttpClient method, so that before the constructor runs, we
    // grab the first argument (the config) and we overwrite these private fields:
    @Advice.OnMethodEnter
    public static void beforeConstructor(
        @Advice.Argument(value=0) HttpClientConfig baseHttpConfig
    ) throws Exception {
        configSslField.set(baseHttpConfig, agentSslProvider);
        proxyProviderField.set(baseHttpConfig, agentProxyProvider);
    }
}

// Using that, in the agent logic we match the constructor and apply this advice:
class ReactorNettyClientConfigTransformer(logger: TransformationLogger): MatchingAgentTransformer(logger) {

    override fun register(builder: AgentBuilder): AgentBuilder {
        // Find all HttpClient instances:
        return builder
            .type(
                hasSuperType(named("reactor.netty.http.client.HttpClient"))
            ).and(
                not(isInterface())
            ).transform(this)
    }

    override fun transform(builder: DynamicType.Builder<*>): DynamicType.Builder<*> {
        // Apply our advice to the matching constructor:
        return builder
            .visit(
                Advice.to(ReactorNettyResetAllConfigAdvice.class)
                    .on(isConstructor<MethodDescription>()
                        .and(takesArguments(1))
                        .and(takesArgument(0,
                            named("reactor.netty.http.client.HttpClientConfig")
                        )))
            )
    }
}
```

---

Isn't this fun?

Ok, while I'm fully expecting that while half the people who've read this far may be fascinated, the other half will be horrified.

We are elbow-deep in library internals here, and unrepentantly so.

This does have some caveats: it's quite possible that library changes could break this, or that some transformations could cause side effects. I wouldn't recommend doing this in production without significantly more careful transformation & testing, but for local development and testing the risk is low, and this works like a charm.

In practice, I suspect the fragility issues will be small. The code we're transforming is the low-level internals of connection setup, which changes relatively infrequently. Some git-blaming of the repos of various targets here suggests that in most cases this logic has barely changed since v1, or changes only marginally every 5 years or so, and updating this logic when there are changes is not a huge task. In addition, while new libraries will come out too, most of them build on top of these existing engines, so we can support them for free!

This kind of power is little-known and underused in much of the JVM community, and I'm really excited to see how you use it! **[Test this out now in HTTP Toolkit](https://httptoolkit.com/java/)**, try building your own Java agents, and get in touch [on Twitter](https://twitter.com/pimterry) if you have any thoughts or questions.