---
title: Web
category: Web
---

Internet est un réseau informatique mondial qui **permet d'échanger et de communiquer des informations à distance**.

## Historique

* Années 60: commutation de paquets

L'origine d'Internet commence au début des années 60, même si le concept d'Internet n'existait pas encore à ce moment là. Les théories de l'époque se concentrent sur la commutation de paquets, une manière de transférer les données informatiques, qui était notamment étudié par le département américain de la défense. La théorie fut d'abord développée par Leonard Kleinrock, qui publia le tout premier texte théorique sur la commutation de paquets en 1961.

* Années 70: Arpanet

À la fin des années 60 / début 70 fut conçoit Arpanet, ancêtre d'Internet, qui devait permettre de maintenir les télécommunications au sein de l'armée américaine en cas d'attaque atomique mais qui finalement servi principalement dans la recherche.

* Années 90: World Wide Web

À la fin des années 80, furent mis en place 5 centres informatiques surpuissants auquel il était possible de se connecter depuis n'importe où aux États Unis et qui permirent alors d'ouvrir Arpanet au traffic commercial au début des années 90.

En 1992 fut mis en place l'Internet Society, une association américaine dont la vocation fut de promouvoir et de coordonner le développement des réseaux informatiques à travers le monde. C'est durant cette décennie que la partie la plus connue d'Internet émerge: le World Wide Web (dit www ou web).

Source: [Vrai ou faux #41](https://www.youtube.com/watch?v=Mhrmamdue1M)

## Clients & serveurs

Le web regroupe un ensemble de pages comprenant du texte, des images, des vidéos, etc.
Pour afficher ces ressources, une machine dite **cliente** requête une machine distante qui contient les données, un **serveur**.
<br><br>

![](https://i.imgur.com/yRkeTVb.png)

### HTTP, URL

Chaque ressource distante est identifiée par une **URL** (Uniform Ressource Locator) qui permet d'y accéder.
Pour accéder à cette ressource, on utilise un protocole de communication, **HTTP** (HyperText Transfert Protocol) ou sa variante HTTPS (HTTP avec communication chiffrée) sont les protocoles plus répandus.

La syntaxe d'une URL + schema du protocole est comme suit :

    <http>://<nomserveur>[:<port>]?/<chemin ressource>

Exemples :  
http://www.google.fr  
http://monsite:8080/page.html

### Navigateur, HTML

Pour afficher une page web, un utilisateur utilise un logiciel, un **navigateur** (Firefox, Chrome, Internet Explorer, ...). C'est ce logiciel qui se charge de requêter une URL et d'afficher les données reçues en une page lisible pour un humain.

Le document reçu par le navigateur est écrit dans une syntaxe spécifique qui décrit le contenu de la page: c'est le langage **HTML**.  
Le code HTML peut également être accompagné d'instructions sur l'apparence de la page (couleur du texte, colonnes, etc): du **CSS**.  
Ou encore d'instructions que le navigateur doit executer (par exemple pour afficher un décompte): du **JavaScript**.

HTML, CSS, JavaScript sont les trois langages qui peuvent être lus et interprétés par le navigateur (donc côté client).

![](https://i.imgur.com/BhonoYu.png)

### Côté serveur

Le serveur peut servir une page statique (un document stocké sur le disque dur) ou une page dynamique, c'est à dire une page dont le contenu est recalculé par le serveur à chaque fois qu'on la requête.

C'est le cas par exemple si on veut afficher une liste de produits disponibles en magasin: 
1. on va chercher les données en **base de données**, endroit où sont centralisées les données dont on dispose (liste d'utilisateurs, produits, commandes, etc). Le langage utilisé pour stocker et récupérer des données s'appelle **SQL**.
2. on génère la page pour afficher la liste de produits correspondants avec un **langage de programmation**. Pour effectuer des traitements côté serveur, de nombreux langages de programmations sont possibles: PHP, Python, NodeJs, etc.

### Front-End, Back-End

On désigne sous le terme de **Front-End** tout ce qui est affiché ou executé du côté client: HTML, CSS, JS, design...  
On désigne sous le terme de **Back-End** tout ce que le client ne peut pas voir, qui se passe du côté serveur: base de données, traitements du serveur en langage de programmation.
