---
title: Types génériques
category: Web, JavaScript, Library, Typescript
---

{% raw %}

## Génériques

### Type générique

* Un *type générique* est un type définit en fonction d'un autre type (ou plusieurs). Les paramètres de type sont déclarés entre chevrons et sont souvent notés avec une lettre majuscule unique, tel que T — on peut donner le nom qu'on veut.

  Pour utiliser un type générique, il passer un type en paramètre. Ça permet de réutiliser la même logique pour différents types.

  ``` js
  // Type générique
  class SimpleStack<T> {
    data: Array<T> = [];

    push(x: T): void {
      this.data.push(x);
    }
    pop(): T {
      const result = this.data.pop();
      if (result === undefined) {
        throw new Error();
      }
      return result;
    }
    get length() {
      return this.data.length;
    }
  }

  // Utilise SimpleStack avec le type string
  const stringStack = new SimpleStack<string>();
  stringStack.push('first');
  stringStack.push('second');
  console.log(stringStack.length);
  ```

### Fonction générique

* Les fonctions peuvent également prendre des paramètres de type. Ça permet d'exprimer le paramètre en sortie en fonction du paramètre en entrée.

  ``` js
  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let output = identity<string>("myString");
  //       ^ = let output: string
  ```

  On peut également utiliser le type générique dans le corps de la fonction:

  ``` js
  function fillArray<T>(len: number, elem: T) {
    return new Array<T>(len).fill(elem);
  }

  const arr = fillArray(3, '*');
  ```

* Le type en paramètre peut être inféré lors de l'appel — le compilateur définit automatiquement le type utilisé en fonction de l'argument donné:

  ``` js
  let output = identity("myString");
  //       ^ = let output: string
  ```

* Pour écrire une signature de fonction avec un type générique:

  ``` js
  // Avec une expression
  let myIdentity: <Type>(arg: Type) => Type = identity;
  ```

  ``` js
  // Avec un objet
  let myIdentity: { <Type>(arg: Type): Type } = identity;
  ```

### Interface générique

* Une interface peut également prendre un paramètre de type:

  ``` js
  interface Box<Type> {
    contents: Type;
  }
  let boxA: Box<string> = { contents: "hello" };
  ```

* Et on peut définir une méthode générique:

  ``` js
  interface GenericIdentityFn {
    <Type>(arg: Type): Type;
  }

  function identity<Type>(arg: Type): Type {
    return arg;
  }
  let myIdentity: GenericIdentityFn = identity;
  ```

### Classe générique

* Une classe générique est très similaire à une interface générique.

  ``` js
  class Box<Type> {
    contents: Type;
    constructor(value: Type) {
      this.contents = value;
    }
  }

  const b = new Box("hello!");
  //    ^ = const b: Box<string>
  ```

  ``` js
  class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
  }

  let genNum = new GenericNumber<number>();
  genNum.zeroValue = 0;
  genNum.add = function (x, y) {
    return x + y;
  };

  let genStr = new GenericNumber<string>();
  genStr.zeroValue = "";
  genStr.add = function (x, y) {
    return x + y;
  };
  ```

---

## Contraintes sur un type générique

* Au lieu de fonctionner avec tous les types, on peut contraindre une fonction à ne fonctionner qu'avec les types qui répondent à certains critères. Pour ce faire, on peut spécifier un objet, une interface ou une classe qui décrit les contraintes à respecter.

  ``` js
  // Avec un objet
  // N'accepte que les types qui ont une propriété 'length'
  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }
  ```

  ``` js
  // Avec une interface
  // N'accepte que les types qui ont une propriété 'length'
  interface Lengthwise {
    length: number;
  }
  function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    return arg;
  }

  loggingIdentity({ length: 10, value: 3 }); // Ok
  loggingIdentity(3);  // Err: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
  ```

  ``` js
  // Avec une classe
  // N'accepte que les types qui ont une propriété 'numLegs'
  class Animal {
    numLegs: number;
  }
  class Bee extends Animal {}
  class Lion extends Animal {}

  function getNumLegs<A extends Animal>(c: A): number {
    return c.numLegs;
  }
  ```

* Les contraintes peuvent être utilisés dans une expression ternaire:

  ``` js
  type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;
  ```

* Attention: si on utilise le même type générique en entrée et en sortie, la fonction promet de retourner *le même type* en entrée et en sortie, pas juste une valeur qui pourrait correspondre au même type.

  ``` js
  function minimumLength<Type extends { length: number }>(
      obj: Type, minimum: number
  ): Type {

    if (obj.length >= minimum) {
      return obj;
    } else {
      return { length: minimum };
      // Err: Type '{ length: number; }' is not assignable to type 'Type'.
      //  '{ length: number; }' is assignable to the constraint of type 'Type',
      //  but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
    }
  }
  ```

