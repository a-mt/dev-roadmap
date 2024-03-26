---
title: Transactions & adresses
category: Other, Bitcoin
---

## Transaction

Une *transaction* est, pour simplifier, un enregistrement disant que "Alice donne x bitcoins à Bob".  
On distingue deux types de transactions:

* <ins>coinbase</ins>: Une transaction *coinbase* crée des bitcoins. Elle est créée lors du minage d'un bloc, et est offerte au mineur ayant réussi à valider son bloc en récompense de son travail.

* <ins>tx</ins>: Une transaction *tx* transfère des bitcoins entre utilisateurs. Elle est créée par un utilisateur lorsqu'il veut envoyer des bitcoins à un autre utilisateur.

## Adresse

* Contrairement à une banque, les bitcoins ne sont pas associés à un utilisateur/compte mais à une adresse Bitcoin (une chaîne de 26 à 35 caractères).

  Quand un utilisateur installe un client Bitcoin sur sa machine, le client Bitcoin attribue une adresse à l'utilisateur, qui est utilisée comme identifiant sur le réseau et lui permettra de recevoir des bitcoins.

* Pour la plupart des clients Bitcoin, une adresse Bitcoin est nouvellement générée à chaque fois qu'une transaction a lieu — un utilisateur peut donc avoir plusieurs adresses.

  Si la même adresse est utilisée à chaque fois, alors il devient facile pour quiconque de suivre l'historique de paiements de quiconque. Le fait de générer de nouvelles adresses permet aux utilisateurs du réseau Bitcoin de préserver leur vie privée.

* Une autre raison de changer d'adresse pour chaque transaction attendue est de pouvroir savoir d'où proviennent les différents transactions. Par exemple, dans une campagne marketing, on distribue des urls avec des tags UTM (Urchin Tracking Module):

  ``` txt
  ?utm_source=GA%20Education&utm_medium=affiliate&utm_content=GA%20Community%3A%20Learn%20Post&utm_campaign=Demo%20Account
  ```

  Quand un client utilise cette URL, on sait d'où il l'a obtenue — l'URL est minifée (généralement avec bit.ly) pour s'assurer que les clients ne peuvent pas la modifier. Sur le même principe, en distribuant différentes adresses aux différentes personnes avec lesquelles vous échangez des bitcoins, vous vous assurez que personne ne puisse mentir sur sa transaction (txid) et ainsi prétendre avoir envoyé des bitcoins que quelqu'un d'autre aura envoyés: vous vérifiez l'origine en vérifiant l'adresse à laquelle la transaction est envoyée.

