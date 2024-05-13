---
title: Modules courants
category: DevOps, Ansible
---

{% raw %}
## debug

* Permet d'afficher des données dans la console

  ``` yml
  - debug:
      var: facts
  ```
  ``` yml
  - debug:
      msg: "Playbook has failed for {{ ansible_hostname }} node"
  ```
  ``` yml
  - name: Ansible register variable basic example
    shell: "find *.txt"
    args:
      chdir: "/Users/mdtutorials2/Documents/Ansible"
    register: find_output

  - debug:
      var: find_output

  output
  ======

  ok: [localhost] => {
      "find_output": {
          "changed": true, 
          "cmd": "find *.txt", 
          "delta": "0:00:00.008597", 
          "end": "2017-09-30 15:07:15.940235", 
          "rc": 0, 
          "start": "2017-09-30 15:07:15.931638", 
          "stderr": "", 
          "stderr_lines": [], 
          "stdout": "check.txt\ncheck2.txt", 
          "stdout_lines": [
              "check.txt", 
              "check2.txt"
          ]
      }
  }
  ```

## setup

* Permet de récupérer les facts.  
  Ce module est appelé automatiquement si activé dans les configurations avec `gathering = yes`, mais uniquement sur les hôtes sur lesquels le playbook est appliqué.

  ``` yml
  - hosts: all
    tasks:
    - setup:

  - hosts: inventory_server
    tasks:
      - template:
          src: inventory.csv.j2
          dest: /tmp/inventory.csv
        run_once: yes
  ```
  ``` yml
  ---
  - name: help me fix it playbook
    hosts: all
    gather_facts: no
    tasks:
      - name: alternative way to gather facts about remote host
        setup: filter='ansible_dist*' 
        register: facts
      - debug:
          var: facts
      - shell: echo "{{facts.ansible_facts.ansible_distribution}}" > /tmp/output.txt
  ```

## command

