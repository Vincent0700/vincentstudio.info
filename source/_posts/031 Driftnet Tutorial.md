---
title: 利用 driftnet 嗅探网络图片
date: 2019-05-24 22:18:00
categories: Hacking
tags:
- Linux
- Hacking
---

> driftnet 是 Kali Linux 中内置的一个网络图片嗅探工具，常配合 ettercap、arpsproof 或其他 arp 欺骗工具一起使用。因为在 MacOS 上安装的时候遇到了一些困难，故做此记录，方便以后查阅。以后有时间可以详细介绍一下 arp 攻击原理。本文纯粹用于技术探讨，请勿用于非法目的。

## 安装教程

在 Ubuntu 或者 Kali 上安装较为简单，就不多做介绍，下面安装教程只针对 macOS。网上很多用 macports 的安装教程都不能用了，目前在 mac 上只能通过源码编译安装。

```bash
$ git clone https://github.com/deiv/driftnet.git
$ cd driftnet
$ autoreconf -fi
$ ./configure
$ make -j8
$ make install
```

## 报错及解决方案

- gtk 问题

把 configure 中所有 x11 替换成 quartz，下面脚本中 gtk 版本可能不一致，请自行替换。

```bash
sed -i '.backup' 's/x11/quartz/g' configure && rm configure.backup
cd /usr/local/Cellar/gtk+/2.24.31_1/include/gtk-2.0/gdk
ln -s gdk.h gdkx.h
cd -
```

- 提示找不到 openssl

```bash
export LDFLAGS="-L/usr/local/opt/openssl/lib -L/usr/local/lib -L/usr/local/opt/expat/lib"
export CFLAGS="-I/usr/local/opt/openssl/include/ -I/usr/local/include -I/usr/local/opt/expat/include"
export CPPFLAGS="-I/usr/local/opt/openssl/include/ -I/usr/local/include -I/usr/local/opt/expat/include"
export LIBRARY_PATH=/usr/local/opt/openssl/lib
```

- ehter.h 报错

编辑 src/network/layer2.c 

```c++
#include <netinet/ether.h>
替换成
#include <netinet/if_ether.h>
```

- 编辑 src/compat/config.h

在末尾追加

```c++
#ifndef _FUCK_ETHER__
#define _FUCK_ETHER__
#define ETH_ALEN 6 
#define ETH_HLAN 14 
#define ETH_ZLEN 60 
#define ETH_DATA_LEN 1500 
#define ETH_FRAME_LEN 1514 
#define ETH_FCS_LEN 4  
#define ETH_P_IP 0x0800
#define ETH_P_IPV6 0x86DD
#define ETH_P_ARP 0x0806
#define ETH_P_PAE 0x888E

struct ethhdr
{
    unsigned char h_dest[ETH_ALEN];
    unsigned char h_source[ETH_ALEN];
    unsigned short h_proto;
}__attribute__((packed));
#endif
```

## 使用演示

```
$ driftnet -i en0 # 你的网卡名
```

打开浏览器看一些图片，发现图片内容已经被捕获到了。

{% asset_img driftnet.png %}

如果再配合 MITM，你懂的。
