---
title: Interractions utilisateur
category: Web, CSS, Propriétés
---

## pointer-events

Permet de contrôler si un élément peut recevoir des événements de la souris (clic, sélection).  
Lorsqu'on utilise la valeur `none`, cela indique que l'élément ne peut pas recevoir d'événement de pointeur mais qu'on peut passer "au travers" de l'élément pour atteindre des contrôles qui pourraient être derrière.

``` plain
pointer-events: auto | none |
                visiblePainted | visibleFill | visibleStroke | visible |
                painted | fill | stroke | all
(SVG)
Définit si l'élément peut recevoir des événements de la souris
```

## touch-action

Définit si une région donnée peut être manipulée par l'utilisateur grâce à des interactions tactiles (déplacer, zoomer). `touch-action: none` désactive toutes les interractions tactiles.

``` plain
touch-action : [  [ pan-x | pan-left | pan-right ]
                  || [ pan-y | pan-up | pan-down ]
                  || pinch-zoom
               ] | manipulation
(CSS3)
Définit les interactions tactiles qui peuvent être utilisées
```

## scroll

``` plain
scroll-behaviour: auto | smooth
(CSS3)
Définit le comportement du défilement (direct ou avec transition)
```

[Exemple scroll-behaviour](https://jsfiddle.net/amt01/cphLuu59/)

``` plain
scroll-snap-type: none | mandatory | proximity
(CSS3)
Définit si le scroll doit s'arrêter / s'accrocher sur les points d'accroche (enfants du container)
- mandatory: s'arrêter sur un point d'accroche lorsque le défilement s'arrête
- proximity: s'arrêter sur un point d'accroche s'il est suffisamment proche
```

![](https://i.imgur.com/TDTaMU7.png)

[Exemple scroll-snap-type](https://jsfiddle.net/amt01/7ywh1bnu/)

## resize

Définit la direction dans laquelle les éléments redimensionnables (comme les textarea) peuvent être redimensionnés (hauteur/largeur).

``` plain
resize: none | both | horizontal | vertical
(CSS3)
Définit les directions de redimension autorisées
```
