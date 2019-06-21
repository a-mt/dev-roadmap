---
title: NTP
category: Other
---

NTP (Network Time Protocol) est un protocole réseau qui permet de synchroniser l'heure entre différents systèmes informatiques, sur des réseaux de données à latence variable.

## Installer un serveur NTP

* Installer NTP

  ```
  sudo apt-get install ntp ntpdate
  ```

* Aller sur [NTP Pool Project](http://www.pool.ntp.org/en/) et chercher une *pool zone* qui est géographiquement proche de votre serveur.

   <pre><img src="https://i.imgur.com/ypXwevK.png"></pre>

* Éditer le fichier `/etc/ntp.conf`

  * Supprimer les sources par défaut — `pool [0-3].ubuntu.pool.ntp.org iburst` ou `pool ntp.ubuntu.com`

  * Ajouter les serveurs NTP que vous avez sélectionné sur NTP Pool Project

    ```
    server 0.uk.pool.ntp.org iburst
    server 1.uk.pool.ntp.org iburst
    server 2.uk.pool.ntp.org iburst
    server 3.uk.pool.ntp.org iburst
    ```

    L'option `iburst` est recommandée: si le serveur est inaccessible, une salve de huit packets sera envoyée au lieu d'un seul seul.

    L'utilisation de l'option `burst` dans le NTP Pool Project est considérée comme un abus: elle envoie 8 packets à chaque intervalle, tandis qu'`iburst` envoie les 8 packets uniquement la première fois.

  * Vérifier que l'option `noquery` est bien sur les lignes `restrict`

    ```
    restrict -4 default kod notrap nomodify nopeer noquery limited
    restrict -6 default kod notrap nomodify nopeer noquery limited
    ```

    Cela empêchera les requêtes de gestion. Si vous ne le faites pas, votre serveur pourrait être utilisé dans des attaques de reflection NTP, ou être vulnérable aux requêtes `ntpq` et `ntpdc` qui tentent de modifier l'état du serveur.

* Autoriser le trafic UDP sur le port 123 pour autoriser les communications NTP.

  ```
  sudo ufw allow 123/udp
  ```

* Effectuer une synchronisation manuelle avec les serveurs NTP sources et le votre avec la commande `ntpdate`:

  ```
  sudo ntpdate pool.ntp.org
  ```

* Démarrer NTP

  ```
  sudo service ntp restart
  ```

* Après quelques minutes, vérifier l'état de votre serveur:

  ```
  ntpq -p
  ```

  Le résultat devrait ressembler à ça:

  ```
     remote           refid      st t when poll reach   delay   offset  jitter
  ==============================================================================
   mizbeaver.udel. .INIT.          16 u    -   64    0    0.000    0.000   0.000
   montpelier.ilan .GPS.            1 u   25   64    7   55.190    2.121 130.492
  +nist1-lnk.binar .ACTS.           1 u   28   64    7   52.728   23.860   3.247
  *ntp.okstate.edu .GPS.            1 u   31   64    7   19.708   -8.344   6.853
  +ntp.colby.edu   .GPS.            1 u   34   64    7   51.518   -5.914   6.669
  ```

  * La colonne `remote` indique le nom d'hôte des serveurs que le daemon NTP utilise
  * Le colonne `refid` indique la source utilisée par les serveurs.  
    Pour les serveurs de la Strate 1, le champ doit afficher GPS, PPS, ACTS ou PTB.  
    Pour les serveurs de la Strate 2 (et supérieur), le champ affiche l'adresse IP du serveur en amont.
  * La colonne `st` montre le numéro de strate
  * `delay`, `offset` et `jitter` indiquent la qualité de la source en terme de latence. Plus le temps est réduit, meilleure est la qualité.

* Activer NTP au démarrage

  ```
  sudo systemctl enable ntpd
  ```

## Utiliser le serveur NTP

* Une fois installé, votre serveur NTP peut être utilisé pour synchroniser le temps d'autres machines:

  ```
  ntpdate -q your_server_ip
  ```

  Le résultat devrait ressembler à ça — indique si le temps a été synchroniser et avec quelle latence:

  ```
  server your_server_ip, stratum 2, offset 0.001172, delay 0.16428
   2 Mar 23:06:44 ntpdate[18427]: adjust time server your_server_ip offset 0.001172 sec
  ```

[How to Configure NTP for Use in the NTP Pool Project on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-configure-ntp-for-use-in-the-ntp-pool-project-on-ubuntu-16-04)