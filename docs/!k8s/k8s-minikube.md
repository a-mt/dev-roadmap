---
title: Minikube
category: Workflow, Containers, Kubernetes
---

## Minikube

* Installer tous les différents composants Kubernetes individuellement sur différents systèmes prendrait du temps et de l'effort. Pour les développeurs qui veulent juste jouer et apprendre kubernetes, il existe des solutions: minikube, microk8s, kubeadm. 

* Minikube fournit un utilitaire en ligne de commande qui télécharge automatiquement une image ISO, contenant tous les outils k8s et un cluster pré-configuré à un seul noeud; et qui déploie automatiquement cette image sur une plateforme de virtualisation comme VirtualBox ou VMware fusion — ce qui permet de commencer avec k8s en quelques minutes.

  Notons qu'il est possible d'utiliser Minikube sans hyperviseur, directement sur l'hôte avec docker. Cette approche peut provoquer des problèmes de sécurité et des pertes de données: il est préférable de garder le cluster isolé du reste via un hyperviseur.

* Pour interagir avec le cluster kubernetes, il faut également avoir l'outil en ligne de commande kubectl d'installé

  ![](https://i.imgur.com/QK8H6Vw.png)

## Installation d'un hyperviseur

* S'assurer que la virtualisation est activée.  
  Si une sortie est affichée, c'est que la virtualisation est activée. Si ce n'est pas le cas, vérifier les paramètres du BIOS

  ```
  grep -E --color 'vmx|svm' /proc/cpuinfo
  ```

* Installer [VirtualBox](https://www.virtualbox.org/wiki/Linux_Downloads)

## Installation de kubectl

* kubeclt (prononcer *kube control*) est la commande qui permet de gérer des applications sur un cluster k8s — permet d'obtenir des informations sur le cluster, l'état des noeuds, déployer une application sur le cluster, etc.

* Vérifier si kubectl est installé:

  ``` bash
  $ kubectl version
  Client Version: v1.29.0
  Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
  Server Version: v1.29.0
  ```

* [Installer kubectl](https://kubernetes.io/docs/tasks/tools/)

## Installation de minikube

* [Installer minikube](https://minikube.sigs.k8s.io/docs/start/)

  ``` bash
  curl ...
  chmod +x minikube

  sudo mkdir -p /usr/local/bin
  sudo install minikube /usr/local/bin
  ```

* Créer un cluster k8s.  
  Minikube peut fonctionner avec différents outils de virtualisation,  
  pour créer un cluster Kubernetes spécifier quel hyperviseur utiliser:

  ``` bash
  minikube start --driver=virtualbox
  ```

* Ouvrir Virtualbox: l'image de minikube a dû être créée et être en train de tourner

  ![](https://i.imgur.com/7n1IzkVl.png)

* Vérifier qu'on peut interagir avec Kubernetes via le terminal, et que le master existe bien

  ``` bash
  $ minikube status
  minikube
  type: Control Plane
  host: Running
  kubelet: Running
  apiserver: Running
  kubeconfig: Configured

  $ kubectl get nodes
  NAME      STATUS  ROLES   AGE  VERSION
  minikube  Ready   master  88s  v1.18.3
  ```

  ![](https://i.imgur.com/1TYmgMyl.png)

## Tester Kubernetes

``` bash
# check the version of Kubernetes running on the nodes
$ kubectl version
Client Version: v1.29.0
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.29.0

# deploy an app
$ kubectl run hello-minikube

# view information about the cluster
$ kubectl cluster-info
Kubernetes control plane is running at https://172.30.1.2:6443
CoreDNS is running at https://172.30.1.2:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

# list all the nodes part of the cluster
$ kubectl get nodes
NAME           STATUS   ROLES           AGE    VERSION
controlplane   Ready    control-plane   7d7h   v1.29.0
node01         Ready    <none>          7d7h   v1.29.0
```
