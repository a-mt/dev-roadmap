---
title: Canvas
category: Web, JavaScript, API
---

Tandis qu'il est possible d'utiliser CSS et JavaScript pour animer les images vectorielles SVG - puisqu'elles sont définies par le balisage - cette manière n'est pas efficace pour créer des animations de jeux, des scènes 3D, et autres animations graphiques généralement traitées par les langages de bas niveau tels que C++ ou Java.

`<canvas>` et l'API Canvas permet de créer des images bitmap scriptées. Ce n'est pas très utile pour créer des images statiques mais plutôt pour créer des images dynamiquement, comme des animations 2D et visualisations de données en temps réel.

[Exemple animation Canvas 2D](https://mdn.github.io/learning-area/javascript/oojs/bouncing-balls/index-finished.html)

Il existe également une implémentation de canvas 3D, WebGL, une API qui permet de créer de véritables graphiques 3D dans le navigateur web. Nous ne l'aborderons pas dans cet article

---

## Créer un canvas

Pour créer une scène 2D ou 3D sur une page, il faut nécessairement avoir un élément `<canvas>`. Du contenu alternatif peut être mis à l'intérieur, il ne sera affiché que si le navigateur ne prend pas en charge les canvas.

``` js
<canvas width="320" height="240">
  <p>Votre navigateur ne prend pas en charge canvas!</p>
</canvas>
```

Les attributs `width` et `height` sont facultatifs. Les dimensions par défaut sont de 300 pixels par 150. On peut également les mettre à jour via JavaScript.

``` js
var canvas = document.querySelector('canvas'),
    width  = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
```

Notez que si vous définissez les dimensions du canvas aux dimensions de la fenêtre, il est nécessaire de supprimer les `margin` du `<body>` pour ne pas avoir de scrollbar.

``` css
body {
  margin: 0;
  overflow: hidden;
}
```

Par défaut, le canvas n'affiche rien du tout, il faut utiliser JavaScript pour afficher du contenu à l'écran.

La taille du canvas doit être spécifié soit via les attributs HTML soit via JavaScript. En utilisant CSS pour dimensionner le canvas, le dimensionnement du canvas est effectué après que le contenu du canvas n'ait été calculé, et comme toute autre image, elle peut devenir pixelisée/déformée (puisque le canvas une fois affiché n'est plus qu'une simple image).

---

## Récupérer le contexte

Pour dessiner sur le canvas, la première chose à faire est de récupérer une référence à la zone de dessin, appelé le *contexte* du canvas.

``` js
if(!canvas.getContext) {
    return;
}
var ctx = canvas.getContext('2d');
```

Toutes les opérations de dessin impliqueront d'utiliser cet objet.  
Au début le canvas est complètement vide, il ne s'agit que d'un rectangle transparent.

---

## Dessiner des formes

À l'intérieur de ce contexte, on peut ajouter différentes formes, comme des rectangles, lignes, cercles, etc.  
Les éléments sont dessinés dans l’ordre dans lequel ils apparaissent dans le code: les premiers se trouvent en dessous des derniers.
Lorsque qu’une forme est dessinée, il est impossible de la modifier - ce ne sont plus que des pixels sur une image bitmap.

Les éléments sont dessinés par rapport à l'origine du canvas, qui est par défaut le point supérieur gauche du canvas (0,0).  
La valeur de `x` déplace la forme vers la droite, et la valeur de `y` vers le bas.

Il n'existe pas de méthode à proprement parler pour changer la couleur de fond du canvas. Pour ce faire, on ajoute un rectangle qui recouvre toute la surface du canvas.

<ins>Exemple</ins>:

``` js
var canvas = document.getElementById('canvas'),
    ctx    = canvas.getContext('2d');

// Définit la taille du canvas
canvas.width  = 100;
canvas.height = 100;

// Ajoute un rectangle noir pour créer le fond
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 100, 100);

// Dessine deux rectangles
ctx.fillStyle = 'white';
ctx.fillRect(5, 5, 50, 50);

ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 50, 50);
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" width="50" height="50" fill="white"></rect>
    <rect x="10" y="10" width="50" height="50" fill="red"></rect>
</svg>

[JSFiddle](https://jsfiddle.net/amt01/a9be6muz/)

Différentes [propriétés](#les-propri%C3%A9t%C3%A9s-du-contexte) peuvent être définies sur le contexte pour customiser la mise en forme: couleur du fond, couleur de la bordure, épaisseur du trait, etc. Une fois que les propriétés sont définies, on peut appeler les [méthodes](#les-m%C3%A9thodes-du-contexte) du contexte pour tracer la forme.

Pour créer une forme avec des bords arrondis, il n'existe pas de propriété `border-radius`, il est nécessaire de "tricher": on définit la propriété `lineJoin = "round"` et on crée une bordure de la même couleur que le fond. [JsFiddle border-radius](https://jsfiddle.net/amt01/pu7bw4en/).

---

### Rectangle

Comme pour tout élément du canvas, il faut au préalable définir les propriétés du contexte (couleur, épaisser du trait...) avant de tracer la forme.

``` js
ctx.lineWidth = 5;                      // définit l'épaisseur du contour
ctx.fillStyle = 'rgb(0, 255, 0)';       // définit la couleur du contour
ctx.strokeStyle = 'rgb(255, 255, 255)'; // définit la couleur du fond
```

* Dessiner un rectangle plein  
  Pour dessiner un rectangle, on peut utiliser la méthode `fillRect(x, y, width, height)` pour tracer le rectangle directement, ou alors le définir dans un premier temps avec `rect(x, y, width, height)` avant de le tracer avec `fill()`.

  ``` js
  ctx.fillRect(25, 25, 100, 100);
  ```

  ``` js
  ctx.rect(25, 25, 100, 100);
  ctx.fill();
  ```

* Dessiner les contours d'un rectangle  
  Même principe que pour un rectangle plein mais en appelant `stroke` plutôt que `fill`.

  ``` js
  ctx.strokeRect(25, 25, 100, 100);
  ```

  ``` js
  ctx.rect(25, 25, 100, 100);
  ctx.stroke();
  ```

* Dessiner un rectangle plein avec des contours

  ``` js
  ctx.strokeRect(25, 25, 100, 100);
  ctx.fillRect(25, 25, 100, 100);
  ```

  ``` js
  ctx.rect(25, 25, 100, 100);
  ctx.stroke();
  ctx.fill();
  ```

---

### Lignes

On peut dessiner des lignes droites et/ou courbes.  
Pour ce faire, on a plusieurs méthodes qui permettent de spécifier où déplacer le stylo sur le canvas.

Les méthodes utiles pour tracer des lignes droites:

| Méthode        | Description
|---             |---
| `beginPath()`  | Commence un nouveau chemin au point où se situe le stylo sur le canvas. Sur un nouveau canvas, le stylo commence au point (0, 0).
| `moveTo()`     | Déplace le stylo à un point différent sur le canvas, sans tracer de ligne - le stylo "saute" simplement vers une nouvelle position.
| `lineTo()`     | Ajoute une ligne droite qui part de la position actuelle du stylo et va aux coordonnées spécifiées - le stylo est déplacé vers cette nouvelle position.
| `closePath()`  | Ajoute une ligne droite qui part de la position actuelle du stylo et va au point de départ du chemin en cours.

Une fois que le chemin est spécifié, alors on peut alors tracer le trait avec `stroke()` et/ou remplir la forme avec `fill()`.

<ins>Exemple</ins>:

``` js
var canvas = document.getElementById('canvas'),
    ctx    = canvas.getContext('2d');

// Définit la taille du canvas
canvas.width  = 100;
canvas.height = 100;

// Ajoute un fond
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 100, 100);

