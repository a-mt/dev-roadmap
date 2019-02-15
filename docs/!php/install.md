---
title: Installer et configurer
category: Web, PHP
---

## Principe de base

PHP est un langage de programmation utilisé côté serveur.  
Le nom "PHP" est officiellement l'acronyme récursif de *PHP Hypertext Preprocessor*.

Le code PHP peut très facilement être intégré au HTML, seul le texte placé entre les balises `<?php ... ?>` est lu par l'interpréteur PHP. PHP est sensible à la casse mais insensible à l'indentation et retours chariots.

<ins>Exemple:</ins> index.php

``` php
<!DOCTYPE HTML>
<html>
<head>
<title>Exemple</title>
</head>
<body>

<?php
echo "Bonjour, je suis un script PHP !";
?>

</body>
</html>
```

---

## Application web en PHP

* <ins>Interpréteur PHP</ins>:  
  Pour pouvoir exécuter du PHP en ligne de commande, il faut tout d'abord installer l'interpréteur PHP, appelé *Zend Engine*. Il est disponible pour la majorité des systèmes d'exploitation, tel que Linux et ses variantes (HP-UX, Solaris, OpenBSD par exemple), Microsoft Windows ou encore macOS.

* <ins>Serveur web</ins>:  
  Ensuite, pour pouvoir recevoir des requêtes HTTP de la part d'un navigateur web, il faut installer un serveur web.
  Un serveur web est un logiciel qui tourne sur une machine, reçoit les requêtes HTTP, execute du code en conséquence puis retourne le résultat au client ayant initié la requête.

  Ainsi, l'interpréteur PHP sera appelé par le serveur web, cet interpréteur va génèrer le code HTML, et le résultat obtenu sera envoyé au client par le serveur. Le client ne reçoit que le résultat du script, sans aucun moyen d'avoir accès au code qui a produit ce résultat.

  PHP est supporté par la plupart des serveurs web actuels, comme Apache, IIS, Lighthttpd et Nginx.

* <ins>Base de données</ins>:  
  La plupart des applications web utilisent une base de données, c'est à un dire un système de stockage de données, qui permet d'enregistrer et de récupérer diverses données — par exemple les informations d'un utilisateur ou d'un article. Ces données pourront être utilisées par PHP pour générer des pages dynamiquement, comme afficher une liste d'article ou la page de détails d'un article.

  PHP supporte énormément de base de données. Mysql est la plus populaire.

Pour créer une application web en PHP, il faut donc choisir le système d'exploitation, le serveur web et la base de données que vous voulez utiliser. La stack la plus répandue est LAMP: Linux, Apache, Mysql, PHP.

## CGI

CGI est l'acronyme de *Common Gateway Interface*.
CGI est l'API du serveur web.

Le serveur web est un logiciel qui tourne en permanence, et qui attend de recevoir des requêtes HTTP. Lorsque le serveur reçoit une requête, il envoie trois choses:

* le type de fichier, comme HTML, GIF ou autre.
* une ligne blanche.
* le contenu du fichier.

Le serveur envoie uniquement des données statiques. Pour pouvoir créer des données dynamiquement, il est nécessaire d'utiliser un langage de programmation et c'est pour cette raison que CGI a été conçu. CGI est l'interface qui permet au serveur web de passer la requête reçue à PHP (ou tout autre langage de programmation) et de récupérer le résultat pour l'envoyer.

Si vous avez installé Lamp, vous n'avez pas à vous occuper de CGI, il est configuré pour fonctionner avec les fichiers `.php` dès l'installation. Vous pouvez donc appeler `http://localhost/index.php` et le contenu PHP sera bien interprété.

