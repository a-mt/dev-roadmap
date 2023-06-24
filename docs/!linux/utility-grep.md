---
title: Grep
category: Linux
---

{% capture content %}{% raw %}

Grep est une commande Unix qui permet de trouver toutes les lignes qui contiennent un motif (texte ou regex POSIX — BRE ou ERE) dans un ou plusieurs fichiers; l'entrée peut également provenir de stdin. Le nom grep vient de `g/re/p`: global regex print.

## Données en entrées

Grep peut filtrer sur stdin, par exemple pour filtrer des noms de fichier

``` sh-session
$ ls | grep .md              # Les lignes qui contiennent ".md"

awk.md
composer.md
github-pages.md
index.md
json.md
liquid.md
regex.md
regex-posix.md
sed.md
semver.md
text-editing.md
vim.md
wildcard.md
yaml.md
```

Ou sur le contenu d'un fichier :

``` sh-session
$ grep BRE regex-posix.md     # Les lignes qui contiennent "BRE" dans le fichier regex-posix.md

- les regex POSIX BRE (Basic Regex Expression), qui ne comprennent que le strict minimum des regex,
- et les regex POSIX ERE (Extended Regex Expression), une extension des BRE, qui ajoute le support des groupe
| BRE           | grep, vi, sed, csplit, dbx, dbxtool, more, ed, expr, lex, pg, nl, rdist |
`grep` utilise par défaut les regex BRE, il est possible d'utiliser les caractères ERE pourvu qu'ils soient p
 ## POSIX Basic Regex Expression (BRE)
```

Ou même de plusieurs fichiers :

``` sh-session
$ grep BRE *.md              # Les lignes qui contiennent "BRE" dans les fichiers .md du répertoire en cours

awk.md:- les lignes qui matchent une regex (syntaxe POSIX BRE)
awk.md:- les lignes dont un champs donné matche une regex (POSIX BRE)
regex-posix.md:- les regex POSIX BRE (Basic Regex Expression), qui ne comprennent que le strict minimum des r
regex-posix.md:- et les regex POSIX ERE (Extended Regex Expression), une extension des BRE, qui ajoute le sup
regex-posix.md:| BRE           | grep, vi, sed, csplit, dbx, dbxtool, more, ed, expr, lex, pg, nl, rdist |
regex-posix.md:`grep` utilise par défaut les regex BRE, il est possible d'utiliser les caractères ERE pourvu 
regex-posix.md: ## POSIX Basic Regex Expression (BRE)
sed.md:                        Regex POSIX BRE, ERE possible en échappant les caractères
sed.md:    /word/              Sur les lignes contenant /word/ (POSIX BRE)
vim.md:    :/word/             Sur la prochaine ligne contenant /word/ (POSIX BRE)
vim.md:    /text              Rechercher la prochaine occurence de /text/ (POSIX BRE)
vim.md:    :s/old/new/        Sur la ligne en cours, remplacer la 1ère occurence de /old/ par "new" (POSIX BR
```

## Type de recherche

Par défaut, grep cherche une regex (POSIX BRE)

``` sh-session
$ grep "category: .* PHP" *.md

composer.md:category: Web, PHP
```

Il est possible de désactiver ce comportement (= matcher une chaîne littérale) avec l'option `-F`

``` sh-session
$ grep -F ".json" *.md

composer.md:1. Créer un fichier `composer.json` à la racine du projet
composer.md:2. Déclarer les packages à installer dans `composer.json`
composer.md:3. Installer les dépendances listées dans `composer.json`
composer.md:| composer.json | contrat | Liste des packages à installer (utilisation possible de [patterns](se
composer.md:    composer require mypackage    Ajoute mypackage au .json
composer.md:3. Créer le fichier `composer.json` à la racine de `monprojet/`
```

Ou, au contraire, d'utiliser des regex POSIX ERE avec l'option `-E`

``` sh-session
$ ls | grep -E '^_|.md'

awk.md
composer.md
_config.yml
github-pages.md
_includes
index.md
json.md
_layouts
liquid.md
regex.md
regex-posix.md
sed.md
semver.md
_site
text-editing.md
vim.md
wildcard.md
yaml.md
```

## Options

Quelques options de grep sont particulièrement utiles :

### Ignorer la casse

`-i` : ignore la casse

``` sh-session
$ grep -i jekyll github-pages.md

- Github supporte Jekyll, un générateur de site statique et qui permet
Github fait tourner Jekyll sur son serveur à chaque commit pour générer le site publié,
Le parser utilisé par Jekyll pour convertir le Markdown en HTML est kramdown.
 ## Faire tourner Jekyll en local
Installer Jekyll en local est utile pour prévisualiser le site qui sera publié par Github avant de commiter.
2. Créer un fichier `/_config.yml` (le fichier de configuration de Jekyll), et y placer les configurations pa
       theme: jekyll-theme-primer
3. Installer Jekyll
       sudo gem install jekyll bundler
        jekyll serve
       jekyll build
```

### Afficher le numéro de ligne

`-n` : affiche le numéro de ligne

``` sh-session
$ grep -in jekyll github-pages.md

13:- Github supporte Jekyll, un générateur de site statique et qui permet
76:Github fait tourner Jekyll sur son serveur à chaque commit pour générer le site publié,
80:Le parser utilisé par Jekyll pour convertir le Markdown en HTML est kramdown.
85: ## Faire tourner Jekyll en local
88:Installer Jekyll en local est utile pour prévisualiser le site qui sera publié par Github avant de commite
95:2. Créer un fichier `/_config.yml` (le fichier de configuration de Jekyll), et y placer les configurations
102:       theme: jekyll-theme-primer
104:3. Installer Jekyll
107:       sudo gem install jekyll bundler
111:        jekyll serve
118:       jekyll build
```

