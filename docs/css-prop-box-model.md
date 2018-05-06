---
title: Box Model
category: Web, CSS, Propriétés
---

Tous les éléments HTML sont considérés comme des "boîtes" dont il est possible de définir la hauteur, la largeur, la bordure, les marges et le padding (marges à l'intérieur de la bordure).

Les éléments HTML ont un type par défaut: par exemple un `<span>` est un élément en ligne, tandis qu'un `<div>` est un bloc.  
Les éléments bloc sont affichés avec un retour à la ligne avant et après, les éléments en ligne non. Outre cette différence, certaines propriétés ne s'appliquent pas aux éléments en ligne ou que partiellement:
* `width` ne s'applique pas
* `height` ne s'applique pas (mais la hauteur d'un élément en ligne peut être définie par `line-height`)
* `padding`: seul le padding gauche et droit est appliqué
* `margin`: seules les marges gauches et droites sont appliquées

[Inline elements and padding](http://maxdesign.com.au/articles/inline/)

## display

La propriété `display` permet de modifier le type d'un élément.  
On peut afficher un `<span>` en bloc et un `<div>` en ligne par exemple.

[Comparaison block/inline/inline-block](https://jsfiddle.net/amt01/p58n6ht3/)

``` plain
display: none | inline | block | list-item |
         inline-list-item | inline-block | inline-table |
         table | table-cell | table-column | table-column-group |
         table-footer-group | table-header-group | table-row | table-row-group |
         flex | inline-flex | grid | inline-grid
(CSS 1,2,3)
Définit le mode d'affichage
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

``` css
{
  display: none;
}
```

Avec `display: none`, le bloc est complètement caché, comme s'il ne faisait pas partie de la page.  
Les éléments autour se comportent comme s'il n'existait pas.


## visibility

``` plain
visibility: hidden | visible | collapse
(CSS2)
Définit la visibilité
```

``` css
{
  visibility: hidden;
}
```

Avec `visibility: hidden`, le bloc est caché, comme s'il était complètement transparent.  
Les éléments autour se comportent comme s'il était encore là.

[Comparaison display:none et visibility:hidden](https://jsfiddle.net/amt01/uk9bt4fb/)

## border

Permet d'afficher un cadre autour d'un élément

``` plain
border: <border-width> <border-style> <border-color>
border-top: ...
(CSS1)
Raccourcis pour définir la bordure
```

``` plain
border-width: (medium | thin | thick | <length>){1,4}
border-top-width: ...
(CSS1)
Épaisseur de la bordure
```

``` plain
border-style: (dotted | dashed | solid | double | groove | ridge | inset | outset | none){1,4}
border-top-style: ...
(CSS1)
Style de bordure (trait, pointillés, etc)
```

``` plain
border-color: (<color>){1,4}
border-top-color: ...
(CSS1)
Couleur de bordure
```

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

Voir aussi [autres bordures](#autres-bordures) (border-image, border-radius, outline, box-shadow)

## margin

Définit l'espace autour d'un élément, entre la bordure et les autres éléments alentour.  
Chaque navigateur a des styles par défaut pour les éléments, une propriété non définie dans le CSS ne veut pas dire que l'élément a un padding / margin de 0.

``` plain
margin: (<length> | <percentage> | auto){1,4}
margin-top: ...
(CSS1)
Définit les marges
```

La propriété `auto` permet de centrer l'élément à l'intérieur de son parent

``` css
{
  margin: 10px auto;
}
```

## padding

Définit l'espace à l'intérieur d'un élément, entre la bordure et le texte.

``` plain
padding: (<length> | <percentage>){1,4}
padding-top: ...
(CSS1)
Définit les marges intérieures
```

``` css
{
  padding: 15px;
}
```

## width

Définit la largeur d'un bloc.

``` plain
width: <length> | <percentage> | auto
(CSS1)
Définit la largeur
```

``` plain
max-width: <length> | <percentage> | none
(CSS2)
Définit la largeur maximale
```

``` plain
min-width: <length> | <percentage> | none
(CSS2)
Définit la largeur minimale
```

``` css
{
  width: auto;
  max-width: 100px;        /* Largeur maximum du bloc */
  min-width: 50px;         /* Largeur minimum du bloc */
}
```

Avec `width: auto` l'élément s'adapte à la largeur de son parent (en respectant son padding).

[Comparaison auto/100%/100% + border-box](https://jsfiddle.net/amt01/u718ov4e/)

## height

Définit la hauteur d'un bloc.

``` plain
height: <length> | <percentage> | auto
(CSS1)
Définit la hauteur
```

``` plain
max-height: <length> | <percentage> | none
(CSS2)
Définit la hauteur maximale
```

``` plain
min-height: <length> | <percentage> | none
(CSS2)
Définit la hauteur minimale
```

``` css
{
  max-height: 30%;         /* Maximum 30% de son parent */
}
```

## box-sizing

Par défaut, les valeurs de `padding` et `border-width` ne sont pas pris en compte dans le calcul des dimensions.  
Si on définit `width: 500px` sur un bloc, la taille réelle du bloc sera de 500 + padding gauche et droite + bordure gauche et droite.  
Ce comportement peut être modifié avec la propriété `box-sizing`, qui indique au navigateur ce qu'il faut prendre en compte dans le calcul de la hauteur et de largeur du bloc.

``` plain
box-sizing: border-box | content-box
(CSS3)
Définit la manière de calculer les dimensions
```

``` css
{
  box-sizing: border-box   /* Prendre en compte le padding et border dans le calcul de la taille */
}
```

## overflow

Permet de controler ce qu'il ce passe lorsque le contenu d'un élément est plus grand que la taille de l'élément: cacher le contenu qui dépasse ou afficher une scrollbar.

``` plain
overflow: visible | hidden | scroll | auto
(CSS2)
Définit s'il faut afficher une scrollbar
```

``` plain
overflow-x: visible | hidden | scroll | auto
(CSS3)
Uniquement pour la scrollbar horizontale
```

``` plain
overflow-y: visible | hidden | scroll | auto
(CSS3)
Uniquement pour la scrollbar verticale
```

`overflow-wrap` est un alias de `word-wrap`.

``` css
{
  overflow: auto;          /* Afficher une scrollbar uniquement lorsque le contenu du bloc dépasse */
}
```
