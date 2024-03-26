---
title: Opérateurs
category: Terraform
---

## Ternaires

* Pour assigner des valeurs à des propriétés en fonction d'une condition:  
  on utilise l'opérateur ternaire `condition ? true_value : false_value`

  ``` bash
  resource "aws_instance" "example" {
    instance_type = var.environment == "prod" ? "t2.large" : "t2.small"
  }
  ```

* Les opérateurs de comparaison acceptés sont:

  ```
  ==
  !=
  >
  <
  >=
  <=
  ```

  Et les opérateurs logiques:

  ```
  &&
  ||
  !
  ```

## Arithmétiques

* Les opérateurs arithmétiques peuvent être utilisés pour effecter des calculs simples:

  ``` bash
  locals {
    base_size = 10
    factor    = 3
    total_size = local.base_size * local.factor
  }
  ```

* Les opérateurs arithmétiques acceptés sont:

  ```
  +
  -
  *
  /
  %
  ```

---

## Heredoc

* On peut créer une chaîne de caractère HEREDOC avec le marqueur `<<` suivit d'un mot délimiteur libre de choix et d'un retour chariot, ensuite le contenu, et enfin le délimiteur précédemment défini seul sur la dernière ligne

  ``` bash
  block {
    value = <<EOT
  hello
  world
  EOT
  }
  ```

* Le standard HEREDOC traite tous les caractères d'espaces littéralement.  
  Terraform permet d'utiliser le marqueur `<<-` pour supprimer l'indentation

  ``` bash
  block {
    value = <<-EOT
    hello
      world
    EOT
  }
  ```

## Caractères spéciaux

* Les chaînes de caractères entre double-quotes ("hello") interprètent les caractères spéciaux:

  | Caractère | Description
  |---   |---
  | `\n` | Retour à la ligne
  | `\r` | Retour chariot
  | `\t` | Tabulation
  | `\"` | Quote
  | `\\` | Backslash
  | `\uNNNN`, `\UNNNNNNNN` | Caractère Unicode

* Les expressions (`${ ... }`) et directives (`%{ ... }`) à l'intérieur de la chaîne de caractère sont interpolées  
  Pour échapper une expression, on utilise `$${` — autrement dit, $${foo} retournera ${foo}  
  Pour échapper une directive, on utilise `%%{`

## Expressions ${ ... }

* ${ ... } pour interpoler le contenu

  ```
  Hello, ${var.name}!
  ```
  ```
  server_name = "server-${var.environment}-${local.base_size + local.factor}"
  ```

## Directives

* %{ ... } pour appliquer une expression logique — if ou for

  ```
  "Hello, %{ if var.name != "" }${var.name}%{ else }unnamed%{ endif }!"
  ```
  ```
  <<EOT
  %{ for ip in aws_instance.example.*.private_ip ~}
  server ${ip}
  %{ endfor ~}
  EOT
  ```

* Le marqueur `~` permet de supprimer les espaces et retours chariot  
  (avant ou après la directive suivant la position du marqueur)

  ``` bash
  <<EOT
  %{ for ip in aws_instance.example[*].private_ip ~}
  server ${ip}
  %{ endfor ~}
  EOT
  ```

## for loop

Les expressions `for` permettent d'itérer sur des types de données complexes (list, set, tuple, map ou object)  
et appliquer des transformations ou filtres

### Type du résultat

* Entourer le `for` de crochet (`[]`) retournera un tuple

  ``` bash
  locals {
    list = [
      "hello",
      "world"
    ]
  }
  output "returns_tuple" {
    value = [for value in local.list : upper(value)]
  }
  #[
  #  "HELLO",
  #  "WORLD",
  #]
  ```

* Entourer le `for` d'accolades (`{}`) retournera un objet

  ``` bash
  locals {
    list = [
      "hello",
      "world"
    ]
  }
  output "returns_object" {
    value = {for value in local.list : value => upper(value)}
  }
  #{
  #  "hello" = "HELLO"
  #  "world" = "WORLD"
  #}
  ```

