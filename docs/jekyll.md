---
title: Jekyll
category: Webenv
---

{% raw %}

Jekyll est un générateur de site statique. Il permet notamment
1. de convertir les fichiers Markdown en fichiers HTML
2. d'utiliser des layouts (pour mettre en commun header et footer par exemple)
3. d'inclure de la logique (conditions, boucles, remplacements).

Il est notamment utilisé par [Github Pages](github-pages.md)

## Installer & lancer

1. Installler Jekyll

        sudo apt-get install ruby ruby-dev
        sudo gem install jekyll bundler

2. Créer un projet  
   À minima, il faut un fichier `_config.yml` pour que le projet soit considéré comme un projet Jekyll.
   Les valeurs de configuration par défaut sont indiquées dans [la doc](https://jekyllrb.com/docs/configuration/#default-configuration).  
   On peut aussi créer un projet Jekyll entier :

       jekyll new myproject

3. Lancer Jekyll  
   On peut soit lancer un serveur (WEBRick) pour prévisualiser le site en local

       jekyll serve

   Le site est accessible à http://localhost:4000.
   La génération est relancé à chaque modification de fichier à l'intérieur du projet, ce qui permet de rapidement vérifier l'impact des modifications sur le résultat final.
   
   Ou lancer la génération du site statique

       jekyll build

   Le résultat (fichiers html, css, js) est généré dans le répertoire `̀_site`

---

## Structure

La structure d'un projet Jekyll est simple : les pages du site se situent à la racine du projet avec le fichier de configuration `_config.yml`. Une fois Jekyll lancé, le site statique est généré dans le répertoire `/_site`.

    _config.yml
    mapage.md
    _site/
      mapage.html

Le contenu du répertoire `/_site` est accessible avec un navigateur.  
Lancé avec `jekyll serve` en local, on accède à la page `_site/mapage.html` (page générée à partir de `mapage.md`) via l'url http://localhost:4000/mapage ou http://localhost:4000/mapage.html.

Au delà de la structure minimale ci-dessus, il est possible d'utiliser d'autres fonctionnalités décrites plus en détail dans la suite de l'article :

| Path                              | Description                          |
|---                                |---                                   |
| _config.yml                       | Fichier de configuration             |
| _site/                            | Site généré                          |
|||
| mondossier/mapage.md              | Page                                 |
| _posts/2016-12-01-hello.md        | Post                                 |
| _drafts/2017-09-12-hello-world.md | Brouillon de post                    |
| _macollection/mapage.html         | Post de la collection "macollection" |
|||
| _layouts/monlayout.html           | Layout "monlayout"                   |
| _includes/toc.html                | Fichier à inclure                    |
| _data/lang.yml                    | Fichier de données                   |

---

## Fichiers

Tout fichier texte (markdown, html, json, etc) peut être interprété par Jekyll, pourvu qu'il commence par un bloc de metadonnées.  
Un fichier interprété peut
1. être convertit par Jekyll. Les fichiers Markdown sont traduits en fichiers HTML
2. contenir des instructions Liquid (qui est un langage de templating) - pour afficher la valeur d'une variable, effectuer des conditions ou encore des boucles...

### Metadonnées

Pour que le contenu du fichier soit interprété, il faut obligatoirement que le fichier commence par un bloc de metadonnées.
Les metadonnées se situent en début de fichier, au format YAML, et sont délimitées par trois tirets au début et à la fin.
Par exemple `mapage.html` :

    ---
    variable: valeur
    ----

    Le contenu de ma page

Si le bloc de metadonnées est vide, les trois tirets de fin deviennent optionnels.

    ----

    Le contenu de ma page

### Liquid

Comme précisé précedemment, un fichier interprété peut utiliser Liquid. Sa [syntaxe complète](liquid.md) est décrite dans un article à part.
Jekyll définit des filtres et tags qui lui sont spécifiques, ainsi que des [variables](#variables), comme `page`.

Exemple d'utilisation de Liquid dans un fichier :

    ---
    tags: ["tag1","tag2"]
    ---

    Le contenu de ma page
    Tags : {% for tag in page.tags %}{{ tag }}{% unless forloop.last %}, {% endunless %}{% endfor %}

Filtres et tags qui n'ont de sens que dans le contexte d'un blog :
insérer un lien vers une page ou un post Jekyll, insérer un gist.

    {{ "/assets/style.css" | relative_url }} 
    {{ "/assets/style.css" | absolute_url }} 

<!-- -->

    {% post_url 2010-07-21-name-of-post %}
    {% link _collection/name-of-document.md %}

<!-- -->

    {% gist parkr/931c1c8d465a04042403 %}

### Markdown

Les fichiers Markdown qui contiennent un bloc de metadonnées sont convertis en fichiers HTML.  
Les extensions considérées comme Markdown sont `.markdown`,`.mkdown`,`.mkdn`,`.mkd` et `.md`

La syntaxe Markdown supportée dépend du parser utilisé.  
Par défaut, il s'agit de Kramdown, et sa syntaxe est décrite dans la [doc Kramdown](https://kramdown.gettalong.org/quickref.html).

### IAL

Une fonctionnalité qui rend Kramdown intéressant par rapport aux autres parsers est la possibilité des définir des attributs aux blocs (comme la classe et l'id), ou *inline attribute list* en anglais (IAL).

```
* item1
* item2
{: .class #id key="value"}
```

Les IAL peuvent être définis à l'avance puis appelés à l'intérieur du document.

```
{:refdef: .class #id key="value"}

* item1
* item3
{:refdef}
```

Ce qui génère dans les deux cas :

``` html
<ul class="class" id="id" key="value">
  <li>item1</li>
  <li>item2</li>
</ul>
```

### Table des matières

Kramdown peut également générer la table des matières (*Table of contents* ou toc) de la page en cours, à partir des titres présents dans le fichier

```
* TOC
{:toc}
```

Il n'est pas possible de générer la table des matières d'un fichier différent du fichier en cours avec Kramdown
(pour le faire dans le layout par exemple). Si c'est l'effet souhaité, alors il est nécessaire de parser le HTML généré
(exemple: [jekyll-toc](https://github.com/allejo/jekyll-toc)).

---

## Utiliser un layout

Un layout est un fichier qui contient le HTML commun à toutes les pages (doctype, header, footer, ...).

* Pour qu'une page utilise un layout, il faut que le layout à utiliser soit indiqué dans les metadonnées de la page.  
  Par exemple `mapage.html` :

      ---
      layout: default
      ----

      <p>Le contenu de ma page</p>

* On peut aussi définir un layout pour toutes les pages, en définissant une valeur par défaut dans le fichier `_config.yml`

      defaults:
        -
          scope:
            path: "" # an empty string here means all files in the project
          values:
            layout: "default"

  Les pages peuvent alors ne contenir aucune metadonnées ou écraser la valeur par défaut

      ----

      <p>Le contenu de ma page</p>

## Créer un layout

Le thème du projet définit un layout par défaut : `default`.  
On peut aussi créer ses propres layouts en créant un répertoire `/_layouts` et en y plaçant des fichiers html `nomdulayout.html`.
Ce fichier est interprété qu'il contienne un bloc de metadonnées ou non.

Exemple de layout minimal :

    <!DOCTYPE html>
    <html>
      <head>
        <title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
      </head>
      <body>
        {{ content }}
      </body>
    </html>

`{{ content }}` est remplacé par le contenu de la page qui utilise ce layout.

## Personnaliser le layout du thème

Si on crée un fichier `/_layouts/default.html`, c'est ce fichier qui sera utilisé plutôt que le `default.html` du thème,
ce qui nous laisse la possibilité de le personnalliser.  
Si laissé par défaut, le thème des pages Github est `jekyll-theme-primer`. On peut donc

1. Chercher l'emplacement du thème sur le disque

       gem contents jekyll-theme-primer | sed '1{s/[^/]*$//;q}' # Affiche le path du premier fichier trouvé

2. Copier le fichier `_layouts/default.html` du thème et le coller dans le répertoire du projet.  
   Puis personnaliser le layout local au projet.

---

## Pages

Les ***pages*** sont des pages génériques, indépendantes des autres, qui n'ont pas de date ni de classification.  
Par exemple une page de contact, un plan du site, les CGV...  
Les pages se situent généralement à la racine du projet, mais tous les répertoires qui ne commencent pas par `_` sont également lus et peuvent contenir des pages.

Une page commence par un bloc de metadatas, même vide : le début du fichier commence donc obligatoirement par `---`.
Deux exemples de pages valides :

    ---
    layout: default
    last-modified: 2017-10-13 11:52:46
    ----

    Le contenu de ma page

<!-- -->

    ----

    Le contenu de ma page

Les metadatas sont au format [YAML](yaml.md) et peuvent n'importe quelles données.  
Elles sont accessibles à l'intérieur de la page avec la variable `page` :

    ---
    layout: default
    last-modified: 2017-10-13 11:52:46
    ---

    Le contenu de ma page.
    Edité le {{ page["last-modified"] | date: "%b %-d, %Y" }}

Parmis les metadatas, 3 en particulier modifient le comportement de Jekyll :
* `layout`    : spécifie le layout à utiliser
* `published` : mettre à `false` pour la page soit ignorée par le build
* `permalink` : définit l'URL de la page (override des configurations).

### URL

Le [permalink](#permalinks) par défaut d'une page est `/:path/:basename:output_ext`.  
Une page `/mondossier/mapage.md` sera donc accessible via l'url `/mondossier/mapage`.

### Variables

La liste de toutes les pages du site est dans `site.pages`.  
On peut donc créer une page d'index, ou sitemap, qui liste toutes les pages du site.

    [
      #<Jekyll:Page @name="awk.md">,
      #<Jekyll:Page @name="composer.md">,
      #<Jekyll:Page @name="github-pages.md">,
      #<Jekyll:Page @name="grep.md">,
      #<Jekyll:Page @name="index.md">,
      #<Jekyll:Page @name="json.md">,
      #<Jekyll:Page @name="search.html">,
      #<Jekyll:Page @name="search.json">,
      #<Jekyll:Page @name="style.scss">,
      #<Jekyll:Page @name="yaml.md">
    ]

La liste des pages du site ayant pour extension générée .html est dans `site.html_pages`.

    [
      #<Jekyll:Page @name="awk.md">,
      #<Jekyll:Page @name="composer.md">,
      #<Jekyll:Page @name="github-pages.md">,
      #<Jekyll:Page @name="grep.md">,
      #<Jekyll:Page @name="index.md">,
      #<Jekyll:Page @name="json.md">,
      #<Jekyll:Page @name="search.html">,
      #<Jekyll:Page @name="yaml.md">
    ]

Valeur de `<Jekyll:Page @name="awk.md">` :

    {
      "name": "awk.md",
      "url": "/awk.html",
      "dir": "/",
      "path": "awk.md",
      "layout": "default",
      "content": "<p>..."
    }

---

## Posts

Les ***posts*** héritent des caractéristiques des *pages*.
Ce sont des pages qui ont un ordre chronologique (une date) et qui peuvent être classifiées avec des catégorie(s) et des tags.  
Les posts se situent obligatoirement dans le répertoire `_posts` et doivent respecter la convention de nommage `YEAR-MONTH-DAY-title.MARKUP`
(par exemple: `2017-09-12-hello-world.md`).

Les posts ont également des metadatas comprises par Jekyll (en plus de `layout`, `published` et `permalink`) :
* `date`      : définit la date du post (override de la date du nom de fichier)
* `category`  : catégorie principale du post
* `categories`: liste des catégories du post <sup>[1]</sup>
* `tags` : liste des tags du post <sup>[1]</sup>

<sup>[1]</sup> liste YAML ou chaine de caractères avec items séparés par des espaces

### URL

Le [permalink](#permalinks) par défaut d'un post est `/:categories/:year/:month/:day/:title.html`.  
Une page `/_posts/2017-09-12-hello-world.md` sans catégories sera donc accessible via l'url `/2017/09/12/hello-world`.  
La même page avec pour metadata `categories: cat1 cat2` sera accessible via l'url `/cat1/cat2/2017/09/12/hello-world`.

### Variables

La liste de tous les posts du site, triés par ordre chronologique décroissant, est dans `site.posts`.

    [
      #<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>
    ]

La liste des posts groupés par tags, dans `site.tags`.

    {
      "tag1"=>[#<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>],
      "tag2"=>[#<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>]
    }

La liste des posts groupés par catégories dans `site.categories`.

    {
      "cat"=>[#<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>]
    }

Valeur de `<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>` :

    {
      "next": null,
      "previous": null,
      "collection": "posts",
      "id": "/cat/2017/09/08/mon-post",
      "url": "/cat/2017/09/08/mon-post.html",
      "path": "_posts/2017-09-08-mon-post.md",
      "relative_path": "_posts/2017-09-08-mon-post.md",
      "layout": "default",
      "output": "<!DOCTYPE html>...",
      "content": "<p>Hello World</p>\n",
      "excerpt": "<p>Hello World</p>\n",
      "draft": false,
      "title": "Mon Post",
      "slug": "mon-post",
      "ext": ".md",
      "date": "2017-09-08 00:00:00 +0200",
      "categories": ["cat"],
      "tags": ["tag1","tag2"]
    }

Notons que si le post ne contient pas de metadata `excerpt`, le résumé est généré automatiquement à partir du premier bloc de texte du fichier (du début du fichier à la première occurence de `excerpt_separator`, qui par défaut est un retour à la ligne).

---

## Brouillons

Les ***brouillons*** sont des posts en cours de rédaction.  
Les posts se situent obligatoirement dans le répertoire `_drafts` et doivent respecter la convention de nommage `YEAR-MONTH-DAY-title.MARKUP` tout comme les posts.

Les brouillons ne sont pas visibles dans le build du projet à moins d'utiliser la commande `jekyll serve --drafts` ou `jekyll build --drafts`.

### URL

Le [permalink](#permalinks) d'un brouillon est celui des posts, c'est à dire par défaut `/:categories/:year/:month/:day/:title.html`.  
Une page `/_drafts/2017-09-12-hello-world.md` sans catégories sera donc accessible via l'url `/2017/09/12/hello-world`.  

### Variables

Les brouillons sont considérés comme des posts et sont donc dans la liste `site.posts`, au même titre que les posts publiés.

    [
      #<Jekyll::Document _drafts/2017-09-10-hello-world.md collection=posts>,
      #<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>
    ]

Valeur de `<Jekyll::Document _drafts/2017-09-10-hello-world.md collection=posts>` :

    {
      "next": #<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>,
      "previous": null,
      "collection": "posts",
      "id": "/2017/09/10/hello-world",
      "url": "/2017/09/10/hello-world.html",
      "path": "_drafts/2017-09-10-hello-world.md",
      "relative_path": "_drafts/2017-09-10-hello-world.md",
      "layout": "default",
      "output": "<!DOCTYPE html>...",
      "content": "<hr />\n\n<p>Hello World</p>\n",
      "excerpt": "<hr />\n\n",
      "draft": true,
      "title": "Hello World",
      "slug": "hello-world",
      "ext": ".md",
      "date": "2017-09-10 00:00:00 +0200",
      "categories": [],
      "tags": []
    }

---

## Collections

Les posts sont une ***collection*** gérée nativement par Jekyll. Mais il est également possible de créer ses propres collections.  
Les pages d'une collection se situent obligatoirement dans un répertoire `_nomcollection`.

Pour que Jekyll gère cette collection, il est nécessaire de l'indiquer dans le fichier `_config.yml` :

``` yml
collections:
  nomcollection:
    output: true
```

### URL

Le [permalink](#permalinks) par défaut d'une collection est `/:collection/:name`.  
Une page `_nomcollection/mon-post.html` sera donc accessible via l'url `/nomcollection/mon-post`.

### Variables

La liste des collectons est dans `site.collections`.

    [
      {
        "label": "macollection",
        "files": [],
        "directory": "/home/myself/Documents/PROJECTS/dev-roadmap/docs/_macollection",
        "output": true,
        "docs": [
          #<Jekyll::Document _macollection/mon-post.md collection=macollection>,
          #<Jekyll::Document _macollection/mon-post2.md collection=macollection>
        ],
        "relative_directory": "_macollection"
      },
      {
        "label": "posts",
        "files": [],
        "directory": "/home/myself/Documents/PROJECTS/dev-roadmap/docs/_posts",
        "output": true,
        "docs": [
          #<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>,
          #<Jekyll::Document _drafts/2017-09-10-hello-world.md collection=posts>
        ],
        "relative_directory": "_posts",
        "permalink": "/:categories/:year/:month/:day/:title:output_ext"
      }
    ] 

La liste des pages d'une collection peut aussi être récupérée via `site.nomcollection`

    [
      #<Jekyll::Document _macollection/mon-post.md collection=macollection>,
      #<Jekyll::Document _macollection/mon-post2.md collection=macollection>
    ]

La liste des pages toutes collections confondues peut être récupérée via `site.documents`

    [
      #<Jekyll::Document _posts/2017-09-08-mon-post.md collection=posts>,
      #<Jekyll::Document _drafts/2017-09-10-hello-world.md collection=posts>,
      #<Jekyll::Document _macollection/mon-post.md collection=macollection>,
      #<Jekyll::Document _macollection/mon-post2.md collection=macollection>
    ] 

Valeur de `<Jekyll::Document _macollection/mon-post.md collection=macollection>` :

    {
      "next": <Jekyll::Document _macollection/mon-post2.md collection=macollection>,
      "previous": null,
      "collection": "macollection",
      "id": "/macollection/mon-post",
      "url": "/macollection/mon-post.html",
      "path": "_macollection/mon-post.md",
      "relative_path": "_macollection/mon-post.md",
      "layout": "default",
      "output": "<!DOCTYPE html>...",
      "content": "<hr />\n\n<p>hello world</p>\n"
      "excerpt": "<hr />\n",
      "draft": false,
      "title": "Mon Post",
      "slug": "mon-post",
      "ext": ".md",
      "date": "2017-10-14 14:13:17 +0200",
      "categories": [ ],
      "tags": [ ]
    } 

---

## Fichiers statiques

Les ***fichiers statiques*** sont des fichiers qui ne commencent pas par des metadatas (délimitées par `---`) et donc ne sont pas gérés par Jekyll : par exemple des fichiers PDF, des images ou même des fichiers HTML statiques - sans metadatas (comme une doc à télécharger).

### Variables

La liste des fichiers statiques est dans `site.static_files`.

    [
      #<Jekyll:StaticFile @name="common.js">,
      #<Jekyll:StaticFile @name="exemple.html">,
      #<Jekyll:StaticFile @name=".eslintrc">,
      #<Jekyll:StaticFile @name=".gitattributes">,
      #<Jekyll:StaticFile @name=".npmignore">,
      #<Jekyll:StaticFile @name=".travis.yml">,
      #<Jekyll:StaticFile @name="anchor.js">,
      #<Jekyll:StaticFile @name="anchor.min.js">,
      #<Jekyll:StaticFile @name="banner.js">,
      #<Jekyll:StaticFile @name="anchor.js">,
      #<Jekyll:StaticFile @name="favicon.ico">,
      #<Jekyll:StaticFile @name="anchorjs-extras.eot">,
      #<Jekyll:StaticFile @name="anchorjs-extras.svg">,
      #<Jekyll:StaticFile @name="anchorjs-extras.ttf">,
      #<Jekyll:StaticFile @name="anchorjs-extras.woff">,
      #<Jekyll:StaticFile @name="fonts.css">,
      #<Jekyll:StaticFile @name="grunticon.loader.js">,
      #<Jekyll:StaticFile @name="icons.data.png.css">,
      #<Jekyll:StaticFile @name="icons.data.svg.css">,
      #<Jekyll:StaticFile @name="icons.fallback.css">,
      #<Jekyll:StaticFile @name="grunticon-link.png">,
      #<Jekyll:StaticFile @name="anchoring-links.png">,
      #<Jekyll:StaticFile @name="anchorjs_logo.png">,
      #<Jekyll:StaticFile @name="anchorlinks2.png">,
      #<Jekyll:StaticFile @name="gh-link.svg">,
      #<Jekyll:StaticFile @name="gh_link.svg">,
      #<Jekyll:StaticFile @name="hyperlink.svg">,
      #<Jekyll:StaticFile @name="link.svg">,
      #<Jekyll:StaticFile @name="mini-logo.png">,
      #<Jekyll:StaticFile @name="primer-md.png">,
      #<Jekyll:StaticFile @name="scripts.js">,
      #<Jekyll:StaticFile @name="styles.css">
    ]

Valeur de `#<Jekyll:StaticFile @name="common.js">`:

    {
      "name": "common.js",
      "path": "/assets/js/common.js",
      "basename": "common",
      "extname": ".js",
      "collection": null,
      "modified_time": "2017-10-03 08:13:19 +0200",
      "layout": "default"
    }

---

## Assets

Jekyll peut également se charger de la convertion des ***assets*** :
- Fichiers Scss et Sass en CSS (extension .scss ou .sass)
- Fichiers Coffeescript en JS (extension .coffee)

Pour que Jekyll prenne en charge un asset et le convertisse, le fichier doit commencer par **deux lignes** de trois tirets:

    ---
    ---

    .my-definition
      font-size: 1.2em

Un asset peut se situer dans n'importe quel dossier, de la même manière qu'une page.

### Scss/Sass

Les fichiers Scss/Sass peuvent inclure d'autres fichiers, pourvus que le fichier appelé soit placés dans le répertoire `_sass` (répertoire local au projet ou du thème). Tout comme une page classique, Jekyll interprète la syntaxe Liquid à l'intérieur des assets.

`css/style.scss` :

    ---
    ---

    @import "{{ site.theme }}";
    @import "breadcrumb";

    .alert {
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border-radius: .25rem;

        &.alert-danger {
            background-color: #f2dede;
            border-color: #ebcccc;
            color: #a94442;
        }
    }

`_sass/breadcrumb.scss`:

    ul.breadcrumb {
        list-style: none;
        color: #bbb;
        padding: 0;

        li {
            display: inline;
        }
        li+li:before {
            padding: 8px;
            content: ">";
        }
    }

On peut spécifier dans les configurations de minifier le CSS généré :

``` yml
sass:
    style: compressed
```

Ou modifier l'emplacement des fichiers inclus :

``` yml
sass:
    sass_dir: _sass
```

### Coffeescript

Pour convertir des fichiers CoffeeScript, il faut installer la gem `jekyll-coffeescript` et l'activer dans `_config.yml`

    plugins:
     - jekyll-coffeescript

---

## Fichiers de données

Les fichiers de ***données*** sont des fichiers qui contiennent des données (au format yaml, json ou csv), auxquelles on peut accéder à l'intérieur des pages du projet. Le fichier en lui-même ne fait pas partie du site final, il ne sert qu'au moment de la génération.
Les fichiers de données se situent obligatoirement dans le dossier `_data`.

Par exemple `_data/pays.json` :

    {
      "AF": "Afghanistan",
      "ZA": "Afrique du Sud",
      "AL": "Albanie",
      "DZ": "Algérie"
    }

### Variables

Chaque fichier de données est disponible dans `site.data.nomfichier`

    {
      "AF"=>"Afghanistan",
      "ZA"=>"Afrique du Sud",
      "AL"=>"Albanie",
      "DZ"=>"Algérie"
    }

---

## Variables

Jekyll définit quelques variables.
- La variable `site` est identique sur toutes les pages et contient les données du site.

      {
        "time": "2017-10-13 11:52:46 +0200"     # Heure actuelle (de l'execution de jekyll)
        "pages": [],                            # Liste de pages
        "html_pages": [],                       # Liste de pages .html
        "static_files": [],                     # Liste de fichiers statiques (qui n'ont pas été convertit par Jekyll)
        "posts": [],                            # Liste de posts
        "tags": {},                             # Liste de posts groupés par tags
        "categories": {},                       # Liste de posts groupés par catégories
        "collections": [],                      # Liste de collections
        "data": {},                             # Liste de données (cf fichiers de données)
        "documents": [],                        # Liste de documents toutes collections confondues
      }

  Sont également accessible via la variable site, toutes les variables de configurations

      {
        "source"=>"/home/myself/Documents/PROJECTS/dev-roadmap/docs",
        "destination"=>"/home/myself/Documents/PROJECTS/dev-roadmap/docs/_site",
        "plugins_dir"=>"_plugins",
        "layouts_dir"=>"_layouts",
        "data_dir"=>"_data",
        "includes_dir"=>"_includes",
        "collections"=>{
          "posts"=>{
            "output"=>true,
            "permalink"=>"/:categories/:year/:month/:day/:title:output_ext"
          }
        },
        "safe"=>false,
        "include"=>[".htaccess"],
        "exclude"=>["Gemfile", "Gemfile.lock", "node_modules", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/"],
        "keep_files"=>[".git", ".svn"],
        "encoding"=>"utf-8",
        "markdown_ext"=>"markdown,mkdown,mkdn,mkd,md",
        "strict_front_matter"=>false,
        "show_drafts"=>nil,
        "limit_posts"=>0,
        "future"=>false,
        "unpublished"=>false,
        "whitelist"=>[],
        "plugins"=>[],
        "markdown"=>"kramdown",
        "highlighter"=>"rouge",
        "lsi"=>false,
        "excerpt_separator"=>"\n\n",
        "incremental"=>false,
        "detach"=>false,
        "port"=>"4000",
        "host"=>"127.0.0.1",
        "baseurl"=>nil,
        "show_dir_listing"=>false,
        "permalink"=>"date",
        "paginate_path"=>"/page:num",
        "timezone"=>nil,
        "quiet"=>false,
        "verbose"=>false,
        "defaults"=>[{
          "scope"=>{"path"=>""},
          "values"=>{"layout"=>"default", "summary"=>true}}
        ],
        "liquid"=>{"error_mode"=>"warn"},
        "rdiscount"=>{"extensions"=>[]},
        "redcarpet"=>{"extensions"=>[]},
        "kramdown"=>{
          "auto_ids"=>true,
          "toc_levels"=>"1..6",
          "entity_output"=>"as_char",
          "smart_quotes"=>"lsquo,rsquo,ldquo,rdquo",
          "input"=>"GFM",
          "hard_wrap"=>false,
          "footnote_nr"=>1,
          "syntax_highlighter"=>"rouge",
          "syntax_highlighter_opts"=>{},
          "coderay"=>{}
        },
        "title"=>"Roadmap",
        "theme"=>"jekyll-theme-primer",
        "serving"=>true,
        "watch"=>true,
        "url"=>"http://localhost:4000",
        "github"=>{
          "api_url": "https://api.github.com",
          "baseurl": "/pages/a-mt/dev-roadmap",
          "build_revision": "a149deb57170e1fb09dd75c9050da80a43d5d8ee",
          "clone_url": "http://github.com/a-mt/dev-roadmap.git",
          "contributors": [{...}],
          "environment": "development",
          "help_url": "https://help.github.com",
          "hostname": "github.com",
          "is_project_page": true,
          "is_user_page": false,
          "issues_url": "http://github.com/a-mt/dev-roadmap/issues",
          "language": null,
          "latest_release": false,
          "license": { "key": "mit", "name": "MIT License", "spdx_id": "MIT", "url": "https://api.github.com/licenses/mit", "featured": true }, 
          "organization_members": null,
          "owner_gravatar_url": "http://github.com/a-mt.png",
          "owner_name": "a-mt",
          "owner_url": "http://github.com/a-mt",
          "pages_env": "development",
          "pages_hostname": "localhost:4000",
          "private": false,
          "project_tagline": null,
          "project_title": "dev-roadmap",
          "public_repositories": [{...}],
          "releases": [ ],
          "releases_url": "http://github.com/a-mt/dev-roadmap/releases",
          "repository_name": "dev-roadmap",
          "repository_nwo": "a-mt/dev-roadmap",
          "repository_url": "http://github.com/a-mt/dev-roadmap",
          "show_downloads": true,
          "source": { "branch": "gh-pages", "path": "/" },
          "tar_url": "http://github.com/a-mt/dev-roadmap/tarball/gh-pages",
          "url": "http://github.com/pages/a-mt/dev-roadmap",
          "versions": { },
          "wiki_url": "http://github.com/a-mt/dev-roadmap/wiki",
          "zip_url": "http://github.com/a-mt/dev-roadmap/zipball/gh-pages"
        },
        "description"=>#<Jekyll::GitHubMetadata::Value:0x00000001b38048 @key="description", @value=nil, @rendered=nil>,
        "related_posts"=>nil
      }

- La variable `page` dépend de la page en cours et contient les informations de cette page.

      {
        "layout"=>"default",
        "title"=>"Wildcard",
        "category"=>"Linux",
        "content"=>[...]",
        "dir"=>"/",
        "name"=>"wildcard.md",
        "path"=>"wildcard.md",
        "url"=>"/wildcard.html"
      }

- La variable `layout` n'est disponible qu'à l'intérieur du fichier d'un layout et contient les metadatas du layout

      {}

- La variable `content` est également disponible uniquement dans le layout et contient le contenu de la page inclue

      Hello World

[Doc des variables Jekyll](https://jekyllrb.com/docs/variables/)

---

## Fichiers inclus

Le layout contient la structure complète du site mais il est également possible de créer des fichiers que l'on peut insérer à n'importe quel endroit d'un autre fichier, par exemple pour mettre en commun la pagination, les resaux sociaux, les commentaires, etc.  
Ces fichiers doivent être placés dans le répertoire `/_includes`.

On les insère avec la syntaxe Liquid 

    {% include toc.html html=content class="toc" %}

---

## Permalinks

Il est possible de modifier l'URL des posts, pages, etc, via la metadata `permalink`.  
Certaines variables peuvent être utilisées dans ce permalink, comme le titre du post, sa date...

Le permalink peut être
- spécifique à une page donnée, en le plaçant dans les metadatas du fichier

      ---
      permalink: "/pages/:basename:output_ext"
      ---

      Le contenu de la page

- ou à un ensemble de fichiers, en utilisant une valeur par défaut dans le fichier de configuration

  ``` yml
  defaults:
    -
      scope:
        path: ""       # tous les fichiers du projet
        type: "pages"  # du type page
      values:
        permalink: "/pages/:path/:basename:output_ext"
  ```

  ``` yml
  defaults:
    -
      scope:
        path: ""               # tous les fichiers du projet
        type: "nomcollection"  # de la collection nomcollection
      values:
        permalink: "/pages/:collection/:name:output_ext"
  ```

  ``` yml
  defaults:
    -
      scope:
        path: ""       # tous les fichiers du projet
        type: "posts"  # du type post
      values:
        permalink: "/posts/:categories/:year/:month/:day/:title:output_ext"
  ```

Les valeurs par défaut sont
- pour une page:`/:path/:basename:output_ext`
- pour un post: `/:categories/:year/:month/:day/:title:output_ext`
- pour une collection : `/:collection/:name:output_ext`

[Doc permalinks](https://jekyllrb.com/docs/permalinks/#template-variables)

---

## Activer la coloration syntaxique du code

* Indiquer le lexer à utiliser dans `_config.yml` (exemple: rouge)

      markdown: kramdown
      kramdown:
        input: GFM
        syntax_highlighter: rouge

  La liste des languages supportés par rouge sont listés dans [le wiki](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers). Elle peut également être récupérée en ligne de commande avec `rougify list`.

* Ajouter le CSS

      rougify help style                                  # Lister les thèmes disponibles
      rougify style monokai > stylesheets/highlight.css   # Récupérer le CSS monokai

* Baliser la coloration syntaxique

  * Dans un fichier Markdown

        ``` ruby
        def foo
          puts 'foo'
        end
        ```

  * Dans un fichier HTML

        {% highlight ruby linenos %}
        def foo
          puts 'foo'
        end
        {% endhighlight %}

---

## Utiliser des plugins

Pour ajouter des plugins, il faut

1. Installer le plugin

   ``` diff
   # Fichier Gemfile
    group :jekyll_plugins do
       gem "jekyll-feed", "~> 0.6"
   +   gem "jekyll-sitemap"
    end
   ```

   ``` shell
   # Shell
   bundle install
   ```

   Pour mettre à jour un plugin : `bundle update`

2. Indiquer à Jekyll d'utiliser ce plugin

   ``` diff
   # Fichier _config.yml
    gems:
      - jekyll-feed
   +  - jekyll-sitemap
    exclude:
      - Gemfile
      - Gemfile.lock
   ```

   ``` shell
   # Shell
   jekyll build
   ```

   Pour utiliser un plugin avec Github Pages, il faut que ce plugin soit dans la [whitelist de Github Pages](https://pages.github.com/versions/).  

Quelques plugins utiles : https://help.github.com/articles/adding-jekyll-plugins-to-a-github-pages-site/

{% endraw %}
