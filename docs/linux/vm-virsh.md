---
title: Virsh
category: Linux
---

* Virsh (prononcer veursh) est un programme permettant de gérer les machines virtuelles en ligne de commande.  
  Avant de pouvoir utiliser virsh, il faut installer libvirt et qemu.  
  libvirt inclut des utilitaires permettant d'interagir avec les machines virtuelles, et qemu-kvm permet de les créer et exécuter.

  ``` bash
  $ sudo dnf install libvirt qemu-kvm
  ```

## Fichier de configuration

* Pour créer une machine virtuelle, il faut d'abord définir ses spécifications dans un fichier de configuration XML.  
  Ici, on alloue 1G de RAM et 1 CPU, avec une architecture de 64 bits. Il s'agit là d'un simple exemple pour créer une machine bootable, une vraie VM aura également besoin d'une carte réseau, de stockage, et d'un système d'exploitation.

    <ins>testmachine.xml</ins>  

    ``` xml
    <domain type="qemu">
        <name>TestMachine</name>
        <memory unit="GiB">1</memory>
        <vcpu>1</vcpu>
        <os>
            <type arch="x86_64">hvm</type>
        </os>
    </domain>
    ```

    Note: hvm signifie *hardware virtual machine*

## Créer une VM

* Pour créer une VM à partir d'un fichier de configuration:

  ``` bash
  $ virsch define testmachine.xml
  Domain 'TestMachine' defined from testmachine.xml
  ```

## Lister les VM

* Pour lister les VM actives:

  ```
  $ virsh list


  Id   Name   State
  -------------------
  ```

* Pour lister toutes les VM, même inactives:

  ```
  $ virsh list --all


  Id   Name           State
  ------------------------------
  -    TestMachine    shut off
  ```

## Démarrer une VM

* Pour démarrer une VM:

  ```
  $ virsh start TestMachine
  Domain 'Test%achine started'
  ```
  ```
  $ virsh list

  Id   Name           State
  -----------------------------
  1    TestMachine    running
  ```

## Redémarrer une VM

* Pour redémarrer une VM (graceful stop):

  ```
  $ virsh reboot TestMachine
  Domain 'TestMachine' is being rebooted
  ```

* Si la machine ne répond pas, on peut la forcer à se réinitialiser:

  ```
  $ virsh reset TestMachine
  Domain 'TestMachine' was reset
  ```

## Arrêter une VM

* Pour arrêter une VM (graceful stop):

  ```
  $ virsh shutdown TestMachine
  Domain 'TestMachine' is being shutdown
  ```

* Si la machine est bloquée, on peut forcer l'arrêt:

  ```
  $ virsch destroy TestMachine
  Domain 'TestMachine' destroyed
  ```

## Supprimer une VM

* Pour supprimer complètement une VM, il faut l'arrêter et ensuite utiliser undefine.  
  Cette commande supprime la VM mais pas les données qui y étaient stockées — s'il y avait des disques qui y étaient associés.

  ```
  $ virsh undefine TestMachine
  ```

* Généralement, on veut conserver les données.  
  Mais pour tout supprimer, on peut utiliser l'option remove-all-storage:

  ```
  $ virsh undefine --remove-all-storage TestMachine
  Domain 'TestMachine' has been undefined
  ```

## Démarrage automatique

* Pour démarrer automatiquement une VM quand le véritable serveur est démarré:

  ```
  $ virsh autostart TestMachine
  Domain 'TestMachine' marked as autostarted
  ```

* Inversemment, pour ne pas démarrer automatiquement une VM:

  ```
  $ virsh autostart --disable TestMachine
  Domain 'TestMachine' unmarked as autostarted
  ```

## Détails d'une VM

* Pour afficher les resources virtuelles assignées à une VM:

  ```
  $ virsh dominfo TestMachine
  ```

  ![](https://i.imgur.com/nq5tqLB.png)

## Modifier les resources d'une VM

On peut augmenter les resources associées à une VM.  

* Pour assigner 2 CPU — au lieu d'1  
  (redémarrer pour que les modifications soient prises en compte):

  ```
  $ virsh setvcpus TestMachine 2 --config --maximum
  $ virsh setvcpus TestMachine 2 --config
  ```

* Pour assigner 80M de RAM  
  (redémarrer pour que les modifications soient prises en compte):

  ```
  $ sudo virsh setmaxmem TestMachine 80M --config
  $ sudo virsh setmem TestMachine 80M --config
  ```

## Accéder à la console de la VM

* Pour attacher la console d'une VM en cours d'execution:  
  (taper Entrée pour obtenir le prompt)

  ```
  $ virsh console TestMachine
  ```

  ![](https://i.imgur.com/OzA6b3v.png)