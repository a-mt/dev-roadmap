---
title: Kernel modules
category: Linux
---

## Drivers

* Afin de pouvoir utiliser un périphérique, Linux doit savoir communiquer avec.  
  Ce sont les pilotes (*driver* en anglais), développés par les fabricants, qui permettent au système d'exploitation de communiquer avec le périphérique — et inversemment. Autrement dit, un driver sert en quelque sorte de "traducteur" entre les commandes que l'OS connaît et les commandes que le périphérique connaît.

  ![](https://i.imgur.com/J5E3YoX.png)

* Au moment du démarrage du système, c'est le firmware effectue une initialisation de bas niveau du matériel avant de rendre le contrôle au programme de boot — le bootloader.

---

## Modules

* Le kernel Linux est compilé avec plusieurs drivers de périphériques pré-installés.
  Cependant avoir les drivers de chaque périphérique possible stocké directement dans le kernel ne serait pas judicieux — ça le rendrait énorme.

* Pour parer ce problème, les drivers peuvent être chargés a posteriori dans le kernel grace à des *modules*.  
  La modularité du noyau permet d'ajouter du matériel sans qu'il soit toujours nécessaire de recompiler le noyau.

* Les modules ne se limitent pas au drivers de périphériques, ce peut également être des drivers de systèmes de fichiers, de réseau, des appels système ou encore des loaders executables.

* Les fichiers des modules du noyau sont stockés dans /lib/modules.  
  Chaque module est spécifique à un noyau, et est typiquement stocké dans `/lib/modules/*/kernel/drivers` — où `*` désigne la version du noyau Linux

  ``` bash
  $ ls /lib/modules/5.4.0-122-generic/kernel/drivers
  ```

* La plupart des fonctionnalités du noyau peuvent être configurées sous forme de modules, même s'il est peu probable qu'elles soient utilisées. Cette flexibilité facilite également le développement de nouvelle fonctionnalités, puisqu'il n'est presque jamais nécessaire de redémarrer le système pour effectuer des tests pendant le développement et debuggage.

* Si vous branchez un périphérique, vous remarquerez que la plupart du temps il marche directement:  
  c'est parce que le système l'a détecté et a ajouté les pilotes qui manquaient.
  Sur le serveur Ubuntu, on peut récupérer directement le pilote standard — pas le pilote propriétaire.

* Dans la plupart des cas, si vous achetez un périphérique, vous aurez avec un CD qui contient le pilote.
  Dans certains cas, par exemple pour une carte graphique, vous devez vous rendre sur le site officiel pour télécharger les pilotes.
  Si vous branchez un périphérique et qu'il ne marche pas, la première question à se poser est avez-vous installé le pilote?  

---

## Modules chargés

* `lsmod` permet de lister les modules chargés.  
  On peut également utiliser `cat /proc/modules`

  ``` bash
  $ lsmod | head -5
  Module                  Size  Used by
  xt_conntrack           16384  2
  xt_MASQUERADE          20480  2
  nf_conntrack_netlink    49152  0
  nfnetlink              20480  2 nf_conntrack_netlink
  ```
  ``` bash
  $ cat /proc/modules | head -5
  xt_conntrack 16384 2 - Live 0x0000000000000000
  xt_MASQUERADE 20480 2 - Live 0x0000000000000000
  nf_conntrack_netlink 49152 0 - Live 0x0000000000000000
  nfnetlink 20480 2 nf_conntrack_netlink, Live 0x0000000000000000
  xfrm_user 40960 1 - Live 0x0000000000000000
  ```

## Détails d'un module

* `modinfo` permet d'obtenir des informations sur les modules (qu'ils soient chargés ou non) — avec notamment le path du fichier et sa description.

  ``` bash
  $ modinfo e1000e
  filename:       /lib/modules/5.15.0-73-generic/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko
  license:        GPL v2
  description:    Intel(R) PRO/1000 Network Driver
  author:         Intel Corporation, <linux.nics@intel.com>
  srcversion:     6297C82429312563C41575B
  ...
  ```

  Notons que l'extension .ko indique qu'il s'agit d'un module du kernel.

---

## Ajouter un module

* Les commandes `insmod` et `modprobe` permettent toutes deux d'insérer un module chargeable dans le noyau (avec les privilèges root).  

