---
title: RabbitMQ Installation
date: 2018-12-09 21:30:00
categories: Programming
tags: 
- Linux
---

RabbitMQ is the most widely deployed open source message broker

## Installation

OS: Ubuntu 16.04 LTS

### Step1: Install erlang package

https://packages.erlang-solutions.com/erlang/

```bash
$ wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
$ sudo dpkg -i erlang-solutions_1.0_all.deb
$ sudo apt update
$ sudo apt install erlang
```

### Step2: Add apt source

```bash
$ echo "deb https://dl.bintray.com/rabbitmq/debian xenial main" | sudo tee /etc/apt/sources.list.d/bintray.rabbitmq.list
```

#$$ Step3: Add public key to your trusted key list

```bash
$ wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
$ sudo apt-get update
```

### Step4: Install rabbitmq-server package:

```bash
$ sudo apt-get install rabbitmq-server
```

### Step6: Enable web management & add user

```bash
$ sudo rabbitmq-plugins enable rabbitmq_management
$ sudo rabbitmqctl add_user admin admin
$ sudo rabbitmqctl set_user_tags admin administrator
```

## Management

Open http://yourip:15672 

Username: admin 
Password: admin