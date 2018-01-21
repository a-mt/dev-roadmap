---
title: Inclure du CSS
category: Web > CSS
---

## Ajouter du CSS

Pour ajouter du CSS à des éléments HTML, on peut le mettre
* directement sur un élément HTML (inline style)

  ``` html
  <p style="background-color: lightgrey">Lorem ipsum</p>
  ```

* dans une balise `<style>` à l'intérieur de la page (embedded style)

  ``` html
  <style>
  p { background-color: lightgrey; }
  </style>
  ```

* ou dans un fichier externe inclut dans la page (external style)

  ``` html
  <link href="main.css" rel="stylesheet" type="text/css">
  ```

  ``` css
  p { background-color: lightgrey; }
  ```

Plusieurs stylesheets (feuilles de style) et balises `<style>` peuvent être ajoutées sur une même page.  
Le CSS inclut en ligne n'utilise pas de sélecteur, on ne peut donc pas utiliser les pseudo-éléments, les pseudo-classes ni les media queries dans ce cas.

---

## Media queries

Le CSS peut être appliqué à un type d'appareil particulier (imprimante, écran, lecteur audio) et à des dimensions d'écran particulières.
Pour inclure une feuille de style sous condition:

``` html
<!-- CSS2 -->
<link href="main.css" rel="stylesheet" type="text/css" media="print">
```

``` html
<!-- CSS3 -->
<link href="main.css" rel="stylesheet" type="text/css" media="screen and (min-width: 721px)">
```

On peut également executer des instructions CSS sous condition à l'intérieur d'une feuille CSS ou d'une balise `<style>` avec les [at-rules](css-atrules.md) (CSS3).

---

## Inclure du CSS pour IE

Dans une page HTML, le CSS et JS peuvent être inclut de manière conditionnelle si le navigateur utilisé est Internet Explorer <10

``` html
<!--[if IE]>
    <link href="main.css" rel="stylesheet" type="text/css">
<![endif]-->
```

Ou au contraire pour les navigateurs autres que Internet Explorer <10

``` html
<!--[if !IE]-->
    <link href="main.css" rel="stylesheet" type="text/css">
<!--[endif]-->
```

Il est d'ailleurs possible de cibler sur des versions spécifiques d'Internet Explorer :

| Syntaxe                  | Description |
|---                       |---          |
| [if IE 7]                | IE 7        |
| [if lt IE 5.5]           | IE < 5      |
| [if lte IE 6]            | IE <= 6     |
| [if gt IE 5]             | IE > 5      |
| [if gte IE 7]            | IE >= 7     |
| [if !(IE 7)]             | IE != 7     |
| [if (gt IE 5)&(lt IE 7)] | (IE > 5) and (IE < 7)  |
| [if (IE 6)\|(IE 7)]      | (IE == 6) or (IE == 7) |

---

## @charset

La règle `@charset` définit l'encodage des caractères utilisés dans une feuille de style. Cette règle doit être la première règle de la feuille de style (aucun caractère ne doit être écrit avant).

``` css
@charset "utf-8";
```

L'encodage doit correspondre à un nom d'encodage valide pour le web tel que défini dans le [registre IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml).  
Le nom est insensible à la casse.

---

## @import

La règle `@import` permet d'importer des feuilles de styles à l'intérieur d'une feuille de feuille. Les imports sont placés en début de fichier.

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
