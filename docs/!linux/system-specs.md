---
title: Ressources système et utilisation
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
    Le numéro majeur identifie la classe du composant.<br>  
    &emsp; Le numéro mineur est un numéro individuel dans cette classe.
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

* <details>
  <summary>
    La liste complète des numéros majeurs est dans /proc/devices
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
    On peut retrouver le phériphérique dans /sys à partir de ces numéros
  </summary>

  <pre lang="bash">
  $ readlink -f /sys/dev/char/13:36
  /sys/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.4/1-1.4:1.0/0003:1BCF:0005.0005/input/input27/mouse4

  $ readlink -f /sys/dev/block/259:0
  /sys/devices/pci0000:00/0000:00:1d.4/0000:71:00.0/nvme/nvme0/nvme0n1
  </pre>
  </details>

---

## Utilisation des ressources

### uptime

* <details>
  <summary>
    <code>uptime</code> retourne l'utilisation moyenne du CPU
  </summary>

  <pre lang="bash">
  $ uptime
   07:38:11 up  2:22,  1 user,  load average: 0.74, 0.78, 0.75
  </pre>

  Les informations retournées sont:
  <ol>
  <li>Depuis quand le système est en route</li>
  <li>Nombre actuel d'utilisateurs connectés</li>
  <li>Charge CPU pour les 1, 5 et 15 dernières minutes.<br>  
     Une charge moyenne de 1.0 en premier chiffre signifie qu'un coeur CPU a été utilisé à pleine capacité (autrement dit, à 100%) pendant une entière minute.

     Pour un serveur web, on cherche à garder la moyenne sur 15 minutes inférieure ou égale à 1 — une moyenne supérieure est signe qu'il faut améliorer les performances, ou acquérir un processeur plus puissant.

     Par exemple, si on a un système à 8 core, et qu'on observe cette moyenne: 6.0 0.31 0.18. 6 coeurs ont été utilisés intensément au cours de la dernière minute, mais les 5 et 15 dernières minutes les coeurs ont été à peine utilisé. Certains progrmmes ont travaillé dur pendant un temps très court, mais dans l'ensemble le système ne pousse pas trop le CPU et il n'y a pas d'inquiétude à avoir.

     En revanche si on a: 6.12, 7.12, 7.30. Alors le système utilise les coeurs de manière intensive presque tout le temps. Il est temps de passer à un serveur plus puissant ou d'optimiser l'installation pour qu'elle nécessite moins de CPU.
   </li>
  </ol>
  </details>

* <details>
  <summary>
    Depuis quand le système est en route (en secondes) se trouve dans /proc/uptime
  </summary>

  <pre lang="bash">
  $ cat /proc/uptime
  25024.70 175370.49
  </pre>
  </details>

* <details>
  <summary>
    La moyenne des charges CPU dans /proc/loadavg
  </summary>

  <pre lang="bash">
  $ cat /proc/loadavg 
  2.95 3.33 3.13 1/1481 22235
  </pre>
  </details>

* <details>
  <summary>
    Et le détail des charges CPU dans /proc/stat
  </summary>

  <pre lang="bash">
  $ cat /proc/stat
  cpu  1998213 1088 454598 17343534 6119 0 140147 0 0 0
  cpu0 274300 187 62809 2141069 636 0 49278 0 0 0
  cpu1 247879 168 52557 2172949 1185 0 43740 0 0 0
  cpu2 244614 118 44920 2186675 858 0 23137 0 0 0
  cpu3 245108 117 48412 2180788 543 0 12608 0 0 0
  cpu4 271052 93 101777 2104323 469 0 2868 0 0 0
  cpu5 239401 120 48608 2185256 721 0 3536 0 0 0
  cpu6 238473 140 47983 2181725 868 0 2426 0 0 0
  cpu7 237382 143 47529 2190746 835 0 2550 0 0 0
  intr 67899918 0 ...
  ctxt 251624301
  btime 1660965368
  processes 22119
  procs_running 7
  procs_blocked 0
  softirq 68205876 1987426 25210897 26 40038 3958 0 30455 27934750 349 12997977
  </pre>
  </details>

