---
title: Logical Volume Management (LVM)
category: Linux
---

## LVM

* En temps habituel, si on a un disque de 250Go, alors on aura au maximum un système de fichier de 250Go.  
  Et si on a un deuxième disque de 250 Go, alors on aura un deuxième de système de fichier de 250 Go, distinct du premier.

* La gestion de volumes logiques (*logical volume management*, LVM) permet de créer des partitions en utilisant plusieurs disques durs.
  Par exemple, si on a 4 disques de 250Go, on peut créer un groupe logique de 1To sur lequel on pourra créer 1To de fichiers sur un même système de fichier. Cette méthode ne nécessite pas d'arrêter le système et est utilisée lorsqu'on a besoin d'héberger un grand nombre de données.

## Créer un volume logique

1. Pour utiliser le disque entier: s'assurer que le disque est vide, sans table de partition. S'il y a des partitions, les supprimer  

    ``` bash
    $ lsblk -f /dev/sd*
    NAME   FSTYPE LABEL  UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1 ext4   purple 84446293-1640-4c35-b958-d62ebfb32c09    3.4G     0% /mnt
    sda1   ext4   purple 84446293-1640-4c35-b958-d62ebfb32c09    3.4G     0% /mnt
    sdb
    └─sdb1 ext4   blue   bff50a42-7652-4f95-bad9-a02762849e2d
    sdb1   ext4   blue   bff50a42-7652-4f95-bad9-a02762849e2d
    sdc
    └─sdc1 ext4   red    bdf03359-da9e-463d-85df-8f55ebc5129f
    sdc1   ext4   red    bdf03359-da9e-463d-85df-8f55ebc5129f

    $ sudo umount /dev/sda1
    $ sudo gdisk /dev/sda
    $ sudo gdisk /dev/sdb
    $ sudo gdisk /dev/sdc

    $ sudo partprobe
    $ lsblk -f
    NAME            FSTYPE      LABEL UUID                                   FSAVAIL FSUSE% MOUNTPOINT
    sda
    └─sda1
    sdb
    └─sdb1
    sdc
    └─sdc1
    ```

2. <ins>Physical Volume (PV)</ins>
   Convertir ces partitions en *volume physique*.  
   Cette opération ajoute un bloc de données au début du disque, qui le définit comme volume physique.
   Les volumes physiques sont des partitions destinées au gestionnaire de volume.

    ``` bash
    $ sudo pvcreate /dev/sda1
      Physical volume "/dev/sda1" successfully created.
    $ sudo pvcreate /dev/sdb1
      Physical volume "/dev/sdb1" successfully created.
    $ sudo pvcreate /dev/sdc1
      Physical volume "/dev/sdc1" successfully created.
    ```

    ``` bash
    $ sudo pvdisplay
    --- Physical volume ---
    "/dev/sda1" is a new physical volume of "<3.75 GiB"
    --- NEW Physical volume ---
    PV Name               /dev/sda1
    VG Name               
    PV Size               <3.75 GiB
    Allocatable           NO
    PE Size               0
    Total PE              0
    Free PE               0
    Allocated PE          0
    PV UUID               Zs1dcK-KHBR-ULsr-515h-PQL5-cy18-qt8nmW
    ...
    ```

3. <ins>Volume Group (VG)</ins>  
    Créer un *groupe de volumes* contenant différents volumes physiques.  
    Le groupes de volumes sera utilisé comme base pour créer un volume logique — un groupe constitué de 50Go (/dev/sdb1) + 20Go (/dev/sdb2) + 10Go (/dev/sdd1), peut être utilisé pour créer un volume logique de 80Go.

    ``` bash
    $ sudo vgcreate vg /dev/sda1 /dev/sdb1
      Volume group "vg" successfully created
    ```

    ``` bash
    $ sudo vgdisplay
    --- Volume group ---
    VG Name               vg
    System ID             
    Format                lvm2
    Metadata Areas        2
    Metadata Sequence No  1
    VG Access             read/write
    VG Status             resizable
    MAX LV                0
    Cur LV                0
    Open LV               0
    Max PV                0
    Cur PV                2
    Act PV                2
    VG Size               7.49 GiB
    PE Size               4.00 MiB
    Total PE              1918
    Alloc PE / Size       0 / 0
    Free  PE / Size       1918 / 7.49 GiB
    VG UUID               Vh5HAu-ALez-HuLD-qbQq-H6Qb-JzNR-U5Br6e
    ```

    On peut également ajouter un volume physique à un groupe de volumes existant.

    ``` bash
    $ sudo vgextend vg /dev/sdc1
      Volume group "vg" successfully extended

    $ sudo vgdisplay vg -C
      VG #PV #LV #SN Attr   VSize   VFree
      vg   3   0   0 wz--n- <11.24g <11.24g
    ```

    Ou en enlever

    ``` bash
    $ sudo vgreduce vg /dev/sdc1
      Removed "/dev/sdc1" from volume group "vg"

    $ sudo vgdisplay vg -C
      VG #PV #LV #SN Attr   VSize VFree
      vg   2   0   0 wz--n- 7.49g 7.49g
    ```

