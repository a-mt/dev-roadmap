---
title: Puppet
category: Other
---

Puppet est un outil permettant d'automatiser la gestion et la configuration d'un parc informatique.

Contrairement à Ansible, Puppet prend en charge l'*idempotence* des machines: il vérifie l'état actuel de la machine cible et n'effectue les changements demandés uniquement si nécessaire. Par exemple, Puppet n'exécutera la commande `mkdir` (création d'un nouveau répertoire) que si le répertoire cible n'existe pas déjà. Cela permet de maintenir la machine à jour et garder le jeu d'instruction complet sans avoir à ré-installer à partir du début à chaque fois.

* Installer

  Puppet fonctionne avec une architecture agent/master, dans laquelle le noeud *master* contrôle les informations de configuration d'un ensemble de noeuds *agent*. Les master et agents communiquent par HTTPS.  
  On peut également utiliser Puppet sans master, en installant simplement Puppet Agent sur la machine courante.

  * **Pré-requis**:  
    Puppet Server, installé sur le noeud master, nécessite au moins 1Go de RAM et au moins 2 CPU pour gérer une douzaine d'agents. Pour de simples tests, on peut baisser cette limite à 512M de RAM.  
    Puppet Agent n'a pas d'exigences matérielles particulières et peut fonctionner sur presque n'importe quelle machine.

    [Hardware requirements](https://puppet.com/docs/puppet/6.0/system_requirements.html)

  * [Installer Puppet Server](puppet-install-server.md)
  * [Installer Puppet Agent](puppet-install-agent.md)
  * [Fichiers de configuration](puppet-conf.md)
  * [Orchestration](puppet-orchestrate.md)

* Utiliser
  * [Bases de Puppet](puppet-bases.md)
  * [Classes & modules](puppet-class.md)
  * [Versionnement](puppet-r10k.md)