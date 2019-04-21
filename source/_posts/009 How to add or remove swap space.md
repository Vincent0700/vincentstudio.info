---
title: How to add or remove swap space
date: 2019-02-03 15:00:00
categories: Programming
tags: 
- Shell
- Linux
---

Swap space refers to the portion of the virtual memory which is reserved as a temporary storage location. 

## Check memory and available space

```bash
$ free -mh
```

{% asset_img shell_free_mh.png %}

```bash
$ df -h
```

{% asset_img shell_df_h.png %}

## Enable the swap file

```bash
# create a 2G swap file
$ dd if=/dev/zero of=/myswap bs=1024 count=2048000
# mark the file as swap space
$ mkswap /myswap
# enable the swap file
$ swapon /myswap
```

{% asset_img shell_free_mh_2.png %}

## Make the swap file permanent

```bash
$ echo '/myswap none swap sw 0 0' >> /etc/fstab
```

## Disable the swap space

```bash
$ swapoff /var/swap
$ rm /swap
```

Then you should remove the line includes '/swap' from /etc/fstab

## References

[1] [How To Add Swap Space on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04)