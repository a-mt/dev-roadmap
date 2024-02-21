---
title: Redirection Ingress
category: Workflow, Containers, Kubernetes
---

* Si on a plusieurs applications, et qu'on veut diriger l'utilisateur vers l'une ou l'autre suivant le path ou nom de domaine, traditionnellement on mettrait en place un reverse proxy tel que nginx. Sous k8s, on utilise ingress. Ce type d'objet permet de router différents services au sein du cluster en fonction de l'URL et ainsi permettre aux utilisateurs d'accéder aux différentes applications. Ingress n'est pas juste un load balancer, il est suffisamment intelligent pour surveiller le cluster k8s et configurer le serveur en fonction des nouvelles définitions ou ressources.

## Outils

* Le *controller ingress* est le logiciel qui s'occupe de rediriger le trafic.  
  Les *ressources ingress* sont l'ensemble des configurations qui permettent de définir le comportement du controller

* Un cluster k8s n'est pas livré avec un controller ingress par défaut. Ainsi, on pourra créer des ressources ingress mais la redirection de trafic ne fonctionnera pas tant qu'un controller n'est pas installé.

* Il y a différentes solutions pour ingress:  
  notamment GCE (solution de Google), nginx, contour, HA proxy, traefik ou istio.  
  GCE et nginx sont tout deux supportés et maintenus par le projet k8s.

  ![](https://i.imgur.com/H56rQG8l.png)

## Controller nginx

Un controller nginx peut être déployé comme n'importe quel autre déploiement dans k8s.  
Il s'agit d'une version spéciale de nginx, construite spécialement pour être utilisée en tant que contrôleur dans k8s.  
Notons que déployer un contrôleur se fait typiquement via Helm, la liste des étapes présentées ci-dessous ne sont que pour mieux comprendre ce qu'il se passe.

1. <ins>Créer un namespace</ins>  
   Pour isoler tous les objets ingress

   ``` bash
   $ k create namespace ingress-nginx
   namespace/ingress-nginx created
   ```

1. <ins>Créer un configmap</ins>  
   Même s'il ne contient rien dans un premier temps, il permettra à terme de modifier les configurations de nginx si nécessaire — comme l'emplacement des logs d'erreur. 

   ``` bash
   $ k create configmap ingress-nginx-controller -n ingress-nginx
   configmap/ingress-nginx-controller created
   ```

1. <ins>Créer deux comptes service</ins>  
   Le contrôleur surveille le cluster k8s pour configurer le serveur nginx lorsque quelque chose change.  
   Mais qu'il puisse le faire, il a besoin d'un compte service avec les bonnes permissions pour accéder à tous ces objets.

   ``` yaml
   $ k create serviceaccount ingress-nginx -n ingress-nginx
   serviceaccount/ingress-nginx created

   $ k create serviceaccount ingress-nginx-admission -n ingress-nginx
   serviceaccount/ingress-nginx-admission created
   ```

   Il est également nécessaire d'y associer les bons Roles, RoleBindings, ClusterRoles et ClusterRoleBindings

   ``` bash
   $ k get roles -n ingress-nginx
   NAME                      CREATED AT
   ingress-nginx             2024-01-31T08:06:16Z
   ingress-nginx-admission   2024-01-31T08:06:16Z
   ```

   ``` bash
   $ k get rolebindings -n ingress-nginx
   NAME                      ROLE                           AGE
   ingress-nginx             Role/ingress-nginx             2m9s
   ingress-nginx-admission   Role/ingress-nginx-admission   2m9s
   ```

1. <ins>Créer le controller</ins>
 
   ``` yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: nginx-ingress-controller
     namespace: ingress-nginx
   spec:
     replicas: 1
     selector:
       matchLabels:
         name: nginx-ingress
     template:
       metadata:
         labels:
           name: nginx-ingress
       spec:
         serviceAccountName: ingress-nginx
         containers:
           - name: nginx-ingress-controller
            image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.21.0
         args:
           - /nginx-ingress-controller
           - --configmap=${POD_NAMESPACE}/nginx-configuration
         env:
           - name: POD_NAME
             valueFrom:
               fieldRef:
                 fieldPath: metadata.name
           - name: POD_NAMESPACE            
             valueFrom:
               fieldRef:
                 fieldPath: metadata.namespace
         ports:
           - name: http
             containerPort: 80
           - name: https
             containerPort: 443
   ```

1. <ins>Créer un service</ins>  
   Pour exposer le controller au monde extérieur

   ``` yaml
   apiVersion: v1
   kind: Service
   metadata:
    name: ingress-nginx-controller
    namespace: ingress-nginx
   spec:
     type: NodePort
     ports:
     - port: 80
       targetPort: 80
       protocol: TCP
       name: http
     - port: 443
       targetPort: 443
       protocol: TCP
       name: https
     selector:
       name: nginx-ingress
   ```

![](https://i.imgur.com/ZuYMDQv.png)

[Installation with Manifests](https://docs.nginx.com/nginx-ingress-controller/installation/installing-nic/installation-with-manifests/#2-create-common-resources)

---

## Ressources Ingress

* Les ressources ingress sont créées à l'aide de fichiers de définition — tout comme pour créer des pods, déploiements, etc.  
  Un object Ingress contient une liste de règles spécifiant les redirections à effectuer.

### Fichier de définition

* Récupérer le nom du controller ingress

  ``` bash
  $ k get ingressclass
  NAME    CONTROLLER             PARAMETERS   AGE
  nginx   k8s.io/ingress-nginx   <none>       9m29s
  ```

* Pour une redirection suivant le path:

  ``` yaml
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    name: ingress-wear-watch
    namespace: app-space
  spec:
    ingressClassName: nginx  # k get ingressclass
    rules:
    - http:
        paths:
        - path: /wear
          pathType: Prefix
          backend:
            service:
              name: wear-service
              port:
                number: 8080
        - path: /watch
          pathType: Prefix
          backend:
            service:
              name: watch-service
              port:
                number: 8080
  ```

* Pour une redirection suivant l'hôte:

  ``` yaml
  ...
  spec:
    rules:
    - host: wear.my-onlone-store
      http:
        paths:
        - backend:
            service:
              name: wear-service
              port:
                number: 8080
  ```

* Pour réecrire le path envoyé au service:  
  utiliser l'annotation nginx.ingress.kubernetes.io/rewrite-target

  L'exemple suivant effectue un `replace("/something(/|$)(.*)", "/$2")`

  ``` diff
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
  + annotations:
  +   nginx.ingress.kubernetes.io/rewrite-target: /$2
     name: rewrite
     namespace: default
   spec:
     rules:
     - host: rewrite.bar.com
       http:
         paths:
         - backend:
             serviceName: http-svc
             servicePort: 80
  +       path: /something(/|$)(.*)
  ```

* Pour désactiver la redirection https, si SSL n'est pas activé:  
  utiliser l'annotation nginx.ingress.kubernetes.io/ssl-redirect

  ``` diff
   metadata:
  + annotations:
  +   nginx.ingress.kubernetes.io/ssl-redirect: "false"
  ```

### Créer

* Déclaratif

  ``` bash
  $ kubectl create -f ingress-wear-wach.yaml
  ```

* Impératif

  ``` bash
  $ k create ingress ingress-wear-watch -n app-space \
    --rule="/wear=wear-service:8080" \
    --rule="/watch=video-service:8080"
  ```

### Lister

``` bash
$ k get ingress --all-namespaces
NAMESPACE   NAME                 CLASS    HOSTS   ADDRESS        PORTS   AGE
app-space   ingress-wear-watch   <none>   *       10.104.68.81   80      2m31s
```

### Inspecter

``` bash
$ k describe ingress -n app-space
Name:             ingress-wear-watch
Labels:           <none>
Namespace:        app-space
Address:          10.104.68.81
Ingress Class:    <none>
Default backend:  <default>
Rules:
 Host        Path  Backends
 ----        ----  --------
 *           
             /wear    wear-service:8080 (10.244.0.4:8080)
             /watch   video-service:8080 (10.244.0.5:8080)
Annotations:  nginx.ingress.kubernetes.io/rewrite-target: /
             nginx.ingress.kubernetes.io/ssl-redirect: false
Events:
 Type    Reason  Age                  From                      Message
 ----    ------  ----                 ----                      -------
 Normal  Sync    43s (x3 over 2m55s)  nginx-ingress-controller  Scheduled for sync
```


### Exemple

* On a deux pods et deux services pour les exposer, et on veut configurer Ingress de manière à ce qu'accéder à  
  /video redirige vers webapp-video et /wear vers webapp-wear

  ``` bash
  $ k get pods -n app-space
  NAME                              READY   STATUS    RESTARTS   AGE
  default-backend-7845d8c4f-zk85z   1/1     Running   0          13m
  webapp-video-55fcd88897-2p8sj     1/1     Running   0          13m
  webapp-wear-554bbffcd6-fz7zk      1/1     Running   0          13m

  $ k get svc -n app-space
  NAME                   TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
  default-http-backend   ClusterIP   10.106.99.102    <none>        80/TCP     14m
  video-service          ClusterIP   10.102.212.229   <none>        8080/TCP   14m
  wear-service           ClusterIP   10.105.216.12    <none>        8080/TCP   14m
  ```

* Créer une ressource Ingress qui contient les deux règles.

  ``` bash
  $ k create ingress ingress-wear-watch -n app-space \
    --rule="/wear=wear-service:8080" \
    --rule="/watch=video-service:8080"
  ```

* Comme SSL n'est pas activé:  
   ajouter l'annotation `nginx.ingress.kubernetes.io/ssl-redirect: "false"` pour désactiver la redirection https.  

   Comme on veut rediriger URL/path vers service/path et non service/:  
   ajouter l'annotation `nginx.ingress.kubernetes.io/rewrite-target: /` — effectuera un replace("/path","/")

   ``` bash
   $ k edit ingress ingress-wear-watch -n app-space
   ...
   metadata:
     ...
     annotations:
       nginx.ingress.kubernetes.io/rewrite-target: /
       nginx.ingress.kubernetes.io/ssl-redirect: "false"
   ```

* Tester

   ``` bash
   $ curl 10.104.68.81/wear
   <!doctype html>
   <title>Hello from Flask</title>
   <body style="background: #2980b9;">

   <div style="color: #e4e4e4;
       text-align:  center;
       height: 90px;
       vertical-align:  middle;">
       <img src="https://res.cloudinary.com/cloudusthad/image/upload/v1547052428/apparels.jpg">
   </div>    
   </body>
   ```
