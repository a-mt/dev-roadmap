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

* Tmux est un autre multiplexeur de terminal, plus récent et plus facile à utiliser que GNU screen. Là où les raccourcis clavier de GNU screen commençent par Ctrl+a, les raccourcis tmux commençent par Ctrl+b (pour *binding*, liaison)

### Démarrer

* `tmux new` permet de démarrer Tmux  
  On peut voir que tmux est en rout: le nom de l'application indiqué en bas de l'écran

  ```
  tmux new
  ```

  ![](https://i.imgur.com/anJQf8o.png)

* Pour obtenir plus d'informations sur l'écran en cours:

  ```
  tmux ls
  ```

  ![](https://i.imgur.com/OJXem84.png)

### Diviser la fenêtre

* Pour diviser la région en cours en deux panels horizontaux: <kbd>Ctrl</kbd>+<kbd>b</kbd> et <kbd>%</kbd>  
  La nouvelle région a directement le focus et un terminal est démarré. Ainsi, tmux est beaucoup plus rapide pour configurer plusieurs régions que ne l'est GNU screen.  

  ![](https://i.imgur.com/EgwKU6S.png)

* Pour changer de région: <kbd>Ctrl</kbd>+<kbd>b</kbd> et <kbd>o</kbd>

* Pour diviser la région en cours en deux panels verticaux: <kbd>Ctrl</kbd>+<kbd>b</kbd> et <kbd>"</kbd>

  ![](https://i.imgur.com/tLqzgcw.png)

### Stoppper

* Pour arrêter la région en cours: `exit`

* Pour arrêter toutes les régions: <kbd>Ctrl</kbd>+<kbd>a</kbd> et <kbd>&</kbd> — répondre y

  ![](https://i.imgur.com/cd52WkH.png)
