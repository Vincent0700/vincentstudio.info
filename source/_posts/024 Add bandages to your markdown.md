---
title: Add bandages to your markdown
date: 2019-04-10 13:00:00
categories: Programming
tags:
- Markdown
---

> Do you know how to add these remarkable bandages to your markdown?

<p>
<embed src= "https://img.shields.io/badge/version-v0.1.2-brightgreen.svg">
<embed src= "https://img.shields.io/badge/author-vincent-lightgrey.svg">
<embed src= "https://img.shields.io/badge/license-MIT-green.svg">
<embed src= "https://img.shields.io/badge/python-3.6%20%7C%203.7-blue.svg">
</p>

## Static

You can easily create a bandage by the following code

```text
![](https://img.shields.io/badge/{label}-{message}-{color}.svg)

'''
Parameters:
  label: string
  message: string
  color: optional
    - "brightgreen"
    - "green"
    - "yellowgreen"
    - "yellow"
    - "orange"
    - "red"
    - "lightgrey"
    - "blue"
'''
```

Here is the demo

```markdown
![](https://img.shields.io/badge/hello-vincent-orange.svg)
```

<embed src= "https://img.shields.io/badge/hello-vincent-orange.svg">

## Advanced

You can also optimise styles or create a dynamic bandage by json/xml/yaml endpoint. Here is the official tutorial.

https://shields.io/



