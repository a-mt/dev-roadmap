---
title: Électrochimie
category: Chimie
---

* Jusqu'à présent, on considérait que le transfert d'électrons se faisait directement du réducteur à l'oxydant, sans intermédiaire. Mais on peut mettre à profit ce transfert d'électrons pour créer un courant électrique.

# Fonctionnement d'une pile Daniell

* Un pile Daniell contient:

  ![](https://i.imgur.com/GBLmTx0l.png)

  * À gauche: le couple redox Zn<sup>2+</sup>/Zn  
    Le 1er bécher contient une plaque de zinc (Zn) trempée dans une solution de sulfate de zinc (Zn<sup>2+</sup><sub>(aq)</sub> + SO<sub>4</sub><sup>2-</sup><sub>(aq)</sub>) à concentration de 1 mol/L. On a donc la forme oxydée et réduite du zinc de ce côté, soit le couple redox Zn<sup>2+</sup>/Zn.

  * À droite: le coupel redox Cu/Cu<sup>2+</sup>  
    Le 2ème bécher contient une plaque de cuivre (Cu) trempée dans une solution de sulfate de cuivre (Cu<sup>2+</sup><sub>(aq)</sub> + SO<sub>4</sub><sup>2-</sup><sub>(aq)</sub>) à concentration de 1 mol/L. On a donc la forme oxydée et réduite du cuivre de ce côté, soit le couple redox Cu/Cu<sup>2+</sup>.

  * Entre les deux: une électrode de cuivre  
    Le zinc est plus réducteur que le cuivre, il y a donc une différence de potentiel entre les deux, ce qui crée une tension. Si on relie les deux plaques par un matériau conducteur, alors les électrons peuvent passer pour aller de l'autre côté

    Le zinc va perdre des électrons: Zn → Zn<sup>2+</sup> + 2e<sup>-</sup> — une réaction d'oxydation.  
    Le cuivre va les capter: Cu<sup>2+</sup> + 2e<sup>-</sup> → Cu — une réaction de réduction.  
    La réaction d'oxydo-réduction est donc Cu<sup>2+</sup> + Zn → Zn<sup>2+</sup> + Cu.

    ![](https://i.imgur.com/3IlFiGim.png)

  * Également entre les deux: un pont salin  
    Les deux solutions sont reliées par un tube contenant un gel saturé en nitrate de potassium (NO<sub>2</sub><sup>-</sup> + K<sup>+</sup>).  
    C'est ce qu'on appelle un *pont électrolytique* ou un *pont salin*.

    Il permet d'assurer la neutralité de la solution: les ions NO<sub>2</sub><sup>-</sup> du pont salin vont migrer vers la solution de zinc pour compenser l'excès d'ions positifs (Zn<sup>2+</sup>), et les ions K<sup>+</sup> vers la solution de cuivre pour compenser l'excès d'ions négatifs (So<sub>4</sub><sup>2-</sup>).

    Si la pile ne comportait pas de pont salin, on trouverait des ions Zn<sup>2+</sup> dans la solution côté zinc, et des ions SO<sub>4</sub><sup>2-</sup> de l'autre. Or les électrons sont attirés par les charges positives et repoussés par les charges négatives. Les électrons libres émis par le zinc se retrouveraient dans une solution chargée positivement pour retrouver une solution chargée négativement, ce qui est impossible: le courant s'arrêterait immédiatement.

    ![](https://i.imgur.com/z2rSDmP.png)

* Au niveau macroscopique, on constate que la plaque de zinc va lentement se dissoudre et que la plaque de cuivre va s'épaissir. La solution de sulfate de cuivre va également s'éclaircir.
 
  Du côté zinc, on consomme du zinc solide (Zn) et on forme du Zn<sup>2+</sup> — qui part en solution.  
  Du côté cuivre, on consomme des ions Cu<sup>2+</sup> présents en solution et on forme du cuivre solide (Cu).  
  La pile s'arrêtera de débiter quand il n'y aura plus de Zn ou de Cu<sup>2+</sup>.

* En résumé, les piles sont basées sur une réaction d'oxydo-réaction spontannée — entre le cuivre et le zinc pour la pile Daniell. On sépare les deux couples redox et on oblige, en quelque sorte, les électrons à aller du réducteur à l'oxydant en transitant par un fil conducteur extérieur.

  L'intérêt de créer un flux d'électrons (autrement dit, un courant électrique), c'est qu'on va pouvoir faire fonctionner un appareil électrique: si on place une LED sur le fil conducteur, elle s'allume.

# Électrode

* Une *électrode* est un solide à la surface duquel se déroule  
  soit une réaction d'oxydation soit une réaction de réduction.  
  Les plaques de métal dans les piles sont donc des électrodes.

* L'électrode où se passe l'oxydation est appelée l'*anode*.  
  Mémo: Anode / Oxydation, les deux noms commencent par une voyelle

  <pre>
  <img src="https://i.imgur.com/79PC1rk.png" />
  </pre>

* L'électrode où se passe la réduction est appelée la *cathode*.  
  Mémo: Cathode / Réduction, les deux noms commencent par une consonne

  <pre>
  <img src="https://i.imgur.com/16A1vbY.png" />
  </pre>

## Polarité

* Dans une pile, ce sont les demi-réactions spontanées d'oxydation et de réduction qui déterminent la polarité des électrodes.  
  La réaction d'oxydation (ex côté zinc) libère des électrons, l'anode devient donc polarisée négativement.  
  La réaction de réduction (ex côté cuivre) consomme les électrons libérés, la cathode devient donc polarisée positivement.

  ![](https://i.imgur.com/bZmnuqs.png)

* Dans une cellule d'électrolyse ou d'électrophorèse, les électrodes sont polarisées par un générateur externe de tension.  
  Dans ce cas, les relations anode/cathode et polarités sont inversées: l'anode est positive, la cathode négative.

# Tension

* On peut mesurer la tension entre les deux solutions en utilisant un voltmètre.  
  Cette valeur correspond, aux incertitudes de mesure près, à la différence entre les potentiels standard de réduction des deux couples redox en présence. Plus précisemment, c'est la différence entre le potentiel le plus élevé, qui correspond à la cathode, et le potentiel le plus faible, celui de l'anode.

  <pre>
  Tension: E<sup>0</sup>(couple A) - E<sup>0</sup>(couple B)
  </pre>

  <ins>Exemple</ins>:

  <pre>
  ∆E<sup>0</sup><sub>pile</sub> = E<sup>0</sup>(Cu<sup>2+</sup>/Cu) − E<sup>0</sup>(Zn<sup>2+</sup>/Z)
         = 0.337 −(−0.763)
         = 1.100V
  </pre>

  ![](https://i.imgur.com/zDkawonl.png)

* Si on place deux piles en série (= l'une à la suite de l'autre),  
  on mesure une différence de potentiel global double.

  ![](https://i.imgur.com/oMeWeEpl.png)

# Représentation symbolique

* Plutôt que de dessiner une pile ou même un schéma,  
  on utilise plutôt une représentation symbolique comme suit:

  <pre>
  Couple Anode || Couple Cathode
  </pre>

  <ins>Par exemple</ins>:  
  ![](https://i.imgur.com/0ddSlfD.png)

  On y indique:

  * La nature des électrode: anode à gauche, cathode à droite.  
    Donc ici Zn à gauche et Cu à droite.

  * La nature des ions:  
    Ions en solution impliqués dans la réaction redox avec les électrodes.  
    Ici Zn<sup>2+</sup> et Cu<sup>2+</sup>

  La barre verticale représente l'interface entre l'électrode et la solution dans laquelle elle plonge.  
  La double barre verticale représente le pont salin.

# Mesurer le potentiel standard

* Pour rappel:  
  Comme on ne peut pas donner la valeur absolue d'un potentiel électrique,  
  on utilise celle du couple H<sup>+</sup>/H<sub>2</sub> comme zéro de référence.

* Pour mesurer le potentiel standard d'un couple redox: 

  1. On réalise une demi-pile avec le couple redox H<sup>+</sup>/H<sub>2</sub>.  
     Comme ce couple n'a pas de solide, on utilise un métal inerte comme le platine pour électrode — le long de laquelle circule du gaz dihydrogène (H<sub>2</sub>). Et l'électrode est plongée dans une solution d'acide chlorhydrique (H<sub>3</sub>O<sup>+</sup> + Cl<sup>-</sup>), de concentration 1 mol/L.

     <!-- ![](https://i.imgur.com/COKb845.png?2) -->

  2. De l'autre coté, on met le couple redox à mesurer. Pour le cuivre:    
     Une électrode de cuivre (Cu), plongée dans du sulfate de cuivre (Cu<sup>2+</sup><sub>(aq)</sub> + SO<sub>4</sub><sup>2-</sup><sub>(aq)</sub>) de concentration 1 mol/L.

  3. On place un pont salin entre les deux.  
     Dans cet exemple, on aura donc:  

     ![](https://i.imgur.com/dReHIDr.png)

  4. On utilise un voltmètre pour mesurer la tension entre ces deux couples.  
     Comme le potentiel de H<sup>+</sup>/H<sub>2</sub> vaut 0, la tension mesurée fournit le potentiel standard du couple Cu<sup>2+</sup>/Cu.

     ![](https://i.imgur.com/em0IMorm.png)

  En procédant de manière similaire pour de nombreux couples redox,  
  on génère la table des potentiels de réduction standard.

# Fonctionnement d'une pile à Oxyde d'argent

* Les piles à l'oxyde d'argent, couramment appelées "piles bouton", contiennent:

  - D'un côté, du zinc en poudre (Zn)
  - De l'autre, un mélange de graphite (C) et d'oxyde d'argent (Ag<sub>2</sub>O
  - Les deux sont connectées par un feutre imbibé d'une solution aqueuse  
    très concentrée en hydroxyde de potassium (KOH) — un électrolyte qui assure la circulation des ions.
  - Etautour, le boîtier de la pile est constitué de deux parties en acier inoxydable, isolées électriquement.

  ![](https://i.imgur.com/wi6rd7v.png)
  ![](https://i.imgur.com/PM1yNYsm.png)


* Les couples redox en présence sont Ag<sub>2</sub>O/Ag et ZnO/Zn:  
  L'oxyde d’argent (Ag<sub>2</sub>O) va être réduit en argent métallique (Ag)  
  et le zinc métallique (Zn) sera oxydé en oxyde de zinc (ZnO).

  ![](https://i.imgur.com/D3SUNemm.png)

* La différence entre les potentiels standard est de 0.342 –(-1.26) ce qui fait 1.60 V.  
  C'est bien ce qu'on observe: une telle pile fournit une tension relativement stable de 1.6V en circuit fermé pendant pratiquement toute la durée de sa vie.

  ![](https://i.imgur.com/g1e5scA.png)

# Fonctionnement d'une Pile à combustible

* Les piles à combustible (*fuel cells* en anglais) ransforment l'énergie chimique générée lors d'une combustion en énergie électrique. La combustion la plus simple est celle de l'hydrogène, c'est celle qu'on utilise au jour d'aujourd'hui.

* Chaque électrode est faite en un mélange téflon / carbone et recouverte d'un catalyseur.  
  Les deux électrodes sont séparées par une membrane humidifiée constituée de téflon modifié: des groupements acide sulfonique sont greffés le long des chaines du polymère, ce qui permet à la membrane de transporter les protons — mais pas les électrons.

  ![](https://i.imgur.com/7wEiAid.png)

* Les deux couples en présence sont O<sub>2</sub>/H<sub>2</sub>O et H<sup>+</sup>/H<sub>2</sub>.  
  Les protons produits par l'oxydation du dihydrogène à l'anode sont transportés au travers de  
  la membrane polymérique vers la cathode. Là, ils participent à la réduction de l'oxygène.

  ![](https://i.imgur.com/PNvGWeum.png)

* La tension produite est de 1.229V.

  ![](https://i.imgur.com/J7mLSqIm.png)
