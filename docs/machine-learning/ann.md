---
title: Artificial Neural Network
category: Machine learning, algo
latex: true
---

## Le modèle du cerveau

* Les réseaux neuronaux articifiels sont basés sur notre compréhension du cerveau: un neurone est un corps cellullaire relié à d'autres corps cellulaires via des nerfs. Chaque corps cellulaire reçoit des signaux électriques de différentes forces via les dendrites (entrées), traite ces signaux, puis envoie un signal électrique via l'axone (sortie) — à dire vrai, le neurone n'envoie de signal que s'il est activé, ce qui se produit s'il y a un nombre suffisant de signaux en entrées. Tous les neurones reliés au neurone vont alors recevoir le signal, le traiter, et ainsi de suite.

  À un niveau simple, on peut considérer qu'un neurone est une unité de calcul, qui prend différentes valeurs en entrée, traite ces valeurs, et retourne une sortie.

  ![](https://i.imgur.com/abIHtIwm.jpg)

* Dans le cortex, les neurones semblent être disposés en piles (colonnes corticales), qui traitent l'information en parallèle. Chacune de ces "hyper-colonnes" est consituée de "mini-colonnes" d'environ 100 neurones. Il y a environ 100 millions de ces mini-colonnes dans le cortex.

  Cette architecture est similaire à celle d'une carte graphique (GPU) — elle est constituée d'un ensemble d'unité de traitement, responsables de calculer un ensemble de pixels sur l'écran. Ces mêmes cartes graphiques, utilisée pour jouer aux jeux vidéos, peuvent être utilisées pour exécuter des réseaux neuronaux artificiels — et ce beaucoup plus rapidement qu'avec un CPU.

  ![](https://i.imgur.com/XxBZfmr.png)

* Dans un réseau neuronal artificiel, on parle de neurone ou d'*unité*.  
  Ces unités sont représentées sous forme de noeuds sur un graphique.

---

## McCulloch-Pitts (MCP) Neuron

* En 1943, McCulloch & Pitts proposent le premier modèle mathématique du neurone artificiel:

  * N entrées binaires excitatoires, x<sub>i</sub> &in; {0,1}
  * M entrées binaires inhibitoires, x<sub>n+j</sub> &in; {0,1}
  * Un seuil Θ
  * Une sortie binaire, y &in; {0,1}

  $$
  f(x) = \begin{cases}
  1 & \text{si } \sum_{i=1}^N x_i > \Theta \text{ et } \sum_{j=N}^M x_j = 0 \\
  0 & \text{sinon}
  \end{cases}
  $$

* Les entrées sont booléennes et la sortie est également booléenne. On peut donc considérer que le neurone MCP est juste une fonction booléenne.

  ![](https://i.imgur.com/fLmx59Zl.png?1)
  ![](https://i.imgur.com/XiIuuyxl.png?1)
  ![](https://i.imgur.com/Ziri6gK.png?1)

  Pour des opérations booléennes plus complexes, on peut assembler différents neurones les uns à la suite des autres.

  ![](https://i.imgur.com/CJzDMqB.gif)

[McCulloch-Pitts Neuron — Mankind’s First Mathematical Model Of A Biological Neuron](https://towardsdatascience.com/mcculloch-pitts-model-5fdf65ac5dd1)  
[Some specific models of artificial neural nets ](http://ecee.colorado.edu/~ecen4831/lectures/NNet2.html)

---

## Linear Threshold Unit (LTU)

* Un LTU s'appuie sur la même idée que le neurone MCP mais attribue des poids aux différentes entrées plutôt que de désigner des entrées excitatoires et inhibitoires

  $$
  f(x) = \begin{cases}
  1 & \text{si } w \cdot x + b > 0 \\
  0 & \text{sinon}
  \end{cases}
  $$

* L'entrée x<sub>0</sub> vaudra toujours -1, ce qui nous permet de définir le seuil en même temps que le reste des poids (w<sub>0</sub> sera le seuil).

  $$
  \begin{aligned}
  w_0 x_0 + w_1 x_1 + \cdots + w_n x_n &= 0 \\
  -w_0 + w_1 x_1 + \cdots + w_n x_n &= 0 \\
  w_1 x_1 + \cdots + w_n x_n &= w_0
  \end{aligned}
  $$

  ![](https://i.imgur.com/xAha8dx.png)

* Les entrées ne sont plus limitées à des valeurs booléennes mais acceptent des valeurs réelles. Les poids (y compris le seuil) peuvent également être des valeurs réelles.

  ![](https://i.imgur.com/itGxJXy.png)

## Perceptron

* En 1958, Frank Rosenblatt invente le *Perceptron*:

  1. il démontre qu'on peut modifier le neurone MCP en LTU — c'est à dire utiliser des valeurs réelles et non plus binaires en entrée.

  2. il met au moint un algorithme simple pour apprendre les poids corrects (y compris le seuil) à partir de données d'entraînement. Notons qu'ici on calcule le bias indépendemment, mais on aurait pu ajouter une caractéristique -1 à X.

     ![](https://i.imgur.com/s9abXxL.png)

     [Convergence Proof for the Perceptron Algorithm](http://www.cs.columbia.edu/~mcollins/courses/6998-2012/notes/perc.converge.pdf)

[Perceptron.ipynb](notebooks/Perceptron.html)

---

## Adaptive Linear Neuron (ADALINE)

* Le perceptron reste limité aux problèmes linéairement séparables: une donnée mal classifiée empêche le modèle de converger.

  ![](https://i.imgur.com/Nw9Uy7U.png)

  ![](https://i.imgur.com/San8qPH.gif)

* En 1959, Ted Hoff introduit Adaline: pour mettre à jour les poids, on va quantifier l'erreur avec la somme des erreurs au carré

  $$
  \text{Fonction coût} \\
  L(w,b) = \frac{1}{2} \sum_{i=1}^n (y_i - \phi(w^T x_i + b))^2
  $$

  Et puisqu'on cherche à minimiser cette erreur, on met à jour les poids proportionnellement à la derivée de la fonction coût

  $$
  \text{Dérivée fonction coût} \\
  \begin{aligned}
  \frac{\partial L}{\partial w} &= \sum_{i=1}^n (w^T x_i + b - y_i) x_i \\

  \frac{\partial L}{\partial b} &= \sum_{i=1}^n w^T x_i + b - y_i
  \end{aligned}
  $$

  $$
  \text{Mise à jour des poids} \\
  w = w - \alpha \frac{\partial L}{\partial w} \\

  b = b - \alpha \frac{\partial L}{\partial b}
  $$

  ... il s'agit donc du gradient descent — déjà vu dans la partie Régression Linéaire.

---

## Architecture du neurone

On a désormais l'architecture d'un neurone telle qu'elle existe aujourd'hui:

1. Des entrées

2. Une fonction qui effectue la somme des entrées pondérées par leur poids (&sum;<sub>p</sub> = w ⋅ x + b)

3. Une fonction d'activation, qui convertit la somme pondérée en sortie.  
   La fonction d'activation utilisée jusqu'à présent est appelée *heaviside step function* (0 si &sum;<sub>p</sub> <= 0, 1 sinon)  

4. Une fonction coût, dont on calculera la dérivée pour minimiser l'erreur.  
   La fonction coût utilisée dans Adaline est l'erreur carrée (&sum;(y&#x305; - y)²)

5. Un optimiseur, algorithme utilisé pour minimiser la fonction coût.  
  L'optimiseur utilisé jusqu'à présent est gradient descent.

![](https://i.imgur.com/w0felRW.png)

---

## Artificial neural network (ANN)

### Layers

* Ne reste plus qu'un pas pour créer un réseau neuronal: relier plusieurs neurones entre eux.  
  Les entrées vont être données à différents neurones et les sorties de ces neurones vont devenir les entrées d'autres neurones.

  ![](https://i.imgur.com/Pnh51dI.png)

* La première *couche* (*layer* en anglais) du réseau neuronal est l'ensemble des entrées: *input layer*.  
  La dernière couche est l'ensemble des sorties: *output layer*.  
  Entre les deux, les couches sont dites cachées, puisqu'on ne voit jamais leurs sorties directement: *hidden layers*.

  Quand l'ensemble des neurones d'une couche prennent les mêmes entrées (c'est à dire quand toutes les sorties de la couche précédente sont prises comme entrées pour chaque neurone) alors la couche est dite *dense* — c'est le cas pour l'ensemble des couches dans l'image ci-dessus.

* La fonction d'activation des neurones est non linéaire, et c'est ce qui crée la complexité du réseau neuronal.

  $$
  \text{Equation avec fonction d'activation} \\
  Y = f(W3 \cdot f(W2 \cdot f(W1 \cdot X + B1) + B2) + B3) \\[10pt]

  \text{Equation sans fonction d'activation} \\
  \begin{aligned}
  Y &= W3 \cdot W2 \cdot W1 \cdot X + B1 + B2 + B3 \\
    &= W \cdot X + B
  \end{aligned}
  $$

* Un réseau neuronal ayant qu'une couche cachée est dit superficiel (*shallow* en anglais), tandis un réseau neuronal ayant deux couches cachées ou plus est dit profond (*deep* en anglais).  
  Les réseaux neuronaux profonds vont pouvoir apprendre des règles complexes pour résoudre des problèmes complexes. On parle d'*apprentissage profond* (*deep learning* en anglais).

  ![](https://i.imgur.com/e6BP8XU.png)

### Forward & back propagation

* Comment apprendre les poids des différentes liaisons?  
  Première étape, les initialiser aléatoirement. Les liaisons doivent avoir des poids différents, autrement tous les neurones font tous la même chose et ajustent leurs poids de la même manière — ils n'apprennent pas.  
  Deuxième étape, mettre à jour les poids intelligemment pour minimiser les erreurs.

  ![](https://i.imgur.com/HxwDweI.png)

  On utilise la règle de dérivation en chaîne (*chain rule*) en partant de la droite — de la couche en sortie vers la couche en entrée:

  * a<sub>0</sub> est faux parce que le passage de ah<sub>11</sub> à a<sub>0</sub> est faux.  
    On calcule de combien w<sub>20</sub> contribue à l'erreur et on met à jour sa valeur proportionnellement.

    $$
    \begin{aligned}
    w_{20} &= w_{20} - \alpha \frac{d L}{d w_{20}} \\
    &= w_{20} - \alpha \frac{d L}{d a_0} \times \frac{d a_0}{d w_{20}}
    \end{aligned}
    $$

  * w<sub>21</sub> contribue également à l'erreur.  
    On va donc mettre à jour sa valeur sur le même principe.

    $$
    \begin{aligned}
    w_{21} &= w_{21} - \alpha \frac{d L}{d a_0} \times \frac{d a_0}{d w_{21}}
    \end{aligned}
    $$

  * Avant ça, ah<sub>11</sub> était faux parce que le passage de ah<sub>21</sub> à ah<sub>11</sub> était faux.  
    On va ajuster les poids en prenant en compte les erreurs provenant de toutes les directions possibles pour le neurone.

    $$
    \begin{aligned}
    w_{10} &= w_{10} - \alpha \frac{dL}{w_{10}} \\[10pt]

    \frac{dL}{w_{10}} &= \frac{dL}{a_0} \frac{a_0}{ah_{11}} \frac{ah_{11}}{w_{10}} \\

     &+ \frac{dL}{a_0} \frac{a_0}{ah_{12}} \frac{ah_{12}}{w_{14}}
    \end{aligned}
    $$

* Parcourir le réseau neuronal de gauche à droite (entrées &rarr; sorties), c'est à dire calculer la résultat de chacune des fonctions d'activation, est appelé *forward propagation*.  

  Parcourir le réseau neuronal de droite à gauche (sorties &rarr; entrées), c'est à dire ajuster les poids de chacune des liaisons, est appelé *backward propagation*.

### Initialisation des poids

Lors de l'initialisation, les poids doivent
1. Avoir une petite valeur
2. Avoir une valeur différente des autres poids
3. Avoir un bon niveau de variance

Il existe différentes manières d'initialiser les poids:

* <ins>Distribution uniforme</ins>  
  Les poids sont initialisés avec une distribution uniforme, entre -1/&radic;n_in et 1/&radic;n_in — où n_in est le nombre d'entrées.

  $$
  W_{ij} \thicksim \text{Uniform} \left[
  \frac{-1}{\sqrt{\text{n_in}}}, \frac{1}{\sqrt{\text{n_in}}}
  \right]
  $$

* <ins>Xavier/Gorat</ins>  
  Quand on utilise sigmoid pour fonction d'activation

  * Si les données en entrée suivent une distribution normale:  
    Les poids sont initialisés avec une distribution normale, avec une moyenne de 0 et un écart-type de &radic;(2/(n_in+n_out)) — où n_in est le nombre d'entrées et n_out le nombre de sorties.

    $$
    W_{ij} \thicksim \text{Normal} \left(
    0, \sqrt{\frac{2}{\text{n_in + n_out}}}
    \right)
    $$

  * Si les données en entrée suivent une distribution uniforme:  
    Les poids sont initialisés avec une distribution uniforme, entre -&radic;6/&radic;(n_in + n_out) et +...

    $$
    W_{ij} \thicksim \text{Uniform} \left[
    \frac{-\sqrt{6}}{\sqrt{\text{n_in + n_out}}}, \frac{\sqrt{6}}{\sqrt{\text{n_in + n_out}}}
    \right]
    $$

* <ins>He init</ins>  
  Quand on utilise relu pour fonction d'activation

  * Si les données en entrée suivent une distribution normale:  
    Les poids sont initialisés avec une distribution normale, avec une moyenne de 0 et un écart-type de &radic;(2/n_in)

    $$
    W_{ij} \thicksim \text{Normal} \left(
    0, \sqrt{\frac{2}{\text{n_in}}}
    \right)
    $$

  * Si les données en entrée suivent une distribution uniforme:  
    Les poids sont initialisés avec une distribution uniforme, entre -&radic;6/&radic;n_in et +...

    $$
    W_{ij} \thicksim \text{Uniform} \left[
    \frac{-\sqrt{6}}{\sqrt{\text{n_in }}}, \frac{\sqrt{6}}{\sqrt{\text{n_in}}}
    \right]
    $$

### Settings

* On peut ajuster les différentes parties du réseau neuronal:
  * [Fonctions d'activation](ml-activation-fct.md)
  * [Fonctions coût](ml-cost-fct.md)
  * [Optimiseur](ml-optimizer.md)

* En utilisant un framework, tel que Keras, il suffit d'indiquer l'architecture du réseau neuronal qu'on veut:

  ``` python
  from tensorflow import keras
  from tensorflow.keras import layers

  # Define architecture
  model = keras.Sequential([
      layers.Dense(units=4, activation='relu', input_shape=[2]),
      layers.Dense(units=3, activation='relu'),
      layers.Dense(units=1),
  ])

  # Define optimizer
  model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
  )

  # Train
  r = model.fit(
    X_train, y_train,
    validation_data=(X_test, y_test),
    batch_size=256,
    epochs=100
  )

  # Check convergence
  df_history = pd.DataFrame(r.history)
  df_history.loc[:, ['loss', 'val_loss']].plot()
  ```

  NB une manière habituelle de définir chaque couche est d'utiliser des paramètres comme `activation="relu"` mais on peut séparer les différentes parties dans leur propre couche:

  ``` python
  model = keras.models.Sequential([
    layers.Input(shape=(D,)),
    layers.Dense(1)
    layers.Activation('relu')
  ])
  ```

---

## Optimisation des performances

### Exploding & vanishing gradients

* Des années 1980 à 1995, on utilisait la fonction sigmoid comme fonction d'activation pour toutes les couches.  
  Or la dérivée de sigmoid est très petite (valeur max: 0.25). Conséquence: lors de la backpropagation, lorsqu'on calcule la dérivée via dérivation en chaîne, on multiplie des valeurs très petites par des valeurs très petites: au final les dérivées deviennent si petites qu'on ne met plus à jour les poids. C'est un problème de *vanishing gradient* (dérivées qui disparaissent en français). Pour l'éviter: utiliser relu ou leaky relu pour les couches cachées.

  ![](https://i.imgur.com/HyON91h.png)

  ![](https://i.imgur.com/wgYzJsy.png)

* Inversemment, si les dérivées sont grandes, on multiplie de grandes valeurs avec de grande valeurs: au final les dérivées deviennent si grandes qu'il devient impossible de les utiliser (valeur inf ou NaN). C'est un problème d'*exploding gradient* (dérivées qui explosent en français). Pour l'éviter: normaliser les données.

* Exploding gradients are a problem where large error gradients accumulate and result in very large up dates to neural network model weights during training. At an extreme, the values of weights can become so large as to overflow and result in NaN values. This has the effect of your model being unstable and unable to learn from your training data.

### Capacité

* Décider de l'architecture ne va pas de soi, mais est le résultat d'un processus: on commence simplement, on évalue les résultats, on modifie l'architecture et on vérifie si on va dans le bon sens. On continue d'expérimenter jusqu'à atteindre une performance jugée acceptable.

* La *capacité* d'un modèle fait référence à la taille et complexité des motifs que le modèle est capable d'apprendre. Pour un réseau neuronal, la capacité du modèle est largement déterminée par le nombre de neurones qu'il possède et la façon dont ils sont connectés entre eux.

  On commence généralement par un modèle relativement simple et, si le réseau neuronal ne semble pas parvenir à apprendre les données (*underfitting*), on augmente sa capacité

  * soit en l'élargissant — en ajoutant des unités aux couches existantes  
    Les réseaux plus larges ont plus de facilité à apprendre des relations linéaires

  * soit en l'approfondissant — en ajoutant des couches supplémentes  
    Les réseaux plus profonds ont plus de facilité à apprendre des relations non linéaires.

  La meilleure solution dépend simplement de l'ensemble de données.

### Batch Normalization

* Si on commence généralement par normaliser les données avant d'entraîner le modèle, au sein du réseau neuronal, le résultat de la fonction d'activation n'aura plus la même distribution: les données deviennent sont de moins en moins normalisées pour les couches qui suivent.

  On peut ajouter une couche de normalisation, dit *batch normalization*, pour normaliser les données batch par batch entre deux couches.

* Les modèles avec batchnorm ont tendance à nécessiter moins d'epochs pour converger. Ça peut également aider lorsque le modèle ne parvient plus à apprendre (*underfit*).

  <details>
  <summary>python</summary>

  <pre lang="python">
  # Après activation
  layers.Dense(16, activation='relu'),
  layers.BatchNormalization(),
  </pre>

  <pre lang="python">
  # Ou après somme pondérée
  layers.Dense(16),
  layers.BatchNormalization(),
  layers.Activation('relu'),
  </pre>
  </details>

### Early Stopping

* On peut détecter lorsque le modèle se met à apprendre du bruit et non plus du signal (*overfitting*): le coût continue de diminuer sur les données d'entraînement et non sur les données de validation. Pour éviter que le modèle soit sur-ajusté, on peut simplement arrêter de l'entraîner dès que ça se produit.

  ![](https://i.imgur.com/WIoWpsI.png)

* On peut par exemple définir un nombre d'epochs inutilement large et, s'il n'y a pas eu  une améloration d'au moins 0.001 sur les données de validation sur les 20 dernières epochs, stopper l'entraînement. C'est ce qu'on appelle un *arrêt anticipé* (*early stopping* en anglais)

  <details>
  <summary>python</summary>

  <pre lang="python">
  from tensorflow.keras.callbacks import EarlyStopping

  early_stopping = EarlyStopping(
      min_delta=0.001,            # minimium amount of change to count as an improvement
      patience=20,                # how many epochs to wait before stopping
      restore_best_weights=True,
  )

  history = model.fit(
      X_train, y_train,
      validation_data=(X_valid, y_valid),
      batch_size=256,
      epochs=500,
      callbacks=[early_stopping], # put your callbacks in a list
      verbose=0,                  # turn off training log
  )
  </pre>
  </details>

### Dropout

* Une autre manière d'éviter que le modèle ne deviennent sur-ajusté (*overfit*) est d'ajouter une couche de *dropout*, une couche qui ne contient pas de neurones à proprement parler mais ajoute une fonctionnalité supplémentaire: nullifier aléatoirement certains poids. Ça force le modèle a ne pas trop s'appuyer sur certains poids plutôt que d'autres. Le modèle qui en résulte a tendance à apprendre plus uniformément, à ne pas donner trop d'importance à des variations aléatoires.

* Si le modèle semble très sur-ajusté, on peut ajouter un dropout important (ex 0.7/0.8), sinon réduire le seuil (ex 0.2). Un dropout de 0.5 désactive aléatoirement 50% des neurones de la couche précédente.

  ![](https://i.imgur.com/GqGVHnt.gif)

  <details>
  <summary>python</summary>
  <pre lang="python">
  model = keras.Sequential([
      layers.Dense(1024, activation='relu', input_shape=[11]),
      layers.Dropout(0.3),  # apply 30% dropout to the next layer
      layers.BatchNormalization(),
      layers.Dense(1024, activation='relu'),
      layers.Dropout(0.3),
      layers.BatchNormalization(),
      layers.Dense(1024, activation='relu'),
      layers.Dropout(0.3),
      layers.BatchNormalization(),
      layers.Dense(1),
  ])
  </pre>
  </details>

### Transfer learning

* Il s'agit d'une technique qui consiste à utiliser un modèle entraîné sur un autre ensemble de données comme point de départ pour l'entraînement — plutôt que de recommencer à apprendre les poids à partir de rien.

  L'*apprentissage par transfert* (*transfer learning* en anglais) permet d'accélérer l'entraînement et l'optimisation du modèle. On obtient généralement de meilleures performances avec cette approche.

* Il existe des bibliothèques de modèle pré-entraînés pour divers problèmes, disponibles en ligne, appelés *zoos de modèles* (models zoos).
