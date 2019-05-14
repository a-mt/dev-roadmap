---
title: Police d'écriture
category: Web, CSS, Propriétés
---

## font

* `font-style`  
  Définit le style de la police (normal, italique) [CSS1]

  ``` plain
  font-style: normal | italic | oblique
  ```

* `font-variant`  
  Définit la variante de la police (petites lettres majuscules, minuscules) [CSS1]

  ``` plain
  font-variant: small-caps | normal
  ```

* `font-weight`  
  Définit l'épaisseur de trait (gras, normal, léger) [CSS1]

  ``` plain
  font-weight: normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  ```

* `font-size`  
  Définit la taille de la police [CSS1]

  ``` plain
  font-size: <absolute-size> | <relative-size> | <length> | <percentage>
  ```

* `font-family`  
  Définit la police à utiliser [CSS1]  
  Définit également des polices de fallbacks (séparées par des virgules).  
  Les polices utilisées en CSS doivent être installées sur la machine du client. Si la police demandée n'est pas installée, une police de fallback est utilisée (la prochaine dans la liste de polices). Si le client n'a aucune des polices demandées, la police par défaut du navigateur est utilisée. De plus, une police peut ne pas définir tous les caractères, il est donc important de toujours utiliser des polices de fallback.  
  Le navigateur peut télécharger automatiquement une police si on lui indique où la trouver avec [`@font-face`](css-atrules.md#font-face).

  ``` plain
  font-family: <family-name>
  ```

* `font`  
  Est un raccourcis pour définir les propriétés `font*` ainsi que `line-height` [CSS1]

  ``` plain
  font: (<font-style> || <font-variant> || <font-weight>)? <font-size>(/<line-height>)? <font-family>
  ```

<ins>Exemple</ins>:

``` css
body {
  font-family: sans-serif;
}
p {
  font: bold italic large Palatino, serif;
}
h1 {
  font-size: 1.2em;
}
```

---

## font-size-adjust

Quand une police n'est pas disponible, le navigateur utilise la deuxième police spécifiée.  
Cela peut entraîner une modification importante de la taille de la police affichée.

Toutes les polices ont une "valeur d'aspect", qui est la différence de taille entre la lettre "x" minuscule et la lettre "X" majuscule. Lorsque le navigateur connaît la valeur d'aspect de la première police sélectionnée, il peut alors déterminer la taille de police à utiliser pour afficher le texte avec la deuxième police de la liste.

`font-size-adjust` définit la valeur d'aspect [CSS3]

``` plain
font-size-adjust: <number> | none
```

[JSFiddle font-size-adjust](https://jsfiddle.net/amt01/0u8rLt0n/)

---

## font-kerning

Définit s'il faut activer ou désactiver le kerning [CSS3]  
Raccourcis pour font-feature-settings: "kern" 1;

``` plain
font-kerning: auto | normal | none
```

[JSFiddle font-kerning](https://jsfiddle.net/amt01/u1qs0noy/)

## font-stretch

Définit s'il faut choisir la forme normale, condensée ou étendue d'une police  
Si la police ne dispose pas de telles variations, font-stretch n'aura aucun effet visible [CSS3]

``` plain
font-stretch: normal |
              ultra-condensed | extra-condensed | condensed | semi-condensed |
              semi-expanded | expanded | extra-expanded | ultra-expanded
```

[JSFiddle font-stretch](https://jsfiddle.net/amt01/de1q7ksh/)

## font-synthesis

Définit si les variantes en gras et en italiques de la police doivent être synthétisées par le navigateur
lorsqu'elles sont absentes [CSS3]

``` plain
font-synthesis: none | [ weight || style ]
```

[Getting started with variable fonts](http://clagnut.com/blog/2389/)

## font-language-override

Définit le langage et permet de contrôler l'utilisation des glyphes spécifiques à une langue  
String format: [Language System Tag](http://www.microsoft.com/typography/otspec/languagetags.htm) [CSS3]

``` plain
font-language-override: normal | <string>
```

[JSFiddle font-language-override](https://jsfiddle.net/amt01/ktp5fot7/)  

---

## font-feature-settings

`font-feature-settings` permet d'activer ou désactiver les fonctionnalités typographiques d'une police [CSS3]  
Liste séparée par des virgules

<ins>Définition</ins>:

``` plain
font-feature-settings: (<string> [on | off | 1 | 0])+
```

<ins>Exemple</ins>:


``` css
{
  font-feature-settings: "kern" 1, "frac" 1, /* kerning, fractions */
                         "subs" 1, "sups" 1, /* subscripts, superscripts */
                         "liga" 1, "dlig" 1, /* ligatures, discretionary ligatures */
                         "ss01"              /* stylistic set 01 */
}
```

[JSFiddle ligature](https://jsfiddle.net/amt01/5yL0uxew/)

## font-variant

* `font-variant-alternates`  
  Permet d'appliquer une fonctionnalité déclarée avec [`@font-feature-values`](css-atrules.md#font-feature-values) [CSS3]  
  Liste séparée par des espaces

  ``` plain
  font-variant-alternates: stylistic(<name>) || historical-forms || styleset(<name>) ||
                           character-variant(<name>) || swash(<name>) || ornaments(<name>) ||
                           annotation(<name>)
  ```

* `font-variant-caps`  
  Définit la fonctionnalité à utiliser pour représenter les lettres en capitales [CSS3]

  ``` plain
  font-variant-caps: normal | small-caps | all-small-caps |
                     petite-caps | all-petite-caps | unicase | titling-caps
  ```

  | Valeur          | Fonctionnalité |
  |---              |---             |
  | small-caps      | smcp           |
  | all-small-caps  | smcp, c2sc     |
  | petite-caps     | pcap           |
  | all-petite-caps | pcap, c2pc     |
  | unicase         | unic           |
  | titling-caps    | titl           |

* `font-variant-east-asian`  
  Définit le standard à utiliser et le dimensionnement des caractères des langues d'Asie orientiale [CSS3]

  ``` plain
  font-variant-east-asian: [ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]
                            || ruby || [ full-width | proportional-width ]
  ```

* `font-variant-ligatures`  
  Définit les ligatures et formes contextuelles à utiliser [CSS3]

  ``` plain
  font-variant-ligatures: [ common-ligatures | no-common-ligatures ] ||
                          [ discretionary-ligatures | no-discretionary-ligatures ] ||
                          [ historical-ligatures | no-historical-ligatures ] ||
                          [ contextual | no-contextual ]
  ```

* `font-variant-numeric`  
  Définit les glyphes à utiliser pour les nombres, fractions et marqueurs ordinaux [CSS3]

  ``` plain
  font-variant-numeric: [ lining-nums | oldstyle-nums ] ||
                        [ proportional-nums | tabular-nums ] ||
                        [ diagonal-fractions | stacked-fractions ] ||
                        ordinal ||
                        slashed-zero
  ```

* `font-variant-position`  
  Définit la position des glyphes (normal, indice ou exposant) [CSS3]

  ``` plain
  font-variant-position: normal | sub | super
  ```

---

## ruby

Les caractères ruby sont des annotations textuelles placées au-dessus ou à côté de caractères logographiques (comme des caractères chinois ou kanji japonais) pour indiquer la prononciation des caractères susceptibles de ne pas être connus du lecteur.  

* `ruby-align` définit l'alignement des caractères ruby [CSS3]

  ``` plain
  ruby-align: start | center | space-between | space-around
  ```

* `ruby-position` définit la position des caractères ruby (au-dessus, en-dessous, sur leur droite) [CSS3]

  ``` plain
  ruby-position: over | under | inter-character
  ```

* `ruby-merge` définit comment les annotations doivent être affichées lorsqu'il y a en plusieurs dans un tag [CSS3]

  ``` plain
  ruby-merge: separate | collapse | auto
  ```

[JsFiddle ruby](https://jsfiddle.net/amt01/9suwg3uo/)