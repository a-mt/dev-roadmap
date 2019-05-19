---
title: Générer un certificat SSL wildcard avec Let's Encryot
category: IT, SSL
---

Pour obtenir un certificat wildcard de la part de Let's Encrypt, vous devez avoir des enregistrements DNS sur un [nameserver supporté](https://certbot.eff.org/docs/using.html#dns-plugins). Mon VPS est sur DigitalOcean, c'est donc son API et ses nameservers que j'utiliserai.

## Ajouter des enregistrements DNS sur DigitalOcean

* Aller à la page [Networking](https://cloud.digitalocean.com/networking) et ajouter votre nom de domaine.

  ![](https://i.imgur.com/fvAMJ2P.png)

* Ajouter vos enregistrements DNS.

  ![](https://i.imgur.com/YpH3PUo.png)
  
  ![](https://i.imgur.com/TnaCShq.png)
  
  ![](https://i.imgur.com/jney4nA.png)

  Résultat final:
  
  ![](https://i.imgur.com/nLs95CG.png)

* Attendre 5 minutes que les changements se propagent sur les nameservers de DigitalOcean.

Source: [DNS Quickstart](https://www.digitalocean.com/docs/networking/dns/quickstart/)

---

## Ajouter les nameservers de DigitalOcean sur votre registrar

Avec Namesilo, le processus est comme suit:

* Aller sur la page [Domain Manager](https://www.namesilo.com/account_domains.php) et cliquer sur votre nom de domaine

* Dans le bloc NameServers, cliquer sur "Change"

  ![](https://i.imgur.com/HiNG8iE.png)

* Ajouter les nameservers de DigitalOcean dans la liste. Une fois que c'est fait, cliquer sur "Submit"

  ![](https://i.imgur.com/2L8kWzv.png)

* Attendre 5 minutes que les changements se propagent sur le registrar. Rafraichir la page Domain Manager et vérifier que le status est "Active".

  ![](https://i.imgur.com/pAdBa68.png)

* Maintenant, il faut attendre que les modifications sur les nameservers root soient propagés jusqu'à votre FAI. Prévoir 30 minutes.

---

## Récupérer un token API de DigitalOcean

Il faut récupérer un token de DigitalOcean pour que Certbox (le logiicel qui génère/renouvelle les certificats SSL pour vous) puisser lancer un défi DNS et valider que vous êtes propriétaire du nom de domaine.

* Aller sur la page [Applications & API Tokens](https://cloud.digitalocean.com/settings/api/tokens) et cliquer "Generate Token"
  
  ![](https://i.imgur.com/sptM6De.png)

* Lui donner un nom pour pouvoir l'identifier facilement puis cliquer sur "Generate Token"

  ![](https://i.imgur.com/9IKF5A9.png)

* Copier le token

  ![](https://i.imgur.com/GEliGxr.png)

* Créer un fichier INI sur votre serveur pour stocker votre token

  ```
  mkdir ~/certs
  touch ~/certs/digitalocean.ini
  chmod 600 !$
  vim !$
  ```

  Remplacer `00..ff` avec votre token:

  ```
  # DigitalOcean API credentials used by Certbot
dns_digitalocean_token = 0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff
  ```

---

## Créer un certificat wildcard

* Installer Certbot avec le plugin `dns-digitalocean`

  ```
  sudo apt-get update \
      && sudo apt-get install software-properties-common \
      && sudo add-apt-repository universe \
      && sudo add-apt-repository ppa:certbot/certbot \
      && sudo apt-get update \
      && sudo apt-get install certbot python3-certbot-dns-digitalocean
  ```

  Dans cet exemple, on utilise Certbot en mode `certonly`: on génère le certificat sans mettre à jour les configurations du serveur. Vous devrez configurer votre serveur vous-même pour qu'il utilise le certificat SSL que vous avez crée.

* Générer un certificat wildcard  
  Remplacer `DOMAIN.TLD` avec votre nom de domaine

  ```
  sudo certbot certonly \
        -a dns-digitalocean \
        -d "*.DOMAIN.TLD" -d DOMAIN.TLD \
        --server https://acme-v02.api.letsencrypt.org/directory \
        --dns-digitalocean-credentials ~/proxy/certs/digitalocean.ini
  ```

  La clé publique et privée ont été sauvegardées dans `/etc/letsencrypt/live/DOMAIN.TLD` (ce sont en fait des liens symboliques qui pointe vers la dernière disponible dans `/etc/letsencrypt/archive/DOMAIN.TLD`)