---
title: Fonctions et opérateurs MySQL (prédéfinis)
category: BDD, MySQL
---

## Booléens

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">=</th>
    <td>Égal à</td>
    <td><code>a = b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year = 2017</pre></td>
  </tr>
  <tr>
    <th align="left">&lt;=&gt;</th>
    <td>NULL safe égal à</td>
    <td><code>a <=> b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year <=> given_year</pre></td>
  </tr>
  <tr>
    <th align="left">&lt;&gt;, !=</th>
    <td>Différent de</td>
    <td><code>a != b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year != 2017</pre></td>
  </tr>
  <tr>
    <th align="left">&lt;</th>
    <td>Inférieur à</td>
    <td><code>a < b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year < 2017</pre></td>
  </tr>
  <tr>
    <th align="left">&lt;=</th>
    <td>Inférieur ou égal à</td>
    <td><code>a <= b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year <= 2017</pre></td>
  </tr>
  <tr>
    <th align="left">&gt;</th>
    <td>Supérieur à</td>
    <td><code>a > b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year > 2017</pre></td>
  </tr>
  <tr>
    <th align="left">&gt;=</th>
    <td>Supérieur ou égal à</td>
    <td><code>a >= b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year >= 2017</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">BETWEEN ... AND</th>
    <td>Entre deux valeurs (incluses)</td>
    <td><code>BETWEEN a AND b</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year BETWEEN 2017 AND 2020</pre></td>
  </tr>
  <tr>
    <th align="left">IS NULL</th>
    <td>A pour valeur <code>NULL</code></td>
    <td><code>a IS NULL</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE year IS NULL</pre></td>
  </tr>
  <tr>
    <th align="left">LIKE</th>
    <td>Correspond au motif <sup>(1)</sup></td>
    <td><code>a LIKE 'pattern'</code></td>
    <td><pre lang="sql">SELECT* FROM Sales WHERE nom NOT REGEXP '^[a-z]$'</pre></td>
  </tr>
  <tr>
    <th align="left">EXISTS</th>
    <td>A au moins un résultat</td>
    <td><code>a EXISTS</code></td>
    <td><pre lang="sql">SELECT * FROM Sales WHERE EXISTS (SELECT ... FROM ... LIMT 1)</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">AND, &amp;&amp;</th>
    <td>Et</td>
    <td><code>a &amp;&amp; b</code></td>
    <td><pre lang="sql">SELECT* FROM People WHERE nom = "Dupont" AND prenom = "Jeanne"</pre></td>
  </tr>
  <tr>
    <th align="left">OR, ||</th>
    <td>Ou</td>
    <td><code>a || b</code></td>
    <td><pre lang="sql">SELECT * FROM People WHERE age >= 18 OR parent_autorise = 1</pre></td>
  </tr>
  <tr>
    <th align="left">XOR</th>
    <td>Ou&nbsp;exclusif</td>
    <td><code>a xor b</code></td>
    <td><pre lang="sql">SELECT * FROM User WHERE salt IS NULL XOR password = ENCODE("1234", salt)</pre></td>
  </tr>
  <tr>
    <th align="left">NOT, !</th>
    <td>Inverse <sup>(2)</sup></td>
    <td><code>not&nbsp;a</code></td>
    <td><pre lang="sql">SELECT * FROM People WHERE NOT(nom LIKE "Du%" AND LENGTH(nom) < 10)</pre></td>
  </tr>
</table>

