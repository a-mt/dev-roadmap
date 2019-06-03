---
title: Installer Ansible
category: Ansible
---

{% raw %}
## Installer Ansible sur le serveur principal

Source: [How to Install and Configure Ansible on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-ansible-on-ubuntu-18-04)

* Installer les dépendances

  ```
  sudo apt-get update
  sudo apt-get install software-properties-common
  ```

* Ajouter le repo aux sources PPA

  ```
  sudo apt-add-repository ppa:ansible/ansible
  sudo apt-get update
  ```

* Installer Ansible

  ```
  sudo apt-get install ansible
  ```

---

## Configurer les hôtes contrôlés

### Créer des clés SSH

Source: [How to Set Up SSH Keys on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804)

* Afficher la clé SSH du serveur principal

  ```
  cat ~/.ssh/id_rsa.pub
  ```

* Si elle n'existe pas, la créer

  ```
  ssh-keygen
  ```

* Copier la clé privée vers l'hôte distant que vous voulez contrôler — pour le compte que vous souhaitez contrôler

  ```
  ssh-copy-id username@remote_host
  ```

* Essayer de se connecter à l'hôte  
  Vous devriez pouvoir vous connecter à l'hôte sans entrer de mot de passe

  ```
  ssh username@remote_host
  ```

### Installer Python

Ansible utilise l'interpréteur Python pour faire tourner ses modules.  
S'assurer que Python (2 ou 3) est installé sur la machine distante.  
Sinon, l'installer.

```
python --version
```

On peut forcer l'[utilisation de Python3](https://docs.ansible.com/ansible/latest/reference_appendices/python_3_support.html#using-python-3-on-the-managed-machines-with-commands-and-playbooks)  lorsqu'on lance Ansible

```
 ansible-playbook sample-playbook.yml -e "ansible_python_interpreter=/usr/bin/python3"
```

Il est possible d'utiliser Ansible sans avoir installé Python sur l'hôte distant, à la condition de n'utiliser que le module `raw` (qui se contente d'exécuter une commande shell) et de désactiver la création de *facts* avec `gather_facts: no`.

```
- hosts: development
  become: yes
  gather_facts: no
  pre_tasks:
  - name: 'install python'
    raw: 'sudo apt-get -y install python'
```

---

## Inventory

### Inventory par défaut

La liste des serveurs gérés par le manager est stocké dans le INI fichier `/etc/ansible/hosts`.  
Ajoutez votre hôte distant à cette liste.

```
[web]
server1 ansible_host=203.0.113.1
server2 ansible_host=203.0.113.2
server3 ansible_host=203.0.113.3
```

<ins>Format</ins>:

```
[GROUPNAME]
HOSTNAME ansible_host=remote_host
```

* `GROUPNAME` permet de lancer Ansible pour l'ensemble des serveurs listés dans ce groupe — en un seul mot.  
  On peut créer des groupes de groupe, en utilisant le suffixe `:children`.  
  Par exemple, pour créer un groupe `southeast` qui contient le groupe `atlanta` et `raleigh`:

  ```
  [atlanta]
  host1
  host2

  [raleigh]
  host2
  host3

  [southeast:children]
  atlanta
  raleigh
  ```

* `HOSTNAME`  permet de lancer Ansible sur un hôte spécifique.  
  La variable de configuration `ansible_host` remplace `ansible_ssh_host` depuis Ansible 2.0.  
  Si vous ajoutez beaucoup d'hôtes qui suivent un même motif, vous pouvez les déclarer comme suit:

  ```
  [webservers]
  www[01:50].example.com
  ```

### Utiliser un autre inventory

On peut désigner un ou plusieurs inventory à appliquer, autre que l'inventory par défaut, au moment de lancer Ansible

* Soit en spécifiant le fichier à utiliser depuis la ligne de commande

  ```
  ansible-playbook get_logs.yml -i staging -i production
  ```

* Soit en définissant la variable d'environement [`ANSIBLE_INVENTORY`](https://docs.ansible.com/ansible/latest/reference_appendices/config.html)

### Définir des variables (optionnel)

Les variables de configuration peuvent être définies à différents endroits:

* `/etc/ansible/hosts`  
  Définit les configurations hôte par hôte, en ligne

  ```
  server1 ansible_host=203.0.113.1 ansible_user=root
  ```

  Ou groupe par groupe

  ```
  [atlanta]
  host1
  host2

  [atlanta:vars]
  ntp_server=ntp.atlanta.example.com
  proxy=proxy.atlanta.example.com
  ```

* `/etc/ansible/HOSTNAME`  
  Définit les configurations d'un hôte donné, au format YAML  
  À l'avantage d'être plus lisible lorsqu'il y a beaucoup de variables

  ```
  ---
  ansible_user: root
  ```

* `/etc/ansible/group_vars/GROUPNAME`  
  Définit les configurations d'un groupe donné

* `/etc/ansible/group_vars/all`  
  Définit les configurations de tous les groupes

Lorsqu'une même variables est définie à plusieurs endroits, la valeur la plus spécifique est appliquée, on peut donc définir des variables au niveau du groupe et les écraser au niveau de l'hôte.

### Utilité des variables

Les variables peuvent être utilisées

* dans les définitions des tâches d'un playbook
  ```
  pip:
    name: {{ foo }}
  ```

* dans les templates

  ```
  [database]
  conn = {{ db }}
  ```

* ou pour modifier le comportement d'Ansible  
  <ins>Exemple</ins>: Par défaut, Ansible essaiera de se connecter aux hôtes distants avec le même nom d'utilisateur que celui que vous utilisez sur le manager: si vous utilisez `sammy`, Ansible essaiera de se connecter avec `ssh sammy@server`.  
  Pour changer ça, définir la variable de configuration `ansible_user`  (`ansible_ssh_user` pour Ansible < 2.0)

  ```
  ansible_user=fred
  ```

### Inventory dynamique

Un inventory statique est simple à utiliser mais nécessite des mises à jour manuelles au fur et à mesure que les machines déployées changent. Ansible fournit des scripts pour récupérer l'inventory dynamiquement à partir de services du cloud comme OpenStack, Amazon AWS, Google Compute, Microsoft Azure ou DigitalOcean, ou bien à partir d'outils pour containers / VM tels que Docker, VMware, VirtualBox ou Vagrant.

[Working With Dynamic Inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_dynamic_inventory.html#intro-dynamic-inventory)

---

## Tester l'installation

### Essayer d'envoyer un ping

* Lancer le module `ping` sur tous les serveurs configurés:

  ```
  ansible -m ping all
  ```

  Exemple de résultat:

  ```
  host1 | SUCCESS => {
      "ansible_facts": {
          "discovered_interpreter_python": "/usr/bin/python3"
      }, 
      "changed": false, 
      "ping": "pong"
  }
  ```

* On peut cibler des hôtes spécifiques (liste séparée par des deux-points)

  ```
  ansible -m ping host1
  ```

  ```
  ansible -m ping host1:host2
  ```

### Afficher la mémoire utilisée

* Lancer le module `shell` pour exécuter une commande shell. 
  Ajouter des arguments avec l'option `-a`

  ```
  ansible -m shell -a 'free -m' host1
  ```

{% endraw %}