* insmod prend le path absolu du module et ne charge pas ses dépendences, contrairement à modprobe.

  ``` bash
  $ ls /lib/modules/$(uname -r)/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko
  /lib/modules/5.15.0-73-generic/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko

  $ sudo insmod /lib/modules/$(uname -r)/kernel/drivers/net/ethernet/intel/e1000e/e1000e.ko
  ```

* Les modules sont généralement chargés avec modprobe.  
  Lorsqu'un module est chargé avec modprobe, le système charge automatiquement tous les autres modules devant être chargés en premier.
  

  ``` bash
  $ sudo modprobe e1000e
  ```

* Les modules chargés avec des licences open source non valides marquent le kernel comme *tainted* — altéré.

### Base de données

* modprobe nécessaire une base de données de dépendances, stockée dans le fichier `/lib/modules/$(uname -r)/modules.dep`  
  Pour générer ou mettre à jour ce fichier:

  ``` bash
  $ sudo depmod
  ```

### Paramètres

* Des paramètres peuvent être spécifiés au chargement des modules pour modifier leur comportement.

  ``` bash
  $ sudo /sbin/insmod <pathto>/e1000e.ko debug=2 copybreak=256

  $ sudo /sbin/modprobe e1000e debug=2 copybreak=256
  ```

* La liste des paramètres disponibles est visible avec modinfo. De nombreuses informations peuvent également être consultées dans /sys et tous les paramètres peuvent être lus et/ou écrits dans /sys/module/NAME/parameters.

  ``` bash
  $ modinfo sg
  name:           sg
  filename:       (builtin)
  alias:          char-major-21-*
  version:        3.5.36
  license:        GPL
  file:           drivers/scsi/sg
  description:    SCSI generic (sg) driver
  author:         Douglas Gilbert
  parm:           scatter_elem_sz:scatter gather element size (default: max(SG_SCATTER_SZ, PAGE_SIZE)) (int)
  parm:           def_reserved_size:size of buffer reserved for each fd (int)
  parm:           allow_dio:allow direct I/O (default: 0 (disallow)) (int)
  ```
  ``` bash
  $ ls /sys/module/sg/parameters
  allow_dio  def_reserved_size  scatter_elem_sz
  ```

---

## Retirer un module

* Les commandes `rmmod` et `modprobe -r` permettent toutes deux de retirer un module chargeable du kernel (avec les privilèges root).  
  rmmod ne retire pas les dépendences chargés, contrairement à mobprobe -r

  ``` bash
  sudo rmmod e1000e
  ```

  Lorsqu'un module est déchargé avec modprobe -r, le système décharge automatiquement tous les autres modules uitlisés par le module, s'ils ne sont pas utilisés simultanément par d'autres modules chargés.

  ``` bash
  sudo modprobe -r e1000e
  ```

* Il est impossible de décharger un module utilisé par un ou plusieurs autres modules. Il est égalemeent impossible de décharger un module utilisé par un ou plusieurs processus. Ce qu'on peut vérifier dans les deux ca sà partir de la liste lsmod, colonne "Used by"

  Certains modules ne tiennent pas compte de ce nombre de références, comme les drivers de périphérique réseua, car il serait trop difficile de remplacer temporairement un module par un autre sans arrêter et redémarrer une grande partie de la stack réseau.

---

## Fichiers de configuration

* Tous les fichiers `/etc/modprobe.d/*.conf` sont analysés lorsque des modules sont chargés ou décharges à l'aide de modprobe.

  Ces fichiers contrôlent certains paramètres, comme les alias et les options par défaut. On peut également établir un blacklist de modules pour éviter qu'ils ne soient chargés. Ces configurations peuvent être modifiées au besoin.

  ``` bash
  $ cat /etc/modprobe.d/iwlwifi.conf
  # /etc/modprobe.d/iwlwifi.conf
  # iwlwifi will dyamically load either iwldvm or iwlmvm depending on the
  # microcode file installed on the system.  When removing iwlwifi, first
  # remove the iwl?vm module and then iwlwifi.
  remove iwlwifi \
  (/sbin/lsmod | grep -o -e ^iwlmvm -e ^iwldvm -e ^iwlwifi | xargs /sbin/rmmod) \
  && /sbin/modprobe -r mac80211
  ```
