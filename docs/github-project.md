---
title: Créer un projet Open Source
category: Webenv, Github
---

> There is no perfect time to open source your work. You can open source an idea, a work in progress, or after years of being closed source.

## Choisir le nom du projet

Choisir un nom facile à retenir.  
* Vérifier s'il n'existe pas déjà un [projet avec un nom similaire](http://ivantomic.com/projects/ospnc/).
* [Réserver le nom de domaine](https://instantdomainsearch.com/) et le compte Twitter.

## Ajouter un fichier LICENSE

Ajouter un fichier [LICENSE](https://help.github.com/articles/adding-a-license-to-a-repository/) pour définir la licence du projet.  
Par définition, tous les projets open source doivent avoir une [license open source](https://choosealicense.com/).  
Si le projet n'a pas de licence, il n'est pas open source.

[How open source licenses work](https://medium.freecodecamp.org/how-open-source-licenses-work-and-how-to-add-them-to-your-projects-34310c3cf94)  
[SPDX License List](https://spdx.org/licenses/)

## Ajouter un fichier README

Créer un fichier [README](https://help.github.com/articles/about-readmes/) pour expliquer

  * ce que fait le projet
  * les specs et dépendances nécessaires pour l'utiliser (mémoire RAM, système d'exploitation, logiciels, etc)
  * comment l'installer
  * comment l'utiliser, avec des exemples de commandes / résultat ou des captures d'écran
  * comment contribuer

Il est également conseillé d'ajouter
* une section "Frequently Asked Questions"
* des tests, cela inclus les commandes et les données de test avec lesquelles les exécuter

Le fichier doit être placé à la racine du projet, dans `/docs` ou `/.github` pour que Github le détecte.  
Il doit être écrit en [Markdown (Github Flavored)](gfm.md).  

[Template de fichier README](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

## Ajouter des badges

On peut ajouter des badges pour signaler des informations, par exemple `PRs-welcome`:

    [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Affiche: [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Liste de badges](https://shields.io)

## Ajouter un wiki / site statique

* Quand le fichier README commence à être beaucoup trop long, on peut ajouter un wiki, c’est à dire un ensemble de pages markdown (Github Flavored) qui décrivent et documentent le projet.

  Pour activer le wiki, aller dans les configurations du projet, onglet Options, et cocher `Wiki`.

* On peut également utiliser [Github Pages](github-pages.md) pour créer un site statique qui documente le projet. Cela donne plus de liberté, comme d’ajouter du javascript, html, etc.

## Ajouter un fichier CONTRIBUTING

Le fichier [CONTRIBUTING](https://help.github.com/articles/setting-guidelines-for-repository-contributors/) peut préciser
* comment rapporter un bug
* comment suggérer une nouvelle fonctionnalité
* comment configurer un environnement de développement en local et exécuter des tests

Il peut également préciser
* les types de contributions recherchées (développement, traduction, documentation, etc)
* des guidelines pour les Pull Request
* comment créer un pull request, pour les gens qui n'ont jamais contribué

> https://github.com/formly-js/angular-formly/blob/master/CONTRIBUTING.md
> https://github.com/atom/atom/blob/master/CONTRIBUTING.md
> https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md

## Ajouter un fichier CODE_OF_CONDUCT

Ajouter un fichier [CODE_OF_CONDUCT](https://help.github.com/articles/adding-a-code-of-conduct-to-your-project/) pour définir un code de conduite pour les contributions. Mettre un lien dans CONTRIBUTING.

> http://yourfirstpr.github.io/coc.html
> https://github.com/openemr/openemr/blob/master/CODE_OF_CONDUCT.md
> https://github.com/atom/atom/blob/master/CODE_OF_CONDUCT.md
> https://opensource.guide/code-of-conduct/

## Ajouter des topics

[Ajouter des topics](https://help.github.com/articles/classifying-your-repository-with-topics/) au repo pour aider les gens à trouver le repo avec la [recherche](https://help.github.com/articles/searching-for-repositories/)

![](https://help.github.com/assets/images/help/repository/add-topics-link.png)

![](https://help.github.com/assets/images/help/repository/os-repo-with-topics.png)

## Ajouter un fichier VISION

Au début d'un projet, on expérimente avec des idées et on prend des décisions en se basant sur nos propres désirs. Plus le projet gagne en popularité, plus de contributeurs et utilisateurs s'impliquent dans le processus.

Écrire les objectifs du projet clarifie non seulement ce que vous voulez, mais aide les autres à comprendre comment vous aider. Avoir une vision claire et documentée vous permettra de prioriser les demandes.

Même si ces objectifs ne sont rédigés au propre, il est préférable de griffonner une todolist que rien du tout. Si vous disposez d'autres éléments pouvant aider (une roadmap par exemple), rendez-les publics.

## Créer des releases 

Github permet de créer des releases à partir de tags ou de commits. Cela permet de télécharger sous forme de zip le code du tag et d’ajouter des notes/de la documentation ainsi que des fichiers joints.  
Les releases permettent aux utilisateurs de télécharger une copie du code source sans passer par git.

Pour créer une release:

- Aller dans releases ![](https://help.github.com/assets/images/help/releases/release-link.png)
- Pour annoter un tag existant, aller dans l'onglet `Tags` et cliquer sur `Add release notes` sur le tag voulu
- Pour créer une release à partir d'un commit, aller dans l'onglet `Release` et cliquer sur `Draft new release`
- Renseigner les infos de la release avant de sauvegarder
    - ajouter une description
    - des fichiers joints peuvent être ajoutéss via drag & drop
    - la release peut être marquée comme pre-release (version beta)

## Ajouter un fichier CHANGELOG

Créer un fichier CHANGELOG pour écrire les changements apportés au projet à chaque montée en version (nouvelles fonctionnalités, bug fix, etc)

## Activer les issues

Les issues peuvent être crées par les utilisateurs pour signaler des bugs ou poser des questions, ou par vous-même pour organiser un suivi des fonctionnalités
ou demander de l'aide à la communauté GitHub.

Pour les activer, aller dans les configurations du projet, onglet Options, et cocher `Issues`.

## Activer la gestion de projet

L’onglet Project permet de gérer le projet en organisant les Pull Request, Issues ou notes en cartes dans des colonnes (c’est à dire un Kanban board, un peu comme Trello). [Voir vidéo explicative](https://youtu.be/C6MGKHkNtxU?t=26s)

![](https://cloud.githubusercontent.com/assets/3477155/18481731/44629a3e-79ab-11e6-8ce9-9ad5f07a135d.gif)

## Configurer le dépot

Dans les options, on peut

* renommer le dépot.
  Les liens vers l’ancien dépot seront redirigés vers le nouveau
* renommer la branche par défaut
* configurer les wikis, pages et issues
* ajouter de nouveaux collaborateurs au projet, pour qu’ils puissent voir et éditer le projet.

## Lister les dépendances du projet

[Listing the packages that a repository depends on](https://help.github.com/articles/listing-the-packages-that-a-repository-depends-on/)
