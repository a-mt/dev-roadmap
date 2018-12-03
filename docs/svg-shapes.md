---
title: "SVG: Les formes de base"
category: Web, HTML, SVG
---

À l'intérieur de la balise `svg`, on peut placer différentes formes, comme des rectangles, lignes, cercles, etc.  

* Les éléments sont dessinés dans l'ordre dans lequel ils apparaissent dans le code:  
  les premiers se trouvent en dessous des derniers.

* Contrairement au HTML, la syntaxe SVG est sensible à la casse et les valeurs des attributs doivent toujours être placées entre guillemets, même si ce sont des nombres.

* Pour placer les éléments à l'intérieur du SVG, on précise les coordonnées `x` et `y` de la forme.  
  Le point d'origine (0,0) est le coin supérieur gauche du SVG.  
  La valeur de `x` pousse la forme vers la droite et la valeur de `y` vers le bas à partir du point d'origine.

* Les formes qui dépassent la zone d'affichage du SVG sont tronquées.

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

### polyline

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

### polygon

La balise `polygon` permet de tracer des lignes droites entre plusieurs `points`, de même que `polyline`,
mais contrairement à cette dernière cela crée une forme fermée.

``` html
<polygon points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
          stroke="white" stroke-width="5" fill="red" />
```

<svg width="100" height="100" style="background: black">
    <polygon points="10 10, 15 20, 20 15, 25 30, 30 25, 35 40, 40 35, 45 50, 50 45, 80 10"
              stroke="white" stroke-width="5" fill="red" />
</svg>

---

### path

La balise `path` permet de créer des formes complexes à partir d'une série de lignes droites et courbes définie par `d`.  
L'attribut `d` définit une liste de commandes a exécuter. Chaque commande est appelée par une lettre spécifique et est suivit de paramètres.
Par exemple, `M20,30` déplace le curseur à la position (20,30)

Deux nombres peuvent être séparés par une virgule ou un espace.

``` html
<path d="M20,30 Q40,5 50,30 T90,30" stroke="white" stroke-width="5" />
```

<svg width="100" height="100" style="background: black">
  <path d="M20,30 Q40,5 50,30 T90,30" stroke="white" stroke-width="5" />
</svg>

Toutes les commandes peuvent être appelées soit avec
* une **lettre majuscule**, auquel cas les coordonnées données sont absolues (ex: point aux coordonnées (10,7)).
* une **lettre minuscule**, auquel cas les coordonnées sont relatives (ex: point à 10px vers le bas et 7px vers la droite de la position actuelle).

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

### text

La balise `text` permet d'ajouter du texte dans le SVG.  
Par défaut, le point (`x`,`y`) désigne la position du coin inférieur gauche du texte. Il est possible de modifier ce comportement. avec les attributs `text-anchor` et `alignment-baseline`.

``` html
<text x="5" y="15" fill="white">Hello World</text>
```

<svg width="100" height="100" style="background: black">
    <text x="5" y="15" fill="white">Hello World</text>
</svg>

### tspan

La balise `tspan` est forcemment enfant de `text` ou `tspan`. Elle permet de baliser des sous-parties de texte.

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

Les attributs `dx` et `dy` permettent de décaler l'élément par rapport à sa position calculée.  
Cela permet par exemple d'ajouter des retours à la ligne.

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

### textPath

La balise `textPath` permet de placer du texte sur une ligne définit par un élément `path`.  
Attention, le texte ne tenant pas sur la ligne est tronqué.

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