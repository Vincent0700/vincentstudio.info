---
title: Sourcelist switcher
date: 2018-12-21 21:00:00
categories: Programming
tags: 
- Shell
- Linux
---

A sourcelist switcher for ubuntu
https://github.com/Vincent0700/static-libraries/tree/master/source/sourcelist-switcher


## Feature

{% asset_img sourcelist-switcher.gif %}

## Dependencies

- wget
- apt-transport-https
- bc
  
```bash
$ sudo apt install wget apt-transport-https bc
```

## Installation

```bash
$ sudo bash -c "$(wget -q -O - https://raw.githubusercontent.com/Vincent0700/static-libraries/master/source/sourcelist-switcher/run.sh)"
```

## Platform:

- ubuntu 14.04 trusty
- ubuntu 16.04 xenial
- ubuntu 18.04 boinc
- ubuntu-arm 16.04 xenial