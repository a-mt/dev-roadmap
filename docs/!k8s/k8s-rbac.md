---
title: RBAC
category: Workflow, Containers, Kubernetes
---

## Sécurité

* Toutes les communication entre les différents composants,  
  tels que le etcd, le manager, le scheduler, le serveur API et les nodes, sont sécurisés à l'aide de TLS.

  ![](https://i.imgur.com/Ms7v8RIl.png)

* Pour assurer la sécurité, la première ligne de défense va être de controler l'accès aux machines elles-mêmes.  
  Tous les accès aux noeuds doivent être sécurisés, l'authentification root désactivée, l'authentification par mot de passe désactivée et seule l'authentification par clé SSH doit être disponible.  

  Et la communication entre les applications peut être restreinte à l'aide des NetworkPolicy.

* La seconde ligne de défense, va être de limiter qui a accès au cluster k8s et ce qu'il a le droit de faire — par exemple qui a le droit de créer des pods. Le serveur kube-api est au centre de tout, et est contrôlé par les mécanismes d'authentification et d'autorisation respectivement.

  ![](https://i.imgur.com/zifsLjOl.png)

* On peut accéder à l'API sur le noeud master, au port 6443 par défaut.

## Authentication

* Il existe différentes manières de s'authentifier auprès du serveur API:

  - basic: nom d'utilisateur et mot de passe
  - bearer token: nom d'utilisateur et token
  - certificats
  - fournisseur d'accès externe tel que LDAP
  - service account

* Ni l'authentification Basic ou Bearer token ne sont recommendés puisque non securisés.  
  Cette approche est d'ailleurs dépréciée dans la version 1.19 de K8s et n'est plus disponible dans les versions ultérieures.

### Certificat

* Pour accéder à l'API, il est nécessaire de s'identifier. On peut le faire en utilisant un certificat:

  ``` bash
  $ kubectl cluster-info
  Kubernetes control plane is running at https://172.30.1.2:6443
  CoreDNS is running at https://172.30.1.2:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

  $ curl https://172.30.1.2:6443/version \
    --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
    --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
    --cacert /etc/kubernetes/pki/ca.crt
  {
    "major": "1",
    "minor": "29",
    "gitVersion": "v1.29.0",
    "gitCommit": "3f7a50f38688eb332e2a1b013678c6435d539ae6",
    "gitTreeState": "clean",
    "buildDate": "2023-12-13T08:45:03Z",
    "goVersion": "go1.21.5",
    "compiler": "gc",
    "platform": "linux/amd64"
  }
  ```

  ![](https://i.imgur.com/8YafluDl.png)

* Quand on utilise kubectl, il n'est pas nécessaire de spécifier un certificat puisque  
  l'emplacement du certificat est sauvegardé dans un fichier de configuration (kubeconfig).

* Une solution alternative pour utiliser le certificat de kubectl tout en utilisant curl est de démarrer un proxy kubectl: la commande `kubectl proxy` lance un proxy localement, qui transmet les requêtes au serveur API en utilisant les informations d'identification et certificats du fichier kubeconfig.

  ``` bash
   $ kubectl proxy
  Starting to serve on 127.0.0.1:8001
  ^Z
  [1]+  Stopped                 kubectl proxy
  controlplane $ bg
  [1]+ kubectl proxy &
  controlplane $ curl http://127.0.0.1:8001/version
  {
    "major": "1",
    "minor": "29",
    "gitVersion": "v1.29.0",
    "gitCommit": "3f7a50f38688eb332e2a1b013678c6435d539ae6",
    "gitTreeState": "clean",
    "buildDate": "2023-12-13T08:45:03Z",
    "goVersion": "go1.21.5",
    "compiler": "gc",
    "platform": "linux/amd64"
  ```

  ![](https://i.imgur.com/oI42dqBl.png)

### Basic

Pour utiliser l'authentification Basic:

* Créer un fichier CSV avec 3 colonnes: password, username, userid.  
  On peut éventuellement avoir une 4ème colonne, qui spécifie le groupe de l'utilisateur

  ``` csv
  password123,user1,u0001
  password123,user2,u0002
  password123,user3,u0003
  password123,user4,u0004
  ```

  ``` csv
  password123,user1,u0001,group1
  password123,user2,u0002,group1
  password123,user3,u0003,group2
  password123,user4,u0004,group2
  ```

* Modifier les configurations de kube-apiserver  
  et ajouter l'option `--basic-auth-file=/tmp/users/user-details.csv` à la commande

  ``` bash
  $ vim /etc/kubernetes/manifests/kube-apiserver.yaml

  apiVersion: v1
  kind: Pod
  metadata:
    creationTimestamp: null
    name: kube-apiserver
    namespace: kube-system
  spec:
    containers:
    - command:
      - kube-apiserver
      - --authorization-mode=Node,RBAC
        <content-hidden>
      - --basic-auth-file=/tmp/users/user-details.csv
  ```

* Il faudra s'authentifier auprès du serveur en utilisant les credentials d'un utilisateur

  ``` bash
  curl -v -k https://localhost:6443/api/v1/pods -u "user1:password123"
  ```

  ![](https://i.imgur.com/pM5xCrWl.png)

  ![](https://i.imgur.com/DRKR74Vl.png)

### Bearer

* Même principe qu'une authentification Basic, créer un fichier CSV avec 3 ou 4 colonnes.  
  À la place du mot de passe mettre un token

  ``` csv
  token1,user1,u0001,group1
  token2,user2,u0002,group1
  token3,user3,u0003,group2
  token4,user4,u0004,group2
  ```

* Modifier les configurations de kube-apiserver  
  et ajouter l'option `--token-auth-file=/tmp/users/user-token-details.csv` à la commande

* Passer les credentials dans les entêtes

  ```
  curl -v -k https://localhost:6443/api/v1/pods --header "Authorization: Bearer token1"
  ```

  ![](https://i.imgur.com/E6xcMLg.png)

### Service account

* K8s ne gère pas les comptes utilisateur, il s'appuie sur une source externe telle qu'un fichier contenant les détails des utilisateurs, un certificat ou un service d'identité tel que LDAP. En revanche il gère les comptes service: on peut créer un service account directement via k8s.

  ![](https://i.imgur.com/N1lQYvBl.png)

---

## Autorisation

* Une fois authentifié, ce que l'utilisateur a le droit de faire ou non  
  est définit par les mécanismes d'autorisation.

  ![](https://i.imgur.com/iV5tWGSl.png)

* L'autorisation peut être mise en oeuvre à l'aide de

  - <ins>ABAC</ins> (attribute-based access control)  
    On attribue à un utilisateur ou à un groupe d'utilisateurs un ensemble de permissions via un fichier de configuration en JSON. Chaque fois qu'on veut apporter une modification, il faut éditer ce fichier manuellement et redémarrer le serveur KubeApi. Cette approche est peu pratique

  - <ins>RBAC</ins> (role-based access control)  
    On crée un rôle auquel on donne des permissions. Ensuite, on associe un utilisateur à un rôle. 
    Quand on veut apporter une modification, il suffit de modifier le rôle, ce qui se repércute immédiatement sur les utilisateurs. Cette approche est plus standard pour gérer les accès au sein du cluster Kubernetes

  - <ins>WEBHOOK</ins>  
    On externalise les mécanismes d'autorisation. Par exemple, Open Policy Agent est un outil tiers qui aide au contrôle d'admission et d'autorisation. On demande à k8s d'effectuer un appel API à l'agent avec les informations sur l'utilisateur et ses exigences d'accès. L'agent décide si l'utilisateur doit être autorisé ou non et c'est sur cette base que k8s accorde l'accès ou non

  - <ins>NODE</ins>  
    Toute requête provenant de l'utilisateur system-node et faisant partie du groupe system-nodes est autorisé et se voit accordé les privilèges requis pour kubelet

  - <ins>AlwaysAllow</ins>  
    Autorise toutes les demandes sans effectuer de contrôle d'autorisation
  
  - <ins>AlwaysDeny</ins>  
    Refuse toutes les requetes

  <!--[](https://i.imgur.com/ISgpsx7m.png)-->

### Configuration du mode d'autorisation

* Le mode d'autorisation utilisé est définit par l'option `authorization-mode` du serveur KubeAPI.  
  On peut activer plusieurs types en les séparant par des virgules.  
  Si non définit, la valeur par défaut est AlwaysAllow

  ![](https://i.imgur.com/EImw98s.png)

* Si plusieurs modes sont activés: les modes sont testés dans l'ordre.  
  Lorsqu'un mode refuse l'autorisation, le prochain mode est testé.  
  Et dès qu'un mode approuve la requête, l'utilisateur reçoit l'autorisation.

  ![](https://i.imgur.com/qYIjRyJm.png)

### API Groups

* Pour définir des permissions, la première chose à comprendre est la notion de groupes API (apiGroups).  
  Les dernières fonctionnalités k8s sont disponibles à travers des groupes nommés: par exemple NetworkPolicy fait partie du groupe networking.k8s.io. Les fonctionnalités historiques quant à elles ne sont pas dans un groupe nommé: on dit qu'elle font partie du groupe coeur.

  ![](https://i.imgur.com/Ya1zdUrm.png)
  ![](https://i.imgur.com/NmiMgSAl.png)

* Pour lister tous les groupes:

  ![](https://i.imgur.com/CArURCu.png)

* Pour retrouver les différentes ressources dans un groupe:

  ![](https://i.imgur.com/fKIgwmy.png)

### Role

* L'objet *Role* est la première étape pour le mode RBAC:  
  On crée un rôle et on lui donne des permissions d'effectuer des actions données sur des ressources données.  
  Un rôle peut contenir plusieurs règles et chaque règle contient 3 sections:

  - **apiGroups**: pour le groupe coeur, on le laisser vide; pour les autres groupes, spécifier son nom
  - **resources**: ressource sur laquelle on donne des droits
  - **verbs**: liste des actions que l'utilisateur aura le droit d'effectuer sur la ressource

  ``` yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    name: developer
  rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["list", "get", "create", "update", "delete"]
  - apiGroups: [""]
    resources: ["ConfigMap"]
    verbs: ["create"]
  ```

  ![](https://i.imgur.com/XdS1jakl.png)

* Les roles et (rolebindings) sont limité à un namespace. S'il n'est pas spécifié, alors il s'agit du namespace par défaut. On peut spécifier un namespace différent dans les metadata du fichier de définition

* Si on veut que l'utilisateur ait accès à certaines ressources mais pas toutes,  
  on peut ajouter une section **resourceNames** à la règle

  ``` yaml
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "create", "update"]
    resourceNames: ["blue", "orange"]
  ```

  ![](https://i.imgur.com/ErqLcoHl.png)

* On peut également créer un rôle via un eocmmande impérative:

  ``` bash
  $ kubectl create role developer --namespace=default --verb=list,create,delete --resource=pods
  role.rbac.authorization.k8s.io/developer created
  ```

#### Lister

``` bash
$ k get roles --all-namespaces
NAMESPACE     NAME                                             CREATED AT
blue          developer                                        2024-02-02T21:02:11Z
kube-public   kubeadm:bootstrap-signer-clusterinfo             2024-02-02T20:53:37Z
```

#### Inspecter

``` bash
$ k describe role kube-proxy -n kube-system
Name:         kube-proxy
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources   Non-Resource URLs  Resource Names  Verbs
  ---------   -----------------  --------------  -----
  configmaps  []                 [kube-proxy]    [get]
```

### RoleBinding

* L'objet *RoleBinding* permet d'assigner des rôles à des utilisateurs.  
  Il contient deux sections:
  - **subject**: spécifie les utilisateurs
  - **roleRef**: spécifie les rôles

  ``` yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: RoleBinding
  metadata:
    name: devuser-developer-binding
  roleRef:
    kind: Role
    name: developer
    apiGroup: rbac.authorization.k8s.io
  subjects:
  - kind: User
    name: dev-user
    apiGroup: rbac.authorization.k8s.io
  ```

  ![](https://i.imgur.com/WgZuPRVl.png)

* On peut également utiliser une commande:

  ``` bash
  $ k create rolebinding dev-user-binding --namespace=default --role=developer --user=dev-user
  rolebinding.rbac.authorization.k8s.io/dev-user-binding created
  ```

#### Lister

``` bash
$ k get rolebinding --all-namespaces
NAMESPACE   NAME               ROLE             AGE
blue        dev-user-binding   Role/developer   4m16s
```

#### Inspecter

``` bash
$ kubectl describe rolebinding kube-proxy -n kube-system
Name:         kube-proxy
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  Role
  Name:  kube-proxy
Subjects:
  Kind   Name                                             Namespace
  ----   ----                                             ---------
  Group  system:bootstrappers:kubeadm:default-node-token  
```

### Can I

* Pour vérifier si on est autorisé à effectuer une action:

  ``` bash
  $ kubectl auth can-i create deployments
  no
  ```

* Un administrateur peut vérifier pour un autre utilisateur avec l'action \-\-as:

  ``` bash
  # User
  $ kubectl auth can-i create deployments --as dev-user
  no
  ```
  ``` bash
  $ kubectl get pods --as dev-user
  Error from server (Forbidden): pods is forbidden: User "dev-user" cannot list resource "pods" in API group "" in the namespace "default"
  ```
  ``` bash
  # Serviceaccount
  $ kubectl auth can-i create deployments --as system:serviceaccount:ns1:pipeline
  no
  ```

  ![](https://i.imgur.com/6rVTVgu.png)

### ClusterRole

* Les Role et RoleBinding sont limités à un namespace.  
  Pour autoriser les utilisateurs à accéder à des ressources sans namespace (comme les volumes), ou pour autoriser les utilisateurs à accéder aux ressources de tout namespace, on utilise des ClusterRole et ClusterRoleBinding

  ![](https://i.imgur.com/ZTJCQ2Ll.png)

* La déclaration est la même à la différence près du type utilisé:

  ``` yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRole
  metadata:
    name: cluster-administrator
  rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["list", "get", "create", "delete"]
  ```
  ``` yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRoleBinding
  metadata:
    name: cluster-admin-role-binding
  subjects:
  - kind: User
    name: cluster-admin
    apiGroup: rbac.authorization.k8s.io
  roleRef:
    kind: ClusterRole
    name: cluster-administrator
    apiGroup: rbac.authorization.k8s.io
  ```

* Même chose pour les commandes:

  ``` bash
  $ k create clusterrole access-nodes --resource=nodes --verb=list,get
  clusterrole.rbac.authorization.k8s.io/access-nodes created
  ```
  ``` bash
  $ k create clusterrolebinding access-nodes --user=michelle --clusterrole=access-nodes
  clusterrolebinding.rbac.authorization.k8s.io/access-nodes created
  ```

### Ressources sans namespace

* Pour voir la liste des ressources avec ou sans namespace:

  ``` bash
  $ kubectl api-resources --namespaced=true
  $ kubectl api-resources --namespaced=false
  ```

  ![](https://i.imgur.com/C26Jj9yl.png)
