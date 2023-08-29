---
title: Permissions par défaut
category: Linux, Fichiers
---

## Permissions par défaut

### Utilisateur

Lorsqu'un fichier ou répertoire est créé, l'utilisateur en cours est assigné comme utilisateur propriétaire.  

* Pour voir l'utilisateur en cours:

  ``` bash
  $ whoami
  am
  ```

### Groupe

Lorsqu'un fichier ou répertoire est créé, le groupe en cours est assigné comme groupe propriétaire. Quand un utilisateur s'identifie, son groupe principal devient le groupe en cours.

* Pour voir le groupe en cours:

  ``` bash
  $ id -gn
  am
  ```

  Cette partie peut déconcerter: il s'agit généralement du même nom que le nom d'utilisateur. C'est typique de nombreuses distributions Linux: un groupe est crée lors de la création du compte utilisateur et il a exactement le même nom que l'utilisateur. Ce groupe est souvent le groupe principal et il devient le groupe en cours lorsqu'on se connecte.

* Pour voir tous les groupes de l'utilisateur en cours:

  ``` bash
  $ id
  uid=1000(am) gid=1000(am) groups=1000(am),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),118(lpadmin),128(sambashare),1001(docker)
  $
  $ groups
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  $
  $ id -Gn
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  ```

* Pour changer de groupe en cours:

  ``` bash
  $ newgrp adm
  $ id -gn
  adm
  ```

  Il n'est pas possible de désigner un groupe qui ne fait pas partie des groupes de l'utilisateur comme groupe en cours.

### Droits

* Par défaut, les fichiers sont créés avec le code octal 0666 (rw-rw-rw- en symbolique):  
  pas de permissions spéciales, et la lecture & écriture est assignée à tous les utilisateurs.

  Les répertoires sont créés avec le code octal 0777 (rwxrwxrwx):  
  pas de permissions spéciales, et lecture / écriture & exécution assignée à tous les utilisateurs.

* La masque de création par défaut permet de soustraire des permissions des paramètres par défaut prédéfinis.  
  `umask` permet de visualiser le masque:

  ``` bash
  $ umask
  0002
  ```

  Notons qu'il y a 4 chiffres dans ce numéro: il s'agit des permissions spéciales, utilisateur, groupe et autres en octal. En l'occurence, on retire le droit 2 (écriture) de l'ensemble "autre", donc les fichiers seront créés avec le code octal 0664 et les répertoires 0775:

  ``` bash
  $ touch newfile
  $ ls -l newfile
  -rw-rw-r-- 1 am adm 0 juil. 21 15:38 newfile
  $
  $ mkdir newdir
  $ ls -ld newdir
  drwxrwxr-x 2 am adm 4096 juil. 21 15:38 newdir
  ```

  On peut également afficher le masque en mode symbolique:

  ``` bash
  $ umask -S
  u=rwx,g=rwx,o=rx
  ```

* Pour modifier le masque par défaut, passer le nouveau masque en argument à `umask`:

  ``` bash
  $ umask 0026
  $ umask
  0026
  ```

  ``` bash
  $ touch newfile2
  $ ls -l newfile2
  -rw-r----- 1 am adm 0 juil. 21 15:40 newfile2
  $
  $ mkdir newdir2
  $ ls -ld newdir2
  drwxr-x--x 2 am adm 4096 juil. 21 15:42 newdir2
  ```

  Et on peut définir le masque en mode symbolique:

  ``` bash
  $ umask u=r,g=w,o=rw
  $ umask
  0351
  ```