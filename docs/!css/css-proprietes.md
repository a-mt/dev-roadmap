---
title: Propriétés CSS
category: Web > CSS
---

## Raccourcis

Certaines propriétés s'utilisent en combinaison avec d'autres propriétés.

``` css
border-color: black;
border-width: 1px;
border-style: solid;
```

Lorsque c'est le cas, on peut généralement les définir via une propriété raccourcie (shorthand).  
Si les types des valeurs sont différents, alors l'ordre n'a pas d'importance.

``` css
border: 1px solid black;
```

``` css
border: solid black 1px;
```

Les propriétés raccourcies qui gèrent les bords d'une boîte telles que `border-style`, `margin` ou `padding` peuvent prendre entre 1 et 4 valeurs (taille). Leur ordre importe :

<table>
  <thead>
    <tr>
      <th>Nombre de valeurs</th>
      <th>Exemple</th>
      <th>Désigne…</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1 valeur</strong></td>
      <td><pre>padding: 5px</pre></td>
      <td>Tous les côtés</td>
    </tr>
    <tr>
      <td><strong>2 valeurs</strong></td>
      <td><pre>padding: 15px 10px</pre></td>
      <td>Les côtés haut/bas en premier et les côtés gauche/droite en deuxième</td>
    </tr>
    <tr>
      <td><strong>3 valeurs</strong></td>
      <td><pre>padding: 5px 10px 15px</pre></td>
      <td>Le côté haut en premier, les côtés gauche/droite en deuxième et le côté bas en troisième</td>
    </tr>
    <tr>
      <td><strong>4 valeurs</strong></td>
      <td><pre>padding: 5px 0 15px 10px</pre></td>
      <td>Les côtés dans le sens des aiguiles d’une montre: haut, droite, bas, gauche</td>
    </tr>
  </tbody>
</table>

---

## Propriétés

* <ins>all</ins>:  
  La propriété `all` permet de réinitialiser toutes les propriétés, à l'exception de unicode-bidi et direction, avec leurs valeurs initiales ou héritées.

  ``` plain
  all: initial | inherit | unset | revert
  (CSS3)
  Réinitialise toutes les propriétés
  ```

* <ins>content</ins>:  
  La propriété `content` est utilisée avec les pseudo-éléments ::before et ::after afin de générer le contenu d'un élément.

  ``` plain
  content: <string> | <url> | counter() | attr()
  (CSS2)
  Définit le contenu du pseudo-élément ::before ou ::after
  ```

  ``` css
  nav li:not(:first-child)::before {
    content: " / ";
    color: grey;
  }
  ```

<!-- -->

* [Box Model](css-prop-box-model.md):
  display
  visibility
  opacity
  border
  margin
  padding
  width
  height
  box-sizing
  overflow
  cursor
* [Autres bordures](css-prop-ext-border.md):
  outline
  border-image
  border-radius
  box-shadow
  box-decoration-break
* [Background](css-prop-background.md):
  background-color
  background-image
  background-repeat
  background-attachment
  background-position
  background-size
  background-origin
  background-clip
  background
  background-blend-mode
  mix-blend-mode
  isolation
  clip-path
  mask-image
  mask-mode
  mask-size
  mask-repeat
  mask-origin
  mask-clip
  mask-position
  mask-composite
  mask-composite
  shape-outside
  shape-margin
  shape-image-threshold
* [Interractions utilisateur](css-prop-interract.md):
  pointer-events
  touch-action
  scroll-behaviour
  scroll-snap-type
  resize

<!-- -->

* [Texte](css-prop-texte.md):
  color
  text-decoration
  text-transform
  text-indent
  text-align
  text-justify
  hyphens
  text-shadow
  text-overflow
  text-rendering
  text-emphasis
  letter-spacing
  word-spacing
  word-break
  word-wrap
  white-space
  line-break
  hanging-punctuation
  line-height
  vertical-align
  tab-size
  quotes
  caret
