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

* Le problème avec cette convention de nommage c'est que les noms ne sont pas toujours prédictibles, et souvent, changent après un redémarrage — la recherche de périphériques n'étant pas déterministe pour les systèmes modernes.

* De nombreux admins système ont résolu ce problème de manière simple: en codant en dur les associations entre les adresses matérielles (MAC) et les noms de périphériques dans les fichiers de configuration du système et les scripts de démarrage. 

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

        - l'emplacement physique de la connexion matérielle (port X slot Y)  
          Ex: enp2s0

        - l'adresse MAC  
          Ex: enx7837d1ea46da

  Par exemple enp0s3 est une connexion Ethernet sur le port 0 slot 3.

* `lo` est l'interface de loopback, qui pour rappel est une adresse spéciale utilisée pour envoyer des message à l'interface réseau locale.

* Note: il est possible de désactiver le nouveau schéma et de revenir aux noms classiques — eth0, wlan0.

---

## Lister les interfaces

### ifconfig

* `ifconfig` est un utilitaire d'administration système qu'on trouve
  depuis longtemps dans les systèmes d'exploitation UNIX,
  et permet d'afficher et configurer les paramètres de l'interface réseau.  
  Il a été remplacé par `ip` et certains distributions Linux ne l'installent plus par défaut

* `ifconfig`, sans paramètres, affiche les informations de toutes les interfaces reconnues par le système.  
  On peut notamment y trouver leur adresses IP et MAC

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
  ```

  On peut filtrer le résultat sur une interface donnée

  ``` bash
  $ ifconfig wlp164s0 | head -1
  wlp164s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
  ```

### ip

* `ip` est un utilitaire, plus récent qu'ifconfig, permettant d'afficher et configurer les paramètres d'interfaces réseau, le routage et le tunneling.
  ip est plus polyvalent qu'ifconfig et plus efficace — car il utilise des sockets netlink plutôt que des appels système ioctl.

  La syntaxe générale d'ip est

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

* `ip link show` affiche les informations des interfaces réseau

  ``` bash
  $ ip link show
  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
      link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
  ```

  On peut filtrer le résultat sur une interface donnée

  ``` bash
  $ ip link show wlp164s0
  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
  ```

* On peut voir que les noms sont bel et bien corrélés avec les emplacements physique du matériel sur un système PCI:

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

## Activer/désactiver une interface

* Mettre une interface hors service:

  ``` bash
  $ sudo ip link set eth0 down
  ```

  La remettre en service

  ``` bash
  $ sudo ip link set eth0 up
  ```

### Legacy: ifconfig

* Mettre une interface hors service:

  ``` bash
  $ sudo ifconfig eth0 down
  ```

  La remettre en service:

  ``` bash
  $ sudo ifconfig eth0 up
  ```