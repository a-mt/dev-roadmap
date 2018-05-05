---
title: Template litterals
category: Web, JavaScript, ES6
---

## Qu'est-ce que c'est

Les littéraux de modèles (template literals) sont des chaînes délimitées par <code>`</code>.  
Par rapport à des chaînes classiques plusieurs fonctionnalités sont ajoutées:

1. Le code contenu dans `${...}` est interpolé (ce peut être une variable, une fonction, une condition ternaire...).
2. Le contenu peut avoir des retours chariots

``` js
const person = {
    name: "Bob",
    age: 20
};
const hello = `Hello, my name is ${person.name}.
I am ${person.age} years old.`;

console.log(hello); // Hello, my name is Bob. I am 10 years old.
```

## Tagged template litterals

Les templates litterals peuvent également être taggés avec un nom de fonction.  
Lorsqu'il est taggé, plutot que d'avoir le navigateur se charger de l'interpolation du template, il est passé à une fonction.

``` js
function format() {
  console.log(arguments); // 0: Array [ "Hello, my name is ", ".\nI am ", " years old." ], 1: "Bob", 2: 20
  return "Cool";
}

const person = {
    name: "Bob",
    age: 20
};
const hello = format`Hello, my name is ${person.name}. I am ${person.age} years old.`;
console.log(hello); // Cool
```

Par exemple, pour préfixer "Bonjour" ou "Bonsoir" selon l'heure en cours:

``` js
function format(parts, ...replacements) {
  var str = '';

  parts.forEach((string, i) => {
    str += string;

    if(i < replacements.length) {
      str += ` ${replacements[i] || ''}`;
    }
  });

  var h = new Date().getHours();
  return (h < 18 ? "Bonjour! " : "Bonsoir! ") + str;
}
```

## String.raw

La fonction `String.raw` peut être utilisée comme tag pour obtenir le résultat de l'interpolation du template literals sans que les caractères spéciaux soient pris en compte.

``` js
`Hi\t${2+3}!`; // "Hi	5!"

String.raw`Hi\t${2+3}!`; // "Hi\\t5!"
```


