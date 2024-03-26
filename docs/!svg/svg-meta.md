---
title: Les éléments SVG meta
category: Web, HTML, SVG
---


## a

La balise `a` permet d'ajouter des liens à l'intérieur du SVG, de la même manière qu'en HTML.

En SVG 1.1, l'adresse cible est désignée par l'attribut `xlink:href`, attention en l'utilisant à bien définir le namespace xlink pour que le SVG soit valide en dehors d'une page HTML. En SVG 2, cet attribut devient obsolète et est remplacé par `href`, il n'y a pas de namespace dans ce cas.

``` html
<svg width="140" height="30"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <a
     xlink:href="https://developer.mozilla.org/en-US/docs/SVG"
     target="_blank">
    <rect height="30" width="120" y="0" x="0" rx="15"/>
    <text fill="white" text-anchor="middle" y="21" x="60">SVG on MDN</text>
  </a>
</svg>
```

<svg width="140" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="https://developer.mozilla.org/en-US/docs/SVG" target="_blank">
    <rect height="30" width="120" y="0" x="0" rx="15"/>
    <text fill="white" text-anchor="middle" y="21" x="60">SVG on MDN</text>
  </a>
</svg>

---

## title

La balise `title` permet d'ajouter une infobulle - du texte qui est affiché quand la souris passe sur l'élément parent.

``` html
<rect x="5" y="5" width="25" height="50" fill="white">
  <title>Hello World</title>
</rect>
```

<svg width="100" height="100" style="background: black">
    <rect x="5" y="5" width="25" height="50" fill="white">
      <title>Hello World</title>
    </rect>
</svg>

## desc

La balise `desc` permet d'ajouter une description à tout élément composant le SVG.  
Cela permet d'améliorer l'accessibilité de l'image.

``` html
<svg width="100" height="100">
  <g>
    <title>Company sales by region</title>
    <desc>
      This is a bar chart which shows 
      company sales by region.
    </desc>
    <!-- Bar chart defined as vector data -->
  </g>
</svg>
```

## metadata

La balise `metadata` permet d'ajouter des données structurées au SVG, qui peuvent être utilisée par une application.  
Le contenu de l'élément `metadata` provient d'un autre namespace XML, tel que RDF, FOAF, etc.

``` html
<svg width="100" height="100">
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:connect="http://www.w3.org/1999/08/29-svg-connections-in-RDF#">
      <rdf:Description about="#CableA">
        <connect:ends rdf:resource="#socket1"/>
        <connect:ends rdf:resource="#ComputerA"/>
      </rdf:Description>
      <rdf:Description about="#CableB">
        <connect:ends rdf:resource="#socket2"/>
        <connect:ends rdf:resource="#ComputerB"/>
      </rdf:Description>
      <rdf:Description about="#CableN">
        <connect:ends rdf:resource="#socket5"/>
        <connect:ends>Everything</connect:ends>
      </rdf:Description>
      <rdf:Description about="#Hub">
        <connect:ends rdf:resource="#socket1"/>
        <connect:ends rdf:resource="#socket2"/>
        <connect:ends rdf:resource="#socket3"/>
        <connect:ends rdf:resource="#socket4"/>
        <connect:ends rdf:resource="#socket5"/>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
  <title id="mainTitle">Network</title>
  <desc>An example of a computer network based on a hub</desc>
  <!-- Network schema -->
</svg>
```

---

## use

La balise `<use>` permet de dupliquer un élément (via un identificateur de fragment). Pour des raisons de sécurité, certains navigateurs peuvent appliquer la politique *same-origin*: ils n'autorisent que les pages ayant le même domaine et port que la page en cours. En temps général, on duplique les éléments de la page en cours.

Il n'est pas possible d'écraser ses attributs mais il est possible d'en ajouter.



``` html
<rect id="rect"
        width="10" height="10"
        stroke="red" stroke-width="2" />
<use href="#rect" x="15" y="15" />
<use href="#rect" x="30" y="30" />
<use href="#rect" x="45" y="45" stroke="blue" />
<use href="#rect" x="60" y="60" fill="red" />
```

<svg width="100" height="100" style="background: black">
<rect id="svg-rect"
        width="10" height="10"
        stroke="red" stroke-width="2" />
<use href="#svg-rect" x="15" y="15" />
<use href="#svg-rect" x="30" y="30" />
<use href="#svg-rect" x="45" y="45" stroke="blue" />
<use href="#svg-rect" x="60" y="60" fill="red" />
</svg>

---

## defs

SVG permet de définir des éléments pour une utilisation ultérieure. Bien qu'il soit possible de les spécifier en dehors, une bonne pratique est de placer ces éléments dans une section `<defs>` en haut du fichier SVG. Cela permet de rendre le code plus compréhensible. Les éléments placés dans `<defs>` sont déclarés mais ne sont pas affichés. Pour les afficher, il faut qu'un élément graphique les appelle.

---

## symbol

La balise `symbol` permet de définir un élément graphique qui n'est pas affiché directement, seule les instances crées, c'est à dire référencées par un élément tel que `use`, le sont. Tout ce qui sort du symbole est tronqué.

``` html
<defs>
  <symbol id="svg-circle">
    <circle r="10" transform="translate(12 12)"
            stroke="red" stroke-width="2" />
  </symbol>
</defs>
<use href="#svg-circle" x="15" y="15" />
<use href="#svg-circle" x="30" y="30" />
<use href="#svg-circle" x="45" y="45" stroke="blue" />
<use href="#svg-circle" x="60" y="60" fill="red" />
```

<svg width="100" height="100" style="background: black">
  <defs>
    <symbol id="svg-circle">
      <circle r="10" transform="translate(12 12)"
              stroke="red" stroke-width="2" />
    </symbol>
  </defs>
  <use href="#svg-circle" x="15" y="15" />
  <use href="#svg-circle" x="30" y="30" />
  <use href="#svg-circle" x="45" y="45" stroke="blue" />
  <use href="#svg-circle" x="60" y="60" fill="red" />
</svg>

---

## gradient

Il est possible de créer des gradients, qui pourront par la suite être utilisés comme remplissage ou contour d'une forme.

* Il existe deux types de gradients: linéaire et radial.  
  La balise `<linearGradient>` permet de créer un dégradé linéaire.  
  La balise `<radialGradient>`, un dégradé radial.  

* À l'intérieur d'un gradient, on place une liste d'éléments `<stop>`.  
  Un stop spécifie une couleur avec `stop-color` et une position avec `offset`.  
  On peut également rendre la couleur semi-transparente avec `stop-opacity`.

  Mis bout à bout, les stops créent un degradé de couleurs, avec des paliers.  
  Les positions doivent être incrémentées de 0% (ou 0) à 100% (ou 1).

* Une fois que le dégradé est déclaré, on peut l'utiliser comme `fill` ou `stroke` d'un élément graphique avec `url()` (même principe qu'en CSS).

### linearGradient

``` html
<defs>
  <linearGradient id="Gradient1">
    <stop offset="0%" stop-color="red" />
    <stop offset="50%" stop-color="black" stop-opacity="0" />
    <stop offset="100%" stop-color="blue" />
 </linearGradient>
</defs>
<rect x="5" y="5" width="70" height="70" fill="url(#Gradient1)" />
```

<svg width="100" height="100">
  <defs>
    <linearGradient id="Gradient1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue"/>
     </linearGradient>
  </defs>
  <rect x="5" y="5" width="70" height="70" fill="url(#Gradient1)" />
</svg>

* Par défaut, un dégradé linéaire est horizontal.
  Il peut être orienté autrement grâce aux attributs `x1`, `x2`, `y1`, et `y2`.  
  Ces attributs définissent la ligne le long de laquelle le dégradé est tracé.

* L'attribut `xlink:href` permet de copier les attributs et stops d'un dégradé sur un autre.  
  Dans l'exemple ci-dessous, Gradient2 copie Gradient1.  
  Le namespace `xlink` est ici directement inclut sur le noeud, mais il est généralement définit sur la balise `<svg>`.

``` html
<defs>
  <!-- ... Gradient1 ci-dessus -->
  <linearGradient id="Gradient2" x1="0" y1="0" x2="0" y2="1"
      xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Gradient1" />
</defs>
<rect x="5" y="5" width="100" height="100" fill="url(#Gradient2)" />
```

<svg width="100" height="100">
  <defs>
    <linearGradient id="Gradient2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue" />
     </linearGradient>
  </defs>
  <rect x="5" y="5" width="100" height="100" fill="url(#Gradient2)" />
</svg>

### radialGradient

``` html
<defs>
  <radialGradient id="RadialGradient1">
    <stop offset="0%" stop-color="red"/>
    <stop offset="100%" stop-color="blue"/>
  </radialGradient>
</defs>
<rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient1)" />
```

<svg width="100" height="100">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red"/>
      <stop offset="100%" stop-color="blue"/>
    </radialGradient>
  </defs>
  <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient1)" />
