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

* Typiquement, useradd suit les étapes suivantes:

  1. Le prochain UID supérieur à UID_MIN (définit dans /etc/login.defs) est attribué comme UID du nouvel utilisateur

      Une entrée est ajoutée dans le fichier /etc/shadow, avec `!!` pour mot de passe, ce qui oblige l'administrateur à attribuer un mot de passe pour que le compte soit utilisable.

  2. Un groupe de même nom que l'utilisateur est crée, avec un GID=UID, et est assigné comme groupe primaire de l'utilisateur

      Une entrée est ajoutée dans le fichier /etc/group.

  3. Un répertoire personnel /home/USERNAME est crée, avec l'utilisateur pour propriétaire

  4. Le contenu de /etc/skel est copié dans le home directory de l'utilisateur. Par défaut, cela inclut des fichiers de démarrage pour bash et pour le serveur X

* L'option -D permet voir les configs par défaut

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

* Quick recap:

  ``` bash
  sudo useradd -m -c "Eric Dolphy" -s /bin/bash edolphy
  su passwd edolphy

  grep edolphy /etc/passwd /etc/group
  sudo userdel -r edolphy
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

  ``` bash
  $ sudo getent shadow bob
  bob:!:19194:0:99999:7:::
  $
  ```
  ``` bash
  $ sudo passwd bob
  Enter new UNIX password: 
  Retype new UNIX password: 
  passwd: password updated successfully
  $
  $ sudo getent shadow bob
  bob:$6$tAAyaXJ5$JiDe/B1adO3EVy.P6XcYqoetMHsnPINjN/AwfqD0o219bEFSHdYMynBFyJ2w.81lV69tUGHXnOpNbloB1n9pL0:19194:0:99999:7:::
  ```

* Tout utilisateur a le droit de modifier son propre mot de passe; pour modifier le mot de passe d'un autre utilisateur, il faut avec les droits root.

* Par défaut, le mot de passe est examiné par pam_cracklib.so, ce qui favorise le choix d'un mot de passe fort. Les utilisateurs normaux ne sont pas autorisés à définir un mot de passe faible (tels que des mots de passe trop courts ou basés sur des mots du dictionnaire) mais root le peut.

### Configurations du mot de passe

* On peut utiliser la commande `passwd -S` pour afficher des informations sur le mot de passe de l'utilisateur:

  ```
  $ sudo passwd -S bob
  bob P 04/10/2023 0 99999 7 -1
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

### chage

* `chage` (change age) permet de modifier la date d'expiration d'un mot de passe ou d'un compte.  
  Seul root peut utiliser cette commande.  
  La seule exception à cette règle est que tout utilisateur peut utiliser l'option -l  
  pour déterminer la date d'expiration de son mot de passe ou de son compte.

  ``` bash
  $ sudo passwd -S bob
  bob P 04/10/2023 0 99999 7 -1

  $ sudo chage -l bob
  Last password change          : Apr 10, 2023
  Password expires          : never
  Password inactive         : never
  Account expires           : never
  Minimum number of days between password change    : 0
  Maximum number of days between password change    : 99999
  Number of days of warning before password expires : 7
  ```

* chage peut être utilisé interractivement

  ``` bash
  $ sudo chage bob
  Changing the aging information for bob
  Enter the new value, or press ENTER for the default

    Minimum Password Age [0]: 5
    Maximum Password Age [99999]: 60
    Last Password Change (YYYY-MM-DD) [2023-04-10]: 
    Password Expiration Warning [7]: 15
    Password Inactive [-1]: 
    Account Expiration Date (YYYY-MM-DD) [-1]: 2023-04-20

  $ sudo chage -l bob
  Last password change          : Apr 10, 2023
  Password expires          : Jun 09, 2023
  Password inactive         : never
  Account expires           : Apr 20, 2023
  Minimum number of days between password change    : 5
  Maximum number of days between password change    : 60
  Number of days of warning before password expires : 15

  $ sudo passwd -S bob
  bob P 04/10/2023 5 60 15 -1
  ```

  On directement avec options

  ``` bash
  # Mindays / maxdayq
  $ sudo chage -m 6 -M 59 bob

  # Account expiration
  $ sudo chage -E 2023-04-19 bob

  $ sudo chage -l bob
  Last password change          : Apr 10, 2023
  Password expires          : Jun 08, 2023
  Password inactive         : never
  Account expires           : Apr 19, 2023
  Minimum number of days between password change    : 6
  Maximum number of days between password change    : 59
  Number of days of warning before password expires : 15
  ```

