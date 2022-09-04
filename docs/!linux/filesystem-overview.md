---
title: Systèmes de fichier
category: IT
---

## Rappels sur les partitions

* Les disques (durs ou électroniques) sont divisés en partitions, différentes sections du disque qui peuvent être utilisées pour cloisonner des fichiers pour différents usages — différents OS, des outils de réparation, etc.

  ![](https://i.imgur.com/IU8I1gA.jpg)

* La table de partition est une structure de données qui contient les informations des différentes partitions sur le disque, avec notamment leur emplacement et leur taille. Le format de cette table est définit par le firmware — logiciel fabricant responsable de la mise sous tension du système.

  Il y a deux formats de table de partitionnement:

  - <ins>MBR</ins>: format du BIOS Legacy  
    Peut contenir jusqu'à 4 partitions

  - <ins>GPT</ins>: format du BIOS EFI (et UEFI)  
    Peut contenir jusqu'à 128 partitions

* La table de partition est utilisée dans un premier temps par le firmware (avec le bootloader) pour démarrer le système d'exploitation, avant de lui rendre la main.

---

## Système de gestion de fichier (SGF)

* Ce n'est pas tout d'écrire des données sur le disque (dans des partitions), il faut ensuite pouvoir les retrouver. Pour ce faire, les données doivent suivre une organisation connue. Cette organisation est appelée un *système de gestion de fichier*, ou simplement *système de fichier* (*filesystem* en anglais) — ce qui peut porter à confusion puisque suivant le contexte ce terme peut désigner le SGF ou la hiérarchie des répertoires.

* Un SGF permet

  1. de s'abstraire de l'architecture matérielle: plutôt que de demander "les octets entre les secteurs 12802 et 12837", on peut demander "photos/koaloa.jpg"
  2. de gérer l'allocation des secteurs lors de la création, modification et suppression de fichiers
  3. assurer l'intégrité des données en cas de crash ou panne de courant
  4. mettre en cache les données susceptibles d'être lues dans le futur

* Il existe de nombreux SGF, les plus courants sont:  

  - sous <ins>Windows</ins>: fat32, ntfs
  - sous <ins>Linux</ins>: ext2, ext3, etx4

## SGF notables

- <ins>ext2</ins> (*2nd extended filesystem*)  
  SGF Linux  
  Pour: fonctionne bien avec les disques dur de petite taille  
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
  - Permet de créer des sous-volumes d'un système de fichier, un peu comme les partitions sont des sous-sections de disque, pouvant être utilisés pour stocker de grandes quantités de données auxquelles on accède rarement puisqu'il n'est pas nécessaire de monter ces données au préalable, on peut utiliser un montage automatique.
  - On peut configurer la compression (LZO, ZLIB, ZSTD) des fichiers, qui sera faite à la volée lorsqu'on lit et écrit les données.

- <ins>xfs</ins> (*extents filesystem*)  
  SGF par défaut sous RHEL7  
  Fonctionne très efficacement avec les gros fichiers.  

- <ins>iso</ins> (*iso 9660*)  
  SGF utilisé sur les CD-ROM et les DVD-ROM  
  Pour: Il est pris en charge par presque tous les systèmes d'explotiation  
  Contre: Les niveaux multiples et les extensions compliquent la comptabilité conçu pour les supports réinscriptibles

- <ins>udf</ins> (*universal disk format*)  
  SGF utilisé pour les DVD récents  
  Conçu pour remplacer l'ISO 9660 et adopté comme format standard pour les DVD par le DVD consorsium

- <ins>vfat</ins> (*file allocation table*) — FAT32, FAT64, extFAT  
  SGF généralement utilisé pour les périphériques amovibles  
  Pour: support par presque tous les systèmes d'exploitation.  
  Contre: incapacité à prendre en charge des disques très larges ou à déposer les revendications de propriété intellectuelle de Microsoft

- <ins>ntfs</ins> (*new technology filesystem*)  
  SGF propriétaire de Microsoft depuis Windows NT 3.1  
  L'accès aux partitions NTFS est une nécessité courante dans les installations dual-boot, où l'échange de fichiers entre disques est nécessaire

## Extended filesystem

* Typiquement le système de fichiers utilisé sous Linux fait partie de la famille *extended*: ext2, etx3 ou ext4.  
  Les composants de base de ces système de fichiers sont les mêmes:

  * <ins>superblock</ins>:  
    Le superblock est une zone située au début du système de fichiers (bloc 0) utilisée pour stocker des informations sur le système de fichiers — dont le type de système de fichiers, sa taille et la taille des blocs.  
    Le superblock est un composant clé du système de fichiers: s'il est corrompu, le système de fichiers est inaccessible, raison pour laquelle une copie du superbloc est ajoutée dans chaque groupe de bloc.

    <details>
    <summary>fsstat</summary>

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

  * <ins>group descriptor table</ins>:  
    Le système de fichiers est divisé en sections plus petites, des *groupes de bloc*.  
    Une table (*group descriptor table*) située à la suite du superblock (bloc 1) contient la liste de ces groupes.

    ![](https://i.imgur.com/iOU2mR1.png)

    <details>
    <summary>
    Chaque entrée dans la table fait 32 octets et contient entre autres les adresses du bloc.
    </summary>

    Les champs d'une entrée sont les suivants:

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

  * groupe
    * <ins>inode table</ins>: (*table d'i-noeuds*, *i-liste*)  
      Chaque groupe contient une table d'inode.  
      Une inode est une structure de données contenant les métadonnées du fichier, comme sa taille, les droits d'accès, la date de création, etc. Le numéro d'inode est l'identifiant du fichier dans cette table — qui est unique par système de fichiers. Le nom du fichier n'est pas enregistré dans l'inode: cette information est stockée dans le répertoire parent.

      ![](https://i.imgur.com/Pg5WSfv.png)

      <details>
      <summary>L'inode contient également l'emplacement des blocs de données du fichier.</summary>

      Pour ce faire, deux types de champs sont utilisés:<br>
      <ul>
        <li>des <i>blocs d'adresse</i>: champs contenant les adresses (liens directs) des premiers blocs de données du fichier — à raison d'une adresse par bloc.</li>
        <li>des <i>blocs d'indirection</i>: 3 champs (simple, double et triple indirection) contenant des pointeurs vers d'autres blocs. Si les liens directs sont suffisants, les indirections ne sont pas utilisées.<br><br>

          <img src="https://i.imgur.com/fvPpUJ7m.png" alt="" />
        </li>
      </ul>      
      </details>

    * <ins>data area</ins>: (*blocs de données*)  
      Les blocs de données contiennent l'ensemble des données du fichier (= le contenu du fichier).  
      Pour un répertoire, le contenu est la liste des fichiers qui se trouvent à l'intérieur (nom et numéro d'inode de chacun des fichiers).

      ![](https://i.imgur.com/iCpMsH6.png)

      Les blocs de données sont formés de blocs logiques de 0.5, 1, 2 ou 4 Ko (par défaut). La même taille de bloc est appliquée pour tout le système de fichiers: si la taille d'un bloc est 4 Ko, tout fichier fera au minimum 4 Ko. S'il y a beaucoup de fichiers de taille inférieurs à 4 Ko (notamment des répertoires ou des liens), utiliser des blocs plus petits peut permettre de gagner de la place sur le disque... mais donne plus de blocs à gérer pour des fichiers plus gros, ce qui peut surcharger le système — donc à utiliser avec précaution.

    * <ins>block bitmap</ins>:  
      La liste des blocs disponibles peut être retrouvée en passant en revue l'ensemble des inodes occupés mais cette opération prendrait beaucoup de temps: la liste des blocs disponibles est donc stockée sur le disque. Dans le système ext4, chaque groupe de bloc inclut une zone réservée pour stocker le "bitmap" des blocs libres, une structure de données où chaque bit représente si un bloc est disponible ou non. Avec un disque de 4 To et des blocs de 4 Ko, le nombre de bits nécessaires serait 1.073.741.824, soit un bitmap de 128 Mo.

    * <ins>inode bitmap</ins>:  
      De même que le groupe contient un bitmap permettant de savoir quels blocs de données sont disponibles, il contient également un bitmap permettant de savoir quels inodes sont inaffectés.

      Effacer un fichier avec la commande `rm` efface simplement l'inode. Les blocs de données sont alors déclarés commes libres et seront éventuellement écrasés lors de la création de nouveaux fichiers. Des logiciels spécifiques permettent de passer en revue l’ensemble des blocs de données libres pour détecter des fichiers effacés qui n’auraient pas encore été écrasés par le contenu de nouveaux fichiers.

---

## Créer une partition

* Créer une partition consiste à

  1. créer une entrée dans la table de partition.
  2. *formatter* le SGF, c'est à dire inscrire (initialiser) les structures de données du SGF sur le disque.  
     Une partition sans SGF est inutilisable: on ne pourra pas dire à quoi correspond tel ou tel emplacement mémoire. Une partition aura un et un seul SGF.

## Système de fichier virtuels

* Le *système de fichier virtuels* (*virtual file system*) permet de regrouper différents SGF et offrir une vision unifiée à l'utilisateur et aux applications, indépendemment des composants physiques et partitions utilisés.<br><br>

  ![](https://i.imgur.com/uOCfyRgl.png)

## Monter une partition

* *Monter* une partition (*mount* en anglais), c'est associer l'emplacement d'une partition à un répertoire du système de fichier virtuels. Ce répertoire est appelé le *point de montage* de la partition.  
  La liste des répertoires et leur usage est spécifié dans le standard de hiérarchie des systèmes de fichier (*Filesystem Hierarchy Standard*, FHS).

* Si on branche une clé USB (qui aura été détectée comme /dev/...),  
  pour pouvoir accéder au contenu de ce périphérique il faut

  1. créer un répertoire dans le système de fichier virtuel
  2. monter le périphérique sur ce répertoire
  3. lire & écrire les fichiers du point de montage (répertoire sur lequel on a monté le périphérique) pour lire & écrire les fichiers du périphérique
