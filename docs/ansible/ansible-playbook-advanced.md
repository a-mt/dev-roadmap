---
title: Playbooks — avancé
category: DevOps, Ansible
---

{% raw %}
## Gestion des erreurs

### ignore_errors

* Si une tâche échoue (qu'elle retourne un statut différent de 0), alors une erreur est levée et le provisioning s'arrête — les tâches suivantes ne seront pas exécutées. Si on veut continuer d'exécuter les tâches suivantes même si une tâche donnée échoue, alors il faut ajouter la directive `ignore_errors: true`

  ``` yml
  - name: Check if git is installed
    shell: dpkg -l git
    register: git_installed
    ignore_errors: true

  - name: Git is installed
    shell: git --version > /tmp/is_git_installed.txt
    when: git_installed.rc == 0

  - name: Git is not installed
    shell: echo 'Oops, git is missing' > /tmp/is_git_installed.txt
    when: git_installed.rc != 0
  ```

### fail

* Le module  `fail` déclenche une erreur et affiche un message donné.  
  Il peut être utilisé pour stopper l'exécution du playbook lorsqu'une condition `when` est remplie.

  ``` yml
  - name: Using fail and when together
    fail:
      msg: The system may not be provisioned according to the CMDB status.
    when: cmdb_status != "to-be-staged"
  ```

### rescue, always

* On peut ajouter une section `rescue` à un `block`. Lorsque le playbook est exécuté, si une des tâches du bloc échoue, alors le playbook exécutera les tâches définies dans la section rescue.
  On peut également ajouter une section `always`, qui sera toujours exécutée à la fin du bloc, que des tâches aient échoué ou non

  ``` yml
  - hosts: all
    tasks:
      - block:
          - name: Install MySQL
            yum: name=mysql-server state=present

          - name: Start MySQL service
            service: name=mysql-server state=started

        become_user: db-user
        when: ansible_facts['distribution'] == 'CentOS'
        rescue:
          - mail:
              to: admin@company.com
              subject: Installed failed
              body: DB Install failed at {{ ansible_failed_task.name }}
        always:
          - mail:
              to: admin@company.com
              subject: Installation status
              body: DB Install status - {{ ansible_failed_result }}
  ```

### any_errors_fatal

* Par défaut, si l'exécution d'une tâche échoue, les tâches suivantes du playbook ne seront pas exécutées sur ce serveur. Mais s'il y a plusieurs serveurs impliqués, ansible essaiera toujours de terminer autant de serveurs que possible

  ![](https://i.imgur.com/8rqDCHl.png)

* La directive `any_errors_fatal: true` permet d'arrêter l'exécution du playbook sur l'ensemble des serveurs dès lors que la tâche a échoué sur un des serveurs

  ``` yml
  - hosts: all
    any_errors_fatal: true
    tasks:
      ...
  ```

  ![](https://i.imgur.com/CMl6YBq.png)

### max_fail_percentage

* Plutôt qu'any_errors_fatal, on peut choisir quelque chose entre les deux: si l'exécution d'une tâche échoue sur plus de X% des serveurs, alors arrêter l'exécution du playbook sur l'ensemble des serveurs. Pour ce faire, utiliser la directive `max_fail_percentage: 30` pour 30%

  ``` yml
  - hosts: all
    max_fail_percentage: 30
    tasks:
      ...
  ```

### failed_when

* La directive `failed_when` permet d'ajouter une condition pour détecter si la tâche doit être considérée comme en échec — même si le statut en sortie de la commande est 0. Par exemple, vérifier le contenu de la sortie standard pour vérifier si tout c'est bien passé

  ``` yml
  ---
  - name: Install httpd
    hosts: web1
    gather_facts: no
    tasks:
      - name: Install httpd
        yum:
          name: httpd
          state: present

      - name: Check httpd error logs
        command: cat /var/log/httpd/error_log
        register: results
        failed_when: "'Error' in results.stdout"

      - name: start service
        service:
          name: httpd
          state: started

      - name: Create a file
        file:
          path: /tmp/file
          state: touch
  ```
---

## Concurrence

### strategy

* Par défaut, Ansible utilise une stratégie linéaire (*linear*): Ansible exécute chaque tâche sur tous les serveurs et attend que la tâche en cours soit terminée sur tous les serveurs avant de passer à la suivante. Cette stratégie permet d'utiliser les données générées lors d'une action sur une machine comme entrée pour une action sur une autre machine. Si un serveur est plus lent que les autres, l'éxecution du playbook est ralentie sur l'ensemble des serveurs

  On peut modifier ce comportement avec la directive `strategy: free` (Ansible >= 2.0): chaque serveur exécute ses tâches indépendamment des autres, et n'attend pas que la tâche soit terminée sur les autres avant de passer à la suite. Avec cette stratégie, il n'est pas possible pour un hôte de dépendre des données générées par un autre hôte.

  ``` yml
  - name: Deploy web application
    hosts: server1,server2,server3
    strategy: free
    tasks:
      ...
  ```

[Strategies](https://docs.ansible.com/ansible/2.8/user_guide/playbooks_strategies.html)

### forks

* Ansible utilise des processus parallèles, aka *forks*, pour gérer l'exécution du playbook sur les hôtes distants.  
  Par défaut, un maximum de 5 processus sont lancés en parallèle — autrement dit, ansible peut maintenir 5 connexions en simultané.

* On peut modifier le nombre de forks maximal dans les configurations

  ``` ini
  # /etc/ansible/ansible.cfg
  forks = 5
  ```

  Ou utiliser l'option -f

  ``` bash
  $ ansible-playbook -f 10 playbook.yml
  ```

* Exemple: on a 4 serveurs, 3 forks, et 3 tâches à exécuter (le temps de traitement de chaque tâche est 5 de secondes):

  - la tâche 1 s'exécute en parallèle sur les serveurs 1-3
  - la tâche 1 s'exécute sur le serveur 4
  - la tâche 2 s'exécute en parallèle sur les serveurs 1-3
  - la tâche 2 s'exécute sur le serveur
  - la tâche 3 s'exécute en parallèle sur les serveurs 1-3
  - la tâche 3 s'exécute sur le serveur

  ``` bash
  $ cat playbook.yml
  ---
  - hosts: all
    gather_facts: false
    tasks:
      - name: Task 1
        shell: sleep 5 && date '+%M:%S' 
        register: date1
      - name: Task 2
        shell: sleep 5 && date '+%M:%S'
        register: date2
      - name: Recap tasks
        debug:
          msg: "{{ ansible_host }} {{ date1.stdout }} {{date2.stdout}}"
  ```
  ``` bash
  $ ansible-playbook -f 3 playbook.yml -i inventory

  PLAY [all] ************************************

  TASK [Task 1] *********************************
  changed: [local2]
  changed: [local3]
  changed: [local1]
  changed: [local4]

  TASK [Task 2] *********************************
  changed: [local1]
  changed: [local2]
  changed: [local3]
  changed: [local4]

  TASK [Task 3] *********************************
  changed: [local1]
  changed: [local2]
  changed: [local3]
  changed: [local4]

  TASK [Recap tasks] ****************************
  ok: [local1] => {
      "msg": "127.0.0.1 31:34 31:44 31:54"
  }
  ok: [local2] => {
      "msg": "127.0.0.2 31:34 31:44 31:54"
  }
  ok: [local3] => {
      "msg": "127.0.0.3 31:34 31:44 31:54"
  }
  ok: [local4] => {
      "msg": "127.0.0.4 31:39 31:49 32:00"
  }
  ```

* Le nombre de forks détermine le nombre maximum de connexions parallèles  
  qui peuvent être initiées à partir du serveur Ansible afin d'exécuter des commandes.

### serial

* On peut vouloir exécuter les tâches par batch: plutôt que de passer aux serveurs suivants une fois que la première tâche est terminée, on continue d'exécuter la deuxième tâche sur les mêmes serveurs (et ce ainsi de suite pour le nombre de tâches spécifiées) avant de passer le relai aux serveurs suivants.

* On spécifie le nombre de tâches par batch avec la directive `serial`

  ``` yml
  ---
  - hosts: all
    serial: 3
  ```
  ``` yml
  ---
  - hosts: all
    serial: "30%"
  ```

* Exemple: on a 4 serveurs (5 forks), 3 serial, et 3 tâches à exécuter (le temps de traitement de chaque tâche est 5 de secondes):

  - la tâche 1 s'exécute en parallèle sur les serveur 1-3
  - la tâche 2 s'exécute en parallèle sur les serveur 1-3
  - la tâche 3 s'exécute en parallèle sur les serveur 1-3

  - la tâche 1 s'exécute sur le serveur 4
  - la tâche 2 s'exécute sur le serveur 4
  - la tâche 3 s'exécute sur le serveur 4

  ``` bash
  $ cat playbook.yml
  ---
  - hosts: all
    serial: 3
    gather_facts: false
    tasks:
      - name: Task 1
        shell: sleep 5 && date '+%M:%S' 
        register: date1
      - name: Task 2
        shell: sleep 5 && date '+%M:%S'
        register: date2
      - name: Task 3 
        shell: sleep 5 && date '+%M:%S'
        register: date3
      - name: Recap tasks
        debug:
          msg: "{{ ansible_host }} {{ date1.stdout }} {{date2.stdout}} {{date3.stdout}}"
  ```
  ``` bash
  $ ansible-playbook playbook.yml
  PLAY [all] ************************************

  TASK [Task 1] *********************************
  changed: [local2]
  changed: [local3]
  changed: [local1]

  TASK [Task 2] *********************************
  changed: [local1]
  changed: [local2]
  changed: [local3]

  TASK [Task 3] *********************************
  changed: [local1]
  changed: [local3]
  changed: [local2]

  TASK [Recap tasks] ****************************
  ok: [local1] => {
      "msg": "127.0.0.1 34:02 34:08 34:13"
  }
  ok: [local2] => {
      "msg": "127.0.0.2 34:02 34:08 34:13"
  }
  ok: [local3] => {
      "msg": "127.0.0.3 34:02 34:08 34:13"
  }

  PLAY [all] ************************************

  TASK [Task 1] *********************************
  changed: [local4]

  TASK [Task 2] *********************************
  changed: [local4]

  TASK [Task 3] *********************************
  changed: [local4]

  TASK [Recap tasks] ****************************
  ok: [local4] => {
      "msg": "127.0.0.4 34:18 34:23 34:28"
  }
  ```

* Le serial détermine le nombre de tâches qui seront exécutées par connexion (1 par défaut)

---

## Déléguer des tâches

### delegate_to

La directive `delegate_to` permet d'executer une tâche sur un autre hôte que celui en cours.  
On peut par exemple l'utiliser

* pour récupérer le résultat d'une commande exécutée

  ``` yml
  - hosts: db
    tasks:
      - name: Collect webserver server name
        register: webserver_whoami
        shell: cat /opt/whoami
        delegate_to: "{{ groups['web'][0] }}"
        ignore_errors: True

      - name: Store webserver server name
        shell: "echo '{{ webserver_whoami.stdout }}' > /opt/webserver"
  ```

* envoyer le résultat d'une commande

  ``` yml
  - hosts: all
    gather_facts: yes
    tasks:
      - template:
          src: report.csv.j2
          dest: /tmp/report.csv
        delegate_to: reporting_server
        run_once: yes
  ```

* pour synchroniser un répertoire du serveur ansible avec l'hôte

  ``` yml
  tasks:
    - name: recursively copy files from management server to target
      command: rsync -a /path/to/files {{ inventory_hostname }}:/path/to/target/
      delegate_to: 127.0.0.1
  ```

### local_action

* Il existe une syntaxe abrégée pour un delegate_to 127.0.0.1: `local_action`

  ``` yml
  tasks:
    - name: recursively copy files from management server to target
      local_action: command rsync -a /path/to/files {{ inventory_hostname }}:/path/to/target/
  ```

### delegate_facts

* Par défaut, les *facts* récupérés par une tâche déléguée provient de l'hôte en cours et non de l'hôte auquel est délégué la tâche. Ce comportement peut être modifié avec l'option `delegate_facts`

  ``` yml
  - hosts: app_servers
    tasks:
      - name: gather facts from db servers
        setup:
        delegate_to: "{{item}}"
        delegate_facts: True
        loop: "{{groups['dbservers']}}"
  ```

### run_once

* L'option `run_once` permet de n'éxecuter une tâche qu'une seule fois pour un ensemble d'hôtes.  
  La tâche est exécutée sur le premier hôte de l'ensemble et applique ensuite tous les résultats et facts aux hôtes suivants.

  ``` yml
  tasks:
  - name: Send summary mail
    mail:
      host: smtp.gmail.com
      port: 587
      username: username@gmail.com
      password: mysecret
      subject: "Summary Mail"
      to: "{{ mail_recipient }}"
      body: "{{ mail_body }}"
    run_once: True
  ```

{% endraw %}