### df

* <details>
  <summary>
    <code>df</code> (<i>disk free</i>) retourne la quantité d'espace disque libre sur les différents systèmes de fichier
  </summary>

  -h (<i>human</i>) pour afficher la taille en format humain<br>
  -T (<i>type</i>) pour afficher le système de fichiers<br>
  -i (<i>inode</i>) pour afficher le nombre d'inodes libres<br><br>

  <pre lang="bash">
  $ sudo df -hT | grep -v loop
  Filesystem     Type      Size  Used Avail Use% Mounted on
  udev           devtmpfs  7,7G     0  7,7G   0% /dev
  tmpfs          tmpfs     1,6G  2,2M  1,6G   1% /run
  /dev/nvme0n1p2 ext4      468G  168G  277G  38% /
  tmpfs          tmpfs     7,7G  440K  7,7G   1% /dev/shm
  tmpfs          tmpfs     5,0M  4,0K  5,0M   1% /run/lock
  tmpfs          tmpfs     7,7G     0  7,7G   0% /sys/fs/cgroup
  /dev/nvme0n1p1 vfat      511M  6,2M  505M   2% /boot/efi
  tmpfs          tmpfs     1,6G  132K  1,6G   1% /run/user/1000
  overlay        overlay   468G  168G  277G  38% /var/lib/docker/overlay2/e453aa0329f34e92d831d85b79dfd381bf39b7f5508576ed4d3e259705bf50e7/merged
  </pre>

  Si vous avez une application qui crée beaucoup de petits fichiers, il est possible d'atteindre la limite d'inodes sur le système de fichier. Il est donc important de vérifier également l'uitlisation des numéros d'inode.

  <pre lang="bash">
  $ sudo df -hTi | grep -v loop
  Filesystem     Type     Inodes IUsed IFree IUse% Mounted on
  udev           devtmpfs   2,0M   620  2,0M    1% /dev
  tmpfs          tmpfs      2,0M  1,2K  2,0M    1% /run
  /dev/nvme0n1p2 ext4        30M  4,7M   26M   16% /
  tmpfs          tmpfs      2,0M    21  2,0M    1% /dev/shm
  tmpfs          tmpfs      2,0M     4  2,0M    1% /run/lock
  tmpfs          tmpfs      2,0M    18  2,0M    1% /sys/fs/cgroup
  /dev/nvme0n1p1 vfat          0     0     0     - /boot/efi
  tmpfs          tmpfs      2,0M    65  2,0M    1% /run/user/1000
  overlay        overlay     30M  4,7M   26M   16% /var/lib/docker/overlay2/e453aa0329f34e92d831d85b79dfd381bf39b7f5508576ed4d3e259705bf50e7/merged
  </pre>
  </details>

### du

* <details>
  <summary>
    <code>du</code> (<i>disk usage</i>) permet d'évaluer l'espace disque occupé par le contenu d'un répertoire
  </summary>

  La taille d'un répertoire affichée par <code>ls</code> est la taille des blocs de données occupés par le répertoire: c'est à dire les noms des fichier à l'intérieur du répertoire et leurs numéros d'inode. Si on s'intéresse à la taille des fichiers à l'intérieur, à alors il faut parcourir les métadonnées de chacun de ces fichiers — récursivement s'il y a des sous-répertoires.<br><br>

  -h (<i>human</i>) pour afficher les tailles dans un format lisible par un humain (par exemple 1K, 234M, 5G)<br>
  -s (<i>summary</i>) afficher seulement le total<br>  
  --inodes pour afficher le nombre d'inodes utilisées<br><br>

  <pre lang="bash">
  $ pwd
  /home/am/Documents
  $
  $ du -hs
  6,5G  .
  $
  $ du -hs ../Images
  5,1M  ../Images
  </pre>

  <pre lang="bash">
  $ du -s --inodes
  64349 .
  </pre>
  </details>

### free

