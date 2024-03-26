---
title: Packages OpenSuse
category: Linux, Packages
---

## zypper

* zypper est un package manager utilisé à la place de yum sous OpenSuse.

* La liste des dépôts est située dans le dossier `/etc/zypp/repos.d` et la configuration de yum dans `/etc/zypp/zypper.conf`

  ![](https://i.imgur.com/k33cwoj.png)

* `lr` permet de lister les repositories

  ![](https://i.imgur.com/X5H5X3f.png)

### refresh

* `refresh` permet de mettre à jour la base de données des packages disponibles à partir des dépôts

  ![](https://i.imgur.com/v2GWatQ.png)

  La plupart des commandes zypper ont des versions courtes: par exemple, on peut utiliser `zypper ref` au lieu de `zypper refresh`

### install

* `install` permet d'installer un package

  ![](https://i.imgur.com/2DLIT9A.png)

### update

* `update` permet de mettre à jour un package

  ![](https://i.imgur.com/dXKWuXe.png)

### remove

* `remove` permet de désinstaller un package

  ![](https://i.imgur.com/suVOpFe.png)

### search

* `search` permet de chercher les packages qui correspondent à un motif donné  
  La première colonne indique si le package est installé ou non

  ![](https://i.imgur.com/RGsSTuP.png)

  Pour lister tous les packages installés:

  ```
  zypper search -i
  ```

### info

* `info` permet d'afficher les infos d'un package — qu'il soit installé ou non

  ![](https://i.imgur.com/R6pRZ1M.png)

### what-provides

* `what-provides` indique quel package installe un fichier donné

  ![](https://i.imgur.com/v3tgu4W.png)

### verify

* `verify` permet de vérifier l'intégrité d'un package

  ![](https://i.imgur.com/1fVBkc6.png)

### list-updates

* `list-updates` permet de vérifier s'il y a des mises à jour disponibles pour les packages installés


  ![](https://i.imgur.com/nuC8nPK.png)
