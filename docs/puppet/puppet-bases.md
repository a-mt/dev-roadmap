---
title: Les bases de Puppet
category: Puppet
---

## Manifeste

Un *manifeste* Puppet est un fichier `.pp`, qui contient la liste des instructions a effecuter sur les différents agents.

### Déploiement master/agent

* Dans le terminal du master: créer le manifeste par défaut, `/etc/puppetlabs/code/environments/production/manifests/site.pp`

  ```
  file {'/tmp/it_works.txt':                        # resource type file and filename
    ensure  => present,                             # make sure it exists
    mode    => '0644',                              # file permissions
    content => "It works on ${ipaddress_eth0}!\n",  # Print the eth0 IP fact
  }
  ```

  Ce manifeste ne fait qu'une seule chose: il s'assure que le fichier `/tmp/it_works.txt` existe, a les bonnes permissions et le bon contenu.

* Dans le terminal de l'agent: forcer la synchronisation de l'agent avec le master

  ```
  sudo -i puppet agent -t
  ```

  Vérifier que le fichier a bien été crée

  ```
  cat /tmp/it_works.txt
  ```

### Déploiement local

La commande `puppet apply` permet d'exécuter des manifestes autres que celui par défaut, sur l'hôte en cours. C'est utile si vous souhaitez tester un nouveau manifeste ou installer les dépendances d'une application par exemple.

```
puppet apply /path/to/your/manifest/init.pp
```

### Valider un manifeste

Pour valider la syntaxe d'un manifeste:

```
puppet parser validate motd.pp
```

---

## Ressources

