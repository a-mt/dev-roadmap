---
title: Transitions
category: Web, CSS, Propriétés
---

Les transitions permettent aux changements de valeur de propriétés de se produire en douceur sur une durée spécifiée.  
Elles se déclarent sur l'état initial de l'élément,
et sont appliquées lorsque les valeurs des propriétés changent, par exemple au focus ou même au changement de classe de l'élément.  
[Exemples transition](https://jsfiddle.net/amt01/5cor0o27/)

Il y a environ [50 propriétés qui peuvent être transitionnées](http://www.w3.org/TR/css3-transitions/#animatable-css)

## transition

``` plain
transition: <property> <duration> [<timing-function>] [<delay>]
(CSS3)
Raccourcis permettant de définir la transition d'un élément
```

``` plain
transition-property: all | <property> | none
(CSS3)
Définit sur quelle propriété s'applique la transition
```

``` plain
transition-duration: <time>
(CSS3)
Définit la durée de la transition
```

``` plain
transition-timing-function: ease | linear | ease-in | ease-out | ease-in-out |
                            step-start | step-end | steps(<n>[,start|end]) |
                            cubic-bezier(<x1>,<y1>,<x2>,<y2>)
(CSS3)
Définit le comportement de la transition (ease par défaut)
```

``` plain
transition-delay: <time>
(CSS3)
Définit un délai entre le déclenchement et la transition (0 par défaut)
```

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

<ins>transition-delay</ins> :

Le délai peut être utilisé pour démarrer une animation après une autre.  
[Exemple transition-delay](https://jsfiddle.net/amt01/13p6651L/)

<ins>transition-timing-function</ins> :

Par défaut, les transitions commencent lentement, accélèrent, puis ralentissent un peu avant de terminer - c'est le timing `ease`.
Il est possible de modifier ce comportement en utilisant une autre fonction, ou en définissant soi-même le comportement de la transition via `cubic-bezier()`.

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

### cubic-bezier()

La fonction cubic-bezier() permet de définir un timing personnalisé.  
Les mots clés `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out` sont en fait des [raccourcis pour les courbes bézier](https://developer.mozilla.org/fr/docs/Web/CSS/single-transition-timing-function#Mots-cl%C3%A9s_pour_les_fonctions_de_temporisation_usuelles) usuellement utilisées.

``` plain
cubic-bezier(x1,y1,x2,y2)
(CSS3)
Nombres entre 0 et 1, séparés par virgules
```

Les coordonnées indiquent les positions des poignées Bezier de début et de fin, qui tracent la progression de l'animation entre le début et la fin.
* plus la courbe est raide, plus l'animation est rapide
* plus la courbe est plate, plus l'animation est lente
* si la courbe fait des demi-tours, l'animation effectue des rebonds

[Exemples de courbes béziers](http://easings.net)  
[Créer une courbe bézier](http://cubic-bezier.com)

### steps()

La fonction steps permet d'afficher une animation par saccades, ce qui peut permettre de simuler une animation GIF par exemple.

``` plain
steps(<integer>, [start \| end])
(CSS3)
Nombres d'étapes et direction
```

[Exemples steps](https://jsfiddle.net/amt01/3e3o8y0q/)  
[Exemples: clock, cars, paws, progress](https://designmodo.com/demo/stepscss/index.html)  
[Exemple background-image sprite animation](http://jsfiddle.net/simurai/CGmCe/light/)