### Clé/valeur

* Dans le cas d'un map, on peut récupérer la clé et la valeur;  
  et dans le cas d'une liste, on peut récupérer l'index et la valeur

  ``` bash
  locals {
    map = {
      key1 = "value1"
      key2 = "value2"
      key3 = "value3"
    }
  }
  output "iterate_map" {
     value = {for key,value in local.map : key => upper(value)}
  }
  #map = {
  #  "key1" = "VALUE1"
  #  "key2" = "VALUE2"
  #  "key3" = "VALUE3"
  #}
  ```

  ``` bash
  locals {
    usernames = [
      "alice",
      "bob"
    ]
  }
  output "iterate_list" {
    value = [for i,username in local.usernames : "user-${i}-${username}"]
  }
  #[
  #  "user-0-alice",
  #  "user-1-bob",
  #]
  ```

### if

* Même principe qu'en python, on peut ajouter un if à la fin de l'expression pour filtrer les résultats.  
  Que ce soit pour les listes

  ``` bash
  locals {
    users = [
      {
        name = "alice",
        is_admin = true
      },
      {
        name = "bob",
        is_admin = false
      }
    ]
  }
  output "list" {
     value = [for user in local.users : user if user.is_admin]
  }
  #[
  #  {
  #    "is_admin" = true
  #    "name" = "alice"
  #  },
  #]
  ```

  Ou pour les maps

  ``` bash
  locals {
    users = {
      alice = {
        is_admin = true
      },
      bob = {
        is_admin = false
      }
    }
  }
  output "map" {
     value = {for name, user in local.users : name => user if user.is_admin}
  }
  #{
  #  "alice" = {
  #    "is_admin" = true
  #  }
  #}
  ```

### Map de listes

* Il est possible d'effectuer une aggrégation, c'est à dire récupérer non pas une seule valeur pour chaque clé mais une liste de valeurs, en ajoutant `...` à la fin de l'expression

  ``` bash
  locals {
    users = [
      {
        name = "alice",
        is_admin = true
      },
      {
        name = "bob",
        is_admin = false
      },
      {
        name = "charlie",
        is_admin = false
      }
    ]
  }
  output "users_by_role" {
     value = {for user in local.users : (user.is_admin ? "admin" :"user") => user...}
  }
  #users_by_role = {
  #  "admin" = [
  #    {
  #      "is_admin" = true
  #      "name" = "alice"
  #    },
  #  ]
  #  "user" = [
  #    {
  #      "is_admin" = false
  #      "name" = "bob"
  #    },
  #    {
  #      "is_admin" = false
  #      "name" = "charlie"
  #    },
  #  ]
  #}
  ```

### Ordre des éléments

* Puisque Terraform peut convertir un type non ordonné (object, set) vers un type ordonné (list, tuple), il doit choisit un ordre.

  - Pour un map ou objet:  
    les éléments sont triés sur la clé par ordre alphabétique

  - Pour un set(string):  
    les éléments sont triés sur la valeur par ordre alphabétique

  - Pour le reste:  
    l'ordre est aléatoire

## Opérateur splat (`[*]`)

* Le `[*]` (*splat operator*) est utilisé pour itérer sur chaque objet dans une liste et récupérer ses attributs.  
  C'est un raccourci pour mapper une liste sans passer par un for

  ``` bash
  locals {
    users = [
      {firstname: "Alice", lastname: "A"},
      {firstname: "Bob", lastname: "B"},
      {firstname: "Charlie", lastname: "C"}
    ]
  }
  output "example_for" {
    value = [for user in local.users : user.firstname]
  }
  output "example_splat" {
    value = local.users[*].firstname
  }
  # Le for et le splat donnent le même résultat:
  #[
  #  "Alice",
  #  "Bob",
  #  "Charlie",
  #]
  ```

  ![](https://i.imgur.com/mJLWYzR.png)
