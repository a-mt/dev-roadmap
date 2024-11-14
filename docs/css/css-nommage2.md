---
title: Conventions de nommage des variables CSS
category: Web > CSS
---

## Variables CSS

De la même manière que les sélecteurs CSS, les variables CSS (natives ou celles de préprocesseurs comme Sass ou Less)
devraient être sémantiques et faciles à comprendre. Il n'existe pas de préconisation sur le sujet mais pour rendre les variables facilement compréhensible, on peut suivre le format suivant:

    type-importance

* <ins>type</ins>:   
  par exemple `clr` pour les couleurs, `fs` pour les tailles de polices, `grid` pour les tailles de grilles, etc.

* <ins>importance</ins>:  
  `base` pour la valeur par défaut (du corps de texte), puis de manière logique `primary`/`secondary` ou `alpha`/`beta` ou encore `giga`/`micro` suivant le type de variable.

  Source: [Make Your CSS Variable Names Suck Less](https://fixate.it/blog/make-your-css-variable-names-suck-less)

## Couleur

* La plupart des marques ont une couleur dominante (qui est la couleur que l'on retrouve de manière très répétitive, a priori au niveau des titres), une couleur tonique (aussi appelé accent, qui permet de mettre en avant certains éléments, a priori au niveau des boutons) et des couleurs subsidiaires (notamment pour indiquer différents états, pour les notifications, encarts, etc).  
  On retrouvera également des couleurs neutres, utilisées pour former le squelette de la page, comme pour les bordures, les séparateurs ou le fond.  
  Pour garder l'harmonie du site, les mêmes teintes sont utilisées de manière répétitive.

* Niveau CSS, on va généralement déclarer un ensemble de couleurs (teintes), avec différentes intensités (nuances).  
  Dans certaines conventions, toutes les variables de couleur sont préfixées de `clr-`.  
  MaterialUI utilise des noms suivit de numéros pour déclarer un ensemble teinte-nuance:

  ```
  $grey-900: #101828;
  $grey-800: #1d2939;
  $grey-700: #344054;
  $grey-600: #475467;
  $grey-500: #667085;
  $grey-400: #98a2b3;
  $grey-300: #d0d5dd;
  $grey-200: #e4e7ec;
  $grey-100: #f2f4f7;
  $grey-050: #f9fafb;

  $purple-800: #53389e;
  $purple-700: #6941c6;
  $purple-600: #7f56d9;
  $purple-500: #9e77ed;
  $purple-300: #d6bbfb;
  $purple-200: #e9d7fe;
  $purple-100: #f4ebff;
  $purple-050: #f9f5ff;
  $purple-025: #fcfaff;
  ```
 
  [Color palettes](https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors)

* Une fois les différentes couleurs définies, on va constituer un ensemble de variables pour rendre pour leur utilisation facilement compréhensibles.   
  Les couleurs de la marque sont ordonnées par ordre d'importance: `primary`, `secondary`, `tertiary`, etc, ou on peut utiliser des noms sémantiques tels que `success`, `warning`, etc. Les différentes variantes sont indiquées en suffixe:

  * `lt` pour light,
  * `ltr` por lighter,
  * `ltst` pour lightest

  * `dk` pour dark,
  * `dkr` pour darker,
  * `dkrst` pour darkest

  ``` sass
  $button-primary-bg: $purple-700;
  $button-primary-color: $white;
  $button-primary-border: $purple-600;

  $button-primary-lt-bg: $purple-200;
  $button-primary-lt-color: $purple-800;
  $button-primary-lt-border: $purple-500;
  ```

  ``` sass
  .btn--primary {
    background: $button-primary-bg;
    border-color: $button-primary-border;
    color: $button-primary-color;

    &:hover {
      background: $button-primary-lt-bg;
      border-color: $button-primary-lt-border;
      color: $button-primary-lt-color;
    }
  }
  ```

[Exemple CSS naming convention](https://codepen.io/a-mt/pen/vYobwbV)

## Famille de police

* Les variables de famille de police sont préfixées de `ff-` (pour font-family)  
  puis sont ordonnées par ordre de prépondérance: contenu, titre, sous-titre, icone.

  ``` scss
  $ff-base:  'Helvetica Neue', Helvetica, Arial, sans-serif;
  $ff-alpha: 'Open Sans', sans-serif;
  $ff-beta:  'Roboto', sans-serif;
  $ff-icon:  'FontAwesome';
  ```

## Taille de police

* Toutes les variables de taille de police sont préfixées de `fs-` (pour font-size)  
  puis sont ordonnées de grandes tailles (pour le logo par exemple) à petites tailles (pour les éléments sub par exemple).  
  On notera qu'il sera généralement nécessaire de créer des déclinaisons (même principe que lt, ltr, etc) pour les familles de polices secondaires.

  ``` scss
  /* taille de base - appliqué au contenu de la page */
  $fs-base: 16px;

  /* tailles plus grandes que les éléments de heading */
  $fs-giga: 80px;
  $fs-mega: 70px;
  $fs-kilo: 60px;

  /* tailles des éléments de heading */
  $fs-h1: 36px;
  $fs-h2: 32px;
  $fs-h3: 28px;
  $fs-h4: 24px;
  $fs-h5: 20px;
  $fs-h6: 18px;

  /* tailles plus petites que le corps de texte */
  $fs-milli: 14px;
  $fs-micro: 10px;
  $fs-nano:  8px;
  ```

  * [Type scale generator](https://material.io/design/typography/the-type-system.html?utm_source=Medium&utm_campaign=TE-post#type-scale)

## Exemple: Material Design pour Android

* Pour référence, la convention de nommage de Material Design pour Android est comme suit:

  ``` xml
  <style name="Theme.MyApp" parent="Theme.MaterialComponents.*">

    <!-- Couleur -->
    <item name="colorPrimary">#6200EE</item>
    <item name="colorPrimaryVariant">#3700B3</item>
    <item name="colorOnPrimary">#FFFFFF</item>
    <item name="colorSecondary">#03DAC6</item>
    <item name="colorSecondaryVariant">#018786</item>
    <item name="colorOnSecondary">#000000</item>
    <item name="colorError">#B00020</item>
    <item name="colorOnError">#FFFFFF</item>
    <item name="colorSurface">#FFFFFF</item>
    <item name="colorOnSurface">#000000</item>
    <item name="colorBackground">#FFFFFF</item>
    <item name="colorOnBackground">#000000</item>

    <!-- Typographie -->
    <item name="textAppearanceHeadline1">Light 96sp</item>
    <item name="textAppearanceHeadline2">Light 60sp</item>
    <item name="textAppearanceHeadline3">Regular 48sp</item>
    <item name="textAppearanceHeadline4">Regular 34sp</item>
    <item name="textAppearanceHeadline5">Regular 24sp</item>
    <item name="textAppearanceHeadline6">Medium 20sp</item>
    <item name="textAppearanceSubtitle1">Regular 16sp</item>
    <item name="textAppearanceSubtitle2">Medium 14sp</item>
    <item name="textAppearanceBody1">Regular 16sp</item>
    <item name="textAppearanceBody2">Regular 14sp</item>
    <item name="textAppearanceCaption">Regular 12sp</item>
    <item name="textAppearanceButton">Medium all caps 14sp</item>
    <item name="textAppearanceOverline">Regular all caps 10sp</item>

    <!-- Forme -->
    <item name="shapeAppearanceSmallComponent">4dp rounded</item>
    <item name="shapeAppearanceMediumComponent">4dp rounded</item>
    <item name="shapeAppearanceLargeComponent">0dp rounded</item>
  </style>
  ```

* La valeur par défaut des attributs de typographie et de forme a été abrégé en une ligne.  
  La structure interne est comme suit:

  ``` xml
  <style name="TextAppearance.MyApp.Headline1" parent="TextAppearance.MaterialComponents.Headline1">
    <item name="fontFamily">@font/custom_font</item>
    <item name="textStyle">normal</item>
    <item name="textAllCaps">false</item>
    <item name="textSize">64sp</item>
    <item name="letterSpacing">0</item>
  </style>

  <style name="ShapeAppearance.MyApp.SmallComponent" parent="ShapeAppearance.MaterialComponents.SmallComponent">
    <item name="cornerFamily">cut</item>
    <item name="cornerSize">4dp</item>
  </style>
  ```
