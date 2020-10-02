---
title: Statistiques
category: Maths
---

## Population vs échantillon

* On appelle *population* l'ensemble des éléments ou individus qui nous intéressent. Par exemple, si on veut savoir la vitesse des véhicules sur l'autoroute, alors l'ensemble des véhicules sur l'autoroute est la population qui nous intéresse. Collecter les informations de l'ensemble de la population est ce qu'on appelle un *recensement* (*census* en anglais).

* Il est souvent difficile si ce n'est impossible de collecter les données de toute une population. Dans ce cas, on collecte les données d'un sous-ensemble de la population, ce qu'on appelle un *échantillon* (*sample* en anglais).

  Pour être utile, un échantillon doit être *représentatif*, c'est à dire être une sélection suffisamment large et ayant les mêmes caractéristiques et dans les mêmes proportions que la population. Dans notre exemple, l'échantillon doit être une sélection tous les véhicules dans toutes les situations — les camions, voitures, motos, de la voie de gauche, la voie de droite, le jour, la nuit, en traffic normal, en embouteillage, etc.

  Pour parvenir à ce but, l'échantillon doit être sélectionné *aléatoirement*, de manière équitable, sur une période donnée. Cette sélection doit être effectuée par un ordinateur car un humain est souvent inconsciemment attiré vers un élément plutôt qu'un autre et introduit ainsi un biais dans les données.

## Paramètre vs statistique

Les données d'une population est ce qu'on appelle un *paramètre* tandis que les données d'un échantillon est une *statistique*. Une statistique est une information imparfaite mais qui nous permet d'estimer le paramètre d'une population.

Côté notation, on représente généralement les paramètres d'une population avec des lettres grecques:
- σ : déviation standard d'une population
- µ : moyenne d'une population

Et les statistiques d'un échantillon avec des lettres latines:
- S : déviation standard d'un échantillon
- M : moyenne d'un échantillon

---

## Statistiques descriptives

Le but des statistiques descriptives est de fournir une synthèse
des données. Si on a récolté 3000 données via un sondage, difficile de tout lire et d'en déduire quoi que ce soit en l'état. Pour essayer de comprendre les données, on va chercher à résumer les données soit

- sous forme graphique: visualisations

  ![](https://i.imgur.com/dhU57XX.png)

- sous forme tabulaire: tableaux

  ![](https://i.imgur.com/HdHiGYu.jpg)

- ou sous forme numérique: moyenne, déviation standard, etc. C'est la partie statistique.

Lorsqu'on regarde une seule variable, on parle de statistique descriptive univariée (ou analyse univariable). Lorsqu'on regarde simultanément deux variables, on parle de statistique descriptive bivariée (ou analyse bivariable). Et lorsqu'on regarde plus de 2 variables, on parle de
statistique descriptive multivariée (ou analyse des données).

---

## Statistiques inférentielles

Les statistiques inférentielles consistent à comparer des moyennes, proportions, variances ou distributions entre deux échantillons (ou plus).   

Si on prend deux échantillons différents, il faut s'attendre à ce que les données ne soient pas parfaitement identiques et donc qu'il y ait une différence dans les mesures. Mais quelle différence doit-on considérer comme une variation entre les échantillons ou comme une différence significative? Les tests statistiques vont nous permettre de calculer la probabilité que les variations des données soient dû au hasard. S'il est improbable que les variations soient un simple hasard, on en déduira qu'il existe une vraie différence entre les échantillons. Ça va nous permettre
- de mettre en évidence des corrélations (ex: l'influence du sexe sur le salaire),
- de monter des expériences (ex: tester l'efficacité d'un médicament),
- ou encore d'aboutir à une généralité (ex: vérifier si les données suivent une distribution connue).

![](https://i.imgur.com/D5N2eLYl.png)