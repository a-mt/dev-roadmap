---
title: SSL
category: IT
---

## Créer un certificat SSL pour du développement local

* <ins>Option 1</ins>: Utiliser mkcert

  - Télécharger [mkcert](https://github.com/FiloSottile/mkcert)
  - Exécuter `mkcert -install` pour que votre navigateur accepte les certificats générés avec mkcert
  - Créer une clé privée et un certificat pour votre site:

    ```
    mkcert monsite
    mv monsite.pem /var/html/monsite/site.crt
    mv monsite-key.pem /var/html/monsite/site.key
    ```

* <ins>Option 2</ins>: [Utiliser OpenSSL](ssl-openssl.md)

<!-- -->

* <ins>Mémo</ins>  
  Voir le contenu d'un fichier .crt:

  ```
  openssl x509 -in path.crt -text
  ```

  Voir le contenu d'un fichier .p12:

  ```
  openssl pkcs12 -in path.p12 -info
  ```

Une fois que c'est fait, il faut configurer votre serveur pour utiliser votre certificat SSL.

---

## Activer SSL sur votre serveur web

### Apache

- Activer le module `ssl`

  ```
  sudo a2enmod ssl
  ```

- Modifier les configurations de votre site  
  `/etc/apache2/sites-available/monsite.conf`

  ```
  <VirtualHost monsite:443>
      ServerAdmin yourmail@domain.com
      DocumentRoot "/var/www/monsite/src" 
      ServerName monsite

      SSLEngine on
      SSLCertificateFile "/var/www/monsite/site.crt"
      SSLCertificateKeyFile "/var/www/monsite/site.key"
  </VirtualHost>
  ```

  Pour rediriger HTTP vers HTTPS:

  ```
  <VirtualHost monsite:80>
      RewriteEngine On
      RewriteCond %{HTTPS} off
      RewriteRule (.*) https://%{HTTP_HOST}/$1 [R,L]
  </VirtualHost>
  ```

  [Plus d'options pour configurer SSL](http://httpd.apache.org/docs/2.4/en/ssl/ssl_howto.html)  
  [Tester configurations SSL serveur en ligne](https://www.ssllabs.com/ssltest/)

- Vérifier si le fichier de configuration est valide:

  ```
  sudo apache2ctl configtest
  ```

- Redémarrer Apache

  ```
  sudo service apache2 restart
  ```

### Nginx

* Éditer [`/etc/nginx/conf.d/default.conf`](https://gist.github.com/a-mt/8b86f246be623be359ca8c05fe462054)

  ```
  ssl_certificate /var/www/monsite/site.crt;
  ssl_certificate_key /var/www/monsite/site.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
  ```

Source: [NGINX config for SSL with Let's Encrypt certs](https://gist.github.com/nrollr/9a39bb636a820fb97eec2ed85e473d38)

----

## Créer un certificat SSL pour un site en production

Pour un site en ligne, vous devez
* posséder votre propre nom de domaine
* avoir définit un enregistrement DNS A qui dirige le nom de domaine vers l'adresse IP de votre serveur
* le serveur doit pouvoir atteindre la CA sur le port 443
* la CA doit pouvoir atteindre le serveur sur le port 80

### Option 1: Let's Encrypt

Let'S Encrypt permet d'activer SSL gratuitement.

* <ins>Option 1a</ins>: créer un certificat simple

  * Installer [`certbot`](https://certbot.eff.org/).
  * Créer le certificat

    ```
    sudo certbot --apache -d www.monsite.com
    ```

    `certbot` posera un certain nombre de questions, lancera le défit pour valider le nom de domaine, mettra à jour la configuration d'Apache et le redémarrera.

* <ins>Option 1b:</ins> [créer un certificat wildcard](ssl-letsencrypt-wildcard.md)

* <ins>Renouvellement automatique</ins>: Les certificats délivrées par Let's Encrypt ne sont valides que pendant 90 jours, mais ils peuvent être automatiquement renouvellés:

  ```
  sudo certbot renew --dry-run
  ```

  Si vous ne voyez aucune erreur, c'est tout bon. Cela ajoute un script à `/etc/cron.d` ou utilise systemd sur les distributions compatibles. Le script s'exécute deux fois par jour et renouvelle automatiquement tout certificat expirant dans moins de 30 jours.
  
  Lorsque le certificat est modifié, il faut redémarrer le serveur soit redémarrer pour utiliser le nouveau certificat.

[An Introduction to Let's Encrypt](https://www.digitalocean.com/community/tutorials/an-introduction-to-let-s-encrypt)

### Option 2: CloudFlare

CloudFlare permet d'activer SSL gratuitement, sans rien configurer.  
Pour ce faire, il suffit de définir vos enregistrements DNS sur les nameservers de CloudFlare.  
Le traffic est crypté entre la machine de l'utilisateur et Cloudflare mais pas entre CloudFlare et votre serveur.  
Si vous recueillez des informations sensibles sur votre site Web, n'utilisez pas cette option.

Plus d'infos: [How to add HTTPS to your website for free in 10 minutes](https://medium.freecodecamp.org/free-https-c051ca570324)
