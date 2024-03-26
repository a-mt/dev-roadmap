---
title: Introduction
category: Python, Library, Matploblib
---

## Pourquoi Matplotlib

Pandas est une librairie utilisée pour visualiser des données 2D.

Par convention, Matplotlib.pyplot est importé sous le nom `plt`

``` python
import matplotlib.pyplot as plt

%matplotlib inline
```

## Bases

Pour dessiner un graphe, il y a différentes manières de procéder:

1. Matplotlib est integré avec Pandas, on peut appeler Matplotlib directement sur un DataFrame pour visualiser ses données:

    ``` python
    x  = np.arange(-10, 11)
    df = pd.DataFrame({
        'x^2'   : x ** 2,
        '-(x^2)': 1 - (x ** 2),
    }, index=x)

    ax = df.plot(figsize=(12, 6))
    ax.set_xlabel('X')
    ax.set_ylabel('X Squared')
    ax.set_title('My Nice Plot')
    ```

   ![](https://i.imgur.com/6OnqSt3.png)

   Par défaut, plot affiche un graphique ligne, mais on peut préciser un style de graphique différent (valeurs acceptées: line, bar, barh, hist, box, kde, area, pie, scatter ou hexbin)

   ``` python
   df_etc.plot(kind='hist', y='Ether', bins=150)
   ```

2. On peut utiliser l'API Matploblib globale — via `plt`

    ``` python
    plt.figure(figsize=(12, 6))
    plt.plot(x, x ** 2, label='x^2')
    plt.plot(x, -1 * (x ** 2), label='-(x^2)')
    plt.legend()

    plt.xlabel('X')
    plt.ylabel('X Squared')
    plt.title('My Nice Plot')
    ```

3. Ou l'API Matplotlib orientée objet — en créant un objet avec `subplots`.  
   Notons que Pandas retourne un objet Matplotlib

    ``` python
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(x, x ** 2, label='x^2')
    ax.plot(x, -1 * (x ** 2), label='-(x^2)')
    ax.legend()

    ax.set_xlabel('X')
    ax.set_ylabel('X Squared')
    ax.set_title("My Nice Plot")
    ```

## Quadriller l'espace

On peut quadriller l'espace pour afficher plusieurs graphiques.

* <ins>API globale</ins>: `subplot`  
  Prend 3 paramètres: nombre de lignes, nombres de colonne, panel sélectionné:

  ``` python
  x = np.arange(1, 100)
  plt.figure(figsize=(12, 6))

  # Graph #1
  plt.subplot(3, 2, 1)
  plt.plot(x, x)
  plt.xlabel('X')
  plt.ylabel('X')

  # Graph #2
  plt.subplot(3, 2, 2)
  plt.plot(x, -x)
  plt.xlabel('X')
  plt.ylabel('-X')

  # Graph #3
  plt.subplot(3, 2, 3)
  plt.plot(x, x**2)
  plt.xlabel('X')
  plt.ylabel('X^2')

  # Graph #4
  plt.subplot(3, 2, 4)
  plt.plot(x, -(x**2))
  plt.xlabel('X')
  plt.ylabel('-(X^2)')

  # Graph #5
  plt.subplot(3, 2, 5)
  plt.plot(x, np.log(x))
  plt.xlabel('X')
  plt.ylabel('log(X)')

  # Graph #6
  plt.subplot(3, 2, 6)
  plt.plot(x, -np.log(x))
  plt.xlabel('X')
  plt.ylabel('-log(X)')

  # Pour éviter que les graphiques soient écrasés
  # Les uns contre les autres
  plt.tight_layout()
  ```

  ![](https://i.imgur.com/2H4jyfV.png)

* <ins>API orientée objet</ins>: `subplots` ou `fig.add_subplot`

  ``` python
  x = np.arange(1, 100)
  fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(12, 6))

  # Graph #1
  axes[0,0].plot(x, x)
  axes[0,0].set_xlabel('X')
  axes[0,0].set_ylabel('X')

  # Graph #2
  axes[0,1].plot(x, -x)
  axes[0,1].set_xlabel('X')
  axes[0,1].set_ylabel('-X')

  # Graph #3
  axes[1,0].plot(x, x**2)
  axes[1,0].set_xlabel('X')
  axes[1,0].set_ylabel('X^2')

  # Graph #4
  axes[1,1].plot(x, -(x**2))
  axes[1,1].set_xlabel('X')
  axes[1,1].set_ylabel('-(X^2)')

  # Graph #5
  axes[2,0].plot(x, np.log(x))
  axes[2,0].set_xlabel('X')
  axes[2,0].set_ylabel('log(X)')

  # Graph #6
  axes[2,1].plot(x, -np.log(x))
  axes[2,1].set_xlabel('X')
  axes[2,1].set_ylabel('-log(X)')

  fig.tight_layout()
  ```

  ``` python
  x = np.arange(1, 100)
  fig = plt.figure(figsize=(12, 6))

  # Graph #1
  ax = fig.add_subplot(3, 2, 1)
  ax.plot(x, x)
  ax.set_xlabel('X')
  ax.set_ylabel('X')

  # Graph #2
  ax = fig.add_subplot(3, 2, 2)
  ax.plot(x, -x)
  ax.set_xlabel('X')
  ax.set_ylabel('-X')

  # Graph #3
  ax = fig.add_subplot(3, 2, 3)
  ax.plot(x, x**2)
  ax.set_xlabel('X')
  ax.set_ylabel('X^2')

  # Graph #4
  ax = fig.add_subplot(3, 2, 4)
  ax.plot(x, -(x**2))
  ax.set_xlabel('X')
  ax.set_ylabel('-(X^2)')

  # Graph #5
  ax = fig.add_subplot(3, 2, 5)
  ax.plot(x, np.log(x))
  ax.set_xlabel('X')
  ax.set_ylabel('log(X)')

  # Graph #6
  ax = fig.add_subplot(3, 2, 6)
  ax.plot(x, -np.log(x))
  ax.set_xlabel('X')
  ax.set_ylabel('-log(X)')

  fig.tight_layout()
  ```

* `subplot2grid` permet d'étirer les graphiques sur plusieurs lignes et/ou colonnes.  
  Prend 2 paramètres: taille de la grille, espace sélectionné. Et optionnellement: rowspan et colspan.

  ``` python
  x = np.arange(1, 100)
  plt.figure(figsize=(12,6))

  # Graph 1
  ax = plt.subplot2grid((3, 2), (0,0), rowspan=2)
  ax.plot(x, x)
  ax.set_xlabel('X')
  ax.set_ylabel('X')
  ax.set_title('(0,0) rowspan=2')

  # Graph 2
  ax = plt.subplot2grid((3, 2), (0,1))
  ax.plot(x, -x)
  ax.set_xlabel('X')
  ax.set_ylabel('-X')
  ax.set_title('(0,1)')

  # Graph 3
  ax = plt.subplot2grid((3, 2), (1,1))
  ax.plot(x, x**2)
  ax.set_xlabel('X')
  ax.set_ylabel('X^2')
  ax.set_title('(1,1)')

  # Graph 4
  ax = plt.subplot2grid((3, 2), (2,0), colspan=2)
  ax.plot(x, -(x**2))
  ax.set_xlabel('X')
  ax.set_ylabel('-(X^2)')
  ax.set_title('(2,0) colspan=2')

  plt.tight_layout()
  ```

  ![](https://i.imgur.com/fECyr5O.png)

* NB on peut récupérer les axes à partir de l'API globale avec `ax = plt.gca()`

## Subplots

* On peut mettre en commun la graduation des sous-graphiques

  ``` python
  plt.subplots(4,4, sharex=True, sharey=True)
  ```

  ![](https://i.imgur.com/dxcOzS4.png)

* Ou l'enlever

  ``` python
  plt.subplots(4,4, subplot_kw={'xticks': [], 'yticks': []})
  ```

  ![](https://i.imgur.com/AR107a6.png)

## Subplots by hand

* On peut ajouter de nouveau graphique manuellement avec `axes`

  ``` python
  ax1 = plt.axes() # standard axes
  ax2 = plt.axes([0.65, 0.65, 0.2, 0.2])
  ```

   ![](https://i.imgur.com/9Uwg6Hc.png)

  ``` python
  fig = plt.figure()
  ax1 = fig.add_axes([0.1, 0.5, 0.8, 0.4], xticklabels=[], ylim=(-1.2, 1.2))
  ax2 = fig.add_axes([0.1, 0.1, 0.8, 0.4], ylim=(-1.2, 1.2))
  ```

  ![](https://i.imgur.com/q7O1o3I.png)

---

## Show

La méthode `show` affiche le graphique.  
Sous Jupyter, cette méthode est appelée automatiquement quand on exécute une cellule qui contient un graphique en cours.

``` python
from scipy.stats import norm

x = np.arange(-3, 3, 0.01)
plt.plot(x, norm.pdf(x))
plt.show()
```

## Savefig

La méthode `savefig` permet d'enregistrer le graphique crée dans une image.

``` python
plt.plot(x, norm.pdf(x))
plt.plot(x, norm.pdf(x, 1.0, 0.5))
plt.savefig('MyPlot.png', format='png')
```

## Close

En mode global, Matplotlib applique les modifications au graphique en cours, bien qu'il ne soit pas explicité stocké dans une variable de votre côté — il est gardé du côté Matplotlib. Pour supprimer un graphique en cours de modification, il faut appeler `plt.close`.

C'est notamment utile quand on veut utiliser Matploblib pour effectuer des calculs et non pour afficher un graphique:

``` python
x = np.random.randint(20,60,100)

n, bins, patches = plt.hist(x, range(20,61,5))
plt.close()

print(n)
'''
[10. 12. 16. 12. 10. 10. 16. 14.]
'''

print(bins)
'''
[20 25 30 35 40 45 50 55 60]
'''
```
