---
title: Sort
category: Linux
---

## -n, numeric-sort

* `-n` permet d'effectuer un tri numérique (alphabétique par défaut)

  ``` diff
   $ echo -e "1. A\n20. B\n10. C\n100. D" > file
   $ cat file
   1. A
   20. B
   10. C
   100. D

  -$ sort file
   100. Z
  -10. W
  -1. A
   20. Q

  +$ sort -n file
  +1. A
  +10. W
   20. Q
   100. Z
  ```

## -V, version-sort

* `-V` permet d'effectuer un tri naturel  
  (= tri alphabétique sur les caractères alphabétiques et numérique sur les caractères numériques)

  ``` diff
   $ echo -e "file1\nfile20\nfile10\nfile100" > file
   $ cat file
   file1
   file20
   file10
   file100

  -$ sort file
   file1
  -file10
  -file100
  -file20

  -$ sort -n file  # échoue puisque "file" n'est pas numérique
   file1
  -file10
  -file100
  -file20

  +$ sort -V file  # fonctionne correctement
   file1
  +file10
  +file20
  +file100
  ```

## -r, reverse

* `-r` permet d'inverser l'ordre des lignes

  ``` bash
  $ sort -Vr file
  file100
  file20
  file10
  file1
  ```

## -R, random-sort

* `-R` permet de mélanger les lignes

  ``` bash
  $ sort -R file
  file100
  file10
  file1
  file20
  ```

## -k, key

En cas de données tabulaires:

### À partir de N

- `-k N` permet de trier sur la valeur du champ N et jusqu'à la fin de la ligne.  
Exemple: -k2 trie à partir de la colonne 2 (et colonne 3, 4 etc...)

  ``` diff
  -$ cat wordk.txt
  -1 Hello A
   2 World A
   3 World B
   4 World B
   5 Hello B
   6 World A
  -7 ! A

  # Trier sur "Hello A"
  +$ sort -k2 wordk.txt
  +7 ! A
  +1 Hello A
   5 Hello B
   2 World A
   6 World A
   3 World B
   4 World B
  ```

### De N à M

- `-k N,M` pour trier sur la valeur du champ N à M.  
Exemple: -k2,2 trie uniquement sur la colonne 2

  ``` diff
   # Trier sur "Hello A"
  -$ sort -k2 wordk.txt
   7 ! A
   1 Hello A
   5 Hello B
   2 World A
  -6 World A
  -3 World B
   4 World B

   # trier sur "Hello"
  +$ sort -k2,2 wordk.txt
   7 ! A
   1 Hello A
   5 Hello B
   2 World A
  +3 World B
   4 World B
  +6 World A
  ```

### Offset

- `-k N.FROM` pour trier sur la valeur du champ N à partir de la position FROM (et jusqu'à la fin de la ligne)

  ``` diff
  $ cat <<'NOWDOC' > file
  1 4124 4324
  2 4124 4314
  3 4413 1434
  4 4413 4224
  NOWDOC

  # Trier sur "4124 4314"
  -$ sort -k2 file
  -2 4124 4314
   1 4124 4324
  -3 4413 1434
   4 4413 4224

  # À partir du 5ème caractère = trier sur "24 4314"
  +$ sort -k2.5 file
  +3 4413 1434
   4 4413 4224
  +2 4124 4314
   1 4124 4324
  ```

- `-k N.FROM,M.TO` pour trier sur la valeur du champ N à partir de la position FROM et jusqu'au champ M à la position TO

  ``` diff
  # Trier sur "24 4314"
  -$ sort -k1.5 file
   3 4413 1434
   4 4413 4224
  -2 4124 4314
  -1 4124 4324

  # Trier sur "24 43"
  +$ sort -k1.5,1.9 file
   3 4413 1434
   4 4413 4224
  +1 4124 4324
  +2 4124 4314
  ```

### Séparateur

- `-t` pour spécifier le séparateur (espace par défaut)

  ``` bash
  # Trier sur l'UID (champ 3 avec séparateur :)
  $ getent passwd | sort -n -t: -k3
  root:x:0:0:root:/root:/bin/bash
  daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
  bin:x:2:2:bin:/bin:/usr/sbin/nologin
  sys:x:3:3:sys:/dev:/usr/sbin/nologin
  sync:x:4:65534:sync:/bin:/bin/sync
  ```

### Unique

* `-u` permet d'appliquer uniq sur les champs utilisés dans le tri

  ``` diff
  -$ sort -k2 wordk.txt
   7 ! A
   1 Hello A
   5 Hello B
  -2 World A
  -6 World A
  -3 World B
  -4 World B

  -$ sort -k2 -u wordk.txt
   7 ! A
   1 Hello A
   5 Hello B
  -2 World A
  -3 World B

   $ sort -k2,2 -u wordk.txt
   7 ! A
   1 Hello A
  -2 World A
  ```

## -f, ignore-case

* `-f` permet d'ignorer la casse

  ``` diff
  $ echo '8 World a' >> wordk.txt

  -$ sort -k3 -u wordk.txt
  -8 World a
   1 Hello A
  -3 World B

  +$ sort -k3 -uf wordk.txt
   1 Hello A
  +3 World B
  ```
