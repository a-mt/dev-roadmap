---
title: NTP
category: Linux
---

## Théorie

* NTP est l'abbréviation de *Network Time Protocole* (protocole de temps réseau). Il s'agit d'un protocole réseau permettant de synchroniser l'heure entre différents systèmes informatiques sur des réseaux de données à latence variable.

  Il permet de maintenir l'exactitude de l'horloge d'un ordinateur grâce à une hiérarchie de serveur dans le monde. Dans le monde entier, il existe de nombreux mécanismes de chronométrage précis, tels que les horloges atomiques et radiales, dont l'heure exacte est transmise à des serveurs connectés. Si tous les utilisateurs se connectaient directement à ces serveurs pour avoir l'heure exacte, ils seraient rapidement dépassés. Le protocole NTP utilise donc une hiérarchie pour assurer la fluidité du service.

* Chaque niveau de la hiérarchie est appelé une *strate* (*stratum* en anglais) est est numéroté de 0 à 15:

  - Strate 0: sont les machines qui mesurent le temps. Seuls les serveurs NTP de la strate 1 sont autorisés à obtenir l'heure de ces machines
  - Strate 1: sont les serveurs NTP directement connectés aux machines de la strate 0
  - Strate 2: sont les serveurs NTP autorisés à obtenir l'heure exacte des serveurs NTP strate 1, etc.
  - Un "appareil de strate 16" désigne un appareil dont l'heure n'est pas synchronisée ou inexacte.

  ![](https://i.imgur.com/nEWSKRzm.png)

* Cette approche a longtemps fonctionné, mais en 2005 un pool NTP a été crée pour pallier à certains abus du niveau de state 1 — qui causait des retards.

  Un *pool* est un groupe relativement important de serveurs bénévoles, qui obtiennent généralement leur temps d'une strate 3 ou 4 et se mettent à disposition pour répondre à des strates supérieures. Les serveurs du pool tournent régulièrement, ainsi aucun serveur n'est submergé et le temps fourni reste relativement précis.  
  Il existe des pools par continent, par pays, et dans certains cas, par ville. Pour plus d'infos: [ntppool.org](https://www.ntppool.org/en/)

* Sous Linux, il existe plusieurs services NTP possibles: ntpd ou chrony.

## ntpd

* Le daemon NTP, ntpd, est un service NTP disponible sous Linux.

  ![](https://i.imgur.com/yC8APpf.png)

  Il est souvent installé par défaut, si ce n'est pas le cas l'installer:

  ```
  sudo apt-get install ntp ntpdate
  ```

### Configurations

* Vérifier et, si nécessaire, modifier le fichier de configuration du daemon NTP: /etc/ntp.conf.  

* Les principaux éléments qui nous intéressent dans ce fichier sont les paramètres `server`.

   ```
   $ ls /etc/ntp.conf
   /etc/ntp.conf
   $
   $ grep ^server /etc/ntp.conf
   server 0.centos.pool.ntp.org iburst
   server 1.centos.pool.ntp.org iburst
   server 2.centos.pool.ntp.org iburst
   server 3.centos.pool.ntp.org iburst
   ```

  Les zones de pool préconfigurées dans le fichier de configuration NTP conviennent généralement mais choisir une zone plus proche peut permettre une précision légèrement supérieure.

  Aller sur [NTP Pool Project](http://www.pool.ntp.org/en/) pour trouver une *pool zone* géographiquement proche de votre serveur.

   <pre><img src="https://i.imgur.com/ypXwevK.png"></pre>

* On peut définir jusqu'à 4 serveurs ou zones de pool. Si le premier a un problème, NTP tentera d'utiliser le serveur suivant. Notons les différents chiffres: on utilise toujours le même pool, mais en mettant un 0 sur le premier, un 1 sur le deuxième, etc, si le premier serveur du pool a un problème, alors le daemon NTP tentera d'obtenir un autre serveur de ce pool.

   L'option `iburst` est recommandée: si le serveur est inaccessible pendant la première partie du processus de synchronisation, une salve de huit packets sera envoyée au lieu d'un seul seul, ce qui permet d'accélérer les corrections initiales de l'heure.

   L'utilisation de l'option `burst` dans le NTP Pool Project est considérée comme un abus: elle envoie 8 packets à chaque intervalle, tandis qu'`iburst` envoie les 8 packets uniquement la première fois.

### Insane time

* Éliminer les incohérences de temps  
   Le terme technique est *insane time*.  
   Lorsque l'horloge logicielle de votre système présente un écart de plus de 17 minutes par rapport à l'heure réelle, alors le daemon NTP ne mettra pas à jour l'heure du système.

   Résoudre ce problème est très simple. Soit configurer l'horloge logicielle à l'aide de la commande date, soit lancer la commande ntpdate une zone de pool.

   ```
   ntpdate pool.ntp.org
   8 Sep 11:06:37 ntpdate[2872]: adjust time server 185.94.77.77 offset 0.002214 sec
   ```

### Démarrer le service

* Démarrer ou redémarrer le daemon NTP

    ```
    systemctl start ntpd
    ```

    Et pour que le daemon NTP démarre au boot:

    ```
    sudo systemctl enable ntpd
    ```

* Après 5 ou 10 minutes, vérifier le statut de la synchronisation

    ```
    $ timedatectl
    ```
    ```
    $ ntpstat
    synchronised to NTP server (64.113.44.55) at stratum 2
      time correct to within 1329 ms
      polling server every 64 s
    ```

* Et le statut des pools.

  ```
  $ ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
  ==============================================================================
   mizbeaver.udel. .INIT.          16 u    -   64    0    0.000    0.000   0.000
   montpelier.ilan .GPS.            1 u   25   64    7   55.190    2.121 130.492
  +nist1-lnk.binar .ACTS.           1 u   28   64    7   52.728   23.860   3.247
  *ntp.okstate.edu .GPS.            1 u   31   64    7   19.708   -8.344   6.853
  +ntp.colby.edu   .GPS.            1 u   34   64    7   51.518   -5.914   6.669
  ```

  - `remote` indique le nom d'hôte des serveurs que le daemon NTP utilise

  - `refid` indique la source utilisée par les serveurs.  
    Pour les serveurs de la Strate 1, le champ doit afficher GPS, PPS, ACTS ou PTB.  
    Pour les serveurs de la Strate 2 (et supérieur), le champ affiche l'adresse IP du serveur en amont.

  - `st` montre le numéro de strate

  - `delay`, `offset` et `jitter` indiquent la qualité de la source en terme de latence.  
    Plus le temps est réduit, meilleure est la qualité.

    offset indique la différence de temps entre le système et le serveur NTP.  
    delay est le nombre de millisecondes nécessaires pour que la requête de temps quitte le système et revienne avec l’heure correcte


### Serveur NTP

Pour démarrer un serveur NTP et le rendre accessible à d'autre:

1. Vérifier dans ntd.conf que l'option `noquery` est bien sur les lignes `restrict`

    ```
    restrict -4 default kod notrap nomodify nopeer noquery limited
    restrict -6 default kod notrap nomodify nopeer noquery limited
    ```

    Ça empêchera les requêtes de gestion: si vous ne le faites pas, votre serveur pourrait être utilisé dans des attaques de reflection NTP, ou être vulnérable aux requêtes `ntpq` et `ntpdc` qui tentent de modifier l'état du serveur.

2. Autoriser le trafic UDP sur le port 123 pour autoriser les communications NTP.

    ```
    $ sudo ufw allow 123/udp
    ```

3. Effectuer une synchronisation manuelle avec les serveurs NTP sources et le votre avec la commande `ntpdate`:

    ```
    $ sudo ntpdate pool.ntp.org
    ```

4. Redémarrer NTP

    ```
    $ sudo service ntp restart
    ```

    Après quelques minutes, vérifier l'état du serveur et des pools

    ```
    $ ntpstat
    $ ntpq -p
    ```

5. Activer NTP au démarrage

    ```
    sudo systemctl enable ntpd
    ```

6. Une fois installé, le serveur NTP peut être utilisé pour synchroniser le temps d'autres machines:

    ```
    $ ntpdate -q IP_ADDRESS
    server IP_ADDRESS, stratum 2, offset 0.001172, delay 0.16428
     2 Mar 23:06:44 ntpdate[18427]: adjust time server IP_ADDRESS offset 0.001172 sec
    ```

    Le résultat indique le temps de la synchronisation et la latence.

    [How to Configure NTP for Use in the NTP Pool Project on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-configure-ntp-for-use-in-the-ntp-pool-project-on-ubuntu-16-04)

---

## timesyncd

* systemd-timesyncd est une implémentation lightweight du daemon NTP, qui ne supporte que la partie client — la synchronisation temporelle. Il remplace ntpd pour les machines qui ne font pas tourner de serveur NTP.

  ```
  $ systemctl status systemd-timesyncd
  ● systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2022-11-01 12:54:52 CET; 5h 21min ago
       Docs: man:systemd-timesyncd.service(8)
   Main PID: 654 (systemd-timesyn)
     Status: "Synchronized to time server 185.125.190.56:123 (ntp.ubuntu.com)."
      Tasks: 2 (limit: 4915)
     CGroup: /system.slice/systemd-timesyncd.service
             └─654 /lib/systemd/systemd-timesyncd

  nov. 01 12:54:52 am-XPS-13-7390 systemd[1]: Starting Network Time Synchronization...
  nov. 01 12:54:52 am-XPS-13-7390 systemd-timesyncd[654]: The system is configured to read the RTC time in the local time zone. This mode can not be fully supported. All system time to RTC updates are disabled.
  nov. 01 12:54:52 am-XPS-13-7390 systemd[1]: Started Network Time Synchronization.
  nov. 01 11:58:16 am-XPS-13-7390 systemd-timesyncd[654]: Synchronized to time server [2620:2d:4000:1::40]:123 (ntp.ubuntu.com).
  nov. 01 12:31:53 am-XPS-13-7390 systemd-timesyncd[654]: Synchronized to time server 185.125.190.56:123 (ntp.ubuntu.com).
  ```

* `timedatectl` prend des options supplémentaires lorsqu'il utilisé avec systemd-timesynd

  ``` bash
  # timedatectl
                 Local time: Sun 2023-03-05 16:13:50 UTC
             Universal time: Sun 2023-03-05 16:13:50 UTC
                   RTC time: Sun 2023-03-05 16:13:50
                  Time zone: Etc/UTC (UTC, +0000)
  System clock synchronized: yes
                NTP service: active
            RTC in local TZ: no
  ```

---

## chrony

* Le daemon NTP ou timesyncd est souvent installé par défaut. Ce n'est pas nécessairement le cas pour chrony, un daemon NTP plus récent

  ![](https://i.imgur.com/en8KFj2.png)

1. Comme ntpd, chrony utilise un fichier de configuration pour définir les pools à utiliser.  
   Suivant la distribution, ce peut être /etc/chrony.conf ou /etc/chrony/chrony.conf

   ![](https://i.imgur.com/1byrkH0.png)

   Un paramètre de chrony différent de celui de ntpd est `maxsources`, qui détermine le nombre de serveurs pouvant être sélectionnés dans un pool donné. Dans l'exemple suivant, si chrony a essayé 4 serveurs différents dans le 1er pool sans succès, alors il passe au pool suivant.

   ![](https://i.imgur.com/5EZnwnD.png)

   Un autre paramètre intéressant est `rtcsync`: lorsqu'activé (si la ligne n'est pas commentée), alors chrony va également mettre à jour l'horloge matérielle — aussi appelé l'horloge RTC.

   ![](https://i.imgur.com/cV4iJhh.png)

2. Démarrer ou redémarrer le daemon chrony

    ![](https://i.imgur.com/0jit2GS.png)

    L'activer pour que le daemon démarre au boot

3. Vérifier le statut de la synchronisation

    ![](https://i.imgur.com/9lEoL3B.png)

    Et le statut des pools.

    ![](https://i.imgur.com/jBoymTK.png)
    ![](https://i.imgur.com/wpYcx84.png)
