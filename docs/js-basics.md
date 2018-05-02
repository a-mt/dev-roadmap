---
title: Bases de JavaScript (ES 5)
category: Web, JavaScript
---

## Structure

Comme dans la plupart des langages de programmation, le code est groupé en instructions. Ces instructions indiquent au navigateur ce qu'il doit faire: changer la couleur du texte, calculer l'âge de quelqu'un, déplacer une image à gauche, faire disparaître ou afficher un menu, afficher un message d'alerte, etc. Les instructions sont executées l'une après l'autre, de gauche à droite, de haut en bas.

De la même manière qu'on termine une phrase par point, on termine une instructions JavaScript par un point-virgule `;`.  
JavaScript est un langage qui "pardonne", le navigateur essaie de deviner ce qu'il doit faire, si bien que dans la plupart des cas, une instruction JavaScript fonctionnera même si le point-virgule est omis. C'est une bonne pratique d'écrire du code valide et non juste du code "qui marche", et donc toujours les mettre.

JavaScript est sensible à la casse mais insensible aux espaces et retours chariots.  
Pour rendre la lecture plus facile, on met généralement une seule instruction par ligne.

``` js
alert("Hello World");
alert("Another message");
```

La plupart du temps, dans un navigateur, le code JavaScript ne doit s'executer qu'en réponse à un événément: lorsque l'utilisateur clique quelque part, lorsqu'il soumet un formulaire ou même lorsque la page a fini de charger par exemple. On regroupe ainsi le JavaScript dans des fonctions qui ne sont appelées que lorsqu'un événement se produit.

``` js
windows.onload = function() {
  alert("La page a fini de charger");
};
```

``` js
document.getElementById("mybtn").addEventListener("click", function(){
  alert("Clic sur #mybtn");
});
```

---

## Commentaires

Deux types de commentaires sont possible en JavaScript:

* le commentaire jusqu'à la fin de la ligne

  ``` js
  // Le commentaire
  ```

* le commentaire délimité (peut être multiligne)

  ``` js
  /* Le commentaire */
  ```

---

## Variables

