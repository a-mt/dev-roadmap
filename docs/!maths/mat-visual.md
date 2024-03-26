---
title: Visualisations
category: Maths
---

![](https://i.imgur.com/mKx8fYb.jpg)

## Tableau de fréquence

Ou *tableau des effectifs*. (*frequency table* en anglais)  
Un tableau de fréquence affiche chacune des valeurs possibles, associée au nombre de fois qu'elle apparaît.

<pre>
Ex: On la liste des âges des enfants dans une colonne de vacances:
  5,7,5,9,7,7,6,9,9,9,10,12,12,7
Dresser le tableau des effectifs pour cette liste

| Âge | Effectifs
| 5   | 2
| 6   | 1
| 7   | 4
| 8   | 0
| 9   | 4
| 10  | 1
| 11  | 0
| 12  | 2
</pre>

---

## Tableau croisé

Ou *tableau de contingence* voire *tableau à double-entrée*.  
Un tableau croisé affiche les effectifs de deux caractéristiques associées.

<pre>
Ex: Suite à un sondage, on a récolté les données suivantes:

         | Chat | !Chat |
| Chien  | 2    | 4     |
| !Chien | 11   | 12    |

- 2 personnes ont un chat et un chien
- 4 ont un chien et pas de chat
- 11 ont un chat et pas de chien
- 12 non ni chien ni chat
</pre>

---

## Graphique en barres

Ou *diagramme en bâtons*. (*bar chart* en anglais)  
Un diagramme en barres utilise le nombre d'effectifs pour déterminer la hauteur des barres.   
Permet de comparer les quantités entre différents groupes (en comparant la hauteur des barres au lieu de regarder des chiffres bruts).

![](https://i.imgur.com/ZNG0aQX.png)

<details>
<summary>python</summary>
<pre lang="python">
X = [5,7,5,9,7,7,6,9,9,9,10,12,12,7]

values,count = np.unique(X, return_counts=True)
plt.bar(values, count)
plt.yticks(np.arange(0,5))
plt.xlabel('Âge')
plt.ylabel('Effectifs')
</pre>
</details>

---

## Graphique à points

(*dot plot* en anglais)  
Remplace les barres pleines par des points, on peut donc les compter pour connaître la fréquence des différentes valeurs.

![](https://i.imgur.com/Gr3bstQ.png)

<details>
<summary>python</summary>
<pre lang="python">
X = [5,7,5,9,7,7,6,9,9,9,10,12,12,7]

pos = []
keys = {}
for num in X: 
   if num not in keys:
      keys[num] = 1
      pos.append(1)
   else:
      keys[num] += 1
      pos.append(keys[num])

plt.scatter(X, np.array(pos)-0.5, s=20**2)
plt.yticks(np.arange(0,6))
plt.xlabel('Âge')
plt.ylabel('Effectifs')
</pre>
</details>

---

## Graphique à tige & feuilles

(*stem & leaf plot* en anglais)  
Un graphique à tige & feuilles permet d'afficher la fréquence, groupée par dizaine. Dans l'exemple ci-dessous, il y a deux valeurs dans la catégorie 140: 141 et 146.

![](https://i.imgur.com/2gZcgQE.png)

<details>
<summary>python</summary>
<pre lang="python">
X = [
    12, 127, 28, 42, 39, 113, 42, 18, 44, 118, 44, 37, 113, 124, 37, 48, 127, 36, 29, 31,
    125, 139, 131, 115, 105, 132, 104, 123, 35, 113, 122, 42, 117, 119, 58, 109, 23, 105,
    63, 27, 44, 105, 99, 41, 128, 121, 116, 125, 32, 61, 37, 127, 29, 113, 121, 58, 114,
    126, 53, 114, 96, 25, 109, 7, 31, 141, 46, 13, 27, 43, 117, 116, 27, 7, 68, 40, 31, 115,
    124, 42, 128, 52, 71, 118, 117, 38, 27, 106, 33, 117, 116, 111, 40, 119, 47, 105, 57,
    122, 109, 124, 115, 43, 120, 43, 27, 27, 18, 28, 48, 125, 107, 114, 34, 133, 45, 120,
    30, 127, 31, 116, 146
]

s = sorted(X)
s = pd.Series(s) \
      .groupby([int(float(i) // 10 * 10) for i in s]) \
      .apply(lambda group: "".join((str(x)[-1] for x in group))) \
      .reset_index()

print("\n".join(
    s['index'].astype('str').str.rjust(3, ' ')
    + ' | '
    + s[0]
))
</pre>
</details>

---

## Graphique en camembert

Ou *graphique circulaire*. (*pie chart* en anglais)  
Un graphique en camembert utilise la fréquence relative (effectifs en pourcentage du nombre total d'effectif) pour répartir les différentes catégories dans un cercle.

![](https://i.imgur.com/8iigI1X.png)

<details>
<summary>python</summary>
<pre lang="python">
X = [5,7,5,9,7,7,6,9,9,9,10,12,12,7]

plt.figure(figsize=(5,10))
values,count = np.unique(X, return_counts=True)
total = np.sum(count)
plt.pie(
    count,
    labels=np.char.add(values.astype('str'), ' ans'),
    autopct=lambda p: '{:.1f}%\n ({:.0f})'.format(p,p*total/100.0)
)
</pre>
</details>

---

## Pictogramme

Ou *diagramme à images*. (*pictograph* en anglais)  
Un pictogramme représente les effectifs avec des images. 

![](https://i.imgur.com/UJIW75h.png)

---

## Graphique en courbe

(*line plot* en anglais)  
Permet de visualiser la tendance des données en fonction de l'évolution d'une autre variable (typiquement la date).  
Plusieurs lignes peuvent être utilisées pour comparer la tendance de différents groupe.

![](https://i.imgur.com/eoVf5Tj.png)

<details>
<summary>python</summary>
<pre lang="python">
plt.plot(k_list, scores)
plt.xlabel("k")
plt.ylabel("Accuracy")
</pre>
</details>

---

## Histogramme

(*histogram* en anglais)  
Sembable au diagramme à barres mais pour des valeurs continues. Les barres sont accolées puiqu'il n'y a pas de séparation entre les valeurs.  
Permet de vérifier la distribution des données.

![](https://i.imgur.com/pBcxbs8.png)

<details>
<summary>python</summary>
<pre lang="python">
from matplotlib.ticker import FuncFormatter
formatter = FuncFormatter(lambda x,pos: '$%.0fk' % (x * 1e-3))

plt.hist(df.MonthlyIncome, bins=8)
plt.gca().xaxis.set_major_formatter(formatter)
plt.xlabel('Salaire')
plt.ylabel('Effectifs')
</pre>
</details>

On peut modifier le nombre d'intervalles utilisés (*bins* en anglais), entre lesquelles le nombre de données est compté, pour plus ou moins de précision.

![](https://i.imgur.com/eT8CdVS.png)

<details>
<summary>python</summary>
<pre lang="python">
from matplotlib.ticker import FuncFormatter
formatter = FuncFormatter(lambda x,pos: '$%.0fk' % (x * 1e-3))

values, bins, patches = plt.hist(df.MonthlyIncome, bins=20)
plt.xticks(bins, rotation=90)
plt.gca().xaxis.set_major_formatter(formatter)
plt.xlabel('Salaire')
plt.ylabel('Effectifs')
</pre>
</details>

---

## Estimation par noyau

(*kernel density estimate* en anglais, souvent abbregé KDE)  
Version lissée de l'histogramme.

![](https://i.imgur.com/kMchobn.png)

<details>
<summary>python</summary>
<pre lang="python">
import seaborn as sns

X = df.MonthlyIncome

#Histogram
plt.hist(X, bins=20, density=True, alpha=0.3)

#Density plot
sns.kdeplot(data=X, linewidth=2)

plt.ylabel('Frequence %')
plt.xlabel('Salaire')
</pre>
</details>

---

## Boîte à moustaches

Ou *diagramme en boîte*. (*boxplot* ou *box and whiskers plot* en anglais)  
Une boîte à moustache met en évidence la distribution des données:

* la ligne du milieu est la médiane

* les limites du rectangle central est l'écart interquartile (quartile 1 et quartile 3)

* les moustaches sont les valeurs minimales et maximales inférieures à 1.5 fois l'écart interquartile

  <pre>
  limite inférieure = Q1 - 1.5×(Q3-Q1)
  limite supérieure = Q3 + 1.5×(Q3-Q1)
  </pre>

* les points représentés en dehors de la boîte sont les valeurs extrêmes, qui sont à plus de 1.5 fois l'écart interquartile

![](https://i.imgur.com/P61ch3d.png)

<details>
<summary>python</summary>
<pre lang="python">
X = [0,7,9,10,11,13,20]

plt.figure(figsize=(6,2))
plt.boxplot(X, vert=False, widths=0.5)
plt.xticks(np.arange(0,21))
plt.grid(alpha=0.3)
plt.title(X)
</pre>
</details>

---

## Nuage de points

(*scatterplot* en anglais)  
Permet de mettre en évidence une relation entre deux variables continues.

![](https://i.imgur.com/VtVKIDR.png)

<details>
<summary>python</summary>
<pre lang="python">
url = "https://raw.githubusercontent.com/ingledarshan/DL_dataset/master/moore.csv"
df  = pd.read_csv(url, header=None)

plt.scatter(df[0], df[1])
plt.xlabel('Année')
plt.ylabel('# transistors')
</pre>
</details>

---

## Graphique hexagonal

(*hexagonal bin plot* en anglais)  
Solution alternative au nuage de points si les données sont trop denses pour tracer chaque point individuellement.

![](https://i.imgur.com/oOrbbxE.png)

<details>
<summary>python</summary>
<pre lang="python">
df = sns.load_dataset('iris')

plt.hexbin(df['sepal_length'], df['sepal_width'],
           gridsize=(30,15),
           cmap='Blues')

plt.xlabel('Sepal length')
plt.ylabel('Sepal width')
</pre>
</details>

On peut obtenir un résultat similaire avec un nuage de point avec canal alpha:

![](https://i.imgur.com/dfoKphx.png)

<details>
<summary>python</summary>
<pre lang="python">
plt.scatter(df['sepal_length'],df['sepal_width'],alpha=0.3)
plt.xlabel('Sepal length')
plt.ylabel('Sepal width')
</pre>
</details>

---

## Diagramme de Venn

Un diagramme de Venn utilise des cercles pour représenter différents ensembles. Ces cercles se croisent lorsqu'il existe des intersections entre les ensembles.

![](https://i.imgur.com/se0yllt.jpg)

---

## Carte de fréquentation

(*heatmap* en anglais)  
Une carte de fréquentation consiste à donner un code-couleur aux nombres suivant leur position dans l'intervalle (ex: bleu pour les valeurs inférieures à la médiane, rouge pour les valeurs supérieures).  
Permet de vérifier si les données suivent un motif.

![](https://i.imgur.com/ReyvGlL.png)

<details>
<summary>python</summary>
<pre lang="python">
df = sns.load_dataset('flights')
data = df.pivot_table(index='month', columns='year', values='passengers')

plt.figure(figsize=(8,6))
sns.heatmap(data, annot=True, fmt='')
</pre>

<pre lang="python">
from sklearn.metrics import accuracy_score, confusion_matrix

cm = confusion_matrix(y_test, y_pred)
labels = LABELS[y_var] if y_var in LABELS else sorted(y_test.unique())

ax = plt.subplot()
sns.heatmap(cm, annot=True, fmt='d', cmap=plt.cm.Blues, ax=ax)
ax.set_xlabel('Predicted labels')
ax.set_ylabel('True labels')
ax.set_title("{0:s}\nAccuracy: {1:.3f}".format(y_var, score))
ax.xaxis.set_ticklabels(labels)
ax.yaxis.set_ticklabels(labels)
plt.show()
</pre>
</details>


---

Pour aller plus loin:

* [The Python graph Gallery](https://python-graph-gallery.com/)  
* [Pandas: Visualization](https://pandas.pydata.org/pandas-docs/stable/user_guide/visualization.html)  
* [Beyond data scientist: 3d plots in Python with examples](https://medium.com/@yzhong.cs/beyond-data-scientist-3d-plots-in-python-with-examples-2a8bd7aa654b)
