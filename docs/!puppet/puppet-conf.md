---
title: Fichiers de configurations
category: Puppet
---

## Fichiers de configurations

* Le fichier de configuration par défaut de Puppetl est `/etc/puppetlabs/puppet/puppet.conf` pour l'utiilsateur root.  
  On peut exécuter Puppet avec le paramètre `--confdir` pour spécifier un autre répertoire de configuration.

  [Config directory (confdir)](https://puppet.com/docs/puppet/6.4/dirs_confdir.html).

* Pour certaines tâches, telles que la configuration du serveur Web ou de la CA, il existe des fichiers de configurations spécifiques — tels que `webserver.conf` et `ca.conf`.

  [Puppet Server Configuration](https://puppet.com/docs/puppetserver/6.3/configuration.html)

* Chaque environnement a un fichier `environment.conf`.  
  Il peut être utilisé pour écraser certains paramètres spécifiques à l'environnement.
  Il existe par défaut un seul environnement, production: `/etc/puppetlabs/code/environments/production`

  [environment.conf: Per-environment settings](https://puppet.com/docs/puppet/6.4/config_file_environment.html)

## Configurations

Le comportement de Puppet peut être personnalisé avec un grand nombre de paramètres:  
[Short List of Important Settings](https://puppet.com/docs/puppet/latest/config_important_settings.html)  
[puppet.conf reference page](https://puppet.com/docs/puppet/latest/config_file_main.html)

## Sections

Les fichiers de configurations sont constitués de 4 sections:

| Section    | Description
|---         |---
| `[main]`   | Paramètres globaux utilisés par toutes les commandes et tous les services
| `[master]` | Paramètres spécifiques au service Puppet master.<br> Également utilisé par la commande Puppet Server ca.
| `[agent]`  | Paramètres spécifiques au service Puppet agent.
| `[user]`   | Paramètres spécifiques à la commande Puppet apply.<br> Également utilisé pour les autres commandes Puppet peu courantes

## Éditer les configurations

Le fichier `puppet.conf` peut être édité directement, ou on peut utiliser la commande suivante — qui édite le fichier `puppet.conf` de l'utilisateur en cours:

```
puppet config set VAR VALUE
```

Pour voir la valeur d'une configuration:

```
puppet config print VAR
```

## Variables

Le fichier de configuration peut utiliser les valeurs d'autres paramètres comme variables:

```
environmentpath = $codedir/special_environments:$codedir/environments
```

```
ssldir = $vardir/ssl {owner = service, mode = 0771} 
```