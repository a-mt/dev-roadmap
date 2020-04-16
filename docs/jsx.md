---
title: JSX
category: Web, JavaScript
---

JSX (JavaScript as XML) est une syntaxe de type XML, qui permet d'écrire du code HTML directement
en JavaScript et aide à garder le code lisible. Cette syntaxe est souvent utilisée avec React (framework JavaScript).

``` html
<script type="text/babel">
    const JSX = (<div>
        <h1>This is a block of JSX</h1>
        <p>Here is a subtitle</p>
    </div>);
    console.log(JSX);
</script>
<!-- Les parenthèses ne sont pas obligatoires -->
```

Le code JSX ne peut pas être interprété directement par le navigateur, il doit être transpilé en Javascript au préalable.
Pour ce faire, on peut soit utiliser la ligne de commande (avec Webpack par exemple), soit indiquer que le script est
de type `text/babel` (comme illustré ci-dessus) et inclure la librairie [Babel](https://babeljs.io/) dans le document
pour effectuer la convertion JSX → JavaScript au runtime.

``` html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.29/browser.min.js"></script>
```

## Syntaxe

La syntaxe JSX est très similaire au HTML, à quelques différences près.

* Un élément JSX ne peut avoir qu'un seul élément racine.

  <del>Code JSX invalide</del>:

  ``` html
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
  ```

  <ins>Code JSX valide</ins>:

  ``` html
  <div>
    <p>Paragraph One</p>
    <p>Paragraph Two</p>
    <p>Paragraph Three</p>
  </div>
  ```

* Tout élément doit être fermé: `<br />` est valide, `<br>` non.

* Tout élément JSX peut être définit avec un tag auto-fermé.   
  Par exemple: `<div />` pour créer un élément div vide.  

* JSX respecte la convention de nommage lowerCamelCase.  
  On définit donc `onClick` et non `onclick`, `tabIndex` et non `tabindex`...

* Parce que JSX est plus proche du JavaScript que de HTML, on définit
  les propriétés JavaScript des éléments et non leurs attributs HTML.
  Par exemple: on utilise `className` et non `class` pour définir la classe d'un élément.
  
  ``` html
  <h1 className="greeting">
    Bonjour, monde !
  </h1>
  ```
  
## JS et JSX

Parce que JSX est une extension à la syntaxe Javascript, on peut écrire du Javascript directement à l'intérieur du JSX.
Il suffit d'inclure le code Javascript entre accolades.

``` jsx
<p>Status is : {b ? "ok" : "nok"}</p>
```

``` jsx
<div>Lorem</div>
{/* Ceci est un commentaire JSX */}
<div>Ipsum</div>
```

On peut utiliser l'opérateur `&&` pour afficher du texte uniquement lorsqu'une condition est remplie
— de manière plus concise qu'un `if`.

``` jsx
{condition && <p>markup</p>} 
```


Et on peut utiliser `filter` et `map` pour afficher les listes à l'intérieur de JSX.

``` jsx
<ul>
  {arr.map((item, i) =>
    <li key={i}
        className={"item" + (i == this.currentIndex ? " active" : "")}
        onClick={this.setActive(i)}>{item}</li>
  )}
</ul>
```
