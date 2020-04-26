---
title: Docker
category: Workflow, Containers
---

* [Les bases de Docker](!docker/docker-intro.md)
* [Lancer et arrêter des containers](!docker/docker-container.md)
* [Networking](!docker/docker-network.md)
* [Configurer Docker](!docker/docker-config.md)
* [Volumes](!docker/docker-volume.md)
* [Registres](!docker/docker-register.md)
* [Dockerfile](!docker/docker-dockerfile.md)
* [Docker Compose](!docker/docker-compose.md)
* [Swarm](!docker/docker-swarm.md)
* [Docker API](!docker/docker-api.md)
* [NVIDIA Docker](docker-nvidia.md)

[Docker commands](https://docs.docker.com/v17.12/edge/engine/reference/commandline/docker/)

---

## Conseils et mises en garde

* Ne laissez pas de choses importantes dans des containers stoppés sans nom.
* Nettoyez vos images régulièrement. Sauvegardez celles qui sont importantes.
* Sachez d'où vous téléchargez vos images, qui l'a crée et si vous faites confiance à cette personne ou non.
* En production, utilisez des build canoniques: évitez la tentation de vous connecter, corriger le Dockerfile et sauvegarder l'image sous le même nom.
* Lorsque vous créez des images que vous allez partager publiquement, créez-les à partir de Dockerfiles. De cette façon, vous pouvez retrouver comment l'image a été construite et enquêter en cas de bug.
* Ne laissez jamais de mot de passe dans vos fichiers Docker.

---

## Orchestration

Les systèmes d'orchestration démarrent vos containers, les font tourner et les redémarrent s'ils échouent.  
Ils permettent également aux containers de se trouver l'un l'autre — si un container est redémarré, toutes les machines qui s'y connectent doivent être en mesure de trouver son remplaçant. La découverte de service est une partie importante de tout système d'orchestration Docker.  
Pour finir, ils s'assurent que les containers fonctionnent dans un endroit où les ressources dont ils ont besoin existent pour qu'ils puissent faire leur travail: assez de RAM, de CPU, réseau internet disponible, etc.

Il existe de nombreuses options pour orchester des système de containers Docker.

### Docker Compose

Le plus simple est d'utiliser Docker Compose, pour la coordination d'une seule machine. Il est conçu pour le test, le développement et staging et est généralement utilisé pour les projets qui utilisent plus d'un container mais pas pour les grands systèmes et les systèmes mis à l'échelle automatiquement.

Il démarre tous les containers, volumes, networks, etc, en une seule ligne de commande: `docker-compose up`.

Pour commencer: [https:///docs.docker.com/compose](https:///docs.docker.com/compose)

### Kubernetes

Pour les systèmes plus large, il y a beaucoup de choix. Kubernetes apporte quelques fonctionnalités assez communes à tous les sytèmes d'orchestration — mais exprimées partout différemment.

Dans la nomenclature Kubernetes, les containers exécutent des programmes, les pods sont des groupes de containers destinés à fonctionner ensemble (toujours sur le même système), les services rendent les pods détectables et accessibles par d'autres, et le système de labels permet de décrire chaque aspect de votre système.

La commande `kubectl` permet de scripter un grand nombre d'opérations (si ce n'est facile, au moins possible contrairement à d'autres systèmes d'orchestration) dans Kubernetes.

Il fonctionne très bien sur hardware ou sur cloud.  
Pour commencer: [Kubernetes.io](https://kubernetes.io/)

### Amazon EC2 Container Service (ECS)

Utilise un vocabulaire analogue à quelques différences près. Les définitions de tâches définissent un ensemble de containers qui fonctionnent toujours ensemble, les tâches sont des containers en cours d'exécution, les services prennent des tâches et les exposent au réseau tout en s'assurant qu'elles restent éveillées.

Fonctionne sur le cloud Amazon.  
Pour commencer: [https://aws.amazon.com/ecs/](https://aws.amazon.com/ecs/)
