---
title: Interractions utilisateur
category: Web, CSS, Propriétés
---

## pointer-events

Définit si un élément peut recevoir des événements de la souris (clic, sélection) [SVG].    
Lorsqu'on utilise la valeur `none`, cela indique que l'élément ne peut pas recevoir d'événement de pointeur mais qu'on peut passer "au travers" de l'élément pour atteindre des contrôles qui pourraient être derrière.

``` plain
pointer-events: auto | none |
                visiblePainted | visibleFill | visibleStroke | visible |
                painted | fill | stroke | all
```

---

## touch-action

Définit si une région donnée peut être manipulée par l'utilisateur grâce à des interactions tactiles (déplacer, zoomer).  
`touch-action: none` désactive toutes les interractions tactiles [CSS3]

``` plain
touch-action : [  [ pan-x | pan-left | pan-right ]
                  || [ pan-y | pan-up | pan-down ]
                  || pinch-zoom
               ] | manipulation
```

---

## scroll-behaviour

Définit le comportement du défilement (direct ou avec transition) [CSS3]

``` plain
scroll-behaviour: auto | smooth
```

[JSFiddle scroll-behaviour](https://jsfiddle.net/amt01/cphLuu59/)

## scroll-snap-type

Définit si le scroll doit s'arrêter / s'accrocher sur les points d'accroche (enfants du container) [CSS3]

``` plain
scroll-snap-type: none | mandatory | proximity
```

- `mandatory`: s'arrêter sur un point d'accroche lorsque le défilement s'arrête
- `proximity`: s'arrêter sur un point d'accroche s'il est suffisamment proche

![](https://i.imgur.com/TDTaMU7.png)

[JSFiddle scroll-snap-type](https://jsfiddle.net/amt01/7ywh1bnu/)

---

## resize

Définit la direction dans laquelle les éléments redimensionnables (comme les textarea) peuvent être redimensionnés (hauteur/largeur) [CSS3]

``` plain
resize: none | both | horizontal | vertical
```
