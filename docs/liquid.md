---
title: Liquid
category: Web, Template
---

Liquid est un langage de template. Il a été crée par Shopify en 2006
et a depuis été adopté par de nombreuses applications web, dont notamment Jekyll.
Différentes applications ajoutent différents objets, tags et filtres mais la syntaxe de base reste la même.

Ressources :
- [Liquid Shopify](https://shopify.github.io/liquid/)
- [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
- [Liquid Jekyll](http://jekyllrb.com/docs/templates/)
- [Jekyll & Liquid Cheatsheet](https://gist.github.com/smutnyleszek/9803727)

---

Il existe deux types de balisage en Liquid :

- les balises `{% %}` executent du code

      {% assign name = "Bob" %}

- les balises `{{ }}` interprètent et affichent le contenu

      Hello {{ name }}

  À l'intérieur de ces balises, on peut ajouter des filtres, qui modifient le résultat.  
  Les filtres se cumulent (s'executent sur le résultat des précédents) de gauche à droite.

      Hello {{ name | upcase }}

  Les filtres peuvent prendre un ou plusieurs paramètres après deux-points

      {{ "Hello World !" | replace:" ","-" }}

---

## Assigner une variable

    {% assign myvar = "Hello" %}
    {% capture myvar %}Hello{% endcapture %}

Pour debugger le contenu d'une variable :

    {{ myvar | inspect }}

## Afficher du texte

    Hello {{ name }}
    Hello {{ user.name }}
    Hello {{ "Bob" }}

Pour que le texte ne soit pas interprété en Liquid :

    {% raw %}Le contenu de ce {{ bloc }} n'est pas interprété{% endraw %}

## Gérer les espacements

Tous les espaces/retours à la ligne à l'intérieur des balises sont ignorés, ceux en dehors sont gardés.  
Les balises d'execution n'affichent rien mais créent des lignes vides dans le résultat.

    a
    {% assign name = "Bob" %}        # a\n\nb
    b

<!-- -->

    "{{ name }}"                     # "Bob"
    " {{ name }} "                   # " Bob "

On peut modifier ce comportement en ajoutant des tirets, à gauche et/ou à droite

    a
    {%- assign name = "Bob" %}       # a\nb
    b

<!-- -->

    a
    {%- assign myvar = "Hello" -%}   # ab
    b

<!-- -->

    " {{- myvar -}} "                # "Bob"

---

## Commentaires

    {% comment %}Le commentaire{% encomment %} 

---

## Texte

Le texte peut être entourée de simples ou doubles quotes.

    {% assign name = "Bob" %}
    {% assign name = 'Bob' %}

Pour concaténer, il est nécessaire d'utiliser des filtres

    {% assign myvar = "Hello " | append: name  %}
    {% assign myvar = name     | prepend: "Hello "  %}

Ou d'utliser la balises `capture`

    {% capture myvar %}Hello {{ name }}{% endcapture %}

## Dates

Une date est soit un timestamp Unix soit une chaîne au format [ISO 8601](https://fr.wikipedia.org/wiki/ISO_8601).  
Quelques exemples de dates valides :

    1195457868
    "2007-11-19"
    "2007-11-19T08:3"
    "2007-11-19 08:37:48 +0900"
    "2007-11-19T08:37:48-06:00"

Une date peut être formattée avec le filtre `date`. Les directives à utiliser sont celles de [strftime](http://ruby-doc.org/core-2.4.2/Time.html#method-i-strftime).

    {{ date | date: "%Y-%m-%d" }}

## Nombres

Liquid accepte les entiers et les réels.

    {% assign my_int = 25 %}
    {% assign my_float = 39.756 %}

Pour effectuer des opérations mathématiques, il est nécessaire d'utiliser des filtres

    {{ 15 | plus: 15 }}

## Valeur nulle

    {% assign myvar = nil %}

## Booléens

Les booléens sont `true` et `false`.

    {% assign foo = true %}
    {% assign bar = false %}

Dans une expression `false`et `nil` sont évaluées comme faux.  
Toutes les autres comme vrai.

    {% assign tobi = "Tobi" %}
    {% if tobi %}
      This condition will always be true.
    {% endif %}

La valeur `nil` n'affiche rien tandis que la valeur `false` oui.

    {{ nil }}    # (rien)
    {{ false }}  # false

## Listes

### Créer une liste

En Liquid, il n'existe pas de syntaxe pour créer des listes de valeur. On peut cependant utiliser le filtre `split`.

    {% assign list = "" | split: "|" %}

#### Liste d'entiers

Pour un `for`, on peut créer une liste d'entiers (mais pas de réels).
La borne inférieure et/ou supérieure peut être une variable.

    {% assign list = (1..10) %}
    {% assign list = (from..to) %}

On peut parcourir et afficher sur une liste ainsi créée (avec `join` par exemple)
mais pas accéder à ses index (utiliser `push`, `list[0]`).

    {% assign list = "1,2,3,4,5" | split: "," %}
    Valeur: {{ list[3] }}         # 4
    Join  : {{ list | join:"" }}  # 12345

<!-- -->

    {% assign list = (1..5) %}
    Valeur: {{ list[3] }}         # nil
    Join  : {{ list | join:"" }}  # 12345

### Modifier une liste

Pour modifier une liste, il est nécessaire d'utiliser des filtres

    {% assign list = list | push: "n" %}       Ajoute un élément à la fin
    {% assign list = list | unshift: "1" %}    Ajoute un élément au début

    {% assign list = list | pop %}             Supprime le dernier élément
    {% assign list = list | shift %}           Supprime le premier élément

### Accéder à ses éléments

    {{ list | first }}                         Premier élément
    {{ list | last }}                          Dernier élément
    {{ list[2] }}                              Élément à l'index 2 (3ème)
    {{ list.name }}                            Élément à l'index "name"
    {{ list['last-modified'] }}                Élément à l'index "last-modified"

<!-- -->

    {{ list.size }}                            Taille du tableau

---

## If

    {% if myvar %}                     # Si !=nil && !=false
        {{ myvar }}
    {% elsif anothervar != false %}    # Sinon si != false
        {{ anothervar }}
    {% else %}
        NOP
    {% endif %}

### Expressions

Le `if` peut évaluer une expression.

| Opérateur | Opération                        |
|---        |---                               |
| ==        | égal                             |
| !=        | différent                        |
| >         | supérieur                        |
| >=        | supérieur ou égal                |
| <         | inférieur                        |
| <=        | inférieur ou égal                |
| contains  | contient (pour texte ou tableau) |

    {% if name contains "world" %}

On peut évaluer plusieurs expressions avec `and` (ET) et `or` (OU) mais les parenthèses ne sont pas autorisées.  
Le ET est prioritaire au OU.

    {% if page.title or page.category %}

### Valeurs vides

Plusieurs valeurs peuvent être considérées comme vides : nil, null, false, "", empty.
- `nil` et `null` sont strictement identiques et indiquent un objet vide
- `false` est la valeur faux
- `""` est vrai pour une chaîne vide
- `empty` est vrai pour un tableau ou une chaîne vide

<!-- -->

    {% assign list = "" | split:"|" %}
    {% if list == empty %}
      The list is empty !
    {% endif %}

Le filtre `default` permet de spécifier une valeur par défaut dans le cas où la valeur de la variable est vide (`nil`, `false`, ou empty)

    {{ product_price | default: 2.99 }}

## Unless

`unless` est l'inverse du  `if`. Il accepte les mêmes expressions que le `if`.

    {% unless page == empty %}
        <h1>{{ page.title }}</h1>
    {% else %}
        Empty
    {% endif %}

## Case

    {% case myvar %}
      {% when 1 %}
         Hit 1
      {% when 2 or 3 %}
        Hit 2 or 3
      {% else %}
         Else
    {% endcase %}

---

## For

    {% for value in list %}
        {{ forloop.index }} : {{ value }}
    {% else %}
        Empty list
    {% endfor %}

À l'intérieur d'un `for`, il est possible d'utilser les tags break et continue.

    {% break %}
    {% continue %}

Le `for` accepte des paramètres : `offset`, `limit` et `reversed`

    {% for i in (1..10) %}             1 2 3 4 5 6 7 8 9 10
    {% for i in (1..10) reversed %}    10 9 8 7 6 5 4 3 2 1
    {% for i in (1..10) limit:5 %}     1 2 3 4 5
    {% for i in (1..10) offset:5 %}    6 7 8 9 10

    {% for i in (1..10) reversed offset:2 limit:4 %}    6 5 4 3

### forloop

Le `for` crée une variable `forloop` qui est accessible à l'intérieur du tag et permet
de récupérer des informations telles que le numéro de l'itération en cours, le nombre d'éléments restants, etc.

| Variable          | Description                                 |
|---                |---                                          |
| `forloop.length`  | Nombre total d'éléments                     |
| `forloop.index`   | Index de l'itération (à partir de 1)        |
| `forloop.index0`  | Index de l'itération (à partir de 0)        |
| `forloop.rindex`  | Nombre d'éléments restants                  |
| `forloop.rindex0` | Nombre d'éléments restants (à partir de 0)  |
| `forloop.first`   | `true` s'il s'agit de la première itération |
| `forloop.last`    | `true` s'il s'agit de la dernière itération |

## Cycle

Boucle sur un ensemble de chaîne. À chaque appel d'un cycle, la prochaine chaîne en paramètre est retournée.

    <ul>
    {% for i in (1..10) %}
      <li class="{% cycle 'odd', 'even' %}">{{ i }}</li>
    {%- endfor %}
    </ul>

Si plusieurs cycles sont appelés à l'intérieur d'une page,
il faut leur donner un label afin que l'itération du deuxième cycle reparte du début (dans l'exemple, qu'il reparte de "odd")
et non continue à la suite du premier (de "even").

    <ul>
    {% for i in (1..5) %}
        <li class="{% cycle '1': 'odd', 'even' %}">{{ i }}</li>
    {%- endfor %}
    </ul>

    <ul>
    {% for i in (1..5) %}
        <li class="{% cycle '2': 'odd', 'even' %}">{{ i }}</li>
    {%- endfor %}
    </ul>

## Tablerow

Génère des lignes pour une table HTML.

    <table>
    {% tablerow i in (1..3) %}
      {{ i }}
    {% endtablerow %}
    </table>

Génère :

    <table>
    <tr class="row1">
      <td class="col1">1</td>
      <td class="col2">2</td>
      <td class="col3">3</td>
    </tr>
    </table>

`tablerow` accepte des paramètres : `offset`, `limit` et `cols`.

    <table>
    {% tablerow i in (1..20) cols:2 offset:2 limit:6 %}
      {{ i }}
    {% endtablerow %}

Génère :

    <table>
    <tr class="row1">
      <td class="col1">3</td>
      <td class="col2">4</td>
    </tr>
    <tr class="row2">
      <td class="col1">5</td>
      <td class="col2">6</td>
    </tr>
    <tr class="row3">
      <td class="col1">7</td>
      <td class="col2">8</td>
    </tr>
    </table>

---

## Increment

Le tag `increment` crée ou incrémente une valeur à chaque appel et affiche la valeur. La valeur de départ est 0.  
Cette variable est indépendante des valeurs créées avec `assign`.

    {% assign var = 10 %}
    {% increment var %}  # 0
    {% increment var %}  # 1
    {% increment var %}  # 2
    {{ var }}            # 10

**Attention**, dans Jekyll les variables crée via `increment` ou `decrement` sont crées dans le contexte global et ne peuvent pas être réinitialisées.
Un `increment` en début de fichier peut donc ne pas commencer à 0 s'il existe un `increment` de la même variable dans un autre fichier !  
Pour cette même raison, le tag `increment` ne peut pas être utilisé dans un layout ou un fichier inclus (puisqu'il est appelé par plusieurs fichiers mais la variable continue d'être incrémentée à chaque fois),
mis à part pour générer des ids uniques.

## Decrement

Même principe pour le tag `decrement`. La valeur de départ est -1.

    {% assign var = 10 %}
    {% decrement var %}  # -1
    {% decrement var %}  # -2
    {% decrement var %}  # -3
    {{ var }}            # 10

Les valeurs crées par `increment` sont communes à `decrement`.

    {% increment var %}  # 0
    {% increment var %}  # 1
    {% increment var %}  # 2

    {% decrement var %}  # 2
    {% decrement var %}  # 1
    {% decrement var %}  # 0

---

## Inclure un fichier

Le tag `include` permet d'inclure d'autres fichiers. La syntaxe diffère légèrement entre Shopify et Jekyll.

### Shopify

Inclus un snippet du répertoire `snippets`. Il est inutile d'écrire l'extension .liquid.

    {% include 'my-snippet-file' %}

Le fichier a accès à toutes les variables de son parent.
On peut cependant passer des variables supplémentaires au fichier, crées à la volée, uniquement pour le fichier inclus.

    {% include 'snippet', my_variable: 'apples', my_other_variable: 'oranges' %}

Le paramètre `with` assigne une variable du même nom que le snippet.

    {% include 'color' with 'red' %}
    {% include 'color', color: 'red' %}

Et à l'intérieur du snippet

    color: '{{ color }}'

### Jekyll

Inclus un fichier du répertoire `_includes`.

    {% include footer.html %}
    {% include {{ my_variable }} %}

On peut également inclure des fichiers relativement au répertoire en cours

    {% include_relative somedir/footer.html %}

Et passer des variables supplémentaires au fichier

    {% include note.html content="This is my sample note." %}
    {% include note.html content=download_note %}

Qui sont accessibles via la variable `include` dans le fichier inclus

    {{ include.content }}

---

## Filtres

Jekyll et Shopify n'implémentent pas tous les mêmes filtres, bien que la plupart soient identiques.
Les filtres ci-dessous sont ceux de [Jekyll](http://www.rubydoc.info/github/jekyll/jekyll/Jekyll/Filters).
Les filtres de Shopify sont disponibles avec exemples [dans la doc](https://help.shopify.com/themes/liquid/filters).

    | Nom                      | Description                                    | Exemple                                    | Resultat                        |
    |---                       |---                                             |---                                         |---                              |
    | default                  | Retourner valeur par défaut si valeur vide     | {{ quantity | default: 1 }}                | 1                               |
    | inspect                  | Affiche le contenu d'une variable              | {{ "1,2,3" | split:"," | inspect }}        | ["1", "2", "3"]                 |

### Texte

    | Nom                      | Description                                    | Exemple                                    | Resultat                        |
    |---                       |---                                             |---                                         |---                              |
    | size                     | Nombre de caractères                           | {{ "x y" | size }}                         | 3                               |
    | number_of_words          | Nombre de mots                                 | {{ "x y" | number_of_words }}              | 2                               |
    
    | append                   | Concaténer à la fin                            | {{ "x " | append:name }}                   | x y                             |
    | prepend                  | Concaténer au début                            | {{ name | prepend:"x " }}                  | x y                             |
    | downcase                 | Mettre en minuscule                            | {{ "X y" | downcase }}                     | x y                             |
    | upcase                   | Mettre en majuscule                            | {{ "x y" | upcase }}                       | X Y                             |
    | capitalize               | Met la 1ère lettre en majuscule                | {{ "x y" | capitalize }}                   | X y                             |
    | reverse                  | Inverse les lettres                            | {{ "x y" | reverse }}                      | y x                             |
    
    | uri_escape               | Échappe les caractères d'une URL               | {{ "x ??" | uri_escape }}                  | x%20??                          |
    | cgi_escape               | Échappe les caractères d'un paramètre          | {{ "x ??" | cgi_escape }}                  | x+%3F%3F                        |
    | url_encode               | Idem                                           | {{ "x ??" | url_encode }}                  | x+%3F%3F                        |
    | url_decode               | Décode une URL                                 | {{ "x+%3F%3F" | url_decode }}              | x ??                            |
    | slugify                  | Convertit la chaîne en slug                    | {{ "x ??" | slugify }}                     | x                               |
    | escape                   | Échappe les caractères HTML                    | {{ "<p>&amp;</p>" | escape }}              | &lt;p&gt;&amp;amp;&lt;/p&gt;    |
    | escape_once              | Échappe les balises HTML                       | {{ "<p>&amp;</p>" | escape_once }}         | &lt;p&gt;&amp;&lt;/p&gt;        |
    | strip_html               | Supprime les balises HTML                      | {{ "<p>&amp;</p>" | strip_html }}          | &amp;                           |
    
    | newline_to_br            | Remplace les retours chariots par <br>         | {{ "x¬y" | newline_to_br }}                | xy                              |
    | strip_newlines           | Supprime les retours chariots                  | {{ "x¬y" | strip_newlines }}               | x<br>¬y                         |
    | strip                    | Supprime les espaces au début et à la fin      | "{{ "  x  y  " | strip }}"                 | "x  y"                          |
    | lstrip                   | Supprime les espaces au début                  | "{{ "  x  y  " | lstrip }}"                | "x  y  "                        |
    | rstrip                   | Supprime les espaces à la fin                  | "{{ "  x  y  " | rstrip }}"                | "  x  y"                        |
    | normalize_whitespace     | Supprime les multiples espaces + strip         | "{{ "  x  y  " | normalize_whitespace }}"  | "x y"                           |
    
    | remove                   | Supprime toutes les occurrences                | {{ "??" | remove: "?" }}                   |                                 |
    | remove_first             | Supprime la première occurrence                | {{ "??" | remove_first: "?" }}             | ?                               |
    | replace                  | Remplace toutes les occurrences                | {{ "??" | replace: "?","!" }}              | !!                              |
    | replace_first            | Remplace la première occurrence                | {{ "??" | replace_first: "?","!" }}        | !?                              |
    | slice                    | Récupère une sous-chaîne                       | {{ "Hello" | slice: 1,3 }}                 | ell                             |
    |                          |                                                | {{ "Hello" | slice: -3,2 }}                | ll                              |
    | truncate                 | Tronque une chaîne (ellipse comptée)           | {{ "12345 6789" | truncate: 7 }}           | 1234…                           |
    |                          |                                                | {{ "12345 6789" | truncate: 7, ", etc" }}  | 12, etc                         |
    | truncatewords            | Tronque le nombre de mots                      | {{ "12345 6789" | truncatewords:1 }}       | 12345…                          |

<!-- -->

    | markdownify              | Convertit du texte Markdown en HTML            | {{ "Hello **Jekyll**" | markdownify }}     | Hello <strong>World</strong>    |
    | textilize                | Convertit du texte Textile en HTML             | Hello {{ "*Bob*" | textilize }}            | Hello <em>Bob</em>              |
    | smartify                 | Convertit du plain text en smart text          | {{ '"Jekyll" --- liquid...' | smartify }}  | “Jekyll” — liquid…              |
    | scssify                  | Convertit du code SCSS en CSS                  | 
    | sassify                  | Convertit du code SASS en CSS                  |

### Dates

    | Nom                      | Description                                    | Exemple                                    | Resultat                        |
    |---                       |---                                             |---                                         |---                              |
    | date                     | Formatter une date                             | {{ date | date: "%b %-d, %Y" }}            | Nov 19, 2007                    |
    | date_to_xmlschema        | ...au format XML                               | {{ date | date_to_xmlschema }}             | 2007-11-19T08:37:48+01:00       |
    | date_to_rfc822           | ...au format RFC-822                           | {{ date | date_to_rfc822 }}                | Mon, 19 Nov 2007 08:37:48 +0100 |
    | date_to_string           | ...au format Jour Mois (court) An              | {{ date | date_to_string }}                | 19 Nov 2007                     |
    | date_to_long_string      | ...au format Jour Mois (long) An               | {{ date | date_to_long_string }}           | 19 November 2007                |

### Nombres

    | Nom                      | Description                                    | Exemple                                    | Resultat                        |
    |---                       |---                                             |---                                         |---                              |
    | plus                     | Addition                                       | {{ 15 | plus: 15 }}                        | 30                              |
    | minus                    | Soustraction                                   | {{ 30 | minus: 15 }}                       | 15                              |
    | divided_by               | Division                                       | {{ 20 | divided_by: 10 }}                  | 2                               |
    | times                    | Multiplication                                 | {{ 10 | times: 1.15 }}                     | 15                              |
    | modulo                   | Modulo                                         | {{ 10 | modulo: 2 }}                       | 0                               |
    | abs                      | Valeur absolue                                 | {{ -2 | abs }}                             | 2                               |
    | ceil                     | Arrondit à l'entier supérieur                  | {{ 4.3 | ceil }}                           | 5                               |
    | floor                    | Arrondit à l'entier inférieur                  | {{ 4.6 | floor }}                          | 4                               |
    | round                    | Arrondit à l'entier le plus proche             | {{ 4.6 | round }}                          | 5                               |
    |                          | Arrondit sur 2 décimales                       | {{ 4.5612 | round:2 }}                     | 4.5612                          |

### Listes

    | Nom                      | Description                                    | Exemple                                    | Resultat                        |
    |---                       |---                                             |---                                         |---                              |
    | join                     | Convertit une liste en chaîne                  | {{ list | join:"," }}                      | 1,2,3                           |
    | array_to_sentence_string | Convertir une liste en anglais                 | {{ list | array_to_sentence_string }}      | 1, 2, and 3                     |
    | jsonify                  | Convertir une liste en JSON                    | {{ list | jsonify }}                       | [1,2,3]                         |
  
    | split                    | Convertit une chaîne en liste                  | {{ "1,2,3" | split:"," }}                  | ["1","2","3"]                   |
    | reverse                  | Inverse l'ordre des éléments                   | {{ list | reverse }}                       | ["3","2","1"]                   |
    | sort                     | Trie les éléments                              | {{ "1,3,2" | split:"," | reverse }}        | ["1","2","3"]                   |
    | sort_natural             | Trie en ignorant la casse                      | {{ "A,B,a,b" | split:"," | sort_natural }} | ["A","a","B","b"]               |
    | uniq                     | Supprime les doublons                          | {{ "1,1,2" | split:"," | uniq }}           | ["1","2"]                       |
    | compact                  | Supprime les valeurs nil                       | {{ list | compact }}                       | ["cat1","cat2"]
    | concat                   | Concatène deux listes                          | {{ list | concat:list2 }}                  | ["1","2","3","4","5"]           |
 
    | first                    | Retourne le premier élément                    | {{ list | first }}                         | 1                               |
    | last                     | Retourne le dernier élément                    | {{ list | last }}                          | 3                               |
    | push                     | Ajoute un élément à la fin                     | {% assign list = list | push: "n" %}       |                                 |
    | unshift                  | Ajoute un élément au début                     | {% assign list = list | unshift: "1" %}    |                                 |
    | pop                      | Supprime le dernier élément                    | {% assign list = list | pop %}             |                                 |
    | shift                    | Supprime le premier élément                    | {% assign list = list | shift %}           |                                 |

    | where                    | Filtre une liste d'objets selon une clé/valeur |
    | where_exp                | Filtre une liste d'objets selon une expression |
    | group_by                 | Grouper les objets sur une clé                 |
    | sort                     | Trier les objets sur une clé                   |
    | map                      | Convertit une liste d'objets en valeurs        |

<!-- -->

* where  
  `{{ site.posts | where:"year","2015" }}`

      {"title"=>"Post1","year"=>2015}

* where_exp  
  `{{ site.posts | where_exp:"item","item.year >= 2015" }}`

      {"title"=>"Post3","year"=>2017}
      {"title"=>"Post2","year"=>2017}
      {"title"=>"Post1","year"=>2015}

* group_by  
  `{{ site.posts | group_by:"year" }}`

      {"name"=>"2017","items"=>[
          {"title"=>"Post3","year"=>2017},
          {"title"=>"Post2","year"=>2017}
      ],"size"=>2}
      {"name"=>"2015","items"=>[
          {"title"=>"Post1","year"=>2015}
      ],"size"=>1}

* sort  
  `{{ site.posts | sort: "year" }}`

      {"title"=>"Post1","year"=>2015}
      {"title"=>"Post3","year"=>2017}
      {"title"=>"Post2","year"=>2017}

* map  
  `{{ site.posts | map:"title" }}`

      ["Post3","Post2","Post1"]

---

Tags supplémentaires spécifiques à Shopify :
https://help.shopify.com/themes/liquid/tags/theme-tags