* Exécute une commande shell sur le serveur distant. 

  ``` yml
  ---
  - name: 'Exec cmd on localhost'
    hosts: localhost
    connection: local
    tasks:
      - name: 'Display content of /etc/resolv.conf'
        command: cat /etc/resolv.conf
  ```

  Accepte le paramètre `creates=/DIRNAME` pour n'exécuter la commande que si le répertoire donné n'existe pas

  ``` yml
  - name: Create /folder
    command: mkdir /folder creates=/folder
  ````

## shell

* Même chose que command mais n'échappe pas les caractères de shell, on peut ainsi utiliser des redirections et wildcards

  ``` yml
  - name: Load Inventory Data
    shell: mysql -f < /tmp/db-load-script.sql
  ```

  ``` yml
  - name: Ansible register variable basic example
    shell: "find *.txt"
    args:
      chdir: "/Users/mdtutorials2/Documents/Ansible"
  ```

## yum

* Pour installer un package, utiliser le module correspondant au gestionnaire de package de l'hôte: apt pour debian, yum pour centos ou redhat.  
   Avec ansible 2.0, un nouveau module "package" est disponible, ce qui évite d'avoir à utiliser différents modules pour différentes distributions — mais garder en tête que le nom du package peut différer suivant la distribution, par exemple "httpd" sous centos est "apache2" sous ubuntu

  ``` yml
  ---
  - hosts: web1
    tasks:
    - yum:
        name: http://mirror.centos.org/centos/7/os/x86_64/Packages/wget-1.14-18.el7_6.1.x86_64.rpm
        state: present
  ```
  ``` yml
  ---
  - hosts: all
    tasks:
      - name: Install unzip package
        yum:
          name: unzip-5.52
          state: present
  ```
  ``` yml
  ---
  - hosts: web1
    tasks:
    - yum: name=sudo state=latest
    - yum: name=vsftpd-2.2.2 state=present allow_downgrade=yes
  ```

  ``` yml
  ---
  - hosts: all
    become: true
    tasks:
      - yum:
          name:
          - libselinux-python
          - libsemanage-python 
          - firewalld
          state: present
  ```



## file

* Créer un fichier sur le serveur distant

  ``` yml
  - name: Create File
    file:
      path: /opt/news/blog.txt
      state: touch
      owner: sam
      group: sam
      mode: '0644'
  ```
  ``` yml
  - name: Create Directory
    file:
      path: /opt/app/web
      state: directory
  ```

## copy

* Copie un fichier présent sur le serveur Ansible vers le serveur distant

  ``` yml
  - name: Copy file from source to destination
    copy: src=/source_file dest=/destination
  ```

* Utiliser le paramètre `remote_src=yes` pour copier un fichier présent sur le serveur distant  
  vers un autre emplacement sur ce même serveur distant

  ``` yml
  - copy:
      src:  /usr/src/blog/index.html
      dest: /opt/blog
      remote_src: yes
  ```

* Plutôt que src, utiliser `content` pour créer un fichier à partir d'une chaîne de caractères

  ``` yml
  ---
  - hosts: node01
    become: true
    tasks:
      - name: create a file
        copy:
          dest: /opt/file.txt
          content: "This file is created by Ansible!"
  ```

## template

* Interpole les variables présentes à l'intérieur du fichier et copie le fichier qui en résulte vers le serveur distant

  ``` bash
  $ cat templates/agents.conf.j2
  hostname, ipaddress, monitor_port, type, protocol
  {% for host in groups['lamp_app'] %}
    {{ host }},
    {{ hostvars[host]['ansible_host'] }},
    {{ hostvars[host]['monitor_port'] }},
    {{ hostvars[host]['protocol'] }}
  {% endfor %}
  ```
  ``` yml
  # playbook.yml
  - hosts: monitoring_server
    become: yes
    tasks:
      - template:
          src: 'templates/agents.conf.j2'
          dest: '/etc/agents.conf
  ```

* Toutes les variables accessibles dans le playbook sont également accessibles dans le template, et on peut définir des variables supplémentaires pour la tâche en cours avec `vars`

  ```
  {% for host in groups[GROUP_NAME] %}
  {{ host }} {{ hostvars[host]['ansible_host'] }}
  {% endfor %}
  ```
  ``` yml
  - template: src=templates/hosts.j2 dest=/tmp/hosts.txt
    vars:
      GROUP_NAME: america
  ```

## script

* Copie un script présent sur le serveur Ansible vers le serveur distant et execute ce script

  ``` yml
  - name: Run a script on remote server
    scripts: /some/local/script.sh -arg1 -arg2
  ```

## git

* Clone un repository git

  ``` yml
  - name: Copy the code from repository
    git: repo={{ repository }} dest=/var/www/html/  force=yes
  ```

## archive

* Compresse un répertoire  
  Les formats acceptés sont: zip, tar, bz2, xz, gz (par défaut)

  ``` yml
  - archive:
      path: /opt
      dest: /root/opt.zip
      format: zip
  ```

## unarchive

* Décompresse une archive  
  Le module unarchive permet d'envoyer une archive présent sur le serveur ansible vers l'hôte distant, avant de l'extraire. Si l'archive est déjà présente sur le serveur distant, ajouter la directive `remote_src: yes`

  ``` yml
  - name: Uncompress an archive
    unarchive:
      src: /tmp/web.gz
      dest: /opt/app/web
      remote_src: yes
  ```
  ``` yml
  - name: Extract data.tar.gz
    unarchive:
      src: /root/data.tar.gz
      dest: /srv
      remote_src: yes

  - name: Delete data.tar.gz
    file: path=/root/data.tar.gz state=absent
  ```

## lineinfile

* Permet d'ajouter une ligne dans un fichier si cette ligne n'existe pas déjà

  ``` yml
  - lineinfile:
      path: /etc/resolv.conf
      line: 'nameserver 10.1.250.10'
  ```

* Par défaut la commande échouera si le fichier n'existe pas. Utiliser le paramètre `create=true` pour créer le fichier à la volée si nécessaire

  ``` yml
  - name: "Create or update index.html file."
    lineinfile:
      path: /var/www/html/index.html
      line: "Welcome to ansible-beginning course"
      create: true
  ```

* Pour insérer la ligne en début de fichier:

  ``` yml
  - lineinfile:
      path: /var/www/html/index.html
      line: 'Hello World'
      state: present
      insertbefore: BOF
  ```

## blockinfile

* Même principe mais pour un bloc de données

  ``` yml
  - blockinfile:
      path: /var/www/html/index.html
      block: |
        Welcome to KodeKloud!
        This is Ansible Lab.
      insertbefore: BOF
      owner: apache
      group: apache
  ```

## replace

* Permet de remplacer une ligne dans un fichier par une autre

  ``` yml
  - replace:
      path: /etc/httpd/conf/httpd.conf
      regexp: 'DirectoryIndex index.html'
      replace: 'DirectoryIndex index.php'
  ```

## find

* Permet de lister les fichiers qui correspondent aux crtières recherchés

  ``` yml
  - name: Find files
    find:
      paths: /opt/data
      recurse: yes
      age: 120
      size: 1m
    register: file

  - name: Copy files
    command: "cp {{ item.path }} /opt"
    with_items: "{{ file.files }}"
  ````

