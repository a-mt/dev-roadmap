---
title: Plus sur les composants
category: Web, JavaScript, Library, Vue
---

{% raw %}
## Style

* Le style d'un composant peut être 
  * <ins>global</ins>: par défaut si non précisé  
    Si le style est global, alors il affecte toute la page, la dernière déclaration prend le pas.

    ``` html
    <style>
    h4 { color: orange; }
    </style>
    ```

  * ou <ins>local</ins>: quand on spécifie l'attribut `scoped`  
    S'il est local, alors le style n'affecte que le composant en cours et les éléments racine des composants enfants — ce comportement est voulu, pour que le parent puisse mettre en page les composants enfants.

    ``` html
    <style scoped>
    h4 { color: orange; }
    </style>
    ```

---

## Lifecycle

* On peut définir des méthodes sur le composant, qui seront appelées en fonction du cycle de vie du composant.

  ``` html
  <template>
    <div>Child component</div>
  </template>

  <script>
  export default {
    name: 'Child',

    beforeCreate() {
      console.log('Child beforeCreate')
    },
    created() {
      console.log('Child created')
    },
    beforeMount() {
      console.log('Child beforeMount')
    },
    mounted() {
      console.log('Child mounted')
    },
    beforeUpdate() {
      console.log('Child beforeUpdate')
    },
    updated() {
      console.log('Child updated')
    },
    beforeUnmount() {
      console.log('Child beforeUnmount')
    },
    unmounted() {
      console.log('Child unmounted')
    }
  };
  </script>
  ```

### Création: beforeCreate, created

* beforeCreated() est appelée avant l'initialisation du composant. Les propriétés et données calculées ne sont pas encore accessibles.  

* created() est appelée une fois que le composant est initialisé. C'est l'endroit idéal pour effectuer des appels API.

  ``` html
  <script>
  export default {
    name: 'App',
    data() {
      return {
        loading: true,
        posts: []
      }
    },
    created() {
      this.getPosts()
    },
    methods: {
      getPosts() {
        fetch("http://jsonplaceholder.typicode.com/posts")
         .then(response => response.json())
         .then(data => {
           this.loading = false;
           this.posts   = data;
         })
         .catch(err => {
           console.error(err);
         })
      }
    }
  };
  </script>

  <template>
    <div v-if="loading">Loading...</button>

    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.id }}. {{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <hr>
    </div>
  </template>
  ```
  
### Montage, beforeMount, mounted

* beforeMounted() peut être utilisée si le DOM doit être modifié immédiatement avant que le composant ne soit ajouté au DOM.

* mounted(), pour modifier le DOM après que le composant ait été ajouté.

### Mise à jour: beforeUpdate, updated

* beforeUpdated() est appelée lorsque les données du composant ont changé mais que le DOM n'a pas encore été patché.

* updated() une fois que le DOM a été mis à jour.

### Démontage: beforeUnmount, unmounted

* beforeUnmount() et unmounted() peuvent être utilisées pour faire du nettoyage: annuler des requêtes réseau, supprimer des listeners ajoutés manuellement, arrêter des timers, etc.

### Keep-alive: activated, deactived

* activated() est appelée lorsqu'un composant maintenu en cache par le tag `<keep-alive>` revient en premier plan.

* deactivated() lorsqu'il est caché.

### Gestion des erreurs: errorCaptured

* errorCaptured() est appelée lorsqu'une erreur provenant d'un composant descendant est capturée. On peut s'en servir pour afficher un message d'erreur ou une interface par défaut en mettant à jour les propriétés du composant.

### Debugging: renderTracked, renderTriggered

* renderTracked() et renderTriggered() permettent d'identifier ce qui a provoqué un nouveau render du composant.

---

## Références

* On peut récupérer le noeud DOM d'un élément en spécifiant l'attribut `ref`. Les références sont accessibles avec la propriété spéciale `$refs`.

  ``` html
  <template>
    <input type="text" ref="inputRef" />
  </template>

  <script>
  export default {
    name: 'App',
    mounted() {
      this.$refs.inputRef.focus();
    }
  }
  </script>
  ```

* On peut également s'en servir pour récupérer une instance de composant:

  ``` html
  <template>
    <HelloWorld ref="helloRef" />
  </template>

  <script>
  import HelloWorld from './components/HelloWorld.vue';

  export default {
    name: 'App',
    components: { HelloWorld },
    mounted() {
      console.log(this.$refs.helloRef);
    }
  }
  </script>
  ```

---

## Mixins

* Une mixin permet de partager une fonctionnalité entre différents composants sans dupliquer du code. Une mixin ne contient que du JavaScript.

1. Définir la mixin.  
   Par convention, les mixins sont définies dans le répertoire `mixins`.

   <ins>./mixins/counter.js</ins>:

    ``` js
    export default {
      data() {
        return { count: 0 }
      },
      methods: {
        incrementCount() {
          this.count += 1;
        }
      }
    }
    ```

2. Importer la mixin.  
   La propriété `mixins` retourne la liste des mixins qui seront appliquées sur le composant.

    <ins>./components/ClickCounter.vue</ins>:

    ``` html
    <script>
    import CounterMixin from '../mixins/counter'

    export default {
      name: 'ClickCounter',
      mixins: [CounterMixin]
    }
    </script>

    <template>
      <button @click="incrementCount">Clicked {{ count }} times</button>
    </template>
    ```

* Une mixin peut contenir des données, des données calculées, des watchers ou même des lifecycle hooks. Lorsque des options sont définies à la fois dans une mixin et un composant, alors le composant a la priorité.

{% endraw %}