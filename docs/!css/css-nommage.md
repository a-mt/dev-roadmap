---
title: Conventions de nommage CSS
category: Web > CSS
---


## Problèmes fréquemment rencontrés en CSS

Écrire du CSS est relativement facile mais garder le code fonctionnel et propre sur le long terme est beaucoup plus difficile - d'ajout en ajout, le code devient de moins en moins compréhensible.

1. <ins>CSS difficile à comprendre</ins>  
    Prenons le code suivant:
    
    ``` html
    <div class="box profile pro-user">
      <img class="avatar image" />
      <p class="bio">...</p>
    </div>
    ```
    
    Il est impossible de savoir si les classes `box` et `profile` sont liées,
    s'il est possible d'utiliser `avatar` en dehors de `profile`,
    si la classe `pro-user` est utilisée ailleurs qu'ici, etc.

2. <ins>CSS difficilement réutilisable</ins>  
    Supposons qu'il existe un style sur une page que vous souhaitez réutiliser sur une autre page,
    mais lorsque vous l'essayez, vous découvrez que le code a été écrit d'une manière qui ne fonctionne que sur la première page. L'auteur a supposé que l'élément serait placé dans un parent particulier, et cela ne fonctionne pas dans un autre contexte. Vous dupliquez donc le code.
    
3. <ins>CSS difficile à surcharger</ins>  
    Vous voulez mettre à jour le style d'un élément sur une page en particulier et il rompt sur une autre. Vous essayez de modifier le style sur l'autre page, mais vous vous retrouvez pris dans une guerre de spécificité.

C'est pour éviter ces problèmes qu'il existe des guidelines pour structurer le CSS.

---

## CSS modulaire

Il existe différentes conventions, les trois principales sont OCCSS, BEM et SMACSS.  
Toutes s'articulent autour d'une idée de base: écrire le CSS de manière modulaire.

On a tendance à penser à une page avec une approche *top-down*: un bandeau haut, une barre de navigation verticale, une liste d'articles, etc. Le problème est que cela conduit à écrire du code qui n'est pas réutilisable.

