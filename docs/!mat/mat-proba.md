---
title: Probabilités
category: Maths
latex: true
---

## Expérience

* En probabilité, une **expérience** est tout processus générant des résultats bien définis.  
  Exemple: tirer à pile ou face

## Univers

* Un **univers** (*sample space* en anglais) est l'ensemble des résultats possibles d'une expérience aléatoire.  
  Exemple: pile, face

* Un univers peut être *qualitatif* (labels) ou *quantitatif* (nombres), que l'on peut sous-diviser en nombres *discrets* (dénombrables) et *continus* (nombres entre deux bornes, avec autant de chiffres après la virgule qu'on veut).

  $$
  \underline{\text{Qualitatif}}: \\
  \Omega \equiv \{Pile, Face\}
  $$
  $$
  \underline{\text{Quantitatif discret}}: \\
  \Omega \equiv \{0, 1\}
  $$
  $$
  \underline{\text{Quantitatif continu}}: \\
  \Omega \equiv [0, 5000] \\
  \Omega \equiv \mathbb{R}
  $$

  L'univers est souvent noté &Omega;, U ou S.

  [Notation des ensembles](mat-ensemble.md)

## Événement

* Un **événement** est l'ensemble des résultats qui nous intéressent pour une expérience donnée.  
  Ex: Si on tire une carte d'un jeu de 52 cartes, il y a 52 résultats possibles. L'événement "obtenir un coeur" contient 13 résultats — les 13 cartes de coeur.

  Une carte donnée peut appartenir à de nombreux événements:

  A = {la carte est un roi}  
  B = {la carte est un coeur}  
  C = {la carte est rouge}  
  D = {la carte est supérieure à 8}  
  E = {le carte est le roi de coeur}  
  etc

## Probabilité

* La **probabilité** d'un événement quantifie la possibilité qu'il se produise.  
  Exemple: dans l'expérience tirer à pile ou face, la probabilité que la pièce tombre sur pile est moitié/moité: 1/2.

  $$
  P(Pile) = 1/2
  $$

