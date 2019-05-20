---
title: Insérer, modifier, supprimer
category: MySQL, Données
---

## Insérer

    INSERT INTO nom_table [(attributs)] VALUES (valeurs)

<!-- -->

    INSERT INTO nom_table [(attributs)] SELECT ...

<ins>Par exemple</ins> :

``` sql
INSERT INTO LANG (CODE, LIBELLE) VALUES
('en_US', 'English'),
('fr_FR', 'Français');
```

### Clé dupliquée

Si on essaie d'insérer une clé primaire qui existe déjà, une erreur est levée.  
On peut modifier ce comportement avec

* `INSERT IGNORE`

  ``` sql
  -- Ingore l'insertion si la clé existe déjà
  INSERT IGNORE INTO etudiant (id, nom, prenom) VALUES (1, "Dupont", "Manon");
  ```

* ou en ajoutant une clause `DUPLICATE KEY UPDATE ...` :

  ``` sql
  -- Met à jour la ligne existante avec le nouveau prenom
  INSERT INTO etudiant (id, nom, prenom) VALUES (1, "Dupont", "Manon")
  ON DUPLICATE KEY UPDATE prenom = VALUES(prenom);
  ```

[SQLFiddle](http://sqlfiddle.com/#!9/55d5c5/1)

---

## Mettre à jour

    UPDATE nom_table SET attribut = valeur
      [WHERE condition]
      [ORDER BY attributs]
      [LIMIT count]

Voir l'article sur les [sélections](mysql-select.md) pour la description de `WHERE`, `ORDER BY` et `LIMIT`

<ins>Exemples</ins> :

``` sql
UPDATE Customers
SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
WHERE CustomerID = 1;
```

``` sql
UPDATE reservedNicknames
SET id = CONCAT('rename - ', id),
    nickname = CONCAT('rename - ', nickname)
WHERE LENGTH(nickname) <> 8;
```

---

## Supprimer

    DELETE FROM nom_table
      [WHERE condition]
      [ORDER BY attributs]
      [LIMIT count]

<ins>Exemples</ins> :

``` sql
DELETE FROM Customers
WHERE CustomerName = 'Alfreds Futterkiste';
```

``` sql
DELETE FROM currencies
WHERE LENGTH(code) != 3;
```