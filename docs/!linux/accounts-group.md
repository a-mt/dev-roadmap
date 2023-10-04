---
title: Groupes
category: Linux
---

## Groupe

### Créer un groupe

* `groupadd` permet de créer un groupe

  ```
  $ sudo groupadd bob
  $
  $ sudo getent group bob
  bob:x:1002:
  ```

### Mot de passe du groupe

* Il est possible de se connecter à un groupe auquel on n'appartient pas en utilisant le mot de passe du groupe, lequel peut être définit avec la commande `gpasswd`. Mais il est conseillé de ne pas utiliser le mot de passe du groupe: une bonne pratique en sécurité est de ne jamais  partager un mot de passe, et c'est ce que vous devrez faire si vous définissez un mot de passe de groupe.  
  Si vous voulez permettre à un utilisateur d'accéder à un groupe particulier, l'ajouter en tant que membre à ce groupe.

### Modifier les groupes d'un utilisateur

* Un utilisateur Linux a un groupe primaire, répertorié dans /etc/passwd et dans /etc/group. Un utilisateur peut également appartenir à un nombre de groupes secondaires compris entre 0 et 15.

  Le groupe primaire est le GID utilisé lorsque l'utilisateur crée des fichiers ou des répertoires. L'appartenance à d'autres groupes secondaires confère à l'utilisateur des autorisations supplémentaires.

* La liste des groupes d'un utilisateur peut être récupérée avec:

  ```
  $ groups [user1 user2 ...]
  $ id -Gn [user1 user2 ...]
  ```

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

  -G permet de définir la liste complète des groupes de l'utilisateur. Utiliser l'option -a pour ajouter de nouveaux groupes à la liste.

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

* `gpasswd` permet d'ajouter ou de retirer un utilisateur d'un groupe

  ``` bash
  $ sudo gpasswd -a trinity wheel
  ```
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

### Modifier un groupe

* Si un nom de groupe n'est plus approprié, parce que la fonction du groupe à changé, alors on peut changer le nom du groupe avec `groupmod`. Changer le nom ne changera pas les membres du groupe.

  ```
  $ sudo usermod -aG udemy
  ```
  ```
  $ sudo groupmod -n alpha udemy
  $
  $ getent group udemy
  $ getent group alpha
  alpha:x:1001:christine
  ```

### Supprimer un groupe

* `groupdel` permet de supprimer un groupe  
  Les membres du groupe sont automatiquement retirés

  ```
  $ groups
  christine adm cdrom sudo dip plugdev lpadmin sambashare alpha
  ```
  ```
  $ sudo groupdel alpha
  $
  $ groups
  christine adm cdrom sudo dip plugdev lpadmin sambashare
  ```

### Lister les groupes

* Pour voir tous les groupes de l'utilisateur en cours:

  ``` bash
  $ id
  uid=1000(am) gid=1000(am) groups=1000(am),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),118(lpadmin),128(sambashare),1001(docker)
  $
  $ groups
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  $
  $ id -Gn
  am adm cdrom sudo dip plugdev lpadmin sambashare docker
  $
  $ getent passwd christine
  christine:x:1000:1000:Christine Bresnahan,,,:/home/christine:/bin/bash
  $ getent group 1000
  christine:x:1000:
  ```

  Pour voir tous les membres d'un groupe donné:

  ```
  getent group sudo
  sudo:x:27:christine
  ```

### Groupes spéciaux

* Il existe plusieurs groupes spéciaux qui peuvent être présents sur un système, mais les deux principaux à connaître sont **wheel** et **sudo**. Ces deux groupes peuvent être utilisés pour fournir un accès a l'escalade des privilèges — autoriser l'utilisateur à se connecter ou executer des commandes en tant que root.

---

## Escalade de privilège

* `sudo` permet d'exécuter une commande en tant que root  

  ```
  $ sudo cat /etc/shadow
  root:*:18979:0:99999:7:::
  ...
  $
  $ sudo mkdir test
  $ ls -l
  drwxr-xr-x 2 root root 4096 Apr 15 16:52 test
  ```

* On peut également utiliser `sudo -u` pour désigner un utilisateur à utiliser pour executer la commande  
  Ou `sudo -g` pour désigner un groupe

  ``` bash
  $ sudo -u bob touch /tmp/test
  $ sudo -g bob touch /tmp/test2
  $ ls -l /tmp/test*
  -rw-rw-r-- 1 bob     bob 0 Apr 16 14:23 /tmp/test
  -rw-rw-r-- 1 aurelie bob 0 Apr 16 14:24 /tmp/test2
  ```