Les variables permettent de stocker des valeurs: adresse email, date de naissance, score dans un jeu, etc. On déclare une variable, on lui affecte une valeur, on peut éventuellement modifier la valeur (effectuer des calculs par exemple), puis utiliser la valeur de cette variable (l'afficher par exemple).

### Déclaration / affectation

En JS, on déclare une variable avec le mot-clé `var` et on affecte avec le signe égal `=`.  
On peut déclarer et assigner une variable en même temps - ou séparemment.

``` js
var mavariable;
mavariable = "mavariable";
```

``` js
var mavariable = "mavariable";
```

Plusieurs variables peuvent être déclarées en même temps avec `,`

``` js
var year, month;
```

``` js
var year = 2011, month = 12;
```

Les variables peuvent contenir tout type de données,
des scalaires, données "plates" (chaînes de caractère, nombres, booléens),
tout comme des données complexes (tableaux, objets, fonctions).

Techniquement, le mot-clé `var` n'est pas requis. En écrivant `mavariable = "mavaleur"`, JavaScript ira chercher si une variable nommée `mavariable` existe et si elle n'existe pas, la crée. Cependant, dans certaines situations, omettre `var` peut conduire à un comportement inattendu, donc mieux veut toujours l'utiliser.

### Nommage

Le nom de la variable doit être écrit en un seul mot (aucun espace n'est autorisé), composé de lettres, chiffres, underscore et/ou du signe dollar. Le nom d'une variable ne peut pas commencer par un chiffre: `99problems` n'est pas un nom de variable valide, `problems99` oui.

---

## Type de données

JavaScript est un langage faiblement typé, il n'est pas nécessaire de déclarer le type de donnée que contient une variable. Le type de donnée est dynamique, il sera automatiquement déterminé en fonction de la valeur.

En EcmaScript5, il existe 5 types de données primitifs:
- String
- Number
- Boolean
- null
- undefined

Et un type complexe:
- Object
  * Array
  * Function
  * Date
  * RegExp

### typeof

Le mot-clé `typeof` permet de vérifier le type de donnée d'une variable.

``` js
var age = 18;
console.log(typeof age); // number
```

### cast et coercion

On appelle *caster* le fait de changer le type de données d'une variable de manière explicite. Il existe différentes fonctions et différentes méthodes de caster des valeurs. Par exemple :

``` js
console.log(parseInt("6"));    // 6   - conversion en nombre entier
console.log(parseFloat("6.5"); // 6.5 - conversion en nombre à virgule

console.log(toStr(6));         // "6" - conversion en chaîne de caractère
console.log(""+6);             // "6" - conversion en chaîne de caractère

console.log(!!0);              // false - conversion en booléen
console.log("1" == true);      // true - conversion en booléen
```

On applle une *coercion* le fait de changer le type de données d'une variable de manière implicite.

``` js
console.log("42" - "9"); // 33
console.log("2" - "3");  // 6

console.log("" + 1 + 0); // "10"
console.log("" - 1 + 0); // -1
```

### string

Le type de données `string` est utilisé pour stocker des données textuelles. C'est une suite de caractères sur 16 bits (unicode).  
Les chaîne de caractère JavaScript sont immuables, c'est à dire qu'on ne peut pas modifier les caractères d'une chaîne de caractère, il est nécessaire d'en créer une nouvelle.

Exemple: `"December"`, `'December'`

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

### number

En JavaScript, tous les nombres sont stockés come dans flottants 64bits à virgule flottante. Il est donc inutile de se soucier de savoir si c'est un entier, un petit entier, un gros entier, un nombre décimal, etc.

Exemple: `12`, `3.2`, `.2`

La majorité des navigateurs supportent également l'écriture octale, héxadécimale, binaire et scientifique, bien que cela ne fasse pas partie de la syntaxe officielle.

``` js
console.log(010);  // 8
console.log(0o10); // 8
console.log(0b10); // 2
console.log(0x10); // 16
console.log(1e10); // 10000000000
```

Le type nombre possède trois valeur symboliques: `+Infinity`, `-Infinity` et `NaN` (Not a Number).

### boolean

Une variable booléenne est une valeur qui ne peut avoir que deux valeurs: vrai ou faux. Un booléen est notamment le type de donnée retourné par une comparaison, il permet de tester des conditions.

Exemple: `true`, `false`

### null

Une variable de type null ne peut avoir qu'une seule valeur: `null`. La valeur `null` est utilisée pour indiquer l'absence de donnée - une donnée qui n'est pas renseignée ou qui n'est pas utilisée.

Exemple: `null`

### undefined

Une variable déclarée mais non assignée a un type de donnée particulier, le type `undefined`. A ne pas confondre avec null, laquelle est une valeur belle et bien définie.

### object

Les objets peuvent être considérés comme des collections de clé/valeur.  

Exemple: `{}`, `{key1: "value"}`, `{key1: "value", key2: function(){ }}`

Il existe des sous-types de `object`: les tableaux, les fonctions, les regexp, les dates...

---

## Opérateurs

### Opérateurs de comparaison

    >               plus grand que
    >=              plus grand ou égal à
    <               inférieur à
    <=              inférieur ou égal à

    ==              égal
    ===             strictement égal
    !=              non égal
    !==             strictement non égal

Un test non strict vérifie si les valeurs sont équivalentes, `5` (nombre) est équivalent à `"5"` (caractère).  
Un test strict vérifie qu'il s'agit exactement de la même valeur.

`a = b`  : assigne la valeur de b à a  
`a == b` : vérifie si a est égal à b  
`a === b`: vérifie si a est strictement égal à b ("5" et 5 ne sont pas strictement égaux)

[Utiliser les différents tests d'égalité](https://developer.mozilla.org/fr/docs/Web/JavaScript/Les_diff%C3%A9rents_tests_d_%C3%A9galit%C3%A9#Un_mod%C3%A8le_pour_mieux_comprendre)

#### NaN

Lorsqu'on essaie de caster une variable qui ne contient pas des caractères numériques en nombre, on obtient une valeur symbolique: `NaN` (Not a Number)

``` js
console.log(parseInt("d")); // NaN
```

Pour tester si une valeur vaut NaN, on ne peut pas utiliser le égal mais `isNaN()`

``` js
console.log(parseInt("d") == NaN); // false
console.log(isNaN(parseInt("d"))); // true
```

#### Valeurs fausses

En JavaScript, les valeurs équivalentes à faux sont:
* `false`
* `0`
* `""` (chaîne vide)
* `NaN`
* `undefined`
* `null`

Un tableau vide `[]` est considéré vrai, `[].length` (0) est considéré faux.

---

### Opérateurs logique

    !               non
    &&              et
    ||              ou

Une opération logique permet de combiner plusieurs expressions:

``` js
var c = a && b;
// c est vrai si a et b sont vrais
```

``` js
var c = !(a && b);
// c est vrai si ni a ni b n'est vrai
```

``` js
var show = (age >= 18) || (!controleParental);
// show est vrai si une des deux expressions est vraie (ou les deux)
```

Une expression situé à droite de `&&` ne sera pas évaluée si l'expression située à gauche est fausse (puisque le résultat sera forcemment faux). 
Une expression situé à droite de `||` ne sera évaluée que si l'expression située à gauche est vrai (puisque que le résultat sera forcemment vrai). 
Cette particularité est souvent utilisée pour executer du code sous condition.

``` js
// Executer monobjet.maMethode() si monobjet est définit
monobjet && monobjet.maMethode();
```

``` js
// Définir monobjet s'il n'est pas définit
var monobjet = monobjet || {key: "val"};
```

### Opérateurs arithmétique

    +               addition
    -               soustraction
    *               multiplication
    /               division
    %               modulus (résultat d'une division entière: 31 % 2 = 1)

Comme en mathématiques les opérateurs ont une priorité, et on peut changer les priorités avec des parenthèses

``` js
mavariable  = 5 + 5 * 10;    // 5 + 50 = 55
mavariable  = (5 + 5) * 10;  // 10 * 10 = 100
```

Un float n'est pas précis : l'ordinateur est obligé d'arrondir la valeur pour avoir une représentation binaire.
Des problèmes d'arrondis peuvent apparaître après une opération mathématique sur des nombres non entiers. Pour éviter ça, on peut soit utiliser des entiers, soit arrondir le résultat obtenu.

``` js
var x = 0.1;
var y = 0.2;

console.log(x + y);                  // 0.30000000000000004
console.log((x * 10 + y * 10) / 10); // 0.3
console.log((x + y).toPrecision(1)); // "0.3"
```

### Opérations sur les bits

    &               et
    |               ou
    ^               ou exclusif (xor)
    ~               non
    <<              décalage à gauche
    >>              décalage à droite

[Cf opérations sur les bits](bitwise-operations.md)

### Assignation

    =               assignation
    +=              opération couplée à une assignation
                    Possible avec tous les opérateurs arithmétiques et sur les bits (-=, &=, ...)

``` js
mavariable  = 2;    // Affecte la valeur 2 à la variable
mavariable += 2;    // Ajoute 2 à la valeur de la variable
```

Incrémenter consiste à ajouter 1 à la valeur de la variable.  
Décrémenter consiste à soustraire 1 à la valeur de la variable.  
L'incrémentation et la décrémentation étant régulièrement utilisées, il existe des raccourcis pour le faire:

    mavariable++    retourne la valeur de mavariable puis l’incrémente
    ++mavariable    incrémente mavariable puis retourne sa valeur

    mavariable--    retourne la valeur de mavariable puis la décrémente
    --mavariable    décrémente mavariable puis retourne sa valeur

### Concaténation

JavaScript traite différement les chaînes de caractères des nombres, et les nombres différement des booléens. Si on utilise l'opérateur `+` sur des chaînes de caractère, on concatène ces valeurs (on les met bout à bout).

    +               concaténation

``` js
var a = "Hello",
    b = "World",
    test = a + " " + b;

console.log(test);
```

Si on utilise l'opérateur `+` entre un nombre et une chaîne de caractère, l'opération effectuée sera une concaténation.

``` js
foo = 5;
bar = 5;
console.log(foo + bar); // 10

foo = "5";
bar = 5;
console.log(foo + bar); // 55

foo = 5;
bar = "5";
console.log(foo + bar); // 55
```

---

## Conditions

### if

Le code à l'intérieur d'une condition `if` n'est executé que si le booléen testé est vrai. Sinon, le code à l'intérieur des accolades est ignoré et l'execution poursuit sur la ligne qui suit la fermeture du bloc.

``` js
var b = true;
if(b) {
    // Code a executer si le booléen est vrai
}
```

Tout l'intérêt des conditions est de pouvoir tester des expressions retournant un booléen, comme une comparaison.

``` js
var age = 17;

if(age >= 18) {
    console.log("Vous êtes majeur");
} else {
    console.log("Vous êtes mineur");
}
```

Plusieurs conditions peuvent être testées consécutivement: si la première n'est pas vraie (`if`), tester une deuxième, une troisième, etc (`else if`). On peut également fournir des instructions à executer si aucune condition n'est vraie (`else`).

``` js
if(bool) {
    // si: 1 fois
} else if(bool) {
    // sinon si: 0 à n fois
} else {
    // sinon: 0 ou 1 fois
}
```

Les accolades ne sont indispensable que si une seule ligne de code doit être executée par le `if`. C'est cependant une bonne pratique de toujours les mettre, cela évite de commettre des erreurs en reprenant le code plus tard.

``` js
if(b) console.log("OK");
```

### switch

Le `switch` est une syntaxe qui permet de tester successivement la valeur d'une seule et même variable (comparaison stricte). Plus lisible qu'un grand nombre de `if/else if`.  
Lorsqu'un switch entre dans un case, il entre dans tous les case jusqu'à rencontrer un `break`.

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

``` js
var a = 0;
switch(++a) {
    case 1: console.log(1);
    case 2: console.log(2);
    case 3: console.log(3);
}
// Affiche 1 2 3
```

### ? : (condition ternaire)

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

## Boucles

Les boucles, ou itérations, permettent d'executer du code plusieurs fois. Cela peut permettre par exemple de récupérer tous les paragraphes de la page et de récupérer leur contenu.

### for

La boucle `for` boucle entre deux bornes et incrémente l'index à chaque itération.

``` js
for(var i=1; i<10; i++) {
  console.log(i); // from 1 to 9
}
```

Un for comporte 3 composants séparés par des points-virgules: l'initialisation, la condition, l'incrementation. Chacun de ces composants peut contenir 0 à n opérations:

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

### for... in

Une variante du for est le `for... in`. Il permet de boucler sur les propriétés d'un objet.

``` js
var someObject = {key1: "val1", key2: "val2"};

for(k in someObject) {
  console.log(k, " - ", someObject[k]); // key1 - val1 key2 - val2
}
```

### break

Le mot-clé `break` permet de rompre une boucle avant d'atteindre la condition de sortie.


``` js
for(var i=1; i<10; i++) {
  if(i == 5) {
    break;
  }
  console.log(i); // from 1 to 4
}
```

### continue

Le mot-clé `continue` permet de poursuivre à l'itération suivante sans executer le reste du bloc.

``` js
for(var i=1; i<10; i++) {
  if(i == 5) {
    continue;
  }
  console.log(i); // from 1 to 4 and 6 to 9
}
```

### while

La boucle `while` permet de boucler tant qu'une condition est vraie.

``` js
var a = 0;

while(++a < 10) {
    console.log(a); // from 1 to 9
}
```

### do... while

Une variante du `while` est le `do... while`. La seule différence est que le while se situe à la fin du bloc - le point-virgule est nécessaire dans ce cas. Un `do... while` est executé au moins une fois, même si la condition n'est jamais vraie.

``` js
var a = 100;
do {
    console.log(a);   // Will happen at least once
    a++;
} while(a < 10);
```

Le problème principal avec n'importe quelle boucle n'est pas de boucler, mais de s'arrêter. Si la condition est toujours vraie, on crée un boucle infinie qui bloque le processus, si l'on oublie d'incrémenter par exemple.
