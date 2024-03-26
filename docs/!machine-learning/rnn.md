---
title: Recurrent Neural Network
category: Machine learning, algo
latex: true
---

## RNN

### Qu'est-ce que c'est

* Un réseau neuronal traditionnel traite une entrée puis passe à la suivante sans tenir compte de l'ordre dans lequel elles arrivent — chaque entrée est censée être indépendante des autres.

  A contrario, un réseau neuronal récurrent (RNN) prend en compte l'entrée actuelle et la sortie de l'entrée précédente. De cette manière, chaque entrée dépendra également de celles passées auparavant.

  ![](https://i.imgur.com/WYChttS.png)

* Un domaine où les RNN sont particulièrement utiles est le traitement du language naturel — puisque la signification d'un mot dépend fortement de son emplacement par rapport aux autres (ex négation).

### Types de RNN

![](https://i.imgur.com/xHLpVG1.jpg)

* <ins>One to One</ins>  
  A une seule entrée et une seule sortie.  
  Ex: Classification d'une image

* <ins>One to Many</ins>  
  Une seule entrée, plusieurs sorties.  
  Ex: Générer le titre d'une image

* <ins>Many to One</ins>  
  Plusieurs entrées, une seule sortie.  
  Ex: Analyse du sentiment d'un texte

* <ins>Many to Many</ins>  
  Plusieurs entrées, plusieurs sorties.  
  Ex: Traduction automatique

### Forward Propagation

* Dans un RNN, il y a deux sorties différentes:
  * une qui ira à l'unité suivante (le résultat de la fonction d'activation) — a<sub>t</sub>
  * et une qui sera la sortie finale (la prédiction) de l'unité — y<sub>t</sub>.

  $$
  \begin{aligned}
  a_t &= \text{tanh}( a_{t-1} W_a + x_t W_x + b_a ) \\
  y_t &= \text{sigmoid}( a_t W_y + b_y )
  \end{aligned}
  $$

  ![](https://i.imgur.com/2vdQdUyl.png)

  On a donc 3 poids différents:
  * un appliqué sur les entrées de l'itération *t* (W<sub>x</sub>),
  * un appliqué sur l'activation de l'itération *t-1* prise en entrée à l'itération *t* (W<sub>a</sub>),
  * et un appliqué sur la sortie de l'itération *t* (W<sub>y</sub>)

  La sortie *y* de la dernière itération, sera la prédiction finale.

### Back Propagation

* Les poids sont mis à jour en utilisant la règle de dérivation en chaîne.

  $$
  \begin{aligned}
  L &= (y - \bar{y})^2 \\[10pt]

  \frac{dL}{dW_y} &= \frac{dL}{d\bar{y}} \frac{d\bar{y}}{dW_y} \\[10pt]


  \frac{dL}{dW_x} &= \sum_{i=1}^N \frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_i} \left( \prod_{j=i+1}^N \frac{da_j}{da_{j-1}} \right) \frac{da_i}{dW_x} \\

  &= (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{dW_x}) \\
  & + (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{da_2} \frac{a_2}{W_x}) \\
  & + (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{da_2} \frac{a_2}{a_1} \frac{da_1}{dW_x}) \text{ si N=3}\\[10pt]


  \frac{dL}{dW_a} &= \sum_{i=1}^N \frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_i} \left( \prod_{j=i+1}^N \frac{da_j}{da_{j-1}} \right) \frac{da_i}{dW_a} \\

  &= (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{dW_a}) \\
  & + (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{da_2} \frac{a_2}{W_a}) \\
  & + (\frac{dL}{d\bar{y}} \frac{d\bar{y}}{da_3} \frac{da_3}{da_2} \frac{a_2}{a_1} \frac{da_1}{dW_a}) \text{ si N=3}\\[10pt]
  \end{aligned}
  $$

  ![](https://i.imgur.com/MXvVd8l.png)

### Problèmes des RNN

* Le problème c'est que si le nombre d'itérations du RNN est important, alors la dérivée peut devenir très large — puisqu'on additionne mais on ne soustrait jamais — et le gradient descent devient instable et ne parvient plus à apprendre des données (*exploding gradient*).

  Ou la dérivée peut devenir très petite — puisqu'on multiplie la dérivée de chaque itérations entre elles — et le gradient descent devient alors très long et ne parvient plus à converger (*vanishing gradient*).

* Un autre problème, c'est que RNN peut perdre le contexte de la phrase si les phrases sont trop longues.

  Ex:   
  1/ Je suis français et j'habite en ... Le RNN prédit le bon mot (France)

  2/ Je suis français, j'ai voyagé à travers le monde, mais maintenant je suis de nouveau en ... Le RNN échoue puisqu'il a perdu l'information "français"

---

## Long Short-Term Memory (LSTM)

* Un réseau neuronal Long Short-Term Memory (LSTM) est une version modifiée du RNN qui permet de résoudre les problèmes liés au RNN.

* Si pour prendre un rendez-vous, vous devez faire de la place dans votre planning, vous annulerez en priorité ce qui n'est pas important. Sur le même principe, LSTM essaie de garder les informations importantes au fil des itérations et oublier ce qui est moins important — là où un RNN, lui, transforme complètement l'information existante à chaque ajout d'information.

  * **RNN**:

    ![](https://i.imgur.com/ofLNE8Cl.png)

  * **LSTM**:

    ![](https://i.imgur.com/3KFPkXnl.png)

### Comment ça marche

* Pour se souvenir ou oublier sélectivement des informations, LSTM garde en mémoire un *état* (*cell state* en anglais), noté C, qui est un vecteur passé d'une itération à l'autre.

  ![](https://i.imgur.com/PDMi3NPl.png)

  Les différentes itérations vont venir modifier cet état, en ajoutant ou en enlevant des informations, avant de retourner le résultat en fonction des entrées et de l'état en cours.

* LSTM repose sur 3 différentes *portes* (*gates* en anglais).

  * <ins>Forget gate</ins>: décide des informations à oublier.  
    Applique la fonction sigmoid sur a<sub>t-1</sub> et x<sub>t</sub> (ce qui produit un nombre entre 0 et 1).  
    Un 1 signifie "garder complètement cette info" et 0 "oublier complètement".

    $$
    C = C \cdot sigmoid(W_f \cdot [a_{t-1}, x_t] + b_f)
    $$

  * <ins>Input gate</ins>: décide des informations à ajouter ou modifier.  
    Applique la fonction sigmoid et tanh sur a<sub>t-1</sub> et x<sub>t</sub>

    $$
    \begin{aligned}
    C = C + (sigmoid&(W_i \cdot [a_{t-1}, x_t] + b_i) \\
          \times tanh&(W_c \cdot [a_{t-1}, x_t] + b_c))
    \end{aligned}
    $$

  * <ins>Output gate</ins>: décide des informations à retourner.  
    Applique la fonction sigmoid sur a<sub>t-1</sub> et x<sub>t</sub>

    $$
    a_t = C \cdot sigmoid(W_a \cdot [a_{t-1}, x_t] + b_a)
    $$

  La fonction sigmoid est utilisée pour filtrer, la fonction tanh pour ajouter ou modifier.

<details>
<summary>python</summary>

<pre lang="python">
from keras.layers import LSTM, Activation, Dense, Dropout, Input, Embedding
from keras.callbacks import EarlyStopping

def RNN():
  i = Input(name='inputs',shape=[max_len])
  x = Embedding(max_words,50,input_length=max_len)(i)

  x = LSTM(64)(x)
  x = Dense(256,name='FC1')(x)
  x = Activation('relu')(x)
  x = Dropout(0.5)(x)
  x = Dense(1,name='out_layer')(x)
  x = Activation('sigmoid')(x)
  model = Model(inputs=i,outputs=x)
  return model

model = RNN()
model.summary()
model.compile(loss='binary_crossentropy',optimizer=RMSprop(),metrics=['accuracy'])

r = model.fit(
  sequences_matrix, Y_train,
  batch_size=128,
  epochs=10,
  validation_split=0.2,
  callbacks=[EarlyStopping(monitor='val_loss',min_delta=0.0001)])

plt.plot(r.history['loss'], label='loss')
plt.plot(r.history['val_loss'], label='val_loss')
plt.legend()
</pre>
</details>

---

## Gated Recurrent Unit (GRU)

* GRU est plus simple que LSTM:

  * il utilise la sortie de l'unité précédente plutôt que de garder un état indépendant

  * il combine forget gate et input gate en un seul "update gate"

  $$
  \begin{aligned}
  c_t &= sigmoid(W_z \cdot [a_{t-1}, x_t] + b_z) \\[10pt]

  u_t &= sigmoid(W_u \cdot [a_{t-1}, x_t] + b_u) \\[10pt]

  a_t &= (1 - c_t) \cdot a_{t-1} \\
      &+ c_t \cdot tanh(W_a \cdot [u_t \cdot a_{t-1}, x_t] + b_a)
  \end{aligned}
  $$

  ![](https://i.imgur.com/AU8tENEl.png)

<!--
http://dprogrammer.org/rnn-lstm-gru

https://colah.github.io/posts/2015-08-Understanding-LSTMs/

https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks

https://stackoverflow.com/questions/43034960/many-to-one-and-many-to-many-lstm-examples-in-keras
-->