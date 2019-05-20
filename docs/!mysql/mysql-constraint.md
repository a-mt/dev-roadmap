---
title: Constraintes sur les tables
category: BDD, MySQL, Schéma
---

Il existe différents types de contraintes

* `KEY` est un synonyme de `INDEX`  
  Lorsqu'on ajoute un index sur une ou des colonnes, MySQL construit une table d'indexage, qui permet de trouver très rapidement tous les n-upplets dont l'index a une valeur donnée. Cela permet d'accélérer les recherches et les jointures mais augmente la taille sur le disque et en mémoire.

* `UNIQUE`  
  Crée un index unique. Si on essaie d'ajouter un n-upplet avec une valeur de clé identique à un n-upplet existant, alors une erreur est levée. Un index unique peut être laissé null et il peut y avoir plusieurs n-upplets ayant une valeur nulle.

* `PRIMARY KEY`  
  La clé primaire permet d'identifier de manière unique un n-upplet dans une table. Toutes les colonnes d'une clé primaire doivent être non nulles. La clé primaire devrait être relativement courte, pour éviter de surchager le moteur de stockage.

  Dans la table créée, une `PRIMARY KEY` est placée en premier, suivie de tous les index `UNIQUE`, puis des index non uniques. Cela aide l’optimiseur MySQL à hiérarchiser l’index à utiliser et à détecter plus rapidement les clés `UNIQUE` dupliquées.

* `FOREIGN KEY`  
  Les clés étrangères permet de lier un index dans la table en cours à un index dans une autre table. Cela permet de maintenir la cohérence des données. Par exemple, on ne peut pas ajouter un n-upplet dans la table `commande` en référençant une personne qui n'existe pas dans la table `client`.

* `CHECK`  
  Permet de vérifier que la valeur donnée correspond à une des valeurs définies.

---

## Index

### Lister

    SHOW INDEX FROM nom_table [FROM database] [WHERE expr]

### Ajouter

    CREATE [UNIQUE | FULLTEXT | SPATIAL] INDEX nom_index ON nom_table (attributs)

* On peut ajouter des index en créant la table:

  ``` sql
  CREATE TABLE Orders (
      OrderID int NOT NULL,
      OrderNumber int NOT NULL,
      PersonID int,
      OrderStatus tinyint(1) NOT NULL,
      PRIMARY KEY (OrderID),
      UNIQUE KEY OrderNumber (OrderNumber),
      KEY OrderStatus (OrderStatus),
      CONSTRAINT PersonID FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
  ); 
  ```

* En la modifiant:

  ``` sql
  ALTER TABLE Orders
    ADD PRIMARY KEY (OrderID),
    ADD UNIQUE OrderNumber (OrderNumber)
    ADD INDEX OrderStatus (OrderStatus),
    ADD CONSTRAINT PersonID FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);
  ```

* Ou à part:

  ``` sql
  CREATE UNIQUE INDEX OrderNumber ON Orders (OrderNumber);
  CREATE INDEX OrderStatus on Orders (OrderStatus);
  ```

### Supprimer

    DROP INDEX nom_index

---

## Clés étrangères

Pour créer une clé étrangère, il faut
- un index sur la colonne source (= primary key ou key)
- que la colonne source et la colonne cible aient exactement le même type de données (et même taille)

``` sql
CREATE TABLE commande_produits (
  id INT(11) PRIMARY KEY,
  id_commande INT(11),
  id_produit INT(11),
  FOREIGN KEY(id_commande) REFERENCES commande (id) ON UPDATE SET NULL ON DELETE CASCADE,
  FOREIGN KEY(id_produit) REFERENCES produit (id)
);
```

``` sql
ALTER TABLE `category`
  ADD CONSTRAINT `parent` FOREIGN KEY (`parent`) REFERENCES `category`(`id`)
  ON DELETE CASCADE ON UPDATE RESTRICT; 
```

### On delete, on update

On peut contrôler le comportement du n-upplet lorsque la valeur référencée est supprimée avec `ON DELETE`:

    ON DELETE {RESTRICT | NO ACTION | SET NULL | CASCADE}

Ou lorsqu'elle est modifiée avec `ON UPDATE`:

    ON UPDATE {RESTRICT | NO ACTION | SET NULL | CASCADE}

<table>
  <thead>
    <tr>
      <th>Valeur</th>
      <th>Description</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th align="left">NO ACTION</th>
      <td>(Comportement par défaut) Lever une erreur si l'on essaie de supprimer une référence<br>Synonyme: RESTRICT</td>
      <td>Si l'on essaie de supprimer un groupe alors qu'un étudiant appartient à ce groupe, la suppression échoue en affichant une erreur (Cannot delete or update a parent row: a foreign key constraint fails [...])</td>
    </tr>
    <tr>
      <th align="left">SET NULL</th>
      <td>Mettre à <code>NULL</code> la valeur lorsqu'on supprime la référence</td>
      <td>Si l'on supprime une catégorie, on met <code>NULL</code> pour catégorie aux produits associés (= sans catégorie)</td>
    </tr>
    <tr>
      <th align="left">CASCADE</th>
      <td>Supprimer la ligne si la référence est supprimée</td>
      <td>Si l'on supprime un concert, on supprime toutes les réservations associées.</td>
    </tr>
  </tbody>
</table>