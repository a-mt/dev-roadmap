---
title: Type de données
category: Web, JavaScript
---

JavaScript est un langage faiblement typé, il n'est pas nécessaire de déclarer le type de donnée que contient une variable. Le type de donnée est dynamique, il sera automatiquement déterminé en fonction de la valeur.

En EcmaScript5, il existe 5 types de données primitifs:
- string
- number
- boolean
- null
- undefined

Et un type complexe:
- object
  * array
  * function
  * date
  * regExp

---

## string

Le type de données `string` est utilisé pour stocker des données textuelles. C'est une suite de caractères sur 16 bits (unicode).  
Les chaîne de caractère JavaScript sont immuables, c'est à dire qu'on ne peut pas modifier les caractères d'une chaîne de caractère, il est nécessaire d'en créer une nouvelle.

<ins>Exemple</ins>: `"December"`, `'December'`

Les chaînes de caractères sont entourées de simples ou doubles quotes, les caractères spéciaux sont traités dans les deux cas

``` js
console.log("a\tb"); // a    b
console.log('a\tb'); // a    b
```

On peut également utiliser des séquences d'échappement hexadécimal ou Unicode

``` js
console.log('\xA9');   // "©"
console.log('\u00A9'); // "©"
```

Une chaîne de caractère ne peut pas contenir de retours chariots - il faut utiliser `"\n"` pour en afficher. Pour écrire une chaîne de caractères longue sur plusieurs ligne il est nécessaire d'utiliser la concaténation.

``` js
var msg = "Lorem ipsum dolor sit amet"
        + "Sed scelerisque tellus a lectus tempus";
```

Une chaîne de caractères peut également être crée à partir du code UTF-16

``` js
console.log(String.fromCharCode(104,101,108,108,111)); //"hello"
```

---

## number

En JavaScript, tous les nombres sont stockés come dans flottants 64bits à virgule flottante. Il est donc inutile de se soucier de savoir si c'est un entier, un petit entier, un gros entier, un nombre décimal, etc.

<ins>Exemple</ins>: `12`, `3.2`, `.2`

La majorité des navigateurs supportent également l'écriture octale, héxadécimale, binaire et scientifique, bien que cela ne fasse pas partie de la syntaxe officielle.

``` js
console.log(010);  // 8
console.log(0o10); // 8
console.log(0b10); // 2
console.log(0x10); // 16
console.log(1e10); // 10000000000
```

Le type nombre possède trois valeur symboliques: `+Infinity`, `-Infinity` et `NaN`.

### NaN

Lorsqu'on essaie de caster une variable qui ne contient pas des caractères numériques en nombre, on obtient une valeur symbolique: `NaN` (Not a Number)

``` js
console.log(parseInt("d")); // NaN
```

### Infinity

`Infinity` est une valeur symbolique qui se comporte comme l'infini mathématique:  
Tout ce qui est multiplié par `Infinity` vaut `Infinity`, tout ce qui est divisé par `Infinity` vaut 0.

``` js
console.log(5 / 0);        // Infinity
console.log(-5 / 0);       // -Inifinity
```

``` js
console.log(1 / Infinity); // 0
console.log(1 * Infinity); // Infinity
```

---

## boolean

Une variable booléenne est une valeur qui ne peut avoir que deux valeurs: vrai ou faux. Un booléen est notamment le type de donnée retourné par une comparaison, il permet de tester des conditions.

<ins>Exemple</ins>: `true`, `false`

---

## null

Une variable de type null ne peut avoir qu'une seule valeur: `null`. La valeur `null` est utilisée pour indiquer l'absence de donnée - une donnée qui n'est pas renseignée ou qui n'est pas utilisée.

<ins>Exemple</ins>: `null`

---

## undefined

Une variable déclarée mais non assignée a un type de donnée particulier, le type `undefined`. A ne pas confondre avec null, laquelle est une valeur belle et bien définie.

---

## object

Les objets peuvent être considérés comme des collections de clé/valeur.  

<ins>Exemple</ins>: `{}`, `{key1: "value"}`, `{key1: "value", key2: function(){ }}`

Il existe des sous-types de `object`: les tableaux, les fonctions, les regexp, les dates...

---

## symbol

Le symbole est un nouveau type ajouté à partir d'ES6.  
Chaque nouveau symbole a une valeur complètement unique, aucun symbole ne sera considéré comme égal ou équivalent à un autre, ni à une chaîne de caractères.

<ins>Exemple</ins>: `Symbol('name')`

``` js
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
```