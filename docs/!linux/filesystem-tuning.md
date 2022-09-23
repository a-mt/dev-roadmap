---
title: Maintenir les partitions
category: Linux
---

## Paramètres d'un SGF

* Le SGF fournit une méthode d'organisation et de gestion des données sur le disque. Dans ce but, il stocke un certain nombre d'informations, telles que le nombre de noeuds disponibles, le label, et la taille des blocs. On dit que ce sont les *paramètres* du SGF. Certains de ces paramètres peuvent être modifiés, ce qui est *personnaliser* (*tuning* en anglais) le système de fichier.

  Notons qu'il est toujours préférable de planifier la création du système de fichier: décider des différents paramètres au moment de formatter le système de fichier, plutôt que de le faire plus tard.

* Pour formatter une partition de la famille *extended* avec des paramètres personnalisés, on peut utiliser `mke2fs`.  
  Cette commande était à la base destinée à ext2 mais on peut également l'utiliser pour du ext4 avec l'option -t

  ```
  MKE2FS(8)

  NAME
      mke2fs - create an ext2/ext3/ext4 filesystem

  SYNOPSIS
      Usage: mke2fs [-c|-l filename] [-b block-size] [-C cluster-size]
        [-i bytes-per-inode] [-I inode-size] [-J journal-options]
        [-G flex-group-size] [-N number-of-inodes] [-d root-directory]
        [-m reserved-blocks-percentage] [-o creator-os]
        [-g blocks-per-group] [-L volume-label] [-M last-mounted-directory]
        [-O feature[,...]] [-r fs-revision] [-E extended-option[,...]]
        [-t fs-type] [-T usage-type ] [-U UUID] [-e errors_behavior][-z undo_file]
        [-jnqvDFSV] device [blocks-count]
  ```

* `dumpe2fs` affiche des informations d'un système de fichiers extended (ext2/ext3/ext4).  
  Affiche le superblock et des informations sur les groupes de blocs du système de fichiers présents sur le périphérique   
  Remarque: si utilisé sur un système de fichiers monté, l'information affichée peut ne plus être à jour, ou être incohérente.

  ``` bash
  $ sudo dumpe2fs /dev/nvme0n1p2
  Filesystem volume name:   <none>
  Last mounted on:          /
  Filesystem UUID:          28a25b21-4cc8-484e-bebe-1d133ce62468
  Filesystem magic number:  0xEF53
  Filesystem revision #:    1 (dynamic)
  Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize metadata_csum
  Filesystem flags:         signed_directory_hash 
  Default mount options:    user_xattr acl
  Filesystem state:         clean
  Errors behavior:          Continue
  Filesystem OS type:       Linux
  Inode count:              31227904
  Block count:              124895488
  Reserved block count:     6244774
  Free blocks:              78832600
  Free inodes:              26310042
  First block:              0
  Block size:               4096
  Fragment size:            4096
  Group descriptor size:    64
  Reserved GDT blocks:      1024
  Blocks per group:         32768
  Fragments per group:      32768
  Inodes per group:         8192
  Inode blocks per group:   512
  Flex block group size:    16
  Filesystem created:       Thu May  6 17:43:51 2021
  Last mount time:          Sat Sep  3 07:34:00 2022
  Last write time:          Sat Sep  3 09:33:59 2022
  Mount count:              719
  Maximum mount count:      -1
  Last checked:             Thu May  6 17:43:51 2021
  Check interval:           0 (<none>)
  Lifetime writes:          5515 GB
  Reserved blocks uid:      0 (user root)
  Reserved blocks gid:      0 (group root)
  First inode:              11
  Inode size:               256
  Required extra isize:     32
  Desired extra isize:      32
  Journal inode:            8
  First orphan inode:       268696
  Default directory hash:   half_md4
  Directory Hash Seed:      004422d3-6b7f-4a0f-b8d6-cb5aa8609018
  Journal backup:           inode blocks
  Checksum type:            crc32c
  Checksum:                 0x4f80b29e
  Journal features:         journal_incompat_revoke journal_64bit journal_checksum_v3
  Journal size:             1024M
  Journal length:           262144
  Journal sequence:         0x01527fea
  Journal start:            131083
  Journal checksum type:    crc32c
  Journal checksum:         0xdf985590

  Group 0: (Blocks 0-32767) csum 0x499f [ITABLE_ZEROED]
    Primary superblock at 0, Group descriptors at 1-60
    Reserved GDT blocks at 61-1084
    Block bitmap at 1085 (+1085), csum 0x28e952d4
    Inode bitmap at 1101 (+1101), csum 0xdb084f5a
    Inode table at 1117-1628 (+1117)
    13151 free blocks, 8173 free inodes, 2 directories, 8172 unused inodes
    Free blocks: 9315-9513, 11561-13408, 13436-13689, 15777-16557, 22699-32767
    Free inodes: 17, 21-8192
  Group 1: (Blocks 32768-65535) csum 0xe2c1 [INODE_UNINIT, ITABLE_ZEROED]
    ...
  ```

  On peut également afficher les paramètres avec `tune2fs -l`

  ``` bash
  $ sudo tune2fs -l /dev/nvme0n1p2
  tune2fs 1.44.1 (24-Mar-2018)
  Filesystem volume name:   <none>
  Last mounted on:          /
  Filesystem UUID:          28a25b21-4cc8-484e-bebe-1d133ce62468
  Filesystem magic number:  0xEF53
  Filesystem revision #:    1 (dynamic)
  Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize metadata_csum
  Filesystem flags:         signed_directory_hash 
  Default mount options:    user_xattr acl
  Filesystem state:         clean
  Errors behavior:          Continue
  Filesystem OS type:       Linux
  Inode count:              31227904
  Block count:              124895488
  Reserved block count:     6244774
  Free blocks:              78832600
  Free inodes:              26310042
  First block:              0
  Block size:               4096
  Fragment size:            4096
  Group descriptor size:    64
  Reserved GDT blocks:      1024
  Blocks per group:         32768
  Fragments per group:      32768
  Inodes per group:         8192
  Inode blocks per group:   512
  Flex block group size:    16
  Filesystem created:       Thu May  6 17:43:51 2021
  Last mount time:          Sat Sep  3 07:34:00 2022
  Last write time:          Sat Sep  3 09:33:59 2022
  Mount count:              719
  Maximum mount count:      -1
  Last checked:             Thu May  6 17:43:51 2021
  Check interval:           0 (<none>)
  Lifetime writes:          5515 GB
  Reserved blocks uid:      0 (user root)
  Reserved blocks gid:      0 (group root)
  First inode:              11
  Inode size:               256
  Required extra isize:     32
  Desired extra isize:      32
  Journal inode:            8
  First orphan inode:       268682
  Default directory hash:   half_md4
  Directory Hash Seed:      004422d3-6b7f-4a0f-b8d6-cb5aa8609018
  Journal backup:           inode blocks
  Checksum type:            crc32c
  Checksum:                 0x6c3a7231
  ```

