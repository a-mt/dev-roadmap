---
title: Bridges & bond
category: Linux, Network
---

* Un *bridge* (*pont* en français) relie deux interfaces ou plus,  
  ce qui permet aux appareils de ces réseaux de communiquer entre eux comme s'ils se trouvaient sur un seul réseau

* Un *bond* (*lien* en français) accole deux connexions (/ports) ou plus à un réseau.

# Bond

* Normalement, les serveurs sont connectés au serveur via un switch. Le problème est que si le câble de l'interface est coupé, le serveur est déconnecté du réseau. Cela crée un point de défaillance unique.
  On peut ajouter une autre interface et la connecter également au switch mais ce n'est pas une solution idéale puisqu'il s'agirait d'une interface séparée, avec une adresse IP séparée et une configuration séparée.

* Ce qu'on peut faire, c'est créer un bond qui prend les deux interfaces et les fait fonctionner comme une seule. Ainsi, le serveur et le périphérique réseau verront une seule interface.  
  Comme il s'agit d'une interface unique, le trafic sera load balanced entre les deux, et si un lien tombe en panne, ce n'est pas un problème puisque l'autre prendra en charge le trafic.

* L'OS fait comme s'il n'y avait qu'un seul câble entre le serveur et le réseau, ce qui simplifie les choses: il n'est pas nécessaire de configurer les applications pour utiliser diverses cartes réseau, diverses connexions et adresses IP pour atteindre la même destination à travers différents paths, on utilise simplement le bond comme interface.

* Linux supporte 7 modes de liaison:  
  Le mode 0 (round-robin) est le mode par défaut.

  - 0: round-robin  
    Utilise les interfaces réseau dans un ordre séquentiel, pour une certaine quantité de données. Les données sont envoyées au premier lien pour une quantité X de données, puis à la deuxième, et ainsi de suite.

  - 1: active-backup  
    Utilise une seule interface et garde toutes les autres interfaces inactives comme backup. Si l'interface active tombe en panne, le backup devient la nouvelle interface active.

  - 2: XOR  
    Choisit l'interface à utiliser en fonction de la source et de la destination d'un paquet de données. Pour chaque paire source/dest, le paquet passera toujours par la même interface.

  - 3: broadcast  
    Toutes les données sont envoyées à toutes les interfaces en même temps

  - 4: IEEE 802.3ad  
    Permet d'augmenter le débit du réseau au-delà de ce qu'une seule interface peut supporter

  - 5: adaptive transmit load balancing  
    Essaie d'équilibrer la charge du trafic sortant en envoyant les données à l'interface la moins occupée

  - 6: adaptive load balancing  
    Essaie d'équilibre la charge du trafic entrant et sortant

# Bridge

* Un bridge fait exactement ce que le mot indique: on ajoute un pont entre le réseau 1 et 2. Il permet aux ordinateurs situés sur deux réseaux distincts de communiquer entre eux comme s'ils faisaient partie du même réseau. Il est même possible de relier plus de deux réseaux si nécessaire.

* Dans la terminologie Linux, le bridge est également appelé controller, et les appareils réseaux faisant partie du bridge sont appelés des ports.

![](https://i.imgur.com/RqNqdoO.png)
