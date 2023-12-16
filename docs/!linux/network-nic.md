---
title: Interfaces
category: Linux, Network
---

## Norme de nommage

* Contrairement aux autres appareils, les appareils réseau ne sont pas associés à des fichiers spéciaux /dev (également connu sous le nom de *device nodes*), ils sont uniquement connus par leur nom.

### Ancien standard

* Historiquement, le nom des interfaces réseau était composé du type de l'interface réseau suivit d'un numéro:

    * `eth` pour les interfaces Ethernet (donc si on accède au réseau via un câble Ethernet)  
      Ex: eth0, eth1, eth5

    * `wlan` pour les interfaces Wi-Fi (donc on accède au réseau sans-fil)  
      Ex: wlan0, wlan1, wlan2
  
  Plusieurs appareils virtuels pouvaient également être associés à un appareil physique, ce qui permettait de supporter plusieurs adresses IP sur une même carte réseau. Pour l'indiquer, le nom de l'interface était suffixé de deux-point et un numéro: `eth0:0` serait le premier alias sur eth0. Cette méthode est obsolète et n'est pas compatible avec IPv6.

* Le problème de cette convention de nommage c'est que les noms ne sont pas toujours prédictibles, et souvent, changent après un redémarrage — la recherche de périphériques n'étant pas déterministe pour les systèmes modernes.

  De nombreux admins système ont résolu ce problème de manière simple: en codant en dur les associations entre les adresses matérielles (MAC) et les noms de périphériques dans les fichiers de configuration du système et les scripts de démarrage. 

  Bien que cette méthode fonctionne, elle nécessite un réglage manuel. Elle pose également problème quand les adresses MAC ne sont pas fixes, ce qui peut se produire dans les systèmes virtualisés.

### Nouveau standard

* Le standard PNIDN (*Predictable Network Interface Device Names*) spécifie une nouvelle convention de nommage.  
  Le nom des interfaces réseau est désormais composé

  1. du type de l'interface réseau, sur 2 caractères

        - `en` pour Ethernet
        - `wl` pour Wireless LAN
        - `ww` pour Wireless WAN

  2. suivit de l'identifiant de l'interface, qui peut être:

        - pour les périphériques embarqués, le numéro d'index fourni par le firmware  
          Ex: eno1

        - pour les PCI Express en hotplug, le numéro d'index fourni par le firmware  
          Ex: ens1

        - et sinon, l'emplacement physique de la connexion matérielle (port X slot Y)  
          Ex: enp2s0

        - ou éventuellement, l'adresse MAC  
          Ex: enx7837d1ea46da

  Par exemple enp0s3 est une connexion Ethernet sur le port 0 slot 3.

  On peut voir que les noms sont bel et bien corrélés avec les emplacements physique du matériel sur un système PCI:

  ``` bash
  $ ip link show | grep enp
  2: enp4s2: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN mode DEFAULT qlen 1000
  3: enp2s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT qlen 1000

  $ lspci | grep Ethernet
  02:00.0 Ethernet controller: Marvell Technology Group Ltd. 88E8056 PCI-E Gigabit Ethernet Controller (rev 12)
  04:02.0 Ethernet controller: Marvell Technology Group Ltd. 88E8001 Gigabit Ethernet Controller (rev 14)
  ```

  ``` bash
  $ ip link show | grep wl
  3: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP mode DORMANT qlen 1000

  $ lspci | grep Centrino
  03:00.0 Network controller: Intel Corporation Centrino Advanced-N 6205 [Taylor Peak] (rev 34)
  ```

* `lo` est l'interface de loopback, qui pour rappel est une adresse spéciale utilisée pour envoyer des message à l'interface réseau locale.

* Note: il est possible de désactiver le nouveau schéma et de revenir aux noms classiques — eth0, wlan0.

---

## ifconfig vs ip

