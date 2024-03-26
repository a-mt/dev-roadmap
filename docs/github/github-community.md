---
title: Gérer sa communauté
category: Webenv, Github
---

## Attirer les contributions

> The hard part of getting into open source for the first time isn’t the implementation of a feature, but figuring out how to actually contribute code (Kent C. Dodds)

Plus votre projet grandira, plus grande sera votre communauté, plus il sera facile de trouver de l'aide.

### Classifier les issues

* Quand on crée un ticket, on peut spécifier une [milestone](https://help.github.com/articles/about-milestones/) (comme une fonctionnalité ou une version) pour rassembler les tâches ensemble. On peut également l'[associer](https://help.github.com/articles/associating-milestones-with-issues-and-pull-requests/) après qu'il soit créé

* On peut également ajouter des [labels](https://help.github.com/articles/applying-labels-to-issues-and-pull-requests/). Ils sont utiles car ils peuvent être utilisés pour filtrer les issues parmi la liste. Ils permettent également aux utilisateurs de connaître l'état d'avancement des issues ou encore de demander de l'aide avec le label `help wanted`.

  Exemple de labels:
  * [atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#type-of-issue-and-issue-state)
  * [celery](https://github.com/celery/celery/blob/master/CONTRIBUTING.rst#status-labels)

* On peut [assigner](https://help.github.com/articles/assigning-issues-and-pull-requests-to-other-github-users/) une issue à quelqu'un

* Ou encore l'ajouter au [project board](https://help.github.com/articles/adding-issues-and-pull-requests-to-a-project-board/#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).

### Laisser les issues faciles

Ne pas résoudre les issues faciles à résoudre. Les utiliser comme opportunité pour recruter de nouveaux contributeurs, en ajoutant le tag `good first issue`.

### Ajouter son projet à up-for-grab.net

Ajouter son projet à [up-for-grabs.net](https://up-for-grabs.net/) pour donner plus de visibilité aux issues `help wanted`.  
Les classifier par difficulté (Easy, Medium, Hard, Insane) est probablement une bonne idée.

### Proposer un mentorat

Si votre projet est complexe, vous pouvez créer des issues `first-timer-only` qui guident pas à pas les contributeurs à résoudre le problème. Exemple: [formly-js](https://github.com/formly-js/angular-formly/issues/410#issuecomment-127227984)

  > The first-timers-only label explicitly announces:  
  > "I’m willing to hold your hand so you can make your first PR. This issue is rather a bit easier than normal. And anyone who’s already contributed to open source isn’t allowed to touch this one!

  Ajouter le badge au README pour annoncer que ces issues existent.

  [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](https://www.firsttimersonly.com/)

### Autres

[How to get up to 3500+ GitHub stars in one week — and why that’s important.](https://medium.freecodecamp.org/how-to-get-up-to-3500-github-stars-in-one-week-339102b62a8f)

---

## Gérer sa communauté

### Créer des pull request templates

Créer un [pull requests template](https://help.github.com/articles/creating-a-pull-request-template-for-your-repository/) pour que les gens qui souhaitent faire un pull request aient une trame d'écriture.

![](https://help.github.com/assets/images/help/pull_requests/pr-template-sample.png)

### Créer des issues templates

Créer des [issues templates](https://help.github.com/articles/creating-issue-templates-for-your-repository/) pour que les gens qui souhaitent créer des issues aient directement des boutons qui leurs permettent d'ouvrir une issue en suivant une trame d'écriture.

![](https://help.github.com/assets/images/help/issues/new-issue-page-with-multiple-templates.png)

Exemple: [taiga-front](https://github.com/taigaio/taiga-front/issues/new)

### Être proactif

Répondre promptement aux issues, pull request et questions. Une [étude de Mozilla](https://docs.google.com/presentation/d/1hsJLv1ieSqtXBzd5YZusY-mB8e1VJzaeOmh8Q4VeMio/edit#slide=id.g43d857af8_0177) montre que les contributeurs recevant une révision de code dans les 48 heures sont plus enclins à renouveler leurs contributions.
Même si vous ne pouvez pas examiner la demande immédiatement, une réponse rapide permet de garder l'engagement du contributeur.

![](https://opensource.guide/assets/images/building-community/middleman_pr.png)

### Savoir dire non

Vous recevrez inévitablement des suggestions que vous ne souhaitez pas accepter. Peut-être que l'idée ne correspond pas à votre vision. Peut-être que l'idée est bonne mais l'implémentation est médiocre. Si vous recevrez une contribution que vous ne souhaitez pas accepter, votre première réaction pourrait être de l'ignorer. Agir de cette manière pourrait blesser la personne ou démotiver d'autres colletaborateurs potentiels.

Si vous ne voulez pas accepter une contribution:
1. Remercier la personne de sa contribution
2. Expliquer pourquoi elle n'entre pas dans le périmètre du projet ou donner des suggestions d'amélioration claires. Soyez gentil mais ferme.
3. Mettre un lien vers la documentation correspondante si elle existe.
4. Fermer le Pull Request

Si vous remarquez des demandes répétées pour la même chose, ajoutez-la à la documentation pour éviter de vous répéter.

### Ne pas tolérer la haine

Tout projet populaire attirera inévitablement des personnes qui nuiront à la communauté plutôt que de l'aider. Quand vous constatez une comportement négatif sur votre projet, [intervenir publiquement](https://help.github.com/articles/managing-disruptive-comments/).

![](https://help.github.com/assets/images/help/repository/content-redacted-comment.png)

Si le problème persiste, vous devrez peut-être leur demander de partir ou même [bloquer l'utilisateur](https://help.github.com/articles/reporting-abuse-or-spam/).

### Utiliser des messages enregistrés

Définir des [messages enregistrés](https://help.github.com/articles/working-with-saved-replies/) pour les réponses fréquemment utilisées.

![](https://help.github.com/assets/images/help/writing/saved-replies-add-reply-issue-pr.gif)

### Utiliser des apps Github

[Optimizing your open source project with GitHub Apps](https://github.blog/2018-07-10-optimizing-open-source-projects-with-github-apps/)

### Ajouter des tests

Ajouter des tests automatiquement lancés à chaque Pull Request.  
Il existe deux types de tests:

* les [statuts](https://help.github.com/articles/enabling-required-status-checks/) permettent par exemple de vérifier que les branches soient à jour avant de fusionner

  ![](https://help.github.com/assets/images/help/repository/req-status-check-all-passed.png)

  ![](https://help.github.com/assets/images/help/repository/req-status-check-out-of-date.png)

* les [contrôles](https://developer.github.com/changes/2018-05-07-new-checks-api-public-beta/), eux, ne sont disponibles qu'en utilisant des GitHub Apps (comme [Travis](testing.md#travis-ci) par exemple).  
  S'assurer que ces tests peuvent être testés localement par les contributeurs.

  * résultats des tests  
    Quand ces tests sont activés, les Pull Requests ont un onglet *Checks*, qui affiche le résultat des tests et permet de les relancer.

    ![](https://help.github.com/assets/images/help/pull_requests/checks.png)

    Les erreurs (failure, warning ou notice) sont également affichées dans l'onglet *Files* a côté du code en erreur.

    ![](https://help.github.com/assets/images/help/pull_requests/checks-detailed.png)

  * déclencher/ignorer les tests  
    Quand un repo est configuré pour automatiquement lancer les tests, on peut choisir d'ignorer les tests d'un commit individuel en ajoutant `skip-checks: true` après la description du commit suivit de deux lignes vides

        git commit -m "Update README.
        >
        >
        skip-checks: true

    Quand un repo n'est pas configuré pour lancer les tests automatiquement, on peut choisir de les lancer en ajoutant `request-checks: true`

        git commit -m "Refactor usability tests.
        >
        >
        request-checks: true

### Rester positif

[Maintainer's Guide to Staying Positive](https://github.com/jonschlinkert/maintainers-guide-to-staying-positive)

### Donner les accès push

Donner les [accès push](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/) aux contributeurs les plus actifs, les gens seront plus motivés à aider et peaufiner leur travail.

> https://felixge.de/2013/03/11/the-pull-request-hack.html
> https://github.com/Moya/contributors/blob/master/Contributing.md

### Remercier les contributeurs

* Créer un fichier CONTRIBUTORS ou AUTHORS qui liste toutes les personnes qui ont contribué au projet.

* Ou s'il y a beaucoup de contributeurs, envoyer une newsletter ou écrire un article de blog pour les remercier.

### Créer une organisation

Déplacer votre projet de votre compte personnel à une [organisation](https://help.github.com/articles/collaborating-with-groups-in-organizations/) et ajouter au moins un admin en plus de vous.

### Transférer le repo à un autre utilisateur

Si vous n'avez plus le temps de vous occuper de votre repo, vous pouvez choisir de le [transférer](https://help.github.com/articles/transferring-a-repository/) à un autre utilisateur.

---

## Vérifier les Pulls Requests

### Commenter

Toute personne ayant accès au repo peut ajouter des commentaires à un Pull Request.

![](https://help.github.com/assets/images/help/pull_requests/conversation.png)

### Suggérer des modifications

Vous pouvez [suggérer des modifications](https://help.github.com/articles/reviewing-proposed-changes-in-a-pull-request/) sur une ligne spécifique.

![](https://help.github.com/assets/images/help/commits/hover-comment-icon.gif)

![](https://help.github.com/assets/images/help/pull_requests/suggestion-block.png)

### Demander une vérification

Les administateurs peuvent demander une [vérification](https://help.github.com/articles/requesting-a-pull-request-review/) du Pull Request à un collaborateur.

![](https://help.github.com/assets/images/help/pull_requests/request-suggested-review.png)

La vérification a 3 statut possibles:
* comment, ajoute un commentaire sans valider le PR
* approve, approuve le PR
* et request changes, demande des modifications au PR.

![](https://help.github.com/assets/images/help/pull_requests/pull-request-review-statuses.png)

Les admins peuvent définir un [nombre de vérification](https://help.github.com/articles/about-required-reviews-for-pull-requests/) approuvant le PR avant que le merge ne soit possible.

### Tester localement

Il n’est pas nécessaire de récupérer les pull requests en local, ils peuvent être acceptés directement sur l’interface Github.  
En revanche, les récupérer en local permet de tester et de modifier les pull requests si nécessaire.

[Checking out pull requests locally](https://help.github.com/articles/checking-out-pull-requests-locally/)

Pour récupérer toutes les nouvelles branches:

    git fetch              # Récupérer les nouveaux logs
    git branch -a          # Lister toutes les branches
    git checkout mybranch  # Récupérer la branche du pull request en local

ou pour récupérer une branche spécifique directement:

    git fetch origin pull/57/head:s-styling
    git checkout s-styling

### Modifier un Pull Request

Si l'utilisateur ne répond pas à vos demandes de modification, vous pouvez modifier le Pull Request vous-même après l'avoir récupéré localement.

#### Rebaser

Plutôt que de merger le pull request vers master directement, vous pouvez utiliser

* un rebase interractif sur la branche du pull request pour nettoyer son historique

      git checkout mybranch
      git log
      git rebase -i HEAD~5

* un rebase simple pour que les commits du Pull Request soient après les commits de master

      git rebase master

#### Merger

Il existe deux manières de merger

* Soit en fast forward: ne garde qu’un seul commit dans l'historique de master. C'est le comportement par défaut
* Soit en récursif: récupère tous les commits de la branche mergée, permet d'indiquer clairement tout ce qui a été fait sur cette feature. Ajouter le flag `--no-ff` pour l'activer.

<!-- -->

    git checkout master
    git merge --no-ff mybranch
    git push
