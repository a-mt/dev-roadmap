---
title: Introduction
category: Linux
---

## Système d'exploitation

* Les premiers ordinateurs ont été conçus pour exécuter une série de tâches simples, un peu comme une calculette. Dans les années 1950, ont été ajoutées des fonctions qui permettaient d'exécuter automatiquement différents programmes les uns après les autres afin d'accélérer le traitement. Puis dans les années 1960, des fonctions permettant d'utiliser des bibliothèques d'exécution, d'interrompre des processus et de paralléliser les traitements. C'est à partir là que naît la notion de système d'exploitation.

* Un *système d'exploitation* (*operating system* en anglais, abrégé *OS*) est un ensemble d'outils servant d'intermédiaire entre le hardware et les logiciels qui tournent dessus. Son principal rôle est d'organiser l'utilisation des ressources, mais il fournit également des services permettant de gérer le système et les programmes. Les principaux systèmes d'exploitations sont Windows, MacOS et Linux.

* Le *noyau* (aussi appelé *core* ou *kernel* en anglais) est la partie du système d'exploitation qui s'occupe d'interragir avec le composant matériel — tels que le processeur, les chipsets, la RAM, le disque dur, etc.

## Naissance de Linux

* UNIX est un système d'exploitation développé par AT&T, commencé en 1969 au centre de recherche Bell Labs. Initialement destiné à être utilisé au sein de Bell System, AT&T accorde à la fin des années 1970 des licences d'utilisation Unix à divers acteurs, ce qui conduira à différentes variantes Unix — comme celles de l'Université de Californie, Berkeley (BSD), Microsoft (Xenix), Sun Microsystems (SunOS/Solaris), HP/HPE (HP-UX) et IBM (AIX).

* GNU est un projet initié par Richard Stallman en 1983, visant à développer un système d'exploitation open source compatible UNIX. Il invite la communauté hacker à le rejoindre et participer à son développement — cette annonce fait suite à la guerre déclarée par Symbolics au laboratoire d'intelligence artificielle du MIT et à la disparition de la communauté hacker Lisp.

  L'effort est opiniâtrement poursuivi et, au début des années 90, le projet GNU possède tous les éléments nécessaires à la construction d'un système d'exploitation avec notamment un interpréteur de commande, un compilateur et un éditeur (emacs). Mais manque l'élément le plus central: le noyau.

  Note: GNU est l'acronyme de "GNU's not Unix", soit "GNU n'est pas Unix" en français. Il est souvent considéré comme le premier acronyme récursif: un acronyme dans lequel l'une des lettres désigne l'acronyme lui-même.

* En 1991, Linus Torvalds entreprend le développement d'un noyau d'OS. Il souhaite avant tout comprendre le fonctionnement de son ordinateur, qui tourne avec un Intel 80386 et le système d'exploitation Minix.

  Comme le concepteur de Minix, Andrew Tanenbaum, refuse d'intégrer les contributions visant à améliorer Minix, et après l'ajout de diverses fonctionnalités dont un système de fichiers compatible avec celui de Minix, Linus oriente son projet vers quelque chose de plus ambitieux: un noyau aux normes POSIX. POSIX (*Portable Operating System Interface*) est une ensemble de normes spécifiées par l'IEEE, ayant pour but de maintenir la compatibilité entre les systèmes d'exploitation.

  À ce noyau, il adapte de nombreux composants disponibles du système d'exploitation GNU pour obtenir un système d'exploitation plus complet. Le 26 août 1991, il annonce sur le forum Usenet news :comp.os.minix qu'il écrit un système d'exploitation. Et suite aux efforts de la communauté open source, en février 1992, la version 0.12 du système d'exploitation GNU/Linux est ouverte au public — sous licence GNU GPL.

## Distributions Linux

* On appele *distribution* (parfois abrégré *distro*) l'ensemble formé par le système d'exploitation GNU/Linux et une suite de logiciels pré-installés.

  Une distribution vient avec des choix pré-faits — quel logiciel fournira quel service. Par exemple, Mozilla Firefox vs Google Chrome pour navigateur web, apt vs yum pour gestionnaire d'applications, GNOME vs KDE pour environnement de travail. Une fois la distribution installée, il est toujours possible d'installer d'autres logiciels à la place. Toute personne peut créer une distribution et la diffuser.

  Différentes distributions se concentrent sur différents cas d'utilisation: ordinateur de bureau, serveur, travail scientifique, etc. Certaines distributions offrent un soutient commercial mais la plupart sont basées sur le bénévolat.

* On trouve parmis les plus populaires, 5 grandes familles de distributions:
  1. Red Hat  
  2. Debian  
  3. Suse
  4. Android
  5. Raspbian

  RedHat et Debian couvrent la plupart des principales différences entre les distributions (mais pas toutes).

