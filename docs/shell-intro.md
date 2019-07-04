---
title: Les bases
category: Linux, Shell
---

## Commande

* Plutôt que d'utiliser l'interface graphique — cliquer sur des boutons pour déclencher des actions — on peut directement demander au système d'exploitation d'effectuer une action en utilisant une *commande*. Cela permet

   * de gagner du temps par rapport à l'utilisation d'une interface graphique
   * d'accéder à des fonctionnalités du système qui ne sont pas accessibles via des menus
   * d'automatiser des actions

* Une commande est constituée d'un nom de commande (`df`), suivit éventuellement d'arguments (`-H`) et de paramètres (`/`). Par exemple, pour connaître l'espace disque disponible:

   ```
   df -H /
   ```

   Les options d'un caractère sont précédées d'un tiret, celles de plusieurs caractères sont précédées de deux tirets.

   ```
   ls -al --all dirname
   ```

* Linux est sensible à la casse — autrement dit, une commande en majuscule n'est pas l'équivalent de cette même commande en minuscule (de même pour les arguments et paramètres).

## Console

* Une *console* est un programme, sur fond noir et texte blanc, qui accepte des commandes en entrée, les envoie à un interpréteur de ligne de commande, et affiche le résultat.  
Pour accéder à une console sous Linux:

   * `ctrl` + `alt` + `f1` : terminal 1 (inscrit tty1 sur console)
   * `ctrl` + `alt` + `f2` : terminal 2 (inscrit tty2 sur console)
   * `ctrl` + `alt` + `f3` : terminal 3 (inscrit tty3 sur console)
   * `ctrl` + `alt` + `f4` : terminal 4 (inscrit tty4 sur console)
   * `ctrl` + `alt` + `f5` : terminal 5 (inscrit tty5 sur console)
   * `ctrl` + `alt` + `f6` : terminal 6 (inscrit tty6 sur console)
   * `ctrl` + `alt` + `F7` : retour sur l'interface graphique

  Ou

   ```
   chvt NUMERO
   ```

* Un *terminal* est l'émulation d'une console, une fenêtre texte qui peut être ouverte sur une interface graphique — elle peut être déplacée, redimensionnée, etc. Pour accéder à un terminal sous Linux, il existe différent logiciels.  
  Le terminal par défaut sous Ubuntu est `gnome-terminal`.

  ![](https://i.imgur.com/YmZcTYF.jpg)

## Shell

Un *shell* est un interpréteur de commandes, il s'agit du programme faisant la liaison entre l'utilisateur et le système d'exploitation. Il existe différents shells pour différents systèmes d'exploitation, chacun ayant leur propre syntaxe.

Il existe également différents shells sous Linux. Certains ont des fonctionnalités et commandes que d'autres n'ont pas.  
Liste non exhaustive:

| Programme | Nom complet        | Description
|---        |---                 |---
| `sh`      | Bourne Shell       | Shell historique (écrit par Steve Bourne en 1977)
| `bash`    | Bourne Again Shell | Version améliorée de `sh` (ajoute de nouvelles fonctionnalités)
| `ksh`     | Korn Shell         | Sur certains systèmes Unix propriétaires
| `csh`     | C-Shell            | Syntaxe proche du langage C
| `tcsh`    | TENEX Shell        | Version améliorée de `csh`

[Comparaison syntaxe shells](http://hyperpolyglot.org/unix-shells)

Le shell par défaut est stocké dans la variable d'environnement `SHELL`.  
Sous Ubuntu, il s'agit par défaut de `/bin/bash`

Pour lister les shells disponibles sur votre ordinateur: `cat /etc/shells`

---

## Utilisation du shell

### Modes

Deux modes d'utilisation du shell sont possibles: interractif ou script.

* En mode interractif, on tape une commande au clavier, valide avec la touche "Entrée" et le shell interprète la commande immédiatement.

* Ou on peut écrire une suite de commandes dans un fichier texte (dit fichier script), exécuter le fichier et le shell exécutera le contenu du fichier ligne par ligne (comme un programme).

### Raccourcis

Il existe différents raccourcis pour faciliter l'utilisation de la commande, les principaux sont:

| Touche | Description
|---     |---
| flèches gauche et droite, BackSpace, Suppr | Éditer la ligne en cours de saisie:  
| flèche haut et bas | Relancer une commande précédente sans avoir à la retaper. Ou utiliser la commande `history`
| tabulation | Autocompléter un nom de commande
| Ctrl + C   | Stopper l'exécution d'une commande
| Ctrl + L   | Effacer l'écran. Ou utiliser la commande `clear`

---

## Manuel

### man

On peut afficher la page de manuel d'une commande grâce à la commande `man` (ou `man-fr` pour la version en français)

```
man COMMANDE
```

Par exemple `man ls`:

```
NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List information about the FILEs (the current directory by default).  
       Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

       Mandatory arguments to long options are mandatory for short options too.

       -a, --all
              do not ignore entries starting with .

       -A, --almost-all
              do not list implied . and ..

       --author
              with -l, print the author of each file

       -b, --escape
              print C-style escapes for nongraphic characters
```

Pour spécifier de façon non ambiguë la syntaxe d'une commande, les conventions suivantes sont utilisées:

| Syntaxe     | Signification
|---          |---
| `[mot]`     | `mot` est facultatif, il peut donc apparaître 0 ou 1 fois
| `mot...`    | `mot` peut apparaître entre 1 et n fois
| `[mot]...`  | `mot` peut apparaître entre 0 et n fois
| `mot1|mot2` | On peut taper soit `mot1`, soit `mot2`
| <code><strong>mot</strong></code> | `mot` devra être tapé tel quel
| `MOT`       | Représente un terme général qui devra être instancié

### man -k

On peut afficher toutes les entrées du manuel contenant un texte donné dans le titre ou le synopsis grâce à la commande `man -k`. C'est pratique pour retrouver le nom d'une commande dont on ne se souvient plus.

Par exemple `man -k scan`:

```
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