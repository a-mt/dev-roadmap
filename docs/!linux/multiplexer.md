---
title: Multiplexeurs
category: Linux, Applications
---

* Un multiplexeur de terminal permet de diviser le terminal en plusieurs écrans (appelées *régions* ou *focus*) pour afficher les informations de différents terminaux et interagir avec. Les multiplexeurs de terminal les plus courants sont GNU Screen et tmux. Ils ne sont généralement pas installés par défaut.

## GNU Screen

### Démarrer

* `screen` permet de lancer GNU screen.  
  Au lancement, un ou deux écrans d'informations s'affichent. Appuyer sur Entrée pour passer ces écrans  
  Ensuite, tout apparaît comme si on était revenu à la ligne de commande, mais on a un écran GNU qui occupe toute la fenêtre.

  ![](https://i.imgur.com/RtHSSFA.png)

* `screen ls` permet de lister les régions en cours d'execution

  ```
  $ screen ls
  ```

  On peut également utiliser <kbd>Ctrl</kbd>+<kbd>a</kbd> pour afficher le numéro de la région GNU en cours (affiché en bas)

  ![](https://i.imgur.com/spERNxu.png)

### Diviser la fenêtre

* Pour diviser la région en cours en deux panels horizontaux: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>Shift</kbd>+<kbd>s</kbd> (*split*)  
  Une nouvelle région est crée dans la moitié inférieure, mais n'a pas directement le focus (et n'a pas de terminal démarré non plus, c'est juste une région vide)

* Pour changer le focus à la région suivante: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>Tab</kbd>  
  Le focus est maintenant dans la région inférieure

  ![](https://i.imgur.com/zi1EeqU.png)

* Pour démarrer un terminal dans la région: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>c</kbd>  
  On a maintenant une invite de commande

* Pour diviser la région en cours en deux panels verticaux: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>Shift</kbd>+<kbd>l</kbd> (*split left*)  
  Ctrl+a et Tab pour changer le focus  
  Ctrl+c et c pour démarrer un terminal

  ![](https://i.imgur.com/zcOqk9t.png)

### Nommer les régions

* Le nom par défaut des régions est son numéro suivit de "bash" (0 bash, 1 bash, etc).  
  On peut renommer la région avec <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>Shift</kbd>+<kbd>a</kbd> puis taper le nouveau nom

  ![](https://i.imgur.com/jF4V2xH.png)
  ![](https://i.imgur.com/NTlvyo2.png)

### Stopper un écran

* Pour arrêter l'écran en cours: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>k</kbd> (*kill*) — répondre yes  
  Notons que la région est toujours là mais n'a plus de terminal

* Pour arrêter tous les terminaux et leurs régions: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>\\</kbd> — répondre yes

---

## Tmux

* Tmux (*terminal multiplexer*) est un autre multiplexeur de terminal, plus récent et plus facile à utiliser que GNU screen. Là où les raccourcis clavier de GNU screen commençent par Ctrl+a, les raccourcis tmux commençent par Ctrl+b (pour *binding*, liaison)

### Démarrer

* `tmux new` permet de démarrer Tmux  
  On peut voir que tmux est en route: le nom de l'application est indiqué en bas de l'écran

  ```
  tmux new
  ```

  ![](https://i.imgur.com/anJQf8o.png)

* Pour obtenir plus d'informations sur l'écran en cours:

  ```
  tmux ls
  ```

  ![](https://i.imgur.com/OJXem84.png)

* Une *session* est un ensemble de fenêtres  
  Il est possible de partager une session entre différents utilisateurs

  Une fenêtre (*window*) est un écran unique couvert de panneaux  
  On peut considérer les différentes fenêtres un peu comme différents onglets dans la session en cours

  Un panneau (*pane* ou *panel*) est une section de l'écran qui exécute une commande spécifique, par exemple un shell  
  On peut considérer un panel comme un widget dans la fenêtre en cours

* <kbd>Ctrl</kbd>+<kbd>b</kbd> et ? permet d'afficher la liste des raccourcis clavier (échap pour quitter)
  On peut voir que les raccourcis clavier sont en réalité associés à des commandes tmux

  ![](https://i.imgur.com/Anjh7S3.png)

* <kbd>Ctrl</kbd>+<kbd>b</kbd> et : permet d'entrer en mode commande pour lancer une commande tmux.  
  Par exemple pour diviser le panel en cours horizontalement:

  ```
  Ctrl+b : split-window -h
  ```

* La préfixe par défaut est <kbd>Ctrl</kbd>+<kbd>b</kbd> mais il est possible de changer les configurations de tmux dans `~/.tmux.conf`. Par exemple, pour définir <kbd>Ctrl</kbd>+<kbd>a</kbd> à la place:

  ```
  # remap prefix to Control + a
  set -g prefix C-a
  # bind 'C-a C-a' to type 'C-a'
  bind C-a send-prefix
  unbind C-b
  ```

### Panels

<pre>
<kbd>Ctrl</kbd>+<kbd>b</kbd> %   Diviser le panel en cours horizontalement
                                 Le nouvel panel a directement le focus et un terminal est démarré.
<kbd>Ctrl</kbd>+<kbd>b</kbd> "   Diviser le panel en cours verticalement

<kbd>Ctrl</kbd>+<kbd>b</kbd> o   Aller au prochain panel (cyclique)
<kbd>Ctrl</kbd>+<kbd>b</kbd> ←   Aller au panel à gauche
<kbd>Ctrl</kbd>+<kbd>b</kbd> →   Aller au panel à droite
<kbd>Ctrl</kbd>+<kbd>b</kbd> ↑   Aller au panel en haut
<kbd>Ctrl</kbd>+<kbd>b</kbd> ↓   Aller au panel en bas
<kbd>Ctrl</kbd>+<kbd>b</kbd> ;   Retourner au panel précédemment utilisé
<kbd>Ctrl</kbd>+<kbd>b</kbd> q   Afficher le numéro des pannels quelques secondes
                                 Quand le numéro est affiché, on peut taper le numéro pour aller au panel

<kbd>Ctrl</kbd>+<kbd>b</kbd> t   Afficher une horloge à la place du panel
                                 Permet d'éviter la pollution visuelle, ou de protéger un processus des regards indiscrets.  
                                 Appuyer sur n'importe quelle touche pour réafficher le panel
<kbd>Ctrl</kbd>+<kbd>b</kbd> !   Ouvrir le panel en cours dans une nouvelle fenêtre

<kbd>Ctrl</kbd>+<kbd>b</kbd> x   Fermer le panel en cours
exit
</pre>

### Stoppper

* Pour arrêter le panel en cours: `exit` ou <kbd>Ctrl</kbd>+<kbd>b</kbd> et <kbd>x</kbd>

* Pour arrêter la fenêtre en cours: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>&</kbd> — répondre y

  ![](https://i.imgur.com/cd52WkH.png)

### Session

<pre>
tmux new -s backup               Créer une session nommée

<kbd>Ctrl</kbd>+<kbd>b</kbd> d   Détacher la session
                                 Retourne au shell, en dehors de tmux.
                                 Si on se déconnecte du shell, les processus ne reçoivent pas de SIGHUP et continuent de tourner: en se reconnectant, on peut reprendre la session, les processus auront continués de tourner

tmux list-sessions               Lister les sessions tmux
tmux ls

tmux attach -t backup            Se réattacher à la session backup
tmux a -t backup

<kbd>Ctrl</kbd>+<kbd>b</kbd> $   Renommer la session
                                 Si le nom est supérieur à 8 caractères, il sera coupé

<kbd>Ctrl</kbd>+<kbd>b</kbd> s   Lister les sessions
                                 Permet de changer de session avec les flèches et entrée
<kbd>Ctrl</kbd>+<kbd>b</kbd> )   Aller à la session suivante
<kbd>Ctrl</kbd>+<kbd>b</kbd> (   Aller à la session précédente
<kbd>Ctrl</kbd>+<kbd>b</kbd> L   Retourner à la session précédemment utilisée

tmux kill-session -t backup      Terminer la session backup
</pre>

* On peut utiliser une session pour partager un même écran entre plusieurs développeurs.  
  Deux développeurs connectés avec le même utilisateur peuvent utiliser la même session tel-que.  
  Pour partager une session tmux entre deux utilisateurs différents, il faut passer par un fichier socket, accessible en lecture/écriture par les deux utilisateurs — le plus simple est de les faire appartenir à un même groupe et donner l'appartenance du fichier socket à ce groupe

  ```
  tmux -S /tmp/shared new -s shared           Créer une session nommée, assessible via le socket /tmp/shared
  chgrp devteam /tmp/shared                   Donner l'appartenance du fichier socket au groupe devteam

  tmux -S /tmp/shared attach -t shared        S'attacher à une session donnée, via le socket /tmp/shared
  ```

  La session peut être read-only mais sur une base volontaire uniquement:

  ```
  tmux -S /tmp/shared attach -t shared -r    S'attacher à une session donnée, en lecture seule
  ```

### Fenêtre

<pre>
<kbd>Ctrl</kbd>+<kbd>b</kbd> c   Créer une nouvelle fenêtre
                                 La liste des fenêtres est affichée en bas de l'écran
                                 La fenêtre en cours est suffixée d'un astérisque (*), la fenêtre précédemment utilisée est suffixée d'un tiret (-)

<kbd>Ctrl</kbd>+<kbd>b</kbd> ,   Renommer la fenêtre en cours
<kbd>Ctrl</kbd>+<kbd>b</kbd> &   Fermer la fenêtre en cours

<kbd>Ctrl</kbd>+<kbd>b</kbd> w   Lister les fenêtres
                                 Permet de changer de fenêtre avec les flèches et entrée
<kbd>Ctrl</kbd>+<kbd>b</kbd> f   Chercher une fenêtre (filter)
                                 Similaire à w mais en filtrant sur le nom de la fenêtre

<kbd>Ctrl</kbd>+<kbd>b</kbd> n   Aller à la fenêtre suivante (next)
<kbd>Ctrl</kbd>+<kbd>b</kbd> p   Aller à  la fenêtre précédente
<kbd>Ctrl</kbd>+<kbd>b</kbd> 0   Aller à la fenêtre 0
                                 Valeurs acceptées: de 0 à 9
<kbd>Ctrl</kbd>+<kbd>b</kbd> l   Retourner à la fenêtre précédemment utilisée
</pre>

Pour intervertir les fenêtres 0 et 1 (changer l'ordre):

<pre>
<kbd>Ctrl</kbd>+<kbd>b</kbd> : swap-window -s 1 -t 0
</pre>

## Commandes

* Comme mentionné précédemment, plutôt qu'utiliser les raccourcis clavier on peut également utiliser des commandes

  ```
  :new-window                          Créer une nouvelle fenêtre
  :new-window -c /var/log              Créer une nouvelle fenêtre dans le répertoire /var/log
  :select-window -t 0                  Aller à la fenêtre 0
  ```
  ```
  :set-option -g allow-rename off      Ne pas renommer la fenêtre en fonction de la commande en cours
  :set -g status-bg cyan               Afficher la barre de statut en cyan
  ```
  ```
  :set-option -g monitor-activity on   Indiquer lorsque stdout a changé
                                       Si quelque chose se passe dans une fenêtre, il y aura une
                                       indication visuelle dans la barre d'état (le background change et un # est ajouté)
  ```
  ![](https://i.imgur.com/6lUjpv3.png)
