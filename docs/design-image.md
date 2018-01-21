---
title: Image
category: Other > Design
---

Une image communiquera toujours une idée plus rapiement que n'importe quel texte.  
Les images et les icônes peuvent être utilisées pour décorer ou pour apporter des informations supplémentaires au contenu.

---

## Logo

Une police décorative peut être utilisée pour créer le **logotype** d'une entreprise (nom de l'entreprise stylisé).  
Exemple d'entreprises qui utilisent des logotypes: Google, Ikea, Disney.

![](https://i.imgur.com/QFw5Z5L.png)

Le **brandmark** est un symbole utilisée à la place du nom de l'entreprise, il peut ou non être accompagné d'un logotype.  
Exemple: Apple, WWF, Pepsi.

![](https://i.imgur.com/I2Q8Qyl.jpg)

Un **lettermark** est une abbréviation ou des initiales qui sont utilisées à la place du nom de l'entreprise.  
Exemple: Cable News Network, British Broadcasting Corporation, Volkswagen.

![](https://i.imgur.com/Z3ZCaGY.png)

---

## Formats de fichiers image

Un format de fichier d'image est une manière standardisée d'encoder numériquement une illustration, un design ou une photo.  
Il y a deux grands types de formats d'image:
- les **images vectorielles** (vector images) sont des éléments graphiques crées à partir d'un procédé mathématiques.  
Ces éléments peuvent être agrandis sans perte de qualité, ce qui fait d'eux un choix idéal pour toutes sortes de supports (panneaux publicitaires, cartes de visite, etc.).

- les **images bitmap** (raster images) sont composées de pixels. Chacun de ces pixels a une couleur attitrée  
La qualité des images dépend de leur nombre de pixels (c'est à dire leur résolution). Une image ne peut pas être agrandie au delà de sa résolution, faute de quoi elle paraîtra pixelisée. Ces types de formats sont un choix idéal pour les images qui contiennent beaucoup de détails (photos, infographiques, etc)

  ![](https://i.imgur.com/sKpBO7k.png)

![](https://i.imgur.com/sIt7CSJ.jpg)

### Images vectorielles

<table>
<tr>
  <th align="left">AI</th>
  <td>Il s'agit de l'extension des fichiers créés avec Adobe Illustrator. Développés par Adobe Systems, ces fichiers contiennent des designs vectoriels sur une seule page.</td>
</tr>
<tr>
  <th align="left">PDF</th>
  <td>Acronyme pour Portable Document Format. Ce format de fichier a également été développé par Adobe. Les documents créés avec ce format peuvent être lus par n'importe quel ordinateur. Les fichiers PDF sont utiles pour présenter l'aperçu d'un design en cours de création.</td>
</tr>
<tr>
  <th align="left">EPS</th>
  <td>Acronyme de Encapsulated Post Script. Ce format est communément utilisé pour les designs destinés à être imprimés (logo, cartes de visite ou brochure).</td>
</tr>
<tr>
  <th align="left">SVG</th>
  <td>SVG est un format d'image vectorielle pour le web. La taille des fichiers est relativement petites. Les images SVG peuvent être responsives, être animées et controlées par un script js.<br>
  Les images SVG sont utilisées pour les logos et éléments d'une page pourvu qu'ils ne soient pas trop complexes.</td>
</tr>
</table>

### Images bitmap

<table>
<tr>
  <th align="left">GIF</th>
  <td>Acronyme de Graphics Interchange Format. Il s'agit d'un format d'image raster permettant de créer des animations et de la transparence. Les GIF ne peuvent contenir que 256 couleurs au maximum produisant ainsi toujours des fichiers de petite taille.<br>
  Les images GIF sont utilisées pour les animations (sinon on préfère PNG).</td>
</tr>
<tr>
  <th align="left">JPEG</th>
  <td>Acronyme pour Joint Photographic Electronic Group. Les JPEG sont des fichiers compressés avec perte (lossy compression) qui se chargent rapidement.
  Contrairement aux GIF, les JPEG ne peuvent pas contenir un fond transparent (un fond blanc est ajouté automatiquement).<br>
  Les images JPEG sont utilisées pour les photos qui contiennent beaucoup de couleurs, de gradients, d'ombres...</td>
</tr>
<tr>
  <th align="left">PNG</th>
  <td>Acronyme pour Portable Network Graphics. Ce format numérique ne perd pas de qualité après compression (lossy compression). Les fichiers PNG ont été créés pour améliorer la qualité des GIF.<br>
  Les images PNG sont utilisées pour les logos, les éléments d'une page comme les bordures, les fonds d'écran, etc.</td>
</tr>
<tr>
  <th align="left">PSD</th>
  <td>Il s'agit de l'extension des fichiers créés avec Adobe Photoshop. Ces fichiers contiennent des images raster non compressées.<br>
  Les images PSD sont utilisées par les graphistes pour la conception du design.</td>
</tr>
<tr>
  <th align="left">TIFF</th>
  <td>Acronyme de Tagged Image File Format. C'est un format communément utilisé pour faire passer des images raster d'une application à une autre. La qualité des images TIFF est plus grande que celle des images JPEG ou PNG, c'est pourquoi les photographes et les maisons d'édition se servent souvent de ce format.</td>
</tr>
<tr>
  <th align="left">WEBP</th>
  <td>WebP est un format d'image mis au point par Google qui permet une compression avec ou sans perte. Il supporte la transparence et permet d'obtenir des tailles de fichiers beaucoup plus petites. En 2017, ce format est n'supporté que par Google Chrome et Opera. <a href="https://caniuse.com/#feat=webp">Voir caniuse</a></td>
</tr>
</table>

![](https://i.imgur.com/W5vXufi.png)

---

## Réduire la taille des fichiers images

### Baisser la qualité

Plus l'image est compressée, plus la taille du fichier est petite. Les images représentent la plus grande partie de la bande passante utilisée sur une page web. En réduisant la taille des images, les pages peuvent être chargées plus rapidement, ce qui améliore la performance du site.

La plupart du temps, les images peuvent être optimisées sans perte de qualité visible. Au moment d'exporter les images, baissez la qualité de l'image pour réduire la taille du fichier en prêtant attention au résultat obtenu. Penser à vsualiser l'image obtenue dans un navigateur, qui lisse les images, ce qui peut rendre un résultat différent.

Baisser la résolution de l'image permet également de gagner en taille. Utiliser la résolution appropriée plutôt que de réduire la taille de l'image en CSS.

### Optimiser

En plus de la baisse de qualité, les images peuvent généralement être optimisées davantage (en arrondissant les valeurs ou en utilisant une palette de couleurs indexées par exemple). Pour ce faire, des outils en ligne sont disponibles :
- [https://imageoptim.com](https://imageoptim.com)
- [http://jpegmini.com](http://jpegmini.com)
- [https://tinyjpg.com](https://tinyjpg.com)
- [http://compressjpeg.com](http://compressjpeg.com)

### Utiliser des sprites

Les sprites sont des images qui contiennent plusieurs images.
Ces images sont ensuite utilisées comme image de fond dont la position est déplacée afin de modifier la partie visible.
Particulièrement utilisés lorsqu'on a beaucoup de petites images, comme des icônes, des bordures ou des animations, les sprites permettent de limiter le nombre de requêtes HTTP effectuées.

[Exemple d'animation avec sprites](http://jsfiddle.net/simurai/CGmCe/light/)

---

## Améliorer une image

Pour améliorer une image, on peut

### Recadrer

![](https://i.imgur.com/dn8Z9op.png)

### Flouter

![](https://i.imgur.com/1H0PLRm.png)

### Modifier la saturation

![](https://i.imgur.com/bD35jgd.png)

### Modifier le contraste

![](https://i.imgur.com/bU9Wx1Q.png)

### Modifier la luminosité

![](https://i.imgur.com/rW2TpYv.png)

### Modifier la balance des couleurs

![](https://i.imgur.com/ugPnzt6.png)

### Arranger sur une grille

![](https://i.imgur.com/25qdGpX.png)

### Utiliser un cadre

![](https://i.imgur.com/MCEsFy1.png)

### Utiliser un calque de couleur

![](https://i.imgur.com/8Y1rveZ.png)

[10 Simple Ways To Enhance Your Images](https://www.canva.com/learn/image-enhancement/)