* <details>
  <summary>
    <code>free</code> permet d'afficher la quantité de RAM et Swap disponible
  </summary>

  -h (<i>human</i>) pour afficher les tailles avec les unités Ki/Mi/Gi  
  --mega pour afficher les tailles en mega

  <pre lang="bash">
  $ free
                total        used        free      shared  buff/cache   available
  Mem:       16103192     3341228     8210348     1805932     4551616    10622644
  Swap:       4001276           0     4001276
  </pre>

  <pre lang="bash">
  $ free -h
                total        used        free      shared  buff/cache   available
  Mem:           15Gi       3.2Gi       7.8Gi       1.7Gi       4.3Gi        10Gi
  Swap:         3.8Gi          0B       3.8Gi
  </pre>

  <pre lang="bash">
  $ free --mega
                total        used        free      shared  buff/cache   available
  Mem:          16489        3428        8416        1832        4644       10886
  Swap:          4097           0        4097
  </pre>

  <ins>buffers/cache</ins>: est mémoire physique moins la mémoire utilisée par le noyau
  </details>

* <details>
  <summary>
    Les infos sur la RAM viennent de /proc/meminfo
  </summary>

  <pre lang="bash">
  $ head /proc/meminfo
  MemTotal:       16078664 kB
  MemFree:         6079848 kB
  MemAvailable:   12170444 kB
  Buffers:         2537444 kB
  Cached:          3052184 kB
  SwapCached:            0 kB
  Active:          5977168 kB
  Inactive:        1756400 kB
  Active(anon):    2637324 kB
  Inactive(anon):    81944 kB
  </pre>
  </details>

* <details>
  <summary>
    Et les infos sur la swap de /proc/swaps
  </summary>

  <pre lang="bash">
  $ cat /proc/swaps
  Filename        Type    Size  Used  Priority
  /swapfile                               file    2097148 0 -2
  </pre>
  </details>

### top

* <details>
  <summary>
    <code>top</code> est un des meilleurs outils pour surveiller les processus qui tournent.
  </summary>
  
  top affiche la charge du CPU et de la mémoire disponible (en haut) suivit de la liste des processus les plus coûteux.<br>
  Par défaut, les processus sont triés par utilisation du CPU. pppuyer sur la touche <kbd>m</kbd> permet de trier sur l'utilisation de la mémoire — appuyer sur la touche <kbd>m</kbd> quelques fois de plus pour revenir au tri par CPU.
  </details>

* <details>
  <summary>
    On peut obtenir plus d'infos sur l'ordonnancement des tâches avec /proc/schedstat et /proc/sched_debug
  </summary>

  <pre lang="bash">
  $ cat /proc/schedstat
  version 15
  timestamp 4301895034
  cpu0 0 0 0 0 0 0 4313400680257 144100158010 19213967
  domain0 11 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
  domain1 ff 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
  ...
  </pre>

  <pre lang="bash">
  $ less /proc/sched_debug
  ...
  runnable tasks:
   S           task   PID         tree-key  switches  prio     wait-time             sum-exec        sum-sleep
  -----------------------------------------------------------------------------------------------------------
   I         rcu_gp     3         7.951420         2   100         0.000000         0.000000         0.000000 0 0 /
   I     rcu_par_gp     4         9.951419         2   100         0.000000         0.000000         0.000000 0 0 /
   I   kworker/0:0H     6       976.318559         4   100         0.000000         0.016246         0.000000 0 0 /
   I   mm_percpu_wq     9        16.019073         2   100         0.000000         0.000000         0.000000 0 0 /
   S    ksoftirqd/0    10   9429869.229229    118126   120         0.000000      1571.669339         0.000000 0 0 /
   S    migration/0    12        22.019070      9416     0         0.000000       142.933381         0.000000 0 0 /
   S  idle_inject/0    13         0.000000         3    49         0.000000         0.000000         0.000000 0 0 /
   S        cpuhp/0    14      4245.887146        20   120         0.000000         0.653774         0.000000 0 0 /
   Secryptfs-kthrea   133       443.511345         2   120         0.000000         0.006355         0.000000 0 0 /
   I  kworker/u17:0   156   9428916.593716     98049   100         0.000000      2119.153064         0.000000 0 0 /
  </pre>
  </details>

