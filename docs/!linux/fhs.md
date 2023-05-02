---
title: Standard de hiérarchie
category: Linux, Fichiers
---

## Système de répertoire virtuel

* Sur Windows, le niveau supérieur de la structure des répertoires s'appelle le *poste de travail*. À l'intérieur du poste de travail, se trouve des disques durs désignés par des lettres — C:, D:, etc.

  ```
  C:\Users\Christine\Documents
  D:\Music
  ```

* Sur Linux, le niveau supérieur est appelé le *répertoire racine* et il est symbolisé par le caractère slash (`/`). À l'intérieur du répertoire racine se trouve une structure de fichiers dans lequel on retrouve les disques durs et leurs fichiers, mais pas que.

  ```
  /home/christine/Documents
  /usr/bin
  ```

  Les répertoires virtuels servent d'intermédiaire pour accéder aux données accessibles au kernel, ce peut être des données stockées sur un support physique, ou des données plus volatiles comme la liste des processus actifs.

## Filesystem Hierarchy Standard (FHS)

* Le standard de hiérarchie des systèmes de fichier (*Filesystem Hierarchy Standard*, FHS) désigne quels répertoires doivent correspondre à quel contenu. Ces répertoires sont:

  - /boot - fichiers du bootloader
  - /home - fichiers utilisateur
  - /root - fichiers du super-utilisateur

  - /bin - exécutables essentiels, ne nécessitant pas les privilèges root (ex cat, ls)
  - /dev - (device nodes) système de fichier virtuel, permettant aux applications d'interragir avec le matériel
  - /etc - fichiers de configuration (système et applications)
  - /lib /lib64 - Packages nécessaires aux executables présents dans /bin et /sbin
  - /sbin - exécutables essentiels, nécessitant les privilèges root (ex insmod, fdisk)

  - /proc - système de fichier virtuel, permettant de récupérer des informations sur le système et les processus
  - /sys - système de fichier virtuel, similaire à /proc mais plus jeune et adhère à des standards plus stricts
  - /media - supports amovibles
  - /mnt - supports amovibles (ancien standard)
  - /opt - applications tierces
  - /tmp - fichiers temporaires
  - /usr - données des programmes Linux
  - /var - données volatiles (ex fichiers de log)

  Le répertoire /usr peut être considéré comme une hiérarchie secondaire. Il est utilisé pour les fichiers qui ne sont pas nécessaires au démarrage du système. /usr peut ne pas nécessairement résider dans la même partition que la répertoire racine. Sont spécifiés par le FHS, les sous-répertoires suivants:

  - /usr/bin - programmes binaires des utilisateurs
  - /usr/sbin - programmes binaires des admins
  - /usr/local - données des programmes Linux installés par un utilisateur

* Notons que toutes les distributions ne suivent pas forcemment ce standard à la lettre, il s'agit plus d'un guide que d'une règle.  
  Pour obtenir une description du système de fichier de la distribution en cours:

  ```
  man hier
  ```

## Home directory

* Sur la plupart des distributions Linux, il y a un répertoire /home. Lorsqu'un utilisateur ouvre un terminal, il est automatiquement placé dans son *home directory* (ou répertoire personnel en français). Un utilisateur nommé bob aurait un répertoire personnel /home/bob.

* L'utilisateur a le plein contrôle pour créer et supprimer des fichiers et répetoires supplémentaires dans son répertoire personnel. Les autres fichiers & répertoires sont pour la plupart du temps protégés par des permissions de fichiers.

* Le *home directory* de l'utilisateur en cours a un symbole spécial pour le représenter, le caractère tilde (`~`).

  ```
  $ ls /home/$USER
  Desktop Downloads Images Public Templates bin Documents Music Pictures snap Videos

  $ ls ~
  Desktop Downloads Images Public Templates bin Documents Music Pictures snap Videos
  ```
