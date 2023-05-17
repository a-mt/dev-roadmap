---
title: SELinux
category: Linux, Linux security modules
---

## Linux security modules (LSM)

* Nativement, Linux prend en charge une forme assez simple de contrôle d'accès: les fichiers et répertoires ont des autorisations qui déterminent qui peut lire, écrire ou exécuter le contenu.

  Si utilisateur dispose d'autorisations sur un répertoire dans lequel il exécute un programme, tel qu'un serveur, et qu'une personne extérieure se fraye un chemin du serveur jusqu'au dossier, alors il dispose des mêmes autorisations que le processus et est en mesure d'exploiter cette vulnérabilité pour mener une attaque sur le système.

* Différents systèmes informatiques ont différents besoins de sécurité — en fonction en autres de la sensibilité des données, du nombre d'utilisateurs qui disposent d'un compte, de l'exposition à des réseaux extérieurs ou encore des exigences légales.

  Afin de renforcer la sécurité, il est possibilité des charger des modules supplémentaires. Utiliser des modules permet
  - une plus grande flexibilité: avoir le choix entre différentes implémentations, chacune d'entre elles étant présentée comme un LSM (Linux Security Module) autonome
  - de minimiser les changements apportés au noyau
  - de minimiser la charge de travail du noyau

  L'idée étant d'ajouter des hooks avant & après les appels systèmes, pour permettre aux modules d'effectuer des vérification qui s'assureront que les permissions sont valides et que le système est protégé des intentions malveillantes.

