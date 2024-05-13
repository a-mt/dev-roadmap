---
title: Playbooks — intermédiaire
category: DevOps, Ansible
---

{% raw %}

## Escalade de privilèges

### become

* S'identifier directement en tant que root n'est pas une bonne pratique. À la place, un admin se connecte avec son propre compte et, s'il a besoin de privilèges que seul root possède, alors il utilise la commande sudo pour invoquer les privilèges de l'utilisateur root sur l'opération.

  Même chose avec Ansible, on configure un utilisateur "admin" dans l'inventaire et, quand c'est nécessaire, on invoque les privilèges root dans le playbook avec la directive `become: yes`

  ``` yml
  ---
  - name: Install nginx
    become: yes
    hosts: all
    tasks:
      - yum:
          name: nginx
          state: latest
  ```

### become_method

* Différentes méthodes permettent d'acquérir les privilèges root. sudo est la plus couramment utilisée et c'est elle qui est utilisée par défaut par ansible. Il est possible d'utiliser d'autres méthodes (pfxec, doas, ksu, runas) en spécifiant la directive `become_method: METHODNAME`

  ``` yml
  ---
  - name: Install nginx
    become: yes
    become_method: doas
    hosts: all
    tasks:
      - yum:
          name: nginx
          state: latest
  ```

### become_user

* Plutôt que d'exécuter une commande en tant que root, on peut vouloir exécuter une commande en tant qu'un autre utilisateur. Pour ce faire, on utilise `become_user: USERNAME`

  ``` yml
  ---
  - name: Install nginx
    become: yes
    become_user: nginx
    hosts: all
    tasks:
      - yum:
          name: nginx
          state: latest
  ```

### Variables ansible

On peut configurer l'escalade de privilèges en dehors du playbook, directement via des variables ansible

- dans l'inventaire

  ``` ini
  # inventory
  lamp-dev ansible_host=172.20.1.100 ansible_user=admin ansible_become=yes ansible_become_user=nginx
  ```

- dans le fichier de configuration

  ``` ini
  # /etc/ansible/ansible.cfg
  become        = True
  become_method = doas
  become_user   = nginx
  ```

- ou via la ligne de commande

  ``` bash
  $ ansible-playbook --become --become-method=doas --become-user=nginx --ask-become-pass
    ```

---

## Workflow

### register

* La directive `register: VARNAME` permet d'enregistrer le résultat d'une tâche dans une variable.  
  Ça nous permet d'utiliser (entre autres) la sortie ou le statut d'une tâche dans une autre tâche.  
  Note: On peut lancer le playbook avec le flag -v pour afficher le résultat des commandes, ou utiliser le module debug pour afficher des messages dans la console

  ``` yml
  ---
  - hosts: web2
    gather_facts: no
    tasks:
      - name: Run a script
        shell: sh /usr/local/bin/report_status.sh
        register: test
      - debug:
          var: test
  ```

### when

* La directive `when` permet d'exécuter une tâche uniquement si une condition donnée est vraie.  
  Par exemple, n'exécuter une tâche que si une variable donnée est vraie:

  ``` bash
  ansible-playbook copy_file_only_if.yml -e copy_file_only_if=true -i inventory -v
  ```
  ``` yml
  ---
  - name: copy script if not present
    gather_facts: no
    hosts: web2
    vars:
      remote_dest: /usr/local/bin/report_status.sh
    tasks:
      - copy:
          src: report_status.sh
          dest: "{{ remote_dest }}"
        when: copy_file_only_if is defined and copy_file_only_if|bool
  ```

  Exécuter si le fichier est exécutable:

  ``` yml
  ---
  - hosts: web2
    gather_facts: no
    vars:
      remote_dest: /usr/local/bin/report_status.sh
    tasks:
      - stat:
          path: "{{ remote_dest }}"
        register: file_status

      - debug: var=file_status
      - shell: echo "File report_status.sh is not executable, making it executable..." > /tmp/change.log
        when: file_status.stat.exists and file_status.stat.executable == false

      - name: Make the script executable
        file:
          path: "{{ remote_dest }}"
          mode: 0775
  ```

  Exécuter en fonction de la distribution de l'hôte:

  ``` yml
  ---
  - name: Install NGINX
    hosts: all
    tasks:
      - name: Install NGINX on Debian 16.04
        apt:
          name: nginx
          state: present
        when: ansible_os_family == "Debian" and
              ansible_distribution_version == "16.04"

      - name: Install NGINX on RedHat or Suse
        yum:
          name: nginx
          state: present
        when: ansible_os_family == "RedHat" or
              ansible_os_family == "SUSE"
  ```

  Exécuter en fonction de la sortie / statut d'une autre tâche:

  ``` yml
  - name: Check status of a service and email if it's down
    hosts: localhost
    tasks:
      - name: Check httpd status
        command: service httpd status
        register: result

      - mail:
          to: admin@company.com
          subject: Service Alert
          body: Http Service is down
        when: result.stdout.find('down') != -1
  ```
  ``` yml
  - name: Check if PHP is installed
    register: php_installed
    command: php -v
    ignore_errors: true

  - name: This task is only executed if PHP is installed
    debug: var=php_install
    when: php_installed|success

  - name: This task is only executed if PHP is NOT installed
    debug: msg='PHP is NOT installed'
    when: php_installed|failed
  ```

### block

