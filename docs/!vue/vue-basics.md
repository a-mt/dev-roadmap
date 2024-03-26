---
title: Fondamentaux
category: Web, JavaScript, Library, Vue
---

{% raw %}
## Définir des données

* Chaque composant peut définir ses propres données, qui doivent être retournées par la fonction `data`. Ces données sont directement disponibles dans le bloc template, qu'on peut interpoler par des accolades.

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      username: 'Bob'
    })
  }
  </script>

  <template>
    <h2>Hello {{ username }}</h2>
  </template>
  ```

* Les accolades peuvent contenir n'importe quelle expression JavaScript.

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      count: 0,
    })
  }
  </script>

  <template>
    <h2>There {{ count==1 ? 'is 1 item' : `are ${count} items` }}</h2>
  </template>
  ```

---

## Définir des méthodes

* Un composant peut également définir des méthodes, retournées par la propriété `methods`.  
  Une méthode peut accéder aux données du composant via `this`.

  ``` html
  <script>
  export default {
    name: 'App',
    data() {
      return {
        name: "Bob"
      }
    },
    methods: {
      sayHello() {
        return 'Hello ' + this.name
      }
    }
  };
  </script>

  <template>
    <h2>{{ sayHello() }}</h2>
  </template>
  ```

---

## Définir des données calculées

* Les données calculées sont des données dont la valeur dépend d'autres données. Les données calculées sont mises en cache jusqu'à ce que leurs dépendances changent.

  Si une même valeur doit être calculée à différents endroits du template (ex coût total, état du stock, etc), alors utiliser une donnée calculée est plus pertinent qu'une méthode qui la recalcule à chaque fois. Les données calculées sont automatiquement re-calculées si leurs dépendances changent.

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      items: [
        { id: 1, title: 'TV', price: 100 },
        { id: 2, title: 'Phone', price: 200 },
        { id: 3, title: 'Laptop', price: 300 }
      ]
    }),
    computed: {
      total() {
        return this.items.reduce((sum, x) => sum += x.price, 0);
      }
    }
  }
  </script>

  <template>
    <h2>{{ total }}</h2>
  </template>
  ```

* On peut également définir un setter pour une donnée calculée: si on modifie manuellement la valeur d'une donnée calculée, alors le setter est appelé. Pour pouvoir définir un setter, au lieu d'une fonction, on spécifie un objet contenant les méthodes `get` et `set`:

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      firstName: 'Bruce',
      lastName : 'Wayne'
    }),
    computed: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`
        },
        set(value) {
          const names = value.split(' ');
          this.firstName = names[0];
          this.lastName  = names[1];
        }
      }
    },
    methods: {
      changeFullName() {
        this.fullName = 'Clark Kent';
      }
    }
  }
  </script>

  <template>
    <h2>{{ fullName }}</h2>
    <button @click="changeFullName">Change Fullname</button>
  </template>
  ```

---

## Définir des watchers

* Un watcher permet de surveiller la valeur d'une donnée (y compris une donnée calculée) et d'exécuter du code en cas de changement. Ce peut être utile pour appeler une API en cas de changement, sauvegarder les données dans le localStorage, afficher un message, etc.

  <ins>Exemple</ins>:  
  Afficher une alerte si l'utilisateur augmente le son à 16.

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      volume: 0
    }),
    watch: {
      volume(newValue, oldValue){
        if(newValue == 16 && newValue > oldValue) {
          alert('Listening to a high volume for a long time may damage your hearing');
        }
      }
    }
  }
  </script>

  <template>
    <h2>Volume: {{ volume }}</h2>
    <div>
      <button @click="volume += 2">Increment</button>
      <button @click="volume -= 2">Decrement</button>
    </div>
  </template>
  ```

* Par défaut, le watcher n'est appelé qu'une fois la page chargée, lorsque la variable change. Pour déclencher le watcher au chargement de la page, au lieu d'une fonction, on spécifie un objet contenant la méthode `handler` et l'option `immediate: true`

  ```
  watch: {
    volume: {
      handler(newValue, oldValue) {
        //...
      },
      immediate: true
    }
  }
  ```

* Le watcher ne vérifie pas les changements des propriétés imbriquées: si on ajoute un élément à un tableau ou qu'on change la valeur d'une propriété dans un objet, le watcher ne sera pas déclenché. Pour que le watcher surveille les propriétés imbriquées, il faut spécifier l'option `deep: true`

  ```
  watch: {
    volume: {
      handler(newValue) {
        //...
      },
      deep: true
    }
  }
  ```

---

## Utiliser des directives

* Les tags du bloc &lt;template> peuvent utiliser des *directives*. Une directive est un attribut spécial: il donne des instructions à Vue — comme n'ajouter le tag que si une condition est remplie, boucler sur une liste, etc. Toute directive commence par `v-` et prend pour valeur une expression JavaScript.

