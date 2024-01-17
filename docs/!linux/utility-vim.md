---
title: Vim
category: Linux
---

Vim est un éditeur de texte avancé accessible dans la console.
Il supporte toutes les fonctionnalités de vi et en ajoute de nouvelles, d'où le nom vim, acronyme de "Vi iMproved".

La commande <code>vimtutor</code> permet d'apprendre les principales commandes vim.  
Ne sont décrites ici que les fonctionnalités principales de Vim, pour aller plus loin :
- [Cours Vim (videos)](http://vimcasts.org/episodes/archive/)
- [Wiki de shinokada](https://github.com/shinokada/vimnotes/wiki)
- [Documentation](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html)
- [Ressources pour apprendre Vim](https://medium.freecodecamp.org/vim-isnt-that-scary-here-are-5-free-resources-you-can-use-to-learn-it-ab78f5726f8d)

---

## Ouvrir et fermer vim

Lorsqu'on ouvre un fichier qui n'existe pas, celui-ci est crée au moment de la sauvegarde.

    vim file           Ouvrir le fichier file
    vim file file 2    Ouvrir les fichiers file et file2 (cf multiples fichiers)

Contrairement aux éditeurs de texte traditionnels, Vim dispose de différents *modes* :  
le mode commande et le mode édition.
- En **mode commande**, les touches du clavier n'écrivent pas du texte mais effectuent des actions.  
  Par exemple `x` supprime le caractère sous le curseur.  

  Lorsqu'on est en mode commande, presser ":" permet de taper des **commandes EX**, qui sont executées sur Entrée.  
  Par exemple `:q` (+ entrée) ferme Vim

- En **mode édition**, les touches du clavier frappées écrivent du texte dans le fichier

_Info culture générale_ : EX était un éditeur de texte Unix qui existait avant Vi.  
Le mode commande est le mode par défaut lorsqu'on ouvre Vim

    :q                 Quitter Vim
    :w                 Enregistrer les modifications du fichier
    :wq                Entregistrer et quitter
    :q!                Quitter sans enregistrer

<!-- -->

    :w file2           Enregistrer sous file2
    :e!                Rafraîchir le contenu à partir de la dernière sauvegarde (abandonner les modifications)
    :vi file2          Quitter le fichier en cours et ouvrir file2 (refuse si des modifications sont non sauvegardées)

---

## Aide

    :help              Afficher l'aide de Vim
                       :q pour quitter l'aide

    :help j            Afficher l'aide de Vim pour la commande j

## Autocomplete

La tabulation déclanche l'autocomplete pour les commandes EX.
Presser successivement tab pour afficher d'autres propositions.

<pre>
:hel <kbd>tab</kbd>          Autocompleter la commande qui commence par "hel"

:hel <kbd>Ctrl</kbd> d       Afficher la liste d'autocompletes disponibles pour "hel"
</pre>

## Position

<pre>
<kbd>Ctrl</kbd> g            Afficher la position courante : "filename" x lignes --y %-- (i of n)
:=                 Afficher le nombre de lignes du fichier
:.=                Afficher le numéro de ligne courant
</pre>

---

## Éditer du texte

En mode commande, presser `i` passe Vim en mode édition.  
En mode édition, presser `Esc` passe Vim en mode commande.  
Presser `Esc`-`Esc` permet de sortir d'une commande EX sans l'executer.

Vim affiche un rectangle blanc à l'endroit où est situé le curseur. Le texte est toujours inséré à gauche du curseur.  
`i` se contente de passer en mode édition mais il existe des commandes qui permettent de déplacer le curseur avant de passer en mode édition (pour ajouter du texte à la fin de la ligne en cours par exemple).

    i                  À l'endroit du curseur
    I                  Au début de la ligne (au premier caractère qui n'est pas un espace)
    
    a                  Après le curseur (un déplacement à droite)
    A                  À la fin de la ligne

    o                  Sur une nouvelle ligne en-dessous
    O                  Sur une nouvelle ligne au-dessus

<!-- -->

    R                  Remplacement à l'endroit du cursuer (comme "i" mais les caractères tapés remplacent les caractères existants)

---

## Annuler / répéter

<pre>
.                  Répéter la dernière commande effectuée
u                  Annuler la dernière commande effectuée
U                  Annuler toutes les modifications sur la ligne en cours
<kbd>Ctrl</kbd> r            Refaire (annuler l'action d'annuler)
@:                 Répéter la dernière commande EX effectuée
</pre>

---

## Préférences

Quelques commandes EX pour changer les options :

    :set nu            Afficher le numéro des lignes
    :set nonu          Ne pas afficher le numéro des lignes

    :set ic            Rendre la recherche insensible à la casse
    :set noic          Rendre la recherche sensible à la casse

    :set ai            Activer l'auto-indentation
    :set noai          Désactiver l'auto-indentation

Le fichier `~/.exrc` est automatiquement exécuté à l'ouverture de Vi.
Il peut contenir des commandes EX et ainsi définir des options à activer par défaut (ne pas précéder les commandes de ":").

---

## Déplacements

Lorsqu'on accède à Vim via une console et non un terminal, les flèches directionnelles ne sont pas disponibles.
Il est donc conseillé d'apprendre les déplacements tels que supportés par Vim (hjkl) plutôt que les déplacements gérés par l'interface graphique.

_Info culture générale_ :
Une console est un écran noir en attente d'instruction.
Un terminal est l'émulation d'une console dans une interface graphique - une console dans une petite fenêtre.

### Gauche, droite, haut, bas

    h                  Un caractère à gauche
    j                  Un caractère à droite
    k                  Une ligne en haut, en conservant la position verticale
    j                  Une ligne en bas, en conservant la position horizontale

<!-- -->

    (space)            Un caractère à droite
    (back)             Un caractère à gauche
    (enter)            Une ligne en bas, au début de la ligne (!= espace)
    -                  Une ligne en haut, au début de la ligne (!= espace)

### Mot par mot

Un mot est un ensemble de lettres, chiffres ou underscore.  
Par exemple dans "copy.right", il y a 3 mots : "copy", "." et "right"

    w                  Au début du prochain mot (word)
    b                  Au début du mot précédent (back)
    e                  À la fin du prochain mot (end)

Est désigné comme "groupe de lettres" tout caractère différent de espace.  
Par exemple dans "copy.right", il n'y qu'un groupe de lettres : "copy.right"

    W                  Au début du prochain groupe de lettres
    B                  Au début de groupe de lettres précédent
    E                  À la fin du prochain groupe de lettres

### Sur la ligne

    0                  Au début de la ligne en cours
    ^                  Au début de la ligne en cours (!= espace)
    $                  À la fin de la ligne
    g_                 À la fin de la ligne (!= espace)

### Dans le fichier

    G                  À la fin du fichier
    1G                 Au début du fichier
    2G                 À la 2ème ligne du fichier

    :$                 À la fin du fichier
    :1                 Au début du fichier
    :2                 À la 2ème ligne du fichier

### Relatif à la fenêtre

    H                  En haut de la fenêtre en cours
    M                  Au milieu de la fenêtre en cours
    L                  En bas de la fenêtre en cours

### Par phrase

Les phrases sont délimitées par un point suivit d'un espace.  
Par exemple "phrase1. phrase2" contient deux phrases : "phrase1" et "phrase2".  
Une ligne vide est une phrase à elle seule.

    )                  Au début de la prochaine phrase
    (                  Au début de la phrase précédente 

### Par paragraphe

Les paragraphes sont délimités par une ligne vide (une ligne qui ne contient rien, pas même un espace ou tabulation).

    }                  À la prochaine ligne vide
    {                  À a ligne vide précédente

### Par block

Parenthèses, accolades ou crochets

    %                  Boucle entre la parenthèse ouvrante et la parenthèse fermante

---

## Répétition

Toutes les commandes Vi (et non EX) acceptent la répétition :
- `3l` = déplacer le curseur de 3 caractères à droite
- `5j` = déplacer le curseur de 5 lignes en-dessous
- `3i` = passer en mode édition, répéter le texte inséré 3 fois lorsqu'on repasse en mode commande
- `15o Ma ligne (esc)` : insère 15 lignes contenant "Ma ligne"
- etc

---

## Copier / coller

La presse-papier est privé à chaque instance de Vi : il est possible de copier/coller à l'intérieur d'un fichier ouvert ou 
entre les différents onglets ouverts mais pas en dehors de Vi.

### Copier

    v 3j               Sélectionner 3 lignes (marche avec n'importe quel déplacement)
    y                  Copier la sélection

<!-- -->

    y )                Copier la phrase en cours (marche avec n'importe quel déplacement)

<!-- -->

    yy                 Copier la ligne en cours

### Coller

    p                  Coller le contenu du presse-papier après le curseur
    P                  Coller le contenu du presse-papier avant le curseur

### Couper

    x                  Supprime le caractère courant
    s                  Supprime le caractère courant puis passe en mode édition

<!-- -->

    d^                 Supprime tout du curseur au début de la ligne (marche avec n'importe quel déplacement)
    c(                 Supprime tout du curseur à la fin de la phrase puis passe en mode édition (marche avec n'importe quel déplacement)

    dd                 Supprime la ligne en cours
    cc                 Supprime la ligne en cours puis passe en mode édition

    D                  Supprime tout du curseur à la fin de la ligne en cours
    C                  Supprime tout du curseur à la fin de la ligne en cours puis passe en mode édition

NB `xp` = transposer deux lettres (supprimer et coller)

---

## Formatter 

    ra                 Remplace le caractère sous le curseur par "a" (ni'mporte quel caractère)
    ~                  Change la casse du caractère courant et déplace le curseur à droite
    J                  Remplace le retour à la ligne en fin de ligne par un espace (join)

## Indenter

    3>                 Indenter 3 lignes (n'importe quelle répétition)
    >{                 Indenter le paragraphe (n'importe quel déplacement)

    >>                 Indenter la ligne en cours
    <<                 Désindenter la ligne en cours

---

## Filtres

Les filtres permettent de cibler des lignes et sont utilisés avec les diverses commandes Vi.  
Par exemple `:2d` (+ entrée) supprime la 2ème ligne du fichier, `:10,$d` supprime de la 10ème à la dernière ligne.  
Seuls, les filtres n'ont aucune action, si ce n'est que de déplacer le curseur au début de la sélection.

    :2                  Sur la ligne 2
    :.                  Sur la ligne en cours
    :$                  Sur la dernière ligne
    :%                  Sur toutes les lignes
    :/word/             Sur la prochaine ligne contenant /word/ (POSIX BRE)
    :'a                 Sur la ligne marquée avec le bookmark "a"

On peut aussi filtrer de...à :

    :10,$               De la ligne 10 à la fin du fichier

Par exemple `:.,$>` indente de la ligne en cours à la fin du fichier

---

## Executer des commandes Shell

Vim peut executer toutes les commandes Shell sur les lignes du fichier.

    !}cmd                      Executer cmd sur le paragraphe en cours (n'importe quel déplacement)
    !!cmd                      Executer cmd sur la ligne en cours

Quelques exemples :

    !!tr a-z A-Z               Sur la ligne en cours, mettre toutes les lettres en majuscules
    :%!grep '.'                Dans tout le fichier, supprimer les lignes vides (= filtrer sur les lignes qui contiennent au moins un caractère)
    6!sed 's/ /-/g'            Sur la ligne 6, remplacer tous les espaces par des tirets
    !}awk '{print "- " $0}'    Dans le paragraphe en cours, préfixer toutes les lignes d'un tiret
    :%!uniq                    Supprimer les lignes dupliquées

## Insérer un fichier ou le résultat d'une commande

    :r file                    Insérer le contenu du fichier file à la position du curseur
    :r!date                    Insérer le résultat de la commande date à la position du curseur (marche avec toutes les commandes shell)

## Trier

    :sort                      Trier les lignes du fichier, par ordre croissant
    :sort!                     Trier les lignes du fichier, par ordre décroissant

    :sort n                    Trier les lignes du fichier, en triant sur les nombres en début de ligne (-8 < 1 < - 8 < 9 < 10)
    :sort /[0-9]*/             Trier les lignes du fichier, en ignorant les nombres en début de ligne (2A < 1B)
    :sort /[0-9]/r             Trier les lignes du fichier, en triant sur le premier chiffre en début de ligne (1 < 10 < -8 < - 8 < 9)

---

## Bookmark

Un bookmark permet de marquer une ligne du fichier, ce qui permet d'y retourner facilement.

    ma                 Crée un bookmark "a" sur la ligne courante (n'importe quelle lettre peut être utilisée)
    'a                 Aller à la ligne avec le bookmark "a"
    :marks             Lister les bookmarks

---

## Rechercher

    *                  Rechercher la prochaine occurence du mot sous le curseur
    #                  Rechercher l'occurence précédente du mot sous le curseur

<!-- -->

    /text              Rechercher la prochaine occurence de /text/ (POSIX BRE)
    ?text              Rechercher l'occurence précédente de /text/

<!-- -->

    n                  Rechercher la prochaine occurence de la dernière recherche
    N                  Rechercher l'occurence précédente de la dernière recherche

## Remplacer

    :s/old/new/        Sur la ligne en cours, remplacer la 1ère occurence de /old/ par "new" (POSIX BRE)
    :%s/old/new/       Sur chaque ligne du fichier, remplacer la 1ère occurence de /old/ par "new"
    :2s/old/new/       Sur la ligne 2, remplacer la 1ère occurence de /old/ par "new"

    :s/old/new/g       Sur la ligne en cours, remplacer toutes les occurences de /old/ par "new"
    :%s/old/new/g      Sur chaque ligne du fichier, remplacer toutes les occurences de /old/ par "new"

---

## Scroll

Le scroll ne déplace pas le curseur mais la position de la fenêtre (les lignes visibles), sauf lorsque le curseur sort de la fenêtre

<pre>
<kbd>Ctrl</kbd> e            Une ligne vers le bas (expose)
<kbd>Ctrl</kbd> y            Une ligne vers le haut

<kbd>Ctrl</kbd> d            Une demi-fenêtre vers le bas (down)
<kbd>Ctrl</kbd> u            Une demi-fenêtre vers le haut (up)

<kbd>Ctrl</kbd> f            Une fenêtre vers le bas (forward)
<kbd>Ctrl</kbd> b            Une fenêtre vers le haut (back)
</pre>


    z.                 Mettre la ligne sélectionnée au centre de la fenêtre
    zt                 En haut de la fenêtre
    zb                 En bas de la fenêtre

---

## Multiples fichiers

### Arglist

Pour rappel, Vim peut être ouvert avec une liste de fichier : `vim file file2`. Au début, seul le premier fichier est affiché à l'écran.

    :args              Affiche la liste de fichiers
    :args file3 file4  Redéfinit la liste de fichiers

Avant de changer de fichier en cours, il est nécessaire d'enregistrer les modifications apportées au fichier.
On peut enregistrer les modifications avant de changer d'onglet avec `w` et abandonner les modifications avec `!`.  
Par exemple avec la commande `:n` : `:wn` et `:n!`.

    :n                 Éditer le prochain fichier de la liste
    :N                 Éditer le fichier précédent dans la liste
    :last              Éditer le dernier fichier de la liste
    :first             Éditer le premier fichier de la liste
    :rew               Idem (rewind)

<!-- -->

    :n!                Abandonner les modifications et éditer le prochain fichier
    :wn                Sauvegarder les modifications et éditer le prochain fichier

L'interêt de la liste de fichier tient du fait que Vim peut appliquer des commandes sur l'ensemble des fichiers dans la liste.

    :argdo!cmd         Executer cmd sur tous les fichiers de la liste

Par exemple :

    :argdo!:s/\t/  /g  Remplacer les tabulations par 2 espaces dans tous les fichiers
                       Affiche une erreur est affichée pour les fichiers où aucune action n'est effectuée

    :argdo edit!       Annuler les modifications
                       = Recharger tous les fichiers à partir de leur dernière sauvegardé

    :argdo update      Sauvegarder tous les fichiers

### Buffers

La liste de fichiers (arglist) existait déjà sous Vi. La liste de buffers est une fonctionnalité ajoutée par Vim.  
Tous les fichiers dans la liste de fichiers sont également présents dans la liste de buffers (à moins de les avoir supprimé avec `bd`).
Les fichiers ajoutés à la liste de buffers ne sont pas présents dans la liste de fichiers.

Un buffer est une copie en mémoire d'un fichier. Il ne contient pas seulement le contenu du fichier mais aussi les bookmarks et préférences.
Il est possible de garder un buffer en mémoire tout en éditant un autre fichier (sans avoir à sauvegarder ou abandonner les modifications), c'est ce qu'on appelle un *buffer caché* (*hidden buffer* en anglais).

    :ls                Affiche la liste de buffer
    :buffers           Idem

<!-- -->

    :e file3           Ajouter file3 à la liste de buffers

    :bd                Fermer le buffer en cours
    :bd 2              Fermer le buffer 2

Par défaut, refuse de changer de buffer tant que le buffer en cours n'est pas sauvegardé.
On peut enregistrer les modifications avec `w` et on peut **garder les modifications en mémoire** avec `!` (créer un buffer caché).
Attention, si un des buffer a des modifications non sauvegardées, une erreur est levée au moment de quitter Vim.
Par exemple avec la commande `:bn` : `:wbn` et `bn!`

    :bn                Aller au buffer suivant
    :bN                Aller au buffer précédent (ou :bp)
    :b#                Retourner au buffer précédemment ouvert
    :b2                Aller au 2ème buffer
    :b file            Aller au buffer du fichier file

<!-- -->

    :bn!               Garder les modifications en mémoire (buffer caché) et passer au buffer suivant
    :wbn               Sauvegarder les modifications et passer au buffer suivant

De la même manière que pour arglist, Vim peut executer des commandes sur tous les buffers.

    :bufdo!cmd         Executer cmd sur tous les buffers

### Fenêtres

Dans Vim, il est possible d'afficher plusieurs buffers à la fois en les chargeant dans plusieurs fenêtres.
De nouvelles fenêtres peuvent être crées en divisant une fenêtre horizontalement ou verticalement.  
[Voir une démonstration (en anglais)](http://vimcasts.org/episodes/working-with-windows/).

    :sp file2          Diviser horizontalement la fenêtre en cours
                       : file2 en haut, la fenêtre qui était en cours en bas

    :vsp file2         Diviser verticalement la fenêtre en cours
                       : file2 à gauche, la fenêtre qui était en cours à droite

<!-- -->

    :q                 Fermer la fenêtre en cours
    :only              Fermer toutes les fenêtres sauf celle en cours
    :qall              Fermer toutes les fenêtres

<!-- -->

<pre>
<kbd>Ctrl</kbd> ww           Aller à la fenêtre suivante
<kbd>Ctrl</kbd> wl           Aller à la fenêtre à droite (marche avec hjkl)
</pre>

<pre>
<kbd>Ctrl</kbd> w+           Augmenter la taille de la fenêtre
<kbd>Ctrl</kbd> w-           Réduire la taille de la fenêtre
<kbd>Ctrl</kbd> w=           Remmettre la taille de la fenêtre à sa taille initiale

<kbd>Ctrl</kbd> w_           Maximise verticalement la fenêtre en cours
<kbd>Ctrl</kbd> w|           Maximise horizontalement la fenêtre en cours
</pre>

<pre>
<kbd>Ctrl</kbd> wx           Échanger la fenêtre en cours avec sa voisine
<kbd>Ctrl</kbd> wL           Metttre la fenêtre en cours à droite (marche avec HJKL)

<kbd>Ctrl</kbd> wr           Reorganiser les fenêtres : la dernière devient la première
<kbd>Ctrl</kbd> wR           Reorganiser dans l'autre sens : la première devient la dernière
</pre>

### Onglets

Les onglets sont disponibles depuis Vim 7.  
[Voir une démonstration (en anglais)](http://vimcasts.org/episodes/working-with-tabs/).

<pre>
:tabnew file2      Ouvrir file2 dans un nouvel onglet
<kbd>Ctrl</kbd> wT           Déplacer la fenêtre en cours dans un nouvel onglet
</pre>

    :tabclose          Fermer l'onglet en cours
    :tabonly           Fermer tous les onglets sauf l'onglet en cours

<!-- -->

     :tabn             Aller à l'onglet suivant
     :tabp             Aller à l'onglet précédent
     
     gt                Aller à l'onglet suivant
     gT                Aller à l'onglet précédent
     2gt               Aller au 2ème onglet

<!-- -->

    :tabmomve          Déplacer l'onglet en cours à la fin
    :tabmove 0         Déplacer l'onglet en cours au début

<!-- -->

    :tabdo cmd         Executer cmd sur tous les onglets ouverts
