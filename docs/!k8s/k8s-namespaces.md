---
title: Namespaces
category: Workflow, Containers, Kubernetes
---

## Namespace par défaut

* Jusqu'à présent, on a manipulé des objets k8s dans l'espace de noms par défaut, le namespace *default*.  
  Il est créé automatiquement par k8s lors de la mise en place du cluster

* Kubernetes crée un ensemble de pods et de services pour ses besoins internes — tels que ceux pour les services de mise en réseau, le service dns, etc. Pour séparer ces objets de ceux de l'utilisateur, et éviter de supprimer ou modifier les objet de k8s accidentellement, k8s les crées dans un autre namespace, appelé *kube-system*

* Un troisième namespace crée automatiquement par k8s est *kube-public*.  
  C'est là que sont créées les ressources qui doivent être mises à la disposition de tous les utilisateurs

## Utilité du namespace

* Quand on un petit environnement, on peut continuer à travailler dans l'espace de noms par défaut. Par contre, quand on grandit et qu'on utilise un cluster k8s à des fins de production, on sépare généralement les différents objets en différents namespaces — dev, test, prod par exemple.

  Chaque namespace peut avoir son propre ensemble de politiques qui définissent qui peut faire quoi, et on peut assigner des quotas de ressource à chacun des namespaces.

## Accés aux pods

* Les ressources au sein d'un même namespace peuvent se référer les unes aux autres simplement par leur nom.  
  Par exemple, le pod "web" peut se référer à la base de données en utilisant le nom d'hôte "db-service"

* Si nécessaire, il peut également accéder à un service dans un autre namespace.  
  Par exemple pour accéder au server db-service du namespace dev: "db-service.dev.svc.cluster.local"

  - La dernière partie, cluster.local, est le nom de domaine par défaut du cluster k8s
  - La partie suivante, svc, est le sous-domaine qui désigne les services
  - dev est le namespace
  - db-service est le nom du pod

  ![](https://i.imgur.com/HmRjbHU.png)

## Fichier de définition

``` yaml
apiVersion: v1
kind: Namespace
metadata:
name: dev
```

## Créer

* Déclaratif:

  ``` bash
  $ kubectl create -f namespace-dev.yaml
  namespace/dev created
  ```

* Impératif:

  ``` bash
  $ kubectl create namespace dev
  namespace/dev created
  ```

## Lister

``` bash
$ kubectl get namespace
NAME              STATUS   AGE
default           Active   9m2s
kube-system       Active   9m2s
kube-public       Active   9m2s
kube-node-lease   Active   9m2s
finance           Active   39s
marketing         Active   39s
dev               Active   39s
prod              Active   39s
manufacturing     Active   39s
research          Active   39s
```

## Lister les pods

* Lister les pods d'un namespace donné:

  ``` bash
  $ kubectl get pods --namespace=research
  NAME    READY   STATUS             RESTARTS      AGE
  dna-1   0/1     CrashLoopBackOff   3 (21s ago)   73s
  dna-2   0/1     CrashLoopBackOff   3 (22s ago)   73s
  ```
  ``` bash
  $ kubectl get pods -n research
  ```

* Lister tous les pods de tous les namespaces:

  ``` bash
  $ kubectl get pods --all-namespaces
  $ kubectl get pods -A
  ```

## Créer des pods

* Quand on crée un pod, il est crée dans le namespace par défaut.  
  Pour créer un pod dans un autre namespace, utiliser l'option \-\-namespace ou -n

  ``` bash
  $ kubectl run redis --image=redis --namespace=finance
  pod/redis created
  ```
  ``` bash
  $ kubectl create -f pod-definition.yml --namespace=dev
  ```

* Ou directement dans le fichier de définition du pod, dans metadata

  ``` diff
   metadata:
     name: myapp-pod
  +  namespace: dev
     labels:
       app: myapp
       type: front-end
  ```

## Changer de namespace par défaut

``` bash
# Changer le namespace par défaut du contexte "local"
$ kubectl config current-context
local
$ kubectl config set-context local --namespace=dev

# Changer le namespace par défaut du contexte en cours
$ kubectl config set-context --current --namespace=dev
```
