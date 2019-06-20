---
title: Crontab
category: Cron
---

Pour lancer de manière régulière et automatique un script sous Linux, on utilise les *cron* jobs. Un cron est une tâche qui est planifiée pour être exécutée périodiquement à un temps définit. Les cron jobs sont planifiés via un fichier de configuration apppelé *crontab*.

* Lister les cron jobs:

  ```
  sudo crontab -l
  ```

* Modifier la crontab:

  ```
  sudo crontab -e
  ```

  Cela ouvrira la crontab avec votre éditeur préféré (définit par la variable d'environnement `EDITOR`)

---

## Syntaxe de la Crontab

Chaque cron job est définit sur une nouvelle ligne de la crontab, en spécifiant la date planifiée et la commande à lancer.

L'exemple suivant lance le script `backup.sh` tous les jours à minuit et midi:

```
0 0,12 * * * /var/backups/backup.sh >/var/backups/info.log 2>/var/backups/error.log
```

La date planifiée est divisée en 5 options — dans cet ordre: minute, heure, jour du mois, mois, jour de la semaine.

![](https://i.imgur.com/OFJeVYr.png)

* `*` signifie "tous les", par exemple "toutes les minutes"
* `0,5` signifie "0 et 5"
* `0-5` signifie "de 0 à 5"
* `*/4` signifie "tous les quarts"

---

## Configurer la tâche

* Par défaut, le cron job envoie stdout dans un mail destiné au compte utilisateur exécutant la tâche. Rediriger stdout vers un fichier pour éviter ça.

* La commande est invoquée à partir du home directory de l'utilisateur (variable d'environnement `$HOME`)

* L'environnement par défaut des cron jobs est le suivant:

  ```
  HOME=$HOME
  LOGNAME=$UID
  PATH=/usr/bin:/usr/sbin:.
  SHELL=/usr/bin/sh
  ```

  Mais on peut définir manuellement l'environnement dans la crontab:

  ```
  SHELL=/bin/bash
  HOME=/
  MAILTO="example@digitalocean.com"
  #This is a comment
  * * * * * echo 'Run this command every minute'
  ```

---

## Utilisateur

Sur la plupart des distributions, tous les utilisateurs peuvent créer une crontab: si vous modifiez la crontab avec l'utilisateur "bob", vous créez une crontab spécifique à Bob et les cron jobs seront lancés au nom de cet utiilsateur.

Pour autoriser ou interdire un utilisateur de définir une crontab, placer son nom d'utilisateur dans `/etc/cron.allow` ou `/etc/cron.deny` respectivement (un nom par ligne). Taper `man crontab` pour vérifier l'emplacement des fichiers allow et deny pour votre distribution.

[How To Use Cron To Automate Tasks On a VPS](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-on-a-vps)