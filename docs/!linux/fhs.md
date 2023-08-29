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

* Sur Linux, le niveau supérieur est appelé le *répertoire racine* et il est symbolisé par le caractère slash (`/`). À l'intérieur du répertoire racine se trouve une structure de fichiers dans lequel on retrouve les disques durs et leurs fichiers.

  ```
  /home/christine/Documents
  /usr/bin
  ```

  On y trouve également des fichiers virtuels, des fichiers qui n'existent pas sur le disque mais qui permettent d'accéder aux données connues du kernel, comme par exemple la liste des processus actifs, des périphériques connectés, etc.

  ```
  $ head /proc/meminfo
  MemTotal:       16090892 kB
  MemFree:         7536412 kB
  MemAvailable:   10894720 kB
  Buffers:          765264 kB
  Cached:          3669276 kB
  SwapCached:            0 kB
  Active:          1584280 kB
  Inactive:        4912084 kB
  Active(anon):       6052 kB
  Inactive(anon):  3271708 kB
  ```

## Filesystem Hierarchy Standard (FHS)

* Le standard de hiérarchie des systèmes de fichier (*Filesystem Hierarchy Standard*, FHS) indique quels répertoires doivent correspondre à quel contenu:

  - /boot - fichiers du bootloader
  - /home - fichiers utilisateur
  - /root - fichiers du super-utilisateur

   

  - /bin - exécutables essentiels, ne nécessitant pas les privilèges root (ex cat, ls)
  - /dev - (*device nodes*) système de fichier virtuel, permettant aux applications d'interragir avec le matériel
  - /etc - fichiers de configuration, du système et des applications
  - /lib /lib64 - packages nécessaires aux executables présents dans /bin et /sbin
  - /sbin - exécutables essentiels, nécessitant les privilèges root (ex insmod, fdisk)

   

  - /proc - système de fichier virtuel, permettant de récupérer des informations sur le système et sur les processus
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

* Sur la plupart des distributions Linux, il y a un répertoire /home. Lorsqu'un utilisateur ouvre un terminal, il est automatiquement placé dans son *home directory* (ou "répertoire personnel" en français). Typiquement, un utilisateur nommé bob aurait un répertoire personnel /home/bob.

* L'utilisateur a le plein contrôle pour créer et supprimer des fichiers et répertoires supplémentaires dans son répertoire personnel. Les autres fichiers & répertoires sont pour la plupart du temps protégés par des permissions de fichiers.

* Le *home directory* de l'utilisateur en cours a un symbole spécial pour le représenter, le caractère tilde (`~`).

  ```
  $ ls /home/$USER
  Desktop Downloads Images Public Templates bin Documents Music Pictures snap Videos

  $ ls ~
  Desktop Downloads Images Public Templates bin Documents Music Pictures snap Videos
  ```
