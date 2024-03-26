---
title: Admission Controller
category: Workflow, Containers, Kubernetes
---

## Types de contrôleurs d'admission

* À chaque fois qu'on lance une requête kubectl, cette requête est envoyé au serveur API. Elle y passe par un processus d'authentification, d'autorisation, et passe par des contrôleurs d'admission avant que la requête ne soit exécutée.

* Il y a deux grandes catégories de contrôleurs:

  * <ins>*Mutating Controller*</ins>:
    Modifient les requêtes ou effectuent des actions.  
    Par exemple, pour ajouter une propriété avec la valeur par défaut si elle n'est pas spécifiée.

  * <ins>*Validating Controller*</ins>:
    Valident les requêtes.  
    Si un des contrôleur d'admission rejette la requête, alors la requête échoue.

  Les contrôleurs d'admission, qui modifient les requêtes, sont appelés en premier  
  et suivis des contrôleurs de validation, qui valident les requêtes

* Il existe un certain nombre de controller d'admission installés par défaut:

  - **AlwaysPullImages**  
    S'assure qu'à chaque fois qu'un pod est crée, les images sont toujours téléchargées

  - **DefaultStorageClass**  
    Observe la création de PVC et ajoute le storageClass par défaut si non spécifié

  - **EventRateLimit**  
    Fixer une limite au nombre de requêtes que le serveur API peut traiter à la fois — permet d'éviter le flooding

  - **NamespaceExists** (déprécié)  
    Rejette les requêtes vers des namespaces qui n'existent pas

  - **NamespaceAutoProvision** (déprécié)  
    Crée automatiquement le namespace d'une requête s'il n'existe pas

  - **NamespaceLifecycle**:  
    NamespaceExists et NamespaceAutoProvision sont tout deux dépréciés à profit du contrôleur NamespaceLifecycle.  
    Il s'assure que les requêtes vers des namespaces inexistants sont rejetées, et que les namespaces par défaut tels que default, kubesystem et kube-public ne peuvent pas être supprimés.
    Ce contrôleur est activé par défaut.

  ![](https://i.imgur.com/FOKnPB2.png)

## Contrôleurs activés

* Sur le noeud master, on peut lister les contrôleurs d'admission activés:

  ``` bash
  kube-apiserver -h | grep enable-admission-plugins
  ```

* Sur le cluster k8s, pour éxécuter la commande:

  ``` bash
  $ kubectl exec kube-apiserver-controlplane -n kube-system -- kube-apiserver -h
  ```

  ![](https://i.imgur.com/rySoXpd.png)

## Activer un contrôleur

* Pour activer des contrôleurs non activés par défaut:  
  utiliser l'option `--enable-admission-plugins` du serveur KubeAPI

  ```
  --enable-admission-plugins=NodeRestriction,NamespaceAutoProvision
  ```

* Pour désactiver des contrôleurs:  
  utiliser l'option `--disable-admission-plugins`

  ```
  --disable-admission-plugins=DefaultStorageClass
  ```

  ![](https://i.imgur.com/AueMJg2.png)

## Créer un contrôleur personnalisé

On peut ajouter des contrôleurs personnalisés avec un webhook.

![](https://i.imgur.com/w3BgiYa.png)

### Implémenter l'API

* La première étape consiste à implémenter les endpoints que Kubernetes va appeler.  
  La seule exigence est d'avoir un serveur web capable d'accepter les appels API **mutate** et **validate** et d'y répondre avec l'objet JSON que le webhook attend

  - le endpoint `validate` reçoit la demande de validation.  
    Dans l'exemple suivant, il compare le nom de l'objet et le nom de l'utilisateur qui a envoyé la requête, et rejette la requête s'il s'agit du même nom

  - le endpoint `mutate` renvoit une réponse en JSON qui demande d'effectuer une opération.  
    Ici *patch* ajoute le nom de l'utilisateur comme label dans les metadatas

  ![](https://i.imgur.com/fiwDUVf.png)

  [Exemple en Go](https://github.com/kubernetes/kubernetes/blob/v1.13.0/test/images/webhook/main.go)

* Pour le déployer le serveur, on peut l'héberger en dehors du cluster k8s,  
  ou alors le faire tourner en tant que pod — auquel cas il faudra l'exposer avec un service.

  ![](https://i.imgur.com/sjtByf2m.png)

### Configurer le webhook

* Configurer le webhook avec un objet *ValidatingWebhookConfiguration* pour un webhook de validation  
  — ou MutatingWebhookConfiguration pour une modification

  ``` yaml
  apiVersion: admissionregistration.k8s.io/v1
  kind: ValidatingWebhookConfiguration
  metadata:
    name: "pod-policy.example.com"
  webhooks:
  # Serveur externe
  - name: "external-server.example.com"
    clientConfig:
      url: "https://external-server.example.com"
    rules:
      ...
  # Service au sein du cluster
  - name: "internal-pod.example.com"
    clientConfig:
      service:
        namespace: "webhook-namespace"
        name: "webhook-service"
      caBundle: "Ci0t..."
    rules:
      ...
  ```

  ![](https://i.imgur.com/C39Sp9o.png)

* Une configuration peut contenir plusieurs webhooks.  
  Chaque webhook contient une liste de règles, qui spécifie quel appel doit être effectué à quel moment. Ici, un appel est envoyé au service à chaque fois qu'un pod est crée, et en fonction de la réponse la requête sera autorisée ou rejetée

    ``` yaml
    rules:
    - apiGroups: [""]
      apiVersions: ["v1"]
      operations: ["CREATE"]
      resources: ["pods"]
      scope: "Namespaced"
    ```
