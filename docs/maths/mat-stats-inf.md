---
title: Statistiques inférentielles
category: Maths, Statistiques
latex: true
---

## Hypothèses

* Les statistiques inférentielles se basent sur les statistiques descriptives et les probabilités pour tirer des conclusions générales (inférences) sur une population à partir d'échantillon(s)

* Pour tirer des inférences, on commence par formuler une hypothèse d'étude. Ex:

  * Les hommes sont meilleurs conducteurs que les femmes
  * Le stress provoque des ulcères
  * Une augmentation de salaire n'a pas d'incidence sur l'attrition (partir de l'entreprise)
  * Les rendements immobiliers sont les mêmes dans toutes les métropoles

* À partir de l'hypothèse d'étude, on formule deux autres hypothèses:

  * <ins>L'hypothèse nulle</ins> (notée H<sub>0</sub>)  
    Est l'hypothèse qu'il n'y a pas d'effet (pas de relation significative) entre les variables testées.  
    Ex: Il n'y a pas de corrélation significative entre stress et ulcère (la moyenne des ulcères entre le groupe stressé et le groupe non stressé est égale).

  * <ins>L'hypothèse alternative</ins>, (notée H<sub>1</sub> ou H<sub>A</sub>)  
    Est l'hypothèse inverse: qu'il y a un effet entre les variables testées.  
    Ex: On observe une corrélation significative entre stress et ulcère (moyennes non égales).

* Pour trancher entre les deux, on a alors deux approches possibles:
  1. l'approche fréquentiste, avec un test statistique,
  2. ou l'approche bayesienne, en mettant à profit le théorème de Bayes.

  $$
  \text{Fréquentiste: }\\
  \theta \to X: P(X|\theta) \\[10pt]

  \text{Bayesien: } \\
  X \to \theta: P(\theta|X) \\[10pt]

  \theta: cause, X: résultats
  $$

## Inférence fréquentiste vs Bayesienne

* L'[approche fréquentiste](mat-stat-inf-freq.md) consiste à calculer le *petit p* (*p-value* en anglais), qui est la probabilité d'obtenir un effet au moins aussi extrême que celui observé en supposant que l'hypothèse nulle est vraie.

  Une valeur *p* élevée signifie qu'il y a une forte probabilité que les résultats obtenus soient dû au hasard. Au contraire, une valeur *p* faible, qu'il est peu probable que ce soit un hasard et donc que les résultats observés sont statistiquement significatifs.

*  L'[approche bayesienne](mat-stat-inf-bayes.md) calcule la probabilité qu'une hypothèse soit meilleure que l'autre. L'approche bayesienne tente de tenir compte des connaissances et des données antérieures qui pourraient influencer les résultats finaux, contrairement à l'approche fréquentiste.
