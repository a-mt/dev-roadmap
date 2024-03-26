---
title: Resources
category: Workflow, Containers, Kubernetes
---

* Chaque noeud a des ressources limitées en CPU et mémoire, et chaque pod placé sur un noeud consomme une partie de ces ressources. Le scheduler k8s choisit le noeud sur lequel sera placé chaque pod, en prenant en compte la quantité de resources requises par le pod et celles disponibles sur les noeuds pour identifier le meilleur noeud.

  S'il n'y a pas de noeuds avec une quantité de resources disponibles suffisante, le scheduler retarde le déploiement du pod, et le pod est en état Pending (= en attente).

  ![](https://i.imgur.com/VZSBKhi.png)

## Ressources d'un pod

### Requests

* On peut spécifier le CPU et la mémoire requis par un pod lors de sa création. Le scheduler utilise ces chiffres pour identifier le noeud sur lequel placer le pod. Cette quantité de ressources lui est garantie et dédiée.

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
  +    resources:
  +      requests:
  +        memory: "4Gi"
  +        cpu: 2
  ```

  1 CPU est équivalent à un coeur — 1 AWS vCPU, 1GCP Core, 1 Azure Core, 1 Hyperthread.  
  La valeur minimale est 0.1, qui peut également exprimée comme 100m — où m signifie milli

### Limits

* Par défaut, un container n'a pas de limite quant aux ressources qu'il peut consommer.  
  On peut spécifier des limites avec la section limits, container par container

  ``` yml
  spec:
    containers:
    - ...
      resources:
        requests:
          memory: 1Gi
          cpu: 1
        limits:
          memory: 2Gi
          cpu: 2
  ```

* On peut modifier les ressources assignées à un déploiement impérativement:

  ``` bash
  kubectl set resources deployment nginx -c=nginx --limits=cpu=200m,memory=512Mi
  ```

* Lorsqu'un container tente d'utiliser le CPU au-delà de la limité spécifiée, le système utilise le ralentit (= CPU throttle) pour que le container ne dépasse pas la limite spécifiée. Il ne peut donc pas dépasser la limite spécifiée.

  Ce n'est pas le cas avec la mémoire: si un container tente d'utiliser plus de mémoire que sa limite, le pod sera terminé. On aura une erreur OOM (out of memory) dans les logs.

  ![](https://i.imgur.com/4cb66NY.png)

  ```
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  16s                default-scheduler  Successfully assigned default/elephant to controlplane
  Normal   Pulled     14s                kubelet            Successfully pulled image "polinux/stress" in 1.276294895s (1.276312756s including waiting)
  Normal   Pulling    13s (x2 over 15s)  kubelet            Pulling image "polinux/stress"
  Normal   Pulled     13s                kubelet            Successfully pulled image "polinux/stress" in 162.471043ms (162.481523ms including waiting)
  Normal   Created    13s (x2 over 14s)  kubelet            Created container mem-stress
  Normal   Started    13s (x2 over 14s)  kubelet            Started container mem-stress
  Warning  BackOff    11s (x2 over 12s)  kubelet            Back-off restarting failed container mem-stress in pod elephant_default(31b43487-893b-482b-9141-26abc1e32845)
  ```

### Requests vs Limits

* **0 requests 0 limits**  
  S'il n'y a ni requêtes ni limites, n'importe quel pod peut consommer toutes les ressources du noeud et faire crasher les autres pods en cours d'execution par manque de ressource

* **0 requests 1 limits**  
  S'il n'y a pas de requêtes mais des limites définies, k8 définit automatiquement les requêtes en fonction des limites. Les pods ont donc une quantité fixe de ressources qui leur est assigné, et ils ne peuvent pas en consommer plus

* **1 requests 1 limits**  
  Dans la même veine, s'il y a des requêtes et des limites, le pod a un nombre garantie de resources et peut aller jusqu'aux limites définies mais pas plus. Ça peut sembler idéal mais si un noeud contient plusieurs pods, et qu'un pod a besoin de plus de resources que prévu alors que le second ne les utilise pas, le premier pod crashera tout de même pour manque de ressources — qui étaient pourtant disponibles

* **1 requêsts 0 limits**  
  Si les requêtes sont spécifiées mais pas les limites, chaque pod dispose d'un ensemble de ressources garanti, et peut consommer autant de ressources que disponible

## LimitRange

* Un LimitRange permet de définir des valeurs par défaut de requêtes et de limites pour les pods crées sans les spécifier. Il s'applique au niveau du namespace

  ``` yml
  apiVersion: v1
  kind: LimitRange
  metadata:
    name: cpu-resource-constraint
  spec:
    limits:
    - type: Container
      default:
        cpu: 500m
      defaultRequest:
        cpu: 500m
      max:
        cpu: "1"
      min:
        cpu: 100m
  ```
  ``` bash
  kubectl get limitrange
  ```

  ![](https://i.imgur.com/I88PSFA.png)

* Notons que ces valeurs sont appliquées au moment de la création d'un pod: si on modifie le limitrange, ça n'affectera pas les pods existants

## ResourceQuota

* Pour limiter les ressources totales utilisées dans un namespace, on définit un ResourceQuota.

  ``` yml
  apiVersion: v1
  kind: ResourceQuota
  metadata:
    name: compute-quota
    namespace: dev
  spec:
    hard:
      pods: "10"
      requests.cpu: "4"
      requests.memory: 5Gi
      limits.cpu: "10"
      limits.memory: 10Gi
  ```
  ``` bash
  kubectl get resourcequota
  ```

  ![](Screenshot from 2024-01-29 13-29-08.png)
  ![](Screenshot from 2024-01-29 13-29-40.png)
