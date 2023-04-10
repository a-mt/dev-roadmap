---
title: Logging
category: Linux
---

## Théorie

* Le terme *log* (ou en français *journalisation*) fait référence à l'enregistrement d'événements qui se sont produits sur le système. On y trouvera la date et l'heure de l'enregistrement suivit d'une description — qui peut contenir des informations supplémentaires, telles que l'utilisateur ou le processus impliqué dans l'événement.

* Typiquement, les logs sont de simples fichiers texte, mais ils peuvent parfois être binaires ou être des entrées stockées dans une base de données. Certains logs peuvent être consultés sans privilège particulier, tandis que d'autres nécessiterons les droits root.

* Avoir des logs est essentiel pour une bonne sécurité, ainsi que pour le debugging des problèmes qui peuvent subvenir sur le système. L'avantage d'une base de données est la possibilité d'empêcher les entrées d'être secrètement modifiées, ce qui est une méthode populaire des acteurs malveillants pour cacher une entrée non autorisée sur le système.

* Sous Linux, les daemons qui fournissent (ou fournissaient historiquement) la gestion des logs sont:

  | Daemon | Description
  |---            |---
  | `syslogd` | daemon d'origine
  | `sysklogd` | syslogd avec une surcouche klogd pour la gestion des événements kernel
  | `syslogd-nd` | ajoute des fonctionnalités avancée à syslogd
  | `rsyslodg` | "rocket fast" syslogd
  | `systemd-journald` | daemon de systemd

---

## syslog

* syslog est un daemon de log développé dans les années 80 pour l'application sendmail.  
  Il enregistrait les erreurs et le statut des messages.  
  Chaque message était enregistré dans un format standard, permettant à l'admin de rapidement déterminer ce qui se passe et quelle application ou quel système est concerné. Chaque entrée avait:
  - la date et temps
  - le type d'événement (*facility*)
  - l'importance (*severity*)
  - une description

  Le format de ces logs est devenu si populaire qu'il existe encore aujourd'hui sous diverses formes, y compris en tant que protocole.

* Le protocol syslog utilise

  - <ins>7 niveaux d'importance</ins>: 0 est la priorité la plus élevée, tandis que 7 est la priorité la plus faible. Un log d'importance 0 indique le système est devenu instable et peut s'arrêter à tout moment.

    | Label     | #  | Description
    |---        |--- |---
    | `emerg`   | 0  | Système instable
    | `alert`   | 1  | Requiert une réponse urgente
    | `crit`    | 2  | Erreur critique
    | `err`     | 3  | Une erreur est survenue mais l'application peut continuer de fonctionner
    | `warning` | 4  | Un problème a été détecté
    | `notice`  | 5  | Statut normal mais important
    | `info`    | 6  | Informations
    | `debug`   | 7  | Informations de debug

  - <ins>des labels standardisés</ins>, ayant chacun un code associé, pour indiquer l'origine du log:

    | Label      | #  | Origine
    |---         |--- |---
    | `kern`     | 0  | Kernel Linux
    | `user`     | 1  | Événement utilisateur
    | `mail`     | 2  | Application mail
    | `daemon`   | 3  | Daemon
    | `auth`     | 4  | Authentification ou sécurité
    | `syslog`   | 5  | Service de log
    ||||
    | `lpr`      | 6  | Service d'impression
    | `news`     | 7  | Application de news
    | `uucp`     | 8  | Application de copie Unix-to-Unix
    | `cron`     | 9  | Tâche planifiée (cron)
    | `authpriv` | 10 | Authentification ou sécurité
    ||||
    | `ftp`      | 11 | Application FTP
    | `ntp`      | 12 | Application NTP
    | `security` | 13 | Audit de sécurité
    | `console`  | 14 | Console
    | `solaris-cron` | 15 | Tâche planifiée (solaris-cron)
    | `local0`-`local7` | 16-23 | Customisable

---

## rsyslog

