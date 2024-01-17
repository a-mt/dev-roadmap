---
title: Linux
summary: false
roadmap: true
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
[sort]: !linux/utility-sort.md
[find]: !linux/utility-find.md
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
[system-usage]: !linux/system-usage.md
[system-packages]: !linux/packages.md
[network-history]: !linux/network-history.md
[network-intro]: !linux/network-intro.md
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
[accounts-sudoers]: !linux/accounts-sudoers.md

[scheduled-jobs]: !linux/service-scheduled-jobs.md
[time]: !linux/service-time.md
[ntp]: !linux/service-ntp.md
[locale]: !linux/service-locale.md
[email]: !linux/service-email.md
[print]: !linux/service-print.md
[logging]: !linux/service-logging.md

## Terminal

* Débuter
  * [Linux][intro]{: .theory}
  * [Installer Linux][linux-install]{: .cli}
  * [Transférer des données][linux-transfert]{: .cli}

* CLI
  * I
    - [Format d'une commande][command]{: .syntax}
    - [Naviguer le terminal][navigate]{: .cli}
    - [Raccourcis clavier][shortcuts]
    - [Wildcards][wildcard]{: .syntax}
    - [Règles d'échappement][escape]{: .syntax}
  * II
    - [Historique][history]{: .cli}
    - [Manpages][manpages]{: .cli}
    - [Redirection de flux][redirect]{: .syntax}
    - [Chaîner des commandes][chaining]{: .syntax}
  * Scripts
    - [Exécuter un script][script]{: .cli}
    - [Variables][variable]{: .syntax}
    - [Tableaux][var-array]{: .syntax}
    - [if/else][flow-control]{: .syntax}
    - [Boucles][flow-loop]{: .syntax}
    - [Fonctions][flow-function]{: .syntax}
    - [Interraction utilisateur][flow-user]{: .cli}
    - [Regex POSIX][regex-posix]{: .syntax}

* Fichiers
  * Bases
    - [Standard de hiérarchie][fhs]{: .theory}
    - [Créer/déplacer/supprimer][file-create]{: .cli}
    - [Metadonnées][file-metadata]{: .cli}
    - [Liens][link]{: .cli}
  * Permisssions
    - [Permissions][permissions]{: .cli}
    - [Permissions spéciales][permissions-specials]{: .cli}
    - [Permissions par défaut][permissions-default]{: .cli}
    - [Permissions ACL][permissions-acl]{: .cli}
  * Manipuler
    - [Manipuler des fichiers texte][text-utils]{: .cli}
    - [Lister des fichiers][file-list]{: .cli}
    - [Archiver][archive]{: .cli}

* Utilitaires
  - [Awk][awk]{: .cli}
  - [Sed][sed]{: .cli}
  - [Grep][grep]{: .cli}
  - [Sort][sort]{: .cli}
  - [Find][find]{: .cli}
  - Éditeurs
    - [Vim][vim]

## Gestion

* Processus
  * Gérer les processus
    - [Avant & arrière plan][process-jobs]{: .cli}
    - [Signaux][process-signal]{: .cli}
    - [Priorité][process-nice]{: .cli}
    - [Lister les processus][process-list]{: .cli}
  * Utilitaires
    - [Multiplexeur de terminal][multiplexer]{: .cli}

* Comptes
  * I
    - [Utilisateurs][accounts-user]{: .cli}
    - [Groupes][accounts-group]{: .cli}
    - [Escalade de privilèges][accounts-sudoers]{: .cli}
    - [Environnement](!linux/env.md){: .syntax}
  * II
    - [Limites][accounts-limits]{: .cli}
    - [Quotas][accounts-quota]{: .cli}
    - [PAM][accounts-pam]{: .cli}
    - [SELinux][selinux]{: .cli}

* Boot
  * Théorie
    - [Matériel][hardware-overview]{: .theory}
    - [Disque dur magnétique][hardware-disc]{: .theory}
    - [Boot][hardware-boot]{: .theory}
  * Démarrage
    - [Bootloaders Linux][boot-bootloader]{: .theory}
    - [Processus d'initialisation & services][boot-init]{: .cli}
    - [Arrêter ou redémarrer][boot-reboot]{: .cli}

* Système de fichiers
  * I
    - [Système de fichiers][filesystem-overview]{: .theory}
    - [Créer une partition][filesystem-create]{: .cli}
    - [Formatter une partition][filesystem-format]{: .cli}
    - [Monter une partition][filesystem-mount]{: .cli}
    - [Modifier une partition][filesystem-tuning]{: .cli}
    - [Swap][filesystem-swap]{: .cli}
  * II
    - [LVM][filesystem-lvm]{: .cli}
    - [RAID][filesystem-raid]{: .cli}
    - [NBD](!linux/filesystem-nbd.md){: .cli}
    - [NFS](!linux/filesystem-nfs.md){: .cli}
    - [Encryption](!linux/filesystem-crypt.md){: .cli}

* Gestion du système
  * Paquets
    * [Paquets & gestionnaires de paquet][system-packages]{: .theory}
    * [Paquets Debian: dpkg, apt](!linux/packages-debian.md){: .cli}
    * [Paquets Red Hat: rpm, yum](!linux/packages-redhat.md){: .cli}
    * [Paquets OpenSuse: zypper](!linux/packages-opensuse.md){: .cli}
  * Kernel
    - [Drivers / Modules kernel](!linux/kernel-modules.md){: .cli}
    - [Paramètres kernel](!linux/kernel-parameters.md){: .cli}
  * Resources
    - [Hardware][system-specs]{: .cli}
    - [Utilisation][system-usage]{: .cli}
    - [Librairies partagées](!linux/libraries.md){: .cli}

## Services

* Services
  * I
    - [Tâches récurrentes][scheduled-jobs]{: .cli}
    - [Date & temps][time]{: .cli}
    - [NTP][ntp]{: .cli}
    - [Locale][locale]{: .cli}
    - [Email][email]{: .cli}
    - [Impression][print]{: .cli}
    - [Logs][logging]{: .cli}

  * II
    - [Serveur DNS](!linux/service-dns.md){: .cli}
    - [SSH](!linux/service-ssh.md){: .cli}
    - [Proxy: Squid](!linux/service-squid.md){: .cli}
    - [HTTP: Apache](!linux/service-apache.md){: .cli}
    - [DB: MariaDB](!linux/service-mariadb.md){: .cli}
    - [SSL](!linux/ssl.md){: .cli}

  * [Créer un service systemd](!linux/service-systemd.md){: .syntax}

## Réseau

* Réseau
  * Théorie
    - [Histoire d'Internet][network-history]{: .theory}
    - [Réseaux informatiques][network-intro]{: .theory}
    - [Couche 1: liaison physique][network-layer1-physical]{: .theory}
    - [Couche 2: transfert des données][network-layer2-mac]{: .theory}
    - [Couche 3: routing][network-layer3-ip]{: .theory}
    - [Couche 4: connexion](!linux/network-layer4-tcp.md){: .theory}
    - [DNS](!linux/dns.md){: .theory}
    - [Bridge & bond](!linux/network-bridge.md){: .theory}

  * Configurer
    - [Afficher les configurations réseau](!linux/network-quick.md){: .cli}
    - [Interfaces][network-nic]{: .cli}
    - [Nom d'hôte][network-hostname]{: .cli}
    - [Adresses IP](!linux/network-ip.md){: .cli}
    - [Routing](!linux/network-route.md){: .cli}

  * Firewall
    * [Firewalld](!linux/network-firewall-cmd.md){: .cli}  
    * [Iptables][iptables]{: .cli}
    * UFW [1 &#x21F2;](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-9)

## Serveurs

* Gestion des serveurs
  * I
    * [VM](!linux/vm-overview.md){: .theory}
    * [Créer une VM avec virt-manager](!linux/vm-create.md){: .cli}
    * [Créer une VM avec Virsh](!linux/vm-virsh.md){: .cli}
    * [Config avec Vagrant](!linux/vm-vagrant.md){: .cli}
    * [Installer un serveur](!linux/server-install.md){: .cli}
  * II
    * [CSP](!linux/csp.md){: .theory}
