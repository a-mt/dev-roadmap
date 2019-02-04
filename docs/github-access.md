---
title: Contrôles d'accès
category: Webenv, Github
---

## Collaborateurs

Les collaborateurs n'ont pas le droit admin, ils ne peuvent pas modifier les configurations ou ajouter de nouveaux collaborateurs eux-mêmes. 
Si vous ne voulez pas donner un droit en écriture complet, utiliser le système de fork et pull request.

## Organisation

Un compte Github peut être déclaré comme **organisation** dans les configurations du profil.  
Une organisation est utile quand le code appartient à un groupe, notamment une entreprise.

On peut ajouter des membres à l'organisation, soit en tant que membre soit en tant que propriétaire. Un propriétaire a tous les droits (inviter des personnes, modifier les configurations, etc), un membre a des droits limités (créer des teams, voir les membres de l'organisation et des teams, etc)

Un **team** permet de gérer les permissions de multiple développeurs travaillant sur de multiples dépots.

---

## Authentification à deux facteurs

On peut activer l'authentification à deux facteurs (*two factor authentication* en anglais, abbrégé 2FA) dans les configurations du profil (onglet Security). 
Au moment de se logger à Github, après avoir renseigné le nom d'utilisateur et mot de passe, un code d'accès sera demandé. Ce code d'accès est envoyé par SMS, il change de manière récurrente mais pas à chaque utilisation.  
Pour éviter de se retrouver bloqué en cas de perte du code d'accès, des [codes de récupération](https://help.github.com/articles/downloading-your-two-factor-authentication-recovery-codes/) peuvent être crées (à mettre en place avant de perdre le code !).

## Access token

Un token peut être utilisé pour s'identifier à Github avec une API, ce qui permet de facilement donner et révoquer l'accès à des applications. 
La portée de ce token peut être limitée (accès aux dépots, aux gist, aux informations utilisateur, etc).  
Un token d'accès peut être crée dans `Settings` > `Developper settings` > `Personal access tokens` > `Generate new token`.

---

## Authentification via la console

Il y a plusieurs façons possibles pour s'authentifier

### Agent SSH

Un agent SSH est la manière la plus rapide et la plus simple à utiliser.

1. [Créer une clé SSH et l'ajouter à ssh-agent](ssh.md)
2. Copier le contenu de la clé publique dans le presse-papier (`.ssh/id_dsa.pub`)
3. Déclarer cette nouvelle clé sur Github : `Settings` > `SSH and GPG keys` > `New SSH key`
4. Tester la connection à Github : `ssh -T git@github.com`

### Autorisations OAuth

Un autorisation OAuth est en quelque sorte un mot de passe temporaire, il peut facilement être diffusé et révoqué.

1. Créer un [token d'accès](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
2. L'utiliser à la place du mot de passe

``` shell
git clone https://github.com/username/repo.git
Username: your_username
Password: your_token
```

### Clé de déploiement

Une clé de déploiement est une clé SSH qui n'est autorisée que sur un dépot en particulier.

1. [Créer une clé SSH et l'ajouter à ssh-agent](ssh.md)
2. Copier le contenu de la clé publique dans le presse-papier (`.ssh/id_dsa.pub`)
3. Activer la clé pour le dépot : `Settings` (du dépot) > `Deploy keys` > `Add deploy key`

---

## Sessions

Dans l'onglet Security des configurations du profil sont les listées les différentes sessions qui se sont connectées à Github, avec adresse IP, date de dernière connexion, et navigateur utilisé. 
Cela permet de vérifier si quelqu'un d'autre est ou s'est loggé à Github.

Un historique des actions importantes effectuées est présent juste en dessous: créer un dépot, en supprimer un, ajouter un membre, etc.