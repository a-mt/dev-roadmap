---
title: Processus
category: Linux, Applications
---

* Un *processus* est un programme en cours d'exécution.  
  Par défaut, les processus sont exécutés avec les privilèges de l'utilisateur qui a lancé la commande — le processus est donc limité à ce que l'utilisateur a le droit de faire.

* Certaines commandes s'arrêtent spontanément une fois leur tâche effectuée (par exemple ls),  
  d'autres tournent continuellement jusqu'à ce qu'elle soit explicitement arrêté (par exemple firefox): c'est ce qu'on appelle un *daemon*.

## Avant-plan

* Lorsqu'un processus est un *avant-plan*, l'utilisateur n'a pas de prompt tant que le processus ne s'est pas terminé. On utilise typiquement en avant-plan les commandes qui s'exécutent et se terminent rapidement.

  ```
  $ cat myScript.sh
  for i in {0..10}; do
    echo "$(date +%X) $i"
    sleep 1
  done
  $ . myScript.sh
  18:24:11 0
  18:24:12 1
  18:24:13 2
  18:24:14 3
  18:24:15 4
  18:24:16 5
  18:24:17 6
  18:24:18 7
  18:24:19 8
  18:24:20 9
  18:24:21 10
  $
  ```

## Arrière-plan

* Lorsqu'on s'attend à ce qu'une commande prenne du temps à s'exécuter (par exemple si c'est un daemon), on exécute généralement cette commande en *arrière-plan*. Ce type de processus est aussi appelé un *job*. Celui-ci est toujours associé au shell en cours, et sera stoppé si le shell est fermé, mais le processus libère le contrôle vers le processus parent et l'utilisateur récupère le prompt.

  Pour lancer une commande en arrière, on ajoute l'opérateur `&` à la fin.

  ```
  $ . myScript.sh &
  [1] 23236
  18:24:43 0
  $ 18:24:44 1
  18:24:45 2
  18:24:46 3
  18:24:47 4
  18:24:48 5
  18:24:49 6
  18:24:50 7
  18:24:51 8
  18:24:52 9
  18:24:53 10
  ```

* Lorsqu'on lance un processus en arrière plan, une ligne d'information indique 1. le numéro du job (entre crochets) et 2. le PID du processus.

* Notons qu'en lançant la commande en arrière-plan, les flux stdout et stderr restent inchangés: ils continuent de s'afficher dans le terminal. Généralement, pour ne pas être interrompu par les messages des processus qui tournent en arrière plan, on redirige les sorties d'une commande lancée en arrière-plan.

  ```
  $ . myScript.sh &>/dev/null &
  [1] 23350
  $
  ```

## jobs

* La commande `jobs` permet d'afficher la liste des processus en arrière-plan associés au terminal en cours. Les jobs des autres terminaux ne sont pas affichés.

  ```
  $ jobs
  [1]   Running                 sleep 100 &
  [2]-  Running                 sleep 100 &
  [3]+  Running                 sleep 100 &
  ```

  L'option `-l` permet d'également afficher le PID

  ```
  $ jobs -l
  [1]  11356 Running                 sleep 100 &
  [2]- 11359 Running                 sleep 100 &
  [3]+ 11362 Running                 sleep 100 &
  $
  $ sleep 100 &
  [4] 11369
  $
  $ jobs -l
  [1]  11356 Running                 sleep 100 &
  [2]  11359 Running                 sleep 100 &
  [3]- 11362 Running                 sleep 100 &
  [4]+ 11369 Running                 sleep 100 &
  ```

## Passer de l'avant à l'arrière-plan

Pour mettre en arrière-plan un processus actuellement en avant-plan

1. Mettre le processus en pause avec <kbd>Ctrl</kbd>+<kbd>z</kbd>  
    Cela passe le processus en arrière-plan et permet de récupérer le prompt, mais le processus est en pause, il ne s'éxecute plus

    ```
    $ sleep 100
    ^Z
    [1]+  Stopped                 sleep 100
    ```
    ```
    $ sleep 101
    ^Z
    [2]+  Stopped                 sleep 101
    $
    $ jobs
    [1]-  Stopped                 sleep 100
    [2]+  Stopped                 sleep 101
    ```

2. Relancer le processus en arrière-plan avec `bg` (background) suivit du numéro du job.  
    Si le numéro du job est omis, bg s'applique sur le dernier job de la liste

    ```
    $ bg 1
    [1]- sleep 100 &
    ```
    ```
    $ bg
    [2]+ sleep 101 &
    $
    $ jobs
    [1]-  Running                 sleep 100 &
    [2]+  Running                 sleep 101 &
    ```

## Passer de l'arrière à l'avant-plan

Pour mettre en avant-plan un processus actuellement en arrière-plan

1. Récupérer le numéro du job

    ```
    $ jobs
    [1]-  Running                 sleep 10 &
    [2]+  Running                 sleep 11 &
    ```

2. Relancer le processus en avant-plan avec `fg` (foreground) suivit du numéro du job  
    Comme pour bg, si le numéro du job est omis, alors fg s'applique sur le dernier job de la liste

    ```
    $ fg 1
    sleep 10
    ```
