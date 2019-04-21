---
title: Deploy dnsmasq with docker
date: 2019-03-04 15:00:00
categories: Programming
tags: 
- Docker
- DNS
---

## Build

```bash
$ git clone https://github.com/Vincent0700/dns-server.git
$ cd dns-server
$ docker-compose up --build -d
```

## Config

- conf/dnsmasq.conf: base config file
- conf/hosts: domain mapping
- conf/resolv.conf: upstream dns server

## Flush dns

```bash
$ docker restart dnsmasq
```