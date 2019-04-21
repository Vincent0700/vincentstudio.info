---
title: Docker Installation
date: 2019-01-01 21:00:00
categories: Programming
tags: 
- Docker
- Linux
---

https://www.docker.com/

## Installation

### Way1: Install from apt (Recommend)

OS: Ubuntu 16.04 LTS

```bash
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
$ sudo apt update
$ sudo apt install docker-ce
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

### Way2: Install from official binary package

Download package from 
https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/

{% asset_img download.png %}

```bash
$ sudo dpkg -i xxx.deb
```