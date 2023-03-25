---
title: Utilisateurs & groupes
category: Linux
---

## Fichiers de configuration

La commande principale pour créer un compte utilisateur est useradd, mais il y a également des fichiers de configuration impliqués dans le processus. Notons que la plupart des éléments de ces fichiers peuvent être écrasés en utilisant les options de la commande useradd.

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

---

## Utilisateur

### Créer un utilisateur

* `useradd` permet de créer un utilisateur

  ``` bash
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

  ``` bash
  sudo useradd -m -c "Eric Dolphy" -s /bin/bash edolphy
  su passwd edolphy

  grep edolphy /etc/passwd /etc/group
  sudo userdel -r edolphy
  ```

  L'option -D permet voir les configs par défaut

  ``` bash
  $ useradd -D
  GROUP=100
  HOME=/home
  INACTIVE=-1
  EXPIRE=
  SHELL=/bin/sh
  SKEL=/etc/skel
  CREATE_MAIL_SPOOL=no
  ```

### Modifier un compte

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

### Créer un mot de passe

* `passwd` permet de modifier le mot de passe d'un utilisateur.  
  Par défaut, quand un utilisateur est crée il n'a pas de mot de passe configuré. Il faut définir un mot de passe pour pouvoir s'identifier.

  ```
  $ sudo getent shadow bob
  bob:!:19194:0:99999:7:::
  $
  ```
  ```
  $ sudo passwd bob
  Enter new UNIX password: 
  Retype new UNIX password: 
  passwd: password updated successfully
  $
  $ sudo getent shadow bob
  bob:$6$tAAyaXJ5$JiDe/B1adO3EVy.P6XcYqoetMHsnPINjN/AwfqD0o219bEFSHdYMynBFyJ2w.81lV69tUGHXnOpNbloB1n9pL0:19194:0:99999:7:::
  ```

* Tout utilisateur a le droit de modifier son propre mot de passe; pour modifier le mot de passe d'un autre utilisateur, il faut avec les droits root.

### Configurations du mot de passe

* On peut utiliser la commande `passwd -S` pour afficher des informations sur le mot de passe de l'utilisateur:

  ```
  $ sudo passwd -S dradford
  dradford P 08/14/2021 0 99999 7 -1
  ```

  1. Nom de l'utilisateur

  2. Statut du mot de passe  
     - P indique que le mot de passe est définit
     - L que le compte est bloqué
     - NP que le mot de passe n'est pas définit

  3. Dernière fois que le passe a été modifié  
     14 août

  4. Nombre de jours entre deux changements de mot de passe  
     0

  5. Nombre de jours avant que l'utilisateur ait à changer son mot de passe
     999999 indique que l'utilisateur n'a pas à modifier son mot de passe

  6. Combien de jours à l'avance avertir l'utilisateur qu'il doit changer son mot de passe
     7

  7. Mot de passe inactif
     -1 indique qu'il est actif

* La commande `passwd` permet de modifier certaines de ces informations.

  ```
  $ sudo passwd -l dradford
  passwd: password expiry information changed.
  $
  $ sudo passwd -S dradford
  dradford L 08/14/2021 0 99999 7 -1
  ```

  ```
  $ sudo passwd -u dradford
  passwd: password expiry information changed.
  $
  $ sudo passwd -S dradford
  dradford P 08/14/2021 0 99999 7 -1
  ```

* Pour modifier la date d'expiration du mot de passe, on utilise la commande `chage` (change age).

  ```
  sudo chage -l dradford
  Last password change                              : Aug 14, 2021
  Password expires                                  : never
  Password inactive                                 : never
  Account expires                                   : never
  Minimum number of days between password change    : 0
  Maximum number of days between password change    : 99999
  Number of days of warning before password expires : 7
  ```

  ```
  $ sudo chage dradford
  Changing the aging information for dradford
  Enter the new value, or press ENTER for the default

    Minimim Password Age [0]: 5
    Maximum Password Age [99999]: 60
    Last Password Change (YYYY-MM-DD) [2021-08-14]:
    Password Expiration Warning [7]: 15
    Password Inactive [-1]:
    Account Expiration Date (YYYY-MM-DD) [-1]: 2022-08-30

  $
  $ sudo chage -l dradford
  Last password change                              : Aug 14, 2021
  Password expires                                  : Oct 13, 2021
  Password inactive                                 : never
  Account expires                                   : Aug 30, 2022
  Minimum number of days between password change    : 5
  Maximum number of days between password change    : 60
  Number of days of warning before password expires : 15
  ```

## Supprimer un compte

* `userdel` permet de supprimer un compte  
  -r pour également supprimer le home directory et son contenu

  ```
  $ sudo userdel -r dradford
  ```

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

* Avant d'ajouter des utilisateurs au groupe sudo:  
  l'utilisation de sudo est définit par le fichier `/etc/sudoers`

---

## Fichiers systèmes

* Quand un nouveau compte est crée, les fichiers suivants sont modifiés:

  - <ins>/etc/passwd</ins>: contient les infos du compte
  - <ins>/etc/shadow</ins>: contient les infos du mot de passe
  - <ins>/etc/group</ins>: contient les infos du groupe

* Notons qu'on peut afficher le contenu de ces fichiers avec `cat`  
  ou on peut afficher le contenu de la base de données du système (en RAM) avec `getent`

  ```
  cat /etc/group | grep groupname
  getent group groupname
  ```

### /etc/passwd

* Chaque compte occupe une ligne dans le fichier /etc/passwd.  
  Chaque compte a plusieurs champs, délimités par un deux-points:

  <ins>Exemple</ins>

  ```
  christine:x:1001:1000:Christine Bresnahan:/home/christine/:/bin/bash
  ```

  1. Nom utilisateur
  2. Mot de passe (x s'il est stocké dans /etc/shadow)
  3. ID de l'utilisateur (UID)
  4. ID du groupe principal (GID)
  5. Commentaire (souvent le nom entier)
  6. Home directory
  7. Shell par défaut (/bin/nologin ou /bin/false s'il n'est pas autorisé à se connecter)

### /etc/shadow

* Comme pour passwd, chaque compte occupe une ligne dans le fichier /etc/shadow et chaque champ est délimité par un deux-points:

  <ins>Exemple</ins>

  ```
  dradford:$6$OtMx2Y[...]:18853:0:99999:7:::
  ```

  1. Nom utilisateur (le même que dans passwd)

  2. Mot de passé  
     Hashé, généralement avec sha256 ou sha512. Il se peut également que ce champ ne contiennent pas le mot de passe mais une valeur spéciale:

     !! ou !: le mot de passe n'est pas définit  
     ! ou * : le compte n'est pas autorisé à se connecter
     ! devant le hash: le compte est bloqué

     On trouve généralement * pour les comptes systèmes — les comptes système ont généralement besoin d'avoir un compte dans shadow et passwd pour fonctionner, sans pour autant qu'il soit autorisé de se connecter à ces comptes.

  3. Dernière date de changement du mot de passe (format epoch, c'est à dire le nombre de jours depuis le 1er Janvier 170)

  4. Nombre minimum de jours entre deux changements de mot de passe  
      On ne veut pas autoriser l'utilisateur à changer son mot de passe pour ensuite revenir à son mot de passe d'origine. Bien que la plupart des systèmes d'aujourd'hui conservent un historique des mots de passe, il est toujours bon de fixer ce champ à au moins 3 ou 4 jours pour conserver une approche de sécurité à plusieurs niveaux.

  5. Nombre de jours avant que le mot de passe ne soit expiré  
     Autrement dit, il s'agit de la date d'expiration du mot de passe. L'utilisateur devra changer son mot de passe avant que cette date n'arrive. Lorsque la date est dépassée, l'utilisateur dispose d'une période de grâce pour se connecter et changer son mot de passe — mais à trop attendre, il sera nécessaire de contacter le super-utilisateur pour réinitialiser le mot de passe.

  6. Nombre de jours d'avertissement avant l'expiration du mot de passe  
     Il est bon de donner au moins 14 ou 15 jours.

  7. Nombre de jours avant que le compte ne soit bloqué après que le mot de passe ait expiré  
     Une fois depassé, il n'est plus possible de se connecter avec le compte

  8. Date d'expiration du compte (format epoch)  
     Typiquement utilisé pour créer un compte temporaire, par exemple pour un stagiaire.

  9. Flag (usage réservé)

* Le mot de passe se trouve dans le fichier shadow pour des raisons historiques:  
  à l'origine les mots de passe étaient stockés dans le fichier /etc/passwd mais ce fichier est lisible par quiconque. En utilisant une rainbow table, c'est à dire une table qui contient un dictionnaire de mots et le hash de ces mots, il est potentiellement possible de retrouver le mot de passe en clair.  
  Le mot de passe a donc été déplacé dans un fichier plus sécurisé: /etc/shadow. 
  Ce fichier n'est lisible que par l'utilisateur root — et peut être modifié avec la commande `passwd` grâce à SUID.

### /etc/group

* Chaque groupe occupe une ligne dans le fichier /etc/group et contient plusieurs champs délimités par un deux-points

  <ins>Exemple</ins>

  ```
  wheel:x:27:jdoe
  ```

  1. Nom du groupe  
     Ce nom doit être unique sur le système

  2. Mot de passe  
     x s'il est présent dans le fichier shadow  
     Comme pour le fichier passwd, le mot de passe du groupe est indiqué dans le second champ (s'il existe) mais est en réalité stocké dans le fichier /etc/gshadow

  3. ID du groupe

  4. Membres du groupe — s'il y en a
