---
title: Types CSS
category: Web > CSS
---

## Chaîne de caractère (&lt;string&gt;)

Une chaîne de caractère peut être écrite entre simple ou double quotes. Les quotes peuvent être échappées d'un backslash.

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

## Couleur (&lt;color&gt;)

CSS accepte différentes manières de spécifier la couleur

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

<sup>(2)</sup> On peut utiliser une version abbrégée #RGB[A]  
&emsp; Par exemple <code>#F9A</code> = <code>#FF99AA</code>

<sup>(3)</sup> H = Hue (teinte sur une palette circulaire de 0 à 360)  
&emsp; S = Saturation (100% flashy, 0% gris)  
&emsp; L = Luminosité (100% blanc, 50% couleur, 0% noir)  
&emsp; On peut facilement trouver une couleur plus foncé/pâle, plus flashy/mate, la couleur complémentaire (hue +180), etc.  
&emsp; <a href="https://codepen.io/iamvdo/pen/vBlxt">Codepen HSL</a>

[Doc MDN type &lt;color&gt;](https://developer.mozilla.org/fr/docs/Web/CSS/Type_color)

---

## Angle (&lt;angle&gt;)

Différentes unités sont possibles pour exprimer un angle

| Unité | Cercle complet         | Angle plat             | Angle droit            | Version |
|---    |---                     |---                     |---                     |---      |
| deg   | <code>360deg</code>    | <code>180deg</code>    | <code>90deg</code>     | [CSS3]  |
| grad  | <code>400grad</code>   | <code>200grad</code>   | <code>100grad</code>   | [CSS3]  |
| rad   | <code>6.2832rad</code> | <code>3.1416rad</code> | <code>1.5708rad</code> | [CSS3]  |
| turn  | <code>1turn</code>     | <code>0.5turn</code>   | <code>0.25turn</code>  | [CSS3]  |

Les valeurs peuvent être positives (sens horaire) ou négatives (sens anti-horaire).

---

## Durée (&lt;time&gt;)

Les durées peuvent être exprimées en secondes ou en millisecondares.

<ins>Définition</ins> :

``` plain
<time>: <number|real>s | <number>ms
```

<ins>Exemples</ins> : 1s, .5s, 500ms

---

## Taille absolue (&lt;absolute-size&gt;)

Taille absolue, définie par le navigateur

<ins>Définition</ins> : <code>xx-small | x-small | small | medium | large | x-large | xx-large</code>  
<ins>Exemple</ins> : <code>font-size: x-small</code>

## Taille relative (&lt;relative-size&gt;)

Taille relative au parent.

<ins>Définition</ins> : <code>smaller | larger</code>  
<ins>Exemple</ins> : si la taille du parent vaut <code>x-small</code>, <code>font-size: smaller</code> équivaut à <code>xx-small</code>

## Pourcentage (&lt;percentage&gt;)

La taille est calculée en pourcentage de la taille du parent.

<ins>Définition</ins> : <code>&lt;number&gt;%</code>  
<ins>Exemple</ins> : <code>font-size: 200%</code>

## Nombre (&lt;number&gt;)

Si aucune unité n’est donnée, le nombre est un coefficient multiplicateur par rapport à la taille de police en cours.

<ins>Définition</ins> : <code>&lt;number&gt;</code>  
<ins>Exemple</ins> : <code>line-height: 2</code>

## Longueur (&lt;length&gt;)

Taille relative à la résolution de l’écran

<ins>Définition</ins> : <code>&lt;number&gt;&lt;unit&gt;</code>  
<ins>Exemple</ins> : <code>font-size: 14px</code>

### Unités absolue

| Unit | Nom         | Description |
|---   |---          |---          |
| in   | inches      | Valeur absolue quel que soit le media en cours. Utilisée pour l'impression, de la même manière que cm, mm, q, pt et pc. |
| cm   | centimers   | 1in = 2.54cm |
| mm   | millimeters | 1in = 25.4mm |
| q    | quarter millimeters | 1q = 4mm |
| pt   | points      | 1in = 72pt |
| pc   | picas       | 1in = 6pc |
| px   | pixels      | La taille d'1px dépend du media en cours et de sa résolution |

L'unité px est définie pour être 'petite mais visible', et de telle façon qu'une ligne horizontale de 1px de largeur peut être affichée de façon nette, sans 'arête' (ni anti-aliasing). 

### Unités relatives

| Unit | Nom        | Description |
|---   |---         |---          |
| em   | ems        | Largeur de la lettre m (minuscule) de la police. <br>0.8em = 80% de la taille de police du parent |
| rem  | root ems   | Largeur de la lettre m (minuscule) de la police. <br>0.8rem = 80% de la taille de police de &lt;html&gt; |
| ex   | exes       | Hauteur de la lettre x (minuscule) de la police. <br>0.8ex = 80% de la taille de police du parent |
| ch   | characters | Largeur de la lettre 0 |
| vw   | viewport width  | Équivaut à 1/100e de la largeur de la fenêtre    |
| vh   | viewport height | Équivaut à 1/100e de la hauteur de la fenêtre    |
| vmin | viewport min    | Sélectionne la plus petite valeur entre vw et vh |
| vmax | viewport max    | Sélectionne la plus grande valeur entre vw et vh |

## Resolution (&lt;resolution&gt;)

| Unit | Nom                 | Description      |
|---   |---                  |---               |
| dpi  | dots per inch       | 1dpi ≈ 0,39 dpcm |
| dpcm | dots per centimeter | 1dpcm ≈ 2,54 dpi |
| dppx | dots per px         | 1dppx ≈ 96 dpi   |

Un écran compte habituellement 72 ou 96 dpi, tandis qu'un document imprimé en compte généralement un nombre beaucoup plus élevé. 

---

## Image (&lt;image&gt;)

Certaines propriétés, comme `background`, `list-style-image`, `border-image` et `content`, peuvent prendre une image pour valeur.

| Description       | Exemple                                             | Version |
|---                |---                                                  |---      |
| Gradient          | <code>background: linear-gradient(blue, red)</code> | [CSS3]  |
| Uri d'une d'image | <code>background: url(test.jpg)</code>              | [CSS1]  |

---

## URL (&lt;uri&gt;)

La valeur passée à `url()` peut être
* une URL absolue

  ``` css
  url("http://monsite.com/images/monimage.png")
  ```

* une URL relative à l'emplacement du fichier CSS en cours

  ``` css
  url("../images/monimage.png")
  ```

* le code base64 d'une image

  ``` css
  url(data:image/png;base64,iVBORw0KGg=...)
  ```

  [Générer le code base64 d'une image](http://b64.io/)

---

## Gradient (&lt;gradient&gt;)

Les gradients sont des images générées par le navigateur qui affichent des dégradés de couleur.  
[Exemples de gradients](https://jsfiddle.net/amt01/p2koxpkq/)

<ins>Ressources utiles</ins> :

- [Snippets de boutons avec gradient](http://demo.themezilla.com/blox/zilla-shortcodes/)
- [Éditeur de gradient](http://www.colorzilla.com/gradient-editor/)
- [Gallerie de motifs via gradients](http://lea.verou.me/css3patterns/)

### Linear-gradient

Un gradient linéaire commence à partir d'un bord de l'élément cible et finit au bord opposé.

``` css
background: linear-gradient(to right,red,orange,yellow,green,blue,indigo,violet); 
```

![](https://rawgit.com/a-mt/e8516eba3ea182740ef712d960a46ecd/raw/36de75a84ac4933ed3c3d9c40676a47017c29518/linear-gradient.svg)

<ins>Définition</ins> :

``` plain
linear-gradient([ [ [ <angle> | to [top | bottom] || [left | right] ],]? <color-stop>[, <color-stop>]+);

avec <color-stop> = <color> [ <percentage> | <length> ]?
```

<ins>Exemples</ins> :

    (white, black)           Utiliser un gradient qui va de blanc à noir (de haut en bas) en image de fond
    (to top, white, back)    De bas en haut
    (180deg, white, back)    Idem (angle = [-180..180]deg)
    (red,yellow 25px,red)    Placer la couleur jaune à 25px du haut (puisqu'on va de haut en bas)

### Repeating-linear-gradient

Le gradient linéaire avec répétition se répéte indéfiniment sur la largeur. Cela permet notamment de créer des motifs.

``` css
background: repeating-linear-gradient(135deg, black, black .25em, white 0, white .75em);
```

![](https://rawgit.com/a-mt/ae5ee414ed9ee0ddeb66d71615319575/raw/ad6bd644d364b4635452bad47d95a2dcd8171f45/repeating-linear-gradient.svg)

Même définition que linear-gradient

<ins>Exmple</ins> :

    (45deg,black,white 10px)    Crée des rayures noires et blanches

### Radial-gradient

Un gradient radial commence à partir d'un point et s'étend jusqu'aux bords.

``` css
background: radial-gradient(red,orange,yellow,green,blue,indigo,violet); 
```

![](https://rawgit.com/a-mt/04ff059e100c4d08155cfa96d1d40110/raw/8b0cf57bf0bd76a2facd627995b5c454bc5955aa/radial-gradient.svg)

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

<ins>Exemples</ins> :

    (white, black)                  Utiliser un gradient radial qui va de blanc (au centre) à noir (à l'extérieur)
    (circle, white, black)          Utiliser un cercle (ellipse par défaut)
    (black, white 25px, black)      Le cercle blanc a un rayon de 25px
    (black, white 25%, black)       Le cercle blanc est situé à 25% du dégradé (0% = le centre, 100% = le bord)
    (closest-side, white, black)    Le cercle s'arrête dès qu'il touche un bord de l'élément

### Repeating-radial-gradient

Un gradial radial avec répétition se répéte infiniment, toujours à partir d'un point d'origine.

``` css
background: repeating-radial-gradient(black 10px, #009966, purple 50px);
```

![](https://rawgit.com/a-mt/e6f8e4b864a74095a95e5865836e46e9/raw/b658fa28fba84a9fbe27b6d966a76cb3bf89e6f8/repeating-radial-gradient.svg)

Même définition que radial-gradient

<ins>Exemple</ins> :

    (black 10px, #009966, purple 50px)    Crée de multiples cercles qui irradient du centre
