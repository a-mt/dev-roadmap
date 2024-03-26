---
title: Classes & modules
category: Puppet
---

## Node

Un bloc `node` permet de définir un code Puppet qui ne s'appliquera qu'à certains noeuds donnés.  

* Le noeud `default` s'applique à chaque noeud agent qui n'ont pas de bloc spécifié.

* On peut utiliser des regex pour tester le nom du noeud, ou des simples chaînes de caractères.

* Un noeud ne correspond qu'à un seul bloc (le plus spécifique) et il n'y a pas d'héritage entre les différents blocs `node`.

```
node 'ns1', 'ns2' {    # applies to ns1 and ns2 nodes
  file {'/tmp/dns':    # resource type file and filename
    ensure => present, # make sure it exists
    mode => 0644,
    content => "Only DNS servers get this file.\n",
  }
}

node /^web/ {
  include role::app_server
}
node /^db/ {
  include role::db_server
}

node default {}       # applies to nodes that aren't explicitly defined
```

---

## Classe

Une *classe* est un wrapper pour une liste de ressource qui sont gérées ensemble comme une seule unité. Par exemple, la liste des ressources (fichiers, utilisateur, packages) pour un serveur `apache`.

### Définir une classe

La *définition* d'une classe s'effectue dans le manifeste ou dans un module.  
On définit le contenu et le comportement de la classe.  
Définir une classe ne l'inclue pas automatiquement dans une configuration, ça ne fait que la définir.

```
class dev_environment {
  user { 'grace':
    ensure      => present,
    manage_home => true,
    group       => [ 'wheel' ],
  }
  package { 'vim':
    ensure => present,
  }
  file { '/home/grace/.vimrc':
    ensure => file,
    source => 'puppet:///modules/dev_environment/vimrc'
  }
}
```

Note: Pour une ressource `file`, l'option `source` permet de copier un fichier (au lieu de simplement spécifier le contneu du fichier avec `content`).  
`puppet:///modules/apache/info.php` est interprété en `/$codedir/modules/apache/files/info.php`.

### Déclarer une classe

La *déclaration* d'une classe aura pour effet d'ajouter les ressources de cette classe au catalogue — autrement dit, on instancie cette classe. Pour ce faire, on a deux possibilité:

* utiliser le mot-clé `include`

  ```
  include dev_environment
  ```

* ou utiliser une ressource

  ```
  class {"dev_environment": }
  ```

Les classes sont réutilisables, elles peuvent être utilisées à l'intérieur de plusieurs nodes — mais ne peuvent être utilisées qu'une seule fois à l'intérieur d'un noeud donné.

```
node default {
  include dev_environment
}
node 'grace.puppet.vm' {
  include dev_environment
}
```

Les classes ne sont appliquées que lorsqu'elles sont invoquées, ce qui permet de réutiliser le code Puppet (et donc de réduire les erreurs) mais aussi de faciliter la lecture des manifestes.

```
node 'site.example.com' {
  include ssh
  include apache
  include mysql
  include web-app
}
```

Les classes peuvent être incluses dans d'autres classes en plus des ressources. C'est une manière de procéder très courante, qui permet de définir des unites logiques de configuration et de les coomposer ensuite comme des abstractions de niveau supérieur.

```
class foo {
  include dev_environment
  class { 'another_class':
    ensure => present,
  }
  file { '/some/file.txt',
    ensure  => file,
    content => 'some content',
  }
}
```

### Variables

On peut définir des variables à l'intérieur de la classe, dont la portée sera limitée à cette classe.

```
class minecraft {
    $url = 'https://s3.amazonaws.com/Minecraft.Download/versions/1.12.2/minecraft_server.1.12.2.jar'
    $install_dir = '/opt/minecraft'
    file { $install_dir:
      ensure => directory,
    }
    file { '${install_dir}/minecraft_server.jar':
      ensure => file,
      source => $url,
    }
    ...
}
```

### Paramètres

Plutôt que d'utiliser des variables, on peut utiliser des paramètres, déclarées entre crochets après le nom de la classe. Cela permet de définir des valeurs par défaut, mais qui peuvent être modifiées lorsqu'on déclare la classe.

* Définition

  ```
  class minecraft {
      $url = 'https://s3.amazonaws.com/Minecraft.Download/versions/1.12.2/minecraft_server.1.12.2.jar',
      $install_dir = '/opt/minecraft'
  }{
      file { $install_dir:
        ensure => directory,
      }
      file { '${install_dir}/minecraft_server.jar':
        ensure => file,
        source => $url,
      }
      ...
  }
  ```

