---
title: Temps
category: Linux
---

## Théorie

* Chaque jour est une période de 24 heures qui découle de la rotation de la terre. L'heure exacte est maintenue à l'aide d'horloges atomiques précises.

* Garder l'heure du système exacte est important:

  1. pour les tâches automatisées qui s'exécutent via cron ou systemd. L'heure et la date sont utilisés pour déterminer quand une tâche doit être exécutée.

  2. pour les logs. Vous voulez que vos journaux reflètent les dates et heures exactes des événements sur votre système.

  3. pour la sécurité. Il existe souvent des mécanismes qui limitent la validité d'une opération entre deux serveurs dans le temps. Un temps désynchronisé peut être à l'origine de requêtes rejetées.

* Le temps universel, Universal Time Coordinated (UTC), est un temps qui ne change pas en fonction de l'endroit où vous vous trouvez dans le monde.

  L'emplacement du temps UTC est à zéro degré de longitude, et son emplacement est à Greenwich (quartier de Londres). C'est la raison pour laquelle le temps UTC est parfois designé comme étant le temps Greenwich Mean Time (GMT) — ce est un abus de language car GMT est un fuseau horaire.

* Chaque fuseau horaire est une zone désignée sur la terre, identifiée par la distance qui la sépare de cet emplacement de zéro degré de longitude. Le fuseau horaire s'exprime en nombre d'heures et minutes de différence par rapport à l'UTC.

  L'heure locale dépend de votre position dans le monde. Cette heure est définie sur la base du temps UTC, mais ajoute ou soustrait du temps en fonction du fuseau horaire de votre emplacement et, si applicable, de l'heure d'été.

* Linux dispose de deux types d'horloges: matérielle et logicielle.

  - l'horloge matérielle (*real time clock*, RTC) est maintenue par le firmware et, lorsque le système n'est pas en fonctionnement, par une batterie.  
    Bien que sa précision soit acceptable, elle n'est pas aussi précise qu'une horloge atomique. Raison pour laquelle de nombreux admins utilisent un protocole pour maintenir la précision de l'horloge du système.

  - l'horloge logicielle (*system time clock*) est maintenue par Linux. Lorsque le système démarre, l'horloge logicielle est réglée sur l'heure de l'horloge matérielle. Cette heure n'étant pas très précise, elle va par la suite être mise à jour par un protocole réseau.

---

## Voir l'heure

Il y a 3 commandes possibles:

- pour visualiser l'heure de l'horloge matérielle  
  Notons qu'il est nécessaire d'avoir les privilèges root

  ```
  $ sudo hwclock --show
  2021-08-28 16:13:13.469282-0400
  $
  $ sudo hwclock -r
  2021-08-28 16:13:30.080864-0400
  ```

- pour visualiser l'heure de l'horloge logicielle

  ```
  $ date
  Sat Aug 28 16:13:59 EDT 2021
  ```

- Et si le système est équipé de systemd, on peut également visualiser l'heure de l'horloge matérielle et logicielle

  ```
  $ timedatectl
                        Local time: Sat 2021-08-28 16:18:23 EDT
                    Universal time: Sat 2021-08-28 20:18:23 UTC
                          RTC time: Sat 2021-08-28 20:18:24
                         Time zone: America/Indiana/Indianapolis (EDT, -0400)
         System clock synchronized: yes
  systemd-timesyncd.service active: yes
  ```

## Régler l'horloge matérielle

* On peut régler l'horloge matérielle sur l'horloge logicielle.  
  Note: Utiliser une horloge logicielle pour régler l'horloge n'est généralement pas une bonne idée, à moins que l'hrologe logicielle ne soit mise à jour par un daemon

  ```
  $ sudo hwclock --systohc
  ```

  L'horloge matérielle utilise le temps UTC. Il est possible de la passer en temps local avec l'option `--localtime` mais ce n'est pas recommendé: les adjustements d'heure, come l'heure d'été, risquent de ne pas fonctionnement correctement. Si l'heure de votre système Linux est maintenue en utilisant l'UTC, vous pouvez définir le fuseau horaire de votre emplacement et les utilitaires afficheront l'heure correcte pour votre emplacement. On peut repasser le temps de l'horloge matérielle en temps UTC avec l'otpion `--utc`.

