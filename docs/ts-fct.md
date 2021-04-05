---
title: Typescript: Les fonctions
category: Web, JavaScript, Library, Typescript
---

## Fonctions

### Paramètres en entrée

* Typescript permet de spécifier le type des paramètres d'une fonction:

  ``` js
  function add(num1: number, num2: number) {
    return num1 + num2;
  }

  add(5, 10);
  add(5, "10"); // Argument of type '"10"' is not assignable to parameter of type 'number'
  ```

  Si le type d'un paramètre n'est pas spécifié, il est implicitement `any`.

* <ins>Paramètres optionnels</ins>  
  Tout paramètre est présumé obligatoire. Pour spécifier un paramètre optionnel, on ajoute un point d'interrogation (?) après le nom du paramètre. Les paramètres optionnels doivent être placés après les paramètres obligatoires.

  ``` js
  function add(num1: number, num2?: number) {
    //...
  }
  ```

  On peut également spécifier une valeur par défaut. Un paramètre avec une valeur par défaut est un paramètre optionnel mais qui prend une valeur donnée au lieu d'`undefined` quand il est omis.

  ``` js
  function add(num1: number, num2: number = 0) {
    //...
  }
  ```

* <ins>Paramètres indéterminés</ins>  
  On peut définir une fonction prenant un nombre indéterminé d'argument avec la syntaxe `...`:

  ``` js
  function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
  }
  const a = multiply(10, 1, 2, 3, 4);
  ```

* <ins>Paramètres dé-structurés</ins>  
  On définit une fonction qui destructure un objet comme suit:

  ``` js
  function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
  }
  ```

  ``` js
  // Idem
  type ABC = { a: number; b: number; c: number };
  function sum({ a, b, c }: ABC) {
    console.log(a + b + c);
  }
  ```

  On peut aussi assigner des valeurs par défaut si la propriété n'existe pas sur l'objet:

  ``` js
  function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
  //                               ^ = var xPos: number
    console.log("y coordinate at", yPos);
  //                               ^ = var yPos: number
    // ...
  }
  ```

* <ins>Lecture seule</ins>:  
  On peut utiliser le mot-clé `readonly` pour empêcher de modifier une référence (objet ou tableau);

  ``` js
  // Make input todos as readonly array
  // We want it to return a new array
  // instead of modifying the original array

  function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({ ...todo, done: true }))
  }
  ```

### Paramètre en sortie

* Typescript peut déduire le type retourné par la fonction, ou on peut le spécifier explicitement:

  ``` js
  function add(num1: number, num2: number): number {
    //...
  }
  ```

* <ins>void</ins>  
  `void` représente la valeur retournée par une fonction qui ne retourne pas de valeur.

  ``` js
  // The inferred return type is void
  function noop() {
    return;
  }
  ```

* <ins>never</ins>  
  Certaines fonctions retournent une valeur `never`.  
  Le type never désigne une valeur qui n'est jamais observée. Dans une fonction, ça signifie que la fonction lève une exception ou met fin à l'execution du programme.

  ``` js
  function fail(msg: string): never {
    throw new Error(msg);
  }
  ```

---

## Variable de type fonction

### Function

* Le type `Function` décrit tout objet pouvant être executé et qui possède les propriétés `bind`, `call` et `apply`.

  ``` js
  function doSomething(f: Function) {
    f(1, 2, 3);
  }
  ```

  Une fonction de type `Function` retourne une valeur de type `any`.

### Signature de fonction

Pour déclarer la signature d'une variable de type fonction, on a deux possibiltés:

1. <ins>Une expression de type fonction</ins>.  
   La syntaxe est très similaire aux fonctions flèches:

    ``` js
    let fn: (a: string) => void;
    ```

    L'expression ci-dessous signifie "une fonction avec un paramètre obligatoire (nommé a) de type string, qui n'a pas de valeur de retour.

