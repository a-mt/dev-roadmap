---
title: Boucles
category: Linux, Shell, Bash
---

## While

Permet de boucler tant qu'une condition est vraie.

``` bash
correctPassword="monpassword"

while test "$password" != "$correctPassword"; do
  echo "Mot de passe incorrect."
  echo "Tapez le mot de passe"
  read password
done
```

``` bash
numero=1
limit=10

while test $numero != $limit; do 
  touch fichier"$numero"
  numero=$(($numero + 1))
done
```

---

## Until

Boucler tant qu'une condition n'est pas vraie.

``` bash
correctPassword="monpassword"

until test "$password" = "$correctPassword"; do
  echo "Mot de passe incorrect."
  echo "Tapez le mot de passe"
  read password
done
```

---

## For

Boucler sur une liste.

* Créer une liste manuellement

  ``` bash
  items=("a b c")
  for item in $items
     do echo "$item"
  done
  ```

* Lister des fichiers

  ``` bash
  files=(lib/*)
  for file in "${files[@]}"; do echo "-"$file; done
  ```

* Splitter une chaîne de caractères

  ``` bash
  dir=(${PATH//:/$'\n'})

  for i in "${!dir[@]}"; do
    echo "$i: ${dir[$i]}"
  done
  ```

* Utiliser un intervalle

  ``` bash
  for num in `seq 1 10`
      do touch fichier"$num"
  done
  ```

  ``` bash
  for num in {1..10}
      do touch fichier"$num"
  done
  ```
