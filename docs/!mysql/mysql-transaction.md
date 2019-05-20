---
title: Transactions
category: BDD, MySQL
---

## Propriétés ACID

Un SGBD doit fournir des mécanismes pour assurer l'intégrité, la confidentialité mais aussi les accès concurrents (autoriser les accès simultanés à la BD par plusieurs utilisateurs) et la sureté de fonctionnement (assurer la cohérence des données en dépit des pannes matérielles et logicielles qui peuvent se produire).

Une *transaction* est une séquence d'actions à réaliser sur la BD, qui a les propriétés suivantes (ACID):

<table>
  <tr>
    <th>Atomicité</th>
    <td>Tout est exécuté ou rien</td>
  </tr>
  <tr>
    <th>Cohérence</th>
    <td>Une transaction fait passer la BD d'un état cohérent à un autre été cohérent</td>
  </tr>
  <tr>
    <th>Isolation</th>
    <td>Les mises à jour faites par une transaction ne sont pas visibles de l'extérieur tant que la transaction n'est pas terminée</td>
  </tr>
  <tr>
    <th>Durabilité</th>
    <td>Les actions effectuées par une transaction terminée sont définitives</td>
  </tr>
</table>

Les actions à l'intérieur d'une transaction sont effectuées en mémoire.  
Lorsque la transaction atteint son point de validation (`COMMIT`), les modifications sont enregistrées sur le disque.  
Si la transaction est annulée (`ROLLBACK`), la transaction se supprime en effaçant toute trace de son passage.

---

## Journal

Un *point de contrôle* est une sauvegarde des modifications de la BD sur le disque.  
Le *journal* est un fichier texte dans lequel le SGBD inscrit dans l'ordre toutes les actions effectuées depuis le dernier point de contrôle.

Quand le système redémarre, il détermine en fonction du contenu du journal l'état des transactions et va automatiquement
- refaire le travail des transactions gagnantes
- défaire le travail des transactions perdantes

Le journal garantit ainsi les propriétés ACID : une transaction laisse toujours la base de données dans un état cohérent même après une panne.

---

## Start transaction

Permet de commencer une transaction

    START TRANSACTION

## Commit

Valide la transaction en cours — et enregistre donc les modifications en base de données

    COMMIT

## Rollback

Annule la transaction en cours — et abandonne donc les modifications effectuée depuis le début de la transaction

    ROLLBACK

Attention, les actions qui modifient le schéma ne peuvent pas être annulées (create, drop, alter), elles commitent automatiquement la transaction. [Liste des requêtes qui commitent automatiquement une transaction](https://dev.mysql.com/doc/refman/5.7/en/implicit-commit.html).

## Exemple

``` sql
START TRANSACTION;
    SELECT @A:=SUM(salary) FROM table1 WHERE type=1;
    UPDATE table2 SET summary=@A WHERE type=1;
COMMIT;
```


[Doc MySQL transactions](https://dev.mysql.com/doc/refman/5.7/en/commit.html)

---

## Savepoint

Le moteur InnoDB supporte les points de restauration au sein d'une transaction, les *savepoints*.  
Ils permettent de revenir à une étape donnée dans la transaction et d'annuler celles qui ont suivit.

### Créer un savepoint

    SAVEPOINT identifier

### Rollback vers un savepoint

    ROLLBACK [WORK] TO [SAVEPOINT] identifier

### Supprimer un savepoint

Ni commit ni rollback, supprime juste le savepoint

    RELEASE SAVEPOINT identifier

### Exemple

``` sql
START TRANSACTION;
    INSERT INTO matable VALUES (1);
    SAVEPOINT savepoint1; -- création du savepoint1
    INSERT INTO matable VALUES (2);
    SAVEPOINT savepoint2; -- création du savepoint2
    INSERT INTO matable VALUES (3);
    ROLLBACK TO SAVEPOINT savepoint1; -- ROLLBACK TO savepoint1
COMMIT;

SELECT * FROM tmp;
+----+
| id |
+----+
| 1  |
+----+
```

[Doc MySQL savepoints](https://dev.mysql.com/doc/refman/5.7/en/savepoint.html)
