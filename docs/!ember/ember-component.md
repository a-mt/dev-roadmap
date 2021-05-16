---
title: Composant
category: Web, JavaScript, Library, Ember
---

{% raw %}
## Créer un composant

Un composant est une unité réutilisable. Il peut être inclus dans un template sous la forme d'un tag personnalisé (`<MonComposant />`) pour s'occuper de la logique et contenu d'un bloc.

### Définir un template

Un composant a, a minima, un template.

1. Créer un template dans components  
   <ins>app/components/hello-world.hbs</ins>:

    ```
    <p>Hello World</p>
    ```

2. Utiliser le composant dans un autre template  
   <ins>app/templates/application.hbs</ins>:

    ```
    {{page-title "Emberjs App"}}

    <h1>Mon Application</h1>
    <HelloWorld />

    {{outlet}}
    ```

* On peut soit invoquer un composant sous forme de tag, soit sous forme de helper. Les exemples ci-dessous sont équivalents:

  ``` html
  <MyChild @childClickCount={{this.totalClicks}} />
  ```
  ```
  {{my-child childClickCount=totalClicks}}
  ```

### Dans un sous-répertoire

* On peut mettre un composant dans un sous-répertoire de components  
  <ins>app/components/util/lorem.hbs</ins>:

  ```
  <p>Lorem ipsum dolor sit amet</p>
  ```

* Pour l'inclure, on utilise deux fois deux-points (::) comme séparateur:

  ```
  <Util::Lorem />
  ```

### Ajouter de la logique

* Chaque composant peut définir sa propre logique, de la même manière qu'un controlleur (avec des variables, des actions et des variables suivies). La différence:

  1. c'est un fichier avec le même nom mais d'extension .js, et placé dans <ins>app/components</ins>
  2. la classe exportée hérite de Component et non plus de Controller

   <ins>app/components/hello-world.js</ins>:

    ``` js
    import Component from '@glimmer/component';

    export default class HelloWorld extends Component {
      username = "Bob";
    }
    ```

   <ins>app/components/hello-world.hbs</ins>:

    ```
    <p>Hello {{username}}</p>
    ```

---

## Slots

1. Le parent peut définir du contenu entre les balises du composant   
   <ins>app/templates/application.hbs</ins>:

    ```
    <HelloWorld>
      <h2>Lorem ipsum</h2>
    </HelloWorld>
    ```

2. Et le composant peut afficher ce contenu en appelant `yield`:  
   <ins>app/components/hello-world.hbs</ins>:

    ```
    <h1>Hello World</h1>

    {{yield}}
    ```

### Multiples slots

1. Le parent peut définir le contenu de différents emplacements comme suit:  
   <ins>app/templates/application.hbs</ins>:

    ```
    <Popup>
      <:title>
        <h3>Header</h3>
      </:title>

      <:default>
        <img src="//placehold.it/300x100" />
      </:default>
    </Popup>
    ```

2. Et le composant peut afficher un bloc nommé en appelant `yield to="blocname"`  
   <ins>app/components/popup.hbs</ins>:

    ```
    <div class="popup">
      <header class="popup-header">
        {{yield to="title"}}
      </header>

      <article class="popup-body">
        {{yield}}
      </article>
    </div>
    ```

3. On peut vérifier si un bloc a été définit par le parent ou non avec `has-block`, ce qui peut permettre d'ajouter du contenu par défaut.

    ```
    <div class="popup">
      <header class="popup-header">
        {{#if (has-block "title")}}
          {{yield to="title"}}
        {{else}}
          Default title
        {{/if}}
      </header>

      <article class="popup-body">
        {{#if (has-block)}}
          {{yield}}
        {{else}}
          Default content
        {{/if}}
      </article>

      <footer id="popup-footer">
        {{#if (has-block "footer")}}
          {{yield to="footer"}}
        {{else}}
          Default footer
        {{/if}}
      </footer>
    </div>
    ```

## Attributs HTML

1. Le parent peut passer des attributs HTML:  
   <ins>app/templates/application.hbs</ins>:

    ```
    <HelloWorld id="custom-id" />
    ```

2. Et le composant, peut ajouter ces attributs sur un élément avec `...attributes`

    ```
    <h1 ...attributes>Hello World</h1>
    ```

## Arguments

1. Le parent peut également passer des arguments:  

    ```
    <HelloWorld @username={{"Bob"}} />
    ```

2. Et le composant peut accéder aux arguments avec `this.args` ou @:  
   <ins>app/components/hello-world.hbs</ins>:

    ```
    <h1>Hello {{this.args.username}}</h1>
    <h1>Hello {{@username}}</h1>
    ```

---

## Composants natifs

* Nativement, Ember définit deux composants: `<Input>` et `<Textarea>`.

  ```
  <label for="input-name">Name:</label>
  <Input
    @id="input-name"
    @value={{this.name}}
    disabled={{this.isReadOnly}}
    maxlength="50"

    {{on "input" this.validateName}}
    {{on-key "Enter" this.doSomething}}
    {{on-key "Escape" this.doSomethingElse event="keydown"}}
  />
  ```

  ```
  <label for="user-comment">Comment:</label>
  <Textarea
    @id="user-comment"
    @value={{this.userComment}}
    rows="6"
    cols="80"
  />
  ```

[Built-in Components](https://guides.emberjs.com/release/components/built-in-components/)

{% endraw %}