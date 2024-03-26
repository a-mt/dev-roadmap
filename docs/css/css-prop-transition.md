---
title: Transitions
category: Web, CSS, Propriétés
---

Les transitions permettent aux changements de valeur de propriétés de se produire en douceur sur une durée spécifiée.  
Elles se déclarent sur l'état initial de l'élément,
et sont appliquées lorsque les valeurs des propriétés changent, par exemple au focus ou même au changement de classe de l'élément.  
Il y a environ [50 propriétés qui peuvent être transitionnées](http://www.w3.org/TR/css3-transitions/#animatable-css)

---

## transition-property

Définit sur quelle propriété s'applique la transition [CSS3]

``` plain
transition-property: all | <property> | none
```

[JSFiddle transition](https://jsfiddle.net/amt01/5cor0o27/)

---

## transition-duration

Définit la durée de la transition [CSS3]

``` plain
transition-duration: <time>
```

---

## transition-timing-function

Définit le comportement de la transition [CSS3]

``` plain
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                            step-start | step-end | steps(<n>[,start|end]) |
                            cubic-bezier(<x1>,<y1>,<x2>,<y2>)
```

Par défaut, les transitions commencent lentement, accélèrent, puis ralentissent un peu avant de terminer - c'est le timing `ease`.
Il est possible de modifier ce comportement en utilisant une autre fonction, ou en définissant soi-même le comportement de la transition via [`cubic-bezier()`](css-values.md#cubic-bezier). On peut également créer une animation frame par frame, à la manière d'un GIF, avec [`steps()`](css-values.md#steps)

<table>
  <thead>
    <tr>
      <th>Valeur</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ease</code></td>
      <td>Commence lentement, accèlère puis ralentit (par défaut)</td>
    </tr>
    <tr>
      <td><code>linear</code></td>
      <td>Vitesse constante</td>
    </tr>
    <tr>
      <td><code>ease-in</code></td>
      <td>Commence lentement puis accèlère</td>
    </tr>
    <tr>
      <td><code>ease-out</code></td>
      <td>Commence rapidement puis ralentit</td>
    </tr>
    <tr>
      <td><code>ease-in-out</code></td>
      <td>Similaire à ease mais plus rapide au milieu</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>cubic-bezier(x1,y1,x2,y2)</code></td>
      <td>Timing personnalisé</td>
    </tr>
    <tr>
      <td colspan="2"></td>
    </tr>
    <tr>
      <td><code>steps(&lt;integer&gt;, [start \| end])</code></td>
      <td>Avancer par saccades</td>
    </tr>
    <tr>
      <td><code>step-start</code></td>
      <td>Équivaut à steps(1, start)</td>
    </tr>
    <tr>
      <td><code>step-end</code></td>
      <td>Équivaut à steps(1, end)</td>
    </tr>
  </tbody>
</table>

---

## transition-delay

Définit un délai entre le déclenchement et la transition [CSS3]  
0 par défaut

``` plain
transition-delay: <time>
```
Le délai peut être utilisé pour démarrer une animation après une autre.  
[JSFiddle transition-delay](https://jsfiddle.net/amt01/13p6651L/)

---

## transition

Est un raccourci pour les propriétés précédentes [CSS3]

``` plain
transition: <property> <duration> [<timing-function>] [<delay>]
```

<ins>Exemple</ins>:

``` scss
{
  background-color: orange;
  transition: background 1s;

  &:hover {
    background-color: blue;
  }
}
```

<ins>Multiples transitions</ins> :

Une transition peut porter sur une propriété en particulier ou toutes.  
Pour appliquer différentes transitions sur différentes propriétés, les définir séparées par une virgule.

``` css
transition: background 1s, opacity 0.5s 0.5s;
```

Est équivalent à

``` css
transition-property: background, opacity;
transition-duration: 1s, 0.5s;
transition-delay: 0s, 0.5s;
```