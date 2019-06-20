---
title: Windows Task Scheduler
category: Cron
---

Pour lancer un script de manière régulière et automatique un script sous Windows, on utilise Windows Task Scheduler. Il permet de planifier une tâche pour être exécutée périodiquement à un temps définit.

## Créer une tâche planifiée

1. Ouvrir Windows Task Scheduler

   ![](https://i.imgur.com/yyl9WUM.png)

2. Cliquer "Action" > "Create Basic Task"

   ![](https://i.imgur.com/MmccYM3.png)

3. Lui donner un nom et cliquer "Next"

   ![](https://i.imgur.com/aiNy2n1.png)

4. Choisir la fréquence à laquelle vous voulez exécuter la tâche.

   ![](https://i.imgur.com/5L2LgSg.png)

5. Si vous avez choisit tous les jours (daily), choisir l'heure à laquelle la tâche doit être exécutée.

   ![](https://i.imgur.com/t3PBEE9.png)

6. Garder l'action par défaut — "Start a program" et aller à l'étape suivante.

   ![](https://i.imgur.com/YRAt8gu.png)

7. Sélectionner le script à lancer et lancer le champs "Start in" pour définir le répertoire courant dans lequel le script sera exécuté.

   ![](https://i.imgur.com/PCeW64C.png)

8. Vérifier le récapitulatif et cliquer "Finish"

   ![](https://i.imgur.com/Y9w5K4T.png)

---

## Lancer la tâche manuellement

Essayer de lancer la tâche manuellement pour vérifier qu'elle fonctionne correctement:

1. Dans le menu de navigation gauche, cliquer sur "Task Scheduler Library"

2. Dans la liste des tâches, sélectionner celle que vous avez créée — probablement la dernière de la liste

3. Dans le panneau d'action à droite, cliquer sur "Run".  
   Vérifier que le script fonctionne comme prévu.

   Inutile d'attendre que le statut de la tâche passe de "Running" à arrếté, ça n'arrivera pas: il faut faire un clic droit sur "Task Scheduler Library" (panneau gauche) et cliquer "Refresh".  
   Consulter la colonne "Last Run Result" pour vérifier que la tâche n'a pas retourné d'erreur.

![](https://i.imgur.com/5jWHHjg.png)

---

## Mettre à jour les configurations

1. Dans la liste des tâches, double-cliquer sur la tâche

2. Dans l'onglet "General", cliquer "Run whether user is logged on or not" et "Do not store password" — de cette manière, la console n'apparaître pas lorsque la taĉhe sera lancée.

   ![](https://i.imgur.com/Ny0pABe.png)

3. Dans l'onglet "Settings", cliquer "Run task as soon as possible after a scheduled start is missed".  
   De cette manière, si l'ordinateur était éteint à l'heure prévue, la tâche sera lancée lorsque vous redémarrerez votre ordinateur — environ 10 minutes après le démarrage.

   ![](https://i.imgur.com/B7OBrc5.png)