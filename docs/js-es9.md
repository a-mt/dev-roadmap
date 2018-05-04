---
title: ECMAScript 9
category: Web, JavaScript
---

ECMAScript 9 ou ECMAScript 2018 sortira en juin ou juillet 2018.

## Mémoire partagée

### SharedArrayBuffer

Permet à plusieurs threads de lire et écrire les mêmes données. En utilisant un `SharedArrayBuffer`, les données sont instantanemment accessibles par tous les threads et tous les web-workers.

### Atomics

`Atomics` est un module qui permet de s'assurer que toutes les opérations soient terminées sur des emplacements de mémoire partagée avant de pouvoir être utilisé ailleurs.

Quelques exemples de méthodes:

* `add` / `sub`: ajoute/enlève une valeur a une position donnée
* `load`: récupère la valeur a une position donnée

---

## Chaîne de caractères

### Templates literals

Les spécifications ES2015 et ES2016 n'autorisent pas l'utilisation de caractères d'échappement tels que "\u" (unicode) ou "\x" (hexadécimal) s'il ne s'agit pas d'un caractère valide (exemples de caractères valides: \u00A9, \u{2F804} ou \xA9).

ES2018 autorise désormais les caractères d'échappement apparemment invalides avec une fonction taggée si cette fonction renvoie les valeurs dans un objet au format suivant:

``` json
{
  "cooked": "Ne contient que des caractères valides",
  "raw"   : "Contient les caractères que l'on veut"
}
```

---

## Promesses

### finally

La fonction `finally` a été ajoutée au promesses. Sur le même principe que le `finally` d'un bloc `try... catch`, `finally` est executé à la fin, que la requête se soit bien passée ou non.

``` js
var myPromise = new Promise(function(resolve, reject){
    resolve('all good');
});

myPromise.then(val => {
  console.log(val);

}).catch(val => {
  console.error(val);

}).finally(() => {
  stopLoader();
});
```

### for await... of

La boucle `for await` permet de boucler sur une liste de promesse. Chaque itération est appelée une fois que l'itération précédente est terminée.

``` js
var promises = [
  new Promise(resolve => resolve(1)),
  new Promise(resolve => resolve(2)),
  new Promise(resolve => resolve(3))
];

async function test() {
  for await(var res of promises) {
    console.log(res); // 1 2 3
  }
}

test();
```

---

## RegExp

### Dotall

Le support de l'option *dotall* `s` a été ajoutée.  
Cette option permet à la classe universelle `.` de matcher les retours chariots comme `\n \r \f`.

``` js
/first.second/s.test('first\nsecond'); // true
```


``` js
var re = new RegExp('first.second', 's');
re.test('first\nsecond'); // true
```

### Groupes de captures nommés

Le support des groupes de captures a également été ajouté:
* `(?<name>...)` pour créer un groupe nommé

  ``` js
  var re    = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
      match = re.exec('2015-01-02');

  console.log(match.groups.year); // 2015
  ```

* `(\k<name>)` pour une backréférence vers un groupe nommé au sein de la regex

  ``` js
  var re    = /(?<quote>'|")[a-z]+(\k<quote>)/,
      match = 'aa"bb"cc';
  ```

* `$<name>` pour une backréférence dans une fonction de remplacement

  ``` js
  var re    = /(?<firstName>[^ ]+) (?<lastName>[^ ]+)/,
      text  = "Prenom Nom".replace(re, '$<lastName>, $<firstName>');
  ```

### Classes Unicode

Le support des classes Unicode a été ajouté.

``` js
var re  = /\p{Script=Greek}/, // permet de vérifier si le texte contient des caractères grecs
    re2 = /\p{Emoji}/,        // ...des emojis
    re3 = /^\P{Emoji}+$/;     // tout caractère sauf des emojis
```

[Proposition officielle](https://github.com/tc39/proposal-regexp-unicode-property-escapes)

### Lookbehind

Les lookbehinds `(?<=...)` et `(?<!...)` ont été ajoutés.

``` js
var re  = /(?<=#)\d+/, // tout nombre précédé de #
    re2 = /(?<!#)\d+/; // tout nombre qui n'est pas précédé de #
```
