---
title: Les exceptions et erreurs
category: Web, JavaScript
---

## try, catch

Quand une erreur se produit, JavaScript s'arrête et affiche un message d'erreur. Plutôt que d'arrêter entièrement le processus, il est possible de limiter l'erreur à un bloc grâce à l'instruction `try... catch`.

`try` execute un bloc de code qui peut éventuellement lancer une erreur.  
`catch` permet de récupérer l'erreur qui a été déclenchée dans le `try`.  
L'erreur empêchera l'execution du reste du bloc `try` et non le reste du script situé après.

``` js
var b = a; // lève une erreur ReferenceError et s'arrête

console.log(b);
```

``` js
try {
  var b = a;

} catch(e) {
  console.error(e); // affiche l'erreur dans la console
}
console.log(b); // undefined
```

## catch conditionnel

Il est possible d'utiliser des catch conditionnels, par exemple pour cibler un type d'erreur donné.

```
try {
  ...
  throwSpecificError();
  ...
}
catch (SpecificError e) {
  specificHandler(e);
}
catch (UnspecificError e) {
  unspecificHandler(e);
}
catch (e) {
  // don't know what to do
  throw e;
} 
```

## finally

Il est également possible d'ajouter un bloc `finally`, qui s'executera que le `try` ait levé une erreur ou non.

``` js
try {
    var a = b;
    console.log("TRY");

} catch (e) {
    console.error("CATCH");

} finally {
    console.log("FINALLY");
}
console.log("After");

// Affiche CATCH, FINALLY, After
```

``` js
try {
    var a = "ok";
    console.log("TRY");

} catch (e) {
    console.error("CATCH");

} finally {
    console.log("FINALLY");
}
console.log("After");

// Affiche TRY, FINALLY, After
```

On peut mettre une instruction `finally` sans `catch`.  
En cas d'erreur, le bloc finally sera exécuté mais le reste du script (situé après) ne sera pas exécuté.

``` js
try {
    var a = b;
    console.log("TRY");

} finally {
    console.log("FINALLY");
}
console.log("After");

// Affiche FINALLY puis s'arrête
```

## throw

Les objets `Error` permettent de créer des erreurs.  
Une fois crée, l'objet peut être lancé grâce au mot-clé `throw`.

``` js
try {
    throw new Error("Ouups !");
    console.log("Try");

} catch (e) {
    console.log(e.name + ": " + e.message);
}
console.log("After");

// Affiche "Error: Ouups !" et "After"
```

Il existe différents types d'erreurs standards, qui héritent de `Error`.  
Elles sont utilisées par le moteur JavaScript pour lever des erreurs:

<table>
<tr>
  <th align="left">EvalError</th>
  <td>Erreur dans la fonction <code>eval()</code></td>
</tr>
<tr>
  <th align="left">IntervalError</th>
  <td>Erreur interne dans le moteur JavaScript, ex "too much recursion"</td>
</tr>
<tr>
  <th align="left">RangeError</th>
  <td>Variable numérique ou paramètre en dehors de sa plage de validité</td>
</tr>
<tr>
  <th align="left">ReferenceError</th>
  <td>Référence invalide</td>
</tr>
<tr>
  <th align="left">SyntaxError</th>
  <td>Erreur de syntaxe dans <code>eval()</code></td>
</tr>
<tr>
  <th align="left">TypeError</th>
  <td>Type invalide</td>
</tr>
<tr>
  <th align="left">URIError</th>
  <td>Erreur dans <code>encodeURI()</code> ou <code>decodeURI()</code></td>
</tr>
</table>

Techniquement, un `throw` peut lancer tout type de message, pas uniquement des objet `Erreur` mais aussi des chaînes de caractères ou des nombres — mais c'est moins courant.

[Référence des erreurs JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Erreurs)  
[Créer des types d'erreur personnalisées](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error#Types_d'erreur_personnalis%C3%A9s)