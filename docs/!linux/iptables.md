---
title: Iptables
category: Linux
---

`iptables` est la commande qu'on utilise sous Linux pour configurer, maintenir et inspecter les règles de filtrage des paquets IPv4 dans le kernel Linux. `ip6tables` pour les règles IPv6.

## Lister les règles

```
sudo iptables -vnxL --line-numbers
```

La table `INPUT` contient les règles de filtrage pour les requêtes en entrée. La politique par défaut est écrit entre parenthèses sur la première ligne: `ACCEPT` (accepter) ou `DROP` (rejeter). Les règles qui suivent permettent de modifier cette politique pour des ports, protocoles ou adresses spécifiques.

Dans l'exemple ci-dessous, la politique par défaut est `DROP` (rejeter toute requête entrante) tandis que la règle `ACCEPT` vient autoriser les requêtes entrantes de quiconque sur les ports 80 et 443.

![](https://i.imgur.com/wB1euXC.png)

---

## Backup / Restore

Avant d'apporter des modifications aux iptables, il est toujours bon de sauvegarder la configuration actuelle:

```
sudo iptables-save > ~/working.iptables.rules
```

De cette manière, vous pouvez restaurer l'état précédent si nécessaire:

```
sudo iptables-restore < ~/working.iptables.rules
```

Attention, en modifiant les iptables à distance (via ssh), vous risquez de vous bloquer accès à la machine.  Pour éviter ça, il est préférable d'utiliser `iptables-apply`. Cette commande permet de modifier les iptables, mais donne un prompt pour confirmer le changement. Si la modification des iptables vous a bloqué l'accès, vous n'avez plus la possibilité de confirmer le changement, et le jeu de règles précédent est restauré.

---

## Configurer

### Définir la politique par défaut

Pour définir `DROP` comme la politique par défaut pour les requêtes en entrée (règles `INPUT`):

```
sudo iptables --policy INPUT DROP
```

Pour logger les requêtes entrantes dans `/var/log/kern.log`:

```
sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix='[iptables] '
```

### Ajouter des règles de filtrage

La plupart des protocoles nécessitent une communication dans les deux sens pour qu'un transfrert puisse avoir lieu, il faut donc, dans la majorité des cas, autoriser les requêtes en `INPUT` et en `OUTPUT`.

* Accepter les requêtes de l'hôte local (loopback):

  ```
  sudo iptables -I INPUT 1 -i lo -j ACCEPT
  ```

  `-I INPUT 1` spécifie d'insérer cette règle à la première position, pour qu'elle soit traité en premier.

* Autoriser le traffic entrant pour les services vers lesquels votre machine à initié la connexion en premier:

  ```
  sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED -j ACCEPT
  ```

* Accepter les requêtes ping:

  ```
  sudo iptables -A OUTPUT -p icmp -m conntrack --ctstate NEW,ESTABLISHED,RELATED -j ACCEPT
  sudo iptables -A INPUT -p icmp -j ACCEPT
  ```

* Accepter les requêtes sur le port 80 (http) et 443 (https):

  ```
  sudo iptables -A OUTPUT -p tcp -m multiport --dport 80,443 -j ACCEPT
  sudo iptables -A INPUT -p tcp -m multiport --dport 80,443 -j ACCEPT
  ```

* Accepter les requêtes sur le port 22 (ssh) venant de l'hôte 192.168.1.10:

  ```
  sudo iptables -A OUTPUT -p tcp --dport 22 -j ACCEPT
  sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.10 -j ACCEPT
  ```

* Bloquer une adresse IP donnée:

  ```
  sudo iptables -A INPUT -s 10.10.10.10 -j DROP
  ```

  On peut utiliser un intervalle d'adresses: `10.10.10.10.0/24`, `10.10.10.0/255.255.255/.0`.

[Control Network Traffic with iptables](https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables/)  
[Exemple d'iptables (chercher "connections")](https://www.geek17.com/fr/content/debian-9-stretch-securiser-votre-serveur-avec-le-firewall-iptables-32)

### Supprimer des règles

Pour supprimer la première règle de la table `INPUT`:

```
sudo iptables -D INPUT 1
```

Pour supprimer toutes les règles:

```
sudo iptables -F && iptables -X
```

---

## Sauvegarde

Les modifications apportées aux iptables sont perdues lorsqu'on redémarre l'ordinateur, à moins de les sauvegarder.

* CentOS: Pour automatiser la restauration des iptables au redémarrage, CentOS propose le service `iptables`. Il suffit de l'activer puis sauvegarder l'état des règles iptables:

  ```
  sudo chkconfig iptables on
  ```

  ```
  sudo service iptables save
  ```

* Ubuntu:
  * Sauvegarder les iptables dans un fichier

    ```
    sudo iptables-save > /etc/iptables.rules
    ```

  * Créer un script pour restorer ces règles.  
    Le placer dans `/etc/network/if-pre-up.d` pour qu'il soit lancé au moment du démarrage

    ```
    #!/bin/sh
    iptables-restore < /etc/iptables.rules
    exit 0
    ```

  * Donner le droit d'execution au script

    ```
    sudo chmod +x /etc/network/if-pre-up.d/iptablesload
    ```

[IPtables packet rate limit against DDOS](https://www.baeldung.com/linux/iptables-packet-rate-limit)