---
title: Services, Webhooks, API, Hub
category: Webenv, Github
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