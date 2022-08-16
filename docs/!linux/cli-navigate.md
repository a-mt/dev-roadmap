---
title: Naviguer
category: Linux, Shell
---

## Chemin

* Un *chemin* (*path* en anglais) désigne l'emplacement d'un répertoire:

  - un chemin à partir de l'emplacement en cours est dit *relatif*  
    Le chemin désigne un sous-répertoire du répertoire en cours.

    ```
    bob/Documents
    ```

  - un chemin à partir de la racine est dit *absolu*  
    Le chemin sera valide quel que soit le répertoire en cours.  

    ```
    /home/bob/Documents
    ```

* Le double point (`..`) représente le répertoire parent.

  ```
  $ pwd
  /home/am/Documents

  $ cd ..
  $ pwd
  /home/am
  ```

  Le path n’a pas de limite de longueur sous un système Unix (Linux, MacOS, etc), en revanche il est limité à 260 caractères sous Windows.

* Le point (`.`) représente le répertoire courant.  
  Pour cd, ce raccourci n'est pas très utile.

## pwd

* `pwd` (print working directory) affiche le chemin absolu du répertoire courant

  ```
  $ pwd
  /home/am
  ```

## ls

* `ls` affiche le contenu d'un répertoire et peut fournir des informations détaillées sur les fichiers.

  Lorsqu'elle est utilisée sans options ni arguments, elle liste les fichiers du répertoire courant. Elle peut également être utilisée pour lister le contenu de n'importe quel répertoire du système de fichier — fournir le chemin d'accès au répertoire en argument.

  ```
  $ pwd
  /home/am

  $ ls
  Desktop Documents Downloads Music Pictures Public Templates Videos

  $ ls /home/am/Documents
  test.txt

  $ ls Documents
  test.txt
  ```

## ls -a

* Tout fichier dont le nom commence par un point (`.nomdefichier`) est dit *caché* parce qu'il n'apparait pas par défaut quand on liste les fichiers d'un répertoire.

  La plupart des fichiers cachés sont des fichiers de personnalisation, qui permettent de personnaliser le fonctionnement de Linux, du shell ou des programmes.

* Pour afficher tous les fichiers, y compris les fichiers cachés, utiliser l'option -a (all) de ls:

  ```
  $ ls -a
  . .. .bash_history .bash_logout .bashrc .config Desktop Downloads Images Public Templates bin Documents Music Pictures snap Videos
  ```

## cd

* `cd` (change directory) permet de changer le répertoire courant

  ```
  $ cd ~/Documents
  $ pwd
  /home/am/Documents

  $ cd /tmp
  $ pwd
  /tmp
  ```

* Si l'utilisateur essaie d'aller à un répertoire qui n'existe pas, la commande renvoie un message d'erreur:

  ```
  $ cd /osef
  bash: cd: /osef: No such file or directory
  $ pwd
  /tmp
  ```

* Lorsqu'elle utilisée sans arguments, la commande `cd` conduit l'utilisateur dans son répertoire personnel.

  ```
  $ cd
  $ pwd
  /home am
  ```

* Lorsqu'elle est utilisée avec l'argument `-`, elle conduit vers le répertoire précédent

  ```
  $ cd -
  $ pwd
  /tmp
  ```

* Note: il y a différentes manières d'aller dans le home directory

  ```
  cd
  cd ~
  cd $HOME
  cd /home/username
  ```
