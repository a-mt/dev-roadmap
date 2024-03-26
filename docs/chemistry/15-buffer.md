---
title: Solutions tampons
category: Chimie
---

* Une *solution tampon* est une solution qui contient à la fois la forme acide et la forme basique du même couple.

* Les solutions tampon ont une propriété intéressante:  
  Leur pH varie très peu lorsqu'on ajoute (raisonnablement) une quantité d'acide ou de base.

  <ins>Exemple</ins>:  
  Le pH du sang est maintenu entre 7.35 et 7.45 grâce à un tampon, H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>-</sup>.  
  Si le pH du sang s'écarte de cette zone optimale, un certain nombre de désordres physiologiques s'installent — qui affectent par exemple la stabilité des membranes cellulaires, la structure des protéines, l'activité des enzymes et la fixation de l'oxygène par l'hémoglobine.

  ![](https://i.imgur.com/UnNpOv1.png)

  Si le pH du sang est inférieur à 7.35, on parle d'*acidose* et s'il est supérieur à 7.45, on parle d'*alcalose*.  
  Un pH supérieur à 7.8 ou inférieur à 6.8 peut entraîner la mort.

  ![](https://i.imgur.com/vzPlVya.png)

* Pour réaliser une solution tampon, on doit mélanger la forme acide (HA) et la forme basique (A<sup>-</sup>) du même couple acido-basique.
  Comme un ion ne se balade jamais seul, un anion A<sup>-</sup> sera nécessairement accompagné du cation correspondant.  
  Les sels se dissocient totalement en solution aqueuse, on utilise donc un sel de A<sup>-</sup>.

  ![](https://i.imgur.com/ySm2GFn.png)

* La concentration en acide (C<sub>a</sub>) et la concentration en base (C<sub>b</sub>) doivent être voisines.   
  Typiquement, le rapport C<sub>b</sub>/C<sub>a</sub> est compris entre 1/10 et 10.

  <pre>
  <img src="https://i.imgur.com/lVK9L7R.png" />
  </pre>

# Calculer le pH d'une solution tampon

* La formule la *relation de Henderson-Hasselbalch* (en référence aux auteurs l'ayant décrite pour la première fois)  
  permet de calculer le pH d'une solution tampon:

  <pre>
  <img src="https://i.imgur.com/sJWK5ji.png" />
  </pre>

* <ins>Démonstration</ins>:  
  On réalise une solution tampon en mélangeant une solution d'un acide HA de concentration C<sub>a</sub>  
  et une solution de sel NaA de concentration C<sub>b</sub>. Le sel NaA se dissocie dans l'eau en Na<sup>+</sup> + A<sup>-</sup> (la base faible A<sup>-</sup>, base conjuguée de l'acide faible HA), on a donc en solution le couple HA/A<sup>-</sup>. Les espèces sont en équilibre:

  ![](https://i.imgur.com/nF1DoZj.png)

  Calculer la concentration en [H<sub>3</sub>0<sup>+</sup>] du couple HA/A<sup>-</sup>:

  ![](https://i.imgur.com/BLRWkFum.png)

  Calculer le pH à partir de cette concentration:

  ![](https://i.imgur.com/BRHLlQtm.png)

* Cette formule implique une approximation, puisqu'on a remplacé [A<sup>-</sup>] par C<sub>b</sub> et [HA] par C<sub>b</sub>, c'est à dire par les concentrations initiales. Cette approximation est valable lorsque C<sub>b</sub> est beaucoup plus grand que K<sub>a</sub>, et C<sub>a</sub> est beaucoup plus grand que K<sub>b</sub>.  
  On prend généralement comme limite K<sub>a</sub> &lt; 10<sup>-3</sup>mol/L et pareil pour K<sub>b</sub>.  
  K<sub>a</sub> doit être suffisamment grand mais pas trop grand, sinon c'est K<sub>b</sub> qui est trop petit.

  <pre>
  C<sub>b</sub> >> K<sub>a</sub>:
  K<sub>a</sub> &lt; 10<sup>-3</sup>mol/L
  </pre>

  ![](https://i.imgur.com/AbcCI9rm.png)

# Influence de l'ajout d'un acide fort

On réalise deux expériences, où va on mesurer le pH après avoir ajouté un acide fort,  
d'une part dans de l'eau, d'autre part dans un mélange tampon.

1. <ins>Éxperience 1: l'eau</ins>  
   On dispose d'un container contenant 50mL d'eau désionisée. Le pH de l'eau vaut initialement 7.  
   On ajoute 1mL d'acide chlorhydrique de concentration 1mol/L. Le PH de l'eau vaut maintenant 1.7 — il a donc fortement changé.

   ![](https://i.imgur.com/5oufsG1m.png)
   ![](https://i.imgur.com/5W4l5rsm.png)

   On peut confirmer ces résultats par le calcul.

   ![](https://i.imgur.com/OEOMf3dm.png)

2. <ins>Éxperience 2: tampon</ins>  
   On dispose d'un container contenant 50mL d'un mélange tampon réalisé à partir d'acide acétique et d'acétate de sodium — de concentrations 0.5 mol/L. Le pH du mélange tampon vaut initialement 4.8.  
   On ajoute 1mL d'acide chlorhydrique de concentration 1mol/L. Le pH du tampon varie très peu.

   ![](https://i.imgur.com/wXgrAOLm.png)
   ![](https://i.imgur.com/tFPtbaLm.png)

   On peut là aussi  confirmer ces résultats par le calcul.  
   L'acide chlorhydrique est un acide fort, qui se dissocie donc en ions en milieu aqueux: HCl + H<sub>2</sub>O &rarr; H<sub>3</sub>O<sup>+</sup> + Cl<sup>-</sup>.  
   C'est donc l'acide H<sub>3</sub>O<sup>+</sup> qui va réagir avec la base présente dans le milieu, Ac<sup>-</sup>: H<sub>3</sub>O<sup>+</sup> + Ac<sup>-</sup> &rarr; HAc + H<sub>2</sub>O

   ![](https://i.imgur.com/fBKr5J9m.png)

# Efficacité d'un tampon

* L'efficacité d'un tampon est directement liée aux concentrations des espèces HA et A<sup>-</sup> responsables de l'effet tampon.

  <ins>Exemple</ins>:  
  On reprend l'exemple précedent mais en diluant HA et A<sup>-</sup> d'un facteur 10.  
  Dans ce cas, le pH obtenu est de 4.4 — on a donc perdu en efficacité.

  ![](https://i.imgur.com/hMbVzgi.png)

* L'effet des concentrations peut être facilement compris en réexaminant la formule du pH: pK<sub>a</sub> + log(C<sub>b</sub> / C<sub>a</sub>). 

  * C<sub>b</sub> est le nombre de moles de base initial (n<sub>b</sub>) moins x, divisé par le volume V.
  * C<sub>a</sub> est le nombre de moles d'acide initial (n<sub>a</sub>) plus x, divisé par le volume V.
  * Lorsque x est petit par rapport à n<sub>a</sub> et n<sub>b</sub>, l'effet de x sur la fraction sera faible,  
    et donc le pH restera voisin de sa valeur initiale.

  ![](https://i.imgur.com/IubrYVY.png)

  <ins>Exemple</ins>:  
  On veut créer une solution tampon de pH = 7.  
  En examinant le tableau des pK<sub>a</sub>, on trouve deux couples acido-basiques potentiels:
  * H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>-</sup> (pK<sub>a</sub> = 6.4). Pour avoir un pH égal à K avec un pK<sub>a</sub> égal à 6.4, il va falloir mettre un peu plus de base que d'acide, donc le rapport C<sub>b</sub>/C<sub>a</sub> sera supérieur à 1. Si on fait le calcul, on trouve que le rapport C<sub>b</sub>/C<sub>a</sub> doit être égal à 4.

  * H<sub>2</sub>PO<sub>4</sub><sup>-</sup>/HPO<sub>4</sub><sup>2-</sup> (pK<sub>a</sub> = 7.2). Pour avoir un pH de 7 avec un pK<sub>a</sub> de 7.2, il faudra mettre un peu plus d'acide que de base, donc le rapport C<sub>b</sub>/C<sub>a</sub> sera inférieur à 1. Il doit être égal à 0.6.

  ![](https://i.imgur.com/Y5Q4nsA.png)

* L'idéal est de travailler dans des conditions où le rapport C<sub>b</sub>/C<sub>a</sub> est compris entre 1/10 et 10.  
  Ça correspond, lorsqu'on introduit ces valeurs dans le formule de pH, à des pH égaux à pK<sub>a</sub>-1 et pK<sub>a</sub>+1.

  <pre>
  <img src="https://i.imgur.com/coHAf7p.png" />
  </pre>
