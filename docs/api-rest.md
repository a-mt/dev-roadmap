---
title: API REST
---

* Une API REST (*Representational State Transfer*) est le type d'API le plus simple et le plus populaire. Selon Roy Fielding, qui a défini ce modèle, REST est un ensemble de principes, de propriétés et de contraintes. REST utilise le modèle de communication client-serveur et utilise généralement le protocole HTTP (*Hypertext Transfer Protocol*).

* Les 6 propriétés qui définissent une API REST sont:

  * **architecture client-serveur**:  
    Les serveurs sont les entités qui fournissent des services tels que l’heure, le partage de données, etc.  
    Les clients sont les entités qui interrogent ces services.

  * **sans état** (*stateless* en anglais):  
    Chaque message contient toutes les informations nécessaires à son traitement. L’état de l’interaction entre le client et le serveur n’est pas stocké et chaque requête client est traitée comme une nouvelle demande indépendante. Le serveur n’a pas besoin de stocker, suivre ou analyser les requêtes précédentes du même client. Cela permet de simplifier le traitement dans le serveur qui doit traiter les requêtes d'un grand nombre de clients.

    Cela impose que l’état soit situé du côté du client. Cet état est alimenté à partir des données structurées que le client reçoit du serveur. Le client doit donc comprendre les données que le serveur lui envoie et connaître le format de représentation de la ressource qu'il reçoit

  * **cachable**:  
    Les clients peuvent mettre en cache les réponses pour une utilisation ultérieure. Cela permet d'améliorer les performances.

  * **en couches**:  
    Les services peuvent être réalisés en utilisant différents serveurs responsables de différentes parties de services (stockage, recherche, etc). Le client ne sait pas s’il est connecté au serveur final ou à un serveur intermédiaire.

  * **code à la demande** (facultatif):  
    Les serveurs peuvent éventuellement envoyer du code exécutable aux clients.

  * **interface uniforme**:  
    Chaque resource est identifiée par une URI unique et a une seule représentation, un ensemble d'attributs qui est fixe. Ainsi la liste des resources `book` accessibles à partir de `GET /books` aura les mêmes attributs que la resource `book` 1 accessible à partir de `GET /books/1`. On pourra avoir une version abbrégré, à partir de `GET /books-preview`, qui ne retournera qu'un sous-ensemble d'attributs: si les attributs sont différents, alors le type de ressource est différent.

* Le respect de ces règles permet l’évolutivité du système en ajoutant continuellement des acteurs et de nouvelles données. L’objectif principal est de simplifier le comportement du serveur afin de servir le plus grand nombre de requêtes possible.

* HTTP est un protocole souvent utilisé pour mettre en oeuvre un serveur Web qui implémente les principes de REST (qualifié en anglais de *RESTfull*). HTTP définit différentes méthodes qui permettra au client d’interagir avec les ressources sur le serveur :

  - <ins>GET</ins>: récupérer les données  
    Est utilisé pour récupérer la représentation d’une ressource  
    (par exemple une page Web, la valeur de température d’un capteur, etc.).

    ```
    GET /restaurants/        — Lister tous les restaurants
    GET /restaurants/:id     — Récupérer un restaurant
    ```

  - <ins>HEAD</ins>: récupérer les métadonnées  
    Est utilisé pour récupérer uniquement les métadonnées présentes dans les entêtes de réponse, sans le corps de réponse

  - <ins>POST</ins>: créer    
    Est utilisé pour créer une nouvelle ressource

    ```
    POST /restaurants/       — Créer un nouveau restaurant
    ```

  - <ins>PUT</ins>: modifier (upsert)  
    Est utilisé pour stocker une ressource à l’endroit identifié par l’URI. Si la ressource existe déjà, elle sera modifiée

  - <ins>PATCH</ins>: modifier partiellement    
    Est utilisé pour effectuer une mise à jour partielle d'une ressource qui existe déjà

    ```
    PATCH /restaurants/:id   — Modifier un restaurant
    ```

  - <ins>DELETE</ins>: supprimer    
    Est utilisé pour supprimer une ressource donnée

    ```
    DELETE /restaurants/:id  — Supprimer un restaurant
    ```