* `su` (prononcer "ess-you", pour switch user) permet de s'identifier avec le compte d'un autre utilisateur.  
  
  - Si le nom de l'utilisateur n'est pas spécifié alors on s'authentifie en tant que root.
    L'approche sudo est largement préférée à su

    ```
    $ su
    ```

    PAM (*Pluggable Authentication Modules*) peut être utilisé pour restreindre quels utilisateurs ont le droit de s'identifier en tant que root

  - Utiliser le dash (-) aura pour effet d'executer les fichiers d'environnement de l'utilisateur — on aura donc les variables d'environnement de cet utilisateur et non plus celle de l'utilisateur qu'on avait avant de changer

    ```
    $ su - christine
    ```

    ``` bash
    su -
    su -l
    su --login
    ```

* Pour s'identifier en tant que root:

  ``` bash
  sudo --login  # long version
  sudo -i       # short version
  ```

### Vérifier les droits sudo

* Se connecter en tant que "bob".  
  Taper le mot de passe de l'utilisateur

  ```
  # su bob
  ```

* Vérifier si le système autorise l'utilisateur en cours à utiliser sudo:

  ```
  $ sudo ls
  ```

  Vous serez invité à saisir le mot de passe de l'utilisateur, puis la commande donnée s'executera. Si au contraire, vous obtenez un message d'erreur, c'est que l'utilisateur n'a pas les bons droits

* Se déconnecter

  ```
  $ exit

  # whoami
  root
  ```

  Ou se connecter en tant que "root".  
  Taper le mot de passe de root

  ```
  $ su
  ```

### Ajouter une entrée sudoer

* Pour avoir le droit d'utiliser `sudo`, il faut

  - que l'utilisateur soit configuré dans le fichier `/etc/sudoers`
  - ou alors que l'utilisateur appartienne à un groupe configuré dans ce fichier

* L'édition du fichier peut se faire avec la commande `visudo` et il est préférable de l'utiliser, puisqu'elle s'assurera que le fichier a la bonne syntaxe avant d'appliquer les modifications.

#### Syntaxe

* La syntaxe générale d'une entrée est comme suit

  ```
  user machine=(runAsUser:Group) options: commands
  ```

  `(runAsUser:group)` et `options:` sont optionnels

* Où on aura

  - `user`: l'utilisateur, alias ou nom de groupe
  - `machine`: machine ou hôte sur laquelle le privilège est autorisé
  - `runAsUser:group`: autoriser l'utilisateur a executer les commandes en tant qu'un autre utilisateur ou groupe primaire
  - `commands`: commandes que l'utilisateur a le droit d'executer

#### Exemple

* Donner tous les droits à root

  ```
  root ALL=(ALL:ALL) ALL
  ```

  - `root`: l'utilisateur root a le droit d'utiliser sudo
  - `ALL=`: sur tous les systèmes
  - `(ALL:ALL)`: de désigner n'importe utilisateur (sudo -u) ou n'importe quel groupe (sudo -g)
  - `ALL`: pour lancer n'importe quelle commande

* Permettre à tous les utilisateur du groupe wheel  
  d'utiliser la commande sudo, sur tout système, en tant que n'importe quel utilisateur, pour n'importe quelle commande.


  `%wheel ALL=(ALL) ALL`

  Par défaut, sur CentOS et Red Hat, on trouvera typiquement wheel, et sous Ubuntu sudo.   

* Permettre à tous les utilisateur du groupe sudo  
  d'utiliser sudo sur tout système sans avoir à entrer le mot de passe root

  ```
  %sudo ALL= NOPASSWD: ALL
  ```

* Ajouter l'utilisateur "student":

  ```
  student ALL=(ALL)  ALL
  ```

* Permettre à tous les INTERNS de lancer n'importe quelle commande sur TESTSYSTEMS

  ```
  User_Alias INTERNS=joe,emorse,amonk
  Host_Alias TESTSYSTEMS=192.168.42.119,192.168.42.120

  INTERNS TESTSYSTEMS = ALL
  ```

#### sudoers.d

* Une autre alternative sur les distributions Linux récentes, est de créer un fichier dans `/etc/sudoers.d`.   
  Généralement le nom du fichier est le nom de l'utilisateur à qui root souhaite accorder l'accès sudo, mis cette convention n'est pas indispensable car sudo analysera tous les fichiers du répertoire.

  ```
  # echo 'student ALL=(ALL)  ALL' > /etc/sudoers.d/student

  # chmod 440 /etc/sudoers.d/student
  ```

  Certaines distributions nécessitent les permissions 440, d'autres 400 — vérifier les permissions sur /etc/sudoers et appliquer les mêmes