## firewalld

* Permet de modifier les règles de firewalld

  ``` yml
  # Bloquer le port 161/udp
  # Pour vérifier les ports bloqués: firewall-cmd --list-ports --zone=block
  --- 
  - hosts: web1
    tasks:
      - firewalld:        
          port: 161/udp
          zone: block
          permanent: yes
          immediate: yes
          state: enabled
  ```

  ``` yml
  # Autoriser les connexions à patir du serveur Ansible sur le port 443 et 22
  ---
  - hosts: web1
    tasks:
      - firewalld:
          zone: internal
          port: 443/tcp
          source: 172.20.1.2
          state: enabled
          permanent: true
          immediate: true

    - service:
        name: firewalld
        state: reloaded
  ```

## service

* Permet de stopper, arrêter ou redémarrer un service.  Notons qu'on indique à Ansible l'état dans le lequel le service doit être: "started" et non "start". Si le service est déjà dans cet état, alors ansible ne fait rien

  ``` yml
  - name: Start the database service
    service: name=postgresql state=started
  ```
  ``` yml
  - name: http service state
    service: name=httpd state=started enabled=yes
  ```

## user, group

* Permet de créer un groupe et utilisateur respectivement

  ``` yml
  - name: Create group developers
    group:
      name: developers

  - name: Create user Maria
    user:
      name: maria
      uid: 1001
      group: developers
      shell: /bin/bash
  ```

  ``` yml
  - name: Create user neymarsabin, expires at the end of the year 2023
    user:
      name: neymarsabin
      expires: 1704067199  # December 31, 2023 11:59:59 PM GMT == 1704067199 epoch
  ```

## authorized_keys

* Permet d'ajouter des clés RSA autorisées

  ``` yml
  - name: Configure ssh keys
    authorized_keys:
      user: maria
      state: present
      key: |
      ssh-rsa AAAV3Nza... root@97a1b9c3a
  ```

## cron

* Permet d'ajouter / supprimer un cronjob

  ``` yml
  - name: Run free.sh every 2 hours
    cron:
      job: sh /root/free.sh 
      minute: 0
      hour: "*/2"
      month: "*"
      day: "*"
      weekday: "*"
  ```
  ``` yml
  - cron:
      name: Delete /tmp after every reboot
      job: rm -rf /tmp/*
      special_time: reboot
  ```
  ``` yml
  - name: Creates a cron in the "ansible_yum" crontab
    cron:
      name: yum update
      weekday: 0
      minute: 5
      hour: 8
      user: root
      job: "yum -y update"
      cron_file: ansible_yum
  ```
  ``` yml
  - name: Remove cron job named "Check Memory"
    cron:
      name: "Check Memory"
      state: absent
  ```

## lvg, lvol

* Les modules lvg et lvol permettent de créer des groupes de volumes et volumes logiques (LVM)

  ``` yml
  - name: Create LVM Volume Group
    lvg:
      vg: vg1
      pvs: /dev/sdb1,/dev/sdb2

  - name: Create LVM Volume
    lvol:
      vg: vg1
      lv: lvol1
      size: 2g
  ```

## filesystem

* Permet de formatter une partition

  ``` yml
  - name: Create Filesystem
    filesystem:
      fstype: ext4
      dev: /dev/vg1/lvol1
      opts: -cc
  ```

## mount

* Permet de monter une partition

  ``` yml
  - name: Mount Filesystem
    mount:
      fstype: ext4
      src: /etc/vg1/lvol1
      path: /opt/app
      state: mounted
  ```

## mysql_user, mysq_db

* Permet de créer un utilisateur et BDD mysql

  ``` yml
  - mysql_db:
      name: '{{ dbname }}'
      state: present
  - mysql_user:
      name: '{{ dbuser }}'
      password: '{{ dbpassword }}'
      host: 172.20.1.100
      priv: '*.*:ALL'
      state: present
  ```
{% endraw %}