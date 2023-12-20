---
title: Créer un service systemd
category: Linux
---

* Dans les distributions Linux récentes, systemd est le premier processus lancé par le système d'exploitation. C'est le parent de tous les processus du système, il s'occupe entre autres de lancer les processus au démarrage et sert en quelque sorte de gestionnaire de services. Les services systemd ont un système de dépendances et peuvent ainsi demander à lancer d'autres services.

    [Plus d'infos sur systemd](!linux/boot-init.html#systemd)

* La syntaxe générale d'un service est comme suit:

    ```
    [Unit]
    Description=Foo

    [Service]
    ExecStart=/usr/sbin/foo-daemon

    [Install]
    WantedBy=multi-user.target
    ```

* Pour créer un service, créer un fichier service dans un répertoire lu par systemd.

    ```
    /etc/systemd/system
    /run/systemd/system
    /usr/lib/systemd/system
    ```

  Par exemple <ins>/etc/systemd/system/myapp.service</ins>:

    ``` bash
    $ sudo vim /usr/local/myapp.sh
    #!/bin/sh
    echo "MyApp started" | systemd-cat -t MyApp -p info
    sleep 5
    echo "MyApp crashed" | systemd-cat -t MyApp -p err
    ```
    ``` bash
    sudo chmod +x !$
    ```
    ``` bash
    $ sudo cp /lib/systemd/system/ssh.service /etc/systemd/system/myapp.service
    $ sudo vim /etc/systemd/system/myapp.service
    [Unit]
    Description=My Application
    After=network.target auditd.service

    [Service]
    ExecStartPre=echo "Systemd is preparing to start MyApp"
    ExecStart=/usr/local/bin/myapp.sh
    KillMode=process
    Restart=always
    RestartSec=1
    Type=simple

    [Install]
    WantedBy=multi-user.target
    ```

* Lorsqu'on ajoute, supprime ou édite un fichier service, il faut recharger le daemon system:

    ``` bash
    $ sudo systemctl daemon-reload
    ```

* On peut ensuite démarrer le service pour le tester

    ``` bash
    $ sudo systemctl start myapp.service
    ```
    ``` bash
    $ sudo journalctl -f

    systemd[1]: Starting My Application...
    echo[205937]: Systemd is preparing to start MyApp
    systemd[1]: Started My Appliction
    MyApp[205940]: MyApp started
    MyApp[205943]: MyApp crashed
    ```

* Pour plus d'infos sur les services:

    ```
    $ man systemd.service
    ```

    Sur la section Unit:

    ```
    $ man systemd.unit
    ```

    Pour plus de configs sur l'execution des applications et services:

    ```
    $ man systemd.exec
    ```

    Pour plus de configs sur la manière d'arrêter des processus démarrés par des services:

    ```
    $ man systemd.kill
    ```