// Dessine une triangle
ctx.beginPath();     // ouvre un nouveau chemin
ctx.moveTo(10,10);   // définit le point de départ du chemin
ctx.lineTo(100,10);  // ajoute la 1ère ligne droite
ctx.lineTo(60,60);   // ajoute la 2ème ligne droite
ctx.closePath();     // ferme le triangle (ajoute la 3ème ligne droite)

ctx.fillStyle = "lightblue";
ctx.fill();          // remplit la forme
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <path fill="lightblue" stroke="none" d="M 10 10 L 100 10 L 60 60 Z"/>
</svg>

---

### Courbes quadratiques et courbes de Bézier

Pour dessiner des lignes courbes, plutôt que `lineTo()`, on a le choix entre deux méthodes:
`quadraticCurveTo()`, pour des courbes de Bézier cubiques, ou `bezierCurveTo()`, pour ces courbes de Bézier quadratiques.

* Une courbe de Bézier quadratique a un point de départ, un point d'arrivée et seulement un point de contrôle.

  ``` js
  ctx.quadraticCurveTo(cp1x, cp1y, x, y)
  ```

  * Le point de départ est la position actuelle du stylo
  * le point de contrôle est spécifié par les paramètres `cp1x, cp1y`
  * le point d'arrivée est spécifié par les paramètre `x, y`

* Une courbe de Bézier cubique a un point de départ, un point d'arrivée et deux points de contrôle.

  ``` js
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  ```

  * Le point de départ est la position actuelle du stylo
  * le premier point de contrôle est spécifié par les paramètres `cp1x, cp1y`
  * le deuxième point de contrôle est spécifié par les paramètres `cp2x, cp2y`
  * le point d'arrivée est spécifié par les paramètre `x, y`

