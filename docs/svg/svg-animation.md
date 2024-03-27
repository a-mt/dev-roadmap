---
title: "SVG: Animations"
category: Web, HTML, SVG
---

Il est possible d'animer le contenu SVG en utilisant le format SMIL (*Synchronized Multimedia Integration Language*). SMIL est un langage de la famille XML qui décrit le déroulement temporel et spatial des différents composants intégrés (images, sons, textes, etc).  

On peut également utiliser les animations et transformations CSS, ainsi que l'API Web Animations, mais on ne s'intéresse ici qu'à la syntaxe des animations SVG natives.

## animate

* La balise `<animate>` permet d'animer un élément en incrémentant/décrementant un des attributs numérique de son parent.  
  Dans l'exemple suivant, animate modifie la valeur de l'attribut `stroke-dashoffset`

  ``` html
  <rect width="80" height="80" x="5" y="5"
        stroke="black" stroke-width="5"
        stroke-dasharray="10 5" stroke-dashoffset="0"
        fill="none">
    <animate
      attributeType="XML"
      attributeName="stroke-dashoffset"
      from="-5" to="10"
      dur="1s" repeatCount="indefinite" />
  </rect>
  ```

  <svg with="100" height="100">
    <rect width="80" height="80" x="5" y="5"
      stroke="black" stroke-width="5" stroke-dasharray="10 5" stroke-dashoffset="0" fill="none">
      <animate
        attributeType="XML"
        attributeName="stroke-dashoffset"
        from="-5" to="10"
        dur="1s" repeatCount="indefinite" />
    </rect>
  </svg>

* Les différents attributs possible (d'animate) sont:

  | Attribut        | Description
  |---              |---
  | `attributeType` | Type d'attribut à animer, `CSS` ou `XML`
  | `attributeName` | Nom de l'attribut ou de la propriété CSS
  | `from`          | Valeur de départ, numérique dans le cas de `<animate>`
  | `to`            | Valeur finale
  | `dur`           | Durée de l'animation
  | `repeatCount`   | Un entier ou `indefinite`, nombre de répétition de l'animation (l'animation dure `repeatCount*dur`)
  | `repeatDur`     | Un entier ou `indefinite`, nombre de répétition de l'animation pendent le temps `dur` imparti
  | `fill`          | Spécifie si l'image doit garder son état au moment où l'animation se termine (`freeze`) ou reprendre son état d'origine (`remove`, *par défaut*)
  | `begin`, `end`  | Contrôlent ce qui déclenche et stoppe l'animation

  La valeur de begin (ou end) peut être:

  - un timer: `4s`
  - une autre animation (ID) suivie de .begin, .end, ou .repeat(x) pour indiquer de se synchroniser avec le début, la fin ou le début de la xème répétition de l'animation: `monanimation.begin`, `monanimation.end`, `monanimation.repeat(2)`
  - un événement: `mouseover`, `mouseout`
  - un raccourci clavier: `accessKey(s)`

  On peut spécifier de multiples éléments déclencheurs, en spécifiant plusieurs valeurs séparées par des point-virgules.  
  Par exemple, pour déclencher l'animation au chargement de la page (0s) et à la fin d'une autre animation(dashRtl.end):

  ``` html
  <rect width="80" height="80" x="5" y="5"
        stroke="black" stroke-width="5"
        stroke-dasharray="10 5" stroke-dashoffset="0"
        fill="none">
    <animate
      attributeType="XML"
      attributeName="stroke-dashoffset"
      from="-5" to="10"
      dur="1s" repeatCount="3"
      id="dashLtr" begin="0s;dashRtl.end" />
    <animate
      attributeType="XML"
      attributeName="stroke-dashoffset"
      from="10" to="-5"
      dur="1s" repeatCount="3"
      id="dashRtt" begin="dashLtr.end" />
  </rect>
  ```

  <svg with="100" height="100">
    <rect width="80" height="80" x="5" y="5"
      stroke="black" stroke-width="5" stroke-dasharray="10 5" stroke-dashoffset="0" fill="none">
      <animate
        id="dashLr"
        attributeType="XML"
        attributeName="stroke-dashoffset"
        from="-5" to="10"
        begin="0s;dashRl.end"
        dur="1s" repeatCount="3"/>
      <animate
        id="dashRl"
        attributeType="XML"
        attributeName="stroke-dashoffset"
        from="10" to="-5"
        begin="dashLr.end"
        dur="1s" repeatCount="3"/>
    </rect>
  </svg>

## animateTransform

