---
title: Statistiques descriptives (bivariables)
category: Maths, Statistiques
latex: true
---

## Covariance

* la **covariance**  
  Note: Pour comparer la variance entre deux variables, il faut que les deux variables aient le même nombre d'éléments.

  $$
  Cov(X,Y) = \frac{\displaystyle \sum_{i=1}^n (X_i - \mu_X) \cdot (Y_i - \mu_Y)}{n}
  $$

  Soustraire la moyenne de X à chacune des valeurs de X et soustraire la moyenne de Y à chacune des valeurs de Y. Calculer le produit vectoriel des deux vecteurs obtenus. Enfin, diviser par le nombre d'éléments d'un échantillon. Pour comparer deux échantillons, on utilise la correction de Bessel — on divise par n-1 au lieu de n.

  <details>
  <summary>python</summary>
  <pre lang="python">
  np.cov(X,Y)[0][1]
  </pre>
  <pre lang="python">
  np.dot(X - np.mean(X), Y - np.mean(Y)) / (len(X)-1)
  </pre>
  </details>

  La covariance permet de vérifier si la variation entre une variable et sa moyenne est similaire à la variation d'une autre variable avec sa moyenne. Ça va nous permettre de vérifier s'il existe une relation linéaire entre ces deux variables.

  * Si la covariance est nulle ou proche de zéro, il n'y a pas de relation

  * Si la covariance est positive, les deux variables ont tendance à se déplacer dans la même direction: si X augmente, Y augmente

  * Si la covariance est négative, les deux variables ont tendance à se déplacer dans des directions opposées: si X augmente, Y diminue

  ![](https://i.imgur.com/Czp9W2y.png)

## Matrice de covariance

* la **matrice de covariance**  
  Matrice caractérisant les covariances de *p* variables. Avec deux variables, on aura:

  $$
  M_{Cov} = \left(
\begin{array}{cc}
Cov(X,X) & Cov(X,Y) \\
Cov(Y,X) & Cov(Y,Y)
\end{array}
\right)
  $$

  * La matrice est symétrique — puisque Cov(X,Y) = Cov(Y,X).
  * Les éléments de la diagonale réprésentent la variance de chaque variable — puisque Cov(X,X) = Var(X)

## Coefficient de Corrélation (R)

* Une covariance proche de 0 signifie qu'il n'y a pas de relation linéaire entre les deux variables. Inversemment, plus la covariance s'écarte de 0, plus la relation observée est importante. Mais cette valeur doit être interprétée au regard des unités utilisées: si les valeurs de l'échantillon sont des valeurs proches de zéro la covariance sera faible, tandis que si les valeurs s'expriment en milliers la covariance sera élevée, il est donc difficile d'estimer à quel point la relation entre les variables est marquée. Le coefficient de corrélation résout ce problème.

* Le **coefficient de corrélation** (ou *algorithme de Pearson*) normalise la covariance par l'écart-type de chaque variable:

  $$
  r_{XY} = \frac{\displaystyle \sum_{i=1}^n (\frac{X_i - \mu_X}{\sigma_X}) \cdot (\frac{Y_i - \mu_Y}{\sigma_y})}{n}
  $$

  <details>
  <summary>python</summary>
  <pre lang="python">
  np.corrcoef(X,Y)[0][1]
  </pre>
  <pre lang="python">
  a = (X - X.mean()) / np.std(X)
  b = (Y - Y.mean()) / np.std(Y)
  print(np.dot(a, b) / len(X))
  </pre>
  </details>

* Ça va nous permettre de vérifier s'il existe une relation linéaire entre les deux variables et de vérifier si cette relation est forte ou non:

  * Correlation = 0: pas de relation entre les deux variables
  * Correlation = 1: parfaite relation linéaire positive (Y = aX)
  * Correlation = -1: parfaite relation linéaire négative (Y = -aX)
  * Entre 0.3 et -0.3: pas ou peu de relation entre les deux variables
  * &gt;0.7 ou &gt;-0.7: forte relation entre les deux variables

  ![](https://i.imgur.com/0amLsOW.png)

  ![](https://i.imgur.com/CvWS5cS.png)

## Coefficient de Détermination (R²)

* le **coefficient de détermination**  
  Est ni plus ni moins que le coefficient de corrélation mis au carré: *r²*.

  La valeur *r* est comprise entre -1 et 1 et indique la force et la direction d'une relation entre deux variables. La valeur *r²* est comprise entre 0 et 1 et indique dans quelle mesure on pourrait prédire une variable à partir de l'autre.

  Exemple: Si X est le nombre de cigarettes qu'une personne fume par semaine et Y la santé de ses poumons. Un r² de 0.7 signifie que l'usage de la cigarette prédit 70% de la variation observée sur l'état des poumons: on pourrait prédire relativement facilement la santé pulmonaire d'une personne si on sait combien de cigarettes elle fume.

## Corrélation vs Causation

Une *corrélation* signifie que deux variables bougent dans la même direction.  
Une *causation* signifie que l'une des variables fait changer l'autre.

Une corrélation n'implique pas un lien de causalilté. On peut notamment citer 4 cas où causation et corrélation sont souvent mélangées:

1. <ins>Causalité inversée</ins>  
   On veut connaître la relation entre le temps d'extraction du café et la quantité de cafféine obtenue. On constate une forte relation linéaire (corrélation) entre les deux:

   ![](https://i.imgur.com/NOA8bzj.png?1)

   On conclut que le taux en cafféine des grains de café influence le temps d'extraction. Cette conclusion est bien sûr erronée: la bonne conclusion est que le temps d'extraction influence le taux en cafféine du café.

   On a inversé le sens de la causalité: que la variable X cause Y, alors qu'en réalité la Y cause X. Il faut toujours être prudent lorsqu'on tire des conclusions avec des statistiques car les statistiques à elles seules ne peuvent rien dire sur les relations de causalité.

2. <ins>Temporalité</ins>  
   On a reccueilli des données sur la part de marché d'Internet Explorer ainsi que sur les meurtres aux États-Unis pour 100 000 habitants. On constate une relation linéaire positive — plus la part de marché d'Internet Explorer augmente, plus le nombre de meutres augmente:

   ![](https://i.imgur.com/I7lRaQj.png)

   Pourtant la variable X (les parts de marché d'Internet Explorer) n'est pas du tout liée à la variable Y (les meurtres par habitants): toutes deux évoluent <ins>au fil du temps</ins> pour des raisons différentes.

3. <ins>Troisième variable</ins>  
   On cherche à réduire les dommages causés par les incendies domestiques et on trouve une relation linéaire: plus le nombre de pompiers présents sur place est important, plus les dégats sont importants.

   ![](https://i.imgur.com/aInu5wg.png?1)

   Pourtant les pompiers ne sont pas à l'origine des dégats mais une troisième variable, qui est à l'origine des deux autres: la taille du feu.

   Un peu dans la même veine, on constate que différentes machines sensées decafféiner les grains de café n'ont pas toutes eut les mêmes résultats. On pourrait penser que le problème vient de la machine mais en regardant les configurations des machines, on constate qu'il existe un facteur sous-jacent à l'origine des résultats constatés: le temps d'extraction configuré n'était pas le même.

   ![](https://i.imgur.com/s2CX7iy.png)

Il peut être difficile de prouver une relation de causalité. Pour appuyer nos conclusions, on peut

1. <ins>Effectuer une expérience contrôlée</ins>  
   Dans une expérience contrôlée, on fait varier la variable X en gardant tous les autres facteurs constants et on regarde ce qui arrive à Y.  
   Mais il n'est pas toujours possible ou éthique de modifier une variable X et garder tout le reste constant. C'est souvent le cas dans le secteur médical et les sciences sociales.

2. <ins>Étudier la littérature</ins>  
   Chercher des arguments pour ou contre le fait qu'une relation est causale ou non.

3. <ins>Utiliser la logique</ins> et l'ordre chronologique de la variable — laquelle vient en premier.

## Corrélation partielle

* Il n'est pas rare qu'une ou plusieurs autres variables (Z) viennent fausser la corrélation entre deux variables (X et Y), laissant penser à tort à l'existance (ou l'absence) d'une liaison.

  Lorsque la variable Z est qualitative, la stratégie est simple: on distingue explicitement les groupes et on calcule *r* (le coefficient de corrélation) pour chaque groupe. Par exemple, pour contrôler l'impact du sexe sur la relation XY, on calcule séparément *r* pour le groupe "homme" et pour le groupe "femme"

  Lorsque la variable Z est quantitative, on utilise le coefficient de corrélation partielle.

### Ordre 1

* Le **coefficient de corrélation partielle** permet de mesurer la corrélation entre deux variables X et Y, en retranchant les effets d'une troisième variable Z:

  $$
  r_{XY \cdot Z} = \frac{r_{XY} - r_{XZ} \cdot r_{YZ}}{ \sqrt{1 - r_{XZ}^2 } \cdot  \sqrt{1 - r_{YZ}^2 }}
  $$

  Calculer la corrélation entre X et Y, soustraire par la corrélation entre X et Z fois la corrélation entre Y et Z. Diviser le tout par (1 moins le coefficient de détermination de X et Z) fois (1 moins le coefficient de détermination de Y et Z)

  <details>
  <summary>python</summary>
  <pre lang="python">
  rxy = np.corrcoef(X, Y)[0,1]
  rxz = np.corrcoef(X, Z)[0,1]
  ryz = np.corrcoef(Y, Z)[0,1]

  corrp  = rxy - rxz * ryz
  corrp /= np.sqrt(1 - rxz**2) * np.sqrt(1 - ryz**2) 
  corrp
  </pre>
  </details>

* Exemple: On veut utiliser la relation entre puissance (X) et consommation (Y) d'une voiture en contrôlant le rôle de la cylindrée (Z).

  Note: La cylindrée exprime le volume de la chambre des pistons en litres. Plus la cylindrée d’un moteur est importante, plus sa capacité à tirer le poids total de la voiture sera grande — la voiture aura donc une accélération plus importante et plus lisse. Une grosse cylindrée a tendance à être plus puissante mais aussi à consommer plus que de raison.  
  Il est très rare de voir des moteurs diesels avec de grosses cylindrées tout simplement parce qu’une voiture diesel, à l’instar d’un moteur essence, n’est pas à vocation sportive et l’industrie automobile n’a donc aucune raison de construire des véhicules diesel à grosse cylindrée.

  On calcule les corrélations suivantes: r<sub>xy</sub> = 0.88781, r<sub>xz</sub> = 0.94755, r<sub>yz</sub> = 0.89187.  

  $$
  r_{XY \cdot Z} = \frac{0.88781 - 0.94755 \cdot 0.89187}{\sqrt{(1 - 0.94755^2)(1 - 0.89187^2)}} = 0.29553
  $$

  On trouve donc que "cylindrée" joue beaucoup dans la relation observée entre "puissance" et "consommation". En d'autres termes, à cylindrée égale, la consommation ne varie pas avec la puissance.

[Analyse de Correlation](http://www.info.univ-angers.fr/~gh/wstat/Eda/Analyse_de_Correlation.pdf)

### Ordre 2

On appelle *ordre* le nombre de variable contrôlées.

* Un simple coefficient de corrélation, *r*, a un ordre de 0.

* Le coefficient *r<sub>xy⋅z</sub>* a un ordre de 1, puisqu'il contrôle une variable additionnelle, Z.

* Pour obtenir la corrélation partielle d'ordre *p*, on doit calculer les corrélations de toutes les variables deux à deux puis de proche en proche introduire la première variable de contrôle Z<sub>1</sub>, puis la seconde Z<sub>2</sub>, etc:

  $$
  r_{XY \cdot Z_1 Z_2} = \frac{r_{XY \cdot Z_1} - r_{XZ_2 \cdot Z_1} \cdot r_{YZ_2 \cdot Z_1}}{ \sqrt{1 - r_{XZ_2 \cdot Z_1}^2 } \cdot  \sqrt{1 - r_{YZ_2 \cdot Z_1}^2 }}
  $$

* Exemple: Mesurer la relation puissance (X) et consommation (Y) d'une voiture en contrôlant la cylindrée (Z<sub>1</sub>) et le poids (Z<sub>2</sub>)

  On calcule les corrélations suivantes: r<sub>xy ⋅ z1</sub> = 0.2955, r<sub>xz2 ⋅ z1</sub> = 0.6878, r<sub>yz2 ⋅ z1</sub> = 0.1663.

  $$
  r_{XY \cdot Z_1 Z_2} = \frac{0.2955 - 0.6878 \cdot 0.1663}{\sqrt{(1 - 0.6878^2)(1 - 0.1663^2)}} = 0.25309
  $$

## Ajustement

* Effectuer un *ajustement de y en x* d'un nuage de points consiste à trouver une fonction f telle que la courbe d'équation y = f(x) passe "le plus près possible" des points du nuage.

  Étudier la forme du nuage de points permet de se faire une idée du type de liaison entre x et y.

  ![](https://i.imgur.com/XSAxyXH.jpg)

* Pour les statisticiens, une formule telle que y = f(x) est appelée un *modèle*.  
  x est la variable *explicative* et y la variable *expliquée*

* Plusieurs critères sont possibles pour définir ce qu'on entend par "le plus près possible".  
  La méthode la plus employée est celle des "moindres carrés".

  Exemple: [Régression linéaire](../machine-learning/linear-regression)