---
title: Page
category: Web, CSS, Propriétés
---

``` css
@page {
  div.note { 
    page-break-before: avoid;
  }
}
```

Les propriétés suivantes s'appliquent à l'intérieur d'une at-rule `@page`.

## orphans & widows

``` plain
orphans: <integer>
(CSS2)
Définit nombre minimum de lignes qui doivent rester en bas d'une page, région ou colonne
2 par défaut
```

``` plain
Définit le nombre minimum de lignes qui peuvent être laissées en haut de la page, région ou colonne suivante
widows: <integer>
(CSS2)
2 par défaut
```

## page

``` plain
page-break-inside: avoid | auto
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page au sein de l'élément courant
```

``` plain
page-break-before: auto | always | avoid | left | right
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant
```

``` plain
page-break-after: auto | always | avoid | left | right
(CSS2)
Ajuste la façon dont sont appliqués les sauts de page placés après l'élément courant
```

| Valeur   | Descirption
|---       |---
| `auto`   | Valeur initiale. Les sauts de page sont automatiques
| `always` | Le saut de page est toujours forcé avant l'élément
| `avoid`  | Les saut de page sont évités avant l'élément
| `left`   | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page gauche.
| `right`  | Le saut de page est forcé avant l'élément afin que la prochaine page soit mise en forme comme une page droite.
