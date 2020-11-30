---
title: Mining your CLI history for good git aliases
date: '2020-11-30T13:35'
cover_image: './old-records.jpg'
---

If you use the command-line all day, CLI improvements can add a huge boost to your workflow. One of the simplest ways to improve things is to make your most used commands easier & faster to type, by creating aliases.

But which aliases? Which commands are most important for your usage? You can probably guess a couple, but it's hard to know for sure, and there's plenty you'll miss. Fortunately your CLI history already has all the answers, if you just know how to ask.

As a software developer I'm going to focus on git aliases here, but this applies equally well to any command-line tools you use heavily. I'm also assuming a bash-compatible shell, but the same concept should translate elsewhere easily enough.

The first step is to use `history` to do some digging and find out what commands you run most frequently. `history` prints every line you've run recently in your shell, in chronological order. That gives us the data we need, and with a little bash-fu we can start to get some answers.

First, what're your most run git commands?

```bash
history -n | grep git | sort | uniq -c | sort -k1,1nr -k2
```

That takes your history, filters for git commands, sorts them alphabetically, counts the repeated lines, and then sorts by the repeat count.

You can add a `| head -n X` too, if you'd like to see just the top `X` results. For me, with a few weeks history on a new laptop, that looks like:

```bash
    543 git status
    272 git add -p
    214 git tree
     71 git diff
     55 git commit --amend
     53 git push origin master
     32 git checkout -p
     30 git reset
     27 git stash pop
     26 git stash
```

That tells you a bunch about my git workflow already! These are all common commands I'm using frequently, and commands I should very seriously consider aliasing.

It doesn't tell the whole story though. How come `git commit --amend` is so high up, but `git commit` doesn't appear at all?

That's because for many commits I run `git commit -m "..."` to commit and pass a message inline, so each of those commands is treated as unique, and won't appear in this top list. We need to get a little smarter.

We can catch cases like that too, by limiting the input we consider for uniqueness. Like so:

```bash
history -n | grep git | cut -d' ' -f -3 | sort | uniq -c | sort -k1,1nr -k2
```

Here I've added `cut -d' ' -f -3`, which splits each line by spaces, and includes only the first 3 parts (e.g. `git push origin master` becomes `git push origin`). This isn't perfect, but it does let us find command prefixes of a given length.

With that, my results become:

```bash
    543 git status
    299 git add -p
    214 git tree
    199 git commit -m
    117 git push origin
     71 git diff
     60 git commit --amend
     34 git checkout -p
     30 git reset
     29 git diff --cached
```

We can now see that I'm committing a lot too, but with messages, I'm pushing with many other branches, and I'm diffing my cached (already added) changes often, but usually with an argument ('show me what I've just added to the tests').

Fiddle around with this a little, try a few different lengths of prefix, and you'll quickly find a set of commands that stand out with frequent use patterns, with or without extra arguments.

From there, it's alias time. I could make these aliases within git, but I'd actually prefer to do it at the shell level, so I can shorten them further (not just to `git x` but `gx`).

In my case, I'm doing that by adding the below to my `.bashrc`:

```bash
alias gs=git status
alias gap=git add -p
alias gt=git tree

alias gc=git commit
alias gcm=git commit -m
alias gca=git commit --amend

alias gpo=git push origin
alias gd=git diff
alias gdc=git diff --cached
```

(Don't forget to check these don't conflict with anything else you use on your machine!)

These aliases can also be a very convenient place to add any extra arguments you often want but don't always remember, like `-w` for `diff` (ignore whitespace changes) or `-v` for `git commit` (include the diff contents in the commit template, so you can see it while you write your message).

It's a quick trick, but just a little bash magic can tell you a lot about your working habits, and shine a useful light on ways you can make your life easier. Give it a go, and let me know what you think on [Twitter](https://twitter.com/pimterry).

_Want to debug or test HTTP(S) from command line tools, scripts or backend servers? Try out [HTTP Toolkit](https://httptoolkit.tech)_