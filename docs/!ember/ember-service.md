---
title: Services
category: Web, JavaScript, Library, Ember
---

## Créer un service

* Un service est un objet instancié pour toute la durée de l'application. Il peut être injecté dans différentes parties de l'application (composants, routes, controlleurs, etc) et être utilisé pour partager des données par exemplz.

1. Créer un service dans <ins>app/services</ins>  

    <ins>app/services/shopping-cart.js</ins>

    ``` js
    import Service from '@ember/service';
    import { tracked } from 'glimmer/tracking';

    export default class ShoppingCartService extends Service {
      @tracked itemList = [];

      addItem(item) {
        this.itemList = [...this.itemList, item];
      }
    }
    ```

2. Injecter le service avec le décorateur @inject  (souvent renommé @service)

   <ins>app/controllers/cart.js</ins>:

    ``` js
    import Controller from '@ember/controller';
    import { inject as service } from '@ember/service';

    export default class CartController extends Controller {
      @service shoppingCart;
    }
    ```

   <ins>app/components/cart-icon.js</ins>:

    ``` js
    import Component from '@glimmer/component';
    import { inject as service } from '@ember/service';

    export default class CartIconComponent extends Component {
      @service shoppingCart;
    }
    ```

   * On peut créer une propriété sous un nom différent que celui du service:

      ```
      @service('shopping-cart') cart;
      ```

   * Les services sont injectés en lazy loading: l'instance ne sera créée que quand la propriété est explicitement appelée. Une fois instancié, le service persiste jusqu'à ce l'application soit fermée.

3. Utiliser le service.

    ```
    {{#each this.shoppingCart.itemList as |item|}}
      <h4>{{item.name}}</h4>
    {{/each}}
    ```
