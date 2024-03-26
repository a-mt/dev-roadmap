---
title: Impression
category: Linux
---

## Théorie

* Les ordinateurs et les divers périphériques qui y sont connectés, comme les imprimantes, n'utilisent pas le même language. De la même manière que deux humains ne parlant pas la même langue ont besoin d'un traducteur pour les aider à communiquer, les ordinateurs utilisent des traducteurs appelés *pilotes* (ou *driver* en anglais), pour faire le lien entre le système d'exploitation et le composant.

* Le langage le plus courant pour les imprimantes est PostScript. Pour utiliser une imprimante PostScript, il est nécessaire d'avoir son fichier PPD — abréviation de POstscript Pinter Description file. Ce fichier décrit à la fois l'imprimante et driver nécessaire.

  Souvent, pour les imprimantes prises en charge par Linux, le site Web du fabricant contient à la fois le driver et le fichier PPD nécessaires, ainsi que des instructions sur la manière de les installer sur Linux.
  On a également le site https://www.openprinting.org/ qui répertorie divers drivers et fichiers PPD.

* Une queue ou file d'attente d'impression est un répertoire du système où sont placés les travaux d'impression en attente d'être traités par l'imprimante physique. Cette imprimante peut être connectée physiquement au système ou, et c'est souvent le cas, être connectée au réseau.  
  Tout commence lorsqu'une application veut envoyer un travail d'impression à une imprimante donnée: elle fait la demande d'impression et le service d'impression place ce travail dans la file d'attente de l'imprimante.

  ![](https://i.imgur.com/wAJq28Km.png)

---

## CUPS

* Sous les distributions Linux modernes, ce service est souvent CUPS (Common Unix Printing System).  
  CUPS prend en charge les protocoles IPP (Internet Printing Protocol) et LPD (Line Printer Daemon).

  ![](https://i.imgur.com/jh6i3dJ.png)

* Les configurations de CUPS se situent dans le répertoire <ins>/etc/cups</ins>  
  et le fichier de configuration principal est <ins>/etc/cups/cupsd.conf</ins> — s'il y a des imprimantes de configurées sur le système, leur configuration sera dans ce fichier

* CUPS vient avec quelques pilotes par défaut pour les imprimantes:

  ```
  # find /usr/share/cups/drv -name *.drv
  /usr/share/cups/drv/cupsfilters.drv
  /usr/share/cups/drv/sample.drv
  /usr/share/cups/drv/hp/hpcups.drv
  /usr/share/cups/drv/hp/hpijs.drv
  ```

* CUPS est rétro-compatible avec LP (Line Printer), qui est le service d'impression historique — originaire d'Unix. Ce nom provient des anciennes imprimantes, qui imprimaient une ligne à la fois.

  Le fichier de configuration de LP est /etc/printcap. Lorsque CUPS est le daemon d'impression, ce fichier est crée à partir du fichier .cnf de l'imprimante. Ainsi, on peut utiliser les commandes les commandes cups ou les commandes traditionnelles de lp:

  - <ins>Envoyer un fichier à l'impression</ins>:  
    (la première commande listée est la plus récente, la seconde est la rétro-compatibilité avec lp)

    ```
    lp -d
    lpr -R
    ```

  - <ins>Voir la queue de l'imprimante</ins>:

    ```
    lpstat
    lpq
    ```

  - <ins>Supprimer une tâche de la queue</ins>:

    ```
    cancel
    lprm
    ```

## Configurer une imprimante

* Avant de configurer une imprimante, il faut se poser quelques questions:

  * l'imprimante est-elle locale (connectée au système) ou distante?  
     `lpinfo -v` permet de lister les imprimantes connectées localement

  * qui utilisera cette imprimante?  
      Tout le monde sur le réseau, un seul utilisateur, un groupe de personnes?

  * le pilote et le fichier PPD de l'imprimante sont-ils installés?  
     `lpinfo -m` permet de lister les fichiers PPD installés

* Pour configurer une nouvelle imprimante, on peut utiliser 3 méthodes différentes:

  1. Éditer le fichier de configuration <ins>/etc/cups/printers.conf</ins>  
     Pour ce faire, il faut au préalable arrêter le daemon cups

  2. Utiliser l'application web d'administration CUPS sur <ins>systemIPaddress:631</ins>

  3. Configurer l'imprimante avec la commande `lpadmin`  
     Nécessite les privilèges root

     ```
     lpadmin \
      -p printerName \
      -D "description" \
      -L "location" \
      -m PPD-file \
      -v device-URI \
      -o printerOPtions
     ```

     Pour configurer une imprimante distante: `-v socket://remotePrinter-ip-address`  
     Pour accepter ou refuser des utilisateurs ou groupes: `-o allow:list` ou `-o deny:list`

### Avec lpadmin

1. Lister les fichiers PPD installés

    ![](https://i.imgur.com/QF7PYAt.png)

2. Ajouter l'imprimante  
   Compte tenu qu'on a pas d'imprimante, on utilisera ici /dev/null

   ![](https://i.imgur.com/NmJI3Kq.png)

   Vérifier que les fichiers de configuration ont bien été modifiés:

   ![](https://i.imgur.com/gqi6oU7.png)
   ![](https://i.imgur.com/tyg9qBR.png)

3. Activer l'imprimante

   ![](https://i.imgur.com/7nH0sZK.png)

4. Activer la queue

    ![](https://i.imgur.com/pBngDf7.png)

   On notera qu'il y a deux manières de bloquer l'impression:

    ![](https://i.imgur.com/DfFBil9m.png)  
    ![](https://i.imgur.com/UTe724Zm.png)

    - `cupsreject` pour empêcher que des impressions soient ajoutés à la queue  
      La commande inverse est `cupsaccept`

    - `cupsdisable` pour empêcher que la queue soit envoyé à l'imprimante  
      La commande inverse est `cupsenable`

      Cette fonction est particulièrement utile lorsque l'imprimante a besoin d'être réparée: les tâches continueront de s'aligner dans la queue et seront lancées une fois que le problème sera résolu — que l'imprimante est de nouveau activée.  
      Lorsqu'on désactive l'imprimante, il est possible d'ajouter une description qui précise pourquoi —sera affiché lorsqu'on affiche la queue.

      ![](https://i.imgur.com/ZKQl5Sw.png)

5. Après avoir configuré et activé l'imprimante, ne reste plus qu'à lui envoyer une impression de test.

## Imprimer

* Pour lancer une impression et afficher la queue, on a le choix entre

  - les commandes CUPS: `lp`, `lpstat`

    ![](https://i.imgur.com/5g6Qi6D.png)

  - et les commandes LP: `lpr`, `lpq`  
    Notons que cette version donne plus d'information que la nouvelle, qui est une des raisons pourquoi les commandes historiques sont encore très populaires.

    ![](https://i.imgur.com/yvop6vA.png)

* Pour retirer des tâches de la queue, on a là aussi le choix entre

  - la commande CUPS: `cancel`  
    Notons que le numéro de la tâche contient le nom de l'imprimante, il n'est donc pas nécessaire d'utiliser une option supplémentaire pour désigner l'imprimante cible

    ![](https://i.imgur.com/pizaqR8.png)

  - et la commande LP: `lprm`

    ![](https://i.imgur.com/1zKaWqT.png)

## Troubleshooting

1. Vérifier l'état de la file d'attente: est-ce qu'elle accepte les demandes?  
   Sinon, activer la queue

   ![](https://i.imgur.com/B4EJoLa.png)


2. Vérifier l'état de la connexion à l'imprimante: est-t-elle activée?  
   Avant d'activer la connexion, il est bon de vérifier l'état de la queue. Parfois, un utilisateur tente de relancer l'impression plusieurs fois et vous ne voulez pas imprimer 10 copies du même document. Parlez à l'utilisateur avant de supprimer ses travaux d'impression dans la queue — mieux veut demander la permission que d'affronter la colère d'un utilisateur

    ![](https://i.imgur.com/wqWU9rl.png)
    ![](https://i.imgur.com/FEJsmgA.png)

3. Si la file d'attente est activée mais bloquée, vérifier de nouveau la connexion physique.  
   Ici, il semblerait qu'il y ait un problème de configuration

    ![](https://i.imgur.com/97f9WNP.png)

4. Vérifier les configurations de l'imprimante  
   Si vous devez apporter plusieurs modifications à la configuration de l'imprimante, envisager de la supprimer et recommencer. Pour supprimer une imprimante: `sudo lpadmin -x printerName`

    ![](https://i.imgur.com/TCK4037.png)

5. Si tout semble correct et que les tâches vont à l'imprimante physiques mais ne lancent pas l'impression correctement, il est probable que le fichier PPD (aussi appelé *back end*) n'est pas bon.  
    Pour rappel, le fichier PPD est censé décrire l'imprimante et le driver nécessaire. Le site web du fabricant peut vous aider à déterminer quel fichier PPD et quel driver doivent être utilisés pour obtenir les fonctions d'impression souhaitées.

6. En dernier recours, activer les logs de debug.  
   Vous pourrez ainsi obtenir des informations supplémentaires, qui peuvent fournir des données de dépannage supplémentaires. Si vous activez les logs de debug, ne les laissez que le temps de résoudre le problème d'impression — ils peuvent vite s'accumuler

   ![](https://i.imgur.com/7sZYZ1pl.png)
   ![](https://i.imgur.com/DwiO1Rb.png)
   ![](https://i.imgur.com/uLH6Y3n.png)