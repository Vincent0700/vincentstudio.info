---
title: Configure system proxy by privoxy + gfwlist
date: 2019-02-20 20:30:00
categories: Programming
tags: 
- Proxy
---

## Configure Privoxy

OS: Ubuntu 16.04

### Install privoxy

```bash
$ sudo apt-get install privoxy
```

### Convert gfwlist to privoxy action file

```bash
$ curl -skL https://raw.github.com/zfl9/gfwlist2privoxy/master/gfwlist2privoxy -o gfwlist2privoxy
$ sudo bash gfwlist2privoxy '127.0.0.1:1080' # sslocal port
$ sudo cp -af gfwlist.action /etc/privoxy/
```

edit /etc/privoxy/config, add following lines

```bash
listen-address 127.0.0.1:8118 # expose http proxy port
actionsfile /etc/privoxy/gfwlist.action # gfwlist
```

### Restart privoxy service

```bash
$ sudo service privoxy restart
```

## Set system proxy

edit /etc/environment, add following lines

```bash
export http_proxy="http://127.0.0.1:8118"
export https_proxy="http://127.0.0.1:8118"
export no_proxy="localhost, 127.0.0.1, ::1, ip.cn"
```

## Test

```bash
$ curl -4skL https://www.google.com
$ curl -4skL https://www.baidu.com
```
