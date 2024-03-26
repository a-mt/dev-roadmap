---
title: RegExp
category: Web, JavaScript
---

Les `RegExp` sont des objets permettant d'utiliser des expressions régulières.

## Créer un RegExp

On peut utiliser un objet `RegExp()` ou la syntaxe `//` (de manière interchangeable).

``` js
console.log(/./);                  // /./
console.log(new RegExp("."));      // /./

console.log(/./g);                 // /./g
console.log(new RegExp(".", "g")); // /./g
```

## test

Permet de valider une chaîne de caractère

``` js
/./.test("helloWorld"); // true
```

## exec

Retourne le premier match trouvé (ou null).

```
/./.exec("helloWorld"); // [ "h" ]
```

Le match est suivit de la liste des groupes capturants.

``` js
/\+(\w+)/.exec("+Hello +World") // [ "+Hello", "Hello" ]
```

La propriété `index` retourne la position du match dans la chaîne de caractère en entrée.

``` js
/\+(\w+)/.exec("+Hello +World").index // 0
```

Tous les groupes nommés sont définies sous une propriété séparée: `groups`.

``` js
var re    = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
    match = re.exec('2015-01-02');

console.log(match.groups); // {year: "2015", month: "01", day: "02"}
```

---

## search

Permet de récupérer l'index du match

```
"Hello World".search(/\s/) # 5
"Hello World".search(/\t/) # -1
```

## match

Permet de récupérer les match d'un RegExp.  
Si le flag global (g) est utilisé, le résultat est la liste des match trouvés (ou null)

``` js
"+Hello +World".match(/\+(\w+)/g)

/*
 0: "+Hello"
 1: "+World"
 length: 2
*/
```

Sinon, le résultat sera identique à celui d'`exec` — le match suivit des groupes capturants (ou null).

``` js
"+Hello +World".match(/\+(\w+)/)

/*
 0: "+Hello"
 1: "Hello"
 index: 0
 input: "+Hello +World"
 length: 2
*/
```

## replace

Permet d'utiliser un RegExp pour remplacer des caractères.  
Cette fonction peut utiliser un callback.

``` js
'"example"'.replace(/(['"])(.*?)\1/g, '[$2]');
// [example]
```

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

[Syntaxe Regex](../regex.md)
