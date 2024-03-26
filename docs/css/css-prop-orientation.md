---
title: Orientation
category: Web, CSS, Propriétés
---

## writing-mode

Définit si les lignes de texte sont écrites horizontalement ou verticalement [CSS3]

``` plain
writing-mode: horizontal-tb | vertical-rl | vertical-lr
```

[JSFiddle writing-mode](https://jsfiddle.net/amt01/k298bgsz/)

## text-orientation

Définit l'orientation du texte sur une ligne  
N'a d'effet qu'en mode vertical [CSS3]

``` plain
text-orientation: mixed | upright | sideways
```

[JSFiddle text-orientation](https://jsfiddle.net/amt01/ebhajsjj/)

---

## direction

Définit l'ordre de lecture de la page [CSS2]  
ltr = left to right, rtl = right to left

``` plain
direction: ltr | rtl
```

## unicode-bidi

À utiliser en association avec la propriété `direction`, définit l'ordre des caractères [CSS2]

``` plain
unicode-bidi: embed | bidi-override | normal
```

Avec `direction: rtl`,
le contenu des blocs est aligné à droite,
les blocs sont alignés à droite,
l'ordre des blocs est de droite à gauche,
comme si un float: right était appliqué à tous les éléments.

``` css
{
  direction: rtl;  /* affiche les blocs de droite à gauche */
  unicode-bidi: bidi-override; /* affiche chaque caractère de droite à gauche */
}
```

---

## text-underline-position

Définit la position du soulignement de `text-decoration: underline` [CSS3]
- under: la ligne sera située sous la ligne de base, ne coupant aucun jambage
- left, right: utile pour les modes d'écritures à la verticale

``` plain
text-underline-position: left | right | under | auto
```

---

## text-combine-upright

Définit comment intégrer une combinaison de plusieurs caractères dans un espace normalement alloué à un seul caractère. Utile pour les caractères logographiques (comme des caractères chinois ou kanji japonais) [CSS3]

``` plain
text-combine-upright: all | none | digits | digits <number>
```

[JSFiddle text-combine-upright](https://jsfiddle.net/amt01/qk76L964/)

---

## border-block

Permet de définir la bordure gauche/droite/haut/bas de l'élément en respectant l'orientation du texte.  
Autrement dit, correspond soit à `border-top`, `border-right`, `border-bottom` ou `border-left` selon les valeurs de `writing-mode`, `direction` et `text-orientation`.  

* `border-block-start`  
  Permet de définir la bordure en haut du texte [CSS3]  
  Raccourci pour `border-block-start-width`, `border-block-start-style`, `border-block-start-color`

  ``` plain
  border-block-start: <border-width> <border-style> <border-color>
  ```

* `border-block-end`  
  Permet de définir la bordure en bas du texte [CSS3]  
  Raccourci pour `border-block-end-width`, `border-block-end-style`, `border-block-end-color`

  ``` plain
  border-block-end: <border-width> <border-style> <border-color>
  ```

* `border-inline-start`  
  Permet de définir la bordure à gauche du texte [CSS3]  
  Raccourci pour `border-inline-start-width`, `border-inline-start-style`, `border-inline-start-color`

  ``` plain
  border-inline-start: <border-width> <border-style> <border-color>
  ```

* `border-inline-end`  
  Permet de définir la bordure à droite du texte [CSS3]  
  Raccourci pour `border-inline-end-width`, `border-inline-end-style`, `border-inline-end-color`

  ``` plain
  border-inline-end: <border-width> <border-style> <border-color>
  ```

[JsFiddle border-block/border-inline](https://jsfiddle.net/amt01/2q8mpdq6/)

---

## padding-block

Permet de définir le padding gauche/droite/haut/bas de l'élément en respectant l'orientation du texte.  
Autrement dit, correspond soit à `padding-top`, `padding-right`, `padding-bottom` ou `padding-left` selon les valeurs de `writing-mode`, `direction` et `text-orientation`.

* `padding-block-start`  
  Définit le padding en haut du texte [CSS3]

  ``` plain
  padding-block-start: (<length> | <percentage>){1,4}
  ```

* `padding-block-end`  
  Définit le padding en bas du texte [CSS3]

  ``` plain
  padding-block-end: (<length> | <percentage>){1,4}
  ```

* `padding-inline-start`  
  Définit le padding à gauche du texte [CSS3]

  ``` plain
  padding-inline-start: (<length> | <percentage>){1,4}
  ```

* `padding-inline-end`  
  Définit le padding à droite du texte [CSS3]

  ``` plain
  padding-inline-end: (<length> | <percentage>){1,4}
  ```

## margin-block

Permet de définir le margin gauche/droite/haut/bas de l'élément en respectant l'orientation du texte.  
Autrement dit, correspond soit à `margin-top`, `margin-right`, `margin-bottom` ou `margin-left` selon les valeurs de `writing-mode`, `direction` et `text-orientation`.

* `margin-block-start`  
  Définit la marge en haut du texte [CSS3]

  ``` plain
  margin-block-start: <length> | <percentage> | auto
  ```

* `margin-block-end`  
  Définit la marge en bas du texte [CSS3]

  ``` plain
  margin-block-end: <length> | <percentage> | auto
  ```

* `margin-inline-start`  
  Définit la marge à gauche du texte [CSS3]

  ``` plain
  margin-inline-start: <length> | <percentage> | auto
  ```

* `margin-inline-end`  
  Définit la marge à droite du texte [CSS3]

  ``` plain
  margin-inline-end: <length> | <percentage> | auto
  ```

---

## offset-block

Permet de définir le décalage gauche/droite/haut/bas de l'élément en respectant l'orientation du texte.  
Autrement dit, correspond soit à `top`, `right`, `bottom` ou `left` selon les valeurs de `writing-mode`, `direction` et `text-orientation`.

* `offset-block-start`  
  Décale le texte à partir du haut [CSS3]

  ``` plain
  offset-block-start: <length> | <percentage> | auto
  ```

* `offset-block-end`  
  Décale le texte à partir du bas [CSS3]

  ``` plain
  offset-block-end: <length> | <percentage> | auto
  ```

* `offset-inline-start`  
  Décale le texte à partir de la gauche [CSS3]

  ``` plain
  offset-inline-start: <length> | <percentage> | auto
  ```

* `offset-inline-end`  
  Décale le texte à partir de la droite [CSS3]

  ``` plain
  offset-inline-end: <length> | <percentage> | auto
  ```

---

## block-size

Permet de définir la hauteur ou la largeur selon l'orientation du texte.
Correspond à la propriété `width` ou `height` selon la valeur utilisée pour `writing-mode`.

* `block-size` définit la hauteur du texte [CSS3]

  ``` plain
  block-size: <length> | <percent>
  ```

* `inline-size` définit la largeur du texte [CSS3]

  ``` plain
  inline-size: <length> | <percent>
  ```

## min-block-size

Permet de définir la hauteur ou la largeur minimale selon l'orientation du texte.
Correspond à la propriété `min-width` ou `min-height` selon la valeur utilisée pour `writing-mode`.  

* `min-block-size` définit la hauteur minimale du texte [CSS3]

  ``` plain
  min-block-size: <length> | <percent>
  ```

* `min-inline-size` définit la largeur minimale du texte [CSS3]

  ``` plain
  min-inline-size: <length> | <percent>
  ```

[JSFiddle min-block-size](https://jsfiddle.net/amt01/wL4msq96/)
