---
title: Les valeurs CSS
category: Web > CSS
---

## Types

### string

Une *chaîne de caractère* (string) peut être écrite entre simple ou double quotes. Les quotes peuvent être échappées d'un backslash.

``` css
"this is a 'string'"
"this is a \"string\""
'this is a "string"'
'this is a \'string\''
```

Pour ajouter un retour chariot, il est nécessaire d'utiliser un caractère spécial: "\A" en ISO-10646.

``` css
"Chaîne avec une \Anouvelle ligne"
```

Il est possible de couper une chaîne de caractère en plusieurs lignes, pour des raisons esthétiques, en utilisant le backslash :

``` css
"Une grande chaîne \
de caractères"
```

Certaines valeurs peuvent prendre une valeur en paramètre sans quotes. Par exemple `background: url(path/img.png)` ou `font-family: Monospace`. Il sera nécessaire d'utiliser des quotes ou des backslash lorsque cette chaîne utilise soit des parenthèses, des virgules, des espaces ou des quotes.

``` css
font-family: "Times New Roman";
background: url("img/(1).png");
```

---

### color

CSS accepte différentes manières de spécifier la *couleur* (color)

| Format           | Decription                                    | Exemple                                     | Version |
|---               |---                                            |---                                          |---      |
| red              | Un nom <sup>(1)</sup>                         | <code>color: red;</code>                    | [CSS1]  |
| transparent      |                                               | <code>color: transparent;</code>            | [CSS3]  |
| currentColor     | La couleur de texte actuelle                  | <code>border: 1px solid currentColor</code> | [CSS3]  |
| rgb(R, G, B)     | Un code RGB                                   | <code>color: rgb(255, 0, 0);</code>         | [CSS1]  |
| rgba(R, G, B, A) | Un code RGB avec canal alpha                  | <code>color: rgba(255, 0, 0, 0.5);</code>   | [CSS3]  |
| #RRGGBB          | Un code hexadecimal <sup>(2)</sup>            | <code>color: #FF0000;</code>                | [CSS1]  |
| #RRGGBBAA        | Un code hexa avec canal alpha <sup>(2)</sup>  | <code>color: #FF003388;</code>              | [CSS4]  |
| hsl(H, S, L)     | Un code HSL <sup>(3)</sup>                    | <code>color: hsl(0, 100%, 50%);</code>      | [CSS3]  |
| hsla(H, S, L, A) | Un code HSL avec canal alpha                  | <code>color: hsl(0, 100%, 50%, 0.5)</code>  | [CSS3]  |

<sup>(1)</sup> Il existe <a href="https://www.w3schools.com/colors/colors_names.asp">147 noms de couleurs prédéfinis</a>

<sup>(2)</sup> On peut utiliser une version abrégée #RGB[A]  
&emsp; Par exemple <code>#F9A</code> = <code>#FF99AA</code>

<sup>(3)</sup> H = Hue (teinte sur une palette circulaire de 0 à 360)  
&emsp; S = Saturation (100% flashy, 0% gris)  
&emsp; L = Luminosité (100% blanc, 50% couleur, 0% noir)  
&emsp; On peut facilement trouver une couleur plus foncé/pâle, plus flashy/mate, la couleur complémentaire (hue +180), etc.  
&emsp; <a href="https://codepen.io/iamvdo/pen/vBlxt">Codepen HSL</a>

