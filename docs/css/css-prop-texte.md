---
title: Texte
category: Web, CSS, Propriétés
---

## color

Définit la couleur du texte.

<ins>Définition</ins>: [CSS1]

``` plain
color: <color>
```

<ins>Exemple</ins>:

``` css
{
  color: #333;
}
```

---

## text-decoration

* `text-decoration` définit la décoration du texte (souligné, barre supérieure, barré) [CSS1]

    ``` plain
    text-decoration: underline | overline | line-through
    ```

* `text-decoration-color` définit la couleur de la décoration [CSS3]

    ``` plain
    text-decoration-color: <color>
    ```

* `text-decoration-style` définit le style de la décoration (trait, pointillés, etc) [CSS3]


    ``` plain
    text-decoration-style: solid |double | dotted | dashed | wavy
    ```

---

## text-transform

Définit la casse affichée (minuscule, majscule, première lettre en majuscule) [CSS1]

``` plain
text-transform: lowercase | uppercase | capitalize | none
```

---

## text-indent

Définit l'indentation de la première ligne d'un paragraphe [CSS1]

``` plain
text-indent: <length> | <percentage>
```

## text-align, text-justify

* `text-align` définit l'alignement du texte [CSS1]

    ``` plain
    text-align: center | left | right | justify | auto
    ```

* `text-align-last` définit l'alignement de la dernière ligne de texte d'un paragraphe [CSS3]

    ``` plain
    text-align-last: center | left | right | justify | auto
    ```

* `text-justify` définit le type de justification à appliquer à un texte justifié [CSS3]

    ``` plain
    text-justify: auto | inter-character | inter-word | none
    ```

## hyphens

Définit si les mots doivent être césurés ou non [CSS3]
- auto : ajouter des césures si nécessaire
- manual: uniquement lorsqu'il y a un &hyphen; ou &shy;

``` plain
hyphens: manual | auto
```

[JsFiddle hyphens](https://codepen.io/SitePoint/pen/iusvq)

---

## text-shadow

Ajoute une ombre au texte (accepte une liste séparées par des virgules) [CSS3]

``` plain
text-shadow: <horizontal offset> <vertical offset> <blur radius> <color> | none
```

---

## text-overflow

Ajoute une ellipse (...) lorsque du texte est caché par overflow [CSS3]

``` plain
text-overflow: clip | ellipsis
```

<ins>Exemple</ins>:

``` css
{
  width: 500px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

## text-rendering

Définit ce qui doit être optimisé lors de l'affichage du texte [SVG]  
Permet de faire des compromis entre la vitesse, la lisibilité (crénage, ligatures) et la précision géométrique.

``` plain
text-rendering: auto | optimizeSpeed | optimizeLegibility | geometricPrecision
```

---

## text-emphasis

* `text-emphasis-style`  
  Définit le caractère à utiliser pour marquer l'emphase [CSS3]

    ``` plain
    text-emphasis-style: ([dot | circle| double-circle | triangle | sesame] [filled | open]) | <string>
    ```

* `text-emphasis-color`  
  Définit la couleur du caractère d'emphase [CSS3]

    ``` plain
    text-emphasis-color: <color>
    ```

* `text-emphasis`  
  Est un raccourcis pour `text-emphasis-style` et `text-emphasis-color` [CSS3]

    ``` plain
    text-emphasis: <style> <color>
    ```

* `text-emphasis-position`  
  Définit la position du caractère d'emphase [CSS3]

    ``` plain
    text-emphasis-position: [ over | under ] && [ right | left ]
    ```

<ins>Exemple</ins>:

``` css
{
  text-emphasis-style: circle open;
  text-emphasis-color: red;
  text-emphasis-position: under left;
}
```

[JSFiddle text-emphasis](https://jsfiddle.net/amt01/g0erc233/)

---

## letter-spacing

Définit l'espacement entre deux lettres [CSS1]

``` plain
letter-spacing: normal | <length>
```

## word-spacing

Définit la longueur de l'espacement entre deux mots [CSS3]

``` plain
word-spacing: normal | <length>
```

---

## word-break

Spécifie si les retours à la ligne sont autorisés au milieu d'un mot [CSS3]

``` plain
word-break: break-all | keep-all | normal
```

## word-wrap

Définit si les retours à la ligne sont autorisés au milieu d'un mot  
Conserve le retour à la ligne automatique à la fin du mot [CSS3]

``` plain
word-wrap: break-word | normal
```

[JSFiddle Différences entre word-break et word-wrap](https://jsfiddle.net/amt01/dtghap8t/)

## white-space

Définit le comportement du texte lorsqu'il dépasse la largeur du bloc parent (retour à la ligne ou non) [CSS1]

``` plain
white-space: pre | pre-line | pre-wrap | normal
```

---

## line-break

Définit la façon dont les sauts de ligne sont gérés  
Affecte uniquement les textes en chinois, japonais ou coréen (CJK) [CSS3]

``` plain
line-break: auto | loose | normal | strict
```

## hanging-punctuation

Définit si un signe de ponctuation se situant au début à la fin d'une ligne de texte doit rester sur cette ligne [CSS3]

``` plain
hanging-punctuation: none | [ first || [ force-end | allow-end ] || last ]
```

---


## line-height

Définit l'espacement entre les lignes de texte [CSS1]

``` plain
line-height: normal | <number> | <length> | <percentage>
```

## vertical-align

Définit l'alignement vertical du texte par rapport à la hauteur de la ligne (line-height)  
Ou de la hauteur de la cellule de tableau en cours (height) [CSS1]

``` plain
vertical-align: <length> | baseline | sub | super | text-top | text-bottom | middle | top | bottom
```

---

## tab-size

Définit le nombre d'espaces d'une tabulation [CSS3]

``` plain
tab-size: <number>
```

## quotes

Définit les marqueurs à utiliser pour les citations [CSS2]  
Peut définir plusieurs niveaux de citation

``` plain
quotes: [<string> <string>]+
```

[JsFiddle quotes](https://jsfiddle.net/amt01/76sv1osr/)

---

## caret

`caret` définit la couleur du curseur de saisie de texte [CSS2]

``` plain
caret-color: <color>
```

[JSfiddle caret-color](https://jsfiddle.net/amt01/3u43txtL/)
