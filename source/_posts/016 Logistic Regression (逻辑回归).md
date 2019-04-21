---
title: Logistic Regression (逻辑回归)
date: 2019-02-16 20:30:00
categories: Notes 
tags: 
- MachineLearning
---

Given $x \in R^{n_x}$, want $\hat{y}=P\(y=1\,|\,x\) \in \[0,1\]$

## Logistic Function

$\sigma\(z\) = \dfrac{1}{1+e^{-z}}$

{% asset_img Sigmoid.png %}

Suppose $w \in R^{n_x},\;b \in R$
$\hat{y}=\sigma \( w^{\tau}x + b \)$

So $w$ and $b$ are the parameters we want to train

## Logistic Regression Cost Function

$\hat{y}=\sigma \( w^{\tau}x + b \)$, where $\sigma\(z\) = \dfrac{1}{1+e^{-z}}$
Given $\{(x^{(1)},y^{(1)}),(x^{(2)},y^{(2)}),\;...\;,(x^{(m)},y^{(m)})\}$, want $\hat{y}^{(i)} \approx y^{(i)}$

### Mean squared error (均方误差)

$L(\hat{y}, y) = \dfrac{1}{2} (\hat{y} - y)^2$

We don't use Mean squared error in Logistic Regression. Because that will make the cost function is no-convex.

### Cross Entropy (交叉熵)

$L(\hat{y}, y) = -(ylog\hat{y} + (1-y)log(1-\hat{y}))$

## Cost Function

$J(w,b) = \dfrac{1}{m} \sum\limits_{i=1}^{m} L(\hat{y}^{(i)}, y^{(i)}) = -\dfrac{1}{m} \sum\limits_{i=1}^{m} (y^{(i)}log\hat{y}^{(i)} + (1-y^{(i)})log(1-\hat{y}^{(i)}))$


## References

[1] [逻辑回归（Logistic Regression）（一）](https://zhuanlan.zhihu.com/p/28408516)
[2] [逻辑回归（Logistic Regression）（二）](https://zhuanlan.zhihu.com/p/28415991)
[3] [Logistic Regression 为什么用极大似然函数](https://www.jianshu.com/p/1bf35d61995f)
