---
title: Priorité
category: Linux, Processus
---

## nice

* Quand un processus s'execute, il a besoin d'avoir accès au CPU pour effectuer des actions.  
  Si plusieurs applications sont en cours d'execution, alors elles doivent se partager le temps CPU.

  Pour gérer ce cas, on peut assigner des priorités aux processus, ce qui déterminera quels processus passerons en premier.
  Les processus système ont généralement la priorité la plus élevée.

* Un utilisateur peut influencer la priorité qu'il souhaite donner à un processus en définissant une valeur *nice* (gentillesse). L'échelle de "gentilesse" va de -20 à 19, où -20 sera la priorité la plus élevée (le processus demande à passer en premier) et 19 la priorité la plus basse (le processus est prêt à céder sa place). La valeur par défaut pour les processus utilisateurs est 0.

  Seul root peut définir des valeurs *nice* négatives ou modifier baisser celle d'un processus existant — autrement dit, donner une priorité plus élevé.
  Pour un utilisateur standard, le module PAM pam_limits.so (cf /etc/security/limits.conf) limite la valeur de nice à zéro. Il faut être identifié en tant que root pour définir des valeurs nice négatives.

* Par défaut, un processus hérite de la niceness du processus qui l'a déclenché

* Pour définir la valeur *nice* d'un processus, on lance la commande avec nice:

  ```
  $ nice -n 19 cat /dev/zero > /dev/null
  ```

* Il est possible d'omettre le -n et de passer en option la valeur nice.  
  Pour définir une valeur négative, il faudra ajouter deux tirets — un pour l'option, un pour le signe.  
  Cette syntaxe peut porter à confusion, il est donc conseillé de toujours utiliser -n

  ```
  # nice -15 sleep 10 &
  [1] 12978
  #
  # ps -l 12978
  F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY        TIME CMD
  0 S     0 12978 12898  0  95  15 -  8273 hrtime pts/0      0:00 sleep 10
  ```

  ```
  # nice --15 sleep 11 &
  [1] 13059
  #
  # ps -l 13059
  F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY        TIME CMD
  4 S     0 13059 12898  0  65 -15 -  8273 hrtime pts/0      0:00 sleep 11
  ```

## renice

* Pour modifier la valeur *nice* d'un processus existant, on utilise renice.  
  Cette commande est utile lorsque le système devient moins réactif après l'exécution d'une commande intensive en CPU. Un utilisateur peut rendre le système plus réactif en rendant ce processus "plus gentil".

  ```
  $ sleep 30 &
  [1] 13320
  $
  $ renice -n 5 13320
  13320 (process ID) old priority 0, new priority 5
  $ renice +5 13320
  13320 (process ID) old priority 5, new priority 5
  $
  $ ps -l 13320
  F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY        TIME CMD
  0 S     0 13320 12898  0  85   5 -  8273 hrtime pts/0      0:00 sleep 30
  ```

  Pour renice des processus par leur nom de commande, on peut utiliser pgrep:

  ```
  $ renice -n 10 -p $(pgrep firefox)
  ```

  Et pour renice tous les processus d'un utilisateur donné, on peut utiliser l'option -u:

  ```
  $ renice 20 -u username
  ```

* La commande `top` permet également de modifier la valeur nice  
  <kbd>r</kbd> pour renice (taper le PID puis la valeur nice)

## Priorité

* La priorité d'un processus est calculée en fonction de la valeur *nice* et de la politique d'ordonnancement qui s'applique. La priorité la plus basse passera en premier (par exemple, la priorité 0 passe avant la priorité 20) — c'est l'inverse de la manière dont un humain pense.

* Il y a différentes politiques de d'ordonnnancement (cf `chrt -m`):

  1. SCHED_OTHER: politique standard de partage du temps CPU en round-robin
  2. SCHED_BATCH: pour une exécution des processus de type "batch"
  3. SCHED_IDLE: pour l'exécution de tâches d'arrière-plan de très faible priorité
  4. SCHED_FIFO: politique du "premier entré, premier sorti"
  5. SCHED_RR: politique round-robin

  On peut classer ces politiques en 2 grands groupes:  
  les politiques d'ordonnancement normales (1 à 3)
  et les politiques en temps réel (4 et 5).

* <ins>Pour une politique d'ordonnancement normale</ins>:  
  la priorité (PR) est calculée à partir de la valeur *nice* (NI):

  ```
  PR = 20 + NI
  ```

  La valeur nice va de -20 à 19. Ainsi la priorité d'un programme utilisateur ira de 0 à 39.  
  Si la valeur nice est basse (-20), alors la tâche aura une valeur de priorité élevée (0) et le CPU la traitera dès qu'il en aura l'occasion. 

