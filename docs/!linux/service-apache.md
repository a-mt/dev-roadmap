---
title: Apache
category: Linux > HTTP
---

## Installer

* Le daemon HTTP par défaut sur centos est Apache.  
  Pour l'installer:

    ``` bash
    sudo dnf install httpd
    ```

  Et l'activer:

    ``` bash
    sudo dnf start httpd
    sudo dnf enable httpd
    ```

* Par défaut, le daemon écoute les connexions entrantes sur le port 80, ce qui correspond au port standard pour les requêtes http — requêtes non chiffrées.  
  Les requêtes https, elles chiffrées, sont sur le port standard 443 — des étapes supplémentaires sont nécessaires pour l'activer.

## Configurations de base

* Le fichier de configuration d'apache est `httpd.conf`. 
  Son emplacement exact dépend de la distribution, consulter le manuel.

    ``` bash
    man httpd.conf
    ```
    ``` bash
    ls /etc/httpd/conf/httpd.conf
    ```

* **Listen**  
  Par défaut, httpd écoute les connexions entrantes sur toutes les adresses IP.  
  Pour n'écouter qu'une (ou des) adresses IP spécifiques, il faut modifier l'instruction `Listen`

    ``` txt
    Listen 10.11.12.0:8080
    ```

* **ServerAdmin**  
  Permet de définir les informations de contact

    ``` txt
    ServerAdmin webserver@example.com
    ```

* **ServerName**  
  Définit le nom du serveur. C'est généralement le nom de domaine

    ``` txt
    ServerName www.example.com:80
    ```

* **DocumentRoot**  
  Spécifie le répertoire que le daemon http doit servir au public. Autrement dit, quels fichiers vont être accessibles via http

    ``` txt
    DocumentRoot "/var/www/html"
    ```

* **VirtualHost**  
  Permet de définir des configurations spécifiques à un site web.  
  Cela permet de mettre en ligne plusieurs sites web à partir d'un seul daemon http.  
  Par exemple, pour servir deux sites web, blog.example.com et store.example.com:

    ``` bash
    echo "This is the main website" > /var/www/html/store
    echo "This is the blog" > /var/www/html/blog
    ```

    ``` bash
    $ sudo vim /etc/httpd/conf.d/two-websites.conf

    <VirtualHost *:80>
        ServerName store.example.com
        DocumentRoot /var/www/store
    </VirtualHost>

    <VirtualHost *:80>
        ServerName blog.example.com
        DocumentRoot /var/www/blog
    </VirtualHost>
    ```

    - `*:80` indique au daemon qu'il doit utiliser les configurations de ce VirtualHost quelle que soit l'IP à laquelle le visiteur est connecté.
      Le serveur peut avoir plusieurs adresses IP, par exemple une sur le réseau interne et sur le réseau externe. Si on veut servir un site web privé aux employés sur le réseau interne, on peut utiliser à la place l'adresse privée du serveur: `<VirtualHost 10.11.12.9:80>`

    - `ServerName` est où la magie s'opère: lorsqu'un navigateur web se connecte à un serveur HTTP, il lui indique également le domaine qu'il souhaite atteindre. Le daemon trouvera un VirtualHost correspondant au nom demandé et appliquera les paramètres de ce bloc. Si aucun des VirtualHost ne correspond, les paramètres du premier bloc sont appliqués.

    - On peut ajouter ces deux VirtualHost directement dans le fichier httpd.conf, mais il est plus propre de les mettre dans un fichier séparé — permet de mieux organiser le contenu et les rendre plus visibles aux autres admins.

## Appliquer les configurations

* Après avoir modifié les configurations, vérifier qu'elles sont correctes:

    ``` bash
    $ apachectl configtest
    Syntax OK
    ```

* Recharger le daemon http pour appliquer ces nouvelles configurations — peut prendre 1 minute ou 2

    ``` bash
    sudo systemctl reload httpd.service
    ```

---

## Activer https

* Installer le module ssl

    ``` bash
    sudo dnf install mod_ssl
    ```

  Une fois installé, le module devrait être activé par défaut.  
  Pour vérifier si le module est activé:

  ``` bash
  $ httpd -M  | grep ssl
  ssl_module (shared)
  ```

