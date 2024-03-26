---
title: Signaux
category: Linux, Processus
---

## Signaux

* Un *signal* est un code envoyé à un processus pour lui indiquer d'effectuer une action donnée — tel que s'arrêter, faire une pause ou reprendre. Certains signaux sont gérés par le processus, d'autres par le kernel.

* Chaque signal a un nom symbolique et un identificateur numérique. Par exemple, Ctrl+c est un raccourci clavier qui permet de terminer le processus en avant-plan: il envoie le signal SIGINT au processus (signal n°2), qui demande au processus de s'arrêter.

* Pour lister tous les signaux disponibles sur le système:

  ```
  $ kill -l
   1) SIGHUP   2) SIGINT   3) SIGQUIT  4) SIGILL   5) SIGTRAP
   6) SIGABRT  7) SIGBUS   8) SIGFPE   9) SIGKILL 10) SIGUSR1
  11) SIGSEGV 12) SIGUSR2 13) SIGPIPE 14) SIGALRM 15) SIGTERM
  16) SIGSTKFLT 17) SIGCHLD 18) SIGCONT 19) SIGSTOP 20) SIGTSTP
  21) SIGTTIN 22) SIGTTOU 23) SIGURG  24) SIGXCPU 25) SIGXFSZ
  26) SIGVTALRM 27) SIGPROF 28) SIGWINCH  29) SIGIO 30) SIGPWR
  31) SIGSYS  34) SIGRTMIN  35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
  38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
  43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
  48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
  53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
  58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
  63) SIGRTMAX-1  64) SIGRTMAX
  ```

  Pour voir la description de chaque signal: `man -s 7 signal`

* Les signaux les plus souvent utilisés sont:

  | Nom&nbsp;symbolique | ID | Description
  |---      |--- |---
  | SIGHUP  | 1  | (hang-up signal) Fin de connexion. Ce signal est envoyé automatiquement lors d'une déconnexion utilisateur. Il demande à tous processus associés au terminal de s'arrêter<br> Trigger: `exit`
  | SIGTERM | 15 | (termination signal) Graceful stop. Demande à un processus de s'arrêter. Le processus peut écouter ce signal pour supprimer des fichiers temporaires ou sauvegarder des données avant de s'arrêter. Le processus peut choisir d'ignorer ce signal et ne pas s'arrêter.<br> Trigger: `kill PID`, `kill -TERM PID`
  | SIGINT  | 2 | (interractive termination signal) Identique à SIGTERM mais déclenché à partir du terminal.<br> Trigger: Ctrl+c
  | SIGQUIT | 3  | (dump core signal) Génère un fichier core dump avant de demander l'arrêt du processus. Les fichiers core dump contiennent une copie de la mémoire vive et des registres d'un processeur à un instant donné, ce qui permet aux developpeurs de debugger un script posant problème. Ceux-ci étant inutiles pour un utilisateur lambda et relativement lourds, ils sont par défaut désactivés: ainsi SIGQUIT et SIGTERM effectuent par défaut la même action.<br> Trigger : ctrl+\\
  | SIGKILL | 9  | (kill) Tue le processus. Ce signal est géré par le kernel, le processus ne peut donc pas l'ignorer: toutes les ressources accordées au processus sont simplement désallouées, ce qui est l'équivalent d'un arrêt à chaud — aucune donnée ne pourra être sauvegardée.<br>Parfois, un processus ignore le signal SIGTERM ou ne parviens pas à se terminer: dans ce cas, seul le signal SIGKILL mettra fin au processus.<br> Trigger: `kill -KILL PID`
  | | |
  | SIGSTOP | 19 | (stop signal) Stoppe temporairement le processus. Ce signal est géré par le kernel et ne peut donc pas être ignoré par le processus: il cesse de recevoir du temps CPU, et est donc effectivement en pause.<br> Trigger: `kill -STOP PID`
  | SIGTSTP | 20 | (interractive stop signal) Identique à SIGSTOP mais déclenché à partir du terminal.<br> Trigger: Ctrl+z
  | SIGCONT | 18 | (continue) Permet de reprendre un processus précédemment stoppé.<br> Trigger: `fg %NUM; bg %NUM`, `kill -CONT PID`

## nohup

* Quand on ferme un terminal, toutes les commandes associées à ce terminal reçoivent le signal SIGHUP: ainsi, tous les processus en arrière-plan lancés dans le terminal en cours vont être terminés.

  Pour qu'un processus ignore le signal SIGHUP, on peut utiliser la commande `nohup`: cela permettra au processus  de continuer de tourner après que l'utilisateur se soit déconnecté du terminal. Notons que nohup redirige les sorties de la commande vers un fichier nohup.out dans le répertoire en cours.

  ```
  $ nohup sleep 42000 &
  [1] 22250
  nohup: ignoring input and appending output to 'nohup.out'

  $ jobs -l
  [1] + 2250 Running                        nohup sleep 42000 &
  ```

## kill

* La commande `kill` permet d'envoyer un signal à un processus  
  Si le signal n'est pas spécifié, kill envoit par défaut le signal SIGTERM

  * Il y a 3 manières possibles de spécifier le signal:

    - utiliser le numéro de signal: `2`
    - utiliser le nom symbolique: `SIGINT`
    - ou le nom court: `INT`

  * Le processus peut être désigné par son PID, `-p` suivit du PID ou `%` suivit du numéro du job

  ```
  $ kill -2 %1
  $ kill -2 4767
  $ kill -2 -p 4767
  ```

* La commande `top` permet également d'envoyer un signal à un processus  
  <kbd>k</kbd> pour kill, et taper le PID puis le signal à envoyer

## killall

* killall permet d'envoyer un signal à un processus en le désignant par son nom  
  Comme kill, killall envoie le signal SIGTERM par défaut.

  ```
  $ sleep 3000 &
  $ sleep 6000 &
  $ jobs -l
  [1]  2010 Running                        sleep 3000 &
  [2]- 2019 Running                        sleep 6000 &

  $ killall sleep
  sleep(2125): Operation not permitted
  [1]- Terminated                    sleep 3000 &
  [2]+ Terminated                    sleep 6000 &
  ```

  Notons le "Operation not permitted": killall a tenté d'envoyer le signal à chaque processus exécutant la commande sleep. Un de ces processus ne s'est pas terminé parce qu'il s'agit d'un processus système et que killall ne s'exécutait pas avec les droits super-utilisateur. Cela montre qu'il faut utiliser killall avec prudence.

## pkill

* Comme pgrep, pkill permet de chercher un processus en utilisant différents critères (utilisateur, terminal, nom de commande, etc) et d'envoyer un signal aux processus correspondants.

  ``` bash
  # Lister tous les processus déclenchés par le processus 2250 (-g 2250)
  # et afficher le nom de la commande (-a)
  $ pgrep -ag 2250
  2250 sleep 42000
  $
  # Tuer tous les processus déclenchés par le processus 2250
  $ pkill -15 -g 2250
  ```
