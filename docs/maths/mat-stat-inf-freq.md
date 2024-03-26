---
title: Inférences fréquentistes
category: Maths, Statistiques, Statistiques inférentielles
latex: true
---

## Test statistique

* Un **test statistique** repose sur un raisonnement par l'absurde (*reductio ad absurdum*): plutôt que de chercher à prouver qu'une hypothèse est vraie, on montre que l'inverse nous mènerai à une situation absurde — prouvant ainsi son contraire.

* Ex: Avec les données de 60 personnes, on constate que le nombre moyen de calories consommées par jour est 2400kcal, avec un écart-type de 500kcal. Notre hypothèse est qu'une activité intellectuelle intense dépense une quantité importante de calories.

  On demande à 60 personnes de réaliser une tâche complexe pendant 2h et on constate une consommation moyenne de 3000kcal. On doit se demander à quel point il serait rare ou "absurde" d'obtenir ces résultats s'il n'y avait pas de rapport entre calories et activité intellectuelle. Et si on obtenait 2500kcal?

* Intuitivement, on sait que la réponse à cette question dépend 1. de la taille des groupes utilisés, 2. de la différence de moyenne observée, 3. de la dispersion des données.

  Les tests statistiques vont nous permettre de définir à partir de quand on considerera comme absurde de penser qu'une différence est dû au hasard (des fluctuations d'échantillonage) et qu'il s'agit donc d'un réel effet dans la population représentée par l'échantillon.

* On ne peut pas prouver que quelque chose n'existe pas, uniquement que quelque chose existe. Il n'est donc pas possible de prouver l'hypothèse nulle avec un échantillon, on peut uniquement dire qu'on ne peut pas rejeter cette hypothèse.

  Ex: On déclare qu'il n'y a pas de cygnes noirs en Chine. Vous allez en Chine regarder les cygnes et aucun d'entre eux n'est noir. Vous pouvez, au bout d'un certain moment, décider qu'il est peu probable qu'il y en ait... mais vous ne pouvez pas prouver qu'il n'y en a pas avant d'avoir vu tous les cygnes qui existent.

## Tests

Il existe différents tests possibles, à choisir selon le type des données (qualitatives ou quantitatives) et leur distribution (normale, binomiale, poisson, etc). On trouve notamment:

