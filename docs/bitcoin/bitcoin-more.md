---
title: Extra
category: Other, Bitcoin
---

## Malléabilité des transactions

* Une transaction Bitcoin transfère les bitcoins d'une adresse à l'autre. Pour être dépensée, une transaction doit être signée avec la clé privée correspondant à l'adresse, ainsi seul le propriétaire des bitcoins peut les déplacer. L'ensemble de la transaction (y compris la signature) est hashée et ce hash est utilisé pour identifier la transaction dans le système Bitcoin.

* Les données importantes sont protégées par la signature et ne peuvent pas être modifiées par un attaquant. Comme la signature (scriptSig) n'est pas une simple signature mais un script qui pousse les données de la signature dans la pile mémoire, il est possible de modifier la signature, et qu'elle soit toujours valide.

  Par exemple:
  * <ins>Signature A</ins>:  
    <pre>
    <ins>48</ins>30450220539901ea7d6840eea8826c1f3d0d1fca7827e491deabcf17889e7a2e5a39f5a1022100fe745667e444978c51fdba6981505f0a68619f0289e5ff2352acbd31b3d23d8701<ins>41</ins>046c4ea0005563c20336d170e35ae2f168e890da34e63da7fff1cc8f2a54f60dc402b47574d6ce5c6c5d66db0845c7dabcb5d90d0d6ca9b703dc4d02f4501b6e44
    </pre>

    Le script est interprété comme suit:

    ![](https://i.imgur.com/VUWUsRQ.png)

    0x48 pousse la valeur dans la pile: 0x48.  
    0x41 pousse la valeur dans la pile: 0x41.

  * <ins>Signature B</ins>:  
    <pre>
    <ins>4d4800</ins>30450220539901ea7d6840eea8826c1f3d0d1fca7827e491deabcf17889e7a2e5a39f5a1022100fe745667e444978c51fdba6981505f0a68619f0289e5ff2352acbd31b3d23d8701<ins>4d4100</ins>046c4ea0005563c20336d170e35ae2f168e890da34e63da7fff1cc8f2a54f60dc402b47574d6ce5c6c5d66db0845c7dabcb5d90d0d6ca9b703dc4d02f4501b6e44
    </pre>

    Le script est interprété comme suit:

    ![](https://i.imgur.com/NOjI39Y.png)

    0x4d 0x48 0x00 pousse les 2 octets qui suivent 0x4d: 0x0048  
    0x4d 0x41 0x00 pousse les 2 octets qui suivent 0x4d: 0x0048  

  Les zéros à gauche sont négligeables, les transactions A et B font donc strictement la même chose et sont toutes deux valides. Mais comme les données ont changé, les transactions ont deux hashs différents.

* Comme les deux transactions utilisent les mêmes entrées, seule une des deux sera validée — personne ne sera payé deux fois. Mais trois types de problèmes ont émergé:

  1. L'échange Mt.Gox (qui a depuis fermé) a déclaré qu'il cesserait de traiter les retraits de bitcoins jusqu'à ce que le réseau Bitcoin approuve et standardise un hash non-maléable <sup>[[1]](https://www.mtgox.com/press_release_20140210.html)</sup>. Ils utilisaient le hash de la transaction envoyée pour suivre l'avancement de la transaction sur le réseau et ré-envoyer la transaction si elle n'aboutit pas. C'est évidemment un problème si la transaction a bien été effectuée, mais avec un hash différent.

  2. Un certain nombre de portefeuilles utilisaient les deux transactions pour calculer le solde, ce qui faisait apparaître une valeur eronnée.

  3. Lorsqu'un portefeuille envoie une transaction, il n'est généralement pas nécessaire d'attendre que cette transaction soit validée avant de pouvoir dépenser la monnaie (renvoyée à une adresse de change de l'utilisateur) — le risque autrement, c'est de voir d'avoir un solde "paralysé", nécessitant d'attendre une heure ou deux entre chaque transaction.
     Mais si le hash de la transaction a changé, alors les transactions effectuées avec la monnaie ne sont pas valides. On a juste le désagrément de devoir refaire ces transactions avec le bon hash, mais ce désagrément peut être rédhibitoire pour un usage professionnel.

* Il existe différents types de malléabililté, décrits dans [BIP62](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki). 

Pour aller plus loin:  
[The Bitcoin malleability attack graphed hour by hour](http://www.righto.com/2014/02/the-bitcoin-malleability-attack-hour-by.html)

## Clés encryptées (BIP38)

* Les clés privées doivent rester secrètes. Or une clé privée stockée dans un portefeuille peut être sûre, mais ce portefeuille doit être sauvegardé. Et parfois, les utilisateurs doivent déplacer les clés d'un portefeuille à l'autre — pour une mise à jour ou pour changer de client par exemple.

* À cet usage, BIP38 propose une norme pour le cryptage des clés privées avec une phrase de passe et encodage Base58Check.

  ``` js
  function encrypt(privkey, compressed, passphrase){
    var salt   = hash256(getAddress(privkey)).slice(0, 4),
        secret = Buffer.from(passphrase.normalize('NFC'), 'utf8');

    var scryptBuf = await scrypt.async(
      secret,
      salt,
      SCRYPT_PARAMS.N,
      SCRYPT_PARAMS.r,
      SCRYPT_PARAMS.p,
      64
    );
    var derivedHalf1 = scryptBuf.slice(0, 32);
    var derivedHalf2 = scryptBuf.slice(32, 64);

    var xorBuf = xor(derivedHalf1, privkey);
    var cipher = aes.createCipheriv('aes-256-ecb', derivedHalf2, NULL);
    cipher.setAutoPadding(false);
    cipher.end(xorBuf);

    var cipherText = cipher.read();

    // 0x01 | 0x42 | flagByte | salt (4) | cipherText (32)
    var result = Buffer.allocUnsafe(7 + 32);
    result.writeUInt8(0x01, 0);
    result.writeUInt8(0x42, 1);
    result.writeUInt8(compressed ? 0xe0 : 0xc0, 2);
    salt.copy(result, 3);
    cipherText.copy(result, 7);

    return bs58check.encode(result);
  }

  var encryptedKey = encrypt('5KN7MzqK5wt2TP1fQCYyHBtDrXdJuXbUzm4A9rKAteGu3Qi5CVR', false, 'TestingOneTwoThree');
  // 6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg
  ```

* Les clés privées au format WIF (non compressées) sont préfixées de `5`, les clés privés cryptées de `6P`.  
  Si une clé commence par `6P`, cela signifie qu'elle est cryptée et nécessite une phrase de passe.

Pour aller plus loin:  
[BIP38](https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki)  
[bip38.js](https://github.com/bitcoinjs/bip38/blob/db6f6545a7896f368ef841cae16abb199fb138a6/index.js)

## Portefeuille papier

* Le cas d'utilisation le plus courant des clés cryptées est dans le cadre des *portefeuilles papier* (*paper wallet* en anglais), utilisés pour sauvegarder des clés privées sur papier.

  Les clés imprimées (avec un code QR) sont ainsi facilement accessibles mais sécurisées, puisqu'il est nécessaire de connaître la phrase de passe pour la décrypter.

  ![](https://i.imgur.com/8z81qwZ.jpg)

* L'adresse Bitcoin associée est généralement également imprimée (par commodité), mais ce n'est pas indispensable puisqu'elle peut être calculée à partir de la clé privée.

## Adresse de vanité

* Une *adresse de vanité* (*vanity address* en anglais) sont des adresses qui contiennent des messages lisibles par les hommes.

  <ins>Exemple</ins>:

  ```
  1LoveBPzzD72PUXLzCkYAtGFYmK5vYNR33
  ```

  ```
  3Beer3irc1vgs76ENA4coqsEQpGZeM5CTd
  ```

* Obtenir une adresse de vanité nécessite de générer une clé privée candidate, dériver la clé publique, suivit de l'adresse, vérifier si elle correspond au modèle souhaité, et répéter cette opération (des milliards fois) jusqu'à ce qu'une correspondance soit trouvée.

## SegWit

* La malléabilité de signature de transaction fait référence à la capacité de tout noeud de relais sur le réseau de transformer le script de signature d'une transaction sans avoir accès aux clés privées correspondantes. Changer de signature modifie le txid de la transaction et invalide toute transaction enfant référent l'ancien txid.

* La BIP144, dite *Segregated Witness* (*témoin isolé* en français) ou *SegWit*, vise à corriger ce problème. Pour ce faire, SegWit introduit un nouveau format de transaction.

  Note: En cryptographie, toute solution capable de satisfaire un problème de cryptographie est appelé un *témoin* (*witness* en anglais). La signature numérique est le type de témoin le plus couramment utilisé.

* Le passage aux transactions segwit s'effectue en deux étapes:

  1. Les portefeuilles doivent créer des sorties de type segwit.

  2. Ces sorties peuvent être dépensées par des portefeuilles qui savent comment construire des transactions au format segwit.

### Les sorties segwit

Une sortie segwit est beaucoup plus simple qu'une sortie traditionnelle. Elle se compose de deux valeurs:

* un <ins>numéro de version</ins> (1 octet)  
  Le numéro (valeur de 0 à 16) définit le template à utiliser pour valider l'entrée. On appelle ce template un *programme témoin* (*witness program* en anglais)

* les <ins>données</ins> à donner au programme (2 à 40 octets)

Par exemple, la sortie segwit de type `0` vient remplacer P2PKH:

* non-segwit (P2PKH):

  ``` txt
  DUP HASH160 ab68025513c3dbd2f7b92a94e0581f5d50f654e7 EQUALVERIFY CHECKSIG
  ```

* segwit (P2WPKH):

  ``` txt
  0 ab68025513c3dbd2f7b92a94e0581f5d50f654e7
  ```

Pour un portefeuille qui ne prend pas en charge segwit, une sortie segwit ressemble à une transaction que tout le monde peut dépenser — qui ne nécessite pas de signature.

### Le format segwit

* Une transaction qui veut utiliser des sorties segwit en entrée doit utiliser le format segwit, qui a deux nouveaux champs:

  * *flag*: un champ qui, si présent, vaudra toujours 1 (0x0001).  
    Il signale qu'il s'agit du nouveau format, ce qui active l'utilisation des témoins:

  * *witness[]*: la liste des témoins — il y en a un par entrée.

  Pour une entrée non segwit, le script de déverrouillage (scriptSig) est placé directement dans l'entrée, comme d'habitude, et le témoin associé est vide (représenté par 0x00).

  Pour une entrée segwit, c'est l'inverse: le script de déverouillage est stocké dans la liste de témoins et le script de l'entrée est vide.

  ![](https://i.imgur.com/kmAHgr5.png)

* Si Alice veut envoyer une transaction à Bob, Bob doit lui indiquer s'il prend en charge le format segwit. Si Bob supporte segwit, Alice envoie les sorties au format segwit (et sinon, au format original). Lorsque Bob voudra dépenser une sortie au format segwit, il créera une transaction au format segwit.

  Du point de vue d'un noeud qui ne prend pas en charge segwit, la sortie segwit ne nécessite pas de signature, donc le fait qu'il n'y en ait pas à l'intérieur de l'entrée paraît normal — les transactions qui suivent le nouveau format paraissent valide pour les noeuds qui n'ont pas été mis à jour.
  Un portefeuille qui prend en charge segwit, lui, s'attendra à trouver un témoin valide dans les témoins de la transaction.

  SegWit est donc une fonctionnalité qui a été implémentée sous la forme d'un soft fork: le passage transaction non-segwit / transaction segwit va s'effectuer au fur et à mesure que les noeuds se mettent à jour.

### wtxid

* txid est toujours le double SHA256 des entrées et sorties (comme avant), sauf que maintenant la signature est vide pour chaque entrée segwit.

  Conséquence: une transaction qui ne dépense que des sorties segwit n'est plus malléable. Les signatures sont toujours nécessaires pour valider la transaction mais pas pour l'identifier.

  ```
  hash([nVersion][txins][txouts][nLockTime])
  ```

* wtxid est un double SHA256 du nouveau format de sérialisation. wtxid est malléable mais ça n'a pas vraiment d'importance puisqu'on ne se base pas dessus pour lier les prochaines transactions.
  Si une transaction n'a aucun entrée segwit, alors wtxid est égal à txid.

  ```
  hash([nVersion][marker][flag][txins][txouts][witness][nLockTime])
  ```

&nbsp;

![](https://i.imgur.com/qfnYj2c.png)

### Commit du bloc

La racine Merkle des txid est enregistrée dans les entêtes du bloc, comme d'habitude. Et on enregistre également un hash calculé à partir des wtxid:

* Le wtxid de la transaction coinbase est définie à 0x0000....0000.

* On calcule la racine Merkle (*witness root hash*) de tous les wtxid des transactions.

* On concatène la racine Merkle des wtxid avec une valeur réservée (*witness reserved value*).

* Le tout est hashé deux fois avec SHA256.

* Pour des raisons de rétro-compatibilité, le hash n'est pas enregistré dans les entêtes du bloc mais dans la transaction coinbase du bloc, en tant que sortie (ne peut pas être dépensée à cause du OP_RETURN):

  ``` python
  0x6a         # OP_RETURN
  0x24         # Push the following 36 bytes
  0xaa21a9ed   # Commitment header
  0x...        # SHA256-SHA256(witness root hash|witness reserved value)
  ```

* Cette valeur n'a aucune signification à l'heure actuelle mais pourra permettre d'identifier des soft fork à l'avenir — en utilisant une valeur réservée différente par exemple.

### Avantages de SegWit

1. <ins>Malléabilité des transactions</ins>  
   Comme mentionné précedemment, les transactions qui n'utilisent que des sorties segwit ne sont pas malléables.

2. <ins>Versionnement</ins>  
   Chaque sortie segwit est précédée d'un numéro de version, on pourra ajouter de nouveaux scripts de manière plus simple, avec des soft fork.

3. <ins>Scalabilité</ins>  
   Les scripts contribuent souvent de manière importante à la taille totale d'une transaction — dans certains cas, plus de 75% des données dans une transaction. Avec SegWit, les transactions peuvent être "nettoyées" au bout d'un certain temps: on a pas besoin de garder les signatures de transactions qu'on ne peut plus dépenser depuis longtemps et ça n'aura pas d'incidence sur l'id des transactions.

4. <ins>Frais</ins>  
  Les frais de transaction minimum sont calculés à partir de la taille des transactions. Une sortie segwit est plus courte qu'une sortie non-segwit, cela coûte donc moins cher d'envoyer une transaction au format segwit qu'au format traditionnel.

Pour aller plus loin:  
[Segregated Witness](https://en.bitcoinwiki.org/wiki/Segregated_Witness)  
[BIP141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)

## Adresse Bech32

Bech32 est un format d'adresse segwit spécifié par la BIP173.
L'adresse commence par l'identifiant du réseau utilisé ("bc" pour Mainnet ou "tc" pour Testnet) suivit du séparateur "1", suivit de la sortie segwit encodée en base32, et les 6 derniers caractères sont la checksum.

<ins>Sortie segwit</ins>:

```
0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
```

<ins>Sortie Bech32</ins>:

```
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4
```

Une adresse au format Bech32 prend donc moins de place.

Pour aller plus loin:  
[BIP173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)


## Altcoins

Il existe d'autres cryptomonnaies que Bitcoin. La majorité sont des hard forks de Bitcoin qui ne différent que par l'utilisation de politiques et algorithmes différents. On nomme ces cryptomonnaies des *altcoins* et leur blockchain des *altchains*.

Pour aller plus loin:  
[Comparison of cryptocurrencies](https://en.bitcoin.it/wiki/Comparison_of_cryptocurrencies)


