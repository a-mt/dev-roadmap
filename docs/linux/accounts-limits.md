---
title: Limites
category: Linux
---

## Limits.conf

* Lorsqu'un grand nombre d'utilisateurs se connectent au système, on peut vouloir imposer des limites aux ressources utilisés. Par exemple, s'assurer qu'un utilisateur donné n'utilise pas 80% du CPU, ce qui ne laisserait que très peu de ressources aux autres.

* Ces limites se définissent dans le fichier <ins>/etc/security/limits.conf</ins>

    ``` bash
    $ sudo cat /etc/security/limits.conf
    #<domain>      <type>  <item>         <value>
    #

    #*               soft    core            0
    #root            hard    core            100000
    #*               hard    rss             10000
    #@student        hard    nproc           20
    #@faculty        soft    nproc           20
    #@faculty        hard    nproc           50
    #ftp             hard    nproc           0
    #ftp             -       chroot          /ftp
    #@student        -       maxlogins       4
    ```

### Syntaxe

```
<domain> <type> <item> <value>
```

- **DOMAIN**  
  Détermine le ou les utilisateurs sur lesquels la limite s'applique.

  - un utilisateur donné: `username`

    ```
    bob hard nproc 10
    ```

  - un groupe donné: `@groupname`

    ```
    @developers soft nproc 20
    ```

  - tous les utilisateurs: `*`  
    Permet de définir une limite par défaut: cette limite ne sera appliquée qu'aux utilisateurs qui n'ont pas été matchés. Autrement dit, une limite d'utilisateur prévaut sur la limite astérisque.

    ```
    * soft cpu 5
    ```

- **TYPE**  
  Détermine le type de limite.

  - dure: `hard`  
    Si par exemple la limite dure indique qu'un utilisateur ne peut exécuter que 30 processus à la fois, alors à aucun moment un utilisateur ne pourra exécuter plus de 30 processus

    ```
    trinity hard nproc 30
    ```

  - souple: `soft`  
    Il s'agit plutôt d'une valeur initiale. C'est la limite assignée à l'utilisateur lorsqu'il se connecte. Si un utilisateur a une limite souple de 10 processus maximum et une limite dure de 20 alors lorsqu'il se connecte, la limite est fixée à 10 processus, et si l'utilisateur a temporairement besoin d'augmenter cette limite, il peut l'augmenter manuellement — mais jamais au-delà de la limite dure.

    ```
    trinity hard nproc 20
    trinity soft nproc 10
    ```

  - les deux: `-`  
    Le tiret `-` indique qu'il s'agit à la fois d'une limite souple et dure. Lorsque l'utilisateur se connecte, il peut utiliser la totalité de son allocation sans avoir besoin d'agumenter manuellement sa limite.

    ```
    trinity - nproc 20
    ```

- **ITEM**  
  Détermine ce sur quoi porte la limite.

  - `nproc`: définit le nombre maximum de processus pouvant être ouverts dans une session utilisateur

    ```
    # Limité à 30 processus
    trinity hard nproc 30
    ```

  - `cpu`: définit la limite de temps CPU en minutes. Même si un processus a été ouvert il y a 3 heures, il peut n'avoir utilisé que 2sec de temps CPU. Si un processus utilise 100% d'un coeur pendant une seconde, il a utilisé 1sec du temps alloué. S'il utilise 50% d'un coeur pendant une seconde, il a utilisé 0.5sec du temps alloué.

    ```
    # Limité à 1 seconde de CPU
    trinity hard cpu 1
    ```

  - `fsize`: définit la taille maximale des fichiers

    ```
    # Taille maximale: 4M
    stephen hard fsize 4096
    ```

  - `maxsyslogins` pertmet de définir le nombre total maximum de connexions qui peuvent avoir lieu sur le système.  
    `maxlogins` restreint également les connexions, mais il se concentre au niveau utilisateur: on peut ainsi empêcher un compte utilisateur de se connecter plusieurs fois au système. Notons que ces liimites ne s'appliquent pas au compte root.

  - Pour voir la liste des items pouvant être limités: `man limits.conf`

## ulimit

* Pour lister toutes les limites appliquées à la session en cours:

  ``` bash
  $ ulimit -a
  core file size          (blocks, -c) 0
  data seg size           (kbytes, -d) unlimited
  scheduling priority             (-e) 0
  file size               (blocks, -f) unlimited
  pending signals                 (-i) 62324
  max locked memory       (kbytes, -l) 65536
  max memory size         (kbytes, -m) unlimited
  open files                      (-n) 1024
  pipe size            (512 bytes, -p) 8
  POSIX message queues     (bytes, -q) 819200
  real-time priority              (-r) 0
  stack size              (kbytes, -s) 8192
  cpu time               (seconds, -t) unlimited
  max user processes              (-u) 62324
  virtual memory          (kbytes, -v) unlimited
  file locks                      (-x) unlimited
  ```

  Notons que ulimit donne des indications entre parenthèses sur l'option associée à chaque paramètre.  
  Par exemple, -u est l'option pour le nombre maximum de processus utilisateur

  Pour lister les limites dures:

  ``` bash
  $ ulimit -Ha
  ```

* Pour voir la valeur actuelle:

  ``` bash
  $ ulimit -u
  62324
  ```

  Pour afficher la limite dure définie:

  ``` bash
  $ ulimit -H -n
  4096
  ```

  Pour afficher la limite souple définie:

  ``` bash
  $ ulimit -S -n
  1024
  ```

* Pour modifier la valeur actuelle:  
  Cette modification n'affecte que le shell en cours

  ``` bash
  ulimit -u 5000
  ```

  Si un utilisateur a une limite souple et dure, il peut augmenter sa limite souple, qui est la valeur assignée par défaut, jusqu'à la limite durre. Une fois la limite relevée avec ulimit, la commande suivante ne peut que abaisser la valeur: elle ne pourra pas être relevée une seconde fois, même si la limite dure l'autorise.

* Pour permettre la génération de fichiers dump core:

  ``` bash
  # Afficher la limite actuelle
  $ ulimit -Sc
  0

  # Mettre illimité
  $ ulimit -Sc unlimited
  ```
