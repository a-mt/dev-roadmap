---
title: "SVG: Introduction"
category: Web, HTML, SVG
---

## Présentation

SVG est un langage XML, assez similaire au XHTML, qui permet de créer des images. HTML founit des éléments pour définir des titres, paragraphes, tableaux, etc. De la même manière, SVG fournit des éléments pour dessiner des cercles, des rectangles, des courbes simples ou complexes, etc.

Les images SVG sont des images vectorielles, c'est à dire des images que l'on peut zoomer et dézoomer sans perte de qualité, le résultat ne sera pas pixelisé. Autrement dit, un SVG s'adapte aussi bien à un petit écran de mobile qu'un grand écran de télévision.
[Image bitmap vs image vectorielle](design-image.md#formats-de-fichiers-image).

Le second intérêt du SVG est le fait qu'on peut l'inclure dans une page HTML, accéder à son contenu par le DOM, le générer et l'éditer en JavaScript, et ajouter des interractions utilisateur en CSS — comme le changement de couleur au survol par exemple. Si utiliser HTML est une possibilité pour créer des formes basiques, telles que des rectangles et des cercles, SVG quant à lui va permettre de créer des visualisations beaucoup plus complexes. [Exemple SVG HeatMap](https://codepen.io/a-mt/full/QMgJBw/) (généré dynamiquement à l'aide de la librairie D3.js)

## Éditeur SVG

Contrairement aux autres formats d'image, SVG peut s'éditer avec un éditeur de texte.  
Un certain nombre de logiciels de dessin disponibles utilisent SVG comme format natif, les plus connus étant Inkscape et Adobe Illustrator. Vous pouvez donc éditer un SVG à la main ou avec un logiciel de dessin.

Connaître la syntaxe SVG, pour une édition manuelle, est particulièrement intéressant pour pouvoir générer des images dynamiquement, comme des graphiques. 

## Structure

Un document SVG se compose de l'élément racine `<svg>`, à l'intérieur de laquelle vont être placées divers éléments. L'élément `<g>` permet de regrouper plusieurs éléments ensemble, un peu à la manière d'un div en HTML. À partir de là, l'image SVG peut devenir aussi complexe qu'on le veut.

<ins>Exemple</ins>:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect x="5" y="5" width="50" height="50" fill="black"></rect>
    <rect x="10" y="10" width="50" height="50" fill="red"></rect>
</svg>
```

<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="50" height="50" fill="black"></rect>
    <rect x="10" y="10" width="50" height="50" fill="red"></rect>
</svg>


Les fichiers SVG complexes peuvent atteindre une taille assez importante. Pour ces cas particuliers, la spécification SVG permet l'utilisation de fichiers compressés avec gzip: `.svgz`. Mais ce format n'est cependant pas toujours bien pris en charge par les navigateurs.

## La balise SVG

Une image SVG est entièrement contenue dans une balise `svg`.  
Les attributs `width` et `height` de cette balise spécifient à quelle taille afficher le SVG.  
Si l'unité n'est pas précisé, il s'agit défaut de pixels.

La déclaration suivante crée un élément SVG d'une taille de 100px par 100px:

``` html
<svg width="100px" height="100px"></svg>
```

Pour l'instant le fichier SVG est complètement vide, il ne s'agit que d'un rectangle transparent.

### viewBox

L'attribut `viewBox` définit les dimensions du SVG: `min-x min-y width height` (séparé par des espaces ou des virgules).  
Tous les attributs de largeur et de hauteur à l'intérieur du SVG n'ont pas d'unité: il s'agit de la taille de base de l'image mais celle-ci pourra être zoomée ou dézoomée. De même, les dimensions du viewBox n'ont pas d'unité.

Les attributs `width` et `height` spécifient la taille à laquelle le SVG doit être affiché. En l'occurrence, 200px par 200px. Puisque les dimensions du SVG est 100 par 100, chaque unité du SVG vaut deux pixels. Autrement dit, on double la taille du contenu. Si l'on ne définit pas le viewbox, les dimensions du SVG c'est la taille d'affichage. [JSFiddle viewbox](https://jsfiddle.net/amt01/0ycvsbn6/)

``` html
<svg width="200" height="200" viewBox="0 0 100 100">
```

### preserveAspectRatio

Lorsqu'on redimensionne l'image, par défaut, le ratio des formes est toujours respecté et le contenu du SVG est centré au milieu.
Ce comportement peut être modifié par l'attribut `preserveAspectRatio`. [JSFiddle preserveAspectRatio](https://jsfiddle.net/amt01/zu9vcL5h/).

``` html
<svg width="100" height="50" viewBox="0 0 100 100" preserveAspectRatio="none">
```

<svg width="215" height="85" xmlns="http://www.w3.org/2000/svg" style="background: black;">
  <defs>
     <path id="smiley" d="M50,10 A40,40,1,1,1,50,90 A40,40,1,1,1,50,10 M30,40 Q36,35,42,40 M58,40 Q64,35,70,40 M30,60 Q50,75,70,60 Q50,75,30,60" fill="yellow" stroke="black" stroke-width="8px" stroke-linecap="round" stroke-linejoin="round" />
  </defs>

  <text x="50" y="20" stroke="none" fill="white" text-anchor="middle">default</text>
  <rect x="5" y="30" width="100" height="50" fill="white" />
  <svg viewBox="0 0 100 100" width="100" height="50"
       x="6" y="30">
    <use href="#smiley" />
  </svg>

  <text x="150" y="20" stroke="none" fill="white" text-anchor="middle">none</text>
  <rect x="110" y="30" width="100" height="50" fill="white" />
  <svg viewBox="0 0 100 100" width="100" height="50"
       preserveAspectRatio="none"
       x="110" y="30">
    <use href="#smiley" />
  </svg>
</svg>