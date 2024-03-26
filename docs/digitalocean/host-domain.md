---
title: Obtenir un nom de domaine
category: Hosting
---

## Acheter un nom de domaine

* Aller sur [namesilo.com](http://namesilo.com/) et entrer le nom de domaine que vous voulez dans la barre de recherche.  
  Les extensions `.xyz` sont à 1$.  
  Cliquer sur "Search"

  ![](https://i.imgur.com/2tSVXsy.png)

* Sélectionner toutes les extensions de vous voulez acheter.  
  Puis cliquer sur "Register checked domains"

  ![](https://i.imgur.com/wQY4sGc.png)

* Sélectionner les configurations de confidentialité que vous voulez.  
  Personellement, je prend WHOIS Privacy.  
  Cliquer sur "Continue"

  ![](https://i.imgur.com/mJzean9.png)

* Se connecter ou créer un compte

  ![](https://i.imgur.com/8yGunKn.png)

* Sélectionner un moyen de paiement et entrer vos informations de paiement

  ![](https://i.imgur.com/CayH7p2.png)

* [Confirmer votre adresse email](https://www.namesilo.com/account_contacts_email_verification.php). Vérifier vos spams.

---

## Configurer les enregistrements DNS

* Aller sur la page [Domain Manager](https://www.namesilo.com/account_domains.php) et cliquer sur le nom de domaine que vous avez acheté.

  ![](https://i.imgur.com/128efVJ.png)

* Sur le ligne "DNS Record", cliquer "Update"

  ![](https://i.imgur.com/clXSuGy.png)

* Il y a différents enregistrements DNS pré-configurés, les supprimer.

  ![](https://i.imgur.com/kHJRQyR.png)

* Cliquer sur "CNAME" et entrer les informations comme ci-dessous.  
  Remplacer le nom de domaine avec le votre.  
  Cliquer sur "Submit"

  ![](https://i.imgur.com/oyCxkMh.png)

* Cliquer sur "A"  
  Laisser le nom d'hôte vide et entrer l'adresse IP (publique) de votre VPS.  
  Cliquer sur "Submit"

  ![](https://i.imgur.com/c5GRuuc.png)

* Refaire la même chose mais avec `*` comme nom d'hôte.  
  Vous devriez obtenir quelque chose de similaire à ça:

  ![](https://i.imgur.com/Zb7Toel.png)

---

## Attendre que vos modifications prennent effet

Vous devez maintenant attendre que le serveur de nom propage vos modifications. C'est la partie la plus longue de l'installation, cela peut prendre jusqu'à 24 heures. Il faut généralement 5 minutes pour que les changements atteignent les serveurs racine, mais il se peut que vous ayez à attendre bien plus longtemps pour que les changements se propagnent jusqu'à votre Fournisseur d'Accès à Internet (personnellement, ça a pris 30 minutes).

* Pour vérifier les informations publiques de votre serveur:  [who.is](https://who.is/).  
* Pour vérifier à quelle adresse IP est résolu votre nom de domaine à différents endroits du globe: [What's My DNS](https://www.whatsmydns.net/).  
* Pour accéder à votre site depuis un autre pays: [proxy hide Me](https://hide.me/fr/proxy)
* Pour vérifier si les changements DNS se sont propagés jusqu'à votre ordinateur, utiliser `ping`

  * Envoyer un ping à l'adresse IP de votre serveur.  
    Ça devrait marcher — indépendemment du DNS

    ```
    ping IP_ADDRESS
    ```

  * Envoyer un ping au nom de domaine de votre serveur.  
    Si ça ne marche pas, vous devriez attendre un peu plus longtemps

    ```
    ping HOSTNAME
    ```

