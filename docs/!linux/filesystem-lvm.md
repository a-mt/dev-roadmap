---
title: Logical Volume Management (LVM)
category: Linux
---

## LVM

* En temps habituel, si on a un disque de 250Go, alors on aura au maximum un système de fichier de 250Go.  
  Et si on a un deuxième disque de 250 Go, alors on aura un deuxième de système de fichier de 250 Go, distinct du premier.

* La gestion de volumes logiques (*logical volume management*, LVM) permet de créer des partitions en utilisant plusieurs disques durs.
  Par exemple, si on a 4 disques de 250Go, on peut créer un groupe logique de 1To sur lequel on pourra créer 1To de fichiers sur un même système de fichier. Cette méthode ne nécessite pas d'arrêter le système et est utilisée lorsqu'on a besoin d'héberger beaucoup de données.

## Créer un volume logique

1. Pour utiliser le disque entier: s'assurer que le disque est vide, sans table de partition.  
    S'il y a des partitions, les supprimer.

    ```
    sudo fdisk -l /dev/sdb

    sudo umount /dev/sdb1
    sudo umount /dev/sdb2

    sudo fdisk /dev/sdb
    p
    d
    1

    p
    d
    2

    p
    w

    sudo partprobe
    ```

2. <ins>Physical Volume (PV)</ins>  
   Créer un *volume physique* sur chaque disque.  
   Cette opération ajoute un bloc de données au début du disque, qui le définit comme volume physique.
   Les volumes physiques sont en fait des partitions destinées au gestionnaire de volume.

    ```
    pvcreate /dev/sda1
      Physical volume "/dev/sda1" successfully created.

    pvcreate /dev/sdb
    WARNING: dos signature detected on /dev/sdb at offset 510. Wipe it? [y/n]: y
      Wiping dos signature on /dev/sdb
      Physical volume "/dev/sdb" successfully created.

    pvcreate /dev/sdc
      Physical volume "/dev/sdd" successfully created.
    ```

    ![](https://i.imgur.com/EUp57qy.png)

    ```
    sudo pvdisplay
    ```

    ![](https://i.imgur.com/ARUptRe.png)

3. <ins>Volume Group (VG)</ins>  
    Créer un *groupe de volumes* avec les différents volumes physiques.  
    Le groupes de volumes sera utilisé comme base pour créer un volume logique — un groupe constitué de 50Go (/dev/sdb) + 20Go (/dev/sdb) + 10Go (/dev/sdd), peut être utilisé pour créer un volume logique de 80Go.

    ```
    vgcreate datavg /dev/sda1 /dev/sdb
    ```

    ![](https://i.imgur.com/B2LUgvQ.png)

    On peut également ajouter un nouveau volume physique à un groupe de volumes existant.

    ```
    vgextend datavg /dev/sdc2
    ```

    ```
    sudo vgdisplay
    ```

    ![](https://i.imgur.com/mjbubpD.png)

4. <ins>Logical Volume (LV)</ins>  
    Créer un *volume logique*.  
    -l pour spécifier la taille du volume logique  
    -n pour donner un nom au volume logique
    Le dernier argument (LAB1) est le nom du groupe volume d'où le volume logique obtient son espace physique

    ```
    lvcreate -n backup –size 500G datavg
      Logical volume "backup" created.
    ```

    ![](https://i.imgur.com/xOTQAkf.png)

    Avoir des volumes physiques physiques supplémentaires dans le groupe de volume permet d'ajouter de l'espace supplémentaire dans le volume logique à la volée, sans temps d'arrêt du système, tant qu'on dispose de suffisamment de volumes physiques connectés.

    ```
    #extend 200GB available on free space of /dev/datavg/backup
    lvextend -L +200G /dev/datavg/backup
    ```

    ```
    sudo lvdisplay
    ```

    ![](https://i.imgur.com/74G2snT.png)

    Dans cet exemple, la commande lvcreate crée un fichier virtuel /dev/datavg/backup.

5. Créer une partition dans le volume logique.  
    Comme il ne s'agit pas véritable d'une *partition* sur un périphérique régulier,  
    mais d'une partition sur un volume logique, on parle généralement de *volume LVM*.

    * Créer une partition

      ```
      sudo fdisk /dev/datavg/backup
      p

      n
      p
      # valeurs par défaut

      p
      w
      sudo partprobe
      ```

      ```
      sudo mkfs.ext4 /dev/datavg/backup
      ```

    * Monter la partition temporairement

      ```
      mkdir /srv/backup
      mount /dev/datavg/backup /srv/backup
      ```

      Pour un montage persistant, l'ajouter à /etc/fstab

      ```
      /dev/datavg/backup /srv/backup    ext4    defaults        0       2
      ```

    * Ajouter de l'espace à la partition

      ```
      #extend the size by the amount of free space on physical volume /dev/sdc2
      lvextend  /dev/datavg/backup  /dev/sdc2
      resize2fs -p /dev/datavg/backup
      ```

* Pour récapituler, on peut désigner une partition comme volume physique et l'ajouter à un groupe de volumes. On crée ensuite un volume logique à partir d'un groupe de volumes. Le volume logique peut être formatté avec un système de fichier et monté — comme une partition ordinaire.

  ![](https://i.imgur.com/Qsl6I9E.jpg)

  - `pvcreate` pour désigner une partition comme volume physique
  - `vgcreate` pour créer un groupe de volumes à partir de volumes physiques
  - `vgextend` pour ajouter un volume physique à un groupe de volumes
  - `lvcreate` pour créer un volume logique
  - `lvextend` pour ajouter de l'espace à un volume logique
  - `lvm --help` pour voir toutes les commandes LVM

## Device mapper

* Le gestionnaire de volume logique utilise un *device mapper*, qui s'occupe de mapper les blocs physiques des partitions aux blocs logiques du volume logique. Pour voir quelles partitions participent dans des volumes logiques:

  ```
  $ ls /dev/mapper
  centos-root  centos-swap  control
  ```

  ```
  $ lsblk -f /dev/sda2
  NAME           FSTYPE      LABEL UUID                                   MOUNTPOINT
  sda2           LVM2_member       TvQtTi-FK3L-WZiu-LBiI-Ip6V-Ezhl-QBMjm7
  ├─centos-root  xfs               c91c62d5-f5a5-4f63-ae59-aa934ec4ae2f   /
  └─centos-swap  swap              87b52764-0b52-438e-a480-ea2bf0c7a648   [SWAP]
  ```

* Pour connaître le nom du mappeur:

  ```
  $ ls -l /dev/mapper
  total 0
  lrwxrwxrwx. 1 root root       7 Feb 12 16:17 centos-root -> ../dm-0
  lrwxrwxrwx. 1 root root       7 Feb 12 16:17 centos-swap -> ../dm-1
  crw-------. 1 root root 10, 236 Feb 12 16:17 control
  $
  $ readlink -f /dev/mapper/centos-root
  /dev/dm-0
  ```
  ```
  $ lsblk -p /dev/sda2
  NAME                       MAJ:MIN  RM   SIZE  RO  TYPE  MOUNTPOINT
  /dev/sda2                    8:2     0  19.5G   0  part
  ├─/dev/mapper/centos-root  253:0     0  17.5G   0  lvm   /
  └─/dev/mapper/centos-swap  253:1     0     2G   0  lvm   [SWAP]
  ```

## Supprimer un volume physique

1. Supprimer le volume LVM

    ```
    sudo fdisk /dev/LAB1/DATA1
    p
    d

    p
    w

    sudo partprobe
    ```

2. Supprimer le volume logique

    ```
    sudo lvremove /dev/LAB1/DATA1
    ```

3. Supprimer le groupe de volumes

    ```
    sudo vgremove LAB1
    ```

4. Supprimer le volume physique

    ```
    sudo pvremove /dev/sdb
    ```

[Linux lvm – Logical Volume Manager](https://dofrance.vn/linux-lvm-logical-volume-manager/)
