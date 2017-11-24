---
title: Encodages
category: Other
latex: true
---

## Vocabulaire

### Encoder vs decoder

La *représentation externe* d'une valeur est la valeur affichée à l'écran (ex: 'a', 3, 13.56)
tandis que la *représentation interne* est la valeur stockée sur le disque dur (des 0 et des 1).
Pour passer de la représentation externe à la représentation interne, on *code* les données, et
pour passer de la représentation interne à la représentation externe, on *décode* les données.

![Schéme représentation interne/externe](https://rawgit.com/a-mt/5b072a12c29d4e862b32af32c2e191cf/raw/734846acd05c0441a60b21f49eee80d74c109950/tmp.svg)

Pour coder et décoder les données, il est indispensable de connaître la *méthode de codage* utilisée.
La méthode de codage dépend principalement du type de donnée (texte, entier naturel, entier relatif, nombre réel).

### Bits et octets

Un *bit* (binary digit) vaut 0 ou 1.  
Dans une suite de bits, les premiers sont placés à droite et les derniers à gauche:

<table>
  <tr>
    <th>Index</th>
    <td>7</td>
    <td>6</td>
    <td>5</td>
    <td>4</td>
    <td>3</td>
    <td>2</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <th>Bits</th>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
</table>

Un *octet* (ou *byte* en anglais) est une suite de 8 bits.

### Notation hexadécimale

La *notation hexadécimale* condense l'affichage de 4 bits avec des symboles, ce qui rend la lecture plus facile (il y 4^2 valeurs différentes donc 16 symboles)

| Binaire | Hexadécimal |  Valeur décimale |
|---      |---          | ---              |
| 0000    | 0           |  0               |
| 0001    | 1           |  1               |
| 0010    | 2           |  2               |
| 0011    | 3           |  3               |
| 0100    | 4           |  4               |
| 0101    | 5           |  5               |
| 0110    | 6           |  6               |
| 0111    | 7           |  7               |
| 1000    | 8           |  8               |
| 1001    | 9           |  9               |
| 1010    | A           |  10              |
| 1011    | B           |  11              |
| 1100    | C           |  12              |
| 1101    | D           |  13              |
| 1110    | E           |  14              |
| 1111    | F           |  15              |

### Poids fort et faible

Plus un bit est placé à gauche plus il a un *poids fort*, plus un bit est placé à droite plus il a un *poids faible*:

- `01` vaut 1
- `10` vaut 2
- `1111 0000` vaut 240
- `0000 1111` vaut 15

---

## Encodage: Caractères

### ASCII

Le code *ASCII* (American Standard Code for Information Interchange) définit 128 caractères à 7 bits. Il contient les caractères de contrôles (retours à la ligne, etc), les chiffres arabes de 0 à 9, les lettres minuscules et majuscules de A à Z et des symboles mathématiques et de ponctuation.

![Table ASCII](https://i.imgur.com/DU6fI8q.gif)

### Jeux étendus ASCII

Le premier bit de la table ASCII permet de définir des *jeux de caractères étendus*, comme ISO-8859-1 (Latin 1), qui ajoute les [caractères accentuées propres à une langue](http://www.madore.org/~david/computers/unicode/cstab.html#Latin-9) (par exemple français: é, è, à, ï, espagnol: ñ, norvégien: ö, ø).

Dû aux différents encodages entre différents pays et différents systèmes d'exploitation (Windows utilise le code ANSI et non Latin-9), qui rendent difficiles les échanges de documents, UNICODE est largement préféré.

[Comparaison encodage Latin vs ANSI](assets/encoding-latin-vs-ansi.html)

### UNICODE

Le code *UNICODE* (Universal Code) associe un code unique à chaque caractère, quels que soient la langue, la plateforme, le logiciel.
Le codage d'Unicode en UTF-8 permet de coder les caractères en longueur variable, de 1 à 4 octets.

---

## Encodage: Entiers naturels

### Base 2

Dans la vie de tous les jours, on utilise les chiffres arabes de 0 à 9 pour former des nombres (base 10). Un ordinateur utilise utilise des 0 et des 1 (base 2). Par convention $$<n>_k$$ signifie que `n` est en base `k`. Si la base n'est pas précisée, c'est une base 10.

#### Passage base 10 → 2

Pour obtenir la représentation en base 2 d'un nombre en base 10, on effectue des divisions successives, en notant la suite des restes. On lit le résultat de bas en haut (de haut en bas en écrivant de droite à gauche).

	59 = 29*2 + 1
	29 = 14*2 + 1
	14 = 7*2  + 0
	7 =  3*2  + 1
	3 =  1*2  + 1
	1 =  0*2  + 1

$$<59>_{10} = <11\ 1011>_{2}$$

#### Passage base 2 → 10

Pour obtenir la représentation en base 10 d'un nombre en base 2, on additionne les puissances de 2 à partir de l'index des bits:
un bit à 1 à l'index 0 vaut $$2^0 = 1$$, un bit à 1 à l'index 1 vaut $$2^1 = 2$$, donc $$<11>_2 = 2^1 + 2^0 = 2 + 1 = 3$$

	<11 1011>2 = (1*2^5 + 1*2^4 + 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0)
	           = 32     + 16    + 8     + 0     + 2     + 1
	           = 59

Il est donc utile de connaître les premières puissances de 2 par coeur.

<table>
	<tr>
		<td>$$2^0$$</td>
		<td>$$2^1$$</td>
		<td>$$2^2$$</td>
		<td>$$2^3$$</td>
		<td>$$2^4$$</td>
		<td>$$2^5$$</td>
		<td>$$2^6$$</td>
		<td>$$2^7$$</td>
	</tr>
	<tr>
		<th>1</th>
		<th>2</th>
		<th>4</th>
		<th>8</th>
		<th>16</th>
		<th>32</th>
		<th>64</th>
		<th>128</th>
	</tr>
</table>

Notons que sur 8 bits (index de 0 à 7), le nombre encodé maximal est 255 et on peut encoder 256 valeurs différentes (de 0 à 255).

	<1111 1111>2 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
	             = 255

### DCB: Décimal Codé Binaire

Ou *Binary Coded Decimal* en anglais.  
Le nombre à coder est représenté en base 10, puis chacun des chiffres est codé en base 2 sur 4 bits.

	<135>10 = <0001 0011 0101>DCB

La représentation DCB est utilisée sur certaines calculatrices de poche et sur des ordinateurs pour les applications de gestion, comme des tableurs (le langage Cobol travaille en arithmétique décimale).

<ins>Remarque</ins> :
* L'intervalle sur 12 bits va de 0 à 999, on gaspille donc des configurations (4 bits pourraient encoder jusqu'à 2^4 = 16 mais on va jusqu'à 9 max)

### Gros-Gray

Ou *binaire réfléchi*.  
Avec un codage en base 2, lorsque l'on passe d'une valeur i à une valeur i+1, plusieurs bits peuvent changer simultanément.
L'encodage Gros-Gray évite cela: le nombre de bits différents entre deux valeurs successives est toujours 1.

	3 = <0011>2
	4 = <0100>2 (3 bits différents)

	3 = <0010>Gray
	4 = <0110>Gray (1 bit différent)

La représentation Gros-Gray est utilisé pour la synthèse et l'analyse des circuits logiques, via les tableaux de Karnaugh et l'algèbre de Boole.

![Gros-gray vs binaire](https://i.imgur.com/zVefotn.jpg)

---

## Opérations arithmétiques en Base 2

### Addition

Pour additionner deux nombres en binaire, on pose l'addition les en alignant à droite et on additionne de droite à gauche en prenant en compte la retenue, qui se propage à gauche.

<ins>Table de vérité</ins> :

| a  | b  | r  | a + b + r |
|--- |--- |--- |---        |
| 0  | 0  | 0  | 0         |
| 0  | 1  | 0  | 1         |
| 1  | 0  | 0  | 1         |
| 1  | 1  | 0  | 0 + r     |
|    |    |    |           |
| 0  | 0  | 1  | 1         |
| 0  | 1  | 1  | 0 + r     |
| 1  | 0  | 1  | 0 + r     |
| 1  | 1  | 1  | 1 + r     |

	    rr r 
	  0101 0110
	+ 0000 1100
	  ---------
	  0110 0010

<ins>Dépassement</ins> :

	r rrrr   r
	  1111 1010
	+ 0000 1010
	  ---------
	  0000 0100

Le résultat de cette opération ne tient pas sur 8bits (et en effet 250 + 10 > 255). Lorsque l'addition engendre une retenue sortie égale à 1, il se produit un *dépassement*. Au niveau du processeur, un indicateur appelé *Carry* est positionné à 1.

### Soustraction

Pour soustraire deux nombres binaire, on pose la soustraction en les alignant à droite et on soustrait de droite à gauche. Lorsqu'on doit soustraire `0 - 1`, on emprunte 1 à gauche et on calcule `2 - 1`.

<ins>Table de vérité</ins> :

| a  | b  | e  | a - b - e |
|--- |--- |--- |---        |
| 0  | 0  | 0  | 0         |
| 0  | 1  | 0  | 1 + e     |
| 1  | 0  | 0  | 1         |
| 1  | 1  | 0  | 0         |
|    |    |    |           |
| 0  | 0  | 1  | 1 + e     |
| 0  | 1  | 1  | 0 + e     |
| 1  | 0  | 1  | 0         |
| 1  | 1  | 1  | 1 + e     |

		 e
	  0101 0110
	- 0000 1100
	  ---------
	  0100 1010

<ins>Dépassement</ins> :

	e eeee
	  0000 0000
	- 0011 1000
	  ---------
	  1100 1000

Le résultat de cette opération ne peut pas être calculé pour des entiers naturels car on ne peut plus faire d'emprunt: il y *dépassement*. Là encore, l'indicateur *Carry* est positionné à 1.

---

## Encodage: Entiers relatifs

### Signe et valeur absolue

L'encodage *signe et valeur absolue* est noté $$<n>_{\pm| |}$$

Le bit de poids fort (le plus à gauche) code le signe : 1 si négatif, 0 si positif.  
Les autres bits codent le nombre en valeur absolue.

	 10 = <0000 1010>+-||
	-10 = <1000 1010>+-||

<ins>Remarques</ins> :

- 0 a deux codages (positif ou négatif)
- Sur 8 bits, l'intervalle va de +127 à -127, donc 255 valeurs
- Il faut tenir compte des signes pour l'arithmétique

### Complément à 2

L'encodage en complément à 2 est noté $$<n>_{\mathrm{Compl}.2}$$

Le bit de poids fort code le signe : 1 si négatif, 0 si positif.  
Si le nombre est positif, les autres bits codent le nombre en base 2.  
Sinon, il s'agit de l'opposé du nombre en base 2 (= <code>0 - n</code>).

	 10 = <0000 1010>Compl.2
	-10 = <1111 0110>Compl.2

<ins>Remarques<ins> :

* 0 a un seul codage : `<0000 0000>Compl.2`
* Sur 8 bits, l’intervalle va de +127 à -127
* L'encodage en complément à 2 facilite l'arithmétique

#### Passage nombre positif → négatif

Pour obtenir l'opposé d'un nombre on calcule `0 - n`.  
Par exemple `0 - 10` =

	e eeee ee
	  0000 0000
	- 0000 1010
	  ---------
	  1111 0110

On peut également obtenir -n en inversant tous les bits de gauche à droite jusqu'au premier 1 (le plus à droite)

	0000 1010 → 1111 0110

	0011 1000 → 1100 1000

---

## Opérations arithmétiques en Complément à 2

On peut calculer l'additionner et la somme de nombres en complément à 2 de la même manière que des nombres en base 2

	r rrr
	  0101 0000    (80)
	+ 1111 0110    (-10)
	  ---------
	  0100 0110    (70)

L'indicateur Carry n'est pas significatif: la dernière retenue peut être égale à 1 sans qu'il n'y ait pour autant *dépassement*.

<ins>Débordement</ins> :

Le fait qu'on ne dispose que de 7 bits pour coder la valeur du nombre (1 bit est utilisé pour le signe) implique que le résultat d'une opération n'est pas toujours cohérent : par exemple, l'addition de deux nombres positifs devrait retourner un nombre positif. Lorsque le résultat n'est pas cohérent on parle alors de *débordement*. L'indicateur *overflow* est positionné à 1.

	  0110 0100    (100)
	+ 0101 0000    (80)
	  ---------
	  1011 0100

<!-- -->

	  1001 1100    (-100)
	- 0101 0000    (80)
	  ---------
	  0100 1100

<!-- -->

	  1001 1100    (-100)
	+ 1011 0000    (-80)
	  ---------
	  0100 1100

---

## Encodage: Réels

### Virgule fixe

En représentation en virgule fixe, on définit la position de la virgule, il est donc inutile de la représenter.

Par exemple sur 8 bits, en positionnant la virgule entre le bit 4 et 3 (donc 4 bits pour la partie entière et 4 pour la partie fractionnaire) :

	  0,625 = <0000 1010>virg.fixe(4,4)-2
	- 0,625 = <1111 0110>virg.fixe(4,4)-Compl.2

#### Passage base 10 → 2

Pour passer de la base 10 à la base 2, on procède séparément pour la partie entière et la partie fractionnaire. La partie fractionnaire se calcule par des multiplications par 2 successives.

	0.625*2 = 0.25 + 1
	0.25*2  = 0.5  + 0
	0.5*2   = 0    + 1

$$0.625 = <0.101>_{2} = <0000\ 1010>_{\mathrm{virg.fixe}(4,4)-2}$$

#### Passage base 2 → 10

Les premières puissances de 2 négatives sont simplement l'inverse de leur équivalent positif :

<table>
	<tr>
		<td>$$2^{-1}$$</td>
		<td>$$2^{-2}$$</td>
		<td>$$2^{-3}$$</td>
		<td>$$2^{-4}$$</td>
		<td>$$2^{-5}$$</td>
		<td>$$2^{-6}$$</td>
		<td>$$2^{-7}$$</td>
	</tr>
	<tr>
		<th>1/2</th>
		<th>1/4</th>
		<th>1/8</th>
		<th>1/16</th>
		<th>1/32</th>
		<th>1/64</th>
		<th>1/128</th>
	</tr>
	<tr>
		<td>0.5</td>
		<td>0.25</td>
		<td>0.125</td>
		<td>0.0625</td>
		<td>0.03125</td>
		<td>0.015625</td>
		<td>0.0078125</td>
	</tr>
</table>

	<0000 1010>virg.fixe(4,4)-2 = (0*2^3 + 0*2^2 + 0*2^1 + 0*2^0 + 1*2^-1 + 0*2^-2 + 1*2^-3)
	                            = 0      + 0     + 0     + 0     + 0.5    + 0      + 0.125
	                            = 0.625

#### Précision

La précision dépend de la position de la virgule.  
Si p bits sont alloués à la partie fractionnaire, le codage aura une précision de 2^-p. Donc un encodage en virgule flottante (5,3) a une précision de 2^-3 = 0.125.

	<0000 0001>virg.fixe(5,3)-2 = 0.125
	<1111 1111>virg.fixe(5,3)-2 = 31.875

Ainsi `9.322` et `9.25` ont la même représentation: `<0100 1010>virg.fixe(5,3)-2`.  
Il faut connaître la précision voulue à l'avance pour choisir la position de la virgule avec l'encodage en virgule fixe.

### Virgule flottante

Tout réel x peut s'écrire sous la forme `<signe> * <mantisse> * <exposant>`. C'est la notation *S.M.E* (Signe Mantisse Exposant).

![SME](https://rawgit.com/a-mt/a3b6a7a40df516768fb8da90c352bdec/raw/12d39969e431148fb5fd593a9ce69dbb9f315985/sme.svg)

Un bit est utilisé pour coder le signe, p bits pour coder la mantisse et q bits pour coder l'exposant.

La notation S.M.E. est généralement utilisée par les calculettes de poche dans le mode dit de "notation scientifique".