![](https://i.imgur.com/FSbHK7x.png)

<ins>Exemple</ins>:

``` js
ctx.beginPath();
ctx.strokeStyle = "white";
ctx.lineWidth = 3;

var left   = 5,
    top    = 10,
    right  = left + 50,
    bottom = top + 80;

ctx.moveTo(left, top);
// Origine: (left, top)

ctx.bezierCurveTo(right, top, left, bottom, right, bottom);
// Point de controle 1 : courbe (right, top)
// Point de controle 2 : courbe (left, bottom)
// Destination : (right, bottom)

ctx.stroke();
ctx.closePath();
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <path fill="none" stroke="white" paint-order="fill stroke markers" d=" M 5 10 C 55 10 5 90 55 90" stroke-miterlimit="10" stroke-width="3" stroke-dasharray=""/>
</svg>

---

### Cercles et arcs de cercle

Pour tracer des cercles ou des arcs de cercle, on utilise la méthode `arc()`. Cette méthode prend 6 paramètres:

    arc(x, y, rayon, angle_debut, angle_fin, sens_antihoraire)

| Paramètres               | Description
|---                       |---
| `x, y`                   | Position du centre du cercle
| `rayon`                  | Rayon du cercle
| `angle_debut, angle_fin` | Angles de début et de fin, en radians, pour dessiner l'arc (donc des angles de 0 et 360 degrés donnent un cercle fermé)
| `sens_antihoraire`       | Définit si le cercle doit être dessiné dans le sens des aiguilles d'une montre ou dans le sens inverse (`false` pour le sens horaire)

<ins>Exemple</ins>:

Dessine un cercle complet, de rayon 40 pixels:

``` js
ctx.beginPath();
ctx.arc(50, 50, 40, degToRad(0), degToRad(360), false);
ctx.fillStyle = "lightblue";
ctx.fill();
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <path fill="lightblue" stroke="none" paint-order="stroke fill markers" d=" M 90 50 A 40 40 0 1 1 89.99998000000167 49.96000000666664"/>
</svg> 

Dessine un Pacman, de rayon 50 pixels, aux coordonnées (200,106):

``` js
ctx.beginPath();
ctx.arc(50, 50, 40, degToRad(-45), degToRad(45), true);
ctx.lineTo(50, 50);
ctx.fillStyle = 'yellow';
ctx.fill();
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <path fill="yellow" stroke="none" paint-order="stroke fill markers" d=" M 78.2842712474619 21.7157287525381 A 40 40 0 1 0 78.2842712474619 78.2842712474619 L 50 50"/>
</svg> 

<ins>Fonction degToRad</ins>:

La fonction `degToRead` est utilisée pour convertir une valeur en degrés vers une valeur en radians. Chaque fois que devez fournir une valeur d'angle en JavaScript, ce sera presque toujours en radians - mais les humains pensent généralement en degrés.

``` js
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
```

---

### Texte

Il existe deux méthodes pour dessiner du texte: `fillText()` pour dessiner un texte rempli, `strokeText()` pour dessiner un contour de texte. Toutes deux prennent trois paramètres:

    fillText(text, x, y)

Par défaut, les coordonnées (x,y) définissent la position du coin inférieur gauche de la zone de texte. Il est possible de modifier ce comportement grâce aux propriétés `textAlign` (pour l'alignement horizontal) et `textBaseline` (pour l'alignement vertical). La police et la taille du texte peuvent être définies avec la propriété `font` (même format que la propriété CSS `font`).

<ins>Exemple</ins>:

Dessiner le contour du texte:

``` js
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '36px arial';
ctx.strokeText('Canvas text', 50, 50);
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <text fill="none" stroke="white" font-family="arial" font-size="36px" font-style="normal" font-weight="normal" text-decoration="normal" x="10" y="36" text-anchor="start" dominant-baseline="alphabetic" stroke-miterlimit="10" stroke-dasharray="">Text</text>
</svg> 

Dessiner un texte rempli:

``` js
ctx.fillStyle = 'white';
ctx.font = '36px georgia';
ctx.fillText('Text', 10, 36);
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <text fill="white" stroke="none" font-family="georgia" font-size="36px" font-style="normal" font-weight="normal" text-decoration="normal" x="10" y="36" text-anchor="start" dominant-baseline="alphabetic">Text</text>
</svg>

Modifier l'alignement du texte:

``` js
ctx.fillStyle = 'white';
ctx.font = '36px sans';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
ctx.fillText('Text', 50, 10);
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <text fill="white" stroke="none" font-family="sans" font-size="36px" font-style="normal" font-weight="normal" text-decoration="normal" x="50" y="10" text-anchor="middle" dominant-baseline="text-before-edge">Text</text>
</svg> 

---

### Image

Il est possible d'inclure une image externe dans un canvas. Pour ce faire, on doit au préalable récupérer un élément `HTMLImageElement`: soit on sélectionne une image présente dans la page (balise `img`), soit on la charge dynamiquement avec le constructeur `Image()`.

``` js
var image = new Image();
image.src = 'firefox.png';
```

Une fois l'image chargée, elle peut être ajoutée au canvas avec `drawImage()`.  
Cette méthode peut prendre 3 arguments ou 9.

#### Version courte

Il faut donner au minimum trois paramètres: l'image et les coordonnées (x,y) du coin supérieur gauche de l'image.

    drawImage(resource, x, y)

``` js
image.onload = function() {
  ctx.drawImage(image, 50, 50);
}
```

#### Version complète

La version complète permet en plus de tronquer et redimensionner l'image. Elle prend 9 paramètres:

    drawImage(resource, sx, sy, sWidth, sHeight, x, y, width, height)

| Paramètres        | Description
|---                |---
| `resource`        | L'élément HTMLImageElement
| `sx, sy`          | Les coordonnées à partir d'où découper l'image, relativement au coin supérieur gauche de l'image d'origine. Tout ce qui est à gauche de `sx` ou au-dessus de `sy` ne sera pas dessiné.
| `sWidth, sHeight` | La largeur et la hauteur de l'image que l'on veut découper, à partir du coin supérieur gauche de la découpe.
| `x, y`            | Les coordonnées de l'image sur le canvas, relativement au coin supérieur gauche du canvas.
| `width, height`   | La largeur et hauteur affichée de l'image. En spécifiant des dimensions différentes de `sx, sy`, l'image est redimensionnée/déformée.

<ins>Exemple</ins>:

```  js
ctx.drawImage(
  image,
  20, 20,      // couper 20 pixels à gauche et 20 pixels en haut
  185, 175,    // dimensions de la découpe
  50, 50,      // position sur le canvas
  185, 175     // dimensions affichée (en l'occurence, identique à l'origine)
);
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"></rect>
    <image width="30" height="32" preserveAspectRatio="none" transform="translate(50, 50)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAArElEQVRIie2UwQ2AIAxFf4KzOImb6NlFnMJ9PDiCm9QThCggBZIi4Sc9AC2vKS0AQOs+ZxkAsu/Ra3woG+xLpF2wBYoCioPhCPQ1y9c5WyJgE3heB53XQZsaaFPDq6R6X/tlv7EI2BXIbaakcRIFR4wHK7GoBKoCp34g/wFzS9gOeJlGljkujv9IxMC247NUT1DS2NQINnAf2HfePjhgyRIDBxMoCagO3NVVTDeF5BMYShZMKwAAAABJRU5ErkJggg=="></image>
</svg>

---

## Path2D

L'objet Path2D permet de garder en mémoire des instructions de dessin, ce qui permet de factoriser le code. Disponible dans les navigateurs récents.

``` js
var shape = new Path2D();
shape.rect(10, 10, 50, 50);
```

Path2D permet également d'utiliser des trajets SVG sur le canvas.

``` js
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

<ins>Exemple</ins>:

``` js
// Définit une forme
var shape = new Path2D();
shape.rect(5, 5, 50, 50);

// Dessine la forme en blanc
ctx.fillStyle = 'white';
ctx.fill(shape);

// Déplace l'origine du canvas et dessine la forme en rouge
ctx.translate(5, 5);
ctx.fillStyle = 'red';
ctx.fill(shape);
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" width="50" height="50" fill="white"></rect>
    <rect x="10" y="10" width="50" height="50" fill="red"></rect>
</svg>

---

## Les propriétés du contexte

### fillStyle: définir la couleur de fond

La propriété `ctx.fillStyle` est utilisée pour définir la couleur de fond en cours.  
Tous les éléments ajoutés sur le canvas (des rectangles, des cercles, etc) prendrons cette couleur pour couleur de fond.

Les valeurs de couleur acceptées sont les mêmes qu'en CSS (nom de couleur, rgb, rgba...).  
Ainsi, il est possible de rendre un canvas semi-transparent en utilisant des couleurs semi-transparentes:

``` js
ctx.fillStyle = 'rgba(255, 0, 255, 0.75)';
```

Il est possible de créer des gradients et d'affecter cet objet aux propriétés `fillStyle` ou `strokeStyle` (cf `createLinearGradient()`).

### strokeStyle: définir la couleur du trait

Outre la couleur de fond, on peut définir la couleur de trait en cours avec `ctx.strokeStyle`.  
Même principe que `fillStyle` sauf que `strokeStyle` définit la couleur du contour de l'élément et non de la couleur de remplissage.

``` js
ctx.strokeStyle = 'rgb(255, 255, 255)';
```

### lineWidth: définir l'épaisser du trait

Par défaut, l'épaisseur de trait est de 1 pixel. On peut le rendre plus épais en spécifiant le nombre de pixels du trait via la propriété `ctx.lineWidth`.

``` js
ctx.lineWidth = 5;
```

![](https://i.imgur.com/9IMPNqf.png)

### lineCap: définir l'extrémité des lignes

La propriété `lineCap` définit comment les extrêmités de chaque ligne sont dessinées.  
Il y a trois valeurs possibles: 

* `butt` (par défaut): L'extrémité des lignes est droit
* `round`: L'extrémité des lignes est arrondi
* `square`: L'extremité des lignes en droit, en ajoutant une extension d'une largeur égale à la ligne et une hauteur égale à la moitié de la largeur de la ligne

``` js
ctx.lineCap = "round";
```

![](https://i.imgur.com/6xvio8d.png)

### lineJoin: définir les jointures entre deux segments

La propriété `lineJoin` définit comment deux segments (lignes, arcs ou courbes) sont joints ensemble.   
`lineJoin` n'a pas d'effet si les deux segments connectés ont la même direction, parce qu'aucune zone de jointure ne sera ajoutée dans ce cas.  
Il existe trois valeurs possibles:

* `round`: Arrondit les angles. Le rayon de ces angles arrondis est égal à la moitié de la largeur du trait
* `bevel`: Ajoute un triangle à l'extérmité des segments connectés
* `miter` (par défaut): Les segments connectés sont reliés en prolongeant leurs bords extérieurs pour se connecter en un seul point, avec pour effet de remplir une zone supplémentaire en forme de losange.

``` js
ctx.lineJoin = "round";
```

![](https://i.imgur.com/qo61pbc.png)


Pour les jointures de type `miter`, il est possible de spécifier la longueur maximale du bord extérieur ajouté avec la propriété `miterLimit`. Plus l'angle est aigu, plus la distance est elevée. La valeur par défaut est 10. Au-delà de cette valeur, une jointure en biseau (`bevel`) sera affichée à la place.

[JsFidlle miterLimit](https://jsfiddle.net/amt01/0gutu4ze/)

### setLineDash(), lineDashOffset: dessiner des pointillés

La méthode `setLineDash()` accepte une liste de nombres qui spécifie les distances pour dessiner alternativement une ligne et un espace.
La propriété `lineDashOffset` définit un décalage pour commencer le motif.

``` js
ctx.setLineDash([4, 2]);
ctx.lineDashOffset = 2;
```

### shadow: afficher des ombres

Il existe 4 méthodes pour créer une ombre

* `shadowOffsetX`: spécifie la distance horizontale sur laquelle l'ombre doit s'étendre à partir de l'objet
* `shadowOffsetY`: spécifie la distance verticale sur laquelle l'ombre doit s'étendre à partir de l'objet
* `shadowBlur`: spécifie la taille de l'effet de floutage
* `shadowColor`: spécifie la couleur de l'ombre

<ins>Exemple</ins>:

``` js
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 2;
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

ctx.font = '36px sans';
ctx.fillStyle = 'black';
ctx.fillText('Text', 10, 36);
```

<img src="data:image/png;base64,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">

### globalCompositeOperation: changer le type de composition

Il est possible de spécifier le type d'opération de composition à appliquer lorsqu'on dessine de nouvelles formes. Par défaut, on dessine les formes par-dessus le contenu existant. Il est possible d'effectuer des multiplications, des soustractions, sur le même principe que les layers Gimp.

![](https://i.imgur.com/q2xEIPT.png)

[Documentation MDN](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Composition)

---

## Les méthodes du contexte

### fill(): remplir une forme

Remplit le chemin en cours avec le style définit par `ctx.fillStyle`.

* Quand on essaie de remplir un chemin qui n'est pas fermé, la navigateur ajoute une ligne droite entre le début et la fin du chemin et remplit la forme créée (n'affecte pas `ctx.stroke()`).

  <ins>Exemple</ins>:

  ``` js
  ctx.beginPath();
  ctx.moveTo(5,5);
  ctx.lineTo(90,20);
  ctx.lineTo(60,60);

  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();
  ```

  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <path fill="lightblue" stroke="red" paint-order="fill stroke markers" d=" M 5 5 L 90 20 L 60 60" stroke-miterlimit="10" stroke-width="5" stroke-dasharray=""/>
  </svg> 

* Il est possible de spécifier l'algorithme à utiliser pour déterminer si un point est à l'intérieur ou à l'extérieur du chemin:
    * `"nonzero"`: utiliser la règle de remplissage extérieur/intérieur non nul - par défaut (à gauche).  
       Le nombre de croisements d’une ligne correspond au nombre total de fois où une ligne croise une partie du tracé allant de gauche à droite moins le nombre total de fois où une ligne croise une partie du tracé allant de droite à gauche.
       Si une ligne tracée dans une direction quelconque à partir du point possède un nombre de croisements égal à zéro, le point est à l'extérieur, sinon, il est à l'intérieur.

    * `"evenodd"`: utiliser la règle de remplissage pair/impair (à droite).  
      Si une ligne tracée depuis un point et dans une direction quelconque croise le tracé selon un nombre impair, le point est à l'intérieur, dans le cas contraire, le point est à l'extérieur.

  ![](https://i.imgur.com/39WdSRe.png)

  <ins>Exemple</ins>:

  ``` js
  var shape = new Path2D();
  shape.moveTo(96.50,50.00);
  shape.bezierCurveTo(96.50,62.84,0.22,99.82,50.74,47.17);
  shape.bezierCurveTo(100.18,0.58,62.84,96.50,50.00,96.50);
  shape.bezierCurveTo(24.32,96.50,3.50,75.68,3.50,50.00);
  shape.bezierCurveTo(3.50,24.32,24.32,3.50,50.00,3.50);
  shape.bezierCurveTo(75.68,3.50,96.50,24.32,96.50,50.00);

  // Nonzero en bleu clair
  ctx.lineWidth = 2;
  ctx.fillStyle = "lightblue";
  ctx.fill(shape, "nonzero");
  ctx.stroke(shape);

  // Evenodd en rouge clair
  ctx.translate(100, 0);
  ctx.fillStyle = "lightcoral";
  ctx.fill(shape, "evenodd");
  ctx.stroke(shape);
  ```

  <img src="data:image/png;base64,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">

### stroke(): tracer un chemin

Remplit le chemin en cours avec le style définit par `ctx.strokeStyle` et l'épaisseur de trait définit par `ctx.lineWidth`.

``` js
ctx.rect(75, 75, 100, 100);

ctx.lineWidth = 5;
ctx.strokeStyle = 'rgb(255, 0, 0)';
ctx.stroke();
```

### clip(): créer un détourage

On peut utiliser la méthode `clip()` à la place de `closePath()`.
Cela a pour effet de créer, non pas une forme, mais un détourage: toutes les formes qui seront ajoutées par la suite au canvas seront tronquées, limitées à l'intérieur du détourage.

<ins>Exemple</ins>:

``` js
// Définit un clip: tout ce qui suit est limité à un cercle
ctx.beginPath();
ctx.arc(50,50,40, degToRad(0), degToRad(360), false);
ctx.clip();

// Dessine un rectangle rouge
ctx.fillStyle = "red";
ctx.fillRect(0,0,100,100);

// Dessine un rectangle blanc
ctx.fillStyle = "white";
ctx.fillRect(0,0,50,100);
```

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <defs><clipPath id="pzLqDyLzUBqE"><path fill="none" stroke="none" d=" M 90 50 A 40 40 0 1 1 89.99998000000167 49.96000000666664"/></clipPath></defs>
    <rect fill="black" stroke="none" x="0" y="0" width="100" height="100"/>
    <g clip-path="url(#pzLqDyLzUBqE)">
      <rect fill="red" stroke="none" x="0" y="0" width="100" height="100"/>
      <rect fill="white" stroke="none" x="0" y="0" width="50" height="100"/>
    </g>
</svg> 

NB Le détourage fait bien partie de l'état du canvas, il est donc sauvegardé par `save()`.

### createLinearGradient(), createRadialGradient(): créer un gradient

Il est possible d'utiliser un gradient comme couleur de remplissage.  
Pour ce faire, il faut

1. créer un nouveau gradient, linéaire ou radial:

   * `createLinearGradient(x1, y1, x2, y2)` pour créer un dégradé linéaire.  
     `x1, y1` est le point de départ du gradient,
     `x2, y2` est le point d'arrivée

   * `createRadialGradient(x1, y1, r1, x2, y2, r2)` pour créer un dégradé radial.  
      `x1,y1,r1` est le premier cercle - de coordonnées (x1,y1) et rayon r1,
      `x2,y2,r2` est le deuxième cercle

2. assigner des couleurs avec `gradient.addColorStop(position, color)`.  
  Chaque appel à `addColorStop` ajoute une nouvelle couleur au gradient. On définit la position de la couleur entre 0 (le début du gradient) et 1 (la fin du gradient).

<ins>Exemple</ins>:

Gradient linéaire:

``` js
var gradient = ctx.createLinearGradient(0,0,200,0);
gradient.addColorStop(0, "green");
gradient.addColorStop(1, "white");
ctx.fillStyle = gradient;
ctx.fillRect(10,10,200,100);
```

![](https://i.imgur.com/g39qAT6.png)

Gradient radial:

``` js
var gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'green');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);
```

![](https://i.imgur.com/qUkRdzP.png)

Autre gradient radial:

``` js
var gradient = ctx.createRadialGradient(45, 45, 30, 52, 50, 50);
gradient.addColorStop(0, '#A7D30C');
gradient.addColorStop(0.9, '#019F62');
gradient.addColorStop(1, 'rgba(1, 159, 98, 0)');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 150, 150);
```

![](https://i.imgur.com/C73AwNu.png)

### createPattern(): créer un motif

Il est également possible d'utiliser une image comme remplissage.  
Pour ce faire, créer un motif avec `createPattern(image, repeat)`.

<ins>Exemple</ins>:

``` js
var img = new Image();
img.src = 'https://gist.githubusercontent.com/a-mt/372caa0b4114d22ac2fca4c52aeaff4e/raw/ccb6b5562bafd61cbf57f8eed5502ae3cea6f32d/index.png';

