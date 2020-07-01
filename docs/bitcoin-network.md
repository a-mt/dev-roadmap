---
title: Réseau
category: Other, Bitcoin
---

## Découverte des pairs

Lorsqu'un client Bitcoin est lancé, il va se connecter à un ensemble de pairs pour télécharger les transactions qui ont été validées pendant son absence (autrement dit, télécharger les derniers blocs de la blockchain) et va ensuite participer au réseau — écouter les connections entrantes qui signalent de nouvelles transactions, celles qui demandent la liste des transactions effectuées pendant leur absence, etc. Pour trouver des pairs, les clients ont différentes méthodes:

1. Plusieurs pairs fiables sont enregistrés dans des enregistrements DNS <sup>[[1]](https://github.com/bitcoin/bitcoin/blob/master/src/chainparams.cpp#L116)</sup>. Un client obtient les adresses IP de ces pairs en lançant un nslookup et avec un peu de chance l'une d'entre elles marchera.

2. Au besoin, une liste pairs est hard-codée dans le client <sup>[[2]](https://github.com/bitcoin/bitcoin/blob/master/src/chainparamsseeds.h)</sup>.

3. Lorsqu'au moins un pair a été trouvé, le client peut envoyer une requête `getaddr` à ce pair pour récupérer la liste des pairs qu'il connait et qui sont en ligne.

Liste complète des méthodes utilisées:  
[Satoshi Client Node Discovery](https://en.bitcoin.it/wiki/Satoshi_Client_Node_Discovery)

Pour aller plus loin:  
[Fallback Nodes](https://en.bitcoin.it/wiki/Fallback_Nodes)

## Synchronisation de la blockchain

* Lorsque Bitcoin Core démarre, il établit 8 connexions sortantes vers d'autres noeuds complets du réseau pour télécharger (et vérifier) les derniers blocs de la blockchain.

  * <ins>&rarr; getheaders</ins>  
    Le noeud choisit un pair au hasard et lui envoie le message `getheaders`, avec en entête le hash du dernier bloc connu. S'il rejoint le reseau pour la première fois, le noeud ne connait qu'un seul bloc: le bloc genèse (bloc 0), qui est hard-codé dans le client Bitcoin.

  * <ins>&larr; headers</ins>  
    Le pair choisit répond avec un message `headers` qui contient les entêtes des 2000 blocs suivant le dernier bloc connu. Exemple d'entête en hexadécimal:

    ``` txt
    02000000 ........................... Block version: 2

    b6ff0b1b1680a2862a30ca44d346d9e8
    910d334beb48ca0c0000000000000000 ... Hash of previous block's header
    9d10aa52ee949386ca9385695f04ede2
    70dda20810decd12bc9b048aaab31471 ... Merkle root

    24d95a54 ........................... [Unix time][unix epoch time]: 1415239972
    30c31b18 ........................... Target: 0x1bc330 * 256**(0x18-3)
    fe9f0864 ........................... Nonce
    ```

    Le *merkle root* est le hash des transactions, comme on le verra dans la partie Minage.

  * Si la réponse contient moins de 2000 entêtes, le noeud envoie un message `getheaders` à chacun de ses pairs sortants pour comparer les réponses. La meilleure chaîne (la plus longue ayant un consensus d'au moins 51%) sera retenue.

  * <ins>&rarr; getdata, &larr; block</ins>  
    Pour récupérer le contenu des différents blocs (c'est à dire la liste des transactions qu'ils contiennent), le noeud envoi un message `getdata` aux différents pairs, qui répondent avec un message `block`.

    Pour répartir la charge, un noeud peut demander au maximum 16 blocs à la fois à un pair donné. La file d'attente de blocs en cours de téléchargement peut donc aller jusqu'à 128 blocs à la fois (8*16). 

    Le noeud télécharge chaque bloc, le valide, puis demande le bloc suivant — en maintenant une file d'attente pouvant aller jusqu'à 128 blocs à la fois. Lorsque tous les blocs connus sont téléchargés et vérifiés, le noeud envoie un nouveau message `getheaders` et ainsi de suite, jusqu'à avoir téléchargé entièrement la blockchain.

  * <ins>Bitcoin Core &lt; 0.9.3</ins>    
    Bitcoin Core utilisait avant les messages <code>&rarr; getblocks</code> et <code>&larr; inv</code> à la place de <code>&rarr; getheaders</code> et <code>&larr; headers</code>.

    `getblocks` demande une réponse `inv`. `inv` comprend jusqu'à 500 *hash*.  
    `getheaders` demande une réponse `headers`. `headers` comprend jusqu'à 2000 *entêtes*.  
    Avec `headers`, chaque bloc peut être partiellement validé avant d'avoir à télécharger les données qu'il contient.

* La blockchain est stockée dans des fichiers (exemple: `blk0001.dat`) situés dans le répertoire Bitcoin .  
  L'emplacement par défaut de ce répertoire dépend du système d'exploitation utilisé:

  | OS               | Répertoire
  |---               |---
  | WinXP            | %APPDATA%\Bitcoin\
  | Windows Vista /7 | %APPDATA%\Roaming\Bitcoin\
  | Linux            |	~/.bitcoin/
  | Mac              |	~/Library/Application Support/Bitcoin/

* La blockchain contient la liste de toutes les transactions qui ont eu lieu dans le système depuis la première transaction initiée par Nakamoto, elle pèse 195GB au moment de l'écriture de cet article.  
  Le téléchargement initial de la blockchain peut ainsi prendre plusieurs jours, durant lesquels la bande passante est fortement utilisée (puisque chaque bloc doit être téléchargé), de même que le CPU (puisque chaque bloc doit être vérifié), en plus de prendre de plus en plus de place sur le disqur dur.

* Le processus de synchronisation de la blockchain est appelé *Initial Block Download* (IBD) et est répété à chaque fois que le client Bitcoin Core est lancé.

  Tant le client n'a pas entièrement synchronisé la blockchain (téléchargé et vérifié tous les blocs) alors il est possible que les dernières transactions liées au compte ne soient pas visibles et donc que le solde du portefeuille ne soit pas à jour.

Pour aller plus loin:  
[Entêtes](https://developer.bitcoin.org/reference/block_chain.html#block-headers)  
[Bitcoin P2P Network](https://developer.bitcoin.org/devguide/p2p_network.html)  
[Protocol documentation](https://en.bitcoin.it/wiki/Protocol_documentation) / [RPC API Reference](https://developer.bitcoin.org/reference/rpc/index.html).

## Relai des transactions

* Lorsqu'un pair crée une transaction, il envoie un message <code>&rarr; inv</code> à ses pairs sortants. À réception, les pairs voulant relayer les transactions répondent par un <code>&larr; getdata</code> et reçoivent le corps de la transaction avec le message <code>&rarr; tx</code>.

* Avant de relayer la transaction aux autres pairs, chaque pair vérifie que la transaction est bien valide.

  * Aucune des entrées ou sorties n'est vide et la somme des entrées est supérieure ou égale à la somme des sorties.

  * Les sorties de la transaction sont *standard*. Suite à la découverte de bugs dangereux <sup>[[1]](https://learnmeabitcoin.com/guide/script#hash-collision-puzzle)</sup>, des tests ont été ajoutés à Bitcoin Core pour n'accepter que les transactions utilisant des scripts Pubkey et Signature considérés comme sûr. Il s'agit du test `isStandard`. Sont considérés comme standard P2PKH, P2SH, Multisig, Pubkey et Null Data <sup>[[2]](https://developer.bitcoin.org/devguide/transactions.html#standard-transactions)</sup>.

  * Depuis Bitcoin Core 0.9.3, les transactions standard doivent également valider les conditions suivantes <sup>[[3]](https://developer.bitcoin.org/devguide/transactions.html#non-standard-transactions)</sup>:

    * Tous les numéros de séquence des entrées sont égaux à 0xffffffff ou le locktime de la transaction est dans le passé (temps écoulé ou numéro de bloc inférieur au bloc actuel)

    * La taille de la transaction est inférieure à 100 000 octets. C'est environ 200 fois plus qu'une transaction P2PKH typique à une entrée et une sortie.

    * Chaque signature est inférieure à 1 650 octets. C'est assez pour une transaction P2SH utilisant 15 clés publiques compressées

    * Chaque script Pubkey nécessite au maximum 3 clés publiques (transaction multi-signature non P2SH)

    * Chaque entrée est un script Signature qui ne fait que pousser (PUSHDATA ou OP_PUSHDATA) des données vers la pile mémoire

    * Chaque sortie vaut minimum 1/3 de ce qu'il faudrait dépenser pour transférer les bitcoins à quelqu'un d'autre. Actuellement, cela fait minimum 546 satoshis — sauf pour les transactions null data, qui doivent recevoir 0 satoshis.

  * La transaction ne doit pas prendre pour entrée une transaction/sortie qui a déjà été utilisée.  
    Pour ce faire, chaque noeud complet crée indépendemment une *liste UTXO* (*UTXO set*), c'est à dire la liste des transactions non dépensées, à partir de la blockchain <sup>[[4]](https://bitcoin.stackexchange.com/questions/96635/basic-question-about-transaction-verification#answer-96641)</sup>. Si une des entrées n'est pas dans cette liste, alors elle est rejetée.

  * La transaction ne doit pas prendre pour entrée une transaction/sortie qui est déjà référencée dans la mempool.

  * Pour chaque entrée, le script Signature est évalué, suivit du script Pubkey de la sortie référencée (identifiée par txid/vout). Le script Pubkey utilise les valeurs laissées dans la pile par le script Signature. L'entrée est validée si le script retourne vrai <sup>[[5]](https://developer.bitcoin.org/devguide/transactions.html#p2pkh-script-validation)</sup>. Pour rappel, le format d'une transaction est comme suit:

    ![](https://i.imgur.com/Pv9Jtpj.png)

* Si la transaction n'est pas valide, alors les pairs ne la diffuseront pas et elle ne sera pas minée. Les transactions exclues ont leur hash sauvegardé en mémoire pour qu'elles ne soient pas téléchargées encore et encore.

* Si la transaction est valide, alors les pairs vont la relayer à leurs propres pairs sortants — en utilisant la même méthode (<code>&rarr;inv</code>, <code>&larr;getdata</code>, <code>&rarr;tx</code>) — et ainsi de suite.

Pour aller plus loin:  
[OpCheckSig](https://en.bitcoin.it/w/images/en/7/70/Bitcoin_OpCheckSig_InDetail.png)  
[Protocol rules: tx](https://en.bitcoin.it/wiki/Protocol_rules#.22tx.22_messages)

## Mempool

* Les transactions ainsi validées et relayées ne sont pour l'instant pas ajoutées à la blockchain, elles sont simplement gardées en mémoire RAM par les différents noeuds, ce qu'on appelle une *memory pool* ou *mempool* (*mémoire mutualisée* en français).

* Une transaction n'est ajoutée dans la mempool que si elle est valide. Outre sa validité, il est possible de modifier les configurations du logiciel pour modifier le comportement de la mempool, et notamment choisir quelles transactions sont considérées comme acceptables ou non.

* Parmis les configurations par défaut les plus notables on a <sup>[[6]](https://en.bitcoin.it/w/index.php?title=Vocabulary#Memory_pool)</sup>:

   * La transaction doit inclure des frais de transaction (c'est à dire laisser une marge entre la somme des entrées et des sorties) dont la valeur est supérieure ou égale à 0.00001 BTC/kB (`mintxfee`).

   * Le mempool est sauvegardée lors des redémarrage des noeuds (`blkindex.dat`). Dans les anciennes versions, la mempool restait en RAM (d'où le nom *memory* pool) et était effacé si le noeud redémarrait.

   * La mempool prend maximum 300 Mo en mémoire. Si cette taille est dépassée, les transactions les moins chères par octet sont supprimées.

   * Une transaction qui se trouve dans la mempool depuis plus de 336 heures sans être ajoutée dans un bloc est supprimée.

   * (RBF, BIP125): Les transactions dans la mempool peuvent être remplacées par des versions ayant des frais plus élevés pourvu que l'augmentation soit d'au moins 1 satoshi/octet.

## Minage

* Le *minage* est le processus au cours duquel les transactions présentes dans la mempool (une partie d'entre elles du moins) sont rassemblées dans un bloc et le noeud mineur tente de trouver le nonce qui permettra de générer un hash de bloc valide. S'il y arrive, alors il diffuse le bloc sur le réseau et gagne ainsi la transaction coinbase à son attention.

* Les autres noeuds vérifient le bloc et l'ajoutent à la blockchain. Toutes les transactions confirmées par le bloc sont alors supprimées de la mempool. Les autres mineurs cessent d'essayer de trouver le hash de leur bloc et recommencent avec les transactions en attente de confirmation restantes.

## Validation du bloc

Pour vérifier que le bloc est bien valide, les noeuds vérifient les conditions suivantes (non exhaustif):

* La liste des transactions est non vide.
* La première transaction est une transaction coinbase, les autres sont des transactions tx.
* Chaque transaction du bloc est valide.
* Le hash du bloc est inférieur à la cible.

Si au moins 51% du réseau valide le bloc, alors un consensus a été atteint, et le bloc est considéré comme confirmé.

Pour aller plus loin:  
[Protocol rules: block](https://en.bitcoin.it/wiki/Protocol_rules#.22block.22_messages)

## Conflits

* Quand deux mineurs produisent simultanément un bloc à ajouter à la blockchain (les deux blocs ont donc le même parent et sont tous les deux valides), chaque noeud choisit individuellement le bloc accepté — généralement le premier reçu. Éventuellement, un mineur produira un nouveau bloc, avec pour parent un des deux bloc, rendant cette version de la blockchain plus longue que l'autre.

  ![](https://gistcdn.githack.com/a-mt/6c27524113a6cd70d281ef0e83685cc4/raw/1dcbcfd8be6fc46523eaacdff5d1aefb923ee6e7/en-blockchain-fork-normal.svg)

* Les pairs du réseau Bitcoin considèrent toujours que la chaîne la plus longue est la bonne. La raison est simple: la chaîne la plus longue est celle qui aura demandé le plus de travail et est donc la plus difficile à falsifier. Si quelqu'un est capable de créer une chaîne plus longue, le réseau est obligé d'accepter la nouvelle chaîne. Tous les blocs de l'ancienne chaîne qui ne sont pas dans la nouvelle chaîne deviennent *orphelins*.

  Les transactions que ces blocs contenaient peuvent soit devenir invalides (c'est le cas des transactions qui prennent en entrée des transactions déjà dépensées dans la nouvelle chaîne, ou qui utilisent une transaction coinbase supprimée), soit redevenir non confirmées.

* La non-répudiation d'une transaction n'est donc pas instantannée: un utilisateur peut voir qu'une transaction lui a été adressée et a été confirmée, et plus voir plus tard qu'elle n'est plus confirmée ou invalide. L'irréversibilité des transactions bitcoin reste cependant plus rapique que pour les systèmes existants: les transactions par carte de crédit peuvent contestées jusqu'à 60 ou 180 jours plus tard selon les banques, et les chèques peuvent rebondir jusqu'à une semaine ou deux plus tard.

* Une transaction bitcoin peut être considérée comme irréversible après une heure ou deux. De nombreux utilisateurs attendent qu'une transaction ait six blocs de profondeur (soit environ 1 heure) avant de l'accepter comme paiement — afin d'éviter les doubles-dépenses. Les clients affichent généralement une transaction comme "non confirmée" avant ces 6 confirmations.

* Une transaction coinbase ne peut pas être dépensée (utilisée comme entrée) pendant au moins 100 blocs, pour éviter qu'un mineur ne dépense la récompense d'un bloc qui pourrait plus tard être éliminée et donc limiter le nombre de transactions invalides créées — qui gaspillent inutilement la puissance de calcul des noeuds.

Pour aller plus loin:  
[Confirmation](https://en.bitcoin.it/wiki/Confirmation)

## Forks de la blockchain

* Pour maintenir le consensus, il faut que les noeuds complets valident les blocs en utilisant les mêmes règles. Il arrive que les règles changent — pour introduire de nouvelles fonctionnalités ou prévenir des abus. En attendant que tous les noeuds se mettent à jour, reste une période de latence pendant laquelle les noeuds non mis à jour utilisent les anciennes règles. Deux cas de figure se présentent alors:

  * <ins>Mise à jour avec rétro-compatibilité</ins>  
    Exemple: les noeuds de la blockchain limitent la taille d'un bloc à 1MB et après mise à jour, les noeuds la limitent à 500kB. Tous les blocs avec les nouvelles règles suivent également les anciennes règles, donc les anciens clients les acceptent. Il y a *rétro-compatibilité* (*backward compatibility*): on parle de *soft fork*.

    Pour qu'un soft fork fonctionne, il faut que la majorité des noeuds soient mis à jour.

  * <ins>Mise à jour sans rétro-compatibilité</ins>  
    Exemple: Les noeuds de la blockchain parlent l'anglais et après mise à jour, les mineurs parlent l'espagnol. Les deux côtés se rejettent mutuellement, on parle alors de *hard fork*.

    Les hard fork mènent à la création de deux blockchain distinctes, qui, si non résolu, peuvent émerger comme des projets distincts. Ça a par exemple mené à la création de [Bitcoin Cash](https://fr.wikipedia.org/wiki/Bitcoin_Cash) (BCC) en 2017, un projet désormais distinct de Bitcoin (BTC).

Pour aller plus loin:  
[Hard Fork vs Soft Fork Explained](https://changelly.com/blog/hard-soft-forks-explained/)
