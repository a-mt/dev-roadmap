---
title: CRUD
category: Linux, Fichiers
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

  ``` bash
  $ cp -i myfile mynewfile
  cp: overwrite 'mynewfile'? y
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

## mv

* `mv` (move) permet de déplacer ou renommer des fichiers.  
  Comme la commande cp, la commande mv offre les options suivantes: -i, -n, -v

  ```
  $ mv -v myfile myfile2
  renamed 'myfile' -> 'myfile2'
  ```

---

## Supprimer

### rm

* `rm` (remove) permet de supprimer des fichiers  
  Attention, quand on passe par la ligne de commande, il n'y a pas de corbeille: les fichiers sont définitivement supprimés.

* La suppression de plusieurs fichiers en utilisant des caractères globaux pour causer des problèmes: utiliser l'option -i pour demander confirmation avant de supprimer.

* Par défaut, rm ne permet pas de supprimer un répertoire. Pour supprmier un répertoire et son contenu, utiliser l'option -r (recursive).

  ```
  $ rm -v da*
  removed 'data'
  removed 'data.doc'
  removed 'data.txt'
  ```

### rmdir

* `rmdir` (remove directory) permet de supprimer un répertoire vide

  ```
  $ rmdir data
  ````

