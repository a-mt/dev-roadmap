---
title: Layout
category: Web, CSS, Propriétés
---

## position

Définit la façon dont l'élément est positionné dans le document [CSS2]

``` plain
position: static | relative | absolute | fixed | sticky
```

| Position | Description |
|---       |---          |
| relative | Déplace l'élément par rapport à sa position initiale |
| absolute | Place l'élément par rappport à un parent en position relative - ou à la page si aucun.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| fixed    | Place l'élément par rapport au viewport - sa position reste donc toujours la même, même lorsqu'on scrolle.<br> L'élément est sorti du flow, les autres éléments agissent comme s'il n'existait pas |
| sticky   | Élément fixed relativement au parent |
| static   | Comportement par défaut |

[JSFiddle relative, absolute, fixed](https://jsfiddle.net/amt01/cck6mx93/)  
[JSFiddle sticky](https://jsfiddle.net/amt01/m5u2xkf7/)

## top, bottom, left, right

Permet de placer ou déplacer un élément.  
Leur comportement dépend la façon dont l'élément est positionné dans le document avec `position`.

* `top`  
  Permet de (dé)placer un élément à partir du haut (vers le bas) [CSS2]

  ``` plain
  top: <length> | <percentage> | auto
  ```

* `bottom`  
  Permet de (dé)placer un élément à partir du bas (vers le haut) [CSS2]

  ``` plain
  bottom: <length> | <percentage> | auto
  ```

* `left`  
  Permet de (dé)placer un élément à partir de la gauche (vers la droite) [CSS2]

  ``` plain
  left: <length> | <percentage> | auto
  ```

* `right`  
  Permet de (dé)placer un élément à partir de la droite (vers la gauche) [CSS2]

  ``` plain
  right: <length> | <percentage> | auto
  ```

---

## z-index

Définit la priorité entre deux positionnés en CSS lorsqu'ils se chevauchent (position différente de `static`) [CSS2]  
2 est prioritaire sur 1

<ins>Définition</ins>:

``` plain
z-index: <number>
```

<ins>Exemple</ins>:

``` css
{
  position: absolute;
  top: 15px;
  left: 5px;
  z-index: 1;
}
```

---

## float

La propriété `float` a pour effet de décaler un élément vers la droite ou vers la gauche jusqu'à ce qu'il touche le bord de son conteneur ou un autre élément flottant.
Les éléments situés avant le float ne sont pas affectés. Les éléments situé après le float s'adaptent à la position du ou des éléments flottant(s).
Pour que les éléments qui suivent reprennent leur comportement par défaut, utiliser `clear`.  

* `float` rend l'élément "flottant" [CSS1]

  ``` plain
  float: left | right | none
  ```

* `clear` stoppe les effets du float [CSS1]

  ``` plain
  clear: left | right | both
  ```

<ins>Exemple</ins>:

``` scss
{
  li {
    float: left;
    list-style-type: none;
  }
  &::after {
    content: "";
    display: table;
    clear: right;
  }
}
```

[JSFiddle float & clear](https://jsfiddle.net/amt01/k2okfe2w/)

Si un élément flottant est plus grand en hauteur que l'élément qui le contient, son contenu va déborder du parent.
Pour parer ce problème, il faut rajouter un élément vide avec `clear` à la suite du float
(soit en ajoutant un élément vide dans le HTML soit en utilisant la propriété `content`).  
[JSFiddle clearfix avec "content"](http://www.w3schools.com/cssref/tryit.asp?filename=trycss_float_clear_overflow)