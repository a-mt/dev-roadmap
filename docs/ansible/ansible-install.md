---
title: Installer
category: DevOps, Ansible
---

## Installer un serveur Ansible

* Ansible peut être installé sous un système Linux uniquement. Soit à partir du repository de la distribution, du repository d'Ansible (pour récupérer la dernière version) ou via pip (package manager de python).  
  Les fichiers par défaut (ansible.cfg, hosts) ne sont crées que lorsqu'on installe ansible via un package manager système et non pip — en cas d'installation via pip, les créer manuellement

  ``` bash
  # RedHat or CentOS
  sudo yum install ansible

  # Fedora
  sudo dnf install ansible

  # Ubuntu
  sudo apt-get install ansible

  # Pip
  sudo pip install ansible
  ```

* <ins>Exemple d'installation sous Ubuntu</ins>:

  ``` bash
  $ docker run -it --rm ubuntu:latest bash

  # add-apt-repository ansible
  $ apt update
  $ apt install software-properties-common
  $ add-apt-repository --yes --update ppa:ansible/ansible

  # install ansible
  $ apt-cache policy ansible
  $ apt install ansible less

  # check version
  $ ansible --version
  ansible [core 2.16.6]
    config file = /etc/ansible/ansible.cfg
    configured module search path = ['/root/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
    ansible python module location = /usr/lib/python3/dist-packages/ansible
    ansible collection location = /root/.ansible/collections:/usr/share/ansible/collections
    executable location = /usr/bin/ansible
    python version = 3.10.12 (main, Nov 20 2023, 15:14:05) [GCC 11.4.0] (/usr/bin/python3)
    jinja version = 3.0.3
    libyaml = True

  # init ansible.cfg
  $ cat /etc/ansible/ansible.cfg
  $ ansible-config init --disabled -t all > /etc/ansible/ansible.cfg
  ```

## Configurer les Agents contrôlés par Ansible

De nombreux outils d'orchestration nécessitent d'installer un agent sur les systèmes cibles, mais ce n'est pas le cas d'Ansible. Pour fonctionner avec des serveurs distants, Ansible doit simplement

1. pouvoir établir une connectivité avec ces serveurs.
2. pouvoir récolter des informations sur le serveur et exécuter les modules Ansible.  

### Connexion

* Pour établir une connection avec les serveurs:  
  Ansible utilise SSH sous Linux (ssh) ou Powershell remoting sous Windows (winrm).   
  Le type de connection utilisé est spécifié dans l'inventaire dans la variable `ansible_connection` (ou ssh par défaut)

  ``` bash
  web  ansible_host=server1.company.com ansible_connection=ssh
  db   ansible_host=server2.company.com ansible_connection=winrm
  mail ansible_host=server3.company.com ansible_connection=ssh
  web2 ansible_host=server4.company.com ansible_connection=winrm
  localhost ansible_connection=localhost
  ```

#### Créer et distribuer des clés SSH

* Une première possibilité pour se connecter en SSH est d'utiliser une authentification username/password.  
  Note: utiliser `ansible_ssh_pass` est deprécié en faveur de `ansible_password`

  ```
  web1 ansible_host=172.20.1.180 ansible_user=bob ansible_password=Passw0rd
  ```

* En production, il est recommendé d'utiliser des clés RSA et non des mots de passe.  
  Pour mettre en place une authentification par clé:

  1. Créer des clés RSA sur l'hôte Ansible

      ``` bash
      $ mkdir .ssh
      $ ssh-keygen
      Generating public/private rsa key pair.
      Enter file in which to save the key (/home/ansible/.ssh/id_rsa): /home/ansible/.ssh/web1
      Enter passphrase (empty for no passphrase): 
      Enter same passphrase again: 
      Your identification has been saved in /home/ansible/.ssh/web1.
      Your public key has been saved in /home/ansible/.ssh/web1.pub.
      The key fingerprint is:
      SHA256:ghk0j5TvjtKqPtRIwlkmeixfqqDDkjCOit/i9rI433Q ansible@ansible-controller
      The key's randomart image is:
      +---[RSA 2048]----+
      |    +.           |
      | . =.+           |
      |o.= o..          |
      |++o .+.          |
      |o+ooo.. S        |
      |+oo.  ..         |
      |O+ ..oE          |
      |X==+o..          |
      |OXBB+            |
      +----[SHA256]-----+
      ```

  2. Placer la clé RSA publique créée dans le fichier authorized_keys de l'hôte distant. Les clés sont associées à un utilisateur donné: pour autoriser l'authentification en tant qu'utilisateur "bob" via clé RSA, ajouter la clé RSA (publique) dans les clés autorisées pour bob — <ins>/home/bob/.ssh/authorized_keys</ins>

      On peut le faire manuellement: se connecter à l'hôte distant et modifier le fichier authorized_keys.  
      Ou on peut ajouter une clé dans le fichier authorized_keys d'un serveur distant via `ssh-copy-id`

      ``` bash
      $ ssh-copy-id -i .ssh/web1 bob@web1
      /bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/ansible/.ssh/web1.pub"
      /bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
      /bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
      bob@web1's password: 

      Number of key(s) added: 1

      Now try logging into the machine, with:   "ssh 'bob@web1'"
      and check to make sure that only the key(s) you wanted were added.
      ```

  3. Vérifier qu'on peut se connecter en SSH avec la clé RSA (privée)

      ``` bash
      $ ssh bob@web1 -i .ssh/web1

      [bob@web1 ~]$ cat ~/.ssh/authorized_keys 
      ssh-rsa AAAA[...]d ansible@ansible-controller
      ```

  4. Modifier l'inventaire.  
     Spécifier le path de la clé RSA privé dans la variable `ansible_ssh_private_key_file`

      ``` bash
      $ vi inventory 
      web1 ansible_host=172.20.1.180 ansible_user=bob ansible_ssh_private_key_file=/home/ansible/.ssh/web1
      ```

  5. Tester la connectivité vers web1.  
     Note: le module ping n'effectue pas un ping ICMP, mais vérifie si Ansible peut se connecter à la machine cible via SSH en utilisant les informations d'identification configurées

      ``` bash
      $ ansible -m ping -i inventory web1
      web1 | SUCCESS => {
          "changed": false, 
          "ping": "pong"
      }
      ```

      Utiliser les deux-points et non les virgules pour spécifier plusieurs hôtes / groupes

      ``` bash
      $ ansible -m ping host1:host2
      ```

### Interpréteur Python

Pour récolter des informations sur le serveur et exécuter les modules Ansible,  
Python doit être installé sur l'hôte distant

- S'assurer que Python (2 ou 3) est installé sur la machine distante

  ``` bash
  $ python --version
  ```

- Si ce n'est pas le cas:  
  On peut utiliser Ansible à condition de n'utiliser que le module `raw` (qui se contente d'exécuter une commande shell) et de désactiver la récolte d'informations avec `gather_facts: no`

  <ins>Installer python sur les hôtes contrôlés par Ansible</ins>:  
  Note: `become: yes` revient à effectuer un `sudo su`

  ``` yml
  - hosts: all
    become: yes
    gather_facts: no
    pre_tasks:
    - name: 'install python'
      raw: 'apt-get -y install python'
  ```

- Si plusieurs version Python sont installées:  
  On peut [forcer l'utilisation de Python3](https://docs.ansible.com/ansible/latest/reference_appendices/python_3_support.html#using-python-3-on-the-managed-machines-with-commands-and-playbooks) avec la variable `ansible_python_interpreter`

  ``` bash
  $ ansible-playbook sample-playbook.yml -e "ansible_python_interpreter=/usr/bin/python3"
  ```
