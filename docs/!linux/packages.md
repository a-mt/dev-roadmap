---
title: Packages
category: Linux
---

* Un *package* (*paquet* en français) est une archive contenant un ensemble d'éléments centré autour d'un logiciel, on y trouvera notamment des fichiers exécutables, des pages de manuel et des informations sur la licence. On a par exemple des packages pour installer gimp et sa manpage, ou des packages contenant des libraires partagées.

* On peut trouver des packages qui contiennent

  - le code binaire: code exécutable. On général, ces packages se présentent sous la forme de fichier Debian (.deb) ou RedHat (.rpm)

  - ou le code source: code non compilé. Ce type de package est souvent utilisé pour développer ou inspecter le code d'une application, mais on peut également les utiliser pour compiler soi-même le code si nécessaire. Il s'agit généralement d'un tarball

    Pour compiler: `make`  
    Pour installer le fichier compilé: `make install`  

* Installer, mettre à jour ou supprimer des packages requiert toujours les privilèges root.

<!-- -->

* Différentes distributions ont différents utilitaires pour gérer les packages:
  * [Debian: dpkg, apt](packages-debian.md)
  * [Red Hat: rpm, yum](packages-redhat.md)
  * [OpenSuse: zypper](packages-opensuse.md)
