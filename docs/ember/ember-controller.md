---
title: Controllers & templates
category: Web, JavaScript, Library, Ember
---

{% raw %}
## Créer un controlleur

* Les templates sont placés dans le répertoire <ins>app/templates</ins>.  
  Chaque template peut avoir un controlleur, qui est un fichier de même nom mais avec l'extension .js et placé dans <ins>app/controllers</ins>.

1. Le controlleur contrôle ce qui est accessible dans le template. Il peut notamment définir des variables.  
   <ins>app/controllers/application.js</ins>:

    ``` js
    import Controller from '@ember/controller';

    /**
     * Main controller of the application.
     *
     * @class ApplicationController
     * @extends Controller
     */
    export default class ApplicationController extends Controller {
      username = "Bob";

      get sayHello() {
        return `Hello ${this.username}`;
      }
    }
    ```

2. Les propriétés du controlleur sont directement accessibles dans le template (ou via `this`)  
   <ins>app/templates/application.hbs</ins>:

    ```
    <p>Hello {{username}}</p>
    <p>Hello {{this.username}}</p>
    <p>{{sayHello}}</p>
    ```

## Écouter des événements


1. Pour exécuter du code lorsqu'un événement est déclenché,  
   créer une méthode avec le décorateur @action dans le controlleur  
   <ins>app/controllers/application.js</ins>:

    ``` js
    import Controller from '@ember/controller';
    import { action } from '@ember/object';

    export default class ApplicationController extends Controller {

      @action
      handleClick(e) {
        console.log(e);
        alert('You clicked!');
      }
    }
    ```

