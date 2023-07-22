---
title: DNS
category: Linux
---

[Théorie: DNS](dns.md)

## Pourquoi installer un serveur DNS local

* Si on tappe google.com dans un navigateur web, l'ordinateur a besoin de connaître l'adresse IP de google.com pour lui envoyer une requête. Pour ce faire, il envoit une requête à un serveur DNS, souvent hébergé par son FAI (fournisseur d'accès à Internet).

  Si le serveur DNS du FAI vient d'être démarré, il ne connaîtra pas l'adresse IP associée à ce nom de domaine, et devra démarrer un processus de résolution DNS. Une fois qu'il a reçu la réponse, il la transmet à l'ordinateur qui en a fait la demande et la met en cache localement. Si plus tard, l'ordinateur a de nouveau besoin de l'adresse l'IP de google.com, il peut rapidement l'obtenir du serveur DNS du FAI, qui l'a déjà dans son cache.

* Pour un utilisateur naviguant sur Internet, ce délai de résolution DNS n'est peut-être pas important, mais si on a une application qui tourne sur un serveur Linux et que cette application demande encore et encore l'adresse IP de google.com, toutes les 50 ms peuvent être longues car elles s'additionnent lorsqu'on a des milliers de requêtes de ce type par heure. Réduire ce délai à 10 ou même 5ms permet d'accélerer considérablement les choses. Dans ce cas là, on peut envisager un serveur DNS local.

---

## Démarrer un Serveur DNS

* `bind` est une application permettant de faire tourner un serveur DNS.  
  bind-utils contient des programmes supplémentaires qui peuvent être très utiles lorsqu'on travaille avec des serveurs DNS — notamment dig, qui est utilisé pour interroger les informations DNS stockées dans les serveurs DNS

1. Installer bind

    ``` bash
    sudo dns install bind bind-utils
    ```

    Copier l'adresse IP du serveur

    ``` bash
    ip a
    ```

2. Éditer le fichier de configuration de bind: `/etc/named.conf`

    ``` bash
    sudo vim /etc/named.conf
    ```

3. Démarrer bind

    ``` bash
    systemctl start named.service
    ```

    L'activer au démarrage

    ``` bash
    systemctl enable named.service
    ```

4. Si on veut vérifier si bind fait son travail, on peut utiliser dig

    ``` bash
    $ dig @127.0.0.1 google.com
    ;; Query time: 82 msec
    ns2.google.com. 172454 IN A 216.239.34.10
    ```
    ``` bash
    $ dig @127.0.0.1 google.com
    ;; Query time: 0 msec
    ```

    Ici il a fallu à bind 82ms pour répondre la première fois, parce qu'il a dû obtenir la réponse d'autres serveurs DNS en amont. Dans sa configuration par défaut, le cache est activé (et la plupart des serveurs DNS font de même), ce qui rend les réponses ultérieures beaucoup plus rapides.

    On peut voir dans la réponse le TTL (*Time To Live*), qui est durée pendant la laquelle la réponse sera mise en cache, en secondes. À l'expiration de ce délai, le cache est supprimé et bind devra à nouveua obtenir ces données auprès d'autres serveurs DNS.

### listen-on port

* Par défaut, bind écoute les requêtes provenant de l'adresse de loopback, autrement dit il n'acceptera que les connexions entrantes provenant des programmes tournant sur le même système d'exploitation, mais pas du monde extérieur.

  ```
  listen-on port 53 { 127.0.0.1; }
  ```

* Si on veut accepter des connexions depuis d'autres serveurs de notre réseau interne, on peut ajouter l'adresse IP du serveur sur ce réseau

  ```
  listen-on port 53 { 127.0.0.1; 192.168.0.17; }
  ```

  Notons qu'il est important d'ajouter un point-virgule après chaque adresse IP — sinon bind ne démarrera pas.

* Si on veut que bind accepte les connexions entrantes sur n'importe quel réseau connecté au serveur, on utilise le mot-clé any.

  ```
  listen-on port 53 { any; }
  ```

### allow-query

* Par défaut, seul localhost est autorisé à interroger et demander des informations au serveur DNS. Seuls les programmes fonctionnant sur le même système d'exploitation peuvent donc demander des données

  ```
  allow-query { localhost; }
  ```

* Pour permettre aux périphérique de notre réseau d'utiliser notre servuer bind, on peut ajouter l'adresse du réseau local

  ```
  allow-query { localhost; 192.168.0.0/24; }
  ```

* Et si on veut que bind réponde aux requêtes venant de n'importe quelle adresse IP, on peut utiliser any ou 0.0.0.0.

  ```
  allow-query { any; }
  ```
  ```
  allow-query { 0.0.0.0/0; };
  ```

### recursion

* Cette option permet au serveur d'obtenir des données DNS d'autres serveurs DNS sur Internet lorsqu'il ne les a pas dans son cache

  ```
  recursion yes;
  ```

---

## Maintenir une zone DNS

* Une zone regroupe les données DNS pour un nom de domaine spécifique. Pour ajouter une zone DNS sur le serveur de nom local:

1. Définir une zone dans le fichier de configuration `/etc/named.conf`  
   Ici, on définit une zone pour le nom de domaine example.com

    ``` bash
    $ vim /etc/named.conf

    zone "example.com" {
      type master;
      file "example.com.zone"
    }
    ```

    Type `master` indique qu'il s'agit du serveur de nom principal contenant la zone de ce nom de domaine. On peut également avoir le type `slave`, qui indique que ce serveur de nom se synchronise automatiquement avec le master et conserve en quelque sorte une sauvegarde. Si le master tombe en panne, les esclaves peuvent transmettre les données DNS à sa place

2. Créer un fichier de configuration `/var/named/example.com`, à partir du modèle /var/named/named.local  
   Le fichier de zone doit avoir le même utilisateur et groupe propriétaire que le fichier original, sinon bind n'aura pas la permission de le lire

    ``` bash
    $ sudo ls /var/named
    $ sudo cp --preverse=ownership /var/named/named.local /var/named/example.com.zone
    ```

3. Éditer ce fichier de configuration

    ``` bash
    $ sudo vim /var/named/example.com.zone
    ```

4. Redémarrer bind

    ``` bash
    $ sudo systemctl restart named.service
    ```

5. Tester

    ``` bash
    $ dig @localhost example.com       # retrieve NS and A records
    $ dig @localhost mail.example.com
    $ dig @localhost example.com ANY   # retrieve ALL record types
    ```

### TTL

* (Time To Live) indique aux autres serveurs DNS susceptibles de requêter notre zone la durée pendant laquelle ils peuvent mettre ces données en cache

  ```
  $TLL 1H
  ```

### SOA

* (Start Of Authorization) indique aux esclaves comment la synchronisation doit se faire

  ```
  @ IN SOA @ administrator.example.com. (
          0  ; serial
          1D ; refresh
          1H ; retry
          1W ; expire
          3H ; minimum
  )
  ```

  `@`: indique que cette cette entrée s'applique au domaine principal (example.com)

  `IN`: indique qu'il s'agit d'une entrée destinée à Internet. Ce champ avait plus de sens dans les premiers temps de l'informatique, lorsque d'autres classes étaient également utilisées. Aujourd'hui, ce champ peut simplement être omis

  `administrator.example.com`: est l'adresse email à laquelle on peut contacter la personne responsable de cette zone. Il est important de terminer chaque nom de domaine complet par un point, cela indique un nom de domaine absolu

  `serial`: est un numéro à incrémenter à chaque fois qu'on apporte une modification à la zone. Ainsi, un serveur DNS peut vérifier s'il doit mettre à jour son cache ou non

  `refresh`: est la durée que les serveurs DNS doivent respecter après une requête DNS avant de vérifier si leur cache est toujours valide

  `retry`: est la durée que les serveurs DNS doivent respecter après une requête DNS infructeuse — si le serveur DNS souhaite rafraichir ses données et n'obtient pas de réponse.

  `expire`: est la durée après laquelle les serveurs DNS doivent cesser de servir les données pour notre zone s'ils n'ont pas pu obtenir de réponse de notre serveur

  `minimum`: est la durée de mise en cache des réponses négatives — si par exemple un serveur demande des données concernant mail.example.com mais que le sous-domaine n'existe pas, alors il reçoit une réponse négative

### NS

* (Name Server) spécifie un serveur de nom où est stocké la zone du domaine.  
  En général, deux serveurs de noms sont utilisés pour s'assurer que le système continue de fonctionner si le premier est hors ligne

  ```
  @ NS ns1.example.com.
  @ NS ns2.example.com.
  ```

### A

* (Address Mapping) spécifie l'adresse IP d'un domaine. Ici, on ajoute les enregistrements A pour ns1 et ns2, nos serveurs de noms. Ce sont des noms relatifs, donc pas de point à la fin

  ```
  ns1 A 10.11.12.9
  ns2 A 10.11.12.10
  ```

  On veut également que les gens puissent accéder à notre site web.

  ```
  @ A 203.0.113.15
  ```

### CNAME

* (Canonical Name) est en quelque sorte une redirection vers un autre nom de domaine.

  ```
  database        A       1.2.3.4
  mysql           CNAME   database.example.com.
  ```

### MX

* (Mail Exchange) indique aux serveurs où ils doivent envoyer les mails à destination de ce nom de domaine

  ```
  example.com. MX 10 mail.example
               MX 20 mail2.example
  ```

  Notons que la deuxième ligne hérite du domaine de la précédente.  
  Le nombre à la suite du mot-clé MX (ici 10 et 20 respectivement) correspond à la priorité: on indique d'essayer d'abord avec le serveur de priorité 10 et s'il ne répond pas, essayer avec le serveur de priorité 20.

  Comme pour l'entrée NS, il n'y a pas encore d'adresse IP définie pour ce domaine, il faut donc ajouter des entrées A.

  ```
  mail A 203.0.113.80
  mail2 A 203.0.113.81
  ```

### AAAA

* AAAA est comme A mais pour les adresses IPv6

  ```
  server1 AAAA 20001:D88:10::1
  ```

### TXT

* Peut inclure n'importe quel texte

  ```
  example.com. TXT "We can write anything in here!"
  ```
