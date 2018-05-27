---
title: Canvas
category: Web, JavaScript, API
---

Tandis qu'il est possible d'utiliser CSS et JavaScript pour animer les images vectorielles SVG - puisqu'elles sont définies par le balisage - cette manière n'est pas efficace pour créer des animations de jeux, des scènes 3D, et autres animations graphiques généralement traitées par les langages de bas niveau tels que C++ ou Java.

`<canvas>` et l'API Canvas permet de créer des images bitmap scriptées. Ce n'est pas très utile pour créer des images statiques mais plutôt pour créer des images dynamiquement, comme des animations 2D et visualisations de données en temps réel.

Il existe également une implémentation de canvas 3D, WebGL, une API qui permet de créer de véritables graphiques 3D dans le navigateur web. Nous ne l'aborderons pas dans cet article.

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

---

## Les propriétés du contexte

### Coordonnées

Pour la plupart des opérations de dessin, vous allez devoir spécifier les coordonnées de l'élément de vous souhaitez dessiner.

Les éléments sont dessinés par rapport à l'origine du canvas, qui est par défaut le point supérieur gauche du canvas (0,0).  
L'axe horizontal (x) va de gauche à droite, et l'axe vertical (y) va de haut en bas.

![](https://i.imgur.com/TQmXMqW.png)

Ainsi le point (50,75) est à 50 pixels de la gauche et à 75 pixels du haut du canvas.

### Changer l'arrière-plan

Il n'existe pas de méthode à proprement parler pour changer la couleur de fond du canvas. Pour ce faire, on ajoute un rectangle qui recouvre toute la surface du canvas.

``` js
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);
```

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

La propriété `lineCap` définit comment les extrêmités de chaque ligne sont dessinées. Il y a trois valeurs possibles: 

* `butt` (par défaut): L'extrémité des lignes est droit
* `round`: L'extrémité des lignes est arrondi
* `square`: L'extremité des lignes en droit, en ajoutant une extension d'une largeur égale à la ligne et une hauteur égale à la moitié de la largeur de la ligne

![](https://i.imgur.com/6xvio8d.png)

### lineJoin: définir les jointures entre deux segments

La propriété `lineJoin` définit comment deux segments (lignes, arcs ou courbes) sont joints ensemble. Il existe trois valeurs possibles:

* `round`: Arrondit les angles. Le rayon de ces angles arrondis est égal à la moitié de la largeur du trait
* `bevel`: Ajoute un triangle à l'extérmité des segments connectés
* `miter` (par défaut): Les segments connectés sont reliés en prolongeant leurs bords extérieurs pour se connecter en un seul point, avec pour effet de remplir une zone supplémentaire en forme de losange.

![](https://i.imgur.com/qo61pbc.png)

`lineJoin` n'a pas d'effet si les deux segments connectés ont la même direction, parce qu'aucune zone de jointure ne sera ajoutée dans ce cas.

Pour les jointures de type `miter`, il est possible de spécifier la longueur maximale du bord extérieur ajouté avec la propriété `miterLimit`. Plus l'angle est aigu, plus la distance est elevée. La valeur par défaut est 10. Au-delà de cette valeur, une jointure en biseau (`bevel`) sera affichée à la place.

[JsFidlle miterLimit](https://jsfiddle.net/amt01/0gutu4ze/)

### setLineDash: dessiner des pointillés

`setLineDash` accepte une liste de nombres qui spécifie les distances pour dessiner alternativement une ligne et un espace.

``` js
ctx.setLineDash([4, 2]);
```

`lineDashOffset`  définit un décalage pour commencer le motif

### shadow: afficher des ombres

Il existe 4 méthodes pour créer une ombre

* `shadowOffsetX`: spécifie la distance horizontale sur laquelle l'ombre doit s'étendre à partir de l'objet
* `shadowOffsetY`: spécifie la distance verticale sur laquelle l'ombre doit s'étendre à partir de l'objet
* `shadowBlur`: spécifie la taille de l'effet de floutage
* `shadowColor`: spécifie la couleur de l'ombre

``` js
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

ctx.font = '20px Times New Roman';
ctx.fillStyle = 'Black';
ctx.fillText('Sample String', 5, 30);
```

### globalCompositeOperation: changer le type de composition

Il est possible de spécifier le type d'opération de composition à appliquer lorsqu'on dessine de nouvelles formes. Par défaut, on dessine les formes par-dessus le contenu existant. Il est possible d'effectuer des multiplications, des soustractions, sur le même principe que les layers Gimp.

![](https://i.imgur.com/q2xEIPT.png)

[Documentation MDN](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Composition)

---

## Dessiner des formes

### Rectangle

Pour dessiner un rectangle on peut soit dessiner une forme remplie, soit les contours, soit les deux. On définit les couleurs et l'épaisser de trait voulus avec les propriétés du contexte: `fillStyle`, `strokeStyle` et `lineWidth`, comme vu précédémment. Une fois la couleur spécifiée, on appelle une méthode pour dessiner la forme.

* dessiner un rectangle plein

  ``` js
  ctx.fillStyle = 'rgb(0, 255, 0)';
  ctx.fillRect(75, 75, 100, 100);
  ```

  Les deux premiers paramètres sont les coordonnées(x,y) du coin supérieur gauche du rectangle sur le canvas;  
  les deux derniers sont la largeur et la hauteur du rectangle.

* dessiner les contours d'un rectangle

  ``` js
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgb(255, 255, 255)';
  ctx.strokeRect(25, 25, 175, 200);
  ```

On peut également définir un rectangle, puis tracer son contour avec `ctx.stroke()` ou le remplir avec `ctx.fill()`.

``` js
ctx.rect(75, 75, 100, 100); // définit un rectangle
ctx.stroke();               // trace le contour
ctx.fill();                 // remplit la forme
```

### Lignes

Pour dessiner une forme complexe, on doit spécifier où déplacer le stylo sur le canvas.  
Cela permet de tracer une ou des ligne(s) / courbe(s).  
Pour ce faire, on a plusieurs méthodes:

* `beginPath()` commence un nouveau chemin au point où se situe le stylo sur le canvas.  
  Sur un nouveau canvas, le stylo commence au point (0, 0).

* `moveTo()` déplace le stylo à un point différent sur le canvas, sans tracer de ligne, le stylo "saute" simplement à une nouvelle position.

* `lineTo()` ajoute une ligne droite qui part de la position actuelle du stylo et va aux coordonnées spécifiées (le stylo est déplacé à cette nouvelle position).

* `closePath()` ajoute une ligne droite qui part de la position actuelle du stylo et va au point de départ du chemin en cours.

Une fois que le chemin est spécifié, alors on peut alors
* tracer le trait, avec `ctx.stroke()`
* et/ou remplir la forme, avec `ctx.fill()`

``` js
ctx.beginPath();     // ouvre un nouveau chemin
ctx.moveTo(20,20);   // définit le point de départ du chemin
ctx.lineTo(200,20);  // ajoute une ligne droite
ctx.lineTo(120,120); // ajoute une ligne droite
ctx.closePath();     // ferme le triangle par une ligne droite

ctx.fillStyle = "lightblue";
ctx.fill();          // remplit la forme
ctx.stroke();        // trace le chemin
```

### Cercles et arcs de cercle

La fonction `arc()` permet de créer des cercles et des arcs de cercle. Elle prend 6 paramètres:

* Paramètres 1 et 2: spécifient la position du centre du cercle (x et y respectivement).
* Paramètre 3: le rayon du cercle.
* Paramètres 4 et 5: sont les angles de début et de fin, en radians, pour dessiner l'arc (donc des angles de 0 et 360 degrés nous donnent un cercle fermé).
* Paramètre 6: définit si le cercle doit être dessiné dans le sens des aiguilles d'une montre ou dans le sens inverse (false pour le sens horaire).

Note: La fonction suivante permet de convertir des valeurs en degrés en radians. Chaque fois que devez fournir une valeur d'angle en JavaScript, ce sera presque toujours en radians - mais les humains pensent généralement en degrés.

``` js
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};
```

Dessine un cercle complet, de rayon 50 pixels, situé aux coordonnées (150,106):

``` js
ctx.beginPath();
ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
ctx.fill();
```

Dessine un Pacman, de rayon 50 pixels, aux coordonnées (200,106):

``` js
ctx.beginPath();
ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx.lineTo(200, 106);
ctx.fill();
```

### Texte

On peut dessiner du texte avec deux méthodes:

* `fillText()`: dessine un texte rempli
* `strokeText()`: dessine un contour de texte

Toutes deux prennent trois paramètres:
* la chaîne de caractères
* et les coordonnées (x,y) du coin supérieur gauche de la zone de texte.

On peut définir la police et la taille du texte avec la propriété `ctx.font` (même format que la propriété CSS `font`).

Dessiner le contenu:

``` js
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '36px arial';
ctx.strokeText('Canvas text', 50, 50);
```

Dessiner du texte rempli:

``` js
ctx.fillStyle = 'red';
ctx.font = '48px georgia';
ctx.fillText('Canvas text', 50, 150);
```

### Image

Il est possible d'inclure une image externe dans un canvas. Pour ce faire, il faut récupérer un élémént HTMLImageElement, soit en sélectionnant une `<img>` présente dans la page, soit en chargeant avec le constructeur `Image()`.

### Version basique

``` js
var image = new Image();
image.src = 'firefox.png';
```

Une fois qu'elle est chargée, elle peut être ajoutée au canvas avec `drawImage()`. Cette méthode prend au minimum trois paramètres: la ressource image et les coordonnées (x,y) du coin supérieur gauche de l'image.

``` js
image.onload = function() {
  ctx.drawImage(image, 50, 50);
}
```

### Version complète

La version complète permet en plus de tronquer et redimensionner l'image. Elle prend 9 paramètres:
* Paramètre 1: la ressource image
* Paramètres 2 et 3: les coordonnées à partir d'où découper l'image, relativement au coin supérieur gauche de l'image d'origine. Tout ce qui est à gauche de X (paramètre 2) ou au-dessus de Y (paramètre 3) ne sera pas dessiné.
* Paramètres 4 et 5: la largeur et la hauteur de l'image que nous voulons découper, à partir du coin supérieur gauche de la découpe.
* Paramètres 6 et 7: les coordonnées de l'image sur le canvas, relativement au coin supérieur gauche de du canvas.
* Paramètres 8 et 9: la largeur et hauteur affichée de l'image. En spécifiant des dimensions différentes des paramètres 4 et 5, l'image est redimensionnée/déformée.

```  js
ctx.drawImage(
  image,
  20, 20,      // couper 20 pixels à gauche et 20 pixels en haut
  185, 175,    // dimensions de la découpe
  50, 50,      // position sur le canvas
  185, 175     // dimensions affichée (en l'occurence, identique à l'origine)
);
```

### Courbes quadratiques et courbes de Bézier

Il est possible de dessiner des courbes de Bézier en deux variantes, cubique et quadratique.

* Une courbe de Bézier quadratique a un point de départ, un point d'arrivée et seulement un point de contrôle.

  ``` js
  ctx.quadraticCurveTo(cp1x, cp1y, x, y)
  ```

  * Le point de départ est la position actuelle du stylo,
  * le point de contrôle est spécifié par les paramètres 1 et 2 (cp1x, cp1y),
  * le point d'arrivée est spécifié par les paramètre 3 et 4 (x, y)

* Une courbe de Bézier cubique a un point de départ, un point d'arrivée et deux points de contrôle.

  ``` js
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
  ```

  * Le point de départ est la position actuelle du stylo,
  * le premier point de contrôle est spécifié par les paramètres 1 et 2 (cp1x, cp1y),
  * le deuxième point de contrôle est spécifié par les paramètres 3 et 4 (cp2x, cp2y),
  * le point d'arrivée est spécifié par les paramètre 5 et 6 (x, y)

![](https://i.imgur.com/FSbHK7x.png)

---

## Path2D

Pour simplifier le code, l'objet Path2D, disponible dans les versions récentes des navigateurs, permet de garder en mémoire des instructions de dessin.

``` js
var shape = new Path2D();
shape.rect(10, 10, 50, 50);

ctx.stroke(shape);
```

Path2D permet également d'utiliser des trajets SVG sur le canvas.

``` js
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```

---

## Les méthodes du contexte

### fill(): remplir une forme

Remplit le chemin en cours avec le style définit par `ctx.fillStyle`.

* Quand on essaie de remplir un chemin qui n'est pas fermé, la navigateur ajoute une ligne droite entre le début et la fin du chemin et remplit la forme créée (`ctx.stroke()` n'en sera pas affecté).

  ``` js
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.lineTo(200,20);
  ctx.lineTo(120,120);

  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();
  ```

* Il est possible de spécifier l'algorithme à utiliser pour déterminer si un point est à l'intérieur ou à l'extérieur du chemin:
    * `"nonzero"`: la règle de remplissage extérieur/intérieur non nul - par défaut (à gauche).  
       Le nombre de croisements d’une ligne correspond au nombre total de fois où une ligne croise une partie du tracé allant de gauche à droite moins le nombre total de fois où une ligne croise une partie du tracé allant de droite à gauche.
       Si une ligne tracée dans une direction quelconque à partir du point possède un nombre de croisements égal à zéro, le point est à l'extérieur, sinon, il est à l'intérieur.

    * `"evenodd"`: la règle de remplissage pair/impair (à droite).  
      Si une ligne tracée depuis un point et dans une direction quelconque croise le tracé selon un nombre impair, le point est à l'intérieur, dans le cas contraire, le point est à l'extérieur.

  ![](https://i.imgur.com/39WdSRe.png)

  ``` js
  ctx.beginPath();
  ctx.moveTo(96.50,50.00);
  ctx.bezierCurveTo(96.50,62.84,0.22,99.82,50.74,47.17);
  ctx.bezierCurveTo(100.18,0.58,62.84,96.50,50.00,96.50);
  ctx.bezierCurveTo(24.32,96.50,3.50,75.68,3.50,50.00);
  ctx.bezierCurveTo(3.50,24.32,24.32,3.50,50.00,3.50);
  ctx.bezierCurveTo(75.68,3.50,96.50,24.32,96.50,50.00);
  ctx.closePath();

  ctx.fillStyle = "lightblue";
  ctx.lineWidth = 2;
  ctx.fill("nonzero");
  ctx.stroke();
  ```

### stroke(): tracer un chemin

Remplit le chemin en cours avec le style définit par `ctx.strokeStyle` et l'épaisseur de trait définit par `ctx.lineWidth`.

``` js
ctx.rect(75, 75, 100, 100);

ctx.lineWidth = 5;
ctx.strokeStyle = 'rgb(255, 0, 0)';
ctx.stroke();
```

### clip(): détourer le canvas

La méthode `clip()` ne permet pas de dessiner une forme à proprement parler mais de masquer tout ce qui est en dehors de la forme. Toutes les formes qui seront ajoutées au canvas après avoir définit un détourage seront limitées à cette forme. On utilise `clip()` à la place de `closePath()` pour fermer un chemin et en faire un détourage.

Le détourage fait partie de l'état du canvas (il est donc sauvegardé par `save()`).


[JsFiddle clip()](https://jsfiddle.net/amt01/fg7m8rw0/)

### createLinearGradient(), createRadialGradient(): créer un gradient

Il faut d'abord créer un gradient

* `createLinearGradient(x1, y1, x2, y2)`  
  permet de créer un dégradé linéaire entre un point de départ (x1,y1) et un point d'arrivée (x2,y2).

* `createRadialGradient(x1, y1, r1, x2, y2, r2)`  
  permet de créer un dégradé radial avec les cercles de début et de fin spécifiés. Le premier cercle est de centre (x1,y1) et de rayon r1, le deuxième cercle est de centre (x2,y2) et de rayon r2.

Ensuite, assigner des couleurs avec `gradient.addColorStop(position, color)`. Cela crée un nouvel arrêt de couleur dans le gradient. La position se situe entre 0 (le début du gradient) et 1 (la fin du gradient).

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

Gradient radial, exemple 2:

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

Il est possible d'utiliser une image pour tapisser la surface d'une forme avec `createPattern(image, repeat)`.

``` js
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';

img.onload = function() {
  var pattern   = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 400, 400);
};
```

### save(), restore(): sauvegarder les configurations

La méthode `save()` permet de sauvegarder l'état du canvas dans sa globalité. Sont sauvegardés:
* les transformations (translate, rotate, scale)
* les configurations (strokeStyle, fillStyle, lineWidth, lineCap, font, etc)

Le méthode `restore()` restore la sauvegarde la plus récente du canvas.

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

La fonction `rotate()` permet de faire pivoter le canvas. Elle prend un angle de rotation horaire, en radians, en paramètre. Utiliser des angles négatifs pour un sens anti-horaire.

``` js
ctx.rotate(45 * Math.PI / 180);
```

Le centre de la rotation est l'origine du canvas. Pour changer le centre, il faut déplacer l'origine du canvas.

### scale(): mettre à l'échelle le canvas

`scale(x,y)` permet d'augmenter ou diminuer les unités de la grille du canvas, avec x horizontalement et y verticalement. Les valeurs inférieures à 1.0 réduisent la taille (0.5 = moitié de la taille) et les valeurs supérieures à 1.0 augmentent la taille (2.0 = double de la taille), tandis que la valeur 1.0 laisse à la même taille.

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

### setTransform(): appliquer une transformation

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
C'est un raccourci pour `setTransform (1, 0, 0, 1, 0, 0)`.

---

## ImageData

L'objet ImageData permet de lire et écrire le canvas pour manipuler les pixels un par un.

Par exemple, pour récupérer la couleur du canvas à un endroit donné on peut faire:

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

Pour inverser les couleurs du canvas:

``` js
var imageData = ctx.getImageData(0, 0, width, height),
     data     = imageData.data;

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
     data     = imageData.data;

for (var i = 0; i < data.length; i += 4) {
  var moy = (data[i] + data[i + 1] + data[i + 2]) / 3;
  data[i]     = moy; // rouge
  data[i + 1] = moy; // vert
  data[i + 2] = moy; // bleu
}
ctx.putImageData(imageData, 0, 0);
```

## toDataURL(): enregistrer sous

La méthode `toDataURL()` prend un type MIME en paramètre et retourne un URI de données contenant une représentation de l'image dans le format spécifié (`image/png` si omis).
Pour une image jpeg, il est possible de préciser la qualité de l'image (entre 0 et 1) en deuxième paramètre.

Cette méthode est appelé sur le **canvas** et non le contexte. L'uri retournée peut être utilisée pour créer un élément image dans la page, ou ouvrir l'image dans un nouvel onglet.

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

Notons que lorsque qu'une forme est dessinée, il est impossible de la déplacer - ce n'est plus que des pixels sur une image bitmap. Pour modifier le canvas, il nécessaire d'effacer et de redessiner, soit en effaçant tout, soit en gardant du code pour effacer la zone minimale nécessaire.

Pour des scènes complexes, on peut empiler plusieurs canvas positionnés en absolu et utiliser les canvas comme des calques - un canvas pour le fond, un pour le menu, un pour le jeu à proprement parler...

[Animations avancées](https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Advanced_animations)

### window.cancelAnimationFrame(): annuler l'appel

La boucle s'arrête lorsque vous vous arrêtez d'appeler `window.requestAnimationFrame()` ou si vous appelez `window.cancelAnimationFrame()` avant que votre fonction de callback n'ait été exécutée. C'est une bonne pratique de le faire, pour s'assurer qu'aucune mise à jour n'attend d'être exécutée.

### clearRect(): effacer une zone du canvas

La méthode `ctx.clearRect()` permet d'effacer le canvas. Elle prend quatre paramètres:
* Paramètres 1 et 2: coordonnées x et y du coin supérieur gauche de la zone à effacer
* Paramètres 3 et 4: largeur et hauteur de la zone

Cette méthode va effacer la zone spécifiée (tout, y compris l'arrière-plan). Ou on peut utiliser `ctx.fillRect()`.

---

Pour aller plus loin: [31 days of Canvas tutorials](http://creativejs.com/2011/08/31-days-of-canvas-tutorials/)
