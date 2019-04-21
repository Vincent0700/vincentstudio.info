---
title: Zabbix 4.0 Single Node Configuration
date: 2019-02-03 20:00:00
categories: Programming
tags: 
- Monitoring
- Linux
---

Zabbix is an enterprise-class open source distributed monitoring solution.

## Summary

Zabbix is software that monitors numerous parameters of a network and the health and integrity of servers. Zabbix uses a flexible notification mechanism that allows users to configure e-mail based alerts for virtually any event. This allows a fast reaction to server problems. Zabbix offers excellent reporting and data visualisation features based on the stored data. This makes Zabbix ideal for capacity planning.

## Support Platform

- Red Hat Enterprise Linux
- CentOS
- Oracle Linux
- Ubuntu
- Debian
- SUSE Linux Enterprise Server
- Raspbian

## Installation

Click [here](https://www.zabbix.com/download?zabbix=4.0&os_distribution=ubuntu&os_version=16.04_xenial&db=mysql) & Choose your platform

{% asset_img zabbix_installation.png %}

## Configuration

- Open URL: http://<server_ip_or_name>/zabbix
- Follow the instructions & Click Next
- Login by default account:
`username` Admin
`password` zabbix
- Set your language by click usericon on top right corner

## Enjoy

{% asset_img zabbix_2.png %}
{% asset_img zabbix_1.png %}

## References

[1] [Install Zabbix from Package](https://www.zabbix.com/download?zabbix=4.0&os_distribution=ubuntu&os_version=16.04_xenial&db=mysql)
[2] [Zabbix Manual](https://www.zabbix.com/documentation/4.0/manual)