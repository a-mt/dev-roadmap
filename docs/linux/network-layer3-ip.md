---
title: Routing
category: Linux, Network
---

## Layer 3

* La 2ème couche du modèle OSI est la liaison des noeuds adjacents du réseau.  
  Lorsque qu'on veut communiquer avec des machines reliées physiquement à un autre réseau, on introduit la 3ème couche.

* Le PDU de la 3ème couche OSI est le *datagramme*  
  Ex: datagramme IP

  ![](https://i.imgur.com/FAqsGal.png)

* Dans de nombreux cas, la destination et l'expéditeur ne sont pas dans le même réseau. La couche 3 est chargée du transport des paquets entre noeuds inter-réseaux. Chaque paquet est envoyé indépendamment, dans un environnement sans connexion. Le suivi des connexions peut être mis en oeuvre dans une couche de niveau supérieur.

## Équipements

### Routeurs

* Les switchs dirigent le traffic sur un réseau local en utilisant les adresses MAC.  
  Les *routeurs* (*router*), parfois appelés *passerelles* (*gateway*), dirigent quant à eux le traffic entre les réseaux locaux et Internet en utilisant des adresses IP.

* Un routeur connecte des segments de réseau qui peuvent utiliser des protocoles différents, et effectuera une conversion entre les deux protocoles.

* Le routeur par défaut, ou passerelle par défaut (*default gateway*), désigne le routeur exposé à Internet et faisant le pont entre Internet et le réseau local.

* Les routeurs par défaut effectuent souvent des services tels que NAT (traduction d'adresses réseau) et DHCP (fournit des adresses IP aux systèmes qui ont besoin de nouvelles adresses IP). Chez un particulier, c'est typiquement un routeur par défaut qui permet de se connecter au réseau du fournisseur d'accès à Internet.

### Pare-feu

* Les pare-feu (ou *firewall* en anglais) sont des appareils qui s'intercalent
  entre deux ou plusieurs réseaux et surveillent toutes les connexions qui tentent de passer entre ces réseaux.

  Les pare-feu contiennent un ensemble de règles qui décrivent les types de connexions autorisées à passer d'un réseau à l'autre, et appliquent cette politique: toutes les tentatives de connexion qui ne sont pas spécifiquement autorisées par une règle sont bloquées et ne peuvent pas passer d'un réseau à l'autre, ce qui protège le réseau contre les attaques.

* L'exemple le plus courant est un pare-feu frontalier (*border firewall*),  
  un pare-feu qui vient s'interposer entre le réseau interne d'une organisation et Internet.

* Notons qu'il existe deux types de firewalls:  
  le firewall matériel, qui est un équipement réseau,  
  et le firewall logiciel, qui est un programme tournant sur l'hôte final

### L-3 Switch

* Le type de switch le plus courant est un switch opérant uniquement sur la couche 2 du modèle OSI: on parle de *layer-2 switch*.  
  Le L-2 switch apprend les adresses MAC de tous les hôtes qui lui sont connectés et sait par quel port physique il peut atteindre chacune des adresses MAC.

* Il existe également des switchs capables d'opérer sur la couche 3 du modèle OSI: on parle de *layer-3 switch*.  
  Un L-3 switch peut non seulement connecter des hôtes directement, en prenant les décisions à partir des adresses MAC pour transférer des trames Ethernet entre ses ports, mais également prendre des décisions de routage sur la base d'une table de routage et adresses IP — catégorisés dans la couche 3.

* Un switch n'utilise que des ports Ethernet (avec des connecteurs RJ-45), le routeur quant à lui peut supporter différents types de ports, tels que des ports ADSL, le câble, la fibre etc.

### Modem

* Un *modem* (contraction de modulation + démodulation) est un appareil conçu pour envoyer et recevoir des signaux sur un type d'infrastructure ou de support spécifique. On trouve par exemple

  - les <ins>modems DSL</ins>:  
    conçus pour transmettre des données sur des lignes téléphoniques standard en cuivre,

  - les <ins>modems câble</ins>:  
    conçus pour transférer des données sur des lignes de câble coaxial, généralement utilisés pour les service de télévision par câble

  - les <ins>modems à fibre optique</ins>:  
    conçus pour fonctionner avec des lignes à fibre optique, qui transmettent les données à l'aide de signaux lumineux

* Un modem agit comme un traducteur entre le réseau du fournisseur d'accès à Internet (FAI) et le réseau du particulier. Le boitier qu'on loue à un FAI est à la fois routeur et modem DSL — souvent, pour accéder à la fibre optique, il faudra un modem externe (modem fibre) en plus du boitier

---

## Protocoles

* Les protocoles les plus courants du layer 3 sont:

  - IPv4 (*Internet Protocol version 4*)
  - IPv6 (*Internet Protocol version 6*)
  - OSPF (*Open Shortest Path First*)
  - IGRP (*Interior Gateway Routing Protocol*)
  - ICMP (*Internet Control Message Protocol*)

## Protocole IP

* IP (*Internet Protocol*) était à l'origine *le* protocole permettant d'envoyer des données sur le réseau.  
  En 1973, il est séparé en deux: TCP (*Transmission Control Protocol*) et IP.  
* En 1980, le standard IPv4 est introduit, par l'IETF.  
* En 1998, un brouillon de IPv6 est développé pour anticiper et pallier à l'épuisement des adresses IPv4 (toujours par l'IETF).  
* En 2017, le standard IPv6 est approuvé et est désormais disponible.

## Adresse IP

* L'*adresse IP* est utilisée pour identifier un système sur le réseau.  

* La portée d'une adresse (*scope* en anglais), c'est son domaine de validité et d'unicité.  

  - Les adresses *privées* sont des adresses qui ne sont accessibles qu'à l'intérieur du réseau local, et non depuis l'extérieur.  
    Les adresses IP privées peuvent être utilisées sur plusieurs réseaux, un peu comme un surnom: les appareils du réseau local peuvent se désigner entre eux par leur IP privée puisqu'elle est unique sur ce réseau — mais elle ne peut pas être utilisée sur Internet puisqu'elle n'est pas unique à l'échelle mondiale.

  - Les adresses *publiques* quant à elles sont accessibles sur Internet, et sont donc uniques mondialement.  
    Tout comme votre numéro de téléphone portable ne doit être utilisé par aucun autre téléphone portable dans le monde.  
    Votre adresse IP publique (ou plage d'adresse IP) vous est donnée par un *Fournisseur d'Accès à Internet* (FAI) (ou *Internet Service Provider*, ISP, en anglais) — par exemple Orange, Free, SFR, Bouygues, etc

* Bien que l'adresse MAC soit unique dans le monde, elle ne permet pas de localiser l'emplacement d'une machine: impossible de dire où se trouve le Nème exemplaire de la marque X série Y.  
  L'adresse IP publique quant à elle permet de localiser l'emplacement de l'appareil: un peu sur le même principe que l'adresse d'une maison est constituée d'un pays / département / ville / rue, une adresse IP est découpée en plusieurs plages de numéros qui permettent aux appareils réseau de savoir dans quelle direction le message doit être envoyé.

* Toute machine reliée à Internet doit avoir une adresse qui lui est propre et comme y a énormément de machines reliées à Internet, les 32 bits d'IPv4 sont tout juste suffisants. Pour pallier à ce problème, IPv6 a été mise en place.

## Format des adresses IP

### IPv4

* IPv4 utilise 4 nombres de 8 bits (donc des nombres compris entre 0 et 255).  
  L'adresse fait ainsi au total (4×8) 32 bits  
  et il y a environ (2^32) 4.3 millions d'addresses IPv4 potentielles.

* L'adresse IPv4 est représentée par des nombres décimaux séparés par un point (.)  
  Exemple:

  ```
  148.114.252.10
  ```

### IPv6

* IPv6 utilise 8 nombres de 16 bits (donc de 0 à 65536, ou FFFF).  
  L'adresse fait ainsi au total (8×16) 128 bits  
  et il y a (2^128) 3.4 × 10<sup>38</sup> addresses IPv6 potentielles

* L'adresse IPv6 est représentée par des nombres hexadécimaux séparés par un deux-point (:)  
  Exemple:

  ```
  2003:0db5:6123:0000:1f4f:0000:5529:fe23
  ```

#### Shorthand

* Avec IPv6, on peut omettre un à trois zéros non significatifs (zéros à gauche) dans chaque groupe. Ainsi, les deux adresses suivantes sont équivalentes:


  ```
  2001:0db8:0000:85a3:0000:0000:ac1f:8001
  ```
  ```
  2001:0db8:0:85a3:0:0:ac1f:8001
  ```

* On peut également omettre une suite (mais une seule) de plusieurs groupes nuls consécutifs, en conservant les deux-points de chaque côté de la suite omise:

  ```
  2001:0db8:0:85a3::ac1f:8001
  ```

### Adresses IPv4 privées

* Les adresses privées ne sont jamais partagées ou routées publiquement.

* La norme IPv4 désigne certaines adresses IP comme étant des adresses privées:

  | Classe | Adresse IP | Plage d'adresses
  |--- |---
  | A  | 10.\*.\*.\* | 10.0.0.0 - 10.255.255.255
  | B  | 172.16-31.\*.\* | 172.16.0.0 - 172.31.255.255
  | C  | 192.168.0-255.\* | 192.168.0.0 - 192.168.255.255

  Par exemple, l'adresse IP 172.20.164.23 est dans une plage d'adresses privées.

### Adresses IPv4 link-local

* IPv4 distingue des plages d'adresses privées et des adresses *link-local*. Comme les adresses privées, les adresses link-local sont conservées sur le réseau local et ne sont pas acheminées publiquement.

  Avec IPv4, une adresse link-local est automatiquement attribuée si un serveur DHCP (*Dynamic host configuration protocol*) échoue et que l'adresse est attribuée en utilisant APIPA (*Automatic Private Internet Protocol Addressing*).

  IPv6 n'est pas obligé d'utiliser DHCP mais il peut. Si pour une raison ou une autre, le serveur DHCP est hors service, les systèmes utilisant IPv4 auraient un problème s'il n'y avait pas APIPA

* Les adresses APIPA pour IPv4 sont
  
  ```
  169.254.0.0 - 169.254.255.255
  ```

  Par exemple, l'adresse 169.254.164.23 montre que le serveur DHCP n'a pas pu être joint et qu'une adresse APIPA a été attribuée à la place.

### Adresses IPv4 multicast

* Le premier octet d'une adresse IPv4 doit toujours inférieur à 223:

  - Les adresses entre 223 et 239 sont des adresses de multicast: elles sont utilisées pour envoyer des messages à plusieurs systèmes en même temps et ne doivent jamais être affectées à un système individuel

  * Les addresses entre 240 et 255 sont réservées pour un usage expérimental

### Adresses IPv6 privées

* Historiquement, les adresses privées IPv6 étaient appelées *site-local* et non privées.  
  Les addresses site-local IPv6 sont les adresses qui commençent une de ces valeurs:

  ```
  fec
  fed
  fee
  fef
  ```

  L'adressage local de IPv6 est déprecié, il est possible que les systèmes ne les prennent plus en charge à l'avenir.

### Adresses IPv6 link-local

* IPv6 utilise désormais des adresses *link-local*.  
  Ces adresses commençent toujours par

  ```
  fe80:0000:0000:0000:0000
  ```

  Ou écrit en abrégé:

  ```
  fe80::
  ```

* Avec IPv6, une adresse link-local est automatiquement attribuée avec l'adresse IPv6 publiquement routable — souvent créée à partir de l'adresse MAC de l'appareil. Ainsi, un système ou un périphérique ayant des capacités IPv6 a deux adresses IPv6: une qui est link-local, et une qui est publique.

### Loopback

* L'adresse de *loopback* est une adresse spéciale, utilisée pour envoyer des paquets à l'*interface réseau locale* (qu'on appelle aussi LO ou loopback). Autrement dit, l'adresse de loopback est une adresse qui permet d'envoyer des données à "l'ordinateur en cours".

* En IPv4, les adresses commençant par 127 sont toutes reservées pour le loopback.  
  On utilise le plus souvent la première: 127.0.0.1, également désignée sous le nom d'hôte `localhost`

  ```
  127.0.0.1 - 127.255.255.254
  ```

* En IPv6, l'adresse est loopback est

  ```
  0000:0000:0000:0000:0000:0000:0000:0001
  ```

  Ou écrit en abrégé:

  ```
  ::1
  ```

---

## Processus de Routing

* Les communications avec les noeuds adjacents (ou tous reliés au même switch) se font via l'adresse MAC des appareils.

  ![](https://i.imgur.com/IEOUbOD.png)

* Pour communiquer avec une machine avec laquelle on n'est pas directement relié, les paquets sont envoyés au routeur.

  ![](https://i.imgur.com/p6bF1bO.png)

* Comme les paquets sont encapsulés dans les trames, ils peuvent facilement être transférés  
  d'un type de réseau local à un autre en enlevant et remettant de nouveaux headers.  
  Les routeurs procèdent systématiquement de la sorte: 1. chaque trame entrant dans un routeur est dépouillée de ses headers, 2. de nouveaux headers sont construits, 3. la trame est transférée vers une nouvelle interface.

  ![](https://i.imgur.com/lKvDhp1.png)

* Lorsqu'un machine reçoit un paquet:

  * 1/ Dans un premier temps, l'adresse MAC de destination est examinée pour vérifier si elle correspond à l'adresse MAC de la machine locale.

  * 2/ Si l'adresse MAC correspond, alors l'adresse IP de destination est examinée pour vérifier si elle correspond à l'adresse IP de la machine locale.

    * 3/ Si l'adresse IP correspond, alors la destination du paquet est l'ordinateur en cours: le paquet est transmis à la couche 4 (transport).

    * 4/ Si l'adresse IP ne correspond pas, alors le datagramme est transmis au prochain noeud en fonction des tables de routage locale. Note: à la place de *noeud*, on parle aussi souvent d'envoi au prochain *hop* — le prochain saut.

         Notons que l'adresse MAC est modifiée (en fonction du noeud suivant), tandis que l'adresse IP de la destination finale n'est pas modifiée.

  Le paquet IP ne peut atteindre sa destination que s'il est routé correctement par tous les noeuds intermédiaires.

* Les paquets peuvent emprunter plusieurs routes pour atteindre leur destination finale et les routeurs concernés prennent des décisions de routages soit en choisissant le chemin le plus direct, le plus rapide ou encore en s'adaptant à la charge de travail des réseaux.

  ![](https://i.imgur.com/TqNOXsBl.png)

---

## Sous-réseau

* Créer un sous-réseau (un *subnet* en anglais) consiste à diviser un réseau en au moins deux réseaux plus petits.  
  L'usage premier des sous-réseaux est de diviser l'espace d'adresses IP disponibles pour le distribuer.  
  Par exemple, un fournisseur d'accès à Internet peut fournir une adresse IP ou une plage d'adresses d'IP, c'est à dire un sous-réseau qui est un sous-ensemble des adresses IP qui a de disponibles. Notons que la plage d'adresses d'un sous-réseau est toujours contigue

* Les sous-réseaux présentent d'autres avantages, on peut notamment citer

  - la sécurité. En divisant le réseau en sous-réseaux, on peut contrôler le fux de traffic de l'aide d'ACL, de QoS et de route-maps, permettant d'identifier l'origine des menaces, de fermer les points d'entrées et d'y répondre plus facilement.

  - l'amélioration des performances du réseau par segment. 
    Si par exemple on a une petite entreprise, qui a d'une part des employés de bureau qui font du traitement de texte et utilisent des logiciels de bureautique simples, et d'autre part quelques ingénieurs qui effectuent beaucoup d'activités informatique créant beaucoup de traffic réseau:
    on peut séparer le réseau en deux sous-réseau, avec d'un côté les machines des employés de bureau et de l'autre celles des ingérieurs; ainsi, le traffic des employés de bureau ne sera pas affecté par celui des ingénieurs et vice versa.

* On entend souvent dire qu'il n'est pas nécessaire de créer des sous-réseaux pour des adresses IPv6. Ce n'est vrai que pour ce qui est de diviser l'espace disponible; pour les questions de traffic et de sécurité sur les segments de sous-réseaux, il est nécessaire de créer des sous-réseaux.

### Masque de sous-réseau

* Le masque de sous-réseau (*subnet mask* ou *network mask* en anglais) permet de savoir quelle partie de l'adresse IP identifie le réseau et quelle partie identifie l'hôte.

  ![](https://i.imgur.com/vZvGGFC.png)

* Techniquement, il s'agit d'un masque de bits permettant de cacher une partie de l'adresse IP: on peut calculer l'adresse réseau en appliquant un ET logique entre l'adresse IP et le masque de sous-réseau. Par exemple:

  ```
   172.16.2.17      adresse IP
  &255.255.0.0      masque réseau
  ------------
   172.16.0.0       adresse réseau
  ```

* Si un paquet de données arrive sur le réseau local d'une entreprise, avec pour destination 142.250.72.78, le routeur par défaut doit déterminer à quel sous-réseau il doit envoyer les données — routeur A, B ou C.

  La masque réseau 255.255.255.0 lui permet de savoir que la partie réseau de cette adresse est 142.250.72.* et il doit donc envoyer le paquet au routeur qui gère ce segment de réseau — routeur B.

  ![](https://i.imgur.com/vLkf3NF.png)

### Classes IPv4

* Historiquement, on utilisait un système de classe pour définir le masque de sous-réseau:

  - **Classe A**:
    - Le premier octet désigne le network et les 3 suivants le host
    - Netmask: 255.0.0.0 (255=network, 0=host)
    - Exemple: <ins>142</ins>.250.72.78 (network souligné)

  - **Classe B**:
    - Les deux premiers octets désignent le network, les 2 suivants le host
    - Netmask: 255.255.0.0
    - Exemple: <ins>142.250</ins>.72.78 (network souligné)

  - **Classe C**:
    - Les trois premiers octets désignent le network, le dernier le host
    - Netmask: 255.255.255.0
    - Exemple: <ins>142.250.72</ins>.78 (network souligné)

  | Classe | Masque en Décimal | Masque en Hexa | Masque en Binaire
  |--- |--- |--- |--- |---
  | A | 255.0.0.0 | ff:00:00:00 | 11111111 00000000 00000000 00000000
  | B | 255.255.0.0 | ff:ff:00:00 | 11111111 11111111 00000000 00000000
  | C | 255.255.255.0 | ff:ff:ff:00 | 11111111 11111111 11111111 00000000

### CIDR

* CIDR (*Classless Inter-Domain Routing*) est un système de notation du masque réseau plus récent que les classes IPv4: à la fin d'une adresse IP, on place un `/` suivit d'un nombre. Ce nombre représente le nombre de bits impliqués dans la partie réseau de l'adresse IP. Par exemple:

  - <ins>142.250.72.78/24</ins>:  
    /24 signifie que les 24 premier bits de l'adresse IP identifient le réseau. Une adresse IPv4 est sur 4×8 = 32 bits, donc /24 revient à dire que les 3 premiers octets constituent la partie réseau de l'adresse, ce qui correspond à la classe C.

    - Netmask: 255.255.255.0
    - Netmask en binaire: 11111111.11111111.11111111.00000000
    - IP du réseau: <ins>142.250.72</ins>.0

    - Première adresse IP: 142.250.75.1  
      Dernière adresse IP: 142.250.75.254  
      Adresse de broadcast: 142.205.75.255

  - <ins>142.250.72.78/8</ins>:

    - Netmask: 255.0.0.0
    - Netmask en binaire: 11111111.00000000.00000000.00000000
    - IP du réseau: <ins>142</ins>.0.0.0

    - Première adresse IP: 142.0.0.1  
      Dernière adresse IP: 142.255.255.254  
      Adresse de broadcast: 142.255.255.255

  - <ins>142.250.72.78/28</ins>:  
    Les choses se compliquent puisque le numéro de la notation CIDR n'est pas un multiple de 8

    ```
     10001110.11111010.01001000.01001110         adresse IP
    &11111111.11111111.11111111.11110000         masque réseau, 28 fois "1" suivit de 32-28 "0"
    ------------
     10001110.11111010.01001000.01000000         adresse réseau
    ```

    - Netmask: 255.255.255.240
    - Netmask en binaire: 11111111.11111111.11111111.11110000
    - IP du réseau: <ins>10001110.11111010.01001000.0100</ins>0000 (142.250.72.64)

    - Première adresse IP: <ins>10001110.11111010.01001000.0100</ins>0001 (142.250.72.65)  
      Dernière adresse IP: <ins>10001110.11111010.01001000.0100</ins>1110 (142.250.72.78)  
      Adresse de broadcast: <ins>10001110.11111010.01001000.0100</ins>1111 (142.250.72.79)  

* On utilise la notation CIDR avec IPv4 pour représenter une plage d'adresses réseau, mais aussi IPv6.  
  La partie réseau d'une adresse IPv6 est appelée le *routing* ou *prefixe*.

  Si votre système configure automatiquement les adresses IPv6, /64 est le CIDR par défaut. Une adresse IPv6 a une longueur de 128 bits, divisée en 8 segments de 16 bits: /64 signifie donc que la première moitié (= les 4 premiers nombres) est le préfixe. 

---

## Obtention d'une adresse IP

* Contrairement à l'adresse MAC qui est fixée par le fabricant de la carte réseau,  
  l'adresse IP d'une machine peut être attribuée

  - **manuellement**,  
    Configurée par un admistrateur.  
    Ça signifie aller dans les paramètres du système et spécifier manuellement son adresse IP,  
    en s'assurant que l'adresse choisie est unique et se situe dans la plage autorisée pour le réseau local.

    C'est donc une adresse fixe, qui ne va pas changer. On parle aussi d'*adresse statique*.

  - ou **dynamiquement**.  
    L'adresse IP est attribuée par le réseau à l'aide d'un protocole.  
    Pour IPv4, on utilise en général le protocole DHCP. On peut également utiliser RARP ou BOOTP  
    Pour IPv6, l'auto-configuration est prévue dès la conception du protocole

    C'est donc une adresse volatile, qui peut changer. On parle d'*adresse dynamique*.

* Généralement, les serveurs ou imprimantes sont configurés avec des adresses IP statiques  
  et les appareils des utilisateurs finaux avec des adresses IP dynamiques.

### DHCP

* DHCP (*Dynamic Host Configuration Protocol*) est un protocole qui permet à une machine se connectant à un réseau d'obtenir dynamiquement sa configuration réseau — principalement, son adresse IP.

   Le protocole DHCP permet de configurer une réserve d'adresses IP,
   puis le protocole DHCP attribue automatiquement ces adresses aux systèmes lorsqu'ils rejoignent le réseau.

* Pour contacter le serveur DHCP, la machine envoit une requête DHCPDISCOVER en broadcast sur le réseau local.  
  Lorsque le serveur DHCP reçoit ce paquet, il renvoit une réponse DHCPOFFER contenant une proposition d'adresse IP.  
  La machine envoie une requête DHCPREQUEST pour valider son adresse IP (requête sous forme de broadcast également).  
  Et le serveur DHCP répond simplement par un DHCPACK pour confirmer l'attribution.

## ARP

* ARP (*Address Resolution Protocol*) est un protocole utilisé pour déterminer  
  l'adresse MAC d'une machine présente sur le réseau local en connaissant son adresse IP.  
  Ce protocole permet relier le layer 2 au layer 3

* Le protocole ARP se déroule comme suit:

  1. host A est connecté à un réseau informatique et souhaite émettre une trame Ethernet à destination d’host B,  
     dont il connaît l’adresse IP privée.

  2. host A va placer sa trame en attente et effectuer une requête ARP en broadcast de niveau 2:  
    « quelle est l’adresse MAC correspondant à l’adresse IP X ? »

  3. Puisqu’il s’agit d’un broadcast, tous les ordinateurs du réseau local vont recevoir la requête.  
    En observant son contenu, ils pourront déterminer quelle est l’adresse IP sur laquelle porte la recherche.

  4. La machine qui possède cette adresse IP, host B, est la seule à répondre  
     en envoyant une réponse unicast à host A (l'origine de la requête): « je suis adresse IP, mon adresse MAC est Y »

  5. host A reçoit la réponse, met à jour son cache ARP et
     peut donc envoyer à host B, en mettant l'adresse MAC de host B en destinataire, la trame qu’il avait mis en attente

  ![](https://i.imgur.com/LfQbsPS.png)

* Le protocole ARP est nécessaire au fonctionnement d’IPv4 utilisé sur les réseaux de type Ethernet.  
  En IPv6, les fonctions d’ARP sont reprises par NDP (*Neighbor Discovery Protocol*).

## Table de routage

* Si l'adresse IP de destination est une adresse IP publique, en dehors du réseau, alors un routeur doit intervenir.

* Lorsqu'un routeur reçoit un paquet, il doit déterminer dans quelle direction il doit envoyer ce paquet. Pour ce faire, il utilise une *table de routage*, qui est une table de correspondance lui indiquant par quelle interface envoyer un paquet pour tel sous-réseau — en utilisant un masque de sous-réseau.

* La table de routage peut être construite

  - soit dynamiquement, à l'aide d'un protocole de routage dynamique tel que OSPF ou RIP
  - soit statiquement, avec l'administrateur venant configurer des routes statiques dans les configurations de l'appareil

## NAT

* NAT (*Network Address Translation*) est apparu en raison du nombre limité d'adresses disponibles avec IPv4:  
  ça permet d'avoir un réseau local avec un grand nombre machines, mais une seule adresse IP publique utilisée sur Internet.

  NAT permet de passer d'une adresse publique, reçue par le routeur, à une adresse privée,  
  transférée à une machine du réseau local qui est desservi par le routeur.

  ![](https://i.imgur.com/vNI5dUS.png)

* IPv6 n'a pas besoin d'adressage privée, et n'a donc pas besoin de NAT,  
  ce qui peut rendre IPv6 un peu plus rapide qu'IPv4.

## Format d'un paquet IP

![](https://i.imgur.com/2feJVidl.jpg)
