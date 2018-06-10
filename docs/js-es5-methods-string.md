---
title: "Méthodes: Chaînes de caractères"
category: Web, JavaScript, ES5
---

## localeCompare()

`localeCompare()` permet de comparer deux chaînes de caractère (ordre alphabétique). Elle est particulièrement utile pour trier un tableau.

``` js
var arr = ["bananas", "cranberries", "apples"];
arr.sort(function(a, b) {
  return a.localeCompare(b);
});
```

## charAt()

`charAt()` permet de récupérer un caractère à un index donné. La notation avec des crochets peut également être utilisée.

``` js
console.log('Hello World'.charAt(4)); // o
console.log('Hello World'[4]);        // o
```

## charCodeAt()

`charCodeAt()` de récupérer le code d'un caractère à un index donné

``` js
console.log("μ".charCodeAt()); // 181
console.log('Hello World'.charCodeAt(4)); // 111
```

## String.fromCharCode()


`fromCharCode()` permet de récupérer le caractère d'un code UTF-16

``` js
console.log(String.fromCharCode(181)); // µ
```

## trim()

`trim()` permet de supprimer les espaces situés en debut et en fin de chaîne.

console.log("    this is me    ".trim()); // "this is me"

Beaucoup de navigateurs ont implémenté les méthodes `trimLeft()` et `trimRight()` (non standard).

console.log("    this is me    ".trimLeft()); // "this is me    "
console.log("    this is me    ".trimRight()); // "    this is me"

## toUpperCase(), toLowerCase()

`toUpperCase()` peut être utilisé pour remplacer toutes les lettres minuscules en lettres majuscules. `toLowerCase()` pour remplacer les lettres majuscules en lettres minuscules.

``` js
console.log( "Hello World".toLowerCase() ); // hello world
console.log( "Hello World".toUpperCase() ); // HELLO WORLD
```

## toLocaleUpperCase(), toLocaleLowerCase()

Même principe que `toUpperCase()` et `toLowerCase()` mais pour la locale spécifiée ou la locale en cours si non spécifié.

``` js
console.log("i".toUpperCase())            // I
console.log("i".toLocaleUpperCase("tr"))  // İ (i majuscule turc)
```

## slice()

`slice()` peut être utilisé pour extraire une sous-chaîne entre deux indices ou à partir d'un indice

``` js
var s = "0123456789abcdefg";
console.log(s.slice(0, 5)); // "01234"
console.log(s.slice(5, 6)); // "5"
console.log(s.slice(10));   // "abcdefg"
```

Si l'index donné est négatif, alors il s'agit de l'index à partir de la droite (longueur - n).

``` js
console.log(s.slice(-5)); // "cdefg"
console.log(s.slice(-6, -5)); // "b"
```

## substring()

`substring()` fonctionne de la même manière que `slice()`. Excepté que les indices négatifs ne sont pas acceptés.

``` js
var s = "0123456789abcdefg";
console.log(s.substring(0, 5)); // "01234"
console.log(s.substring(5, 6)); // "5"
console.log(s.substring(10));   // "abcdefg"
```

## substr()

Retourne une sous-chaîne commençant à l'indice spécifié et pour le nombre de caractères donné.

``` js
var s = "0123456789abcdefg";
console.log(s.substr(0, 5)); // "01234"
console.log(s.substr(5, 6)); // "56789a"
console.log(s.substr(10));   // "abcdefg"
```

Accepte les indices négatifs.

``` js
console.log(s.substr(-6, 1)); // "b"
```

## indexOf(), lastIndexOf()

Pour trouver l'emplacement d'une chaîne à l'intérieur d'une chaîne, on peut utiliser `indexOf()` ou `lastIndexOf()`

`indexOf()` retourne l'index de la première occurence trouvée ou -1. Même principe avec `lastIndexOf()` mais pour la dernière occurence.

``` js
console.log( "Hello World".indexOf("o") );     // 4
console.log( "Hello World".indexOf("x") );     // -1

console.log( "Hello World".lastIndexOf("o") ); // 7
console.log( "Hello World".lastIndexOf("x") ); // -1
```

## replace()

`replace()` permet de remplacer une chaîne par une autre chaîne. Les RegExp peuvent être utilisés pour match. Un callback peut être utilisé pour remplacement.

``` js
console.log( "Hello World".replace("Hello", "Bye") ); // Bye World
```

``` js
console.log( "Hello World".replace(/ [A-Z]/, function(match){
  return match.toLowerCase();
}) ); // Hello world
```

## split()

Permet de séparer un chaîne de caractère en tableau selon un délimiteur donné

``` js
"HelloWorld".split("") // [ "H", "e", "l", "l", "o", "W", "o", "r", "l", "d" ]
```

## match()

Permet de vérifier si une chaîne de caractère valide une RegExp et de récupérer le match. Le résultat obtenu est le même qu'avec `regex.exec("str")`: un tableau contenant les correspondances ou `null`.

``` js
var regex   = /\w+/g,
    matches = "hello world".match(regex);

console.log(matches); // ["hello", "world"]
```

## concat()

Permet de concaténer des chaînes de caractères. Pour une meilleure performance, il est conseillé d'utiliser l'opérateur de concaténation `+` plutôt que cette méthode.

``` js
var str = "abc";
console.log(console.log(str.concat("def", "ghi"))); // abcdefghi
```
