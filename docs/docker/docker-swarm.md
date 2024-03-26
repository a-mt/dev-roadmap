---
title: Swarm
category: Workflow, Containers, Docker
---

## Qu'est-ce que Docker Swarm

Docker Swarm est un système de management et d'orchestration de cluster, intégré au moteur Docker. Il est disponible avec Docker Community Edition et Enterprise Edition, sur toutes les plateformes.

Un *swarm* (essaim en français) de noeuds est un ensemble de serveurs hautement disponibles. Docker se charge du load balancing à travers ces différents hôtes pour garantir que vos applications et services puissent être toujours disponibles. Lorsque de nouvelles charges de travail sont ajoutées, elles sont automatiquement réparties dans le cluster, sur les hôtes disponibles. EtsSi vous avez besoin de mettre à jour Docker sur un noeud en particulier, les charges de travil sont automatiquement déplacées vers d'autres noeuds.
Chaque noeud du cluster communique de manière crypté avec les autres noeuds.

Le cluster swarm est géré par un *manager* tandis que les services tournent sur des *workers*. Par défaut, un manager est également worker.

---

## Créer un swarm

* Pour créer un swarm, utiliser la commande suivante:

  ```
  docker swarm init
  ```

  Vous obtiendrez en retour une commande que vous pourrez copier sur un autre noeud Docker pour joindre le swarm. Par exemple:

  ```
  docker swarm join --token ... 10.35.3.146:2377
  ```

*  Depuis Docker 1.13, on peut verrouiller automatiquement le manager à l'aide d'une clé de cryptage, grâce à l'option `--autolock`. Les clés privées utilisées par les hôtes pour communiquer et les données stockées seront protégées par le clé de cryptage et ne seront pas accessibles sans elle. Il est donc important de stocker la clé de cryptage (affichée au moment du `init`) pour pouvoir activer le manager après un redémarrage.

   ```
   docker swarm init --autolock
   ```

  Pour activer l'autolock sur un Swarm pré-existant:

  ```
  docker swarm update --autolock=true
  ```

  Pour activer le manager après un redémarrage:

  ```
  docker swarm unlock
  ```

---

# Rejoindre le swarm

* On obtient un premier jeton lorsqu'on initialise le swarm, pour un obtenir un nouveau (pour un nouvel hôte), utiliser la commande suivante:

  ```
  docker swarm join-token worker
  ```

* Une fois que vos différents hôtes ont rejoint le swarm, vous pouvez obtenir la liste des hôtes du cluster avec la commande suivante:

  ```
  docker node ls
  ```

  Cette commande ne fonctionne que sur le manager.

* Les noeuds du Swarm Docker peuvent être labellés avec le label de votre choix

  ```
  docker node update --label-add prio1 DC2-NC1
  ```

  Ce label peut être utilisé pour cibler les noeuds sur les lesquels différents services doivent tourner (avec `--constraint`)

---

## Déployer un service

Un *service* est réparti sur le swarm de serveurs.  
Chaque serveur exécute une *tâche* — une instance de service.  
* Pour déployer un service sur les hôtes du swarm, il existe deux modes:
  * `replicated` (par défaut): on spécifie le nombre de répliques que le manager doit lancer sur les hôtes disponibles. Docker Swarm va démarrer ce service et s'assurer qu'il est toujours disponible à travers le cluster, pour le nombre de replicas voulus.

    ```
    docker service create --name webapp1 \
      --replicas=6 \
      --env MYVAR=myvalue \
      --workdir /tmp \
      --user my_user \
      nginx
    ```

  * `global`: le manager lance une tâche sur chaque noeud disponible qui remplit les contraintes en termes de location et/ou ressources

    ```
    docker service create \
    --name my-nginx \
    --mode global \
    --constraint node.labels.region==east \
    --constraint node.labels.type!=devel \
    nginx
    ```

  Il est possible de déployer des services Docker en utilisant des templates, pour intégrer des informations de l'hôte Docker.

  ```
  docker service create --hostname="{{Node.Hostname}}" httpd
  ```