2. <ins>Un type objet</ins>.  
   Même chose que précédemment mais en utilisant la syntaxe de type.

   ``` js
   type MaFonction = {
     (a: string): void;
   };

   let fn: MaFonction;
   ```

   Utiliser un objet permet plus de fonctionnalités qu'une expression de type:

   * On peut spécifier les propriétés que la fonction doit avoir.

     ``` js
     type FctWithDescription = {
       description: string;
       (someArg: number): boolean;
     };
     function doSomething(fn: FctWithDescription) {
       console.log(fn.description + " returned " + fn(6));
     }
     ```

   * On peut spécifier le constructeur de la fonction (pour une fonction invoquée avec l'opérateur `new`):

      ``` js
      type SomeConstructor = {
        new (s: string): SomeObject;
      };
      function fn(ctor: SomeConstructor) {
        return new ctor("hello");
      }
      ```

### À propos de void

* void et undefined sont deux choses différentes: dans une signature de fonction, `void` n'oblige pas les fonctions à ne rien retourner. La valeur retournée est juste ignorée.

  Par exemple, `forEach` attend une fonction qui retourne void. Utiliser `push` (qui retourne une valeur) ne lève pas pourtant d'erreur: on ignore juste sa valeur.

  ``` js
  const src = [1, 2, 3];
  const dst = [0];

  src.forEach((el) => dst.push(el));
  ```

  Par contre, quand on définit une fonction avec un retour `void`, cette fonction ne doit rien retourner.

  ``` js
  function f2(): void {
    // @ts-expect-error
    return true;
  }
  ```

---

## Classes

### Visibilité

* On peut spécifier la visibilité des méthodes et propriétés d'une classe avec `public`, `private` ou `protected`. Si non spécifié, elles sont considérées comme publiques.

  ``` js
  class Employee {
    protected employeeName: string;
  }
  ```

### Initialisation des propriétés

* Par défaut, Typescript considère que les propriétés d'une classe sont obligatoire et doivent être initialisées dans le constructeur.

  ``` js
  class BadGreeter {
    name: string;  // Err: Property 'name' has no initializer and is not definitely assigned in the constructor
  }
  ```

  ``` js
  class GoodGreeter {
    name: string;

    constructor() {
      this.name = "Hello";
    }
  }
  ```

  Si la propriété est initialisée ailleurs que dans le constructeur, utiliser `!`:

  ``` js
  class OKGreeter {
    name!: string;  // Not initialized, but no error
  }
  ```

### Lecture-seule

* Une propriété `readonly` ne peut être assignée que dans le constructeur.

  ``` js
  class Greeter {
    readonly name: string = "wordl";

    constructor(otherName?: string) {
      if(otherName != undefined) {
        this.name = otherName;
      }
    }
    err() {
      this.name = "not ok";  // Err: Cannot assign to 'name' because it is a read-only property.
    }
  }

  const g = new Greeter();
  g.name = "also not ok";  // Err: Cannot assign to 'name' because it is a read-only property.
  ```

### Signature de propriété

* Les classes peuvent déclarer une signature de propriété:

  ``` js
  class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
      return this[s] as boolean;
    }
  }
  ```

### implements

* On peut utiliser `implements` pour spécifier qu'une classe implémente une interface donnée.

  ``` js
  interface Pingable {
    ping(): void;
  }
  class Sonar implements Pingable {
    ping() {
      console.log('Ping');
    }
  }
  class Ball implements Pingable {
    ping() {
      console.log('Pong');
    }
  }
  // Err: Class 'Ball' incorrectly implements 'Pingable'.
  //  Property 'ping' is missing in type 'Ball' but required in type 'Pingable'
  ```

  On peut *déclarer* du code JS à partir de TypeScript, ça ne signifie pas que TypeScript l'implémenter. Par exemple, on peut déclarer un constructeur qui retourne autre chose que l'objet en cours. C'est du code TypeScript valide, pourtant JavaScript retournera une instance de classe.

  ``` js
  interface Crazy {
    new (): {
       hello: number
    };
  }
  class CrazyClass implements Crazy {
    constructor() {
       return { hello: 123 };
    }
  }
  const crazy = new CrazyClass(); // crazy would be {hello:123}
  ```

---

## Type guards

* Typescript est intelligent, il se sert des vérifications de type (comme instanceof ou typeof) et des discriminants (propriétés ne pouvent appartenir qu'à un seul type de données) pour lever des erreurs ou non.

  ![](https://i.imgur.com/GDeWmlr.png)

  ``` js
  if (typeof x === "number") {
    return `The result is ${x + x}`;
  }
  if (arg instanceof Foo) {
    return arg.bar();
  }
  if ("x" in arg) {
    return arg.x;
  }
  ```

* On peut définir des fonctions pour vérifier le type d'une variable. Ces fonctions doivent renvoyer `someArgumentName is SomeType`

  ``` js
  interface Foo {
    foo: number;
  }
  interface Bar {
    bar: number;
  }

  // User Defined Type Guard!
  function isFoo(arg: any): arg is Foo {
    return arg.foo !== undefined;
  }

  // Using a User Defined Type Guard
  function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
      console.log(arg.foo); // OK
      console.log(arg.bar); // Error!
    }
    else {
      console.log(arg.foo); // Error!
      console.log(arg.bar); // OK
    }
  }
  ```