</svg>

Il est possible de définir différents arguments pour modifier l'apparence du dégradé radial.

- `r` définit le rayon du dégradé (1 par défaut)

  ``` html
  <radialGradient id="RadialGradient2" xlink:href="#RadialGradient1" r="2" />
  ```

  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <radialGradient id="RadialGradient2" xlink:href="#RadialGradient1" r="2" />
    </defs>
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient2)" />
  </svg>

- `cx` et `cy` le point central du dégradé (par défaut: au centre de l'élément sur lequel il est appliqué, c'est à dire 0.5)

  ``` html
  <radialGradient id="RadialGradient3" xlink:href="#RadialGradient1" cx="0.25" cy="0.25" />
  ```

  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <radialGradient id="RadialGradient3" xlink:href="#RadialGradient1" cx="0.25" cy="0.25" />
    </defs>
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient3)" />
  </svg>

- `fx` et `fy` le point focal du dégradé (par défaut: au centre du point central, c'est à dire 0.5)

  ``` html
  <radialGradient id="RadialGradient4" xlink:href="#RadialGradient1" fx="0.25" fx="0.25" />
  ```

  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <radialGradient id="RadialGradient4" xlink:href="#RadialGradient1" fx="0.25" fx="0.25" />
    </defs>
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient4)" />
  </svg>

- `spreadMethod` contrôle ce qu'il arrive quand le dégradé arrive à sa fin, mais que l'objet n'est pas encore remplit.
  - `pad` (valeur par défaut) rempli le reste de l'objet avec la dernière couleur
  - `repeat` répète le dégradé
  - `reflect` répète le dégradé dans un sens puis dans l'autre (100% à 0%, 0% à 100%, etc)

  ``` html
  <radialGradient id="RadialGradient5" xlink:href="#RadialGradient1" spreadMethod="pad" cx="1" />
  <radialGradient id="RadialGradient6" xlink:href="#RadialGradient1" spreadMethod="repeat" cx="1" />
  <radialGradient id="RadialGradient7" xlink:href="#RadialGradient1" spreadMethod="reflect" cx="1" />
  ```

  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <radialGradient id="RadialGradient5" xlink:href="#RadialGradient1" spreadMethod="pad" cx="1" />
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient5)" />
  </svg>
  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <radialGradient id="RadialGradient6" xlink:href="#RadialGradient1" spreadMethod="repeat" cx="1" />
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient6)" />
  </svg>
  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <radialGradient id="RadialGradient7" xlink:href="#RadialGradient1" spreadMethod="reflect" cx="1" />
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient7)" />
  </svg>

- `gradientUnits` permet de définir l'unité utilisée pour décrire la taille et l'orientation du dégradé.
  - `objectBoundingBox` (*par défaut*): la taille du dégradé est définie en pourcentage de la taille de l'objet sur lequel il est appliqué, c'est à dire entre 0 et 1 (ou 0% et 100%).
  - `userSpaceOnUse`: la taille du dégradé est définie avec des valeurs absolues.

  ``` html
  <radialGradient id="RadialGradient8"
            cx="60" cy="60" r="50"
            fx="35" fy="35"
            gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="red"/>
    <stop offset="100%" stop-color="blue"/>
  </radialGradient>
  ```

  <svg width="100" height="100" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <radialGradient id="RadialGradient8"
                cx="60" cy="60" r="50"
                fx="35" fy="35"
                gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
    </defs>
    <rect x="5" y="5" width="100" height="100" fill="url(#RadialGradient8)" />
  </svg>

---

## pattern

Il est également possible de créer des motifs, qui pourront par la suité être utilisés comme remplissage ou contour d'unforme.

* La balise `<pattern>` permet de créer un motif.
* À l'intérieur cette balise, on place une liste de formes SVG.
* Une fois que le motif est déclaré, on peut l'utiliser comme `fill` ou `stroke` d'un élément graphique avec `url()` (même principe qu'en CSS).

``` html
<defs>
  <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
    <rect x="0" y="0" width="50" height="50" fill="skyblue" stroke="black"/>
  </pattern>
</defs>
<rect width="100" height="100" fill="url(#Pattern)" stroke="black" />
```

<svg width="100" height="100" style="background: black">
  <defs>
    <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
      <rect x="0" y="0" width="50" height="50" fill="skyblue" stroke="black"/>
    </pattern>
  </defs>
  <rect width="100" height="100" fill="url(#Pattern)" stroke="black" />
</svg>

La partie pouvant apporter le plus de confusion avec les motifs est le système d'unité et la taille des éléments.

* Les attributs `width` et `height` sur le motif spécifient quelle sera la taille du motif.  
  Si la taille du motif est inférieure à celle de l'élément sur lequel il est appliqué, alors le motif est répété.

* Les attributs `x` et `y` permettent de décaler le point de départ du motif à l'intérieur du dessin.

* L'attribut `patternUnits` spécifie l'unité utilisée par le motif. Deux valeurs sont possibles:
  - `objectBoundingBox` (par défaut): on dimensionne le motif relativement à l'élément graphique sur lequel il est appliqué.  
    Si `width` vaut 1, le motif sera étiré sur toute la largeur de l'élément.  
    S'il vaut 0.25, il sera étiré sur 25% de l'élément et répété 4 fois pour remplir l'élément sur sa largeur.

  - `userSpaceOnUse`: on dimensionne le motif en valeurs absolue.  
    C'est généralement ce qu'on fait en CSS: les motifs ont une taille définie et se répètent indépendamment de la taille de l'objet sur lequel il est appliqué.

* L'attribut `patternContentUnits` spécifie l'unité utilisé par le contenu du motif. Là encore deux valeurs sont possibles:
  - `userSpaceOnUse` (par défaut), la taille des formes à l'intérieur est exprimée en valeur absolue.
  - `objectBoundingBox`, la taille des formes est exprimée relativement à la taille du motif.

<table>
  <tr>
    <th>pattern \ content</th>
    <th>object</th>
    <th>user</th>
  </tr>
  <tr>
    <th>user</th>
    <td><pre lang="html">&lt;pattern id="Pattern1"
  width=".25" height=".25"
  patternUnits="objectBoundingBox"
  patternContentUnits="userSpaceOnUse"&gt;

  &lt;rect width="50" height="50"
        fill="skyblue"
        stroke="black"
        stroke-width="1" /&gt;
&lt;/pattern&gt;</pre>
      <svg width="300" height="100" style="background: black">
        <defs>
          <pattern id="Pattern1" width=".25" height=".25" patternUnits="objectBoundingBox" patternContentUnits="userSpaceOnUse">
            <rect width="50" height="50"
                  fill="skyblue"
                  stroke="black" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="300" height="100" fill="url(#Pattern1)" stroke="black" />
      </svg>
    </td>
    <td><pre lang="html">&lt;pattern id="Pattern3"
  width="50" height="50"
  patternUnits="userSpaceOnUse"
  patternContentUnits="userSpaceOnUse"&gt;

  &lt;rect width="50" height="50"
        fill="skyblue"
        stroke="black"
        stroke-width="1" /&gt;
&lt;/pattern&gt;</pre>
      <svg width="300" height="100" style="background: black">
        <defs>
          <pattern id="Pattern3" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <rect width="50" height="50"
                  fill="skyblue"
                  stroke="black" stroke-width="1" />
            </pattern>
        </defs>
        <rect width="300" height="100" fill="url(#Pattern3)" stroke="black" />
      </svg>
    </td>
  </tr>
  <tr>
    <th>object</th>
    <td><pre lang="html">&lt;pattern id="Pattern2"
  width=".25" height=".25"
  patternUnits="objectBoundingBox"
  patternContentUnits="objectBoundingBox"&gt;

  &lt;rect width=".25" height=".25"
        fill="skyblue"
        stroke="black"
        strokewidth="0.01" /&gt;
&lt;/pattern&gt;</pre>
      <svg width="300" height="100" style="background: black">
        <defs>
          <pattern id="Pattern2" width=".25" height=".25" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox">
            <rect width=".25" height=".25"
                  fill="skyblue"
                  stroke="black" stroke-width="0.01" />
          </pattern>
        </defs>
        <rect width="300" height="100" fill="url(#Pattern2)" stroke="black" />
      </svg>
    </td>
    <td><pre lang="html">&lt;pattern id="Pattern4"
  width="50" height="50"
  patternUnits="userSpaceOnUse"
  patternContentUnits="objectBoundingBox"&gt;

  &lt;rect width=".25" height=".25"
        fill="skyblue"
        stroke="black"
        strokewidth="0.01" /&gt;
&lt;/pattern&gt;</pre>
      <svg width="300" height="100" style="background: black">
        <defs>
          <pattern id="Pattern4" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="objectBoundingBox">
            <rect width=".25" height=".25"
                  fill="skyblue"
                  stroke="black" stroke-width="0.01" />
          </pattern>
        </defs>
        <rect width="300" height="100" fill="url(#Pattern4)" stroke="black" />
      </svg>
    </td>
  </tr>
</table>

---

## clipPath

La balise `clipPath` permet de créer un détourage qui pourra être utilisé pour tronquer les bords d'un élément.

* À l'intérieur de la balise, est placé une liste d'éléments SVG qui formeront la forme du détourage.
* Une fois le détourage déclaré, il faut pour l'utiliser le référencer avec l'attribut `clip-path` d'un élément graphique — avec `url()` (même principe qu'en CSS).

