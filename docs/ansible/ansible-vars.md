---
title: Définir des variables
category: DevOps, Ansible
---

{% raw %}

## Types de variables

Les types de variables possibles sont:

- **chaînes de caractère**  
  Elles sont délimitées par des simples ou doubles quotes

  ``` yml
  vars:
    username: "admin"
  tasks:
    - debug:
        msg: "Hello {{ username }}"
  ```

- **nombre**

  ``` yml
  vars:
    max_connections: 200
  tasks:
    - debug:
        msg: "Max connections: {{ max_connections }}"
  ```

- **booléen**  
  Les valeurs équivalentes à vrai (truthy values) sont: `True, 'true', 't', 'yes', 'y', 'on', '1', 1, 1.0`  
  Les valeurs équivalentes à faux (falsy values) sont: `False, 'false', 'f', 'no', 'n', 'off', '0', 0, 0.0`

  ``` yml
  vars:
    debug_mode: true
  tasks:
    - debug:
        msg: "Debug mode is on"
      when: debug_mode

    - debug:
        msg: "Debug mode is off"
      when: not debug_mode                         
  ```

- **liste**  
  Collection ordonnée de valeurs de tout type

  ``` yml
  vars:
    packages:
      - nginx
      - postgresql
      - git
  tasks:
    - debug:
        msg: "Package {{ idx }}: {{ item }}"
      loop: "{{ packages }}"
      loop_control:
        index_var: idx

    - debug:
        msg: "The first package is {{ packages[0] }}"
  ```

- **dictionnaire**  
  Collection non ordonnée de clés-valeurs

  ``` yml
  vars:
    user:
      name: "admin"
      password: "secret"
  tasks:
    - debug:
        msg: "{{ user.name }}@{{ user.password }}"
  ```

## Déclaration

Les variables peuvent être définies de différentes manières

### Fichier inventory

On peut définir des variables directement dans l'inventaire,

* soit au niveau de l'hôte

  ``` ini
  # inventory
  web1 ansible_host=142.20.1.101
  ```

* soit au niveau du groupe

  ``` ini
  # inventory
  [web]
  web1

  [web:vars]
  ansible_user=ansible
  ansible_password=Passw0rd
  ansible_become_pass=Passw0rd
  ansible_ssh_pipelining=true
  dns_server=10.5.5.4
  ```

* Les variables peuvent ensuite être utilisées par ansible (et c'est a priori le cas des variables qui commençent par "ansible_") ou peuvent être, dans tous les cas, utilisées dans les différentes tâches du playbook. Les variables définies sont également accessibles dans les fichiers inclus et les templates

  ``` yml
  # playbook.yml
  - hosts: all
    tasks:
      - debug:
          msg: '{{ ansible_host }}: nameserver {{ dns_server }}'
  ```

### Fichiers host_vars, group_vars

* Plutôt que de mettre les variables directement dans l'inventaire, on peut créer un fichier YAML pour les différents hôtes et groupes — ce qui a l'avantage d'être plus lisible lorsqu'il y a beaucoup de variables.

- Déclarer des variables d'hôte: <ins>/etc/ansible/host_vars/HOSTNAME</ins>

  ``` bash
  $ cat /etc/ansible/hosts 
  localhost ansible_connection=local myvar=works
  ```
  ``` bash
  $ cat /etc/ansible/host_vars/localhost 
  myvar: thisisworking?
  myvar2: ornot?
  ```
  ``` bash
  $ cat playbook.yml
  - hosts: all
    tasks:
      - debug:
          msg: 'Check: {{ myvar }}{{ myvar2 | default("NOP") }}'

  $ ansible-playbook playbook.yml
  ok: [localhost] => {
      "msg": "Check: thisisworking?ornot?"
  }
  ```

- Déclarer des variables de groupe: <ins>/etc/ansible/group_vars/GROUPNAME</ins>  
  Si une variable est redéfinie à plusieurs endroits, la valeur la plus spécifique est appliquée: on peut donc définir des variables au niveau du groupe et les écraser au niveau de l'hôte.

  ``` bash
  $ cat /etc/ansible/hosts
  [web]
  localhost ansible_connection=local

  [web:vars]
  myvar=works
  ```
  ``` bash
  $ cat /etc/ansible/group_vars/web 
  myvar: thisisworking?
  myvar2: ornot?
  ```

* Déclarer des variables pour tous les groupes: <ins>/etc/ansible/group_vars/all</ins>

* On peut également créer ces répertoires et fichiers dans le même répertoire que le playbook:  
  <ins>./host_vars/HOSTNAME</ins>, <ins>./group_vars/GROUPNAME</ins>, 

  ``` bash
  $ cat host_vars/localhost
  myvar: local value
  ```
  ``` bash
  $ ansible-playbook playbook.yml 
  ok: [localhost] => {
      "msg": "Check: local valueornot?"
  }
  ```

### Playbook vars

* Des variables peuvent être définies pour les différentes tâches d'un play en définissant `vars`:

  ``` yml
  - hosts: localhost
    vars:
      dns_server: 10.1.250.10
    tasks:
      - debug:
          msg: 'nameserver {{ dns_server }}'
  ```

### Fichier variables

* Les variables peuvent être définies dans un fichier séparé, et inclut par le playbook via une tâche `include_vars`

  ``` bash
  $ cat vars.yml
  dns_server: 10.1.250.10
  ```
  ``` yml
  - hosts: localhost
    tasks:
      - include_vars: vars.yml
      - debug:
          msg: 'nameserver {{ dns_server }}'
  ```

### \-\-extra-vars

* On peut définir des variables via l'option \-\-extra-vars (ou -e) en ligne de commande

  ``` bash
  ansible-playbook playbook.yml --extra-vars "dns_server=8.8.8.8"
  ```

* La ligne de commande a la plus haute priorité, elle écrase les valeurs définies partout ailleurs.

  ![](https://i.imgur.com/u0AvHUi.png)

## ansible-inventory

* La commande ansible-inventory permet de récupérer la liste des hôtes définis et leurs variables.  
  -y pour afficher le résultat au format YAML (JSON par défaut)

  ![](https://i.imgur.com/Weyi2Bd.png)

{% endraw %}
