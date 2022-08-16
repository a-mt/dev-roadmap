---
title: Arrêter et redémarrer
category: Linux, Boot
---

* Pour arrêter ou redémarrer le système à partir de la ligne de commande, il y a différentes manières de s'y prendre:

  1. On peut changer le runlevel avec `init` ou `telinit`  
     Note: systemd traduira le runlevel donné en runlevelN.target

      ```
      telinit 0
      telinit 6
      ```

  2. Sous un système systemd, on peut utiliser systemctl

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

  3. On peut utiliser les commande `poweroff` ou `reboot`  
      Sur un système sous systemd, cela revient à appeler systemctl

      ```
      $ which poweroff
      /sbin/poweroff
      $ ls -l /sbin/poweroff
      lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/poweroff -> /bin/systemctl
      $ ls -l /sbin/reboot
      lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/reboot -> /bin/systemctl
      $
      $ ls -l /sbin/shutdown
      lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/shutdown -> /bin/systemctl
      $ ls -l /sbin/halt
      lrwxrwxrwx 1 root root 14 déc.  10  2021 /sbin/halt -> /bin/systemctl
      ```

      La commande `shutdown` admet certains arguments:

      * Le premier argument permet de spécifier quand l'arrêt doit être déclenché (1 minute si omis). Ce peut être:
        - `now` pour tout de suite
        - un temps au format `hh:mm`
        - ou un compte à rebours au format `+m`

        ```
        $ date --rfc-3339 s
        2022-08-15 18:22:00+02:00
        $
        $ shutdown +60
        Shutdown scheduled for Mon 2022-08-15 19:22:02 CEST, use 'shutdown -c' to cancel.
        ```

     * Le second argument permet de spécifier un message (wall) à afficher dans les terminaux de tous les utilisateurs connectés.

        ```
        $ sudo shutdown now "Goodbye World"
        ```

    [Halt vs shutdown](https://unix.stackexchange.com/questions/8690/what-is-the-difference-between-halt-and-shutdown-commands/196471#196471)

* ACPI (*Advanced Configuration and Power Interface*) est une norme, suivie par la plupart des fabricants d'ordinateur, ayant pour but de réduire la consommation d'énergie d'un ordinateur lorsqu'on met hors tension certains composants — par exemple lorsqu'on le met en veille.  
  La gestion d'ACPI est prise en charge par le daemon *acpid*. Lorsqu'un événement de cycle de vie se produit (par exemple shutdown), ce daemon envoie les signaux nécessaires aux chipsets conformes à l'ACPI, de façon à ce qu'ils soient correctement informés des changements d'état. acpid n'est pas présent si l'ordinateur n'a pas de hardware ACPI.