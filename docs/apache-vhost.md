---
title: Virtual Hosts
category: Serveur, Apache
---

Un virtual host (ou vhost) est un mécanisme permettant de relier un nom de domaine
à un répertoire local.  
Exemple: `http://myproject` &rarr; `/var/www/myproject/`

---

## Créer un Vhost sous Linux (Lamp)

1. Déclarer un vhost : fichier <code>/etc/apache2/sites-available/myproject.conf</code>

   ```
   <VirtualHost myproject:80>
       ServerAdmin webmaster@dummy-host2.example.com
       DocumentRoot "/var/www/myproject" 
       ServerName project

       <Directory "/var/www/project">
           Options Indexes FollowSymLinks MultiViews
           AllowOverride all
           Order allow,deny
           Allow from all
       </Directory>
   </VirtualHost>
   ```

2. Déclarer le domaine en localhost: fichier <code>/etc/hosts</code>

    ```
    127.0.0.1 myproject
    ```

3. Activer le vhost

         sudo a2ensite myproject

4. Redémarrer Lamp

         sudo service apache2 restart

Accéder à l’interface web : http://myproject

---

## Créer un Vhost sous Windows (Wamp)

1. Activer les vhosts si nécessaire: <code>C:\wamp/bin/apache/apacheX.X.X/conf/httpd.conf</code>

    ```
    # Virtual hosts
    Include conf/extra/httpd-vhosts.conf
    ```

2. Déclarer un vhost : <code>C:\wamp/bin/apache/apacheX.X.X/conf/extra/httpd-vhosts.conf</code>

    ```
    <VirtualHost myproject:80>
        ServerAdmin webmaster@dummy-host2.example.com
        DocumentRoot "C:/wamp/www/myproject" 
        ServerName myproject

        <Directory "C:/wamp/www/myproject">
            Options Indexes FollowSymLinks MultiViews
            AllowOverride all
            Order allow, deny
            Allow from all
        </Directory>
    </VirtualHost>
    ```

3. Déclarer le domaine en localhost : <code>C:\Windows\System32\drivers\etc\hosts</code>

    ```
    127.0.0.1 myproject
    ```

4. Vérifier les erreurs vhost

        apache2ctl = wamp\bin\apache\apacheX.X.X\bin\httpd.exe
        apache2ctl -S

5. Redémarrer Wamp

Accéder à l’interface web : http://myproject

---

## Accepter des sous-domines

* Ajouter un ServerAlias à la configuration du Vhost

    ``` diff
    <VirtualHost myproject:80>
        ServerAdmin webmaster@dummy-host2.example.com
        DocumentRoot "/var/www/myproject" 
        ServerName myproject
    +    ServerAlias *.myproject

        <Directory "/var/www/myproject">
            Options Indexes FollowSymLinks MultiViews
            AllowOverride all
            Order allow,deny
            Allow from all
        </Directory>
    </VirtualHost>
    ```

* Déclarer les sous-domaines en localhost

    ```
    127.0.0.1 myproject site1.myproject site2.myproject
    ```
