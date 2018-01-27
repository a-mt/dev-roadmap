---
title: Web
category: Web
---

## Clients & serveurs

Le World-Wide Web est un gigantesque "système d'information" réparti sur un ensemble de **sites web connectés par le réseau Internet**.
Ces sites affichent des pages web, composées de texte, images, sons, vidéos et liens vers d'autres documents.  
Pour afficher des ressources distantes (pages, images, etc), une machine **cliente** requête une machine distante, un **serveur**.
<br><br>

![](https://i.imgur.com/yRkeTVb.png)

### HTTP, URL

Un protocole de communication est utilisé pour transférer les documents d'une machine à l'autre. **HTTP** (HyperText Transfert Protocol) ou sa variante HTTPS (HTTP avec communication chiffrée) sont les protocoles plus répandus.  

Chaque ressource est identifiée par une **URL** (Uniform Ressource Locator). Syntaxe d'une URL :

    http://<nomserveur>[:<port>]?/<chemin ressource>

Exemples :  
http://www.google.fr  
http://monsite:8080/page.html

### Navigateur, HTML

Pour afficher une page web, un utilisateur utilise un logiciel, un **navigateur** (Firefox, Chrome, Internet Explorer, ...). C'est ce logiciel qui se charge d'afficher le document texte reçu en une page lisible pour un humain.

Ce document est écrit dans une syntaxe comprise par le navigateur, décrivant le contenu de la page: c'est le langage **HTML**.  
Il peut également être accompagné d'instructions sur l'apparence de la page (couleur du texte, colonnes, etc): du **CSS**.  
Ou encore d'instructions que le navigateur doit executer (par exemple pour afficher un décompte): du **JavaScript**.

![](https://i.imgur.com/BhonoYu.png)

### Côté serveur

Le serveur peut servir une page statique (un document stocké sur le disque dur) ou une page dynamique, c'est à dire une page dont le contenu est recalculé par le serveur à chaque fois qu'on la requête.

C'est le cas par exemple si l'on veut récupérer la liste de produits disponibles du magasin: 
1. on va chercher les données en **base de données**, endroit où sont centralisées les données dont on dispose (liste d'utilisateurs, produits, commandes, etc).
2. on génère la page pour afficher la liste de produits correspondants avec un **langage de programmation**

Le langage utilisé pour stocker et récupérer des données est SQL.  
Pour effectuer des traitements côté serveur, de nombreux langages de programmations sont possibles: PHP, Python, NodeJs, etc.
