---
title: Régression logistique
category: Machine learning, algo
latex: true
---

* La régression logistique permet de transformer une régression linéaire en un algorithme de classification binaire (classes en sortie: 0 ou 1). Pour ce faire, on ajoute la fonction logistique (aussi appelé fonction sigmoid) à la fonction linéaire:

  $$
  \text{Fonction logistique } \\
  p(y=1|x) = \frac{e^x}{e^x + 1} = \frac{1}{1 + e^{-x}} \\[20pt]

  \text{Régression logistique } \\
  p(y=1|x) = \frac{1}{1 + e^{-\theta^T X}}
  $$

  La fonction logistique va ainsi retourner une valeur entre 0 et 1, qui est la probabilité que y = 1.

* La fonction coût est définie comme suit:

  $$
  h = sigmoid(X\theta) \\[10pt]

  \begin{aligned}
  J(\theta) &= \frac{1}{m} \cdot
  \begin{cases}
  -log(h) & \text{si } y = 1 \\
  -log(1 - h) & \text{si } y = 0
  \end{cases} \\[10pt]

  &= \frac{1}{m} \cdot
              \left(
                -y^T \times log(h) - (1 - y)^T \times log(1 - h)
              \right)
  \end{aligned}
  $$

  Ce qui nous donne la dérivé suivante:

  $$
  J(\theta)' = \frac{1}{m} X^T \left( h - y \right)
  $$

* Pour minimiser le coût, on utilise le gradient descent.

<details>
<summary>python</summary>
<pre lang="python">
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def gradientDescent(X, y, theta, alpha, epochs):
    m = len(y)

    for i in range(epochs):
        h = sigmoid(X.dot(theta))

        gradient = (X.T.dot(h - y)) / m
        theta   -= alpha * gradient

    return theta

# Fit
theta = gradientDescent(X, Y, theta=theta, alpha=0.1, epochs=10000)

# Predict
z  = b0 + b1 * x[0] + b2 * x[1]
p  = 1 / (1 + np.exp(-z))

print('Probabilité de badass:', p)
print('Prediction:', (1 if p > 0.5 else 0))
</pre>

<pre lang="python">
from sklearn.linear_model import LogisticRegression

# Fit
model = LogisticRegression(C=1e20, solver='liblinear', random_state=0)
model.fit(X, Y)

# Predict
print('Probabilité de badass:', model.predict_proba([x])[0][1])
print('Prediction:', model.predict([x])[0])
</pre>

<pre lang="python">
import statsmodels.api as sm

# Fit
Xb       = sm.add_constant(X)
Logistic = sm.Logit(Y, Xb)
result   = Logistic.fit()
result.summary()

# Predict
xb = np.concatenate([[1], x])
result.predict(xb)
</pre>
</details>

[Logistic Regression.ipynb](notebooks/Logistic Regression.html)