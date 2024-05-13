---
title: Rôles
category: DevOps, Ansible
---

Dans le monde de l'automatisation, attribuer un rôle à un serveur signifie tout faire pour qu'il devienne un serveur donné. Par exemple, pour qu'un serveur devienne un serveur de base de données mysql, on installe les dépendances de mysql, le package mysql lui-même, configure le service mysql et enfin la base de données et les utilisateurs.  
On pourrait le faire directement dans un playbook, ou dans des fichiers inclus, mais les tâches d'installation et de configuration d'une base de données restent sensiblement les mêmes à chaque fois qu'on veut créer un serveur BDD, que ce soit aux niveaux des tâches, variables ou handlers. Pour rendre son travail plus réutilisable, on utilise des rôles.

## Syntaxe

### Créer un rôle

Par exemple, si on veut créer un rôle "nginx", qui externalise en dehors du playbook les tâches qui installent et démarrent nginx:

* 1/ créer un répertoire <ins>roles/nginx</ins> dans le répertoire du playbook
* 2/ créer le répertoire et fichier <ins>tasks/main.yml</ins> à l'intérieur du répertoire du rôle et y placer les différentes tâches

  ``` yml
  $ vi roles/nginx/tasks/main.yml
  ---
  - name: Install Nginx
    package:
      name: nginx 
      state: latest

  - name: Start Nginx Service
    service:
      name: nginx 
      state: started
  ```

### Utiliser un rôle

Une fois le rôle crée

* 3/ mettre à jour le playbook: à la place des tâches, inclure le rôle via la directive `roles`

  ``` yml
  $ vi playbook.yml
  ---
  - hosts: node01
    become: true
    roles:
      - nginx
  ```

* On peut également passer des options additionnelles, spécifiques à un rôle en utilisant un objet:

  ``` yml
  # sans argument
  - name: Install and Configure MySQL
    hosts: db-server
    roles:
      - mysql
  ```
  ``` yml
  # avec argument
  - name: Install and Configure MySQL
    hosts: db-server
    roles:
      - role: mysql
        become: yes
        vars:
          mysql_user_name: db-user
  ```

---

## Hiérarchie de dossiers

À l'intérieur du répertoire d'un rôle, on peut au besoin créer les sous-répertoires suivants:

- **tasks**, définition des différentes tâches.  
  Le fichier main.yml est le fichier principal, qui est chargé par ansible lorsqu'on inclut un rôle. À l'intérieur de ce fichier, on peut inclure d'autres fichiers avec les directives include / import. 
  Les références aux fichiers (copy, script, template, tasks) inclus dans le rôle sont relatives à roles/ROLENAME/{files,templates,tasks}.

  ``` bash
  $ cat roles/example/tasks/redhat.yml
  - yum:
      name: "httpd"
      state: present
  ```
  ``` bash
  $ cat roles/example/tasks/debian.yml
  - apt:
      name: "apache2"
      state: present
  ```
  ``` bash
  $ cat roles/example/tasks/main.yml
  ---
  - import_tasks: redhat.yml
    when: ansible_facts['os_family']|lower == 'redhat'

  - import_tasks: debian.yml
    when: ansible_facts['os_family']|lower == 'debian'
  ```

- **vars**, définition des différentes variables

  ``` yml
  ---
  user: ''
  shell: /bin/bash
  ```

- **defaults**, définition des valeurs par défaut. La différence entre defaults et vars tient dans la précédence: les variables dans defaults seront écrasées si elles sont définies ailleurs. L'ordre de précédence des variables est comme suit:
    * les variables définies en ligne de commande avec `-e` — l'emporte toujours sur les autres définitions
    * celles définies dans l'inventory lorsqu'il s'agit de variables de connection (`ansible_user`, etc)
    * celles définies avec `vars` dans le playbook, les variables inclues ou les `vars` appartenant au rôle
    * le reste des variables définies dans l'inventory
    * les facts du système
    * et enfin les variables `defaults` — qui perdent en priorité par rapport à tout

- **handlers**, les handlers
- **templates**, tous les templates utilisés par les playbook

- **meta**, les dépendances de rôles (Ansible >= 1.2)

  ``` yml
  # roles/example/meta/main.yml
  dependencies:
    - role: docker-ssh
      when: "'' != ''"
  ```

## init

* On peut utiliser la ligne de commande pour créer un squelette de rôle:

  ``` bash
  $ ansible-galaxy init roles/mysql
  - Role roles/mysql was created successfully

  $ tree roles
  roles
  `-- mysql
      |-- README.md
      |-- defaults
      |   `-- main.yml
      |-- files
      |-- handlers
      |   `-- main.yml
      |-- meta
      |   `-- main.yml
      |-- tasks
      |   `-- main.yml
      |-- templates
      |-- tests
      |   |-- inventory
      |   `-- test.yml
      `-- vars
          `-- main.yml
  ```

## Emplacement par défaut

Pour trouver le répertoire correspondant au role, ansible cherche à deux emplacements:

- <ins>./roles/ROLENAME</ins>: le répertoire du playbook

- <ins>/etc/ansible/roles</ins>: l'emplacement par défaut. Ansible cherchera dans ce répertoire s'il ne trouve pas le rôle dans le répertoire du playbook. Cet emplacement peut être modifié dans le fichier de configuration

  ``` ini
  # /etc/ansible/ansible.cfg
  roles_path = /etc/ansible/roles
  ```

---

## Rôles publiés

### search

* Un fois qu'on a crée un rôle, on peut le partager avec la communauté via un repository github.  
  Pour chercher un rôle déjà existant / publié, on peut utiliser

  - le site Ansible Galaxy

    ![](https://i.imgur.com/udpWGcV.png)

  - ou la ligne de commande

    ``` bash
    ansible-galaxy search mysql
    ```

### install

* Pour télécharger un rôle:

  ``` bash
  ansible-galaxy install geerlingguy.mysql
  ```

  -p pour spécifier le path où télécharger le rôle (sera téléchargé dans le répertoire par défaut si omis)

  ``` bash
  ansible-galaxy install geerlingguy.nginx -p ./roles --ignore-certs
  - downloading role 'mysql', owned by geerlingguy
  - downloading role from https://github.com/geerlingguy/ansible-role-mysql/archive/4.3.4.tar.gz
  - extracting geerlingguy.mysql to /home/bob/playbooks/roles/geerlingguy.mysql
  /usr/lib64/python3.6/tarfile.py:2221: RuntimeWarning: The default behavior of tarfile extraction has been changed to disallow common exploits (including CVE-2007-4559). By default, absolute/parent paths are disallowed and some mode bits are cleared. See https://access.redhat.com/articles/7004769 for more details.
    RuntimeWarning)
  - geerlingguy.mysql (4.3.4) was installed successfully
  ```

* Pour vérifier l'emplacement par défaut où les rôles sont installés:

  ``` bash
  ansible-config dump | grep ROLE
  ```

### list

* Pour lister les rôles installés:

  ``` bash
  ansible-galaxy list
  ```
