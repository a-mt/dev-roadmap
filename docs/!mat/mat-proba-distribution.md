---
title: Distributions de probabilité
category: Maths, Probabilité
latex: true
---

## Loi de probabilité

Pour rappel, une **distribution de probabilité** (ou *loi de probabilité*) est la liste de tous les résultats possibles et leur probabilité associée. La table ci-dessus montre la probabilité de distribution pour la somme de deux dé.

![](https://i.imgur.com/vOpzIXz.png)

## Lois usuelles

Il existe un certain nombre de situation qu'on retrouve très fréquemment en théorie des probabilités. On a donc définit des variables aléatoires spécifiques pour ces types d'expériences, et quand une des expérience à modéliser se ramène à une situation usuelle, alors on peut directement utiliser les formules de cette loi pour connaître les probabilités, moyenne et variance associées.

![](https://i.imgur.com/c5gaW6f.png)

## Fonction de distribution de probabilité

Une fonction de distribution de probabilité est une fonction qui, pour un résultat possible, retourne la probabilité associée.

Il y a 3 types de fonctions de distributions de probabilité:
* la <ins>fonction de masse de probabilité</ins> (pmf)  
  Pour les variables aléatoires discrètes.  
  Fonction qui pour une valeur x, retourne la probabilité associée.

  $$
  f(x) = \mathbb{P}(X = x)
  $$

* la <ins>fonction de densité de probabilité</ins> (pdf)  
  Pour les variables aléatoires continues.  
  Fonction qui pour un intervalle [a,b] retourne l'aire sous la courbe entre ces deux bornes — donc la probabilité d'être entre ces deux bornes.

  $$
  \mathbb{P}(a < x < b) = \int_a^b f(x)dx
  $$

* la <ins>fonction de distribution cumulative</ins> (cdf) ou *fonction de répartition*  
  Pour les variables aléatoires discrètes et continues.  
  Fonction qui pour une valeur x, retourne la probabilité qu'elle soit supérieure à une variable aléatoire X.

  $$
  f(x) = \mathbb{P}(X \leq x)
  $$

---

## Distribution uniforme discrète

Probabilité d'un succès parmis n événements équiprobable.

$$
f(x) = \mathbb{P}(X = k) = \frac{1}{n}
$$

$$
\mathbb{E}(X) = \frac{n + 1}{2}
$$

$$
\mathbb{V}(X) = \frac{n^2 - 1}{12}
$$

<pre>
Ex: On a un dé de 6 faces.
Quelle est la probabilité de tomber sur le numéro 1?
uniform(6) = 1/6
</pre>

[Démonstrations](https://perso.univ-rennes1.fr/philippe.roux/enseignement/proba1/cours.pdf)

## Distribution de Bernouilli

Épreuve aléatoire qui n'a que deux résultats possibles: succès ou échec. Un autrement dit &Omega; = {0,1}.

$$
\begin{aligned}
\mathbb{P}(X = x) &= \begin{cases}
p     & \text{si } x = 1, \\
1-p  & \text{si } x = 0
\end{cases} \\[5pt]

&= p^x (1-p)^{1-x}, x \in {0,1}
\end{aligned}
$$

<br>

$$
\mathbb{E}(X) = p
$$

$$
\mathbb{V}(X) = p \times (1 - p)
$$

<pre>
Ex: On a un groupe de 10 personne, dont 6 aiment chanter.
Quelle est la probabilité qu'une personne aime chanter?
P(x = 1) = 0.6

Quelle est la probabilité qu'une personne n'aime pas chanter?
P(x = 0) = 1-0.6 = 0.4

Quelle est la variance des données?
V(X) = 0.4 * 0.6 = 0.24
</pre>

## Distribution binomiale

Probabilité de k succès parmis n événements indépendants, chaque événement ayant une probabilité de p.  
Répond à "combien de succès pour n essais"?

$$
f(k) = \mathbb{P}(X = k) = \binom{n}{k}p^k (1-p)^{n-k}
$$

$$
\mathbb{E}(X) = np
$$

$$
\mathbb{V}(X) = p \times (1 - p) \times n
$$

<pre>
Ex: Un couple a 5 enfants.  
Quelle est la probabilité qu'ils aient 3 filles?

binom(5,3) = C(5,3) (0.5)**3 &times; (1 - 0.5)**(5-3)
           = 5!/(3!(5-3)!) &times; 0.125 &times; 0.25
           = (5*4)/2 &times; 0.125 &times 0.25
           = 0.3125 &approx; 31%
</pre>

<pre>
Ex: Lucas a 20% de chance de réussir un lancer franc.
Il vaut en faire 4. Quelle est la probabilité  qu'il en réussise exactement 2 sur les 4?

binom(2,4) = C(4,2) 0.2**2 0.8**2
           = 4!/(2!(4-2)!) &times; 0.04 &times 0.64
           = 6 &times; 0.04 &times 0.64
           = 0.1536
</pre>

Graphiquement, la loi de probabilité d'une loi binomiale a une forme de cloche.  
Plus le taux de succès est petit, plus la distribution est décentrée vers la gauche. Et plus le taux de succès est élevé, plus la distribution est décentrée vers la droite.

* p = 0.5

  ![](https://i.imgur.com/dpFJS8f.png)

* p = 0.7

  ![](https://i.imgur.com/k1EAcwg.png)

* p = 0.3

  ![](https://i.imgur.com/GF7KLGe.png)

## Distribution de Poisson

Probabilité que k événements se réalisent pendant un intervalle continu donné (typiquement une durée ou une longueur).  
Répond à "combien d'événements pendant un intervalle donné"?

Pour utiliser la distribution Poisson, les conditions suivantes doivent être réunies:

1. Les intervalles sur lesquels les événements se produisent ne se chevauchent pas
2. Les événements sont indépendants
3. La probabilité que plusieurs événements se produisent sur une très courte période de l'intervale est d'environ 0

La distribution de Poisson peut-être utilisée comme une estimation de la distribution binomiale quand n est grand  (que le calcul des factorielles devient trop long à effectuer).

$$
\begin{aligned}
f(k) = \mathbb{P}(X = k) &= \frac{e^{-np} \times (np)^k}{k!} \\
&= \frac{e^{-\lambda} \times \lambda^k}{k!}, \lambda = np
\end{aligned}
$$

$$
\mathbb{E}(X) = \lambda
$$

$$
\mathbb{V}(X) = \lambda
$$

<pre>
Ex: Vous possèdez un restaurant où, en moyenne, 100 personnes viennent tous les jours.  
Quelle est la probabilité que 125 personnes qui viennent dans votre restaurant aujourd'hui?

P(X = 125) = (e**(-100) * 100**125)/125!
           ≈ 0.00198
           ≈ 0.198%
</pre>

[Poisson distribution calculator](http://statisticshelper.com/poisson-distribution-calculator-with-a-step-by-step-solution)

## Distribution géométrique

Probabilité de succès au n-ème essai.  
Répond à "combien d'essais avant un succès"? À ne pas confondre avec la distribution binomiale, qui est utilisée pour déterminer le nombre de succès pour un nombre d'essais donné.

Pour utiliser la distribution géométrique, les conditions suivantes doivent être réunies:

1. Chaque essai est soit un succès soit un échec
2. Chaque essai est indépendant
3. La probabilité de succès et d'échec est constante d'un essai à l'autre

$$
f(x) = \mathbb{P}(X = x) = p \times (1-p)^{x-1}
$$

$$
\mathbb{E}(X) = \frac{1}{p}
$$

$$
\mathbb{V}(X) = \frac{p}{(1 - p)^2}
$$

<pre>
Ex: Vous lancez un dé 3 fois de suite.  
Quelle est la probabilité de n'obtenir un 6 qu'au 3ème essai.

A = obtenir un 6
x = 3
p = 1/6

geom(3) = (1/6) * (1 - 1/6)**(3-1)
        = (1/6) * (5/6)**2
        = 25/216
        &approx; 0.1157

En moyenne, combien d'essais faut-il avant d'obtenir un succès (tomber sur un 6)?
E = 1/p = 1/1/6 = 6
</pre>

## Distribution de Pascal (ou binomiale négative)

Probabilité de k succès au n-ème essai.  
Répond à "combien d'essais avant k succès"?

$$
\begin{aligned}
f(k) = \mathbb{P}(X = k) &= \binom{n-1}{k-1} p^k (1-p)^{n-k}
\end{aligned}
$$

$$
\mathbb{E}(X) = \frac{k}{p}
$$

$$
\mathbb{V}(X) = \frac{k \times (1 - p)}{p^2}
$$

<pre>
Ex: On souhaite trouver 3 personnes ayant été à l'étranger au moins une fois dans leur vie.  
On part du principe que la probabilité qu'une personne soit déjà allé à l'étranger est de 50%.
Quelle est la probabilité qu'il nous faille demande à 10 personnes pour obtenir 3 succès?

pascal(10,3) = C(10-1,3-1) * 0.5**3 * (1 - 0.5)**(10-3)
             = 9!/(2!(9-2)!) * 0.5**3 * 0.5**7
             = 36 * 0.5**3 * 0.5**7
             &approx; 0.035
</pre>

## Distribution hypergéométrique

Probabilité de k succès pour n tirages sans remise parmis N éléments.

$$
\mathbb{P}(X = k) = \frac{
  \binom{pN}{k} \binom{(1-p)N}{n-k}
}{\binom{N}{n}}
$$

$$
\mathbb{E}(X) = np
$$

$$
\mathbb{V}(X) = np(1-p) \frac{N - n}{N - 1}
$$

<pre>
Ex: Une urne contient 50 boules, dont 5 vertes et 45 rouges.  
En tirant 10 boules, quelle est la probabilité d'obtenir 4 vertes?

N = 50
p = 5/50 = 0.1
n = 10
k = 4

P(X = 4) = (C(0.1*50,4) * C(0.9*50,10-4)) / C(50,10)
         = (C(5,4) * C(45,6)) / C(50,10)
         = (5 * 8145060) / 10272278170
         &approx; 0.0040
         &approx; 0.4%
</pre>

---

## Distribution uniforme continue

Distribution uniforme sur un intervalle continu.

$$
f(x) = \frac{1}{b-a}, a \lt x \lt b
$$

$$
\mathbb{E}(X) = \frac{a+b}{2}
$$

$$
\mathbb{E}(X) = \frac{(a-b)^2}{12}
$$

<pre>
Ex: On génère du bruit blanc entre 5 et 16 kHz.  
Quelle est la probabilité de générer un son de 7.3 kHz?

P(7.3) = 1/(16-5) = 1/11 &approx; 0.09
</pre>

## Distribution exponentielle

Probabilité qu'il se passe un intervalle t entre deux événements.  
La distribution de Poisson est une distribution discrète qui nous donne la probabilité que le nombre d'événements se produisant pendant un intervalle donné soit *x*. La distribution exponentielle est une distribution continue qui nous donne la probabilité qu'il nous faille un intervalle inférieur à *x* pour réaliser un événement.  
Répond à "quel intervalle avant le prochain événement"?

Les conditions pour utiliser la distribution exponentielle sont les mêmes que pour la distribution de Poisson:

1. Les intervalles sur lesquels les événements se produisent ne se chevauchent pas
2. Les événements sont indépendants
3. La probabilité que plusieurs événements se produisent sur une très courte période est d'environ 0

$$
f(x) = \begin{cases}
\mathbb{P}(X < x) = 1 - e^{-\lambda x} \\
\mathbb{P}(X > x) = e^{-\lambda x}
\end{cases}
$$

$$
\mathbb{E}(X) = \frac{1}{\lambda}
$$

$$
\mathbb{V}(X) = \frac{1}{\lambda^2}
$$

<pre>
Ex: Vous réalisez en moyenne 6 devoirs par heure.

Quelle est la probabilité que vous complétiez 2 problèmes en 20 minutes?  
Utilise la distribution de Poisson.  
&lambda;: (20 min)*(6 problèmes / 60 min) = 2

P(X < 2) = P(X = 0) + P(X = 1)
         = (e**(-2) 2**0)/0! + (e**(-2) 2**1)/1!
         = (e**(-2) 1)/1 + (e**(-2) 2)/1
         &approx; 0.40

Quelle est la probabilité qu'il vous faille entre 5 et 8 minutes pour réaliser un devoir?  
Utilise la distribution exponentielle.
&lambda; = 1*6/60 = 0.1

P(5 < X < 8) = P(X < 8) - P(X < 5)
             = 1-e**(-0.1*8) - [1-e**(-0.1*5)]
             = -e**(-0.1*8) + e**(-0.1*5)
             &approx; 0.1575
</pre>

[Video de l'exemple: The Difference Between Poisson and Exponential Distributions](https://www.youtube.com/watch?v=Z-8FtjZNlb4)

## Distribution Gamma

Probabilité qu'il se passe un intervalle t avant la réalisation du kème événement.  
La distribution Gamma est une généralisation de la distribution exponentielle (= avec k événements et non plus un seul).  
Répond à "quel intervalle avant k événements"?

Les conditions pour utiliser la distribution Gamma sont les mêmes que pour la distribution de Poisson et la distribution exponentielle:

1. Les intervalles sur lesquels les événements se produisent ne se chevauchent pas
2. Les événements sont indépendants
3. La probabilité que plusieurs événements se produisent sur une très courte période est d'environ 0

$$
\mathbb{P}(X < x) = \int_0^x \frac{1}{\Gamma(k)} \times \frac{1}{\lambda^{k}} \times x^{k-1} \times e^{-x/\lambda} \quad dx, \\

\Gamma(x) = \begin{cases}
\text{x entier}: & (x - 1)! \\
\text{x réel}: & \int_0^\infty y^{x-1} e^{-y} dy
\end{cases}
$$

$$
\mathbb{E}(X) = \lambda k
$$

$$
\mathbb{V}(X) = \lambda^2 k
$$

<pre>
Ex: vous êtes livreur de pizza.
Il vous faut en moyenne 20 minutes pour livrer une pizza.
Quelle est la probabilité qu'il vous faille
moins de 60 minutes pour livrer 3 pizzas?

P(X < 60) = int(0,60) 1/2 * 1/20**3 x**2 e**(-x/20) dx
          &approx; .577
</pre>

[Video: Gamma Basics](https://www.youtube.com/watch?v=wpNjufjkhl8)  
[Integral calculator](https://www.integral-calculator.com/#expr=1%2F2%20%2A%201%2F20%5E3%20x%5E2%20e%5E%28-x%2F20%29&lbound=0&ubound=60)

## Distribution normale (ou distribution de Laplace-Gauss)

* Les premiers statisticiens ont constaté que de nombreuses distributions statistiques observées pouvaient être décrites et modélisées par une même loi, qu'ils ont appelé loi *normale*.

* Les propriétés d'une distribution normale sont comme suit:
  * La distribution des données est en forme de cloche: symétrique, centrée autour de la moyenne. La moyenne est la médiane sont donc égales.

  * &approx; 99.73% des observations sont comprises dans un intervalle de 3 écart-type autour de la moyenne.  
    &approx; 95.45% dans un intervalle de 2 écart-type autour de la moyenne.  
    &approx; 68.27% dans un intervalle de 1 écart-type autour de la moyenne.

  ![](https://i.imgur.com/kN8onS2.png)

  <br>

* La forme d'une distribution normale peut être entièrement décrite par deux variables: la moyenne et l'écart-type. La moyenne indique le centre de la distribution et l'écart-type si la distribution est haute et fine ou basse et large.
  La loi normale est dite *centrée réduite* (ou *distribution Z*) si sa moyenne est nulle et l'écart-type vaut 1.

  ![](https://i.imgur.com/bAE3vKHm.png)

* Les formules de la distribution normale sont comme suit:

  $$
  f(x) = \frac{1}{\sigma \sqrt{2 \pi}} \times e^{-0.5 \left( \frac{x - \mu}{\sigma} \right)^2}
  $$

  $$
  \mathbb{E}(X) = \mu = \frac{\displaystyle \sum_{i=1}^N X_i}{N}
  $$

  $$
  \mathbb{V}(E) = \sigma^2 = \frac{\displaystyle \sum_{i=1}^N (X_i - \mu)^2}{N}
  $$

  Mais de manière générale, plutôt que d'effectuer les calculs nous même, on utilise la table de la distribution Z (aussi appelé Z table). La Z table contient l'ensemble des probabilité P(X < x) de la distribution Z. <a href="https://www.ztable.net/">Voir Z table</a>.
  Pour l'utiliser avec une distribution normale qui n'est pas centrée réduite, il suffit de convertir nos données x en z-score:

  $$
  z = \frac{x - \mu}{\sigma}
  $$

<pre>
Ex: Une variété de pin a un diamètre moyen de 150cm et un écart-type de 30cm.  
On sait que le diamètre des pins est normalement distribué.
Quel est la probabilité de trouver un pin de diamètre supérieur à 210cm?

1. Calculer le z-score de 210:
   z = (x - mu)/sigma
     = (210 - 150)/30
     = 2

2. Utiliser la Z table pour trouver la probabilité que z > +2.00
   P(z > 2) = 1 - .97725
            = .02275 = 2.275%
</pre>

### Théorème de la limite centrale

* La taille des gens, le QI ou encore la plupart des éléments crées en usine (comme le poids des boîtes de céréales) sont distribués normalement. Mais la raison pour laquelle on parle autant de la distribution normale, c'est parce que la distribution des moyennes est normale.

* Ex: Si on lance un dé, on a 6 résultat possibles: de 1 à 6, où chaque résultat a autant de probabilité d'appaître. Si on lance deux dé, il n'y a qu'une façon d'obtenir une somme de 2 (1+1) ou 12 (6+6) mais 6 façons d'obtenir un 7 (4+3, 5+2, 6+1, 1+6, 5+2, 3+4).

  Plus on augmente la taille de l'échantillon dont on calcule la moyenne, plus cette tendance se renforce: les valeurs centrales deviennent de plus en plus probables et les valeurs extrêmes deviennent de moins en moins probables.
  C'est parce qu'il y a plusieurs combinaisons possibles pour obtenir une moyenne au centre (valeurs minimales & maximales, valeurs maximales & minimales, ou valeurs centrales) mais une seule combinaison possible pour obtenir une moyenne se situant aux extrêmes (que des valeurs minimales, que des valeurs maximales).

  ![](https://i.imgur.com/DNXuMHLm.png)
  ![](https://i.imgur.com/z7upmhHm.png)  
  ![](https://i.imgur.com/Epc7wJpm.png)
  ![](https://i.imgur.com/AUwoM3Zm.png)

  <details>
  <summary>python</summary>
  <pre lang="python">
  def draw(n):
    def combine(n):
      if n == 1:
        return np.array(range(1,7))
      else:
        res = []
        for i in range(1,7):
          res.append(i+np.array(combine(n-1)))
        return np.concatenate(res)

    values, counts = np.unique(combine(n), return_counts=True)

  plt.bar(values/n, counts)
  plt.xlabel('Résultat /{:d}'.format(n))
  plt.ylabel('Fréquence')
  plt.title('{:d} dés'.format(n))

  draw(5)
  </pre>
  </details>

* Ce constat n'est pas seulement vrai avec une distribution initiale uniforme (comme le tirage de dés) mais toute distribution ayant une variance finie: avec une taille d'échantillon suffisamment grande, la distribution des moyennes des échantillons sera approximativement normale.

  C'est utile car en général, quand on pose des questions scientifiques, on ne compare pas des valeurs individuelles mais la moyenne de différentes groupes. Et la simplicité de la distribution normale nous permet de comparer s'il existe une différence significative entre ces groupes — ex: patients avant vs après un traitement, revenus des chefs hommes vs femmes, etc.

* Formellement, le théorème de la limite centrale dit que la distribution de moyennes (x&#x0305;) d'un échantillon aléatoire de *n* éléments converge vers la distribution normale quand *n* tend vers l'infini.

  Afin de formuler mathématiquement cette approximation, on pose:

  $$
  z_n = \frac{\bar{X} - \mu}{\sigma \sqrt{n}}
  $$

  En pratique, une approximation avec la distribution normale est acceptable pour les échantillons de 30 ou plus.

### Erreur-type

* La moyenne d'une distribution de moyennes reste la moyenne de la distribution initiale. Ce sera donc une assez bonne estimation de la véritable moyenne de la population.

  $$
  \mu = \frac{x_1 + x_2 + x_3 + x_4 + x_5 + x_6}{6}
      = \frac{\frac{x_1+x_2}{2} + \frac{x_3+x_4}{2} + \frac{x_5+x_6}{2}}{3}
  $$

* Plus la taille de l'échantillon est grande, plus la distribution des moyennes est centralisée, les écarts-type des deux distributions ne sont donc pas égaux.

  ![](https://i.imgur.com/RxPfo1b.png)

  On peut estimer l'écart-type de l'un ou de l'autre avec la relation suivante (où n est la taille des échantillons):

  $$
  \sigma_{mean} \approx \frac{\sigma_{initial}}{\sqrt{n}}
  $$

  <details>
  <summary>python</summary>
  <pre lang="python">
  #Distribution initiale: 1000 données entre 50 et 100
  X = np.random.randint(50,100, size=1000)

  #Distribution des moyennes: groupes de 100
  Xm = []
  size = 100

  for i in range(0,len(X),size):
    sum = 0
    for j in range(0,size):
      sum += X[i+j]
    Xm.append(sum/size)

  #Moyenne des deux distributions: identiques
  print(np.mean(X))   # 74.492
  print(np.mean(Xm))  # 74.49199999999999

  #Écart-type des deux distributions
  print('std init:', np.std(X))  # 14.335827007884827
  print('std mean:', np.std(Xm)) # 1.4450660884540885

  #Estimation de l'écart-type (=erreur-type)
  print('stderr init:', np.std(Xm)*np.sqrt(size)) # 14.450660884540884
  print('stderr mean:', np.std(X)/np.sqrt(size))  # 1.4335827007884827
  </pre>
  </details>

  L'estimation de l'écart-type (*standard deviation* en anglais) d'une distribution  est appelé l'*erreur-type* (*standard error* en anglais). Calculer l'erreur-type avec une distribution de moyenne qui de petits échantillons aura tendance à sous-estimer l'écart-type de la distribution initiale. Avec n = 2, le nombre est sous-estimé d'environ 25%, pour n = 6 de 5%. Diminuer l'incertitude d'une estimation requiert donc l'acquisition de plus d'observations dans les échantillons.

### Distribution T

Les distributions de moyenne sont normales lorsque la taille des échantillons est suffisamment grande (&gt; 30). Avec une petite taille d'échantillons, la distributions des moyennes n'est pas toujours tout à fait normale, raison pour laquelle on utilise la *distribution T* au lieu de la *distribution Z*.

La distribution T change sa forme en fonction de la quantité d'informations disponibles: avec des échantillons de petite taille, la distribution a des extrêmités plus épaisses pour répresenter des estimations plus incertaines. Plus on obtient de données, plus la distribution T tend vers la distribution Z.

![](https://i.imgur.com/7K0VMRNl.png)