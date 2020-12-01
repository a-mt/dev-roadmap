---
title: Word embeddings
category: Machine Learning, NLP
latex: true
---

## Qu'est-ce que c'est

* Dans le cas de one-hot encoding, les vecteurs ne portent pas de signification particulière: "chat" est aussi similaire à "chien" que "giraffe" — puisque la différence numérique est la même.

* *Word embeddings* consiste à encoder les mots sous forme de vecteur, où les mots similaires auront un vecteur similaire — il suffit de calculer la différence entre les vecteurs pour savoir à quel point deux mots sont similaires ou non.

  ```
  cosine(glove_vectors.wv['cat'], glove_vectors.wv['dog'])     # 0.04091787338256836
  cosine(glove_vectors.wv['cat'], glove_vectors.wv['coffee'])  # 0.24331796169281006
  ```

* Il existe [différentes manières](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cdist.html) de calculer la différence entre deux vecteurs. Les plus populaires étant:

  1. <ins>Distance Manhattan</ins> (ou *city block distance*)  
     Consiste à sommer les différences entre chaque dimension du vecteur. Par exemple la distance entre les vecteurs [1,2,3] et [2,4,6] sera:

          manhattan distance = ∣1−2∣ + ∣2−4∣ + ∣3−6∣ = 1 + 2 + 3 = 6

  2. <ins>Distance Euclidienne</ins> (ou *straight line distance*)    
     Consiste à sommer les différences au carré entre chaque dimension du vecteur puis calculer la racine carrée du résultat:

          euclidean distance = √{(1−2)^2 + (2−4)^2 + (3−6)^2}
                             = √{14} ≈ 3.74

  3. <ins>Distance Cosinus</ins>  
     Consiste à calculer l'angle entre deux vecteurs plutôt que la distance entre les points du vecteur. Deux vecteurs dans la même direction ont un angle de 0, deux vecteurs dans la direction opposée ont une distance de 1.

      ```
      cosine_similarity = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
      cosine_distance   = 1 - cosine_similarity
      ```

* Quand on travaille avec de grands vecteurs, les distances Manhattan et Euclidienne peuvent devenir importantes, tandis que la distance Cosinus sera toujours entre 0 et 1. C'est la raison pour laquelle, dans le cas des words embeddings, on utilise généralement la distance cosinus plutôt qu'une autre métrique pour comparer les vecteurs.

---

## Comment les calculer

* Différents algorithmes ont été mis au point par différentes équipes de chercheurs pour calculer des words embeddings. Tous reposent sur une idée principale: que les mots similaires ont tendance à se trouver dans des contextes similaires. Par exemple:

  <pre>
  J'ai un <ins>garçon</ins> de 3 ans.  
  J'ai un <ins>fils</ins> de 3 ans.  
  </pre>

  Les mots "garçon" et "fils" auront des vecteurs similaires puisqu'on les trouve dans des contextes similaires. De même, on trouve souvent les mots "chien" et "chat" dans le même contexte mais rarement avec "giraffe": "chien" sera plus similaire à "chat" que "giraffe".

