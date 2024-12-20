---
title: Encodages
category: Other
latex: true
---

## Encoder vs decoder

* La *représentation externe* d'une valeur est la valeur affichée à l'écran (ex: 'a', 3, 13.56)
tandis que la *représentation interne* est la valeur stockée sur le disque dur (des 0 et des 1).
Pour passer de la représentation externe à la représentation interne, on *code* les données, et
pour passer de la représentation interne à la représentation externe, on *décode* les données.

  ![Schéma représentation interne/externe](https://gistcdn.githack.com/a-mt/5b072a12c29d4e862b32af32c2e191cf/raw/734846acd05c0441a60b21f49eee80d74c109950/tmp.svg)

* Pour coder et décoder les données, il est indispensable de connaître la *méthode de codage* utilisée.
	La méthode de codage dépend principalement du type de donnée (texte, entier naturel, entier relatif, nombre réel). Un même code binaire n'aura plus du tout la même signification suivant la manière dont on le considère — du texte en Unicode Little-Endian, des valeurs numériques de couleur, etc.

## Représentation interne: Bits et octets

* Un *bit* (binary digit) vaut 0 ou 1.  
  Un *octet* (ou *byte* en anglais) est une suite de 8 bits.  

* Plus un bit est placé à gauche plus on dit qu'il a un *poids fort*,  
  plus un bit est placé à droite plus on dit qu'il a un *poids faible*:

* <ins>Exemples</ins>:
	- `01` vaut (0·2<sup>1</sup> + 1·2<sup>0</sup> =) 1
	- `10` vaut (1·2<sup>1</sup> + 0·2<sup>0</sup> =) 2
	- `1111 0000` vaut 240
	- `0000 1111` vaut 15

## Préfixe binaire

* Lorsqu'on a des grands nombres, on peut utiliser l'écriture scientifique (10 × 10<sup>3</sup> octets),  
ou ajouter un préfixe à l'unité (10 kilooctets, aussi abbrégé 10 ko).

	10 ⋅ 10<sup>3</sup> octets = 1 kilooctet (ko)  
	10 ⋅ 10<sup>6</sup> octets = 1 megaoctet (Mo)  
	10 ⋅ 10<sup>9</sup> octets = 1 gigaoctet (Go)  
	10 ⋅ 10<sup>12</sup> octets = 1 teraoctet (To)  
	10 ⋅ 10<sup>15</sup> octets = 1 petaoctet (Po)  
	10 ⋅ 10<sup>18</sup> octets = 1 exaoctet (Eo)  
	10 ⋅ 10<sup>21</sup> octets = 1 zetaoctet (Zo)  
	10 ⋅ 10<sup>24</sup> octets = 1 yottaoctet (Yo)

	![](https://i.imgur.com/Sq8x5rA.png)

## Notation hexadécimale

* La *notation hexadécimale* est une méthode de notation des bits: au lieu de noter une suite binaire (1111), ou une valeur décimale (15), on condense l'affichage de 4 bits avec des symboles (F), ce qui rend la lecture plus facile. Il y 4^2 valeurs différentes donc 16 symboles

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

---

## Méthodes d'Encodage pour les Caractères

### ASCII

* Le code *ASCII* (American Standard Code for Information Interchange) définit 128 caractères de 7 bits. Il contient les caractères de contrôles (retours à la ligne, etc), les chiffres arabes de 0 à 9, les lettres minuscules et majuscules de A à Z et des symboles mathématiques et de ponctuation.

  ![Table ASCII](https://i.imgur.com/DU6fI8q.gif)

### Jeux étendus ASCII

* Le premier bit de la table ASCII permet de définir des *jeux de caractères étendus*, comme ISO-8859-1 (Latin 1), qui ajoute les [caractères accentuées propres à une langue](http://www.madore.org/~david/computers/unicode/cstab.html#Latin-9) (par exemple en français: é, è, à, ï; en espagnol: ñ; en norvégien: ö, ø).

	Dû aux différents encodages entre différents pays et différents systèmes d'exploitation (Windows utilise le code ANSI et non Latin-9), qui rendent difficiles les échanges de documents, UNICODE est largement préféré.

	[Comparaison encodage Latin vs ANSI](!assets/encoding-latin-vs-ansi.html)

### UNICODE

* Le code *UNICODE* (Universal Code, ISO / IEC 10646) associe un code unique à chaque caractère, quels que soient la langue, la plateforme, le logiciel. Ce numéro est choisi dans une plage allant de 000000 à 10FFFF, soit 1 114 112 caractères possibles.

* Un caractère Unicode est définit par

  - un numéro (ex: U+0041).  
    Ce numéro est appelé *point de code* (ou *code point* en anglais).  
    Il est noté U+XXXX s'il tient sur 2 octets et U+XXXXXX sinon

  - un nom (ex: LATIN CAPITAL LETTER A).  
    Le glyphe est une représentation visuelle d'un caractère. Deux caractères Unicode différents peuvent avoir des glyphes représentatifs identiques, par exemple &#8491; (ANGSTROM SIGN, U+0212B) et &#197; (LATIN CAPITAL LETTER A WITH RING ABOVE, U+00C5)

  - des propriétés, telles que:

    - La catégorie (lettre majuscule, minuscule, ponctuation, nombre, marque, symbole, contrôle...)
    - La directionnalité
    - S'il existe un caractère dont le glyphe est le symétrique du glyphe du caractère
    - S'il s'agit d'un numéral
    - S'il est combinatoire.  
      Par exemple ^ (COMBINING CIRCUMFLEX ACCENT, U+0302) + a (LATIN SMALL LETTER A, U+0061) = â (LATIN SMALL LETTER A WITH CIRCUMFLEX, U+00E2)

* À peine 1/4 de l'espace des numéros est utilisé (environ 250 000 code points assignés).  
  La table Unicode est organisée en blocs, il n'est ainsi pas nécessaire de stocker l'ensemble des glyphes, uniquement celles des langues qu'on utilise.  
  Le premier bloc (nméroté 0), appelé *plan multilingue de base* (PMB) comprend les code points U+0000 à U+FFFF.  Il est le plus utilisé car il contient la plupart des caractères utilisés par les langues modernes les plus courantes dans le monde. 

  ![](https://i.imgur.com/kPdvKRr.png)

  Remarquons que Unicode est compatible ASCII (rien à faire pour passer de l'ASCII à l'UTF-8).

* Différentes représentations en mémoire sont possibles:

  - UTF-8: les caractères sont représentés au minimum sur 1 octet (8 bits)
  - UTF-16: les caractères sont représentés au minimum sur 2 octets (16 bits).  
    Soit avec du UTF-16-BE (Big Endian, octet de poids fort d'abord) soit du UTF-16-LE (Little Endian, octet de poids faible d'abord)
  - UTF-32: tous les caractères sont représentés sur 4 octets (32 bits).  
    Soit UTF-32-LE soit UTF-32-BE

* Le codage d'Unicode en UTF-8 permet de coder les caractères en longueur variable, de 1 à 4 octets. On peut facilement dire si un caractère est encodé sur 1 ou 4 octets en regardant sa représentation binaire:

  ![](https://i.imgur.com/4c6xVsu.png)

* On trouve parfois en début de document un caractère spécial couramment appelé BOM (*Byte Order mark*).  
	U+FEFF (ZERO WIDTH NO-BREAK SPACE) est utilisé pour indiquer qu'il sagit d'un document en UTF-16.  

	![](https://i.imgur.com/E1RlSupl.png)

	Certains logiciels requièrent le BOM pour utiliser le bon encodage (Excel par exemple).  
	D'autres, au contraire, ne le comprennent pas et afficheront en dur les caractères correspondants (`ï»¿` pour le BOM UTF-8).  
	Il est donc recommandé de ne jamais encoder un script avec BOM, de l'ajouter manuellement en début de réponse lorsque nécessaire.

  | Version UTF | Caractères en hexa | Caractères en décimal
  |---          |---                 |---
  |	UTF-8       | EF BB BF    | 239 187 191
  | UTF-16 (BE) | FE FF       | 254 255
  | UTF-16 (LE) | FF FE       | 255 254
  | UTF-32 (BE) | 00 00 FE FF | 0 0 254 255
  | UTF-32 (LE) | FF FE 00 00 | 255 254 0 0 

* Certains caractères Unicode ont deux représentations possibles: texte ou emoji.
	On peut choisir une variante ou l'autre avec un sélecteur de variation: U+FE0E pour texte (VS-15) ou U+FE0F pour emoji (VS-16).

	<pre>
	&amp;#x1f600;&amp;#xFE0E; = &#x1f600;&#xFE0E;

	&amp;#x1f600;&amp;#xFE0F; = &#x1f600;&#xFE0F;
	</pre>

	[Caractères Unicode](http://www.fileformat.info/info/unicode/index.htm)  
  [Emojis Unicode](https://emojipedia.org/)

---

## Méthodes d'Encodage pour les Entiers naturels (ℕ)

Dans la vie de tous les jours, on utilise les chiffres arabes de 0 à 9 pour former des nombres (base 10). Un ordinateur utilise utilise des 0 et des 1 (base 2). Par convention $$<n>_k$$ signifie que *n* est en base *k*, et si la base de *n* (*k*) n'est pas précisée, on considérera qu'il s'agit d'une base 10.

### Base 2

* <ins>Passer de la base 10 à 2</ins>:

	Pour obtenir la représentation en base 2 d'un nombre en base 10, on effectue des divisions successives, en notant la suite des restes. On lit le résultat de bas en haut (de haut en bas en écrivant de droite à gauche).

		59 = 29*2 + 1
		29 = 14*2 + 1
		14 = 7*2  + 0
		7 =  3*2  + 1
		3 =  1*2  + 1
		1 =  0*2  + 1

	$$<59>_{10} = <11\ 1011>_{2}$$

* <ins>Passer de la base 2 à 10</ins>:

	Pour obtenir la représentation en base 10 d'un nombre en base 2, on additionne les puissances de 2 à partir de l'index des bits:
	un bit à 1 à l'index 0 vaut $$2^0 = 1$$, un bit à 1 à l'index 1 vaut $$2^1 = 2$$, donc $$<11>_2 = 2^1 + 2^0 = 2 + 1 = 3$$

		<11 1011>2 = (1*2^5 + 1*2^4 + 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0)
		           = 32     + 16    + 8     + 0     + 2     + 1
		           = <59>10

	Il est donc utile de connaître les premières puissances de 2 par coeur.

	<table>
		<tr>
			<td>$$2^7$$</td>
			<td>$$2^6$$</td>
			<td>$$2^5$$</td>
			<td>$$2^4$$</td>
			<td>$$2^3$$</td>
			<td>$$2^2$$</td>
			<td>$$2^1$$</td>
			<td>$$2^0$$</td>
		</tr>
		<tr>
			<th>128</th>
			<th>64</th>
			<th>32</th>
			<th>16</th>
			<th>8</th>
			<th>4</th>
			<th>2</th>
			<th>1</th>
		</tr>
	</table>

	Notons que sur 8 bits (index de 0 à 7), le nombre encodé maximal est 255  
	et on peut encoder 256 valeurs différentes (de 0 à 255).

		<1111 1111>2 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1
		             = 255

* <ins>Additionner deux nombres</ins>:  
  Pour additionner deux nombres en binaire, on pose l'addition en les alignant à droite et on additionne de droite à gauche en prenant en compte la retenue (*r*), qui se propage à gauche.

	**Table de vérité**:

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

	*Exemple*:

	```
	    rr r 
	  0101 0110
	+ 0000 1100
	  ---------
	  0110 0010
	```

	*Exemple avec Dépassement (carry overflow, aka saturation)*:

	```
	r rrrr  r 
	  1111 1010
	+ 0000 1010
	  ---------
	  0000 0100
	```

  Le résultat de cette opération ne tient pas sur 8bits (et en effet 250 + 10 > 255). Lorsque l'addition engendre une retenue sortie égale à 1, il se produit un *dépassement*. Au niveau du processeur, un indicateur appelé *Carry* est positionné à 1.

* <ins>Soustraire deux nombres</ins>:  
  Pour soustraire deux nombres binaire, on pose la soustraction en les alignant à droite et on soustrait de droite à gauche. Lorsqu'on doit soustraire `0 - 1`, on emprunte 1 (*e*) à gauche et on calcule `2 - 1`.

	**Table de vérité**:

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

  *Exemple*:

  ```
		 e
	  0101 0110
	- 0000 1100
	  ---------
	  0100 1010
  ```

  *Exemple avec Dépassement*:

  ```
	e eeee
	  0000 0000
	- 0011 1000
	  ---------
	  1100 1000
	```

	Le résultat de cette opération ne peut pas être calculé pour des entiers naturels car on ne peut plus faire d'emprunt: il y *dépassement*. Là encore, l'indicateur *Carry* est positionné à 1.

### DCB: Décimal Codé Binaire

* Ou *Binary Coded Decimal* en anglais.  
	Le nombre à coder est représenté en base 10, puis chacun des chiffres est codé en base 2 sur 4 bits.  
	Remarquons qu'en binaire, 4 bits peuvent prendre pour valeur maximale (2<sup>4</sup> =) 16, mais pour du DCB on ira jusqu'à 9 max, on gaspille donc des configurations.

		<135>10 = <0001 0011 0101>DCB

* La représentation DCB est utilisée sur certaines calculatrices de poche et sur des ordinateurs pour les applications de gestion, comme des tableurs (le langage Cobol travaille en arithmétique décimale).

### Gros-Gray

* Ou *binaire réfléchi*.  
	Avec un codage en base 2, lorsque l'on passe d'une valeur *i* (ex 3 = 011) à une valeur *i+1* (ex 4 = 100), plusieurs bits peuvent changer simultanément.
	L'encodage Gros-Gray évite cela: le nombre de bits différents entre deux valeurs successives est toujours 1.

	```
	En binaire: 3 bits différents pour passer de 3 à 4
	3 = <0011>2
	4 = <0100>2

	En Gros-Gray: 1 bit différent pour passer de 3 à 4
	3 = <0010>Gray
	4 = <0110>Gray
	```

* La représentation Gros-Gray est utilisé pour la synthèse et l'analyse des circuits logiques, via les tableaux de Karnaugh et l'algèbre de Boole.

	![Gros-gray vs binaire](https://i.imgur.com/zVefotn.jpg)

---

## Méthodes d'Encodage pour les Entiers relatifs (ℤ)

### Signe et valeur absolue

* L'encodage *signe et valeur absolue* est noté $$<n>_{\pm| |}$$

	Le bit de poids fort (le plus à gauche) code le signe: 1 si négatif, 0 si positif.  
	Les autres bits codent le nombre en valeur absolue.  
	Sur 8 bits, l'intervalle des valeurs possibles va de +127 à -127 et 0 a deux codages (positif ou négatif), il y a donc 255 valeurs possibles

		 10 = <0000 1010>+-||
		-10 = <1000 1010>+-||

### Complément à 2

* L'encodage en complément à 2 est noté $$<n>_{\mathrm{Compl}.2}$$

	Le bit de poids fort code le signe: 1 si négatif, 0 si positif.  
	Si le nombre est positif, les autres bits codent le nombre en base 2; sinon, il s'agit de l'opposé du nombre en base 2 (= 0 - n).  
	Sur 8 bits, l’intervalle va de +127 à -127 et 0 a un seul codage: `<0000 0000>Compl.2`

		 10 = <0000 1010>Compl.2
		-10 = <1111 0110>Compl.2

* Par rapport à l'encodage signe et valeur absolue, l'encodage en complément à 2 facilite l'arithmétique

* <ins>Additionner deux nombres</ins>:
	On peut calculer la somme de nombres en complément à 2 de la même manière que des nombres en base 2

	```
	r rrr
	  0101 0000    (80)
	+ 1111 0110    (-10)
	  ---------
	  0100 0110    (70)
	```

	L'indicateur Carry n'est pas significatif: la dernière retenue peut être égale à 1 sans qu'il n'y ait pour autant *dépassement*.

	*Exemple Débordement (aka signed overflow)*:  
	Le fait qu'on ne dispose que de 7 bits pour coder la valeur du nombre (1 bit est utilisé pour le signe) implique que le résultat d'une opération n'est pas toujours cohérent: par exemple, l'addition de deux nombres positifs devrait retourner un nombre positif. Lorsque le résultat n'est pas cohérent on parle alors de *débordement*. L'indicateur *overflow* est positionné à 1.

  ```
	  0110 0100    (100)
	+ 0101 0000    (80)
	  ---------
	  1011 0100
	```
	```
	  1001 1100    (-100)
	- 0101 0000    (80)
	  ---------
	  0100 1100
	```
	```
	  1001 1100    (-100)
	+ 1011 0000    (-80)
	  ---------
	  0100 1100
	```

* <ins>Calculer l'opposé d'un nombre</ins>:  
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

## Méthodes d'Encodage pour les Réels (ℝ)

### Virgule fixe

* En représentation en virgule fixe, on définit la position de la virgule à l'avance.  
	Par exemple sur 8 bits, en positionnant la virgule entre le bit 4 et 3 (donc 4 bits pour la partie entière et 4 pour la partie fractionnaire) :

		  0,625 = <0000 1010>virg.fixe(4,4)-2
		- 0,625 = <1111 0110>virg.fixe(4,4)-Compl.2

* <ins>Passer de la base 10 à 2</ins>:  
	Pour passer de la base 10 à la base 2, on procède séparément pour la partie entière et la partie fractionnaire. La partie fractionnaire se calcule par des multiplications par 2 successives.

		0.625*2 = 0.25 + 1
		0.25*2  = 0.5  + 0
		0.5*2   = 0    + 1

	$$0.625 = <0.101>_{2} = <0000\ 1010>_{\mathrm{virg.fixe}(4,4)-2}$$

* <ins>Passer de la base 2 à 10</ins>:  
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

* La précision dépend de la position de la virgule.  
	Si *p* bits sont alloués à la partie fractionnaire, le codage aura une précision de 2^-*p*. Donc un encodage en virgule flottante (5,3) a une précision de 2^-3 = 0.125.  
	Ainsi `9.322` et `9.25` ont la même représentation: `<0100 1010>virg.fixe(5,3)-2`. Il faut connaître la précision voulue à l'avance pour choisir la position de la virgule avec l'encodage en virgule fixe.

		<0000 0001>virg.fixe(5,3)-2 = 0.125
		<1111 1111>virg.fixe(5,3)-2 = 31.875

### Virgule flottante

* Tout réel *x* peut s'écrire sous la forme `<signe> * <mantisse> * <exposant>`.  
	Un bit est utilisé pour coder le signe, *p* bits pour coder la mantisse et *q* bits pour coder l'exposant.  
	C'est la notation *S.M.E* (Signe Mantisse Exposant).

  ![SME](https://gistcdn.githack.com/a-mt/a3b6a7a40df516768fb8da90c352bdec/raw/12d39969e431148fb5fd593a9ce69dbb9f315985/sme.svg)

* La notation S.M.E. est généralement utilisée par les calculettes de poche dans le mode dit de "notation scientifique".
