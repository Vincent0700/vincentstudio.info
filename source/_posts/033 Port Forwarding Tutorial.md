---
title: iptables 详解
date: 2019-06-16 14:00:00
categories: Programming
tags:
- Linux
---

> 说道端口转发大家一定不陌生，路由器上经常操作端口映射，把内网端口映射到路由器端口，从而通过路由器的公网 IP 便可以访问内网端口。这一切归功于 iptables，当然 iptables 除了做端口转发，还有非常多的其他功能，本文就来详细介绍一下 iptables，并提供一些常用案例。

## 简介

`iptables` 是一种 IP 信息包过滤系统，包含4个表，5个链。其中表是按照对数据包的操作区分的，链是按照不同的Hook点来区分的，具体包含关系为 `iptables` -> `Tables` -> `Chains` -> `Rules`。其实 iptables 不是真正的防火墙，我们可以把它理解成一个客户端代理，用户通过 `iptables` 这个代理，将用户的安全设定执行到对应的"安全框架"中，这个"安全框架"才是真正的防火墙，这个框架的名字叫 `netfilter`。

### 四个表

- `FILTTER`：一般的过滤功能
- `NAT`：用于nat功能（端口映射，地址映射等）
- `MANGLE`：用于对特定数据包的修改
- `RAW`：优先级最高，设置raw时一般是为了不再让iptables做数据包的链接跟踪处理，提高性能

### 五个链

- `PREROUTING`：数据包进入路由表之前
- `INPUT`：通过路由表后目的地为本机
- `FORWARD`：通过路由表后，目的地不为本机
- `OUTPUT`：由本机产生，向外转发
- `POSTROUTIONG`：发送到网卡接口之前

### 包含关系

{% asset_img relationships.png %}

### 数据流图

{% asset_img workflow.png %}

## 实用案例

### 开始、停止、重启 iptables 服务

```bash
$ systemctl start iptables
$ systemctl stop iptables
$ systemctl restart iptables
```

### 查看所有规则

```bash
$ iptables -L -n -v

# 具体看某个表的规则，如 nat
$ iptables -t nat -L -n -v
```

- `-L` list，列举规则
- `-n` numeric，显示ip地址
- `-v` verbose，详细输出

### 清空所有规则

```bash
# 清除所有链
$ iptables -F

# 清除某个表中的所有链
$ iptables -t nat -F
```

- `-F` flush，清空规则

### 保存、恢复 iptables

```bash
# 保存 iptables 规则到文件
$ iptables-save > ~/iptables.rules

# 从文件恢复 iptables 规则
$ iptables-restore < ~/iptables.rules
```

### 屏蔽某个IP地址

```bash
$ iptables -A INPUT -s xxx.xxx.xxx.xxx -j DROP
```

如果你想取消屏蔽

```bash
$ iptables -D INPUT -s xxx.xxx.xxx.xxx -j DROP
```

如果只是想屏蔽 tcp 流量

```bash
$ iptables -A INPUT -p tcp -s xxx.xxx.xxx.xxx -j DROP
```

- `-A [chain]` append，增加规则
- `-D [chain]` delete，删除规则
- `-s [address/mask[...]]` source，源地址
- `-j [target]` jump，处理动作 
- `-p [proto]` protocol，协议，`icmp`、`tcp`、`udp` 等

### 屏蔽某个端口

```bash
# 屏蔽从8080端口传出的连接
$ iptables -A OUTPUT -p tcp --dport 8080 -j DROP

# 屏蔽传入8080端口的连接
$ iptables -A INPUT -p tcp --dport 8080 -j ACCEPT

# 屏蔽多个端口的
$ iptables -A INPUT  -p tcp -m multiport --dports 22,80,443 -j ACCEPT
$ iptables -A OUTPUT -p tcp -m multiport --sports 22,80,443 -j ACCEPT
```

### 屏蔽某个MAC地址

```bash
$ iptables -A INPUT -m mac --mac-source 00:00:00:00:00:00 -j DROP
```

### 设置端口转发

```bash
$ iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 8080 -j REDIRECT --to-port 8081

```

- `-i [interface]` 网卡名

### 禁止 Ping，即屏蔽 ICMP 协议

```bash
$ iptables -A INPUT -p icmp -i eth0 -j DROP
```

### 限制连接数

```bash
# 限制端口的连接数
$ iptables -A INPUT -p tcp --dport 80 -m limit --limit 100/minute --limit-burst 200 -j ACCEPT

# 限制并发的连接数，例如允许每个客户端最多建立3个ssh连接
$ iptables -A INPUT -p tcp --syn --dport 22 -m connlimit --connlimit-above 3 -j REJECT
```

- `--limit 100/minute` 传入连接限制为100个每分钟
- `--limit-burst 200` 仅当连接总数达到200个以后才开始限制连接数
