---
title: Pipenv Tutorial
date: 2019-04-13 22:00:00
categories: Programming
tags:
- Python
---

> Like npm, pipenv is the officially recommended Python packaging tool from Python.org.

## Installation

### For MacOS

```bash
$ brew install pipenv
$ echo 'export PIPENV_VENV_IN_PROJECT=1' >> ~/.zshrc
# or ~/.basrc depends on your shell 
```

### For Ubuntu

```bash
$ sudo apt install pipenv
$ echo 'export PIPENV_VENV_IN_PROJECT=1' >> ~/.zshrc 
```

## Quick guide

### Create virtual environment

```bash
# for python3
$ pipenv --three
# for python2
$ pipenv --two
```

{% asset_img create_virtualenv.gif %}

### Enter virtual environment

```bash
$ pipenv shell
```

It's the same as 'source venv/bin/active'

### Install packages

```bash
$ pipenv install flask numpy
$ pipenv install pytest --dev
```

{% asset_img install.gif %}

### Check out packge

```bash
$ pipenv graph 
```

{% asset_img graph.png %}

It's like 'pip list' but more friendly

## Reference

[1] [Pipenv: Python Dev Workflow for Humans](https://pipenv.readthedocs.io/en/latest/)
