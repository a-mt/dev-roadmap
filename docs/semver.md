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

    VERSION-PRELIVRAISON+BUILD        Version de build

Les informations de build sont ignorées dans l'ordre des versions (deux builds différents ont la même priorité) : `1.0.0-20140313144700` == `1.0.0+20130313144700`

### Exemples

- `1.0.0-alpha+001`
- `1.0.0+20130313144700`
- `1.0.0-beta+exp.sha.5114f85`

---

## Gestionnaires de packets

Les gestionnaires de packets tels que NPM (node.js) et Composer (PHP), permettent de spécifier quelles versions d'un packet sont acceptées.
- La syntaxe est expliquée en détails sur [getcomposer.org](https://getcomposer.org/doc/articles/versions.md#writing-version-constraints).
- Utiliser [npm server calculator](https://semver.npmjs.com/) pour tester les versions matchées par un pattern.


### Version exacte

    1.2.3       Installer la version 1.2.3

### Opérateur \*

Le \* est interprété comme "n'importe quelle valeur".  
NPM accepte aussi la valeur x : `1.x.x` = `1.*.*`.

    *           N'importe quelle version
    1.*.*       N'importe quelle version de la version majeure 1 (ex: 1.1.0, 1.0.1)
    1.2.*       N'importe quelle version de la version mineure 1.2 (ex: 1.2.0, 1.2.1)

Lorsque le gestionnaire de packets a le choix entre plusieurs versions, il prend la dernière : `1.2.1` sera préférée à `1.2.0`.

### Version partielle

Lorsque la version indiquée n'inclut pas les trois identifiants `MAJEUR.MINEUR.PATCH` alors l'identifiant manquant le plus à droite peut prendre n'importe quelle valeur. Deux identifiants = `MAJEUR.MINEUR`, un identifiant = `MAJEUR`.  
Fonctionne de la même manière que si il y avait un `.*`.  

    1.2         = 1.2.*
    1           = 1.*.*

### Plages de version

On peut spécifier des plages de version en utilisant les opérateurs de comparaison >, >=, <, <=, !=.  
Les espaces sont interprétés comme des ET, les doubles-pipes (||) comme des OU.

    >=1.0                  1.0 et plus
    >=1.0 <2.0             1.0 et plus mais inférieur à 2.0
    >=1.0 <1.1 || >=1.2    1.0 et plus sauf 1.1

### Ensemble de version

Entre deux versions inclues

    1.0 - 2.0              Entre 1.0 et 2.0 inclus (>=1 <=2)

### Opérateur ~

Le ~ indique que le dernier identifiant n'est pas significatif et qu'on accepte une valeur supérieure mais pas inférieure. Autrement dit, `~1.2.3` = `1.2.* >1.2.3`

    ~1.2.3                 >=1.2.3 <1.3
    ~1.2                   >=1.2   <2

Le ~ n'accepte pas les changements de version majeure : `~1` est interprété comme `~1.0`.

### Opérateur ^

Le ^ indique que seul la version majeure est significative.  
Autrement dit, `^1.2.3` = `1.*.* >=1.2.3`

    ^1.2.3                 >=1.2.3 <2

### Stabilité

Composer accepte ou non les versions non stables (pré-livraisons) selon l'opérateur utilisé.
Les contraintes de stabilité sont expliquées sur [getcomposer.org](https://getcomposer.org/doc/articles/versions.md#stability-constraints).

On peut modifier la stabilité minimale acceptée par défaut en ajoutant `@flag` à la fin de la version.  
Les flags disponibles sont `dev`, `alpha`, `beta`, `RC` et `stable`.

    1.0.*@beta             >=1.0 <1.1 + accepte les pré-livraisonns à partir de beta
