---
title: Lister les processus
category: Linux, Applications
---

## /proc

* Une fonction clé du kernel est de gérer les processus — c'est lui qui s'occupe d'allouer les accès au CPU, la RAM, le disque, les interfaces réseaux ou encore les périphériques.

* Le kernel fournit un accès aux informations sur les processus actifs via le répertoire `/proc`.  
  On y trouve notamment la liste des ID processus (PID):

  ```
  $ ls -l /proc | head
  total 0
  dr-xr-xr-x  9 root root 0 avril 29 09:44 1
  dr-xr-xr-x  9 root root 0 avril 29 07:44 10
  dr-xr-xr-x  9 root root 0 avril 29 08:06 1008
  dr-xr-xr-x  9 root root 0 avril 29 08:06 1011
  dr-xr-xr-x  9 root root 0 avril 29 08:06 1013
  dr-xr-xr-x  9 root root 0 avril 29 08:06 1015
  dr-xr-xr-x  9 root root 0 avril 29 08:06 1017
  dr-xr-xr-x  9 root root 0 avril 29 07:44 1020
  dr-xr-xr-x  9 root root 0 avril 29 07:44 11
  ```

* /proc est un *pseudo-système de fichiers*: les fichiers qu'il contient n'existent pas sur le disque, uniquement en RAM — ce qui permet d'accéder à ces données très rapidement. Chaque fois que le système redémarre, ces fichiers doivent être reconstruits.

* Certaines commandes permettent de visualiser les informations présentes dans /proc de manière plus digestible — notamment `top`, `free`, `mount`.

## pstree

* Lorsqu'un processus démarre un autre processus, on parle de processus *parent* et *enfant*.  
  Le processus d'initialisation (init ou systemd) est le premier processus lancé par le système d'exploitation: c'est le parent de tous les processus du système.

* `pstree` permet de visualiser la hiérarchie des processus dans un arbre

  ```
  $ pstree
  systemd─┬─Main───4*[{Main}]
          ├─Main───5*[{Main}]
          ├─ModemManager───2*[{ModemManager}]
          ├─NetworkManager─┬─dhclient
          │                └─2*[{NetworkManager}]
          ├─accounts-daemon───2*[{accounts-daemon}]
          ├─acpid
          ├─agetty
          ├─avahi-daemon───avahi-daemon
          ├─colord───2*[{colord}]
          ├─containerd───19*[{containerd}]
          ├─cron
          ├─cups-browsed───2*[{cups-browsed}]
          ├─cupsd
          ├─dbus-daemon
          ├─dockerd───37*[{dockerd}]
          ├─dropbox───82*[{dropbox}]
  ```

## ps

* `ps` est autre manière de visualiser les processus en cours  
  Par défaut, seuls les processus associés au terminal en cours sont affichés.

  ```
  $ ps
    PID TTY         TIME CMD
   1668 tty2    00:00:00 bash
   1729 tty2    00:00:00 ps
  ```

  | Colonne | Indique
  |---      |---
  | PID     | (processus identifier) Le numéro d'identification du processus.<br> Le premier processus lancé (init) aura l'id 1.
  | TTY     | (teletypewriter) Le terminal à partir duquel les programmes sont exécutés.<br> S'il y a un point d'interrogation (?), c'est que le processus n'est associé à un terminal — typiquement il s'agit de services exécutés par le système, comme le network manager.
  | TIME    | La quantité de temps CPU utilisé par le programme depuis son lancement.
  | CMD     | (command) Le nom du programme en cours d'exécution. Certains processus sont placés entre crochets: il s'agit de processus noyau, qui s'exécutent dans une zone privilégiée. On n'a généralement pas besoin d'interagir avec eux car le noyau les gère en interne, et on ne s'occupe que des processus qui s'executent en dehors de cette zone privilégiée, appelé l'espace utilisateur

  ps supporte des options style Unix (avec un tiret) ou BSD (sans tiret).  
  Suivant le style, les effets seront complètement différents: par exemple -a est différent de a.

