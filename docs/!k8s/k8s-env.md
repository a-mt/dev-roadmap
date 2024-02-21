---
title: Environnement, configmap & secret
category: Workflow, Containers, Kubernetes
---

## Variable d'environnement

* Les variables d'environnement d'un container peuvent être  
  définies dans le fichier de définition avec la propriété env

  ``` diff
  apiVersion: v1
  kind: Pod
  metadata:
    name: simple-webapp-color
  spec:
    containers:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
  +   env:
  +     - name: APP_COLOR
  +       value: pink
  ```

  Ce qui reviendrait à lancer un container docker avec -e:

  ``` bash
  $ docker run -e APP_COLOR=pink simple-webapp-color
  ```

* On peut également exposer les données du pod au container via une variable d'environnement.  
  Par exemple avoir le nom du noeud où le pod est exécuté:

  ``` yaml
  env:
    - name: MY_NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    - name: MY_POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: MY_POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: MY_POD_IP
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
    - name: MY_POD_SERVICE_ACCOUNT
      valueFrom:
        fieldRef:
          fieldPath: spec.serviceAccountName
  ```

* Quand on a plusieurs fichiers de définition, ça peut devenir difficile de gérer les variables d'environnement individuellement dans chaque fichier. Pour éviter ça, on peut sortir la définition des variables d'environnement en dehors de la définition du pod, et la centraliser dans un ConfigMap.

* Si des variables d'environnement sont sensibles, comme des clés ou mots de passe, on peut également les centraliser dans un Secret — les valeurs de ces variables seront obfusquées.

---

## ConfigMap

Pour utiliser un ConfigMap, 1. le définir, 2. l'injecter dans le pod.

### Définir

``` yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: blue
  APP_CODE: prod
```

### Créer

* Déclaratif:

  ``` bash
  $ kubectl create -f pod-definition.yaml
  ```

* Impératif:

  ``` bash
  kubectl create configmap \
    app-config --from-literal=APP_COLOR=blue \
               --from-literal=APP_MODE=prod
  ```

  ``` bash
  kubectl create configmap \
    app-config --from-file=app_config.properties
  ```

  Note: un fichier properties contient uniquement une liste de variables d'environnements

  ```
  enemies=aliens
  lives=3
  enemies.cheat=true
  enemies.cheat.level=noGoodRotten
  secret.code.passphrase=UUDDLRLRBABAS
  secret.code.allowed=true
  secret.code.lives=30
  ```

### Injecter

* Toutes les variables:

  ``` diff
   apiVersion: v1
   kind: Pod
   metadata:
     name: simple-webapp-color
   spec:
     containers:
     - name: simple-webapp-color
       image: simple-webapp-color
       ports:
         - containerPort: 8080
  +    envFrom:
  +      - configMapRef:
  +          name: app-config
  ```

* Une seule variable:

  ``` yaml
  env:
    - name: APP_COLOR
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: APP_COLOR
  ```

* Le fichier:

  ``` yaml
  volumes:
  - name: app-config-volume
    configMap:
      name: app-config
  ```

### Lister

``` bash
$ kubectl get configmaps
NAME        DATA  AGE
app-config  2     3s
```

### Inspecter

``` bash
$ kubectl describe configmaps
Name:         app-config
Namespace:    default
Labels:       <none>
Annotations:  <none>

Data
====
APP_COLOR:
----
blue
APP_MODE:
----
prod
Events:  <none>
```

---

## Secret

Pour utiliser un Secret, 1. le définir, 2. l'injecter dans le pod.

### Définir

* Encoder les valeurs en base64

  ``` bash
  $ echo -n "mysql" | base64
  bXlzcWw=

  $ echo -n "root" | base64
  cm9vdA==

  $ echo -n "passwd" | base64
  cGFzc3dk
  ```

* Mettre les valeurs en base64 dans le fichier  
  Notons que les secrets ne sont pas cryptés, seulement encodés

  ``` yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: app-secret
  data:
    DB_Host: bXlzcWw=
    DB_User: cm9vdA==
    DB_Password: cGFzc3dk
  ```

