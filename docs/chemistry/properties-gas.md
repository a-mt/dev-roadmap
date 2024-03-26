---
title: L'état gazeux
category: Chimie
---

# Pression

* On appelle *pression* le poids d'un liquide ou gaz par unité de surface  
  — autrement dit, la force qu'il exerce sur une surface donnée.

    ```
    Pression = Force / Surface
    ```

  La *pression athmosphérique* est le poids qu'exerce le mélange de gaz constituant l'astmosphère  
  sur une surface quelconque en contact avec elle.

* On peut mesurer cette pression à l'aide d'un baromètre de mercure.  
  La pression est alors exprimée en milimètre de mercure, aussi appelé *torr* — en hommage à Torricelli, inventeur du baromètre.

  ```
  1 mmHg = 1 torr
  ```

## Pascal

* Dans le système international, la pression s'exprime en Pascal (noté *Pa*).  
  1 Pascal correspond à une force d'1 Newton s'exerçant sur une surface d'1m².

    ```
    1 Pascal = 1 Newton/1m²
    ```

  1 bar correspond à 100 000 Pascal, donc 1 000 hPa.  
  1 atmosphère (noté *atm*) correspond à 1 013 hPar, soit 760 mm de mercure ou torr.

  ```
  1 bar = 10'000 Pa = 1'000 hPa
  1 atm = 101'325 Pa = 760 mmHg = 760 torr
  ```

## Critères

* La pression dépend du nombre du nombre de collisions par seconde des particules de gaz contre les parois d'un récipient. Plus la fréquence des collisions est élevée, plus la pression est grande.

  Cette pression dépend donc 1/ de la quantité de gaz, 2/ du volume disponible, 3/ de la vitesse à laquelle les particules de gaz bougent, c'est à dire la température du gaz. Il existe différentes lois pour déterminer l'évolution la pression d'un gaz selon ces différents paramètres.

# Loi de Boyle-Mariotte

