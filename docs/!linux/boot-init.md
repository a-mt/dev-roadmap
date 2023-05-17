---
title: Processus d'initialisation
category: Linux, Boot
---

## Étapes du Boot

1. Le firmware lance l'opération POST (un contrôle du matériel)
2. Le firmware cherche et charge le bootloader
3. Le bootloader charge le kernel — et peut éventuellement laisser l'utilisateur choisir lequel parmi une liste
4. Le kernel lance des modules et crée le système de fichier virtuel
5. Le kernel lance le premier processus, le *processus d'initialisation* — auquel est attribué le PID 1.
6. Le processus d'initialisation lance différents processus et leur affecte un PID dans l'ordre séquentiel.
7. Le système est démarré et l'utilisateur peut s'identifier pour accéder à son compte.

## Processus d'initialisation

* Le *processus d'initialisation* est le premier processus lancé par le kernel,  
  il s'occupe de lancer tous les autres processus au démarrage.

* Historiquement, le processus d'initialisation Linux suivait les spécifications établies avec la sortie du système V Unix (années 1980): on appelle ce processus *system 5 init*, *sysVinit* ou simplement *init*.

* init étant relativement lent, il a été remplacé par Upstart dans la version 6.10 (Edgy Eft) d'Ubuntu.  
  Upstart fut ensuite intégré à la version 9 de Fedora.

* À partir de la version 7, Red Hat Entreprise remplace init par systemd.  
  À partir de Fedora 15, Upstart est remplacé par systemd.  
  Et Ubuntu remplace Upstart par systemd à partir de la version 15.04 (Vivid Vervet)

* On a donc le processus d'initialisation historique: <ins>init</ins>  
  Un processus d'initialisation intermédiaire: <ins>upstart</ins>  
  Et le nouveau processus d'initialisation: <ins>systemd</ins>  
  Aujourd'hui, la plupart des distributions utilisent systemd

## Lequel est en cours

* Le processus d'initialisation est toujours /sbin/init — et ce, afin de maintenir la compatibilité avec de nombreux processus hérités.

  ```
  $ ls -l /sbin/init
  lrwxrwxrwx 1 root root 20 déc.  10 10:15 /sbin/init -> /lib/systemd/systemd
  ```

* Utiliser pstree ou ls ne permet pas de distinguer upstart de init. Pour savoir avec certitude quel est le processus d'initialisation utilisé, on peut vérifier les répertoires qui existent:

  Si le système a un répertoire `/etc/systemd`: c'est  systemd  
  Sinon et s'il y a un répertoire `/etc/init`: c'est  upstart  
  S'il n'y a ni l'un ni l'autre: c'est sysVinit

## Service

* Un *service* est un daemon (application qui tourne continuellement en arrière-plan) qui attend de recevoir des requêtes.
  Un serveur web (Apache), une base de données (MySQL) ou un gestionnaire de réseau (NetworkManager) sont des exemples de services.

---

## sysVinit

### Runlevels

