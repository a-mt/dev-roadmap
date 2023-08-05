---
title: Quota
category: Linux
---

* Imaginons un serveur dispose de 100T d'espace, et 10 utilisateurs. Pour éviter qu'un utilisateur stocke 80T de données, ne laissant plus que 20% pour les 9 autres, on peut mettre en place des quotas de disque.

  Il s'agit simplement d'un moyen de limiter l'espace de stockage que chaque utilisateur ou groupe peut utiliser, et ainsi donner à chacun une part équitable.

## Activer les quotas

* Installer le programme `quota`:

  ``` bash
  sudo dnf install quota
  ```

* Activer les quota sur le système de fichier concerné:

  ``` bash
  $ sudo vim /etc/fstab
  /dev/vdb1 /mybackups xfs defaults,usrquota,grpquota 0 2
  ```

  usrquota active les quotas pour utilisateurs  
  et grpquota active les quotas pour les groupes

* S'il s'agit du système de fichier racine, sauvegarder et redémarrer.

* Le système de fichier xfs suit nativement la quantité d'espace utilisée par chaque utilisateur, et appliquera donc les limites définies sans plus de manipulation. D'autres systèmes de fichiers, tel que ext4, ne le font pas de base et nécessitent 

  1. de créer des fichiers supplémentaires pour garder une trace de l'espace de stockage utilisé par chaque utilisateur ou groupe:

      ``` bash
      $ sudo quotacheck --create-files --user --group /dev/vdb2
      ```

      Cela créera deux fichiers sur le système de fichier: aquota.group et aquota.user

  2. Activer le suivi des limites de quota sur le point de montage concerné:

      ``` bash
      $ sudo quotaon /mnt
      ```

## Modifier les quotas

* Pour éditer les quotas pour l'utilisateur bob:

  ``` bash
  $ sudo edquota --user bob
  Disk quotas for user bob (uid 1000):
    Filesystem  blocks  soft  hard  inodes  hard
    /dev/vdb1   102400  150M  200M       0     0
  ```

  Cela ouvre un éditeur de texte, il suffit d'éditer les nombres dans chaque colonne.

  On peut définir la limite en terme de quantité de données (blocs), c'est à dire la quantité d'espace disque utilisée, ou quantités d'inode, c'est à dire le nombre de fichiers crées.

* Pour éditer les quotas pour un group, utiliser le flag --group

  ``` bash
  $ sudo edquota --group adm
  ```

## Vérifier les quotas

* Pour vérifier les quotas:

  ``` bash
  $ sudo quota --group adm
  Disk quotas for group adm (gid 4): none
  ```

### Soft vs hard limit

* Pour créer un fichier de 100M:

  ```  bash
  $ fallocate --length 100M /mybackups/bob 100Mfile
  ```

* Dépasser la limite souple — avec un fichier de 60M.  
  La limite de 150M est maintenant dépassée mais on peut quand même créer le fichier.

  ```  bash
  $ fallocate --length 60M /mybackups/bob 60Mfile
  ```

  Dans les quotas de l'utilisateur, on remarque un astérique à côté du nombre de blocs: cela indique que le quota a été dépassé (limite souple) et qu'il y a une période de grâce de 6 jours. Pendant 6 jours, on est autorisé à dépasser la limite souple, temps pendant lequel il faut supprimer des fichiers pour réduire la quantité d'espace disque utilisé, faute de quoi le quota sera appliqué et l'utilisateur ne pourra plus écrire de données.

  ``` bash
  $ sudo quota --user bob
  Disk quotas for user bob (uid 1000):
    Filesystem  blocks    quota   limit  grace  files
    /dev/vdb1   1638409  153600  204800  6days      3
  ```

* Dépasser la limite dure — avec un fichier de 40M.  
  La limite de 200M est maintenant dépassé et on ne peut pas créer le fichier

  ``` bash
  $ fallocate --length 40M /mybackups/bob 40Mfile
  fallocate: fallocate failed: Disk quota exceeded
  ```

  La limite dure ne peut jamais être dépassée.

## Modifier la durée de grâce

* Pour éditer la durée de grâce:

  ``` bash
  $ sudo quota --edit-quota
  Grace period before enforcing soft limits for users:
  Time units may be: days, hours, minutes, or seconds
    Filesystem  Block grace period  Inode grace period
     /dev/vdb1        7days               7days
  ```