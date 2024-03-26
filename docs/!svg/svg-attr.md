---
title: "SVG: Les attributs de présentation"
category: Web, HTML, SVG
---

## fill

L'attribut `fill` définit la couleur de remplissage.  
Vous pouvez utiliser la même convention de nommage des couleurs que CSS, que ce soit les noms (comme `red`), les valeurs rgb (comme `rgb(255,0,0)`) ou les valeurs hexadécimales (comme `#FF0000`).

``` html
<rect x="20" y="20" width="50" height="50" fill="#f00" />
```

<svg width="100" height="100" style="background: black">
  <rect x="5" y="5" width="50" height="50" fill="#f00" />
</svg>

## fill-opacity

Dans un certain nombre de navigateur, il est possible d'utiliser des couleurs rgba pour rendre les formes semi-transparentes. Les spécifications définissent quant à elle l'attribut `fill-opacity` pour obtenir cet effet. Si vous spécifiez à la fois une valeur rgba et `fill-opacity`, les deux seront appliquées.

``` html
<rect x="20" y="20" width="50" height="50"
      fill="red" fill-opacity="0.7" />
```

<svg width="100" height="100" style="background: black">
  <rect x="5" y="5" width="50" height="50" fill="white" />
  <rect x="20" y="20" width="50" height="50" fill="red" fill-opacity="0.7" />
</svg>

## fill-rule

`fill-rule` spécifie la règle de remplissage pour les formes où des chemins se chevauchent.  
Cet attribut peut prendre deux valeurs:
* `nonzero` (*par défaut*),
  le nombre de croisements d’une ligne correspond au nombre total de fois où une ligne croise une partie du tracé allant de gauche à droite moins le nombre total de fois où une ligne croise une partie du tracé allant de droite à gauche. Si une ligne tracée dans une direction quelconque à partir du point possède un nombre de croisements égal à zéro, le point est à l'extérieur, sinon, il est à l'intérieur.
* `evenodd`,
  si une ligne tracée depuis un point et dans une direction quelconque croise le tracé selon un nombre impair, le point est à l'intérieur, dans le cas contraire, le point est à l'extérieur.

``` html
<polygon fill-rule="nonzero" points="50,0 21,90 98,35 2,35 79,90"/>
<polygon fill-rule="evenodd" points="150,0 121,90 198,35 102,35 179,90"/>
```

<svg viewBox="0 0 200 90" height="100">
  <polygon fill-rule="nonzero" points="50,0 21,90 98,35 2,35 79,90"/>
  <polygon fill-rule="evenodd" points="150,0 121,90 198,35 102,35 179,90"/>
</svg>

---

## stroke

L'attribut `stroke` définit la couleur du contour.

``` html
<rect x="20" y="20" width="50" height="50"
      fill="white"
      stroke="red" />
```

<svg width="100" height="100" style="background: black">
  <rect x="5" y="5" width="50" height="50" fill="white" stroke="blue" />
  <rect x="20" y="20" width="50" height="50" fill="white" stroke="red" />
</svg>

## stroke-width

`stroke-width` définit l'épaisseur du contour.  
La ligne du contour est centrée autour du remplissage: si le contour vaut 10px, 5px du contour chevauchent le remplissage.

``` html
<rect x="25" y="25" width="50" height="50"
      fill="white"
      stroke="red" stroke-width="10" />
```

<svg width="100" height="100" style="background: black">
  <rect x="25" y="25" width="50" height="50"
        fill="white"
        stroke="red" stroke-width="10" />
</svg>

## stroke-opacity

`stroke-opacity` définit l'opacité du contour.

Il est important de savoir que le contour recouvre partiellement le remplissage de la forme. Ainsi, un contour avec une opacité différente de 1 affichera partiellement le remplissage du dessous. Pour éviter cet effet, il est possible d'appliquer une opacité globale avec l'attribut `opacity` ou placer le contour derrière le remplissage avec `paint-order`.

