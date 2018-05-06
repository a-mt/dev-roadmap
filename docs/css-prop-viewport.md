---
title: Viewport
category: Web, CSS, Propriétés
---

``` css
@viewport { 
  width: device-width; 
  zoom: 1; 
}
```

Les propriétés suivantes s'appliquent à l'intérieur d'une at-rule `@viewport`:

``` plain
min-width: <length> | <percent>
(CSS3)
Définit la largeur minimale du viewport
```

``` plain
max-width: <length> | <percent>
(CSS3)
Définit la largeur maximale du viewport
```

``` plain
width: [<length> | <percent>]{1,2}
(CSS3)
Raccourcis permettant de définir la largeur minimale et maximale du viewport
Identiques si une seule valeur
```

``` plain
min-height: <length> | <percent>
(CSS3)
Définit la hauteur minimale du viewport
```

``` plain
max-height: <length> | <percent>
(CSS3)
Définit la hauteur maximale du viewport
```

``` plain
height: [<length> | <percent>]{1,2}
(CSS3)
Raccourcis permettant de définir la hauteur minimale et maximale du viewport
```

``` plain
zoom: <number> | <percent>
(CSS3)
Définit le zoom initiale
Pour aucun zoom: 1.0 ou 100%
```

``` plain
min-zoom: <number> | <percent>
(CSS3)
Définit le niveau de zoom minimal
```

``` plain
max-zoom: <number> | <percent>
(CSS3)
Définit le niveau de zoom maximal
```

``` plain
user-zoom: zoom | fixed
(CSS3)
Définit si l'utilisateur peut changer le niveau de zoom ou non
```

``` plain
orientation: portrait | landscape | auto
(CSS3)
Définit l'orientation du document
```
