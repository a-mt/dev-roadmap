---
title: Chaîner des commandes
category: Linux, Shell
---

* *Chaîner* des commandes, c'est exécuter une commande après l'autre sur une même ligne de commande. Il y a différentes manières de procéder:

  * avec un point virgule (`;`)  
    Peut être utilisé pour exécuter plusieurs commandes, l'une après l'autre

    ```
    echo "Résultat"; ls
    ```

  * avec un double esperluette (`&&`)  
    Agit comme un "et" logique: si la première commande réussit, alors la deuxième commande sera exécutée — et si elle échoue, la deuxième ne sera pas exécutée

    ``` bash
    cd /Documents && ls
    ```

  * avec un double pipe (`||`)  
    Agit comme un "ou" logique: si la première commande échoue, alors la deuxième commande sera exécutée — et si elle réussit, la deuxième ne sera pas exécutée

    ``` bash
    cd /home/wwwroot || cd /var/www
    ```

    Cette méthode de chaînage est souvent utilisée pour gérer les problèmes dans les scripts: si quelque chose ne fonctionne pas, la deuxième commande peut envoyer un mail ou sauvegarder l'erreur dans des logs.

* On peut grouper des commandes ensembles avec `{ ; }`:

  ```
  0 2 * * * { ~/bin/dbdump_start.sh && ~/bin/dbdump_clean.sh; } 2>&1
  0 3 * * * { [[ $(docker-compose ps celery -q) ]] && docker-compose exec celery bash -c 'celery -A core call celery.backend_cleanup'; } 2>&1
  ```
