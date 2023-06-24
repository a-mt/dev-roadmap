---
title: Linux
summary: false
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
[awk]: !linux/utility-awk.md
[sed]: !linux/utility-sed.md
[grep]: !linux/utility-grep.md
[vim]: !linux/utility-vim.md
[iptables]: !linux/iptables.md

[hardware-overview]: !linux/hardware-overview.md
[hardware-disc]: !linux/hardware-disc.md
[hardware-boot]: !linux/hardware-boot.md
[boot-bootloader]: !linux/boot-bootloader.md
[boot-init]: !linux/boot-init.md
[boot-reboot]: !linux/boot-reboot.md
[filesystem-overview]: !linux/filesystem-overview.md
[filesystem-create]: !linux/filesystem-create.md
[filesystem-format]: !linux/filesystem-format.md
[filesystem-mount]: !linux/filesystem-mount.md
[filesystem-tuning]: !linux/filesystem-tuning.md
[filesystem-swap]: !linux/filesystem-swap.md
[filesystem-lvm]: !linux/filesystem-lvm.md
[filesystem-raid]: !linux/filesystem-raid.md

[system-specs]: !linux/system-specs.md
[system-packages]: !linux/packages.md
[network-history]: !linux/network-history.md
[network-overview]: !linux/network-overview.md
[network-layer1-physical]: !linux/network-layer1-physical.md
[network-layer2-mac]: !linux/network-layer2-mac.md
[network-layer3-ip]: !linux/network-layer3-ip.md
[network-nic]: !linux/network-nic.md
[network-hostname]: !linux/network-hostname.md

[accounts-user]: !linux/accounts-user.md
[accounts-group]: !linux/accounts-group.md
[accounts-limits]: !linux/accounts-limits.md
[accounts-quota]: !linux/accounts-quota.md
[accounts-pam]: !linux/accounts-pam.md
[selinux]: !linux/lsm-selinux.md

[scheduled-jobs]: !linux/service-scheduled-jobs.md
[time]: !linux/service-time.md
[ntp]: !linux/service-ntp.md
[locale]: !linux/service-locale.md
[email]: !linux/service-email.md
[print]: !linux/service-print.md
[logging]: !linux/service-logging.md

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
  - [Regex POSIX][regex-posix]

* Processus
  - [Avant & arrière plan][process-jobs]
  - [Signaux][process-signal]
  - [Priorité][process-nice]
  - [Lister les processus][process-list]
  - [Multiplexeur de terminal][multiplexer]

* Comptes
  - [Utilisateurs][accounts-user]
  - [Groupes][accounts-group]
  - [Environnement](!linux/env.md)
  - [Limites][accounts-limits]
  - [Quotas][accounts-quota]
  - [PAM][accounts-pam]
  - [SELinux][selinux]

* Boot
  - [Théorie: matériel][hardware-overview]
  - [Théorie: disque dur magnétique][hardware-disc]
  - [Théorie: boot][hardware-boot]
  - [Bootloaders][boot-bootloader]
  - [Processus d'initialisation & services][boot-init]
  - [Arrêter ou redémarrer][boot-reboot]

* Système de fichiers
  - [Théorie: système de fichiers][filesystem-overview]
  - [Déclarer une partition][filesystem-create]
  - [Formatter une partition][filesystem-format]
  - [Monter une partition][filesystem-mount]
  - [Modifier une partition][filesystem-tuning]
  - [Swap][filesystem-swap]
  - [LVM][filesystem-lvm]
  - [RAID][filesystem-raid]

* Gestion du système
  - [Ressources & utilisation][system-specs]
  - [Paquets & gestionnaires de paquet][system-packages]
  - [Librairies partagées](!linux/libraries.md)
  - [Modules](!linux/kernel-modules.md)
  - [Paramètres kernel](!linux/kernel-parameters.md)

* Services
  - [Tâches récurrentes][scheduled-jobs]
  - [Date & temps][time]
  - [NTP][ntp]
  - [Locale][locale]
  - [Email][email]
  - [Impression][print]
  - [Logs][logging]

* Réseau
  - [Théorie: histoire d'Internet][network-history]
  - [Théorie: réseaux informatiques][network-overview]
  - [Théorie: couche 1 — liaison physique][network-layer1-physical]
  - [Théorie: couche 2 — transfert des données][network-layer2-mac]
  - [Théorie: couche 3 — routing][network-layer3-ip]
  - [Théorie: couche 4 — connexion](!linux/network-layer4-tcp.md)

  <!-- -->

  - [Afficher les configurations réseau](!linux/network-quick.md)
  - [Firewall](!linux/network-firewall-cmd.cmd)
  - [Interfaces][network-nic]
  - [Nom d'hôte][network-hostname]
  - [Firewall](!linux/network-firewall-cmd.md), [Iptables][iptables], UFW [1 &#x21F2;](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-9)

* Utilitaires
  - [Awk][awk]
  - [Sed][sed]
  - [Grep][grep]

* Éditeurs
  - [Vim][vim]
