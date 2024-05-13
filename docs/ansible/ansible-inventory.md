---
title: Inventory
category: DevOps, Ansible
---

## Syntaxe

* L'inventaire contient une liste de serveurs

  ``` ini
  # inventory
  server1.company.com
  server2.company.com
  ```

  Ces serveurs peuvent ensuite être utilisés dans le playbook via la directive `hosts`

  ``` yml
  # playbook.yml
  - hosts: server1.company.com
  ```

* Si on a beaucoup d'hôtes qui suivent un même motif, on peut les déclarer comme suit:

  ``` ini
  # inventory
  www[01:50].example.com
  ```

### Alias

* Pour chaque serveur, on peut spécifier un alias  
  Note: `ansible_ssh_host` est déprécié en faveur de `ansible_host`

  ``` ini
  # inventory
  web1 ansible_host=server1.company.com
  db   ansible_host=server2.company.com
  mail ansible_host=server3.company.com
  web2 ansible_host=server4.company.com
  ```

  Et utiliser cet alias dans le playbook

  ``` yml
  # playbook.yml
  - hosts: web1
  ```

### Groupes

* On peut créer des groupes de serveurs, avec une section `[GROUP_NAME]`

  ``` ini
  # inventory
  [web_servers]
  web1 server1.company.com
  web2 server2.company.com

  [mail_servers]
  mail server3.company.com

  [db_servers]
  db server4.company.com
  ```

  ou

  ``` ini
  # inventory
  web1 server1.company.com
  web2 server2.company.com
  mail server3.company.com
  db server4.company.com

  [web_servers]
  web1
  web2

  [mail_servers]
  mail

  [db_servers]
  db
  ```

  Et utiliser le groupe dans le playbook pour cibler plusieurs serveurs

  ``` yml
  # playbook.yml
  - hosts: web_servers
  ```

### Groupe de groupes

* Pour créer un groupe de groupes, on utilise la syntaxe `[GROUP_NAME:children]`

  ``` ini
  # inventory
  ...

  [all_servers:children]
  web_servers
  db_servers
  ```

  ``` yml
  # playbook.yml
  - hosts: all_servers
  ```

### all

* `all` est un mot-clé qui désigne l'ensemble des serveurs définis dans l'inventaire — sans qu'il soit nécessaire de créer un groupe / groupe de groupes

  ``` yml
  # playbook.yml
  - hosts: all
  ```

* Ou on peut désigner plusieurs hôtes en les séparant par des virgules

  ``` yml
  # playbook.yml
  - hosts: server1,server2,server3
  ```

### localhost

* `localhost` peut être utilisé pour exécuter des actions sur le serveur où est installé Ansible

  ``` ini
  # inventory
  localhost ansible_connection=local
  ```

  ou

  ``` yml
  # playbook.yml
  ---
  - name: 'Exec cmd on localhost'
    hosts: localhost
    connection: local
    tasks:
      - name: 'Display content of /etc/resolv.conf'
        command: cat /etc/resolv.conf
  ```

## Emplacement

### Par défaut

* Si l'inventory à utiliser n'est pas spécifié, l'inventory par défaut est utilisé: <ins>/etc/ansible/hosts</ins>

### ANSIBLE_INVENTORY

* On peut également définir la variable d'environement ANSIBLE_INVENTORY

  ``` bash
  $ export ANSIBLE_INVENTORY=/tmp/inventory
  $ ansible-playbook playbook.yml 
  ```

### -i

* On peut utiliser un (ou plusieurs) inventory, autre que celui par défaut, en utilisant l'option -i

  ``` bash
  ansible-playbook playbook.yml -i staging -i production
  ```
