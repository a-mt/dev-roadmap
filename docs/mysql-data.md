---
title: Données MySQL
category: Web, BDD, MySQL
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

Si on essaie d'insérer une clé primaire qui existe déjà une erreur est levée. On peut modifier ce comportement avec `INSERT IGNORE` ou en ajoutant une clause `DUPLICATE KEY UPDATE ...` :

``` sql
-- Ingore l'insertion si la clé existe déjà
INSERT IGNORE INTO etudiant (id, nom, prenom) VALUES (1, "Dupont", "Manon");
```

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

---

## Récupérer

    SELECT attributs
    FROM   relations
    [ {INNER JOIN | LEFT JOIN | RIGHT JOIN} relations ON expressions ]
    [ WHERE    expressions ]
    [ GROUP BY attributs ]
    [ HAVING   expressions ]
    [ ORDER BY { attribut [ ASC | DESC ]}* ]

<ins>Opérations algébriques</ins> :

<table>
  <tr>
    <th valign="top">Sélection</th>
    <td><pre lang="sql">SELECT *
FROM   ETUDIANT
WHERE  Groupe = "B1";</pre>
    </td>
  </tr>
  <tr>
    <th valign="top">Projection</th>
    <td><pre lang="sql">SELECT Nom,Prenom
FROM   ETUDIANT;</pre></td>
  </tr>
  <tr>
    <th valign="top">Produit cartésien</th>
    <td><pre lang="sql">SELECT *
FROM   ETUDIANT, COURS;</pre></td>
  </tr>
  <tr>
    <th valign="top">Jointure</th>
    <td><pre lang="sql">SELECT *
FROM   NOTE, COURS
WHERE  NOTE.Code_cours = COURS.Code_cours;</pre>
    ou
    <pre lang="sql">SELECT *
FROM   NOTE
INNER JOIN COURS ON COURS.Code_cours = NOTE.Code_cours;</pre></td>
  </tr>
  <tr>
    <th valign="top">Union</th>
    <td><pre lang="sql">(SELECT ... FROM ... WHERE ...)
UNION
(SELECT ... FROM ... WHERE ...);</pre></td>
  </tr>
  <tr>
    <th valign="top">Différence</th>
    <td>Nécessite de comparer un ou des attribut(s): <pre lang="sql">SELECT ...
FROM ...
WHERE value NOT IN (
    SELECT value
    FROM ...
);</pre>
  ou <pre lang="sql">SELECT ... FROM ... as a
LEFT JOIN ... as b ON a.value = b.value
GROUP BY a.id
HAVING count(b.value) = 0;</pre></td>
  </tr>
  <tr>
    <th valign="top">Intersection</th>
    <td>Nécessite de comparer un ou des attribut(s): <pre lang="sql">SELECT ...
FROM ...
WHERE value IN (
    SELECT value
    FROM ...
);</pre>
  ou <pre lang="sql">SELECT ... FROM ... as a
INNER JOIN ... as b ON a.value = b.value
GROUP BY a.id;</pre></td>
  </tr>
</table>

---

## SELECT

Le `SELECT` permet de choisir les colonnes retournées

<table>
  <thead>
    <tr>
      <th>Syntaxe</th>
      <th>Description</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>SELECT *</code></td>
      <td valign="top">Retourne tous les attributs de la ou les tables sélectionnées</td>
      <td><pre lang="sql">SELECT *
FROM etudiant</pre></td>
    </tr>
    <tr>
      <td valign="top"><code>SELECT att1, att2</code></td>
      <td valign="top">Retourne les attributs listés</td>
      <td><pre lang="sql">SELECT nom, prenom
FROM etudiant</pre></td>
    </tr>
    <tr>
      <td valign="top"><code>SELECT nomtable.att1</code></td>
      <td valign="top">Retourne l'attribut d'une table donnée (son alias si on lui en donne un)</td>
      <td><pre lang="sql">SELECT e.id, tuteur.nom
FROM etudiant AS e
INNER JOIN tuteur
  ON e.id_tuteur = tuteur.id</pre>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>SELECT nomtable.*</code></td>
      <td valign="top">Retourne tous les attributs d'une table donnée (son alias si on lui en donne un)</td>
      <td><pre lang="sql">SELECT etudiant.*, tuteur.nom
FROM etudiant
INNER JOIN tuteur
  ON etudiant.id_tuteur = tuteur.id</pre></td>
    </tr>
  </tbody>
</table>

### Backticks

