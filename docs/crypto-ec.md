---
title: Elliptic Curve Cryptography (ECC)
category: Sécurité, Cryptographie
---

## Pourquoi les courbes elliptiques

* Les algorithmes de cryptographie à clé assymétrique se basent sur des opérations mathématiques faciles à traiter dans un sens mais difficile à résoudre dans l'autre sens. Par exemple, dans le cas de RSA, il est facile de multiplier deux nombres premiers (multiplier est une opération facile) mais il est difficile de retrouver les deux nombres premiers utilisés à partir du produit (factoriser est une opération difficile). Ainsi, on peut facilement calculer une clé publique mais on peut difficilement retrouver la clé privée.

  Les algorithmes ayant cette caractéristiques, facile dans un sens mais difficile dans l'autre, sont connus sous le nom de fonctions *trap door*. Plus l'écart est grand entre la difficulté d'aller dans un sens et celle d'aller dans l'autre sens, plus l'algorithme sera sûr.

* Les algorithmes se basant sur la factorisation (comme RSA) sont d'autant plus efficaces que la taille des nombres utilisés est importante. La taille des clés doit augmenter à mesure que les ressources disponibles pour décrypter les nombres augmentent. Pour pallier à ce problème, il faut trouver une meilleure *trap door*. C'est en 1985, que l'utilisation des courbes elliptiques à été proposé.

## Une courbe elliptique, c'est quoi

L'équation d'une courbe elliptique est comme suit:

```
y² = x³ + ax + b
```

La représentation graphique d'une telle courbe est présentée ci-dessous.  
Elle sera plus ou moins alongée selon les paramètres (a, b) utilisés.