* Générer des certificats SSL.  
  certbot ajoutera généralement de nouveaux fichiers de configuration https pour les sites web. Par exemple:

    ```
    <VirtualHost *:443>
        ServeName www/example.com
        SSLEngine on
        SSLCertificateFile "/path/to/file.cert"
        SSLCertificateKeyFile "/path/to/file.key"
    </VirtualHost>
    ```

## Modules

* Le daemon http est très modulaire, chaque fois qu'une nouvelle fonctionnalité est nécessaire, il suffit d'installer et d'activer un module supplémentaire. On peut également supprimer certains modules s'ils ne sont pas nécessaires.  
  Les modules peuvent être activés ou désactivés en éditant les fichiers .conf dans `/etc/httpd/conf.modules.d`.

  - <ins>00-base.conf</ins>  
    Contient les modules par défaut.  
    Éditer le fichier et commenter les modules dont vous n'avez pas besoin.

  - <ins>00-ssl.conf</ins>  
    Fichier de configuration crée automatiquement par le module mod_ssl.  
    Installer un module crée généralement un nouveau fichier pour ce module.

  - <ins>00-optional.conf</ins>  
    Contient les modules optionnels, qui ne sont pas activés par défaut.  
    Décommenter ou ajouter les modules dont vous avez besoin.

  ![](https://i.imgur.com/fPqr8Pi.png)

---

## Logs

* Le daemon garde une trace des événements qui se sont produits dans deux journax: le journal des erreurs et le journal des accès. Le journal des accès permet de voir qui a visité quel site web, les pages qui ont été accédées, le navigateur web utilisé, etc

  ![](https://i.imgur.com/3C8NFrf.png)

### Par défaut

* Les paramètres de logs par défaut sont définis dans le fichier de configuration principal

    ``` bash
    $ sudo vim /etc/httpd/conf/httpd.conf

    ServerRoot "/etc/httpd"
    ErrorLog "logs/error_log"
    LogLevel warn
    ```

  - `ErrorLog` définit l'emplacement du fichier d'erreur, par rapport au répertoire principal /etc/httpd.  
    Comme /etc/httpd est un lien symbolique vers /var/log/httpd on peut en l'occurence trouver le journal d'erreur dans /var/log/httpd/error_log

  - `LogLevel` indique quels types d'événements doivent être loggés. Ici seuls les événements qui sont des avertissements ou pire, comme les erreurs, doivent être enregistrés. Les événements qui ont une importance inférieure ne sont pas enregistrés.

* Si on a 3 VirtualHost et aucun emplacement de log définit spécifiquement pour ces hôtes, toutes les visites de sites web sont enregistrées à l'emplacement par défaut: l'AccessLog et ErrorLog. Il est recommandé de conserver un journal distinct pour chaque site web.

### Personnalisés

* `IfModule` permet de définir des configurations lorsqu'un module donné est activé.  
  Comme Apache est modulaire, le mécanisme de journalisation fait partie d'un module, log_config_module. Notons que ces configs ne font pas référence au journal des erreurs, mais à un journal séparé

    ```
    <IfModule log_config_module>
    ```

- `LogFormat` permet de définir des formats de logs personnalisés:

  ![](https://i.imgur.com/9WJjGgS.png)

  - `%h`: nom de l'hôte ou adresse IP de l'utilisateur qui visite le site web
  - `%l`, `%u`: nom du journal et nom d'utilisateur. Ces valeurs ne sont généralement pas disponibles pour une visite normale. Lorsqu'un champ n'est pas disponible, le journal affiche un tiret pour cette valeur
  - `%v`: nom du VirtualHost qui répond à la requête

- Pour utiliser un format personnalisé, on indique le nom du format à utiliser en suffixe:

  ```  bash
  $ sudo vim /etc/httpd/conf.d/00-two-websites.conf

  <VirtualHost *:80>
      ServerName store.example.com
      DocumentRoot /var/www/store

      CustomLog /var/log/httpd/store.example.com_access.log combined
      ErrorLog /var/log/httpd/store.example.com_error.log
  </VirtualHost>
  ```

---

## Restrictions d'accès

### &lt;Directory&gt;

* `DocumentRoot` spécifie l'emplacement où se trouve le site web.

* Une entrée `Directory` permet de définir des paramètres pour un répertoire donné.  
  Les sous-répertoires qui s'y trouvent hériteront également des paramètres définis.  
  On peut ainsi autoriser ou restreindre l'accès à des répertoires

  ![](https://i.imgur.com/CQkZ2Un.png)

### Options

- `Options` permet d'activer des options:

  ``` txt
  <Directory "/var/www/html">
    Options Indexes FollowSymLinks
  </Directory>
  ```
  
  - `Indexes`  
    Si quelqu'un tape example.com/admin, le daemon va essayer de trouver le fichier admin/index.html.  
    Mais si le répertoire existe et que le fichier index.html est absent du répertoire, avec cette option Apache laissera l'utilisateur parcourir le répertoire
  
    ![](https://i.imgur.com/6Sdn0pN.png)

    A contrario, si on l'enlève, l'utilisateur aura une erreur 403 — puisqu'il n'a pas accès directement au répertoire.
  
    ![](https://i.imgur.com/ZxopLm9.png)
  
  - `FollowSymLinks` permet au daemon http de suivre les liens symboliques
  
### AllowOverride

- `AllowOverride` permet de d'activer ou désactiver l'utilisation des fichiers .htaccess  
Certains CMS peuvent placer un .htaccess dans certains répertoires, qui définissent définir des paramètres personnalisés spécifiques à ce répertoire.  

    Pour le désactiver: `AllowOverride None`  
    Pour l'autoriser: `AllowOverride All`

### Require

- `Require` permet de contrôler l'accès à un répertoire.  
    Par exemple pour autoriser l'accès à un répertoire à tous les utilisateurs:

    ```
    <Directory "/var/www/html/admin">
      Require all denied
    </Directory>
    ```

- Pour rejeter l'accès à un répertoire à tous les utilisateurs:

    ```
    <Directory "/var/www/html/admin">
      Require all denied
    </Directory>
    ```

- Pour n'autoriser l'accès qu'à une liste d'adresse IP définie:  
      Ici seules les adresses IP comprises entre 192.168.1.1 et 192.168.1.255 pourrons y accéder, autrement dit la plage 192.168.1.0/8

    ```
    <Directory "/var/www/html/admin">
      Require ip 192.168.1 203.0.1.113
    </Directory>
    ```

### &lt;Files&gt;

* Permet d'ajouter des règles sur des fichiers.  
  Ici on rejete l'accès sur tous les fichiers commençant par .ht (.htaccess, .htpasswd):

    ```
    <Files ".ht*">
      Require all denied
    </Files>
    ```

### .htpasswd

* Pour protéger un site web '(ou une partie du site web) par un nom d'utilisateur et mot de passe:

  1. Générer un fichier .htpasswd.  
     Ce fichier stockera les données des utilisateurs et mots de passe autorisés

        ``` bash
        $ sudo htpasswd -c /etc/httpd/passwords aaron
        New password:
        Re-type new password:
        Adding password for user aaron
        ```

     L'option -c permet de créer ou remplacer le fichier s'il existe déjà.  
     Pour ajouter un autre utilisateur au même fichier, il suffit d'enlever l'option -c

        ``` bash
        $ sudo htpasswd /etc/httpd/passwords john
        ```

     Et pour supprimer un utilisateur du fichier, utiliser l'option -D

        ``` bash
        $ sudo htpasswd -D /etc/httpd/passwords john
        Deleting password for user john
        ```

2. Définir l'autorisation nécessaire dans le fichier de configurations:

    ```
    <Directory "/var/www/html/admin">
      AuthType Basic
      AuthTypeProvider file
      AuthName "Secret admin page"
      AuthUserFile /etc/httpd/passwords
      Require valid-user
    </Directory>
    ```

3. Désormais lorsqu'un utilisateur veut accéder à un page sous /admin,  
    il doit entrer le nom d'utilisateur et mot de passe

    ![](https://i.imgur.com/tPq2wq1.png)