---
title: Style
category: Python, Library, Matploblib, Préférences
---

## Style par défaut

On peut changer le style par défaut des graphiques:

* Pour l'ensemble des graphiques

  ``` python
  plt.style.use('ggplot')
  ```

  ``` python
  # Combiner plusieurs styles
  plt.style.use(['dark_background', 'presentation'])
  ```

* Pour un bloc de code donné

  ``` python
  with plt.style.context('ggplot'):
      plt.plot(x, x + 0)
      plt.plot(x, x + 1)
  ```

* Notons que le style est assigné au moment au on crée le graphique — quand on appelle `subplot`.

  ``` python
  x1     = np.random.randn(50)
  x2     = np.random.randn(50)
  styles = [
      'fast', # default
      'classic',
      'grayscale',
      'dark_background',
      'fivethirtyeight',
      'ggplot',
      'Solarize_Light2',
      'bmh',
      'seaborn',
      'seaborn-notebook',
      'seaborn-bright',
      'seaborn-pastel'
  ]
  fig    = plt.figure(figsize=(12, len(styles)))

  nrows  = len(styles)//2
  ncols  = 2
  row, col = 0, 0

  for i, style in enumerate(styles):
      with plt.style.context(style):
          ax = fig.add_subplot(nrows, ncols, i+1)
          ax.plot(x1)
          ax.plot(x2)
          ax.set_title(style, color='black')

      if col == 1:
          row += 1
      col = 1-col

  fig.tight_layout()
  ```

  ![](https://i.imgur.com/Nwph7BI.png)

---

## Styles installés

* Pour vérifier la liste des styles installés:

  ``` python
  print(plt.style.available)
  ```

* Pour créer un style personnalisé, créer un fichier [`.mplstyle`](https://matplotlib.org/3.3.0/tutorials/introductory/customizing.html#the-matplotlibrc-file)

  ``` txt
  axes.titlesize : 24
  axes.labelsize : 20
  lines.linewidth : 3
  lines.markersize : 10
  xtick.labelsize : 16
  ytick.labelsize : 16
  ```

  Et le charger en passant le path du fichier:

  ``` python
  plt.style.use('./images/presentation.mplstyle')
  ```

  Ou, pour ne pas avoir à passer le path à chaque fois, placer le fichier dans `~/.config/matplotlib/stylelib`.

---

## Changer dynamiquement

On peut changer les préférences inviduellement:

* En mettant à jour la variable `matplotlib.rcParams`

  ``` python
  import matplotlib as mpl

  mpl.rcParams['lines.linewidth'] = 2
  mpl.rcParams['lines.linestyle'] = '--'
  ```

* En utilisant la méthode `rc`

  ``` python
  mpl.rc('lines', linewidth=4, linestyle='-.')
  ```

  Pour remettre le style par défaut:

  ``` python
  plt.rcParams.update(plt.rcParamsDefault)
  ```

  [Valeurs par défaut](https://gist.github.com/a-mt/6b3ad13dbfa947ba8c1d771f685456df)

* Ou la méthode `rc_context` pour n'appliquer le style que sur un bloc donné:

  ``` python
  discreet = {
      'lines.linestyle': 'dashed',
      'lines.color'    : 'gray',
      'lines.linewidth': 1}

  plt.figure(figsize=(10,5))
  plt.subplot(121)
  plt.plot(lag_acf)

  with plt.rc_context(discreet):
      plt.axhline(y=0)
      plt.axhline(y=-1.96/np.sqrt(n))
      plt.axhline(y=1.96/np.sqrt(n))

  plt.title('Auto-Correlation Factor (ACF)')

  plt.subplot(122)
  plt.plot(lag_pacf)

  with plt.rc_context(discreet):
      plt.axhline(y=0)
      plt.axhline(y=-1.96/np.sqrt(n))
      plt.axhline(y=1.96/np.sqrt(n))

  plt.title('Partial Auto-Correlation Factor (PACF)')
  ```

---

## Paramètres

Dernière alternative pour modifier le style des graphique: modifier au cas par cas avec les paramètres de style des fonctions. Par exemple la couleur du titre:

``` python
plt.title("Title", color="red")
```

![](https://i.imgur.com/2C1vEdx.png)

---

## XKCD

La méthode `xkcd` permet de dessiner les graphiques comme un croquis pour les éléments dessiné après l'appel de la fonction. Pour de meilleurs résultats, installer la police "Humor Sans".

``` python
with plt.xkcd():
    x = np.arange(0, 10)
    plt.plot(x, x)
```

![](https://i.imgur.com/3alBou7.png)

La syntaxe `with` a l'avantage de n'appliquer XKCD qu'au bloc intérieur, si on n'utilise pas with, on peut remettre les paramètres par défaut comme suit:

``` python
# Remove XKCD mode:
plt.rcdefaults()
```