* Si le système doit rester en dehors du réseau et qu'il n'est pas possible d'utiliser un protocole réseau pour maintenir l'horloge à la bonne heure, il est possible d'essayer de compenser la manque de précision de l'horloge (appelé un *clock drift*):

  ```
  $ sudo hwclock --debug   
  hwclock from util-linux 2.31.1
  System Time: 1662139062.328273
  Trying to open: /dev/rtc0
  Using the rtc interface to the clock.
  Last drift adjustment done at 0 seconds after 1969
  Last calibration done at 0 seconds after 1969
  Hardware clock is on local time
  Assuming hardware clock is kept in local time.
  Waiting for clock tick...
  ...got clock tick
  Time read from Hardware Clock: 2022/09/02 17:17:43
  Hw clock time : 2022/09/02 17:17:43 = 1662131863 seconds since 1969
  Time since last adjustment is 1662131863 seconds
  Calculated Hardware Clock drift is 0.000000 seconds
  2022-09-02 17:17:42.949472+0200
  ```

  ```
  $ sudo hwclock --adjust
  Needed adjustment is less than one second, so not setting clock.
  ```

  Note: Quand on utilise --adjust, le fichier `/etc/adjtime` est utilisé

## Régler l'horloge logicielle

L'horloge logicielle peut être mise à jour manuellement. Notons que si votre système utilise un service pour synchroniser le temps via protocole réseau, alors vous ne pourrez pas modifier l'heure de l'horloge de cette manière.

1. Manuellement avec `date`  
   Format: MMDDHHmmCCYY.SS (CC, YY et SS optionnels)

    ```
    $ sudo date --utc 123112302021.00
    Fri Dec 31 12:30:00 UTC 2021
    ```

2. À partir de l'horloge matérielle avec `hwclock`

    ```
    sudo hwclock --hctosys
    ```

3. Avec timedatectl  
   Format: "CCYY-MM-DD HH:mm"

   ```
   $ sudo timedatectl set-time "2021-12-31 12:45"
   Failed to set time: Automatic time synchronization is enabled
   $
   $ sudo timedatectl set-ntp 0
   $
   $ sudo timedatectl set-time "2021-12-31 12:45"
   $ timedatectl
                          Local time: Fri 2021-12-31 12:45:08 EST
                      Universal time: Fri 2021-12-31 17:45:08 UTC
                            RTC time: Fri 2021-12-31 17:45:09
                           Time zone: America/Indiana/Indianapolis (EST, -0500)
           System clock synchronized: no
    systemd-timesyncd.service active: no
                     RTC in local TZ: no
   ```
   ```
   $ sudo systemctl restart systemd-timesyncd
   ```

## Afficher le fuseau horaire

* On peut utiliser la commande `date`

  Dans l'exemple suivant EDT indique Eastern Daylight Savings: le fuseau horaire New York/America à l'heure d'été ; si l'heure d'été n'était utilisée, on aurait EST.
  
  ```
  $ date
  Sat Aug 28 16:31:12 EDT 2021
  ```

* Ou `timedatctl`  
  Un peu plus verbeux, non seulement le fuseau horaire est affiché, mais l'information sur l'ajustement de l'heure d'état est également affichée.

  ```
  $ timedatectl
        Local time: Sat 2021-08-28 16:33:50 EDT
    Universal time: Sat 2021-08-28 20:33:50 UTC
          RTC time: Sat 2021-08-28 20:33:50
         Time zone: America/New_York (EDT, -0400)
       NTP enabled: yes
  NTP synchronized: yes
   RTC in local TZ: no
        DST active: yes
   Last DST change: DST began at
                    Sun 2021-03-14 01:59:59 EST
                    Sun 2021-03-14 03:00:00 EDT
   Next DST change: DST ends (the click jumps one hour backwards) at
                    Sun 2021-11-07 01:59:59 EDT
                    Sun 2021-11-07 01:00:00 EST
  ```

* Typiquement, le fuseau horaire est définit au moment de l'installation de l'OS.  
  Un lien symbolique /etc/localtime est crée, on peut donc vérifier vers quel fichier le lien dirige

  ```
  $ ls -l /etc/localtime
  lrwxrwxrwx 1 root root 32 sept. 10 08:57 /etc/localtime -> /usr/share/zoneinfo/America/New_York
  ```
 
  Les fuseaux horaires disponibles sont dans /usr/share/zoneinfo

  ```
  $ ls /usr/share/zoneinfo
  Africa      Brazil   Egypt    GB         Hongkong     Jamaica            Mexico   Poland      ROC        US
  America     Canada   Eire     GB-Eire    HST          Japan              MST      Portugal    ROK        UTC
  Antarctica  CET      EST      GMT        Iceland      Kwajalein          MST7MDT  posix       Singapore  WET
  Arctic      Chile    EST5EDT  GMT0       Indian       leap-seconds.list  Navajo   posixrules  SystemV    W-SU
  Asia        CST6CDT  Etc      GMT-0      Iran         Libya              NZ       PRC         Turkey     zone1970.tab
  Atlantic    Cuba     Europe   GMT+0      iso3166.tab  localtime          NZ-CHAT  PST8PDT     UCT        zone.tab
  Australia   EET      Factory  Greenwich  Israel       MET                Pacific  right       Universal  Zulu
  ```

