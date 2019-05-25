---
title: Lancer Nginx (dans un container)
category: Hosting
---

* Créer un répertoire pour mettre tous les fichiers que vous allez utiliser avec Nginx

  ```
  mkdir ~/nginx
  cd ~/nginx
  ```

* Créer un répertoire pour mettre tous les fichiers statiques que Nginx va servir

  ```
  mkdir html
  ```

* Créer `html/index.html`

  ```
  <h1>Hello World</h1>
  ```

* Créer `html/50x.html`

  ```
  <!DOCTYPE html>
  <html>
  <head>
  <title>Error</title>
  <style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
  </style>
  </head>
  <body>
    <h1>An error occurred.</h1>
    <p>Sorry, the page you are looking for is currently unavailable.<br/>
       Please try again later.</p>
  </body>
  </html>
  ```

* Créer `docker-compose.yml`

  ```
  version: "3"
  services:
    web:
      image: nginx
      volumes:
       - ./html:/usr/share/nginx/html
      ports:
       - "8080:80"
  ```

* Démarrer le container

  ```
  docker-compose up -d
  ```

* Accéder au site web via votre navigateur: `http://IPADDRESS:8080`

* Arrêter le container