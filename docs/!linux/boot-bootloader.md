---
title: Bootloader
category: Linux, Boot
---

## Bootloaders Linux

* La tâche principale du bootloader est de chercher le noyau, le charger dans la mémoire RAM et l'exécuter.  
  Cette tâche est généralement divisée en deux étapes:

  - un premier bootloader, appelé le *first stage bootloader* (ou parfois *mini-bootloader* ou *boot manager*), présente un menu d'options et/ou permet aux utilisateurs de taper des commandes pour choisir le système d'exploitation à démarrer. Il permet à l'utilisateur d'interragir avec certaines parties du système. Ce bootloader est présent dans le MBR ou, pour les systèmes plus récents, est un fichier .efi exécutable présent dans la partition EFI.

  - une fois le kernel choisit, un second bootloader, appelé le *second stage bootloader*, prend le relai et s'occupe de charger ce kernel.
    Les programmes de boot sous Linux (LILO, GRUB Legacy ou GRUB2) s'occupent des deux tâches, avec un chargement en deux temps.

  [Boot Loaders vs. Boot Managers](https://www.rodsbooks.com/efi-bootloaders/principles.html)

## initrd

* Lorsque le noyau Linux est chargé, il a besoin de certains drivers, qui ne ne sont pas encore chargés.  
  Pour contourner ce problème, la première chose qu'un bootloader Linux fait n'est pas charger le kernel mais *initrd*

  Historiquement, initrd était un disque virtuel RAM (*RAM disk*, rd): une image disque chargeant en mémoire les drivers dont le noyau à besoin pour démarrer. Une image de disque n'est pas aussi performante qu'un système de fichier, raison pour laquelle les développeurs Linux ont remplacé le disque RAM par un système de fichiers RAM — nommé "initramfs" pour *initial RAM filesystem*.
  Que ce soit un disque virtuel ou un système de fichier, il est toujours désigné sous le nom "initrd".

* Une fois initrd chargé, alors le kernel est chargé en mémoire et exécuté.

## Fichiers

On peut trouver les fichiers utilisés lors du boot dans le système de répertoire virtuel:

  * Les différents noyaux et initrd sont placés à la racine de `/boot`  
    Note: les fichiers vmlinux sont les noyaux Linux, et les fichiers vmlinuz sont les noyaux compressés. C'est ce qu'on appelle le format kernel, Zimage, big zimage ou encore bzimage

  * Si la partition EFI existe, elle sera généralement montée sur `/boot/efi`

  * Si le système a été booté par efi, `/sys/firmware/efi` sera présent

---

## LILO (Linux Loader)

* LILO a été le premier bootloader majeur à être utilisé. Il est simple, et ne supporte que le BIOS Legacy, mais est capable de dual-booting — autrement dit, il rend possible d'avoir plusieurs systèmes d'exploitation installés sur un même ordinateur, et choisir au moment du boot celui qu'on veut lancer.

* Lorsque des modifications de configurations sont effectuées, LILO se réinstalle avec les nouvelles informations: ainsi, LILO n'a pas besoin de connaître le système de fichier au démarrage. L'inconvénient c'est qu'à chaque modification des configurations, il faut réinstaller LILO.  

* Il s'agit d'une vieille technologie, qu'on croise rarement aujourd'hui.

## GRUB (Grand Unified Bootloader) Legacy

* Il est peu courant de trouver la première version de GRUB (GRUB Legacy) d'installée, mais ça arrive.  
  Si le GRUB Legacy bootloader doit être réinstallé, on peut utiliser la commande suivante (pour une installation sur le MBR du premier disque):

  ```
  grub-install '(hd0)'
  ```

* GRUB est un projet GNU qui avait initialement pour but de créer un chargeur d'amorçage capable d'amorcer différent noyaux, différentes versions, sur une variété de systèmes. Lorsque le système démarre avec GRUB, un menu permet de sélectionner le noyau à charger:

  ![](https://i.imgur.com/4QwC5C9.png)

  Le titre par défaut est sélectionné et un compte à rebours est lancé.  
  Si l'une des touches (sauf Entrée) est appuyée, alors le décompte s'arrête et un titre doit être choisit manuellement pour démarrer. Les touches fléchées haut et bas permettent de choisir entre les titres disponibles, Entrée de démarrer sur l'entrée sélectionnée.

  La touche "e" permet d'éditer les options de noyau  
  La touche "c" pour lancer la ligne de commande GRUB

* GRUB fournit une interface de ligne de commande, qui permet à un administrateur de démarrer une image de noyau arbitraire ou passer des paramètres au noyau (par exemple pour démarrer en mode de maintenance ou pour activer ou désactiver certains matériels) et ce sans avoir besoin que la configuration ne soit écrite sur le disque.

  ![](https://i.imgur.com/rrw2gTO.png)

* GRUB peut lire les systèmes de fichiers et détecter dynamiquement le matériel. Ainsi, plutôt que de nécessiter une réinstallation à chaque changement de configuration, il lit des fichiers de configuration.  

### grub.conf

* La configuration de GRUB se trouve dans le fichier `/boot/grub/grub.conf`  
  Sur certaines distributions, il y a un lien symbolique `/etc/grub.conf` pour faciliter la recherche du fichier.

* Les entrées du GRUB Legacy sont définies par des directives globales, avec à minima: root, kernel et initrd.
  Ces directives définissent le système d'exploitation vers lequel démarrer ainsi que les options du noyau, indiquant comment démarrer le système d'exploitation.

  ![](https://i.imgur.com/YzXUvx7.png)

  Les disques sont référencés avec une syntaxe spécifique: le premier disque détecté est appelé hd0, le second hd1 et ainsi de suite. Les partitions sur les disques sont également numérotées à partir de zéro: la première partition sur le premier disque est (hd0,0) ; la première partition sur le second disque (hd1,0) ; etc. GRUB ne fait pas de distinction entre les disques SATA et IDE

* Outre les entrées du menu, on trouve également dans ce fichier les configurations du menu

  | Paramètre | Description
  |---        |---
  | `default` | Définit l'entrée sélectionnée par défault (0 pour la première entrée)
  | `timeout` | Nombre de secondes dont l'utilisateur dispose pour choisir une entrée autre que l'entrée par défaut. Si 0, le menu ne sera pas affiché
  | `hiddenmenu` | Ne pas afficher le menu de démarrage à l'utilisateur — l'entrée par défaut est sélectionnée automatiquement. Le délai d'attente s'applique tout de même et l'utilisateur peut afficher le menu en appuyant sur la touche Echap au bon moment.

  ![](https://i.imgur.com/A30QeUZl.png)

## GRUB2

* Est le bootloader le plus couramment utilisé.

* GRUB2 offre plusieurs avantages:
  - modules chargés dynamiquement — il est désormais possible de charger des modules depuis la ligne de commande GRUB
  - prise en charges des caractères non ASCII
  - possibilité de démarrer à partir de partitions dans un volume logique LVM ou RAID

### grub.cfg

* L'emplacement du fichier de configuration GRUB2 n'est plus le même:
  - `/boot/grub2/grub.cfg` sous Fedora  
  - `/boot/grub/grub.cfg` sous Ubuntu

* Ce fichier de configuration est regénéré automatiquement à chaque fois qu'un fichier noyau est ajouté ou supprimé:
  là où GRUB Legacy prévoit que le fichier de configuration principal soit édité, GRUB2 s'attend à ce que toute personnalisation soit effectuée dans des fichiers de configuration séparés — et leur contenu sera copié dans fichier grub.cfg lorsqu'il est mis à jour.

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

  | Key | Description
  |---    |---
  | `GRUB_DEFAULT=0` | Entrée sélectionnée par défaut
  | `GRUB_TIMEOUT=10` | Délai d'attente avant de démarrer sur l'entrée par défaut
  | `GRUB_TIMEOUT_STYLE=hidden` | Masquer le menu GRUB

### /etc/grub.d

* `/etc/grub.d` contient les scripts qui seront utilisés (en respectant l'ordre de numérotation)
  pour créer le fichier grub.cfg. On trouve notamment:

  - <ins>05_debian_theme</ins>:  
    script pour gérer le thème en mode texte (fonds d'écran et couleurs)

  - <ins>10_linux</ins>:  
    contient le script de lancement du système

  - <ins>40_custom</ins>, <ins>41_custom</ins>:  
    permettent d'ajouter des entrées personnalisées à GRUB2

### /etc/grub.d/4*

* Pour ajouter une entrée au menu GRUB2, la syntaxe est différente de GRUB:

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

* Tout ce qui se situe après le fichier vmlinuz est une option.   
  Ces options dépendent de la distribution et de la version Linux.  
  Quelques exemples:

  ```
  linux /boot/vmlinuz-4.15.0-58-generic \
         root=UUID=5cec328b-bcd6-46d2-bcfa-8430257cd7a5 \
         ro find_preseed=/preseed.cfg auto noprompt \
         priority=critical locale=en_US quiet crashkernel=512M-:192M
  ```
  ```
  BOOT_IMAGE=/boot/vmlinuz-4.15.0-58-generic \
       root=UUID=5cec328b-bcd6-46d2-bcfa-8430257cd7a5\
       ro find_preseed=/preseed.cfg auto noprompt \
       priority=critical locale=en_US quiet crashkernel=512M-:192M
  ```
  ```
  linux /boot/vmlinuz-5.19.0 root=UUID=7ef4e747-afae-48e3-90b4-9be8be8d0258 ro quiet
  ```
  ```
  linuxefi /boot/vmlinuz-5.2.9 root=UUID=77461ee7-c34a-4c5f-b0bc-29f4feecc743 ro crashkernel=auto rhgb quiet crashkernel=384M-:128M
  ```

* Pour consulter la documentation des options:

  ```
  man bootparam
  ```

* Fedora et Red Hat utilisent le BLSFG (Boot Loader Specification Configuration), qui modifie l'emplacement de la ligne de commande kernel. Ces informations se trouvent dans /boot/grub2/grubenv ou /boot/loader/entries

* La ligne de commande avec laquelle le système a été lancée peut être consultée dans le fichier /proc/cmdline

  ```
  $ cat /proc/cmdline
  BOOT_IMAGE=(hd0,msdos2)/boot/vmlinuz-5.19.0 root=UUID=7f7221b8-60d8-41b9-b643-dfcc80527c37 ro rhgb quiet crashkernel=512M
  ```

  Toute option qui n'est pas comprise par le kernel sera passé à init (pid = 1), le premier processus lancé
