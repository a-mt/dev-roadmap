---
title: Police d'écriture
category: Web, CSS, Propriétés
---

## font

### Choosing font

``` plain
font: (<font-style> || <font-variant> || <font-weight>)? <font-size>(/<line-height>)? <font-family>
(CSS1)
Raccourcis pour définir la police de texte
```

``` plain
font-style: normal | italic | oblique
(CSS1)
Définit le style de la police (normal, italique)
```

``` plain
font-variant: small-caps | normal
(CSS1)
Définit la variante de la police (petites lettres majuscules, minuscules)
```

``` plain
font-weight: normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
(CSS1)
Définit l'épaisseur de trait (gras, normal, léger)
```

``` plain
font-size: <absolute-size> | <relative-size> | <length> | <percentage>
(CSS1)
Définit la taille de la police
```

``` plain
line-height: normal | <number> | <length> | <percentage>
(CSS1)
Définit l'espacement entre les lignes de texte
```

``` plain
font-family: <family-name>
(CSS1)
Définit la police et les polices de fallbacks (séparées par des virgules)
```

Les polices utilisées en CSS doivent être installées sur la machine du client. Si la police demandée n'est pas installée, une police de fallback est utilisée (la prochaine dans la liste de polices). Si le client n'a aucune des polices demandées, la police par défaut du navigateur est utilisée.

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

### Font settings

``` plain
font-kerning: auto | normal | none
(CSS3)
Définit s'il faut activer ou désactiver le kerning
Raccourcis pour font-feature-settings: "kern" 1;
```

