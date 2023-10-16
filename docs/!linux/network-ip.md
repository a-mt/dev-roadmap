---
title: IP
category: Linux, Network
---

## Adresses IP

* Pour voir les adresses IP configurées pour les différentes interfaces réseau

    ``` bash
    ip addresses show
    ip a
    ```

  Dans l'exemple suivant, l'adresse IPv4 (inet) de l'interface WiFi est 192.168.1.4:

  ``` bash
  $ ip addr show
  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
      link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
      inet 127.0.0.1/8 scope host lo
         valid_lft forever preferred_lft forever
      inet6 ::1/128 scope host 
         valid_lft forever preferred_lft forever
  2: wlp164s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
      link/ether c8:cb:9e:b8:7b:cb brd ff:ff:ff:ff:ff:ff
      inet 192.168.1.4/24 brd 192.168.1.255 scope global dynamic wlp164s0
         valid_lft 82571sec preferred_lft 82571sec
      inet6 2001:861:33c0:5740:539a:87d7:9c17:5ad7/64 scope global temporary dynamic 
         valid_lft 83291sec preferred_lft 11291sec
      inet6 2001:861:33c0:5740:f314:e7e8:65f9:8cbc/64 scope global dynamic mngtmpaddr noprefixroute 
         valid_lft 83291sec preferred_lft 11291sec
      inet6 fe80::7e2e:17ed:912c:897b/64 scope link noprefixroute 
         valid_lft forever preferred_lft forever
  3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
      link/ether 02:42:17:c9:b6:7e brd ff:ff:ff:ff:ff:ff
      inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
         valid_lft forever preferred_lft forever
  ```

### brief

* -br permet d'afficher une version brève:

  ``` bash
  $ ip -br addr show
  lo               UNKNOWN        127.0.0.1/8 ::1/128 
  wlp164s0         UP             192.168.1.4/24 2001:861:33c0:5740:539a:87d7:9c17:5ad7/64 2001:861:33c0:5740:f314:e7e8:65f9:8cbc/64 fe80::7e2e:17ed:912c:897b/64 
  docker0          DOWN           172.17.0.1/16
  ```

---

## Configurations du réseau

### ip

* Définir le MTU (*Maximum Transfer Unit*) à 1480 octets

  ``` bash
  $ sudo ip link set eth0 mtu 1480
  ```

* Définir le masque de réseau

  ``` bash
  $ sudo ip route add 172.16.1.0/24 via 192.168.1.5
  ```

* Définir l'adresse IP (statique)

  ``` bash
  $ sudo ip addr add 192.168.1.7 dev eth0
  ```

### Legacy: ifconfig

* Définir le MTU (*Maximum Transfer Unit*) à 1480 octets

  ``` bash
  $ sudo ifconfig eth0 mtu 1480
  ```

* Définir le masque de réseau  
  Notons que ifconfig utilise la notation en classe (ip utilise la notation CIDR)

  ``` bash
  $ sudo ifconfig eth0 netmask 255.255.255.0
  ```

* Définir l'adresse IP de l'interface

  ``` bash
  $ sudo ifconfig eth0 192.168.1.50
  ```

---

## DHCP

* `dhclient` permet de converser avec le serveur DHCP — qui attribue dynamiquement les adresses IP des machines du réseau local.  

* Pour supprimer l'adresse IP obtenue par le serveur DHCP:

  ``` bash
  $ sudo dhclient -r wlp164s0
  Killed old client process
  ```

* Pour obtenir une nouvelle adresse IP:

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
  et nous a donné l'adresse `192.168.1.4`

## ARP

* `arp` permet de voir le cache ARP de la machine locale
  Autrement dit, permet de voir la liste des machines avec lesquelles sait converser sans intermédiaire — directement en utilisant son adresse MAC

  ``` bash
  $ arp -a
  bbox.lan (192.168.1.254) at c0:3c:04:8d:83:2c [ether] on wlp164s0
  ```

## ICMP

* La commande `ping` envoie un paquet ICMP "Echo Request" à la destination indiquée.  
  La machine distante répond par un "ICMP Echo Reply" — ou pas

  On peut s'en servir pour vérifier si on a accès à une adresse IP donnée.

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

* Notons que si on donne un nom de domaine,
  ping va d'abord utiliser DNS pour chercher l'adresse IP associée au nom de domaine (DNS utilise UTP).

* Pour permettre à ping d'être utilisée sur adresse de broadcast, il faut ajouter l'option `-b`

---

## Ports connus

* Linux contient la liste des numéros de port connus et leur services associés dans le fichier `/etc/services`

  ``` bash
  $ grep ^http /etc/services
  http    80/tcp    www         # WorldWideWeb HTTP
  https   443/tcp               # http protocol over TLS/SSL
  http-alt  8080/tcp  webcache  # WWW caching service
  ```
  ``` bash
  $ grep ^pop3 /etc/services
  pop3    110/tcp   pop-3   # POP version 3
  pop3s   995/tcp           # POP-3 over SSL
  ```
  ``` bash
  $ grep ^ldap /etc/services
  ldap    389/tcp       # Lightweight Directory Access Protocol
  ldap    389/udp
  ldaps   636/tcp       # LDAP over SSL
  ldaps   636/udp
  ```
