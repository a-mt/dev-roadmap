---
title: Sass
category: Web
---

Sass (*Syntactically Awesome Stylesheets*) est un langage de génération de CSS.  
Sass ajoute des fonctionnalités à CSS, comme l'ajout de variables, de fonctions, d'opérations mathématiques. Tout CSS est du code Sass valide. 
Les fichiers Sass une fois compilés sont des fichiers CSS classiques.

## Pourquoi utiliser Sass

CSS est un langage conçu pour être simple: on applique des propriétés/valeurs aux éléments HTML pour modifier leur apparence. 
Mais cette simplicité peut devenir problématique
- les propriétés et valeurs sont répétées
- changer de couleurs, polices, taille de police, etc, est fastidieux
- la taille de la feuille de style peut devenir ingérable

## SCSS vs SASS

Il existe deux extensions de fichiers Sass pour deux variations de la syntaxe :
- `.scss` est l'extension de fichier par défaut

  ``` scss
  $font-stack:    Helvetica, sans-serif;
  $primary-color: #333;

  body {
    font: 100% $font-stack;
    color: $primary-color;
  }
  ```

- `.sass` est une variation indentée et sans point-virgule

  ``` sass
  $font-stack:    Helvetica, sans-serif
  $primary-color: #333

  body
    font: 100% $font-stack
    color: $primary-color
  ```

Toutes les fonctionnalités sont identiques entre un fichier .scss et un fichier .sass, seule change la présentation.


## Installer

