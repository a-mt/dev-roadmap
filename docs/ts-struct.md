---
title: Typescript: Les structures
category: Web, JavaScript, Library, Typescript
---

## Tableaux

### Array

* Pour déclarer un tableau, il y a deux syntaxes possibles:

  ``` js
  let list1: number[] = [1,2,3];
  let list2: Array<number> = [1,2,3];
  ```

### Tuple

* Pour déclarer un tableau de taille fixe, où le type de chaque index est connu, on déclare un tuple:

  ``` js
  let person = [string, number] = ['Chris', 22];
  ```

  L'ordre des valeurs doit correspondre à l'ordre des types déclarés. C'est notamment utile si on veut utiliser une dé-structuration de tableau:

  ```
  function getData(): [string, number] {
    return ["Hello World", 200];
  }

  let [msg, status] = getData();
  ```

---

## Objet

### Spécification

* Pour déclarer un objet, on peut spécifier les propriétés de cet objet:

  ``` js
  let person: {firstName: string, lastName: string};
  ```

* Ou, plutôt que de spécifier les propriétés de l'objet à chaque fois, on peut créer une interface et utiliser cette interface pour type:

  ``` js
  interface Person {
    firstName: string;
    lastName : string;
  }

  let person: Person;
  ```

### Propriété optionnelle

* Pour spécifier qu'une propriété est optionnelle, on ajoute un point d'interrogation (?) après le nom de la propriété:

  ``` js
  interface Person {
    firstName: string;
    lastName?: string;
  }
  ```

### Héritage

* Une interface peut hériter d'une autre interface avec `extends`:

  ``` js
  interface Animal {
    name: string
  }
  interface Bear extends Animal {
    honey: boolean
  }

  const bear = getBear()
  bear.name
  bear.honey
  ```

  On peut hériter de plusieurs interfaces.

  ``` js
  interface Colorful {
    color: string;
  }

  interface Circle {
    radius: number;
  }

  interface ColorfulCircle extends Colorful, Circle {}

  const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
  };
  ```

### Readonly

* Les propriétés peuvent être marquées en lecture seule avec `readonly`. Ça ne change pas le comportement du JavaScript au moment de l'execution du code mais affiche une erreur pendant la compilation si on essaie d'assigner une nouvelle valeur.

  ``` js
  interface SomeType {
    readonly prop: string;
  }

  obj.prop = "hello"; // Cannot assign to 'prop' because it is a read-only property.
  ```

* Le contenu de la propriété n'est pas immutable, on ne peut juste pas ré-assigner la propriété.

  ``` js
  interface Home {
    readonly resident: { name: string; age: number };
  }

  obj.resident.age++; // ok
  obj.resident = { name: "Bob", age: 42 }; // Cannot assign to 'resident' because it is a read-only property.
  ```

### Type littéral

* On peut toujours spécifier une valeur littérale quand on spécifie un type.

  ``` js
  interface Todo {
    id: number,
    text: string,
    readonly done: false
  }
  interface CompletedTodo extends Todo {
    readonly done: true
  }
  ```

### Méthode

* Les interfaces peuvent également contenir des méthodes — voir les parties "Fonctions" et "Variable de type fonction" pour plus d'info sur la syntaxe de définition d'une fonction.

  ``` js
  interface Num {
    value: number;
    square(): number;
  }

  const num: Num = {
    value: 3,
    square() {
      return this.value ** 2;
    }
  };
  ```

### Signature d'index

* On peut spécifier une signature d'index pour permettre à l'objet de définir des noms de propriétés à la volée, pourvu que le type soit respecté:

  ``` js
  interface NestedCSS {
    color?: string;
    [selector: string]: string | NestedCSS | undefined;
  }

  const example: NestedCSS = {
    color: 'red',
    '.subclass': {
      color: 'blue'
    }
  }
  ```

  ``` js
  var x: {
    foo: number,
    [x: string]: unknown
  };
  x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
  ```

---

## Enum

* Un enum est juste un moyen de donner des noms à un ensemble de valeurs numériques.

  ``` js
  enum Weekday {
      Monday,
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
  }
  let day: Weekday = Weekday.Monday;
  console.log(day); // 0

  function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
  ```

  Par défaut, les valeurs commençent à 0 mais on peut spécifier un nombre différent.

  ``` js
  enum Color {Red = 5, Green, Blue};

  let c: Color = Color.Green;
  console.log(c); // 6
  ```

* Les enum sont notamment utiles lorsqu'on veut stocker des puissances de 2.

  ``` js
  enum AnimalFlags {
      None           = 0,
      HasClaws       = 1 << 0,
      CanFly         = 1 << 1,
      EatsFish       = 1 << 2,
      Endangered     = 1 << 3
  }

  type Animal = {
    flags: AnimalFlags
  }
  let animal: Animal = { flags: AnimalFlags.None };
  printAnimalAbilities(animal); // nothing

  animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
  printAnimalAbilities(animal); // animal has claws, animal can fly

  animal.flags &= ~AnimalFlags.HasClaws;
  printAnimalAbilities(animal); // animal can fly
  ```

---

## Type

* Un alias de type permet d'assigner un nom personnalisé à un type

  ``` js
  type ID = number | string;

  let id: ID = 1;
  ```

* Un alias de type peut être utilisé pour déclarer un objet, mais il ne peut plus être changé après avoir été déclaré, contrairement à une interface.

  ``` js
  interface Window {
    title: string
  }
  interface Window {
    ts: TypeScriptAPI
  }
  // OK
  ```

  ``` js
  type Window = {
    title: string
  }
  type Window = {
    ts: TypeScriptAPI
  }
  // Error: Duplicate identifier 'Window'.
  ```

### Indexed Access type

* On peut récupérer le type d'une propriété d'un type:

  ``` js
  type Person = { age: number; name: string; alive: boolean };

  type Num = Person["age"];
  //   ^ = number

  type NumStr = Person["age" | "name"];
  //   ^ = string | number

  type NumStrBool = Person[keyof Person];
  //   ^ = string | number | boolean
  ```

### Conditional Type

* Il est possible d'utiliser des conditions pour assigner un type

  ``` js
  interface Animal {
    live(): void;
  }
  interface Dog extends Animal {
    woof(): void;
  }

  type Example = Dog extends Animal ? number : string;
  //   ^ = number
  ```

### Intersection

* Pour associer les propriétés de deux types, on peut utiliser l'opérateur d'intersection: `&`

  ``` js
  type Animal = {
    name: string
  }
  type Bear = Animal & {
    honey: Boolean
  }

  const bear = getBear();
  bear.name;
  bear.honey;
  ```

  ``` js
  interface Colorful {
    color: string;
  }
  interface Circle {
    radius: number;
  }

  type ColorfulCircle = Colorful & Circle;
  ```

### Signature d'index

* Une signature d'index peut être avec utilisée avec `type`:

  ``` js
  type Index = 'a' | 'b' | 'c'
  type FromIndex = { [k in Index]?: number }

  const good: FromIndex = {b:1, c:2}
  ```
