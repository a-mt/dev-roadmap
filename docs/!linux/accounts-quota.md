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

* Activer les quota sur le système de fichier concerné avec les options de montage:

  - `usrquota` pour activer les quotas utilisateur  
  - `grpquota` pour activer les quotas de groupe

  ``` bash
  $ sudo vim /etc/fstab
  /dev/vdb1 /mybackups xfs defaults,usrquota,grpquota 0 2
  ```

  S'il s'agit du système de fichier racine, sauvegarder et redémarrer.

* Le système de fichier xfs garde nativement la trace de la quantité d'espace utilisée par chaque utilisateur, et appliquera donc les limites définies sans plus de manipulation. D'autres systèmes de fichiers, tel que ext4, ne le font pas de base et nécessitent des étapes supplémentaires pour activer les quotas:

  1. Créer des fichiers pour garder une trace de l'espace de stockage utilisé par chaque utilisateur ou groupe:

      ``` bash
      $ sudo quotacheck --create-files --user --group /dev/vdb2
      ```

      Cela créera deux fichiers sur le système de fichier: <ins>aquota.group</ins> et <ins>aquota.user</ins>

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

  Aura pour effet d'ouvrir un éditeur de texte, il suffit alors d'éditer les nombres dans chaque colonne.

  On peut définir le quota en terme de quantité de données (blocs), c'est à dire la quantité d'espace disque utilisée,  
  ou quantités d'inode, c'est à dire le nombre de fichiers crées.

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

  ``` bash
  $ sudo edquota --user bob
  Disk quotas for user bob (uid 1000):
    Filesystem  blocks  soft  hard  inodes  hard
    /dev/vdb1   102400  150M  200M       0     0
  ```

* Pour créer un fichier de 100M:

  ```  bash
  $ fallocate --length 100M /mybackups/bob 100Mfile
  ```

### Soft vs hard limit

* Si on dépasse la limite souple de l'utilisateur, sans dépasser la limite dure, on peut quand même créer le fichier.

  ```  bash
  # Dépasser la limite souple de 150M (crée un fichier de 60M): autorisé
  $ fallocate --length 60M /mybackups/bob 60Mfile
  ```

  Dans les quotas de l'utilisateur, on remarque un astérique à côté du nombre de blocs: il indique que la limite souple a été dépassée et qu'il y a une période de grâce, qui est de 6 jours par défaut. Pendant 6 jours, on est autorisé à dépasser la limite souple, temps pendant lequel il faut supprimer des fichiers pour réduire la quantité d'espace disque utilisé, faute de quoi le quota sera appliqué et l'utilisateur ne pourra plus écrire de données.

  ``` bash
  $ sudo quota --user bob
  Disk quotas for user bob (uid 1000):
    Filesystem  blocks    quota   limit  grace  files
    /dev/vdb1   1638409  153600  204800  6days      3
  ```

* Si on dépasse la limite dure de l'utilisateur, on ne peut pas créer le fichier. La limite dure ne peut jamais être dépassée

  ``` bash
  # Dépasser la limite souple de 200M (crée un fichier de 40M: rejeté
  $ fallocate --length 40M /mybackups/bob 40Mfile
  fallocate: fallocate failed: Disk quota exceeded
  ```

* Pour générer un rapport des quotas:

  ``` bash
  $ sudo repquota -s /
  *** Report for user quotas on device /dev/vda1
  Block grace time: 7days; Inode grace time: 7days
                          Space limits                File limits
  User            used    soft    hard  grace    used  soft  hard  grace
  ----------------------------------------------------------------------
  root      --   1696M      0K      0K          75018     0     0
  daemon    --     64K      0K      0K              4     0     0
  man       --   1048K      0K      0K             81     0     0
  nobody    --   7664K      0K      0K              3     0     0
  syslog    --   2376K      0K      0K             12     0     0
  sammy     --     40K    100M    110M             13     0     0
  ```

## Modifier la durée de grâce

* Pour éditer la durée de grâce:

  ``` bash
  $ sudo quota --edit-quota
  Grace period before enforcing soft limits for users:
  Time units may be: days, hours, minutes, or seconds
    Filesystem  Block grace period  Inode grace period
     /dev/vdb1        7days               7days
  ```
