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
    Si le destinataire du message se trouve sur le système local, le MSA se content de transmettre le message à l'utilisateur du système local.  
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
    Historiquement populaire, mais difficile à configurer  
    Date du début des années 80 (et encore maintenu)

---

## mailx

* `mailx` est un client mail en ligne de commande.  
  Il permet à l'utilisateur de créer des mails et lire les mails du système local.

1. Installer mailx à partir du repo

    ![](https://i.imgur.com/v6ASXQ8.png)

   Notons que typiquement, un alias `mail` est crée vers mailx

    ![](https://i.imgur.com/T8wXSjY.png)

2. Pour envoyer un email à un utilisateur local, utiliser la commande `mailx` suivit du nom de l'utilisateur auquel vous souhaitez envoyer le message. Ou pour envoyer un mail à un système distant, simplement ajouter un @ suivit du nom du domaine

   L'option -s permet de spécifier le titre  
   Un prompt sera ouvert, permettant d'entrer le corps du message.  
   Presser Ctrl+D pour terminer la création du mail et l'envoyer

   ![](https://i.imgur.com/rSFTFvZ.png)

3. Pour vérifier les messages de l'utilisateur courant, utiliser la commande `mail`  
   - `n` (new) pour lire les nouveaux messages
   - `d` (delete) suivi du numéro du mail pour le supprimer
   - `q` (quit) pour quitter

   ![](https://i.imgur.com/VwPdTAv.png)

   Notons que l'emplacement des fichiers emails est mentionné: /var/mail/christine.  
   <ins>/var/mail</ins> est l'emplacement typique pour le stockage des emails des utilisateurs — chaque utilisateur aura son propre fichier.

---

## postfix

* Pour installer postfix:

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

* Le MTA est désormais installé et répond au nom configuré. Pour accepter les mails venant de l'extérieur, il faut 1. autoriser les requêtes venant du port 25 (port standard SMTP), 2. que le nom de domaine pointe vers l'adresse IP du serveur.

* Pour envoyer un mail, on peut utiliser mailx avec le nom du serveur, ou simplement sendmail sans préciser le serveur de destination

  ![](https://i.imgur.com/UzMHm0r.png)
  ![](https://i.imgur.com/5vdNBM2.png)

### Queue

* Une *queue*, ou file d'attente, de courrier électronique, est simplement un répertoire du système où les messages attendent d'être envoyé par le MTA. Typiquement, les messages sont envoyés trop vite pour qu'ils ne soient visibles dans la queue, à moins qu'il n'y ait un sérieux problème — on peut par exemple configurer postfix pour garder les emails qui ont échoué dans la queue.  
  Différents MTA stockent leurs emails en attente à différents endroits, et il peut y avoir plusieurs queues. Il est donc préférable d'utiliser les commandes qui permettent d'afficher la queue, que d'utiliser `ls`

* `postqueue -p` permet d'afficher les messages dans la queue:  

  ![](https://i.imgur.com/L2spgzv.png)

  Puisque postfix implémente la compatibilité sendmail, on peut également utiliser `mailq` ou `sendmail -bp`

  ![](https://i.imgur.com/5NPTQwg.png)

* Pour supprimer un message de la queue:  
  Notons que les privilèges root sont nécessaires.

  ![](https://i.imgur.com/ODEGUp3.png)

### Forward

* De nombreuses entreprises exigent de faire suivre les messages électroniques d'une personne en vacances ou en congés à un autre utilisateur.

* Tranférer les messages d'un utilisateur, se gère du côté utilisateur: il faut créer le fichier `~/.forward` dans le home directory de cet utilisateur et y mettre le nom d'utilisateur à qui les messages doivent être envoyés à la place

  ![](https://i.imgur.com/XcxFFSW.png)

  Note: On peut créer ce fichier sans se connecter au compte en utilisant les privilèges root pour le créer, puis en changeant l'utilisateur et le groupe propriétaire.

* Lorsque l'utilisateur ne souhaite plus que ses messages électroniques soient transférés à un autre utilisateur, il lui suffit de supprimer le fichier .forward  

### Alias

* Un *alias* de messagerie fournit une adresse alternative pour un utilisateur. Par exemple, on peut définir un alias "webmaster" ou "contact": si quelqu'un veut envoyer un message à ce destinaire, alors le système de messagerie le traduira avec le nom d'utilisateur configuré pour cet alias.

* Définir des alias a plusieurs avantages:

  1. si la personne qui gère le site web change, il n'y a pas besoin de changer l'adresse email de partout, il suffit d'aller dans le fichier d'alias et configurer un autre utilisateur pour cet alias.

  2. ça ajoute une couche de sécurité: personne n'a vraiment besoin de connaître les noms d'utilisateur des personnes qui gèrent le site web

* Le fichier de configuration des alias email est <ins>/etc/aliases</ins>  
  Dans l'exemple suivant, tout emails envoyé à postmaster sera redirigé vers l'utilisateur root

  ![](https://i.imgur.com/EJ3Hpzf.png)

* Il est important de savoir qu'il existe un fichier de configuration et une base de données. Le fichier de configuration est simplement un fichier texte que l'on peut modifier pour définir de nouveaux alias. La base de données quant à elle est utilisée par le système par le système pour déterminer les alias.

  Après avoir mis à jour le fichier /etc/aliases, il faut mettre à jour la base de données (<ins>/etc/aliases.db</ins>) pour des les nouveaux alias soient effectifs. Pour ce faire, on utilise la commande `newaliases` ou `sendmail -l` avec les privilèges root

  ![](https://i.imgur.com/XCa6tmC.png)
