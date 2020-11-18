---
title: Régression polynomiale
category: Machine learning, algo
latex: true
---

On peut utiliser le même processus que la regression linéaire pour trouver une fonction polynomiale. Pour ce faire, il suffit d'ajouter un degré sur le ou les attribut(s) en entrée avant d'appliquer la regression linéaire.

![](https://i.imgur.com/TD0QBUx.png)

| Type de fonction | Graphique
|---               |---
| Quadratique<br> $$h_\theta(x) = \theta_0 + \theta_1 x + \theta_2 x^2$$      | ![](https://i.imgur.com/rZma3Ak.png)
| Cubique<br> $$h_\theta(x) = \theta_0 + \theta_1 x + \theta_2 x² + \theta_3 x^3$$         | ![](https://i.imgur.com/qVO4LjE.png)
| Carré<br> $$h_\theta(x) = \theta_0 + \theta_1(size) + \theta_2\sqrt{(size)}$$            | ![](https://i.imgur.com/yUZzBye.png)

<details>
<summary>numpy</summary>
<pre lang="python">
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

x  = np.random.normal(3.0, 1.0, 1000)
y  = np.random.normal(50.0, 10.0, 1000) / x
p4 = np.poly1d(np.polyfit(x, y, 4))

# Plot
xp = np.linspace(0, 7, 100)
plt.scatter(x, y)
plt.plot(xp, p4(xp), c='r')
plt.show()

# Evaluate
r2 = r2_score(y, p4(x))
print(r2)
</pre>
</details>

## Analyser les résultats

Même principe que pour la régression linéaire: vérifier p, r² et analyser les résidus.

![](https://i.imgur.com/NoMsBAH.png)

L'analyse des résidus nous montre que les résidus sont normalement distribués, l'hypothèse que les données suivent une courbe quadratique est donc valable.

![](https://i.imgur.com/DKcJH6q.png)