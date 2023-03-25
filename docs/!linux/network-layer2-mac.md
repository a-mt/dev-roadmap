---
title: Transfert des données
category: Linux, Network
---

## Layer 2

* La 1ère couche du modèle OSI est la connexion physique des réseaux informatiques.  
  Dès qu'on parle de protocoles, on introduit la 2ème couche.

* Le PDU de la 2ème couche OSI est la trame (*frame* en anglais).  
  Ex: trame Ethernet

## Équipements

### Switchs

* Les *switchs* (ou *commutateur* en français) connectent tous les appareils d'un réseau local.  
  La communication au sein du réseau se fait par le biais des adresses MAC des appareils.  
  Si l'hôte A veut envoyer des données à l'hôte B, il a besoin de connaître l'adresse MAC de l'appareil et le switch dirigera le traffic vers le port associé à l'adresse MAC du destinataire.

  ![](https://i.imgur.com/Pn27RhDm.png)

### Hub

* Un *hub* (ou *concentrateur* en français) est un appareil qui transfère toutes les données en entrées à tous les autres ports: contrairement au switch, il ne va pas chercher à envoyer les données uniquement à son destinataire, mais les envoit systématiquement à tous les appareils branchés. Un hub a typiquement moins de ports qu'un switch.

---

## Protocoles

* Il existe de nombreux protocoles pour différents types de liaisons et réseaux. Les plus répandus sont:

  - Réseau mobile:
    3G, 4G, 5G, NB-IoT

    | Fréquences      | Réseau
    |---              |---
    | 694-790 MHz     | 4G LTE
    | 791-862 MHz     | 4G LTE
    | 876-960 MHz     | 2G GSM / 3G UMTS
    | 1710-1880 MHz   | 2G GSM / 4G LTE
    | 1900-1979 MHz   | 3G UMTS
    | 2110-2169 MHz   | 3G UMTS / 5G
    | 2500-2570 MHz   | 4G LTE
    | 2620-2690 MHz   | 4G LTE
    | 3400-3800 MHz   | 5G
    | 24500-27500 MHz | 5G

  - Réseau radio: 
    Wi-Fi, Bluetooth, NFC, Radio FM, LoRaWAN

    | Fréquences       | Réseau
    |---               |---
    | 13.56 MHz        | NFC
    | 87.5–108 MHz     | Radio FM
    | 433 MHz, 868 MHz | LoRaWAN
    | 2.4–2.5 GHz      | Bluetooth
    | 2.4 GHz, 5 GHz   | Wi-FI

  - Liaison filaire: Ethernet
  - Liaison optique: Li-Fi

### Ethernet

* <ins>Ethernet</ins> est le protocole utilisé pour les connexions filaires. Il est définit par le standard IEEE 802.3

### Wi-Fi

* <ins>Wi-Fi</ins> (*Wireless Fidelity*) est le protocole utilisé pour les connexions sans fil. Il est définit par le standard IEEE 802.11.

* Différentes variantes de ce standard ont été publiées, offrant notamment des modifications en terme de débit ou de sécurité. Parmis les plus notables on trouve:

  * 1997: La première version de la norme Wi-Fi, le standard IEEE 802.11 legacy, permettait des communications jusqu'à 2 Mbps en utilisant la gamme de fréquences de 2,4 GHz.

  * 1999: Deux ans plus tard, la norme 802.11b a plus que quintuplé cette vitesse, permettant des communications à 11 Mbps, également à 2,4Ghz.  
    Publié en parallèle, la norme 802.11a offrait une connectivité de 54 Mbps, en utilisant les communications de la bande 5Ghz. Mais l'équipement nécessaire était beaucoup plus cher et cette norme n'a pas été largement utilisée.

  * 2003: La norme 802.11g a permis d'augmenter la bande passante maximale à 54 Mbps à 2,4 GHz.

  * 2009: La norme 802.11n permet d'encore augmenter la bande passante, jusqu'à 300 Mbps, grâce à l'utilisation d'antennes spéciales connues sous le nom d'antennes MIMO (*multiple input, multiple output*). Les réseaux 802.11n fonctionnent à la fois en 2,4 et 5,0 GHz.

  * 2013: La norme 802.11ac permet désormais de communiquer à des vitesses supérieures à 1 Gbps en utilisant la bande 5.0Ghz.

  ![](https://i.imgur.com/cQfID3Vm.png)

* Les signaux radio flottent dans l'air et quiconque peut les recevoir, ce qui pose des problèmes de sécurité. Pour y remédier, plusieurs normes de cryptage Wi-Fi ont été élaborées:

  * <ins>WEP (*Wireless Encryption Privacy*)</ins>  
    1999: cet algorithme de cryptage possède plusieurs failles, il est abandonné depuis 2004

  * <ins>WPA (*Wi-Fi Protected Access*)</ins>  
    2003: WPA respecte la majorité de la norme IEEE 802.11i et est compatible 802.11b et 802.11g

  * <ins>WPA2 (*Wi-Fi Protected Access 2*)</ins>  
    2004: le WPA2 est compatible à 100% IEEE 802.11i

  * <ins>WPA3 (*Wi-Fi Protected Access 3*)</ins>  
    2018: la Wi-Fi Alliance annonce que le WPA3 remplace WPA2, lié à la norme IEEE 802.11i

  Tous les algorithmes présentent des failles de sécurité à l'exception du dernier en date, WPA3

  [IEEE standards 802.11](https://en.wikipedia.org/wiki/IEEE_802.11i-2004#External_links)

* Les connexions Wi-Fi nécessitent un point d'accès, qui est typiquement un routeur du réseau. Pour identifier cet appareil, on lui attribue un nom unique appelé le *Service Set Identifier* (SSID)

### Bluetooth

* <ins>Bluetooth</ins> est utilisé pour des connexions sans fil de courte portée (environ 10 mètres) et destinées à une seule personne.  
  Il est normalisé par le standard IEEE 802.15.  
  Les réseaux Bluetooth sont généralement crées par un ordinateur ou un smartphone, par exemple pour utiliser un casque sans fil ou connecter son téléphone à sa voiture pour un accès mains libres.

* Bluetooth a également été adapté pour des objets avec une basse consommation: <ins>BLE</ins> (*Bluetooth Low Energy*).

### NFC

* <ins>NFC</ins> (*Near Field Communication*) est utilisé pour des connexions sans fil de très courte portée, les deux appareils ne doivent pas être éloignés de plus de quelques centimètres l'un de l'autre.  
  La technologie NFC est souvent utilisée pour les paiements sans contact et les systèmes de contrôle d'accès aux bâtiments (badges).

---

## Adresse MAC

*  Une *adresse MAC* (*Media Access Control*) est une adresse, unique dans le monde, que possède chaque carte réseau vendu sur le marché. Cette adresse est écrite par le fabricant de la carte dans sa ROM — certaines cartes réseau permettent toutefois de modifier leur adresse MAC. Chaque station dispose ainsi d'une adresse physique qui lui est propre, qui ne change a priori jamais.

* L'adresse MAC est utilisée lorsque des machines communiquent avec leur voisin immédiat sur le réseau. Les paquets envoyés proviennent d'une adresse MAC et sont envoyés vers une autre adresse MAC. Si un ordinateur reçoit un paquet, il compare l'adresse MAC de destination à sa propre adresse MAC. Si les adresses correspondent, le paquet est traité, sinon il est rejeté.

  Lorsqu'on utilise un switch, celui-ci stocke en mémoire l'adresse MAC de chaque machine branchée pour ne transférer les paquets que vers les machines auxquelles les paquets sont destinés.

### Format des adresses MAC

* Les adresses MAC sont composées de 6 nombres de 8 bits.  
  L'adresse MAC est représentée par des nombres hexadécimaux séparés par un deux-point (:).  
  Exemple:

  ```
  5E:FF:56:A2:AF:15
  ```

* Les 3 premiers octets identifient le fabricant de la carte réseau.  
  On appelle ce code le OUI (*Organizationally Unique Identifier*)

  Les octets restants consituent l'UAA (*Universally Administered Addresses*).
  Ils sont attribués par le fabricant, de la manière qu'il souhaite, pourvu que ce numéro soit unique pour chaque appareil

  ![](https://i.imgur.com/c0FbJBKl.png)

  ![](https://i.imgur.com/p13Mfgyl.png)

  [Liste complète des OUI](https://standards-oui.ieee.org/oui/oui.txt)

### EUI-64

* L'IEEE gère l'attribution des adresses MAC, connues à l'origine sous le nom de MAC-48 — puisqu'elles font 48 bits.

* L'IEE les désigne désormais sous le nom d'EUI-48 (pour *Extended Unique Identifier*) et estime que ces adresses seront épuisées d'ici 2080, leur usage est par conséquent restreint aux applications Ethernet. Quant aux applications non Ethernet, il est conseillé qu'elles utilisent des adresses EUI-64 — des adresses de 8 nombres de 8 bits.

* On peut construire une adresse EUI-64 à partir d'une adresse MAC en insérant FFFE dans les octets 4 et 5.

  ![](https://i.imgur.com/qj6ZsL2.png)

---

## Options d'envoi

* Pour transmettre un message sur un réseau, on a 3 possibilités:

  - **unicast**  
    C'est le terme utilisé pour décrire une communication dans laquelle il n'y a qu'un seul émetteur et un seul récepteur.

    Une trame unicast ne contient que l'adresse MAC du destinataire. Par exemple si host1 veut communiquer avec host3, il s'agit d'une communication unicast.

    ```
    xx:xx:xx:xx:xx:xx
    ```

  - **broadcast**  
    Outre la transmission de trames dirigées vers une seule machine, il est possible d'envoyer des trames à toutes les machines du réseau local en utilisant de l'adresse de diffusion, ou adresse de *broadcast* en anglais.

    Cette adresse ne contient que des 1. Par exemple si host1 cherche à connaître l'adresse MAC d'un ordinateur du réseau local à partir de son adresse IP, il envoit une trame à destination de FF:FF:FF:FF:FF:FF et cette trame sera transmise à tous les hôtes connectés — et seul celui ayant l'adresse IP questionné répondra

    ```
    FF:FF:FF:FF:FF:FF
    ```

  - **multicast**  
    On peut également envoyer des trames à un groupe de stations en utilisant une adresse dite de *multicast*. Une trame multicast est soit transmise à tous si aucune optimisation multicast n'est configurée, soit envoyée uniquement à ceux souhaitant recevoir le trafic pour l'adresse donnée — qui peut désigner une application, protocole ou flux de données. 

    Les adresses dont le bit de poids faible dans le premier octet est égal à 1 (autrement dit, le premier octet est impair) sont traitées comme des adresses multicast. L'adresse de broadcast, qui ne contient que des 1, est une adresse multicast ayant la particularité de n'avoir aucun filtre.

    [Addresses de multicast](https://en.wikipedia.org/wiki/Multicast_address#Ethernet)

  * **anycast**  
    Est un type de trafic introduit avec IPv6: il désigne le noeud le "plus proche" ou le "plus efficace". Le destinataire importe peu mais un seul d'entre eux est choisit pour recevoir l'information.

  ![](https://i.imgur.com/uKZXxVv.png)

## Table MAC

* Un switch est un appareil réseau reliant les dispositifs entre eux en utilisant la commutation de paquets pour recevoir, traiter et acheminer les données vers la bonne destination.  
  La plupart du temps, les switchs opèrent au niveau de la couche 2 du modèle OSI: ils assurent la commutation en fonction des adresses MAC.

* Chaque switch garde en mémoire une *table d'adresses MAC*, aussi appelée *table d'apprentissage*, qui lui permet de savoir à quel port physique correspond quelle adresse MAC.

  1. Au début la table MAC est vide

      ![](https://i.imgur.com/K0xRKya.png)

  2. Si host1 envoit des données à host2, le switch ajoute l'adresse MAC d'host1 dans sa table et transfère la requête à tous les hôtes connectés: lorsqu'un switch reçoit une trame destinée à une adresse qu'il n'a pas encore vue, il envoit la trame sur tous les ports (autre que celui sur lequel elle est arrivée), un processus appelé le *flooding*.

      ![](https://i.imgur.com/xR6lX2U.png)

  3. host2 reçoit la requête, voit qu'elle lui est destinée, et répond en unicast à l'émetteur de la requête — c'est à dire host1. Le switch ajoute l'adresse MAC de host2 dans sa table.  

      ![](https://i.imgur.com/8Fh85AY.png)

  4. Au fur et à mesure que des machines lui envoient des requêtes, le switch apprend les adresses MAC associées à chaque port — en regardant les adresses sources des trames qui le traversent.

     ![](https://i.imgur.com/NCXT2Nf.png)

      Sans base de données, le switch doit envoyer le trafic reçu sur un port donné vers tous les autres ports pour s'assurer qu'il atteint sa destination. Avec la base de données d'adresses MAC, le traffic est filtré en fonction de sa destination.

      Cet apprentissage automatique permet d'ajouter de nouvelles machines au réseau sans avoir à configurer le switch manuellement pour qu'il la reconnaisse, ou la machine pour qu'elle connaisse le switch.

* Les switchs suppriment automatiquement les entrées de leur base de données au bout d'un certain temps — généralement 5 minutes — s'ils ne voient pas de nouvelles trames en provenance de cette machine.

## VLAN

* Envoyer des messages (en broadcast ou flooding) à un nombre important de machines peut entraîner un trafic parasite important, et entraîner une latence qui, si elle n'est pas contrôlée, peut provoquer des pannes et des pertes de service.

* Pour parer ce problème, les switchs permettent de diviser le réseau en plusieurs sous-sections, et de choisir quelle interface appartient à quelle section.

  Pour ce faire, on crée un réseau local virtuel ou *virtual local area network* (VLAN) en anglais. Un switch peut avoir des milliers de VLAN en cours d'exécution en même temps. Seuls les appareils appartenant à la même VLAN recevrons les broadcast.

* Si un routeur ou switch L-3 n'est pas connecté entre les VLAN (pour transmettre les données en utilisant les adresses IP des trames), alors deux hôtes placés sur des VLAN différentes ne peuvent pas communiquer.

* Les VLANs ont plusieurs avantages:

  - la réduction du trafic sur le réseau. Le broadcast et le flooding sera confiné à une VLAN, et les machines appartenant à d'autres VLAN recevrons moins de messages qui ne leur sont pas destinés.

  - plus de sécurité. En séparant les systèmes contenant des données sensibles du reste du réseau, on diminue les risques que des personnes accèdent à des informations qu'elles ne sont pas autorisées à voir

  - le regroupement logique. Si une station change de rôle, il n'est pas nécessaire de la déplacer physiquement, on peut simplement la changer de VLAN