### Directive v-text

* La directive `v-text` indique à Vue de remplacer le contenu texte du tag par la valeur de l'attribut. Cette directive n'est pas très utile, on préfère généralement utiliser l'interpolation des données avec les accolades.

  ``` html
  <h2 v-text="'There ' + (count==1 ? 'is 1 item': `are ${count} items`)" />
  ```

### Directive v-html

* La directive `v-html` permet de remplacer le contenu HTML du tag — là où v-text et les accolades échappent le HTML.

  ``` html
  <script>
  export default {
    name: 'App',
    data: () => ({
      msg: '<b>Hello World</b>'
    })
  }
  </script>

  <template>
    <div v-html="msg" />
  </template>
  ```

### Directive v-bind

* Quand on définit un attribut qui n'est pas une directive, celui-ci est ajouté statiquement sur l'élément DOM. En revanche cette approche ne peut pas évaluer d'expression JavaScript, c'est une simple chaîne de caractères.

  ``` html
  <h2 class="underline">Heading</h2>
  ```

* La directive `v-bind:attrname` permet de définir la valeur d'un attribut HTML en évaluant une expression JavaScript.

  ``` html
  <h2 v-bind:class="myClass">Heading</h2>
  ```

#### v-bind: Valeur booléenne

* Si la valeur est un booléen, alors le comportement de v-bind est un peu différent: le booléen spécifie si l'attribut doit être ajouté ou non.

  ``` html
  <input type="checkbox" v-bind:checked="isChecked" />
  ```

  Si on veut ajouter une valeur conditionnellement (et toujours ajouter l'attribut), alors il faut utiliser une expression ternaire.

  ``` html
  <h2 v-bind:class="isPromoted ? 'promoted' : ''">Heading</h2>
  ```

#### v-bind: Plusieurs valeurs

* On peut utiliser un tableau pour définir plusieurs valeurs.

  ``` html
  <h2 v-bind:class="[myClass, isPromoted && 'promoted']">Heading</h2>
  ```

  Une autre alternative est d'utiliser un objet, où la clé est la valeur de l'attribut et la valeur est un booléen spécifiant si cette valeur doit être ajoutée ou non.

  ```
  <h2 v-bind:class="{[myClass]: true, promoted: isPromoted}">Status</h2>
  ```

#### v-bind: Attribut style

* Dans le cas de l'attribut style, on définit un objet où la clé est la propriété (qui peut être soit une propriété JS 'fontSize' ou CSS 'font-size') et la valeur est la valeur de cette propriété.

  ``` html
  <h2 v-bind:style="{
      color      : highlightColor,
      'font-size': headerSize + 'px',
      padding    : '20px'
  }">Style</h2>
  ```

  ``` html
  <h2 v-bind:style="headerStyle">Style</h2>
  ```

  On peut spécifier plusieurs objets avec un tableau. En cas de conflit, l'objet le plus à droite écrase les propriétés des objets qui le précèdent.

  ```
  <h2 v-bind:style="[headerStyle, successStyle]">Style</h2>
  ```

#### v-bind: Shorthand

* Parce que la directive `v-bind:attrname` est très souvent utilisée, il existe un raccourci: `:attrname`. C'est généralement cette syntaxe qui est favorisée.

  ``` html
  <h2 :class="myClass">Heading</h2>
  ```

### Directive v-if

* La directive `v-if` permet d'ajouter un élément conditionnellement. Cet élément peut être suivit d'éléments utilisant `v-else-if` et `v-else`.

  ``` html
  <h2 v-if="num === 0">The number is zero</h2>
  <h2 v-else-if="num < 0">The number is negative</h2>
  <h2 v-else-if="num > 0">The number is positive</h2>
  <h2 v-else>Not a number</h2>
  ```

* Si on veut faire porter la condition sur plusieurs éléments, alors on encapsule les éléments dans un tag `<template>`, qui sert de container invisible.

  ``` html
  <template v-if="display">
    <h1>Hello World</h1>
    <p>Lorem ipsum dolor sit amet.</p>
  </template>
  ```

### Directive v-show

* La directive `v-show` est similaire à la directive `v-if` à une distinction près: si la condition est fausse alors l'élément est caché avec la propriété CSS `display: none`, là où `v-if` retire l'élément du DOM.

    ```
  <h2 v-show="showElement">Lorem ipsum dolor sit amet</h2>
  ```

### Directive v-for

* La directive `v-for` permet de boucler sur une liste.  
  Optionnellement, on peut récupérer l'index en cours (à partir de 0).

  ``` html
  <h2 v-for="name in names" :key="name">{{ name }}</h2>
  ```
  ``` html
  <h2 v-for="(name, index) in names" :key="name">{{ index }}: {{ name }}</h2>
  ```

* On peut également boucler sur les valeurs d'un objet

  ``` html
  <h2 v-for="value in userInfo" :key="value">{{ value }}</h2>
  ```

  ``` html
  <h2 v-for="(value, key, index) in userInfo" :key="value">{{ key }}: {{ value }}</h2>
  ```

* Et on peut accéder aux propriétés imbriquées avec le point:

  ``` html
  <div v-for="actor in actors" :key="actor.name">
    <h2>{{ actor.name }}</h2>
    <h3 v-for="movie in actor.movies" :key="movie">{{ movie }}</h3>
  </div>
  ```

#### v-for: Attribut key

* `key` est un attribut spécial qui permet à Vue d'identifier les noeuds lors de la comparaison entre l'ancien état et le nouvel — identifier les noeuds qui ont été ajoutés, supprimés, déplacés ou modifiés. Ça permet une gestion efficace des opérations DOM.

  La valeur de `key` doit être une valeur unique et immutable, typiquement un ID. Ne pas spécifier la clé n'est approprié que si la liste est immutable.

#### v-for: avec v-if

* Si on veut combiner un `v-for` avec un `v-if`, on peut utiliser un tag template — mais la solution recommandée est d'utiliser une propriété calculée.

  ```
  <ul>
    <template v-for="user in users" :key="user.id">
      <li v-if="user.status === 'online'">{{ user.name }}</li>
    </template>
  </ul>
  ```

  ```
  <ul>
    <li v-for="user in onlineUsers" :key="user.id">{{ user.name }}</li>
  </ul>

  ...
    computed: {
      onlineUsers() {
        return this.users.filter(user => user.status == 'online')
      }
    }
  ```

### Directive v-on

* La directive `v-on:eventname` permet de déclencher une opération quand un événement est déclenché.

  ``` html
  <script>
  export default {
    name: 'App',
    data() {
      return {
        num: 0
      }
    }
  };
  </script>

  <template>
    <button v-on:click="num += 1">Clicked {{ num }} times</button>
  </template>
  ```

* On utilise typiquement des méthodes pour gérer les événements:

  ``` html
  <script>
  export default {
    name: 'App',
    data() {
      return {
        num: 0
      }
    },
    methods: {
      increment(step=1): { this.num += step; },
      decrement(step=1): { this.num -= step; }
    }
  };
  </script>

  <template>
    <h2>{{ count }}</h2>
    <button v-on:click="increment(5)">Increment 5</button>
    <button v-on:click="decrement(5)">Decrement 5</button>
  </template>
  ```

#### v-on: Shorthand

* Il existe un raccourci pour `v-on:eventname`: `@eventname`

  ``` html
  <button @click="num += 1">Clicked {{ num }} times</button>
  ```

#### v-on: Objet event

* On peut récupérer l'événément déclenché avec la variable spéciale `$event`:

  ``` html
  <button @click="increment(1, $event)">Increment</button>
  ```

  Si on passe la fonction en callback au lieu de l'appeler manuellement, alors Vue passe automatiquement l'événement en paramètre:

  ``` html
  <button @click="increment">Increment</button>
  ```

#### v-on: Plusieurs callback

* Pour déclencher plusieurs méthodes lorsqu'un événement est déclenché, on spécifie une liste de méthodes séparées par des virgules:

  ``` html
  <button @click="log($event), increment(1)">Increment</button>
  ```

### Directive v-model

* La directive `v-model` permet de synchroniser automatiquement la valeur d'un élément du DOM (comme la valeur d'un input texte) avec les données du composant. Vue peut gérer toutes sortes d'éléments: input texte, textarea,  select, checkbox, etc.

  ``` html
  <template>
    <div style="white-space: pre">{{ JSON.stringify(formValues, null, 2) }}</div>

    <form @submit="submitForm">

      <!-- INPUT name (name: '') -->
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="formValues.name" />
      </div>

      <!-- TEXTAREA summary (summary: '') -->
      <div>
        <label for="summary">Summary</label>
        <textarea id="summary" v-model="formValues.summary" />
      </div>

      <!-- SELECT country (country: '') -->
      <div>
        <label for="country">Country</label>
        <select id="country" v-model="formValues.country">
          <option value="">Select a country</option>
          <option value="india">India</option>
          <option value="vietnam">Vietnam</option>
          <option value="singapore">Singapore</option>
        </select>
      </div>

      <!-- SELECT MULTIPLE jobLocation (jobLocation: []) -->
      <div>
        <label for="jobLocation">Job Location</label>
        <select id="jobLocation" multiple v-model="formValues.jobLocation">
          <option value="">Select a country</option>
          <option value="india">India</option>
          <option value="vietnam">Vietnam</option>
          <option value="singapore">Singapore</option>
        </select>
      </div>

      <!-- CHECKBOX remoteWork: boolean (remoteWork: false) -->
      <div>
        <input type="checkbox" id="remoteWork"
               v-model="formValues.remoteWork" />
        <label for="remoteWork">Open to remote work?</label>
      </div>

      <!-- CHECKBOX receiveAlert: string (receiveAlert: 'no') -->
      <div>
        <input type="checkbox" id="receiveAlert"
               v-model="formValues.receiveAlert" true-value="yes" false-value="no" />
        <label for="receiveAlert">Receive alert?</label>
      </div>

      <!-- CHECKBOX GROUP skills (skillSet: []) -->
      <div>
        <label>Skill set</label>
        <input type="checkbox" id="html"
               v-model="formValues.skillSet" value="html" />
        <label for="html">HTML</label>

        <input type="checkbox" id="css"
               v-model="formValues.skillSet" value="css" />
        <label for="css">CSS</label>

        <input type="checkbox" id="js"
               v-model="formValues.skillSet" value="js" />
        <label for="js">JS</label>
      </div>

      <!-- RADIO GROUP experience (xp: '') -->
      <div>
        <label>Experience</label>
        <input type="radio" id="0-2" v-model="formValues.xp" value="0-2" />
        <label for="0-2">0-2</label>

        <input type="radio" id="3-5" v-model="formValues.xp" value="3-5" />
        <label for="3-5">3-5</label>

        <input type="radio" id="6+" v-model="formValues.xp" value="6+" />
        <label for="6+">6+</label>
      </div>

      <!-- SUBMIT -->
      <div>
        <button>Submit</button>
      </div>
    </form>
  </template>

  <script>
  export default {
    name: 'App',
    data() {
      return {
        formValues: {
          name: '',
          summary: '',
          country: '',
          jobLocation: [],
          remoteWork: false,
          receiveAlert: "no",
          skillSet: [],
          xp: ""
        }
      }
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        console.log(this.formValues);
      }
    }
  };
  </script>
  ```