[Doc MDN type &lt;color&gt;](https://developer.mozilla.org/fr/docs/Web/CSS/Type_color)

---

### angle

Différentes unités sont possibles pour exprimer un *angle*

| Unité | Cercle complet         | Angle plat             | Angle droit            | Version |
|---    |---                     |---                     |---                     |---      |
| deg   | <code>360deg</code>    | <code>180deg</code>    | <code>90deg</code>     | [CSS3]  |
| grad  | <code>400grad</code>   | <code>200grad</code>   | <code>100grad</code>   | [CSS3]  |
| rad   | <code>6.2832rad</code> | <code>3.1416rad</code> | <code>1.5708rad</code> | [CSS3]  |
| turn  | <code>1turn</code>     | <code>0.5turn</code>   | <code>0.25turn</code>  | [CSS3]  |

Les valeurs peuvent être positives (sens horaire) ou négatives (sens anti-horaire).

---

### time

Les *durées* (time) peuvent être exprimées en secondes ou en millisecondares.

<ins>Définition</ins> :

``` plain
<time>: <number>s | <real>s | <number>ms
```

<ins>Exemples</ins> : 1s, .5s, 500ms

---

### absolute-size

Une *taille absolue* (absolute-size) est une taille définie par le navigateur.

<ins>Définition</ins> : <code>xx-small | x-small | small | medium | large | x-large | xx-large</code>  
<ins>Exemple</ins> : <code>font-size: x-small</code>

### relative-size

Une *taille relative* (relative-size) est une taille relative à celle du parent.

<ins>Définition</ins> : <code>smaller | larger</code>  
<ins>Exemple</ins> : si la taille du parent vaut <code>x-small</code>, <code>font-size: smaller</code> équivaut à <code>xx-small</code>

### percentage

Un *pourcentage* (percentage) est une taille calculée en pourcentage de la taille du parent.

<ins>Définition</ins> : <code>&lt;number&gt;%</code>  
<ins>Exemple</ins> : <code>font-size: 200%</code>

### number

Si aucune unité n’est donnée, un *nombre* (number) est un coefficient multiplicateur par rapport à la taille de police en cours.

<ins>Définition</ins> : <code>&lt;number&gt;</code>  
<ins>Exemple</ins> : <code>line-height: 2</code>

### length

Une *longueur* est une taille relative à la résolution de l’écran.

<ins>Définition</ins> : <code>&lt;number&gt;&lt;unit&gt;</code>  
<ins>Exemple</ins> : <code>font-size: 14px</code>

#### Unités de longueur

* Absolues:

  | Unité | Nom         | Description |
  |---   |---          |---          |
  | in   | inches      | Valeur absolue quel que soit le media en cours. Utilisée pour l'impression, de la même manière que cm, mm, q, pt et pc. |
  | cm   | centimers   | 1in = 2.54cm |
  | mm   | millimeters | 1in = 25.4mm |
  | q    | quarter millimeters | 1q = 4mm |
  | pt   | points      | 1in = 72pt |
  | pc   | picas       | 1in = 6pc |
  | px   | pixels      | La taille d'1px dépend du media en cours et de sa résolution |

  L'unité px est définie pour être 'petite mais visible', et de telle façon qu'une ligne horizontale de 1px de largeur peut être affichée de façon nette, sans 'arête' (ni anti-aliasing). 

* Relatives:

  | Unité | Nom        | Description |
  |---   |---         |---          |
  | em   | ems        | Largeur de la lettre m (minuscule) de la police. <br>0.8em = 80% de la taille de police du parent |
  | rem  | root ems   | Largeur de la lettre m (minuscule) de la police. <br>0.8rem = 80% de la taille de police de &lt;html&gt; |
  | ex   | exes       | Hauteur de la lettre x (minuscule) de la police. <br>0.8ex = 80% de la taille de police du parent |
  | ch   | characters | Largeur de la lettre 0 |
  | vw   | viewport width  | Équivaut à 1/100e de la largeur de la fenêtre    |
  | vh   | viewport height | Équivaut à 1/100e de la hauteur de la fenêtre    |
  | vmin | viewport min    | Sélectionne la plus petite valeur entre vw et vh |
  | vmax | viewport max    | Sélectionne la plus grande valeur entre vw et vh |

### resolution

La *résolution* (resolution) est la densité de pixels d'un appareil.  
La résolution peut être utilisée dans les media queries.

<ins>Définition</ins> : <code>&lt;number&gt;&lt;unit&gt;</code>  
<ins>Exemple</ins> : <code>min-resolution: 300dpi</code>

#### Unités de résolution

| Unité | Nom                 | Description      |
|---   |---                  |---               |
| dpi  | dots per inch       | 1dpi ≈ 0,39 dpcm |
| dpcm | dots per centimeter | 1dpcm ≈ 2,54 dpi |
| dppx | dots per px         | 1dppx ≈ 96 dpi   |

Un écran compte habituellement 72 ou 96 dpi, tandis qu'un document imprimé en compte généralement un nombre beaucoup plus élevé. 

---

### image

Certaines propriétés peuvent prendre une *image* pour valeur.  
C'est le cas de `background`, `list-style-image`, `border-image` et `content`.

<ins>Définition</ins> : <code>&lt;uri&gt; | &lt;gradient&gt;</code>

* Une *uri* se déclare avec la fonction `url` [CSS1]  
  <ins>Exemple</ins>: <code>background: url(test.jpg)</code>

* Un *gradient* (degradé) est généré par le navigateur grâce à une des 4 fonctions de gradient [CSS3]  
  <ins>Exemple</ins>: <code>background: linear-gradient(blue, red)</code>

  * [JSFiddle gradients](https://jsfiddle.net/amt01/p2koxpkq/)
  - [Snippets de boutons avec gradient](http://demo.themezilla.com/blox/zilla-shortcodes/)
  - [Éditeur de gradient](http://www.colorzilla.com/gradient-editor/)
  - [Gallerie de motifs via gradients](http://lea.verou.me/css3patterns/)

---

## Fonctions: globales

### url()

La fonction `url` permet d'inclure une image avec
* une URL absolue

  ``` css
  url("http://monsite.com/images/monimage.png")
  ```

* une URL relative à l'emplacement du fichier CSS en cours

  ``` css
  url("../images/monimage.png")
  ```

* une image encodée en base64

  ``` css
  url(data:image/png;base64,iVBORw0KGg=...)
  ```

  [Générer le code base64 d'une image](http://b64.io/)

### calc()

La fonction `calc()` permet de calculer une valeur.  
Elle peut être utilisée pour toute valeur `length`, `frequency`, `angle`, `time`, `number`, ou `integer`.

<ins>Définition</ins>:

``` plain
calc(<value> <operateur> <value>)

où <value> = <number> | <dimension> | <percentage>
```

<ins>Opérateur</ins>:

| Opérateur | Opération      |
|---        |---             |
| +         | Addition       |
| -         | Soustraction   |
| *         | Multiplication |
| /         | Division       |

Toujours entourer les opérateurs d'espaces. Pour la multiplication et la division, la valeur à droite doit être de type &lt;number&gt;

<ins>Exemple</ins>:

``` css
{
  width: calc(100% - 80px);
}
```

### attr()

Permet de récupérer la valeur d'un attribut.  
Ne peut être utilisé que sur la propriété `content`.  
Le support est expérimental sur les autres propriétés.

<ins>Définition</ins>:

``` plain
attr(<attr-name> <unit>)

où <unit> = string | integer | color | url |
            integer | number | length | angle | time | frequency |
            em | ex | px | rem | vw | vh | vmin | vmax |
            mm | q | cm | in | pt | pc |
            deg | grad | rad | ms | s | Hz | kHz | %
```

<ins>Exemple</ins>:

``` css
{
  a:after {
  content: " (" attr(href) ")";
}
```

[JSFiddle attr()](https://jsfiddle.net/amt01/nd6uxt4e/)

---

## Fonctions: gradients

### linear-gradient()

Un *gradient linéaire* (linear-gradient) commence à partir d'un bord de l'élément cible et finit au bord opposé.

<ins>Définition</ins> :

``` plain
linear-gradient([ [ [ <angle> | to [top | bottom] || [left | right] ],]? <color-stop>[, <color-stop>]+);

avec <color-stop> = <color> [ <percentage> | <length> ]?
```

<ins>Usage</ins>:

    (white, black)           Utiliser un gradient qui va de blanc à noir (de haut en bas) en image de fond
    (to top, white, back)    De bas en haut
    (180deg, white, back)    Idem (angle = [-180..180]deg)
    (red,yellow 25px,red)    Placer la couleur jaune à 25px du haut (puisqu'on va de haut en bas)

<ins>Exemple</ins>:

``` css
background: linear-gradient(to right,red,orange,yellow,green,blue,indigo,violet); 
```

![](https://gistcdn.githack.com/a-mt/e8516eba3ea182740ef712d960a46ecd/raw/36de75a84ac4933ed3c3d9c40676a47017c29518/linear-gradient.svg)

### repeating-linear-gradient()

Le *gradient linéaire avec répétition* (repeating-linear-gradient) se répéte indéfiniment sur la largeur.  
Cela permet notamment de créer des motifs.

<ins>Définition</ins>: identique à linear-gradient

<ins>Exemple</ins>:

``` css
background: repeating-linear-gradient(135deg, black, black .25em, white 0, white .75em);
```

![](https://gistcdn.githack.com/a-mt/ae5ee414ed9ee0ddeb66d71615319575/raw/ad6bd644d364b4635452bad47d95a2dcd8171f45/repeating-linear-gradient.svg)

---

### radial-gradient()

Un *gradient radial* (radial-gradient) commence à partir d'un point et s'étend jusqu'aux bords.

<ins>Définition</ins> :

``` plain
radial-gradient(   [ circle || <length> ] [ at <position> ]? ,
                 | [ ellipse || [ <length>  |  <percentage>  ]{2}] [ at  <position>  ]? ,
                 | [ [ circle | ellipse ] || <extent-keyword> ] [ at  <position>  ]? ,
                 | at  <position>  ,
                 <color-stop> [ , <color-stop> ]+ )

avec <extent-keyword> = closest-corner | closest-side | farthest-corner | farthest-side
  et <color-stop> = <color> [ <percentage> | <length> ]?
```

<ins>Usage</ins> :

    (white, black)                  Utiliser un gradient radial qui va de blanc (au centre) à noir (à l'extérieur)
    (circle, white, black)          Utiliser un cercle (ellipse par défaut)
    (black, white 25px, black)      Le cercle blanc a un rayon de 25px
    (black, white 25%, black)       Le cercle blanc est situé à 25% du dégradé (0% = le centre, 100% = le bord)
    (closest-side, white, black)    Le cercle s'arrête dès qu'il touche un bord de l'élément

<ins>Exemple</ins>:

``` css
background: radial-gradient(red,orange,yellow,green,blue,indigo,violet); 
```

![](https://gistcdn.githack.com/a-mt/04ff059e100c4d08155cfa96d1d40110/raw/8b0cf57bf0bd76a2facd627995b5c454bc5955aa/radial-gradient.svg)

### repeating-radial-gradient()

Un *gradial radial avec répétition* (repeating-radal-gradient) se répéte infiniment, toujours à partir d'un point d'origine.

<ins>Définition</ins>: identique à radial-gradient

<ins>Exemple</ins>:

``` css
background: repeating-radial-gradient(black 10px, #009966, purple 50px);
```

![](https://gistcdn.githack.com/a-mt/e6f8e4b864a74095a95e5865836e46e9/raw/b658fa28fba84a9fbe27b6d966a76cb3bf89e6f8/repeating-radial-gradient.svg)

---

## Fonctions: listes

### counter()

Permet de récupérer la valeur d'un counter (incrémenté avec les propriétés `counter-increment`, `counter-reset`).

<ins>Définition</ins>:

``` plain
counter(<name>) | counter(<name>, <style>)
```

<ins>Exemple</ins>:

``` css
h2::before {
  counter-increment: my-sec-counter;
  content: counter(my-sec-counter, upper-roman) ". ";
}
```

### counters()

Retourne la valeur du compteur, avec récursion sur les éléments imbriqués.  
Séparé par le délimiteur donné en 2ème arguemnt

<ins>Définition</ins>:

``` plain
counters(<name>, <delimiter>)
```

<ins>Exemple</ins>:

``` css
.nested div {
  counter-increment: moncounter; 
}
.nested div div:first-child {
  counter-reset: moncounter;
}
.nested div::before {
  content: "DIV " counters(moncounter, ".");
}
```

[JSFiddle counter](https://jsfiddle.net/amt01/h4p6rjaw/)

### symbols()

Permet de créer un nouveau style de puce à la volée [CSS3]  
NB Contraitement à [@counter-style](css-atrules.md#counter-style), les listes de type `additive` et `extends` ne sont pas possible avec cette syntaxe.

<ins>Définition</ins>:

``` plain
list-type: symbols([cyclic | numeric | alphabetic | symbolic | fixed] [ <string> | <image> ]+);
```

<ins>Exemple</ins>:

``` css
{
  list-style: symbols(cyclic "◉" "◌");
}
```

---

## Fonctions: colonnes

### minmax()

Définit la taille minimale et maximale d'une colonne.

<ins>Définition</ins>:

``` plain
minmax(
  <length> | <percentage> | auto,   // min
  <length> | <percentage> | auto,   // max
)
```

<ins>Exemple</ins>:

``` css
{
  grid-template-columns: minmax(60px, 1fr) 100px 1fr;
}
```

[Codepen Expending grid areas](https://codepen.io/a-mt/pen/wppEyb)

### repeat()

Permet de répéter la même colonne plusieurs fois: `repeat(3, 1fr)` est équivalent à `1fr 1fr 1fr`.

<ins>Définition</ins>:

``` plain
repeat(<number> | auto-fit, value)
```

`1fr` indique au navigateur de distribuer l'espace entre les colonnes afin que chaque colonne obtienne une fraction égale de cet espace. Cela veut dire que le contenu sera écrasé sur des petites fenêtres. Spécifier une largeur minimale évite que les colonnes deviennent trop petites. Par défaut, les colonnes ne reviendrons pas à la ligne, cela provoquera un overflow. Pour éviter cela, on peut utiliser `auto-fit`.

<ins>Exemple</ins>:

``` css
{
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
}
```

[Codepen Auto Fit And Minmax](https://codepen.io/kevinpowell/pen/0da463770f21e55ebc1e8ddfb923cfae)

---

## Fonctions: transitions

### cubic-bezier()

La fonction `cubic-bezier()` permet de définir un timing personnalisé pour une transition donnée.  
Les mots clés `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out` sont en fait des [raccourcis pour les courbes bézier](https://developer.mozilla.org//en-US/docs/Web/CSS/timing-function) usuellement utilisées.

``` plain
cubic-bezier(x1,y1,x2,y2)
```

Les coordonnées indiquent les positions des poignées Bezier de début et de fin (entre 0 et 1).  
La courbe créée correspond à l'accélération de l'animation au fil du temps:
* plus la courbe est raide, plus l'animation est rapide
* plus la courbe est plate, plus l'animation est lente
* si la courbe fait des demi-tours, l'animation effectue des rebonds

[Exemples de courbes béziers](http://easings.net)  
[Créer une courbe bézier](http://cubic-bezier.com)

### steps()

La fonction steps permet d'afficher une animation par saccades, ce qui peut permettre de simuler une animation GIF par exemple.

``` plain
steps(<integer>, [start \| end])
```

[JSFiddle steps](https://jsfiddle.net/amt01/3e3o8y0q/)  
[JSfiddle background-image sprite animation](http://jsfiddle.net/simurai/CGmCe/light/)  
[Exemples: clock, cars, paws, progress](https://designmodo.com/demo/stepscss/index.html) 

---

## Valeurs globales

Il existe 4 valeurs globales, qui peuvent être données à toutes les propriété CSS: initial, inherit, unset, revert.

### initial

`initial` (CSS2) applique la *valeur initiale* d'une propriété à un élément.  
La valeur initiale d'une propriété CSS est définie par les spécifications W3C.

``` css
.exemple {
  color: red;
}
.exemple em {
  color: initial; /* couleur initiale de em (black) */
}
```

### inherit

`inherit` (CSS2) applique la valeur calculée de la propriété de l'élément parent.

``` css
p {
  color: #333;
}
a {
  color: red;
}
p a {
  color: inherit; /* #333 */
}
```

### unset

`unset` (CSS3) réinitialise la propriété afin que sa valeur soit la valeur héritée depuis l'élément parent (comme `inherit`) ou sa valeur initiale s'il n'y a pas d'héritage (comme `initial`).

``` css
p {
  color: red;
}
#sidebar p {
  color: unset; /* couleur de #sidebar ou couleur par défaut de p si non définie */
}
```

### revert

`revert` (CSS4) réinitialise la propriété avec la valeur par défaut du navigateur.  
Ne pas confondre `revert` avec `initial`: les navigateurs définissent des valeurs par défaut pour les différents éléments HTML, des valeurs qui sont différentes de la valeur initiale définie par les spécifications CSS.

``` css
.widget {
  all: revert;
}
```