* des tests *paramétriques*  
  Sont des tests dans lesquels les hypothèses sont formulées à propos des paramètres de population (moyenne, écart-type, etc). Ils sont limités aux données qui suivent une loi normale et sont continues:

  | Test&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | Objectif
  |---                     |---
  | 1 sample T-Test        | Comparer la moyenne d'un échantillon et de la population <sup>(1)</sup>.<br> Ex: la durée du sommeil des étudiants vs la population globale
  | 2 sample Paired T-Test | Comparer la moyenne de deux échantillons appariés <sup>(2)</sup>.<br> Ex: la moyenne en maths vs la moyenne en anglais des étudiants
  | 2 sample T-Test        | Comparer la moyenne de deux échantillons indépendants.<br> Ex: le temps au 100-mètres des athlètes vs non-athlètes
  | 1 sample F-Test<br> (aka. 1-way ANOVA)        | Utilisé quand la variable dépendante est continue et la variable indépendante est catégorique. Groupe les données en fonction du facteur d'influence (catégorie) et vérifie si ces groupes ont une moyenne égale ou non <sup>(3)</sup><br> Ex: les ventes enregistrées en fonction du type de publicité employé (magazine, panneau d'affichage, télévision)
  | 2 sample F-Test<br> (aka. 2-way ANOVA)         | Utilisé quand la variable dépendante est continue et il y a 2 variables indépendantes catégoriques.<br> Ex: les ventes enregistrées en fonction du type de publicité employé + coupon de réduction

   * (1): Les T-Tests utilisent la distribution T (distribution Z ajustée pour une petite taille d'échantillon). Les Z-Tests utilisent la distribution Z. Un T-Test nécessite une information supplémentaire par rapport au Z-test: le degré de liberté — qui est calculé à partir de la taille de l'échantillon. Avec une taille d'échantillon suffisante (&gt; 30), on peut utiliser un Z-test directement.

   * (2): Quand on compare une même population dans deux situations différentes (ex avant/après), alors on dit que les échantillons sont *appariés*.

   * (3): ANOVA utilise la variance, ANCOVA utilise la covariance.

* des tests *non paramétriques*  
  Sont des tests qui ne reposent pas sur des hypothèses sous-jacentes, telle que la distribution des données. Ils sont utilisés quand les pré-requis des tests paramétriques ne sont pas remplis (ex: variable dépendante quantitative, données qui ne suivent pas la loi normale)

  | Test                 | Objectif
  |---                   |---
  | Wilcoxon - Sign Test | Comparer deux échantillons appariés.<br> Ex: le taux de glucose sanguin avant et après traitement.
  | Friedman Test        | Comparer plus de deux échantillons appariés.<br> Ex: le taux de glucose sanguin avant, 1 semaine après le traitement, et 2 semaines après
  | Mann-Whitney Test    | Comparer deux échantillons indépendants.<br> Ex: les ventes du design A vs design B
  | Kruskal-Walls Test   | Comparer plus de deux échantillons indépendants.<br> Ex: ventes du design A, B et C
  | Chi-Square Test      | Vérifier la dépendance de variables catégoriques.<br> Ex: sexe (M/F) vs fumer (Y/N)

[Table d'utilisation des tests statistiques](https://fr.wikipedia.org/wiki/Table_d%27utilisation_des_tests_statistiques)


<details>
<summary>python</summary>

<pre lang="python">
# 1 sample T-test
from scipy.stats import ttest_1samp
stats,p = ttest_1samp(df[df['Gender'] == 'F'].MonthlyIncome.mean(), df.MonthlyIncome.mean())

print("p-value:", p)
print("reject H0:", p<0.05)
</pre>

<pre lang="python">
# 2 sample paired T-test
from scipy.stats import ttest_rel
stats,p = ttest_rel(df.before.mean(), df.after.mean())
</pre>

<pre lang="python">
# 2 sample T-test
from scipy.stats import ttest_ind
stats,p = ttest_rel(df[df['Athlete'] == 1].mean(), df[df['Athlete'] == 0].mean())
</pre>

<pre lang="python">
# wilcoxon-sign test
from scipy.stats import wilcoxon
stats,p = wilcoxon(df.before, df.after)
</pre>

<pre lang="python">
# friedman Test
from scipy.stats import friedmanchisquare
stats,p = friedmanchisquare(df.before, df.week1, df.week2)
</pre>

<pre lang="python">
# mann-whitney test
from scipy.stats import mannwhitneyu
stats,p = mannwhitneyu(
    df[df['EducationField'] == 'Medical'].TrainingTimesLastYear,
    df[df['EducationField'] != 'Medical'].TrainingTimesLastYear)
</pre>

<pre lang="python">
# kruskal-walls test
from scipy.stats import kruskal
stats,p = kruskal(
    df[df.MaritalStatus == 'Married'].JobLevel,
    df[df.MaritalStatus == 'Single'].JobLevel,
    df[df.MaritalStatus == 'Divorced'].JobLevel)
</pre>

<pre lang="python">
# chi-square test
from scipy.stats import chi2_contingency
chitable = pd.crosstab(df.MaritalStatus,df.BusinessTravel)
stats,p,dof,expected = chi2_contingency(chitable)
</pre>

<pre lang="python">
# one-way anova
import statsmodels.api as sm
from statsmodels.formula.api import ols

model  = ols('Sales~C(Promotion)', df).fit()
oneway = sm.stats.anova_lm(model, typ=2)
print(oneway)

'''
ols  : ordinary least square
sales: dependant variables
C    : independant (categorical) variable
'''
</pre>

<pre lang="python">
# two-way anova
model  = ols('Sales~C(Promotion)+C(Coupon)', df).fit()
twoway = sm.stats.anova_lm(model, typ=2)
print(twoway)
</pre>

<pre lang="python">
# ancova
model  = ols('Sales~C(Promotion)+C(Coupon)+ClietelRatings', df).fit()
ancova = sm.stats.anova_lm(model,typ=2)
print(ancova)
</pre>
</details>

---

## Seuil de significativité

Le *seuil de significativité* (*significance level* en anglais), aussi appelé *risque de premier degré* (*type I error*), est le risque qu'on est prêt à accepter de faussement rejeter l'hypothèse nulle. Autrement dit, d'affirmer qu'il serait absurde de considérer que les résultats obtenus sont dûs au hasard alors que c'est le cas — et donc de dire qu'il existe une véritable différence entre les échantillons alors que ce n'est pas le cas.

$$
\alpha = P(\text{rejeter } H_0 | H_0 \text{ vrai})
$$

Le seuil de significativité est une probabilité (une valeur entre 0 et 1) et on le note &alpha; (alpha).  
&alpha; = 0.05 indique qu'on accepte un risque de 5% (5 fois sur 100) de conclure à une différence alors qu'en vérité il n'y en a pas. On peut choisir un risque plus bas, typiquement en médicine on prendra 1%, mais choisir un risque plus grand serait accompagné d'une telle incertitude qu'il serait déraisonnable de s'y fier.

---

## Puissance d'un test

* Le risque &alpha; (alpha), ou risque de premier degré, est le risque de rejeter H<sub>0</sub> si H<sub>0</sub> est vraie — et donc de se tromper en concluant à un effet qui n'existe pas. Si &alpha; = 0.03: il y a 3 chances sur 100 de se tromper.

* Le risque &beta; (beta), ou risque de second degré, est le risque de ne pas rejeter H<sub>0</sub> si H<sub>1</sub> est vraie — et donc de se tromper en disant qu'il n'y a pas d'effet statistiquement significatif. On ne sait pas quantifier &beta;.

  ![](https://i.imgur.com/dx2iIXem.png)

* Si on augmente la taille de l'échantillon, alors on diminue le risque de se tromper. On appelle *puissance d'un test* la valeur (1 - &beta;) et on peut dire que la puissance d'un test est lié à la taille des échantillons. Si on désire une faible différence, il faut un test puissant, donc une taille d'échantillon élevée.

* Il existe pour chaque test des formules pour calculer la taille d'échantillon nécessaire pour mettre en évidence une différence espérée. Pour effectuer le calcul, les logiciels qui effectuent ce type de calcul demande
  * la différence minimale qu'on désire identifier
  * l'écart-type de cette différence  
    (a priori, on ne le sait pas, il faudra des études pilote pour en avoir un ordre de grandeur)
  * le risque &alpha; consenti
  * le risque &beta; consenti

  Le risque &beta; est souvent de l'ordre de 20 ou 25%, d'une part parce qu'on considère comme moins grave de ne pas voir une proposition qui existerait que d'affirmer une proposition qui n'existe pas, d'autre part parce que plus beta est petit, plus l'échantillon devra être grand (grandit de taille exponentielle).

---

## Intervalle de confiance

* Un *intervalle de confiance* (*confidence interval*) est une fourchette de valeurs considérées comme raisonnables sur la base de nos observations.

  * <ins>bilatéral</ins> (*two-tailed*)  
    Son centre est toujours la moyenne de l'échantillon mais avec une certaine marge de part et d'autre pour réfleter notre incertitude. Si on utilise un alpha de 5%, alors l'intervalle de confiance sera de 95% et la marge de part est d'autre sera de 2.5% (&alpha;/2).

    ![](https://i.imgur.com/xetJUYl.png)

  * <ins>unilatéral</ins> (*one-tailed*)  
    Dans certains cas, on peut considérer que notre incertitude ne peut aller que dans un seul sens — la moyenne sera forcemment supérieure à celle observée, ou inversemment, forcemment inférieure. Dans ce cas, la marge ne sera que d'un seul côté (&alpha;). L'intéret de poser une hypothèse unilatérale va être d'augmenter la puissance du test.

    ![](https://i.imgur.com/BLxjTgSm.png)
    ![](https://i.imgur.com/tw6AmPAm.png)

* Les *valeurs critiques* sont les bornes de l'intervalle de confiance.  
  Pour déterminer les valeurs critiques:

  1. Chercher à quel z-score correspond les percentiles (&alpha;/2) et (1 - &alpha;/2) dans la distribution Z — ou (&alpha;) pour un intervalle unilatéral avec zone de rejection à gauche, (1 - &alpha;) pour à droite. Pour rappel, le z-score (ou écart-réduit) est le nombre d'écart-type entre une valeur donnée et la moyenne.

     Pour un alpha de 5%, on cherche le z-score correspondant à +2.5+ et +97.5% sur la distribution cumulative Z. On lit sur la table Z une valeur de 1.96.

    ![](https://i.imgur.com/wFHstId.png)

    * La distribution normale est symmétrique, on peut donc dire que

      $$
      \begin{aligned}
      z &=  CDF(1 - \frac{\alpha}{2}) \\
        &= -CDF(\frac{\alpha}{2})
      \end{aligned}
      $$

      Et on aura la relation suivante:

      $$
      \begin{aligned}
      P(Z < 1.96)  &= .9750 \\
      P(Z < -1.96) &= 1 - .9750 = .0250
      \end{aligned}
      $$

    * Les valeurs de Z pour les intervalles de confiance usuels sont:

      | C   | z
      |---  |---
      | 99% | 2.576
      | 98% | 2.326
      | 95% | 1.96
      | 90% | 1.645

  2. Ce n'est pas nécessaire pour un test statistique puisque le résultat d'un test statistique sera sur l'échelle de la distribution choisie, mais connaissant le z-score (valeur sur une distribution normale centrée réduite), on peut calculer les valeurs critiques sur notre distribution (valeur sur une distribution normale dont on connaît la moyenne et l'écart-type):

      $$
      \text{Valeur critique inférieure: } \mu - z*\sigma \\
      \text{Valeur critique supérieure: } \mu + z*\sigma
      $$

      <pre>
      Exemple: On a noté les calories de 49 gateaux au chocolat.
      On a trouvé une moyenne de 3000 calories et un écart-type de 500 calories.

      Cette moyenne n'est pas nécessaire la moyenne de la polulation entière mais sera
      vraissemblablement proche. On utilise un intervalle de confiance de 95% (donc z = 1.96)
      pour estimer la fourchette de valeurs qui paraissent raisonnables.  
      Comme on ne connaît pas l'écart-type de la population, on utilisera l'erreur-type (&sigma;<sub>sample</sub>/&radic;n).

      Vinf = moyenne - zscore * (ecart-type_echantillon/&radic;taille_echantillon)
           = 3000 - 1.96 * (500/49**0.5)
           = 2860

      Vsup = moyenne + zscore * (ecart-type_echantillon/&radic;taille_echantillon)
           = 3000 + 1.96 * (500/49**0.5)
           = 3140
      </pre>

* Avec un intervalle de confiance de 95%:  
  Si on calculait un intervalle de confiance à partir de 100 échantillons différents, environ 95 d'entre eux contiendraient la véritable moyenne de la population.
  Notre "confiance" réside dans le fait que cet intervalle n'exclura la moyenne de la population que dans 5% des cas. On peut réduire ce risque en choisissant un &alpha; plus petit (et la fourchette sera plus grande) mais si on voulait réduire ce risque à 0%, la fourchette serait [-&infin;;+&infin;]

* Dans le cadre d'un test statistique, l'intervalle de confiance sera utilisée pour déterminer si on rejette ou non l'hypothèse nulle: on pourra rejetter l'hypothèse nulle si la valeur observée dans le groupe test est en dehors de l'intervalle de confiance du groupe contrôle (= une vraie différence).

  ![](https://i.imgur.com/0cZwSxs.jpg?1)

---

## Degrés de liberté

Les tests statistiques T test, F test et chi-2 nécessitent de connaître le *degré de liberté* des données (*degree of freedom* en anglais), c'est à dire le nombre de variables pouvant librement varier, pour déterminer la valeur critique à utiliser.

* <ins>Intuition</ins>:

  * Si on prend un système d'axe en 2 dimensions, et qu'on veut tracer une droite dans cet espace, on peut ici tracer la droite dans n'importe quel sens, on est totalement libre.
    On a en fait 2 degrés de liberté, qui correspondent aux 2 paramètres de la droite qu'on peut modifier: la pente *a* et l'ordonnée à l'origine *b* — dans f(x) = ax + b.

    ![](https://i.imgur.com/VjIo4Pg.jpg)

  * Si on impose le paramètre *a*, on réduit le champ des possibilités à l'ensemble des droites parallèles de pente *a*. On a plus qu'1 degré de liberté. Et de même, si on impose le paramètre *b*, on réduit le champ des possibilités au faisceau de droites passant par l'ordonnée à l'origine *b*: 1 degré de liberté.

    ![](https://i.imgur.com/yzyCG5Sm.png)
    ![](https://i.imgur.com/vV6wzRxm.png)

  * Si on impose le paramètre *a* et *b*, alors on a plus aucune liberté, il n'y a qu'une seule droite possible: 0 degré de liberté.

    ![](https://i.imgur.com/2IMzIicm.png)

* <ins>Exemple</ins>:

  <pre>
  Vous devez suivre 10 cours différents pour obtenir votre diplôme et seuls
  10 cours différents sont proposés. Les 9 premiers semestres, vous pourrez choisir
  entre différents cours (avec de moins en moins de liberté), le 10ème semestre vous
  n'aurez plus de choix — il n'y a plus qu'un seul cours possible. Vous aviez 9 degrés
  de liberté.

  ddl = nombre de lignes - nombres de colonnes
      = 10 - 1
      = 9
  </pre>

  <pre>
  Si vous avez à votre disposition un tableau de contigence (tableau croisé avec le total sur
  chaque ligne et colonne), alors vous allez avoir la liberté de choisir (L-1)(C-1) valeurs: les
  autres valeurs seront imposées soit par le total de la ligne soit par le total de la colonne.

     | +   | -   | tt
  A  |     |     | 24
  B  |     |     | 54
  C  |     |     | 76
  tt | 37  | 115 | 152

  ddl = (nombre de lignes - 1)(nombre de colonnes - 1)
      = (3-1)(2-1)
      = 2*1 = 2
  </pre>

* <ins>Dans les tests statistiques</ins>:

  La manière de calculer de degré de liberté dépend du test utilisé puisqu'il dépend de la relation des données avec les indicateurs utilisés (somme, moyenne, etc):

  ![](https://i.imgur.com/mCuXCcGl.png)

  [Vidéo: degrés de liberté](https://www.youtube.com/watch?v=AsT4moSDsUA)

---

## Effectuer un test statistique

1. Formuler vos hypothèses  
   Le magazine X affirme que le coût moyen d'une chambre d'hôtel à New York est de 168$ par nuit. Pour déterminer si c'est vrai, vous avez pris au hasard 25 hôtels et obtenu un moyenne de 172,50$ avec un écart-type de 15,40$. Une moyenne de 168$ est-elle vraissemblable?

   <pre>
   H0: Pas d'effet remarqué, on peut dire que &mu; = 168
   H1: On remarque une différence significative, on peut dire que &mu; &ne; 168
   </pre>

2. Sélectionner le test statistique approprié  
   <pre>1 sample T-Test (bilatéral)</pre>

3. Choisir le seuil de significativité  
   <pre>&alpha; = 0.05</pre>

4. Calculer le degré de liberté (si nécessaire) et les valeurs critiques

   <pre>
   ddl = 25-1 = 24
   z   = <a href="https://d2h0cx97tjks2p.cloudfront.net/blogs/wp-content/uploads/sites/2/2018/10/T-table.png">ttable</a>(bilateral 0.05, ddl 24) = 2.064
   </pre>

5. Calculer le test statistique

   <pre>
   T test = (X - &mu;)/(S/&radic;n)
          = (172.5-168)/(15.4/&radic;25)
          = 4.5/3.08
          = 1.46
   </pre>

6. Comparer la valeur calculées et les valeurs critiques, conclure

   <pre>-2.064 &lt; 1.45 &lt; 2.064

   1.46 est dans l'intervalle de confiance  
   Conclusion: on ne peut pas rejeter H0  
   Rien ne prouve que la moyenne est différente de 168$,
   &mu; = 168 est une moyenne vraissemblable
   </pre>

---

## Le petit p

* Une approche alternative à l'utilisation des valeurs critique est l'utilisation du *petit p* (*p-value* en anglais). Le petit p et les valeurs critiques permettent de faire la même chose (déterminer si l'on rejette l'hypothèse nulle ou non) mais d'une manière différente.

  ![](https://i.imgur.com/1vj3KW1.png)

* <ins>Approche classique</ins>: calculer les valeurs critiques et comparer avec le résultat du test statistique.

  <ins>Approche petit p</ins>: calculer la probabilité d'obtenir une valeur inférieure ou égale au résultat du test statistique. Si p < &alpha; on rejettera l'hypothèse nulle.

  Le petit p est la probabilité d'observer une valeur aussi extrême que la valeur observée si l'hypothèse nulle est vraie (c'est à dire si les deux échantillons font partie de la même population). Si cette probabilité est très basse, on en conclut que les échantillons représentent deux populations différentes. Si cette probabilité n'est pas suffisamment base, on ne peut pas conclure à une différence significative.

  ![](https://i.imgur.com/yWNJgku.png)

Pour aller plus loin: [Hypothesis tests with Python](https://medium.com/analytics-vidhya/hypothesis-tests-with-python-bfff05955c43)

---

## Les limites des tests statistiques

1. Le petit p ne donne pas la probabilité que l'hypothèse nulle soit vraie ou fausse, mais la probabilité de pouvoir reproduire les résultats obtenus.

   Ex: Un petit p de 0.02 n'indique pas qu'il y a 2% de chances que l'hypothèse nulle soit vraie (ce serait comme dire "en partant du principe que l'herbe est verte, quelle est la probabilité que l'herbe soit verte?"). Le petit p indique qu'on s'attend à ce que 2% des études menées à l'identique produisent une différence au moins aussi importante que celle observée si l'hypothèse nulle est vraie.

2. Les tests statistiques reposent sur la supposition que les tests seront répétés, mais bien souvent ils ne le sont pas, ce qui nous mène à conclure à tort à des différences qui n'existent pas ou à l'absence de preuve.

   Ex: On pense que le temps de réaction des joueurs d'échec professionels plus âgés est différent du temps de réaction des joueurs d'échec plus jeunes. Même s'il n'y avait aucune différence entre les deux, et qu'on répétait cette étude à l'infini, en utilisant un alpha de 0.05 on rejeterai l'hypothèse nulle 5% des cas.

3. On ne peut pas prouver l'hypothèse nulle. On veut parfois prouver qu'il n'y a pas d'effet entre deux éléments, mais les tests statistiques ne nous permettent que de conclure qu'il n'y a pas de preuve de l'existence d'une relation entre les deux.

4. Si on rejette l'hypothèse nulle, on a malgré tout très peu d'information sur l'alternative. Est-ce une différence importante ou minime?

Pour faire face à ces limites, on peut utiliser les inférences bayesiennes.
