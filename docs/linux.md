---
title: Linux
---

[intro]: !linux/intro.md
[command]: !linux/cli-command.md
[navigate]: !linux/cli-navigate.md
[shortcuts]: !linux/bash-shortcuts.md
[wildcard]: !linux/bash-wildcard.md
[escape]: !linux/bash-escape.md
[history]: !linux/bash-history.md
[variable]: !linux/bash-variable.md
[manpages]: !linux/manpages.md
[redirect]: !linux/cli-redirection.md
[chaining]: !linux/cli-chaining.md

[fhs]: !linux/fhs.md
[file-create]: !linux/file-create.md
[file-metadata]: !linux/file-metadata.md
[link]: !linux/file-link.md
[permissions]: !linux/file-permissions.md
[permissions-specials]: !linux/file-permissions-specials.md
[permissions-default]: !linux/file-permissions-default.md
[text-utils]: !linux/file-text-utils.md
[file-list]: !linux/file-list-utils.md
[archive]: !linux/file-archive.md

[script]: !linux/bash-script.md
[flow-control]: !linux/bash-flow-control.md
[flow-loop]: !linux/bash-loops.md
[flow-user]: !linux/bash-user-interraction.md

[process-nice]: !linux/process-nice.md
[process-signal]: !linux/process-signal.md
[process-list]: !linux/process-list.md
[process-jobs]: !linux/process-jobs.md

[regex-posix]: !linux/regex-posix.md
[linux-install]: !linux/linux-install.md
[linux-transfert]: !linux/linux-transfert.md
[awk]: !linux/awk.md
[sed]: !linux/sed.md
[grep]: !linux/grep.md
[vim]: !linux/vim.md
[crontab]: !linux/crontab.md
[iptables]: !linux/iptables.md

[hardware-overview]: !linux/hardware-overview.md
[hardware-disc]: !linux/hardware-disc.md
[hardware-boot]: !linux/hardware-boot.md
[boot-bootloader]: !linux/boot-bootloader.md
[boot-init]: !linux/boot-init.md
[boot-reboot]: !linux/boot-reboot.md

* [Introduction][intro]

* Hands-on
  * [Installer][linux-install]
  * [Transférer des données][linux-transfert]

* CLI
  - [Format d'une commande][command]
  - [Naviguer][navigate]
  - [Raccourcis clavier][shortcuts]
  - [Wildcards][wildcard]
  - [Règles d'échappement][escape]
  - [Historique][history]
  - [Manpages][manpages]
  - [Redirection de flux][redirect]
  - [Chaîner des commandes][chaining]

* Fichiers
  - [Standard de hiérarchie][fhs]
  - [Créer/déplacer/supprimer][file-create]
  - [Metadonnées][file-metadata]
  - [Liens][link]
  - [Permissions][permissions]
  - [Permissions spéciales][permissions-specials]
  - [Permissions par défaut][permissions-default]
  - [Manipuler des fichiers texte][text-utils]
  - [Lister des fichiers][file-list]
  - [Archiver][archive]

* Scripts
  - [Exécuter un script][script]
  - [Variables][variable]
  - [if/else][flow-control]
  - [Boucles][flow-loop]
  - [Interraction utilisateur][flow-user]

* Processus
  - [Avant & arrière plan][process-jobs]
  - [Signaux][process-signal]
  - [Priorité][process-nice]
  - [Lister les processus][process-list]

* Comptes
  - [Utilisateurs & groupes](!linux/accounts.md)

* Boot
  - [Théorie: matériel][hardware-overview]
  - [Théorie: disque dur magnétique][hardware-disc]
  - [Théorie: boot][hardware-boot]
  - [Bootloaders][boot-bootloader]
  - [Processus d'initialisation & services][boot-init]
  - [Arrêter ou redémarrer][boot-reboot]

* Utilitaires
  - [Regex POSIX][regex-posix]
  - [Awk][awk]
  - [Sed][sed]
  - [Grep][grep]

* Éditeurs
  - [Vim][vim]

* APT [1 &#x21F2;](https://itsfoss.com/apt-vs-apt-get-difference/)
* Firewall: [Iptables][iptables], UFW [1 &#x21F2;](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-9)
* Planification tâches: [crontab][crontab]