![](https://i.imgur.com/5WA4Ma7.jpg)

Le principe du CSS modulaire est de prendre du recul et de décomposer la page en morceaux de blocs discrets: un logo, une barre de recherche, des onglets, une liste de photos, un lecteur vidéo, etc.
Ces éléments peuvent être utilisés sur différentes pages à différents endroits. Il se trouve juste qu'ils sont assemblés de cette manière sur cette page mais qu'ils pourraient être disposés autrement sur une autre page.

Écrire du CSS de manière modulaire requiert de réfléchir avec une approche *bottom-up*: on commence avec des blocs réutilisables puis on les dispose, un peu comme des legos.

![](https://i.imgur.com/RIxrHDx.png)

### OOCSS

OOCSS, pour *Object-Oriented CSS*, a été créé en 2009 par Nicole Sullivan suite à son travail chez Yahoo. C'est le point d'origine du CSS modulaire.

* <ins>Éléments indépendants du contexte</ins>:  
   Le concept de base est que les objets sont des motifs réutilisables dont l'apparence n'est pas déterminée par le contexte.

  Par exemple, plutôt que de rendre tous les boutons du menu de navigation oranges et ceux de la page bleus, on utilise une classe pour déterminer la couleur du bouton.

* <ins>Classes réutilisables</ins>:  
  Utiliser des classes réutilisables pour les modèles visuels courants.

  Par exemple sur Amazon en 2009, il y avait des ombres portées sur presque tout, et elles étaient toutes un peu différentes. En normalisant ces ombres portées, vous pouvez optimiser le code et rendre le site plus performant.

* <ins>Ne pas utiliser d'ID pour sélecteur</ins>:  
  Un ID est unique par page. Utiliser des ID pour sélecteur empêche de pouvoir réutiliser le code ailleurs et est donc à éviter.

* <ins>Ne pas utiliser de balise HTML pour sélecteur</ins>:  
  Il y a plusieurs raisons de préférer les classes aux balises:
  1. Les balises HTML sont limitées. Il devrait toujours être possible d'utiliser une balise HTML sans avoir à écraser le code CSS qu'il y a derrière.
  2. Les balises utilisées peuvent changer. Par exemple si on souhaite utiliser un `<a>` plutôt qu'un `<button>`, il devrait être possible d'appliquer le même style sans avoir à modifier le CSS.
  3. Les balises ne montrent pas à quoi sert le code: `.logo` est plus facile à comprendre que `header a`.

  Note: On peut en revanche de combiner les classes et les balises, par exemple `.markdown h2`.

<ins>Exemple OOCSS</ins>:

``` html
<div class="media">
  <a href="#" class="img">
    <img src="" alt="" />
  </a> 
  <div class="bd"></div>
</div>
```

``` css
.media {} 
.media .img {} 
.media .img img {} 
.media .imgExt {} 
.bd {}
```

### BEM

BEM, pour *Block, Element, Modifier*, a été en 2009 à Yandex (moteur de recherche et serveur email Russe).

Le concept de base est le suivant:

* une page est composée *blocs*  
  Les blocs sont indépendants des page et ils peuvent être imbriqués les uns dans les autres.  
  Par exemple, vous pouvez avoir un bloc  qui est une liste d'onglet et placer à l'intérieur de ce bloc des boutons, qui est un type de bloc distinct. Les styles des deux blocs n'interagissent pas, il se trouve juste qu'il y en a un imbriqué dans l'autre.

* les blocs contiennent des *éléments*  
  Les éléments sont les parties constituantes d'un bloc et ils ne peuvent pas être utilisées en dehors.  
  Par exemple, les items d'un menu de navigation —
 cela n'a pas de sens de créer un bloc pour un item du menu: on crée un bloc pour le menu lui-même et les items du menu sont des éléments enfants.

* les blocs ou les éléments peuvent être *modifiés*  
  Les modificateurs définissent l'apparence et le comportement d'un bloc.  
  Par exemple, le fait que le menu soit horizontal ou vertical ou qu'un bouton est bleu ou orange.

BEM définit la convention de nommage suivante:

    .block-name__element--modifier

<ins>Par exemple</ins>:

``` html
<button class="btn btn--big btn--orange">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</button>
```

Notez que cette recommendation à changé en 2017: le double-tiret est remplacé par un simple underscore, et ce, pour pouvoir écrire des noms de classe dans les commentaires HTML — qui n'autorisent pas l'usage des doubles-tirets.

    .block-name__element_modifier

> Release 2.3.1 - May 25, 2017  
  BEM Naming Change  
  Initially we used the double dash style for BEM notation (--). Due to the fact that double dashes are problematic in an XML environment (which doesn't allow double dashes within comments), we have upgraded our syntax to use the single underscore style (_). This change is backward compatible for 18 months. But all components going forward are built with the single underscore BEM style.
  
Les guidelines données par BEM sont les suivantes:

* <ins>Utiliser des tirets pour les noms de bloc</ins>  
  En JavaScript, utiliser du camelCase pour nommer les variables est une pratique courante.  
  Cela permet de rester cohérent avec les méthodes Javascript, qui sont écrites elles aussi en camelCase.
  
  ``` js
  var redBox = document.getElementById('...');
  ```
  
  De la même manière, BEM préconise d'utiliser des tirets en CSS. Cela permet rester cohérent avec les propriétés CSS et d'éviter de mixer deux notations.
  
  ``` css
  .some-class {
     font-weight: 10em;
  }
  ```

* <ins>Séparer les sélecteurs CSS des sélecteurs JavaScript</ins>.  
  Il existe différentes conventions pour parvenir à ce but:

  * Préfixer les noms de classe utilisé dans le code JavaScript par `js-`, de cette manière toute personne comprend immédiatement pourquoi cette classe existe.

    ``` html
    <div class="site-navigation js-site-navigation">
    ```

  * Une autre alternative est d'utiliser l'attribut `rel` pour définir la relation entre un élément HTML et JavaScript.

    ``` html
    <div class="site-navigation" rel="js-site-navigation">
    ```

  * Ne pas utiliser les attributs `data-` comme hook JavaScript. Par définition, les attributs data permettent de stocker des données personnalisées, il est préférable de distinguer les deux.

    ``` html
    <li class="js-stream-item stream-item"
        data-item-id="9417"
        data-item-type="tweet"
        id="stream-item-tweet-9417"></li>
    ```

* <ins>Utiliser des sélecteurs simples</ins>.  
  Les sélecteurs doivent toujours être suffisamment spécifiques pour ne pas avoir à être imbriqués. Par exemple, on utilise `.btn__price` et non `.btn .btn__price`.

* <ins>Utiliser des mixes de sélecteurs</ins> pour éviter de dupliquer le code CSS.  
  Par exemple, pour appliquer une ombre portée ou le style d'un lien, utiliser une classe spécifique plutôt que de dupliquer le CSS.

  ``` html
  <nav class="menu">
    <a class="link menu__item" href=""></a>
    <a class="link menu__item" href=""></a>
    <a class="link menu__item" href=""></a>
  </nav>
  ```

<ins>Exemple BEM</ins>:

``` html
<div class="media media--inverted">
  <a href="#" class="media__image-wrapper">
    <img class="media__image" src="" alt="" />
  </a>
  <div class="media__content"></div>
</div>
```

``` css
.media {}
.media--inverted {}
.media__image-wrapper {}
.media__image {}
.media__content {}
```

Équivalent en SCSS:

``` scss
.media {
  &--inverter {}
  &__image-wrapper {}
  &__image {}
  &__content {}
}
```

Voir aussi: [Official BEM Methodology Quick Start](https://en.bem.info/methodology/quick-start/)

### SMACSS

SMACSS, pour *Scalable & Modular Architecture for CSS*, a été crée en 2011 par Jonathan Snook suite à son travail chez Yahoo Mail. SMACSS ajoute le concept de **catégories** de composants. Il existe 5 catégories:

* <ins>Base</ins>  
  Les styles de base définissent l'apparence d'un élément n'importe où sur la page. Cela garantit que les styles soient les mêmes d'un navigateur à l'autre. Pour sélectionner des éléments de base, on utilise les balises HTML.

  ``` css
  html {
    margin: 0;
    font-family: sans-serif;
  }
  a {
    color: #000;
  }
  button {
    color: #ababab;
    border: 1px solid #f2f2f2;
  }
  ```

* <ins>Layout</ins>  
  Les styles de layout divisent la page en sections principales: bandeau haut, bandeau bas, navigation verticale, contenu. Pour sélectionner des éléments qui constituent le layout, on utilise les ID.

  ![](https://i.imgur.com/GvetpJ7.png)

  Les éléments à l'intérieur du layout peuvent être placés (bordures, alignements, marges, etc).  
  Les classes permettant de placer les éléments sont préfixées par la lettre `l-`.

  ``` css
  #header {
      background: #fcfcfc;
  }
  #header .l-right {
      float: right;
  }
  #header .l-align-center {
      text-align: center;
  }
  ```

  On peut utiliser ces classes partout dans la page, toujours en utilisant le préfixe `l-.`

  ``` css
  .l-full-width {
      width: 100%;
  }
  ```

* <ins>Module</ins>  
  À l'intérieur des éléments de layout sont placés les modules, tels que des boîtes, des cartes, des listes, des galeries, etc. Les modules sont réutilisables partout dans le page, même principe que BEM.

  En SMACSS, pour distinguer différents éléments dans différents contextes, on utilise deux tirets:

  ``` html
  <div class="box">
      <div class="box--label">This is box label</div>
      <ul class="box--list list">
          <li class="list--li">Box list element</li>
      </ul>
  </div>
  ```

  ``` css
  .box--label {
      color: blue;
  }
  .card--label {
      color: red;
  }
  ```

* <ins>State</ins>  
  Les styles d'état décrivent comment le module s'affiche dans des situations dynamiques: caché ou ouvert, désactivé, sélectionné, etc. Les classes sont préfixées de `is-`.

  ``` html
  <header id="header">
      <ul class="nav">
          <li class="nav--item is-selected">Contact</li>
          <li class="nav--item">About</li>
      </ul>
  </header>
  ```
  
  ``` css
  .nav--item.is-selected {
      color: #fff;
  }
  ```


* <ins>Theme</ins>  
  Les styles de thème sont utilisés pour définir les couleurs, formes, bordures, ombres, etc.

  ``` html
  <button class="button-large">Like</button>
  ```

  ``` css
  .button-large {
      width: 60px;
      height: 60px;
  }
  ```

### En conclusion

Toutes ces conventions de nommage sont différentes mais similaires.  
De manière générale, on distingue 3 types d'items
* les modules (objects, blocs ou composants) sont indépendants du contexte et réutilisables partout dans la page
* les éléments enfant sont les parties constituantes du module et qui ne peuvent pas exister en dehors
* les modifieurs (ou thèmes) altèrent l'apparence du module et son placement
 
 Les styles des éléments peuvent être organisés en différentes catégories:
 * les règles de base définissent le style par défaut des éléments HTML.  
   `a`, `li`, `h1`

 * les règles de layout définissent comment les éléments sont placés mais pas leur apparence visuelle.  
   `.l-centered`, `.l-grid`, `.l-fixed-top`

 * les règles des modules définissent l'apparence des éléments.  
   `.m-profile`, `.m-card`, `.m-modal`

 * les règles d'état sont ajoutées par JavaScript.  
   `.is-hidden`, `.is-collapsed`, `.is-active`

 * les règles utilitaires (helpers) modifient l'apparence d'un élément.  
   `.h-uppercase`, `.h-nowrap`, `.h-muted`
 
 Les principales conventions à respecter sont
 * ne pas utiliser les ID, sauf pour les éléments qui ne peuvent pas se répéter comme le layout de la page
 * ne pas imbriquer le CSS
 * préfixer les noms de classes pour indiquer à quoi elles servent
 * choisir un format de nommage et le garder dans tout le projet
 
 Source: [What is Modular CSS?](https://spaceninja.com/2018/09/17/what-is-modular-css/)
 
---

## Variables CSS

De la même manière que les sélecteurs CSS, vos variables CSS (natives ou celles de préprocesseurs comme Sass ou Less)
devraient être sémantiques et faciles à comprendre. Il n'existe pas de préconisation sur le sujet mais pour rendre vos variables facilement compréhensible, vous pouvez suivre le format suivant:

    type-importance

* <ins>type</ins>:   
  par exemple `clr` pour les couleurs, `fs` pour les tailles de polices, `grid` pour les tailles de grilles, etc.

* <ins>importance</ins>:  
  `base` pour la valeur par défaut (du corps de texte), puis de manière logique `primary`/`secondary` ou `alpha`/`beta` ou encore `giga`/`micro` suivant le type de variable.

### Couleur

* La plupart des marques ont une <ins>couleur dominante</ins> pour leur marque, puis des <ins>couleurs subsidiaires</ins> qui complètent cette couleur.

* Outre les couleurs de la marque, il y a couramment des <ins>couleurs neutres</ins> utilisées pour former la base de tout contenu.

* Une couleur particulière peut avoir une <ins>gamme de teintes et de nuances</ins>, par exemple une couleur de fond, une couleur pour l'écriture et une pour la bordure.

En gardant ces éléments en têtes, on peut constituer une liste de noms de variables de couleur facilement compréhensibles:

``` scss
/* couleur de base, avec une teinte et une nuance
   - typiquement utilisé pour la couleur fond du site et la typographie */
$clr-base:    #666;
$clr-base-lt: #999;
$clr-base-dk: #333;

/* couleur dominante - skyblue
   - avec des teintes et nuances via des fonctions Sass */
$clr-primary:     skyblue;
$clr-primary-lt:  lighten($clr-primary, 5%);
$clr-primary-ltr: lighten($clr-primary, 10%);
$clr-primary-dk:  darken($clr-primary, 5%);
$clr-primary-dkr: darken($clr-primary, 10%);

/* couleur secondaire - hotpink
   - avec des teintes et nuances via des fonctions Sass */
$clr-secondary:     hotpink;
$clr-secondary-lt:  lighten($clr-secondary, 5%);
$clr-secondary-ltr: lighten($clr-secondary, 10%);
$clr-secondary-dk:  darken($clr-secondary, 5%);
$clr-secondary-dkr: darken($clr-secondary, 10%);

/* couleurs neutres */
$clr-ntrl-min: #fff;
$clr-ntrl-max: #000;
```

1. Toutes les variables de couleur sont préfixées de `clr-`.

2. Les couleurs de la marque sont ordonnées par ordre d'importance: `primary`, `secondary`, `tertiary`, `quaternary`, etc.

3. Les teintes et nuances sont indiquées en suffixe du nom de la couleur dont elles dérivent:
   * `lt` pour light,
   * `ltr` por lighter,
   * `ltst` pour lightest, etc.

4. Vous pouvez également ajouter des couleurs telles que `$clr-success`, `$clr-warning`, etc, en ajoutant les teintes et nuances de ces couleurs toujours sur le même schéma.

### Taille de police

Toutes les variables de taille de police sont préfixées de `fs-` (pour font-size) puis sont ordonnées de grandes tailles (pour le logo par exemple) à petites tailles (pour les éléments sub par exemple).

``` scss
/* taille de base - appliqué au contenu de la page */
$fs-base: 16px;

/* tailles plus grandes que les éléments de heading */
$fs-giga: 80px;
$fs-mega: 70px;
$fs-kilo: 60px;

/* tailles des éléments de heading */
$fs-h1: 36px;
$fs-h2: 32px;
$fs-h3: 28px;
$fs-h4: 24px;
$fs-h5: 20px;
$fs-h6: 18px;

/* tailles plus petites que le corps de texte */
$fs-milli: 14px;
$fs-micro: 10px;
$fs-nano:  8px;
```

### Famille de police

Toutes les variables de famille de police sont préfixées de `ff-` (pour font-family) puis sont ordonnées par ordre de prépondérance: contenu, titre, sous-titre, icone.

``` scss
$ff-base:      'Helvetica Neue', Helvetica, Arial, sans-serif;
$ff-alt-alpha: 'Open Sans', sans-serif;
$ff-alt-beta:  'Roboto', sans-serif;
$ff-icon:      'My Icon Font';
```

Source: [Make Your CSS Variable Names Suck Less](https://fixate.it/blog/make-your-css-variable-names-suck-less)
