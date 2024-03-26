---
title: Email
category: Linux
---

## Théorie

* Plusieurs tâches et plusieurs protocoles sont impliqués dans l'envoi d'un message électronique. Ces diverses tâches sont réparties entre différents programmes, classés en 4 groupes:

  - <ins>agent utilisateur de messagerie (*mail user agent*, MUA)</ins> ou client mail  
    L'utilisateur crée un email en utilisant un client mail.  
    Ex: Evolution, KMail, Thunderbird

  - <ins>agent d'envoi mail (*mail submission agent*, MSA)</ins>  
    Si le destinataire du message se trouve sur le système local, le MSA se contente de transmettre le message à l'utilisateur du système local.  
    Sinon, le mail est soumis à l'agent de transfert

  - <ins>agent de transfert de mail (*mail transfert agent*, MTA)</ins>  
    L'agent de transfert est chargé de faire en sorte qu'un message électronique lié à un système distant soit livré de manière sûre et sécurisée. Le MTA local envoie le message au MTA du système distant.  
    Une fois que le MTA du système distant reçoit le message entrant, il l'envoi à l'agent de distribution de ce système.  
    Ex: Exim, Postfix, Sendmail

  - et <ins>agent de distribution de mail (*message delivery agent*, MDA)</ins>  
    L'agent de distribution stocke le message pour que l'utilisateur puisse le consulter  
    Ex: binmail, procmail

  ![](https://i.imgur.com/6vP9Xw4.png)

  Certains programmes combinent les fonctions des agents. Ces catégories ne sont pas des règles, mais plutôt des lignes directrices permettant de comprendre les fonctions nécessaires au traitement du courrier électronique.

---

## Programmes MUA

### Mailx

* `mailx` est un client mail (MUA) en ligne de commande.  
  Il permet à l'utilisateur de créer des mails et lire les mails du système local.

1. Installer mailx à partir du repo

    ![](https://i.imgur.com/v6ASXQ8.png)

   Notons que typiquement, un alias `mail` est crée vers mailx

    ![](https://i.imgur.com/T8wXSjY.png)

2. Pour envoyer un email à un utilisateur local, utiliser la commande `mailx` suivit du nom de l'utilisateur auquel vous souhaitez envoyer le message. Ou pour envoyer un mail à un système distant, simplement ajouter un @ suivit du nom du domaine
  
    ``` bash
    $ whoami
    bob
    # envoit un mail à john de la part de bob
    $ echo "This is a test email" | mailx -s "Hi John" john
    ```
  
     L'option -s permet de spécifier le titre  
     Si on utilise pas stdin, un prompt sera ouvert pour entrer le corps du message, presser Ctrl+D pour terminer la création du mail et l'envoyer
  
     ![](https://i.imgur.com/rSFTFvZ.png)
  
3. Pour vérifier les messages de l'utilisateur courant, utiliser la commande `mail`  
   - `n` (new) pour lire les nouveaux messages
   - `d` (delete) suivi du numéro du mail pour le supprimer
   - `q` (quit) pour quitter

   ![](https://i.imgur.com/VwPdTAv.png)

   Notons que l'emplacement des fichiers emails est mentionné: /var/mail/christine.  
   <ins>/var/mail</ins> est l'emplacement typique pour le stockage des emails des utilisateurs — chaque utilisateur aura son propre fichier.

---

## Programmes MTA

* Les programmes MTA les plus populaires sous Linux sont

  - <ins>Exim</ins>:  
    MTA le plus populaire.  
    Date du milieu des années 90 (et encore maintenu).  
    A une configuration très flexible et fourni des fonctionnalités que n'ont pas les 2 autres MTA, ce qui ajoute à sa popularité

  - <ins>Postfix</ins>:  
    Second MTA le plus populaire.  
    Date de la fin des années 90 (et encore maintenu).  
    Il fournit une couche de compatibilité Sendmail: les commandes sendmail fonctionnent aussi avec postfix.
    Il est présent dans les repo CentOS et Ubuntu

  - <ins>Sendmail</ins>:  
    Historiquement populaire, mais difficile à configurer.  
    Date du début des années 80 (et encore maintenu)

### Postfix

* Pour installer postfix:  
  Sous CentOS:

    ``` bash
    $ sudo dnf install postfix

    $ sudo systemctl start postfix

    $ sudo systemctl enable postfix
    ```

  Sous Ubuntu:

  1. Installer postfix à partir du repo

      ![](https://i.imgur.com/oKl3r2G.png)

  2. Un écran d'information s'affiche.  
     Lire et presser Entrée pour continuer

     ![](https://i.imgur.com/ax9DfqY.png)

  3. Choisir un template de configuration parmis la liste.  
     Utiliser les flèches haut/bas et presser Entrée

     ![](https://i.imgur.com/oXbED1u.png)

  4. Définir le nom de la messagerie du système local.  
     Ensuite presser entrée

     ![](https://i.imgur.com/5xNA8NB.png)

  Le MTA est désormais installé et répond au nom configuré. Pour accepter les mails venant de l'extérieur, il faut 1. autoriser les requêtes venant du port 25 (port standard SMTP), 2. que le nom de domaine pointe vers l'adresse IP du serveur.

* Pour envoyer un mail, on peut utiliser mailx avec le nom du serveur,  
  ou simplement sendmail sans préciser le serveur de destination

  ![](https://i.imgur.com/5vdNBM2.png)
  ![](https://i.imgur.com/UzMHm0r.png)

  ``` bash
  $ sendmail aaron@localhost <<< "Hello, I'm just testing email."

  $ cat /var/spool/mail/aaron
  ```

#### Queue

* Une *queue* (ou file d'attente) de courrier électronique, est simplement un répertoire du système où les messages attendent d'être envoyé par le MTA. Typiquement, les messages sont envoyés trop vite pour qu'ils ne soient visibles dans la queue, à moins qu'il n'y ait un sérieux problème — on peut par exemple configurer postfix pour garder les emails qui ont échoué dans la queue.  
  Différents MTA stockent leurs emails en attente à différents endroits, et il peut y avoir plusieurs queues. Il est donc préférable d'utiliser les commandes qui permettent d'afficher la queue, que d'utiliser `ls`

* `postqueue -p` permet d'afficher les messages dans la queue:  

  ![](https://i.imgur.com/L2spgzv.png)

  Puisque postfix implémente la compatibilité sendmail, on peut également utiliser `mailq` ou `sendmail -bp`

  ![](https://i.imgur.com/5NPTQwg.png)

* Pour supprimer un message de la queue:  
  Notons que les privilèges root sont nécessaires.

  ![](https://i.imgur.com/ODEGUp3.png)

#### Forward

* De nombreuses entreprises exigent de faire suivre les messages électroniques d'une personne en vacances ou en congés à un autre utilisateur.

* Tranférer les messages d'un utilisateur, se gère du côté utilisateur: il faut créer le fichier `~/.forward` dans le home directory de cet utilisateur et y mettre le nom d'utilisateur à qui les messages doivent être envoyés à la place

  ![](https://i.imgur.com/XcxFFSW.png)

  Note: On peut créer ce fichier sans se connecter au compte en utilisant les privilèges root pour le créer, puis en changeant l'utilisateur et le groupe propriétaire.

* Lorsque l'utilisateur ne souhaite plus que ses messages électroniques soient transférés à un autre utilisateur, il lui suffit de supprimer le fichier .forward  

#### Alias

* Un *alias* de messagerie fournit une adresse alternative pour un utilisateur. Par exemple, on peut définir un alias "webmaster" ou "contact": si quelqu'un veut envoyer un message à ce destinaire, alors le système de messagerie le traduira avec le nom d'utilisateur configuré pour cet alias.

* Définir des alias a plusieurs avantages:

  1. si la personne qui gère le site web change, il n'y a pas besoin de changer l'adresse email de partout, il suffit d'aller dans le fichier d'alias et configurer un autre utilisateur pour cet alias.

  2. ça ajoute une couche de sécurité: personne n'a vraiment besoin de connaître les noms d'utilisateur des personnes qui gèrent le site web

* Le fichier de configuration des alias email est <ins>/etc/aliases</ins>  
  Pour redirigier vers emails envoyés à postmaster vers root:

    ``` bash
    $ sudo vim /etc/aliases

    postmaster: root
    ```

    Les emails peuvent être clonés vers plusieurs boîtes mails, pour ce faire les séparer par des virgules

    ``` txt
    contact: aaron,john,jane
    ```

    Et on peut acheminer les emails vers une boîte email stockée par un autre serveur, en redirigeant le mail entrant sur le serveur vers un autre

    ``` txt
    advertising: aaron@somewebsite.com
    ```

* Rafraichir la base de données de postfix

    ``` bash
    sudo newaliases
    ```

  Il existe un fichier de configuration (/etc/aliases) et une base de données (/etc/aliases.db). Le fichier de configuration est un simple fichier texte qu'on peut éditer pour définir des alias, mais c'est la base de données qui est utilisée par le système pour déterminer les alias. Après avoir mis à jour le fichier /etc/aliases, il faut donc mettre à jour la base de données pour que les nouveaux alias soient effectifs.

  Pour ce faire, on utilise la commande `newaliases` ou `sendmail -l` avec les privilèges root

  ![](https://i.imgur.com/XCa6tmC.png)

---

## Programmes MDA

* Lorsqu'on reçoit un email sur un serveur, on veut aussi un moyen facile de le lire.  
  Habituellement, on utilise soit

  - un site web, comme gmail.com.  
    On peut créer un tel service en installant et en configurant une application web comme roundcube

  - un logiciel, comme Microsoft Outlook, Mozilla Thunderbird ou une application sur smarthone.  
    Dans ce cas, on a besoin d'un serveur IMAP

* IMAP est l'abrévation d'*Internet Message Access Protocol* (protocole d'accès aux messages Internet).  
  Un daemon IMAP couramment utilisé sous Linux est dovecot.

  Le processus est simple: le client de messagerie, comme Outlook, se connecte à dovecot et, une fois la connexion réussie, récupère les emails de l'utilisateur stockés sur notre serveur pour les afficher.
  Le client et le serveur sont synchronisés: si on supprime un mail sur Outlook, il sera également supprimé du serveur mail — c'est du moins la configuration par défaut, elle peut être modifiée si nécessaire.

* IMAP n'encrypte pas les données envoyées sur le réseau entre l'utilisateur et le serveur.  
  IMAPS (IMAP over SSL) oui.

### Dovecot

* Mettre en place et sécuriser un serveur IMAP prêt à servir n'importe quel client est un processus long et complexe. 
  Mais les éléments les plus importants sont:

1. Installer dovecot

    ``` bash
    $ sudo dnf install dovecot
    ```

    Démarrer le service

    ``` bash
    $ sudo systemctl start dovecot
    ```

    L'activer au démarrage

    ``` bash
    $ sudo systemctl enable dovecot
    ```

2. Modifier le fichier de configuration principal de dovecot: `/etc/dovecot/dovecot.conf`

    ``` bash
    $ sudo vim /etc/dovecot/dovecot.conf
    ```

    - activer IMAP

      ``` txt
      protocols = imap
      ```

    - écouter les requêtes entrantes  
      L'étoile indique d'écouter les connexions entrantes sur toutes les adresses IPv4 disponibles sur le serveur. Le :: fait la même chose mais pour IPv6

      ```
      listen *, ::
      ```

      Pour n'écouter qu'une adresse IPv4 spécifique:

      ```
      listen 10.11.12.9
      ```

3. Modifier les fichiers de configuration secondaires  
    Dovecot a une liste d'options configurables énorme. Pour éviter de se retrouver avec un énorme fichier de configuration, les paramètres sont regroupés par catégorie dans plusieurs fichiers placés dans `/etc/dovecot/conf.d`. Le nom des fichiers est préfixé par un numéro, qui est l'ordre de priorité dans lequel les fichiers seront chargés

    ![](https://i.imgur.com/ETADhEt.png)

    * Si on veut changer le port par défaut (993 pour IMAPS):

      ``` bash
      $ sudo vim /etc/dovecot/conf.d/master.cnf
      ```

      ![](https://i.imgur.com/AmFbnSF.png)

    * postfix stocke les mails dans /var/spool/mail (et /var/mail est un lien symbolique vers /var/sopol/mail)  
      Pour indiquer à dovecot l'emplacement des mails:

      ``` bash
      $ sudo vim /etc/dovecot/conf.d/10-mail.cnf
      ```

      ![](https://i.imgur.com/Uu80sgB.png)

      INBOX indique l'emplacement du répertoire, et mbox indique à dovecot de créer une boîte mail dans le répertoire personnel de l'utilisateur

    * Pour activer IMAPS, il faut spécifier le certificat SSL du serveur

      ``` bash
      $ sudo vim /etc/dovecot/conf.d/10-ssl.cnf
      ```

      ![](https://i.imgur.com/LI7mpe8.png)

        ``` bash
        vim /etc/dovecot/conf.d/10-ssl.cnf
        ```

        Pour n'autoriser qu'IMAPS, utiliser `ssl = required`  
        Pour autoriser IMAPS et IMAP, utiliser `ssl = yes`  
        Pour n'autoriser qu'IMAP, utiliser `ssl = no`
