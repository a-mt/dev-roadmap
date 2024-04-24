---
title: ServiceAccount
category: Workflow, Containers, Kubernetes
---

## ServiceAccount

* Il y a deux types d'utilisateurs:  
  - les comptes utilisateur (*user account*), utilisés par les humains — dev, admin
  - et les comptes service (*service account*), utilisés par les machines

  ![](https://i.imgur.com/JsqolHMl.png)

### ServiceAccount par défaut

* Chaque espace de noms a un compte service par défaut — appelé default.  
  Chaque fois qu'un pod est crée, le compte service par défaut est assigné à ce pod et son token (JWT) est monté en tant que volume sur <ins>/var/run/secrets/kubernetes.io/serviceaccount</ins>

  ![](https://i.imgur.com/qftfkWt.png)

* Ce token peut être utilisé (avec une Authorization Bearer) pour appeler l'API Kubernetes. On sera limité à ce que le compte a le droit de faire et le compte service par défaut est très restreint, il a uniquement le droit d'exécuter des requêtes API k8s de base.

  ```
  curl http://192.168.56.70:6443/api -k --header "Authorization: Bearer eyJhbG..."
  ```

* Comme token est automatiquement monté en tant que volume, au lieu de copier-coller le token, on peut simplement le lire à partir du fichier

  ``` bash
  $ kubectl exec -it my-kubernetes-dashboard --ls /var/run/secrets/kubernetes.io/serviceaccount
  ca.crt  namespace  token
  ```

  ``` bash
  $ kubectl exec -it my-kubernetes-dashboard cat /var/run/secrets/kubernetes.io/serviceaccount/token
  eyJhbG...
  ```

### Créer

* Pour créer un compte service:

  ``` bash
  $ kubectl create serviceaccount dashboard-sa
  serviceaccount "dashboard-sa" created
  ```

* On peut ajouter des permissions supplémentaires pour le compte service nouvellement crée en utilisant [RBAC](k8s-rbac.md)

  ``` bash
  $ ls /var/rbac
  dashboard-sa-role-binding.yaml
  pod-reader-role.yaml

  $ cat /var/rbac/dashboard-sa-role-binding.yaml
  ---
  kind: RoleBinding
  apiVersion: rbac.authorization.k8s.io/v1
  metadata:
    name: read-pods
    namespace: default
  subjects:
  - kind: ServiceAccount
    name: dashboard-sa # Name is case sensitive
    namespace: default
  roleRef:
    kind: Role #this must be Role or ClusterRole
    name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
    apiGroup: rbac.authorization.k8s.io

  $ cat /var/rbac/pod-reader-role.yaml
  ---
  kind: Role
  apiVersion: rbac.authorization.k8s.io/v1
  metadata:
    namespace: default
    name: pod-reader
  rules:
  - apiGroups:
    - ''
    resources:
    - pods
    verbs:
    - get
    - watch
    - list
  ```

### Injecter

* Pour utiliser un compte service autre que celui par défaut, spécifier la propriété serviceAccountName sous spec

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: my-kubernetes-dashboard
  spec:
    containers:
      - name: my-kubernetes-dashboard
        image: my-kubernetes-dashboard
    serviceAccountName: dashboard-sa
  ```

  Notons qu'on ne peut pas modifier le compte service d'un pod existant, il faut le supprimer et le recréer. Par contre si c'est un déploiement on peut, puisque toute modification du fichier de définition du pod déclenchera automatiquement un nouveau dpéloiement. On peut également le faire de manière impérative:

  ``` bash
  $ kubectl set serviceaccount deploy/web-dashboard dashboard-sa
  ```

* Kubernetes monte automatiquement le compte de service par défaut si on n'en a pas spécifié explicitement. On peut empêcher le montage automatique en définissant la propriété automountServiceAccountToken: false

  ``` yaml
  apiVersion: v1
  kind: Pod
  metadata:
    name: my-kubernetes-dashboard
  spec:
    containers:
      - name: my-kubernetes-dashboard
        image: my-kubernetes-dashboard
    automountServiceAccountToken: false
  ```

### Lister

``` bash
$ kubectl get serviceaccount
NAME          SECRETS  AGE
default       1        218d
dashboard-sa  1        4d
```

### Inspecter

``` bash
$ kubectl describe serviceaccount dashboard-sa
Name:                dashboard-sa
Namespace:           default
Labels:              <none>
Annotations:         <none>
Image pull secrets:  <none>
Mountable secrets:   dashboard-sa-token-kbbdm
Tokens:              dashboard-sa-token-kbbdm
Events:              <none>
```

``` bash
$ kubectl describe secret dashboard-sa-token-kbbdm
Name:       dashboard-sa-token-kbbdm
Namespace:  default
Labels:     <none>

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  7 bytes
token:      eyJh...
```

### Créer un token

* Par le passé, lorsqu'un service account était créé, un token sans date d'expiration était automatiquement créé avec et lié au compte via un secret.

* Depuis la version 1.22, le token n'est plus un secret, à la place il est défini via l'API TokenRequest par le contrôleur, qui lui donne une date d'expiration, et ce token est monté en tant que volume projeté dans le pod.
  Et depuis la version 1.24, il faut créer le token manuellement — sa durée de vie est généralement d'une heure si non définie

  ``` bash
  $ kubectl create token dashboard-sa
  eyJhb...
  ```

  ![](https://i.imgur.com/bUbzpX4l.png)
  ![](https://i.imgur.com/2APZbCml.png)

* Si on souhaite conserver l'ancien fonctionnement, on peut toujours créer un secret avec token qui n'expire pas:

  ``` yml
  apiVersion: v1
  kind: Secret
  type: kubernetes.io/service-account-token
  metadata:
    name: mysecretname
    annotations:
      kubernetes.io/service-account.name: dashboard-sa
  ```

  ![](https://i.imgur.com/dA7NkXl.png)

* L'option `--service-account-extend-token-expiration=true` permet d'augmenter la durée des tokens jusqu'à 365 jours au lieu d'1 heure.

  ``` bash
  # 1 year
  kubectl create token cicd-user --duration=8760h
  ```
