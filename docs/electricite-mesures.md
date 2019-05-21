---
title: Les mesures du courant
category: Other, Éléctricité
---

## Mesures du courant continu

### Intensité: A

L'*intensité* (I) du courant électrique, c'est le nombre d'électrons qui passent chaque seconde.  
Elle est parfois appelée "ampérage" ou juste "courant".

<ins>Unité</ins>:  
L'intensité est mesurée en *ampère* (A). Une ampère est égale à un Coulomb par seconde — autrement dit, si on a un courant de 5 ampères, il y a 5 coulombs qui passent chaque seconde.

    I (ampères) = C / s

<ins>Analogie avec l'eau</ins>:  
Si on dresse une analogie entre un courant électrique et un courant d'eau, l'intensité correpsond au *débit* — le volume d'eau traversant un point en une seconde.

![](https://i.imgur.com/0QKWeq4.gif)

[Les grandeurs électriques](https://www.youtube.com/watch?v=2nyb9AQ5MiY)

<ins>Ordres de grandeur</ins>:  
Tous les appareils n'ont pas besoin de la même intensité.  
Une ampoule a besoin d'un petit débit, la moitié d'un ampère.  
Un radiateur a besoin d'un gros débit, 10 A.

| Ordre de grandeur |   Dispositif
|---                |---
| 1 mA              | Seuil de perception
| 10 mA             | DEL commune
| 100 mA            | Électrocution
| 1 A               | Lampe à incandescence
| 10 A              | Radiateur 2000 W
| 100 A             | Démarreur automobile
| 1 kA              | Moteur de locomotive
| 10 kA             | Éclair négatif
| 100 kA            | Éclair positif

---

### Tension: V

La *tension* (U) caractérise la force imposée pour faire circuler les électrons.

<ins>Différence de potentiel</ins>:  
La tension est liée à la différence de potentiel entre les deux extrémités du circuit. Plus une charge positive ou négative est importante, plus elle a du potentiel. Si on place une charge positive a fort potentiel à proximité d'une charge négative a fort potentiel, la différence de potentiel est importante.

Plus la différence de potentiel est importante, plus les électrons sont attirés — la tension augmente.  
Lorsque la différence de potentiel diminue, la tension diminue.  
Quand on a la même quantité d'électrons de chaque côté, il n'y a plus de tension, le courant ne passe plus.

<ins>Unité</ins>:  
La tension est mesurée en *volt* (V). Un Volt est égal un Joule par Coulomb — autrement dit, si on a une pile de 1.5 Volts, il y a 1.5 joules d'énergie qui sont transférés pour chaque Coulomb de charge qui s'écoule.

    U (volts) = J / C

<ins>Analogie avec l'eau</ins>:  
On pourrait associer la *différence de potentiel* à la *différence de hauteur* entre deux points et la *tension* à la *pression* de l'eau: plus la différence de hauteur est grande, plus la la force qui pousse l'eau vers le bas (la pression) est grande.

![](https://i.imgur.com/1FyiV2m.gif)

[Basic Electricity - What is voltage ?](https://www.youtube.com/watch?v=TBt-kxYfync)

---

### Résistance: &Omega;

La *résistance* (R), c'est la propriété physique d'un matériau à ralentir le passage d'un courant électrique.

<ins>Unité</ins>:  
La résistance est mesurée en *ohm* (&Omega;).  
La *loi d'Ohm* dit que la tension (U) est égale à l'intensité (I) fois la résistance (R) — autrement dit, un Volt fait circuler un courant de un Ampère dans un conducteur dont la résistance est de un Ohm

    U (volts) = I (ampères) × R (ohms)

Et donc

    R (ohms) = U (volts) / I (ampères)

Tout simplement parce que, pour une tension définie, si l'intensité diminue, c'est parce que quelque part il y a une résistance qui augmente — et inversement.

<ins>Analogie avec l'eau</ins>:  
Pour une rivière de même dénivelé, c'est comme si l'eau circulait à travers un filtre, qui viendrait créer une friction qui ralentirait le débit de l'eau.

![](https://i.imgur.com/TEx68mT.gif)

La résistance réduit l'intensité et produit de la chaleur: on appelle ça l'*effet Joule*.

![](https://i.imgur.com/R87nRRx.gif)

---

### Puissance: W

La *puissance* (P) c'est l'énergie qui est fournie ou consommée en une seconde par un appareil.

<ins>Unité</ins>:  
La puissance est mesurée en *watt* (W). Elle est égale à la tension fois l'intensité.  
Par relation d'équivalence, un Watt est égal à un Joule par seconde — autrement dit, une ampoule de 100 watts consomme 100 joules par seconde.

    P (watts) = U (volts) × I (ampères)

<!-- -->

    On sait que
      I = C / s
      U = J / C

    Donc
      P = I ⋅ U
        = (J / C) ⋅ (C / s)
        = J / s

Note: avec la résistance, on a cette expression

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/691d5097200272fa79bbea4b6397255742953fb9)

<ins>Exemples</ins>:  
* Ainsi, si la tension est forte mais que l'intensité est faible à cause de la résistance, il y a peu de puissance.

  ![](https://i.imgur.com/LzorwQG.gif)

* Si la tension est faible et l'intensité est forte, peu de puissance.

  ![](https://i.imgur.com/1CGlgK9.gif)

* Mais si la tension est forte et que l'intensité est forte alors la puissance est forte.

  ![](https://i.imgur.com/NvEKT9D.gif)

### Puissance et tension nominale

La puissance nominale d'un appareil électrique est la puissance électrique consommée par cet appareil lorsqu'il est en fonctionnement normal, c'est à dire lorsqu'il est soumis à sa tension nominale.

Prenons l'exemple d'une ampoule ordinaire: elle est vendue avec les indications suivantes — 100W, 220V.
Ce sont sa puissance nominale et sa tension nominale.
Cela signifie qu'elle a été construite pour être branchée sous 220V et que dans ces conditions elle consomme 100W.

---

## Mesures du courant alternatif

### Tension efficace: V

Dans le cas du courant alternatif, la tension ne va pas être continue: elle va alterner entre une valeur positive et son négatif. Si on regarde l'évolution de la tension dans le temps, on obtient une courbe sinusoïdale avec une tension maximale et une tension minimale.

La tension que l'on mesure dans un courant alternatif, c'est la *tension efficace*. Elle est légèrement inférieure à la tension maximale — il faut diviser la tension maximale par racine carrée de deux, ça donne à peu près 70% de la tension maximale.

<ins>Unité</ins>:  
Tout comme la tension, la tension efficace est mesurée en Volt (V).  
Et pour mesurer la tension efficace d'un courant alternatif, on utilise toujours la loi d'Ohm mais avec l'impédance à la place de la résistance (plus d'infos sur l'impédance plus bas):

<pre>
U<sub>eff</sub> (volts) = Z (ohms) × I (ampères)
</pre>

<ins>Analogie avec l'eau</ins>:  
Si on compare avec un courant d'eau, c'est comme si on avait un tuyau qui alternait son inclinaison dans un sens puis dans l'autre et qu'on prenait en compte la pression de l'eau lorsque le tuyau est incliné mais pas à la verticale.

![](https://i.imgur.com/RtLCbQ1.gif)

---

### Intensité efficace: A

L'intensité du courant alternatif va aussi osciller entre une valeur positive et son négatif.  
Comme pour la tension, on peut mesurer une intensité maximale mais c'est l'*intensité efficace* qu'il faut prendre en compte.

<ins>Analogie avec l'eau</ins>:  
Avec un débit d'eau, c'est comme s'il allait à droite puis à gauche.

![](https://i.imgur.com/ejJjW1t.gif)

---

### Fréquence: Hz

La *fréquence* correspond au nombre d'oscillations du courant en une seconde. 

<ins>Unité</ins>:  
La fréquence est mesurée en *Hertz* (Hz).  
Par exemple, si on a un courant qui est positif/négatif positif/négatif, on a donc deux périodes, c'est à dire 2 Hertz.

![](https://i.imgur.com/h6ySbjl.png)

Note: En Europe, le courant des prises électriques a une tension efficace d'environ 220 ou 203 Volts.  
Sa fréquence est d'environ 50 Hertz.

---

### Impédance: &Omega;

Dans un courant alternatif, on ne prendra pas uniquement en compte la résistance pour connaître le "facteur de ralentissement" du courant. On considère également l'*inductance* et la *capacitance* — qui sont nulles dans le cas d'un courant continu.

L'inductance plus la capacitance forment la *réactance*. La réactance dépend de la fréquence du courant électrique.  
Si on prend également en compte la résistance du circuit, alors on obtient l'*impédance* — et c'est cette mesure qu'on utilise dans le calcul dans la tension efficace et non plus la résistance seule.

![](https://i.imgur.com/P7kHZ25.png)

<ins>Unité</ins>:  
L'impédance est mesuré en *ohm* (&Omega;). 
Elle est égale à la résistance + inductance + capacitance.

    Z (ohms) = R (ohms) + Inductance (henry) + Capacitance (farad)

---

### Inductance: H

L'*inductance* est un phénomène qui se produit dans une bobine: sous l'effet d'un courant électrique, la bobine va se comporter comme un aimant, avec les pôles orientés se le sens du courant électrique. Si on n'alimente plus la bobine en tension, son seul champ magnétique va continuer à faire circuler les électrons dans le circuit un peu plus longtemps.

![](https://i.imgur.com/eXxJI4x.gif)

Dans le cas du courant alternatif, le sens du champ magnétique va alternativement changer. Mais ce changement de sens prendra un peu de temps — il y aura donc toujours un décalage dans le temps entre le changement de tension et le changement de sens du champ magnétique.

La conséquence, c'est que lorsque le courant électrique vient tout juste de changer de sens, il va devoir passer par une bobine chargée en sens opposée, opposant une sorte de "résistance" — mais qu'on appelle ici l'*inductance*.  
Plus le courant change rapidement de sens — c'est à dire plus la fréquence est élevée — plus l'inductance sera élevée.

![](https://i.imgur.com/T1VexpM.gif)

<ins>Unité</ins>:  
L'inductance est mesurée en *henry* (H).

---

### Capacitance: F

La *capacitance*, ou *capacité*, est un phénomène qui se produit dans un condensateur.

Un condensateur est un composant constitué de deux bornes conductrices séparées par un isolant polarisable. Lorsque les électrons arrivent au condensateur, ne pouvant passer, ils s'arrêtent et chargent un côté négativement. Les électrons de l'autre côté de l'isolant vont être repoussés, si bien que l'autre côté se charge positivement. Les charges se condensent de part et d'autre des armatures — c'est l'étape de charge du condensateur.

![](https://i.imgur.com/UPrfOxl.gif)

Le condensateur se charge au début très vite, puis de moins en moins vite plus et, quand il sera chargé au maximum, le courant ne passera plus.

Dans le cas d'un courant alternatif, le condensateur va se charger dans un sens puis dans l'autre. Si le courant change rapidement de sens — c'est à dire si la fréquence est élevée — alors le courant ne sera jamais bloqué car les armatures n'auront jamais le temps de se charger au maximum.

![](https://i.imgur.com/HygEVNb.gif)

Par contre, si le courant change lentement de sens — si la fréquence est faible — alors il va se trouver bloqué par le condensateur lorsque les armatures sont pleinement chargées. Le conducteur va donc opposer une sorte de résistance aux courants de basse fréquence, ça s'appelle la *capacitance*.

![](https://i.imgur.com/fzx0Itb.gif)

<ins>Unité</ins>:  
La capacitance est mesurée en *farad* (F).

---

## Résumé des unités

| Mesure        | Unité   | Abréviation unité
|---            |---      |---
| Force         | newton  | N
| Énergie       | joule   | J
| Charge        | coulomb | C
| | | |
| Voltage       | volts   | V
| Intensité     | ampère  | A
| Puissance     | watt    | W
| | | |
| Résistance    | ohm     | Ω
| Capacitance   | farad   | F
| Inductance    | henry   | H
| Fréquence     | hertz   | Hz