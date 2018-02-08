## Où héberger...

| Type de fichier                            | Exemple         | Où l'héberger
|---                                         |---              | ---
| Image                                      | PNG             | https://imgur.com/ ou https://lensdump.com/
| Fichier texte, fichier binaire < 2M        | SVG, PDF, TTF   | https://gist.github.com/ + http://rawgit.com/
| Site web statique                          | HTML, CSS, JS   | https://github.com/ (Github Pages)
| Autres                                     | ZIP             | https://drive.google.com/

## Gist

Pour uploader un fichier binaire comme Gist: [https://github.com/a-mt/gist-file-uploader](https://github.com/a-mt/gist-file-uploader)

Ou
* créer un gist
* le cloner
* ajouter le fichier, commiter et pusher sur le gist

## Google Drive

Le lien crée par cette méthode renvoie une redirection 301 vers une URL temporaire.  
Ne peut être utilisé que pour partager un lien direct (background-image, font-face, etc ne suivent pas les redirections)

1. Créer un dossier
   * Changer les permissions du dossier à **public** (dans `Partager`)

2. Ajouter le fichier
   * Clic droit sur le fichier > `Partager`
   * S'assurer que le fichier est **public** (ou aller dans `avancé` pour modifier les permissions)
   * Récupérer le lien de partage
   * Créer un lien direct vers le fichier:

```
https://drive.google.com/file/d/FILE_ID/edit?usp=sharing
```

devient

```
https://drive.google.com/uc?export=download&id=FILE_ID
```
