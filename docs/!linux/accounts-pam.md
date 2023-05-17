---
title: PAM
category: Linux
---

## Fichier

* PAM (*Pluggable Authentication Modules*) est un système permettant de personnaliser l'authentification des utilisateurs via l'utilisation de modules. On peut par exemple rendre obligatoire qu'une clé USB donnée soit branchée pour s'identifier en tant que root.

* Les fichiers de PAM sont stockés dans le répertoire `/etc/pam.d`  
  On y trouve par exemple le fichier su, qui définit les modules d'authentication utilisés par l'utilitaire `su` —  
  À chaque fois que la commande su est utilisée, les modules d'authentification sont exécutés de haut en bas.

  ``` bash
  $ sudo grep -E '^[^# ]' /etc/pam.d/su | column -t
  auth      sufficient      pam_rootok.so
  session   required        pam_env.so     readenv=1
  session   required        pam_env.so     readenv=1  envfile=/etc/default/locale
  session   optional        pam_mail.so    nopen
  session   required        pam_limits.so
  @include  common-auth
  @include  common-account
  @include  common-session
  ```

## Configuration

- **TYPE**  
  Le premier mot-clé (ex "auth") indique de quel type de module d'authentification il s'agit. Ce peut être: account, auth, password ou session

  * <ins>account</ins>: effectue certains actions liées au compte de l'utilisateur. Par exemple, ce type de module peut empêcher l'utilisateur de se connecter après 17 heures.

  * <ins>auth</ins>: établit l'identité de l'utilisateur. Par exemple, le module pam_rootok est un module vérifiant si l'utilisateur en cours est root. Ce type de module peut également fournir des privilèges supplémentaires après une authentification réussie.

  * <ins>password</ins>: utilisé pour vérifier un mot de passe ou une clé secrète.

  * <ins>session</ins>: utilisé pour préparer la session de l'utilisateur. Par exemple, un module de session peut écrire dans un fichier de log "l'utilisateur X s'est connecté à hh:mm"

- **CONTRÔLE**  
  Normalement, les modules sont exécutés de haut en bas, mails le champ de contrôle peut modifier ce comportement. Les valeurs valides sont: required, requisite, optional, include et substack

  * <ins>required</ins>: par exemple si on veut qu'un utilisateur ne soit authentifié que s'il prouve son identité de deux façons (s'il a d'une part branché sa clé USB sur le serveur, et d'autre part fourni son mot de passe) alors les deux modules sont *required*. À contrario, si un seul des deux modules suffit, alors les deux modules sont *sufficient*.

  * <ins>requisite</ins>: est une variante plus forte que required: si le module échoue, alors les modules suivants ne sont pas exécutés. Par exemple, si un module requisite demande un mot de passe et que l'utilisateur se trompe, alors le processus est interrompu et le module 2 n'est jamais atteint. À cotnrario, si un module required demande un mot de passe et que l'utilisateur se trompe, alors le module 2 sera tout de même exécuté — ce qui peut être utilise si on veut écrire dans un fichier de log.

  * <ins>sufficient</ins>: interrompt le processus si le module réussit — c'est donc l'inverse de requisite, qui lui interrompt le processus si le module échoue. Par exemple, ne pas tester les modules suivants si l'utilisateur est root.

**NOM & OPTIONS**  
  Spécifie le module à utiliser.  
  Pour voir la liste des modules:

  ``` bash
  man pam
  ```

  Chaque module a des options qui lui sont propres,
  consulter le manuel du module:

  ``` bash
  man pam_wheel
  ```
