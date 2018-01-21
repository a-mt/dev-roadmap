---
title: Propriétés CSS
category: Web > CSS
---

## Raccourcis

Certaines propriétés s'utilisent en combinaison avec d'autres propriétés.

``` css
border-color: black;
border-width: 1px;
border-style: solid;
```

Lorsque c'est le cas, on peut généralement les définir via une propriété raccourcie (shorthand).  
Le plus souvent, les propriétés d'un raccourcis peuvent se définir dans n'importe quel ordre.

``` css
border: 1px solid black;
```

``` css
border: solid black 1px;
```

Les propriétés raccourcies qui gèrent les bords d'une boîte telles que `border-style`, `margin` ou `padding` peuvent prendre entre 1 et 4 valeurs. Leur ordre importe :

<table>
  <thead>
    <tr>
      <th>Nombre de valeurs</th>
      <th>Exemple</th>
      <th>Désigne…</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1 valeur</strong></td>
      <td><pre>padding: 5px</pre></td>
      <td>Tous les côtés</td>
    </tr>
    <tr>
      <td><strong>2 valeurs</strong></td>
      <td><pre>padding: 15px 10px</pre></td>
      <td>Les côtés haut/bas en premier et les côtés gauche/droite en deuxième</td>
    </tr>
    <tr>
      <td><strong>3 valeurs</strong></td>
      <td><pre>padding: 5px 10px 15px</pre></td>
      <td>Le côté haut en premier, les côtés gauche/droite en deuxième et le côté bas en troisième</td>
    </tr>
    <tr>
      <td><strong>4 valeurs</strong></td>
      <td><pre>padding: 5px 0 15px 10px</pre></td>
      <td>Les côtés dans le sens des aiguiles d’une montre: haut, droite, bas, gauche</td>
    </tr>
  </tbody>
</table>

---

## Valeurs globales

Les valeurs globales peuvent s'appliquer pour toutes les propriétés CSS : initial, inherit, unset, revert.

### initial

`initial` (CSS2) applique la *valeur initiale* d'une propriété à un élément. La valeur initiale d'une propriété CSS est définie par les spécifications W3C.

``` css
.exemple {
  color: red;
}

.exemple em {
  color: initial; /* couleur initiale de em (black) */
}
```

### inherit

`inherit` (CSS2) est une valeur qui peut être utilisée pour qu'une propriété prenne la valeur calculée de la propriété pour l'élément parent.

``` css
p {
  color: green;
}

p.exemple {
  color: inherit; /* parent's color (black) */
}
```

### unset

`unset` (CSS3) réinitialise la propriété afin que sa valeur soit la valeur héritée depuis l'élément parent ou soit la valeur initiale (s'il n'y a pas d'héritage).

Autrement dit, s'il y a de l'héritage, ce mot-clé se comporte comme `inherit`, sinon, il se comporte comme `initial`.

``` css
p {
  color: red;
}

#sidebar p {
  color: unset;
}
```

### revert

`revert` (CSS4) réinitialise la propriété avec la valeur par défaut définie par la feuille de style de l'agent utilisateur (ou par le style utilisateur s'il y en a un).

Ne pas confondre `revert` avec `initial`: les feuilles de style des agents utilisateurs définissent des valeurs par défaut selon les sélecteurs CSS et qui sont différentes de la valeur initiale définie par les spécifications CSS.

``` css
.widget {
  all: revert;
}
```

---

## Propriétés générales

### all

La propriété `all` permet de réinitialiser toutes les propriétés, à l'exception de unicode-bidi et direction, avec leurs valeurs initiales ou héritées.

``` plain
all: initial | inherit | unset | revert
(CSS3)
Réinitialise toutes les propriétés
```

### content

La propriété `content` est utilisée avec les pseudo-éléments ::before et ::after afin de générer le contenu d'un élément.

``` plain
content: <string> | <url> | counter() | attr()
(CSS2)
Définit le contenu du pseudo-élément ::before ou ::after
```

``` css
nav li:not(:first-child)::before {
  content: " / ";
  color: grey;
}
```

---

## Fonctions globales

Les fonctions globales peuvent être utilisée sur n'importe quelle propriété CSS.

### calc()

La fonction calc() permet de réaliser des calculs pour déterminer la valeur d'une propriété.
Elle peut être utilisée pour toute valeur &lt;length&gt;, &lt;frequency&gt;, &lt;angle&gt;, &lt;time&gt;, &lt;number&gt;, ou &lt;integer&gt;.

``` plain
calc(<value> <operateur> <value>)

où <value> = <number> | <dimension> | <percentage>
(CSS3)
Permet de calculer la valeur d'un attribut
```

| Opérateur | Opération      |
|---        |---             |
| +         | Addition       |
| -         | Soustraction   |
| *         | Multiplication |
| /         | Division       |

Toujours entourer les opérateurs d'espaces. Pour la multiplication et la division, la valeur à droite doit être de type &lt;number&gt;

``` css
{
  width: calc(100% - 80px);
}
```

### attr()

Uniquement sur la propriété content. Support expérimental sur les autres propriétés.

``` plain
attr(<attr-name> <unit>)

où <unit> = string | integer | color | url |
            integer | number | length | angle | time | frequency |
            em | ex | px | rem | vw | vh | vmin | vmax |
            mm | q | cm | in | pt | pc |
            deg | grad | rad | ms | s | Hz | kHz | %
(CSS2)
Permet de récupérer la valeur d'un attribut
```

``` css
{
  a:after {
  content: " (" attr(href) ")";
}
```

