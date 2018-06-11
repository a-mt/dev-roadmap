---
title: Box Model
category: Web, CSS, Propriétés
---

Pour obtenir des animations plus complexes qu'avec une simple transition, on peut utiliser la propriété `animation` - par exemple pour [répéter une transformation plusieurs fois](https://jsfiddle.net/amt01/279mn08f/).

## @keyframes

Une instruction `@keyframes` définit une animation. Pour ce faire, on liste tous les changements et transformations que va subir l'élément auquel sera assigné l'animation.

``` plain
@keyframes <string> {
  (from | to | <percentage>) {
      <declaration-list>
  }+
}
(CSS3)
Crée une animation
```

``` css
@keyframes myAnimation {
  from { color:black; }
  50% { color: red; }
  to { color:black; }
}
```

## animation

Une fois définie, l'animation est assigné à un élément via la propriété `animation`.

``` plain
animation: <name> <duration>
            [<timing-function>] [<delay>]
            [<iteration-count>] [<direction>]
            [<fill-mode>] [<play-state>]
(CSS3)
Raccourcis permettant de définir l'animation à appliquer
```

``` plain
animation-name: <string>
(CSS3)
Définit l'animation à utiliser
```

``` plain
animation-duration: <time>
(CSS3)
Définit la durée de l'animation
```

``` plain
animation-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                           step-start | step-end | steps(<n>[,start|end]) |
                           cubic-bezier(<x1>,<y1>,<x2>,<y2>)
(CSS3)
Définit le comportement de l'animation (ease par défaut)
```

``` plain
animation-delay: <time>
(CSS3)
Définit un délai entre le déclenchement et l'animation (0 par défaut)
```

``` plain
animation-iteration-count: <number> | infinite
(CSS3)
Définit le nombre de fois où l'animation est répétée (1 par défaut)
```

``` plain
animation-direction: normal | reverse | alternatve | alternate-reverse
(CSS3)
Définit dans quel sens appliquer l'animation (de from à to, de to à from, l'un après autre)
```

``` plain
animation-fill-mode: none | backwards | forwards | both
(CSS3)
Définit la façon ont l'animation doit s'appliquer
```

``` plain
animation-play-state: running | paused
(CSS3)
Définit lorsque l'animation est en pause
```

``` css
.anim {
    animation: slide 2s;
}
@keyframes slide {
    to { transform: translateX(900px); }
}
```

<ins>animation-direction</ins> :

Pour utiliser la direction alternate, il faut un `animation-iteration-count` au moins égal à 2 (1 pour l'aller, 1 pour le retour).  
[Exemple animation direction](https://jsfiddle.net/amt01/f5sk7avy/)

<ins>animation-fill-mode</ins> :

| Valeur    | Description                                                        |
|---        |---                                                                 |
| backwards | Applique la première frame de l'animation avant qu'elle ne démarre |
| forwards  | Applique la dernière frame après que l'animation soit finit        |
| both      | Applique backwards + forwards                                      |

[Exemples animation-fill-mode](https://jsfiddle.net/amt01/mewoxegd/)

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

[Exemples multiples animations](https://jsfiddle.net/amt01/h9myq4t4/)

## will-change

La propriété `will-change` permet d'indiquer au navigateur que l'élément va changer pour que le navigateur mette en place des optimisations avant que l'élément ne change vraiment. Cela permet d'augmenter la réactivité de la page en effectuant des calculs (éventuellement coûteux) en prévision du changement.

`will-change` est conçu pour être utilisé en dernier ressort afin de régler les problèmes de performances existants. En utilisant `will-change` trop souvent, cela consommera plus de mémoire, complexifiera le rendu de la page pour le navigateur (qui se préparera au changement). En bref, cela réduira les performances de la page.

``` plain
will-change: <property>
(CSS3)
Indique qu'une propriété va changer
```

``` css
{
  will-change: opacity;
}
```