### Limiter le nombre de résultats par fichier

`-m` : limiter le nombre de résultats par fichier

``` sh-session
$ grep -inm 1 jekyll *.md

github-pages.md:13:- Github supporte Jekyll, un générateur de site statique et qui permet
index.md:26:  - [ ] Jekyll
liquid.md:8:et a depuis été adopté par de nombreuses applications web, dont notamment Jekyll.
```

### Afficher les lignes qui ne matchent PAS

`-v` : inverser

``` sh-session
$ ls | grep -vE '^_|.md$'

assets
search.html
search.json
```

### Afficher le nombre de résultats par fichier

`-c` : afficher le nombre de lignes matchées pour chaque fichier

``` sh-session
$ grep -c "category:" *.md

awk.md:1
composer.md:1
github-pages.md:1
index.md:0
json.md:1
liquid.md:1
regex.md:1
regex-posix.md:1
sed.md:1
semver.md:1
text-editing.md:1
vim.md:1
wildcard.md:1
yaml.md:1
```

### Rechercher récursivement

`-r` : rechercher récursivement dans un dossier et ses sous-dossiers

``` sh-session
$ grep -r relative_url

search.html:        fetch("{{ "/search.json" | relative_url }}")
_layouts/default.html:    <link href="{{ '/assets/css/style.css?v=' | append: site.github.build_revision | re
_layouts/default.html:    <script src="{{ '/assets/js/common.js?v=' | append: site.github.build_revision | re
_layouts/default.html:    <script src="{{ "assets/javascript/anchor-js/anchor.min.js" | relative_url }}"></sc
_includes/searchbar.html:<form action="{{ "/search" | relative_url }}" method="get" class="searchbar">
```

À utiliser avec le mode récursif, les options `exclude-dir` et `include` :

* `--exclude-dir` : exclure un dossier de la recherche récursive

  ``` sh-session
  $ grep -r /search --exclude-dir _site

  search.html:        fetch("{{ "/search.json" | relative_url }}")
  _includes/searchbar.html:<form action="{{ "/search" | relative_url }}" method="get" class="searchbar">
  ```

* `--include` : filtrer sur les fichiers qui matchent un pattern

  ``` sh-session
  $ grep -r ".js\b" --exclude-dir _site --include "*.html"

  _layouts/default.html:    <script src="{{ '/assets/js/common.js?v=' | append: site.github.build_revision 
  _layouts/default.html:    <script src="{{ "assets/javascript/anchor-js/anchor.min.js" | relative_url }}">
  ```

### Colorer le résultat

`--color` : colorer les matchs  
Accepte `auto` (config par défaut sous Ubuntu), `always` et `never`.

`--color=always` permet de conserver la couleur même en passant la sortie à d'autres commandes.

``` sh-session
$ grep --color=always js *.md | grep -v '```'

composer.md:1. Créer un fichier `composer.json` à la racine du projet
composer.md:2. Déclarer les packages à installer dans `composer.json`
composer.md:3. Installer les dépendances listées dans `composer.json`
composer.md:| composer.json | contrat | Liste des packages à installer (utilisation possible de [patterns](se
composer.md:    composer require mypackage    Ajoute mypackage au .json
composer.md:3. Créer le fichier `composer.json` à la racine de `monprojet/`
github-pages.md:    Le résultat (fichiers html, css, js) est généré dans le répertoire `̀_site`
index.md:    - [x] [JSON](json.md)
json.md:- [Specs JSON](http://json.org/) (contient la liste complètes des langages supportant le JSON)
json.md:- [Visualiser du JSON](jsoneditoronline.org)
json.md:- [Valider du JavaScript](www.jshint.com)
json.md:- [Valider du JSON](jsonlint.com)
json.md:var json = JSON.stringify(info);
json.md:var json = `{
json.md:var info = JSON.parse(json);
liquid.md:    | jsonify                  | Convertir une liste en JSON                    | {{ list | jsonify
semver.md:Les gestionnaires de packets tels que NPM (node.js) et Composer (PHP), permettent de spécifier quel
semver.md:- Utiliser [npm server calculator](https://semver.npmjs.com/) pour tester les versions matchées par
yaml.md:- [Parser en ligne](http://yaml-online-parser.appspot.com/) pour tester la conversion du yaml en json
```

Attention, avec `--color=always` des caractères spéciaux sont utilisés pour afficher la couleur. Ces caractères spéciaux peuvent interférer avec le bon fonctionnement des commandes qui suivent.

``` sh-session
$ grep --color=always js *.md | grep -v json

composer.md:1. Créer un fichier `composer.json` à la racine du projet
composer.md:2. Déclarer les packages à installer dans `composer.json`
composer.md:      ``` json
composer.md:3. Installer les dépendances listées dans `composer.json`
composer.md:| composer.json | contrat | Liste des packages à installer (utilisation possible de [patterns](se
composer.md:    composer require mypackage    Ajoute mypackage au .json
composer.md:3. Créer le fichier `composer.json` à la racine de `monprojet/`
composer.md:    ``` json
github-pages.md:    Le résultat (fichiers html, css, js) est généré dans le répertoire `̀_site`
index.md:    - [x] [JSON](json.md)
liquid.md:    | jsonify                  | Convertir une liste en JSON                    | {{ list | jsonify
semver.md:Les gestionnaires de packets tels que NPM (node.js) et Composer (PHP), permettent de spécifier quel
semver.md:- Utiliser [npm server calculator](https://semver.npmjs.com/) pour tester les versions matchées par
yaml.md:- [Parser en ligne](http://yaml-online-parser.appspot.com/) pour tester la conversion du yaml en json
```

{% endraw %}{% endcapture %}
{{ content | replace: '``` sh-session','``` shell_session' }}
