---
title: Les bases de SVG
category: Web, HTML, SVG
---

SVG est l'acronyme de **Scalable Vector Graphics** (image vectorielle adaptable).

## Présentation

SVG est un langage XML, assez similaire au XHTML, qui permet de créer des images. HTML founit des éléments pour définir des titres, paragraphes, tableaux, etc. De la même manière, SVG fournit des éléments pour dessiner des cercles, des rectangles, des courbes simples ou complexes, etc.

Les images SVG sont des images vectorielles, c'est à dire des images que l'on peut zoomer et dézoomer sans perte de qualité, le résultat ne sera pas pixelisé. Autrement dit, un SVG s'adapte aussi bien à un petit écran de mobile qu'un grand écran de télévision.
[Image bitmap vs image vectorielle](design-image.md#formats-de-fichiers-image).

Le second intérêt du SVG est le fait qu'on peut l'inclure dans une page HTML, accéder à son contenu par le DOM, le générer et l'éditer en JavaScript, et ajouter des interractions utilisateur en CSS — comme le changement de couleur au survol par exemple. Si utiliser HTML est une possibilité pour créer des formes basiques, telles que des rectangles et des cercles, SVG quant à lui va permettre de créer des visualisations beaucoup plus complexes. [Exemple SVG HeatMap](https://codepen.io/a-mt/full/QMgJBw/) (généré dynamiquement avec la librairie D3.js)

## Créer un document SVG

Contrairement aux autres formats d'image, SVG peut s'éditer avec un éditeur de texte.  
Pour créer une image SVG, il suffit donc de créer un document `.svg` et d'écrire du code à l'intérieur.

Il existe également des logiciels de dessin qui utilisent SVG comme format natif, les plus connus sont Inkscape et Adobe Illustrator. Vous pouvez donc éditer un SVG à la main ou avec un logiciel de dessin.

Connaître la syntaxe SVG, pour une édition manuelle, est particulièrement intéressant pour pouvoir générer des images dynamiquement, comme des graphiques. 

## Structure

Un document SVG se compose de l'élément racine `<svg>`, à l'intérieur de laquelle vont être placées divers éléments.  

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


Les fichiers SVG complexes peuvent atteindre une taille assez importante. Pour ces cas particuliers, la spécification SVG permet l'utilisation de fichiers compressés avec gzip: `.svgz`. Mais ce format n'est pas toujours bien pris en charge par les navigateurs.