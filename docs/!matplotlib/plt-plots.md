---
title: Graphiques
category: Python, Library, Matploblib
---

## Line plot

```
plt.plot(x,y)
```

![](https://i.imgur.com/kh58W88.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
X = np.linspace(0, 4*np.pi, 1000)
Y = np.sin(X)
plt.plot(X, Y)
</pre>
</details>
<br>

![](https://i.imgur.com/8j3Fvp6.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
from scipy.stats import norm

x = np.arange(-3, 3, 0.01)
plt.plot(x, norm.pdf(x))
plt.plot(x, norm.pdf(x, 1.0, 0.5))
</pre>
</details>
<br>

![](https://i.imgur.com/7Yaxok7.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
X = np.linspace(0, 4*np.pi, 50)
Y = np.sin(X)
plt.plot(X, Y, '-ok')
</pre>
</details>

---

## Horizontal & vertical lines

```
plt.axvline(x)
plt.axhline(y)
```

![](https://i.imgur.com/muBHabh.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.arange(-3, 3, 0.01)
y = norm.pdf(x)
plt.plot(x, y)

plt.axvline(x.mean(), color='red')
plt.axhline(y.max(), color='grey')
</pre>
</details>

---

## Text

```
plt.text(x, y, str)
```

![](https://i.imgur.com/tTAJRzR.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
fig, ax = plt.subplots(2, 3, sharex='col', sharey='row')

for i in range(2):
    for j in range(3):
        ax[i, j].text(0.5, 0.5, str((i, j)),
                      ha='center', va='center', fontsize=10)
</pre>
</details>

[Precise text layout](https://matplotlib.org/3.2.1/gallery/text_labels_and_annotations/text_alignment.html)

---

## Annotate

```
plt.annotate(xy, xtext, arrowprops, bbox, xycoords)

# xy        : emplacement pointé par la flèche
# xytext    : emplacement du text
# arrowprops: personnaliser la flèche
# bbox      : personnaliser le cadre autour du texte
# xycoords  : permet de changer le point de référence — xy sera calculé non plus à partir du coin en bas gauche (0,0) du graphique mais relativement aux coordonnées données (xcoord, ycoord).
```

  <ins>arrowprops.arrowstyle</ins>:

  ![](https://i.imgur.com/riBqZuf.png)

  <ins>arrowprops.connectionstyle</ins>:

  ![](https://i.imgur.com/Rg19tKy.png)

### Exemples

![](https://i.imgur.com/nztsi4P.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Annotation simple
x = np.arange(0, 10)
plt.plot(x, x)

plt.annotate(
    'Mon commentaire\nsuper utile',
    xy=(4, 4),
    xytext=(2, 6),
    arrowprops=dict(arrowstyle='->')
)
</pre>
</details>

![](https://i.imgur.com/z188nZI.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# bbox, connectionstyle
x = np.arange(0, 10)
plt.plot(x, x)

plt.annotate(
    'Mon commentaire\nsuper utile',
    xy=(4, 4),
    xytext=(6, 0),
    arrowprops=dict(arrowstyle='-|>', connectionstyle="bar,angle=180,fraction=-0.2"),
    bbox=dict(boxstyle="round", fc="0.8")
)
</pre>
</details>

![](https://i.imgur.com/e60z4bn.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# edge color, fill color, relpos
x = np.arange(0, 10)
plt.plot(x, x)

plt.annotate(
    'Mon commentaire\nsuper utile',
    xy=(4, 4),
    xytext=(6, 3),
    arrowprops=dict(
        arrowstyle="wedge,tail_width=1.", # arrow style
        fc=(1.0, 0.7, 0.7),               # fill color
        ec="none",                        # edge color
        patchA=None,                      # head patch (définit la forme utilisée)
        relpos=(0.2, 0.5)                 # move position
    ),
    bbox=dict(
        boxstyle="round",                 # box style 
        fc=(1.0, 0.7, 0.7),               # fill color
        ec="none"                         # edge color
    )
)
</pre>
</details>

![](https://i.imgur.com/SoB9Ueu.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# xycoords (désigner l'emplacement d'une autre annotation)
plt.xlim(0,10)
plt.ylim(0,10)
an1 = plt.annotate('Text 1', xy=(5, 5), bbox={"fc":"w"})
an2 = plt.annotate('Text 2', xycoords=an1, xy=(1.05, 0.5), xytext=(2,0.5), va="center", bbox={"fc":"w"}, arrowprops=dict(arrowstyle="->"))
</pre>
</details>

Une autre possibilité pour annoter le graphique est d'utiliser `text`:

![](https://i.imgur.com/RLYjDmR.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
plt.xlim(0,10)
plt.ylim(0,10)
t = plt.text(
    5, 5,
    "Mon texte",
    ha="center", va="center",
    rotation=45, size=15,
    bbox=dict(
        boxstyle="rarrow,pad=0.3",
        fc="lightgrey",
        ec="k",
        lw=2
    ))
</pre>
</details>

---

## Pie chart

```
plt.pie(values)
```

![](https://i.imgur.com/ETaiOxZ.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
values  = [12, 55, 4, 32, 14]
explode = [0, 0, 0.2, 0, 0]
labels  = ['India', 'United States', 'Russia', 'China', 'Europe']
colors  = ['r', 'g', 'b', 'c', 'm']

plt.pie(values, colors=colors, labels=labels, explode=explode)
</pre>
</details>
<br>

![](https://i.imgur.com/NgnPQXB.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
values  = [12, 55, 4, 32, 14]
labels  = ['India', 'United States', 'Russia', 'China', 'Europe']

_patches, _labels, _percents = plt.pie(
    values,
    labels=labels,
    wedgeprops=dict(width=0.5), # donut
    autopct='%.0f%%',           # display percentages
    pctdistance=0.75            # position of percentages
)

# custom settings for percentages
plt.setp(_percents, color='white', weight='bold')
</pre>
</details>
<br>

![](https://i.imgur.com/aqCEELh.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
from matplotlib.patches import Patch

values  = np.array([(10,2), (15,40), (2,2), (20,12), (10,4)])
labels  = ['India', 'United States', 'Russia', 'China', 'Europe']

colors  = plt.get_cmap('jet')(np.linspace(0,1,5))
colorsB = np.tile(colors, 2).reshape(-1,4)
colorsB[::2, 3]  = 0.3   # alpha 0.3 for even values
colorsB[1::2, 3] = 0.5   # alpha 0.5 for odd values

# Outer pie (radius 1 -> 1-width)
plt.pie(
    values.sum(axis=1),
    wedgeprops=dict(width=0.3, edgecolor='w'), radius=1,
    labels=labels,
    colors=colors
)

# Inner pie (radius 0.7 -> 0.7-width)
plt.pie(
    values.flatten(),
    wedgeprops=dict(width=0.3, edgecolor='w'), radius=0.7,
    colors=colorsB
)

# Add legends
plt.gca().add_artist(
    plt.legend(bbox_to_anchor=(1.1,1), loc='upper left')
)
plt.gca().add_artist(
    plt.legend(
        handles=[
            Patch(facecolor=colorsB[0], label='A'),
            Patch(facecolor=colorsB[1], label='B')
        ],
        bbox_to_anchor=(1.1,0.6),
        loc='upper left'
    )
)
</pre>
</details>

---

## Bar chart

```
# Barres verticales
plt.bar(categories, values)

# Barres horizontales
plt.barh(categories, values)
```

![](https://i.imgur.com/N8ddClx.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
values  = [12, 55, 4, 32, 14]
labels  = ['India', 'United States', 'Russia', 'China', 'Europe']
plt.bar(labels, values)
</pre>
</details>
<br>

![](https://i.imgur.com/o5HghCC.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
values = [12, 55, 4, 32, 14]
labels = ['India', 'United States', 'Russia', 'China', 'Europe']
colors = ['r', 'g', 'b', 'c', 'm']

# Bar chart
rects = plt.bar(range(0,5), values, color=colors, tick_label=labels)

# Add annotation on top of bars
for i,rect in enumerate(rects):
    plt.annotate(
        values[i],
        xy=(
            rect.get_x() + (rect.get_width() / 2),
            rect.get_y() + rect.get_height() + 1),
        horizontalalignment='center'
    )

# Add margin for extra space
plt.margins(y=0.10)
</pre>
</details>
<br>

![](https://i.imgur.com/gHtK5SC.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Tweaks to display bars side by side
w = .2
n = 3
k = (w*(1-n)/2)

# Values
x = np.arange(1, 11)
y = np.random.uniform(1,10,10)

y1 = y+np.linspace(-1,1,10)
y2 = y+np.linspace(-2,2,10)
y3 = y+np.linspace(-3,3,10)

# Plot
plt.bar(x+k+w*0, y1, label='A', width=w, ec='k')
plt.bar(x+k+w*1, y2, label='B', width=w, ec='k')
plt.bar(x+k+w*2, y3, label='C', width=w, ec='k')

plt.legend()
plt.xticks(x)
</pre>
</details>

---

## Scatter plot

```
plt.scatter(x, y)
```

![](https://i.imgur.com/GGCuMxe.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.arange(0,60)
y = x**2
plt.scatter(x,y)
</pre>
</details>
<br>

![](https://i.imgur.com/5CAy27r.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Scatter plot
X = np.random.normal(size=100)
Y = X + np.linspace(-1,1,100)
plt.scatter(X, Y)

# Regression line
denominator = X.dot(X) - X.mean() * X.sum()

a = (X.dot(Y) - Y.mean() * X.sum()) / denominator
b = (Y.mean() * X.dot(X) - X.mean() * X.dot(Y)) / denominator

X1 = np.arange(X.min(), X.max()+1, 1)
Y1 = a*X1+b
plt.plot(X1, Y1, '-r')
</pre>
</details>
<br>

![](https://i.imgur.com/zT652dz.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.random.rand(100)
y = np.random.rand(100)
size   = np.pi * (10 * np.random.rand(100))**2
colors = np.random.rand(100)

plt.scatter(x, y, s=size, c=colors, alpha=0.8, cmap='Spectral')
plt.colorbar()
</pre>
</details>

---

## Histogram

```
plt.hist(x)
```

![](https://i.imgur.com/qEvHe6H.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
a = np.random.randint(20, 60, size=50)

_min  = 20
_max  = 60
_step = 5

plt.hist(a, bins=int((_max-_min)/_step), range=(_min,_max))
plt.grid()
</pre>
</details>
<br>

![](https://i.imgur.com/avf3s4j.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x1 = np.random.normal(27000, 15000, 10000)
x2 = np.random.normal(27000, 15000, 5000)

plt.hist(x1, bins=50, label='X1')
plt.hist(x2, bins=50, label='X2')
plt.legend()
</pre>
</details>
<br>

![](https://i.imgur.com/PXIinjy.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
std = 3
mu  = 0

x = np.random.normal(mu,std,1000)
n, bins, patches = plt.hist(x, bins=50, density=True)

y = ((1 / (np.sqrt(2 * np.pi) * std))
    * np.exp(-0.5 * (1 / std * (bins - mu))**2))

plt.plot(bins, y, '--')
</pre>
</details>

---

## Boxplot

```
plt.boxplot(x)
```

![](https://i.imgur.com/YGRP4zU.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.concatenate((
  np.random.rand(100) * 100 - 40,
  np.random.rand(10) * 50 + 100,
  np.random.rand(10) * -50 - 100
))
plt.boxplot(x)
</pre>
</details>
<br>

![](https://i.imgur.com/eQWVxqA.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x2 = x * 1.7 + 50

plt.boxplot([x, x2], labels=['A', 'B'], vert=False)
</pre>
</details>

---

## Violinplot

```
plt.violinplot(x)
```

![](https://i.imgur.com/oHnSC2t.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.concatenate((
  np.random.rand(100) * 100 - 40,
  np.random.rand(10) * 50 + 100,
  np.random.rand(10) * -50 - 100
))

plt.violinplot(x)
</pre>
</details>

---

## Errorbar

```
plt.errorbar(x, y, yerr)
```

![](https://i.imgur.com/pUYW4md.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.arange(5)
y = np.random.uniform(1,6,5)

plt.errorbar(x, y, yerr=y/4,
    fmt='.k',
    elinewidth=1,
    capsize=2)
</pre>
</details>

---

## Fill between

```
plt.fill_between(x, y1, y2=0)
```

![](https://i.imgur.com/D6bHOKc.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = range(1,15)
y = [1,4,6,8,4,5,3,2,4,1,5,6,8,7]

plt.plot(x,y)
plt.fill_between(x, y, color="skyblue", alpha=0.4)
</pre>
</details>
<br>

![](https://i.imgur.com/O8B6uJX.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Scatter plot
X = np.random.normal(size=100)
Y = X + np.linspace(-1,1,100)
plt.scatter(X, Y)

# Regression line
denominator = X.dot(X) - X.mean() * X.sum()

a = (X.dot(Y) - Y.mean() * X.sum()) / denominator
b = (Y.mean() * X.dot(X) - X.mean() * X.dot(Y)) / denominator

X1 = np.arange(X.min(), X.max()+1, 1)
Y1 = a*X1+b
plt.plot(X1, Y1, '-r')

# Confidence bands
Y_err  = X1.std() * np.sqrt(1/len(X1) +
            (X1 - X1.mean())**2 / np.sum((X1 - X1.mean())**2))

plt.fill_between(X1,
    Y1 - Y_err,
    Y1 + Y_err,
    color="skyblue", alpha=0.4)
</pre>
</details>

---

## Contour

```
# Contour
plt.contour(X, Y, Z?)

# Contour + filling
plt.contourf(X, Y, Z?)
```

![](https://i.imgur.com/SvBDLip.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
X = np.random.uniform(0,1,(8,8))
plt.contourf(X)
</pre>
</details>
<br>

![](https://i.imgur.com/zbFddGH.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
url = 'http://www.esrl.noaa.gov/psd/thredds/dodsC/Datasets/ncep.reanalysis/surface/air.sig995.2018.nc'

from netCDF4 import Dataset as NetCDFFile
nc = NetCDFFile(url)

# Extract data from NetCDF file (may take a minute)
lats = nc.variables['lat'][:]
lons = nc.variables['lon'][:]
time = nc.variables['time'][:]
air  = nc.variables['air'][:]  # shape is time, lat, lon

# Convert time values to datetime objects
import datetime as dt
dt_time = [dt.date(1, 1, 1) + dt.timedelta(hours=t) for t in time]

# Take a random day in the year
time_idx = 237
cur_time = dt_time[time_idx]

# Draw the world temperature for this day
plt.contourf(lons, lats, air[time_idx, :, :], 11, cmap=plt.cm.Spectral_r)
plt.title("Air temperature on %s" % cur_time)
plt.colorbar()

#-------------------------------------

print(lons.shape)                 # (144,)
print(lats.shape)                 # (73,)
print(air[time_idx, :, :].shape)  # (73, 144)

# Point haut gauche
print(lons[0])                # 0.0
print(lats[0])                # 90.0
print(air[time_idx, 0, 0])    # 242.6

# Point au centre
print(lons[72])               # 180.0
print(lats[36])               # 0.0
print(air[time_idx, 36, 72])  # 300.8

# Point bas droit
print(lons[143])              # 357.5
print(lats[72])               # -90.0
print(air[time_idx, 72, 143]) # 230.6
</pre>
</details>
<br>

![](https://i.imgur.com/QHlOoxs.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
plt.contour(lons, lats, air[time_idx, :, :], 11, cmap=plt.cm.Spectral_r)
</pre>
</details>

---

## Imshow

```
plt.imshow(X)
```

![](https://i.imgur.com/Z08L7pD.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
X = np.random.uniform(0,1,(8,8))
plt.imshow(X)
</pre>
</details>
<br>

![](https://i.imgur.com/3bOb4wS.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Load mnist
from sklearn.datasets import load_digits
mnist = load_digits()

X = mnist.data
Y = mnist.target

# Print images
i = 0
nrows = 2
ncols = 5

fig, ax = plt.subplots(
    nrows,
    ncols,
    subplot_kw={'xticks': [], 'yticks': []},
    figsize=(6,3)
)
for row in range(nrows):
    for col in range(ncols):
        img   = X[i].reshape((8,8))
        label = Y[i]

        ax[row,col].imshow(img, cmap=plt.get_cmap('gray_r'))
        ax[row,col].set_title('target: %d' % label)
        i += 1

fig.tight_layout()
</pre>
</details>

---

## Hist2D

```
plt.hist2d(x, y)
```

![](https://i.imgur.com/XbOwiCG.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
mean = [0, 0]
cov  = [[1, 1], [1, 2]]
x, y = np.random.multivariate_normal(mean, cov, 10000).T

plt.hist2d(x, y, bins=30, cmap='Blues')
</pre>
</details>

---

## Hexbin

```
plt.hexbin(x, y)
```

![](https://i.imgur.com/Hewev8z.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
plt.hexbin(x, y, gridsize=30, cmap='Blues')
</pre>
</details>

---

## Step

```
plt.step(x, y)
```

![](https://i.imgur.com/ra4R28W.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.array([1, 3, 4, 5, 7]) 
y = np.array([1, 9, 16, 25, 49]) 

plt.step(x, y, where='pre', color='green', alpha=0.5)
plt.step(x, y, where='post', color='red', alpha=0.5)
plt.step(x, y, where='mid', color='blue', alpha=0.5)
</pre>
</details>

---

## Quiver

```
plt.quiver(U,V)
```

![](https://i.imgur.com/12viMHp.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
# Base of arrows
X = [0, 0] 
Y = [0, 0]

# Direction of arrows
U = [1, 0] 
V = [1, -1]

# Creating plot 
plt.quiver(X, Y, U, V, scale=5)
</pre>
</details>
<br>

![](https://i.imgur.com/qRzbctQ.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x,y  = np.meshgrid(np.arange(-2, 2, .2), np.arange(-2, 2, .25))
z    = x*np.exp(-x**2 - y**2)
v, u = np.gradient(z, .2, .2)

plt.quiver(u,v)
</pre>
</details>

---

## Barbs

```
plt.barbs(U,V)
```

![](https://i.imgur.com/Px2cQMc.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x = np.linspace(0, 15, 5)
X, Y = np.meshgrid(x, x)
U, V = X**2, Y**2

plt.barbs(X, Y, U, V, U)
</pre>
</details>

---

## Eventplot

```
plt.eventplot(x)
```

![](https://i.imgur.com/uY44GCg.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
spike = 100*np.random.random(100) 

plt.eventplot(spike) 
</pre>
</details>

---

## Xcorr

```
plt.xcorr(x,y)
```

![](https://i.imgur.com/Zr3n7CU.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
x, y = np.random.randn(2, 100) 

plt.xcorr(x, y, maxlags=50)
</pre>
</details>

---

## 3D Projections

![](https://i.imgur.com/Maj9J3a.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
a = np.arange(-1, 1, 0.02)
b = np.arange(-1, 1, 0.02)
a, b = np.meshgrid(a, b) 

ax = plt.axes(projection='3d')
ax.plot_surface(a, b, a**2 + b**2) 
</pre>
</details>

[3d plots in Python with examples](https://medium.com/@yzhong.cs/beyond-data-scientist-3d-plots-in-python-with-examples-2a8bd7aa654b)

---

## Basemap

![](https://i.imgur.com/dQZfR6F.png)

<details>
<summary>python ↑</summary>
<pre lang="python">
m = Basemap(projection='moll',
            llcrnrlat=-90, urcrnrlat=90,
            llcrnrlon=0, urcrnrlon=360,
            resolution='c', lon_0=0)

m.drawcoastlines()
m.drawmapboundary(fill_color="#DDEEFF")
m.fillcontinents(color="#FFDDCC", lake_color='#DDEEFF')
</pre>
</details>

[Basemap.ipynb](Basemap.html)