Pour installer un préprocesseur Sass, [voir la doc Sass](http://sass-lang.com/install).  
On peut également utiliser Webpack.

---

## Commentaires

Les commentaires Sass ne sont pas présents dans le fichier compilés.

``` scss
// single line comment
```
---

## Importer des fichiers: @import

L'instruction `@import` permet de modulariser le CSS.  
Bien qu'elle existe officiellement dans la syntaxe CSS, cette instruction a historiquement été évitée à cause du manque de performance qu'elle implique (le fait que le navigateur ait à télécharger les fichiers CSS importés ralentit le chargement de la page).
Avec Sass, l'instruction `@import` est executée au moment de la compilation, les fichiers sont directement ajoutés au fichier CSS généré, ce qui résout ce problème.

L'extension du fichier est optionnelle, les fichiers `.scss` et `.sass` seront cherchés.

``` scss
@import buttons
```

## Partials

Pour éviter que les fichiers Sass importés dans d'autres fichiers soient compilés en fichier CSS par le compilateur, on préfixe le nom du fichier par `_` (underscore). 
Ces fichiers peuvent être importés mais ne ils ne générent de fichier CSS eux-même.

``` txt
_buttons.scss
```

---

## Structure

Les sélecteurs peuvent être imbriqués

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.content {
    border: 1px solid #ccc;
    h2 {
        font-size: 3em;
    }
}</pre></td><td><pre lang="css">.content {
    border: 1px solid #ccc;
}
.content h2 {
    font-size: 3em;
}</pre></td></tr></tbody>
</table>

Certaines propriétés peuvent également être imbriquées

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.btn {
    text: {
        decoration: underline;
        transform: lowercase;
    }
}</pre></td><td><pre lang="css">.btn {
    text-decoration: underline;
    text-transform: lowercase;
}</pre></td></tr></tbody>
</table>

### & (parent)

Le symbole `&` permet de désigner le sélecteur parent, par exemple pour ajouter des conditions à la sélection

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.content {
    border: 1px solid #ccc;
    &.callout {
        border-color: green;
    }
}</pre></td><td><pre lang="css">.content {
    border: 1px solid #ccc;
}
.content.callout {
    border-color: green;
}</pre></td></tr></tbody>
</table>

Des sélecteurs peuvent être ajoutés devant `&`

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.sidebar {
    float: right;
    width: 300px;
    .users & {
        width: 400px;
    }
}</pre></td><td><pre lang="css">.sidebar {
    float: right;
    width: 300px;
}
.users .sidebar {
    width: 400px;
}</pre></td></tr></tbody>
</table>

Pour plus de lisibilité et de performance, il est préférable d'éviter d'imbriquer plus de 3 ou 4 niveaux (refactoriser le code si nécessaire).

---

## Variables

Les variables Sass commençent par `$`, par exemple `$base`.

``` scss
$base: #777777;

.sidebar {
    border: 1px solid $base;
}
```

### Flag !default

Si une variable est définie deux fois, la deuxième assignation écrase la première. Pour éviter ça, le flag `!default` peut être utilisé.

``` scss
$title: "My Blog";
$title: "About Me" !default;

h2:before {
    content: $title;
}
```

C'est particulièrement utile lorsqu'on utilise des partials, lesquelles peuvent définir ainsi des variables par défaut que l'on peut redéfinir dans le fichier qui l'inclut.

``` scss
$radius: 5px;

@import "buttons";
```

### Types de données

Plusieurs types de données sont supportés

<table>
  <tr>
    <th align="left">Booléens</th>
    <td><pre lang="scss">$rounded: false;
$shadow: true;</pre></td>
  </tr>
  <tr>
    <th align="left">Nombres</th>
    <td>Avec ou sans unités <pre lang="scss">$rounded: 4px;
$line-height: 1.5;
$font-size: 3rem;</pre></td>
  </tr>
  <tr>
    <th align="left">Couleurs</th>
    <td><pre lang="scss">$base: purple;
$border: rgba(0,255,0,0.5);
$shadow: #333;</pre></td>
  </tr>
  <tr>
    <th align="left">Chaînes de caractère</th>
    <td>Avec ou sans quotes <pre lang="scss">$header: "Helvetica Neue";
$callout: Arial;
$message: "Loading...";</pre></td>
  </tr>
  <tr>
    <th align="left">Listes</th>
    <td><pre lang="scss">$authors: nick, dan, aimee, drew;
$margin: 40px 0 20px 100px;</pre></td>
  </tr>
  <tr>
    <th align="left">Valeur vide</th>
    <td><pre lang="scss">$shadow: null;</pre></td>
  </tr>
</table>

### Portée

Les variables définies à l'intérieur d'un bloc ne sont pas utilisables à l'extérieur de ce bloc

``` scss
p {
    $border: #ccc;
    border-top: 1px solid $border;
}
```

En revanche on peut modifier la valeur des variables définies à l'extérieur du bloc pour les sélecteurs qui suivent.

``` scss
$color: #777;

.sidebar {
    $color: #222;
    background: $color;
}
p {
    color: $color; // vaut #222
}
```

### Expansion de variable

La syntaxe `#{$variable}` permet d'utiliser la valeur de la variable dans un nom de propriété ou dans une valeur.

``` scss
$side: top;

sup {
    position: relative;
    #{side}: -0.5em;
}
.callout-#{$side} {
    background: #777;
}
```

---

## Opérations mathématiques

Des opérations mathématiques peuvent être effectuées sur les valeurs.  
Par défaut, Sass retourne jusqu'à 5 chiffres après la virgule.

| Opérateur | Description |
|--- |---            |
| + | addition       |
| - | subtraction    |
| * | multiplication |
| / | division       |
| % | modulo         |

Si les unités diffèrent entre les valeurs, Sass essaie de calculer la valeur en fonction de l'unité la plus à gauche.

``` scss
font-size: 10px + 4pt; // 15.33333px;
```

Le symbole `/` (slash) est une syntaxe CSS valide. Pour que le compilateur considère ce symbole comme une opération mathématique et non comme un élément de syntaxe, il faut soit
- qu'il y ait une variable dans l'expression: `$size / 10`
- que l'opération soit entre parenthèses: `(100px / 20)`
- ou que l'opération fasse partie d'une opération mathématique plus grande: `20px * 5 / 2`

## Concaténation

L'opérateur `+` (plus) permet de concaténer des chaînes de caractères.  
La chaîne de caractères qui en résulte aura des quotes selon la chaîne de caractères la plus à gauche.

``` scss
$family: "Helvetica " + "Neue"; // "Helvetica Neue"
$family: 'sans-' + serif; // "sans-serif"
$family: sans- + 'serif'; // sans-serif
```

Pour concaténer une variable, utiliser l'expansion

``` scss
$family: "#{$font}, serif";
```

---

## Mixin: @mixin, @include

Les mixins permettent d'inclure des propriétés CSS à l'intérieur d'un sélecteur, ce qui permet d'éviter les répétitions. 
Attention à bien définir les mixins avant de les utiliser, particulièrement avec des imports de fichiers.

On les définit avec `@mixin` et on les appele avec `@include`.

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">@mixin box-sizing {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.content {
    @include box-sizing;
    border: 1px solid #ccc;
}</pre></td><td><pre lang="css">.content {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #ccc;
}</pre></td></tr></tbody>
</table>

