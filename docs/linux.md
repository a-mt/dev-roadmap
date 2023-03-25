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
[var-array]: !linux/bash-variable-array.md
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
[permissions-acl]: !linux/file-permissions-acl.md
[text-utils]: !linux/file-text-utils.md
[file-list]: !linux/file-list-utils.md
[archive]: !linux/file-archive.md

[script]: !linux/bash-script.md
[flow-control]: !linux/bash-flow-control.md
[flow-loop]: !linux/bash-loops.md
[flow-function]: !linux/bash-function.md
[flow-user]: !linux/bash-user-interraction.md
[process-nice]: !linux/process-nice.md
[process-signal]: !linux/process-signal.md
[process-list]: !linux/process-list.md
[process-jobs]: !linux/process-jobs.md
[multiplexer]: !linux/multiplexer.md

[regex-posix]: !linux/regex-posix.md
[linux-install]: !linux/linux-install.md
[linux-transfert]: !linux/linux-transfert.md
[awk]: !linux/awk.md
[sed]: !linux/sed.md
[grep]: !linux/grep.md
[vim]: !linux/vim.md
[iptables]: !linux/iptables.md

[hardware-overview]: !linux/hardware-overview.md
[hardware-disc]: !linux/hardware-disc.md
[hardware-boot]: !linux/hardware-boot.md
[boot-bootloader]: !linux/boot-bootloader.md
[boot-init]: !linux/boot-init.md
[boot-reboot]: !linux/boot-reboot.md
[filesystem-overview]: !linux/filesystem-overview.md
[filesystem-create]: !linux/filesystem-create.md
[filesystem-mount]: !linux/filesystem-mount.md
[filesystem-tuning]: !linux/filesystem-tuning.md
[filesystem-swap]: !linux/filesystem-swap.md
[filesystem-lvm]: !linux/filesystem-lvm.md

[system-specs]: !linux/system-specs.md
[system-packages]: !linux/packages.md
[accounts]: !linux/accounts.md
[scheduled-jobs]: !linux/scheduled-jobs.md
[time]: !linux/time.md
[ntp]: !linux/ntp.md
[locale]: !linux/locale.md
[email]: !linux/email.md
[print]: !linux/print.md
[logging]: !linux/logging.md

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
  - [Permissions ACL][permissions-acl]
  - [Manipuler des fichiers texte][text-utils]
  - [Lister des fichiers][file-list]
  - [Archiver][archive]

* Scripts
  - [Exécuter un script][script]
  - [Variables][variable]
  - [Tableaux][var-array]
  - [if/else][flow-control]
  - [Boucles][flow-loop]
  - [Fonctions][flow-function]
  - [Interraction utilisateur][flow-user]

* Processus
  - [Avant & arrière plan][process-jobs]
  - [Signaux][process-signal]
  - [Priorité][process-nice]
  - [Lister les processus][process-list]
  - [Multiplexeur de terminal][multiplexer]

* Comptes
  - [Utilisateurs & groupes][accounts]

* Boot
  - [Théorie: matériel][hardware-overview]
  - [Théorie: disque dur magnétique][hardware-disc]
  - [Théorie: boot][hardware-boot]
  - [Bootloaders][boot-bootloader]
  - [Processus d'initialisation & services][boot-init]
  - [Arrêter ou redémarrer][boot-reboot]

* Système de fichiers
  - [Théorie: système de fichiers][filesystem-overview]
  - [Créer une partition][filesystem-create]
  - [Monter une partition][filesystem-mount]
  - [Modifier une partition][filesystem-tuning]
  - [Swap][filesystem-swap]
  - [LVM][filesystem-lvm]

* Gestion du système
  - [Ressources & utilisation][system-specs]
  - [Paquets & gestionnaires de paquet][system-packages]

* Services
  - [Tâches récurrentes][scheduled-jobs]
  - [Date & temps][time], [NTP][ntp]
  - [Locale][locale]
  - [Email][email]
  - [Impression][print]
  - [Logs][logging]

* Réseau
  - [Théorie: histoire d'Internet](!linux/network-history.md)
  - [Théorie: réseaux informatiques](!linux/network-overview.md)
  - [Théorie: couche 1 — liaison physique](!linux/network-layer1-physical.md)
  - [Théorie: couche 2 — transfert des données](!linux/network-layer2-mac.md)
  - [Théorie: couche 3 — routing](!linux/network-layer3-ip.md)

* Utilitaires
  - [Regex POSIX][regex-posix]
  - [Awk][awk]
  - [Sed][sed]
  - [Grep][grep]

* Éditeurs
  - [Vim][vim]

* APT [1 &#x21F2;](https://itsfoss.com/apt-vs-apt-get-difference/)
* Firewall: [Iptables][iptables], UFW [1 &#x21F2;](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-9)
