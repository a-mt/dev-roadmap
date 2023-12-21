---
title: SSL
category: Linux, Network
---

* SSL (*Secure sockets layer*, couche de sockets sécurisée) est un protocole de sécurisation des échanges.  
  Ce qu'on appelle aujourd'hui SSL est en fait son successeur, TLS (*transport layer security*, sécurité de la couche de transport) — SSL présentait des problèmes de sécurité et TLS a comblé une grnde partie de ses lacunes.

* Les <ins>certificats X.509</ins> sont utilisés sur les sites web pour faire de l'authentification et du cryptage.

* Pour s'assurer de la légitimité d'un certificat, le navigateur web vérifie si une autorité de certification (CA) a signé le certificat.  
    On peut envoyer une requête de certificat à une autorité de certification, qui utilisera alors une clé privée pour générer et signer le certificat avant de le renvoyer à l'expéditeur.
    Une fois le certificat signé, n'importe quel navigateur peut vérifier la signature et constater qu'une CA l'a validé et qu'il est donc légitime.

* L'utilitaire utilisé sous Linux pour créer et gérer les certificats TLS s'appelle `openssl`.

    ```
    man openssl<TAB><TAB>
    ```

[Plus d'infos sur SSL](/ssl.md)

---

# Créer un certificat SSL

## Non signé par une CA: avec OpenSSL

Commencer par un certificat auto-signé ou signé par une CA perso est une bonne manière de vérifier les configurations du serveur web avant d'essayer d'obtenir un certificat d'une autorité de certification reconnue pour un nom de domaine publique.

* Créer une clé privée + un certificat auto-signé

    ``` bash
    openssl req \
        -x509 \
        -noenc \
        -nodes -sha256 \
        -newkey rsa:4096 \
        -days 365 \
        -keyout myprivate.key \
        -out mycertificate.crt
    ```

    &bull; -newkey rsa:4096 = générer une clé RSA de 4096 bits  
    &bull; -keyout key.pem = sauvegarder la clé dans le fichier key.pem  
    &bull; -out certif.crt = sauvegarder le certificat dans le fichier certif.crt

    &bull; -x509 = créer un certificat, et non un CSR  
    &bull; -noenc = sans mot de passe  
    &bull; -days 365 = expire dans 365 jours

* Plutôt que de répondre aux questions interactivement, on peut utiliser le paramètre -subj:

    ```
    -subj "/C=xx/ST=x/L=x/O=x/OU=x/CN=localhost"
    ```

* Plutôt que de créer une clé (PKCS#8) en même temps que le certificat ou CSR, on peut utiliser une clé existante:

    ``` bash
    # Créer une une clé privée PKCS#1 
    openssl genrsa -out Server.key 2048

    # Créer un certificat avec la clé privée donnée
    openssl req \
      -sha256 \
      -new -key Server.key \
      -out Server.csr \
    ```

### Fichier de configuration

* Par défaut, lorsqu'on presse Entrée, on doit répondre à un certain nombre de questions.  
  Le Common Name est celui qui est affiché dans la liste des certificats. Les valeurs associées aux autres questions, elles, sont uniquement affichées dans les détails du certificat

* Les configurations par défaut sont définies dans <ins>openssl.cnf</ins>.

* Ce fichier est situé dans le répertoire d’OpenSSL.  
  Pour savoir où il se trouve:

    ``` bash
    openssl version -a | grep OPENSSLDIR
    ```

* On peut utiliser un fichier de configuration autre que celui par défaut grâce au paramètre `-config`:

    ```
    -config <( cat localhost.cnf )
    ```

* Si `prompt=no` est définit dans la section [req] du fichier de config, alors les différentes questions ne seront pas promptées et OpenSSL utilisera juste les valeurs par défaut (se trouvent dans la section désignée par distinguished_name) — countryName, localityName, etc ou les shorthands C, L, etc. Par exemple:

    ```
    # localhost.cnf
    [req]
    default_bits=2048
    prompt=no
    default_md=sha256
    distinguished_name=dn

    [dn]
    C=US
    ST=RandomState
    L=RandomCity
    O=RandomOrganization
    OU=RandomOrganizationUnit
    emailAddress=hello@example.com
    CN=localhost
    ```

## Signé par une CA perso: avec OpenSSL

Le certificat auto-signé peut être considéré comme une autorité de certification:

1. Créer un certificat auto-signé — ce sera notre CA

    ``` bash 
    # Organization: Local
    # Common Name: MyProjectName
    openssl req -x509 \
        -nodes -sha256 -newkey rsa:2048 \
        -keyout CertificateAuthority.key \
        -out CertificateAuthority.crt \
        -days 1825
    ```

2. Importer ce certificat (CertificateAuthority.crt) dans le navigateur web.  
    Pour ne pas recevoir de warning de la part du navigateur, il faut faire confience à l'Autorité de Certification qui a signé le certificat. Les navigateurs Web comme Firefox, Chromium, Google Chrome, Vivaldi et même les clients de messagerie comme Mozilla Thunderbird n’utilisent pas le Trust Store de l’OS, mais utilisent leur propre Trust Store.

    - Firefox: Preferences/Privacy & Security/View Certificates/Authorities
    - Chrome: Settings/Advanced/Privacy and Security/Manage certificates/Authorities
    - [Linux OS](https://blog.confirm.ch/adding-a-new-trusted-certificate-authority/)
    - Windows OS: double-cliquer sur CertificateAuthority.crt > “Installer Certificat”

3. Créer une clé privée + CSR (Certificate Signing Request):

    ``` bash
    openssl req \
        -nodes -sha256 -newkey rsa:2048 \
        -keyout Server.key \
        -out Server.csr
    ```

4. Préparer les infos du certificat demandé

    ``` bash
    cat <<'NOWDOC' > v3.ext
    authorityKeyIdentifier=keyid,issuer
    basicConstraints=CA:FALSE
    keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
    subjectAltName = @alt_names

    [alt_names]
    DNS.1 = myprojectname.fr
    DNS.2 = *.myprojectname.fr
    NOWDOC
    ```

5. Créer le certificat avec la CA:

    ``` bash
    openssl x509 -req \
        -sha256 -extfile v3.ext \
        -in Server.csr \
        -CA CertificateAuthority.crt \
        -CAkey CertificateAuthority.key \
        -CAcreateserial \
        -out Server.crt \
        -days 365
    ```

[OpenSSL Command Cheatsheet](https://medium.freecodecamp.org/openssl-command-cheatsheet-b441be1e8c4a)

## Signé par LetsEncrypt: avec Certbot

Certbot est un utilitaire de Let's Encrypt, qui permet d’obtenir un certificat SSL d'une autorité de certification reconnue, gratuitement.

* Pour un site en ligne, il faut

    * posséder un nom de domaine
    * avoir définit un enregistrement DNS A qui dirige le nom de domaine vers l’adresse IP du serveur
    * le serveur doit pouvoir atteindre la CA sur le port 443
    * la CA doit pouvoir atteindre le serveur sur le port 80  
       

* Installer Certbot (en tant que root)

  ``` bash
  $ apt install certbot
  $ certbot --version
  $ certbot plugins
  * standalone
  * webroot
  ```

### Version nginx

* Créer un répertoire .well-known pour tous les projets front — qui nécessitent un certificat SSL.

  ``` bash
  mkdir front/certbot
  cd !$
  mkdir -p .well-known/acme-challenge
  echo hello > ~/front/certbot/.well-known/acme-challenge/healthcheck
  ```

  Si le serveur front (ex nginx) est configuré correctement, le fichier crée doit être accessible via HTTP sur /.well-known/acme-challenge/healthcheck

* Créer un certificat SSL avec certbot.

  ``` bash
  certbot certonly \
  --webroot \
  --webroot-path "/home/deployer/front/certbot" \
  -d myproject.com \
  -d api.myproject.com \
  -d www.myproject.com \
  -d media.myproject.com \
  --rsa-key-size 4096 \
  --agree-tos \
  --register-unsafely-without-email \
  --expand \
  --noninteractive
  ```

  Cette commande va

  1. créer un fichier temporairement pour chacun des domaines demandés  
     dans `WEBROOT_PATH/.well-known/acme-challenge`

  2. vérifier que `http://DOMAIN/.well-known/acme-challenge/FILE_CERTBOT_CREATED`  
     est accessibles pour chacun des domaines demandés

  3. sauvegarder le certificat   
     dans `/etc/letsencrypt/live/FIRST_DOMAIN/fullchain.pem`

* Vérifier la liste des certificats connus par Certbot

  ``` bash
  certbot certificates
  ```

### Version apache

``` bash
sudo certbot --apache -d www.monsite.com
```

certbot posera un certain nombre de questions, lancera le défit pour valider le nom de domaine, mettra à jour la configuration d’Apache et le redémarrera.

### Configurer le renouvellement automatique

Les certificats délivrés par Letsencrypt sont valables 90 jours. Certbot installe une tâche cron pour renouveler automatiquement les certificats sur le point d'expirer (dans moins de 30 jours).

1. Vérifier que le processus de renouvellement fonctionne — s'il n'y a pas d'erreur, c'est qu'il a fonctionné:

    ``` bash
    certbot renew --dry-run
    ```

2. Vérifier que le cronjob est planifié:

    ``` bash
    ls /etc/cron.d/certbot
    ```

3. Créer un script sighup qui recharge les configurations du front à la demande — pour que le front serve le nouveau certificat SSL et non pas l'ancien après que le certificat SSL ait été renouvelé. (Ici, envoit un sighup au container nommé "front", qui gère le front)

      ``` bash
      cat /home/deployer/bin/docker_sighup_front.sh

      #!/bin/bash
      set -e

      #----------------------------------------------------
      # Sends a SIGHUP signal
      # to the front container (if running)
      #
      # This will reload nginx, so that nginx uses
      # the new .conf file & SSL certificate
      #----------------------------------------------------

      if [[ $(docker ps -q -f name=front) ]]; then
          echo "Reloading..."
          docker kill --signal=SIGHUP front
      else
          echo "Nothing to do!"
      fi
      ```

    Rendre le script executable

      ``` bash
      chmod +x !$
      ```

    Vérifier qu'il fonctionne correctement

      ``` bash
      /home/deployer/bin/docker_sighup_front.sh
      ```

4. Ajouter un hook à la fin du fichier `/etc/letsencrypt/cli.ini`:

    ```
    # Global config for letsencrypt runs
    #
    # Note that these options apply automatically to all use of Certbot for
    # obtaining or renewing certificates, so options specific to a single
    # certificate on a system with several certificates should not be placed
    # here.

    deploy-hook = /home/deployer/bin/docker_sighup_front.sh
    ```

    Ou si on n'utilise pas de container, on peut directement mettre:

    ```
    deploy-hook = service nginx reload
    ```

5. Forcer le renouvellement du certificat SSL

    ``` bash
    certbot renew --force-renewal
    ```

6. Vérifier dans le navigateur que le certificat a été mis à jour

Pour plus d’infos sur les hooks certbot disponibles: `certbot --help renew`

## Sur un Droplet DigitalOcean

[Générer un certificat SSL wildcard avec Let's Encrypt](/digitalocean-letsencrypt.md)

---

# Contenu d'un certificat

* Pour voir le contenu d'un certificat SSL:

    ``` bash
    openssl x509 -in mycertificate.cert -text
    ```

    &bull; -in = input file

* Pour voir le contenu d’un fichier .p12:

    ``` bash
    openssl pkcs12 -in path.p12 -info
    ```

---

# PKCS#1 vs #8

* PKCS#1 (aussi appelé format SSLeay) est le format traditionnel, il ne prend en charge que RSA.  
  <ins>Clé PKCS#1</ins>:

    ``` txt
    -----BEGIN RSA PRIVATE KEY-----
    MIIEogIBAAKCAQEA3eKaoNU5nivzsWohpu83IWZ0VqqUlAQ9JBTUEA+cNN9IojTB
    ...
    6H6NP/lK2mh6OKh/b7HI7D42zRyB35HJZ2ny127DR0KUGdmsiRY=
    -----END RSA PRIVATE KEY-----
    ```

* Compte tenu que la plupart des systèmes actuels veulement pouvoir prendre en charge plusieurs algorithmes, la norme PKCS#8 est préférée pour les clés.

  <ins>Clé PKCS#8 non encryptée</ins>: (sans password)

    ``` txt
    -----BEGIN PRIVATE KEY-----
    MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKNwapOQ6rQJHetP
    ...
    x6XroMXsmbnsEw==
    -----END PRIVATE KEY-----
    ```

  <ins>Clé PKCS#8 encryptée</ins>:

    ``` txt
    -----BEGIN ENCRYPTED PRIVATE KEY-----
    MIIC3TBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIkErtXjGCalMCAggA
    ...
    UPRGHqltz4uOjbD1epkSGe0=
    -----END ENCRYPTED PRIVATE KEY-----
    ```

* Le <ins>format PEM</ins> (*Privacy-Enhanced Mail*) est un moyen de formater les données binaires: les données binaires sont encodées en base64 avec une longueur de ligne de 64.

    ``` bash
    openssl req \
        -newkey rsa:2048 \
        -keyout key.pem \
        -out req.pem
    ```

---

# Activer SSL sur un serveur web

## Apache

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

## Nginx

* Éditer `/etc/nginx/conf.d/default.conf`

  ```
  ssl_certificate /var/www/monsite/site.crt;
  ssl_certificate_key /var/www/monsite/site.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
  ```

Source: [NGINX config for SSL with Let's Encrypt certs](https://gist.github.com/nrollr/9a39bb636a820fb97eec2ed85e473d38)