### Créer

* Déclaratif

  ``` bash
  kubectl create -f secret-data.yaml
  ```

* Impératif

  ``` bash
  kubectl create secret generic \
    app-secret --from-file=app_secret.properties
  ```

  ``` bash
  kubectl create secret generic \
    app-secret --from-literal=DB_Host=mysql \
               --from-literal=DB_User=root \
               --from-literal=DB_Password=passwd
  ```

  ``` bash
  $ kubectl -n webhook-demo create secret tls webhook-server-tls \
      --cert "/root/keys/webhook-server-tls.crt" \
      --key "/root/keys/webhook-server-tls.key"
  secret/webhook-server-tls created
  ```

* Les différents types de secrets sont:

  ``` bash
  $ kubectl create secret --help
  Create a secret using specified subcommand.

  Available Commands:
    docker-registry Create a secret for use with a Docker registry
    generic         Create a secret from a local file, directory or literal value
    tls             Create a TLS secret
  ```

### Injecter

* Toutes les variables

  ``` diff
   apiVersion: v1
   kind: Pod
   metadata:
     name: simple-webapp-color
     labels:
       name: simple-webapp-color
   spec:
     containers:
     - name: simple-webapp-color
       image: simple-webapp-color
       ports:
         - containerPort: 8080
  +    envFrom:
  +      - secretRef:
  +          name: app-secret
  ```

* Une seule variable:

  ``` yml
  env:
    - name: DB_Password
      valueFrom:
        secretKeyRef:
          name: app-secret
          key: DB_Password
  ```

* Le fichier:  
  Si on monte le secret en tant que volume dans le pod, chaque attribut du secret est crée sous la forme d'un fichier dont le contenu est la valeur du secret

  ``` yml
  volumes:
  - name: app-secret-volume
    secret:
      secretName: app-secret
  ```

  ``` bash
  $ ls /opt/app-secret-volumes
  DB_Host  DB_Password  DB_User

  $ cat /opt/app-secret-volumes/DB_Password
  passwd
  ```

### Lister

``` bash
$ kubectl get secrets
NAME        TYPE    DATA  AGE
app-secret  Opaque  3     10m
```

### Inspecter

``` bash
$ kubectl describe secrets
Name:         app-secret
Namespace:    default
Labels:       <none>
Annotations:  <none>

Type: Opaque

Data
====
DB_Host:      10 bytes
DB_Password:  6 bytes
DB_User:      4 bytes
```

``` bash
$ kubectl get secret app-secret -o yaml
apiVersion: v1
data:
  DB_Host: bXlzcWw=
  DB_User: cm9vdA==
  DB_Password: cGFzc3dk
kind: Secret
metadata:
  creationTimestamp: 2018-10-18T10:01:18Z
  labels:
    name: app-secret
  name: app-secret
  namespace: default
uid: be96...
type: Opaque
```

``` bash
$ echo -n "bXlzcWw=" | base64 --decode
mysql

$ echo -n "cm9vdA==" | base64 --decode
root

$ echo -n "cGFzc3dk" | base64 --decode
passwd
```

### Note sur la Sécurité

* Les secrets ne sont pas encryptés dans etcd, toute personne capable de créer des pods/déploiements peut accéder aux secrets. Dans ce sens, ils ne sont pas sûrs. Les bonnes pratiques relatives à l'utilisation des secrets permettent de les rendre plus sûrs:

  - Ne pas enregistrer les fichiers de définition d'objets secret dans le code source
  - Activer le [chiffrement au repos](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) pour les secrets

  Également, la façon dont k8s gère les secrets:

  - Un secret n'est envoyé à un noeud que si un pod sur ce noeud en a besoin
  - Kubelet stocke le secret dans un tmpfs pour que le secret ne soit pas écrit sur le disque
  - Une fois le pod supprimé, Kubelet supprime sa copie locale des secrets

  Cela dit, il existe d'autres moyens plus efficaces de gérer les données sensibles: stocker les secrets en dehors de etcd, par exemple en utilisant des outils tels que Helm Secrets ou HashiCorp Vault