* Sous les distributions basé Debian, on peut également lire le fuseau horaire dans /etc/timezone

  ```
  $ cat /etc/timezone
  America/New_York
  ```

## Changer de Fuseau horaire

* Pour changer de fuseau horaire du système, il faut redéfinir le lien symbolique /etc/localtime.  
  Parce que le lien existe déjà, utiliser -f (pour force) pour redéfinir le lien

  ```
  # readlink -f /etc/localtime
  /usr/share/zoneinfo/America/New_York
  ```

  ```
  # ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime
  #
  # readlink -f /etc/localtime
  /usr/share/zoneinfo/Europe/London
  #
  # timedatectl
  $ timedatectl
        Local time: Sat 2021-08-28 21:38:30 BST
    Universal time: Sat 2021-08-28 20:38:30 UTC
          RTC time: Sat 2021-08-28 20:38:30
         Time zone: Europe/Londo (BST, +0100)
       NTP enabled: yes
  NTP synchronized: yes
   RTC in local TZ: no
        DST active: yes
   Last DST change: DST began at
                    Sun 2021-03-28 00:59:59 EST
                    Sun 2021-03-28 02:00:00 EDT
   Next DST change: DST ends (the click jumps one hour backwards) at
                    Sun 2021-10-31 01:59:59 BST
                    Sun 2021-10-31 01:00:00 EST
  ```

* Pour changer de fuseau horaire pour un seul utilisateur, utiliser la variable d'environnement TZ.  
  La commande `tzselect` permet de sélectionner la valeur à définir. Elle ne définit pas la variable d'environnement mais indique simplement comment le faire.

  ```
  $ tzselect
  Please identify a location so that time zone rules can be set correctly.
  Please select a continent, ocean, "coord", or "TZ".
   1) Africa
   2) Americas
   3) Antarctica
   4) Asia
   5) Atlantic Ocean
   6) Australia
   7) Europe
   8) Indian Ocean
   9) Pacific Ocean
  10) coord - I want to use geographical coordinates.
  11) TZ - I want to specify the time zone using the Posix TZ format.
  #? 4
  Please select a country whose clocks agree with yours.
   1) Afghanistan            29) Kyrgyzstan
   2) Antarctica             30) Laos
   3) Armenia            31) Lebanon
   4) Azerbaijan             32) Macau
   5) Bahrain            33) Malaysia
   6) Bangladesh             34) Mongolia
   7) Bhutan             35) Myanmar (Burma)
   8) Brunei             36) Nepal
   9) Cambodia             37) Oman
  10) China            38) Pakistan
  11) Christmas Island           39) Palestine
  12) Cocos (Keeling) Islands        40) Philippines
  13) Cyprus             41) Qatar
  14) East Timor             42) Réunion
  15) French Southern & Antarctic Lands  43) Russia
  16) Georgia            44) Saudi Arabia
  17) Hong Kong            45) Seychelles
  18) India            46) Singapore
  19) Indonesia            47) Sri Lanka
  20) Iran             48) Syria
  21) Iraq             49) Taiwan
  22) Israel             50) Tajikistan
  23) Japan            51) Thailand
  24) Jordan             52) Turkmenistan
  25) Kazakhstan             53) United Arab Emirates
  26) Korea (North)          54) Uzbekistan
  27) Korea (South)          55) Vietnam
  28) Kuwait             56) Yemen
  #? 18

  The following information has been given:

    India

  Therefore TZ='Asia/Kolkata' will be used.
  Selected time is now: mardi 1 novembre 2022, 21:21:22 (UTC+0530).
  Universal Time is now:  mardi 1 novembre 2022, 15:51:22 (UTC+0000).
  Is the above information OK?
  1) Yes
  2) No
  #? 1

  You can make this change permanent for yourself by appending the line
    TZ='Asia/Kolkata'; export TZ
  to the file '.profile' in your home directory; then log out and log in again.

  Here is that TZ value again, this time on standard output so that you
  can use the /usr/bin/tzselect command in shell scripts:
  Asia/Kolkata
  $
  $ echo $TZ

  $
  ```
