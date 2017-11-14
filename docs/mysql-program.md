---
title: Programme MySQL
category: Web, BDD, MySQL
---

## Fonctions

Il est possible de créer de nouvelles fonctions MySQL, qui fonctionnent de la même manière que les fonctions natives - comme ABS() ou CONCAT()  
Toutes les fonctions MySQL peuvent être appelées à l'intérieur de la fonction, ainsi que les éléments du langage (declare, while, statements, curseurs, etc).

### Créer

    CREATE FUNCTION nom_fonction ([nom_param type]*) RETURNS type
        [
            COMMENT 'string'
            | LANGUAGE SQL
            | [NOT] DETERMINISTIC
            | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
            | SQL SECURITY { DEFINER | INVOKER }
        ]*
        corps_routine

[Doc MySQL fonctions et procédures](https://dev.mysql.com/doc/refman/5.7/en/create-procedure.html)

Les caractérisques sont toutes optionnelles, elles ne sont pas interprétées par MySQL - mais utiles au développeur. Par exemple une fonction est `deterministic` si elle retourne toujours le même résultat pour les mêmes paramètres.  
Une fonction ne peut pas contenir de transaction.

<ins>Exemple</ins> :

``` sql
CREATE FUNCTION hello (s CHAR(20)) RETURNS CHAR(50) DETERMINISTIC
    RETURN CONCAT('Hello, ',s,'!');
```

<ins>Si le corps de la fonction contient plusieurs lignes</ins>, il faut délimiter le début et la fin de `BEGIN` et `END`.  
Le délimiteur de requête doit être changé pendant la définition de la fonction, avec `DELIMITER symb`, pour que le corps de la fonction soit transmis au serveur et enregisré, plutôt que d'être interprété comme une instruction par mysql.

``` sql
DELIMITER // -- // est le délimiteur de fin d'instruction
CREATE FUNCTION get_total(items VARCHAR(45)) RETURNS INT
BEGIN
    SET @n   = 0;
    SET @ids = REPLACE(items, ';', ',');

    SELECT SUM(price) INTO @n
    FROM item_prices
    WHERE FIND_IN_SET(id, @ids);

    RETURN @n;
END // -- fin de définition de la fonction
DELIMITER ; -- remettre le délimiteur normal
```

### Appeler

Une fonction s'appele simplement par son nom

``` sql
SELECT hello('world');
```

``` sql
SELECT id, buyer, get_total(items) AS total_price
FROM orders
ORDER BY id;
```

### Afficher son code

    SHOW CREATE FUNCTION nom_fonction

### Supprimer

    DROP FUNCTION [IF EXISTS] nom_fonction

### Exemple complet

[Sort book chapters](https://codefights.com/arcade/db/a-table-of-desserts/Yd8P4ebwe2RQJFxeo)

``` sql
/**
 * Returns the value of a single Roman symbol (V -> 5)
 * @param CHAR(1)
 * @return INT
 */
DROP FUNCTION IF EXISTS romanValue;
CREATE FUNCTION romanValue(str CHAR(1)) RETURNS INT DETERMINISTIC
BEGIN
    SET @v = 0;
    SELECT CASE @letter
        WHEN "I" THEN 1
        WHEN "V" THEN 5
        WHEN "X" THEN 10
        WHEN "L" THEN 50
        WHEN "C" THEN 100
        WHEN "D" THEN 500
        WHEN "M" THEN 1000
        ELSE 0
    END
    INTO @v;
    RETURN @v;
END;

/**
 * Returns the value of a Roman number (IV -> 4)
 * @param VARCHAR(32)
 * @return INT
 */
DROP FUNCTION IF EXISTS roman2decimal;
CREATE FUNCTION roman2decimal(str VARCHAR(32)) RETURNS INT DETERMINISTIC
BEGIN
    SET @n = CHAR_LENGTH(str);
    SET @i = 1;

    SET @total     = 0;
    SET @lastvalue = 0;

    WHILE @i <= @n DO
        SET @letter = SUBSTRING(str, @i, 1);
        SET @value  = romanValue(@letter);

        -- Last value was a minus ?
        IF @lastvalue = 0 THEN
            SET @lastvalue = @value;
        ELSEIF @value > @lastvalue THEN
            SET @total     = @total + (@value - @lastvalue);
            SET @lastvalue = 0;
        ELSE
            SET @total     = @total + @lastvalue;
            SET @lastvalue = @value;
        END IF;

        SET @i = @i + 1;
    END WHILE;

    RETURN @total + @lastvalue;
END;

/**
 * List all chapters, ordered by chapter
 */
CREATE PROCEDURE sortBookChapters()
BEGIN
    SELECT chapter_name
    FROM book_chapters
    ORDER BY roman2decimal(chapter_number);
END
```

---

## Procédure

Une procédure est une fonction qui ne retourne aucun résultat. De part sa capacité à utiliser des variables, des boucles et conditions, elle donne plus de possibilités que les vues pour extraire et afficher des données. Elle peut aussi modifier la base de données.

### Créer

    CREATE PROCEDURE nom_procedure ([ [IN | OUT | IN OUT] nom_param type]*)
        [
            COMMENT 'string'
            | LANGUAGE SQL
            | [NOT] DETERMINISTIC
            | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
            | SQL SECURITY { DEFINER | INVOKER }
        ]*
        corps_routine

Une procédure ne retourne pas de résultat mais peut prendre des paramètres en entrée (`IN`) - par défaut si omis, sortie (`OUT`) et/ou entrée-sortie (`IN OUT`)  
Une procédure peut contenir des transactions.

<ins>Exemple</ins> :

``` sql
CREATE PROCEDURE mischievousNephews()
BEGIN
    SELECT WEEKDAY(mischief_date) as weekday, mischief_date, author, title
    FROM mischief
    ORDER BY weekday, (case when author = "Huey" then 0 else author end), mischief_date, title;
END
```

Pour afficher une liste de résultats calculés à la volée, créer une table temporaire :

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

### Appeler

    CALL sp_name([param]*)

``` sql
CALL alarmClocks();
```

### Afficher son code

    SHOW CREATE PROCEDURE nom_procedure

### Supprimer

    DROP PROCEDURE [IF EXISTS] nom_procedure

---

## DECLARE

Les variables de procédure sont fortemment typées.  
Elles n'existent que le temps de la procédure, contrairement aux variables utilisateur (qui elles, existent jusqu'à la fin de la session).  
Elles ne sont pas préfixées.

    DECLARE {var_name}* type [DEFAULT value]

``` sql
CREATE PROCEDURE prc_test()
BEGIN
    DECLARE var2 INT DEFAULT 1;
    SET var2  = var2 + 1;
    SET @var2 = @var2 + 1;
    SELECT var2, @var2;
END;

SET @var2 = 1;
CALL prc_test(); # 2 2
CALL prc_test(); # 2 3
```

Les déclarations de variables se situent forcemment tout en haut du corps de la fonction/procédure (après le `BEGIN`). Sinon, une erreur `You have an error in your SQL syntax` est levée.

``` sql
CREATE PROCEDURE test()
BEGIN
    DECLARE a INT DEFAULT 10;
    DECLARE b, c INT;
    SET a = a + 100;
    SET b = 2;
    SET c = a + b;
    SELECT c;
END;
```

---

## IF ... THEN

    IF condition THEN statement(s)
    [ELSEIF condition THEN statement(s)]*
    [ELSE statement(s)]
    END IF

``` sql
CREATE FUNCTION SimpleCompare(a INT, b INT) RETURNS VARCHAR(20)
BEGIN
    DECLARE op VARCHAR(20);

    IF a > b THEN     SET op = '>';
    ELSEIF a = b THEN SET op = '=';
    ELSE              SET op = '<';
    END IF;

    RETURN CONCAT(a, ' ', op, ' ', b);
END;
```

---

## CASE

    CASE nom_variable
    {WHEN valeur THEN statement(s)}*
    [ELSE statement(s)]
    END CASE

or

    CASE
    {WHEN search_condition THEN statement(s)}*
    [ELSE statement(s)]
    END CASE

``` sql
CASE @letter
    WHEN "I" THEN SET @v = 1;
    WHEN "V" THEN SET @v = 5;
    WHEN "X" THEN SET @v = 10;
    WHEN "L" THEN SET @v = 50;
    WHEN "C" THEN SET @v = 100;
    WHEN "D" THEN SET @v = 500;
    WHEN "M" THEN SET @v = 1000;
    ELSE SET @v = 0;
END
```

``` sql
SELECT CASE @letter
    WHEN "I" THEN 1
    WHEN "V" THEN 5
    WHEN "X" THEN 10
    WHEN "L" THEN 50
    WHEN "C" THEN 100
    WHEN "D" THEN 500
    WHEN "M" THEN 1000
    ELSE 0
END
INTO @v;
```

---

## WHILE

    [begin_label:] WHILE search_condition DO
        statement(s)
    END WHILE [end_label]

[Type inheritance](https://codefights.com/arcade/db/a-table-of-desserts/MYQfuC7ngddKw6LRi)

``` sql
/**
 * Checks if the given type has a "Number" ancestor
 * @param text t
 * @return tinyint
 */
CREATE FUNCTION isNumber(t text) RETURNS TINYINT(1)
BEGIN
    WHILE(@p:=(select base from inheritance where derived=t)) != 'Number' DO
        SET t = @p;
    END WHILE;
    RETURN @p IS NOT NULL;
END;

CREATE PROCEDURE typeInheritance()
BEGIN
    SELECT var_name, type var_type
    FROM variables
    WHERE isNumber(type);
END
```

On peut sortir d'un `WHILE` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

---

## LOOP

    [begin_label:] LOOP
        statement(s)
    END LOOP [end_label]

``` sql
DECLARE i INT DEFAULT 1;
get_query: LOOP

    SET i = i + 1;
    IF i > 100 THEN
        LEAVE get_query;
    END IF;

    INSERT INTO results VALUES (i);
END LOOP;
```

On peut sortir d'une `LOOP` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

---

## REPEAT

    [begin_label:] REPEAT
        statement(s)
    UNTIL search_condition
    END REPEAT [end_label]

``` sql
CREATE PROCEDURE dorepeat(p1 INT)
BEGIN
  SET @x = 0;
  REPEAT SET @x = @x + 1; UNTIL @x > p1 END REPEAT;
END;
```

On peut sortir d'un `REPEAT` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

---

## ITERATE

`ITERATE` est utilisée dans une boucle afin de terminer l'itération en cours et commencer la prochaine itération.  
Même principe que la commande `continue` en JavaScript.

    ITERATE label

## LEAVE

`LEAVE` permet de sortir d'une boucle.  
Même principe que la commande `break` en JavaScript.

    LEAVE label

---

## Statements

SQL peut executer des *statements*. Une statement est une requête SQL que l'on prépare avant d'executer, ce qui permet, d'une part, d'économiser le parsing des requêtes lorsque plusieurs requêtes similaires se suivent (et donc d'accélérer l'execution), d'autres part d'executer du texte comme une requête.  
Les commandes à utiliser pour le faire sont les suivantes :

<table>
  <tr>
    <th align="left">Préparer une requête</th>
    <td><pre>PREPARE nom_stmt FROM "select_statement";</pre></td>
  </tr>
  <tr>
    <th align="left">Executer la requête préparée</th>
    <td><pre>EXECUTE nom_stmt [USING {var}*]</pre></td>
  </tr>
  <tr>
    <th align="left">Désaffecter la requête préparée</th>
    <td><pre>DEALLOCATE PREPARE nom_stmt</pre></td>
  </tr>
</table>

<ins>Exemples</ins> :

``` sql
PREPARE stmt1 FROM 'SELECT SQRT(POW(?,2) + POW(?,2)) AS hypotenuse';
SET @a = 3;
SET @b = 4;
EXECUTE stmt1 USING @a, @b;
```

``` sql
PREPARE stmt1 FROM @v_code;
EXECUTE stmt1;
DEALLOCATE prepare stmt1;
```

[Doc MySQL Statements](https://dev.mysql.com/doc/refman/5.7/en/sql-syntax-prepared-statements.html)

---

## Curseurs

Les curseurs permettent de récupérer le résultat d'une requête ligne par ligne.  
Les commandes à utiliser pour le faire sont les suivantes :

<table>
  <tr>
    <th align="left">Déclarer un curseur</th>
    <td><pre>DECLARE nom_curseur 
    CURSOR FOR select_statement</pre></td>
  </tr>
  <tr>
    <th align="left">Action à effectuer lorsque<br> la requête ne retourne plus rien</th>
    <td><pre>DECLARE CONTINUE HANDLER
    FOR NOT FOUND exec_statement</pre></td>
  </tr>
  <tr>
    <th align="left">Ouvrir un curseur</th>
    <td><pre>OPEN nom_curseur</pre></td>
  </tr>
  <tr>
    <th align="left">Executer la requête d'un curseur</th>
    <td><pre>FETCH [[NEXT] FROM] nom_curseur 
    INTO [nom_var]*</pre></td>
  </tr>
  <tr>
    <th align="left">Fermer un curseur</th>
    <td><pre>CLOSE nom_curseur</pre></td>
  </tr>
</table>

<ins>Exemple</ins> :

[Queries execution](https://codefights.com/arcade/db/exotic-dishes/Mxv2EhqjsGs3oPkNG)

``` sql
CREATE PROCEDURE queriesExecution()
BEGIN
    -- Declare variables
    DECLARE finished TINYINT DEFAULT 0;
    DECLARE v_name, v_code VARCHAR(255);

    -- Cursor query + stop condition
    DECLARE query_cursor CURSOR FOR
        SELECT query_name, code FROM queries;

    DECLARE CONTINUE HANDLER
        FOR NOT FOUND SET finished = 1;

    -- Temporary table to store result
    CREATE TEMPORARY TABLE IF NOT EXISTS results (
        query_name VARCHAR(255),
        val VARCHAR(255)
    );

    OPEN query_cursor;
    get_query: LOOP

        -- Get next row of query
        FETCH query_cursor INTO v_name, v_code;
        IF finished THEN
            LEAVE get_query;
        END IF;

        SET @name   = v_name;
        SET @v_code = CONCAT("SET @value = (", v_code, ")");

        -- Execute it
        PREPARE stmt1 FROM @v_code;
        EXECUTE stmt1;
        DEALLOCATE prepare stmt1;

        -- Store the result into temp table
        INSERT INTO results VALUES (@name, @value);

    END LOOP;
    CLOSE query_cursor;

    -- Display list of results
    SELECT * FROM results;
    TRUNCATE TABLE results;
END
```

---

## Event scheduler

L'event scheduler déclenche des évènements en fonction de la date et de l'heure auxquelles ils sont programmés, un peu sur le même principe qu'une crontab.

### Créer

    CREATE EVENT [IF NOT EXISTS] nom_evenement
        ON SCHEDULE {
              AT timestamp [+ INTERVAL interval]
            | EVERY interval
                [STARTS timestamp [+ INTERVAL interval]]
                [END timestamp [+ INTERVAL interval]]
        }
        [ON COMPLETION [NOT] PRESERVE]
        [ENABLE | DISABLE]
        [COMMENT 'commentaire']
        DO requete_sql;

`STARTS` et `ENDS` doivent être une date dans le futur

<ins>Format interval</ins> :

    quantite {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}

<ins>Exemples</ins> :

``` sql
-- Toutes les minutes, incrémenter col1
CREATE EVENT testevent
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
DO
    UPDATE tempdatabase.table3 SET col1 = col1 + 1;
```

``` sql
-- Tous les jours à 04h00 depuis le 12/06/2006
CREATE EVENT updateStatsEvent
    ON SCHEDULE EVERY 1 DAY STARTS '2006-06-12 04:00:00'
    DO CALL updateStats();
```

### Supprimer

    DROP EVENT [IF EXISTS] event_name

[Doc MySQL Event Scheduler](https://dev.mysql.com/doc/refman/5.7/en/create-event.html)
