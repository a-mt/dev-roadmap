---
title: Testing
category: Other
---

## Pourquoi automatiser les tests

Créer un programme sans faille est le but de tout développeur.
Malgré tout, il est très fastidieux de tester manuellement tous les scénarios, encore et encore, et ce à chaque modification.
Des erreurs peuvent donc se glisser.

Les tests automatisés suivent les mêmes étapes que les tests manuels, mais ils sont beaucoup plus rapides
et peuvent être exécutés de manière répétée. Ils peuvent également être exécutés sur plusieurs plateformes,
systèmes d'exploitation et périphériques. On peut ainsi simuler différentes configurations et cas d'utilisation.
Les bugs et les régressions peuvent être trouvés rapidement, donnant au développur l'assurance que le code fonctionne
correctement.

Bien qu'il faille un investissement de temps initial pour écrire les tests,
les tests automatisés permettent de gagner du temps sur le long terme, et d'améliorer la qualité du programme.
Cela rend l'automatisation des tests très rentable.

---

## Principaux types de tests automatisés

Il existe une multitude de types de tests automatisés:
tests unitaires, tests d'intégration, tests fonctionnels, tests d'interface graphique, etc.

### Tests unitaires

Les tests unitaires (*unit tests* en anglais) testent une fonction.
Ils appellent une fonction avec des valeurs en entrée et s'assurent que le résultat renvoyé est le bon.

Les tests unitaires sont les tests les plus rapides et se déroulent en quelques millisecondes.  
Ils devraient constituer la plus grande majorité des tests.

### Tests d'intégration

Les tests d'intégration (*integration tests* ou *service-level tests*) testent simultanément
de multiples services pour s'assurer que toutes les pièces du puzzle fonctionnent.
Cela inclut par exemple de tester l'insertion en base de données, l'écriture de fichiers sur le disque
ou encore l'appel vers une API. Contrairement aux tests unitaires, les tests d'intégration créent leurs propres données.

Les tests d'intégration prennent plus de temps que les tests unitaires, prenant généralement entre 10 et 100 millisecondes.

### Tests d'interface

Les tests d'interface (*User Interface tests* ou *UI tests*) testent des workflows de bout en bout,
non pas en appelant directement les fonctions mais en simulant les actions des utilisateurs dans le navigateur,
comme cliquer et taper au clavier. Ils testent que l'ensemble de l'application fonctionne, de l'interface utiliseur
à l'insertion en base de données.

Les tests d'interface s'exécutent toujours dans un navigateur et peuvent donc durer plusieurs secondes,
voire parfois quelques minutes suivant la fonctionnalité testée. Il ne devrait y avoir qu'une poignée de ces tests,
pour ne couvrir que les cas utilisateur primordiaux.

---

## Intégration continue

L'intégration continue (*conitnuous integration* en anglais ou *CI*) est le meilleur moyen de répéter
l'éxecution de tests automatisés sur différentes plateformes et environnements. Les tests peuvent être déclenchés à la
suite de toute nouvelle modification transmise à Github, ou de manière récurrente comme toutes les heures ou tous les matins
à neuf heures. L'exécution conitnue des tests présente l'avantage de détecter les bugs au plus tôt, par rapport aux
développeurs qui effectuent des tests localement de manière ciblée sur la fonctionnalité en cours.

Il existe de nombres solutions de CI disponibles, Travis CI étant probablement la plus populaire.

---

## Modèles théoriques

Il existe quelques modèles pour aider à déterminer quels tests devraient être automatisés.

### Les quadrants Agile

Les quadrants Agile sont utilisés pour aider à classifier les tests,
ce qui permet de rapidement identifier les ressources et de planifier les tests.
Ce modèle a été développé par un consultant en tests Agile, Brian Marick, en 2003.

Il existe quatre quadrants distincts, séparés par les axes x et y.  
En bas, on place les tests technologiques, en haut les tests du business.  
À gauche, les tests qui guident le développement, à droite les tests qui critiquent le produit.

