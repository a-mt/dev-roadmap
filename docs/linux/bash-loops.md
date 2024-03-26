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

* Avec une liste de valeurs créée manuellement

  ``` bash
  items=("a b c")

  for item in $items
     do echo "$item"
  done
  ```

* Avec une liste de fichiers

  ``` bash
  files=(lib/*)

  for file in "${files[@]}";
      do echo "-"$file
  done
  ```

* Avec une chaîne de caractères qu'on a splitée

  ``` bash
  dir=(${PATH//:/$'\n'})

  for i in "${!dir[@]}"; do
      echo "$i: ${dir[$i]}"
  done
  ```

* Avec un intervalle

  ``` bash
  for num in `seq 1 10`; do
      touch fichier"$num"
  done
  ```

  ``` bash
  for num in {1..10}; do
      touch fichier"$num"
  done
  ```

* Avec un test et incrémentation

  ``` bash
  for (( i=0; i<=$#; i++ )); do
      echo " \$$i = ${!i}"
  done
  ```