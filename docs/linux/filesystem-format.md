---
title: Formatter les partitions
category: Linux
---

* Une fois qu'une partition a été déclarée dans la table de partition, ne reste plus qu'à la formatter, c'est à dire initialiser la structure de données que le système de fichier utilise — à l'emplacement qui a été déclaré dans la table de partition.

## Lister les SGF

* `/proc/filesystems` contient la liste des systèmes de fichiers supportés par le kernel
  * Si la première colonne contient *nodev* (pour *no device*), c'est que le système de fichier n'est utilisé par aucun périphérique — et si elle est vide, c'est qu'il est utilisé.
  * La deuxième colonne contient le nom du système de fichier

  ```
  $ cat /proc/filesystems
  nodev sysfs
  nodev tmpfs
  nodev bdev
  nodev proc
  nodev cgroup
  nodev cgroup2
  nodev cpuset
  nodev devtmpfs
  nodev configfs
  nodev debugfs
  nodev tracefs
  nodev securityfs
  nodev sockfs
  nodev bpf
  nodev pipefs
  nodev ramfs
  nodev hugetlbfs
  nodev devpts
    ext3
    ext2
    ext4
    squashfs
    vfat
  nodev ecryptfs
    fuseblk
  nodev fuse
  nodev fusectl
  nodev efivarfs
  nodev mqueue
  nodev pstore
    btrfs
  nodev autofs
  nodev binfmt_misc
  nodev overlay
  nodev aufs
  ```

## Lister les partitions et leur SGF

### lsblk -f

* On peut utiliser `lsblk` avec l'option -f (*filesystem*) pour afficher le système de fichier de chaque partition:

  ```
  $ lsblk -f | grep -v loop
  NAME        FSTYPE   LABEL UUID                                 MOUNTPOINT
  nvme0n1
  ├─nvme0n1p1 vfat           EB79-AAE8                            /boot/efi
  └─nvme0n1p2 ext4           28a25b21-4cc8-484e-bebe-1d133ce62468 /
  ```

### blkid

* On peut également utiliser `blkid` pour afficher le type de système de fichier de la partition en cours:

  ```
  $ blkid
  /dev/nvme0n1p1: UUID="EB79-AAE8" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="0b57da2b-7f90-4b10-876d-94c60068e9f8"
  /dev/nvme0n1p2: UUID="28a25b21-4cc8-484e-bebe-1d133ce62468" TYPE="ext4" PARTUUID="b699d032-eea9-431b-bb02-6fb462db6192"
  ```

---

## Formatter une partition

