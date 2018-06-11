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
Le plus souvent, les propriétés d'un raccourcis peuvent se définir dans n'importe quel ordre.

``` css
border: 1px solid black;
```

``` css
border: solid black 1px;
```

Les propriétés raccourcies qui gèrent les bords d'une boîte telles que `border-style`, `margin` ou `padding` peuvent prendre entre 1 et 4 valeurs. Leur ordre importe :

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

## Valeurs globales

Les valeurs globales peuvent s'appliquer pour toutes les propriétés CSS : initial, inherit, unset, revert.

### initial

`initial` (CSS2) applique la *valeur initiale* d'une propriété à un élément. La valeur initiale d'une propriété CSS est définie par les spécifications W3C.

``` css
.exemple {
  color: red;
}

.exemple em {
  color: initial; /* couleur initiale de em (black) */
}
```

### inherit

`inherit` (CSS2) est une valeur qui peut être utilisée pour qu'une propriété prenne la valeur calculée de la propriété pour l'élément parent.

``` css
p {
  color: green;
}

p.exemple {
  color: inherit; /* parent's color (black) */
}
```

### unset

`unset` (CSS3) réinitialise la propriété afin que sa valeur soit la valeur héritée depuis l'élément parent ou soit la valeur initiale (s'il n'y a pas d'héritage).

Autrement dit, s'il y a de l'héritage, ce mot-clé se comporte comme `inherit`, sinon, il se comporte comme `initial`.

``` css
p {
  color: red;
}

#sidebar p {
  color: unset;
}
```

### revert

`revert` (CSS4) réinitialise la propriété avec la valeur par défaut définie par la feuille de style de l'agent utilisateur (ou par le style utilisateur s'il y en a un).

Ne pas confondre `revert` avec `initial`: les feuilles de style des agents utilisateurs définissent des valeurs par défaut selon les sélecteurs CSS et qui sont différentes de la valeur initiale définie par les spécifications CSS.

``` css
.widget {
  all: revert;
}
```

---

## Fonctions globales

Les fonctions globales peuvent être utilisée sur n'importe quelle propriété CSS.

### calc()

La fonction calc() permet de réaliser des calculs pour déterminer la valeur d'une propriété.
Elle peut être utilisée pour toute valeur &lt;length&gt;, &lt;frequency&gt;, &lt;angle&gt;, &lt;time&gt;, &lt;number&gt;, ou &lt;integer&gt;.

``` plain
calc(<value> <operateur> <value>)

où <value> = <number> | <dimension> | <percentage>
(CSS3)
Permet de calculer la valeur d'un attribut
```

| Opérateur | Opération      |
|---        |---             |
| +         | Addition       |
| -         | Soustraction   |
| *         | Multiplication |
| /         | Division       |

Toujours entourer les opérateurs d'espaces. Pour la multiplication et la division, la valeur à droite doit être de type &lt;number&gt;

``` css
{
  width: calc(100% - 80px);
}
```

### attr()

Uniquement sur la propriété content. Support expérimental sur les autres propriétés.

``` plain
attr(<attr-name> <unit>)

où <unit> = string | integer | color | url |
            integer | number | length | angle | time | frequency |
            em | ex | px | rem | vw | vh | vmin | vmax |
            mm | q | cm | in | pt | pc |
            deg | grad | rad | ms | s | Hz | kHz | %
(CSS2)
Permet de récupérer la valeur d'un attribut
```

``` css
{
  a:after {
  content: " (" attr(href) ")";
}
```

[Exemple attr()](https://jsfiddle.net/amt01/nd6uxt4e/)

---

## Propriétés

### all

La propriété `all` permet de réinitialiser toutes les propriétés, à l'exception de unicode-bidi et direction, avec leurs valeurs initiales ou héritées.

``` plain
all: initial | inherit | unset | revert
(CSS3)
Réinitialise toutes les propriétés
```

### content

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

---

### Box model

[Box Model](css-prop-box-model.md)
* display
* visibility
* border
* margin
* padding
* width
* height
* box-sizing
* overflow

---

### Autres bordures

[Autres bordures](css-prop-ext-border.md)
* outline
* border-image
* border-radius
* box-shadow
* box-decoration-break

---

### Bloc

[Bloc](css-prop-bloc.md)
* opacity
* background
* cursor
* caret

---

### Texte

[Texte](css-prop-texte.md)
* color
* text
* word
* line-break
* hanging-punctuation
* white-space
* letter-spacing
* vertical-align
* tabsize
* hyphens
* quotes

---

### Police d'écriture

[Police d'écriture](css-prop-font.md)
* font
* @font-face
* font-feature-settings
* @font-feature-values
* font-variant
* ruby

---

### Orientation

[Orientation](css-prop-orientation.md)
* writing-mode
* direction
* unicode-bidi
* text-underline-position
* text-orientation
* text-combine-upright
* border-block
* padding-block
* margin-block
* offset-block
* min-block-size
* block-size

---

### Table

[Table](css-prop-table.md)
* table-layout
* border-collapse
* border-spacing
* caption-side
* empty-cells

---

### Image

[Image](css-prop-image.md)
* object
* image

---

### Liste

[Liste](css-prop-liste.md)
* list
* counter
* @counter-style
* system()

---

### Layout

[Layout](css-prop-layout.md)
* position
* z-index
* float
* column
* flex
* align
* grid
* justify
* minmax()
* repeat()

---

### Transitions

[Transition](css-prop-transition.md)
* transition
* cubic-bezier()
* steps()

---

### Transformations

[Transformations](css-prop-transform.md)
* transform
* perspective
* backface-visibility

---

### Animations

[Animations](css-prop-animation.md)
* @keyframes
* animation
* will-change

---

### Interractions utilisateur

[Interractions utilisateur](css-prop-interract.md)
* pointer-events
* touch-action
* scroll
* resize

---

### Filtres

[Filtres](css-prop-filter.md)
* filter

---

### Viewport

[Viewport](css-prop-viewport.md)
* zoom
* orientation

---

### Page

[Page](css-prop-page.md)
* orphans
* widows
* page

---

### Formes

[Formes](css-prop-shapes.md)
* clip-path
* mask
* shape

---

### Blend modes

[Blend Modes](css-prop-blend.md)
* mix-blend-mode
* background-blend-mode
* isolation
