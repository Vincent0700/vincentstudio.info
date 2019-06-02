---
title: WAV音频文件格式解析
date: 2019-05-15 21:55:00
categories: Programming
tags:
- Audio
---

> 由于最近工作中使用到了多路音频采样数据的处理，故补充一波wav格式解析的知识，本文大部分资料来源于网络，我只做了收集归纳的工作。下方附有原文连接，若有侵权，请在下方留言告知。

## 概述

Waveform Audio File Format（WAVE，又或者是因为WAV后缀而被大众所知的），它采用RIFF（Resource Interchange File Format）文件格式结构。通常用来保存PCM格式的原始音频数据，所以通常被称为无损音频。但是严格意义上来讲，WAV也可以存储其它压缩格式的音频数据。

## 格式解析

WAV文件遵循RIFF规则，其内容以区块（chunk）为最小单位进行存储。WAV文件一般由3个区块组成：RIFF chunk、Format chunk和Data chunk。另外，文件中还可能包含一些可选的区块，如：Fact chunk、Cue points chunk、Playlist chunk、Associated data list chunk等。
本文将只介绍RIFF chunk、Format chunk和Data chunk。

{% asset_img wav_format.png %}

### RIFF区块

名称 | 偏移地址 |字节数 |端序 | 内容
--- | --- | --- | --- | ---
ID | 0x00 | 4Byte | 大端 | 'RIFF' (0x52494646)
Size | 0x04 | 4Byte | 小端 | fileSize - 8
Type | 0x08 | 4Byte | 大端 | 'WAVE'(0x57415645)

```text
ID 以'RIFF'为标识
Size 是整个文件的长度减去 ID 和 Size 的长度
Type 是WAVE表示后面需要两个子块：Format 区块和 Data 区块
```

### FORMAT区块

名称 | 偏移地址 | 字节数 | 端序 | 内容
--- | --- | --- | --- | ---
ID | 0x00 | 4Byte | 大端 | 'fmt ' (0x666D7420)
Size | 0x04 | 4Byte | 小端 | 16
AudioFormat | 0x08 | 2Byte | 小端 | 音频格式
NumChannels | 0x0A | 2Byte | 小端 | 声道数
SampleRate | 0x0C | 4Byte | 小端 | 采样率
ByteRate | 0x10 | 4Byte | 小端 | 每秒数据字节数
BlockAlign | 0x14 | 2Byte | 小端 | 数据块对齐
BitsPerSample | 0x16 | 2Byte | 小端 | 采样位数

```text
ID 以'fmt '为标识
Size 表示该区块数据的长度（不包含 ID 和 Size 的长度）
AudioFormat 表示 Data 区块存储的音频数据的格式，PCM音频数据的值为1
NumChannels 表示音频数据的声道数，1：单声道，2：双声道
SampleRate 表示音频数据的采样率
ByteRate 每秒数据字节数 = SampleRate * NumChannels * BitsPerSample / 8
BlockAlign 每个采样所需的字节数 = NumChannels * BitsPerSample / 8
BitsPerSample 每个采样存储的bit数，8：8bit，16：16bit，32：32bit
```

### DATA区块

名称 | 偏移地址 | 字节数 | 端序 | 内容
--- | --- | --- | --- | ---
ID | 0x00 | 4Byte | 大端 | 'data' (0x64617461)
Size | 0x04 | 4Byte | 小端 | N
Data | 0x08 | NByte | 小端 | 音频数据

```text
ID 以'data'为标识
Size 表示音频数据的长度，N = ByteRate * seconds
Data 音频数据
```

## 小端存储

> 所谓的大端模式，是指数据的低位保存在内存的高地址中，而数据的高位，保存在内存的低地址中；
  所谓的小端模式，是指数据的低位保存在内存的低地址中，而数据的高位保存在内存的高地址中。

下面解释一下 PCM 数据在 WAV 文件中的 bit 位排列方式

PCM数据类型 | 采样 | 采样
--- | --- | ---
8Bit 单声道 | 声道0 | 声道0
8Bit 双声道 | 声道0 | 声道1
16Bit 单声道 | 声道0低位，声道0高位 | 声道0低位，声道0高位
16Bit 双声道 | 声道0低位，声道0高位 | 声道1低位，声道1高位


## 示例代码 (C)

```c
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

struct WAV_Format {
    // riff header
    uint32_t ChunkID;        // "RIFF"
    uint32_t ChunkSize;      // 36 + Subchunk2Size
    uint32_t Format;         // "WAVE"

    // sub-chunk "fmt"
    uint32_t Subchunk1ID;    // "fmt " */
    uint32_t Subchunk1Size;  // 16 for PCM */
    uint16_t AudioFormat;    // PCM = 1*/
    uint16_t NumChannels;    // Mono = 1, Stereo = 2, etc.
    uint32_t SampleRate;     // 8000, 44100, etc.
    uint32_t ByteRate;       // = SampleRate * NumChannels * BitsPerSample/8
    uint16_t BlockAlign;     // = NumChannels * BitsPerSample/8
    uint16_t BitsPerSample;  // 8bits, 16bits, etc.

    // sub-chunk "data"
    uint32_t Subchunk2ID;    // "data"
    uint32_t Subchunk2Size;  // data size
};

int main(void) {
    FILE *fp = NULL;
    struct WAV_Format wav;

    fp = fopen("output_1.wav", "rb");
    if (!fp) {
        printf("can't open audio file\n");
        exit(1);
    }

    fread(&wav, 1, sizeof(struct WAV_Format), fp);

    printf("ChunkID \t%x\n", wav.ChunkID);
    printf("ChunkSize \t%d\n", wav.ChunkSize);
    printf("Format \t\t%x\n", wav.Format);
    printf("Subchunk1ID \t%x\n", wav.Subchunk1ID);
    printf("Subchunk1Size \t%d\n", wav.Subchunk1Size);
    printf("AudioFormat \t%d\n", wav.AudioFormat);
    printf("NumChannels \t%d\n", wav.NumChannels);
    printf("SampleRate \t%d\n", wav.SampleRate);
    printf("ByteRate \t%d\n", wav.ByteRate);
    printf("BlockAlign \t%d\n", wav.BlockAlign);
    printf("BitsPerSample \t%d\n", wav.BitsPerSample);
    printf("Subchunk2ID \t%x\n", wav.Subchunk2ID);
    printf("Subchunk2Size \t%d\n", wav.Subchunk2Size);

    fclose(fp);
    return 0;
}
```

## Reference 

[1] [WAV文件格式详解 - 简书](https://www.jianshu.com/p/947528f3dff8)
