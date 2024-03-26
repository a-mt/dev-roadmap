---
title: Linux
summary: false
roadmap: true
---

[intro]: intro.md
[command]: cli-command.md
[navigate]: cli-navigate.md
[shortcuts]: bash-shortcuts.md
[wildcard]: bash-wildcard.md
[escape]: bash-escape.md
[history]: bash-history.md
[variable]: bash-variable.md
[var-array]: bash-variable-array.md
[manpages]: manpages.md
[redirect]: cli-redirection.md
[chaining]: cli-chaining.md

[fhs]: fhs.md
[file-create]: file-create.md
[file-metadata]: file-metadata.md
[link]: file-link.md
[permissions]: file-permissions.md
[permissions-specials]: file-permissions-specials.md
[permissions-default]: file-permissions-default.md
[permissions-acl]: file-permissions-acl.md
[text-utils]: file-text-utils.md
[file-list]: file-list-utils.md
[archive]: file-archive.md

[script]: bash-script.md
[flow-control]: bash-flow-control.md
[flow-loop]: bash-loops.md
[flow-function]: bash-function.md
[flow-user]: bash-user-interraction.md
[process-nice]: process-nice.md
[process-signal]: process-signal.md
[process-list]: process-list.md
[process-jobs]: process-jobs.md
[multiplexer]: multiplexer.md

[regex-posix]: regex-posix.md
[linux-install]: linux-install.md
[linux-transfert]: linux-transfert.md
[awk]: utility-awk.md
[sed]: utility-sed.md
[grep]: utility-grep.md
[vim]: utility-vim.md
[sort]: utility-sort.md
[find]: utility-find.md
[iptables]: iptables.md

[hardware-overview]: hardware-overview.md
[hardware-disc]: hardware-disc.md
[hardware-boot]: hardware-boot.md
[boot-bootloader]: boot-bootloader.md
[boot-init]: boot-init.md
[boot-reboot]: boot-reboot.md
[filesystem-overview]: filesystem-overview.md
[filesystem-create]: filesystem-create.md
[filesystem-format]: filesystem-format.md
[filesystem-mount]: filesystem-mount.md
[filesystem-tuning]: filesystem-tuning.md
[filesystem-swap]: filesystem-swap.md
[filesystem-lvm]: filesystem-lvm.md
[filesystem-raid]: filesystem-raid.md

[system-specs]: system-specs.md
[system-usage]: system-usage.md
[system-packages]: packages.md
[network-history]: network-history.md
[network-intro]: network-intro.md
[network-layer1-physical]: network-layer1-physical.md
[network-layer2-mac]: network-layer2-mac.md
[network-layer3-ip]: network-layer3-ip.md
[network-nic]: network-nic.md
[network-hostname]: network-hostname.md

[accounts-user]: accounts-user.md
[accounts-group]: accounts-group.md
[accounts-limits]: accounts-limits.md
[accounts-quota]: accounts-quota.md
[accounts-pam]: accounts-pam.md
[selinux]: lsm-selinux.md
[accounts-sudoers]: accounts-sudoers.md

[scheduled-jobs]: service-scheduled-jobs.md
[time]: service-time.md
[ntp]: service-ntp.md
[locale]: service-locale.md
[email]: service-email.md
[print]: service-print.md
[logging]: service-logging.md

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
    - [Environnement](env.md){: .syntax}
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
    - [NBD](filesystem-nbd.md){: .cli}
    - [NFS](filesystem-nfs.md){: .cli}
    - [Encryption](filesystem-crypt.md){: .cli}

* Gestion du système
  * Paquets
    * [Paquets & gestionnaires de paquet][system-packages]{: .theory}
    * [Paquets Debian: dpkg, apt](packages-debian.md){: .cli}
    * [Paquets Red Hat: rpm, yum](packages-redhat.md){: .cli}
    * [Paquets OpenSuse: zypper](packages-opensuse.md){: .cli}
  * Kernel
    - [Drivers / Modules kernel](kernel-modules.md){: .cli}
    - [Paramètres kernel](kernel-parameters.md){: .cli}
  * Resources
    - [Hardware][system-specs]{: .cli}
    - [Utilisation][system-usage]{: .cli}
    - [Librairies partagées](libraries.md){: .cli}

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
    - [Serveur DNS](service-dns.md){: .cli}
    - [SSH](service-ssh.md){: .cli}
    - [Proxy: Squid](service-squid.md){: .cli}
    - [HTTP: Apache](service-apache.md){: .cli}
    - [DB: MariaDB](service-mariadb.md){: .cli}
    - [SSL](ssl.md){: .cli}

  * [Créer un service systemd](service-systemd.md){: .syntax}

## Réseau

* Réseau
  * Théorie
    - [Histoire d'Internet][network-history]{: .theory}
    - [Réseaux informatiques][network-intro]{: .theory}
    - [Couche 1: liaison physique][network-layer1-physical]{: .theory}
    - [Couche 2: transfert des données][network-layer2-mac]{: .theory}
    - [Couche 3: routing][network-layer3-ip]{: .theory}
    - [Couche 4: connexion](network-layer4-tcp.md){: .theory}
    - [DNS](dns.md){: .theory}
    - [Bridge & bond](network-bridge.md){: .theory}

  * Configurer
    - [Afficher les configurations réseau](network-quick.md){: .cli}
    - [Interfaces][network-nic]{: .cli}
    - [Nom d'hôte][network-hostname]{: .cli}
    - [Adresses IP](network-ip.md){: .cli}
    - [Routing](network-route.md){: .cli}

  * Firewall
    * [Firewalld](network-firewall-cmd.md){: .cli}  
    * [Iptables][iptables]{: .cli}
    * UFW [1 &#x21F2;](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-9)

## Serveurs

* Gestion des serveurs
  * I
    * [VM](vm-overview.md){: .theory}
    * [Créer une VM avec virt-manager](vm-create.md){: .cli}
    * [Créer une VM avec Virsh](vm-virsh.md){: .cli}
    * [Config avec Vagrant](vm-vagrant.md){: .cli}
    * [Installer un serveur](server-install.md){: .cli}
  * II
    * [CSP](csp.md){: .theory}
