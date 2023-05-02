---
title: Fonctions
category: Linux, Shell, Bash
---

## Pourquoi

* Une fonction est un bloc nommé dans lequel est placé un groupe de commandes. On peut considérer une fonction comme un mini-script — et c'est comme ça que le shell bash traite les fonctions: des petits scripts à l'intérieur de grands scripts, avec leurs propres variables spéciales.

* Les fonctions permettent de rendre le code beaucoup plus lisible.  
  [Exemple script](https://github.com/docker/cli/blob/086df60bab3dad7ffb5cb7b5169741ddd78e23c8/scripts/test/e2e/run)

* Les fonctions permettent également de gagner du temps lorsqu'on veut mettre à jour le script — au lieu d'avoir à modifier plusieurs endroits, tout est factorisé en un seul endroit.

## Définir une fonction

* On commence par définir une fonction  
  On peut le faire de deux manières possibles:

  1. Avec le mot-clé `function` suivit du nom de la fonction

      ```
      function myfunc {
        # content
      }
      ```

  2. Avec le nom de la fonction suivit de parenthèses

      ```
      myfunc() {
        # content
      }
      ```

* Ensuite, on peut appeler la fonction:  
  Notons qu'on ne peut pas appeler une fonction avant qu'elle ne soit déclarée (pas de hoisting)

  ```
  myfunc
  ```

* Il est possible d'écraser une fonction existante.

  ```
  fonction() {
    echo "Première version de func ()."
  }

  fonction() {
    echo "Deuxième version de func ()."
  }

  fonction   # Deuxième version de func ().
  ```

## Paramètres

* Passer des paramètres

  ```
  myfunc() {
    echo $1
  }
  myfunc "Hello World"
  ```

  ```
  DEFAULT="Hello World"

  myfunc() {
    var=${1-$DEFAUT}
    echo $var
  }
  myfunc "Hello You !"
  ```

## Résultat

* Récupérer le résultat

  ```
  myfunc() {
    return $(( $1 + 1 ))
  }
  myfunc 10
  echo $?  # 11
  ```

  ```
  myfunc() {
    echo "Hello $1!"
  }

  name="Bob"
  msg=`myfunc $name`
  echo "Message: $msg" # Message: Hello Bob!
  ```

## Supprimer une fonction

* On peut supprimer une fonction avec `unset`

  ```
  unset -f myfunc
  ```

## Portée des variables

* Une fonction a un effet durable sur les variables d’environnement, contrairement à un script

  ``` bash
  $ export X=99

  $ cat cx.sh
  #!/bin/sh -
  X=10

  $ ./cx.sh
  $ echo $X
  99
  ```
  ``` bash
  $ export X=99

  $ cx() { X=10; }

  $ cx
  $ echo $X
  10
  ```

* Une fonction n'a pas d'effet durable sur l'environnement si la variable est définie comme `local`

  ``` bash
  $ X=10

  $ foo() { X=999; }

  $ foo
  $ echo $X
  999
  ```
  ``` bash
  $ X=10

  $ foo() { local X=999; }

  $ foo
  $ echo $X
  10
  ```