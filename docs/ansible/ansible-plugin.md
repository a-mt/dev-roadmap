---
title: Plugins
category: DevOps, Ansible
---

## Plugins

* Les plugins permettent d'ajouter des fonctionnalités supplémentaires à Ansible.  
  [Liste des Plugins natifs](https://github.com/ansible/ansible/tree/devel/lib/ansible/plugins)

* Tout les plugins ne sont pas activés par défaut.  
  La liste des plugins activés est configuré dans ansible.cfg

  ``` ini
  # /etc/ansible/ansible.cfg
  [inventory]
  enable_plugins = host_list, script, auto, yaml, ini
  ```

* Les plugins peuvent être utilisés pour améliorer divers aspects d'ansible — tels que l'inventaire, les modules, les callbacks, filtres, et autres. Chaque plugin est d'un type spécifique et offre la possibilité d'ajouter une fonctionnalité.  
  [Types de plugin](https://docs.ansible.com/ansible/latest/plugins/plugins.html#working-with-plugins)

* Pour lister les plugins de type filter:

  ``` bash
  $ ansible-doc -t filter -l
  ```

## Plugins personnalisés

* On peut créer un plugin personnalisé en le plaçant dans

  - un répertoire `FILTERTYPE_plugins` (ie filter_plugins pour un filtre),  
    placé dans le répertoire du playbook ou à l'intérieur d'un rôle

    ``` bash
    $ cat playbook.yml 
    ---
    - hosts: localhost
      connection: local
      tasks:
        - name: Print a message
          debug:
            msg: "{{'test'|a_filter}}"
    ```
    ``` bash
    $ cat filter_plugins/my_filters.py
    #!/usr/bin/python
    class FilterModule(object):
        def filters(self):
            return {
                'a_filter': self.a_filter,
            }

        def a_filter(self, data):
            return data + ' NEW FILTER'
    ```

  - ou dans un répertoire global configuré dans ansible.cfg.  
    Pour vérifier l'emplacement:

    ``` bash
    $ ansible-config dump | grep 'DEFAULT_.*_PLUGIN_PATH'
    ...
    DEFAULT_FILTER_PLUGIN_PATH(default) = ['/root/.ansible/plugins/filter', '/usr/share/ansible/plugins/filter']
    ```

    Pour vérifier si le plugin global "my_custom_filter" est connu d'ansible:

    ``` bash
    $ ansible-doc -t filter my_custom_filter
    ```

## Modules personnalisés

* Un module est un type de plugin qui exécute une tâche sur un hôte distant. Les modules acceptent des arguments en revoient des informations en JSON sur stdout.  
  Contrairement aux autres plugins, qui doivent être écrits en Python, les modules peuvent être écrits dans n'importe quel language supporté par l'hôte.

* Ansible cherche les modules personnalisé à différents endroits:

  * <ins>/usr/share/ansible/MODULE_NAME.\*</ins>  
    Pour vérifier si le module global "my_local_module" est connu d'ansible:

    ``` bash
    ansible localhost -m my_local_module
    ```

  * <ins>./library/MODULE_NAME.\*</ins> dans le répertoire du playbook

    ``` bash
    $ cat playbook.yml 
    ---
    - hosts: localhost
      connection: local
      become: true
      tasks:
        - go-install: name=go-ipfs package=github.com/tomnomnom/anew@latest
    ```
    ``` bash
    $ cat library/go-install.sh 
    #!/bin/bash
    failed=false
    res_code=0
    msg=Success

    set -eE
    exec 3>&1 >/dev/null

    # Check required packages are installed
    go version 
    git --version 

    # Create the variables name and package from the $1 variable
    # ie name=go-ipfs package=https://github.com/ipfs/go-ipfs-cmds
    name=
    package=
    source "$1"

    export GOPATH="/usr/local/src/$name"
    rm -rf "$GOPATH"

    go install "$package"

    cat <<EOF >&3
    {
        "failed":  $failed,
        "changed": true,
        "msg":     "$msg"
    }
    EOF
    exit $res_code
    ```

  * <ins>./role/ROLE_NAME/library/MODULE_NAME.\*</ins>
  * Ou on peut ajouter un emplacement non standard avec la variable d'environnement `ANSIBLE_LIBRARY`

[Developing modules](https://docs.ansible.com/ansible/latest/dev_guide/developing_modules_general.html)

## Inventaire dynamique

* En créant un plugin d'inventaire personnalisé, on peut obtenir des informations en temps réel sur les ressources dans le cloud directement à partir de l'API du cloud provider — comme OpenStack, Amazon AWS, Google Compute, Microsoft Azure ou DigitalOcean, ou bien à partir d'outils pour containers et VM tels que Docker, VMware, VirtualBox ou Vagrant. Ça permet d'avoir une vue actuelle de l'infrastructure, sans avoir à remplir manuellement un fichier inventory
  [Working With Dynamic Inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_dynamic_inventory.html#intro-dynamic-inventory)

  ![](https://i.imgur.com/KvZ3TUH.png)

* Le script doit accepter deux arguments \-\-list et \-\-host, et retourner le résultat au format JSON

  ``` py
  #!/usr/bin/env python

  '''
  Example custom dynamic inventory script for Ansible, in Python.
  '''

  import os
  import sys
  import argparse

  try:
      import json
  except ImportError:
      import simplejson as json

  class ExampleInventory(object):

      def __init__(self):
          self.inventory = {}
          self.read_cli_args()

          # Called with `--list`.
          if self.args.list:
              self.inventory = self.example_inventory()
          # Called with `--host [hostname]`.
          elif self.args.host:
              # Not implemented, since we return _meta info `--list`.
              self.inventory = self.empty_inventory()
          # If no groups or vars are present, return an empty inventory.
          else:
              self.inventory = self.empty_inventory()

          print json.dumps(self.inventory)

      # Example inventory for testing.
      def example_inventory(self):
          return {
              'web': {
                  'hosts': ['172.20.1.100', '172.20.1.101'],
                  'vars': {
                      'ansible_ssh_user': 'root',
                      'ansible_ssh_pass': 'Passw0rd'
                           }
              },
              '_meta': {
                  'hostvars': {
                      '172.20.1.100': {
                          'host_specific_var': 'foo'
                      },
                      '172.20.1.101': {
                          'host_specific_var': 'bar'
                      }
                  }
              }
          }

      # Empty inventory for testing.
      def empty_inventory(self):
          return {'_meta': {'hostvars': {}}}

      # Read the command line args passed to the script.
      def read_cli_args(self):
          parser = argparse.ArgumentParser()
          parser.add_argument('--list', action = 'store_true')
          parser.add_argument('--host', action = 'store')
          self.args = parser.parse_args()
  ```

  ``` bash
  $ ansible-inventory --list -i ec2.py 
  {
      "_meta": {
          "hostvars": {
              "172.20.1.109": {
                  "ansible_ssh_pass": "Passw0rd", 
                  "ansible_ssh_user": "root", 
                  "ec2_region": "ca-central-1", 
                  "ec2_state": "Running"
              }, 
              "172.20.1.110": {
                  "ansible_ssh_pass": "Passw0rd", 
                  "ansible_ssh_user": "root", 
                  "ec2_region": "us-east-1", 
                  "ec2_state": "Running"
              }
          }
      }, 
      "all": {
          "children": [
              "group", 
              "ungrouped"
          ]
      }, 
      "group": {
          "hosts": [
              "172.20.1.109", 
              "172.20.1.110"
          ]
      }, 
      "ungrouped": {}
  }
  ```

* Pour lister tous les hôtes dans l'inventaire AWS:

  ``` bash
  export AWS_ACCESS_KEY_ID=...
  export AWS_SECRET_ACCESS_KEY_ID=...

  $ ansible-inventory --list -i aws_inventory.py
  ```

  Pour voir les détails d'un hôte donné:

  ``` bash
  $ ansible-inventory --host web1 -i aws_inventory.py
  ```
