---
title: Raccourcis clavier
category: Linux, Shell, Bash
---

* Il existe différents raccourcis clavier pour faciliter l'utilisation du terminal, les principaux sont:

  | Raccourci | Description
  |---     |---
  | flèches gauche et droite, BackSpace, Suppr | Éditer la ligne en cours de saisie
  | flèche haut et bas | Relancer une commande précédente sans avoir à la retaper. Ou utiliser la commande `history`
  | tab | Autocompléter un nom de commande
  | tab + tab | Afficher la liste des autocomplétions possiblves
  | Ctrl + c   | Terminer une commande (graceful stop)
  | Ctrl + z   | Suspendre la commande (pause)
  | Ctrl + d   | Se déconnecter (exit si aucun session en cours)
  | Ctrl + l   | Effacer l'écran. Revient à la commande `clear`
  | Ctrl + a   | Aller au début de la ligne
  | Ctrl + e   | Aller à la fin de la ligne
  | Ctrl + u   | Couper tout ce qui est avant le curseur
  | Ctrl + k   | Couper tout ce qui est après le curseur
  | Ctrl + w   | Couper le mot qui est avant le curseur
  | Ctrl + h   | Couper le caractère qui est avant le curseur
  | Ctrl + y   | Coller le texte coupé

* Pour afficher la liste complète des raccourcis clavier acceptés:

  ```
  $ bind -p | grep -v -e self-insert -e '(not bound)'
  ```

* Les consoles ont généralement des raccourcis supplémentaires:

  | Raccourci | Description
  |---     |---
  | Ctrl + Shift + t | Ouvrir un nouvel onglet
  | Ctrl + Shift + w | Fermer l'onglet en cours
  | Ctrl + Shift + c | Copier la sélection dans le presse-papier
  | Ctrl + Shift + v | Coller le contenu du presse-papier