Les instructions du manifeste sont définies en déclarant des *ressources*.  
Les ressources peuvent représenter des packages, fichiers, services, utilisateur, commandes, etc.   [Types de resources](https://docs.puppet.com/latest/type.html)  
Il est possible de créer des types de ressources personnalisés en définissant des plugins. [Custom Types](https://puppet.com/docs/puppet/5.5/custom_types.html)

Les types de ressources natifs les plus courants sont:

* `package`: déclenche l'installation d'un package s'il n'est pas déjà installé sur l'agent

  ```
  package { 'nginx':
      ensure  => 'installed'
  }
  ```

* `exec`: permet d'exécuter arbitrairement n'importe quelle commande

  ```
  exec { 'apt-get update':
      command => '/usr/bin/apt-get update'
  }
  ```

  Notons que le `apt-get update` sur la première ligne n'est pas la déclaration de la commande, mais un identifiant pour cette ressource (unique dans le manifeste).

* `file`: permet de créer un fichier

  ```
  file { '/root/README':
    ensure => file,
    content => 'hello world',

  }
  ```

Puppet utilise le RAL (Resource Abstraction Layer) pour abstraire les types de ressources de l'implémentation technique: on peut utiliser la même ressource quel que soit le système d'exploitation/distribution utilisé.

![](https://i.imgur.com/69dzlv5.png)

### Ordre d'execution

Puppet n'évalue pas les ressources dans l'ordre dans lesquelles elles sont définies. Lorsque l'ordre est important, il faut définir explicitement les dépendances entre les ressources pour garantir que la ressource A sera exécutée avant la ressource B.

* Pour s'assurer qu'une tâche sera exécutée après une autre, utiliser `require`

  ```
  package { 'python-software-properties':
      ensure => 'installed'
  }

  exec { 'add-repository':
      command => '/usr/bin/add-apt-repository ppa:ondrej/php5 -y'
      require => Package['python-software-properties']
  }
  ```

* Pour s'assurer qu'une tâche sera exécutée avant une autre, utiliser `before`

  ```
  package { 'curl':
      ensure => 'installed'
      before => Exec['install script']
  }

  exec { 'install script':
      command => '/usr/bin/curl http://example.com/some-script.sh'
  }
  ```

  On utilise `exec`, `package`, etc, pour déclarer les ressources (en minuscules) mais lorsqu'on faut référence à des ressources précédemment définies, on utilise `Exec`, `Package`, etc (première lettre en majuscule).

---

## Variables

On peut définir des variables dans le manifeste — à tout endroit. Les types des variables les plus courants sont les chaînes de caractères et les tableaux, mais d'autres types sont également supportés, tels que les booléens et objets.

```
$package = "vim"

package { $package:
   ensure => "installed"
}
```

```
file { '/root/README':
  ensure  => file,
  content => "Welcome to ${fqdn}\n",
}
```

---

## Facter

* Facter est un profileur système multiplateforme qui recueille des informations de base sur les différents agents, tel que le nom d'hôte, le système d'exploitation, etc. Ces informations, ou *facts*, sont disponibles dans les manifestes Puppet en tant que variables. Autrement dit, un certain nombre de variables sont populées par l'hôte.

  ![](https://i.imgur.com/rvysW3K.png)

* La commande `facter` permet d'afficher la liste de clé/valeur récupéré par Facteur sur le noeud courant.

  On peut également récupérer la valeur d'une variable spécique, `facter ipaddress_eth0` par exemple.

  [Facts and built-in variables](https://puppet.com/docs/puppet/6.4/lang_facts_and_builtin_vars.html)

* Lorsque que utilisez des facts dans un manifest, préfixez le nom de variable de `::` pour vous assurer de récupérer le fact et non une variable qui aurait écrasé cette valeur

  ```
  ${::architecture}
  ${::ipaddress}
  ```

* On peut définir des facts personnalisés en Ruby.  
  Ces facts personnalisés peuvent ensuite être distribués sur les agents à travers des plugins et modules.

  ```
  Facter.add("hardware_platform") do
    setcode do
      Facter::Core::Execution.exec('cat /sys/power/states')
  end
  ```

  [Custom facts](https://puppet.com/docs/facter/3.9/custom_facts.html)

---

## Boucles

La façon la plus simple de répéter une même tâche avec des valeurs différentes est d'utiliser un tableau. Puppet lancera la tâche autant de fois qu'il y a d'éléments.

```
$packages = ['vim', 'git', 'curl']

package { $packages:
   ensure => "installed"
}
```

Depuis la version 4, on peut également utiliser un curseur. Cela donne plus de flexibilité dans la manière de nommer les ressources:

```
$packages.each |String $package| {
  package { $package:
    ensure => "installed"
  }
}
```

---

## Conditions

Les conditions peuvent être utilisées pour décider dynamiquement si un bloc de code doit être exécuté ou non, selon une variable ou le résultat d'une commande.

* Pour tester une variable, on utilise un bloc `if`:

  ```
  if $osfamily != 'Debian' {
   warning('This manifest is not supported on this OS.')
  }
  else {
   notify { 'Good to go!': }
  }
  ```

* Pour tester le résultat d'une commande, on peut utiliser `onlyif` ou `unless`.  

  * `onlyif` executera le bloc de code si la commande se termine avec succès (statut 0)

    ```
    exec { "Test":
     command => "/bin/echo PHP is installed here > /tmp/test.txt",
     onlyif => "/bin/which php"
    }
    ```

  * `unless` executera le bloc de code si la commande échoue (statut != 0)

    ```
    exec { "Test":
     command => "/bin/echo PHP is NOT installed here > /tmp/test.txt",
     unless => "/bin/which php"
    }
    ```

---

## Templates

Les *templates* sont généralement utilisés pour générer dynamiquement des fichiers de configuration, en utilisant des varibles et autres fonctions de manière à rendre ces fichiers réutilisables.  
Puppet supporte deux format différents: EPP (Embedded Puppet)
et ERB (Embedded Ruby). Le format EEP existe depuis Puppet 4.0

* Définir un template: `apache/templates/vhost.erb`

  ```
  <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot <%= @doc_root %>

      <Directory <%= @doc_root %>>
          AllowOverride All
          Require all granted
      </Directory>
  </VirtualHost>
  ```

* Récupérer le contenu du fichier dans le manifeste: utiliser la fonction `template`

  ```
  file { "/etc/apache2/sites-available/000-default.conf":
      ensure => "present",
      content => template("apache/vhost.erb") 
  }
  ```

  Puppet cherchera le fichier `vhost.erb` dans le répertoire `apache/templates`

---

## Services

Les *services* peuvent être utilisés pour initialiser, activer ou rédemarrer un daemon après avoir effectué une action

* Définir un service dans le manifeste

  ```
  service { 'apache2':
      ensure => running,
      enable => true
  }
  ```

* Déclencher l'appel au service après l'option `notify`

  ```
  file { "/etc/apache2/sites-available/000-default.conf":
      ensure => "present",
      content => template("vhost.erb"),
      notify => Service['apache2'] 
  }
  ```