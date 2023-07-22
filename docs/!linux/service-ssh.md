---
title: SSH
category: Linux
---

## Configs serveur

* Le fichier de configuration du serveur SSH est `/etc/ssh/sshd_config`

    * Le première paramètre important est le numéro de port sur lequel de daemon SSH accepte les connexions entrantes:

        ```
        Port 988
        ```

    * Pour n'accepter que les connexions entrantes sur IPv4:

        ```
        AddressFamily inet
        ```

        Pour plus d'infos: man sshd_config /Family

    * Par défaut, le daemon écoute les connexions entrantes sur toues les adresses IP disponibles. Si on veut que SSH ne soit accessible qu'aux employés du bâtiment, connectés au réseau interne, on peut indiquer au daemon de n'écoute que sur cette adresse IP

        ```
        ListenAddress 10.11.12.9
        ```

    * Pour interdire à root de se connecter via SSH:

        ```
        PermitRootLogin no
        ```

    * SSH prend en charge différents mécanismes de connexio. Les plus populaires osnt les mots de passe et les clés SSH. Certains administrateurs préfèrent désactiver l'authentification par mot de passe:

        ```
        PasswordAuthentication no
        ```

    * Jusqu'ici les paramètres sont appliqués globalement, à tous les utilisateurs souhaitant se connecter via SSH. On peut également définir des paramètres spécifiques pour des utilisateurs donnés.

        Par exemple, pour faire une exception:

        ```
        PasswordAuthentication no
        Match User aaron
            PasswordAuthentication yes
        ```

* Après avoir modifié le fichier de config, il faut redémarrer le daemon SSH pour que les nouveaux paramètres soient appliqués

    ```
    sudo systemctl reload sshd.service
    ```

## Configs client

* Lorsqu'on utilise la commande shh, on exécute en réalité le client ssh, qui un programme en ligne de commande.

* Le fichier de configuration global du client SSH est `/etc/ssh/ssh_config`  
  Par exemple, par défaut, le client essaiera de se connecter au serveur sur le port 22. On peut changer ça

  ```
  Port 229
  ```

  Il n'est cependant pas recommandé d'éditer ce fichier car une future mise à jour peut écraser les changements. Une meilleure manière de procéder est d'ajouter un nouveau fichier de configuration dans `/etc/.ssh/ssh_config.d`

  ``` bash
  $ sudo vim /etc/.ssh/ssh_config.d/99-our-settings.conf
  Port 229
  ```

* Le client SSH conserve également des fichiers de configuration pour chaque utilisateur dans `~/.ssh`. Pour des raison de raisons, le client SSH exige que ces fichiers ne puissent pas être lus par d'autres utilisateurs (700 sur le répertoire)

    Il n'y a généralement pas de fichier de configuration crée par défaut, mais on peut en créer un manuellement: `~/.ssh/config`  
    Pour voir les options qu'on peut y placer: man ssh_config

    ``` bash
    $ ssh aaron@10.11.12.9

    $ vim .ssh/config
    Host centos
        HostName 10.11.12.9
        Port 22
        User aaron
    $ chmod 600 !$

    $ ssh centos
    ```

    Dans l'exemple précédent, on a plus besoin de se souvenir de l'IP et du nom d'utilsiateur pour chaque serveur, juste a se souvenir du nom d'hôte définit dans notre config.

## Connexion via clé SSH

Si on veut se connecter avec des clés SSH plutôt que des mots de passe:

1. Côté client: générer une paire de clés privée / publique.  
   La passphrase est un mot de passe, utilisé pour encrypter la clé SSH. Ainsi, si une personne vole le fichier, sans le mot de passe, elle ne peut pas décrypter la clé et se connecter aux serveurs


    ``` bash
    $ ssh-keygen
    ...
    Your identification has been saved in /home/aaron/.ssh/id_rsa.
    Your public key has been saved in /home/aaron/.ssh/id_rsa.pub.
    ```

    Les clés ont été générés dans ~/.ssh

2. Côté serveur: si on peut pouvoir se connecter au serveur avec la clé privée, il faut copier la clé publique sur le serveur.  
  Ajouter le contenu de la clé publique vers `.ssh/authorized_keys`

    ```
    $ cat .ssh/id_rsa.pub
    ```

    ``` bash
    $ vim authorized_keys
    $ chmod 6000 authorized_keys
    ```

    Désormais, quiconque possède la clé privée correspondant à la clé publique ajoutée au fichier authorized_keys peut se connecter via ssh au compte de cet utilisateur

3. La première fois qu'on se connecte, on reçoit un message indiquant que l'authenticité du serveur ne peut être établie. Une fois qu'elle est acceptée, l'empreinte digitale du serveur est stockée dans le fichier `.ssh/known_hosts`

    Les prochaines fois qu'on se connecte, le client compare l'empreinte connue à l'empreinte indiquée par le serveur: si elle correspond, c'est qu'on a affaire au même serveur. Sinon, quelqu'un a manipulé le serveur — ou souvent, on a réinstallé le système sur un tout nouveau serveur.

    Pour supprimer une ancienne empreinte:

    ``` bash
    $ ssh-keygen -R 10.11.12.9
    Host 10.11.12.9 not found in /home/aaron/.ssh/known_hosts
    ```

    Si on veut supprimer toutes les empreintes, on peut simplement supprimer le fichier.
