---
title: Configuration
category: DevOps, Ansible
---

## Syntaxe

* Le fichier de configuration est un fichier INI, dans lequel on retrouve différentes sections indiquées par des crochets (`[NAME]`).
  Chaque section dispose d'un certain nombre d'option et valeurs qui définissent le comportement par défaut d'Ansible

  ``` ini
  [defaults]
  inventory      = /etc/ansible/hosts
  log_path       = /var/log/ansible.log

  library        = /usr/share/my_modules/
  roles_path     = /etc/ansible/roles
  action_plugins = /usr/share/ansible/plugins/action

  gathering      = implicit

  # SSH timeout
  timeout        = 10
  forks          = 5

  [inventory]
  enable_plugins = host_list, virtualbox, yaml, constructed
  ```

## Emplacement

### Par défaut

* Le fichier de configuration par défaut est <ins>/etc/ansible/ansible.cfg</ins>

### Répertoire utilisateur

* Si le fichier <ins>~/.ansible.cfg</ins> existe, Ansible lit son contenu et ses valeurs écrasent les valeurs par défaut

### Répertoire courant

* On peut également écraser les valeurs par défaut en créant un fichier ansible.cfg dans le répertoire du playbook, <ins>./ansible.cfg</ins>.  
  Il n'est pas nécessaire que ce fichier contienne toutes les valeurs — il suffit de remplacer les paramètres qu'on souhaite écraser, les valeurs des autres paramètres seront héritées

  ``` ini
  # ./ansible.cfg
  gathering = implicit
  ```

### ANSIBLE_CONFIG

* Une autre manière d'écraser les configurations par défaut est de spécifier l'emplacement du fichier de configuration avec la variable d'environnement ANSIBLE_CONFIG.

  ``` bash
  $ ANSIBLE_CONFIG=/opt/ansible-web.cfg ansible-playbook playbook.yml
  ```

  ou

  ``` bash
  $ export ANSIBLE_CONFIG=/opt/ansible-web.cfg
  $ ansible-playbook playbook.yml
  ```

* Même principe que précédemment, les pamètres non définit dans ce fichier seront hérités des autres fichiers.  
  L'ordre de priorité est

  * <ins>ANSIBLE_CONFIG</ins>: les valeurs définies dans le fichier désigné par cette variable d'environnement remplacent les valeurs configurées dans les autres fichiers
  - <ins>./ansible.cfg</ins>: le fichier ansible.cfg dans le répertoire du playbook
  - <ins>/etc/ansible/ansible.cfg</ins>: le fichier de configuration par défaut en dernier recours

## Paramètre ANSIBLE_*

* Si on veut modifier un seul paramètre de configuration, plutôt que de définir un fichier de configuration, on peut définir une variable d'environnement qui correspond à ce paramètre en particulier.  
  Pour la plupart des options, la variable d'environnement associée est le paramètre en majuscule préfixé de ANSIBLE_.  
  Par exemple:


  ``` bash
  $ ANSIBLE_GATHERING=explicit ansible-playbook playbook.yml
  ```

  ``` bash
  $ export ANSIBLE_GATHERING=explicit
  $ ansible-playbook playbook.yml
  ```

  [Variables d'environnement](https://docs.ansible.com/ansible/latest/reference_appendices/config.html#environment-variables)

## ansible-config

* Pour lister les paramètres et les différentes valeurs possibles

  ``` bash
  $ ansible-config list
  ACTION_WARNINGS:
    default: true
    description:
    - By default Ansible will issue a warning when received from a task action (module
      or action plugin)
    - These warnings can be silenced by adjusting this setting to False.
    env:
    - name: ANSIBLE_ACTION_WARNINGS
    ini:
    - key: action_warnings
      section: defaults
    name: Toggle action warnings
    type: boolean
    version_added: '2.5'
  ...
  ```

* Pour lister les paramètres actuels — liste leurs valeurs et indique d'où elles proviennent:


  ``` bash
  $ ansible-config dump
  ACTION_WARNINGS(default) = True
  AGNOSTIC_BECOME_PROMPT(default) = True
  ANSIBLE_CONNECTION_PATH(default) = None
  ...
  ```

* Pour vérifier le fichier de configuration:

  ``` bash
  $ ansible-config view
  [defaults]
  # (boolean) By default Ansible will issue a warning when received from a task action (module or action plugin)
  # These warnings can be silenced by adjusting this setting to False.
  ;action_warnings=True
  ...
  ```