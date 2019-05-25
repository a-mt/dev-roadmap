---
title: Configurer les containers pour utiliser un certificat SSL
category: Hosting
---

## Nginx-proxy

* J'ai dû mettre à jour [`~/proxy/nginx.tmpl`](https://gist.github.com/a-mt/e9cf1f415393a2c737e43de106e426c0) pour récupérer [ce commit](https://github.com/jwilder/nginx-proxy/commit/07655df85884b4ee7937a422ccd33b413b584a02) — ce ne sera pas nécessaire lorsqu'une nouvelle image sera disponible.

* Mettre à jour `~/proxy/docker-compose.yml` pour ajouter un volume qui lie les certificats de la machine hôte au container. J'ajoute également mon `nginx.tmpl`

  ```
  volumes:
  - /var/run/docker.sock:/tmp/docker.sock:ro
  - ./nginx.tmpl:/app/nginx.tmpl
  - /etc/letsencrypt:/etc/letsencrypt:ro
  ```

---

## Nginx

* Mettre à jour les variables d'environnement dans `~/nginx/docker-compose.yml` pour que Nginx-proxy gère le certificat wildcard correctement:

  ```
  environment:
  - VIRTUAL_HOST=www.a-mt.xyz
  - CERT_PATHNAME=/etc/letsencrypt/live/a-mt.xyz/fullchain.pem
  - PRIVATE_KEY_PATHNAME=/etc/letsencrypt/live/a-mt.xyz/privkey.pem
  - HTTPS_METHOD=noredirect
  ```

  Je veux également pouvoir accéder au site web via `http://IPADDRESS:8081`, je vais donc mettre à jour les configs Nginx pour pouvoir utiliser le certificat SSL sans passer par Nginx-proxy. Ces étapes ne sont pas indispensables.

* Créer [`~/nginx/default.conf`](https://gist.github.com/a-mt/8b86f246be623be359ca8c05fe462054)
* Mettre à jour `~/nginx/docker-compose.yml`

  ```
  volumes:
  - ./html:/usr/share/nginx/html
  - /etc/letsencrypt:/etc/letsencrypt:ro
  - ./default.conf:/etc/nginx/conf.d/default.conf
  ports:
  - "8080:80"
  - "8081:443"
  ```

---

## Wordpress (Apache)

* Mettre à jour les variables d'environnement dans `~/diary/docker-compose.yml`

  ```
  environment:
  - VIRTUAL_HOST: diary.a-mt.xyz
  - CERT_PATHNAME: /etc/letsencrypt/live/a-mt.xyz/fullchain.pem
  - PRIVATE_KEY_PATHNAME: /etc/letsencrypt/live/a-mt.xyz/privkey.pem
  - HTTPS_METHOD: noredirect
  - ...
  ```

  Même principe qu'avec Nginx, je veux pouvoir accéder au site via `http://IPADDRESS:8083`

* Créer [`~/diary/default-ssl.conf`](https://gist.github.com/a-mt/840f4e4da6aab64a09413d2fd2679aef)
* Mettre à jour `~/diary/docker-compose.yml`

  ```
  volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
  - ./default-ssl.conf:/etc/apache2/sites-available/default-ssl.conf
  ports:
  - "8082:80"
  - "8083:443"
  ```