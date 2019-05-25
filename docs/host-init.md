---
title: Configurer le serveur
category: Hosting
---

La première chose à faire après avoir créé un droplet est [configurer le serveur](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04).

* Créer un nouvel utilisateur et l'autoriser à lancer des commandes avec `sudo`.  
  Remplacer `myself` avec le nom d'utilisateur de votre choix.

  ```
  adduser myself
  usermod -aG sudo myself
  ```

* Configurer le pare-feu (en utilisant UFW), pour bloquer toutes les connexions au serveur — sauf les connexions SSH:

  ```
  ufw app list
  ufw allow OpenSSH
  ufw enable
  ufw status
  ```

  Pour référence: [UFW Essentials: Common Firewall Rules and Commands](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

* Mettre à jour tous les packages installés

  ```
  apt-get update
  apt-get upgrade
  ```

* Ouvrir un nouveau terminal et vérifier que vous pouvez vous identifier avec l'utilisateur que vous venez de créer

  ```
  ssh myself@IPADDRESS
  ```

* Pour personnaliser le Prompt Bash, éditer `~/.bashrc`.  
  J'ai changé le couleur du prompt — rose et violet (31,35) au lieu de vert et bleu (32,34) — pour facilement faire la diffrence entre le prompt de mon ordinateur local et celui de mon VPS.

  ```
  PS1='${debian_chroot:+($debian_chroot)}\[\033[01;31m\]\u@\h\[\033[00m\]:\[\033[01;35m\]\w\[\033[00m\]\$ '
  ```