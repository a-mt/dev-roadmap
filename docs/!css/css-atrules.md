---
title: At-rules
category: Web > CSS
---

## @media (media queries)

Pour executer des instructions CSS sous condition, à l'intérieur d'une feuille CSS ou d'une balise `<style>`:

``` css
/* CSS3 */
@media print {
  button { display: none; }
}
```

``` css
@media print and (max-width: 420px) {
  button { display: none; }
}
```

``` css
@media (max-width: 420px) {} /* mobile */
@media (min-width: 421px) and (max-width: 720px) {} /* tablet */
@media (min-width: 721px) {} /* desktop */
```

Les différents types d'appareil sont :

| Media  | Description                              |
|---     |---                                       |
| all    | Tout type d'appareil (valeur par défaut) |
| print  | Imprimante                               |
| screen | Écran (desktop, mobile)                  |
| speech | Lecteur audio                            |

---

## @supports (feature queries)

La règle `@supports` permet de définir des déclaration qui dépendent de la prise en charge du navigateur d'une ou plusieurs fonctionnalités CSS.

``` plain
@supports <supports-condition> {
  <group-rule-body>
}
(CSS3)
Teste la prise en charge d'une ou des fonctionnalité(s)
```

``` css
@supports (display: flex) {
  div {
    display: flex;
  }
}
```

``` css
@supports not (display: flex) {
  div {
    float: right;
  }
}
```

Les opérateurs `and` et `or` peuvent être utilisés.

``` css
(display: table-cell) and (display: list-item)
```

``` css
(transform-style: preserve) or (-moz-transform-style: preserve)
```

---

## @namespace

`@namespace` définit les espaces de noms XML utilisés dans une feuille de style CSS, avec un espace de noms par défaut suivit d'une liste d'espaces de noms avec préfixes.

``` plain
@namespace <namespace-prefix>? [ <string> | <url> ];
```

``` css
@namespace "http://www.w3.org/1999/xhtml";
@namespace svg "http://www.w3.org/2000/svg";
@namespace math "http://www.w3.org/1998/Math/MathML";
```

Les espaces de noms définis sont alors utilisés pour restreindre les sélecteurs universels, de type, et d'attribut afin que ceux-ci ne sélectionnent que les éléments contenus dans cet espace de nom.
Le préfixe est séparé du sélecteur par un pipe (`|`).

``` css
a {}       /* cible les éléments XHTML <a> (XHTML est l'espace de nom par défaut) */
svg|a {}   /* cible les éléments SVG <a> */
*|a {}     /* cible tous les éléments <a> (XHTML et SVG )*/
```

Les règles `@namespace` doivent suivre les règles `@charset` et `@import` et précéder les autres règles `@` ainsi que les déclarations de style contenus dans la feuille de style.

---

## @page

La règle `@page` permet de modifier les marges, les lignes orphelines et veuves ainsi que les sauts de page lorsqu'on imprime la page.

``` plain
@page [:first || :left || :right || :blank] {
  <(regular css properties) ||
  page-break-before || page-break-after || page-break-inside ||
  orphans || widows>
}
(CSS2)
```

``` css
@page {
  div.note { 
    page-break-before: avoid;
  }
}
```

Depuis CSS3 on peut également cibler les zones de marge, comme les headers et les footers, pour y ajouter du contenu généré.

``` css
@page {
  color: red;
  @top-center {
    content: "Page " counter(page);
  }
}
```

| Cible                                            | Emplacement
|---                                               |---
| @top-left-corner <br> @top-left <br> @top-center <br> @top-right <br> @top-right-corner | ![](https://i.imgur.com/lpIfPOf.png)
| @left-top <br> @left-middle <br> @left-bottom    | ![](https://i.imgur.com/ccfoF9u.png)
| @right-top <br> @right-middle <br> @right-bottom | ![](https://i.imgur.com/3SdTCM9.png)
| @bottom-left-corner <br> @bottom-left <br> @bottom-center <br> @bottom-right <br> @bottom-right-corner | ![](https://i.imgur.com/1hA6zpK.png)

---

## @viewport

Ce module reprend les principes de base de la meta `viewport` mais en respectant les normes d'écriture de CSS.

``` html
// en HTML 
<meta name="viewport" content="width=device-width,initial-scale=1" /> 
```

``` css
// en CSS 
@viewport { 
  width: device-width; 
  zoom: 1; 
}
```
