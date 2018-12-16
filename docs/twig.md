---
title: Liquid
category: Web, Template
---

{% raw %}

Twig est un moteur de template pour PHP.
C'est le moteur de template par défaut de Symfony.  
Il est compilé en PHP et peut être mis en cache pour accélerer le rendu en production.

## Exemple

``` php
<?php
// src/index.php

// Register an SPL autoloader for Twig
spl_autoload_register('autoload_twig');

function autoload_twig($class) {
    if (0 !== strpos($class, 'Twig')) {
        return;
    }
    $file = dirname(__FILE__) . '/twig/lib/'
          . str_replace(array('_', "\0"), array('/', ''), $class) . '.php';
    if (is_file($file)) { 
        require $file;
    }
}

// Instanciate Twig
$loader = new Twig_Loader_Filesystem('/templates/');
$twig   = new Twig_Environment($loader, array(
  'cache' => false,
  'debug' => true
));
$twig->addExtension(new Twig_Extension_Debug());

// Load template
$template = $twig->loadTemplate('index.html.twig');

// Display content of template
echo $template->render([
  'myvar'      => 'value',
  'navigation' => [
    ['href' => '/',      'caption' => 'Home'],
    ['href' => '/about', 'caption' => 'About'],
  ]
]);
```

``` twig
{# templates/layout.html.twig #}
<!DOCTYPE html>
<html>
    <head>
        <title>My Webpage</title>
    </head>
    <body>
        <ul id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
        </ul>

        <h1>My Webpage</h1>
        {% block body %}{% endblock body %}
    </body>
</html>
```

``` twig
{# templates/index.html.twig #}
{% extends "layout.html.twig" %}

{% block body %}
  {{ myvar }}
{% endblock body %}
```

