---
title: Filtres
category: Web, CSS, Propriétés
---

## filter

Les filtres permettent d'appliquer des effets à une image, un arrière-plan ou des bordures: flou, saturation, etc.  
[Exemples filter](https://jsfiddle.net/amt01/f5avs5jq/)

``` plain
filter: blur( <length> ) ||
        brightness( <number-percentage> ) ||
        saturate( <number-percentage> ) ||
        hue-rotate( <angle> ) ||
        contrast( <number-percentage> ) ||
        invert( <number-percentage> ) ||
        grayscale( <number-percentage ) ||
        sepia( <number-percentage> ) ||
        opacity( <number-percentage> ) ||
        drop-shadow( <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ) ||
        url( <uri svg> )
```

| Filtre          | Description
|---              |---
| `blur()`        | Flou gaussien
| `brightness()`  | Modifie la luminosité<br> 0% noir, 100% image d'origine, >100% augmente la luminosité
| `contrast()`    | Modifie le contraste<br> 0% gris, 100% image d'origine, >100% augmente le contraste
| `drop-shadow()` | Ombre portée
| `grayscale()`   | Niveau de gris<br> 100% niveau de gris, 0% image d'origine
| `sepia()`       | Sepia<br> 100% sepia, 0% image d'origine
| `hue-rotate()`  | Rotation de teinte<br> 0deg image d'origine
| `invert()`      | Inverse les couleurs
| `opacity()`     | Modifie l'opacité<br> 100% image d'origine, 0% transparent
| `saturate()`    | Modifie la saturation<br> 0% désaturé, 100% image d'origine, >100% saturé

``` css
{
  filter: contrast(175%) brightness(103%);
}
```
