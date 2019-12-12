---
name: 'The Intercept Page'
title: 'The Intercept Page'
order: 0
---

![The Intercept page, showing some intercepted sources active](../../images/intercept-screenshot.png)

On the Intercept page you can connect HTTP and HTTPS clients, whose traffic will be intercepted. That traffic can then be viewed on the [View page](/docs/reference/view-page), or you can add rules on the [Mock page](/docs/reference/mock-page) to rewrite the traffic from these clients.

The page consists of a grid of clickable interception options, each of which helps you set up a different type of client for interception.

In addition, there's a search box, and a 'Connected Sources' panel.

The search box allows you to quickly filter the interception options for the one most relevant to you. This filters on the names of each interception option, and also various tags. E.g. searching for 'mobile' will show both the iOS and Android options.

The connected sources panel shows the list of sources from whom traffic has been intercepted so far. Note that this is based on actually intercepted traffic: it's possible for a client to be correctly configured but not appear in this list, if they haven't yet sent any requests.

## Interception Options

### Fresh Chrome

This interceptor launches a Chrome instance, preconfigured to use the HTTP Toolkit proxy and trust the HTTP Toolkit certificate.

This Chrome instance is an independent process and profile from others on your machine. That means that it doesn't change the certificate or proxy settings on any other Chrome window, and it runs as a separate app. Only the traffic from this specific Chrome window (or windows opened from this Chrome window) will be intercepted. The separate profile ensures that this window starts completely fresh, with none of your day to day cookies or extensions, which is useful for testing. Otherwise though, this window acts just like any other Chrome window on your machine.

### Fresh Firefox

This interceptor launches a Firefox instance, preconfigured to use the HTTP Toolkit proxy. When it is first started, it will prompt you to trust the certificate: select 'Trust this CA to identify web sites' and click ok.

Once that's done, any traffic from this Firefox instance will be intercepted and visible in HTTP Toolkit. If you do this wrong, the certificate won't be trusted, and you'll see failing requests in the View page. In that case, you can just close Firefox and then restart it using the same interception option, and it'll prompt you to try again.

This Firefox instance is an independent process and profile from others on your machine. That means that it doesn't change the certificate or proxy settings on any other Firefox window, and it runs as a separate app. Only the traffic from this specific Firefox window (or windows opened from this Firefox window) will be intercepted. The separate profile ensures that this window starts completely fresh, with none of your day to day cookies or extensions, which is useful for testing. Otherwise though, this window acts just like any other Firefox window on your machine.

### Fresh Edge

This interceptor launches a Edge instance, preconfigured to use the HTTP Toolkit proxy and trust the HTTP Toolkit certificate. Only the latest Chromium-based Edge is supported.

This Edge instance is an independent process and profile from others on your machine. That means that it doesn't change the certificate or proxy settings on any other Edge window, and it runs as a separate app. Only the traffic from this specific Edge window (or windows opened from this Edge window) will be intercepted. The separate profile ensures that this window starts completely fresh, with none of your day to day cookies or extensions, which is useful for testing. Otherwise though, this window acts just like any other Edge window on your machine.

### Fresh Terminal

This interceptor launches a terminal window. This window is preconfigured so that the vast majority of CLI tools or languages that you might use from the command line will automatically use the HTTP Toolkit proxy and trust the certificate. This includes:

* cURL, and most clients using libcurl
* CLI tools like git and HTTPie
* Package managers like apt-get
* Node, and anything node-based, including npm itself
* Ruby, and ruby-based tools like gem
* Python, and python-based tools like pip
* PHP and PHP-based tools (when started directly from this window)
* Perl, and perl-based tools
* Many others

This is powered primarily through environment variables such as `HTTP_PROXY`, which are used automatically by many tools and frameworks. Because environment variables are inherited, subprocesses will generally also be intercepted correctly.

In addition, the terminal prepends an extra path to your PATH variable, which allows wrapping of certain commands. For example, a `node` wrapper is defined, which ensures that any node process starts with the proxy settings & certificate correctly injected.

The specific terminal application that will be used is autodetected according to various rules, depending on what's available. See [getTerminalCommand()](https://github.com/httptoolkit/httptoolkit-server/blob/master/src/interceptors/terminal/fresh-terminal-interceptor.ts#L60) in the HTTP Toolkit server for details.

Whilst this terminal is open, it also appends a change to the appropriate detected shell config files, e.g. `.bashrc` to ensure the PATH overrides are in place. This ensures that PATH changes in your bash config don't override the interception settings. This wrapped in a check for an `HTTP_TOOLKIT_ACTIVE` variable, so it won't affect other sessions, and is automatically removed again as soon as your terminal is closed.

### Existing Terminal

This interceptor shows a short copyable command, which can be pasted into any terminal window on your machine to immediately enable interception in that window.

In general this should behave the same as the 'Fresh Terminal' option, but being able to intercept existing terminals can be more convenient at times, and allows you to activate interception in some cases where the fresh terminal may not work.

As an example, using `nvm` to switch node versions in an intercepted terminal after it has started may override node interception, but using `nvm` and then subsequently enabling interception should work fine.

This interceptor is not available on Windows, as it's difficult to find a command that will work reliably in the many different shells available (e.g. cmd, git bash, cygwin, powershell, hyper, WSL).

### Electron App

This interceptor allows you to launch an Electron app, preconfigured to send all traffic through HTTP Toolkit. You can select the executable to run, or rerun a previous successfully run executable.

Interception is only support for all Electron apps using an Electron version above v1.7.4. All HTTP from standard clients in the renderer and main processes should be intercepted, although it is possible that traffic from applications using native extensions directly (e.g. libcurl) may not be.

This interceptor works by setting the environment variables set by the terminal interceptors, which is sufficient for many well-behaved applications that use the system proxy settings, and then injecting logic into the process itself.

The injection is done by starting the app with a `--inspect-brk` argument, so that it waits for a debugger before opening, then automatically connecting as a debugger to run a version of the interception logic normally used for Node processes in the terminal.

Using this to start non-Electron apps may have strange results: some may fail to start due to the bad command line flag, some may start as normal without any interception active, and some will observe the proxy & certificate settings from the environment variables, and will be intercepted even without using Electron.

### Anything

This interception option shows the instructions and details required to manually connect any other clients to HTTP Toolkit.

Anything that can send HTTP via a HTTP proxy can be intercepted by HTTP Toolkit, if it is configured with the proxy settings shown here. For clients that send HTTPS, they will need to trust your certificate, in addition to these proxy settings. The certificate is unique to you, and is generated fresh for each install of HTTP Toolkit. The specific path of the certificate varies according to your platform and home directory, but just click this option to find it.

**Any questions? [Get in touch](/contact)**