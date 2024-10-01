---
title: Axes & graduation
category: Python, Library, Matploblib
---

## Taille du graphique

* L'attribut `figsize=(width, height)` permet de définir la taille de la figure (unité: inches).

  ``` python
  plt.figure(figsize=(12, 6))
  ```

  ``` python
  fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(12, 6))
  ```

* Notons que par défaut, les sous-graphiques à l'intérieur de la figure sont collés les uns contre les autres, pour occuper tout l'espace, appeller la fonction `plt.tight_layout()` après avoir définit tous les sous-graphiques.

* Pour définir les paramètres par défaut pour toutes les figures:

  ``` python
  plt.rcParams['figure.figsize'] = [8.0, 6.0]
  plt.rcParams['figure.dpi'] = 80
  plt.rcParams['savefig.dpi'] = 100

  plt.rcParams['font.size'] = 12
  plt.rcParams['legend.fontsize'] = 'large'
  plt.rcParams['figure.titlesize'] = 'medium'
  ```

---

## Titre

* API globale: `plt.title`

  ``` python
  plt.title("My title")
  ```

* Pour une figure contenant plusieurs sous-graphiques: `fig.suptitle`, `ax.set_title`

  ``` python
  x = np.arange(1, 100)
  fig = plt.figure(figsize=(12, 3))
  fig.suptitle("Figures", fontsize=20, y=1.1) # y=0: bottom, y=1: top

  # Graph #1
  ax = fig.add_subplot(1, 2, 1)
  ax.plot(x, x)
  ax.set_xlabel('X')
  ax.set_ylabel('X')
  ax.set_title("Graph 1")

  # Graph #2
  ax = fig.add_subplot(1, 2, 2)
  ax.plot(x, -x)
  ax.set_xlabel('X')
  ax.set_ylabel('-X')
  ax.set_title("Graph 2")

  fig.tight_layout()
  ```

  ![](https://i.imgur.com/OGLppOQ.png)

---

## Titre des ordonnées

* Les méthodes `plt.xlabel` et `plt.ylabel` permettent de définir le titre des ordonnées

  ``` python
  fig = plt.figure(figsize=(6, 3))
  plt.plot(x, x)
  plt.xlabel("X")
  plt.ylabel("Y")
  plt.title("Title")
  ```

  ![](https://i.imgur.com/u17GBGw.png)

* Pour un sous-graphique: `ax.set_xlabel` et `ax.set_ylabel`

  On peut également utiliser la méthode `set`

  ``` python
  ax.set(
    xlabel='time (s)',
    ylabel='voltage (mV)',
    title='About as simple as it gets, folks')
  ```

---

## Couleur du fond

* L'attribut `facecolor=color` permet de définir la couleur de fond d'une figure.

  ``` python
  plt.figure(figsize=(6, 3), facecolor='grey')
  plt.plot(x, x)
  ```

  ![](https://i.imgur.com/ft1Ts8Q.png)

* L'attribut `facecolor` ou la méthode `ax.set_facecolor` permettent de définir la couleur de fond d'un graphique.

  ``` python
  fig = plt.figure(figsize=(6, 3), facecolor='grey')
  ax = fig.add_subplot(1, 1, 1)
  ax.set_facecolor('lightgrey')
  ax.plot(x, x)
  ```

  ``` python
  fig = plt.figure(figsize=(6, 3), facecolor='grey')
  ax = fig.add_subplot(1, 1, 1, facecolor='lightgrey')
  ax.plot(x, x)
  ```

  ![](https://i.imgur.com/54c68ZV.png)

* Pour définir la couleur du fond pour tous les graphiques:

  ``` python
  plt.rcParams['figure.facecolor'] = '0.75'
  ```

---

## Axes

### Limites

* `plt.xlim` et `plt.ylim` permettent de modifier l'intervalle du graphique.

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)

  plt.xlim(-5,15)
  plt.ylim(-5,15)
  ```

  ![](https://i.imgur.com/VgxRXdp.png)

* `ax.set_xlim` et `ax.set_ylim` pour un sous-graphique.

### Bords

* On peut personnaliser les bords du graphique (*spine* en anglais)

  ``` python
  x   = np.arange(0, 10)
  fig = plt.figure()
  ax  = fig.add_subplot(1,1,1)

  ax.plot(x, x)
  ax.spines['right'].set_color('none')
  ax.spines['top'].set_color('none')
  ```

  ![](https://i.imgur.com/gkqAN55.png)

  [Documentation spines](https://matplotlib.org/3.1.1/api/spines_api.html)

* On peut complètement désactiver l'affichage des axes et de la graduation:

  ``` python
  x = np.arange(0, 10)
  plt.axis('off')
  plt.plot(x, x)
  ```

  ``` python
  x = np.arange(0, 10)
  fig, ax = plt.subplots(1,1)
  ax.set_axis_off()
  plt.plot(x, x)
  ```

  ![](https://i.imgur.com/cwlK4Pu.png)

---

## Graduation

### Nombre de graduations

* `plt.xticks` et `yticks` permettent de définir la graduation à utiliser pour l'axe *x* et *y* respectivement.  
  `ax.set_xticks` et `ax.set_yticks` pour un sous-graphique.

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.xticks(np.arange(0,10))
  ```

  ![](https://i.imgur.com/XQVhP3z.png)

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.xticks([])
  plt.yticks([])
  ```

  ![](https://i.imgur.com/tb2oY58.png)

* Ou en peut définir le nombre total de graduations à utiliser:

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.gca().xaxis.set_major_locator(plt.MaxNLocator(3))
  ```

  ![](https://i.imgur.com/vowwgyb.png)

* `set_xticklabels` permet de modifier les labels

  ``` py
  def readable_numbers(x):
      """takes a large number and formats it into K,M to make it more readable"""
      if x >= 1e6:
          s = '{:1.1f}M'.format(x*1e-6)
      else:
          s = '{:1.0f}K'.format(x*1e-3)
      return s

  # Create boxplot
  box = sns.boxplot(x=df['number_of_strikes'])
  g = plt.gca()
  box.set_xticklabels(np.array([readable_numbers(x) for x in g.get_xticks()]))
  plt.xlabel('Number of strikes')
  plt.title('Yearly number of lightning strikes');
  ```

  ![](https://i.imgur.com/csXVxLu.png)

### Position

* On peut modifier l'emplacement de la graduation:

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.gca().yaxis.set_ticks_position('right')
  ```

  ![](https://i.imgur.com/naJIJ6h.png)

### Labels

* On peut assigner un label aux graduations:

  ``` python
  x = np.arange(0, 10)
  plt.bar(x, x)
  plt.xticks(range(11), list('abcdefijkl'))
  ```

  ``` python
  fig, ax = plt.subplots()
  x = np.arange(0, 10)

  ax.bar(x, x)
  ax.set_xticks(range(11), list('abcdefijkl'))
  ```

  ``` python
  fig, ax = plt.subplots()
  x = np.arange(0, 10)

  ax.bar(x, x)
  ax.xaxis.set_ticks(range(11))
  ax.xaxis.set_ticklabels(list('abcdefijkl'))
  ```

  ![](https://i.imgur.com/VrVy1J3.png)

* On peut définir les labels avec un formatter:

  ``` python
  from matplotlib.ticker import FuncFormatter
  formatter = FuncFormatter(lambda x,pos: '$%1.1fk' % (x * 1e-3))

  x = np.random.randint(25000,50000,100)
  plt.plot(x)
  plt.gca().yaxis.set_major_formatter(formatter)
  ```

  ![](https://i.imgur.com/KDwVpL5.png)

  ``` python
  from matplotlib import ticker
  formatter = ticker.PercentFormatter(xmax=10)

  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.gca().xaxis.set_major_formatter(formatter)
  ```

  ![](https://i.imgur.com/iQMymmi.png)

  ![](https://i.imgur.com/v9ZHgZF.png)

### Sous-graduation

* On peut également afficher une graduation non labellée (tics mineurs):

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.minorticks_on()
  ```

  ![](https://i.imgur.com/T5U9uBS.png)

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.minorticks_on()
  plt.gca().xaxis.set_ticks(np.arange(0,10), minor=True)
  plt.gca().yaxis.set_ticks(np.arange(0,10), minor=True)
  ```

  ![](https://i.imgur.com/OOAyuvR.png)

### Style

* On peut modifier le style des graduations avec la fonction `tick_params`

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.minorticks_on()
  plt.gca().xaxis.set_ticks(np.arange(0,10), minor=True)
  plt.gca().yaxis.set_ticks(np.arange(0,10), minor=True)

  plt.tick_params(rotation=90, axis='x')
  plt.tick_params(color='red', width=2, length=10)
  plt.tick_params(length=5, which='minor')
  ```

  ![](https://i.imgur.com/AvhD2zK.png)

---

## Grille

* La méthode `grid` permet d'afficher la grille du graphique

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.grid()
  ```

  ``` python
  fig, ax = plt.subplots()
  x = np.arange(0, 10)

  ax.plot(x,x)
  ax.set_axisbelow(True)
  ax.grid()
  ```

  ![](https://i.imgur.com/mjtvkbV.png)

* Différents paramètres permettant de personnaliser l'apparence de la grille: [Documentation grid](https://matplotlib.org/3.3.1/api/_as_gen/matplotlib.pyplot.grid.html)

  ``` python
  plt.grid(color='lightgrey')
  ```

* Par défaut grid ne s'applique que sur les tics majeurs, le paramètre `which` permet de contrôler sur quoi on veut l'appliquer:

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.minorticks_on()
  plt.gca().xaxis.set_ticks(np.arange(0,10), minor=True)
  plt.gca().yaxis.set_ticks(np.arange(0,10), minor=True)

  plt.grid()
  plt.grid(which='minor', alpha=0.2)
  ```

  ![](https://i.imgur.com/jLJEBD2.png)

* Pour modifier l'apparence de la grille pour tous les graphiques:

  ``` python
  plt.rcParams['grid.color'] = 'k'
  plt.rcParams['grid.linestyle'] = ':'
  plt.rcParams['grid.linewidth'] = 0.5
  plt.rcParams['axes.axisbelow'] = True
  ```

---

## Marges

* On peut modifier l'emplacement initial des ticks avec `margins`

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.margins(x=0, y=0.1)
  ```

  ![](https://i.imgur.com/MzYElh7.png)

* Par défaut, certains graphiques (comme imshow) ne prennent pas en compte les marges. On peut désactiver ce comportement avec `use_sticky_edges = False`

  ``` python
  X = np.random.uniform(0,1,(8,8))
  plt.imshow(X)
  plt.gca().use_sticky_edges = False
  plt.margins(x=0.05, y=0.05)
  ```

  ![](https://i.imgur.com/AEu86hx.png)

---

Pour aller plus loin:
[Axis API](https://matplotlib.org/api/axes_api.html)