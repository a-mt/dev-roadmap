---
title: Autres bordures
category: Web, CSS, Propriétés
---

## outline

Ajoute une bordure à l'extérieur de l'élément, autour de la bordure définie par `border`.  
Contrairement à border, outline ne peut pas se définir indépendemment de chaque côté.  
La bordure d'`outline` empiète sur les éléments alentour si margin n'est pas changé en conséquence. [Exemple outline](https://jsfiddle.net/amt01/h8mmd2gd/)

``` plain
outline: <outline-color> <outline-style> <outline-width>
(CSS2)
Définit l'outline (bordure extérieure)
```

``` plain
outline-color: <color>
(CSS2)
Définit la couleur de l'outline
```

``` plain
outline-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
(CSS2)
Définit le style de l'outline (trait, pointillés, etc)
```

``` plain
outline-width: medium | thin | thick | length
(CSS2)
Définit l'épaisseur de l'outline
```

``` plain
outline-offset: <length>
(CSS3)
Définit l'espacement entre la bordure et l'outline
```

``` css
{
  border: 1px solid black; /* bordure */
  outline: 1px dashed red; /* outline autour de la bordure */
  outline-offset: 10px;    /* espace entre la bordure et l'outline */
}
```

## border-image

Permet d'utiliser une image pour bordure, pour utiliser un motif plutôt qu'une couleur.  
[Exemples border-image](https://jsfiddle.net/amt01/p939s582/)

``` plain
border-image: <source> <slice> <width> <outset> <repeat>
(CSS3)
Raccourcis pour utiliser une image en guise de bordure
```

``` plain
border-image-source: <image>
(CSS3)
Définit l'image à utiliser en bordure
```

``` plain
border-image-slice: (<number> | <percentage> | fill){1,4}
(CSS3)
Définit le découpage de l'image pour former les bordures
```

&lt;number&gt; indique une longueur en px (ne pas indiquer l'unité)

``` plain
border-image-width: (<length> | <number> | <percentage>){1,4}
(CSS3)
Définit la taille de l'image en bordure
```

``` plain
border-image-outset: (<length> | <number>){1,4}
(CSS3)
Définit s'il faut étirer l'image en dehors de la bordure
```

``` plain
border-image-repeat: (stretch | repeat | round | space){1,2}
(CSS3)
Définit s'il faut répéter le motif ou l'étirer
```

``` css
{
  border: 10px solid transparent;  /* taille de la bordure */
  border-image-source: url("http://i.imgur.com/eD1caMo.png"); /* image à utiliser */
  border-image-slice: 10;          /* le découpage de l'image en bordure */
}
```

## border-radius

Permet de donner des coins arrondis à un élément.

``` plain
border-radius: (<length>){1,4}
border-top-left-radius: ...
(CSS3)
Définit la taille des coins arrondis (0 = aucun)
```

``` css
{
  background: #00ced1;
  border-radius: 15px;     /* coins arrondis de 15px */
}
```

## box-shadow

Permet d'ajouter des ombres autour d'un élément.  
Accepte plusieurs ombres, séparées par des virgules.  
[Exemples box-shadow](https://jsfiddle.net/amt01/f27bmwL2/)

``` plain
box-shadow: <x-offset> <y-offset> <blur> <spread> <color>
(CSS3)
Ajoute une ombre autour de l'élément
```

``` css
{
  box-shadow: 0 5px 15px 0 grey; /* ajoute une ombre */
}
```

## box-decoration-break

Définit la façon dont les propriétés background, padding, border, border-image, box-shadow, margin et clip sont appliqués sur un élément lorsque la boîte de celui-ci est fragmentée, par exemple lorsqu'un élément en ligne s'étend sur plusieurs lignes ou qu'un bloc est séparé en colonnes.


``` plain
box-decoration-break: slice | clone
(CSS3)
Définit le comportement du mox model d'un élément fragmenté
```

[Exemple box-decoration-break](https://jsfiddle.net/amt01/39bupLon/)