img.onload = function() {
  var pattern   = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 200, 100);
};
```

<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkBAMAAAAxqGI4AAAAIVBMVEX///+g+fCu+fK3+vTo/fvg/frZ/Pn1/v3u/fzE+/XN+/dtBtOcAAACbElEQVRo3uyYMW7bQBBFP0Uqsjv+pcl6CTiRkkoLCAaSSmtdQFJ8ABZJL0gXEOAcIIgvEOSkmeXAWB5gSm1h7H87gKFm8D7xh6T7DTm7wA647wV8saXwR7phne6M9MBs3vNjaUvR4vtQ1cArWXIAiv38CdGWwiHuSwny7ysHGfFVi2BLwRe2UYIkPKWRNgqypWAgwwNSwhW4Fg3Z0JaCP9lFbqCn8kV34A8aU4fDUPI9lW3h5x2CMe2w21ak244pumKoNojG1O/YbIMbMJ7AYxW4KY3pG8nmn95RkZ+DgG+2VF8C3TPlPPZsyMGaQu9cLXrSXc98oAOMKYC7kB5xFoJFX4cOMKYpHdOjvArBuY4eMKaa0iPOKwjy5QBY021KL+PPG6/XO7lZ0yal2QnAZQlgsQbwbE2ZUrGUx+BOQmrBYW9LQT5KkNcLuRQiIxW9LQU/QQKXi0C604UyUrK1pZB7Cu6VclYhjUQ6W4rATkJeCrUKhilFpJeQl0KdJmhLoYKRl4IKhi2FCkZeCioYthSjYMwmSwFpxpomwajyUviV/nywp5WfLIWwAWBNVTDyUlDBsKUqGJOloIJhS1UwDnkpUAXDlKpg9Hkp6IQt1RL0lgXjq1YYU6olaJMFw2mFMaVagqaCoRXGlGoJmgqGVhhbqmUlC4YkQbZUS1CdBeOgFcaUagmqs2BohbGlWoImgqEVxpZqCZoIhlYYW6olaA2U7EbBmGmFMaVagv5mwbjXCmNKb99Wbt9Wbt9W/rdjBwIAAAAAgvytB7kwcituxa24FbfiVtyKW3ErbsWtuBW34lbciltxK27ldSsB1s3EgM+m1cAAAAAASUVORK5CYII=">

### translate(): déplacer l'origine des coordonnées

Par défaut, l'origine des coordonnées se situe au coin supérieur gauche du canvas (0,0).  
Il est possible de déplacer l'origine des coordonnées, par exemple pour le mettre au centre du canvas:

``` js
ctx.translate(width/2, height/2);
```

Cette fonction est particulièrement utile lorsqu'on ajoute plusieurs formes identiques, plutôt que de modifier les coordonnées de la forme, on modifie l'origine du repère.

``` js
ctx.fillRect(20,20,50,50); // rectangle 1
ctx.translate(30,30);
ctx.fillRect(20,20,50,50); // rectangle 2, en décalage de (30,30) pixels par rapport au premier
```

### rotate(): faire pivoter le canvas

La fonction `rotate()` permet de faire pivoter le canvas. Elle prend un angle de rotation horaire (en radians) en paramètre. Utiliser des angles négatifs pour un sens anti-horaire.

``` js
ctx.rotate(45 * Math.PI / 180);
```

Le centre de la rotation est l'origine du canvas. Pour changer le centre, il faut déplacer l'origine du canvas.

### scale(): mettre à l'échelle le canvas

`scale(x,y)` permet d'augmenter ou diminuer les unités de la grille du canvas. Les valeurs inférieures à 1.0 réduisent la taille (0.5 = moitié de la taille) et les valeurs supérieures à 1.0 augmentent la taille (2.0 = double de la taille), tandis que la valeur 1.0 laisse le canvas à la même taille.

En utilisant des nombres négatifs, on peut réaliser une mise en miroir d'un axe.

``` js
ctx.scale(1, -1);
ctx.font = '48px serif';
ctx.fillText('Hello World', 0, 0);
```

![](https://i.imgur.com/fsBE4H2.png)

``` js
ctx.scale(-1, 1);
ctx.font = '48px serif';
ctx.fillText('Hello World', -width, 48);
```

![](https://i.imgur.com/KxIOWrJ.png)

### setTransform(), resetTransform(): appliquer une transformation

`setTransform()` permet d'appliquer une matrice de transformation au canvas.  
La matrice de transformation est décrite par
* a: mise à l'échelle horizontale
* b: inclinaison horizontale
* c: inclinaison verticale
* d: mise à l'échelle verticale
* e: déplacement horizontal
* f: déplacement vertical

![](https://i.imgur.com/fnD3BKU.png)

``` js
// Matrice par défaut
ctx.fillStyle = "green";
ctx.setTransform(1,0,0,1,0,0);
ctx.fillRect(0,0,100,100);

