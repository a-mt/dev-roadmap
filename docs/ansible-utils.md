---
title: Modules utiles
category: Ansible
---

{% raw %}
## Créer des fichiers

### file

Le module `file` permet de créer un fichier ou répertoire vide et de définir les permissions.  
[Documentation module file](https://docs.ansible.com/ansible/latest/modules/file_module.html#file-module) 

```
- name: Create custom document root
  file: path={{ doc_root }} state=directory owner=www-data group=www-data
```

### copy

Le module `copy` permet de copier un fichier statique sur le manager vers les hôtes distants.  
[Documentation module copy](https://docs.ansible.com/ansible/latest/modules/copy_module.html)

```
- name: Set up HTML file
  copy: src=index.html dest={{ doc_root }}/index.html owner=www-data group=www-data mode=0644
```

index.html:

```
<h1>Hello World</h1>
```

### template

Le module `template` permet d'utiliser un template, contenant des variables, et qui sera convertit en fichier statique avant d'être envoyé vers les hôtes distants. Ansible utilise le moteur de template [Jinja2](http://jinja.pocoo.org/docs/dev/).  
[Documentation module template](https://docs.ansible.com/ansible/latest/modules/template_module)

```
- name: Set up Apache virtual host file
  template: src=vhost.tpl dest=/etc/apache2/sites-available/000-default.conf
```

vhost.tpl:

```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot {{ doc_root }}

    <Directory {{ doc_root }}>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

---

## Exécuter des commandes

### command

Le module `command` permet d'exécuter des fichiers exécutables, présents dans le PATH de l'hôte distant (à moins bien sûr de donner le chemin absolu du fichier). Ce module n'a pas accès aux fonctions du shell (`set`, `2>&1`, `&&`)

```
- name: Check if PHP is installed
  register: php_installed
  command: php -v
  ignore_errors: true
```

### shell

Le module `shell` permet d'exécuter des commandes shell.  
Il donne accès aux fonctionnalités natives du shell (expansions de variables, piping, etc).

```
- name: "Get list of files to remove"
  shell: ls -1 /tmp/emplacement/*.xml | grep -v un-fichier.xml | cat
```

### raw

Le module `raw` permet d'exécuter des commandes sur SSH (`ssh user1@server1 'df -H'`).  
stdout, stderr et le statut de la commande sont disponibles, en revanche la gestion des modifications n'est pas disponible (pas d'idempotence)

```
- name: Bootstrap a host without python2 installed
  raw: dnf install -y python2 python2-dnf libselinux-python
```

---

## Handlers

Les *handlers* permettent de définir des services, que l'on déclenche explicitement par l'option `notify` d'une tâche.

```
tasks:
  - name: Change default Apache virtual host
    template: 
      src: vhost.tpl
      dest: /etc/apache2/sites-available/000-default.conf
    notify: restart apache

handlers:
  - name: restart apache
    service: name=apache2 state=restarted
```

---

## Déléguer des tâches

### delegate_to

L'option `delegate_to` permet d'executer une tâche sur un hôte donné.  
On peut l'utiliser par exemple

* pour récupérer le résultat d'une commande

  ```
  - hosts: db
    tasks:
      - name: Collect webserver server name
        register: webserver_whoami
        shell: cat /opt/whoami
        delegate_to: "{{ groups['web'][0] }}"
        ignore_errors: True

      - name: Store webserver server name
        shell: "echo '{{ webserver_whoami.stdout }}' > /opt/webserver"
  ```

* pour synchroniser les fichiers du manager vers l'hôte

  ```
  tasks:
    - name: recursively copy files from management server to target
      command: rsync -a /path/to/files {{ inventory_hostname }}:/path/to/target/
      delegate_to: 127.0.0.1
  ```

Il existe une syntaxe abrégée pour déléguer à 127.0.0.1: `local_action`

```
tasks:
  - name: recursively copy files from management server to target
    local_action: command rsync -a /path/to/files {{ inventory_hostname }}:/path/to/target/
```

### delegate_facts

Par défaut, les *facts* récupérés par une tâche déléguée provient de l'hôte et non de l'hôte auquel est délégué la tâche. Ce comportement peut être modifié avec l'option `delegate_facts`

```
- hosts: app_servers
  tasks:
    - name: gather facts from db servers
      setup:
      delegate_to: "{{item}}"
      delegate_facts: True
      loop: "{{groups['dbservers']}}"
```

### run_once

L'option `run_once` permet de n'éxecuter une tâche qu'une seule fois pour un lot d'hôtes.  
La tâche est exécutée sur le premier hôte du lot et applique ensuite tous les résultats et facts aux autres hôtes du lot.

```
tasks:
- name: Send summary mail
  mail:
    host: smtp.gmail.com
    port: 587
    username: username@gmail.com
    password: mysecret
    subject: "Summary Mail"
    to: "{{ mail_recipient }}"
    body: "{{ mail_body }}"
  run_once: True
```

{% endraw %}