---
title: Virtual Machines (VM)
category: Linux
---

## La virtualisation

* Un ordinateur physique existe dans le monde matériel — on peut le voir et le toucher.  
  Un ordinateur virtuel est différent, dans le sens qu'il n'existe que sous forme logiciel.  
    La différence entre un ordinateur physique et un ordinateur virtuel est à peu près la même qu'entre un livre physique et un livre virtuel:

    - le premier est imprimé sur un support physique,
    - le second, plus généralement appelé ebook, peut être lu avec un lecteur ebook mais il n'a pas de copie physique qu'on peut tenir et mettre sur une étagère.  
        

* Un ordinateur virtuel est plus généralement appelé *machine virtuelle* (ou *virtual machine* en anglais, abrégé VM).  
  Lorsqu'un ordinateur virtuel est démarré et fonctionne, on parle d'*instance* ou d'*image système*.  
  Un VM est une instance virtualisée d'un système d'exploitation complet et peut jouer le rôle d'un serveur ou d'un poste de travail.

* Le principe de la virtualisation est comme suit:

  - Un ordinateur physique, qu'on appelle *host*, execute un système d'exploitation (*operating system*, OS)

  - Une application qui tourne sur cet OS permet de créer et exécuter des machines virtuelles.  
    On appelle ce type d'application un *hyperviseur* (*hypervisor*)

  - Chaque machine virtuelle (*virtual machine*, VM), qu'on appelle *guest*, possède son propre système d'exploitation, qui peut être différent de l'OS de la machine physique.

    L'environnement auquel l'utilisateur a accès ne connaît pas les détails physiques de la machine sur laquelle il s'exécute: l'accès au matériel, tel que les NIC, se fait par le biais d'un appareil virtuel qui peut accéder au dispositif physique.
    Les applications exécutées dans la VM ne savent généralement pas qu'elles tournent dans un environnement virtuel.

    ![](https://i.imgur.com/XM5gHVgm.png)

* Un aspect important de la virtualisation est qu'on peut faire tourner plusieurs machines virtuelles et en ajouter à la volée tant que l'ordinateur physique dispose des ressources nécessaires pour les faire fonctionner.  
    Ça peut permettre de se débarraser de certains serveurs physiques: si on a 3 machines physiques qu'on peut transformer en 3 machines virtuelles sur un seul serveur physique, alors l'entreprise économisera de l'argent, non seulement sur les coûts en électricité mais aussi sur l'espace de la salle des serveurs.

    ![](https://i.imgur.com/1YJJmBxm.png)

* Les VMs ont de nombreuses utilisations, mais les principales sont

  - une utilisation plus efficace du matériel
  - l'isolation des logiciels et une plus grande sécurité
  - plus grande stabilité et des options de développement sûres
  - la possibilité d'exécuter plusieurs OS en même temps sans redémarrage

* L'optimisation des performances de bas niveau, tels que l'utilisation du CPU, de la mémoire ou le débit du réseau, est généralement réalisée sur l'hôte — l'invité ne va avoir que des quantités simulées qui ne sont pas directement utiles. Tandis que l'optimisation des performances des applications se fera sur l'invité.

## Image système

* La configuration de chaque machine virtuelle est stockée dans un fichier sur le système physique. Ce type de fichier est parfois appelé "image système" mais cela peut également faire référence à une machine en cours d'execution — donc un terme à prendre avec des pincettes.  
  La configuration comprend le type et le nombre de carte d'interface réseau configurées, la taille et le nombre de disques invités, la taille de la mémoire de la VM, etc.

  Certains hyperviseurs permettent de créer un groupes de fichiers contenant une copie de la configuration et des disques d'une VM: des <ins>fichiers OVF</ins> (*Open virtualization file*). Certains permettent également de créer un fichier standard unique, le <ins>fichier OVA</ins> (*Open virtualization application*).

* Les disques d'une machine virtuelle ne sont que des fichiers sur le système hôte. Certains hyperviseurs créent un fichier unique pour chaque disque, tandis que d'autres décomposent chaque disque en plusieurs fichier. Les OS invités ignorent que leurs disques ne sont que des fichiers, et peuvent utiliser n'importe quelle technologie — des disques logiques, nfs, etc.

* Les pilotes de périphériques para-virtualisés (PV), spécifiques à chaque hyperviseur et OS, permettent à l'hyperviseur d'émuler des disques et cartes réseau pour une VM à l'aide d'une interface optimisée, ce qui permet d'améliorer les performances des VMs

  KVM (*Kernel Virtual Machine*) est un module du kernel Linux qui permet à l'invité de s'exécuter directement sur le CPU hôte.  
  KVM fournit ses pilotes PV dans un package appelé `virtio`.  
  Le terme "virtio" est ainsi parfois utilisé pour faire référence aux PV de KVM.

* Un autre concept intéressant est celui de switch réseau virtuel. Avec des switchs virtualisés, on peut attacher la NIC de chaque VM à de multiples NIC physiques. Cela permet d'éviter un unique point de défaillance si l'un des NIC de l'hôte tombe en panne, et permet également d'équilibrer le trafic réseau.

---

## Types d'hyperviseurs

* On distingue deux types d'hyperviseurs:

  * **Type 1**  
    Remplace le système d'exploitation de l'hôte et agit à la fois en tant qu'OS et hyperviseur.  
    Exemples: EXSIN, HyperV, Xen

    ![](https://i.imgur.com/FJdeFPMm.png)

  * **Type 2**  
    Tourne sur l'OS et peut fonctionner en même temps que d'autres applications sur l'OS.  
    Exemples: VMware workstation, Oracle VirtualBox, QEMU/KVM

    ![](https://i.imgur.com/mvBbnUMm.png)

  * **Hybride**  
    Tous les hyperviseurs ne se rangent pas dans le camp des hyperviseurs de type 1 ou 2.  
    Par exemple, KVM, est intégré au noyau Linux et est un hybride entre un type 1 et 2.

    ![](https://i.imgur.com/VNpyltK.png)

## Containers vs VM

* Les containers ressemblent un peu aux VMs, il s'agit d'un environnement confiné et, comme pour les VMs, il peut y avoir plusieurs containers sur un hôte. Il va quand même y avoir des différences notables:

  1. Au lieu d'un hyperviseur, c'est un moteur de container qui se charge de la gestion des containers.

  2. Au lieu que chaque container ait son propre système d'exploitation invité (*guest OS*), il partage l'OS de l'hôte et possède des copies des bibliothèques et des binaires dont il y a besoin pour fonctionner

  3. Il n'y a généralement qu'une seule application exécutée dans un container, ce qui permet l'ajout de containers à la volée pour répondre au besoin de mise à échelle et la vérification de l'état du container.

    ![](https://i.imgur.com/74kgwU2m.png)

* Les containers sont très utilisés dans les environnements de développement où la méthologie devops est employée. Docker est l'un des moteurs de containers les plus populaires, mais il existe aussi d'autres moteurs de containers, tels que LXD.

* Parce qu'on peut être amené à gérer de nombreux containers, on peut automatiser le déploiement et la destruction de containers à l'aide d'un outil d'*orchestration*. L'outil d'orchestration le plus populaire est Kubernetes, abrégé k8s.

## Émulateurs

* Les premières implémentations de virtualisation sur PC ont été réalisées à l'aide d'émulateurs.

* Un *émulateur* est un logiciel permettant de faire tourner des OS et des applications qui ne sont pas compatibles avec le matériel de l'OS hôte, en reproduisant le comportement d'un autre matériel. Les émulateurs ne nécessitent généralement pas de matériel spécial pour fonctionner.

  Un émulateur est utilisé pour faire fonctionner des machines virtuelles sur des architectures différentes, par exemple pour faire fonctionner une VM ARM sur un hôte X86. L'émulation est souvent utilisée pour développer un OS pour un nouveau CPU, avant même que le matériel ne soit disponible. Mais les performances sont relativement lentes.

* Après l'émulation, la fusion de l'hyperviseur dans un kernel léger spécialement conçu pour a été l'étape suivante dans le déploiement de la virtualisation. Xen et VMware ESX sont des exemples d'hyperviseurs intégrés dans un OS.

* Le projet KVM a ajouté des capacités d'hyperviseur directement au kernel Linux.  
  Cela permet d'exploiter les fonctions du kernel tout en faisant de ce dernier un hyperviseur.

## Types de virtualisation

* Il existe deux types de virtualisation:

  - <ins>virtualisation matérielle / émulée (full)</ins>.  
    Le système invité fonctionne sans savoir qu'il fonctionne en tant qu'invité virtualisé et ne nécessite aucunes modifications. Cette méthode est également conue sous le nom de virtualisation complète

  - <ins>para-virtualisation (PV)</ins>.  
    Le système invité sait qu'il fonctionne dans un environnement virtualisé et son OS a été modifié spécifiquement pour fonctionner avec l'hôte.  
    En général, la virtualisation émulée (complète) est plus lente que la virtualisation d'un kernel modifié (para). En installant des pilotes spécialisés (pilotes PV) dans le kernel de l'invité, les performances des invités entièrement virtualisés peuvent être améliorées.

* Les processeurs Intel et AMD intègrent des extensions de virtualisation à l'architecture x86 qui permettent à l'hyperviseur d'exécuter des systèmes d'exploitation invités entièrement virtualisés (c'est à dire non modifiés) avec seulement des pénalités mineures en termes de performances.

  L'extension Intel, *Intel Virtualization Technology* (abrégé VT, IVT, VT-32 ou VT-64), également connue sous le nom de code de Vanderpool, est disponible depuis le printemps 2005.
  L'extension AMD, généralement appelé AMD-V, est aussi désignée par le nom de code de Pacifica.

  Pour plus d'infos: [Xen and the new processors](https://lwn.net/Articles/182080/)

* Bien que le choix des systèmes d'exploitation soit généralement plus limité pour les invités para-virtualisés, à l'origine, ils avaient tendance à fonctionner plus efficacement que les invités entièrement virtualisés.  
  Les progrès des techniques de virtualisation ont réduit ou éliminé ces avantages, et la plus grande disponibilité du support matériel nécessaire à la virtualisation complète a rendu la para-virtualisation moins avantageuse et moins populaire.

---

## Libvirt

* Le projet LibVirt est une boîte à outils permettant d'interagir avec les technologies de virtualisation. Il permet de gérer les machines virtuelles, les réseaux virtuels et le stockage, et est disponible sur toutes les distributions Linux d'entreprise. De nombreux projets s'interfaçent avec libvirt, les plus courants étant virt-manager, virt-viewer, virt-install et virsh.

* La liste complète des hyperviseurs actuellement pris en charge par libvirt: [hyperviseurs libvirt](https://www.libvirt.org/drivers.html)

  ```
  QEMU/KVM
  Xen
  Oracle VirtualBox
  VMware ESX
  VMware Workstation/Player
  Microsoft Hyper-V
  IBM PowerVM (phyp)
  OpenVZ
  UML (User Mode Linux)
  LXC (Linux Containers)
  Virtuozzo
  Bhyve (The BSD Hypervisor)
  Cloud Hypervisor
  Test (used for testing)
  ```

## KVM

* KVM est apparu pour la première fois dans le cadre d'un produit Windows Virtual Desktop et a fusionné avec le kernel Linux en 2007. Associé à une version modifiée de QEMU, il a permis de créer un hyperviseur avec le kernel Linux.

* En chargeant les modules KVM et en démarrant un invité, on transforme Linux en hyperviseur — tout en conservant les fonctionnalités de base de l'OS. On peut contrôler les VM à l'aide d'outils Linux standards de contrôle des ressources et des processus, tels que cgroups, nice, numaclt, etc.

* La gestion de KVM peut être effectuée à l'aide d'interfaces graphiques (virt-manager, kimchi, openstack ovirt, etc) et lignes de commande (`virt-*`, `qemu-*`).

## QEMU

* QEMU est l'acronyme de *Quick Emulator*.  
  Il a été écrit en 2002 par Fabrice Bellard

  - QEMU est à la fois un émulateur et un hyperviseur de type 2,  
    pouvant être utilisé pour faire tourner des applications ou des systèmes d'exploitation entiers.
  - Il est capable de prendre en charge de nombreuses architectures, y compris:  
    IA-32 (i386), x86-64, MIPS, SPARC, ARM, SH4, PowerPC, CRIS, MicroBlaze, etc.
  - QEMU dispose d'une interface graphique, qui permet de gérer les machines virtuelles plus facilement
  - Les OS invités n'ont pas besoin d'êtres réécrits pour fonctionner sous QEMU
  - QEMU peut sauvegarder, mettre en pause et restaurer une VM à tout moment
  - Il est sous licence GPL  
     

* QEMU est beaucoup plus lent que la machine hôte, mais il peut être utilisé avec KVM pour atteindre des vitesses proches de celles de l'hôte natif. Ainsi QEMU et KVM sont généralement utilisés ensemble.  
    QEMU peut également être utilisé avec Xen, également natif de Linux, et fonctionner en mode de virtualisation matérielle si l'architecture le permet, comme c'est le cas pour x86 et certaines variantes ARM.  
    Oracle Virtual Box peut utiliser des images formatées qcow2 et a une relation très étoite avec QEMU.

### Pour & contre

Pour
* QEMU a une intégration étroite avec KVM, il est plus performant que le plupart des hyperviseurs
* Plus user-friendly et facile à utiliser que KVM
* Peut fonctionner comme émulateur ou comme hyperviseur

Contre
* Légère baisse de performance par à rapport à l'utilisation directe de KVM
* Nécessite une installation et une configuration
* Moins de compatibilité avec diverses architectures, et moins user friendly que certains hyperviseurs comme VirtualBox

### Format des images

* QEMU prend en charge de nombreux formats pour les fichiers d'image disque, mais deux sont principalement utilisés:

  * **raw** (par défaut)  
     C'est le plus simple et le plus facile à exporter vers d'autres émulateurs non QEMU.  
     Les secteurs vides ne prennent pas de place.

  * **qcow2** (*Copy on Write*)  
    Voir `qemu-img`

* Les autres formats disponibles sont principalement là pour des raisons historiques et pour des utilitaires de conversion.  
  Pour convertir une image d'un format à un autre:

    ``` bash
    # Convert a VMWare .vmdk image file to a qcow2 file for KVM
    $ qemu-img convert -O qcow2 myvm.vmdk myvm.qcow2
    ```

* Pour la complète liste des formats supportés:

    ``` bash
    $ qemu-img --help | grep formats:
    Supported formats: blkdebug blklogwrites blkreplay blkverify copy-on-read file ftp ftps gluster
    ↪ host_cdrom host_device http https iscsi iser luks nbd null-aio null-co nvme qcow2 quorum raw rbd ssh
    ↪ throttle vhdx vmdk vpc
    ```

    Notons en particulier, `vdi` utilisé par Oracle VirtualBox et `vmdk` utilisé par VMware.
