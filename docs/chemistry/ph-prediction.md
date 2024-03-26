---
title: Prédire le pH d'une solution
category: Chimie
---

# pH d'un acide fort

* <ins>Démonstration</ins>:  
  L'équation de dissociation de l'acide chlorhydrique (HCl) avec l'eau est complète.  
  Il est donc assez simple de déterminer la concentration en ions hydronium en utilisant un tableau d'avancement.  
  Soit HCl de concentration 0.1mol/L dans 1L:

  ![](https://i.imgur.com/quEqVQim.png?2)

  La concentration de départ d'acide chlorhydrique (HCl) correspond à  
  la concentration finale en ion hydronium (H<sub>3</sub>O<sup>+</sup>), donc le pH vaut -log [H<sub>3</sub>O<sup>+</sup>]

  ![](https://i.imgur.com/dnmiULo.png)

* <ins>Formule</ins>:  
  On peut généraliser et dire que, dans le cas d'un acide fort, pH = -log C<sub>a</sub>, où C<sub>a</sub> est la concentration de départ de l'acide.  
  Ceci n'est applicable que si l'acide n'est pas trop dilué.  
  En pratique, il faut que la concentration de départ en acide (C<sub>a</sub>) soit supérieure à 10<sup>-6</sup>mol/L.

  <pre>
  <img src="https://i.imgur.com/7KBA5Fy.png" />
  </pre>

  [Pourquoi cette valeur?](https://www.fun-mooc.fr/asset-v1:ulg+108006+session03+type@asset+block/Domaine_de_validite_des_formules_simplifiees.pdf)

* <ins>Exemple</ins>:  
  Une solution est préparée en mélangeant 5.0 mL d’acide nitrique 0.10 mol/L et 20 mL d’eau.  
  Quel est le pH de la solution résultante ?

  ![](https://i.imgur.com/Wao4zUql.png)

# pH d'une base forte

* <ins>Démonstration</ins>:  
  On peut suivre le même raisonnement pour les bases fortes.  
  Soit B une base générique de concentration 0.1mol/L dans 1L:

  ![](https://i.imgur.com/n68dMGym.png?1)

  Le pH de cette solution est -log [H<sub>3</sub>O<sup>+</sup>], sauf que H<sub>3</sub>O<sup>+</sup> n'apparaît nulle part.  
  Pour résoudre ce problème, on peut utiliser le produit d'autoprotolyse de l'eau: [H<sub>3</sub>O<sup>+</sup>][OH<sup>-</sup>] = 10<sup>-14</sup>.  
  La concentration en ions hydroxyde à la fin est égale à la concentration en base forte au départ, donc le pH vaut 14 + log C<sub>B</sub>.

  ![](https://i.imgur.com/CUlzOdJm.png)

* <ins>Formule</ins>:  
  La formule des bases fortes (pH = 14 + log C<sub>b</sub>) n'est applicable que si la base n'est pas trop diluée.  
  En pratique, il faut que la concentration de départ en base soit supérieure à 10<sup>-6</sup>mol/L.

  <pre>
  <img src="https://i.imgur.com/4WtwFLL.png" />
  </pre>

* <ins>Exemple</ins>:  
  Une solution est préparée en dissolvant 0.26 g d’hydroxyde de calcium dans 5.0.102 mL d’eau.  
  Quel est le pH de la solution résultante ?

  ![](https://i.imgur.com/3JEz3Qbl.png)

# pH d'un acide faible

* Pour les acides faibles, on doit prendre en compte le fait que la dissociation des espèces en milieu aqueux  
  est limitée à un équilibre — prendre en compte K<sub>A</sub>.

* <ins>Démonstration</ins>:  
  On a un acide faible générique (HAc), de concentration 0.1mol/L dans 1L.  
  Comme on est dans le cas d'un acide faible, la partie qui s'est dissociée est très faible en comparaison du nombre de moles initial et 0.1-x est presque égal à 0.1 — autrement dit, la concentration en HAc après dissociation est presque égale à la concentration en HAc avant dissociation.

  Le nombre de moles d'ions acétate est quant à lui égal au nombre au nombre de moles d'ions H<sub>3</sub>O<sup>+</sup>.  
  Et puisque ces deux espèces chimiques sont dans la même solution, les concentrations sont aussi égales.
  
  ![](https://i.imgur.com/miWvjTdm.png)

  On obtient ainsi que K<sub>a</sub> = [H<sub>3</sub>O<sup>+</sup>]²/C<sub>HAc</sub>

  ![](https://i.imgur.com/CfWmtMY.png)

  On peut déduire la concentration en H<sub>3</sub>O<sup>+</sup> de cette expression, et ainsi -log [H<sub>3</sub>O<sup>+</sup>] — le pH.

  ![](https://i.imgur.com/19XBXYom.png)

  L'étape cruciale de cette démonstration est l'approximation [HAc] ≃ CHAc,  
  on ne peux utiliser cette formule que si la solution n'est pas trop diluée.

* <ins>Formule</ins>:  
  La formule des acides faibles (pH = 1/2 pK<sub>a</sub> - 1/2 log C<sub>a</sub>) n'est applicable que si la concentration de départ en acide faible est supérieure à 100 fois la constante d'acidité K<sub>a</sub>. Cette condition correspond à un pourcentage de dissociation de moins de 10%.

  <pre>
  <img src="https://i.imgur.com/bOAiiUb.png" />
  </pre>

# pH d'une base faible

* <ins>Démonstration</ins>:  
  Soit NH<sub>3</sub> (l'ammoniac) une base faible générique de concentration 0.1mol/L dans 1L:

  ![](https://i.imgur.com/mQBrFsUm.png)

  On obtient que K<sub>b</sub> = [OH<sup>-</sup>]²/C<sub>NH<sub>3</sub></sub>

  ![](https://i.imgur.com/J09MWZd.png)

  On peut déduire la concentration en H<sub>3</sub>O<sup>+</sup> de cette expression, et ainsi -log [H<sub>3</sub>O<sup>+</sup>] — le pH.

  ![](https://i.imgur.com/pUX4dadm.png)

  Comme tout à l'heure, l'étape cruciale de cette démonstration est l'approximation [NH3] ≃ CNH3,  
  on ne peut utiliser cette formule de pH qu'à condition que la solution ne soit pas trop diluée.

* <ins>Formule</ins>:  
  La formule des bases faibles (pH = 7 + 1/2 pKa + 1/2 log C<sub>b</sub>) n'est applicable que si la concentration de départ en base faible est supérieure à 100 fois la constante de basicité K<sub>b</sub> — pour les mêmes raisons qu'un acide.

  <pre>
  <img src="https://i.imgur.com/Yrw5aSr.png" />
  </pre>

# pH d'un ampholyte

* <ins>Formule</ins>:  
  Les ampholytes ont également une formule simplifiée:

  <pre>
  <img src="https://i.imgur.com/99aaGqZ.png" />

  où pK<sub>a1</sub> et pK<sub>a2</sub> sont les pK<sub>a</sub> des couples impliquant l'ampholyte
  </pre>

  Notons que dans le cas des ampholytes, le pH est indépendant de leur concentration.

# pH d'une solution

* Pour connaître le pH d'une solution aqueuse d'un sel, 

  1. examiner les propriétés acide-base des ions qui le constituent,
  2. vérifier les conditions d'applicabilité,
  3. appliquer les formules correspondantes.    
     Lorsque les conditions d'applicabilité des formules simplifiées ne sont pas respectées,  
     alors on doit résoudre l'équation comme un exercice d'équilibre classique.

## Exemple 1: base de force nulle    

Calculer le pH d'une solution saline de KN<sub>3</sub>, de concentration 0.15 mol/L.

* <ins>Propriétés acide-base des ions</ins>:
  KN<sub>3</sub> se dissocie en ions K<sup>+</sup> et NO<sub>3</sub><sup>-</sup>.  
  K<sup>+</sup> ne présente pas de caractère acido-basique  
  et NO<sub>3</sub><sup>-</sup> est la base conjuguée d'un acide fort, il n'a donc aucune tendance à capter un proton.  
  C'est ce que l'on appelle une base de force nulle, qui est neutre en solution aqueuse: pH = 7.

  ![](https://i.imgur.com/ldfnFbN.png)

## Exemple 2: formule des acides faibles    

Calculer le pH d'une solution saline de NH<sub>4</sub>Cl, de concentration 0.15 mol/L.

* <ins>Propriétés acide-base des ions</ins>:  
  NH<sub>4</sub>Cl se dissocie en ions NH<sub>4</sub><sup>+</sup> et Cl<sup>-</sup>.  
  NH<sub>4</sub><sup>+</sup> est l'acide conjugué de NH<sub>3</sub>, c'est un acide faible.  
  Cl<sup>-</sup> est la base conjuguée d'un acide fort (HCl), Cl<sup>-</sup> est donc une base de force nulle.  
  On va donc calculer le pH de la solution avec la formule des acides faibles pour le couple NH<sub>4</sub><sup>+</sup>/NH<sub>3</sub>.

  ![](https://i.imgur.com/IKkCddm.png)

* <ins>Vérifier les conditions d'applicabilité</ins>:  
  Le pK<sub>a</sub> du couple NH<sub>4</sub><sup>+</sup>/NH<sub>3</sub> vaut 9.3.  
  La concentration en acide faible de départ vaut 0.15mol/L.  
  Elle est donc bien 100 fois supérieure à valeur de la constante d'acidité K<sub>a</sub>, valant 10<sup>-9.3</sup>.  
  La formule est applicable.

* <ins>Appliquer la formule</ins>:

  ![](https://i.imgur.com/aVe1ncm.png)

## Exemple 3: formule des bases faibles

Calculer le pH d'une solution saline de Na<sub>2</sub>CO<sub>3</sub>, de concentration 0.15 mol/L.

* <ins>Propriétés acide-base des ions</ins>:  
  Na<sub>2</sub>CO<sub>3</sub> se dissocie en 2 ions Na<sup>+</sup> et 1 ion Co<sub>3</sub><sup>2-</sup>.  
  Na<sup>+</sup> n'a pas de caractère acido-basique et CO<sub>3</sub><sup>2-</sup> est une base faible.  
  On va donc calculer le pH de la solution avec la formule des bases faibles pour le couple HCO<sub>3</sub><sup>-</sup>/CO<sub>3</sub><sup>2-</sup>.

  ![](https://i.imgur.com/cr7Z9JL.png)

* <ins>Vérifier les conditions d'applicabilité</ins>:  
  Le pK<sub>b</sub> du couple HCO<sub>3</sub><sup>-</sup>/CO<sub>3</sub><sup>2-</sup> vaut 14 - pK<sub>a</sub> = 3,7.  
  0.15 est bien supérieur à 100 × 10<sup>-3.7</sup>.

  ![](https://i.imgur.com/xOdwrxU.png)

* <ins>Appliquer la formule</ins>:

  ![](https://i.imgur.com/tMad8Fx.png)

## Exemple 4: formule des ampholytes

Calculer le pH d'une solution saline de KHCO<sub>3</sub>, de concentration 0015 mol/L.

* <ins>Propriétés acide-base des ions</ins>:  
  KHCO<sub>3</sub> se dissocie en ion K<sup>+</sup> et en ion HCO<sub>3</sub><sup>-</sup>, l'ion hydrogénocarbonate.  
  K<sup>+</sup> ne présente aucun caractère acido-basique et HCO<sub>3</sub><sup>-</sup> est un ampholyte.  
  On va donc calculer le pH de la solution avec la formule des ampholytes.

  ![](https://i.imgur.com/8cBKsdO.png)

* <ins>Appliquer la formule/<ins>:

  ![](https://i.imgur.com/2T87Xzk.png)

## Exemple 5: sans formule simplifiée

La codéine (C<sub>18</sub>H<sub>21</sub>NO<sub>3</sub>) est un médicament analgésique
et une base faible dont le K<sub>b</sub> vaut 1.62 ⋅ 10<sup>-6</sup>mol/L.  
Calculer le pH et le pourcentage de protonation d'une solution aqueuse de codéine à concentration 1.00 ⋅ 10<sup>-6</sup> mol/L.

* 1.00 × 10<sup>-6</sup> n'est pas 100 fois supérieur à 1.62 × 10 <sup>-16</sup>:  
  Il faut donc écrire le tableau d'avancement.

  ![](https://i.imgur.com/aGrSnG4l.jpg)

* Calculer le pourcentage de protonation:  
  Déterminer la fraction de B qui réagit en captant un proton (pour former HB), le tout multiplié par 100.  

  ![](https://i.imgur.com/Yx7dhP0.jpg)

  On trouve un pourcentage de protonation de 69.9%.

* Calculer le pH à partir du pourcentage de protonation.  
  Par définition, on sait que le pH d'une solution est égal à: -log [H<sub>3</sub>O] ou -log (10<sup>-14</sup>/[OH<sup>-</sup>]) si on l'exprime en fonction de OH<sup>-</sup>  

  ![](https://i.imgur.com/ZPe8qUf.png)

  On trouve une valeur de pH de 7.84.
