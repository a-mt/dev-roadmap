---
title: API composition
category: Web, JavaScript, Library, Vue
---

{% raw %}
## Qu'est-ce que c'est

* Jusqu'à présent, on a utilisé l'API options: les données, méthodes, etc, sont des options spécifiées dans le composant via les propriétés d'un objet exporté dans le bloc script. La logique du composant est éparpillée entre différents blocs (données, données calculées, méthodes, etc) et non par fonctionnalité, ce qui peut rendre difficile la lecture d'un composant complexe — il faut souvent scroller d'un endroit à l'autre pour comprendre ce que le composant fait.

* L'API composition est manière alternative de définir ces options, introduite à partir de Vue 3. Tout se déclare désormais dans la méthode `setup` de l'objet, ce qui permet de librement regrouper les parties de code qui vont ensemble.

* On peut mélanger l'API composition et l'API options dans un même composant.

---

## Définir des données

### ref

* La méthode `setup()` retourne un objet où les clés sont les noms des propriétés et les valeurs sont des références crées avec `ref()`.

  Vue observe les changements de valeur sur ces références et déclenche les mises à jour lorsque c'est nécessaire. Pour modifier la valeur d'une référence au sein du bloc script, il faut passer par `.value`:

  ``` html
  <script>
  import { ref } from 'vue';

  export default {
    name: 'App',
    setup() {
      const c_name  = ref('Alice');
      c_name.value += '...';

      return { c_name };
    }
    data() {
      return { o_name: 'Bob' }
    }
  };
  </script>

  <template>
    <h2>{{ o_name }}</h2>
    <h2>{{ c_name }}</h2>
    <button @click="c_name = 'Carole'">Update name</button>
  </template>
  ```

### reactive

* `ref()` ne peut être utilisé qu'avec des valeurs primitives (string, boolean, etc).   
  Pour un objet, on utilise `reactive()`. Il est inutile d'utiliser `.value` avec un objet réactif.

  ``` html
  <script>
  import { reactive } from 'vue';

  export default {
    name: 'App',
    setup() {

      const user = reactive({
        firstName: 'Clark',
        lastName : 'Kent'
      });
      return { user };
    }
  };
  </script>

  <template>
    <h2>{{ user.firstName }} {{ user.lastName }}</h2>
  </template>
  ```

### toRefs

* Le problème avec reactive, c'est que Vue écoute les changements sur l'objet et non sur les propriétés à proprement parler: si on copie les propriétés, alors on perd la réactivité.

  ``` html
      // On perd la réactivité
      return { ...user };
    }
  };
  </script>

  <template>
    <h2>{{ firstName }} {{ lastName }}</h2>

    <button @click="firstName = 'Bruce'">I fail</button>
  </template>
  ```

* Pour résoudre ce problème: on utilise `toRefs()` pour convertir les propriétés d'un objet en références.

  ``` html
      // OK
      return { ...toRefs(user) };
    }
  };
  </script>

  <template>
    <h2>{{ firstName }} {{ lastName }}</h2>

    <button @click="firstName = 'Bruce'">I work</button>
  </template>
  ```

### toRef

* `toRef()` quant à elle convertit la propriété d'un objet (une seule) en une référence.

  ``` html
      return {
        firstName: toRef(user, 'firstName')
      }
  };
  </script>

  <template>
    <h2>{{ firstName }}</h2>

    <button @click="firstName = 'Bruce'">I work</button>
  </template>
  ```

---

## Définir des méthodes

* Pour définir des méthodes, on peut simplement définir des fonctions dans setup() et les retourner avec l'ensemble des données.

  ``` html
  <script>
  export default {
    name: 'App',
    setup() {
      const count = ref(0);

      function incrementCount() {
        count.value++;
      }
      return { count, incrementCount };
    }
  };
  </script>

  <template>
    <h2>{{ count }}</h2>
    <button @click="incrementCount">Increment count</button>
  </template>
  ```

---

## Définir des données calculées

* Pour calculer des données et mettre à jour leur valeur quand les données dont elles dépendent sont modifiées, on utilise `computed()`

  ``` html
  <script>
  import { ref, computed } from 'vue';

  export default {
    name: 'App',
    setup() {
      const firstName = ref('');
      const lastName  = ref('');

      const fullName  = computed(function(){
        return `${firstName.value} ${lastName.value}`;
      });
      return { firstName, lastName, fullName };
    }
  };
  </script>

  <template>
    <input type="text" placeholder="First Name" v-model="firstName" />
    <input type="text" placeholder="Last Name" v-model="lastName" />

    <div>{{ fullName }}</div>
  </template>
  ```

---

## Définir des watchers

* Pour définir un watcher, on utilise `watch()`.  
  Le premier argument de watch est la référence à surveiller, le second est le callback.

  ``` html  
  <script>
  import { ref, watch } from 'vue';

  export default {
    name: 'App',
    setup() {
      const name = ref('');

      watch(name, (newValue, oldValue) => {
        console.log(newValue, oldValue);
      });
      return { name };
    }
  };
  </script>

  <template>
    <input type="text" placeholder="Name" v-model="name" />
  </template>
  ```