* Déclaration

  ```
  class { 'minecraft':
    install_dir => '/Src/minecraft',
  }
  ```

[Language: Classes](https://puppet.com/docs/puppet/5.3/lang_classes.html)

---

## Modules

Un *module* est un répertoire avec une structure spécifique, où l'on va placer les manifestes, templates, fichiers, etc. Grâce à cette infrastructure prédéfinie, on peut bénéficier de l'autoloading des classes et données.

La structure du répertoire est la suivante:

```
module-name/
|- manifests
  |- init.pp
|- files
|- templates
|- lib
|- examples
|- spec
```

* Le nom du répertoire est le nom du module
* `manifests/init.pp` doit contenir une définition de classe qui a le même nom que le module

  ```
  class monmodule {}
  ```

* On peut créer des sous-classes  
  * `manifests/dev.pp` pourra être invoqué dans le manifeste principal avec `monmodule::dev`  
  * `manifests/mod/auth_basic.pp` avec `monmodule::mod::auth_basic`

* `files` contient des fichiers statiques qui peuvent être téléchargés par les noeuds

  ```
  file { '/etc/shells':
    ensure => file,
    owner  => 'root',
    group  => 'root',
    source => 'puppet:///modules/shells/shells',
  }
  ```

* `templates` contient des templates que le manifest du module peut utiliser
* `lib` contient des plugins, facts et ressources personnalisés
* `examples` contient des exemples indiquant comment déclarer les classes, modules et types définis
* `spec` contient les tests des plugins dans le répertoire lib

Puppet cherche les modules dans un ensemble de répertoire définis par le paramètre *modulepath*. Le chemin par défaut de modulepath est `$codedir/modules` (donc ` /etc/puppetlabs/code/environments/production/modules` pour l'environnement de production)

[Module fundamentals](https://puppet.com/docs/puppet/5.3/modules_fundamentals.html)  
[Exemple de module: Apache](https://github.com/puppetlabs/puppetlabs-apache)

### Exemple

* Définir le manifeste du module: `/etc/puppetlabs/code/environments/production/modules/lamp/manifests/init.pp`

  ```
  class lamp {
    # execute 'apt-get update'
    exec { 'apt-update':                    # exec resource named 'apt-update'
      command => '/usr/bin/apt-get update'  # command this resource will run
    }

    # install apache2 package
    package { 'apache2':
      require => Exec['apt-update'],        # require 'apt-update' before installing
      ensure => installed,
    }

    # ensure apache2 service is running
    service { 'apache2':
      ensure => running,
    }

    # install mysql-server package
    package { 'mysql-server':
      require => Exec['apt-update'],        # require 'apt-update' before installing
      ensure => installed,
    }

    # ensure mysql service is running
    service { 'mysql':
      ensure => running,
    }

    # install php5 package
    package { 'php5':
      require => Exec['apt-update'],        # require 'apt-update' before installing
      ensure => installed,
    }

    # ensure info.php file exists
    file { '/var/www/html/info.php':
      ensure => file,
      content => '<?php  phpinfo(); ?>',    # phpinfo code
      require => Package['apache2'],        # require 'apache2' package before creating
    } 
  }
  ```

* Invoquer le module dans le manifeste principal: `/etc/puppetlabs/code/environments/production/manifests/site.pp`

  ```
  node default { }

  node 'lamp-1' {
    include lamp
  }
  ```

  ```
  node 'host2' {
    class { 'apache': }             # use apache module
    apache::vhost { 'example.com':  # define vhost resource
      port    => '80',
      docroot => '/var/www/html'
    }
  }
  ```

---

## Forge

Puppet met à disposition un dépot public, Puppet Forge, qui permet de trouver rapidement et d'installer des modules d'installation pré-définis, tels qu'Apache ou MySQL par exemple. Vous y trouverez 3 catégories de modules:

* *Supported modules*:  modules écrits et maintenus par Puppet.
* *Approved modules*: modules qui été vérifiés et approuvés par Puppet
* *Community modules*: modules qui n'appartiennent pas aux deux premières catégories

### Partager un module

Un module sur Puppet Forge respecte la structure d'un module classique et contient également

* `metadata.json`: metadata du module — telles que les dépendances, les systèmes d'exploitation pris en charge, le nom de l'auteur ou encore le numéro de version du module.

* `README`: description du module — s'affiche sur la page du module (sur [Puppet Forge](https://forge.puppet.com))

Puppet propose un outil d'aide à l'écriture de module: le [Puppet Development Kit](https://github.com/puppetlabs/pdk).

### Utiliser un  module

* Installer le module `puppetlabs-apache`:

  ```
  sudo puppet module install puppetlabs-apache
  ```

  [Readme Puppet Apache](https://forge.puppet.com/puppetlabs/apache)

* Installer le module `puppetlabs-mysql`:

  ```
  sudo puppet module install puppetlabs-mysql
  ```

  [Readme Puppet Mysql](https://forge.puppet.com/puppetlabs/mysql)

* Inclure les modules dans le manifeste `site.pp`

  ```
  node default { }

  node 'lamp-1' {
    class { 'apache':                # use the "apache" module
      default_vhost => false,        # don't use the default vhost
      default_mods => false,         # don't load default mods
      mpm_module => 'prefork',       # use the "prefork" mpm_module
    }
    include apache::mod::php         # include mod php
    apache::vhost { 'example.com':   # create a vhost called "example.com"
      port    => '80',               # use port 80
      docroot => '/var/www/html',    # set the docroot to the /var/www/html
    }

    class { 'mysql::server':
      root_password => 'password',
    }
    file { 'info.php':                                # file resource name
      path => '/var/www/html/info.php',               # destination path
      ensure => file,
      require => Class['apache'],                     # require apache class be used
      source => 'puppet:///modules/apache/info.php',  # specify location of file to be copied
    }
  }
  ```

  Le module Apache peut prendre des paramètres pour modifier son comportement par défaut, même principe pour MySQL (voir Readme file de ces modules).

---

## Roles & Profils

La méthode native pour classifier des noeuds dans Puppet est d'assigner des classes dans `site.pp`:

```
node 'hermes.example.com' {
  include network
  include users
  include exim
  include dovecot
  inclure roundcube
}

node 'ares.example.com' {
  include network
  include users
  include mysql
}
```

Mais plus il y de noeuds, plus il devient difficile de se rappeler le rôle de chaque noeud — on doit se faire une carte mentale de ce que fait chaque classe et de la manière dont elle se rapporte au noeud. Il peut devenir difficile de distinger les machines de dev des machines de production par exemple.

Pour régler ce problème, on utilise les rôles et profils. Il s'agit en vérité juste de modules écrits de manière à clarifier le rôle de chaque noeud.

* Un *rôle* est juste la déclaration de ce que l'hôte fait — `role::webserver`, `role::dbserver`, `role::mailserver` par exemple

  ```
  node 'areas.example.com' {
    include role::dbserver
  }
  node 'zeus.example.com' {
    include role::webserver
  }
  node 'hera.example.com' {
    include role::webdbserver
  }
  node 'hermes.example.com' {
    include role::webmail
  }
  ```

* Le but d'un *profil* est d'implémenter toute la logique, les différents paramètres dont vous avez besoin pour utiliser les modules technologiques et spécifier exactement ce qu'ils doivent faire.

  ```
  # site/profile/manifest/base.pp
  class profile::base {
    include network
    include users
  }
  ```

  ```
  # site/profile/manifest/web.pp
  class profile::web {
    include apache
    include php
    include tomcat
    include jdk
    include memcache
  }
  ```

  ```
  # site/profile/manifest/db.pp
  class profile::db {
    include mysql
  }
  ```

  ```
  # site/profile/manifest/mail.pp
  class profile::mail {
    include exim
  }
  ```

* Les profils sont ensuite assignés aux rôles.  
  Cette abstraction est conçue pour vous permettre de comprendre votre infrastruture, d'avoir un code plus propre et réutilisable entre tous les modules que vous avez écrits.

  ```
  # site/role/manifests/dbserver.pp
  class role::dbserver {
    include profile::base
    include profile::db
  }
  ```

  ```
  # site/role/manifests/webserver.pp
  class role::webserver {
    include profile::base
    include profile::web
  }
  ```

  ```
  # site/role/manifests/webdbserver.pp
  class role::webdbserver {
    include profile::base
    include profile::db
    include profile::web
  }
  ```

  ```
  # site/role/manifests/webmail.pp
  class role::webmail {
    include profile::base
    include profile::mail
  }
  ```

[Roles and profiles: A complete example](https://puppet.com/docs/pe/2017.2/r_n_p_full_example.html)