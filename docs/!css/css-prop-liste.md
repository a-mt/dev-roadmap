---
title: Liste
category: Web, CSS, Propriétés
---

## list

* `list-style-type`  
  Définit le style de puce à utiliser [CSS1]

  ``` plain
  list-style-type:  disc | circle | square | decimal | decimal-leading-zero |
                    lower-roman | upper-roman | lower-greek | lower-latin | upper-latin |
                    armenian | georgian | lower-alpha | upper-alpha | none
  ```

  [@counter-style](css-atrules.md#counter-style) permet de définir de nouveaux styles de puce.  
  [symbols()](css-values#symbols) permet d'en créer à la volée.

* `list-style-position`  
  Définit si les puces sont affichés à l'intérieur ou à l'extérieur des bordures du li [CSS1]

  ``` plain
  list-style-position: inside | outside
  ```

* `list-style-image`  
  Définit l'image à utiliser comme puce [CSS2]

  ``` plain
  list-style-image: <image> | none
  ```

* `list-style`  
  Raccourcis permettant de définir le style d'une liste [CSS1,2]

  ``` plain
  list-style: <list-style-type> <list-style-position> <list-style-image>
  ```

<ins>Exemple</ins>:

``` css
{
  list-style-type: none;
}
```

---

## counter

Les compteurs sont des variables que l'on incrémente en CSS à chaque fois qu'elles sont utilisées.  
Cela permet d'ajouter une numérotation dans la page en dehors des `<li>`.  

* `counter-increment`  
  Incrémente la valeur du compteur `nomducompteur` à chaque fois qu'il s'applique à un élément [CSS3]

  ``` plain
  counter-increment: <string>
  ```

* `counter-reset`  
  Réinitialise le compteur à 0 [CSS3]

  ``` plain
  counter-reset: <string>
  ```

Les fonctions [`counter()` et `counters()`](css-values.md#counter) permettent de récupérer la valeur du counter.

<ins>Exemple</ins>:

``` scss
{
  counter-increment: moncounter;

  *:first-child {
    counter-reset: moncounter;
  }
  &::before {
    content: counters(nom, ".");
  }
}
```

[JSFiddle counter](https://jsfiddle.net/amt01/h4p6rjaw/)