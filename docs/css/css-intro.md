---
title: Les bases de CSS
category: Web, CSS
---

CSS (*Cascading Style Sheets*) est le langage utilisé pour mettre en page les documents HTML ou XML — on définit la manière dont les éléments doivent être affichés, en gras, en itatique, en rouge, etc.

## Appliquer du CSS

### Inline style

* La manière la plus simple d'appliquer du CSS sur de HTLM est de définir un attribut style directement sur la balise (*inline style*).
  L'utilisation de l'attribut style pour définir du CSS est généralement considérée comme une mauvaise pratique, mais est utile lorsqu'on doit modifier dynamiquement du CSS via du JavaScript.  
  NB: lorsque le CSS est appliqué via un attribut HTML il n'y a pas de sélecteur utilisé, on ne pourra donc pas utiliser de pseudo-éléments, pseudo-classes ou media queries ici.

  ``` html
  <p style="background-color: lightgrey">Lorem ipsum</p>
  ```

  <ins>Exemple</ins>:

  <p style="background-color: lightgrey">Lorem ipsum</p>

### Embedded CSS

* Une deuxième manière d'appliquer du CSS sur du HTML est de déclarer une balise `<style>` directement à l'intérieur de la page HTML (*embedded style*).  
  Dans ce cas, un sélecteur doit être utilisé pour désigner l'élément sur lequel le CSS est appliqué.

  ``` html
  <style>
    p { background-color: lightgrey; }
  </style>

  <p>Lorem ipsum</p>
  ```

### External style

* La troisième manière d'appliquer du CSS sur du HTML, et qui est la manière considérée comme la meilleure pratique, est de créer un fichier .css (ce qu'on appelle une *feuille de style*, ou *stylesheet* en anglais) et d'inclure ce fichier dans la page via une balise link présente dans le head (*external style*).  

  <ins>main.css</ins>:

  ``` css
  p { background-color: lightgrey; }
  ```

  <ins>index.html</ins>:

  ``` html
  <head>
    <link href="main.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <p>Lorem ipsum</p>
  </body>
  ```

## Structure des blocs CSS

* Un fichier CSS, ou un script style, contient une liste de blocs CSS.  
  Chaque bloc est délimité par des accolades `{}` et préfixé d'un *sélecteur* CSS, qui désigne le ou les éléments sur lesquels on veut appliquer du CSS. À l'intérieur de chaque bloc, on définit une liste de *propriétés et valeurs*.

  ``` css
  #mon-selecteur {
    color: white;
    background-color: black;
  }
  .mon-selecteur2 {
    color: black;
    background-color: pink;
  }
  ```

  ![](https://i.imgur.com/vrNT5GT.png)

* Le CSS n'est pas sensible à l'indentation, espaces et retours chariots — ils servent uniquement à rendre le code plus lisible.

* Les éléments HTML héritent du style de leur parent: si un élément *b* est présent dans un élément *p*, alors le style du *p* s'applique également à tous les *b* à l'intérieur (à moins de ré-ecraser le style de cet élément) — d'où le nom de *Cascading* Style Sheets.  
  Dans l'exemple suivant tous les éléments placés dans le tag `<html>` aurons la police d'écriture "Times" sauf les h1, qui aurons "Georgia"

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

## Commentaires

Les commentaires CSS sont délimités par `/* */`

``` css
span.thickspace {
  display: inline-block;
  width: 0.2777em; /* 5/18 */
}
```

## Legacy: Insertion conditionnelle pour Internet Explorer

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

## Application conditionnelle suivant le Media

* On peut restreindre le CSS a un media en particulier (imprimante, écran, lecteur audio) et à des dimensions d'écran particulières, en utilisant des *media queries*.

* Soit en incluant la feuille de style de manière conditionnelle, avec l'attribut `media`:

  ``` html
  <!-- CSS2 -->
  <link href="main.css" rel="stylesheet" type="text/css" media="print">
  ```

  ``` html
  <!-- CSS3 -->
  <link href="main.css" rel="stylesheet" type="text/css" media="screen and (min-width: 721px)">
  ```

* Soit en déclarant des blocs CSS de manière conditionnelle (à l'intérieur d'une feuille CSS ou d'une balise `<style>`), avec la at-rule `@media`:

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

## Versions CSS

* Les spécifications CSS sont écrites par le W3C (*World Wide Web Consortium*), un organisme de standardisation à but non lucratif. Le CSS est un langage en constante évolution: de nouvelles fonctionnalités sont fréquemment ajoutées par le W3C.

  | Version | Année | Description                                    |
  |---      |---    |---                                             |
  | 1.0     | 1996  | Première version standardisée                  |
  | 2.0     | 1998  | Maintes fois révisé depuis sa publication      |
  | 2.1     | 2004  | Le plus utilisé et le mieux implémenté         |
  | 3       | 2001+ | CSS est désormais publié en specs modularisées |

* À partir de CSS3, le language est définit par modules, qui peuvent évoluer indépendamment.

  - Les modules qui reprennent les éléments de CSS 2.1 sont de niveau 3
  - Les modules qui apportent de nouvelles valeurs possibles à des fonctionnalités existantes (de nouveaux sélecteurs, valeurs de background, border & images) sont de niveau 4
  - Les modules qui définissent des fonctionnalités entièrement nouvelles (comme flexbox) sont de niveau 1

  [Liste des modules CSS](https://www.w3.org/Style/CSS/specs.en.html)

* Tout comme pour le HTML, il appartient aux navigateurs de choisir d'implémenter ou non les fonctionnalités spécifiées par le standard: toutes ne sont pas supportées uniformément et notamment les plus récentes.

## Navigateurs

* Chaque navigateur à son propre moteur de rendu (*Rendering Engine*), parseur, politique de rendu et style par défaut. Les principaux Rendering Engine sont
  - Trident (IE<10)
  - Edge (IE10)
  - Presto (Opera)
  - Gecko (Firefox)
  - WebKit (Safari)
  - Blink (Chrome, Opera)

* Ça implique aussi que tous les navigateurs ne supportent pas tous au même moment toutes les propriétés CSS, ou les appliquent de la même manière — tout particulièrement les anciens navigateurs.  
  Le site [caniuse](https://caniuse.com/) permet de vérifier quels navigateurs supportent une propriété CSS donnée.

* Un effort de standardisation a été fournit et les moteurs modernes respectent pour la plupart les standards du web (W3C). Les navigateurs historiques sont considérés comme standardisés à partir des versions suivantes:
  - Safari 4+
  - Firefox 4+
  - Opera 10+
  - Chrome 10+
  - IE 9+

## Préfixes navigateurs

Les préfixes (*vendor prefixes*) permettent au navigateur de supporter des fonctionnalités CSS non standardisées ou encore en cours de développement. Une fois le code stabilisé, le préfixe est supprimé.

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

