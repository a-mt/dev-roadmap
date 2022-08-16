---
title: Fonctions
category: Linux, Shell, Bash
---

* Définir une fonction:

  ```
  myfunc() {
    # content
  }
  ```

* Appeler une fonction:

  ```
  myfunc
  ```

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

Il est possible d'écraser une fonction existante.

```
fonction() {
  echo "Première version de func ()."
}

fonction() {
  echo "Deuxième version de func ()."
}

fonction   # Deuxième version de func ().
```

Les fonctions permettent de rendre le code beaucoup plus lisible.  
[Exemple script](https://github.com/docker/cli/blob/086df60bab3dad7ffb5cb7b5169741ddd78e23c8/scripts/test/e2e/run)
