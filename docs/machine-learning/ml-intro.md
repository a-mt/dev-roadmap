---
title: Introduction
category: Machine Learning
--

## Intelligence Artificielle

* Une *intelligence artificielle* (*artificial intelligence* en anglais ou AI) est une machine simulant l'intelligence humaine.

* Les humains sont particulièrement bons pour analyser / interpréter les éléments  qui l'entourent, non pas à partir d'arguments logiques mais par intuition — le fruit de l'expérience. Le problème c'est que les humains fatiguent, on ne peut pas demander à un humain d'analyser inlassablement des éléments et d'être toujours aussi performant — être rapide, consistant et ne commettre aucune erreurs d'inattention.

  Effectuer des tâches répétitives, c'est le credo des machines. L'idée est donc d'entrainer des machines à simuler le comportement humain pour qu'elles puissent le faire de manière répétitive pour nous. Par exemple: détecter du contenu inapproprié sur des images, détecter des fraudes, conduire une voiture, etc.

## Machine Learning

* Pour réussir à développer une intelligence artificielle avec un algorithme classique, il faudrait connaître les toutes règles du jeu (quoi faire dans quelles conditions) et développer des flowcharts et if/then complexes.

  Les algorithmes de *machine learning* (ML, ou *apprentissage automatique* en français) changent la donne: on va calculer les règles (un modèle mathématique) directement à partir des données.

