---
title: Get MPU6050 data through websocket
date: 2019-02-02 16:00:00
categories: Programming 
tags: 
- Arm
- Sensor
- Gyro
---

> MPU-6050 is an 8 pin 6 axis gyro and accelerometer in a single chip. This module works on I2C serial communication by default but it can be configured for SPI interface by configuring it register. For I2C this has SDA and SCL lines. 

## Appearance

{% asset_img mpu6050.png %}

## Configure

### MPU6050 Pins

- `VCC` this pin is used for powering the MPU6050 module with respect to ground
- `GND` this is a ground pin 
- `SDA` SDA pin is used for data between controller and mpu6050 module
- `SCL` SCL pin is used for clock input
- `XDA` This is sensor I2C SDA Data line for configuring and reading from external sensors  (not use)
- `XCL` This is sensor I2C SCL clock line for configuring and reading from external sensors (not use)
- `ADO` I2C Slave Address LSB (not use)
- `INT` Interrupt pin for indication of data ready. (not use)

### GPIO Configuration

{% asset_img gpio.png %}
{% asset_img pin_configuration.png %}

## Program

### Environment

OrangePi PC Plus / Ubuntu 16.04
Python 3.7

### Download driver

https://github.com/Tijndagamer/mpu6050

### Communication 

I wrote a simple flask-SocketIO program to communicate with mpu6050

```python
import logging
from flask import Flask, request, render_template
from flask_socketio import SocketIO, emit
from app.mpu6050 import mpu6050

app = Flask(__name__)
socketio = SocketIO(app)
sensor = mpu6050(address=0x68, bus=0)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', interval=100)

@socketio.on('connect', namespace='/mpu6050')
def on_mpu6050_connect():
    print(f'Client {request.remote_addr} connected')

@socketio.on('get_data', namespace='/mpu6050')
def on_mpu6050_get_data():
    accel_data = sensor.get_accel_data()
    gyro_data = sensor.get_gyro_data()
    temp = sensor.get_temp()
    emit('recv_data_mpu6050', dict(
        accel_data=accel_data,
        gyro_data=gyro_data,
        centidegree=temp
    ))
```

Web template

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0,
          maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ws_mpu6050</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        table.dataset {
            background: #333;
            color: #fff;
        }

        table.dataset td {
            width: 80px;
            padding: 5px 10px;
            border: 1px solid #fff;
        }
    </style>
</head>
<body>
<ul>
    <table class="dataset">
        <tr>
            <td>accel_data</td>
            <td id="accel_x"></td>
            <td id="accel_y"></td>
            <td id="accel_z"></td>
        </tr>
        <tr>
            <td>gyro_data</td>
            <td id="gyro_x"></td>
            <td id="gyro_y"></td>
            <td id="gyro_z"></td>
        </tr>
    </table>
</ul>

<script src="/static/js/libs/socket.io/socket.io.min.js"></script>
<script>
    const socket = io.connect(`${location.host}/mpu6050`);
    let data = {};

    socket.on("connect", function () {
        setInterval(function () {
            socket.emit("get_data")
        }, {{ interval }});
    });

    socket.on("recv_data_mpu6050", function (msg) {
        if (msg && msg.accel_data && msg.gyro_data && msg.centidegree) {
            data = msg;
            const accel = data.accel_data;
            const gyro = data.gyro_data;
            document.getElementById("accel_x").innerHTML = accel.x.toFixed(5);
            document.getElementById("accel_y").innerHTML = accel.y.toFixed(5);
            document.getElementById("accel_z").innerHTML = accel.z.toFixed(5);
            document.getElementById("gyro_x").innerHTML = gyro.x.toFixed(5);
            document.getElementById("gyro_y").innerHTML = gyro.y.toFixed(5);
            document.getElementById("gyro_z").innerHTML = gyro.z.toFixed(5);
        }
    })
</script>
</body>
</html>
```

The full program is at https://github.com/Vincent0700/ws_mpu6050. You can clone my code by:

```bash
$ git clone https://github.com/Vincent0700/ws_mpu6050.git
```


### Feature

{% asset_img ws_mpu6050.gif %}

## References

[1] [MPU6050 Gyro Sensor Interfacing with Raspberry Pi](https://circuitdigest.com/microcontroller-projects/mpu6050-gyro-sensor-interfacing-with-raspberry-pi)