* On peut également forcer l'utilisateur à changer son mot de passe à son prochain login:

  ``` bash
  # Password expiration
  $ sudo chage -d0 bob
  # ou passwd -e bob

  $ sudo chage -l bob
  Last password change          : password must be changed
  Password expires          : password must be changed
  Password inactive         : password must be changed
  Account expires           : Apr 19, 2023
  Minimum number of days between password change    : 6
  Maximum number of days between password change    : 59
  Number of days of warning before password expires : 15

  $ sudo passwd -S bob
  bob P 01/01/1970 6 59 15 -1

  $ su bob
  Password: 
  You are required to change your password immediately (administrator enforced)
  Changing password for bob.
  Current password:
  ```

### Compte verrouillé

* Un compte verrouillé (*locked*) peut exécuter des programmes, mais ne peut pas se connecter au système et aucun mot de passe ne leur est associé.  
  Par exemple, le fichier /etc/passwd contient des entrées telles que:

  ```
  bin:x:1:1:bin:/bin:/sbin/nologin
  daemon:x:2:2:daemon:/sbin:/sbin/nologin
  ```

  Si un utilisateur avec le shell "nologin" tente de se connecter au système, un message "This account is currently not available." est renvoyé — ou tout autre message stocké dans le fichier /etc/nologin.txt

  Les comptes verrouillés n'ont pas de mot de passe valide, généralement représenté par " !!" dans /etc/shadow

* Il est également possible de verrouiller le compte d'un utilisateur donné comme suit:

  ``` bash
  $ sudo usermod -L bob
  $ sudo passwd -S bob
  bob L 04/10/2023 6 59 15 -1

  $ su bob
  Password: 
  su: Authentication failure
  ```

  ou

  ``` bash
  $ sudo passwd -l bob
  passwd: password expiry information changed.
  $ sudo passwd -S bob
  bob L 04/10/2023 6 59 15 -1
  ```

  Le compte reste sur le système mais il est impossible de s'y connecter.  
  Une pratique courante consiste à verrouiller le compte d'un utilisateur lorsqu'il quitte l'organisation ou lorsqu'il est en congé prolongé.  
  Pour le déverrouiller:

  ``` bash
  $ sudo usermod -U bob
  $ sudo passwd -S bob
  bob P 04/10/2023 6 59 15 -1
  ```

  ou

  ``` bash
  $ sudo passwd -u bob
  passwd: password expiry information changed.
  $ sudo passwd -S bob
  bob P 04/10/2023 6 59 15 -1
  ```

* Une autre façon de verrouiller un compte est d'utiliser `chage` pour modifier la date d'expiration du compte à une date passée.  
  La date réelle n'a pas d'importance tant qu'elle se situe dans le passé

  ``` bash
  $ sudo chage -E 2001-09-11 bob
  $ sudo passwd -S bob
  bob P 04/10/2023 6 59 15 -1

  $ su bob
  Password: 
  Your account has expired; please contact your system administrator
  su: Authentication failure
  ```

* En cas d'urgence, verrouiler les comptes ou définir le shell par défaut des utilisateurs comme étant nologin serait trop long: dans cette situation, créer le fichier `/etc/nologin` empêchera tout le monde de se connecter au système, à l'exception de l'utilisateur root.

  On peut simplement créer le fichier, mais également y ajouter un message, qui sera affiché aux personnes dont la connexion est refusée.

### Compte système

* La convention utilisée par la plupart des distributions Linux est que tout compte dont l'UID est inférieur à 1000 est considéré comme spécial et appartient au système; les comptes d'utilisateurs normaux commencent à 1000. La valeur réelle est définie comme UID_MIN et est définie dans /etc/login.defs.

  Historiquement, les distributions dérivées de Red Hat utilisaient UID_MIN=500, et non 1000, mais à partir de RHEL 7, la valeur plus courante de 1000 a été adoptée.

  Si aucun UID n'est spécifié lors de l'utilisation de useradd, le système attribuera progressivement des identifiants d'utilisation à partir de UID_MIN.

  De plus, chaque utilisateur reçoit un identifiant de groupe primaire qui, par défaut, est le même que l'UID. Ces groupes sont parfois appelés groupes privés d'utilisateurs (UPG).

