---
title: Custom Resources
category: Workflow, Containers, Kubernetes
---

## Controller

* Lorsqu'on crée un objet, k8s crée cet objet et stocke ses informations dans le datastore etcd. On peut ensuite lister et supprimer les objets, ceci va simplement lister ou supprimer les objets dans le datastore etcd.

* Le controller est un processus qui s'exécute en arrière-plan, qui surveille l'état des objets dont il a la charge et effectue les changements nécessaires sur le cluster pour maintenir l'état comme prévu. Par exemple, si on crée un déploiement dans etcd, un controller s'occupera d'effectuer les mises à jour nécessaires dans le cluster. Le controller de deployment est écrit en go et fait partie du code source de k8s.

  ![](https://i.imgur.com/c7jfb9f.png)
  ![](https://i.imgur.com/l08QMQ8.png)

## Créer une ressource personnalisée

* On voudrait pouvoir créer des objets FlightTicket, qui derrière réservent un billet d'avion

  ![](https://i.imgur.com/CrbNLpW.png)

* Si on veut créer une ressource, quelle qu'elle soit, on ne peut pas le faire sans configurer l'API k8s auparavant. Et pour ce faire, il faut 1. définir le schéma de cet objet, 2. créer un contrôleur personnalisé — qui réservera un billet d'avion pour de vrai en fonction des objets crées dans etcd.

  ![](https://i.imgur.com/BoBOM1e.png)

## CustomResourceDefinition

* Un objet *CustomResourceDefinition* (CRD) permet de définir un type de resource.

  - **scope**: un CRD peut être cantonné à un espace de nom, ou être définit à l'échelle du cluster. On définit dans le champ scope s'il s'applique à un namespace (valeur: Namespaced) ou non (par défaut)

  - **group**: est l'apiGroup qu'on devra fournir avec le numéro de version

  - **names**: définit le type, le nom au singulier, nom au pluriel et nom abbrégé de ce type de ressource.  
    On pourra s'en servir avec les commandes kubectl get, kubectl describe, etc

  - **versions**: au fur et mesure que la ressource passe par différentes phases de son cycle de vie, on va ajouter de nouvelles versions — s'il s'agit d'une nouvelle ressource, on commence par une alpha ou beta, avant de passer à la v1.  
    Dans chaque version, on définit le schéma de l'objet en utilisant le schéma OpenAPI v3. Ici, on spécifie 3 propriétés: from, to et number. On peut spécifier des validations, comme la valeur minimale ou maximale pour un nombre.

  ``` yaml
  apiVersion: apiextensions.k8s.io/v1
  kind: CustomResourceDefinition
  metadata:
    name: flighttickets.flights.com
  spec:
    scope: Namespaced
    group: flights.com
    names:
      kind: FlightTicket
      singular: flightticket
      plural: flighttickets
      shortNames:
        - ft
    versions:
      - name: v1
        served: true
        storage: true
        schema:
          openAIV3Schema:
            type: object
            properties:
              spec:
                type: object
                properties:
                  from:
                    type: string
                  to:
                    type: string
                  number:
                    type: integer
                    minimum: 1
                    maximum: 10
  ```

  ![](https://i.imgur.com/GEiV3XZ.png)

* Une fois le CRD crée, on peut créer des ressources de ce type, ce qui les stockera dans etcd. À ce stade, rien ne se passe dans les coulisses — puisque qu'il n'y a pas de contrôleur pour effectuer des actions en fonction des objets.

### Inspecter

``` bash
$ k describe crd collectors.monitoring.controller
Name:         collectors.monitoring.controller
Namespace:    
Labels:       <none>
Annotations:  <none>
API Version:  apiextensions.k8s.io/v1
Kind:         CustomResourceDefinition
Metadata:
  Creation Timestamp:  2024-02-04T19:41:46Z
  Generation:          1
  Resource Version:    1004
  UID:                 f8613d5c-4f16-4eeb-8ad0-1fb73c634957
Spec:
  Conversion:
    Strategy:  None
  Group:       monitoring.controller
  Names:
    Kind:       Collector
    List Kind:  CollectorList
    Plural:     collectors
    Short Names:
      collect
    Singular:  collector
  Scope:       Namespaced
  Versions:
    Name:  v1
    Schema:
      openAPIV3Schema:
        Properties:
          Spec:
            Properties:
              Image:
                Type:  string
              Name:
                Type:  string
              Replicas:
                Type:  integer
            Type:      object
        Type:          object
    Served:            true
    Storage:           true
Status:
  Accepted Names:
    Kind:       Collector
    List Kind:  CollectorList
    Plural:     collectors
    Short Names:
      collect
    Singular:  collector
  Conditions:
    Last Transition Time:  2024-02-04T19:41:46Z
    Message:               no conflicts found
    Reason:                NoConflicts
    Status:                True
    Type:                  NamesAccepted
    Last Transition Time:  2024-02-04T19:41:46Z
    Message:               the initial names have been accepted
    Reason:                InitialNamesAccepted
    Status:                True
    Type:                  Established
  Stored Versions:
    v1
Events:  <none>
```

### Lister

``` bash
$ kubectl get crd
NAME                                                  CREATED AT
bgpconfigurations.crd.projectcalico.org               2024-02-04T07:54:45Z
bgppeers.crd.projectcalico.org                        2024-02-04T07:54:45Z
blockaffinities.crd.projectcalico.org                 2024-02-04T07:54:45Z
caliconodestatuses.crd.projectcalico.org              2024-02-04T07:54:45Z
```

## Custom Controller

* La seconde étape est de créer un contrôleur personnalisé, qui observera les ressources crées pour effectuer des actions basées sur les spécifications de la ressource.  
  k8s est développé en go, et utiliser le client k8s go permet de prendre en charge des librairies partagées qui fournissent des mécanismes de mise en cache et de mise en file d'attente, qui peuvent aider à construire des contrôleurs facilement.

  ![](https://i.imgur.com/mm27LFM.png)

### Implémenter un contrôleur

* Installer go

  ```
  $ go
  ```

* Cloner le repo sample-controller de kubernetes

  ``` bash
  $ git clone https://github.com/kubernetes/sample-controller
  $ cd sample-controller
  ```

* Customiser le fichier controller.go pour implémenter une logique personnalisée

  ``` bash
  $ vim controller.go
  ```

* Builder

  ``` bash
  $ go build -o sample-controller .
  ```

* Tester.  
  Spécifier le fichier kubeconfig que le contrôleur peut utiliser pour s'authentifier auprès de l'API k8s. Le contrôleur démarre localement et surveille la création des objets FlightTicket

  ``` bash
  ./simple/controller -kubeconfig=~/.kube/config
  ```

### Déployer

* Une fois le contrôleur prêt, on peut packager le build dans une image docker et choisir de l'exécuter dans le cluster k8s comme un pod ou déploiement.

## Operator framework

* Jusqu'ici, on a créé manuellement une CRD, des objets et un contrôleur. Ces entités peuvent être regroupées pour être créées et déployées en une seule entité en utilisant le framework operator

* Il existe différents opérateurs disponibles sur le site [operatorhub.io](https://operatorhub.io/). On peut y trouver tout un tas d'opérateurs, comme etcd, mysql, prometheus, grafana, etc. L'installation est très bien documenté, suivre les instructions

  ![](https://i.imgur.com/wF22tJE.png)