---
title: Redundant Array of Independent Disks (RAID)
category: Linux
---

## Théorie

* Une métrique intéressante pour un disque est le <ins>temps moyen de défaillance</ins>, *Mean Time Between Failures* (MTBF).  
  Elle indique la fiabilité attendue des disques durs dans un environnement avec de nombreux lecteurs.
  Par exemple pour une MTBF de 1.25 millions d'heures, soit environ 135 ans: si vous avez 135 disques, vous pouvez vous attendre à une panne de lecteur une fois par an.

  Dans un environnement de stockage avec un grand nombre de disques, il est donc quasimment certain que des défaillances de disques devront être gérées, et des disques de rechange doivent être préparés à l'avance. Cela souligne également l'importance des techniques de redondance des unités de disque, tel que le RAID (*Redundant Array of Independent Disks*).

* RAID consiste à placer plusieurs disques durs sur un même serveur, et sauvegarder les données écrites avec redondance: si un disque est endommagé, il est toujours possible de récupérer les données sur un autre disque. Cela permet d'une part de se protéger des pertes de données en cas de panne d'un des disques durs, et peut permettre d'autre part de gagner en performances car plusieurs opérations d'entrée-sortie peuvent être effectuées en même temps.

### RAID0

* Un RAID0, ou *stripped array*, est un groupe de disque que Linux va considèrer comme une seule zone de stockage: l'espace total utilisable est égal à la somme de tous les périphérique. Par exemple, on peut prendre 2 disques de 1T et les coller ensemble pour obtenir un seul stockage de 2T. Ce type de RAID est risqué à utiliser car si un disque tombe en panne, les données de l'ensemble du RAID son perdues. Le niveau 0 n'est pas redondant, les autres niveaux le sont.

### RAID1

* Un RAID1, ou *mirrored array*, consiste à répéter les mêmes données sur tous les disques. Par exemple, si on a 3 disques dans un RAID, lorsqu'on écrit un fichier sur ce RAID, le fichier est cloné sur les 3 disques.

### RAID5

* Un RAID5, ou *distributed parity*, utilise une technique connue sous le nom de *parité*. La parité est une information supplémentaire calculée et stockée avec les données que l'utilisateur souhaite écrire sur le disque. Cette information peut être utilisée pour vérifier l'intégrité des données stockées et pour calculer les données perdues si une partie des données ne peut pas être lue. Un RAID5 nécessite au minimum 3 disque.

  Pour comprendre le principe: imaginons une équation telle que "9 = X + 4." X est une donnée inconnue qui a été précédemment stockée sur le disque 1 qui est tombé en panne. Le 4 est une donnée stockée sur le disque 2, et le 9 est une donnée de parité stockée sur le disque 3, calculée au préalable à des fins de redondance. En résolvant X, on peut reconsister les données perdues — 5.

  Cela permet d'avoir une redondance sans stocker une copie complète des données, et ainsi d'économiser de l'espace disque. En pratique, RAID5 utilise la fonction mathématique "XOR".

### RAID6

* Un RAID6, ou *dual parity*, est similaire à RAID5 mais utilise deux disques au lieu d'un seul pour la parité. Cela permet de supporter la perte de deux disque. Un RAID6 nécessite au minimum 4 disques.
    
  Avec RAID5, en cas de perte d'un disque, le temps nécessaire pour reconstituer les données manquantes n'est pas négligeable — pour un disque de 1TB, une dizaine d’heures. De plus, lorsqu'un disque vient à défaillir les disques restants sont plus fortemment sollicités, et il y a donc de plus grandes chances de perdre un second disque dès lors qu'un premier vient de lâcher. Un RAID6 offre une plus grande redondance au détriment de l'espace de stockage.

### RAID 10

* Les niveaux de RAID combinés sont l'association de deux niveaux. Un RAID 10, ou *1 plus 0*, est la combinaison du niveau 0 et 1.

  Par exemple, dans le niveau 0 on peut avoir 4 disques de 1T pour former un espace de 4T. Et dans le niveau 1, peut importe le nombre de disques, on aura toujours au final l'espace d'un seul disque, 1T.

  Avec un RAID 10: on peut créer un miroir contenant 2 disques d'1T (soit un espace d'1T) accolé à un deuxième miroir de 2 disques d'1T, ce qui nous donne au donne 2T d'espace disque utilisable.

  ![](https://i.imgur.com/1V9RyfK.png)


---

## Créer un RAID0

* Pour créer un RAID, on utilise MDA-DM (pour *multiple devices administration* - *Mirror Disk*):

  ``` bash
  sudo mdadm --create /dev/md0 --level=0 --raid-devices=3 /dev/vd{c,d,e}
  ```

  On a ainsi crée un fichier virtuel /dev/md0 pour accéder à un RAID0 contenant 3 disques — vdc, vdd et vde

* Pour créer un système de fichier dessus:

  ``` bash
  sudo mkfs.ext4 /dev/md0
  ```

## Stopper un RAID

* Pour stoper ou déactiver un RAID:

  ``` bash
  sudo mdadm --stop /dev/md0
  ```

* Quand Linux démarre, il analyse le superblock de tous les périphériques et détermine s'il contient des informations indiquant qu'il appartient à un RAID. Si c'est le cas, les périphériques associés seront automatiquement réassemblés dans un RAID, à un emplacement tel que /dev/md{1-7}

  Si on veut éviter ça, il faut effacer les données du superblock:


  ``` bash
  sudo mdadm --zero-superblock /dev/vd{c,d,e}
  ```

## Définir des disques de secours

* Si on crée un RAID1 avec 2 disques et qu'un des disques tombe en panne, l'autre fonctionne toujours et les données sont toujours là. Si par contre, celui-ci tombe en panne, toutes les données seront défintivement perdues.

  Pour éviter ce genre de situation, on peut préparer des disques de secours (*spare disks*). Ces disques ne sont pas utilisés, à moins qu'un disque tombe en panne: dans ce cas, le système d'exploitation prend automatiquement un disque de secours et le rajoute au RAID.

  ``` bash
  sudo mdadm
    --create /dev/dm0 --level=1
    --raid-devices=2 /dev/vdc /dev/vdd
    --space-devices=1 /dev/vde
  ```

## Ajouter un disque

* Pour ajouter un disque à un RAID existant:

  ``` bash
  sudo mdadm --manage /dev/dm0 --add /dev/vde
  ```

## Retirer un disque

* Pour retirer un disque d'un RAID:

  ``` bash
  sudo mdadm --manage /dev/md0 --remove /dev/vde
  ```

## Lister les RAID

* Pour afficher le statut des RAID sur le système:

  ``` bash
  $ cat /proc/mdstat
  Personalities: [raid0] [raid1]
  md0 : active raid1 vde[2](S) vdd[1] vdc[0]
        5237760 blocks super 1.2 [2/2] [UU]

  unused devices: <none>
  ```

  On peut voir ici les "personnalités" RAID — ce qui est une manière de dire les "types de RAID" configurées. On peut notamment voir le nom du périphérique RAID (md0), le type de RAID actif et les disques actuellement dans ce RAID. On peut également voir les disques inutilisés — dans notre cas, il n'y en a pas.