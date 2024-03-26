---
title: Autres bordures
category: Web, CSS, Propriétés
---

## outline

`outline` ajoute une bordure à l'extérieur de l'élément, autour de la bordure définie par `border`.  
Contrairement à border, outline ne peut pas se définir indépendemment de chaque côté.  
La bordure d'`outline` empiète sur les éléments alentour si margin n'est pas changé en conséquence.  

* `outline-color`  
  Définit la couleur de l'outline [CSS2]

  ``` plain
  outline-color: <color>
  ```

* `outline-style`  
  Définit le style de l'outline (traits, pointillés, etc) [CSS2]

  ``` plain
  outline-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
  ```

* `outline-width`  
  Définit l'épaisseur de l'outline [CSS2]

  ``` plain
  outline-width: medium | thin | thick | length
  ```

* `outline`  
  Est un raccourci pour `outline-color`, `outline-style` et `outline-width` [CSS2]

  ``` plain
  outline: <outline-color> <outline-style> <outline-width>
  ```

* `outline-offset`   
  Définit l'espacement entre la bordure et l'outline [CSS3]

  ``` plain
  outline-offset: <length>
  ```

<ins>Exemple</ins>:

``` css
{
  border: 1px solid black; /* bordure */
  outline: 1px dashed red; /* outline autour de la bordure */
  outline-offset: 10px;  /* espace entre la bordure et l'outline */
}
```

[JSFiddle outline](https://jsfiddle.net/amt01/h8mmd2gd/)

---

## border-image

`border-image` permet d'utiliser une image pour bordure, pour utiliser un motif plutôt qu'une couleur.  

* `border-image-source`  
  Définit l'image à utiliser en bordure [CSS3]

  ``` plain
  border-image-source: <image>
  ```

* `border-image-slice`  
  Définit le découpage de l'image pour former les bordures [CSS3]

  ``` plain
  border-image-slice: (<number> | <percentage> | fill){1,4}
  ```

  `<number>` indique une longueur en px (ne pas indiquer l'unité)

* `border-image-width`  
  Définit la taille de l'image en bordure [CSS3]

  ``` plain
  border-image-width: (<length> | <number> | <percentage>){1,4}
  ```

* `border-image-outset`  
  Définit s'il faut étirer l'image en dehors de la bordure [CSS3]

  ``` plain
  border-image-outset: (<length> | <number>){1,4}
  ```

* `border-image-repeat`  
  Définit s'il faut répéter le motif ou l'étirer [CSS3]

  ``` plain
  border-image-repeat: (stretch | repeat | round | space){1,2}
  ```

* `border-image`  
  Est un raccourci pour les propriétés `border-image*` [CSS3]

  ``` plain
  border-image: <source> <slice> <width> <outset> <repeat>
  ```

<ins>Exemple</ins>:

``` css
{
  border: 10px solid transparent;  /* taille de la bordure */
  border-image-source: url("http://i.imgur.com/eD1caMo.png"); /* image à utiliser */
  border-image-slice: 10;      /* le découpage de l'image en bordure */
}
```

[JSFiddle border-image](https://jsfiddle.net/amt01/p939s582/)

---

## border-radius

`border-radius` permet de donner des coins arrondis à un élément.  
Définir le radius de l'arrondi (0 = aucun).

<ins>Définition</ins>: [CSS3]

``` plain
border-radius: (<length>){1,4}
border-top-left-radius: ...
```

<ins>Exemple</ins>:

``` css
{
  background: #00ced1;
  border-radius: 15px;   /* coins arrondis de 15px */
}
```

---

## box-shadow

`box-shadow` permet d'ajouter des ombres autour d'un élément.  
Accepte plusieurs ombres, séparées par des virgules.  

<ins>Définition</ins>: [CSS3]

``` plain
box-shadow: <x-offset> <y-offset> <blur> <spread> <color>
```

<ins>Exemple</ins>:

``` css
{
  box-shadow: 0 5px 15px 0 grey; /* ajoute une ombre */
}
```

[JSFiddle box-shadow](https://jsfiddle.net/amt01/f27bmwL2/)

---

## box-decoration-break

`box-decoration-break` définit la façon dont les propriétés `background`, `padding`, `border`, `border-image`, `box-shadow`, `margin` et `clip` sont appliquées sur un élément lorsque la boîte de celui-ci est fragmentée, par exemple lorsqu'un élément en ligne s'étend sur plusieurs lignes ou qu'un bloc est séparé en colonnes.

<ins>Définition</ins>: [CSS3]

``` plain
box-decoration-break: slice | clone
```

[JSFiddle box-decoration-break](https://jsfiddle.net/amt01/39bupLon/)
