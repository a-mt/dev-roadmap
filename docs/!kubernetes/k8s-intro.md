---
title: Introduction à Kubernetes
category: Workflow, Containers, Kubernetes
---

## Qu'est ce que c'est

* Kubernetes (souvent abrégé k8s) est un projet open-source conçu par Google, qui permet l'orchestration de containers — processus de déploiement et de gestion automatique des containers.

* Il existe de nombreuses technologies d'orchestration.  
  Docker a son propre outil appelé Docker Swarm. Kubernetes de Google et MesOS d'Apache.  
  Kubernetes est sans doute le plus populaire. Il est un peu plus difficile à configurer pour démarrer, mais offre de nombreuses options pour personnaliser les déploiements et prend en charge le déploiement d'architectures complexes. Il est supporté par les fournisseurs de cloud public tels que GCP, Azure et AWS.

## Inconvénients

* Un des premiers freins à l'utilisation de Kubernetes est sa **complexité**.  
  Le coût initial est élevé, particulièrement pour les organisations qui débutent dans l'orchestration de containers. La mise en place tout comme la gestion d'un environnement de production Kubernetes requièrent un niveau élevé d'expertise et de ressources.

* Le deuxième inconvénient est le **coût**.  
  K8s nécessite un niveau minimum de ressources pour tourner et pour prendre en charge toutes ses fonctionnalités. Probablement une solution superflue pour de nombreuses petites entreprises.