* `ip` (du package iproute2) est un utilitaire permettant d'afficher et configurer les paramètres d'interfaces réseau, le routage et le tunneling.
  Tous les changements effectués avec `ip` ne servent qu'à dépanner, ils sont effacés après un reboot. Pour des modifications permanentes, il faut modifier les configurations du network manager.

* `ifconfig` (du package net-tools) est un utilitaire d'administration système qu'on trouve depuis longtemps dans les systèmes d'exploitation UNIX, et permet d'afficher et configurer les paramètres de l'interface réseau. Il a été remplacé par `ip` et certains distributions Linux ne l'installent plus par défaut: ip est plus polyvalent qu'ifconfig et plus efficace car il utilise des sockets netlink plutôt que des appels système ioctl. Tout comme ip, les changements effectués par ifconfig ne sont pas persistents.

* La syntaxe générale d'ip est

  ```
  ip [OPTIONS] OBJECT [COMMAND]
  ```

  où OBJECT peut être

  | OBJECT   | Function
  |---       |---
  | address  | Addresse IPv4 ou IPv6
  | link     | Interface réseau
  | maddress | Addresse Multicast
  | monitor  | Surveiller les messages netlink
  | route    | Entrées de la table de routage
  | rule     | Règles de routage
  | tunnel   | Tunnel sur IP

---

## Interface

* Pour trouver le nom de l'interface réseau:

  ``` bash
  ip link show  # Long version
  ip l          # Short version
  ```

  On peut également filtrer le résultat sur une interface donnée

  ``` bash
  $ ip link show
  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
      link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
  3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
      link/ether 02:42:17:c9:b6:7e brd ff:ff:ff:ff:ff:ff

  $ ip link show wlp164s0
  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
  ```

* -br permet d'afficher une version brève:

  ``` bash
  $ ip -br link show
  lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP> 
  wlp164s0         UP             c8:cb:9e:b8:7b:cb <BROADCAST,MULTICAST,UP,LOWER_UP> 
  docker0          DOWN           02:42:17:c9:b6:7e <NO-CARRIER,BROADCAST,MULTICAST,UP>
  ```

* -s permet d'afficher des statistiques:

  ``` bash
  $ ip -s link show wlp164s0
  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
      RX: bytes  packets  errors  dropped overrun mcast   
      738189855  601367   0       1529    0       0       
      TX: bytes  packets  errors  dropped carrier collsns 
      37882695   89389    0       0       0       0 
  ```

## Activer/désactiver une interface

* Mettre une interface hors service:

  ``` bash
  $ sudo ip link set eth0 down
  ```

  La remettre en service

  ``` bash
  $ sudo ip link set eth0 up
  ```

## Legacy: ifconfig

* `ifconfig`, sans paramètres, affiche les informations de toutes les interfaces reconnues par le système.  
  On peut notamment y trouver leur adresses IP et MAC.  
  On peut filtrer le résultat sur une interface donnée

  ``` bash
  $ ifconfig
  lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
          inet 127.0.0.1  netmask 255.0.0.0
          inet6 ::1  prefixlen 128  scopeid 0x10<host>
          loop  txqueuelen 1000  (Local Loopback)
          RX packets 22796  bytes 3585673 (3.5 MB)
          RX errors 0  dropped 0  overruns 0  frame 0
          TX packets 22796  bytes 3585673 (3.5 MB)
          TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

  wlp164s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
          inet 172.16.2.140  netmask 255.255.255.0  broadcast 172.16.2.255
          inet6 2001:861:33c0:5740:f314:e7e8:65f9:8cbc  prefixlen 64  scopeid 0x0<global>
          inet6 2001:861:33c0:5740:9dbb:377a:3c83:6d59  prefixlen 64  scopeid 0x0<global>
          inet6 fe80::7e2e:17ed:912c:897b  prefixlen 64  scopeid 0x20<link>
          ether c8:cb:9e:b8:7b:cb  txqueuelen 1000  (Ethernet)
          RX packets 649010  bytes 814254013 (814.2 MB)
          RX errors 0  dropped 2195  overruns 0  frame 0
          TX packets 109296  bytes 33750920 (33.7 MB)
          TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
  ...

  $ ifconfig wlp164s0 | head -1
  wlp164s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
  ```

