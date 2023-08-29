---
title: Liens
category: Linux, Fichiers
---

## Hard link

* Un *lien dur* (*hard link*) est un fichier qui pointe vers  
  le même emplacement mémoire (inode) qu'un autre fichier.

  ![](https://i.imgur.com/m7qSlBNm.png)

### ln

* Pour créer un hard link, utiliser la commande `ln` sans option:

  ```
  ln filename aliasname
  ```

  <ins>Exemple</ins>:

  ``` bash
  $ sudo ln /etc/passwd mypasswd

  $ ls -li mypasswd
  918731 -rw-r--r-- 2 root root 2667 Oct 23 06:15 mypasswd

  $ ls -li /etc/passwd
  918731 -rw-r--r-- 2 root root 2667 Oct 23 06:15 /etc/passwd
  ```

  (on peut voir que le compte de liens durs vaut 2)

## Soft link

* Un *lien souple* (*soft link*) ou *lien symbolique* (*symbolic link*, symlink) est un fichier qui pointe vers  
  un autre nom de fichier. Sous Windows, on appele ce type de lien un raccourci.

  ![](https://i.imgur.com/FuxuutRm.png)

* Un lien symbolique pointe vers le chemin d'un autre fichier:  
  si le fichier original est déplacé ou supprimé, alors le lien ne marche plus (on parle de *lien mort*).  

* Le chemin enregistré est celui qui a été donné en paramètre au moment de la création:  
  si le raccourci est déplacé, et qu'il pointe vers un chemin absolu, alors le lien continue de fonctionner;  
  mais s'il pointe vers un chemin relatif, alors le lien ne marche plus.

  Dans la plupart des cas, on préfère utiliser des liens absolus, bien qu'il soit parfois nécessaire d'utiliser des chemins relatifs: cela permet notamment de créer des liens symboliques à l'intérieur d'un disque amovible, puisque le disque peut ne pas toujours être monté sur le même point de montage. Par exemple, sur une clé USB, on liera "firefox" vers "../../Programmes/Mozilla Firefox/firefox" et non "/media/[...]"

### ln -s

* Pour créer un soft link, utiliser la commande `ln` avec l'option `-s`:

  ```
  ln -s filename aliasname
  ```

  <ins>Exemple</ins>:

  ``` bash
  $ ln -s /etc/passwd mypasswd

  $ ls -li mypasswd
  1181933 lrwxrwxrwx 1 am am 11 Oct 23 09:23 mypasswd -> /etc/passwd

  $ ls -li /etc/passwd
  918731 -rw-r--r-- 1 root root 2667 Oct 23 06:15 /etc/passwd
  ```

### readlink

* `readlink` permet de récupérer le path du fichier vers lequel le lien pointe:

  ```
  $ readlink mypasswd
  /etc/passwd
  ```

## Soft vs hard

Bien qu'ils aient la même finalité, chacun produit des résultats différents et présente des avantages et des inconvénients:

- <ins>Suppression</ins>:  
  * S'il y a plusieurs fichiers avec le même hard link, la suppression d'un de ces fichiers n'entraîne pas la suppression du contenu réel du fichier.
  * Avec un lien symbolique, si le fichier d'origine est supprimé, tous les fichiers qui y sont liés échouent.

<!-- -->

- <ins>Systèmes de fichiers différents</ins>:  
  Il n'est pas possible de créer des hard links qui tentent de croiser des systèmes de fichiers ou partitions — on ne peut pas créer un hard link sur la partition 1, qui pointe vers un emplacement mémoire de la partition 2. Les liens symboliques peuvent être liés à n'importe quel fichier puisqu'ils utilisent un chemin d'accès.

<!-- -->

- <ins>Répertoire</ins>:  
  Les liens symboliques peuvent pointer vers un répertoire, contrairement aux liens durs.

  ```
  $ mkdir test
  $ ln test/ test2
  ln: test/: hard link not allowed for directory
  ```

<!-- -->

- <ins>Visibilité</ins>:  
  Les liens symboliques sont plus faciles à voir.

  * Les liens symboliques sont de type `l` (1er caractère du premier champ)  
    Les liens durs ont un compte de lien supérieur à `1` (3ème champ)

  * On peut voir vers quel fichier pointe un lien symbolique — avec `ls -l` ou `readlink`  
    Un lien dur a le même numéro d'inode qu'un autre fichier — visible avec `ls -i`