``` html
<rect x="25" y="25" width="50" height="50"
      fill="white"
      stroke="red" stroke-width="10" stroke-opacity="0.7" />
```

<svg width="100" height="100" style="background: black">
  <rect x="25" y="25" width="50" height="50"
        fill="white"
        stroke="red" stroke-width="10" stroke-opacity="0.7" />
</svg>

## stroke-linecap

`stroke-linecap` contrôle la forme des fins de lignes. Trois valeurs sont possibles:
* `butt` (*par défaut*), ferme la ligne avec un bord droit à l'endroit où la ligne se termine.
* `square`, ferme la ligne avec un bord droit en ajoutant la moitié de `stroke-width`.
* `round`, ferme la ligne avec un bord arrondi. Le rayon de cette courbe est contrôlé par `stroke-width`.

``` html
<line x1="40" x2="120" y1="20" y2="20"
      stroke-linecap="butt" stroke="black" stroke-width="20" />
<line x1="40" x2="120" y1="60" y2="60"
      stroke-linecap="square" stroke="black" stroke-width="20" />
<line x1="40" x2="120" y1="100" y2="100"
      stroke-linecap="round" stroke="black" stroke-width="20" />
```

<svg width="160" height="120">
  <line x1="40" x2="120" y1="20" y2="20"
        stroke-linecap="butt" stroke="black" stroke-width="20" />
  <line x1="40" x2="120" y1="60" y2="60"
        stroke-linecap="square" stroke="black" stroke-width="20" />
  <line x1="40" x2="120" y1="100" y2="100"
        stroke-linecap="round" stroke="black" stroke-width="20" />
</svg>

## stroke-linejoin

`stroke-linejoin` contrôle la manière de dessiner la liaison entre deux segments de ligne. Trois valeurs sont possibles:
* `miter` (*par défaut*), prolonge la ligne pour créer un coin carré, de telle sorte qu'il n'y ait qu'un seul angle
* `round`, crée un coin arrondi
* `bevel`, crée un nouvel angle pour faciliter la transition entre les deux segments

``` html
<polyline points="40 60 80 20 120 60"
          fill="none"
          stroke="black" stroke-width="20"
          stroke-linejoin="miter" stroke-linecap="butt" />

<polyline points="40 120 80 80 120 120"
          fill="none"
          stroke="black" stroke-width="20"
          stroke-linejoin="round" stroke-linecap="round" />

<polyline points="40 180 80 140 120 180"
          fill="none"
          stroke="black" stroke-width="20"
          stroke-linejoin="bevel" stroke-linecap="square" />
```

<svg width="160" height="200">
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
      stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
  <polyline points="40 120 80 80 120 120" stroke="black" stroke-width="20"
      stroke-linecap="round" fill="none" stroke-linejoin="round"/>
  <polyline points="40 180 80 140 120 180" stroke="black" stroke-width="20"
      stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>

## stroke-miterlimit

`stroke-miterlimit` détermine à partir de quel angle une liaison de segment de type `miter` sera affichée en `bevel`.

``` html
<path stroke="black" fill="none" stroke-linejoin="miter"
      d="M1,5 l2,-3 l2,3 m2,0 l0.5,-3 l0.5 ,3" />

<!-- petit miterlimit (1) -->
<path stroke="black" fill="none" stroke-linejoin="miter"
      stroke-miterlimit="1"
      d="M1,12 l2,-3 l2,3 m2, 0 l0.5,-3 l0.5 ,3" />

<!-- large miterlimit (8) -->
<path stroke="black" fill="none" stroke-linejoin="miter"
      stroke-miterlimit="8"
      d="M1,19 l2,-3 l2,3 m2, 0 l0.5,-3 l0.5 ,3" />
```

