---
title: Cloud Service Provider (CSP)
category: Linux
---

* Un *Cloud Service Provider* (CSP) est une organisation qui met à disposition différents types de services dans le cloud. Parmi les CSP les plus connus, on peut citer AWS (*Aamazon Web Services*), Microsoft Azure ou GCP (*Google Cloud Provider*).

## Types de services

* Les différents types de services qu'on peut obtenir auprès de ces fournisseurs sont:

  - **IaaS** (*Infrastructure As A Service*)  
    Permet d'utiliser les ressources matérielles et réseau de quelqu'un d'autre.  
    On a un accès direct au matériel via la ligne de commande, mais on doit s'occuper de tous les détails du déploiement.  
    Ex: AWS, Joyent, Rackspace Cloud

  - **PaaS** (*Platform As A Service*)  
    Le CSP fournit non seulement le matériel physique, mais aussi le système d'exploitation: il ne reste plus qu'à se concentrer sur l'application, le reste est géré par le CSP.  
    L'avantage est qu'on peut gagner du temps, l'inconvénient est que si on veut faire quelque chose qui n'est pas prévu par la plateforme, on doit revenir à la couche matérielle — et ce n'est pas toujours faisable.  
    Ex: Heroku, DotCloud, Nodester, Google AppEngine

  - **SaaS** (*Software As A Service*)  
    Non seulement le matériel et le système d'exploitation sont gérés par le fournisseur, mais l'application l'est également. On interragit uniquement avec une API ou une interface graphique, sans contrôle sur le matériel ou les configurations.  
    On peut par exemple utiliser cette solution lorsqu'on a besoin d'un serveur de BDD générique qu'on ne souhaite pas gérer en interne. Il s'agit généralement du type de service le plus cher — mais qui fournit beaucoup de services.  
    Ex: Salesforce, Google Apps, Mint.com

* Le plupart des CSP facturent non seulement le type de service fournit, mais aussi le nombre d'instances et leur durée d'exécution — une instance étant une VM en cours d'exécution. Les CSP facturent également d'autres choses, comme par exemple la puissance du CPU.

    Les CSP peuvent avoir ce qu'on appelle un *free tier*, où rien n'est facturé tant qu'on utilise une instance peu puissante qui ne tourne pas très longtemps.

* Il y a différents types de cloud: privés, publiques ou hybrides.

  - Les **clouds publics** sont ouverts au public via internet
  - Les **clouds privés** sont réservés à une organisation particulière
  - Les **clouds hybrides** sont des clouds dont certaines parties sont publiques, tandis que d'autres sont privées. Ou alors certaines parties sont locales à l'organisation, tandis que d'autres sont gérées par un CSP

## Fonctionnalités

* <ins>Console de management ou portail</ins>  
  Pour gérer et surveiller les instances, un CSP fournit généralement une console. Il s'agit d'une application dans le navigateur web, contenant diverses fonctionnalités dans des menus. De nombreuses certifications CSP exigent que vous sachiez exactement où se trouvent les éléments dans ces menus et à quoi ils servent

* <ins>Élasticité</ins>  
  Il s'agit de la mise à échelle d'une instance ou de ressources d'instance. Par exemple, si le trafic réseau d'une application web augmente suite à une offre spéciale de l'entreprise, et que vous avez configuré votre instance pour qu'elle soit élastique, alors des instances supplémentaires démarrerons automatiquement pour gérer la charge du trafic web. Une fois que la charge aura diminué, les instances supplémentaires s'éteindrons automatiquement, pour que l'entreprise ne soit pas facturée pour les instances inutilisées.

* <ins>Load balancing</ins>  
  Similaire à l'élasticité, mais se concentre sur l'utilisation de plusieurs instances en parallèle pour fournir un service fluide. Par exemple, on peut avoir deux instances qui jouent le rôle de serveurs web, et le CSP équilibrera le trafic entre ces deux instances, afin qu'aucune instance ne se retrouve à gérer l'ensemble du trafic ce qui entraînerait une baisse de performance pour les clients

* <ins>Bloc storage</ins>  
  De l'espace disque est disponible auprès du CSP et peut être attaché de manière permanente ou temporaire. Ces disques ont une taille fixe et sont montés de la même manière que les systèmes de fichier sous Linux

* <ins>Object storage</ins>  
  L'object sotrage est plus souple que le bloc storage: ce type de stockage ne nécessite pas l'exécution d'une instance pour accéder à ce qui y est stocké. À la place, on peut accéder au stockage d'objets par le biais du portail

* <ins>Networking</ins>  
  Il existe des services réseau supplémentaires que le CSP peut fournir, comme un réseau interne autour des instances, géré à travers le portail. On peut attacher ou détacher une gateway qui permet aux instances de communiquer entre elles.  
  Le CSP fournit souvent des services DNS. Sans ça, les adresses IP des instances fluctuent généralement à chaque démarrage, ce qui peut poser problème.

* <ins>Cloud-init</ins>  
  Il est possible d'initialiser la création d'instances, de customer les VM avec des templates, et leur configuration via des fichiers YAML, grâce à l'utilitaire cloud-init de Canonical. Cet utilitaire fonctionne avec de nombreux CSP, dont AWS et Azure.

  [Documentaton cloud-init](https://cloudinit.readthedocs.io/en/latest/)

## Connexion à une instance dans le cloud

Si le CSP ne le fournit pas de base, créer des clés SSH pour se connecter à l'instance:

1. Sur l'instance invitée, générer des clés SSH avec `ssh-keygen`
2. Copier la clé sur le système Linux local à partir du système invité avec `ssh-copy-id`
3. Utiliser openssh pour créer une connexion securisée entre les deux systèmes Linux
