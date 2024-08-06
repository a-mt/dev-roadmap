---
title: Types
category: Web, CSS, Valeurs
---

## string

* <ins>Exemple</ins>:

  ``` css
  nav li:not(:first-child)::before {
    content: " / ";
  }
  ```

* Une *chaîne de caractère* (string) peut être écrite entre simple ou double quotes.  
  Les quotes peuvent être échappées d'un backslash.

  ``` css
  "this is a 'string'"
  "this is a \"string\""
  'this is a "string"'
  'this is a \'string\''
  ```

* Pour ajouter un retour chariot, il est nécessaire d'utiliser un caractère spécial: "\A" en ISO-10646.

  ``` css
  "Chaîne avec une \Anouvelle ligne"
  ```

* Il est possible de couper une chaîne de caractère en plusieurs lignes, pour des raisons esthétiques, en utilisant le backslash :

  ``` css
  "Une grande chaîne \
  de caractères"
  ```

* On peut parfois omettre les quotes.  
  Tant qu'il n'y pas de parenthèses, virgules, espaces ou quotes à l'intérieur de la chaîne de caractère.  

  ``` css
  font-family: Monospace,
  background: url(path/img.png),
  ```
  ``` css
  font-family: "Times New Roman";
  background: url("img/(1).png");
  ```

---

## color

* <ins>Exemple</ins>:

  ``` css
  div.success {
      background-color: green;
  }
  ```

