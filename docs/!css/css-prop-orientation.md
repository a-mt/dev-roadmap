---
title: Orientation
category: Web, CSS, Propriétés
---

## Du texte

``` plain
writing-mode: horizontal-tb | vertical-rl | vertical-lr
(CSS3)
Définit si les lignes de texte sont écrites horizontalement ou verticalement
```

[Exemples writing-mode](https://jsfiddle.net/amt01/k298bgsz/)

``` plain
direction: ltr | rtl
(CSS2)
Définit l'ordre de lecture de la page ("left to right" ou "right to left")
```

``` plain
unicode-bidi: embed | bidi-override | normal
(CSS2)
En association avec la propriété direction, définit l'ordre des caractères
```

``` plain
text-underline-position: left | right | under | auto
(CSS3)
Définit la position du soulignement lorsque text-decoration vaut underline
- under: la ligne sera située sous la ligne de base, ne coupant aucun jambage
- left, right: utiles pour les modes d'écritures à la verticale
```

``` plain
text-orientation: mixed | upright | sideways
(CSS3)
Définit l'orientation du texte sur une ligne
Elle n'a d'effet qu'en mode vertical
```

[Exemple text-orientation](https://jsfiddle.net/amt01/ebhajsjj/)

``` plain
text-combine-upright: all | none
(CSS3)
Définit les caractères compresser dans un espace normallement alloué à un seul caractère
```

[Exemple text-combine-upright](https://jsfiddle.net/amt01/qk76L964/)

Avec `direction: rtl`,
le contenu des blocs est aligné à droite,
les blocs sont alignés à droite,
l'ordre des blocs est de droite à gauche,
comme si un float: right était appliqué à tous les éléments

``` css
{
  direction: rtl;              /* affiche les blocs de droite à gauche */
  unicode-bidi: bidi-override; /* affiche chaque caractère de droite à gauche */
}
```

## border-block

Les propriétés `border-block` et `border-inline` permettent de définir la bordure d'un élément selon le mode d'écriture, la directionnalité et l'orientation du texte.
Autrement dit, elles correspondent à l'une des propriétés border-top, border-right, border-bottom ou border-left selon les valeurs utilisées pour writing-mode, direction et text-orientation.  
[Exemple border-block/border-inline](https://jsfiddle.net/amt01/2q8mpdq6/)

``` plain
border-block-start: <border-width> <border-style> <border-color>
(CSS3)
Raccourcis permettant de définir la bordure d'un élément pour le côté haut
```

``` plain
border-block-end: <border-width> <border-style> <border-color>
(CSS3)
Raccourcis permettant de définir la bordure d'un élément pour le côté bas
```

``` plain
border-inline-start: <border-width> <border-style> <border-color>
(CSS3)
Raccourcis permettant de définir la bordure d'un élément pour le côté gauche
```

``` plain
border-inline-end: <border-width> <border-style> <border-color>
(CSS3)
Raccourcis permettant de définir la bordure d'un élément pour le côté droit
```

Également disponibles:
- `border-block-start-width`, `border-block-start-style`, `border-block-start-color`
- `border-block-end-width`, `border-block-end-style`, `border-block-end-color`
- `border-inline-start-width`, `border-inline-start-style`, `border-inline-start-color`
- `border-inline-end-width`, `border-inline-end-style`, `border-inline-end-color`

## padding-block

Même principe que pour border, `padding-block` et `padding-inline` dépendent de l'orientation du texte.
Correspond à la propriété padding-top, padding-right, padding-bottom ou padding-left selon les valeurs qui sont utilisées pour writing-mode, direction et text-orientation.  
[Exemple padding-block/padding-inline](https://jsfiddle.net/amt01/2q8mpdq6/)

``` plain
padding-block-start: (<length> | <percentage>){1,4}
(CSS3)
Définit le padding d'un élément pour le côté haut
```

``` plain
padding-block-end: (<length> | <percentage>){1,4}
(CSS3)
Définit le padding d'un élément pour le côté bas
```

``` plain
padding-inline-start: (<length> | <percentage>){1,4}
(CSS3)
Définit le padding d'un élément pour le côté gauche
```

``` plain
padding-inline-end: (<length> | <percentage>){1,4}
(CSS3)
Définit le padding d'un élément pour le côté droit
```

## margin-block

`margin-block` et `margin-inline` définit les marges d'un bloc selon l'orientation du texte.
Correspond à la propriété margin-top, margin-right, margin-bottom ou margin-left selon les valeurs utilisées pour writing-mode, direction, et text-orientation.

``` plain
margin-block-start: <length> | <percentage> | auto
(CSS3)
Définit les marges en haut
```

``` plain
margin-block-end: <length> | <percentage> | auto
(CSS3)
Définit les marges en bas
```

``` plain
margin-inline-start: <length> | <percentage> | auto
(CSS3)
Définit les marges à gauche
```

``` plain
margin-inline-end: <length> | <percentage> | auto
(CSS3)
Définit les marges à droite
```

## offset-block

`offset-block` et `offset-inline` définit le décalage d'un bloc selon l'orientation du texte.
Correspond à une des propriétés parmi top, right, bottom ou  left selon les valeurs des propriétés writing-mode, direction et text-orientation.

``` plain
offset-block-start: <length> | <percentage> | auto
(CSS3)
Définit le déplacement à partir du haut
```

``` plain
offset-block-end: <length> | <percentage> | auto
(CSS3)
Définit le déplacement à partir du bas
```

``` plain
offset-inline-start: <length> | <percentage> | auto
(CSS3)
Définit le déplacement à partir de la gauche
```

``` plain
offset-inline-end: <length> | <percentage> | auto
(CSS3)
Définit le déplacement à partir de la droite
```

## min-block-size

`min-block-size` et `min-inline-size` définit la hauteur ou la largeur minimale selon l'orientation du texte.
Correspond à la propriété min-width ou min-height selon la valeur utilisée pour writing-mode.  
[Exemple min-block-size](https://jsfiddle.net/amt01/wL4msq96/)

``` plain
min-block-size: <length> | <percent>
(CSS3)
Définit la hauteur minimale de l'élément en mode vertical ou la largeur minimale en mode horizontal
```

``` plain
min-inline-size: <length> | <percent>
(CSS3)
Définit la largeur minimale de l'élément en mode vertical ou la hauteur minimale en mode horizontal
```

## block-size

`block-size` et `inline-size` définit la hauteur ou la largeur selon l'orientation du texte.
Correspond à la propriété width ou height selon la valeur utilisée pour writing-mode.

``` plain
block-size: <length> | <percent>
(CSS3)
Définit la hauteur de l'élément en mode vertical ou la largeur en mode horizontal
```

``` plain
inline-size: <length> | <percent>
(CSS3)
Définit la largeur de l'élément en mode vertical ou la hauteur en mode horizontal
```
