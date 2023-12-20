---
title: Domain Name System (DNS)
category: Linux
---

## Pourquoi faire

* Les ordinateurs utilisent les adresses IP pour communiquer sur le réseau, mais ces adresses sont difficiles à mémoriser — imaginez devoir mémoriser l'adresse IP de chaque serveur web auquel vous souhaitez accéder...

* Pour parer ce problème, on utilise des noms de domaine. Les serveurs DNS traduisent les noms (tel que google.com) en adresses IP (tel que 172.217.19.46).

    1. Quand on se connecte à un réseau, le réseau fournit (via DHCP) l'adresse IP d'un serveur DNS local,
       qu'on peut requêter pour trouver l'adresse IP d'un nom de domaine donné.

    2. Quand on entre un nom de domaine dans un navigateur, une requête est envoyé au serveur DNS,
       lui demandant l'adresse IP associée à ce nom.

    3. Si le serveur DNS connaît la réponse, il répond à la requête en indiquant l'adresse IP associée
       au nom de domaine demandé. Le navigateur web peut alors se connecter au site en utilisant l'adresse IP de ce site.

    4. Si le serveur DNS ne connaît pas la réponse, alors il envoit la requête à d'autres serveurs DNS 
       pour déterminer la réponse, avant de lui même transférer la réponse.

    ![](https://i.imgur.com/nmPCc53.png)

---

## Nommage

### Labels

* Chaque nom DNS est composé de chaîne de caractères appelés *labels* ou *domaines*, séparés par des points.  
  Exemple: wikipedia.com

  * <ins>TLD</ins>  
    Le label le plus à droite est le domaine de premier niveau (en anglais *Top-Level Domain*, TLD).  
    Exemple: com, net, org

  * <ins>Nom de domaine</ins>  
    Le TLD est suivit du domaine de second niveau (en anglais *Second Level Domain*, SLD) ou *nom de domaine*.  
    Exemple: wikipedia, google, mozilla

  * <ins>Sous-domaine</ins>  
    Enfin, on peut sous-diviser le nom de domaine avec un *nom d'hôte*, aussi appelé *sous-domaine*.  
    Exemple: www, blog, mail

* L'ensemble tld + nom de domaine + nom d'hôte constitue le *fully qualified domain name* (FQDN) — ou en français, le nom de domaine complet.

  ![](https://i.imgur.com/ACBJ5HEm.png)

* La norme prévoit qu'un label ne peut contenir que des caractères de A à Z (insensibles à la casse), des chiffres et des traits d'union.  
  Un label ne peut dépasser 63 caractères, et un FQDN ne peut dépasser 253 caractères. 

### TLD

On distingue différents types de TLD:

- ccTLD (*Country-Code TLD*)  
  Sont des TLD à deux lettres, établis pour les pays et territoires. Il y a en plus de 250.  
  Exemple: .de, .fr, .jp.

- gTLD (*Generic TLD*)  
  Sont des TLD à trois lettres ou plus.  
  On peut les sous-diviser en deux catégories:

  - uTLD (*Unsponsored TLD*)  
    Fonctionne selon des politiques établies par l'ICANN. Ces noms de domaine peuvent être enregistrés sans restriction.  
    Exemple: .com, .net, .org

  - [sTLD](https://en.wikipedia.org/wiki/Sponsored_top-level_domain) (*Sponsored TLD*)  
    Fonctionne selon des politiques étables par un *sponsor*, une organisation à qui est délégué la responsabilité de gérer la TLD. Ces TLD sont destinés à des communautés précises (ethnique, géographique, professionnelle, technique ou autre) et ont un usage limité — il faut prouver auprès du sponsor votre légitimité à obtenir ce TLD.  
    Exemple: .gov, .edu, .mil, .museum

  [Liste des TLDs](http://archive.icann.org/en/tlds/)

---

## Résolution DNS

### Hiérarchie

* Le DNS est un système hiérarchique, lorsqu'un serveur DNS doit effectuer une recherche,  
  il pose une série de questions qui aboutissent finalement à la réponse définitive.
  C'est la raison pour laquelle on appelle ce type de serveur DNS un <ins>résolveur DNS récursif</ins> ou récurseur DNS

* Si le serveur DNS ne connaît pas l'adresse IP associée au nom de domaine demandé:

  1. Il envoit une requête à un <ins>serveur de noms racine</ins> (*DNS root nameserver*).  
     La liste mondiale des serveurs racines est gérée par l'IANA — il y en a 13.

  2. Le serveur racine renvoit l'adresse IP d'un des <ins>serveurs de noms TLD</ins> (*DNS TLD nameserver*) qui répond au TLD demandé (ex .com).  
     Un serveur TLD conserve les informations relatives à ses domaines

      <!-- -->
       

  3. Le serveur DNS va à nouveau envoyer une requête, cette fois à un serveur TLD.
  4. Le serveur TLD répond avec l'adresse IP d'un serveur DNS faisant autorité pour le domaine souhaité,  
     le <ins>serveur DNS de référence</ins> (*authoritative nameserver*)

      <!-- -->
       

  5. Le serveur DNS envoit une requête, cette fois au serveur DNS faisant autorité
  6. Le serveur DNS lui répond l'adresse IP associée au nom de domaine demandé.

  ![](https://i.imgur.com/zkzhFCh.png)

* Quand le résolveur DNS reçoit la réponse finale, il met en cache l'association nom de domaine / adresse IP pour les demandes ultérieures.

### Résolveur stub

* Le processus du système d'exploitation qui traite les requêtes DNS est communément appelé un *résolveur stub* ou client DNS.
  Lorsqu'un résolveur stub reçoit une requête d'une application, il vérifie d'abord son propre cache pour voir si l'enregistrement s'y trouve.

* Si le résolveur stub n'a pas l'information, il envoit une requête DNS à l'extérieur du réseau local,
  vers un résolveur récursif DNS dépendant du FAI (*fournisseur d'accès Internet*).
  Lorsqu'un résolveur récursif reçoit une requête DNS, il vérifie lui assu si l'information est déjà stockée dans sa couche de persistance locale.

* Si le résolveur récursif n'a pas l'information, alors une résolution DNS est déclenchée.  
  Les données DNS peuvent être mises en cache à divers endroits, chacun stockant des enregistrements DNS pendant un laps de temps déterminé par une TTL (*Time to live*, durée de vie en français).

[What is DNS](https://www.cloudflare.com/fr-fr/learning/dns/what-is-dns/)

---

## Entrées DNS

### Zones DNS

* DNS permet de traduire un nom de domaine en adresse IP, mais il peut également lier un nom de domaine à d’autres fonctionnalités web tel qu'une boîte mail ou rediriger un nom de domaine vers un autre.

* Les données DNS d'un domaine sont appelées *zone*.  
  Plus précisement, une zone DNS contient les entrées DNS d’un domaine — qui permettent d'associer diverses informations à un nom de domaine.  
  On peut rencontrer différents types d’entrées DNS, les principales sont: NS, A, CNAME, MX, TXT.

  ![](https://i.imgur.com/AdGD1Jn.png)

* La zone de chaque nom de domaine est stockée sur un serveur de nom de référence.
  Certaines organisations exploitent leurs propres serveurs de noms pour publier leurs zones, mais elles confient généralement cette fonction à des tiers — comme des registrars, registries, sociétés d'hébergement web ou fournisseurs de serveurs réseau.

* Note: Un nom de domaine peut posséder plusieurs zones DNS chez différents registras (Webo, OVH…)
  mais une seule sera active. Pour savoir quels DNS sont actifs, on peut utiliser [dig](https://digwebinterface.com/)

### Fichier de zone

* Un *fichier de zone* est un fichier texte stocké sur un serveur DNS, 
  qui contient la représentation réelle de la zone, avec toutes les entrées DNS pour chaque domaine de la zone.  
  Le fichier doit respecter un format donné — s'il n'est pas respecté, le Client reçoit le message d’erreur SERVFAIL.

* De manière facultative, le fichier peut commencer par le nom de la zone suivi du TTL.    
  Si renseigné à ce niveau, le TTL est alors applicable à toute la zone et évite d’avoir à préciser cette donnée dans chaque enregistrement 

  ``` txt
  $ORIGIN example.com.
  $TTL 12879
  ```

* La première entrée DNS obligatoirement être le SOA (*Start of Authority*),  
  qui spécifie entre autres les coordonnées de l’administrateur de la zone.  
  Viennent ensuite les enregistrements qui concernent les noms des serveurs, suivis des enregistrements A et AAAA.

* On peut ajouter des commentaires en utilisant des points-virgules, et les lignes vides sont également ignorée.  
  À chaque enregistrement, sa propre ligne: un retour à la ligne marque la fin d’un enregistrement.  
  Et si on veut saisir un même enregistrement sur plusieurs lignes, alors on utilise des parenthèses.

  ``` txt
  @    IN   SOA   ns.example.com. root.example.com. (
                  1     ; Serial
             604800     ; Refresh
              86400     ; Retry
            2419200     ; Expire
             604800     ; Negative Cache TTL
            )
  ```

<details>
<summary>Exemple de fichier zone</summary>

<pre lang="txt">
$TTL  604800  ; This TTL declaration applies to all
     ; records defined below that do not define
     ; their own TTL

; In this file, @ means the "current origin domain"

@    IN   SOA   ns.example.com. root.example.com. (
                1     ; Serial
           604800     ; Refresh
            86400     ; Retry
          2419200     ; Expire
           604800     ; Negative Cache TTL
          )

@        NS   ns
ns       A    192.168.0.1
@        NS   ns.example.com.
ns       A    192.168.0.254

@    IN   MX   1 host
@    IN   MX   2 mail2.example.net. ; note this is
                     ; in another
                     ; zone/domain

host  IN   A    192.168.0.2
      AAAA   2001:db8:85a3:0:0:8a2e:370:7334

$TTL 1w2d3h4m5s ; The TTL defined here overwrites the
       ; setting above and applies to all the
       ; records below it that do not define their
       ; own TTLs.

foo.bar       A   192.168.0.3 ; An example of a
                  ; relative address:
                  ; foo.bar.example.com.
foo.bar.example.com. A   192.168.0.4 ; An example of an
                  ; absolute address

alias        CNAME host

_sip._udp      SRV  0 5 5060 sipserver
sipserver  3600  A   192.168.0.5 ; This record has
                   ; its own TTL (3600)

text1       TXT  "This is a TXT record"
*.wildcards    TXT  "This is a wildcard TXT record"
</pre>
</details>

### Entrées DNS

* Chaque entrée DNS contient ces différents champs:

  - **nom**:  
    Domaine ou sous-domaine

  - **TTL (Time to Live)**:  
    Durée pendant laquelle les clients et serveurs DNS peuvent mettre en cache une réponse.  
    Peut être omis si définit au niveau de la zone

  - **classe**:  
    Théoriquement, les DNS records sont répartis en plusieurs classes: IN pour Internet, CH pour Chaos et HS pour Hesiod [&#x21F2;](https://en.wikipedia.org/wiki/Domain_Name_System#cite_ref-40). En pratique, la plupart des enregistrements DNS relèvent de la classe Internet, cette information est donc facultative.

  - **type**:  
    A, MX, TXT, CNAME, etc. Les plus courant sont le type "A", qui mappe un nom à une adresse IPv4; et "MX", qui mappe un nom à un serveur mail

  - **rdlength**:  
    Champ facultatif spécifiant la taille en octets du champ de données suivant

  - **rdata**:  
    Nom de domaine, adresse IP ou tout autre valeur pertinente

  ```
  foo.bar   A   192.168.0.3
  ```

### Types d'entrées DNS

* Les types d'entrées les plus courantes sont:

  * <ins>A</ins> (Address Mapping)  
    Stocke un nom d'hôte et l'adresse IPv4 correspondante

  * <ins>AAAA</ins> (IP Version 6 Address Mapping)  
    Stocke un nom d'hôte et l'adresse IPv6 correspondante

  * <ins>CNAME</ins> (Caninocal Name)  
    Peut être utilisé pour aliaser un nom d'hôte vers un autre. Lorsqu'un client DNS demande une entrée contenant un CNAME qui pointe vers un autre nom d'hôte, le processus de résolution DNS est répété avec le nouveau nom d'hôte.

  * <ins>MX</ins> (Mail exchanger)  
    Spécifie un serveur de messagerie SMTP pour le domaine

  * <ins>NS</ins> (Name Server)  
    Indique qu'une zone DNS (telle que exemple.com) est déléguée à un autre serveur de nom de référence, et fournit l'adresse du serveur de nom.

  * <ins>PTR</ins> (reverse-lookup Pointer)  
    Associe une adresse IP à un nom de domaine.  
    Une recherche DNS inversée (*reverse DNS lookup*) consiste à chercher le nom de domaine associé à une adresse IP donnée — contrairement à une recherche DNS classique, qui consiste à chercher l'adresse IP associée à un nom de domaine. Pour que la requête inversée fonctionne, une entrée PTR doit être définie.

  * <ins>CERT</ins> (Certificate)  
    Stocke les certificats de chiffrement — PKIX, SPKI, PGP, etc

  * <ins>SRV</ins> (Service location)  
    Spécifie le nom d'hôte et port utilisé pour un service donné, comme MX mais pour d'autres protocoles de communication. Permet par exemple de donner à un client des informations portant sur des services LDAP ou XMPP.

  * <ins>LOC</ins> (geographical Location)  
    Donne des informations sur la position géographique du serveur: latitude, longitude, altitude au-dessus du niveau de la mer et précision de la position indiquée.

  * <ins>TXT</ins> (Text)  
    Contient des données textuelles, typiquement destinées à être lues par une machine. On peut par exemple avoir à créer une entrée TXT donnée pour prouver qu'on détient la propriété du nom de domaine pendant le processus d'obtention d'un certificat SSL.

  * <ins>SOA</ins> (Start Of Authority)  
    Indique le serveur de noms faisant autorité pour la zone DNS actuelle, les coordonnées de l'administrateur du domaine, le numéro de série du domaine et des information sur la fréquence de rafraîchissement des informations DNS pour cette zone.

[Liste des types d’enregistrements DNS](https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/dns-records/#c196100)

---

## Organisation du DNS

### Root Hints: liste des serveurs racine

* Au sommet de la hiérarchie DNS, on trouve la liste mondiale des serveurs racine.  
  Elle est gérée par l'IANA (*Internet Assigned Numbers Authority*),
  un département de l'ICANN (*Internet Corporation for Assigned Names and Numbers*).

  ``` txt
  .                        3600000      NS    A.ROOT-SERVERS.NET.
  A.ROOT-SERVERS.NET.      3600000      A     198.41.0.4
  A.ROOT-SERVERS.NET.      3600000      AAAA  2001:503:ba3e::2:30

  .                        3600000      NS    B.ROOT-SERVERS.NET.
  B.ROOT-SERVERS.NET.      3600000      A     199.9.14.201
  B.ROOT-SERVERS.NET.      3600000      AAAA  2001:500:200::b
  ...
  ```

  [Liste racine](https://www.iana.org/domains/root/servers)

* Les serveurs racine sont particuliers: ils ne sont pas facilement remplaçables  
  et les modifications qui y sont apportées doivent être stockées dans chaque résolveur du monde entier.

  En effet, le DNS ne fournit pas de mécanisme pour découvrir la liste des serveurs racine.  
  Il existe donc une liste d'adresses IP de serveurs racine bien définie et chaque résolveur DNS a cette liste d'adresses IP stockée en dur dans son logiciel.
  Si un serveur racine doit changer d'adresse (ce qui s'est produit à quelques reprises au fil des ans), les anciens résolveurs continuent de fonctionner en utilisant les autres adresses de serveur racine, jusqu'à ce qu'il y ait une mise à jour logicielle.

* On désigne souvent par *roots hints* ("indications de racine" en français) la liste des serveurs racine.

### Pourquoi 13 serveurs racine

* Des millions de serveurs peuvent effectuer des requêtes DNS à tout moment, les données doivent donc être envoyés de la manière la plus efficace possible. Idéalement, toutes les adresses IP de serveurs racine devraient tenir dans un seul paquet (datagramme), soit 512 octets.  
  Les concepteurs de DNS ont ainsi décidé qu'il y aurait 13 serveurs racine — une adresse IPv4 étant sur 32 bits, la liste prend (32×13=) 416 bits, ce qui laisse 96 bits pour les informations de protocole.

* Il y a 13 adresses IP et y avait à la base 13 serveurs racine.
  Aujourd'hui, derrière chaque adresse IP se cache une centaine de serveurs répartis dans le monde entier, qui utilisent le routage [anycast](https://www.netnod.se/dns/dns-anycast) — le serveur le plus proche avec cette adresse IP répondra à la requête.

  [Carte des serveurs racine](https://root-servers.org/)

* L'ICANN est responsable d'une des 13 adresses IP, et confie l'exploitation des autres à diverses organisations.  
  Au total, 12 organisations sont responsables des serveurs racine — VeriSign en gère 2.

  - A VeriSign Global Registry Services
  - B University of Southern California, Information Sciences Institute
  - C Cogent Communications
  - D University of Maryland
  - E NASA Ames Research Center
  - F Internet Systems Consortium, Inc.
  - G US DoD Network Information Center
  - H US Army Research Lab
  - I Netnod
  - J VeriSign Global Registry Services
  - K RIPE NCC
  - L ICANN
  - M WIDE Project

### Un serveur racine: liste des serveurs TLD

* Un *serveur racine* (*root server*) héberge la zone racine (*root zone*), qui contient la liste des tous les serveurs TLD.  
  Ex: A.ROOT-SERVERS.NET. (198.41.0.4) est un des serveurs de noms racine — il est géré par VeriSign.

  ``` txt
  xyz.      172800  IN  NS  x.nic.xyz.
  xyz.      172800  IN  NS  y.nic.xyz.
  xyz.      172800  IN  NS  z.nic.xyz.
  xyz.      172800  IN  NS  generationxyz.nic.xyz.
  xyz.      86400 IN  DS  3599 8 1 3FA3B264F45DB5F38BEDEAF1A88B76AA318C2C7F
  xyz.      86400 IN  DS  3599 8 2 B9733869BC84C86BB59D102BA5DA6B27B2088552332A39DCD54BC4E8D66B0499
  xyz.      86400 IN  RRSIG DS 8 1 86400 20230712190000 20230629180000 60955 . IADUdpUkAL98HbsQdZgnSdw5sguwPCXHsw75TNeEYIYnyp5dIQs+8XgxDxBqvx211Lvlk6mZt0G0Skz9T0xpfMEi3ENmzed17Bg0SkhK2igSdsF6bUvAO8gGzMtL6/R8tkzfbqNIqY5GunhVZaXstl8uF8FO15nr+nkvPlybWaMv1qB4kUctOxowF/VWtN6jQDPhUM8obCPDayNJz9dSJrLtT4jeSG2itG/dMiJeQooUMNN68d9agAvmNkmdka/CIp7odPds9xF6ghiAKgshObVRd1EVd3KyW4WG7VsLGfIEcuFHK9oMbp+ABzH9iyr/QMwvzt3ugBCn3KjXVmtAIA==
  xyz.      86400 IN  NSEC  yachts. NS DS RRSIG NSEC
  xyz.      86400 IN  RRSIG NSEC 8 1 86400 20230712190000 20230629180000 60955 . eWCxD9Quiky4IKo/wFko6UL05Z2ejwT3V7i2TO+pfbsGpdGQHrvZWODBxS5cRquCzYvQ34jPzlSMwj/Y5zomjwVsF2B/FxABgvXhqCSFRjY5uRCeInfpfMXHC57REdffrjnAp2ps0un6x5jj0IKOetS93sQS4ceudNXIUiVVuMwYdx65FEjUw1HhNUWG9l61nvWZQ5scy8ozSFckrryoHwuRDCuwHq1MxJwd5oT9+gM4DqfrLPG5AOr7rnh2sIktZWkmvFsu7x38gocf3LpGPYM+8KyvJPcJuki+lE3DnCOJLHsVBVpPg+y3/0N4Rtw8hlBOK95+QcPXQrPCYGJORw==
  generationxyz.nic.xyz.  172800  IN  A 212.18.249.42
  generationxyz.nic.xyz.  172800  IN  AAAA  2a04:2b00:13ff:0:0:0:0:42
  x.nic.xyz.    172800  IN  A 194.169.218.42
  x.nic.xyz.    172800  IN  AAAA  2001:67c:13cc:0:0:0:1:42
  y.nic.xyz.    172800  IN  A 185.24.64.42
  y.nic.xyz.    172800  IN  AAAA  2a04:2b00:13cc:0:0:0:1:42
  z.nic.xyz.    172800  IN  A 212.18.248.42
  z.nic.xyz.    172800  IN  AAAA  2a04:2b00:13ee:0:0:0:0:42
  ...
  ```

  [Root Zone](https://www.internic.net/domain/root.zone)

  [Root Zone Database](https://www.iana.org/domains/root/db)

* Tous les serveurs de nom racine contiennent la même information. La zone racine est directement gérée par l'IANA, qui la signe avec DNSSEC et l'envoit aux opérateurs de serveur racine pour qu'ils la publient sur leurs serveurs. Les opérateurs des serveurs racine publient la zone racine telle qu'elle est écrite et n'ont pas le droit d'en modifier le contenu.

### Un serveur TLD: liste des serveurs de référence

* Un *serveur TLD* héberge la zone TLD de son domaine, qui contient la liste de tous les noms de domaine associés au TLD du serveur.  
  Ex: x.nic.xyz (194.169.218.42) est un des serveurs de noms TLD du .xyz

* L'accès au fichiers zone des TLD est disponible via le *Centralized Zone Data Service (CZDS)* (service centralisé de données de zone) de l'ICANN, qui a été crée pour simplifier le processus de demande de données de zone.

  [How to access CZDS](https://czds.icann.org/help#how-access-data)

---

## Entrées DNS d'une zone TLD

### Registre: informations des noms de domaine

* Un *registre* (*registry*) est une base de données contenant les informations relatives aux titulaires des noms de domaine.

  Les données stockées dans la base de données du registre le sont selon son propre schéma de données, il n'existe pas de norme sur ce que le registre doit stocker et selon quel vocabulaire. Ce schéma de données est étroitement lié à la politique d'enregistrement du registre

* Les registres dits *épais* (la plupart le sont) publient des informations sur les utilisateurs: noms, coordonnées des titulaires et coordonnées des contacts techniques ou administratifs.

  Ces informations peuvent par exemple être utilisées par des ingénieurs réseaux pour résoudre un problème technique, ou permettre de contacter le titulaire d'un nom de domaine pour une société qui souhaiterait l'obtenir. 

* Récupérer les données de registre d'un nom de domaine se fait en général par protocole WHOIS.

  ```
  $ whois wikipedia.org
  ... Avertissement juridique ...
  Domain ID:D51687756-LROR
  Domain Name:WIKIPEDIA.ORG
  Created On:13-Jan-2001 00:12:14 UTC
  Last Updated On:09-May-2012 00:25:29 UTC
  Expiration Date:13-Jan-2016 00:12:14 UTC
  Sponsoring Registrar:MarkMonitor Inc. (R37-LROR)
  Status:CLIENT DELETE PROHIBITED
  Status:CLIENT TRANSFER PROHIBITED
  Status:CLIENT UPDATE PROHIBITED
  Registrant ID:mmr-116560
  Registrant Name:Domain Admin
  Registrant Organization:Wikimedia Foundation, Inc.
  Registrant Street1:149 New Montgomery Street
  Registrant Street2:Third Floor
  Registrant Street3:
  Registrant City:San Francisco
  Registrant State/Province:CA
  Registrant Postal Code:94105
  Registrant Country:US
  Registrant Phone:+1.4158396885
  Registrant Phone Ext.:
  Registrant FAX:+1.4158820495
  Registrant FAX Ext.:
  Registrant Email:dns-admin@wikimedia.org
  ...
  ```

### Opérateur de registre: gestion des noms de domaine

* L'ICANN contrôle quelles TLD peuvent être résolues par DNS via la zone racine. Pour chacune des TLD autorisées, l'ICANN a désigné une organisation comme gérant officiel du domaine, on appelle ces organisations des opérateurs de registre (*registry operators*).  
  On les appelle aussi couramment simplement *registre* ou *Network Information Center* (NIC).  
  Exemple: XYZ.COM LLC est l'opérateur de registre du .xyz

  [Registry operators des gTLD](https://www.icann.org/en/registry-agreements)

* Chacune de ces organisations maintient son registre, qui est la table de recherche officielle pour trouver des domaines sous ce TLD.

* Le rôle principal des opérateurs de registre est d'être en première ligne pour résoudre les litiges concernant les noms de domaine. Ces opérateurs peuvent également ajouter leurs propres conditions pour l'achat d'un de leurs domaine — par exemple, il faut être une école accréditée pour un obtenir un .edu. Enfin, ils définissent le prix de leur TLD.

  Notons que l'IANA gère directement le .int (pour les organisations intergouvernementales), .arpa (pour l'administration des protocoles) et d'autres zones critiques telles que root-servers.net. Le reste est délégué à d'autres.

  L'autorité en matière de domaines de premier niveau de code de pays (ccTLD) est donnée par l'IANA à des registres nationaux tels que DENIC en Allemagne, Nominet au Royaume-Uni et AFNIC en France.

* Un opérateur de registre conserve toutes les données administratives des domaines et génère un fichier de zone, qui contient les adresses des serveurs de noms de référence pour chaque domaine. Il peut également remplir le rôle de registraire ou déléguer cette fonction à d'autres entités.

### Registraire: vente des noms de domaine

* Un *regitraire* (*registrar*), aussi appelé bureau d’enregistrement ou fournisseur de nom de domaine, est une organisation qui gère et vend des noms de domaine disponibles sur internet. Il sert d'intermédiaire entre les organismes qui gèrent les noms de domaine, comme l'AFNIC pour le .fr, et les personnes souhaitant acheter un nom de domaine.  
  Ex: GoDaddy, namecheap

  ![](https://i.imgur.com/n2d2CLK.png)

* Si le registre (ex AFNIC) est l'entrepôt, le registraire est le magasin: c'est par lui que les utilisateurs finaux passent pour acquérir des produits disponibles dans l'entrepôt. Le registraire met en place les paiements récurrents de ses clients et doit transmettre les redevances aux registres et à l'ICANN.

  Un registraire peut vendre des domaines provenant de plusieurs opérateurs de registre différents. Ainsi si le .com n'est pas disponible, il peut suggérer d'autres terminaisons comme le .net

* Le registraire doit suivre les protocoles établis par l'ICANN pour s'assurer que les domaines sont disponibles et empêcher que le même domaine soit enregistré par deux personnes en même temps par l'intermédiaire de deux registraires différents.

  Le registraire (par exemple GoDaddy) se connectera à son installation avec le registraire (par exemple Verisgn), généralement via EPP, pour demander une mise à jour du registre, que le registraire effectuera ensuite sur ses serveurs DNS.

### Titulaire: propriétaire d'un nom de domaine

* Un *titulaire** (*registrant*) est une personne propriétaire d'un nom de domaine. Pour résumer, on a donc

  - le *registrant*: propriétaire d'un nom de domaine — la propriété du domaine est officialisée quand ses données sont ajoutés au *registry*
  - le *registry*: base de données des *registrants* et des noms de domaine détenus
  - le *registraire*: intermédiaire permettant au *registrant* d'acquérir un nom de domaine

[Registries, Registrars and Registrants: what's the difference?](https://www.namecheap.com/guru-guides/registries-registrars-and-registrants-what-is-the-difference-dp/)

### Serveur de référence: zone du domaine

* Un *serveur de référence* héberge les entrées DNS d'un nom de domaine. Les serveurs TLD associent le nom de domaine à l'adresse de ce serveur de référence.

* L’achat d’un nom de domaine vous autorise à contrôler la zone DNS de ce nom, par exemple à diriger le nom www.example.com vers l'adresse IP de votre site web.

  Le registraire peut utiliser ses propres serveurs de nom pour héberger votre zone DNS, ou vous autoriser à spécifier d’autres serveurs de noms.

---

## DNSSEC

* Lorsqu'un résolveur récursif envoie une requête à un serveur de noms faisant autorité, il n'a aucun moyen de vérifier l'authenticité de la réponse — il peut seulement vérifier que la réponse semble provenir de la même adresse IP que celle à laquelle il a envoyé la requête initiale, mais l'adresse IP source d'une réponse peut être facilement falsifiée.

  Si un pirate envoie une réponse DNS falsifiée qui est acceptée par un résolveur récursif, la mémoire cache du résolveur devient empoisonnée. Le résolveur renverra alors les données DNS frauduleuses aux appareils qui le demandent et un utilisateur peut être dirigé vers un autre site s'en qu'il ne s'en rende compte.

* Pour parer ce problème, DNSSEC (*Domain Name System Security Extensions*) a été crée. Avec DNSSEC, ce ne sont pas les requêtes ou réponses qui sont signées cryptographiquement, mais les données DNS elles-mêmes qui sont signées par le propriétaire de la zone.

  Chaque zone DNS possède une paire de clés publique/privée. La clé publique est publiée dans la zone elle-même (entrée DNS DNSKEY) et peut-être consultée par n'importe qui. La clé privée est utilisée pour signer les données DNS dans la zone et générer des signatures numériques (entrée DNS RRSIG) sur ces données.

* Tout résolveur récursif qui recherche des données dans la zone récupère également la clé publique et l'utilise pour valider l'authenticité des données DNS. Si la signature n'est pas valide, le résolveur suppose qu'il s'agit d'une attaque et renvoie une erreur à l'utilisatuer.

  [Comment fonctionne DNSSEC](https://www.cloudflare.com/fr-fr/dns/dnssec/how-dnssec-works/)

## DNS Round-Robin

* Lorsqu'un service génère un trafic important, celui-ci peut faire appel à la technique du DNS Round-Robin (tourniquet DNS), une des techniques de répartition de charge qui consiste à associer plusieurs adresses IP à un FQDN. Les différentes versions de Wikipedia, comme fr.wikipedia.org par exemple, sont associées à plusieurs adresses IP : 207.142.131.235, 207.142.131.236, 207.142.131.245, 207.142.131.246, 207.142.131.247 et 207.142.131.248.

* L'ordre dans lequel ces adresses sont renvoyées sera modifié d'une requête à la suivante. Une rotation circulaire entre ces différentes adresses permet ainsi de répartir la charge générée par ce trafic important entre les différentes machines ayant ces adresses IP. Il faut cependant nuancer cette répartition car elle n'a lieu qu'à la résolution du nom d'hôte et reste par la suite en cache sur les différents resolvers (client DNS).

  [DNS Round-Robin](https://fr.wikipedia.org/wiki/DNS_round-robin)
