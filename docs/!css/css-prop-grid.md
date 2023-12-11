---
title: Grid
category: Web, CSS, Propriétés
---

Tandis qu'une flexbox est unidimensionnelle (les éléments sont disposés en ligne ou en colonne),
un grid crée une grille en deux dimensions (les éléments sont disposés librement sur une ligne et colonne).
Cela permet de créer des layouts plus complexes, comme par exemple une mosaïque.

![](https://i.imgur.com/apQV5Wx.png)

[JSFiddle grid](https://jsfiddle.net/amt01/Lutfdkgg/)  
[JSFiddle grid:hover](https://jsfiddle.net/amt01/0yepzqah/)  
[Codepen Use grid instead of containers](https://codepen.io/kevinpowell/pen/ExrZrrw)

## grid-auto (container)

* `display: grid`  
  Définit l'élément courant comme une grille [CSS3]

  ``` plain
  display: grid
  ```

* `grid-auto-flow`  
  Définit si les enfants sont affichés en ligne ou en colonne (lorsqu'aucun template n'est définit) [CSS3]

  ``` plain
  grid-auto-flow: row | column | dense
  ```

  - `row`: (par défaut) en ligne
  - `column`: en colonne
  - `dense`: essaie de placer les éléments pour qu'il n'y ait aucun espace vide

  [Codepen grid-auto-flow: dense](https://codepen.io/stacy/pen/eBVBZE)

* `grid-auto-rows`  
  Définit la taille des lignes créées [CSS3]  
  La fonction [`minmax()`](css-values.md#minmax) permet de spécifier la taille minimale et maximale de la colonne.

  ``` plain
  grid-auto-rows: <length> | <percent> | <fraction> | minmax()
  ```

* `grid-auto-columns`  
  Définit la taille des colonnes créées [CSS3]

  ``` plain
  grid-auto-columns: <length> | <percent> | <fraction> | minmax()
  ```

<ins>Exemple</ins>:

``` css
{
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 60px;
}
```

``` css
{
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(60px, auto);
}
```

---

## grid-gap (container)

* `grid-column-gap`  
  Définit les marges entre deux colonnes [CSS3]

  ``` plain
  grid-column-gap: <length> | <percent>
  ```

* `grid-row-gap`  
  Définit les marges entre deux lignes [CSS3]

  ``` plain
  grid-row-gap: <length> | <percent>
  ```

* `grid-gap`  
  Définit les marges entre deux lignes et deux colonnes [CSS3]

  ``` plain
  grid-gap: [<length> | <percent>]{1,2}
  ```

  ``` css
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  ```

<ins>Exemple</ins>:

``` css
{
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
}
```

``` css
{
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
}
```

---

## align-items (container)

* `align-items`  
  Définit l'alignement des éléments sur une ligne [CSS3]  
  Par défaut, un élément s'étire en hauteur pour remplir la ligne (stretch)

  ``` plain
  align-items: start | end | strech | center
  ```

* `justify-items`  
  Définit l'alignement des éléments sur une colonne [CSS3]  
  Par défaut, un élément s'étire en largeur pour remplir la colonne (stretch)

  ``` plain
  justify-items: start | end | strech | center |
     space-around | space-beteen | space-evenly
  ```

---

## grid-template (container)

Par défaut, une grid place automatiquement les éléments en colonne et en ligne, dans l'ordre. Plutôt que de définir des colonnes et des lignes, on peut définir des emplacements sur lesquels on pourra par la suite placer les éléments.

![](https://i.imgur.com/rCCHzUe.png)

* `grid-template-columns`  
  Définit le nombre de colonnes et leur taille [CSS3]  
  La fonction [`repeat()`](css-values.md#repeat) permet de répéter la même définition de colonne plusieurs fois.

  ``` plain
  grid-template-columns: [<length> | <percent> | <fraction> | minmax() | repeat()]+
  ```

* `grid-template-rows`  
  Définit le nombre de lignes et leur taille [CSS3]  
  S'il n'y a pas d'éléments pour remplir les lignes, des espaces vides sont crées

  ``` plain
  grid-template-rows: [<length> | <percent> | <fraction> | minmax() | repeat()]+
  ```

* `grid-template-areas`  
  Définit des zones nommées pour placer les enfants [CSS3]  
  Utiliser "." pour laisser une colonne vide

  ``` plain
  grid-template-areas: <string>+
  ```

* `grid-template`  
  Est un raccourci permettant de définir les colonnes, lignes et zones d'une grille [CSS3]

  ``` plain
  grid-template: (<grid-template-areas> <grid-template-rows>)+ / <grid-template-columns>
  ```

* `grid`  
  Est un raccourci permettant de définir toutes les propriétés liées aux grilles CSS [CSS3]

  ``` plain
  grid: <grid-template> |
  <grid-template-rows> / <grid-auto-columns> |
  <grid-auto-rows> / <grid-tempalte-columns>

  ```

<ins>Exemple</ins>:

``` css
{
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 60px 70px;
}
```

``` css
{
  grid-template-columns: 30% 20% 50%;
}
```

``` css
{
  grid-template-columns: 1fr 2fr 1fr;
}
```

``` css
{
  grid-template-columns: repeat(3, 1fr);
}
```

``` css
.wrapper{
  display: grid;
  grid-template: "head head" 50px  /* height of row 1:  50px */
     "nav  main" 100px   /* height of row 2: 100px */
     "nav  footer" 30px  /* height of row 3:  30px */
     / 120px 1fr;  /* width of columns: 120px and auto */
}
header { grid-area: head; }
nav { grid-area: nav; }
main { grid-area: main; }
footer { grid-area: footer; }
```

[JSFiddle grid-template](https://jsfiddle.net/amt01/peg5apx4/)

---

## grid-area (child)

Définit dans quelle zone afficher l'élément [CSS3]  
Zone définie par le container avec `grid-template-areas`

``` plain
grid-area: <string>
```

---

## grid-column (child)

* `grid-column-start`  
  Définit sur quelle colonne doit être placé l'élément [CSS3]

  ``` plain
  grid-column-start: <number>
  ```

* `grid-column-end`  
  Définit sur quelle colonne finit l'élément (non inclue) [CSS3]

  ``` plain
  grid-column-end: <number>
  ```

* `grid-column`  
  Est un raccourci pour `grid-column-start` et `grid-column-end` [CSS3]  
  Ou avec la syntaxe `span`, définit la taille de l'élément et non sa position

  ``` plain
  grid-column: <grid-column-start>/<grid-column-end> | span <number>
  ```

<ins>Exemple</ins>:

``` scss
{
  grid-template-columns: repeat(6, 1fr);

  &:first-child {
    grid-column: 1/3;
  }
}
```

``` scss
{
  grid-template-columns: repeat(3, 1fr);

  &:nth-child(2) {
    grid-column: span 2;
  }
}
```

---

## grid-row (child)

* `grid-row-start`  
  Définit sur quelle ligne doit être placé l'élément [CSS3]

  ``` plain
  grid-row-start: <number>
  ```

* `grid-row-end`  
  Définit sur quelle ligne finit l'élément

  ``` plain
  grid-row-end: <number>
  ```

* `grid-row`  
  Est un raccourci pour `grid-row-start` et `grid-row-end` [CSS3]  
  Ou avec la syntaxe `span`, définit la taille de l'élément et non sa position

  ``` plain
  grid-row: <grid-row-start>/<grid-row-end> | span <number>
  ```

<ins>Exemple</ins>:

``` scss
{
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);

  &:nth-child(2) {
    grid-column-start: 2;
    grid-row: 1/4;
  }
}
```

---

## align-self (child)

* `align-self`  
  Définit l'alignement de l'élément sur une ligne [CSS3]  
  Écrase align-items pour un élément en particulier

  ``` plain
  align-self: start | end | strech | center
  ```

* `justify-self`  
  Définit l'alignement de l'élément sur une colonne [CSS3]

  ``` plain
  justify-self: start | end | strech | center
  ```

<ins>Exemple</ins>:

``` scss
{
  grid-template-columns: 1fr 1fr 1fr;

  &:first-child {
    grid-column: 1/3; /* de 1 à 3 */
  }
  &:nth-child(2) {
    grid-column: span 3; /* de n à n+3 (où n est la position par défaut de l'élément) */
  }
}
```

[CSS Grid Guide](https://cssgrid.cc/css-grid-guide.html)  
[A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid)  
