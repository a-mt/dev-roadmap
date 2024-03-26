---
title: Taints & tolerations, Node affinity
category: Workflow, Containers, Kubernetes
---

## Taint & toleration

* Par défaut, le scheduler place les pods sur les noeuds de manière à équilibrer la charge. Si on veut restreindre l'accès d'un pod à un noeud, il faut définir une *taint* (teinte) sur le noeud et une *toleration* (tolérance) sur le pod. Par exemple si un noeud a une taint "bleu", ce noeud n'acceptera que les pods qui tolèrent le bleu

* Utilisé pour empêcher des pods non whitelistés d'être placés sur un noeud avec whitelist.  
  Ex: le noeud bleu n'accepte que les pods bleus

  N'empêche pas les pods whitelistés d'être placés sur d'autres noeuds.  
  Ex: un pod bleu peut être placé sur un autre noeud

### Ajouter une taint

``` bash
# kubectl taint nodes node-name key=value:taint-effect
$ kubectl taint nodes node01 spray=blue:NoSchedule
node/node01 tainted
```

* La dernière partie (*taint-effect*) décrit aux pods qui ne tolèrent pas cette teinte.  
  Il y a 3 effets possibles:

  - **NoSchedule**: le pod ne sera pas planifié sur le noeud
  - **PreferNoSchedule**: le système essaiere d'éviter de planifier le pod sur ce noeud, mais ce n'est pas garanti
  - **NoExecute**: un nouveau pod ne na pas planifié sur le noeud, et un pod existant sera expulsé s'il ne tolère pas la teinte

### Inspecter les taints

``` bash
$ kubectl describe node node01 | grep -i taint
Taints:             spray=blue:NoSchedule
```

### Retirer une taint

``` bash
$ kubectl taint nodes node01 spray=blue:NoSchedule-
node/node01 untainted
```

``` bash
$ k describe node controlplane | grep -i taint
Taints:             node-role.kubernetes.io/control-plane:NoSchedule

$ kubectl taint nodes controlplane node-role.kubernetes.io/control-plane:NoSchedule-
node/controlplane untainted

$ k describe node controlplane | grep -i taint
Taints:             <none>
```

### Ajouter une toleration

``` yaml
---
apiVersion: v1
kind: Pod
metadata:
name: bee
spec:
containers:
- image: nginx
  name: bee
tolerations:
- key: spray
  value: blue
  effect: NoSchedule
  operator: Equal
```

---

## Node selector

* Utilisé pour obliger des pods labelisés d'être placés sur les noeuds labelisés correspondants.  
  Ex: le pod bleu est placé sur le pod bleu

  N'empêche pas des pods sans labels d'être placés sur noeuds labelisés.  
  Ex: un autre pod peut être placé sur le pod bleu

* On voudrait placer le pod qui nécessite une plus grande puisance de calcul au noeud le plus puissance. Pour ce faire, 1. labeliser le noeud, 2. ajouter un sélecteur ou une affinité de noeud au pod

* Le *sélecteur* de noeud désigne un et un seul label. Pour des besoins plus complexes, comme "grand" OU "moyen", ou encore tout SAUF "petit", une utilise l'*affinité* de noeud.

### Ajouter un label

``` bash
# kubectl label nodes <node-name> <label-key>=<label-value>
$ kubectl label nodes node01 size=Large
```

### Retirer un label

``` bash
$ kubectl label nodes node01 size-
node/node01 not labeled
```

### Inspecter les labels

``` bash
$ kubectl get nodes --show-labels
NAME                     STATUS   ROLES    AGE   VERSION   LABELS
controller.example.com   Ready    master   25d   v1.19.9   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=controller.example.com,kubernetes.io/os=linux,node-role.kubernetes.io/master=
worker-1.example.com     Ready    <none>   25d   v1.19.9   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=worker-1.example.com,kubernetes.io/os=linux
worker-2.example.com     Ready    <none>   25d   v1.19.9   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=worker-2.example.com,kubernetes.io/os=linux
```

### Ajouter un nodeSelector

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: data-processor
    image: data-processor
  nodeSelector:
    size: Large