![](https://i.imgur.com/boFf73B.png)

* <ins>Quadrant 1</ins>: Tests technologiques guidant le développement  
  Ces types de tests sont toujours automatisés.
  Ils garantissent que l'application fonctionne toujours comme prévu et que le code a une bonne base.
  Des exemples de tests appartenant à cette catégorie sont: les tests unitaires, les tests d'intégration.
  
  Il s'agit d'un quadrant très important et la plupart des tests doivent être écrits dans ce domaine.  
  Les tests du premier quadrant sont écrits parallélement au développement et aident à confirmer que les
  fonctionnalités développées fonctionnent bien.

* <ins>Quadrant 2</ins>: Tests du business guidant le développement  
  Ces tests peuvent être automatisés ou manuels.
  Les résultats de ces tests aident à valider les fonctionnalités d'une application.
  Des exemples de tests automatisés sont: les tests fonctionnels et les tests d'interface utilisateur.  
  Des exemples de tests non automatisés sont: les prototypes, maquettes ou mock-ups.

  Les tests du quadrant 2 sont vraissemblablement effectués au début et après le développement.  
  Ces tests aideront à découvrir les bugs et les problèmes de l'application avant de publier le logiciel au public.

* <ins>Quadrant 3</ins>: Tests du business critiquant le produit  
  Ces tests sont principalement des tests maniels, mais peuvent également bénéfier de l'automatisation.
  Ils fournissent des informations sur l'état actuel d'une application et sur le fait que tout fonctionne comme prévu.
  Cela implique une réflexion critique et une observation appronfondie des flux de travail de l'application.
  Des exemples de tests de cette catégorie sont: les tests d'usabilité, exploratory tests, A/B testing.
  
  Ces tests peuvent être effectués avant ou après la fin du développement.

* <ins>Quadrant 4</ins>: Tests technologiques critiquant le produit  
  Ces tests sont tous automatisés.
  Ils sont construits à l'aide d'outils spécifiques, leur objectif est de fournir des informations très ciblées.
  Des exemples de tests de ce type sont: les tests de performance, de charge, de sécurité, de fiabilité, etc.

  Les tests du quadrant 4 sont effectués selon ce qui est prioritaire pour l'application.
  Par exemple, si le temps de chargement de la page est important, il est probablement judicieux de mettre en oeuvre des
  tests de performance.

Les quadrants Agile peuvent être utilisés pour réfléchir aux différents tests possibles pour l'application.
L'objectif est de comprendre qu'il existe de nombreux types de tests, automatisés et manuels, et d'identifier les types
de tests les plus importants à mettre en oeuvre.

### La pyramide de tests

La pyramide de tests explique la structure idéale des tests.
Il s'agit d'une représentation visuelle de la quantité recommandée de couverture pour les différents types de tests.
Ce concept a été introduit par Mike Cohn en 2009 dans le livre "Succeeding with Agile".

La pyramide des test originale comprend trois niveaux: les tests unitaires, les tests d'intégration
et les tests d'interface. Ce sont les types de test qui sont les suspects habituels dans le développement de logiciels.
Il est recommandé que les projets aient au moins ces trois types de tests automatisés,
bien qu'il soit tout à fait possible d'en avoir davantage.

![](https://i.imgur.com/XNtzxl0.png)

La pyramide se veut être le modèle d'une suite de tests saine, rapide et maintenable.

Par exemple, une équipe pourrait vouloir tous les tests unitaires sur un projet et se moquer de tout autre type de tests.
Ici, la forme des tests finit par ressembler à un grand carré.
Ou peut-être qu'un projet teste chaque partie de l'interface. La forme serait une pyramique inversée.
Peut-être que tout fonctionne en apparence, mais qu'à un niveau inférieur, des bugs existent
(comme la mise en cache, appels à un ERP, etc).

---

## Définir sa stratégie de tests

### Choisir les fonctionnalités à tester

Avant de vous lancer dans la rédaction de tests, il est judicieux de planifier l'approche.
Rassemblez l'équipe au complet et répertoriez les fonctionnalités les plus prioritaires.
À partir de là, prenez le temps de réfléchir aux scénarios qui devront être automatisés pour chaque fonctionnalité.
Les scénarios qui se prêtent le mieux à l'automatisation sont ceux qui testent les fonctionnalités les plus importantes,
les plus fastidieuses à faire manuellement, et qui fournissent le même résultat à chaque fois.

Pour les évaluer, attribuez leur un score de un à cinq en fonction de
1. la **valeur** chaque scénario:
   l'importance de la fonctionnalité, la probabilité qu'elle ait à être corrigée si elle ne fonctionne plus,
   et le caractère distinctif (ajouter un produit au panier est plus distinctif qu'ajouter plusieurs produits au panier)
2. le **risque**:
   l'impact de la fonctionnalité sur le client et sa fréquence d'utilisation
3. le **coût** de l'automatisation:
   l'infrastructure et la difficulté à mettre en place le test

Enfin, faites la somme des scores.  
Par exemple:

![](https://i.imgur.com/hbOgX6k.png)

Vous avez maintenant suffisamment d'informations pour sélectionner les meilleurs candidats pour l'automatisation.  
Les scores 1-15 devraient être automatisés, les scores 12 et moins ne devraient pas l'être.
Cela ne veut pas dire que les autres tests ne sont pas importants, mais l'idée est de se concentrer en premier sur les
meilleurs scénarios.

### Choisir les types de tests

Essayez d'identifier les types de tests pouvant couvrir chaque scénario.
Pour en revenir à la pyramide de tests, il est bon d'avoir le plus grand nombre de tests unitaires, un nombre moyen de 
tests d'intégration et un petit nombre de tests d'UI. Donc si un scénario aura les mêmes résultats en utilisant l'interface
utilisateur ou non, choisissez d'éviter l'interface utilisateur.

### Choisir les outils

Après avoir réfléchi à ce qu'il faut automatiser, déterminer
- la manière dont les données de test seront crées, utilisées, et gérées
- les différents outils disponibles pour créer et exécuter des tests
- les environnements de test qui devont être disponibles pour les tests automatisés et manuels

Pour trouver les outils les plus adaptés à ce travail, basez vous sur 1. le type de test à effectuer, 2. le language utilisé.

Utilisez de petits projets expérimentaux pour tester les outils. Cela permettra à l'équipe d'apprendre à utiliser
l'outil et d'appréhender les différents détails techniques, pour formuler un jugement plus éclairé.

### Définir le processus de développement

Différents types de tests sont à mise en oeuvre à différents moments du cycle de vie du programme.

1. Idéalement, le développement est piloté par les tests (*test driven development* en anglais ou *TDD*).
  Les tests unitaires sont écrits avant le code puis sont utilisés pour s'assurer que le code écrit fonctionne comme prévu.

2. Les tests d'intégration doivent également être écrits pendant le développement, cependant, les foncitonnalités doivent
   être suffisamment complètes pour pouvoir tester le bon fonctionnements des composants.

3. Les tests d'interface peuvent commence pendant le développement, mais ne peuvent pas être terminés tant que la
   fonctionnalité à tester n'est pas terminée.

Déterminez comment les tests seront exécutés, localement et en intégration continue.
Iédalement, les développeurs doivent exécuter les tests localement et s'assurer que tout va bien. Une fois les modifications
apportées, il est préférable d'avoir un serveur en intégration continue mis en place pour exécuter les tests.

### Documenter

C'est généralement une bonne idée de mettre en place un ensemble de principes:

* *Don't Repeat Yourselft* ou *DRY*  
  Pour l'automatisation, DRY permet au code de test d'être partagé et réutilisé.
  Factoriser le code, de sorte que quand quelque chose change dans le système, seul un test doit être modifié.

* *Domain Specific Language* ou *DSL*  
  Il est préférable de donner un nom descriptif et de l'utiliser de manière cohérente, à la fois dans le code
  et dans l'application de test. L'utilisation du DSL tout au long des tests facilitera leur compréhension par tous
  les membres d'une équipe.

* Chaque test doit avoir un seul but.  
  Cela rend les tests plus clairs, plus faciles à débugger et à mettre à jour si le code change.

* Chaque test doit être autonome.  
  Les tests doivent pouvoir être exécutés dans n'importe quel ordre et ne doivent pas dépendre des données d'un autre test.

* Les tests doivent être décomposés en étapes décrivant leur comportement.  
  En résumant les étapes techniques de cette manière, le test sera plus lisible pour l'homme.

Déterminez les modèles de conception que vous souhaitez suivre et documentez-les en détail,
dans le fichier README par exemple, afin que les développeurs puissent facilement écrire des tests et savoir les lancer.

---

## Outils

### Frameworks

Un **framework** permet de structurer les tests, afin de pouvoir facilement les écrire et les exécuter.  
Tous les principaux frameworks de testing vous permettrons de lancer vos tests et vous fournirons un rapport de base:
tests validés, tests non validés, durée... La plupart vous permettent également de customiser la sortie.

``` js
describe('add', function(){
  it('should add 2 numbers', function(){
      // ...
  })
});
```

Pour lancer le test, on utilise la ligne de commande. La commande à utiliser dépend du framework choisit.  

### Bibliothèques d'assertion

Les **assertions** constituent la colonne vertébrale des tests.  
Une assertion teste la valeur du résultat et fait échouer le test lorsqu'il ne correspond pas à la valeur attendue.

``` js
assert.equal(add(1,3), 4);
```

Le plus important est que les déclarations d'assertion soient lisibles et indiquent clairement ce qui est en cours
de validation. Trouvez-en un avez lequel vous êtes à l'aise et gardez-le.

### Frameworks populaires pour Node.js

* [Mocha](https://mochajs.org)
  - idéal pour l'écriture et la structuration des tests
  - offre une prise en charge du navigateur et des tests asynchrones
* [Jasmine](https://jasmine.github.io)
  - peut être utilisé avec n'importe quelle version JavaScript
  - ne nécessite ni navigateur ni DOM
  - test runner personnalisable
* [Jest](https://facebook.github.io/jest/)
  - créé par Facebook pour tester React
  - possède un raporteur de couverture de code
* [Selenium](https://www.seleniumhq.org)
  - UI testing
  - peut être utilisé en combinaison avec la plupart des frameworks
* [Cucumber](https://cucumber.io)
  - UI testing framework
  - fonctionne bien avec Selenium
* [Cypress.io](https://www.cypress.io)
  - UI testing framework
  - fonctionne dans n'importe quel navigateur
  
### Bibliothèques d'assertion populaires pour Node.js

* [Assert](https://nodejs.org/api/assert.html): `assert.equal(add(1,3), 4);`
  - bibliothèque native de Node.js
  - pas aussi personnalisable que les autres options mais idéal pour les scénarios simples

* [Chai](http://www.chaijs.com): `expect(add(1,3)).to.equal(4);`
  - utilise une déclaration séparée par des points
  - dispose d'excellents plugins pour étendre les assertions

* [Unexpected](http://unexpected.js.org): `expect(add(1,3), 'to equal', 4);`
  - écrit dans un format de chaîne, rend la déclaration très lisible
  - hautement extensible
  - compatible avec tous les frameworks de test
  
* [Jasmine](https://jasmine.github.io/api/edge/matchers.html): `expect(add(1,3)).toEqual(4);`
  - syntaxe fournit par le framework
  - propose une large gamme de fonctions d'assertion
  - permet de créer des fonctions d'assertion personnalisées

* [Jest](https://facebook.github.io/jest/docs/en/expect.html): `expect(add(1,3)).toEqual(4);`
  - syntaxe fournit par le framework
  - annotation identique à Jasmise mais spécifique à React

---

## Exemples de tests

### Tests unitaires

Mocha est un framework de test pour Node.js très populaire.  
Les tests de Mocha sont écrits dans un style *behavior-driven development* ou *BDD*. Cela signifie que le test
est définit en termes de comportement, et structuré de sorte à identifier les fonctionnalités et scénarios testés.
À l'intérieur de cette structure, se trouvent les tests à proprement parler.

Un exemple de test pour l'application [Stickerfy](https://github.com/meaghanlewis/stickerfy):

``` js
// test/unit/cart.spec.js

const Cart = require('../../models/cart');
const Product = require('../../models/product');
const assert = require('assert');

let cart;
let product;

describe('Shopping cart', function() {

  describe('shopping cart model', () => {

    beforeEach(() => {
      cart = new Cart({});
      product = new Product({
        "imagePath": "https://buildahead.com/wp-content/uploads/2017/02/happy-emoji-smaller.png",
        "title": "Happy",
        "description": "Happy",
        "price":5});
    });

    it('adds a sticker to the cart', function() {
      cart.add(product, product.id);
      assert.equal(cart.totalPrice, 5);
    });

    it('removes a sticker from the cart', function() {
      cart.add(product, product.id);
      cart.reduceByOne(product.id);
      assert.deepEqual(cart.items, {});
      assert.equal(cart.totalPrice, 0);
    });

    it('remove all quantities of sticker from the cart', function() {
      cart.add(product, product.id);
      cart.add(product, product.id);
      cart.removeItem(product.id);
      assert.deepEqual(cart.items, {});
      assert.equal(cart.totalPrice, 0);
    });

    it('returns an empty array', function() {
      assert.deepEqual(cart.generateArray(),[]);
    });
  });
});
```

Pour lancer des tests avec Mocha, vous pouvez lancer
* `mocha test/unit/cart.spec.js` pour un fichier spécifique
* ou juste `mocha` pour lancer tous les tests

Vous pouvez utiliser npm pour créer des commandes, ce qui vous simplifiera la tâche de lancer les tests.  
Pour ce faire, créez une commande dans `package.json`:

``` json
{
  "scripts": {
    "unit-test": "mocha --recursive test/unit/cart.spec.js"
  }
}
```

Puis exécutez `npm run unit-test`.

### Test d'intégration

Notre test utilise ici la bibliothèque d'assertion Chai et le plugin ChaiHttp, afin d'effectuer des requêtes
GET et de tester la réponse du serveur. Bien que ce test soit encore très rapide, il dure plusieurs millisecondes,
car il nécessite le démarrage du serveur, l'envoi d'une requête, l'attente de la réponse et la confirmation de sa réponse.

``` js
// test/integration/order.spec.js.js

const Cart = require('../../models/cart');
const Product = require('../../models/product');

let cart;
let product;
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Shopping cart', () => {

  describe('order test suite', () => {

    beforeEach(() => {
      cart = new Cart({});
      product = new Product({
        "imagePath": "https://buildahead.com/wp-content/uploads/2017/02/happy-emoji-smaller.png",
        "title": "Happy",
        "price":5});
    });

    it('completes an order', (done) => {
      chai.request(app)
      .get('/checkout')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

  });
});
```

``` json
{
  "scripts": {
    "integration-test": "mocha --recursive --exit test/integration/order.spec.js"
  }
}
```

### Test d'interface

Ce test utilise Sélenium WebDriver, qui est une option populaire pour exécuter des tests dans un navigateur et
ChromeDriver pour simuler le navigateur. Les tests d'interface prennent beaucoup plus de temps, car ils nécessitent
une nouvelle instance de ChromeDriver pour ouvrir le navigateur, envoyer des requêtes au serveur, exécuter les
tests de l'application, puis arrêter le navigateur et WebDriver une fois complété.

Pour exécuter ce type de test, vous devez au prélable démarrer votre serveur.

``` js
// test/ui/checkout.spec.js

require('chromedriver');
const assert = require('assert');
const {Builder, By} = require('selenium-webdriver');

describe('Checkout workflow', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('adds a sticker to the cart and checks out', async function() {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.className('btn-success')).click();
    await driver.findElement(By.id('cart')).click();
    await driver.findElement(By.id('checkout')).click();

    let total = await driver.findElement(By.id('total'));
    assert.equal(await total.getText(), 'Total: $5.5');
    });
    after(() => driver && driver.quit());
});
```

``` json
{
  "scripts": {
    "ui-test": "mocha --recursive --timeout 10000 test/ui/checkout.spec.js"
  }
}
```

---

## Couverture du code

Le couverture de code (*code coverage* en anglais) est l'une des métrique les plus populaires pour analyser les tests
automatisées. Elle permet de savoir quelles parties de l'application sont tesstées et celles qui ne le sont pas.

Pour générer un rapport de couverture de code, il suffit d'installer un package, comme par exemple
[Istanbul](https://instanbul.js.org) pour les projets Node.js.
Pour l'installer: `npm install --save-dev nyc`.
Et ajouter un raccourci dans `package.json`:

``` json
{
  "scripts": {
    "test-coverage": "nyc mocha --recursive --exit test/unit/cart.spec.js test/integration/order.spec.js"
  }
}
```

Le rapport de couverture indique le pourcentage de couverture pour chaque fichier de test, décomposé par
instructions, branches, fonctions et lignes. Vous pouvez également voir le pourcentage de code non couvert.

N'automatisez jamais quelque chose dans le seul but d'augmenter la couverture, utilisez les données du rapport
pour prendre des décisions éclairées sur la manière d'améliorer les tests dans une zone donnée.

---

## Travis CI

Travis CI est une excellente option car son utilisation est gratuite pour les repo Github publics.
Il est extrêmement facile à configurer, fournit une documentation abondante, une assistance, et permet
une intégration avec des services de déploiement comme AWS, Github Pages et Heroku.

<ins>Pour activer Travis CI sur un repo Github</ins>:

1. Créer le fichier de configuration

    Un serveur CI nécessite une configuration qui se produit généralement avec un fichier YAML situé à la racine du
    projet. Ce fichier spécifie des éléments tels que la langue utilisée par le projet, les services requis, ainsi
    que la manière de créer et d'exécuter des tests.
    Voici un exemple de fichier `.travis.yml`:

    ``` yaml
    language: node_js
    node_js:
      - "8"
    services: mongodb
    env:
      - MONGODB_URI=mongodb://localhost:27017/shopping
    ```

     Consultez *[how to set up Travis CI with Node projects](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)*
     pour plus de détails.

2. Se connecter sur [Travis CI](https://travis-ci.org) avec votre compte Github
3. Activer Travis CI votre repo (repo public dont vous possèdez les droits d'admin)

Lorsque cette option est activée, chaque fois que vous commiterez sur Github, Travis CI lira
le fichier de configuration YAML pour automatiquement construire le projet et exécuter les tests.  
Vous pourrez voir tous les builds sur Travis CI, et voir les logs de chaque build et chaque commandes exécutées,
comme le démarrage de MongoDB, le clonage du projet, la mise à jour NVM et l'exécution des tests.
Et évidemment voir si les tests ont réussit ou non.

Et c'est tout ce dont vous avez besoin pour installer une solution d'intégration continue.