* `tune2fs` permet d'ajuster les paramètres modifiables des systèmes de fichiers Linux (ext2/ext3/ext4).  
  Penser à le démonter au préalable.

  ``` bash
  $ sudo tune2fs
  tune2fs 1.44.1 (24-Mar-2018)
  Usage: tune2fs [-c max_mounts_count] [-e errors_behavior] [-f] [-g group]
    [-i interval[d|m|w]] [-j] [-J journal_options] [-l]
    [-m reserved_blocks_percent] [-o [^]mount_options[,...]]
    [-r reserved_blocks_count] [-u user] [-C mount_count]
    [-L volume_label] [-M last_mounted_dir]
    [-O [^]feature[,...]] [-Q quota_options]
    [-E extended-option[,...]] [-T last_check_time] [-U UUID]
    [-I new_inode_size] [-z undo_file] device

  $ sudo tune2fs /dev/sdb1 -e remount-ro
  ```

* Il existe d'autres utilitaires pour d'autres systèmes de fichiers:

  - <ins>xfs</ins>: xfs_fsr, xfs_admin
  - <ins>btrfs</ins>: btrfs-balance, btrfstune

---

## Vérifier et réparer le système de fichier

* `fsck` (*filesystem check*) permet de vérifier et si nécessaire, réparer, un système de fichiers.  
  Démonter le système de fichier avant d'utiliser cette commande.
  Note: fsck est un wrapper qui fait appel à d'autres commandes.

  -I pour vérifier ce que fsck va faire, sans qu'il le fasse  
  -C pour afficher une barre de progression pendant l'execution

  ![](https://i.imgur.com/mYgHhni.png)

  Un statut de 0 indique qu'il n'y a pas d'erreur: tout s'est bien passé.  
  Un statut de 1 indique qu'il y a des erreurs dans le système de fichiers et qu'il faut le réparer.

* Pour utiliser fsck,

  1. identifier la partition à traiter:

      ``` bash
      $ sudo fdisk -l
      ```

      Cette commande nous renseignera sur le nom de la partition à examiner.  
      Si la partitione est montée, on peut utiliser la commande `df` qui nous donnera une sortie plus explicite:

      ``` bash
      $ df -hT
      ```

  2. démonter cette partition pour pouvoir l'examiner / réparer

      ``` bash
      $ sudo unmount /dev/partitionname
      ```

  3. lancer la vérification:

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

      L'interface fsck lance le vérificateur adapté au système de fichiers de la partition ciblée:  
      si la partition est formatée en ext4, alors fsck lancera automatiquement fsck.ext4

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

* fsck est un wrapper de e2fsck pour les partitions ext2/ext3/ext4

  ``` bash
  $ sudo dumpe2fs /dev/sdb1 | grep superblock
  dumpe2fs 1.44.6 (5-Mar-2019)
  dumpe2fs: Bad magic number in super-block while trying to open /dev/sdb1
  Couldn't find valid filesystem superblock.

  $ sudo e2fsck /dev/sdb -vyf
  ```

  On peut se servir de e2fsck avec l'option -b pour restaurer le superblock à partir d'un backup dans un groupe de blocs. Attention, se faisant vous risquez de perdre des données puisque le système de fichier va être restauré à une valeur antérieure.

  ![](https://i.imgur.com/AU2nF4l.png)


* Pour d'autres systèmes de fichiers:

  - <ins>xfs</ins>:  
    Vérifier: xfs_db, xfs_repair -n  
    Réparer: xfs_repair

  - <ins>btrfs</ins>: btrfs check, btrfsck (déprécié)
