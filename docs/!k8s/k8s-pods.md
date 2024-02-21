---
title: Pods
category: Workflow, Containers, Kubernetes
---

## Déclaration d'objets

### Déclarative vs impérative

* On peut créer tout objet Kubernetes (pods, replicas, déploiements, etc) de deux manières différentes:

  1. soit de manière **déclarative**, en utilisant des fichiers de définition (en YAML).

  2. soit de manière **impérative**, en utilisant des lignes de commande. Les commandes impératives permettent de réaliser des tâches ponctuelles rapidement, et peuvent générer le fichier de définition associé — ce qui permet de gagner du temps.

* Il est bon de connaître les deux, la manière impérative pour gagner du temps, et déclarative pour être capable de modifier et rectifier les fichiers de déclaration existants.

### Forme générale d'un fichier de définition

* Tout fichier de définition contient obligatoirement 4 champs de premier niveau:

  - **apiVersion**  
    Définit la version de l'API Kubernetes à utiliser pour créer les objets.  
    Il faut choisir la bonne version de l'API en fonction de l'objet créé

    | kind       | version
    |---         |---
    | Pod        | v1
    | Service    | v1
    | ReplicaSet | apps/v1
    | Deployment | apps/v1

  - **kind**  
    Indique le type d'objet à créer

  - **metadata**  
    Contient les metadonnées de l'objet.  
    Si on a une centaines de pods pour une application front, une application back et une base de données, il serait difficile de retrouver ces pods une fois déployés s'il n'y a pas de labels pour les identifier et les regrouper. Les metadatas permettent d'ajouter des labels sur lesquels on pourra ensuite filtrer les pods.

    Seules les propriétés `name` et `labels` peuvent se trouver sous metadata.  
    Et sous labels, on peut renseigner n'importe quelle clé-valeur

  - **spec**  
    Contient la spécification pour créer l'objet. Elle sera différente suivant le type d'objet.  
    Pour les pods, les images seront récupérées à partir de docker hub

 ---

## Définir

* Créer un fichier de configuration qui définit un objet de type `Pod`.  
  Exemple: créer un pod "myapp-pod" qui contient un container "nginx-container"

  ``` yml
  apiVersion: v1
  kind: Pod
  metadata:
   name: myapp-pod
   labels:
     app: myapp
     type: front-end
  spec:
   containers:
     - name: nginx-container
       image: nginx
  ```

* Notons qu'il est possible de déclarer plusieurs objets k8s dans le même fichier de déclaration.  
  Préfixer chaque déclaration par \-\-\- pour les séparer

  <pre lang="yaml">
  ---
  apiVersion: v1
  kind: Pod
  [...]
  ---
  apiVersion: v1
  kind: Service
  [...]
  </pre>

## Créer

* Pour créer un object Kubernetes à partir d'un fichier de définition, on utilise la commande create:

  ``` bash
  $ kubectl create -f pods.yml
  pod/nginx create
  ```

* On peut également l'utiliser de manière impérative:

  ``` bash
  $ kubectl create pod myapp-nginx --image=nginx
  ```

* Pour générer un fichier de définition à partir de la commande impérative:  
  Par défaut, dès que la commande run est exécutée, la ressource est créee; si à la place, on veut juste tester si la commande est correcte sans réellement créer l'objet, on ajoute l'option \-\-dry-run=client.

  Kubernetes peut retourner la définition de l'objet sous différents formats, -o yaml la retourne au format YAML.

  ``` bash
  $ kubectl create pod redis --image=redis123 --dry-run -o yaml
  ```

* Ou plus court encore, on peut utiliser "run" à la place de "create pod":

  ``` bash
  $ kubectl run myapp-nginx --image=nginx
  ```

* Il est possible de lancer un répertoire via -R, auquel cas tous les fichiers à l'intérieur du répertoire seront pris en compte:

  ``` bash
  $ kubectl apply -R -f .
  ```

* Notons que le seul rôle du scheduler est d'assigner la propriété nodeName sur le pod.  
  C'est ensuite le controller qui s'occupe d'envoyer les informations du pod à exécuter à ce noeud.

  ``` yaml
  nodeName: cluster2-controlplane1
  ```

## Lister

* Pour lister les pods créés:

  ``` bash
  $ kubectl get pods
  NAME    READY   STATUS             RESTARTS  AGE
  nginx   0/1     ContainerCreating  0         7s

  $ kubectl get pods
  NAME    READY   STATUS   RESTARTS  AGE
  nginx   0/1     Running  0         s
  ```

* Pour lister les pods et leur node:

  ``` bash
  $ kubectl get pods -o wide
  NAME            READY   STATUS    RESTARTS   AGE    IP           NODE           NOMINATED NODE   READINESS GATES
  nginx           1/1     Running   0          106s   10.42.0.9    controlplane   <none>           <none>
  newpods-tpxkr   1/1     Running   0          59s    10.42.0.12   controlplane   <none>           <none>
  newpods-r8xjl   1/1     Running   0          59s    10.42.0.10   controlplane   <none>           <none>
  newpods-jzcsc   1/1     Running   0          59s    10.42.0.11   controlplane   <none>           <none>
  ```
  ``` bash
  kubectl get pods -o jsonpath="{range .items[*]}{.metadata.name} {.status.qosClass}{'\n'}"
  kubectl get pods -o jsonpath="{.items[*]['metadata.name', 'status.capacity']}"

  kubectl get pods -o custom-columns='PODS:.metadata.name,CONTAINERS:.spec.containers[*].name,Images:.spec.containers[*].image'
  ```