* Dans la famille Debian, on trouve notamment:

   - <u>Debian</u>: Se distingue par le très grand nombre d'architectures supportées, son importante logithèque et un cycle de développement relativement long, gage d'une certaine stabilité.
   - <u>Ubuntu</u>: distribution dérivée de Debian la plus populaire
   - <u>Mint</u>: un dérivé d'Ubuntu

  Dans la famille Red Hat:

   - <u>Red Hat Enterprise Linux (RHEL)</u>: se concentre sur les serveurs. C'est une distribution stable avec de longs cycles de lancement, développée par l'entreprise Red Hat et offre un support commercial. Cette distribution est payante
   - <u>CentOS</u>: une version gratuite de RHEL qui n'offre pas de support
   - <u>Fedora</u>: une distribution sponsorisée par Red Hat, pour un bureau personnel avec les derniers logiciels
   - <u>Scientific Linux</u>: une distribution d'utilisation scientifique

<!--
* Pour jouer:

  - CentOS version 7 (basé Red-Hat)
  - Ubuntu 18.04 LTS (basé Debian)
-->

## Shell

* Il existe deux types d'interfaces qui permettent d'interagir avec le système d'exploitation:

  * Une *interface graphique* (*Graphical User Interface*, GUI):  
    Les applications se présentent dans des fenêtres qui peuvent être redimensionnées et déplacées. Il existe des menus et des outils pour aider les utilisateurs à naviguer.

  * Une *interface en ligne de commande* (*Command Line Interface*, CLI):  
    Une interface texte pour l'ordinateur. La CLI repose principalement sur la saisie au clavier.

* Le terme "shell" vient de la terminologie employée avec les premiers systèmes d'exploitation de type Unix:

  - le *kernel* (littéralement "cerneau" en français, qui est la partie comestible du noyau d'une noix)   
    est la couche de bas niveau du système d'exploitation,

  - et le *shell* (litt. "coque" en français)  
    est la couche de haut niveau.

  L'idée étant que pour accéder au kernel, il faut passer par le shell.

* À l'époque d'Unix, le shell désignait uniquement l'interface en ligne de commande. Avec l'arrivée de la souris et des interfaces graphiques, ce terme a fini par être démocratisé pour désigner tous les types d'interfaces, qu'elles soient textuelles ou graphiques. Ainsi, l'environnement de bureau GNOME est aussi appelé le shell GNOME.

---

## Interpréteur de commande

* Un *interpréteur de commande* est un programme qui permet de faire la liaison entre des commandes tapées par l'utilisateur (texte) et des actions à exécuter (binaire compréhensible par le système d'exploitation).

* Chaque système d'exploitation a son interpréteur de commande, avec sa propre syntaxe.  
  L'interpréteur de commande sous Unix était "shell", aujourd'hui on l'appelle le "bourne shell".

* Bash (pour Bourne Again Shell) est l'interpréteur de commande du projet GNU. Il est compatible avec le Bourne Shell (la syntaxe Unix peut être utilisée sous Bash), mais ajoute des fonctionnalités supplémentaires.

  Bash possède de nombreuses fonctions populaires, dont
  - un historique en ligne de commande
  - scripting (for, if...)
  - définition d'alias et variables