4. <ins>Logical Volume (LV)</ins>  
    Créer un *volume logique*.  
    -L pour spécifier la taille du volume logique  
    -n pour donner un nom au volume logique  
    Le dernier argument (vg) est le nom du groupe volume d'où le volume logique obtient son espace physique

    ``` bash
    $ sudo lvcreate -n backup -L 2g vg
      Logical volume "backup" created.
    ```

    ``` bash
    $ sudo lvdisplay vg
      --- Logical volume ---
      LV Path                /dev/vg/backup
      LV Name                backup
      VG Name                vg
      LV UUID                dk8Ggf-aKSY-dqQN-weWo-45LT-XEx0-WdskAb
      LV Write Access        read/write
      LV Creation host, time XPS1393057cc859cd, 2023-03-15 15:24:29 +0100
      LV Status              available
      # open                 0
      LV Size                2.00 GiB
      Current LE             512
      Segments               1
      Allocation             inherit
      Read ahead sectors     auto
      - currently set to     256
      Block device           253:3
    ```

    Dans cet exemple, la commande lvcreate crée un fichier virtuel /dev/vg/backup.

    Avoir des volumes physiques physiques supplémentaires dans le groupe de volume permet d'ajouter de l'espace supplémentaire dans le volume logique à la volée, sans temps d'arrêt du système, tant qu'on dispose de suffisamment de volumes physiques connectés.

    ``` bash
    # Ajouter de l'espace
    $ sudo lvextend -L +2G /dev/vg/backup
      Size of logical volume vg/backup changed from 2.00 GiB (512 extents) to 4.00 GiB (1024 extents).
      Logical volume vg/backup successfully resized.

    $ sudo lvdisplay vg -C
      LV     VG Attr       LSize Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
      backup vg -wi-a----- 4.00g
    ```

    ``` bash
    # Enlever de l'espace
    $ sudo lvreduce -L -2G /dev/vg/backup
      WARNING: Reducing active logical volume to 2.00 GiB.
      THIS MAY DESTROY YOUR DATA (filesystem etc.)
    Do you really want to reduce vg/backup? [y/n]: y
      Size of logical volume vg/backup changed from 4.00 GiB (1024 extents) to 2.00 GiB (512 extents).
      Logical volume vg/backup successfully resized.

    $ sudo lvdisplay vg -C
    LV     VG Attr       LSize Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
    backup vg -wi-a----- 2.00g
    ```

5. Créer une partition dans le volume logique.  
    Comme il ne s'agit pas véritablement d'une partition sur un périphérique régulier (mais sur un volume logique), on parle plutôt de *volume LVM*.

    ``` bash
    $ sudo mkfs.ext4 /dev/vg/backup
    mke2fs 1.45.5 (07-Jan-2020)
    Creating filesystem with 524288 4k blocks and 131072 inodes
    Filesystem UUID: 0a1b4426-8323-43c6-abff-4337a661543b
    Superblock backups stored on blocks:
      32768, 98304, 163840, 229376, 294912

    Allocating group tables: done
    Writing inode tables: done
    Creating journal (16384 blocks): done
    Writing superblocks and filesystem accounting information: done
    ```

6. Monter la partition

    ``` bash
    $ sudo mkdir /mylvm
    $ sudo mount /dev/vg/backup /mylvm

    $ df -h /mylvm
    Filesystem             Size  Used Avail Use% Mounted on
    /dev/mapper/vg-backup  2.0G   24K  1.8G   1% /mylvm
    ```

    Pour un montage persistant, l'ajouter à /etc/fstab

    ``` bash
    /dev/vg/backup /mylvm ext4 defaults 1 2
    ```

