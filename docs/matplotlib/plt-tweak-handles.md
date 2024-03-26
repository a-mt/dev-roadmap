---
title: Courbes
category: Python, Library, Matploblib, Préférences
---

## Couleur & alpha

* L'attribut `color` permet de spécifier la couleur de remplissage (des lignes, du titre, etc)  
  Matploblib reconnaît différents formats:

  | Format | Spécifie | Example
  |---     |---       |---
  | tuple (3,) de valeurs entre 0 et 1 | couleur RGB  | `color=(1,0,0)`
  | tuple (4,) de valeurs entre 0 et 1 | couleur RGBA | `color=(1,0,0,0.5)`
  | chaîne contenant une valeur entre 0 et 1 | couleur en niveau de gris | `color="0.5"`
  | chaîne hexadécimale RGB  | couleur RGB   | `color="#FF0000"`
  | chaîne hexadécimale RGBA | couleur RGBA | `color="#ff000080"`
  | [nom de couleur](https://matplotlib.org/3.1.0/gallery/color/named_colors.html) | couleur RGB | `color="red"`
  | spécification CN<sup>(1)</sup> | couleur RGB | `color="C0"`

  (1): "C" suivit d'un nombre qui est un index dans le cycle de couleur utilisé par Pandas

* L'attribut `edgecolor` permet de spécifier la couleur des bords
* L'attribut `alpha` permet de spécifier l'opacité du trait  
  (0 = opaque, 1 = transparent, 0.5 = semi-transparent)

<ins>Exemples</ins>:

``` python
x = np.arange(0, 10)
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(nrows=2, ncols=2, figsize=(12, 6))

ax1.plot(x, x + 0, color='0.0', label='0.0')
ax1.plot(x, x + 1, color='0.5', label='0.5')
ax1.plot(x, x + 2, color='1.0', label='1.0')
ax1.legend()

ax2.plot(x, x + 0, color=(1,0,0), label='(1,0,0)')
ax2.plot(x, x + 1, color=(1,0,0), alpha=0.5, label='(1,0,0) + alpha')
ax2.plot(x, x + 2, color=(1,0,0,.5), label='(1,0,0,0.5)')
ax2.legend()

ax3.plot(x, x + 0, color='#FF0000', label='#FF0000')
ax3.plot(x, x + 1, color='#FF0000', alpha=0.5, label='#FF0000 + alpha')
ax3.plot(x, x + 2, color='#ff000080', label='#ff000080')
ax3.legend()

ax4.plot(x, x + 0, color='red', label='red')
ax4.plot(x, x + 1, color='red', alpha=0.5, label='red + alpha')
ax4.legend()
```

![](https://i.imgur.com/rhCOTPt.png)

``` python
x = np.arange(0, 10)

plt.plot(x, x + 0)
plt.plot(x, x + 1)
plt.plot(x, x + 2, color='C0')
plt.plot(x, x + 3, color='C1')
```

![](https://i.imgur.com/e42iI7Z.png)

``` python
x = np.arange(0, 10)

plt.scatter(x, x, color='white', edgecolor='k')
plt.scatter(x, x + 1, color='k')
```

![](https://i.imgur.com/2QhJRtp.png)

---

## Style & épaisseur de ligne

* L'attribut `linewidth` permet de définir l'épaisseur du trait

  ``` python
  x = np.arange(0, 10)

  plt.plot(x, x + 0, label='default (1)')
  plt.plot(x, x + 1, linewidth=2, label='2')
  plt.plot(x, x + 2, linewidth=3, label='3')
  plt.plot(x, x + 3, linewidth=4, label='4')
  plt.plot(x, x + 4, linewidth=5, label='5')

  plt.legend(bbox_to_anchor=(1.05, 1), prop={'size': 15})
  ```

  ![](https://i.imgur.com/T1yOdrE.png)

* L'attribut `linestyle` permet de définir le style du trait

  ``` python
  x = np.arange(0, 10)

  plt.plot(x, x + 0, linestyle='solid', label='solid (-)')
  plt.plot(x, x + 1, linestyle='dashed', label='dashed (--)')
  plt.plot(x, x + 2, linestyle='dashdot', label='dashdot (-.)')
  plt.plot(x, x + 3, linestyle='dotted', label='dotted (:)')
  plt.plot(x, x + 4, linestyle=(0,(5,1)), label='custom')

  plt.legend(bbox_to_anchor=(1.05, 1), prop={'size': 15})
  ```

  ![](https://i.imgur.com/xqu3Fcq.png)

* L'attribut `capstyle` ou `dash_capstyle` permet de définir le style des fins de ligne

  ``` python
  x = np.arange(0, 10)

  plt.plot(x, x + 0, linestyle='dashed', linewidth=5, label='default (butt)')
  plt.plot(x, x + 1, linestyle='dashed', linewidth=5, dash_capstyle='round', label='round')
  plt.plot(x, x + 2, linestyle='dashed', linewidth=5, dash_capstyle='projecting', label='projecting')

  plt.legend(bbox_to_anchor=(1.05, 1), prop={'size': 15})
  ```

  ![](https://i.imgur.com/XR5poiw.png)

---

## Marqueurs

* L'attribut `marker` permet de définir la forme utilisée pour les points

  ``` python
  x = np.random.randint(0,2,10)

  plt.plot(x, label='default')
  plt.plot(x - 2, marker='.', label='.')
  plt.plot(x - 5, marker='o', label='o')
  plt.plot(x - 8, marker='s', label='s')
  plt.plot(x - 11, marker='P', label='P')
  plt.plot(x - 14, marker='X', label='X')
  plt.plot(x - 17, marker='*', label='*')
  plt.plot(x - 20, marker='p', label='p')
  plt.plot(x - 23, marker='D', label='D')
  plt.plot(x - 26, marker='<', label='<')
  plt.plot(x - 29, marker='>', label='>')

  plt.legend(bbox_to_anchor=(1.05, 1), prop={'size': 15})
  ```

  ![](https://i.imgur.com/M9jriMZ.png)

  [Liste complètes des marqueurs](https://matplotlib.org/3.2.1/api/markers_api.html)

* L'attribut `markersize` permet de déifnir la taille des marqueurs

  ``` python
  x = np.random.randint(0,2,10)

  plt.plot(x, marker='.', label='default')
  plt.plot(x - 2, marker='.', markersize=1, label='1')
  plt.plot(x - 5, marker='.', markersize=5, label='5')
  plt.plot(x - 8, marker='.', markersize=10, label='10')
  plt.plot(x - 11, marker='.', markersize=15, label='15')
  plt.plot(x - 14, marker='.', markersize=20, label='20')

  plt.legend(bbox_to_anchor=(1.05, 1), prop={'size': 15})
  ```

  ![](https://i.imgur.com/8xskqTV.png)

* Pour définir la valeur par défaut sur tous les graphiques:

  ``` python
  plt.rcParam['lines.markersize'] = np.sqrt(20)
  ```

---

## Fmt

* On peut spécifier le style de trait, le style de marqueur et la couleur du trait en utilisant une notation abrégée:

  ``` txt
  fmt = '[marker][line][color]'
  ```

  Chacun d'entre eux est optionnel.  
  Les couleurs supportées sont celles en un caractère ainsi que les spécifications CN.

<ins>Exemple</ins>:

``` python
axes.plot(x, x + 0, '-og', label="solid green")
axes.plot(x, x + 1, '--c', label="dashed cyan")
axes.plot(x, x + 2, '-.b', label="dashdot blue")
axes.plot(x, x + 3, ':r', label="dotted red")
```

---

## Couleurs avec valeurs continues

* Certains graphiques peuvent afficher plus de deux dimensions, comme le scatterplot qui peut afficher 4 dimensions: position X, position Y, taille et couleur. Dans ce cas l'attribut `color` pend une liste de couleurs:

  ``` python
  fig = plt.figure(figsize=(5,5))

  df = pd.DataFrame({
      'x': [12,20,28,18,29,33,24,45,45,52,51,52,55,53,55,61,64,69,72],
      'y': [39,39,30,52,54,46,55,99,63,70,66,63,58,23,14, 8,19, 7,24],
      'c': ['r','r','r','r','r','r','r','b','b','b','b','b','b','g','g','g','g','g','g']
  })
  plt.scatter(df['x'], df['y'], color=df['c'], alpha=0.5)
  ```

  ![](https://i.imgur.com/zr98Vs1.png)

* Mais plutôt que de passer une liste de couleurs on peut utiliser une liste de valeurs avec le paramètre `c` — non seulement avec des valeurs discrètes mais des valeurs continues. Les couleurs seront automatiquement calculées.

  Appeler `colorbar` permet d'afficher la légende des couleurs et valeurs associées.

  ``` python
  fig = plt.figure(figsize=(5,5))

  df = pd.DataFrame({
      'x': [12,20,28,18,29,33,24,45,45,52,51,52,55,53,55,61,64,69,72],
      'y': [39,39,30,52,54,46,55,99,63,70,66,63,58,23,14, 8,19, 7,24],
      'c': [1,1,1,1,1,1.5,1.5,2,2,2,2,2.5,2.5,3,3,3,3,3.5,3.5]
  })
  plt.scatter(df['x'], df['y'], c=df['c'], alpha=0.5)
  plt.colorbar()
  ```

  ![](https://i.imgur.com/VwTfWb7.png)

* On peut changer l'ensemble de couleur utilisé avec le paramètre `cmap`

  ``` python
  plt.scatter(df['x'], df['y'], c=df['c'], cmap='Blues', alpha=0.5, edgecolor='k')
  plt.colorbar()
  ```

  ![](https://i.imgur.com/imHOJuP.png)

* Pour récupérer la liste des colormaps installées:

  ``` python
  print(plt.colormaps())
  ```

  ``` python
  maps = [x for x in sorted(plt.colormaps(), key=str.casefold) if not x.endswith('_r')]
  n = len(maps)
  p = n//2
  x = np.outer(np.arange(0,1,0.01), np.ones(10))

  fig, axes = plt.subplots(
      nrows=p,
      ncols=2,
      figsize=(30,len(maps)*0.3),
      facecolor='lightgrey'
  )
  fig.subplots_adjust(hspace=.1, right=.5)

  row = 0
  col = 0
  for _map in maps:
      ax = axes[row, col]
      ax.axis('off')
      ax.imshow(x.T, extent=[35, 130, 0, 10], cmap=_map, origin="lower")
      ax.text(0,3, _map, fontsize=12, ha='left')

      row += 1
      if row == p:
          col += 1
          row  =0
  ```

  ![](https://i.imgur.com/tNQatY7.png)

* Pour définir le colormap à utiliser pour tous les graphiques:

  ``` python
  plt.rcParams['image.cmap'] = 'jet'
  ```

[Colormap reference](https://matplotlib.org/2.0.2/examples/color/colormaps_reference.html)  
[Choosing Colormaps](https://matplotlib.org/3.1.0/tutorials/colors/colormaps.html)  
[Using custom colormaps](https://riptutorial.com/matplotlib/example/11646/using-custom-colormaps)

---

## Cycle

On peut modifier le cycle de couleur utilisé par un graphique

* Étape 1: créer un objet `cycler`

    ``` python
    # À partir d'une liste de couleurs
    custom_cycler = plt.cycler(color=['r', 'g', 'b'])

    # À partir d'un colormap discret
    custom_cycler = plt.cycler(color=plt.get_cmap('Pastel1').colors)

    # À partir d'un colormap continu
    N = 10
    custom_cycler = plt.cycler(color=plt.get_cmap('jet')(np.linspace(0,1,N)))
    ```

* Étape 2: définir le cycle du graphique

    ``` python
    ax.set_prop_cycle(custom_cycler)
    ```

   Pour définir le cycle par défaut de tous les graphiques:

    ``` python
    plt.rcParams['axes.prop_cycle'] = custom_cycler
    ```

    ``` python
    plt.rc('axes', prop_cycle=custom_cycler)
    ```

<ins>Exemple</ins>:

``` python
x = np.arange(0, 10)

cyclerA = plt.cycler(color=['r', 'g', 'b'])
cyclerB = plt.cycler(color=plt.get_cmap('Pastel1').colors)
cyclerC = plt.cycler(color=plt.get_cmap('jet')(np.linspace(0,1,3)))

fig = plt.figure(figsize=(12, 3))

for i, cycler in enumerate([cyclerA, cyclerB, cyclerC]):
    ax = fig.add_subplot(1, 3, i+1)
    ax.set_prop_cycle(cycler)
    ax.plot(x, x + 0)
    ax.plot(x, x + 1)
    ax.plot(x, x + 2)
```

![](https://i.imgur.com/0yeSE7u.png)

[Cycling through multiple properties](https://matplotlib.org/tutorials/intermediate/color_cycle.html#cycling-through-multiple-properties)