---
title: Aide
category: Linux
---

## man

* Pour rappel, UNIX est le système d'exploitation qui a servi de modèle à Linux. Les développeurs d'UNIX ont crée des documents d'aide appelés *man pages* (abbrégé de *manual pages*, "pages de manuel" en français). Ces documents fournissent une description de base du but de la commande, ainsi que des détails sur les options disponibles.

  On peut visualiser les man pages d'une commande avec `man` suivit du nom de la commande.

  ```
  man date
  ```

  Utiliser les touches fléchées pour naviguer, ou espace pour faire défiler un écran à la fois, et <kbd>q</kbd> pour quitter

* Les pages de manuel sont divisées en sections.  
  Chaque section est conçue pour fournir des informations spécifiques sur une commande.  
  Les plus courantes sont:

  | Section | Description
  |--- |---
  | NAME | Fournit le nom de la commande est un très brève description
  | SYNOPSIS | Fournit des exemples d'exécution de la commande
  | DESCRIPTION | Fournir une description plus détaille de la commande
  | OPTIONS | Liste les options de la commande ainsi qu'une description de leur utilisation 
  | FILES | Fournit une description plus détaille de la commande
  | AUTHOR | Fournit le nom de la personne qui a crée la page de manuel et (parfois) comment contacter la personne
  | REPORTING BUGS | Fournit des détails sur la façon de signaler des problèmes avec la commande
  | COPYRIGHT | Liste les options de la commande ainsi qu'une description de leur utilisation
  | SEE ALSO | Liste des ressources additionnelles, telles que des commandes apparentées ou un site web

* Le synopsis fournit des exemples d'exécution de la commande

  ```
  NAME
         ls - list directory contents

  SYNOPSIS
         ls [OPTION]... [FILE]...
  ```

  Pour spécifier de façon non ambigue la syntaxe d'une commande, les conventions suivantes sont utilisées:

  | Syntaxe     | Signification
  |---          |---
  | `mot`       | (souvent affiché en gras) `mot` est obligatoire et doit être écrit tel-que
  | `mot...`    | `mot` peut apparaître entre 1 et n fois
  | `mot1|mot2` | On peut taper soit `mot1`, soit `mot2`
  | `[mot]`     | `mot` est facultatif, il peut donc apparaître 0 ou 1 fois
  | `[mot]...`  | `mot` peut apparaître entre 0 et n fois
  | `MOT`       | Représente un terme général, qui peut prendre différentes valeurs

## man -k

* On peut afficher toutes les entrées du manuel contenant un texte donné dans le titre ou le synopsis grâce à la commande `man -k`. C'est pratique pour retrouver le nom d'une commande dont on ne se souvient plus.

  ```
  $ man -k scan
  ...
  scandir (3)          - scan a directory for matching entries
  scandirat (3)        - scan a directory for matching entries
  scanf (3)            - input format conversion
  scanimage (1)        - scan an image
  setkeycodes (8)      - load kernel scancode-to-keycode mapping table entries
  simple-scan (1)      - Scanning utility
  sscanf (3)           - input format conversion
  ssh-keyscan (1)      - gather ssh public keys
  umax_pp (5)          - SANE backend for Umax Astra parallel port flatbed scanners
  versionsort (3)      - scan a directory for matching entries
  vfscanf (3)          - input format conversion
  vscanf (3)           - input format conversion
  vsscanf (3)          - input format conversion
  ```

## man -f

* Il y a des milliers de pages de manuel sur une distribution Linux typique.  
  Pour organiser toutes ces pages de manuel, elles sont classées par sections.

  Par défaut, il y a neuf sections par défaut des pages de manuel:
  - commandes générales
  - appels systèmes
  - appels de bibliothèque
  - dossiers spéciaux
  - formats de fichiers et conventions
  - jeux
  - divers
  - commandes d'administration du système
  - routines de l'amande

* La section de la page de manuel en cours est indiqué sur la première ligne  
  Par exemple, si on tape `man ls`, on peut voir que ls est dans la première section:

  ```
  LS(1)       User Commands       LS(1)
  ```

  Tandis que fdisk se trouve dans la 8ème section:

  ```
  FDISK(8)       System Administration       FDISK(8)
  ```

* Il arrive qu'il arrive des pages de manuel portant le même nom mais dans des sections différentes 
  — par exemple, le fichier passwd et la commande passwd

  ```
  $ ls /etc/passwd
  /etc/passwd

  $ which passwd
  /usr/bin/passwd
  ```

* Pour lister toutes les pages de manuel disponibles pour un nom donné, utiliser l'option -f

  ```
  $ man -f passwd
  passwd (5)           - the password file
  passwd (1)           - change user password
  passwd (1ssl)        - compute password hashes
  ```

## man SECTION

* Par défaut, man affiche la première page de manuel trouvée  

  ```
  $ man passwd
  PASSWD(1)       User Commands       PASSWD(1)

  NAME
         passwd - change user password
  ```

  Pour afficher la page de manuel d'une section donnée, indiquer le numéro de la section comme premier argument de la commande man:

  ```
  $ man 5 passwd
  PASSWD(5)       File Formats and Conversions       PASSWD(5)

  NAME
         passwd - the password file
  ```

## info

* Les pages de manuel sont d'excellentes sources d'information, mais elles ont quelques inconvénients:

  - chaque page de manuel est un document séparé, non lié à une autre page de manuel
  - elles peuvent être longues et difficiles à lire

* La commande `info` fournit également de la documentation sur les commandes et les fonctionnalités du système d'information. Considérer les pages de manuel comme une ressource de référence et les documents d'information comme un guide d'apprentissage.

  ```
  $ info ls
  ```

## help

* man et info fournissent de l'aide pour les commandes externes, tandis que `help` fournit de l'aide sur les commandes primitives du shell.

  ```
  $ help cd
  ```

## --help

* De nombreuses commandes fourniront des informations de base, très similaires au SYNOPSIS que l'on trouve dans les pages de manuel en utilisant simplement l'option `--help` de la commande

  ```
  $ git --help
  ```

## README

* Sur la plupart des systèmes, il existe un répertoire où l'on trouve de la documentaiton supplémentaire, comme les fichiers de document stockés par des fournisseurs de logiciels tiers. Ces fichiers de documentation sont souvent appelés fichiers *readme* car ils portent généralement des noms tels que README ou readme.txt

* Les emplacement typiques pour ces fichiers incluent `/usr/share/doc` et `/usr/doc`

  ```
  $ ls /usr/share/doc/vlc
  AUTHORS.gz  changelog.Debian.gz  copyright  fortunes.txt.gz  lua  README  THANKS.gz

  $ less !$/README
  README for the VLC media player
  ===============================

  VLC is a popular libre and open source media player and multimedia engine,
  ```
