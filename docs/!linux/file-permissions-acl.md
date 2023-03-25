---
title: Permissions ACL
category: Linux, Fichiers
---

## ACL

* Les ACL (*Access Control List*) POSIX permettent d'accorder des privilèges spécifiques à certains utilisateurs ou groupes, de manière plus fine que le système de droits utilisateur/groupe/autre.

### Support

* Pour pouvoir utiliser les ACL, le système de fichier doit les supporter.  
  Pour vérifier quels systèmes de fichier sont concernés:

    ```
    $ grep ACL /boot/config-$(uname -r)
    CONFIG_XILINX_EMACLITE=m
    CONFIG_EXT4_FS_POSIX_ACL=y
    CONFIG_REISERFS_FS_POSIX_ACL=y
    CONFIG_JFS_POSIX_ACL=y
    CONFIG_XFS_POSIX_ACL=y
    CONFIG_BTRFS_FS_POSIX_ACL=y
    CONFIG_F2FS_FS_POSIX_ACL=y
    CONFIG_FS_POSIX_ACL=y
    CONFIG_SHIFT_FS_POSIX_ACL=y
    CONFIG_NTFS3_FS_POSIX_ACL=y
    CONFIG_TMPFS_POSIX_ACL=y
    CONFIG_JFFS2_FS_POSIX_ACL=y
    CONFIG_EROFS_FS_POSIX_ACL=y
    CONFIG_NFS_V3_ACL=y
    CONFIG_NFSD_V2_ACL=y
    CONFIG_NFSD_V3_ACL=y
    CONFIG_NFS_ACL_SUPPORT=m
    CONFIG_CEPH_FS_POSIX_ACL=y
    CONFIG_9P_FS_POSIX_ACL=y
    ```

* Il faut également que l'option ACL soit activée.  
  Le support des acl est actif par défaut sur les principaux systèmes de fichiers Linux (dont ext4), et il est possible d'utiliser l'option -acl lors du montage pour l'activer ou -noacl pour le désactiver

### Lister

* `getfacl` permet d'afficher les ACL sur un fichier

    ``` bash
    $ touch afile
    $ getfacl afile
    # file: afile
    # owner: am
    # group: am
    user::rw-
    group::rw-
    other::r--
    ```

* Un "+" dans le résultat de ls -l indique la présence d'une ACL.

    ```
    $ ls -l afile
    -rw-rwxr--+ 1 aurelie aurelie 0 Mar 24 20:54 afil
    ```

### Modifier

* `setfacl -m` permet d'ajouter des ACL sur un fichier

    ``` bash
    $ setfacl -m u:isabelle:rx afile
    $ getfacl afile
    # file: afile
    # owner: am
    # group: am
    user::rw-
    user:isabelle:r-x
    group::rw-
    mask::rwx
    other::r--
    ```

    On peut spécifier plusieurs utilisateurs (u/user) ou groupes (g/group) en les séparant par des virgules:

    ``` bash
    $ setfacl -m user:utilisateur:rwx,user:utilisateur2:r,group:groupe:rw fichier
    ```

* La valeur par défaut d'un répertoire (si définie) est héritée par les nouveaux fichiers crées dans ce répertoire. Pour la définir:

    ``` bash
    $ setfacl -m d:u:isabelle:rx adir
    ```

### Supprimer

* `setfacl -x` permet de supprimer des ACL

    ``` bash
    $ setfacl -x u:isabelle afile
    $ getfacl afile
    # file: afile
    # owner: am
    # group: am
    user::rw-
    group::rw-
    mask::rw-
    other::r--
    ```