### Arguments

Les mixins peuvent prendre des arguments

``` scss
@mixin box-sizing($x) {
    -webkit-box-sizing: $x;
    -moz-box-sizing: $x;
    box-sizing: $x;
}
.btn-a {
    @include box-sizing(border-box);
    border: 1px solid #ccc;
}
```

### Valeurs par défaut

On peut définir des valeurs par défaut aux arguments

``` scss
@mixin box-sizing($x: border-box) {
    -webkit-box-sizing: $x;
    -moz-box-sizing: $x;
    box-sizing: $x;
}
.btn-a {
    @include box-sizing;
    border: 1px solid #ccc;
}
```

### Arguments multiples

Les arguments sont séparés par des virgules. Les arguments optionnels (avec une valeur par défaut) sont placés à la fin de la liste.

``` scss
@mixin button($radius, $color: #000) {
    border-radius: $radius;
    color: $color;
}
```

Au moment d'appeler la mixin, les valeurs peuvent être passées sous forme de clé/valeur. Cela permet d'éviter les confusions (quel argument vaut quoi).

``` scss
@include button($color: #777, $radius: 5px);
```

### Liste d'arguments

Suffixer  `...` à un argument crée un argument qui prend une liste de valeurs.

``` scss
@mixin transition($val...) {
    -webkit-transition: $val;
    -moz-transition: $val;
    transition: $val;
}
.btn-a {
    @include transition(color 0.3s ease-in, background 0.5s ease-out);
}
```

L'inverse est également possible, on peut éclater une liste en plusieurs paramètres.

``` scss
@mixin button($radius, $color) {
    border-radius: $radius;
    color: $color;
}

$properties: 4px, #000;
.btn-a {
    @include button($properties...);
}
```

---

## Combiner des sélecteurs: @extend

Avec l'instruction `@extend`, Sass combine des sélecteurs définis à des endroits différents.

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.content {
    border: 1px solid #ccc;
    padding: 20px;
    h2 {
        font-size: 3em;
        margin: 20px 0;
    }
}
.callout {
    @extend .content;
    background: #ddd;
}</pre></td><td><pre lang="css">.content,
.callout {
    border: 1px solid #ccc;
    padding: 20px;
}
.content h2,
.callout h2 {
    font-size: 3em;
    margin: 20px 0;
}
.callout {
    background: #ddd;
}</pre></td></tr></tbody>
</table>

### Placeholders de sélecteurs

