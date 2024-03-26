---
title: Network Policies
category: Workflow, Containers, Kubernetes
---

* Il y a deux types de trafic:

  - le traffic entrant, qu'on appelle *ingress*
  - et le traffic sortant, qu'on appelle *egress*

  ![](https://i.imgur.com/jg6yjg0m.png)

* Par défaut, k8s est configuré avec une politique "all allow",  
  qui autorise le traffic que n'importe quel pod vers n'importe quel autre pod ou service au sein du cluster.

  ![](https://i.imgur.com/QKu6MNal.png)

* Pn peut vouloir n'autoriser le trafic qu'entre certains pods. Par exemple, que le serveur front ne puisse pas directement communiquer avec la base de données — uniquement le back.
  Pour ce faire, on définit une politique réseau: un objet Kubernetes de type *NetworkPolicy*.

* Les politiques de réseau sont appliquées par la solution de réseau sur le cluster k8s.  
  Toutes les solutions de réseau ne les supportent pas.

  ![](https://i.imgur.com/Xi6M7Ee.png)

## NetworkPolicy

* Une politique réseau bloque tout traffic autre que celui explicitement autorisé.  
  Cette politique ne s'applique qu'aux pods sélectionnés (avec podSelector) et au type de trafic filtré (dans policyTypes).

### Fichier de définition

* L'allure générale d'une politique réseau est comme suit.  
  - podSelector: appliquer la politique réseau sur le pod sélectionné
  - policyTypes: filtrer le trafic entrant (ingress) et/ou sortant (egress)
  - ingress: autoriser le trafic entrant venant de ...
  - egress: autoriser le trafic sortant en direction de ...

  ``` yaml
  apiVersion: networking.k8s.io/v1
  kind: NetworkPolicy
  metadata:
    name: db-policy
  spec:
    podSelector:
      matchLabels:
        role: db
    policyTypes:
    - Ingress
    - Egress
    ingress:
    - ports:
      ...
      from:
      ...
    egress:
    - ports:
      ...
      to:
      ...
  ```

* On spécifie le trafic entrant autorisé dans la propriété ingress.  
  Exemple: bloquer tout trafic entrant sur le pod "db", sauf sur le port 3306 venant de "api-pod":

  ``` yaml
  policyTypes:
  - Ingress
  ingress:
  - ports:
    - protocol: TCP
      port: 3306
    from:
    - podSelector:
        matchlabels:
          name: api-pod
  ```

  ![](https://i.imgur.com/2Fwq1Fqm.png)

* On spécifie le trafic entrant autorisé dans la propriété egress.  
  Exemple: bloquer tout trafic sortant du pod “db”, sauf sur le port 80 allant vers une adresse IP dans la plage 192.168.5.10/32: 

  ``` yaml
  policyTypes:
  - Egress
  egress:
  - ports:
    - protocol: TCP
      port: 80
    to:
    - ipBlock:
        cidr: 
  ```

  ![](https://i.imgur.com/RZt48zml.png)

* Chaque politique contient une liste de règles: un OU s'applique entre ces règles.  
  Et chaque règle peut contenir plusieurs conditions: un ET s'applique entre ces conditions.

  <table>
    <thead>
      <tr>
        <td>Autoriser le traffic venant<br>
          du pod api-pod du namespace prod (prod.api-prod),<br>
          ou venant de 192.168.5.10/31</td>
        <td>Autoriser le traffic venant
          du pod api-pod,<br>
          ou d'un pod venant du namespace prod,<br>
          ou de 192.168.5.10/31</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td width="50%">
  <pre lang="yaml">- podSelector:
      matchLabels:
        name: api-pod
    namespaceSelector:
      matchLabels:
        name: prod
  - ipBlock:
      cidr: 192.168.5.10/31</pre>
          </td>
          <td width="50%">
  <pre lang="yaml">- podSelector:
      matchLabels:
        name: api-pod
  - namespaceSelector:
      matchLabels:
        name: prod
  - ipBlock:
      cidr: 192.168.5.10/31</pre>
        </td>
      </tr>
    </tbody>
  </table>

  <!--![](https://i.imgur.com/HhMq8LL.png)-->

* Conditions de filtrage:

  * sur un **pod**:

    ``` yaml
    podSelector:
      matchLabels:
        name: api-pod
    ```

  * sur un **namespace**:

    ``` yaml
    namespaceSelector:
      matchLabels:
        name: prod
    ```

  * sur une plage d'**adresse IP**:

    ``` yaml
    ipBlock:
      cidr: 192.168.5.10/32
    ```

### Lister

Utiliser la commande get "networkpolicy" ou "netpol" pour faire court

``` bash
$ kubectl get netpol
NAME             POD-SELECTOR   AGE
payroll-policy   name=payroll   36s
```

### Inspecter

``` bash
$ k describe netpol payroll-policy
Name:         payroll-policy
Namespace:    default
Created on:   2024-01-30 06:04:47 -0500 EST
Labels:       <none>
Annotations:  <none>
Spec:
  PodSelector:     name=payroll
  Allowing ingress traffic:
    To Port: 8080/TCP
    From:
      PodSelector: name=internal
  Not affecting egress traffic
  Policy Types: Ingress
```