* Un paramètre de type peut être exprimé en fonction d'un autre paramètre de type:

  ``` js
  // Type: accepte n'importe quel type
  // Key : accepte toute propriété existant sur le type précédent (Type)
  function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  getProperty(x, "a");
  getProperty(x, "m");  // Err: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
  ```

  ``` js
  // Type: accepte n'importe quel type
  // Func: accepte toute fonction prenant en paramètre le type précédent (Type) et retournant un booléen
  function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
  ): Type[] {
    return arr.filter(func);
  }

  // Idem
  function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
  }

  ```

* Si on veut prendre en paramètre non pas une variable d'un type donné (ex `"hello"`), mais un type (ex `string`), il est nécessaire de faire référence à la classe par son constructeur:

  ``` js
  // Avec un type objet
  function create<T>(type: { new (): T }): T {
    return new type();
  }
  let lion = createInstance(Lion);
  ```

  ``` js
  // Avec une expression de type
  function create<T>(type: new () => T): T {
    return new type();
  }
  ```

  Par exemple, si on veut définir une mixin qui ajoute la propriété `timestamp` au type pris en paramètre:

  ``` js
  // Needed for all mixins
  type Constructor<T = {}> = new (...args: any[]) => T;

  // A mixin that adds a timestamp property
  function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      timestamp = Date.now();
    };
  }

  // Adding timestamp on User
  class User { name = ''; }
  const TsUser = Timestamped(User);

  let user = new TsUser();
  ```

---

## Types mappés

* Un type est dit *mappé* s'il prend en paramètre un type et transforme chacune de ses propriétés.

  ``` js
  // Transforme le type de toutes les propriétés en 'string'
  type StringMap<T> = {
    [P in keyof T]: string
  }

  function showType(arg: StringMap<{ id: number; name: string }>) {
    console.log(arg)
  }

  showType({ id: 1, name: "Test" })
  // Error: Type 'number' is not assignable to type 'string'.

  showType({ id: "testId", name: "This is a Test" })
  // Output: {id: "testId", name: "This is a Test"}
  ```

---

## Types utilitaires

Typescript définit nativement des types mappés utiles pour simplifier la création de type:

### Readonly&lt;T>

Rend toutes les propriétés de T readonly.  
Les exemples suivants sont tous équivalents:

``` js
type TodoReadonly = {
  readonly id: number
  readonly text: string
  readonly done: boolean
}
```

``` js
type TodoReadonly = Readonly<{
  id: number
  text: string
  done: boolean
}>
```

``` js
type Todo = {
  id: number
  text: string
  done: boolean
}>
type TodoReadonly = Readonly<Todo>
```

### Partial&lt;T>

Rend toutes les propriétés de T optionnelles

``` js
type TodoOpt = Partial<{
  id: number
  text: string
  done: boolean
}>
```

### Required&lt;T>

Rend toutes les propriétés de T obligatoires

``` js
type Todo = Required<TodoOpt>
```

### Pick&lt;T, K>

Définit un type ayant pour toute propriété la propriété K de T

``` js
interface Person {
  id: number
  firstName: string
  lastName: string,
  address: string
}

function showType(args: Pick<Person, "firstName" | "lastName">) {
  console.log(args)
}
showType({ firstName: "John", lastName: "Doe" })
// Output: {firstName: "John"}
```

### Omit&lt;T, K>

Définit un type ayant toutes les propiétés de T sauf K.

``` js
interface Person {
  id: number
  firstName: string
  lastName: string,
  address: string
}

function showType(args: Omit<Person, "address">) {
  console.log(args)
}
```

### Extract&lt;U, V>

Prend les propriétés communes aux deux ensembles

``` js
interface FirstType {
  id: number
  firstName: string
  lastName: string
}

interface SecondType {
  id: number
  address: string
  city: string
}

type ExtractType = Extract<keyof FirstType, keyof SecondType>
// Output: "id"
```

### Exclude&lt;U, V>

Exclut les propriétés U présentes dans V

``` js
interface FirstType {
  id: number
  firstName: string
  lastName: string
}

interface SecondType {
  id: number
  address: string
  city: string
}

type ExcludeType = Exclude<keyof FirstType, keyof SecondType>
// Output; "firstName" | "lastName"
```

### Record&lt;K,T>

Crée un tableau associatif ayant le type K pour clé et le type T pour valeur.

``` js
interface EmployeeType {
  id: number
  fullname: string
  role: string
}

let employees: Record<number, EmployeeType> = {
  0: { id: 1, fullname: "John Doe", role: "Designer" },
  1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
  2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
}
```

### NonNullable&lt;T>

Enlève `null` et `undefined` du type T

``` js
type NonNullableType = string | number | null | undefined

function showType(args: NonNullable<NonNullableType>) {
  console.log(args)
}
```

{% endraw %}