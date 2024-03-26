---
title: Ajouter des éléments logiques
category: Ansible
---

{% raw %}
## Variables

On peut définir des variables, pour ensuite les utiliser dans le playbook avec `{{ mavar }}}`.

Il existe différentes façons de définir des variables.
La façon la plus simple est d'utiliser la section `vars` d'un playbook.  
La variable a une portée globale, ce qui signifie qu'elle est accessible à partir de n'importe quel point du provisioning, y compris les fichiers inclus et les templates.

```
---
- hosts: all
  become: true
  vars:
     package: vim
  tasks:
     - name: Install Package
       apt: name={{ package }} state=latest
```

---

## Facts

Les *facts* sont des variables définies dynamiquement par l'hôte distant.  
L'ensemble des facts sont disponibles sous `ansible_facts`.  
La plupart sont également disponibles en tant que variables de niveau 1.

```
{{ ansible_os_family }}
```

```
{{ ansible_facts['os_family'] }}
```

Il est possile de référencer les facts d'un autre hôte

```
{{ hostvars['asdf.example.com']['ansible_facts']['os_family'] }}
```

[Variables discovered from systems: Facts](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#variables-discovered-from-systems-facts)

On peut désactiver la création de facts avec la directive `gather_facts: no`

```
- hosts: whatever
  gather_facts: no
```
---

## Debug

La module `debug` peut être utilisé pour

* afficher le contenu d'une variable

  ```
  - name: Print the value of a variable
    debug: var=ansible_facts
  ```

* afficher un message

  ```
  - name: Print a message
    debug: msg='Hello World'
  ```

---

## Boucles

### with_items

Pour créer une boucle, définir un tableau de valeurs avec l'option `with_items`.  
Le module associé est lancé autant de fois qu'il y a d'éléments.  
L'élément en cours est accessible avec la variable `item`.

```
tasks:
  - name: Install Packages
    apt: name={{ item }} state=latest
    with_items:
       - vim
       - git
       - curl  
```

`with_item` peut également prendre une variable pré-définie:

```
vars:
   packages: [ 'vim', 'git', 'curl' ]
tasks:
   - name: Install Package
     apt: name={{ item }} state=latest
     with_items: "{{ packages }}"
```

Ou le résultat d'une commande.

```
- name: "Cleanup files."
  file: name={{item}} state=absent
  with_items: files_to_remove.stdout_lines
```

### loop

Depuis Ansible 2.5, on peut également utiliser `loop`

```
- name: add several users
  user:
    name: "{{ item.name }}"
    state: present
    groups: "{{ item.groups }}"
  loop:
    - { name: 'testuser1', groups: 'wheel' }
    - { name: 'testuser2', groups: 'root' }
```

`with_item` aplanit le tableau entrée (tableau de niveau 1), ce n'est pas le cas de `loop`

```
with_items:
  - 1
  - [2,3]
  - 4
```

### with_sequence

`with_sequence` permet de créer une liste numérique.

```
- name: a simple way to use the sequence plugin create 4 groups
  group:
    name: "group{{ item }}"
    state: present
  with_sequence: count=4
```

On peut définir la valeur de début, de fin, et le pas — en utilisant `start`, `end` et `stride` au lieu de `count`

```
- name: create a series of directories with even numbers for some reason
  file:
    dest: "/var/stuff/{{ item }}"
    state: directory
  with_sequence: start=4 end=16 stride=2
```

On peut également formatter la valeur générée avec `format`

```
- name: create some test users
  user:
    name: "{{ item }}"
    state: present
    groups: "evens"
  with_sequence: start=0 end=32 format=testuser%02x
```

---

## Conditions

Les conditions peuvent être utilisées pour décider si une tâche doit être exécutée ou non, selon la valeur d'une variable, d'un *fact* ou le résultat d'une commande.

### when

L'option `when` reçoit en argument une expression a évaluer.  
La tâche est exécutée si l'expression est vraie. Cela permet par exemple de tester un fact.

Dans l'exemple suivant, on arrête la machine si son OS appartient à la famille Debian

```
- name: Shutdown Debian Based Systems
  command: /sbin/shutdown -t now
  when: ansible_os_family == "Debian"
```

### register

L'option `register` permet de stocker le résultat d'une commande. On peut ensuite l'utiliser avec une condition.

Dans l'exemple suivant, on affiche la version PHP installée ou un message indiquant qu'il n'est pas installé

```
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

```
- hosts: all
  tasks:
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

### changed when

L'option `changed_when` permet de définir si la tâche a effectué des modifications ou non.

```
- name: "Get list of files to remove"
  shell: ls -1 /tmp/emplacement/*.xml | grep -v un-fichier.xml | cat
  register: files_to_remove
  changed_when: False

- name: "Cleanup files."
  file: name={{item}} state=absent
  with_items: files_to_remove.stdout_lines
```

On peut combiner de multiples conditions

```
- command: /bin/fake_command
  register: result
  ignore_errors: True
  changed_when:
    - '"ERROR" in result.stderr'
    - result.rc == 2
```

### fail

Ce module déclenche une erreur et affiche un message donné.  
Il peut être utilisé pour stopper l'exécution du playbook lorsqu'une condition `when` est remplie.

```
- name: Using fail and when together
  fail:
    msg: The system may not be provisioned according to the CMDB status.
  when: cmdb_status != "to-be-staged"
```

### block

On peut regrouper un ensemble de tâches sous un `block`, et récupérer les erreurs avec `rescue`.  
Une tâche mal définie ou un hôte inacessible sont des erreurs qui ne peuvent pas être récupérées.

```
tasks:
- name: Handle the error
  block:
    - debug:
        msg: 'I execute normally'
    - name: i force a failure
      command: /bin/false
    - debug:
        msg: 'I never execute, due to the above task failing, :-('
  rescue:
    - debug:
        msg: 'I caught an error, can do stuff here to fix it, :-)'
```

{% endraw %}