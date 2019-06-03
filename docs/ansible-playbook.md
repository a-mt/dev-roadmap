---
title: Utiliser un playbook
category: Ansible
---

{% raw %}
## Playbook

Un *playbook* est un fichier YAML contenant un ensemble de directives à exécuter pour provisionner les serveurs.

<ins>Exemple</ins>:  
Mettre à jour le cache apt et installer vim

```
---
- hosts: all
  become: true
  tasks:
     - name: Update apt-cache 
       apt: update_cache=yes

     - name: Install Vim
       apt: name=vim state=latest
```

Les playbooks contient un ensemble de directives pour définir la stratégie d'exécution du playbook (voir section suivante) ainsi que la liste des tâches à exécuter.  
Une tâche peut impliquer
* l'utilisation d'un module

  ```
  - name: Update apt-cache 
    apt: update_cache=yes
  ```

* ou l'exécution d'une commande donnée

  ```
  - name: Shutdown
    command: /sbin/shutdown -t now
  ```

Si une tâche échoue (par exemple, si vous essayez de lancer une commande alors que le package n'est pas installé), alors le provisioning s'arrête. On peut éviter ça en ajoutant l'option `ignore_errors: true`

```
- name: Update the database for mlocate
  command: updatedb
  ignore_errors: true
```

Nommer la tâche (avec `name`) n'est pas obligatoire mais permet de vérifier ce que fait Ansible, et d'identifier les tâches en erreur s'il y en a.

[Full Example on Github](https://github.com/erikaheidi/cfmgmt/tree/master/ansible)

---

## Stratégie d'exécution

### hosts

`hosts:all` indique que le playbook doit être appliqué sur tous les hôtes de l'inventaire. Cette option peut être écrasée au moment de l'exécution.

On peut aussi restreindre l'exécution du playbook à un hôte ou un groupe spécifique.

```
- hosts: web
  tasks:
    - name: Touch a file on the web servers
      shell: "echo 'webserver1' > /opt/whoami"

- hosts: db
  tasks:
    - name: Touch a file on the db servers
      shell: "echo 'dbserver1' > /opt/whoami"
```

### become

`become: true` indique à Ansible d'utiliser `sudo` pour exécuter les tâches du playbook.  
Cette option peut etre écrasée tâche par tâche.

### strategy

Il est possible de contrôler la stratégie d'exécution d'Ansible.

```
- hosts: all
  strategy: free
  tasks:
  ...
```

* <ins>linear</ins>:  
  Par défaut.  
  Ansible d'exécute linéairement les tâches, une par une, sur plusieurs machines à la fois. Lorsque l'ensemble des machines ont accomplit une tâche, la tâche suivante est exécutée. Cette stratégie permet d'utiliser les données générées lors d'une action sur une machine comme entrée pour une action sur une autre machine.

* <ins>free</ins>:  
  Depuis Ansible 2.0.  
  Les machines accomplissent les tâches aussi rapidement qu'elle le peuvent, individuellement, sans attendre que le reste des hôtes accomplissent une tâche donnée. Avec cette stratégie, il n'est pas possible pour un hôte de dépendre des données générées par un autre hôte.

[Strategies](https://docs.ansible.com/ansible/2.8/user_guide/playbooks_strategies.html)

### serial

Par défaut, Ansible essayera de gérer en parallèle toutes les machines qu'il connaît. Mais on peut définir combien d'hôtes Ansible doit gérer à la fois avec le mot-clé `serial`:

```
- hosts: webservers
  serial: 2
```

Dans l'exemple ci-dessus, s'il existe 4 hôtes dans le groupe `webservers`, alors Ansible attendra que les 2 premiers hôtes terminent entièrement le playbook, avant de passer aux 2 hôtes suivants.

### max_fail_percentage

Par défaut, Ansible continue d'exécuter les tâches tant qu'il y a des hôtes dans le lot qui n'ont pas encore échoué.  
Dans certaines situations, il peut être souhaitable d'interrompre l'exécution du playbook lorsqu'un certain seuil d'échec a été atteint. Ce que l'on peut faire grâce au mot-clé `max_fail_percentage`

```
- hosts: webservers
  max_fail_percentage: 30
  serial: 10
```

### any_errors_fatal

On peut aller plus loin que `max_fail_percentage` et stopper l'exécution du playbook pour tous les hôtes si une erreur est rencontrée sur un des hôtes

```
- hosts: somehosts
  any_errors_fatal: true
```

---

## Modules

Les modules sont des morceaux de code qu'Ansible envoie vers les hôtes cibles pour être exécutés. Dans le playbook, on appelle un module par son non, avec la liste des arguments à utiliser.  
Il existe des centaines de modules.
Voir [modules par catégorie](http://docs.ansible.com/ansible/modules_by_category.html) pour plus d'infos.

Les modules sont capables de détecter l'état de l'hôte distant, et ne s'éxecutent que s'il doit être modifié.

* Par exemple, lorsqu'on exécute le module `package`, Ansible va déterminer si le package est déjà installé et ne tentera pas de l'installer une seconde fois

  ```
  - name: install ntpdate
    package:
      name: ntpdate
      state: present
  ```

  Il existe deux syntaxes, la syntaxe ci-dessus ou la syntaxe en ligne (ci-dessous):

  ```
  - name: install ntpdate
    package: name=ntpdate state=present
  ```

* Autre exemple, si on exécutait la commande shell `mkdir` deux fois, la deuxième exécution échouerait — `mkdir` renvoie une erreur si le répertoire existe déjà. Mais lorsqu'on exécute le module `file`, Ansible détecte que le répertoire existe déjà et n'essaie pas de le recréer.

---

## Lancer un playbook

La commande `ansible-playbook` permet d'exécuter le contenu d'un playbook sur un ou plusieurs hôtes.

* Exécuter le playbook sur tous les hôtes gérés

  ```
  ansible-playbook playbook.yml
  ```

* Exécuter le playbook sur un groupe ou hôte donné

  ```
  ansible-playbook playbook.yml -l host_or_group
  ```

<ins>Authentification</ins>:  
On peut spécifier l'utilisateur SSH a utiliser avec l'option `-u`

```
ansible-playbook playbook.yml -u remote-user
```

Si vous voulez utiliser `sudo`, et qu'un mot de passe est nécessaire, utiliser l'option `--ask-sudo-pass`

```
ansible-playbook playbook.yml --ask-sudo-pass
```

<ins>Verbose</ins>:  
Si vous avez des erreurs à l'étape "gathering facts", utiliser l'option `-vvv` pour activer le mode full verbose

```
ansible-playbook playbook.yml -vvv
```

{% endraw %}