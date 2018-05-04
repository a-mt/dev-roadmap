---
title: Objets, modules et méthodes globales
category: Web, JavaScript
---

## Exceptions

### try, catch, finally

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


``` js
try {
    var a = b;
    console.log("TRY");

} finally {
    console.log("FINALLY");
}
console.log("After");

// Affiche FINALLY puis lève l'erreur (ce qui stoppe le script)
```

### throw, Error

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

Il existe différents types d'erreurs standards, qui héritent de `Error`, utilisées par le moteur JavaScript pour lever des erreurs:

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

Techniquement, un `throw` peut lancer tout type de message, pas forcemment des erreurs mais des chaînes de caractères ou des nombres aussi mais c'est moins courant.

[Référence des erreurs JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Erreurs)  
[Créer des types d'erreur personnalisées](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error#Types_d'erreur_personnalis%C3%A9s)

---

## Expressions régulières

Les `RegExp` sont des objets permettant d'utiliser des expressions régulières.  
On peut utiliser un objet `RegExp()` ou la syntaxe `//` de manière interchangeable.

``` js
console.log(/./);                  // /./
console.log(new RegExp("."));      // /./

console.log(/./g);                 // /./g
console.log(new RegExp(".", "g")); // /./g
```

* La méthode `test` de RegExp permet de valider une chaîne de caractère

  ``` js
  /./.test("helloWorld"); // true
  ```

* La méthode `match` de String permet de récupérer les match avec un RegExp

  ``` js
  "helloWorld".match(/./);
  //  [ "h", "e", "l", "l", "o", "W", "o", "r", "l", "d" ]
  ```

* La méthode `replace` de String permet d'utiliser un RegExp pour remplacer des caractères.  
  Cette fonction peut utiliser un callback.

  ``` js
  "helloWorld".replace(/([a-z])([A-Z])/, "$1 $2");
  // hello World
  ```

  ``` js
  "helloWorld".replace(/([a-z])([A-Z])/, function(match, l1, l2){
    return l1 + " " + l2.toLowerCase();
  });
  // hello world
  ```

[Syntaxe Regex](regex.md)

---

## Dates

Les `Date` sont des objets permettant de manier des dates.

### Créer une date

* Pour récupérer la date actuelle, on peut utiliser `new Date()`
* Pour récupérer le timestamp de la date actuelle, on peut utiliser `Date.now()`
* Pour créer une date de toutes pièces: `new Date(year, month, day, hours, minutes, seconds, ms)`

<ins>Fuseau horaire</ins>:

Lorsqu'on crée une date sans spécifier le fuseau horaire, JavaScript utilise le fuseau horaire du navigateur.

Attention, `console.log(date)` affiche la date GMT+00.
Pour afficher la date selon le fuseau horaire en cours (la valeur que l'utilisateur verra), il faut l'afficher au format texte: `console.log(""+date)`.

``` js
var date = new Date(2018, 1, 11, 13, 59, 18, 425);
console.log(date.toLocaleString()); // 11/02/2018 à 13:56:18
console.log(date.getHours());       // 13
console.log(date.getUTCHours());    // 12
```

<ins>Universel Time Zone (UTC)</ins>:

Pour traiter des dates qui ne dépendent pas d'un fuseau horaire (date de naissance, date historique...), on utilise des dates UTC (Universal Time Zone).

``` js
var date = new Date(Date.UTC(2018, 1, 11, 13, 56, 18));
console.log(date.toLocaleString()); // 11/02/2018 à 14:56:18
console.log(date.getHours());       // 14
console.log(date.getUTCHours());    // 13
```

### Tester l'égalité de deux dates

Pour tester l'égalité ou la différence entre deux dates, on utilise `valueOf()`

``` js
var date1 = new Date(),
    date2 = new Date();

console.log(date1.valueOf() == date2.valueOf());
```

---

## Fonctions globales

### Misc

* `eval()` permet d'executer du texte comme étant du code. Parce qu'il permet l'execution de code arbitraire, `eval()` peut constituer une faille de sécurité. Dans la majorité des cas, il ne devrait pas être nécessaire de l'utiliser.

  ``` js
  var stmt = 'console.log("ok")';
  eval(stmt);
  ```

### Nombres

* `parseInt()` permet de convertir une valeur en entier. S'il l'on essaie de convertir une valeur non numérique, le résultat obtenu est `NaN`.

  ``` js
  var howMany = "3 dogs";
  console.log(parseInt(howMany)); // 3
  ```

* `parseFloat()` permet de convertir une valeur en float - même principe que `parseInt()` mais pour les nombres à virgule.

  ``` js
  var temp = "3.2°";
  console.log(parseFloat(temp)); // 3.2
  ```

* `isNaN()` détermine si la valeur passé en argument est `NaN` ou non.

  ``` js
  var n = parseInt("NOP");       // NaN
  console.log(isNan(n));         // true
  ```

* `isFinite()` détermine si la valeur passée en argument est un nombre fini.

  ``` js
  var n = 100/0;                 // Infinity
  console.log(isFinite(n));      // false
  ```

### Échappement

* `encodeURI()` encode une chaîne de caractère pour être utilisée comme URL

  ``` js
  encodeURI("http://www.google.com/results with spaces#some-anchor")
  // http://www.google.com/results%20with%20spaces#some-anchor
  ```

* `encodeURIComponent()` encode une chaîne de caractère pour être utilisée comme un paramètre d'URL

  ``` js
  encodeURIComponent("http://www.google.com/results with spaces#some-anchor")
  // http%3A%2F%2Fwww.google.com%2Fresults%20with%20spaces%23some-anchor
  ```

* `decodeURI()` decode une URL

  ``` js
  decodeURI("http://www.google.com/results%20with%20spaces#some-anchor")
  // http://www.google.com/results with spaces#some-anchor
  ```

* `decodeURIComponent()` décode un paramètre d'URL

  ``` js
  decodeURIComponent("http%3A%2F%2Fwww.google.com%2Fresults%20with%20spaces%23some-anchor")
  // http://www.google.com/results with spaces#some-anchor
  ```

---

## Modules

Dans un navigateur, certains modules sont préchargés, c'est à dire des objets globaux qui mettent à disposition des fonctions.

- [Math](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math)
- [JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON)
- [Intl](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Intl)
