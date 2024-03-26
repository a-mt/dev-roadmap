---
title: Procédure
category: BDD, MySQL, Programme
---

Une procédure est une fonction qui ne retourne aucun résultat. De part sa capacité à utiliser des variables, des boucles et conditions, elle donne plus de possibilités que les vues pour extraire et afficher des données. Elle peut aussi modifier la base de données.

## Déclarer une procédure

    CREATE PROCEDURE nom_procedure ([ [IN | OUT | IN OUT] nom_param type]*)
        [
            COMMENT 'string'
            | LANGUAGE SQL
            | [NOT] DETERMINISTIC
            | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
            | SQL SECURITY { DEFINER | INVOKER }
        ]*
        corps_routine

Une procédure ne retourne pas de résultat mais peut prendre des paramètres en entrée (`IN`), sortie (`OUT`) et/ou entrée-sortie (`IN OUT`) — paramètre en entrée si omis.  
Contrairement à une fonction, une procédure peut contenir des transactions.

### Exemples

``` sql
CREATE PROCEDURE mischievousNephews()
BEGIN
    SELECT WEEKDAY(mischief_date) as weekday, mischief_date, author, title
    FROM mischief
    ORDER BY weekday, (case when author = "Huey" then 0 else author end), mischief_date, title;
END
```

Pour afficher une liste de résultats calculés à la volée, créer une table temporaire:

``` sql
CREATE PROCEDURE alarmClocks()
BEGIN
    SET @time = (SELECT input_date FROM userInput);
    SET @max  = MAKEDATE(YEAR(@time)+1,1);

    CREATE TEMPORARY TABLE IF NOT EXISTS alarms (alarm_date datetime);
    TRUNCATE TABLE alarms;

    WHILE @time < @max DO
        INSERT INTO alarms (alarm_date) VALUES (@time);
        SET @time = DATE_ADD(@time, INTERVAL 7 DAY);
    END WHILE;

    SELECT * FROM alarms;
END
```

---

## Appeler

On appelle une procédure avec `CALL`

    CALL sp_name([param]*)

``` sql
CALL alarmClocks();
```

---

## Afficher son code

    SHOW CREATE PROCEDURE nom_procedure

---

## Supprimer

    DROP PROCEDURE [IF EXISTS] nom_procedure
