---
title: Replicas
category: Workflow, Containers, Kubernetes
---

## Replica

* Si on a un pod en cours d'execution et que l'application crashe, les utilisateurs ne pourrons plus accéder à l'application. Pour éviter que ça arrive, on fait tourner plusieurs instances / pods en même temps et si l'un d'entre eux tombe en panne, l'application continue de fonctionner sur un autre.  
  Avoir plusieurs pods sur plusieurs noeuds permet également de répartir la charge entre eux. Si le nombre d'utilisateurs augmente, et que les ressources du premier noeud sont épuisées, alors on peut déployer des pods supplémentaires sur d'autres noeuds du cluster et diriger une partie du trafic vers ces noeuds.

* Le contrôleur de replica permet de contrôler le fonctionnement des pods dans le cluster k8s. Il garantit que le nombre spécifié de pods tourne à tout moment. Même si on ne fait tourner qu'un seul pod à la fois, le contrôleur est là pour gérer le démarrage automatique d'un nouveau pod quand le pod existant ne répond plus.

* Le type "ReplicationController" est une ancienne technologie, qui est en train d'être remplacée par le "ReplicaSet".  
  Il existe de mineures différences entre les deux — la présence d'un sélecteur.

## ReplicationController

### Définir

* Créer un fichier de configuration qui définit un objet de type `ReplicationController`.  
  Dans les spécifications, `template` contient la définition du pod (qui reprend les metadata et spec qu'on aurait utilisé dans le fichier de configuration du pod) et `replicas` définit le nombre de pods à maintenir

  ``` yml
  apiVersion: v1
  kind: ReplicationController
  metadata:
    name: myapp-rc
    labels:
      app: myapp
      type: frontend
  spec:
    template:
      ...
    replicas: 3
  ```

  ![](https://i.imgur.com/Z8a02Lt.png)

* Là où les labels permettent d'utiliser des sélecteurs, pour regrouper et sélectionner des objets,  
  les annotations sont utilisées pour enregistrer des informations sur l'objet mais qui ne sont pas utilisées comme sélecteurs, comme par exemple la version du build, ou l'adresse mail de l'admin. Ces informations peuvent être utilisées pour les containers, par des agents tiers ou par d'autres outils.

  ``` yml
  metadata:
    name: simple-webapp
    labels:
      app: App1
      function: Front-end
    annotations:
      buildversion: 1.34
  ```

### Créer

* Pour créer un replica à partir du fichier de configuration,
  même chose que pour le pod:

  ``` bash
  $ kubectl create -f rc-definition.yml
  replicationcontroller "myapp-rc" created
  ```

### Lister

* Pour lister les replicaController:

  ``` bash
  $ kubectl get replicationcontroller
  NAME      DESIRED  CURRENT  READY  AGE
  myapp-rc  3        3        3      19s
  ```

  Notons que lous les pods crées par ce replicaController aurons leur nom préfixé par celui du contrôleur.

  ``` bash
  $ kubectl get pods
  NAME            READY  STATUS   RESTARTS  AGE
  myapp-rc-41vk9  1/1    Running  0         20s
  myapp-rc-mc2mf  1/1    Running  0         20s
  myapp-rc-px9pz  1/1    Running  0         20s
  ```

## ReplicaSet

### Définir

* La définition d'un ReplicaSet est très similaire à celle du ReplicationController — propriétés `template` et `replicas`. Mais il y a en plus un `selector` qui permet au replicaset d'identifier les pods qui lui sont rattachés, puisque le replicaset peut gérer des pods qui n'ont pas été crées par lui.  
  Si des pods ont été crées auparavant et qu'ils correspondent au sélecteur, alors le replicaset prendra également ces pods en considération pendant la création (et mise à jour) du replica. Si selector n'est pas spécifié, alors le "labels" spécifié dans la définition du pod sera utilisé.

  Notons qu'un ReplicaSet utilise l'API version "apps/v1" tandis que le ReplicationController utilise "v1"

  ``` yml
  apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
    name: myapp-rs
    labels:
      app: myapp
      type: frontend
  spec:
    template:
      ...
    replicas: 3
    selector:
      matchLabels:
        type: frontend
  ```

  ![](https://i.imgur.com/CTwVAoR.jpg)

### Créer

* Comme toujours, avec create:

  ``` bash
  $ kubectl create -f replicaset-definition.yml
  replicaset "myapp-replicaset" created
  ```

### Lister

* Pour lister les replicaset, on utilise get suivit de "replicaset" ou "rs" pour faire court:

  ``` bash
  #$ kubectl get replicaset
  $ kubectl get rs
  NAME              DESIRED  CURRENT  READY  AGE
  myapp-replicaset  3        3        3      19s
  ```

  Les pods crées sont préfixés par le nom du replicaset

  ``` bash
  $ kubectl get pods
  NAME                    READY  STATUS   RESTARTS  AGE
  myapp-replicaset-9dd19  1/1    Running  0         45s
  ```

* Si un pod crashe / est arrêté, un nouveau sera automatiquement crée pour maintenir le nombre de pods spécifié dans le replicaset.
  De la même manière, s'il y a des pods qui matchent le sélecteur en trop par rapport à la configuration, ils seront arrêtés

  ![](https://i.imgur.com/h4HNMWWl.png)

  ![](https://i.imgur.com/qk99Qg3l.png)

* Note: pour vérifier la version courte d'une objet

  ``` bash
  $ kubectl api-resources | grep replicaset
  replicasets                       rs           apps/v1                                true         ReplicaSet
  ```

### Inspecter

``` bash
$ kubectl describe replicaset myapp-replicaset
Name:          myapp-replicaset
Namespace:     default
Selector:      app=myapp
Labels:        app=myapp
Annotations:   <none>
Replicas:      3 current / 3 desired
Pods Status:   3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=myapp
  Containers:
    nginx:
      Image:        nginx
      Port:         <none>
      Host Port:    <none>
      Environment:  <none>
      Mounts:       <none>
  Volumes:          <none>
```

### Mettre à jour

* Soit on met à jour le fichier de définition suivit de la commande replace:

  ``` bash
  $ kubectl replace -f replicaset-definition.yml
  ```

* Soit on utilise la commande scale

  ``` bash
  # désigne le replica définit dans un fichier
  # note: ne met pas à jour le fichier
  $ kubectl scale --replicas=6 -f replicaset-definition.yml
  ```

  ``` bash
  # désigne un replica via son nom
  $ kubectl scale replicaset myapp-replicaset --replicas=6
  ```

  Notons qu'il existe des options pour mettre automatiquement à échelle les replicas en fonction de la charge.

### Supprimer

``` bash
$ kubectl delete replicaset myapp-replicaset
```

