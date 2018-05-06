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

## Propriétés

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

### Box model

[Box Model](css-prop-box-model.md)
* display
* visibility
* border
* margin
* padding
* width
* height
* box-sizing
* overflow

---

### Autres bordures

[Autres bordures](css-prop-ext-border.md)
* outline
* border-image
* border-radius
* box-shadow
* box-decoration-break

---

### Bloc

[Bloc](css-prop-bloc.md)
* opacity
* background
* cursor
* caret

---

## Texte

[Texte](css-prop-texte.md)
* color
* text
* word
* line-break
* hanging-punctuation
* white-space
* letter-spacing
* vertical-align
* tabsize
* hyphens
* quotes

---

## Police d'écriture

[Police d'écriture](css-prop-font.md)
* font
* @font-face
* font-feature-settings
* @font-feature-values
* font-variant
* ruby

---

## Orientation

[Orientation](css-prop-orientation.md)
* writing-mode
* direction
* unicode-bidi
* text-underline-position
* text-orientation
* text-combine-upright
* border-block
* padding-block
* margin-block
* offset-block
* min-block-size
* block-size

---

## Table

[Table](css-prop-table.md)
* table-layout
* border-collapse
* border-spacing
* caption-side
* empty-cells

---

## Image

[Image](css-prop-image.md)
* object
* image

---

## Liste

[Liste](css-prop-liste.md)
* list
* counter
* @counter-style
* system()

---

## Layout

[Layout](css-prop-layout.md)
* position
* z-index
* float
* column
* flex
* align
* grid
* justify
* minmax()
* repeat()

---

## Transitions

[Transition](css-prop-transition.md)
* transition
* cubic-bezier()
* steps()

---

## Transformations

[Transformations](js-prop-transform.md)
* transform
* perspective
* backface-visibility

---

## Animations

[Animations](css-prop-animation.md)
* @keyframes
* animation
* will-change

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
