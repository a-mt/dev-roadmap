---
title: Tour d'horizon
category: Linux, Network
---

## Interface réseau

* Pour trouver le nom de l'interface réseau:

  ``` bash
  ip link show  # Long version
  ip l          # Short version
  ```

* On peut voir que l'interface réseau wifi s'appelle wlp164s0

  ``` bash
  $ ip -br link show
  lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP> 
  wlp164s0         UP             c8:cb:9e:b8:7b:cb <BROADCAST,MULTICAST,UP,LOWER_UP> 
  docker0          DOWN           02:42:17:c9:b6:7e <NO-CARRIER,BROADCAST,MULTICAST,UP>
  ```

## Adresse IP

* Pour voir les adresses IP configurées pour les différentes interfaces réseau:

    ``` bash
    ip addresses show
    ip a
    ```

* On peut voir que l'adresse IPv4 (inet) de l'interface WiFi est 192.168.1.4

  ``` bash
  $ ip -br addr show
  lo               UNKNOWN        127.0.0.1/8 ::1/128 
  wlp164s0         UP             192.168.1.4/24 2001:861:33c0:5740:539a:87d7:9c17:5ad7/64 2001:861:33c0:5740:f314:e7e8:65f9:8cbc/64 fe80::7e2e:17ed:912c:897b/64 
  docker0          DOWN           172.17.0.1/16
  ```

### Adresse réseau

* Le /24 est le CIDR (*Classless inter domain routing*): il indique que les 24 premiers bits de l'adresse constituent le préfixe du réseau, les 3 premiers octets (192.188.1) représentent donc l'adresse du réseau dans son ensemble. Le dernier octet (4) désigne l'appareil en cours sur ce réseau.

* Un nombre sur 8 bits peut aller de 0 à 255, les adresses IP du réseau vont donc de 192.168.1.0 et 192.168.1.255.
  Techniquement, le 0 et 255 sont réservés à des fins spéciales, donc les adresses des appareils sur ce réseau peuvent aller de 192.168.1.1 à 192.168.1.254.

## ICMP

* Pour vérifier si on a accès à une adresse IP donnée:

  ```
  $ ping 127.0.0.1
  PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
  64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.047 ms
  64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.062 ms
  ^C
  --- 127.0.0.1 ping statistics ---
  2 packets transmitted, 2 received, 0% packet loss, time 1016ms
  rtt min/avg/max/mdev = 0.047/0.054/0.062/0.007 ms
  ```

  Note: pour permettre à ping d'être utilisée sur adresse de broadcast, il faut ajouter l'option `-b`

---

## Table de routage

* Pour voir la table de routage:

  ``` bash
  ip route show
  ip r
  ```

* On peut voir que le routeur par défaut (default via) est 192.168.1.254

  ``` bash
  $ ip route show
  default via 192.168.1.254 dev wlp164s0 
  172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
  192.168.1.0/24 dev wlp164s0 proto kernel scope link src 192.168.1.4
  ```

## Routage statique

* Pour ajouter une route statique temporaire:  
  Ici on dirige le trafic en direction de 192.168.5.0/4 vers 178.28.168.207

  ``` bash
  ip route add 192.168.5.0/24 via 178.28.168.207
  ```

---

## Résolution DNS dynamique

* Un resolver permet de résoudre des noms d'hôte dynamiquement: si on cherche à joindre google.com, une requête sera envoyée au résolveur DNS configuré pour obtenir l'adresse IP de google.com — et le resolver répondra par exemple 203.0.113.9.

* Le resolver est configuré dans `/etc/resolv.conf`

  ``` bash
  cat /etc/resolv.conf
  # Generated by NetworkManager
  nameserver 8.8.8.8
  ```

  Chaque entrée commençant par nameserver est suivit de l'adresse IP d'un resolver.  
  Il est courant d'en voir figurer plusieurs, ce qui permet d'avoir une solution de secours si l'un d'entre eux ne répond pas.

## Résolution DNS statique

