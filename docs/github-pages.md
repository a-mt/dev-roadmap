---
title: Github pages
category: Webenv
---

Github permet d'héberger un site web statique (donc HTML, CSS, JS).
Par exemple : [w3c.github.io](https://github.com/w3c/w3c.github.io).  
Le site est mis à jour à chaque commit au bout de quelques minutes.

- Les pages peuvent être crées directement sur Github.  
- Récupérer le projet en local permet de modifier et tester le rendu avant de publier.  
- Il n'est pas possible d'exécuter du code côté serveur (PHP et base de données par exemple), ni de modifier les configurations serveur (.htaccess).
- Github supporte Jekyll, un générateur de site statique et qui permet
  1. d'utiliser des layouts (pour mettre en commun header et footer par exemple)
  2. d'inclure de la logique - bien que limitée (conditions, boucles, remplacements).

---

## Créer le site

### Cas 1 : D'un utilisateur

L'URL sera http://username.github.io

Créer un repo `username.github.io`, en remplaçant `username` par votre nom d'utilisateur.  
Placer les fichiers statiques à la racine de la branche `master`.  

### Cas 2 : D'un projet

L'URL sera http://username.github.io/myproject (quelque soit la source choisie)

Créer un repo ou utiliser un repo existant, le nom du projet n'a pas d'importance.  
Placer les fichiers statiques
- soit à la racine de la branche `gh-pages`
- soit à la racine de la branche `master`
- soit dans un répertoire `docs` à la racine de la branche `master`

<!-- -->

Puis activer Github Pages dans les configurations du projet
:
- onglet `Settings`  
  ![Onglet settings](https://help.github.com/assets/images/help/repository/repo-actions-settings.png)

- indiquer la source à utiliser (`gh-pages`, `docs` ou `master`) dans le bloc `Github Pages`  
  ![Bloc Github Pages](https://help.github.com/assets/images/help/pages/select-gh-pages-or-master-as-source.png)

- sauvegarder  
  ![Sauvegarder](https://help.github.com/assets/images/help/pages/click-save-next-to-source-selection.png)

- accéder au site web.  
  En cas d'erreur 404, attendre 10-15 minute que la publication se propage

---

## Utiliser un nom de domaine perso

Entièrement optionnel. Le site sera toujours accessible via github.io quoi qu'il advienne.

Créer un fichier `CNAME` à la racine de la source du site (`gh-pages`, `docs` ou `master`) et y écrire le nom de domaine cible.  
Par exemple `pages.mysite.com`.

Configurer le DNS de l'hébergeur où vous avez acheté le nom de domaine.  
Par exemple avec *namecheap* : `My Account > Manage domains > Modify domain`, dans `Subdomain settings` : `pages   mysite.com  CNAME (Alias)`

---

## Créer une page 404 personnalisée

Il suffit de créer une page `404.html` à la racine.

---

## Utiliser des fichiers Markdown

Github fait tourner Jekyll sur son serveur à chaque commit pour générer le site publié,
de sorte que les fichiers Markdown (.md) sont convertit en fichiers HTML (.html).
Le fichier final (.html) est visible sur le site en ligne mais pas sur le repo.  

Le parser utilisé par Jekyll pour convertir le Markdown en HTML est kramdown.
La syntaxe Markdown de kramdown est très bien expliquée dans [sa documentation](https://kramdown.gettalong.org/quickref.html).

---

## Faire tourner Jekyll en local

Cette étape est entièrement optionnelle.
Installer Jekyll en local est utile pour prévisualiser le site qui sera publié par Github avant de commiter.

1. Cloner le repo

        git clone https://github.com/username/username.github.io
        cd username.github.io

2. Créer un fichier `/_config.yml` (le fichier de configuration de Jekyll), et y placer les configurations par défaut de Github

       markdown: kramdown
       kramdown:
         input: GFM
         hard_wrap: false

       theme: jekyll-theme-primer

3. Installer Jekyll

       sudo apt-get install ruby ruby-dev
       sudo gem install jekyll bundler

4. Lancer un serveur pour prévisualiser le site en local

        jekyll serve

    Le site est accessible à http://localhost:4000.
    La génération est relancé à chaque modification de fichier à l'intérieur du projet, ce qui permet de rapidement vérifier l'impact des modifications sur le résultat final.
   
    ou lancer la génération du site statique

       jekyll build

    Le résultat (fichiers html, css, js) est généré dans le répertoire `̀_site`

5. Ajouter un .gitignore pour ne jamais commiter le répertoire `_site`.

       echo _site > .gitignore
       git add .gitignore
       git commit -m "Add gitignore"
       git push
