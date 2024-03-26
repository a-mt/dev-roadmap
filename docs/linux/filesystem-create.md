---
title: Modifier la table de partition
category: Linux
---

## Intro

* En tant habituel, le bootloader, la table de partition et le système d'exploitation sont initialisés par le fabricant.
  L'utilisateur n'a plus qu'à processer à l'installation du système d'exploitation, son emplacement sur le disque aura déjà mis en place. Mais si on veut installer un autre système d'exploitation, alor i l faut:
 
  1. pour du dual-boot: modifier la table de partition existante  
      Réduire la taille de la partition occupant le plus gros du disque.

  2. dans tous les cas: démarrer avec un disque d'installation  
      La création des partitions sera faite à ce moment, pour fournir un emplacement aux fichiers du système d'exploitation. La plupart des programmes d'installation fournissent un programme basé sur l'interface graphique (GUI), ce qui rend la création des partitions très facile. Le programme d'installation créera automatiquement un système de fichiers pour la nouvelle partition et la configurera pour qu'elle soit automatiquement montée pendant le processus de démarrage.

* Il est possible de modifier la table de partition du système après l'installation (ou celle d'un périphérique):  
  Pour du <ins>MBR</ins>: `fdisk`, `cfdisk`, `sfdisk`  
  Pour du <ins>GPT</ins>: `gdisk`, `cgdisk`, `sgdisk`  

## Partitions primaires

* Les anciens PC utilisant un BIOS Legacy sont limités à 4 partitions:  
  Le MBR (512 octets) contient le bootloader et la table de partition, qui ne fait que 64 octets.  
  Chaque partition est enregistrée sur 16 octets, d'où un nombre maximum de 4.

