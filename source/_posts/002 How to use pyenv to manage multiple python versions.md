---
title: How to use pyenv to manage multiple python versions
date: 2018-12-04 21:30:21
categories: Programming
tags: 
- Python
- Shell
---

pyenv lets you easily switch between multiple versions of Python. It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

## Installation

### Way1: Manually

If you use bash as your shell, please change `.zshrc` to `.bashrc`

```bash
$ git clone git://github.com/yyuu/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(pyenv init -)"' >> ~/.zshrc
$ exec $SHELL -l
```

### Way2: Install by scripts

```bash
$ curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

## Install Python by pyenv

### Step1: Install build tools first

- For Ubuntu

```bash
$ sudo apt install -y build-essential checkinstall libreadline-gplv2-dev \
libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev \
libbz2-dev zlib1g-dev openssl libffi-dev python3-dev python3-setuptools wget
```

- For MaxOS

```bash
$ brew install zlib
$ export LDFLAGS="-L/usr/local/opt/zlib/lib"
$ export CPPFLAGS="-I/usr/local/opt/zlib/include"
```

### Step2: Find available versions

```bash
$ pyenv install -l
```

### Step3: Choose version you want to install

```bash
# exp. python-3.7.0
$ CFLAGS="-I$(xcrun --show-sdk-path)/usr/include" pyenv install 3.7.0
```

### Step4: Switch to your version

```bash
$ pyenv global 3.7.0
$ pyenv rehash
```

## Get all installed version 

```bash
$ pyenv versions
# output:
  system
  2.7.10
* 3.7.0 (set by /Users/Vincent/.pyenv/version)
```