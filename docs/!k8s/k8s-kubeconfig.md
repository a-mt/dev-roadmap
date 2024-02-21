---
title: KubeConfig
category: Workflow, Containers, Kubernetes
---

## Utilité

* Taper à chaque fois les informations d'authentification est fastidieux:

  ``` bash
  $ kubectl get pods
    --server my-kube-playground:6443
    --client-key admin.key
    --client-certificate admin.crt
    --certificate-authority ca.crt
  ```

* On peut déplacer ces informations dans un fichier de configuration  
  et passer l'emplacement du fichier de config en argument:

  ``` bash
  $ kubectl get pods
    --kubeconfig config
  ```

* Ou alors placer ce fichier de config à l'emplacement par défaut: <ins>~/.kube/config</ins>.  
  Il n'est ainsi plus nécessaire de spécifier ni les informations d'authentification ni le fichier de configuration:

  ``` bash
  $ kubectl get pods
  ```

## Contexte

A kubectl context contains connection information to a Kubernetes cluster. Different kubectl contexts can connect to different Kubernetes clusters, or to the same cluster but using different users or different default namespaces.

* Le fichier de configuration peut contenir non pas juste une configuration pour accéder au cluster k8s, mais plusieurs configurations pour accéder à de multiples clusters en changeant de contexte.

* Un contexte est une combinaison d'un cluster et d'informations d'identification de l'utilisateur. On peut basculer d'un contexte à l'autre via la ligne de commande, ce qui est pratique pour passer d'un environnement local à un cluster dans le cloud, ou passer d'un environnement de dev à un environnement de production par exemple.

* Lister les contextes:

  ``` bash
  $ kubectl config get-contexts
  ```

* Afficher le contexte en cours:

  ``` bash
  $ kubectl config current-context
  ```

* Changer de contexte:

  ``` bash
  $ kubectl config use-context prod-user@production
  ```

  ``` bash
  $ k config use-context --kubeconfig /root/my-kube-config research
  Switched to context "research".
  ```

## Fichier de définition

* Le fichier kubeconfig a 3 sections:

  - **clusters**:  
    Définit un cluster

  - **users**:  
    Définit un utilisateur et ses informations d'identification.  
    On peut soit spécifier l'emplacement du certificat avec `client-certificate`  
    ou alors le contenu du certiticat, encodé en base64, avec `client-certificate-data`

  - **contexts**:  
    Lie un utilisateur à un cluster

* Le contexte en cours (/ contexte par défaut) est spécifié dans la propriété `current-context`  
  Par exemple pour que l'utilisateur "kubernetes-admin" ait accès au cluster "kubernetes" (sans spécifier ses informations d'identification), en utilisant par le contexte par défaut "kubernetes-admin@kubernetes":

  ``` bash
  $ cat ~/.kube/config 
  apiVersion: v1
  kind: Config
  current-context: kubernetes-admin@kubernetes
  preferences: {}

  clusters:
  - name: kubernetes
    cluster:
      certificate-authority-data: LS0...
      server: https://controlplane:6443

  users:
  - name: kubernetes-admin
    user:
      client-certificate-data: LS0...
      client-key-data: LS0...

  contexts:
  - name: kubernetes-admin@kubernetes
    context:
      cluster: kubernetes
      user: kubernetes-admin
  ```

  ![](https://i.imgur.com/DuO2xMDl.png)

* Pour visualiser le fichier actuellement utilisé:

  ``` bash
  $ bash config view
  ```

  ![](https://i.imgur.com/VXMSabal.png)

* On peut également mettre à jour ou supprimer des éléments du fichier de configuration  
  en utilisant d'autres variantes de la commande kubectl config

  ![](https://i.imgur.com/cSxtPo3.png)
