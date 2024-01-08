---
title: Utilisation des ressources système
category: Linux
---

## uptime

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
  <li>Le nombre actuel d'utilisateurs connectés</li>
  <li>La charge CPU pour les 1, 5 et 15 dernières minutes.<br>  
     Une charge moyenne de 1.0 signifie qu'un CPU core a été utilisé<br> à pleine capacité (autrement dit, à 100%) pendant une entière minute.<br><br>

     Pour un serveur web, on cherche à garder la moyenne sur 15 minutes inférieure ou égale à 1 — une moyenne supérieure est signe qu'il faut améliorer les performances, ou acquérir un processeur plus puissant.<br><br>

     Par exemple, si on a un système à 8 core, et qu'on observe cette moyenne: 6.0 0.31 0.18. 6 coeurs ont été utilisés intensément au cours de la dernière minute, mais les 5 et 15 dernières minutes les coeurs ont été à peine utilisé. Certains programmes ont travaillé dur pendant un temps très court, mais dans l'ensemble le système ne pousse pas trop le CPU et il n'y a pas d'inquiétude à avoir.<br>

     En revanche si on a: 6.12, 7.12, 7.30. Alors le système utilise les coeurs de manière intensive presque tout le temps. Il est temps de passer à un serveur plus puissant ou d'optimiser l'installation pour qu'elle nécessite moins de CPU.<br><br>
   </li>
  </ol>
  </details>

* <details>
  <summary>
    Depuis quand le système est en route (en secondes) se retrouve dans /proc/uptime
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

## df

* <details>
  <summary>
    <code>df</code> (<i>disk free</i>) retourne la quantité d'espace disque libre sur les différents systèmes de fichier
  </summary>

  -h (<i>human</i>) pour afficher la taille en format humain<br>
  -T (<i>type</i>) pour afficher le type de système de fichiers<br>
  -i (<i>inode</i>) pour afficher le nombre d'inodes libres. Si on a une application qui crée beaucoup de petits fichiers, il est possible d'atteindre la limite d'inodes sur le système de fichier. Il est donc important de vérifier également l'utlisation des inodes.<br><br>

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

## du

* <details>
  <summary>
    <code>du</code> (<i>disk usage</i>) permet d'évaluer l'espace disque occupé par un répertoire
  </summary>

  <br>
  La taille d'un répertoire affichée par <code>ls</code> est la taille des <ins>blocs de données</ins> occupés par le répertoire: c'est à dire la liste des noms de fichier présents à l'intérieur du répertoire et les numéros d'inode associés à ces fichiers. Si on s'intéresse à la taille des fichiers, alors il faut parcourir les métadonnées de chacun des fichiers — et ce récursivement s'il y a des sous-répertoires.<br><br>

  -h (<i>human</i>) pour afficher les tailles dans un format lisible par un humain (par exemple 1K, 234M, 5G)<br>  
  -x (<i>exclude</i>) pour exclure les répertoires qui sont des points de montage — par exemple si on veut estimer la taille de la racine /, on excluera /dev /proc /run /sys qui sont des sytèmes de fichiers virtuels<br>
  -s (<i>summary</i>) pour afficher seulement le total<br>  
  --inodes pour afficher le nombre d'inodes utilisées<br>
  --maxdepth=1 pour afficher le sous-total des fichiers présents dans le répertoire — et non la taille de tous les fichiers, récursivement
  <br>

  <pre lang="bash">
  $ sudo du --max-depth=1 -hx /
  9.2G  /usr
  4.0K  /srv
  48K /snap
  8.0K  /media
  15M /etc
  1.1G  /opt
  285M  /boot
  19G /var
  16K /lost+found
  4.0K  /mnt
  87G /home
  136K  /tmp
  1.7G  /root
  117G  /
  </pre>

  <pre lang="bash">
  $ pwd
  /home/am/Documents
  $ du -hs
  6,5G  .

  $ du -hs ../Images
  5,1M  ../Images
  </pre>

  <pre lang="bash">
  $ du -s --inodes
  64349 .
  </pre>
  </details>

## free

* <details>
  <summary>
    <code>free</code> permet d'afficher la quantité de RAM et de Swap disponible
  </summary>

  -h (<i>human</i>) pour afficher les tailles avec les unités Ki/Mi/Gi

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

  --mega pour afficher les tailles en mega
  <pre lang="bash">
  $ free --mega
                total        used        free      shared  buff/cache   available
  Mem:          16489        3428        8416        1832        4644       10886
  Swap:          4097           0        4097
  </pre>

  La colonne <ins>buffers/cache</ins> contient: la mémoire physique moins la mémoire utilisée par le noyau
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

## swapon

* <details>
  <summary><code>swapon</code> permet de lister les swap
  </summary>
  -s pour afficher les swaps actuellement activées

  <pre lang="bash">
  $ swapon
  NAME      TYPE SIZE USED PRIO
  /swapfile file   2G   0B   -2

  $ swapon -s
  Filename        Type    Size  Used  Priority
  /swapfile                               file      2097148 0 -2
  </pre>
  </details>

