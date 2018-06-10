---
title: MustacheJS
category: Web, JavaScript, Library
---

{% raw %}

MustacheJS est une librairie qui permet d'utiliser des templates pouur afficher un objet.
Cette librairie est utile pour les anciens navigateurs qui ne supportent pas les template litterals.

<ins>Exemple</ins>:

* `data.json`

  ``` json
  {
      "articles" : [
          {
              "title"      : "My title",
              "description": "My description"
          },
          {
              "title"      : "My title2",
              "description": "My description2"
          }
      ]
  }
  ```

* `index.html`

  ``` html
  <div id="articlebox"></div>

  <script type="text/template" id="articlestpl">
      {{#articles}}                       # For each articles
          <div class="article">
              <h1>{{title}}</h1>          # Display the title attribute
              <p>{{description}}</p>
          </div>
      {{/articles}}
  </script>

  <script src="jquery.js" type="text/javascript"></script>
  <script src="mustache.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  ```

* `app.js`

  ``` js
  $.getJSON('data.json', function(data){
      var template = $('#articlestpl').html();
      var html     = Mustache.to_html(template, data);

      $('#articlebox#').html(html);
  });
  ```

{% endraw %}