---
title: Les bases de CSS
category: Web, CSS
---

CSS (Cascading Style Sheets) est le langage utilisé pour formatter les documents HTML ou XML, il définit la manière dont les éléments doivent être affichés.

[A Look Back at the History of CSS](https://css-tricks.com/look-back-history-css/)  
[A free visual guide to CSS](http://cssreference.io/)  
[50 Cheatsheets, References and Guides for CSS](https://speckyboy.com/css-cheatsheets-resources-guides/)

---

## Appliquer du CSS

Il existe différentes manières d'appliquer du CSS sur du HTML — que l'on peut combiner et répéter autant de fois que l'on vaut sur une page. On peut mettre le CSS

* dans une balise `<style>` à l'intérieur de la page (embedded style)

  ``` html
  <style>
    p { background-color: lightgrey; }
  </style>
  <p>Lorem ipsum</p>
  ```

* dans un document `.css` que l'on importe dans la page (external style).  
  On appelle un document .css une *feuille de style* (stylesheet en anglais).

  ``` css
  p { background-color: lightgrey; }
  ```

  ``` html
  <head>
    <link href="main.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <p>Lorem ipsum</p>
  </body>
  ```

* ou directement sur un élément HTML (inline style)  
  Note: Le CSS inclut en ligne n'utilise pas de sélecteur, on ne peut donc pas utiliser les pseudo-éléments, les pseudo-classes ni les media queries dans ce cas.

  ``` html
  <p style="background-color: lightgrey">Lorem ipsum</p>
  ```

---

## Structure

Lorsque les règles CSS ne sont pas placées directement sur un élément HTML (inline style), on utilise un *sélecteur* pour désigner les éléments cible. À ce sélecteur sera donné un ensemble de *propriétés et valeurs*, dans un bloc délimité par des accolades `{}`.
CSS n'est pas sensible à l'indentation, espaces et retours chariots — ils ne sont utilisés que pour rendre le code plus lisible.

![](https://i.imgur.com/vrNT5GT.png)

Les éléments héritent du style de leur parent (d'où le nom de *Cascading* Style Sheets).  
Dans l'exemple suivant tous les éléments placés dans le tag `<html>` seront écrits avec la police `Times` (à moins d'écraser la propriété):

``` css
html {
  margin-left: 2cm;
  font-family: "Times New Roman", serif;
}

h1 {
  font-size: 24px;
  font-family: Georgia, sans-serif;
}
```

---

## Commentaires

Les commentaires sont délimités par `/* */`

---

## Versions CSS

Les spécifications CSS sont écrites par le W3C (World Wide Web Consortium), un organisme de standardisation à but non lucratif. Le CSS est un langage en constante évolution, de nouvelles fonctionnalités sont fréquemment ajoutées. Cependant, il appartient aux navigateurs de choisir de les implémenter ou non, et toutes les fonctionnalités ne sont pas supportées uniformément - notamment les plus récentes.

| Version | Année | Description                                    |
|---      |---    |---                                             |
| 1.0     | 1996  | Première version standardisée                  |
| 2.0     | 1998  | Maintes fois révisé depuis sa publication      |
| 2.1     | 2004  | Le plus utilisé et le mieux implémenté         |
| 3       | 2001+ | CSS est désormais publié en specs modularisées |

Parce que CSS3 a divisé la définition du langage CSS en modules, les modules peuvent évoluer indépendamment.  
- La plupart des modules sont de niveau 3, c'est à dire qu'ils reprennent les éléments de CSS 2.1.  
- Il existe quelques modules de niveau 4 (de nouveaux sélecteurs, valeurs de background, border & images).  
- D'autres modules, définissant des fonctionnalités entièrement nouvelles (comme flexbox), sont de niveau 1.  

[Liste de specs des modules CSS3](https://www.w3.org/TR/css3-roadmap)  
[Stade courant des évolutions](https://www.w3.org/Style/CSS/current-work.en.html)  
[Liste des modules CSS](https://www.w3.org/Style/CSS/specs.en.html)

Des "Snapshots" (qui listent les modules considérés comme stables, implémentés et prêts à être utilisés) sont publiés de temps de temps.

[Snapshot 2010](http://www.w3.org/TR/2011/NOTE-css-2010-20110512)  
[Snapshot 2017](https://www.w3.org/TR/css-2017/)

---

## Navigateurs

Chaque navigateur à son propre moteur de rendu (Rendering Engine), parseur, politique de rendu et style par défaut. Cela veut dire que tous les navigateurs ne supportent pas tous toutes les propriétés CSS, ou ne les appliquent de la même manière, particulièrement pour les anciens navigateurs.

Un effort de standardisation a été fournit et les moteurs actuels respectent pour la plupart les standard du web (W3C). Les navigateurs considérés comme modernes sont
- Safari 4+
- Firefox 4+
- Opera 10+
- Chrome 10+
- IE 9+

Les principaux Rending Engine sont
- Trident (IE<10)
- Edge (IE10)
- Presto (Opera)
- Gecko (Firefox)
- WebKit (Safari)
- Blink (Chrome, Opera)

Le site [caniuse](https://caniuse.com/) permet de vérifier quels navigateurs supportent une propriété CSS donnée.

### Préfixes navigateurs

Les préfixes (vendor prefixes) permettent au navigateur de supporter des fonctionnalités CSS non standardisée ou encore en cours de développement. Une fois le code stabilisé, le préfixe est supprimé.

``` css
.box {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

| Prefixe  | Moteur    |
|---       |---        |
| -ms      | Microsoft |
| -moz-    | Mozilla   |
| -o-      | Opera     |
| -khtml-  | Konqueror |
| -webkit- | WebKit    |

### CSS reset

Parce que différents navigateurs ont différents styles par défaut, il est d'usage courant de "remettre à zéro" le style en début de feuille de style. Cela permet de s'assurer que le style appliqué les éléments HTML sera le même sur tous les navigateurs.

Les propriétés concernées sont `margin`, `padding`, `border`, `font-size` et `line-height`.  
Les CSS reset les plus utilisés sont listés sur [cssreset](https://cssreset.com/).

---

## Cibler Internet Explorer

Les documents CSS et JS peuvent être inclus de manière conditionnelle
* si le navigateur utilisé est Internet Explorer <10:

  ``` html
  <!--[if IE]>
    <link href="main.css" rel="stylesheet" type="text/css">
  <![endif]-->
  ```

  On peut cibler des versions spécifiques d'Internet Explorer :

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

* ou au contraire, si le navigateur utilisé n'est pas Internet Explorer <10

  ``` html
  <!--[if !IE]-->
    <link href="main.css" rel="stylesheet" type="text/css">
  <!--[endif]-->
  ```

---

## Cibler un media

Le CSS peut être appliqué à un type d'appareil particulier (imprimante, écran, lecteur audio) et à des dimensions d'écran particulières.
Pour ce faire, on utilise des *media queries*.

* Pour inclure une feuille de style sous condition:

  ``` html
  <!-- CSS2 -->
  <link href="main.css" rel="stylesheet" type="text/css" media="print">
  ```

  ``` html
  <!-- CSS3 -->
  <link href="main.css" rel="stylesheet" type="text/css" media="screen and (min-width: 721px)">
  ```

* Pour exécuter des instructions CSS sous condition, à l'intérieur d'une feuille CSS ou d'une balise `<style>`:

  ``` css
  /* CSS3 */
  @media print {
    button { display: none; }
  }
  ```

  ``` css
  @media print and (max-width: 420px) {
    button { display: none; }
  }
  ```