* Sur les serveurs Linux, plus de 4 partitions est souvent nécessaire.  
  Pour parer à cette limite, il est possible de créer une *partition étendue*, une partition qui n'est pas utilisable par le firmware mais sert de container pour d'autres partitions, des *partitions logiques*. Une partition étendue sert en quelque sorte d'extension à la table de partition: on va utiliser des blocs de données en dehors du MBR, les blocs de données de la partition étendue, pour enregistrer les informations de partitions supplémentaires.

  ![](https://i.imgur.com/XqExkRvm.jpg)

  Les partitions enregistrées dans la table de partition, et compréhensibles par le firmware, sont dites *primaires*.  
  Linux peut se servir des partitions logiques comme s'il s'agissait d'une partition primaire.  
  Typiquement, on crée 3 partitions primaires et 1 partition étendue — qui peut contenir 0 à n partitions logiques.

* Les partitions étendues et logiques ne sont généralement pas utilisées avec les tables de partition GPT (BIOS EFI et UEFI), puisqu'elles supportent 128 partitions primaires.

---

## Les fichiers virtuels des partitions

* Les fichiers `/dev/sd*` désignent les disques connectés par une interface SATA et les partitions de ces disques reçoivent des noms basés sur le disque sur lequel elles résident:

  - Le premier disque est appelé <ins>/dev/sda</ins>, le second /dev/sdb, etc.
  - La première partition du disque /dev/sda est <ins>/dev/sda1</ins>, la seconde /dev/sda2, etc.

<!-- -->

* Les fichiers `/dev/nvme*` désignent les disques connectés par PCI Express:  
  - <ins>/dev/nvme0</ins> est le premier contrôleur NVM Express
  - <ins>/dev/nvme0n1</ins> est le premier disque (*namespace*) du contrôleur
  - <ins>/dev/nvme0n1p1</ins> est la première partition du disque

<!-- -->

* Les fichiers `/dev/hd*` représente les disques durs magnétiques et lecteurs optiques.

## Lister les partitions

### lsblk

* `lsblk` permet de lister les disques et leurs partitions — qu'elles soient montées ou non

  ```
  $ lsblk | grep -v loop
  NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
  nvme0n1     259:0    0   477G  0 disk 
  ├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
  └─nvme0n1p2 259:2    0 476,4G  0 part /
  ```

  ```
  $ ls /dev/sda?
  /dev/sda1 /dev/sda2

  $ lsblk
  NAME           MAJ:MIN   RM   SIZE RO TYPE MOUNTPOINT
  sda                8:0    0    20G  0 disk 
    ├─sda1           8:1    0   500M  0 part /boot
    └─sda2           8:2    0  19.5G  0 part
      ├─centos-root 253:0   0  17.5G  0 lvm  /
      └─centos-swap 253:1   0     2G  0 lvm  [SWAP]
  sr0               11:0    1  1024M  0 rom
  ```

### /proc/partitions

* On peut également retrouver cette liste dans `/proc/partitions`

  ```
  $ cat /proc/partitions | grep -v loop
  major minor  #blocks  name

   259        0  500107608 nvme0n1
   259        1     524288 nvme0n1p1
   259        2  499581952 nvme0n1p2
  ```

### blkid

* `blkid` permet de trouver l'UUID d'une partition.  
  Sans argument, blkid retourne les infos de la partition en cours d'utilisation

  ``` bash
  $ blkid
  /dev/mapper/data-root: UUID="8e457938-0422-4d44-872f-18aff2aef760" TYPE="ext4"
  ```

---

## Modifier la table de partition

### gdisk

* `gdisk` (*GPT disk*) permet de modifier une table de partition GPT interactivement.  
  Nécessite les privilèges root  

* Pour modifier une table de partition GPT:  
  lancer gdisk avec le path du disque à modifier en argument

  ``` bash
  $ sudo gdisk /dev/sdb
  ```

  Ensuite, utiliser les sous-commandes gdisk pour effectuer des actions:

  - <ins>i (*info*)</ins> pour voir les partitions

  - <ins>n (*new*)</ins> pour ajouter une partition  
    En cas d'erreur, il suffit de quitter le programme: rien ne sera changé sur le disque tant que les modifications ne sont pas écrites avec `w`.

  - <ins>w (*write*)</ins> pour écrire les modifications  
    Si les modifications apportées à la table des partitions sont correctes, valider les modifications avec `w`.
    L'utilitaire écrira les changements dans le table de partition et quittera.

  - <ins>q (*quit*)</ins> pour quitter sans sauvegarder  
    Il est possible de quitter l'utilitaire en utilisant la commande `q`. Quitter supprimera tous les changements qui ont été faits.

  ![](https://i.imgur.com/jNtXEyz.png)

* <details>
    <summary>
      Si la table de partition n'est pas GPT mais MBR, gdisk permettra de la convertir en GPT.
    </summary>

    <pre lang="bash">
    $ lsblk -f /dev/sda
    NAME   FSTYPE LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINT
    sda                 
    └─sda1 vfat         000E-3592
    </pre>
    <pre lang="txt">
    $ sudo gdisk /dev/sda
    GPT fdisk (gdisk) version 1.0.5

    Partition table scan:
      MBR: MBR only
      BSD: not present
      APM: not present
      GPT: not present

    ***************************************************************
    Found invalid GPT and valid MBR; converting MBR to GPT format
    in memory. THIS OPERATION IS POTENTIALLY DESTRUCTIVE! Exit by
    typing 'q' if you don't want to convert your MBR partitions
    to GPT format!
    ***************************************************************


    Warning! Secondary partition table overlaps the last partition by
    33 blocks!
    You will need to delete this partition or resize it in another utility.

    Command (? for help): p
    Disk /dev/sda: 7864320 sectors, 3.8 GiB
    Model: UDisk
    Sector size (logical/physical): 512/512 bytes
    Disk identifier (GUID): 3F130DCA-1600-4E8A-A3EE-6C7394BB1866
    Partition table holds up to 128 entries
    Main partition table begins at sector 2 and ends at sector 33
    First usable sector is 34, last usable sector is 7864286
    Partitions will be aligned on 64-sector boundaries
    Total free space is 30 sectors (15.0 KiB)

    Number  Start (sector)    End (sector)  Size       Code  Name
       1              64         7864319   3.7 GiB     0700  Microsoft basic data

    Command (? for help): d 
    Using 1

    Command (? for help): n
    Partition number (1-128, default 1): 
    First sector (34-7864286, default = 64) or {+-}size{KMGTP}: 
    Last sector (64-7864286, default = 7864286) or {+-}size{KMGTP}: 
    Current type is 8300 (Linux filesystem)
    Hex code or GUID (L to show codes, Enter = 8300): 83
    Exact type match not found for type code 0083; assigning type code for
    'Linux filesystem'
    Changed type of partition to 'Linux filesystem'

    Command (? for help): w

    Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
    PARTITIONS!!

    Do you want to proceed? (Y/N): Y
    OK; writing new GUID partition table (GPT) to /dev/sda.
    The operation has completed successfully.
    </pre>
  </details>

  Pour modifier une table de partition MBR, utiliser fdisk à la place.

#### gdisk -l

* Pour lister les partitions (de tous les disques ou d'un disque donné) — non interactif:

  ``` bash
  $ gdisk -l
  ```

  ![](https://i.imgur.com/MuSoIEG.png)

### fdisk

* `fdisk` (*fixed disk*) est un utilitaire plus ancien mais similaire à gdisk  
  Note: Les disques durs étaient auparavant dits "disques fixes" parce qu'ils n'étaient pas amovibles, contrairement aux périphériques.  
  Initialement, fdisk ne pouvait gérer que les tables de partition MBR mais il peut désormais également gérer GPT.

* Pour modifier une table de partition (MBR ou GPT):

  1. Lancer fdisk avec le path du disque à modifier en argument

      ``` bash
      $ sudo fdisk /dev/sdb
      ```

     ![](https://i.imgur.com/FtuIiIC.png)

  2. Utiliser les sous-commandes fdisk pour effectuer des actions:

      - <ins>m (*menu*)</ins> pour afficher l'aide
      - <ins>p (*print*)</ins> pour afficher la table de partitions du disque en cours
      - <ins>n (*new*)</ins> pour créer une nouvelle partition
      - <ins>d (*delete*)</ins> pour supprimer une partition
      - <ins>w (*write*)</ins> pour sauvegarder les modifications et quitter
      - <ins>q (*quit*)</ins> pour quitter sans sauvegarder

      <!-- -->

      <ins>Exemple: créer la partition 4 (étendue)</ins>:

      ![](https://i.imgur.com/tjq6LDo.png)

      <ins>Créer la partition 5 (logique)</ins>:

      ![](https://i.imgur.com/SxctkdG.png)

      <ins>Enregister</ins>:

      ![](https://i.imgur.com/HaJTB3c.png)

* <ins>n (new)</ins>  
  La sous-commande `n` pose plusieurs questions:

  1. **type de partition**  
     Les choix disponibles dépendrons des partitions qui existent déjà.  
     Dans une table de partition MBR, il ne peut y avoir que 4 partitions — donc typiquement, la 4ème partition sera une partition étendue, ce qui permettra d'ajouter autant de partitions logiques qu'on veut.

  2. **numéro de partition**  
      Si le dernier numéro de partition était 2, alors la partition suivante doit être numérotée 3.  
      Lors de la création de partitions logiques, l'utilitaire fdisk ne demandera pas de numéro de partition et attribuera un numéro par défaut

  3. **secteur de départ**  
     L'attribution du secteur de départ est extrêmement simple: fdisk sait quel est le prochain secteur disponible, il suffit d'appuyer sur Entrée pour accepter la valeur proposée (= le prochain secteur disponible). Il est possible de taper manuellement le numéro de secteur, mais ce n'est pas recommandé car on peut se retrouver avec des plages de secteurs inutilisables.

  4. **taille de la partition**  
     Il y a 3 moyens d'assigner le dernier secteur:  
     - "dernier secteur",
     - "+secteur",
     - "+taille{K,M,G,T,P}". Par exemple +100MB.  
       C'est généralement cette technique qui est utilisée car aucun calcul n'est nécessaire.  
     - taper Entrée directement: la partition prendra toute la place disponible restante

<!-- -->

* <ins>t (type)</ins>  
  Par défaut, l'utilitaire fdisk définit les partitions primaires et logiques avec le système de fichiers 83 (Linux).  
  Pour les partitions étendues, l'ID doit être 5 et ne doit jamais être changé.

  Pour changer le type de système de fichiers, on peut utiliser la sous-commande `t` de fdisk.  
  Entrer le numéro de partition à modifier suivit de l'ID du système de fichier en hexadécimal — utiliser `L` pour afficher la liste des codes hexadécimaux disponibles.

  ![](https://i.imgur.com/MvD8lo2.png)

* Notons que fdisk ne fait que modifier la table de partition,  
  après avoir modifié le type déclaré dans la table, il est encore nécessaire de formatter la partition — avec mkfs

#### partprobe

* Après avoir modifié la table de partition, la commande `partprobe` ou `kpartx` doit être exécutée. Sinon, le système devra être redémarré avant que les nouvelles partitions puissent être utilisées.

  ``` bash
  $ sudo partprobe
  $ sudo fdisk -l
  ```

#### fdisk -l

* `fdisk -l` permet de lister les partitions (de tous les disques ou d'un disque donné) — non interactif:

  ![](https://i.imgur.com/CzwqNrq.png)

  Pour comparer avec les infos retournées par `gdisk -l`:

  ![](https://i.imgur.com/iu0qHjT.png)

### GNU parted

* GNU parted est un autre utilitaire pour éditer les partitions — moins user-friendly.

  ``` bash
  $ sudo parted -s /dev/loop1 mklabel msdos

  $ sudo parted -s /dev/loop1 unit MB mkpart primary ext4 0 256
  $ sudo parted -s /dev/loop1 unit MB mkpart primary ext4 256 512
  $ sudo parted -s /dev/loop1 unit MB mkpart primary ext4 512 1024
  ```

  ![](https://i.imgur.com/hHwYZDr.png)

---

## Sauvegarder et restaurer la table de partition

* `sfdisk` peut être utilisé pour sauvegarder et restaurer la table de partition d'un disque.  
  Avant de partitionner un disque, c'est généralement une bonne idée de sauvegarder les données de la table de partition actuelle: en cas d'erreur lors de l'utilisation des outils d'édition de partitions, la table de partition sauvegardée pourra être restaurée. Par contre attention,  restaurer le mauvais fichier peut entrainer la perte totale des données.

* Pour sauvegarder la table de partitions:

  1. Déterminer le nom du disque.  
     L'option -s permet de lister les disques et leur taille (nombre de blocs)

      ``` bash
      # sfdisk -s
      ```

      ![](https://i.imgur.com/ACmy7vi.png)

  2. Sauvegarder la table de partition du disque avec l'option -d (*dump*)

      ``` bash
      # sfdisk -d /dev/sdb > sdb.disk
      ```

  3. Restaurer la table de partition avec l'option -f (*force*)

      ``` bash
      # sfdisk -f /dev/sdb < sdb.disk
      ```

      ![](https://i.imgur.com/Wu3AO5X.png)
