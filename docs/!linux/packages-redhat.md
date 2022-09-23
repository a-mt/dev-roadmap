---
title: Packages Red Hat
category: Linux, Packages
---

## Fichier .rpm

* Red Hat a crée son propre format d'archive pour gérer les packages: les fichiers .rpm

* La convention de nommage des fichiers .rpm est comme suit:

  ```
  $ ls -1 *.rpm
  iotop-0.6-4.el7.noarch.rpm
  iptraf-ng-1.1.4-7.el7.x86_64.rpm
  ```

  1. Le nom du package (iotop)
  2. Le numéro de version du logiciel (-0.6) et de la release (-4)
  3. Ne fait pas partie du standard mais est souvent présent: la distribution pour laquelle le package est destiné (.el7) — el désigne Red Hat Entreprise Linux, 7 est la version de la distribution
  4. L'architecture du processeur (.noarch)  
     S'il s'agit d'un package contenant le code source, il s'agit de .src
  5. L'extension .rpm

## rpm

* La commande `rpm` est un utilitaire permettant d'installer, supprimer et fournir des informations sur les packages Red Hat — fichiers .rpm

### checksig

* L'option `checksig` permet de vérifier la signature d'un paquet

  ```
  rpm --checksig fichier.rpm
  ```

### install

* `i` permet d'installer un package .rpm  
  v pour verbose  
  h pour human readable

  ```
  rpm -ivh fichier.rpm
  ```

  ![](https://i.imgur.com/uxhJw7f.png)

### update

* `U` permet de mettre à jour

  ```
  rpm -Uvh fichier.rpm
  ```

  ![](https://i.imgur.com/xiNYz0V.png)

### erase

* `e` permet de désinstaller

  ```
  rpm -evv fichier.rpm
  ```

  ![](https://i.imgur.com/UCeUw6o.png)

### query

* `q` permet de vérifier si un package est installé

  ```
  rpm -q wget
  ```

  ![](https://i.imgur.com/k9w0ONG.png)

* `l` pour lister les fichiers d'un package

  ```
  rpm -ql wget
  ```

* `i` pour afficher les informations d'un package installé

  ```
  rpm -qi wget
  ```

  ![](https://i.imgur.com/4w35R98.png)

  Ajouter `p` pour obtenir les informations d'un package non installé — à partir du fichier .rpm

  ```
  rpm -qip fichier.rpm
  ```

* `R` pour afficher les dépendances d'un package

  ```
  rpm -qR iotop
  ```

  ![](https://i.imgur.com/IKUADEw.png)

* `a` pour lister tous les paquets installés

  ```
  rpm -qa
  ```

* `whatprovides` pour afficher dans quel package se trouve un fichier donné

  ![](https://i.imgur.com/traRT9b.png)

### verify

* `V` pour vérifier un package: s'il n'y a pas de message, c'est qu'il n'y a pas de problème

  ![](https://i.imgur.com/94KzUPD.png)

### extract

* Pour extraire un fichier rpm sans l'installer:

  1. mettre les fichiers dans une archive cpio

      ```
      npm2cpio filename.rpm > name.cpio
      ```

  2. Extraire l'archive .cpio

      ```
      cpio -idv < name.cpio
      ```

---

## yum

* `yum` (Yellowdog Updater Modifier) est un gestionnaire de paquet. Même principe que apt mais pour Red Hat: il permet d'installer des packages et leurs dépendances à partir de dépôts de package — nécessite une connexion internet. yum est également utilisé sous Fedora

* La liste des dépôts est située dans le dossier `/etc/yum.repos.d/`  
  Contrairement à apt, yum met à jour sa liste de packages automatiquement.

  ![](https://i.imgur.com/DBakila.png)

  repolist permet de lister tous les repos du système

  ```
  yum repolist
  ```

* La configuration de yum est dans `/etc/yum.conf`

  ![](https://i.imgur.com/qrt9gCo.png)

  - Par exemple, si `assumeyes` n'est pas définit alors yum demandera confirmation avant d'effectuer des changements. Ce comportement peut être changé avec -y en ligne de commande ou avec assumeyes=1 dans le fichier de configuration

  - `gpgcheck=1` signifie que yum vérifiera les signatures et échouera si elles ne correspond pas

### install

* La sous-commande `install` permet d'installer un package

  ```
  yum install wget
  ```

  ![](https://i.imgur.com/WNhpf8b.png)

  `-y` pour répondre automatiquement "yes" à toutes les questions

  ```
  yum -y install wget
  ```

* Si nécessaire, il est possible de réinstaller un package avec `reinstall`

  ```
  yum reinstall uptraf-ng
  ```

### remove

* `remove` permet de désinstaller un package

  ```
  yum remove wget
  ```

  ![](https://i.imgur.com/i5sKWIx.png)

### check-update

* `check-update` permet de vérifier les mises à jour disponibles

  ```
  yum check-update
  ```

### update

* `update` permet de mettre à jour un package

  ```
  yum update wget
  ```

  ![](https://i.imgur.com/Vs3waHN.png)

  Sans argument, update met à jour tous les packages du système

### list

* `list` permet de lister tous les packages correspondant à un motif (installés ou non)

  ![](https://i.imgur.com/sGeU5dp.png)

* On peut restreindre la recherche aux packages installés en ajoutant l'argument installed

  ```
  yum list installed | less
  ```

  On peut restreindre la recherche aux packages non installés en ajoutant l'argument available

  ```
  yum list available | less
  ```

### installed

* `installed` permet de lister tous les packages installés

  ```
  yum installed
  ````

### deplist

* `deplist` liste les dépendances d'un package

  ```
  yum deplist iotop
  ```

  ![](https://i.imgur.com/NFL3oY9.png)

### info

* `info` permet de lister les informations concernant un package

  ```
  yum info wget
  yum list wget
  ```

  ![](https://i.imgur.com/8y839eB.png)
  ![](https://i.imgur.com/mhev10O.png)

### search

* `search` permet de chercher un package

  ```
  yum search wget
  ```

### clean

* `clean` permet de vider le cache `/var/cache/yum`

  ```
  yum clean all
  ```

  ![](https://i.imgur.com/TWmubyS.png)

### history

* `history` retourner l'historique des transactions yum

  ```
  yum history
  ```

### groups

* `groups` permet d'installer des groupes de packages. Par exemple, un groupe pour installer le bureau Gnome

  ```
  yum groups list                   # lister les groupes
  yum groups info gnome | less      # afficher les infos sur un groupe
  yum groups install gnome          # installer le groupe
  yum groups update gnome           # mettre à jour le groupe
  yum groups remove gnome           # supprimer le groupe
  ```

### provides

* `provides` pour afficher dans quel package se trouve un fichier donné

  ![](https://i.imgur.com/dbpgh3S.png)

## yumdownload

* yumdownloader permet de télécharger le fichier .rpm sans l'installer

  ```
  yumdownloader iotop
  yumdownloader iptraf
  ```
