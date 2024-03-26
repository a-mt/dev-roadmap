---
title: Ressources système
category: Linux
---

## Fichiers virtuels

### /proc

* <details>
  <summary>
    /proc (<i>processes</i>) contient non seulement des informations sur les processus en cours  
    mais aussi des informations sur le matériel et la configuration actuelle du kernel
  </summary>

  <pre lang="bash">
  $ cat /proc/version_signature
  Ubuntu 5.4.0-122.138~18.04.1-generic 5.4.192
  $
  $ cat /proc/version
  Linux version 5.4.0-122-generic (buildd@lcy02-amd64-035) (gcc version 7.5.0 (Ubuntu 7.5.0-3ubuntu1~18.04)) #138~18.04.1-Ubuntu SMP Fri Jun 24 14:14:03 UTC 2022
  $
  $ cat /proc/cmdline
  BOOT_IMAGE=/boot/vmlinuz-5.4.0-122-generic root=UUID=28a25b21-4cc8-484e-bebe-1d133ce62468 ro quiet splash vt.handoff=1
  </pre>

  <table>
  <tr>
    <th>Fichier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>
      <code>/proc/cmdline</code>
    </td>
    <td>
      Informations passées au kernel pendant le démarrage
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/meminfo</code>
    </td>
    <td>
      Informations sur l'utilisation de la mémoire du kernel
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/modules</code>
    </td>
    <td>
      Modules chargés dans le kernel
    </td>
  </tr>
  <tr><td></td><td></td></tr>
  <tr>
    <td>
      <code>/proc/dma</code>
    </td>
    <td>
      (direct memory access) Canaux pouvant envoyer des données directement en mémoire, sans passer par le CPU
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/interrupts</code>
    </td>
    <td>
      Interruptions, permet au CPU de savoir quel périphérique a des données à lui envoyer
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/ioports</code>
    </td>
    <td>
      Emplacements mémoire où le CPU et les autres composants matériel s'envoient des données — dans les deux sens
    </td>
  </tr>
  <tr><td></td><td></td></tr>
  <tr>
    <td>
      <code>/proc/ide/*</code>
    </td>
    <td>
      Configurations des bus IDE
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/scsi/*</code>
    </td>
    <td>
      Configurations des appareils SCSI
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/scsi/device_info</code>
    </td>
    <td>
      Liste des appareils SCSI reconnus
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/bus/usb/*</code>
    </td>
    <td>
      Configurations des bus USB
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/bus/pci/*</code>
    </td>
    <td>
      Configurations des bus PCI
    </td>
  </tr>
  <tr>
    <td>
      <code>/proc/device-tree/*</code>
    </td>
    <td>
      Configuration OpenFirmware, utilisé sur les plateformes PowerPC
    </td>
  </tr>
  </table>

  Pour plus d'infos: <code>man 5 proc</code>
  </details>

### /sys

* /sys (*system*) contient des informations sur le kernel et sur les périphériques  
  mais structuré différemment (formalisme kobject), ce qui facilite la recherche

### /dev

* <details>
  <summary>
    /dev (<i>devices</i>) contient les fichiers virtuels représentant les composants
  </summary>

  <pre lang="bash">
  $ ls -l /dev/nvme0n1 /dev/tty2
  brw-rw---- 1 root disk 259, 0 août  19 08:04 /dev/nvme0n1
  crw--w---- 1 root tty    4, 2 août  19 08:04 /dev/tty2
  </pre>

  <table>
  <tr>
    <th>Fichier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>/dev/bus/usb/*</code></td>
    <td>Port USB</td>
  </tr>
  <tr>
    <td><code>/dev/hd*</code></td>
    <td>Disque PATA</td>
  </tr>
  <tr>
    <td><code>/dev/sd*</code></td>
    <td>Disque SATA & SCSI</td>
  </tr>
  <tr>
    <td><code>/dev/nvme*</code></td>
    <td>Disque PCI Express</td>
  </tr>
  <tr>
    <td><code>/dev/tty*</code></td>
    <td>Terminal</td>
  </tr>
  <tr>
    <td><code>/dev/sr*</code></td>
    <td>Lecteur optique</td>
  </tr>
  <tr>
    <td><code>/dev/fd*</code></td>
    <td>(floppy disk) Disquette</td>
  </tr>
  </table>
  </details>

---

## Lister les composants

### ls

* <details>
  <summary>
    Certaines informations de bas niveau sont visibles directement sur les fichiers virtuels,  
    notamment le type de fichier (1er caractère) et le groupe
  </summary>

  <pre lang="bash">
  $ ls -l /dev/nvme0n1 /dev/tty2
  brw-rw---- 1 root disk 259, 0 août  19 08:04 /dev/nvme0n1
  crw--w---- 1 root tty    4, 2 août  19 08:04 /dev/tty2
  </pre>

  <table>
  <tr>
    <th>Exemple</th>
    <th>Groupe</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>/dev/nvme0n1</code></td>
    <td>disk</td>
    <td>b</td>
    <td>Un disque, appareil qui transfère des données en bloc</td>
  </tr>
  <tr>
    <td><code>/dev/tty2</code></td>
    <td>tty</td>
    <td>c</td>
    <td>Un terminal, appareil virtuel qui transfère des données caractère par caractère</td>
  </tr>
  </table>
  </details>

### lshw

* <details>
  <summary>
    <code>lshw</code> (<i>list hardware</i>) liste les composants détectés et leurs caractéristiques
  </summary>

  <pre lang="bash">
  # lshw > lshw
  # grep -Fn '*' lshw | head
  9:  *-core
  16:     *-firmware
  25:     *-cpu
  40:        *-cache:0
  48:        *-cache:1
  56:        *-cache:2
  64:     *-memory
  69:        *-bank:0
  79:        *-bank:1
  89:     *-pci
  </pre>
  </details>

### lscpu

* <details>
  <summary>
    <code>lscpu</code> (<i>list CPU</i>) affiche les infos du CPU
  </summary>

  <pre lang="bash">
  $ lscpu
  Architecture:        x86_64
  CPU op-mode(s):      32-bit, 64-bit
  Byte Order:          Little Endian
  CPU(s):              8
  On-line CPU(s) list: 0-7
  Thread(s) per core:  2
  Core(s) per socket:  4
  Socket(s):           1
  NUMA node(s):        1
  Vendor ID:           GenuineIntel
  CPU family:          6
  Model:               142
  Model name:          Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz
  Stepping:            12
  CPU MHz:             800.124
  CPU max MHz:         4900,0000
  CPU min MHz:         400,0000
  BogoMIPS:            4599.93
  Virtualisation:      VT-x
  L1d cache:           32K
  L1i cache:           32K
  L2 cache:            256K
  L3 cache:            8192K
  NUMA node0 CPU(s):   0-7
  Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb invpcid_single ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid mpx rdseed adx smap clflushopt intel_pt xsaveopt xsavec xgetbv1 xsaves dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp md_clear flush_l1d arch_capabilities
  </pre>
  </details>

* <details>
  <summary>
    Ces infos viennent de /proc/cpuinfo
  </summary>

  <pre lang="bash">
  $ head /proc/cpuinfo
  processor : 0
  vendor_id : GenuineIntel
  cpu family  : 6
  model   : 142
  model name  : Intel(R) Core(TM) i7-10510U CPU @ 1.80GHz
  stepping  : 12
  microcode : 0xf0
  cpu MHz   : 800.029
  cache size  : 8192 KB
  physical id : 0
  </pre>
  </details>

### lspci

* <details>
  <summary>
    <code>lspci</code> (<i>list PCI</i>) liste les ports PCI et les appareils qui y sont connectés
  </summary>

  -t (<i>tree</i>) pour afficher les infos en arbre<br>  
  -v, -vv ou -vvv (<i>verbose</i>) pour un mode plus verbeux

  <pre lang="bash">
  $ lspci | head
  00:00.0 Host bridge: Intel Corporation Device 9b61 (rev 0c)
  00:02.0 VGA compatible controller: Intel Corporation Device 9b41 (rev 02)
  00:04.0 Signal processing controller: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Thermal Subsystem (rev 0c)
  00:08.0 System peripheral: Intel Corporation Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th Gen Core Processor Gaussian Mixture Model
  00:12.0 Signal processing controller: Intel Corporation Device 02f9
  00:14.0 USB controller: Intel Corporation Device 02ed
  00:14.2 RAM memory: Intel Corporation Device 02ef
  00:15.0 Serial bus controller [0c80]: Intel Corporation Device 02e8
  00:15.1 Serial bus controller [0c80]: Intel Corporation Device 02e9
  00:16.0 Communication controller: Intel Corporation Device 02e0
  </pre>

  <pre lang="bash">
  $ lspci -t -vvv
  -[0000:00]-+-00.0  Intel Corporation Device 9b61
             +-02.0  Intel Corporation Device 9b41
             +-04.0  Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Thermal Subsystem
             +-08.0  Intel Corporation Xeon E3-1200 v5/v6 / E3-1500 v5 / 6th/7th Gen Core Processor Gaussian Mixture Model
             +-12.0  Intel Corporation Device 02f9
             +-14.0  Intel Corporation Device 02ed
             +-14.2  Intel Corporation Device 02ef
             +-15.0  Intel Corporation Device 02e8
             +-15.1  Intel Corporation Device 02e9
             +-16.0  Intel Corporation Device 02e0
             +-1c.0-[01]----00.0  Realtek Semiconductor Co., Ltd. RTS525A PCI Express Card Reader
             +-1c.6-[02]----00.0  Intel Corporation Device 2723
             +-1d.0-[03-70]----00.0-[04-70]--+-00.0-[05]----00.0  Intel Corporation JHL6540 Thunderbolt 3 NHI (C step) [Alpine Ridge 4C 2016]
             |                               +-01.0-[06-3a]--
             |                               +-02.0-[3b]----00.0  Intel Corporation JHL6540 Thunderbolt 3 USB Controller (C step) [Alpine Ridge 4C 2016]
             |                               \-04.0-[3c-70]--
             +-1d.4-[71]----00.0  SK hynix Device 174a
             +-1f.0  Intel Corporation Device 0284
             +-1f.3  Intel Corporation Device 02c8
             +-1f.4  Intel Corporation Device 02a3
             \-1f.5  Intel Corporation Device 02a4
  </pre>

  Les infos affichées sont:
  <ol>
  <li>adresse physique</li>
  <li>classe</li>
  <li>fabricant</li>
  <li>appareil</li>
  <li>révision (optionnel)</li>
  <li>interface de programmation (optionnel)</li>
  </ol>
  </details>

### lsusb

* <details>
  <summary>
    <code>lsusb</code> (<i>list USB</i>) liste les ports USB (/dev/bus/usb) et les appareils qui y sont connectés
  </summary>

  <pre lang="bash">
  $ lsusb
  Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
  Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
  Bus 002 Device 002: ID 05e3:0626 Genesys Logic, Inc. 
  Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
  Bus 001 Device 003: ID 8087:0029 Intel Corp. 
  Bus 001 Device 002: ID 0c45:6723 Microdia 
  Bus 001 Device 004: ID 27c6:5385  
  Bus 001 Device 007: ID 1bcf:0005 Sunplus Innovation Technology Inc. Optical Mouse
  Bus 001 Device 009: ID 046d:c52b Logitech, Inc. Unifying Receiver
  Bus 001 Device 008: ID 0bda:2171 Realtek Semiconductor Corp. 
  Bus 001 Device 005: ID 05e3:0610 Genesys Logic, Inc. 4-port hub
  Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
  </pre>
  </details>

* <details>
  <summary>
    Pour debugger la détection des appareils, on peut vérifier les événements systèmes avec <code>dmesg</code>
  </summary>

  <pre lang="bash">
  $ dmesg
  ...
  [   67.042586] usb 1-1: new high-speed USB device number 5 using xhci_hcd
  [   67.211103] usb 1-1: New USB device found, idVendor=05e3, idProduct=0610, bcdDevice=62.13
  [   67.211106] usb 1-1: New USB device strings: Mfr=1, Product=2, SerialNumber=0
  [   67.211108] usb 1-1: Product: USB2.1 Hub
  [   67.211109] usb 1-1: Manufacturer: GenesysLogic
  [   67.212733] hub 1-1:1.0: USB hub found
  [   67.215026] hub 1-1:1.0: 4 ports detected
  [   67.554519] usb 1-1.3: new full-speed USB device number 6 using xhci_hcd
  [   67.681961] usb 1-1.3: New USB device found, idVendor=046d, idProduct=c52b, bcdDevice=24.11
  [   67.681963] usb 1-1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=0
  [   67.681963] usb 1-1.3: Product: USB Receiver
  [   67.681964] usb 1-1.3: Manufacturer: Logitech
  [   67.798712] usb 1-1.4: new low-speed USB device number 7 using xhci_hcd
  [   67.928769] usb 1-1.4: New USB device found, idVendor=1bcf, idProduct=0005, bcdDevice= 0.14
  [   67.928775] usb 1-1.4: New USB device strings: Mfr=0, Product=2, SerialNumber=0
  [   67.928778] usb 1-1.4: Product: USB Optical Mouse
  </pre>
  </details>

* <details>
  <summary>
    La liste les périphériques en entrée (/dev/input) et leurs informations peut être trouvée dans /proc/bus/input/devices
  </summary>

  <pre lang="bash">
  $ cat /proc/bus/input/devices
  ...
  I: Bus=0003 Vendor=1bcf Product=0005 Version=0110
  N: Name="USB Optical Mouse"
  P: Phys=usb-0000:00:14.0-1.4/input0
  S: Sysfs=/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.4/1-1.4:1.0/0003:1BCF:0005.0005/input/input27
  U: Uniq=
  H: Handlers=mouse4 event21 
  B: PROP=0
  B: EV=17
  B: KEY=1f0000 0 0 0 0
  B: REL=1943
  B: MSC=10
  </pre>
  </details>

* <details>
  <summary>
    On peut retrouver ces informations dans /sys/devices
  </summary>

  <pre lang="bash">
  $ sysfs=/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.4/1-1.4:1.0/0003:1BCF:0005.0005/input/input27
  $ cd /sys$sysfs
  $
  $ ls -l
  total 0
  drwxr-xr-x 2 root root    0 août  20 05:17 capabilities
  lrwxrwxrwx 1 root root    0 août  20 06:15 device -> ../../../0003:1BCF:0005.0005
  drwxr-xr-x 3 root root    0 août  20 05:17 event21
  drwxr-xr-x 2 root root    0 août  20 05:17 id
  -r--r--r-- 1 root root 4096 août  20 06:15 modalias
  drwxr-xr-x 3 root root    0 août  20 05:17 mouse4
  -r--r--r-- 1 root root 4096 août  20 05:17 name
  -r--r--r-- 1 root root 4096 août  20 05:17 phys
  drwxr-xr-x 2 root root    0 août  20 06:15 power
  -r--r--r-- 1 root root 4096 août  20 05:17 properties
  lrwxrwxrwx 1 root root    0 août  20 05:17 subsystem -> ../../../../../../../../../../class/input
  -rw-r--r-- 1 root root 4096 août  20 05:17 uevent
  -r--r--r-- 1 root root 4096 août  20 06:15 uniq
  $
  $ grep -r '' . 2>/dev/null
  ./uevent:PRODUCT=3/1bcf/5/110
  ./uevent:NAME="USB Optical Mouse"
  ./uevent:PHYS="usb-0000:00:14.0-1.4/input0"
  ./uevent:UNIQ=""
  ./uevent:PROP=0
  ./uevent:EV=17
  ./uevent:KEY=1f0000 0 0 0 0
  ./uevent:REL=1943
  ./uevent:MSC=10
  ./uevent:MODALIAS=input:b0003v1BCFp0005e0110-e0,1,2,4,k110,111,112,113,114,r0,1,6,8,B,C,am4,lsfw
  ./capabilities/rel:1943
  ./capabilities/abs:0
  ./capabilities/ff:0
  ./capabilities/led:0
  ./capabilities/sw:0
  ./capabilities/key:1f0000 0 0 0 0
  ./capabilities/msc:10
  ./capabilities/snd:0
  ./capabilities/ev:17
  ./mouse4/uevent:MAJOR=13
  ./mouse4/uevent:MINOR=36
  ./mouse4/uevent:DEVNAME=input/mouse4
  ./mouse4/power/runtime_active_time:0
  ./mouse4/power/runtime_active_kids:0
  ./mouse4/power/runtime_usage:0
  ./mouse4/power/runtime_status:unsupported
  ./mouse4/power/async:disabled
  ./mouse4/power/runtime_suspended_time:0
  ./mouse4/power/runtime_enabled:disabled
  ./mouse4/power/control:auto
  ./mouse4/dev:13:36
  ./power/runtime_active_time:0
  ./power/runtime_active_kids:0
  ./power/runtime_usage:0
  ./power/runtime_status:unsupported
  ./power/async:disabled
  ./power/runtime_suspended_time:0
  ./power/runtime_enabled:disabled
  ./power/control:auto
  ./uniq:
  ./event21/uevent:MAJOR=13
  ./event21/uevent:MINOR=85
  ./event21/uevent:DEVNAME=input/event21
  ./event21/power/runtime_active_time:0
  ./event21/power/runtime_active_kids:0
  ./event21/power/runtime_usage:0
  ./event21/power/runtime_status:unsupported
  ./event21/power/async:disabled
  ./event21/power/runtime_suspended_time:0
  ./event21/power/runtime_enabled:disabled
  ./event21/power/control:auto
  ./event21/dev:13:85
  ./properties:0
  ./id/bustype:0003
  ./id/vendor:1bcf
  ./id/product:0005
  ./id/version:0110
  ./phys:usb-0000:00:14.0-1.4/input0
  ./name:USB Optical Mouse
  ./modalias:input:b0003v1BCFp0005e0110-e0,1,2,4,k110,111,112,113,114,r0,1,6,8,B,C,am4,lsfw
  </pre>
  </details>

### lsblk

* <details>
  <summary>
    <code>lsblk</code> (<i>list block</i>) permet de lister tous les appareils de type bloc (/dev/disk) et leurs partitions
  </summary>

  -o (<i>output</i>) pour sélectionner les colonnes à afficher

  <pre lang="bash">
  $ lsblk | grep -v ^loop
  NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
  nvme0n1     259:0    0   477G  0 disk 
  ├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
  └─nvme0n1p2 259:2    0 476,4G  0 part /
  </pre>

  <pre lang="bash">
  $ lsblk -o NAME,LOG-SEC,SIZE,TYPE,WWN,SERIAL,MODEL /dev/nvme0n1
  NAME        LOG-SEC   SIZE TYPE WWN                                  SERIAL               MODEL
  nvme0n1         512   477G disk eui.ace42e000613de752ee4ac0000000001    CD0BN57381090BC4A PC711 NVMe SK hynix 512GB               
  ├─nvme0n1p1     512   512M part eui.ace42e000613de752ee4ac0000000001                      
  └─nvme0n1p2     512 476,4G part eui.ace42e000613de752ee4ac0000000001     
  </pre>

  Liste des infos disponibles: <code>lsblk --help</code>
  </details>

* <details>
  <summary>
    On peut retrouver ces infos dans /sys/bloc
  </summary>

  <pre lang="bash">
  $ cat /sys/block/nvme0n1/size
  1000215216

  $ cat /sys/block/nvme0n1/queue/logical_block_size
  512

  $ echo $((1000215216*512))
  512110190592
  </pre>
  </details>

* <details>
  <summary>
    On peut également trouver la liste des disques et leurs identifiants dans /dev/disk
  </summary>

  <table>
    <tr>
      <th>Path</th>
      <th>Type d'identifiant</th>
    </tr>
    <tr>
      <td><code>/dev/disk/by-id</code></td>
      <td>World wide identifier (détecté en fonction de idVendor et idProduct)</td>
    </tr>
    <tr>
      <td><code>/dev/disk/by-uuid</code></td>
      <td>Identifiant contenu dans les métadonnées du disque</td>
    </tr>
    <tr>
      <td><code>/dev/disk/by-path</code></td>
      <td>Connexion au bus PCI</td>
    </tr>
  </table>

  <pre lang="bash">
  $ ls -l /dev/disk/*
  /dev/disk/by-id:
  total 0
  lrwxrwxrwx 1 root root 13 août  20 05:13 nvme-eui.ace42e000613de752ee4ac0000000001 -> ../../nvme0n1
  lrwxrwxrwx 1 root root 15 août  20 05:13 nvme-eui.ace42e000613de752ee4ac0000000001-part1 -> ../../nvme0n1p1
  lrwxrwxrwx 1 root root 15 août  20 05:13 nvme-eui.ace42e000613de752ee4ac0000000001-part2 -> ../../nvme0n1p2
  lrwxrwxrwx 1 root root 13 août  20 05:13 nvme-PC711_NVMe_SK_hynix_512GB__CD0BN57381090BC4A -> ../../nvme0n1
  lrwxrwxrwx 1 root root 15 août  20 05:13 nvme-PC711_NVMe_SK_hynix_512GB__CD0BN57381090BC4A-part1 -> ../../nvme0n1p1
  lrwxrwxrwx 1 root root 15 août  20 05:13 nvme-PC711_NVMe_SK_hynix_512GB__CD0BN57381090BC4A-part2 -> ../../nvme0n1p2

  /dev/disk/by-partlabel:
  total 0
  lrwxrwxrwx 1 root root 15 août  20 05:13 'EFI\x20System\x20Partition' -> ../../nvme0n1p1

  /dev/disk/by-partuuid:
  total 0
  lrwxrwxrwx 1 root root 15 août  20 05:13 0b57da2b-7f90-4b10-876d-94c60068e9f8 -> ../../nvme0n1p1
  lrwxrwxrwx 1 root root 15 août  20 05:13 b699d032-eea9-431b-bb02-6fb462db6192 -> ../../nvme0n1p2

  /dev/disk/by-path:
  total 0
  lrwxrwxrwx 1 root root 13 août  20 05:13 pci-0000:71:00.0-nvme-1 -> ../../nvme0n1
  lrwxrwxrwx 1 root root 15 août  20 05:13 pci-0000:71:00.0-nvme-1-part1 -> ../../nvme0n1p1
  lrwxrwxrwx 1 root root 15 août  20 05:13 pci-0000:71:00.0-nvme-1-part2 -> ../../nvme0n1p2

  /dev/disk/by-uuid:
  total 0
  lrwxrwxrwx 1 root root 15 août  20 05:13 28a25b21-4cc8-484e-bebe-1d133ce62468 -> ../../nvme0n1p2
  lrwxrwxrwx 1 root root 15 août  20 05:13 EB79-AAE8 -> ../../nvme0n1p1
  </pre>
  </details>

* <details>
  <summary>
    Et des statistiques sur les disques dans /proc/diskstats
  </summary>

  <pre lang="bash">
  $ cat /proc/diskstats | grep -v loop
   259       0 nvme0n1 387023 268602 9197522 37149 41051 43961 3142762 38483 0 66472 11876 0 0 0 0
   259       1 nvme0n1p1 1194 0 13376 1074 2 0 2 0 0 108 0 0 0 0 0
   259       2 nvme0n1p2 385736 268602 9179202 36048 40880 43961 3142760 38280 0 66368 11760 0 0 0 0
  </pre>
  </details>

---

## MAJ:MIN

* <details>
  <summary>
    On peut trouver à différents endroits un numéro majeur et mineur associé à chaque composant.
  </summary>

  <pre lang="bash">
  $ lsblk /dev/nvme0n1 -o NAME,MAJ:MIN
  NAME        MAJ:MIN
  nvme0n1     259:0  
  ├─nvme0n1p1 259:1  
  └─nvme0n1p2 259:2  
  </pre>

  <pre lang="bash">
  $ cat /sys$sysfs/mouse4/uevent
  MAJOR=13
  MINOR=36
  DEVNAME=input/mouse4
  </pre>
  </details>

<!-- -->

* Le numéro majeur identifie la classe du composant.  
  Et le numéro mineur est le numéro individuel du composant dans cette classe.

* <details>
  <summary>
    La liste complète des numéros majeurs est disponible dans /proc/devices
  </summary>

  <pre lang="bash">
  $ cat /proc/devices
  Character devices:
    1 mem
    4 tty
    6 lp
   13 input
      ...
  180 usb
  239 nvme

  Block devices:
    7 loop
    8 sd
   11 sr
      ...
  259 blkext
  </pre>
  </details>

* <details>
  <summary>
    On peut retrouver le périphérique dans /sys à partir de ces numéros
  </summary>

  <pre lang="bash">
  $ readlink -f /sys/dev/char/13:36
  /sys/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.4/1-1.4:1.0/0003:1BCF:0005.0005/input/input27/mouse4

  $ readlink -f /sys/dev/block/259:0
  /sys/devices/pci0000:00/0000:00:1d.4/0000:71:00.0/nvme/nvme0/nvme0n1
  </pre>
  </details>
