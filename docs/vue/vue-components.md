---
title: Composants enfants
category: Web, JavaScript, Library, Vue
---

{% raw %}
## Passer des propriétés

* Des propriétés statiques (texte) peuvent être passées à un composant en attribut.

  ``` html
  <Child msg="Hello World" />
  ```

  Pour évaluer une expression JavaScript, on utilise la directive `v-bind`. On peut s'en servir pour passer des données du parent, ou pour passer une valeur non textuelle (nombre, booléen, etc).

  ``` html
  <template>
    <Child :msg="msg" />
  </template>

  <script>
  import Child from './components/Child.Vue'

  export default {
    name: 'App',
    components: { Child },
    data: () => ({
      msg: "Hello World"
    })
  }
  </script>
  ```

  ``` html
  <Child :count="0" :isDisabled="false" />
  ```

* Par convention, les propriétés HTML suivent la notation kebab-case et les propriétés JS la notation camelCase.

  ``` html
  <template>
    <Child :hero-name="heroName" />
  </template>

  <script>
  //...
      heroName: "Bob"
    })
  }
  </script>
  ```

## Recevoir des propriétés

* Un composant déclare les propriétés qu'il attend dans la propriété `props`. Les propriétés peuvent ensuite être utilisées directement dans le bloc template.

  ```
  <template>
    <h2>{{ msg }}</h2>
  </template>

  <script>
  export default {
    name: 'Child',
    props: ['msg']
  };
  </script>
  ```

* Le composant peut spécifier le type de variable attendu en utilisant non pas un tableau mais un objet, où les clés sont les propriétés et les valeurs leurs types.  
  Si le mauvais type est passé, alors un warning est affiché dans la console.

  ``` html
  <script>
   export default {
    name: 'Article',
    props: {
      title: String,
      likes: Number,
      isPublished: Boolean
    }
  }
  </script>
  ```

* On peut également spécifier si la propriété est obligatoire ou non, et définir une valeur par défaut:

  ``` html
  <script>
   export default {
    name: 'Article',
    props: {
      title: {
        type: String,
        required: true,
        default: "Default title"
      },
      likes: Number,
      isPublished: Boolean
    }
  }
  </script>
  ```

## Attributs

* Si le parent passe des propriétés qui ne sont pas déclarées dans le composant inclut, alors par défaut ces attributs (dits non props) sont ajoutés sur l'élément racine du composant:

  <ins>./App.vue</ins>:
  ```
  <template>
    <Child id="my-id" />
  </template>
  ```

  <ins>./components/Child.vue</ins>:
  ```
  <template>
    <div>Hello World</div>
  </template>
  ```

  <ins>Résultat</ins>:

  ``` html
  <div id="my-id">Hello World</div>
  ```

* Si le composant inclut n'a pas d'élément racine (il y a plusieurs éléments de niveau un), alors Vue n'applique pas les attributs.

  Pour ajouter les attributs sur un élément autre que la racine, on utilise la variable spéciale `$attrs`:

  ``` html
  <template>
    <h2>Hello World</h2>
    <p v-bind="$attrs">Lorem ipsum dolor sit amet</p>
  </template>
  ```

* Et pour ne pas automatiquement ajouter les attributs sur l'élément racine, on spécifie l'option `inheritAttrs: false`

  ``` html
  <script>
  export default {
    name: 'Child',
    inheritAttrs: false
  }
  </script>
  ```

---

## Contexte

* Pour passer des valeurs à des composants imbriqués sans avoir à transmettre les propriétés de composant à composant à travers la hiérarchie, on peut utiliser les propriétés `provide` et `inject`.

1. Le parent fournit des données avec la propriété `provide`:

    ```
    <script>
    export default {
      name: 'App',
      components: { ComponentA1 },
      provide: {
        username: 'Bob'
      }
    };
    </script>
    ```

    Pour fournir des données définies dans `data`, on transforme provide en fonction:

    ```
    <script>
    export default {
      name: 'App',
      components: { ComponentA1 },
      data() {
        return {
          username: 'Bob'
        }
      },
      provide() {
        return {
          username: this.username
        }
      }
    };
    </script>
    ```

