---
title: Suites
category: Maths, Algèbre
latex: true
---

## Définition d'un Suite

* Une suite numérique est une liste de nombres réels.  
  Exemple: 1, 3, 5, 7, 9, etc, est la liste des entiers naturels impairs rangés dans l'ordre croissante.

  La différence entre une suite et un ensemble de nombres, c'est le fait que dans une suite, l'ordre des éléments a son importance. Si le nombre d'éléments de la suite est fini, on parle de *suite finie*; sinon, de *suite infinie* (ce qui est la majorité des cas).

* Un élément d'une suite est appelé un *terme*.  
  Une suite *u*, composée de *n* termes allant de 0 à *n*,donc qui appartiennent aux entiers naturels (ℕ), se note $$(u_n)_{n \in {\bf N}}$$.  
  Une suite *v*, composée de *n* termes allant de 1 à *n*, donc qui appartiennent aux entiers naturels supérieurs à 0 (ℕ<sup>\*</sup>), se note $$(v_n)_{n \in {\bf N^*}}$$.  
  Le terme d'indice 0 se note $$u_0$$, celui d'indice 1 $$u_1$$, etc.  

* Le *rang* d'un terme, c'est son indice dans la suite.  
  Si le premier terme est d'indice 0, alors le 100ème terme est d'indice (ou rang) 99.  
  Si le premier terme est d'indice 1, alors le 100ème terme est d'indice (ou rang) 100.

  ![](https://i.imgur.com/3lCT87F.png)

* Une suite peut être définie

  * avec <ins>une définition explicite</ins>.  
    On définit une formule qui permet de calculer la valeur du terme de rang *n*.  
    Ex:

    $$
    \boxed{\text{Définition explicite:}} \\
    (a_n)_{n \in {\bf N}^*} \text{ de forme explicite } a_n = 2n
    $$

    <!-- -->

    $$
    \boxed{\text{Premiers termes:}} \\
    a_1 = 2 \times 1 = 2 \\
    a_2 = 2 \times 2 = 4 \\
    a_3 = 2 \times 3 = 6
    $$

  * avec <ins>une définition par récurrence</ins>.  
    On définit le premier terme de la suite (appelé le *terme initial*) et la formule qui permet de calculer le terme suivant. Cette formule est appelée *relation de récurrence*.
    Lorsqu'une suite est définie par récurrence, le calcul de u<sub>n</sub> nécessite le calcul pas à pas de tous les termes précédents.  
    Ex:

    $$
    \boxed{\text{Définition par récurrence:}} \\
    \begin{align}
      & (w_n)_{n \in {\bf N}^*} \\
      & \begin{cases}
        w_{1} &= 1 \\
        w_{n} &= w_{n-1} + 4
      \end{cases}
    \end{align}
    $$

    <!-- -->

    $$
    \boxed{\text{Premiers termes:}} \\
    \begin{align}
      w_1 &= 1 \\
      w_2 &= w_1 + 4 = 5 \\
      w_3 &= w_2 + 4 = 9
    \end{align}
    $$

  * avec <ins>des mots</ins>.  
    On définit la suite en utilisant le langage naturel.  
    Par exemple: la suite des éléments entiers positifs pairs (2,4,6,8,...).  
    Il existe des suites dont on ne sait pas calculer les termes ni en fonction de *n*, ni en fonction des précédents termes. C'est le cas de la suite des nombres premiers (2, 3, 5, 7, 11, 13, 17, ...)

## Suite arithmétique vs suite géométrique

* Une suite est dite *arithmétique* si, pour passer d'un nombre à l'autre, on additionne toujours la même constante.  
  La constante à additionner est appelée la *raison*. 

  $$
  \boxed{\text{Suite arithmétique:}} \qquad \\
  i, (i+r), (i+2r), (i+3r), ... \\[10pt]
  \underline{\text{Définition explicite: }} \qquad \\
  a_n = i + r \times (n - 1) \\[5pt]
  \\
  \underline{\text{Définition par récurrence:}} \\
  \begin{align}
  a_1 &= i \\
  a_n &= a_{n-1} + r
  \end{align}
  $$

  ![](https://i.imgur.com/Ou3gRI2.png)

- Une suite est dite *géométrique* si, pour passer d'un nombre à l'autre, on multiplie toujours par le même facteur.  
  Dans ce cas facteur multiplicatif est appelé la raison.

  $$
  \boxed{\text{Suite géométrique:}} \qquad \\
  i, ir, ir^2, ir^3, ... \\[10pt]
  \underline{\text{Définition explicite: }} \qquad \\
  a_n = i \times r^{n - 1} \\[5pt]
  \\
  \underline{\text{Définition par récurrence:}} \\
  \begin{align}
  a_1 &= i \\
  a_n &= a_{n-1} \times r
  \end{align}
  $$

  ![](https://i.imgur.com/T59QcNd.png)

- <ins>Exemple de suite arithmétique</ins>:

  ![](https://i.imgur.com/kR7uwOB.png)

  <ins>Exemple de suite non arithmétique</ins>:

  ![](https://i.imgur.com/z4staJy.png)

  <ins>Exemple de suite géométrique</ins>:

  ![](https://i.imgur.com/7EOqWyY.png)

* <ins>Exercise 1</ins>:

  ![](https://i.imgur.com/aToHwmg.png)

  <ins>Exercise 2</ins>:

  ![](https://i.imgur.com/Nu5phkR.png)

  <ins>Exercise 3</ins>:

  ![](https://i.imgur.com/ssAcV2o.png)

  <ins>Exercise 4</ins>:

  ![](https://i.imgur.com/uxYaOnv.png)

  <ins>Exercise 5</ins>:

  ![](https://i.imgur.com/rhmfxEo.png)

## Somme des termes

### D'une suite arithmétique

* On peut calculer la somme des termes d'une suite arithmétique (ex: 1 + 2 + ··· + n) grâce à la formule suivante:

  $$
  \text{Notation: } \sum_{k=1}^n k \qquad \qquad \\[15pt]
  = \frac{n(n + 1)}{2}
  $$

### D'une suite géométrique

* On peut calculer la somme des termes d'une suite géométrique (ex: 1 + q + q² + ··· + q<sup>n</sup>) grâce à la formule suivante:

  $$
  \text{Notation: } \sum_{k=1}^n r^k \qquad \qquad \\[15pt]
  = \frac{1 - r^{n}}{1 - r}
  $$

  Notons que si on commence par l'index 0 (et non 1), alors il faut mettre en puissance n+1 (et non n) — on met en puissance le nombre de termes.

* <ins>Exemple</ins>:  
  Une entreprise met en vente un produit qui connaît un succès grandissant. La première semaine de mise sur le marché de son produit lui a apporté 500 € de recette. Chaque semaine, ses recettes augmentent de 5% par rapport à la semaine précédente. Quel est le montant total des recettes perçues en 3 semaines ? Et en 30 semaines ?

  <pre>
  U = 500 × 1.5<sup>n-1</sup>

  En 3 semaines à la main:
  U1 = 500
  U2 = 500 × 1.5 = 750
  U3 = 750 × 1.5 = 1125
  sum(1,3) = 500 + 750 + 1125 = 2375

  En 3 semaines avec la formule:
  sum(1,3) = 500 * (1 - 1.5**3)/(1 - 1.5) = 2375

  En 30 semaines avec la formule:
  sum(1,30) = 500 * (1 - 1.5**30)/(1 - 1.5) = 191'750'059.233
  </pre>

---

## Suites particulières

* La notion de suite est indissociable des procédures itératives utilisées dès l'Antiquité, notamment chez le scientifique grec Archimède de Syracuse pour trouver des approximations de nombres irrationnels comme &pi; ou de grandeurs à mesurer: surfaces, volumes...

### Suite de Fibonacci

* Dans un des problèmes du *Liber Abaci*, Fibonacci cherche à modéliser mathématiquement l'évolution d'un élevage de lapins. Il considère alors les hypothèses simplifiées suivantes:

  1. Un couple de lapins n'est pas en âge de se reproduire pendant ses deux premiers mois
  2. À partir de son troisième mois, un couple donne naissance à un nouveau couple tous les mois

  La suite formée par le nombre de couples au fil du temps sera: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...  
  Fibonacci remarque que chaque mois, la population de lapins est égale à la somme des deux mois précédents: 1+1=2, 1+2=3, 2+3=5, 3+5=8 et ainsi de suite.

* Pour Fibonacci, ce problème est avant tout une énigme récréative, et pourtant la suite démographique des lapins trouve dans les siècles suivants de multiples applications, aussi bien pratiques que théoriques. Entre autres curiorités, la suite de Fibonacci va révéler un lien très profond avec un nombre connu depuis l'Antiquité: le nombre d'or (&phi;).

#### Nombre d'or

* La valeur du nombre d'or (&phi;) est approximativement égale à 1.618.  
  Un rectangle d'or est un rectangle dont la longueur est de &phi; fois plus grande que la largeur. Si on découpe un carré dans sa largeur, alors le petit rectangle qui reste est toujours un rectangle d'or.

  ![](https://i.imgur.com/Uu1dQRy.jpg)

  Le nombre d'or se décline en de nombreuses variantes géométriques, la plus connue étant le rectangle.  
  Mais on voit aussi apparaître &phi; dans les pentagones réguliers et les spirales.  
  Les Grecs le considéraient comme une proportion parfaite. 

* Lorsqu'on cherche à calculer sa valeur exacte par des méthodes algébriques, on tombe sur l'équation suivante: &phi;² = &phi; + 1.  
  La méthode d'al-Khwarizmi permet alors d'obtenir sa formule exacte: &phi; = (1 + &radic;5) / 2 ≈ 1,618034.

* Si on observe la multiplication des lapins suffisamment longtemps, on constatera que chaque mois, leur nombre est approximativement multiplié par &phi; — plus le temps passe, plus le facteur multiplicatif d'un mois à l'autre se rapproche du nombre d'or.

### Suite de pi

* L'utilisation des suites arithmétiques infinies va se révéler d'une grande utilité dans le calcul des nombres de la géométrie tels que &pi; ou les rapports trigonométriques (sinus / cosinus / tangente). Si ces nombres ne sont pas exprimables avec les opérations élémentaires classiques, il devient possible de les obtenir par des suites d'additions.

* L'un des premiers à avoir exploré cette possibilité fut le mathématicien indien Madhava de Sangamagrama qui découvrit aux alentours de l'an 1500 une formule pour le nombre pi:

  <pre>
  pi = (4/1) + (-4/3) + (4/5) + (-4/7) + (4/9) + (-4/11) + (4/13) + ...
  </pre>

  Les termes de la suite de Madhava sont alternativement positifs et négatifs et s'obtiennent en divisant 4 par les nombres impairs successifs. Si on prend les 100 premiers termes, on arrive à 3.13 et après un million de termes à 3.141592. La suite de Madhava a le défaut de converger très lentement. Plus tard, d'autres mathématiciens découvrirons une multitude d'autres suites dont la somme est égale à &pi;, mais qui s'en rapprochent beaucoup plus rapidement.

### Suite du cosinus

* Les rapports trigonométriques ont aussi leurs suites.  
  Par exemple pour le cosinus d'un angle donné:

  <pre>
  cosinus(angle) = 1 - (angle²/1×2) + (angle<sup>4</sup>/1×2×3×4) + (angle<sup>6</sup>/1×2×3×4×5×6) + ...
  </pre>

  Des formules similaires existent pour les sinus, les tangentes ainsi que pour une multitude d'autres nombres particuliers apparus dans différents contextes.

---

## Sens de variation

* Une suite arithmétique de raison *r* est croissante pour r > 0 et décroissante pour r < 0.
* Une suite q<sup>n</sup> est croissante pour q > 1 et décroissante pour 0 < q.

  ![](https://i.imgur.com/RFA3zdM.png)

* Il peut arriver qu'une suite soit croissante (ou décroissante) à partir d'un certain rang.  
  Pour étudier le sens de variation d'une suite définie par une relation explicite, on utilise en général une des méthodes suivantes:

  1. Étudier le sens de variation de *f*.  
     Si la fonction *f* est croissante sur [0; +∞[ alors la suite (u<sub>n</sub>)<sub>n ∈ ℕ</sub> est croissante.

  2. Étudier le signe de u<sub>n+1</sub> pour tout 𝑛 ∈ ℕ.  
     Si pour tout 𝑛 ∈ ℕ, u<sub>n+1</sub> - u<sub>n</sub> ≥ 0, alors u<sub>n+1</sub> ≥ u<sub>n</sub>. La suite est donc croissante.  
     Et inversemment.

  3. Comparer u<sub>n+1</sub> / u<sub>n</sub> à 1 si u<sub>n</sub> > 0 pour tout 𝑛 ∈ ℕ.  
     Si pour tout 𝑛 ∈ ℕ, u<sub>n+1</sub> ÷ u<sub>n</sub> ≥ 1, alors u<sub>n+1</sub> ≥ u<sub>n</sub>. La suite est donc croissante.  
     Et inversemment.

  Pour étudier le sens de variation d'une suite récurrente, on peut être amené à montrer par récurrence que pour tout 𝑛 ∈ ℕ, u<sub>n+1</sub> ≥ u<sub>n</sub> (ou l'inverse).

## Raisonnement par récurrence

* La *raisonnement par récurrence* s'applique lorsqu'on cherche à démontrer  
  qu'une propriété *P* dépendant d'un entier naturel *n* (qu'on notera P<sub>n</sub>) est vraie pour tout entier n ≥ n<sub>0</sub> (n<sub>0</sub> donné).  
  Par exemple: démontrer que 2<sup>n</sup> ≥ 4n pour tout n ≥ 4.

* On procède en 3 étapes:

  1. **Initialisation**.  
     On montre que la propriété P<sub>n</sub> est vraie pour n = n<sub>0</sub>.  

     <ins>Exemple</ins>:  
     Montrons que P<sub>4</sub> est vraie. Pour n = 4,  
     - 2<sup>n</sup>: 2<sup>4</sup> = 16  
     - 4n: 4×4 = 16  
     - 16 ≥ 16 donc 2<sup>n</sup> ≥ 4 est vrai
     - P<sub>4</sub> est vraie (la propriété est vraie au rang 4), il y a donc initialisation.

  2. **Hérédité**.  
      On démontre que, si la propriété P<sub>k</sub> est supposée vraie pour un certain rang k ≥ n<sub>0</sub>, alors P<sub>k+1</sub> est vraie.  
      On dit que la propriété est *héréditaire* à partir du rang n<sub>0</sub>

      <ins>Exemple</ins>:  
      Montrons que si l'hypothèse de récurrence est vraie  (si pour un certain rang k ≥ 4, P<sub>k</sub> est vraie), alors P<sub>k+1</sub> est vraie.

      - 2<sup>k+1</sup>:  
        D'après l'hypothèse de récurrence, 2<sup>k</sup> ≥ 4k.  
        On sait que 2<sup>k+1</sup> = 2<sup>k</sup>×2, ainsi si on admet l'hypothèse de récurrence,  
        (2<sup>k</sup>×2) ≥ (4k×2)  
        (2<sup>k+1</sup>) ≥ 8k  

      - 4(k+1):  
        On doit vérifier que 8k ≥ 4(k + 1).  
        Cette inégalité est l'équivalent de  
        8k ≥ 4k + 4  
        4k ≥ 4

        En d'autres termes, on doit vérifier que que 4k ≥ 4.  
        Puisque k ≥ 4, on sait que 4k ≥ 4.  
        Par conséquent (2<sup>k+1</sup>) ≥ 8k ≥ 4(k + 1) est vrai.  
      
      - P<sub>k+1</sub> est vraie, il y a donc hérédité.

  3. **Conclusion**.  
     On combine les étapes 1 et 2. La propriété P<sub>n</sub> est vraie au rang n = n<sub>0</sub> et est héréditaire à partir du rang n<sub>0</sub>. Donc P<ubs>n</ubs> est vraie au rang n<sub>0</sub> + 1 et étant héréditaire à partir du rang n<sub>0</sub>, elle est donc vraie au rang n<sub>0</sub> + 2. En procédant ainsi, pas à pas, on peut conclure que la propriété P<sub>n</sub> est vraie pour n'importe quel entier n ≥ n<sub>0</sub>

     <ins>Exemple</ins>:  
     La propriété P<sub>n</sub> est vraie pour n = 4 et héréditaire à partir du rang 4, donc d'après le principe de récurrence:  
     pour tout entier n ≥ 4, P<sub>n</sub> est vraie. C'est à dire 2<sup>n</sup> ≥ 4n pour tout entier n ≥ 4.

## Majorant, minorant, borne

* Une suite est dite *majorée* par un nombre réel M lorsque pour tout 𝑛 ∈ ℕ, u<sub>n</sub> ≤ M.  
  Et M est le *majorant*, ce qui signifie qu'il est plus grand que n'importe quel élément de U.  
  Si une suite est majorée par 𝑀 elle est aussi majorée par tous les réels plus grands que 𝑀.

  Une suite est dite *minorée* par un réel 𝑚 lorsque pour tout 𝑛 ∈ ℕ, u<sub>n</sub> ≥ 𝑚.
  Et 𝑚 est le *minorant*.  
  Une suite est dite *bornée* lorsqu'elle est à la fois majorée et minorée.

  ![](https://i.imgur.com/OW7JRRN.png)

* Une suite croissante est minorée par son premier terme.  
  Une suite décroissante est majorée par son premier terme.

  Le plus petit des majorant est appelé borne supérieure.  
  Le plus grand des minorant est appelé borne inférieure.
