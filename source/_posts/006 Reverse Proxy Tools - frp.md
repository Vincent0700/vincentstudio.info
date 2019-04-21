---
title: Reverse Proxy Tools - frp
date: 2019-01-07 21:00:00
categories: Programming
tags: 
- Proxy
- Linux
---

frp is a fast reverse proxy to help you expose a local server behind a NAT or firewall to the internet. As of now, it supports tcp & udp, as well as http and https protocols, where requests can be forwarded to internal services by domain name.

## Summary

Our purpose is to access LAN devices from the external network. And we have a server which have public IP. How can we connect LAN device through it?

{% asset_img reverse_proxy_structure.png %}

## Installation

Download compiled binaries at https://github.com/fatedier/frp/releases

{% asset_img frp_files.png %}

Move frp folder to /usr/local/frp
Create soft links

```bash
$ ln -s /usr/local/frp/frps /usr/local/frps
$ ln -s /usr/local/frp/frpc /usr/local/frpc
```

Move frps.ini & frpc.ini to /etc/frp/

### For Reverse Proxy Server

Edit config file - frps.ini

```ini
[common]
bind_addr = 0.0.0.0
bind_port = 7000

token = vincent
allow_ports = 3001,3003,4000-50000
max_pool_count = 5
login_fail_exit = false

dashboard_addr = 0.0.0.0
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin

log_file = ./frps.log
log_level = info
log_max_days = 3
```

Start frp server

```bash
$ sudo ./frps -c frps.ini
```

View frp status at dashboard (http://serverip:7500)

{% asset_img frp_dashboard.png %}

### For Target Server

Edit config file - frpc.ini

```ini
[common]
server_addr = serverip
server_port = 7000
token = javen

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 3001
```

Start frp client

```bash
$ sudo ./frpc -c frpc.ini
```

### Test

```bash
$ ssh root@serverip -p 3001 
```

## Startup

How to Run frp at startup?

### Way1: Use systemctl

Edit /etc/systemd/system/frps.service

```ini
[Unit]
Description=frps daemon

[Service]
Type=simple
ExecStart=/usr/local/frp/frps -c /etc/frp/frps.ini

[Install]
WantedBy=multi-user.target
```

Start service

```bash
$ systemctl start frps
$ systemctl enable frps
```

### Way2: Use supervisor

Edit /etc/supervisor/conf.d/frps.ini

```ini
[program:frps]
command=/usr/local/frp/frps -c /etc/frp/frps.ini
autorestart=true
```

Reload supervisor config file

```bash
$ sudo supervisorctl reload 
```