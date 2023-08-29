
## Nommage

* DNS (*Domain Name Service*) permet d'obtenir la correspondance entre "nom de machine" et "adresse IP".

* Le service DNS est mis en oeuvre par un ensemble de serveur DNS et une abse de données (mondiale et distribuée) qui contient les associations entre noms de machine et adresse IP pour toutes les machines reliées à Internet.

### nslookup

* La commande nslookup permet de connaître le serveur de noms (serveur DNS) utilisé par la machine. Cette information se trouve également dans le fichier /etc/resolv.conf

### host

* Pour connaître l'adresse IP associée à un nom de machine, on utilise la commande host

    ```
    $ host google.com
    google.com has address 142.250.200.238
    google.com has IPv6 address 2a00:1450:4006:811::200e
    google.com mail is handled by 10 smtp.google.com.
    ```

    Il est possible de connaître la liste de l'ensemble des machines de son domaine grâce au DNS. Pour ce faire, on utilise host -l NOM_DE_DOMAINE

* Et inversemment, pour connaître le nom éventuellement associé à une adresse, on utilise également la commande host

    ```
    $ host 142.250.200.238
    238.200.250.142.in-addr.arpa domain name pointer mrs08s18-in-f14.1e100.net.
    ```

### Fichiers de configuration

* /etc/hostname contient le nom de la machine en cours  
  On peut également l'obtenir avec la commande hostname

* /etc/hosts contient une correspondance entre noms de machine et adresses IP.

* /etc/resolv.conf contient le nom du domaine DNS auquel la machine appartient.
  On peut aussi l'obtenir avec la commande dnsdomainname

---

## Entrées

A
NS
CNAME
MX
PTR
TXT
SRV


  DNS [1 &#x21F2;](https://medium.freecodecamp.org/why-cant-a-domain-s-root-be-a-cname-8cbab38e5f5c), CORS [1 &#x21F2;](https://medium.com/@baphemot/understanding-cors-18ad6b478e2b)