7. Ajouter de l'espace à la partition  
    Il est facile d'ajouter ou soustraire de l'espace dans un volume logique: il suffit d'augmenter (pourvu qu'on ait des volumes physiques non utilisés dans le groupe de volume) ou réduire sa taille.

    `lvextend` ne peut être utilisé que pour ajouter de l'espace,  
    `lvreduce` ne peut être utilisé que pour enlever de l'espace,
    `lvresize` peut être utilisé pour ajouter ou enlever de l'espace

    Losqu'on agrandit un volume logique contenant un système de fichier, il faut

    1. d'abord agrandir le volume

        ``` bash
        $ sudo chmod -R 755 /mylvm
        $ sudo chown -R $USER: /mylvm
        $ echo "Hello World" > /mylvm/file

        # extend by the amount of free space on physical volume /dev/sdb1:
        $ sudo lvextend /dev/vg/backup /dev/sdb1
          Size of logical volume vg/backup changed from 2.00 GiB (512 extents) to <5.75 GiB (1471 extents).
          Logical volume vg/backup successfully resized.

        $ sudo lvdisplay vg -C
          LV     VG Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
          backup vg -wi-ao---- <5.75g

        $ df -h /mylvm
        Filesystem             Size  Used Avail Use% Mounted on
        /dev/mapper/vg-backup  2.0G   24K  1.8G   1% /mylvm
        ```

    2. agrandir le système de fichier  
       Pour ce faire, il faut au préalable le démonter

        ``` bash
        $ sudo umount /mylvm

        $ sudo e2fsck -f /dev/vg/backup
        e2fsck 1.45.5 (07-Jan-2020)
        Pass 1: Checking inodes, blocks, and sizes
        Pass 2: Checking directory structure
        Pass 3: Checking directory connectivity
        Pass 4: Checking reference counts
        Pass 5: Checking group summary information
        /dev/vg/backup: 12/393216 files (0.0% non-contiguous), 43119/1557504 blocks

        $ sudo resize2fs -p /dev/vg/backup
        resize2fs 1.45.5 (07-Jan-2020)
        Filesystem at /dev/vg/backup is mounted on /mylvm; on-line resizing required
        old_desc_blocks = 1, new_desc_blocks = 1
        The filesystem on /dev/vg/backup is now 1506304 (4k) blocks long.

        $ sudo mount /dev/vg/backup /mylvm
        $ df -h /mylvm
        Filesystem             Size  Used Avail Use% Mounted on
        /dev/mapper/vg-backup  5.6G   24K  5.4G   1% /mylvm
        ```

    Alternative: l'option -r de `lvresize` permet de redimensionner le système de fichier en même temps que le volume. Pour ce faire, il faut au préalable démonter le système de fichier

    ``` bash
    $ sudo umount /mylvm
    $ sudo vgextend vg /dev/sdc1

    $ sudo lvresize -r -L +100M /dev/vg/backup
    fsck from util-linux 2.34
    /dev/mapper/vg-backup: 12/376832 files (0.0% non-contiguous), 42091/1506304 blocks
      Size of logical volume vg/backup changed from 5.84 GiB (1496 extents) to 5.94 GiB (1521 extents).
      Logical volume vg/backup successfully resized.
    resize2fs 1.45.5 (07-Jan-2020)
    Resizing the filesystem on /dev/mapper/vg-backup to 1557504 (4k) blocks.
    The filesystem on /dev/mapper/vg-backup is now 1557504 (4k) blocks long.

    $ sudo mount /dev/vg/backup /mylvm
    $ df -h /mylvm
    Filesystem             Size  Used Avail Use% Mounted on
    /dev/mapper/vg-backup  5.8G   28K  5.6G   1% /mylvm
    ```

8. Enlever de l'espace  
   Lorsqu'on réduit un volume logique contenant un système de fichiers, il faut réduire le système de fichier, puis réduire le volume.

    ``` bash
    $ sudo umount /mylvm

    $ sudo lvresize -r -L 200M /dev/vg/backup
    fsck from util-linux 2.34
    /dev/mapper/vg-backup: 12/638976 files (0.0% non-contiguous), 58796/2539520 blocks
    resize2fs 1.45.5 (07-Jan-2020)
    Resizing the filesystem on /dev/mapper/vg-backup to 51200 (4k) blocks.
    The filesystem on /dev/mapper/vg-backup is now 51200 (4k) blocks long.

      Size of logical volume vg/backup changed from <9.69 GiB (2480 extents) to 200.00 MiB (50 extents).
      Logical volume vg/backup successfully resized.

    $ sudo pvmove /dev/sdc1
    $ sudo vgreduce vg /dev/sdc1
      Removed "/dev/sdc1" from volume group "vg"

    $ sudo mount /dev/vg/backup /mylvm
    $ df -h /mylvm
    Filesystem             Size  Used Avail Use% Mounted on
    /dev/mapper/vg-backup  130M   28K  118M   1% /mylvm
    ```

