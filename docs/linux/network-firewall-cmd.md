---
title: Firewall
category: Linux, Network
---

* Lorsqu'un ordinateur reçoit des paquets, soit

  - un programme les intercepte et les traite
  - ou aucun programme n'est configuré pour traiter ces paquets et ils sont simplement rejetés

* Pour renforcer la sécurité, un pare-feu (*firewall*) peut être ajouté au système. Ce pare-feu filtrera les paquets réseau autorisés à entrer dans le système, et même les paquets autorisés à en sortir.

## FirewallD

* FirewallD est un outil permettant de simplifier le filtrage des paquets.

* Pour ce faire, le pare-feau place chaque interface réseau dans ce qu'on appelle des *zones*. Chaque zone possède son propre ensemble de règles.

  On peut par exemple avoir un serveur avec deux interfaces réseau: une sans fil et une filaire. On ajouterai l'interface sans fil à la zone "drop", qui est très restrictive et bloque toutes les connexions entrantes. Et l'interface filaire à la zone "trusted", où toutes les connexions sont acceptés — on fait confiance au réseau au sein de l'entreprise.

### Zone par défaut

* Normalement, la zone par défaut est la zone "public". Dans cette zone, toutes les connexions entrantes sont bloquées, sauf celles explicitement autorisées.

  Pour vérifier la zone par défaut:

  ``` bash
  $ firewall-cmd --get-default-zone
  public
  ```

  Pour changer la zone par défaut:

  ``` bash
  $ firewall-cmd --set-default-zone=public
  ```

### Règles

* Pour voir les règles actuelles du pare-feu:

  ``` bash
  $ sudo firewall-cmd --list-all
  public (active)
    target: default
    icmp-block-inversion: no
    interfaces: enp0s3
    sources:
    services: cockpit dhcpv6-client ssh
  ```

* Pour voir quel numéros de port correspondent aux services autorisés:

  ``` bash
  $ sudo firewall-cmd --info-service=cockpit
  Ports: 9090/tcp
  ```

* Pour ajouter une règle — ici, autoriser les connexions TCP sur le port 80

  ``` bash
  $ sudo firewall-cmd --add-service=http
  success
  ```
  ``` bash
  $ sudo firewall-cmd --add-port=80/tcp  # idem
  ```

* Pour supprimer une règle:

  ``` bash
  $ sudo firewall-cmd --remove-service=http
  success
  ```
  ``` bash
  $ sudo firewall-cmd --remove-port=80/tcp
  ```

### Sources

* Dans la zone par défaut (public), la logique est simple: n'autoriser que les connexions entrantes vers les services spécifiquement activés — et refuser le reste. Mais on peut utiliser une logique différente.

* On peut filtrer le trafic en fonction la provenance du trafic. Par exemple, si le trafic provient d'une adresse IP du réseau local, le filtrer avec la politique de la zone "trusted":

  ``` bash
  $ sudo firewall-cmd --add-source=10.11.12.0/24 --zone=trusted
  success
  ```

* Pour vérifier quelles zones filtrent actuellement le trafic:

  ``` bash
  $ firewall-cmd --get-active-zones
  public
  interfaces: enp0s3
  trusted
  sources: 10.11.12.0/24
  ```

* Pour supprimer le filtre basé sur les adresses IP:

  ``` bash
  $ sudo firewall-cmd --remove-source=10.11.12.0/24 --zone=trusted
  success
  ```

### Règles persistentes

* Les règles ajoutées ici ne sont pas persistentes: si on redémarre le système, les règles seront perdues. Pour rendre une règle persistente on peut

  1. Ajouter une règle temporaire

      ``` bash
      $ sudo firewall-cmd --add-port=12345/tcp
      success
      ```

      Vérifier les règles actuelles

      ``` bash
      sudo firewall-cmd --list-all
      public (active)
        target: default
        icmp-block-inversion: up
        interface: enp0s3
        sources:
        services: cockpit dhcp6-client http ssh
        ports: 12345
      ```

      Et rendre les règles actuelles persistentes

      ``` bash
      $ sudo firewall-cmd --runtime-to-permanent
      success
      ```

  2. Ajouter une règle persistente

      ``` bash
      $ sudo firewall-cmd --add-port=12345/tcp --permanent
      success
      ```

      Notons que cette commande persiste la règle mais ne la rend pas active pour la session en cours. Pour la rendre active, il faut utiliser la commande sans l'option --permanent:

      ``` bash
      $ sudo firewall-cmd --add-port=12345/tcp
      success
      ```