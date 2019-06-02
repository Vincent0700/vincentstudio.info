---
title: Use Nameko + RabbitMQ to establish your Microservices
date: 2019-04-24 11:00:00
categories: Programming
tags:
- Python
- RPC
- Microservices
---

> Nameko is a microservices framework for Python that lets service developers concentrate on application logic and encourages testability.

{% asset_img nameko.png %}

## Features

According to official documentation:

> It comes with built-in support for:
- RPC over AMQP
- Asynchronous events (pub-sub) over AMQP
- Simple HTTP GET and POST
- Websocket RPC and subscriptions (experimental)

As I know, It can also respond to grpc requests by using [nameko-grpc](https://github.com/nameko/nameko-grpc) extension. 

## Quick Guide

### Environment

Nameko use RabbitMQ as a message-oriented middleware. We can easily create a rabbitmq environment by docker. You can read my previous post [`《RabbitMQ Installation》`](/2018/12/09/003%20RabbitMQ%20Installation/) for more details.

```yaml
# docker-compose.yml

version: "2"
services:
  bitbucket:
    image: "rabbitmq:management"
    container_name: rabbitmq
    restart: always
    ports:
      - "5672:5672"
      - "15672:15672"
```

OR:

```bash
$ docker run -d --name rabbitmq \
-p 15672:15672 -p 5672:5672 \
rabbitmq:3-management
```

### Install 

Here I use pipenv to install nameko. Pipenv is a package manager for python. You can read my last post [`《 Pipenv Tutorial 》`](/2019/04/13/025%20Pipenv%20Tutorial/) about its feature, advantages and usage.

```$xslt
$ pipenv install nameko
```

### Create a Service

```python
# myservice.py
# -*- coding: UTF-8 -*-

import os
import gensim
import numpy as np
import jieba
from scipy.linalg import norm
from nameko.rpc import rpc

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "data/news_12g_baidubaike_20g_novel_90g_embedding_64.bin")

model = gensim.models.KeyedVectors.load_word2vec_format(MODEL_PATH, binary=True)


def get_sentence_vector(s):
    words = jieba.lcut(s)
    sentence_vector = np.zeros(64)
    word_num = 0

    for word in words:
        try:
            word_vec = model.get_vector(word)
            sentence_vector += word_vec
            word_num += 1
        except KeyError:
            pass

    sentence_vector /= word_num
    return sentence_vector


def get_sentence_similarity(s1, s2):
    v1, v2 = get_sentence_vector(s1), get_sentence_vector(s2)
    return np.dot(v1, v2) / (norm(v1) * norm(v2))


class RPCService:
    name = "sentence_similarity"

    @rpc
    def compute(self, s1, s2):
        return get_sentence_similarity(s1, s2)
```

It's a service to calculate the similarity of sentence in Chinese. You can just ignore the implementation of the compute function and focus on the service part.

```python
class RPCService:
    name = "sentence_similarity"

    @rpc
    def compute(self, s1, s2):
        return get_sentence_similarity(s1, s2)
```

It's really concise, isn't it? All you need to do is define the service name and add a rpc decorator to your method. You don't have to care about how to communicate to your broker and how to serialize or deserialize your data. You don't even need to define your data structure like protobuf and grpc do.

### Start your service

```bash
$ nameko run [service_name] --broker [broker_uri]
```

For this case 

```bash
$ nameko run service --broker amqp://guest:guest@localhost:5672
# 5672 is the default amqp port for rabbitmq

""" Returns
starting services: sentence_similarity
Connected to amqp://guest:**@127.0.0.1:5672//
"""
```

### How to Invoke? (Client)

You can easily test your service by nameko shell

```bash
$ nameko shell --broker amqp://guest:guest@localhost:5672
Nameko Python 3.7.1 (default, Apr 23 2019, 06:16:09) 
[Clang 10.0.0 (clang-1000.11.45.5)] shell on darwin
Broker: amqp://guest:guest@localhost:5672
>>> n.rpc.sentence_similarity.compute("晚上吃了么", "今晚吃了什么")
0.8222975682337561
>>> n.rpc.sentence_similarity.compute("晚上吃了么", "今天天气不错")
0.2270335911019851
```

You can also invoke your service by ClusterRpcProxy without any data structure definition and it looks like a synchronous method. It also has asynchronous calling methods.

```python
from nameko.standalone.rpc import ClusterRpcProxy

broker_cfg = {'AMQP_URI': "amqp://guest:guest@localhost"}


def get_sentence_similarity(s1, s2):
    with ClusterRpcProxy(broker_cfg) as rpc:
        result = rpc.sentence_similarity.compute(s1, s2)
        return result


if __name__ == "__main__":
    print(get_sentence_similarity("今天吃了么", "今天吃什么"))
```

## Other Protocols support

It also supports http protocol.

```python
# http_service.py
# -*- coding: UTF-8 -*-

import json
from nameko.web.handlers import http

class HttpService:
    name = "http_service"

    @http('GET', '/get/<int:value>')
    def get_method(self, request, value):
        return json.dumps({'value': value})

    @http('POST', '/post')
    def do_post(self, request):
        return u"received: {}".format(request.get_data(as_text=True))
```

Or grpc, [nameko-grpc](https://github.com/nameko/nameko-grpc). Just read the docs.


## Reference

[1] [Nameko official website](https://www.nameko.io/)
[2] [Nameko 2.11.0 documentation](https://docs.nameko.io/en/stable/)