// Skew
ctx.fillStyle = "red";
ctx.setTransform(1,1,0,1,0,0);
ctx.fillRect(0,0,100,100);
```

`resetTransform()` réinitialise la transformation en cours à la matrice identité.  
C'est un raccourci pour `setTransform(1, 0, 0, 1, 0, 0)`.

### save(), restore(): sauvegarder les configurations

La méthode `save()` permet de sauvegarder l'état du canvas dans sa globalité. Sont sauvegardés:
* les transformations (translate, rotate, scale)
* les configurations (strokeStyle, fillStyle, lineWidth, lineCap, font, etc)

La méthode `restore()` restore la sauvegarde la plus récente du canvas.

### clearRect(): effacer une zone du canvas

La méthode `ctx.clearRect()` permet d'effacer le canvas. Elle prend quatre paramètres:

    clearRect(x,y,width,height)

| Paramètres     | Description
|---             |---
| `x,y`          | Coordonnées du coin supérieur gauche de la zone à effacer
| `width,height` | Largeur et hauteur de la zone

Cette méthode va effacer la zone spécifiée (tout, y compris l'arrière-plan). Ou on peut utiliser `ctx.fillRect()`.

---

## ImageData

L'objet ImageData permet de lire et écrire le canvas pour manipuler les pixels un par un.
La méthode `getImageData(x,y,width,height)` permet de récupérer un ImageData et `putImageData(imageData,x,y)` d'appliquer un ImageData au canvas.

<ins>Exemple</ins>:

Récupérer la couleur du canvas à un endroit donné:

``` js
var pixel = ctx.getImageData(x, y, 1, 1),
    data  = pixel.data,
    rgba  = 'rgba('
              + data[0] + ', '
              + data[1] + ', '
              + data[2] + ', '
              + (data[3] / 255)
            + ')';