* `mkfs` (*make filesystem*) permet de formatter une partition

  ``` bash
  $ sudo mkfs -t ext4 /dev/sdb1
  ```

  ![](https://i.imgur.com/cLRWqs5.png)

* `mkfs` est un wrapper pour différents systèmes de fichier: on peut obtenir le même résultat avec `mkfs.ext4` (sans le -t ext4)  
  C'est important à savoir car la commande mkfs fournit des options génériques alors que la commande appelée peut avoir des options spécifiques au système de fichiers créé — consulter le manuel pour plus d'infos

  ``` bash
  $ sudo mkfs.ext4 /dev/sdc2
  ```

  ![](https://i.imgur.com/HermTzo.png)

* Une fois partitionné et formatté avec un système de fichier, le périphérique est prêt à être monté et utilisé sous Linux.

  <ins>Exemple: formatter une partition en ext4</ins>

    ``` bash
    $ lsblk -f /dev/sda
    NAME   FSTYPE LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1 vfat         000E-3592

    # Formatter en ext4
    $ sudo mkfs.ext4 /dev/sda1
    mke2fs 1.45.5 (07-Jan-2020)
    /dev/sda1 contains a vfat file system
    Proceed anyway? (y,N) y
    Creating filesystem with 983027 4k blocks and 245760 inodes
    Filesystem UUID: bff50a42-7652-4f95-bad9-a02762849e2d
    Superblock backups stored on blocks:
      32768, 98304, 163840, 229376, 294912, 819200, 884736

    Allocating group tables: done
    Writing inode tables: done
    Creating journal (16384 blocks): done
    Writing superblocks and filesystem accounting information: done

    $ lsblk -f /dev/sda
    NAME   FSTYPE LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1 ext4         000E-3592
    ```

---

## Paramètres d'un SGF

* Le SGF fournit une méthode d'organisation et de gestion des données sur le disque. Dans ce but, il stocke un certain nombre d'informations, telles que le nombre de noeuds disponibles, le label, et la taille des blocs. On dit que ce sont les *paramètres* du SGF. Certains de ces paramètres peuvent être modifiés, ce qu'on appelle *personnaliser* un système de fichier (ou *tuning* en anglais).

* Il est toujours préférable de planifier la création du système de fichier: décider des différents paramètres au moment de formatter le système de fichier, plutôt que de le faire plus tard.

### mke2fs

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

* Notons que `mkfs.ext4` est un raccourci vers mke2fs

  ``` bash
  $ which mkfs.ext4
  /usr/sbin/mkfs.ext4
  $ ls -l /usr/sbin/mkfs.ext4
  lrwxrwxrwx 1 root root 6 Jun  2  2022 /usr/sbin/mkfs.ext4 -> mke2fs
  ```

  ``` bash
  $ sudo mkfs.ext4 /dev/sda1
  mke2fs 1.45.5 (07-Jan-2020)
  ...
  ```

### dumpe2fs

* `dumpe2fs` affiche des informations d'un système de fichiers extended (ext2/ext3/ext4).

  <details>
    <summary>
      Affiche le superblock et des informations sur les groupes de blocs du système de fichiers présents sur le périphérique<br>
      Note: si utilisé sur un système de fichiers monté, l'information affichée peut ne plus être à jour, ou être incohérente.<br><br>

      <pre lang="bash">
      $ sudo dumpe2fs /dev/nvme0n1p2
      Filesystem volume name:   &lt;none>
      Last mounted on:          /
      Filesystem UUID:          28a25b21-4cc8-484e-bebe-1d133ce62468
      ...
      </pre>
    </summary>

    <pre lang="bash">
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
    Check interval:           0 (&lt;none>)
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
    </pre>
  </details>

  <details>
    <summary>
      On peut également afficher les paramètres avec <code>tune2fs -l</code><br><br>

      <pre lang="bash">
      $ sudo tune2fs -l /dev/nvme0n1p2
      tune2fs 1.44.1 (24-Mar-2018)
      Filesystem volume name:   &lt;none>
      Last mounted on:          /
      Filesystem UUID:          28a25b21-4cc8-484e-bebe-1d133ce62468
      ...
      </pre>
    </summary>

    <pre lang="bash">
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
    Check interval:           0 (&lt;none>)
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
    </pre>
  </details>

### tune2fs

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

<ins>Exemples</ins>:

* -c (count) pour modifier le nombre maximum de montages entre les vérifications du système de fichier:

  ``` bash
  $ sudo tune2fs -c 25 /dev/sda1
  ```

* -i (interval) pour modifier l'intervalle de temps entre les contrôles

  ``` bash
  $ sudo tune2fs -i 10 /dev/sda1
  ```

* -l (label) pour modifier le label, et -L pour afficher le label actuel

    ``` bash
    $ lsblk -f /dev/sda
    NAME   FSTYPE LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1 ext4         bff50a42-7652-4f95-bad9-a02762849e2d
    ```

    ``` bash
    # Modifier le label
    $ sudo tune2fs -L blue /dev/sda1
    tune2fs 1.45.5 (07-Jan-2020)

    # Afficher le label
    $ sudo tune2fs -l /dev/sda1
    blue
    ```

    ``` bash
    $ lsblk -f /dev/sda
    NAME   FSTYPE LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1 ext4   blue  bff50a42-7652-4f95-bad9-a02762849e2d
    ```

### Autres systèmes de fichiers

* Il existe d'autres utilitaires pour d'autres systèmes de fichiers:

  - <ins>xfs</ins>: xfs_fsr, xfs_admin
  - <ins>btrfs</ins>: btrfs-balance, btrfstune


  ``` bash
  # Afficher le label
  $ sudo xfs_admin -l /dev/sdb1
  label = "BackupVolume"

  # Modifier le label
  $ sudo xfs_admin -L "FirstFS" /dev/sdb1
  writing all SBs
  new label = "FirstFS"
  ```