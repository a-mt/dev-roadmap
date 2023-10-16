---
title: Matériel informatique
category: IT
---

Un système informatique (comme un ordinateur ou un smartphone) est composé de deux grandes parties:  
une partie matérielle (*hardware*) et logicielle (*software*). Pour la partie matérielle, on distingue les composants internes des composants externes:

## Composants internes

### Carte mère

* La <ins>*carte mère*</ins> (*motherboard* en anglais), est le circuit imprimé qui regroupe les principaux composants internes de l'ordinateur — avec notamment le CPU, la RAM et le disque dur.

  ![](https://i.imgur.com/5ajdSNZm.png?1)

### CPU

* Le <ins>CPU (*Central Processing Unit*)</ins>, (*Unité Centrale de Traitement*  ou *processeur* en français) est souvent désigné comme le "cerveau" de l'ordinateur: il prend les différentes instructions qui proviennent des logiciels, les traite et retourne le résultat en sortie.

  On pense souvent à tord que le processeur est très sophistiqué. En réalité, le CPU est un circuit électronique qui ne réalise que des instructions très simples:
  * lire de l’information en mémoire;
  * écrire de l’information en mémoire ;
  * effectuer des calculs logiques (> < = et ou non) ou arithmétiques (+ - * /)

  Sa force est dans sa rapidité d'exécution: il effectue des tâches très simples très rapidement — plusieurs milliards d'instructions par seconde pour un processeur actuel.

  ![](https://i.imgur.com/Jj3duqT.png)

* Il y a deux grands types de CPU:
  - x86 (32 bits)  
    Inventé en 1978, il ne peut faire tourner que des applications 32 bits   
    Limité à 4 Go de RAM

  - x86_64 (64 bits)  
    Inventé en 2000, il peut faire tourner des applications 32 ou 64 bits  
    Peut prendre plus de 4 Go de RAM

* Un système informatique possédant plus d'un processeur est dit *multi-processeur*.  
  Une puce électronique qui contient plus d'un processeur est dite *multi-core*.

### GPU

* Le <ins>GPU (*Graphics Processing Unit*)</ins> permet d'alléger le processeur pour des calculs qui sont spécifiques au rendu graphique — comme de la 3D, de l'image ou de la vidéo. Il y a deux types de GPU:

  - la *carte graphique* est un circuit dédié au traitement graphique, qui possède sa propre mémoire — la VRAM (*Video RAM*). Une carte graphique n'est pas indispensable pour faire tourner une ordinateur.

  - la *puce GPU*. Sur un ordinateur qui n'a pas de carte graphique, cette puce, directement intégrée sur la carte mère, permet d'exécuter des petits jeux ou regarder des vidéos avec fluidité.

  ![](https://i.imgur.com/LGrOPlH.png)

### RAM

* Les ordinateurs ont une mémoire à court-terme pour les tâches immédiates et une mémoire à long-terme pour un stockage plus permanant.

* La <ins>RAM (*Random Access Memory*)</ins> ou *mémoire vive* est une mémoire de court-terme, qui stocke les données sous forme volatile: lorsqu'il n'y a plus d'électricité dans le circuit (le PC est éteint), toutes les données dans la RAM sont perdues.

  ![](https://i.imgur.com/GJXUFy6.png)

* Il y a deux types de RAM:

  - la <ins>DRAM (*Dynamic RAM*)</ins> est le type de RAM le plus courant.  
    Tout ce qui se trouve dans la mémoire d'un ordinateur prend la forme d'une unité de base appelé le *bit* (qui est la contraction de *binary digit*): chacune de ces valeurs est stockée dans une cellule de mémoire, qui peut basculer entre deux états, pour deux valeurs possibles: 0 ou 1.

    Chaque cellule de mémoire de la DRAM est constituée d'un mini transistor et d'un condensateur qui stockent des charges électriques — un 0 lorsqu'il n'y a pas de charge, ou un 1 lorsqu'il y a une charge.  
    Cette mémoire est dit dynamique parce qu'elle ne retient les charges que brièvement avant qu'elles ne s'échappent, nécessitant une recharge périodique pour conserver les données.

    C'est une mémoire rapide mais qui coûte très cher, raison pour laquelle il n'y en a que quelques Giga dans un ordinateur.

  - la <ins>SRAM (*Static RAM*)</ins> est la mémoire la plus rapide d'un système informatique.  
     La faible latence de 100 nanosecondes de la DRAM est trop longue pour les CPU modernes: le CPU a donc une petite mémoire cache interne à haute vitesse, faite de SRAM.  
     Elle est généralement constitué de 6 transistors imbriqués, qui n'ont pas besoin d'être rafraîchis.

     La SRAM est encore plus rapide que la DRAM mais aussi plus chère et prend 3 fois plus de place que la DRAM.

* Lorsqu'on allume le PC, le système d'exploitation est copié du disque dur à la RAM. Et lorsqu'on exécute un programme, le système d'exploitation alloue une zone de la mémoire RAM pour l'execution de ces instructions.

  Comme les instructions du programme doivent être traitées rapidement et en continu, tous les emplacements de la mémoire à court terme sont accessibles dans n'importe quel ordre, d'où le nom *random access memory*.

### ROM

* La ROM (*Read Only Memory*) ou *mémoire morte* est une mémoire permanente et à lecture seule — écrite directement par le fabricant. C'est dans cette mémoire que se trouve le BIOS (*Basic Input/Output System*), un ensemble de fonctions qui permettent d'initialiser l'état du système lors de sa mise sous tension.

  ![](https://i.imgur.com/XVOXGcq.png)

* Dans les ordinateurs plus récents, une mémoire flash EPROM (*Erasable Programmable Read-Only Memory*) remplace la mémoire ROM, ce qui permet de mettre à jour le BIOS — ce qu'on appelle couramment "flasher le BIOS".
  Le BIOS admet également quelques configurations utilisateur, par exemple pour modifier la séquence de démarrage. 
  Ces modifications sont stockées dans la CMOS, un circuit électrique alimenté par une petite pile. Cette pile lui permet de conserver toutes les modifications apportées — si elle est retirée, ou si elle tombe en panne, alors les paramètres du BIOS reviennent à leur état initial.

### Disque dur

* La RAM ne peut conserver les données que tant qu'elle est alimentée. Pour que les données soient conservées une fois l'appareil éteint, elles doivent être transférées dans un dispositif de stockage long-terme.

* Le <ins>HDD (*Hard Disk Drive*)</ins> ou *disque dur magnétique* est le dispositif de stockage long-terme le moins cher.  
  Les données sont stockées sous forme de motif magnétique sur un disque recouvert d'un film magnétique — un 0 lorsque le pôle magnétique est négatif (vers le haut), 1 lorsqu'il est positif.

  Comme le disque doit tourner sous la tête de lecture jusqu'à l'endroit où se trouvent les données pour être lu, la latence de ces lecteurs est 100 000 fois plus lente que celle de la DRAM.

  ![](https://i.imgur.com/2avghcv.png)
  ![](https://i.imgur.com/5XGrnCe.png?1)

### Disque électronique

* Le <ins>SSD (*Solid-State Drive*)</ins> ou *disque électronique* est un type de stockage long-terme plus récent et plus rapide que le HDD.  
  Il ne comportent aucune pièce mobile: à la place, il utilise des transistors à grille flottante (*floating gates transistors*) qui stockent des bits en piégeant ou en retirant les charges électriques dans ses structures internes.

  ![](https://i.imgur.com/Spm8UQ6.png)

* On considère généralement la mémoire des ordinateurs comme étant permanente, bien qu'elle se dégrade en réalité assez rapidement. La chaleur finit par démagnétiser les disques durs, dégrader le colorant des supports optiques, et provoquer des fuites de charge dans les grilles flottantes. Les SSD ont également une faiblesse supplémentaire: l'écriture répétée sur les transistors à grille flottante les corrode, ce qui finit par les rendre inutilisables — leur espérance de vie actuelle est de 10 ans.

---

## Composants externes

Les composants externes sont également appelés *périphériques*.
- pour les périphériques d'entrée, on trouve notamment: le clavier, la souris, le stylet optique, le scanner, la caméra
- pour les périphériques de sortie: l'écran, l'imprimante, les enceintes
- et les périphériques d'entrée/sortie: le disque dur externe, la clé usb

### Lecteur optique

* Un *lecteur optique*, comme le DVD et le Blu-ray, utilise des disques rotatifs (comme un disque dur magnétique) mais avec un revêtement réfléchissant.
  Les bits sont codés sous forme de points clairs et foncés à l'aide d'un colorant qui peut être lu par un laser.

  Bien que les supports de stockage optiques soient bon marché et amovibles, ils ont des latences encore plus lentes que le stockage magnétique et une capacité plus faible.

### Alimentation

* Une *alimentation* est un dispositif qui convertit le courant alternatif venant de la prise électrique (120v, 240v) en courant continu.

* Il protège également l'ordinateur des fluctuations de tension provenant de la source d'alimentation. Les ordinateurs de bureau et les serveurs sont plus vulnérables aux fluctuations de puissance que les ordinateurs portables, qui ont une batterie interne.

  ![](https://i.imgur.com/oXI9cIy.png)

---

## Connectique

### Bus

* Aux débuts de l'informatique, les composants comme le CPU ou la RAM n'étaient pas contenu sur un même circuit intégré mais plutôt dans des armoires (*racks*) individuelles. Les données voyageaient d'une armoire à l'autre via un ensemble de fils appelée une *barre-bus* (*bus bar*), qui devint plus tard juste un *bus*.

* Aujourd'hui, un bus désigne un groupe de fils électriques (*lanes*) qui transportent un signal.

  ![](https://i.imgur.com/I202Jvq.jpg?1)

* Le bus (du latin *omnibus*, à tous) est partagé entre plusieurs composants d’un système numérique.

  On distingue généralement un bus
  * d’une *liaison point à point*, qui ne concerne que deux composants qui en ont l’usage exclusif
  * et d’un *réseau*, qui implique des participants indépendants entre eux, c’est-à-dire pouvant fonctionner de manière autonome, et qui comprend plusieurs canaux permettant des communications simultanées

#### Série vs parallèle

* Il y a deux grands types de bus:

  * le <ins>bus en série</ins>: transmet les données sur un seul fil — chaque bit suit le précédent.  
  * le <ins>bus en parallèle</ins>: transmet les données sur plusieurs fils en parallèle.

  ![](https://i.imgur.com/B0tiE1im.png)

* Historiquement, la transmission en série a été la première technologie utilisée.  
  Puis est venu le parallèle, qui permettait d'augmenter la vitesse de transmission en envoyant plusieurs données en même temps. 

  Avec les années, et avec l'amélioration de l'électronique, la tendance s'est de nouveau inversée vers la transmission en série:
  pour une transmission en parallèle, si on veut garder l'ordre des bits, alors toutes les données doivent arriver à destination avant que d'autres puissent être envoyées; et si tous les canaux ne sont pas exactement synchronisés, alors la transmission doit ralentir pour le rester. La vitesse à laquelle chaque bit transite s'étant accéléré, et parce que (contrairement à la transmission en série) la vitesse à laquelle le parallèle peut fonctionner est limitée, la communication en série a désormais remplacé la communication en parallèle pour la plupart des bus dans les ordinateurs plus récents, y compris pour les bus du CPU — ce qui permet une vitesse plus élevée et nécessite moins de fils.

  ![](https://i.imgur.com/pusf7tDm.png)

#### Traces

* Les lignes en cuivre imprimées directement sur la carte mère sont appelés des *traces*.

  ![](https://i.imgur.com/X7dEuXam.png)

  Des *méandres* (*meanders*) sont utilisées, c'est à dire des lignes ondulées et non des lignes allant directement d'un point A à B, pour aligner le temps des signaux: ils doivent arriver en même temps et pour ce faire les traces doivent avoir la même longueur. [When are meanders necessary?](https://electronics.stackexchange.com/questions/180349/when-are-meanders-necessary-and-how-to-calculate-timing-differences)

* Un bus a pour support physique des traces. Outre l'aspect physique, permettant de faire transiter les informations, un bus spécifie les voltages utilisés et comment les données doivent être transmises quand on l'utilise.

  ![](https://i.imgur.com/wp6QqGt.png)

### Interfaces

* Quand on parle de connexions physiques, les termes *port* et *interface* sont interchangeable.  
  Une *interface* ou *port* est un point d'entrée ou sortie d'un bus.

  On peut dire qu'un ordinateur a une interface ou un port USB.  
  On dit d'un disque dur possédant une interface SATA, qu'il s'agit d'un disque dur SATA.  
  [Bus Interface in Microprocessor](https://www.eeeguide.com/bus-interface-in-microprocessor/)

* Parmis les interfaces les plus courantes pour les périphériques de stockage, on trouve:

  * <ins>IDE (Integrated Disks Electronics)</ins>  
    Parfois appelé PATA (Parallel Advanced Technology Attachment)  
    Très populaire pour le grand public dans les années 80, IDE offrait une bonne performance pour un prix moindre. De nombreuses améliorations ont été apportées après son introduction, de sorte qu'il est parfois appelé Enhanced IDE. On peut trouver ce type d'interface sur les anciennes machines (< 2003)

  * <ins>SATA (Serial ATA)</ins>  
    Est une évolution du PATA, il est moins cher et plus rapide. SATA est une connection en série, tandis qu'IDE était parallèle. Les périphériques de stockage récents auront pratiquement toujours des interfaces SATA.

  * <ins>SCSI (Small Computer System Interface)</ins>, lire "scuzzy"
    Est plus rapide et moins gourmand en CPU, mais plus cher en prix. Ils sont généralement utilisés par des serveurs ou des machines ayant besoin de performance. Au début, SCSI était parallèle mais est depuis passé aux transmissions en série.

  * <ins>PCIe (Peripheral Component Interconnect Express)</ins>  
    Le GPU, la carte son, la carte réseau et certains périphérques de stockage utilisent PCIe. PICEe n'est pas spécialement conçu pour les périphériques de stockage, mais permet de dépasser le plafond de 600MB/s de SATA 3.0, ainsi les fabricants utilisent parfois PCIe sur des SSDs.  
    NVMe (Non-Volatile Memory Express) est un protocole de transfert qui a été spécialement conçu pour un accès ultra-rapide aux SSD PICe.

  * <ins>USB (Universal Serial Bus)</ins>  
    Est un standard qui été développé pour rendre la connexion de périphériques plus facile: éliminer les autres types de connecteurs, rendre les périphériques plus faciles à configurer et fournir des taux de transfert rapides. Certains petits appareils peuvent également être alimentés directement par le port USB.

    | Version | Année | Débit
    |---      |---    |---
    | USB 1.0 | 1996  | 1.5 Mbit/s
    | USB 1.1 | 1998  | 12 Mbit/s
    | USB 2.0 | 2000  | 480 Mbit/s
    | USB 3.0 | 2008  | 5 Gbit/s
    | USB 3.1 | 2013  | 10 Gbit/s
    | USB 3.2 | 2017  | 20 Gbit/s
    | USB 4   | 2019  | 40 Gbit/s

  [PCIe vs SATA vs USB – Storage Interfaces Explained](https://www.unbxtech.com/2019/03/pcie-sata-usb-interfaces-explained.html)

### Prises

* Pour connecter un périphérique à l'ordinateur, il faut brancher
  une prise femelle à une prise mâle de même type / même standard

  * Un *port* est une prise femelle

    ![](https://i.imgur.com/TZgLRJnl.png)

  * Un *connecteur* est une prise mâle

    ![](https://i.imgur.com/vSoeN8Kl.png)

### Standards

* Il existe tout un tas de connecteurs

  - Le plus courant est le connecteur **USB** (*Universal Serial Bus*).  
    Il en existe différentes variantes:

    ![](https://i.imgur.com/6pTEvBw.png)

  - **FireWire** est un connecteur spécialisé conçu par Apple mais il n'a jamais vraiment décollé.  
    Aujourd'hui, l'utilisation de FireWire est rare.

    ![](https://i.imgur.com/zrFcicl.png)

  - **VGA** est un ancien connecteur, qui ne peut prendre en charge que des écrans à faible résolution (640x480). On ne trouve donc pas de connecteurs VGA sur les équipements modernes

    ![](https://i.imgur.com/ZNNrIzM.png)

  - **DVI** est une norme encore plus ancienne mais qu'on peut encore trouver aujourd'hui. Les connecteurs DVI prennent en charge la vidéo HD — une résolution jusqu'à 1080p

    ![](https://i.imgur.com/J6QI5QJ.png)

  - **HDMI** est une norme qui a la particularité de transporter de l'audio et vidéo sur le même câble, elle est couramment utilisée pour connecter les ordinateurs et téléviseurs ou moniteurs.

    ![](https://i.imgur.com/bHhHZsO.png)

  - **DisplayPort** prend en charge la vidéo à très haute résolution, jusqu'à 5K et au-delà.

    ![](https://i.imgur.com/PyTxqvH.png)

  - Les moniteurs modernes peuvent également être connectés à l'aide de connecteurs USB-C. Ils peuvent fonctionner aux résolutions maximales disponibles aujourd'hui et envoyer de l'audio, de la vidéo et de l'alimentation sur le même câble si utilisés avec la norme Thunderbolt.

    **Thunderbolt** est une norme d'interface matérielle conçue par Intel, qui permet d'envoyer des données et de l'alimentation sur le même câble. Thunderbolt utilise les connecteurs existants: les deux premières versions de Thunderbolt utilisaient des connecteurs mini DisplayPort, et les versions plus récentes (Thunderbolt 3 et 4) utilisent des connecteurs USB-C.

  [Guide visuel des ports et connecteurs](https://www.dell.com/support/kbdoc/fr-fr/000132029/a-guide-to-the-external-ports-and-connectors-on-a-dell-computer)

### Contrôleur d'interface

* Certaines interfaces peuvent accepter plusieurs modes de fonctionnement. Dans ce cas, elles disposent d'un contrôleur, une puce qui permet de configurer l'interface pour envoyer ou recevoir les packets dans le bon format. Par exemple, toute interface réseau ISDN PRI a un contrôleur qui lui permet de fonctionner soit pour du T-carrier (américain) ou E-carrier (européen). Les interfaces Ethernet ou plain Serial n'ont pas de propriété configurables similaires, et n'ont donc pas de contrôleur.

[Video: Dissection d'un ordinateur (anglais)](https://www.youtube.com/watch?v=d86ws7mQYIg)