```

Inverser les couleurs du canvas:

``` js
var imageData = ctx.getImageData(0, 0, width, height),
    data      = imageData.data;

for (var i = 0; i < data.length; i += 4) {
  data[i]     = 255 - data[i];     // rouge
  data[i + 1] = 255 - data[i + 1]; // vert
  data[i + 2] = 255 - data[i + 2]; // bleu
}
ctx.putImageData(imageData, 0, 0);
```

Mettre en niveau de gris:

``` js
var imageData = ctx.getImageData(0, 0, width, height),
    data      = imageData.data;

for (var i = 0; i < data.length; i += 4) {
  var moy = (data[i] + data[i + 1] + data[i + 2]) / 3;
  data[i]     = moy; // rouge
  data[i + 1] = moy; // vert
  data[i + 2] = moy; // bleu
}
ctx.putImageData(imageData, 0, 0);
```

---

## Enregistrer le canvas

La méthode `toDataURL()` du canvas (et non du contexte) prend un type MIME en paramètre (`image/png` si omis) et retourne l'image dans le format spécifié (URI).
Pour une image jpeg, il est possible de préciser la qualité de l'image (entre 0 et 1) en deuxième paramètre.

L'uri retournée peut être utilisée pour créer un élément image dans la page, ou ouvrir l'image dans un nouvel onglet.

``` js
var uri = canvas.toDataURL(),
    img = document.createElement('img');
