---
title: Labels & légende
category: Python, Library, Matploblib, Préférences
---

## Labels

* On peut ajouter un label aux différents ensembles de données du tableau puis afficher la légende avec `plt.legend`

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x, label='A')
  plt.plot(x, x + 1, label='B')
  plt.legend()
  ```

  ``` python
  x = np.arange(0, 10)
  plt.plot(x, x)
  plt.plot(x, x + 1)
  plt.legend(['A', 'B'])
  ```

 ![](https://i.imgur.com/UUvwIRJ.png)

## Position

* On peut changer la position de la légende de différentes manières

  1. `loc=position`

      ``` python
      plt.legend(loc=4)
      ```

      ``` python
      plt.legend(loc='lower right')
      ```

     ![](https://i.imgur.com/L9uHkaC.png)

  2. `bbox_to_anchor=(x,y)`  
     (0,0): en bas à gauche  
     (1,1): en haut à droite

     ``` python
     # Met la légende au milieu du graphique
     plt.legend(bbox_to_anchor=(0.5,0.5))
     ```

     Quand on définit bbox_to_anchor et loc en même temps, loc indique le coin de la légende utilisé pour le positionnement

     ``` python
     # Positionner le coin haut gauche de la légende au milieu du graphique
     plt.legend(bbox_to_anchor=(0.5,0.5), loc='upper left')
     ```

     ![](https://i.imgur.com/YkoQDiM.png)

* Différents paramètres sont possibles pour personnaliser la légende: [Documentation plt.legend](https://matplotlib.org/3.1.0/api/_as_gen/matplotlib.pyplot.legend.html)

## Espacements

| Attributs | Description | Valeur par défaut
|---        |---          |---
| `labelspacing` | modifie l'espacement vertical entre les éléments de la légende | 0.5
| `handlelength` | modifie la taille des rectangles | 2
| `handletextpad` | modifie l'espacement entre les rectangles et le texte | 0.8
| `borderpad` | modifie le padding à l'intérieur de la légende | 0.4
| `borderaxespad` | modifie le padding autour de la légende | 0.5
| `ncol` | définit le nombre de colonnes de la légende | 1
| `columnspacing` | modifie l'espacement entre les colonnes | 2

<details>
<summary>Code</summary>
<br>

<pre lang="python">
# Tweaks to display bars side by side
w = .2
n = 2
k = (w*(1-n)/2)

# Dataset
x  = np.arange(1, 11)
x1 = x+k
x2 = x+k+w

# Plot
fig, axes = plt.subplots(nrows=4, ncols=2, figsize=(12,6))

ax = axes[0,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend()
ax.set_title('Par défaut')

ax = axes[0,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(labelspacing=2)
ax.set_title('labelspacing=2')

ax = axes[1,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(handlelength=4)
ax.set_title('handlelength=4')

ax = axes[1,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(handletextpad=2)
ax.set_title('handletextpad=2')

ax = axes[2,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(borderpad=2, loc='upper left')
ax.set_title('borderpad=2')

ax = axes[2,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(borderaxespad=2)
ax.set_title('borderaxespad=2')

ax = axes[3,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(ncol=2)
ax.set_title('ncol=2')

ax = axes[3,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(ncol=2, columnspacing=4)
ax.set_title('columnspacing=4')

fig.tight_layout()
</pre>
</details>

![](https://i.imgur.com/Ietf47o.png)

## Style

| Attributs | Description | Valeur par défaut
|---        |---          |---
| `facecolor` | modifie la couleur de fond de la légende | white
| `edgecolor` | modifie la couleur de la bordure | inherit
| `title_fontsize` | modifie la taille du titre | inherit
| `fontsize`  | modifie la taille des éléments de la légende | inherit
| `fancybox`  | active ou désactive les bords arrondis | True

<details>
<summary>Code</summary>
<br>

<pre lang="python">
fig, axes = plt.subplots(nrows=3, ncols=2, figsize=(12,4.5))

ax = axes[0,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(title='Ma légende')
ax.set_title('Par défaut')

ax = axes[0,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(facecolor="lightgrey")
ax.set_title('facecolor="lightgrey"')

ax = axes[1,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(edgecolor="black")
ax.set_title('edgecolor="black"')

ax = axes[1,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(title="Ma légende", title_fontsize=8)
ax.set_title('title_fontsize=8')

ax = axes[2,0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(fontsize=16)
ax.set_title('fontsize=16')

ax = axes[2,1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.legend(fancybox=False)
ax.set_title('fancybox=False')

fig.tight_layout()
</pre>
</details>

![](https://i.imgur.com/XvJRGrc.png)

## Styles des éléments

On peut récupérer les rectangles, points, lignes, etc (selon le type de graphique) avec `legend.legendHandles` et les labels avec `legend.texts`

<details>
<summary>Code</summary>
<br>

<pre lang="python">
fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(12,1.5))

ax = axes[0]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.set_title('legend.texts')
legend = ax.legend()

for text in legend.texts:
    text.set_fontsize(16)

ax = axes[1]
ax.bar(x1, x, label='A', width=w)
ax.bar(x2, x + 1, label='B', width=w)
ax.set_title('legend.legendHandles')
legend = ax.legend()

for rect in legend.legendHandles:
    rect.set_edgecolor('black')
</pre>
</details>

![](https://i.imgur.com/K3tl0F9.png)