* [Police d'écriture](css-prop-font.md):
  font-style
  font-variant
  font-weight
  font-size
  font-family
  font
  font-size-adjust
  font-kerning
  font-stretch
  font-synthesis
  font-language-override
  font-feature-settings
  font-variant-alternates
  font-variant-caps
  font-variant-east-asian
  font-variant-ligatures
  font-variant-numeric
  font-variant-position
  ruby-align
  ruby-position
  ruby-merge
* [Orientation](css-prop-orientation.md):
  writing-mode
  text-orientation
  direction
  unicode-bidi
  text-underline-position
  text-combine-upright
  border-block-*
  border-inline-*
  padding-block-*
  padding-inline-*
  margin-block-*
  margin-inline-*
  offset-block-*
  offset-inline-*
  block-size
  inline-size
  min-block-size
  min-inline-size

<!-- -->

* [Table](css-prop-table.md):
  table-layout
  border-collapse
  border-spacing
  caption-side
  empty-cells
* [Image](css-prop-image.md):
  object-fit
  object-position
  image-orientation
  image-rendering
  filter
* [Liste](css-prop-liste.md):
  list-style-type
  list-style-position
  list-style-image
  list-style
  counter-increment
  counter-reset

<!-- -->

* [Layout](css-prop-layout.md):
  position
  top
  bottom
  left
  right
  z-index
  float
* [Column](css-prop-column.md)
  column-count
  column-width
  column
  column-rule-width
  column-rule-style
  column-rule-color
  column-rule
  column-gap
  column-fill
  column-span
* [Flex](css-prop-flex.md)
  flex-direction
  flex-wrap
  flex-flow
  justify-content
  align-items
  align-content
  flex-basis
  flex-grow
  flex-shrink
  flex
  order
  align-self
* [Grid](css-prop-grid.md)
  grid-auto-flow
  grid-auto-rows
  grid-auto-columns
  grid-column-gap
  grid-row-gap
  grid-gap
  align-items
  justify-items
  grid-template-columns
  grid-template-rows
  grid-template-areas
  grid-template
  grid
  grid-area
  grid-column-start
  grid-column-end
  grid-column
  grid-row-start
  grid-row-end
  grid-row
  align-self
  justify-self

<!-- -->

* [Transition](css-prop-transition.md):
  transition-property
  transition-duration
  transition-timing-function
  transition-delay
  transition
* [Transformations](css-prop-transform.md):
  transform
  transform-origin
  transform-box
  transform-style
  perspective
  perspective-origin
  backface-visibility
* [Animations](css-prop-animation.md)
  animation-name
  animation-duration
  animation-timing-function
  animation-delay
  animation-iteration-count
  animation-direction
  animation-fill-mode
  animation-play-state
  animation
  will-change

---

## Propriétés personnalisés

L'un des principaux avantages des préprocesseurs CSS est qu'ils permettent d'utiliser des variables. Cela évite de devoir copier/coller des valeurs et simplifie le développement et le refactoring, ce qui les rends très populaires. Cependant

- on ne peut pas changer les variables dynamiquement
- elles ne peuvent pas être lues ou modifiés à partir de JavaScript
- elles ne dépendent pas du DOM

C'est la raison pour laquelle les propriétés personnalisées (CSS custom properties) ont été crées.

``` plain
--<string>: <value>
(CSS3)
Définit une propriété personnalisée
```

``` plain
val(<string>[, <fallback>])
(CSS3)
Récupére la valeur d'une propriété personnalisée
```

``` css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);

  /* Valid CSS custom properties can be reused later in, say, JavaScript. */
  --foo: if(x > 5) this.width = 10;
}
.box {
  color: var(--main-color);

  /* 10px is used because --box-margin is not defined. */
  margin: var(--box-margin, 10px);

  /* The --content-padding variable is used if --box-padding is not defined. */
  padding: var(--box-padding, var(--content-padding));
}
```

``` js
function readCssVar(element, varName){
  const elementStyles = getComputedStyle(element);
  return elementStyles.getPropertyValue(`--${varName}`).trim();
}

function writeCssVar(element, varName, value){
  return element.style.setProperty(`--${varName}`, value);
}
```

<ins>Tester la prise en charge des propriétés personnalisées</ins> :

``` css
@supports (--a: 0) {
  body {
    color: --nomVar;
  }
}
```

``` js
const isSupported = window.CSS &&
    window.CSS.supports && window.CSS.supports('--a', 0);
```

[It's Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)