* Pour récapituler, on peut désigner une partition comme volume physique et l'ajouter à un groupe de volumes. On crée ensuite un volume logique à partir d'un groupe de volumes. Le volume logique peut être formatté avec un système de fichier et monté comme une partition ordinaire.

  En d'autres termes, on peut considérer qu'un groupe de volumes est une sorte de disque virtuel, et qu'un volume logique est une sorte de partition virtuelle sur ce groupe de volume.

  ![](https://i.imgur.com/a1NEEch.png)

  - `pvcreate` pour désigner une partition comme volume physique
  - `vgcreate` pour créer un groupe de volumes à partir de volumes physiques
  - `vgextend` pour ajouter un volume physique à un groupe de volumes
  - `lvcreate` pour créer un volume logique
  - `lvextend` pour ajouter de l'espace à un volume logique
  - `lvm --help` pour voir toutes les commandes LVM

## Device mapper

* Le gestionnaire de volume logique utilise un *device mapper*, qui s'occupe de mapper les blocs physiques des partitions aux blocs logiques du volume logique.  
  Pour voir quelles partitions participent dans des volumes logiques:

  ``` bash
  $ lsblk -f
  NAME            FSTYPE      LABEL UUID                                   FSAVAIL FSUSE% MOUNTPOINT
  sda
  └─sda1          LVM2_member       Zs1dcK-KHBR-ULsr-515h-PQL5-cy18-qt8nmW
    └─vg-backup   ext4              0a1b4426-8323-43c6-abff-4337a661543b      5.3G     0% /mylvm
  sdb
  └─sdb1          LVM2_member       lN6CFO-sRcQ-jqcC-3znn-AXFy-Y086-sE73F8
    └─vg-backup   ext4              0a1b4426-8323-43c6-abff-4337a661543b      5.3G     0% /mylvm
  sdc
  └─sdc1          LVM2_member       0uqK5t-7tHI-3oGR-Ax4h-Q4gY-laL0-2cxn2T
  ```

* Pour connaître le nom du mappeur:

  ``` bash
  $ ls -l /dev/mapper
  total 0
  crw------- 1 root root 10, 236 Mar 15 13:56 control
  lrwxrwxrwx 1 root root       7 Mar 15 15:05 cryptswap -> ../dm-2
  lrwxrwxrwx 1 root root       7 Mar 15 15:05 data-root -> ../dm-0
  lrwxrwxrwx 1 root root       7 Mar 15 15:05 data-swap -> ../dm-1
  lrwxrwxrwx 1 root root       7 Mar 15 15:36 vg-backup -> ../dm-3
  $
  $ readlink -f /dev/mapper/vg-backup
  /dev/dm-3
  ```

  Ou

  ``` bash
  $ lsblk -pf
    NAME                        FSTYPE      LABEL UUID                                   FSAVAIL FSUSE% MOUNTPOINT
    /dev/sda
    └─/dev/sda1                 LVM2_member       Zs1dcK-KHBR-ULsr-515h-PQL5-cy18-qt8nmW
      └─/dev/mapper/vg-backup   ext4              0a1b4426-8323-43c6-abff-4337a661543b      5.3G     0% /mylvm
    /dev/sdb
    └─/dev/sdb1                 LVM2_member       lN6CFO-sRcQ-jqcC-3znn-AXFy-Y086-sE73F8
      └─/dev/mapper/vg-backup   ext4              0a1b4426-8323-43c6-abff-4337a661543b      5.3G     0% /mylvm
    /dev/sdc
    └─/dev/sdc1                 LVM2_member       0uqK5t-7tHI-3oGR-Ax4h-Q4gY-laL0-2cxn2T
    ```

## Snapshots

* Un shapshot LVM crée une copie exacte d'un volume logique existant à un instant T. Les snapshots n'utilisent de l'espace que pour stocker les changements: lorsque le volume logique change, les blocs de données d'origine sont copiés sur le snapshot. C'est utile pour sauvegarder, tester une application ou déployer une machine virtuelle.

* Créer un shapshot:

  ``` bash
  $ sudo lvcreate -l 128 -s -n mysnap /dev/vg/mylvm
  ```

* Monter un shapshot:

  ``` bash
  $ mkdir /mysnap
  $ mount -o ro /dev/vg/mysnap /mysnap
  ```

* Supprimer un shapshot:

  ``` bash
  $ sudo umount /mysnap
  $ sudo lvremove /dev/vg/mysnap
  ```

## Nettoyer

0. Démonter le volume LVM

    ``` bash
    sudo umount /mylvm
    sudo rmdir /mylvm
    ```

1. Supprimer le volume LVM

    ``` bash
    sudo fdisk /dev/vg/backup
    d
    w

    sudo partprobe
    ```

2. Supprimer le volume logique

    ``` bash
    $ sudo lvremove /dev/vg/backup
    Do you really want to remove and DISCARD active logical volume vg/backup? [y/n]: y
      Logical volume "backup" successfully removed
    ```

3. Supprimer le groupe de volumes

    ``` bash
    $ sudo vgremove vg
      Volume group "vg" successfully removed
    ```

4. Supprimer les volumes physiques

    ``` bash
    $ sudo pvremove /dev/sdc1
      Labels on physical volume "/dev/sdc1" successfully wiped.
    $ sudo pvremove /dev/sdb1
      Labels on physical volume "/dev/sdb1" successfully wiped.
    $ sudo pvremove /dev/sda1
      Labels on physical volume "/dev/sda1" successfully wiped.
    ```
