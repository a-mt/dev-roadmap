---
title: Convolutional Neural Network
category: Machine learning, algo
latex: true
---

* Les réseaux neuronaux convolutionnel (abbrégé CNN ou convnet) sont un type de réseau neuronal utilisé pour le traitement d'image, notamment pour des problèmes de classification d'image. Un CNN est simplement un réseau neuronal artificiel auquel on a ajouté un nouveau type de couches: des couches de convolutions.

## Convolution

* Une convolution de deux matrices est la somme des produits élément par élément.

  ```
    [0,0,0,1,1,1,0,0,0] * [-1,-1,-1,2,2,2,-1,-1,-1]

  = 0*-1 + 0*-1 + 0*-1 + 1*2 + 1*2 + 1*2 + 0*-1 + 0*-1 + 0*-1
  = 0 + 0 + 0 + 2 + 2 + 2 + 0 + 0 + 0
  = 6
  ```

  Formellement, la définition d'une convolution est comme suit:

  $$
  Z(i,j) = \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} X(m,n) Y(i-m,i-n)
  $$

  Ici le filtre est inversé (on récupère l'index i-m et non m) mais ça revient au même.

* On peut considérer une convolution comme un filtre. Si on veut détecter la présence d'un trait horizontal dans une image, on calculera le produit scalaire (somme pondérée) de l'image avec le filtre "trait horizontal", et le résultat nous indique dans quelle mesure ces deux éléments sont similaires.

  ![](https://i.imgur.com/WOKb93Ml.png)
  ![](https://i.imgur.com/PwiUVXkl.png?1)

* Une convolution ne peut être calculée qu'entre deux matrices de même dimension.  
  Avec une image de dimension quelconque, on fera "glisser" le filtre de haut en bas, de gauche à droite (*sliding window* en anglais).

  ![](https://i.imgur.com/aVEEk03.gif)

* L'image qui résulte d'une convolution, appelé *feature map* (carte des caractéristiques en français) est en quelque sorte une image simplifiée, dans laquelle ne reste plus que les éléments recherchés — comme par exemple des traits horizontaux ou verticaux.

  ![](https://i.imgur.com/A5Y4Ip0.png)

  [Convolutions.ipynb](notebooks/Convolutions.html)  
  [Image convolution examples](https://www.aishack.in/tutorials/image-convolution-examples/)

* Après le filtre, la feature map passe à travers une fonction d'activation. ReLu nullifie les valeurs négatives.

  ![](https://i.imgur.com/JROHSZu.png)

## Couche de convolutions

Une couche de convolution seule ne permet pas de faire grand chose, mais en les associant, on peut apprendre des formes de plus en plus complexes. Dans le cas de la reconnaissance faciale par exemple:

* La première couche de convolutions détecte des formes très simples: des lignes et des courbes.

* La deuxième couche de convolutions détecte des associations de lignes/courbes, ce qui lui permet de reconnaître des parties du visage: oeil, nez, menton, etc.

* La troisième couche de convolutions rassemble différentes parties et essaie de détecter différents types de visage.

![](https://i.imgur.com/1RreZKW.png)

## Pooling

* Pour pouvoir apprendre des motifs de plus en plus complexes, on réduit la taille de l'image au fur et à mesure des couches. Les filtres, eux, restent de la même taille et c'est ce qui permet au modèle de trouver des motifs de plus en plus larges.

  ![](https://i.imgur.com/o8ZcBPO.png)

* L'image est réduite via une opération de *pooling* (groupement en français). Le pooling consiste à prendre un ensemble de pixels, généralement 2×2, et d'aggréger leur valeur en utilisant soit min, max ou la moyenne. Avec un pooling de 2×2, la feature map obtenue sera 2× plus petite.

  ![](https://i.imgur.com/qoOb71w.png)

* Pourquoi réduire l'image et non pas utiliser des filtres plus larges?

  1. C'est plus pratique: si on réduit l'image, on réduit les calculs à effectuer.

  2. On souhaite l'*invariance translationnelle* du modèle (*translational invariance* en anglais): on veut pouvoir détecter un visage même lorsqu'une personne est légèrement tournée vers le haut ou le bas (translation rotationnelle) ou a bougé dans l'image (translation de localisation). L'endroit où se situe le visage ne nous importe pas, uniquement qu'il s'agit d'un visage.

     En réduisant l'image, on supprime une partie des informations de position. La conséquence, c'est qu'un CNN aura tendance à ne pas distinguer les caractéristiques par leur emplacement dans l'image.

     ![](https://i.imgur.com/6DEZEFI.png)

* Au fur et à mesure des couches, les images sont simplifiées et réduites tandis que la liste des caractéristiques détectées augmente.

## Padding

* <ins>Mode: valid</ins>  
  Le mouvement du filtre est limité par les bords de l'image. Les dimensions de la feature map sont donc plus petites que l'image originale — (N-K+1)

  ![](https://i.imgur.com/QjQdQLg.png)

* <ins>Mode: full</ins>  
  Pour un filtre de dimension K×K,
les pixels au centre de l'image seront vus K² fois tandis que le pixels situés sur les bords ne seront vus entre 1 et K fois suivant leur position. La conséquence: le modèle y accorde moins d'importance et peut ne pas détecter les formes situées sur les bords.

  Pour que chaque pixel ait autant d'importance quelle que soit sa position, on peut ajouter une bordure autour de l'image. Avec une bordure de K-1 de chaque côté, tous les pixels auront la même importance.

  L'inconvénient: les dimensions de la feature map seront plus grande que l'image originale — (N+K-1). Il est relativement rare d'utiliser ce type de padding, puisqu'on complexifie l'image alors qu'on cherche à faire l'inverse.

  ![](https://i.imgur.com/aSUgTomm.png)

* <ins>Mode: same</ins>  
  Un bon compromis entre les deux est d'ajouter une petite bordure (K/2-1), de sorte que la feature map et l'image soient de même dimension — (N)

  ![](https://i.imgur.com/W3orCCDm.png)

## Stride

* Le pas (*stride* en anglais), c'est de combien on déplace le filtre pour parcourir l'image.  
  Plus le pas est grand, plus la feature map sera petite.

  ![](https://i.imgur.com/smJYiJzt.png)
  ![](https://i.imgur.com/sXcp0oZt.png)

* On peut remplacer une convolution suivit d'un max-pool,  
  par une convolution avec un plus grand pas — sans perte de précision.

  <br>

  ![](https://i.imgur.com/v4CcrKQl.png)

## Architecture

1. <ins>Convolutional base</ins>  
  Un CNN commence par une suite de convolutions.  
  On peut considérer cette phase comme une phase de détection des caractéristiques présentes dans l'image.

2. <ins>Dense head</ins>  
   Le résultat des convolutions est passé à un réseau neuronal artificiel classique,  
   qui utilise l'association de caractéristiques trouvées pour classifier l'image.

   ![](https://i.imgur.com/GU0Raewm.png)

## Flatten

* La base convolutionnelle retourne des données en 3D (height × width × feature maps) alors que le réseau neuronal dense attend des données en 1 dimension.

* Pour convertir un tableau 3D en 1D, on peut

  1. utiliser Flatten.  
     Problème: le réseau neuronal attend une taille fixe en entrée, alors que les images à classifier n'ont pas nécessairement toutes la même taille.

     ![](https://i.imgur.com/Swt9hKw.png)

  2. utiliser GlobalMaxPooling.  
     On passe d'une matrice de dimension H×W×C — ex [[0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0]] — a une matrice de dimension 1×1×C — ex [1,0,1].  
     On retourne la liste des caractéristiques trouvées et on perd l'information de position (les unes par rapport aux autres).

     ![](https://i.imgur.com/Uf2U1O0.png)

* Si on peut contrôler la taille des images en entrées, alors Flatten donnera de meilleures performances.

  ![](https://i.imgur.com/iWK83N4.png)

## En pratique

* Les convolutions, tous comme les poids du réseau articifiel standard, sont apprises via gradient descent.

* Les hyper-paramètres à définir:  
  * le taux d'apprentissage
  * la taille des filtres — typiquement 3×3, 5×5 ou 7×7
  * le nombre de couches
  * le nombre d'unités dans chaque couches — typiquement 32 &rarr; 64 &rarr; 128 &rarr; 128

* Si on commence avec une image de dimension 2×2, on ne peut pas la réduire de moitié 4 fois — une erreur sera levée. On rencontre ce genre de problème lorsqu'on ajoute trop de couches convolutionnelles au CNN ou si l'image en entrée est très petite.

<details>
<summary>python</summary>

<pre lang="python">
# Import libraries
import tensorflow as tf

from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt

# Import data
(train_images, train_labels), (test_images, test_labels) = datasets.cifar10.load_data()

train_images = train_images / 255.0
test_images  = test_images / 255.0

class_names  = ['airplane', 'automobile', 'bird', 'cat', 'deer',
               'dog', 'frog', 'horse', 'ship', 'truck']

# Create model
model = models.Sequential()

#> Convolutional base
model.add(layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(32, 32, 3)))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu', padding='same'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu', padding='same'))

#> Dense layers
model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(10))

#> Compiling
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Train
history = model.fit(train_images, train_labels, epochs=4, 
                    validation_data=(test_images, test_labels))

# Evaluate
test_loss, test_acc = model.evaluate(test_images,  test_labels, verbose=2)
print(test_acc)
</pre>
</details>

![](https://i.imgur.com/ROxnqQo.png)

[The convolutional classifier](https://www.kaggle.com/ryanholbrook/the-convolutional-classifier)

---

## Optimisations

### Transfer learning

* Les convolutions seront très similaires d'un modèle à l'autre, un moyen très simple d'accélérer l'entraînement d'un modèle est de réutiliser les convolutions d'un autre modèle déjà optimisé.

* Les convolutions seront similaires dans tous les cas (la convolution pour détecter un trait reste la même par exemple). Cela nécessite de ré-entraîner les dernières couches de convolutions + couches denses.

  Si le modèle a été entraîné sur un grand nombre de classes et qu'on veut détecter un sous-ensemble: les convolutions peuvent être gardées en l'état, ne reste qu'à ré-entraîner les poids des couches denses.

<details>
<summary>python</summary>

<pre lang="python">
IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)

# Create the base model from the pre-trained model MobileNet V2
base_model = tf.keras.applications.MobileNetV2(
  input_shape=IMG_SHAPE,                                               
  include_top=False,                                                  
  weights='imagenet')

base_model.trainable = False

# Add dense layers
model = tf.keras.Sequential([
  base_model,
  tf.keras.layers.GlobalAveragePooling2D(),
  keras.layers.Dense(1)
])

# Define optimizer
model.compile(optimizer=tf.keras.optimizers.RMSprop(lr=0.0001),
              loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=['accuracy'])

# We can evaluate the model right now to see how it does before training it on our new images
loss0, accuracy0 = model.evaluate(validation_batches, steps=20)

# Train it on our images
history = model.fit(train_batches,
                    epochs=3,
                    validation_data=validation_batches)

print(history.history['accuracy'])
</pre>

<pre lang="python">
import tensorflow_hub as hub

pretrained_base = tf.keras.models.load_model(
    '../input/cv-course-models/cv-course-models/inceptionv1'
)
pretrained_base.trainable = False

model = keras.Sequential([
    pretrained_base,
    layers.Flatten(),
    layers.Dense(6, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])
</pre>
</details>

[ImageNet subtrees](https://tfhub.dev/google/collections/experts/bit/1)

### Augmenter les données

Si le dataset est petit, on peut facilement créer de nouvelles images à partir des images existantes — tourner, inverser, zoomer, rogner, etc.

[Beginner's Guide:CNNs and Data Augmentation](https://www.kaggle.com/kaumil97/beginner-s-guide-cnns-and-data-augmentation#Using-data-augmentation-to-increase-accuracy-just-for-computer-vision-tasks)

<details>
<summary>python</summary>

<pre lang="python">
from keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator

#--------------------------------------
# VIEW TRANSFORMATIONS

# creates a data generator object that transforms images
datagen = ImageDataGenerator(
  rotation_range=40,
  width_shift_range=0.2,
  height_shift_range=0.2,
  shear_range=0.2,
  zoom_range=0.2,
  horizontal_flip=True,
  fill_mode='nearest')

# pick an image to transform
test_img = train_images[20]
img = image.img_to_array(test_img)   # convert image to numpy array
img = img.reshape((1,) + img.shape)  # reshape image

i = 0

# this loop runs forever until we break,
# saving images to current directory with specified prefix
for batch in datagen.flow(
    img,
    save_prefix='test',
    save_format='jpeg'
):
    plt.figure(i)
    plt.imshow(image.img_to_array(batch[0]))

    # show 4 images then stop
    i += 1
    if i > 4:
        break

plt.show()

#--------------------------------------
# TRAIN MODEL USING GENERATOR

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary')

validation_generator = test_datagen.flow_from_directory(
    validation_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='binary')

history = model.fit(
    train_generator,
    steps_per_epoch=100,
    epochs=100,
    validation_data=validation_generator,
    validation_steps=50)
</pre>
</details>

<!--
https://www.kaggle.com/kaumil97/beginner-s-guide-cnns-and-data-augmentation

https://towardsdatascience.com/lets-code-convolutional-neural-network-in-plain-numpy-ce48e732f5d5

https://medium.com/analytics-vidhya/2d-convolution-using-python-numpy-43442ff5f381
-->
