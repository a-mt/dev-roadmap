---
title: Script
category: Linux, Shell, Bash
---

Deux modes d'utilisation du shell sont possibles: interractif ou scripté.

* En mode interractif, on tape une commande au clavier, valide avec la touche "Entrée" et le shell interprète la commande immédiatement.

* Ou on peut écrire une suite de commandes dans un fichier texte, exécuter le fichier et le shell exécutera le contenu du fichier ligne par ligne — comme un programme. On appelle ce type de fichier un *script shell*. Une bonne pratique est de donner l'extension .sh aux scripts shell.

## Shebang

* La première ligne d'un script shell commence par `#!` suivit du chemin vers l'interpréteur de commande pour lequel le script a été conçu. On appelle cette ligne le *shebang* (ou parfois hashpling, hashbang ou encore poundbang). Elle n'est utilisée que quand on lance un fichier en tant qu'exécutable

* Le script suivant est un script pour /bin/bash:

  ``` bash
  $ cat basicScript.sh
  #!/bin/bash
  #
  # This script is a demonstration of a basic script
  #
  pwd
  ls *.sh
  ```

* À l'époque d'Unix, il était courant de mettre /bin/sh comme shell à utiliser. Dans les scripts shell modernes, c'est une mauvaise pratique: sous Linux, ce fichier est un lien symbolique

  - sous une distribution Ubuntu récente, c'est un lien vers dash;
  - sous une distribution Ubuntu plus ancienne, c'était un lien vers bash.

  ``` bash
  $ ls -l /bin/sh
  lrwxrwxrwx 1 root root 4 mai    6  2021 /bin/sh -> dash
  ```

## Commentaire

* Passé le shebang, le dièse (`#`) dénote un commentaire — les lignes qui commençent par un dièse sont ignorées.

## Exécuter un script

* Il y a différentes manières d'exécuter un script, certaines lancent un sous-shell, d'autres pas.
  Lancer un sous-shell demande plus de ressources, dans une situation où les ressources sont minimes, privilégier une méthode qui ne crée pas de sous-shell.

### Sous-shell

* Lancer avec la commande `bash`  
  Crée un sous-shell

  ``` bash
  $ cat basicRun.sh
  #!/bin/bash
  #
  # This script is a demonstration of a script run
  #
  echo "The shell level is $SHLVL"
  ```

  ``` bash
  $ bash basicRun.sh
  The shell level is 2
  ```

* Rendre le fichier exécutable et l'exécuter à partir de son path  
  Crée un sous-shell  
  Utilise le shebang pour déterminer l'interpréteur de commande à utiliser

  ``` bash
  $ chmod a+x basicRun.sh
  $ ./basicRun.sh
  The shell level is 2
  ```

* Rendre le fichier exécutable, le placer dans un des répertoire du PATH, et l'exécuter à partir de son nom  
  Crée un sous-shell

  ``` bash
  $ echo $PATH | tr : $'\n'
  /usr/local/sbin
  /usr/local/bin
  /usr/sbin
  /usr/bin
  /sbin
  /bin
  /usr/games
  /usr/local/games
  /snap/bin

  $ sudo mv basicRun.sh /usr/bin
  $ basicRun.sh
  The shell level is 2
  ```

### Shell en cours

* Lancer avec la commande `source`  
  Exécute dans le shell en cours  
  Permet d'importer et exécuter les commandes du script donné dans le processus en cours. Permet par exemple d'utiliser un script pour définir des variables d'environnement (ex .bashrc) ou inclure des fichiers de librairie (ex lib.sh)

  ``` bash
  $ source basicRun.sh 
  The shell level is 1
  ```

* Lancer avec `.`  
  Exécute dans le shell en cours

  ``` bash
  $ . basicRun.sh
  The shell level is 1
  ```

## Binaire

On peut créer un binaire exécutable à partir d'un script en utilisant [shc](http://www.datsi.fi.upm.es/~frosal/sources/).  
Le binaire peut, dans certains cas, eêtre décrypté pour retrouver le code source original ([article](http://www.linuxjournal.com/article/8256)).
