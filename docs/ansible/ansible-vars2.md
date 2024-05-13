---
title: Facts & variables magiques
category: DevOps, Ansible
---

{% raw %}

## Facts

* Le premier module exécuté par un playbook est `setup` — même s'il n'est pas spécifié.  
  C'est ce module qui récupère les facts de l'hôte

  ![](https://i.imgur.com/uyqYNIi.png)

* On peut désactiver ce comportement, c'est à dire ne pas récolter les facts des différents hôtes,  
  en ajoutant la directive `gather_facts: no`

  ``` yml
  - hosts: all
    gather_facts: no
    tasks:
      - debug:
          var: ansible_facts
  ```

* Une autre possibilité est de modifier le comportement par défaut, en éditant les configurations d'Ansible.

  ``` ini
  # /etc/ansible/ansible.cfg
  # smart - gather by default, but don't regather if already gathered
  # implicit - gather by default, turn off with gather_facts: False
  # explicit - do not gather by default, must say gather_facts: True
  gathering = explicit
  ```

  En définissant `gathering = explicit` plutôt qu'`implicit` (valeur par défaut),  
  Ansible n'exécutera pas setup à moins de l'activer explictement en ajoutant la directive `gather_facts: yes`

  ``` yml
  - hosts: all
    gather_facts: yes
    tasks:
      - debug:
          var: ansible_facts
  ```

## Jinja2

* Les variables à l'intérieur d'un playbook (ou d'un template) sont interpolées par le moteur de templating Jinja2, ce qui permet d'ajouter des filtres sur les variables.

  ``` bash
  # cat playbook.yml 
  - hosts: localhost
    connection: local
    vars:
      txt: It works
    tasks:
      - debug:
          msg: "As I told you: {{ txt | upper }}"
  ```
  ``` bash
  $ ansible-playbook playbook.yml 
  ...
  ok: [localhost] => {
      "msg": "As I told you: IT WORKS"
  }
  ```

  ![](https://i.imgur.com/jPyywCU.png)
  ![](https://i.imgur.com/MtyVgRo.png)

* Outre les filtres de base de Jinja2, ansible ajoute également ses propres filtres, comme basename.

  ![](https://i.imgur.com/aTyhHeS.png)

## Variables magiques

### hostvars

* `hostvars` est une variable magique qui peut être utilisée pour obtenir une variable définie sur un autre hôte.

  ```
  hostvars['web2'].dns_server
  ```

### groups

* `groups` retourne la liste de noms d'hôte d'un groupe donné

  ```
  groups['web_servers']
  ```

### group_names

* `group_names` retourne la liste des groupes dont l'hôte en cours fait partie

  ```
  group_names
  ```

### inventory_hostname

* `inventory_hostname` retourne le nom de l'hôte en cours

  ```
  inventory_hostname
  ```

### ansible_facts

* Par défaut lorsqu'on exécute un playbook, Ansible se connecte au serveur distant et récupère des informations sur ce serveur. Ça inclut des informations sur

  - la machine — tel que l'architecture du système, le système d'exploitation, le processeur, la RAM, etc
  - la connectivité réseau — les différentes interfaces réseau, adresses IP, MAC, etc
  - les périphériques — les différents disques et volumes montés, l'espace disponibles
  - la date et l'heure

* On appelle ces informations des *faits* (*facts* en anglais).  
  On peut accéder à ces données avec la variable `ansible_facts`

  ```
  {{ ansible_facts.processor }}
  ```

* La plupart des facts sont également disponibles en tant que variables de niveau 1.

  ```
  {{ ansible_os_family }}
  ```
  ```
  {{ ansible_facts['os_family'] }}
  ```

  [Ansible facts](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html#ansible-facts)

* On peut également accéder aux faits d'autres machines avec hostvars

  ```
  {{ hostvars['web2'].ansible_facts.processor }}

  {{ hostvars['web2']['ansible_facts']['processor'] }}
  ```

{% endraw %}