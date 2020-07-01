---
title: Blockchain
category: Other
---

Dans de nombreuses situations, il est nécessaire de certifier la date de création ou de dernière modification d'un document. Par exemple, en matière de propriété intellectuelle, il est parfois crucial de vérifier la date à laquelle un inventeur a mis par écrit une idée brevetable, afin d'établir sa précédence sur des revendications concurrentes. Une méthode courante est de s'envoyer une lettre et de la laisser fermer — la date d'envoi de la lettre faisant foi. Mais comment garantir la date de création et l'intrégrité d'un document conservé sous forme numérique?

Une solution à ce problème est d'utiliser une *blockchain* (littéralement "chaîne de blocs"), qui est une liste de bloc liés chronologiquement et sécurisés avec des hash. Chaque bloc contient les données à sécuriser, un timestamp, le hash du bloc, le hash du bloc précédent, et un nonce.

``` python
from datetime import datetime
from hashlib import sha256

class Block:
  def __init__(self, data, previous_hash, nonce = 0):
    self.timestamp = datetime.now()
    self.previous_hash = previous_hash
    self.data = data
    self.nonce = nonce
    self.hash = self.generate_hash()

  # hash the blocks contents
  def generate_hash(self):
    block_contents  = str(self.timestamp) + str(self.data)
    block_contents += str(self.nonce) + str(self.previous_hash)

    block_hash = sha256(block_contents.encode())
    return block_hash.hexdigest()

  # prints block contents
  def print_block(self):
    print("timestamp:", self.timestamp)
    print("data:", self.data)
    print("current hash:", self.generate_hash())

```

### Les données à sécuriser

On peut stocker n'importe quel type de données. Dans le cas d'une crytomonnaie comme Bitcoin, il s'agira d'un ensemble de transactions.

### Un timestamp

C'est la date à laquelle le bloc a été créé. Ce timestamp détermine la position du bloc dans la chaîne de blocs.

### Le hash du bloc

