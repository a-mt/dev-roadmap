---
title: Arrêter et redémarrer
category: Linux, Boot
---

Pour arrêter ou redémarrer le système à partir de la ligne de commande, il y a différentes manières de s'y prendre:

* On peut changer de runlevel en cours avec <ins>init ou telinit</ins>  
  Note: systemd traduira le runlevel donné en runlevelN.target

  ```
  telinit 0
  telinit 6
  ```

* Sous un système systemd, on peut utiliser <ins>systemctl</ins>

  ```
  systemctl hibernate
  systemctl suspend
  systemctl poweroff
  systemctl reboot
  ```

  ou

  ```
  systemctl isolate poweroff
  ...
  ```

* On peut utiliser les commandes <ins>poweroff, reboot, shutdown, etc</ins>  
  Sur un système sous systemd, cela revient à appeler systemctl

  ```
  $ which poweroff
  /sbin/poweroff
  $
  $ ls -l /sbin/poweroff
  lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/poweroff -> /bin/systemctl
  $ ls -l /sbin/reboot
  lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/reboot -> /bin/systemctl
  $ ls -l /sbin/shutdown
  lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/shutdown -> /bin/systemctl
  $ ls -l /sbin/halt
  lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/halt -> /bin/systemctl
  ```

  La commande `shutdown` admet des arguments et options:

  * Le premier argument spécifie quand l'arrêt doit être lancé:
    - `now` pour tout de suite
    - un temps au format `hh:mm`
    - un compte à rebours au format `+m`
    - si omis: 1 minute

    ```
    $ date --rfc-3339 s
    2022-08-15 18:22:00+02:00
    $
    $ shutdown +60
    Shutdown scheduled for Mon 2022-08-15 19:22:02 CEST, use 'shutdown -c' to cancel.
    ```

  * Le deuxième argument permet de spécifier un message (wall) qui sera affiché dans les terminaux de tous les utilisateurs connectés.  
    Permet aux utilisateurs de savoir à l'avance pourquoi et quand la machine sera indisponible, et leur permet de terminer leur travail avant que cela ne se produise — au lieu d'être brusquement déconnectés sans savoir pourquoi.

    ``` bash
    sudo shutdown -r +1 'Scheduled restart to do an offline-backup of our database'
    ```

  * -r (reboot) permet de redémarrer le système.  
    Par exemple pour planifier un redémarrage à 02:00 du mat:

    ``` bash
    $ sudo shutdown -r 02:00
    ```

  * -c (cancel) permet d'annuler un arrêt/redémarrage planifié:

    ``` bash
    $ sudo shutdown -c
    ```

  [Halt vs shutdown](https://unix.stackexchange.com/questions/8690/what-is-the-difference-between-halt-and-shutdown-commands/196471#196471)

* Note: vous entendrez peut⁻etre parler d'ACPI sur les forums.  
  ACPI (*Advanced Configuration and Power Interface*) est une norme, suivie par la plupart des fabricants d'ordinateur, ayant pour but de réduire la consommation d'énergie d'un ordinateur lorsqu'on met hors tension certains composants — par exemple lorsqu'on le met en veille.  
  La gestion d'ACPI est prise en charge par le daemon *acpid*. Lorsqu'un événement de cycle de vie se produit (par exemple shutdown), ce daemon envoie les signaux nécessaires aux chipsets conformes à l'ACPI, de façon à ce qu'ils soient correctement informés des changements d'état. acpid n'est pas présent si l'ordinateur n'a pas de hardware ACPI.