Avec `@extend`, si B extend A, alors toute propriété de A (et de ses descendants) est également appliquée à B. Cela peut créer du code inutile.
Pour éviter ça, on peut créer des placeholders, qui fonctionnent un peu comme des sélecteurs abstraits (des sélecteurs qui ne générent pas de bloc CSS par eux-mêmes mais que l'on peut hériter).

``` scss
%btn {
    background: #777;
    border: 1px solid #ccc;
    font-size: 1em;
    text-transform: uppercase;
}
.btn-a {
    @extend %btn;
}
.btn-b {
    @extend %btn;
    background: #ff0;
}
.sidebar .btn-a {
    text-transform: lowercase;
}
```

---

## Définir des fonctions: @function

Les fonctions permettent de calculer des valeurs.  
Les arguments des fonctions ont les mêmes règles que les mixins.  
Il est obligatoire d'appeler une fonction avec des parenthèses, même quand aucun paramètre n'est passé.

``` scss
@function fluidize() {
    @return 35%;
}
.sidebar {
    width: fluidize();
}
```

``` scss
@function fluidize($target, $context) {
    @return ($target / $context) * 100%;
}
.sidebar {
    width: fluidize(350px, 1000px);
}
```

## Fonctions natives

Sass définit plusieurs [fonctions natives](http://sass-lang.com/documentation/Sass/Script/Functions.html). Elles sont appelées de la même manière que les fonctions crées manuellement.

### Mathématiques

<table>
<tr><th align="left">round($number)</th><td>Arrondi à l'entier le plus proche</td></tr>
<tr><th align="left">ceil($number)</th><td>Arrondi à l'entier supérieur</td></tr>
<tr><th align="left">floor($number)</th><td>Arrondi à l'entier inférieur</td></tr>
<tr><th align="left">abs($number)</th><td>Retourne la valeur absolue</td></tr>
<tr><th align="left">min($list)</th><td>Retourne la valeur maximale</td></tr>
<tr><th align="left">max($list)</th><td>Retourne la valeur minimale</td></tr>
<tr><th align="left">percentage($number)</th><td>Convertit en pourcentages</td></tr>
</table>

``` scss
h2 {
    line-height: ceil(1.2);
}
.sidebar {
    width: percentage(350px/1000px);
}
```

### Couleurs

On peut utiliser les opérateurs sur les couleurs

``` scss
$color-base: #333333;

.addition {
    background: $color-base + #112233;
}
.subtraction {
    background: $color-base - #112233;
}
.multiplication {
    background: $color-base * 2;
}
.division {
    background: $color-base / 2;
}
```

Ou faire appel à des fonctions pour éclaircir, assombrir, changer la saturation, etc. Voir la doc pour la liste complète.

``` scss
$color: #333333;

.alpha {
    background: rgba($color, 0.8);
}
.lighten {
    color: lighten($color, 20%);
}
.darken {
    color: darken($color, 20%);
}
.saturate {
    color: saturate($color, 20%);
}
.desaturate {
    color: desaturate($color, 20%);
}
.mix-a {
    color: mix(#ffff00, #107fc9); // 50% yellow, 50% blue
}
.mix-b {
    color: mix(#ffff00, #107fc9, 30%); // 30% yellow, 70% blue
}
.grayscale {
    color: grayscale($color);
}
.invert {
    color: invert($color);
}
.complement {
    color: complement($color);
}
```

---

## Conditions: @if

Le `@if` permet d'ajouter des propriétés sous condition.  
Les opérateurs disponibles sont `==`, `!=`, `>`, `>=`, `<`, `<=`.

``` scss
$theme: dark;

header {
    @if theme == dark {
        background: #000;
    } @else if $theme == pink {
        background: pink;
    } @else {
        background: #fff;
    }
}
```

---

## Boucler sur une liste: @each

`@each` permet d'itérer sur une liste d'items

``` scss
$authors: nick aimee dan drew;

@each $author in $authors {
    .author-#{$author} {
        background: url(author-#{author}.jpg);
    }
}
```

## Boucler sur une plage d'index: @for

`@for` permet d'effectuer un boucle de i à n (inclus).

``` scss
.item {
    position: absolute;
    right: 0;
    @for $i from 1 through 3 {
        &.item-#{$i} {
            top: $i * 30px;
        }
    }
}
```

## Boucler avec un booléen: @while

Avec `@while` on met à jour l'index manuellement

``` scss
.item {
    position: absolute;
    right: 0;

    $i: 1;
    @while $i < 4 {
        &.item-#{$i} {
            top: $i * 30px;
        }
        $i: $i + 1;
    }
}
```

---

## Media queries

Les media queries peuvent être imbriquées à l'intérieur d'un bloc CSS.  
Attention
- le tag `@media` ne sera pas factorisé dans le CSS généré, il est donc souvent préférable de le séparer complètement
- les déclarations faites à l'extérieur de `@media` ne peuvent pas être utilisées à l'intérieur. Par exemple, on ne peut pas utiliser de `@extend` dans un bloc media

<table>
<thead><tr><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;SCSS&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th><th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;CSS généré&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th></tr></thead>
<tbody><tr><td>
<pre lang="scss">.sidebar {
    border: 1px solid #ccc;
    @media (min-width: 700px) {
        float: right;
        width: 30%;
    }
}</pre></td><td><pre lang="css">.sidebar {
    border: 1px solid #ccc;
}
@media (min-width: 700px) {
    .sidebar {
        float: right;
        width: 30%;
    }
}</pre></td></tr></tbody>
</table>

### Passer un bloc à une mixin: @content

On peut utiliser une mixin et passer le contenu du bloc, ce qui permet de mettre en commun les conditions media utilisées (min-width, max-wdith, etc).

``` scss
@mixin respond-to($media) {
  @if $media == desktop {
    @media (min-width: 960px) {
      @content;
    }
  }
}
.sidebar {
    border: 1px solid #ccc;
    @include respond-to(desktop) {
        float: right;
        width: 30%;
    }
}
```
