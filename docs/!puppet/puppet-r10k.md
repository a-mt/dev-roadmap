---
title: Versionnement
category: Puppet
---

r10k est un outil de gestion qui aide à gérer les différents environnements Puppet (tels que développement, test, production) en utilisant les différents branches d'un système de contrôle de versionnement (git).

r10k crée les environnement sur la machine master et installe et met à jour les dépendances de l'environnement en utilisant le fichier `Puppetfile` du repo.

---

## Installer

* Installer le package `r10k`.  
  Si vous avez ajouté le répertoire de Puppet à votre path, vous devez avoir accès à l'outil `gem`.  
  Il permet d'installer des packages Ruby et notamment `r10k`.

  ```
  gem install r10k
  ```

* Créer le fichier de configuration de `r10k`
  
  ```
  mkdir /etc/puppetlabs/r10k
  vim /etc/puppetlabs/r10k/r10k.yaml
  ```

  ```
  ---
  :cachedir: '/var/cache/r10k'

  :sources:
        :my-org:
            remote: 'https://github.com/username/control_repo.git'
            basedir: '/etc/puppetlabs/code/environments'
  ```

  * `cachedir`: répertoire où les modules sont téléchargés (depuis Forge) avant d'être placés dans l'environnement  
  * `basedir`: répertoire où les environnements sont installés

* Définir la branche par défaut sur Github.  
  Git utilise normalement `master` comme nom de branche par défaut, ce qui peut porter à confusion puisque le serveur Puppet est également appelé master. Pour éviter toute ambiguité, Puppet ne marche pas avec la branche `master` mais `production` comme branche par défaut.  
  Vous pouvez définir votre branche par défaut sur Github dans Settings > Branches.

---

## Configurations

### Puppetfile

Le fichier `Puppetfile` (à la racine du repo) permet de définir les dépendences de l'environnement — l'ensemble des modules à installer lors du déploiement.

```
mod 'puppet/nginx'
mod 'puppetlabs/stdlib'
mod 'puppetlabs/concat'
```

### environment.conf

Le fichier `environment.conf` (à la racine du repo) permet de définir les configurations spécifiques à l'environnement, par exemple `modulepath`

```
modulepath: site:modules:$basemodulepath
```

* `site`: répertoire où on a placé les rôles et profils de l'environnement
* `modules`: répertoire où r10k va installer les dépendances du module
* `$basemodulepath`: répertoire où sont stockés les modules internes de Puppet

---

## Exemple: serveur Minecraft

* Module Minecraft  
  `site/minecraft/manifests/init.pp`

  ```
  class minecraft {
    file { '/opt/minecraft':
      ensure => directory,
    }
    file { '/opt/minecraft/minecraft_server.jar':
      ensure => file,
      source => 'https://s3.amazonaws.com/Minecraft.Download/versions/1.12.2/minecraft_server.1.12.2.jar',
    }
    package { 'java':
      ensure => present,
    }
    file { '/opt/minecraft/eula.txt':
      ensure  => file,
      content => 'eula=true',
    }
    file { '/etc/systemd/system/minecraft.service':
      ensure => file,
      source => 'puppet:///modules/minecraft/minecraft.service'
    }
    service { 'minecraft':
      ensure => running,
      enable => true,
    }
  }
  ```

  `site/minecraft/files/minecraft.service`

  ```
  [Unit]
  Description=Minecraft Server

  Wants=network.target
  After=network.target

  [Service]
  WorkingDirectory=/opt/minecraft
  ExecStart=/usr/bin/java -Xmx512M -Xms32M -jar minecraft_server.jar nogui

  [Install]
  WantedBy=multi-user.target
  ```

* Profils  
  `site/profile/manifests/minecraft.pp`

  ```
  class profile::minecraft {
    include minecraft
  }
  ```

  `site/profile/manifests/base.pp`

  ```
  class profile::base {
    user {'admin':
      ensure => present,
    }
  }
  ```

* Rôles  
  `site/role/manifests/minecraft_server.pp`

  ```
  class role::minecraft_server {
    include profile::base
    include profile::minecraft
  }
  ```

* Manifeste principal  
  `manifests/site.pp`

  ```
  node 'minetest.puppet.vm' {
    include role::minecraft_server
  }
  ```

[Exemple serveur Minecraft](https://github.com/ggunson/control_repo)

---

## Déployer

* Déployer l'environnement

  ```
  r10k deploy environment -p
  ```

* Mettre à jour le noeud

  ```
  puppet agent -t
  ```

* Vérifier l'installation

  ```
  systemctl status minecraft
  ```