``` html
<defs>
  <clipPath id="myClip">
    <circle cx="50" cy="50" r="30" />
  </clipPath>
</defs>
<polygon fill="yellow" points="50,0 21,90 98,35 2,35 79,90" clip-path="url(#myClip)"/>
```

<svg width="100" height="100" style="background: black">
  <defs>
    <clipPath id="myClip">
      <circle cx="50" cy="50" r="30" />
    </clipPath>
  </defs>
  <polygon fill="yellow" points="50,0 21,90 98,35 2,35 79,90" clip-path="url(#myClip)"/>
</svg>

L'attribut `clipPathUnits` spécifie l'unité utilisé par le contenu du détourage. Deux valeurs sont possibles:
- `userSpaceOnUse` (par défaut), la taille des formes à l'intérieur est exprimée en valeur absolue.
- `objectBoundingBox`, la taille des formes est exprimée relativement à la taille de l'objet sur lequel le détourage est appliqué.

``` html
<clipPath id="myClip" clipPathUnits="objectBoundingBox">
  <circle cx=".5" cy=".5" r=".35" />
</clipPath>
```

Il est également possbile de créer un détourage à la volée avec `clip-path` en utilisant une [fonction de forme](https://developer.mozilla.org/fr/docs/Web/CSS/basic-shape) comme `circle()`.

``` html
<polygon fill="yellow" points="50,0 21,90 98,35 2,35 79,90" clip-path="circle(35%)"/>
```

<svg width="100" height="100" style="background: black">
  <polygon fill="yellow" points="50,0 21,90 98,35 2,35 79,90" clip-path="circle(35%)"/>
</svg>

---

## mask

La balise `<mask>` permet de créer un masque.
À l'intérieur de ce masque vont être placées des formes qui permettrons d'indiquer les zones de l'élément qui sont visibles et celles qui ne le sont pas: tous les pixels blancs sont visibles, tous les pixels noirs ou ayant une opacité de 0 sont invisibles.

Là on le masque se différencie du détourage, c'est qu'il est possible de travailler avec des niveaux de gris ou des niveaux d'opacité et donc de rendre des zones semi-transparentes. On peut par exemple créer un effet de fondu en utilisant un dégradé, là où un détourage a une politique du tout-ou-rien.

* À l'intérieur de la balise, est placé une liste d'éléments SVG qui formeront le masque.
* Une fois le masque déclaré, il faut pour l'utiliser le référencer avec l'attribut `mask` d'un élément graphique — avec `url()` (même principe qu'en CSS).

``` html
<!-- définition du masque -->
<defs>
  <radialGradient id="myGradient">
    <stop offset=".5" stop-color="white" stop-opacity="1" />
    <stop offset="1"  stop-color="white" stop-opacity="0" />
  </radialGradient>
  <mask id="myMask">
    <rect fill="url(#myGradient)" width="50" height="50" />
  </mask>
</defs>

<!-- rectangle rouge en arrière-plan -->
<rect x="25" y="25" width="50" height="50" fill="red" />

<!-- rectangle bleu avec masque -->
<rect width="50" height="50" fill="blue" mask="url(#myMask)" />
```

<svg width="100" height="100">
  <defs>
    <radialGradient id="myGradient">
      <stop offset=".5" stop-color="white" stop-opacity="1" />
      <stop offset="1"  stop-color="white" stop-opacity="0" />
    </radialGradient>
    <mask id="myMask">
      <rect fill="url(#myGradient)" width="50" height="50" />
    </mask>
  </defs>
  <rect x="25" y="25" width="50" height="50" fill="red" />
  <rect width="50" height="50" fill="blue" mask="url(#myMask)" />
</svg>

---

## marker

La balise `marker` permet de créer des marqueurs, comme par exemple une pointe de flèche, qui pourra être assigné à des sommets de formes.

* À l'intérieur de la balise, est placé une liste d'éléments SVG qui formeront le marqueur.
* Une fois le masque déclaré, il faut pour l'utiliser le référencer avec l'attribut `marker-start`, `marker-mid` ou `marker-end` d'un élément graphique — avec `url()` (même principe qu'en CSS).

Les marqueurs peuvent être appliqués sur les éléments `path`, `line`, `polyline` et `polygon`.

``` html
<!-- Définit une pointe de flèche -->
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
      markerWidth="6" markerHeight="6"
      orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>
</defs>

<!-- Applique la pointe au début et à la fin de la polyline -->
<polyline points="10,10 10,90 90,90" fill="none" stroke="black"
          marker-start="url(#arrow)"
          marker-end="url(#arrow)"  />
```

<!-- Dessine les axes des coordonnées avec des pointes de flèche à chaque bout -->
<polyline points="10,10 10,90 90,90" fill="none" stroke="black"
marker-start="url(#arrow)" marker-end="url(#arrow)"  />

<svg width="100" height="100">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  </defs>
  <polyline points="10,10 10,90 90,90" fill="none" stroke="black"
            marker-start="url(#arrow)"
            marker-end="url(#arrow)"  />
</svg>

---

## filter

La balise `filter` permet de créer des filtres, qui pourront par exemple créer un effet de flou ou un effet d'éclairage.

* À l'intérieur de la balise, est placé une liste de *primitives*, des opérations basiques qui constituent le filtre: ajout de flou, de lumière, etc. Toutes les primitives de filtres sont des balises qui commencent par `fe` (pour *filter effect*).
* Une fois le filtre déclaré, il faut pour l'utiliser le référencer avec l'attribut `filter` d'un élément graphique — avec `url()` (même principe qu'en CSS).