![](https://i.imgur.com/jk9Dk7r.png)

Les types de données utilisés doivent avoir certaines caractéristiques:
* l'addition et la multiplication doivent être associatives: `a + (b + c) = (a + b) + c`
* l'addition et la multiplication doivent être commutatives: `a + b = b + a`
* l'addition doit avoir une identité: `a + 0 = a`
* la multiplication doit avoir une identité: `a * 1 = a`
* il doit exister un inverse additif: `a + (-a) = 0`
* il doit exister un inverse multiplicatif: `a * (1/a) = 1`
* la multiplication doit se distribuer sur l'addition: `a * (b + c) = ab + ac`

On peut par exemple utiliser les courbes elliptiques avec des entiers et non des matrices.

En cryptographie, on limite *x*, *y*, *a* et *b* a un champ fini: on ne va donc pas utiliser l'ensemble des entiers (-&infin; ; +&infin;) mais un sous-ensemble (0 ; *p*):

```
y² = x³ + ax + b  mod p
```

---

## Caractéristiques

Une courbe elliptique a des caractéristiques intéressantes:
* la symmétrie horizontale: tout point de la courbe peut être réfléchi sur l'axe des *x* et le résultat sera sur la courbe.
* toute ligne non verticale coupera la courbe en 3 endroits.

En utilisant les points de notre courbe, on peut définir certaines opérations: l'*addition de point* (*point addition* en anglais) et la *multiplication de point* (*point multiplication*).

## Addition de point (⊕)

* Les points sur une courbe sont donnés en fonction de leurs coordonées (x, y). L'addition de points consiste à prendre deux points donnés — (x<sub>1</sub>, y<sub>1</sub>) et (x<sub>2</sub>, y<sub>2</sub>) — et à les relier entre eux: cette ligne coupera la courbe en un 3ème point (x<sub>3</sub>, y<sub>3</sub>), le résultat de l'addition de point est le point réfléchi par l'axe *x* (x<sub>3</sub>', y<sub>3</sub>').

  ![](https://i.imgur.com/7F9EAC5.png)

* Pour additionner un point avec lui-même, on prend la tangente du point.

  ![](https://i.imgur.com/p4AoCgn.png)

* Dans le cas où il n'y a pas de 3ème point (ligne verticale), le résultat est l'infini (𝓞).

  <pre>
  P + 𝓞 = 𝓞 + P = P  
  P + (−P) = 𝓞
  </pre>

  ![](https://i.imgur.com/bocHEe3.png)

### Exemple

Soit la courbe elliptique `E: y² = x³ + 5x + 7` et les points `P: (2,5)` et `Q: (3,7)`

* On calcule la ligne qui relie P et Q:

  <pre lang="python">
  y = ax + b

  # Calcul de a:
  a = (y<sub>2</sub> - y<sub>1</sub>) / (x<sub>2</sub> - x<sub>1</sub>)
    = (7-5) / (3-2)
    = 2

  # Calcul de b — avec P(2,5):
  5 = 2*2 + b
  1 = b

  # Résultat:
  y = 2x + 1
  </pre>

* On résout x

  <pre lang="python">
  (2x + 1)²    = x³ + 5x + 7
  4x² + 4x + 1 = x³ + 5x + 7
             0 = x³ -4x² + x + 6
               = (x - 3)(x - 2)(x + 1)

  • x = 3
    y = 2*3 + 1 = 7

  • x = 2
    y = 2*2 + 1 = 5

  • x = -1
    y = -2 + 1 = -1
  </pre>

  La droite coupe la courbe elliptique en 3 points:
  (x,y) = (3,7), (2,5), (-1,-1)

  On connait déjà (3,7) et (2,5), le point d'intersection qu'on cherchait est donc (-1,-1).  

* On prend la réflection du point trouvé par l'axe x et on obtient P + Q = (-1,1)

### Formule

Plutôt que de calculer la ligne / les points d'intersection / la réflection du point, on peut utiliser une formule:

* Si P<sub>1</sub> = P<sub>2</sub>,

  * Si *y<sub>1</sub> = 0* alors P<sub>1</sub> + P<sub>2</sub> = 𝓞
  * Si *y<sub>1</sub> ≠ 0* alors

    <pre lang="python">
    λ = (3x² + a) / 2y

    x<sub>3</sub> = λ² - x<sub>1</sub> - x<sub>2</sub>
    y<sub>3</sub> = λ * (x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub>
    </pre>

* Si P<sub>1</sub> ≠ P<sub>2</sub>, 

  * Si *x<sub>1</sub> = x<sub>2</sub>* alors P<sub>1</sub> + P<sub>2</sub> = 𝓞
  * Si *x<sub>1</sub> ≠ x<sub>2</sub>* alors 

    <pre lang="python">
    λ = (y<sub>2</sub> - y<sub>1</sub>) / (x<sub>2</sub> - x<sub>1</sub>)

    x<sub>3</sub> = λ² - x<sub>1</sub> - x<sub>2</sub>
    y<sub>3</sub> = λ * (x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub>
    </pre>

Soit la courbe elliptique `E: y² = x³ + 5x + 7` et les points `P: (2,5)` et `Q: (3,7)`:

<pre lang="python">
λ = (7-5) / (3-2) = 2

x<sub>3</sub> = 2² - 2 - 3 = -1
y<sub>3</sub> = 2 * (2 - (-1)) - 5 = 1

P + Q = (-1, 1)
</pre>

## Multiplication de point

* La multiplication de point consiste à prendre un point et à répéter les opérations d'addition:

      0g = 𝓞
      1g = g
      2g = g ⊕ g
      3g = g ⊕ g ⊕ g (ou 2g ⊕ g)
      ...


* En continuant à additioner le point *g* à lui-même, arrive un moment où *ng* = 𝓞. *n* est ce qu'on appelle l'*ordre* de *g*.

  Il est possible que *g* n'ai pas d'ordre (avec une courbe et un point qui font qu'on finit par visiter tous les points possibles de la courbe) mais ce n'est généralement pas le cas.

* Si on cherche à multiplier *g* par une valeur *m* très grande (mais inférieure à l'ordre de *g*), on peut calculer *mg* en *log m* étapes —  et donc réduire drastiquement le temps de calcul nécessaire — avec la méthode *double-and-add*:

  <pre>
  m = m<sub>0</sub> + m<sub>1</sub>⋅2 + m<sub>2</sub>⋅2² + ... + m<sub>r</sub>⋅2<sup>r</sup>
    où m<sub>0</sub> .. m<sub>r</sub> &in; {0,1}, r = log<sub>2</sub>m

  mg = m<sub>0</sub>⋅g + m<sub>1</sub>⋅2g + m<sub>2</sub>⋅2²g + ... + m<sub>r</sub>⋅2<sup>r</sup>g
  </pre>

  En JavaScript, on pourrait l'implémenter comme ça:

  ``` js
  function point_multiply(P, d){
     if(d == 0) {
        return 0;

     } else if(d == 1) {
         return P;

     } else if(d % 2 == 1) {
        return point_add(P, point_multiply(P, d - 1));

     } else {
        return point_multiply(point_double(P), d/2);
      }
  }
  point_multiply(P, 100);
  ```

  Cela prend approximativement *log<sub>2</sub>(m)* doubles et *1/2log<sub>2</sub>(m)* additions pour calculer *mg*. On peut donc calculer la multiplication très rapidement, beaucoup plus rapidement que si on cherchait à additionner *g* *m* fois.

  ![](https://i.imgur.com/RfsqnaA.png)

  <ins>Exemple</ins>:

  ```
  100P = 2(2[P + 2(2[2(P + 2P)])])
  ```

  = 6 opérations 2P + 2 opérations P+Q

## Intérêt pour la cryptographie

* Il est facile de multiplier le point, mais si quelqu'un voit la position du point obtenu, même en connaissant la position du point d'origine, il ne peut pas deviner de combien il a été multiplié.

  * Il peut essayer d'additionner *g* encore et encore jusqu'à tomber sur la valeur *mg* obtenue (approche brute force). Si *m* est un grand nombre, cette approche sera extrêmement lente.

  * Il peut essayer d'inverser la multiplication, c'est à dire trouver un entier *x* tel que *XB = P*, soit *x = log<sub>B</sub>P*. Il s'agit d'un problème de logarithme discret, lequel est considéré comme infaisable — aucun algorithme en log<sub>n</sub> n'est connu pour le problème du logarithme discret de la courbe elliptique.

* En bref, la multiplication de point est une excellente *trap door*.  
  À l'heure actuelle, les seuls algorithmes ECC qu'OpenSSL supporte sont ECDH (Elliptic Curve Diffie Hellman) pour la négociation des clés et ECDSA (Elliptic Curve Digital Signature Algorithm) pour la signature/vérification.
  
  Dans les algorithmes ECDH et ECDSA, le point *mg* serait la clé publique et *m* serait la clé privée. La clé privée et la clé publique ne sont pas interchangeables (contrairement à RSA): la clé privée est un entier tandis que la clé publique est un point sur la courbe.

---

## Elliptic Curve Diffie Hellman (ECDH)

Diffie Hellman permet de négocier une clé partagée.  
Diffie Hellman utilise en général [des clés RSA](https://a-mt.github.io/dev-roadmap/ssl.html#n%C3%A9gociation-de-la-cl%C3%A9-partag%C3%A9e) en se basant sur le fait que pour les clés RSA `Message = Clé_privée(Clé_publique(Message))`. ECDH se base sur une courbe elliptique comme suit:

1. Alice et Bob se mettent d'accord sur une courbe elliptique *E mod p*, où *p* est un nombre premier.

2. Ils se mettent d'accord, publiquement, sur un point G sur la courbe.

3. Alice génère un nombre aléatoire *a*, calcule *aG*, et envoie le résultat à Bob.  
   Un tiers connaissant *G* n'est pas capable de déduire *a* puisqu'il s'agit d'une multiplication de point sur une courbe elliptique.

4. Bob génère un nombre aléatoire *b*, calcule *bG*, et envoie le résultat à Bob.  
   Un tiers ne peut pas déduire *b*, pas plus qu'il ne peut déduire *a*.

5. Alice calcule *a * bG* et Bob calcule *b * aG*.  
   Ils ont désormais un secret partagé, qui sera utilisé pour crypter/décrypter les futures communications.

## Elliptic Curve Digital Signature Algorithm (ECDSA)

On suppose ici que les paramètres de ECDSA sont connus par tous: la courbe utilisée (E mod p), le point générateur (G) et l'ordre de ce dernier (n). Bitcoin utilise la courbe `secp256k1` (Standards for Efficient Cryptography, *p* sur 256bits) — qui a environ 2<sup>256</sup> (10<sup>77</sup>) clés possibles:

   | Paramètre      | Valeur
   |---             |---
   | Équation (E)   | y<sup>2</sup> = x<sup>3</sup> + 7
   | Max (p)        | 2<sup>256</sup> - 2<sup>32</sup> - 977
   | Générateur (G) | (79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798, 483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)
   | Ordre (n)      | FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

### Signer

Bob dispose de la paire de clé *priv* (*m*) et *Pub* (*mG*) et veut signer un message pour prouver que lui seul peut avoir émis ce message — qu'il possède bien la clé privée.

1. Il calcule le *digest* du message. Par exemple en utilisant l'algorithme SHA-1:

   ```
   digest = sha1(message)
   ```

2. Il choisit aléatoirement un nombre *k*, inférieur à l'ordre de G, et multiplie G avec ce nombre.

   ```
   R = (x, y) = k G
   ```

   Notons qu'il s'agit du même processus que la génération de clé privée/publique. Raison pour laquelle les valeurs (k, R) sont appelées dans certains documents des clés éphèmères ou temporaires.

3. Il récupère la coordonnée x du point trouvé, modulo n — pour s'assurer que la valeur est toujours inférieure à l'ordre de G.

   ```
   r = x mod n
   ```

   Si r vaut 0, un nouveau nombre aléatoire (*k*) doit être choisit.

4. Il calcule *s* comme suit:

   <pre>
   s = ((digest + r ⋅ priv) / k) mod n
   </pre>

   Si s vaut 0, un nouveau nombre aléatoire (*k*) doit être choisit.

5. Sinon, alors il signe avec la paire *(r, s)*.  
   *(r, -s mod n)* est également une signature valide.

   ```
   signature = (r, s)
   ```

### Vérifier la signature

Alice a reçu le message de Bob, sa signature *(r, s)*, et elle connaît sa clé publique *Pub*. Elle veut vérifier que l'émetteur du message possède bien la clé privée *priv*.

1. Elle vérifie que les valeurs *r* et *s* sont plausibles, elles sont inférieures à l'ordre de G.

   ```
   0 < r < n
   0 < s < n
   ```

2. Elle génère le *digest* du message

   ```
   digest = sha1(message)
   ```

3. Elle calcule R:

   <pre>
   w  = 1/s mod n
   u<sub>1</sub> = (digest ⋅ w) mod n
   u<sub>2</sub> = (r ⋅ w) mod n

   R  = (x, y) = u<sub>1</sub> G + u<sub>2</sub> Pub
   </pre>

6. Elle vérifie que le *r* de la signature vaut bien la coordonnée *x* qu'elle a trouvé:

   ```
   r == x mod n
   ```

<ins>Démonstration</ins>:

<pre>
R = (u<sub>1</sub> G) + (u<sub>2</sub> Pub)
  = (digest s<sup>-1</sup> G) + (r s<sup>-1</sup> Pub)
  = (digest s<sup>-1</sup> G) + (r s<sup>-1</sup> priv G)
  = (digest + r priv) s<sup>-1</sup> G
  = (digest + r priv) ((digest + r priv)/k)<sup>-1</sup> G
  = (digest + r priv) (digest + r priv)<sup>-1</sup> (1/k)<sup>-1</sup> G
  = k G
</pre>

Seule une personne possédant la clé privée associée à la clé publique aurait pu générer le couple *(r, s)*.

### Récupérer la clé publique à partir de la signature

Il est possible de récupérer la clé publique à partir de la signature:

1. Calculer un point *R = (x, y)* où *x* vaut *r* (ou *r + n*, *r + 2n*, etc) et *y* une valeur telle que *(x, y)* est sur la courbe.

   ```
   R = (r, y)
   ```

2. Générer le *digest* du message

   ```
   digest = sha1(message)
   ```

3. Calculer la clé publique:

   <pre>
   u<sub>1</sub> = (-digest / r) mod n
   u<sub>2</sub> = (s / r) mod n

   Pub = u<sub>1</sub> G + u<sub>2</sub> R
   </pre>

### Générateur de nombres aléatoires

* Il est important de ne pas divulguer la valeur de *k* utilisée lors de la signature ECDSA, et d'utiliser différents *k* pour différentes signatures, sinon la valeur de la clé privée peut être calculée.

  Si on a deux signatures employant le même *k* — *(r, s)* et *(r, s2)* — alors on peut calculer la clé privée comme suit:

  ``` python
  # Calculer les digests
  digest  = sha1(message)
  digest2 = sha1(message2)

  # Calculer la valeur de k
  # s - s2 = (digest - digest2) / k
  k = (digest - digest2) / (s - s2)

  # Calculer la valeur de la clé privée
  # s = (digest + r priv) / k
  priv   = (sk - digest) / r
  ```

* En décembre 2010, cette faille de sécurité a été exploité pour extraire la clé privée ECDSA utilisée par la console de jeu PlayStation 3 pour signer les logiciels. Cette attaque n'était possible que parce que la valeur de *k* utilisée par Sony était statique et non aléatoire.

* La signature ECDSA peut faire fuiter des clés privées lorsque *k* est généré par un générateur de nombres aléatoires défectueux. C'est ce qui s'est passé en août 2013, certaines implémentations de la classe java SecureRandom (utilisée par les applications Android, notamment Android Bitcoin Wallet) ont permis le même exploit que la PS3.

  Il est possible d'éviter ce problème en générant *k* de manière déterministe, comme décrit dans le [RFC 6979](https://tools.ietf.org/html/rfc6979).

---

## Sources

* [cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)  
* [openssl](https://wiki.openssl.org/index.php/Elliptic_Curve_Cryptography)  
* [wikipedia EC Point Multiplication](https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication)  
* [wikipedia ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)
* [johannes-bauer.com](https://www.johannes-bauer.com/compsci/ecc/)
* [paxos.com](https://eng.paxos.com/blockchain-101-elliptic-curve-cryptography)
* [wizardforcel.gitbooks.io](https://wizardforcel.gitbooks.io/practical-cryptography-for-developers-book/digital-signatures/ecdsa-sign-verify-messages.html)

Pour aller plus loin:  
[Weak Curves in ECC](http://web.archive.org/web/20120713221339/http://modular.math.washington.edu/edu/2010/414/projects/novotney.pdf)  
[Review of Cryptanalysis of ECC](https://vdocuments.mx/reader/full/review-of-cryptanalysis-of-elliptic-curve-review-of-cryptanalysis-of-elliptic)  
[Dual_EC_DRBG](https://en.wikipedia.org/wiki/Dual_EC_DRBG)