[Exemple font-kerning](https://jsfiddle.net/amt01/u1qs0noy/)

``` plain
font-size-adjust: <number> | none
(CSS3)
Définit la taille de police telle que la taille des minuscules mesure X fois font-size
```

[Exemple font-adjust](https://jsfiddle.net/amt01/0u8rLt0n/)

``` plain
font-stretch: normal |
              ultra-condensed | extra-condensed | condensed | semi-condensed |
              semi-expanded | expanded | extra-expanded | ultra-expanded
(CSS3)
Définit s'il faut choisir la forme normale, condensée ou étendue d'une police
Si la police ne dispose pas de telles variations, font-stretch n'aura aucun effet visible
```

[Exemple font-stretch](https://jsfiddle.net/amt01/de1q7ksh/)

``` plain
font-synthesis: none | [ weight || style ]
(CSS3)
Définit si les variantes en gras et en italiques peuvent être synthétisées par le navigateur
lorsqu'elles sont absentes
```

``` plain
font-language-override: normal | <string>
(CSS3)
Définit le langage et permet de contrôler l'utilisation des glyphes spécifiques à une langue
String format: Language System Tag
```

[Exemple font-language-override](https://jsfiddle.net/amt01/ktp5fot7/)  
[Getting started with variable fonts](http://clagnut.com/blog/2389/)  
[Language System Tag](http://www.microsoft.com/typography/otspec/languagetags.htm)

## @font-face

Le navigateur peut télécharger automatiquement une police qui n'est pas installée si on lui indique où la trouver.  
Différents navigateurs supportent différents formats.

| Extension | Format               | Utilisé par                                    |
|---        |---                   |---                                             |
| .woff     | Web Open Font Format | Les navigateurs modernes                       |
| .eot      | Embedded Open Type   | Les anciennes versions d'IE                    |
| .svg      | SVG fonts            | Les anciennes versions d'iOS Safari (3.2-4.1)  |
| .ttf      | Truetype fonts       | Les anciennes versions du navigateur d'Android |

``` plain
src: local(<family-name>) | <url> format(<string>)
(CSS3)
Définit l'emplacement de la police
Différents emplacements peuvent être ajoutés, séparés par des virgules
```

``` plain
unicode-range: <unicode-range>
(CSS3)
Définit l'intervalle de caractères de cette police
```

Les autres fonctions également acceptées dans le block `@font-face` sont :
- `font-family`
- `font-variant`
- `font-variation-settings`
- `font-feature-settings`
- `font-stretch`
- `font-weight`
- `font-style`
- `font-feature-settings`

``` css
@font-face {
  font-family: 'MyWebFont';
  src: url('webfont.eot');                                    /* IE9 Compat Modes */
  src: local('MyWebFont'),
       url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'),                  /* Super Modern Browsers */
       url('webfont.woff') format('woff'),                    /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'),                /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg');          /* Legacy iOS */
}
```

Le navigateur parcours la liste de ressources disponibles dans l'ordre et utilise la première qui marche. Ainsi, la première instruction donnée est généralement de vérifier si la police est installée localement (`local()`).  
Une police peut ne pas définir tous les caractères, raison pour laquelle il est important de toujours utiliser des polices de fallback.

[Exemple avec une WebFont de Google (Roboto)](http://fonts.googleapis.com/css?family=Roboto)  
[Générateur de @font-face](https://www.fontsquirrel.com/tools/webfont-generator)  
[local('☺')](https://stackoverflow.com/questions/3698319/css-font-face-what-does-src-local-mean#22835957)

### font-feature-settings

Une police peut avoir des glyphes supplémentaires en plus des glyphes par défaut pour un caractère donné, par exemple des alternatives stylistiques ou des swash. On peut activer ces fonctionnalités avec `font-feature-settings`.

![](https://i.imgur.com/gPKbv0e.png)

``` plain
font-feature-settings: (<string> [on | off | 1 | 0])+
(CSS3)
Définit les fonctionnalités typographiques à activer ou désactiver
Séparées par des virgules
```

``` css
{
  font-feature-settings: "kern" 1, "frac" 1, /* kerning, fractions */
                         "subs" 1, "sups" 1, /* subscripts, superscripts */
                         "liga" 1, "dlig" 1, /* ligatures, discretionary ligatures */
                         "ss01"              /* stylistic set 01 */
}
```

* Trouver la liste des fonctionnalités d'une police
  * FontForge: Élements > Infos Fonte > Lookups  
  * [font-infos.herokuapp.com](http://font-infos.herokuapp.com/)
* [Trouver une police avec une fonctionnalité donnée](https://font-infos.herokuapp.com/list)
* [Support navigateur des fonctionnalités](https://github.com/quitequinn/Font-Feature-Support)

[OpenType features in CSS](https://www.typotheque.com/articles/opentype_features_in_css)  
[Syntaxe des fonctionnalités OpenType en CSS](https://helpx.adobe.com/fr/typekit/using/open-type-syntax.html)  
[List of typographic features](https://en.wikipedia.org/wiki/List_of_typographic_features)  
[Exemple ligature](https://jsfiddle.net/amt01/5yL0uxew/)

## @font-feature-values

On peut également créer un nom pour une fonctionnalité donnée avec `@font-feature-values`,
et l'appliquer à des sélecteurs donnés avec `font-variant-alternates`.
Cela permet de simplifier les feuilles de style lorsqu'on utilise plusieurs polices.

``` plain
@font-feature-values <family-name> {
  [(@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation) {
    (<name>: <integer>;)+
  }]+
}
(CSS3)
Définit des noms personnalisés pour les fonctionnalités de la police
```

| Type               | Valeur OpenType | Description |
|---                 |---              |---          |
| historical-forms   | hist            | Formes historiques |
| stylistic          | salt            | Formes stylistiques alternatives |
| styleset           | ss##            | Ensemble de caractères d'un style alternatif |
| character-variant  | cv##            | Semblable à styleshet mais les caractères peuvent avoir un style indépendant |
| swash              | swsh, cswh      | Glypes pour les lettres ornées |
| ornaments          | ornm            | Ornements tels que les fleurons et autres casseaux |
| annotation         | nalt            | Annotations (telles que les chiffres entourés ou les caractères inversés) |

``` css
@font-feature-values dual300 { 
  @stylistic {
    ident1: 1;
  }
}
h1 {
  font-variant-alternates: stylistic(ident1)
}
```

[Exemple @font-feature-values](https://jsfiddle.net/amt01/1vh9mfq4/)

### font-variant

``` plain
font-variant-alternates: stylistic(<name>) || historical-forms || styleset(<name>) ||
                         character-variant(<name>) || swash(<name>) || ornaments(<name>) ||
                         annotation(<name>)
(CSS3)
Permet d'appliquer une fonctionnalité nommée avec `@font-feature-values`
Liste séparée par des espaces
```

``` plain
font-variant-caps: normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps
(CSS3)
Définit la fonctionnalité à utiliser pour représenter les lettres en capitales
```

| Valeur          | Fonctionnalité |
|---              |---             |
| small-caps      | smcp           |
| all-small-caps  | smcp, c2sc     |
| petite-caps     | pcap           |
| all-petite-caps | pcap, c2pc     |
| unicase         | unic           |
| titling-caps    | titl           |

``` plain
font-variant-east-asian: [ jis78 | jis83 | jis90 | jis04 | simplified | traditional ] || ruby || [ full-width | proportional-width ]
(CSS3)
Définit le standard à utiliser et le dimensionnement des caractères des langues d'Asie orientiale
```

``` plain
font-variant-ligatures: [ common-ligatures | no-common-ligatures ] ||
                        [ discretionary-ligatures | no-discretionary-ligatures ] ||
                        [ historical-ligatures | no-historical-ligatures ] ||
                        [ contextual | no-contextual ]
(CSS3)
Définit les ligatures et formes contextuelles à utiliser
```

``` plain
font-variant-numeric: [ lining-nums | oldstyle-nums ] ||
                      [ proportional-nums | tabular-nums ] ||
                      [ diagonal-fractions | stacked-fractions ] ||
                      ordinal ||
                      slashed-zero
(CSS3)
Définit les glyphes à utiliser pour les nombres, fractions et marqueurs ordinaux
```

``` plain
font-variant-position: normal | sub | super
(CSS3)
Définit la position des glyphes (normal, indice ou exposant)
```

## ruby

Les caractères ruby sont des annotations textuelles placées au-dessus ou à côté de caractères logographiques (comme des caractères chinois ou kanji japonais) pour indiquer la prononciation des caractères susceptibles de ne pas être connus du lecteur.  
[Exemple ruby](https://jsfiddle.net/amt01/9suwg3uo/)

``` plain
ruby-align: start | center | space-between | space-around
(CSS3)
Définit l'alignement des caractères ruby
```

``` plain
ruby-position: over | under | inter-character
(CSS3)
Définit la position des caractères ruby (au-dessus, en-dessous, sur leur droite)
```

``` plain
ruby-merge: separate | collapse | auto
(CSS3)
Définit comment les annotations doivent être affichées lorsqu'il y a en plusieurs dans un tag
```
