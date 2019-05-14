---
title: Background
category: Web, CSS, Propriétés
---

## background-color

Définit la couleur de fond d'un bloc [CSS1]


``` plain
background-color: <color>
```

## background-image

Définit l'image de fond [CSS1]
En CSS3, plusieurs images peuvent être définies, séparées par des virgules

``` plain
background-image: <image>
```

## background-repeat

Définit si l'image de fond doit être répétée si elle ne remplit pas tout le bloc [CSS1]


``` plain
background-repeat: repeat | repeat-x | repeat-y | no-repeat
```

## background-attachment

Définit si la position de l'image de fond est fixée ou si elle défile dans le bloc [CSS1]

``` plain
background-attachment: scroll | fixed | local
```

## background-position

Définit la position de l'image de fond [CSS1]

``` plain
background-position: <x> <y>
   x : left | right | center | <percentage> | <length>
   y : top | bottom | center | <percentage> | <length>
```

## background-size

Définit la taille de l'image de fond [CSS3]

``` plain
background-size: auto | <length> | cover | contain
```

## background-origin

Définit la zone de positionnement de l'image de fond (padding/bordure compris ou non) [CSS3]

``` plain
background-origin: padding-box | border-box | content-box
```

[JSfiddle background-origin / background-clip](https://jsfiddle.net/amt01/3ag2gvrz/)

## background-clip

Définit la zone d'affichage de l'image de fond (padding/bordure compris ou non) [CSS3]

``` plain
background-clip: border-box | padding-box | content-box
```

## background

Est un raccourci pour les propriétés `background-*` [CSS1]  
Permet d'afficher une couleur et/ou une image en fond d'un élément, à l'intérieur des bordures.  
Depuis CSS3, plusieurs images peuvent être utilisées et de nouvelles propriétés ont été ajoutées.  

<ins>Définition CSS1</ins>:

``` plain
background: <color> <image> <repeat> <attachment> <position>
```

<ins>Exemple CSS1</ins>:

``` css
{
  background: url(chess.png) gray 50% repeat fixed;
}
```

<ins>Définition CSS3</ins> :

``` plain
background: <color> <image> <position> / <size> <repeat> <origin> <clip> <attachment>
```

<ins>Exemple CSS3</ins>:

``` css
{
  background: url(chess.png) 40% / 10em gray round fixed border-box;
}
```

[JSFiddle background](https://jsfiddle.net/amt01/jpgykmuh/)

---

## background-blend-mode

Définit la façon dont les images d'arrière-plan doivent être fusionnées entre elles et avec la couleur d'arrière-plan [CSS3]

``` plain
background-blend-mode: normal | multiply | screen | overlay |
       darken | lighten | color-dodge | color-burn | hard-light | soft-light |
       difference | exclusion | hue | saturation | color | luminosity
```

[JSFiddle background-blend-mode](https://developer.mozilla.org/fr/docs/Web/CSS/blend-mode)

## mix-blend-mode

Définit si le contenu d'un élément doit être fusionné avec son background [CSS3]

``` plain
mix-blend-mode: normal | multiply | screen | overlay |
    darken | lighten | color-dodge | color-burn | hard-light | soft-light |
    difference | exclusion | hue | saturation | color | luminosity
```

[JSFiddle mix-blend-mode](https://css-tricks.com/almanac/properties/m/mix-blend-mode/)

## isolation

Empêche que certains éléments se mélangent [CSS3]  
Crée un nouveau contexte d'empilement, les éléments se mélangeront uniquement à l'intérieur de ce contexte

``` plain
isolation: isolate | auto
```

[JSFiddle isolation](https://www.quackit.com/css/css3/properties/css_isolation.cfm)

---

## clip-path

`clip-path` définit une zone de rognagne, ce qui permet de créer une forme [SVG]  
Les parties non visibles ne reçoivent pas d'événement souris.

<ins>Définition</ins>:

``` plain
clip-path: <url> | [<basic-shape> || <geometry-box]

<basic-shape> = inset() | circle() | ellipse() | polygon()
<geometry-box>= fill-box | stroke-box | view-box | margin-box | border-box | padding-box | content-box
```

| Forme   | Format                      | Description
|---  |---                      |---
| inset()   | `inset( [<number> | <percent>]{1,4} [round [<number> | <percent>]{1,4}]? )`     | Définit un rectangle incrusté. Les 4 premiers arguments définissent le décalage vers l'intérieur. Les arguments qui suivent `round` donnent des bords arrondis.
| circle()  | `circle( [<length> | <percentage> | closest-side | farthest-side] [at <position>]? )`   | Définit un cercle
| ellipse() | `ellipse( [<length> | <percentage> | closest-side | farthest-side]{2} [at <position>]? )` | Définit une ellipse. Axe vertical suivit de l'axe horizontal
| polygon() | `polygon( [nonezero | evenodd]? [<length> | <percentage>]{2}+ )`        | Définit un polygone. Liste de sommets séparés par des virgules |

<ins>Exemple</ins>:

``` css
.circle{
  width: 120px;
  height: 120px;
  shape-outside: circle(50%);
  clip-path: circle(50%);
}
```

[JSFiddle clip-path + shape-outside](https://jsfiddle.net/amt01/6d6c8ucz/)

---

## mask

`mask` définit un masque, ce qui permet de créer une forme avec un canal alpha — et donc avoir des zones semi-transparentes.

* `mask-image`  
  Définit l'image à utliser comme masque [CSS3]  
  Plusieurs masques peuvent être utilisés, séparés par des virgules

  ``` plain
  mask-image: <image>
  ```

* `mask-mode`  
  Définit s'il faut utiliser les valeurs de luminance ou le canal alpha (transparence) comme masque [CSS3]

  ``` plain
  mask-mode: alpha | luminance | match-source
  ```

* `mask-size`  
  Définit les dimensions du masque [CSS3]

  ``` plain
  mask-size: [ <length> | <percent> | auto ]{1,2} | cover | contain
  ```

* `mask-repeat`  
  Définit si le masque doit être répété s'il ne remplit pas entièrement l'élément sur lequel il est appliqué [CSS3]

  ``` plain
  mask-repeat: repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}
  ```

* `mask-origin`  
  Définit la zone de positionnement du masque [CSS3]

  ``` plain
  mask-origin: border-box | padding-box | content-box | margin-box | fill-box | stroke-box | view-box
  ```

* `mask-clip`  
  Définit la zone d'affichage du masque [CSS3]

  ``` plain
  mask-clip: border-box | padding-box | content-box | margin-box | fill-box | stroke-box | view-box
  ```

* `mask-position`  
  Définit la position initiale du masque [CSS3]

  ``` plain
  mask-position: [ left | center | right | top | bottom | <length> | <percent> ]{1,2}
  ```

* `mask-composite`  
  Définit l'opération de composition à utiliser lorsqu'on utilise plusieurs masques [CSS3]  
  `add` par défaut

  ``` plain
  mask-composite: add | subtract | intersect | exclude
  ```

* `mask`  
  Raccourcis permettant de définir le ou les masque(s) à utiliser [CSS3]

  ``` plain
  mask: <mask-image> || <mask-position> [/ <mask-size>]? || <mask-repeat> ||
    <mask-origin> || [<mask-clip> | noclip] || <mask-composite> || <mask-mode>
  ```

<ins>Exemple</ins>:  
[JSFiddle mask](https://jsfiddle.net/amt01/bp6n2q2e/)

---

## shape

Les règles CSS `shape` définissent la forme du float autour d'un élément.

![](https://i.imgur.com/nh6kjU7.jpg)

Pour découper le background de la même forme que `shape`, utiliser `clip-path` ou `mask-image`.

![](https://i.imgur.com/2BF3NPt.png)

* `shape-outside`  
  Définit la forme de l'élément flottant [CSS3]

  ``` plain
  shape-outside: <shape-box> || [<basic-shape> | <image>]

  <shape-box>  = margin-box | border-box | padding-box | content-box
  <basic-shape>= inset() | circle() | ellipse() | polygon()
  ```

  [JSFiddle clip-path + shape-outside](https://jsfiddle.net/amt01/6d6c8ucz/)

* `shape-margin`  
  Définit la marge autour de `shape-outside` [CSS3]

  ``` plain
  shape-margin: <length> | <percent>
  ```

* `shape-image-threshold`  
  Définit le seuil en terme de canal alpha à utiliser pour extraire la forme d'une image (gradient) [CSS3]

  ```
  shape-image-threshold: <number>
  ```

  [JSFiddle shape-image-threshold](https://jsfiddle.net/amt01/hykayq4e/)

[Getting Started with CSS Shapes](https://www.html5rocks.com/en/tutorials/shapes/getting-started/)