* La résolution DNS statique se fait via le fichier `/etc/hosts`.

  ``` bash
  $ cat /etc/hosts
  127.0.0.1    localhost localhost.localdomain
  ::1          localhost localhost.localdomain
  198.168.0.18 LFCS-CentOS2
  ```

  Chaque ligne contient une adresse IP suivit du ou des noms associés à cette IP.  
  Il peut s'agir de machines situées à l'intérieur ou à l'extérieur du réseau.

---

## ARP

* Pour afficher le cache ARP, ce qui permet de vérifier la liste des machines dont on connaît l'adresse MAC — et donc avec lesquelles on converse sans intermédiaire

  ``` bash
  $ arp -a
  bbox.lan (192.168.1.254) at c0:3c:04:8d:83:2c [ether] on wlp164s0
  ```

## DHCP

* DHCP (*Dynamic Host Configuration Protocol*) est un protocole permettant à une machine se connectant à un réseau d'obtenir dynamiquement sa configuration réseau — avec principalement, son adresse IP.

* Pour supprimer l'adresse IP obtenue par le serveur DHCP:

  ``` bash
  $ sudo dhclient -r wlp164s0
  Killed old client process
  ```

* Et obtenir une nouvelle adresse IP:

  ``` bash
  $ sudo dhclient -v wlp164s0
  Internet Systems Consortium DHCP Client 4.4.1
  Copyright 2004-2018 Internet Systems Consortium.
  All rights reserved.
  For info, please visit https://www.isc.org/software/dhcp/

  Listening on LPF/wlp164s0/c8:cb:9e:b8:7b:cb
  Sending on   LPF/wlp164s0/c8:cb:9e:b8:7b:cb
  Sending on   Socket/fallback
  DHCPDISCOVER on wlp164s0 to 255.255.255.255 port 67 interval 3 (xid=0x9cc4f40b)
  DHCPOFFER of 192.168.1.4 from 192.168.1.254
  DHCPREQUEST for 192.168.1.4 on wlp164s0 to 255.255.255.255 port 67 (xid=0xbf4c49c)
  DHCPACK of 192.168.1.4 from 192.168.1.254 (xid=0x9cc4f40b)
  bound to 192.168.1.4 -- renewal in 43153 seconds.  ```
  ```

  On peut voir que le serveur DHCP est à l'adresse `192.168.1.254`  
  et nous a donné l'adresse `192.168.1.4` (cf DHCPOFFER ou DHCPACK)

## Configuration statique temporaire

* Pour temporairement définir l'adresse IP (statique) de l'interface eth0:

  ``` bash
  $ sudo ip addr add 192.168.1.7 dev eth0
  ```

* Pour définir le MTU (*Maximum Transfer Unit*) à 1480 octets

  ``` bash
  $ sudo ip link set eth0 mtu 1480
  ```

---

## Ports par défaut

* Le fichier `/etc/services` contient la liste des ports standards et les services associés:

  ``` bash
  $ grep ^ldap /etc/services
  ldap    389/tcp       # Lightweight Directory Access Protocol
  ldap    389/udp
  ldaps   636/tcp       # LDAP over SSL
  ldaps   636/udp
  ```

## Ports ouverts

* Pour lister tous les ports entrants ouverts:

  ``` bash
  $ netstat -tulpn | grep LISTEN
  (Not all processes could be identified, non-owned process info
   will not be shown, you would have to be root to see it all.)
  tcp        0      0 0.0.0.0:17500           0.0.0.0:*               LISTEN      2423/dropbox        
  tcp        0      0 127.0.0.1:37575         0.0.0.0:*               LISTEN      2639/cli            
  tcp        0      0 127.0.0.1:12546         0.0.0.0:*               LISTEN      2639/cli            
  tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -                   
  tcp        0      0 127.0.0.1:59308         0.0.0.0:*               LISTEN      2639/cli            
  tcp        0      0 127.0.0.1:17603         0.0.0.0:*               LISTEN      2423/dropbox        
  tcp        0      0 127.0.0.1:17600         0.0.0.0:*               LISTEN      2423/dropbox        
  tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      -                   
  tcp6       0      0 :::17500                :::*                    LISTEN      2423/dropbox        
  tcp6       0      0 ::1:631                 :::*                    LISTEN      -
  ```

  ``` bash
  $ ss -tulpn | grep LISTEN
  tcp    LISTEN   0        4096       127.0.0.53%lo:53           0.0.0.0:*                                                   
  tcp    LISTEN   0        5              127.0.0.1:631          0.0.0.0:*                                                   
  tcp    LISTEN   0        128              0.0.0.0:17500        0.0.0.0:*        users:(("dropbox",pid=2423,fd=51))         
  tcp    LISTEN   0        128            127.0.0.1:17600        0.0.0.0:*        users:(("dropbox",pid=2423,fd=56))         
  tcp    LISTEN   0        100            127.0.0.1:12546        0.0.0.0:*        users:(("cli",pid=2639,fd=16))             
  tcp    LISTEN   0        128            127.0.0.1:17603        0.0.0.0:*        users:(("dropbox",pid=2423,fd=61))         
  tcp    LISTEN   0        1              127.0.0.1:37575        0.0.0.0:*        users:(("cli",pid=2639,fd=6))              
  tcp    LISTEN   0        4096           127.0.0.1:59308        0.0.0.0:*        users:(("cli",pid=2639,fd=3))              
  tcp    LISTEN   0        5                  [::1]:631             [::]:*                                                   
  tcp    LISTEN   0        128                 [::]:17500           [::]:*        users:(("dropbox",pid=2423,fd=52))
  ```

  Memo: tulipe N

## Fichiers ouverts

* Afficher les infos du processus 2639

  ``` bash
  $ ps 2639
      PID TTY      STAT   TIME COMMAND
     2639 ?        Sl     0:12 /usr/bin/cli /usr/lib/keepass2/KeePass.exe
  ```

* Lister les fichiers ouverts par le processus 2639

  ``` bash
  $ lsof -p 2639
  COMMAND  PID    USER   FD      TYPE             DEVICE SIZE/OFF     NODE NAME
  cli     2639      am  cwd       DIR              253,0     4096  7077890 /home/am
  cli     2639      am  rtd       DIR              253,0     4096        2 /
  cli     2639      am  txt       REG              253,0  4821896 11538061 /usr/bin/mono-sgen
  cli     2639      am  mem       REG              253,0  2241536 11538148 /usr/lib/mono/gac/System.Data/4.0.0.0__b77a5c561934e089/System.Data.dll
  cli     2639      am  DEL       REG                0,1                35 /SYSV00000000
  ...
  cli     2639      am    0r      CHR                1,3      0t0        5 /dev/null
  cli     2639      am    1u     unix 0x0000000000000000      0t0    54301 type=STREAM
  cli     2639      am    2u     unix 0x0000000000000000      0t0    54302 type=STREAM
  cli     2639      am    3u     IPv4              53782      0t0      TCP localhost:59308 (LISTEN)
  cli     2639      am    4u     unix 0x0000000000000000      0t0    55664 type=STREAM
  cli     2639      am    5r      CHR                1,9      0t0       10 /dev/urandom
  cli     2639      am    6u     IPv4              55668      0t0      TCP localhost:37575 (LISTEN)
  cli     2639      am    7u     IPv4              55669      0t0      TCP localhost:44462->localhost:37575 (ESTABLISHED)
  cli     2639      am    8u     IPv4              55670      0t0      TCP localhost:37575->localhost:44462 (ESTABLISHED)
  cli     2639      am    9u     unix 0x0000000000000000      0t0    55671 type=STREAM
  cli     2639      am   10u  a_inode               0,14        0    12497 [eventfd]
  cli     2639      am   11u     unix 0x0000000000000000      0t0    55672 type=DGRAM
  cli     2639      am   12u     unix 0x0000000000000000      0t0    55674 type=STREAM
  cli     2639      am   13u  a_inode               0,14        0    12497 [eventfd]
  cli     2639      am   14r      CHR                1,9      0t0       10 /dev/urandom
  cli     2639      am   16u     IPv4              50012      0t0      TCP localhost:12546 (LISTEN)
  cli     2639      am   17r     FIFO               0,13      0t0    53784 pipe
  cli     2639      am   18w     FIFO               0,13      0t0    53784 pipe
  cli     2639      am   19u     IPv4              57892      0t0      TCP localhost:12546->localhost:57864 (ESTABLISHED)
  ```