* De toutes choses égales par ailleurs (température et quantité de gaz), <ins>lorsque le volume augmente, la pression diminue</ins>.  
  Et lorsque le volume diminue, la pression augmente — ce qui est logique, puisque la fréquence des collisions augmente.

  ![](https://i.imgur.com/AaCLsHLm.jpg)

* Lorsqu'on monte en altitude, il y a de plus en plus d'espace disponible dans lequel le gaz peut circuler: le volume augmente et la pression diminue.
  C'est la raison pour laquelle les paquets de chips sont inflatés lorsqu'on est au sommet d'une montagne: la pression à l'extérieur est moindre, le volume à l'intérieur du sachet va donc augmenter jusqu'à ce que la pression à l'intérieur du sachet soit la même qu'à l'extérieur.

* Inversemment, dans l'eau, plus on descend, plus le poids de la colonne d'eau (la quantité d'eau située au-dessus d'une surface donnée) est importante, et plus la pression exercée augmente — sur les solides mais aussi sur les gaz. Elle augmente d'un bar tous les 10 mètres.

  Lorsqu'un plongeur descend, si la pression des gaz à l'intérieur de ses poumons est inférieure de celle à l'extérieur, alors le volume des poumons diminue: il se retrouve comprimé et incapable de respirer. Le détendeur de la bouteille de plongée permet de réguler la pression pour éviter que ça arrive.

  Et si le plongeur remonte trop vite, le volume des poumons augmente et, la cage thoracique limitant cette expansion, la pression du gaz à l'intérieur des poumons va augmenter: cela entraîne une *surpression pulmonaire* qui provoque la destruction des alvéoles pulmonaires. Pour éviter que ça arrive, il faut remonter doucement tout en expirant.

* La *loi de Boyle-Mariotte* dit que:  
  La pression et le volume d'un gaz sont donc inversement proportionnels — P = k 1/V

  <pre>
  <img src="https://i.imgur.com/G6BugPY.png" />
  </pre>

# Loi de Charles

* Lorsqu'on chauffe un gaz, les particules de gaz se déplacent plus rapidement et occupent plus d'espace: le gaz se dilate.  
    On se sert de ce principe dans les mongolfières: quand l'air présent dans le ballon est chauffé, les molécules s'écartent les unes des autres et repoussent l'enveloppe du ballon. L'air se dilate et, étant moins dense que l'air alentour, le ballon s'élève.  
    Si le volume ne peut pas augmenter, alors c'est la pression qui augmente.

* La *loi de Charles* dit que:  
  Le volume d'un gaz est directement proportionnel à sa température absolue  
  (c'est à dire sa température exprimée en Kelvins).  

  <pre>
  <img src="https://i.imgur.com/jOqyFfr.png" />
  </pre>

# Loi d'Avogadro

* Des volumes égaux de différents gaz, aux mêmes conditions de température et de pression,  
  contiennent le même nombre de mole de gaz

* La *loi d'Avogadro* dit que   
  Le volume est proportionnel à la quantité en mole.

  ```
  Loi d'Avogadro:
  V ∝ n
  ````

  <ins>Exemple</ins>:  
  Le volume de l'air est composé à 20% d'O<sub>2</sub> et 80% de N<sub>2</sub>:  
  le nombre de moles présents dans l'air est donc 20% d'O<sub>2</sub> et 80% de N<sub>2</sub>

## Conditions Normales de Température et de Pression

* Les conditions normales de température et de pression (abrégé CNTP),  
  ont été définies à 0°C et 1 atm.

  ```
  Conditions normales de température et de pression (CNTP):
  0°C (273.15K) et 1 atm
  ```

* Dans ces conditions, le volume d'une mole de gaz vaut 22.4L

    <pre>
    n = 1 mol de gaz
    V<sub>molaire</sub> = 22.4 L
    </pre>

* <ins>Exemple</ins>:  
  Une voiture équipée d’un moteur essence de 1400cm³ rejette 150g de CO<sub>2</sub> par km.  
  Quel est le volume correspondant à cette masse si on considère le gaz dans les conditions normales de température et de pression?

  * Compter le nombre de moles rejetées:   
    La masse du dioxyde de carbone (150g) divisée par sa masse molaire — M(CO<sub>2</sub>)

  * Multiplier le nombre de moles obtenu par le volume standard molaire, 22.4L

  <pre>
  V = 22.4 × 150/(12.01 + 2×16.00)
    = 76.3 L
    = 76.3 × 10<sup>-3</sup>m<sup>3</sup>
  </pre>

# Équation des gaz parfaits

* L'*équation des gaz parfaits* est une loi qui combine les trois précédentes et qui dit que:  
  Le volume est proportionnel au nombre de mole fois la température divisé par la pression : V ∝ nT / P

  <pre>
  <img src="https://i.imgur.com/Z8BMwkT.png" />
  </pre>

  Une autre manière de le formuler est:

  ```
    V = RnT / P
  P V = RnT

  où R CNTP = 0.08 atm/mol/K
  ```

  R est la *constante de proportionnalité* (ou *constante molaire des gaz*) entre le volume du gaz et les conditions de l'expérience. Dans des conditions normales de température et de pression, R vaut 0.08 atm/mol/K

  ![](https://i.imgur.com/G1XMslcl.png)

* <ins>Exemple</ins>:  
  Les molécules d’ozone de la stratosphère absorbent une bonne part des radiations UV en provenance du soleil. La température de la stratosphère est sensiblement constante (-23°C) et la pression due à l’ozone vaut 1.4.10<sup>-7</sup> atm.  
  Calculer le nombre de molécules d’ozone présentes dans 1.0 mL.

  <pre>
   PV = nRT
    n = PV / RT
      = (1.4 × 10<sup>-7</sup> · 1 × 10<sup>-3</sup>) / (0.082058 · (-23 + 273.15))
      = 6.8 × 10<sup>-12</sup> mol

  Nombre de molécules:
  N<sub>A</sub>·n = 6.022 × 10<sup>23</sup> · 6.8 × 10<sup>-12</sup>
       = 4.1 × 10<sup>12</sup> molécules
  </pre>

## Gaz parfaits

* Ces lois ne sont strictement valables pour que pour les gaz dits *parfaits*, ceux pour lesquels on peut négliger les forces d'interaction entre les atomes ou les molécules constitutifs du gaz. Il faut pour cela 1/ que les atomes ou molécules soient suffisamment éloignés, donc une pression modérée, 2/ que l'énergie cinétique des atomes ou molécules soit suffisante, donc une température suffisamment élevée.

  À pression atmosphérique ordinaire (1 bar = 1000 hPa) et à température ambiante (-10°C à +30°C), on n'observe pas de déviations trop importantes par rapport à l'équation des gaz parfaits. De nombreux gaz vérifient ce modèle, comme le diazote ou le dioxygène. Pour l'ammoniac (NH<sub>3</sub>), sous 1 bar et à 0°C, la correction à apporter à l'équation des gaz parfaits est de l'ordre de grandeur de 2%.

## Calculer la masse Volumique avec la masse Molaire

* Sur base de l'équation d'état des gaz parfaits, il est possible de déterminer la masse volumique ρ d'un gaz, connaissant sa masse molaire M:

  <pre>
  PV = nRT
  ρ  = m/V
  m  = n.M

  ρ = (P . M) / (R . T)
  </pre>

# Loi de Dalton

* La *loi Dalton* ou *loi des pressions partielles* dit que:  
  Dans un mélange de plusieurs gaz parfaits, chaque gaz exerce une pression propre égale à celle qu'il exercerait s'il était seul dans le récipient.
  Les pressions individuelles, appelées *pressions partielles*, s'additionnent donc simplement pour donner la pression totale exercée par le mélange

  <pre>
  P<sub>totale</sub> = &sum;P<sub>i</sub>
  </pre>

  ![](https://i.imgur.com/znZLVEK.png)

* <ins>Exemple</ins>:  
  On a deux flacons, reliés par un tube muni d’un robinet d’arrêt.  
  Le premier a un volume de 500 mL et contient du N<sub>2</sub> (g) à une pression de 700 torrs.  
  L’autre a le volume de 400 mL et contient du O<sub>2</sub> (g) à une pression de 950 torrs.  
  On ouvre le robinet de manière à ce que les deux gaz puissent se mélanger complètement (pas de réaction chimique).  
  Quelle est la pression totale du mélange ainsi formé ?

  <pre>
  Pression du N<sub>2</sub>:
  P<sub>f</sub>(N<sub>2</sub>) = P<sub>i</sub>(N<sub>2</sub>) . V<sub>i</sub>(N<sub>2</sub>) / V<sub>f</sub>(N<sub>2</sub>)
         = 700 . 500 / (500+400)
         = 389 torrs

  Pression du O<sub>2</sub>:
  P<sub>f</sub>(O<sub>2</sub>) = P<sub>i</sub>(O<sub>2</sub>) . V<sub>i</sub>(O<sub>2</sub>) / V<sub>f</sub>(O<sub>2</sub>)
         = 950 . 400 / (500+400)
         = 422 torrs

  Pression du mélange:
  P<sub>totale</sub> = P<sub>f</sub>(N<sub>2</sub>) + P<sub>f</sub>(O<sub>2</sub>)
         = 389 + 422
         = 811 torrs
  </pre>

## Fraction molaire

* La *fraction molaire* (notée X<sub>A</sub>) d'un composant A dans un mélange est:  
  Le rapport entre la quantité de substance A (n<sub>A</sub>) et la quantité totale de tous les constituants du mélange (n<sub>total</sub>)

  <pre>
  Fraction molaire:
  X<sub>A</sub> = n<sub>A</sub> / n<sub>total</sub>
  </pre>

* Ce rapport est égal au rapport entre la pression partielle du gaz A et la pression totale.  
  Chaque gaz contribue donc à la pression totale au prorata de sa fraction molaire.

  <pre>
  X<sub>A</sub> = n<sub>A</sub> / n<sub>total</sub> = P<sub>A</sub> / P<sub>totale</sub>
  </pre>

  ![](https://i.imgur.com/706TbQA.png)

* Ainsi, on peut calculer la pression partielle d'un gaz en multipliant sa fraction molaire par la pression totale du mélange.

  <ins>Exemple</ins>:  
  Un mélange de gaz, dont la masse est égale à 0.428g,  
  est enfermé dans un récipient en verre et y exerce une pression de 1.75 atm.  
  Ce mélange contient 15.6 % de N<sub>2</sub>, 46.0 % de N<sub>2</sub>O et 38.4 % de CO<sub>2</sub> (pourcentages en masse).  
  Quelle est la pression partielle des différents gaz?

  1/ Calculer les masses de chaque gaz  
  2/ Calculer la masse molaire de chaque gaz et en déduire le nombre de moles présent  
  3/ Calculer les pressions partielles

  ![](https://i.imgur.com/KQPHi41.png)

* <ins>Exemple 2</ins>:  
  La tolérance de l'organisme à divers gaz varie selon la nature du gaz et la pression à laquelle ils sont respirés. Par exemple, l’oxygène est toxique quand sa pression partielle dépasse 1.6 bars et l’azote est toxique si sa pression partielle dépasse 3 bars.

  <pre>
  p<sub>total</sub>(70m) = 1 + 7*1 = 8 bars

  p<sub>O</sub> = p<sub>total</sub>(70m) * X<sub>O</sub>
     = 8 * 0.2
     = 1.6
  </pre>

  Une pression partielle en oxygène de 1.6 bars est atteinte à 70m de profondeur.  
  À 70m de profondeur, un plongeur risque l’hyperoxie — une inflammation des alvéoles pulmonaires et un oedème aigu du poumon.

  <pre>
  p<sub>total</sub>(30m) = 1 + 3*1 = 4

  p<sub>N</sub> = p<sub>total</sub>(30m) * X<sub>N</sub>
     = 4 * 0.8
     = 3,2
  </pre>

  Une pression partielle en azote de 3 bars est dépassé à 30m de profondeur.  
  À 30m de profondeur, un plongeur risque la narcose, aussi appelée ivresse des profondeurs.  
  Les plongeurs qui souhaitent aller au-delà de ces profondeurs seuils doivent utiliser d’autres mélanges gazeux comme le Trimix: mélange d’oxygène, d'hélium et d'azote, car l'hélium est beaucoup moins narcotique.
