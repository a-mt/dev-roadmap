---
title: Syntaxe de programmation
category: BDD, MySQL, Programme
---

## Declare

Permet de déclarer une variable dans le corps d'une procédure

    DECLARE {var_name}* type [DEFAULT value]

* Ces variables n'existent que le temps de l'exécution de la procédure  
  — contrairement aux variables utilisateur qui, elles, existent jusqu'à la fin de la session.  
* Elles sont fortemment typées
* On ne les préfixe pas d'un arobase

<ins>Exemple</ins>:

``` sql
CREATE PROCEDURE prc_test()
BEGIN
    DECLARE myvar INT DEFAULT 1;
    SET myvar  = myvar + 1;  -- Variable locale (déclarée avec DECLARE)
    SET @myvar = @myvar + 1; -- Variable utilisateur (déclarée avec SET)
    SELECT myvar, @myvar;
END;

SET @myvar = 1;
CALL prc_test(); -- Affiche 2 2
CALL prc_test(); -- Affiche 2 3
```

<ins>Position</ins>:

Les déclarations de variables doivent se situer tout en haut du corps de la fonction/procédure (après le `BEGIN`).  
Si ce n'est pas le cas, une erreur de parsing est levée — `You have an error in your SQL syntax`

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

## If ... then

Permet d'exécuter du code sous condition

    IF condition THEN statement(s)
    [ELSEIF condition THEN statement(s)]*
    [ELSE statement(s)]
    END IF

<ins>Exemple</ins>:

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

## Case

L'équivalent d'un `switch`

    CASE nom_variable
    {WHEN valeur THEN statement(s)}*
    [ELSE statement(s)]
    END CASE

ou

    CASE
    {WHEN search_condition THEN statement(s)}*
    [ELSE statement(s)]
    END CASE

<ins>Exemples</ins>:

* Définir une variable utilisateur avec un `CASE`:

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

* Sélectionner une valeur avec un `CASE`:

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

## While

Permet de boucler tant qu'une condition est vérifiée

    [begin_label:] WHILE search_condition DO
        statement(s)
    END WHILE [end_label]

On peut sortir d'un `WHILE` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

<ins>Exemple</ins>:

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

[Codefights Type inheritance](https://codefights.com/arcade/db/a-table-of-desserts/MYQfuC7ngddKw6LRi)

---

## Loop

Permet de boucler indéfiniment, jusqu'à ce qu'on échappe de la boucle

    [begin_label:] LOOP
        statement(s)
    END LOOP [end_label]


On peut sortir d'une `LOOP` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

<ins>Exemple</ins>:

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

---

## Repeat

Permet de boucler tant qu'une condition n'est pas vérifiée.

    [begin_label:] REPEAT
        statement(s)
    UNTIL search_condition
    END REPEAT [end_label]

On peut sortir d'un `REPEAT` avec `LEAVE` et continuer à la prochaine itération avec `ITERATE`.

<ins>Exemple</ins>:

``` sql
CREATE PROCEDURE dorepeat(p1 INT)
BEGIN
  SET @x = 0;
  REPEAT SET @x = @x + 1; UNTIL @x > p1 END REPEAT;
END;
```

---

## Iterate

`ITERATE` permet de terminer l'itération en cours à l'intérieur d'une boucle — et donc commencer la prochaine itération.  
Même principe que la commande `continue` en JavaScript.

    ITERATE label

## Leave

`LEAVE` permet de sortir d'une boucle.  
Même principe que la commande `break` en JavaScript.

    LEAVE label

---

## Prepare, Execute, Deallocate

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

## Open, Fetch, Close

Les curseurs permettent de récupérer le résultat d'une requête ligne par ligne.  
Les commandes à utiliser pour le faire sont les suivantes :

<table>
  <tr>
    <th align="left">Déclarer un curseur</th>
    <td><pre>DECLARE nom_curseur 
    CURSOR FOR select_statement</pre></td>
  </tr>
  <tr>
    <th align="left">Déclarer l'action à effectuer lorsque<br> la requête ne retourne plus rien</th>
    <td><pre>DECLARE CONTINUE HANDLER
    FOR NOT FOUND exec_statement</pre></td>
  </tr>
  <tr>
    <th align="left">Ouvrir le curseur</th>
    <td><pre>OPEN nom_curseur</pre></td>
  </tr>
  <tr>
    <th align="left">Executer la requête de curseur</th>
    <td><pre>FETCH [[NEXT] FROM] nom_curseur 
    INTO [nom_var]*</pre></td>
  </tr>
  <tr>
    <th align="left">Fermer le curseur</th>
    <td><pre>CLOSE nom_curseur</pre></td>
  </tr>
</table>

<ins>Exemple</ins> :

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

[Codefights Queries execution](https://codefights.com/arcade/db/exotic-dishes/Mxv2EhqjsGs3oPkNG)