---
title: Boot
category: IT
---

## Partition

* Un disque dur (ou SSD) peut être divisé en segments, appelés des *partitions*. Les différentes partitions agiront comme s'il s'agissait de disques physiquement distincts: tout ce qu'il se passe sur la partition 1 n'impactera pas la partition 2 et inversement.

  1. Cela peut permettre d'avoir plusieurs systèmes d'exploitation installés sur un même disque.

  2. Cela permet de tirer parti de la géométrie du disque: les pistes extérieures ont plus de secteurs, accéder aux données demande moins de mouvement à la tête de lecture/écriture, et le taux de transfert est donc plus rapide.  
    Les disques durs numérotent généralement les pistes en commençant par le bord extérieur et en continuant vers l'intérieur, le début du disque visible au niveau applicatif correspondra physiquement aux pistes les plus extérieures — qui sont plus rapides.  
    Pour plus de performances, on peut créer une partition au début du disque, qui contiendra le système d'exploitation et les librairies, et utiliser la partition suivante pour stocker les fichiers utilisateurs. C'est qu'on appelle la méthode de *short-stroking*.

  3. De nombreux fabricant incluent des partitions de récupération qui sont cachées et contiennent le système d'exploitation, les pilotes et les applications pré-installés — ce qui permet de faire une remise à zéro du système si nécessaire.

  4. Des partitions peuvent être utilisées pour un usage spécifique, séparé de l'exécution du système d'exploitation.
    Par exemple sous Windows, Windows Recovery Environment (Windows RE) est une partition ajoutée juste après la partition Windows principale (C:) et qui contient des outils de récupération. [Partitions Windows](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/hard-drives-and-partitions?view=windows-11)

      ![](https://i.imgur.com/RneCej8l.png)

## Table de partition

* La définition des partitions, notamment l'emplacement du début et fin de la partition, est stockée dans la *table de partition*.  
  Le format de cette table est définit par le fabricant:
  - <ins>Master Boot Record (MBR)</ins> a été le premier format de table — par Intel
  - <ins>GUID Partition Table (GPT)</ins> est le nouveau format

### MBR

* La table de partition MBR est stockée sur 64 octets.  
* Chaque partition est stockée sur 16 octets, on aura donc au maximum 4 partitions.

  ![](https://i.imgur.com/vCsjien.png)

* Les champs des partitions sont les suivants — stockés au format little-endian:

  ![](https://i.imgur.com/8bQuzf5.png)

  | Champ | Taille   | Info
  |---          |---         |---
  | Flag     | 1 octet | 0x80 - bootable<br> 0x00 - non-bootable<br> 0x01-0x07 - Invalid
  | Adresse CHS de début | 4 octets | ![](https://i.imgur.com/MDB5LHe.png)
  | Type de partition | 1 octet | ![](https://i.imgur.com/k6CfADV.png)
  | Adresse CHS de fin | 4 octets |
  | Adresse LBA de début | 4 octets |
  | Nombre de secteurs | 4 octets |

* Les adresses de début et de fin d'une partition sont stockées sur 4 octets (32 bits):  
  une partition aura donc une taille maximale de 2TiB (2<sup>32</sup> * 512).

[Wikipedia MBR](https://en.wikipedia.org/wiki/Master_boot_record)

### GPT

* La table de partition GPT fait au moins 16 384 octets. Sur un disque avec des secteurs de 512 octets, elle occupera donc au moins 32 secteurs; ou pour des secteurs de 4 096 octets, au moins 4 secteurs.  
* Chaque partition est stockée sur 128 octets, on peut donc avoir 128 partitions.

* Les champs des partitions sont les suivants:

  ![](https://i.imgur.com/KNskS2B.png)

  | Champ | Taille | Info
  |--- |--- |--
  | Type de partition | 16 octets | Mixed endian
  | GUID              | 16 octets | Mixed endian
  | Adresse LBA de début | 8 octets | Little endian
  | Adresse LBA de fin   | 8 octets | Little endian
  | Attributs | 8 octets
  | Nom de partition | 72 octets | UTF-16 LE code units (= 36 caractères)

* GPT utilise des adresses sur 8 octets (64 bits) — GPT prend donc en charge des partitions plus grandes que MBR: jusqu'à 2<sup>64</sup> secteurs, soit 8ZiB pour des secteurs de 512 octets, ou 64ZiB pour des secteurs de 4KiB. Notons que GPT n'utilise plus les adresses CHS mais uniquement LBA.

[Wikipedia GPT](https://en.wikipedia.org/wiki/GUID_Partition_Table#Partition_entries_(LBA_2%E2%80%9333)) 

---

## Firmware

* Le *hardware* est le matériel, le *software* est le logiciel, et le *firmware* (ou *micrologiciel* en français) est un logiciel qu'on retrouve non pas sur le disque dur mais sur une mémoire flash directement soudée sur la carte mère. Son rôle est de de gérer les tâches de bas niveau pour initialiser le système lors de sa mise sous tension.

  Au départ, le firmware était stocké dans la mémoire morte (ROM), directement écrite par le fabricant, qui rendait la mise à jour du firmware impossible; la ROM a depuis été remplacée par une mémoire flash (EPROM).

## BIOS

* Historiquement, le premier firmware était appelé le BIOS (*Basic Input/Output Service*), qui était le firmware utilisé pour les processeurs 16 bits et ne disposait que d'1M d'espace d'adressage. Avec l'évolution de la technologie, ces spécifications sont rapidement devenues insuffisantes: à la place, Intel a développé l'Extensible Firmware Interface (EFI), qui a ensuite été dépréciée en 2005 pour l'Unified Extensible Firmware Interface (UEFI).

  L'UEFI permet entre autres l'utilisation de la souris, des animations graphiques et chamboule la séquence de démarrage et structure des disques dur.
  Elle fonctionne à la fois en mode 32 et 64 bits, et peut prendre en charge des tailles de mémoire vive plus importantes que le BIOS. L'UEFI peut également prendre en charge les disques durs de plus de 2T, gère l'énergie et la chaleur, et simplifie l'overclocking des processeurs.

* Les BIOS Legacy, EFI et UEFI sont différents types de firmware, logiciel qui contrôle le processus de démarrage de l'ordinateur, ce qui signifie que les ordinateurs basés sur EFI démarrent différemment des ordinateurs basés sur BIOS. Malgré toutes ses révisions, aujourd'hui encore la plupart des fabricants utilisent le terme "BIOS" pour désigner leurs EFI.

## Power-on self-test

* Lorsque l’ordinateur est mis sous tension, le firmware est lancé. La première opération effectuée est l'opération POST (*power-on self-test*): le firmware informe tous les composants connectés d'effectuer un auto-test et faire leur rapport. [Opération POST](https://www.dell.com/support/kbdoc/fr-fr/000128270/proc%C3%A9dures-post-et-de-d%C3%A9marrage)

* Si un élément est défectueux (par exemple une barrette de mémoire), alors l’ordinateur se met à beeper et la séquence de beep permet de déterminer quel composant pose problème.

## Séquence d'amorçage

* Si l'opération POST s'est bien passée, alors le firmware cherche quel périphérique de stockage charger. Il lit la *séquence d'amorçage*, qui est la liste des périphériques de stockage à tester — une configuration enregistrée dans la CMOS.

* Un par un, le firmware vérifie si le périphérique est disponible et contient un *bootloader* (*chargeur de démarrage* ou *chargeur d'amorçage* en français). Un espace de stockage contenant un bootloader est dit *amorçable* (ou *bootable*). Le firmware charge le premier périphérique amorçable qu'il trouve.

* Typiquement, la seule chose qu'on voit du firmware est le logo du fabricant, affiché au moment du démarrage. Un raccourci clavier (qui dépend du fabricant), à presser au moment où le logo s'affiche, permet de voir et modifier les configurations du firmware — avec notamment la séquence d'amorçage.

  [Modifier l'ordre d'amorçage](https://doc.ubuntu-fr.org/tutoriel/modifier_ordre_amorcage_du_bios) 

## Bootloader

* Le *bootloader* est le code qui se trouve au tout début d'un périphérique de stockage amorçable. Le format et les informations qu'il doit contenir dépend du firmware utilisé.

### BIOS Legacy

* Le BIOS Legacy utilise le format MBR.  
  Les 512 premiers octets du disque dur, donc le premier secteur, contiennent la routine BOOT (code exécutable) suivit de la table de partition MBR.

  ![](https://i.imgur.com/7NAY81q.png)

  <ins>Format Legacy MBR</ins>:

  ![](https://i.imgur.com/Lth7NZz.png)

  [MBR Forensics](https://nixhacker.com/explaining-the-magic-of-mbr-and-its/)

### BIOS EFI

* Le BIOS EFI utilise le format GPT.  
  Le premier secteur (LBA 0) contient un *MBR de protection* (*protective MBR*, PMBR), qui est gardé pour maintenir la compatiblité avec les outils existants qui ne comprennent pas les structures de partition GPT. Le deuxième secteur (LBA 1) contient les entêtes GPT. Une des ces entêtes contient un pointeur vers la table de partition, qui typiquement se situe juste après (LBA 2-33 pour des secteurs de 512 octets)

* Un premier point notable, qui diffère de MBR, est qu'un backup des entêtes et table de partition GPT est sauvegardé à la fin du disque, et peut être utilisé en cas de problèmes avec la première copie.

* Le deuxième point notable, est l'utilisation d'une partition spéciale: la *partition système EFI* (*EFI System Partition*, ESP) — une partition de type EF00. Bien qu'elle ne soit pas indispensable pour l'utilisation de GPT, lorsque cette partition existe et contient un fichier exécutable .efi, alors cet exécutable est utilisé à la place du bootloader codé en dur dans le MBR. On obtient ainsi un système beaucoup plus souple.

  ![](https://i.imgur.com/vhfDXmy.png)

  <ins>Format UEFI</ins>:

  ![](https://i.imgur.com/E4GoeMr.png)

  [Spécifications UEFI](https://uefi.org/sites/default/files/resources/UEFI_Spec_2_8_final.pdf)  
  [On the Forensic Trail - Guid Partition Table (GPT)](http://www.invoke-ir.com/2015/06/ontheforensictrail-part3.html)

## Options UEFI notables

* <ins>Legacy mode</ins>  
  La plupart des EFI des ordinateurs x86 et x86-64 incluent un *Compatibility Support Module* (CSM), qui permet à l'EFI de démarrer des systèmes d'exploitation utilisant les anciens mécanismes de démarrage de type BIOS. Ce qui peut être pratique, car permet une rétrocompatibilité, mais crée aussi des complications. En particulier, il est facile de démarrer accidentiellement l'installation Linux en mode BIOS/CSM/Legacy: ce qui fonctionnera correctement si Linux est votre seul système d'exploitation, mais peut créer des problème si vous essayez un dual-boot avec Windows en mode EFI.

  Si vous activez l’UEFI et que vos partitions sont en MBR, vous ne pourrez plus démarrer votre système d'exploitation — de même que si vous essayez de lancer avec un BIOS Legacy un disque formatté en GPT.

* <ins>Secure Boot</ins>  
  Secure Boot est une fonctionnalité optionnelle de UEFI, conçue pour minimiser le risque qu'un ordinateur soit infecté par un *boot kit*. Un boot kit est un type de logiciel malveillant qui infecte le bootloader de l'ordinateur; ce type de virus peut être particulièrement difficile à détecter et à supprimer, ce qui fait de leur blocage une priorité.

  Il est possible pour un ordinateur EFI de ne pas supporter Secure Boot, et il est possible de désactiver Secure Boot même sur les ordinateurs EFI x86-64 qui le supportent. Fedora, OpenSUSE et Ubuntu supportent officiellement Secure Boot et il ne devrait donc pas être nécessaire de le désactiver.

* <ins>Fast Boot</ins>  
  Cette fonctionnalité permet d'accélérer le processus de démarrage en prenant des raccourcis dans l'initialisation du matériel, ce qui généralement ne pose aucun problème mais peut laisser le matériel USB non initialisé, et ainsi rendre impossible le démarrage à partir d'une clé USB ou périphérique similaire.

  La désactivation du Fast Boot peut être utile voire nécessaire si vous avez des difficultés à faire démarrer l'installateur Linux. Cette fonctionnalité porte parfois un autre nom: dans certains cas, il faut activer le support USB plutôt que de désactiver le démarrage rapide.

[Linux on UEFI: A Quick Installation Guide](https://www.rodsbooks.com/linux-uefi/)