* Mettre une interface hors service:

  ``` bash
  $ sudo ifconfig eth0 down
  ```
  ``` bash
  $ sudo ifdown eth0
  ```

  La remettre en service:

  ``` bash
  $ sudo ifconfig eth0 up
  ```
  ``` bash
  $ sudo ifup eth0
  ```

---

## Configurations statique vs dynamique

* Ici le réseau est entièrement configuré, bien qu'on ne l'ai pas paramètré manuellement: c'est qu'il s'est configuré automatiquement en demandant ces détails à un serveur DHCP ou un mécanisme similaire. En d'autres termes, le réseau est configuré dynamiquement.

* Tous les paramètres réseau, adresse IP, routeurs, résolveurs DNS, routes réseaux, etc, peuvent être configurés de manière dynamique ou statique.

  - Dans le cas d'une <ins>configuration dynamique</ins>, l'appareil reçoit généralement ses paramètres d'un service tel que DHCP, le protocole de configuration dynamique des hôtes (*Dynamic Host Configuration Protocol*)

  - Avec une <ins>configuration statique</ins>, on ajoute manuellement ces paramètres nous-même.

## Fichiers de configuration

* Historiquement, pour rendre des configurations permanentes on utilisait des fichiers de configuration. Le problème c'est que

  1. Chaque distribution possède son propre ensemble de fichiers/répertoires,  
     qui peuvent également varier suivant la version de la distribution

      - Red Hat

        ```
        /etc/sysconfig/network
        /etc/sysconfig/network-scripts/ifcfg-ethX
        /etc/sysconfig/network-scripts/ifcfg-ethX:Y
        /etc/sysconfig/network-scripts/route-ethX
        ```

      - Debian

        ```
        /etc/network/interfaces
        ```

      - SUSE

        ```
        /etc/sysconfig/network
        ```

  2. Les fichiers de configuration peuvent facilement gérer des situations statiques, alors que les systèmes modernes ont souvent des configurations dynamiques:

    - les réseaux peuvent changer lorsqu'un appareil est déplacé d'un endroit à l'autre
    - les appareils sans fils peuvent disposer d'un large choix de réseaux auxquels se connecter
    - les appareils peuvent changer au fur à mesure que des appareils sont allumés ou éteints  
       

* Aujourd'hui on utilise plutôt des utilitaires pour manipuler et mettre à jour les configurations, notamment Network Manager. Bien que Network Manager utilise toujours des fichiers de configuration, il ajoute une couche d'abstraction qui nous permet de facilement passer d'une distribution à l'autre ou d'une interface à l'autre.

---

## nmcli

* La commande `nmcli` permet d'accéder et modifier les configurations du network manager — qui sont elles persistentes.  
  Le NetworkManager stocke les configuration du réseau sous forme de "connexions".  
  Une connexion est "active" lorsqu'un appareil utilise la configuration de cette connexion pour créer un réseau ou s'y connecter.  
  Une seule connexion peut être active sur un appareil à un moment donné, les connexions supplémentaires peuvent être utilisées pour passer rapidement d'un réseau à l'autre et d'une configuration à l'autre.

### Lister les interfaces

