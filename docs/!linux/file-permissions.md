---
title: Permissions
category: Linux, Fichiers
---

## Comment les permissions sont appliquées

### Propriétaires du fichier

* Les permissions d'un fichier, aussi appelé le *mode* du fichier, sont composées de 3 ensembles: utilisateur propriétaire, groupe propriétaire et autres.

    ![](https://i.imgur.com/fbNuJN3l.png)

  1. <ins>utilisateur</ins> (user, owner):  
     si l'utilisateur en cours est le propriétaire du fichier, alors les permissions utilisateur (1er ensemble) s'appliquent

      ``` bash
      # am a les droits de l'utilisateur propriétaire
      $ whoami
      am
      $
      $ ls -l file
      -rwx------ 1 am am 12 juil. 21 09:14 file
      $ cat file
      hello world
      ```

      ``` bash
      # bob n'a pas les droits de l'utilisateur propriétaire
      $ su bob
      $ whoami
      bob
      $
      $ ls -l file
      -rwx------ 1 am am 12 juil. 21 09:14 file
      $ cat file
      cat: file: Permission denied
      ```

  2. <ins>groupe</ins> (group):  
      si l'utilisateur en cours n'est pas le propriétaire du fichier, mais que son groupe l'est, alors les permissions de groupe (2ème ensemble) s'appliquent

      ``` bash
      # am a les droits de l'utilisateur propriétaire
      $ whoami
      am
      $
      $ ls -l file
      ----rwx--- 1 am am 12 juil. 21 09:14 file
      $ cat file
      cat: file: Permission denied
      ```

      ``` bash
      # bob a les droits du groupe propriétaire
      $ su bob
      $ whoami
      bob
      $ groups
      bob am
      $
      $ ls -l file
      ----rwx--- 1 am am 12 juil. 21 09:14 file
      $ cat file
      hello world
      ```

      Note: sur certaines distributions, il faut que le groupe *en cours* soit le groupe propriétaire pour que ces droits s'appliquent. On peut temporairement changer de groupe principal avec `newgrp`

      ``` bash
      $ groups
      bob am
      $ id -gn
      bob
      $
      $ newgrp am
      $ id -gn
      am
      $ groups
      am bob
      ```

  3. <ins>autres</ins> (other, world):  
     si l'utilisateur en cours n'est ni l'utilisateur ni le groupe propriétaire du fichier, alors les permissions "autres" (ème ensemble) s'appliquent

      ``` bash
      # am a les droits de l'utilisateur propriétaire
      $ whoami
      am
      $
      $ ls -l file
      -------rwx 1 am am 12 juil. 21 09:14 file
      $ cat file
      cat: file: Permission denied
      ```

      ``` bash
      # bob a les droits du groupe propriétaire
      $ su bob
      $ whoami
      bob
      $ groups
      bob am
      $
      $ ls -l file
      -------rwx 1 am am 12 juil. 21 09:14 file
      $ cat file
      cat: file: Permission denied
      ```

      ``` bash
      # charlie a les droits autres
      $ su charlie
      $ whoami
      charlie
      $ groups
      charlie
      $
      $ ls -l file
      -------rwx 1 am am 12 juil. 21 09:14 file
      $ cat file
      hello world
      ```

### Droits

* Chaque ensemble peut avoir 3 permissions:  

  - <ins>lecture</ins> (read):  
    Pour un fichier: permet de lire le contenu du fichier — le contenu peut être vu et copié  
    Pour un répertoire: permet de voir le contenu du répertoire

    ``` bash
    # Lecture non accordée sur un fichier
    $ ls -l file
    --wx-wx-wx 1 am am 6 juil. 21 08:21 file
    $
    $ cat file
    cat: file: Permission denied
    ```

    ``` bash
    # Lecture non accordée sur un dossier
    $ ls -ld tmp
    d-wx-wx-wx 2 am am 4096 juil. 21 08:19 tmp
    $
    $ ls -l tmp
    ls: cannot open directory 'tmp': Permission denied
    $
    $ cd tmp
    tmp$ ls
    ls: cannot open directory '.': Permission denied
    ```

  - <ins>écriture</ins> (write):  
    Pour un fichier: permet de modifier le contenu du fichier  
    Pour un répertoire: permet d'ajouter ou supprimer des fichiers

    ``` bash
    # Écriture non accordée sur un fichier
    $ ls -l file
    -r-xr-xr-x 1 am am 12 juil. 21 08:23 file
    $ cat file
    hello world
    $
    $ echo "new content" > file
    bash: file: Permission denied
    ```

    ``` bash
    # Écriture non accordée sur un dossier
    $ ls -ld tmp
    dr-xr-xr-x 2 am am 4096 juil. 21 08:19 tmp
    $ ls -l tmp
    total 0
    -rw-rw-r-- 1 am am 0 juil. 21 08:19 file
    $
    $ touch tmp/newfile
    touch: cannot touch 'tmp/newfile': Permission denied
    $
    $ echo "hello world" > tmp/file
    $ cat tmp/file
    hello world
    ```

  - <ins>exécuter</ins> (execute):  
    Pour un fichier: permet d'executer le fichier comme un script  
    Pour un répertoire: permet d'aller dans ce répertoire avec cd et voir les détails des fichiers

    ``` bash
    # Éxecution non accordée sur un fichier
    $ ls -l file
    -rw-rw-rw- 1 am am 5 juil. 21 08:29 file
    $ cat file
    hello world
    $ echo "date" > file
    $
    $ ./file
    bash: ./file: Permission denied
    ```

    ``` bash
    # Éxecution non accordée sur un dossier
    $ ls -ld tmp
    drw-rw-rw- 2 am am 4096 juil. 21 08:19 tmp
    $ ls -l tmp
    ls: cannot access 'tmp/file': Permission denied
    total 0
    -????????? ? ? ? ?              ? file
    $ cd tmp
    bash: cd: tmp: Permission denied
    ```

---

## Changer de propriétaire

* `chgrp` (change group) permet de changer le groupe propriétaire

  ``` bash
  $ ls -l file
  -rw-rw-r-- 1 am am 0 juil. 21 11:22 file
  $
  $ sudo chgrp bob file
  $ ls -l file
  -rw-rw-r-- 1 am bob 0 juil. 21 11:22 file
  ```

* `chown` (change owner) permet de changer l'utilisateur propriétaire

  ``` bash
  $ ls -l file
  -rw-rw-r-- 1 am bob 0 juil. 21 11:22 file
  $
  $ sudo chown bob file
  $ ls -l file
  -rw-rw-r-- 1 bob bob 0 juil. 21 11:22 file
  ```

  chown permet également de changer le groupe propriétaire: indiquer le groupe à associer après deux-point; si non indiqué, alors le groupe principal de l'utilisateur choisit est assigné.

  ``` bash
  $ ls -l file
  -rw-rw-r-- 1 bob bob 0 juil. 21 11:22 file
  $
  $ sudo chown am: file
  $ ls -l file
  -rw-rw-r-- 1 am am 0 juil. 21 11:22 file
  ```

  Il est également possible de changer le groupe sans changer l'utilisateur

  ``` bash
  $ sudo chown :bob file
  -rw-rw-r-- 1 am bob 0 juil. 21 11:22 file
  ```

---

## Changer les droits

* `chmod` (change mode) permet de modifier les permissions d'un fichier.  
  Deux syntaxes différentes sont acceptées: symbolique ou octale (parfois dite numérique).

  ```
  $ ls -l file
  -rw-rw-r-- 1 am am 0 juil. 21 11:22 file
  $
  # Notation octale
  $ chmod 666 file
  $ ls -l file
  -rw-rw-rw- 1 am am 0 juil. 21 11:22 file
  $
  # Notation symbolique
  $ chmod a+x file
  $ ls -l file
  -rwxrwxrwx 1 am am 0 juil. 21 11:22 file
  ```

### Notation symbolique

* Avec la notation symbolique, il faut spécifier

  1. sur quel ensemble appliquer les modifications:

      - `u` pour l'utilisateur propriétaire
      - `g` pour le groupe propriétaire
      - `o` pour les autres (others)
      - `a` pour tous

  2. l'opération à effectuer:

      - `+` pour ajouter des permissions
      - `-` pour supprimer des permissions
      - `=` pour assigner des permissions

  3. les permissions:

      - `r` pour la lecture (read)
      - `w` pour l'écriture (write)
      - `x` pour l'exécution (execute)

* On peut désigner plusieurs ensembles sur lesquels appliquer les opérations, ou définir plusieurs permissions, simplement en les concaténant  
  Et on peut cumuler plusieurs modifications en utilisant la virgule

  <ins>Exemple</ins>:

  ```
  # Ajouter les droits d'execution à l'utilisateur
  chmod u+x file

  # Enlever les droits de lire aux autres
  chmod o-r file

  # Assigner les droits de lecture & écriture pour tous (utilisateur, groupe, autres)
  chmod a=rw file

  # Assigner les droits de lecture & écriture à l'utilisateur,
  # et les droits d'execution au groupe & aux autres
  chmod u=rw,go=x file
  ```

### Notation octale

* En notation octale, on utilise 3 chiffres pour désigner les permissions des 3 ensembles:

  - le premier chiffre correspond aux droits de l'utilisateur propriétaire
  - le deuxième, ceux du groupe propriétaire
  - le troisième, ceux des autres utilisateurs

* Chaque permission est représentée par une puissance de 2:

  - `0`: aucune permission
  - `1`: exécution
  - `2`: écriture
  - `4`: lecture

  Pour assigner plusieurs droits, on les additionne.

  <ins>Exemple</ins>:

  ```
  # Assigner les droits de lecture & écriture à l'utilisateur,
  # et les droits d'execution au groupe & aux autres
  chmod 611 file

  # Assigner les droits de lecture, écriture & exécution à l'utilisateur,
  # Lecture & écriture au groupe
  # Lecture uniquement aux autres
  chmod 764 file
  ```

* Notons qu'avec la notation octale on assigne les permissions des 3 ensemble: que pour ne modifier qu'un seul ensemble, on est obligé d'utiliser la notation symbolique.
