---
title: Introduction
category: DevOps, Ansible
---

## Qu'est ce que c'est

* Ansible est un projet open-source hébergé sur Github, écrit en Python.  

* C’est un outil d’automatisation IT très simple et facile à apprendre.  
  Là où Terraform nécessite une nouvelle syntaxe pour provisionner des serveurs, Ansible permet d'exécuter des commandes d'administration "classiques" sur un ensemble de serveurs.
  Il est idéal lorsqu’on a pas besoin de fonctionnalités avancées, mais qu'on a besoin d'effectuer les mêmes actions de manière répétitives sur différents serveurs — particulièrement utile lorsqu'on a des centaines de serveurs et qu'il devient difficile et prône à erreur de le faire manuellement.

## Les bases

* Ansible passe par la création de différents fichiers:

  * **Inventory**  
    L'inventaire est un fichier INI (ou YAML) qui liste les différents serveurs sur lesquels on va exécuter les différentes actions.  
    Son emplacement par défaut est <ins>/etc/ansible/hosts</ins>

    ``` ini
    [web_servers]
    web1 ansible_host=203.0.113.1
    web2 ansible_host=203.0.113.2

    [db_servers]
    db1 ansible_host=203.0.113.3
    ```

  * **Playbook**  
    Un *playbook* est un fichier YAML qui spécifie les différentes actions à exécuter sur les serveurs.  
    On le nomme souvent <ins>playbook.yml</ins>

    ``` yml
    ---
    - hosts: all
      tasks:
        - ping:
    ```

  * **Configuration**  
    Le fichier de configuration est un fichier INI (ou YAML) qui définit le comportement par défaut d'Ansible.  
    Son emplacement par défaut est <ins>/etc/ansible/ansible.cfg</ins>

    ``` ini
    [defaults]
    host_key_checking = False
    ```

* Pour appliquer un playbook:

  ``` bash
  ansible-playbook playbook.yml
  ```