* Pour afficher les interfaces connues du network manager:

  ``` bash
  $ nmcli device status
  DEVICE            TYPE      STATE         CONNECTION    
  wlp164s0          wifi      connected     Bbox-86B853B2 
  docker0           bridge    connected     docker0       
  p2p-dev-wlp164s0  wifi-p2p  disconnected  --            
  lo                loopback  unmanaged     --
  ```

  Pour afficher les informations d'une interface:

  ``` bash
  $ nmcli device show wlp164s0
  GENERAL.DEVICE:                         wlp164s0
  GENERAL.TYPE:                           wifi
  GENERAL.HWADDR:                         C8:CB:9E:B8:7B:CB
  GENERAL.MTU:                            1500
  GENERAL.STATE:                          100 (connected)
  GENERAL.CONNECTION:                     Bbox-86B853B2
  GENERAL.CON-PATH:                       /org/freedesktop/NetworkManager/ActiveConnection/1
  IP4.ADDRESS[1]:                         192.168.1.4/24
  IP4.GATEWAY:                            192.168.1.254
  IP4.ROUTE[1]:                           dst = 192.168.1.0/24, nh = 0.0.0.0, mt = 0
  IP4.ROUTE[2]:                           dst = 0.0.0.0/0, nh = 192.168.1.254, mt = 0
  IP4.DNS[1]:                             192.168.1.254
  IP4.DOMAIN[1]:                          lan
  IP6.ADDRESS[1]:                         2001:861:33c0:5740:539a:87d7:9c17:5ad7/64
  IP6.ADDRESS[2]:                         2001:861:33c0:5740:f314:e7e8:65f9:8cbc/64
  IP6.ADDRESS[3]:                         fe80::7e2e:17ed:912c:897b/64
  IP6.GATEWAY:                            fe80::c23c:4ff:fe8d:832c
  IP6.ROUTE[1]:                           dst = 2001:861:33c0:5740::/64, nh = ::, mt = 600
  IP6.ROUTE[2]:                           dst = ::/0, nh = fe80::c23c:4ff:fe8d:832c, mt = 600
  IP6.ROUTE[3]:                           dst = fe80::/64, nh = ::, mt = 600
  IP6.DNS[1]:                             2001:861:33c0:5740:c23c:4ff:fe8d:832c
  ```

### Lister les connexions

* Pour lister les connexion:

  ``` bash
  $ nmcli connection show
  NAME           UUID                                  TYPE    DEVICE   
  Bbox-86B853B2  aa69aca5-dc2c-4c0b-9074-c451dfd4aea9  wifi    wlp164s0 
  docker0        58b2f101-8aef-4db9-b803-a16e579e6fd8  bridge  docker0
  ```

  Pour afficher les paramètres de la connexion nommée "Bbox-86B853B2":

  ``` bash
  $ nmcli connection show id 'Bbox-86B853B2' | grep -i ipv4
  ipv4.method:                            auto
  ipv4.dns:                               --
  ipv4.dns-search:                        --
  ipv4.dns-options:                       --
  ipv4.dns-priority:                      0
  ipv4.addresses:                         172.16.2.140/24, 192.168.1.4/24
  ipv4.gateway:                           --
  ipv4.routes:                            --
  ipv4.route-metric:                      -1
  ipv4.route-table:                       0 (unspec)
  ipv4.routing-rules:                     --
  ipv4.ignore-auto-routes:                no
  ipv4.ignore-auto-dns:                   no
  ipv4.dhcp-client-id:                    --
  ipv4.dhcp-iaid:                         --
  ipv4.dhcp-timeout:                      0 (default)
  ipv4.dhcp-send-hostname:                yes
  ipv4.dhcp-hostname:                     --
  ipv4.dhcp-fqdn:                         --
  ipv4.dhcp-hostname-flags:               0x0 (none)
  ipv4.never-default:                     no
  ipv4.may-fail:                          yes
  ipv4.dad-timeout:                       -1 (default)
  ```

  On peut voir ici que l'adresse IPv4 est dynamique (ipv4.method: auto)

### Changer de connexion

* On peut enregistrer différents paramètres sous forme de différentes connexions qui s'appliquent toutes deux à la même interface:  
  ainsi on pourra avoir une connexion configurée via DHCP (appelée default)  
  et l'autre configurée statiquement (appelée testing).

  - pour se connecter au réseau avec les configurations dynamiques — obtenues via DHCP:

    ``` bash
    nmcli con up default
    ```

  - pour se connecter au réseau avec les configurations statiques:

    ``` bash
    nmcli con up testing
    ```
