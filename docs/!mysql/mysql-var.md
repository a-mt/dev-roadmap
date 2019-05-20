---
title: Variables utilisateur
category: Web, BDD, MySQL, Données
---

Les variables utilisateurs permettent de stocker des valeurs pour le temps d'une execution.  

## Assigner

Il existe différentes manières d'assigner une variable utilisateur:

* Assigner une valeur statique avec `SET`

  ``` sql
  SET @var_name = valeur;
  ```

* Assigner le résultat d'une sélection avec `SELECT ... INTO` ou `SET = (SELECT ...)`

  ``` sql
  SELECT att INTO @var_name
  ```

  ``` sql
  SET @var_name = (SELECT att)
  ```

* Assigner une valeur à l'intérieur d'une requête avec `:=`

  ``` sql
  WHERE att = (@var_name := valeur)
  ```

---

## Utiliser

On peut accéder aux variables utilisateur à l'intérieur d'une requête:

``` sql
WHERE att = @var_name
```

---

## Exemples

Effectuer des calculs sur une ligne:

``` sql
-- Afficher la taille du mail en Kilo ou Mega
SELECT id, email_title,
    IF((@s := size / 1024) >= 1024,
       CONCAT(FLOOR(@s / 1024), " Mb"),
       CONCAT(FLOOR(@s), " Kb")
    ) as short_size
FROM emails
ORDER BY size DESC;
```

Effectuer des calculs sur plusieurs lignes:

``` sql
-- Ré-indexer les id à partir de 1
SET @i = 0;
SELECT id as oldId, (@i := @i + 1) as newId
FROM itemIds;
```

``` sql
-- Calculer le nombre de combinaisons
SET @c = 1;
SELECT @c := @c * LENGTH(characters) as combinations
FROM discs
ORDER BY combinations DESC
LIMIT 1;
```

Réutiliser une variable entre deux requêtes:

``` sql
-- Evenements des 7 derniers jours
SET @today = (SELECT event_date FROM Events ORDER BY event_date DESC LIMIT 1);

SELECT name, event_date
FROM Events
WHERE event_date != @today AND DATE_ADD(event_date, INTERVAL 7 DAY) >= @today
ORDER BY event_date DESC;
```

``` sql
SELECT SUM(price) INTO @n FROM orders
```