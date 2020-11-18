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

  Dans ce cas, on regarde l'erreur des données d'entraînement et l'erreur des données de validation. Si le modèle est mauvais sur les données d'entraînement, c'est qu'il n'a pas réussi à apprendre la tendance (underfit). Si le modèle est performant sur les données d'entraînement mais mauvais sur les données de validation, c'est qu'il a appris du bruit (overfit).

  ![](https://i.imgur.com/9HRWJhn.jpg?1)

* Il n'est pas rare que les courbes suivent une courbe "en crosse de hockey": une amélioration rapide au début suivit d'une amélioration graduelle. Ça rend la dernière partie difficile à voir — masquée par le fait que l'échelle utilisée est très grande. Commencer le graphique à partir de l'epoch 10 pour une meilleure visibilité.

  Dans l'exemple ci-dessous, l'écart entre les deux est assez faible et le coût sur les données de validation n'augmente jamais: le modèle est sous-ajusté mais ne parvient pas à apprendre les données.

  ![](https://i.imgur.com/jti3HLam.png)
  ![](https://i.imgur.com/Y7J6Rjem.png)

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

## Métriques

### Accuracy

* Pour mesurer et comparer la performance d'un modèle, il est important de n'utiliser qu'une seule métrique. On peut vérifier que le coût d'un modèle (résultat de la fonction coût, que l'algorithme cherche à minimiser) pour s'assurer qu'il diminue bien, mais c'est une métrique difficile à interpréter — une erreur importante peut être acceptable suivant l'échelle des données.

  On va généralement préférer utiliser l'exactitude (*accuracy* en anglais), qui est le rapport entre les prédictions correctes et le total des prédictions

  $$
  \text{Accuracy} = \frac{\text{nb correct}}{\text{nb total}}
  $$

   Une exactitude de 1.0 (100%) indique que le modèle ne se trompe jamais.

* Il existe un cas qui rend les choses plus difficiles: les classes asymmétriques — quand une classe est sur-représentée par rapport à une autre.

  Exemple: on veut prédire si les patients ont un cancer. Notre modèle a une exactitude de 99.5%, ça semble impressionant, sauf que seul 0.5% des patients du dataset ont un cancer. Le modèle suivant a une exactitude de 99.5 (il échoue toujours à prédire un cancer):

  ``` matlab
  function y = predictCancer(x)
    y = 0;
  return
  ```

### F-score

* Pour cette raison, quand on mesure la performance d'un modèle de classification où les classes ne sont pas réparties uniformément, on utilisera non plus l'exactitude du modèle mais le f-score — qui prend en compte les faux-positifs et faux-négatifs:

  * Exactitude  
    *Accuracy*  
    Un modèle qui prédit toujours la bonne valeur a une exactitude de 1.0

    $$
    \text{Accuracy} \\[5pt]
    \begin{aligned}
    &= P(\text{Prédire vrai | Vrai}) + P(\text{Prédire faux | Faux}) \\[5pt]
    &= \frac{\text{Vrai Positif} + \text{Vrai Négatif}}{\text{Vrai Positif + Faux Positif} + \text{Vrai Negatif + Faux Negatif}} \\[5pt]
    &= \frac{VP + VN}{VP + FP + VN + FN}
    \end{aligned}
    $$

  * Sensibilité, rappel  
    *Recall* (*Sensitivity*, *True positive rate*)  
    Probabilité que le test soit positif si une personne est malade. Les tests très sensibles sont surtout utiles pour s'assurer qu'une maladie n'est pas présente (peu de faux négatifs)  
    Un modèle qui ne produit aucun faux-négatif a un rappel de 1.0

    $$
    \text{Recall} \\[5pt]
    \begin{aligned}
    &= P(\text{Prédire vrai | Vrai}) \\[5pt]
    &= \frac{\text{Vrai Positif}}{\text{Vrai Positif + Faux Negatif}} \\[5pt]
    &= \frac{VP}{VP + FN}
    \end{aligned}
    $$

  * Spécificité  
    *Specificity* (*True negative rate*)  
    Probabilité que le test soit négatif si une personne n'est pas malade. Les tests très spécifiques sont utiles pour s'assurer qu'une maladie est bien présente (peu de faux positifs)

    $$
    \text{Specificity} \\[5pt]
    \begin{aligned}
    &= P(\text{Prédire faux | Faux}) \\[5pt]
    &= \frac{\text{Vrai Negatif}}{\text{Vrai Negatif + Faux Positif}} \\[5pt]
    &= \frac{VN}{VN + FP}
    \end{aligned}
    $$

  * Précision, fidélité, valeur prédictive positive  
    *Precision* (*Positive predicted value*)  
    Probabilité qu'une personne soit malade si le test est positif.  
    Un modèle qui ne produit aucun faux-positif a une précision de 1.0

    $$
    \text{Precision} \\[5pt]
    \begin{aligned}
    &= P(\text{Vrai | Prédit vrai}) \\[5pt]
    &= \frac{\text{Vrai Positif}}{\text{Vrai Positif + Faux Positif}} \\[5pt]
    &= \frac{VP}{VP + FP}
    \end{aligned}
    $$

  * Valeur prédictive négative  
    *Negative predicted value*  
    Probabilité qu'une personne ne soit pas malade si le test est négatif.

    $$
    \text{Valeur prédictive négative} \\[5pt]
    \begin{aligned}
    &= P(\text{Faux | Prédit faux}) \\[5pt]
    &= \frac{\text{Vrai Negatif}}{\text{Vrai Negatif + Faux Negatif}} \\[5pt]
    &= \frac{VN}{VN + FN}
    \end{aligned}
    $$

  * F-score  
    *F-score* (*Harmonic mean of precision and recall*)  
     Moyenne harmonique de la précision et du rappel.  
     Un modèle qui ne commet aucune erreur a un score de 1.0

     &beta; est un facteur qui vaudra typiquement 0.5, 1 ou 2 — on donne &beta; fois plus d'importance au rappel qu'à la précision.  
    Si les faux-positif sont pires que les faux-négatif, viser une plus grande précision.  
    Si les faux-négatif sont pires que les faux-positif, viser un plus grand rappel.

    $$
    \text{F beta score} \\
    \begin{aligned}
    &= \frac{(1 + \beta^2)(\text{Precision} \cdot \text{Recall})}{\beta^2 \text{Precision} + \text{Recall}} \\
    &= \frac{(1 + \beta^2) VP}{(1 + \beta^2) VP + \beta^2 FN + FP}
    \end{aligned}
    $$

    Si &beta; = 1, alors on donne autant d'importance au rappel qu'à la précision, c'est ce qu'on appelle le F1-score.

    $$
    \text{F1 score} \\
    = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}
    $$

  [International vocabulary of metrology — Vocabulaire international de métrologie](https://www.bipm.org/utils/common/documents/jcgm/JCGM_200_2008.pdf)

  <details>
  <summary>python</summary>

  <pre lang="python">
  from sklearn.metrics import classification_report

  print(classification_report(y_true, y_pred, target_names=target_names))
  </pre>
  </details>

## Vérifier les erreurs commises

* Deuxième étape pour évaluer le modèle: vérifier les erreurs commises.  
  Dans le cas de données catégoriques, on utilise une matrice de confusion.

* On liste généralement les valeurs cibles possibles en ordonnée (à la verticale) et les valeurs prédites en abscisse (à l'horizontale) — mais ce n'est pas toujours le cas, vérifier la légende des axes. À l'intersection des deux, on indique le nombre de fois que cette combinaison prédiction/réalité s'est produit.

  Dans l'exemple ci-dessous, le modèle a prédit 17 fois le label "3" alors que le véritable label était "5".  
  Sur la diagonale principale (&LowerRightArrow;), on trouve le nombre de fois que le modèle a prédit les bonnes valeurs.

  ![](https://i.imgur.com/ubURMBe.png)

  Si certaines erreurs se produisent souvent, vérifier si ces erreurs sont légitimes.

  ![](https://i.imgur.com/oYnLVHx.png)

  <details>
  <summary>Exemples</summary>
  <img src="https://i.imgur.com/4IonPLpt.jpg" title="Cat vs ice cream">
  <img src="https://i.imgur.com/hRagA8qt.jpg" title="Chihuaha vs blueberry muffin">
  <img src="https://i.imgur.com/nVShm7Qt.jpg" title="Owl vs apple slice">
  </details>