* [Word2Vec](https://code.google.com/archive/p/word2vec/):  
  Word2vec est un algorithme mis au point en 2013 par l'équipe de Google — Tomas Mikolov, Kai Chen, Greg Corrado et Jefrrey Dean.  
  Ils ont publié un modèle pré-entrainé, avec des word embeddings de 300 dimensions, entrainé sur 3 million de mots du corpus de Google News.  
  C'est le modèle/algorithme le plus populaire.

* [Global Vectors for word representation [GloVe]](https://nlp.stanford.edu/projects/glove/):  
  A été mis au point en 2014 par l'équipe de  Stanford — Jeffrey Pennington, Richard Socher et Chris Manning.  
  Ils ont publié divers modèles pré-entrainés, de 25, 50, 100, 200 et 300 dimensions, basés sur 2, 6, 42 et 840 milliards de mots.

* [fastText](https://fasttext.cc/):  
  A été mis au point en 2017 par l'équipe de Facebook.  
  Ils ont publié 3 modèles de 300 dimensions.

---

## Word2vec

Word2vec est décrit dans le papier [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/pdf/1301.3781.pdf).

1. Convertir le corpus en liste de tokens.  
   Par exemple avec le corpus suivant:

    ``` txt
    [
        "I want a glass of orange juice",
        "You want a glass of apple juice"
    ]
    ```

   On garde:

    ``` txt
    [
        ["i", "want", "a", "glass", "of", "orange", "juice"],
        ["you", "want", "a", "glass", "of", "apple", "juice"]
    ]
    ```

3. Récupérer le vocabulaire du corpus:

    ``` txt
    ["a", "apple", "glass", "i", "juice", "of", "orange", "want", "you"]
    ```

   Les index de cette liste serviront de base pour encoder les mots du corpus (one-hot encoding). Si le corpus contient *V* mots de vocabulaire, chaque vecteur encodé sera de dimension 1×V. Par exemple, le mot "a", qui est le premier dans la liste, sera encodé O<sub>1</sub> = [1,0,0,0,0,0,0,0,0]. Le mot "apple", qui est en deuxième, sera O<sub>2</sub> = [0,1,0,0,0,0,0,0,0]. Etc.

4. Choisir une taille de fenêtre, *C*, pour extraire des ensembles de mots du corpus.  
   En pratique, on choisit généralement une fenêtre entre 5 et 10.  
   À partir de là, deux approches différentes sont proposées:

   * <ins>continuous bag-of-word [CBOW]</ins>:  
     prédit le mot courant en fonction des mots du contexte.

     On prend *C×2+1* mots à la fois: le mot central sera le mot courant et les mots autour seront le contexte.
     Les mots sélectionnés sont encodés avec one-hot encoding et donnés à un réseau neuronal — le mot courant pour cible, les mots en contexte comme entrée. Exemple: ("i", "a") &rarr; "want" (fenêtre de 1)

     Complexité de l'apprentissage:  
     `Q = (N×D + D×log2(V))`

     ![](https://i.imgur.com/Wq3kvSP.png)

   * <ins>skip-gram [SG]</ins>:  
     prédit les mots du contexte en fonction du mot courant.

     On choisit aléatoirement un nombre *R* entre 1 et *C*, et on choisit *R* mots avant et *R* mots après le mot courant. Les mots les plus éloignés du mot courant sont généralement moins liés au mot, et cette approche permet de donner moins de poids aux mots éloignés — puisqu'au cumul, on en donnera moins au réseau neuronal.  
     Les mots sélectionnés sont encodés avec one-hot encoding et donnés à un réseau neuronal — le mot courant en entrée, et chaque mot de contexte en sortie, un à un. On doit donc effectuer *R×2* classification pour chaque mot courant. Example: "want" &rarr; "i", "want" &rarr; "a".

     Complexité de l'apprentissage:  
     `Q ∝ (1×D + D×log2(V)) × C`

   Dans les deux cas, on utilise un mot courant et des mots de contexte (encodés avec one-hot encoding) et un réseau neuronal. Avec CBOW, les mots de contexte sont des entrées et le mot courant est le cible. Avec skip-gram, le mot courant est l'entrée et le mots de contexte la cible — utilisés les uns après les autres.

   On peut utiliser l'un ou l'autre. Avec skip-gram, l'ordre du contexte est pris en compte mais l'algorithme est plus lent que CBOW. En général, CBOW est préféré pour les petits corpus et est plus rapide à entraîner, tandis que SG est plus lent mais donne de meilleurs résultats pour de grands corpus et grandes dimensions.

4. Avec skip-gram ou continuous bag-of-words pour données, word2vec utilise un réseau neuronal de 2 couches:

   * <ins>Couche cachée</ins>  
     * L'objectif final de l'algorithme est d'apprendre la matrice de poids de la couche cachée (notée W ou E), les poids de la couche en sortie (W') sera juste abandonnée.

       Le nombre de noeuds (D) de la couche cachée correspond à la dimension des vecteurs de mots obtenus — si la taille souhaitée est 3 (ex  “i” => [0.001, 0.896, 0.763]), alors le nombre de noeuds cachés devra être 3. Dans les applications réelles, la taille est généralement autour de 300.

     * Si on prend la matrice de poids E (V×D) et qu'on la multiplie avec un vecteur one-hot O<sub>i</sub> (1×V), le résultat obtenu correspond à la i-ème ligne (1×D). Cette ligne est le vecteur e<sub>i</sub> correspondant au mot O<sub>i</sub> (O<sub>i</sub> × E = e<sub>i</sub> = i-ème ligne de E). Les poids de la couche cachée fonctionnent donc en réalité comme une table de conversion. Pour cette raison, on appelle aussi cette matrice *matrice d'encodage* (*embedding matrix* en anglais).

       ![](https://i.imgur.com/5sJNVc0l.png)

       Les vecteurs one-hot encoded ont une dimension relativement élevée et la plupart des éléments sont nuls. Il n'est donc pas efficace d'utiliser une multiplication  matricielle de vecteurs, puisqu'on multiplie tout un tas de zéros. En pratique, on utilise une fonction spécialisée pour simplement récupérer la ligne de la matrice de poids qui correspondent aux entrées. Dans keras par exemple, il y a une couche `Embedding` qui fait exactement ça.

   * <ins>Couche en sortie</ins>:  
     * Dans le cas de CBOW, on a plusieurs entrées et donc plusieurs words embedding retournés par la première couche. Avant de passer les données à la couche en sortie, on calcule la moyenne des lignes (ou la somme suivant les implémentations).

     * Ensuite, les données sont passés à une couche en sortie, qui utilise une unité softmax. Cette couche a ses propres poids (W'), pour classer parmis tous les mots possibles (V) celui qui est le plus probable. Chaque noeud (un par mot du vocabulaire) produit une valeur entre 0 et 1 et la somme de toutes ces valeurs vaut 1. La sortie ayant la plus haute probabilité est la prédiction.

       ![](https://i.imgur.com/P8bDrUa.png)

   * On initialise les différents paramètres (W, W') aléatoirement puis on utilise gradient descent pour apprendre tous les paramètres: on prédit le mot courant en fonction des mots de contexte (ou l'inverse), et on ajuste les paramètres via backpropagation pour maximiser la probabilité du dataset.

     Évidemment, ce n'est pas un problème d'apprentissage facile — plus ou moins 5 mots autour d'un mot donné, ça peut être un grand nombre de mots différents. Mais l'objectif du réseau neuronal n'est pas d'obtenir de bons résultats sur le problème d'apprentissage supervisé en soi, on veut simplement l'utiliser pour apprendre de bons vecteurs.  
     Et il s'avère que l'algorithme apprend de bons vecteurs: si deux mots différents ont des contextes très similaires, alors le modèle doit produire des résultats très similaires pour ces deux mots, et une manière d'y parvenir est si les deux mots ont des vecteurs similaires. L'algorithme a donc une incentive à apprendre des vecteurs similaires pour des mots utilisés dans des contextes similaires, et c'est exactement ce qu'on veut obtenir.

### Optimisations

* Vous avez peut-être remarqué que le réseau neuronal contient un grand nombre de poids: pour obtenir des vecteurs de dimension 300 pour 10 000 mots de vocabulaire, ça représente 2×3M poids pour les deux couches. Ça n'a pas beaucoup d'importance pour la première couche, puisqu'on n'utilise pas vraiment la matrice en entier à chaque itération, uniquement les lignes correspondant aux entrées. Par contre le softmax est couteux à calculer: à chaque fois qu'on veut évaluer la probabilité d'un mot donné, on doit effectuer une somme sur tous les mots du vocabulaire. Des [solutions ont été proposées](https://arxiv.org/pdf/1411.2738.pdf) pour palier à ce problème.

* <ins>Softmax hiérarchique</ins> (*hierarchical softmax [HSoftmax]*)  
  Un softmax hiérarchique est une technique utilisant un arbre binaire pour réduire le coût de calcul du softmax. On passe de O(V) à O(log2(V))

  ![](https://i.imgur.com/6LCqqIL.png)

  * Dans un softmax classifique, on calcule la probabilité de chaque noeud en sortie (exponentielle du word embedding e<sub>i</sub> fois le poids associé à la sortie &theta;<sub>k</sub>, le tout divisé par la somme des calculs pour toutes les sorties) et celui qui a la plus forte probabilité est la prédiction.

    $$
    \text{Softmax}: \\
    \frac{e^{\theta_k^T e_i}}{\sum_{j=1}^V e^{\theta_j^T e_i}}
    $$

    Dans un softmax hiérarchique, plutôt que de calculer directement la probabilité associée à une sortie, on décompose le problème dans un arbre: les mots sont des feuilles, les noeuds internes de l'arbre sont des classifications binaires (sigmoid, comme pour une régression logistique), où les noeuds calculent la probabilité que le meilleur choix se trouve à gauche.

    $$
    \text{HSoftmax}: \\
    \begin{aligned}
    P(\text{noeud k, gauche}) &= sigmoid(\theta_k^T e_i) \\
    P(\text{noeud k, droite}) &= 1 - sigmoid(\theta_k^T e_i) \\
                              &= sigmoid(-\theta_k^T e_i)
    \end{aligned}
    $$

  * Chaque ligne de la matrice de poids de la couche softmax (&theta;<sub>k</sub>) est non plus associée à un mot en sortie mais à un noeud interne de l'arbre binaire. Notons que le nombre de noeuds internes est égal au nombre de feuille moins 1 (c'est une propriété fondamentale des arbres binaires): si on a V mots en sortie, la matrice de poids est donc de dimension (V-1)×D et non plus V×D.

  * Concrètement, si le résultat de la couche précédente est le word embedding e<sub>i</sub>:  
  On multiple e<sub>i</sub> avec le poids associé au noeud racine (&theta;<sub>k</sub>), et on applique la fonction sigmoid. La résultat est une valeur entre 0 et 1 — 1 indique que le mot se situe à gauche dans 100% des cas, 0 qu'il se trouve à droite dans 100% des cas. On prend la direction la plus probable, gauche si &gt;0.5, droite  sinon. S'il s'agit d'une feuille, on a notre prédiction, et s'il s'agit d'un noeud, on répète le processus en prenant les poids de ce noeud, et ainsi de suite jusqu'à atteindre une feuille.

  * Pour calculer la probabilité associée à la k-ème sortie: il suffit de multiplier entre elles les probabilités du chemin vers cette sortie. L'arbre est construit au moment de l'initialisation de l'algorithme, au moment de la construction de la liste de vocabulaire. Pour chaque mot du vocabulaire, on sait donc comment naviguer l'arbre pour l'atteindre.

    ![](https://i.imgur.com/yrNjgaL.png)

  * Bien que HSoftmax puisse fonctionner avec n'importe quelle organisation d'arbre binaire, la plus courante est l'arbre de Huffman: les mots les plus répandus sont plus proches du sommet (et requièrent donc moins de calculs), tandis que les mots les moins répandus sont plus bas dans l'arbre.

  [Video: Hierarchical Softmax in word2vec](https://www.youtube.com/watch?v=pzyIWCelt_E)

* <ins>Negative sampling</ins>  
  Ici, on change le problème d'apprentissage: on donne une paire mot courant / mot contexte en entrée et on demande au modèle de prédire s'il s'agit d'une véritable paire ou non. Par exemple: orange/jus = 1, orange/roi = 0. Pour générer l'ensemble de données:

  1. Choisir un mot courant et un mot courant. Mettre le label 1.

  2. Garder le même mot courant et choisir *k* mots aléatoires dans la liste de vocabulaire. Mettre le label 0.  
    Ce n'est pas grave si, par hasard, un des mots choisit au hasard dans le vocabulaire apparaît dans la fenêtre de contexte.

     Mikolov et al. recommendant une valeur de *k* entre 5 et 20 pour un petit ensemble de données, entre 2 et 5 pour un grand ensemble.

  Pour choisir des mots dans le vocabulaire, on peut
  * Utiliser la fréquence empirique des mots, c'est à dire le nombre d'apparition des mots dans le corpus. Le problème c'est que les mots tels que "le", "de", "à" seraient sur-représentés.

   * Utiliser la distribution uniforme, c'est à dire que tous les mots ont la même probabilité d'être choisis. Là encore, les exemples générés seraient peu représentatifs de la distributions des mots.

   * Une alternative que les auteurs ont trouvé efficace est quelque chose entre les deux: une probabilité proportionnelle à la fréquence du mot (f(w<sub>i</sub>)) puissance 3/4.

      $$
      P(w_i) = \frac{f(w_i)^{3/4}}{\sum_{j=1}^{V} f(w_j)^{3/4}}
      $$

## Points clés

* Générer des words embeddings nécessite beaucoup de ressources — le plus simple est d'utiliser un modèle pré-entraîné.

* On peut améliorer la précision des vecteurs en
  * augmentant la taille du corpus utilisé
  * augmentant la dimensions des word embeddings — plus d'informations seront préservées
  * augmentant la taille de la fenêtre

[Word Embeddings.ipynb](notebooks/Word Embeddings.html)