``` html
<!-- Définition du filtre-->
<defs>
  <filter id="MyFilter" filterUnits="userSpaceOnUse" width="70" height="70">
    <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
    <feOffset in="blur" dx="6" dy="6" result="offsetBlur"/>
    <feBlend in="SourceGraphic" in2="offsetBlur" mode="normal" />
  </filter>
</defs>

<!-- Applique le filtre sur un rectangle -->
<rect width="50" height="50" stroke="black" stroke-width="3" fill="none" filter="url(#MyFilter)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="MyFilter" filterUnits="userSpaceOnUse" width="70" height="70">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
      <feOffset in="blur" dx="6" dy="6" result="offsetBlur"/>
      <feBlend in="SourceGraphic" in2="offsetBlur" mode="normal" />
    </filter>
  </defs>
  <rect width="50" height="50" stroke="black" stroke-width="3" fill="none" filter="url(#MyFilter)" />
</svg>

Une primitive de filtre prend en entrée un buffer spécifié par l'attribut `in`, applique une opération dessus, puis stocke le résultat dans un buffer temporaire dont le nom est spécifié par `result`. Les primitives qui suivent peuvent alors prendre ce buffer en entrée pour y appliquer d'autres opérations.

Il existe des valeurs spéciales de buffer:
* `SourceGraphic` est le dessin SVG sur lequel on appelle le filtre.
* `SourceAlpha` est sa couche alpha, c'est à dire la transparence (utilisé quand on veut la forme mais pas la couleur)

Si l’attribut `in` n’est pas précisé, alors c’est le résultat de la primitive précédente qui est utilisé.  
Pour la première primitive, la valeur par défaut est `SourceGraphic`.  
Il existe 16 primitives, et certaines ont des primitives enfant.

### feFlood

La primitive `feFlood` remplit une région d'une couleur.  
La couleur et l'opacité sont spécifiées par `flood-color` et `flood-opacity`.

``` html
<defs>
  <filter id="fill">
    <feFlood flood-color="blue" flood-opacity="0.5" />
  </filter>
</defs>
<circle cx="25" cy="25" r="25" filter="url(#fill)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="fill">
      <feFlood flood-color="blue" flood-opacity="0.5" />
    </filter>
  </defs>
  <circle cx="50" cy="50" r="50" filter="url(#fill)" />
</svg>

### feImage

La primitive `feImage` importe une image, sur le même principe que la balise `image`, et accepte les mêmes arguments que cette dernière.

``` html
<defs>
  <filter id="image">
    <feImage xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
  </filter>
</defs>
<rect width="100" height="100" filter="url(#image)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="image">
      <feImage xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
    </filter>
  </defs>
  <rect width="100" height="100" filter="url(#image)" />
</svg>

Par défaut, l'unité des filtres est celle du SVG. Pour utiliser les unités relatives à l'objet sur lequel le filtre est appliqué, définir `primitiveUnits="objectBoundingBox"` sur le filtre.

``` html
<defs>
  <filter id="image2">
    <feImage x="0" y="0"
             width="100%" height="100%"
             xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
  </filter>
  <filter id="image3" primitiveUnits="objectBoundingBox">
    <feImage x="0" y="0"
             width="100%" height="100%"
             xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
  </filter>
</defs>
```

<svg width="100" height="100" style="background: #eee">
  <defs>
    <filter id="image2">
      <feImage x="0" y="0" width="100%" height="100%" xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
    </filter>
  </defs>
  <rect width="50" height="50" filter="url(#image2)" />
</svg>

<svg width="100" height="100" style="background: #eee">
  <defs>
    <filter id="image3" primitiveUnits="objectBoundingBox">
      <feImage x="0" y="0" width="100%" height="100%" xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"/>
    </filter>
  </defs>
  <rect width="50" height="50" filter="url(#image3)" />
</svg>

### feTile

La primitive `feTile` répéte horizontalement et verticalement l'image qu'elle a en entrée.

``` html
<defs>
  <filter id="pattern">
    <feImage
      xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png"
      width="30" height="30"/>
    <feTile/>
  </filter>
</defs>
<rect width="100" height="100" filter="url(#pattern)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="pattern2">
      <feImage xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png" width="30" height="30"/>
      <feTile/>
    </filter>
  </defs>
  <rect width="100" height="100" filter="url(#pattern2)" />
</svg>

### feOffset

La primitive `feOffset` décale horizontalement et verticalement l'image en entrée. C'est particulièrement utile pour créer des ombres portées par exemple.


``` html
<defs>
  <filter id="shadow">
    <feOffset dx="10" dy="10"/>
  </filter>
</defs>
<rect width="80" height="80" filter="url(#shadow)" />
<rect width="80" height="80" fill="red" />
```

<svg width="100" height="100">
  <defs>
    <filter id="shadow">
      <feOffset dx="10" dy="10"/>
    </filter>
  </defs>
  <rect width="80" height="80" filter="url(#shadow)" />
  <rect width="80" height="80" fill="red" />
</svg>

### feMerge

La primitive `feMerge` empile le résultat de différents filtres les uns par-dessus les autres.  
La liste des filtres est définit par une liste d'élément `feMergeNode` à l'intérieur de la balise.

``` html
<defs>
  <filter id="shadow">
    <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
    <feMerge>
      <feMergeNode in="shadow"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<rect width="80" height="80" fill="red" filter="url(#shadow)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="shadow2">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="80" height="80" fill="red" filter="url(#shadow2)" />
</svg>

### feDropShadow

La primitive `feDropShadow` est un raccourci permettant de créer une ombre portée très rapidement.

``` html
<defs>
  <filter id="shadow3">
    <feDropShadow dx="4" dy="4" stdDeviation="4"/>
  </filter>
</defs>
<circle cx="40" cy="40" r="40" fill="blue" filter="url(#shadow)" />
```

<svg width="100" height="100">
  <defs>
    <filter id="shadow3">
      <feDropShadow dx="4" dy="4" stdDeviation="4"/>
    </filter>
  </defs>
  <circle cx="40" cy="40" r="40" fill="blue" filter="url(#shadow3)" />
</svg>

Cette primitive est la combinaison des filtres suivants:

``` html
<feGaussianBlur in="alpha-channel-of-feDropShadow-in"
    stdDeviation="stdDeviation-of-feDropShadow"/>
<feOffset dx="dx-of-feDropShadow" dy="dy-of-feDropShadow"
    result="offsetblur"/>
<feFlood flood-color="flood-color-of-feDropShadow"
    flood-opacity="flood-opacity-of-feDropShadow"/>
<feComposite in2="offsetblur" operator="in"/>
<feMerge>
  <feMergeNode/>
  <feMergeNode in="in-of-feDropShadow"/>
