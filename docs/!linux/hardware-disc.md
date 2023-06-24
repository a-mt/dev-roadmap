---
title: Disque dur magnétique
category: IT
---

* Pour comprendre comment les données sont organisées au niveau applicatif (formattage de haut niveau), il faut comprendre comment les données sont structurées à la surface du disque (formattage de bas niveau).

## Support physique

* <ins>Plateau</ins>  
  Au coeur de chaque disque dur se trouve un ensemble de disques tournant à grande vitesse, aussi appelés *plateaux* (*platter* en anglais). Pour pouvoir stocker un maximum d'information en un minimum d'espace, le haut et le bas des plateaux sont utilisés — ce qu'on appelle des *surfaces de travail*. C'est sur ces surfaces que sont stockées les informations.

  ![](https://i.imgur.com/NcT3Cj9t.png)
  ![](https://i.imgur.com/CPHghVDt.png)

* <ins>Grains magnétiques</ins>  
  Chaque surface est recouverte d'une pellicule de grains magnétiques, généralement un alliage à base de cobalt. Les données sont enregistrées sous la forme d'un motif magnétique sur des groupes de grains magnétiques; dans les disques durs actuels, chaque région magnétique est composée de quelques centaines de grains magnétiques. Dans son ensemble, tous les grains dans une région magnétique auront leur magnétisation alignée dans un sens ou dans l'autre, ce qui correspondra à un 0 ou 1 — un bit.

  ![](https://i.imgur.com/xLu0tM9m.png)
  ![](https://i.imgur.com/efmjyXv.png)

* On utilise des groupes de grains magnétiques plutôt qu'un matériel magnétique continu pour réduire les interférences magnétiques (effet Néel), et ainsi de réduire l'espace nécessaire pour stocker les données. [Hard disk drive platter](https://en.wikipedia.org/wiki/Hard_disk_drive_platter)

  ![](https://i.imgur.com/RZkutpa.png)

  Lorsque le volume d'un grain magnétique est trop petit, sa magnétisation est facilement perturbée par la chaleur et peut provoquer une commutation involontaire des bits, ce qui entraîne une perte de données. C'est ce qu'on appelle l'*effet super-paramagnétique*. La densité des grains (nombre de grain par cm²), et par conséquent la quantité de données pouvant être enregistrée sur un plateau, est limitée par ce facteur.

* <ins>Tête de lecture/écriture</ins>  
  Une tête de lecture/écriture survole la surface de chaque plateau.  
  Elle ne touche jamais le plateau, mais il faudrait un microscope pour le voir.

  - En écriture: Les données sont écrites sur le disque en convertissant le courant électrique en champ magnétique par un électro-aimant — inverser le sens du courant dans un électro-aimant entraîne une inversion de la direction du champ magnétique. Cet aimant génère un champ suffisamment puissant pour changer la direction de la magnétisation des grains métalliques — positif vers le haut ou positif vers le bas.

  - En lecture: Les champs magnétiques émis par les grains peuvent ensuite être re-convertit en courant électrique par un lecteur magnétique, un peu comme l'aiguille d'un phonographe traduit les sillons d'un disque en musique.

  ![](https://i.imgur.com/6D4VWrn.png)

* <ins>Tige de rotation</ins>  
  Typiquement, les plateaux sont maintenus par une tige au centre (*spindle* en anglais). Cette tige est motorisée, et permet de faire tourner les plateaux sous les têtes de lecture/écriture. Le moteur de la tige doit fournir une puissance de rotation stable, fiable et constante, pendant de nombreuses heures d'utilisation continue. Souvent, les défaillances du disque dur sont dues à un mauvais fonctionnement de ce moteur.

  ![](https://i.imgur.com/Mh4KLou.png)

* <ins>Bras de lecture/écriture</ins>  
  La tête de lecture/écriture est à l'extrémité d'un bras qui permet de déplacer la tête de lecture de l'extérieur à l'intérieur du plateau. Le moteur de la tige et le moteur du bras collaborent pour aligner la tête de lecture/écriture à l'endroit désiré du plateau.

  ![](https://i.imgur.com/1UZi0Nf.jpg)

* <ins>Actionneur</ins>  
  Les bras de lecture/écriture (*read-write arm* ou *actuator arm*) sont contrôlés par une colonne commune aux différents bras (*arm assembly*). Cette colonne est mise en mouvement par un *actionneur* (*actuator*): toutes les têtes se déplacent simultanément.

  ![](https://i.imgur.com/lqK8Lca.png)
  ![](https://i.imgur.com/BrAwgL0.png)

## Organisation des données

* <ins>Piste</ins>  
  Chaque surface de travail du plateau est divisé en milliers de cercles concentriques très serrés, un peu comme les anneaux annuels d'un arbre. On appelle ces cercles des *pistes* (*tracks* en anglais) et toutes les informations stockées sur le disque sont enregistrées dans les pistes.

  Qui dit disque, dit géométrie radiale: la longueur d'une piste est *2&pi;r*, où *r* est le rayon de la piste — c'est à dire la distance par rapport au centre. Plus la piste est longue, plus on peut y enregistrer des données: sans surprise, les pistes les plus extérieures peuvent contenir plus de données que les pistes intérieures, et même beaucoup plus.

* <ins>Cylindre</ins>  
  Les pistes à la même distance du centre constituent ce qu'on appelle un *cylindre*.  
  Toutes les têtes se déplacent en même temps: ainsi, si on veut lire la piste 2 du plateau 1, alors les têtes sont placées sur le cylindre 2 et seule la tête du plateau 1 est active tandis que les autres sont inactives — autrement dit, seule la tête #1 lit les données.

  ![](https://i.imgur.com/nKCD2Xz.png)

* <ins>Secteur</ins>  
  Pour savoir où placer la tête de lecture/écriture sur le disque, chaque piste est sous-divisée en *secteurs* (*sectors*). Le secteur est la plus petite unité de stockage adressable individuellement sur le disque.

  Typiquement, un secteur fait 4096 bits, soit 520 octets. Parmi ces 520, 8 sont utilisés pour contenir des métadonnées, dont le numéro de secteur et un champ de contrôle d'erreur, le CRC (*cyclic redundancy check*). Les 512 octets restants permettent de stocker les données qu'on veut.  
  La structure des pistes et des secteurs est inscrite sur le plateau par le fabricant.  
  Aujourd'hui les disques ont souvent des secteurs 4096B (4KiB) au lieu de 512B.

  [What is the difference between CRC and ECC?](https://first-law-comic.com/what-is-the-difference-between-crc-and-ecc/)

* <ins>Zone Bit Recording (ZBR)</ins>  
  Quand les disques durs ont été mis sur le marché, les pistes étaient divisées géométriquement — le nombre de secteurs (emplacements mémoire adressables) par piste était une quantité constante. En résultait une utilisation inefficace de l'espace disponible.

  La situation idéale aurait été d'utiliser une taille fixe de secteur et mettre autant de secteurs possibles sur une piste. Le problème c'est que ça demanderait un mécanisme de recherche complexe pour déterminer où se trouve un secteur donné — on devrait conserver un tableau de toutes les pistes avec leur nombre de secteurs, et calculer le déplacement à effectuer (de la tête et de la tige).

  La solution retenue a été un compromis entre les deux: la taille des secteurs est fixe et le plateau est divisé en un petit nombre de *zones*. Chaque zone est un ensemble de piste avec un nombre donné de secteurs. Cette technique est appelé le *Zone Bit Recording* (ZBR).

  ![](https://i.imgur.com/gNTWsVa.jpg)

  Par exemple:

  | Zone | Nombre de pistes | Secteurs par piste | Vitesse de transfert (Mbps)
  |--- |--- |--- |---
  | 0 | 1700 | 2140 | 1000
  | 1 | 3845 | 2105 | 990
  | 2 | 4535 | 2050 | 965
  | 3 | 4365 | 2000 | 940
  | 4 | 7430 | 1945 | 915
  | 5 | 7775 | 1835 | 860
  | 6 | 5140 | 1780 | 835
  | 7 | 6435 | 1700 | 800
  | 8 | 8985 | 1620 | 760
  | 9 | 11965 | 1460 | 685
  | 10 | 12225 | 1295 | 610
  | 11 | 5920 | 1190 | 560
  | 12 | 4320 | 1135 | 530

* <ins>Cylinder Head Sector (CHS)</ins>  
  Le système interne de cylindre, piste et secteur était autrefois utilisé pour désigner un emplacement mémoire: le système d'exploitation devait connaître la géométrie de chaque disque utilisé. On appelle cette méthode d'adressage *Cylinder Head Sector* (CHS).

* <ins>Logical Block Addressing (LBA)</ins>  
  CHS a depuis été remplacée par une méthode d'adressage par bloc logique: *Logical Block Addressing* (LBA). Celle-ci simplifie l'adressage en utilisant une adresse linéaire pour accéder aux secteurs.  
  Les blocs logiques (adresse LBA) sont mappées aux secteurs physiques (adresse CHS) par le contrôleur du disque, et l'hôte n'a besoin que de connaître le nombre de blocs.

  ![](https://i.imgur.com/MZKq0tn.png)

* <ins>Bloc</ins>  
  Le secteur *n* désigne le n-ième secteur, qui peut se trouver sur n'importe quel cylindre / piste.  
  Le bloc *n* désigne un secteur et un seul — grâce à l'utilisation de LBA.

  ![](https://i.imgur.com/qBeqAOK.jpg)

* <ins>Cluster</ins>  
  Un *cluster* est un espace contigu de blocs.  
  Quand un fichier n'est pas sauvegardé sur un cluster mais plusieurs, on dit qu'il est *fragmenté*.

  ![](https://i.imgur.com/JsmznMMm.png)

## Performance

* Différentes métriques sont utilisées pour mesurer la performance d'un disque dur:

  * <ins>Temps de recherche</ins> (*seek time*)  
    Temps nécessaire pour déplacer la tête de lecture/écriture sur la piste souhaitée.  
    Mesuré en millisecondes

    - complet (*full stroke*): temps pour se déplacer de la piste la plus interne à la plus externe
    - piste à piste (*track-to-track*): temps pour se déplacer entre deux pistes adjacentes
    - moyen (*average*): typiquement, compté comme 1/3 d'un déplacement complet  
      Le temps de recherche moyen est généralement compris entre 4 et 8 millisecondes.

  * <ins>Latence de rotation</ins> (*rotational latency*)  
    Temps nécessaire pour tourner le plateau jusqu'au secteur souhaité — sous la tête de lecture/écriture.  
    Mesuré en millisecondes  

    Le latence de rotation moyenne est de l'ordre de 2 à 6ms, ce qui peut paraître rapide, mais est très lent comparé à la vitesse du processeur et  de la RAM, et peut être source de ralentissements.  
    La latence de rotation est liée à la <ins>vitesse de rotation</ins> du disque (*rotational speed*), qui est mesurée en tours par minute [tr/min] (revolutions per minute [rpm] en anglais)

    | Vitesse de rotation (tr/min) | Latence de rotation (ms)
    |--- |---
    | 5400 | 5.6
    | 7200 | 4.2
    | 10000 | 3
    | 12000 | 2.5
    | 15000 | 2

  * <ins>Temps d'accès</ins> (*access time*)  
    Temps de recherche + latence de rotation.  
    C'est le temps nécessaire pour avoir la tête de lecture/écriture sur le bon secteur.

    On pourrait penser que les deux actions mécaniques se produisent simultanément (le plateau est en mouvement pendant que le bras se déplace) et que le temps d'accès est donc le plus grand temps des deux. Ce n'est pas le cas: une fois que la tête de lecture atteint la bonne piste, elle ne sait pas sur quel secteur elle se trouve. Elle doit lire le numéro du secteur qui se situe en dessous pour calculer de combien d'intervalles elle doit se déplacer. On a donc d'abord le temps de recherche et ensuite la latence de rotation.

  * <ins>Temps de lecture</ins> (*read time*)  
    Temps nécessaire pour lire 1 secteur.

  * <ins>Temps de transmission</ins> (*transmission time*)  
    Temps d'accès + temps de lecture  
    Mesuré en millisecondes

    Plutôt que le temps de transmission, on a souvent le <ins>taux de transfert</ins> (*tranfer rate*).  
    Mesuré en bits/s.  
    Les pistes de la zone 0 ont les taux de transfert les plus rapides du disque (puisque nécessitent moins de mouvement de la tête de lecture). et pour cette raison, les spécifications du taux de transfert sont parfois indiquées à l'aide de plages.

Sources:  
[Data Center Environment](https://www.jbiet.edu.in/coursefiles/cse/HO/cse4/SAN2.pdf)  
[Getting The Hang Of IOPS v1.3](https://community.broadcom.com/symantecenterprise/viewdocument/getting-the-hang-of-iops-v13)  
[Data Structures on Disk Drives](https://www.snia.org/education/storage_networking_primer/stor_devices/data_structure)