<svg viewBox="0 0 10 20" height="200">
  <path stroke="black" fill="none" stroke-linejoin="miter"
        d="M1,5 l2   ,-3 l2   ,3
           m2,0 l0.5 ,-3 l0.5 ,3" />
 
  <!-- petit miterlimit (1) -->
  <path stroke="black" fill="none" stroke-linejoin="miter"
        stroke-miterlimit="1"
        d="M1,12 l2   ,-3 l2   ,3
           m2, 0 l0.5 ,-3 l0.5 ,3" />

  <!-- large miterlimit (8) -->
  <path stroke="black" fill="none" stroke-linejoin="miter"
        stroke-miterlimit="8"
        d="M1,19 l2   ,-3 l2   ,3
           m2, 0 l0.5 ,-3 l0.5 ,3" />
</svg>

## stroke-dasharray

`stroke-dasharray` permet de créer des lignes pointillées.  
Il prend pour valeur une suite de nombres qui définissent successivement la longueur du trait puis celle de l'espace.  
Si une seule valeur est donné, alors l'espace a la même taille que le trait.

``` html
<line                               x1="0" y1="1" x2="30" y2="1" stroke="black" />
<line stroke-dasharray="4"          x1="0" y1="3" x2="30" y2="3" stroke="black" />
<line stroke-dasharray="4, 1"       x1="0" y1="5" x2="30" y2="5" stroke="black" />
<line stroke-dasharray="4, 1, 2"    x1="0" y1="7" x2="30" y2="7" stroke="black" />
<line stroke-dasharray="4, 1, 2, 3" x1="0" y1="9" x2="30" y2="9" stroke="black" />
```

<svg viewBox="0 0 30 10" width="300">
  <line                               x1="0" y1="1" x2="30" y2="1" stroke="black" />
  <line stroke-dasharray="4"          x1="0" y1="3" x2="30" y2="3" stroke="black" />
  <line stroke-dasharray="4, 1"       x1="0" y1="5" x2="30" y2="5" stroke="black" />
  <line stroke-dasharray="4, 1, 2"    x1="0" y1="7" x2="30" y2="7" stroke="black" />
  <line stroke-dasharray="4, 1, 2, 3" x1="0" y1="9" x2="30" y2="9" stroke="black" />
</svg>

## stroke-dashoffset

`stroke-dashoffset` définit à partir d'où commencer les pointillés sur la ligne.  
Cette propriété est particulièrement intéressante pour créer des animations.

``` html
<line stroke-dasharray="4"                       x1="0" y1="1" x2="30" y2="1" stroke="black" />
<line stroke-dasharray="4" stroke-dashoffset="4" x1="0" y1="3" x2="30" y2="3" stroke="black" />
```

<svg viewBox="0 0 30 4" width="300">
  <line stroke-dasharray="4" x1="0" y1="1" x2="30" y2="1" stroke="black" />
  <line stroke-dasharray="4" stroke-dashoffset="4" x1="0" y1="3" x2="30" y2="3" stroke="black" />
</svg>

---

## opacity

`opacity` définit l'opacité de l'élément.

``` html
<rect x="20" y="20" width="50" height="50"
      fill="red" fill-opacity="0.7" />
```

<svg width="100" height="100" style="background: black">
  <rect x="5" y="5" width="50" height="50" fill="white" />
  <rect x="20" y="20" width="50" height="50" fill="white" stroke="red" stroke-width="5" opacity="0.7" />
</svg>

## paint-order

`paint-order` spécifie dans quel ordre doit être dessiné le contour, le remplissage et les markers d'une forme.  
La valeur par défaut, `normal`, dessine le remplissage, le contour, puis les markers.

Pour choisir un ordre différent, utiliser les mots-clés `fill`, `stroke` et `markers`, séparés par des espaces.  
Si des mots-clés sont omis, ils sont dessinés dans leur ordre par défaut après ceux qui ont été spécifiés.

``` html
<text x="5" y="30">Stroke</text>
<text x="5" y="60" paint-order="stroke">Stroke</text>
```

