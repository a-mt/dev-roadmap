---
title: Générer un certificat SSL avec OpenSSL
category: IT, SSL
---

## Créer une autorité de certification

Créer un certificat auto-signé:

```
openssl req -x509 \
  -nodes -sha256 -newkey rsa:2048 \
  -keyout CertificateAuthority.key \
  -out CertificateAuthority.crt \
  -days 1825
```

Quand vous pressez Entrée, vous allez devoir répondre à un certain nombre de questions.  
Choisissez un Common Name que vous pouvez facilement reconnaître dans une liste. Les autres questions n'ont pas vraiment d'importance — elles s'affichent lorsque vous regardez les détails du certificat.

[How To Create a Self-Signed SSL Certificate for Apache in Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04)

### Options

* <ins>sha256</ins> est l'algorithme utilisé pour générer la signature

* <ins>rsa:2048</ins> est la taille de la clé

* <ins>-subj</ins>:  
  Plutôt que de répondre aux questions interactivement, on peut utiliser le paramètre `-subj`.

  ```
  -subj "/C=xx/ST=x/L=x/O=x/OU=x/CN=localhost"
  ```

* <ins>-config</ins>:  
  Les configurations par défaut sont définies dans `openssl.cnf`.  
  Ce fichier est situé dans le répertoire d'OpenSSL — si vous ne savez pas où il se trouve:

  ```
  openssl version -a | grep OPENSSLDIR
  ```

  Vous pouvez uitliser un fichier de configuration autre que celui par défaut en utilisant le paramètre `-config`:

  ```
  -config <( cat localhost.cnf )
  ```

  Si vous définissez `prompt=no` dans la section `[req]` du fichier de config, alors les différentes questions ne seront pas promptées: OpenSSL utilisera les valeurs par défaut — `countryName`, `localityName`, etc ou les shorthands `C`, `L`, etc.  
  Ces valeurs se trouvent dans la section désignée par  `distinguished_name`.  

  ``` ini
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

---

## Créer un certificat de serveur

* Créer un fichier `v3.ext` pour pouvoir créer un certificat X509 v3.  
  Remplacer `localhost` avec votre nom de serveur si vous utilisez un VirtualHost.

  ```
  authorityKeyIdentifier=keyid,issuer
  basicConstraints=CA:FALSE
  keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
  subjectAltName = @alt_names

  [alt_names]
  DNS.1 = localhost
  ```

* Générer une clé privée et un CSR (Certificate Signing Request)

  ```
  openssl req \
    -nodes -sha256 -newkey rsa:2048 \
    -keyout Server.key \
    -out Server.csr
  ```

  Encore une fois, vous allez devoir répondre à un certain nombre de questions.  
  Seul Common Name est obligatoire — il doit correspondre au `ServerName` du serveur.

* Signer le certificat avec votre CA créée précédemment

  ```
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

---

## Importer le certificat de la CA

Il vous faut faire confiance à votre Autorité de Certificatin pour ne pas recevoir de warning de la part de votre navigateur.  
Les navigateurs Web comme Firefox, Chromium, Google Chrome, Vivaldi et même les clients de messagerie comme Mozilla Thunderbird n'utilisent pas le Trust Store de l'OS, mais utilisent leur propre Trust Store.

- Firefox: Preferences/Privacy & Security/View Certificates/Authorities
- Chrome: Settings/Advanced/Privacy and Security/Manage certificates/Authorities
- [Linux OS](https://blog.confirm.ch/adding-a-new-trusted-certificate-authority/)
- Windows OS: double-cliquer sur CertificateAuthority.crt > "Installer Certificat"