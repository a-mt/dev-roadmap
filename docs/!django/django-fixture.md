---
title: Fixture
category: Python, Django, ORM
---

* Une fixture permet de sauvegarder l'état de la BDD à un moment donné.
  Ça permet notamment de créer un jeu de données pour les prochains développeurs qui installent le projet.

* Pour créer une fixture:

  ``` bash
  mkdir core/fixtures
  python manage.py dumpdata --format=json core > core/fixtures/initial_data.json
  ```

* Pour lancer une fixture:

  ``` bash
  python manage.py loaddata initial_data --app core
  ```
