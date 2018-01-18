
## Créer un projet (backend) de dev

Créer un nouveau workspace sur [c9.io](https://c9.io/)

---

## Versionner un projet

    git init
    git status
    git add .
    git commit -m "initial commit"

---

## Utiliser un dépot distant

Pour sauvegarder les sources sur un dépot distant, créer un repo (sur Github par exemple) puis:

    git remote add origin <url>
    git push origin master

Ou au contraire pour récupérer en local un dépot distant:

    git clone <url>

---

## Créer des environnements Python

Différents projets utilisent différentes versions de Python  
Pour créer un environnement Python avec une version spécifique, par exemple 2.7.14:

[Installer Miniconda](https://conda.io/miniconda.html) si nécessaire

    conda search --full-name python
    conda create -n py2.7.14 python=2.7.14 anaconda
    conda install -n py2.7.14 pip
    source activate py2.7.14

---

## Déployer sur Heroku

[Installer Heroku](https://devcenter.heroku.com/articles/heroku-cli) si nécessaire

    heroku login
    heroku create

Renommer le projet créé sur Heroku puis:

    git remote rm heroku
    heroku git:remote -a <newname>

Pusher sur Heroku:

    git push heroku master
    heroku ps:scale web=1
    heroku open
    
Erreur "heroku no default language could be detected for this app.": nécessaire de spécifier un buildpack

### Spécifier un buildpack

Pour Python ([vérifier les versions Python supportées par Heroku](https://devcenter.heroku.com/articles/python-support#supported-runtimes)):  

    echo "web: python bin/app.py" > Procfile
    python --version 2>&1 | awk '{print "python-" $2}' > runtime.txt
    pip freeze > requirements.txt
    heroku buildpacks:set heroku/python

Pour executer des commandes Bash personnalisées:

    heroku buildpacks:add https://github.com/weibeld/heroku-buildpack-run.git
    echo "Hello World" > buildpack-run.sh

Commiter puis reprendre le processus normal

### Forcer un nouveau build

    heroku plugins:install heroku-repo
    heroku repo:purge_cache -a <appname>
    heroku repo:reset -a <appname>
    git push heroku master

### Setter des variables d'environnement

    export MAVAR="valeur"
