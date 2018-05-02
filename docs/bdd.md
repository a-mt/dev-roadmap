---
title: Bases de données
category: Web
---

## Vocabulaire

### Base de données

Une *base de données* est un ensemble de données stockées de façon organisée, souvent dans des tables - mais par forcemment.

### Modèle de données

La manière dont sont organisées les données dans la base de données est ce qu'on appelle un *modèle de données*.
Le plus utilisé est le modèle de données *relationnel* :
- La base de données est une collection de *tables* ou *relations*.
  - Un peu comme un stylesheet Excel, le contenu est organisé en lignes et colonnes
  - Sur chaque ligne est stocké une entité, qu'on appelle un *n-uplet*
  - À chaque colonnes sont associées des valeurs, des *attributs* de n-uplet
- Les tables peuvent avoir des *relations* entre elles. Par exemple, un étudiant a une note pour différents cours: la table "étudiant" est liée à la table "notes", qui est liée à la table "cours".

  ![Exemple BDD](https://i.imgur.com/I48BLJn.png)

Il existe d'autres [modèle de données](https://www.lucidchart.com/pages/fr/quest-ce-quun-mod%C3%A8le-de-base-de-donn%C3%A9es).

### Schéma

Chaque colonne a des propriétés : type de données (nombre, chaîne de caractères, booléen, etc), valeur par défaut, etc. Le *schéma* d'une table est la définition des colonnes de cette table.

    +-------------+--------------+
    | Field       | Type         |
    +-------------+--------------+
    | Nom         | varchar(255) |
    | Prenom      | varchar(255) |
    | No_etudiant | int(11)      |
    | Groupe      | varchar(2)   |
    +-------------+--------------+

### N-uplet

Un *n-uplet* est un ensemble de valeurs, une ligne de la table.

    +--------+------+----+----+
    | Durant | Paul | 17 | A1 |
    +--------+------+----+----+

### Clé

Une *clé primaire* (primary key) est ce qui permet d'identifier un n-uplet dans une table de manière unique.  
Une *clé étrangère* (foreign key) est une clé qui désigne la clé primaire d'une autre table, et qui crée donc une relation.  

Par exemple,
- La <ins>clé primaire</ins> de la table "étudiant" est `No_etudiant`.
- La <ins>clé primaire</ins> de la table "note" est la combinaison `(No_etudiant,Code_cours)` (si un étudiant ne peut avoir qu'une seule note par cours).
- `No_etudiant` dans la table "note" est une <ins>clé étrangère</ins> qui pointe vers "étudiant".

### SGBD

Un *système de gestion de bases de données* (SGBD) est un logiciel qui permet de créer, maintenir et interroger une base de données (effectuer une recherche ou un tri par exemple).  
Les SGDB les plus connus de bases de données relationnelles sont
- Oracle, SQLServer, DB2 et Sybase pour les produits commerciaux
- SQLite, MySQL et PostgreSQL pour les systèmes libres

### MySQL

MySQL est un SGBD de base de données relationnelle utilisé avec Lamp, une stack de développement très populaire (Linux, Apache, MySQL, PHP).

On peut executer des commandes SQL dans la console en ouvrant MySQL (`mysql -u root -p`).  
Ou dans le navigateur en utilsant phpMyAdmin.  
[MySQL Workbench](https://www.mysql.com/fr/products/workbench/) est un logiciel de visualisation pour créer, executer et optimiser les requêtes SQL.

### SQL

On donne des instructions à effectuer au SGBD en utilisant le *langage SQL*. Chaque SGBD implémente une variante de SQL qui lui est propre (mais les commandes basiques sont identiques entre tous les SGBD).

Voir [MySQL](mysql.md) pour la description du langage SQL de MySQL.

### NoSQL

NoSQL (Not Only SQL) est un terme assez vague qui désigne un ensemble de SGBD alternatifs qui cherchent à fournir soit
- des modèles de données différents des modèles de données classiques en tables (stocker et requêter des données au format JSON par exemple)
- des performances extrêmes
- un passage à l'échelle transparent qui permet de gérer de gigantesques volumes de données (de l'ordre du Tera ou Petaoctet).

Pour permettre ces fonctionnalités, les bases de données NoSQL abandonnent une ou des propriétés des bases de données classiques et ne permettent pas les requêtes complexes des bases de données classiques.

---

## Propriétés des bases de données classiques

1. Persistance des données  
   Les données sont sauvegardées sur le disque

2. Partage des données  
   Les utilisateurs accèdent en même temps aux mêmes données  
   Il existe des mécanismes de contrôle de la concurrence

3. Redondance faible  
   Chaque information n'est stockée qu'une seule fois  
   Dans le cas contraire, les informations dupliquées doivent rester valides

4. Sécurité  
   Il faut gérer les reprises en cas de pannes logicielles ou matérielles

5. Confidentialité  
   Les données sensibles doivent être protégées  
   Il y a des mécanismes de sécurité et d'autorisation

6. Contraintes d'intégrité  
   Contraintes sur le type de données (ex: le nombre d'heures d'un cours est un entier positif)  
   Contraintes sur les données (ex: la note d'un étudiant est comprise entre 0 et 20)
   Contraintes sur les relations (ex: une seule occurence d'un identifiant est précent)

---

## Opérations

Un modèle de donnée offre un ensemble d'opérateurs pour effectuer des recherches et des modifications sur la base de données.

| Opération              | Notation algébrique | Description |
|---                     |---                  |---          |
| Sélection              | R1 / C              | Un sous-ensemble de lignes de  R1 vérifiant la condition C |
| Projection             | R1[VA,...]          | Un sous-ensemble de colonnes (VA, ...) de R1 |
| Produit cartésien      | R1 X R2             | Combinaison de R1 et R2 |
| Jointure               | R1 * (VA = VB) R2   | Combinaison de R1 et R2 dont la valeur d'un attribut est la même |
| Différence ensembliste | R1 - R2             | Ensemble des n-uplets de R1 qui ne sont pas dans R2 |
| Union                  | R1 ∪ R2 | Ensemble des n-uplets de R1 ou de R2 |
| Intersection | R1 ∩ R2 | Ensemble des n-uplets de R1 qui sont aussi dans R2 |
| Division | R1 ÷ R2 | Ensemble des n-uplets dont la concaténation avec tous les n-uplets de R2 appartient à R1 |

### Sélection

pomme / (couleur == jaune)

![Sélection](https://i.imgur.com/5G0Kh54.png)

### Projection

pomme[identifiant,nom_variété]

![Projection](https://i.imgur.com/5viyTWg.png)

### Produit cartésien

goûteur x variété = dégustation

![Produit cartésien](https://i.imgur.com/9hqx9KI.png)

### Jointure

pomme * (nom_variété = libellé) variété

![Jointure](https://i.imgur.com/7Nfp5ek.png)

### Différence ensembliste

pomme - pomme

![Différence](https://i.imgur.com/7HhJ3Hs.png)

### Union

pomme + pomme

![Union](https://i.imgur.com/0m4T27l.png)

### Intersection

pomme ∩ pomme

![Intersection](https://i.imgur.com/k4YTd46.png)

### Division

dégustation ÷ variété = goûteur

![Division](https://i.imgur.com/43KD5mg.png)

### Agrégation

L'agrégation n'est pas une opération faisant partie de l'algèbre relationnelle mais n'en reste pas moins très utile.
On utilise une agrégation pour calculer le résultat d'un ensemble de lignes (on dit qu'on forme des agrégats).  
Par exemple: calculer la masse moyenne des pommes par groupes des pommes jaunes, rouges et vertes abîmées ou non.

![Agrégation](https://i.imgur.com/WezbjsO.png)