* On peut spécifier une liste de référence en dépendance: le watcher sera déclenché lorsqu'une des références change.

  ``` js
  watch([firstName, lastName], (newValues, oldValues) => {
    console.log('first name':, newValues[0], oldValues[0]);
    console.log('last name':, newValues[1], oldValues[1]);
  });
  ```

* watch() accepte également un troisième argument: les options du watcher.

  ``` js
  watch(name, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, {
    immediate: true
  });
  ```

### Watcher sur un objet

* Quand on passe un objet en dépendance, les anciennes valeurs et les nouvelles seront les mêmes. Pour éviter ça, on peut utiliser une fonction anonyme en dépendance, qui retourne une copie de l'objet.

  ``` js
  setup() {
    const user = reactive({
      firstName: '',
      lastName : ''
    });
    watch(() => {...user}, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

    return { ...toRefs(user) };
  }
  ```

  On peut également utiliser ce mécanisme pour n'observer qu'une seule propriété:

  ``` js
  watch(() => user.firstName, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });
  ```

* Pour observer les changements sur des propriétés imbriquées, utiliser l'option `deep: true`

  ``` js
  watch(() => _.cloneDeep(state.options), (newValue, oldValue) => {
    //...
  }, {
    deep: true
  })
  ```

---

## Contexte

1. Pour fournir des données aux descendants d'un composant, on utilise `provide()`

    ``` js
    export default {
      name: 'App',
      components: { Child },

      setup() {
        const count = ref(0);
        const state = reactive({
          firstName: 'Bruce',
          lastName : 'Wayne'
        });

        provide('count', count);
        provide('state', state);
      }
    }
    ```

2. Les descendants récupérent les données fournies avec `inject()`.  
   On peut fournir une valeur par défaut, sutilisée i le parent ne fournit pas cette donnée.

    ``` js
    export default {
      name: 'Child',

      setup() {
        const count = inject('count', 0);
        const state = inject('state', {});

        return { count, ...toRefs(state) };
      }
    }
    ```

---

## Accéder aux propriétés

* La méthode setup reçoit les propriétés du composant en argument — le premier argument.

  ``` html
  <script>
  export default {
    name: 'Child',
    props: ['firstName', 'lastName'],

    setup(props) {
      const fullName = computed(() => {
        return `${props.firstName} ${props.lastName}`;
      });
      return { fullName };
    }
  };
  </script>
  ```

---

## Événements personnalisés

* La méthode setup reçoit un objet qui expose la méthode emit en second argument

  <ins>./components/Child.vue</ins>:

  ``` html
  <template>
    <button @click="sendEvent">Click<button>
  </template>

  <script>
  export default {
    name: 'Child',
    emits: ['myEvent'],

    setup(props, context) {
      function sendEvent() {
        context.emit('myEvent', 'My message')
      }
      return { sendEvent };
    }
  };
  </script>
  ```

  <ins>./App.vue</ins>:

  ``` html
  <template>
    <Child @myEvent="myEvent" />
  </template>

  <script>
  import Child from './components/Child.vue';

  export default {
    name: 'App',
    components: { Child },

    setup() {
      function myEvent(msg) {
        alert(msg);
      }
      return { myEvent };
    }
  };
  </script>
  ```

---

## Lifecycle hooks

* Dans le cas de l'API composition, les lifecycle hooks sont préfixés avec `on`.

   Les méthodes beforeCreate() et created() n'existent pas — elles sont remplacées par la méthode setup().

  ``` js
  import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
  } from 'vue';

  export default {
    name: 'App',
    setup() {

      onBeforeMount(() => {
        console.log('Before mount');
      });
      onMounted(() => {
        console.log('Mounted');
      });
      //...
    }
  }
  ```

---

## Référence au DOM

* Une référence peut récupérer une référence vers un élément du DOM ou une instance de composant.

  ``` html
  <script>
  import { ref, onMounted } from 'vue';

  export default {
    name: 'App',
    setup() {
      const inputRef = ref(null);

      onMounted(() => {
        inputRef.value.focus();
      });
      return {
        inputRef
      };
    }
  };
  </script>

  <template>
    <input type="text" ref="inputRef" />
  </template>
  ```

---

## Mixins

* Là où avec l'API options on utilisait une mixin, avec l'API composition on peut simplement extraire les variables et fonctions d'un module. Cette approche a l'avantage d'être plus lisible — quand on utilise une mixin, on doit changer de fichier pour savoir quelles variables et fonctions sont définies.

  Par convention, les modules utilisés par différents composants sont définis dans `composables`.

  <ins>./composables/useCounter.js</ins>:

  ``` js
  import { ref } from 'vue';

  export default function useCounter() {
    const count = ref(0);

    function incrementCount() {
      count.value += 1;
    }
    return { count, incrementCount };
  }
  ```

  <ins>./App.vue</ins>:

  ``` html
  <script>
  import useCounter from './composables/useCounter'

  export default {
    name: 'App',
    setup() {
      const { count, incrementCount } = useCounter();

      return {
        count,
        incrementCount
      };
    }
  };
  </script>

  <template>
    <button @click="incrementCount">Clicked {{ count }} times</button>
  </template>
  ```

{% endraw %}