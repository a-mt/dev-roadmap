---
title: Permissions spéciales
category: Linux, Fichiers
---

## SUID

* *SUID* (Set User ID) est une permission spéciale, définie au niveau de l'utilisateur propriétaire d'un fichier. Elle permet d'executer un fichier executable en utilisant les droits de l'utilisateur propriétaire et non celles de l'utilisateur en cours.

* Par exemple, un utilisateur n'a pas le droit de modifier le fichier /etc/shadow, qui contient les mots de passe des utilisateurs:

  ```
  $ ls -l /etc/shadow
  -rw-r----- 1 root shadow 1412 juil. 21 09:17 /etc/shadow
  ```

  Et pourtant il peut utiliser la commande passwd pour modifier son mot de passe:

  ```
  $ whoami
  bob
  $ passwd
  Changing password for bob.
  (current) UNIX password: 
  Enter new UNIX password: 
  Retype new UNIX password: 
  passwd: password updated successfully
  $
  $ ls -l /etc/shadow
  -rw-r----- 1 root shadow 1412 juil. 21 12:25 /etc/shadow
  ```

  C'est parce qu'il a le droit d'exécuter passwd et que SUID est définie — dénoté par le `s` à la place de `x` dans les droits utilisateur:

  ```
  $ which passwd
  /usr/bin/passwd
  $ ls -l /usr/bin/passwd
  -rwsr-xr-x 1 root root 59640 mars  14 11:49 /usr/bin/passwd
  ```

  Ainsi, quand un utilisateur lance passwd, passwd s'execute en tant que root (le propriétaire) et utilise les droits de root — qui à la permission de modifier /etc/shadow.

* Si l'utilisateur propriétaire n'a pas les droits d'execution, alors l'élévation des privilèges d'execution en tant qu'utilisateur ne sera pas possible. Si SUID est définit mais que l'utilisateur n'a pas les droits d'execution, un `S` est affiché au lieu de `s`.

* Les permissions SUID sont représentées par:

  - mode symbolique: `u=s`
  - mode octal `4nnn` (exemple: 4755)

## SGID

* *SGID* (Set Group ID) est une permissions spéciale, similaire à SUID mais pour les permissions de groupe.  
  Il a un effet différent suivant qu'il soit assigné à un dossier ou un fichier:

  * <ins>sur un fichier</ins>  
    Permet à l'utilisateur d'exécuter un fichier exécutable en fournissant un accès de groupe temporaire. Il est également représenté par `s` mais dans les permissions de groupe.

    Par exemple, lorsqu'un utilisateur exécute la commande wall, il pourra accéder aux fichiers appartenant au groupe tty:

    ```
    $ which wall
    /usr/bin/wall
    $ ls -l /usr/bin/wall
    -rwxr-sr-x 1 root tty 30800 sept. 16  2020 /usr/bin/wall
    ```

  * <ins>sur un répertoire</ins>  
    A pour effet d'assigner les fichiers crées dans ce répertoire au groupe propriétaire du répertoire et non au groupe principal de l'utilisateur qui a crée le fichier. Tous les répertoires crées dans ce répertoire hériterons également des droits SGID.

* Les permissions SGID sont représentées par:

  - mode symbolique: `g=s`
  - mode octal `2nnn` (exemple: 2755)

## Sticky Bit

* *Sticky Bit* est une permission spéciale, définie pour les permissions des "autres" utilisateurs (non propriétaires) d'un fichier. 

* Le sticky bit se définit sur un répertoire, sur un fichier il est sans effet.  
  Il permet à plusieurs utilisateurs d'accéder à un répertoire et y ajouter des fichiers que les autres peuvent lire, mais que seul le propriétaire (ou root) peut supprimer.

  Pour rappel: sans cette permission, tout utilisateur ayant le droit d'ajouter des fichiers dans un répertoire (parce qu'il a les droits d'execution sur ce répertoire), a également le droit de supprimer des fichiers dedans qu'il en soit l'auteur ou non.

* Contrairement à SUID et SGID, sticky bit est indiqué par un `t` à la place de `x`. Si le sticky a été assigné mais le droit d'exécution non, alors il est sans effet — indiqué par `T` au lieu de `t`.

  ```
  $ ls -ld /tmp
  drwxrwxrwt 15 root root 20480 juil. 21 12:44 /tmp
  ```

* Les permissions sticky bit sont représentées par:

  - mode symbolique: `o=t`
  - mode octal `1nnn` (exemple: 1755)

## Assigner des permissions spéciales

Rappel: Le fichier doit également avoir les droits d'execution au même niveau que la permission spéciale pour qu'elle soit effective.