```

![](https://i.imgur.com/jntXsfw.png)

## Node affinity

### Ajouter une nodeAffinity

* L'affinité de noeud fournit des opérateurs avancés pour sélectionner les noeuds sur lesquels placer un pod — toujours en se basant sur le label du noeud.

  ``` yaml
  spec:
    affinity:
      nodeAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          nodeSelectorTerms:
          - matchExpressions:
            - key: size
              operator: In
              values:
              - Large
              - Medium
  ```
  ``` yaml
  ...
          - matchExpressions:
            - key: size
              operator: NotIn
              values:
              - Small
  ```
  ``` yaml
  ...
          - matchExpressions:
            - key: size
              operator: Exists
  ```

  ![](https://i.imgur.com/zwvkhpQ.png)

* Si l'affinité n'a pas pu correspondre à un noeud, ce qu'il arrive au pod est définit par la propriété-phrase sous nodeAffinity — comme par exemple requiredDuringSchedulingIgnoredDuringExecution. Il y a deux parties dans la propriété, associées à deux états dans le cycle de vie d'un pod:

  - **DuringScheduling**  
    Comportement au moment de l'assignation du pod à un noeud — lorsque le pod est créé pour la première fois.

    - requiredDuringScheduling  
      Oblige le scheduler à placer le pod sur un noeud qui respecte les règles d'affinité données. S'il n'en trouve pas, le pod n'est pas programmé

    - preferredDuringScheduling  
      Si un noeud correspondant aux règles d'affinité spécifiées n'est pas trouvé, le scheduler ignorera simplement ces règles et placera le pod sur n'importe quel noeud disponible

  - **DuringExecution**  
    Comportement lorsqu'un pod est en cours d'excecution et qu'un changement affectant l'affinité est effectué — par exemple si on supprime un label sur le noeud, que devrait-il advenir aux pods qui s'executent dessus?

    - ignoredDuringExecution  
      Tout changement dans l'affinité du noeud n'aura pas d'impact sur les pods en cours d'execution, ils continueront de fonctionner sur le noeud

    - requiredDuringExecution  
      Cette option n'existe pas encore mais devrait arriver.  
      Elle permettra d'expulser les pods qui tournent sur le noeud mais ne respectent pas les règles d'affinité

### podAffinity

* On peut aussi utiliser une affinité inter-pod: essayer de placer un pod sur le même noeud qu'un autre pod.  
  Ou à l'inverse, une "anti-affinité": l'idée étant de pouvoir placer un pod sur un noeud où un autre pod (d'un label spécifique) n'est pas déjà en cours d'exécution.

  ``` yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    creationTimestamp: null
    labels:<
      id: very-important
    name: deploy-important
    namespace: project-tiger
  spec:
    replicas: 3
    selector:
      matchLabels:
        id: very-important
    strategy: {}
    template:
      metadata:
        creationTimestamp: null
        labels:
          id: very-important
      spec:
        containers:
        - image: nginx:1.17.6-alpine
          name: container1
          resources: {}
        - image: google/pause
          name: container2
        affinity:                                             # add
          podAntiAffinity:                                    # add
            requiredDuringSchedulingIgnoredDuringExecution:   # add
            - labelSelector:                                  # add
                matchExpressions:                             # add
                - key: id                                     # add
                  operator: In                                # add
                  values:                                     # add
                  - very-important                            # add
              topologyKey: kubernetes.io/hostname             # add
  status: {}
  ```

---

## Taints & Tolerations vs Node Affinity

* On a 3 noeuds et 3 pods: bleu, rouge et vert.  
  Le but ultime est de placer le pod bleu sur le noeud bleu, le pod rouge sur noeud rouge, et le pod vert sur le noeud vert.  
  Il y a également d'autres pods et d'autres noeuds dans le cluster, et ne veut pas qu'un autre pod soit placé sur un noeud marqué, ni que nos pods marqués soient placés sur d'autres noeuds.

  ![](https://i.imgur.com/TAOGbzV.png)

* <ins>taints et tolerations</ins>  
  On applique une taint sur les noeuds pour les marquer avec leurs couleurs respectives — bleu, rouge et vert.  
  Et on applique une tolérance sur les pods pour tolérer les couleurs sur lesquelles on veut les placer.

  Les taints et tolerances ne garantissent pas que les pods ne soient pas placés sur d'autres noeuds que ceux qu'ils tolèrent, et le pod rouge est placé sur un noeud non marqué.

  ![](https://i.imgur.com/jLJ9BZf.png)

* <ins>node affinity</ins>  
  On labelise les noeuds avec leurs couleurs respectives — bleu, rouge et vert.  
  Et on définit des sélecteurs de noeuds sur les pods.

  Les pods colorés sont placés sur les bons noeuds, mais un pod non marqué est également placé sur un noeud marqué

  ![](https://i.imgur.com/yB8eDa3.png)

* <ins>combinaison des deux</ins>  
  Une combinaison des taints & tolerations et d'affinité de noeud peuvent être utilisés ensemble pour dédier complètement les noeuds à des pods spécifiques:

  - utiliser les taints et tolerations  
    pour empêcher les pods non colorés d'être placés sur un noeud coloré

  - utiliser l'affinité de noeud  
    pour obliger les pods colorés d'être placés sur un noeud coloré et pas ailleurs

  ![](https://i.imgur.com/TacG8V4.png)
