---
title: Tâches planifiées
category: Linux
---

## Tâches planifiées

* Les serveurs ont parfois besoin d'exécuter certaines tâches automatiquement. Par exemple, une tâche qui sauvegarde automatiquement la base de données tous les dimanches à 3 heures du matin.

* Sous Linux, il y a 3 principaux moyens d'y parvenir:

  1. l'utilitaire cron. Il est adapté aux tâches répétives qui s'exécutent toutes les quelques minutes ou heures, voire quelques jours. Il permet également aux administrateurs de choisir l'heure exacte à laquelle les tâches autmatiques doivent être exécutées

  2. l'utilitaire anacron. Il est également utilisé pour créer des tâches répétivies, mais la plus petite unité avec laquelle anacron peut travailler est la journée: il permet d'exécuter des tâches de manière répétée tous les jours, tous les quelques jours, semaines, mois, etc — mais pas toutes les quelques minutes ou heures.

      Cet utilitaire a crée parce que cron peut manquer des tâches si l'ordinateur est éteint. Par exemple, si une tâche est définie pour tourner à minuit, et que l'ordinateur est allumé à minuit une, alors la tâche ne sera pas exécutée ce jour-là. À contrario, Anacron vérifiera les tâches du jour et, si elle n'a pas été exécutée, l'exécutera — quelle que soit l'heure à laquelle le système a été mis sous tension

  3. l'utilitaire at. Anacron et cron sont tous deux axés sur les tâches automatisées répétitives, tandis que at est axé sur les tâches qui ne doivent être exécutées qu'une seule fois.

---

## at

* La commande `at` permet de planifier une tâche à une date ultérieure.  
  Cette tâche peut être une simple commande, une série de commandes ou un script shell.

### Ajouter une tâche
 
* Pour planifier une tâche,

  - taper `at` suivit du moment à laquelle la tâche doit être planifiée
  - taper entrée pour l'exécuter, un prompt s'ouvre pour entrer les commandes à lancer
  - taper les commandes à exécuter, puis Ctrl+D pour quitter l'édition

  ```
  $ at now
  at> df
  at> <EOT>
  job 6 at Tue Aug 17 11:29:00 2021
  $
  ```

### Date

La tâche peut être programmée

* à un temps donné. Si on spécifie uniquement le temps sans spécifier la date et que ce temps est déjà dépassé, alors la tâche sera lancée le lendemain au temps stipulé. Les formats de temps acceptés sont:

  | Format | Exemple
  |--- |---
  | Temps militaire | `13:25`
  | Temps AM / PM | `1:25 PM`
  | Mots-clés | `noon` (12:00 AM), `midnight` (00:00), `teatime` (4:00 PM)

    ``` bash
    $ at 15:00
    > /usr/bin/touch file
    ```

* à une date donnée. Les formats de date acceptés sont:

  | Format | Exemple
  |--- |---
  | Mois et jour | `June 19`
  | MMDDYY | `061922`
  | MM/DD/YYY | `06/19/22`
  | YY-MM-DD | `22-06-19`
  | Mots-clés | `now`, `today`, `tomorrow`

    ``` bash
    $ at 'August 20 2022'
    $ at '2:30 August 20 2022'
    ```

* à un temps relatif: <ins>at [date/time] + [n] [unit]</ins>
  Par exemple `at today + 3 hours`  
  Les unités possibles sont: minutes, hours, days, weeks

    ``` bash
    $ at 'now + 30 minutes'
    $ at 'now + 3 hours'
    $ at 'now + 3 days'
    $ at 'now + 3 weeks'
    $ at 'now + 3 months'
    ```

### Sortie

