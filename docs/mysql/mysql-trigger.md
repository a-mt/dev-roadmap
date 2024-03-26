---
title: Triggers
category: BDD, MySQL
---

Un *trigger* permet
* d'ajouter des contraintes (ex: le salaire horaire d'un employé ne peut pas diminuer)
* ou d'effectuer des calculs (ex: normalisation)

Ils sont déclenchés par le SGBD lorsque certains évènements se produisent sur une table (insertion, mise à jour ou suppression) et sont exécutés sur chaque ligne concernée par la requête, soit avant soit après son execution.

On ne peut pas mettre de trigger sur des vues, y compris `information_schema`et `performance_schema`.  
Un trigger ne peut pas utiliser de procédures qui mettent à jour les valeurs ni utiliser de transactions.

---

## Lister

    SHOW TRIGGERS
        [FROM nom_database]
        [LIKE '%pattern' | WHERE expr]

---

## Créer

    CREATE
        [DEFINER = { user | CURRENT_USER }]

        TRIGGER nom_trigger
        { BEFORE | AFTER } { INSERT | UPDATE | DELETE }
        ON nom_table FOR EACH ROW

        [{ FOLLOWS | PRECEDES } nom_autre_trigger]
        corps_trigger

### Corps du trigger

À l'intérieur du corps du trigger, on peut accéder aux valeurs de la ligne via `OLD` et `NEW`.  
`OLD` contient les anciennes valeurs de la ligne (update, delete), `NEW` les nouvelles valeurs (insert, update).

``` sql
-- Créer un trigger qui calcule le total `amount` des lignes insérées
CREATE TRIGGER ins_sum BEFORE INSERT ON account
FOR EACH ROW
SET @sum = @sum + NEW.amount;

--- Insérer des lignes
SET @sum = 0;
INSERT INTO account VALUES(137,14.98),(141,1937.50),(97,-100.00);

--- Total calculé
SELECT @sum AS 'Total amount inserted';
+-----------------------+
| Total amount inserted |
+-----------------------+
|               1852.48 |
+-----------------------+
```

Si le corps du trigger contient plusieurs intructions, le début et la fin doivent être délimité par `BEGIN` et `END`

``` sql
delimiter //
CREATE TRIGGER upd_check BEFORE UPDATE ON account
FOR EACH ROW
BEGIN
    IF NEW.amount < 0 THEN
        SET NEW.amount = 0;
    ELSEIF NEW.amount > 100 THEN
        SET NEW.amount = 100;
    END IF;
END //
delimiter ;
```

### Lever une erreur

Une erreur peut être levée avec `SIGNAL`

    SIGNAL SQLSTATE '45000' set message_text='mon message';

### Exemple complet

``` sql
CREATE TABLE IF NOT EXISTS employe (
  id INT(11) UNSIGNED PRIMARY KEY,
  nom VARCHAR(255),
  prenom VARCHAR(255),
  salaire_horaire FLOAT
);

INSERT IGNORE INTO employe VALUES
(1, 'Dupont', 'Jean', 35),
(2, 'Durand', 'Marie', 40),
(3, 'Dufour', 'Henri', 45);

DROP TRIGGER IF EXISTS t_verif_salaire;

DELIMITER //
CREATE TRIGGER t_verif_salaire BEFORE UPDATE ON employe
FOR EACH ROW
BEGIN
    IF NEW.salaire_horaire < OLD.salaire_horaire THEN
        SET @msg = CONCAT('Le salaire de l\'employé #', OLD.id, ' (', OLD.nom, ' ', OLD.prenom, ') ne peut pas diminuer');
        SIGNAL SQLSTATE '45000' set message_text=@msg;
    END IF;
END //
DELIMITER ;

UPDATE employe SET salaire_horaire = 30 WHERE salaire_horaire = 35;
-- #1644 - Le salaire de l'employé #1 (Dupont Jean) ne peut pas diminuer
```

---

### Suppression

    DROP TRIGGER [IF EXISTS] nom_trigger

``` sql
DROP TRIGGER test.ins_sum;
```

[Doc MySQL triggers](https://dev.mysql.com/doc/refman/5.7/en/trigger-syntax.html)