* `ps -elf` (every long full) permet de voir tous les processus en format long  

  ```
  $ ps -elf | head
  F S UID        PID  PPID  C PRI  NI ADDR SZ WCHAN  STIME TTY          TIME CMD
  4 S root         1     0  0  80   0 - 56386 -      08:42 ?        00:00:01 /sbin/init splash
  1 S root         2     0  0  80   0 -     0 -      08:42 ?        00:00:00 [kthreadd]
  1 I root         3     2  0  60 -20 -     0 -      08:42 ?        00:00:00 [rcu_gp]
  1 I root         4     2  0  60 -20 -     0 -      08:42 ?        00:00:00 [rcu_par_gp]
  1 I root         6     2  0  60 -20 -     0 -      08:42 ?        00:00:00 [kworker/0:0H-kb]
  1 I root         9     2  0  60 -20 -     0 -      08:42 ?        00:00:00 [mm_percpu_wq]
  1 S root        10     2  0  80   0 -     0 -      08:42 ?        00:00:00 [ksoftirqd/0]
  1 I root        11     2  0  80   0 -     0 -      08:42 ?        00:00:21 [rcu_sched]
  1 S root        12     2  0 -40   - -     0 -      08:42 ?        00:00:00 [migration/0]
  ```

  | Colonne | Indique
  |---      |---
  | F       | (flags)<br>1 = Forké mais non executé<br>4 = Utilise les droits super-utilisateur<br>0 = Ni l'un ni l'autre<br>5 = Les deux
  | S       | (state) État du processus
  | PPID    | PID du processus parent
  | UID     | Utilisateur au nom duquel le processus s'execute
  | GID     | Groupe auquel le processus est associé
  | C       | Utilisation du CPU: cputime/realtime
  | PRI     | Priorité — entre 0 et -100
  | NI      | Nice — entre -20 et 19
  | SZ      | (size) Taille du processus en RAM. Inclut le texte, les données et l'espace de la pile
  | WCHAN   | Nom de la fonction du noyau dans laquelle le processus est en attente.<br>"-" si le processus est en cours d'exécution.<br>"\*" si c'est un processus multi-thread

* `ps aux` permet de voir tous les processus en format long de manière un peu différente.  
  - a pour afficher les processus de tous les utilisateurs
  - x pour afficher les processus qui ne sont pas associés à un terminal
  - u pour le format orienté-utilisateur

  ```
  $ ps ax | head
    PID TTY      STAT   TIME COMMAND
      1 ?        Ss     0:01 /sbin/init splash
      2 ?        S      0:00 [kthreadd]
      3 ?        I<     0:00 [rcu_gp]
      4 ?        I<     0:00 [rcu_par_gp]
      6 ?        I<     0:00 [kworker/0:0H-kb]
      9 ?        I<     0:00 [mm_percpu_wq]
     10 ?        S      0:00 [ksoftirqd/0]
     11 ?        I      0:15 [rcu_sched]
     12 ?        S      0:00 [migration/0]

  $ ps aux | head
  USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
  root         1  0.0  0.0 225544  9260 ?        Ss   08:42   0:01 /sbin/init splash
  root         2  0.0  0.0      0     0 ?        S    08:42   0:00 [kthreadd]
  root         3  0.0  0.0      0     0 ?        I<   08:42   0:00 [rcu_gp]
  root         4  0.0  0.0      0     0 ?        I<   08:42   0:00 [rcu_par_gp]
  root         6  0.0  0.0      0     0 ?        I<   08:42   0:00 [kworker/0:0H-kb]
  root         9  0.0  0.0      0     0 ?        I<   08:42   0:00 [mm_percpu_wq]
  root        10  0.0  0.0      0     0 ?        S    08:42   0:00 [ksoftirqd/0]
  root        11  0.0  0.0      0     0 ?        I    08:42   0:15 [rcu_sched]
  root        12  0.0  0.0      0     0 ?        S    08:42   0:00 [migration/0]
  ```

  | Colonne | Indique
  |---      |---
  | RSS |  (resident set size) Mémoire physique qu'une tâche a utilisé (en kb, et sauf swap)
  | VSZ  | (virtual memory size) Taille de la mémoire virtuelle (en KiB)
  | CPU | 100% signifie que la capacité totale d'un coeur est utilisé. 150, qu'un coeur entier est utilisé, mais aussi 50% de la capacité d'un second coeur
  | TIME | Temps d'utilisation du processus. Un processus démarré il y a 6 heures peut n'avoir utilisé que 3 secondes de temps CPU pendant sa durée de vie: le reste du temps il est resté dans un état dormant, utilisant 0% du CPU. Pour obtenir 1 seconde de temps, le processus doit utiliser 100% d'un coeur pendant 1 seconde, s'il utilise 50% pendant 10 secondes, on obtiendra dans cette colonne 5 secondes

