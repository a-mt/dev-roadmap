---
title: Routes
category: Linux, Network
---


## Table de routage

* La table de routage de chaque machine contient les informations nécessaires au routage des paquets IP (choix du chemin en fonction de l'adresse destination) et renseigne donc sur les réseaux accessibles et sur les routeurs (ou *gateway*) qui vont prendre en charge le routage des paquets.

* Pour voir la table de routage:

``` bash
ip route show
ip r
```
  ``` bash
  $ ip route show
  default via 192.168.1.254 dev wlp164s0 
  172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
  192.168.1.0/24 dev wlp164s0 proto kernel scope link src 192.168.1.4
  ```

  On peut voir que par défaut, les paquets seront envoyés par défaut à 192.168.1.254, qui est donc notre passerelle par défaut

### Legacy

``` bash
$ route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.254   0.0.0.0         UG    0      0        0 wlp164s0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
192.168.1.0     0.0.0.0         255.255.255.0   U     0      0        0 wlp164s0
```

``` bash
$ netstat -r
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
default         bbox.lan        0.0.0.0         UG        0 0          0 wlp164s0
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlp164s0
```

## Changer de default gateway

* C'est plutôt rare d'avoir à le faire, mais il est possible de modifier le routeur par défaut dans la table de routage:

  ``` bash
  $ sudo ip route delete default

  $ ip route show
  172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
  192.168.1.0/24 dev wlp164s0 proto kernel scope link src 192.168.1.4
  ```
  ``` bash
  $ sudo ip route add default via 192.168.1.254

  $ ip route show
  default via 192.168.1.254 dev wlp164s0 
  172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
  192.168.1.0/24 dev wlp164s0 proto kernel scope link src 192.168.1.4
  ```

## Traceroute

* `traceroute` affiche le ou les routeurs empruntées par les paquets IP pour aller sur une machine distante.  
  Mesure également le temps mis pour atteindre les différents routeurs qui constituent les étapes du trajet.


https://access.redhat.com/documentation/fr-fr/red_hat_enterprise_linux/7/html/networking_guide/sec-using_the_networkmanager_command_line_tool_nmcli