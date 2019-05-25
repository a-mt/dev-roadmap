---
title: Lancer Nginx-proxy
category: Hosting
---

Nginx-proxy va permettre d'héberger plusieurs sites sur le même VPS en relayant les requêtes vers un container ou un autre selon le nom de domaine utilisé.

* Créer un répertoire pour mettre tous les fichiers que vous allez utiliser avec Nginx-proxy

  ```
  mkdir ~/proxy
  cd ~/proxy
  ```

* Créer un network docker  
  Le proxy va gérer tous les containers dans le même network

  ```
  docker network create nginx-proxy
  ```

* Créer `~/proxy/docker-compose.yml`  
  Si quelqu'un essaie d'accéder au serveur en utilisant l'IP publique du serveur, Nginx-proxy servira le container correspondant à `DEFAULT_HOST`

  ```
  version: "3"
  services:
    nginx-proxy:
      image: jwilder/nginx-proxy
      ports:
        - "80:80"
      volumes:
        - /var/run/docker.sock:/tmp/docker.sock:ro
      environment:
        - DEFAULT_HOST=www.a-mt.xyz

  networks:
    default:
      external:
        name: nginx-proxy
  ```

* Éditer `~/nginx/docker-compose.yml` pour ajouter la variable d'environnement `VIRTUAL_HOST` et pour utiliser le network `nginx-proxy`

  ```
  version: "3"
  services:
    web:
      image: nginx
      volumes:
       - ./html:/usr/share/nginx/html
      environment:
       - VIRTUAL_HOST=www.a-mt.xyz
      ports:
       - "8080:80"

  networks:
    default:
      external:
        name: nginx-proxy
  ```

* Stopper le container Nginx

  ```
  docker-compose -f ~/nginx/docker-compose.yml down
  ```

* Démarrer les containers

  ```
  docker-compose -f ~/proxy/docker-compose.yml up -d
  docker-compose -f ~/nginx/docker-compose.yml up -d
  ```

* Vérifier que çaf fonctionne en allant sur `http://IPADDRESS` et `http://HOSTNAME`