* L'option BSD `o` permet de choisir les colonnes à afficher

  ```
  $ ps o pid,ppid,pgid,sid,comm
   PPID   PID  PGID   SID COMMAND
   3515  3611  3611  3611 bash
   3611 14001 14001  3611 ps
  ```

  ```
  $ echo 'sleep 30 &' > myScript.sh
  $ . myScript.sh
  $
  $ ps o ppid,pid,pgid,sid,comm
   PPID   PID  PGID   SID COMMAND
   3515  3611  3611  3611 bash
   3611 14452 14452  3611 sleep
   3611 14465 14465  3611 ps
  ```

  | Colonne | Indique
  |---      |---
  | SID     | (session id) PID du leader de session.<br> Les sessions (et groupes) sont des moyens pour traiter un ensemble de processus liés comme une unité. Normalement, un shell sera le leader de session et chaque processus exécuté par ce shell sera un groupe de processus. Cela permet de facilement stopper les enfants d'un shell lorsqu'il se termine. Si PID = SID, alors il s'agit du leader de session.
  | PGID    | (process group id) PID du leader du groupe de processus.<br> Un groupe de processus est une association définie par le shell pour que le kernel connaisse un seul processus d'avant-plan, gérant un ensemble de processus d'arrière-plan — ce qui est important si les processus d'arrière-plan souhaitent lire à partir de l'entrée standard. Si PID = PGID, alors il s'agit du leader du groupe.

## État d'un processus

* Les différents états possibles sont:
  * <ins>R: (running)</ins> en cours d'execution

  * <ins>S: (sleeping)</ins> attente interruptible  
    Typiquement en attente d'un événement, comme une entrée de l'utilisateur

  * <ins>I: (idle)</ins> attente non interruptible  
    Utilisé par les processus kernel en attente d'événement

  * <ins>D: (dormant)</ins> attente non interruptible  
    Typiquement en attente d'entrée/sortie. On ne peut pas arrêter un processus dans un état dormant: il faut attendre qu'il reprenne ou alors redémarrer le système. Il est normal de voir des processus dans cet état quand de nombreuses opérations d'entrée/sortie sont effectuées, par exemple quand on utilise la swap.

  * <ins>T: (terminated)</ins> mis en pause par le signal TERMINATE  
    t: mis en pause par le debugger pendant un dump

  * <ins>Z: (zombie)</ins> un processus stoppé non acquitté par son parent, il est donc ni mort ni vivant.  
    Lorsqu'un processus se termine, le système désalloue les ressources du processus mais ne détruit pas son bloc de contrôle: il passe son état à la valeur TASK_ZOMBIE et envoie le signal SIGCHLD au processus parent pour l'informer que son enfant a fini de s'executer. Quand le processus parent a récupéré le statut de sortie de son enfant (avec wait ou waitpid), alors le processus est définitivement supprimé de la table des processus.

    Il existe un bug classique dans le développement de programme UNIX: un processus crée des enfants, mais n'attend pas leurs valeurs de retours. Ces enfants resterons donc sous forme de zombies tant que le processus parent n'a pas fini de s'exécuter. Étant donné que les processus zombies ne peuvent pas être supprimés par les méthodes classiques (y compris pour les utilisateurs privilégiés), le système se retrouve alors encombré de processus achevés (« morts ») mais encore visibles. Ils ne consomment pas plus de ressources systèmes que les quelques octets de mémoire occupés par le bloc de contrôle dans la table des processus, mais le nombre de processus étant limité par le nombre possible de PID, un trop grand nombre de zombies peut empêcher le système de créer de nouveaux processus. Cette métaphore de horde de processus défunts, impossibles à tuer car déjà morts, est à l'origine du terme de « zombie ». 

    La seule manière d'éliminer ces processus zombies est de causer la mort du processus parent, par exemple en lui envoyant SIGKILL. Les processus enfants sont alors automatiquement rattachés au processus n°1, généralement init, qui se charge à la place du parent d'origine d'appeler wait sur ces processus. Si ce n'est pas le cas, c'est que init est défaillant (ou que le processus n°1 n'est pas init, mais un autre programme qui n'a pas été prévu pour): en dernier recours, le seul moyen de se débarrasser des zombies, c'est de redémarrer le système.

