---
title: How to Fake a GPS Location on IOS
date: 2019-05-03 10:00:00
categories: Programming
tags:
- IOS
---

## Environment

`IPhone X`
`System: IOS 12.2`

`MacBook Pro 2018`
`System: macOS Mojave 10.14.4`
`IDE: Xcode v10.2`

## Quick Guide

### Create Project

Open your Xcode and Create a new <span class="highlight">Single View App</span> project.

{% asset_img create_project.png %}

### Get GPS Location

http://www.gpsspg.com/maps.htm

Demo: 清华大学 (40.0033348446,116.3261745921)

{% asset_img gps.png %}

### Add a gpx file

Replace the latitude and longitude of the location you choose

{% asset_img add_gpx.png %}

```xml
<?xml version="1.0"?>
<gpx version="1.1" creator="Xcode">
    <wpt lat="40.0033348446" lon="116.326174592">
        <name>清华大学</name>
        <time>2014-09-24T14:55:37Z</time>
    </wpt>
</gpx>
```

### Edit Scheme

Choose Your Project > Edit Scheme > Options
Check <span class="highlight">Allow Location Simulation</span> and set <span class="highlight">Default Location</span> to your gpx file

{% asset_img edit_scheme.png %}

### Connect IPhone and Run Debug

Perfect!

{% asset_img phone.png %}
