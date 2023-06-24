---
title: Limites
category: Linux
---

## Fichier

* Lorsqu'un grand nombre d'utilisateurs se connectent au système, on peut vouloir imposer des limites aux ressources utilisés. Par exemple, s'assurer qu'un utilisateur donné n'utilise pas 80% du CPU, laissant très peu de ressources aux autres.

* Ces limites se définissent dans `/etc/security/limits.conf`

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

## Configuration

- **DOMAIN**  
  Détermine le ou les utilisateurs sur lesquels la limite s'applique.

  Il peut s'agir d'un nom d'utilisateur: trinity

  ```
  trinity hard nproc 10
  ```

  D'un nom de groupe: @developers

  ```
  @developers soft nproc 20
  ```

  Ou tous les utilisateurs du système: *  
  Notons que `*` permet de définir une limite par défaut: cette limite ne sera appliquée qu'aux utilisateurs qui ne sont pas mentionnés dans la liste. Autrement dit, une limite d'utilisateur prévaut sur la limite astérisque.

  ```
  * soft cpu 5
  ```

- **TYPE**  
  Détermine le type de limite.

  Ce peut être une limite dure (*hard*): si la limite dure indique qu'un utilisateur ne peut exécuter que 30 processus à la fois, alors à aucun moment un utilisateur ne pourra exécuter plus de 30 processus

  ```
  trinity hard nproc 30
  ```

  Ou une limite souple (*soft*): il s'agit plutôt d'une valeur initiale. C'est la limite assignée à l'utilisateur lorsqu'il se connecte. Si un utilisateur a une limite souple de 10 processus maximum et une limite dure de 20 alors lorsqu'il se co,nnecte, la limite est fixée à 10 processus, et si l'utilisateur a temporairement besoin d'augmenter cette limite, il peut l'augmenter manuellement — mais jamais au-delà de la limite dure.

  ```
  trinity hard nproc 20
  trinity soft nproc 10
  ```

  Le tiret `-` indique qu'il s'agit à la fois d'une limite souple et dure. Lorsque l'utilisateur se connecte, il peut utiliser la totalité de son allocation sans avoir besoin d'agumenter manuellement sa limite.

  ```
  trinity - nproc 20
  ```

- **ITEM**  
  Détermine ce sur quoi porte la limite.

  "nproc" définit le nombre maximum de processus pouvant être ouverts dans une session utilisateur

  ```
  trinity hard nproc 30
  ```

  "cpu" définit la limite de temps CPU en minutes. Même si un processus a été ouvert il y a 3 heures, il peut n'avoir utilisé que 2sec de temps CPU. Si un processus utilise 100% d'un coeur pendant une seconde, il a utilisé 1sec du temps alloué. S'il utilise 50% d'un coeur pendant une seconde, il a utlisé 0.5sec du temps alloué.

  ```
  trinity hard cpu 1
  ```

  Pour voir la liste des items pouvant être limités: ` man limits.conf`