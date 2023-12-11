---
title: Monter des partitions
category: Linux
---

* Pour pouvoir utiliser un système de fichier, il faut le monter. Monter consiste essentiellement à attacher un système de fichier à l'un des répertoires du système de fichier virtuel. Par exemple, si on monte un système de fichier sur /mnt, alors on pourra lire & écrire dans le système de fichier de ce périphérique via /mnt

  ``` bash
  # Monter
  $ sudo mount /dev/sdb1 /mnt

  # Créer un fichier
  $ sudo touch /mnt/testfile
  $ ls /mnt
  test

  # Démonter
  $ sudo umount /mnt
  $ ls /mnt
  ```

## Lister les points de montage

### mount

* Appelé sans argument, la commande `mount` liste les partitions actuellement montées.

  ``` bash
  $ mount
  sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
  proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
  udev on /dev type devtmpfs (rw,nosuid,relatime,size=8001036k,nr_inodes=2000259,mode=755)
  devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
  tmpfs on /run type tmpfs (rw,nosuid,noexec,relatime,size=1607868k,mode=755)
  /dev/nvme0n1p2 on / type ext4 (rw,relatime,errors=remount-ro)
  securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
  tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)
  ```

  Sur chaque ligne, on a:
  1. le nom de la partition
  2. le point de montage (*on*)
  3. le système de fichiers (*type*)
  4. les options de montage — entre parenthèses

### findmnt

* `findmnt`, liste tous les points de montage actuellement montés, y compris les systèmes de fichier virtuels.  
  On peut filtrer sur un ou des système(s) de fichier avec l'option -t

  ``` bash
  $ findmnt -t xfs,ext4
  TARGET SOURCE                FSTYPE OPTIONS
  /      /dev/mapper/data-root ext4   rw,noatime,errors=remount-ro
  ```

---

## Monter manuellement une partition

1. Lister les partitions détectées

    ``` bash
    $ lsblk | grep -v loop
    NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
    sda           8:0    0 931,5G  0 disk 
    └─sda1        8:1    0 931,5G  0 part 
    nvme0n1     259:0    0   477G  0 disk 
    ├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
    └─nvme0n1p2 259:2    0 476,4G  0 part /
    $
    $ ls /dev/sda1
    /dev/sda1
    ```

2. Lister les partitions montées

    ``` bash
    $ mount | grep ^/dev
    /dev/nvme0n1p2 on / type ext4 (rw,relatime,errors=remount-ro)
    /dev/nvme0n1p1 on /boot/efi type vfat (rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
    ```

3. Créer un répertoire pour servir de point de montage.  
    Pour monter une ressource temporairement, comme une clé USB, on utilise par convention un répertoire dans /media (ou anciennement /mnt).
    Certaines distributions orientées bureau montent automatiquement les périphériques amovibles dans /media/USERNAME/DEVICENAME.  

    ``` bash
    $ ls /media/$USER
    $ sudo mkdir -p /media/$USER/mydisk
    ```