* Les implémentations actuelles des LSM, par ordre de popularité, sont:

  - [SELinux](https://selinuxproject.org/page/Main_Page)
  - [AppArmor](https://gitlab.com/apparmor)
  - [Smack](http://schaufler-ca.com/)
  - [Tomoyo](https://tomoyo.osdn.jp/)
  - [Yama](https://kernel.org/doc/html/latest/admin-guide/LSM/Yama.html)

## SELinux

* SELinux (*security enhance Linux*) est un module de sécurité permettant un contrôle très fin des actions qui doivent être autorisées ou refusées.

  De la même manière qu'on peut voir les permissions des fichiers avec ls -l, on peut utiliser une autre option pour voir les labels SELinux: -Z

  ``` bash
  $ ls -l
  -rw-rw-r--. 1 aaron aaron 160 Dec 1 18:19 archive.tar.gz

  $ ls -Z
  unconfined_u:object_r:user_home_t:s0 archive.tar.gz
  ```

  C'est également le cas pour les processus

  ``` bash
  $ ps axZ
  system_u:system_r:NetworkManager_t:s0   1024 ? Ssl 0:00 /sur/sbin/NetworkManager
  system_u:system_r:ssdh_t:s0-s0:c0.c1023 103  ? Ss  0:00 /sur/sbin/sshd -D -
  ```

## Mode

* Pour voir si SELinux est activé et applique activement les restrictions:

  ``` bash
  $ getenforce
  Enforcing
  ```

  - **Enforcing** (1)  
    Indique que SELinux est actif et empêche les actions non autorisées

  - **Permissive** (0)  
    Indique que SELinux autorise tout et se contente d'enregistrer les actions qui auraient dû être refusées — dans des logs

  - **Disabled**  
    Indique que SELinux n'est pas activé, aucune mesure de sécurité n'est appliquée et rien n'est enregistré.


* Pour temporairement passer SELinux en mode permissif:

  ``` bash
  sudo setenforce 0
  sudo setenforce Permissive  # Idem
  ```

* Pour modifier les configurations de SELinux de manière permanentes, il y a deux manières de s'y prendre:

  - avec des paramètres noyau.   
    Ajouter `selinux=0` à la liste des paramètres du noyau lors du démarrage.

  - avec un fichier de configuration.  
    Modifier le fichier de configuration SELinux (généralement /etc/selinux/config) et définir `SELINUX=disabled` avant de rebooter.

## Contexte

* Les *labels* (ou *contexte*) SELinux sont toujours affichés dans cet ordre: utilisateur, rôle, type, niveau

  ![](https://i.imgur.com/vFgTJm6.png)

  Le convention de nommage de SELinux veut que les utilisateurs soient suffixés de `_u`, les rôles de `_r` et les types de `_t`

* Pour autoriser ou refuser une action, SELinux suit à peu près cette logique:

  1. Vérifier l'utilisateur en cours.

     Il ne s'agit pas du nom d'utilisateur avec lequel vous vous connectez, mais d'un utilisateur SELinux. Chaque utilisateur Linux est associé à un utilisateur SELinux grâce aux configurations SELinux

  2. Déterminer si l'utilisateur a le bon rôle pour effectuer l'action.

     Chaque utilisateur a une liste de rôle qu'il peut assumer. Par exemple, on peut imaginer que l'utilisateur developer_u a les rôles develop_r et docker_r, qui lui permet d'exécuter du code, mais pas le rôle sysadmin_r qui lui permettrait de modifier les paramètres du système.

     ![](https://i.imgur.com/OL07S0G.png)

  3. Vérifier si le rôle assumé peut transitionner au type spécifié.

      Ce type est un peu comme une dés-escalade de privilèges: une fois passé à un type donné, il n'est plus possible d'acquérir les privilèges que l'utilisateur de base avait.

      On parle de *type* lorsqu'il s'agit d'une restriction sur des fichiers, et de *domaine* lorsqu'il s'agit de processus

  4. Le niveau n'est presque jamais utilisé sur un système normal. Il convient mieux aux organisations complexes qui ont besoin de plusieurs niveaux de sécurité.

      Par exemple, si Jane est une militaire de haut, elle aura un niveau d'habilitation elevé et pourra lire des documents classifiés de niveau 0 à 4, où le niveau 4 est celui des dossiers top secret. Tandis que si John a un accès de niveau 1, il ne peut accéder qu'aux documents de niveau 0 à 1.

### Utilisateurs

* Pour voir le contexte assigné à l'utilisateur — qui a été assigné à l'utilisateur quand on s'est authentifié:

  ``` bash
  $ id -Z
  unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
  ```

* Pour voir le mapping utilisateur de SELinux:

  ``` bash
  $ sudo semanage login -l
  Login Name   SELinux User  MLS/MCS Range   Service
  __default__  unconfined_u  s0-s0:c0.c1023  *
  root         unconfined_u  s0-s0:c0.c1023  *
  ```

### Rôles

* Pour voir les rôles que chaque utilisateur SELinux peut prendre:

  ``` bash
  $ sudo semanage user -l
  SELinux User  Prefix  MCS level  MCS Range       SELinux Roles
  guest_u       user    s0         s0
  root          user    s0         s0-s0:c0.c1023  guest_r
  staff_u       user    s0         s0-s0:c0.c1023  staff_r sysadm_r system_r unconfined_r
  sysadm_u      user    s0         s0-s0:c0.c1023  staff_r sysadm_r unconfined_r
  ```

### Types

* Tout ce qui a pour label unconfined_t s'exécute sans restriction. SELinux permet à ces processus de faire presque tout ce qu'ils veulent

* Pour changer le contexte SELinux d'un fichier, on utilise la commande `chcon` (*change context*)

  ``` bash
  $ sudo chcon -t httpd_sys_content_t /var/index.html
  ```

  On peut également copier le contexte d'un autre fichier

  ``` bash
  $ chcon --reference somefile someotherfile
  ```

### Niveau

* Chaque niveau est une paire `sensibilité:catégories`, où la catégorie est optionelle.  
  s0 est la sensibilité 0, sans catégorie

  Si l'ensemble de catégorie est contigue, on peut l'abbréger: c0.c3 équivaut à
  c0,c1,c2,c3.  
  s0:c0.c1023 est la sensibilité 0, autorisé pour toutes les catégories

* Le fichier /etc/selinux/targeted/setrans.conf mappe les niveaux (s0:c0) en format humain (CompanyConfidential)

### Héritage du contexte

* Les fichiers nouvellement crées héritent du contexte de leur répertoire parent.  
  Si on déplace ou copie un fichier, le contexte du répertoire d'origine est préservé.

  ``` bash
  $ cd /tmp
  $ touch tmpfile
  $ ls -Z tmpfile
  -rw-rw-r--. john john unconfined_u:object_r:user_tmp_t:s0 tmpfile

  $ cd
  $ touch homefile
  $ ls -Z homefile
  -rw-rw-r--. john john unconfined_u:object_r:user_home_t:s0 homefile

  $ mv /tmp/tmpfile .
  $ ls -Z
  -rw-rw-r--. john john unconfined_u:object_r:user_home_t:s0 homefile
  -rw-rw-r--. john john unconfined_u:object_r:user_tmp_t:s0 tmpfile
  ```

* Ce fonctionnement peut poser des problèmes.  
  Un exemple typique est déplacer des fichiers vers le répertoire d'un serveur web.  
  Les fichiers seront inacessibles jusqu'à ce que le contexte SELinux des fichiers soit ajusté.

* `restorecon` permet de réinitialiser le contexte des fichiers en fonction des paramètres du répertoire parent.


  ``` bash
  $ restorecon -Rv /home/john
  restorecon reset /home/john/tmpfile context \
             unconfined_u:object_r:user_tmp_t:s0->unconfined_u:object_r:user_home_t:s0

  $ ls -Z
  -rw-rw-r--. john john unconfined_u:object_r:user_home_t:s0 homefile
  -rw-rw-r--. john john unconfined_u:object_r:user_home_t:s0 tmpfile
  ```

* Pour définir le contexte par défaut d'un répertoire:

  ``` bash
  # semanage fcontext -a -t httpd_sys_content_t /virtualHosts
  # ls -Z
  ...
  drwxr-xr-x. root root unconfined_u:object_r:default_t:s0 virtualHosts
  ```

  Notons que modifier le contexte par défaut d'un répertoire ne modifie pas les fichiers à l'intéireur. Pour ce faire, il faut appeler restorecon après.

## Politique de sécurité

* Le fichier de configuration où est définit le mode, généralement /etc/sysconfif/selinux, définit également la politique SELinux.

  ```
  SELINUXTYPE=targeted
  ```

* Une seule politique peut être active à la fois, et un changement nécessite généralement un redémarrage du système.

  - <ins>targeted</ins>. Est la politique par défaut.  
    Les processus ciblés sont confinés dans leur propre domaine et les fichiers auxquels ces processus ont accès sont limités.  
    SElinux refuse l'accès aux resources non autorisées et enregistre le refus.  
    Seuls des services spécifiques sont placés dans ces domaines. Par exemple, les services qui écoutent les requêtes sur le réseau, tels que named, httpd et sshd, s'exécutent dans un domaine spécifique et confiné, adapté à leur fonctionnement.

    Les processus qui ne sont pas ciblés s'exécutent dans un domaine non confiné ("unconfined").  
    Les règles de la politique SELinux permettent aux processus s'éxécutant dans des domains non configés d'accéder à la quasi-totalité des données.  
    Notons que les règles SELinux n'ont aucun effet si les règles DAC refusent d'abord l'accès.

  - <ins>minimum</ins>
  - <ins>MLS</ins> (*Multi-Level Security*)

* Chaque politique a ses propres fichiers de configurations, qui doivent être installés dans /etc/selinux/[SELINUXTYPE]

  ``` bash
  # ll -lrt /etc/selinux/
  total 16
  -rw-r--r--. 1 root root  546 Jan  1  2017 config
  drwxr-xr-x. 2 root root    6 Aug  4  2017 tmp
  -rw-r--r--. 1 root root 2321 Aug  4  2017 semanage.conf
  drwxr-xr-x. 7 root root 4096 Feb 19 19:20 targeted
  drwx------. 2 root root    6 Feb 19 19:20 final
  drwxr-xr-x. 7 root root 4096 Mar  5 16:39 mls
  ```

## Règles

* Toutes les opérations d'accès pertinentes pour la sécurité du système sont interceptées par SELinux et examinées dans le contexte de la politique de sécurité chargée. Si l'action est autorisée, l'opération se poursuit; sinon elle est bloquée et le processus reçoit une erreur.

* La politique par défaut étant de refuser tout accès, les règles sont utilisées pour décrire les actions autorisées sur le système.  
  Ces règles SELinux définissent comment les types ou domaines peuvent accéder les uns aux autres. L'accès n'est autorisé s'il existe une règle de politique SELinux qui l'autorise spécifiquement. S'il n'existe pas de règle SELinux qui autorise l'accès, alors il est refusé.

  [Introduction à SELinux: L'adaptation des règles](https://debian-handbook.info/browse/fr-FR/stable/sect.selinux.html)

* SELinux vient avec un jeu de règles pré-configurées.  
  Par exemple, le daemon SSH est restreint au domain sshd_t.  
  Seuls les fichiers de type sshd_exec_t peuvent entrer dans ce domaine

  ![](https://i.imgur.com/FPecQQf.png)

* Les décisions de SELinux, telles que l'autorisation ou l'interdiction d'accès sont mises en cache. Lorsque ces décisions sont mises en cache, les règles SELinux doivent être vérifiées moins souvent, ce qui augmente les performances. Le cache SELinux est connu sous le nom d'AVC (*Access Vector Cache*).

## Paramètres

* La politique de SElinux peut configurée au moment de l'exécution. Pour ce faire, on définit des booléens.

  - `getsebool` permet d'afficher des booléens
  - `setsebool` permet de définir des booléens
  - `semanage boolean -l` permet de lister les paramètres booléens persistents

  ![](https://i.imgur.com/m2WeC9i.png)

* `setsebool` permet de définir un paramètre non persistent:

  ``` bash
  $ setsebool allow_ftpd_anon_write on

  $ getsebool allow_ftpd_anon_write
    allow_ftpd_anon_write -> on

  $ semanage boolean -l | grep allow_ftpd_anon_write
    allow_ftpd_anon_write -> off
  ```

* `setsebool -P` permet de définir un paramètre persistent:

  ``` bash
  $ setsebool -P allow_ftpd_anon_write on

  $ getsebool allow_ftpd_anon_write
    allow_ftpd_anon_write -> on

  $ semanage boolean -l | grep allow_ftpd_anon_write
    allow_ftpd_anon_write -> on
  ```
