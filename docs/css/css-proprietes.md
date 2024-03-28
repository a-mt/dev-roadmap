---
title: Propriétés CSS
category: Web > CSS
---

## Propriétés globales

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

## Valeurs globales

Il existe 4 valeurs globales, qui peuvent être données à toutes les propriété CSS: initial, inherit, unset, revert.

### initial

`initial` (CSS2) applique la *valeur initiale* d'une propriété à un élément.  
La valeur initiale d'une propriété CSS est définie par les spécifications W3C.

``` css
.exemple {
  color: red;
}
.exemple em {
  color: initial; /* couleur initiale de em (black) */
}
```

### inherit

`inherit` (CSS2) applique la valeur calculée de la propriété de l'élément parent.

``` css
p {
  color: #333;
}
a {
  color: red;
}
p a {
  color: inherit; /* #333 */
}
```

### unset

`unset` (CSS3) réinitialise la propriété afin que sa valeur soit la valeur héritée depuis l'élément parent (comme `inherit`) ou sa valeur initiale s'il n'y a pas d'héritage (comme `initial`).

``` css
p {
  color: red;
}
#sidebar p {
  color: unset; /* couleur de #sidebar ou couleur par défaut de p si non définie */
}
```

### revert

`revert` (CSS4) réinitialise la propriété avec la valeur par défaut du navigateur.  
Ne pas confondre `revert` avec `initial`: les navigateurs définissent des valeurs par défaut pour les différents éléments HTML, des valeurs qui sont différentes de la valeur initiale définie par les spécifications CSS.

``` css
.widget {
  all: revert;
}
```

## Shorthand

* Certaines propriétés nécessitent que d'autres soient définies.  
  Par exemple, pour afficher une bordure, il faut spécifier le style, la couleur et la largeur:

  ``` css
  border-color: black;
  border-width: 1px;
  border-style: solid;
  ```

* Quand c'est le cas, il existe généralement une propriété raccourcie (shorthand) qui permet de définir plusieurs propriétés en même temps.  

  ``` css
  border: 1px solid black;
  ```

  ``` css
  border: solid black 1px;
  ```

* Si les types des valeurs sont différents, alors l'ordre n'a pas d'importance.  
  Pour les autres (comme par exemple le `border-style`, `margin` ou `padding` peuvent prendre entre 1 et 4 valeurs numériques), leur ordre importe:

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