On peut considérer un [hash](/crypto.md#hashing) comme une empreinte digitale: c'est une chaîne de caractères de longueur fixe, générée à partir de données en entrée. La même entrée produira toujours le même résultat, et différentes entrées produiront un résultat différent. Si les données du bloc changent, alors le hash change.

![](https://i.imgur.com/0XqqQO1l.png)

Il existe différents algorithmes de hashage (fonctions qui permettent de générer un hash), Bitcoin utilise SHA-256.

### Le hash du bloc précédent

Le hash du bloc précédent est également utilisé pour calculer le hash du bloc en cours.  
Ainsi, si on modifie un bloc dans l'historique, alors il faut modifier tous les blocs qui le suivent pour que la blockchain soit valide.

* Si on modifie les données du bloc n°2, alors il faut recalculer son hash pour le rendre valide.

* Si on modifie le hash du bloc n°2, alors il faut modifier le "hash précédent" du bloc n°3 pour rendre la blockchain valide.

* Si on modifie le "hash précédent" du bloc n°3, alors il faut recalculer son hash pour le rendre valide.

* Si on modifie le hash du bloc n°3, alors il faut modifier le "hash précédent" du bloc n°4, et ainsi de suite.

![](https://i.imgur.com/5v8an5K.png)

``` python
def validate_chain(self):
  for i in range(1, len(self.chain)):
    current  = self.chain[i]
    previous = self.chain[i-1]

    if current.hash != current.generate_hash():
      return False
    if previous.hash != previous.generate_hash():
      return False
  return True
```

Le premier bloc dans la chaîne est un peu spécial, puisqu'il n'a pas de bloc précédent. On appelle ce bloc le *bloc genèse* (*genesis block* en anglais). La valeur du bloc précédent le bloc genèse est hard-codée avec la valeur par défaut: zéro.

  <!--
  <table>
    <tr><th></th><th>Bloc #1</th><th>Bloc #2</th><th>Bloc #3</th></tr>
    <tr><th align="left">Données</th><td>Genesis Block</td><td>A</td><td>B</td></tr>
    <tr><th align="left">Timestamp</th><td>22/04/2020 à 18:37:33 0.319sec</td><td>22/04/2020 à 18:37:37 0.583sec</td><td>22/04/2020 à 18:37:41 0.688sec</td></tr>
    <tr><th align="left">Hash précédent</th><td>0000</td><td>IZ8F</td><td>6BQI</td></tr>
    <tr><th align="left">Hash</th><td>IZ8F</td><td>6BQI</td><td>3H4Q</td></tr>
  </table>
  -->

### Un nonce

* Utiliser des hash ne suffit pas pour éviter des modifications sur une blockchain: les ordinateurs sont très rapides et peuvent calculer des centaines de milliers de hash par seconde. On pourrait donc modifier un bloc et recalculer tous les hashs des blocs qui suivent pour rendre la chaîne valide.

  Pour éviter ça, on ajoute une difficulté: il faut résoudre un problème mathématique qui prend du temps. Par exemple, trouver un nombre qui, combiné au contenu du bloc, produit un hash dont les 4 premiers chiffres sont "0".

  ``` python
  def proof_of_work(self, block, difficulty=4):
    proof = block.generate_hash()

    while proof[:difficulty] != "0"*difficulty:
        block.nonce += 1
        proof = block.generate_hash()

    block.nonce = 0
    return proof
  ```

* Le *nonce* (number used once), c'est le nombre qui résout le problème. Si le nonce est résolu trop rapidement, alors on peut augmenter la difficulté (le nombre de zéro qu'il faut trouver en début de chaine), de tel sorte que résoudre le problème prenne toujours du temps. Dans le cas de Bitcoin, il faut environ 10 minutes pour calculer le nonce et ainsi pouvoir ajouter un bloc à la chaîne.

  Le nonce prend du temps à calculer mais est très rapide à vérifier: il suffit de vérifier qu'avec le nonce, le hash commence bien par *x* 0 (où *x* est la difficulté). On appelle ce mécanisme une *preuve de travail* (*proof of work* en anglais).

* Si on voulait falsifier un bloc, il faudrait calculer le nonce pour le bloc altéré ainsi que tous les blocs qui le suivent. Pendant ce temps, de nouveaux blocs sont ajoutés à la chaîne, dont il faudrait également calculer le nonce pour que la blockchain soit valide. Dans un scénario où de nouveaux blocs sont constamment ajoutés à la blockchain, ce serait une course impossible: si un bloc est falsifié, la blockchain ne sera jamais de nouveau valide.

### Exemple

En Python, une blockchain très simple pourrait être implémentée comme suit:

``` python
#imports the Block class from block.py
from block import Block

class Blockchain:
  def __init__(self):
    self.chain = []
    self.genesis_block()

  # create the first block
  def genesis_block(self):
    block = Block([], 0)
    self.chain.append(block)

  # prints the contents of the blockchain
  def print_blocks(self):
    for i in range(len(self.chain)):
      current_block = self.chain[i]
      print("Block {} {}".format(i, current_block))
      current_block.print_contents()

  # add a block to the blockchain
  def add_block(self, data):
    previous_block_hash = self.chain[len(self.chain)-1].hash
    new_block = Block(data, previous_block_hash)

    proof = self.proof_of_work(new_block)
    self.chain.append(new_block)
    return (proof, new_block)

  # check that the hash and previous hash 
  # of all blocks in the chain are valid
  def validate_chain(self):
    for i in range(1, len(self.chain)):
      current  = self.chain[i]
      previous = self.chain[i-1]

      if current.hash != current.generate_hash():
        return False
      if previous.hash != previous.generate_hash():
        return False
    return True

  # find the nonce
  def proof_of_work(self, block, difficulty=4):
    proof = block.generate_hash()

    while proof[:difficulty] != "0"*difficulty:
        block.nonce += 1
        proof = block.generate_hash()

    block.nonce = 0
    return proof
```

``` python
from blockchain import Blockchain

_b = Blockchain()
_b.add_block("A")
_b.add_block("B")
_b.add_block("C")
_b.add_block("D")
print(_b.validate_chain())

_b.chain[2].data = "I cheated"
print(_b.validate_chain())
```
