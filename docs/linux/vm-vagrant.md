---
title: Vagrant
category: Linux
---

* Vagrant est un utilitaire permettant d'automatiser la création de VM via des fichiers de configuration — un peu sur le même principe que docker-compose pour docker.

* Cela permet de facilement créer et déployer une VM, ainsi que sauvegarder tout le travail et les configurations apportées dans un fichier de configuration. Ainsi, on peut facilement partager ses configurations avec d'autres, et rapidement lancer des VMs. C'est particulièrement utile lorsqu'on a des systèmes complexes impliquant plusieurs VM.  

* Vagrant supporte divers fournisseurs, dont:

    ```
    VirtualBox
    VMware
    Hyper-V
    Docker
    ````

## Installer

* Aller sur [https://www.vagrantup.com/](vagrantup.com) > Download  
  Et suivre les instructions

* Pour voir la liste des commandes vagrant disponibles:

    ```
    vagrant
    ```

## Initialiser un Vagrantfile

* Une *box* est un terme vagrant désignant un environnement vagrant packagé: il contient une image OS ainsi que les scripts nécessaires à la configuration de l'environnement. Il existe des boxes qui contiennent plusieurs VMs, ce qui permet de rapidement créer des clusters, comme un cluster kubernetes.

  La liste des boxes est disponible sur [https://app.vagrantup.com/boxes/search](app.vagrantup.com)

* Vagrant init iitialise la box dans le répertoire courant en créant un Vagrantfile.  
  Ce fichier contient les instructions pour customiser la box.  
    Pour une machine CentOS:

    ```
    $ vagrant init centos/7
    $ ls
    Vagrantfile
    ```

* Pour démarrer la VM à partir du fichier, présent dans le path courant:  
  Vagrant télécharge l'image, crée une VM, lui donne un nom aléatoire, et configure tous les paramètres comme la redirection de port

    ```
    $ vagrant up
    Bringing machine 'default' up with 'virtualbox' provider...
    ==> default: Importing base box 'centos/7'...
    ==> default: Matching MAC address for NAT networking
    ==> default: Checking if box 'centos/7' version '1905.1' ip up to date...
    ==> default: Setting the name of the VM: centos2_default_1586895892002_53453
    ==> default: Preparing network interfaces based on configuration...
        default: Adapter 1: nat
    ==> default: Forwarding ports...
    ```

* Pour accéder à la VM via SSH:

    ```
    $ vagrant ssh
    [vagrant@localhost ~]$
    ```

## Format Vagrantfile

* Le fichier vagrant commence par un bloc de configuration contenant l'image utilisée par la box.  
  C'est tout ce qu'il y a de configuré après l'initialisation.

    ```
    Vagrant.configure("2") do |config|$

        config.vm.box = "centos/7"

    end
    ```

  ![](https://i.imgur.com/ChMph1y.png)

* Pour la redirection de port:

    ```
        config.vm.network "forwarded_port", guest: 80, host: 8080
    ```

* Pour un répertoire synchronisé entre l'hôte et la VM — ce qui permet de facilement déplacer des fichiers d'un côté à l'autre:

    ```
        config.vm.synced_folder "../data", "/vagrant_data"
    ```

* Pour configurer les paramètres de CPU et de RAM:

    ```
        config.vm.provider "virtualbox" do |vb|
            vb.memory = "1024"
        end
    ```

* Pour exécuter un script shell au démarrage:

    ```
        config.vm.provision "shell", inline: <<-SHELL
            apt-get update
            apt-get install -y apache
        SHELL
    ```

* Après avoir modifié le fichier Vagrantfile, utiliser `vagrant reload` pour mettre à jour la VM