Source: [CGI Programming Is Simple!](http://www.whizkidtech.redprince.net/cgi-bin/tutorial)

---

## Installation

L'installation dépend de la stack choisie. Pour installer LAMP, voir [doc.ubuntu-fr.org/lamp](https://doc.ubuntu-fr.org/lamp). Une fois l'installation terminée, accéder à `http://localhost` pour vérifier si tout fonctionne correctement.

Par défaut, Apache cherche à afficher les fichiers du répertoire `/var/www/html`. Ainsi,
- `http://localhost/css/app.css` retourne le contenu du fichier `/var/www/html/css/app.css` (fichier statique)
- `http://localhost/test.php` retourne le résultat du fichier `/var/www/html/test.php` après qu'il soit passé par l'interpréteur PHP

Outre le domaine `localhost` associé à `/var/www/html`, Apache peut servir d'autres répertoires associés à d'autres noms de domaine et ce grâce au mécanisme de [virtual host](apache-vhost.md).

## Fichiers de configurations

Il existe divers fichiers de configuration pour cibler différentes parties du serveur. Que ce soit pour les modifications dans les principaux fichiers de configuration de Apache ou de PHP, il faut que le serveur soit redémarré pour qu'elles soient prises en compte.

### Fichiers .ini

Le fichier `php.ini` contient les configurations par défaut de PHP. Elles spécifient par exemple la taille maximale autorisée pour les fichiers envoyés du client au serveur, d'activer des extensions PHP ou encore de modifier l'emplacement des logs.

Lorsque vous mettez à jour php, vous devez choisir entre conserver l'ancien php.ini soit l'écraser. Pour cette raison, il est préférable de ne pas éditer ce fichier et de définir des fichiers .ini dans `conf.d`.

Le répertoire `conf.d` se situe dans le même dossier que `php.ini` et il contient divers fichiers `.ini` dont les configurations écraseront les paramètres du fichier `php.ini`.
Cela permet de facilement définir des paramètres personnalisés tout en conservant les paramètres propres à l'environnement PHP.

<ins>Emplacement des fichiers .ini</ins>:

Pour trouver l'emplacement du fichier php.ini utilisé par PHP lorsqu'il est executé en ligne de commande:

    php -i | grep 'php.ini'

Pour trouver l'emplacement du fichier php.ini utilisé par PHP lorsqu'il exécuté par un serveur web, placer l'instruction `<?php phpinfo() ?>` dans un fichier .php puis y accéder via votre navigateur.

<?php
// /var/www/html/index.php
phpinfo();
?>

<ins>Exemple:</ins> /usr/local/etc/php/conf.d/local.ini

``` ini
post_max_size = 10M
upload_max_filesize = 8M
```

<ins>Exemple</ins>: /usr/local/etc/php/conf.d/xdebug.ini

``` ini
[xdebug]
zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20170718/xdebug.so
xdebug.remote_enable=true
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9000
xdebug.remote_handler=dbgp
xdebug.profiler_enable=1
xdebug.profiler_output_dir=/tmp
```

### Fichiers .conf

La configuration du serveur Apache est morcelée dans plusieurs fichiers .conf se situant dans le répertoire `/etc/apache2`.

#### apache2, httpd

Le fichier `apache2.conf` contient les configurations par défaut du serveur.  
Il ne devrait pas être modifié puisqu'il peut être écrasé lors d'une mise à jour du serveur.

```
ServerName localhost
```

Le fichier `httpd.conf` contient les configurations personnalisées du serveur.

```
ServerName localhost
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
Alias /phpmyadmin/ /var/www/phpmyadmin/
```

#### sites-available, site-enabled

Chaque virtual host est défini par un fichier de configuration créé dans le répertoire `sites-available`.  
Le fichier `000-default.conf` correspond à la configuration par défaut, c'est à dire celle de localhost.

<ins>Exemple:</ins> /etc/apache2/sites-available/000-default.conf

```
<VirtualHost *:80>
  DocumentRoot "/var/www/html" 
  ServerName localhost

  <Directory "/var/www/html">
      Options Indexes FollowSymLinks MultiViews
      AllowOverride all
      Order allow,deny
      Allow from all
  </Directory>
</VirtualHost>
```

Lorsqu'un virtual host est activé (grâce à la commande `a2ensite DOMAIN`), un lien symbolique vers le fichier dans `sites-available` est crée dans ce répertoire.

### .htaccess

Le fichier `.htaccess` est un fichier de configuration que l'on place directement dans le répertoire sur lequel il s'applique (et il s'applique de manière récursive sur les sous-répertoires). Il permet notamment de créer des règles de réécriture des urls ou d'afficher une page spécifique en cas d'erreur (404, 500, etc).

Les modifications au `.htaccess` sont appliquées directement, sans nécessiter de redémarrage. Si les modifications ne sont pas appliquées, c'est probablement que le fichier contient une erreur de syntaxe, vous devriez alors consulter les logs d'Apache.

<ins>Exemple:</ins> /var/www/monprojet/.htaccess

``` htaccess
# DEV ONLY
php_flag display_startup_errors on
php_flag display_errors on
php_flag html_errors on

# Error pages
ErrorDocument 404 /404.php

# **********************************
Options +MultiViews
AddType text/html php
RewriteEngine On
RewriteBase /

RewriteCond %{REQUEST_METHOD} ^TRACE
RewriteRule .* - [F]

# Rewrite rules
RewriteRule ^article/([0-9]*)$ article.php?id=$1 [QSA,L]

# Remove .php extension from URL
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
# **********************************
```

---

## Extensions

Outre les fonctionnalités de base de PHP, il est possible d'ajouter des extensions à PHP, notamment pour ajouter des classes et fonctions à PHP. La plupart des extensions PHP se trouvent sur PECL (PHP Extension Community Library), le dépot des extensions PHP. Elles peuvent être installées en utilisant le gestionnaire de paquets PEAR.

### Exemple: Installer xdebug

`xdebug` est présente sur PECL, pour l'installer il suffit donc de lancer

```
sudo pecl install xdebug
```

### Exemple: Installer curl

Pour ajouter l'extension `curl` à PHP, il faut

1. installer curl (avec openssl pour gérer les téléchargement via https)

       sudo apt-get install openssl libpng-dev curl libcurl4-openssl-dev

2. installer l'extension PHP curl

       sudo apt-get install php-curl

### Activer une extension

Une fois que vous avez téléchargé votre extension, il faut l'activer dans le fichier de configuration PHP `.ini`. Les extensions PHP sous Windows ont l'extension `.dll`, sous Linux c'est `.so`. Notez que depuis PHP7, il est possible d'indiquer le nom de l'extension plutôt que l'emplacement du fichier:

 ``` ini
 extension=curl
 ```

 Les extensions qui modifient l'interpréteur PHP sont inclues non pas avec l'instruction `extension` mais `zend_extension` (les hooks utilisés par l'extension sont différents).

 ```
 zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20170718/xdebug.so
 ```

 ![](https://i.imgur.com/YakykNp.png)

---

## Executer PHP

### Extension de fichier PHP

Les fichiers PHP portent l'extension `.php`.

    file.php

### Executer PHP en ligne de commande

Pour executer du [PHP en ligne de commande](http://php.net/manual/fr/features.commandline.usage.php), utiliser la commande `php`
([liste des options disponibles](http://php.net/manual/fr/features.commandline.options.php))

* exécuter un fichier PHP

      php file.php

* exécuter une instruction PHP

      php -r "echo 'ok';"

### Executer PHP via un serveur web

On peut exécuter du PHP en passant par un serveur web à partir du moment que le fichier est placé dans le répertoire accessible à ce dernier. On accède alors aux pages via le navigateur (`http://adresseip` ou `http://nomdedomaine`)

Pour accéder au serveur web de la machine actuelle, on utilise l'adresse `127.0.0.1`. Par convention, le nom de domaine de cette adresse est `localhost` (définit dans le fichier `/etc/hosts`). Notez que l'on peut associer toute adresse IP entre 127.0.0.1 et 127.255.255.255 au domaine local et hôtes virtuels.

    http://localhost/file.php

### Fichier par défaut

Lorsqu'on passe par un serveur web, si on accède à un répertoire sans préciser le fichier à afficher, c'est le fichier `index.php` qui est appelé. Appeler `http://127.0.0.1` revient donc à appeler `http://127.0.0.1/index.php`.

    http://localhost

La liste des noms de fichier recherchés par Apache est définie par la directive `DirectoryIndex` (voir [doc Apache](http://httpd.apache.org/docs/2.0/mod/mod_dir.html)):

```
# /etc/apache2/mods-enabled/dir.conf 
DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
```

Les noms de fichier sont listés du plus important au moins important. Ainsi, si `index.php` et `index.html` existent tous les deux, le fichier retourné sera `index.html`.
