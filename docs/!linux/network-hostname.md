---
title: Hostname
category: Linux, Network
---

## Hostname

* Le *nom d'hôte* ou *hostname* est le nom associé à un système.  
  Il est typiquement indiqué dans le prompt, et permet notamment de s'assurer qu'on est connecté à la bonne machine

  ```
  myproject-staging #
  ```

* Souvent, lorsqu'une distribution Linux est installée, elle crée un nom d'hôte par défaut.  
  Bien qu'il y ait des exceptions, il est assez rare de changer le nom d'hôte d'un système après avoir finalisé l'installation.

### Afficher

* Il existe différentes méthodes pour afficher le nom d'hôte du système en cours:

  1. Sur un système utilisant systemd: `hostnamectl`

      ```
      $ hostnamectl
       Static hostname: localhost.localdomain
             Icon name: computer-vm
               Chassis: vm
            Machine ID: 34da4c68948147f191e518137380d42d
               Boot ID: 31ea12540c564c4b951311d0ef16a3b4
        Virtualization: kvm
      Operating System: CentOS Linux 7 (Core)
           CPE OS Name: cpe:/o:centos:centos:7
                Kernel: Linux 3.10.0-1127.19.1.e17.x86_64
          Architecture: x86-64
      ```

      ```
      $ hostnamectl status
       Static hostname: localhost.localdomain
             Icon name: computer-vm
               Chassis: vm
            Machine ID: 34da4c68948147f191e518137380d42d
               Boot ID: 31ea12540c564c4b951311d0ef16a3b4
        Virtualization: kvm
      Operating System: CentOS Linux 7 (Core)
           CPE OS Name: cpe:/o:centos:centos:7
                Kernel: Linux 3.10.0-1127.19.1.e17.x86_64
          Architecture: x86-64
      ```

  2. En affichant la variable d'environnement HOSTNAME

      ```
      $ echo $HOSTNAME
      localhost.localdomain
      ```

  3. Avec la commande `hostname`

      ```
      $ hostname
      localhost.localdomain
      ```

  4. En affichant le fichier de configuration <ins>/etc/hostname</ins>.  
     Sur certains distributions, le nom du fichier est en majuscules: <ins>/etc/HOSTNAME</ins>

      ```
      $ cat /etc/hostname
      localhost.localdomain
      ```

  5. Ou avec `uname`

      ```
      $ uname -n
      localhost.localdomain
      ```

### Modifier

* Pour modifier la hostname, là encore, plusieurs manières sont possibles:

  1. Modifier le fichier <ins>/etc/hostname</ins>  
     Avec un système sous systemd, il est inutile de redémarrer quoi que soit pour que les modifications soient prises en compte

      ```
      $ sudo vim /etc/hostname
      ```

  2. Utiliser `hostnamectl`

      ```
      $ sudo hostnamectl set-hostname vm-example
      $
      $ cat /etc/hostname
      vm-example
      ```

* Notons que dans tous les cas, la variable d'environnement ne change pas: cette variable est définie lorsqu'on se connecte. Il faut se déconnecter et se reconnecter pour voir les modifications d'environnement

  ```
  $ echo $HOSTNAME
  localhost.localdomain
  $ exit
  logout
  $
  $ su -
  # echo $HOSTNAME
  vm-example
  ```
