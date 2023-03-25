---
title: Packages Red Hat
category: Linux, Packages
---

## Fichier .rpm

* Red Hat a crée son propre format d'archive pour gérer les packages: les fichiers .rpm

* La convention de nommage des fichiers .rpm est comme suit:

  ```
  <name>-<version>-<release>.<distro>.<architecture>.rpm
  ```

  Par exemple:

  ```
  $ ls -1 *.rpm
  iotop-0.6-4.el7.noarch.rpm
  iptraf-ng-1.1.4-7.el7.x86_64.rpm
  sed-4.5-2.e18.x86_64.rpm
  sed-4.5-2.e18.src.rpm
  ```

  1. Le nom du package (iotop)
  2. Le numéro de version du logiciel (-0.6) et de la release (-4)
  3. Ne fait pas partie du standard mais est souvent présent: la distribution pour laquelle le package est destiné (.el7) — el désigne Red Hat Entreprise Linux, 7 est la version de la distribution
  4. L'architecture du processeur (.noarch)  
     S'il s'agit d'un package contenant le code source, il s'agit de .src
  5. L'extension .rpm

## rpm

* La commande `rpm` est un utilitaire permettant d'installer, supprimer et fournir des informations sur les packages Red Hat — fichiers .rpm

* La base de données de rpm se situe dans le répertoire /var/lib/rpm. Un autre répertoire peut ête spécifié avec l'option --dbpath. Cela peremt notamment d'examiner une base de données RPM copiée à partir d'un autre système

* Des configs par défaut peuvent être spécifiées. Par défaut, rpm cherche les fichiers suivants:

  1. /usr/lib/rpm/rpmrc
  2. /etc/rpmrc
  3. ~/.rpmrc

  Notons que tous les fichiers sont lus, rpm ne s'arrête pas au premier fichier trouvé.  
  Un autre fichier peut être spécifié avec l'option --rcfile

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

* Pour lister tous les fichiers dans un package:

  ```
  $ rpm -qilp package.rpm
  ```

### update

* `U` permet de mettre à jour  
  Si le package n'est pas déjà installé, alors rpm installe le package sans lever d'erreur

  ```
  rpm -Uvh fichier.rpm
  ```

  ![](https://i.imgur.com/xiNYz0V.png)

* Pour installer une ancienne version, il faut ajouter l'option --oldpackage

### freshening

* `F` permet de rafraîchir des packages:
  - si une ancienne version du package est installée, la mise à jour est appliquée
  - si la version installé est la même que celle du fichier .rpm, rien ne se passe
  - si aucune version du package n'est installé, alors le package est ignoré

  ```
  $ sudo rpm -Fvh *.rpm
  ```

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

* Cette option peut être combinée avec d'autres options:

  - `f` pour trouver de quel package un fichier vient

    ```
    rpm -qf /bin/bash
    ```

  - `l` pour lister les fichiers d'un package donné

    ```
    rpm -ql wget
    ```

  - `a` pour afficher tous les packages installés sur le système

    ```
    rpm -qa
    ```

  - `i` pour afficher les informations d'un package installé

    ```
    rpm -qi wget
    ```

    ![](https://i.imgur.com/4w35R98.png)

  - `p` pour effectuer la requête à partir d'un fichier .rpm au lieu de la base de données

    ```
    rpm -qip fichier.rpm
    ```

  - `R` ou `--requires` pour afficher les dépendances d'un package

    ```
    rpm -q --requires bash
    rpm -qp --requires foo-1.0.0-1.noarch.rpm 

    rpm -qR iotop
    ```

    ![](https://i.imgur.com/IKUADEw.png)


  - `--whatprovides` pour afficher dans quel package se trouve un fichier donné

    ```
    rpm -q --whatprovides libc.so.6
    ```

    ![](https://i.imgur.com/traRT9b.png)

### verify

* `V` pour vérifier un package: s'il n'y a pas de message, c'est qu'il n'y a pas de problème

  ![](https://i.imgur.com/94KzUPD.png)

* En cas de problème, le résultat peut contenir des

  - "." (points): indique que le test a réussit
  - "?" (point d'interrogation): indique que le test n'a pas pu être effectué — par exemple, les permissions du fichier empêchent la lecture
  - des caractères: indique quel test a échoué

    S : la taille des fichiers diffère
    M : le mode diffère (autorisations et type de fichier)
    5 : la somme MD5 diffère
    D : le numéro majeur/mineur du périphérique ne correspond pas
    L : incompatibilité du chemin d'accès à readLink
    U : la propriété de l'utilisateur diffère
    G : la propriété du groupe diffère
    T : la date de modification diffère 

  Par exemple:

  ```
  # taille du fichier, checksum et date de modification
  $ rpm -V logrotate
  S.5....T. c /etc/logrotate.conf 

  # fichier manquant
  $ sudo mv /sbin/logrotate /sbin/logrotate_KEEP
  $ rpm -V logrotate
  S.5....T. c /etc/logrotate.conf
  missing    /usr/sbin/logrotate
  ```

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

* La liste des dépôts est dans le dossier `/etc/yum.repos.d/`  
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
