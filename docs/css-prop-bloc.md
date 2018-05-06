---
title: Blob
category: Web, CSS, Propriétés
---

## opacity

Permet de rendre un élément semi-transparent.  
[Exemples opacity](https://jsfiddle.net/amt01/25L3jmsj/)

``` plain
opacity: <real>
(CSS3)
Définit l'opacité d'un élément (0 = transparent, 1 = opaque)
```

``` css
{
  opacity: 0.5;
}
```

## background

Permet d'afficher une couleur et/ou une image en fond d'un élément, à l'intérieur des bordures.  
Depuis CSS3, plusieurs images peuvent être utilisées et de nouvelles propriétés ont été ajoutées.  
[Exemples background](https://jsfiddle.net/amt01/jpgykmuh/)

<ins>Propriétés CSS1</ins> :

``` plain
background: <color> <image> <repeat> <attachment> <position>
(CSS1)
Raccourcis permettant de définir le fond
```

``` plain
background-color: <color>
(CSS1)
Définit la couleur de fond
```

``` plain
background-image: <image>
(CSS1,3)
Définit l'image de fond
En CSS3, plusieurs images peuvent être définies, séparées par des virgules
```

``` plain
background-repeat: repeat | repeat-x | repeat-y | no-repeat
(CSS1)
Définit si l'image doit être répétée ou non
```

``` plain
background-attachment: scroll | fixed | local
(CSS1)
Définit si la position est fixée ou si elle défile dans le bloc
```

``` plain
background-position: <x> <y>
     x : left | right | center | <percentage> | <length>
     y : top | bottom | center | <percentage> | <length>
(CSS1)
Définit la position de l'image de fond
```

``` css
{
  background: url(chess.png) gray 50% repeat fixed;
}
```

<ins>Propriétés CSS3</ins> :

``` plain
background: <color> <image> <position> / <size> <repeat> <origin> <clip> <attachment>
(CSS3)
```

``` plain
background-size: auto | <length> | cover | contain
(CSS3)
Définit la taille de l'image de fond
```

``` plain
background-origin: padding-box | border-box | content-box
(CSS3)
Définit la zone de positionnement de l'image de fond (padding/bordure compris ou non)
```

[Exemples background-origin / background-clip](https://jsfiddle.net/amt01/3ag2gvrz/)

``` plain
background-clip: border-box | padding-box | content-box
(CSS3)
Définit la zone d'affichage de l'image de fond (padding/bordure compris ou non)
```

``` css
{
  background: url(chess.png) 40% / 10em gray round fixed border-box;
}
```

## cursor

Permet de changer le curseur affiché au survol d'un élément

``` plain
cursor: auto | cell | copy | crosshair | default | help | move |
        not-allowed | pointer | progress | text | wait | zoom-in
(CSS2)
Définit le curseur à afficher au survol de l'élément
Liste non exhaustive
```

``` css
{
  cursor: pointer;
}
```

[Liste complète des valeurs + demo](https://developer.mozilla.org/fr/docs/Web/CSS/cursor#Valeurs)

## caret

``` plain
caret-color: <color>
(CSS3)
Définit la couleur du curseur de saisie de texte
```

[Exemple caret-color](https://jsfiddle.net/amt01/3u43txtL/)
