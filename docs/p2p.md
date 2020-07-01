---
title: Le Peer to Peer (P2P)
category: Other
---

* Quand on utilise Internet, on a généralement d'un coté des serveurs (les machines qui stockent l'information) et de l'autre les clients (les machines qui recoivent l'information).

  Par exemple, si on veut consulter ses mails, on se connecte à un serveur mail (celui du domaine qu'on utilise — comme gmail ou yahoo) et le serveur nous envoie la liste des mails associés à notre adresse.  
  Si on veut envoyer un mail, on l'envoie au serveur mail associé à l'adresse concernée, et la prochaine fois que la personne consulte ses mails, elle verra les mails que le serveur a stocké pour cette adresse.

  Pour recevoir et envoyer de l'argent, on passe par des banques.
  Pour afficher et mettre en ligne des pages web, on passe par des hébergeurs web.
  Le principe est toujours le même: on centralise l'information à un endroit et ça permet à différentes personnes d'accéder à l'information sans avoir à être connectées en même temps.

  ![](https://upload.wikimedia.org/wikipedia/commons/f/fb/Server-based-network.svg)

* L'inconvénient, c'est que du coup on est dépendant de ce serveur.

  1. Parfois, les gouvernements sont corrompus et/ou une censure est mise en place (en contrôlant les routeurs). La plupart du temps, les gens font confiance au système mais lorsque ce n'est pas le cas, alors une approche centralisée n'est plus idéale.

  2. Les données peuvent être corrompues ou supprimées. Toutes les données sont stockées en un seul endroit, c'est donc une cible de choix pour les cyber-attaques, et cela demande des moyens d'autant plus importants pour sécuriser les données.

  3. On peut perdre l'accès au serveur et donc aux données — par exemple lors d'une mise à jour, attaque DDOS, ou à cause d'un firewall. Et si, pour quelque raison que ce soit, l'entreprise ferme ses portes, alors les données sont définitivement perdues.

  4. En utilisant les services d'une entreprise, on perd le contrôle des données et le pouvoir de décision. L'entreprise qui détient le serveur qu peut décider de monétiser l'accès au service, changer son offre ou même fermer ses portes.

  5. Les données peuvent être consultées par des personnes non légitimes. On ne sait pas ce qu'il se passe côté serveur, et il est possible que des personnes tierces aient accès aux données du serveur et/ou que les informations personnelles des clients soient relayées — souvent à but de prospection.

* Le Peer-to-peer (*pair à pair* en anglais) repose sur un schéma différent: chaque client est également serveur — ce qu'on appelle parfois un *servent*, contraction de *serveur* et *client*.

  Toutes les personnes voulant accéder au réseau P2P téléchargent un logiciel. Lorsque le logiciel est lancé, le servent contribue au réseau en donnant de la bande passante, de la puissance de calcul, et une partie de son disque dur pour le stockage de fichiers (il est donc serveur) et en échange il peut accéder aux données de toutes les autres personnes connectés (il est donc client).

  ![](https://upload.wikimedia.org/wikipedia/commons/3/3f/P2P-network.svg)

* Les systèmes P2P peuvent notamment être utilisés pour fournir un routage anonyme, pour effectuer des calculs en parallèle ou — et c'est là l'usage le plus fréquent — pour stocker des données de manière distribuée.

  Un certain nombre de systèmes P2P sont partiellement centralisés: un ou des serveurs s'occupent de garder la liste des fichiers disponibles et la liste des pairs possédant ce fichier. Les réseaux P2P peuvent également être entièrement décentralisés: chaque client dispose d'une liste de démarrage de quelques pairs et découvre le reste du réseau en demandant aux autres pairs de lui fournir plus d'adresses — la recherche de fichier est donc déléguée de pair à pair jusqu'à en trouver un qui possède ce qu'on cherche.

  Les logiciels P2P permettent généralement de contrôler le nombre de connexion sortantes autorisées en même temps (seek), le nombre de connexion entrantes autorisées en même temps (seed), de restreindre les connexions à une liste de confiance ou encore d'en blacklister certaines.

Pour aller plus loin:  
[Liste de protocoles P2P et logiciels associés](https://en.wikipedia.org/wiki/List_of_P2P_protocols)  
[Fonctionnement, examples & limites des réseaux P2P](http://igm.univ-mlv.fr/~duris/NTREZO/20022003/Peer-to-peer.pdf)