* Il existe d'autres interpréteurs de commandes.  
  Certains ont des fonctionnalités et commandes que d'autres n'ont pas.  
  Citons notamment:

  | Programme | Nom complet        | Description
  |---        |---                 |---
  | `sh`      | Bourne Shell       | Shell historique (écrit par Steve Bourne en 1977)
  | `bash`    | Bourne Again Shell | Version améliorée de `sh` (ajoute de nouvelles fonctionnalités)
  | `ksh`     | Korn Shell         | Sur certains systèmes Unix propriétaires
  | `csh`     | C-Shell            | Syntaxe proche du langage C
  | `tcsh`    | TENEX Shell        | Version améliorée de `csh`

  [Comparaison syntaxe shells](http://hyperpolyglot.org/unix-shells)

* Dans la plupart des distributions l'interpréteur de commande est bash, mais certaines fournissent un autre interpréteur de commande par défaut, comme le C-shell. 

* Note: sous macOS, l'interpréteur de commande est généralement zsh, tcsh ou bash.

## Terminal

* Un *terminal* est une application qui permet d'envoyer des lignes de commandes à l'interpréteur de commande.

* Lorsqu'un terminal est lancé, il affiche une *invite de commande* (*prompt* en anglais). Généralement, le prompt contient des informations sur l'utilisateur et le système — par exemple: le nom d'utilisateur, le nom de la machine et le répertoire courant. Quand l'utilisateur authentifié est le super-utilisateur *root*, le prompt fini par `#`; et sinon `$`.

  ```
  sysadmin@localhost:~$
  ```

* Pour accéder à un terminal sous Linux:

   * `ctrl` + `alt` + `f1` : terminal 1 (appelé tty1)
   * `ctrl` + `alt` + `f2` : terminal 2 (appelé tty2)
   * `ctrl` + `alt` + `f3` : terminal 3 (appelé tty3)
   * `ctrl` + `alt` + `f4` : terminal 4 (appelé tty4)
   * `ctrl` + `alt` + `f5` : terminal 5 (appelé tty5)
   * `ctrl` + `alt` + `f6` : terminal 6 (appelé tty6)
   * `ctrl` + `alt` + `F7` : retour sur l'interface graphique

  Ou

   ```
   chvt NUMERO
   ```

---

## Serveur graphique

* Les éléments qui constituent l'interface graphique sont:
  - un serveur graphique (*display server*)
  - un environnement de bureau (*desktop environment*)
  - un gestionnaire de fenêtre (*windows manager*)

* Le serveur graphique assure la connexion entre les composants de l'interface graphique et le kernel.  
  Typiquement, il est lancé dans le terminal 7.

* Actuellement, il existe deux grands serveurs graphiques:

  - X11: le plus ancien des deux, remonte aux années 1980
  - Wayland: plus récent, il offre des fonctionnalités plus avancées et une sécurité plus stricte

## Environnement de bureau

* Un *environnement de bureau* (*desktop environment*) décide de l'apparence du GUI.  
  Les plus populaire sont GNOME et KDE Plasma.

  ![](https://i.imgur.com/EEeCx27m.png)
  ![](https://i.imgur.com/OTRxoU4m.png)

* Les principaux composant d'un environnement de bureau sont:

  * <u>un gestionnaire d'écran</u> (*display manager*)  
    Un gestionnaire d'écran gère la fenêtre de connexion de l'environnement de bureau.

    XDM est un gestionnaire d'écran basique — qui utilise XDMCP (*X Display Manager Control Procol*) pour communiquer avec le serveur graphique. La plupart des environnement de bureau ont leur propre gestionnaire d'écran, basé sur XDM:

    - GNOME: GDM
    - KDE Plasma: SDDM
    - KDE Legacy: KDM
    - MATE & XFCE: LightDm

  * <u>des icônes</u>  
    L'environnement de bureau définit des icônes par défaut — par exemple les icônes fichier et dossier.

  * <u>des panels</u>  
    Les panels sont des emplacements, typiquement tout en haut ou tout en bas de l'écran, où peuvent être placés des menus ou des raccourcis entre autres.

  * <u>un launch</u>  
    Un launch est un menu des différentes applications installées sur le système qui ont une interface graphique. Typiquement, il est possible d'effectuer une recherche sur ces applications.

  * <u>paramètres</u>  
    Permet de modifier certaines configurations du système (comme la langue ou les comptes utilisateurs par exemple) via une interface graphique.

  * <u>corbeille</u>  
    Les fichiers supprimés via le terminal sont définitivement effacés, tandis que les fichiers supprimés via l'interface graphique sont généralement placés à la corbeille.

  * <u>widgets</u>  
    Les widgets sont des petits programmes qui ajoutent une fonctionnalité au bureau de l'utilisateur — par exemple ajouter des notes, afficher la date & l'heure, l'utilisation du CPU, etc.

  * <u>des applications graphiques</u>  
    Un environnement de bureau vient avec un certains nombre d'applications qui permettent d'effectuer les actions qu'on peut effectuer avec un terminal en utilisant une interface graphique — un explorateur de fichiers, une console, un éditeur de texte, etc.

## Gestionnaire de fenêtre

* Le *gestionnaire de fenêtre* (windows manager) opère avec le serveur graphique et l'environnement de bureau, et contrôle l'apparence et le comportement des fenêtres.

  ![](https://i.imgur.com/CKp3vhTm.png)

* Typiquement, chaque environnement de bureau définit son propre gestionnaire de fenêtre:

  - GNOME: Mutter 
  - Unity: Compiz
  - KDE Plasma: Kwin
  - MATE: Marco
  - XFCE: Xfwm
  - Cinnamon: Muffin

## Console

* Une *console* est une application graphique qui permet d'exécuter des commandes. Par exemple, un navigateur web inclut généralement une console JavaScript, qui permet d'exécuter des commandes js dans la page web en cours.

  Quand un serveur graphique est lancé, on peut lancer des commandes en utilisant une console émulateur de terminal.
  La console par défaut sous Ubuntu est `gnome-terminal`.

  ![](https://i.imgur.com/YmZcTYF.jpg)
