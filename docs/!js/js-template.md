---
title: Les templates
category: Web, JavaScript
---

## Template litterals

Les templates sont des chaînes de caractères délimités par <code>`</code>.  
Par rapport à une chaîne classique (délimitée par `'` ou `"`), un template peut

1. interpoler du code — une variable, une fonction, une condition ternaire — à l'intérieur de `${...}`

   ``` js
   var msg = `Hello ${name}`;
   ```

2. contenir des retours chariots

   ``` js
   var hello = `Hello, my name is ${person.name}.
   I am ${person.age} years old.`;

   console.log(hello); // Hello, my name is Bob. I am 10 years old.
   ```

## Tagged template

Les templates peuvent être taggés avec un nom de fonction.  
Cette fonction se chargera d'interpoler le template — plutôt que de laisser le navigateur s'en charger.

``` js
var person = {
    name: "Bob",
    age: 20
};
var hello = format`Hello, my name is ${person.name}. I am ${person.age} years old.`;
console.log(hello); // Hello, my name is [Bob]. I am [20] years old.
```

``` js
function format(strings, ...vars) {
  var txt = '';

  strings.forEach((str, i) => {
    txt += str;

    if(i < vars.length) {
      txt += '[' + vars[i] + ']';
    }
  });
  return txt;
}
```

### Caractères spéciaux

Les spécifications ES2015 et ES2016 n'autorisent pas l'utilisation de caractères d'échappement tels que "\u" (unicode) ou "\x" (hexadécimal) s'il ne s'agit pas d'un caractère valide (exemples de caractères valides: \u00A9, \u{2F804} ou \xA9).

ES2018 autorise désormais les caractères d'échappement apparemment invalides avec une fonction taggée. Si la chaîne de caractère calculée contient des caractères spéciaux invalides, alors elle prend la valeur `undefined`. Par contre, la valeur brute est toujours accessible via `.raw`, où les antislashs ne sont pas interprétés (`\n` est une chaîne de longueur 2: un slash suivit d'un n).

<ins>Exemple</ins>:

``` js
var txt = latex`
\newcommand{\fun}{\textbf{Fun!}}  // works just fine
\newcommand{\unicode}{\textbf{Unicode!}} // Illegal token!
\newcommand{\xerxes}{\textbf{King!}} // Illegal token!

Breve over the h goes \u{h}ere // Illegal token!`
```

``` js
function latex(strings) {
  console.log(strings);     // [ undefined ]
  console.log(strings.raw); // [ "\n\\newcommand{\\fun}{\\textbf{Fun!}}..." ]
}
```

### String.raw

La fonction `String.raw` peut être utilisée comme tag pour obtenir le résultat de l'interpolation du template litterals sans que les caractères spéciaux ne soient interprétés.

``` js
`Hi\t${2+3}!`; // "Hi	5!"

String.raw`Hi\t${2+3}!`; // "Hi\\t5!"
```


