---
title: Gradient Descent (梯度下降)
date: 2019-02-18 20:30:00
categories: Notes 
tags: 
- MachineLearning
---

## Recap 

<a href='/2019/02/16/016%20Logistic%20Regression%20(逻辑回归)/'>Logistic Regression:</a>

$\hat{y}=\sigma \( w^{\tau}x + b \)$, $\sigma\(z\) = \dfrac{1}{1+e^{-z}}$

$J(w,b) = \dfrac{1}{m} \sum\limits_{i=1}^{m} L(\hat{y}^{(i)}, y^{(i)}) = -\dfrac{1}{m} \sum\limits_{i=1}^{m} (y^{(i)}log\hat{y}^{(i)} + (1-y^{(i)})log(1-\hat{y}^{(i)}))$

Want to find $w,b$ that minimize $J(w,b)$

## Gradient Descent

Suppose $\alpha$ is learning rate, then loop:

$w = w - \alpha \dfrac{\partial J(w,b)}{\partial w}$

$b = b - \alpha \dfrac{\partial J(w,b)}{\partial b}$
