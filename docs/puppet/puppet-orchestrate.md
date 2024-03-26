---
title: Orchestration
category: Puppet
---

## Mcollective

Mcollective (Marionette Collective) est un package open-source qui était largement utilisé avant que Puppet Enterprise n'ajoute le support natif de l'orchestration. Il permet de déclencher Puppet sur les noeuds.

MCollective fonctionne sur un modèle publish/subcribe, où le Puppet Master maintient une queue (en utilisant un outil tel que ActiveMQ ou RabbitMQ) sur laquelle les agents s'abonnent pour récupérer ou publier des données.

Cette méthode a l'avantage d'être tolérante aux irrégularités de connexion: si un noeud n'est pas en mesure d'atteindre immédiatement la file d'attene, il pourra récupérer les messages publiés dès lors qu'il se connectera. Le principal inconvénient est qu'il est impossible de s'assurer qu'une machine a bien reçu le message.

## App Orchestrator

App orchestration a été l'un des premiers outils offerts par Puppet Enterprise. Il permet de définir un comportement complexe, comme mettre à jour le code de l'application sur un noeud selon la base de donnée d'un autre noeud, ou déclencher le load balancer pour effectuer les mises à jour.

## Puppet Job

Puppet Job est construit sur la même base qu'App Orchestrator, mais est utilisé pour des tâches simples telles que déclencher des exécutions Puppet. On peut déclencher Puppet sur un ensemble de noeuds à l'aide d'une simple commande — sur tous les noeuds d'un environnement ou sur un ensemble de noeuds récupéré avec une requête PuppetDB.

L'avantage de cette approche est que les noeuds maintiennent une connexiona active avec la master, on sait donc quels noeuds ont reçu le message.

## Ansible

Ansible est un projet open-source qui se recoupe avec Puppet. Ansible ne nécessite pas l'installation d'un agent, il utilise SSH pour se connecter aux noeuds. Il ne gère pas l'état désiré aussi bien que Puppet, beaucoup d'utilisateurs combinent donc les deux outils: Puppet pour maintenir l'état désiré du système, Ansible pour orchestrer le déclenchement des tâches.

## Cron

Une solution simple, et native à Puppet, est de programmer un cron toutes les 30 minutes sur les agents. Ce type d'orchestration n'est pas très robuste mais a l'avantage de la simplicité.