<svg width="100" height="100" style="background: black">
  <g fill="white" stroke="red" stroke-width="5" font-size="30">
    <text x="5" y="30">Stroke</text>
    <text x="5" y="60" paint-order="stroke">Stroke</text>
  </g>
</svg>

## transform

L'attribut `transform` permet d'appliquer des transformations sur un élément SVG, c'est le même principe que la propriété `transform` en CSS.

``` html
<g fill="grey"
 transform="rotate(-10 50 100) translate(-36 45.5) skewX(40) scale(1 0.5)">
<path id="heart" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
</g>
```

<svg width="100" height="100" viewBox="-40 0 150 100" xmlns="http://www.w3.org/2000/svg" style="background: black">
  <g fill="grey"
     transform="rotate(-10 50 100) translate(-36 45.5) skewX(40) scale(1 0.5)">
    <path id="heart" d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />
  </g>
 
  <use xlink:href="#heart" fill="none" stroke="lightgrey" stroke-width="2"/>
</svg>

---

## text-anchor

Par défaut, la coordonnée `x` d'un texte désigne la position de son coin gauche dans le document SVG.
`text-anchor` permet modifier ce comportement.
Trois valeurs sont possibles: `start`, `middle`, `end`.

``` html
<text x="100" y="15" text-anchor="start">Lorem ipsum</text>
<text x="100" y="30" text-anchor="middle">Lorem ipsum</text>
<text x="100" y="45" text-anchor="end">Lorem ipsum</text>
```

<svg width="200" height="60">
  <text x="100" y="15" text-anchor="start">Lorem ipsum</text>
  <text x="100" y="30" text-anchor="middle">Lorem ipsum</text>
  <text x="100" y="45" text-anchor="end">Lorem ipsum</text>
  <line x1="100" x2="100" y1="0" y2="60" stroke="red" />
</svg>

## dominant-baseline

L'attribut `dominant-baseline` définit l'alignement vertical du texte par rapport à son point de référence.  
Les valeurs les plus utilisées sont: `alphabetic`, `hanging` et `middle`.

``` html
<text dominant-baseline="auto"             y="20" x="0">A</text>
<text dominant-baseline="use-script"       y="20" x="20">B</text>
<text dominant-baseline="ideographic"      y="20" x="40">E</text>
<text dominant-baseline="alphabetic"       y="20" x="60">F</text>
<text dominant-baseline="hanging"          y="20" x="80">G</text>
<text dominant-baseline="mathematical"     y="20" x="100">H</text>
<text dominant-baseline="central"          y="20" x="120">I</text>
<text dominant-baseline="middle"           y="20" x="140">J</text>
<text dominant-baseline="text-after-edge"  y="20" x="160">K</text>
<text dominant-baseline="text-before-edge" y="20" x="180">L</text>
```

<svg width="200" height="50">
  <path d="M0,20 H200" stroke="grey" />
  <text dominant-baseline="auto"             y="20" x="0">A</text>
  <text dominant-baseline="use-script"       y="20" x="20">B</text>
  <text dominant-baseline="ideographic"      y="20" x="40">E</text>
  <text dominant-baseline="alphabetic"       y="20" x="60">F</text>
  <text dominant-baseline="hanging"          y="20" x="80">G</text>
  <text dominant-baseline="mathematical"     y="20" x="100">H</text>
  <text dominant-baseline="central"          y="20" x="120">I</text>
  <text dominant-baseline="middle"           y="20" x="140">J</text>
  <text dominant-baseline="text-after-edge"  y="20" x="160">K</text>
  <text dominant-baseline="text-before-edge" y="20" x="180">L</text>
</svg>

---

## text-decoration

L'attribut `text-decoration` permet de "décorer" le texte, il est identique à l'attribut CSS.

``` html
<text x="0" y="30"
      text-decoration="wavy underline">Lorem ipsum</text>
```

<svg width="100" height="50">
  <text x="0" y="30" text-decoration="wavy underline">Lorem ipsum</text>
</svg>

## font-family

