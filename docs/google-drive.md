---
title: Google Drive
category: Hosting
---

## Partager un fichier

Pour partager un fichier avec Google Drive
1. Créer un dossier
    * Changer les permissions du dossier à **public** (dans `Partager`)

2. Ajouter le fichier dans ce dossier
    * Clic droit sur le fichier > `Partager`
    * S'assurer que le fichier est **public** (ou aller dans `avancé` pour modifier les permissions)
    * Récupérer le lien de partage

---

## Créer un lien direct

Récupérer le lien de partage du fichier

* Voir le fichier:

  ```
  https://drive.google.com/file/d/FILE_ID/view
  ```

* Partager le fichier:

  ```
  https://drive.google.com/file/d/FILE_ID/edit?usp=sharing
  ```

* Télécharger le fichier:

  ```
  https://drive.google.com/uc?export=download&id=FILE_ID
  ```

* Voir le fichier source:

  ```
  https://drive.google.com/uc?export=view&id=FILE_ID
  ```

Le lien crée par cette méthode renvoie une redirection 301 vers une URL temporaire.
Ne peut être utilisé que pour partager un lien direct (les propriétés CSS `background-image`, `font-face`, etc ne suivent pas les redirections)