---
title: Storage
category: Web, JavaScript, API
---

Le navigateur permet de stocker des données côté client via l'interface `Storage`. Un peu à la manière des cookies, on peut stocker des données sous forme de paire clé/valeur (chaîne de caractère) dans le navigateur. La différence entre les deux: les données utilisateur stocké dans le `Storage` restent côté client, contrairement aux cookies, qui sont envoyés au serveur à chaque requête.

## SessionStorage vs LocalStorage

Deux API implémentent les méthodes définies par Storage:
* `sessionStorage`, stockage pour la durée d'une session et limitée à la fenêtre en cours
* `localStorage`, stockage sans limite de durée de vie et qui s'applique au nom de domaine en cours

Les données stockées sont accessibles via les DevTools des navigateurs (onglet "Stockage" pour Firefox). Elles peuvent être lues, modifiées ou supprimées par l'utilisateur et donc aucune donnée sensible ne doit y être stockée.

## Méthodes

Par accéder au données du `sessionStorage` et `localStorage`, différentes méthodes sont disponibles:

| Méthode               | Description
|---                    |---
| `setItem(clé,valeur)` | Stocke une paire clé/valeur
| `getItem(clé)`        | Retourne la valeur associée à une clé
| `removeItem(clé)`     | Supprime la paire clé/valeur en indiquant le nom de la clé
| `key(index) `         | Retourne la clé stockée à l'index spécifié
| `clear()`             | Efface toutes les paires

Les données enregistrées sont des chaînes de caractères, utiliser `JSON.stringify` et `JSON.parse` pour stocker tout autre type.

Pour vérifier si une clé est définie utiliser `getItem(clé) !== null`.

[Exemple localStorage](https://codepen.io/a-mt/pen/bMYMXg)