L'attribut `font-family` permet de modifier la police d'écriture du texte.

``` html
<text x="0" y="30">Lorem ipsum</text>
<text x="0" y="60" font-family="monospace">Lorem ipsum</text>
```

<svg width="120" height="80">
  <text x="0" y="30">Lorem ipsum</text>
  <text x="0" y="60" font-family="monospace">Lorem ipsum</text>
</svg>

## font-style

L'attribut `font-style` définit le style du texte: `normal`, `italic`, ou `oblique`.

``` html
<text x="0" y="30" font-style="italic">Lorem ipsum</text>
```

<svg width="120" height="50">
  <text x="0" y="30" font-style="italic">Lorem ipsum</text>
</svg>

## font-weight

L'attribut `font-weight` définit la graisse à utiliser, même principe qu'en CSS, on peut utiliser un mot-clé `bold`, `bolder`, `lighter` ou une valeur `100`, `200`, etc.

``` html
<text x="0" y="30" font-weight="bold">Lorem ipsum</text>
```

<svg width="120" height="300">
  <text x="0" y="30" font-weight="100">100</text>
  <text x="0" y="60" font-weight="200">200</text>
  <text x="0" y="90" font-weight="300">300</text>
  <text x="0" y="120" font-weight="400">400</text>
  <text x="0" y="150" font-weight="500">500</text>
  <text x="0" y="180" font-weight="600">600</text>
  <text x="0" y="210" font-weight="700">700</text>
  <text x="0" y="240" font-weight="800">800</text>
  <text x="0" y="270" font-weight="900">900</text>
</svg>

## font-size

L'attribut `font-size` définit la taille de la police.

``` html
<text x="0" y="30">Lorem ipsum</text>
<text x="0" y="60" font-size="36">Lorem ipsum</text>
```

<svg width="220" height="80">
  <text x="0" y="30">Lorem ipsum</text>
  <text x="0" y="60" font-size="36">Lorem ipsum</text>
</svg>

---

## pointer-events

L'attribut `pointer-events` définit quand l'élément peut recevoir des événements de la souris. Par défaut, une forme n'est cliquable que lorsqu'elle est visible. Les valeurs possibles sont `visiblePainted` (par défaut), `visibleFill`, `visibleStroke`, `visible`, `painted`, `fill`, `stroke`, `bounding-box`, `all` et `none`.

``` html
<style>
  rect { cursor: pointer; }
</style>
<rect width="50" height="50" fill="blue">
  <title>Rectangle</title>
</rect>
<rect width="50" height="50" x="50" fill="red" pointer-events="none">
  <title>Rectangle</title>
</rect>
```

<svg width="100" height="50">
  <style>
    rect { cursor: pointer; }
  </style>
  <rect width="50" height="50" fill="blue">
    <title>Rectangle</title>
  </rect>
  <rect width="50" height="50" x="50" fill="red" pointer-events="none">
    <title>Rectangle</title>
  </rect>
</svg>

## visibility

L'attribut `visibility` définit si l'élément est visible ou non.
Un élément invisible prend toujours de la place.

``` html
<text x="5" y="30">
  <tspan visibility="hidden">Lorem</tspan>
  <tspan>ipsum</tspan>
</text>
```

<svg width="100" height="50" style="background: lightgrey">
  <text x="5" y="30">
    <tspan visibility="hidden">Lorem</tspan>
    <tspan>ipsum</tspan>
  </text>
</svg>

## display

L'attribut `display` définit si l'élément doit être affiché ou non, et si oui comment.  
Les valeurs les plus utiles sont: `none` et `inline` (par défaut).

``` html
<text x="5" y="30">
  <tspan display="none">Lorem</tspan>
  <tspan>ipsum</tspan>
</text>
```

<svg width="100" height="50" style="background: lightgrey">
  <text x="5" y="30">
    <tspan display="none">Lorem</tspan>
    <tspan>ipsum</tspan>
  </text>
</svg>
