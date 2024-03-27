---
title: "SVG: Les éléments de base"
category: Web, HTML, SVG
---

## Prologue

Le prologue est la première instruction de tout fichier SVG. Il indique la version XML utilisée.

```
<?xml version="1.0" encoding="utf-8"?>
<svg width="100" height="100">
  ...
</svg>
```

## SVG

Une image SVG est entièrement contenue dans une balise `svg`.  
À l'intérieur de la balise `svg`, on peut placer différentes formes, comme des rectangles, lignes, cercles, etc.  

* Les éléments sont dessinés dans l'ordre dans lequel ils apparaissent dans le code:  
  les derniers éléments seront dessinés au-dessus des premiers éléments s'ils sont au même emplacement.

* Contrairement au HTML, la syntaxe SVG est sensible à la casse et les valeurs des attributs doivent toujours être placées entre guillemets, même pour des nombres.

* Pour placer les éléments à l'intérieur du SVG, on précise les coordonnées `x` et `y` de la forme.  
  Le point d'origine (0,0) est le coin supérieur gauche du SVG.  
  La valeur de `x` pousse la forme vers la droite et la valeur de `y` vers le bas à partir du point d'origine.

* Les formes qui dépassent la zone d'affichage du SVG sont tronquées.

### Attributs: width, height

Les attributs `width` et `height` spécifient la taille d'affichage du SVG.  
Si l'unité n'est pas précisé, il s'agit par défaut de pixels.

Par exemple, pour créer une image SVG (vide) de 100px par 100px:

``` html
<svg width="100px" height="100px"></svg>
```

### Attribut: viewBox

L'attribut `viewBox` définit les dimensions du dessin.  
Les dimensions du viewbox n'ont pas d'unité, pas plus que les attributs de largeur et de hauteur des éléments à l'intérieur du SVG. La raison est simple: un SVG peut être agrandit ou rétrécit à volonté — notamment avec `width` et `height`.

Le viewBox définit les valeurs suivantes (séparées par des espaces ou des virgules):

```
viewBox="min-x min-y width height"
```

Par exemple, pour spécifier que le SVG doit être affiché sur 200px par 200px, on utilise les attributs `width` et `height`; et pour spécifier que les dimensions du SVG est 100 par 100, on utilise l'attribut `viewBox` — chaque unité du SVG vaut donc deux pixels, on double la taille du contenu.

``` html
<svg width="200" height="200" viewBox="0 0 100 100">
```

