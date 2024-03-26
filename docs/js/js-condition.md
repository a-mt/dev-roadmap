---
title: Conditions
category: Web, JavaScript
---

## if

Le code à l'intérieur d'une condition `if` n'est executé que si le booléen testé est vrai.  
S'il n'est pas vrai, le code à l'intérieur des accolades est ignoré et l'execution poursuit sur la ligne qui suit la fermeture du bloc.

``` js
var b = true;
if(b) {
    // Code a executer si le booléen est vrai
}
```

### Version abrégée

Les accolades ne sont indispensable que si une seule ligne de code doit être executée par le `if`. C'est cependant une bonne pratique de toujours les mettre, cela évite de commettre des erreurs en reprenant le code plus tard.

``` js
if(b) console.log("OK");
```

### Expressions booléennes

Tout l'intérêt des conditions est de pouvoir tester des expressions retournant un booléen, comme une comparaison.

``` js
var age = 17;

if(age >= 18) {
    console.log("Vous êtes majeur");
}
```

### else if / else

Plusieurs conditions peuvent être testées consécutivement: si la première n'est pas vraie (`if`), tester une deuxième, une troisième, etc (`else if`). On peut également fournir des instructions à executer si aucune condition n'est vraie (`else`).

``` js
if(bool) {
    // si: 1 fois
} else if(bool2) {
    // sinon si: 0 à n fois
} else {
    // sinon: 0 ou 1 fois
}
```

### Instruction vide

Une instruction vide (un `;` et rien d'autre) peut être utilisée pour indiquer qu'il n'y a aucune instruction à exécuter.

``` js
if (one)
  doOne();
else if (two)
  doTwo();
else if (three)
  ; // nothing here
else if (four)
  doFour();
else
  launchRocket();
````

``` js
if (condition);  // Ce "if" ne fait rien, il est suivit d'une instruction vide!
   finDuMonde()  // Cette méthode est donc toujours lancée
```

---

## switch

Le `switch` est une syntaxe qui permet de tester successivement la valeur d'**une seule et même variable** (comparaison stricte). Plus lisible qu'un grand nombre de `if/else if`.

``` js
var a = 0;
switch(++a) {
    case 3: console.log(3); break;
    case 2: console.log(2); break;
    case 1: console.log(1); break;
    default: console.log("No match!"); break;
}
// Affiche 1
```

### break

Lorsqu'un switch entre dans un case, il entre dans tous les case jusqu'à rencontrer un `break`.

``` js
var a = 0;
switch(++a) {
    case 1: console.log(1);
    case 2: console.log(2);
    case 3: console.log(3);
}
// Affiche 1 2 3
```

### Expressions

`switch` peut également tester des conditions:

``` js
switch (true) {
  case (tempInCelsius <= 0): 
    state = 'Solid';
    break;
  case (tempInCelsius > 0 && tempInCelsius < 100): 
    state = 'Liquid';
    break;
  default: 
    state = 'Gas';
}
```

---

## Condition ternaire (? :)

Pour retourner une valeur (par exemple pour affecter une variable), il existe une version raccourcie du `if`: la condition ternaire.

<ins>Avec if/else</ins>:

``` js
var max;
if(a >= b) {
    max = a;
} else {
    max = b;
}
```

<ins>Avec condition ternaire</ins>:

``` js
var max = (a >= b ? a : b);
```

---

## Opérateur logique

Une expression situé à droite de `&&` ne sera pas évaluée si l'expression située à gauche est fausse (puisque le résultat sera forcemment faux). 
Une expression situé à droite de `||` ne sera évaluée que si l'expression située à gauche est vrai (puisque que le résultat sera forcemment vrai). 
Cette particularité est souvent utilisée pour executer du code sous condition.

``` js
// Executer monobjet.maMethode() si monobjet est définit
monobjet && monobjet.maMethode();
```

``` js
// Définir monobjet s'il n'est pas déjà définit
var monobjet = monobjet || {key: "val"};
```