---
title: Playbooks
category: DevOps, Ansible
---

{% raw %}
## Syntaxe générale

### plays

* Un playbook est constitué d'un ensemble de *play*.  
  Un play définit un ensemble de *tâches* (*tasks* en anglais) à exécuter sur un hôte ou groupe d'hôtes (*hosts*).  
  On peut optionnellement nommer un play avec la directive *name*

  Dans l'exemple suivant, il y a deux play: le premier contient 1 tâche et le second en a 2.  

  ![](https://i.imgur.com/Cn3v0qYl.png)

* On notera qu'on trouve parfois 3 tirets au début d'un fichier YAML: ils indiquent qu'il s'agit d'un document YAML. Ils n'ont pas d'importance tel que, et peuvent être omis. Ils ne deviennent utiles que lorsqu'on fusionne plusieurs fichier YAML — pour délimiter les différents documents.

### tasks

* L'attribut tasks contient une liste de tâches.

  ``` yml
  tasks:
    - yum:
        name: httpd
        state: present
    - service:
        name: httpd
        state: started
  ```

* Ansible est modulaire, c'est ce qui lui permet de supporter des centaines d'actions différentes — et on peut lui ajouter de nouveaux modules via des plugins. Les modules sont des morceaux de code qu'Ansible envoie vers les hôtes cibles pour être exécutés.  
  Dans le playbook, chaque tâche fait appel à un module par son nom (avec la liste des arguments à utiliser) — par exemple "yum"  et "service" sont des modules ansible. Pour lister les modules:

  ```
  ansible-doc -l
  ```

  Ou voir [modules par catégorie](http://docs.ansible.com/ansible/modules_by_category.html) pour plus d'infos.

* Les modules sont capables de détecter l'état de l'hôte distant, et ne s'éxecutent que s'il doit être modifié.  
  Par exemple, lorsqu'on exécute le module "package", Ansible va déterminer si le package est déjà installé et ne tentera pas de l'installer une seconde fois

  ```
  - name: install ntpdate
    package:
      name: ntpdate
      state: present
  ```

* Il existe deux syntaxes, la syntaxe ci-dessus ou la syntaxe en ligne (ci-dessous):

  ```
  - name: install ntpdate
    package: name=ntpdate state=present
  ```

### handlers

* Les handlers sont des tâches spéciales, qui ne sont exécutées que lorsque des événements spécifiques ont été déclenchés par les tâches. Par exemple, si on a deux tâches qui déclenchent l'événement "Reload apache" (avec la directive `notify`), alors le handler "Reload apache" sera exécuté (une fois) à la fin du playbook

  ``` yml
  ---
  - hosts: all
    tasks:
      - name: Copy the code from repository
        git: repo={{ repository }} dest=/var/www/html/  force=yes
        notify: Reload apache

      - name: Replace Apache welcome file
        copy:
          src: index.html
          dest: /var/www/html/index.html
        notify: Reload apache

    handlers:
      - name: Reload apache
        service:
          name: httpd
          state: reloaded
  ```

### tags

* Optionellement, on peut assigner des tags aux plays et tâches. Derrière, on pourra lancer le playbook pour n'exécuter que les tâches avec le tag donné, ou au contraire ignorer toutes les tâches avec le tag donné

  ``` yml
  ---
  - name: Install httpd
    tags: install and start
    hosts: all
    tasks:
      - yum:
          name: httpd
          state: installed
        tags: install
      - service:
          name: httpd
          state: started
        tags: start httpd service
  ```

---

## Exécuter un playbook

* Pour exécuter un playbook, on utilise la commande `ansible-playbook`

  ``` bash
  $ ansible-playbook FILENAME.yml
  ```

### inventory

* L'option -i permet de spécifier l'emplacement de l'inventaire à utiliser

  ``` bash
  $ ansible-playbook FILENAME.yml -i INVENTORY
  ```

### user, ask-become-pass

* Pour spécifier l'utilisateur SSH à utiliser:

  ``` bash
  $ ansible-playbook playbook.yml -u remote-user
  ```

* Pour qu'ansible prompte pour obtenir le mot de passe pour sudo:  
  Note: ask-sudo-pass est déprécié en faveur de ask-become-pass

  ``` bash
  $ ansible-playbook playbook.yml --ask-become-pass
  ```

### start-at-task

* Pour exécuter un playbook à partir d'une tâche donnée (son *name*) — et ignorer les tâches qui la précèdent

  ``` bash
  $ ansible-playbook playbook.yml --start-at-task "Start httpd service"
  ```

### tags, skip-tags

* Pour n'exécuter que certains tags ou ignorer des tags:

  ``` bash
  $ ansible-playbook playbook.yml --tags "install"
  ```
  ``` bash
  $ ansible-playbook playbook.yml --skip-tags "install"
  ```

### vvv

* En cas d'erreurs à l'étape "gathering facts", utiliser l'option -vvv pour activer le mode full verbose

  ``` bash
  $ ansible-playbook playbook.yml -vvv
  ```

### check

* Pour vérifier si des modifications vont être effectuées, sans les effectuer, ajouter l'option \-\-check.  
  Si le module ne supporte pas le mode check, alors la tâche est simplement ignorée

  ``` bash
  $ cat playbook.yml 
  ---
  - hosts: localhost
    connection: local
    tasks:
      - copy:
          content: "This is my updated content"
          dest: /tmp/file.txt
  ```
  ``` bash
  $ ansible-playbook playbook.yml --check -v
  PLAY [localhost] ****************************

  TASK [Gathering Facts] **********************
  ok: [localhost]

  TASK [copy] *********************************
  changed: [localhost] => {"changed": true}

  PLAY RECAP **********************************
  localhost: ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
  ```
  ``` bash
  $ cat /tmp/file.txt 
  Hello World
  ```

### check diff

* Ajouter l'option \-\-diff en plus du \-\-check permet de vérifier les modifications détectées

  ``` bash
  $ ansible-playbook playbook.yml --check --diff -v
  PLAY [localhost] ****************************

  TASK [Gathering Facts] **********************
  ok: [localhost]

  TASK [copy] *********************************
  --- before: /tmp/file.txt
  +++ after: /tmp/file.txt
  @@ -1 +1 @@
  -Hello World
  \ No newline at end of file
  +This is my updated content
  \ No newline at end of file

  changed: [localhost] => {"changed": true}

  PLAY RECAP **********************************
  localhost: ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
  ```

## Lint

* La commande `ansible-lint` permet de vérifier la syntaxe des playbooks

  ``` bash
  $ ansible-lint style_example.yml
  ```

  ![](https://i.imgur.com/jVib4Gn.png)

## Éxecution impérative

* Développer des playbooks en YAML permet de stocker son travail pour en garder une trace et pouvoir le réutiliser plus tard. Mais on veut parfois tester une commande, par exemple pour tester la connectivité, vérifier le comportement d'une commande ou récupérer rapidement des informations.

  Pour ce faire, on peut utiliser une commande impérative, c'est à dire exécuter une commande qui lancera une tâche ansible directement, sans passer par une déclaration dans un fichier YAML

* La commande `ansible` permet de lancer des tâches de manière impérative, sur les hôtes spécifiés.  
  L'option -m spécifie le module à exécuter

  ``` bash
  $ ansible -m ping all
  ```
  ``` bash
  $ ansible -m ping host1:host2
  ```
  ``` bash
  $ ansible -m setup localhost
  ```

  L'option -a définit les arguments donnés au module.  
  Si omis, le module par défaut est "shell"

  ``` bash
  $ ansible -m shell -a 'echo $HOSTNAME' localhost -v
  localhost | CHANGED | rc=0 >>
  aea658f32f4a

  $ ansible -a 'echo $HOSTNAME' localhost -v
  localhost | CHANGED | rc=0 >>
  aea658f32f4a
  ```
  ``` bash
  ansible -a 'cat /etc/hosts' all
  ```
  ``` bash
  ansible -a 'yum install nginx' all --become --become-user nginx
  ```
  ``` bash
  ansible node00 -m copy -a "src=/etc/resolv.conf dest=/tmp/resolv.conf" -i inventory
  ```

{% endraw %}