---
title: 6 ways to debug an exploding Docker container
date: '2023-10-31T14:00'
cover_image: './header-images/container-shipwreck.jpg'
---

Everything crashes.

Sometimes things crash when they're running inside a Docker container though, and then all of a sudden it can get much more difficult to work out why, or what the hell to do next.

Docker's great, but it's an extra layer of complexity that means you can't always easily poke your app up close any more, and that can really hinder debugging when your container fails to start or breaks in unusual ways.

If you're stuck in that situation, here are my goto debugging commands to help you get a bit more information on exactly what's up:

1. `docker logs <container_id>`

    Hopefully you've already tried this, but if not: start here. This'll give you the full STDOUT and STDERR command-line output from the command that was run initially in your container. You can also use `docker attach <container id>` to stream the live logs from an active container, if you want to keep an eye on the output as it runs.

2. `docker stats <container_id>`

    If you just need to keep an eye on the metrics of your container to work out what's gone wrong, `docker stats` can help: it'll give you a live stream of resource usage, so you can see just how much memory you've leaked so far and easily spot if your CPU usage is way out of control.

3. `docker cp <container_id>:/path/to/useful/file /local-path`

    Often just getting hold of more log files is enough to sort you out. If you already know what you want, `docker cp` has your back: copy any file from any container back out onto your local machine, so you can examine it in depth (especially useful analysing heap dumps).

4. `docker exec -it <container_id> /bin/bash`

    Next up, if you can run the container (if it's crashed, you can restart it with `docker start <container_id>`) then you can use this command to oppen a command line shell inside the container directly, and start digging around for further details by hand.

5. `docker commit <container_id> my-broken-container && docker run -it my-broken-container /bin/bash`

    Can't start your container at all? If your container starts and then immediately shuts down, then your initial command or entrypoint is immediately crashing. This can make your container extremely hard to debug, because you can't shell in any more or run any other commands inside the container.

    Fortunately, there's a workaround: you can save the state of the shutdown container as a new image (with `docker commit`) and then start that image using with a different command (e.g. `/bin/bash`) to open a shell inside the container without the broken command running at all.

    Have a failing entrypoint instead? There's an [entrypoint override command-line flag](https://docs.docker.com/engine/reference/run/#entrypoint-default-command-to-execute-at-runtime) too.

6. Inspect & modify network traffic with [HTTP Toolkit for Docker](https://httptoolkit.com/docker/).

    HTTP Toolkit is an open-source tool to help with debugging Docker network traffic - if you think there might be any kind of HTTP traffic from your container that could help shed some light on what it's doing, you can relaunch your container with HTTP interception enabled in one click, and instantly capture all the HTTP, HTTPS and WebSocket messages that get sent before it crashes. You can even breakpoint & rewrite traffic, to see if you can modify the responses to stop your container crashing manually.

I hope that helps you out! Join the mailing list below if you're interested in more debugging & HTTP posts, and do get in touch [on Mastodon](https://toot.cafe/@pimterry), [on Twitter](https://twitter.com/pimterry) or [directly](https://httptoolkit.com/contact/) if you have suggestions for more debugging tips that should be included here.

_Want to debug or test HTTP(S) from command line tools, backend servers, websites or even mobile apps? Download [HTTP Toolkit](https://httptoolkit.com/) for free to see & modify all your traffic in one click._