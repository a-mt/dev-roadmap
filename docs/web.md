---
title: Web
category: Web
---

Internet est un réseau informatique mondial qui **permet d'échanger et de communiquer des informations à distance**.

## Naissance du web

* <ins>Années 60: commutation de paquets</ins>  
  L'origine d'Internet commence au début des années 60, même si le concept d'Internet n'existait pas encore à ce moment là. Les théories de l'époque se concentrent sur la commutation de paquets, une manière de transférer les données informatiques, qui était notamment étudié par le département américain de la défense. La théorie fut d'abord développée par Leonard Kleinrock, qui publia le tout premier texte théorique sur la commutation de paquets en 1961.

* <ins>Années 70: Arpanet</ins>  
  À la fin des années 60 / début 70 fut conçut Arpanet, ancêtre d'Internet, qui devait permettre de maintenir les télécommunications au sein de l'armée américaine en cas d'attaque atomique mais qui finalement servi principalement dans la recherche.

* <ins>Années 90: World Wide Web</ins>  
  À la fin des années 80, furent mis en place 5 centres informatiques surpuissants auquel il était possible de se connecter depuis n'importe où aux États Unis et qui permirent alors d'ouvrir Arpanet au traffic commercial au début des années 90.
  En 1992 fut mis en place l'Internet Society, une association américaine dont la vocation fut de promouvoir et de coordonner le développement des réseaux informatiques à travers le monde. C'est durant cette décennie que la partie la plus connue d'Internet émerge: le World Wide Web (dit www ou web).

  Le web consiste dans un premier temps à consulter et modifier des fichiers HTML via un navigateur web, avant que l'invention des URLs (*Uniform Ressource Locator*, qui identifie chaque ressource distante) et des liens hypertextes (qui permet de rediriger vers une autre ressource via un label associé à une URL) permette de créer tout un réseau de pages qu'on peut consulter à distance. Si on se représente toutes les liaisons entre les différentes ressources connectées par des hyperliens, on a une toile d'araignée ou *web* en anglais.

* Aujourd'hui le web comprend une multitude de contenu, notamment des images et videos, qui peuvent incrustés dans des pages HTML.

Pour aller plus loin: [Histoire d'Internet](linux/network-history.md)

## Clients & serveurs

* Le protocole le plus utilisé sur Internet est HTTP (*HyperText Transfert Protocol*) ou sa variante encodée, HTTPS (*HTTP SSL*). Il permet d'échanger du contenu web — des fichiers HTML, des images, des vidéos, etc. 

* Au début de toute consultation web, un client envoit une requête à un serveur. Typiquement, on ouvre un navigateur web et on tape quelque chose dans la barre de recherche ou en se rend à une URL en particulier.

  *Client* et *serveur* indique les rôles des acteurs. Le client désigne l'acteur (la machine, le logiciel, la personne) à l'origine de la communication: il envoi une requête, par exemple demander le contenu d'une page. Et le serveur est la machine ou le logiciel qui répond à cette demande: il envoi une réponse, par exemple envoyer le contenu de la page. On notera qu'un serveur peut lui-même être client d'autres serveurs.

  ![](https://i.imgur.com/yRkeTVb.png)

* Quand le client et le serveur sont la même machine, on dit qu'on travaille *en local*.  
  Inversemment, si le client et le serveur sont deux machines différentes, alors on travaille *à distance* (*remote*).

## URL

* La syntaxe d'une URL (*Uniform Ressource Locator*) + schéma du protocole est comme suit :

  ```
  <http>://<nomserveur>[:<port>]?/<chemin ressource>
  ```

  Par exemple:

  ```
  http://www.google.fr  
  http://monsite:8080/page.html
  ```

## Navigateur & languages du web

* Pour visualiser une page web, il faut utiliser un logiciel: un *navigateur web* (par exemple Firefox, Chrome ou Internet Explorer). C'est ce logiciel qui se charge de requêter l'URL et d'afficher les données reçues en une page lisible pour un humain.

* Le document reçu par le navigateur est écrit dans une syntaxe spécifique qui décrit le contenu de la page: c'est le langage *HTML*.  
  Le code HTML peut également être accompagné d'instructions sur l'apparence de la page (couleur du texte, colonnes, etc): du *CSS*.
  Ou encore d'instructions que le navigateur doit executer (par exemple pour afficher un décompte): du *JavaScript*.

  HTML, CSS, JavaScript sont les trois langages qui peuvent être lus et interprétés par le navigateur (donc exécutés côté client).

  ![](https://i.imgur.com/BhonoYu.png)

## Côté serveur

* Le serveur peut renvoyer une page statique (un document stocké sur le disque dur) ou générer le contenu dynamiquement (une page dont le contenu est recalculé par le serveur à chaque fois qu'on la requête). Par exemple si on veut afficher une liste de produits disponibles en magasin:

  1. Le serveur reçoit la requête et exécute le script associé à cette requête.  
     De nombreux langages de programmations sont possibles: PHP, Python, NodeJs, etc.

  2. Une partie du script va généralement chercher des données en *base de données*, endroit où sont centralisées les données dont on dispose (liste d'utilisateurs, produits, commandes, etc) — les requêtes effectuée avec le language SQL (*Structured Query Language*).

  3. Et on génère la page pour afficher la liste de produits correspondants avec un langage de programmation — a priori, en utilisant un moteur de template (tel que jinja, twig, smarty, etc)

## Front-end et back-end

* Servir du contenu statique et calculer dynamiquement du contenu sont deux tâches très différentes, raison pour laquelle le serveur fait généralement tourner deux logiciels distincts:

  - Le *front-end* (un logiciel tel que nginx par exemple), qui reçoit l'intégralité des requêtes et s'occupe de les filtrer.

  - C'est généralement le front-end qui s'occupe de renvoyer les fichiers statiques (CSS, JS, images, videos), avec généralement une mise en cache pour plus de rapidité. Et pour les contenu générés dynamiquement, le front-end va être configuré pour *proxy* (transférer une requête) vers le back-end.

  - Le *back-end* (un logiciel tel que gunicorn) reçoit les requêtes qui ont déjà été préfiltrées, et s'occupe de les traiter pour générer du contenu dynamiquement. Pour ce faire, le back-end est généralement connecté à une base de données.

  - Il arrive qu'un même logiciel s'occupe de l'intégralité de la stack, en utilisant des modules pour le back-end (c'est notamment le cas du logiciel Apache).

* Par extension, on désigne sous le terme de *front-end* tout ce qui est affiché ou executé du côté client: HTML, CSS, JS, images, videos — qui sont a priori des fichiers stockés en dur côté serveur.  
  Et par *back-end* tout ce qui est "caché" côté serveur: base de données, instructions exécutées pour générer dynamiquement des fichiers — qui peuvent être des pages, mais aussi des images, videos, pdf, zip, etc...
