---
title: 5 - Évaluer
category: Machine Learning, Processus
latex: true
---

Le modèle est entraîné et maintenant quoi?

## Underfitting vs overfitting

* Le dataset va contenir deux types d'informations: du signal et du bruit. Le signal c'est la tendance des données, la partie qui peut nous aider à faire des prédictions avec de nouvelles données. Le bruit c'est la variation aléatoire des données, qui n'est vraie que pour les données recueillies et n'est pas représentatif de la tendance

  Quand on entraîne un modèle, on cherche à apprendre la tendance des données et non les aléas des données. Se pose alors la question, à quel point doit-on être fidèle aux données du dataset?

  * Quand le modèle n'a pas suffisamment appris des données pour être représentatif de la tendance, on dit qu'il est *sous-ajusté* (*underfit* en anglais). On dit aussi qu'il a un *fort biais* par rapport aux données.

  * Quand le modèle a trop appris des données, il a appris du bruit et non du signal, on dit qu'il est *sur-ajusté* (*overfit* en anglais). On dit aussi qu'il a une *forte variance* par rapport aux données.

  L'idéal est de n'être si sous-ajusté ni sur-ajusté mais quelque part entre les deux.

  ![](https://i.imgur.com/L3U9JT4.png)

* Quand on a deux caractéristiques, il est relativement facile de vérifier si le modèle a trouvé un bon compromis entre les deux: il suffit de tracer les données et les valeurs prédites pour évaluer le modèle (comme ci-dessus). Mais quand on a un nombre important de données ou de caractéristiques, ce n'est plus vraiment possible.

  Dans ce cas, on regarde l'erreur des données d'entraînement et l'erreur des données de validation. Si le modèle est mauvais sur les données d'entraînement, c'est qu'il n'a pas réussi à apprendre la tendance (*underfit*). Si le modèle est performant sur les données d'entraînement mais mauvais sur les données de validation, c'est qu'il a appris du bruit (*overfit*).

  <br>
  ![](https://i.imgur.com/9HRWJhn.jpg?1)

* Il n'est pas rare que les courbes suivent une courbe "en crosse de hockey": une amélioration rapide au début suivit d'une amélioration graduelle. Ça rend la dernière partie, celle de l'amélioration graduelle, plus difficile à voir — masquée par le fait que l'échelle utilisée est très grande. Commencer le graphique à partir de l'epoch 10 pour une meilleure visibilité.

  ![](https://i.imgur.com/jti3HLam.png)
  ![](https://i.imgur.com/Y7J6Rjem.png)

  Note: dans cet exemple, on peut voir qu'il y a eu une amélioration initiale mais qu'entrainer le modèle plus longtemps n'a pas amélioré les prédictions — le modèle est sous-ajusté mais ne parvient pas à apprendre la tendance.

  <details>
  <summary>python</summary>

  <pre lang="python">
  history_df = pd.DataFrame(history.history)
  history_df.loc[0:, ['loss', 'val_loss']].plot()
  print("Minimum Validation Loss: {:0.4f}".format(history_df['val_loss'].min()))

  # Start the plot at epoch 10
  history_df.loc[10:, ['loss', 'val_loss']].plot()
  print("Minimum Validation Loss: {:0.4f}".format(history_df['val_loss'].min()))
  </pre>
  </details>

* Les principales raisons d'un underfitting sont:

  - un *data leakage*: une partie des données du test set se retrouvent dans les données du train set.

  - un *data mismatch*: les données testées sont différentes des données sur lequel le modèle est entraîné.  
    Par exemple les caractéristiques / intervalles de valeurs sont différents

  D'autres manières de lutter contre l'underfitting sont:

  - utiliser un modèle plus avancé
  - modifier les hyperparamètres du modèle (ajouter des layers)
  - réduire le nombre de caractéristiques
  - entraîner plus longtemps

* Pour ce qui est de l'overfitting:

  - collecter davantage de données
  - essayer un modèle moins avancé

## Métriques d'une classification

### Accuracy

* Pour mesurer et comparer la performance d'un modèle, il est important de n'utiliser qu'une seule métrique. On peut vérifier que le coût d'un modèle (résultat de la fonction coût, que l'algorithme cherche à minimiser) pour s'assurer qu'il diminue bien, mais c'est une métrique difficile à interpréter — une erreur importante peut être acceptable suivant l'échelle des données.

  On va généralement préférer utiliser l'exactitude (*accuracy* en anglais), qui est le rapport entre le nombre de prédictions correctes et le nombre total de prédictions. Une exactitude de 1.0 (100%) indique que le modèle ne se trompe jamais.

  $$
  \text{Accuracy} = \frac{\text{nb correct}}{\text{nb total}}
  $$

* Il existe un cas qui rend les choses plus difficiles: les classes asymmétriques — quand une classe est sur-représentée par rapport à une autre.

  Exemple: on veut prédire si les patients ont un cancer, et on trouve un modèle avec une exactitude de 99.5%. Ça semble impressionant, sauf que seul 0.5% des patients du dataset ont un cancer: un modèle qui prédira toujours que le patient n'a pas de cancer a une exactitude de 99.5% — mais il échoue toujours à prédire un cancer

  ``` matlab
  function y = predictCancer(x)
    y = 0;
  return
  ```

  Pour cette raison, quand on mesure la performance d'un modèle de classification où les classes ne sont pas réparties uniformément, on utilisera non plus l'exactitude du modèle mais le f-score — qui prend en compte les faux-positifs et faux-négatifs.

### Faux-positif & cie

* Tout d'abord, il faut comprendre ce qu'est un faux-positif et un faux-négatif.  
  "Positif" désigne ce qu'on cherche à prédire: si on veut détecter les spams, un spam sera "positif" et un non-spam sera "négatif".
  Si la prédiction est correcte on a "vrai", et sinon "faux". On aura donc par exemple:

  - des Vrai positifs: 45 emails spam sont classifiés spam (correct)
  - des Vrai négatifs: 30 emails non-spam sont classifiés non-spam (correct)
  - des Faux positifs: 5 emails non-spam sont classifiés spam (incorrect)
  - des Faux négatifs: 20 emails spam sont classifiés non-spam (incorrect)

* On représente généralement les différents cas dans une <ins>matrice de confusion</ins>:  

  ![](https://i.imgur.com/ASJCZrIm.png)

### F-score

* On dispose de différentes formules pour calculer la susceptibilité d'un modèle  
  à produire des faux-positifs, vrai-positifs, etc

  ![](https://i.imgur.com/J2ou1rWl.png)

* Exactitude (*Accuracy*)  
  Correctement prédits / total  
  Un modèle qui prédit toujours la bonne valeur a une exactitude de 1.0

  $$
  \text{Accuracy} \\[5pt]
  \begin{aligned}
  &= P(\text{Prédire vrai | Vrai}) + P(\text{Prédire faux | Faux}) \\[5pt]
  &= \frac{\text{Vrai Positif} + \text{Vrai Négatif}}{\text{Vrai Positif + Faux Positif} + \text{Vrai Negatif + Faux Negatif}} \\[5pt]
  &= \frac{VP + VN}{VP + FP + VN + FN}
  \end{aligned}
  $$

* Sensibilité, rappel (*Recall*, *Sensitivity*, *True positive rate*)  
  Correctement prédits positifs / véritablement positifs

  La sensibilité consiste à calculer le nombre de cas correctement prédits positifs (Vrai positif) parmi le nombre de cas véritablement positifs.
  Le nombre de cas véritablement positifs est la somme des cas correctement prédits positifs + les cas incorrectement prédits négatifs (Vrai positif + Faux négatif).  
  Un modèle qui ne produit aucun faux-négatif a une sensibilité de 1.0

  $$
  \text{Recall} \\[5pt]
  \begin{aligned}
  &= P(\text{Prédire vrai | Vrai}) \\[5pt]
  &= \frac{\text{Vrai Positif}}{\text{Vrai Positif + Faux Negatif}} \\[5pt]
  &= \frac{VP}{VP + FN}
  \end{aligned}
  $$

* Spécificité (*Specificity*, *True negative rate*)  
  Correctement prédits négatifs / véritablement négatifs

  La spécificité calcule le nombre de cas correctement prédits négatifs (Vrai négatif) parmi le nombre de cas véritablement négatifs.
  Le nombre de cas véritablement négatifs est la somme des cas correctement prédits négatifs + les cas incorrectement prédits positifs (Vrai négatif + Faux positif).

  $$
  \text{Specificity} \\[5pt]
  \begin{aligned}
  &= P(\text{Prédire faux | Faux}) \\[5pt]
  &= \frac{\text{Vrai Negatif}}{\text{Vrai Negatif + Faux Positif}} \\[5pt]
  &= \frac{VN}{VN + FP}
  \end{aligned}
  $$

* Précision, fidélité, valeur prédictive positive (*Precision*, *Positive predicted value*)  
  Correctement prédits positifs / prédits positifs

  La précision calcule le nombre de cas correctement prédits positifs (Vrai positif) parmi le nombre de cas prédits positifs.
  Le nombre de cas prédits positifs est la somme des cas correctement prédits positifs + les cas incorrectement prédits positifs (Vrai positif + Faux positif).  
  Un modèle qui ne produit aucun faux-positif a une précision de 1.0

  $$
  \text{Precision} \\[5pt]
  \begin{aligned}
  &= P(\text{Vrai | Prédit vrai}) \\[5pt]
  &= \frac{\text{Vrai Positif}}{\text{Vrai Positif + Faux Positif}} \\[5pt]
  &= \frac{VP}{VP + FP}
  \end{aligned}
  $$

* Valeur prédictive négative (*Negative predicted value*)   
  Correctement prédits négatifs / prédits négatifs

  La Valeur prédictive négative calcule le nombre de cas correctement prédits négatifs (Vrai négatif) parmi le nombre de cas prédits négatifs.
  Le nombre de cas prédits négatifs est la somme des cas correctement prédits négatifs + les cas incorrectement prédits négatifs (Vrai négatif + Faux négatif)

  $$
  \text{Valeur prédictive négative} \\[5pt]
  \begin{aligned}
  &= P(\text{Faux | Prédit faux}) \\[5pt]
  &= \frac{\text{Vrai Negatif}}{\text{Vrai Negatif + Faux Negatif}} \\[5pt]
  &= \frac{VN}{VN + FN}
  \end{aligned}
  $$

* Quand on veut limiter le nombre de mauvaises prédictions (limiter les faux-positif):  
  on cherche des valeurs élevées de précision et de valeur prédictive négative (= une valeur élevée de correctement prédit / total prédit).  
  Par exemple, on ne veut pas dire pas à une personne qu'elle a un cancer alors que ce n'est pas le cas, donc on choisit une précision élevée

  Quand on veut limiter le nombre de mauvaises exclusions (limiter les faux-négatif):  
  on cherche des valeurs élevées de sensibilité et spécificité (= une valeur élevée de correctement prédit / total vérité).  
  Par exemple, on veut s'assurer qu'une maladie n'est pas présente, donc on choisit une sensibilité elevée

  Lorsqu'on augmente le taux de sensibilité, le taux de précision diminue: il faut choisir un compromis entre les deux.  
  Si les faux-positif sont pires que les faux-négatif, viser une plus grande précision.  
  Si les faux-négatif sont pires que les faux-positif, viser un plus grand rappel / plus grande sensibilité.

* F-score (*F-score*, *Harmonic mean of precision and recall*)  
  Moyenne harmonique de la précision et du rappel.  
  Un modèle qui ne commet aucune erreur a un score de 1.0

  $$
  \text{F beta score} \\
  \begin{aligned}
  &= \frac{(1 + \beta^2)(\text{Precision} \cdot \text{Recall})}{\beta^2 \text{Precision} + \text{Recall}} \\
  &= \frac{(1 + \beta^2) VP}{(1 + \beta^2) VP + \beta^2 FN + FP}
  \end{aligned}
  $$

  &beta; est un facteur qui vaudra typiquement 0.5, 1 ou 2 — on donne &beta; fois plus d'importance au rappel qu'à la précision.  
  Si &beta; = 1, alors on donne autant d'importance au rappel qu'à la précision, c'est ce qu'on appelle le F1-score.

  $$
  \text{F1 score} \\
  = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}
  $$

  <details>
  <summary>python</summary>

  <pre lang="python">
  from sklearn.metrics import classification_report

  print(classification_report(y_true, y_pred, target_names=target_names))
  </pre>
  </details>

## Vérifier les erreurs commises

* Deuxième étape pour évaluer le modèle: vérifier les erreurs commises.  
  On liste généralement les valeurs cibles possibles en ordonnée (à la verticale) et les valeurs prédites en abscisse (à l'horizontale) — mais ce n'est pas toujours le cas, vérifier la légende des axes. À l'intersection des deux, on indique le nombre de fois que cette combinaison prédiction/réalité s'est produit.

  Dans l'exemple ci-dessous, le modèle a prédit 17 fois le label "3" alors que le véritable label était "5".  
  Sur la diagonale principale (➘), on trouve le nombre de fois que le modèle a prédit les bonnes valeurs.

  ![](https://i.imgur.com/ubURMBe.png)

  Si certaines erreurs se produisent souvent, vérifier si ces erreurs sont légitimes.  
  Par exemple: est-ce qu'un humain aurait pu confondre le 4 pour un 9?

  ![](https://i.imgur.com/oYnLVHx.png)

  <details>
  <summary>Exemples</summary>
  <img src="https://i.imgur.com/4IonPLpt.jpg" title="Cat vs ice cream">
  <img src="https://i.imgur.com/hRagA8qt.jpg" title="Chihuaha vs blueberry muffin">
  <img src="https://i.imgur.com/nVShm7Qt.jpg" title="Owl vs apple slice">
  </details>

## Autres Métriques

* Pour une régression, on utilisera au choix

  - Mean absolute erorr (MAE)
  - Mean squared error (MSE)
  - Root mean squared error (RMSE)