* Formellement, la probabilité d'un événement est le nombre de cas favorables (nombre d'éventualités de l'événement) divisé par le nombre de cas possibles (nombre total d'éventualités).

  $$
  Probabilité = \frac{nombre\ d'occurences}{nombre\ total}
  $$

  Ex: au lancer de dé, la probabilité d'obtenir un 6 est de 1/6 (&approx; 0.17, soit 17%).  
  La probabilité d'obtenir un nombre pair est de 3/6 (= 0.5, soit 50%)

* L'[analyse combinatoire](mat-combine.md) permet de compter le nombre de cas qui nous intéressent.

  <pre>
  Ex: Un jeu de 36 cartes est composé de 4 couleurs (coeur, carreaux, trègles et piques).  
  Dans chaque couleur, les cartes sont numérotées de 1 à 9.  
  Une main est une collection de 9 cartes distribuées au hasard,  
  que le joeur peut ranger dans l'ordre qu'il souhaite.  
  Quelle est la probabilité qu'une main contienne les quatre 1?

  Nombre de mains de 9 cartes parmis 36:
  36!/((36-9!)9!)

  Nombres de mains de 9 cartes avec 4 as:
  4 as + 5 cartes parmis (36-4)
  32!/((32-5)!5!)

  P(main avec 4 as):
    32*31*30*29*28/5*4*3*2*1 &div; 36*35*34*33*32*31*30*29*28/9*8*7*6*5*4*3*2*1
  = 32*31*30*29*28/5*4*3*2*1 &times; 9*8*7*6*5*4*3*2*1/36*35*34*33*32*31*30*29*28
  = 9*8*7*6/36*35*34*33
  = 2/935
  </pre>

  [Video de l'exemple](https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations/combinatorics-probability/v/probability-of-dependent-events-2)

* La probabilité d'un événement sera toujours comprise entre 0 et 1 et peut s'exprimer sous forme de pourcentage: 1 = 100% de chance que l'événement se produise.

* Si la probabilité qu'un événement se produise est *x*, alors la probabilité qu'il ne se réalise pas est *(1 - x)*.

  $$
  \begin{aligned}
  P(A) &= x \\
  P(A') &= 1 - x
  \end{aligned}
  $$

  L'événément inverse est appelé le **complément**, et on le note A' ou A<sup>C</sup>.

## Variable aléatoire

* Dans de nombreuses expérience aléatoires, on n'est pas intéressé directement par le résultat de l'expérience, mais par une certaine fonction de ce résultat.

  Une **variable aléatoire** est une fonction qui associe un réel (typiquement un gain ou perte) à chaque événement de l'univers d'une expérience aléatoire.

  Ex 1: Une roulette comporte 37 numéros, de 0 à 36. On gagne 36€ moins la mise si le numéro sort et on perd la mise dans les autres cas. Si on mise 1€ sur le numéro 1 à la roulette, on peut définir une variable aléatoire représentant le gain algébrique du joueur comme suit:

  $$
  X = \begin{cases}
  35 & \text{si gain} \\
  -1 & \text{si perte}
  \end{cases}
  $$

* On note généralement une variable aléatoire à l'aide d'une lettre majuscule (le plus souvent X).

  Si la variable aléatoire X peut prendre les valeurs x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>, l'événement "X prend la valeur x<sub>i</sub>" se note (X = x<sub>i</sub>)

  $$
  \text{Probabilité d'obtenir 2 têtes en tirant 2 cartes} \\ \equiv P(X = 2)
  $$

## Loi de probabilité

* La **loi de probabilité** (ou *distribution de probabilité*) d'une variable aléatoire X associe à chaque valeur x<sub>i</sub> la probabilité de l'événement.

* On la représente généralement sous forme de tableau.

  Ex: Si on lance 4 fois une pièce de monnaie, le nombre de faces obtenues suit la loi de probabilité suivante:

  | x<sub>i</sub> | 0 | 1 | 2 | 3 | 4
  |--- |--- |--- |--- |---
  | P(X=x<sub>i</sub>) | 1/16 | 1/4 | 3/8 | 1/4 | 1/16

* Le total d'une loi de probabilité vaudra toujours 1 (100%).

## Empirique vs théorique

* Une **probabilité empirique** est la probabilité observée dans les données récoltées.

* Une **probabilité théorique** est la "vérité".

  Exemple: si on tire à pile ou face 4 fois, théoriquement on devrait avoir 2 fois pile et 2 fois face, puisqu'on a autant de chance d'avoir l'un ou autre (probabilité théorique: 1/2 pile + 1/2 face).  
  Mais on peut très bien tirer 3 fois pile et 1 fois face (probabilité empirique: 3/4 pile + 1/4 face).

* Une probabilité empirique comporte une certaine incertitude de part le caractère aléatoire des échantillons.

  La **loi des grands nombres** dit que plus on augmente le nombre d'événements utilisés, plus la probabilité empirique se rapproche de la probabilité théorique. Typiquement, on considère que répéter un événement 1000 fois nous donne une bonne estimation de la probabilité théorique.

## Espérance

* L'**espérance** (*expectation* en anglais) d'une variable X est la moyenne obtenue après un grand nombre d'essais du processus.

  La moyenne des données est calculée à partir des résultats d'événements qui ont déjà eu lieu.  
  L'espérance est la moyenne qu'on s'attend à obtenir en admettant que les événements suivent la probabilité théorique.

  $$
  \mu_X \equiv E(X) = \sum_{i=1}^n p_i x_i = x_1 p_1 + \cdots + x_n p_n
  $$

* Ex: Dans l'exemple de la roulette utilisé précédemment, l'espérance de gains pour une mise de 1€ sera:

  $$
  E(x) = 35 \times \frac{1}{37} - 1 \times \frac{36}{37} = -\frac{1}{37}
  $$

  L'espérance est négative, ce qui signifie qu'en moyenne, le jeu n'est pas favorable au joueur.

* Formellement, ce que la loi des grands nombres dit, c'est que plus on augmente le nombre d'événements, plus la moyenne se rapproche de l'espérance:

  $$
  n \to \infty, \bar{X} \to E(X)
  $$

  ![](https://i.imgur.com/Zs4jnPA.png)

  [Law of Large Numbers Simulation](https://github.com/cmparlettpelleriti/CC2018/blob/master/LLN.md)

## Exclusifs, indépendents

* Deux événements sont dits **mutuellement exclusifs** (ou *disjoints*) s'ils ne peuvent pas se produire en même temps.

  Exemples:
  * Si on tire un dé, tomber sur un 1 exclut le fait de tomber sur un 2. On tombe soit sur 1 soit sur 2 mais pas les deux: P(1) et P(2) sont mutuellement exclusifs.

  * Si on demande aux gens s'ils ont un chien ou un chat, qu'une personne ait un chat n'exclut pas le fait qu'elle ait un chien. Une personne peut avoir un chien ou un chat ou les deux: P(chat) et P(chien) ne sont pas mutuellement exclusifs.

* Des événements sont dits **indépendants** si la réalisation de l'événement A n'influe pas la réalisation de l'événement B. Et inversemment, des événements sont dépendants si la réalisation de l'un influe la réalisation de l'autre.

  Ex: La probabilité de prendre un parapluie sachant qu'il pleut dehors est différente de la probabilité de prendre un parapluie sachant qu'il ne pleut pas dehors. Prendre un parapluie et pleuvoir sont donc des événements dépendants.

---

## Règles de probabilité

### Intersection d'événements / A ou B

Si deux événements sont mutuellement exclusifs, alors la probabilité d'avoir l'événement A ou l'événement B est P(A) + P(B)

$$
\text{Intersection} \\
\text{Événements mutuellement exclusifs:} \\
P(A \text{ ou } B) \equiv P(A \cup B) \\ = P(A) + P(B)
$$

<pre>
Ex: Si on tire au dé, quelle est la probabilité d'avoir un 1 ou un 2?

P(1 ∪ 2) = P(1) + P(2)
         = 1/6 + 1/6
         = 2/6 = 1/3
</pre>

Si des événements ne sont pas mutuellement exclusifs, alors il faut soustraire la probabilité des deux événements réunis pour ne pas compter les mêmes éléments deux fois (cette probabilité vaut 0 pour des événements mutuellement exclusifs).

$$
\text{Intersection} \\
\text{Ev. non mutuellement exclusifs:} \\
P(A \text{ ou } B) \equiv P(A \cup B) \\ = P(A) + P(B) - P(A \text{ et } B)
$$

<pre>
Ex: Suite à un sondage, on a récolté les données suivantes:

         | Chat | !Chat |
| Chien  | 2    | 4     |
| !Chien | 11   | 12    |

Quelle est la probabilité empirique qu'une personne ait un chat ou un chien?

Nombre total de personne: (2+4) + (11+12) = 29
P(chat)          = (2+11)/29     (&approx; 0.45)
P(chien)         = (2+4)/29      (&approx; 0.20)
P(chat et chien) = 2/29          (&approx; 0.07)
P(chat ou chien) = (2+11+2+4)/29 - 2/29 = (2+11+4)/29 (&approx; 0.57)
</pre>

### Union d'événements / A et B

Quand deux événements sont indépendants, la probabilité que les événements A et B se produisent tous deux est P(A) &times; P(B).

$$
\text{Union} \\
\text{Événements indépendants:} \\
P(A \text{ et } B) \equiv P(A \cap B) \\ = P(A) \times P(B)
$$

<pre>
Ex: On lance deux dés. Quelle est la probabilité que les dés tombent tous deux sur 1?  
Ces deux événements sont indépendants: le résultat obtenu sur le premier dé
n'a aucune influence sur le résultat obtenu sur le deuxième dé. On peut donc dire que

A = le 1er dé vaut 1
B = le 2ème dé vaut 2

P(A et B) = P(A) &times; P(B)
          = 1/6 &times; 1/6
          = 1/36 (&approx; 0.03)
</pre>

Quand deux événements sont dépendants, la probabilité que les événements A et B se produisent tous deux est P(A) &times; P(B|A) — où P(B|A) signifie "probabilité que l'événement B se produise sachant que l'événement A s'est produit".

$$
\text{Union} \\
\text{Événements dépendants:} \\
P(A \text{ et } B) \equiv P(A \cap B) \\ = P(B) \times P(A|B) \\
= P(A) \times P(B|A)
$$

<pre>
Ex: Sur 80 élèves, 30 étudient l'informatique.
Quelle est la probabilité qu'en prenant 2 étudiants au hasard, les 2 soient en informatique?

A = probabilité de choisir un étudiant en informatique
B = probabilité que le 2ème étudiant soit en informatique

P(A) = 30/80
P(B|A) = 29/79
P(A et B) = (30/80) × (29/79) = 870/6320 (&approx; 13.77%)
</pre>

### Probabilité conditionnelle / A si B

En utilisant la relation ci-dessus, on peut donc calculer la probabilité qu'un événement A se produise sachant qu'un événement B s'est produit comme suit:

$$
\text{Probabilité conditionnelle} \\
\text{Événements dépendants:} \\
P(A|B) = \frac{A \text{ et } B}{P(B)}
$$

<pre>
Ex: On a demandé à 100 jeunes s'ils préféraient avoir le super-pouvoir
"voler", "se rendre invisible" ou "autre". On a récolté les données suivantes:

                      | Garçon | Fille  |
| Voler               | 26     | 12     |
| Se rendre invisible | 12     | 32     |
| Autre               | 10     | 8      |

1. Quelle est la probabilité qu'un enfant ait choisit "voler"?
   P(voler) = (26+12)/100 = 38/100

2. Quelle est la probabilité qu'un enfant soit un garçon?
   P(garçon) = (26+12+10)/100 = 48/100

3. Quelle est la probabilité qu'un enfant soit un garçon et ait choisit voler?
   P(voler et garçon) = 26/100

4. Quelle est la probabilité qu'un garçon ait choisit voler?
   P(voler|garçon) = P(voler et garçon)/P(garçon)
                   = 26/100 &div; 48/100
                   = 26/48 &approx; 54%

5. Quelle est la probabilité qu'un enfait ayant choisit voler soit un garçon?
   P(garçon|voler) = P(voler et garçon)/P(voler)
                   = 26/100 &div; 38/100
                   = 26/38 &approx; 68%
</pre>

### Exemple d'application union & intersection

<pre>
Ex: On a mis 8 pièces dans un sac, parmi lesquelles 3 sont truquées.  
Les pièces truquées ont 60% de chance de tomber sur Face.  
On pioche une pièce au harsard dans le sac, et on la lance deux fois de suite.  
Quelle est la probabilité d'obtenir deux fois Face?

 P(FF | Truquée)      = 0.6 × 0.6 = 0.36
 P(Truquée)           = 3/8 = 0.375
 P(Truquée et FF)     = 0.375 × 0.36 = 0.135

 P(FF | Non truquée)  = 0.5 × 0.5 = 0.25
 P(Non truquée)       = 1-(3/8) = 5/8 = 0.625
 P(Non truquée et FF) = 0.625 × 0.25 = 0.15625

P(FF) = P(Truquée et FF) + P(Non truquée et FF)
      = 0.135 + 0.15625
      = 0.29125
      &approx; 29%
</pre>

### Test d'indépendance

Si A et B sont indépendants, par définition, la probabilité que l'événement A se produise est égale à la probabilité que l'événement A se produise si l'événement B s'est produit: P(A|B) = P(A).

$$
\text{Preuve} \\
\text{Événements indépendants:} \\
P(A|B) = P(A)
$$

<pre>
Ex: On a mené une enquête sur le salaire annuel de 300 jeunes ingénieurs
de deux écoles différentes. On a récolté des données suivantes:

| Salaire      | École A | École B |
| ≤ 19000€     | 36      | 24      |
| 20000-39999€ | 109     | 56      |
| ≥ 40000€     | 35      | 40      |

Est-il plus probable qu'un étudiant de l'école B gagne plus de 40000€
par rapport à la population générale? En d'autres termes, P(étudiant de l'école B)
et P(gagne plus de 40000€) sont-elles indépendantes?

A = étudiant de l'école B
B = gagne plus de 40000€

Nombre total de personnes: 36+109+35 + 24+56+40 = 300
P(A)   = (24+56+40)/300 = 120/300 (= 40%)
P(B)   = (35+40)/300    = 75/300  (= 25%)
P(B|A) = 40/120 = 1/3             (&approx; 33%)

La probabilité qu'un ingénieur choisit au hasard
ait un salaire annuel supérieur à 40000€ (25%)
est inférieure à la probabilité qu'un ingénieur de l'école B choisit au hasard
ait un salaire annuel supérieur à 40000€ (33%).
Les événements ne sont donc pas indépendants.
</pre>

Lorsqu'on vérifie l'indépendance de deux événements en utilisant des probabilités empiriques, il est rare d'obtenir des probabilités parfaitement égales. Dans la pratique, on suppose souvent que les événements sont indépendants et on teste cette hypothèse à partir des données observées sur un échantillon. Si les probabilités sont significativement différentes, alors on conclut que les événements ne sont pas indépendants. C'est le domaine de la statistique inférentielle.

### Théorème de Bayes

Parfois on connaît P(A|B) mais on voudrait connaître P(B|A).  
Le théorème de Bayes dit que:

$$
\text{Théorème de Bayes} \\
P(A|B) = \frac{P(A) \times P(B|A)}{P(B)}
$$

<details>
<summary>Démonstration</summary>
$$
\begin{aligned}
\text{Définition A|B:}\\
P(A|B) &= \frac{P(A \text{ et } B)}{P(B)} \\
P(A \text{ et } B) &=  P(A|B) \times P(B) \\
\\
\text{Définition B|A:}\\
P(B|A) &= \frac{P(A \text{ et } B)}{P(A)} \\
P(A \text{ et } B) &=  P(B|A) \times P(A) \\
\\ 
\text{Via égalité A et B:}\\[5pt]
P(A|B) \times P(B) &= P(B|A) \times P(A) \\[2pt]
P(A|B) &=\frac{P(B|A) \times P(A)}{P(B)}
\end{aligned}
$$
</details>

<pre>
Ex: Votre soeur mentionne que son ami a un cancer du sein.  
Votre intuiton vous dit qu'il s'agit d'une femme.
Mais quelle est la probabilité que ce soit un homme?

Grâce aux agences gouvernementales, vous connaissez les statistiques suivantes:
P(cancer sein) = 0.063
P(cancer sein | homme) = 0.001
On partira du principe que P(homme) est 0.5.

P(homme | sein cancer) = (P(cancer sein | homme) &times P(homme)) / P(cancer sein)
                       = (0.001 &times; 0.5) / 0.063
                       &approx; 0.0079 &approx; 0.79%

C'est donc peu probable — mais la probabilité que ce soit un homme
est peut-être plus élevée que vous ne l'auriez anticipé.
</pre>