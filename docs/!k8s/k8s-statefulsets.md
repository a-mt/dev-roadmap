---
title: Stateful sets
category: Workflow, Containers, Kubernetes
---

## Topologie master/slave

* On a une base de données et pour résister aux pannes, on déploit une solution de haute disponibilité: une base de données maître vers laquelle sont envoyées toutes les écritures, et des bases de données esclaves qui recopient les données du maître — les lectures peuvent être servies soit par le serveur maître, soit par n'importe quel esclave. Pour mettre en place cette topologie:

  1. On déploit un serveur maître
  2. Pour initialiser la BDD du premier esclave, on effectue un clonage du maître vers l'esclave
  3. Et pour que la BDD de l'esclave soit toujours synchronisée avec la BDD du maître, on active la réplication continue du maître vers cet esclave 
  4. Pour ce qui est du deuxième esclave, afin de ne pas impacter serveur le maître et particulierement son interface réseau, on copie les données à partir du premier esclave
  5. Et on active la réplication continue à partir du maître vers le deuxième esclave

  ![](https://i.imgur.com/EPVR6fL.png)

* Pour exposer un pod vers l'extérieur, on utilise des services.  
  Un service classique agit comme un load balancer: tout trafic entrant est envoyé vers un des pods gérés par le service. Un serveur web pourrait lire la base de données, qui serait effectué à partir de n'importe quel pod; mais ne pourrait pas écrire, puisque l'écriture doit être dirigée vers le serveur maître uniquement.

  ![](https://i.imgur.com/AV3XGak.png)

* Le maître peut être atteint directement si on connaît son adresse IP, mais compte tenu que les adresses IP sont dynamiques, ce n'est pas une bonne option. Ce dont on a besoin, c'est d'un service qui n'équilibre pas la charge des requêtes mais qui crée un entrée DNS pour chaque pod. C'est ce que permet un service headless, associé à un stateful set.

  ![](https://i.imgur.com/SEVgyRH.png)

## Headless services

* Un service headless est créé comme un service normal, mais n'a pas d'adresse (IP ou DNS) qui lui est propre et n'agit pas comme un load balancer. Tout ce qu'il fait est créer des entrées DNS pour les pods. Pour déclarer un service headless, il faut

  1. Définir un service avec la propriété `clusterIP: none`

      ``` yaml
      apiVersion: v1
      kind: Service
      metadata:
        name: mysql-h
      spec:
        ports:
          - port: 3306
        selector:
          app: mysql-h
        clusterIP: None
      ```

  2. Au niveau des pods, définir les propriétés `subdomain` et `hostname` — le service créera des entrées DNS à partir de ces infos. On ne peut pas définir ces propriétés manuellement, autrement le hostname de chaque pod sera identique et donc l'entrée DNS sera identique: au final, on ne pourra pas cibler un pod en particulier.

     ![](https://i.imgur.com/ipo2pch.png)

     Pour aller jusqu'au bout des choses, plutôt que d'utiliser un Deployment, on utilise un StatefulSet.  
     Le StatefulSet assigne dynamiquement le subdomain et hostname.

## StatefulSet

* Un *StatefulSet* est quasiment identique à un Deployment — il crée des pods en se basant sur un template, peut scale up et scale down les pods, effectuer des rolling updates et rollbacks. La différence est

  - assignation dynamique du **hostname** des pods   
    Un StatefulSet crée les pods de manière séquentielle: chaque pod reçoit un nom unique dérivé du nom du StatefulSet suivit de l'index du pod (à partir du 0) — le premier pod du statefulset mysql sera mysql-0, le second mysql-1, etc.
    L'identité des pods reste fixe: si le maître échoue et est recrée, il aura tout de même le même index (0) et donc toujours le même nom (mysql-0).

  - assignation du **subdomain** des pods  
    Le StatefulSet assigne le subdomain des pods à partir du nom du service headless spécifié dans la propriété serviceName. Ainsi, le service créera des entrées DNS qui suivent le format `STATEFULSET_NAME-INDEX.SERVICE_NAME.NAMESPACE.svc.cluster.local`

    ``` diff
     apiVersion: apps/v1
    +kind: StatefulSet
     metadata:
       name: mysql
       labels:
         app: mysql
     spec:
       template:
         metadata:
           labels:
             app: mysql
         spec:
           containers:
           - name: mysql
             image: mysql
       replicas: 3
       selector:
         matchLabels:
           app: mysql
    +  serviceName: mysql-h
    ```

    ![](https://i.imgur.com/4iKpV0X.png)

### podManagementPolicy

* On peut modifier le nombre de pods dans le statefulset de la même manière qu'un replicaset

  ``` bash
  $ kubectl scale statefulset mysql --replicas=5
  ```

* Par défaut lorsqu'on démarre, ou augmente le nombre de pods du statefulset (*scale up*), chaque pod démarre l'un après l'autre: lorsqu'un pod devient Ready, le suivant est lancé. Même chose dans le sens inverse (*scale down*): lorsque le dernier pod est terminé, l'avant dernier est arrêté, etc.

  On peut modifier ce comportement pour que le statefulset ne suive pas un lancement ordonné (mais en conservant les autres avantages tel qu'un identifiant de réseau stable et unique), en définissant la propriété podManagementPolicy: Parallel.

  ``` yaml
  kind: StatefulSet
  spec:
    ...
    podManagementPolicy: Parallel
  ```

### volumeClaimTemplates

* Lorsqu'on spécifie un PVC dans la définition d'un pod dans un statefulset, tous les pods crées utilisent le meme volume.  
  Si on veut des volumes séparés pour chaque pod — que chaque instance ait sa propre base de données, au lieu de créer un PVC manuellement et l'associer au pod, on va directement placer la définition d'un template du PVC dans le statefulset via la propriété `volumeClaimTemplates`

  ``` yaml
  kind: StatefulSet
  spec:
    template:
      spec:
        containers:
        - name: mysql
          image: mysql
          volumeMounts:
            - mountPath: /var/lib/mysql
              name: data-volume

    volumeClaimTemplates:
    - metadata:
        name: data-volume
      spec:
        accessModes:
          - ReadWriteOnce
        storageClassName: google-storage
        resources:
          requests:
            storage: 500Mi
  ```

  ![](https://i.imgur.com/fDUm5aGl.png)

  ![](https://i.imgur.com/N2S9HHsl.png)

* Si le pod échoue, le statefulset ne supprime pas le PVC: à la place, il s'asssure que le nouveau pod sera rattaché au même PVC que celui auquel il était rattaché auparavant. Ainsi, il garantit un stockage stable pour les pods.