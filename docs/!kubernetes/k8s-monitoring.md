---
title: Monitoring
category: Workflow, Containers, Kubernetes
---

## Outils

* Kubernetes n'est pas livré avec une solution de monitoring intégrée. Mais il existe des solutions — soit open-source comme metrics server, prometheus ou elk; ou propriétaire comme datadog et dynatrace.

  ![](https://i.imgur.com/C2wfIC0.png)

* Hipster était un des projets originaux qui permettait de mettre en place une surveillance et analyse du cluster k8s. Hipster est maintenant obsolète et une version allégée a créée, metrics server.

## Metrics server

* Metrics server récupère les mesures de chacun des noeuds et pods, les agrège et les stocke en mémoire. Puisque les données ne sont pas stockées sur le disque, il n'est pas possible de consulter les données de performance historiques, uniquement l'état actuel. Pour avoir un historique, il faut utiliser un outil de surveillance plus avancé.

* Un agent kubelet tourne sur chaque noeud et est responsable de la réception des instructions du master et de l'exécutions des pods sur son noeud.

  Kubelet contient également un sous-composant appelé cadvisor (pour container advisor), chargé de récupérer les mesures de performance des pods et de les exposer via l'API kubelet pour les mettre à disposition pour le master.

  ![](https://i.imgur.com/yWeNdX3.png)

### Installer

* Pour activer metrics server sur Minikube:

  ``` bash
  minikube addons enable metrics-server
  ```

* Pour les autres environnements:

  - cloner le code source

    ``` bash
    $ git clone https://github.com/kodekloudhub/kubernetes-metrics-server.git
    Cloning into 'kubernetes-metrics-server'...
    remote: Enumerating objects: 31, done.
    remote: Counting objects: 100% (19/19), done.
    remote: Compressing objects: 100% (19/19), done.
    remote: Total 31 (delta 8), reused 0 (delta 0), pack-reused 12
    Unpacking objects: 100% (31/31), 8.06 KiB | 1.61 MiB/s, done.
    $ ls
    kubernetes-metrics-server
    $ cd kubernetes-metrics-server
    $
    ```

  - déployer les composants k8s qui le constituent — ce qui déployera un ensemble de pods, services et rôles, qui permettent à metrics server de récupérer les métriques des noeuds et pods

    ``` bash
    $ kubectl create -f .
    clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
    clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
    rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
    apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
    serviceaccount/metrics-server created
    deployment.apps/metrics-server created
    service/metrics-server created
    clusterrole.rbac.authorization.k8s.io/system:metrics-server created
    clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
    ```

    ``` bash
    $ kubectl get all -n kube-system
    NAME                                       READY   STATUS    RESTARTS   AGE
    pod/metrics-server-fb9c7bc99-hhnkz         1/1     Running   0          71s

    NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
    service/metrics-server   ClusterIP   10.101.208.12   <none>        443/TCP   70s

    NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/metrics-server   1/1     1            1           71s

    NAME                                       DESIRED   CURRENT   READY   AGE
    replicaset.apps/metrics-server-fb9c7bc99   1         1         1       71s
    ```

* Après l'installation, attendre quelques minutes pour permettre au metrics server de récupérer et traiter les données.

### Top

* Pour visualiser les performances de chaque noeud:

  ``` bash
  $ k top node
  NOM           CPU(cores)  CPU%  MEMOIRE(octets)  MEMOIRE%   
  controlplane  213m        0%    1210Mi           0%        
  node01        19m         0%    337Mi            0%
  ```

* Pour visualiser les performances de chaque pod:

  ``` bash
  $ k top pod
  NAME       CPU(cores)   MEMORY(bytes)   
  elephant   15m          32Mi            
  lion       1m           18Mi            
  rabbit     105m         252Mi
  ```