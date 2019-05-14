---
title: Animations
category: Web, CSS, Propriétés
---

Pour obtenir des animations plus complexes qu'avec une simple transition, on peut utiliser la propriété `animation` - par exemple pour [répéter une transformation plusieurs fois](https://jsfiddle.net/amt01/279mn08f/).

## animation-name

Définit l'animation à utiliser [CSS3]  
Cette animation doit avoir été crée au préalable avec [`@keyframes`](css-atrules.md#keyframes)

``` plain
animation-name: <string>
```

---

## animation-duration

Définit la durée de l'animation [CSS3]

``` plain
animation-duration: <time>
```

---

## animation-timing-function

Définit le comportement de l'animation [CSS3]

``` plain
animation-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                           step-start | step-end | steps(<n>[,start|end]) |
                           cubic-bezier(<x1>,<y1>,<x2>,<y2>)
```

Même format que [`transition-timing-function`](css-prop-transition.md#transition-timing-function)

---

## animation-delay

Définit un délai entre le déclenchement et l'animation [CSS3]  
0 par défaut

``` plain
animation-delay: <time>
```

---

## animation-iteration-count

Définit le nombre de fois où l'animation est répétée [CSS3]  
1 par défaut

``` plain
animation-iteration-count: <number> | infinite
```

---

## animation-direction

Définit dans quel sens appliquer l'animation [CSS3]  
(de from à to / de to à from ,l'un après autre)

``` plain
animation-direction: normal | reverse | alternatve | alternate-reverse
```

Pour utiliser la direction `alternate`, il faut un `animation-iteration-count` au moins égal à 2  
(1 pour l'aller, 1 pour le retour).  
[JSFiddle animation direction](https://jsfiddle.net/amt01/f5sk7avy/)

---

## animation-fill-mode

Définit la façon ont l'animation doit s'appliquer [CSS3]

``` plain
animation-fill-mode: none | backwards | forwards | both
```

| Valeur    | Description                                                        |
|---        |---                                                                 |
| backwards | Applique la première frame de l'animation avant qu'elle ne démarre |
| forwards  | Applique la dernière frame après que l'animation soit finit        |
| both      | Applique backwards + forwards                                      |

[JSFiddle animation-fill-mode](https://jsfiddle.net/amt01/mewoxegd/)

---

## animation-play-state

Permet de mettre l'animation en pause [CSS3]

``` plain
animation-play-state: running | paused
```

---

## animation

Raccourci pour les propriétés ci-dessus [CSS3]

<ins>Définition</ins>:

``` plain
animation: <name> <duration>
            [<timing-function>] [<delay>]
            [<iteration-count>] [<direction>]
            [<fill-mode>] [<play-state>]
```

<ins>Exemple</ins>:

``` css
.anim {
    animation: slide 2s;
}
@keyframes slide {
    to { transform: translateX(900px); }
}
```

<ins>Multiples animations</ins> :

Plusieurs animations peuvent s'appliquer à un élément, en les séparant par des virgules

``` css
{
  animation: slideIn 0.8s linear,
             fadeIn 0.2s ease-in;
}
```

Est équivalent à

``` css
{
  animation-name: slideIn, fadeIn;
  animation-duration: 0.8s, 0.2s;
  animation-timing-function: linear, ease-in;
}
```

[JSFiddle multiples animations](https://jsfiddle.net/amt01/h9myq4t4/)

---

## will-change

La propriété `will-change` permet d'indiquer au navigateur que l'élément va changer pour que le navigateur mette en place des optimisations avant que l'élément ne change vraiment. Cela permet d'augmenter la réactivité de la page en effectuant des calculs (éventuellement coûteux) en prévision du changement.

`will-change` est conçu pour être utilisé en dernier ressort afin de régler les problèmes de performances existants. En utilisant `will-change` trop souvent, cela consommera plus de mémoire, complexifiera le rendu de la page pour le navigateur (qui se préparera au changement). En bref, cela réduira les performances de la page.

<ins>Définition</ins>:

``` plain
will-change: <property>
```

<ins>Exemple</ins>:

``` css
{
  will-change: opacity;
}
```