</feMerge>
```

### feBlend

La primitive `feBlend` permet de mélanger deux buffers en utilisant un `mode` donné.  
Les différentes valeurs possibles sont
* `normal`, qui revient à faire feMerge
* `multiply`, multiplie les couleurs de chaque pixel entre les deux buffers, en prenant en compte l'opacité.
* `screen`, somme les couleurs de chaque pixel et soustrait leur produit. L'opacité n'est pas prise en compte.
* `darken`, garde le pixel le plus sombre entre les deux buffers
*  `ligten`, garde le pixel le plus clair entre les deux buffers.

<svg width="520" height="100">
  <defs>
    <image id="mdn-color" width="100" height="100" xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png" />
    <filter id="blend">
      <feFlood flood-color="green" result="blendLayer" />
      <feBlend in="SourceGraphic" in2="blendLayer" mode="normal" />
    </filter>
    <filter id="blendMultiply">
      <feFlood flood-color="green" result="blendLayer" />
      <feBlend in="SourceGraphic" in2="blendLayer" mode="multiply" />
    </filter>
    <filter id="blendScreen">
      <feFlood flood-color="green" result="blendLayer" />
      <feBlend in="SourceGraphic" in2="blendLayer" mode="screen" />
    </filter>
    <filter id="blendDarken">
      <feFlood flood-color="green" result="blendLayer" />
      <feBlend in="SourceGraphic" in2="blendLayer" mode="darken" />
    </filter>
    <filter id="blendLighten">
      <feFlood flood-color="green" result="blendLayer" />
      <feBlend in="SourceGraphic" in2="blendLayer" mode="lighten" />
    </filter>
  </defs>
  <use href="#mdn-color" filter="url(#blend)" />
  <use href="#mdn-color" transform="translate(105 0)" filter="url(#blendMultiply)" />
  <use href="#mdn-color" transform="translate(210 0)" filter="url(#blendScreen)" />
  <use href="#mdn-color" transform="translate(315 0)" filter="url(#blendDarken)" />
  <use href="#mdn-color" transform="translate(420 0)" filter="url(#blendLighten)" />
</svg>

### feComposite

La primitive `feComposite` effectue une combinaison de deux buffers en utilisant une opération de composition. Cela permet de mélanger deux buffers mais en offrant plus de contrôle que `feBlend`. On peut ainsi créer des différences, unions et intersections par exemple.

L'opération à utiliser est spécifiée par l'attribut `operator`.  
Il peut prendre pour valeur
* `over`, qui dessine la première image sur la deuxième
* `in`, qui dessine la partie de la première image qui se trouve dans la seconde image
* `out`, qui dessine la partie de la première image qui n'est pas dans la seconde image
* `atop`, qui dessine la partie de la première image qui se trouve dans la seconde image, ainsi qui la seconde image
* `xor`, qui dessine la partie de la première image qui n'est pas dans la seconde et la partie de la seconde image qui n'est pas dans la première
* et `arithmetic`, qui permet de mélanger les deux images en utilisant la formule arithmétique `result = k1*i1*i2 + k2*i1 + k3*i2 + k4` où `i1` est le pixel de la première image, `i2` le pixel de la deuxième image et `k{1,2,3,4}` sont des valeurs entre 0 et 1 définies par des attributs.  
  Autrement dit, `k1` permet de définir le pourcentage à garder des deux images, `k2` de la première image, `k3` de la deuxième image et `k4` ajoute un biais.

``` html
<feComposite in="SourceGraphic" in2="shadow" operator="over" />
<feComposite in="SourceGraphic" in2="shadow" operator="in" />
<feComposite in="SourceGraphic" in2="shadow" operator="out" />
<feComposite in="SourceGraphic" in2="shadow" operator="atop" />
<feComposite in="SourceGraphic" in2="shadow" operator="xor" />
<feComposite in="SourceGraphic" in2="shadow" operator="arithmetic" k1="0.5" k2="0.3" k3="0.2" k4="0" />
```

<svg width="600" height="100">
  <defs>
    <filter id="compositeOver">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="over" />
    </filter>
    <filter id="compositeIn">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="in" />
    </filter>
    <filter id="compositeOut">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="out" />
    </filter>
    <filter id="compositeAtop">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="atop" />
    </filter>
    <filter id="compositeXor">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="xor" />
    </filter>
    <filter id="compositeArithmetic">
      <feOffset in="SourceAlpha" dx="10" dy="10" result="shadow"/>
      <feComposite in="SourceGraphic" in2="shadow" operator="arithmetic" k1="0.5" k2="0.3" k3="0.2" k4="0" />
    </filter>
  </defs>
  <rect width="80" height="80" fill="red" filter="url(#compositeOver)" />
  <rect width="80" height="80" x="90" fill="red" filter="url(#compositeIn)" />
  <rect width="80" height="80" x="180" fill="red" filter="url(#compositeOut)" />
  <rect width="80" height="80" x="270" fill="red" filter="url(#compositeAtop)" />
  <rect width="80" height="80" x="360" fill="red" filter="url(#compositeXor)" />
  <rect width="80" height="80" x="450" fill="red" filter="url(#compositeArithmetic)" />
</svg>

### feGaussianBlur

La primitive `feGaussianBlur` crée un effet de flou. On peut contrôler la quantité de flou grâce à l'attribut `stdDeviation` (standard deviation), qui prend en entrée une ou deux valeurs pour le flou horizontal et le flou vertical.

``` html
<defs>
  <filter id="blur"><feGaussianBlur stdDeviation="3" /></filter>
  <filter id="blur2"><feGaussianBlur stdDeviation="0 3" /></filter>
  <filter id="blur3"><feGaussianBlur stdDeviation="3 0" /></filter>
</defs>
<rect x="10"  y="10" width="80" height="80" fill="red" filter="url(#blur)" />
<rect x="110" y="10" width="80" height="80" fill="red" filter="url(#blur2)" />
<rect x="210" y="10" width="80" height="80" fill="red" filter="url(#blur3)" />
```

<svg width="300" height="100">
  <defs>
    <filter id="blur">
      <feGaussianBlur stdDeviation="3" />
    </filter>
    <filter id="blur2">
      <feGaussianBlur stdDeviation="0 3" />
    </filter>
    <filter id="blur3">
      <feGaussianBlur stdDeviation="3 0" />
    </filter>
  </defs>
  <rect x="10"  y="10" width="80" height="80" fill="red" filter="url(#blur)" />
  <rect x="110" y="10" width="80" height="80" fill="red" filter="url(#blur2)" />
  <rect x="210" y="10" width="80" height="80" fill="red" filter="url(#blur3)" />
</svg>

### feMorphology

La primitive `feMorphology` dilate ou contracte sa source. L'opération à effectuer est spécifiée par l'attribut `operator`, qui peut prendre pour valeur `dilate` ou `erode`. La quantité à appliquer est spécifiée par l'attribut `radius`, qui peut prendre en entrée une ou deux valeurs pour l'axe des x et l'axe des y.

``` html
<defs>
  <filter id="dilate"><feMorphology operator="dilate" radius="1" /></filter>
  <filter id="erode"><feMorphology operator="erode" radius="1" /></filter>
  <filter id="3Dify">
    <feMorphology in="SourceAlpha" operator="dilate" radius="3 5" result="expanded" />
    <feOffset in="expanded" dx="0" dy="3" result="expanded" />
    <feMerge>
      <feMergeNode in="expanded" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
<text y="30" filter="url(#dilate)">Hello World</text>
<text y="80" filter="url(#erode)">Hello World</text>
<text y="130" fill="white" filter="url(#3Dify)">Hello World</text>
```

<svg width="200" height="150">
  <defs>
    <filter id="dilate">
      <feMorphology operator="dilate" radius="1" />
    </filter>
    <filter id="erode">
      <feMorphology operator="erode" radius="1" />
    </filter>
    <filter id="3Dify">
      <feMorphology in="SourceAlpha" operator="dilate" radius="3 5" result="expanded" />
      <feOffset in="expanded" dx="0" dy="3" result="expanded" />
      <feMerge>
        <feMergeNode in="expanded" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <g font-size="36">
    <text y="30" filter="url(#dilate)">Hello World</text>
    <text y="80" filter="url(#erode)">Hello World</text>
    <text y="130" fill="white" filter="url(#3Dify)">Hello World</text>
  </g>
</svg>

### feConvolveMatrix

La primitive `feConvolveMatrix` ajoute des filtres de convolution. Pour chaque pixel de l’image de départ, la nouvelle valeur du pixel est calculée en fonction de sa valeur et de celles des pixels voisins. Pour une image dont les valeurs de pixel sont les suivantes:

    a b c
    d e f
    g h i

Et la matrice de convolution suivante:

    1 2 3
    4 5 6
    7 8 9

Le résultat pour le pixel "e" sera

     (a1 + 2b + 3c
    + 4d + 5e + 6f
    + 7g + 8h + 9i)
    / (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9)

Ainsi le filtre `1 1 1 ...` a pour effet d'effectuer la moyenne des points.

La matrice de convolution est définit grâce à l'attribut `kernelMatrix`.  
Par défaut, la matrice de convolution est de 3x3 mais il est possible de l'agrandir grâce à l'attribut `order`, qui peut prendre en entrée une ou deux valeurs pour l'axe des x et l'axe des y.

``` html
  <defs>
    <filter id="blur">        <feConvolveMatrix kernelMatrix="1 1 1  1 1 1  1 1 1"/></filter>
    <filter id="gaussianBlur"><feConvolveMatrix kernelMatrix="1  2 1  2 4 2  1 2 1"/></filter>
    <filter id="sharpen">     <feConvolveMatrix kernelMatrix="0 -1 0  -1 5 -1  0 -1 0"/></filter>
  </defs>
  <use href="#mdn-logo" />
  <use href="#mdn-logo" x="130" filter="url(#blur)" />
  <use href="#mdn-logo" x="260" filter="url(#gaussianBlur)" />
  <use href="#mdn-logo" x="390" filter="url(#sharpen)" />
