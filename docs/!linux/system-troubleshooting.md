---
title: Drivers
category: Linux
---

## Cold plug devices

udev is responsible for both hot and cold plug devices, sets up the files in the /dev directory, and uses a pre-defined set of rules and the information in sysfs (/sys) to help in this responsibility.

The udev rules stored in the /etc directory, more specifically in the /etc/udev/rules.d/ directory.

### strace

* `strace` permet de lancer une commande et d'intercepter et afficher tous les appels système et signaux reçus pour son processus

  ```
  $ strace -e file uptime
  execve("/usr/bin/uptime", ["uptime"], 0x7ffc8d3bfff0 /* 65 vars */) = 0
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libprocps.so.6", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libsystemd.so.0", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/librt.so.1", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/liblzma.so.5", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/usr/lib/x86_64-linux-gnu/liblz4.so.1", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libgcrypt.so.20", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libpthread.so.0", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libdl.so.2", O_RDONLY|O_CLOEXEC) = 3
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/lib/x86_64-linux-gnu/libgpg-error.so.0", O_RDONLY|O_CLOEXEC) = 3
  openat(AT_FDCWD, "/proc/sys/kernel/osrelease", O_RDONLY) = 3
  openat(AT_FDCWD, "/sys/devices/system/cpu/online", O_RDONLY|O_CLOEXEC) = 3
  openat(AT_FDCWD, "/usr/lib/locale/locale-archive", O_RDONLY|O_CLOEXEC) = 3
  openat(AT_FDCWD, "/etc/localtime", O_RDONLY|O_CLOEXEC) = 3
  openat(AT_FDCWD, "/proc/uptime", O_RDONLY) = 3
  access("/var/run/utmpx", F_OK)          = -1 ENOENT (No such file or directory)
  openat(AT_FDCWD, "/var/run/utmp", O_RDONLY|O_CLOEXEC) = 4
  openat(AT_FDCWD, "/proc/loadavg", O_RDONLY) = 4
   14:55:20 up  9:39,  1 user,  load average: 1,64, 1,03, 1,05
  +++ exited with 0 +++
  ```


* To get the support for a file system whose modules are not currently loaded into the kernel, you'll need the module for it. Recall that modules are available not only for device drivers, but also for file systems.

  ![](Screenshot from 2022-06-05 16-26-21.png)

---

* USB devices (I assume your scanner is USB) are identified by vendorId and productId (two 16bit integers), each driver fill an array with the list of supported vendor/prods id (creating a relation vendor:prod->driver), I guess at compile time all the id in the array are merged together in a list which then is used for a lookup search when a device is plugged in.

  Usually you can see vendor and product id of the attached device with dmesg command right after the device is plugged in (or with lsusb).

  https://github.com/torvalds/linux/blob/v4.10/drivers/usb/class/cdc-acm.c#L1687

* A device class describes a type of device, like an audio or network device.

  Each device class defines a set of semantics and a programming interface that devices of that class adhere to. Device drivers are the implementation of that programming interface for a particular device on a particular bus.

  https://01.org/linuxgraphics/gfx-docs/drm/driver-api/driver-model/class.html

* The “Open Firmware Device Tree”, or simply Devicetree (DT), is a data structure and language for describing hardware. More specifically, it is a description of hardware that is readable by an operating system so that the operating system doesn’t need to hard code details of the machine.

  Structurally, the DT is a tree, or acyclic graph with named nodes, and nodes may have an arbitrary number of named properties encapsulating arbitrary data. A mechanism also exists to create arbitrary links from one node to another outside of the natural tree structure.

  Conceptually, a common set of usage conventions, called ‘bindings’, is defined for how data should appear in the tree to describe typical hardware characteristics including data busses, interrupt lines, GPIO connections, and peripheral devices.

  As much as possible, hardware is described using existing bindings to maximize use of existing support code, but since property and node names are simply text strings, it is easy to extend existing bindings or create new ones by defining new nodes and properties. Be wary, however, of creating a new binding without first doing some homework about what already exists. There are currently two different, incompatible, bindings for i2c busses that came about because the new binding was created without first investigating how i2c devices were already being enumerated in existing systems.

* The most important thing to understand is that the DT is simply a data structure that describes the hardware. There is nothing magical about it, and it doesn’t magically make all hardware configuration problems go away. What it does do is provide a language for decoupling the hardware configuration from the board and device driver support in the Linux kernel (or any other operating system for that matter). Using it allows board and device support to become data driven; to make setup decisions based on data passed into the kernel instead of on per-machine hard coded selections.

  Ideally, data driven platform setup should result in less code duplication and make it easier to support a wide range of hardware with a single kernel image.

  https://www.kernel.org/doc/html/latest/devicetree/usage-model.html

---

## journalctl

* Pour afficher les fichiers journaux, utiliser la commande `journalctl`

* On peut également utiliser `/var/log/syslog`

* Les fichiers journaux sont tournés (rotate), ce qui signifie que les anciens fichiers journaux sont renommés et remplacés par des fichiers journaux plus récents.

## Messages du noyau

* Les messages du noyau peuvent être trouvés dans les fichiers suivants:

  - `/var/log/dmesg`: contient les messages du noyau qui ont été produits au démarrage du système
  - `/var/log/messages`: contient les messages du noyau qui sont produits pendant que le système fonctionne

* Pour afficher les messages générés par le noyau, utiliser la commande `dmesg`.
  Par exemple, si vous avez branché un composant et que le composant ne marche pas, vous vérifier comment le noyau a réagit et s'il y a des erreurs.

  ```
  $ dmesg | grep vga
  ```

## dmesg

* La commande dmesg peut être exécutée après le démarrage du système pour voir les messages générés par le noyau pendant le temps de démarrage, ce qui est utilie lorsque le système ne semble pas démarrer correctement.

  L'affichage du message de démarrage peut aider l'administrateur à dépanner le processus de démarrage.

## Lib

* La hiérarchie de système de fichiers standard (Filesystem Hierarchy Standard, FHS) est un ensemble de normes supportées par la Linux Foundation. Toute personne voulant développer sa distribution Linux doit respecter ces conventions.

  * Répertoires d'utilisateurs et répertoires personnels:  
    /home contient les répertoires personnels des comptes utilisateurs

  * Répertoires binaires:  
    Les programmes que les utilisateurs exécutent pour lancer des applications ou processus:  
    /bin, /usr/bin ou /usr/local/bin

    Root restricted binaries (sbin):  
    Les programmes destinés à l'administrateur système (root):  
    sbin, /usr/sbin et /usr/local/sbin

  * Répertoires d'applications logicielles:  
    Les applications peuvent avoir des fichiers dans plusieurs répertoires répartis dans le système de fichiers Linux. Pour afficher la liste des fichiers d'applications:

    ```
    dpkg -L packagename   # debian

    rpm -ql packagename   # redhat
    ```

    dpkg: prononcer depackage

  * Répertoires de bibliothèques:  
    Fichiers contenant du code qui est partagé entre plusieurs programmes — généralement des fichiers avec l'extension .so:  
    /lib, /lib64, /usr/lib, /usr/lib64, /usr/local/lib

  * Répertoires de données variables:  
    Le répertoire /var et plusierus de ses sous-répertoires peuvent contenir des données qui changeront fréquemment. Par exemple:  
    /var/log, /var/mail, /var/spool/mail
