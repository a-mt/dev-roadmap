---
title: Box Model
category: Web, CSS, Propriétés
---

Tous les éléments HTML sont considérés comme des "boîtes" dont il est possible de définir la hauteur, la largeur, la bordure, les marges et le padding (marges à l'intérieur de la bordure).

![](https://i.imgur.com/NtUNsDRm.png)

---

## display

Les éléments HTML ont un type par défaut: par exemple un `<span>` est un élément en ligne, tandis qu'un `<div>` est un élément en bloc.
Les éléments en bloc sont affichés avec un retour à la ligne avant et après, les éléments en ligne non. Outre cette différence, certaines propriétés ne s'appliquent pas aux éléments en ligne ou que partiellement:
* `width` ne s'applique pas
* `height` ne s'applique pas (mais la hauteur d'un élément en ligne peut être définie par `line-height`)
* `padding`: seul le padding gauche et droit est appliqué
* `margin`: seules les marges gauches et droites sont appliquées

Article: [Inline elements and padding](http://maxdesign.com.au/articles/inline/) (anglais)

La propriété `display` permet de modifier le mode d'affichage d'un élément.  
On peut afficher un `<span>` en bloc et un `<div>` en ligne par exemple.

[JSFiddle Comparaison block/inline/inline-block](https://jsfiddle.net/amt01/p58n6ht3/)

<ins>Défintion</ins>:

``` plain
display: none | inline | block | list-item |
         inline-list-item | inline-block | inline-table |
         table | table-cell | table-column | table-column-group |
         table-footer-group | table-header-group | table-row | table-row-group |
         flex | inline-flex | grid | inline-grid
```

<table>
  <thead>
    <tr>
      <th>Display</th>
      <th>Élément par défaut</th>
      <th>Version CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>none</td><td>-</td><td>1</td></tr>
    <tr><td>block</td><td>div</td><td>1</td></tr>
    <tr><td>inline</td><td>span</td><td>1</td></tr>
    <tr><td>list-item</td><td>li</td><td>1</td></tr>
    <tr><td>inline-block</td><td>input</td><td>2</td></tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr><td>inline-table</td><td>-</td><td>2</td></tr>
    <tr><td>table</td><td>table</td><td>2</td></tr>
    <tr><td>table-row</td><td>tr</td><td>2</td></tr>
    <tr><td>table-cell</td><td>td</td><td>2</td></tr>
    <tr><td>table-column</td><td>col</td><td>2</td></tr>
    <tr><td>table-caption</td><td>caption</td><td>2</td></tr>
    <tr><td>table-column-group</td><td>colgroup</td><td>2</td></tr>
    <tr><td>table-row-group</td><td>tbody</td><td>2</td></tr>
    <tr><td>table-header-group</td><td>thead</td><td>2</td></tr>
    <tr><td>table-footer-group</td><td>tfoot</td><td>2</td></tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr><td>flex</td><td>-</td><td>3</td></tr>
    <tr><td>inline-flex</td><td>-</td><td>3</td></tr>
    <tr><td>grid</td><td>-</td><td>3</td></tr>
    <tr><td>inline-grid</td><td>-</td><td>3</td></tr>
  </tbody>
</table>

<ins>Exemple</ins>:

``` css
{
  display: none;
}
```

---

## visibility

Définit la visibilité de l'élément.

<ins>Définition</ins>: [CSS2]

``` plain
visibility: hidden | visible | collapse
```

- Avec `display: none`, le bloc est complètement caché, comme s'il ne faisait pas partie de la page.  
  Les éléments autour se comportent comme s'il n'existait pas.

- Avec `visibility: hidden`, le bloc est caché, comme s'il était complètement transparent.  
Les éléments autour se comportent comme s'il était encore là.

[JSFiddle Comparaison display:none et visibility:hidden](https://jsfiddle.net/amt01/uk9bt4fb/)

<ins>Exemple</ins>:

``` css
{
  visibility: hidden;
}
```

---

## opacity

Définit l'opacité d'un élément, permet de rendre un élément semi-transparent (0 = transparent, 1 = opaque)

<ins>Définition</ins>: [CSS3]

``` plain
opacity: <real>
```

<ins>Exemple</ins>:

``` css
{
  opacity: 0.5;
}
```

[JSFiddle opacity](https://jsfiddle.net/amt01/25L3jmsj/)

---

## border

Permet d'afficher un cadre autour d'un élément

* `border-width`  
  Définit l'épaisseur de la bordure [CSS1]

  ``` plain
  border-width: (medium | thin | thick | <length>){1,4}
  border-top-width: ...
  ```

* `border-style`  
  Définit le style de la bordure (traits, pointillés, etc) [CSS1]

  ``` plain
  border-style: (dotted | dashed | solid | double | groove | ridge | inset | outset | none){1,4}
  border-top-style: ...
  ```

* `border-color`  
  définit la couleur de la bordure [CSS1]

  ``` plain
  border-color: (<color>){1,4}
  border-top-color: ...
  ```

* `border`  
  Est un raccourci pour `border-width`, `border-style` et `border-color` [CSS1]

  ``` plain
  border: <border-width> <border-style> <border-color>
  border-top: ...
  ```

<ins>Exemple</ins>:


``` css
{
  border-width: 10px;      /* Taille de la bordure */
  border-style: dotted;    /* La bordure est affichée en pointillés */
  border-color: red;       /* Couleur de la bordure */
}
```

``` css
{
  border: 10px dotted red; /* Version raccourcie */
}
```

Il existe aussi d'[autres types de bordures](css-prop-ext-border.md) (border-image, border-radius, outline, box-shadow) — qui n'influencent pas la taille de l'élément.

Des formes CSS peuvent être créer en utilisant les bordures et du contenu généré (::before, ::after). [Codepen formes CSS](https://codepen.io/a-mt/pen/MvqdqZ)  
Pour plus de contrôle, on peut également utiliser des cercles, ellipses et polygones SVG pour créer des formes intéressantes sur tout type d'élément (images, paragraphes, etc) avec [`clip-path`](css-prop-background.md#clip-path) notamment.

---

## margin

Définit les marges autour d'un élément — l'espace entre la bordure de l'élément et les éléments alentour.  
Note: Chaque navigateur a des styles par défaut, ainsi ce n'est pas parce que le padding / margin n'est pas définit pour un élément qu'il vaut 0.

<ins>Définition</ins>: [CSS1]

``` plain
margin: (<length> | <percentage> | auto){1,4}
margin-top: ...
```

La propriété `auto` permet de centrer l'élément à l'intérieur de son parent

<ins>Exemple</ins>:

``` css
{
  margin: 10px auto;
}
```

---

## padding

Définit les marges intérieures d'un élément — l'espace entre la bordure et le texte.

<ins>Définition</ins>: [CSS1]

``` plain
padding: (<length> | <percentage>){1,4}
padding-top: ...
```

<ins>Exemple</ins>:

``` css
{
  padding: 15px;
}
```

---

## width

* `width` définit la largeur d'un bloc [CSS1]

  ``` plain
  width: <length> | <percentage> | auto
  ```
  Avec `width: auto` l'élément s'adapte à la largeur de son parent (en respectant son padding).  
  [JSFiddle Comparaison auto/100%/100% + border-box](https://jsfiddle.net/amt01/u718ov4e/)

* `max-width` définit la largeur maximale [CSS2]

  ``` plain
  max-width: <length> | <percentage> | none
  ```

* `min-width` définit la largeur minimale [CSS2]

  ``` plain
  min-width: <length> | <percentage> | none
  ```

<ins>Exemple</ins>:

``` css
{
  width: auto;
  max-width: 100px;        /* Largeur maximum du bloc */
  min-width: 50px;         /* Largeur minimum du bloc */
}
```

---

## height

* `height` définit la hauteur d'un bloc [CSS1]

  ``` plain
  height: <length> | <percentage> | auto
  ```

* `max-height` définit la hauteur maximale [CSS2]

  ``` plain
  max-height: <length> | <percentage> | none
  ```

* `min-height` définit la hauteur minimale [CSS2]

  ``` plain
  min-height: <length> | <percentage> | none
  ```

<ins>Exemple</ins>:

``` css
{
  max-height: 30%;         /* Maximum 30% de son parent */
}
```

---

## box-sizing

Par défaut, les valeurs de `padding` et `border-width` ne sont pas pris en compte dans le calcul des dimensions.  
Si on définit `width: 500px` sur un bloc, la taille réelle du bloc sera de 500 + padding gauche et droite + bordure gauche et droite.  
Ce comportement peut être modifié avec la propriété `box-sizing`, qui indique au navigateur les propriétés à prendre en compte dans le calcul des dimensions d'un élément (hauteur et largeur).

<ins>Définition</ins>: [CSS3]

``` plain
box-sizing: border-box | content-box
```

<ins>Exemple</ins>:

``` css
{
  box-sizing: border-box   /* Prendre en compte le padding et border dans le calcul de la taille */
}
```

---

## overflow

`overflow` permet de controler ce qu'il ce passe lorsque le contenu d'un élément est plus grand que la taille de l'élément: cacher le contenu qui dépasse ou afficher une scrollbar.

* `overflow` définit s'il faut afficher une scrollbar ou non [CSS2]

  ``` plain
  overflow: visible | hidden | scroll | auto
  ```

* `overflow-x`, même princip mais uniquement pour la scrollbar horizontale [CSS3]

  ``` plain
  overflow-x: visible | hidden | scroll | auto
  ```

* `overflow-y`, même principe mais uniquement pour la scrollbar verticale [CSS3]

  ``` plain
  overflow-y: visible | hidden | scroll | auto
  ```

* `overflow-wrap` est un alias de `word-wrap`, rien à voir avec les scrollbars.

<ins>Exemple</ins>:

``` css
{
  overflow: auto;          /* Afficher une scrollbar uniquement lorsque le contenu du bloc dépasse */
}
```

---

## cursor

`cursor` permet de changer le curseur affiché au survol d'un élément

<ins>Définition</ins>: [CSS2]

``` plain
cursor: auto | cell | copy | crosshair | default | help | move |
    not-allowed | pointer | progress | text | wait | zoom-in | ...
```

Liste non exhaustive.  
[Liste complète des valeurs + demo](https://developer.mozilla.org/fr/docs/Web/CSS/cursor#Valeurs)

<ins>Exemple</ins>:

``` css
{
  cursor: pointer;
}
```