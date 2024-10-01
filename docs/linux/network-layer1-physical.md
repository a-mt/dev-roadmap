---
title: Support physique
category: Linux, Network
---

## Layer 1

* Les réseaux transmettent des données à l'aide de diverses méthodes mais toutes reposent sur l'envoi d'impulsions représentant des uns et des zéros: la présence d'un signal représente un 1, l'absence de signal représente un 0.

* La modulation du signal binaire sur un support physique est classé dans la couche 1 du modèle OSI.  
  Le PDU (*Protocol Data Unit*) de la première couche est le *bit*

  ![](https://i.imgur.com/zilFrqZ.png)

## Équipements

### Carte réseau

* La <ins>carte réseau</ins> (*Carte Interface Réseau*, CIR ou *Network Interface Card*, NIC en anglais) est un circuit informatique qui s'occupe de transformer les données numériques (signaux électriques) en signal pouvant être transmis sur le réseau — sur le support physique.  
  Le terme "carte réseau" vient de l'époque où il s'agissait d'une carte insérée dans l'ordinateur après sa construction. Les NICs modernes sont généralement des circuits installés directement sur la carte mère.

---

## Catégories de liaisons

* 3 types de liaisons peuvent être utilisées:
  - des câbles métalliques, qui font passer des courants électriques
  - des câbles optiques, qui font passer des signaux lumineux
  - ou l'air, qui font passer des ondes radio

  ![](https://i.imgur.com/AMZXjHc.png)

## Caractéristique des liaisons

Différents types de supports ont différentes caractéristiques.

* La <ins>*portée*</ins>, c'est la distance que le signal transmis peut parcourir sans être trop perturbé, de sorte que le récepteur puisse recevoir un message intègre.
  Des ondes circulant dans l'air auront une portée plus limitée que des signaux envoyés par câble.

* La <ins>*vitesse de propagation*</ins>, c'est la vitesse à laquelle un signal peut circuler sur le support physique.  
  Différents supports auront une vitesse de propagation différente.
  Les ondes lumineuses peuvent voyager à la vitesse de la lumière: 300 000 km/s  
  Les signaux électriques, à environ 2/3 de la vitesse de la lumière: 200 000 km/s

* Le <ins>*débit*</ins>, c'est le nombre de bits pouvant être reçus par seconde.  
  La vitesse de propagation aura moins d'importance sur le débit que la qualité de la transmission: si des signaux sont perdus en chemin, l'expéditeur devra ré-envoyer les paquets perdus et donc le débit diminue.

  - Les ondes radios sont soumises à beaucoup plus d'interférences qu'une connexion filaire (murs, objets, autres signaux radios en circulation...), 
    c'est donc une méthode qui est plus lente.

  - Les câbles électriques et les ondes radio sont sensibles aux perturbations électromagnétiques, 
    c'est donc une méthode rapide mais faillible suivant l'environnement autour.

  - Les fibres optiques, elles, ne dégagent ni ne sont sensibles aux ondes électromagnétiques autour: 
    les données peuvent être transmises sur une longue distance et à très grand débit.

* La <ins>*bande passante*</ins>, c'est l'intervalle de fréquences sur lequel le signal est correctement transmis.   
  Elle est mesurée en hertz (cycles par seconde).

  ![](https://i.imgur.com/hk1jp15.gif)

## Mode de transmission

Les transmissions peuvent être transmises en mode simplex ou duplex.

- <ins>En mode *simplex*</ins>:  
  le canal de communication fonctionne dans une seule direction — c'est le cas des diffusions radios.

- <ins>En mode *duplex*</ins>:  
  le canal de communication fonctionne dans les deux directions.

  - On distingue <ins>le *half-duplex*</ins>:  
    les signaux circulent dans une seule direction à la fois, mais elle peut être inversée — c'est le cas des talkie-walkie et du Wifi.

  - Et <ins>le *full-duplex*</ins>:  
    on utilise deux liens différents pour pouvoir communiquer dans les deux sens, simultanément — c'est le cas d'Ethernet si activé.

  ![](https://i.imgur.com/iHW66p1m.jpg)

## Vitesse de transfert

* Les réseaux ne stockent pas les données, ils les font circuler: on mesure donc la capacité d'un réseau en fonction de la vitesse à laquelle il peut transférer des données — ce qu'on appelle le débit.

  Le débit est la quantité de données (en bits) qu'un réseau peut déplacer en une unité de temps (en secondes). Ce qui nous donne l'unité utilisée pour mesurer la capacité d'un réseau: les *bits par secondes* (bps).

* La capacité du réseau (*capacity*),  
  la vitesse du réseau (*speed*),  
  le débit (*throughput*)  
  et la bande passante (*bandwidth*)  
  désignent tous la même chose et sont tous mesurés en bps.

* Les réseaux modernes sont capables de faire circuler des données très rapidement, de sorte que leur vitesse n'est plus mesurée en bits par secondes, mais avec un multiple K, M ou G — Kbps, Mbps ou Gbps:

  ![](https://i.imgur.com/Lgoqu1tm.png)

* Notons qu'un b minuscule représente un bit, tandis qu'un B majuscule représente un byte (octet), soit 8 bits. Pour savoir combien de KB (kilo-octets) un réseau peut déplacer par seconde, il faut diviser le Kbps par 8.

## Liaisons

### Câble Ethernet

* Le *câble Ethernet* est le type de câble le plus utilisé.  
  Ces câbles sont dotés d'un connecteur RJ-45 (*Registered Jack* 45) aux deux extrémités.

  Le connecteur RJ-45 est parfois appelé connecteur à 8 broches (*8-pin connector*), puisqu'il possède 8 broches en cuivre auxquelles vont être reliés 4 paires de fils torsadés protégés par une gaine protectrice. L’enroulement réduit les conséquences des inductions électromagnétiques parasites sur les paires voisines, et minimise les risques d'erreur de transmission liées aux perturbations électromagnétiques.

  ![](https://i.imgur.com/sOZeV6vt.jpg)
  ![](https://i.imgur.com/MBsi79It.png)

#### Types de câbles Ethernet

* Il existe différent types de câbles Ethernet:

  - UTP (*Unshielded Twisted Pairs*): sont des câbles non blindés  
  - FTP (*Foiled Twisted Pairs*): ont un écran d'aluminium entre la gaine et les paires  
  - STP (*Shilded Twisted Pairs*): ont un blindage par paire  
  - SFTP: ont les deux — un blindage sous la gaine et un blindage par paire

  ![](https://i.imgur.com/l52WzkTm.jpg)

* On peut également trouver différents diamètres de câbles.  
  Le câble Ethernet Cat.5 (un petit UTP) est le plus courant et le moins cher:

  ![](https://i.imgur.com/SQWvOFn.png)

  <!--![](https://i.imgur.com/J8rLq2El.jpg)-->

#### Disposition des fils

* Sur les 8 broches d'un câble Ethernet, seules 4 sont utilisées pour transmettre des données — 2 par sens de transmission.
  Le standard T568B normalise la disposition des fils comme suit:

  | Numéro | Utilisation | Couleur des fils du câble
  |---     |---          |---
  | 1 | Sortie des données (+) | blanc/orange
  | 2 | Sortie des données (-) | orange
  | 3 | Entrée des données (+) | blanc/vert
  | 4 | Réservé pour le téléphone | bleu
  | 5 | Réservé pour le téléphone | blanc/bleu
  | 6 | Entrée des données (-)    | vert
  | 7 | Réservé pour le téléphone | blanc/marron
  | 8 | Réservé pour le téléphone | marron

* La disposition des fils peut être inversée, il s'agit dans ce cas du standard T568A:

  ![](https://i.imgur.com/E3Wv5Xqm.png)

* Les T568A et T568B correspondent à deux cas d'usage:

  - <ins>le câble de raccordement ou *câble droit* (*straight-through*)</ins>  
    La sortie reste la sortie — le câble a deux connecteurs T568A ou deux T568B à ses extrémités. La broche 1 du connecteur A passe à la broche 1 du connecteur B, la broche 2 à broche 2, etc.
    Ce type de câble est utilisé pour connecter un ordinateur à un switch, hub ou routeur.

    ![](https://i.imgur.com/I36WOPem.png)

  - <ins>le *câble croisé* (*crossover*)</ins>  
    La sortie devient l'entrée — la câble a un connecteur un T568A et un T568B. La broche 1 sur le connecteur A passe a la broche 3 du connecteur B, la broche 2 à la broche 6, la broche 3 à la broche 1 et la broche 6 a la broche 2, etc.
    Ce type de câble est utilisé pour connecter 2 ordinateurs, 2 routeurs ou 2 hubs, entre eux.

    ![](https://i.imgur.com/2lx1Pdjm.png)

### Câble téléphonique

* Les câbles utilisés par les téléphones fixes sont dotés de connecteurs RJ-11.  
  Ils ressemblent aux RJ-45 mais sont plus petits, et n'ont que 6 broches.

  ![](https://i.imgur.com/E7ZfXmrt.png)

* Les routeurs fournissent généralement des prises  
  RJ-45 pour les ordinateurs et autres périphériques (généralement en jaune)  
  et RJ-11 pour un téléphone traditionnel (vert).

  ![](https://i.imgur.com/FeH4s2dm.png)

### Câble coaxial

* Le *câble coaxial* est
  - un câble en cuivre (D), appelé *âme*,
  - entouré d'un matériau isolant (C),
  - lui-même entouré d'une tresse métallique (B), appelé *blindage*
  - protégé par une gaine isolante (A)

  ![](https://i.imgur.com/mBQNOJJt.jpg)

* Il autorise des débits plus élevés et est peu sensible aux perturbations électromagnétiques extérieures.  
  Il est utilisé pour les liaisons téléphoniques inter-urbaines, les câbles sous-marins, la télévision par câble et la connexion des radios à leurs antennes.
  À partir de la fin du XXe siècle, le câble coaxial est progressivement remplacé par la fibre optique pour les utilisations sur de longues distances (distances supérieures à un kilomètre).

* Il existe de multiples variantes de ce type de câble et de connecteurs, suivant l'usage.  
  Le plus connu est le RG-59/U, qui est utilisé pour la télévision.
  [Standards des câble coaxiaux](https://en.wikipedia.org/wiki/Coaxial_cable#Standards)

### Fibre optique

* La *fibre optique* est un câble qui contient des brins de fibres de verre.  
  Ils sont conçus pour les réseaux à longue distance et à haute performance.

* Il existe deux grands types de câbles à fibre optique:

  - <ins>la fibre *monomode*</ins> utilise des brins de verre très fins et un laser pour générer la lumière: la lumière ne peut prendre qu'un seul chemin en ligne droite. Des techniques de multiplexage (*Wave Division Multiplexing*, WDM) sont utilisées pour augmenter la quantité de données pouvant être envoyées sur un brin.

    Ce type de fibre offre une grosse bande passante et une faible atténuation. Elle peut s'étendre sur 40 km ou plus sans perturbations, et est privilégiée pour les installations à grande échelle. La gaîne protectrice de ce type de câble est presque toujours jaune

  - <ins>la fibre *multimode*</ins> utilise des brins plus larges et des diodes électroluminescentes (DEL) comme source de lumière: la lumière peut prendre de multiples chemins.

    Par rapport aux fibres monomodes, la fibre multimode offre une largeur de bande plus faible et une atténuation plus élevée mais est plus rentable pour les installations moins exigeantes en termes de débit et de distance.

    ![](https://i.imgur.com/ejyVzHK.png)

* Différents types de connecteurs sont possibles

  ![](https://i.imgur.com/mAmgPyr.png)

  Dans tous les cas, il faudra un convertisseur Ethernet / Fibre optique — puisque les appareils des réseaux utilisateur n'ont pas d'interfaces pour connecter la fibre optique directement

  ![](https://i.imgur.com/lwWHoPJm.png)

### Air

* Les connexions filaires ont l'avantage d'offrir des connexions à très haut débit, mais ont l'inconvénient de nécessiter des câbles entre les appareils. Pour se déplacer dans un véhicule, à pied ou même chez soi, on ne traîne pas un câble derrière: on a recours aux réseaux sans fil.

* Les connexions sans fil utilisent des ondes radio qui circulent dans l'air
