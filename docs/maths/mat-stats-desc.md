---
title: Statistiques descriptives (univariables)
category: Maths, Statistiques
latex: true
---

## Tendance centrale

### Moyenne

  * la **moyenne** ou *espérance* (population: &mu;, échantillon: x&#x0305;, E[X])

    $$\begin{aligned} \mu &= \frac{\displaystyle \sum_{i=1}^n X_i}{n} \\ \\ &= \frac{X_1 + \ldots + X_n}{n} \end{aligned}$$

    Sommer toutes les valeurs et diviser par le nombre de valeurs  
    Ex: La moyenne des points 5, 5, 7, 20 est (5+5+7+20)/4 = 9.25

    <details>
    <summary>python</summary>
    <pre lang="python">np.mean(X)</pre>
    <pre lang="python">np.sum(X)/X.size</pre>
    </details>

### Médiane

  * la **médiane** (M, Med, x&#x0303;)

    $$
    \widetilde{x} = \begin{cases}
     \frac{\underset{asc}{X}\ _{n/2} + \underset{asc}{X}\ _{(n+1)/2}}{2}         &\text{si $n$ pair}\\
     \underset{asc}{X}\ _{(n+1)/2}   &\text{si $n$ impair}
    \end{cases}
    $$

    Ordonner les valeurs et prendre la valeur du milieu (ou la moyenne des deux valeurs du milieu pour un nombre pair de valeurs)  
    Ex: La médiane des points 5, 5, 7, 20 est (5+7)/2 = 6

    <details>
    <summary>python</summary>
    <pre lang="python">np.median(X)</pre>
    <pre lang="python">
    k = X.size/2
    np.sort(X)[[int(k-1), int(k)]].mean()
    </pre>
    </details>

### Mode

  * le **mode**: Compter le nombre d'occurence de chaque valeurs et prendre la plus courante. Si toutes les valeurs n'apparraissent qu'une seule fois, alors il n'y a pas de mode. Si plusieurs valeurs apparaissent le nombre maximal de fois, alors il y a plusieurs modes.  
    Ex: Le mode des points 5, 5, 7, 20 est 5

    <details>
    <summary>python</summary>
    <pre lang="python">
    from scipy.stats import mode
    mode(np.round(X))
    </pre>
    <pre lang="python">
    values, count = np.unique(np.round(X), return_counts=True)
    values[count == count.max()]
    </pre>
    </details>

### Moyenne, médiane ou mode

* Quand la distribution des données est normale, c'est à dire quand les valeurs sont symétriques sur l'intervalle (il y a autant de valeurs basses que de valeurs hautes) alors la médiane et la moyenne sont égales. S'il y a des valeurs extrêmes à droite alors la moyenne est supérieure  à la médiane. S'il y a des valeurs extrêmes à gauche alors la moyenne est inférieure à la médiane. On peut donc comparer la moyenne et la médiane pour vérifier la distribution des données.

  ![](https://i.imgur.com/gP5LAo9.png)

* Le mode est la seule métrique qu'on peut utiliser avec des valeurs nominales (ex: pays)

  ![](https://i.imgur.com/RGTBt6j.png)

### Moyenne pondérée

Plutôt que la moyenne, on peut également choisir d'utiliser

  * la **moyenne pondérée** (*weighted mean* en anglais)

    $$\begin{aligned} \underset{pond}{\mu} &= \frac{\displaystyle \sum_{i=1}^n w_i X_i}{\displaystyle \sum_{i=1}^n w_i\quad} \\ \\ &= \frac{w_1 X_1 + \ldots + w_n X_n}{w_1 + \ldots + w_n} \end{aligned}$$

    Multiplier chaque valeur par le poids qu'on lui donne, sommer le tout, et diviser par la somme des poids. Typiquement le poids peut correspondre à un nombre d'heures, un tarif, un volume ou juste l'importance accordée à un élément plutôt qu'un autre.  
    Ex: La moyenne pondérée des points 5 coef 1, 5 coef 1, 7 coef 2, 20 coef 3 est (5×1 + 5×1 + 7×2 + 10×3) / (1+1+2+3) &asymp; 7.71

### Moyenne ajustée

  * la **moyenne ajustée** (*trimmed mean* en anglais)

    $$\begin{aligned} p = 0.05n, \underset{ajuste}{\mu} &= \frac{\displaystyle \sum_{i=1+p}^{n-p} X_i}{n-2p} \\ \\ &=  \frac{X_{1+p} + \ldots + X_{n-p}}{n-2p} \end{aligned}$$

    Supprimer 5% des valeurs les plus hautes, 5% des plus basses, et calculer la moyenne avec les valeurs restantes.

### Moyenne géométrique

  * la **moyenne géométrique** est utilisée pour calculer le taux de croissance moyen.

    Imaginons que vous investissiez $1,000,000. La première année votre investissement rapporte +100%, vous avez maintenant $2,000,000. La deuxième année, votre investissement perd -50%, vous avez maintenant $1,000,000. Sur deux ans, quel est le taux de croissance moyen?

    On serait tenter de calculer la moyenne algébrique: (+100% -50%)/2 = +25%. À l'évidence, ce n'est pas la bonne réponse: on ne peut pas appliquer la moyenne algébrique puisque le 2ème pourcentage ne s'applique pas sur la valeur initiale mais le résultat du 1er pourcentage. On doit utiliser la moyenne géométrique.

    $$\begin{aligned} \underset{geom}{\mu} &= (X_1 \times \ldots \times X_n)^{1/n} \\ &= \sqrt[n]{(X_1 \times \ldots \times X_n)} \end{aligned}$$

    Multiplier toutes les valeurs entre elles, et porter le résultat à la puissance 1/n (autrement dit, prendre la racine n-ième), où n correspond au nombre de valeurs.

    Ex 1: +100% la première année, -50% la deuxième année. La moyenne géométrique est (2×0.5)^(1/2) = 1. On peut dire qu'en moyenne, la croissance a été de +0% chaque année.

    Ex 2: +30% la première année, -12% la deuxième année, +5% la troisième année. La moyenne géométrique est (1.30×0.88×1.05)^(1/3) &asymp; 1.06. On peut dire qu'en moyenne, la croissance a été d'environ +6% chaque année.

---

## Performance

### Percentile

* le k-ème **percentile**: Trier les données par ordre croissant et prendre la valeur située à la position k/100. Le 50ème percentile correspond à la médiane. Les valeurs supérieures au 95ème percentile sont supérieures à 95% des données — donc dans le top 5%.

  <details>
  <summary>python</summary>
  <pre lang="python">np.percentile(X, 95, interpolation='midpoint')</pre>
  <pre lang="python">
  k = X.size*(95/100)
  np.sort(X)[[int(k-1),int(k)]].mean()
  </pre>
  </details>

  ![](https://i.imgur.com/8IvhUlg.png)

### Quartile

* le k-ème **quartile**: Trier les données par ordre croissant et prendre la valeur située à la position k/4  
  La position k/4 se calcule (kn + (4-k))/4, on aura donc:

  * Q0 = 0 : valeur minimale
  * Q1 = (n+3)/4 : 25ème percentile
  * Q2 = (2n+2)/4 : 50ème percentile, médiane
  * Q3 = (3n+1)/4 : 75ème percentile
  * Q4 = n : valeur maximale

  Si la position trouvée n'est pas un nombre entier, calculer la moyenne de deux valeurs.  
* Ex: pour les points 5, 5, 7, 20:

  - Le premier quartile est à la position (4+3)/4 = 1.75, ce sera donc la moyenne du 1er et du 2ème point.  
    Q1 = (5+5)/2 = 5
  - La médiane est à la position (8+2)/4 = 2.5, donc la moyenne du 2ème et du 3ème.  
    Q2 = (5+7)/2 = 6
  - Le troisième quartile à la position (12+1)/4 = 3.25, la moyenne du 3ème et du 4ème.  
    Q3 = (7+20)/2 = 13.5

### p-quantile

* Outre les percentiles (k/100) et quartiles (k/4), on peut généraliser et utiliser n'importe quelle taille. Dans ce cas, on parle de p-**quantile** (ou fractile), où p est une valeur entre 0 et 1:

  | p-quantile | Terme | # groupes
  |--- |--- |---
  | 0.01-quantile | Percentile | 100
  | 0.05-quantile | Pentile    | 20
  | 0.1-quantile  | Decile     | 10
  | 0.25-quantile | Quartile   | 4

---

## Dispersion

### Intervalle

* l'**intervalle** ou **étendue** (*range* en anglais)

  $$intervalle = max - min$$

  Soustraire la valeur minimale à la valeur maximale.  
  Ex: L'intervalle des points 5, 5, 7, 20 est 20-5 = 15

### Intervalle inter-quartile

* l'**intervalle inter-quartile** (*interquartile range*, IQR en anglais)

  $$IQR = Q3 - Q1$$

  Soustraire le 1er quartile au 3ème quartile.  
  Ex: L'intervalle inter-quartile des points 5, 5, 7, 20 est 13.5-5 = 8.5

  ![](https://i.imgur.com/gFnzwbF.png)

---

## Variation

### Déviation moyenne absolue

* la **déviation moyenne absolue**

  $$
  \frac{\displaystyle \sum_{i=1}^n | X_i - \mu |}{n} = \frac{| X_1 - \mu | + \ldots + | X_n - \mu |}{n}
  $$

  On nomme **déviation** (ou *erreur*, *résidu*) la différence entre une valeur observée et la valeur estimée — qui peut être la moyenne, médiane, etc.

  Pour calculer la déviation moyenne absolue: soustraire la valeur observée à la valeur estimée, calculer la valeur absolue de chaque résultat, puis calculer la moyenne des valeurs obtenues.  
  Ex: La déviation moyenne absolue des points 5,5,7,20 est (|5-9.25| + |5-9.25| + |7-9.25| + |20-9.25|)/4  = (4.25 + 4.25 + 2.25 + 10.75)/4 = 5.375

### Variance

* la **variance** (*déviation moyenne au carré*, ou *mean squared error* en anglais)

  $$\sigma^2 = \frac{\displaystyle \sum_{i=1}^n (X_i - \mu)^2}{n} = \frac{(X_1 - \mu)^2 + \ldots + (X_n - \mu)^2}{n}$$

  Soustraire la moyenne à chaque valeur, porter chaque résultat au carré, puis calculer la moyenne des valeurs obtenues.  
  Ex: La variance des points 5,5,7,20 est [(5-9.25)² + (5-9.25)² + (7-9.25)² + (20-9.25)²]/4 = (-4.25² - 4.25² - 2.25² + 10.75²)/4 = (18.0625 + 18.0625 + 5.0625 + 115.5625)/4 = 39.1875

  <details>
  <summary>python</summary>
  <pre lang="python">np.var(X)</pre>
  <pre lang="python">np.mean((X - X.mean())**2)</pre>
  </details>

  La variance est utilisée pour déterminer la répartition de l'ensemble des valeurs (déterminer si elles sont plutôt centrées autour de la moyenne ou très dispersées).  
  Plus les valeurs sont concentrées autour de la moyenne, plus la variance est basse. Et inversemment, plus les valeurs s'éloignent de la moyenne, plus la variance est élevée.

  ``` python
  np.var([9,11]) # 1.0
  np.var([1,19]) # 81.0
  ```

* Lorsqu'on cherche à estimer la variance d'une population à partir d'un échantillon, alors on applique la **correction de Bessel**, qui consiste à diviser par n-1 au lieu de n.

  $$s^2 = \frac{\displaystyle \sum_{i=1}^n (X_i - \bar{X})^2}{n - 1} = \frac{(X_1 - \bar{X})^2 + \ldots + (X_n - \bar{X})^2}{n - 1}$$

  Cela permet de compenser le fait qu'il est peu probable d'obtenir des valeurs extrêmes dans un échantillon: diviser par n-1 permet d'avoir une estimation correcte la plupart du temps (quitte à surestimer la variance de temps en temps), au lieu de diviser n et sous-estimer la variance dans la majorité des cas (et n'avoir une estimation correcte que de temps en temps).

### Écart-type

* l'**écart-type** (*standard deviation* en anglais, *l2-norm* ou *Euclidean norm*)

  $$\sigma = \sqrt{\frac{\displaystyle \sum_{i=1}^n (X_i - \mu)^2}{n}} = \sqrt{\frac{(X_1 - \mu)^2 + \ldots + (X_n - \mu)^2}{n}}$$

  Prendre la racine carrée de la variance.  
  Ex: L'écart-type des points 5,5,7,20 est &radic;39.1875 &asymp; 6.26

  <details>
  <summary>python</summary>
  <pre lang="python">np.std(X)</pre>
  <pre lang="python">np.sqrt(np.var(X))</pre>
  </details>

  Ça nous permet de ramener la variance dans la même unité/même intervalle que les valeurs dont on mesure la dispersion et dire qu'en moyenne, les points s'écartent de k fois la moyenne. Par exemple, un écart-type de 2 indique qu'en moyenne, les points s'écartent de 2 fois la moyenne (2 fois plus ou 2 fois moins).

  ``` python
  np.std([9,11]) # 1.0
  np.std([1,19]) # 9.0
  ```

### Coefficient de variation

* le **coefficient de variation** (ou *écart-type relatif*)

  $$
  C_v = 100 \frac{\sigma}{\mu}
  $$

  Diviser l'écart type par la moyenne. Souvent exprimé en pourcentages (×100).  
  Ex: Le coefficient de variation des points 5,5,7,20 est 6.26/9.25*100 &asymp; 67,68. En moyenne, les points s'écartent de 68% de la moyenne, il y a donc une forte dispersion des données.

### Écart-réduit

* l'**écart-réduit** (ou *variable centrée réduite* ou *z-score*) calcule l'écart-type entre une valeur donnée et la moyenne.

  $$
  z = \frac{x - \mu}{\sigma}
  $$

  Soustraire la valeur par la moyenne, diviser le tout par l'écart-type.

  Le z-score (ou écart-réduit) nous donne le nombre d’écart-type entre une valeur donnée et la moyenne.  
  Un écart-réduit positif signifie que l'observation est supérieure à la moyenne.  
  Proche de 0: proche de la moyenne.   
  Négatif: inférieur à la moyenne

---

## Valeurs extrêmes

* On considère généralement qu'une valeur est inhabituelle quand elle s'écarte de la moyenne de plus d'1 fois la déviation standard.

  Ex: Si la moyenne vaut 4.4 et la déviation standard 2.24,  
  1 (4.4 - 2.24 = 2.16) et 8 (4.4 + 2.24 = 6.64) sont des valeurs inhabituelles.

* Une valeur sera considére comme extrême (*outlier* en anglais) soit

  - lorsqu'elle s'écarte de la moyenne de plus de 3 fois l'écart-type.

    $$x \lt \mu - 3\sigma \\ ou \\ x \gt \mu + 3\sigma$$

  - lorsque l'écart-réduit est supérieur à 3 ou inférieur à -3.

    $$
    z \lt -3 \\ ou \\ z \gt 3
    $$

  - ou lorsque la valeur est inférieure au 1er quartile moins 1.5 l'intervalle interquartile ou supérieure au 3ème quartile plus 1.5 l'intervalle interquartile.

    $$x \lt Q1 - 1.5 × IQR \\ ou \\ x\gt Q3 + 1.5 × IQR$$

* Pour visualiser les données extrêmes, on peut utiliser un boxplot (1D) ou scatterplot (2D)

  ![](https://i.imgur.com/KbWnyhcm.png)
  ![](https://i.imgur.com/RinCcqzm.png)

---

## Distribution

Une distribution est une fonction qui, pour chaque valeur ou intervalle de valeurs possibles, donne le nombre d'occurences associé.

Une distribution de probabilité donne non pas le nombre d'occurences associé mais la probabilité d'obtenir la valeur (donc le nombre d'occurences divisé par la taille de l'échantillon).

### Visualiser

Pour visualiser la distribution des données, on utilise typiquement

* un histogramme:

  ![](https://i.imgur.com/nZXej1X.png)

* une table de fréquence:

  ![](https://i.imgur.com/gAfJdYH.png)

* un boxplot:

  ![](https://i.imgur.com/IJJFJB7.png)

* ou graphique de densité (version lissée de l'histogramme):

  ![](https://i.imgur.com/T0ZoGwT.png)

### Modalité

Lorsqu'une distribution contient un seul pic, la distribution dite **unimodale**. Lorsqu'elle en contient deux, elle est dite **bimodale**.

Typiquement, la bimodalité se produit lorsque deux populations distinctes sont présentes dans l'échantillon, ce qui donne un mélange de distributions.  
Ex: si on trace l'histogramme des temps de course d'une population, on constate une bimodalité entre hommes et femmes.

![](https://i.imgur.com/umoxZpG.png?1)

### Moments

On appelle *moments* les mesures quantitatives liées à la forme graphique d'une fonction.  
On utilise généralement 4 moments pour décrire numériquement la forme d'une distribution:

* 1er moment: la moyenne  
  C'est le point central de la distribution

  $$\mu = \mathbb{E}(X)$$

  ![](https://i.imgur.com/DLtxNxum.png)

* 2ème moment: la variance  
  Détermine la largeur du pic

  $$\sigma^2 = \mathbb{E}(X - \mu)^2$$

  ![](https://i.imgur.com/1dHznVSm.png)

* 3ème moment: le coefficient d'asymétrie (*skewness* en anglais)  
  Détermine si les valeurs sont réparties uniformément de part et d'autre de la valeur moyenne ou si le graphique est étalé d'un côté.

  $$S = \mathbb{E}\left(\frac{X - \mu}{\sigma}\right)^3$$

  ![](https://i.imgur.com/9HQO6eF.jpg)

* 4ème moment: le coefficient d'aplatissement (*kurtosis* en anglais)  
  Détermine la hauteur du pic

  $$K = \mathbb{E}\left(\frac{X - \mu}{\sigma}\right)^4$$

  ![](https://i.imgur.com/zncdeFC.jpg)

### Coefficient d'assymétrie

(*skewness* en anglais)

$$\begin{aligned}
S &= \frac{\mu_3}{\sigma^3} \\ \\

&= \sum_{i=1}^n \left(\frac{\displaystyle X_i - \mu}{\sigma}\right)^3 \\ \\

&= \frac{ \left(\frac{X_1 - \mu}{\sigma}\right)^3 + \ldots + \left(\frac{X_n - \mu}{\sigma}\right)^3}{n} \\ \\

&= \frac{ \left(X_1 - \mu\right)^3 + \ldots + \left(X_n - \mu\right)^3}{n} \div \sigma^3
\end{aligned}$$

Pour chaque valeur, soustraire la moyenne, diviser par l'écart-type et porter le résultat au cube.  
Finalement, calculer la moyenne des valeurs obtenues.

* <ins>coef = 0</ins>  
  La distribution est symmétrique, en forme de cloche.

* <ins>coef < 0</ins>  
  La distribution contient moins de valeurs à gauche — elle penche à droite /  étalée à gauche (*left skewed* en anglais).

* <ins>coef > 0</ins>  
  La distribution contient moins de valeurs à droite — elle penche à gauche / étalée à droite (*right skewed* en anglais).

![](https://i.imgur.com/txrT3xJ.png)

<details>
<summary>python</summary>
<pre lang="python">
from scipy.stats import skew
skew(X)
</pre>
<pre lang="python">
def power(x, n):
  '''
  Raise to a power using
  Exponentiation by square
  '''
  result = 1
  while n != 0:
    if n % 2:
      result *= x
      n -= 1

    x *= x
    n /= 2
  return result

m3 = np.mean(power(X - np.mean(X), 3))
m3 /= np.std(X)**3
m3
</pre>
<pre lang="python">
m3 = np.mean(power(X - np.mean(X), 3))
m3 /= np.var(X)**(3/2)
m3
</pre>
<pre lang="python">
m3 = np.mean(power(X - np.mean(X), 3))
m3 /= np.mean(power(X - np.mean(X), 2))**(3/2)
m3
</pre>
</details>

### Coefficient d'aplatissement

(*kurtosis* en anglais)

$$\begin{aligned}
K &= \frac{\mu_4}{\sigma^4} \\ \\

&= \sum_{i=1}^n \left(\frac{\displaystyle X_i - \mu}{\sigma}\right)^4 \\ \\

&= \frac{ \left(\frac{X_1 - \mu}{\sigma}\right)^4 + \ldots + \left(\frac{X_n - \mu}{\sigma}\right)^4}{n} \\ \\

&= \frac{ \left(X_1 - \mu\right)^4 + \ldots + \left(X_n - \mu\right)^4}{n} \div \sigma^4
\end{aligned}$$

<details>
<summary>python</summary>
<pre lang="python">
from scipy.stats import kurtosis
kurtosis(X)
</pre>
<pre lang="python">
m4 = np.mean(power(X - np.mean(X), 4))
m4 /= np.std(X)**4
m4 - 3
</pre>
<pre lang="python">
m4 = np.mean(power(X - np.mean(X), 4))
m4 /= np.var(X)**2
m4 - 3
</pre>
<pre lang="python">
m4 = np.mean(power(X - np.mean(X), 4))
m4 /= np.mean(power(X - np.mean(X), 2))**2
m4 - 3
</pre>
</details>

* <ins>coef = 3</ins>  
  Courbe mésokurtique. C'est le cas de la distribution normale.

* <ins>coef > 3</ins>  
  Courbe leptokurtique. La courbe est haute et fine.

* <ins>coef < 3</ins>  
  Courbe platikurtique. La courbe est plate et étendue.

L'*excès de kurtosis* est défini comme kurtosis - 3.

![](https://i.imgur.com/Cu2tKMe.png)
