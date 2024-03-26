---
title: Services
category: Workflow, Containers, Kubernetes
---

* Chaque noeud a son adresse IP, qu'on peut utiliser pour se connecter à la machine via ssh.  
  Et chaque pod a également sa propre adresse IP interne. Mais ces adresses IP sont sujettes à changement quand les pods sont recrées.

  ![](https://i.imgur.com/MpIQeUzm.png)

* Pour permettre l'accès externes aux pods, on utilise des services.  
  Un service écoute sur un port du noeud et transmet les requêtes reçues au pod.

  ![](https://i.imgur.com/i7l1Gf1l.png)

* Il existe différents types de services:

  - **node port**   
    Type de service pour exposer des pods à d'autres pods.
    Rend un pod accessible sur un port du noeud

  - **cluster IP**  
    Type de service pour exposer des pods à l'extérieur.
    Crée une adresse virtuelle à l'intérieur du cluster pour permettre la communication entre différents pods

  - **load balancer**  
    Type de service pour exposer et loadbalancer des pods.
    Fournit un load balancer — uniquement pour les fournisseurs de cloud supportés

  ![](https://i.imgur.com/sjhCo7O.png)

---

## ClusterIP

* Si on a une application web qui contient plusieurs noeuds pour le front, back et base de données, il faut établir une connectivité entre eux pour que ces serveurs puissent communiquer.

  Les pods ont une adresse IP qui leurs sont attribués mais ces adresses ne sont pas statiques et les pods peuvent tomber en panne à tout moment et démarrer avec de nouvelles adresses IP. On ne peut donc pas compter sur les adresses IP pour la communication interne entre les applications.

* Un service Kubernetes ClusterIP permet de regrouper des pods sous une interface unique. Les demandes adressées au service seront transmises à l'un des pods au hasard. Ça permet de déployer facilement et efficacement une application basée sur des microservices sur un cluster Kubernetes.

  Chaque service se voit attribuer une adresse IP et un nom à l'intérieur du cluster.  
  C'est ce nom qui doit être utilisé par les autres pods pour accéder au service.

  ![](https://i.imgur.com/T1mvA6wl.png)

### Fichier de définition

* Le service contient une liste de ports — on peut définir plusieurs mapping de port, qui seront gérés par le même service.  
  Pour chaque mapping, `port` spécifie le port sur lequel le service écoute et `targetPort` spécifie le port sur lequel l'application du pod écoute.

  ``` yml
  apiVersion: v1
  kind: Service
  metadata:
    name: back-end
  spec:
    type: ClusterIP
    ports:
      - targetPort: 80
        port: 80
    selector:
      app: myapp
      type: back-end
  ```

  ![](https://i.imgur.com/sAx7wmJ.png)

* On utilise un sélecteur pour lier le service à un ensemble de pods.  
  Dans un environnement de production, on a plusieurs instances en cours d'exécution — pour des raisons de haute disponibilité et d'équilibrage de charge. Et toutes ont les mêmes labels. Lorsqu'il a une requête à transmettre, le service sélectionne aléatoirement un des pods correspondant au label qui lui est affecté.

  Si les pods sont distribués sur plusieurs noeuds et qu'on crée un service, Kubernetes crée un service qui s'étend sur les différents noeud sans qu'on ait à faire quoi que soit de plus. Quand des pods sont ajoutés ou supprimés, le service est automatiquement mis à jour, ce qui le rend très flexible et adaptable.

### Créer un service pour un pod existant

* Pour créer un service:

  ``` bash
  $ kubectl create -f service-definition.yml
  service "back-end" created
  ```

* De manière impérative:  
  Créer un service nginx de type clusterIP qui expose le port 8080 des containers au port 80 du service pour les requêtes TCP. Pas d'option pour définir le sélecteur, le service ne sera connecté à aucun pod

  ``` bash
  $ kubectl create service clusterip nginx --tcp=8080:80
  service/nginx created
  ```

  Définir le sélecteur du service nginx, correspondant aux pods qui ont le label app=myapp:

  ``` bash
  kubectl set selector nginx app=myapp
  ```

* Ou directement, exposer le pod nginx en créant un service nginx-service de type ClusterIP qui expose le port 8080 du pod au port 80 du service pour les requêtes TCP. Le label du pod sera automatiquement utilisé comme sélecteur du service

  ``` bash
  kubectl expose pod nginx --name=nginx-service --type=ClusterIP --target-port=8080 --port=80 --protocol=TCP
  ```

### Créer un pod + service à la volée

* Lancer le pod httpd à partir de l'image nginx et exposer le port 8080 du container (sans créer de service)

  ``` bash
  # ajoute containerPort: 8080 au pod
  $ kubectl run nginx --image=nginx --port=8080
  pod/nginx created
  ```

* Lancer un pod "httpd" qui utilise l'image httpd:alpine, expose son port 8080 et crée le service clusterIP associé.  
  Le label du pod sera automatiquement utilisé comme sélecteur du service

  ``` bash
  # ajoute containerPort: 8080 au pod + crée un service
  $ kubectl run httpd --image=httpd:alpine --port=80 --expose
  service/httpd created
  pod/httpd created
  ```

### Lister

* On peut utiliser "services" ou "svc" pour faire court

  ``` bash
  $ kubectl get services
  NAME        TYPE       CLUSTER-IP      EXTERNAL-IP  PORT(S)  AGE
  kubernetes  ClusterIP  10.96.0.1       <none>       443/TCP  16d
  back-end    ClusterIP  10.106.127.123  <none>       80/TCP   2m
  ```

* On peut également voir les entrées possibles vers un pod avec "endpoint" ou "ep"

  ``` bash
  ➜ k get svc,ep -l run=my-static-pod
  NAME                         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
  service/static-pod-service   NodePort   10.99.168.252   <none>        80:30352/TCP   30s

  NAME                           ENDPOINTS      AGE
  endpoints/static-pod-service   10.32.0.4:80   30s
  ```

* Un ClusterIP expose `clusterIP/name:port`, qui est accessible dans le réseau interne aux pods

---

## Node port

* Un service *node port* mappe un port du pod à un port du noeud. Il y a 3 ports impliqués:

  - **targetPort**: le port du pod  
    C'est le port sur lequel le service web du pod tourne

  - **port**: le port du service  
    C'est le port qui expose le service au sein du cluster Kubernetes.  
    L'adresse IP du service est l'adresse IP du cluster, et accéder au cluster sur ce port permet d'accéder à un des pods associés à ce service — le trafic sera routé vers l'un des pods sélectionnés par le service sur la base de son algorithme de load balancing

  - **nodePort**: le port du noeud    
    C'est le port qui expose le service du pod à l'extérieur via l'adresse IP du noeud. Par défaut la plage valide est de 30000 à 32767.  

  ![](https://i.imgur.com/BkahE1wl.png)

### Fichier de définition

* Le service contient une liste de ports.  
  Pour chaque mapping, seul `port` est obligatoire: si targetPort est omis, ce sera la même valeur que port; et si nodePort est omis, un port libre dans l'intervalle 30000-32767 sera automatiquement alloué

  ``` yml
  apiVersion: v1
  kind: Service
  metadata:
    name: myapp-service
  spec:
    type: NodePort
    ports:
      - targetPort: 80
        port: 80
        nodePort: 30008
    selector:
      app: myapp
      type: front-end
  ```

  ![](https://i.imgur.com/BeKGtWJ.png)

### Créer

* On peut créer un service à partir du fichier de définition — comme tout objet

  ``` bash
  $ kubectl create -f service-definition.yml
  service/myapp-service created
  ```

* Ou impérativement:

  ``` bash
  $ kubectl create service nodeport nginx --tcp=80:80 --node-port=30080
  ```
  ``` bash
  $ kubectl expose pod nginx --port=80 --name nginx-service --type=NodePort
  ```
  ``` bash
  $ minikube service nginx --url
  http://192.168.99.100:31391
  ```

### Lister

* On peut utiliser get "services" ou "svc" pour faire court

  ``` bash
  #$ kubectl get services
  $ kubectl get svc
  NAME           TYPE       CLUSTER-IP     EXTERNAL-IP  PORT(S)       AGE
  kubernetes     ClusterIP  10.96.0.1      <none>       443/TCP       24h
  myapp-service  NodePort   10.101.76.121  <none>       80:30004/TCP  5s
  ```

* Un NodePort expose `clusterIP/name:port` (comme ClusterIP), qui est accessible dans le réseau interne aux pods.  
  Et il expose `nodeIP:nodePort`, qui donne accès au noeud depuis l'extérieur

  <pre>
    <img src="https://i.imgur.com/TDgvYU0.png" />
  </pre>
  <pre>
    <img src="https://i.imgur.com/2uHAA2t.png" />
  </pre>
  <pre>
    <img src="https://i.imgur.com/kFSMS9y.png" />
  </pre>

### Supprimer

``` bash
$ kubectl delete services hello-minikube
service "hello-minikube" deleted
```

---

## LoadBalancer

* Le service LoadBalancer permet d'équilibrer la charge entre différents noeuds.  
  Ça ne fonctionne qu'avec les plateformes cloud supportées; dans un environnement non supporté, tel que VirtualBox, le LoadBalancer aura le même effet qu'un NodePort

* Tout comme un NodePort, un LoadBalancer associe un numéro de port élevé (entre 30000 à 32767) qui permet d'accéder aux noeuds sélectionnés. Mais il envoit également une demande au fournisseur de cloud, comme Google Cloud Platform.

  Le cas échant, GCP déploit automatiquement un loadbalancer qui achemine le trafic entrant vers le service k8s. Ce loadbalancer a une adresse IP externe qui peut être fournie aux utilisateurs pour accéder à l'application, ou associée à un nom de domaine dans les entrées DNS.

  ![](https://i.imgur.com/94SKwCBl.png)

* Un LoadBalancer expose

  - `clusterIP/name:port` au réseau interne  
    Permet d'accéder à un service qui tourne sur des noeuds de cluster — redis:6379  

  - `nodeIP:nodePort` au réseau externe  
    Permet d'accéder à un service qui tourne sur des noeuds du cluster — 127.0.0.1:30030  

  - `loadBalancerIP:port` au réseau externe  
    Permet d'accéder à un service qui tourne sur des noeuds du cluster, avec load balacing — 127.0.0.1:443

  ```
  Exposition ClusterIp < NodePort < LoadBalancer
  ```

* Notons que chaque loadbalancer occasionne des coûts: en avoir plusieurs aura des conséquences sur la facture. Dans le cas où on veut héberger plusieurs applications dans le cluster, plutôt que de définir plusieurs loadbalancer et plusieurs entrées DNS, utiliser [ingress](k8s-ingress.md) — section dédiée plus tard.

### Fichier de définition

``` yml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  ports:
    - targetPort: 80
      port: 80
      nodePort: 30008
```

---

## Exemple

![](https://i.imgur.com/DEMJz09l.png)

1. Définir les différents pods

    <details>
      <summary>Une application python pour voter: <ins>voting-app-pod.yaml</ins></summary>

      <pre lang="yml">
        apiVersion: v1
        kind: Pod
        metadata:
          name: voting-app-pod
          labels:
            name: voting-app-pod
            app: demo-voting-app
        spec:
         containers:
           - name: voting-app
             image: kodekloud/examplevotingapp_vote:v1
             ports:
               - containerPort: 80
      </pre>
    </details>

    <details>
      <summary>Un broker pour stocker les votes (temporairement) avant traitement: <ins>redis-pod.yaml</ins></summary>

      <pre lang="yml">
        apiVersion: v1
        kind: Pod
        metadata:
          name: redis-pod
          labels:
            name: redis-pod
            app: demo-voting-app
        spec:
         containers:
           - name: redis
             image: redis
             ports:
               - containerPort: 6379
      </pre>
    </details>

    <details>
      <summary>Une worker pour traiter les votes et stocker le résultat en BDD: <ins>worker-app-pod.yaml</ins></summary>

      <pre lang="yml">
        apiVersion: v1
        kind: Pod
        metadata:
          name: worker-app-pod
          labels:
            name: worker-app-pod
            app: demo-voting-app
        spec:
         containers:
           - name: worker-app
             image: kodekloud/examplevotingapp_worker:v1
      </pre>
    </details>

    <details>
      <summary>Une BDD: <ins>postgres-pod.yaml</ins></summary>

      <pre lang="yml">
        apiVersion: v1
        kind: Pod
        metadata:
          name: postgres-pod
          labels:
            name: postgres-pod
            app: demo-voting-app
        spec:
         containers:
           - name: postgres
             image: postgres
             ports:
               - containerPort: 5432
             env:
              - name: POSTGRES_USER
                value: "postgres"
              - name: POSTGRES_PASSWORD
                value: "postgres"
      </pre>
    </details>

    <details>
      <summary>Une application js pour afficher les résultats: <ins>result-app-pod.yaml</ins></summary>

      <pre lang="yml">
        apiVersion: v1
        kind: Pod
        metadata:
          name: result-app-pod
          labels:
            name: result-app-pod
            app: demo-voting-app
        spec:
         containers:
           - name: result-app
             image: kodekloud/examplevotingapp_result:v1
             ports:
               - containerPort: 80
      </pre>
    </details><br>

2. Définir les différents services

    <details>
      <summary>Un ClusterIP pour exposer redis aux autres pods, en tant que "redis": <ins>redis-service.yaml</ins></summary>

      <pre lang="yaml">
      apiVersion: v1
      kind: Service
      metadata:
        name: redis
        labels:
          name: redis-service
          app: demo-voting-app
      spec:
        ports:
          - port: 6379
            targetPort: 6379
        selector:
          name: redis-pod
          app: demo-voting-app
      </pre>
    </details>

    <details>
      <summary>Un ClusterIP pour exposer postgres aux autres pods, en tant que "db": <ins>postgres-service.yaml</ins></summary>

      <pre lang="yaml">
      apiVersion: v1
      kind: Service
      metadata:
        name: db
        labels:
          name: postgres-service
          app: demo-voting-app
      spec:
        ports:
          - port: 5432
            targetPort: 5432
        selector:
          name: postgres-pod
          app: demo-voting-app
      </pre>
    </details>

    <details>
      <summary>Un NodePort pour permettre l'accès à l'application de vote de l'extérieur: <ins>voting-app-service.yaml</ins></summary>

      <pre lang="yaml">
      apiVersion: v1
      kind: Service
      metadata:
        name: voting-service
        labels:
          name: voting-app-service
          app: demo-voting-app
      spec:
        type: NodePort
        ports:
          - port: 80
            targetPort: 80
            nodePort: 30004
        selector:
          name: voting-app-pod
          app: demo-voting-app
      </pre>
    </details>

    <details>
      <summary>Un NodePort pour permettre l'accès à l'application de résultat de l'extérieur: <ins>result-app-service.yaml</ins></summary>

      <pre lang="yaml">
      apiVersion: v1
      kind: Service
      metadata:
        name: result-service
        labels:
          name: result-app-service
          app: demo-voting-app
      spec:
        type: NodePort
        ports:
          - port: 80
            targetPort: 80
            nodePort: 30005
        selector:
          name: result-app-pod
          app: demo-voting-app
      </pre>
    </details><br>

3. Mettre à jour les variables d'environnement de l'application pour qu'elle utilise le bon host

   ![](https://i.imgur.com/qFLHbFll.png)

4. Lancer les pods et services

    ``` bash
    $ kubectl create -f redis-pod.yml
    pod/redis-pod created
    $ kubectl create -f redis-service.yml
    service/redis created
    ...
    ```
    ``` bash
    $ kubectl get pods,svc
    NAME                READY  STATUS   RESTARTS  AGE
    pod/redis-pod       1/1    Running  0         9s
    pod/voting-app-pod  1/1    Running  0         4m1s

    NAME                    TYPE        CLUSTER-IP     EXTERNAL-IP  PORT(S)       AGE
    service/kubernetes      ClusterIP  10.96.0.1       <none>       443/TCP       2d4h
    service/redis           ClusterIP  10.110.47.42    <none>       6379/TCP      5s
    service/voting-service  NodePort   10.109.194.132  <none>       80:80004/TCP  108s
    ```

5. Pour éviter les temps d'arrêt, convertir chaque pod en déploiement.  
   Pour rappel, les déploiements créent des replicas et en plus, gèrent les rolling updates, gardent une trace des changements et permettent les rollbacks.

   ![](https://i.imgur.com/b5eX6d4.png)

   ``` bash
   $ kubectl create -f voting-app-deploy.yaml
   $ kubectl create -f voting-app-service.yaml

   $ kubectl create -f redis-deploy.yaml
   $ kubectl create -f redis-service.yaml

   $ kubectl create -f worker-app-deploy.yaml

   $ kubectl create -f postgres-deploy.yaml
   $ kubectl create -f postgres-service.yaml

   $ kubectl create -f result-app-deploy.yaml
   $ kubectl create -f result-app-service.yaml
   ```

   ![](https://i.imgur.com/WxMDCaM.png)