* Les services lancés au démarrage sont regroupés par *runlevel* (*niveau d'éxecution* en français): lorsqu'on démarre avec le runlevel 5, tous les services du runlevel 5 sont lancés

* init définit les runlevels suivants:

  | Runlevel | Services
  |---       |---
  | 0        | Aucun: passer au runlevel 0 consiste à arrêter le système
  | 1        | Single-user: seul l'utilisateur root peut se connecter. Le réseau n'est pas démarré
  | 2        | Multi-utilisateur, sans réseau
  | 3        | Multi-utilisateur, avec réseau mais sans GUI.<br> C'est typiquement le runlevel utilisé pour un serveur web
  | 4        | Identique au runlevel 3 par défaut.<br> Peut être utilisé pour un besoin spécifique, par exemple lancer les services d'un environnement de développement
  | 5        | Multi-utilisateur, avec GUI<br>Typiquement utilisé pour les ordinateurs de bureau
  | 6        | Redémarrer

  Bien que le noyau Linux puisse admettre des runlevels de 0 à 9, seuls les runlevels de 0 à 6 sont spécifiés, et typiquement seuls ces runlevels sont utilisés.

### Services

* Tous les services sont définis dans `/etc/rc.d/init.d` (ou `/etc/init.d` sous certaines distributions)  
  rc vient de "run commands". Les scripts de ce répertoire sont souvent appelés *scripts init*.

  ![](https://i.imgur.com/CJsWLBVl.png)

### Statut d'un service

* On peut vérifier le statut d'un service avec le path du service suivit de `status`

  ```
  $ /etc/rc.d/init.d/httpd status
  ```

* On peut également utiliser la commande `service`, qui fonctionne de la même manière mais ne nécessite pas de connaître le path complet du service, juste son nom.

  ```
  $ sudo service syslog status
  syslogd (pid 1602) is running...
  klogd (pid 1605) is running...
  $
  ```

### Lancer un service manuellement

* On peut activer ou désactiver un service temporairement avec start et stop:

  ```
  $ sudo /etc/rc.d/init.d/httpd start
  $ sudo /etc/rc.d/init.d/httpd stop
  ```
  ```
  $ sudo service httpd start
  $ sudo service httpd stop
  ```

### Services au démarrage

* Chaque runlevel a un sous-répertoire `/etc/rc.d/rcN.d` — où N est le numéro du runlevel.    
  Ce sous-répertoire contient les scripts qui devront être exécutés pour le runlevel associé.

  Ces scripts sont des liens symboliques vers init.d, ainsi il est uniquement nécessaire d'aller dans ces répertoires pour ajouter, supprimer ou modifier l'ordre d'un service — et non sa configuration.

  ![](https://i.imgur.com/u1g83xAl.png)

  * Les liens symboliques commencent soit par K soit par S:  
    lorsque le système démarre ou change de runlevel, les services K (kill) sont arrêtés et les services S (start) sont démarrés.

  * Le K ou S est suivit d'un numéro:  
    les services seront arrêtés/démarrés dans l'ordre séquentiel.

### Runlevel par défaut

* Le fichier `/etc/inittab` (pour *initialization table*) contient les configurations de systemVinit, et notamment le runlevel par défaut — celui avec lequel le système est démarré

  ```
  $ grep ^id /etc/inittab
  id:5:initdefault:
  $
  ```

### Runlevel en cours

* La commande `runlevel` (à exécuter en tant que root) permet de voir le runlevel précédent et en cours.  
  Le runlevel précédent vaudra N s'il n'y en a pas — autrement dit, c'est le runlevel avec lequel on a démarré.

  ```
  $ runlevel
  -bash: runlevel: command not found
  $
  $ su -
  Password:
  # runlevel
  N 5
  ```


* La commande `who -r` affiche également le runlevel actuel du système.  
  Un des avantages de cette technique est qu'elle affiche la date et heure à laquelle le niveau d'exécution a été atteint.

  ```
  $ who -r
  run-level 5  2022-05-03 00:59
  ```

### Changer de runlevel

* On peut changer le runlevel en cours pendant l'execution du système avec la commande `init` ou `telinit`

  ```
  # init 3
  INIT: Sending processes the TERM signal
  [...]
  # runlevel
  3 5
  ```

---

## upstart

### Services

* Sont situés dans le répertoire `/etc/init`

### Runlevel par défaut

* Si le système utilise upstart au lieu du processus init, le niveau d'exécution par défaut est
  - dans `/etc/inittab` pour les distributions RedHat
  - dans `/etc/init/rc-sysinit.conf` pour Ubuntu — avec la variable d'environnement DEFAULT_RUNLEVEL

[Documentation](https://help.ubuntu.com/community/UbuntuBootupHowto)

---

## systemd

* Avec init, tous les services sont lancés dans l'ordre, et le script suivant n'est exécuté que si le script précédent a démarré. Le démarrage en série des services rend le processus d'initialisation inefficace et relativement lent.

* init a depuis été remplacé par *systemd* (pour *system daemon*).  
  systemd démarre les services en parallèle, grâce à un système de dépendances: chaque service définit s'il a besoin que d'autres services soient démarrés avant ou après lui. Ainsi, plusieurs services peuvent être démarrés en même temps, pourvu qu'ils ne dépendent pas l'un de l'autre.

### Cibles

* Systemd a quelque chose de similaire aux runlevels, appelé *targets* (*cibles* en français).

  systemd fournit une couche de compatibilité, qui fait correspondre les runlevels aux targets. Cette compatibilité est imparfaite puisqu'un seul runlevel peut être actif à la fois, tandis que plusieurs targets peuvent être actives simultanément. Cette correspondance est surtout utile lorsqu'on veut modifier la cible en cours, et ne devrait pas utilisée dans les fichiers de configuration.

  | init Runlevel | systemd Target
  |---            |---
  | 0             | runlevel0.target, poweroff.target
  | 1             | runlevel1.target, rescue.target
  | 2             | runlevel2.target
  | 3             | runlevel3.target, multi-user.target
  | 4             | runlevel4.target
  | 5             | runlevel5.target, graphical.target
  | 6             | runlevel6.target, reboot.target
  |               | emergency.target

  Pour pouvoir démarrer en mode rescue ou emergency, root doit avoir un mot de passe. Autrement, ce n'est pas possible

* La plupart des cibles reposent sur d'autres cibles: par exemple graphical.target inclut les services de multi-user.target et charge le service display-manager.service en plus

  ```
  $ cat /lib/systemd/system/graphical.target
  [Unit]
  Description=Graphical Interface
  Documentation=man:systemd.special(7)
  Requires=multi-user.target
  Wants=display-manager.service
  Conflicts=rescue.service rescue.target
  After=multi-user.target rescue.service rescue.target display-manager.service
  AllowIsolate=yes
  ```

### Services

* Les services sont définis dans des *fichiers unitaires* (*unit files*) situés dans `/etc/systemd/system`.  
  Ils peuvent également être définit dans `/run/systemd/system` ou `/usr/lib/systemd/system`.  
  Si un service est définit dans plusieurs répertoires, alors /usr écrase /run qui écrase /etc

  ![](https://i.imgur.com/mSV1Lqh.png)

* Chaque fichier unitaire contient 3 sections:

  | Section   | Description
  |---        |---
  | `unit`    | Décrit le service et fournit l'emplacement de la documentation
  | `service` | Configure le démarrage du service
  | `install` | Indique quelle cible démarre ce service

  ![](https://i.imgur.com/svYqzCx.png)

### Statut d'un service

* Chaque service a deux types de statuts:  
  - statut en cours: le service est-il en train de tourner?  
    Peut être `active` ou `inactive`

  - statut de démarrage: le service est-il lancé au démarrage?  
    Peut être

    | Statut     | Description
    |---         |---
    | `enabled`  | Le service est lancé au démarrage du système
    | `disabled` | Le service n'est pas lancé au démarrage du système
    | `static`   | Le service n'est lancé que si un autre service en a besoin au démarrage, ou s'il est lancé manuellement

* On peut utiliser `systemctl` avec la sous-commande `status` pour vérifier les deux statuts  
  L'extension .service peut être omise

  ```
  $ systemctl status httpd.servce
  $ systemctl status httpd
  ```

  ![](https://i.imgur.com/l4Vs5gu.png)


### Lancer un service manuellement

* Les sous-commandes `stop` et `start` permettent de temporairement stopper ou démarrer un service.

  ![](https://i.imgur.com/DoIOauH.png)
  ![](https://i.imgur.com/YmljM3h.png)

* systemd permet également l'utilisation de `service` — attention l'ordre des paramètres n'est pas le même entre service et systemctl

  ```
  $ sudo service bluetooth status
  $ sudo service bluetooth start
  $ sudo service bluetooth stop
  ```

### Lister

* Pour voir tous les fichiers unitaires du système et leur statut de démarrage, on peut utiliser la commande `systemctl` avec la sous-commande `list-unit-files`:

  ![](https://i.imgur.com/Z3BEhwm.png)

* Pour afficher l'état de démarrage, l'état en cours et la description de tous les fichiers unitaires:

  ```
  $ systemctl -a
    UNIT                                 LOAD      ACTIVE   SUB       DESCRIPTION
    acpid.path                           loaded    active   running   ACPI Events Check
    cups.path                            loaded    active   running   CUPS Scheduler
    systemd-ask-password-console.path    loaded    inactive dead      Dispatch Password Requests to Console Directory Watch
  ```

  Pour filtrer sur les fichiers unitaires de type "service":

  ```
  $ systemctl -t service
    UNIT                                  LOAD     ACTIVE   SUB       DESCRIPTION
    accounts-daemon.service               loaded   active   running   Accounts Service
    acpid.service                         loaded   active   running   ACPI event daemon
    apparmor.service                      loaded   active   exited    AppArmor initialization
  ```

### Services au démarrage

* Les sous-commandes `enable` et `disable` permettent d'activer ou désactiver un service au démarrage

  ![](https://i.imgur.com/zIZMSDH.png)
  ![](https://i.imgur.com/C8LKliV.png)

### Degraded

* Si certains services de la cible en cours ne sont pas lancés, alors le statut du système est "degraged"

  ```
  $ systemctl is-system-running
  degraded
  ```

* list-dependencies permet de lister les différentes unités représentées sous forme d'arbre.

  - Une pastille blanche indique que le service est actuellement arrêté — ce qui n'est généralement pas un problème, certains services s'exécutent une fois au démarrage et se terminent directement, et d'autres ne sont pas censés démarrer automatiquement.

  - Une pastille verte indique que le service est en cours d'execution — en règle générale, les services importants (actifs en permanence) devraient accompagnés d'une pastille verte.

  ```
  default.target
  ● ├─accounts-daemon.service
  ○ ├─e2scrub_reap.service
  ● ├─lightdm.service
  ● ├─switcheroo-control.service
  ○ ├─systemd-update-utmp-runlevel.service
  ● ├─udisks2.service
  ● └─multi-user.target
  ○   ├─anacron.service
  ●   ├─avahi-daemon.service
  ```

### Cible par défaut

* Pour voir la cible par défaut:

  ```
  $ systemctl get-default
  graphical.target
  ```

* Pour modifier la cible par défaut (nécessite les droits super-utilisateur):

  ```
  $ sudo systemctl set-default multi-user.target
  Remove /etc/systemd/system/default.target.
  Created symlink /etc/systemd/systel/default.target → /lib/systemd/system/multi-user.target.
  $
  $ systemctl get-default
  multi-user.target
  ```

### Changer de cible  

* Pour changer de cible sans avoir à redémarrer le système, on peut utiliser la sous-commande `isolate`

  ```
  # systemctl isolate emergency.target
  ```

  Ou simplement

  ```
  # systemctl emergency
  ```

* Pour changer de cible à la cible par défaut:

  ```
  # systemctl default
  ```