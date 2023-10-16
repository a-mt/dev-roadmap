---
title: Find
category: Linux
---

## Logique: et, ou, non

* Pour appliquer une logique ET, spécifier plusieurs filtres

  ``` bash
  # Dont le nom commence par "f" ET pèse 512k
  find -name "f*" -size 512k
  ```

* Pour appliquer une logique OU, utiliser `-o`.  

  ``` bash
  # Dont le nom commence par "f" OU pèse 512k
  find -name "f*" -o -size 512k
  ```

* Pour appliquer un NON, utiliser `-not`

  ``` bash
  # Dont le nom ne commence pas par "f"
  find -not -name "f*"
  ```

## name, iname, regex

- `-name FILENAME`  
  Filtrer les fichiers suivant leur nom (sensible à la cassse).  
  Accepte un wildcard

  ``` bash
  find styles -name '*.less' -exec lessc -x {} \; > combined.css   # combine + minify
  ```

* `-iname FILENAME`  
  Même principe que -name mais insensible à la casse  

  ``` bash
  find /usr/share -name '*.jpg'
  ```

- `-regex REGEX`  
  Filtrer les fichiers suivant une regex

## mindepth, maxdepth

- `-mindepth N`  
  Pronfondeur minimale. Permet notamment d'exclure le répertoire parent du résultat avec `-mindepth 1`

- `-maxdepth N`  
  Limiter le nombre de récursion.  

  ``` bash
  # Ne rechercher que dans le répertoire /etc (et non les sous-répertoires)
  find /etc -mindepth 1 -maxpdeth 1 -name passwd
  ```

## mtime, ctime

* `-mtime HEURES`  
  Filtrer les fichiers en fonction de leur date de modification (ex: modification du contenu), par périodes de 24 heures  

- `-ctime HEURES`  
  En fonction de leur date de changement de statut (ex: modification des permissions)

  * N  = il y a N jours  
  * +N = il y a plus de N jours  
  * -N = il y a moins de N jours  

  ``` bash
  $ touch file0
  $ touch file1 -d "1 day ago"
  $ touch file2 -d "2 days ago"
  $ touch file3 -d "3 days ago"

  # Les fichiers modifiés aujourd'hui
  $ find . -type f -mtime 0
  ./file0

  # Les fichiers modifiés il y a plus d'un jour
  $ find . -type f -mtime +1
  ./file3
  ./file2

  # Les fichiers crées aujourd'hui
  $ find . -type f -ctime 0
  ./file3
  ./file1
  ./file0
  ./file2
  ```

## mmin, cmin

* `-mmin MINUTES` et `-cmin MINUTES`  
  Même principe que -mtime et -ctime mais en minutes

  ``` bash
  find -mmin 5       # modified 5 minutes ago
  find -mmin -5      # modified less than 5 minutes ago
  find -mmin +5      # modified more than 5 minutes ago
  ```

## newer

* `-newerXY REF`  
  Filtrer les fichiers suivant l'horodatage du fichier

  * X:  
    * a = la date d'accès
    * B = la date de création du fichier  
    * c = l'heure de changement d'état de l'inode  
    * m = l'heure de modification du fichier  

  * Y:  
    * t = la référence est un timestamp

    ``` bash
    # Les fichiers plus récents que file1
    find . -newer file1
    ```

    ``` bash
    # Les fichiers qui n'ont pas été modifiés depuis $date (timestamp)
    date="2016-01-18"
    find . -type f -not -newermt "$date"
    ```

## size, empty

* `-size N`  
  Filtrer les fichiers en fonction de leur taille

  *  N = exactement N octets
  * +N = plus de N octets
  * -N = moins de N octets

  ``` bash
  find -size 512k    # 512 kb
  find -size +512k   # plus de 512 kb
  find -size -512k   # moins de 512 kb
  ```

  ``` bash
  find /lib64 -size +10M  # plus de 10 M
  ```

