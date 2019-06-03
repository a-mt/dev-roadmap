---
title: Accéder à un ordinateur via une adresse IP
category: Hosting
---

## Hôte local

On peut accéder à l'ordinateur local avec le nom d'hôte `localhost`.  
Il s'agit du nom d'hôte par défaut pour l'adresse 127.0.0.1.  
Les addresses IP de 127.0.0.1 à 127.255.255.254 représentent toutes "l'ordinateur en cours".

### etc/hosts

On peut définir un nom d'hôte personnalisé, pour l'ordinateur en cours ou pour toute adresse IP, en définissant des entrées dans le fichier `/etc/hosts`. Cela n'affecte que l'ordinateur en cours.

```
127.0.0.2      local
178.128.44.119 remote
```

Pour Windows:
* Ccercher Notepad dans le menu, clic droit, exécuter en tant qu'admin
* Cliquer Fichier > Ouvrir
* À côté de Nom de fichier, choisir "Tous les fichiers"
* Ouvrir le fichier `C:\Windows\System32\drivers\etc\hosts`

---

## Réseau local

Lorsqu'on ne cherche pas à accéder à l'ordinateur local mais à un ordinateur local, il faut utiliser son adresse IP — quelque chose que 192.167.x.x selon la configuration du routeur.

### Trouver son adresse IP locale

* <ins>Windows</ins>:  
  Ouvrir la console (chercher "cmd" dans le menu) et taper `ipconfig`

* <ins>Linux</ins>:  
  `hostname -I` ou `ifconfig`

<ins>Si ça ne marche pas</ins>, qu'il est possible d'accéder à cette adresse à partir de l'ordinateur en question et non à partir d'un autre ordinateur, il y a des chances que le service n'écoute que sur `127.0.0.1` ou que l'ordinateur a un pare-feu qui bloque la requête.

### Vérifier le pare-feu

* <ins>Windows 10</ins>:  
  - Ouvrir windows Control Panel
  - Chercher Windows Firewall
  - Cliquer sur Advanced Settings
  - Dans le panneau de gauche, sélectionner Inbound rules
  - Vérifier les lignes qui ont trait au service utilisé — Apache par exemple (colonnes Enabled et Action).  
    Clic droit pour activer ou désactiver. Double-click pour modifier l'action.

    ![](https://i.imgur.com/c9GmXHl.png)

* <ins>Linux</ins>:  
  Vérifier `iptables -vnxL`.

  * Les règles du pare-feu pour les requêtes en entrées appartiennent au bloc `INPUT`. Le comportement par défaut de Linux lorsqu'il reçoit une requête en entrée est indiqué entre parenthèses. Les règles ajoutées peuvent écraser cette politique: accepter/refuser des ports donnés et/ou des adresses données.
  * Les règles pour les réponses sont dans le bloc `OUTPUT`. Le pare-feu doit également autoriser l'envoi des réponses

  ![](https://i.imgur.com/nloU8Kf.png)

### Vérifier les restrictions Apache

* S'il n'est pas possible d'accéder à la page: chercher la directive `Listen`.  
  Elle indique à Apache d'écouter les reuqêtes HTTP entrantes depuis un poirt et/ou une adresse IP particulière.  
  Dans l'exemple suivant, le serveur accepte les connexions sur le port 80 (http) et 443 (https) de toutes les machines:

  ```
  Listen 80
  Listen 443
  ```

  Dans l'exemple suivant, le serveur accepte les requêtes qu'à partir de 127.0.0.1 sur le port 80:

  ```
  Listen 127.0.0.1:80
  ```

* Si vous obtenez une erreur 500: chercher la directive `Require`.  
  Elle peut restreindre les adresses autorisées.

  ```
  <Directory /var/www/>
      Require host localhost
      Require ip 127.0.0.1
      Require ip 192.168
      Require ip 10
  </Directory>
  ```

Penser à redémarrer Apche si vous modifiez un fichier .conf.

---

## Réseau externe

Pour accéder à un ordinateur en dehors du réseau local, il faut configurer le transfert de port du routeur (NAT/PAT).

* Trouver l'adresse IP de votre ordinateur sur le réseau local (cf section Réseau local ci-dessus)

* Aller dans les configurations du routeur (à priori 192.168.1.1)
* Créer une règle pour diriger les requêtes reçues par le routeur (sur un port donné — port externe) vers votre ordinateur (sur un port donné — port interne)

  ![](https://i.imgur.com/vNI5dUS.png)

* Trouver l'adresse IP de votre routeur, qui vous a été attribuée par votre FAI, en tapant `what's my ip` sur Google.

### Adresses IP dynamiques

Si votre FAI vous a attribué une adresse IP statique, c'est tout bon. Si votre adresse IP est dynamique, alors il vous faudra vérifier à chaque fois quelle est la nouvelle adresse IP du routeur (à partir du réseau local de la machine à laquelle vous voulez accéder).

Pour faire face à ce problème, il est possible d'utiliser un fournisseur DNS dynamique. Il suffit de configurer le routeur pour qu'il se connecte au fournisseur DNS dynamique. Le fournisseur suivra l'adresse IP publique au fur et à mesure qu'elle change et la liera à un nom de domaine fixe.

Il existe plusieurs fournisseurs DNS dynamiques, DuckDNS est un exemple.  
Une fois configuré, la machine sera accessible via `xxxx.duckdns.org:port`