* On peut avoir des répétitions entre différentes tâches. Avec les blocs, on peut regrouper logiquement les tâches et déplacer les directives communes au niveau du bloc. Par exemple, pour n'exécuter les deux tâches que si la distribution en cours est CentOS:

  ``` yml
  ---
  - hosts: all
    tasks:
      - when: ansible_facts.ansible_distribution == 'CentOS'
        become: true
        block:
        - name: Install httpd web server
          yum:
            name: httpd
            state: present
        - name: Start httpd
          service:
            name: httpd
            state: started
            enabled: true
  ```

### changed_when

* L'option `changed_when` permet de définir si la tâche a effectué des modifications ou non. Ça permet de déterminer, en fonction des codes retour ou des résultats, si un changement doit être signalé dans les statistiques Ansible et si un handler doit être déclenché ou non

  ``` yml
  - name: "Get list of files to remove"
    shell: ls -1 /tmp/emplacement/*.xml | grep -v un-fichier.xml | cat
    register: files_to_remove
    changed_when: False

  - name: "Cleanup files."
    file: name={{ item }} state=absent
    with_items: files_to_remove.stdout_lines
  ```

  On peut utiliser une liste de conditions

  ``` yml
  - command: /bin/fake_command
    register: result
    ignore_errors: True
    changed_when:
      - '"ERROR" in result.stderr'
      - result.rc == 2
  ```

### loop

* La directive `loop` permet d'exécuter plusieurs fois même une tâche sur les différentes valeurs d'une liste.  
  La variable `item` permet d'accéder à la valeur en cours à l'intérieur de la boucle

  ``` yml
  ---
  - name: Install Softwares
    hosts: all
    vars:
      packages:
        - name: nginx
          required: true
        - name: mysql
          required: true
        - name: apache
          required: false
    tasks:
      - name: Install "{{ item.name }}" on Debian
        apt:
          name: "{{ item.name }}"
          state: present
        when: item.required == true
        loop: "{{ packages }}"
  ```

### with_sequence

* `with_sequence` permet de boucler sur un intervalle numérique

  ``` yml
  - name: a simple way to use the sequence plugin create 4 groups
    group:
      name: "group{{ item }}"
      state: present
    with_sequence: count=4
  ```

* On peut spécifier le pas (*stride*)

  ``` yml
  - name: Create a series of directories with even numbers for some reason
    file:
      dest: "/var/stuff/{{ item }}"
      state: directory
    with_sequence: start=4 end=16 stride=2
  ```

* Et formatter la valeur générée (*format*)

  ``` yml
  - name: Create some test users
    user:
      name: "{{ item }}"  # testuser0e
      state: present
    with_sequence: start=0 end=32 format=testuser%02x
  ```

### with_items

* `with_items` permet, au même titre que loop, de boucler sur une liste.  
  loop (disponible depuis ansible 2.5) est plus récent que with_items, il est recommendé d'utiliser loop quand c'est possible

  ``` yml
  ---
  - hosts: all
    become: yes
    tasks:
      - name: Install applications
        yum:
          name: "{{ item }}"
          state: present
        with_items:
          - vim
          - sqlite
          - jq
  ```

* with_item aplanit la liste, ce n'est pas le cas de loop

  ``` yml
  ---
  - hosts: localhost
    connection: local
    vars:
      packages:
        - item1
        - [item2a, item2b]
        - item3
    tasks:
      - name: Loop with_items
        debug:
          msg: "{{ item }}"
        with_items: "{{ packages }}"
      - name: Loop loop
        debug:
          msg: "{{ item }}"
        loop: "{{ packages }}"
  ```

  ```
  TASK [Loop with_items] ****************************
  ok: [localhost] => (item=item1) => {
      "msg": "item1"
  }
  ok: [localhost] => (item=item2a) => {
      "msg": "item2a"
  }
  ok: [localhost] => (item=item2b) => {
      "msg": "item2b"
  }
  ok: [localhost] => (item=item3) => {
      "msg": "item3"
  }

  TASK [Loop loop] **********************************
  ok: [localhost] => (item=item1) => {
      "msg": "item1"
  }
  ok: [localhost] => (item=['item2a', 'item2b']) => {
      "msg": [
          "item2a",
          "item2b"
      ]
  }
  ok: [localhost] => (item=item3) => {
      "msg": "item3"
  }
  ```

### with_*

* Il existe d'autres types de directives with_, qui permettent de récolter des données de sources externes. On peut les considérer comme des scripts personnalisés qui peuvent effectuer des tâches spécifiques pour créer un objet auquel on accède à l'intérieur de la boucle

  ![](https://i.imgur.com/5d4pjtxl.png)

  ``` yml
  - name: View config file
    hosts: localhost
    tasks:
      - debug: var=item
        with_file:
          - /etc/hosts
          - /etc/resolv.conf
          - /etc/ntp.conf
  ```
  ``` yml
  - name: Get from multiple URLS
    hosts: localhost
    tasks:
      - debug: var=item
        with_url:
          - https://site1.com/get-servers
          - https://site2.com/get-servers
          - https://site3.com/get-servers
  ```
  ``` yml
  - name: Check multiple mongodb
    hosts: localhost
    tasks:
      - debug: msg="DB={{ item.database }} PID={{ item.pid }}"
        with_mongodb:
          - database: dev
            connection_string: "mongodb://dev.mongo/"
          - database: prod
            connection_string: "mongodb://prod.mongo/"
  ```

{% endraw %}