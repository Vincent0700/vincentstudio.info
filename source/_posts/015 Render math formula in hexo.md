---
title: Render math formula in hexo
date: 2019-02-15 15:30:00
categories: Programming
tags: 
- Hexo
---

## Feature

$$
\begin{equation} 
\begin{array}{lll}
\nabla\times E &=& -\;\frac{\partial{B}}{\partial{t}}\     
\nabla\times H &=& \frac{\partial{D}}{\partial{t}}+J\     
\nabla\cdot D &=& \rho\     
\nabla\cdot B &=& 0\ 
\end{array}
\end{equation} 
$$

## Installation

### Use hexo-renderer-kramed

```bash
$ npm uninstall hexo-renderer-marked --save
$ npm install hexo-renderer-kramed --save
```

### Insatll mathjax

```bash
$ npm uninstall hexo-math --save
$ npm install hexo-renderer-mathjax --save
```

### Fix mathjax CDN

edit /node_modules/hexo-renderer-mathjax/mathjax.html

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML"></script>
```

### Fix escape bugs

edit /node_modules/kramed/lib/rules/inline.js
find `escape` & `em` regexp and change to

```text
escape: /^\\([`*\[\]()# +\-.!_>])/,
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

## Enjoy LaTeX

### Demo

```
$$
\left\{
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
\right\}
$$
```

$$
\left\{
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
\right\}
$$