* <ins>Pour les processus en temps réel</ins>:  
  la priorité est calculée à partir de la *priorité en temps réel* (*real time priority*, rt_prior):

  ```
  PR = -1 - rt_prior
  ```

  Il est important de noter que la valeur *nice* n'est pas utilisée.  
  La valeur *rt prior* va de 1 à 99. Ainsi la priorité d'un processus en temps réel ira de -2 à -100 — et -100 est la priorité la plus élevée.

* Dans l'exemple ci-dessous, on peut voir que

  - pulseaudio, le daemon qui s'occupe du son, est un processus utilisateur — priorité entre 0 et 39
  - qu'il a la priorité par rapport à Xorg, le serveur graphique
  - que les processus en temps réel sont des processus lancés par root — priorité inférieure à 0, niceness non définie  
    Certains processus ont une priorité "rt", ce qui correspond à la priorité -100.

  ```
  top - 09:57:09 up  1:06,  1 user,  load average: 0,90, 0,77, 0,68
  Tasks: 296 total,   1 running, 226 sleeping,   0 stopped,   0 zombie
  %Cpu(s):  2,3 us,  2,0 sy,  0,0 ni, 95,2 id,  0,0 wa,  0,0 hi,  0,5 si,  0,0 st
  KiB Mem : 16078664 total, 10362108 free,  2855544 used,  2861012 buff/cache
  KiB Swap:  2097148 total,  2097148 free,        0 used. 12304548 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
   3373 am         9 -11 2931036  22764  18456 S  14,6  0,1   8:04.75 pulseaudio
   4344 am        20   0 3054576 326892 113472 S  14,6  2,0   5:56.51 Isolated Web Co
    978 root      20   0 1099840 159428 132072 S   7,0  1,0   3:25.20 Xorg
   3515 am        20   0  706876  58384  33552 S   5,0  0,4   0:03.65 guake
   3866 am        20   0 4202228 507792 181352 S   3,7  3,2   9:53.77 firefox
   4397 am        20   0  575272  55448  43808 S   3,3  0,3   4:41.50 RDD Process
   4982 am        20   0 5167384 561888 300624 S   3,0  3,5   1:50.04 thunderbird
   3441 am        20   0 1833524 180156 143624 S   2,3  1,1   1:37.96 gala
   4085 am        20   0 1195076 109348  45384 S   1,0  0,7   0:32.83 Main
    955 root      20   0 1422860  47736  26744 S   0,7  0,3   0:14.57 containerd
   3571 am        20   0 5285368 260508  70404 S   0,7  1,6   0:26.94 dropbox
   3312 am        20   0  471980  11320   8140 S   0,3  0,1   0:00.50 gsd-sharing
   4048 am        20   0 3003984 283228  89024 S   0,3  1,8   0:14.21 WebExtensions
   7108 am        20   0   70052   4180   3448 R   0,3  0,0   0:00.27 top
      1 root      20   0  225680   9340   6608 S   0,0  0,1   0:01.38 systemd
      2 root      20   0       0      0      0 S   0,0  0,0   0:00.01 kthreadd
      3 root       0 -20       0      0      0 I   0,0  0,0   0:00.00 rcu_gp
      4 root       0 -20       0      0      0 I   0,0  0,0   0:00.00 rcu_par_gp
      6 root       0 -20       0      0      0 I   0,0  0,0   0:00.00 kworker/0:0H-kb
      9 root       0 -20       0      0      0 I   0,0  0,0   0:00.00 mm_percpu_wq
     10 root      20   0       0      0      0 S   0,0  0,0   0:00.16 ksoftirqd/0
     11 root      20   0       0      0      0 I   0,0  0,0   0:03.43 rcu_sched
     12 root      rt   0       0      0      0 S   0,0  0,0   0:00.15 migration/0
     13 root     -51   0       0      0      0 S   0,0  0,0   0:00.00 idle_inject/0
     14 root      20   0       0      0      0 S   0,0  0,0   0:00.00 cpuhp/0
     15 root      20   0       0      0      0 S   0,0  0,0   0:00.00 cpuhp/1
     16 root     -51   0       0      0      0 S   0,0  0,0   0:00.00 idle_inject/1
     17 root      rt   0       0      0      0 S   0,0  0,0   0:00.13 migration/1
     18 root      20   0       0      0      0 S   0,0  0,0   0:00.12 ksoftirqd/1
     20 root       0 -20       0      0      0 I   0,0  0,0   0:00.00 kworker/1:0H-kb
     21 root      20   0       0      0      0 S   0,0  0,0   0:00.00 cpuhp/2
     22 root     -51   0       0      0      0 S   0,0  0,0   0:00.00 idle_inject/2
  ```

* Pour lancer un processus avec la politique SCHED_RR:

  ```
  chrt --rr RT_PRIOR ./myProgram
  ```