### Directive v-once

* La directive `v-once` indique à Vue de ne traiter l'élément associé qu'une seule fois: lors des mises à jours suivantes, l'élément est ignoré — son contenu ne changera pas, même si les variables qu'il contient changent.

  Cette directive peut être utilisée pour optimiser les performances de Vue: en mettant cet attribut sur un élément qui ne changera jamais, on évite que Vue le recompile et recompare à chaque fois.

  ``` html
  <template>
    <h2 v-once>Hello {{ name }}</h2>
    <button @click="name = 'Alice'">Switch user</button>
  </template>

  <script>
  export default {
    name: 'App',
    data() {
      return {
        name: 'Bob'
      }
    }
  }
  </script>
  ```

### Directive v-pre

* La directive `v-pre` saute la compilation pour l'élément correspondant. Ce peut être utile

  1. Si on ne veut pas que le contenu soit interpolé: par exemple afficher `{{ content }}` tel que, au lieu de le remplacer par la valeur de la variable `content`.

  2. Pour optimiser les performances: si on a beaucoup de HTML qu'il n'est pas nécessaire de parser, on peut ajouter v-pre sur l'élément parent pour accélérer le traitement de Vue.

  ``` html
  <h2 v-pre>{{ name }}</h2>
  ```

---

## Utiliser des modificateurs

