---
title: Fonction
category: BDD, MySQL, Programme
---

Il est possible de créer de nouvelles fonctions MySQL, qui fonctionnent de la même manière que les fonctions natives (comme `ABS()` ou `CONCAT()`)

## Déclarer une fonction

### Définition

    CREATE FUNCTION nom_fonction ([nom_param type]*) RETURNS type
        [
            COMMENT 'string'
            | LANGUAGE SQL
            | [NOT] DETERMINISTIC
            | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
            | SQL SECURITY { DEFINER | INVOKER }
        ]*
        corps_routine

### Exemple

``` sql
CREATE FUNCTION hello (s CHAR(20)) RETURNS CHAR(50) DETERMINISTIC
    RETURN CONCAT('Hello, ',s,'!');
```

### Caractéristiques

Les caractérisques sont toutes optionnelles, elles ne sont pas interprétées par MySQL mais utiles au développeur. Par exemple une fonction est `deterministic` si elle retourne toujours le même résultat pour les mêmes paramètres.

### Corps

Toutes les fonctions MySQL peuvent être appelées à l'intérieur de la fonction, ainsi que les éléments du langage (declare, while, statements, curseurs, etc).
Par contre, une fonction ne peut pas contenir de transaction.

Si le corps de la fonction contient plusieurs lignes, il faut délimiter le début et la fin de `BEGIN` et `END`.  
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

[Doc MySQL fonctions et procédures](https://dev.mysql.com/doc/refman/5.7/en/create-procedure.html)

---

## Appeler

Une fonction s'appele simplement par son nom suivit de parenthèses

``` sql
SELECT hello('world');
```

``` sql
SELECT id, buyer, get_total(items) AS total_price
FROM orders
ORDER BY id;
```

---

## Afficher le code

    SHOW CREATE FUNCTION nom_fonction

---

## Supprimer

    DROP FUNCTION [IF EXISTS] nom_fonction

---

## Exemple complet

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

[Codefights Sort book chapters](https://codefights.com/arcade/db/a-table-of-desserts/Yd8P4ebwe2RQJFxeo)