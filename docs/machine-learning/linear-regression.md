---
title: Régression linéaire
category: Machine learning, algo
latex: true
---

Une régression linéaire est un algorithme supervisé de regression.

## Qu'est-ce que c'est

* On a un ensemble de données composé de valeurs indépendantes X et une valeur dépendante Y. Il est facile de représenter les données et voir ce qu'il se passe lorsqu'on a une seule valeur indépendante:

  ![](https://i.imgur.com/M8wSVChl.png)

  Ici, tous les points ne sont pas alignés mais suivent une tendance linéaire. On peut imaginer une droite qui suit cette tendance (dessinée en rouge) pour décrire au mieux cette relation linéaire. La regression linéaire permet de trouver cette droite.

  On peut ensuite utiliser la droite trouvée pour prédire la valeur de la variable dépendante à partir de valeurs indépendantes qui ne font pas partie de l'ensemble de données — tant qu'on reste dans l'intervalle connu.

  ![](https://i.imgur.com/WiuZgIa.png)

## Regression

* Une *régression* analyse la relation de *dépendance* entre deux variables: on tente de prédire les valeurs d'une variable dépendante continue, à partir des valeurs d'une variable indépendante continue (ou plusieurs), en déterminant le coefficient qui les relie. Autrement dit, on veut mesurer de combien une variable affecte une autre variable.

  Une *corrélation* analyse la relation d'*interdépendance* entre deux variables: on vérifie simplement si les variables sont liées entre elles sans préciser le rapport entre les deux.

* Un regression *linéaire* cherche à trouver une fonction de la forme

  $$
  f(X): y = A_1 X_1 + A_2 X_2 + \cdots + A_n X_n + b
  $$

  On cherche donc à trouver les coefficients (A<sub>1</sub>...A<sub>n</sub>) permettant d'associer les variables indépendantes (X<sub>1</sub>...X<sub>n</sub>) à la variable dépendante (Y). Pour simplifier l'écriture, définit X<sub>0</sub> = 1, ce qui nous permet d'écrire:

  $$
  \begin{aligned}
  f(X): y &= A_0 X_0 + A_1 X_1 + \cdots + A_n X_n \\
          &= A^T X
  \end{aligned}
  $$

  (où A<sub>0</sub> joue le rôle de *b* — l'ordonnée à l'origine, parfois appelé *biais*, *offset* ou *intercept*)

* Si on a que deux caractéristiques (x et y), on cherche à trouver une ligne (2D) — f(x) = ax + b. Dans ce cas, on parle de régression linéaire *simple*.

  Dans le cas où on a plus de deux caractéristiques, on cherche à trouver un plan (3D) ou un hyperplan (4D ou plus): on parle de regression linéaire *multiple*.

* Pour qu'une regression linéaire fonctionne correctement, les variables indépendantes ne doivent pas être correlées entre elles — mais être corrélés avec la variable cible.

---

## Fonction coût

* On appelle *résidu* ou *erreur* la différence verticale entre un point (y) et sa prédiction (f(x)).  
  On veut trouver une droite qui passe au plus près des points, donc minimiser la somme des résidus.

  ![](https://i.imgur.com/EbkcJit.png)

* Une erreur positive (y > f(x)) sur un point *a* ne doit pas annuler une erreur négative (y < f(x)) sur un point *b*: on peut donc soit prendre la valeur absolue des erreurs soit leur carré.

  La carré a une dérivée continue, il est donc plus facile d'utiliser le carré pour résoudre ce problème — on peut résoudre le problème avec des valeurs absolues en utilisant le gradient descent et non une équation normale. Le carré va davantage pénaliser les larges résidus et est donc plus sensible aux valeurs extrêmes.

  $$
  \text{Minimiser } \\
  \begin{aligned}
  J(a) = & \sum_{i=1}^n (f(x_i) - y_i)^2 \\
  =& \sum_{i=1}^n (a_i x_i - y_i )^2 \\[10pt]

  &\text{Notation vectorielle } \\
  =& (aX - y)^2 \\
  \end{aligned}
  $$

## Minimiser la fonction coût

* Pour trouver la valeur de *w* qui minimise l'erreur, on a deux possibilités:
  1. <ins>gradient descent</ins>: initialiser aléatoirement *w* et mettre à jour sa valeur avec de multiples itérations (en calculant la dérivé)
  2. <ins>équation normale</ins>: résout la valeur *w* d'un seul coup

  | Gradient descent | Équation normale
  |---               |---
  | O(kn<sup>2</sup>): Fonctionne très bien même avec un grand nombre d'attributs. | O(n<sup>3</sup>): À partir de n = 10<sup>6</sup>, on  devra utiliser le gradient descent.
  | Fonctionne également sur les algorithmes plus sophistiqués, qui n'ont pas de solution analytique — comme la regression logistique. | Permet de trouver la bonne réponse directement (et non pas d'itérer/converger vers la valeur)
  | Nécessite de normaliser les données au préalable<br> Nécessite de choisir &lambda; | &nbsp;

---

## 1. Équation normale

La méthode des moindres carrés (*ordinary least square [OLS]* en anglais) permet de mesurer l'erreur entre les prédictions et les valeurs réelles. On peut trouver la valeur de *A* qui minimise cette erreur en résolvant l'équation:

  $$\text{Équation normale: }\\
  a = (X^T X)^{-1} ⋅ X^T y$$

<details>
<summary>preuve</summary>
<img src="https://i.imgur.com/z6Iwxab.png">
</details>

<details>
<summary>python</summary>

<pre lang="python">
# Add intercept
m  = len(X)
b  = np.ones((m,1))
Xb = np.concatenate([b, X], axis=1)

# Fit
tmp1 = Xb.T.dot(Xb)
tmp2 = Xb.T.dot(y)

'''
Matrix inverse is slow and introduces unnecessary error
Anytime you see the math written as: x = A^-1 * b
you instead want: x = np.linalg.solve(A, b)
'''
a = np.linalg.solve(tmp1, tmp2)
print('coefficient:', a)

# Predict
y_pred = np.dot(Xb, a)
</pre>

<pre lang="python">
import statsmodels.api as sm

# Add intercept
Xb = sm.add_constant(X)

# Fit
est = sm.OLS(y, Xb).fit()
print('coefficient: ', est.params)
est.summary()

# Predict
y_pred = est.predict(Xb)
</pre>

<pre lang="python">
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(Xb, Y)

a = model.coef_
b = model.intercept_
print(a, b)

# Predict
y_pred = model.predict(Xb)
</pre>
</details>

[Linear Regression OLS.ipynb](notebooks/Linear Regression OLS.html)  
[8 ways to do linear regression and their speed](https://www.freecodecamp.org/news/data-science-with-python-8-ways-to-do-linear-regression-and-measure-their-speed-b5577d75f8b/)

<!--
https://igm.univ-mlv.fr/~vnozick/teaching/slides/imac2_math/05_moindresCarres.pdf

http://php.iai.heig-vd.ch/~lzo/metrologie/cours/5_Moindres%20carres.pdf

http://www.tony-bourdier.fr/data/MoindresCarr%C3%A9s.pdf

https://towardsdatascience.com/least-squares-linear-regression-in-python-54b87fc49e77

http://mlwiki.org/index.php/Normal_Equation
-->

## 2. Gradient Descent

Une autre approche pour minimiser la fonction coût est le gradient descent. 

1. On initialise les coefficients *A* aléatoirement.
2. On calcule la dérivée de la fonction coût (ce qui nous indique si en changeant légèrement *A*, le coût augmente ou diminue, et si c'est de beaucoup ou de peu).
3. On met à jour *A* en soustrayant une fraction de la valeur obtenue. À la prochaine itération, l'erreur sera donc plus petite que précédemment.
4. On répète les étapes 2 et 3, jusqu'à éventuellement converger vers la "vraie" valeur — c'est au développeur de décider quand s'arrêter

$$
\text{Répéter jusqu'à convergence } \\
\begin{aligned}
a &= a - \alpha \times J(a)' \\
  &= a - \alpha \times \left[ \frac{1}{2n} \sum_{i=1}^n (a_i x_i - y_i )^2 \right]'\\
  &= a - \alpha \times \frac{1}{n} \sum_{i=1}^n (a_i x_i - y_i ) \cdot x_i
\end{aligned}
$$

Notons que pour plus de simplicité, on minimise ici la moitié de la moyenne des erreurs, ce qui revient au même que minimiser la somme des erreurs mais nous évite de travailler avec des fractions.

<details>
<summary>python</summary>

<pre lang="python">
def gradientDescent(X, y, theta, alpha, epochs):
    m = len(y)

    for i in range(epochs):
        gradient = (X.T.dot(X.dot(theta) - y)) / m
        theta   -= alpha * gradient

    return theta

b, a = gradientDescent(Xb, Y, theta=theta, alpha=0.01, epochs=5000)
print(b,a)
</pre>
</details>

[Linear Regression Gradient.ipynb](notebooks/Linear Regression Gradient.html)

### Gradient descent Gotchas

* On a deux hyper-paramètres à définir (des hyper-paramètres sont des paramètres qui ne sont pas calculés par l'algorithme, mais qui doivent être définis par le développeur):
  * le nombre d'itérations, dit *epochs*
  * le taux d'apprentissage, dit *learning rate* ou *alpha*

* <ins>Epochs</ins>:  
  Si le gradient fonctionne correctement, alors le coût devrait diminuer après chaque itération. Au début de beaucoup, puisque que la pente de la dérivée est importante: les valeurs de *a* vont rapidement être ajustés. Puis de moins en moins, jusqu'à éventuellement stagner — converger.

  Pour décider du nombre d'itérations nécessaires, on peut donc tracer le graphique du coût et vérifier si l'algorithme a convergé — sinon, continuer.

  ![](https://i.imgur.com/SMpHaYgm.png)

  On peut également mettre au point un test de convergence automatique (*early stop*): par exemple, cesser d'itérer lorsque le coût diminue de moins de 0.001 en une itération. Mais le choix du seuil approprié peut être difficile.

* <ins>Learning rate</ins>:  
  Si le taux choisit est trop élevé, l'algorithme ne parviendra pas à converger.  
  S'il est trop bas, il prendra du temps à converger.  
    On commence généralement avec 0.1 ou 0.01 et on ajuste suivant les résultats obtenus.

  ![](https://i.imgur.com/Km4yPXN.png)

* <ins>Normalisation</ins>:  
  Si l'intervalle des données en entrée est important, l'algorithme va mettre du temps avant de converger.  
  On peut réduire le nombre d'epochs nécessaire en normalisant les données au préalable, c'est à dire en mettant la fourchette des données en entrées dans un intervalle réduit, typiquement entre -1 et 1

  <details>
  <summary>python</summary>

  <pre lang="python">
  # Mean normalization (-1,1): (x - mu)/(max - min)
  def normalize(x):
      _min = x.min()
      _max = x.max()
      _mu  = x.mean()
      return (x - _mu)/(_max - _min)

  X = np.random.randint(50, 100, size=100)
  normalize(X)
  </pre>

  <pre lang="python">
  # Min normalization (0,1): (x - min)/(max - min)
  from sklearn.preprocessing import MinMaxScaler

  scaler  = MinMaxScaler()
  X_train = scaler.fit_transform(X_train)
  X_test  = scaler.transform(X_test)
  </pre>

  <pre lang="python">
  # Standardization: (x - mu)/std
  from sklearn.preprocessing import StandardScaler

  scaler  = StandardScaler()
  X_train = scaler.fit_transform(X_train)
  X_test  = scaler.transform(X_test)
  </pre>

  </details>

---

## Analyser les résultats: exemple

Une usine de production de thé (qui met du thé en sachet) a parfois des sachets qui se cassent pendant le processus d'emballage et souhaite réduire ces défauts. À première vue, il semble que le nombre de sachets cassés augmente au fur et à mesure que le nombre d'arrêts de production augmente.

1. <ins>Calculer la ligne de regression</ins>

   ![](https://i.imgur.com/EJG4x9f.png?1)

   Ici, avec 0 arrêts, on s'attend à 6.3 défauts. Puis pour chaque arrêt supplémentaire, à 1.944 défauts supplémentaires.

   Avec 3 arrêts, on s'attend donc à (6.306 + 1.944*3 = 12.138) 12 défauts en moyenne.  
  Notons qu'on ne peut effectuer des prédictions que sur la fourchette de données qu'on connaît: on ne pourra pas estimer le nombre de défauts pour 25 arrêts, puisqu'on a pas de données sur cet intervalle (mais de 0 à 9 uniquement).

2. <ins>Vérifier r²</ins>  
   La formule obtenue est la ligne la plus appropriée entre les variables indépendantes et la variable dépendante.

   Pour déterminer si cette relation est significative (si on peut vraiment se fier aux prédictions effectuées avec), on peut regarder la valeur p: si elle est inférieure à 0.05, on conclut qu'il existe une relation significative entre les variables.  
  On peut également regarder r², si la  valeur est élevée alors la ou les variable(s) indépendante(s) explique(nt) en grande partie la variable dépendante.

   ![](https://i.imgur.com/VtBz3PD.png)

   ![](https://i.imgur.com/6Vki81M.png)

    <details>
    <summary>python</summary>
    <pre lang="python">
    # sum of square of residuals
    ssr = np.sum((y_pred - y_actual)**2)

    #  total sum of squares
    sst = np.sum((y_actual - np.mean(y_actual))**2)

    # R2 score
    r2_score = 1 - (ssr/sst)
    </pre>

    <pre lang="python">
    from sklearn.metrics import r2_score

    r_square = r2_score(y_test, y_pred)
    </pre>
    </details>

3. <ins>Analyser les résidus</ins>  
   Les résidus sont la différence entre les valeurs observées (Y) et les valeurs prédites (résultat de f(X)).

   ![](https://i.imgur.com/LgYzSlOm.png)

   * Les résidus devraient être normalement distribués.

     ![](https://i.imgur.com/pfYc8iT.png)

   * S'il y a des valeurs extrêmes (comme ci-dessous), une solution possible est de les supprimer. Comparer le modèle obtenu avec et sans.

     ![](https://i.imgur.com/FNpqpr5.png)

   * S'il s'agit d'un problème de non-linéarité, essayer une regression polynomiale.

     ![](https://i.imgur.com/Jy0IKKe.png)

* <ins>Intervalle de prédiction</ins>  
  Si on veut garder le nombre de défauts inférieurs à 15, on peut regarder la ligne et aller jusqu'à 15: 5 arrêts par jour. Mais il s'agit d'une moyenne, on pourra toujours avoir des jours plus et des jours moins.  
   Pour un nombre de défauts inférieur à 15 la plupart du temps (qu'on définira comme 97.5% des jours), alors on doit calculer l'intervalle de prédiction, c'est à dire la ligne ajustée à +/- 2 fois l'écart-type des résidus — ainsi 95% des mesures devraient se situer dans cet intervalle, 2.5% au-dessus et 2.5% au-dessous.

   ![](https://i.imgur.com/8XYbCbIm.png)
   ![](https://i.imgur.com/ir1vvLfm.png)

   Dans notre exemple, pour que le nombre de défauts soit inférieur à 15 97.5% du temps, le nombre d'arrêts doit être inférieur à 3.

  <pre>
  S ≈ 1.45

  6.306 + 2*1.45 + 1.944x < 15
  6.306 + 2.9 + 1.944x < 5.794
  x < 2.98

  ---

  6.306 + 1.944*3 = 12.138

  12.138 - 2*1.45 = 9.238
  12.138 + 2*1.45 = 15.038

  Avec 3 arrêts, on produira entre 9 et 15 défauts 95% du temps.
  </pre>

  ![](https://i.imgur.com/jT2g11J.png)

## Pour & Contre

* L'importance des différentes caractéristiques est facile à interpréter (en regardant les poids)

* Rapide et demande peu des ressources en production

* Marche mal avec un ensemble de données déséquilibré, des valeurs aberrantes ou manquantes

* Marche mal si certaines caractéristiques sont corrélées entre elles

## Optimisations

### Régularisation L2

(aka Regression Ridge)

La régularisation est une méthode permettant de réduire la variance d'un modèle (overfitting). Pour ce faire, on ajoute une *pénalité* à la fonction coût: la somme des carrés des coefficients fois &lambda; — où &lambda; est un hyperparamètre (ex 0.7). Plus la valeur de &lambda; est élevée, plus la pénalité est importante, et plus on incite le modèle à trouver des coefficients proches de 0 et donc à être moins sensible aux petits changements de X.

$$
\text{Regularisation L2}: \\
\frac{\lambda}{2n} \sum_{i=1}^n x_i^2 \\[15pt]

\text{Fonction coût}: \\
(aX - y)^2 + L2
$$

![](https://i.imgur.com/3gL9H8L.png)
![](https://i.imgur.com/kmkKgwJ.png)

### Régularisation L1

(aka Regression Lasso)

Même idée que L2, la seule différence étant que la pénalité est calculée avec la valeur absolue des coefficients.

$$
\text{Regularisation L1}: \\
\frac{\lambda}{n} \sum_{i=1}^n | x_i |
$$
