---
title: Groupes
category: Linux
---

## Créer un groupe: groupadd

* `groupadd` permet de créer un groupe

  ``` bash 
  $ sudo groupadd bob
  $
  $ sudo getent group bob
  bob:x:1002:
  ```

## Mot de passe du groupe: gpasswd

* Il est possible de se connecter à un groupe auquel on n'appartient pas en utilisant le mot de passe du groupe, lequel peut être définit avec la commande `gpasswd`. Mais il est conseillé de ne pas utiliser de mot de passe de groupe: une bonne pratique en sécurité est de ne jamais partager un mot de passe, et c'est ce qu'il faudra faire si on définit un mot de passe de groupe.
  Pour permettre à un utilisateur d'accéder à un groupe particulier, mieux vaut l'ajouter en tant que membre du groupe à la place.

## Lister les groupes d'un utilisateur: groups ou id

* Un utilisateur Linux a un groupe primaire, répertorié dans <ins>/etc/passwd</ins> et dans <ins>/etc/group</ins>.  
  Un utilisateur peut également avoir entre 0 et 15 groupes secondaires.

* Le GID du groupe primaire est utilisé lorsque l'utilisateur crée des fichiers ou des répertoires. L'appartenance à d'autres groupes secondaires confère à l'utilisateur des autorisations supplémentaires.

* Pour lister les groupes d'un utilisateur:

  ``` bash
  $ groups [user1 user2 ...]
  $ id -Gn [user1 user2 ...]
  ```

* Pour voir tous les groupes de l'utilisateur en cours:

  ``` bash
  # Lister tous les IDs et noms 
  $ id
  uid=1000(am) gid=1000(am) groups=1000(am),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),118(lpadmin),128(sambashare),1001(docker)
  $
  # Lister tous les noms
  $ id -Gn
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  $
  # Lister tous les noms
  $ groups
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  ```

  ``` bash
  # Afficher le contenu de /etc/passwd (UID et GID principal)
  $ getent passwd christine
  christine:x:1000:1000:Christine Bresnahan,,,:/home/christine:/bin/bash

  # Afficher le contenu de /etc/group (GID et liste d'UID)
  $ getent group 1000
  christine:x:1000:
  ```

* Pour voir tous les membres d'un groupe donné:

  ``` bash
  # Afficher le contenu de /etc/group
  $ getent group sudo
  sudo:x:27:christine
  ```

## Ajouter un groupe à un utilisateur: usermod

* `usermod` permet d'ajouter un groupe à un utilisateur

  - primaire: `usermod -g`

    ``` bash
    # Groupe principal
    $ sudo usermod -g bob bob
    $
    $ sudo getent passwd bob
    bob:x:1001:1002::/home/bob:/bin/sh
    $
    $ sudo groups bob
    bob : bob
    $
    $ sudo id bob
    uid=1001(bob) gid=1002(bob) groups=1002(bob)
    ```

  - secondaire: `usermod -G`  
    Par défaut, -G définit la liste complète des groupes de l'utilisateur.  
    Pour ajouter des groupes à la liste, sans supprimer les groupes existants, ajouter l'option -a (append).

    ``` bash
    # Groupe secondaire
    $ sudo usermod -aG am bob
    $
    $ sudo getent passwd bob
    bob:x:1001:1002::/home/bob:/bin/sh
    $
    $ sudo groups bob
    bob : bob am
    $
    $ sudo id bob
    uid=1001(bob) gid=1002(bob) groups=1002(bob),1000(am)
    ```

## Ajouter un utilisateur à un groupe: gpasswd

* `gpasswd` permet d'ajouter ou retirer un utilisateur d'un groupe:

  - -a (append) pour ajouter (ce sera un groupe secondaire)

    ``` bash
    $ sudo gpasswd -a trinity wheel
    ```

  - -d (delete) pour retirer

    ``` bash
    $ sudo gpasswd -d bob am
    Removing user bob from group am
    $
    $ sudo groups bob
    bob : bob
    $
    $ sudo id bob
    uid=1001(bob) gid=1002(bob) groups=1002(bob)
    ```

