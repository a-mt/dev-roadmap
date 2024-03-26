---
title: Configurer l'escalade de privilèges
category: Linux
---

* Pour avoir le droit d'utiliser `sudo`, il faut

  - que l'utilisateur soit configuré dans le fichier `/etc/sudoers`
  - ou alors que l'utilisateur appartienne à un groupe configuré dans ce fichier

## Vérifier les droits sudo

Pour vérifier si bob peut utiliser sudo:

1. Se connecter en tant que "bob".  
   Taper le mot de passe de l'utilisateur

    ```
    # su bob
    ```

2. Vérifier si le système autorise l'utilisateur en cours à utiliser sudo:

    ```
    $ sudo ls
    ```

    Vous serez invité à saisir le mot de passe de l'utilisateur, puis la commande donnée s'executera.  
    Si au contraire, vous obtenez un message d'erreur, c'est que l'utilisateur n'a pas les bons droits

3. Se déconnecter

    ```
    $ whoami
    bob
    $ exit

    # whoami
    root
    ```

## Éditer le fichier sudoers

* L'édition du fichier <ins>/etc/sudoers</ins> peut se faire avec la commande `visudo` — et plutôt que de passer directement par un éditeur tel que vim, cette approche est préférable puisqu'elle s'assurera que le fichier a la bonne syntaxe avant d'appliquer les modifications.

  ``` bash
  $ sudo visudo
  ```

* La syntaxe générale d'une entrée dans le fichier est comme suit

  ```
  user machine=(runAsUser:Group) options: commands
  ```

  - **user**  
    L'utilisateur, alias ou nom de groupe

    ```
    User_Alias INTERNS=joe,emorse,amonk

    root
    %wheel
    %sudo
    INTERNS
    ```

  - **machine=**  
    Machine ou hôte sur laquelle le privilège est autorisé

    ```
    Host_Alias TESTSYSTEMS=192.168.42.119,192.168.42.120

    ALL=
    TESTSYSTEMS=
    ```

  - **(runAsUser:group)** (optionnel)  
    Autoriser l'utilisateur a executer des commandes en tant qu'un autre utilisateur (sudo -u)  
    ou autre groupe primaire (sudo -g)

    ```
    (ALL)
    (ALL:ALL)
    ```

  - **options** (optionnel).  
    Par exemple `NOPASSWD:` pour ne pas avoir à entrer de mot de passe

    ```
    NOPASSWD:
    ```

  - **commands**  
    Commandes que l'utilisateur a le droit d'executer

    ```
    ALL
    /usr/bin/mount
    ```

* Par exemple, pour donner tous les droits à root:

  ```
  root ALL=(ALL:ALL) ALL
  ```

  - `root`: l'utilisateur root a le droit d'utiliser sudo
  - `ALL=`: sur tous les systèmes
  - `(ALL:ALL)`: pour n'importe utilisateur (sudo -u) ou quel groupe (sudo -g)
  - `ALL`: pour lancer n'importe quelle commande

### Exemples

* Permettre à l'utilisateur "bob" d'exécuter toutes les commandes avec sudo mais seulement après avoir saisi le mot de passe

  ```
  bob ALL=(ALL) ALL
  ```

  Permettre à l'utilisateur "bob" d'exécuter n'importe quelle commande avec sudo sans avoir à fournir son mot de passe.

  ```
  bob ALL=(ALL) NOPASSWD: ALL
  ```

  Permettre à l'utilisateur "bob" d'exécuter la commande /usr/bin/mount avec sudo

  ```
  bob ALL=(ALL) /usr/bin/mount
  ```

  Permettre à l'utilisateur "bob" d'exécuter des commandes sudo en tant qu'utilisateur "sam"

  ```
  bob ALL=(sam) ALL
  ```

* Permettre à tous les utilisateur du groupe wheel  
  d'utiliser la commande sudo, sur tout système, en tant que n'importe quel utilisateur, pour n'importe quelle commande.  
  Note: par défaut, sur CentOS et Red Hat, on trouvera typiquement wheel, et sous Ubuntu sudo. 

  `%wheel ALL=(ALL) ALL`  

  Permettre à tous les utilisateur du groupe sudo  
  d'utiliser sudo sur tout système sans avoir à entrer le mot de passe root

  ```
  %sudo ALL= NOPASSWD: ALL
  ```

* Permettre à tous les utilisateurs listés dans INTERNS de lancer n'importe quelle commande sur les systèmes listés dans TESTSYSTEMS

  ```
  User_Alias INTERNS=joe,emorse,amonk
  Host_Alias TESTSYSTEMS=192.168.42.119,192.168.42.120

  INTERNS TESTSYSTEMS = ALL
  ```

## Ajouter un fichier dans sudoers.d

* Une autre alternative sur les distributions Linux récentes, est de créer un fichier dans <ins>/etc/sudoers.d</ins>.   
  Généralement le nom du fichier est le nom de l'utilisateur à qui root souhaite accorder des accès sudo, mais cette convention n'est pas indispensable car sudo analysera tous les fichiers du répertoire.

  ```
  # echo 'student ALL=(ALL)  ALL' > /etc/sudoers.d/student

  # chmod 440 /etc/sudoers.d/student
  ```

  Certaines distributions nécessitent les permissions 440, d'autres 400 — vérifier les permissions sur /etc/sudoers et appliquer les mêmes