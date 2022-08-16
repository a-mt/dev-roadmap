---
title: Utilisateurs & groupes
category: Linux
---

<!--
* Le *contrôle d'accès* est comment gérer qui a accès à quoi — par exemple, qui peut modifier un fichier. Il existe deux méthodes de contrôle d'accès sous Linux:

  - le contrôle d'accès discrétionnaire (discretionary access control)
  - et le contrôle d'accès obligatoire (mandatory access control), avec le contrôle d'accès basé sur des règles en sous-ensemble.

  On ne s'intéresse qu'aux accès discrétionnaires ici
-->

## Fichiers de configuration

La commande principale pour créer un compte utilisateur est useradd, mais il y a également des fichiers de configuration impliqués dans le processus. Notons que la plupart des éléments de ces fichiers peuvent être remplacés en utilisant les options de la commande useradd.

* <ins>/etc/login.defs</ins>  
  Définit entre autres
  - la gestion des UID & GID
  - la gestion du mot de passe
  - s'il faut créer un home directory

  ```
  $ grep CREATE_HOME /etc/login.defs
  CREATE_HOME yes
  ```

* <ins>/etc/default/useradd</ins>  
  - shell par défaut de l'utilisateur
  - emplacement du home directory

* <ins>/etc/skel/</ins>  
  Si configuré, les fichiers présents /etc/skel sont copiés dans le home directory de l'utilisateur au moment de sa création. Typiquement, on n'y trouve que des fichiers cachés (des fichiers de configuration) mais on peut y placer tout type de fichier.

## Créer un utilisateur

* `useradd` permet de créer un utilisateur

  ```
  $ sudo useradd bob --no-create-home --no-user-group --gid 1000
  $
  $ sudo getent passwd bob
  bob:x:1001:1000::/home/bob:/bin/sh
  $
  $ sudo groups bob
  bob : am
  $
  $ sudo id bob
  uid=1001(bob) gid=1000(am) groups=1000(am)
  ```

* `usermod` permet de modifier un utilisateur  
  Par exemple, pour modifier le commentaire:

  ```
  $ getent passwd dradford
  dradford:x:1001:1001::/home/dradford:/bin/bash
  $
  $ sudo usermod -c "Denver Radford" dradford
  $
  $ getent passwd dradford
  dradford:x:1001:1001:Denver Radford:/home/dradford:/bin/bash
  ```

## Créer un mot de passe

* `passwd` permet de modifier le mot de passe d'un utilisateur.  
  Par défaut, quand un utilisateur est crée il n'a pas de mot de passe configuré. Il faut définir un mot de passe pour pouvoir s'identifier.

  ```
  $ sudo getent shadow bob
  bob:!:19194:0:99999:7:::
  $
  $ sudo passwd bob
  $ sudo passwd bob
  Enter new UNIX password: 
  Retype new UNIX password: 
  passwd: password updated successfully
  $
  $ sudo getent shadow bob
  bob:$6$tAAyaXJ5$JiDe/B1adO3EVy.P6XcYqoetMHsnPINjN/AwfqD0o219bEFSHdYMynBFyJ2w.81lV69tUGHXnOpNbloB1n9pL0:19194:0:99999:7:::
  ```

## Créer un groupe

* `groupadd` permet de créer un groupe

  ```
  $ sudo groupadd bob
  $
  $ sudo getent group bob
  bob:x:1002:
  ```

## Modifier les groupes d'un utilisateur

* `usermod` permet d'ajouter un groupe (primaire ou secondaire) à un utilisateur

  ```
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

  ```
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

* `gpasswd` permet de retirer un utilisateur d'un groupe

  ```
  $ sudo gpasswd -d bob am
  Removing user bob from group am
  $
  $ sudo groups bob
  bob : bob
  $
  $ sudo id bob
  uid=1001(bob) gid=1002(bob) groups=1002(bob)
  ```

## Supprimer un compte

* `userdel` permet de supprimer un compte  
  -r pour également supprimer le home directory et son contenu

  ```
  $ sudo userdel -r dradford
  ```
