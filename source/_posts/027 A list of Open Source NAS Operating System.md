---
title: A list of Open Source NAS Operating System
date: 2019-05-02 20:00:00
categories: Resources
tags:
- NAS
---

## [FreeNAS](http://www.freenas.org) 

目前最受欢迎的开源免费 NAS 操作系统之一，基于以安全和稳定著称的 FreeBSD 系统开发，由 ixsystems 公司的技术团队维护。

{% asset_img Freenas.png %}

## [NAS4Free](http://www.nas4free.org)

基于 FreeNAS 0.7 开发的一个分支，由原 FreeNAS 系统开发者发起创建。许多恋旧的朋友忠实的跟随，安装要求没有 FreeNAS 高，版本更新也很及时。

{% asset_img nas4free.jpg %}

## [OpenMediaVault](http://www.openmediavault.org/)

由原 FreeNAS 核心开发成员 Volker Theile 发起的基于 Debian Linux 的开源 NAS 操作系统，主要面向家庭用户和小型办公环境，最近发布了针对树莓派的安装包，值得关注。

{% asset_img openmediavault.png %}

## [Openfiler](http://www.openfiler.com/)

另一款基于浏览器管理的开源 NAS 操作系统，许多人说他好用，因为它基于 rPath Linux 开发。2013年以后，这款 NAS 系统的开源版本再没有更新。
 
{% asset_img openfiler.jpg %}

## [NexentaStor](http://www.nexentastor.org/)

基于 OpenSolaris 开发，与 FreeNAS 一样采用强大的 ZFS 文件系统。该系统由 Nexenta Systems 公司技术团队维护，同时提供社区开原版和商业付费版本，社区开原版有 18TB 的存储容量限制，有人说 NexentaStor 比 OpenFiler 好用。

{% asset_img nexentastor.jpg %}

## [RockStor](http://www.rockstor.com/)

一款基于 Linux 的开源 NAS 系统，采用企业级文件系统 BTRFS，提供 SMB/CIFS、NFS  以及 SFTP 常见的共享方式。第一个 ISO 镜像发布于 2014-10-02，可见这套 NAS 系统初出茅庐，暂无简体中文支持。不过官网文档已经备齐，保持关注，可能有一番作为。

{% asset_img rockstor.jpg %}

## [EasyNAS](http://www.easynas.org/)

另一款非常年轻的 NAS 系统，与 RockStor 很像，同样采用企业级文件系统 BTRFS，但官方网站和文档会略逊一筹，第一个 ISO 镜像发布于 2014-05-10。

{% asset_img EasyNAS.jpg %}

## [Webmin](http://www.webmin.cn/)

它不是 NAS 操作系统，但可以实现基本的 samba 共享功能，webmin 是目前功能最强大的基于浏览器的 Unix 系统管理工具。可以安装在几乎所有的类 Unix 操作系统上面。特别适合刚入门的用户管理 Linux 服务器。

{% asset_img Webmin.png %}

## [GlusterFS](http://www.gluster.org/)

由 Z RESEARCH 公司负责开发，最近非常活跃。 文档也比较齐全，不难上手。GlusterFS 通过 Infiniband RDMA 或 TCP/IP 协议将多台廉价的 x86 主机，通过网络互联成一个并行的网络文件系统。据说 Gluster 已被 RedHat 收购。


## [Lustre](http://lustre.org/)

为解决海量存储问题而设计的全新文件系统。是下一代的集群文件系统，可支持10,000个节点，PB的存储量，100GB/S的传输速度，完美的安全性和可管理性。 目前Lustre已经运用在一些领域，例如HP SFS产品等。
