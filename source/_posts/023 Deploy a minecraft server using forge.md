---
title: Deploy a minecraft server using forge
date: 2019-04-03 21:00:00
categories: Game
tags: 
- Minecraft
---

> Here I use v1.12.2 for demonstration. You can choose any version you like. 

## Download Forge Installer
https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.12.2.html
{% asset_img download_forge.png %}

## Install Server

```bash
$ java -jar forge-1.12.2-14.23.5.2768-installer.jar nogui --installServer
```
You can delete 'forge-1.12.2-14.23.5.2768-installer.jar' after installation 

## Run Server 

```bash
$ java -Xms2G -Xmx2G -server -jar forge-1.12.2-14.23.5.2768-universal.jar nogui

'''
options:
  -Xmx: maximum memory
  -Xms: minimum memory
'''
```
