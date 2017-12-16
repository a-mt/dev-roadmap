---
title: Github
category: Webenv
---

## Releases

Github permet de créer des releases à partir de tags ou de commits. 
Cela permet de télécharger sous forme de zip le code du tag et d'ajouter des notes/de la documentation ainsi que des fichiers joints.  
Les releases permettent aux utilisateurs de télécharger une copie du code source sans passer par git.

### Créer une release

- Aller dans releases ![](https://help.github.com/assets/images/help/releases/release-link.png)
- Pour annoter un tag existant, aller dans l'onglet `Tags` et cliquer sur `Add release notes` sur le tag voulu
- Pour créer une release à partir d'un commit, aller dans l'onglet `Release` et cliquer sur `Draft new release`
- Renseigner les infos de la release avant de sauvegarder
    - ajouter une description
    - des fichiers joints peuvent être ajoutéss via drag & drop
    - la release peut être marquée comme pre-release (version beta)

---

## Issues

Les *issues* peuvent être utilisés pour
- signaler des bugs
- organiser un suivi des fonctionnalités

Pour les activer, aller dans les configurations du projet, onglet Options, et cocher `Issues`.

### Workflow

Quand on crée un ticket, on peut spécifier un milestone (une fonctionnalité) pour suivre plus facilement les tâches.  
On peut s'inscrire ou se désinscrire pour être notifié des changements sur un ticket en particulier.

La liste des tickets peut être filtré (ouverts, qui me sont assignés, etc)

On peut mentionner un ticket dans un commit en préfixant son numéro d'un # (hash). 
Le commit s'affichera automatiquement dans la discussion du ticket.
Si le message du commit inclut "fixes", "closes" ou "resolves", alors le ticket sera clos.

``` shell
git commit -m "Should help with issue #1"
git commit -m "Fixes #1"
```

---

## README.md

Le fichier README.md est un fichier placé à la racine du projet, écrit en [Markdown](gfm.md), qui est affiché par Github sur la page du projet.  
Il doit décrire
- le but du projet
- comment le télécharger
- comment le configurer et l'installer pour le faire tourner en local

---

## Wiki

Quand le fichier README.md commence à être beaucoup trop long, on peut ajouter un wiki, c'est à dire un ensemble de pages markdown qui décrivent et documentent le projet.

Pour activer le wiki, aller dans les configurations du projet, onglet Options, et cocher `Wiki`.

### Syntaxe

La syntaxe Markdown utilisée est celle de [Github](gfm.md).  
Pour ajouter des liens vers une autre page wiki: `[The Rules](rules)`

### Badges

On peut également ajouter des badges.  
Par exemple `[![Dependency Status](https://gemnasium.com/rails/arel.svg)]`

![Dependency Status](https://gemnasium.com/rails/arel.svg)  
[Liste de badges](https://shields.io/)

---

## Page projet

Plutôt que d'utiliser un wiki, et écrire en Markdown, on peut créer une page projet.  
Cela donne plus de liberté, comme d'ajouter du javascript, html, etc.

[Voir Github pages](github-pages.md)

---

## Configurations du dépot

On peut
- renommer le dépot.  
  Les liens vers l'ancien dépot seront redirigés vers le nouveau
- renommer la branche par défaut
- configurer les wikis, pages et issues
- ajouter de nouveaux collaborateurs au projet, pour qu'ils puissent voir et éditer le projet.

---

## Project

L'onglet Project permet de gérer le projet en organisant les Pull Request, Issues ou notes en cartes dans des colonnes (c'est à dire un Kanban board, un peu comme Trello).
[Voir vidéo explicative](https://youtu.be/C6MGKHkNtxU?t=26s)

![](https://cloud.githubusercontent.com/assets/3477155/18481731/44629a3e-79ab-11e6-8ce9-9ad5f07a135d.gif)

---

## Services

Des services peuvent être ajoutés à un dépot Github dans `Settings` > `Integrations & Services` (sélectionner un service dans la liste déroulante).
[Voir la description des services](https://github.com/github/github-services/tree/master/docs)

Par exemple :

<table>
  <tr><th align="left">Basecamp</th><td>Connecte Basecamp à Github</td></tr>
  <tr><th align="left">JIRA</th><td>Résout les tickets Jira dans les messages des commits</td></tr>
  <tr><th align="left">CircleCI</th><td>Execute des tests automatiquement</td></tr>
</table>

---

## Webhooks

Les webhooks executent des requêtes HTTP (POST) à chaque qu'un événement spécifique se produit, ce qui permet de notifier une application externe, par exemple pour mettre à jour un outil de suivi de projet externe à Github (et qui n'est pas dans la liste des services), déclancher des builds d'intégration continue, déployer les modifications sur un serveur, etc.

Pour ajouter un webhook à un dépot, aller dans `Settings` > `Webhooks` > `Add webhook` 

<table>
  <tr><th align="left">Payload URL</th><td>L'URL a appeler quand une notification est déclenchée</td></tr>
  <tr><th align="left">Content-type</th><td>Type de notification à envoyer. Généralement json</td></tr>
  <tr><th align="left">Secret</th><td>Clé secrète pour vérifier que la requête vient bien de Github</td></tr>
</table>

---

## API Github

Pour récupérer l'historique des commits ou la liste des utilisateurs qui ont commités sur le dépot par exemple, il faut utiliser l'API Github. 
Il s'agit d'une simple API JSON, par conséquent n'importe quel langage peut être utilisé pour récupérer les infos. 
Les exemples suivants utilisent curl.

Certaines commandes ne nécessitent aucune autorisation :

``` shell
curl https://api.github.com                         # Liste toutes les requêtes de l'API
curl https://api.github.com/emojis                  # Liste les emojis de Github
curl https://api.github.com/users/peterbell         # Liste les infos publiques de l'utilisateur peterbell
curl https://api.github.com/users/peterbell/repos   # Liste les dépots publiques de peterbell
```

D'autres nécessitent un [access token](#access-token).  
Les permissions de l'access token détermine ce qu'il est possible de requêter ou non.

* Le token peut être passé dans les headers

    ``` shell
    # Récupère les infos de l'utilisateur authentifié
    curl -i -H 'Authorization: token <access_token>' https://api.github.com/user

    # Crée un dépot
    curl -i -H 'Authorization: token <access_token>' \
    -d'{"name": "test_repo"}' \
    https://api.github.com/user/repos

    # Crée une issue
    curl -i -H 'Authorization: token <access_token>' \
    -d'{"title": "The title", "body": "The description", "labels": ["critical"]}' \
    https://api.github.com/user/repos/<username>/<repo>/issues
    ```

* Ou en paramètre

    ``` shell
    # Liste des gists (30 elements, page 1)
    curl -i "https://api.github.com/users/a-mt/gists?access_token=<access_token>"

    # Page 2 de la liste de gists (Vérifier headers "link" pour page suivante)
    curl -i "https://api.github.com/users/a-mt/gists?access_token=<access_token>&page=2"

    # Détail d'un gist
    curl -i "https://api.github.com/gists/4c4e47ac56a3574d5dbbc6bf6cf1265c"

    # Commentaires d'un gist
    curl -i "https://api.github.com/gists/4c4e47ac56a3574d5dbbc6bf6cf1265c/comments"
    ```

<ins>Script pour récupèrer la liste complète des gists</ins> :

``` shell
function gist {
  filepath="/tmp/gists"
  TOKEN="<access_token>"
  url="https://api.github.com/users/a-mt/gists?access_token=$TOKEN"

  i=1
  while true; do

    # File has been downloaded ?
    if [[ -e "${filepath}_${i}" ]]; then
      break
    fi
    printf "\e[36mPage ${i}\e[m\n"

    # Get response + headers
    curl -i "${url}&page=${i}" | sed "1,/^\s*$/{
        w /tmp/gist_headers
        d
      }" > "${filepath}_${i}"

    # If has next page, continue
    hasNext=$(cat /tmp/gist_headers | grep ^Link: | grep 'rel="next"')
    if [[ -z $hasNext ]]; then
      break
    fi
    (( i++ ))
  done

  cat /tmp/gists* | grep -e '^  \(}\|{\)' -e '^    "\(url\|created_at\|description\)"'
}

gist

```

---

## Contrôles d'accès

### Collaborateurs

Les collaborateurs n'ont pas le droit admin, ils ne peuvent pas modifier les configurations ou ajouter de nouveaux collaborateurs eux-mêmes. 
Si vous ne voulez pas donner un droit en écriture complet, utiliser le système de fork et pull request.

### Organisation

Un compte Github peut être déclaré comme **organisation** dans les configurations du profil.  
Une organisation est utile quand le code appartient à un groupe, notamment une entreprise.

On peut ajouter des membres à l'organisation, soit en tant que membre soit en tant que propriétaire. Un propriétaire a tous les droits (inviter des personnes, modifier les configurations, etc), un membre a des droits limités (créer des teams, voir les membres de l'organisation et des teams, etc)

Un **team** permet de gérer les permissions de multiple développeurs travaillant sur de multiples dépots.

### Authentification à deux facteurs

On peut activer l'authentification à deux facteurs (*two factor authentication* en anglais, abbrégé 2FA) dans les configurations du profil (onglet Security). 
Au moment de se logger à Github, après avoir renseigné le nom d'utilisateur et mot de passe, un code d'accès sera demandé. Ce code d'accès est envoyé par SMS, il change de manière récurrente mais pas à chaque utilisation.  
Pour éviter de se retrouver bloqué en cas de perte du code d'accès, des [codes de récupération](https://help.github.com/articles/downloading-your-two-factor-authentication-recovery-codes/) peuvent être crées (à mettre en place avant de perdre le code !).

### Access token

Un token peut être utilisé pour s'identifier à Github avec une API, ce qui permet de facilement donner et révoquer l'accès à des applications. 
La portée de ce token peut être limitée (accès aux dépots, aux gist, aux informations utilisateur, etc).  
Un token d'accès peut être crée dans `Settings` > `Developper settings` > `Personal access tokens` > `Generate new token`.

### Authentification via la console

Il y a plusieurs façons possibles pour s'authentifier

#### Agent SSH

Un agent SSH est la manière la plus rapide et la plus simple à utiliser.

1. [Créer une clé SSH et l'ajouter à ssh-agent](ssh.md)
2. Copier le contenu de la clé publique dans le presse-papier (`.ssh/id_dsa.pub`)
3. Déclarer cette nouvelle clé sur Github : `Settings` > `SSH and GPG keys` > `New SSH key`
4. Tester la connection à Github : `ssh -T git@github.com`

#### Autorisations OAuth

Un autorisation OAuth est en quelque sorte un mot de passe temporaire, il peut facilement être diffusé et révoqué.

1. Créer un [token d'accès](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
2. L'utiliser à la place du mot de passe

``` shell
git clone https://github.com/username/repo.git
Username: your_username
Password: your_token
```

#### Clé de déploiement

Une clé de déploiement est une clé SSH qui n'est autorisée que sur un dépot en particulier.

1. [Créer une clé SSH et l'ajouter à ssh-agent](ssh.md)
2. Copier le contenu de la clé publique dans le presse-papier (`.ssh/id_dsa.pub`)
3. Activer la clé pour le dépot : `Settings` (du dépot) > `Deploy keys` > `Add deploy key`

### Sessions

Dans l'onglet Security des configurations du profil sont les listées les différentes sessions qui se sont connectées à Github, avec adresse IP, date de dernière connexion, et navigateur utilisé. 
Cela permet de vérifier si quelqu'un d'autre est ou s'est loggé à Github.

Un historique des actions importantes effectuées est présent juste en dessous: créer un dépot, en supprimer un, ajouter un membre, etc.

---

## Hub

Hub est un outil CLI qui permet d'accéder aux fonctionnalités de Git sans avoir à utiliser de navigateur, par exemple créer un repo, créer un fork, etc. 
Nécessite Ruby.

### Installer

``` shell
git clone https://github.com/github/hub.git
cd hub
rake install prefix=/usr/local
```

### Exemple complet

* <ins>Création d'un projet</ins> :

    Créer un projet :

    ``` shell
    git init <reponame>
    cd <reponame>
    vi README.md
    git add .
    git commit -m "Added README file"
    ```

    Créer un dépot :

    ``` shell
    hub create
    git push -u origin master
    ```

    L'ouvrir dans le navigateur :

    ``` shell
    hub browse
    ```

* <ins>Création d'un pull request</ins> :

    Forker un repo :

    ``` shell
    hub clone <username>/<reponame>
    cd <reponame>
    hub fork
    vi .git/config   # Changer [remote "origin"] en [remote "upstream"]
                     # et changer [remote "myusername"] en [remote "origin"]
    ```

    Créer une branche :

    ``` shell
    git checkout -b <branchname>
    vi myfile.txt
    git add .
    git commit -m "Commit on the new branch"
    git push -u origin <branchname>
    ```

    Créer un pull request (ouvre un éditeur pour ajouter un titre et une description - séparés par une ligne vide) :

    ```
    hub pull-request -b <username>:master -h <username>:<branchname>
    ```

* <ins>Vérifier un pull request et le merger</ins> :

    ``` shell
    git checkout https://github.com/username/repo/pull/1 my_branch

    git merge https://github.com/username/repo/pull/1
    git push                    # accept the merge
    git reset --hard HEAD~1     # cancel the merge
    ```

* <ins>Cherry-picking sur un projet différent</ins> :

    ``` shell
    hub cherry-pick username@SHA
    ```

`hub` peut executer toutes les commandes git - par exemple, `hub status` execute `git status`.  
Il est donc possible de définir hub comme commande git : `alias git=hub`