### Supprimer un compte

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

  1. username  
     Nom utilisateur

  2. password  
     Mot de passe (x s'il est stocké dans /etc/shadow)

  3. uid  
     ID de l'utilisateur (UID)

  4. gid  
     ID du groupe principal (GID)

  5. comment  
     Commentaire (souvent le nom entier)

  6. home  
     Home directory

  7. shell  
     Shell par défaut (/bin/nologin ou /bin/false s'il n'est pas autorisé à se connecter)

### /etc/shadow

* Comme pour passwd, chaque compte occupe une ligne dans le fichier /etc/shadow et chaque champ est délimité par un deux-points:

  <ins>Exemple</ins>

  ```
  dradford:$6$OtMx2Y[...]:18853:0:99999:7:::
  ```

  1. username:  
     Nom utilisateur (le même que dans passwd)

  2. password:  
     Mot de passe hashé, généralement avec sha256 ou sha512.  
     Pour un sha512: on aura la chaîne `$6$`, le salt sur 8 caractères suivit de `$`, et le hash sur 88 caractères

     Il se peut également que ce champ ne contiennent pas le mot de passe mais une valeur spéciale:

     !! ou !: le mot de passe n'est pas définit  
     ! ou * : le compte n'est pas autorisé à se connecter
     ! devant le hash: le compte est bloqué

     On trouve généralement * pour les comptes systèmes — les comptes système ont généralement besoin d'avoir un compte dans shadow et passwd pour fonctionner, sans pour autant qu'il soit autorisé de se connecter à ces comptes.

  3. lastchange:  
     Dernière date de changement du mot de passe (format epoch, c'est à dire le nombre de jours depuis le 1er Janvier 170)

  4. mindays:  
     Nombre minimum de jours entre deux changements de mot de passe  
      On ne veut pas autoriser l'utilisateur à changer son mot de passe pour ensuite revenir à son mot de passe d'origine. Bien que la plupart des systèmes d'aujourd'hui conservent un historique des mots de passe, il est toujours bon de fixer ce champ à au moins 3 ou 4 jours pour conserver une approche de sécurité à plusieurs niveaux.

  5. maxdays:  
     Nombre de jours avant que le mot de passe ne soit expiré  
     Autrement dit, il s'agit de la date d'expiration du mot de passe. L'utilisateur devra changer son mot de passe avant que cette date n'arrive. Lorsque la date est dépassée, l'utilisateur dispose d'une période de grâce pour se connecter et changer son mot de passe — mais à trop attendre, il sera nécessaire de contacter le super-utilisateur pour réinitialiser le mot de passe.

  6. warn:  
     Nombre de jours d'avertissement avant l'expiration du mot de passe  
     Il est bon de donner au moins 14 ou 15 jours.

  7. grace:  
     Nombre de jours avant que le compte ne soit bloqué après que le mot de passe ait expiré  
     Une fois depassé, il n'est plus possible de se connecter avec le compte

  8. expire:  
     Date d'expiration du compte (format epoch)  
     Typiquement utilisé pour créer un compte temporaire, par exemple pour un stagiaire.  

  9. flag   
     Usage réservé

* Le nom d'utilisateur dans /etc/shadow doit correspondre exactement à celui trouvé dans /etc/passwd, et doit également apparaître dans le même ordre.

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

  1. groupname:  
     Nom du groupe. Ce nom doit être unique sur le système

  2. password:  
     Mot de passe. x s'il est présent dans le fichier shadow  
     Comme pour le fichier passwd, le mot de passe du groupe est indiqué dans le second champ (s'il existe) mais est en réalité stocké dans le fichier /etc/gshadow

  3. GID:  
     ID du groupe

  4. user1,user2,...:  
     Liste des utilisateurs membres du groupe (s'il y en a), séparés par des virgules. L'utilisateur n'a pas à figurer ici si ce groupe est le groupe principal de l'utilisateur

* On peut éditer le fichier `/etc/group` avec `vigr`

## Qualité du mot de passe

* La plupart des systèmes utilisent PAM (*pluggable authentication modules*).

* Avec le fichier de configuration pour PAM, on peut définir un groupe pouvant se connecter au système, même si le fichier /etc/nologin existe

* En fonction de la configuration de PAM, le mot de passe devra répondre à des exigences pour maintenir la qualité du mot de passe, tel que le nombre minimum de caractères.  
  Les configurations peuvent être modifiées dans me fichier `/etc/security/pwquality.conf`  
  Il est possible de passer outre ces exigences avec les privilèges root, mais ce n'est pas une bonne idée, ces exigences sont en place pour contribuer à la sécurité du système

* Si le module l'historique de PAM est utilisé, il ne sera pas possible de réutiliser un mot de passe récemment utilisé pour le compte.  

---

## Utilisateur en cours

* `whoami` permet d'afficher le nom de l'utilisateur en cours

  ``` bash
  $ whoami
  aurelie
  ```

* `who` permet d'afficher la liste des utilisateurs loggés, sur quelle interface et depuis quand

  ``` bash
  $ who
  aurelie  tty7         2023-04-15 07:16 (:0)
  aurelie  pts/0        2023-04-15 09:53 (X)
  ```

* On peut également utiliser `w`

  ``` bash
  $ w
   17:49:26 up 10:35,  2 users,  load average: 1.53, 0.72, 0.57
  USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
  aurelie  tty7     :0               07:16   10:35m 19:22   0.97s /usr/libexec/gnome-session-binary --systemd --builtin --session=pantheon
  aurelie  pts/0    X                09:53    1.00s  2:37   0.00s w
  ```

  On trouvera pour chaque utilisateur:
  - USER: nom du compte
  - TTY: terminal utilisé
  - FROM: emplacement remote de l'utilisateur, s'il y en a
  - LOGIN@: quand l'utilisateur s'est loggé
  - IDEL: temps depuis la dernière activité de l'utilisateur
  - JCPU: temps CPU total utilisé par l'utilisateur
  - PCPU: temps CPU total que la commande en cours a utilisé
  - WHAT: commande en cours que l'utilisateur a lancé

  La première ligne est un sommaire des statistiques, tel que le nombre total d'utilisateurs sur le système ainsi que le moyenne d'utilisation du CPU

  `w` lit les données présentes dans /proc et /var/log/utmp

* `last` liste tous les utilisateurs s'étant connectés dernièrement au système, ainsi que les boots

  ``` bash
  $ last | head
  aurelie  pts/2        X                Sat Apr 15 14:44 - 14:44  (00:00)
  aurelie  pts/0        X                Sat Apr 15 09:53    gone - no logout
  aurelie  pts/1        X                Sat Apr 15 07:16 - 09:53  (02:37)
  aurelie  pts/0        X                Sat Apr 15 07:16 - 07:16  (00:00)
  aurelie  tty7         :0               Sat Apr 15 07:16    gone - no logout
  reboot   system boot  5.15.0-69-generi Sat Apr 15 07:13   still running
  aurelie  pts/1        X                Fri Apr 14 07:28 - down   (11:48)
  aurelie  pts/0        X                Fri Apr 14 07:28 - 07:28  (00:00)
  aurelie  tty7         :0               Fri Apr 14 07:28 - 19:16  (11:48)
  reboot   system boot  5.15.0-69-generi Fri Apr 14 07:24 - 19:16  (11:52)
  ```

  Cette commande lit les données de /var/log/wtmp  
  Comme tout fichier de log, ce fichier tourne (avec logrotate), pour voir des informations plus anciennes, il faut utiliser l'option `-f` pour spécifier le fichier à utiliser

  ```
  $ ls /var/log/wtmp*
  /var/log/wtmp /var/log/wtmp.1

  $ last -f /var/log/wtmp.1
  ```

  On peut également afficher les données pour un utilisateur donné

  ```
  $ last samantha
  samantha tty3                          Wed Dec  8 11:33 - 11:33  (00:00)
  ```

* `lastb` liste les échecs de connexion (nécessaire les privilèges root)

  ``` bash
  $ lastb
    samantha tty4                          Wed Dec  8 11:34 - 11:34  (00:00)
  ```

  Cette commande lit les données de /var/log/btmp  
  Ces fichiers sont également tournés, utiliser -f pour spécifier un autre fichier

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

* `su` (prononcer "ess-you") permet de s'authentifier en tant que root.   
  L'approche sudo est largement préférée à su

  ```
  $ su
  ```

  PAM (*Pluggable Authentication Modules*) peut être utilisé pour restreindre quels utilisateurs ont le droit de s'identifier en tant que root

* Ou on peut s'identifier avec le compte d'un autre utilisateur.  
  Utiliser le dash (-) aura pour effet d'executer les fichiers d'environnement de l'utilisateur — on aura donc les variables d'environnement de cet utilisateur et non plus celle de l'utilisateur qu'on avait avant de changer

  ```
  $ su - christine
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
