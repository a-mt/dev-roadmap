---
title: Notions de base
category: Linux, Network
---

## Liaison

* Pour faire transiter les données d'un ordinateur, on peut utiliser 3 types de supports physiques:

  - des courants électriques, qui passent par un câble métallique
  - des signaux luminaux, qui passent par un câble optique
  - des ondes radio, qui circulent dans l'air

  ![](https://i.imgur.com/mX5XHWl.gif)

## Protocole

* Pour pouvoir communiquer, les différents systèmes doivent faire transiter les données en respectant un format commun et un ensemble de règles données. C'est ce qu'on appelle un *protocole*. Par exemple, 1/ bonjour, comment ça va? 2/ bien et toi? 3/ bien, [début de conversation]... pourrait être vu comme le protocole pour démarrer une conversation.

## Réseau informatique

* Un *réseau informatique* (*computer network* en anglais) est un ensemble de systèmes informatiques (par exemple des ordinateurs, imprimantes ou appareils médicaux), reliés entre eux pour échanger des ressources, dont notamment:
  - des données — emails, fichiers, applications
  - des services — prendre une mesure, une photo
  - de la puissance de calcul

## Normes internationales

* Si on veut qu'il soit possible de communiquer et commercer à grande échelle, et même à l'internationale, il est nécessaire que tous respectent les mêmes formats et protocoles. Exemple: le format d’une carte bancaire (longueur, largeur, épaisseur, position de la bande magnétique, etc.), le format des données, le protocole des échanges entre le lecteur et la banque....

  On trouvera donc des spécifications concernant
  - les câbles et connecteurs
  - le format des données
  - les protocoles pour transmettre ces données

* Les réseaux informatiques recoupant divers métiers et exigences techniques, il existe plusieurs organisations internationales de normalisation, les principales étant:

  - l'ISO (*International Standardisation Organisation*)
  - l'ITU (*International Telecommunication Union*)
  - l'IEEE (*Institute of Electronical and Electronics Engineers*) — prononcer I-3-E
  - l'IETF (*Internet Engineering Task Force*)

* Citons également les agences de réglementation françaises, qui définissant les droits et obligations des systèmes informatiques en France:

  - l'ARCEP (*Agence de Régulation des Communications Électroniques et de la Poste*)
  - la CNIL (*Commission Nationale Informatique et Libertés*)

---

## Principe d'empilement protocolaire

* Il importe peu pour un navigateur web de savoir si les données passent par une connexion filaire ou sans-fil. Pour maximiser l'interopérabilité des systèmes, les protocoles des applications (HTTP, FTP, etc) ne s'occupent pas de la partie transmission mais uniquement de la partie données:

    Le protocole HTTP (*Hypertext Transfer Protocol*) par exemple, définit l'organisation des pages web de manière à être compréhensible par les navigateurs web. Il ne spécifie pas comment le navigateur se connecte au serveur, à la place il passe le relais à un autre protocole — de plus bas niveau

    Ainsi HTTP va être encapsulé par un autre protocole: TCP (*Transmission Control Protocol*), qui lui s'occupe la partie transmission. TCP lui-même va être encapsulé par un autre protocole: IP (*Internet Protocol*), qui lui s'occupe de la partie adressage du destinataire / expéditeur.

    ![](https://i.imgur.com/TblwjyA.jpg)

* Les données de chaque protocole ne sont pas modifiées, chaque couche vient simplement ajouter des informations avant ou après — un peu comme si on mettait une lettre dans boîte, et la boîte dans un carton avant de l'envoyer.  
    À la réception, ces opérations sont effectuées dans l'ordre inverse, ce qui permet in-fine à l'application distante de récupérer les données qui lui sont destinées.  
    Ainsi la couche application n'a pas besoin de savoir comment communiquer directement avec la couche physique: chaque couche n'a qu'à savoir comment communiquer avec la couche au-dessus et en dessous.

    ![](https://i.imgur.com/Pu3Arpx.png)

* Lorsque les données passent d'une couche à une autre couche de niveau inférieur: 1/ Des données sont ajoutés au début des blocs de données en plus des données proprement dites: on appelle ces données des *headers*. 2/ Le conditionnement des données à chaque couche est connu sous le nom d'*encapsulation des données*.  

  Lorsque le destinataire reçoit les données, chaque header est lu au fur et à mesure que les données passent de la couche inférieure à la couche supérieure, et est utilisé pour décompresser les données et les envoyer à l'endroit approprié — la bonne interface, la bonne application. Ce processus, inverse à l'encapsulation, est la *désencapsulation*.

## Le concept: modèle OSI

* Le modèle OSI (*Open Systems Interconnection model*) est un modèle conceptuel qui décrit la manière dont les couches protocolaires sont découpées.
  Il a été crée pour normaliser le language utilisé pour décrire les protocoles de réseau et définit la manière dont les systèmes communiquent entre eux — en utilisant des couches d'abstraction.

  Chaque couche communique avec la couche directement supérieure et inférieure.  
  Toutes les couches décrites par le modèle OSI ne sont pas forcemment utilisées pour tous les protocoles.

* Les couches du modèles OSI sont:

    * **7/ Application**  
      Couche qui s'occupe de la communication au niveau du programme.

    * **6/ Presentation**  
      Exécute des fonctions de conversions des données si nécessaire.

    * **5/ Session**  
      Établit et maintient les canaux de communication.

    * **4/ Transport**  
      Gère la transmission de bout en bout et l'intégrité des données transmises:  
      - Établit une connexion entre les applications puis la ferme à l'issue de la transaction
      - Découpe les données en *segments* de taille uniforme (afin de fluidifier la transmission) et les numérote
      - Vérifie que tous les segments ont bien été reçus et les ré-émet en cas de perte

    * **3/ Network**  
      Route les données d'un système à un autre.  
      Ajoute une entête à chaque segment, contenant entre autres l'adresse IP de l'émetteur et celle du destinataire dans le cas du protocole IP.

    * **2/ Data link**  
      Gère le transfert physique des données d'un système à un autre.  
      Ajoute sa propre entête, contenant entre autres l'adresse MAC de la machine émettrice et l'adresse MAC de la machine réceptrice sur le réseau local — ou l'adresse MAC du routeur si le paquet doit être envoyé sur Internet.

    * **1/ Physical**  
      Gère la transmission et la réception des données sur le support physique.

    Mnémotechnique: All People Seem To Need Delicious Pizza

    ![](https://i.imgur.com/5wSC9Gc.png)

## La pratique: modèle TCP/IP

* Internet a simplifié l'architecture décrite par le modèle OSI: on retrouve moins de couches et les numéros ne sont pas contigus. Puisqu'historiquement on classe les protocoles des applications dans la couche 7, la couche "application" est toujours considérée étant dans la couche 7, mais la couche suivante utilisée est la couche 4 — il y a donc un saut dans la numérotation.

    Le modèle qui en résulte est communément appelé le *modèle TCP/IP* puisque les protocoles de base sont TCP et IP, mais ce ne sont pas les seuls protocoles possibles de ce modèle.

    ![](https://i.imgur.com/ayNshPG.png)

    Le modèle TCP/IP peut être considéré comme un sous-ensemble du modèle OSI.

* Les couches du modèle TCP/IP:

    * 1/ Physique  
      La couche 1 s'occupe de la modulation du signal binaire sur un support physique particulier (fibre optique, paire de cuivre, onde radio).

    * 2/ Data Link  
      La couche 2 regroupe les mécanismes qui permettent de structurer les données sous forme de blocs de taille finie (des *trames*) et de définir les méthodes d’accès — c'est à dire quand l’équipement peut émettre, ainsi que les formats des adresses utilisées pour identifier les équipements. Ethernet ou Wi-Fi sont des exemples de protocoles de niveau 2 (qui intègrent leur niveau 1).

        Plusieurs organismes standardisent des protocoles pour ce niveau:
        * l'IEEE (*Institute of Electrical and Electronics Engineers*)  
          pour les réseaux comme Ethernet pour les réseaux filaires, Wi-Fi ou Bluetooth pour les réseau radio
        * le 3GPP (*3rd Generation Partnership Project*)  
          pour les protocoles qu'on retrouve dans les téléphones portables (4G, 5G).

    * 3/ Network  
      Le couche 3 est occupée par le protocole IP, standardisé par l'IETF. Il permet de construire un réseau mondial uniforme qui cache les spécificités des protocoles de niveau 2. IP définit les règles d'adressage et de routage, c'est à dire comment trouver un chemin dans le réseau pour qu'en recopiant l'information de noeud en noeud, on atteigne la bonne destination.

        Les concepteurs d'internet insistent sur le fait que les protocoles en couche 3, donc IP (*Internet Protocol*), joue un rôle central et doit avoir une interaction limitée avec aussi bien les couches basses que les protocoles de niveau supérieur. IP propose simplement une abstraction des moyens de communication aux couches applicatives, s’adaptant à tout moyen de communication et rendant l’accès au réseau et l’adressage universels. Le traitement dans les routeurs (équipements chargés d’aiguiller l’information dans le réseau) doit être le plus rapide possible pour traiter un maximum de paquets par seconde. De plus, IP ne spécialise pas le réseau pour un service ou un autre: il ne fait que diriger les paquets vers la bonne destination. Le réseau Internet est un réseau mondial construit autour de ce protocole permettant d'atteindre potentiellement tous les équipements qui y sont connectés.

    * 4/ Transport  
      La couche 4 est constituée de deux protocoles, TCP et UDP, qui ont mis en oeuvre dans les équipements d'extrémités. Là où IP permet de trouver une machine sur le réseau, les protocoles de niveau 4 permettent de trouver une application qui tourne sur la machine cible.
        Les "adresses" de ces applications sont des numéros compris entre 1 et 65535 appelés *ports*. Par exemple, les serveurs Web utilisent typiquement le port numéro 80 ou le numéro 443.

        Le protocole TCP (*Transmission Control Protocol*) est complexe et demande beaucoup de mémoire. Il contrôle ce qui se passe sur le réseau: il va surveiller les données transférées et sera capable de retransmettre des données perdues, ou encore ralentir ou accélérer le transfert de données s’il détecte une saturation du réseau.

        Dans les cas simples, UDP (*User Datagram Protocol*) est préféré. Il n'apporte pas de traitement supplémentaire et se contente d'aiguiller les données vers la bonne application sans aucun contrôle. Contrairement à TCP, il ne garantit pas la livraison des données et ne corrige pas l'ordre des paquets s'ils arrivent dans le désordre.  
        Si vous avez déjà appelé quelqu'un par le biais d'Internet et rencontré des parasites ou des brèves interruptions de son, c'est principalement dû à UDP: ici, on ne recherche pas la perfection, il s'agit uniquement d'être rapide.

    * 7/ Application  
      Enfin la couche 7 est celle des protocoles des applications. Ils sont très nombreux mais le plus répandu est HTTP (*Hypertext Transfer Protocol*), protocole qui sert à transporter des pages web et permet également des communications directes entre ordinateurs. Comme HTTP repose sur TCP, ces deux protocoles sont dominants sur le réseau.

    ![](https://i.imgur.com/uvGhhL5.png)

* Les 3 premiers niveaux sont mis en oeuvre dans les noeuds d'interconnexion (commutateurs, routeurs, etc) tandis que le système d'exploitation intervient à partir du niveau 4.

---

## Techniques de transfert

* Historiquement, 3 grands types de transfert ont été utilisés dans les réseaux.  
  Tous reposent sur la *commutation*, qui consiste à transférer un signal d'une ligne à l'autre

### Message switching

* La *commutation de message* (*message switching*)
  était utilisé dans les réseaux télégraphiques, une technologie de communication dominante au début du 20ème siècle.

  Le principe du télégraphe est simple: un message donné est transformé en une séquence d'impulsions électriques en utilisant un appareil appelé une *clef de télégraphe* (*telegraph key* en anglais).

  ![](https://i.imgur.com/LlXxy7B.png)

  Pour encoder le message en signal électrique, différents formats sont possibles, mais le plus répandu est le code Morse: chaque lettre est une série de points et de tirets, où chaque point représente une pression courte et chaque tiret une pression longue.

  ![](https://i.imgur.com/r6V0gJj.png)

  Ces impulsions électriques sont transmises sur de longues distances par un câble électrique. Une fois arrivé à destination, le signal électrique actionne un levier grâce à un électro-aimant, ce qui imprime sur une feuille de papier le temps que dure l'impulsion électrique — un point ou un trait. Le récepteur peut ensuite décoder la série de tirets et de points en message compréhensible par l'humain.

* Compte tenu qu'on veut d'une part pouvoir envoyer des messages à différents endroits du monde, et d'autre part que le signal s'atténue sur de longues distances, des noeuds intermédiaires sont utilisés.

  À chaque point de commutation, l'ensemble du message est stocké, le chemin de sortie est sélectionné, puis transmis sur cette ligne. Cette sélection est entièrement décidée par l'opérateur du centre de commutation, manuellement, en fonction de la destination du message — indiqué par un code ZIP ou PIN au début du message.

  ![](https://i.imgur.com/7482EWY.png)

* La commutation de message repose ainsi sur une technique de *store and forward*: la retransmission après décodage du message entier. Le message est stocké à chaque point de commutation, avant de sélectionner la prochaine destination et lui transmettre le message, et ainsi de suite jusqu'à ce que le message atteigne sa destination.

### Circuit switching

* Le *commutation de circuit* (*circuit switching*) était utilisé dans les réseaux téléphoniques.

  Le principe du téléphone est un peu différent du télégraphe:
  1. une personne parle dans un microphone
  2. ce microphone convertit le son en un signal électrique
  3. le signal est transmis par un câble électrique à un haut-parleur
  4. le haut-parleur convertit le signal électrique en son, produisant ainsi la voix de la personne qui parle au microphone à l'autre bout

  ![](https://i.imgur.com/wws7GQs.png)

  En cours de route, un amplificateur est incorporé pour augmenter l'amplitude du son et contre-carrer l'atténuation du signal.

  ![](https://i.imgur.com/CUogi9M.png)

* Avec l'arrivée du téléphone, les réseaux télégraphiques existants ont été exploités pour désormais transmettre le son sous forme d'électricité.

  Pour établir une liaison téléphonique, il fallait ajouter un câble entre le domicile du particulier (jusqu'à son téléphone) et la companie de téléphone. La companie de téléphone allouait un numéro de téléphone, unique à chaque particulier, et structuré hiérarchiquement (région/commune/etc): en examinant un numéro de téléphone, l'entreprise pouvait savoir où se trouvait le téléphone.

  Pour joindre quelqu'un, il fallait composer son numéro. Les noeuds intermédiaires, appelés *centraux téléphoniques*, établissaient une connexion en fonction de ce numéro. Dans un premier temps, ce processus de connexion était effectué par des opérateurs humains, en branchant manuellement les câbles. Ce processus a ensuite été automatisé avec des équipements de commutation dans les centraux téléphoniques.

  Une fois la connexion établie, la personne A entend la tonalité (*dial tone*) et la personne B entend la sonnerie (*ring tone*). Lorsque B répond au téléphone, ils disposent d'une connexion full duplex (une connexion avec des informations envoyées dans les deux sens) en temps réel.

  ![](https://i.imgur.com/iws294f.png)

* La commutation de circuit repose ainsi sur une technique de *pre-allocation*: une connexion directe est établie entre les deux points. Peu importe que les interlocuteurs parlent beaucoup ou pas du tout, les companies de téléphone facturent à la durée, et la connexion reste active tant que l'un des deux interlocuteurs n'a pas raccroché.

* Il vous est peut-être arrivé d'entendre ce message quand vous voulez téléphoner: "toutes les lignes sont occupées, veuillez réssayer plus tard". C'est ce qui arrive lorsque la companie téléphonique a établit autant de circuits dédiés qu'elle le pouvait: pour fournir une nouvelle connexion il faut d'abord qu'une ligne existante soit libérée.

### Packet switching

* La *commutation de paquets* (*packet switching*) est utilisé dans les réseaux informatiques.

  Les télégraphes et les systèmes informatiques sont similaires dans leur manière de coder les données: ils utilisent tous deux des états binaires pour représenter l'information. Dans le cas des télégraphes, il s'agit d'impulsions courtes ou longues, représentées par des points et des tirets. Dans le cas de l'informatique, il s'agit de la présence ou de l'absence d'un signal (ou signal au-dessus d'un certain seul), représentés par des 1 et des 0.

  L'avantage de cette approche, c'est qu'elle peut voyager sous diverses formes: des ondes électriques, optiques ou électromagnétiques (sans-fil). Le type de signal utilisé dépend de l'interface utilisée: si on est connecté par wifi au réseau, l'ordinateur modulera le signal numérique en une onde électromagnétique; si on est connecté par Ethernet, l'ordinateur enverra des signaux électriques.

  ![](https://i.imgur.com/CCCFCV1.png)

  Pour encoder les messages en 0 et 1, le premier standard utilisé était l'ASCII (*American Standard Code for Information Interchange*). Bien que l'ASCII contienne plus de lettres que le Morse, avec notamment des caractères de ponctuation, il reste limité à l'alphabet anglais. Aujourd'hui, on préfère généralement Unicode, un encodage pouvant représenter presque tous les alphabets au monde.

  ![](https://i.imgur.com/54OaOWt.png)

  Là où le télégraphe utilisait des adresses géographiques, et le téléphone des numéros hiérarchiques, l'informatique utilise des adresses IP pour désigner la destination d'un message.

* Si Alice veut communiquer avec Bob: Alice prépare son message et avant d'envoyer ce message, des entêtes son ajoutées: l'adresse IP de Bob comme destinataire et l'adresse IP d'Alice comme source. Le tout (message + entêtes) constitue un *paquet IP*. Ce paquet est envoyé à un premier noeud intermédiaire du réseau, appelé un *routeur*.

  Le routeur lit l'adresse IP de destination et choisit la direction dans laquelle il doit envoyer le message. Le routeur suivant fait la même chose, et ainsi de suite, jusqu'à ce que le message arrive à sa destination.

  ![](https://i.imgur.com/ggU2RWg.png)

  Note: Les réseaux informatiques disposent de plusieurs protocoles de routage pour sélectionner le chemin à prendre. Il est également possible de définir ces routes manuellement, dans les configurations du routeur. Dans l'exemple précédent on utilise le deuxième cas pour plus de simplicité, bien que dans la vraie vie la sélection du chemin est dans la plupart des cas dynamique.

* Un autre concept important de la commutation de paquet, est la segmentation des données:

  Si Alice veut transmettre un fichier de 10MB (environ 83 886 Kbits) sur un réseau de 56 Kbits/s, le transfert prendrait environ 1498 secondes, soit presque 25 minutes. Si le fichier est envoyé en un seul message, alors pendant 25 minutes la connexion entre Alice et Bob serait occupée et n'accepterait rien d'autre sur cette ligne tant que le transfert n'est pas terminé — et si cette ligne est interrompue, la transmission échoue. C'est exactement le type de problème qu'on rencontre avec la commutation de circuit, et dont on veut se débarrasser avec la commutation de paquets.

  Pour résoudre ce problème, la taille d'un paquet est limitée (c'est le paramètre *maximum segment size*). Si on suppose que la taille d'un paquet est limitée de 150 bits, alors le fichier va être divisé en 6991 paquets, qui seront envoyés les uns après les autres. Pendant ce temps, Alice peut toujours utiliser le réseau pour d'autres applications.

* Pour éviter de surcharger des lignes, toutes les données ne vont pas être envoyées sur la même liaison.
  Et comme les paquets peuvent prendre différentes routes, ils peuvent atteindre leur destination dans le désordre.

  Si les paquets sont mis bout à bout dans le mauvais ordre, alors le fichier construit ne sera pas bon.
  Pour y remédier, des protocoles orientés connexion ont été conçus, comme TCP: TCP ajoute un numéro (paramètre *sequence number*) dans les entêtes. Les paquets sont stockés dans la mémoire de la carte réseau (*high-speed memory buffers*, aussi appelé *TX and RX buffers* ou encore *tampons de transmission et de réception* en français), qui se charge de d'altérer et restaurer les paquets dans le bon ordre.

* Ainsi la commutation de paquets repose 1. sur la décomposition des messages en paquets de taille limitée, un travail travail géré aux extrémités (c'est à dire les ordinateurs source et destination) et 2. le *cut and through*: la retransmission à la volée, après décodage de l'adresse de destination, un travail géré par les appareils réseaux

