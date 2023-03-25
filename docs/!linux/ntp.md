---
title: NTP
category: Linux
---

## Théorie

* NTP est l'abbréviation de Network Time Protocole (protocole de temps réseau). Il s'agit d'un protocole permettant de maintenir l'exactitude de l'horloge de votre ordinateur grâce à une hiérarchie de serveur de part le monde.

  Dans le monde entier, il existe de nombreux mécanismes de chronométrage précis, tels que les horloges atomiques et radiales, dont l'heure exacte est transmise à des serveurs connectés. Si tous les utilisateurs se connectaient directement à ces serveurs pour avoir l'heure exacte, ils seraient rapidement dépassés. Le protocole NTP utilise donc une hiérarchie pour assurer la fluidité du service.

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

* Le daemon NTP, ntpd, est un service NTP disponible sous Linux

  ![](https://i.imgur.com/yC8APpf.png)

1. Vérifier et, si nécessaire, modifier le fichier de configuration du daemon NTP: /etc/ntp.conf.  
  Les principaux éléments qui nous intéressent dans ce fichier sont les paramètres `server`. Les zones de pool préconfigurées dans le fichier de configuration NTP conviennent généralement; toutefois, choisir une zone plus proche peut permettre une précision légèrement supérieure.

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

   On peut définir jusqu'à 4 serveurs ou zones de pool. Si le premier a un problème, NTP tentera d'utiliser le serveur suivant. Notons les différents chiffres: on utilise toujours le même pool, mais en mettant un 0 sur le premier, un 1 sur le deuxième, etc, si le premier serveur du pool a un problème, alors le daemon NTP tentera d'obtenir un autre serveur de ce pool.

   Le paramètre iburst, à la fin de chaque server configuré, est utilisé pendant la première partie du processus de synchronisation et permet d'accélérer les corrections initiales de l'heure.

2. Éliminer les incohérences de temps  
   Le terme technique est *insane time*.  
   Lorsque l'horloge logicielle de votre système présente un écart de plus de 17 minutes par rapport à l'heure réelle, alors le daemon NTP ne mettra pas à jour l'heure du système.

   Résoudre ce problème est très simple. Soit configurer l'horloge logicielle à l'aide de la commande date, soit lancer la commande ntpdate une zone de pool.

   ```
   ntpdate pool.ntp.org
   8 Sep 11:06:37 ntpdate[2872]: adjust time server 185.94.77.77 offset 0.002214 sec
   ```

3. Démarrer ou redémarrer le daemon NTP

    ```
    systemctl start ntpd
    ```

    Et pour que le daemon NTP démarre au boot:

    ```
    sudo systemctl enable ntpd
    ```

4. Finalement, vérifier le statut de la synchronisation — après 5 ou 10 minutes

    ```
    $ timedatectl
    ```
    ```
    $ ntpstat
    synchronised to NTP server (64.113.44.55) at stratum 2
      time correct to within 1329 ms
      polling server every 64 s
    ```

    Et le statut des pools.  
    `offset` indique la différence de temps qui existe entre le serveur et votre système.  
    `delay` est le nombre de millisecondes nécessaires pour que la requête de temps quitte votre système et revienne avec l'heure correcte

    ![](https://i.imgur.com/LRsrinA.png)

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

## chrony

* Le daemon NTP ou timesyncd est souvent installé par défaut. Ce n'est pas nécessaire le cas pour chrony, un daemon NTP plus récent

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
