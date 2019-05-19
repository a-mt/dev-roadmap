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

Retourne le premier match trouvé.

```
/./.exec("helloWorld"); // [ "h" ]
```

Tous les groupes nommées sont définies sous une propriétés séparée: `groups`.

``` js
var re    = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
    match = re.exec('2015-01-02');

console.log(match.groups); // {year: "2015", month: "01", day: "02"}
```

---

## match

Permet de récupérer tous les match d'un RegExp

``` js
"helloWorld".match(/./);
// [ "h", "e", "l", "l", "o", "W", "o", "r", "l", "d" ]
```

## replace

Permet d'utiliser un RegExp pour remplacer des caractères.  
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

[Syntaxe Regex](../regex.md)