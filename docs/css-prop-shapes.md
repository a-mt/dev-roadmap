---
title: Box Model
category: Web, CSS, Propriétés
---

Des formes CSS peuvent être créer en utilisant les bordures et du contenu généré (::before, ::after). [Exemple formes CSS](https://codepen.io/a-mt/pen/MvqdqZ)  
Mais on peut également utiliser des cercles, ellipses et polygones SVG pour créer des formes intéressantes sur tout type d'élément (images, paragraphes, etc)

## clip-path

Permet de rogner un élément et de créer des formes. Les parties non visibles ne reçoivent pas d'événement souris.  
[Exemple clip-path + shape-outside](https://jsfiddle.net/amt01/6d6c8ucz/)

``` plain
clip-path: <url> | [<basic-shape> || <geometry-box]
où
<basic-shape> : inset() | circle() | ellipse() | polygon()
<geometry-box>: fill-box | stroke-box | view-box | margin-box | border-box | padding-box | content-box
(SVG)
Définit une zone de rognage
```

| Forme     | Format                                                                                    | Description
|---        |---                                                                                        |---
| inset()   | `inset( [<number> | <percent>]{1,4} [round [<number> | <percent>]{1,4}]? )`               | Définit un rectangle incrusté. Les 4 premiers arguments définissent le décalage vers l'intérieur. Les arguments qui suivent `round` donnent des bords arrondis.
| circle()  | `circle( [<length> | <percentage> | closest-side | farthest-side] [at <position>]? )`     | Définit un cercle
| ellipse() | `ellipse( [<length> | <percentage> | closest-side | farthest-side]{2} [at <position>]? )` | Définit une ellipse. Axe vertical suivit de l'axe horizontal
| polygon() | `polygon( [nonezero | evenodd]? [<length> | <percentage>]{2}+ )`                          | Définit un polygone. Liste de sommets séparés par des virgules |

## mask

Les masques permettent d'appliquer des formes complexes et détaillées avec une opacité variable.  
[Exemples mask](https://jsfiddle.net/amt01/bp6n2q2e/)

``` plain
mask: <mask-image> || <mask-position> [/ <mask-size>]? || <mask-repeat> ||
      <mask-origin> || [<mask-clip> | noclip] || <mask-composite> || <mask-mode>
(CSS3)
Raccourcis permettant de définir le ou les masque(s) à utiliser
```

``` plain
mask-image: <image>
(CSS3)
Définit l'image à utliser comme masque
Plusieurs masques peuvent être utilisés, séparés par des virgules
```

``` plain
mask-mode: alpha | luminance | match-source
(CSS3)
Définit s'il faut utiliser les valeurs de luminance ou le canal alpha (transparence) comme masque
```

``` plain
mask-size: [ <length> | <percent> | auto ]{1,2} | cover | contain
(CSS3)
Définit les dimensions du masque
```

``` plain
mask-repeat: repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}
(CSS3)
Définit si les masques doivent être répétés
```

``` plain
mask-origin: border-box | padding-box | content-box | margin-box | fill-box | stroke-box | view-box
(CSS3)
Définit la zone de positionnement du masque
```

``` plain
mask-clip: border-box | padding-box | content-box | margin-box | fill-box | stroke-box | view-box
(CSS3)
Définit la zone d'affichage du masque
```

``` plain
mask-position: [ left | center | right | top | bottom | <length> | <percent> ]{1,2}
(CSS3)
Définit la position initiale du masque
```

``` plain
mask-composite: add | subtract | intersect | exclude
(CSS3)
Définit l'opération de composition à utiliser lorsqu'on utilise plusieurs masques
add par défaut
```

## shape

Les règles CSS `shape` définissent la forme du float autour d'un élément.

![](https://i.imgur.com/nh6kjU7.jpg)

Si l'élément a un background, celui-ci ne prendra pas la forme désirée - seuls les éléments autour se comporteront différemment. Utiliser `clip-path` ou `mask-image` pour modifier le background.

![](https://i.imgur.com/2BF3NPt.png)

``` plain
shape-outside: <shape-box> || [<basic-shape> | <image>]
où
<shape-box>  : margin-box | border-box | padding-box | content-box
<basic-shape>: inset() | circle() | ellipse() | polygon()
(CSS3)
Définit la forme de l'élément flottant
```

[Exemple clip-path + shape-outside](https://jsfiddle.net/amt01/6d6c8ucz/)

``` plain
shape-margin: <length> | <percent>
(CSS3)
Définit la marge autour de shape-outside
```

```
shape-image-threshold: <number>
(CSS3)
Définit le seuil en terme de canal alpha à utiliser pour extraire la forme d'une image (gradient)
```

[Exemple shape-image-threshold](https://jsfiddle.net/amt01/hykayq4e/)  
[Getting Started with CSS Shapes](https://www.html5rocks.com/en/tutorials/shapes/getting-started/)