La balise `<animateTransform>` permet d'animer un élément en utilisant une transformation, comme la rotation.  
Le type de transformation à utiliser est spécifié par l'attribut `type`.  
Les paramètres de cette transformation sont spécifiés par les attributs `from` et `to` — qui accepterons différentes valeurs suivant le type de transformation choisie

| Type de transformation | Valeur from/to
|--- |---
| `translate` | `x [y]` (= prend une ou deux valeurs)
| `scale` | `x [y]`
| `rotate` | `angle_degre [x y]` où x et y est la position du centre de rotation
| `skewX`, `skewY` | `angle_degre`

``` html
<svg with="100" height="100">
  <rect width="20" height="20" x="5" y="5" fill="black">
    <animateTransform
      attributeType="XML"
      attributeName="transform"
      type="rotate"
      from="0 50 50" to="360 50 50"
      dur="7s" repeatCount="indefinite"/>
  </rect>
</svg>
```

<svg with="100" height="100">
  <rect width="20" height="20" x="5" y="5" fill="black">
    <animateTransform
      attributeType="XML"
      attributeName="transform"
      type="rotate"
      from="0 50 50" to="360 50 50"
      dur="7s" repeatCount="indefinite"/>
  </rect>
</svg>

## animateMotion

La balise `<animateMotion>` permet d'animer un élément en suivant un `path` donné.

``` html
<svg with="100" height="100">
  <rect width="10" height="10" x="5" y="5" fill="black">
    <animateMotion
      path="M0,50 C 50,10 50,10 100,50Z"
      dur="3s" repeatCount="indefinite" />
    </animateMotion>
  </rect>
</svg>
```

<svg with="100" height="100">
  <rect width="10" height="10" x="0" y="0" fill="black">
    <animateMotion
      path="M0,50 C 50,10 50,10 100,50Z"
      dur="3s" repeatCount="indefinite" />
    </animateMotion>
  </rect>
</svg>

On peut également utiliser un élément `<mpath>` à l'intérieur de l'animation pour référencer un path prédéfinit.

``` html
<svg with="100" height="100">
  <path id="path" d="M0,50 C 50,10 50,10 100,50Z" stroke="black" fill="none" />
  <rect width="10" height="10" x="0" y="0" fill="black">
    <animateMotion
      dur="3s" repeatCount="indefinite">
      <mpath xlink:href="#path" />
    </animateMotion>
  </rect>
</svg>
```

<svg with="100" height="100">
  <path id="path" d="M0,50 C 50,10 50,10 100,50Z" stroke="black" fill="none" />
  <rect width="10" height="10" x="0" y="0" fill="black">
    <animateMotion
      dur="3s" repeatCount="indefinite">
      <mpath xlink:href="#path" />
    </animateMotion>
  </rect>
</svg>

## set

La balise `set` ne permet pas de créer des animations à proprement parler (il n'y a pas de transitions), mais de changer la valeur d'un attribut.

<ins>Déclenché par l'utilisateur</ins>:

``` html
<rect x="5" y="5" dur="4s" width="90" height="90" stroke="blue" fill="white">
  <set attributeName="stroke" to="red" 
       begin="mouseover" end="mouseout" />
</rect>
```

<svg width="100" height="100">
  <rect x="5" y="5" dur="4s" width="90" height="90" stroke="blue" fill="white">
     <set attributeName="stroke" to="red" 
          begin="mouseover" end="mouseout" />
  </rect>
  <text x="10" y="50" pointer-events="none">Hover rect</text>
</svg>

<ins>Déclenché par une animation</ins>:

``` html
<rect x="5" y="5" width="0" height="90" fill="blue">
  <animate attributeName="width" from="0" to="90"
           id="myLoop" begin="0s;myLoop.end" dur="4s"
           repeatCount="3" />
  <set attributeName="fill" to="green" begin="myLoop.begin" />
  <set attributeName="fill" to="gold" begin="myLoop.repeat(1)" />
  <set attributeName="fill" to="red" begin="myLoop.repeat(2)" />
</rect>
```

<svg width="100" height="100">
  <rect x="5" y="5" width="0" height="90" fill="blue">
    <animate attributeName="width" from="0" to="90"
             id="myLoop" begin="0s;myLoop.end" dur="4s"
             repeatCount="3" />
    <set attributeName="fill" to="green" begin="myLoop.begin" />
    <set attributeName="fill" to="gold" begin="myLoop.repeat(1)" />
    <set attributeName="fill" to="red" begin="myLoop.repeat(2)" />
  </rect>
  <text x="10" y="50">3x 4s</text>
</svg>