* Les modificateurs sont des suffixes qu'on peut ajouter aux directive `v-on` ou `v-model` pour ajouter une fonctionnalité. Ils peuvent être chainés.

### .trim

* Applique automatiquement trim — supprime les espaces au début et à la fin de la valeur.

  ``` html
  <input type="text" id="name" v-model.trim="formValues.name" />
  ```

### .number

* Caste automatiquement la valeur en entier ou float.

  ``` html
  <input type="number" id="age" v-model.number="formValues.age" />
  ```

### .lazy

* Par défaut, v-model synchronise la valeur du composant à chaque fois qu'on tape un caractère (onKeyUp). Avec le modificateur `.lazy`, l'événement n'est déclenché que lorsque le champ perd le focus (onChange).

  Ça permet d'optimiser les performances — on a pas toujours besoin de synchroniser les valeurs en temps réel. On peut également s'en servir pour effectuer des validations de formulaire une fois l'édition du champ terminée.

  ``` html
  <input type="text" id="name" v-model.trim.lazy="formValues.name" />
  ```

### .prevent

* Appelle automatiquement `event.preventDefault()`

  ``` html
  <form @submit.prevent="submitForm">
  ```

### .[keyname]

* Appelle le callback uniquement si une touche (ou bouton souris) donnée est pressée.

  ``` html
  <input @keyup.enter="submitForm" type="text" v-model="name" />
  ```

{% endraw %}