* Exemple: On a une liste de patients. On connait leur âge, leur sexe, le motif pour lequel ils ont été admis à l'hôpital et tout un tas d'informations additionnelles issues d'analyses sanguines. On sait également combien de temps il leur a fallu pour se rétablir de leur condition.

  On veut calculer un modèle de type <code>f(X): y = a<sub>1</sub>x<sub>1</sub> + a<sub>2</sub>x<sub>2</sub> + ... + a<sub>n</sub>x<sub>n</sub> + b</code> où, à partir de l'ensemble de données dont on dispose X = {x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>} (dans notre exemple: x<sub>1</sub> représente l'âge, x<sub>2</sub> le sexe, etc), on veut trouver A + b, c'est à dire l'ensemble des poids à accorder aux différentes caractéristiques pour trouver *y* (le temps qu'il aura fallu au patient pour se rétablir).

  Il s'agit d'un exemple classique de régression linéaire, un algorithme de machine learning qui cherche à calculer une fonction linéaire (`f(X) = AX + b`) à partir d'un ensemble de données.

* Plutôt que de se baser sur l'intuition humaine (demander aux médecins la gravité de leur patient et le temps de rémission estimé), on va utiliser un algorithme de machine learning pour faire la même réflexion automatiquement, en se basant sur une approche statistique — à partir des données historiques dont on dispose.

## Types d'algorithmes

On distingue généralement 3 grands types d'algorithmes de machine learning: supervisé, non supervisé et par renforcement.

### Supervisé

* On dispose des données X et y — les caractéristiques et la "bonne réponse" — et on veut pouvoir calculer y à partir de X. Le fait de pouvoir calculer y à partir de X sur des données qu'on connaît déjà va nous permettre de généraliser la fonction sur des données X qu'on a jamais vu auparavant.

  Exemple sans ML: on a à disposition une liste d'étudiants et les notes de ces étudiants aux derniers examens. On veut prédire la note que les étudiants auront au prochain examen. Intuitivement, on sait que les "bons élèves" sont plus susceptibles d'avoir une bonne note. On peut calculer la moyenne ou médiane et ainsi automatiser la prédiction à partir d'un simple calcul qu'on aura nous-même programmé. Pas besoin de machine learning, une simple feuille Excel fait l'affaire.

  Exemple avec ML: on a à disposition une liste d'appartement avec leurs caractéristiques (pays, quartier, nombre de pièces, balcon, jardin, etc) et leur prix. On veut savoir à quel prix les appartements qu'on cherche à vendre sont susceptibles d'être vendus. Quelle caractéristique prendre en compte et quel poid leur donner? Comme la réponse n'est pas évidente, on va utiliser un algorithme de machine learning.

* Les algorithmes supervisés peuvent être utilisés

  * soit pour des <ins>**problèmes de régression**</ins>: trouver une valeur continue — répondre à la question combien.  
    Exemple: trouver le prix d'un appartement à partir de ses caractéristiques

  * soit pour des <ins>**problèmes de classification**</ins>: trouver une valeur discrète — répondre la question quoi (oui/non, bleu/blanc/rouge, etc)  
    Exemple: trouver le nom d'un fruit à partir de ses caractéristiques (couleur, taille, poids, etc)

  ![](https://i.imgur.com/7DGKj4x.jpg)

* Notons que le modèle ne va être bon que sur des données qu'il a été entrainé à reconnaître: si le modèle a été entrainé pour détecter s'il y a un chat dans une image et qu'on lui donne une image tournée à 90°, à moins d'avoir été entrainé à détecter les images avec une rotation à 90°, l'algorithme va échouer. De même, s'il a été entrainé à reconnaître des cercles et des triangles, et qu'on lui donne un carré à reconnaître, le résultat de l'algorithme sera imprédictible. On trouve souvent dans la littérature la notion de "garbage in, garbage out" (de la merde en entrée, de la merde en sortie): le résultat ne sera bon que dans la mesure où les données en entrées sont bonnes.

### Non supervisé

* On dispose des données X (les caractéristiques) et on veut trouver des associations entre ces données — trouver y.

* Les algorithmes non supervisés peuvent être utilisés

  * pour des problèmes de <ins>**regroupement**</ins> (*clustering* en anglais)  
    On a un ensemble de données, on veut identifier des groupes.

    Exemple: on a les caractéristiques de différents fruits, on utilise un algorithme de clustering pour identifier différents groupes — baies, agrumes, fruits exotiques, etc. L'algorithme ne va pas donner de labels, juste des groupes, à vous d'analyser les données pour comprendre pourquoi ces éléments sont dans le même groupe.

    ![](https://i.imgur.com/jq8ZPASm.png) ![](https://i.imgur.com/OpfI7Dim.png)

  * pour <ins>**réduire les dimensions**</ins> (*dimensionality reduction* en anglais)  
    Si vous avez un grand nombre de caractéristiques/dimensions (des milliers), il est difficile de les passer toutes en revue pour identifier celles qui sont pertinentes ou non — c'est ce qu'on appelle la "malédiction de la dimensionalité" (*curse of dimensionality* en anglais).

    On peut utiliser des algorithmes pour supprimer automatiquement les dimensions qui ne sont pas pertinentes — par exemple celles qui on un trop grand nombre de valeurs manquantes, celles qui n'ont aucunes corrélations avec la valeur qu'on cherche à prédire (l'hopital du patient vs la durée de rémission) ou sont trop fortemment correlées à d'autres (l'âge et la date de naissance).

  * pour <ins>**détecter des anomalies**</ins> (*anomaly detection* en anglais)  
    Identifier tout ce qui sort de l'ordinaire.

    Exemple: détecter une attaque DOS à partir des logs, une transaction frauduleuse, un capteur défaillant, etc. Ce type de problème peut être résolu avec un algorithme de classification si on sait par avance à quoi s'attendre, mais si la nature des attaques/erreurs change fréquemment alors un algorithme de classification peut échouer à identifier l'anomalie.

    ![](https://i.imgur.com/hqgwMJ5l.png)

  * pour <ins>**explorer des règles d'association**</ins> (*association rule-mining* en anglais)  
    Détecter les associations et dépendences entre les données.  

    Exemple: âge et année de naissance ont une corrélation de 100%, être informaticien et utiliser adblock de 75%. Ce type d'algorithme est particulièrement utilisé pour créer des recommendations produit de type "les clients qui ont acheté ce produit ont aussi acheté" — ce qu'on appelle une *analyse du panier de la ménagère* (*market basket analysis*).

### Par renforcement

* On connaît le but à atteintre, y, mais on ne sait pas comment y parvenir — on ne connaît pas X.  
  Exemple: comment gagner un jeu, comment conduire une voiture

* L'ordinateur va procéder par essais/erreur pour trouver la meilleure stratégie à appliquer. Pour y parvenir, la machine reçoit une récompense, plus ou moins importante, pour chaque bonne action (gagné des points / gagné la partie) et une pénalité pour chaque mauvaise action (perdu des points / perdu la partie). Le but est de maximiser la récompense totale. Le développeur définit la politique de récompense mais ne donne aucune indication sur la manière de résoudre le jeu. En commençant par des essais totalement aléatoires, et en ajustant sa politique en fonction du score final qu'elle obtient, la machine va apprendre les stratégies à utiliser.

  [![](https://i.imgur.com/n8f1gZpl.jpg)](https://www.instagram.com/p/B_Gl0f3gUj4/)

## Natural Language Processing (NLP)

Le *traitement du langage naturel* (*natural language processing* en anglais ou NLP) est un des domaines d'application de l'intelligence artificielle: la capacité d'un ordinateur à traiter et comprendre le langage humain. Parmis les applications les plus communes du NLP on trouve:

* la <ins>traduction automatique</ins>  
  Comprendre le sens d'un mot en fonction du contexte et comprendre les expressions ("il fait un froid de canard") requiert plus qu'un dictionnaire A = B.

* le <ins>blocage du courrier indésirable</ins>  
  Est-ce qu'il s'agit d'une pub / un scam ou d'un courrier légitime?

* la <ins>détection des émotions</ins>  
  Est-ce que les commentaires des utilisateurs sont plutôt positifs ou négatifs à propos d'un sujet donné?

* l'<ins>extraction d'information</ins>  
  Générer un résumé à partir d'un corpus de texte

* la <ins>réponse à des questions</ins>  
  Poser une question au moteur de recherche plutôt qu'utiliser des mots clés

* la <ins>conversation en language humain</ins>  
  Chatbot

![](https://i.imgur.com/5kAAaYl.png)

## Analyse des données

* L'*analyse des données* (*data analytics* en anglais) consiste à prendre les données dont on dispose et à chercher à en tirer des  conclusions, comme révéler les tendances et liaisons entre ces données.

* Par exemple, en analysant les produits achetés par ses clients, Walmart (chaîne de grande distribution américaine) a constaté que les personnes entre 30 et 35 ans qui achètent des couches pour bébé achètent aussi des bières. Probablement parce qu'avoir des enfants en bas âge est stressant et les gens utilisent la bière pour destresser.

   Le magasin a déplacé le rayon bière à côté du rayon bébé et a constaté une hausse des ventes de couches / bières de 40%. Les gens qui venaient pour des couches ne pensaient pas forcemment aux bières, les gens qui venaient pour des bières ne pensaient pas forcemment aux couches, ou alors ils avaient la flemme de parcourir tout le magasin pour les trouver. C'est l'analyse des données qui a revelé la liaison couche/bière, c'est à l'analyste de faire sens des données (pourquoi et comment).

  Autres exemples: Les sociétés de Ecommerce analysent le traffic d’un site web ou les cycles de navigation pour déterminer quels consommateurs sont plus ou moins enclins à acheter un produit ou un service en fonction de leurs précédents achats ou des pages qu’ils ont consultées. Les banques et les entreprises de cartes de crédit analysent les transactions et les dépenses pour empêcher les fraudes et les usurpations d’identité.

* L'analyse des données peut être un but en soit: formuler et valider des hypothèses. Ou elle peut être une étape préliminaire avant de développer un modèle de machine learning: rien ne sert de chercher `y = AX + b` si X et y ne sont pas corrélés, les données dont on dispose ne permettent pas de trouver la réponse qu'on cherche.

## Data Science

* La *science des données* (*data science* en anglais) est un terme assez générique qui désigne l'ensemble des méthodes pour analyser et manipuler les données. Le machine learning est un des outils dans l'arsenal data science, les statistiques et feuilles Excel aussi.

  ![](https://i.imgur.com/kI6wqMH.jpg)

## Big Data

* Les données sont au coeur du data science et du machine learning. Plus on a de données, plus on va pouvoir prendre une approche probabiliste et généraliser les données historiques à une règle qu'on pourra appliquer sur de nouvelles données.

  Le terme *big data* (*données volumineuses* en français) désigne le fait qu'on a affaire à une quantité importante de données, tellement importante qu'on ne peut pas utiliser des outils classiques pour les manipuler. Par exemple, Amazon génère 8To de données tous les jours. Le fait d'avoir autant de données représente un challenge en soit pour les traiter, on ne peut pas simplement ouvrir un fichier pour regarder son contenu. Pour les traiter, on va utiliser des outils spécialisés — typiquement [Hadoop](../hadoop.md).

  [![](https://i.imgur.com/fIz93oF.jpg)](https://www.instagram.com/p/B0vOpiYAz-v/)

## Data Lake

* Un *data warehouse* (*entrepot de données* en français) est l'ensemble des données qu'une entreprise possède en format structuré, typiquement stockées dans des bases de données. Par exemple: la liste des fournisseurs, les stocks ou encore les commandes clients sont a priori des données structurées.

* Un *data lake* (*lac de données* en français) est l'ensemble des données qu'une entreprise en format brut. Par exemple: les logs, les mails ou encore les recherches utilisateurs sont des données non-structurées.

  ![](https://i.imgur.com/W1PhAXK.jpg)

## Data Mining

L'*extraction de connaissances* (*data mining* en anglais) consiste à chercher des informations utiles parmis les données dont on dispose. Contrairement à l'analyse traditionnelle, le data mining ne s'occupe pas de collecter des données de manière efficace (sondages, base de données, etc), mais à exploiter ce qu'on a. La méthaphore "extraction" (exploitation minière) sous entend qu'il y a des pépites cachés sous des montagnes de données. Le data mining implique d'extraire, nettoyer, transformer, modeler les données avec des algorithmes de machine learning et visualiser les données.

## Métiers du Machine Learning

![](https://i.imgur.com/bZoyX9E.jpg)

* <ins>**Data Analyst**</ins>  
  Un analyste utilise les données pour créer des rapports et répondre à des questions business.

  * SQL
  * Python ou R
  * Tableau ou Excel

* <ins>**Data Scientist**</ins>  
  Un data scientist a un rôle similaire à celui de l'analyste mais a des connaissance en matière de machine learning, ce qui lui permet de répondre à des questions plus complexes et utiliser davantage de données.

  * SQL
  * Python ou R
  * Tableau ou Excel
  * Scikit-Learn, TensorFlow, Pytorch, NumPy, etc
  * Git, Jupyter Notebook

* <ins>**Machine Learning Engineer**</ins>  
  Un ingénieur en ML se concentre généralement sur la mise en oeuvre et le déploiement de modèles. Il ne se concentre pas tant sur la création de rapports mais davantage sur la création d'applications et leur mise en production.

  * Scikit-Learn, TensorFlow, Pytorch, NumPy, etc
  * SQL
  * Python, Java, C++
  * AWS, GCP, Azure
  * Git, Jupyter Notebook

* <ins>**Software Engineer**</ins>  
  Un développeur ne travaille pas vraiment sur des modèles, mais sur la création et déploiement d'applications alimentées par des modèles de machine learning — via web service.

  * SQL
  * Python, Java, C++
  * AWS, GCP, Azure
  * Git, Jupyter Notebook

* <ins>**Machine Learning Researcher**</ins>  
  Un chercheur en ML se concentre sur l'apprentissage des algorithmes, l'expérimentation, l'optimisation et parfois le déploiement. Un chercheur est généralement spécialisé dans un domaine en particulier — ex NLP, systèmes de recommendations, reconnaissance vocale, etc.

  * Scikit-Learn, TensorFlow, Pytorch, NumPy, etc
  * SQL
  * Git, Jupyter Notebook
  * Articles, conférences, compétitions, recherches

## Conventions de nommage

* <ins>**Ensemble de données**</ins>:  
  L'ensemble des données dont on dispose (*dataset* en anglais, aussi dit *variables* ou *features*). Un algorithme de machine learning requiert que l'ensemble de données soit dans un format structuré.

* <ins>**Modèle**</ins>:  
  Un modèle est généralement une équation algorithmique permettant de produire les données en sortie (y) en fonction des données en entrées (X). Le but du machine learning est de trouver un modèle performant (trouver f), pour pouvoir appeler `f(X) = y` de manière répétitive dans la vraie vie.  
  De manière plus large, un modèle est une méthode permettant de transformer des données dans un état à un autre état — par exemple pour grouper les données qui se ressemblent.

* <ins>**Cas / caractéristiques**</ins>:  
  Dans le cas de données structurées, on dispose d'un ensemble
  * de *caractéristiques* (*features* en anglais, parfois appelées *variables* ou *attributs*)
  * et de *cas* (*unités*, *n-upplet*, *observations*, *samples*).

  Les caractéristiques {X, y} sont les propriétés des différents cas.
  Par convention, les caractéristiques sont toujours disposées en colonnes et les cas en lignes.

  ![](https://i.imgur.com/hbKdzlB.png)

* <ins>**Variable dépendante / indépendante** (DV/IDV)</ins>:  
  Les variables dépendantes sont des variables calculées en fonction de variables indépendantes. Dans `y = ax`, `x` est une variable indépendante et `y` est une variable dépendante de x.

* <ins>**Entrées / sorties**</ins>:  
  Les données en entrée (*inputs* en anglais, *attributes*, *predictor*, *descriptor*, *covariates* ou *X*) sont des variables indépendantes.

  Les données en sortie (*outputs* en anglais, *outcome*, *Critical To Quality [CTQ]*, *target*, *label* ou *y*) sont des variables dépendantes des entrées.

  * Dans le cas de machine learning supervisé, le dataset contient des entrées et des sorties (X, y).
  * Dans le cas de machine learning non supervisé, on a que des entrées (X).
  * Dans le cas de machine learning par renforcement, on a que des sorties (y).

* <ins>**Vecteurs & matrices**</ins>  
  Un *vecteur* est un ensemble de *1×n* données.  
  Une *matrice* est un ensemble de *m×n* données.

  Généralement, *n* désigne le nombre de lignes et *m* le nombre de colonnes. Et on note généralement les matrices avec une lettre majuscule et les vecteurs avec une lettre minuscule:
  * X = l'ensemble des données en entrée
  * x<sub>1</sub> = la première colonne
  * x<sup>1</sup> = la première ligne
  * x<sub>j</sub><sup>i</sup> = la j-ème colonne de la i-ème ligne

  [![](https://i.imgur.com/LLjcIoj.jpg)](https://www.instagram.com/p/B8akKL4AhoU/)

* <ins>**Type de données**</ins>  
  On distingue deux types de données: numériques et catégoriques.

  1. Les <ins>**données numériques**</ins> (aussi appelé *données quantitatives*), sont basées sur des nombres. On peut sous-diviser les données numériques en deux:

     * <ins>**Valeurs discrètes**</ins>: ce sont des valeurs entières.  
       Typiquement une valeur discrète est un compteur: nombre de personnes, nombre d'erreurs, âge, etc.

     * <ins>**Valeurs continues**</ins>: ce sont des valeurs réelles.   
       Le nombre de valeur entre deux bornes est infini, puisqu'on peut toujours ajouter des décimales.   
       Exemple: poids, distance, température, etc.

     Notons que pour des valeurs numériques, il est important de connaître l'unité pour tirer des conclusions — minute/heure, kilo/pound, celsius/fahrenheit, etc.

     ![](https://i.imgur.com/34FT1Sp.png)

  2. Les <ins>**données catégoriques**</ins> (aussi appelé *données qualitatives* ou *classes*), sont basées sur des labels. On peut sous-diviser les données catégories en trois:

     * <ins>**Valeurs ordinales**</ins>: il existe un ordre logique entre elles.  
       Exemple: bon/acceptable/critique/rejeté

     * <ins>**Valeurs binaires**</ins>: il n'y a que deux options possibles.  
       Exemple: mâle/femelle, oui/non, réussite/échec

     * <ins>**Valeurs nominales**</ins>: les valeurs n'ont pas d'ordre, ce ne sont que des labels.  
       Exemple: france/UK/USA

     Notons qu'on peut très bien avoir des nombres comme valeurs catégoriques: 1,2,3 dans la catégorie "Numéro machine". Ces valeurs sont catégoriques (ordinales) parce qu'elles n'ont pas une signification numérique: on aurait pu choisir d'appeler les différentes machines Alice, Bob et Carole à la place.

     ![](https://i.imgur.com/YL2gdlQ.png)

  <ins>Pourquoi faire la distinction entre numérique et catégorique</ins>?

  1. Les données numériques contiennent plus d'informations que les données catégoriques (ex: -18/+18 vs âge).  
     Conséquence: pour des données catégoriques, on a besoin de plus d'observations pour tirer des conclusions. En règle générale, on considère que pour observer une tendance il faut minimum 30 observations pour des données numériques et minimum 300 pour des données catégoriques.

     ![](https://i.imgur.com/p83Ox6k.png)

  2. Le type de données utilisé détermine l'outil utilisé. On ne peut pas utiliser le même type de graphique ni utiliser les mêmes algorithmes pour des données numériques et des données catégoriques.

## Workflow d'un projet

Typiquement, un projet de Machine Learning / Data Science suit le cycle de vie "CRISP-DM" (Cross Industry Standard Process for Data Mining):

1. Formuler le problème
2. Collecter et formatter les données
3. Préparer et analyser les données
4. Construire un modèle
5. Évaluer et optimiser les performances
6. Déployer

Les différentes étapes sont présentées séquentiellement — de 1 à 6, du problème au déploiement — mais en réalité le développement en machine learning n'est pas linéaire: on évalue le modèle, on change les caractéristiques, on acquiert plus de données, on change les hyperparamètres. Le processus est entièrement entremelé.

![](https://i.imgur.com/RhZPa2s.png)