```

<svg width="300" height="100" viewBox="0 0 520 146">
  <defs>
    <image id="mdn-logo" width="128" height="146" xlink:href="https://developer.mozilla.org/files/6457/mdn_logo_only_color.png" />

    <filter id="blur"><feConvolveMatrix kernelMatrix="1 1 1  1 1 1  1 1 1"/></filter>
    <filter id="gaussianBlur"><feConvolveMatrix kernelMatrix="1 2 1  2 4 2  1 2 1"/></filter>
    <filter id="sharpen"><feConvolveMatrix kernelMatrix="0 -1 0  -1 5 -1  0 -1 0"/></filter>
  </defs>
  <use href="#mdn-logo" />
  <use href="#mdn-logo" x="130" filter="url(#blur)" />
  <use href="#mdn-logo" x="260" filter="url(#gaussianBlur)" />
  <use href="#mdn-logo" x="390" filter="url(#sharpen)" />
</svg>

Autres attributs possibles: `divisor`, `bias`, `targetX`, `targetY`.

[Image Kernels](http://setosa.io/ev/image-kernels)

### feColorMatrix

La primitive `feColorMatrix` ajoute des transformations de couleur. Pour chaque pixel de l'image de départ, la nouvelle valeur du pixel est calculé en fonction de ses canaux rgba: rouge, vert, bleu et alpha (opacité).

    | R' |     | a00 a01 a02 a03 a04 |   | R |
    | G' |     | a10 a11 a12 a13 a14 |   | G |
    | B' |  =  | a20 a21 a22 a23 a24 | * | B |
    | A' |     | a30 a31 a32 a33 a34 |   | A |
    | 1  |     |  0   0   0   0   1  |   | 1 |

![](https://i.imgur.com/910McHBm.png)

![](https://i.imgur.com/wLbPUQym.png)

Pour ce faire, on définit une matrice de transformation grâce à l'attribut `values`.

``` html
<defs>
  <filter id="colorMatrix">
    <feColorMatrix values="0 0 0 0 0
                           1 1 1 1 0
                           0 0 0 0 0
                           0 0 0 1 0" />
  </filter>
</defs>
<use href="#colors" />
<use href="#colors" transform="translate(70 0)" filter="url(#colorMatrix)" />
```

<svg width="150" height="75">
  <defs>
    <g id="colors">
      <circle cx="30" cy="30" r="20" fill="blue" fill-opacity="0.5" />
      <circle cx="20" cy="50" r="20" fill="green" fill-opacity="0.5" />
      <circle cx="40" cy="50" r="20" fill="red" fill-opacity="0.5" />
    </g>
    <filter id="colorMatrix">
      <feColorMatrix values="0 0 0 0 0
                             1 1 1 1 0
                             0 0 0 0 0
                             0 0 0 1 0" />
    </filter>
  </defs>
  <use href="#colors" />
  <use href="#colors" transform="translate(70 0)" filter="url(#colorMatrix)" />
</svg>

Outre l'opération par défaut, qui permet d'appliquer une matrice de transformation, il existe d'autres opérations que l'on peut appliquer en définissant l'attribut `type`. Il s'agit des opérations de couleur couramment utilisées — c'est donc des raccourcis qui évitent d'avoir à définir une matrice entière. La valeur possibles sont `matrix`, `saturate`, `hueRotate` et `luminanceToAlpha`:

``` html
<defs>
  <filter id="colorSaturate"> <feColorMatrix type="saturate" values="0.2" /></filter>
  <filter id="colorHueRotate"><feColorMatrix type="hueRotate" values="180" /></filter>
  <filter id="colorLTA">      <feColorMatrix type="luminanceToAlpha" /></filter>