* Si la sortie de la commande n'est pas spécifiée, alors le résultat est envoyé par mail.

  ![](https://i.imgur.com/0zACKFS.png)

### Lister

* La commande `atq` ou `at -l` permet de visualiser les tâches dans la file d'attente

  ![](https://i.imgur.com/8I5Vhqm.png)

### Supprimer

* On peut utiliser la commande `atrm` pour supprimer une tâche planifiée.

  ![](https://i.imgur.com/9wZB0Rh.png)

### Allow, deny

* Deux fichiers de configuration permettent de contrôler l'accès à `at`:

  <ins>/etc/at.deny</ins>: si le nom de l'utilisateur figure dans ce fichier, alors l'accès à `at` lui est refusé

  <ins>/etc/at.allow</ins>: si le nom de l'utilisateur figure dans ce fichier, alors l'accès à `at` lui est accordé — et ce, même s'il figure dans le fichier at.deny. Typiquement, le fichier deny existe et le fichier allow n'existe pas.

* Si le nom d'un utilisateur n'est ni dans allow ni dans deny, alors il a accès à `at`

---

## cron

* `at` permet de planifier une tâche à une date fixe, mais lorsqu'on veut planifier une tâche pour tourner régulièrement, alors on utilise le daemon `cron`. Par exemple, pour sauvegarder des données, gérer les rotations des fichiers de logs, ou encore mener des audits de sécurité.

  Pour automatiser les tâches chroniques, le service cron tourne en arrière-plan et regarde toutes les minutes dans sa table si des tâches sont à lancer. On appelle cette table la *crontable* ou *crontab*. Une tâche planifiée pour être lancée régulièrement par cron, c'est à dire une tâche présente dans la crontab, est appelée un *cronjob*.

### Éditer

* Chaque utilisateur peut avoir une crontab, et il peut également y avoir un crontab système. Dans tout les cas, la crontab se configure via un fichier crontab.  
  Pour éditer le fichier crontab de l'utilisateur en cours:

  ```
  $ crontab -e
  ```

  Suivant la distribution utilisée:
  - L'éditeur définit par la variable d'environnement `EDITOR` est utilisé
  - La première fois que la commande `crontab -e` est lancée, il est demandé de choisir l'éditeur de texte à utiliser. Par la suite, pour changer d'éditeur utiliser `select-editor`.

    ```
    # select-editor

    Select an editor.  To change later, run 'select-editor'.
      1. /bin/nano        <---- easiest
      2. /usr/bin/vim.basic
      3. /usr/bin/vim.tiny

    Choose 1-3 [1]: 2
    ```

### Format crontab

* Comme pour script Bash, les lignes commençant par `# ` sont des commentaires.

* On peut définir certaines variables d'environnement:

  - SHELL indique l'interpréteur de commande à utiliser pour lancer les cronjobs
  - MAILTO permet de définir quel utilisateur recevra le résultat des cronjobs si le résultat n'est pas redirigé vers un fichier
  - PATH permet de définir le path des fichiers executables
  - HOME est le répertoire à partir duquel les commandes sont invoquées

  L'environnement par défaut des cron jobs est le suivant:

  ```
  HOME=$HOME
  LOGNAME=$UID
  PATH=/usr/bin:/usr/sbin:.
  SHELL=/usr/bin/sh
  ```

* Après le paramètres des variables d'environnement, chaque ligne du fichier représenté un cronjob. Chaque tâche est définit par 6 champs séparés par des espaces: les 5 premiers champs permettent de configurer quand la tâche devra être lancée, et le dernier champ correspond à la commande à executer.

  ```
  SHELL=/bin/bash
  MAILTO=christine
  PATH=/sbin/:/bin:/usr/sbin:/usr/bin
  #This is a comment
  * * * * * echo 'Run this command every minute'
  15 14 * * * /bin/df > /home/christine/df.out
  ```

  Les 5 premiers champs sont:

  1. Minute  
     Intervalle: 0 à 59

  2. Heure  
     Intervalle: 0 à 23

  3. Jour du mois  
     Intervalle: 1 à 31

  4. Mois  
     Intervalle: 1 à 12  
     Accepte également les noms: jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec

  5. Jour de la semaine  
     Intervalle: 0 à 7; dimanche = 0 ou 7  
     Accepte également les noms: sun, mon, tue, web, thu, fri, sat

  - On peut utiliser l'astérisque (\*) pour représenter "tout". Par exemple, tous les premiers du mois à minuit:

    ```
    0 0 1 * *
    ```

  - La virgule (,) pour "et". Par exemple, deux fois par heure, à et-quart et moins-le-quart:

    ```
    15,45 * * * *
    ```

  - Le tiret (-) pour un intervalle. Par exemple, toutes les 15 minutes du lundi au vendredi:

    ```
    15 * * * 1-5
    ```

  - Le slash (/) pour spécifier le pas. Par exemple, toutes les 2 heures, de 8h à 17h:

    ```
    0 8-17/2 * * *
    ```

* Pour plus d'infos: `man 4 crontabs`

### Lister

* Pour afficher la crontab de l'utilisateur en cours:

  ```
  $ crontab -l
  SHELL=/bin/bash
  MAILTO=christine
  15 14 * * * /bin/df > /home/christine/df.out
  ```

  Si vous disposez des privilèges root, vous pouvez afficher (et éditer) la crontab d'un autre utilisateur:

  ```
  $ crontab -u username -l
  ```

* Certaines distributions stockent les crontab dans /var/spool/cron/, d'autres dans /var/spool/cron/tabs ou encore /var/spool/cron/crontabs — le plus simple est d'utilisateur la commande crontab plutôt que d'éditer le fichier directement. Notons que le nom du fichier crontab est le même que celui de l'utilisateur qui possède la crontab.

  ```
  ls -l /var/spool/cron
  total 4
  -rw------. 1 christine christine 78 Aug 19 12:35 christine
  ```

### Supprimer

* Si vous souhaitez supprimer ou modifier une tâche de la crontab, il suffit d'éditer la crontab avec `crontab -e`.

* Pour supprimer la totalité de la crontab:

  ```
  $ crontab -r
  $
  $ crontab -l
  no crontab for christine
  ```

### Allow, deny

* Comme pour `at`, il est possible de contrôler qui a accès à cron grâce à deux fichiers — mais le fonctionnement est un peu différent:

  <ins>/etc/cron.allow</ins>: si le nom de l'utilisateur figure dans ce fichier, alors l'accès à cron lui est accordé. Si c'est le cas, le fichier /etc/cron.deny n'est vérifié

  <ins>/etc/cron.deny</ins>: si le nom de l'utilisateur figure dans ce fichier, alors l'accès à cron lui est refusé

### Crontab système

* Il y a une différence entre la crontab d'un utilisateur et la crontab du système, la crontab système a un champ supplémentaire: le nom de l'utilisateur sous lequel exécuter la commande.  
  Les 5 premiers champs permettent de configurer quand la tâche devra être lancée, le 6ème est le nom de l'utilisateur, et le dernier champ correspond à la commande à executer.

* La crontab système principale est stockée dans le fichier <ins>/etc/crontab</ins>  
  Par défaut, elle ressemble à ça:

  ![](https://i.imgur.com/USPmuMr.png)

  La commande `run-parts` exécutera tous les script dans le répertoire indiqué. L'option --report ajoutera le nom du script à la sortie des scripts.

  Ainsi, les répertoires <ins>/etc/cron.\*</ins> contiennent des scripts à exécuter périodiquement — tous les scripts du répertoire /etc/cron.monthly sont exécuté une fois par mois. Aujourd'hui, les scripts de ces répertoires (à l'exception du répertoire hourly) ne sont plus gérés par cron mais par un autre daemon, anacron — s'il est installé.

  ``` bash
  sudo cp shellscript /etc/cron.hourly/
  sudo chmod +rx /etc/cron.hourly/shellscript
  ```

* Le répertoire <ins>/etc/cron.d/</ins> est vérifié par la daemon cron après le fichier /etc/crontab. Les fichiers dans ce répertoires sont traités comme des crontabs individuelles et les cronjobs qui y sont définis peuvent utiliser d'autres variables.

---

## anacron

* Avec cron, si le système ne tourne pas 24 heures sur 24 et 7 jours sur 7, il se peut qu'une tâche programmée ne soit jamaise exécutée: cron ne vérifie pas si une tâche planifiée a été manquée.

* Anacron, contrairement à cron, utilise des horodatages pour s'assurer que chaque tâche planifiée est bel et bien exécutée. En revanche le niveau le plus fin qu'anacron peut gérer est au jour près, donc les tâches planifiées par heure reste gérées par cron.

### Format anacrontab

* Les tâches d'anacron sont listées dans son fichier de configuration, <ins>/etc/anacrontab</ins>

  ![](https://i.imgur.com/dSYDWSz.png)

* Chaque tâche est définit par 4 champs:

  1. Périodicité  
     Définit la fréquence d'exécution de la tâche.  
     Ce peut être le nombre de jours entre deux exécution, ou un mot clé: @daily, @weekly, @monthly, @yearly ou @annually — ce qui est particulièrement utile quand on veut exécuter une tâche tous les mois alors que le nombre de jours change d'un mois à l'autre.

  2. Delai  
     Permet de définir un délai entre les tâches anacron. Lorsqu'anacron vérifie les tâches à exécuter, le délai permet aux tâches de s'exécuter à des moments difféents. Ce n'est pas à prendre à la légère: si vous démarrez votre système, vous ne voulez pas qu'anacron lance 20 tâches lourdes en même temps.

  3. Identifiant  
     Cet identifiant est utilisé des les fichiers de logs et les messages, il est donc utile d'avoir un nom unique ici.

  4. Commande  
     La commande à exécuter.

* Pour vérifier si la syntaxe est correcte:

  ``` bash
  anacron -T
  ```

  En cas d'erreur, un message sera affiché.  
  Si rien n'est affiché, c'est tout bon

* Pour forcer anacron à exécuter toutes les tâches planifiées pour aujourd'hui:

  ``` bash
  # n for now
  anacron -n
  ```

  Pour lancer toutes les tâches, même si elles ont déjà été exécutées pour la journée aujourd'hui, ajouter -f:

  ``` bash
  anacron -n -f
  ```

---

## systemd

* Rappelez-vous que systemd gère les services: quand ils démarrent, quels systèmes de fichiers sont montés, et bien d'autres, y compris la planification de tâches à exécuter périodiquement par le biais des unités *timer*.

* Les *timers* (ou *timer units*) sont des fichiers de configuration qui décrivent quand et comment une tâche planifiée doit être exécutées. Ces tâches sont gérées par systemd

### Lister

* On peut lister les timers avec list-units

  ```
  $ systemctl list-units --type=timer
  UNIT                         LOAD   ACTIVE SUB     DESCRIPTION                                                
  anacron.timer                loaded active waiting Trigger anacron every hour
  ```

* On peut également utiliser list-timers, qui fournit encore plus d'informations  
  — quand a eu lieu la dernière exécution, combien de temps avant la prochaine exécution.

  ```
  $ systemctl list-timers
  NEXT                         LEFT          LAST                          PASSED      UNIT                         ACTIVATES
  Sun 2022-10-30 19:01:17 CET  45min left    Sun 2022-10-30 18:04:30 CET   11min ago   anacron.timer                anacron.service
  ```

### Timer format

* Typiquement, un fichier de configuration pour un *timer* aura au moins deux sections: unit et timer. Avec éventuellement une section service.

  ```
  $ systemctl cat systemd-tmpfile-clean.timer
  [Unit]
  Description=Daily Cleanup of Temporary Directories
  Documentation=man:tmpfiles.d(5) man:systemd-tmpfiles(8)

  [Timer]
  OnBootSec=15min
  OnUnitActiveSec=1d
  ```

  - `[Unit]` fournit une documentation et une description

  - `[Timer]` est l'endroit où est déclaré la périodicité d'exécution de la tâche. Ce peut être

      * un temps monotonique  
        Par exemple 20 secondes après le démarrage du système: `OnBootSec=20s`  
        Ou 1 semaine après la dernière exécution: `OnUnitActiveSec=1w`

      * ou un temps réel  
        Par exemple, tous les mercredi à 2:30pm: `OnCalendar=Wed *-*-* 14:30:00`  
        Tous les 15 et 1er du mois à 6am: `OnCalendar=*-*-1,15 06:00:00` 
        Du lundi au vendredi à 6am: `OnCalendar=Mon..Fri *-*-* 06:00:00`

      Pour un temps monotonique, les unités possibles sont: ms, s, m, h, d, w, month, y. Si omis, s est l'unité par défaut.  
      Pour un temps réel, le format est <ins>Day-of-week YYYY-MM-DD HH:MM:SS</ins>. Si omis, 00:00:00 est le temps par défaut, et * est le jour de la semaine par défaut (autrement dit, tous les jours de la semaine). Notons que les astérisques et virgules fonctionnent comme dans cron.

  - `[Service]` décrit la tâche à exécuter. 
     Si le service n'est pas indiqué, c'est que le nom du *service* à exécuter est le même que celui du *timer*.  
     Que ce soit dans un fichier .service ou dans la section Service du .timer, `ExecStart` spécifie la commande à lancer.

  ```
  $ systemctl cat systemd-tmpfile-clean.service
  [Unit]
  Description=Cleanup of Temporary Directories
  Documentation=man:tmpfiles.d(5) man:systemd-tmpfiles(8)
  DefaultDependencies=no
  Conflicts=shutdown.target
  After=systemd-readahead-collect.service systemd-readadhead-replay.service
  Before=shutdown.target

  [Timer]
  Type=oneshot
  ExecStart=/bin/systemd-tmpfiles --clean
  ```

     ```
     Type=oneshot
     ```
     ```
     ExecStart=command-to-run
     ```

### systemd-run

* Il est possible de créer un timer à la volée avec `systemd-run`.  

  ```
  $ cat diskSpace.sh
  #!/bin/bash
  #
  # Record disk space
  #
  /bin/df > /home/christine/df.out
  ```

  ```
  $ sudo systemd-run --on-calendar="*-*-* 15:35:00" bash /home/christine/diskSpace.sh
  Running timer as unit: run-r0e[...].timer
  Will run service as unit: run-r0e[...].service
  ```

* systemd créera un fichier timer et service — que vous pouvez comme base pour créer des timer plus permanents.

  ```
  $ systemctl list-unit-files --type=timer
  UNIT FILE                    STATE  
  anacron.timer                enabled
  run-r0e[...].timer           transient
  ```

  ```
  $ systemctl cat run-r0e[...].timer
  [Unit]
  Description=/bin/bash /home/christine/diskSpace.sh

  [Timer]
  OnCalendar=*-*-* 15:35:00
  RemainAfterElapse=no
  ```
  ```
  $ systemctl cat run-r0e[...].service
  [Unit]
  Description=/bin/bash /home/christine/diskSpace.sh

  [Service]
  ExecStart=
  ExecStart=@/bin/bash "/bin/bash" "/home/christine/diskSpace.sh"
  ```

### Supprimer

* Pour supprimer un timer, supprimer ses fichiers et relancer le daemon

  ```
  $ ls /run/systemd/transient/run-*.*
  /run/systemd/transient/run-r0e[...].service
  /run/systemd/transient/run-r0e[...].timer
  $
  $ sudo rm -i $(ls /run/systemd/transient/run-*.*)
  rm: remove regular file '/run/systemd/transient/run-r0e[...].service'? y
  rm: remove regular file '/run/systemd/transient/run-r0e[...].timer'? y
  $
  $ sudo systemctl daemon-reload
  ```
