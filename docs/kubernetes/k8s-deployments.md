---
title: Deploiements
category: Workflow, Containers, Kubernetes
---

<!--
* On a un serveur web en production. À chaque nouvelle version de l'application, on voudrait mettre à jour les instances Docker, mais pas toutes en même temps — autrement ça aurait un impact sur les utilisateurs qui utilisent l'application. On veut mettre à jour les containers les uns après les autres. Ce type de mise à jour est appelé un *rolling update*.
-->

* Chaque container est isolé dans un pod.
  Plusieurs pods sont déployés à l'aide de replicas.  
  Et pour mettre à jour les pods des replicas de manière continue, avec la possibilité de mettre en pause et d'annuler les changements si nécessaires, on utilise un déploiement.

  ![](https://i.imgur.com/sJHU0Wy.png)

* Lorsqu'on lance un déploiement, ça crée une nouvelle révision — revision 1. Quand l'application est mise à jour, un nouveau déploiement est déclenché et une nouvelle révision est créée — revision 2. On garde ainsi une trace des changements apportés et on peut revenir à une version précédente du déploiement si nécessaire.

## Stratégies de déploiement

Il existe deux types de stratégies de déploiement:

1. **Recreate**  
   Détruire tous les pods et créer de nouvelles instances avec la nouvelle version.  
   Le problème de cette stratégie est qu'entre l'arrêt des anciennes versions et la mise en service d'une nouvelle version, l'application est arrêtée et est inacessible aux utilisateurs

   ![](https://i.imgur.com/AtT7nf9l.png)

2. **Rolling update**  
   Tous les pods ne sont pas détruits en même temps: on supprime un pod et on en lance un nouveau, un par un.  
   De cette manière, l'application ne s'arrête jamais et la mise à jour est transparente pour l'utilisateur.
   Techniquement, le déploiement crée un nouveau replica, et ajoute des nouveaux pods au fur et à mesure qu'il réduit le nombre de pods de l'ancien replica.

   ![](https://i.imgur.com/fp4gqO9l.png)

## Fichier de définition

* Un déploiement se déclare comme un replicaset, à la différence du type — qui est Deployment. Et le déploiement créera automatiquement un replicaset. Si on ne spécifie pas de stratégie pendant la création du déploiement, le stratégie par défaut est le rolling update

  ``` yml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: myapp-deployment
    labels:
      app: myapp
      type: front-end
  spec:
    template:
      ...
    replicas: 3
    strategy:
      type: Recreate
    selector:
      matchLabels:
        type: front-end
  ```

  ![](https://i.imgur.com/36haaPY.png)

## Créer

* À partir du fichier de définition:

  ``` bash
  $ kubectl create -f deployment-definition.yml
  deployment "myapp-deployment" created
  ```

  ``` bash
  $ kubectl create deployment nginx --image=nginx
  ```

  ``` bash
  $ kubectl create deployment webapp --image=kodekloud/webapp-color --replicas=3
  deployment.apps/webapp created
  ```

* Pour exporter:

  ``` bash
  kubectl create deployment nginx --image=nginx--dry-run=client -o yaml > nginx-deployment.yaml
  ```

## Lister

* Pour lister les déploiements utiliser get "deployment" ou deploy" pour faire court:

  ``` bash
  $ kubectl get deployments
  NAME              DESIRED  CURRENT  UP-TO-DATE  READY  AGE
  myapp-deployment  3        3        3           3      21s
  ```

  Le déploiment crée un replicaset préfixé de son nom

  ``` bash
  $ kubectl get replicaset
  NAME                         DESIRED  CURRENT  READY  AGE
  myapp-deployment-9795844b58  3        3        3      2m
  ```

  Et le replicaset crée des pods préfixés de son nom à lui

  ``` bash
  $ kubectl get pods
  NAME                               READY  STATUS   RESTARTS  AGE
  myapp-deployment-9795844b58-5rbjl  1/1    Running  0         2m
  myapp-deployment-9795844b58-h4w55  1/1    Running  0         2m
  myapp-deployment-9795844b58-lfjhv  1/1    Running  0         2m
  ```

* Pour tout lister:

  ``` bash
  $ kubectl get all
  NAME              DESIRED  CURRENT  UP-TO-DATE  READY  AGE
  myapp-deployment  3        3        3           3      9h

  NAME                         DESIRED  CURRENT  READY  AGE
  myapp-deployment-9795844b58  3        3        3      9h

  NAME                               READY  STATUS   RESTARTS  AGE
  myapp-deployment-9795844b58-5rbjl  1/1    Running  0         9h
  myapp-deployment-9795844b58-h4w55  1/1    Running  0         9h
  myapp-deployment-9795844b58-lfjhv  1/1    Running  0         9h
  ```

## Lister les révisions

* Pour voir l'état du déploiement en cours:

  ``` bash
  $ kubectl rollout status deployment/myapp-deployment
  Waiting for rollout to finish: 0 of 10 updated replicas are available...
  Waiting for rollout to finish: 1 of 10 updated replicas are available...
  Waiting for rollout to finish: 2 of 10 updated replicas are available...
  Waiting for rollout to finish: 3 of 10 updated replicas are available...
  Waiting for rollout to finish: 4 of 10 updated replicas are available...
  Waiting for rollout to finish: 5 of 10 updated replicas are available...
  Waiting for rollout to finish: 6 of 10 updated replicas are available...
  Waiting for rollout to finish: 7 of 10 updated replicas are available...
  Waiting for rollout to finish: 8 of 10 updated replicas are available...
  Waiting for rollout to finish: 9 of 10 updated replicas are available...
  deployment "myapp-deployment" successfully rolled out
  ```

* Pour lister les révisions / historique des déploiements:

  ``` bash
  $ kubectl rollout history myapp-deployment
  deployments "myapp-deployment"
  REVISION  CHANGE-CAUSE
  1         <none>
  2         kubectl apply --filename=deployment-definition.yml --record=true
  ```

* On peut vérifier les infos d'une révision donnée avec le flag \-\-revision:

  ``` bash
  $ kubectl rollout history deployment nginx --revision=1
  deployment.extensions/nginx with revision #1
   
  Pod Template:
   Labels:    app=nginx    pod-template-hash=6454457cdb
   Containers:  nginx:  Image:   nginx:1.16
    Port:    <none>
    Host Port: <none>
    Environment:    <none>
    Mounts:   <none>
   Volumes:   <none>
  $ 
  ```
  ``` bash
  $ kubectl rollout history deployment nginx --revision=3
    deployment.extensions/nginx with revision #3
     
    Pod Template:
     Labels:    app=nginx
        pod-template-hash=df6487dc Annotations: kubernetes.io/change-cause: kubectl edit deployments. nginx --record=true
     
     Containers:
      nginx:
      Image:   nginx:latest
      Port:    <none>
      Host Port: <none>
      Environment:    <none>
      Mounts:   <none>
     Volumes:   <none>
  ```

## Mettre à jour

* Mettre à jour le fichier de définition et utiliser apply

  ``` bash
  $ kubectl apply -f deployment-definition.yml
  ```

* Ou sans fichier de configuration en passant par edit:  
  L'option \-\-record indique à kubernetes d'enregistrer la commande utilisée pour déployer l'application

  ``` bash
  $ kubectl edit deployment nginx --record
  deployment.extensions/nginx edited
   
  $ kubectl rollout history deployment nginx
  REVISION CHANGE-CAUSE
  1     <none>
  2     kubectl set image deployment nginx nginx=nginx:1.17 --record=true
  3     kubectl edit deployment nginx --record=true
  ```

* On peut également mettre à jour l'image de l'application directement avec set image:

  ``` bash
  $ kubectl set image deployment nginx nginx=nginx:1.17 --record
  deployment.extensions/nginx image updated
   
  $ kubectl rollout history deployment nginx
  deployment.extensions/nginx
   
  REVISION CHANGE-CAUSE
  1     <none>
  2     kubectl set image deployment nginx nginx=nginx:1.17 --record=true
  ```

  ``` bash
  $ kubectl set image deployment/myapp-deployment nginx-container=nginx:1.9.1
  deployment "myapp-deployment" image is updated
  ```

* En cas d'erreur, k8s arrête la mise à jour

  ![](https://i.imgur.com/5fagGGb.png)

## Annoter

Les annotations permettent de modifier le message affiché

``` bash
$ kubectl set image deploy/webapp api="$DESTINATION:$CI_COMMIT_SHA"
deployment.apps/webapp image updated
$ kubectl rollout history deploy/webapp
deployment.apps/webapp 
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
```
``` bash
$ kubectl annotate deploy webapp kubernetes.io/change-cause="version change to $CI_PIPELINE/django:$CI_COMMIT_SHA" --overwrite=true
deployment.apps/webapp annotate
$ kubectl rollout history deploy/webapp
deployment.apps/webapp 
REVISION  CHANGE-CAUSE
1         <none>
2         version change to staging/django:6139eb956cf307d941bda846e98c94752028e52c
```

## Annuler une mise à jour

* Pour déclencher un rollback de la mise à jour:

  ``` bash
  $ kubectl rollout undo deployment/myapp-deployment
  deployment "myapp-deployment" rolled back
  ```

* Pour rollback à une révision donnée, utiliser le flag \-\-to-revision

  ``` bash
  $ kubectl rollout undo deployment nginx --to-revision=1
  deployment.apps/nginx rolled back
  ```

## Inspecter

``` bash
$ kubectl describe deployment myapp-deployment
Name:               myapp-deployment
Namespace:          default
CreationTimestamp:  Sun, 12 jul 2020 16:09:55 -0400
Labels:             tier=frontend
Annotations:        deployment.kubernetes.io/revision: 2
                    kubernetes.io/change-cause: kubectl edit deployment myapp-deployment --record=true
Selector:           app=myapp
```

## Supprimer

* Pour supprimer un déploiement:

  ``` bash
  $ kubectl delete deployment hello-minikube
  deployment.apps "hello-minikube" deleted
  ```

  Les pods crées par le déploiement seront automatiquement supprimés

  ``` bash
  $ kubectl get pods
  NAME                             READY  STATUS       RESTARTS  AGE
  hello-minikube-64b64df8c9-4vcrm  1/1    Terminating  0         3m14s

  $ kubectl get pods
  No resources found in default namespace
  ```

## Stratégies de déploiement

* On a vu les stratégies recreate et rollingUpdate.  
  Il existe d'autres stratégies, qui ne peuvent pas vraiment être spécifiées, mais qui peuvent être mises en oeuvre.

### Blue/green

* Est une stratégie de déploiement dans laquelle la nouvelle version est déployée en même temps que l'ancienne.  
  100% du trafic est toujours acheminé vers l'ancienne version.

  On effectue des tests sur la nouvelle version et une fois que tous les tests ont réussis,  
  on bascule le trafic vers la nouvelle version. Tout ce qu'il y a à faire est changer le label dans le service.

* <ins>Exemple</ins>:

  - État initial:

    ``` yaml
    $ cat /wonderful/init.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        app: wonderful
      name: wonderful-v1
    spec:
      replicas: 4
      selector:
        matchLabels:
          app: wonderful
          version: v1
      template:
        metadata:
          labels:
            app: wonderful
            version: v1
        spec:
          containers:
          - image: httpd:alpine
            name: httpd
    ---
    apiVersion: v1
    kind: Service
    metadata:
      labels:
        app: wonderful
      name: wonderful
    spec:
      ports:
      - port: 80
        protocol: TCP
        targetPort: 80
        nodePort: 30080
      selector:
        app: wonderful
        version: v1
      type: NodePort
    ```

  - Créer un deuxième déploiement, qui ne matche pas le sélecteur du service:

    ``` yaml
    $ cat /wonderful/v2.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        app: wonderful
      name: wonderful-v2
    spec:
      replicas: 4
      selector:
        matchLabels:
          app: wonderful
          version: v2
      template:
        metadata:
          labels:
            app: wonderful
            version: v2
        spec:
          containers:
          - image: nginx:alpine
            name: httpd
    ```
    ``` bash
    $ kubectl create -f !$
    ```

  - Rediriger le traffic vers le nouveau déploiement, en modifiant le sélecteur du service:

    ``` bash
    $ kubectl edit service wonderful   # set selector version: v2
    ```

  - Supprimer l'ancien déploiement

    ``` bash
    $ kubectl scale deploy wonderful-v1 --replicas=0
    ```

### Canary

* On déploie la nouvelle version et on achemine un faible pourcentage du trafic vers elle.  

* <ins>Exemple</ins>:

  - Créer un deuxième déploiement, qui matche le sélecteur du service:

    ``` yaml
    $ cat /wonderful/v2.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        app: wonderful
      name: wonderful-v2
    spec:
      replicas: 0
      selector:
        matchLabels:
          app: wonderful
      template:
        metadata:
          labels:
            app: wonderful
        spec:
          containers:
          - image: nginx:alpine
            name: httpd
    ```
    ``` bash
    $ kubectl create -f /wonderful/v2.yaml
    ```

  - Rediriger une partie du traffic vers le nouveau déploiement:  
    20% vers la nouvelle image, 80% vers l'ancienne

    ``` bash
    $ kubectl get deploy
    NAME           READY   UP-TO-DATE   AVAILABLE   AGE
    wonderful-v1   10/10   10           10          4m32s
    wonderful-v2   0/0     0            0           46s

    $ kubectl scale deploy wonderful-v2 --replicas=2
    deployment.apps/wonderful-v2 scale

    $ kubectl scale deploy wonderful-v1 --replicas=8
    deployment.apps/wonderful-v1 scaled
    ```

  - Tester, et si tout semble bon,  
    passer la nouvelle version de l'application à 100% et supprimer l'ancienne.

    ``` bash
    $ kubectl scale deployment wonderful-v1 --replicas=0
    $ kubectl scale deployment wonderful-v2 --replicas=10
    $ kubectl delete deployment wonderful-v1
    ```
