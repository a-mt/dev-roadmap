---
title: Flex
category: Web, CSS, Propriétés
---

Les flex-boxs permettent de disposer les éléments d'une page, un peu comme les float,
mais de telle sorte qu'ils aient toujours le même comportement quelle que soit la taille de l'écran.
Permet d'obtenir un layout responsive facilement.  

## flex-flow (container)

* `display: flex` rend tous les enfants de l'élément courant "flexibles" [CSS3]  
  Les propriétés flex n'ont aucun effet si le type du bloc n'est pas flex.

  ``` plain
  display: flex
  ```

* `flex-direction`  
  Définit si les enfants doivent être affichés en ligne ou en colonne [CSS3]

  ``` plain
  flex-direction: row | row-reverse | column | column-reverse
  ```

* `flex-wrap`  
  Définit si les enfants doivent être affichés sur plusieurs lignes, s'ils ne rentrent pas dans le container en une ligne [CSS3]

  ``` plain
  flex-wrap: nowrap | wrap | wrap-reverse
  ```

* `flex-flow`  
  Est un raccourci pour `flex-direction` et `flex-wrap` [CSS3]

  ``` plain
  flex-flow: <direction> <wrap>
  ```

---

## align-items (container)

* `justify-content`  
  Définit l'alignement des enfants à l'intérieur de l'élément (début, fin, centre, etc) [CSS3]

  ``` plain
  justify-content: flex-start | flex-end | center | space-between | space-around
  ```

* `align-items`  
  Définit l'alignement des enfants sur l'axe secondaire [CSS3]

  ``` plain
  align-items: stretch | flex-start | flex-end | center | baseline
  (= vertical si les enfants sont affichés en colonne et inversemment)
```

* `align-content`  
  Définit le comportement des lignes sur l'axe secondaire lorsqu'il y en a plusieurs [CSS3]

  ``` plain
  align-content: stretch | flex-start | flex-end | center | space-between | space-around
  ```

<ins>Exemple</ins>:

``` css
{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  align-content: space-around;
}
```

---

## flex (child)

* `flex-basis`  
  Définit la taille de base de l'élément (avant d'etre traitée par `flex-grow` / `flex-shrink`) [CSS3]  
  Définit la largeur de l'élément si` flex-direction: row`, la hauteur sinon

  ``` plain
  flex-basis: <length>
  ```

* `flex-grow`  
  Définit le facteur d'agrandissement de l'élément pour remplir le conteneur [CSS3]  
  0 par défaut

  ``` plain
  flex-grow: <number>
  ```

* `flex-shrink`  
  Définit le facteur de rétrécissement de l'élément pour rentrer dans le conteneur [CSS3]  
  1 par défaut (inférieur à 1: agrandir, supérieur à 1 : rétrécir)

  ``` plain
  flex-shrink: <number>
  ```

* `flex`  
  Est un raccourci pour `flex-grow`, `flex-shrink` et `flex-basis` [CSS3]

  ``` plain
  flex: <grow> <shrink> <basis>
  ```

<ins>Exemple</ins>:

``` css
{
  flex-basis: 4em;
  flex-grow: 1;
}
```

---

## align-self (child)

* `order`  
  Modifie l'ordre HTML des enfants [CSS3]

  ``` plain
  order: <number>
  ```

* `align-self`  
  Écrase align-items au niveau de l'enfant [CSS3]

  ``` plain
  align-self: stretch | flex-start | flex-end | center | baseline
  ```

<ins>Exemple</ins>:  
[JSFiddle flexbox](https://jsfiddle.net/amt01/8hcbz999/)