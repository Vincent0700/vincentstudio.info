---
title: OLED SH1106 Tutorial
date: 2019-02-06 09:00:00
categories: Programming
tags: 
- Arm
- OLED
---

## Appearance

{% asset_img oled_sh1106.png %}

## Pins

- `VCC` this pin is used for powering the MPU6050 module with respect to ground
- `GND` this is a ground pin 
- `SDA` SDA pin is used for data between controller and module
- `SCL` SCL pin is used for clock input

## Example

### Environment 

OrangePi PC Plus / Ubuntu 16.04
Python 2.7

### Dependencies

- smbus

```bash
$ apt install python-smbus
```

### Enjoy Drawing

```python
from oled.device import sh1106
from oled.render import canvas
from PIL import ImageFont, Image
import qrcode


def main():
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=2,
        border=3,
    )
    qr.add_data('http://vincentstudio.info')
    qr.make(fit=True)
    img = qr.make_image()
    img.save('./images/code.png')

    oled = sh1106(port=0, address=0x3C)
    font = ImageFont.truetype('./fonts/C&C Red Alert [INET].ttf', 12)
    with canvas(oled) as draw:
        logo = Image.open('images/code.png')
        draw.bitmap((0, 1), logo, fill=1)
        draw.text((75, 20), 'Vincent', font=font, fill=1)
        draw.text((90, 32 ), 'Studio', font=font, fill=1)


if __name__ == "__main__":
    main()
```
### Feature 

{% asset_img demo.png %}

## Download Project

https://github.com/Vincent0700/oled_sh1106.git

The repos for the example project above. It's simple.