Si on ne définit pas de viewbox, les dimensions du SVG sont considérés être la taille d'affichage.  
[JSFiddle viewbox](https://jsfiddle.net/amt01/0ycvsbn6/)

### Attribut: preserveAspectRatio

Lorsqu'on redimensionne l'image, par défaut, le ratio des formes est toujours respecté et le contenu du SVG est centré au milieu.
Ce comportement peut être modifié avec l'attribut `preserveAspectRatio`. [JSFiddle preserveAspectRatio](https://jsfiddle.net/amt01/zu9vcL5h/).

``` html
<svg width="100" height="50" viewBox="0 0 100 100" preserveAspectRatio="none">
```

<svg width="215" height="85" xmlns="http://www.w3.org/2000/svg" style="background: black;">
  <defs>
     <path id="smiley" d="M50,10 A40,40,1,1,1,50,90 A40,40,1,1,1,50,10 M30,40 Q36,35,42,40 M58,40 Q64,35,70,40 M30,60 Q50,75,70,60 Q50,75,30,60" fill="yellow" stroke="black" stroke-width="8px" stroke-linecap="round" stroke-linejoin="round" />
  </defs>

  <text x="50" y="20" stroke="none" fill="white" text-anchor="middle">default</text>
  <rect x="5" y="30" width="100" height="50" fill="white" />
  <svg viewBox="0 0 100 100" width="100" height="50"
       x="6" y="30">
    <use href="#smiley" />
  </svg>

  <text x="150" y="20" stroke="none" fill="white" text-anchor="middle">none</text>
  <rect x="110" y="30" width="100" height="50" fill="white" />
  <svg viewBox="0 0 100 100" width="100" height="50"
       preserveAspectRatio="none"
       x="110" y="30">
    <use href="#smiley" />
  </svg>
</svg>

### Inception

Contrairement à HTML, un élément SVG peut inclure d'autres éléments SVG. Il est donc possible d'utiliser différents systèmes de coordonnées, en définissent les attributs `viewBox`, `width` et `height` de ce sous-document.

``` html
<svg width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="25" fill="blue" />
  </svg>
  <circle cx="25" cy="25" r="25" fill="red" />
</svg>
```

<svg width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="25" fill="blue" />
  </svg>
  <circle cx="25" cy="25" r="25" fill="red" />
</svg>

---

## rect

La balise `rect` permet d'afficher un rectangle de taille `width`x`height`.   
Le coin supérieur gauche du rectangle est positionné au point (`x`,`y`).

``` html
<rect x="5" y="5" width="50" height="90" fill="white" />
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" width="50" height="90" fill="white" />
</svg>

Par arrondir les coins, définir les attributs `rx` et `ry`.

``` html
<rect x="5"  y="5"  rx="5" ry="5"  width="45" height="45" fill="white" />
<rect x="50" y="50" rx="5" ry="15" width="45" height="45" fill="white" />
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" rx="5" ry="5" width="45" height="45" fill="white" />
    <rect x="50" y="50" rx="5" ry="15" width="45" height="45" fill="white" />
</svg>

---

## circle

La balise `circle` permet de dessiner un cercle de rayon `r`.  
Le centre du cercle est positionné au point (`cx`, `cy`).

``` html
<circle cx="20" cy="20" r="15" fill="white" />
```

<svg width="100" height="100" style="background: black">
    <circle cx="20" cy="20" r="15" fill="white" />
</svg>

## ellipse

La balise `ellipse` permet de dessiner une ellipse de rayon horizontal `rx` et de rayon vertical `ry`.  
Le centre de l'ellipse est positionné au point (`cx`, `cy`).

``` html
<ellipse cx="20" cy="20" rx="15" ry="5" fill="white" />
```

<svg width="100" height="100" style="background: black">
  <ellipse cx="20" cy="20" rx="15" ry="5" fill="white" />
</svg>

---

## line

La balise `line` permet de tracer une ligne droite entre le point (`x1`, `y1`) et le point (`x2`, `y2`).

``` html
<line x1="10" y1="10" x2="50" y2="50" stroke="white" stroke-width="5" />
```

<svg width="100" height="100" style="background: black">
  <line x1="10" y1="10" x2="50" y2="50" stroke="white" stroke-width="5" />
</svg>

---

## polyline

La balise `polyline` permet de tracer des lignes droites entre plusieurs `points`.  
Les différents points peuvent être séparés par des virgules ou des espaces.

``` html
<polyline points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
          stroke="white" stroke-width="5" fill="red" />
```

<svg width="100" height="100" style="background: black">
    <polyline points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
              stroke="white" stroke-width="5" fill="red" />
</svg>

## polygon

La balise `polygon` permet de tracer des lignes droites entre plusieurs `points`, même principe que `polyline` à la différence près qu'on crée une forme fermée.

``` html
<polygon points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
         stroke="white" stroke-width="5" fill="red" />
```

<svg width="100" height="100" style="background: black">
    <polygon points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
              stroke="white" stroke-width="5" fill="red" />
</svg>

---

## path

La balise `path` permet de créer des formes complexes à partir d'une série de lignes droites et courbes.  
L'attribut `d` définit la liste des commandes a exécuter. Chaque commande est représentée par une lettre spécifique et est suivit de paramètres.
Par exemple, `M20,30` déplace le curseur à la position (20,30)

Les deux nombres de chaque point peuvent être séparés par une virgule ou un espace.

``` html
<path d="M20,30 Q40,5 50,30 T90,30" stroke="white" stroke-width="5" />
```

<svg width="100" height="100" style="background: black">
  <path d="M20,30 Q40,5 50,30 T90,30" stroke="white" stroke-width="5" />
</svg>

Toutes les commandes peuvent être appelées soit avec
* une **lettre majuscule**, auquel cas les coordonnées données sont absolues. Ex: point aux coordonnées (10,7)
* une **lettre minuscule**, auquel cas les coordonnées sont relatives. Ex: point à 10px vers le bas et 7px vers la droite par rapport à la position actuelle

Les <ins>différentes commandes</ins> sont:

| Commande             | Nom                    | Description
|---                   |---                     |---
| `Mx,y`               | Move                   | Se déplacer vers le point (x,y), sans rien tracer
| `Lx,y`               | LineTo                 | Tracer une ligne droite vers le point (x,y)
| `Hx`                 | Horizontal&nbsp;lineTo | Tracer une ligne droite vers le point (x,.)
| `Vy`                 | Vertical&nbsp;lineTo   | Tracer une ligne droite vers le point (.,y)
| `Z`                  | ClosePath              | Fermer le chemin. Trace une ligne droite de la position actuelle au premier point du chemin
| `Cx1 y1, x2 y2, x y` | Cubic&nbsp;Bezier      | Tracer une courbe de Bézier cubique entre la position actuelle et (x,y).<br> (x1,y1) et (x2,y2) sont les points de contrôle de la courbe
| `Sx2 y2, x y`        | Shorthand              | Tracer une courbe de Bézier cubique entre la position actuelle et (x,y).<br> Le premier point de contrôle est automatiquement calculé pour être symétrique au dernier point de contrôle de la commande qui le précéde (`S` ou `C`).<br> (x2,y2) est le deuxième point de contrôle de la courbe.
| `Qx1 y1, x y`        | Quadratic&nbsp;Bezier  | Tracer une courbe de Bézier quadratique entre la position actuelle et (x,y).<br> (x1,y1) est le point de contrôle de la courbe
| `Tx y`               | Shorthand              | Tracer une courbe de Bézier quadratique entre la position actuelle et (x,y).<br> Le point de contrôle est automatiquement calculé pour être symétrique point de contrôle de la commande qui le précéde (`Q` ou `T`).
| `Arx ry 0 0 1 x y` | Elliptical&nbsp;Arc | Tracer un arc entre la position actuelle et (x,y), de rayon horizontal `rx` et de rayon vertical `ry`. Voir MDN pour la [liste complète des paramètres de Arc](https://developer.mozilla.org/fr/docs/Web/SVG/Tutoriel/Paths#Arcs)

---

## text

La balise `text` permet d'ajouter du texte dans le SVG.  
Par défaut, le point (`x`,`y`) désigne la position du coin inférieur gauche du texte.  
Il est possible de modifier ce comportement, et modifier l'alignement horizontal de l'élément, avec l'attribut `text-anchor`

``` html
<text x="5" y="15" fill="white">Hello World</text>
```

<svg width="100" height="100" style="background: black">
    <text x="5" y="15" fill="white">Hello World</text>
</svg>
[text-anchor](svg-attr.md#text-anchor)

## tspan

La balise `tspan` doit être un enfant de `text` ou `tspan`. Elle permet de baliser des sous-parties de texte.

``` html
<text x="5" y="15" fill="white">
  This is <tspan font-weight="bold" fill="red">bold</tspan>
</text>
```

<svg width="100" height="100" style="background: black">
  <text x="5" y="15" fill="white">
    This is <tspan font-weight="bold" fill="red">bold</tspan>
  </text>
</svg>

Les attributs `dx` et `dy` permettent de décaler l'élément par rapport à sa position d'origine.  
Ça permet par exemple d'ajouter des retours à la ligne.

``` html
<text x="5" y="15" fill="white">
  <tspan>A</tspan>
  <tspan x="5" dy="1em">B</tspan>
  <tspan x="5" dy="1em">C</tspan>
</text>
```

<svg width="100" height="100" style="background: black">
  <text x="5" y="15" fill="white">
    <tspan>A</tspan>
    <tspan x="5" dy="1em">B</tspan>
    <tspan x="5" dy="1em">C</tspan>
  </text>
</svg>

## textPath

La balise `textPath` permet de placer du texte sur une ligne définit par un élément `path`.  
Attention, si le texte dépasse la ligne, il est tronqué.

``` html
<path id="MyPath" fill="none" stroke="red"
        d="M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" />
<text fill="white">
  <textPath href="#MyPath">The quick brown fox jumps over the lazy dog.</textPath>
</text>
```

<svg width="100" height="100" style="background: black">
  <path id="MyPath" fill="none" stroke="red"
          d="M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" />
  <text fill="white">
    <textPath href="#MyPath">The quick brown fox jumps over the lazy dog.</textPath>
  </text>
</svg>

---

## g

La balise `g` (pour groupe) permet de grouper un ensemble de formes, un peu à la manière d'un `div` en HTML. Cette balise peut être utile 1. pour que le code soit plus compréhensible 2. pour appliquer des interractions utilisateur (comme `:hover`) 3. pour appliquer des transformations sur plusieurs formes (`transform`) 4. pour appliquer un même style (fill, stroke, etc) sur plusieurs éléments.

``` html
<style>
  g:hover * { fill: green; }
</style>
<g>
  <rect x="5" y="5" width="50" height="50" fill="white" />
  <rect x="20" y="20" width="50" height="50" fill="red" />
</g>
```

<svg width="100" height="100" style="background: black" id="hover-green">
    <style>
        #hover-green g:hover * { fill: green; }
    </style>
    <g>
      <rect x="5" y="5" width="50" height="50" fill="white" />
      <rect x="20" y="20" width="50" height="50" fill="red" />
    </g>
</svg>

---

## image

La balise `image` permet d'insérer une image (vectorielle ou bitmap) dans le document SVG.

``` html
<image width="128" height="146" xlink:href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png" />
```

<svg width="100" height="100" viewBox="0 0 128 146">
  <image width="128" height="146" xlink:href="https://i.imgur.com/yYMNQ1u.png" />
</svg>

---

## foreignObject

La balise `foreignObject` permet d'inclure à l'intérieur du SVG des éléments d'un espace de noms XML différent. Dans le contexte d'un navigateur web, il s'agit généralement d'inclure du XHTML/HTML. Dans le cas d'un SVG intégré dans du HTML, le namespace XHTML peut être omis, mais il est obligatoire dans le contexte d'un document SVG standalone.

``` html
<foreignObject x="20" y="20" width="160" height="160">
  <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 28px; overflow: auto; height: 100%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </div>
</foreignObject>
```

<svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="5,5 195,10 185,185 10,195" fill="skyblue" />

  <foreignObject x="20" y="20" width="160" height="160">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 28px; overflow: auto; height: 100%;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  </foreignObject>
</svg>

---

## switch

La balise `switch` affiche le premier élément enfant dont les attributs `requiredFeatures`, `requiredExtensions` et `systemLanguage` sont évalués à vrai. Les attributs non spécifiés valent vrai: un élément sans aucun attribut sera forcemment affiché si aucun élément n'a été affiché avant lui — ce qui revient à définir une valeur par défaut.

L'exemple suivant affiche un texte différent suivant les paramètres de langue du navigateur, ou affiche un emoji si la langue de l'utilisateur n'est pas dans la liste:

``` html
 <switch>
    <text systemLanguage="ar">مرحبا</text>
    <text systemLanguage="de,nl">Hallo!</text>
    <text systemLanguage="en">Hello!</text>
    <text systemLanguage="en-us">Howdy!</text>
    <text systemLanguage="en-gb">Wotcha!</text>
    <text systemLanguage="en-au">G'day!</text>
    <text systemLanguage="es">Hola!</text>
    <text systemLanguage="fr">Bonjour!</text>
    <text systemLanguage="ja">こんにちは</text>
    <text systemLanguage="ru">Привет!</text>
    <text>☺</text>
 </switch>
 ```

<svg width="100" viewBox="-10 -30 100 100" style="background: lightgrey">
   <switch>
      <text systemLanguage="ar">مرحبا</text>
      <text systemLanguage="de,nl">Hallo!</text>
      <text systemLanguage="en">Hello!</text>
      <text systemLanguage="en-us">Howdy!</text>
      <text systemLanguage="en-gb">Wotcha!</text>
      <text systemLanguage="en-au">G'day!</text>
      <text systemLanguage="es">Hola!</text>
      <text systemLanguage="fr">Bonjour!</text>
      <text systemLanguage="ja">こんにちは</text>
      <text systemLanguage="ru">Привет!</text>
      <text>☺</text>
   </switch>
</svg>