* En notation symbolique:

  - SUID: assigner `s` à l'utilisateur
  - SGID: assigner `s` au groupe
  - Sticky bit: assigner `t` aux autres

  ``` bash
  # SUID non actif
  $ chmod u=rws file
  $ ls -l
  -rwSrw-r-- 1 am am 0 juil. 21 13:40 file
  $
  # SUID actif
  $ chmod a+x file
  $ ls -l
  -rwsrwxr-x 1 am am 0 juil. 21 13:40 file
  ```

* En notation octale:  
  Les permissions spéciales sont assignées par une 4ème chiffre, tout à gauche.

  - `0` pour aucune permission spéciale
  - `1` pour le sticky bit
  - `2` pour SGID
  - `4` pour SUID

  ``` bash
  # SUID non actif
  $ chmod 4644 file
  $ ls -l file
  -rwSr--r-- 1 am am 0 juil. 21 13:40 file
  $
  # SUID actif
  $ chmod 4744 file
  $ ls -l file
  -rwsr--r-- 1 am am 0 juil. 21 13:40 file
  ```

  ``` bash
  # SUID + SGID actif
  $ chmod 6754 file
  $ ls -l file
  -rwsr-sr-- 1 am am 0 juil. 21 13:40 file
  ```

  ``` bash
  # Aucune permission spéciale
  $ chmod 754 file
  $ ls -l file
  -rwxr-xr-- 1 am am 0 juil. 21 13:40 file
  ```

## Filtrer

* `find` permet de trouver les fichiers qui ont le SUID ou SGID activé avec l'option -perm:

  ``` bash
  $ find . -perm /4000
  ./suidfile

  $ find . -perm /2000
  ./sgidfile

  $ find . -perm /6000
  ./suidfile
  ./sgidfile
  ./both
  ```

---

## Attributs étendus

* Les attributs étendus (*extended attributes*) associent aux fichiers des métadonnées qui ne sont pas interprétées directement par le système de fichier.  
  Les valeurs sont stockées dans l'inode du fichier et ne peuvent être modifiées que par l'utilisateur root.

* Il existe 4 espaces de nom d'attributs:
  - <ins>system</ins>  
    Sont des attributs utilisés par le kernel pour stocker des objets systèmes, tels que les ACL

  - <ins>security</ins>  
    Sont des attributs utilisés par les modules de sécurité du kernel, tel que SELinux.  
    Ils sont également utilisé pour implémenter des [capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html)

  - <ins>trusted</ins>    
    Sont des attributs visibles et accessibles uniquement par les processus d'administration (processus qui ont la capability CAP_SYS_ADMIN), comme `mount`

  - <ins>user</ins>  
    Sont des attributs pouvant être attribués aux fichiers et répertoires pour stocker des informations supplémentaires arbitraires, telles que le type MIME ou l'encodage. Ces attributs ne sont autorisés que sur les fichiers normaux et répertoires.

    L'accès aux attributs étendus utilisateur est restreint au propriétaire et aux utilisateurs pour lesquels le sticky bit est activé

* On peut visualiser ces attributs avec `lsattr` 

  ```
  $ lsattr filenmame
  ```

  et les définir avec `chattr`.

  ```
  $ chattr [+|-|=mode] filename
  ```

* Il existe de nombreux attributs, on peut notamment citer:

  - i: immutable  
    Un fichier immutable ne peut pas être modifié pas (même par root). Il ne peut ni être supprimé ni renommé, aucun lien dur ne peut être crée vers de fichier et aucune donnée ne peut y êtyre écrit. Seul root peut définir ou supprimer cet attribut

  - a: append-only  
    Un fichier append-only ne peut être ovuert qu'en mode append pour l'écriture. Seul root peut définir ou effacer cet attribut

  - d: no-dump  
    Un Fichier no-dump est igoré lors de l'exécution du programme dump. C'est utile pour ne perdre du temps à sauvegarder les fichiers de swap et de cache

  - A: no-atime-update  
    Un fichier no-atime-update ne modifie pas sa valeur atime (temps d'accès) lorsque le fichier est consulté sans modification. Cela peut améliorer les performances de certains systèmes, en résuidant le nombre d'entrées/sorties sur le disque  

  ``` bash
  $ echo "Hello World" > file
  $ lsattr file
  --------------e----- file
  $ lsattr -l file
  file                         Extents
  $
  $ sudo chattr +a file
  $ lsattr -l file
  file                         Append_Only, Extents
  $
  $ echo "Hello Bob" > file
  bash: file: Operation not permitted
  $ echo "Hello Bob" >> file
  $ cat file
  Hello World
  Hello Bob
  $
  $ sudo chattr -a file
  $ echo "Hello Bob" > file
  $ cat file
  Hello Bob
  ```
