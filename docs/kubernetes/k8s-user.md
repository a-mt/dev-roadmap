---
title: SecurityContext
category: Workflow, Containers, Kubernetes
---

## Utilisateurs

* Par défaut, docker exécute les processus des containers en tant que root.  
  On peut spécifier un utilisateur différent dans l'image

    ```
    FROM ubuntu
    USER 1000
    ```

    Ou au moment de lancer le container

    ``` bash
    docker run --user=1000 ubuntu sleep 1000
    ```

* Même principe au niveau de Kubernetes, on peut définir un utilisateur différent via la propriété securityContext, qui sera définie soit au niveau du container, soit au niveau du pod (pour être appliqué à tous les containers du pod).

  ``` yml
  apiVersion: v1
  kind: Pod
  metadata:
    name: multi-pod
  spec:
    securityContext:
      runAsUser: 1001

    containers:
    - image: ubuntu
      name: web
      command: ["sleep", "5000"]
      securityContext:
        runAsUser: 1002

    - image: ubuntu
      name: sidecar
      command: ["sleep", "5000"]
  ```

  Si un securityContext est spécifié au niveau du pod et du container, c'est celui du container qui l'emporte.  
  Par exemple ici, web s'execute en tant que 1002 et sidebar en tant que 1001

  ``` bash
  $ kubectl get po pod-with-defaults -o yaml | grep -A2 " securityContext:"
    securityContext:
      runAsUser: 1234
  ```

## Capabilities

* Contrairement aux VMs, un container docker n'est pas complètement isolé de son hôte: ils partagent le même noyau. Tous les processus exécutés par les containers sont en réalités exécutés sur l'hôte lui-même, mais dans leur propre espace de noms.  
  Pour ce qui est du container, il ne peut voir que ses propres processus, le processus principal aura donc l'ID de 1. Pour l'hôte, tous les processus des containers sont visibles mais avec un ID différents — les processus peuvent avoir des ID différents dans des espaces de noms différents.

  ![](https://i.imgur.com/Ucf7PA5.png)
  ![](https://i.imgur.com/60LripI.png)

* L'utilisateur root peut faire n'importe quoi, de même qu'un processus exécuté par root. Mais l'utilisateur root qui s'execute à l'intérieur de docker n'est pas réellement root: il dispose lui d'un ensemble limité de droits, il ne pourra par exemple pas redémarrer le système ou effectuer des opérations susceptibles d'interrompre d'autres processus. Ce résultat est obtenu grâce à l'usage de capabilities.

  ![](https://i.imgur.com/MVCHsFP.png)

* Docker permet de modifier les capabilities accroyées par défaut:

  - en fournissant des privilèges supplémentaires

    ``` bash
    docker run --cap-add MAC_ADMIN ubuntu
    ```

  - en enlevant des privilèges

    ``` bash
    docker run --cap-drop KILL ubuntu
    ```

  - ou en fournissant tous les privilèges

    ``` bash
    docker run --privileged KILL ubuntu
    ```

* On peut également effectuer ces actions avec Kubernetes via le securityContext — soit définit au niveau du pod, soit au niveau du container comme vu précédemment.

  ``` yml
  spec:
    containers:
      - name: ubuntu
        ...
        securityContext:
          runAsUser: 1000
          capabilities:
            add: ["MAC_ADMIN"]
  ```
  ``` yaml
        securityContext:
          allowPrivilegeEscalation: true
          capabilities:
            add:
            - NET_BIND_SERVICE
            drop:
            - ALL
  ```