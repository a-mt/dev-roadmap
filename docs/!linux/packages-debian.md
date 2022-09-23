---
title: Packages Debian
category: Linux, Packages
---

## Fichier .deb

* Debian a crée son propre format d'archive pour gérer les packages: les fichiers .deb

* La convention de nommage des fichiers .deb est comme suit:

  ```
  $ ls gimp*.deb
  gimp_2.8.22-1_amd64.deb
  ```

  1. le nom du package, qui est également le nom de l'application (gimp)
  2. le numéro de version du logiciel (_2.8.22) et de la release (-1)
  3. l'architecture du processeur ciblé (_amd64)  
     Ce sera noarch s'il n'est pas conçu pour une architecture de processeur spécifique
  4. l'extension de fichier (.deb)

  Cette convention n'est pas obligatoirement suivuie par le développeur du package, il est donc possible de trouver un nom de package légèrement différent.

## dpkg

`dpkg` (*depackage*) est un utilitaire permettant d'installer, supprimer et fournir des informations sur les packages Debian — fichiers .deb

### verify

* L'option `-V` ou `--verify` permet de vérifier l'intégrité d'un package (*substantiate* en anglais) — les données stockées sont comparées au checksum. Si aucun message n'est affiché, cela signifie que tout va bien

  ```
  $ sudo dpkg -V gimp
  ```

### contents