4. Monter la partition  

    * On peut monter un périphérique en connaissant son fichier virtuel
      (ou son UUID en utilisant l'option -U)

      ``` bash
      $ sudo mount /dev/sda1 /media/$USER/mydisk
      ```

    * Si le système de fichiers ne peut pas être détecté:
      l'option -t permet d'indiquer le type de système de fichiers  

      ``` bash
      $ sudo mount /dev/sdb3 /mnt/mydisk
      mount: /mnt/mydisk: wrong fs type, bad option, bad superblock on /dev/sdb3, missing codepage or helper program, or other error.

      $ sudo mount /dev/sdb3 /mnt/mydisk -t vfat
      ```

    * L'option -o permet de spécifier des options de montage — sinon, les options par défaut du système de fichier sont utilisées. Par exemple, pour monter le périphérique en mode lecture seule (*read-only*):

      ``` bash
      $ sudo mount -o ro /dev/sdb1 /mnt/mydisk
      ```

5. Vérifier si la partition a bien été montée

    ``` bash
    $ mount | grep ^/dev
    /dev/nvme0n1p2 on / type ext4 (rw,relatime,errors=remount-ro)
    /dev/nvme0n1p1 on /boot/efi type vfat (rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
    /dev/sda1 on /media/am/mydisk type fuseblk (rw,relatime,user_id=0,group_id=0,allow_other,blksize=4096)
    ```

    ``` bash
    $ ls -1 /media/$USER/mydisk
    autorun.inf
    DOCUMENTS
    '$RECYCLE.BIN'
    'System Volume Information'
    'TOSHIBA STOR.E BASICS.pdf'
    ```

    ``` bash
    $ df -hT
    ```

### Options de mount

* On peut monter un système de fichier avec plusieurs options, séparées par des virgules (sans aucun espace)

  ``` bash
  $ sudo mount -o ro,noexec,nosuid /dev/vdb2 /mnt
  ```

  <ins>Options notables</ins>:  
  -ro pour monter en lecture-seule  
  -noexec pour rendre impossible le lancement de fichiers exécutables stockés sur ce système de fichier  
  -nosuid pour désactiver la permission SUID (permission permettant à des programmes de s'exécuter avec les privilèges root sans avoir à être préfixée de sudo).

  Ces options sont parfois utilisées pour monter un système de fichier qui n'est pas censé contenir de programmes: si on ouvre une clé USB censée contenir des photos et vidéos, quand même elle s'avérait infectée par un virus, ce virus ne pourrait pas s'exécuter et causer des dommages.

* Si le système de fichier est déjà monté mais avec les mauvais arguments, alors on peut utiliser l'option `remount` de la commande mount.  
  Par exemple, pour remonter le système de fichier avec les droits en écriture:

    ``` bash
    $ sudo mount -o remount,rw /
    ```

### Options du système de fichier

* Les options utilisées jusqu'à présent sont indépendantes du système de fichiers — elles peuvent être utilisées sur n'importe quel système de fichier, et sont décrites dans la page de manuel de mount. D'autres options sont spécifiques à un système de fichier.

  ``` bash
  sudo mount -o allocsize=32K /dev/vdb1 /mybackups
  ```

  Pour voir les options de montage spécifiques à système de fichier, consulter le manuel de ce système de fichier.

* Les options dépendantes du système de fichier ne peuvent pas être appliquées sur un système de fichier déjà monté et on ne peut donc pas utiliser l'option remount. À la place, il faut démonter avec `umount` et re-monter avec `mount`.

## Démonter une partition

* Pour plus de performances, Linux garde des parties du système de fichiers en mémoire. Si un support amovible, comme une clé USB, est retiré avant que les buffers en mémoire ne soient vidés, certaines données peuvent ne pas être écrites, ce qui peut entraîner une perte de données voire même une corruption du système de fichiers. Démonter le périphérique vide tous les buffer et permet d'être sûr que le périphérique peut être retiré sans soucis.

* `umount` permet de démonter un périphérique.  
  Passer le point de montage ou le fichier virtuel du périphérique en argument

    ``` bash
    $ sudo umount /media/$USER/mydisk
    ```

    ``` bash
    $ sudo umount /dev/sda1
    ```

* Il peut arriver que le périphérique ne puisse pas être démonté, si un fichier de ce périphérique est occupé.

  ``` bash
  $ cd /media/bob/tmp
  $ sudo umount /dev/sdb1
  unmount: /media/bob/tmp: target is busy
  ```

  Typiquement, ce genre de cas arrive lorsque

  * 1/ il y a un processus (ex vlc) qui utilise un fichier dans ce système de fichiers

      ``` bash
      $ lsof | grep sdb1      # processes using sdb1?
      ```

  * ou 2/ un utilisateur a son répertoire courant dans le système de fichier

      ``` bash
      $ pwd
      /media/bob/tmp
      $ cd                    # move out of the mounting point
      $ sudo umount /dev/sdb1 # no error: it worked
      ```

---

## Monter une partition au démarrage

* Le montage manuel du système de fichiers est non persistant:
  si le système est redémarré, alors la commande `mount` doit de nouveau être utilisée pour monter la partition (ou `swapon` pour la swap).

### /etc/fstab

* Pour configurer les systèmes de fichiers à monter automatiquement au démarrage,  
  on utilise le fichier `/etc/fstab` (pour *filesystem table*).

  ``` bash
  $ cat /etc/fstab
  UUID=28a25b21-4cc8-484e-bebe-1d133ce62468  /     ext4    errors=remount-ro 0       1
  UUID=EB79-AAE8  /boot/efi                        vfat    umask=0077        0       1
  /swapfile  none                                  swap    sw                0       0
  ```

* Les privilèges root sont nécessaires pour apporter des modifications au fichier /etc/fstab.  
  Toute modification apportée à ce fichier doit être effectuée avec précaution, car des erreurs peuvent empêcher le système de démarrer normalement — créer une sauvegarde du fichier avant d'effectuer des changements.

  ``` bash
  cp /etc/fstab /etc/fstab.backup
  ```

  Chaque ligne du fichier spécifie:

  1. <ins>la partition</ins>  
     Il y a différentes méthodes pour désigner la partition à utiliser:

     | Identifiant | Exemple
     |---          |---
     | Fichier virtuel | /dev/sda2
     | UUID        | UUID=2c442228-1991-48c7-bad9-a80dfc8267cf
     | Label       | LABEL=program-42

     On préfère généralement l'UUID puisqu'il ne change jamais,  
     tandis que le fichier virtuel dépend de l'ordre dans lequel il a été détecté par le système.  
     Pour récupérer l'UUID de la partition, on peut utiliser `lsblk` ou `blkid`

     ``` bash
     $ sudo blkid /dev/vdb1
     ```

  2. <ins>le point de montage</ins>  
     Le répertoire qui servira de point de montage (doit exister préalablement)

  3. <ins>le système de fichiers</ins>  
     Pour une partition Linux, on aura généralement du "ext4"

  4. <ins>les options de montage</ins>  
     Options séparées par des virgules.  
    Certaines options de montage ne sont utilisées que lors du montage manuel d'un système de fichiers, tandis que d'autres sont couramment utilisées lors du montage automatique d'un système de fichiers. Garder `defaults` fait généralement l'affaire

      Parmis les options souvent utilisées:

      | Option   | Description
      |---       |---
      | defaults | correspond à rw, suid, dev, exec, auto, nouser, async
      | rw       | le système de fichier est monté en lecture/écriture (par défaut)
      | ro       | le système de fichier est monté en lecture seule
      | auto     | lorsqu'on utilise la commande `mount -a`, le système de fichier est monté (par défaut)
      | noauto   | lorsqu'on utilise la commande `mount -a`, le système de fichier n'est pas monté
      | nouser   | un utilisateur sans les privilèges root ne peut pas monter/démonter le système de fichier (par défaut)
      | user     | un utilisateur sans privilège root peut monter/démonter le système de fichier

  5. <ins>dump</ins>  
     Si différent de 0, utilise `dump` pour créer un backup du système de fichier  
     Peu de systèmes l'utilisent

  6. <ins>pass</ins>  
     Si différent de 0, utilise `fsck` pour vérifier le système de fichier au démarrage — s'effectue par ordre de priorité, le 1 avant 2.
     Pour les partitions crées lors de l'installation, laisser les valeurs par défaut. Pour des partitions créées manuellement, les valeurs doivent être

      - 1 pour la racine (partition principale)  
      - 2 pour les autres partitions Linux (partitions externes que vous souhaitez monter)  
      - 0 pour la swap et les partitions window (= pas de vérification)

<!-- -->

* Si au moment de redémarrer, vous atterissez sur le runlevel 1, c'est que /etc/fstab est mal configuré.
  Dans ce cas, le mieux à faire est de restaurer la sauvegarde du fichier.

### mount -a

* Lorsque le fichier /etc/fstab a été modifié, une bonne idée est de tester le montage automatique avec `mount -a`: cette commande tente de monter tous les systèmes de fichiers dans le fichier de configuration — à moins d'avoir mis l'option "noauto".

  ``` bash
  $ sudo cp /etc/fstab /etc/fstab.bck
  $ sudo mkdir /program 42
  $ sudo nano /etc/fstab
  $
  $ sudo mount -a
  $ mount | grep program42
  /dev/sdc2 on /program42 type ext4 (rw,relatime)
  ```

* Lorsqu'on utilise mount, on peut ne spécifier que la partition, ou que le point de montage, si ceux-ci sont présents dans /etc/fstab.
  Par exemple, si /etc/fstab contient `/dev/sda5 /home ext2 defaults 1 2`, alors on peut monter /dev/sda5 dans /home grâce à:

  ``` bash
  mount /dev/sda5
  ```

  ou

  ``` bash
  mount /home
  ```

### automount

* Linux permet de monter un système de fichier uniquement si nécessaire, lorsqu'on essaie d'accéder au répertoire, et non directement au démarrage.
  Pour ce faire, les systèmes basés sur systemd disposent de fonctions de montage automatique directement intégrées dans systemd.

  Pour l'activer, il suffit d'ajouter les options de montage appropriées:

  ``` bash
  $ grep automount /etc/fstab
  LABEL=Sam128 /SAM ext4 noauto,x-systemd.automount,x-systemd.device-timeout=10,x-systemd.idle-timeout=30 0 0
  ```

  - noauto: ne pas monter le répertoire au démarrage
  - x-systemd.automount: monter automatiquement lorsqu'on essaie d'accéder au point de montage
  - x-systemd.automount.device-timeout=10: si le périphérique ne répond pas, échouer au bout de 10 secondes d'attente
  - x-systemd.automount.idle-timeout=30: si le périphérique n'est pas utilisé pendant 30 secondes, le démonter

  ``` bash
  $ df -h | grep SAM
  $ ls /SAM
  ISO_IMAGES
  $ df -h | grep SAM
  /dev/sdb1 ext4 118G 71G 41G 64% /SAM

  $ sleep 40
  $ df -h | grep SAM
  ```

* Après avoir modifié le fichier /etc/fstab, redémarrer ou lancer les commandes suivantes:

  ``` bash
  $ sudo systemctl daemon-reload
  $ sudo systemctl restart local-fs.target
  ```

* Historiquement, on utilisait autofs pour le montage automatique, ce qui nécessite d'installer le package autofs et des configuration dans /etc.
  Aujourd'hui, on utilise autofs pour monter des répertoires NFS (des répertoires dont on récupère le contenu via le réseau), et pour le reste on utilise systemd — avec l'option automount.

### Unités de montage

* Une des tâches de systemd est de monter le système de fichiers virtuel lorsque le système démarre, et donc de lire /etc/fstab.  
  systemd utilise des unités pour gérer les différents éléments, et crée des *unités de montage* à la volée lorsqu'il monte les système de fichiers.

  ![](https://i.imgur.com/VDBWTwy.png)

* On peut créer des fichiers unitaires personnalisés pour indiquer à systemd de monter certains systèmes de fichier — ce qui est rarement nécessaire, /etc/fstab suffit largement. Pour vérifier s'il y a des unités de montage personnalisées:

  ```
  ls /etc/systemd/system/*.mount
  ls: cannot access /etc/systemd/system/*.mount: No such file or directory
  ```

---

## Points de montage

* Souvent, le système de fichiers sous la racine du système de répertoires fait partie d'un volume logique (afin que sa taille puisse être augmentée si nécessaire) et les fichiers du boot sont sur une partition séparée, montée sur /boot. Le FHS donne des indications pour décider des points de montage à utiliser, tant pour la protection des données du système que les performances du système:

  - si vous avez sufisamment de disques, considérer créer des partitions avec les points de montage suivants (avec phrase mnémotechnique):

    ```
    /var            (very)
    /tmp            (tough)
    /usr            (users)
    /home           (have)
    /opt            (once)
    /boot           (been)
    /usr/local      (upset)
    ```

  - d'un autre côté, les répertoires suivants doivent être conservés sur le même système de fichier (avec la racine du système de répertoire):

    ```
    /etc            (every)
    /sbin           (sunny)
    /dev            (day)
    /bin            (brings)
    /lib            (laughs)
    ```

---

## Loop device

* Un appareil *loop* permet de traiter un fichier du disque dur comme s'il s'agissait d'un appareil de type bloc.  
  On place une couche de système de fichiers au-dessus d'une autre, ce qui a un effet négatif sur les performances mais permet notamment de jouer avec des partitions

* Trouver le prochain appareil loop disponible:

  ``` bash
  $ sudo losetup -f
  /dev/loop1
  ```

* Créer un nouveau périphérique virtuel:  
  Ici on crée le périphérique /dev/loop1, dont les données seront écrites dans filename:

  ``` bash
  $ sudo losetup /dev/loop1 imagefile
  ```

* Supprimer un périphérique virtuel:

  ``` bash
  $ sudo losetup -d /dev/loop1
  ```

* <ins>Exemple complet</ins>:

  ``` bash
  # Créer un fichier contenant 1GB de zéros
  $ dd if=/dev/zero of=imagefile bs=1M count=1024

  # Trouver le prochain appareil loop disponible
  $ sudo losetup -f
  /dev/loop1

  # Associer le fichier avec
  $ sudo losetup /dev/loop1 imagefile
  ```
  ``` bash
  # Jouer avec
  $ sudo fdisk /dev/loop1

  $ sudo mount /dev/loop1p1 /mnt
  $ touch /mnt/file1
  $ sudo mount -o remount,ro /mnt
  $ touch /mnt/file2
  ```
  ``` bash
  # Démonter
  $ sudo umount /mnt

  # Supprimer l'association
  $ sudo losetup -d /dev/loop2

  # Supprimer le fichier
  $ rm imagefile
  ```
