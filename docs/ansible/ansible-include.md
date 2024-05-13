---
title: Playbooks — include & import
category: DevOps, Ansible
---

On peut écrire un playbook de plusieurs centaines de lignes, mais pour faciliter la lecture on préfère décomposer le playbook en plusieurs fichiers. Avec Ansible, il y a trois façons de le faire: les imports, les inclusions et les rôles

## import

* Les directives d'import sont les suivantes:

  - `import_playbook`
  - `import_role`
  - `import_tasks`

### import_tasks

* Les directives d'import sont exécutées au moment du parsing du playbook.

  ``` bash
  $ cat set_data.yml
  - set_fact:
      data: "Hello World"
  - debug:
      var: data
  ```
  ``` bash
  $ cat playbook.yml
  - hosts: localhost
    connection: local
    tasks:
    - import_tasks: set_data.yml
      when: data is not defined
  ```
  ``` bash
  $ ansible-playbook playbook.yml -v
  TASK [set_fact] *********************************
  ok: [localhost] => {"ansible_facts": {"data": "Hello World"}, "changed": false}

  TASK [debug] ************************************
  skipping: [localhost] => {"false_condition": "data is not defined"}
  ```

## include

* Les directives d'inclusion sont les suivantes:

  - `include_vars`
  - `include_role`
  - `include_tasks`

### include_tasks

* Les directives d'inclusion sont exécutées au moment de l'exécution du playbook.  
  La différence entre import et include devient visible lorsqu'on utilise des éléments logiques (boucles et conditions): include prend en compte les modifications qui ont été apportées au cours de l'exécution du playbook tandis qu'import non

  ``` bash
  $ cat set_data.yml
  - set_fact:
      data: "Hello World"
  - debug:
      var: data
  ```
  ``` bash
  $ cat playbook.yml
  - hosts: localhost
    connection: local
    tasks:
    - include_tasks: set_data.yml
      when: data is not defined
  ```
  ``` bash
  $ ansible-playbook playbook.yml -v
  TASK [set_fact] *******************************
  ok: [localhost] => {"ansible_facts": {"data": "Hello World"}, "changed": false}

  TASK [debug] **********************************
  ok: [localhost] => {
      "data": "Hello World"
  }
  ```

### include_vars

``` bash
$ cat db_vars.yml
db_version: 1.0.14
```
``` bash
$ cat playbook.yml
---
- name: Print DB server data
  hosts: all
  gather_facts: no
  tasks:
    - include_vars: db_vars.yml
    - debug:
        var: db_version
```