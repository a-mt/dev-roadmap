---
title: IPSec
category: Sécurité informatique
---

IPSec est un ensemble de protocoles qui permettent de protèger le traffic IPv4 et IPv6.  
IPSec résout
- de nombreux problèmes d'authentification
- l'usurpation d'identité IP
- la plupart des attaques DoS
- le problème de la confidentialité des données

![](https://i.imgur.com/DTq5Yf4.png)

## Mode transport vs mode tunnel

IPsec peut fonctionner en mode transport ou en mode tunnel réseau.
- En mode transport, seules les données transférées (la partie payload du packet IP) sont chiffrées.
- En mode tunnel, c'est la totalité du packet IP qui est chiffré. Le packet est encapsulé dans un nouveau packet IP avec une nouvelle en-tête IP. Le mode tunnel est utilisé pour créer des réseaux privés virtuels (VPN) - la machine qui reçoit le packet sert de proxy.

![](https://i.imgur.com/pWZFTiR.png)

## Security Associations (SA)

Chaque partie définit l'association de sécurité qu'il veut utiliser (qui peut être différente de l'autre partie).  
Chaque SA contient
- l'adresse de destination
- un identifiant unique (Security Parameter Index, SPI)
- le protocole utilisé (AH ou ESP)
- les paramètres d'authentification (algorithmes et clés) 
- les paramètres de chiffrement (algorithmes et clés) 
- le mode IPSec (tunnel ou transport)
- la durée de vie des clés

![](https://i.imgur.com/hjZWrXU.png)

## Internet Key Exchange (IKE)

IKE (Internet Key Exchange) est utilisé pour la gestion des clés. Avant qu'une transmission IPSec soit possible, le protocole IKE authentifie les deux parties, soit à l'aide de certificats soit par la génération de clefs de session RSA.

IKE est un protocole hybride, basé sur ISAKMP, Oakley,
SKEME.

## Authentication Header (AH)

AH (Authentication Header) est un protocole IP (#51) qui ajoute un header supplémentaire au packet IP. Il utilise un hash SHA-1 ou MD5 ansi qu'une clé secrète (secret partagé dans le SA) qui permet d'assurer l'authentification et l'intégrité des messages.

![](https://i.imgur.com/z2GoYEI.png)

## Encapsulating Security Payload (ESP)

Encapsulating Security Payload (ESP) est un protocole IP (#50). Il ajoute un header supplémentaire et encrypte les données (pour lequel un deuxième HMAC est généré) ce qui assure l'authentification, l'intégrité et la confidentialité.

![](https://i.imgur.com/yzyl6Rj.png)