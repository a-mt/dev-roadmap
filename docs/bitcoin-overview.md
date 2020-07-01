---
title: Fonctionnement de Bitcoin
category: Other, Bitcoin
---

## En bref

* Bitcoin est un système de paiement électronique décentralisé, utilisant une blockchain stockée sur un réseau peer-to-peer pour enregistrer les transactions.

* Les utilisateurs Bitcoin peuvent s'envoyer de l'argent sans passer une institution financière pour sécuriser et vérifier la validité des transactions. Cette validation est effectuée par les noeuds participant au réseau P2P Bitcoin.

* Les échanges ne se font pas en dollars ni en euros mais en bitcoins, une monnaie virtuelle. On dit qu'il s'agit d'une *cryptomonnaie*, car la détente et l'échange de cette monnaie ne repose pas sur la confiance en des institutions (les banques / le gouvernement) mais sur la cryptographie.

* La détention de bitcoins n'est pas matérialisée par une pièce ou un billet mais par l'inscription sur un registre partagé — la blockchain Bitcoin.

  Un explorateur en ligne de la blockchain Bitcoin est disponible ici: [Blockchain Explorer](https://www.blockchain.com/explorer)

* Bitcoin a pour but d'accroître la confidentialité des transactions financières, tout en diminuant le coût et le risque lors de l'exécution de ces transactions.

## Unité

Le prix d'échange du bitcoin (BTC) avec le dollar américain (USD) étant élevé — 1 BTC &approx; 10 000 USD — les transferts de bitcoins ne se font généralement pas à l'unité mais en fraction de bitcoin. Pour cette raison, on exprime généralement le solde du compte et le montant des transactions non pas en bitcoins mais en satoshis (sat):

* 1 sat = 0,00000001 BTC (1 ⋅ 10<sup>-8</sup> BTC).
* 1000 sat = 1 kilo satoshi (1 ⋅ 10<sup>-5</sup> BTC).


| Bitcoins | Unité (Abbréviation)
|---  |---
| 1.0 | bitcoin (BTC)
| 0.01 | bitcent (cBTC)
| 0.001 | millibitcoin (mBTC)
| 0.000001 (10<sup>-6</sup>) | microbitcoin (uBTC, “bits”)
| 0.0000001 (10<sup>-7</sup>) | finney
| 0.00000001 (10<sup>-8</sup>) | satoshi (sat)

## Le réseau Bitcoin

* Pour s'échanger des Bitcoins, il faut commencer par accéder au réseau Peer-to-peer Bitcoin.  
  Pour accéder au réseau, on utilise un client Bitcoin.

* En interne, le réseau Bitcoin utilise le protocole JSON-RPC pour toutes ses communications réseaux.  
  Il existe [différents clients Bitcoin](https://en.bitcoin.it/wiki/Clients), lesquels peuvent implémenter plus ou moins partiellement le protocole Bitcoin.

  - Toute machine se connectant au réseau Bitcoin est un *noeud* du réseau (*node* en anglais), capable de recevoir et d'envoyer des bitcoins.

  - Un noeud est dit *complet* (*full node* en anglais) lorsqu'il télécharge entièrement la blockchain et vérifie la validité des transactions et blocs. La plupart des noeuds complets s'occupent également de transmettre les transactions du réseau aux autres noeuds complets. Si le nombre de noeuds remplissant cette fonction est insuffisant, alors les transactions ne peuvent plus être transmises via le réseau peer-to-peer.  
    Bitcoin Core est le logiciel le plus populaire <sup>[[1]](https://bitcoinchain.com/nodes)</sup> pour faire tourner un noeud complet.

  - Un noeud est dit *mineur* (*miner node* en anglais) lorsqu'en plus de stocker la blockchain il s'occupe de *miner* les blocs, c'est à dire de calculer la preuve de travail (le nonce).  
    BFGMiner est le logiciel le plus populaire pour faire tourner un noeud mineur (ou Eloipool pour un pool).

  - Les clients qui ne permettent que d'échanger des bitcoins / lister les transactions du réseau, sont dits *portefeuille* (*wallet* en anglais).

    Les clients qui n'implémentent que partiellement le protocole Bitcoin sont généralement convaincus que 50% ou plus du réseau est honnête, ils ne vont donc pas stocker ni vérifier les transactions de la blockchain, uniquement les entêtes des blocs. Ce type de noeud est dit *SPV Wallet* (pour *Simplified Payment Verification*).

    D'autres se basent sur un ou plusieurs serveurs de confiance et ne font donc pas partie à proprement parler du réseau Bitcoin. Ce type de noeud est dit *API Wallet*.

* Notons que les utilisateurs Bitcoin peuvent également stocker les données de leur portefeuille par d'autres moyens, par exemple en utilisant un site web qui se charge de stocker le portefeuille Bitcoin (en envoyant leurs bitcoins à une adresse Bitcoin générée par le site web), au lieu d'accéder directement au réseau Bitcoin sur leur machine. Cette méthode n'est pas recommandée, car plus d'une fois de tels sites ont volé leurs utilisateurs.

Pour aller plus loin:  
[Choose your Wallet](https://bitcoin.org/en/choose-your-wallet)  
[Wallet](https://en.bitcoin.it/wiki/Wallet)

[Running A Full Node](https://bitcoin.org/en/full-node#what-is-a-full-node)  
[Full node](https://en.bitcoin.it/wiki/Full_node)

## Fonctionnement du réseau

* Pour résumer grossièrement le fonctionnement du réseau, lorsqu'on se connecte au réseau Bitcoin pour la première fois, le client (logiciel Bitcoin) télécharge la blockchain à partir d'un ou plusieurs noeuds aléatoires, qui sont ni plus ni moins que d'autres clients connectés au réseau. Une fois la blockchain téléchargée, le client va à son tour fournir des données à d'autres noeuds.

* Lorsqu'on crée une transaction Bitcoin, le client l'envoie à un pair, qui l'envoie à d'autres pairs, et ainsi de suite, jusqu'à ce qu'elle ait atteint l'ensemble du réseau.

* Les noeuds mineurs récupèrent la transaction, avec l'ensemble des transactions en attente, et génèrent un bloc (avec pour données lesdites transactions). 

* Une fois généré, le bloc est envoyé au réseau, et relayé de pair à pair, jusqu'à ce qu'éventuellement 1. l'émetteur de la transaction reçoive également ce bloc et puisse constater que la transaction a bien été traitée, 2. le destinataire reçoive le bloc et puisse constater qu'il a reçu une transaction.

## Acquérir des bitcoins

Pour acquérir des bitcoins, il y a deux possibilités:

1. faire tourner un noeud mineur dans l'espoir d'être le premier à trouver un hash de bloc valide (et donc générer un bloc), ce qui est récompensé par des bitcoins.

2. acheter des bitcoins à quelqu'un qui vend les siens. Typiquement, on achète des bitcoins avec une carte de crédit en passant par un [site d'échange](https://en.bitcoin.it/wiki/Trading_bitcoins) bitcoins/dollars.

   La valeur réelle du bitcoin n'est pas fixe: elle a fluctué depuis la création du système, influencée par l'offre et la demande. Sa popularité croissante au fil des ans, l'attention des médias, son utilisation pour des activités criminelles, ainsi qu'un certain nombre d'incidents de sécurité ont fait fluctué son cours au fil du temps. La valeur du bitcoin peut également varier en fonction du marché utilisé.

   Les bitcoins achetés sur le marché peuvent ensuite être ajoutés dans son portefeuille Bitcoin et être utilisés sur le réseau.

Pour aller plus loin:  
[Bitcoin charts](https://www.blockchain.com/charts)  
[Bitcoin history price](https://en.bitcoinwiki.org/wiki/Bitcoin_history)

## TestNet vs MainNet

Bitcoin a deux réseaux peer-to-peer:

* *MainNet* (*main network*) est la blockchain Bitcoin de production, celle où de vraies transactions ont lieu, avec des bitcoins qui ont une valeur réelle — pouvant être convertie en dollars.

* *TestNet* (*test network*) est l'environnment de test. Ce réseau est utilisé par les développeurs et testeurs avant de publier leur application. Les transactions échangées sont des transactions de test, sans valeur réelle ni frais de transaction (ou de frais de déploiement dans le cas d'une dApp), les mineurs n'ont donc aucun intérêt économique à  tourner sur ce réseau.

![](https://i.imgur.com/7l4mnnF.jpg)

Pour aller plus loin:  
[Testnet](https://en.bitcoin.it/wiki/Testnet)
