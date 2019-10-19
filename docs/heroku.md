---
title: Heroku
category: Other
---

## Installer Heroku CLI

* Vérifier si Heroku CLI est installé:

  ```
  heroku --version
  ```

* Si ce n'est pas le cas, suivre la [documentation Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

---

## S'identifier

* [Créer un compte Heroku](https://www.heroku.com/) si ce n'est pas déjà fait  
* Ouvrir le terminal et s'identifier:

  ```
  heroku login
  ```

---

## Créer un nouveau projet

* Créer un nouveau projet:

  ```
  heroku create
  ```

* Renommer le projet créé en passant par l'interface web d'Heroku puis:

  ```
  git remote rm heroku
  heroku git:remote -a <newname>
  ```

---

## Définir les variables d'environnement

* Définir une variable d'environnement sur Heroku:

  ```
  heroku config:set MAVAR="valeur"
  ```

* Pour voir la valeur d'une variable d'environnement:

  ```
  heroku config:get MAVAR
  ```

* Pour lister toutes les variables d'environnement sur Heroku:

  ```
  heroku config
  ```

* Pour supprimer une variable d'environnement:

  ```
  heroku config:unset MAVAR
  ```

On peut aussi passer par l'interface web:

![](https://devcenter1.assets.heroku.com/article-images/321-imported-1443570183-321-imported-1443554644-389-original.jpg)

---

## Déployer sur Heroku

* Envoyer le code sur Heroku

  ```
  git push heroku master
  ```

* Lancer une instance de l'application si elle ne tourne pas déjà  
  Il n'est pas possible de lancer plus d'une instance de la même application gratuitement.

  ```
  heroku ps:scale web=1
  ```

  En cas d'erreur "heroku no default language could be detected for this app.", il est nécessaire de spécifier un buildpack

* Ouvrir l'URL de l'application

  ```
  heroku open
  ```

---

## Spécifier un buildpack

* <ins>Python</ins>:

  * [Vérifier les versions Python supportées par Heroku](https://devcenter.heroku.com/articles/python-support#supported-runtimes)

  * ```
    echo "web: python bin/app.py" > Procfile
    python --version 2>&1 | awk '{print "python-" $2}' > runtime.txt
    pip freeze > requirements.txt
    heroku buildpacks:set heroku/python
    ```

* <ins>Node.js</ins>:

  * [Vérifier les versions Node.js supportées par Heroku](https://devcenter.heroku.com/articles/nodejs-support#supported-runtimes)
  * Créer un fichier `package.json` à la racine du projet et préciser la version Node.js utilisée

    ```
    {
      "name": "myapp",
      "description": "a really cool app",
      "version": "1.0.0",
      "engines": {
        "node": "10.3.0"
      }
    }
    ```

* <ins>PHP</ins>:  
  On peut utiliser un [runtime Apache ou Nginx](https://devcenter.heroku.com/articles/custom-php-settings)

  ```
  echo 'web: $(composer config bin-dir)/heroku-php-apache2' > Procfile
  ```

  Pour utiliser un DocumentRoot autre que la racine du projet (`public/` dans cet exemple):

  ```
  echo 'web: $(composer config bin-dir)/heroku-php-apache2 public/' > Procfile
  ```

* <ins>Autre</ins>:  
  Pour executer des commandes Bash personnalisées:

  ```
  heroku buildpacks:add https://github.com/weibeld/heroku-buildpack-run.git
  echo "Hello World" > buildpack-run.sh
  ```

Commiter puis reprendre le deploiement normal

## Forcer un nouveau build

    heroku plugins:install heroku-repo
    heroku repo:purge_cache -a <appname>
    heroku repo:reset -a <appname>
    git push heroku master

ou

    git commit --allow-empty -m "Upgrading to heroku-18"
    git push heroku master

---

## Changer de stack

    heroku stack:set heroku-18 -a <app name>

La stack sera changée au prochain déploiement.  
Autres alternatives: [Upgrading to the Latest Stack](https://devcenter.heroku.com/articles/upgrading-to-the-latest-stack)

---

## Logs

Pour afficher les logs générés par Heroku:

```
heroku logs --tail
```

Pour n'afficher que les logs de l'application (`console.log`):

```
heroku logs --source app-name
```

---

## Releases

Afficher les deploiements:

``` shell
$ heroku releases
=== production-app Releases
v13  Deploy 973c3f7                  joe@example.com   2014/07/09 10:55:16
v12  Deploy ddb317d                  jill@example.com  2014/07/07 10:46:26
```

Rollback vers une version antérieure:

```
heroku rollback v12
```

---

## Apps

* Lister toutes les applications Heroku:

  ```
  heroku apps
  ```

* Supprimer une application:

  ```
  heroku apps:destroy --app app-name
  ```

* Lancer l'application localement (sur http://localhost:5000)

  ```
  heroku local web
  ```