Les backticks <code>``</code> échappent les noms de colonnes et tables.
Elles sont indispensables lorsque le nom ne contient pas que des chiffres, lettres et underscores.

``` sql
SELECT `nom-table`.`id`, `my name`, `another.field`, `field,with,comma`
FROM `nom-table`
```

### Distinct

Le mot-clé `DISTINCT` évite de retourner plusieurs fois la même valeur.

``` sql
SELECT DISTINCT nom
FROM   etudiant;
```

``` sql
SELECT COUNT(DISTINCT groupe)
FROM   etudiant;
```

### Alias

On peut donner un nom aux colonnes retournées différent de leur nom en BDD avec `att1 AS nouveaunom`.  
Cet alias n'est pas accessible dans le `where` (mais dans le `group by`, `having` et `limit` oui).  
Les alias sont particulièrement utiles lorsques les colonnes sont calculées (concaténations, calculs numériques, conditions, sous-requêtes, etc).

``` sql
-- Montant de la bourse de chaque étudiant par mois
SELECT id, scholarship / 12 as scholarship
FROM scholarships
ORDER BY id;
```

``` sql
-- Vérifier si les réponses données sont justes ou non
SELECT id, IF(given_answer is null, "no answer",
              IF(correct_answer = given_answer, "correct", "incorrect")
           ) AS checks
FROM answers
ORDER BY id;
```

``` sql
-- Calculer le profit par quart d'an
SELECT
    YEAR(date) AS year,
    QUARTER(date) AS quarter,
    (sum(profit) - sum(loss)) AS net_profit
FROM accounting
GROUP BY year, quarter
ORDER BY year, quarter;
```

``` sql
-- Calculer le nombre de paquets dont on a besoin (différentes tailles)
SELECT (SELECT package_type
    FROM packages as p
    WHERE g.length <= p.length AND g.width <= p.width AND g.height <= p.height
    ORDER BY p.length * p.width * p.height
    LIMIT 1
) as package_type, count(id) as number
FROM gifts as g
GROUP BY package_type;
```

Voir [fonctions SQL](mysql-fonctions.md)

---

## FROM

Le `FROM` permet de choisir la ou les tables sources pour récupérer les données.
Si plusieurs tables sont listées dans le `FROM` et qu'aucune instruction de jointure n'est ajoutée, alors c'est un produit cartésien.

``` sql
SELECT *
FROM   ETUDIANT, COURS;
```

On peut obtenir une jointure identique au `INNER JOIN` en ajoutant une clause `WHERE`

``` sql
SELECT *
FROM   NOTE, COURS
WHERE  NOTE.Code_cours = COURS.Code_cours;
```

### Alias

Comme pour les colonnes, il est possible de donner un alias à une table pour le temps d'une requête. C'est également le cas pour le `INNER JOIN` et `LEFT JOIN`.

``` sql
SELECT o.OrderID, o.OrderDate, c.CustomerName
FROM Customers AS c, Orders AS o
WHERE c.CustomerID = o.CustomerID;
```

## INNER JOIN

Le `INNER JOIN` permet d'effectuer une jointure entre une table A et une table B : on ajoute les champs de B au champs de A, multiplié par le nombre de fois qu'il y a correspondance (de 0 à n). Les lignes sans correspondance sont exclues.

``` sql
SELECT *
FROM etudiant as e
INNER JOIN etudiant_club as ec ON e.id = ec.id_etudiant

+----+--------+---------+-------------+---------+
| id | nom    | prenom  | id_etudiant | id_club |
+----+--------+---------+-------------+---------+
| 1  | Dupont | Margaux | 1           | 2       |
| 1  | Dupont | Margaux | 1           | 3       |
| 1  | Dupont | Margaux | 1           | 1       |
| 2  | Dujean | Simon   | 2           | 2       |
+----+--------+---------+-------------+---------+
```

``` sql
SELECT holiday_date as ski_date
FROM holidays as h
INNER JOIN weather as w ON w.sunny_date = h.holiday_date;
```

## LEFT JOIN

Avec le `LEFT JOIN`, on multiple aussi A par B, à la différence près que si B ne correspond jamais, alors on garde A une fois (et les champs de B sont `NULL`) : les lignes sans correspondance ne sont pas exclues. Le `LEFT JOIN` est souvent utilisé avec la clause `GROUP_BY`.