img.src = uri;
document.body.appendChild(img);
```

[JsFiddle toDataURL](https://jsfiddle.net/amt01/3mgpk9qx/)

---

## Animation

### window.requestAnimationFrame(): créer une animation de 60 images par secondes

La fonction `window.requestAnimationFrame()` prend en paramètre une fonction qui sera exécutée dès que le navigateur est prêt. Si votre fonction de callback met à jour le canvas puis appelle de nouveau `window.requestAnimationFrame()`, et ce continuellement, le résultat obtenu est une animation fluide et agréable pour l'oeil humain - avec un taux de rafraichissement idéal de 60 images par seconde.

Le navigateur s'occupe des détails complexes tels qu'exécuter l'animation à une vitesse constante, et ne pas gaspiller de ressources en animant des choses qui ne sont pas visibles.

``` js
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length < 25) {
    var ball = new Ball();
    balls.push(ball);
  }

  for(i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
```

[Voir exemple Canvas 2D de balles rebondissantes](https://mdn.github.io/learning-area/javascript/oojs/bouncing-balls/index-finished.html)

Une fois que le canvas est dessiné, il est impossible modifier les formes existantes. Pour modifier le canvas, il nécessaire d'effacer et de redessiner, soit en effaçant tout, soit en effaçant la zone minimale nécessaire (en gardant du code pour).

Pour des scènes complexes, on peut empiler plusieurs canvas positionnés en absolu et utiliser les canvas comme des calques - un canvas pour le fond, un pour le menu, un pour le jeu à proprement parler...

[Animations avancées](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Advanced_animations)

### window.cancelAnimationFrame(): annuler l'appel

La boucle s'arrête lorsque vous vous arrêtez d'appeler `window.requestAnimationFrame()` ou si vous appelez `window.cancelAnimationFrame()` avant que votre fonction de callback n'ait été exécutée. C'est une bonne pratique de le faire, pour s'assurer qu'aucune mise à jour n'attend d'être exécutée.

---

Pour aller plus loin: [31 days of Canvas tutorials](http://creativejs.com/2011/08/31-days-of-canvas-tutorials/)
