---
title: Yaml
category: Web
---

Le YAML (pour "YAML Ain't Markup Language") est un format de représentation de données, souvent utilisé pour les fichiers de configuration.
- C'est un superset de JSON — chaque fichier JSON est aussi un fichier YAML valide
- La syntaxe YAML se veut plus facilement lisible par une personne que le JSON.
- Le YAML inclut des fonctionnalités non supportés par JSON, comme les commentaires et les références.
- Il est analysable en une seule passe de lecture.

À partir de la version 1.2, YAML supporte la syntaxe JSON.

<ins>Exemple de document YAML</ins> :

``` yml
database:
    username: admin
    password: foobar  # TODO get prod passwords out of config
    socket: /var/tmp/database.sock
    options: {use_utf8: true}
memcached:
    host: 10.0.0.99
workers:
  - host: 10.0.0.101
    port: 2301
  - host: 10.0.0.102
    port: 2302
```

Ressources :
- [Specs YAML](http://yaml.org/type/)
- [Cheatsheet](http://yaml.org/refcard.html)
- [Quick reference](https://learnxinyminutes.com/docs/yaml/)
- [Syntaxe supportée par Symfony](https://symfony.com/doc/current/components/yaml/yaml_format.html)
- [Parser en ligne](http://yaml-online-parser.appspot.com/) pour tester la conversion du yaml en json ou python

---

## Structure

En Yaml, la structure n'est pas marquée par des accolades mais par l'indentation : les éléments de même niveau ont la même indentation. Attention, les tabulations ne sont pas autorisées.

---

## Objets

Les clés et valeurs sont séparées par deux-points, avec au moins un espace après les deux-points.  
Les espaces supplémentaires sont ignorés.

``` yml
# YAML
receipt :      Oz-Ware Purchase Invoice
customer:
    firstname: Dorothy
    name     : Gale
```

```diff
# JSON
{
   "receipt": "Oz-Ware Purchase Invoice",
   "customer": {
      "firstname": "Dorothy",
      "name": "Gale"
   }
}
```

Le Yaml supporte également la syntaxe JSON, on peut donc aussi écrire une liste de clés/valeurs entre accolades :

``` yml
# YAML
{ PHP: 5.2, MySQL: 5.1, Apache: 2.2.20 }
```

---

## Commentaires

Les commentaires commencent par un dièse suivit d'un espace et finissent à la fin de la ligne

``` yml
# Commentaire
```

---

## Nombre

``` yml
# YML
- 12         # Entier
- 014        # Octal
- 0xC        # Hexadécimal
- 13.4       # Décimal
- 1.2e+34    # Exposant
- .inf       # Infini
```

``` diff
# JSON
[
  12, 
  12, 
  12, 
  13.4, 
  1.2e+34, 
  Infinity
]
```

---

## Booléens

``` yml
# YAML
Vrai: true
Faux: false
```

``` diff
# JSON
{
  "Vrai": true,
  "Faux": false 
}
```

---

## Date

Le Yaml utilise le standard ISO-8601 pour exprimer les dates.
La timezone et le temps peuvent être omis.  
Les espaces peuvent être utilisés à la place des indicateurs

``` yml
# YAML
canonical:        2001-12-15T02:59:43.1Z
valid iso8601:    2001-12-14t21:59:43.10-05:00
space separated:  2001-12-14 21:59:43.10 -5
no time zone (Z): 2001-12-15 2:59:43.10
date (00:00:00Z): 2002-12-14
```

``` diff
# JSON
{
  "canonical": "2001-12-15 02:59:43",
  "valid iso8601": "2001-12-15 02:59:43",
  "space separated": "2001-12-15 02:59:43", 
  "no time zone (Z)": "2001-12-15 02:59:43",
  "date (00:00:00Z)": "2002-12-14 00:00:00"
}
```

---

## Texte

Une valeur texte peut être entourée de doubles ou simples quotes (" ou ').  
Ce n'est pas obligatoire mais conseillé, pour éviter que la valeur ne soit interprétée comme un autre type
ou même comme un élément de syntaxe (texte qui contient un dièse par exemple).

``` yml
# YAML
version: "1.0"
date   : "2001-01-23"
```

``` diff
# JSON
{
   "version": "1.0",
   "date": "2001-01-23"
}
```

Tandis que

``` yml
# YAML
version: 1.0
date   : 2001-01-23
```

``` diff
# JSON
{
   "version": 1,
   "date": "2001-01-23T00:00:00.000Z"
}
```

### Simple vs double quote

Simple quote : texte litéral  
Double quote : texte contenant des caractères ASCII et/ou Unicode (ex: \n).

``` yml
# YAML
simple: 'texte\x1a'
double: "texte\x1a"
```

``` diff
# JSON
{
  "simple": "texte\\x1a", 
  "double": "texte\u001a"
}
```

### Échapper une quote

Simple quote : une autre simple quote ('')  
Double quote : un anti-slash (\")

``` yml
# YAML
double: "Une double \" dans une chaine"
simple: 'Une simple '' dans une chaine'
```

``` diff
# JSON
{
  "simple": "Une simple ' dans une chaine", 
  "double": "Une double \" dans une chaine"
}
```

### Multi-ligne

Le texte long peut être écrit sur plusieurs lignes en utilisant l'opérateur `>` ou `|`.  
L'indentation va être utilisée pour déduire où s'arrête le contenu.

<ins>Opérateur `>`</ins> : supprime les retours chariots entre chaque ligne

``` yml
# YAML
var1: >  # Supprime les retours chariots
    Ligne1
    Ligne2
```

``` diff
# JSON
{
  "var2": "Ligne1 Ligne2"
}
```

<ins>Opérateur `|`</ins> : conserve les retours chariots entre chaque ligne

``` yml
# YAML
var2: |  # Conserve les retours chariots
    Ligne1
    Ligne2
```

``` diff
# JSON
{
  "var2": "Ligne1\nLigne2"
}
```

### Retours chariots en fin de bloc

Les retours chariots à la fin du texte sont contrôlés par les indicateurs `+` ou `-` (ou aucun).  

<ins>Aucun indicateur</ins> : garder un seul retour à la ligne en fin de bloc

``` yml
# YAML
texte: |
  un seul retour chariot


dummy: value
```

``` diff
# JSON
{
  "texte": "un seul retour chariot\n",
  "dummy": "value"
}
```

<ins>Indicateur `+`</ins> : garder tous les retours à la ligne en fin de bloc

``` yml
# YAML
texte: |+
  tous les retours chariots


dummy: value
```

``` diff
# JSON
{
  "texte": "tous les retours chariots\n\n\n",
  "dummy": "value"
}
```

<ins>Indicateur `-`</ins> : ne garder aucun retour à la ligne en fin de bloc

``` yml
# YAML
texte: |-
  aucun retour chariot


dummy: value
```

``` diff
# JSON
{
  "texte": "aucun retour chariot",
  "dummy": "value"
}
```

---

## Valeur nullle

Une valeur nulle s'écrit avec le caractère tilde.

``` yml
# YAML
valeur: ~
```

``` diff
# JSON
{
  "valeur": null
}
```

---

## Liste

Chaque élément d'une liste commence par un tiret. Le contenu d'une liste est multi-ligne.

``` yml
# YML
- a
  b
- c
```

``` diff
# JSON
[
  "a b", 
  "c"
]
```

Les listes peuvent aussi être écrites avec la syntaxe JSON, entre crochets :

``` yml
# YAML
langages: [PHP, Perl, Python]
```

### Liste imbriquée

Les items d'une liste peuvent contenir n'importe quelle valeur, y compris des listes et des structures.

``` yml
# YAML
- 
  - foo 
  - bar 
  - baz
```

``` diff
# JSON
[[ "foo",  "bar",  "baz" ]]
```

Les retours à la ligne au début ne sont pas nécessaires :

``` yml
# YAML
- 1.1
- - 2.1
  - 2.2
- - - 3.1
    - 3.2
    - 3.3
```

``` diff
# JSON
[1.1, [2.1, 2.2], [[3.1, 3.2, 3.3]]]
```

### Structure imbriquée

``` yml
# YAML
items:
    - part_no:   A4786
      descrip:   Water Bucket (Filled)
      price:     1.47
      quantity:  4

    - part_no:   E1628
      descrip:   High Heeled "Ruby" Slippers
      size:      8
      price:     100.27
      quantity:  1
```

``` diff
# JSON
{
   "items": [
      {
         "part_no": "A4786",
         "descrip": "Water Bucket (Filled)",
         "price": 1.47,
         "quantity": 4
      },
      {
         "part_no": "E1628",
         "descrip": "High Heeled \"Ruby\" Slippers",
         "size": 8,
         "price": 100.27,
         "quantity": 1
      }
   ]
}
```

---

## Références

Les noeuds répétés peuvent être associé à un label avec un esperluette (`&`),
qui peut ensuite être référencé avec un astérisque (`*`).

``` yml
# YAML
Reference: &id001 A4786
*id001:
  - ProduitA
  - ProduitB
  ```
  
``` diff
# JSON
{
  "Reference": "A4786",
  "A4786": ["ProduitA", "ProduitB"]
}
```

Exemple avec une structure :

``` yml
# YAML
bill-to: &id001
    firstname: Chris
    name: Dumars
ship-to: *id001
```

``` diff
# JSON
{
  "bill-to": {
    "firstname": "Chris",
    "name": "Dumars"
  },
  "ship-to": {
    "firstname": "Chris",
    "name": "Dumars"
  }
}
```

Ou encore

``` yml
# YAML
- &coords { x: 1, y: 2 }
- *coords
```

``` diff
# JSON
[
  { "x": 1, "y": 2 }, 
  { "x": 1, "y": 2 }
]
```

### Concaténer une/des références

L'opérateur `<<` permet d'insérer la valeur d'une référence à l'emplacement courant et permet ainsi d'opérer des concaténations

``` yml
# YAML
- &coords { x: 1, y: 2 }
- z: 3
  <<: *coords
```

``` diff
# JSON
[
  { "x": 1, "y": 2 }, 
  { "x": 1, "y": 2, "z": 3 }
]
```

Il accepte aussi une liste de référence :

``` yml
# YAML
- &XY { x: 1, y: 2 }
- &Z { z: 3 }
- <<: [*XY, *Z]
```

``` diff
# JSON
[
  { "x": 1, "y": 2 }, 
  { "z": 3 }, 
  { "x": 1, "y": 2, "z": 3 }
]
```

Ce qui est identique à

``` yml
# YAML
- &XY { x: 1, y: 2 }
- &Z { z: 3 }
- <<: *XY
  <<: *Z
```

---

## Clé complexes

Il est possible d'utiliser des clés complexes, des clés dont la valeur va être évaluée (par exemple pour une clé avec des retours chariots).
Un point d'interrogation (`?`) suivit d'un espace indique le début d'une clé complexe. La valeur est sur la ligne qui suit, précédé de deux-points (`:`).

``` yml
# YAML
? cle
: valeur
```

``` diff
# JSON
{
  "cle": "valeur"
}
```

Exemple de clés sans valeur :

``` yml
# YAML
? item1
? item2
: valeur
? item
  3
```

``` diff
# JSON
{
  "item1": null, 
  "item2": "valeur",
  "item 3": null
}
```

Exemple de clé multi-ligne :

``` yml
# YAML
? |
    This is a key
    that has multiple lines
: and this is its value
```

``` diff
# JSON
{
  "This is a key\nthat has multiple lines\n": "and this is its value"
}
```

---

## Documents

Plusieurs documents peuvent être rassemblés dans un seul fichier en les séparant par trois tirets : `---` (pourvu que le parser supporte plusieurs documents).
Optionnellement, la fin du document peut être marquée par trois points : `...`.  
Les trois tirets en début de fichier ne sont pas obligatoires.

``` yml
# YAML
---
- foo: 1
  bar: 2
...
---
more: stuff
...
```

Est équivalent à

``` yml
# YAML
- foo: 1
  bar: 2
---
more: stuff
```

### Directives

Les directives sont des instructions données au parser YAML, comme par exemple la version YAML utilisée.  
Chaque directive est spécifiée sur une ligne distincte et sans indentation en début de document.  
Elles sont placées en début de document, avant les trois tirets du premier document - qui deviennent obligatoires.

Une directive commence par `%`, suivi du nom de la directive (`YAML` ou `TAG`) et des paramètres.

``` yml
# YAML
%YAML 1.0
---
```

---

## Types explicites

Plutôt que de laisser le parser décider du type de donnée de la valeur, il est possible de le définir explicitement.
Le type de la donnée est placé devant la valeur, préfixé de `!!`.

``` yml
# YAML
price: !!float 3
```

``` diff
# JSON
{
  "price": 3.0
}
```

[Liste des types YAML (specs)](http://yaml.org/type/).

``` yml
# YAML
binary:   !!binary    dGVzdA==
boolean:  !!bool      true
float:    !!float     1.2
integer:  !!int       3
string:   !!str       texte
null:     !!null
date:     !!timestamp 2001-01-23

map:      !!map       { A4786: 1.47, E1628: 100.27 }               # Liste non ordonnée de clés/valeurs sans duplicats
omap:     !!omap      [ one: 1, two: 2 ]                           # Liste ordonnée de clés/valeurs sans duplicats
pairs:    !!pairs     [ meeting: with team, meeting: with boss ]   # Liste ordonnée de clés/valeurs autorisant les duplicats
seq:      !!seq       [ Brian, Alice, Bob ]                        # Liste non ordonnée de valeurs autorisant les duplicats
set:      !!set       { Paris, New York, Boston }                  # Liste non ordonnée de valeurs sans duplicats
```

``` diff
# PYTHON
{
  'binary' : b'test',
  'boolean': True,
  'float'  : 1.2,
  'integer': 3,
  'string' : 'texte',
  'empty'  : None,
  'date'   : datetime.date(2001, 1, 23),

  'map'    : {'A4786': 1.47, 'E1628': 100.27},
  'omap'   : [('one', 1), ('two', 2)],
  'pairs'  : [('meeting', 'with team'), ('meeting', 'with boss')],
  'seq'    : ['Brian', 'Alice', 'Bob'],
  'set'    : {'Boston', 'New York', 'Paris'}
}
```

### Types spécifiques à un langage

Les parsers de certains langages implémentent des tags supplémentaires, par exemple en Python :

``` yml
# YAML
python_complex_number: !!python/complex 1+2j
```

``` diff
# PYTHON
{'python_complex_number': (1+2j)}
```

Ou avec une clé complexe :

``` yml
# YAML
? !!python/tuple [0,0]
: The Hero
? !!python/tuple [0,1]
: Treasure
? !!python/tuple [1,0]
: Treasure
? !!python/tuple [1,1]
: The Dragon
```

``` diff
# PYTHON
{(0, 0): 'The Hero', (0, 1): 'Treasure', (1, 0): 'Treasure', (1, 1): 'The Dragon'}
```

---

## Types personnalisés

YAML accepte les [tagURI](https://tools.ietf.org/html/rfc4151) pour tag.

### Format tagUri

    tag:URI,DATE:PATH

- `URI` est soit un nom de domaine ou un email,
- `DATE` est une date au format `YYYY`, `YYYY-MM` ou `YYYY-MM-DD`,
- `PATH` est le path du tag sur l'URI définie (peut être vide)

Exemples de tagURIs :

    tag:timothy@hpl.hp.com,2001:web/externalHome
    tag:sandro@w3.org,2004-05:Sandro
    tag:my-ids.com,2001-09-15:TimKindberg:presentations:UBath2004-05-19
    tag:blogger.com,1999:blog-555
    tag:yaml.org,2002:int

### Utiliser un tagURI

Les tagURIs sont entourés de chevrons et précédé d'un simple `!`

``` yml
# YAML
integer: !<tag:yaml.org,2002:int> 3
```

yaml.org étant ni plus ni moins que l'uri du schéma YAML, l'exemple précédent est strictement égal à :

``` yml
# YAML
integer: !!int 3
```

### Déclarer un tagURI

Plus simplement, on peut définir un alias pour un tagURI dans les directives : `%TAG !tagprefix! taguri`, et faire appel à cet alias dans le document.

``` yml
# YAML
%TAG !yaml! tag:yaml.org,2002:
---
integer: !yaml!int 3
```

Ou même sans préfixe, de manière globale (faire attention aux collisions) :

``` yml
# YAML
%TAG ! tag:yaml.org,2002:
---
integer: !int 3
```

[Exemples de la doc](http://yaml.org/spec/1.2/spec.html#id2761292)

### Créer des tags en Python

Pour tester en ligne : [repl.it Python](https://repl.it/languages/python3)

``` python
#!/usr/bin/env python
import yaml

# CLASS
class Person(object):
  def __init__(self, name, firstname):
      self.name = name
      self.firstname = firstname

  def __str__(self):
      return('Person({firstname} {name})'.format(**self.__dict__))

# REGISTER
def person_constructor(loader, node):
  instance = Person.__new__(Person)
  yield instance
  state = loader.construct_mapping(node, deep=True)
  instance.__init__(**state)

yaml.add_constructor(u'!Person', person_constructor)

# CALL
stream = '''!Person
firstname: Bob
name: Morane
'''
try:
  print(yaml.load(stream))  # Person(Bob Morane)
except yaml.YAMLError as exc:
  print(exc)
```

Ou en utilisant un namespace :

``` python
yaml.add_constructor(u'tag:foo.org,2017:Person', person_constructor)

# CALL
stream = '''%TAG !foo! tag:foo.org,2017:
---
!foo!Person
  firstname: Bob
  name: Morane
'''
```

`construct_mapping` construit un tableau associatif et appelle le constructeur avec, ce qui permet de créer facilement des objets.
D'autres fonctions sont disponibles comme `construct_scalar`, `construct_sequence`. Voir la [liste des fonctions](http://web.mit.edu/6.863/devel2007/yaml/constructor.py).

Rappel perso : Python basé sur un [exemple sur stackoverflow](https://stackoverflow.com/questions/19439765/#answer-35476888)
