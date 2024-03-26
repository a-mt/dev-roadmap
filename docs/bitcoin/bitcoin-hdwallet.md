---
title: Portefeuille déterministe
category: Other, Bitcoin
---

## Portefeuille hors-ligne

Pour accroître la sécurité, les clés privées peuvent être générées et stockées par un portefeuille hors-ligne ou dans un environnement sécurisé, et utilisé conjointement avec un autre portefeuille qui lui interagit avec le réseau Bitcoin mais ne connaît que les clés publiques:

1. Le portefeuille A génère les clés privées et publiques.

2. Les clés publiques sont copiées vers un portefeuille B, qui lui interagit avec le réseau.

3. Lorsqu'on veut dépenser des bitcoins, le portefeuille B génère une transaction non signée.

4. La transaction non-signée est copiée vers le portefeuille A, qui la signe avec la clé privée appropiée.

5. La transaction signée est copiée vers le portefeuille B, qui s'occupe de distribuer la transaction sur le réseau.

![](https://gistcdn.githack.com/a-mt/7fcd040cb1fd93256d522cc14844cc78/raw/9e49c8c6780a20741ca54c0fdfda6e96e92fafb2/en-wallets-signing-only.svg)

## Portefeuille matériel

Un portefeuille matériel est un appareil qui  stocke un portefeuille hors-ligne et permet d'effectuer le transfert portefeuille hors-ligne / en-ligne de manière plus rapide: plutôt que de copier sur une clé USB pour effectuer le transfert entre deux ordinateurs (un hors-ligne, un en-ligne), on utilise un appareil qui fait en quelque sorte à la fois clé USB et ordinateur hors-ligne.

![](https://i.imgur.com/mDeZQVG.png)

## Cold Wallet

Les utilisateurs séparent généralement leur solde en deux types de portefeuille:

* <ins>Portefeuille à froid</ins> (*cold wallet* en anglais):  
  Agit comme un compte épargne. Il est utilisé pour stocker la majorité du solde mais est rarement utilisé, il n'est connecté à Internet que lorsqu'une transaction doit être effectuée.  
  Exemple: Trezor, Ledger

* <ins>Portefeuille à chaud</ins> (*hot wallet* en anglais):  
  Agit comme un compte chèque. Il est utilisé pour les dépenses quotidiennes et pour recevoir de l'argent. Il est activement connecté à Internet afin d'être facilement utilisable mais est plus susceptible d'être piraté.  
  Exemple: Binance

---

## Portefeuille déterministe

* Les premiers clients Bitcoin avaient typiquement 100 adresses d'avance (à être utilisées comme adresse de change), et qui étaient régulièrement mises à jour — puisque, lorsque la transaction d'une adresse donnée est dépensée, on n'a plus besoin de s'en souvenir, on peut la supprimer et la remplacer par une autre.

  La conséquence avec ce type de client, c'est que les backups du portefeuille deviennent rapidement invalides: si pour une raison *x* ou *y*, vous perdez votre portefeuille et que vous utilisez votre backup, si de nouvelles adresses ont été générées entre temps, alors une partie des adresses ne seront plus bonnes et vous aurez perdu une partie de votre solde.

  Pour éviter ça, ont peut synchroniser le backup avec le portefeuille (créer une nouvelle sauvegarde à chaque modification du portefeuillle), mais ça signifie que le backup ne peut pas être hors ligne, et c'est un problème — on multiplie les risques qu'une personne non légitime y ait accès.

* Avec un *portefeuille déterministe* (*deterministic wallet*) les adresses sont générées de manière connue et non plus aléatoirement: les utilisateurs peuvent donc créer un unique backup de leur portefeuille sans risque qu'il ne devienne périmé.

  L'implémentation la plus simple d'un portefeuille déterministe consiste à utiliser une *chaîne d'amorçage* (*seed* en anglais) et de la concaténer à un caractère ASCII incrémenté au fur et à mesure que des clés supplémentaires sont nécessaires. En cas de perte, on peut très facilement regénérer le jeu entier des clés privées, publiques et adresses associés.

  ```
  c = chr(1)
  privkey = sha512(seed . c)
  Pubkey  = privkey * G
  ```

> La sécurité supplémentaire des clés pré-générées est assez faible face aux dommages dus à l'insuffisance des sauvegardes et la pression accrue de garder un seul portefefeuille en ligne est énorme. [Bitcointalk](https://bitcointalk.org/index.php?topic=19137.msg239768)

## Seed phrase (BIP39)

* Avant de l'afficher à l'utilisateur, la chaîne d'amorçage (128 bits) est généralement sérialisée en phrase d'amorçage (*seed phrase* en anglais) — 12 mots.

  <ins>Exemple</ins>:

  ```
  witch collapse practice feed shame open despair creek road again ice least
  ```

  Pour ce faire, le logiciel possède une liste de mots tirés d'un dictionnaire et chaque mot est associé à un nombre, il peut ainsi passer d'une chaîne d'amorçage (suite de nombres, généralement affiché en hexadécimal) à une phrase d'amorçage (suite de mots) et inversemment. Exemple: [electrum](https://github.com/spesmilo/electrum/blob/master/electrum/old_mnemonic.py#L1669).

  L'avantage, c'est que comme la phrase est écrite en language naturel, on peut facilement trouver les typos et les rectifier — tandis qu'avec la chaîne d'amorçage, un copier-coller foireux est difficile à identifier.

* La chaîne ou phrase d'amorçage (*seed* ou *seed phrase*) doit être sauvegardée et gardée privée, car elle permet de récupérer toutes les clés privées / publiques et donc de dépenser les bitcoins des adresses associées.

Pour aller plus loin:  
[Mnemonic Code Converter](https://iancoleman.io/bip39/)  
[Mnemonic Code Words](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch04.html#mnemonic_code_words)  
[BIP39](https://github.com/btcdrak/bips/blob/master/bip-0039.mediawiki)

## Portefeuille déterministe hiérarchique (BIP32)

### La séparation privé/publique

* Avec un portefeuille déterministe classique, les clés privées sont calculées à partir de la chaîne d'amorçage, les clés publiques des clés privées, et les adresses des clés publiques. Pour créer de nouvelles adresses, on a donc besoin de la chaîne d'amorçage, et en ayant la chaîne d'amorçage, on a accès à toutes les clés du portefeuille: c'est du tout ou rien.

* Un portefeuille déterministe hiérarchique (*hierarchical deterministic wallet* ou *HD wallet*) permet quant à lui de générer de nouvelles adresses sans connaître la chaîne d'amorçage.

  Puisque la clé publique est générée à partir de la clé privée (avec une multiplication de points sur une courbe elliptique, qui est une opération non inversible):

  ```
  Pubkey = privkey * G
  ```

  On peut générer de nouvelles clés en utilisant la relation mathématique suivante:

  ```
  privkey2 = privkey + token

  Pubkey2  = (privkey + token) * G
           = Pubkey + token * G
  ```

  On peut donc générer de nouvelles adresses d'un côté et dépenser les transactions reçues de l'autres, sans avoir à communiquer les clés privées, pourvu que les deux côtés se mettent d'accord sur les *token* utilisés.

* Ce mécanisme présente un intérêt par exemple pour les boutiques qui souhaitent permettre à leurs clients de payer en bitcoins: le serveur peut générer de nouvelles clés publiques / adresses (pour recevoir des transactions) sans avoir à stocker la chaîne d'amorçage. Une personne qui arriverait à pirater le serveur ne pourrait pas voler  d'argent puisqu'il ne connaît pas les clés privées.

### La hiérarchie

* Chaque clé enfant peut à son tour être considérée comme une clé parent, utilisée pour générer d'autres clés (p1 = p + c1; p2 = p1 + c2; etc).

  Ça peut être utile pour compartimenter différentes activités: une entreprise peut créer des paires de clés enfant pour chaque département de l'entreprise. Le département peut à son tour créer des sous-clés enfant pour différentes divisions, puis pour différentes équipes, et ainsi de suite, en suivant la hiérarchie de l'entreprise. Pendant ce temps, la tête de l'entreprise, qui connaît la clé privée principale, conserve la capacité de déplacer les fonds d'un endroit à l'autre.

* Pour éviter que les clés générées ne se basent exclusivement sur une clé, l'algorithme de création des clés ajoute dans l'équation un code (*chain code*), qui doit être utilisé en association avec la clé pour générer des clés enfant. Si on a une clé mais pas le code, alors on ne peut pas calculer les enfants, ce qui évite qu'une clé privée comprise ne compromette toute l'arborescence — pourvu que le code ne soit pas lui aussi compromis.

  L'association clé + code forme ce qu'on appelle une *clé étendue* (*extended key* en anglais).

* La clé au sommet de la hiérarchie est la *clé principale* (*master key* en anglais) — il y en a deux, la clé privée principale et la clé publique principale.  
  Une clé principale est équivalente aux autres, ce qui la distingue c'est le fait qu'elle n'ait pas de clé parente: en association avec le code, elle peut être utilisée pour calculer toutes les autres clés.

### Génération de la clé principale

1. Comme la clé principale n'a pas de clé parente, là où les clés enfants utiliseront une clé et un code, on utilise la chaîne d'amorçage et une chaîne de caractère arbitraire ("Bitcoin seed"), que l'on donne à une fonction de hashage HMAC-SHA512.

   ``` js
   var hasher = new jsSHA(seed, 'HEX'),
       hash   = hasher.getHMAC("Bitcoin seed", "TEXT", "SHA-512", "HEX");
   ```

2. <ins>Clé privée + code</ins>:  
   La fonction HMAC retourne une valeur de 64 octets (512 bits), que l'on sépare en deux 32 octets:

   * la première moitié est la clé privée, qui est un nombre aléatoire comme toute autre clé privée.
   * le deuxième moitié est le code, qui est un nombre aléatoire supplémentaire.

   ``` js
   var prv        = Crypto.util.hexToBytes(hash.slice(0, 64)),
       chain_code = Crypto.util.hexToBytes(hash.slice(64, 128));
   ```

3. <ins>Clé privée étendue</ins>:  
   Une clé privée étendue est en quelque sorte un conteneur qui permet de stocker la clé privée et le code, ainsi qu'un certain nombre d'information supplémentaires. En ayant la clé privée mais pas le code, on ne peut pas calculer les clés enfants, c'est la clé privée étendue qui nous servira.

    ``` js
    var xprv = build_extended_key({
      version            : 0x0488ADE4, // mainnet (base58: xprv)
      depth              : 0x00,
      parent_fingerprint : 0x00000000,
      child_index        : 0x00000000,
      chain_code         : chain_code,
      key                : prv
    });
    ```

    Les clés étendues privée et publique sont sérialisées comme suit:

    ``` js
    function build_extended_key({
      version,
      depth,
      parent_fingerprint,
      child_index,
      chain_code,
      key
    }) {
      var serial = '';
      serial += tobytes(version, 4);
      serial += tobytes(depth, 1);
      serial += tobytes(parent_fingerprint, 4);
      serial += tobytes(child_index, 4);
      serial += tobytes(chain_code, 32);
      serial += tobytes(key, 33);
      return base58check(serial);
    }
    ```

   Le résultat est la liste des informations (suivit d'une checksum) encodé en base58.  
   On peut facilement désérialiser la clé étendue pour récupérer les infos individuellement.

  ![](https://i.imgur.com/avd67nh.png)

4. <ins>Clé publique</ins>:  
   On calcule la clé publique à partir de la clé privée, comme on le ferait d'habitude.  
   BIP32 utilise la clé version compressée (coordonnée x + 1 bit de parité) — 33 octets au lieu de 64.

    ``` js
    var eckey   = new Bitcoin.ECKey(prv),
        obj_pub = eckey.getPubPoint();

    obj_pub.setCompressed(true);
    var pub = obj_pub.getEncoded(true);
    ```

5. <ins>Clé publique étendue</ins>:  
   Même principe que pour la clé privée mais avec la clé publique.

    ``` js
    var xpub = build_extended_key({
      version            : 0x0488B21E, // mainnet (base58: xpub)
      depth              : 0x00,
      parent_fingerprint : 0x00000000,
      child_index        : 0x00000000,
      chain_code         : chain_code,
      key                : pub
    });
   ```

### Génération d'une clé enfant, à partir de xpriv

Chaque enfant a un numéro d'index sur 4 octets, ce qui permet de générer 2<sup>32</sup> enfants à partir d'une clé étendue.

1. On additionne la clé publique et l'index de l'enfant, et on donne le résultat à une fonction de hashage HMAC-SHA512 avec le code. Pour rappel, la clé privée et le code sont stockés dans la clé privée étendue et on peut calculer la clé publique à partir de la clé privée.

   ``` js
   var child_index = 0,
       data        = pub.concat(tobytes(child_index, 4));

   var hasher = new jsSHA(Crypto.util.bytesToHex(data), 'HEX'),
       hash   = hasher.getHMAC(Crypto.util.bytesToHex(chain_code), "TEXT", "SHA-512", "HEX");
   ```

2. <ins>Clé privée + code</ins>:  
   Le résultat est séparé en deux:

   * la première moitié est interprétée comme un nombre de 256 bits, qui est ajouté à la clé privée d'origine pour créer une clé privée enfant. Il s'agit essentiellement de prendre la clé privée et de l'augmenter d'un nombre aléatoire de 32 octets.

     ```
     child_privkey = privkey + token
     ```

      On prend le résultat modulo *n* (l'ordre de la courbe elliptique) pour maintenir la clé dans la plage de nombres valides pour la courbe.

   * la deuxième moitié est le nouveau code, qui sera utilisé pour créer des sous-enfants.

    ``` js
    var child_prv = new BigInteger(hash.slice(0, 64), 16)
    child_prv = child_prv.add(prv);
    child_prv = child_prv.mod(getSECCurveByName("secp256k1").getN());

    var child_chain_code = Crypto.util.hexToBytes(hash.slice(64, 128));
    ```

3. <ins>Clé privée étendue</ins>:  
   Les 4 premiers octets du Hash160 (RIPEMD160-SHA256) de la clé publique constituent l'empreinte (*fingerprint* en anglais) de la clé parente. Ça permet au logiciel de détecter rapidement l'aborescence des clés.

   ``` js
   var pub_hash        = Bitcoin.Util.sha256ripe160(pub),
       pub_fingerprint = pub_hash.slice(0,4);

    var child_xprv = build_extended_key({
      version            : 0x0488ADE4, // mainnet (base58: xprv)
      depth              : 1,          // xprv.depth + 1
      parent_fingerprint : pub_fingerprint,
      child_index        : child_index,
      chain_code         : child_chain_code,
      key                : child_prv
    });
   ```

4. <ins>Clé publique</ins>:  
   Comme pour la clé principale, la clé publique est calculée à partir de la clé privée.

    ``` js
    var eckey   = new Bitcoin.ECKey(prv),
        obj_pub = eckey.getPubPoint();

    obj_pub.setCompressed(true);
    var child_pub = obj_pub.getEncoded(true);
    ```

5. <ins>Clé publique étendue</ins>:  
   Même principe que pour la clé privée mais avec la clé publique.

    ``` js
    var child_xpub = build_extended_key({
      version            : 0x0488B21E, // mainnet (base58: xpub)
      depth              : 1,          // xprv.depth + 1
      parent_fingerprint : pub_fingerprint,
      child_index        : child_index,
      chain_code         : child_chain_code,
      key                : child_pub
    });
   ```

### Génération d'une clé enfant, à partir de xpub

La clé publique étendue permet de calculer les clés publiques enfant — les mêmes que celles générées à partir de la clé privée étendue. Elle ne peut pas calculer les clés privées enfant.

1. Comme pour la clé privée étendue, on additionne la clé publique et l'index de l'enfant, et on donne le résultat à une fonction de hashage HMAC-SHA512 avec le code.

2. <ins>Clé publique</ins>:  
   On sépare le résultat en deux:

   * la première moitié est interprétée comme un nombre de 256 bits, multiplié par le générateur de la courbe elliptique, et on l'ajoute à la clé publique pour créer une clé publique enfant.

     ```
     child_Pubkey = Pubkey + token * G
     ```

   * la deuxième moitié est le nouveau code

   ``` js
   var child_pub = new BigInteger(hash.slice(0, 64), 16);
   child_pub = getSECCurveByName("secp256k1").getG().multiply(child_pub);
   child_pub = child_pub.add(pub);

   var child_chain_code = Crypto.util.hexToBytes(hash.slice(64, 128));
   ```

3. <ins>Clé publique étendue</ins>:  
   Même chose qu'avec la clé privée étendue.

Pour rappel, ça marche puisqu'on peut utiliser la relation mathématique suivante:

  ```
  privkey2 = privkey + token
  Pubkey2  = Pubkey + token * G
  ```

![](https://i.imgur.com/J2LO7Xa.png)

### Clé renforcée

* L'accès à une clé publique étendue ne donne pas accès aux clés privées enfants, uniquement aux clés publiques. Mais comme la clé publique étendue contient le code utilisé pour générer les enfants, si une clé privée enfant est connue ou fuite, alors on peut calculer toutes les autres clés privées. Pire, la clé privée enfant et le code peuvent être utilisés pour calculer la clé privée parente, toute l'arborence se retrouve alors compromise.

  ```
  (hash(pubkey + index, code_chain)[0..32] + ?) mod n = child_prv

  child_prv - hash(pubkey + index, code_chain)[0..32] = ?
  ```

  ![](https://gistcdn.githack.com/a-mt/c59a9f87e627e3a968369208d9396bee/raw/12d92cfe99ab10c9cf6adfa0e6134aee30070010/en-hd-cross-generational-key-compromise.svg)

* Pour éviter ça
  1. Les clés étendues doivent être mieux sécurisées que les clés standard
  2. Les utilisateurs doivent éviter d'exporter les clés privées vers des environnements peu fiables, partant du principe qu'ils ne pourront dépenser que l'argent de la clé publique associée
  3. La 3ème possibilité, mais qui a des inconvénients, est d'utiliser une *clé renforcée* (*hardened key* en anglais).

* Pour calculer une clé renforcée, plutôt qu'utiliser la clé publique + index, on utlise la clé privée + index.  
  L'avantage, c'est qu'il n'est plus possible de calculer la clé privée parente à partir de la clé privée renforcée.

  ```
  (hash(? + index, code_chain)[0..32] + ?) mod n = h_child_prv
  ```

* L'inconvénient, c'est qu'on ne peut pas générer une clé publique renforcée à partir d'une clé publique étendue.  
  Il est recommendé de toujours utiliser des clés renforcées, à moins d'avoir une bonne raison pour vouloir générer des clés publiques sans accès à la clé privée — donc soit la séparation privé/publique mais pas de hiérarchie (avec des clés normales), soit la hiérarchie mais pas de séparation privé/publique (avec des clés renforcées).

* Le numéro d'index d'une clé est un entier de 32 bits. Pour facilement distinguer les clés normales des clés renforcées, la plage d'index est divisée en deux:

  * les index entre 0 et 2<sup>31</sup>-1 (0x7FFFFFFF) sont utilisés pour les clés normales
  * les index entre 2<sup>31</sup> (0x80000000) et 2<sup>32</sup>-1 (0xFFFFFFFF) sont utilisés pour les clés renforcées

  ``` js
  var child_index = 0 + 0x80000000,
      data        = prv.concat(tobytes(child_index, 4));
  ```

* Pour faciliter la lecture, le numéro d'index des clés renforcées sont généralement affichés soit suivit d'une apostrophe soit suivit d'un H:

  ```
  i = iH = 0x80000000+i
  ```

  donc

  ```
  0' = 0H = 0x80000000
  ```

### Chemin de dérivation

Par convention, les clés d'un portefeuille sont identifiées par un *chemin de dérivation* (*derivation path*), qui est la liste des index utilisés pour générer la clé, séparés par une barre oblique (/).

Les clés publiques, dérivées de la clé publique principale, commencent par "M".  
Les clés privées, dérivées de la clé privée principale, commencent par "m".

<table>
<thead>
<tr>
  <th>Type de clé</th>
  <th>Chemin</th>
  <th>Clé dérivée de</th>
</tr>
</thead>
<tbody>
<tr>
  <td>Privée</td>
  <td><pre>m/1/2/3</pre></td>
  <td><pre>CKDpriv(CKDpriv(CKDpriv(m,1),2),3)</pre></td>
</tr>
<tr>
  <td>Publique</td>
  <td><pre>M/1/2/3</pre></td>
  <td><pre>CKDpub(CKDpub(CKDpub(M,1),2),3)</pre></td>
</tr>
<tr>
  <td>Privée</td>
  <td><pre>m/3H/2/5</pre></td>
  <td><pre>CKDpriv(CKDpriv(CKDpriv(m,3H),2),5) </pre></td>
</tr>
<tr>
  <td>Publique</td>
  <td><pre>N(m/3H/2/5)</pre></td>
  <td><pre>CKDpub(CKDpub(CKDpub(m,3H),2),5) </pre></td>
</tr>
</tbody>
</table>

Sources:    
[Extended Keys](https://learnmeabitcoin.com/guide/extended-keys)  
[brainwallet.js](https://github.com/sarchar/brainwallet.github.com/blob/bip32/js/brainwallet.js) + [bip32.js](https://github.com/sarchar/brainwallet.github.com/blob/bip32/js/bip32.js)

[Keys, Addresses, Wallets](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch04.html)  
[Hierarchical deterministic Bitcoin wallets that tolerate key leakage](https://eprint.iacr.org/2014/998.pdf)

Pour aller plus loin:  
[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

## Hiérarchie normalisée

* Différents clients ont implémenté des fonctionnalités se basant sur la hiérarchie des clés, comme la séparation des clés mainnet et testnet, ou le multi-utilisateur. Le problème c'est que les différents clients ont implémentés les mêmes fonctionalités mais avec des hiérarchies différentes.

  Chaque clé peut avoir 4 milliards de clés enfants (2 milliards normales, 2 milliards renforcées) et chacune de ces clés enfants peuvent elles-mêmes avoir des enfants. Avec toutes ces possibilités, il devient particulièrement difficile de détecter la hiérarchie utilisée et pouvoir transférer un portefeuille d'un client à un autre.

* La BIP44 (pour Bitcoin Improvement Proposal #44) spécifie une structure en 5 niveaux:

  ```
  m / purpose' / coin_type' / account' / change / address_index
  ```

  * <ins>purpose</ins>  
    Le premier niveau sera toujours `44'`, pour signifier que le portefeuille suit la convention BIP44.

  * <ins>coin_type</ins>  
    Le deuxième spécifie le réseau utilisé  
    `m/44'/0` est Bitcoin, `m/44'/1` Bitcoin Testnet, `m/44'/2` Litecoinour

  * <ins>account</ins>  
    Le troisième spécifie le compte utilisé  
    `m/44'/*'/0'` le premier utilisateur, `m/44'/*'/1'` le deuxième, etc  
    On peut par exemple créer un compte à usage personnel et un autre à usage professionnel.

  * <ins>change</ins>  
    Le quatrième spécifie le type d'adresse  
    `m/44'/*'/*'/0` une adresse de réception, `m/44'/*'/*'/1` une adresse de change

  * <ins>address_index</ins>  
    Le cinquième est le dernier niveau, l'index est incrémenté au besoin pour générer de nouvelles adresses  
    `m/44'/0'/0'/0/2` est la *3ème adresse* (2) de *réception* (0) de l'*utilisateur par défaut* (0') sur le réseau Bitcoin (0')

Pour aller plus loin:  
[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

---

## Brain wallet

Avec les *brain wallet*, les clés privées ne sont pas générées aléatoirement: c'est l'utilisateur qui choisit la phrase d'amorçage qui génère la clé privée. Il est recommandé de ne pas utiliser ce type de portefeuille car beaucoup plus facile à cracker.

