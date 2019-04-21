---
title: Get Free SSL Certificates
date: 2019-02-24 17:00:00
categories: Programming
tags: 
- Nginx
- SSL
---

## Types of certificates

- `DV` Domain Validated certificates 
- `OV` Organization Validated certificate
- `EV` Extended Validation certificates

## Free ssl authorities

- [Let's Encrypt](https://letsencrypt.org)
- [StartSSL](https://www.startcomca.com)
- [COMODO PositiveSSL](https://www.positivessl.com)
- [CloudFlare SSL](https://www.cloudflare.com/ssl/)
- [Wosign](https://www.wosign.com)
- [Tencent](https://cloud.tencent.com/product/ssl)
- [Aliyun](https://common-buy.aliyun.com/?commodityCode=cas)
- [AlphaSSL](https://www.alphassl.com)

## Guide

This is a guide to get a DV certificate by [Let's Encrypt](https://letsencrypt.org) using Certbot

### Install Certbot

```bash
$ wget https://dl.eff.org/certbot-auto
$ chmod +x certbot-auto
$ mv certbot-auto /usr/local/bin/
```

Usage:
certonly: A Certbot plugin
-d DOMAIN: The domain you want to obtain a certificate for
--preferred-challenges: The way to verify your domain
--server: ACME v1 or v2 protocol server

### Apply for ssl certificate

```bash
$ certbot-auto certonly -d "domain.com" --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

Follow the hits and add a TXT dns record. Then you will get your certificates at /etc/letsencrypt/live/yourdomain/

### Enable HTTPS

Here is my nginx config file

```config
user root;
worker_processes 2;

error_log /var/log/nginx/error.log;
pid /root/app/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include            mime.types;
    default_type       application/octet-stream;
    sendfile           on;
    keepalive_timeout  65;
    
    server {
        listen 443 http2 ssl; 
        server_name vincentstudio.info;
        
        ssl_certificate         /root/app/cert/vincentstudio.info/fullchain.pem;
        ssl_certificate_key     /root/app/cert/vincentstudio.info/privkey.pem;
        ssl_trusted_certificate /root/app/cert/vincentstudio.info/chain.pem;

        root /root/app/blogger;
        location / {
            root   /root/app/blogger;
            index  index.html index.htm;
            autoindex on;
            autoindex_exact_size on;
            autoindex_localtime on;
        }
    }

    server {
        listen 80;
        server_name vincentstudio.info;
        return 301 https://vincentstudio.info;
    }
}
```

## Reference 

[1] [Types of SSL certificates – choose the right one](https://community.digicert.com/en/blogs.entry.html/2014/08/11/types-of-ssl-certificateschoose-the-right-one.html)
[2] [Let's Encrypt 免费通配符 SSL 证书申请流程](https://www.hi-linux.com/posts/6968.html)