* L'option `-c` ou `--contents` permet de lister le contenu d'un fichier .deb

  ```
  $ dpkg -c gimp_2.8.22-1_amd64.deb
  ```

  ![](https://i.imgur.com/ZpKMypH.png)

### info

* L'option `-I` ou `--info` affiche les infos du fichier .deb et notamment ses dépendances

  ![](https://i.imgur.com/c5bykI1.png)

### install

* L'option `-i` ou `--install` permet d'installer le ou les packages en arguments. Si une dépendance du package n'est pas satisfaite, l'installation ou le lancement de l'application échouera.

  ```
  $ sudo dpkg -i virtualbox.deb
  ```

  ![](https://i.imgur.com/aZ4CbXr.png)

### remove

* L'option `-r` ou `--remove` suivit du nom du package permet de supprimer des packages installés — mais pas les fichiers de configuration qui y sont associés.

  ```
  $ sudo dpkg -r nom_du_paquet
  ```

  ![](https://i.imgur.com/FlC20a2.png)

### purge

* L'option `-P` ou `--purge` suivit du nom du package permet de supprimer des packages ainis que les ficheirs de cofngiuration qui y sont associés.

  ```
  $ sudo dpkg -P nom_du_paquet
  ```

### list

* L'option `-l` ou `--list` permet de lister les packages dont le nom contient le texte donné.  
  Sans argument, dpkg liste tous les paquets installés

  ```
  $ sudo dpkg -l vlc
  ||/ Name    Version                 Architecture    Description
  ii  vlc     3.0.8-0ubuntu18.04.1    amd64           multimedia player and streamer
  ```

### status

* L'option `-s` ou `--status` affiche les infos sur un package installé

  ```
  dpkg -s gimp
  dpkg-query: package 'gimp' is not installed and no information is available
  ```

  ```
  $ sudo dpkg -s vlc
  Package: vlc
  Status: install ok installed
  Priority: optional
  Section: video
  Installed-Size: 220
  Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
  Architecture: amd64
  Version: 3.0.8-0ubuntu18.04.1
  Provides: mp3-decoder
  Depends: vlc-bin (= 3.0.8-0ubuntu18.04.1), vlc-plugin-base (= 3.0.8-0ubuntu18.04.1), vlc-plugin-qt (= 3.0.8-0ubuntu18.04.1), vlc-plugin-video-output (= 3.0.8-0ubuntu18.04.1)
  Recommends: vlc-l10n (= 3.0.8-0ubuntu18.04.1), vlc-plugin-notify (= 3.0.8-0ubuntu18.04.1), vlc-plugin-samba (= 3.0.8-0ubuntu18.04.1), vlc-plugin-skins2 (= 3.0.8-0ubuntu18.04.1), vlc-plugin-video-splitter (= 3.0.8-0ubuntu18.04.1), vlc-plugin-visualization (= 3.0.8-0ubuntu18.04.1)
  Description: multimedia player and streamer
   VLC is the VideoLAN project's media player. It plays MPEG, MPEG-2, MPEG-4,
   DivX, MOV, WMV, QuickTime, WebM, FLAC, MP3, Ogg/Vorbis files, DVDs, VCDs,
   podcasts, and multimedia streams from various network sources.
   .
   VLC can also be used as a streaming server that duplicates the stream it
   reads and multicasts them through the network to other clients, or serves
   them through HTTP.
   .
   VLC has support for on-the-fly transcoding of audio and video formats, either
   for broadcasting purposes or for movie format transformations. Support for
   most output methods is provided by this package, but features can be added by
   installing additional plugins:
    * vlc-plugin-access-extra
    * vlc-plugin-fluidsynth
    * vlc-plugin-jack
    * vlc-plugin-notify
    * vlc-plugin-samba
    * vlc-plugin-skins2
    * vlc-plugin-svg
    * vlc-plugin-video-splitter
    * vlc-plugin-visualization
  Homepage: https://www.videolan.org/vlc/
  Original-Maintainer: Debian Multimedia Maintainers <debian-multimedia@lists.debian.org>
  ```

### search

* L'option `-S` ou `--search` liste tous les packages contenant le fichier indiqué.

  ```
  $ sudo dpkg -S venv/
  libpython3.6-stdlib:amd64: /usr/lib/python3.6/venv/scripts/posix/activate.fish
  libpython3.7-stdlib:amd64: /usr/lib/python3.7/venv/scripts
  libpython3.10-stdlib:amd64: /usr/lib/python3.10/venv/scripts/posix/activate.fish
  libpython3.8-stdlib:amd64: /usr/lib/python3.8/venv/__main__.py
  libpython3.9-stdlib:amd64: /usr/lib/python3.9/venv/__init__.py
  ```

### listfiles

* L'option `-L` ou `--listfiles` liste tous les fichiers installés par un package.

  ```
  $ sudo dpkg -L wget
  /.
  /etc
  /etc/wgetrc
  /usr
  /usr/bin
  /usr/bin/wget
  /usr/share
  /usr/share/doc
  /usr/share/doc/wget
  /usr/share/doc/wget/AUTHORS
  /usr/share/doc/wget/MAILING-LIST
  /usr/share/doc/wget/NEWS.gz
  /usr/share/doc/wget/README
  /usr/share/doc/wget/changelog.Debian.gz
  /usr/share/doc/wget/copyright
  /usr/share/info
  /usr/share/info/wget.info.gz
  /usr/share/man
  /usr/share/man/man1
  /usr/share/man/man1/wget.1.gz
  ```

### audit

* L'option `-C` ou `--audit` permet de vérifier si un package a des dépendances non satisfaites et, sur certains systèmes obtenir des indications sur la façon de les corriger. Aucun message signifie que tout va bien.

  ```
  $ sudo dpkg -C gimp
  ```

## dpkg-reconfigure

* Si après l'installation, vous vous rendez compte que vous avez mal configuré le package (ex mauvais langage), il est possible de le reconfigurer:

  ```
  $ sudo dpkg-reconfigure apparmor
  ```

  ![](https://i.imgur.com/5yjt7Nx.png)

---

## apt

* `apt` (*advanced packaging tool*) est un gestionnaire de paquet. Là où pour utiliser dpkg, il faut au préalable télécharger les fichiers .deb, apt va les chercher dans un *package repository* (*dépôt de paquet* en français). Cela permet

  1. de facilement télécharger les packages associés à une application, grâce à la gestion centralisée des packages dans les dépots officiels de la distribution  

  2. d'installer et désinstaller rapiquement des logiciels et utilitaires, grâce au téléchargement automatique de leurs dépendances  

  3. de tenir à jour les applications avec leur version la plus récente, grâce aux utilitaires permettant de comparer les versions des applications installées aux versions disponibles, et de les mettre à jour à la volée

* apt nécessite d'avoir une connexion à internet (alors que dpkg se charge d'installer des fichiers .dpkg téléchargés)

  `apt` et `apt-get` sont deux commandes très similaires: apt est une commande plus récente et qui ajoute des fonctionnalités graphiques, comme l'affichage d'une barre de progression. Typiquement, on utilise apt quand on utilise un terminal et apt-get quand on utilise un script (ex Dockerfile).

* Les dépots à partir desquels apt va chercher les paquets sont définis dans le fichier `/etc/apt/sources.list`

### update

* `update` permet de mettre à jour la base de données des packages disponibles à partir des dépôts

  ```
  $ sudo apt update
  ```

  ![](https://i.imgur.com/wrA19mi.png)

  Est nécessaire lorsqu'on veut installer un package ou vérifier les mises à jour disponibles

### upgrade

* `upgrade` permet de mettre à jour tous les packages installés à la dernière version

  ```
  $ sudo apt upgrade
  ```

  On peut également choisir de mettre à jour un seul package donné:

  ```
  $ sudo apt upgrade vlc
  ```

### dist-upgrade

* `dist-upgrade` permet de mettre à jour des packages en installant ou en supprimant des dépendances si nécessaire

  ```
  $ sudo apt dist-upgrade vlc
  ```

### install

* La sous-commande `install` permet d'installer ou mettre à jour un paquet (avec installation automatique des dépendances):

  ```
  $ sudo apt-get install wget
  ```

  ![](https://i.imgur.com/6QCe64j.png)

  -y pour répondre automatiquement "yes" à toutes les questions

  ```
  $ sudo apt-get -y install wget
  ```

  S'il y a eu un problème pendant l'installation, on peut forcer la réinstallation d'un paquet avec --reinstall:

  ```
  sudo apt --reinstall install postfix
  ```

### download

* `download` permet de télécharger le fichier .deb sans l'installer

  ```
  $ sudo apt-get download vim
  ```

### remove

* `remove` permet de supprimer un package sans supprimer ses dépendances ni ses fichiers de configuration

  ```
  $ sudo apt-get remove wget
  ```

  ![](https://i.imgur.com/77UUn7n.png)

### autoremove

* `autoremove` permet de supprimer un package et ses dépendances — si non utilisées par d'autres packages

  ```
  $ sudo apt-get autoremove wget
  ```

  autoremove sans argument permet de supprimer les dépendances installées qui ne sont associées à aucun package

  ```
  $ sudo apt-get autoremove
  ```

### purge

* `purge` permet de supprimer un package et ses fichiers de configuration

  ```
  $ sudo apt-get purge wget
  ```

  Pour supprimer les dépendances et les fichiers de configurations, on peut utiliser autoremove avec l'option --purge

  ```
  $ sudo apt-get autoremove --purge wget
  ```

### clean

* `clean` permet de supprimer les fichiers .deb en cache dans /var/cache/apt/archives

  ```
  $ sudo apt-get clean
  ```

### search

* `search` permet de chercher un package

  ```
  $ apt search tmux
  Sorting... Done
  Full Text Search... Done
  libjs-xterm/bionic,bionic 2.7.0+ds1-1 all
    terminal front-end component for the browser - browser library

  node-xterm/bionic,bionic 2.7.0+ds1-1 all
    terminal front-end component for the browser - NodeJS modules

  powerline/bionic 2.6-1 amd64
    prompt and statusline utility

  python-libtmux/bionic,bionic 0.7.7-2 all
    Python scripting library and ORM for tmux

  python-tmuxp/bionic,bionic 1.3.5-2 all
    tmux session manager (Python 2)

  python3-libtmux/bionic,bionic 0.7.7-2 all
    Python scripting library and ORM for tmux (python3)

  python3-tmuxp/bionic,bionic 1.3.5-2 all
    tmux session manager (Python 3)

  ruby-notiffany/bionic,bionic 0.1.1-1 all
    Wrapper libray for most popular notification libraries

  tcvt/bionic,bionic 0.1.20171010-1 all
    multicolumn virtual terminal

  tmate/bionic 2.2.1-1build1 amd64
    terminal multiplexer with instant terminal sharing

  tmux/bionic-updates 2.6-3ubuntu0.2 amd64
    terminal multiplexer

  tmux-plugin-manager/bionic,bionic 3.0.0-1 all
    tmux plugin manager based on git

  tmuxinator/bionic,bionic 0.9.0-2 all
    Create and manage tmux sessions easily

  tmuxp/bionic,bionic 1.3.5-2 all
    tmux session manager
  ```

  On peut également effectuer une recherche parmis les informations en cache:

  ```
  $ apt-cache search tmux
  tmux - terminal multiplexer
  libjs-xterm - terminal front-end component for the browser - browser library
  node-xterm - terminal front-end component for the browser - NodeJS modules
  powerline - prompt and statusline utility
  tmate - terminal multiplexer with instant terminal sharing
  tmuxinator - Create and manage tmux sessions easily
  python-libtmux - Python scripting library and ORM for tmux
  python-tmuxp - tmux session manager (Python 2)
  python3-libtmux - Python scripting library and ORM for tmux (python3)
  python3-tmuxp - tmux session manager (Python 3)
  ruby-notiffany - Wrapper libray for most popular notification libraries
  tcvt - multicolumn virtual terminal
  tmux-plugin-manager - tmux plugin manager based on git
  tmuxp - tmux session manager
  ```

### show

* `show` permet d'afficher les informations sur un package

  ```
  $ which tmux
  $ apt-cache show tmux | head
  Package: tmux
  Architecture: amd64
  Version: 2.6-3ubuntu0.2
  Priority: optional
  Section: admin
  Origin: Ubuntu
  Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
  Original-Maintainer: Romain Francoise <rfrancoise@debian.org>
  Bugs: https://bugs.launchpad.net/ubuntu/+filebug
  Installed-Size: 632
  ```

### depends

* `depends` permet d'afficher les dépendances d'un package

  ```
  $ apt-cache depends procinfo
  procinfo
    Depends: libc6
    Depends: libgcc1
    Depends: libncurses5
    Depends: libstdc++6
    Depends: libtinfos
  ```

  `apt-cache unmet` permet d'afficher les dépendances non satisfaites pour un package installé ou le package spécifié

### showpkg

* `showpkg` permet d'afficher la liste des versions disponibles dans les dépots et les dépendances de ces packages

  ```
  $ apt-cache showpkg tmux
  Package: tmux
  Versions: 
  2.6-3ubuntu0.2 (/var/lib/apt/lists/fr.archive.ubuntu.com_ubuntu_dists_bionic-updates_main_binary-amd64_Packages)
  ...

  2.6-3 (/var/lib/apt/lists/fr.archive.ubuntu.com_ubuntu_dists_bionic_main_binary-amd64_Packages)
  ...

  Reverse Depends: 
    tmux-plugin-manager,tmux 1.9
    tmux:i386,tmux
    ubuntu-server,tmux
    ubuntu-remote-debug-host-tools,tmux
    tmuxinator,tmux
    tmuxinator,tmux
    byobu,tmux 1.5
    powerline,tmux
    liquidprompt,tmux
    apt-dater,tmux
    tmux:i386,tmux
    ubuntu-server,tmux
  Dependencies: 
  2.6-3ubuntu0.2 - libc6 (2 2.27) libevent-2.1-6 (2 2.1.8-stable) libtinfo5 (2 6) libutempter0 (2 1.1.5) tmux:i386 (32 (null)) 
  2.6-3 - libc6 (2 2.26) libevent-2.1-6 (2 2.1.8-stable) libtinfo5 (2 6) libutempter0 (2 1.1.5) tmux:i386 (32 (null)) 
  Provides: 
  2.6-3ubuntu0.2 - 
  2.6-3 - 
  Reverse Provides: 
  ```
