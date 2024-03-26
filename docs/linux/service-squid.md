---
title: Squid
category: Linux > Proxy
---

## Pourquoi faire

* Si on a un réseau interne, par défaut, lorsque les employés veulent visiter un site web, leur connexion va directement à ce serveur web.  
  On peut modifier cette configuration et ajouter un serveur proxy à notre réseau interne. Ainsi, lorsqu'un employé veut se connecter à un site, le traffic sortira de son ordinateur, passera par le proxy, et atteindra finalement le site.

* Cette configuration permet de faire des choses intéressantes:

  - analyser le trafic web
  - prévenir les virus connus. Si quelqu'un tente de télécharger une pièce jointe ou fichier exécutable infecté, il est possible de l'en empêcher
  - bloquer certains sites web
  - mettre en cache les sites web fréquemment consultés, ce qui accélère considérablement les activités web et les téléchargements des employés

## Installer

* Un proxy couramment utilisé est squid

    ``` bash
    sudo dnf install squid
    sudo systemctl start squid
    sudo systemctl enable squid
    ```

* Squid permet de définir avec précision qui peut accéder au proxy et à quoi il peut accéder. Les règles d'accès se définissent dans `/etc/squid/squid.conf`

## Déclarer des ACL

* Les lignes commençant par "acl" définissent des filtres. Ces filtres ne sont pas appliqués, simplement déclarés.

* Chaque acl contient
    - un nom, libre de choix
    - un type. "src" pour définir une adresse IP source, "port" pour le port
    - une valeur. 10.11.12.0/8 singifie que ce filtre s'applique à tout trafic réseau provenant de 10.11.12

    ```
    acl localnet src 10.11.12.0/8
    acl external src 203.0.113.0/24

    acl SSL_ports port 443
    acl Safe_ports port 80          # http
    acl Safe_ports port 21          # ftp
    acl Safe_ports port 443         # https
    acl Safe_ports port 70          # gopher
    acl Safe_ports port 210         # wais
    acl Safe_ports port 1025-65535  # unregistered ports
    acl Safe_ports port 280         # http-mgmt
    acl Safe_ports port 488         # gss-http
    acl Safe_ports port 591         # filemaker
    acl Safe_ports port 777         # multiling http

    acl CONNECT method CONNECT
    ```

## Déclarer des règles d'accès

* Après avoir déclarés toutes les règles dont on a besoin dans les acl, pour appliquer les règles, on autorise ou rejete l'accès à chaque acl.

    ```
    # deny request to certain unsafe ports
    http_access deny !Safe_ports

    # deny CONNECT to other than secure SSL ports
    http_access deny CONNECT !SSL_ports

    # only allow cachemgr access from localhost
    http_access allow localhost manager
    http_access deny manager
    ```

* Pour empêcher les utilisateurs du proxy d'accéder à d'autres services hébergés sur notre serveur Squid:

    ```
    http_access deny to_locahost
    ```

    Sans cette ligne, quelqu'un pourrait par exemple être en mesure d'accéder à un daemon mysql tournant sur le serveur.

* Les règles sont traités dans l'ordre, il est donc recommendé de commencer par les règles de regus, puis les règles d'autorisation, et enfin se rabattre sur le refus du reste

    ```
    acl youtube dstdomain .youtube.com
    # ...

    http_access deny youtube

    http_access allow localnet
    http_access allow localhost
    http_access deny all
    ```

    Ou en peut écrire:

    ```
    httpd_access allow localhost !youtube
    ```

## Redémarrer

* Pour appliquer les changements, recharger le service

    ```
    sudo systemctl reload squid.service
    ```

  Pour les utilisateurs déjà connectés au proxy, leur session sera autorisée à continuer mais ils ne pourront plus établir de nouvelles connexions.

* Si on veut forcer la nouvelle configuration, même pour les sessions actuellement actives:

    ```
    sudo systemctl restart squid.service
    ```

    Certaines connexions des utilisateurs du proxy peuvent être brusquement interrompues. En général, on préfère être gracieux, et donner une chance à l'utilisateur de finir ce qu'il a commencé: reload est alors plus approprié
