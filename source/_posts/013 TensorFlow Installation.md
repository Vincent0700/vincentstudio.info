---
title: TensorFlow Installation
date: 2019-02-09 20:30:00
categories: Programming
tags: 
- Python
- TensorFlow
- MachineLearning
---

## System requirements

- Ubuntu 16.04 or later (64-bit)
- macOS 10.12.6 (Sierra) or later (64-bit) (no GPU support)
- Windows 7 or later (64-bit) (Python 3 only)
- Raspbian 9.0 or later

## For MacOS

### Available Python versions

- Python 2.7
- Python 3.4, 3.5, 3.6

Note that Python 3.7 or later is not support

### Install TensorFlow

I use pyenv & virtualenv with Python 3.6.7

```bash
$ pip install tensorflow
```

### Test

Run this script. And I will explain what does it do at the next note.

```python
import tensorflow as tf
import numpy as np

x_data = np.random.rand(100).astype(np.float32)
y_data = x_data * 0.1 + 0.3

Weights = tf.Variable(tf.random_uniform([1], -100.0, 100.0))
biases = tf.Variable(tf.zeros([1]))

y = Weights * x_data + biases

loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train = optimizer.minimize(loss)

init = tf.global_variables_initializer()

sess = tf.Session()
sess.run(init)

for step in range(201):
    sess.run(train)
    if step % 20 == 0:
        print(step, sess.run(Weights), sess.run(biases))
```

If you get the following logs.
 
> Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA

You can simply ignore this warning by `export TF_CPP_MIN_LOG_LEVEL=2` or add following code at the top of the file

```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
```



## References

[1] [Install TensorFlow with pip](https://www.tensorflow.org/install/pip)
