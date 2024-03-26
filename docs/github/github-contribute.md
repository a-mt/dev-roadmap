---
title: Contribuer
category: Webenv, Github
---

## Avant de contribuer

[Checklist avant de contribuer](https://opensource.guide/how-to-contribute/#a-checklist-before-you-contribute)

---

## Créer un fork

Un fork est une copie personnelle d’un autre dépot. Toutes les modifications faites sur le fork restent sur le fork.  
Une fois les modifications terminées, elles peuvent être suggérées à l’auteur du dépot original via un pull request.

* Créer un fork du repo  
  Quick link: https://github.com/ORIGINAL-USERNAME/ORIIGNAL-REPO/fork

  ![](https://help.github.com/assets/images/help/repository/fork_button.jpg)

* Cloner le fork

      git clone git@github.com:YOUR-USERNAME/YOUR-FORKED-REPO.git

---

## Mettre à jour un fork

Les modifications sur le dépot original ne sont pas récupérés sur le fork une fois qu’il est crée, il faut le faire explicitement via un merge entre les deux dépots. 

* Ajouter le repo original comme `upstream`

      cd into/cloned/fork-repo
      git remote add upstream git://github.com/ORIGINAL-USERNAME/ORIIGNAL-REPO.git
      git fetch upstream

* Mettre à jour le fork à partir du repo d'origine.  
  À chaque fois qu’un Pull Request est accepté, mettre à jour le fork.

      git pull --rebase upstream/master master --autostash

---

## Créer un Pull Request

* Créer une branche pour la fonctionnalité à partir de la branche en cours

      git checkout -b my-feature

* Vérifier les guidelines du projet (fichier CONTRIBUTING)

  ![](https://help.github.com/assets/images/help/pull_requests/contributing-guidelines.png)

* Travailler sur la fonctionnalité

       git add thefile
       git commit -am 'Add some feature'  # Ajouter des modifications
       git push origin my-feature         # Pusher sur Github

* Vérifier les différentes entre votre branche et celle du repo d'origine  
  Quick link: https://github.com/ORIGINAL-USERNAME/ORIGINAL-REPO/compare

  ![](https://help.github.com/assets/images/help/pull_requests/pull-request-start-review-button.png)

* Si la fonctionnalité est liée à un *issue*, on peut utiliser un [mot-clé](https://help.github.com/articles/closing-issues-using-keywords/) dans le [corps du Pull Request](https://github.blog/2013-05-14-closing-issues-via-pull-requests/) ou le message d'un commit pour qu'il soit automatiquement affiché dans la discussion de l'issue et changer son statut lorsque le Pull Request est accepté.

      git commit -m "Should help with issue #1"
      git commit -m "Fixes #1"

* Créer le Pull Request

  ![](https://help.github.com/assets/images/help/pull_requests/pullrequest-send.png)

Une fois le pull request crée, une discussion est démarrée. Tous les commentaires ajoutés sont notifiés via mail.

Un Pull Request pointe sur une branche et non un commit spécifique, tous les modifications sur la branche faites après le Pull Request seront prises en compte et visibles dans la discussion du Pull Request.

---

## Supprimer une branche

* Supprimer la branche locale

      git branch -D branchname

* Supprimer la branche distante

      git push origin :branchname

---

## Créer une issue

Accéder à l'onglet Issue et cliquer sur New Issue

![](https://help.github.com/assets/images/help/issues/new_issues_button.png)

Les modifications faites sur l'issue vous seront notifiées par mail, à moins de se [désinscrire de la conversation](https://help.github.com/articles/subscribing-to-and-unsubscribing-from-notifications/).

