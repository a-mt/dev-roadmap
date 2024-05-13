---
title: Collections
category: DevOps, Ansible
---

* Les collections Ansible sont un moyen d'empaqueter et de distribuer des configurations Ansible, y compris les plugins, rôles et autres assets associés.

* Pour installer une collection:

  ``` bash
  $ ansible-galaxy collection install amazon.aws
  ```

* Une fois la connection installée, on peut utiliser les différents modules et rôles de cette collection dans le playbook, après avoir inclut la collection via la directive `collections`.

  ``` yml
  ---
  - hosts: localhost
    collections:
      - amazon.aws
    tasks:
      - name: Create an S3 bucket
        aws_s3_bucket:
          name: my-bucket
          region: us-west-1
  ```

* La structure d'une collection est comme suit:

  ![](https://i.imgur.com/tidIYzu.png)
  ![](https://i.imgur.com/bnfaCWk.png)

* On peut également installer une collection directement via ansible avec le module "ansible_galaxy_collection"

  ``` yml
  ---
  - hosts: localhost
    tasks:
      - name: Install the networking_tools collection
        ansible_galaxy_collection:
          name: company_xyz.networking_tools
          source: https://galaxy.ansible.com

  - hosts: switches
    collections:
      - company_xyz.networking_tools
    tasks:
      - name: Configure VLAN 10
        configure_vlan:
          vlan_id: 10
          vlan_name: Admin_VLAN
  ```

* Ou utiliser un fichier requirements.yml

  ``` yml
  ---
  collections:
    - name: amazon.aws
      version: "1.5.0"
    - name: community.mysql
      src: https://github.com/ansible-collections/community.mysql
      version: "1.2.1"
  ```
  ``` bash
  $ ansible-galaxy collection install -r requirements.yml
  ```

<!--
* Bien qu'ansible fournisse un ensemble de modules pré-intégrés, on peut avoir besoin de modules et de fonctionnalités supplémentaires spécifique à un fournisseur. Par exemple, pour automatiser la configuration et la gestion d'équipements réseau cisco, jupiner et arisa.

  Les collections, telles que network.cisco, network.jupiner, network.arista, proposent des modules, des rôles et des playbooks spécifique à ces fournisseur. En installant ces collections, on accède aux fonctionnalités spécialisées nécessaires pour automatiser efficacement l'infrastructure

* Pour installer la collection network.cisco:

  ``` bash
  ansible-galaxy collection install network.cisco
  ```
-->