</defs>
<use href="#colors" filter="url(#colorSaturate)" />
<use href="#colors" transform="translate(70 0)" filter="url(#colorHueRotate)" />
<use href="#colors" transform="translate(140 0)" filter="url(#colorLTA)" />
```

<svg width="210" height="75">
  <defs>
    <filter id="colorSaturate"><feColorMatrix type="saturate" values="0.2" /></filter>
    <filter id="colorHueRotate"><feColorMatrix type="hueRotate" values="180" /></filter>
    <filter id="colorLTA"><feColorMatrix type="luminanceToAlpha" /></filter>
  </defs>
  <use href="#colors" filter="url(#colorSaturate)" />
  <use href="#colors" transform="translate(70 0)" filter="url(#colorHueRotate)" />
  <use href="#colors" transform="translate(140 0)" filter="url(#colorLTA)" />
</svg>

Plus d'infos sur les matrices [saturate, hueRotate et luminanceAlpha](http://www.yoyodesign.org/doc/w3c/svg1/filters.html#feColorMatrix)  
[Examples feColorMatrix](https://la-cascade.io/fecolormatrix-en-douceur/)

### feComponentTransfer

La primitive `feComponentTransfer` permet de jouer sur les composantes rouge, verte, bleue et alpha d'une image.  
Cela permet notamment de régler la luminosité, le contraste, la balance des couleurs ou encore appliquer un seuil de couleur.

Pour ce faire, on utilise les éléments `<feFuncR />`, `<feFuncG />`, `<feFuncB />` et `<feFuncA />` à l'intérieur de la balise. Chaque élément porte l'attribut `type` pour définir le type de transfert à effectuer:

* `identity`. Garde les valeurs de l'image d'origine.  
  Les fonctions de transfert non définies sont traitées comme si elles avaient été définies avec pour type `identity`.

  ``` html
  <feComponentTransfer>
    <feFuncR type="identity"></feFuncR>
    <feFuncG type="identity"></feFuncG>
    <feFuncB type="identity"></feFuncB>
    <feFuncA type="identity"></feFuncA>
  </feComponentTransfer>
  ```

  <svg width="70" height="70">
    <defs>
      <filter id="transfertIdentity">
        <feComponentTransfer>
          <feFuncR type="identity"></feFuncR>
          <feFuncG type="identity"></feFuncG>
          <feFuncB type="identity"></feFuncB>
          <feFuncA type="identity"></feFuncA>
        </feComponentTransfer>
      </filter>
    </defs>
    <use href="#colors" filter="url(#transfertIdentity)" />
  </svg>

* `linear`. Utilise l'équation linéaire suivante: <code>C' = slope * C + intercept</code>.    
  Sert à faire une balance des couleurs avec coefficients, par exemple pour rechauffer ou refroidir les couleurs.

  ``` html
  <feComponentTransfer>
    <feFuncR type="linear" slope="0.5" intercept="0"></feFuncR>
    <feFuncG type="linear" slope="0.5" intercept="0.25"></feFuncG>
    <feFuncB type="linear" slope="0.5" intercept="0.5"></feFuncB>
  </feComponentTransfer>
  ```

  <svg width="70" height="70">
    <defs>
      <filter id="transfertLinear">
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.5" intercept="0"></feFuncR>
          <feFuncG type="linear" slope="0.5" intercept="0.25"></feFuncG>
          <feFuncB type="linear" slope="0.5" intercept="0.5"></feFuncB>
        </feComponentTransfer>
      </filter>
    </defs>
    <use href="#colors" filter="url(#transfertLinear)" />
  </svg>

* `gamma`. Utilise l'équation exponentielle suivante: <code>C' = amplitude * pow(C, exponent) + offset</code>  
  Cela permet d'ajuster la saturation et la luminosité des canaux de manière non linéaire.   
  Un exposant supérieur à 1 va assombrir le canal tandis qu'un exposant inférieur à 1 va éclaircir le canal.

  ``` html
  <feComponentTransfer>
     <feFuncR type="gamma" amplitude="1" exponent="2.2" offset="0"/>
     <feFuncG type="gamma" amplitude="1" exponent="2.2" offset="0"/>
     <feFuncB type="gamma" amplitude="1" exponent="2" offset="0"/>
  </feComponentTransfer>
  ```

  <svg width="70" height="70">
    <defs>
      <filter id="transfertGamma">
        <feComponentTransfer>
           <feFuncR type="gamma" amplitude="1" exponent="2.2" offset="0"/>
           <feFuncG type="gamma" amplitude="1" exponent="2.2" offset="0"/>
           <feFuncB type="gamma" amplitude="1" exponent="2" offset="0"/>
        </feComponentTransfer>
      </filter>
    </defs>
    <use href="#colors" filter="url(#transfertGamma)" />
  </svg>

* `discrete`. Utilise la fonction en escalier fournie par `tableValues`.  
  <code>C' = v<sub>k</sub></code> où <code>k/N <= C < (k+1)/N</code>  
  Par exemple pour `tableValues="1 0 0.5"`, si la valeur du vert est
  * entre 0 et 0.333 (premier tiers), il prendra pour valeur 1
  * entre 0.333 et 0.666 (second triers), il prendra pour valeur 0
  * entre 0.666 et 1 (dernier tiers), il prendra pour valeur 0.5

  ``` html
  <feComponentTransfer>
    <feFuncR type="discrete" tableValues="0 0.7 0 1 1 0.3"/>
    <feFuncG type="discrete" tableValues="0 1 1 0"/>
    <feFuncB type="discrete" tableValues="0.2 0.7 0.5 0.3 0.2"/>
  </feComponentTransfer>
  ```

  <svg width="70" height="70">
    <defs>
      <filter id="transfertDiscrete">
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 0.7 0 1 1 0.3"/>
          <feFuncG type="discrete" tableValues="0 1 1 0"/>
          <feFuncB type="discrete" tableValues="0.2 0.7 0.5 0.3 0.2"/>
        </feComponentTransfer>
      </filter>
    </defs>
    <use href="#colors" filter="url(#transfertDiscrete)" />
  </svg>

* `table`. Utilise une interpolation linéaire de la table indexée (*lookup table*) fournie par `tableValues`.  
  <code>C' = v<sub>k</sub> + (C - k/N) * N * (v<sub>k+1</sub> - v<sub>k</sub>)</code> où <code>k/N <= C < (k+1)/N</code>  
  Par exemple pour `tableValues="0 0.3 0.9"`, la valeur du vert est
  * entre 0 et 0.5 (première moitié), les valeurs sont rétréciés sur l'intervalle de 0 à 0.3
  * entre 0.5 et 1 (seconde moitié), les valeurs sont étirées sur l'intervalle de 0.3 à 0.9

  ``` html
  <feComponentTransfer>
    <feFuncR type="table" tableValues="0 0 1 1"></feFuncR>
    <feFuncG type="table" tableValues="1 1 0 0"></feFuncG>
    <feFuncB type="table" tableValues="0 1 1 0"></feFuncB>
  </feComponentTransfer>
  ```

  <svg width="70" height="70">
    <defs>
      <filter id="transfertTable">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0 0 1 1"></feFuncR>
          <feFuncG type="table" tableValues="1 1 0 0"></feFuncG>
          <feFuncB type="table" tableValues="0 1 1 0"></feFuncB>
        </feComponentTransfer>
      </filter>
    </defs>
    <use href="#colors" filter="url(#transfertTable)" />
  </svg>

### feDiffuseLighting

La primitive `feDiffuseLighting` crée un effet d'éclairage diffus, le type d'éclairage que l'on obtient lorsqu'on éclaire un morceau de papier. L'attribut `lighting-color` permet de définir la couleur de la lumière (blanc par défaut).

À l'intérieur de cette balise, on place un élément
* `fePointLight` pour placer une source lumineuse émise d'un point lumineux comme une ampoule
* `feSpotLight` pour placer une source lumineuse émise d'un point lumineux comme un projecteur
* `feDistantLight` pour placer une source lumineuse diffuse comme le soleil

``` html
<!-- pointLight -->
<filter id="pointLight">
  <feDiffuseLighting result="light">
    <fePointLight x="50" y="60" z="20" />
  </feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>

<!-- spotLight -->
<filter id="spotLight">
  <feDiffuseLighting result="light">
    <feSpotLight x="50" y="60" z="40" 
            pointsAtX="40" 
            pointsAtY="40" 
            pointsAtZ="0"
            specularExponent="5"
            limitingConeAngle="20" />
  </feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>

<!-- distantLight -->
<filter id="distantLight">
  <feDiffuseLighting result="light">
    <feDistantLight azimuth="10" elevation="50" />
  </feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>
```

<svg width="310" height="100">
  <defs>
    <!-- pointLight -->
    <filter id="pointLight">
      <feDiffuseLighting result="light">
        <fePointLight x="50" y="60" z="20" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    </filter>
    <!-- spotLight -->
    <filter id="spotLight">
      <feDiffuseLighting result="light">
        <feSpotLight x="50" y="60" z="40" 
                pointsAtX="40" 
                pointsAtY="40" 
                pointsAtZ="0"
                specularExponent="5"
                limitingConeAngle="20" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    </filter>
    <!-- distantLight -->
    <filter id="distantLight">
      <feDiffuseLighting result="light">
        <feDistantLight azimuth="10" elevation="50" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#pointLight)" />
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#spotLight)" transform="translate(105 0)" />
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#distantLight)" transform="translate(210 0)" />
</svg>

### feSpecularLighting

La primitive `feSpecularLighting` crée un effet d'éclairage spéculaire, le type d'éclairage que l'on obtient lorsqu'on éclaire une surface réfléchissante — comme du métal ou un miroir. C'est plus brillant, plus net et plus direct que `feDiffuseLighting`.

``` html
<!-- pointLight -->
<filter id="spe_pointLight">
  <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
    <fePointLight x="50" y="60" z="20" />
  </feSpecularLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>

<!-- spotLight -->
<filter id="spe_spotLight">
  <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
    <feSpotLight x="50" y="60" z="40" 
            pointsAtX="40" 
            pointsAtY="40" 
            pointsAtZ="0"
            specularExponent="5"
            limitingConeAngle="20" />
  </feSpecularLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>

<!-- distantLight -->
<filter id="spe_distantLight">
  <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
    <feDistantLight azimuth="10" elevation="50" />
  </feSpecularLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>
```

<svg width="310" height="100">
  <defs>
    <!-- pointLight -->
    <filter id="spe_pointLight">
      <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
        <fePointLight x="50" y="60" z="20" />
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
    <!-- spotLight -->
    <filter id="spe_spotLight">
      <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
        <feSpotLight x="50" y="60" z="40" 
                pointsAtX="40" 
                pointsAtY="40" 
                pointsAtZ="0"
                specularExponent="5"
                limitingConeAngle="20" />
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
    <!-- distantLight -->
    <filter id="spe_distantLight">
      <feSpecularLighting surfaceScale="10" specularExponent="30" result="light">
        <feDistantLight azimuth="10" elevation="50" />
      </feSpecularLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#spe_pointLight)" />
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#spe_spotLight)" transform="translate(105 0)" />
  <circle cx="50" cy="50" r="50" fill="green" filter="url(#spe_distantLight)" transform="translate(210 0)" />
</svg>

### feTurbulence

La primitive `feTurbulence` génère du bruit.
Elle peut être combiné à d'autres primitives pour créer des textures artificielles comme des nuages, du sable, du marbre, etc.

* L'algorithme à utiliser est spécifié par l'attribut `type`. Deux valeurs sont possibles: `fractalNoise` et `turbulence`.
* L'attribut `baseFrequency` détermine la vitesse de variations des couleurs. Prend une ou deux valeurs pour les axes x et y.
* L'attribut `numOctaves` permet de régler la finesse des détails.
* L'attribut `seed` est la valeur d'initialisation du générateur de nombre aléatoire.

``` html
<filter id="noise">
  <feTurbulence type="turbulence" baseFrequency=".02" stitchTiles="stitch"/>
  <feDiffuseLighting surfaceScale="10" result="light">
    <feDistantLight azimuth="50" elevation="50" />
  </feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
