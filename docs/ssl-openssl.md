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

* Générer une clé privée (PKCS#8) et un CSR (Certificate Signing Request)

  ```
  openssl req \
    -sha256
    -nodes -newkey rsa:2048 -keyout Server.key \
    -out Server.csr
  ```

  Encore une fois, vous allez devoir répondre à un certain nombre de questions.  
  Seul Common Name est obligatoire — il doit correspondre au `ServerName` du serveur.

  Ou pour générer une clé privée PKCS#1 et un CSR:
  
  ```
  openssl genrsa -out Server.key 2048

  openssl req \
    -sha256
    -new -key Server.key \
    -out Server.csr \
  ```

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

### Traditional format vs. pkcs#8 format

* Une clé privée au format traditionnel (PKCS#1 ou format SSLeay) a le format suivant:

  ```
  -----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQEA3eKaoNU5nivzsWohpu83IWZ0VqqUlAQ9JBTUEA+cNN9IojTB
  89GRvFb1ttqYn9+aJxepKQAe6yiMXrAOePm6nFdsk7r8iOrnoSqiPocEeDmcEMZm
  yr3/Vo6tfkwu9f6VwKFIsEZLDdFep0F5nQHbiDWBjQstmf+TTG3F1rlrOuNjhcgL
  BhcbJTNDL1fXIgTMcktBV3ZzWKE2xtxRAWb0DJJuA0Ys+wPdqQGX6GtooUFt2vKh
  xDAevn8PkknG0LmwgLY1irDzDDYvYpkpqullXqhJzagaL/w5PpYLoBo6ePObmsSN
  14riAutVWbeLVXX7boCes5f6NUtGCp1/FJ/SGwIDAQABAoIBAAxkN1Z8EfevZLCn
  yLFV8rI+0oh0hk+t3OxC7YToGkUpoxjL8Xj4XzcxdA9+Lb/f8O/19lB/3ToszYoM
  MwK2j6FjkIC/lJLg64aopt7vE2TTcs/NBLiV28ittyqyfnzmdt6HI1QU2OQwqSSW
  F4CZNfVpZ47E7QsIpuVBzCatvDtRlQC7gOul6kQ5EmZtHoBCALR1hDlZt2lHnAVj
  uw7TueiSmlseZhng2JtgICPenbhxwqGxWMZa36G9GNZm3r0gGMp+mZB7HaqRcSTH
  8O+OHxblf9eop+VIkoJ1AS9c3GPASIy/R6jKnDOYU3DiAtNbWUvn2zlJU3kwk5sQ
  yJpP22ECgYEA870jUTEGVf9Iw1FTAghhgI2i3OFp5YbqhpIyQ/ShsJ+5q6bSd5b/
  ewhwLtmYrx34UMvUmREDbyMEFpWB4YH4fyMHE1hRdpsvpymyFofWqh2l7XNXCjlK
  XnQGKfLtvY0K40ArruiZXdRusX7buWk7xX76h/D/UmgcSZCJk8oMec0CgYEA6QwJ
  DUQ4XXq8bo5QlpzR896ggsG77HSdasADRRtnfDMtDGH+rLK1l8UrC1TbAcMcsWGn
  g4t4XiXr0vjiZSsGKjCukeTTcfjIKTiMBpUCmVRF4FQgaVupwWYnjFFDKucbD0s4
  mPunladQyCRW8bjgE0t9waBsrTiduVq3Dgwm84cCgYBYJInlDqmP5+XUXFB8Z7N6
  3b2LyyiUjJm7WJs83/ao/NoULRvni3+QapjHGIGSsm/eKBgV0oU/Z5ZO5Ho3ptzK
  fUxNvp6XGb+93+I7K5yBoH8kw5UyaU1vot2nxeYbqinJzKb/dbYgrHXrUkj7YAbx
  gN3w00JB9sxj/hUCkQq58QKBgCI4ETAwfzJCrl5xaSXkWvO7EciBV+2tZdvh29kO
  4BAdl5TE4tdK2l0xp1Nfn1TP6GunUih/lyoD2W+9+cgvHBWf1lI3zlBi3kknM3BX
  +uy2shfxYlz2B6QNMutolzs6ef+x5NqZwQ65ZaQtqdKOeeB7aji/LJX2xToNNunK
  IQILAoGAbz/fLT2UP8weeuAg7zBFosFiEQeZLTNCBpwpSzNUnoIYwV0YMJn/HHTu
  NoPGHcuKxOGRzsjEwh3A398ie+kSdH8sDePQA3CdveFcJEv0n+qSDZMyGFbX4g3o
  6H6NP/lK2mh6OKh/b7HI7D42zRyB35HJZ2ny127DR0KUGdmsiRY=
  -----END RSA PRIVATE KEY-----
  ```

* Une clé privée au format PKCS#8 a le format suivant:

  ```
  -----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGjsUTP+rl/CWt
  8nwfekQ+P9/YJ6vSLYRsFH4FaCa0il/2sn1PplbigBznAjrl4+kGvjbSKFKzuXUM
  2LxkT32XGkFxGqFgYElGtgO2j4zOz9THAIU9SUEWdPfqarQW+aWL8dUe//aCHhbD
  PX2mnnlEVZ0sD5X36K9EWifPWsGkgc1lzvhMhzrTSb0nm6tPbGqe24K5DrYFY1Pf
  wGzOAyMOTbakWimL1pGEzZvH7DyvTUZFs/9nRLMngo1b45s+HRnxXEByIzQhbl5d
  8ZKp1RfPWOv3OvIDD5EPGVu07580ourd3IOnXLRvEVN4gvue9N8JVyTBkxNzRlwD
  IPPlVCNzAgMBAAECggEAFVXN802Q7fl0CwbdM3ytzIqMgOtyWPkvG3XwPKB+WDPu
  L9HqCR70gw4FDQV+Uql0ppbVySswB8PLwf+f7p9j/VKC6aZU5Mgz13dDWuB93tMS
  J/f0WSt/5OvYn8WraDSXBzyLC/OxBzY4d+4pjDfHDAKvCsb59FN6UbvmPy+fUw+3
  BIU3cyLPxZeC4MGLycWoU1chhr3MlGs+tUXgMHu+NXm1EXnyZtEZktGVK98Xzzng
  hnf/mw90der9G/sXLXJ+joH+g8h6z8nxH4VmLbt2y/SbNqKjnnVr+E7ThRkWC+iF
  4R3Y55qmjnHFjRvatq6PqqLyKtFAVcMHZzmzYYKa4QKBgQDrqbyiM87ssaqSncUU
  nexO8HwCYMCdbTcBo08Nla1O3Q+Pcli3Vh2HWPczQ/DQFCGpEM6tPsErzPj/Y8cM
  8XvPQB/+fCI9TjmCOx2dgxOlJmNT9wHSvAkNnf3U2fomRZwGrLydaaRxg7DAbdTI
  59Xww1mml4RflF8yqXrRfguP2QKBgQDXsU1yqE5WsjBFgLwH7B9CZcJHM8IWel6q
  e60oBc5/J24xQi6skMUFqpiJCQaPWSoGCXiMk205pzCrc+x0ZW9XmQEJjHhmRkYO
  56AzkLPCg1GrqMMuy/fPpe+w4eqrkvWq6YS+IIIENN8oIYgt0xEH987ubpF1vhAN
  kSgcnZiKKwKBgBOC4B1F0NID+61b5p9IW/JFMt83h3sBOdam4LqtM8Ydw1YLD5FO
  Te+QzBawf1Wa9RZ8T8BEO9YWiF8MscQ+khOcqYl2WZddzKEdp9wMqCm6PesLvljm
  PJGmDQf8bBuTE9Hxp0QZJQZI8u9bqIxhtXLTma6TSOBo9mDJa2PA3dAxAoGBAKmn
  55BBPGVLAVcZ/EyK+MeEPP0+g/KkTCPy5e9uKc+wVyddtFK+CIr9db+MHuHQM5LO
  DkkciTRpAopJw3qGcr7HNZ6qI+XmbqK4pDULI6njGvFX7Da57vEgx1ktSiWskZne
  1i+qaDog0ErDnVbWBzZqQBUhWT7wwbW6MH/ZoitDAoGBALOayD70q212CU+mrL6B
  k3oQl6nQcVwtXAmKBGdRfsN+lWlMSKIkqhU7nepUcEyZz3UMQijtuEdecEceNYdB
  ff3eds7D1EkxtLC+znpB3/HyC7xEP7PA+AK8HOTuF8UF9xEbt7abwCgMXrhLg1xU
  Fm0mrxR4GE2gonh0lRmwWUlG
  -----END PRIVATE KEY-----
  ```

Une clé PKCS1 est forcemment une clé RSA tandis que PKCS8 prend en charge différents algorithmes.
[PKCS1 vs PKCS8](https://stackoverflow.com/questions/48958304/pkcs1-and-pkcs8-format-for-rsa-private-key#answer-48960291)

---

## Importer le certificat de la CA

Il vous faut faire confiance à votre Autorité de Certificatin pour ne pas recevoir de warning de la part de votre navigateur.  
Les navigateurs Web comme Firefox, Chromium, Google Chrome, Vivaldi et même les clients de messagerie comme Mozilla Thunderbird n'utilisent pas le Trust Store de l'OS, mais utilisent leur propre Trust Store.

- Firefox: Preferences/Privacy & Security/View Certificates/Authorities
- Chrome: Settings/Advanced/Privacy and Security/Manage certificates/Authorities
- [Linux OS](https://blog.confirm.ch/adding-a-new-trusted-certificate-authority/)
- Windows OS: double-cliquer sur CertificateAuthority.crt > "Installer Certificat"