* Quand on utilise le format BSD, l'état du processus peut être accompagné de caractères supplémentaires:

  * <ins><: (not nice)</ins> valeur nice inférieure à 0
  * <ins>N: (nice)</ins> valeur nice supérieure à 0
  * <ins>L: (lock)</ins> a des pages verrouillées en mémoire (temps réel et entrées-sorties personnalisées)
  * <ins>s: (session lead)</ins> est un leader de session
  * l: est multi-threadé (en utilisant CLONE_THREAD, comme le font les threads NPTL)
  * +: est un processus en avant-plan

  ``` bash
  $ ps o pid,ppid,pgid,sid,stat,ni,pri,comm x
      PID    PPID    PGID     SID STAT  NI PRI COMMAND
     2085       1    2085    2085 Ss     0  19 systemd
     2086    2085    2085    2085 S      0  19 (sd-pam)
     2092    2085    2092    2092 S<sl -11  30 pulseaudio
  ```

* Si on connaît déjà le PID du processus, on peut simplement l'utiliser en option pour avoir plus d'infos

  ``` bash
  $ ps u 1
  USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
  root           1  0.0  0.0 168428 11744 ?        Ss   06:15   0:00 /sbin/init splash
  ```

* Pour afficher les processus démarrés par un utilisateur donné, on utilise -u suivit du nom de l'utilisateur

  ``` bash
  $ ps -u $USER
      PID TTY          TIME CMD
     1837 ?        00:00:00 systemd
     1838 ?        00:00:00 (sd-pam)
     1844 ?        00:05:09 pulseaudio
     1847 ?        00:00:00 gnome-keyring-d
  ```

## top

* `top` permet de voir la liste des processus en temps réel, ainsi de d'effectuer des actions dessus.  
  <kbd>Shift</kbd>+<Kbd>l</kbd> pour chercher un processus par son nom (taper le nom de la commande puis Entrée)  
  <kbd>h</kbd> pour afficher tous les raccourcis clavier supportés par top.

  ```
  top - 17:45:35 up  9:03,  1 user,  load average: 0,50, 1,19, 1,53
  Tasks: 294 total,   1 running, 223 sleeping,   0 stopped,   0 zombie
  %Cpu(s):  1,0 us,  0,9 sy,  0,0 ni, 98,0 id,  0,0 wa,  0,0 hi,  0,1 si,  0,0 st
  KiB Mem : 16078664 total,  9373144 free,  2482056 used,  4223464 buff/cache
  KiB Swap:  2097148 total,  2097148 free,        0 used. 12811504 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
   8290 am        20   0 2842052 167356 110700 S   8,0  1,0  33:02.37 Isolated Web Co
   3353 am         9 -11 3455856  32124  27252 S   5,6  0,2  27:58.87 pulseaudio
   6102 am        20   0 4571756 621800 239852 S   3,0  3,9 126:04.48 firefox
   6406 am        20   0  703820  71200  58712 S   2,3  0,4  34:11.21 RDD Process
    996 root      20   0 1060908 163204 131340 S   1,7  1,0  29:01.53 Xorg
   3509 am        20   0  708252  60448  33860 S   1,7  0,4   0:17.85 guake
   3426 am        20   0 1833060 183068 135812 S   0,7  1,1  15:42.91 gala
   3571 am        20   0 5286648 263568  69756 S   0,7  1,6   2:44.83 dropbox
   3853 am        20   0 1324852 105824  45448 S   0,7  0,7   4:04.74 Main
  21830 am        20   0   70012   4404   3512 R   0,3  0,0   0:00.25 top
      1 root      20   0  225544   9260   6660 S   0,0  0,1   0:01.79 systemd
      2 root      20   0       0      0      0 S   0,0  0,0   0:00.05 kthreadd
  ```

  Par défaut, top réordonne constamment les processus pour afficher les plus gourmands en CPU en haut de la liste

* On peut scroller parmi la liste de résultats à l'aide des flèches.

## pgrep

