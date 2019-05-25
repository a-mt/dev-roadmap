---
title: Créer un Droplet
category: Hosting, DigitalOcean
---

Un [Droplet](https://www.digitalocean.com/products/droplets/) est une machine virtuelle. Vous décidez de la quantité de RAM/CPU/disque dont vous avez besoin, de l'OS/distribution que vous voulez utiliser et de son emplacement géographique. Une fois crée, vous pouvez installer votre serveur comme le souhaitez.

* Aller sur le page [Droplets](https://cloud.digitalocean.com/droplets)  
  Si vous n'avez pas de droplets: cliquer sur le bouton bleu ("Create Droplet").  
  Si vous avez déjà des droplets: cliquer sur le bouton vert en haut à droite, "Create" > "Droplet"

  ![](https://i.imgur.com/i3uPYV9.png)

* Sélectionner la distribution que vous voulez uitliser.  
  Je prend Ubuntu — en cas de difficultés, il est plus facile de trouver de l'aide.

  ![](https://i.imgur.com/fFCVSyc.png)

* Choisir le [plan tarifaire](https://www.digitalocean.com/pricing/) que vous voulez utiliser.  
  Les tarifs commencent à 5$ par mois, pour 1GB de RAM, 1 CPU, 25GB de disque dur, 1 To de bande passante.  
  On peut [rendimensionner un droplet](https://www.digitalocean.com/docs/droplets/how-to/resize/) après l'avoir créé (upscale uniquement), donc si vous n'êtes pas sûr de la quantité dont vous avez besoin, commencez bas.  
  Je prend le prix le plus bas.

  ![](https://i.imgur.com/8gDisjP.png)

* On peut activer les [sauvegardes automatiques](https://www.digitalocean.com/docs/images/backups/overview/). Elles auront lieu chaque semaine à un créneau horaire assigné automatiquement par DigitalOcean. Le prix est de 20% du prix du droplet — peu importe l'espace dique utilis". Chaque sauvegarde est conservée pendant 4 semaines.

  Ou vous pouvez [déclencher un snapshot](https://blog.snapshooter.io/digital-ocean-snapshot-pricing-explained/) vous-même. Le prix est de 0.05$ par giga par mois. Les sauvegardes sont limitées à une par semaine et seules les 4 dernières semaines sont conservées.

  ![](https://i.imgur.com/5kU2QCl.png)

* On peut ajouter des volumes pour partager des données entre droplets.

  ![](https://i.imgur.com/1Pzb6dX.png)

* Choisir le datacenter que vous voulez utiliser.  
  Prenez le plus proche de vous.

  ![](https://i.imgur.com/yDw8ySA.png)

* Choisir les options additionnelles que vous voulez — c'est gratuit.  
  Je prends les mêmes options que [cet article](https://medium.freecodecamp.org/how-to-install-cpanel-whm-on-a-digital-ocean-vps-8146eb83f70a): Private networking, IPv6, Monitoring.

  ![](https://i.imgur.com/fMVHzKt.png)

* On peut ajouter des [clés SSH](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/), pour s'identifier au serveur sans utiliser de mot de passe.  
  On peut également les ajouter après avoir créé le droplet.

  ![](https://i.imgur.com/6eG9r96.png)

* Choisir un nom pour votre droplet, pour que vous sachiez à quoi il sert.  
  Cliquer "Create"

  ![](https://i.imgur.com/ZUwmcR8.png)

* Vous allez recevoir un mail avec les informations pour s'identifier au VPS:

  ![](https://i.imgur.com/iE9yUjr.png)

* Se connecter au VPS avec SSH

  ```
  ssh rrot@IPADDRESS
  ```

  Accepter la connection, entrer le mot de passe que vous avez reçu par mail, et choisir un nouveau mot de passe.  
  En cas de problème avec la connexion SSH, vous pouvez réinitialiser le mot de passe root et vous connecter au droplet en utilisant la [console DigitalOcean](https://www.digitalocean.com/docs/droplets/resources/console/).

  ![](https://i.imgur.com/b3SpASp.png)

* Le droplet est maintenant fonctionnel.
  Vous pouvez retourner sur la page [Droplets](https://cloud.digitalocean.com/droplets), vous verrez votre droplet dans la liste et obtenir des informations additionnelles (tel que l'utilisation en mémoire et CPU) en cliquant dessus.