* CSS accepte différentes manières de spécifier la *couleur*:

  | Exemple                                     | Decription                                    | Format général   | Version |
  |---                                          |---                                            |---               |---      |
  | <code>color: red;</code>                    | Un [nom de couleur](https://www.w3schools.com/colors/colors_names.asp) | NAME | [CSS1]  |
  | <code>color: transparent;</code>            | Élément totalement transparent                | transparent      | [CSS3]  |
  | <code>border: 1px solid currentColor</code> | La couleur de texte actuelle                  | currentColor     | [CSS3]  |
  | <code>color: rgb(255, 0, 0);</code>         | Un code RGB                                   | rgb(R, G, B)     | [CSS1]  |
  | <code>color: rgba(255, 0, 0, 0.5);</code>   | Un code RGB avec canal alpha                  | rgba(R, G, B, A) | [CSS3]  |
  | <code>color: #FF99AA;</code>                | Un code hexadecimal                           | #RRGGBB          | [CSS1]  |
  | <code>color: #F9A;</code>                   | Un code hexadecimal, abbrégé                  | #RGB             | [CSS1]  |
  | <code>color: #FF003388;</code>              | Un code hexa avec transparence                | #RRGGBBAA        | [CSS4]  |
  | <code>color: #F038;</code>                  | Un code hexa avec transparence, abbrégé       | #RGBA            | [CSS4]  |
  | <code>color: hsl(0, 100%, 50%);</code>      | Un code HSL                                   | hsl(H, S, L)     | [CSS3]  |
  | <code>color: hsl(0, 100%, 50%, 0.5)</code>  | Un code HSL avec transparence                 | hsla(H, S, L, A) | [CSS3]  |

  * Note: On utiliser le code HSL pour facilement trouver des [couleurs qui vont bien ensemble](https://codepen.io/iamvdo/pen/vBlxt) — couleur plus foncé/pâle, plus flashy/mate, complémentaire (hue +180), etc.    
    - H (*Hue*): teinte sur une palette circulaire de 0 à 360
    - S (*Saturation*): 100%=flashy, 0%=gris
    - L (*Luminosité*): 100%=blanc, 50%=couleur, 0%=noir

  [Documentation: MDN type &lt;color&gt;](https://developer.mozilla.org/fr/docs/Web/CSS/Type_color)

---

## angle

* <ins>Exemple</ins>:

  ``` css
  .on-hover-rotate:hover {
    transform: rotateY(360deg);
  }
  ```

* Les valeurs peuvent être positives (sens horaire) ou négatives (sens anti-horaire)

* Différentes unités sont possibles pour exprimer un *angle*;

  | Unité | Cercle complet         | Angle plat             | Angle droit            | Version |
  |---    |---                     |---                     |---                     |---      |
  | deg   | <code>360deg</code>    | <code>180deg</code>    | <code>90deg</code>     | [CSS3]  |
  | grad  | <code>400grad</code>   | <code>200grad</code>   | <code>100grad</code>   | [CSS3]  |
  | rad   | <code>6.2832rad</code> | <code>3.1416rad</code> | <code>1.5708rad</code> | [CSS3]  |
  | turn  | <code>1turn</code>     | <code>0.5turn</code>   | <code>0.25turn</code>  | [CSS3]  |

---

## time

* <ins>Exemple</ins>:

  ``` css
  .on-hover-rotate {
    transition: all 2s ease;
  }
  ```

* Les *durées* (time) peuvent être exprimées en secondes ou en millisecondes — ex: 1s, .5s, 500ms.

  ``` plain
  <time>: <number>s | <real>s | <number>ms
  ```

---

## absolute-size

* <ins>Exemple</ins>:

  ``` css
  p {
    font-size: x-small;
  }
  ```

* Une *taille absolue* (absolute-size) est une taille définie par le navigateur.

  ```
  <absolute-size>: xx-small | x-small | small | medium | large | x-large | xx-large
  ```


## relative-size

* <ins>Exemple</ins>:

  ``` css
  p {
    font-size: x-smaller;
  }
  ```

* Une *taille relative* (relative-size) est une taille qui agrandit ou réduit la taille absolue du parent.  
  Par exemple: si la taille absolue du parent vaut <code>x-small</code>, alors <code>font-size: smaller</code> équivaut à <code>xx-small</code>

  ```
  <relative-size>: smaller | larger
  ```

## percentage

* <ins>Exemple</ins>:

  ``` css
  p {
    font-size: 200%;
  }
  ```

* Un *pourcentage* (percentage) est une taille calculée en pourcentage de la taille du parent.

  ```
  <percentage> = <number>%
  ```

## number

* <ins>Exemple</ins>:

  ``` css
  p {
    line-height: 2;
  }
  ```

* Si aucune unité n’est donnée, un *nombre* (number) est un coefficient multiplicateur par rapport à la taille de police en cours.

---

## length

* <ins>Exemple</ins>:

  ``` css
  p {
    font-size: 14px;
  }
  ```

* Une *longueur* (length) est une taille relative à la résolution de l’écran.

  ```
  <length> = <number><length-unit>
  ```

### length-unit

Il existe des unités de longueur relatives et absolues:

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

## resolution

* <ins>Exemple</ins>:

  ``` css
  @media print and (min-resolution: 300dpi) { ... } 
  ```

* La *résolution* (resolution) est la densité de pixels d'un appareil.  
  Un écran compte habituellement 72 ou 96 dpi, tandis qu'un document imprimé compte généralement une résolution beaucoup plus élevée. 
  Elle peut être utilisée dans les media queries.

  ```
  <resolution> = <number><resolution-unit>
  ```

### resolution-unit

| Unité | Nom                 | Description      |
|---   |---                  |---               |
| dpi  | dots per inch       | 1dpi ≈ 0,39 dpcm |
| dpcm | dots per centimeter | 1dpcm ≈ 2,54 dpi |
| dppx | dots per px         | 1dppx ≈ 96 dpi   |

---

## image

* <ins>Exemple</ins>:

  ``` css
  p {
    background: url(test.jpg);
  }
  ```
  ``` css
  p {
    background: linear-gradient(blue, red);
  }
  ```

* Certaines propriétés peuvent prendre une *image* pour valeur.  
  C'est le cas de `background`, `list-style-image`, `border-image` et `content`.

  ```
  <image> = <uri> | <gradient>
  ```

  - Une *uri* se déclare avec la fonction url [CSS1]  
  - Un *gradient* (degradé) est généré par le navigateur grâce à une des 4 fonctions de gradient [CSS3]  
