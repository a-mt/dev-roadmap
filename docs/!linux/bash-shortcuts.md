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
  | Ctrl + c   | Terminer une commande
  | Ctrl + z   | Suspendre la commande
  | Ctrl + d   | Se déconnecter (= exit si aucune session)
  | Ctrl + l   | Effacer l'écran. Ou utiliser la commande `clear`
  | Ctrl + u   | Couper tout ce qui est avant le curseur
  | Ctrl + w   | Couper le mot qui est avant le curseur
  | Ctrl + k   | Couper tout ce qui est après le curseur
  | Ctrl + y   | Coller le texte coupé
  | Ctrl + a   | Aller au début de la ligne
  | Ctrl + e   | Aller à la fin de la ligne

* Pour afficher la liste complète des raccourcis clavier acceptés:

  ```
  $ bind -p | grep -v self-insert | grep -v '(not bound)'
  ```

* Les consoles ont généralement des raccourcis supplémentaires:


  | Raccourci | Description
  |---     |---
  | Ctrl + Shift + t | Ouvrir un nouvel onglet
  | Ctrl + Shift + w | Fermer l'onglet en cours
  | Ctrl + Shift + c | Copier la sélection
  | Ctrl + Shift + v | Coller le contenu du presse-papier
