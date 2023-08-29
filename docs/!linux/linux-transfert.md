---
title: Transférer des données
category: Linux
---

## Texte (bilatéral)

* Ordinateur A

  ``` bash
  ifconfig    # Noter son adresse IP (ex: 192.168.1.11)

  nc -l 55555 # Démarrer l'écoute sur le port 55555
  ```

* Ordinateur B

  ``` bash
  nc 192.168.1.11 55555 # Se connecter sur le port 55555 de 192.168.1.11
  ```

* Taper du texte + Entrée  
  Ce qui est écrit dans un terminal est envoyé à l’autre et inversemment

---

## Copier un fichier distant

* Ordinateur A (serveur)  
  Démarrer un serveur SSH

  ``` bash
  sudo apt install openssh-server
  sudo service ssh start

  ifconfig # Noter son adresse IP (ex: 192.168.1.11)
  ```

* Ordinateur B (client)  
  Ex: copier /usr/share/applications/defaults.list (A) vers /tmp/defaults.list (B)

  ``` bash
  scp myuser@192.168.1.11:/usr/share/applications/defaults.list /tmp/defaults.list
  ```

---

## Monter un filesystem SSH

Permet de monter localement un répertoire servi par ssh et ainsi copier/coller les fichiers via GUI ou terminal

* Ordinateur B (client)

  ``` bash
  # Install sshfs
  sudo apt-get install sshfs

  # Mount
  mkdir /tmp/remote
  sshfs /tmp/remote myuser@192.168.1.11:/home/username/nginx/html

  # Go to /tmp/remote

  # Once you're done: unmount
  fusermount -u /tmp/remote
  ```