``` sql
SELECT *
FROM etudiant as e
LEFT JOIN etudiant_club as ec ON e.id = ec.id_etudiant

+----+--------+---------+-------------+---------+
| id | nom    | prenom  | id_etudiant | id_club |
+----+--------+---------+-------------+---------+
| 1  | Dupont | Margaux | 1           | 2       |
| 1  | Dupont | Margaux | 1           | 3       |
| 1  | Dupont | Margaux | 1           | 1       |
| 2  | Dujean | Simon   | 2           | 2       |
| 3  | Durand | Marie   | (null)      | (null)  |
+----+--------+---------+-------------+---------+
```

### LEFT + INNER JOIN

Pour appliquer un `INNER JOIN` sur le `LEFT JOIN`, celui-ci doit être placé devant le `ON` (sinon, il s'applique sur le `FROM`).

``` sql
SELECT *
FROM etudiant as e
LEFT JOIN etudiant_club as ec
  INNER JOIN club as c ON ec.id_club = c.id
ON e.id = ec.id_etudiant

+----+--------+---------+-------------+---------+--------+-------------+
| id | nom    | prenom  | id_etudiant | id_club | id     | nom         |
+----+--------+---------+-------------+---------+--------+-------------+
| 1  | Dupont | Margaux | 1           | 2       | 2      | Musique     |
| 1  | Dupont | Margaux | 1           | 3       | 3      | Littérature |
| 1  | Dupont | Margaux | 1           | 1       | 1      | Sport       |
| 2  | Dujean | Simon   | 2           | 2       | 2      | Musique     |
| 3  | Durand | Marie   | (null)      | (null)  | (null) | (null)      |
+----+--------+---------+-------------+---------+--------+-------------+
```

[Tester avec SQLFiddle](http://sqlfiddle.com/#!9/9cbc63/3)

### Inverse JOIN

Pour ne garder que les lignes qui n'ont pas de jointure, on peut utiliser `IS NULL` (si cette valeur ne peut pas être nulle dans la table cible) :

``` sql
SELECT candidate_id AS student_id
FROM candidates AS c
LEFT JOIN detentions AS d ON d.student_id = c.candidate_id
WHERE d.detention_date IS NULL
ORDER  BY c.candidate_id;
```

ou `HAVING` (dans tous les cas) :

``` sql
SELECT candidate_id AS student_id
FROM candidates AS c
LEFT JOIN detentions AS d ON d.student_id = c.candidate_id
ORDER  BY c.candidate_id
GROUP BY c.candidate_id
having COUNT(d.detention_date) = 0;
```

## RIGHT JOIN

Le `RIGHT JOIN` est l'inverse du `LEFT JOIN`: on multiple B par A, en gardant B au moins une fois.  
Il est rarement utilisé.

## Sous-requête

Le `FROM`, `INNER JOIN` et `LEFT JOIN`, peuvent provenir du résultat d'une sous-requête.  
Il est obligatoire de nommer ce résultat (avec un `AS`).

``` sql
SELECT *
FROM (
    SELECT ...
    FROM ...
) as nom_temp
```

<ins>Exemples</ins> :

``` sql
-- Moyenne des 5 meilleurs élèves
SELECT ROUND(AVG(grade),2) as average_grade
FROM (
    SELECT grade
    FROM students
    ORDER BY grade DESC
    LIMIT 5
) as tmp;
```

``` sql
-- Différence entre budget (semaine entre left_bound et right_bound) et dépenses prévues
SELECT a.id, GREATEST(SUM(plan.value) - a.value,0) as loss
FROM allowable_expenditure as a
LEFT JOIN (
    SELECT 0+DATE_FORMAT(monday_date, "%U") as week, expenditure_sum as value
    FROM expenditure_plan
) as plan ON plan.week BETWEEN a.left_bound AND a.right_bound
GROUP BY a.id;
```

``` sql
-- Nombre de sièges vides par vol
SELECT flights.flight_id, IFNULL(number_of_seats - purchased_seats, number_of_seats) as free_seats
FROM flights
INNER JOIN planes ON flights.plane_id = planes.plane_id
LEFT JOIN (
    SELECT flight_id, count(seat_no) as purchased_seats
    FROM purchases
    GROUP BY flight_id
) as purchases ON purchases.flight_id = flights.flight_id
ORDER BY flights.flight_id;
```

---

## WHERE

Le `WHERE` prend une ou des expressions en paramètre, et filtre les lignes à retourner avec.  
L'expression la plus couramment utilisée est la comparaison d'un attribut et d'une valeur :

``` sql
SELECT *
FROM countries
WHERE continent = "Africa"
ORDER BY name;
```

### Calculs

On peut également tester le résultat d'un calcul, d'une fonction et/ou d'une sous-requête, et utiliser un opérateur différent de l'égalité. [Voir fonctions et opérateurs](mysql-fonctions.md#booléens)

``` sql
SELECT email
FROM users
WHERE role NOT IN ("admin", "premium")
ORDER BY email;
```

``` sql
SELECT *
FROM expressions
WHERE c = (CASE operation
          WHEN "+" THEN a + b
          WHEN "-" THEN a - b
          WHEN "*" THEN a * b
          WHEN "/" THEN a / b
      END);
```

### Plusieurs expressions

Plusieurs expressions peuvent être combinées avec `AND`, `OR`, `NOT` et les parenthèses.

``` sql
SELECT count(*) as number_of_nulls
FROM departments
WHERE description IS NULL
  OR TRIM(description) IN ("NULL", "NIL", "-");
```

### Casse

Par défaut, les comparaisons de chaînes sont insensibles à la casse.  
Pour une comparaison sensible à la casse, il faut comparer les chaînes binairement - grace au mot-clé `BINARY`.

``` sql
SELECT *
FROM etudiant as e
WHERE BINARY nom = "Dupont"
```

---

## GROUP BY

Le `GROUP BY` permet de grouper plusieurs résultats pour effectuer une agrégation de données, comme calculer une somme ou la moyenne de toutes les lignes regroupées.

``` sql
-- Moyenne de chaque étudiant
SELECT nom, prenom, ROUND(AVG(note),1) as moyenne
FROM etudiant as e
LEFT JOIN etudiant_note as n ON n.id_etudiant = e.id
GROUP BY e.id;
```

``` sql
-- Nombre d'utilisateur par pays
SELECT continent, sum(users) as users
FROM countries
GROUP BY continent
ORDER BY users DESC;
```

À noter que si une fonction d'agrégation est utilisée dans le `SELECT`alors qu'aucun `GROUP BY` n'est présent, une agrégation de toutes les lignes est effectuée.

``` sql
-- Concaténation des valeurs d'un groupe
SELECT GROUP_CONCAT(
            CONCAT(first_name, " ", surname, " #", player_number) -- Concaténation au sein d'une ligne
            ORDER BY player_number                                -- Ordre des lignes du groupe (optionnel)
            SEPARATOR '; ') as players                            -- Concaténer le tout avec ";" ("," si omis)
FROM soccer_team;

-- Alexis Sanchez #7; Oliver Giroud #12; Theo Walcott #14; Santi Cazorla #19; Hector Bellerin #24; Petr Cech #33
```

``` sql
-- Total de la commande
SELECT id_commande, SUM(prix_unite * quantite) as total
FROM commande_detail
WHERE id_commande = 1;
```

Voir [fonctions d'agrégation](mysql-fonctions#agrégats)

### WITH ROLLUP

On peut ajouter un `WITH ROLLUP` au `GROUP BY`, qui a pour effet d'ajouter un agrégat des différents groupes en plus (= un total) :

``` sql
SELECT IFNULL(year, "Total: ") as year, SUM(profit) AS profit
FROM sales
GROUP BY year ASC WITH ROLLUP;

+--------+--------+
| year   | profit |
+--------+--------+
| 2000   |   4525 |
| 2001   |   3010 |
| Total: |   7535 |
+--------+--------+
```

---

## HAVING

Le `HAVING` permet de filtrer le résultat du `GROUP BY`.

``` sql
-- Tous les étudiants qui n'ont pas la moyenne
SELECT nom, prenom, ROUND(AVG(note),1) as moyenne
FROM etudiant as e
LEFT JOIN etudiant_note as n ON n.id_etudiant = e.id
GROUP BY e.id
HAVING moyenne < 10;
```

``` sql
-- Les directeurs qui ont reçus plus de 2 oscars depuis les années 2000
SELECT director
FROM moviesInfo
WHERE year > 2000
GROUP BY director
HAVING sum(oscars) > 2;  
```

---

## ORDER BY

`ORDER BY` permet d'ordonner le résultat. On peut ordonner de manière croissante avec `ASC` (ordre par défaut si omis) ou de manière décroissante avec `DESC`.

``` sql
SELECT nom, prenom
FROM etudiant
ORDER BY nom, prenom; -- nom croissant + prenom croissant si deux étudiants ont le même nom
```

``` sql
SELECT nom, prenom
FROM etudiant
ORDER BY nom DESC, prenom; -- nom décroissant + prenom croissant
```

On peut également utiliser des fonctions :

``` sql
SELECT *
FROM events
ORDER BY WEEKDAY(event_date), participants DESC;
```

``` sql
SELECT *
FROM workers_info
ORDER BY id, CASE column_name
  WHEN "name" THEN 1
  WHEN "date_of_birth" THEN 2
  WHEN "salary" THEN 3
END
```

``` sql
SELECT *
FROM workers_info
ORDER BY id, FIELD(column_name,'name','date_of_birth','salary')
```

---

## LIMIT

Le `LIMIT` limite le nombre de résultats retournés.

``` sql
-- Les 10 employés les mieux payés
SELECT *
FROM employees
ORDER BY salary DESC
LIMIT 10;
```

``` sql
-- Le ou les produit(s) qui ont couté le plus cher
SELECT name
FROM Products
ORDER BY (price * quantity) DESC, name
LIMIT 1;
```

Il est possible de choisir à partir de quel indice on veut récupérer les résultats (de 0 à n), par exemple pour une pagination.  

``` sql
-- Page 3 de la liste produit (30 produits par page)
SELECT *
FROM produits
ORDER BY id
LIMIT 60,30;
```

---

## UNION

Le résultat de deux `SELECT` peut être mis bout à bout avec la commande `UNION`.

``` sql
-- Liste des abonnements sur toute l'année + sur 6 mois
SELECT DISTINCT subscriber
FROM (
    (SELECT subscriber FROM full_year WHERE newspaper LIKE "%Daily%")
    UNION
    (SELECT subscriber FROM half_year WHERE newspaper LIKE "%Daily%")
) as tmp
ORDER BY subscriber;
```

``` sql
-- Table (id, name, date_of_birth, salary) -> (id, column_name, value)
SELECT id, column_name, value
FROM (
( SELECT 1 as n, id, "name" as column_name, name as value
  FROM workers_info
  WHERE name IS NOT NULL )
UNION
( SELECT 2 as n, id, "date_of_birth" as column_name, date_of_birth as value
  FROM workers_info
  WHERE date_of_birth IS NOT NULL )
UNION
( SELECT 3 as n, id, "salary" as column_name, salary as value
  FROM workers_info
  WHERE salary IS NOT NULL )
) as tmp
ORDER BY id, n;
```

``` sql
-- Moyenne de chaque étudiant + total
(
  SELECT CONCAT(nom, " ", prenom) as nom_prenom, ROUND(AVG(n.note),1) as moyenne
  FROM etudiant as e
  LEFT JOIN etudiant_note as n ON n.id_etudiant = e.id
  GROUP BY e.id
) UNION (
  SELECT "Total:" as nom_prenom, ROUND(AVG(n.note),1) as moyenne
  FROM etudiant_note as n
)
```

[Voir SQLFiddle](http://sqlfiddle.com/#!9/88366/12)

### UNION ALL

Le `UNION` ne conserve pas les doublons, `UNION ALL` oui

``` sql
SELECT name as names FROM
(
    (SELECT id,name FROM pr_department ORDER BY date_joined DESC LIMIT 5)
    UNION ALL
    (SELECT id,name FROM it_department ORDER BY date_joined DESC LIMIT 5)
    UNION ALL
    (SELECT id,name FROM sales_department ORDER BY date_joined DESC LIMIT 5)
) as tmp
ORDER BY name;
```

### INNER JOIN

On peut se servir du `UNION` dans un `INNER JOIN` pour dupliquer des lignes. [Voir SQLfiddle](http://sqlfiddle.com/#!9/1ff2b7/3).

``` sql
INNER JOIN (SELECT 0 as i UNION SELECT 1) as n ON 1 = 1;
```

---

## Variables utilisateur

Les variables utilisateurs permettent de stocker des valeurs pour le temps d'une execution.  

* Elles sont initialisées en dehors des requêtes avec le mot-clé `SET`

      SET @var_name = valeur;

* Elles sont accessibles à l'intérieur d'une requête par leur nom :

      WHERE att = @var_name

* On peut les assigner/modifier à l'intérieur d'une requête avec `:=` (l'affectation retourne la valeur settée) :

      WHERE att = (@var_name := valeur)

* On peut assigner le résultat d'une requête avec `SELECT ... INTO` ou `SET = (SELECT ...)`

      SELECT att INTO @var_name

  <!-- -->

      SET @var_name = (SELECT att)

<ins>Exemples</ins> :

Effectuer des calculs sur une ligne :

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

Effectuer des calculs sur plusieurs lignes :

``` sql
-- Modifier l'id de chaque ligne (incrémente de 1)
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

Réutiliser une variable entre deux requêtes :

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
