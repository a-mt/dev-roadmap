---
title: Event Scheduler
category: BDD, MySQL
---

L'event scheduler déclenche des évènements en fonction de la date et de l'heure auxquelles ils sont programmés, un peu sur le même principe qu'une crontab.

## Créer

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

    Où interval:
        <number> {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
                  WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
                  DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}

`STARTS` et `ENDS` doivent être une date dans le futur

### Exemple

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

---

## Supprimer

    DROP EVENT [IF EXISTS] event_name

[Doc MySQL Event Scheduler](https://dev.mysql.com/doc/refman/5.7/en/create-event.html)
