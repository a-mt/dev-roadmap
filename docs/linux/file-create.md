---
title: Fichiers — Create Read Update Delete
category: Linux
---

## Créer

### touch

* `touch` permet de créer un fichier vide

  ```
  $ touch filename
  ```

  Si le fichier existe déjà, touch à met à jour la date de modification du fichier.

* Une autre manière de créer un fichier est d'utiliser une redirection vers un fichier qui n'existe pas:

  ```
  $ echo "" > filename2
  ```

### mkdir

* `mkdir` (make directory) permet de créer un répertoire vide

  ```
  $ mkdir docname
  ```

  Pour créer un répertoire et des sous-répertoires, utiliser l'option `-p` (parents)

  ```
  $ mkdir docname1/docname2
  ```

---

## Copier/déplacer

### cp

* `cp` (copy) permet de copier des fichiers.

  ```
  $ cp source_name destination_name
  ```

* L'option -v (verbose) permet d'afficher un message en cas de succès

  ```
  $ touch myfile
  $
  $ cp -v myfile mynewfile
  'myfile' -> 'mynewfile'
  ```

* Lorsque la destination est un répertoire, alors la source sera placée à l'intérieur de ce répertoire et aura le même nom que le fichier original.

  ``` bash
  $ mkdir tmp
  $
  $ cp myfile tmp
  $ ls tmp
  myfile
  $
  $ cp myfile tmp/mynewfile
  $ ls tmp
  myfile  mynewfile
  ```

* L'option `-i` (interactive) indique à la commande cp de demander confirmation avant d'écraser si la destination existe déjà. Demande une réponse par "y" ou "n"

  ``` diff
   # Without -i
   $ echo "hello" > myfile
   $ cp myfile tmp
   $ cat tmp/myfile
   hello
   $
   $ echo "hello2" > myfile
  -$ cp myfile tmp
  -$ cat tmp/myfile
  -hello2
   $
   $ rm tmp/myfile

   # With -i
   $ echo "hello" > myfile
   $ cp -i myfile tmp
   $ cat tmp/myfile
   hello
   $
   $ echo "hello2" > myfile
  +$ cp -i myfile tmp
  +cp: overwrite 'tmp/myfile'? n
  +$ cat tmp/myfile
  +hello
  ```

  Utiliser l'option `-n` pour répondre automatiquement "n" à chaque question.

* L'option -r (recursive) permet de copier un répertoire et son contenu

  ```
  $ cp -vr ~/Images /tmp
  '/home/am/Images' -> '/tmp/Images'
  "/home/am/Images/Screenshots" -> "/tmp/Images/Screenshots"
  "/home/am/Images/Screenshots/Screenshots from 2021-05-07 12-09-52.png" -> "/tmp/Images/Screenshots/Screenshots from 2021-05-07 12-09-52.png"
  "/home/am/Images/Screenshots/Screenshots from 2021-05-07 11-46-43.png" -> "/tmp/Images/Screenshots/Screenshots from 2021-05-07 11-46-43.png"
  ```

* L'option -T (no-target-directory) permet de copier un répertoire et son répertoire à un autre endroit, et ne pas copier à l'intérieur de la cible si elle existe déjà

  ``` diff
   $ mkdir tmp
 
   # Without -T
   $ echo "hello" > tmp/myfile
   $ cp -r tmp tmp2
   $ ls tmp2
   myfile
   $
   $ echo "hello2" > tmp/myfile
  -$ cp -r tmp tmp2
  -$ ls tmp2
  -myfile  tmp
   $
   $ rm -rf tmp2
 
   # With -T
   $ echo "hello" > tmp/myfile
   $ cp -rT tmp tmp2
   $ ls tmp2
   myfile
   $
   $ echo "hello2" > tmp/myfile
  +$ cp -rT tmp tmp2
  +$ ls tmp2
  +myfile
   $
   $ cat tmp2/myfile
   hello2
  ```

## mv

* `mv` (move) permet de déplacer ou renommer des fichiers.  
  Comme la commande cp, la commande mv offre les options -i, -n, -v, -T

  ```
  $ mv -v myfile myfile2
  renamed 'myfile' -> 'myfile2'
  ```

---

## Supprimer

### rm

* `rm` (remove) permet de supprimer des fichiers.  
  Attention, quand on passe par la ligne de commande, il n'y a pas de corbeille: les fichiers sont définitivement supprimés.

  ``` bash
  $ rm -v da*
  removed 'data'
  removed 'data.doc'
  removed 'data.txt'
  ```

* L'option -i permet de demander confirmation avant de supprimer un fichier.  
  Généralement utilisé lorsqu'on supprime plusieurs fichiers en utilisant des caractères globaux

  ``` bash
  $ rm -i myfile*
  rm: remove regular file 'myfile'? n
  ```

* Par défaut, rm ne permet pas de supprimer un répertoire.  
  Pour supprimer un répertoire et son contenu, utiliser l'option -r, -R ou --recursive.

### rmdir

* `rmdir` (remove directory) permet de supprimer un répertoire vide

  ``` bash
  $ rmdir data
  ````
