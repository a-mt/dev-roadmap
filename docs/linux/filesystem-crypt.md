---
title: Stockage crypté
category: Linux
---

* Imaginons qu'on ait un serveur où est stocké des numéros de carte de crédit.  
  Le serveur peut être hyper sécurisé (les personnes non autorisées ne peuvent pas lire les données sensibles, puisque le système leur en interdit l'accès),
 si quelqu'un vole physiquement le disque du serveur, il peut rentrer chez lui, le brancher sur son ordinateur et facilement lire toutes les données.
  Pour éviter ce genre de situation, on utilise l'encryption: si quelqu'un vole un disque où les données sont encryptées, sans mot de passe ou clé secrète, il ne pourra pas extraire les numéros de carte de crédit.

* Pour encrypter un périphérique de stockage sous Linux, utilise généralement `cryptstep`.  
  Cet outil supporte deux modes de cryptage: plain ou luks (*linux unified key setup*)

## Encrypter un disque

### En mode plain

* 1/ Ouvrir le disque en mode encryption *plain*.  
  Le mode plain est simple: il prend un mot de passe et encrypte toutes les données avec.
  Ouvrir le disque va créer un périphérique virtuel, ressemblant à un disque normal avec des données clairement visibles, mais qui lit et écrit sur un autre disque où les données sont encryptées et décryptées à la volée.

  ``` bash
  sudo cryptsetup --verify-passphrase open --type plain /dev/vde mysecuredisk
  ```

  - `--verify-passphrase` indique à cryptsetup de demander le mot de passe deux fois pour s'assurer qu'on ne l'ait pas mal tappé.  
    Il est fortemment recommandé d'utiliser cette option, si on tape un mauvais mot de passe, on peut corrompre l'appareil

  - `open` est l'action: ouvrir ce périphérique pour y lire et écrire des données chiffrées.

  - `--type plain` est une option ajoutée à l'action open (il est donc important qu'elle soit à droite),
    qui lui indique d'utiliser le mode plain.

  - `/dev/vde` est le périphérique sur lequel les données seront encryptées et décryptées

  - `mysecuredisk` est le nom du périphérique virtuel qui permettra d'accéder aux données.  
    /dev/mapper/mysecuredisk est perçu comme un disque normal non crypté, ce qui permet aux applications d'y lire et écrire facilement des données.

### En mode luks

* 1.1/ Formatter le disque ou la partition à chiffrer avec Luks:

  ``` bash
  sudo cryptsetup luksFormat /dev/vde
  ```

  Notons que cryptsetup demande le mot de passe deux fois sans qu'on ait à ajouter cette option — luks possède de nombreuses fonctionnalités intégrées pour rendre le processus d'encryption plus user friendly. Il est également très facile de changer le mot de passe, aussi appelé clé de chiffrement:

  ``` bash
  sudo cryptsetup luksChangeKey /dev/vde
  ```

  Avec le mode plain, ce n'est pas aussi facile: ça nécessiterait de ré-encrypter toutes les données sur l'appareil.
  Luks ne le nécessite pas, raison pour laquelle il est souvent préféré au mode plain.

* 1.2/ Ouvrir le disque en mode encryption luks (c'est le type par défaut).

  ``` bash
  sudo cryptsetup open /dev/vde mysecuredisk
  ```

  /dev/mapper/mysecuredisk peut maintenant être utilisé de la même manière qu'avec le chiffrement en mode plain
  (créer un système de fichiers, le monter, ou fermer le périphérique).

### Encrypter une partition

* Dans certains cas, il est préférable de n'encrypter qu'une partie du disque. Par exemple, garder le système d'exploitation non chiffré, mais chiffrer une partition où sont écrites les données personnelles des utilisateurs — au cas où le disque soit volé. Pour ce faire, on peut encrypter non pas un disque entier mais uniquement une partition:

  ``` bash
  sudo cryptsetup luksFormat /dev/vde2

  sudo cryptsetup open /dev/vde2 mysecuredisk
  ```

## Lire & écrire sur le disque encrypté

* Pour lire & écrire sur le disque encrypté, on passe par le périphérique de mappage qui a été crée.
  Sous le capot, à chaque fois qu'on écrit sur le périphérique de mappage 1. Linux prend les données qu'on veut écrire, 2. les encrypte, 3. les écrits sous forme encryptée sur le disque. Et à chaque fois qu'on lit sur le périphérique de mappage 1. Linux lit les données cryptées sur le disque, 2. les décrypte, 3. retourne le résultat.

  Notons que cela ouvre une faille de sécurité potentielle: si le mappage est ouvert, les données chiffrées du mappage sont visibles sur /dev/mapper/NAME. Si le périphérique de mappage est fermé, les données sont en sécurité.

* 2/ Créer un système de fichiers sur le périphérique virtuel:

  ``` bash
  sudo mkfs.xfs /dev/mapper/mysecuredisk
  ```

* 3/ Le monter:

  ``` bash
  sudo mount /dev/mapper/mysecuredisk /mnt
  ```

## Fermer le périphérique de mappage

* 4/ Démonter le système de fichier:

  ``` bash
  sudo umount /mnt
  ```

* 5/ Fermer le périphérique:

  ``` bash
  sudo cryptsetup close mysecuredisk
  ```
