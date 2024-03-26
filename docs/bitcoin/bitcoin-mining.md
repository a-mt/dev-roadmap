---
title: Minage
category: Other, Bitcoin
---

## Logiciel

* Les utilisateurs Bitcoin voulant miner des bitcoins doivent utiliser un [logiciel de minage](https://en.bitcoin.it/wiki/Mining_software).  
  Il peut tourner en utilisant le
  * CPU (Central Processing Unit),
  * GPU (Graphics Processing Unit),
  * FPGA (Field Programmable Gate Array)
  * ou ASIC (Application Specific Integrated Circuit)

  Pour aller plus loin:  
  [Bitcoin Mining Hardware](https://99bitcoins.com/bitcoin-mining/)

* Le logiciel de minage envoie un message `getblocktemplate` au client Bitcoin.

  ``` txt
  {"id": 0, "method": "getblocktemplate", "params": [{"capabilities": ["coinbasetxn", "workid", "coinbase/append"]}]}
  ```

   Il récupére en retour la liste des transactions dans la mempool ainsi que la clé publique à laquelle la transaction coinbase doit être associée.

  ``` txt
  {
   "error": null,
   "result": {
     "coinbasetxn": {
       "data": "0100000001000000000000000000000000000000000000000000000000000000
  0000000000ffffffff1302955d0f00456c6967697573005047dc66085fffffffff02fff1052a01
  0000001976a9144ebeb1cd26d6227635828d60d3e0ed7d0da248fb88ac01000000000000001976
  a9147c866aee1fa2f3b3d5effad576df3dbf1f07475588ac00000000"
     },
     "previousblockhash": "000000004d424dec1c660a68456b8271d09628a80cc62583e5904f5894a2483c",
     "transactions": [],
     "expires": 120,
     "target": "00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
     "longpollid": "some gibberish",
     "height": 23957,
     "version": 2,
     "curtime": 1346886758,
     "mutable": ["coinbase/append"],
     "bits": "ffff001d"
   },
   "id": 0
  }
  ```

  ![](https://gistcdn.githack.com/a-mt/01132f1caa7226f794f23d41707cdfd8/raw/84fa069750313e6413449ef72f11eb7e64b55c14/en-solo-mining-overview.svg)

* Les configurations peuvent être changées mais, par défaut, le noeud sélectionne les transactions ayant des frais de transactions d'aù moins 0.00001 BTC/kb et les ajoute par ordre décroissant de coût jusqu'à ce que la taille du bloc soit (inférieure ou égale à) 750 000 octets.

  | Configuration | Valeur par défaut (unité)
  |---      |---
  | txconfirmtarget | 2 (blocks)
  | paytxfee | 0 (BTC/kB)
  | mintxfee | 0.00001 (BTC/kB)
  | limitfreerelay | 15 (thousand bytes per minute)
  | minrelaytxfee | 0.00001 (BTC/kB)
  | blockmaxsize | 750000 (bytes)
  | blockminsize | 0 (bytes)
  | blockprioritysize | 0 (bytes)

* Jusqu'à la version 0.9.5, Bitcoin Core utilisait la méthode `getwork` (désormais dépréciée).

## Entête de bloc

* Le logiciel de minage crée l'entête du bloc:
  * <ins>version</ins> (4 octets)
  * <ins>hash du bloc précédent</ins> (32 octets)
  * <ins>merkle root</ins> (32 octets)
  * <ins>timestamp</ins> (4 octets)
  * <ins>bits</ins> (4 octets)
  * <ins>nonce</ins> (4 octets)

  La *hauteur* du bloc (*height* en anglais), c'est à dire la position du bloc dans la blockchain (nombre de blocs avant le bloc + 1), n'est pas enregistrée, elle est implicite.

  Data type: [block](https://en.bitcoin.it/wiki/Protocol_documentation#block)

### Version

Le numéro de version définit les règles que suit le bloc. Ç  permet d'identifier les forks.

### Merkle root

* Le hash d'une transaction (Tx Hash) est aussi son identifiant (TxID) — deux transactions ne peuvent pas contenir les mêmes données puisqu'elle ne peuvent pas utiliser la même transaction-sortie en entrée.

  ```
  TXID2 = hash(
      Input  0: TXD1-0,
      Output 0: 10BTC à Bob
      Output 1: 40BTC à Alice
  )
  ```

* Les hashs des transactions sont concaténés deux à deux et hashés, et les hashs de hashs, récursivement, jusqu'à obtenir le hash de tout les hashs: la *racine Merkle* (*Merkle root* en anglais).

  ![](https://i.imgur.com/v1X3aDD.png)

  Algorithme: [merkle.py](https://gist.github.com/shirriff/c9fb5d98e6da79d9a772#file-merkle-py)

* C'est la racine Merkle qui est utilisée (avec le nonce, timestamp, difficulté, etc)  pour calculer le hash du bloc .  
  L'inclusion d'un grand nombre de transactions dans un bloc ne ralentit pas l'effort de calcul du nonce — le hashage d'un bloc contenant 1 transaction demande exactement le même effort que le hashage d'un bloc contenant 10 000 transactions. L'ajout de transactions ne nécessite pas le recalcul complet de la racine, on peut la construire au fur et à mesure, à partir des résultats précedent.

* La première transaction de la liste est une transaction coinbase envoyée à l'adresse du mineur et puisque qu'elle est différente pour chaque mineur, la racine Merkle sera nécessairement différente pour chaque mineur.

### Bits

* Pour que le bloc soit valide, le hash de l'entête du bloc doit être inférieur ou égal à la cible (*target* en anglais), ou pour simplifier: le hash doit commencer par un certain nombre de zéros. La cible est généralement exprimée sous la forme d'un nombre hexadécimal de 50 chiffres.

  La probabilité de trouver un hash qui commence par un grand nombre de zéros est très faible, c'est pourquoi il faut faire de nombreuses tentatives — et c'est le but, c'est ce qui permet de sécuriser la blockchain.

* La *difficulté* est inversemment proportionnelle à la cible — plus la cible est basse, plus il est difficile de générer un bloc. La difficulté est généralement exprimée sous la forme d'un nombre décimal, avec éventuellement des décimales.

  ```
  target = ((65535 << 208) / difficulty)
  ```

* La difficulté est stockée dans les entêtes du bloc (dans le champ *bits*) en format compact — un encodage en virgule flottante avec un 1 octet pour l'exposant (où seuls les 5 bits les plus bas sont utilisés et la base utilisée est 256) et 3 octets pour la mantisse.

  ``` js
  1.3254 = exposant(10^-4) * mantisse(13254)
  // dans cet exemple on est en base 10
  ```

* La difficulté recherchée est ajustée collectivement par le réseau tous les 2 016 blocs pour qu'il y ait en moyenne 6 blocs de résolus par heure — autrement dit, qu'un bloc prenne 10 minute à être généré. La difficulté peut ainsi augmenter ou diminuer pour compenser la vitesse et l'intérêt variable des noeuds du réseau.

  ![](https://i.imgur.com/VpQtymn.png)

Pour aller plus loin:  
[Difficulty](https://en.bitcoin.it/wiki/Difficulty)  
[Target](https://en.bitcoin.it/wiki/Target)

### Hashcash

Les valeurs de l'entête sont concaténées puis hashées par SHA256 deux fois. Le but du jeu: trouver un hash inférieur à la difficulté cible.

``` python
import hashlib

version    = "01000000"
prevHash   = "81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000"
merkleRoot = "e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b"
timestamp  = "c7f5d74d"
bits       = "f2b9441a"
extraNonce = "42a14695"

header_bin = (version
  + prevHash
  + merkleRoot
  + timestamp
  + bits
  + extraNonce).decode('hex')

count = 0

hash = hashlib.sha256(hashlib.sha256(header_bin + count).digest()).digest()
```

1. Le compteur commence à 0 mais *extraNonce* est aléatoire — ensemble, ils forment un *nonce* aléatoire. Cela permet de cacher la quantité de puissance de calcul ayant été nécessaire pour calculer la preuve de travail: personne ne peut dire si c'est un mineur puissant mais malchanceux, ou un mineur faible mais qui a eu beaucoup de chance.

2. Comme le champ *nonce* se trouve à la fin, il n'est pas nécessaire de re-concaténer les valeurs à chaque fois, on se contente d'ajouter +1 à chaque itération.

Pour aller plus loin:  
[Block hashing algorithm](https://en.bitcoin.it/wiki/Block_hashing_algorithm)  
[Mining](https://en.bitcoin.it/wiki/Mining)

## Transaction coinbase

* Chaque bloc doit contenir une ou plusieurs transactions. La première de ces transactions est  une transaction *coinbase* — une transaction qui crée de nouveaux bitcoins. Contrairement aux transactions *tx*, une transaction *coinbase* n'a pas d'entrée.

  ![](https://i.imgur.com/DJpnYcl.png)

* La transaction coinbase est créée par le mineur et assignée à son adresse. Lorsque le mineur arrive à trouver le nonce qui valide le bloc, alors il gagne la transaction coinbase en récompense. C'est ce qui incite les noeuds à utiliser leur puissance de calcul pour créer des blocs. Ça fournit également un moyen de mettre des pièces en circulation — puisqu'il n'y a pas d'autorité centrale pour les émettre.

* Les mineurs augmentent la quantité de devises en circulation et c'est la raison pour laquelle on les appelle des *mineurs* — de la même manière que des mineurs d'or mettent en circulation plus d'or, en dépensant du temps et de l'énergie pour gagner cet or en récompense.

* Le système Bitcoin est conçu pour ne créer qu'un nombre limité de bitcoins. La valeur des transactions coinbase est réduite de moitié tous les 4 ans — soit environ tous les 210 000 blocs. Les premiers blocs avaient une récompense de 50 BTC, elle est maintenant de 6,25 BTC, elle sera de 0 en 2040, limitant ainsi le nombre total de bitcoins pouvant être mis en circulation à 21 millions. À terme, seul les frais de transaction présenterons une incitive pour les mineurs.

  ```
  (50 * 100000000) >> (height / 210000)
  # en satoshis
  ```

* Il n'est pas obligatoire qu'un bloc comporte plusieurs transactions, il peut très bien ne comporter que la transaction coinbase, mais les mineurs incluent presque toujours autant de transactions qu'ils peuvent pour gagner les frais de transaction.

## Frais de transaction

* Un utilisateur envoyant des bitcoins à un autre utilisateur incite les mineurs à valider la transaction plus vite en ajoutant une récompense plus ou moins élevées pour le mineur — autrement dit, en payant des frais de transaction. Parmi les transactions en attente de validation dans la mempool, un mineur aura plus intérêt à prendre celles qui lui offrent une récompense plus élevée, ces transactions seront donc validées plus rapidement.

  ![](https://i.imgur.com/LXX4vCX.png)

* Historiquement, il n'était pas obligatoire d'inclure des frais pour chaque transaction. La plupart des mineurs prenaient des transactions sans frais pourvu qu'elle ait une *priorité* suffisamment élevée. La priorité était calculée comme suit:

  ```
  priority = sum(input_value_in_base_units * input_age)/size_in_bytes
  ```

  C'est à dire, la somme des entrées pondérée par leur âge, et divisé par la taille de la transaction en octets.

* Depuis Bitcoin Core 0.9, des frais minimum sont exigées pour diffuser une transaction sur le réseau. Les frais minimum sont calculés en fonction de la taille de la transaction (en octets) et de la demande en noeuds mineurs — les frais augmentent à mesure que la demande augmente. Mais ultimement, il appartient au mineur de choisir les frais minimum qu'il accepte.

  Une transaction ne payant que le minimum doit être prête à attendre longtemps avant qu'il y ait suffisamment d'espace libre dans un bloc pour l'inclure.

* La transaction coinbase est utilisée pour assigner le bénéficiaire des frais de transaction (de l'ensemble des transactions inclues dans le bloc).

  La valeur d'une transaction coinbase est ainsi égale aux bitcoins nouvellement crées (inférieur ou égal au montant autorisé) plus la somme des frais. La somme des frais est trouvée en calculant la différence entre les entrées et les sorties des transactions du bloc.

Pour aller plus loin:  
[Miner fees](https://en.bitcoin.it/wiki/Miner_fees)

## Child Pays For Parent (CPFP)

* Les mineurs peuvent non seulement sélectionner les transactions en fonction de leurs frais de transaction, mais aussi ceux de leurs parents et enfants.

  Par exemple, Alice envoie une première transaction (tx<sub>1</sub>) à Bob et renvoie une partie de l'argent à elle-même. Alice envoie une deuxième transaction (tx<sub>2</sub>) à Charlie, qui prend pour entrée la monnaie qui a éré renvoyée à Alice (sortie de tx<sub>1</sub>). 
  Le mineur prendra en compte les frais de tx<sub>1</sub> et tx<sub>2</sub>: si les frais de transaction de tx<sub>1</sub> sont bas mais que les frais de tx<sub>2</sub> sont élevés, alors le mineur a intérêt a valider les deux.

  Ce processus est appelé *child pays for parent* (l'*enfant paie pour le parent*) et peut être utilisé pour accélerer la validation d'une transaction en attente depuis trop longtemps.

Pour aller plus loin:  
[How to do a manual Child Pays For Parent transaction](https://bitcoinelectrum.com/how-to-do-a-manual-child-pays-for-parent-transaction/)

## Pool mining

* Le minage est très compétitif, de nombreuses personnes essaient de miner des blocs pour récolter des bitcoins. C'est la raison pour laquelle le minage demande beaucoup de puissance de calcul — il faut avoir des machines puissantes pour avoir une chance d'emporter la course, un mineur a typiquement du matériel spécialisé, qui est cher et complexe à gérer.

* Beaucoup se tournent vers le *pool mining* (le *minage mutualisé*): la puissance de traitement combinée d'un ensemble de noeuds mineurs permet de hasher et de résoudre les blocs plus rapidement, et les participants reçoivent un flux régulier de bitcoins pour leur contribution. Un peu comme si au lieu de jouer au loto tout seul, vous jouiez avec un ensemble de personnes: vous gagnez moins (puisque les gains sont distribués) mais plus souvent.

* Il existe de nombreux serveurs de pool mining en ligne. Le serveur requiert la création d'un compte, la transaction coinbase sera adressée au serveur pool, et si un bloc est miné avec succès, alors l'argent récolté est redistribué aux différents participants — et la plupart des serveurs gardent un pourcentage de la récompense pour leur service.

* Il est important de choisir le serveur de pool mining avec soin: 1. qu'il soit honnête, 2. qu'il soit sécurisé — ces serveurs sont souvent la cible de malwares.

## Minage en ligne

* Bitcoinplus.com est un site qui permet aux visiteurs de générer des hash grâce à une applet Java intégrée dans le navigateur. Un utilisateur peut créer un compte sur le site et

  1. envoyer le lien à d'autres utilisateurs pour qu'ils génèrent des hash pour lui — le lien dirige le navigateur d'un utilisateur vers la page du générateur Bitcoin Plus, avec l'ID de l'expediteur spécifié dans le lien:

     ``` txt
     http://www.bitcoinplus.com/generate?for=&lt;userID&gt;
     ```

  2. intégrer du JavaScript sur son site web pour permettre aux visiteurs du site de générer des hash pour lui.

* À l'évidence, ce service a déjà utilisé de manière abusive, à l'insu des visiteurs. Sous Firefox, il est possible de désactiver les mineurs de cryptomonnaie: Préférences > Vie privée et sécurité > Personnalisée
