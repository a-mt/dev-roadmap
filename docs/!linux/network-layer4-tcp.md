---
title: Connexion
category: Linux, Network
---

## Layer 4

* La 3ème couche est chargée de la livraison des paquets à leur destination. Chaque paquet est transmis individuellement et peut emprunter des routes différentes: ils peuvent donc arriver dans le désordre, être corrompus ou même se perdre.  
  La 4ème couche est responsable de la communication de bout en bout: elle assure le multiplexage des données vers la bonne application (en utilisant des numéros de port source et destination), la fiabilité de la connexion (en ajoutant des checksum, numéros de séquence, et en gérant les paquets perdus) et évite la congestion du réseau.

* Le PDU de la quatrième couche est le *segment*  
  Ex: segment TCP

  ![](https://i.imgur.com/NVk3qrT.png)

---

## Protocoles

* Les protocoles les plus courants du layer 4 sont:

    - TCP (*Transmission Control Protocol*)
    - UDP (*User Datagram Protocol*)
    - SCTP (*Stream Control Transmission Protocol*)

## Multiplexage des applications

* Le *multiplexage* désigne une technique permettant de transmettre plusieurs signaux de données sur un même support.

* Le multiplexage des connexions se fait via l'utilisation de ports, un *port* est (dans ce contexte) un numéro qui désigne l'application cible.  

* Généralement, les serveurs ont des ports fixes sur lesquels ils écoutent les requêtes entrantes, et les clients utilisent un numéro de port aléatoire sur lequel ils attendent la réponse.

### Classification des ports

* Les ports sont classés en 3 types:

  - les <ins>ports connus</ins> (*well known ports*): de 0 à 1023  
    Ces ports désignent des services spécifiques et sont définis par l'IANA (*Internet Assigned Numbers Authority*).  
    Ils nécessitent généralement les privilèges d'un super-utilisateur pour être ouverts.

    Si on effectue une requête http sans préciser le port à utiliser, le paquet sera envoyé au destinataire port 80, qui est le port standard pour http. Parmis les ports les plus connus on trouve:

    | Port | Protocole | Service
    |---   |---        |---
    | 20   | TCP       | FTP (*File transfer protocol*) data
    | 21   | TCP       | FTP (*File transfer protocol*) command
    | 22   | TCP       | SSH (*Secure shell*)
    | 23   | TCP       | Telnet
    | 25   | TCP       | SMTP (*Simple Mail Transfer Protocol*)
    | 53   | TCP, UDP  | DNS (*Domain Name Service*)
    | 80   | TCP       | HTTP (*Hypertext Transfer Protocol*)
    | 389  | TCP, UDP  | LDAP (*Lightweight Directory Access Protocol*)
    | 443  | TCP       | HTTPS (*HTTP over SSL*)
    | 465  | TCP       | SMTPS (*SMTP over SSL*)
    | 636  | TCP, UDP  | LDAPS (*LDAP over SSL*)
    | 993  | TCP       | IMAPS (*IMAP over SSL*)
    | 995  | TCP       | POP3S (*POP3 over SSL*)

  - les <ins>ports enregistrés</ins> (*registered ports*): de 1024 à 49151  
    Ces ports sont également attribués par l'IANA.  
    Sur la plupart des systèmes, ils peuvent être ouverts par des utilisateurs autres de root.

    Quelques ports enregistrés notables:

    | Port | Protocole | Service
    |---   |---        |---
    | 1194 | TCP, UDP  | OpenVPN
    | 1293 | TCP, UDP  | IPSec
    | 1433 | TCP       | Serveur MySQL

  - les <ins>ports dynamiques ou éphèmères</ins> (*dynamic or ephemeral ports*): de 49152 à 65535  
    Les ports éphèmères sont assignés dynamiquement lorsqu'un client envoie une requête:
    le port éphémère est indiqué comme port source lors de l'envoi d'une trame, et va permet au serveur de répondre au client en l'envoyant à ce port.  
    On peut également utiliser les ports éphèmères pour un service temporaire ou n'ayant pas les droits root.

* Quand on a un système directement connecté à Internet, les ports connus sont constamment attaqués,  
  il est donc bon de les bloquer et d'utiliser un port non standard si possible.

---

## Connexion

* Un protocole de transport peut être avec ou sans connexion.  
  Un protocole avec connexion va d'abord s'assurer que le destinataire est joignable et accepte les requêtes.

* Ce processus se fait via un poignée de main à 3 voies (*3 way handshake*):

  1. Un message SYN (*synchronize*) est envoyé à l'ordinateur qu'on cherche à joindre
  2. Cet ordinateur répond par un SYN/ACK (*synchronize acknowledgement*)
  3. Enfin l'ordinateur d'origine accuse réception avec un message ACK (*aknowledge*)

  ![](https://i.imgur.com/JLXZ8gZ.png)

## TCP

* TCP (*Transmission Control Protocol*) est un protocole avec connexion (donc avec 3-way handshake).  
  Il assure la fiabilité de la connexion: il gère les pertes, fournit un contrôle d'erreur, et détecte l'altération des données.

* Pour résumer simplement l'échange de données avec TCP:

  - [Protocole IP]  
    Avant d'être transmises, les informations sont divisées en plusieurs petites parties, appelés "paquets"

  - [Protocole TCP]  
    Chaque paquet est doté de "headers" contenant un numéro d'identification séquentiel.  
    L'entête contient également l'adresse IP de destination et l'adresse IP source.

  - [Réseau coeur]  
    Les routeurs déterminent le chemin le plus rapide pour acheminer les paquets vers l'adresse IP de destination. Il existe des millions d'itinéraires différents possibles pour que les paquets parviennent d'un ordinateur à l'autre et pour éviter la congestion du réseau, les paquets n'empruntent pas tous les même chemin. Le temps du trajet n'étant pas constant, il est possible que les paquets arrivent à leur destination dans le désordre.

  - [Protocole TCP]  
    Lorsque les paquets arrivent à destination, ils sont remis dans le bon ordre (grâce à leur numéro d'identification) pour reconstituer le message d'origine

* TCP est utilisé par plusieurs autres protocoles du niveau application, dont
  - HTTP (*Hypertext Transfer Protocol*)
  - HTTPS (*Hypertext Transfer Protocol over SSL*)
  - SMTP (*Simple Mail Transfer Protocol*)
  - FTP (*File Transfer Protocol*)

## UDP

* UDP (*User Datagram Protocol*) est un autre protocole au niveau de la couche transport. C'est un protocole sans connexion, qui ne garantit pas la livraison des données. Il ne corrige pas l'ordre des paquets s'ils arrivent dans le désordre.

* Il est utilisé notamment par
  - DNS (*Domain Name System*),
  - les applications de streaming media
  - VOIP (*Voice-Over Internet Protocol*)

    | Caractéristiques | TCP | UDP
    |--- |--- |---
    | Orienté-connexion | Oui | Non
    | Fiable | Oui | Non
    | Ordre des paquets | Oui | Non
    | Checksums | Oui | Optionnel
    | Contrôle de flux | Oui | Non
    | Évitement des confgestion | Oui | Non
    | Compatible NAT | Oui | Oui
    | ECC | Oui | Oui
    | Taille du header | 20-60 octets | 8 octets

## Format d'un segment TCP ou UDP

![](https://i.imgur.com/4R0p30xl.jpg)