* Pour lister les services démarrés:

  ```
  docker service ls
  ```

  Ou utiliser le projet Github [Docker Swarm Visualizer](https://github.com/dockersamples/docker-swarm-visualizer)

* Pour visualiser les logs:

  ```
  docker service logs webapp1
  ```

  Ajouter l'option `-f` pour suivre les logs en temps réel.

* Pour modifier la configuration du service, utiliser `docker service update`:

  * Modifier le nombre de répliques

    ```
    docker service update --replicas=20 mystack
    ```

  * Modifier les ports exposés sur un service en cours d'execution

    ```
    docker service update --publish-add published=8080,target=8080 mystack_web
    ```

  * Ajouter un volume

    ```
    docker service update --mount-add type=volume,web-vol,target=/web-vol-dir mystack_web
    ```

  * Modifier la commande exécutée sur le service

    ```
    docker service update --args "ping docker.com" helloworld
    ```

* Pour supprimer un service:

  ```
  docker service remove mystack
  ```

* Pour lister les tâches démarrées sur un hôte donnée, il suffit de faire comme d'habitude:

  ```
  docker ps
  ```

---

## Quorum

Les noeuds *manager* s'assurent que l'état du cluster est intact, que les services déployés restent disponibles et déployés sur les différents noeuds.
Ajouter de nouveaux managers rend le cluster plus tolérant aux pannes, mais réduit les performances d'écriture car davantage de noeuds doivent reconnaître les demandes de mise à jour — et il y a plus de traffic sur le réseau.

Lorsqu'il existe plusieurs managers, ils doivent se mettre d'accord pour toute mise à jour sur le cluster — par exemple lorsqu'on veut ajouter ou supprimer des noeuds.
Pour ce faire, Swarm utilise l'algorithme de consensus Raft (Raft Consensus Algorithm), lequel requiert qu'une majorité de managers (dit *quorum*). Si le cluster perd le quorum de managers, alors il ne peut plus effectuer de tâches de gestion: les tâches continuent de tourner sur les hôtes, mais il n'est plus possible d'en lancer de nouvelles, de les arrêter ou de les mettre à jour.

Ainsi, si votre cluster a plusieurs managers, il est recommandé d'avoir un nombre impir de managers, car un nombre pair rend le quorum plus difficile.
Pour s'assurer que votre cluster puisse toujours maintenir le quorum, vous pouvez vider les charges de travail des managers avec la commande suivante:

    docker node update --availability drain <NODE>

De cette manière, vous aurez toujours des managers pour prendre des décisions critiques dans le cluster.

[Administer and maintain a swarm of Docker Engines](https://docs.docker.com/engine/swarm/admin_guide/)

---

## Stacks

Les *stacks* sont utilisées pour définir des applications complètes, par exemple un service web + base de données + apt. Une stack Docker permet de définir des services, avec l'ensemble des containers devant fonctionner à l'intérieur, ainsi que la manière dont les services réseau et de stockage sont exposés et sont en relation.

Un stack est définie par un fichier texte écrit au format YAML. C'est à peu près la même chose que `docker-compose.yml`, sauf qu'on ajoute une section `deploy` à chaque service.

* Pour déployer une stack:

  ```
  docker stack deploy --compose-file docker-stack.yml mystack
  ```

  Pour modifier la stack, il suffit de modifier le fichier YAML et de relancer `docker stack deploy`.

* Pour lister les stacks:

  ```
  docker stack ls
  ```

* Pour voir l'état de la stack:

  ```
  docker stack services mystack
  ```

* Pour voir les tâches d'une stack:

  ```
  docker ps mystack
  ```

---

## Secrets

Un secret est un blob de données, comme un mot de passe, une clé privée SSH, un certificat SSL ou tout autre élément qui ne doit pas être transmis sur le réseau ou être stocké non encrypté sur le disque (Docker >= 1.13).

Les secrets sont encryptés dns le swarm.
Les services n'y ont accès que si l'accès leur a été explicitement donné.

* Créer un secret

  ```
  printf "This is a secret" | docker secret create my_secret_data -
  ```

  ```
  docker secret create site.key site.key
  ```

* Lister les secrets

  ```
  docker secret ls
  ```

* Donner l'accès au secret au service

  ```
  docker service create \
     --name nginx \
     --secret site.key \
     --secret site.crt \
     --secret source=site.conf,target=/etc/nginx/conf.d/site.conf \
     --publish published=3000,target=443 \
     nginx:latest \
     sh -c "exec nginx -g 'daemon off;'"
  ```

  ```
  docker service update --secret-add my_secret_data nginx
  ```

* Supprimer un secret

  ```
  docker secret rm my_secret_data
  ```