* `pgrep` permet de chercher un PID en utilisant différents critères  
  L'option -a permet d'afficher le nom de la commande en plus du PID

  Par exemple pour filtrer par:

  - nom de commande
    ```
    $ pgrep firefox
    3908
    ```

  - utilisateur
    ```
    $ pgrep -u christine
    1668
    ```
    ```
    $ pgrep -au christine
    1668 —bash
    ```

  - terminal
    ```
    $ pgrep -at tty2
    1668 —bash
    ```

  - groupe de processus
    ```
    $ pgrep -ag 2250
    2250 sleep 42000
    ```

## lsof

* lsof (*list open file*) permet de lister les fichiers ou répertoires utilisés par un processus

  ```  bash
  # Fichiers utilisés par le processus PID 8401
  $ lsof -p 8401
  ```

* Ou de lister les processus utilisant un fichier

  ``` bash
  $ sudo lsof /var/log/messages
  ```

  ![](Screenshot from 2023-05-01 08-11-50.png)

---

## Locate and analyze system log files

* The Linux kernel and most programs that run on it generate status messages, error messages, warnings and so on. And there can be tens of different programs generating all these messages all the time. So we need a way to collect all of these and organize them nicely in the files. 

  This is the job of logging daemons — applications that collect, organize and store logs.

* The most popular one on Linux is rsyslog.  
  Its name comes from Rcoket Fast System for log processing

  rsyslog stores all logs in the /var/log directory. Most of these files cannot be read by regular users, so before diving into log files, you might want to log in as the root user

* Say you have no idea where ssh logs are stored — to see who logged in through ssh.   
  You can search through the files for a line that contain SSH. This tells use that ssh logs are stored in the /var/log/secure file

  ``` bash
  grep -r ssh /var/log
  ```

  ![](Screenshot from 2023-05-01 08-57-47@2x.png)

* Most of the time, you'll look at logs to see what happened in the past, but sometimes you'll also want to take a look at what is currently happening. You can get a live view of a log file and see log entries as soon as they appear with this command:

  ``` bash
  $ tail -F /var/log/secure
  ```

  -F makes tail enter follow mode

* Modern Linux operating systems started using an additional way to keep track of logs: the journal daemon is a bit smarter at how it collects this data and the journalctl command lets us analyze logs more efficiently — for example filter logs generated by a specific command

  To show logs generated by the sudo command:

  ``` bash
  journalctl /bin/sudo
  ```

  To show logs generated by the sshd service (-u for unit file):

  ``` bash
  journalctl -u sshd.service
  ```

  ![](Screenshot from 2023-05-01 09-19-35@2x.png)

  Show all logs collected by the journal daemon:

  ``` bash
  journalctl
  ```

  To go to the end of the output: >

  To open the journal and instantly go to the end of the output (end):

  ``` bash
  journalctl -e
  ```

  Journalctl also has a follow mode:

  ``` bash
  journalctl -f
  ```

* Most logs are just informative, but some are warnings about other things not going quite well, errors about thing that fails, and others are huge alarm signals about things going critically wrong. These are tagged as info, warning, error and crit.

  We can use the -p (priority)

  ``` bash
  journalctl -p err
  ```

  The list of priorities that we can use are: alert, create, debug, emerge, err, info, notice and warning. If you forget this list:

  ``` bash
  journalctl -p <TAB><TAB>
  ```

* We can also use grep expressions to filter output with the -g option.

  ``` bash
  journalctl -p info -g '^b'
  ```

* Or tell journal to only display logs recorded after a certain time with -S (since)

  ``` bash
  journalctl -S 02:00
  journalctl -S '2021-11-16 12:04:55'
  ```

  Or before a certain time with -U (until)

  ``` bash
  journalctl -S 01:00 -U 02:00
  ```

* We usually want to see logs since the system was last powered on, and logs for our current boot

  To see logs for the current boot:

  ``` bash
  journalctl -b 0
  ```

  To see logs for the previous boot:

  ``` bash
  journalctl -b -1
  ```

* By default, this journal is only kept in memory. It means when you reboot or power off, logs in this journal are lost. To make the journal name and save its journals to disk, you can create this directory:

  ``` bash
  mkdir /var/log/journal/
  ```

  It's also worth noting that using the journatctl command requires you to be logged in as root or be in the wheel group

* lastlog this shows you when each user on the system logged in the last time. For remote log ins (ie through SSH) you can see the IP address from which they logged in