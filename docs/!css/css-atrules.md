---
title: At-rules
category: Web > CSS
---

## @charset

`@charset` définit l'encodage des caractères utilisés dans une feuille de style.  
Cette règle doit être la première règle de la feuille de style (aucun caractère ne doit être écrit avant).

``` css
@charset "utf-8";
```

L'encodage doit correspondre à un nom d'encodage valide pour le web tel que défini dans le [registre IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml).  
Le nom est insensible à la casse.

---

## @import

`@import` permet d'importer des feuilles de styles à l'intérieur d'une feuille de feuille.  
Les imports sont placés en début de fichier.

<ins>Définition</ins> :

``` plain
@import [ <url> | <string> ] <media-query-list>?
```

<ins>Exemples</ins> :

``` css
@import url("mystyle.css");
```

``` css
@import "mystyle.css";
```

``` css
@import url("fineprint.css") print;
```

Pour la plupart des navigateurs, `@import` empêche le chargement de plusieurs feuilles de style en parallèle, ce qui ralentit le chargement de la page. Elle est donc à éviter, sauf dans le cas où on utilise un préprocesseur tel que SASS.

---

## @media (media queries)

`@media` permet de spécifier les conditions à remplir pour exécuter le CSS [CSS3]

<ins>Définition</ins>:

```
@media not|only mediatype and (mediafeature and|or|not mediafeature) {
  CSS-Code;
}
```

