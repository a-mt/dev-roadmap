---
title: Utiliser des Fichiers externes
category: Ansible
---

## Inclure et importer

Il est possible d'écrire un énorme playbook, contenant tout un tas de tâches et services, mais lorsque vous commencez à avoir beaucoup d'instructions, il est généralement préférable de les organiser en plus fichiers. Avec Ansible, il y a trois façons de le faire: les imports, les inclusions et les rôles

### import, include

Les directives suivantes permettent d'importer un fichier yaml externe dans le playbook:

* `import_playbook`
* `import_role`
* `import_tasks`

<!-- -->

* `include_vars`
* `include_role`
* `include_tasks`

Les directives `import` sont exécutées au moment du parsing du playbook.  
Les directives `include` sont exécutées pendant l'exécution du playbook.  
La différence entre `import_tasks` et `include_tasks` est donc visible lorsqu'on utilise des éléments logiques, tels que des conditions et des boucles

* Il n'est pas possible d'utiliser `import` avec une boucle.  
  On peut en revanche utiliser un `include`.

* `include` importe le fichier et n'exécute les tâches que si la condition est vraie au moment de l'exécution.  
  Ainsi, si on a les fichiers suivants:

  ```
  # main.yml
  - import_tasks: set_data.yml
    when: data is not defined
  ```

  ```
  # set_data.yml
  - set_fact:
      data: "Hello World"
  - debug:
      var: data
  ```

  Ansible évaluera les tâches d'un `include` comme suit:

  ```
  - set_fact:
      data: "Hello World"
    when: data is not defined
  - debug:
      var: data
    when: data is not defined
  ```

  L'`include` va donc exécuter la tâche `debug` tandis que l'`import` non.

### roles

On peut également définir des rôles:

```
- hosts: webservers
  roles:
    - common
    - webservers
```

Ce qui aura pour effet d'essayer d'importer les fichiers suivants:

* `roles/ROLENAME/tasks/main.yml`  
  Importe les `tasks` listés dans ce fichier

  ```
  ---
  # roles/example/tasks/main.yml
  - name: added in 2.4, previously you used 'include'
    import_tasks: redhat.yml
    when: ansible_facts['os_family']|lower == 'redhat'
  - import_tasks: debian.yml
    when: ansible_facts['os_family']|lower == 'debian'

  # roles/example/tasks/redhat.yml
  - yum:
      name: "httpd"
      state: present

  # roles/example/tasks/debian.yml
  - apt:
      name: "apache2"
      state: present
  ```

* `roles/ROLENAME/handlers/main.yml`  
  Importe les `handlers` listés dans ce fichier

* `roles/ROLENAME/vars/main.yml`  
  Importe les `vars` listés dans ce fichier

  ```
  ---
  user: '{{name}}'
  shell: /bin/bash
  ```

* `roles/ROLENAME/defaults/main.yml`  
  Importe les `vars` listés dans ce fichier

  La différence entre `defaults` et `vars` tient dans la précédence — lorsque des variables sont définies à différents endroits, l'ordre de précédence est comme suit:
  * les variables définies en ligne de commande avec `-e` — qui l'emporte toujours sur les autres définitions
  * celles définies dans l'inventory lorsqu'il s'agit de variables de connection (`ansible_user`, etc)
  * celles définies avec `vars` dans le playbook, les variables inclues ou les `vars` appartenant au rôle
  * le reste des variables définies dans l'inventory
  * les facts du système
  * et enfin les variables `defaults` — qui perdent en priorité par rapport à tout

* `roles/ROLENAME/meta/main.yml`  
  Importe les dépendances de `roles` listés dans ce fichiers (Ansible >= 1.2)

  ```
  dependencies:
    - role: docker-ssh
      when: "'{{ssh_key}}' != ''"
  ```

Les références aux fichiers (copy, script, template, tasks) inclus dans le rôle sont relatives à `roles/ROLENAME/{files,templates,tasks}`.

---

## Extensions

### Modules personnalisés

Même avec tous les modules natifs d'Ansible, il est parfois nécessaire d'en ajouter de nouveaux. Ansible cherche les modules personnalisés à différents endroits

* `/usr/share/ansible`  
  Module disponible dans tous les playbooks.

  ```
  /usr/share/ansible/sitemod.py
  ```

* `./library`  
  Chemin relatif au playbook en cours d'exécution.  
  Cela permet de versionner les modules avec les playbooks qui les utilise.

  ```
  library/playmod.py
  ```

* `./role/foo/library`  
  Chemin relatif au rôle.  
  Cela permet également de versionner les modules avec des rôles réutilisables.

  ```
  role/foo/library/rolemod.py
  ```

Exemple de module écrit en Bash pour installer un package Go:

* `library/go-install`

  ```
  #!/bin/bash

  failed=false
  res_code=0
  msg=Success

  trap 'failed=true res_code=1 msg="Failed at line $LINENO"' ERR
  exec 3>&1 >/dev/null 2>&1

  name=
  package=
  . "$1"
  : ${name:="$(basename $package)"}

  export GOPATH="/usr/local/src/$name"
  STOWDIR="/usr/local/stow/$name"

  rm -rf "$GOPATH/bin" "$STOWDIR/bin"
  mkdir -p "$STOWDIR/bin" "$GOPATH"
  ln -s "$STOWDIR/bin" "$GOPATH/bin"

  go get -u "$package"
  go build "$package"
  go install "$package"

  cd /usr/local/stow/
  stow -R "$name"

  cat <<EOF >&3
  {
      "failed":  $failed,
      "changed": true,
      "msg":     "$msg"
  }
  EOF
  exit $res_code
  ```

* `playbook.yml`

  ```
  ---
  - hosts: all
    become: true
    tasks:
      - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
  ```

### Plugins

Les plugins permettent d'ajouter des fonctionnalités supplémentaires à Ansible. Parmi les plus courant:
* les plugins de callback permettent de gérer les logs et formatter les données affichées,
* les plugins de connection de gérer les méthodes de communication,
* et les plugins de filtre de manipuler les données dans les templates.

[Plugins par catégorie](https://docs.ansible.com/ansible/latest/plugins/plugins.html)