<sup>(1)</sup> Pour le `LIKE` :  
&emsp; `%` : 0 à n caractères quelconques  
&emsp; `_` : exactement un caractère  
&emsp;[Voir exemples](https://www.w3schools.com/sql/sql_like.asp)

<sup>(2)</sup> Le `NOT` peut s'appliquer à une expression entre parenthèses mais aussi à un opérateur : `NOT NULL`, `NOT LIKE`, `NOT BETWEEN`, etc

## Nombres

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">+</th>
    <td>Addition</td>
    <td><code>num1 + num2</code></td>
    <td><pre lang="sql">SELECT 1 + 2 # 3</pre></td>
  </tr>
  <tr>
    <th align="left">-</th>
    <td>Soustraction</td>
    <td><code>num1 - num2</code></td>
    <td><pre lang="sql">SELECT 1 - 2 # -1</pre></td>
  </tr>
  <tr>
    <th align="left">/, DIV</th>
    <td>Division</td>
    <td><code>num1 / num2</code></td>
    <td><pre lang="sql">SELECT 1 / 2 # 0.5</pre></td>
  </tr>
  <tr>
    <th align="left">*</th>
    <td>Multiplication</td>
    <td><code>num1 * num2</code></td>
    <td><pre lang="sql">SELECT 1 * 2 # 2</pre></td>
  </tr>
  <tr>
    <th align="left">%, MOD</th>
    <td>Modulo</td>
    <td><code>num1 % num2</code></td>
    <td><pre lang="sql">SELECT 4 % 2 # 0</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">ROUND</th>
    <td>Arrondi</td>
    <td><code>ROUND(num,precision)</code></td>
    <td><pre lang="sql">SELECT ROUND(2.98765, 2) # 2.99</pre></td>
  </tr>
  <tr>
    <th align="left">TRUNCATE</th>
    <td>Troncature</td>
    <td><code>TRUNCATE(num,precision)</code></td>
    <td><pre lang="sql">SELECT TRUNCATE(2.98765, 2) # 2.98</pre></td>
  </tr>
  <tr>
    <th align="left">CEIL</th>
    <td>Arrondi à l'entier supérieur<br>Synonyme: CEILING</td>
    <td><code>CEIL(num)</code></td>
    <td><pre lang="sql">SELECT CEIL(5.1) # 6</pre></td>
  </tr>
  <tr>
    <th align="left">FLOOR</th>
    <td>Arrondi à l'entier inférieur</td>
    <td><code>FLOOR(num)</code></td>
    <td><pre lang="sql">SELECT FLOOR(5.9) # 5</pre></td>
  </tr>
  <tr>
    <th align="left">FORMAT</th>
    <td>Arrondi + formattage</td>
    <td><code>FORMAT(num,precision)</code></td>
    <td><pre lang="sql">SELECT FORMAT(1000, 2) # 1,000.00</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">BIN</th>
    <td>Retourne le code binaire de num</td>
    <td><code>BIN(code)</code></td>
    <td><pre lang="sql">SELECT BIN(8) # 1010</pre></td>
  </tr>
  <tr>
    <th align="left">HEX</th>
    <td>Retourne le code hexadecimal de num</td>
    <td><code>HEX(code)</code></td>
    <td><pre lang="sql">SELECT HEX(10) # A</pre></td>
  </tr>
  <tr>
    <th align="left">OCT</th>
    <td>Retourne le code octal de num</td>
    <td><code>OCT(code)</code></td>
    <td><pre lang="sql">SELECT OCT(10) # 12</pre></td>
  </tr>
  <tr>
    <th align="left">CONV</th>
    <td>Convertit num d'une base à l'autre</td>
    <td><code>CONV(num,from,to)</code></td>
    <td><pre lang="sql">SELECT CONV(1010,2,16) # A</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">ABS</th>
    <td>Valeur absolue</td>
    <td><code>ABS(num)</code></td>
    <td><pre lang="sql">SELECT ABS(-2) # 2</pre></td>
  </tr>
  <tr>
    <th align="left">SIGN</th>
    <td>Retourne le signe de num (-1,0 ou 1)</td>
    <td><code>SIGN(num)</code></td>
    <td><pre lang="sql">SELECT SIGN(-2) # -1</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">RAND</th>
    <td>Retourne un nombre aléatoire entre 0 et 1</td>
    <td><code>RAND()</code></td>
    <td><pre lang="sql">SELECT RAND() # 0.2651881633933523</pre></td>
  </tr>
  <tr>
    <th align="left">PI</th>
    <td>Retourne pi</td>
    <td><code>PI()</code></td>
    <td><pre lang="sql">SELECT PI() # 3.141593</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">POW</th>
    <td>Retourne num pouvoir p<br>Synonyme: POWER</td>
    <td><code>POW(num,p)</code></td>
    <td><pre lang="sql">SELECT POW(2,8) # 256</pre></td>
  </tr>
  <tr>
    <th align="left">SQRT</th>
    <td>Racine carrée</td>
    <td><code>SQRT(num)</code></td>
    <td><pre lang="sql">SELECT SQRT(256) # 16</pre></td>
  </tr>
  <tr>
    <th align="left">EXP</th>
    <td>Exponentielle</td>
    <td><code>EXP(num)</code></td>
    <td><pre lang="sql">SELECT EXP(2) # 7.38905609893065</pre></td>
  </tr>
  <tr>
    <th align="left">LN</th>
    <td>Logarithme népérien</td>
    <td><code>LN(num)</code></td>
    <td><pre lang="sql">SELECT LN(EXP(2)) # 2</pre></td>
  </tr>
  <tr>
    <th align="left">LOG10</th>
    <td>Log base 10</td>
    <td><code>LOG10(num)</code></td>
    <td><pre lang="sql">SELECT LOG10(10) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">LOG2</th>
    <td>Log base 2</td>
    <td><code>LOG2(num)</code></td>
    <td><pre lang="sql">SELECT LOG2(2) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">LOG</th>
    <td>Log base n</td>
    <td><code>LOG(base,num)</code></td>
    <td><pre lang="sql">SELECT LOG3(3,3) # 1</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">SIN</th>
    <td>Sinus</td>
    <td><code>SIN(num)</code></td>
    <td><pre lang="sql">SELECT SIN(0) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">COS</th>
    <td>Cosinus</td>
    <td><code>COS(num)</code></td>
    <td><pre lang="sql">SELECT COS(0) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">TAN</th>
    <td>Tangente</td>
    <td><code>TAN(num)</code></td>
    <td><pre lang="sql">SELECT TAN(0) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">ASIN</th>
    <td>Arc Sinus</td>
    <td><code>ASIN(num)</code></td>
    <td><pre lang="sql">SELECT SIN(0) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">ACOS</th>
    <td>Arc Cosinus</td>
    <td><code>ACOS(num)</code></td>
    <td><pre lang="sql">SELECT ACOS(1) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">ATAN</th>
    <td>Arc tangente</td>
    <td><code>ATAN(num)</code></td>
    <td><pre lang="sql">SELECT ATAN(0) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">ATAN2</th>
    <td>Arc tangente de deux points</td>
    <td><code>ATAN2(num1,num2)</code></td>
    <td><pre lang="sql">SELECT ATAN(-3,2) # -0.982793723247329</pre></td>
  </tr>
  <tr>
    <th align="left">COT</th>
    <td>Cotangente</td>
    <td><code>COT(num)</code></td>
    <td><pre lang="sql">SELECT COT(7) # 1.1475154224051356</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">DEGREES</th>
    <td>Convertion d'un degrès en radian</td>
    <td><code>DEGREES(num)</code></td>
    <td><pre lang="sql">SELECT DEGREES(90) # 5156.620156177409</pre></td>
  </tr>
  <tr>
    <th align="left">RADIANS</th>
    <td>Convertion d'un radian en degrès</td>
    <td><code>RADIANS(num)</code></td>
    <td><pre lang="sql">SELECT RADIANS(DEGREES(90)) # 90</pre></td>
  </tr>
</table>

## Bits

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">BIT_COUNT</th>
    <td>Retourne le nombre de bits à 1 dans arg</td>
    <td><code>BIT_COUNT(num)</code></td>
    <td><pre lang="sql">SELECT BIT_COUNT(16) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">&amp;</th>
    <td>Bitwise and</td>
    <td><code>a &amp; b</code></td>
    <td><pre lang="sql">SELECT 5 & 3 # 1 (101 & 011 = 001)</pre></td>
  </tr>
  <tr>
    <th align="left">|</th>
    <td>Bitwise or</td>
    <td><code>a | b</code></td>
    <td><pre lang="sql">SELECT 5 | 3 # 7 (101 & 011 = 111)</pre></td>
  </tr>
  <tr>
    <th align="left">^</th>
    <td>Bitwise xor</td>
    <td><code>a ^ b</code></td>
    <td><pre lang="sql">SELECT 5 ^ 3 # 6 (101 ^ 011 = 110)</pre></td>
  </tr>
  <tr>
    <th align="left">&lt;&lt;</th>
    <td>Left shift</td>
    <td><code>a << n</code></td>
    <td><pre lang="sql">SELECT 8 << 1 # 16</pre></td>
  </tr>
  <tr>
    <th align="left">&gt;&gt;</th>
    <td>Right shift</td>
    <td><code>a >> n</code></td>
    <td><pre lang="sql">SELECT 8 >> 1 # 4</pre></td>
  </tr>
  <tr>
    <th align="left">~</th>
    <td>Bitwise not</td>
    <td><code>~num</code></td>
    <td><pre lang="sql">SELECT ~2 # 18446744073709552000</pre></td>
  </tr>
</table>

## Tests

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">CASE</th>
    <td>Multi-condition</td>
    <td><pre>CASE arg
    WHEN val1 THEN rval1
    WHEN val2 THEN rval2
    ELSE rval3
    END
    </pre>
    <pre>CASE
    WHEN arg1 = val1 THEN rval1
    WHEN arg2 = val2 THEN rval2
    ELSE rval3
    END
    </pre></td>
    <td><pre lang="sql">SELECT (CASE att WHEN 1 THEN "un"
    WHEN 2 THEN "deux"
    ELSE "plusieurs"
    END) # plusieurs</pre></td>
  </tr>
  <tr>
    <th align="left">IF</th>
    <td>Condition ternaire</td>
    <td><code>IF(exp, valtrue, valfalse)</code></td>
    <td><pre lang="sql">SELECT IF(1 = 0, "ok", "nok") # nok</pre></td>
  </tr>
  <tr>
    <th align="left">IFNULL</th>
    <td>Retourne arg si != <code>NULL</code>, sinon default</td>
    <td><code>IFNULL(arg, default)</code></td>
    <td><pre lang="sql">SELECT IFNULL(NULL, "-") # -</pre></td>
  </tr>
  <tr>
    <th align="left">NULLIF</th>
    <td>Retoure <code>NULL</code> si arg = default</td>
    <td><code>NULLIF(arg, default)</code></td>
    <td><pre lang="sql">SELECT NULLIF("-", "-") # (null)</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">DEFAULT</th>
    <td>Retourne la valeur par défaut d'une colonne. Lève une erreur si la colonne n'a pas de valeur par défaut</td>
    <td><code>DEFAULT(attr)</code></td>
    <td><pre lang="sql">SELECT default(col1) from table1</pre></td>
  </tr>
</table>

## Convertions

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">CAST</th>
    <td>Convertion d'un type de donnée à un autre</td>
    <td><code>CAST(value AS type)</code></td>
    <td><pre lang="sql">SELECT CAST('2012-12-12' AS DATETIME) # 2012-12-12T00:00:00Z</pre></td>
  </tr>
  <tr>
    <th align="left">CONVERT</th>
    <td>Convertion d'un encodage à un autre</td>
    <td><code>CONVERT(value USING transcoding_name)</code></td>
    <td><pre lang="sql">SELECT CONVERT('bird' USING utf8) # bird</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">CHARSET</th>
    <td>Retourne l'encodage utilisé</td>
    <td><code>CHARSET(arg)</code></td>
    <td><pre lang="sql">SELECT CHARSET("abc") # utf8</pre></td>
  </tr>
  <tr>
    <th align="left">COLLATION</th>
    <td>Retourne la collation utilisée</td>
    <td><code>COLLATION(arg)</code></td>
    <td><pre lang="sql">SELECT COLLATION("abc") # utf8_general_ci</pre></td>
  </tr>
</table>

## Chaînes de caractère

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">CONCAT</th>
    <td>Concaténation</td>
    <td><code>CONCAT(args)</code></td>
    <td><pre lang="sql">SELECT CONCAT("aa", " ", "bb") # aa bb</pre></td>
  </tr>
  <tr>
    <th align="left">CONCAT_WS</th>
    <td>Concaténation avec séparateur</td>
    <td><code>CONCAT_WS(sep, args)</code></td>
    <td><pre lang="sql">SELECT CONCAT_WS(",", aa", " ", "bb") # aa, ,bb</pre></td>
  </tr>
  <tr>
    <th align="left">TRIM</th>
    <td>Supprime les espaces au début et à la fin. <br>Voir aussi: LTRIM et RTRIM</td>
    <td><code>TRIM(arg)</code></td>
    <td><pre lang="sql">SELECT TRIM("  aa  ") # aa</pre></td>
  </tr>
  <tr>
    <th align="left">SPACE</th>
    <td>Retourne num espaces</td>
    <td><code>SPACE(num)</code></td>
    <td><pre lang="sql">SELECT CONCAT("a", SPACE(5), "b") # a     b</pre></td>
  </tr>
  <tr>
    <th align="left">REPEAT</th>
    <td>Répète arg num fois</td>
    <td><code>REPEAT(arg,num)</code></td>
    <td><pre lang="sql">SELECT REPEAT("ab", 3) # ababab</pre></td>
  </tr>
  <tr>
    <th align="left">LPAD</th>
    <td>Préfixe arg avec char pour obtenir num caractères. <br>Voir aussi: RPAD</td>
    <td><code>LPAD(arg,num,char)</code></td>
    <td><pre lang="sql">SELECT LPAD("1", 3, "0") # 001</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">CHAR_LENGTH</th>
    <td>Retourne le nombre de caractère de arg<br>Synonyme: CHARACTER_LENGTH</td>
    <td><code>CHAR_LENGTH(arg)</code></td>
    <td><pre lang="sql">SELECT CHAR_LENGTH("éléphant") # 8</pre></td>
  </tr>
  <tr>
    <th align="left">LENGTH</th>
    <td>Retourne le nombre d'octets de arg. <br>Synonyme: OCTET_LENGTH</td>
    <td><code>LENGTH(arg)</code></td>
    <td><pre lang="sql">SELECT LENGTH("éléphant") # 10</pre></td>
  </tr>
  <tr>
    <th align="left">BIT_LENGTH</th>
    <td>Retourne le nombre de bits de arg</td>
    <td><code>BIT_LENGTH(arg)</code></td>
    <td><pre lang="sql">SELECT BIT_LENGTH("éléphant") # 80</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">ASCII</th>
    <td>Retourne le code decimal de char. <br>Valeur &gt; 127 = pas un caractère ASCII</td>
    <td><code>ASCII(char)</code></td>
    <td><pre lang="sql">SELECT ASCII("à") # 195</pre></td>
  </tr>
  <tr>
    <th align="left">ORD</th>
    <td>Retourne la valeur numérique de char<br>(= (code octet 1) + (code octet 2 * 256) + (code octet 3 * 2562))<br>= ASCII si le caractère est sur 1 octet</td>
    <td><code>ORD(arg)</code></td>
    <td><pre lang="sql">SELECT ORD("à") # 50080</pre></td>
  </tr>
  <tr>
    <th align="left">CHAR</th>
    <td>Retourne le caractère du code decimal num</td>
    <td><code>CHAR(arg)</code></td>
    <td><pre lang="sql">SELECT CHAR(ORD("à") USING "utf8") # à</pre></td>
  </tr>
  <tr>
    <th align="left">HEX</th>
    <td>Retourne arg en hexadécimal</td>
    <td><code>HEX(arg)</code></td>
    <td><pre lang="sql">SELECT HEX("Hello World") # 48656C6C6F20576F726C64</pre></td>
  </tr>
  <tr>
    <th align="left">UNHEX</th>
    <td>Decode le code hexadécimal arg</td>
    <td><code>HEX(arg)</code></td>
    <td><pre lang="sql">SELECT CAST(UNHEX(HEX('Hello World')) AS CHAR) # Hello World</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">REVERSE</th>
    <td>Inverse les lettres</td>
    <td><code>REVERSE(arg)</code></td>
    <td><pre lang="sql">SELECT REVERSE("abc") # cba</pre></td>
  </tr>
  <tr>
    <th align="left">QUOTE</th>
    <td>Ajoute un backslash devant chaque caractère de quote, backslash, NUL et control-Z. </td>
    <td><code>QUOTE(arg)</code></td>
    <td><pre lang="sql">SELECT QUOTE('text\'quote') # 'text\'quote'</pre></td>
  </tr>
  <tr>
    <th align="left">REPLACE</th>
    <td>Remplace a par b</td>
    <td><code>REPLACE(arg,a,b)</code></td>
    <td><pre lang="sql">SELECT REPLACE("a-b-c", "-", " ") # a b c</pre></td>
  </tr>
  <tr>
    <th align="left">INSERT</th>
    <td>Remplace la sous-chaine par une autre selon sa position</td>
    <td><code>INSERT(arg,pos,len,new)</code></td>
    <td><pre lang="sql">SELECT INSERT('Hello World!', 7, 5, 'Bob') # Hello Bob!</pre></td>
  </tr>
  <tr>
    <th align="left">LOWER</th>
    <td>Retourne arg en minuscules. <br>Synonyme: LCASE</td>
    <td><code>LOWER(arg)</code></td>
    <td><pre lang="sql">SELECT LOWER("ABC") # abc</pre></td>
  </tr>
  <tr>
    <th align="left">UPPER</th>
    <td>Retourne arg en majuscules. <br>Synonyme: UCASE</td>
    <td><code>UPPER(arg)</code></td>
    <td><pre lang="sql">SELECT UPPER("abc") # ABC</pre></td>
  </tr>
  <tr>
    <th align="left">SOUNDEX</th>
    <td>Retourne le résultat de Soundex sur arg<sup>(1)</sup></td>
    <td><code>SOUNDEX(arg)</code></td>
    <td><pre lang="sql">SELECT SOUNDEX("racket"), SOUNDEX("raquet") # R230 R230</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">SUBSTRING</th>
    <td>Retourne une sous-chaîne (à partir de 1)<br>Synonyme: MID, SUBSTR</td>
    <td><code>SUBSTRING(arg,pos,num)</code></td>
    <td><pre lang="sql">SELECT SUBSTRING("Hello World",1,5) # Hello</pre></td>
  </tr>
  <tr>
    <th align="left">LEFT</th>
    <td>Retourne num caractères à partir de la gauche</td>
    <td><code>LEFT(arg,num)</code></td>
    <td><pre lang="sql">SELECT LEFT("Hello World",5) # Hello</pre></td>
  </tr>
  <tr>
    <th align="left">RIGHT</th>
    <td>Retourne num caractères à partir de la droite</td>
    <td><code>RIGHT(arg,num)</code></td>
    <td><pre lang="sql">SELECT RIGHT("Hello World",5) # World</pre></td>
  </tr>
  <tr>
    <th align="left">SUBSTRING_INDEX</th>
    <td>Retourne le texte situé devant le délimiteur</td>
    <td><code>SUBSTRING_INDEX(arg, delim, occurrence)</code></td>
    <td><pre lang="sql">SELECT SUBSTRING_INDEX("/home/bob/file", "/", 3) # /home/bob</pre></td>
  </tr>
  <tr>
    <th align="left">POSITION</th>
    <td>Retourne la position d'une sous-chaîne</td>
    <td><code>POSITION(char IN arg)</code></td>
    <td><pre lang="sql">SELECT POSITION("o" in "Hello World") # 5</pre></td>
  </tr>
  <tr>
    <th align="left">INSTR</th>
    <td>Retourne la position du délimiteur</td>
    <td><code>INSTR(arg,delim)</code></td>
    <td><pre lang="sql">SELECT INSTR('un,deux,trois', 'trois') # 9</pre></td>
  </tr>
  <tr>
    <th align="left">LOCATE</th>
    <td>Retourne la position du délimiteur à partir de la position donnée (incluse).</td>
    <td><code>LOCATE(delim,arg,pos)</code></td>
    <td><pre lang="sql">SELECT LOCATE(',','un,deux,trois',4) # 8</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">STRCMP</th>
    <td>Compare deux chaînes de caractère. <br>1:(arg&gt;str), -1:(arg&lt;str), 0:(arg=str)</td>
    <td><code>STRCMP(arg,str)</code></td>
    <td><pre lang="sql">SELECT STRCMP("img10","img2") # -1</pre></td>
  </tr>
  <tr>
    <th align="left">CRC32</th>
    <td>Calcule la check-sum de arg</td>
    <td><code>CRC32(arg)</code></td>
    <td><pre lang="sql">SELECT CRC32("Hello") # 4157704578</pre></td>
  </tr>
</table>

<sup>(1)</sup> Soundex est un algorithme d'indexation de noms par leur prononciation (en anglais britannique), l'objectif étant que Soundex retourne la même valeur pour deux mots qui se prononcent de la même manière, indifféremment des différences d'écriture.

## Groupes

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">ELT</th>
    <td>Retourne l'élément num dans la liste d'arguments</td>
    <td><code>ELT(num,args)</code></td>
    <td><pre lang="sql">SELECT ELT(3, 'un', 'deux', 'trois') # trois</pre></td>
  </tr>
  <tr>
    <th align="left">FIELD</th>
    <td>Retourne la position de arg dans liste d'arguments</td>
    <td><code>FIELD(arg,args)</code></td>
    <td><pre lang="sql">SELECT FIELD('trois', 'un', 'deux', 'trois') # 3</pre></td>
  </tr>
  <tr>
    <th align="left">MAKE_SET</th>
    <td>Crée un set des arguments situés à la position donnée en binaire <sup>(1)</sup></td>
    <td><code>MAKE_SET(binpos,args)</code></td>
    <td><pre lang="sql">SELECT MAKE_SET(1|8, 'un','deux','trois','quatre') # un,quatre</pre></td>
  </tr>
  <tr>
    <th align="left">FIND_IN_SET</th>
    <td>Retourne la position de arg dans le set <sup>(2)</sup></td>
    <td><code>FIND_IN_SET(arg,set)</code></td>
    <td><pre lang="sql">SELECT FIND_IN_SET('trois', 'un,deux,trois') # 3</pre></td>
  </tr>
  <tr>
    <th align="left">GREATEST</th>
    <td>Retourne la plus grande valeur parmis une liste</td>
    <td><code>GREATEST(args)</code></td>
    <td><pre lang="sql">SELECT GREATEST(1,2,3) # 3</pre></td>
  </tr>
  <tr>
    <th align="left">LEAST</th>
    <td>Retourne la plus petite valeur parmis une liste</td>
    <td><code>LEAST(args)</code></td>
    <td><pre lang="sql">SELECT LEAST(1,2,3) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">INTERVAL</th>
    <td>Retourne l'index de la valeur plus petite que arg parmis une liste</td>
    <td><code>INTERVAL(arg, args)</code></td>
    <td><pre lang="sql">SELECT INTERVAL(5.5,1,3,5,7) # 3</pre></td>
  </tr>
  <tr>
    <th align="left">COALESCE</th>
    <td>Retourne la première valeur non nulle parmis une liste</td>
    <td><code>COALESCE(args)</code></td>
    <td><pre lang="sql">SELECT COALESCE(NULL,3,2) # 3</pre></td>
  </tr>
  <tr>
    <th align="left">IN</th>
    <td>Vérifie si arg est dans une liste de valeurs donnée</td>
    <td><code>arg IN(args)</code></td>
    <td><pre lang="sql">SELECT 3 IN(1,2,3) # 1</pre></td>
  </tr>
</table>

<sup>(1)</sup> Position en binaire = puissances de 2. Pos 1→1 (2^0), pos 2→2 (2^1), pos 3→4 (2^2), pos 4→8 (2^3), etc.  
<sup>(2)</sup> On peut aussi utiliser l'opérateur sur les bits `&` pour vérifier la présence d'un index ou non  

<ins>Tester la présence d'une valeur dans un groupe</ins> :

Soit en testant la présence de l'index (position binaire)

``` sql
-- interests: set('reading','sports','swimming','drawing','writing','acting')
-- Les personnes ayant les intérêts "reading" (2^0) et "drawing" (2^3)
SELECT name
FROM people_interests
WHERE interests & 1 AND interests & 8
ORDER BY name;
```

Soit avec `FIND_IN_SET` (revient au même que la requête précédente)

``` sql
SELECT name
FROM people_interests
WHERE FIND_IN_SET('reading',interests)>0
AND FIND_IN_SET('drawing',interests)>0
ORDER BY name;
```

## Agrégats

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">COUNT</th>
    <td>Nombre de résultats</td>
    <td><code>COUNT({*|DISTINCT att})</code></td>
    <td><pre lang="sql">SELECT count(*) FROM NOTE # 6</pre></td>
  </tr>
  <tr>
    <th align="left">MAX</th>
    <td>Valeur maximale</td>
    <td><code>MAX(att)</code></td>
    <td><pre lang="sql">SELECT count(note) FROM NOTE # 16</pre></td>
  </tr>
  <tr>
    <th align="left">MIN</th>
    <td>Valeur minimale</td>
    <td><code>MIN(att)</code></td>
    <td><pre lang="sql">SELECT min(note) FROM NOTE # 8</pre></td>
  </tr>
  <tr>
    <th align="left">AVG</th>
    <td>Moyenne</td>
    <td><code>AVG(att)</code></td>
    <td><pre lang="sql">SELECT avg(note) FROM NOTE # 12.5</pre></td>
  </tr>
  <tr>
    <th align="left">SUM</th>
    <td>Somme</td>
    <td><code>SUM([DISTINCT] att)</code></td>
    <td><pre lang="sql">SELECT sum(note) FROM NOTE # 75</pre></td>
  </tr>
  <tr>
    <th align="left">VARIANCE</th>
    <td>Variance standard (population)<br>Synonyme: VAR_POP</td>
    <td><code>VARIANCE(att)</code></td>
    <td><pre lang="sql">SELECT VARIANCE(Note) FROM NOTE # 6.25</pre></td>
  </tr>
  <tr>
    <th align="left">VAR_SAMP</th>
    <td>Variance échantillon. Le dénominateur est le nombre de ligne - 1</td>
    <td><code>VAR_SAMP(att)</code></td>
    <td><pre lang="sql">SELECT VAR_SAMP(Note) FROM NOTE # 7.5</pre></td>
  </tr>
  <tr>
    <th align="left">STD</th>
    <td>Déviation standard (population)<br>Synonyme: STDDEV, STDDEV_POP</td>
    <td><code>STD(att)</code></td>
    <td><pre lang="sql">SELECT STD(Note) FROM NOTE # 2.5</pre></td>
  </tr>
  <tr>
    <th align="left">STDDEV_SAMP</th>
    <td>Déviation échantillon</td>
    <td><code>STD(att)</code></td>
    <td><pre lang="sql">SELECT STDDEV_SAMP(Note) FROM NOTE # 2.7386127875258306</pre></td>
  </tr>
  <tr>
    <th align="left">GROUP_CONCAT</th>
    <td>Concaténe toutes les valeurs du groupe. <a href="http://sqlfiddle.com/#!9/9cbc63/17">SQLFiddle</a></td>
    <td><code>GROUP_CONCAT(att [ORDER BY att] [SEPARATOR sep])</code></td>
    <td><pre lang="sql">SELECT GROUP_CONCAT(nom SEPARATOR "-") FROM clubs # Musique-Littérature-Sport</pre></td>
  </tr>
</table>

## Dates

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">NOW</th>
    <td>Retourne la date et heure actuelle<br>Synonyme: CURRENT_TIMESTAMP, LOCALTIME, LOCALTIMESTAMP</td>
    <td><code>NOW()</code></td>
    <td><pre lang="sql">SELECT NOW() # 2017-11-03T07:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">SYSDATE</th>
    <td>Retourne la date et heure au moment de l'execution<sup>(1)</sup></td>
    <td><code>SYSDATE()</code></td>
    <td><pre lang="sql">SELECT SYSDATE() # 2017-11-03T07:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">UTC_TIMESTAMP</th>
    <td>Retourne la date et heure UTC</td>
    <td><code>UTC_TIMESTAMP()</code></td>
    <td><pre lang="sql">SELECT UTC_TIMESTAMP() # 2017-11-03T07:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">CURRENT_DATE</th>
    <td>Retourne la date du jour<br>Synonyme: CURDATE</td>
    <td><code>CURRENT_DATE()</code></td>
    <td><pre lang="sql">SELECT CURRENT_DATE() # 2017-11-03</pre></td>
  </tr>
  <tr>
    <th align="left">UTC_DATE</th>
    <td>Retourne la date UTC</td>
    <td><code>UTC_DATE()</code></td>
    <td><pre lang="sql">SELECT UTC_DATE() # 2017-11-03</pre></td>
  </tr>
  <tr>
    <th align="left">CURRENT_TIME</th>
    <td>Retourne l'heure actuelle<br>Synonyme: CURTIME</td>
    <td><code>CURRENT_TIME()</code></td>
    <td><pre lang="sql">SELECT CURRENT_TIME() # 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">UTC_TIME</th>
    <td>Retourne ll'heure UTC</td>
    <td><code>UTC_TIME()</code></td>
    <td><pre lang="sql">SELECT UTC_TIME() # 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">FROM_DAYS</th>
    <td>Crée une date à partir d'un nombre de jours</td>
    <td><code>FROM_DAYS(num)</code></td>
    <td><pre lang="sql">SELECT FROM_DAYS(737001) # 2017-11-03</pre></td>
  </tr>
  <tr>
    <th align="left">FROM_UNIXTIME</th>
    <td>Crée une date à partir d'un timestamp Unix</td>
    <td><code>FROM_UNIXTIME(timestamp)</code></td>
    <td><pre lang="sql">SELECT FROM_UNIXTIME(1509689901) # 2017-11-03T06:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">MAKEDATE</th>
    <td>Crée une date à partir d'un numéro de jour + année</td>
    <td><code>MAKEDATE(year,dayofyear)</code></td>
    <td><pre lang="sql">SELECT MAKEDATE(2017,307) # 2017-11-03</pre></td>
  </tr>
  <tr>
    <th align="left">SEC_TO_TIME</th>
    <td>Crée un time à partir d'un nombre de secondes</td>
    <td><code>SEC_TO_TIME(num)</code></td>
    <td><pre lang="sql">SELECT SEC_TO_TIME(3610) # 01:00:10</pre></td>
  </tr>
  <tr>
    <th align="left">MAKETIME</th>
    <td>Crée un time à partir d'une heure + minute + seconde</td>
    <td><code>MAKETIME(hour,minute,second)</code></td>
    <td><pre lang="sql">SELECT MAKETIME(7,18,21) # 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">TIMESTAMP</th>
    <td>Crée une date à partir d'un timestamp donné</td>
    <td><code>TIMESTAMP(timestamp)</code></td>
    <td><pre lang="sql">SELECT TIMESTAMP('2017-11-03 07:18:21') # 2017-11-03T07:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">STR_TO_DATE</th>
    <td>Crée une date à partir d'une chaîne de caractères et du format donné <sup>(2)</sup></td>
    <td><code>STR_TO_DATE(str, format)</code></td>
    <td><pre lang="sql">SELECT STR_TO_DATE("03/11/2017", "%d/%m/%Y") # 2017-11-03</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">LAST_DAY</th>
    <td>Retourne le dernier jour du mois de arg</td>
    <td><code>LAST_DAY(arg)</code></td>
    <td><pre lang="sql">SELECT LAST_DAY(NOW()) # 2017-11-30</pre></td>
  </tr>
  <tr>
    <th align="left">MICROSECOND</th>
    <td>Retourne le nombre de microsecondes de arg</td>
    <td><code>MICROSECOND(arg)</code></td>
    <td><pre lang="sql">SELECT MICROSECOND(NOW()) # 0</pre></td>
  </tr>
  <tr>
    <th align="left">SECOND</th>
    <td>Retourne le nombre de secondes de arg</td>
    <td><code>SECOND(arg)</code></td>
    <td><pre lang="sql">SELECT SECOND(NOW()) # 21</pre></td>
  </tr>
  <tr>
    <th align="left">MINUTE</th>
    <td>Retourne le nombre de minutes de arg</td>
    <td><code>MINUTE(arg)</code></td>
    <td><pre lang="sql">SELECT MINUTE(NOW()) # 18</pre></td>
  </tr>
  <tr>
    <th align="left">HOUR</th>
    <td>Retourne l'heure de arg</td>
    <td><code>HOUR(arg)</code></td>
    <td><pre lang="sql">SELECT HOUR(NOW()) # 7</pre></td>
  </tr>
  <tr>
    <th align="left">TIME</th>
    <td>Retourne la partie temps de arg</td>
    <td><code>TIME(arg)</code></td>
    <td><pre lang="sql">SELECT TIME(NOW()) # 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">DATE</th>
    <td>Retourne la partie date de arg</td>
    <td><code>DATE(arg)</code></td>
    <td><pre lang="sql">SELECT DATE('2017-11-03T07:18:21') # 2017-11-03</pre></td>
  </tr>
  <tr>
    <th align="left">DAY</th>
    <td>Retourne le jour du mois de arg (entre 1 et 31)<br>Synonyme: DAYOFMONTH</td>
    <td><code>DAY(arg)</code></td>
    <td><pre lang="sql">SELECT DAY('2017-11-03T07:18:21') # 3</pre></td>
  </tr>
  <tr>
    <th align="left">DAYNAME</th>
    <td>Retourne le jour de la semaine de arg</td>
    <td><code>DAYNAME(arg)</code></td>
    <td><pre lang="sql">SELECT DAYNAME('2017-11-03T07:18:21') # Friday</pre></td>
  </tr>
  <tr>
    <th align="left">DAYOFWEEK</th>
    <td>Retourne le numéro de jour de la semaine de arg (de Dimanche 1 à Samedi 7)</td>
    <td><code>DAYOFWEEK(arg)</code></td>
    <td><pre lang="sql">SELECT DAYOFWEEK('2017-11-03T07:18:21') # 6</pre></td>
  </tr>
  <tr>
    <th align="left">WEEKDAY</th>
    <td>Retourne l'index du jour de la semaine (de Lundi 0 à Dimanche 6)</td>
    <td><code>WEEKDAY(arg)</code></td>
    <td><pre lang="sql">SELECT WEEKDAY('2017-11-03T07:18:21') # 4</pre></td>
  </tr>
  <tr>
    <th align="left">WEEK</th>
    <td>Retourne le numéro de la semaine dans l'année (de 0 à 53). Premier jour: Dimanche.</td>
    <td><code>WEEK(arg)</code></td>
    <td><pre lang="sql">SELECT WEEK('2017-11-03T07:18:21') # 44</pre></td>
  </tr>
  <tr>
    <th align="left">WEEKOFYEAR</th>
    <td>Retourne le numéro de la semaine dans l'année (de 1 à 53). Premier jour: Lundi.</td>
    <td><code>WEEKOFYEAR(arg)</code></td>
    <td><pre lang="sql">SELECT WEEKOFYEAR('2017-11-03T07:18:21') # 44</pre></td>
  </tr>
  <tr>
    <th align="left">MONTH</th>
    <td>Retourne le numéro de mois de arg (entre 1 et 12)</td>
    <td><code>MONTH(arg)</code></td>
    <td><pre lang="sql">SELECT MONTH(NOW()) # 11</pre></td>
  </tr>
  <tr>
    <th align="left">MONTHNAME</th>
    <td>Retourne le nom du mois de arg</td>
    <td><code>MONTHNAME(arg)</code></td>
    <td><pre lang="sql">SELECT MONTHNAME(NOW()) # November</pre></td>
  </tr>
  <tr>
    <th align="left">QUARTER</th>
    <td>Retourne le numéro de quart d'année de arg (entre 1 et 4)</td>
    <td><code>QUARTER(arg)</code></td>
    <td><pre lang="sql">SELECT QUARTER(NOW()) # 4</pre></td>
  </tr>
  <tr>
    <th align="left">DAYOFYEAR</th>
    <td>Retourne le jour de l'année de arg (de 1 à 366)</td>
    <td><code>DAYOFWEEK(arg)</code></td>
    <td><pre lang="sql">SELECT DAYOFYEAR('2017-11-03T07:18:21') # 307</pre></td>
  </tr>
  <tr>
    <th align="left">YEAR</th>
    <td>Retourne l'année de arg (de 1000 à 9999)</td>
    <td><code>YEAR(arg)</code></td>
    <td><pre lang="sql">SELECT YEAR('2017-11-03T07:18:21') # 2017</pre></td>
  </tr>
  <tr>
    <th align="left">YEARWEEK</th>
    <td>Retourne l'année et la semaine de l'année de arg</td>
    <td><code>YEARWEEK(arg)</code></td>
    <td><pre lang="sql">SELECT YEARWEEK('2017-11-03T07:18:21') # 201744</pre></td>
  </tr>
  <tr>
    <th align="left">UNIX_TIMESTAMP</th>
    <td>Retourne arg en timestamp Unix</td>
    <td><code>UNIX_TIMESTAMP(arg)</code></td>
    <td><pre lang="sql">SELECT UNIX_TIMESTAMP("2017-11-03") # 1509667200</pre></td>
  </tr>
  <tr>
    <th align="left">TO_DAYS</th>
    <td>Retourne le nombre de jours depuis l'an 0</td>
    <td><code>TO_DAYS(arg)</code></td>
    <td><pre lang="sql">SELECT TO_DAYS("2017-11-03") # 737001</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">DATE_FORMAT</th>
    <td>Formatte une date en chaîne de caractère <sup>(2)</sup></td>
    <td><code>DATE_FORMAT(date, format)</code></td>
    <td><pre lang="sql">SELECT DATE_FORMAT(NOW(), "%d/%m/%Y  %H:%i:%s") # 03/11/2017 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">TIME_FORMAT</th>
    <td>Formatte un time en chaîne de caractère <sup>(2)</sup></td>
    <td><code>TIME_FORMAT(time, format)</code></td>
    <td><pre lang="sql">SELECT TIME_FORMAT(NOW(), "%H:%i:%s") # 07:18:21</pre></td>
  </tr>
  <tr>
    <th align="left">GET_FORMAT</th>
    <td>Retourne le format d'une date selon la localisation donnée (ex: USA, EUR) <sup>(3)</sup></td>
    <td><code>GET_FORMAT({DATE|TIME|DATETIME},"{EUR|USA|JIS|ISO|INTERNATIONAL}")</code></td>
    <td><pre lang="sql">SELECT GET_FORMAT(DATETIME, 'EUR') # %Y-%m-%d %H.%i.%s</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">+, DATE_ADD</th>
    <td>Ajoute l'intervalle donné à une date <sup>(4)</sup><br>Synonyme: ADDDATE</td>
    <td><code>date + INTERVAL n unit</code>, <code>ADDDATE(date,INTERVAL n unit)</code>, <code>ADDDATE(expr,days)</code></td>
    <td><pre lang="sql">SELECT DATE_ADD(NOW(), INTERVAL '10 10:10:10' DAY_SECOND) # 2027-11-03T07:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">-, DATE_SUB</th>
    <td>Soutrait l'intervalle donné à une date <sup>(4)</sup><BR>Synonyme: SUBDATE</td>
    <td><code>date - INTERVAL n unit</code>, <code>DATE_SUB(date,INTERVAL n unit)</code></td>
    <td><pre lang="sql">SELECT DATE_SUB(NOW(), INTERVAL '10 10:10:10' DAY_SECOND) # 2017-11-13T17:28:31Z</pre></td>
  </tr>
  <tr>
    <th align="left">DATEDIFF</th>
    <td>Calcule la différence en jours entre deux dates</td>
    <td><code>DATEDIFF(date1,date2)</code></td>
    <td><pre lang="sql">SELECT DATEDIFF('2017-11-03T07:18:21', '2017-11-13T17:28:31Z') # -10</pre></td>
  </tr>
  <tr>
    <th>TIMESTAMPADD</th>
    <td>Ajoute l'intervalle donné à une date <sup>(4)</sup> (uniquement les unités entières)</td>
    <td><code>TIMESTAMPADD(unit, num, date)</code></td>
    <td><pre lang="sql">SELECT TIMESTAMPADD(MONTH, 2, "2017-11-03") # 2018-01-03</pre></td>
  </tr>
  <tr>
    <th>TIMESTAMPDIFF</th>
    <td>Calcule la différence entre deux dates avec l'unité donné<sup>(4)</sup> (uniquement les unités entières)</td>
    <td><code>TIMESTAMPDIFF(unit,date1,date2)</code></td>
    <td><pre lang="sql">SELECT TIMESTAMPDIFF(MONTH, "2017-11-03", "2017-10-02") # -1</pre></td>
  </tr>
  <tr>
    <th align="left">TIMEDIFF</th>
    <td>Calcule la différence de temps entre deux temps. La date supérieure doit nécessairement être en premier pour avoir un résultat valide</td>
    <td><code>TIMEDIFF(date1,date2)</code></td>
    <td><pre lang="sql">SELECT CAST(TIMEDIFF('07:18:21', '17:28:31') as CHAR) # -10:10:10</pre></td>
  </tr>
  <tr>
    <th align="left">ADDTIME</th>
    <td>Ajoute le temps donné à une date</td>
    <td><code>ADDTIME(arg,time)</code></td>
    <td><pre lang="sql">SELECT ADDTIME(NOW(), '10 10:10:10') # 2017-11-13T17:28:31Z</pre></td>
  </tr>
  <tr>
    <th align="left">SUBTIME</th>
    <td>Soustrait le temps donné à une date</td>
    <td><code>SUBTIME(arg,time)</code></td>
    <td><pre lang="sql">SELECT SUBTIME(NOW(), '10 10:10:10') # 2017-10-23T21:08:11Z</pre></td>
  </tr>
  <tr>
    <th align="left">CONVERT_TZ</th>
    <td>Convertit d'une timezone à une autre</td>
    <td><code>CONVERT_TZ(date, from, to)</code></td>
    <td><pre lang="sql">SELECT CONVERT_TZ(NOW(),'+00:00','+10:00') # 2017-11-03T17:18:21Z</pre></td>
  </tr>
  <tr>
    <th align="left">PERIOD_ADD</th>
    <td>Ajoute num mois à une période année/mois donnée</td>
    <td><code>PERIOD_ADD(period, num)</code></td>
    <td><pre lang="sql">SELECT PERIOD_ADD(EXTRACT(YEAR_MONTH FROM NOW()), 2) # 201801</pre></td>
  </tr>
  <tr>
    <th align="left">PERIOD_DIFF</th>
    <td>Retourne la différence entre deux périodes</td>
    <td><code>PERIOD_DIFF(period1, period2)</code></td>
    <td><pre lang="sql">SELECT PERIOD_DIFF(NOW(), NOW() + INTERVAL 1 HOUR) # -1200</pre></td>
  </tr>
</table>

<sup>(1)</sup> NOW() retourne le temps auquel la requête à été lancée tandis que SYSDATE() retourne le temps auquel la requête à été executée. La différence est notable à l'intérieur d'une procédure.  
<sup>(2)</sup> [Format date](https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-format)  
<sup>(3)</sup> [Liste des formats par localisation](https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format)  
<sup>(4)</sup> [Unités d'intervalle disponibles](https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_date-add)  

## Encode & decode

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">TO_BASE64</th>
    <td>Encode str en base64</td>
    <td><code>TO_BASE64</code></td>
    <td><pre lang="sql">SELECT TO_BASE64("Hello World") # SGVsbG8gV29ybGQ=</pre></td>
  </tr>
  <tr>
    <th align="left">FROM_BASE64</th>
    <td>Decode str en base64</td>
    <td><code>FROM_BASE64</code></td>
    <td><pre lang="sql">SELECT CAST(FROM_BASE64(TO_BASE64("Hello World")) AS CHAR) # Hello World=</pre></td>
  </tr>
  <tr>
    <th align="left">ENCODE</th>
    <td>Encode str avec secret</td>
    <td><code>ENCODE(str, secret)</code></td>
    <td><pre lang="sql">SELECT ENCODE("Hello World", "mypassphrase") # SY1W01kCMCYaYk0=</pre></td>
  </tr>
  <tr>
    <th align="left">DECODE</th>
    <td>Decode str avec secret</td>
    <td><code>DECODE(str, secret)</code></td>
    <td><pre lang="sql">SELECT CAST(DECODE(ENCODE("Hello World", "mypassphrase"), "mypassphrase") AS CHAR) # Helo World</pre></td>
  </tr>
  <tr>
    <th align="left">AES_ENCRYPT</th>
    <td>Encrypte str avec secret (algorithme AES)</td>
    <td><code>AES_ENCRYPT(str, secret)</code></td>
    <td><pre lang="sql">SELECT AES_ENCRYPT("Hello World", "mypassphrase") # hN63i2KKmFIxqC/OWipX9g==</pre></td>
  </tr>
  <tr>
    <th align="left">AES_DECRYPT</th>
    <td>Decrypte str avec secret (algorithme AES)</td>
    <td><code>AES_DECRYPT(str, secret)</code></td>
    <td><pre lang="sql">SELECT CAST(AES_DECRYPT(AES_ENCRYPT("Hello World", "mypassphrase"), "mypassphrase") AS CHAR) # Hello World</pre></td>
  </tr>
  <tr>
    <th align="left">DES_ENCRYPT</th>
    <td>Encrypte str avec secret (algorithme Triple-DES)</td>
    <td><code>DES_ENCRYPT(str, secret)</code></td>
    <td><pre lang="sql">SELECT DES_ENCRYPT("Hello World", "mypassphrase") # /28aS5IVYTJu+qkqATSQaeA=</pre></td>
  </tr>
  <tr>
    <th align="left">DES_DECRYPT</th>
    <td>Decrypt str avec secret (algorithme Triple-DES)</td>
    <td><code>DES_DECRYPT(str, secret)</code></td>
    <td><pre lang="sql">SELECT CAST(DES_DECRYPT(DES_ENCRYPT("Hello World", "mypassphrase"),"mypassphrase") AS CHAR) # Hello World</pre></td>
  </tr>
  <tr>
    <th align="left">COMPRESS</th>
    <td>Compresse str</td>
    <td><code>COMPRESS(str)</code></td>
    <td><pre lang="sql">SELECT COMPRESS("Hello World") # CwAAAHic80jNyclXCM8vykkBABgLBB0=</pre></td>
  </tr>
  <tr>
    <th align="left">UNCOMPRESS</th>
    <td>Decompresse str</td>
    <td><code>UNCOMPRESS(str)</code></td>
    <td><pre lang="sql">SELECT CAST(UNCOMPRESS(COMPRESS("Hello World")) as CHAR) # Hello World</pre></td>
  </tr>
  <tr>
    <th align="left">UNCOMPRESSED_LENGTH</th>
    <td>Retourne la longueur decompressée de str</td>
    <td><code>UNCOMPRESSED_LENGTH(str)</code></td>
    <td><pre lang="sql">SELECT UNCOMPRESSED_LENGTH(COMPRESS("Hello World")) # 11</pre></td>
  </tr>
  <tr>
    <th align="left">ENCRYPT</th>
    <td>Hashe str avec secret (fonction Unix crypt()). Retourne `NULL` sous Windows</td>
    <td><code>ENCRYPT(str, secret)</code></td>
    <td><pre lang="sql">SELECT ENCRYPT("Hello World", "mypassphrase") # bXlWY05ZSFJORi9LWQ==</pre></td>
  </tr>
  <tr>
    <th align="left">MD5</th>
    <td>Hashe str (algorithme MD5)</td>
    <td><code>MD5(str)</code></td>
    <td><pre lang="sql">SELECT MD5("Hello World") # b10a8db164e0754105b7a99be72e3fe5</pre></td>
  </tr>
  <tr>
    <th align="left">SHA1</th>
    <td>Hashe str (algorithme SHA1)</td>
    <td><code>SHA1(str)</code></td>
    <td><pre lang="sql">SELECT SHA1("Hello World") # 0a4d55a8d778e5022fab701977c5d840bbc486d0</pre></td>
  </tr>
  <tr>
    <th align="left">SHA2</th>
    <td>Hashe str avec secret (algorithme SHA2)</td>
    <td><code>SHA2(str)</code></td>
    <td><pre lang="sql">SELECT SHA2("Hello World", "mypassphrase") # a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e</pre></td>
  </tr>
  <tr>
    <th align="left">PASSWORD</th>
    <td>Hashe str</td>
    <td><code>PASSWORD(str)</code></td>
    <td><pre lang="sql">SELECT PASSWORD("Hello World") # *190347D0759F3564BAA3EA737E1BB0480A9E75C9</pre></td>
  </tr>
</table>

## Pertinence

`MATCH ... AGAINST` permet de vérifie pertinence d'une ligne pour une recherche, selon les colonnes ciblées et le texte recherché.  
Les termes recherchés ne sont pas forcemment accolés dans le texte.  
Les mots-vides de la requête (*stopwords* en anglais) sont ignorés. [Plus d'info sur les stopwords](https://dev.mysql.com/doc/refman/5.7/en/fulltext-stopwords.html).  
Ne peut être utilisé que sur les colonnes ayant un index de type `FULLTEXT`.

Le format est comme suit :

    MATCH (colonnes) AGAINST (recherche [
        IN NATURAL LANGUAGE MODE
      | [IN NATURAL LANGUAGE MODE] WITH QUERY EXPANSION
      | IN BOOLEAN MODE
    ])

Plusieurs modes sont disponibles :
- `IN NATURAL LANGUAGE MODE` (par défaut) :  
  Interprète la chaîne comme une phrase en langage naturel (texte libre). 
  [SQLFiddle](http://sqlfiddle.com/#!9/dc92c9/7)

  ``` sql
  SELECT id, MATCH(title, text) AGAINST('security attack') as relevance FROM documents;

  +----+---------------------+
  | id | relevance           |
  +----+---------------------+
  | 1  | 0                   |
  | 2  | 0.22764469683170319 |
  | 3  | 0.9105787873268127  |
  +----+---------------------+
  ```

- `WITH QUERY EXPANSION` :  
  Élargit le résultat de la recherche naturelle en recherchant les documents apparentés aux résultats trouvés

  ``` sql
  SELECT productName
  FROM products
  WHERE MATCH(productName) 
        AGAINST('1992' WITH QUERY EXPANSION);

  +-------------------------------------+
  | productName                         |
  +-------------------------------------+
  | 1992 Porsche Cayenne Turbo Silver   |
  | 1992 Ferrari 360 Spider red         |
  | 2001 Ferrari Enzo                   |
  | 1932 Alfa Romeo 8C2300 Spider Sport |
  | 1948 Porsche 356-A Roadster         |
  | 1948 Porsche Type 356 Roadster      |
  | 1956 Porsche 356A Coupe             |
  +-------------------------------------+
  ```

- `IN BOOLEAN MODE` :  
  Spécifie les termes à inclure et à exclure

  ``` sql
  SELECT * FROM articles WHERE MATCH (title,body)
      AGAINST ('+MySQL -YourSQL' IN BOOLEAN MODE);
  +----+-----------------------+-------------------------------------+
  | id | title                 | body                                |
  +----+-----------------------+-------------------------------------+
  |  1 | MySQL Tutorial        | DBMS stands for DataBase ...        |
  |  2 | How To Use MySQL Well | After you went through a ...        |
  |  3 | Optimizing MySQL      | In this tutorial we will show ...   |
  |  4 | 1001 MySQL Tricks     | 1. Never run mysqld as root. 2. ... |
  |  6 | MySQL Security        | When configured properly, MySQL ... |
  +----+-----------------------+-------------------------------------+
  ```

<ins>Opérateurs de la recherche booléenne</ins>:

<table>
  <thead>
    <tr>
      <th>Opérateur</th>
      <th>Description</th>
      <th>Exemple</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>mot</td>
      <td>Les lignes qui contiennent ce mot ont une pertinence plus élevée</td>
      <td><code>join union</code> : les lignes qui contiennent un des deux mots</td>
    </tr>
    <tr>
      <td>~mot</td>
      <td>Les lignes qui contiennent ce mot ont une pertinence moins élevée</td>
      <td><code>join ~union</code> : les lignes qui contiennent "join" et "union" sont moins pertinentes que celles qui ne contiennent que "join"</td>
    </tr>
    <tr>
      <td>"mot1 mot2"</td>
      <td>Les lignes qui contiennent ces deux mots littéralement, accolés</td>
      <td><code>join union</code> : les lignes qui contiennent exactement l'expression "join union"</td>
    </tr>
    <tr>
      <td>+mot</td>
      <td>Le mot doit être présent</td>
      <td>
        <code>+join +union</code> : les lignes qui contiennent "join" et "union"<br>
        <code>+join union</code> : les lignes qui contiennent "join" (résultat plus pertinent si elle contient aussi "union")<br>
      </td>
    </tr>
    <tr>
      <td>-mot</td>
      <td>Le mot ne doit pas être présent</td>
      <td><code>+join -union</code> : contient "join" mais pas "union"</td>
    </tr>
    <tr>
      <td>(mot1&nbsp;mot2)</td>
      <td>Sous-expression, permet d'appliquer un opérateur à plusieurs mots</td>
      <td><code>+(join union)</code> : les lignes qui contiennent "join" et "union"</td>
    </tr>
    <tr>
      <td>&gt;mot1&nbsp;&lt;mot2</td>
      <td>Augmente (&gt;) ou diminue (&lt;) la pertinence</td>
      <td><code>+join +(&gt;left &lt;right)</code> : les lignes qui contiennent "join left" ou "join right" ("join left" plus pertinent)</td>
    </tr>
    <tr>
      <td>mot*</td>
      <td>Les lignes qui contiennent un mot qui commence par "mot"</td>
      <td><code>join</code>:  matche 'join', 'joins', 'joining' etc.</td>
    </tr>
  </tbody>
</table>

## XML

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">ExtractValue</th>
    <td>Extrait une valeur d'une chaîne XML <sup>(1)</sup>. <a href="http://sqlfiddle.com/#!9/daaaba/9">SQLFiddle</a></td>
    <td><code>ExtractValue(xml, xpath)</code></td>
    <td><pre lang="sql">SELECT doc_id, ExtractValue(xml_doc, '/catalog/book[1]/author') FROM catalogs</pre></td>
  </tr>
  <tr>
    <th align="left">UpdateXML</th>
    <td>Remplace un fragment XML <sup>(1)</sup>. Ne fait rien si plusieurs nodes matchent.</td>
    <td><code>UpdateXML(xml,&nbsp;xpath,&nbsp;newnode)</code></td>
    <td><pre lang="sql">SELECT xml_doc, UpdateXML(xml_doc, '/catalog/book[1]/author', '<author>Chuck</author>') FROM catalogs WHERE doc_id = 1</pre></td>
  </tr>
</table>

<sup>(1)</sup> [Format XPath](https://dev.mysql.com/doc/refman/5.7/en/xml-functions.html#function_updatexml)

<ins>Extraire des valeurs</ins> :

`ExtractValue` combiné à `REPLACE` peut servir à extraire des valeurs d'une liste séparée par virgule :

``` sql
SELECT ExtractValue(CONCAT('<items><item>',
    REPLACE('a,b,c,d,e,f', ',', '</item><item>'),
    '</item></items>'), '/items/item[5]') as items;
```

``` sql
SELECT
ExtractValue(@items, '/items/item[5]') as item5,
ExtractValue(@items, '/items/item[2]') as item2
FROM
(
  SELECT @items := CONCAT('<items><item>',
      REPLACE('a,b,c,d,e,f', ',', '</item><item>'),
  '</item></items>')
) as list;
```

## IP

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">IS_IPV4</th>
    <td>Vérifie si arg est une adresse IPv4</td>
    <td><code>IS_IPV4(arg)</code></td>
    <td><pre lang="sql">SELECT IS_IPV4('10.0.5.9') # 1</pre></td>
  </tr>
  <tr>
    <th align="left">INET_ATON</th>
    <td>Retourne la représentation numérique d'une adresse IPv4 (NULL si l'adresse n'est pas valide)</td>
    <td><code>INET_ATON(ip)</code></td>
    <td><pre lang="sql">SELECT INET_ATON('10.0.5.9') # 167773449</pre></td>
  </tr>
  <tr>
    <th align="left">INET_NTOA</th>
    <td>Retourne l'adresse IPv4 de la représentation numérique</td>
    <td><code>INET_NTOA(num)</code></td>
    <td><pre lang="sql">SELECT INET_NTOA(INET_ATON('10.0.5.9')) # 10.0.5.9</pre></td>
  </tr>
  <tr>
    <th align="left">IS_IPV4_COMPAT</th>
    <td>Vérifie si la représentation numérique donnée est une adresse IPv4</td>
    <td><code>IS_IPV4_COMPAT(num)</code></td>
    <td><pre lang="sql">SELECT IS_IPV4_COMPAT(INET6_ATON('::10.0.5.9')) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">IS_IPV4_MAPPED</th>
    <td>Vérifie si la représentation numérique donnée est une adresse IPv4 mappée en IPv6</td>
    <td><code>IS_IPV4_MAPPED()</code></td>
    <td><pre lang="sql">SELECT IS_IPV4_MAPPED(INET6_ATON('::ffff:10.0.5.9')) # 1</pre></td>
  </tr>
  <tr>
    <th align="left">IS_IPV6</th>
    <td>Vérifie si arg est une adresse IPv6</td>
    <td><code>IS_IPV6(arg)</code></td>
    <td><pre lang="sql">SELECT IS_IPV6('fdfe::5a55:caff:fefa:9089') # 1</pre></td>
  </tr>
  <tr>
    <th align="left">INET6_ATON</th>
    <td>Retourne la représentation numérique d'une adresse IPv6</td>
    <td><code>INET6_ATON(ip)</code></td>
    <td><pre lang="sql">SELECT INET6_ATON('fdfe::5a55:caff:fefa:9089') # /f4AAAAAAABaVcr//vqQiQ==</pre></td>
  </tr>
  <tr>
    <th align="left">INET6_NTOA</th>
    <td>Retourne l'adresse IPv6 de la représentation numérique</td>
    <td><code>INET6_NTOA(num)</code></td>
    <td><pre lang="sql">SELECT INET6_NTOA(INET6_ATON('fdfe::5a55:caff:fefa:9089')) # fdfe::5a55:caff:fefa:9089</pre></td>
  </tr>
</table>

## Verrous

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">GET_LOCK</th>
    <td>Essaie d'obtenir un verrou nommé. Retourne 1 = ok, 0 = timeout, NULL = erreur (ex kill ou memory overflow)</td>
    <td><code>GET_LOCK(str, timeout)</code></td>
    <td><pre lang="sql">SELECT GET_LOCK('lock1',10)</pre></td>
  </tr>
  <tr>
    <th align="left">RELEASE_LOCK</th>
    <td>Libère le verrou str</td>
    <td><code>RELEASE_LOCK(str)</code></td>
    <td><pre lang="sql">SELECT RELEASE_LOCK('lock1')</pre></td>
  </tr>
  <tr>
    <th align="left">RELEASE_ALL_LOCKS</th>
    <td>Libère tous les verrous. Retourne le nombre de verrous libérés</td>
    <td><code>RELEASE_ALL_LOCKS()</code></td>
    <td><pre lang="sql">SELECT RELEASE_ALL_LOCKS()</pre></td>
  </tr>
  <tr>
    <th align="left">IS_FREE_LOCK</th>
    <td>Vérifie si le verrou str est libre. 1 = libre, 0 = utilisé, NULL = erreur (argument incorrect)</td>
    <td><code>IS_FREE_LOCK(str)</code></td>
    <td><pre lang="sql">SELECT IS_FREE_LOCK('lock1')</pre></td>
  </tr>
  <tr>
    <th align="left">IS_USED_LOCK</th>
    <td>Retourne l'identifiant de la session qui a crée le verrou s'il existe ou NULL</td>
    <td><code>IS_USED_LOCK(str)</code></td>
    <td><pre lang="sql">SELECT GET_LOCK('str',10), IS_USED_LOCK('str'), RELEASE_LOCK('str') # 1 1916 1</pre></td>
  </tr>
</table>

## Divers

<table>
  <tr>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
    <td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td>
  </tr>
  <tr>
    <th align="left">UUID</th>
    <td>Retourne un UUID unique</td>
    <td><code>UUID()</code></td>
    <td><pre lang="sql">SELECT UUID() # d23ea6c0-c173-11e7-b40b-0242ac110004</pre></td>
  </tr>
  <tr>
    <th align="left">UUID_SHORT</th>
    <td>Retourne un UUID court unique</td>
    <td><code>UUID_SHORT()</code></td>
    <td><pre lang="sql">SELECT UUID_SHORT() # 25330388322746370</pre></td>
  </tr>
  <tr>
    <th align="left">RANDOM_BYTES</th>
    <td>Retourne num octets aléatoires (num entre 1 et 1024)</td>
    <td><code>RANDOM_BYTES(num)</code></td>
    <td><pre lang="sql">SELECT RANDOM_BYTES(5) # nu0xeXw=</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">DATABASE</th>
    <td>Retourne le nom de la base de données en cours<br>Synonyme: SCHEMA</td>
    <td><code>DATABASE()</code></td>
    <td><pre lang="sql">SELECT DATABASE() # db_9_0f6a86</pre></td>
  </tr>
  <tr>
    <th align="left">USER</th>
    <td>Retourne le nom de l'utiilisateur + hôte en cours<br>Synonyme: SESSION_USER, SYSTEM_USER</td>
    <td><code>USER</code></td>
    <td><pre lang="sql">SELECT USER() # user_9_0f6a86@10.1.1.14</pre></td>
  </tr>
  <tr>
    <th align="left">CONNECTION_ID</th>
    <td>Retourne l'ID de connection de l'utilisateur</td>
    <td><code>CONNECTION_ID()</code></td>
    <td><pre lang="sql">SELECT CONNECTION_ID() # 259</pre></td>
  </tr>
  <tr>
    <th align="left">VERSION</th>
    <td>Retourne le numéro de version MySQL</td>
    <td><code>VERSION()</code></td>
    <td><pre lang="sql">SELECT VERSION() # 5.6.35</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">BENCHMARK</th>
    <td>Répète une expression num fois. Permet de mesurer le temps d'execution</td>
    <td><code>BENCHMARK(num, expt)</code></td>
    <td><pre lang="sql">SELECT BENCHMARK(1000000,AES_ENCRYPT('Hello World',"mypassphrase")) # 0 (Execution Time: 208ms)</pre></td>
  </tr>
  <tr>
    <th align="left">SLEEP</th>
    <td>Attend pendant num secondes</td>
    <td><code>SLEEP(num)</code></td>
    <td><pre lang="sql">SELECT SLEEP(1000)</pre></td>
  </tr>
  <tr><td colspan="4">&nbsp;</td></tr>
  <tr>
    <th align="left">FOUND_ROWS</th>
    <td>Retourne le nombre de lignes trouvées par le dernier SELECT</td>
    <td><code>FOUND_ROWS()</code></td>
    <td><pre lang="sql">SELECT SQL_CALC_FOUND_ROWS * FROM tbl_name LIMIT 10; SELECT FOUND_ROWS() # 50</pre></td>
  </tr>
  <tr>
    <th align="left">ROW_COUNT</th>
    <td>Retourne le nombre de lignes affectées par le dernier UPDATE ou DELETE. Nécessite le flag CLIENT_FOUND_ROWS (au moment de la connexion)</td>
    <td><code>ROW_COUNT()</code></td>
    <td><pre lang="sql">UPDATE donnees SET valeur = "new" WHERE id < 3; SELECT ROW_COUNT(); # 2</pre></td>
  </tr>
  <tr>
    <th align="left">LAST_INSERT_ID()</th>
    <td>Retourne le dernier ID inséré</td>
    <td><code>LAST_INSERT_ID()</code></td>
    <td><pre lang="sql">INSERT INTO donnees (nom, valeur) VALUES ('col1', 'val1'); SELECT LAST_INSERT_ID(); # 3</pre></td>
  </tr>
</table>

## JSON

https://dev.mysql.com/doc/refman/5.7/en/json-functions.html

## GEOMETRIE

https://dev.mysql.com/doc/refman/5.7/en/spatial-analysis-functions.html

<ins>Exemples</ins> :

* ``` sql
  SELECT Area(ConvexHull(GeomFromText(points))) as area
    FROM (
        SELECT CONCAT('MULTIPOINT(', GROUP_CONCAT(CONCAT(x, " ", y) SEPARATOR ","), ')') as points
        FROM `places`
    ) as tmp;
  ```

  [Codefights Calculer la surface d'un ensemble de points](https://codefights.com/arcade/db/specialties/qeMwFWTCDJeReCeZM)

* ``` sql
  SELECT a.name AS place1, b.name AS place2
  FROM sights AS a, sights AS b
  WHERE a.name < b.name
  AND DISTANCE(POINT(a.x, a.y), POINT(b.x, b.y)) < 5
  ORDER BY place1, place2;
  ```

  [Codefights Places of interests](https://codefights.com/arcade/db/join-us-at-the-table/5KqR57uSz9u27KnzP)

* ``` sql
  SELECT ROUND(SUM(
          DISTANCE(POINT(a.x,a.y), POINT(b.x,b.y))
  ),9) as total
  FROM cities AS a
  INNER JOIN cities AS b ON b.id = (a.id + 1);
  ```

  [Codefights Route length](https://codefights.com/arcade/db/join-us-at-the-table/hYeHdGQAtPEXYxXaf)

* ``` sql
  SELECT id1,
      SUBSTRING_INDEX(GROUP_CONCAT(id2 ORDER BY distance, id2), ',', 1) as id2
  FROM (
      SELECT a.id AS id1, b.id AS id2, ROUND(DISTANCE(POINT(a.x,a.y), POINT(b.x,b.y))) as distance
      FROM positions as a, positions as b
      WHERE a.id != b.id
      ORDER BY id1, distance, id2
  ) as tmp
  GROUP BY id1;
  ```

  [Codefights Closest cells](https://codefights.com/arcade/db/selecting-what-to-select/MPozuFjnvYoFPh6KW)