* Le daemon rsyslog est basé sur le protocol syslog — *r* est pour rocket fast. Il est très populaire sur les systèmes Linux, bien que nombreux systèmes utilisent également le daemon de log systemd-journald (plus récent).

  ```
  $ systemctl status rsyslog
  ● rsyslog.service - System Logging Service
     Loaded: loaded (/lib/systemd/system/rsyslog.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2021-11-24 12:07:42 EST; 2min 43s ago
       Docs: man:rsyslogd(8)
             http://www.rsyslog.com/doc/
   Main PID: 1122 (rsyslogd)
      Tasks: 3
     CGroup: /system.slice/rsyslog.service
             └─1122 /usr/sbin/rsyslogd -n
  ```

### Configs

* rsyslog possède un fichier de configuration: <ins>/etc/rsyslog.conf</ins>  
  Et un répertoire contenant divers fichiers de configurations: <ins>/etc/rsyslog.d</ins>.  
  Ces fichiers contiennent des règles définissant comment gérer différents types de logs.

* Chaque règle utilise le format `facility.priority action` — et l'astérisque pour représenter "tout".

  ``` txt
  $ grep -v \# /etc/rsyslog.conf | grep -v ^$
  $WorkDirectory /var/lib/rsyslog
  $ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat
  $IncludeConfig /etc/rsyslog.d/*.conf
  $OmitLocalLogging on
  $IMJournalStateFile imjournal.state
  *.info;mail.none;authpriv.none;cron.none   /var/log/messages
  authpriv.*                                 /var/log/secure
  mail.*                                     /var/log/maillog
  cron.*                                     /var/log/cron
  *.emerg                                    :omusrmsg:*
  uucp,news.crit                             /var/log/spooler
  local7.*                                   /var/log/boot.log
  ```

  * La plupart des actions ne sont qu'une référence absolue vers un fichier:  
    elles désignent le fichier de log dans lequel les messages sélectionnés doivent être stockés.

  * `:omusrmsg:*` signifie envoyer un message urgent  
     à tous les utilisateurs actuellement connectés au système.

  * On peut également envoyer les logs à un serveur distant.  
    Par exemple, l'action suivante envoie les logs à l'adresse 192.168.201.35, port 6514, avec la compression zlib la plus élevée (9) en utilisant TCP:

    ```
    @@(z9)192.168.201.35:6514
    ```

    Le format à utiliser est le suivant:
    - <ins>protocole</ins>: `@` pour UDP ou `@@` pour TCP
    - <ins>niveau de compression zlib</ins> (optionnel): `(z#)`
    - <ins>hôte</ins>: adresse IP ou nom de domaine
    - <ins>port</ins> (optionnel): port sur lequel le daemon écoute les messages entrants `:#`

    En général, le port 514 est utilisé par défaut. Ce port n'utilise pas TLS et les messages sont visibles lorsqu'ils traversent le réseau. Il est préférable d'utiliser le port 6514, qui est le port standard pour le trafic syslog UDP et TCP sur TLS.

### Configurer un serveur centralisé

Pour pouvoir utiliser un système comme serveur de logs centralisé, il faut activer certaines configurations — décommenter les différentes lignes du fichier de configuration qui vous intéressent. Certaines distributions Linux ont un fichier rsyslog séparé tandis que d'autres placent ces configurations dans le ou les fichiers de configuration principaux.

