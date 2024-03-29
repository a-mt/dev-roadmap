---
title: 2 - Collecter & formatter les données
category: Machine Learning, Processus
---

## Collecter les données

(*Data retrieval* ou *data collecting* en anglais)

Pour commencer, il faut aller chercher les données là où elles sont.

1. Dans le meilleur des cas, on a déjà toutes les données qu'on veut en format structuré.
2. Deuxième possibilité, les données sont stockées dans un data lake, dans un format non structuré — auquel cas il va falloir les formatter.
3. On peut éventuellement aller chercher des données dans des datasets publics. Par exemple:

   * [Kaggle](https://www.kaggle.com/datasets)
   * [AI hub](https://aihub.cloud.google.com/u/0/s?category=data)
   * [Healthdata.gov](https://healthdata.gov/search/type/dataset)
   * [data.world](https://data.world/)
   * [visualdata.io](https://www.visualdata.io/discovery)
   * [opendatanetwork](https://www.opendatanetwork.com/)

4. Dernière possibilité, extraire les données sur le web.  
   On appelle ce procédé du *web scraping*, et il consiste à  
   1. parcourir les pages web avec un *crawler*, aussi couramment appelé *spider* — un bot qui se charge d'explorer les différents liens et récupérer le contenu des pages  
   2. extraire le contenu des pages avec un *scraper*, un bot qui se charge d'extraire les données dans le HTML.

   Packages Python: BeautifulSoup, LXML, MechanicalSoup, Requests, Scrapy, Selenium, Urllib  
   [Exemple BeautifulSoup](https://github.com/a-mt/memlike/blob/master/src/memrise.py#L262)

---

## Formatter les données

Formatter les données (*data wrangling* ou *data munging* en anglais) consiste à transformer les données brutes en format structuré, exploitable pour l'analyse des données.

Pour être exploitables, les données doivent être

1. <ins>structurées</ins>: organisées en lignes et colonnes (cas et caractéristiques)

2. <ins>uniformes</ins>: les valeurs numériques des différentes sources doivent utiliser la même unité (ex: kilo vs pound), et les valeurs catégoriques doivent utiliser le même format (ex: H/F vs actor/actress).

3. <ins>exhaustives</ins>: toutes les valeurs souhaitées sont representées et, idéalement, équilibrées (on a pas des données sur-représentées par rapport aux autres).

   [![](https://i.imgur.com/z6MIrGMm.jpg?1)](https://www.instagram.com/p/B70qA64D1mV/)

4. <ins>uniques</ins>: il n'y a pas de cas dupliqués. Typiquement, des doublons surviennent lorsqu'on combine différents datasets ou qu'on scrape le web. Il est important de comprendre l'origine des doublons car ils peuvent parfois être légitimes. Exemple: si, lors du transfert de la base de données, les données ont été anonymisées (on n'a plus de nom, ID, etc).

5. <ins>précises</ins>: il n'y a pas de valeurs en dehors de l'intervalle autorisé.  
   Exemple: âge > 200

6. <ins>temporelles</ins>: toute variable créée ou mise à jour après la variable prédite est exclue — pour éviter une *fuite de la valeur prédite* (*target leakage*)

   ![](https://i.imgur.com/H58MLQbm.png?1)

   Exemple: on dispose des caractéristiques `take_antibiotic` et `got_pneumonia`. L'analyse des données montre une forte corrélation entre ces deux colonnes. Sauf que `take_antibiotic` est une valeur souvent mise à jour: les patients qui avaient une pneumonie ont reçus des antibiotiques — les patients n'ont pas eu une pneumonie parce qu'ils prenaient des antibiotiques. Si `take_antibiotic` est mise à jour après `got_pneumonia`, il faut l'exclure.

7. <ins>pertinentes</ins>: les caractéristiques collectées répondent-elles au besoin pour lequel elles ont été collectées?  
   Exemple: faut-il prendre en compte l'ethnicité / le sexe pour déterminer la solvabilité des clients d'une banque?

---

## Générer des caractéristiques

Selon le besoin, on peut éventuellement générer des caractéristiques (*feature engineering* ou *feature extraction* en anglais). Ça implique généralement

* des <ins>**interactions**</ins> (combiner deux caractéristiques en une). Exemples:
  * combiner le type d'appareil et l'OS — mobile_android, desktop_linux
  * combiner le pays d'origine et le genre de musique — fr_pop, uk_pop

  <pre lang="python">
  interactions = ks['category'] + "_" + ks['country']
  </pre>

* un <ins>**compteur numérique**</ins>. Exemples:
  * le nombre d'événements provenant d'une même adresse IP au cours des 6 dernières heures
  * le temps écoulé depuis le dernier événement
  * le nombre de fois que l'application a été téléchargée
  * le nombre de commandes passées au cours des 7 derniers jours

  [Notebook: Feature Generation](https://www.kaggle.com/matleonard/feature-generation)

* un <ins>**transcodage**</ins>. Exemples:
  * un code postal en latitude / longitude
  * une valeur numérique en pourcentage
  * l'âge en groupe d'âge (18-25 ans, 26-35 ans, etc)
