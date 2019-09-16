---
title: Jenkins
category: Other
---

Jenkins est un outil qui permet d'automatiser des tâches, tels que les builds d'une application, les tests, déploiements, etc. Il est libre (MIT) et gratuit.

## Vocabulaire

* Un *projet* ou *job* est une collection de tâches
* Un *build* est l'exécution d'un projet
* Un *build step* est une tâche que Jenkins exécute lors du build — comme récupérer le code source d'application ou lancer un script
* Un *build trigger* est l'événement qui démarre un build. Un build peut être lancé manuellement (en cliquant sur un bouton dans l'interface Jenkins) ou automatiquement (en fonction d'un planning)
* Un *plugin* est une extension du noyau de Jenkins. Les plugins peuvent faire différentes choses, comme ajouter des fonctionnalités à l'interface ou définir de nouveaux types de build steps. La plupart des fonctionnalités de Jenkins sont fournies par un plugin.

---

## Installer

Il y a deux manières d'installer Jenkins: soit récupérer le package, soit lancer un container Docker

### Package

* S'assurer que votre machine remplit tous les prérequis.  
  Matériel: 256M RAM, 1G disque dur.  
  Logiciel: Java 8 (Java Runtime Environment ou Java Development Kit).

  ```
  apt-get -y install openjdk-8-jdk
  ```

* Aller sur [jenkins.io/download](https://jenkins.io/download) et suivre les instructions pour votre distribution

* Une fois l'installation terminé, aller sur [localhost:8080](http://localhost:8080).  
  Si vous tombez sur une page "The site can't be reached", attendez quelques instants que Jenkins ait terminé de se lancer puis refraichir la page.  
  Une fois Jenkins lancé, vous verrez une page vous demandant le mot de passe administrateur.

* Ouvrir un navigateur de fichier, aller dans le répertoire d'installation de Jenkins et copier le contenu de `Jenkins/secrets/InitialAdminPassword`

* Copier le mot de passe dans l'interface web de Jenkins, puis "Continue"

* Finaliser l'installation (ci-dessous)

### Docker

Utiliser un container Docker est un excellent moyen de tester et expérimenter Jenkins sans grand engagement — par exemple pour tester un technique ou un plugin que vous voudriez ajouter à votre installation Jenkins principale.

* Récupérer l'image

  ```
  docker pull jenkins/jenkins:lts
  ```

* Lancer le container

  ```
  docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins --name jenkins jenkins/jenkins:lts
  ```

* Récupérer le mot de passe admin, pour pouvoir s'identifier sur l'interface web de Jenkins

  ```
  docker exec -it jenkins bash -lc 'cat /var/jenkins_home/secrets/initialAdminPassword'
  ```

* Aller sur [localhost:8080](http://localhost:8080) et coller le mot de passe admin.

* Finaliser l'installation (ci-dessous)

## Finaliser l'installation

Une fois loggé en tant qu'admin sur l'interface web:

* Cliquer "Install suggested plugins".  
  Cela complètera l'installation de Jenkins en installant les plugins les plus couramment utilisés.

* Vous pouvez créer votre premier utilisateur admin (l'adresse email ne doit pas nécessairement être réelle mais au moins valide).  
  Ou vous pouvez sauter cette étape en cliquant sur "Continue as admin" (et continuer à utiliser le mot de passe initial les prochaines fois).

* Cliquer sur "Start Using Jenkins"

---

## Exemples

### Créer un job "Hello World"

* Dans le menu gauche, cliquer "new item"

* Entrer un nom, "hello-world" par exemple.  
  Éviter de mettre des espaces dans le nom. Bien que ce ne soit pas interdit, les espaces peuvent rendre les choses plus difficiles — pour travailler avec des API ou la ligne de commande

* Choisir le type de job "freestyle", puis cliquer "OK".  
  Les différents types de job sont les suivants:

  * <ins>Freestyle</ins>:  
    C'est le type le plus couramment utilisé. Il permet de contrôler librement la façon dont Jenkins gère les tâches que vous voulez automatiser

  * <ins>Pipeline</ins>:  
    Job contenant une série de tâche, par exemple récupérer le code de l'application, lancer des tests, compiler et déployer.

  * <ins>Multiconfiguration</ins>:  
    Utile lorsque vous voulez lancer une même tâche plusieurs fois mais avec une combinaison de paramètres différente.

  * <ins>Folder</ins>:  
    N'est pas un job a proprement parler.  
    Permet de regrouper plusieurs job

  * <ins>GitHub organization</ins>:  
    Job configuré pour utiliser un repo GitHub

  * <ins>Multibranch</ins>:  
    Peut être utilisé pour configurer des tâches pour différentes branches dans un même repo.

* La page de configuration du projet s'ouvre.  
  Elle contient un formulaire contenant plusieurs sections, qui permettent de définir le mode d'exécution ainsi que toutes les options à appliquer au job.  
  Les onglets du haut permettent de scroller entre les différentes sections.  
  Aller à la section "Build"

* Cliquer "Add build step" et sélectionner "Execute shell".  
  Écrire dans le textarea les commandes que vous voulez exécuter

  ```
  echo 'Hello World'
  ```

* Le bouton "Apply" enregistre les modifications et reste sur la page de configuration — il est donc utile lorsque vous souhaitez enregistrer et continuer à travailler sur les configurations.  
  Le bouton "Save" enregistre les modifications et redirige vers la page du Job — il est donc utile lorsque vous avez terminé d'éditer les configurations.

  Cliquer sur "Save"

* Dans le menu gauche de la page du job, cliquer sur "Build now".  
  Une notification s'affiche indiquant que le build a été programmé.  
  Après quelques secondes, vous devriez voir que le  build a été ajouté dans le bloc "Build History" juste en dessous.

  ![](https://i.imgur.com/MLdZoLV.png)

* Chaque ligne de l'historique contient
  * une puce indiquant l'état du build (en cours, terminé avec succès, terminé avec erreur)
  * le numéro du build
  * un timestamp

  Cliquer sur la puce pour voir la sortie de console du job.

  ![](https://i.imgur.com/mLtDsRjm.png)

* La sortie de console affiche les commandes exécutées ainsi que le résultat.

  ![](https://i.imgur.com/kLR0Ysa.png)

* Cliquer "Back to project" puis "Configure" pour retourner sur la page de configuration du job

## Compiler Apache Ivy

* Créer un nouveau job freestyle
* Cocher "GitHub project" et entrer l'URL du repo Apache Ivy: [https://github.com/apache/ant-ivy](https://github.com/apache/ant-ivy)
* Cocher "Git" dans la section "Source code management" et entrer l'URL de repo ici aussi. Comme il s'agit d'un repo public, il n'est pas nécessaire d'entrer d'identifiants. Dans le cas d'un repo nécessitant une identification (pour pusher par exemple):

  * générer une clé SSH pour Jenkins

    ```
    sudo -u jenkins ssh-keygen
    ```

  * copier la clé publique

    ```
    sudo cat /var/lib/jenkins/.ssh/id_read.pub
    ```

  * donner accès au repo Github au détenteur de cette clé. Github (repo page) > Settings > Deploy keys > Add deploy key

    ![](https://i.imgur.com/JU2pdug.png)

  * tester que Jenkins a accès au repo Github

    ```
    sudo -u jenkins ssh git@github.com
    ```

  * entrer l'URL du repo dans Jenkins

    ![](https://i.imgur.com/Ne6UHuX.png)

* Dans la section "Build", sélectionner "Invoke Any". Si vous avez configuré Ant, vous devriez pouvoir sélectionner dans la liste déroulante la version Ant que vous voulez utiliser. Entrer la cible du build, `jar`.

  ![](https://i.imgur.com/7HJMXzI.png)

* Sauvegarder et lancer le build

---

## Monitorer un job

* Créer une tâche pour que le job dure un certain temps

  ```
  #!/bin/bash
  for i in {1..30}; do echo $i; sleep; done
  ```

* Cliquer sur "Save" puis "Build now"
* Dans le bloc Build History, vous verrez un point gris clignotant, un chiffre et une barre de progression

  - Le point gris indique le job n'a jamais été exécuté auparavant. Une fois le job terminé, le point gris devient bleu (en cas de succès) ou rouge (en cas d'erreur). Par défaut, Jenkins considérera que le build est un échec si une tâche se termine par une valeur de sortie différente de 0 (parce qu'on appelle `exit 1` par exemple).

  - Le point clignote quand un job est en cours
  - Le numéro est l'ID du build. Il est unique et permet à Jenkins d'organiser les sorties de chaque build.

  - La barre de progression est un indicateur visuel de la durée d'exécution d'un job et du temps restant.  
    Le motif en rayures indique qu'aucune donnée n'a été recueillie quant à la durée du job exécuté.  
    Lorsque Jenkins a exécuté un job plusieurs fois, cette barre donne une indication de temps restant. Bien sûr, le temps qu'il faut pour exécuter un job peut changer d'une fois à l'autre, ne prennez donc pas la barre de progression pour vérité.

* La sortie de console peut être visualisée en temps réel.  
  La page défile automatiquement afin que vous puissiez suivre l'exécution du job.

* À côté de "Build history" est affiché un soleil.  
  Si vous passez votre souris dessus, une notifcation s'affiche, qui indique le *temps* (weather). Plus il y a de builds réussits (relativement au nombre de builds en échec), plus le ciel est dégagé. Si quelques builds sont en échec, le soleil est caché derrière un nuage — les choses vont plutôt bien mais on pourrait faire mieux. Plus il y a de builds en échec, plus le temps se gâte.

  ![](https://i.imgur.com/xTmIcOxl.png)

* Le lien "trend" à droite de "Build history" permet d'accéder à la page tendance.  
  Elle contient notamment une timeline permettant de visualiser l'état de jobs au fil du temps.

  ![](https://i.imgur.com/2lixypQ.png)

  Cliquer sur le champ gris clair en haut, et faire glisser, pour faire défiler la timeline par jour.  
  Cliquer sur le champ gris foncé en gaut, et faire glisser, pour défiler la timeline par heure.  
  Cliquer sur un build affiche la date/heure de début et de fin du build.

---

## Fichiers

### Workspace

Chaque job a un répertoire dédié sur le serveur Jenkins, le *workspace* du job. C'est là que sont stockés tous les fichiers générés pendant le build, appelés *artefacts*.

* Le lien vers le workspace est disponible sur la page du job (au centre et dans le menu gauche). Cliquer sur un répertoire ouvre le répertoire, cliquer sur un fihier ouvre le fichier (le contenu est soit affiché soit téléchargé selon le type de fichier).

* Dans le menu gauche, en sous-menu de workspace, le lien "wipe out current workspace" permet de supprimer le workspace et tout son contenu.

### Archivage

Dans les actions post-build du job (sur la page de configuration), on peut ajouter un étape "archive the artifats" pour spécifier les fichiers les fichiers que vous voulez archiver lorsque le build est terminé avec succès.

Par exemple, pour afficher le fichier `ivy.jar` quelque soit son emplacement dans le workspace:

```
**/ivy.jar
```

Après le build, un lien apparaît sur la page du projet, qui renvoie directement au fichier `ivy.jar`

![](https://i.imgur.com/WwmXrPO.png)

---

## Paramètres

Jenkins permet de créer des jobs qui acceptent des paramètres — chaînes de caractères, booléens, choix multiples, etc. Ces valeurs sont ensuite injectées dans le job sous forme de variables d'environnement.

Pour ajouter des paramètres,
* aller sur la page de configuration du job
* sélectionner "this project is parameterized"
* cliquer "Add Parameter" et sélectionner le type de paramètre que vous voulez ajouter.

  * `string`, est le plus type courant. Lors du lancement du job, la valeur du champs est populée avec la valeur définie dans les configurations — mais peut évidemment être modifiée. Cela permet de spécifier une valeur par défaut, ce qui peut vous faire gagner du temps si vous exécutez le job plusieurs fois.

  * `choice`, permet de limiter la valeur du paramètre à certaines valeurs. Lors du lancement du job, une liste déroulante s'affiche. Par défaut, le premier choix est sélectionné.

  * `boolean` permet de limiter les choix à vrai ou faux. Lors du lancement du job, une case à cocher s'affiche. Cocher pour vrai, décocher pour faux.

  Vous pouvez également ajouter une description. Elle s'affiche lorsque le job est lancé, elle peut être utilisée pour fournir des informations sur le type d'informations que l'utilisateur doit saisir

  ![](https://i.imgur.com/aMhzlKG.png)

  ![](https://i.imgur.com/nahSAUe.png)

Parce que ce job a des paramètres, le bouton affiché dans le menu est désormais "build with parameters".  
Lorsqu'on clique dessus, on atterrit sur une page qui vous permet de choisir les paramètres que vous voulez utiliser.

  ![](https://i.imgur.com/ztsdmIN.png)

---

## Configurations

### General

* <ins>Description</ins>  
  Permet d'ajouter du texte pour décrire le job et ce qu'il fait.

* <ins>Discord old builds</ins>  
  Par défaut, Jenkins conserve les logs de chaque build ainsi que les fichiers générés par le build. C'est pratique si vous voulez revoir l'historique d'un job, mais peut prendre beaucoup d'espace disque au bout d'un certain temps.  
  En sélectionnant cette option, vous pouvez choisir de converser les builds pendant un certain temps ou choisir de ne garder qu'un certain nombre de builds.

  ![](https://i.imgur.com/2xdRf6I.png)

* <ins>GitHub project</ins>  
  Permet d'associer le job à un repo Github.  
  Entrer l'url du repo et un nom, le lien sera affiché sur la page du job.

* <ins>This job is parameterized</ins>  
  Permet de définir des paramètres. Ces paramètres seront définits lors du build sous forme de variables d'environnement.

* <ins>Throttle builds</ins>  
  Permet de limiter le nombre de fois d'un job est lancé pendant une période de temps donnée.  
  Utile pour limiter l'usage du disque / RAM / CPU lorsqu'un job est gourmant en ressources.

* <ins>Disable this project</ins>  
  Désactive le job. Il ne pourra pas être lancé, que ce soit manuellement ou automatiquement.

* <ins>Execute concurrent builds if necessary</ins>  
  Par défaut, Jenkins n'exécutera qu'une seule instance à la fois d'un job donné. Cette option autorise l'exécution de plusieurs instances en même temps.

### Source code management

Permet de récupérer du code dans le workspace du job à partir d'un repo git ou subversion. Si le repo est mis à jour, Jenkins récupèrera la mise à jour au prochain build.

### Build Triggers

Par défaut, les jobs ne sont lancés que manuellement. Mais il est possible de les configurer pour se déclencher automatiquement.

* <ins>Trigger builds remotely</ins>  
  Permet de déclencher le job à distance, en utilisant l'API web de Jenkins.  
  En activant cette option, vous devrez définir le token que les processus utiliseront au moment de requêter l'URL de l'API. Cela permet de sécuriser le job, que tout le monde connaissant l'URL ne soit pas en mesure de démarrer le job à l'envie.

* <ins>Build after other projects are built</ins>  
  Permet de déclencher le job immédiatement après qu'un job donné ait fini.

* <ins>Build periodically</ins>  
  Permet de déclencher le job selon un planning.  
  Le champ de configuration utilise le format cron — par exemple, pour exécuter le job tous les jours à minuit: `0 0 * * * * *`

  ![](https://i.imgur.com/q1zEYqI.png)

  Outre la syntaxe native de cron, Jenkins accepte également
  * `H` (hashed value): si plusieurs tâches sont planifiées en même temps, Jenkins peut choisir une valeur ultérieure sans se soucier de manquer l'horaire — par exemple, `H H * * *` exécuterait le job une fois par jour, à minuit de préférence, sauf si un autre job s'exécute déjà à ce moment là, auquel cas l'exécution sera repoussée pus tard.

  * das alias généraux: `@hourly`, `@daily`, `@weekly`, `@midnight`, `@monthly`, `@annually`.  
    `@midnight` planifie le job entre minuit et 3h du matin.

* <ins>GitHub hook trigger</ins>  
  Permet de démarrer le job suivant l'activité sur GitHub, comme une release ou commit (ou tout web hook Github). Avec cette fonctionnalité, on peut utiliser Jenkins comme outil d'intégration continue.

* <ins>Poll SCM</ins>  
  Permet de démarrer le job suivant l'activité d'un repo. Avec cette option, Jenkins vérifie l'état du repo selon un planning donné et déclenche le job si des changements sont détectés. Parce que Jenkins doit périodiquement vérifier les changements, et donc gaspiller des ressoures si aucun changement n'est effectué sur le repo, il est préférable d'utiliser "Github hook trigger" si c'est possible.

### Build Environment

* <ins>Delete workspace</ins>  
  Lorsqu'un job est exécuté, il utilise un répertoire spécifique appelé *workspace*. Par défaut, tous les fichiers crées par un job sont sauvegardés dans le workspace et y resteront entre les différentes exécutions.  
  En activant cette option, Jenkins supprimera le workspace à la fin de chaque job et le recréera à chaque nouveau build. On peut utiliser les options avancées pour ne supprimer que certains fichiers / dossiers, et/ou ne supprimer que lorsqu'un paramètre donné est définit.

* <ins>Use secret text or file</ins>  
  Permet d'injecter des secrets dans le job au moment du build (par exemple des noms d'utilisateur, mots de passe, certificats et autres informations sensibles), sous forme de variable ou fichiers.  
  
  * Les secrets doivent être crées au préalable:
    * Credentials
    * Global credentials
    * Add Credential
    * Selectionner le type de secret dans la liste déroulante (utilisateur, fichier, etc)

  * Une fois que c'est fait, sélectionner le secret à utiliser:

    ![](https://i.imgur.com/LRo3eT6.png)

    La valeur du secret n'est jamais affichée dans la console (remplacé par `****`).

### Build

Cliquer sur "Add build step" permet d'ajouter une nouvelle étape de build. Différents types sont disponibles.

* Sous Window, on utilise a priori "Execute a batch command"
* Sous Unix, on utilise a priori "Execute shell"
* Si vous utilisez Java, vous pouvez utiliser les builds steps basés sur Ant, Gradle et Maven

On peut en ajouter d'étapes qu'on veut, chaque étape sera déclenchée une fois que celle qui la précède est finie. Pour réorganiser les étapes, cliquer sur le carré gris à côté du nom de l'étape et faire glisser l'étape vers la position désirée.

### Post-build Actions

Permet de définir des étapes supplémentaires à effectuer avant que le build ne se termine — ce peut être archiver des fichiers, déclencher une tâche, ou encore envoyer un email à quelqu'un pour le notifier du build.

![](https://i.imgur.com/mSov4KS.png)

De la même manière que pour les étapes du build, il peut y avoir plusieurs étapes post-build, que vous pouvez réorganiser dans l'ordre désiré.

---

## Vues

Les vues permettent de filter les jobs affichés dans la liste.  
La vue par défaut, "All" affiche tous les jobs.

![](https://i.imgur.com/WnIHZMR.png)

Pour créer une vue, cliquer sur le "+" à droite de la liste de vues, ou "New View" dans le menu gauche.  
Cela ouvrira la page de configuration de la vue.

* La description sera affichée en haut de la vue.
* "job filters" permet de sélectionner les jobs à afficher dans la vue.
* Une autre possibilité est d'utiliser une expression régulière.  
  L'avantage, c'est que cela s'appliquera aux jobs ajoutés après coup, sans avoir à modifier la vue.  
  Par exemple pour afficher tous les jobs qui contiennent "BUILD":

  ```
  .*BUILD.*
  ```

* On peut également modifier les colonnes affichées dans la vue.

## Dossier

Les dossiers permettent de créer des hiérarchies.
Chaque dossier fournit un espace de nom contenant des jobs, vues et dossiers de manière indépendante des autres dossiers.

Par défaut, un seul dossier existe: la racine (nommée Jenkins).  
On peut naviguer d'un dossier à un dossier parent à partir du fil d'ariane affiché en haut, et d'un dossier à un dossier enfant en cliquant sur un dossier dans la vue "All.

![](https://i.imgur.com/qpUmiUb.png)

Créer un dossier est très similaire à la création d'un job (et les dossiers s'affichent dans la même liste que les jobs). Cliquer sur "New Item", donner un nom au dossier et choisir le type "Folder".

Pour placer un job dans un dossier, survoler la ligne du job, cliquer sur la flèche qui s'affiche et choisir "Move".  
Il n'est possible de déplacer qu'un seul job à la fois.

![](https://i.imgur.com/t3wq5qg.png)

Note: les vues n'ont accès aux jobs du dossier en cours et non aux sous-dossiers.  
Lorsqu'on supprime un dossier, on supprime tout son contenu: tous les jobs, vues et dossiers à l'intérieur sont supprimés.

---

## Pipelines

Une pipeline permet de définir une suite de tâches sous forme de code. Chacune des étapes d'une pipeline accomplit une tâche spécifique qui doit être accomplie avec succès pour que l'étape suivante puisse s'exécuter.

L'avantage de cette approche, c'est qu'il est possible de les stocker à l'intérieur d'un repo et d'indiquer à Jenkins d'utiliser ce code. Cela fait des pipelines une solution très puissante pour mettre en place une intégration et déploiement continus.

Pour utiliser la pipeline d'un repo
* cocher l'option "Pipeline script from SCM"
* sélectionner le type du repo: Git ou Subversion
* entrer l'URL du repo et les identifiants pour y accéder
* entrer le chemin d'accès vers les fichiers scripts.  
  Les pipelines sont généralement stockées à la racine du repo dans le fichier `Jenkinfile`