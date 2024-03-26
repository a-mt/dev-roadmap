---
title: Bootloader
category: Linux, Boot
---

## Bootloaders Linux

* La tâche principale du bootloader est de chercher l'OS, le charger dans la mémoire RAM et l'exécuter.  
  Cette tâche est généralement divisée en deux étapes:

  - un premier bootloader, appelé le *first stage bootloader* (ou parfois *mini-bootloader* voire *boot manager*), présente un menu d'options et/ou permet aux utilisateurs de taper des commandes pour choisir le système d'exploitation à démarrer. Il permet à l'utilisateur d'interragir avec certaines parties du système. Ce bootloader est présent dans le MBR ou, pour les systèmes plus récents, est un fichier .efi exécutable présent dans la partition EFI.

  - une fois le kernel choisit, un second bootloader, appelé le *second stage bootloader*, prend le relai et s'occupe de charger ce kernel.
    Les programmes de boot sous Linux (LILO, GRUB Legacy ou GRUB2) s'occupent des deux tâches, avec un chargement en deux temps.

  [Boot Loaders vs. Boot Managers](https://www.rodsbooks.com/efi-bootloaders/principles.html)

## initrd

* Pour démarrer le noyau Linux, ce dernier a besoin de certains drivers, qui ne ne sont pas encore chargés.  
  Pour contourner ce problème, la première chose qu'un bootloader Linux fait n'est pas charger le kernel mais *initrd*

  Historiquement, initrd était un disque virtuel RAM (*RAM disk*, rd): une image disque chargeant en mémoire les drivers dont le noyau à besoin pour démarrer. Une image de disque n'est pas aussi performante qu'un système de fichier, raison pour laquelle les développeurs Linux ont remplacé le disque RAM par un système de fichiers RAM — nommé initramfs (*initial RAM filesystem*).
  Que ce soit un disque virtuel ou un système de fichier, il est toujours désigné sous le nom "initrd".

* Une fois initrd chargé, alors le kernel est chargé en mémoire et exécuté.

## Fichiers

On peut trouver les fichiers utilisés lors du boot dans le système de répertoire virtuel:

  * Les différents noyaux et initrd sont placés à la racine de `/boot`  
    Note: les fichiers vmlinux sont les noyaux Linux, et les fichiers vmlinuz sont les noyaux compressés. C'est ce qu'on appelle le format kernel, Zimage, big zimage ou encore bzimage

  * UEFI utilise un mini-bootloader (gestionnaire de démarrage) pour configurer le programme de démarrage à utiliser. Le programme de démarrage se trouve dans la partition système (Extensible Firmware Interface [EFI] System Partition [ESP]) et est montée dans le répertoire `/boot/efi`.

  * Si le système a été booté par EFI, `/sys/firmware/efi` sera présent

---

## LILO

* LILO (*Linux Loader*) a été le premier bootloader majeur à être utilisé. Il est simple, et ne supporte que le BIOS Legacy, mais est capable de dual-booting — autrement dit, il rend possible d'avoir plusieurs systèmes d'exploitation installés sur un même ordinateur, et de choisir au moment du boot celui qu'on veut lancer.

* Lorsque des modifications de configurations sont effectuées, LILO se réinstalle avec les nouvelles informations: ainsi, LILO n'a pas besoin de connaître le système de fichier au démarrage. L'inconvénient c'est qu'à chaque modification des configurations, il faut réinstaller LILO.  

* Il s'agit d'une vieille technologie, qu'on croise rarement aujourd'hui.

---

## GRUB Legacy

* Il est peu courant de trouver la première version de GRUB (*Grand Unified Bootloader* Legacy) d'installée, mais ça arrive.  
  Si le GRUB Legacy bootloader doit être réinstallé, on peut utiliser la commande suivante pour une installation sur le MBR du premier disque:

  ```
  grub-install '(hd0)'
  ```

* GRUB est un projet GNU qui avait initialement pour but de créer un chargeur d'amorçage capable d'amorcer différent noyaux, différentes versions, sur une variété de systèmes. Lorsque le système démarre avec GRUB, un menu permet de sélectionner le noyau à charger:

  ![](https://i.imgur.com/4QwC5C9.png)

  Le titre par défaut est sélectionné et un compte à rebours est lancé.  
  Si l'une des touches (sauf Entrée) est appuyée, alors le décompte s'arrête et un titre doit être choisit manuellement pour démarrer.

  Les touches fléchées haut et bas permettent de choisir entre les titres disponibles.  
  La touche Entrée de démarrer sur le choix sélectionné.  
  La touche "e" permet d'éditer les options de noyau.  
  La touche "c" de lancer la ligne de commande GRUB

* GRUB fournit une interface de ligne de commande, qui permet à un administrateur de démarrer une image noyau arbitraire ou d'ajouter des paramètres au noyau (par exemple pour démarrer en mode maintenance ou encore activer ou désactiver du matériel) — et ce sans que la configuration n'ait a être écrite sur le disque.

  ![](https://i.imgur.com/rrw2gTO.png)

* GRUB peut lire les systèmes de fichiers et détecter dynamiquement le matériel. Ainsi, plutôt que d'avoir à réinstaller le bootloader à chaque changement de configuration, il lit des fichiers de configuration.  

### /boot/grub/grub.conf

* La configuration de GRUB se trouve dans le fichier `/boot/grub/grub.conf`  
  Sur certaines distributions, un lien symbolique `/etc/grub.conf` est présent pour faciliter la recherche du fichier.

* Ce fichier contient

  - des **entrées**, qui est la liste des choix disponibles affichés par le bootloader.  
    Les entrées du GRUB Legacy sont définies par des directives globales, avec à minima: root, kernel et initrd.
    Ces directives définissent le système d'exploitation vers lequel démarrer ainsi que les options du noyau, indiquant comment démarrer le système d'exploitation.

    ```
    title Fedora (2.6.21-1.3194.fc7)
        root (hd0,0)
        kernel /vmlinuz-2.6.21-1.3194.fc7 ro root=/dev/VolGroup00/LogVol00 rhgb quiet
        initrd /initrd-2.6.21-1.3194.fc7.img
    ````

    ![](https://i.imgur.com/YzXUvx7.png)

    <ins>Convention de nommage des partitions</ins>:  
    Les disques sont référencés avec une syntaxe spécifique: le premier disque détecté est appelé hd0, le second hd1 et ainsi de suite. Les partitions sur les disques sont numérotées à partir de zéro: la première partition sur le premier disque est (hd0,0) ; la première partition sur le second disque (hd1,0) ; etc. GRUB ne fait pas de distinction entre les disques SATA et IDE

  * des **configurations**, qui permettent de modifier le comportement du bootloader

    ```
    default=0
    timeout=5
    slpashimage=(hd0,0)/grub/splash.xpm.gz
    hiddenmenu
    ```

    | Paramètre | Description
    |---        |---
    | `default` | Définit l'entrée sélectionnée par défault (0 pour la première entrée)
    | `timeout` | Nombre de secondes dont l'utilisateur dispose pour choisir une entrée autre que l'entrée par défaut. Si 0, le menu ne sera pas affiché
    | `hiddenmenu` | Ne pas afficher le menu de démarrage à l'utilisateur — l'entrée par défaut est sélectionnée automatiquement. Le délai d'attente s'applique tout de même et l'utilisateur peut afficher le menu en appuyant sur la touche Echap au bon moment.

    ![](https://i.imgur.com/A30QeUZl.png)

---

## GRUB2

* Est le bootloader le plus couramment utilisé.

* GRUB2 offre plusieurs avantages:
  - les modules sont chargés dynamiquement — ce qui rend possible de charger des modules depuis la ligne de commande GRUB
  - prise en charge les caractères non ASCII
  - possibilité de démarrer à partir de partitions dans un volume logique LVM ou RAID

### /boot/grub/grub.cfg

* L'emplacement du fichier de configuration GRUB2 n'est plus le même:
  - `/boot/grub2/grub.cfg` sous Fedora  
  - `/boot/grub/grub.cfg` sous Ubuntu

  Ce fichier de configuration est regénéré automatiquement à chaque fois qu'un fichier noyau est ajouté ou supprimé:
  là où GRUB Legacy prévoit que le fichier de configuration principal soit édité, GRUB2 s'attend à ce que toute personnalisation soit effectuée dans des fichiers de configuration séparés — et le contenu des fichiers est copié dans fichier grub.cfg quand une mise à jour est demandée.

* Pour mettre à jour le fichier .cfg:  
  - Pour Ubuntu:

    ```
    update-grub
    ```

  - Pour les autres distributions:

    ```
    grub-mkconfig > /loction/grub.cfg
    grub-mkconfig -o /loction/grub.cfg
    grub2-mkconfig > /loction/grub.cfg
    grub2-mkconfig -o /loction/grub.cfg
    ```

### /etc/default/grub

* Le fichier `/etc/default/grub` contient des configurations (appelées *keys*) qui gèrent l'apparence et le comportement du menu de démarrage.

  ``` bash
  $ sudo vim /etc/default/grub
  ```

  | Key | Description
  |---    |---
  | `GRUB_DEFAULT=0` | Entrée sélectionnée par défaut
  | `GRUB_TIMEOUT=10` | Délai d'attente avant de démarrer sur l'entrée par défaut
  | `GRUB_TIMEOUT_STYLE=hidden` | Masquer le menu GRUB
  | `GRUB_CMDLINE_LINUX` | Permet de passer des options au kernel

### /etc/grub.d

* `/etc/grub.d` contient les scripts qui seront utilisés (en respectant l'ordre de numérotation)
  pour créer le fichier grub.cfg. On trouve notamment:

  - <ins>05_debian_theme</ins>:  
    script pour gérer le thème en mode texte (fonds d'écran et couleurs)

  - <ins>10_linux</ins>:  
    contient le script de lancement du système

  - <ins>40_custom</ins>, <ins>41_custom</ins>:  
    permettent d'ajouter des entrées personnalisées à GRUB2.  
    La syntaxe pour ajouter une entrée au menu GRUB2 est différente de GRUB:

    ```
    menuentry 'Ubuntu, with Linux 5.4.0-67-generic'

      set root=(hd0, msdos1)
      linux /boot/vmlinuz-5.4.0-67-generic root=UUID=3b[...]
      initrd /boot/initrd.img-5.4.0-67-generic
    ```

    | Directive | Description
    |---        |---
    | `set root` | Définit le disque et la partition sur laquelle se trouve le kernel.<br><br> `set root='hd0, msdos1'` indique le premier disque et la première partition MBR (DOS)<br> `set root='hd1, gpt1'` indique le second disque et la première partition GPT<br> `set root='hd0,2'` indique le premier disque et la seconde partition
    | `linux`&nbsp;/&nbsp;`linux16`<br>`linuxefi` | Définit le kernel à charger et ses options
    | `initrd`<br>`initrdefi` | Définit l'emplacement d'initrd — qui peut être une image disque ou système de fichier RAM.

## Paramètres de boot

* Tout ce qui se situe après le path du fichier vmlinuz est une option.   
  Ces options dépendent de la distribution et de la version Linux.  
  Pour consulter la documentation des options de boot:

  ```
  man bootparam
  ```

  Toute option qui n'est pas comprise par le kernel sera passé à init (pid = 1), le premier processus lancé

  <ins>Exemples</ins>:

  ```
  linux /boot/vmlinuz-4.15.0-58-generic \
         root=UUID=5cec328b-bcd6-46d2-bcfa-8430257cd7a5 \
         ro find_preseed=/preseed.cfg auto noprompt \
         priority=critical locale=en_US quiet crashkernel=512M-:192M
  ```
  ```
  BOOT_IMAGE=/boot/vmlinuz-4.15.0-58-generic \
       root=UUID=5cec328b-bcd6-46d2-bcfa-8430257cd7a5 \
       ro find_preseed=/preseed.cfg auto noprompt \
       priority=critical locale=en_US quiet crashkernel=512M-:192M
  ```
  ```
  linux /boot/vmlinuz-5.19.0 \
    root=UUID=7ef4e747-afae-48e3-90b4-9be8be8d0258 \
    ro quiet
  ```
  ```
  linuxefi /boot/vmlinuz-5.2.9 \
    root=UUID=77461ee7-c34a-4c5f-b0bc-29f4feecc743 \
    ro crashkernel=auto rhgb quiet crashkernel=384M-:128M
  ```

* Fedora et Red Hat utilisent BLSFG (*Boot Loader Specification Configuration*), qui modifie l'emplacement de la ligne de commande kernel. Ces informations se trouvent dans <ins>/boot/grub2/grubenv</ins> ou <ins>/boot/loader/entries</ins>

* La ligne de commande avec laquelle le système a été lancée peut être consultée dans le fichier virtuel `/proc/cmdline`

  ```
  $ cat /proc/cmdline
  BOOT_IMAGE=(hd0,msdos2)/boot/vmlinuz-5.19.0 root=UUID=7f7221b8-60d8-41b9-b643-dfcc80527c37 ro rhgb quiet crashkernel=512M
  ```

---

## Mode Rescue

Si le bootloader est mal configuré et que le système d'exploitation ne démarre pas du tout:

1. Démarrer à partir d'une clé USB ou CD amorçable.  
   Au lieu d'une installation, lancer le Dépannage (Troubleshooting puis Rescue)

   ![](https://i.imgur.com/0V9yd1c.png)

   ![](https://i.imgur.com/955jmvL.png)

2. Choisir l'option 1: le mode rescue essayera de trouver l'installation Linux  
   et de monter le système de fichier trouvé dans le répertoire /mnt/sysroot

   ![](https://i.imgur.com/fHGEHzd.png)

3. Définir le système de fichier monté dans /mnt/sysroot comme répertoire racine

    ``` bash
    # chroot /mnt/sysroot
    ```

4. Regénérer le fichier de configuration Grub

    - Pour un système configuré pour démarrer via <ins>BIOS Legacy</ins>:  
      Pour rappel, lorsqu'un ordinateur démarre en mode BIOS Legacy, il recherche le bootloader au tout début du disque, il faut donc placer grub dans cette zone.  
      Ici, ce sera sur le disque sda (sous CentOS):

      ``` bash
      # lsblk
      NAME     MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
      ...
      sda        8:0    0    20G  0 disk  
      ├─sda1     8:1    0     1G  0 part  /boot
      ├─sda2     8:2    0     2G  0 part  [SWAP]
      └─sda3     8:3    0    17G  0 part  /
      sr0       11:0    1    10G  0 rom

      # grub2-install /dev/sda
      Installing for i386-pc platform.
      Installation finished. No error reported.
      #
      ```

    - Pour un système configuré pour démarrer via <ins>EFI ou UEFI</ins>:  
      Lorsqu'un ordinateur démarre par EFI, le système ne cherche pas le bootloader sur le premier secteur du disque, mais une partition de démarrage spéciale: une partition EFI.  
      Pour placer les fichiers du bootloader à l'endroit approprié (sous CentOS):

      ``` bash
      # dnf reinstall gtub2-efi grub2-efi-modules shim
      ```

5. Quitter le répertoire root

    ``` bash
    exit
    ```

6. Quitter le mode rescue (ce qui entrainera un redémarrage)

    ``` bash
    exit
    ```