2. Et dans le template, utiliser le helper `on` pour ajouter un listener (avec tout type d'événement du DOM):  
   <ins>app/templates/application.hbs</ins>:

    ```
    <button {{on "click" this.handleClick}}>Click me</button>
    ```

### Méthode avec arguments

1. Pour passer des arguments à une méthode,  
   à la place d'utiliser la méthode directement comme callback,
  on utilise le helper fn:  
  <ins>app/templates/application.hbs</ins>:

    ```
    <button {{on "click" (fn this.handleClick "A")}}>Click A</button>
    <button {{on "click" (fn this.handleClick "B")}}>Click B</button>
    ```

2. Dans tous les cas, le controlleur reçoit toujours l'événement en dernier argument.  
   <ins>app/controllers/application.js</ins>:

    ```
    import Controller from '@ember/controller';
    import { action } from '@ember/object';

    export default class ApplicationController extends Controller {

      @action
      handleClick(value, e) {
        console.log(e);
        alert(`You clicked ${value}!`);
      }
    }
    ```

### Mettre à jour la vue

1. Pour que la vue soit mise à jour quand une variable est modifiée,  
   il faut ajouter le décorateur @tracked sur cette variable    
   <ins>app/controllers/application.js</ins>:

    ``` js
    import Controller from '@ember/controller';
    import { action } from '@ember/object';
    import { tracked } from '@glimmer/tracking';

    export default class ApplicationController extends Controller {
      @tracked count = 0;

      @action
      handleClick() {
        this.count += 1;
      }
    }
    ```

2. Dans le template, on utilise la variable comme d'habitude  
   <ins>app/templates/application.hbs</ins>:

    ```
    <button {{on "click" this.handleClick}}>
      You clicked {{this.count}} times
    </button>
    ```

* Si on veut surveiller des changements de propriétés sur un objet, il faut déclarer une classe avec le décorateur @tracked sur les propriétés à surveiller.

  ``` js
  import Service from '@ember/service';
  import { tracked } from 'glimmer/tracking';

  class Item {
    @tracked count;
    name;
    color;
    image;

    constructor(item) {
      this.count = item.count;
      ...
    }
  }

  export default class ShoppingCartService extends Service {
    @tracked itemList = [];

    addItem(item) {
      const item = this.itemList.find(({name, color}) => {
        return name === item.name && color === item.color;
      });

      if(item) {
        item.count +=1;
      } else {
        this.itemList = [...this.itemList, new Item({...item, count:1})];
      }
    }
  }
  ```

---

## Helpers natifs

* Les helpers sont des fonctions JavaScript qu'on peut appeler depuis un template. Lorsqu'on veut calculer quelque chose en JavaScript depuis un template, on utilise un helper.

* Ember définit nativement un certain nombre d'helpers, dont:

### if

* On utilise `if` pour ajouter du contenu de manière conditionnelle. Il y a deux styles de if:

  * en ligne

    ```
    <div class={{if this.isZoomed "zoomed"}}>

    <div class={{if this.isValid "valid" "invalid"}}>
    ```

  * en bloc

    ```
    {{#if this.message}}
      <h1>{{this.message}}</h1>
    {{/if}}
    ```

    ```
    {{#if this.loading}}
      <h1>Loading</h1>

    {{else if this.error}}
      <h1>Something went wrong</h1>
      <p>{{this.error}}</p>

    {{else}}
      <p>{{this.content}}</p>
    {{/if}}
    ```

### unless

* `unless` est l'inverse de `if`: il ajoute du contenu si une condition est fausse.  
  On peut aussi utiliser un `else if` ou `else unless`.

    ```
    {{#unless this.error}}
      <p>{{this.content}}</p>

    {{else if this.fallback}}
      <p>{{this.fallback}}</p>

    {{else}}
      <h1>Something went wrong</h1>
      <p>{{this.error}}</p>

    {{/unless}}
    ```

### each

* `each` permet de boucler sur une liste

  ```
  {{#each list as |item|}}
    <h1>{{item.name}}</h1>
    <h2>{{item.description}}</h2>
  {{/each}}
  ```

* On peut récupérer l'index en cours

  ```
  {{#each this.queue as |person index|}}
    <li>Hello, {{person.name}}! You're number {{index}} in line</li>
  {{/each}}
  ```

* Et on peut spécifier un bloc else, qui sera affiché si la liste est vide

  ```
  {{#each this.people as |person|}}
    Hello, {{person.name}}!
  {{else}}
    Sorry, nobody is here.
  {{/each}}
  ```

### each-in

* `each-in` permet de boucler sur les propriétés d'un objet

  ```
  {{#each-in this.userInfo as |key value|}}
    <p>{{key}}: {{value}}</p>
  {{/each-in}}
  ```

* On peut également spécifier un bloc else, qui sera affiché si l'objet est vide, null ou undefined.

  ```
  {{#each-in this.userInfo as |key value|}}
    <p>{{key}}: {{value}}</p>
  {{else}}
    <p>We know nothing about you</p>
  {{/each-in}}
  ```

### concat

* `concat` permet de concaténer des valeurs

  ```
  class={{concat "color-" color}}
  ```

### let

* `let` permet de définir une variable dans le template — la déclaration est limitée à un bloc

  ```
  {{#let (concat this.firstName " " this.lastName) as |fullName|}}
    <h1>{{fullName}}</h1>
  {{/let}}
  ```

### hash

* `hash` permet de créer un objet dans le template

  ```
  <HelloWorld @user={{hash firstName="Bruce" lastName="Wayne"}} />
  ```

  Ce qui revient à `<HelloWorld @user={{user}} />` où `user` vaudrait

  ``` js
  user = {
    firstName: "Bruce",
    lastName: "Wayne"
  }
  ```

### array

* `array` permet de créer un tableau dans le template

  ```
  <HelloWorld @people={{array "Bob" "Alice"}} />
  ```

  Ce qui revient à `<HelloWorld @people={{people}} />` où `people` vaudrait

  ```
  people = ["Bob", "Alice"]
  ```

### get

* `get` permet d'accéder à la propriété d'un objet

  ```
  {{get this.product this.attrname}}
  ```

  Ce qui revient à `this.product[this.attrname]` en JavaScript.

### prop

* `prop` permet de définir une propriété JavaScript sur un élément — ne pas utiliser prop définit un attribut HTML, la valeur sera donc castée en chaîne de caractères.

  ```
  <audio {{prop srcObject=this.blob}} />
  ```

### Combiner des helpers

* Le premier helper est placé directement dans les accolades. Les suivants doivent être entourés de parenthèses.

  ```
  {{helper1 ... (helper2 ... (helper3 ...))}}
  ```

  Par exemple:

  ```
  {{on "click" (fn this.handleClick "B")}}
  ```

[Liste complète des helpers](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/)

---

## Helper personnalisé

1. Pour créer un helper personnalisé,  
   définir un helper dans <ins>app/helpers</ins>.

   * Soit en utilisant une fonction  

      ``` js
      import { helper } from '@ember/component/helper';

      export function percent(params, namedArgs={}) {
        ...
      }
      export default helper(percent);
      ```

    * Soit une classe

      ``` js
      import Helper from '@ember/component/helper';

      export default class percent extends Helper {
        compute(params, namedArgs={}) {
          ...
        }
      }
      ```

   Exemple:  
   <ins>app/helpers/percent.js</ins>

    ``` js
    import { helper } from '@ember/component/helper';

    export function percent([value], namedArgs={}) {
      if(typeof value !== 'number') return;

      var suffix    = namedArgs.suffix ?? '%';
      var precision = namedArgs.precision ?? 2;
      var percent   = (value * 100).toFixed(precision);

      return `${percent}${suffix}`;
    }
    export default helper(percent);
    ```

    <ins>app/helpers.permission.js</ins>

    ``` js
    import Helper from '@ember/component/helper';
    import { inject as service } from '@ember/service';
    import permissions from 'dacapo-front/permissions/index';

    /**
     * Check permissions on given object.
     * Usage :
     *
     *     {{if (permission "patient.update" this.model) }}
     *     {{if (permission "studyMedical.create" patient=this.patient) }}
     *
     * @return Boolean
     */
    export default class PermissionHelper extends Helper {
      @service permission;

      compute([abilityString, model], properties = {}) {
        return this.permission.has(abilityString, model, properties);
      }
    }
    ```

2. Appeler le helper dans le template

    ```
    {{percent 0.98946 precision=0}}
    ```

* Il est possible d'invoker un helper à partir du js

  ``` js
  import PermissionHelper from 'dacapo-front/helpers/permission';
  import { invokeHelper } from '@ember/helper';
  import { getValue } from '@glimmer/validator';

  export default class MyComponent extends Component {

    // CHECK PERMISSIONS
    // see https://rfcs.emberjs.com/id/0626-invoke-helper/
    hasCreatePermission = invokeHelper(this, PermissionHelper, () => {
      return {
        positional: ['studyMedical.create', null],
        named: { patient: this.args.patient },
      };
    });

    hasUpdatePermission = invokeHelper(this, PermissionHelper, () => {
      return {
        positional: ['studyMedical.update', this.model],
      };
    });

    @computed('model.id')
    get hasPermission() {
      if (this.model.id) {
        return getValue(this.hasUpdatePermission);
      } else {
        return getValue(this.hasCreatePermission);
      }
    }
  }
  ```

{% endraw %}