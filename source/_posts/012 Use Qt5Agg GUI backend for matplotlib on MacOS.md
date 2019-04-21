---
title: Use Qt5Agg GUI backend for matplotlib on MacOS
date: 2019-02-08 22:30:00
categories: Programming
tags: 
- Python
- Visualization
---

## Problem

If you use matplotlib to plot diagram on MacOS, you may get following error.

> ImportError: Python is not installed as a framework. The Mac OS X backend will not be able to function correctly if Python is not installed as a framework. See the Python documentation for more information on installing Python as a framework on Mac OS X. Please either reinstall Python as a framework, or try one of the other backends. If you are using (Ana)Conda please install python.app and replace the use of 'python' with 'pythonw'. See 'Working with Matplotlib on OSX' in the Matplotlib FAQ for more information.

Checkout the file `matplotlibrc` in 'site-packages/matplotlib/mpl-data/' and we know we should use one of the following backends:

- MacOSX
- Qt5Agg
- Gtk3Agg
- ...

{% asset_img matplotlibrc.png %}

## Solution

If you use MacOSX as the backend, you should reinstall your python with the parameter `--with-tcl-tk`. I use pyenv & virtualenv to manage my python versions and I do not know how to deal with it. So i try the second option — Qt5Agg and it worked.

### Install PyQt5

```bash
$ brew install pyqt
$ pip install PyQt5
```

### Change Backend

Add the following code to the top of the file

```python
import matplotlib
matplotlib.use('Qt5Agg')
```

### Test

```python
import matplotlib
matplotlib.use('Qt5Agg')

import numpy as np
import matplotlib.pyplot as plt
from matplotlib import animation

speed = 0.03
fig, ax = plt.subplots()
x = np.arange(0, 2 * np.pi, 0.01)
line, = ax.plot(x, np.sin(x))

ani = animation.FuncAnimation(
    fig=fig,
    func=lambda i: line.set_ydata(np.sin(x + i * speed)),
    frames=int(2 * np.pi / speed),
    init_func=lambda: line.set_ydata(np.sin(x)),
    interval=1,
    blit=False
)
plt.show()
```

{% asset_img animate.gif %}