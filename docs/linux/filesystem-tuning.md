---
title: Vérifier et réparer le système de fichier
category: Linux
---

## fsck

* `fsck` (*filesystem check*) permet de vérifier et si nécessaire, réparer, un système de fichiers.  
  Il s'agit d'un wrapper faisant en réalité appel à d'autres commandes.

  ``` bash
  $ ls -lhF /sbin/fsck*
  -rwxr-xr-x 1 root root  55K Feb  7  2022 /sbin/fsck*
  -rwxr-xr-x 1 root root  39K Feb  7  2022 /sbin/fsck.cramfs*
  lrwxrwxrwx 1 root root    9 Oct 31  2018 /sbin/fsck.exfat -> exfatfsck*
  lrwxrwxrwx 1 root root    6 Jun  2  2022 /sbin/fsck.ext2 -> e2fsck*
  lrwxrwxrwx 1 root root    6 Jun  2  2022 /sbin/fsck.ext3 -> e2fsck*
  lrwxrwxrwx 1 root root    6 Jun  2  2022 /sbin/fsck.ext4 -> e2fsck*
  -rwxr-xr-x 1 root root  59K May 13  2018 /sbin/fsck.fat*
  -rwxr-xr-x 2 root root 415K Dec 11  2018 /sbin/fsck.jfs*
  -rwxr-xr-x 1 root root 123K Feb  7  2022 /sbin/fsck.minix*
  lrwxrwxrwx 1 root root    8 May 13  2018 /sbin/fsck.msdos -> fsck.fat*
  lrwxrwxrwx 1 root root    8 May 13  2018 /sbin/fsck.vfat -> fsck.fat*
  ```

* Il est nécessaire de démonter le système de fichier avant d'utiliser cette commande.  
  -C pour afficher une barre de progression pendant l'execution

  ![](https://i.imgur.com/mYgHhni.png)

  Un statut de 0 indique qu'il n'y a pas d'erreur: tout s'est bien passé.  
  Un statut de 1 indique qu'il y a des erreurs dans le système de fichiers et qu'il faut le réparer.

* Pour utiliser fsck,

  1. identifier la partition à réparer:

      ``` bash
      $ sudo fdisk -l
      ```

      Ou si la partition est montée, on peut aussi utiliser:

      ``` bash
      $ df -hT
      ```

  2. démonter cette partition

      ``` bash
      $ sudo umount /dev/sdb1
      ```

  3. lancer la vérification du système de fichiers.  
      fsck lancera la vérification adaptée au système de fichiers de la partition cible:  
      si c'est une partition ext4, alors fsck lance automatiquement fsck.ext4

      ``` bash
      $ sudo fsck /dev/sdb1
      fsck from util-linux 2.33.1
      e2fsck 1.44.6 (6-Mar-2019)
      /dev/sdb1 has been mounted 3 times without being checked, check forced.
      Pass 1: Checking inodes, blocks, and sizes
      Pass 2: Checking directory structure
      Pass 3: Checking directory connectivity
      Pass 4: Checking reference counts
      Pass 5: Checking group summary information
      /dev/sdb1: 11/946560 files (0.0% non-contiguous), 83032/3784448 blocks
      ```

      fsck détecte le type de système de fichiers en examinant les premiers octets de la partition.  
      Si fsck ne détecte pas le bon système de fichier, utiliser -t pour le spécifier:

      ``` bash
      $ sudo fsck -t ext4 /dev/sda10
      # ou
      $ sudo fsck.ext4 /dev/sda10
      ```

  4. si la partition est corrompue, on peut la réparer automatiquement avec `fsck`  
      -y (*yes*) pour répondre oui à toutes les questions  
      -f (*force*) pour forcer la vérification même si le système est propre  
      -v (*verbose*) pour le mode verbeux

      <!-- -->

      ``` bash
      $ sudo mount /dev/sdb1 /mnt
      mount: /mnt: wrong fs type, bad option, bad superblock on /dev/sdb1, missing codepage or helper program, or other error.

      $ sudo fsck /dev/sdb1
      fsck from util-linux 2.33.1
      e2fsck 1.44.6 (5-Mar-2019)
      ext2fs_open2: Bad magic number in super-block
      fsck.ext2: Superblock invalid, trying backup blocks...
      Superblock has an invalid journal (inode 8)
      Clear<y>?
      Ctrl^C

      $ sudo fsck -vyf /dev/sdb1
      $ sudo mount /dev/sdb1 /mnt
      $ ls -l /mnt
      ```

### Restaurer le superbloc

* fsck est le wrapper de e2fsck pour les partitions ext2/ext3/ext4

  ``` bash
  $ sudo dumpe2fs /dev/sdb1 | grep superblock
  dumpe2fs 1.44.6 (5-Mar-2019)
  dumpe2fs: Bad magic number in super-block while trying to open /dev/sdb1
  Couldn't find valid filesystem superblock.

  $ sudo e2fsck /dev/sdb -vyf
  ```

  On peut se servir de e2fsck avec l'option -b pour restaurer le superblock à partir d'un backup dans un groupe de blocs. Attention, se faisant vous risquez de perdre des données puisque le système de fichier va être restauré à une valeur antérieure.

  ![](https://i.imgur.com/AU2nF4l.png)

### Forcer fsck au démarrage

* fsck est automatiquement lancé après un certain nombre de montages infructueux ou après un arrêt anormal. Pour forcer la vérification de tous les systèmes de fichiers montés au démarrage:

  ``` bash
  $ sudo touch /forcefsck

  $ sudo reboot
  ```

  Le fichier /forcefsck sera supprimé après une vérification réussie.

## Autres systèmes de fichiers

* Pour d'autres systèmes de fichiers:

  - <ins>xfs</ins>:  
    Vérifier: xfs_db, xfs_repair -n  
    Réparer: xfs_repair

  - <ins>btrfs</ins>: btrfs check, btrfsck (déprécié)
