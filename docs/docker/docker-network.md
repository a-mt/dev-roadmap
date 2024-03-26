---
title: Networking
category: Workflow, Containers, Docker
---

{% raw %}

## Accès extérieurs vers un container

Par défaut, les accès extérieurs vers un container ne sont pas autorisés — en revanche, les containers ont accès vers l'extérieur et peuvent effectuer des requêtes Internet.  
Pour autoriser les accèss ver le container, il faut exposer explicitement les ports du container au moment où on le crée, en liant le port du container à un port de l'hôte — soit un port spécifique, soit un port disponible choisit aléatoirement par Docker (si le container est arrêté puis redémarré, le port choisit sera vraisemblablement différent)

### Exposer des ports

* Pour lier des ports, utiliser l'option `-p`:

  ```
  docker run -p [PORT_HOST:]PORT_CONTAINER IMAGE_NAME
  ```

  <ins>Exemples</ins>:  

  ``` shell
  # Lier le port 5000 du container au port 80 de l'hôte
  docker run -d -p 80:5000 training/webapp python app.py

  # Lier le port 5000 du container à un port disponible de l'hôte
  docker run -d -p 5000 training/webapp python app.py

  # Lier le port 5000 du container à un port disponible choisit aléatoirement entre 8000 et 9000
  docker run -d -p 8000-9000:5000 training/webapp python app.py
  ```

  On peut spécifier autant de ports que l'on veut:

  ```
  docker run -itd -p 45678 -p 45679 ubuntu
  ```

* Pour savoir quel port de l'hôte a été choisit, utiliser `docker port`:

  ```
  $ docker port CONTAINER_NAME
  45678/tcp -> 0.0.0.0:32770
  45679/tcp -> 0.0.0.0:32769
  ```

* On peut également publier tous les ports exposés (avec `EXPOSE` dans le Dockerfile) avec `-P`

  ```
  docker container run -dit -P nginx
  ```

### Limiter l'accès à un hôte

`0.0.0.0` indique que le container accepte les connexions de n'importe qui.  
C'est la valeur par défaut quand on expose un port.  
Mais on peut limiter l'accès à une interface spécifique, par exemple uniquement `localhost`:

```
docker run -p 127.0.0.1:80:8080/tcp
```

Très souvent, un service est configuré pour écouter les connexions de la machine locale (`127.0.0.0`) et non d'Internet. Lorsque ce service est placé dans un container, la machine locale est cantonnée à l'intérieur du container.
Pour pouvoir recevoir des connexions du même hôte, mais dans des containers différents, il faut modifier le service pour qu'il écoute toutes les connexions en définissant son adresse à `0.0.0.0` puis utiliser Docker pour limiter l'accès à un seul hôte.

### Type de port

Par défaut, quand on entre un numéro de port, Docker part du principe qu'il s'agit d'un port TCP.  
On peut préciser le protocole de port utilisé: `tcp`, `udp` ou `sctp`

    HOST_PORT:CONTAINER_PORT/PROTOCOL

---

## Réseau Docker

### Drivers

Entre les applications et le réseau physique, se trouve le réseau Docker — appelé le Container Network Model (CNM). Le CNM assure la connectivité des containers et offre des fonctionnalités spéciales telles que le mise en réseau multi-hôte, le chiffrement de la couche réseau et la découverte de services.

Derrière la scène, Docker utilise les fonctionnalités Linux: bridges, namespaces réseau, paires veth, iptables.

* Un *bridge* est une implémentation virtuelle d'un switch physique, à l'intérieur du noyau Linux.  
  Il transfère le traffic en se basant sur les adresses MAC.

* Un *namespace réseau* est une stack réseau isolée dans le noyau, avec ses propres interfaces, routes et règles firewall.

* *veth* est une interface réseau Linux qui sert de fil de connexion entre deux namespaces.  
  Un veth est un lien full duplex qui a une interface unique dans chaque namespace.