## Modifier un groupe: groupmod

* Si un nom de groupe n'est plus approprié, parce que la fonction du groupe à changé,  
  alors on peut changer le nom du groupe avec `groupmod`. Changer le nom ne changera pas les membres du groupe.

  ``` bash
  $ sudo groupmod -n alpha udemy
  $
  $ getent group udemy
  $ getent group alpha
  alpha:x:1001:christine
  ```

## Supprimer un groupe: groupdel

* `groupdel` permet de supprimer un groupe  
  Les membres du groupe sont automatiquement retirés

  ``` bash
  $ groups
  christine adm cdrom sudo dip plugdev lpadmin sambashare alpha

  $ sudo groupdel alpha

  $ groups
  christine adm cdrom sudo dip plugdev lpadmin sambashare
  ```

---

## Groupes spéciaux

* Il existe plusieurs groupes spéciaux pouvant être présents sur un système.  
  Les deux principaux à connaître sont **wheel** et **sudo**. Ces deux groupes sont souvent utilisés pour gérer l'escalade des privilèges: autoriser tous les utilisateurs appartenant à ce groupe à se connecter ou executer des commandes en tant que root. L'escalade de privilège associé à un groupe (ou même à un utilisateur donné) dépend de sa configuration dans le fichier sudoers — plus d'infos ci-dessous.

## Éxecuter en tant que: sudo

* `sudo` permet d'exécuter une commande en tant que root.  
  Par exemple, il est nécessaire d'avoir les droits root pour voir le contenu du fichier /etc/shadow.

  ``` bash
  $ sudo cat /etc/shadow
  root:*:18979:0:99999:7:::
  ```

  ``` bash
  $ sudo mkdir test
  $ ls -l
  drwxr-xr-x 2 root root 4096 Apr 15 16:52 test
  ```

* On peut également utiliser `sudo -u USERNAME` pour executer une commande au nom dun autre utilisateur  
  Ou `sudo -g` pour un groupe

  ``` bash
  # Créer /tmp/test en tant qu'utilisateur bob
  $ sudo -u bob touch /tmp/test

  # Créer /tmp/test2 en tant que groupe bob
  $ sudo -g bob touch /tmp/test2

  # Fichiers crées
  $ ls -l /tmp/test*
  -rw-rw-r-- 1 bob     bob 0 Apr 16 14:23 /tmp/test
  -rw-rw-r-- 1 aurelie bob 0 Apr 16 14:24 /tmp/test2
  ```

## S'identifier en tant que: su

* `su` (prononcer "ess-you", pour *switch user*) permet de s'identifier avec le compte d'un autre utilisateur.  
  
  ``` bash
  $ su christine
  Password:
  $ whoami
  christine
  ```

* Si le nom de l'utilisateur n'est pas spécifié alors on s'authentifie en tant que root.  
  Il faut alors connaître le mot de passe de root — l'approche sudo est largement préférée

  ``` bash
  $ su
  Password:
  $ whoami
  root
  ```

* On peut également utiliser `sudo --login` pour s'identifier en tant que root.  
  L'utilisateur doit alors entrer son propre mot de passe.  
  PAM (*Pluggable Authentication Modules*) peut être utilisé pour restreindre quels utilisateurs ont le droit de s'identifier en tant que root

  ``` bash
  $ sudo --login  # long version
  $ sudo -i       # short version
  ```

  Ou pour se logger en tant qu'un utilisateur donné:

  ``` bash
  sudo -iu trinity
  ```

* Utiliser le dash (-) aura pour effet d'executer les fichiers d'environnement de l'utilisateur — on aura donc les variables d'environnement de cet utilisateur et non plus celle de l'utilisateur qu'on avait avant de changer

  ``` bash
  $ su - christine
  Password:
  ```

  ``` bash
  su -
  su -l
  su --login
  ```
