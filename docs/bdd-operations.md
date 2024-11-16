---
title: Opérations de base
category: Web, Bases de données
---

Un modèle de donnée offre un ensemble d'opérateurs pour effectuer des recherches et des modifications sur la base de données.

## Sélection

<ins>Définition</ins>: Un sous-ensemble de lignes de R1 vérifiant la condition C

<ins>Notation algébrique</ins>: R1 / C  
<ins>Exemple</ins>: `pomme / (couleur == jaune)`

![Sélection](https://i.imgur.com/5G0Kh54.png)

<ins>Équivalent en SQL</ins>:

```
SELECT *
FROM pomme
WHERE couleur = "jaune"
```

## Projection

<ins>Définition</ins>: Un sous-ensemble de colonnes de R1 (VA, ...)

<ins>Notation algébrique</ins>: R1[VA,...]  
<ins>Exemple</ins>: `pomme[identifiant,nom_variété]`

![Projection](https://i.imgur.com/5viyTWg.png)

<ins>Équivalent en SQL</ins>:

```
SELECT identifiant, nom_variété
FROM pomme
```

## Produit cartésien

<ins>Définition</ins>: Combinaison de R1 et R2  

<ins>Notation algébrique</ins>: R1 X R2  
<ins>Exemple</ins>: `goûteur x variété = dégustation`

![Produit cartésien](https://i.imgur.com/9hqx9KI.png)

<ins>Équivalent en SQL</ins>:

```
SELECT *
FROM goûteur, variété
```

## Jointure

<ins>Définition</ins>: Combinaison de R1 et R2 dont la valeur d'un attribut est la même  

<ins>Notation algébrique</ins>: R1 * (VA = VB) R2  
<ins>Exemple</ins>: `pomme * (nom_variété = libellé) variété`

![Jointure](https://i.imgur.com/7Nfp5ek.png)

<ins>Équivalent en SQL</ins>: (notons qu'il existe différents types de jointure en SQL, pour gérer les cas dans lesquelles une correspondance n'existerait pas)

```
SELECT *
FROM pomme
LEFT JOIN variété WHERE pomme.nom_variété = variété.libellé
```

## Différence ensembliste

<ins>Définition</ins>: Ensemble des n-uplets de R1 qui ne sont pas dans R2  

<ins>Notation algébrique</ins>: R1 - R2  
<ins>Exemple</ins>: `pomme1 - pomme2`

![Différence](https://i.imgur.com/7HhJ3Hs.png)

<ins>Équivalent SQL</ins>:

```
SELECT *
FROM pomme1
EXCEPT
SELECT *
FROM pomme 2
```

## Union

<ins>Définition</ins>: Ensemble des n-uplets de R1 ou de R2

<ins>Notation algébrique</ins>: R1 ∪ R2    
<ins>Exemple</ins>: `pomme1 + pomme2`

![Union](https://i.imgur.com/0m4T27l.png)

<ins>Équivalent SQL</ins>:

```
SELECT *
FROM pomme1
UNION
SELECT *
FROM pomme2
```

## Intersection

<ins>Définition</ins>: Ensemble des n-uplets de R1 qui sont aussi dans R2  

<ins>Notation algébrique</ins>: R1 ∩ R2  
<ins>Exemple</ins>: `pomme1 ∩ pomme2`

![Intersection](https://i.imgur.com/k4YTd46.png)

<ins>Équivalent SQL</ins>:

```
SELECT *
FROM pomme1
INTERSECT
SELECT *
FROM pomme2
```

## Division

<ins>Définition</ins>: Ensemble des n-uplets dont la concaténation avec tous les n-uplets de R2 appartient à R1

<ins>Notation algébrique</ins>: R1 ÷ R2    
<ins>Exemple</ins>: `dégustation ÷ variété = goûteur`

![Division](https://i.imgur.com/43KD5mg.png)

## Agrégation

L'agrégation n'est pas une opération faisant partie de l'algèbre relationnelle mais n'en reste pas moins très utile.
On utilise une agrégation pour calculer le résultat d'un ensemble de lignes (on dit qu'on forme des agrégats).  
<ins>Exemple</ins>: calculer la masse moyenne des pommes par groupes de pommes jaunes, rouges et vertes abîmées ou non.

![Agrégation](https://i.imgur.com/WezbjsO.png)

<ins>Équivalent SQL</ins>:

```
SELECT AVG(poids) AS moyenne
FROM pomme
GROUP BY couleur, abimée
```