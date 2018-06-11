---
title: Texte
category: Web, CSS, Propriétés
---

## color

``` plain
color: <color>
(CSS1)
Définit la couleur du texte
```

``` css
{
  color: #333;
}
```

## text

### text-decoration

``` plain
text-decoration: underline | overline | line-through
(CSS1)
Définit la décoration du texte (souligné, barre supérieure, barré)
```

``` plain
text-decoration-color: <color>
(CSS3)
Définit la couleur de la décoration
```

``` plain
text-decoration-style: solid |double | dotted | dashed | wavy
(CSS3)
Définit le style de la décoration (trait, pointillés, etc)
```

### text-transform

``` plain
text-transform: lowercase | uppercase | capitalize | none
(CSS1)
Définit la casse affichée (minuscule, majscule, première lettre en majuscule)
```

### text-indent

``` plain
text-indent: <length> | <percentage>
(CSS1)
Définit l'indentation de la première ligne d'un paragraphe
```

### text-align, text-justify

``` plain
text-align: center | left | right | justify | auto
(CSS1)
Définit l'alignement du texte
```

``` plain
text-align-last: center | left | right | justify | auto
(CSS3)
Définit l'alignement de la dernière ligne de texte d'un paragraphe
```

``` plain
text-justify: auto | inter-character | inter-word | none
(CSS3)
Définit le type de justification à appliquer au texte justifié
```

### text-shadow

``` plain
text-shadow: <horizontal offset> <vertical offset> <blur radius> <color> | none
(CSS3)
Ajoute une ombre au texte (accepte une liste séparées par des virgules)
```

### text-overflow

``` plain
text-overflow: clip | ellipsis
(CSS3)
Ajoute une ellipse (...) lorsque du texte est caché par overflow
```

``` css
{
  width: 500px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### tetx-rendering

``` plain
text-rendering: auto | optimizeSpeed | optimizeLegibility | geometricPrecision
(SVG)
Définit ce qui doit être optimisé lors de l'affichage du texte
Permet de faire des compromis entre la vitesse, la lisibilité (crénage, ligatures) et la précision géométrique.
```

### text-emphasis

``` plain
text-emphasis-style: ([dot | circle| double-circle | triangle | sesame] [filled | open]) | <string>
(CSS3)
Définit le caractère à utiliser pour marquer l'emphase
```

``` plain
text-emphasis-color: <color>
(CSS3)
Définit la couleur du caractère d'emphase
```

``` plain
text-emphasis: <style> <color>
(CSS3)
Raccourcis permettant de définir le caractère d'emphase et sa couleur
```

``` plain
text-emphasis-position: [ over | under ] && [ right | left ]
(CSS3)
Définit la position du caractère d'emphase
```

``` css
{
  text-emphasis-style: circle open;
  text-emphasis-color: red;
  text-emphasis-position: under left;
}
```

[Exemple text-emphasis](https://jsfiddle.net/amt01/g0erc233/)

## word

``` plain
word-spacing: normal | <length>
(CSS3)
Définit l'espacement entre deux mots
```

``` plain
word-break: break-all | keep-all | normal
(CSS3)
Définit si les retours à la ligne sont autorisés au milieu d'un mot
```

``` plain
word-wrap: break-word | normal
(CSS3)
Définit si les retours à la ligne sont autorisés au milieu d'un mot
Conserve le retour à la ligne automatique à la fin du mot
```

[Différences entre word-break et word-wrap](https://jsfiddle.net/amt01/dtghap8t/)

## ...misc

### line-break

``` plain
line-break: auto | loose | normal | strict
(CSS3)
Définit la façon dont les sauts de ligne sont gérés
Uniquement les textes en chinois, japonais ou coréen (CJK)
```

### hanging-punctuation

``` plain
hanging-punctuation: none | [ first || [ force-end | allow-end ] || last ]
(CSS3)
Définit si un signe de ponctuation se situant au début à la fin d'une ligne de texte doit rester sur cette ligne
```

### white-space

``` plain
white-space: pre | pre-line | pre-wrap | normal
(CSS1)
Définit le comportement du texte lorsqu'il dépasse la largeur du bloc parent (retour à la ligne ou non)
```

### letter-spacing

``` plain
letter-spacing: normal | <length>
(CSS1)
Définit l'espacement entre deux lettres
```

### vertical-align

``` plain
vertical-align: <length> | baseline | sub | super | text-top | text-bottom | middle | top | bottom
(CSS1)
Définit l'alignement vertical du texte par rapport à la hauteur de la ligne (line-height)
Ou de la hauteur de la cellule de tableau en cours (height)
```

### tab-size

``` plain
tab-size: <number>
(CSS3)
Définit le nombre d'espaces d'une tabulation
```

### hyphens

``` plain
hyphens: manual | auto
(CSS3)
Définit si des césures doivent être ajoutées ou non
- auto : ajouter des césures si nécessaire
- manual: uniquement lorsqu'il y a un &hyphen; ou &shy;
```

[Exemple hyphens](https://codepen.io/SitePoint/pen/iusvq)

### quotes

``` plain
quotes: [<string> <string>]+
(CSS2)
Définit les marqueurs à utiliser pour les citations
Peut définir plusieurs niveaux de citation
```

[Exemple quotes](https://jsfiddle.net/amt01/76sv1osr/)
