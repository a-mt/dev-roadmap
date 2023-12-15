---
title: API
---

# API

* Une API (*Application Programming Interface*) est une interface entre applications ou programmes. Plus précisemment il s'agit d'un ensemble d'endpoint, permettant de déclencher des actions.

  ![](https://i.imgur.com/ZlHiHae.png)

* Un *endpoint* est typiquement une URL et un verbe HTTP.  
  Par exemple, le endpoint `GET /books` permet de récupérer la liste des livres présents en BDD. Le résultat du endpoint sera retourné dans un format facilement compréhensible par un autre langage de programmation, typiquement le JSON est utilisé.

* Avoir une API va ainsi permettre à deux systèmes informatiques, probablement dans deux langages différents, de s'appuyer l'un sur l'autre.

  Dans le web 2.0 le front, qui est le code s'executant côté client, envoit des requêtes AJAX au back, qui est le code s'executant côté serveur, à un endpoint spécifique de l'API. Cela va permettre de mettre à jour la BDD et de récupérer des informations sans avoir à rafraîchir l'entièreté de la page.

* Il existe différents modèles d'API, qui peuvent être divisés en deux grands groupes:

  - <ins>Request-response</ins>: REST, RPC, GraphQL  
    Le client initie l'action en envoyant une requête au serveur et attend une réponse

  - <ins>Event-driven</ins>: Polling, WebSockets, WebHooks  
    Le serveur initie l'action en envoyant des données au fur et à mesure qu'il en obtient. Ce type d'API est idéal pour les services dont les données évoluent rapidement, par exemple un chat ou un graphique en temps réel