* Pour surveiller les pods:

  ``` bash
  $ kubectl get pods --watch
  ```

* Pour filtrer les pods:

  ``` bash
  # En fonction de leur label
  $ k get pod --selector env=prod,bu=finance,tier=frontend
  NAME          READY   STATUS    RESTARTS   AGE
  app-1-zzxdf   1/1     Running   0          2m47s

  # En fonction de leur statut
  $ kubectl get pods --field-selector=status.phase=Running
  ```

* Pour afficher les labels:

  ``` bash
  $ kubectl get pods --show-labels
  ```

* Pour trier:

  ``` bash
  $ kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'
  ```

## Executer

* On peut executer une commande sur un pod existant avec exec:

  ``` bash
  $ kubectl exec ubuntu-sleeper -- whoami
  ```

## Inspecter

* Pour afficher plus d'infos sur un pod, on utilise describe:

  ``` bash
  $ kubectl describe pod nginx
  ```

  Tout en bas, on peut voir la liste des événements s'étant produits depuis la création du pod.

  ![](https://i.imgur.com/htbhhGdl.png)
  ![](https://i.imgur.com/vCzMrtml.png)

* Le statut du pod indique où en est son cycle de vie:

  - **Pending**.  
    Lorsqu'il est crée pour la première fois, le pod est en attente. Le scheduler essaie de déterminer où le placer et s'il ne parvient pas à le placer, alors le pod reste dans l'état Pending

  - **ContainerCreating**  
    Une fois le pod planifié sur un noeud, il passe à l'état ContainerCreating. Les images vont être téléchargées et le container démarré

  - **Running**  
    Une fois tous les containers du pod démarrés, le pod passe à l'état Running. Il le restera jusqu'à ce que le programme se termine ou soit interrompu.

* On trouve également des informations dans les "conditions". Il s'agit d'un tableau de valeurs vraies ou fausses

  - **PodScheduled** est vrai lorsqu'un pod est planifié su r un noeud
  - **Initialized** est vrai lorsqu'un pod est initialisé
  - **ContainersReady** lorsque tous les containers du pod sont prêts
  - **Ready** lorsque le pod lui-même est considéré comme prêt

## Logs

* Pour afficher les logs d'un pod:

  ``` bash
  $ kubectl logs kibana
  ```

  Ou pour voir le contenu d'un fichier:

  ``` bash
  $ kubectl exec webapp -- cat /log/app.log
  ```

* Pour streamer les logs:

  ```
  $ kubectl logs -f event-simulator-pod
  ```

* S'il y a plusieurs containers à l'intérieur du pod, spécifier le nom du container explicitement

  ``` bash
  $ k logs -f event-simulator-pod event-simulator
  ```

  ![](https://i.imgur.com/6tdeFDA.png)

## Events

* Pour lister les événements à l'échelle du cluster, tels que le démarrage ou arrêt de pods, utiliser "events":

  ``` bash
  kubectl get events -A --sort-by='.metadata.creationTimestamp'
  ```

## Mettre à jour

Pour mettre à jour un pod, deux manières de procéder:  

1. Mettre à jour le fichier de configuration et utiliser la commande apply. apply créera les nouveaux pods qui n'existent pas déjà, le comportement de create et apply est donc très similaire

    ``` bash
    $ vi sample.yaml 

    $ kubectl apply -f pods.yaml 
    pod/nginx configured
    ```

    Si on a pas de fichier yaml, on peut extraire la définition du pod vers un fichier yaml, mettre à jour le fichier yaml avant d'utiliser apply:

    ``` bash
    kubectl get pod <pod-name> -o yaml > pod-definition.yaml
    ```

2. De manière impérative:

    ``` bash
    $ kubectl edit pod <pod-name>
    ```
    ``` bash
    $ kubectl annotate pods dummy-input my-url=https://dennyzhang.com
    ```

* Les propriétés éditables sont les suivantes:

  ```
  spec.containers[*].image

  spec.initContainers[*].image

  spec.activeDeadlineSeconds

  spec.tolerations

  spec.terminationGracePeriodSeconds
  ```

  Pour modifier une propriété non éditable: 1/ si le fichier de définition n'existe pas déjà, exporter la définition du pod, 2/ éditer le fichier, 3/ supprimer le pod existant et le re-créer.

## Supprimer

* On peut supprimer un pod avec delete:

  ``` bash
  $ kubectl delete pod webapp
  ```

* Pour supprimer tous les pods:

  ``` bash
  $ kubectl delete --all pods
  ```

## Pods statiques

* Les *pods statiques* sont des pods crées et gérés par le daemon kubelet et non par le serveur API. Kubeadm utilise des pods statiques pour mettre en place le composants du master comme api-server ou controller-manager.

* Quand kubelet est lancé (typiquement via systemd), alors il démarre chaque pod trouvé dans le répertoire de manifestes: par défaut <ins>/etc/kubernetes/manifests</ins>.  
  kubelet peut surveiller un répertoire sur le système de fichiers de l'hôte (configuré en spécifiant l'argument --pod-manifest-path à kubelet) ou synchroniser les manifestes de pods à partir d'une url web périodiquement (configuré en utilisant l'argument --manifest-url).

---

## Options

### Command & args

* Il est possible d'écraser l'instruction entrypoint et cmd de l'image docker avec les propriétés `command` et `args` respectivement — attention, command ne correspond pas à cmd.

  ``` yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: ubuntu-sleeper-pod
  spec:
    containers:
      - name: ubuntu-sleeper
        image: ubuntu-sleeper
        command: ["sleep2.0"]
        args: ["10"]
  ```

### InitContainers

* Dans un pod multi-containers, chaque container doit éxecuter un processus qui tournera aussi longtemps que le pod est en cours d'execution: si l'un des deux containers s'arrête, le pod redémarre.

* Il peut arriver qu'on veuille exécuter un processus qui s'execute uniquement au démarrage du pod, une tâche qui ne sera exécutée qu'une seule fois. Dans ce cas on utilise les `initContainers`.

  Un initContainer est configuré dans un pod comme tout container mais dans la section initContainers:

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: myapp-pod
    labels:
      app: myapp
  spec:
    containers:
    - name: myapp-container
      image: busybox:1.28
      command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    initContainers:
    - name: init-myservice
      image: busybox
      command: ['sh', '-c', 'git clone <some-repository-that-will-be-used-by-application> ;']
  ```

* On peut configurer de multiples initContainers, qui seront exécutés séquentiellement — les uns après les autres. Les containers du pod ne seront démarrés que lorsque tous les initContainers se sont exécutés. Si l'un des initContainers échoue Kubernetes redémarre le pod.

### ReadinessProbe

* Le statut "ready" indique que l'application à l'intérieur du pod est en cours d'exécution et qu'elle est prête à accepter le trafic de l'utilisateur. Par défaut, K8s considère que le pod est prêt dès lors que ses containers ont démarrés, ce qui n'est pas toujours vrai: il y a souvent un délai entre le moment où le container a démarré et le moment où l'application à l'intérieur a démarré et est prête à recevoir le trafic.

* Pour déterminer quand l'application est prête, et donc que le container est prêt, on peut configurer un test dans le fichier de définition du pod dans la propriété readinessProbe.

  ``` yml
  apiVersion: v1
  kind: Port
  metadata:
    name: simple-webapp
    labels:
      name: simple-webapp
  spec:
    containers:
    - name: simple-webapp
      image: simple-webapp
      ports:
        - containerPort: 8080
          protocol: TCP
      readinessProbe:
        httpGet:
          path: /api/ready
          port: 8080
  ```

* 3 types de tests sont possibles:

  - exécuter une requête HTTP

    ``` yml
    readinessProbe:
      httpGet:
        path: /api/ready
        port: 8080
    ```

  - tester si un socket TCP est à l'écoute

    ``` yml
    readinessProbe:
      tcpSocket:
        port: 3306
    ```

  - exécuter un script personnalisé — qui se terminera avec succès si l'application est prête

    ``` yml
    readinessProbe:
      exec:
        command:
          - cat
          - /app/is_ready
    ```

  ![](https://i.imgur.com/Xlz2qkJ.png)

* Il existe également des options:

  - **initialDelaySeconds**  
    Par exemple, si on sait que l'application prend au moins 10 secondes pour démarrer, on peut ajouter un délai supplémentaire avant de tester

  - **periodSeconds**  
    Pour spécifier la fréquence des tests

  - **failureThreshold**  
    Nombre de tentatives à effectuer.  
    Par défaut, si l'application n'est pas prête après 3 tentatives, le test échoue

  ``` yaml
  readinessProbe:
    httpGet:
      path: /api/ready
      port: 8080
    initialDelaySeconds: 10
    periodSeconds: 5
    failureThreshold: 8
  ```

### LivenessProbe

* Si l'application crashe, k8s redémarre le container. On peut voir le nombre de redémarrage dans le sortie de get pods

  Si l'application ne répond plus mais que le container reste en vie (par exemple si l'application est bloquée dans une boucle infinie), l'application tourne toujours mais les utilisateurs n'y ont pas accès: il faudrait que k8s redémarre le container.

* La propriété livnessProbe permet de spécifier un test qui vérifie périodiquement si l'application à l'intérieur répond au trafic — même format que readinessProbe. Si le test échoue, le container sera détruit et recrée.

  ``` yaml
  livenessProbe:
    httpGet:
      path: /api/ready
      port: 8080
    initialDelaySeconds: 10
    periodSeconds: 5
    failureThreshold: 8
  ```

  ![](https://i.imgur.com/ufQsfLc.png)
