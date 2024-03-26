---
title: Boucles
category: Web, JavaScript
---

Les boucles, ou itérations, permettent d'executer du code plusieurs fois.  
Cela peut permettre par exemple de récupérer tous les paragraphes de la page et de récupérer leur contenu.

## for

La boucle `for` boucle entre deux bornes et incrémente l'index à chaque itération.

``` js
for(var i=1; i<10; i++) {
  console.log(i); // from 1 to 9
}
```

### Composants d'un for

Un for comporte 3 composants séparés par des points-virgules: l'initialisation, la condition, l'incrementation.  
Chacun de ces composants peut contenir 0 à n opérations:

``` js
var myArray = [1,2,3],
    key     = 0,
    value;

for (; value = myArray[key++];){
  console.log(value); // 1 2 3
}
```

``` js
var myArray = [1,2,3];

for (var key = 0, value = myArray[key], length = myArray.length; key < length; value = myArray[++key]) {
  console.log(value); // 1 2 3
}
```

---

## for... in

Une variante du for est le `for... in`. Il permet de boucler sur les propriétés d'un objet.

``` js
var someObject = {key1: "val1", key2: "val2"};

for(k in someObject) {
  console.log(k, " - ", someObject[k]); // key1 - val1 key2 - val2
}
```

---

## for... of

`for... of` (ES6) boucle sur les valeurs d'un objet itérable (comme un tableau) - contrairement au `for... in` qui boucle sur les clés.

``` js
var arr = [3, 4, 5];
for(var val of arr) {
  console.log(val);  // 3 4 5
}
```

---

## while

La boucle `while` permet de boucler tant qu'une condition est vraie.

``` js
var a = 0;

while(++a < 10) {
    console.log(a); // from 1 to 9
}
```

---

## do... while

Une variante du `while` est le `do... while`. La seule différence est que le while se situe à la fin du bloc - le point-virgule est nécessaire dans ce cas. Un `do... while` est executé au moins une fois, même si la condition n'est jamais vraie.

``` js
var a = 100;
do {
    console.log(a);   // Will happen at least once
    a++;
} while(a < 10);
```

Le problème principal avec n'importe quelle boucle n'est pas de boucler, mais de s'arrêter. Si la condition est toujours vraie, on crée un boucle infinie qui bloque le processus, si l'on oublie d'incrémenter par exemple.

---

## break

Le mot-clé `break` permet de rompre une boucle avant d'atteindre la condition de sortie.


``` js
for(var i=1; i<10; i++) {
  if(i == 5) {
    break;
  }
  console.log(i); // from 1 to 4
}
```

## continue

Le mot-clé `continue` permet de poursuivre à l'itération suivante sans executer le reste du bloc.

``` js
for(var i=1; i<10; i++) {
  if(i == 5) {
    continue;
  }
  console.log(i); // de 1 à 4 et de 6 à 9
}
```

## label

Les labels peuvent être utisés avec `break` ou `continue`.  
Ils sont rarement utilisés

``` js
var str = "";

loop1:
for (var i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str); // expected output: "0234"
```