* On peut mitiger ces deux inconvénients en laissant la gestion du serveur maître à un service k8s géré par un fournisseur de cloud. Les plus populaires sont Amazon EKS, GKE de Google Cloud et AKS de Azure.  
  Ces services permettent aux organisations d'exécuter des applications k8s sans avoir à se soucier de l'infrastructure sur laquelle ils tournent. Le fournisseur s'occupe des tâches qui nécessitent une expertise — comme la mise en place, le provisionnement et la maintenance du cluster.  
  Il s'agit d'une option raisonnable pour une organisation de taille moyenne qui souhaite tester Kubernetes.
  Pour une petite organisation, la recommendation est YAGNI (You Ain't Gonna Need It).

  <!--![](https://i.imgur.com/DUs59Ubl.png)-->

## Architecture

Il faut d'abord comprendre l'architecture de Kubernetes pour comprendre les termes utilisés dans la mise en place d'un cluster Kubernetes

* *noeuds* (*nodes* en anglais)  
  Un noeud est une machine, physique ou virtuelle, sur laquelle Kubernetes est installé.  
  Par le passé, les noeuds étaient appelés des "minions", les deux termes peuvent être utilisés de manière interchangeable

* *cluster*  
  Un cluster est un ensemble de noeuds. Grâce à l'utilisation de plusieurs noeuds, même si un noeud tombe en panne, l'application reste accessible à partir d'autres noeuds. Le fait d'avoir plusieurs noeuds permet également de répartir la charge

* *master* (*maître*, ou *control plane*) et *worker* (*noeud de travail*)  
  Le master est un noeud sur lequel k8s est installé et est configuré en tant que master.  
  Ce noeud est chargé de surveiller et orchestrer l'execution des containers sur les autres noeuds du cluster, les workers.

  ![](https://i.imgur.com/N67Z9KP.png)

## Composants

Quand on installe Kubernetes sur un système, on installe plusieurs composants:

* <ins>serveur API</ins>  
  Le serveur API sert d'interface pour communiquer avec Kubernetes. Les utilisateurs, les systèmes de gestion et les interfaces en ligne de commande, passent tous au serveur API pour interagir avec le cluster k8s

* <ins>service etcd</ins>  
  etcd est un storage clé-valeur distribué, il est utilisé par Kubernetes pour sauvegarder les données qui permettent de gérer le cluster. etcd est également responsable de la mise en oeuvre de locks au sein du cluster et assure qu'il n'y ait pas de conflits

* <ins>service kubelet</ins>  
  Kubelet est l'agent qui s'execute sur chaque noeud du cluster et est en charge de gérer les containers sur son noeud

* <ins>container runtime</ins> (docker)    
  Le runtime des containers est le logiciel utilisé pour faire tourner les containers. Il s'agit généralement de docker

* <ins>controller</ins> (ou *control manager*)  
  Le contrôleur est le cerveau de l'orchestration, il est chargé d'observer et réagir lorsque des noeuds, containers ou endpoints des noeuds ne répondent plus. Si ça arrive, le contrôleur prend des décisions pour mettre en place de nouveaux containers

* <ins>scheduler</ins>  
  Le scheduler est chargé de répartir le travail (les containers) sur plusieurs noeuds 

### Répartition worker & master

* Les workers sont les noeuds sur lesquels les containers tournent.  
  Pour exécuter les containers, il faut qu'un runtime y soit installé — comme docker.  
  Les workers ont également besoin de l'agent kubelet, qui est chargé d'interagir avec le master, de fournir des information sur la santé du worker et d'exécuter les actions demandées par le master.

* Le master quant à lui possède le serveur API et c'est ce qui en fait le master.  
  Toutes les informations recueillies sont stockées dans le storage etcd — toujours sur le master.  
  Le master a également un contrôleur et un scheduler.

  ![](https://i.imgur.com/L0UiQibl.png)

## Pods

* L'objectif final est de déployer une application sous forme de containers sur un ensemble de machines configurées comme workers dans un cluster.  
  Les containers sont encapsulés dans un objet Kubernetes appelé *pod*.  
  Un pod est une instance unique d'application — c'est le plus petit objet qu'on peut créer dans Kubernetes. Il va isoler le container du worker sur lequel il tourne, le container ne pourra pas interagir avec le cluster kubernetes, pas même via des sockets

* Un pod peut éventuellement contenir plusieurs containers. Par exemple, on peut avoir un second container qui effectue une tâche en soutien au container principal de l'application — comme pour traiter les fichiers téléchargés par les utilisateurs. On mettra ces deux containers dans le même pod, de sorte que

  1. Les containers du même pod partagent le même destin: lorsqu'un nouveau container d'application est créé, le container qui l'assiste est également créé; et lorsqu'il meurt, le container qui l'assiste meurt aussi. Ce comportement est automatiquement géré par k8s

  2. Les deux containers peuvent communiquer l'un avec l'autre directement, en se référant l'un et l'autre en tant que localhost puisqu'ils partagent le même espace réseau, et peuvent aussi partager le même espace de stockage

* Un pod a généralement une relation 1 à 1 avec un container qui tourne. Pour passer à échelle, on crée des nouveaux pods sur de nouveaux noeuds dans le cluster, et non en ajoutant des containers à un pod existant.

## Docker shim, containerd

* Au début de l'ère des containers, il n'y avait que Docker. Il est devenu la référence pour la gestion des containers.  
  Et Kubernetes est apparu pour orchestrer Docker.
  Les deux étaient étroitement liés et, à l'époque, Kubernetes ne prenait en charge que Docker.

  Au fur et à mesure que de nouveaux outils de containerisation ont vu le jour, comme rkt (prononcer "rocket"), les utilisateurs de Kubernetes avaient besoin de travailler avec des runtimes autres que Docker et donc que Kubernetes devienne plus flexible.

* <ins>**container runtime interface**</ins>  
  Pour répondre à la demande, Kubernetes a introduit une API appelée *Container Runtime Interface*, CRI.  
  CRI permet à n'importe quel runtime de fonctionner avec k8s, dès lors qu'il adhère aux normes OSI (*Open Container Initiative*):

  - <ins>imagespec</ins>  
    Définit les spécifications relatives à la construction d'une image

  - <ins>runtimespec</ins>  
    Définit les normes de développement d'un runtime de container

  En gardant ces normes en tête, n'importe qui peut construire un runtime supporté par Kubernetes — rkt, cri-o et d'autres

* <ins>**docker shim**</ins>  
  Docker n'a pas été conçu pour fonctionner avec CRI, puisqu'il a été conçu bien avant. Et comme Docker était toujours l'outil dominant, utilisé par la plupart des gens, k8s devait continuer de prendre en charge Docker. Pour ce faire, k8s a introduit un outil appelé *docker shim*, une couche qui permet l'interopérabilité entre k8s et Docker

  ![](https://i.imgur.com/JfPTBC7.png)

* <ins>**containerd**</ins>  
  Aujourd'hui, Docker consiste en de multiples outils: le CLI, l'API, les outils de build, etc, et finalement le runtime de container: runC et son daemon containerD. ContainerD est compatible CRI et peut fonctionner directement avec Kubernetes comme tous les autres runtimes.

  Docker shim était au final uniquement pertinent lorsqu'on utilisait d'anciennes versions docker avec une version plus récente de kubernetes; pour les nouvelles versions, Docker peut fonctionner directement avec k8s via containerd. Il a été décidé dans la version 1.24 de Kubernetes de supprimer complètement docker shim

## Outils de debugging

* <ins>**ctr**</ins>  
  Bien que containerd fasse partie de Docker, c'est maintenant un projet à part entière sur Github.

  ![](https://i.imgur.com/VonXnSgl.png)

  Il est possible d'interagir avec containerd avec la commande `ctr`.  
  Cet outil est conçu pour débugger containerd, il n'est pas très user friendly et ne prend en charge qu'un ensemble limité de fonctionnalités

  ``` bash
  # Télécharger une image
  $ ctr images pull docker.io/library/redis:alpine

  # Lancer un container
  $ ctr run docker.io/library/redis:alpine redis
  ```

* <ins>**nerdctl**</ins>  
  Une autre alternative (recommendée) est d'installer `nerdctl`, un outil en ligne de commande très similaire à Docker et qui supporte la plupart des options que Docker supporte. Il a l'avantage de donner accès aux dernières fonctionnalités implémentées dans containerd (comme les images de containers cryptées), qui seront éventuellement implémentées dans les commandes Docker dans le futur

  ``` bash
  $ nerdctl run --name webserver -p 80:80 -d nginx
  ```

* <ins>**crictl**</ins>  
  `crictl` (prononcer "cry control") est un utilitaire en ligne de commande qui permet d'interagir avec un runtime compatible CRI. C'est un outil de debuggage, qu'on installe séparemment de k8s, et qui est utilisé pour inspecter et debugger l'execution des containers — et qui n'est pas censé être utilisé pour créer des containers. 
  Beaucoup de commandes de critctl fonctionnent exactement comme Docker

  ![](https://i.imgur.com/RwvxghQl.png)

* crictl est développé et maintenu par la communauté k8s et fonctionne avec tous les runtimes de containers — alors que ctr et nerdctl ont été développés par la communauté containerd.

  ![](https://i.imgur.com/qcS8mMkl.png)

## Production

À des fins de production, on peut utiliser

- du self-hosting (*turnkey solutions*)  
  On provisionne les VM nécessaires, on est responsable de la maintenance de ces machines virtuelles, des correctifs, des mises à niveau, etc. Le provisionnement du cluster lui-même et la gestion du cycle de vie du cluster peuvent être facilités par des outils et scripts. Par exemple, le déploiement d'un cluster Kubernetes sur AWS peut être facilité par kops ou kubeone

- ou des solutions hostées (*managed solutions*)  
  Correspond à une solution Kubernetes-as-a-service, où le cluster et les machines virtuelles requises sont déployés par le fournisseur et Kubernetes est configuré par ce dernier. Par exemple Google Kubernetes Engine (GKE) permet de provisionner un cluster Kubernetes en quelques minutes et quelques clics, sans avoir à effectuer de configuration.

![](https://i.imgur.com/ouFMhPh.png)