[Exemple attr()](https://jsfiddle.net/amt01/nd6uxt4e/)

---

## Box model

Tous les éléments HTML sont considérés comme des "boîtes" dont il est possible de définir la hauteur, la largeur, la bordure, les marges et le padding (marges à l'intérieur de la bordure).

Les éléments HTML ont un type par défaut: par exemple un `<span>` est un élément en ligne, tandis qu'un `<div>` est un bloc.  
Les éléments bloc sont affichés avec un retour à la ligne avant et après, les éléments en ligne non. Outre cette différence, certaines propriétés ne s'appliquent pas aux éléments en ligne ou que partiellement:
* `width` ne s'applique pas
* `height` ne s'applique pas (mais la hauteur d'un élément en ligne peut être définie par `line-height`)
* `padding`: seul le padding gauche et droit est appliqué
* `margin`: seules les marges gauches et droites sont appliquées

[Inline elements and padding](http://maxdesign.com.au/articles/inline/)

### display

La propriété `display` permet de modifier le type d'un élément.  
On peut afficher un `<span>` en bloc et un `<div>` en ligne par exemple.

[Comparaison block/inline/inline-block](https://jsfiddle.net/amt01/p58n6ht3/)

``` plain
display: none | inline | block | list-item |
         inline-list-item | inline-block | inline-table |
         table | table-cell | table-column | table-column-group |
         table-footer-group | table-header-group | table-row | table-row-group |
         flex | inline-flex | grid | inline-grid
(CSS 1,2,3)
Définit le mode d'affichage
```

<table>
  <thead>
    <tr>
      <th>Display</th>
      <th>Élément par défaut</th>
      <th>Version CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>none</td><td>-</td><td>1</td></tr>
    <tr><td>block</td><td>div</td><td>1</td></tr>
    <tr><td>inline</td><td>span</td><td>1</td></tr>
    <tr><td>list-item</td><td>li</td><td>1</td></tr>
    <tr><td>inline-block</td><td>input</td><td>2</td></tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr><td>inline-table</td><td>-</td><td>2</td></tr>
    <tr><td>table</td><td>table</td><td>2</td></tr>
    <tr><td>table-row</td><td>tr</td><td>2</td></tr>
    <tr><td>table-cell</td><td>td</td><td>2</td></tr>
    <tr><td>table-column</td><td>col</td><td>2</td></tr>
    <tr><td>table-caption</td><td>caption</td><td>2</td></tr>
    <tr><td>table-column-group</td><td>colgroup</td><td>2</td></tr>
    <tr><td>table-row-group</td><td>tbody</td><td>2</td></tr>
    <tr><td>table-header-group</td><td>thead</td><td>2</td></tr>
    <tr><td>table-footer-group</td><td>tfoot</td><td>2</td></tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr><td>flex</td><td>-</td><td>3</td></tr>
    <tr><td>inline-flex</td><td>-</td><td>3</td></tr>
    <tr><td>grid</td><td>-</td><td>3</td></tr>
    <tr><td>inline-grid</td><td>-</td><td>3</td></tr>
  </tbody>
</table>

``` css
{
  display: none;
}
```

Avec `display: none`, le bloc est complètement caché, comme s'il ne faisait pas partie de la page.  
Les éléments autour se comportent comme s'il n'existait pas.


### visibility

``` plain
visibility: hidden | visible | collapse
(CSS2)
Définit la visibilité
```

``` css
{
  visibility: hidden;
}
```

Avec `visibility: hidden`, le bloc est caché, comme s'il était complètement transparent.  
Les éléments autour se comportent comme s'il était encore là.

[Comparaison display:none et visibility:hidden](https://jsfiddle.net/amt01/uk9bt4fb/)

### border

Permet d'afficher un cadre autour d'un élément

``` plain
border: <border-width> <border-style> <border-color>
border-top: ...
(CSS1)
Raccourcis pour définir la bordure
```

``` plain
border-width: (medium | thin | thick | <length>){1,4}
border-top-width: ...
(CSS1)
Épaisseur de la bordure
```

``` plain
border-style: (dotted | dashed | solid | double | groove | ridge | inset | outset | none){1,4}
border-top-style: ...
(CSS1)
Style de bordure (trait, pointillés, etc)
```

``` plain
border-color: (<color>){1,4}
border-top-color: ...
(CSS1)
Couleur de bordure
```

``` css
{
  border-width: 10px;      /* Taille de la bordure */
  border-style: dotted;    /* La bordure est affichée en pointillés */
  border-color: red;       /* Couleur de la bordure */
}
```

``` css
{
  border: 10px dotted red; /* Version raccourcie */
}
```

Voir aussi [autres bordures](#autres-bordures) (border-image, border-radius, outline, box-shadow)

### margin

Définit l'espace autour d'un élément, entre la bordure et les autres éléments alentour.  
Chaque navigateur a des styles par défaut pour les éléments, une propriété non définie dans le CSS ne veut pas dire que l'élément a un padding / margin de 0.

``` plain
margin: (<length> | <percentage> | auto){1,4}
margin-top: ...
(CSS1)
Définit les marges
```

La propriété `auto` permet de centrer l'élément à l'intérieur de son parent

``` css
{
  margin: 10px auto;
}
```

### padding

Définit l'espace à l'intérieur d'un élément, entre la bordure et le texte.

``` plain
padding: (<length> | <percentage>){1,4}
padding-top: ...
(CSS1)
Définit les marges intérieures
```

``` css
{
  padding: 15px;
}
```

### width

Définit la largeur d'un bloc.

``` plain
width: <length> | <percentage> | auto
(CSS1)
Définit la largeur
```

``` plain
max-width: <length> | <percentage> | none
(CSS2)
Définit la largeur maximale
```

``` plain
min-width: <length> | <percentage> | none
(CSS2)
Définit la largeur minimale
```

``` css
{
  width: auto;
  max-width: 100px;        /* Largeur maximum du bloc */
  min-width: 50px;         /* Largeur minimum du bloc */
}
```

Avec `width: auto` l'élément s'adapte à la largeur de son parent (en respectant son padding).

[Comparaison auto/100%/100% + border-box](https://jsfiddle.net/amt01/u718ov4e/)

### height

Définit la hauteur d'un bloc.

``` plain
height: <length> | <percentage> | auto
(CSS1)
Définit la hauteur
```

``` plain
max-height: <length> | <percentage> | none
(CSS2)
Définit la hauteur maximale
```

``` plain
min-height: <length> | <percentage> | none
(CSS2)
Définit la hauteur minimale
```

``` css
{
  max-height: 30%;         /* Maximum 30% de son parent */
}
```

### box-sizing

Par défaut, les valeurs de `padding` et `border-width` ne sont pas pris en compte dans le calcul des dimensions.  
Si on définit `width: 500px` sur un bloc, la taille réelle du bloc sera de 500 + padding gauche et droite + bordure gauche et droite.  
Ce comportement peut être modifié avec la propriété `box-sizing`, qui indique au navigateur ce qu'il faut prendre en compte dans le calcul de la hauteur et de largeur du bloc.

``` plain
box-sizing: border-box | content-box
(CSS3)
Définit la manière de calculer les dimensions
```

``` css
{
  box-sizing: border-box   /* Prendre en compte le padding et border dans le calcul de la taille */
}
```

### overflow

Permet de controler ce qu'il ce passe lorsque le contenu d'un élément est plus grand que la taille de l'élément: cacher le contenu qui dépasse ou afficher une scrollbar.

``` plain
overflow: visible | hidden | scroll | auto
(CSS2)
Définit s'il faut afficher une scrollbar
```

``` plain
overflow-x: visible | hidden | scroll | auto
(CSS3)
Uniquement pour la scrollbar horizontale
```

``` plain
overflow-y: visible | hidden | scroll | auto
(CSS3)
Uniquement pour la scrollbar verticale
```

`overflow-wrap` est un alias de `word-wrap`.

``` css
{
  overflow: auto;          /* Afficher une scrollbar uniquement lorsque le contenu du bloc dépasse */
}
```

---

## Autres bordures

### outline

Ajoute une bordure à l'extérieur de l'élément, autour de la bordure définie par `border`.  
Contrairement à border, outline ne peut pas se définir indépendemment de chaque côté.  
La bordure d'`outline` empiète sur les éléments alentour si margin n'est pas changé en conséquence. [Exemple outline](https://jsfiddle.net/amt01/h8mmd2gd/)

``` plain
outline: <outline-color> <outline-style> <outline-width>
(CSS2)
Définit l'outline (bordure extérieure)
```

``` plain
outline-color: <color>
(CSS2)
Définit la couleur de l'outline
```

``` plain
outline-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
(CSS2)
Définit le style de l'outline (trait, pointillés, etc)
```

``` plain
outline-width: medium | thin | thick | length
(CSS2)
Définit l'épaisseur de l'outline
```

``` plain
outline-offset: <length>
(CSS3)
Définit l'espacement entre la bordure et l'outline
```

``` css
{
  border: 1px solid black; /* bordure */
  outline: 1px dashed red; /* outline autour de la bordure */
  outline-offset: 10px;    /* espace entre la bordure et l'outline */
}
```

### border-image

Permet d'utiliser une image pour bordure, pour utiliser un motif plutôt qu'une couleur.  
[Exemples border-image](https://jsfiddle.net/amt01/p939s582/)

``` plain
border-image: <source> <slice> <width> <outset> <repeat>
(CSS3)
Raccourcis pour utiliser une image en guise de bordure
```

``` plain
border-image-source: <image>
(CSS3)
Définit l'image à utiliser en bordure
```

``` plain
border-image-slice: (<number> | <percentage> | fill){1,4}
(CSS3)
Définit le découpage de l'image pour former les bordures
```

&lt;number&gt; indique une longueur en px (ne pas indiquer l'unité)

``` plain
border-image-width: (<length> | <number> | <percentage>){1,4}
(CSS3)
Définit la taille de l'image en bordure
```

``` plain
border-image-outset: (<length> | <number>){1,4}
(CSS3)
Définit s'il faut étirer l'image en dehors de la bordure
```

``` plain
border-image-repeat: (stretch | repeat | round | space){1,2}
(CSS3)
Définit s'il faut répéter le motif ou l'étirer
```

``` css
{
  border: 10px solid transparent;  /* taille de la bordure */
  border-image-source: url("http://i.imgur.com/eD1caMo.png"); /* image à utiliser */
  border-image-slice: 10;          /* le découpage de l'image en bordure */
}
```

### border-radius

Permet de donner des coins arrondis à un élément.

``` plain
border-radius: (<length>){1,4}
border-top-left-radius: ...
(CSS3)
Définit la taille des coins arrondis (0 = aucun)
```

``` css
{
  background: #00ced1;
  border-radius: 15px;     /* coins arrondis de 15px */
}
```

### box-shadow

Permet d'ajouter des ombres autour d'un élément.  
Accepte plusieurs ombres, séparées par des virgules.  
[Exemples box-shadow](https://jsfiddle.net/amt01/f27bmwL2/)

``` plain
box-shadow: <x-offset> <y-offset> <blur> <spread> <color>
(CSS3)
Ajoute une ombre autour de l'élément
```

``` css
{
  box-shadow: 0 5px 15px 0 grey; /* ajoute une ombre */
}
```

### box-decoration-break

Définit la façon dont les propriétés background, padding, border, border-image, box-shadow, margin et clip sont appliqués sur un élément lorsque la boîte de celui-ci est fragmentée, par exemple lorsqu'un élément en ligne s'étend sur plusieurs lignes ou qu'un bloc est séparé en colonnes.


``` plain
box-decoration-break: slice | clone
(CSS3)
Définit le comportement du mox model d'un élément fragmenté
```

[Exemple box-decoration-break](https://jsfiddle.net/amt01/39bupLon/)

---

## Bloc

### opacity

Permet de rendre un élément semi-transparent.  
[Exemples opacity](https://jsfiddle.net/amt01/25L3jmsj/)

``` plain
opacity: <real>
(CSS3)
Définit l'opacité d'un élément (0 = transparent, 1 = opaque)
```

``` css
{
  opacity: 0.5;
}
```

### background

Permet d'afficher une couleur et/ou une image en fond d'un élément, à l'intérieur des bordures.  
Depuis CSS3, plusieurs images peuvent être utilisées et de nouvelles propriétés ont été ajoutées.  
[Exemples background](https://jsfiddle.net/amt01/jpgykmuh/)

<ins>Propriétés CSS1</ins> :

``` plain
background: <color> <image> <repeat> <attachment> <position>
(CSS1)
Raccourcis permettant de définir le fond
```

``` plain
background-color: <color>
(CSS1)
Définit la couleur de fond
```

``` plain
background-image: <image>
(CSS1,3)
Définit l'image de fond
En CSS3, plusieurs images peuvent être définies, séparées par des virgules
```

``` plain
background-repeat: repeat | repeat-x | repeat-y | no-repeat
(CSS1)
Définit si l'image doit être répétée ou non
```

``` plain
background-attachment: scroll | fixed | local
(CSS1)
Définit si la position est fixée ou si elle défile dans le bloc
```

``` plain
background-position: <x> <y>
     x : left | right | center | <percentage> | <length>
     y : top | bottom | center | <percentage> | <length>
(CSS1)
Définit la position de l'image de fond
```

``` css
{
  background: url(chess.png) gray 50% repeat fixed;
}
```

<ins>Propriétés CSS3</ins> :

``` plain
background: <color> <image> <position> / <size> <repeat> <origin> <clip> <attachment>
(CSS3)
```

``` plain
background-size: auto | <length> | cover | contain
(CSS3)
Définit la taille de l'image de fond
```

``` plain
background-origin: padding-box | border-box | content-box
(CSS3)
Définit la zone de positionnement de l'image de fond (padding/bordure compris ou non)
```

[Exemples background-origin / background-clip](https://jsfiddle.net/amt01/3ag2gvrz/)

``` plain
background-clip: border-box | padding-box | content-box
(CSS3)
Définit la zone d'affichage de l'image de fond (padding/bordure compris ou non)
```

``` css
{
  background: url(chess.png) 40% / 10em gray round fixed border-box;
}
```

### cursor

Permet de changer le curseur affiché au survol d'un élément

``` plain
cursor: auto | cell | copy | crosshair | default | help | move |
        not-allowed | pointer | progress | text | wait | zoom-in
(CSS2)
Définit le curseur à afficher au survol de l'élément
Liste non exhaustive
```

``` css
{
  cursor: pointer;
}
```

[Liste complète des valeurs + demo](https://developer.mozilla.org/fr/docs/Web/CSS/cursor#Valeurs)

### caret

``` plain
caret-color: <color>
(CSS3)
Définit la couleur du curseur de saisie de texte
```

[Exemple caret-color](https://jsfiddle.net/amt01/3u43txtL/)

---

## Texte

### color

``` plain
color: <color>
(CSS1)
Définit la couleur du texte
```

``` css
{
  color: #333;
}
```

### text

``` plain
text-decoration: underline | overline | line-through
(CSS1)
Définit la décoration du texte (souligné, barre supérieure, barré)
```

``` plain
text-decoration-color: <color>
(CSS3)
Définit la couleur de la décoration
```

``` plain
text-decoration-style: solid |double | dotted | dashed | wavy
(CSS3)
Définit le style de la décoration (trait, pointillés, etc)
```

``` plain
text-transform: lowercase | uppercase | capitalize | none
(CSS1)
Définit la casse affichée (minuscule, majscule, première lettre en majuscule)
```

``` plain
text-indent: <length> | <percentage>
(CSS1)
Définit l'indentation de la première ligne d'un paragraphe
```

``` plain
text-align: center | left | right | justify | auto
(CSS1)
Définit l'alignement du texte
```

``` plain
text-align-last: center | left | right | justify | auto
(CSS3)
Définit l'alignement de la dernière ligne de texte d'un paragraphe
```

``` plain
text-justify: auto | inter-character | inter-word | none
(CSS3)
Définit le type de justification à appliquer au texte justifié
```

``` plain
text-shadow: <horizontal offset> <vertical offset> <blur radius> <color> | none
(CSS3)
Ajoute une ombre au texte (accepte une liste séparées par des virgules)
```

``` plain
text-overflow: clip | ellipsis
(CSS3)
Ajoute une ellipse (...) lorsque du texte est caché par overflow
```

``` plain
text-rendering: auto | optimizeSpeed | optimizeLegibility | geometricPrecision
(SVG)
Définit ce qui doit être optimisé lors de l'affichage du texte
Permet de faire des compromis entre la vitesse, la lisibilité (crénage, ligatures) et la précision géométrique.
```

``` css
{
  width: 500px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### text-emphasis

``` plain
text-emphasis-style: ([dot | circle| double-circle | triangle | sesame] [filled | open]) | <string>
(CSS3)
Définit le caractère à utiliser pour marquer l'emphase
```

``` plain
text-emphasis-color: <color>
(CSS3)
Définit la couleur du caractère d'emphase
```

``` plain
text-emphasis: <style> <color>
(CSS3)
Raccourcis permettant de définir le caractère d'emphase et sa couleur
```

``` plain
text-emphasis-position: [ over | under ] && [ right | left ]
(CSS3)
Définit la position du caractère d'emphase
```

``` css
{
  text-emphasis-style: circle open;
  text-emphasis-color: red;
  text-emphasis-position: under left;
}
```

[Exemple text-emphasis](https://jsfiddle.net/amt01/g0erc233/)

### word

``` plain
word-spacing: normal | <length>
(CSS3)
Définit l'espacement entre deux mots
```

``` plain
word-break: break-all | keep-all | normal
(CSS3)
Définit si les retours à la ligne sont autorisés au milieu d'un mot
```

``` plain
word-wrap: break-word | normal
(CSS3)
Définit si les retours à la ligne sont autorisés au milieu d'un mot
Conserve le retour à la ligne automatique à la fin du mot
```

[Différences entre word-break et word-wrap](https://jsfiddle.net/amt01/dtghap8t/)

### ...misc

``` plain
line-break: auto | loose | normal | strict
(CSS3)
Définit la façon dont les sauts de ligne sont gérés
Uniquement les textes en chinois, japonais ou coréen (CJK)
```

``` plain
hanging-punctuation: none | [ first || [ force-end | allow-end ] || last ]
(CSS3)
Définit si un signe de ponctuation se situant au début à la fin d'une ligne de texte doit rester sur cette ligne
```

``` plain
white-space: pre | pre-line | pre-wrap | normal
(CSS1)
Définit le comportement du texte lorsqu'il dépasse la largeur du bloc parent (retour à la ligne ou non)
```

``` plain
letter-spacing: normal | <length>
(CSS1)
Définit l'espacement entre deux lettres
```

``` plain
vertical-align: <length> | baseline | sub | super | text-top | text-bottom | middle | top | bottom
(CSS1)
Définit l'alignement vertical du texte par rapport à la hauteur de la ligne (line-height)
Ou de la hauteur de la cellule de tableau en cours (height)
```

``` plain
tab-size: <number>
(CSS3)
Définit le nombre d'espaces d'une tabulation
```

``` plain
hyphens: manual | auto
(CSS3)
Définit si des césures doivent être ajoutées ou non
- auto : ajouter des césures si nécessaire
- manual: uniquement lorsqu'il y a un &hyphen; ou &shy;
```

[Exemple hyphens](https://codepen.io/SitePoint/pen/iusvq)

``` plain
quotes: [<string> <string>]+
(CSS2)
Définit les marqueurs à utiliser pour les citations
Peut définir plusieurs niveaux de citation
```

[Exemple quotes](https://jsfiddle.net/amt01/76sv1osr/)

---

## Police d'écriture

### font

``` plain
font: (<font-style> || <font-variant> || <font-weight>)? <font-size>(/<line-height>)? <font-family>
(CSS1)
Raccourcis pour définir la police de texte
```

``` plain
font-style: normal | italic | oblique
(CSS1)
Définit le style de la police (normal, italique)
```

``` plain
font-variant: small-caps | normal
(CSS1)
Définit la variante de la police (petites lettres majuscules, minuscules)
```

``` plain
font-weight: normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
(CSS1)
Définit l'épaisseur de trait (gras, normal, léger)
```

``` plain
font-size: <absolute-size> | <relative-size> | <length> | <percentage>
(CSS1)
Définit la taille de la police
```

``` plain
line-height: normal | <number> | <length> | <percentage>
(CSS1)
Définit l'espacement entre les lignes de texte
```

``` plain
font-family: <family-name>
(CSS1)
Définit la police et les polices de fallbacks (séparées par des virgules)
```

Les polices utilisées en CSS doivent être installées sur la machine du client. Si la police demandée n'est pas installée, une police de fallback est utilisée (la prochaine dans la liste de polices). Si le client n'a aucune des polices demandées, la police par défaut du navigateur est utilisée.

``` css
body {
  font-family: sans-serif;
}
p {
  font: bold italic large Palatino, serif;
}
h1 {
  font-size: 1.2em;
}
```

### font extras

``` plain
font-kerning: auto | normal | none
(CSS3)
Définit s'il faut activer ou désactiver le kerning
Raccourcis pour font-feature-settings: "kern" 1;
```

[Exemple font-kerning](https://jsfiddle.net/amt01/u1qs0noy/)

``` plain
font-size-adjust: <number> | none
(CSS3)
Définit la taille de police telle que la taille des minuscules mesure X fois font-size
```

[Exemple font-adjust](https://jsfiddle.net/amt01/0u8rLt0n/)

``` plain
font-stretch: normal |
              ultra-condensed | extra-condensed | condensed | semi-condensed |
              semi-expanded | expanded | extra-expanded | ultra-expanded
(CSS3)
Définit s'il faut choisir la forme normale, condensée ou étendue d'une police
Si la police ne dispose pas de telles variations, font-stretch n'aura aucun effet visible
```

[Exemple font-stretch](https://jsfiddle.net/amt01/de1q7ksh/)

``` plain
font-synthesis: none | [ weight || style ]
(CSS3)
Définit si les variantes en gras et en italiques peuvent être synthétisées par le navigateur
lorsqu'elles sont absentes
```

``` plain
font-language-override: normal | <string>
(CSS3)
Définit le langage et permet de contrôler l'utilisation des glyphes spécifiques à une langue
String format: Language System Tag
```

[Exemple font-language-override](https://jsfiddle.net/amt01/ktp5fot7/)  
[Getting started with variable fonts](http://clagnut.com/blog/2389/)  
[Language System Tag](http://www.microsoft.com/typography/otspec/languagetags.htm)

### @font-face

Le navigateur peut télécharger automatiquement une police qui n'est pas installée si on lui indique où la trouver.  
Différents navigateurs supportent différents formats.

| Extension | Format               | Utilisé par                                    |
|---        |---                   |---                                             |
| .woff     | Web Open Font Format | Les navigateurs modernes                       |
| .eot      | Embedded Open Type   | Les anciennes versions d'IE                    |
| .svg      | SVG fonts            | Les anciennes versions d'iOS Safari (3.2-4.1)  |
| .ttf      | Truetype fonts       | Les anciennes versions du navigateur d'Android |

``` plain
src: local(<family-name>) | <url> format(<string>)
(CSS3)
Définit l'emplacement de la police
Différents emplacements peuvent être ajoutés, séparés par des virgules
```

``` plain
unicode-range: <unicode-range>
(CSS3)
Définit l'intervalle de caractères de cette police
```

Les autres fonctions également acceptées dans le block `@font-face` sont :
- `font-family`
- `font-variant`
- `font-variation-settings`
- `font-feature-settings`
- `font-stretch`
- `font-weight`
- `font-style`
- `font-feature-settings`

``` css
@font-face {
  font-family: 'MyWebFont';
  src: url('webfont.eot');                                    /* IE9 Compat Modes */
  src: local('MyWebFont'),
       url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'),                  /* Super Modern Browsers */
       url('webfont.woff') format('woff'),                    /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'),                /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg');          /* Legacy iOS */
}
```

Le navigateur parcours la liste de ressources disponibles dans l'ordre et utilise la première qui marche. Ainsi, la première instruction donnée est généralement de vérifier si la police est installée localement (`local()`).  
Une police peut ne pas définir tous les caractères, raison pour laquelle il est important de toujours utiliser des polices de fallback.

[Exemple avec une WebFont de Google (Roboto)](http://fonts.googleapis.com/css?family=Roboto)  
[Générateur de @font-face](https://www.fontsquirrel.com/tools/webfont-generator)  
[local('☺')](https://stackoverflow.com/questions/3698319/css-font-face-what-does-src-local-mean#22835957)

### font-feature-settings

Une police peut avoir des glyphes supplémentaires en plus des glyphes par défaut pour un caractère donné, par exemple des alternatives stylistiques ou des swash. On peut activer ces fonctionnalités avec `font-feature-settings`.

![](https://i.imgur.com/gPKbv0e.png)

``` plain
font-feature-settings: (<string> [on | off | 1 | 0])+
(CSS3)
Définit les fonctionnalités typographiques à activer ou désactiver
Séparées par des virgules
```

``` css
{
  font-feature-settings: "kern" 1, "frac" 1, /* kerning, fractions */
                         "subs" 1, "sups" 1, /* subscripts, superscripts */
                         "liga" 1, "dlig" 1, /* ligatures, discretionary ligatures */
                         "ss01"              /* stylistic set 01 */
}
```

* Trouver la liste des fonctionnalités d'une police
  * FontForge: Élements > Infos Fonte > Lookups  
  * [font-infos.herokuapp.com](http://font-infos.herokuapp.com/)
* [Trouver une police avec une fonctionnalité donnée](https://font-infos.herokuapp.com/list)
* [Support navigateur des fonctionnalités](https://github.com/quitequinn/Font-Feature-Support)

[OpenType features in CSS](https://www.typotheque.com/articles/opentype_features_in_css)  
[Syntaxe des fonctionnalités OpenType en CSS](https://helpx.adobe.com/fr/typekit/using/open-type-syntax.html)  
[List of typographic features](https://en.wikipedia.org/wiki/List_of_typographic_features)  
[Exemple ligature](https://jsfiddle.net/amt01/5yL0uxew/)

### @font-feature-values

On peut également créer un nom pour une fonctionnalité donnée avec `@font-feature-values`,
et l'appliquer à des sélecteurs donnés avec `font-variant-alternates`.
Cela permet de simplifier les feuilles de style lorsqu'on utilise plusieurs polices.

``` plain
@font-feature-values <family-name> {
  [(@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation) {
    (<name>: <integer>;)+
  }]+
}
(CSS3)
Définit des noms personnalisés pour les fonctionnalités de la police
```

| Type               | Valeur OpenType | Description |
|---                 |---              |---          |
| historical-forms   | hist            | Formes historiques |
| stylistic          | salt            | Formes stylistiques alternatives |
| styleset           | ss##            | Ensemble de caractères d'un style alternatif |
| character-variant  | cv##            | Semblable à styleshet mais les caractères peuvent avoir un style indépendant |
| swash              | swsh, cswh      | Glypes pour les lettres ornées |
| ornaments          | ornm            | Ornements tels que les fleurons et autres casseaux |
| annotation         | nalt            | Annotations (telles que les chiffres entourés ou les caractères inversés) |

``` css
@font-feature-values dual300 { 
  @stylistic {
    ident1: 1;
  }
}
h1 {
  font-variant-alternates: stylistic(ident1)
}
```

[Exemple @font-feature-values](https://jsfiddle.net/amt01/1vh9mfq4/)

### font-variant

``` plain
font-variant-alternates: stylistic(<name>) || historical-forms || styleset(<name>) ||
                         character-variant(<name>) || swash(<name>) || ornaments(<name>) ||
                         annotation(<name>)
(CSS3)
Permet d'appliquer une fonctionnalité nommée avec `@font-feature-values`
Liste séparée par des espaces
```

``` plain
font-variant-caps: normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps
(CSS3)
Définit la fonctionnalité à utiliser pour représenter les lettres en capitales
```

| Valeur          | Fonctionnalité |
|---              |---             |
| small-caps      | smcp           |
| all-small-caps  | smcp, c2sc     |
| petite-caps     | pcap           |
| all-petite-caps | pcap, c2pc     |
| unicase         | unic           |
| titling-caps    | titl           |

``` plain
font-variant-east-asian: [ jis78 | jis83 | jis90 | jis04 | simplified | traditional ] || ruby || [ full-width | proportional-width ]
(CSS3)
Définit le standard à utiliser et le dimensionnement des caractères des langues d'Asie orientiale
```

``` plain
font-variant-ligatures: [ common-ligatures | no-common-ligatures ] ||
                        [ discretionary-ligatures | no-discretionary-ligatures ] ||
                        [ historical-ligatures | no-historical-ligatures ] ||
                        [ contextual | no-contextual ]
(CSS3)
Définit les ligatures et formes contextuelles à utiliser
```

``` plain
font-variant-numeric: [ lining-nums | oldstyle-nums ] ||
                      [ proportional-nums | tabular-nums ] ||
                      [ diagonal-fractions | stacked-fractions ] ||
                      ordinal ||
                      slashed-zero
(CSS3)
Définit les glyphes à utiliser pour les nombres, fractions et marqueurs ordinaux
```

``` plain
font-variant-position: normal | sub | super
(CSS3)
Définit la position des glyphes (normal, indice ou exposant)
```

### ruby

Les caractères ruby sont des annotations textuelles placées au-dessus ou à côté de caractères logographiques (comme des caractères chinois ou kanji japonais) pour indiquer la prononciation des caractères susceptibles de ne pas être connus du lecteur.  
[Exemple ruby](https://jsfiddle.net/amt01/9suwg3uo/)

``` plain
ruby-align: start | center | space-between | space-around
(CSS3)
Définit l'alignement des caractères ruby
```

``` plain
ruby-position: over | under | inter-character
(CSS3)
Définit la position des caractères ruby (au-dessus, en-dessous, sur leur droite)
```

``` plain
ruby-merge: separate | collapse | auto
(CSS3)
Définit comment les annotations doivent être affichées lorsqu'il y a en plusieurs dans un tag
```

---

## Orientation

### text

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

### border-block

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

### padding-block

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

### margin-block

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

### offset-block

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

### min-block-size

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

### block-size

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

---

## Table

### table-layout

``` plain
table-layout: auto | fixed
(CSS2)
Définit si la taille des cellules dépendent de leur contenu ou non
```

``` css
{
  table-layout: fixed;
  width: 100%;
}
```

### border

``` plain
border-collapse: separate | collapse
(CSS2)
Définit si les bordures de deux cellules adjacentes sont en commun ou non
```

``` plain
border-spacing: <length length> | <length>
(CSS2)
Définit la distance entre les bordures de deux cellules lorsqu'elles sont séparées
```

``` css
{
  border-collapse: collapse;
}
```

### caption

``` plain
caption-side: top | bottom
(CSS2)
Définit si la légende du tableau est affichée en haut ou en bas
```

``` css
{
  caption-side: bottom;
}
```

### empty-cells

``` plain
empty-cells: show | hide
(CSS2)
Définit si les bordures et background des cellules vides sont affichés ou non
```

``` css
{
  empty-cells: hide;
}
```

---

## Image

### object

Les éléments `<img>`, `<object>`, `<video>`,`<audio>`, `canvas` et `<iframe>` sont des objets dit *remplacés*, leur contenu est chargé à partir d'une ressource externe et est indépendent du CSS.
On peut modifier le comportement du contenu avec les proprités `object`.  
[Exemples object](https://jsfiddle.net/amt01/k3zh7Luf/)

``` plain
object-fit: fill | contain | cover | none | scale-down
(CSS3)
Définit la façon dont le contenu d'un élément replacé s'adapte à sa boîte
```

``` plain
object-position: (left | center | right | top | bottom | <length-percentage>){1,2}
(CSS3)
Définit l'alignement du contenu
```

### image

``` plain
image-orientation: from-image | <angle> | [ <angle>? flip ]
(CSS3)
Définit l'orientation de l'image
```

[Exemple image-orientation](https://jsfiddle.net/amt01/tu7w22qr/)

``` plain
image-rendering: auto | crisp-edges | pixelated
(CSS3)
Définit l'algorithme à utiliser pour redimensionner l'image
```

[Exemple image-rendering](https://jsfiddle.net/amt01/5uj14sbt/)

---

## Liste

### list

``` plain
list-style: <list-style-type> <list-style-position> <list-style-image>
(CSS1,2)
Raccourcis permettant de définir le style d'une liste
```

``` plain
list-style-type:  disc | circle | square | decimal | decimal-leading-zero |
                  lower-roman | upper-roman | lower-greek | lower-latin | upper-latin |
                  armenian | georgian | lower-alpha | upper-alpha | none
(CSS1)
Définit le style de puce à utiliser
```

``` plain
list-style-position: inside | outside
(CSS1)
Définit si les puces sont affichés à l'intérieur ou à l'extérieur des bordures du li
```

``` plain
list-style-image: <image> | none
(CSS2)
Définit l'image à utiliser comme puce
```

``` css
{
  list-style-type: none;
}
```

### counter

Les compteurs sont des variables que l'on incrémente en CSS à chaque fois qu'elles sont utilisées.  
Cela permet d'ajouter une numérotation dans la page en dehors des &lt;li&gt;.  
[Exemples counter](https://jsfiddle.net/amt01/h4p6rjaw/)

``` plain
counter-increment: <string>
(CSS3)
Incrémente la valeur du compteur <nomducompteur> à chaque qu'il s'applique à un élément
```

``` plain
counter(<string>)
(CSS3)
Retourne la valeur du compteur
```

``` plain
counter-reset: <string>
(CSS3)
Réinitialise le compteur à 0
```

``` plain
counters(<string>, <string>)
(CSS3)
Retourne la valeur du compteur, avec récursion sur les éléments imbriqués
Séparé par le délimiteur donné en 2ème arguemnt
```

``` scss
{
  counter-increment: moncounter;

  *:first-child {
    counter-reset: moncounter;
  }
  &::before {
    content: counters(nom, ".");
  }
}
```

### @counter-style

La règle `@counter-style` permet de définir des styles de compteurs personnalisés.  
[Exemples @counter-style](https://jsfiddle.net/amt01/xhtobcs4/)

``` plain
@counter-style <counter-style-name> {
  <system || symbols || additive-symbols ||
  prefix || suffix || pad || negative || 
  range || speak-as || fallback>
}
Définit un style de counter personnalisé
(CSS3)
```

``` plain
system: cyclic | numeric | alphabetic | symbolic |
        fixed <integer>? | additive | extends <counter-style-name>
(CSS3)
Définit l'algorithme à utiliser pour convertir l'index en symbole
```

``` plain
symbols: (<string> | <image>)+
(CSS3)
Définit la liste de symboles à utiliser, séparés par des espaces
```

``` plain
additive-symbols: (<integer> (<string> | <image>))+
(CSS3)
Définit la liste des symboles à utiliser et leur poids (pour un system de type additive)
```

``` plain
prefix: <string> | <image>
(CSS3)
Définit le préfixe à ajouter avant le symbole
```

``` plain
suffix: <string> | <image>
(CSS3)
Définit le suffixe à ajouter après le symbole
```

``` plain
negative: (<string> | <image>){1,2}
(CSS3)
Définit le préfixe & suffixe à utiliser pour les index négatifs (se cumule au préfixe et suffixe normal)
```

``` plain
range: (<integer> | infinite){2};
(CSS3)
Définit l'intervalle de valeurs pris en compte par le counter
Par défaut
    - pour cyclic, numeric et fixed : infinite infinite
    - pour alphabetic et symbolic : 1 infinite
    - pour additive : 0 infinite
```

``` plain
pad: <integer> (<string> | <image>)
(CSS3)
Définit la longueur de la numérotation et quel symbole utiliser pour compléter la chaîne (= str_pad)
Par exemple pour afficher tous les nombres sur 2 chiffres
```

``` plain
speak-as: <auto | bullets | numbers | words | spell-out>
(CSS3)
Définit la représentation sonore de la liste
```

``` plain
fallback: <counter-style-name>
(CSS3)
Définit le style de secours pour le system fixed
```

``` css
@counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}
ol {
  list-style: circled-alpha;
}
```

``` css
@counter-style alpha-modified {
  system: extends lower-alpha;
  prefix: "(";
  suffix: ") ";
}
ol {
  list-style: alpha-modified;
}
```

<ins>system</ins> :

| Valeur     | Description
|---         |---
| cyclic     | Reprend au début quand la fin de la liste est atteinte
| fixed      | Utilise le système de secours quand la fin de la liste est atteinte. On peut éventuellement définir la valeur du premier symbole (1 par défaut)
| symbolic   | À chaque boucle, le caractère affiché est doublé, triplé, etc.
| alphabetic | Utilise une numérotation alphanumérique (a, b, c, aa, ab, ac, ba, bb, bc)
| numeric    | Utilise une numérotation numérique (1, 10, 11, 100, 110, 110, 111)
| additive   | Utilise une numérotation additive ()
| extends    | Utilise une numérotation déjà définie. Permet de modifier rapidement un style de liste pré-existant

### symbols()

Il est également possible d'affecter un style de counter personnalisé en le créant à la volée, avec la fonction `symbols()`.  
NB Les listes de type `additive` et `extends` ne sont pas possible avec cette syntaxe.

``` plain
list-type: symbols([cyclic | numeric | alphabetic | symbolic | fixed] [ <string> | <image> ]+);
(CSS3)
Définit le style de counter personnalisé à utiliser en le créant à la volée
```

``` css
{
  list-style: symbols(cyclic "◉" "◌");
}
```

---

## Layout

### position

La propriété `position` permet de déplacer l'élément dans la page.  
[Comparaison position relative, absolute, fixed](https://jsfiddle.net/amt01/cck6mx93/)

| Position | Description |
|---       |---          |
| relative | Déplace l'élément par rapport à sa position initiale |
| absolute | Place l'élément par rappport à un parent en position relative - ou à la page si aucun.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| fixed    | Place l'élément par rapport au viewport - sa position reste donc toujours la même, même lorsqu'on scrolle.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| static   | Comportement par défaut |

``` plain
position: static | relative | absolute | fixed
(CSS2)
Définit la façon dont l'élément est positionné dans le document
```

``` plain
top: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir du haut
```

``` plain
bottom: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir du bas
```

``` plain
left: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir de la gauche
```

``` plain
right: <length> | <percentage> | auto
(CSS2)
Placer ou déplacer à partir de la droite
```

``` plain
z-index: <number>
(CSS2)
Définit la priorité entre deux positionnés en CSS s'ils se chevauchent (!= static)
Priorité par ordre croissant: 2 prioritaire à 1
```

``` css
{
  position: absolute;
  top: 15px;
  left: 5px;
  z-index: 1;
}
```

### float

Un `float` décale un élément vers la droite ou vers la gauche jusqu'à ce qu'il touche le bord de son conteneur ou un autre élément flottant.
Les éléments situés avant le float ne sont pas affectés. Les éléments situé après le float s'adaptent à la position du ou des éléments flottant(s).
Pour que les éléments qui suivent reprennent leur comportement par défaut, utiliser `clear`.  
[Exemple float & clear](https://jsfiddle.net/amt01/k2okfe2w/)

``` plain
float: left | right | none
(CSS1)
Définit un float vers la gauche ou vers la droite
```

``` plain
clear: left | right | both
(CSS1)
Stoppe les effets du float
```

``` scss
{
  li {
    float: left;
    list-style-type: none;
  }
  &::after {
    content: "";
    display: table;
    clear: right;
  }
}
```

Si un élément flottant est plus grand en hauteur que l'élément qui le contient, son contenu va déborder du parent.
Pour parer ce problème, il faut rajouter un élément vide avec `clear` à la suite du float
(soit en ajoutant un élément vide dans le HTML soit en utilisant la propriété `content`).
[Exemple clearfix avec "content"](http://www.w3schools.com/cssref/tryit.asp?filename=trycss_float_clear_overflow)

### column

Permet d'afficher un bloc de texte en colonnes  
[Exemples column](https://jsfiddle.net/amt01/xju7ctzm/)

``` plain
column-count: <number>
(CSS3)
Définit le nombre de colonnes sur lequel afficher le texte
```

``` plain
column-width: <length>
(CSS3)
Définit la largeur de chaque colonne
```

``` plain
column: <column-width> || <column-count>
(CSS3)
Raccourcis permettant de définir le nombre de colonnes et leur largeur
```

``` plain
column-gap: <length>
(CSS3)
Définit l'espace entre chaque colonne
```

``` plain
column-rule: <width> <style> <color>
(CSS3)
Raccourcis permettant de définir une bordure entre chaque colonne
```

``` plain
column-rule-width: <length> | medium | thin | thick
(CSS3)
Définit la taille de la bordure
```

``` plain
column-rule-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
(CSS3)
Définit le style de la bordure (trait, pointillés, etc)
```

``` plain
column-rule-color: <color>
(CSS3)
Définit la couleur de la bordure
```

``` plain
column-fill: auto | balance
(CSS3)
Définit comment doit être répartit le contenu entre les colonnes
balance par défaut
```

``` plain
column-span: all | none
(CSS3)
Permet à un élément de s'étendre sur toutes les colonnes
```

``` css
{
  column-count:3;
  column-rule: 2x solid black;
}
```

### flex & align

Les flex-boxs permettent de disposer les éléments d'une page, un peu comme les float,
mais de telle sorte qu'ils aient toujours le même comportement quelle que soit la taille de l'écran.
Permet d'obtenir un layout responsive facilement.  
[Exemples flexbox](https://jsfiddle.net/amt01/8hcbz999/)

<ins>Propriétés du container</ins>:

``` plain
display: flex
(CSS3)
Rend tous les enfants de l'éléments courant "flexibles"
```

``` plain
flex-flow: <direction> <wrap>
(CSS3)
Raccourcis permettant de définir la direction et si les retours à la ligne sont autorisés
```

``` plain
flex-direction: row | row-reverse | column | column-reverse
(CSS3)
Définit si les enfants doivent être affichés en ligne ou en colonne
```

``` plain
flex-wrap: nowrap | wrap | wrap-reverse
(CSS3)
Définit s'il faut retourner à la ligne ou non si les enfants ne rentrent pas dans l'élément
```

``` plain
justify-content: flex-start | flex-end | center | space-between | space-around
(CSS3)
Définit l'alignement des enfants à l'intérieur de l'élément (début, fin, centre, etc)
```

``` plain
align-items: stretch | flex-start | flex-end | center | baseline
(CSS3)
Définit l'alignement des enfants sur l'axe secondaire
(= vertical si les enfants sont affichés en colonne et inversemment)
```

``` plain
align-content: stretch | flex-start | flex-end | center | space-between | space-around
(CSS3)
Définit le comportement des lignes sur l'axe secondaire lorsqu'il y en a plusieurs
```

``` css
{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  align-content: space-around;
}
```

<ins>Propriétés des enfants</ins>:

``` plain
flex: <grow> <shrink> <basis>
(CSS3)
Raccourcis permettant de définir si l'élément peut s'étirer ou se rétrécir
```

``` plain
flex-basis: <length>
(CSS3)
Définit la taille de l'enfant avant d'etre traitée par flex-grow / flex-shrink
Largeur si flex-direction: row, hauteur sinon
```

``` plain
flex-grow: <number>
(CSS3)
Définit le facteur d'agrandissement de l'élément pour remplir le conteneur
0 par défaut
```

``` plain
flex-shrink: <number>
(CSS3)
Définit le facteur de rétrécissement de l'élément pour rentrer dans le conteneur
1 par défaut (<1 : agrandir, >1 : rétrécir)
```

``` plain
order: <number>
(CSS3)
Modifie l'ordre HTML des enfants
```

``` plain
align-self: stretch | flex-start | flex-end | center | baseline
(CSS3)
Override align-items au niveau de l'enfant
```

``` css
{
  flex-basis: 4em;
  flex-grow: 1;
}
```

### grid

Tandis qu'une flexbox est unidimensionnelle (les éléments sont disposés en ligne ou en colonne),
un grid crée une grille en deux dimensions (les éléments sont disposés librement sur une ligne et colonne).
Cela permet de créer des layouts plus complexes, comme par exemple une mosaïque.

![](https://i.imgur.com/apQV5Wx.png)

[Exemples grid](https://jsfiddle.net/amt01/Lutfdkgg/)

<ins>Propriétés du container</ins>:

``` plain
display: grid
(CSS3)
Définit l'élément courant comme une grille
```

``` plain
grid-auto-flow: row | column | dense
(CSS3)
Définit le comportement par défaut des éléments lorsqu'aucun template n'est définit
- row (par défaut) en ligne
- column en colonne
- dense essaie de placer les éléments pour qu'il n'y ait aucun espace vide
```

[Exemple grid-auto-flow dense](https://codepen.io/stacy/pen/eBVBZE)

``` plain
grid-template-columns: [<length> | <percent> | <fraction> | minmax() | repeat()]+
(CSS3)
Définit le nombre de colonnes et leur taille
```

``` plain
grid-column-gap: <length> | <percent>
(CSS3)
Définit les marges entre deux colonnes
```

``` plain
grid-auto-rows: <length> | <percent> | <fraction> | minmax()
(CSS3)
Définit la taille des lignes qui ont été créées automatiquement
```

``` plain
grid-template-rows: [<length> | <percent> | <fraction> | minmax() | repeat()]+
(CSS3)
Définit le nombre de lignes et leur taille
S'il n'y a pas d'éléments pour remplir les lignes, des espaces vides sont crées 
```

``` plain
grid-row-gap: <length> | <percent>
(CSS3)
Définit les marges entre deux lignes
```

``` plain
grid-auto-columns: <length> | <percent> | <fraction> | minmax()
(CSS3)
Définit la taille des colonnes qui ont été créées automatiquement
```

``` plain
grid-gap: [<length> | <percent>]{1,2}
(CSS3)
Définit les marges entre deux lignes et deux colonnes
Identiques si une seule valeur définie
```

``` plain
align-items: start | end | strech | center
(CSS3)
Définit l'alignement des éléments sur une ligne
Par défaut, un élément s'étire en hauteur pour remplir la ligne (stretch)
```

``` plain
justify-items: start | end | strech | center |
               space-around | space-beteen | space-evenly
(CSS3)
Définit l'alignement des éléments sur une colonne
Par défaut, un élément s'étire en largeur pour remplir la colonne (stretch)
```

``` plain
grid-template-areas: <string>+
(CSS3)
Définit quelles zones doivent être placées pour chaque ligne/colonne
Utiliser "." pour laisser une colonne vide
```

``` plain
grid-template: (<grid-template-areas> <grid-template-rows>)+ / <grid-template-columns>
(CSS3)
Raccourcis permettant de définir les colonnes, lignes et zones d'une grille
```

[Exemple grid-template](https://jsfiddle.net/amt01/peg5apx4/)

``` plain
grid: <grid-template> |
      <grid-template-rows> / <grid-auto-columns> |
      <grid-auto-rows> / <grid-tempalte-columns>
(CSS3)
Raccourcis permettant de définir toutes les propriétés liées aux grilles CSS
```

``` css
{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```

<ins>Propriétés des enfants</ins>:

Par défaut, une grid place automatiquement les éléments en colonne et en ligne, dans l'ordre. Plutôt que de définir des colonnes et des lignes, on peut définir des emplacements sur lesquels on pourra par la suite placer les éléments.

![](https://i.imgur.com/rCCHzUe.png)

``` plain
grid-column-start: <number>
(CSS3)
Définit sur quelle colonne doit être placé l'élément
```

``` plain
grid-column-end: <number>
(CSS3)
Définit sur quelle colonne finit l'élément (non inclus)
```

``` plain
grid-column: <number>/<number> | span <number>
(CSS3)
Raccourcis permettant de définir sur quelle colonne commence et 
finit l'élément
Ou avec la syntaxe span, définit la taille de l'élément et non sa position
```

``` plain
grid-row-start: <number>
(CSS3)
Définit sur quelle ligne doit être placé l'élément
```

``` plain
grid-row-end: <number>
(CSS3)
Définit sur quelle ligne finit l'élément
```

``` plain
grid-row: <number>/<number> | span <number>
(CSS3)
Raccourcis permettant de positionner l'élément
Définit sur quelle ligne commence et finit l'élément
```

``` plain
align-self: start | end | strech | center
(CSS3)
Définit l'alignement de l'élément sur une ligne
Override align-items pour un élément en particulier
```

``` plain
justify-self: start | end | strech | center
(CSS3)
Définit l'alignement de l'élément sur une colonne
```

``` plain
grid-area: <string>
(CSS3)
Définit un nom de zone
```

``` css
{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &:first-child {
    grid-column: 1/3; /* de 1 à 3 */
  }
  &:nth-child(2) {
    grid-column: span 3; /* de n à n+3 (où n est la position par défaut de l'élément) */
  }
}
```

[CSS Grid Guide](https://cssgrid.cc/css-grid-guide.html)  
[A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid)  
[Responsive grid areas (codepen)](https://codepen.io/a-mt/pen/wppEyb)  

#### minmax()

Définit la taille minimale et la taille maximale de l'élément.

``` plain
minmax(
  <length> | <percentage> | auto,   // min
  <length> | <percentage> | auto,   // max
)
```

#### repeat()

Permet de répéter la même valeur plusieurs fois: `repeat(3, 1fr)` est équivalent à `1fr 1fr 1fr`.  
`repeat(auto-fit, minmax(150px, 1fr))` va créer automatiquement de nouvelles colonnes tant qu'il y a de la place pour.  

``` plain
repeat(<number> | auto-fit, value)
```

[Create A Dynamic Layout With CSS Grid Using Auto Fit And Minmax (codepen)](https://codepen.io/kevinpowell/pen/0da463770f21e55ebc1e8ddfb923cfae)

---

## Transitions

Les transitions permettent aux changements de valeur de propriétés de se produire en douceur sur une durée spécifiée.  
Elles se déclarent sur l'état initial de l'élément,
et sont appliquées lorsque les valeurs des propriétés changent, par exemple au focus ou même au changement de classe de l'élément.  
[Exemples transition](https://jsfiddle.net/amt01/5cor0o27/)

Il y a environ [50 propriétés qui peuvent être transitionnées](http://www.w3.org/TR/css3-transitions/#animatable-css)

### transition

``` plain
transition: <property> <duration> [<timing-function>] [<delay>]
(CSS3)
Raccourcis permettant de définir la transition d'un élément
```

``` plain
transition-property: all | <property> | none
(CSS3)
Définit sur quelle propriété s'applique la transition
```

``` plain
transition-duration: <time>
(CSS3)
Définit la durée de la transition
```

``` plain
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                            step-start | step-end | steps(<n>[,start|end]) |
                            cubic-bezier(<x1>,<y1>,<x2>,<y2>)
(CSS3)
Définit le comportement de la transition (ease par défaut)
```

``` plain
transition-delay: <time>
(CSS3)
Définit un délai entre le déclenchement et la transition (0 par défaut)
```

``` scss
{
  background-color: orange;
  transition: background 1s;

  &:hover {
    background-color: blue;
  }
}
```

<ins>Multiples transitions</ins> :

Une transition peut porter sur une propriété en particulier ou toutes.  
Pour appliquer différentes transitions sur différentes propriétés, les définir séparées par une virgule.

``` css
transition: background 1s, opacity 0.5s 0.5s;
```

Est équivalent à

``` css
transition-property: background, opacity;
transition-duration: 1s, 0.5s;
transition-delay: 0s, 0.5s;
```

<ins>transition-delay</ins> :

Le délai peut être utilisé pour démarrer une animation après une autre.  
[Exemple transition-delay](https://jsfiddle.net/amt01/13p6651L/)

<ins>transition-timing-function</ins> :

Par défaut, les transitions commencent lentement, accélèrent, puis ralentissent un peu avant de terminer - c'est le timing `ease`.
Il est possible de modifier ce comportement en utilisant une autre fonction, ou en définissant soi-même le comportement de la transition via `cubic-bezier()`.

<table>
  <thead>
    <tr>
      <th>Valeur</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ease</code></td>
      <td>Commence lentement, accèlère puis ralentit (par défaut)</td>
    </tr>
    <tr>
      <td><code>linear</code></td>
      <td>Vitesse constante</td>
    </tr>
    <tr>
      <td><code>ease-in</code></td>
      <td>Commence lentement puis accèlère</td>
    </tr>
    <tr>
      <td><code>ease-out</code></td>
      <td>Commence rapidement puis ralentit</td>
    </tr>
    <tr>
      <td><code>ease-in-out</code></td>
      <td>Similaire à ease mais plus rapide au milieu</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>cubic-bezier(x1,y1,x2,y2)</code></td>
      <td>Timing personnalisé</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>steps(&lt;integer&gt;, [start \| end])</code></td>
      <td>Avancer par saccades</td>
    </tr>
    <tr>
      <td><code>step-start</code></td>
      <td>Équivaut à steps(1, start)</td>
    </tr>
    <tr>
      <td><code>step-end</code></td>
      <td>Équivaut à steps(1, end)</td>
    </tr>
  </tbody>
</table>

### cubic-bezier()

La fonction cubic-bezier() permet de définir un timing personnalisé.  
Les mots clés `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out` sont en fait des [raccourcis pour les courbes bézier](https://developer.mozilla.org/fr/docs/Web/CSS/single-transition-timing-function#Mots-cl%C3%A9s_pour_les_fonctions_de_temporisation_usuelles) usuellement utilisées.

``` plain
cubic-bezier(x1,y1,x2,y2)
(CSS3)
Nombres entre 0 et 1, séparés par virgules
```

Les coordonnées indiquent les positions des poignées Bezier de début et de fin, qui tracent la progression de l'animation entre le début et la fin.
* plus la courbe est raide, plus l'animation est rapide
* plus la courbe est plate, plus l'animation est lente
* si la courbe fait des demi-tours, l'animation effectue des rebonds

[Exemples de courbes béziers](http://easings.net)  
[Créer une courbe bézier](http://cubic-bezier.com)

### steps()

La fonction steps permet d'afficher une animation par saccades, ce qui peut permettre de simuler une animation GIF par exemple.

``` plain
steps(<integer>, [start \| end])
(CSS3)
Nombres d'étapes et direction
```

[Exemples steps](https://jsfiddle.net/amt01/3e3o8y0q/)  
[Exemples: clock, cars, paws, progress](https://designmodo.com/demo/stepscss/index.html)  
[Exemple background-image sprite animation](http://jsfiddle.net/simurai/CGmCe/light/)

---

## Transformations

Les transformations servent à modifier la forme et la position d'un élément HTML : étirer, faire tourner, etc.
Les transformations ne changent pas le flow document normal, c'est à dire que les éléments autour ignorent les transformations.  
On utilise généralement les transformations avec la propriété `transition` afin de créer des animations simples.  
[Exemples transformations 2D & 3D](https://jsfiddle.net/amt01/6enswd6e/)

### transform

``` plain
transform: <transform-function>
(CSS3)
Définit la ou les transformations à appliquer
```

``` plain
transform-origin: (<length> | <percentage> | left | center | right | top | bottom){1,2}
(CSS3)
Définit l'origine du repère pour les opérations de transformation
Par défaut se situe
    - au milieu (50% 50%) pour les éléments HTML
    - en haut à gauche (top left) pour les éléments SVG
```

``` plain
transform-box: border-box | fill-box | view-box
(CSS3)
Définit la boîte de référence utilisée par transform et transform-origin
Uniquement pour les éléments SVG
- border-box : bordure incluse
- fill-box   : contenu uniquement
- view-box   : utilise la viewBox la plus proche
```

[Exemples transform-origin](https://developer.mozilla.org/fr/docs/Web/CSS/transform-origin#Exemples)  
[Animation transform-origin](https://codepen.io/sdras/full/dVwaZG/)

``` plain
transform-style: flat | preserve-3d
(CSS3)
Définit si les enfants de l'élément doivent être considérés comme étant en 3d ou non
```

<ins>transform-function 2D</ins> :

<table>
  <thead>
    <tr>
      <th>Fonction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>translate(X, Y)</code></td>
      <td>Déplace l’élément horizontalement et verticalement</td>
    </tr>
    <tr>
      <td><code>translateX(&lt;length&gt; | &lt;percentage&gt;)</code></td>
      <td>Déplace l’élément horizontalement</td>
    </tr>
    <tr>
      <td><code>translateY(&lt;length&gt; | &lt;percentage&gt;)</code></td>
      <td>Déplace l’élément verticalement</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>scale(X, Y)</code></td>
      <td>Redimensionne l’élément en largeur et en hauteur</td>
    </tr>
    <tr>
      <td><code>scaleX(&lt;number&gt;)</code></td>
      <td>Redimensionne l’élément en largeur</td>
    </tr>
    <tr>
      <td><code>scaleY(&lt;number&gt;)</code></td>
      <td>Redimensionne l’élément en hauteur</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>rotate(&lt;angle&gt;)</code></td>
      <td>Fait tourner l’élément autour d’un point fixe</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>skew(&lt;angle&gt;,&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la largeur et sur la hauteur</td>
    </tr>
    <tr>
      <td><code>skewX(&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la largeur</td>
    </tr>
    <tr>
      <td><code>skewY(&lt;angle&gt;)</code></td>
      <td>Étire l’élément sur la hauteur</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>matrix(a1,a2,b1,b2,tx,ty)</code></td>
      <td>Définit une matrice de transformation 2D<br>
Les transformations rotate, skew, etc sont des
<a href="https://jsfiddle.net/amt01/nwhx4kmo/">raccourcis pour les matrices de transformation</a> usuellement utilisées.<br>
<br>
Outils pour créer sa matrice :
<a href="http://peterned.home.xs4all.nl/matrices">Via drag & drop</a>
ou <a href="http://jsfiddle.net/nK2u7/103/">via slider</a><br>
<a href="http://meyerweb.com/eric/tools/matrix/">Convertir des transformations en matrice</a>
</td>
    </tr>
  </tbody>
</table>

Le pourcentage réfère à l'objet lui-même et non à son parent : `translateX(100%)` déplace l'élément à côté de l'endroit où il était (= déplacement de 100% de sa largeur)

``` scss
{
  transition: all 2s ease;
  &:hover {
    transform: rotateY(360deg);
  }
}
```

<ins>transform-function 3D</ins> :

Les transformations 3D héritent des transformations 2D et ajoutent un troisième axe : Z, qui permet de déplacer les éléments dans l'espace, comme des cartes postales ou des facettes de cube. 
[Exemples de transformations 3D](http://css3.bradshawenterprises.com/transforms/)

<table>
  <thead>
    <tr>
      <th>Fonction</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>perspective(&lt;length&gt;)</code></td>
      <td>Pour utiliser une transformation 3D, il faut spécifier la perspective. Elle définit la distance de vision par rapport à l'élément : plus la distance donnée est petite, plus l'objet est déformé. Elle se définit

<ul>
<li>soit via la propriété CSS <code>perpective: 500px</code></li>
<li>soit via la fonction de transformation <code>transform: perspective(500px)</code></li>
</ul>
</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>translate3d(X, Y, Z)</code></td>
      <td>Même principe que translate mais avec l’axe Z en plus</td>
    </tr>
    <tr>
      <td><code>translateZ(&lt;length&gt;)</code></td>
      <td>Déplace l’élément vers l’avant ou l’arrière</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>scale3d(X, Y, Z)</code></td>
      <td>Même principe que scale mais avec l’axe Z en plus</td>
    </tr>
    <tr>
      <td><code>scaleZ(&lt;number&gt;)</code></td>
      <td>Modifie la coordonnée en Z de chaque point de l’élément</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>rotate3d(X, Y, Z, &lt;angle&gt;)</code></td>
      <td>Fait tourner l’élément autour d’un axe</td>
    </tr>
    <tr>
      <td><code>rotateZ(&lt;angle&gt;)</code></td>
      <td>Déplace l’élément autour de l’axe Z</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><pre>matrix3d(a1,a2,a3,a4, b1,b2,b3,b4,
c1,c2,c3,c4, tx,ty,tz,d4)</pre></td>
      <td>Définit une matrice de transformation 3D<br> Même principe que matrix mais avec l'axe Z</td>
    </tr>
  </tbody>
</table>

``` css
{
  transform: rotate3d(0,1,0,60deg);
}
```

<ins>Multiples transformations</ins> :

Pour appliquer plusieurs transformations, les lister séparées par un espace.  
Les transformations ont un ordre, chaque transformation est calculée par dessus la somme des transformations précédentes. [Exemple ordre transformations](https://jsfiddle.net/amt01/23nm563L/)

``` css
{
  transform: scale(2,1) rotate(60deg);
}
```

### perspective

``` plain
perspective: <length>
(CSS3)
Définit la perspective (distance de vision par rapport à l'élément)
```

``` plain
perspective-origin: <length> | <percentage> | left | center | right | top | bottom
(CSS3)
Définit la position du point de fuite
Par défaut se situe au milieu (50% 50%)
```

### backface-visibility

``` plain
backface-visiblity: visible | hidden
(CSS3)
Définit si la face arrière de l'élément est visible ou non
```

[Exemple backface-visiblity avec cube](http://webkit.org/blog-files/3d-transforms/morphing-cubes.html)

---

## Animations

Pour obtenir des animations plus complexes qu'avec une simple transition, on peut utiliser la propriété `animation` - par exemple pour [répéter une transformation plusieurs fois](https://jsfiddle.net/amt01/279mn08f/).

### @keyframes

Une instruction `@keyframes` définit une animation. Pour ce faire, on liste tous les changements et transformations que va subir l'élément auquel sera assigné l'animation.

``` plain
@keyframes <string> {
  (from | to | <percentage>) {
      <declaration-list>
  }+
}
(CSS3)
Crée une animation
```

``` css
@keyframes myAnimation {
  from { color:black; }
  50% { color: red; }
  to { color:black; }
}
```

### animation

Une fois définie, l'animation est assigné à un élément via la propriété `animation`.

``` plain
animation: <name> <duration>
            [<timing-function>] [<delay>]
            [<iteration-count>] [<direction>]
            [<fill-mode>] [<play-state>]
(CSS3)
Raccourcis permettant de définir l'animation à appliquer
```

``` plain
animation-name: <string>
(CSS3)
Définit l'animation à utiliser
```

``` plain
animation-duration: <time>
(CSS3)
Définit la durée de l'animation
```

``` plain
animation-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                           step-start | step-end | steps(<n>[,start|end]) |
                           cubic-bezier(<x1>,<y1>,<x2>,<y2>)
(CSS3)
Définit le comportement de l'animation (ease par défaut)
```

``` plain
animation-delay: <time>
(CSS3)
Définit un délai entre le déclenchement et l'animation (0 par défaut)
```

``` plain
animation-iteration-count: <number> | infinite
(CSS3)
Définit le nombre de fois où l'animation est répétée (1 par défaut)
```

``` plain
animation-direction: normal | reverse | alternatve | alternate-reverse
(CSS3)
Définit dans quel sens appliquer l'animation (de from à to, de to à from, l'un après autre)
```

``` plain
animation-fill-mode: none | backwards | forwards | both
(CSS3)
Définit la façon ont l'animation doit s'appliquer
```

``` plain
animation-play-state: running | paused
(CSS3)
Définit lorsque l'animation est en pause
```

``` css
.anim {
    animation: slide 2s;
}
@keyframes slide {
    to { transform: translateX(900px); }
}
```

<ins>animation-direction</ins> :

Pour utiliser la direction alternate, il faut un `animation-iteration-count` au moins égal à 2 (1 pour l'aller, 1 pour le retour).  
[Exemple animation direction](https://jsfiddle.net/amt01/f5sk7avy/)

<ins>animation-fill-mode</ins> :

| Valeur    | Description                                                        |
|---        |---                                                                 |
| backwards | Applique la première frame de l'animation avant qu'elle ne démarre |
| forwards  | Applique la dernière frame après que l'animation soit finit        |
| both      | Applique backwards + forwards                                      |

[Exemples animation-fill-mode](https://jsfiddle.net/amt01/mewoxegd/)

<ins>Multiples animations</ins> :

Plusieurs animations peuvent s'appliquer à un élément, en les séparant par des virgules

``` css
{
  animation: slideIn 0.8s linear,
             fadeIn 0.2s ease-in;
}
```

Est équivalent à

``` css
{
  animation-name: slideIn, fadeIn;
  animation-duration: 0.8s, 0.2s;
  animation-timing-function: linear, ease-in;
}
```

[Exemples multiples animations](https://jsfiddle.net/amt01/h9myq4t4/)

### will-change

La propriété `will-change` permet d'indiquer au navigateur que l'élément va changer pour que le navigateur mette en place des optimisations avant que l'élément ne change vraiment. Cela permet d'augmenter la réactivité de la page en effectuant des calculs (éventuellement coûteux) en prévision du changement.

`will-change` est conçu pour être utilisé en dernier ressort afin de régler les problèmes de performances existants. En utilisant `will-change` trop souvent, cela consommera plus de mémoire, complexifiera le rendu de la page pour le navigateur (qui se préparera au changement). En bref, cela réduira les performances de la page.

``` plain
will-change: <property>
(CSS3)
Indique qu'une propriété va changer
```

``` css
{
  will-change: opacity;
}
```

---

## Interractions utilisateur

### pointer-events

Permet de contrôler si un élément peut recevoir des événements de la souris (clic, sélection).  
Lorsqu'on utilise la valeur `none`, cela indique que l'élément ne peut pas recevoir d'événement de pointeur mais qu'on peut passer "au travers" de l'élément pour atteindre des contrôles qui pourraient être derrière.

``` plain
pointer-events: auto | none |
                visiblePainted | visibleFill | visibleStroke | visible |
                painted | fill | stroke | all
(SVG)
Définit si l'élément peut recevoir des événements de la souris
```

### touch-action

Définit si une région donnée peut être manipulée par l'utilisateur grâce à des interactions tactiles (déplacer, zoomer). `touch-action: none` désactive toutes les interractions tactiles.

``` plain
touch-action : [  [ pan-x | pan-left | pan-right ]
                  || [ pan-y | pan-up | pan-down ]
                  || pinch-zoom
               ] | manipulation
(CSS3)
Définit les interactions tactiles qui peuvent être utilisées
```

### scroll

``` plain
scroll-behaviour: auto | smooth
(CSS3)
Définit le comportement du défilement (direct ou avec transition)
```

[Exemple scroll-behaviour](https://jsfiddle.net/amt01/cphLuu59/)

``` plain
scroll-snap-type: none | mandatory | proximity
(CSS3)
Définit si le scroll doit s'arrêter / s'accrocher sur les points d'accroche (enfants du container)
- mandatory: s'arrêter sur un point d'accroche lorsque le défilement s'arrête
- proximity: s'arrêter sur un point d'accroche s'il est suffisamment proche
```

![](https://i.imgur.com/TDTaMU7.png)

[Exemple scroll-snap-type](https://jsfiddle.net/amt01/7ywh1bnu/)

### resize

Définit la direction dans laquelle les éléments redimensionnables (comme les textarea) peuvent être redimensionnés (hauteur/largeur).

``` plain
resize: none | both | horizontal | vertical
(CSS3)
Définit les directions de redimension autorisées
---

## Filtres

### filter

Les filtres permettent d'appliquer des effets à une image, un arrière-plan ou des bordures: flou, saturation, etc.  
[Exemples filter](https://jsfiddle.net/amt01/f5avs5jq/)

``` plain
filter: blur( <length> ) ||
        brightness( <number-percentage> ) ||
        saturate( <number-percentage> ) ||
        hue-rotate( <angle> ) ||
        contrast( <number-percentage> ) ||
        invert( <number-percentage> ) ||
        grayscale( <number-percentage ) ||
        sepia( <number-percentage> ) ||
        opacity( <number-percentage> ) ||
        drop-shadow( <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ) ||
        url( <uri svg> )
```

| Filtre          | Description
|---              |---
| `blur()`        | Flou gaussien
| `brightness()`  | Modifie la luminosité<br> 0% noir, 100% image d'origine, >100% augmente la luminosité
| `contrast()`    | Modifie le contraste<br> 0% gris, 100% image d'origine, >100% augmente le contraste
| `drop-shadow()` | Ombre portée
| `grayscale()`   | Niveau de gris<br> 100% niveau de gris, 0% image d'origine
| `sepia()`       | Sepia<br> 100% sepia, 0% image d'origine
| `hue-rotate()`  | Rotation de teinte<br> 0deg image d'origine
| `invert()`      | Inverse les couleurs
| `opacity()`     | Modifie l'opacité<br> 100% image d'origine, 0% transparent
| `saturate()`    | Modifie la saturation<br> 0% désaturé, 100% image d'origine, >100% saturé

``` css
{
  filter: contrast(175%) brightness(103%);
}
```

---

## Viewport

Les propriétés suivantes s'appliquent à l'intérieur d'une at-rule `@viewport`.

``` plain
min-width: <length> | <percent>
(CSS3)
Définit la largeur minimale du viewport
```

``` plain
max-width: <length> | <percent>
(CSS3)
Définit la largeur maximale du viewport
```

``` plain
width: [<length> | <percent>]{1,2}
(CSS3)
Raccourcis permettant de définir la largeur minimale et maximale du viewport
Identiques si une seule valeur
```

``` plain
min-height: <length> | <percent>
(CSS3)
Définit la hauteur minimale du viewport
```

``` plain
max-height: <length> | <percent>
(CSS3)
Définit la hauteur maximale du viewport
```

``` plain
height: [<length> | <percent>]{1,2}
(CSS3)
Raccourcis permettant de définir la hauteur minimale et maximale du viewport
```

``` plain
zoom: <number> | <percent>
(CSS3)
Définit le zoom initiale
Pour aucun zoom: 1.0 ou 100%
```

``` plain
min-zoom: <number> | <percent>
(CSS3)
Définit le niveau de zoom minimal
```

``` plain
max-zoom: <number> | <percent>
(CSS3)
Définit le niveau de zoom maximal
```

``` plain
user-zoom: zoom | fixed
(CSS3)
Définit si l'utilisateur peut changer le niveau de zoom ou non
```

``` plain
orientation: portrait | landscape | auto
(CSS3)
Définit l'orientation du document
```

---

## Page

Les propriétés suivantes s'appliquent à l'intérieur d'une at-rule `@page`.

### oprhans & widows

``` plain
orphans: <integer>
(CSS2)
Définit nombre minimum de lignes qui doivent rester en bas d'une page, région ou colonne
2 par défaut
```

``` plain
Définit le nombre minimum de lignes qui peuvent être laissées en haut de la page, région ou colonne suivante
widows: <integer>
(CSS2)
2 par défaut
```

### page

``` plain
page-break-inside: avoid | auto
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page au sein de l'élément courant
```

``` plain
page-break-before: auto | always | avoid | left | right
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant
```

``` plain
page-break-after: auto | always | avoid | left | right
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant
```

| Valeur   | Descirption
|---       |---
| `auto`   | Valeur initiale. Les sauts de page sont automatiques
| `always` | Le saut de page est toujours forcé avant l'élément
| `avoid`  | Les saut de page sont évités avant l'élément
| `left`   | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page gauche.
| `right`  | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page droite.

---

## Formes

Des formes CSS peuvent être créer en utilisant les bordures et du contenu généré (::before, ::after). [Exemple formes CSS](https://codepen.io/a-mt/pen/MvqdqZ)  
Mais on peut également utiliser des cercles, ellipses et polygones SVG pour créer des formes intéressantes sur tout type d'élément (images, paragraphes, etc)

### clip-path

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

### mask

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

### shape

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

---

## Blend modes

``` plain
mix-blend-mode: normal | multiply | screen | overlay |
                darken | lighten | color-dodge | color-burn | hard-light | soft-light |
                difference | exclusion | hue | saturation | color | luminosity
(CSS3)
Définit la façon dont le contenu d'un élément doit être fusionné avec son background
```

[Exemple mix-blend-mode](https://css-tricks.com/almanac/properties/m/mix-blend-mode/)

``` plain
background-blend-mode: normal | multiply | screen | overlay |
                       darken | lighten | color-dodge | color-burn | hard-light | soft-light |
                       difference | exclusion | hue | saturation | color | luminosity
(CSS3)
Définit la façon dont les images d'arrière-plan doivent être fusionnées
entre elles et avec la couleur d'arrière-plan
```

[Exemples background-blend-mode](https://developer.mozilla.org/fr/docs/Web/CSS/blend-mode)


``` plain
isolation: isolate | auto
(CSS3)
Empêche que certains éléments se mélangent
Crée un nouveau contexte d'empilement, les éléments se mélangeront uniquement à l'intérieur de ce contexte
```

[Exemple isolation](https://www.quackit.com/css/css3/properties/css_isolation.cfm)
