---
title: Volumes
category: Workflow, Containers, Kubernetes
---

## Volume éphémère

* Les containers Docker sont de nature transitoire: les données qu'ils contiennent sont détruites en même temps que le container. Pour persister des données au delà de l'existance du container, on utilise des volumes. Même chose pour K8s

### Injecter

Le volume se déclare et se monte dans le fichier de déclaration des pods — ce qui est également vrai pour un replicaset et deployment.

* Déclarer le volume:

  ``` yaml
  volumes:
  - name: log-volume
    hostPath:
      path: /var/log/webapp
      type: Directory
  ```
  ``` yaml
  volumes:
  - name: app-config-volume
    configMap:
      name: app-config
  ```
  ``` yaml
  volumes:
  - name: webhook-tls-certs
    secret:
      secretName: webhook-server-tls
  ```

* Monter le volume dans un répertoire du container:

  ``` yaml
  containers:
  - name: ...
    volumeMounts:
    - mountPath: /log
      name: log-volume
  ```

  ![](https://i.imgur.com/19raGkW.png)

  ``` bash
  $ k create namespace webhook-demo
  namespace/webhook-demo created

  $ kubectl -n webhook-demo create secret tls webhook-server-tls \
      --cert "/root/keys/webhook-server-tls.crt" \
      --key "/root/keys/webhook-server-tls.key"
  secret/webhook-server-tls created

  $ cat webhook-deployment.yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: webhook-server
    namespace: webhook-demo
    labels:
      app: webhook-server
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: webhook-server
    template:
      metadata:
        labels:
          app: webhook-server
      spec:
        securityContext:
          runAsNonRoot: true
          runAsUser: 1234
        containers:
        - name: server
          image: stackrox/admission-controller-webhook-demo:latest
          imagePullPolicy: Always
          ports:
          - containerPort: 8443
            name: webhook-api
          volumeMounts:
          - name: webhook-tls-certs
            mountPath: /run/secrets/tls
            readOnly: true
        volumes:
        - name: webhook-tls-certs
          secret:
            secretName: webhook-server-tls

  $ k create -f webhook-deployment.yaml
  deployment.apps/webhook-server created

  ➜  k describe deployment webhook-server -n webhook-demo
  ...
  Pod Template:
    Labels:  app=webhook-server
    Containers:
     server:
      Image:        stackrox/admission-controller-webhook-demo:latest
      Port:         8443/TCP
      Host Port:    0/TCP
      Environment:  <none>
      Mounts:
        /run/secrets/tls from webhook-tls-certs (ro)
    Volumes:
     webhook-tls-certs:
      Type:        Secret (a volume populated by a Secret)
      SecretName:  webhook-server-tls
      Optional:    false
  ```

### Solutions de stockage

* Utiliser hostPath en production n'est pas recommendé: ce type de volume est utilisé pour monter un répertoire du noeud sur lequel le pod s'exécute. Si le pod change de noeud, ou même si plusieurs pods s'exécutent sur plusieurs noeuds, le contenu du répertoire monté ne sera pas le même. Il est nécessaire de créer ce répertoire au préalable sur le noeud

* Kubernetes supporte différentes solutions de stockage, telles que NFS, GlusterFS, Flocker, etc.  
  Ou des solutions de cloud public telles que AWS, Azure disk ou Google persistent disk.

  ![](https://i.imgur.com/hPm8HSn.png)

* Par exemple pour AWS, on utilise awsElasticBlockStore:

  ``` yaml
  volumes:
  - name: data-volume
    awsElasticBlockStore:
      volumeID: <volume-id>
      fsType: ext4
  ```

[Documentation storage](https://kubernetes.io/docs/concepts/storage)

---

## Volume persistent

### Persistent Volume

* Précédemment, les volumes étaient déclarés directement dans le fichier de déclaration des pods.  
  Ça suppose que l'espace ait été provisionné au préalable, mais qu'il ne sera configuré que lorsqu'on crée un pod.

* Une autre manière de s'y prendre est

  1. <ins>Créer un espace de stockage</ins>  
     Déclarer un objet de type *PersistentVolume* (PV) en amont, qui déclare les caractéristiques du volume.  
     Ce volume pourra ensuite être réclamé — si ses caractéristiques correspondent à celles demandées.

  2. <ins>Revendiquer cet espace</ins>  
     Une fois qu'un PersistentVolume est créé, il est possible de le réclamer via un *PersistentVolumeClaim* (PVC).

  3. <ins>L'utiliser en tant de volume</ins>  
     Utiliser le PVC en tant que volume dans les fichiers de définition des pods

  ![](https://i.imgur.com/fIhQxhy.png)

### Persistent Volume Claims

* Un PersistentVolume est lié à un et un seul PersistentVolumeClaim.

  ![](https://i.imgur.com/kDIlvAUl.png)

* Pendant le processus de liaisons, k8s essaie de trouver un volume qui a des caractéristiques suffisantes pour répondre à la demande — en terme de mode d'accès, quantité d'espace, etc.
  Une demande plus petite peut être liée à un volume plus grand si tous les autres critères correspondent et qu'il n'y a pas de meilleure option.

  ![](https://i.imgur.com/fMszTb0m.png)

* S'il n'y a pas de volume disponible, le PVC reste en attente (Pending) jusqu'à ce que de nouveaux volumes soient mis à disposition sur le cluster — et à ce moment là, la demande est automatiquement liée au nouveau volume disponible.

### Déclarer un PV

* Même principe que pour un volume: différentes solutions de stockage sont supportées.  
  Le format pour les déclarer est le même

  ``` yaml
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: pv-log
  spec:
    accessModes:
    - ReadWriteMany
    capacity:
      storage: 100Mi
    hostPath:
      path: /pv/log
    persistentVolumeReclaimPolicy: Retain
  ```

  ![](https://i.imgur.com/SeZ5OcP.png)

* Ce qu'il advient du PV lorsque le PVC est supprimé est déterminé par la propriété persistentVolumeReclaimPolicy:

  - **Retain** (par défaut)  
    Le PV existe toujours et devra être supprimé manuellement par l'administrateur.  
    Il n'est pas disponible pour être réutilisé par d'autres PVC

  - **Delete**  
    Quand la PVC est supprimée, le PV est également supprimé automatiquement.  
    Permet de libérer l'espace disque sur le périphérique de stockage final.

  - **Recycle**  
    Les données du PV sont nettoyées.  
    Chose faite, le PV est remis à la disposition d'autres PVC.

### Lister les PV

On utilise get "persistentvolume" ou "pv" pour faire court

``` bash
$ k get pv
NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-log   100Mi      RWX            Retain           Available                                   2m38s
```

### Déclarer un PVC

``` yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: claim-log-1
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 50Mi
```

### Lister les PVC

On utilise la commande get "persistentvolumeclaim" ou "pvc" pour faire court

``` bash
$ k get pvc
NAME          STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
claim-log-1   Pending                                                     18s
```
``` bash
$ kubectl get pvc
NAME          STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
claim-log-1   Bound    pv-log   100Mi      RWX                           21s
```

### Injecter un PVC

Déclarer et monter le volume sur un pod reste très similaire, à la différence près qu'on déclare le volume avec `persistentVolumeClaim`

* Déclarer:

  ``` yaml
  volumes:
  - name: log-volume
    persistentVolumeClaim:
      claimName: myclaim
  ```

* Monter le volume dans un répertoire du container comme d'habitude:

  ``` yaml
  containers:
  - name: ...
    volumeMounts:
    - mountPath: /log
      name: log-volume
  ```

### Inspecter un PVC

``` bash
$ k describe pvc claim-log-1 
Name:          claim-log-1
Namespace:     default
StorageClass:  
Status:        Pending
Volume:        
Labels:        <none>
Annotations:   <none>
Finalizers:    [kubernetes.io/pvc-protection]
Capacity:      
Access Modes:  
VolumeMode:    Filesystem
Used By:       <none>
Events:
  Type    Reason         Age               From                         Message
  ----    ------         ----              ----                         -------
  Normal  FailedBinding  1s (x7 over 85s)  persistentvolume-controller  no persistent volumes available for this claim and no storage class is set
```

On peut voir ici que le PVC est en état "Pending" parce qu'aucun PV avec les caractéristiques demandées n'a été trouvé

### Supprimer

``` bash
$ k delete pvc myclaim
persistentvolumeclaim "myclaim" deleted
```

Si on essaie de supprimer un pvc utilisé par un pod, le pvc reste bloqué en état Terminating

``` bash
$ k get pvc
NAME          STATUS        VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
claim-log-1   Terminating   pv-log   100Mi      RWX                           8m26s
```

---

## Provisioning

### Static

* Chaque fois qu'une application a besoin de stockage, on doit d'abord provisionner manuellement un disque (par exemple sur Google Cloud) puis créer manuellement un PersistentVolume avec le nom du disque.  
  Il s'agit ici d'un *provisionnement statique*

  ![](https://i.imgur.com/5TMTFts.png)

### Storage classes

* On peut vouloir que le volume soit provisionné automatiquement lorsque l'application en a besoin.  
  C'est ce que permet l'objet *StorageClass*: on définit le provisionnement à effectuer automatiquement lorsqu'une demande est faite.

  ![](https://i.imgur.com/C0PbHXF.png)

* À la place de définir un PersistentVolume, on définit un StorageClass:

  ``` yaml
  apiVersion: storage.k8s.io/v1
  kind: StorageClass
  metadata:
    name: google-storage
  provisioner: kubernetes.io/gce-pd
  volumeBindingMode: WaitForFirstConsumer
  ```

* Et au niveau du PVC, on ajoute le nom du storage class:

  ``` diff
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: myclaim
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 500Mi
  +  storageClassName: google-storage
  ```

  Le Storage Class associé provisionne un nouveau disque de la taille requise par le PVC — sur le `provisioner` définit dans ses spécifications, par exemple GCP. Il crée ensemble un Persistent Volume et le lie au PVC. On notera donc qu'il y a toujours un PV, mais qu'on n'a pas à le définir et créer manuellement.

* Il existe différents fournisseurs possibles — GCE, AWS EBS, azure disk, etc. Pour chacun des fournisseurs, on peut passer des paramètres supplémentaires tel que le type de disque à provisionner. Ces paramètres sont spécifiques au fournisseur utilisé

  ![](https://i.imgur.cob/OsfRIzS.png)
