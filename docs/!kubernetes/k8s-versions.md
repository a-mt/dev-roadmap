---
title: API Versions
category: Workflow, Containers, Kubernetes
---

## Types de versions

* On trouve 3 grandes catégories de versions d'API:

  - **alpha**, ex: v1alpha1 — 1er alpha de la v1    
    Quand une API est développée et ajoutée dans la codebase de k8s pour la première fois, son nom contient alpha.  
    Une version alpha n'est pas forcemment testée de bout en bout et n'est pas très fiable, elle peut même être abandonnée sans préavis. Cette version n'est destinée qu'aux personnes désireuses de tester et donner des premiers retours d'expérience.

  - **beta**, ex: v1beta1  
    Une fois que l'API est testée de bout en bout et que tous les bugs majeurs ont été corrigés, la version passe en beta.  
    Comme il ne s'agit pas d'une version stable, il peut encore y avoir des bugs mineurs; en revanche, il y a un engagement à ce que l'API passe éventuellement en v1

  - **stable**, aussi appelé GA (pour *generally available*), ex: v1  
    Après avoir été en phase beta pendant quelques mois, la version stable sort. À ce moment, le numéro ne contient plus alpha ni beta.
    Cette version est très fiable et sera supportée et présente dans de nombreuses versions à venir.

  ![](https://i.imgur.com/zgumbUDl.png)

## Preferred version

* La plupart des groupes API sont des v1.  
  Mais ils peuvent prendre en charge plusieurs versions en même temps — comme la v1 et la v2alpha1.

* Une seule version est la version préférée.  
  Quand on lance une commande kubectl, comme create par exemple, la version préférée est utilisée.

## Storage version

* La version de stocakge est la version dans lequelle est un objet est stockée dans etcd,  
  indépendamment de la version utilisée dans le fichier yaml lors de la création de l'objet.

## Activer une version

* Pour activer une version qui n'est pas activée par défaut (une alpha),  
  il faut ajouter une option \-\-runtime-config à kube(apiserver) — et ensuite redémarrer le serveur

  ```
  --runtime-config=batch/v2alpha1
  ```

  ![](https://i.imgur.com/2GrGkqO.png)

## Dépréciation

* Les versions API sont dépréciées et supprimées au fur et à mesure que de nouvelles versions sont publiées. En dehors de la version la plus récente, les anciennes verions de l'API doivent continuer d'être prises en charge après leur dépréciation annoncée pour une durée d'au moins:

  - Alpha: 0 (peut être supprimée sans préavis)
  - Beta: 9 mois ou 3 versions (la plus longue des deux)
  - GA: 12 mois ou 3 versions (la plus longue des deux)

  ![](https://i.imgur.com/djrzflll.png)

## Kubectl convert

* Lorsque le cluster k8s est mis à jour, de nouvelles versions d'API sont ajoutées et d'anciennes sont dépréciées et supprimées. Ainsi, il est important de mettre à jour les versions dans les fichiers de manifeste existants.

* Pour convertir les anciens fichiers yaml en nouvelles versions, on peut utiliser kubectl convert.  
  Cette commande affichera à l'écran la nouvelle version du fichier YAML.

  ``` bash
  $ cat ingress-old.yaml 
  ---
  # Deprecated API version
  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata:
    name: ingress-space
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
  spec:
    rules:
    - http:
        paths:
        - path: /video-service
          pathType: Prefix
          backend:
            serviceName: ingress-svc
            servicePort: 80
  ```
  ``` bash
  $ kubectl-convert -f ingress.yaml --output-version networking.k8s.io/v1
  ---
  apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
    creationTimestamp: null
    name: ingress-space
  spec:
    rules:
    - http:
        paths:
        - backend:
            service:
              name: ingress-svc
              port:
                number: 80
          path: /video-service
          pathType: Prefix
  status:
    loadBalancer: {}
  ```

* Kubectl config est un plugin séparé, qui n'est pas nécessairement installé.  
  Pour l'installer, suivre [la documentation de k8s](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-kubectl-convert-plugin)

  ``` bash
  $ curl -LO https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl-convert

  $ ls
  kubectl-convert
  $ chmod +x kubectl-convert
  $ mv kubectl-convert /usr/local/bin/
  $ kubectl-convert --help
  ```