</filter>

<filter id="noise2">
  <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="5"/>
  <feDiffuseLighting diffuseConstant="1" surfaceScale="2" result="light">
    <feDistantLight azimuth="45" elevation="35"/>
  </feDiffuseLighting>
</filter>

<filter id="noise3">
  <feTurbulence type="fractalNoise" baseFrequency=".05,.004" numOctaves="4" seed="0" result="texture" />
  <feComposite in="SourceGraphic" in2="texture" operator="in"/>
</filter>

<filter id="grain">
  <feTurbulence type="turbulence" numOctaves="2" baseFrequency="1.5"  result="turb"/>
  <feComposite in="turb" operator="arithmetic" k1="0" k2="0.5" k3="0.1" result="result1" />
  <feComposite operator="in" in="result1" in2="SourceGraphic" result="finalFilter"/>
  <feBlend mode="multiply" in="finalFilter" in2="SourceGraphic" />
</filter>
```

<svg width="200" height="100">
  <defs>
    <filter id="noise">
      <feTurbulence type="turbulence" baseFrequency=".02" stitchTiles="stitch"/>
      <feDiffuseLighting surfaceScale="10" result="light">
        <feDistantLight azimuth="50" elevation="50" />
      </feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
    </filter>
  </defs>
  <rect fill="AntiqueWhite" width="200" height="100" filter="url(#noise)" />
</svg>

<svg width="200" height="100">
  <defs>
    <filter id="noise2">
      <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="5"/>
      <feDiffuseLighting diffuseConstant="1" surfaceScale="2" result="light">
        <feDistantLight azimuth="45" elevation="35"/>
      </feDiffuseLighting>
    </filter>
  </defs>
  <rect fill="AntiqueWhite" width="200" height="100" filter="url(#noise2)" />
</svg>

<svg width="200" height="100">
  <defs>
    <filter id="noise3">
      <feTurbulence type="fractalNoise" baseFrequency=".05,.004" numOctaves="4" seed="0" result="texture" />
      <feComposite in="SourceGraphic" in2="texture" operator="in"/>
    </filter>
  </defs>
  <rect fill="black" width="200" height="100" filter="url(#noise3)" />
</svg>

<svg width="200" height="100">
  <defs>
    <filter id="grain">
      <feTurbulence type="turbulence" numOctaves="2" baseFrequency="1.5"  result="turb"/>
      <feComposite in="turb" operator="arithmetic" k1="0" k2="0.5" k3="0.1" result="result1" />
      <feComposite operator="in" in="result1" in2="SourceGraphic" result="finalFilter"/>
      <feBlend mode="multiply" in="finalFilter" in2="SourceGraphic" />
    </filter>
  </defs>
  <rect fill="wheat" width="200" height="100" filter="url(#grain)" />
</svg>

### feDisplacementMap

La primitive `feDisplacementMap` utilise les pixels d'une image pour déplacer les pixels d'une autre image.  
On l'utilise en combinaison avec `feTurbulence`.

``` html
<!-- map -->
<filter id="map" x="0%" width="150%" y="0%" height="200%">
  <feTurbulence baseFrequency=".04" numOctaves="1" result="turb" />
  <feDisplacementMap in="SourceGraphic" in2="turb" scale="100"
                     xChannelSelector="R" yChannelSelector="B" />
</filter>

<!-- map2 -->
<filter id="map2">
  <feTurbulence type="turbulence" baseFrequency=".01" numOctaves="2" result="turbulence" />
  <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="50"
                     xChannelSelector="R" yChannelSelector="G" result="circle" />
  <feDisplacementMap in="circle" in2="turbulence" scale="-50"
                     xChannelSelector="R" yChannelSelector="G" />
</filter>

<!-- map3 -->
<filter id="map3">
  <feTurbulence type="fractalNoise" baseFrequency=".5" result="out1" />
  <feDisplacementMap in="SourceGraphic" in2="out1" scale="10" />
</filter>
```

<svg width="100" height="100">
  <defs>
    <filter id="map" x="0%" width="150%" y="0%" height="200%">
      <feTurbulence baseFrequency=".04" numOctaves="1" result="turb" />
      <feDisplacementMap scale="100" in="SourceGraphic" in2="turb" xChannelSelector="R" yChannelSelector="B" />
    </filter>
  </defs>
  <rect width="100" height="100" fill="black" filter="url(#map)" />
</svg>

<svg width="100" height="100">
  <defs>
    <filter id="map2">
      <feTurbulence type="turbulence" baseFrequency=".01" numOctaves="2" result="turbulence" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="50" xChannelSelector="R" yChannelSelector="G" result="circle" />
      <feDisplacementMap in="circle" in2="turbulence" scale="-50" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
  <rect width="100" height="100" fill="black" filter="url(#map2)" />
</svg>

<svg width="100" height="100">
  <defs>
    <filter id="map3">
      <feTurbulence type="fractalNoise" baseFrequency=".5" result="out1" />
      <feDisplacementMap in="SourceGraphic" in2="out1" scale="10" />
    </filter>
  </defs>
  <circle cx="50" cy="50" r="50" fill="black" filter="url(#map3)" />
</svg>

---

## style

Différents attributs peuvent être ajoutés pour modifier la mise en forme: couleur du fond, de la bordure, épaisseur du trait, etc.  
Ces attributs peuvent être définis via des attributs ou par des règles CSS. Attention, les attributs propres aux formes, tels que `x` et `y`, ne peuvent eux pas être définit avec du CSS. [Liste complète des attributs de mise en forme](https://www.w3.org/TR/SVG/propidx.html). 

``` html
<rect x="10" y="10" width="50" height="50" fill="black" />
``` 

Le CSS peut être définit

* en ligne

  ``` html
  <rect x="10" y="10" width="50" height="50" style="fill: black" />
  ```

* dans une balise `<style>` placée dans la section `<defs>` du SVG

  ``` xml
  <?xml version="1.0" standalone="no"?>
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <style type="text/css"><![CDATA[
         #MyRect {
           stroke: black;
           fill: black;
         }
      ]]></style>
    </defs>
    <rect x="10" y="10" width="50" height="50" id="MyRect" />
  </svg>
  ```

* dans un fichier externe importé avec la syntaxe XML pour les stylesheets

  ``` xml
  <?xml version="1.0" standalone="no"?>
  <?xml-stylesheet type="text/css" href="style.css"?>

  <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect height="10" width="10" id="MyRect"/>
  </svg>
  ```

* ou encore en dehors du fichier SVG, dans la page HTML qui inclut le SVG

---

## script

De la même manière qu'en HTML, il est possible d'utiliser les attributs `on...` pour détecter les événements et déclencher des actions et la balise `script` pour définir des fonctions JavaSript.

``` html
<svg width="100" height="100" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <script type="text/javascript">
    // <![CDATA[
    function change(evt) {
      var target = evt.target;
      var radius = target.getAttribute("r");

      if (radius == 15) {
        radius = 45;
      } else {
        radius = 15;
      }

      target.setAttribute("r",radius);
   }
   // ]]>
  </script>

  <circle cx="50" cy="50" r="45" fill="green"
          onclick="change(evt)" />
</svg>
```

<svg width="100" height="100" viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <script type="text/javascript">
    // <![CDATA[
    function change(evt) {
      var target = evt.target;
      var radius = target.getAttribute("r");

      if (radius == 15) {
        radius = 45;
      } else {
        radius = 15;
      }

      target.setAttribute("r",radius);
   }
   // ]]>
  </script>
  <circle cx="50" cy="50" r="45" fill="green" onclick="change(evt)" />
</svg>