* *iptables* est le système de filtrage de paquets réseaux qui fait partie du noyau Linux (depuis la version 2.4). Il s'agit d'un firewall riche en fonctionnalités, qui permet le marking, masquerading et dropping des paquets.  
  [Linux Network Fundamentals](https://success.docker.com/article/networking#linuxnetworkfundamentals)

L'utilisation de ces fonctionnalités est contrôlée par les drivers réseau de Docker — qui fournissent les règles de transfert, la segmentation réseau et les outils de gestion pour gérer le réseau au niveau applicatif.
Docker inclut également un driver IPAM (IP Address Management) — qui s'occupe de fournir les adresses IP privée du sous-réseau.

Certains drivers réseau sont directement inclus dans Docker Engine. D'autres sont rendus disponibles par les fournisseurs de réseau et la communauté Docker et peuvent être installés sous forme de [plugins](https://success.docker.com/article/networking#dockerremotenetworkdrivers).  
Les drivers réseau natifs de Docker sont les suivants:

* `bridge`  
  C'est le driver par défaut. Lorsqu'on démarre un nouveau container sans spécifier le driver à utiliser, le container utilisera le driver `bridge`.
  Ce driver crée un réseau privé interne sur l'hôte, pour que les containers sur le même réseau puissent communiquer — pourvu que l'accès au container soit autorisé (en exposant les ports).

* `host`  
  Ce driver permet d'utiliser le réseau de la machine hôte — il n'y a plus de séparation de namespace.
  Avec cette option, les applications qui tournent à l'intérieur du container tournent directement sur les ports de la machine hôte. Ainsi, si la machine hôte exécute une application sur le port 80 et que le container essaie de démarrer un service sur le port 80, une erreur sera levée. Ce driver est très utile pour l'apprentissage et le debuggage mais une mauvaise idée pour une application en production.

* `overlay`  
  Ce driver n'est disponible que lorsqu'on utilise Docker Swarm (avec Docker Enterprise Edition), et qu'on active Swarm pour connecter plusieurs daemon Docker ensemble. Tous les containers du réseau `overlay` pourront communiquer avec tous les autres containers du réseau `overlay`, à travers tous les noeuds du cluster. Il s'agit donc d'un réseau multi-hôte — il utilise les bridges locaux Linux et un overlay VXLAN, pour permettre la communication entre containers sur le réseau physique. Il supporte l'encrytion IPSec.

* `mavlan`  
  Essentiellement, ce driver clone des interfaces physiques pour créer un nouveau type d'interface réseau virtuel auquel les containers peuvent se connecter. Si vous souhaitez connecter vos containers au réseau physique de l'hôte, `macvlan` peut être une option. Il peut également vous permettre de connecter des containers directement à des LANs virtuels (VLANs).

* `none`  
  Désactive tous les réseaux, ne donne aucun accès réseau au container.

[Understanding Docker Networking Drivers and their use cases](https://blog.docker.com/2016/12/understanding-docker-networking-drivers-use-cases/)

### Réseau par défaut

Sur tout hôte exécutant Docker Engine, il existe le réseau Docker par défaut, nommé `bridge` et de type `bridge` (crée et utilise le bridge Linux `docker0`).
Il s'agit du réseau par défaut, auquel les containers se connectent si aucun réseau n'est spécifié. À l'intérieur du container `eth0` est crée par le driver bridge, et une addresse IP lui est assignée par le driver IPAM.

```
host$ docker run -it --name c1 busybox sh
# ip address
4: eth0@if5: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 scope global eth0

# ip route
default via 172.17.0.1 dev eth0
172.17.0.0/16 dev eth0  src 172.17.0.2
```

```
host$ ip route
default via 172.31.16.1 dev eth0
172.17.0.0/16 dev docker0  proto kernel  scope link  src 172.17.42.1
172.31.16.0/20 dev eth0  proto kernel  scope link  src 172.31.16.102
```

Le réseau `bridge` par défaut utilise le sous-réseau 172.[17-31].0.0/16 ou 192.168.[0-240].0/20.

### Lister les réseaux Docker existants

Pour lister tous les réseaux Docker existants:

```
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
1475f03fbecb        bridge              bridge              local
e2d8a4bd86cb        docker_gwbridge     bridge              local
407c477060e7        host                host                local
f4zr3zrswlyg        ingress             overlay             swarm
c97909a4b198        none                null                local
```

### Réseau définit par l'utilisateur

Outre les réseaux par défaut, les utilisateurs peuvent créer leurs propres réseaux Docker. Contrairement au réseau bridge par défaut, les réseaux définis par l'utilisateur prennent en charge l'attribution manuelle des adresses IP et des sous-réseaux.

* Pour créer un réseau Docker:

  ```
  docker network create my_bridge
  ```

  On peut préciser
  * le driver à utiliser, avec `-d`
  * le sous-réseau, avec `--subnet`
  * l'intervalle d'adresses IP, avec `--ip-range`
  * pour un réseau `overlay`: activer IPSec, avec `--opt encrypted=true`

  ```
  docker network create --subnet 172.20.0.0/16 --ip-range 172.20.240.0/20 multi-host-network
  ```

  ```
  docker network create -d overlay --opt encrypted=true NETWORK_NAME
  ```

* Si on a un autre hôte Docker sur le même cluster Swarm, ce réseau n'existera pas, à moins de déployer un service qui requiert le réseau. À ce moment seulement, le réseau sera créé sur les autres hôtes qui composent le cluster Swarm.

  ```
  # Create a network
  docker network create --driver overlay app-overlay

  # Dispatch the service
  docker service create --network app-overlay --name=app1 --replicas=6 nginx
  ```

  Chaque container reçoit sa propre adresse IP sur le réseau overlay, fournie par DHCP par Docker.

* Pour supprimer un réseau:

  ```
  docker network rm my-net
  ```

### Se connecter à un réseau donné

Tous les containers d'un même réseau Docker peuvent communiquer entre eux sur tous les ports. Alors que la communication entre différents réseaux et le traffic en entrée pronenant de l'extérieur de Docker sont protégés par un firewall — l'accès externe doit être explicitement autorisé, en exposant des ports.

* Pour connecter un container à un réseau donné — au lieu du réseau par défaut (`bridge`):

  ```
  docker run -itd --name c2 --network my_bridge busybox sh
  ```

  L'option `--network` est un alias de `--net` ([#23324](https://github.com/moby/moby/pull/23324))

* On peut utiliser le nom du container ou son ID (court, 12 caractères) pour se connecter d'un container à l'autre, grâce au DNS intégré à Docker — tant que les deux containers sont sur le même réseau et que ce réseau n'est pas le réseau par défaut (`bridge`).

  ```
  # Créer le réseau
  docker network create openemr_net

  # Créer la BDD
  docker run --detach --name mysql \
    --net openemr_net \
    --env "MYSQL_ROOT_PASSWORD=rootpassword" \
    --volume openemr_databasevolume:/var/lib/mysql \
    mariadb:10.2 mysqld --character-set-server=utf8

  # Créer le serveur
  docker run --detach --name openemr -p 80:80 \
    --net openemr_net \
    --env "MYSQL_HOST=mysql" \
    --env "MYSQL_ROOT_PASS=rootpassword"
    openemr/openemr:5.0.1

  # Pinger la BDD à partir du serveur
  docker exec -it openemr bash
  > ping mysql
  ```

* On peut connecter un container à plusieurs réseaux.  
  Pour connecter un container à un réseau additionnel:

  ```
  docker network connect NETWORK_NAME CONTAINER_NAME
  ```

  On peut donner une autre adresse IP et un autre nom au container, spécifiquement pour ce réseau:

  ```
  docker network connect --ip 10.10.36.122 --alias db --alias mysql multi-host-network container2
  ```

  Et pour déconnecter:

  ```
  docker network disconnect NETWORK_NAME CONTAINER_NAME
  ```

[Use bridge networks](https://docs.docker.com/network/bridge/)

### Iptables

Par défaut, Docker ajoutera des règles de transfert à la chaîne de filtres DOCKER de iptables. Il est possible de de désactiver ce comportement en définissant `--iptables=false` au moment de démarrer le daemon. Il faudra alors ajouter manuellement les règles iptables.

```
iptables -I DOCKER -i ext_if ! -s 8.8.8.8 -j DROP
```

[Understand container communication](https://docs.docker.com/v17.09/engine/userguide/networking/default_network/container-communication/)

---

## Legacy: Lier deux containers

`--link` est une fonctionnalité dépreciée, qui sera éventuellement supprimée de Docker.  
Lorsqu'on lie deux containers ensemble, on lie tous les ports de manière unidirectionnelle (client -> serveur). Ce qui peut être utile pour un service et un healthcheck par exemple.

* Pour lier des containers, créer un serveur normalement:

  ```
  docker run --ti --name server ubuntu:14.04 bash
  ```

* Puis démarrer un client lié au serveur grâce à l'option `--link`:

  ```
  docker run -ti --link server --name client ubuntu:14.04 bash
  ```

  L'adresse IP et nom du serveur est ajouté au fichier `/etc/hosts` du client. Si l'adresse IP du serveur change après coup, le lien sera rompu.

Avant `--link`, on utilisait une fonction dit de *linking*, qui était très similaire mais fonctionnait en définissant des variables d'environnement à l'intérieur des containers.

---

## DNS

Par défaut, Docker s'occupe du DNS des containers, y compris de populer `/etc/hosts` et `/etc/resolv.conf`.

* Le nom d'hôte d'un container est par défaut l'ID du container dans Docker. On peut spécifier un nom d'hôte différent en utilisant `--hostname`. Définit les valeurs dans `/etc/hosts` et `/etc/hostname`

  ```
  docker run -d --hostname puppet puppet:last
  ```

  Cette option change seulement le nom d'hôte à l'intérieur du container, ce qui peut être nécessaire si vos applications lit cette valeur (`hostname`). Cela ne change pas le DNS en dehors du container, et ne permet donc pas aux autres containers de s'y connecter avec ce nom.

* L'option `--dns` permet d'ajouter une directive `nameserver` dans le fichier `/etc/resolv.conf` du container. Lorsqu'un container est confronté à un nom d'hôte qui n'est pas dans `/etc/hosts`, alors il se connecte aux adresses IP définies dans ce fichier (sur le port 53) à la recherche d'un service de résolutions de noms.

  ```
  nameserver 127.0.0.53
  ```

  Pour spécifier de multiple serveurs DNS, utiliser plusieurs flags `--dns`.  
  Si le container ne peut atteindre aucune des adresses IP spécifiée, le serveur DNS public de Google 8.8.8.8 est ajouté, pour que le container puisse résoudre les domaines Internet.

  On peut également définir les configurations DNS pour tous les containers dans `/etc/docker/daemon.json`

  ```
  {
  "dns": ["192.168.1.254"]
  }
  ```

* L'option `--dns-search` permet de définir directive `search` dans le fichier `/etc/resolv.conf`. Définit le nom de domaine recherché Lorsqu'un nom d'hôte non qualifié est utilisé à l'intérieur du container.

  ```
  search home
  ```

  Utiliser `--dns-search=` si vous ne souhaitez pas définir le domaine de recherche.

* L'option `--dns-opt` permet de définir la directive `options` dans le fichier `/etc/resolv.conf`. Définit les options utilisées par les résolveurs DNS.

  ```
  options edns0
  ```

{% endraw %}