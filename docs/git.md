---
title: Git
category: Other
---

Git est un logiciel de gestion de versions. Il permet de suivre l'évolution d'un fichier (version 1, version 2, version 3, etc), de savoir qui a effectué chaque modification, quand et pourquoi, et de revenir en arrière en cas de problème.

Il permet également de travailler à plusieurs sur des fichiers, sans risquer que les modifications d'une personne efface les modifications d'une autre.

[Cheatsheet Git](https://education.github.com/git-cheat-sheet-education.pdf)

---

## Installation

| OS          | Installation                            |
|---          |---                                      |
| Windows/Mac | [Installer Gitbash](http://git-scm.com) |
| Linux       | <code>sudo apt-get install git</code>   |

---

## Tree-ish

Certaines commandes git prennent en paramètre un type tree-ish.  
Un objet "tree-ish" désigne une arborescence à un instant de l'historique.  
Quelques exemples :

<table>
  <thead>
    <tr>
      <th>Exemple</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1ff91bf13a6d5461a85ad44f4cbacd77ee6c4917     </td><td> SHA du commit                </td></tr>
    <tr><td>1ff91bf1                                     </td><td> SHA abbrégé (non ambigu, au moins 4 caractères) </td></tr>
    <tr><td>HEAD                                         </td><td> Pointeur en cours            </td></tr>
    <tr><td>master                                       </td><td> Branche master               </td></tr>
    <tr><td>v0.99.8                                      </td><td> Tag v0.99.8                  </td></tr>
    <tr><td colspan="2"></td></tr>
    <tr><td>HEAD^, acf87505^, master^ <br> HEAD~1, HEAD~ </td><td> Le parent de...              </td></tr>
    <tr><td>HEAD^^ <br> HEAD~2                           </td><td> Le grand-parent de...        </td></tr>
    <tr><td>HEAD^^^ <br> HEAD~3                          </td><td> L'arrière grand-parent de... </td></tr>
  </tbody>
</table>

---

## Versionner un projet

La première étape est d'ajouter git au répertoire dont les fichiers doivent être versionnés, puis de versionner les fichiers lorsqu'ils sont prêts.

``` shell
cd monrepertoire
git init
git status
git diff

git add --all
git status

git commit -m "Init"
```

---

### help

Pour afficher la man page d'une commande git, utiliser `git help cmd`. Exemple: `git help init`. On peut obtenir le même résultat en tapant `man git-init`.

---

### init

`git init` permet d'initiliser git pour le répertoire courant et ainsi de versionner les fichiers qui s'y trouvent.  
Crée un répertoire `.git`, où seront enregistrés les commits (= différentes versions) des fichiers.

<table>
<tr><th align="left">git init      &emsp;&emsp;&emsp;&emsp;</th><td>Initialise git pour le répertoire courant</td></tr>
</table>

---

### add

Quand des fichiers ont été modifiés dans un répertoire versionné (= qui contient un répertoire .git), il faut pour enregistrer une version
1. indiquer quels fichiers doivent être enregistrés (= les mettre dans le staging area)
2. enregistrer ces fichiers (= créer un commit)

<table>
<tr><th align="left">git add file.txt    </th><td>Ajoute file.txt au staging area</td></tr>

<tr><th align="left">git add .           </th><td>Tous les fichiers modifiés (mais pas les nouveaux)</td></tr>
<tr><th align="left">git add --all       </th><td>Tous les fichiers ajoutés, modifiés et supprimés</td></tr>
<tr><th align="left">git add mydir/      </th><td>Tous les fichiers dans le répertoire mydir</td></tr>

<tr><th align="left">git add *.txt       </th><td>Tous les fichiers .txt dans le répertoire courant (avec l'expansion du shell)</td></tr>
<tr><th align="left">git add '*.txt'     </th><td>Tous les fichiers .txt dans tout le projet (avec l'expansion de git)</td></tr>
</table>

---

### .gitkeep

Git est conçu pour mémoriser les versions de fichiers, pas les répertoires. Les répertoires vides sont donc ignorés et ne peuvent pas être versionnés. Par convention, pour versionner un répertoire vide on y place un fichier `.gitkeep` vide.

---

### rm

`git rm file.txt` permet de supprimer un fichier. Le fichier pourra être récupéré via un checkout d'un commit antiérieur.

<table>
<tr><th align="left">git rm file.txt                </th><td>Supprimer file.txt du disque et de git (ou uniquement de git si supprimé manuellement)</td></tr>
<tr><th align="left">git rm --cached file.txt       </th><td>Supprimer file.txt de git mais pas du disque</td></tr>
</table>

---

### mv

`git mv oldname newname` permet de renommer et/ou déplacer un fichier

<table>
<tr><th align="left">git mv file.txt newfile.txt    </th><td>Renommer file.txt en newfile.txt</td></tr>
</table>

Notons qu'on peut obtenir le même résultat avec rm suivit de add.
Git compare les données entre les deux fichiers et en déduit qu'il s'agit d'un déplacement ou non. Les fichiers n'ont pas a être identiques, le seuil de tolérance est d'environ 50%.

``` shell
mv file.txt newfile.txt
git rm file.txt
git add newfile.txt
```

---

### status

`git status` liste les fichiers qui ont été modifiés depuis le dernier commit (ajoutés, modifiés et supprimés). Indique lesquels sont dans le staging area (= ceux qui ont été marqués pour faire partie du prochain commit) ou non.

<table>
<tr><th align="left">git status          </th><td>Affiche les fichiers modifiés depuis le dernier commit</td></tr>
<tr><th align="left">git status -s      &emsp;</th><td>Affiche les fichiers modifiés de manière condensée</td></tr>
</table>

``` shell
$ git status

    Changes to be committed:
        (use "git reset HEAD ..." to unstag)

            modified: this.txt

    Untracked files:
        (use "git add ..." to include in what will be committed)

            that.txt

$ git status -s

    M  this.txt
    ?? that.txt
```

---

### diff

`git diff` affiche les modifications apportés aux fichiers depuis le dernier commit.  
Par défaut, les fichiers dans le staging area ne sont pas affichés.

<table>
<tr><th align="left">git diff                           </th><td>Affiche les modifications des fichiers</td></tr>
<tr><th align="left">git diff --staged                  </th><td>Affiche les modifications des fichiers dans le staging area</td></tr>
<tr><th align="left">git diff file.txt                  </th><td>Affiche les modifications du fichier file.txt</td></tr>
<tr><th align="left">git diff --color-words file.txt    </th><td>Affiche les modifications du fichier file.txt ligne par ligne</td></tr>
<tr><td colspan="2"></td></tr>
<tr><th align="left">git diff HEAD^^                    </th><td>Affiche les modifications depuis l'avant-dernier commit</td></tr>
<tr><th align="left">git diff HEAD^..HEAD               </th><td>Entre le dernier et l'avant-dernier commit</td></tr>
<tr><th align="left">git diff f5a6..4sdsd               </th><td>Entre les deux commits donnés</td></tr>
<tr><th align="left">git diff master cat                </th><td>Entre les branches master et cat</td></tr>
</table>

``` shell
# Dans file.txt, sur la ligne 1, "Hello World" est devenu "Hello Everybody" :

$ git diff

    --- a/file.txt
    +++ b/file.txt
    @@ -1 +1 @@
    -Hello World
    +Hello Everybody

$ git diff --color-words file.txt

    --- a/file.txt
    +++ b/file.txt
    @@ -1 +1 @@
    Hello WorldEverybody
```

Setter l'option `git config color.ui true` pour que diff affiche des couleurs

---

### commit

`git commit -m "message"` permet de commiter les fichiers du staging area.  
Le message de log doit expliquer brièvement à quoi sert le commit.

<table>
<tr><th align="left">git commit -m "about"    </th><td>Commite les fichiers dans le Staging area, avec le message de log "about"</td></tr>
<tr><th align="left">git commit -am "about"   </th><td>Raccourcis pour <code>git add .; git commit</code><br>
                                                         Rappel: ajoute les fichiers modifiés, mais pas les nouveaux ni supprimés</td></tr>
</table>

Il est également possible d'ajouter les modifications au dernier commit avec l'option `--amend`. C'est utile si l'on a oublié d'ajouter des fichiers au staging area. Cette méthode modifie le SHA et la date du commit.  
NB Pour modifier un commit plus ancien que le dernier, il faut créer un nouveau commit (et éventuellement utiliser un `rebase` pour rassembler plusieurs commits)

<table>
<tr><th align="left">git commit --amend -m "message"    </th><td>Modifie le message et/ou les fichiers du dernier commit</td></tr>
</table>

---

### update-index

Permet de modifier l'index du fichier dans git. Les modifications apportés sur l'index ne sont pas commités. Cette commande est particulièrement utile pour "geler" (freeze) le contenu de certains fichiers (que les modifications apportées au fichier soient ignorées par git), par exemple les fichiers de configuration.

<table>
<tr><th align="left">git update-index --assume-unchanged foo.rb</th><td>Gèle le fichier foo.rb</td></tr>
<tr><th align="left">git update-index --no-assume-unchanged foo.rb</th><td>Degèle le fichier foo.rb</td></tr>
</table>

---

## Maintenir

Quand ils versionnés, il est possible de récupérer les fichiers tels qu'ils étaient lors d'une ancienne version, de voir qui a fait des modifications et pourquoi.

``` shell
git log
git checkout 1ff91bf1
```

---

### log

`git log` liste tous les commits effectués, du plus récent (en haut) au plus ancien (en bas).  
Seule la première ligne du message de commit est affichées (moins de 50 caractères).

<table>
<tr><th align="left">git log                    </th><td>Affiche tous les commits</td></tr>
<tr><th align="left">git log -n 2               </th><td>Affiche les 2 derniers commits</td></tr>
<tr><th align="left">git log -- file.txt        </th><td>Les commits qui ont affectés le fichier file.txt</td></tr>
<tr><th align="left">git log --oneline          </th><td>Affiche les commits en version condensée</td></tr>
<tr><td colspan="2"></td></tr>
<tr><th align="left">git log -p                 </th><td>Affiche les commits et leurs diffs</td></tr>
<tr><th align="left">git log --stat             </th><td>Affiche les commits et leur statut (x file changed, x insertion, x deletion)</td></tr>
</table>

#### Filtres

<table>
<tr><th align="left">--since=2001-01-02              </th><td>Commité après le 02/01/2001</td></tr>
<tr><th align="left">--since=1.day.ago               </th><td>Depuis hier</td></tr>
<tr><th align="left">--since="1 year 6 months ago"   </th><td>Depuis un an et demi</td></tr>
<tr><th align="left">--until=2001-01-02              </th><td>Avant le 02/01/2001</td></tr>
<tr><td colspan="2"></td></tr>
<tr><th align="left">--author=Charlie                </th><td>Commité par Charlie</td></tr>
<tr><th align="left">--author="Alice\|Bob"           </th><td>Par Alice ou Bob</td></tr>
<tr><td colspan="2"></td></tr>
<tr><th align="left">--grep="Init"                   </th><td>Commit dont la description contient "Init", sensible à la casse</td></tr>
<tr><th align="left">-i --grep="Init"                </th><td>Dont la description contient "Init", insensible à la casse</td></tr>
</table>

<ins>Format date</ins> :

    (last|next) (second|minute|hour|day|week|month|year)
    (X (seconds|minutes|hours|days|weeks|months|years))+ ago
    (yesterday|tomorrow)
    @XXXXXXXXX (= since epoch)

`info date` pour plus de détails (Entrée pour suivre un lien, q pour quitter)

#### Formats


``` shell
$ git log

    commit bcb29516a61cbdf6c8d6eb85d12376344f693cd3
    Author: username 
    Date:   Tue Nov 29 19:52:45 2016 +0100

        2

    commit 6160e8d5ef1c2c2fb78d9af986d440d499220bbe
    Author: username
     Date:   Tue Nov 29 19:24:26 2016 +0100

        Init

$ git log --oneline

    bcb2951 2
    6160e8d Init

$ git log --pretty=format:"%h %ad - %s [%an]"

    bcb2951 Tue Nov 29 19:52:45 2016 +0100 - 2 [username]
    6160e8d Tue Nov 29 19:24:26 2016 +0100 - Init [username]

$ git log --pretty=format:"%C(white reverse blue bold)%h%Creset %s"

    # Affiche le hash en bleu foncé sur fond blanc
    bcb2951 2
    6160e8d Init

```

<ins>Instructions pretty format</ins> :

<table>
<tr><th align="left">%ad</th><td>author date</td></tr>
<tr><th align="left">%an</th><td>author name</td></tr>
<tr><th align="left">%h</th><td>SHA hash abbrégé</td></tr>
<tr><th align="left">%s</th><td>subject</td></tr>
<tr><th align="left">%d</th><td>description</td></tr>
<tr><th align="left">%C(colors)</th><td>switch color<br>
Couleurs : normal, black, red, green, yellow, blue, magenta, cyan, white<br>
Attributs : bold, dim, ul (underline), blink, reverse (swap foreground and background)</td></tr>
<tr><th align="left">%Creset</th><td>reset color</td></tr>
</table>

`git help log` pour la doc complète (`/PRETTY FORMATS` + entrée + `n`)

---

### blame

`git blame file.txt` permet d'afficher l'historique de modification du fichier file.txt, ligne par ligne, avec la date et l'auteur de la modification.
Le format de sortie est le suivant : `<hash> (<author> <date> <line>) <content>`.

<table>
<tr><th align="left">git blame file.txt                 </th><td>Affiche l'historique des modifications du fichier file.txt</td></tr>
<tr><th align="left">git blame file.txt --date short    </th><td>Affiche uniquement la date (pas l'heure)</td></tr>
</table>

``` shell
$ git blame --date short file.txt

    96776 (Gregg 2012-06-29 9) Hello

```

---

### checkout

`git checkout tree-ish` permet de récupérer les fichiers d'un commit antérieur

<table>
<tr><th align="left">git checkout v0.0.1                </th><td>Récupère les fichiers du commit taggé v0.0.1</td></tr>
<tr><th align="left">git checkout bbd70e01 -- file.txt  </th><td>Le fichier file.txt tel qu'il était au commit bbd70e01</td></tr>
<tr><th align="left">git checkout -- file.txt           </th><td>Le fichier file.txt du dernier commit (= supprime les modifications locales)</td></tr>
<tr><th align="left">git checkout mybranch              </th><td>Les fichiers de la branch mybranch</td></tr>
</table>

---

### revert

`git revert commit` permet d'inverser les modifications d'un commit.  
L'annulation est commitée tout de suite, sans possibilité de modifier.  
Si des fichiers ont été renommés ou déplacés, une technique plus avancée sera nécessaire (merge)

<table>
<tr><th align="left">git revert bbd70e01    </th><td>Annuler les modifications de la révision bbd70e01</td></tr>
</table>

---

### reflog

À chaque fois que le pointeur HEAD bouge (commit, checkout, reset, etc), une entrée est ajoutée dans le reflog. Un reflog est local à un projet et à une machine.

<table>
<tr><th align="left">git reflog</th><td>Affiche le reflog</td></tr>
</table>

``` shell
$ git reflog

    43c13e7 HEAD@{0} reset: moving to 43c1
    1e62107 HEAD@{1} commit: Add third section
```

Le reflog est utile pour connaître le SHA des commits ou branches supprimés et de pouvoir ainsi les récupérer.

``` shell
# Récupérer un commit
git reset --hard 1e62

# Récupérer une branche
git branch my_branch 280e
```

---

### clean

`git clean` permet de gérer les fichiers non versionnés

<table>
<tr><th align="left">git clean -n               </th><td>Lister tous les fichiers non versionnés (ni staging area ni commits)</td></tr>
<tr><th align="left">git clean -f               </th><td>Supprimer tous les fichiers non versionnés</td></tr>
</table>

---

### ls-tree

`git ls-tree tree-ish` liste tous les fichiers commités à un instant donné.  
Le format de sortie est le suivant: `<mode> <type> <refname> <path>` (blob = fichier, tree = répertoire)

<table>
<tr><th align="left">git ls-tree HEAD            </th><td>Liste tous les fichiers commités (à la racine)</td></tr>
<tr><th align="left">git ls-tree -r HEAD         </th><td>Liste tous les fichiers commités à la racine et dans les sous-répertoires</td></tr>
<tr><th align="left">git ls-tree HEAD^           </th><td>Liste tous les fichiers qui étaient commités lors de l'avant-dernier commit</td></tr>
<tr><th align="left">git ls-tree master assets/  </th><td>Liste tous les fichiers dans le répertoire assets/ de la branche master</td></tr>
</table>

``` shell
$ git ls-tree HEAD

    100644 blob badbc02f6c1a754631baa23fc51d58df8276b359    .gitignore
    100644 blob e01bb431533191a62ec6c2d85b439cec2e7a2cdc    _config.yml
    040000 tree 2eb76a49dd221f11c93a51d0a7a4a8eee35e1446    assets
```

---

### filter-branch

`git filter-branch` permet de supprimer des fichiers de l'historique, par exemple pour supprimer des données sensibles (mots de passe), des fichiers binaires lourds ou des fichiers qui violent un copyright.

filter-branch fait un checkout de chaque commit, exécute la commande shell donnée, et re-commit. À noter que

1. Si la commande shell échoue, il s'arrête.  
   Faire en sorte que la commande shell marche toujours, ex: `rm -f`
2. Compte tenu que l'on checkout chaque commit, le processus risque d'être très long s'il y a beaucoup de commits.  
  Pour accélerer le traitement on peut
  - filtrer sur un commit spécifique
  - ne pas executer filter-branch sur les fichiers mais sur les index de fichiers dans l'historique (option `index-filter`). Dans ce cas il n'est pas possible d'utiliser des commandes shell mais uniquement dans commandes git

<table>
<tr><th align="left">git filter-branch --tree-filter 'cmd' -- --all</th><td>Executer cmd (commande shell) sur tous les commits de la branche</td></tr>
<tr><th align="left">git filter-branch --tree-filter 'cmd' -- HEAD</th><td>Executer cmd (commande shell) sur le dernier commit</td></tr>
<tr><th align="left">git filter-branch --index-filter 'cmd'</th><td>Executer cmd (commande git) sur tous les commits</td></tr>
</table>

<ins>Exemples</ins> :

``` shell
# Supprimer le fichier password.txt dans les commits de la branche, via rm (shell)
git filter-branch --tree-filter 'rm -f password.txt' -- --all
```

``` shell
# Supprimer le fichier password.txt dans les commits de la branche, via git
git filter-branch --index-filter 'git rm --cached --ignore-unmatch passwords.txt'
```

``` shell
# Supprimer le fichier password.txt dans le dernier commit
git filter-branch --tree-filter 'rm -f password.txt' -- HEAD
```

#### prune-empty

Après des suppressions de fichier, il arrive que des commits ne contiennent plus aucune modification.  
L'option `prune-empty` permet de les supprimer.

<ins>Exemples</ins> :

``` shell
# Supprimer les commits qui ne modifient aucun fichier
git filter-branch --f --prune-empty -- --all
```

``` shell
# Supprimer le fichier password.txt et supprimer le commit s'il est vide
git filter --tree-filter 'rm -f password.txt' --prune-empty -- --all
```

---

### reset

`git reset tree-ish` permet d'annuler des modifications ajoutées au staging area et/ou aux fichiers. Pour ce faire, on déplace HEAD (pointeur qui désigne le dernier commit de la branche en cours), donc on altère l'historique.

<table>
<tr>
  <th align="left">git reset --soft&nbsp;bbd70e01</th>
  <td>Déplace HEAD à la révision bbd70e01, sans changer le staging area ni les fichiers locaux<br>
      En cas de commit, tous les commits qui suivent bbd70e01 sont supprimés - mais les modifications se retrouvent dans le nouveau commit</td>
</tr>
<tr>
  <th align="left">git reset --mixed&nbsp;bbd70e01</th>
  <td>Déplace HEAD à la révision bbd70e01, calque le staging area sur cette révision sans changer les fichiers locaux<br>
      Appliqué à HEAD, il annule l'ajout des fichiers au staging area. <br>Mixed est le comportement par défaut de reset.</td>
</tr>
<tr>
  <th align="left">git reset --hard&nbsp;bbd70e01</th>
  <td>Déplace HEAD à la révision bbd70e01, calque le staging area et les fichiers locaux dessus<br>
      ATTENTION, les modifications locales des fichiers sont définitivement perdues</td>
</tr>
</table>

Le log affiché par `git log` affiche les commits jusqu'à HEAD. Pour replacer le HEAD à un commit ultérieur après un reset (tant qu'on a pas commité les modifications), on utilise `git reflog` afin de récupérer le SHA du commit voulu et faire un reset dessus.

---

## Configurer

Git peut être configuré: retenir le nom d'utilisateur et mot de passe, créer des alias, colorer l'interface, etc. Les configurations de Git peuvent être appliquées à tous les utilisateurs, à un seul utilisateur, ou sur un projet en particulier.

Ces configurations sont enregistrées dans des fichiers, qui peuvent être édités directement avec un éditeur de texte, ou en utilisant des commandes git (qui modifient les fichiers de configuration).
Si deux fichiers définissent une même configuration, le local écrase le global.

| Portée      | Description                        | Commande (préfixe)  |   | Path Linux            | Path Windows |
|---          |---                                 |---                  |---| ---                   |---           |
| Système     | S'applique à tous les utilisateurs | git config --system |   | /etc/gitconfig        | Program Files\\Git\etc\gitconfig |
| Utilisateur | S'applique à un seul utilisateur   | git config --global |   | ~/.gitconfig          | $HOME\\.gitconfig | 
| Projet      | S'applique à un projet             | git config          |   | myproject/.git/config | myproject\\.git\\config |

---

### config

<table>
<tr><th align="left">git config --global --list      </th><td>Liste les configurations globales</td></tr>
<tr><th align="left">git config --local --list       </th><td>Liste les configurations locales</td></tr>
<tr><th align="left">git config --list               </th><td>Liste les configurations globales (en premier) et locales</td></tr>

<tr><th align="left">git config --global user.name    </th><td>Affiche la valeur de la config globale</td></tr>
<tr><th align="left">git config --local user.name    </th><td>Affiche la valeur de la config locale</td></tr>
<tr><th align="left">git config user.name            </th><td>Affiche la valeur de la config qui s'applique</td></tr>

<tr><th align="left">git config --global user.name "username"   </th><td>Met à jour la valeur de la config globale</td></tr>
<tr><th align="left">git config --global alias.olog "log --oneline"</th><td>Définit un alias "olog"</td></tr>
</table>

<ins>Quelques configs utiles</ins> :

Globales :

    user.name "username"            Nom d'utilisateur
    user.email "bob@exemple.com"    Email
    core.editor "vim"               Editeur de texte à utiliser
    color.ui true                   Colorer l'interface

Locales :

    core.autocrlf input             Changer les retours chariots CR/LF à LF au commit
    core.autocrlf true              Changer les retours chariots LF à CR/LF au checkout

    push.default matching           Pusher toutes les branches
    push.default simple             Pusher la branche en cours (comportement par défaut avec Git 2.0)

    pull.rebase true                Utiliser automatiquement rebase au pull (git pull --rebase)
    rerere.enabled true             Activer reReRe (Reuse Recorded Resolution)

<ins>Alias</ins> :

Un alias peut s'appeler comme une commande git native, par exemple `git olog`.  
Pour définir un alias :

    git config --global alias.plog "log --pretty=format:'%h %s [%an]' --graph"
    git config --global alias.lol "log --graph --decorate --pretty=oneline --abbrev-commit --all"

---

### .gitattributes

Les attributs sont des configs de conversion des retours chariot. L'intérêt des attributs est qu'ils sont communs à toute personne qui participe au projet, contrairement aux configurations qui sont locales à une machine (puisqu'elles ne sont pas commités). Les attributs sont définis dans un fichier `.gitattributes`, à la racine du projet.

<table>
<tr><th align="left">text=auto        </th><td>Choisir la conversion automatiquement (par défaut)</td></tr>
<tr><th align="left">binary           </th><td>Ne faire aucune conversion</td></tr>

<tr><th align="left">text             </th><td>Convertir au retour chariot de l'OS au checkout, convertir à LF au commit</td></tr>
<tr><th align="left">text eol=crlf    </th><td>Convertir à CR/LF au checkout, convertir à LF au commit</td></tr>
<tr><th align="left">text eol=lf      </th><td>Convertir à LF au commit</td></tr>
</table>

<ins>Exemple</ins> :

    *       text=auto
    *.html  text
    *.css   text
    *.bat   text eol=crlf
    *.sh    text eol=lf
    *.jpg   binary
    *.png   binary

---

### .gitignore

Il est également possible d'indiquer à git d'ignorer des fichiers, pour qu'il ne les affiche plus dans la liste des fichiers non versionnés.
La liste des fichiers à ignorer est placée dans un fichier `.gitignore` à la racine du projet (commun entre tous les développeurs).

Les fichiers déjà versionnés ne sont pas ignorés, même s'ils obéissent à la règle.

<ins>Exemple</ins> :

    *.log
    npm-debug.log*
    .grunt
    bower_components
    node_modules/
    .env

Sont généralement ignorés
* le code source compilé
* les packages et fichiers compressés
* les logs et bases de données
* les fichiers générés par l'OS (.DS_Store, .Trash)
* les fichiers uploadés par les utilisateurs (images, PDFs, videos)

[Listing des fichiers à ignorer selon le language / frameword / OS](https://github.com/github/gitignore)

---

### exclude

<ins>Local au projet</ins> :

Même principe que le fichier `.gitignore` mais non versionné, le fichier `.git/info/exclude` contient la liste des fichiers à ignorer (à partir de la racine du projet).

<ins>Global</ins> :

Une liste de fichiers à ignorer globale peut également être mise en place (qui se cumule au .gitignore).  
Elle doit être activé via les configs :

<table>
<tr><th align="left">git config --global core.excludesfiles ~/.gitignore_global</th><td>Définit l'emplacement du exclude global</td></tr>
</table>

---

## Utiliser un serveur distant

Utiliser un serveur distant permet de partager des fichiers versionnés avec d'autres personnes, et qui peuvent éventuellement modifier ces fichiers.
Les serveurs les plus connus sont Github et BitBucket (serveurs herbégés), Gitotis et Gitorious (serveurs auto-gérés).

Utiliser un serveur distant n'est absolument pas une obligation, le versionning peut complètement être gardé en local, dans le répertoire `.git`.

``` shell
git clone http://github.com/username/myproject.git
git pull origin master
git push -u origin master
```

---

### clone

`git clone url` permet de récupérer en local un projet situé sur un serveur distant, qui a été crée au préalable sur ce serveur.
Par défaut, seule la branche principale (généralement master) est téléchargée.

Un projet versionné peut être envoyé à différents serveurs (ex: serveur de versioning Github et serveur de production Heroku). Pour cette raison un projet peut être associé à plusieurs URL, auxquelles on donne un raccourcis nommé - ce qui permet de facilement envoyer et récupérer les modifications d’un projet distant en local3.  
Git crée automatiquement un raccourcis vers l'URL du projet lorsqu'on clone un projet, qui s'appelle "origin" par défaut (on peut le nommer autrement).  

<table>
<tr><th align="left">git clone http://github.com/username/myproject.git</th><td>Créer un répertoire myproject et télécharge le contenu du projet dedans</td></tr>
<tr><th align="left">git clone http://github.com/username/myproject.git feature</th><td>...en nommant le raccourci "feature"</td></tr>
<tr><th align="left">git clone -b 00_start http://github.com/username/myproject.git</th><td>Récupère la branche 00_start plutôt que master</td></tr>
</table>

<ins>Pour télécharger toutes les branches</ins> :

``` shell
mkdir projectname
cd projectname

git clone --mirror http://github.com/username/projectname/file.git .git
git config --bool core.bare false
git reset --hard
```

<ins>Pour supprimer le versioning</ins> du projet téléchargé (par exemple pour l'utiliser comme template) :

``` shell
rm -drf .git
```

---

### remote

`git remote` permet de gérer les raccourcis d'URL pour les projets distants.

<table>
<tr>
  <th align="left">git remote -v</th>
  <td>Liste les raccourcis d'URL connus pour le projet en cours</td>
</tr>
<tr>
  <th align="left">git remote add origin</th>
  <td>Crée un raccourcis "origin" pour l'URL "http://github.com/username/myproject.git"</td>
</tr>
<tr>
  <th align="left">git remote rm name</th>
  <td>Supprime le raccourcis "name"</td>
</tr>
</table>

---

### fetch

`git fetch` récupère les modifications du projet distant. 
Les modifications sont importées dans des branches temporaires, ce qui donne la possibilité de comparer les différences et si besoin de les importer dans la branche normale.  
Permet par exemple de vérifier si de nouvelles branches ont été ajoutées.

<table>
<tr><th align="left">git&nbsp;fetch</th><td>Récupère les modifications du dépot distant sans mettre à jour les fichiers locaux (branche temporaire)</td></tr>
<tr><th align="left">git&nbsp;fetch origin master</th><td>...de la branche master uniquement</td></tr>
</table>

<ins>Pour voir les différences</ins> entre la branche `master` temporaire et la branche locale :

``` shell
git log master..origin/master
```

<ins>Pour récupérer les modifications</ins> :

``` shell
git checkout master
git merge origin/master
```

---

### pull

`git pull` permet de récupérer les modifications du projet distant en local en une fois (`git pull = git fetch + git merge`). 
Il est déconseillé d'utiliser un pull tant qu'il y a des modifications locales non commitées.

<table>
<tr><th align="left">git&nbsp;pull</th><td>Récupère les modifications du dépot distant dans la copie locale</td></tr>
<tr><th align="left">git&nbsp;pull origin master</th><td>...de la branche master uniquement</td></tr>
<tr><th align="left">git&nbsp;pull --rebase</th><td>Récupère les modifications du dépot distant en utilisant un rebase</td></tr>
</table>

#### Résoudre un conflit

Si lors d'un `git pull`, utilisé avant `git commit`, des modifications locales entrent en conflit avec les modifications distantes (on essaie de modifier une même ligne) alors les deux versions sont gardées dans le fichier avec le format suivant :

``` txt
<<<<<<< HEAD
the cake is a lie.                  # Version locale
=======
the cake is telling the truth!      # Version distante
>>>>>>>
4e7d3542...
```

Il est nécessaire d'éditer le fichier en conflit puis de commiter pour marquer le conflit comme résolu.

``` shell
git pull
vim index.html            # Editer le conflit
git commit -am "message"  # Commiter les fichiers modifiés
```

---

### push

`git push` permet d'envoyer les modifications du projet local sur le serveur distant.

<table>
  <tr><th align="left">git push -u origin master</th><td>Envoie les modifications sur la branche master du serveur origin (et garde cet emplacement en mémoire)</td></tr>
  <tr><th align="left">git push</th><td>... au dernier emplacement enregistré <sup>(1)</sup></td></tr>
  <tr><th align="left">git push heroku-staging staging:master</th><td>... de la branche locale staging à la branche distante master du serveur heroku-staging</td></tr>
</table>

<sup>(1)</sup> Il est donc nécessaire d'utiliser `git push -u remote branch` au moins une fois

[Mettre en cache son mot de passe](https://help.github.com/articles/set-up-git)

---

### README.md

Le fichier README.md est un simple fichier Markdown situé à la racine du projet, qui est affiché par Github lorsqu'on accède au dépot distant via github.com.
Il doit contenir une courte introduction/résumé qui explique le projet.

La syntaxe utilisée est [Github Flavored Markdown](gfm.md).

---

## Utiliser des branches

Les fichiers sont commités ensemble lorsqu'ils sont fonctionnels et peuvent faire l'objet d'une nouvelle version (images, css, js, code, etc). 
Cela peut poser problème lorsqu'on travaille sur plusieurs fonctionnalités en même temps, pour retrouver quels fichiers devraient être commités ensemble. Il est également difficile de créer des "savepoints" pour revenir en arrière si nécessaire, lorsqu'on travaille sur de grosses modifications.
Utiliser des branches permet de résoudre ces problèmes.

---

### branch

Une branche est créée à partir d'une branche d'origine et contient tous les fichiers et l'historique de la branche d'origine jusqu'à ce point. Une fois créée, les fichiers et l'historique de cette nouvelle branche peuvent être modifiés de manière indépendente des autres branches.

`git branch` permet de lister les branches ou d'en créer, renommer, supprimer.  
Il existe au minimum une branche, la branche par défaut, nommée "master".

<table>
  <tr><th align="left">git branch</th><td>Liste les branches locales <sup>(1)</sup></td></tr>
  <tr><th align="left">git branch -r</th><td>Liste les branches distantes <sup>(2)</sup></td></tr>
  <tr><th align="left">git branch -a</th><td>Liste toutes les branches</td></tr>
  <tr><td colspan="2"></td></tr>
  <tr><th align="left">git branch app01</th><td>Crée branche app01 à partir de la branche en cours (sans changer la branche active)</td></tr>
  <tr><th align="left">git branch -m v1 app01</th><td>Renomme la branche v1 en app01</td></tr>
  <tr><td colspan="2"></td></tr>
  <tr><th align="left">git branch -d alternate</th><td>Supprime la branche locale app01 <sup>(3)</sup></td></tr>
  <tr><th align="left">git branch -D alternate</th><td>Supprime la branche locale app01 même s'il y a des changements non commités</td></tr>
</table>

<sup>(1)</sup> L'étoile à gauche indique la branche locale.  
&emsp; Les branches non commitées sont entourées de parenthèses

``` shell
$ git branch

    * (HEAD detached from bbd70e01)
      master
```

<sup>(2)</sup> Ne requête pas le serveur pour vérifier les branches.  
&emsp; Pour voir les nouvelles branches, il faut d'abord utiliser un `git fetch` ou `git pull`.  
&emsp; Sinon, utiliser `git remote show origin`

<sup>(3)</sup> Pour supprimer la branche distante et non la branche locale: `git push origin :app01`  
&emsp; Si on essaie d'utiliser une branche supprimée sur le serveur distant, une erreur est retournée (stale).  
&emsp; Pour supprimer en local les branches supprimées sur le serveur distant, utiliser `git remote prune origin`

---

### checkout

`git checkout` permet de changer de branche active.  
En changeant de branche active, les fichiers du répertoire sont mis à jour/ajoutés/supprimés pour refléter l'état de la branche. Il faut donc d'abord commiter ses modifications avant de changer de branche (ou utiliser le stashing).

<table>
  <tr><th align="left">git checkout app01</th><td>Passe la branche actuelle à app01 (la télécharge si elle n'est pas disponible localement)</td></tr>
  <tr><th align="left">git checkout -b admin</th><td>Crée la branche admin et se place sur cette branche</td></tr>
  <tr><th align="left">git checkout -b 02_01 origin/02_01</th><td>Télécharge la branche origin/02_01 comme 02_01 et se place sur cette brancge</td></tr>
</table>

---

### merge

`git merge mybranch` prend les changements de `mybranch` et les apporte à la branche courante.  
Crée un "merge commit" dans la branche courante.  
Elle est utilisée après un `git fetch` pour inclure les changements de la branche temporaire dans la copie locale du projet.

<table>
<tr><th align="left">git merge app01</th><td>Merge la branche app01 dans la branche courante</td></tr>
</table>

---

### rebase

`git rebase` permet d'appliquer les modifications d'une autre branche sur la branche locale. Avec `merge`, on aurait un seul commit (message du commit: "merge my_branch into master"). Avec `rebase`, on récupère la liste de commits :

1. Tous les changements dans master (branche cible) qui ne sont pas dans origin/master (branche importée) sont mis dans une zone temporaire
2. Tous les commits de origin/master sont importés
3. Tous les commits dans la zone temporaire sont importés, un par un

<table>
  <tr><th align="left">git rebase master</th><td>Apporte les commits de la branche courante à la branche master</td></tr>
  <tr><th align="left">git rebase --continue</th><td>Reprend le rebase après que le conflit ait été rectifié</td></tr>
  <tr><th align="left">git rebase --abort</th><td>Annule le rebase (en cas de conflit), revient à l'état du dépot avant la tentative de rebase</td></tr>
</table>

<ins>Importer les modifications distantes sans avoir à créer un nouveau commit</ins> :

``` shell
git fetch
git rebase

# Pour résoudre un conflit
vim index.html
git add index.html
git rebase --continue
```

<ins>Appliquer les modifications de mybranch dans master, puis supprimer mybranch</ins> :

``` shell
git checkout mybranch
git rebase master
git branch -b mybranch
git push origin :mybranch
```

### rebase -i

Un rebase interractif peut être utilisé pour modifier l'historique.  
Cela permet de nettoyer l'historique avant de l'importer dans une autre branche.  
<strong>Ne JAMAIS</strong> utiliser un rebase interractif sur une branche partagée, où d'autres personnes peuvent faire des modifications.

<table>
  <tr><th align="left">git rebase -i</th><td>Démarre un rebase interractif sur la branche en cours <sup>(1)</sup></td></tr>
</table>

<sup>(1)</sup> Affiche un éditeur pour décider ce qu'il faut faire sur les commits (du plus vieux au plus récent).

Pour envoyer les modifications d'historique au serveur distant avec un rebase, il faut utiliser `git push -f`.  
Un force oblige le dépot distant de se calquer sur le dépot local, sans essayer de faire de merge. Cette manipulation est dangereuse puisqu'elle peut effacer des commits de **l'historique** et donc supprimer de manière irrécupérable des modifications sur le dépot distant.

<ins>Changer l'ordre des lignes pour réordonner les commits</ins> :

``` txt
pick 1ee9572 Switch this one
pick 746ef3e And this one
```

<ins>Renommer le message du commit</ins> (un nouvel éditeur va s'afficher pour modifier le message) :

``` txt
reword 9afe987 The old message
```

<ins>Fractionner un commit en 2 commits ou plus</ins> :

``` txt
edit 39b23ce The message
# Save and close
```

``` shell
# Go back to that commit
git reset HEAD^

# Commit the files of the first commit
git add index.html
git commit -m "First commit"

# And then of the second
git add contact.html
git commit -m "Second commit"

# Continue the rebase
git rebase --continue
```

<ins>Rassembler plusieurs commits en un seul</ins> (un nouvel éditeur va s'afficher pour éditer le message du commit) :

``` txt
pick 6e8e5d6 First commit
squash e8005f4 Second Commit
# Will merge the second commit into the first
```

---

### cherry-pick

`git cherry-pick` permet de récupérer un ou des commits particuliers d'une autre branche dans la branche actuelle. 
Cette commande est utile pour récupérer une correction de bug par exemple.

<table>
  <tr>
    <th align="left">git cherry-pick 5321e5</th>
    <td>Récupére le commit 5321e5 dans la branche courante
      <br>5321e5 est le SHA du commit dans la branche d'origine</td>
    </tr>
  <tr><th align="left">git cherry-pick -x 5321</th><td>... ajoute le SHA du commit source au message du commit</td></tr>
  <tr><th align="left">git cherry-pick --signoff 5321</th><td>... ajoute le nom de l'utilisateur courant au message du commit</td></tr>
  <tr><th align="left">git cherry-pick --edit 5312</th><td>... ouvre un éditeur pour modifier le message du commit</td></tr>
  <tr><th align="left">git cherry-pick --no-commit 5321 55ae</th><td>Récupère les changements mais ne commite pas<br>Par exemple pour commiter 2 commits en un seul, ou faire quelques modifications</td></tr>
</table>

---

## Utiliser des tags

Un tag est une référence à un commit. Il permet de revenir à l'état du code tel qu'il était au moment où le tag a été crée. On les utilise principalement pour créer des releases, autrement dit pour marquer chaque mise en production d'un numéro de version.  
Une bonne pratique est de respecter la convention des [versions sémantiques](semver.md): v[majeur].[mineur].[patch]

Il existe 3 types de tags
- Lightweight: juste un tag, sans message ni auteur
- Signé: utilise une clé publique pour prouver l'identité de l'auteur
- Annoté: ajoute l'auteur et une description au tag

### tag

<table>
  <tr><th align="left">git tag</th><td>Liste tous les tags</td></tr>
  <tr><th align="left">git checkout v0.0.1</th><td>Récupère le commit du tag v0.0.1</td></tr>
  <tr><th align="left">git tag -a v0.0.3 -m "version 0.0.3"</th><td>Crée un tag annoté<br>Si -m est omis, un éditeur va s'ouvrir pour éditer le message</td></tr>
  <tr><th align="left">git push --tags</th><td>Envoie les tags au dépot distant</td></tr>
</table>

``` shell
git tag -a v0.0.3 -m "Version 0.0.3" 
git push --tags
```

### Branche vs tag

On peut utiliser les branches pour créer des releases, sur le même principe qu'un tag. La différence qui les sépare est qu'un tag désigne un commit spécifique tandis qu'une branche peut être mise à jour avec de nouveaux commits (pour rectifier des bugs par exemple). En général, on nomme les branches de release r[majeur].[mineur].[patch]

Il n'est pas nécessaire de créer une branche si la version crée n'a pas de support long-terme.  
Un autre possibilité en cas de bug est de créer une branche temporaire pour patcher le tag :

``` shell
git checkout v1.1
git checkout -b rb1.1
# hotfix
git -m "Hotfix"
git tag v1.1.1 -m "Hotfix"
git checkout master
git merge rb1.1 -m "Merged hotfix"
git branch -d rb1.1
```

---

## Stashing

Le stash est un cache temporaire où l'on peut placer ses modifications. 
Les modifications sont supprimées du dépot local et peuvent être restaurées ultérieurement. 
Cela permet de changer de branche quand bien même les modifications ne sont pas prêtes à être commitées.

Tous les fichiers sont placés dans le stash, qu'ils soient dans le staging area ou non, mais par défaut, les nouveaux fichiers fichiers ne sont pas sauvegardés.

Plusieurs caches peuvent être utilisés.

### stash

<table>
  <tr><th align="left">git stash</th><td>Sauvegarde les modifications en cache et restaure le dernier commit</td></tr>
  <tr><th align="left">git stash save</th><td>Idem</td></tr>
  <tr><th align="left">git stash save "Le message" </th><td>Sauvegarde avec un message</td></tr>
  <tr><th align="left">git stash save --keep-index</th><td>Ne sauvegarde pas les fichiers dans le staging area</td></tr>
  <tr><th align="left">git stash save --include-untracked</th><td>Sauvegarde aussi les nouveaux fichiers</td></tr>

  <tr><td colspan="2"></td></tr>

  <tr><th align="left">git stash list</th><td>Liste les caches</td></tr>
  <tr><th align="left">git stash list --start</th><td>Liste les caches et leurs modifications</td></tr>
  <tr><th align="left">git stash show</th><td>Liste les modifications du dernier cache</td></tr>
  <tr><th align="left">git stash show stash@{0}</th><td>Idem</td></tr>

  <tr><td colspan="2"></td></tr>

  <tr><th align="left">git stash apply</th><td>Restaure le dernier cache</td></tr>
  <tr><th align="left">git stash apply stash@{0}</th><td>Idem</td></tr>
  <tr><th align="left">git stash apply stash@{1}</th><td>Restaure stash1</td></tr>
  <tr><th align="left">git stash drop</th><td>Supprime le dernier cache <sup>(1)</sup></td></tr>
  <tr><th align="left">git stash drop stash@{1}</th><td>Supprime stash1</td></tr>
  <tr><th align="left">git stash pop</th><td>Restaure le dernier cache et le supprime <sup>(2)</sup></td></tr>
  <tr><th align="left">git stash branch mybranch stash@{0}</th><td>Crée une nouvelle branche et supprime le cache <sup>(3)</sup></td></tr>
  <tr><th align="left">git stash clear</th><td>Supprime tous les caches</td></tr>
</table>

<sup>(1)</sup> Après avoir restauré le cache avec `apply`, le cache n'est pas supprimé - il faut donc le faire manuellement  
<sup>(2)</sup> Raccourcis de `git stash apply; git stash drop`. En cas de conflit, il faudra supprimer le cache manuellement  
<sup>(3)</sup> Il est ensuite nécessaire de commiter (`git commit -am "Add my_branch"`)

``` shell
$ git stash list

    stash@{0}: WIP on master: 686b55d Add wolves.
    stash@{1}: WIP on gerbils: b2bdead Add dogs.
```

WIP est l'abbréviation de Work In Progress.

---

## Sous-modules

Les sous-modules sont des dépots à l'intérieur du dépot, utilisé principalement pour les librairies.  
Cela permet
- de récupérer les mises à jour facilement
- de partager les modifications sur la librairie
- de tester la librairie avec un véritable projet
- d'avoir un historique de commits pour le sous-module qui est indepéndent du dépot parent

### submodule

<table>
  <tr><th align="left">git submodule add git@example.com:css.git</th><td>Ajoute un sous-module au dépot courant</td></tr>
  <tr><th align="left">git submodule init</th><td>Récupère le contenu du sous-module</td></tr>
  <tr><th align="left">git submodule update</th><td>Récupère les modifications du sous-module <sup>(1)</sup></td></tr>
  <tr><th align="left">git push --recurse-submodules=on-demand</th><td>Push les commits du parent ainsi que des sous-modules si nécessaire <sup>(2)</sup></td></tr>
  <tr><th align="left">git push --recurse-submodules=check</th><td>Push les commits du parent sauf si des sous-modules n'ont pas été pushés</td></tr>
</table>

<sup>(1)</sup> Une erreur "fatal : reference is not a tree" est levée si le parent a des modifications du sous-module non pushées  
<sup>(2)</sup> Pour créer un alias `git pushall` : `git config alias.pushall "push --recurse-submodules=on-demand"`

<ins>Ajouter un sous-module</ins> :

``` shell
git submodule add git@example.com:css.git
git commit -m "Add my submodule"
git push
```

<ins>Modifier un sous-module</ins> :

Un sous-module ne commence sur aucune branche en particulier, il est donc nécessaire de faire un checkout en premier

``` shell
cd css
git checkout master

# Commite les modifications du sous-module
git commit -am "Init submodule"
git push

# Commite le parent
cd ..
git add css
git commit -m "Update submodule"
git push
```

En cas d'oubli de checkout sur une branche :

``` shell
git checkout master
git merge b6bb78f
git push
# Puis commiter le parent
```

### .gitmodules

Fichiers de configurations des sous-modules

---

Ressources :
- https://www.grafikart.fr/formations/git
- https://www.atlassian.com/git/tutorials
- [Git-extras](https://github.com/tj/git-extras) permet d'ajouter des nouvelles fonctionnaliltés à Git

Pour aller plus loin : [Github](github.md)