[Liste des variables d'environnement](https://twig.symfony.com/doc/2.x/api.html#environment-options)

---

## Types de tags Twig

Il existe 3 types de balisage Twig:

* `{# #}` permet d'ajouter des commentaires.  
  Ces commentaires sont uniquement destinés aux développeurs et ne sont pas présents dans le fichier compilé.

  ``` twig
  {# My comment #}
   ```

* `{% %}` exécute du code

  ``` twig
  {% set name = "Bob" %}
  ```

* `{{ }}` interprète et affiche le contenu

  ``` twig
  Hello {{ name }}
  ```

Pour que du texte ne soit pas interprété par Twig, entourer les caractères de quotes comme ceci: `{{ '{{' }}` ou utiliser un bloc `verbatim`:

    {% verbatim %}
        <script type="text/template" id="tpl-user">
            Hello {{ name }}
        </script>
    {% endverbatim %}

---

## Filtres

À l'intérieur des balises, on peut ajouter des filtres, qui modifient le résultat.  
Les filtres se cumulent (s'executent sur le résultat des précédents) de gauche à droite.

``` twig
Hello {{ name | upper }}
```

* <ins>Échappement</ins>:  
  Si aucun filtre d'échappement n'est ajouté, alors par défaut, le résultat sera échappé avec le filtre `escape` (appelle `htmlspecialchars`).
  L'exemple précédent revient donc à

  ``` twig
  Hello {{ name | escape | upper }}
  ```

  Pour afficher le contenu HTML d'une valeur sans l'échapper, il est nécessaire d'ajouter le filtre `raw`.

  ``` twig
  Hello {{ name | raw | upper }}
  ```

* <ins>Paramètres</ins>:  
  Un filtre peut également prendre des paramètres entre parenthèses:

  ``` twig
  {{ 42.55 | round(1, 'floor') }}
  ```

* <ins>Bloc filter</ins>:  
  On peut appliquer un filtre à un bloc de texte, en utilisant le mot-clé `filter`:

  ``` twig
  {% filter upper %}
      This text becomes uppercase
  {% endfilter %}
  ```

[Liste complète des filtres natifs Twig](https://twig.symfony.com/doc/2.x/filters/index.html)

### Ajouter des filtres

Il est possible d'ajouter ses propres filtres à Twig en instanciant un objet `Twig_SimpleFilter`.

<ins>Exemple</ins>:

``` php
<?php

// Add md5
$filter = new Twig_SimpleFilter('md5', 'md5');
$twig->addFilter($filter);

// Add preg_replace
$filter = new Twig_SimpleFilter('preg_replace', function ($string, $pattern, $replace) {
  return preg_replace($pattern, $replace, $string);
});
$twig->addFilter($filter);
```

``` twig
{{ myvar | md5 }}
{{ myvar | preg_replace('/-+/', ' ') }}
```

---

## Variables

3 variables sont toujours disponibles dans les templates:

| Variable   | Description | Exemple
|---         |---          |---
| `_self`    | Nom du template en cours | `index.html.twig`
| `_context` | Tableau associatif contenant l'ensemble des variables définies pour le template en cours | `['name' => 'Bob']`
| `_charset` | Encodage du fichier en cours | `UTF-8`

### Assigner une variable

Les variables peuvent être assignées à l'intérieur du template grâce au mot-clé `set`:

    {% set myvar = "Hello" %}
    {% set myvar = 'Hello' %}
    {% set myvar %}Hello{% endset %}

    {% set myvar = [1, 2] %}
    {% set myvar = {'foo': 'bar'} %}
    {% set myvar = (foo): 'foo', (1 + 1): 'bar', (foo ~ 'b'): 'baz' %}

### Debug

Pour debugger le contenu d'une variable, il faut activer l'extension `Twig_Extension_Debug`.  
Cela permet d'utiliser la fonction `dump` (appelle `var_dump`):

    {{ dump(myvar) }}

### Afficher une variable

    Hello {{ name }}
    Hello {{ user.name }}
    Hello {{ user["name"] }}
    Hello {{ user[prop] }}
    Hello {{ "Bob" }}

Pour `user.name`:

* Si `user` est un tableau:  
  Retourne `user["name"]`

* Si `user` est un objet:  
  Twig teste d'abord si la propriété `user->name` existe.  
  Sinon, si la méthode `user->name()`, `user->getName()`, `user->isName()` ou `user->hasName()` existe.  
  Dès qu'une propriété ou méthode existante est trouvée, Twig retourne le résultat associé.

### Ajouter des variables globales

Il est possible de définir des variables globales qui seront disponibles pour tous les templates appelés par la suite.

``` php
<?php
$twig->addGlobal('myvar', $value);
```

---

## Opérations sur les variables

### Mathématiques

| Opérateur | Opération         | Exemple
|---        |---                |---
| +         | addition          | `{{ 1 + 1 }}` = `2`
| -         | soustraction      | `{{ 3 - 2 }}` = `1`
| /         | division          | `{{ 1 / 2 }}` = `0.5`
| //        | division entière  | `{{ 20 // 7 }}` = `2`
| %         | modulo            | `{{ 11 % 7 }}` = `4`
| *         | multiplication    | `{{ 2 * 2 }}` = `4`
| **        | puissance         | `{{ 2 ** 3 }}` = `8`

### Concaténation

L'opérateur `~` permet de concaténer deux variables / chaînes de caractères.

``` twig
{{ var ~ ' concat' }}
{{ var|trim ~ var2 }}
{{ (var ~ var2)|trim }}
```

`#{ }` permet d'interpoler une variable dans une chaîne de caractères. L'interpolation accepte toute expression valide entre `{{ }}`.

``` twig
{{ "Hello <strong>#{name}</strong>" }}
{{ "foo #{1 + 2} baz" }}
```

### Test ternaire

``` twig
{{ foo ? 'yes' : 'no' }}
{{ foo ?: 'no' }} équivaut à {{ foo ? foo : 'no' }}
{{ foo ? 'yes' }} équivaut à {{ foo ? 'yes' : '' }}
```

### Substr

Twig accepte la syntaxe Python pour segmenter une chaîne de caractères:

    nomvar[index_debut:index_fin]

Par exemple, pour récupérer les 4 derniers caractères (de -4 jusqu'à la fin):

``` twig
{{ var[-4:] }}
```

### Séquence

On peut utiliser l'opérateur `..` pour créer une séquence de caractères / nombres.

``` twig
{% set arr = 1..5 %}     {# [1,2,3,4,5] #}
{% set arr = 5..1 %}     {# [5,4,3,2,1] #}
{% set arr = 'a'..'z' %} {# ['a','b','c','d',...,'z'] #}
```

`from..to` revient à appeler `range(from, to)`.  
Pour un pas différent de 1, appeler `range(from, to, step)`

``` twig
{% set arr = range(1,5) %}   {# [1,2,3,4,5] #}
{% set arr = range(1,5,2) %} {# [1,3,5] #}
```

---

## Fonctions

Les fonctions peuvent être appelées pour générer du contenu.

``` twig
{{ min(myvar, 0) }}
```

``` twig
{{ random(['a', 'b', 'c'])}}
```

``` twig
{{ cycle(['odd', 'even'], i) }}
```

[Liste complète des fonctions natives Twig](https://twig.symfony.com/doc/2.x/functions/index.html)

### Ajouter des fonctions

Il est possible d'ajouter ses propres fonctions à Twig en instanciant un objet `Twig_SimpleFunction`.

<ins>Exemple</ins>:

``` php
<?php
// Add crsf_token()
$function = new Twig_SimpleFunction('crsf_token', function() {
    static $token;

    if(!$token) {
        $token = bin2hex(openssl_random_pseudo_bytes(32));
        $_SESSION['crsf_token'] = $token;
    }
    return $token;
});
$twig->addFunction($function);
```

``` twig
<input type="hidden" value="{{ crsf_token() }}">
```

### Assigner une fonction

Les fonctions peuvent également être assignées à l'intérieur de templates grâce au mot-clé `macro`.  
La macro peut être définit dans le même template que celui où elle est appelée mais il faut dans tous les cas appeler `{% import "path/to/template" as pkgname %}` puis `pkgname.fctname()` pour l'utiliser.

<ins>Exemple</ins>:

``` twig
{# templates/macro/tree.html.twig #}
{% macro tree(list, lvl) %}
  {% import _self as self %}

  {% for item in list %}
    <li class="list-tree__item list-tree__item_lvl{{ lvl }}"
        data-category-id="{{ item.id }}">

      {% if item.children is defined %}
        <a class="list-tree__link"
           href="/courses/{{ item.slug }}/" title="{{ item.name }}">
            {{ item.name }}
        </a>
        <ul class="list-tree__sublist">
            {{ self.tree(item.children, lvl + 1) }}
        </ul>
      {% else %}
        <a class="list-tree__link list-tree__link_leaf"
           href="/courses/{{ item.slug }}/" title="{{ item.name }}">
            {{ item.name }}
        </a>
      {% endif %}
    </li>
  {% endfor %}
{% endmacro tree %}
```

``` twig
{# templates/index.html.twig #}
{% import "macro/tree.html.twig" as utils %}

<ul class="list-tree">
  {{ utils.tree(categories, 1) }}
</ul>
```

---

## Gérer les espacements

Le premier retour chariot après un tag Twig est automatiquement supprimé (comme en PHP), en revanche tous les autres espaces et retours chariots sont conservés tel que.

Pour supprimer les espaces entre les balises HTML, utiliser un bloc `spaceless`:

``` twig
{% spaceless %}
  <div>
     <strong>foo bar</strong>
  </div>
{% endspaceless %}
{# résultat = <div><strong>foo bar</strong></div> #}
```

Il est également possible d'effectuer un trim tag par tag en ajoutant un tiret au début et/ou à la fin du tag.

``` twig
{% set value = 'no spaces' %}
{%- if true -%}
    {{- value -}}
{%- endif -%}
{# résultat = 'no spaces' #}
```

``` twig
<li>    {{- value }}    </li>
{# résultat = '<li>no spaces    </li>' #}
```

---

## If

``` twig
{% if myvar %}
    {{ myvar }}
{% elsif anothervar %}
    {{ anothervar }}
{% else %}
    NOP
{% endif %}
```

### Expressions

`if` peut évaluer une expression

| Opérateur  | Opération              | Exemple
|---         |---                     |---
| ==         | égal (non strict)      | `{% if name == "Hello World" %}`
| !=         | différent (non strict) | `{% if name != "Hello World" %}`
| >          | supérieur              | `{% if name > 10 %}`
| >=         | supérieur ou égal      | `{% if name >= 0 %}`
| <          | inférieur              | `{% if name < 10 %}`
| <=         | inférieur ou égal      | `{% if name <= 10 %}`
| in         | contient (pour texte ou tableau)        | `{% if "world" in name %}`
| not in     | ne contient pas (pour texte ou tableau) | `{% if 1 not in list %}`
| is&nbsp;&lt;keyword&gt;          | valide un test (liste des mot-clés acceptés ci-dessous) | `{% if myvar is defined %}`
| is&nbsp;not&nbsp;&lt;keyword&gt; | ne valide pas un test (mots-clés ci-dessous) | `{% if user.name is not null %}`
| starts with | commence par          | `{% if var starts with 'http://' %}`
| ends with   | finit par             | `{% if var ends with '.txt' %}`
| matches     | vérifie une regex     | `{% if var matches '/[\d]+/' %}`

On peut évaluer plusieurs expressions, les éléments de syntaxe autorisés sont `and`, `or`, `not`, `()`, `b-and`, `b-xor` et `b-or`:

``` twig
{% if page.title or page.category %}
```

``` twig
{% if not (post.status is constant('Post::PUBLISHED')) %}
```

### Mots-clés de `is`

<table>
<tr>
  <td>
    <code>constant("NAME"[, object])</code><br>
    Valeur d'une constante (globale ou de classe)
  </td>
  <td>
    <pre lang="twig">
{% if post.status is constant('PUBLISHED') %}
{% if post.status is constant('Post::PUBLISHED') %}
{% if post.status is constant('PUBLISHED', post) %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>defined</code><br>
    Vérifie si la variable est définie
  </td>
  <td>
    <pre lang="twig">{% if myvar is defined %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>null</code><br>
    Valeur différente de <code>null</code>
  </td>
  <td>
    <pre lang="twig">{% if myvar is not null %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>empty</code><br>
    Valeur différente de <code>""</code>
  </td>
  <td>
    <pre lang="twig">{% if myvar is empty %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>same as(&lt;value&gt;)</code><br>
    Valeur strictement égale à &lt;value&gt;
  </td>
  <td>
    <pre lang="twig">
{% set nav = true %}
{% if nav is same as("top") %}
OK
{% endif %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>divisible by(&lt;value&gt;)</code><br>
    Vérifie si <code>% value == 0</code>
  </td>
  <td>
    <pre lang="twig">{% if myvar divisible by(10) %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>even</code><br>
    Vérifie si la variable est paire (divisible par deux)
  </td>
  <td>
    <pre lang="twig">{% if i is even %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>odd</code><br>
    Vérifie si la variable est impaire (non divisible par deux)
  </td>
  <td>
    <pre lang="twig">{% if i is odd %}</pre>
  </td>
</tr>

<tr>
  <td>
    <code>iterable</code><br>
    Vérifie si la variable est itérable (si c'est un tableau ou un objet implémentant l'interface <code>Iterator</code>)
  </td>
  <td>
    <pre lang="twig">
{% if myvar is iterable %}
  {% for item in myvar %}
    {{ item }}
  {% endif %}
{% endif %}</pre>
  </td>
</tr>

</table>

### Ajouter des tests à `is`

Il est possible d'ajouter ses propres tests à Twig en instanciant un objet `Twig_Test`.

<ins>Exemple</ins>:

``` php
<?php
$test = new Twig_Test('red', function ($value) {
    if (isset($value->color) && $value->color == 'red') {
        return true;
    }
    if (isset($value->paint) && $value->paint == 'red') {
        return true;
    }
    return false;
});
$twig->addTest($test);
```

``` twig
{% if myvar is red %}
```

---

## Boucles

Le mot-clé `for` permet de boucler sur un tableau (tableau associatif ou liste).

``` twig
{% for user in users %}
  <li>{{ user.username }}</li>
{% endfor %}
```

``` twig
{% for key, user in users %}
  <li>{{ key }}: {{ user.username }}</li>
{% endfor %}
```

``` twig
{% for i in 0..10 %}
  * {{ i }}
{% endfor %}
```

### Filtres

Il est possible d'appliquer des filtres au tableau en entrée:

``` twig
{% for letter in 'a'|upper..'z'|upper %}
  * {{ letter }}
{% endfor %}
```

``` twig
{% for key in users|keys %}
  <li>{{ key }}</li>
{% endfor %}
```

``` twig
{% for user in users|slice(0, 10) %}
  <li>{{ user.username|e }}</li>
{% endfor %}
```

### Condition

Il n'existe pas de `break` ou de `continue` en Twig, mais on peut ajouter une condition `if` sur le `for`:

``` twig
{% for user in users if user.active %}
  <li>{{ user.username }}</li>
{% endfor %}
```

### Tableau vide

Il est possible d'utiliser le mot-clé `else` pour afficher du contenu de substitution si  le tableau en entrée est vide.

``` twig
{% for user in users %}
  <li>{{ user.username }}</li>
{% else %}
  <li><em>no user found</em></li>
{% endfor %}
```

### Variables spéciales

Il existe des variables spéciales à l'intérieur de la boucle:

| Variable          | Description
|---                |---
| `loop.index`      | Numéro d'itération (à partir de 1)
| `loop.index0`     | Numéro d'itération (à partir de 0)
| `loop.revindex`   | Nombre d'itérations restantes, celle en cours exclue
| `loop.renvindex0` | Nombre d'itérations restantes, celle en cours inclue
| `loop.first`      | Vrai s'il s'agit de la première itération
| `loop.last`       | Vrai s'il s'agit de la dernière itération
| `loop.length`     | Nombre total d'éléments de la boucle
| `loop.parent`     | Contexte parent

`loop.parent` permet d'accéder aux variables spéciales de la boucle parent. Ex: `{{ loop.parent.first }}`

---

## Inclure des templates

Le mot-clé `include` permet de récupérer le contenu d'un autre template.

``` twig
{% include('test.html.twig') %}
```

Par défaut, toutes les variables du template qui l'inclut sont également disponibles dans le template appelé. Pour rendre les variables twig du template parent inaccessibles, passer l'option `with_context = false`.

``` twig
{% include('test.html.twig', with_context = false) %}
```

On peut également définir de nouvelles variables pour le template appelé.

``` twig
{% include('test.html.twig', {var:value}, with_context = false) %}
```

## Héritage

Il est possible de créer un template "squelette" pour contenir les éléments qui seront communs à toutes les pages qui en héritent et contenir des blocs que les templates enfants pourront remplacer.

<ins>Exemple</ins>:

``` twig
{# templates/layout.html.twig #}
<!DOCTYPE html>
<html>
    <head>
        <title>{% block title %}My Webpage{% endblock title %}</title>
    </head>
    <body>
        <ul id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
        </ul>

        {% block body %}{% endblock body %}

        {% block javascripts %}
          <script src="/assets/app.js"></script>
        {% endblock %}
    </body>
</html>
```

``` twig
{# templates/index.html.twig #}
{% extends "layout.html.twig" %}

{% block title "Home" %}

{% block body %}
  {{ myvar }}
{% endblock body %}

{% block javascripts %}
  {{ parent() }}
  <script src="/assets/animation.js"></script>
{% endblock javascripts %}
```

* <ins>Extends</ins>:  
  Le mot-clé `extends` permet de faire hériter le template en cours d'un autre template.  
  Le template en cours peut alors redéfinir les blocs `block` définit dans le parent.

  ``` twig
  {% extends "layout.html.twig" %}
  ```

* <ins>Block</ins>:  
  Il est possible de définir un bloc en ligne:

  ``` twig
  {% block title 'Le titre' %}
  ```

  Ou avec un bloc traditionnel.

  ``` twig
  {% block title %}
    Le titre
  {% endblock %}
  ```

  Le nom du bloc peut être répété sur le `endblock` pour plus de lisibilité pour le développeur.

  ``` twig
  {% block title %}
    Le titre
  {% endblock title %}
  ```

  Notons qu'il est possible de récupérer le contenu d'un bloc pour le ré-afficher ailleurs dans la page comme suit:

  ``` twig
  {{ block('title') }}
  ```

* <ins>Parent</ins>:  
  La fonction `parent()` retourne le contenu du bloc parent. On peut donc s'en servir pour ajouter du contenu au bloc plutôt que d'écraser le contenu.

  ``` twig
  {% block javascripts %}
    {{ parent() }}
    <script src="/assets/animation.js"></script>
  {% endblock javascripts %}
  ```

### Use

Il est également possible d'utiliser les blocs d'un autre template avec le mot-clé `use`.

``` twig
{# templates/search.html.twig #}

{% block search %}
    <input class="search" type="text" placeholder="Search...">
{% endblock %}

{% block javascripts %}
  <script src="/assets/search.js"></script>
{% endblock %}
```

``` twig
{# templates/index.html.twig #}

{% extends "layout.html.twig" %}
{% use "search.html.twig " %}

{% block main %}
    {{ block('search') }}
{% endblock %}
```

Si le template importé avec `use` contient des blocs qui ont le même nom que le template parent alors les blocs du template parent sont écrasés. Si ce n'est pas le comportement voulu, les blocs peuvent être renommés grâce à la syntaxe `with ... as`:

``` twig
{# templates/index.html.twig #}

{% extends "layout.html.twig" %}
{% use "search.html" with javascripts as search_js %}

{% block javascripts %}
    {{ parent() }}
    {{ block('search_js') }}
{% endblock %}
```

### Embed

Le mot-clé `embed` permet de combiner le comportement de `include` et `extend`: il permet d'inclure le contenu d'un autre template et d'écraser les blocs définis dans ce template.

```
{% embed "form.html.twig" %}
    {% block submit %}
        <input type="submit" disabled>
    {% endblock %}
{% endembed %}
```

---

## Autres tags

* `do` permet d'appeler une fonction sans rien afficher

  ``` twig
  {% do user.setName('') %}
  ```

* `deprecated`  
  Génère une notice lorsque le template est appelé pour informer qu'il est déprécié.

  ``` twig
  {# base.twig #}
  {% deprecated 'The "base.twig" template is deprecated, use "layout.twig" instead.' %}
  {% extends 'layout.twig' %}
  ```

* `flush`  
  Indique à Twig de vider le buffer de sortie, pour générer un affichage asynchrone par exemple.

  ``` twig
  {% flush %}
  ```

---

## Extensions

Les extensions Twig permettent d'ajouter
* des variables globales
* des fonctions
* des filtres
* des tests `is`
* des opérateurs (and, or, etc)
* des tags (if, for, filter, etc)

Certaines extensions font partie intégrante de la librairie Twig native, comme `Debug` ou `Sandbox`, il suffit de les activer. D'autres peuvent être ajoutées en dehors de la librarie, comme [Twig-extensions](https://github.com/twigphp/Twig-extensions/), pour activer [i18n](https://twig-extensions.readthedocs.io/en/latest/i18n.html) par exemple.


### Sandbox

Avec l'extension `Sandbox`, le développeur peut limiter les balises, filtres et méthodes disponibles dans les templates et blocs lorsqu'ils sont en mode sandbox. C'est utile par exemple lorsque l'utilisateur peut lui-même modifier le template de son compte perso.

``` twig
{% sandbox %}
    {% include 'user.html' %}
{% endsandbox %}
```

Il est possible d'obtenir le même résultat que l'exemple précédent en utilisant l'option `sandboxed` de la fonction `include`:

``` twig
{{ include('user.html', sandboxed = true) }}
```

Pour activer cette fonctionnalité, il faut instancier `Twig_Extension_Sandbox`:

``` php
<?php
$tags       = array('if');
$filters    = array('upper');
$methods    = array('Article' => array('getTitle', 'getBody'));
$properties = array('Article' => array('title', 'body'));
$functions  = array('range');

$policy = new Twig_Sandbox_SecurityPolicy($tags, $filters, $methods, $properties, $functions);
$twig->addExtension(new Twig_Extension_Sandbox($policy));
```

---

## Symfony

### Variables

Symfony définit ses propres [variables globales](https://symfony.com/doc/current/reference/twig_reference.html#global-variables). Notamment:

``` twig
{{ app.request }}
{{ app.session }}
{{ app.user }}
```

Il est possible d'en ajouter via le fichier `config.yml`:

``` yaml
twig:
  globals:
    var: value
```

### Fonctions

Le framework définit également ses propres [fonctions, filtres et tags](https://symfony.com/doc/current/reference/twig_reference.html). Notamment:

``` twig
<a href="{{ path('homepage') }}">    {# Url relative #}
<a href="{{ url('homepage') }}">     {# Url absolue #}
<img src="{{ asset('logo.png') }}">  {# Assets dumpé avec assets:install #}
```

``` twig
{{ render('http://monurl') }}
{{ render(controller('TestBundle:Main:Test')) }}
```

``` twig
{% if is_granted('ROLE_ADMIN') %}
```
{% endraw %}