### Pressure stall information (PSI)

* <details>
  <summary>
    En cas de ralentissement, on peut identifier quelles ressources sont le plus utilisées,<br>
    grâce aux fichiers qui se trouvent dans /proc/pressure
  </summary>

  <pre lang="bash">
  $ grep '' /proc/pressure/*
  /proc/pressure/cpu:some avg10=1.29 avg60=1.21 avg300=0.94 total=98164756
  /proc/pressure/io:some avg10=0.00 avg60=0.00 avg300=0.00 total=20132231
  /proc/pressure/io:full avg10=0.00 avg60=0.00 avg300=0.00 total=19390076
  /proc/pressure/memory:some avg10=0.00 avg60=0.00 avg300=0.00 total=0
  /proc/pressure/memory:full avg10=0.00 avg60=0.00 avg300=0.00 total=0
  </pre>

  Chaque fichier contient deux informations:

  <ul>
  <li>
    <ins>some</ins> indique le temps (en pourcentage) 
    pendant lequel une tâche a été retardée en raison d'un manque de ressources — comme un manque de mémoire.  
    Dans l'exemple suivant, la tâche A s'est exécutée sans retard pendant 60 secondes
    et la tâche B a dû attendre 30 secondes pour obtenir de la mémoire — soit 50% du temps<br>

    <img src="https://i.imgur.com/dMf1tRMm.png" alt="">
  </li>
  <li>
    <ins>full</ins> indique le temps (en pourcentage)  
    pendant lequel *toutes* les tâches sont restées en attente — donc la quantité de temps complètement inactif<br>

    <img src="https://i.imgur.com/OLFFoEwm.png" alt="">
  </li>
  </ul>

  <a href="https://utcc.utoronto.ca/~cks/space/blog/linux/PSICpuWhyNoFull">
    A realization about the Linux CPU pressure stall information
  </a>
  </details>

### lslocks

* <details>
  <summary>
    <code>lslocks</code> liste les processus ayant des verrous sur des fichiers
  </summary>

  <pre lang="bash">
  $ lslocks | head
  COMMAND           PID   TYPE SIZE MODE  M      START        END PATH
  systemd-timesyn   659  FLOCK      WRITE 0          0          0 /run...
  snapd            1046  FLOCK      WRITE 0          0          0 
  dropbox          3557  POSIX      READ  0        128        128 
  dropbox          3557  POSIX      WRITE 0 1073741824 1073741824 
  dropbox          3557  POSIX      WRITE 0 1073741826 1073742335 
  firefox          4240  POSIX      WRITE 0          0          0 
  thunderbird      5597  POSIX      WRITE 0 1073741826 1073742335 
  firefox          4240  POSIX      WRITE 0 1073741826 1073742335 
  firefox          4240  POSIX      WRITE 0 1073741826 1073742335 
  </pre>

* <details>
  <summary>
    L'information vient de /proc/locks
  </summary>

  <pre lang="bash">
  $ cat /proc/locks | head
  1: POSIX  ADVISORY  READ 12685 103:02:262185 128 128
  2: POSIX  ADVISORY  READ 12685 103:02:262274 1073741826 1073742335
  3: POSIX  ADVISORY  WRITE 5597 103:02:528205 1073741826 1073742335
  4: POSIX  ADVISORY  WRITE 5597 103:02:528222 1073741826 1073742335
  5: POSIX  ADVISORY  WRITE 5597 103:02:524354 1073741826 1073742335
  6: POSIX  ADVISORY  WRITE 5175 00:35:50 1 3
  7: POSIX  ADVISORY  WRITE 4240 103:02:7341331 1073741826 1073742335
  8: POSIX  ADVISORY  WRITE 5597 103:02:524361 1073741826 1073742335
  9: POSIX  ADVISORY  WRITE 5597 103:02:524358 1073741826 1073742335
  10: POSIX  ADVISORY  WRITE 5597 103:02:524345 1073741826 1073742335
  </pre>
  </details>
