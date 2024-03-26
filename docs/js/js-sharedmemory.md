---
title: Mémoire partagée
category: Web, JavaScript
---

## SharedArrayBuffer

Permet à plusieurs threads de lire et écrire les mêmes données [ES9].  
En utilisant un `SharedArrayBuffer`, les données sont instantanemment accessibles par tous les threads et tous les web-workers.

---

## Atomics

`Atomics` est un module qui permet de s'assurer que toutes les opérations soient terminées sur des emplacements de mémoire partagée avant de pouvoir être utilisé ailleurs [ES9].

Quelques exemples de méthodes:

* `add` / `sub`: ajoute/enlève une valeur a une position donnée
* `load`: récupère la valeur a une position donnée