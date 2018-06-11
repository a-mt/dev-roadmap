---
title: Image
category: Web, CSS, Propriétés
---

## object

Les éléments `<img>`, `<object>`, `<video>`,`<audio>`, `canvas` et `<iframe>` sont des objets dit *remplacés*, leur contenu est chargé à partir d'une ressource externe et est indépendent du CSS.
On peut modifier le comportement du contenu avec les proprités `object`.  
[Exemples object](https://jsfiddle.net/amt01/k3zh7Luf/)

``` plain
object-fit: fill | contain | cover | none | scale-down
(CSS3)
Définit la façon dont le contenu d'un élément replacé s'adapte à sa boîte
```

``` plain
object-position: (left | center | right | top | bottom | <length-percentage>){1,2}
(CSS3)
Définit l'alignement du contenu
```

## image

``` plain
image-orientation: from-image | <angle> | [ <angle>? flip ]
(CSS3)
Définit l'orientation de l'image
```

[Exemple image-orientation](https://jsfiddle.net/amt01/tu7w22qr/)

``` plain
image-rendering: auto | crisp-edges | pixelated
(CSS3)
Définit l'algorithme à utiliser pour redimensionner l'image
```

[Exemple image-rendering](https://jsfiddle.net/amt01/5uj14sbt/)
