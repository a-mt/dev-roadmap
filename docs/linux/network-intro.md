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

## Réseau informatique

* Un ensemble d'appareils reliés entre eux (par exemple des ordinateurs, imprimantes, appareils médicaux, etc) consistuent un *réseau informatique* (*computer network* en anglais). Connecter plusieurs appareils, autrement dit constituer un réseau, permet de partager des informations et des ressources, par exemple

  - des données: emails, fichiers, applications
  - des services: prendre une mesure, une photo
  - de la puissance de calcul

* Tout appareil ou système connecté au réseau et pouvant envoyer, recevoir ou transférer des données est aussi appelé un *noeud réseau* (ou juste noeud, *node* en anglais). 

  ![](https://i.imgur.com/XX4dI1Pm.png)

## Protocole

* Un *protocole* est un ensemble de règles qui explicite le format et le traitement de données que les différents systèmes doivent utiliser pour faire transiter les données. Par exemple, 1/ bonjour, comment ça va? 2/ bien et toi? 3/ bien, [début de conversation]... pourrait être vu comme le protocole pour démarrer une conversation.

## Normes internationales

* Si on veut qu'il soit possible de communiquer et commercer à grande échelle, et même à l'internationale, il est nécessaire que tous respectent les mêmes formats et protocoles, et pour que tout le monde soit d'accord, des organisations internationales officiellement reconnues (/ consortium) se chargent de les définir.  
  Exemple: le format d’une carte bancaire (longueur, largeur, épaisseur, position de la bande magnétique, etc.), le format des données, le protocole des échanges entre le lecteur et la banque....

  On trouvera donc des spécifications, c'est à dire des documents dans lesquels tous les détails sont explicités, pour standardiser

  - les câbles et connecteurs
  - le format des données
  - les protocoles pour transmettre ces données

* Les réseaux informatiques recoupant divers métiers et exigences techniques, il existe plusieurs organisations internationales de normalisation, les principales étant:

  - l'ISO (*International Standardisation Organisation*)
  - l'ITU (*International Telecommunication Union*)
  - l'IEEE (*Institute of Electronical and Electronics Engineers*) — prononcer I-3-E
  - l'IETF (*Internet Engineering Task Force*)

* Citons également les agences de réglementation françaises, qui définissent les droits et obligations des systèmes informatiques en France:

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

* Lorsque les données passent à une couche de niveau inférieur, des données supplémentaires sont ajoutés au début du bloc de données. Ces données supplémentaires sont appelés des *headers*, et le processus d'ajout des headers est connu sous le nom d'*encapsulation des données*.

  Lorsque le destinataire reçoit les données, chaque header est lu au fur et à mesure que les données passent de la couche inférieure à la couche supérieure, et est utilisé pour décompresser les données et les envoyer à l'endroit approprié — la bonne interface, la bonne application. Ce processus, inverse à l'encapsulation, est la *désencapsulation*.

## Le concept: modèle OSI

* Le modèle OSI (*Open Systems Interconnection model*) est un modèle conceptuel qui décrit la manière dont les couches protocolaires sont découpées.
  Il a été crée pour normaliser le language utilisé pour décrire les protocoles de réseau et définit la manière dont les systèmes communiquent entre eux — en utilisant des couches d'abstraction.

  Chaque couche communique avec la couche directement supérieure et inférieure.  
  Toutes les couches décrites par le modèle OSI ne sont pas forcemment utilisées pour tous les protocoles.

* Les couches du modèles OSI sont:

    * **7/ Application**  
      Couche qui s'occupe de la communication au niveau du programme.

    * **6/ Présentation**  
      Exécute des fonctions de conversions des données si nécessaire.

    * **5/ Session**  
      Établit et maintient les canaux de communication.

    * **4/ Transport**  
      Gère la transmission de bout en bout et l'intégrité des données transmises:  
      - Établit une connexion entre les applications puis la ferme à l'issue de la transaction
      - Découpe les données en *segments* de taille uniforme (afin de fluidifier la transmission) et les numérote
      - Vérifie que tous les segments ont bien été reçus et les ré-émet en cas de perte

    * **3/ Réseau** (network)  
      Route les données d'un système à un autre.  
      Ajoute une entête à chaque segment, contenant entre autres l'adresse IP de l'émetteur et celle du destinataire dans le cas du protocole IP.

    * **2/ Liaison** (data link)  
      Gère le transfert physique des données d'un système à un autre.  
      Ajoute sa propre entête, contenant entre autres l'adresse MAC de la machine émettrice et l'adresse MAC de la machine réceptrice sur le réseau local — ou l'adresse MAC du routeur si le paquet doit être envoyé sur Internet.

    * **1/ Physique** (physical)  
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
      Le couche 3 est occupée par le protocole IP (*Internet Protocol*), standardisé par l'IETF. Il permet de construire un réseau mondial uniforme qui cache les spécificités des protocoles de niveau 2. IP définit les règles d'adressage et de routage, c'est à dire comment trouver un chemin dans le réseau pour qu'en recopiant l'information de noeud en noeud, on atteigne la bonne destination.

        Le traitement dans les routeurs (équipements chargés d’aiguiller l’information dans le réseau) doit être le plus rapide possible pour traiter un maximum de paquets par seconde. 
        Les concepteurs d'internet insistent sur le fait que les protocoles en couche 3, donc le protocole IP, joue un rôle central et doit avoir une interaction limitée avec aussi bien les couches basses que les protocoles de niveau supérieur: IP ne spécialise pas le réseau pour un service ou un autre, il ne fait que diriger les paquets vers la bonne destination. 

    * 4/ Transport  
      La couche 4 est constituée de deux protocoles, TCP et UDP, tout deux mis en oeuvre dans les équipements d'extrémités. Là où IP permet de trouver une machine sur le réseau, les protocoles de niveau 4 permettent de trouver une application qui tourne sur la machine cible.
        Les "adresses" de ces applications sont des numéros compris entre 1 et 65535 appelés *ports*. Par exemple, les serveurs Web utilisent typiquement le port numéro 80 (pour HTTP) ou le numéro 443 (pour HTTPS).

        Le protocole TCP (*Transmission Control Protocol*) est complexe et demande beaucoup de mémoire. Il contrôle ce qui se passe sur le réseau: il va surveiller les données transférées et sera capable de retransmettre des données perdues, ou encore ralentir ou accélérer le transfert de données s’il détecte une saturation du réseau.

        Dans les cas simples, UDP (*User Datagram Protocol*) est préféré. Il n'apporte pas de traitement supplémentaire et se contente d'aiguiller les données vers la bonne application sans aucun contrôle. Contrairement à TCP, il ne garantit pas la livraison des données et ne corrige pas l'ordre des paquets s'ils arrivent dans le désordre.  
        Si vous avez déjà appelé quelqu'un par le biais d'Internet et rencontré des parasites ou des brèves interruptions de son, c'est principalement dû à UDP: ici, on ne recherche pas la perfection, il s'agit uniquement d'être rapide.

    * 7/ Application  
      Enfin la couche 7 est celle des protocoles des applications. Ils sont très nombreux mais le plus répandu est HTTP (*Hypertext Transfer Protocol*), protocole qui sert à transmettre des pages web et permet également des communications directes entre ordinateurs. Comme HTTP repose sur TCP, ces deux protocoles sont dominants sur le réseau.

    ![](https://i.imgur.com/uvGhhL5.png)

* Les 3 premiers niveaux sont mis en oeuvre dans les noeuds d'interconnexion (commutateurs, routeurs, etc) tandis que le système d'exploitation intervient à partir du niveau 4.

---

## Techniques de transfert

* Pour transférer un signal d'un point A à un point B, on ne va pas utiliser un seul câble de plusieurs kilomètres qui relie directement ces deux points. On utilise plutôt la *commutation*, c'est à dire le transfert d'un signal de lignes en lignes. Historiquement, 3 différentes approches ont été utilisés dans les réseaux pour commuter les signaux: la commutation de message, la commutation de circuit et la commutation de paquet.

### Message switching

* La *commutation de message* (*message switching*)
  était utilisé dans les réseaux télégraphiques, une technologie de communication dominante au début du 20ème siècle.

* Le principe du télégraphe est simple: un message donné est transformé en une séquence d'impulsions électriques en utilisant un appareil appelé une *clef de télégraphe* (*telegraph key* en anglais).

  ![](https://i.imgur.com/LlXxy7B.png)

  Pour encoder le message en signal électrique, différents formats sont possibles, mais le plus répandu est le code Morse: chaque lettre est une série de points et de tirets, où chaque point représente une pression courte et chaque tiret une pression longue.

  ![](https://i.imgur.com/r6V0gJj.png)

  Ces impulsions électriques sont transmises par un câble électrique. Une fois arrivé à destination, le signal électrique actionne un levier grâce à un électro-aimant, ce qui imprime sur une feuille de papier le temps que dure l'impulsion électrique — un point ou un trait. Le récepteur peut ensuite décoder la série de tirets et de points en message compréhensible par l'humain.

* Compte tenu qu'on veut d'une part pouvoir envoyer des messages à différents endroits du monde, et d'autre part que le signal s'atténue sur de longues distances, des noeuds intermédiaires sont utilisés.

  À chaque point de commutation, l'ensemble du message est stocké, le chemin de sortie est sélectionné, puis transmis sur cette ligne. Cette sélection est entièrement décidée par l'opérateur du centre de commutation, manuellement, en fonction de la destination du message — indiqué par un code ZIP ou PIN au début du message.

  ![](https://i.imgur.com/7482EWY.png)

* La commutation de message repose ainsi sur une technique de *store and forward*: la retransmission après décodage du message entier. Le message est stocké à chaque point de commutation, avant de sélectionner la prochaine destination et lui transmettre le message, et ainsi de suite jusqu'à ce que le message atteigne sa destination.

### Circuit switching

* Le *commutation de circuit* (*circuit switching*) était utilisé dans les réseaux téléphoniques.

* Le principe du téléphone est un peu différent du télégraphe:
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

* La commutation de circuit repose sur une technique de *pre-allocation*: une connexion directe est établie entre les deux points en "réservant" des lignes du réseau. Peu importe que les interlocuteurs parlent beaucoup ou pas du tout, les lignes sont occupées et la connexion reste active tant que l'un des deux interlocuteurs n'a pas raccroché — les companies de téléphone vont facturer à la durée.

* Il vous est peut-être arrivé d'entendre ce message quand vous voulez téléphoner: "toutes les lignes sont occupées, veuillez réssayer plus tard". C'est ce qui arrive lorsque la companie téléphonique a établit autant de circuits dédiés qu'elle le pouvait: pour fournir une nouvelle connexion il faut d'abord qu'une ligne existante soit libérée.

### Packet switching

* La *commutation de paquets* (*packet switching*) est utilisé dans les réseaux informatiques.

* Les télégraphes et les systèmes informatiques sont similaires dans leur manière de coder les données: ils utilisent tous deux des états binaires pour représenter l'information. Dans le cas des télégraphes, il s'agit d'impulsions courtes ou longues, représentées par des points et des tirets. Dans le cas de l'informatique, il s'agit de la présence ou de l'absence d'un signal (ou signal au-dessus / au-dessous d'un certain seul), représentés par des 1 et des 0.

  L'avantage de cette approche, c'est qu'elle peut voyager sous diverses formes: des ondes électriques, optiques ou électromagnétiques (sans-fil). Le type de signal utilisé dépend de l'interface utilisée: si on est connecté par wifi au réseau, l'ordinateur modulera le signal numérique en une onde électromagnétique; si on est connecté par Ethernet, l'ordinateur enverra des signaux électriques.

  ![](https://i.imgur.com/CCCFCV1.png)

  Pour encoder les messages en 0 et 1, le premier standard utilisé était l'ASCII (*American Standard Code for Information Interchange*). Bien que l'ASCII contienne plus de lettres que le Morse, avec notamment des caractères de ponctuation, il reste limité à l'alphabet anglais. Aujourd'hui, on préfère généralement Unicode, un encodage pouvant représenter presque tous les alphabets au monde.

  ![](https://i.imgur.com/54OaOWt.png)

  Là où le télégraphe utilisait des adresses géographiques, et le téléphone des numéros hiérarchiques, l'informatique utilise des adresses IP pour désigner la destination d'un message.

* Si Alice veut communiquer avec Bob, Alice prépare son message en amont: avant d'envoyer le message, des headers son ajoutés avec l'adresse IP de Bob comme destinataire et l'adresse IP d'Alice comme source. Le tout (message + headers) constitue un *paquet IP*. Ce paquet est envoyé à un premier noeud intermédiaire du réseau, appelé un *routeur*.

  Le routeur lit l'adresse IP de destination et choisit la direction dans laquelle il doit envoyer le message. Le routeur suivant fait la même chose, et ainsi de suite, jusqu'à ce que le message arrive à sa destination.

  ![](https://i.imgur.com/ggU2RWg.png)

  Note: Les routeurs disposent de différents protocoles de routage pour leur permettre de sélectionner le chemin à prendre de manière dynamique — en prenant en compte l'état du réseau. Ou on peut définir ces routes manuellement dans les configurations du routeur — tel intervalle d'adresses IP doit partir sur tel lien. Dans l'exemple précédent on utilise le deuxième cas pour plus de simplicité, mais dans la vraie vie la sélection du chemin est dans la plupart des cas dynamique.

* Un autre concept important de la commutation de paquet, est la segmentation des données:

  Si Alice veut transmettre un fichier de 10MB (environ 83 886 Kbits) sur un réseau de 56 Kbits/s, le transfert prendrait environ 1498 secondes, soit presque 25 minutes. Si le fichier est envoyé en un seul message, alors pendant 25 minutes la connexion entre Alice et Bob serait occupée et n'accepterait rien d'autre sur cette ligne tant que le transfert n'est pas terminé — et si cette ligne est interrompue, la transmission échoue. C'est exactement le type de problème qu'on rencontre avec la commutation de circuit, et dont on veut se débarrasser avec la commutation de paquets.

  Pour résoudre ce problème, la taille d'un paquet est limitée (c'est le paramètre *maximum segment size*). Si on suppose que la taille d'un paquet est limitée de 150 bits, alors le fichier va être divisé en 6991 paquets, qui seront envoyés les uns après les autres. Pendant ce temps, Alice peut toujours utiliser le réseau pour d'autres applications.

* Pour éviter de surcharger des lignes, toutes les données ne vont pas être envoyées sur la même liaison.
  Et comme les paquets peuvent prendre différentes routes, ils peuvent atteindre leur destination dans le désordre.

  Si les paquets sont mis bout à bout dans le mauvais ordre, alors le fichier construit ne sera pas bon.
  Pour y remédier, des protocoles orientés connexion ont été conçus, comme TCP: TCP ajoute un numéro (paramètre *sequence number*) dans les entêtes. Les paquets sont stockés dans la mémoire de la carte réseau (*high-speed memory buffers*, aussi appelé *TX and RX buffers* ou encore *tampons de transmission et de réception* en français), qui se charge de restaurer les paquets dans le bon ordre.

* Ainsi la commutation de paquets repose 1. sur la décomposition des messages en paquets de taille limitée, un travail travail géré aux extrémités (c'est à dire les ordinateurs source et destination) et 2. le *cut and through*: la retransmission à la volée, après décodage de l'adresse de destination, un travail géré par les appareils réseaux

---

## Classification des réseaux

* On classe généralement les réseaux en fonction de leur portée.  
  Traditionnellement, les réseaux étaient divisés en deux types:

  - <ins>*Local Area Network* (LAN)</ins>: les réseaux locaux  
    Réseau de taille limité. Par exemple un réseau qui relie les machines d'une entreprise

  - <ins>*Wide Area Network* (WAN)</ins>: les réseaux étendus  
    Réseau de grande envergure. Par exemple des réseaux à l’échelle de continents

  ![](https://i.imgur.com/lpJw09u.png)

  Récemment, d'autres termes ont été ajoutés pour mieux classer et décrire la taille du réseau:

  - <ins>*Personal Area Network* (PAN)</ins>: les réseaux personnels  
    Un réseau très petit. Il est apparut avec le bluetooth — par exemple inter-connecter un téléphone et une oreillette est considéré comme un PAN

  - <ins>*Campus Area Network* (CAN)</ins>: les réseaux de campus  
    Réseau qui relie quelques bâtiments. Par exemple une université ou un quartier constitue un CAN

  - <ins>*Metropolitan Area Network* (MAN)</ins>: les réseaux métropolitains  
    Un réseau conçu pour une ville ou une agglomération

  - <ins>*Global Area Network* (GAN)</ins>: le réseau global  
    Internet est considéré comme un GAN

* On trouve également quelques faux-amis, qui ne désignent pas la portée du réseau mais sa fonction:

  * <ins>Intranet</ins>:  
    Réseau privé appartenant à une organisation, qui n'est accessible qu'aux utilisateurs autorisés.  
    La plupart des grandes entreprises ont un intranet, pour promouvoir le partage de l'information et accroître la productivité.

  * <ins>SAN (*Storage Area Network*)</ins>:  
    Un réseau à haut débit connectant des périphériques dédiés au stockage — tels que des matrices RAID, des serveurs de fichier, etc

  * <ins>VLAN (*Virtual Local Area Network*)</ins>:  
    Un réseau permettant à des systèmes sur des réseaux physiques séparés de communiquer comme s'ils étaient connectés au même réseau physique.

* Une autre manière d'envisager les réseaux, c'est le rapport du réseau avec Internet:

  * <ins>Les *réseaux d'accès*</ins> sont les réseaux qui offrent l’accès aux utilisateurs finaux. On y trouve par exemple les réseaux xDSL, la 4G ou encore la fibre. Dans les réseaux téléphoniques, on utilisait auparavant le terme *boucle locale*.

    <ins>Le *backhaul*</ins> est l'ensemble des réseaux qui permettent d'alimenter les réseaux d'accès.  
    Par exemple, le lien satellite qui alimente des relais 4G.

  * <ins>Les *réseaux coeur*</ins> (*core* ou encore *réseaux d'infrastructure*) sont les réseaux des Fournisseurs d'Accès Internet, ils permettent d'interconnecter les réseaux des utilisateurs entre eux.

    <ins>Le *backbone*</ins> est l'interconnexion des différents coeurs.  
    Par exemple, un câble sous-marin transatlantique.

  ![](https://i.imgur.com/VQEGslH.png)

## Topologie de réseau

* On appelle *topologie* la manière de relier les équipements entre eux (physique ou logique).  
  Il existe différentes topologies physiques possibles pour les LAN filaires:

  - <ins>Topologie en *bus*</ins>.  
    Le bus s'étend sur toute la longueur du réseau, et les machines viennent s’y attacher. Lorsqu'une machine émet des données, les données circulent sur toute  la longueur du bus et la machine destinataire peut les récupérer. Une seule machine peut émettre à la fois.

  - <ins>Topologie en anneau (*ring*)</ins>.  
    Les informations circulent de machines en machines. Une seule machine est autorisée à émettre des données à la fois. Lorsque les données ont fait le tour du cercle, la machine suivante est autorisée à émettre des données. Une panne de machine rend l'ensemble du réseau inutilisable.

  - <ins>Topologie en étoile (*star*)</ins>.  
    Toutes les machines sont reliées à un unique composant central qui sert d'intermédiaire. Celui-ci peut soit envoyer les données à toutes les autres machines soit uniquement à celle qui en est le destinataire suivant le type d'appareil utilisé. Il faut davantage de câbles que pour les autres topologies et si le composant central tombe en panne, l'ensemble du réseau est inutilisable. Néanmoins, cette topologie reste la plus facile à mettre en place et à surveiller. C'est la plus courante.

    ![](https://i.imgur.com/rH6WQQ5.png)

  Et pour les LAN sans fil:

  - <ins>Topologie en maillage complet (*full mesh*)</ins>:  
    C'est la topologie la plus simple, chaque appareil à une liaison dédiée (dit *point à point*) avec chaque appareil.

  - <ins>Topologie en étoile (*hub & spoke*)</ins>:  
    Un appareil sert de point central (dit *hub*).  
    Les différents appareils du réseaux (dits *spoke*) passent par le hub pour communiquer entre eux.

    ![](https://i.imgur.com/aIEygKv.png)

* On parlera de <ins>topologie hybrique</ins> lorsqu'on a un mix de topologies

  ![](https://i.imgur.com/Ag4GGLXl.png)

---

## Client / serveur

* Une fois qu'on a plusieurs appareils connectés, ces appareils vont pouvoir s'envoyer des informations.  
  La machine / logiciel / processus à l'origine d'une demande d'information est appelé un **client** et celui qui y répond est appellé un **serveur**

* Il existe une grande variété de serveurs et de clients en fonction des besoins ou services à fournir:

  - un serveur web (tel que nginx) retourne des pages Web; le client est généralement un navigateur web (tel que firefox)  
  - un serveur de messagerie électronique (tel que postfix) transmet les courriels à des clients de messagerie (tel que thunderbird)  
  - un serveur de fichiers (tel que vsftpd) permet de partager des fichiers aux clients qui le sollicitent (tel que filezilla)
  - un serveur de base de données (tel que mysql-server) permet aux clients (tel que mysql) de récupérer des données stockées dans une base de données
  - etc

* On notera que le serveur peut lui même être client d'un autre serveur: client / serveur désigne les rôles des différents acteurs dans une transmission et non un appareil ou une technologie en particulier. Par exemple un serveur web va souvent être client d'un serveur de base de données — pour récupérer des données avant de générer dynaniquement une page web qui contient ces données

* L'architecture client-serveur est souvent centralisée: on a un serveur central qui fournit des ressources, services ou données; et plusieurs clients, qui demandent et utilisent ces ressources. Le serveur doit être suffisamment puissant pour fournir simultanément des services à plusieurs clients

  ![](https://i.imgur.com/HO9eou4l.png)

## Peer-to-peer

* L'architecture peer-to-peer (*pair à pair* en français) est un environnement client-serveur où chaque programme connecté est susceptible de jouer tour à tour le rôle de client et celui de serveur. Le programme est client lorsqu'il demande et récupère des données, et devient serveur lorsqu'il fournit des données.

  ![](https://i.imgur.com/XCpbRQBl.png)