- `-empty` pour filtrer sur les fichiers vides

  ``` bash
  find . -type d -empty -exec rmdir {} \;
  ```

## perm, executable

* `-perm` permet de filtrer par permission

  * perm MODE = les bits de permission du fichier valent exactement MODE  
  * perm -MODE = les bits de permission du fichier valent au moins MODE
  * perm /MODE = au moins un des bits de permissions du fichier matche

  ``` bash
  # exactement 664
  $ find -perm 664
  $ find -perm u=rw,g=rw,o=r

  # 664 ou plus
  $ find -perm -664
  $ find -perm -u=rw,g=rw,o=r

  # Un 4 à n'importe quelle position, ou 2 assigné à l'utilisateur ou groupe
  $ find -perm /664
  $ find -perm /u=rw,g=rw,o=r
  ```

  ``` bash
  # Les fichiers avec SUID ou SGID
  $ sudo find /usr/*bin -perm /6000 -type f
  /usr/bin/gpasswd
  ...

  # Les fichiers avec SUID et SGID
  $ sudo find /usr/*bin -perm -6000 -type f
  /usr/bin/at
  ```

* `-executable`  filtre sur les fichiers exécutables et les répertoires searchable par l'utilisateur en cours

  ``` bash
  # Les fichiers executables par l'utilisateur en cours
  $ sudo find /usr/bin -executable
  /usr/bin
  ...
  ```

## print, quit

* `-print -quit` pour s'arrêter au premier résultat

  ```
  find ... -print -quit
  ```

## printf

* `-printf` pour modifier le format du résultat

  * %n = nombre de liens (hard links) vers le fichier
  * %p = nom du fichier
  * %P = nom du fichier sans path
  * %s = taille du fichier
  * %t = date de dernière modification

  ``` bash
  $ find /tmp -name '*.txt'
  /tmp/imap-ports.txt
  /tmp/index.txt

  $ find /tmp -name '*.txt' -printf '%p: %s\n'
  /tmp/imap-ports.txt: 8
  /tmp/index.txt: 325

  $ find /tmp -name '*.txt' -printf '%P\n'
  imap-ports.txt
  index.txt
  ```

## user, group

- `-user USERNAME`  
  Fichiers qui appartiennent à l'utilisateur *username*

- `-group GROUPNAME`  
  Fichiers qui appartiennent au groupe *groupname*

## exec, ok, execdir

* L'option `-exec` de find permet d'effectuer une action sur chaque résultat de find (ligne par ligne)  
  L’option -exec doit se terminer par point-virgule (`;`) pour marquer la fin du paramètre: le point-virgule ayant une signification en shell, il faut l’échapper d’un anti-slash (`\`) pour qu’il soit interprété par la commande find et non par le shell.

  ``` bash
  find . -exec echo {}\;
  ```

  exec ne peut exécuter qu'une seule commande, pour en exécuter plusieurs, créer un script temporaire avec `sh -c`.

  ``` bash
  # Afficher le nom fichier puis son contenu
  find . -exec sh -c "echo {} && cat {}" \;
  ```

* `-execdir` fonctionne de la même manière que exec, à la différence près que la commande sera executée dans le répertoire contenant le résultat et non dans le répertoire en cours:

  ``` bash
  $ mkdir dir
  $ touch dir/file
  $
  $ find dir -type f -exec echo {} \;
  dir/file
  $
  $ find dir -type f -execdir echo {} \;
  ./file
  ```

  ``` bash
  # Chercher le contenu du répertoire "dirname" et archiver les résultats un à un (tar.gz)
  find dirname -execdir tar -cxf {}.tar.gz {} \;
  ```

* `-ok` fonctionne de la même manière que exec mais, à chaque résultat, demande la confirmation avant d'exécuter la commande (y = oui, tout autre caractère = non)

  ``` bash
  find dirname -ok rm {} \;
  ````