## top

* [`top`](process-list.md#top) permet de voir la liste des processus en temps réel, ainsi que d'effectuer des actions dessus.  
  C'est un des meilleurs outils pour surveiller les processus qui tournent.

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

## Pressure stall information (PSI)

* <details>
  <summary>
    En cas de ralentissement, on peut identifier quelles ressources sont les plus utilisées (CPU, RAM, I/O),<br> et donc savoir quel facteur est un bottleneck,
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

## lslocks

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

## lsof

* <details>
  <summary><code>lsof</code> (<i>list open file</i>) permet de lister les processus qui utilisent un fichier donné, système de fichiers donné,<br>  
  ou inversemment de lister les fichiers utilisés par un processus
  </summary>

  <pre lang="bash">
  # Liste des processus qui utilisent /var/log/messages
  $ sudo lsof /var/log/messages

  # Liste des processus qui utilisent sdb1
  $ lsof | grep sdb1

  # Liste des fichiers utilisés par le processus PID 8401
  $ lsof -p 8401
  </pre>

  <img src="https://i.imgur.com/DwxIoSr.png" />
  </details>

## strace

* <details>
  <summary><code>strace</code> affiche tous les appels système et signaux reçus par un processus.</summary>

  On peut soit lancer directement une commande:

  <pre lang="bash">
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
  access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or dire&lt;ctory)
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
  </pre>

  Ou alors spécifier le PID du processus:

  <pre lang="bash">
  $ strace -p 9604
  </pre>
  </details>

## systat

* Quelle que soit la quantité de RAM, un ordinateur a une quantité limitée de puissance de calcul, et cela va déterminer la limite de mémoire utilisable. Pour surveiller le CPU: top, htop

* Le stockage a également ses propres limites. Il ne s'agit pas que du nombre de gigaoctets de données stockables, mais aussi des opérations de lecture et écriture — chaque périphérique a des limites sur le nombre d'opérations qui peuvent effectuées sur une période donnée.
  Pour suivre les opérations d'entrées/sorties et voir quels processus lisent ou écrivent le plus sur un périphérique de stockage, et ainsi éventuellement résoudre des problèmes de performance, on peut utiliser iostat et pidstat.

* Ces deux utilitaires sont présents dans le package sysstat

  ```
  sudo apt install sysstat
  ```

### iostat

* <details>
  <summary><code>iostat</code> permet d'obtenir des statistiques d'entrées/sorties sur les périphériques de sockage,<br>  
  et ainsi d'identifier quel périphérique de stockage a un nombre élevé de lectures (sorties) et d'écritures (entrées).
  </summary>

  <pre lang="bash">
  $ iostat
  </pre>

  <img src="https://i.imgur.com/3QVUayA.png" />

  Les colonnes retournées sont:
  <ul>
  <li>tps (<i>transfers per second</i>): nombre de fois que le système a demandé à lire ou écrire</li>
  <li>kB_read/s: nombre total de kilo-octets lus par seconde</li>
  <li>kB_wrtn/s: nombre total de kilo-octets écrits par seconde</li>
  <li>kB_dscd/s: nombre total de kilo-octets rejetés en raison d'erreurs par seconde</li>
  </ul>
  <br>

  Par défaut, iostat retourne les statistiques depuis le démarrage de la machine, ce qui est rarement très utile — les chiffres sont brouillés par le fait qu'il s'agit d'une moyenne sur la durée de vie de la machine.  
  On peut passer un nombre en argument, pour récupérer les statistiques des N dernières secondes — et la commande sera répétée toutes les N secondes.

  <pre lang="bash">
  $ iostat 10
  </pre>

  <code>-d</code> permet d'enlever les statistiques avg-cpu (affichées au début).<br>
  <code>-h</code> de représenter les statistiques dans un format lisible par l'homme<br>
  <code>-p ALL</code> de lister les partitions et plus uniquement les disques<br>
  <code>-p vda</code> de filtrer sur les partitions du disque vda<br>
  </details>

### pidstat

* <details>
  <summary><code>pidstat</code> retourne des statistiques sur le nombre de lectures et écritures de chaque processus.<br>
  Permet ainsi d'identifier quels processus sont à l'origine d'un nombre élevé d'opérations I/O.</summary>

  <br>
  <pre>
  <img src="https://i.imgur.com/ca1kwGc.png" />
  </pre>

  Comme pour iostat, on peut ajouter un nombre en paramètres pour voir les N dernières secondes.
  <pre>
  <img src="https://i.imgur.com/AViv5gw.png" />
  </pre>
  </details>

<!-- -->

* Une fois qu'on a le PID du processus, on peut vérifier de quel procesuss il s'agit avec `ps`

  ``` bash
  $ ps 2999
     PID TTY   STAT TIME COMMAND
    2999 pts/0 D    0:11 dd if=/dev/zero of=DELETEME bs=1 count=1000000 oflag=dsync
  ```
