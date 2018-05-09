---
title: Librairie, Plugin, Framework & API
category: Web, JavaScript
---

## Désambiguïsation

* Une **librairie** est un ensemble de fonctions que l'on peut appeler. Une librairie est généralement organisée en un module / classe. Ex: JQuery, underscore.js, React

* Un **plugin** est un utilitaire que l'on peut ajouter à une librairie pour ajouter des nouvelles fonctions et qui se base sur cette librairie pour fonctionner. Ex: JQuery UI, React Router

* Un **framework** est un "squelette" d'application, avec une architecture pré-établie, qui contient un ensemble de librairies déjà inclues, et par dessus lequel on ajoute nos propres sous-classes et plugins.
Ex: Ember.js, Angular.js, Backbone

  La principale différente entre une librairie et un framework est l'inversion du contrôle. Dans le cas d'une librairie, on en appele les méthodes, on a le contrôle. Avec un framework, le contrôle est inversé: c'est le framework qui appelle nos méthodes.  
  La plupart du temps, une librairie prend peu de temps à apprendre par rapport à un framework.

* Une **API** (Application Programming Interface) est une interface (un ensemble de propriétés et méthodes) qui permet d'interagir avec une application. Dit simplement, une API est la partie exposée (publique) d'une application, que l'on peut appeler. On accède à une librarie ou à un service web via son API.

Lorsqu'aucune librairie ni framework n'est utilisé, que l'on n'utilise que les méthodes JavaScript natives (méthodes supportées par le navigateur sans avoir à inclure des ressources externes), alors on parle de *Vanilla JavaScript*.

---

## Web API

Le navigateur fournit des [API](https://developer.mozilla.org/fr/docs/Web/API) pour interagir avec
* le navigateur (ex: geolocalisation, web-storage)
* la page (ex: historique, cookies)
* son contenu (ex: video, canvas)