* Si Alice veut envoyer des bitcoins à Bob, Bob doit lui donner son adresse et Alice doit créer une transaction avec cette adresse pour destinataire.

  ![](https://i.imgur.com/0RfJycTl.jpg)

  Bob, qui écoute le réseau Bitcoin, peut vérifier parmi les blocs qu'il reçoit s'il y a des transactions qui lui sont destinées (si le destinaire correspond à une de ses adresses) et ainsi calculer son solde.

Pour aller plus loin:  
[Address reuse](https://en.bitcoin.it/wiki/Address_reuse)

## Clé publique / clé privée

* Bitcoin utilise des clés assymmétriques pour s'assurer que seule la personne possédant l'adresse à laquelle les transactions sont adressées peut dépenser les bitcoins associés.

  L'algorithme utilisé pour générer les clés est [ECDSA](crypto-ec.md#elliptic-curve-digital-signature-algorithm-ecdsa). Il a les caractéristiques suivantes:

  * la clé privée: est un nombre entier généré aléatoirement (32 octets).

  * la clé publique: est un nombre généré à partir de la clé privée (33 octets).  
    La clé publique peut être calculée à partir de la clé privée mais pas l'inverse.  
    La clé publique peut être utilisée pour vérifier une signature — créée avec la clé privée.

  * la signature: est un hash qui prouve que la personne ayant émis un message possède bien la clé privée.

* La liste des clés privées d'un client sont stockées dans un fichier spécial, le *portefeuille Bitcoin* (*Bitcoin wallet* en anglais) — `wallet.dat`. Ce fichier est important: en perdant une clé privée, on perd la possibilité de dépenser les bitcoins envoyés à l'adresse / clé publique associée. Ce fichier est aussi souvent visé par les malwares, puisque posséder les clés privées permet de dépenser les bitcoins.

  Notons que par extension, on appelle les clients qui ne servent qu'à gérer le portefeuille (envoyer des transactions et lister les transactions reçues) des *clients portefeuille*.

* De nombreux de clients portefeuille offrent la possibilité d'encrypter le fichier portefeuille avec un mot de passe, cela permet de protéger les clés privées. Ça ne protège pas des malwares conçus pour capturer le mot de passe ou pour lire les clés en mémoire.

---

## Formats d'adresse

* L'adresse, qui peut ensuite être utilisée dans des transactions, est une forme plus courte (mais représentative) de la clé publique.

* Il existe à l'heure actuelle 3 formats d'adresse possibles:

  1. Les adresses [Pay-to-Pubkey-Hash (P2PKH)](https://en.bitcoin.it/wiki/Technical_background_of_version_1_Bitcoin_addresses#How_to_create_Bitcoin_Address)  
     Commencent par le nombre `1`  
     Ex: `1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`

  2. Les adresses [Pay-to-Script-Hash (P2SH)](https://en.bitcoin.it/wiki/Pay_to_script_hash)  
     Commencent par le nombre `3`  
     Ex: `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`

  3. Les addresses [Bech32](https://en.bitcoin.it/wiki/Bech32) (nouveau format, recommandé)  
     Commencent par `bc1`  
     Ex: `bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq`

  [![](https://i.imgur.com/jsHZyzOl.jpg)](https://en.bitcoin.it/wiki/Address#Address_map)

Pour aller plus loin:  
[List of address prefixes](https://en.bitcoin.it/wiki/List_of_address_prefixes)  
[Bech32 adoption](https://en.bitcoin.it/wiki/Bech32_adoption)

## Adresse Pay-to-Pubkey-Hash (P2PKH)

* La génération d'une adresse Bitcoin commence par la génération de clés ECDSA.  
  La clé publique est un point caractérisé par ses coordonnées *(x, y)*. Elle peut être compressée à une coordonnée (*x*) plus un bit de parité — puisque pour un *x* donné sur une courbe elliptique, seul deux *y* sont possibles.

  ``` python
  # ECDSA_privateKey = 18e14a7b6a307f426a94f8114701e7c8e774e7f9a47e2c2035db29a206321725
  # ECDSA_publicKey  = 0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352
  ```

* La clé publique est hashée avec [SHA-256](https://en.bitcoin.it/wiki/SHA-256) puis [RIPEMD-160](https://en.bitcoin.it/wiki/RIPEMD-160) et le résultat est préfixé avec le numéro du réseau utilisé (0x00 pour MainNet).

  ``` python
  payload    = ripemd160(sha256(ECDSA_publicKey))
  extpayload = 0x00 . payload

  # extpayload = 00f54a5851e9372b87810a8e60cdd2e7cfd80b6e31
  ```

* L'encodage [Base58Check](https://en.bitcoin.it/wiki/Base58Check_encoding) est appliqué:

  * L'algorithme sha256 est appelé deux fois

    ``` python
    hash = sha256(sha256(extpayload))

    # hash = c7f18fe8fcbed6396741e58ad259b5cb16b7fd7f041904147ba1dcffabf747fd
    ```

  * On ne conserve que les 4 premiers octets

    ``` python
    checksum = hash[0..32]

    # checksum = c7f18fe8
    ```

  * Et on les ajoute à la fin de la chaîne d'origine

    ``` python
    extpayload2 = extpayload . checksum

    # extpayload2 = 00f54a5851e9372b87810a8e60cdd2e7cfd80b6e31c7f18fe8
    ```

  * Finalement, on encode le résultat en base58.  
    Le résutat obtenu est une adresse P2PKH.

    ``` python
    address = base58(extpayload2)

    # address = 1PMycacnJaSqwwJqjawXBErnLsZ7RkXUAs
    ```

  [![](https://i.imgur.com/wf7TSk2l.png)](https://en.bitcoin.it/wiki/File:PubKeyToAddr.png)

## Format WIF

Les clés privées sont stockées dans le portefeuille au format WIF (Wallet Import Format), qui est simplement la clé privée encodée en chaîne ASCII via Base58Check — on peut facilement inverser l'encodage pour retrouver la clé privée.

![](https://i.imgur.com/aQUcZXz.png)

Pour aller plus loin:  
[Wallet import format](https://en.bitcoin.it/wiki/Wallet_import_format)

## Transation input/output

Un utilisateur ne peut pas dépenser des bitcoins qu'il n'a pas: il ne peut dépenser que des bitcoins qu'il a reçu via une (ou des) transaction(s) — *coinbase* ou *tx*. Pour s'en assurer, chaque transaction contient

* des *entrées* (*inputs*): une liste d'identifiants de transaction (txid) associé au numéro de sortie (*vout* ou *vector output*) dont on veut dépenser l'argent.

* des *sorties* (*outputs*): une liste d'adresses avec le montant qu'on veut donner.

![](https://gistcdn.githack.com/a-mt/635181de932638144c25b5a95126e513/raw/0ba7db6d338e5225e059234918e2f1038228cf0b/en-transaction-propagation.svg)

Chaque transaction dépense la sortie d'une ou plusieurs transactions antérieures. Une transaction peut créer plusieurs sorties, mais chaque sortie d'une transaction donnée ne peut être utilisée qu'une seule fois. Toute référence ultérieure est considérée comme une double dépense — une tentative de dépenser deux fois le même bitcoin — et est donc interdite.

Normalement, une transaction *tx* aura donc au moins une entrée et au maximum deux sorties: une pour le paiement et, si besoin, une deuxième pour renvoyer la monnaie à l'expéditeur. Ainsi, si Alice a gagné 50BTC en minant un bloc et qu'elle veut envoyer 10BTC à Bob, elle utilise la transaction de 50BTC (elle indique en entrée l'identifiant de transaction et numéro de sortie à utiliser, le montant est déduit) et elle indique deux sorties: 10BTC pour Bob, 40BTC pour Alice.

Une transaction *coinbase* n'a pas d'entrée et n'a qu'une seule sortie, qui envoie la récompense du bloc au mineur.

## Adresse de change

Pour plus d'anonymat, la monnaie n'est généralement pas renvoyée à la même adresse: Alice renvoie l'excédent à Zach et garde en mémoire qu'elle répond aux adresses Alice et Zach. Zach est ce qu'on appelle une *adresse de change* (*change address* en anglais).

Les adresses ne sont pas des portefeuilles ni des comptes: elles ne portent pas de soldes, elles ne font que recevoir des fonds. Ce malentendu a mené certaines personnes à ne sauvegarder que l'adresse d'origine et non l'adresse de change, perdant des bitcoins (la différence renvoyée à l'expéditeur) dans le processus.

## Frais de transaction

Si la somme des sorties (5BTC pour Bob + 40BTC pour Alice) est inférieure à la somme des entrées (50BTC), alors le mineur peut ajouter une sortie qui lui est destinée (+ 5BTC pour Carole): Alice aura ainsi payé 5 BTC de frais de transaction à Carole — notre mineur.

## UTXO

Chaque transaction a au moins une entrée et une sortie. Chaque entrée dépense le montant de la sortie référée. Chaque sortie qui n'a pas encore été utilisée en entrée d'une autre transaction est une sortie de transaction non dépensée: *Unspent Transaction Output* (UTXO) en anglais.

Lorsque votre portefeuille Bitcoin vous indique que vous avez un solde de 10 000 satoshis, cela signifie que vous avez 10 000 satoshis en attente dans une ou plusieurs UTXO pour lesquelles vous avez les clés associées.

## Script

* La sortie d'une transaction n'est à dire vrai pas une adresse mais un *script*, qui est essentiellement une suite d'instructions fixant les conditions à valider pour dépenser la transaction.

  Dans la plupart des cas, les conditions requises sont:
  * une clé publique qui, une fois hashée, est égale à l'adresse de destination (P2PKH) de la transaction

  * une signature qui prouve que la personne possède la clé privée associée à la clé publique

  On peut demander des conditions supplémentaires — comme plusieurs signatures, un mot de passe, ne pas dépenser avant une certaine date, etc.

* Le script qui fixe les conditions à valider pour dépenser une transaction est appelé *script PubKey* (puisqu'il requiert une clé publique) ou *script de verrouillage* (*locking script* en anglais).
  
  Le script inverse, devant valider les conditions du script PubKey pour dépenser la transaction, est le *script Sig* (pour signature) ou *script de déverrouillage* (*unlocking script* en anglais).

  <ins>Scripts pour une transaction standard P2PKH</ins>:

  ``` txt
  scriptPubKey: OP_DUP OP_HASH160 &lt;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
  scriptSig: &lt;sig> &lt;pubKey>
  ```

  <ins>Exemple de transaction avec une entrée et une sortie</ins>:   

  ``` txt
  Input:
  Previous tx: f5d8ee39a430901c91a5917b9f2dc19d6d1a0e9cea205b009ca73dd04470b9a6
  Index: 0
  scriptSig: 304502206e21798a42fae0e854281abd38bacd1aeed3ee3738d9e1446618c4571d10
  90db022100e2ac980643b0b82c0e88ffdfec6b64e3e6ba35e7ba5fdd7d5d6cc8d25c6b241501

  Output:
  Value: 5000000000
  scriptPubKey: OP_DUP OP_HASH160 404371705fa9bd789a2fcd52d2c580b65d35549d
  OP_EQUALVERIFY OP_CHECKSIG
  ```

## Pay-to-Script-Hash (P2SH)

* Le problème c'est que ces conditions augmentent la taille de la transaction. Or les frais minimum de transactions sont a priori proportionnels à la taille de la transaction (0.00001 BTC/kB). En utilisant une adresse P2SH les frais supplémentaires n'incombent plus à l'expéditeur mais au destinataire, au moment où il veut dépenser la transaction.

  L'addresse P2SH permet également de cacher les conditions de dépense de la transaction aux yeux du monde extérieur (jusqu'à ce qu'elle soit dépensée), comme par exemple le nombre de signatures requises.

* Si Alice veut envoyer des bitcoins à Bob et qu'il ne puisse pas dépenser avant une date donnée, alors

  1. elle crée un script:

      ``` txt
      redeemScript: &lt;expiry time> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 &lt;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
      ```

     Notons que l'adresse Pay-to-PubKey Hash (P2PKH) est une des conditions du script.

  2. elle crée une adresse Pay-To-ScriptHash (P2SH), qui est un hash de ce script, et envoie la transaction avec cette adresse pour destinataire.

     ``` python
     payload    = ripemd160(sha256(redeemScript))
     extpayload = 0x05 . payload
     address    = base58check(extpayload)
     ```

     ``` txt
     scriptPubKey: OP_HASH160 [20-byte-hash-value] OP_EQUAL
     ```

  3. elle fournit le script original (redeemScript) à Bob — via mail par exemple.

  4. Lorsque Bob veut dépenser la transaction envoyée à l'adresse P2SH, il fournit le script ainsi que toutes les pièces nécessaire pour le valider.

     ``` txt
     scriptSig: ...signatures... {redeemScript}
     ```

     Pour vérifier que Bob a bien le droit de dépenser cette transaction, le réseau P2P vérifie que le hash du script fournit par Bob a bien la même valeur que le hash fournit par Alice, puis exécute le script donné pour vérifier que les conditions requises pour dépenser cette transaction sont bien réunies.

* En bref, une transaction qui requiert du destinaire qu'il ait simplement une paire de clé privée/publique pour pouvoir être dépensée est envoyée à une adresse P2PKH (adresse qui commence par `1`), tandis qu'une transaction qui a des conditions supplémentaires est envoyée à une adresse P2SH (adresse qui commence par `3`) et c'est au destinataire de prouver qu'il possède le script.

Pour aller plus loin:  
[Script](https://en.bitcoin.it/wiki/Script)  
[BIP16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)

## Multisig (P2MS)

Pour une transaction nécessitant jusqu'à 3 signatures, on peut simplement créer un script Pubkey multi-signature — dit Pay-to-MultiSignature (P2MS):

``` txt
scriptPubKey: &lt;m> &lt;A pubkey> [B pubkey] [C pubkey...] &lt;n> OP_CHECKMULTISIG
scriptSig: OP_0 &lt;A sig> [B sig] [C sig...]
```

P2MS est devenu standard en janvier 2012, P2SH en avril 2012.  
P2MS est donc une relique datant d'avant P2SH — P2SH pousse les fonctionnalités de P2MS plus loin.

## Pubkey (P2PK)

Le script P2PK est une version simplifiée du script P2PKH. Au lieu d'utiliser une adresse pour sortie, on utilise une clé publique. Bien que toujours valide, ce type de transaction n'est généralement plus utilisé de nos jour. On en retrouve notamment dans les transactions coinbase des premiers blocs de la blockchain.

``` txt
scriptPubkey: &lt;pubkey> OP_CHECKSIG
scriptSig: &lt;sig>
```

Pour aller plus loin:  
[Why do we have P2PKH as well as P2PK?](http://web.archive.org/web/20200525025441/https://learnmeabitcoin.com/guide/p2pkh#why-do-we-have-p2pkh-as-well-as-p2pk)

## Null data

* Le script NULL DATA a été introduit dans Bitcoin 0.9.0 pour permettre l'inclusion de données arbitraires (jusqu'à 80 octets) dans les transactions. Un script est dit NULL DATA s'il utilise l'instruction `OP_RETURN`. Les scripts utilisant cette instruction ne peuvent pas être dépensés.

  ``` txt
  scriptPubkey: OP_RETURN &lt;data>
  ```

  <ins>Exemple</ins>: [TXID:6dfb16... VOUT:2](https://www.blockchain.com/btc/tx/6dfb16dd580698242bcfd8e433d557ed8c642272a368894de27292a8844a4e75)

  ``` bash
  OP_RETURN 68656c6c6f20776f726c64
  # Hex2ASCII(68656c6c6f20776f726c64) = hello world
  ```

* Les notes de Bitcoin Core 0.9.0 indiquent que l'ajout de l'instruction `OP_RETURN` ne constitue pas une incitation à utiliser la blockchain pour stocker des données, mais un moyen de facilement identifier ce type de contenu pour ne pas avoir à stocker ce type de transaction en RAM (liste UTXO) <sup>[[1]](https://bitcoin.org/en/release/v0.9.0#opreturn-and-data-in-the-block-chain)</sup>. Avant son ajout, les gens utilisaient une "fausse" adresse, ne correspondant à aucune clé privée, pour envoyer des données:

  ``` txt
  OP_DUP OP_HASH160 00000000000000000068656c6c6f20776f726c64 OP_EQUALVERIFY OP_CHECKSIG
  ```

## Heure de verrouillage

* L'heure de verrouillage (*locktime* en anglais) d'une transaction indique à partir de quand la transaction peut être ajoutée à la blockchain. C'est peut être

  * après <ins>un temps donné</ins>  
    La valeur sera considérée comme un timestamp si >= 500000000.

    Parce que les blocs ne sont pas crées à intervalles réguliers, il est possible que la transaction se retrouve dans un bloc avant le locktime stipulé. Pour plus de prudence, prévoir 2-3 heures supplémentaires.

  * ou <ins>après un bloc donné</ins>  
    La valeur sera considérée comme un numéro de bloc si < 500000000.

  Pendant ce temps, si un des signataire de la transaction change d'avis, alors il peut créer une nouvelle transaction qui utilise une ou plusieurs mêmes entrées, sans locktime, ce qui aura pour effet d'invalider l'ancienne transaction.

* Pour permettre le remplacement d'une transaction par une autre (invalider la transaction originale mais conserver le locktime), le locktime est utilisé conjointement au champ *sequence* des entrées:

  ![](https://i.imgur.com/Pv9Jtpj.png)

  En reçevant une transaction qui utilise une ou plusieurs mêmes entrées, avec un numéro de séquence supérieur, les noeuds doivent remplacer la transaction en attente (dans la mempool) par la nouvelle transaction.

  ... sauf que. Cette fonctionnalité a été désactivée pour empêcher les attaques par déni de service: remplacer une transaction par une autre demande de la puissance de calcul, et en spammant les noeuds avec des transactions de remplacement, on peut paralyser le système.

* Certains portefeuilles prennent en charge la politique *replace-by-fee* (*RBF*, décrit dans le BIP125), qui permet de remplacer une transaction par une autre pourvu que les frais de transaction soient plus élevés.

* La plupart des transactions n'utilisent pas cette fonctionnalité, le locktime vaut 0x00000000 et le numéro de séquence vaut UINT_MAX (0xFFFFFFFF).

  Même aujourd'hui, définir tous les numéros de séquence à UINT_MAX peut désactiver le locktime. Pour l'activer, au moins une des entrée doit avoir un numéro de séquence inférieur au maximum. Puisque ces numéros ne sont plus utilisés à d'autres fins, il suffit de mettre zéro à n'importe quelle entrée pour activer le locktime.

  ![](https://i.imgur.com/j5MDslL.png)

Pour aller plus loin:  
[(Status: Proposal) BIP125](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)  
[Transaction replacement](https://en.bitcoin.it/wiki/Transaction_replacement) 

## Signature

Le script signature de chaque entrée contient tous les éléments permettant de valider le script pubkey de la sortie parente et notamment... la signature.

La signature permet 1. de prouver que l'émetteur possède la clé privée associée à la clé publique demandée (valide l'entrée), 2. de prouver que personne n'a modifié les sorties de la transaction en cours (sécurise la sortie).

``` python
# Données de la transaction
version      = "01000000"

inputCount   = "01"
inputTxid    = "81b4c832d70cb56ff957589752eb4125a4cab78a25a8fc52d6a09e5bd4404d48"
inputVout    = "00000000"
inputScriptPubkey = keyUtils.addrHashToScriptPubKey("1MMMMSUb1piy2ufrSguNUdFmAcvqrQF8M5")
inputSeq     = "ffffffff"

outputCount  = "01"
outputValue  = 91234 # satoshis
outputScript = keyUtils.addrHashToScriptPubKey("1KKKK6N21XKo48zWKuQKXdvSsCf95ibHFa")

# Crée la transaction (pre signature)
tx = version
  + inputCount
  + inputTxid.decode('hex')[::-1].encode('hex') # reverse
  + inputVout
  + '%02x' % len(inputScriptPubkey.decode('hex'))
  + inputScriptPubkey
  + inputSeq
  + outputCount
  + struct.pack("<Q", outputValue).encode('hex')
  + '%02x' % len(outputScript.decode('hex'))
  + outputScript

# Crée une signature de la transaction entière
privateKey = keyUtils.wifToPrivateKey("5HusYj2b2x4nroApgfvaSfKYZhRbKFH41bVyPooymbC6KfgSXdD") #1MMMM
tx        += "01000000" # hash code

digest     = hashlib.sha256(hashlib.sha256(tx.decode('hex')).digest()).digest()
signature  = ecdsa.SigningKey
                  .from_string(privateKey.decode('hex'), curve=ecdsa.SECP256k1)
                  .sign_digest(digest, sigencode=ecdsa.util.sigencode_der)
           + '\01' # 01 is hashtype

# Crée le scriptSig à partir de la signature + public key
publicKey      = keyUtils.privateKeyToPublicKey(privateKey)
inputScriptSig = utils.varstr(signature).encode('hex')
               + utils.varstr(publicKey.decode('hex')).encode('hex')

# Crée la transaction signée
# (pareil mais avec scriptSig au lieu de scriptPubkey)
signed_tx = version
  + inputCount
  + inputTxid.decode('hex')[::-1].encode('hex') # reverse
  + inputVout
  + '%02x' % len(inputScriptSig.decode('hex'))
  + inputScriptSig
  + inputSeq
  + outputCount
  + struct.pack("<Q", outputValue).encode('hex')
  + '%02x' % len(outputScript.decode('hex'))
  + outputScript

txnUtils.verifyTxnSignature(signed_tx)
print 'SIGNED TX', signed_tx
```

Pour aller plus loin:  
[Bitcoins the hard way: Using the raw Bitcoin protocol](http://www.righto.com/2014/02/bitcoins-hard-way-using-raw-bitcoin.html)