2. Le descendant récupère des données avec la propriété `inject`:

    ```
    <script>
    export default {
      name: 'ComponentA3',
      inject: ['username']
    };
    </script>

    <template>
      <h2>Hello {{ username }}</h2>
    </template>
    ```

    Il est recommandé de ne pas mettre à jour les valeurs injectées à partir d'un composant descendant — à la place, fournir une méthode pour mettre à jour la valeur à partir du parent.

---

## Événements personnalisés

* Les événements personnalisés permettent à un composant enfant de faire remonter des événements au parent.

1. Le composant inclut déclare les événements émis avec la propriété `emits` et déclenche l'événement avec la méthode spéciale `$emit`

    ``` html
    <script>
    export default {
      name: 'Popup',
      emits: ['close']
    }
    </script>

    <template>
      <div>
        <h2>This is a popup</h2>
        <button @click="$emit('close')">Close</button>
      </div>
    </template>
    ```

2. Le composant parent écoute les événements déclenchés avec la directive `v-on`

    ``` html
    <script>
    import Popup from './components/Popup.vue';

    export default {
      name: 'App',
      components: { Popup },
      data: () => ({
        showPopup: false
      })
    }
    </script>

    <template>
      <button @click="showPopup = true">Show Popup</button>
      <Popup @close="showPopup = false" v-show="showPopup" />
    </template>
    ```

* `$emit` accepte un deuxième argument qui permet de faire remonter des données avec l'événement.

  ``` html
  <button @click="$emit('close', $event)"></button>
  ```

  ``` html
  <Popup v-show="showPopup" @close="closePopup" />

  //...
    methods: {
      closePopup(event) {
        console.log(event);
      }
    }
  }
  ```

---

## Synchroniser les données

* Quand on utilise la directive `v-model` sur un composant, le composant reçoit automatiquement la propriété `modelValue` et le parent écoute automatiquement l'événement `update:modelValue`.

  <ins>./App.vue</ins>:
  ``` html
  <script>
  import Input from './components/Input.vue';

  export default {
    name: 'App',
    components: { Input },
    data: () => ({
      name: ""
    })
  }
  </script>

  <template>
    <Input v-model="name" />
  </template>
  ```

  <ins>./components/Input.vue</ins>:
  ``` html
  <script>
  export default {
    name: 'Input',
    props: {
      modelValue: String
    }
  }
  </script>

  <template>
    <input type="text"
          :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)" />
  </template>
  ```

---

## Slots

* Les propriétés permettent au parent de faire passer des données au composant inclut, mais elles ne sont pas idéales pour passer du contenu HTML. Pour ça, on peut utiliser un tag `<slot>`: Vue prend le contenu entre les balises du composant, et le subtitue au tag `<slot>`.

  <ins>./App.vue</ins>:

  ``` html
  <script>
  import Child from './components/Child.vue';

  export default {
    name: 'App',
    components: { Child }
  };
  </script>

  <template>
    <Child>
      <img src="https://placehold.it/500x500" />
    </Child>
  </template>
  ```

  <ins>./components/Child.vue</ins>:
  ``` html
  <script>
  export default {
    name: 'Child'
  };
  </script>

  <template>
    <div>
      <h2>Hello World</h2>
      <slot></slot>
    </div>
  </template>
  ```

* Le tag `<slot>` peut avoir un contenu par défaut, utilisé si le parent n'en définit pas.

  ``` html
  <template>
    <div>
      <h2>Hello World</h2>
      <slot><p>Default content</p></slot>
    </div>
  </template>
  ```

### Multiples slots

* On peut utiliser plusieurs tags `<slot>` en les nommant avec l'attribut `name`.

  <ins>./components/Popup.vue</ins>:
  ```
  <template>
    <div class="popup">
      <header class="popup-header">
        <slot name="header">Default title</slot>
      </header>

      <article class="popup-body">
        <slot>Default content</slot>
      </article>

      <footer id="popup-footer">
        <slot name="footer">Default footer</slot>
      </footer>
    </div>
  </template>
  ```

