---
title: Modifier les partitions
category: Linux
---

## Intro

* En tant habituel, le bootloader, la table de partition et le système d'exploitation sont initialisés par le fabricant.
  L'utilisateur n'a plus qu'à processer à l'installation du système d'exploitation, son emplacement sur le disque aura déjà mis en place. Pour installer un autre système d'exploitation, il est nécessaire:
 
  1. pour du dual-boot: de modifier la table de partition existante  
      Réduire la taille de la partition occupant le plus gros du disque.

  2. dans tous les cas: de démarrer avec un disque d'installation  
      La création des partitions sera faite à ce moment, pour fournir un emplacement aux fichiers du système d'exploitation. La plupart des programmes d'installation fournissent un programme basé sur l'interface graphique (GUI), ce qui rend la création des partitions très facile. Le programme d'installation créera automatiquement un système de fichiers pour la nouvelle partition et la configurera pour qu'elle soit automatiquement montée pendant le processus de démarrage.

* Il est possible de modifier la table de partition après l'installation, du système en cours ou d'un périphérique:  
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

## Lister

### Les fichiers virtuels

* Les fichiers `/dev/sd*` désignent les disques connectés par une interface SATA etes partitions de chaque disque reçoivent des noms basés sur le disque sur lequel elles résident:

  - Le premier disque est appelé <ins>/dev/sda</ins>, le second /dev/sdb, etc.
  - La première partition du disque /dev/sda est <ins>/dev/sda1</ins>, la seconde /dev/sda2, etc.

* Les fichiers `/dev/nvme*` désignent les disques connectés par PCI Express:  
  - <ins>/dev/nvme0</ins> est le premier contrôleur NVM Express
  - <ins>/dev/nvme0n1</ins> est le premier disque (*namespace*) du contrôleur
  - <ins>/dev/nvme0n1p1</ins> est la première partition du disque

### Les partitions

* `/proc/partitions` contient la liste des disques et partitions

  ```
  $ cat /proc/partitions | grep -v loop
  major minor  #blocks  name

   259        0  500107608 nvme0n1
   259        1     524288 nvme0n1p1
   259        2  499581952 nvme0n1p2
  ```

* On peut également utiliser `lsblk`

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

### Les SGF

* `/proc/filesystems` contient la liste des systèmes de fichiers supportés par le kernel
  * La première colonne indique si le système de fichier est associé à un périphérique:  
    on aura *nodev* (pour *no device*) s'il ne l'est pas.
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

* On peut utiliser `lsblk` avec l'option -f (*filesystem*) pour afficher le système de fichier de chaque partition:

  ```
  $ lsblk -f | grep -v loop
  NAME        FSTYPE   LABEL UUID                                 MOUNTPOINT
  nvme0n1
  ├─nvme0n1p1 vfat           EB79-AAE8                            /boot/efi
  └─nvme0n1p2 ext4           28a25b21-4cc8-484e-bebe-1d133ce62468 /
  ```

  On peut également utiliser `blkid`

  ```
  $ blkid
  /dev/nvme0n1p1: UUID="EB79-AAE8" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="0b57da2b-7f90-4b10-876d-94c60068e9f8"
  /dev/nvme0n1p2: UUID="28a25b21-4cc8-484e-bebe-1d133ce62468" TYPE="ext4" PARTUUID="b699d032-eea9-431b-bb02-6fb462db6192"
  ```

---

## Modifier la table de partition

### gdisk

