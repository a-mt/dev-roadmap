---
title: Image
category: Web, CSS, Propriétés
---

## object-fit, object-position

Les éléments `<img>`, `<object>`, `<video>`,`<audio>`, `canvas` et `<iframe>` sont des objets dit *remplacés*, leur contenu est chargé à partir d'une ressource externe et est indépendent du CSS.
On peut modifier la manière dont un objet remplacé s'adapte et est positionné dans sa boîte grâce à `object-fit` et `object-position`.  

* `object-fit` définit la façon dont un élément remplacé s'adapte à sa boîte [CSS3]

  ``` plain
  object-fit: fill | contain | cover | none | scale-down
  ```

* `object-position` définit l'alignement d'un élément remplacé à l'intérieur de sa boîte [CSS3]

  ``` plain
  object-position: (left | center | right | top | bottom | <length-percentage>){1,2}
  ```

[JSFiddle object-fit, object-position](https://jsfiddle.net/amt01/k3zh7Luf/)

---

## image-orientation

Définit l'orientation d'une image [CSS3]

``` plain
image-orientation: from-image | <angle> | [ <angle>? flip ]
```

[JSFiddle image-orientation](https://jsfiddle.net/amt01/tu7w22qr/)

## image-rendering

Définit l'algorithme à utiliser pour redimensionner l'image [CSS3]

``` plain
image-rendering: auto | crisp-edges | pixelated
```

[JSFiddle image-rendering](https://jsfiddle.net/amt01/5uj14sbt/)

---

## filter

Les filtres permettent d'appliquer des effets à une image, un arrière-plan ou des bordures: flou, saturation, etc.

<ins>Définition</ins>:

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

<ins>Exemple</ins>:

``` css
{
  filter: contrast(175%) brightness(103%);
}
```

[JSFiddle filter](https://jsfiddle.net/amt01/f5avs5jq/)