1. Charger les modules appropriés dans le noyau  
    et modifier le port écoutant le trafic syslog.  

   ![](https://i.imgur.com/Xxk5lAW.png)

2. Envisager de séparer les fichiers de log en définissant des templates — au lieu d'avoir tous les événements de tous les différents systèmes clients dans un seul grand fichier de log, les séparer dans leur propre fichier de log. Cela facilite la recherche et l'examen des informations par système.

    <ins>Par exemple</ins>:

    ```
    $template AuthPrivLogFile, "/var/log/%HOSTNAME%/secure"
    [...]
    authpriv.*                 ?AuthPrivLogFile
    ```

    Créera des fichiers de logs comme suit:

    ```
    /var/log/linux01.class.org/secure
    /var/log/linux02.class.org/secure
    /var/log/linux03.class.org/secure
    ```

3. Après avoir modifié les configurations, redémarrer le daemon rsyslog

    ```
    $ sudo systemctl restart rsyslog
    ```

4. S'assurer que l'adresse IP du serveur est statique et, si nécessaire, y associer un nom de domaine

5. Modifier le firewall pour autoriser le traffic vers le port du serveur

---

## system-journald

* system-journald est le daemon de log de systemd. Il utilise une base de données, ce qui permet de récupérer et afficher les logs plus rapidement — avec la commande `journalctl`. Les entrées sont sauvegardées dans un fichier binaire.

  ![](https://i.imgur.com/R5Xo6IT.png)
  ![](https://i.imgur.com/ZdD1m5j.png)

### Configs

* Ce daemon permet entre autres:

  - une mesure de sécurité appelée *Forward Secure Sealing* (FSS),  
    qui empêche les messages d'être secrètement modifiés

  - le partage des messages avec le protocole syslog  
    — on peut donc avoir systemd-journald et syslog côte à côte

* Son fichier de configuration est <ins>/etc/systemd/journald.conf</ins>.  
  Toutes les lignes commentées sont les configurations par défaut

  ![](https://i.imgur.com/nrE0NTv.png)

  Les configurations par défaut sont généralement suffisantes pour la plupart des systèmes mais certaines fonctionnalités peuvent être intéressantes:

  - `Storage=`  
    Détermine si les logs sont sauvegardés

    | Valeur | Description
    |---         |---
    | `none` | désactive la journalisation  
    | `volatile` | sauvegarde dans un fichier journal qui n'est conservé que tant que le temps d'une exécution (aka runtime); au prochain démarrage, le journal est supprimé et un nouveau fichier est crée
    | `auto` | sauvegarde dans un fichier journal qui survivra à un redémarrage
    | `persistent` | similaire à auto mais créera un journal /run/log/journal si /var/log/journal n'est pas disponible — ce qui se produit généralement au démarrage du système. Dans les deux cas, les journaux sont permanents

  - `Compress=`  
    Valeur: `yes` ou `no`  
    Détermine si les logs sont compressés

  - `Seal=`  
    Valeur: `yes` ou `no`  
    Détermine si les logs sont scellés avec des clés pour les protéger d'une modification inaperçue

  - `SplitMode=`  
    Valeur: `uid` ou `none`  
    Détermine si les logs sont séparés par utilisateur  
    Si oui, l'uid de l'utilisateur sera inclus dans le nom du fichier

  - `ForwardToSyslog=`  
    Valeur: `yes` ou `no`  
    Détermine si les messages sont envoyés au service syslog

  - `ForwardToWall=`  
    Valeur: `yes` ou `no`  
    Détermine si les messages sont envoyés à wall

* On peut activer la rotation des fichiers de log de plusieurs manière:

  - en spécifiant la taille maximale:  
    Par défaut, l'unité est en octets, mais on peut ajouter K, M ou G  
    Les paramètres System* ne s'appliquent qu'aux fichiers persistents, tandis que les paramètres Runtime* ne s'appliquent qu'aux fichiers volatiles

    | Persistent           | Volatile              | Valeur par défaut
    |---                   |---                    |--- 
    | `SystemMaxUse=`      | `RuntimeMaxUse=`      | 10% de l'utilisation du système de fichier
    | `SystemKeepFree=`    | `RuntimeKeepFree=`    | 15% de l'utilisation du système de fichier
    | `SystemMaxFileSize=` | `RuntimeMaxFileSize=` | 1/8 de ...MaxUse
    | `SystemMaxFiles=`    | `RuntimeMaxFiles=`    | 10

  - ou l'âge maximal:

    - `MaxFileSec=`  
      Temps maximum avant rotation  
      Par défaut: 1 month  
      Utiliser 0 pour désactiver

    - `MaxRetentionSec=`  
      Temps maximum avant suppression  
      Par défaut: 0  
      Utiliser 0 pour désactiver

  [Plus d'options](https://www.freedesktop.org/software/systemd/man/journald.conf.html)

* Penser à redémarrer le daemon après avoir modifié les configurations

  ```
  $ sudo systemctl restart systemd-journald
  ```

### Consulter les logs

* Sur certaines distributions, on peut utiliser `systemctl status systemd-journald` pour trouver l'emplacement des logs. 
  On peut également vérifier s'il y a des logs dans /var/log et /run/log

  ![](https://i.imgur.com/pANrKWv.png)

  ![](https://i.imgur.com/coyPha9.png)

* La commande `journalctl` permet d'afficher les logs.  
  Il faut soit avoir les privilèges root ou faire partie du groupe de journald (ex: `systemd-journal`)

  ```
  $ sudo journalctl -e -u NetworkManager
  $ sudo journalctl -e -t guake.desktop
  $ sudo journalctl --no-pager -p crit
  $ journalctl -t CROND
  ```

  De nombreuses options sont disponibles:

  | Option | Description
  |---     |---
  | `--no-pager` | Ne pas utiliser less  
  | `-e` | N'afficher que les dernières entrées  
  | `-r` | Afficher les entrées dans le sens inverse (du plus récent au plus ancien, au lieu du plus ancien au plus récent par défaut)  
  |||
  | `-S datetime` | (since) N'afficher que les entrées après...<br>Format datetime: `YYYY-MM-DD HH:MM:SS`, `today`, `yesterday` ou `now`
  | `-U datetime` | (until) N'afficher que les entrées jusqu'à...
  | `-D directoryName` | Afficher les logs d'un répertoire donné
  | `--file fileNamePattern` | Afficher les logs d'un fichier (path absolu, nom du fichier) ou d'un ensemble de fichiers (glob pattern)
  | `--merge` | Afficher les logs comme s'ils étaient dans un seul fichier
  |||
  | `-k` | N'afficher que les entrées du Kernel (similaire à `dmesg`)
  | `-u unitName&#124;pattern` | Filter sur unité systemd donnée
  | `-p priorityName` | Filtrer sur une priorité donnée
  | `-t identifier` | Filtrer sur un identifiant
  | `-g regex` | Filtrer sur la description

* Diférents types de messages atterissent dans différents fichiers de log. Sur CentOS les messages d'ordre général sont typiquement stockés dans le fichier /var/log/syslog; tandis que sur Ubuntu il s'agit du fichier messages. Les messages de sécurité dans secure ou auth.log

  Bien qu'il soit tentant de fier aux normes ou à des blogs, la seule manière d'être sûr est de vérifier les configs

  ![](https://i.imgur.com/RqJYTcw.png)

### Interaction entre rsyslogd et systemd-journald

* Pour envoyer les messages à rsyslogd:

  1. Éditer le fichier <ins>/etc/systemd/journald.conf</ins>.
  2. Activer ForwardToSyslog
  3. Redémarrer systemd-journald

   Par défaut sur ce système, ForwardToSyslog est déjà activé

    ```
    $ sudo grep -i forwardtosyslog /etc/systemd/journald.conf
    #ForwardToSyslog=yes
    ```

* Ou pour configurer rsyslog pour qu'il agisse comme un client de journal:

  1. Éditer le fichier <ins>/etc/rsyslog.conf</ins>
  2. Décommenter les `Modload` pour `imusock` et `imjournal`
  3. Redémarrer le daemon rsyslog

  Il est plus courant de configurer rsyslog en tant que client de journal que l'inverse, car il est possible de perdre les entrées de journal transférées vers rsyslog au démarrage du système.

### Configurer un serveur centralisé

* Utiliser un serveur centralisé nécessite des services supplémentaires qui ne sont typiquement pas installés par défaut:

  - `systemd-journal-upload` pour envoyer les logs à un serveur distant
  - `systemd-journal-remote` pour recevoir les logs d'un autre serveur. Peut attendre qu'on lui envoie des données, ou peut demander les données d'un système distant et les extraire

### Utilisation du disque

* Pour voir combien d'espace disque est utilisé par les fichiers actifs (fichiers actuellement utilisés) et les fichiers d'archive (anciens fichiers post rotation):

  ```
  $ sudo journalctl --disk-usage
  Archived and active journals take up 1.9G in the file system.
  ```

* Pour supprimer les anciennes archives — en fonction de leur taille ou leur âge:

  ```
  # journalctl --vacuum-size=SIZE
  # journalctl --vacuum-time=TIME
  ```

---

## Créer des logs

### logger

* Logger est un utilitaire permettant d'envoyer des messages d'erreur ou d'information dans les logs. Ce peut être utile pour garder une trace des actions exécutées manuellement ou via un script.

  ![](https://i.imgur.com/pMoAhmZ.png)

* L'option `-p facility.priority` permet de spécifier le type d'événement et sa priorité

  ![](https://i.imgur.com/o4EiZaC.png)

  <ins>Quelques options utiles</ins>:

  | Option | Description
  |---     |---
  | `-s`   | Envoyer le messages dans les logs et dans stderr
  | `-f fileName` | Envoyer le log dans un fichier donné
  |||
  | `-n IPorFQDN` | Envoyer le log à un serveur distant
  | `-T`          | Utiliser TCP plutôt qu'UDP
  | `-p port`     | Envoyer sur le port donné

### systemd-cat

* systemd-cat est un utilitaire plus récent, permettant également d'ajouter des logs manuellement.  
  On peut l'utiliser

  - de manière interactive. Ctrl+D pour quitter l'éditeur
  - en utilisant l'entrée standard de systemd-cat
  - en passant un argument à systemd-cat

  ![](https://i.imgur.com/drmd87e.png)
  ![](https://i.imgur.com/9kdykQA.png)

* L'option `-t facility` permet de spécifier le type d'événement  
  `-p priority` de spécifier son importance

  ![](https://i.imgur.com/fawDGuu.png)

---

## Logrotate

* Les logs peuvent consommer beaucoup d'espace.  
  Avec les techniques appropriées, on peut limiter leur taille.

* La *rotation* des logs consiste à interrompre l'envoi d'événements dans un fichier et les faire attendre dans une queue, le temps de renommer le fichier à l'aide d'un paramètre configuré et d'en créer un nouveau. Lorsque c'est fait, les événements sont débloqués et tout reprend son cours. Cela permet d'empêcher les fichiers de logs de devenir trop lourds, et d'archiver ou supprimer les anciens logs du système.

  ![](https://i.imgur.com/2NFQRcC.png)

* La commande pour effectuer la rotation des journaux est `logrotate`.  
  Plutôt que de l'exécuter manuellement, elle est souvent configurée comme tâche planifiée.

  ![](https://i.imgur.com/HQCyHZj.png)

* Plutôt que d'utiliser paramètres, on utilise ici un fichier de configuration: <ins>/etc/logrotate.conf</ins>,  
  ce qui permet de centraliser la rotation des logs

  ![](https://i.imgur.com/6PwEy02.png)
  ![](https://i.imgur.com/UM46zcM.png)

  On peut y définir, de manière générale ou au cas par cas,

  * quand effectuer la rotation:  
    - `hourly`
    - `daily`
    - `weekly DAY_OF_WEEK` (0 & 7 = dimanche)
    - `monthly`
    - `size MAX` (unités: k, M, G)

  * combien de fichiers archiver — s'il y a en plus, les plus anciens seront alors supprimés:  
    `rotate NUM`

  - s'il faut compresser les fichiers de logs archivés:  
    `compress`

  - s'il faut créer un nouveau fichier de log après la rotation:  
    `create PERMISSION OWNER GROUP`

* Notons que journald implémente également une rotation, mais qu'elle n'est pas gérée par logrotate.
