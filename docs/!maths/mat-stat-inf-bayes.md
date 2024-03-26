---
title: Inférences Bayesiennes
category: Maths, Statistiques, Statistiques inférentielles
latex: true
---

## Facteur de Bayes

* Pour rappel, le théorème de Bayes dit que

  $$
  \text{Théorème de Bayes} \\
  P(A|B) = \frac{P(A) \times P(B|A)}{P(B)}
  $$

* Les statistiques Bayesiennes consistent à s'intéresser non pas à une probabilité conditionnelle mais au rapport entre deux probabilités conditionnelles. Ce qui nous amène au rapport suivant:

  $$
  \begin{aligned}
  \frac{P(A_1|B)}{P(A_2|B)} &= \frac{
  \frac{P(A_1) \times P(B|A_1)}{P(B)}}
  {\frac{P(A_2) \times P(B|A_2)}{P(B)}} \\[7pt]

  &= \frac{P(A_1) \times P(B|A_1)}{P(A_2) \times P(B|A_2)} \\[7pt]

  &= \underbrace{\frac{P(A_1)}{P(A_2)}}_{\text{probabilité a priori}} \times \underbrace{\frac{P(B|A_1)}{P(B|A_2)}}_{\text{facteur de Bayes}}
  \end{aligned}
  $$

* Le *facteur de Bayes* (généralement noté K) est le rapport entre la probabilité d'avoir observé les données si l'hypothèse nulle est vraie et la probabilité d'avoir observé les données si l'hypothèse alternative est vraie.  
  En d'autres termes, c'est le rapport de vraissemblance (*likelihood ratio* en anglais) entre deux hypothèses dont les probabilités sont complémentaires.

  <pre>
  Ex: Maria se demande si Jordan est fan de Star-Wars.  
  Elle sait qu'il a vu le dernier film.
  Elle pense que la probabilité d'avoir vu le dernier film étant fan est de 99%
  et que la probabilité d'avoir vu le dernier n'étant pas fan est de 50%

  K = P(film|fan)/P(film|pasfan)
    = 0.99/0.55
    = 1.98
  </pre>

## Probabilité a posteriori

* On peut utiliser le facteur de Bayes pour mettre à jour une probabilité antérieure (dite *probabilité a priori*). La probabilité qui en résulte est appelée *probabilité a postériori*.

  <pre>
  Ex: Maria pense qu'il y a 60% de chances qu'une personne donnée soit fan.

  P(fan|film) = P(fan)/P(pasfan) × P(film|fan)/P(film|pasfan)
              = 0.6/0.4 × 1.98
              = 2.97

  Il est 2.97 fois plus probable de Jordan soit fan, sachant qu'il a vu le dernier film,
  qu'il n'est probable qu'il ne le soit pas.
  </pre>

  Au lieu de calculer la probabilité d'être fan étant donné qu'il a vu le dernier film, on compare la probabilité des deux hypothèses — pour peser le pour et le contre.

* On peut continuer à mettre à jour la probabilité a posteriori obtenue, en l'utilisant comme probabilité a priori avec un nouveau facteur de Bayes (ex: on sait maintenant que le chien de Jordan s'appelle Anakin).

  $$
  \begin{aligned}
  P(A_j|B) &= \frac{P(A_j \cap B)}{P(B)} \\[10pt]
  &= \frac{P(A_j) P(B|A_j)}{\sum_{i=1}^n P(A_i) P(B|A)}
  \end{aligned}
  $$

## Significativité des résultats

* L'"actualisation des croyances" est au coeur des statistiques bayesiennes et peut être utilisée pour tester des hypothèses. On commence par une croyance a priori, puis on ajuste nos croyances au regard des nouvelles informations.

  Notons que la probabilité a priori est subjective, ne pas être d'accord avec le postulat de départ peut nous amener à deux conclusions différentes. Souvent, les études qui utilisent les calculs bayesiens ne font pas seulement état de la probabilité a posteriori obtenue, mais aussi du facteur de Bayes: vous pouvez, si vous n'êtes pas d'accord, refaire les calculs et tirer vos propres conclusions.

* À moins d'avoir decidé que quelque chose a une probabiité de 0%, lorsqu'il y a suffisamment de preuves, deux personnes avec des chances antérieures différentes arriveront à la même conclusion.

  <pre>
  Ex: Vous pensez que les suhis présentent un risque élevé de vous infecter avec  
  des parasites, votre collègue non. Si vous voyez tous deux votre patron et toute  
  votre équipe aller manger des suhis chaque semaine pendant deux ans, sans jamais
  rencontrer de problème de parasites, alors vous en conclurez que les sushis sont  
  assez sûrs après tout, malgré vos différences initiales.
  </pre>

* Il ainsi existe une classification des valeurs de K:

  $$
  K = \frac{P(D|H_1)}{P(D|H_2)} = \frac{V(H_1)}{V(H_2)}
  $$

  ![](https://i.imgur.com/4bNDJErm.png)

* La logique des méthodes bayesiennes est similaire à la façon dont nous pensons naturellement. Comme un médecin qui utilise les symptômes d'un patient comme la fièvre et la fatigue pour évaluer les chances qu'un patient ait la grippe plutôt qu'un rhûme.

  Dans la vie réelle, on n'ignore pas tous les éléments de preuve vus précédemment dès qu'on en a un nouveau — mais c'est ce font les inférences fréquentielles. Les infériences bayesiennes permet de prendre de nouvelles données et d'actualiser les probabilités antérieures (le postérieur d'hier est l'antérieur d'aujourd'hui).