Les différents *media types* (types d'appareil) sont :

| Media  | Description                              |
|---     |---                                       |
| all    | Tout type d'appareil (valeur par défaut) |
| print  | Imprimante                               |
| screen | Écran (desktop, mobile)                  |
| speech | Lecteur audio                            |

[Liste des media features](https://www.w3schools.com/cssref/css3_pr_mediaquery.asp)

<ins>Exemple</ins>:

``` css
@media print {
  button { display: none; }
}
```

``` css
@media print and (max-width: 420px) {
  button { display: none; }
}
```

``` css
@media (max-width: 420px) {} /* mobile */
@media (min-width: 421px) and (max-width: 720px) {} /* tablet */
@media (min-width: 721px) {} /* desktop */
```

---

## @supports (feature queries)

`@supports` permet de spécifier des conditions de prise en charge des propriétés à remplir pour exécuter le CSS [CSS3]

<ins>Définition</ins>:

``` plain
@supports <support-condition> [or <support-condition>] [and <support-condition>] {
  <group-rule-body>
}

où <support-condition> = (<property: value>) | not (<property: value>)
```

<ins>Exemple</ins>:

``` css
@supports (display: flex) {
  div {
    display: flex;
  }
}
```

``` css
@supports not (display: flex) {
  div {
    float: right;
  }
}
```

``` css
@supports (display: table-cell) and (display: list-item) {}
```

``` css
@supports (transform-style: preserve) or (-moz-transform-style: preserve) {}
```

---

## @namespace

`@namespace` définit les espaces de noms XML utilisés dans une feuille de style CSS, avec un espace de noms par défaut suivit d'une liste d'espaces de noms avec préfixes.

Les règles `@namespace` doivent suivre les règles `@charset` et `@import` et précéder les autres at-rules ainsi que les déclarations de style contenus dans la feuille de style.

Un fois déclaré, un espace de nom peut être utilisé pour restreindre un sélecteur afin que celui-ci ne sélectionne que les éléments contenus dans cet espace de nom. L'espace de nom est séparé du sélecteur par un pipe (`|`).

``` css
a {}       /* cible les éléments XHTML <a> (XHTML est l'espace de nom par défaut) */
svg|a {}   /* cible les éléments SVG <a> */
*|a {}     /* cible tous les éléments <a> (XHTML et SVG )*/
```

<ins>Définition</ins>:

``` plain
@namespace <namespace-prefix>? [ <string> | <url> ];
```

<ins>Exemple</ins>:

``` css
@namespace "http://www.w3.org/1999/xhtml";
@namespace svg "http://www.w3.org/2000/svg";
@namespace math "http://www.w3.org/1998/Math/MathML";
```

---

## @page

`@page` permet de modifier les marges, le comportement des lignes orphelines et veuves ainsi que les sauts de page lorsqu'on imprime la page [CSS2]

<ins>Définition</ins>:

``` plain
@page [:first || :left || :right || :blank] {
  <(regular css properties) ||
  page-break-before || page-break-after || page-break-inside ||
  orphans || widows>
}
```

Les propriétés suivantes s'appliquent à l'intérieur d'une at-rule `@page`.

* `orphans`  
  Définit le nombre minimum de lignes pouvant rester en bas d'une page, région ou colonne [CSS2]  
  2 par défaut

  ``` plain
  orphans: <integer>
  ```

* `widows`  
  Définit le nombre minimum de lignes pouvant être laissées en haut de la page, région ou colonne [CSS2]  
  2 par défaut

  ``` plain
  widows: <integer>
  ```

* `page-break-inside`  
  Ajuste la façon dont sont appliqués les sauts de page au sein de l'élément courant [CSS2]

  ``` plain
  page-break-inside: avoid | auto
  ```

* `page-break-before`  
  Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant [CSS2]

  ``` plain
  page-break-before: auto | always | avoid | left | right
  ```

  | Valeur   | Description
  |---       |---
  | `auto`   | Valeur initiale. Les sauts de page sont automatiques
  | `always` | Le saut de page est toujours forcé avant l'élément
  | `avoid`  | Les saut de page sont évités avant l'élément
  | `left`   | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page gauche.
  | `right`  | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page droite.

* `page-break-after`  
  Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant [CSS2]

  ``` plain
  page-break-after: auto | always | avoid | left | right
  ```

<ins>Exemple</ins>:

``` css
@page {
  div.note { 
    page-break-before: avoid;
  }
}
```

Depuis CSS3 on peut également cibler les zones de marge, comme les headers et les footers, pour y ajouter du contenu généré.

``` css
@page {
  color: red;
  @top-center {
    content: "Page " counter(page);
  }
}
```

| Cible                                            | Emplacement
|---                                               |---
| @top-left-corner <br> @top-left <br> @top-center <br> @top-right <br> @top-right-corner | ![](https://i.imgur.com/lpIfPOf.png)
| @left-top <br> @left-middle <br> @left-bottom    | ![](https://i.imgur.com/ccfoF9u.png)
| @right-top <br> @right-middle <br> @right-bottom | ![](https://i.imgur.com/3SdTCM9.png)
| @bottom-left-corner <br> @bottom-left <br> @bottom-center <br> @bottom-right <br> @bottom-right-corner | ![](https://i.imgur.com/1hA6zpK.png)

---

## @viewport

Ce module reprend les principes de base de la meta `viewport` mais en respectant les normes d'écriture de CSS.

``` html
// en HTML 
<meta name="viewport" content="width=device-width,initial-scale=1" /> 
```

``` css
// en CSS 
@viewport { 
  width: device-width; 
  zoom: 1; 
}
```

Les propriétés suivantes peut être appliquées à l'intérieur d'une at-rule `@viewport`:

* `min-width`  
  Définit la largeur minimale du viewport [CSS3]

  ``` plain
  min-width: <length> | <percent>
  ```

* `max-width`  
  Définit la largeur maximale du viewport [CSS3]

  ``` plain
  max-width: <length> | <percent>
  ```

* `width`  
  Raccourcis permettant de définir la largeur minimale et maximale du viewport [CSS3]

  ``` plain
  width: [<length> | <percent>]{1,2}
  ```

* `min-height`  
  Définit la hauteur minimale du viewport [CSS3]

  ``` plain
  min-height: <length> | <percent>
  ```

* `max-height`  
  Définit la hauteur maximale du viewport [CSS3]

  ``` plain
  max-height: <length> | <percent>
  ```

* `height`  
  Raccourcis permettant de définir la hauteur minimale et maximale du viewport [CSS3]

  ``` plain
  height: [<length> | <percent>]{1,2}
  ```

* `zoom`  
  Définit le zoom initiale [CSS3]

  ``` plain
  zoom: <number> | <percent>
  Pour aucun zoom: 1.0 ou 100%
```

* `min-zoom`  
  Définit le niveau de zoom minimal [CSS3]

  ``` plain
  min-zoom: <number> | <percent>
  ```

* `max-zoom`  
  Définit le niveau de zoom maximal [CSS3]

  ``` plain
  max-zoom: <number> | <percent>
  ```

* `user-zoom`  
  Définit si l'utilisateur peut changer le niveau de zoom ou non [CSS3]

  ``` plain
  user-zoom: zoom | fixed
  ```

* `orientation`  
  Définit l'orientation du document [CSS3]

  ``` plain
  orientation: portrait | landscape | auto
  ```

---

## @font-face

Le navigateur peut télécharger automatiquement une police qui n'est pas installée si on lui indique où la trouver avec `@font-face`.

<ins>Définition</ins>:

```
 @font-face {
  font-family: <string>;
  src: <src-list>;
}
```

* `src`  
  Définit l'emplacement de la police  
  Différents emplacements peuvent être ajoutés, séparés par des virgules [CSS3]

  ``` plain
  src: local(<family-name>)
        | <url> format(<string>)
  ```

  Le navigateur parcours la liste de ressources disponibles dans l'ordre et utilise la première qui marche.  
  Ainsi, la première instruction donnée est généralement de vérifier si la police est installée localement (`local()`).  

* `unicode-range`  
  Définit l'intervalle de caractères de la police [CSS3]

  ``` plain
  unicode-range: <unicode-range>
  ```

Les autres propriétés également acceptées dans le block `@font-face` sont :
- `font-variant`
- `font-variation-settings`
- `font-feature-settings`
- `font-stretch`
- `font-weight`
- `font-style`
- `font-feature-settings`

<ins>Formats de police</ins>:  
Différents navigateurs supportent différents formats de police.

| Extension | Format               | Utilisé par                                    |
|---        |---                   |---                                             |
| .woff     | Web Open Font Format | Les navigateurs modernes                       |
| .eot      | Embedded Open Type   | Les anciennes versions d'IE                    |
| .svg      | SVG fonts            | Les anciennes versions d'iOS Safari (3.2-4.1)  |
| .ttf      | Truetype fonts       | Les anciennes versions du navigateur d'Android |

<ins>Exemple</ins>:

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

``` css
/* latin-ext */
@font-face {
  font-family: 'Source Serif Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Serif Pro'),
       local('SourceSerifPro-Regular'),
       url(https://fonts.gstatic.com/s/sourceserifpro/v6/neIQzD-0qpwxpaWvjeD0X88SAOeauXo-oBOL.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Source Serif Pro';
  font-style: normal;
  font-weight: 400;
  src: local('Source Serif Pro'),
       local('SourceSerifPro-Regular'),
       url(https://fonts.gstatic.com/s/sourceserifpro/v6/neIQzD-0qpwxpaWvjeD0X88SAOeauXQ-oA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

[Exemple avec une WebFont de Google (Roboto)](http://fonts.googleapis.com/css?family=Roboto)  
[Générateur de @font-face](https://www.fontsquirrel.com/tools/webfont-generator)  
[local('☺')](https://stackoverflow.com/questions/3698319/css-font-face-what-does-src-local-mean#22835957)

---

## @font-feature-values

Une police peut avoir des glyphes supplémentaires en plus des glyphes par défaut pour un caractère donné, par exemple des alternatives stylistiques ou des swash.

![](https://i.imgur.com/gPKbv0e.png)

`@font-feature-values` permet de créer un nom pour la fonctionnalité d'une police [CSS3].  
Cela permet de simplifier les feuilles de style lorsqu'on utilise plusieurs polices.

<ins>Définition</ins>:

``` plain
@font-feature-values <family-name> {
  @stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation {
    <name>: <integer>;
  }
}
```

<ins>Type de fonctionnalité</ins>:

| Type               | Valeur OpenType | Description |
|---                 |---              |---          |
| historical-forms   | hist            | Formes historiques |
| stylistic          | salt            | Formes stylistiques alternatives |
| styleset           | ss##            | Ensemble de caractères d'un style alternatif |
| character-variant  | cv##            | Semblable à styleshet mais les caractères peuvent avoir un style indépendant |
| swash              | swsh, cswh      | Glypes pour les lettres ornées |
| ornaments          | ornm            | Ornements tels que les fleurons et autres casseaux |
| annotation         | nalt            | Annotations (telles que les chiffres entourés ou les caractères inversés) |

<ins>Exemple</ins>:

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

[JsFiddle @font-feature-values](https://jsfiddle.net/amt01/1vh9mfq4/)

<ins>Plus d'infos</ins>:

* [Support navigateur des fonctionnalités](https://github.com/quitequinn/Font-Feature-Support)
* Liste imagée de fonctionnalités:
  - [OpenType features in CSS](https://www.typotheque.com/articles/opentype_features_in_css)  
  - [Syntaxe des fonctionnalités OpenType en CSS](https://helpx.adobe.com/fr/typekit/using/open-type-syntax.html)  
  - [List of typographic features](https://en.wikipedia.org/wiki/List_of_typographic_features)

* Trouver la liste des fonctionnalités d'une police
  * FontForge: Élements > Infos Fonte > Lookups  
  * [font-infos.herokuapp.com](http://font-infos.herokuapp.com/)

* [Trouver une police avec une fonctionnalité donnée](https://font-infos.herokuapp.com/list)

---

## @counter-style

`@counter-style` permet de définir de nouveaux styles de compteurs [CSS3]  

<ins>Définition</ins>:

``` plain
@counter-style <counter-style-name> {
  system
  symbols
  additive-symbols
  prefix
  suffix
  pad
  negative
  range
  speak-as
  fallback
}
```

* `system`  
  Définit l'algorithme à utiliser pour convertir l'index en symbole [CSS3]

  ``` plain
  system: cyclic | numeric | alphabetic | symbolic |
          fixed <integer>? | additive | extends <counter-style-name>
  ```

  | Valeur     | Description
  |---         |---
  | cyclic     | Reprend au début quand la fin de la liste est atteinte
  | fixed      | Utilise le système de secours quand la fin de la liste est atteinte. On peut éventuellement définir la valeur du premier symbole (1 par défaut)
  | symbolic   | À chaque boucle, le caractère affiché est doublé, triplé, etc.
  | alphabetic | Utilise une numérotation alphanumérique (a, b, c, aa, ab, ac, ba, bb, bc)
  | numeric    | Utilise une numérotation numérique (1, 10, 11, 100, 110, 110, 111)
  | additive   | Utilise une numérotation additive ()
  | extends    | Utilise une numérotation déjà définie. Permet de modifier rapidement un style de liste pré-existant

* `symbols`  
  Définit la liste de symboles à utiliser, séparés par des espaces [CSS3]

  ``` plain
  symbols: (<string> | <image>)+
  ```

* `additive-symbols`  
  Définit la liste des symboles à utiliser et leur poids (pour un system de type additive) [CSS3]

  ``` plain
  additive-symbols: (<integer> (<string> | <image>))+
  ```

* `prefix`  
  Définit le préfixe à ajouter avant le symbole [CSS3]

  ``` plain
  prefix: <string> | <image>
  ```

* `suffix`  
  Définit le suffixe à ajouter après le symbole [CSS3]

  ``` plain
  suffix: <string> | <image>
  ```

* `negative`  
  Définit le préfixe & suffixe à utiliser pour les index négatifs (se cumule au préfixe et suffixe normal) [CSS3]

  ``` plain
  negative: (<string> | <image>){1,2}
  ```

* `range`  
  Définit l'intervalle de valeurs pris en compte par le counter [CSS3]

  ``` plain
  range: (<integer> | infinite){2};
  ```

  Par défaut
  - pour cyclic, numeric et fixed : `infinite infinite`
  - pour alphabetic et symbolic : `1 infinite`
  - pour additive : `0 infinite`

* `pad`  
  Définit la longueur de la numérotation et quel symbole utiliser pour compléter la chaîne (= str_pad) [CSS3]  
  Permet de exemple d'afficher tous les nombres sur 2 chiffres

  ``` plain
  pad: <integer> (<string> | <image>)
  ```

* `speak-as`  
  Définit la représentation sonore de la liste [CSS3]

  ``` plain
  speak-as: <auto | bullets | numbers | words | spell-out>
  ```

* `fallback`  
  Définit le style de secours pour le system fixed [CSS3]

  ``` plain
  fallback: <counter-style-name>
  ```

<ins>Exemple</ins>:

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

[JSfiddle @counter-style](https://jsfiddle.net/amt01/xhtobcs4/)

---

## @keyframes

`@keyframes` crée une animation [CSS3]  
Pour ce faire, on liste tous les changements et transformations que va subir l'élément auquel sera assigné l'animation.

<ins>Définition</ins>:

``` plain
@keyframes <string> {
  (from | to | <percentage>) {
      <declaration-list>
  }+
}
```

<ins>Exemple</ins>:

``` css
@keyframes myAnimation {
  from { color:black; }
  50% { color: red; }
  to { color:black; }
}
```