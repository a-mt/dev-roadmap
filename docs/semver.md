---
title: Sémantique de version
category: Other
---

La sémantique de version est une convention qui spécifie comment numéroter les versions d'un logiciel/application.
Une fois commité en production, un logiciel doit avoir un numéro de version.
Le contenu d'une version ne peut plus être modifié et toute modification doit faire l'objet d'une nouvelle version.

Les spécifications complètes sont disponibles (en plusieurs langues) sur http://semver.org/.

---
## Principe de base

    MAJEUR.MINEUR.PATCH        Numéro de version

Le nom de la version permet de savoir quand
- les changements apportés sont non rétrocompatibles (montée en version) : `MAJEUR`
- les changements apportés sont rétrocompatibles (ajout de fonctionnalités, marquer comme obsolète) : `MINEUR`
- les changements apportés corrigent des anomalies rétrocompatibles (bug fix) : `PATCH`

Lorsqu'on incrémente la valeur de `MAJEUR`, `MINEUR` et `PATCH` sont remis à 0.  
Une version majeure peut ajouter des changements mineurs et des patchs.

Lorsqu'on incrémente la valeur de `MINEUR`, `PATCH` est remis à 0.  
Une version mineure peut ajouter des patchs.

### Exemples

- `0.x.y` : Un logiciel en cours de développement (où x et y sont des entiers)
- `1.0.0` : La première version finalisée d'un logiciel
- `1.0.1` : La première correction de bug(s) sur 1.0.0
- `1.1.0` : Le premier ajout de fonctionnalité(s) sur 1.0.0

---

## Pré-livraison

Une version de pré-livraison est notée à la suite du numéro de patch, préfixée par un tiret.
Elle peut contenir des caractères alphanumériques, tirets et points ([.0-9A-Za-z-]).
Elle indique que la version n'est pas stable et ne garantit pas 100% de compatibilité.

    VERSION-PRELIVRAISON       Version de pré-livraison

Une pré-livraison est inférieure à une version normale : `1.0.0-alpha` < `1.0.0`

### Exemples

- `1.0.0-alpha` : Version alpha de la première version d'un logiciel
- `1.0.0-0.3.7` : Numéro de livraison + numéro de version

---

## Build

Une version de build est notée à la suite du numéro de pré-livraison, préfixée par un plus.
Elle peut contenir des caractères alphanumériques, tirets et points ([.0-9A-Za-z-]).

    VERSION-PRELIVRAISON-BUILD        Version de build

Les informations de build sont ignorées dans l'ordre des versions (deux builds différents ont la même priorité) : `1.0.0-20140313144700` == `1.0.0+20130313144700`

### Exemples

- `1.0.0-alpha+001`
- `1.0.0+20130313144700`
- `1.0.0-beta+exp.sha.5114f85`
