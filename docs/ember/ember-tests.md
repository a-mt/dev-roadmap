---
title: Tests
category: Web, JavaScript, Library, Ember
---

{% raw %}
* Pour lancer les tests:

  ```
  ember test
  ```

  Pour afficher les résultats dans le navigateur plutôt que dans la console:

  ```
  ember test -s
  ```

## Unit Tests

<ins>tests/unit/services/shopping-cart-test.js</ins>:

``` js
import { setupTest } from 'ember-qunit';

module('Unit | Service | shopping-cart', function(hooks){
  setupTest(hooks);

  // Get an instance of the cart service
  test('it exists', function(assert){
    let service = this.owner.lookup('service:shopping-cart');
    assert.ok(service);
  });

  // Add an item to the cart
  test('addItem works', function(assert){
    let service = this.owner.lookup('service:shopping-cart');

    assert.equal(service.itemList.length, 0, 'item list is empty');
    service.addItem({});
    assert.equal(service.itemList.length, 1, 'item list size increase by 1');
  });
});
```

Ember utilise [qunit](https://api.qunitjs.com/assert/) comme framework de test.

## Integration Tests

<ins>tests/integration/components/details-test.js</ins>:

``` js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product/details', function(hooks){
  setupRenderingTest(hooks);

  // Render a component
  test('it renders', async function(assert){

    await render(hbs`<Test />`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`<Test>template block text</Test>`);
    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  // Render a product with price=50
  test('it displays the price', async function(assert){
    this.set('price', {
      original: 50,
      current : 30
    });
    await render(hbs`<Product::Details @price={{this.price}} />`);
    assert.dom('[data-test-price]]').hasText('$50.00');
  });

  // Render a product and switch facet
  test('it can switch color', async function(assert){

    this.set('onChangeColor', function(color){
      assert.equal(color, 'red');
    });
    this.set('colors', [{color: 'red'}]);

    await render(hbs`
      <Product::Details
          @price={{this.price}}
          @colors={{this.colors}}
          @onChangeColors={{this.onChangeColor}}
          @isDetails={{true}} />`);

    await click('[data-test-color]');
  });
});
```

Les assertions sur le DOM se font grâce à [qunit-dom](https://github.com/simplabs/qunit-dom/blob/master/API.md)

## Acceptance Tests

<ins>tests/acceptance/shopping-test.js</ins>:

``` js
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | shopping', function(hooks){
  setupApplicationTest(hooks);

  // Cart workflow
  test('add item in shopping cart', async function(assert){

    await visit('/');
    assert.equal(currentURL(), '/');

    await click('[data-test-product="1"]');
    assert.equal(currentURL(), '/item/1');

    await click('[data-test-add-to-cart]');
    assert.dom('[data-test-cart-count]').hasText('1');
  });
});
```

* On peut afficher le template testé avec `this.pauseText()`

  ``` js
  test('...', async function(assert){
    //...

    await this.pauseText();
  });
  ```

* Pour interragir avec les pages, on utilise [ember-test-helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md)

[Automated Testing](https://guides.emberjs.com/release/tutorial/part-1/automated-testing/)

{% endraw %}