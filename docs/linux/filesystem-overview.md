---
title: Systèmes de fichier
category: IT
---

## Rappels sur les partitions

* Les disques durs ou électroniques sont divisés en partitions. Une partition est une section du disque qui peut être utilisée pour cloisonner des fichiers pour différents usages — on peut créer plusieurs partitions pour stocker différents OS, des outils de réparation, etc.

  ![](https://i.imgur.com/IU8I1gA.jpg)

* La table de partition est une structure de données qui contient les informations des différentes partitions sur le disque, avec notamment leur emplacement et leur taille. Le format de cette table est définit par le firmware — logiciel fabricant responsable de la mise sous tension du système.

  Il y a deux formats de table de partitionnement:

  - <ins>MBR</ins>: format du BIOS Legacy  
    Peut contenir jusqu'à 4 partitions

  - <ins>GPT</ins>: format du BIOS EFI (et UEFI)  
    Peut contenir jusqu'à 128 partitions

* La table de partition est utilisée dans un premier temps par le firmware (avec le bootloader) pour démarrer le système d'exploitation, avant de rendre la main à l'OS.

---

## Système de gestion de fichier (SGF)

* Ce n'est pas tout d'écrire des données sur le disque (dans des partitions), il faut ensuite pouvoir les retrouver. Pour ce faire, les données doivent suivre une organisation connue. Cette organisation est appelée un *système de gestion de fichier*, ou simplement *système de fichier* (*filesystem* en anglais) — ce qui peut porter à confusion puisque suivant le contexte ce terme peut désigner le SGF ou la hiérarchie des répertoires.

* Un SGF permet
  
  1. de s'abstraire de l'architecture matérielle: plutôt que de demander "les octets entre les secteurs 12802 et 12837", on peut demander "photos/koala.jpg"
  2. de gérer l'allocation des secteurs lors de la création, modification et suppression de fichiers
  3. assurer l'intégrité des données en cas de crash ou panne de courant
  4. mettre en cache les données susceptibles d'être lues dans le futur

<!-- -->
  
* Il existe de nombreux SGF, les plus courants sont:  

  - sous <ins>Windows</ins>: fat32, ntfs
  - sous <ins>Linux</ins>: ext2, ext3, etx4

## SGF notables

- <ins>ext2</ins> (*2nd extended filesystem*)  
  SGF Linux  
  Pour: fonctionne bien avec les disques durs de petite taille  
  Contre: aucune possibilité de journalisation, ce qui le rend susceptible d'entraîner une perte de données en cas de panne de courant — si le système s'éteint de manière brusque, le système de fichier peut être corrompu et au moment de le rallumer, il faudra utiliser un outil de réparation pour réparer le système de fichiers.

- <ins>ext3</ins> (*3rd extended filesystem*)  
  SGF Linux  
  Pour: peut être mise à jour à partir d'un système de fichiers ext2 existant sans perte de données. Journalise les opérations effectuées, ce qui permet de récupérer les données après un crash.  
  Contre: La journalisation occasionne davantage d'écritures sur le disque, ce qui le ralentit. Ne supporte pas les gros fichiers

- <ins>ext4</ins> (*4th extended filesystem*)  
  SGF Linux  
  Prise en charge de gros volumes de disque et toutes tailles de fichiers. Peut fonctionner avec ou sans journalisation. Rétrocompatible avec ext3 et ext2

- <ins>reiserfs</ins> (*reiser filesystem*)  
  SGF Linux  
  Premier système de fichiers de journalisation pour Linux.  
  Fonctionne efficacement avec de petits fichiers

* <ins>btrfs</ins> (*butter filesystem*)  
  SGF Linux  
  Conçu pour gérer rapidement les fichiers volumineux
  - Utilise un b-tree pour lire et écrire des données
  - Possède sa propre fonctionnalité RAID intégrée
  - Permet de créer des sous-volumes d'un système de fichier, un peu comme les partitions sont des sous-sections de disque, pouvant être utilisés pour stocker de grandes quantités de données auxquelles on accède rarement. Puisqu'il n'est pas nécessaire de monter ces données au préalable, on peut utiliser un montage automatique.
  - On peut configurer la compression (LZO, ZLIB, ZSTD) des fichiers, qui sera faite à la volée lorsqu'on lit et écrit les données.

- <ins>xfs</ins> (*extents filesystem*)  
  SGF par défaut sous RHEL7  
  Fonctionne très efficacement avec les gros fichiers.  

- <ins>iso</ins> (*iso 9660*)  
  SGF utilisé sur les CD-ROM et les DVD-ROM  
  Pour: il est pris en charge par presque tous les systèmes d'exploitation  
  Contre: les niveaux multiples et les extensions compliquent la comptabilité conçu pour les supports réinscriptibles

- <ins>udf</ins> (*universal disk format*)  
  SGF utilisé pour les DVD récents  
  Conçu pour remplacer l'ISO 9660 et adopté comme format standard pour les DVD par le DVD consorsium

- <ins>vfat</ins> (*file allocation table*) — FAT32, FAT64, extFAT  
  SGF généralement utilisé pour les périphériques amovibles  
  Pour: support par presque tous les systèmes d'exploitation.  
  Contre: incapacité à prendre en charge des disques très larges ou à déposer les revendications de propriété intellectuelle de Microsoft

- <ins>ntfs</ins> (*new technology filesystem*)  
  SGF propriétaire de Microsoft depuis Windows NT 3.1  
  L'accès aux partitions NTFS est une nécessité courante dans les installations dual-boot, où l'échange de fichiers entre différentes partitions est nécessaire

## Extended filesystem

* Typiquement le système de fichiers utilisé sous Linux fait partie de la famille *extended*: ext2, etx3 ou ext4.

* Les systèmes de fichier *extended* allouent l'espace de stockage en unités de *blocs*. Un bloc est un groupe de secteurs, compris entre 1Kb et 64Kb. La taille de blocs est spécifiée au moment de la création de la partition (mkfs) et est paar défaut de 4Kb.

* Les composants de base de ces système de fichiers sont les mêmes:

  - le superbloc est un bloc contenant les informations à propos du système de fichier
  - les descripteurs de blocs contiennnent les adresses associées aux différents blocs
  - les bitmaps de blocs contiennent les statuts des blocs (occupé ou non)
  - les bitmaps d'inode contiennent les statuts des inodes (utilisé ou non)
  - les tables d'inode contiennent les metadonnées des fichiers
  - les blocs de données contiennent le contenu des fichiers

  ![](https://i.imgur.com/Qozr9eN.png)

  <ins>Schéma simplifié</ins>:

  ![](https://i.imgur.com/3N89SX3.png)

### Superbloc

* Le superbloc est une zone située au début du système de fichiers (dans le bloc 0) utilisée pour stocker des informations sur le système de fichiers — dont le type de système de fichiers, sa taille et la taille des blocs.  

* Le superbloc est un composant clé du système de fichiers: s'il est corrompu, le système de fichiers est inaccessible, raison pour laquelle plusieurs copies du superbloc sont crées (une copie est ajoutée dans chaque groupe de bloc).

  <details>
  <summary>La commande fsstat permet d'afficher les détails du système de fichier.</summary>

  <pre lang="bash">
  # fsstat /dev/mapper/elk-home
  FILE SYSTEM INFORMATION
  --------------------------------------------
  File System Type: Ext3
  [...]
  CONTENT INFORMATION
  --------------------------------------------
  Block Range: 0 - 113971199
  Block Size: 4096
  Free Blocks: 13506529

  BLOCK GROUP INFORMATION
  --------------------------------------------
  Number of Block Groups: 3479
  Inodes per group: 8192
  Blocks per group: 32768
  [...]
  Group: 112:
   Inode Range: 917505 - 925696
   Block Range: 3670016 - 3702783
   Layout:
   Data bitmap: 3670016 - 3670016
   Inode bitmap: 3670032 - 3670032
   Inode Table: 3670048 - 3670559
   Data Blocks: 3670033 - 3670047, 3670560 - 3702783
   Free Inodes: 3281 (40%)
   Free Blocks: 0 (0%)
   Total Directories: 2
  [...]
  </pre>
  </details>

### Descripteurs de blocs

* À la suite du superbloc (donc à partir du bloc 1), se trouve un groupe de blocs où chaque bloc contient une table de metadonnées (aussi appelé descripteurs de blocs) — qui contient notamment l'emplacement du bitmap de blocs de données, du bitmap d'inodes et de la table d'inodes du bloc associé.

* Chaque entrée dans cette table fait 32 octets.

  <details>
  <summary>
  Détail des champs d'une entrée
  </summary>

  <table>
    <tr>
      <th>Byte Range</th>
      <th>Description</th>
      <th>Essentiel</th>
    </tr>
    <tr>
      <td>3</td>
      <td>Adresse de départ du block bitmap</td>
      <td>1</td>
    </tr>
    <tr>
      <td>47</td>
      <td>Adresse de départ de l'inode bitmap</td>
      <td>1</td>
    </tr>
    <tr>
      <td>811</td>
      <td>Adresse de départ de l'inode table</td>
      <td>1</td>
    </tr>
    <tr>
      <td>1213</td>
      <td>Nombre de blocs non alloués dans le groupe</td>
      <td>0</td>
    </tr>
    <tr>
      <td>1415</td>
      <td>Nombre d'inodes non alloués dans le groupe</td>
      <td>0</td>
    </tr>
    <tr>
      <td>1617</td>
      <td>Nombre de répertoires dans le groupe</td>
      <td>0</td>
    </tr>
    <tr>
      <td>1831</td>
      <td>(non utilisé)</td>
      <td>0</td>
    </tr>
  </table>

  <a href="https://flylib.com/books/en/2.48.1/group_descriptor_tables.html">Group Descriptor Tables</a>
  </details>

### Table d'inode

* Après les descripteurs de blocs, se trouve un groupe de blocs où chaque bloc contient une table d'inode (aussi appelée *table d'i-noeuds* ou *i-liste*).  

* Une *inode* est une structure de données qui contient les métadonnées d'un fichier — comme sa taille, les droits d'accès, la date de création, etc.
  Le nom du fichier n'est pas enregistré dans l'inode: cette information est stockée dans le répertoire parent.

  ![](https://i.imgur.com/Pg5WSfv.png)

* L'inode contient la ou les adresses de l'emplacement des données — qui est le contenu du fichier.  
  Si le contenu pèse plus de 4k (en partant du principe qu'on utilise un système de fichier avec des blocs de 4k), alors il faut plusieurs blocs pour stocker le contenu du fichier, et l'inode contiendra plusieurs adresses. Éventuellement, si le fichier est très gros, il n'y aura pas assez de place dans l'inode pour contenir la liste des adresses. Pour cette raison, on a deux types de champ adresse:

  * les <ins>blocs d'adresse</ins>: liens direct  
    12 champs contenant les adresses des premiers blocs de données du fichier — à raison d'une adresse par bloc.

  * les <ins>blocs d'indirection</ins>: simple, double et triple indirection  
    3 champs contenant des pointeurs vers d'autres blocs.  
    Si les liens directs sont suffisants, les indirections ne sont pas utilisées.

  ![](https://i.imgur.com/fvPpUJ7m.png)

### Blocs de données

* Dans les blocs de données se trouvent le contenu des fichiers.  
  Pour un répertoire, le contenu est la liste des fichiers qui se trouvent à l'intérieur — avec le nom du fichier le et numéro d'inode, qui est l'emplacement de l'inode dans la table d'inode du système de fichier.

  ![](https://i.imgur.com/iCpMsH6.png)

* Les blocs de données sont formés de blocs logiques de 0.5, 1, 2 ou 4 Ko (par défaut). La même taille de bloc est appliquée pour tout le système de fichiers: si la taille d'un bloc est 4 Ko, tout fichier fera au minimum 4 Ko.

  S'il y a beaucoup de fichiers de taille inférieurs à 4 Ko (notamment des répertoires ou des liens), utiliser des blocs plus petits peut permettre de gagner de la place sur le disque... mais donne plus de blocs à gérer pour des fichiers plus gros, ce qui peut surcharger le système — donc à utiliser avec précaution.

### Bitmap de blocs de données

* La liste des blocs disponibles peut être retrouvée en passant en revue l'ensemble des adresses répertoriées par les inodes occupés mais cette opération prendrait beaucoup de temps: la liste des blocs disponibles est donc sauvegardée sur le disque.

  Dans le système ext4, une zone réservée stocke le "bitmap" des blocs libres, une structure de données où chaque bit représente si un bloc est disponible ou non. Avec un disque de 4 To et des blocs de 4 Ko, le nombre de bits nécessaires pour stocker le bitmap est 1.073.741.824, soit 128 Mo.

### Bitmap d'inodes

* De même qu'il y a un bitmap permettant de savoir quels blocs de données sont disponibles, il y également un bitmap permettant de savoir quels inodes sont inaffectés.

  Effacer un fichier avec la commande `rm` efface simplement l'inode, et les bitmaps d'inodes et de blocs de données indiquent ces blocs comme libre.
  Les blocs seront éventuellement écrasés lors de la création de nouveaux fichiers. Des logiciels spécifiques permettent de passer en revue l’ensemble des blocs de données libres pour détecter des fichiers effacés qui n’auraient pas encore été écrasés par le contenu de nouveaux fichiers.

---

## Créer une partition

* Créer une partition consiste à

  1. créer une entrée dans la table de partition.
  2. *formatter* le SGF, c'est à dire inscrire (initialiser) les structures de données du SGF sur le disque.  
     Une partition sans SGF est inutilisable: on ne pourra pas dire à quoi correspond tel ou tel emplacement mémoire. Une partition aura un et un seul SGF.

## Système de fichier virtuels

* Le *système de fichier virtuels* (*virtual file system*) permet de regrouper différents SGF et offrir une vision unifiée à l'utilisateur et aux applications, indépendemment des différentes partitions et composants physiques utilisés.<br><br>

  ![](https://i.imgur.com/uOCfyRgl.png)

## Monter une partition

* *Monter* une partition (*mount* en anglais), c'est associer l'emplacement d'une partition à un répertoire du système de fichier virtuels. Ce répertoire est appelé le *point de montage* de la partition.

  Sous Linux, la liste des répertoires et leur usage est spécifié dans le standard de hiérarchie des systèmes de fichier (*Filesystem Hierarchy Standard*, FHS).

* Si on branche une clé USB (qui aura été détectée comme /dev/something dans le FHS Linux),  
  pour pouvoir accéder au contenu de ce périphérique il faut

  1. si nécessaire, créer un répertoire dans le système de fichier virtuel
  2. monter le périphérique sur ce répertoire
  3. simplement lire & écrire les fichiers du point de montage (répertoire sur lequel on a monté le périphérique), ce qui aura pour effet de lire & écrire les fichiers du périphérique