* `gdisk` (*GPT disk*) permet de modifier une table de partition GPT interactivement.  
  Nécessite les privilèges root  

  Lancer gdisk avec le path du disque à modifier en argument  
  et utiliser les sous-commandes gdisk pour effectuer des actions:

  - <ins>i (*info*)</ins> pour voir les partitions

  - <ins>n (*new*)</ins> pour ajouter une partition  
    En cas d'erreur, il suffit de quitter le programme: rien ne sera changé sur le disque tant que les modifications ne sont pas écrites avec `w`.

  - <ins>w (*write*)</ins> pour écrire les modifications  
    Si les modifications apportées à la table des partitions sont correctes, valider les modifications avec `w`.
    L'utilitaire écrira les changements dans le table de partition et quittera.

  - <ins>q (*quit*)</ins> pour quitter sans sauvegarder  
    Il est possible de quitter l'utilitaire en utilisant la commande `q`. Quitter supprimera tous les changements qui ont été faits.

  ![](https://i.imgur.com/jNtXEyz.png)

* `gdisk -l` permet également de lister les partitions  
  (de tous les disques ou d'un disque donné) — non interactif:

  ![](https://i.imgur.com/MuSoIEG.png)

### fdisk

* `fdisk` (*fixed disk*) est un utilitaire plus ancien mais similaire à gdisk  
  Note: les disques durs étaient auparavant dits fixes parce qu'ils n'étaient pas amovibles.  
  Initialement, fdisk ne pouvait gérer que les tables de partition MBR mais il peut désormais également gérer GPT.

  1. Lancer fdisk avec le path du disque à modifier en argument

     ![](https://i.imgur.com/FtuIiIC.png)

  2. Utiliser les sous-commandes fdisk pour effectuer des actions:

      - <ins>m (*menu*)</ins> pour afficher l'aide
      - <ins>p (*print*)</ins> pour afficher la table de partitions du disque en cours
      - <ins>n (*new*)</ins> pour créer une nouvelle partition
      - <ins>d (*delete*)</ins> pour supprimer une partition
      - <ins>w (*write*)</ins> pour sauvegarder les modifications et quitter
      - <ins>q (*quit*)</ins> pour quitter sans sauvegarder

      <ins>Par exemple, créer la partition 4 (étendue)</ins>:

      ![](https://i.imgur.com/tjq6LDo.png)

      <ins>Créer la partition 5 (logique)</ins>:

      ![](https://i.imgur.com/SxctkdG.png)

      <ins>Enregister</ins>:

      ![](https://i.imgur.com/HaJTB3c.png)

    La sous-commande `n` pose plusieurs questions:

    1. **type de partition**  
       Les choix disponibles dépendrons des partitions qui existent déjà.  
       Dans une table de partition MBR, il ne peut y avoir que 4 partitions — donc typiquement, la 4ème partition sera une partition étendue, ce qui permettra d'ajouter autant de partitions logiques qu'on veut.

    2. **numéro de partition**  
        Si le dernier numéro de partition était 2, alors la partition suivante doit être numérotée 3.  
        Lors de la création de partitions logiques, l'utilitaire fdisk ne demandera pas de numéro de partition et attribuera un numéro par défaut

    3. **secteur de départ**  
       L'attribution du secteur de départ est extrêmement simple: fdisk sait quel est le prochain secteur disponible, il suffit d'appuyer sur Entrée pour accepter la valeur proposée (= le prochain secteur disponible). Il est possible de taper manuellement le numéro de secteur, mais ce n'est pas recommandé car on peut créer des plages de secteurs inutilisables.

    4. **taille de la partition**  
       Il y a 3 moyens d'assigner le dernier secteur:  
       - "dernier secteur",
       - "+secteur",
       - "+taille{K,M,G,T,P}". Par exemple +100MB.  
         C'est typiquement la technique préférée car aucun calcul n'est nécessaire.  
       - taper Entrée directement: la partition prendra toute la place disponible restante

* Après avoir modifié la table de partition, la commande `partprobe` ou `kpartx` doit être exécutée. Sinon, le système devra être redémarré avant que les nouvelles partitions puissent être utilisées.

  ```
  $ sudo partprobe
  $ sudo fdisk -l
  ```

* `fdisk -l` permet de lister les partitions (de tous les disques ou d'un disque donné) — non interactif:

  ![](https://i.imgur.com/CzwqNrq.png)

  Pour comparer avec les infos retournées par `gdisk -l`:

  ![](https://i.imgur.com/iu0qHjT.png)

### GNU parted

* GNU parted est un autre utilitaire pour éditer les partitions — moins user-friendly.

  ![](https://i.imgur.com/hHwYZDr.png)

---

## Formatter la partition

### fdisk

* Par défaut, l'utilitaire fdisk définit les partitions primaires et logiques avec le système de fichiers 83 (Linux).  
  Pour les partitions étendues, l'ID doit être 5 et ne doit jamais être changé.

* Pour changer le type de système de fichiers, on peut utiliser la sous-commande `t` de fdisk.  
  Entrer le numéro de partition à modifier suivit de l'ID du système de fichier en hexadécimal — utiliser `L` pour afficher la liste des codes hexadécimaux disponibles.

  ![](https://i.imgur.com/MvD8lo2.png)

## mkfs

* `mkfs` permet également de formatter une partition

  ![](https://i.imgur.com/cLRWqs5.png)

  `mkfs` est un wrapper pour différents systèmes de fichier: on peut obtenir le même résultat avec `mkfs.ext4` (sans le -t ext4)  
  C'est important à savoir car la commande mkfs fournit des options génériques alors que la commande qu'il appelle peut avoir des options spécifiques au système de fichiers crée — consulter le manuel pour plus d'infos

  ![](https://i.imgur.com/HermTzo.png)

* Une fois partitionné et formatté avec un système de fichier, le périphérique est prêt à être monté et utilisé sous Linux.