* Le parent spécifie le contenu des différents blocs en utilisant un tag template avec l'attribut `v-slot:slotname`.
  Le tag non nommé (explicitement) est nommé `default`.

  <ins>./App.vue</ins>:

  ``` html
  <template>
    <Popup>
      <template v-slot:header>
        <h3>Header</h3>
      </template>

      <template v-slot:default>
        <img src="https://placehold.it/500x500" />
       </template>

      <template v-slot:footer>
        <button>Footer</button>
       </template>
    </Popup>
  </template>
  ```

### Attributs

* Un `<slot>` peut envoyer des données au composant parent en attribut.

  <ins>./components/Child.vue</ins>:

  ``` html
  <script>
  export default {
    name: 'Child',
    data() {
      return {
        names: [
          {first: 'Bruce', last: 'Wayne'},
          {first: 'Clark', last: 'Kent'},
          {first: 'James', last: 'Bond'},
        ]
      }
    }
  };
  </script>

  <template>
    <div v-for="name in names" :key="name.first">
      <slot :firstName="name.first" :lastName="name.last"></slot>
    </div>
  </template>
  ```

  <ins>./App.vue</ins>:

  ``` html
  <script>
  import Child from './components/v.vue';

  export default {
    name: 'App',
    components: { Child }
  };
  </script>

  <template>
    <Child>
      <template v-slot:default="slotProps">
        {{ slotProps.firstName }} {{ slotProps.lastName }}
      </template>
    </Child>
  </template>
  ```

---

## Composant dynamique

* Pour inclure un composant nommé dans une variable, on utilise un bloc `<component>`.

  <ins>Exemple</ins>:  
  On peut remplacer

  ```
  <template>
    <button @click="activeTab = 'TabA'">Tab A</button>
    <button @click="activeTab = 'TabB'">Tab B</button>
    <button @click="activeTab = 'TabC'">Tab C</button>

    <TabA v-if="activeTab == 'TabA'" />
    <TabB v-if="activeTab == 'TabB'" />
    <TabC v-if="activeTab == 'TabC'" />
  </template>
  ```

  par

  ```
  <template>
    <button @click="activeTab = 'TabA'">Tab A</button>
    <button @click="activeTab = 'TabB'">Tab B</button>
    <button @click="activeTab = 'TabC'">Tab C</button>

    <component :is="activeTab" />
  </template>
  ```

### keep-alive

* Quand on change la valeur de la variable, Vue crée un nouveau composant (nouvelle instance) à chaque fois. Si on veut mettre en cache les composants crées, pour ré-utiliser les instances qui ont été créés quand on repasse sur un composant qu'on a déjà affiché, alors on il faut encapsuler le tag component avec un tag `<keep-alive>`.

  ``` html
  <keep-alive>
    <component :is="activeTab" />
  </keep-alive>
  ```

  On peut s'en servir pour garder l'état des composants (si l'utilisateur remplit un formulaire en plusieurs parties par exemple), ou pour éviter de récréer des composants à chaque fois pour des raisons de performances.

---

## Portal

* On peut insérer un composant à un autre endroit du DOM que son parent avec la balise `<teleport>`. L'attribut `to` prend en paramètre un élément du DOM ou un sélecteur qui désigne l'élément cible où le composant doit être inséré.

  Même si l'élément n'est pas inséré comme un enfant dans le DOM, il continue de se comporter comme un composant enfant: les événements déclenchés dans le composant enfant continuent de se propager au parent normalement.

  <ins>./index.html</ins>:  
  ``` html
  <div id="app"></div>
  <div id="portal"></div>
  ```

  <ins>./App.vue</ins>:
  ``` html
  <script>
  import Popup from './components/Popup.vue';

  export default {
    name: 'App',
    components: { Popup }
  }
  </script>

  <template>
    <h2>Hello World</h2>

    <teleport to="#portal">
      <Popup />
    </teleport>
  </template>
  ```

{% endraw %}