---
title: Principal Component Analysis (PCA)
category: Machine learning, algo
latex: true
---

## Qu'est-ce que c'est

* PCA est une technique permettant de réduire les dimensions d'un ensemble de données, qui transforme les caractéristiques de l'ensemble de données de départ en un nouvel ensemble de caractéristiques appelées *Principal Components* (PCs).

  Il ne s'agit pas d'une technique de sélection des caractéristiques, mais plutôt d'une technique de combinaison de caractéristiques. Chaque PC est une combinaison pondérée d'un ensemble de colonnes.

* Exemple: On a un ensemble de données de différents logements, qui contient les caractéristiques "m²", "# pièces", "# salles de bain", "ecoles alentour", "taux de criminalité".

  On peut réduire le nombre de caractéristiques et garder le maximum d'informations en combinant les caractéristiques qui se ressemblent:
  * "m²", "# pièces", "# salles de bain" sont combinés en une caractéristique "Taille",

  * et "ecoles alentour", "taux de criminalité" sont combinés en une caractéristique "emplacement"

* Il existe deux manières d'effectuer un PCA: décomposition en eigenvalues de la matrice de covariance (section 1) ou décomposition en valeurs singulières (section 2).

## Version Eigenvalues Decomposition

1. Normaliser les données.  
   Pour chaque caractéristique, soustraire leur moyenne — ça pour effet de déplacer l'origine au point 0.

   Mettre également les données des différentes caractéristiques sur une échelle similaire — sinon, PCA sera biaisé vers les caractéristiques ayant un plus grand intervalle.  
   Pour ce faire, on divise généralement chaque caractéristique par son écart-type. Une caractéristique avec un large intervalle aura un grand écart-type, on divise donc par un grand nombre. Et inversemment, une caractéristique avec un petit intervalle aura un petit écart-type, on divise par un petit nombre.

   On change les données mais ne change pas la position des points les uns par rapport aux autres.

   ![](https://i.imgur.com/cuO0WNim.png)
   ![](https://i.imgur.com/Fg5Hzsbm.png)

2. Créer la matrice de covariance des caractéristiques

   ![](https://i.imgur.com/2LhRowO.png)

   On peut considérer la matrice de covariance comme une transformation linéaire d'une matrice de rayon 1 vers une approximation de la matrice de données dont on dispose.

  ![](https://i.imgur.com/0tLVYHhl.png)

3. Calculer les eigenvalues et eigenvectors de la matrice de covariance.  
   Pour passer de la matrice de rayon 1 à la matrice de covariance, on a étiré le plan en deux directions:

   1. On a étiré dans la direction [2 1] (2 unités vers la droite, 1 vers le haut) avec une magnitude de 11.

   2. Et dans la direction [-1 2] (1 unité vers la gauche, 2 vers le haut) avec une magnitude de 1.

   ![](https://i.imgur.com/TdetbKXl.png)

   La direction des étirements sont donnés par les eigenvectors et la magnitude par les eigenvalues.  
   Notons que les deux eigenvectors sont perpendiculaires: c'est ce qui se produit quand on a une matrice symmétrique (si on réfléchit la matrice sur la diagonale principale, on obtient la même matrice) et c'est le cas de la matrice de covariance puisque Cov(X,Y) = Cov(Y,X).

    <details>
    <summary>Eigenvalues / eigenvectors</summary>

    <ins>Définition</ins>:  
    Par définition, si on a une matrice A de dimension n×n et qu'il existe un scalaire &lambda; et un vecteur x&#x0305; tel que Ax&#x0305; = &lambda;x&#x0305;, alors on dit que &lambda; est une *valeur propre* (*eigenvalue* en anglais) et x&#x0305; un *vecteur propre* (*eigenvector* en anglais) de la matrice A.

    <ins>Exemple</ins>:  
    $$
    \begin{aligned}

    \left( \begin{array}{rr} 3 & 2 \\ 3 & -2 \end{array} \right)
    \left( \begin{array}{r} 2 \\ 1 \end{array} \right)
    &=
    4
    \left( \begin{array}{r} 2 \\ 1 \end{array} \right)

    \\

    \left( \begin{array}{rcr} 3 \cdot 2 &+& 2 \cdot 1 \\ 3 \cdot 2 &+& -2 \cdot 1 \end{array} \right)
    &=
    \left( \begin{array}{r} 4 \cdot 2 \\ 4\cdot 1 \end{array} \right)

    \\
    \left( \begin{array}{r} 8 \\ 4 \end{array} \right)
    &=
    \left( \begin{array}{r} 8 \\ 4 \end{array} \right)

    \end{aligned}
    $$

    4 et [2 1] sont des eigenvalue et eigenvector de la matrice [[3 2][3 -2]].  
    Tout multiple de [2 1] sera également un eigenvector.

    <ins>Formule</ins>:  
    L'ensemble des eigenvalues et eigenvectors possibles pour A se note:

    $$
    \begin{aligned}
    AE &= DE \\
     A &= EDE^T
    \end{aligned} \\[5pt]

    \text{où } D = \begin{pmatrix}
    \lambda_1 & 0 \\
    0 & \lambda_2
    \end{pmatrix} \\

    \text{et } E = \begin{pmatrix}
    | & | \\
    \bar{x_1} & \bar{x_2} \\
    | & |
    \end{pmatrix}
    $$

    <ins>Calculer des eigenvalues et eigenvectors</ins>:  
    1. Multiplier une matrice identité de dimension n×n par &lambda;

        $$
        \text{Si } n=2, \lambda I=\left( \begin{array}{cc}\lambda & 0 \\
        0 & \lambda
        \end{array} \right)
        $$

    2. Soustraire &lambda;I à la matrice d'origine, A

        $$
        A - \lambda I = \left( \begin{array}{cc}
        7 - \lambda & 3 \\
        3 & -1 - \lambda
        \end{array} \right)
        $$

    3. Calculer le déterminant de la matrice

        $$
        \begin{aligned}
        \text{det}& \left( \begin{array}{cc}
                7 - \lambda & 3 \\
                3 & -1 - \lambda
                \end{array} \right) \\

        &= (7 - \lambda)(-1 - \lambda) - (3)(3) \\
        &= -7 - 7 \lambda + \lambda + \lambda^2 - 9 \\
        &= \lambda^2 -6 \lambda - 16
        \end{aligned}
        $$

    4. Calculer les valeurs de &lambda; qui résolvent l'équation det(A-&lambda;I) = 0

        $$
        \begin{aligned}
        \lambda^2 - 6\lambda - 16 &= 0 \\
        (\lambda - 8)(\lambda + 2) &= 0 \\

        & \begin{cases}
        \lambda = 8 \\
        \lambda = -2
        \end{cases}
        \end{aligned}
        $$

    5. Pour chaque valeur &lambda;, trouver le vecteur x&#x0305; qui résout (A - &lambda;I)x&#x0305; = 0

       * &lambda; = 8

        $$
        \begin{aligned}
        (A - 8I)\bar{x} &= \bar{0} \\

        & \left( \begin{array}{cc|c}
                7 - 8 & 3 &0 \\
                3 & -1 - 8 &0
                \end{array} \right) \\

        =& \left( \begin{array}{cc|c}
                -1 & 3 & 0\\
                3 & -9 & 0
                \end{array} \right) \\

        \xrightarrow{r2 = 3r_1+r_2} &
        \left( \begin{array}{cc|c}
                -1 & 3 & 0\\
                0 & 0 & 0
                \end{array} \right) \\[10pt]

        -x_1 + 3x_2 &= 0 \\
               3x_2 &= x_1 \\

        \bar{x} &= \left( \begin{array}{c} 3 \\ 1 \end{array} \right)
        \end{aligned}
        $$

        * &lambda; = -2

        $$
        \begin{aligned}
        (A + 2I)\bar{x} &= \bar{0} \\

         & \left( \begin{array}{cc|c}
            7 + 2 & 3 & 0 \\
            3 & -1 + 2 & 0
            \end{array} \right) \\

        & \left( \begin{array}{cc|c}
                9 & 3 & 0\\
                3 & 1 & 0
                \end{array} \right) \\

        \xrightarrow{r1 = -3r_2+r_1} &
        \left( \begin{array}{cc|c}
                0 & 0 & 0\\
                3 & 1 & 0
                \end{array} \right) \\[10pt]

        3x_1 + x_2 &= 0 \\
               x_2 &= -3x_1 \\

        \bar{x} &= \left( \begin{array}{c} 1 \\ -3 \end{array} \right)
        \end{aligned}
        $$

        <a href="https://www.youtube.com/watch?v=IdsV0RaC9jM">Video: Finding Eigenvalues and Eigenvectors (2 x 2 Matrix Example)</a>  
        <a href="https://www.wolframalpha.com/input/?i=eigenvectors+%28%289%2C4%29%2C%284%2C3%29%29">Calculer des eigenvectors en ligne</a>
    </details>

4. Ordonner les eigenvectors par ordre descendant des eigenvalues.  
   Les eigenvalues nous donnent une indication de la variance des données capturées par les eigenvectors associés.  
   En ordonnant par eigenvalues, on met en premier les eigenvectors qui expliquent le mieux les variations des données.

   $$
   \text{Variance expliquée par } \lambda_i:\\
\frac{\lambda_i}{\sum_{j=1}^n \lambda_j}
   $$

    ```
    print(eigenvectors)
    # [[-0.70710678, -0.70710678][ 0.70710678, -0.70710678]]

    print(eigenvalues)
    # [1.84, 0.16]

    print(eigenvalues/eigenvalues.sum())
    # [0.92, 0.08]

    '''
    [-0.70710678, -0.70710678]
    explique 92% de la variance observée
    '''
    ```

5. Sélectionner les k premiers eigenvectors — suivant le nombre de caractéristiques que vous souhaitez garder.

   Un critère pour choisir la valeur k peut être la quantité de variance qu'on souhaite conserver: on peut par exemple décider de ne conserver que les éléments nécessaires pour expliquer 95% de la variance observée sur les données.

    $$
    \text{Variance expliquée par } [\lambda_1 .. \lambda_k]:\\

    \frac{\sum_{i=1}^k \lambda_i}{\sum_{j=1}^n \lambda_j}
    $$

7. Utiliser la matrice d'eigenvectors (d×k) pour transformer l'ensemble de données vers le nouveau sous-ensemble.
   Il suffit pour ce faire d'effectuer une multiplication matricielle de l'ensemble de départ avec la matrice d'eigenvectors sélectionnés — on dit qu'on projete les données.

   Le sous-ensemble obtenu est une représentation relativement fidèle à l'ensemble de départ — parce qu'on a réduit les dimensions de la manière la plus intelligente possible. Pour rappel, les caractéristiques de ce sous-ensemble sont appelées *Principal Components* [PCs] (*composantes principales* en français). La matrice d'eigenvectors est parfois appelées *loadings* des principal components.

   Les PCs sont des combinaisons linéaires des caractéristiques unitiales, ils n'ont pas de réelle signification — mais peuvent être utilisés pour identifier des clusters, tout en étant assez fidèle aux données d'origine.

![](https://i.imgur.com/Lu7zeunl.png)

<details>
<summary>python</summary>

<pre lang="python">
# 1. Normaliser
df_norm = (df-df.mean())/df.std()

# 2. Créer la matrice de covariance
cov = np.cov(df_norm.T)

# 3. Calculer les eigenvalues et eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(cov)
eigenvectors = eigenvectors.T

# 4. Ordonner par ordre descendant des eigenvalues
rsort_eigenvalues_idx = eigenvalues.argsort()[::-1]
rsort_eigenvectors = eigenvectors[rsort_eigenvalues_idx]

# 5. Sélectionner k eigenvectors
k = 1
top_eigenvectors = rsort_eigenvectors[:k]

# 6. Réduire l'ensemble de données
df_reduced = np.dot(top_eigenvectors, df_norm.T)
</pre>
</details>

[Video: Principal Component Analysis (PCA)](https://www.youtube.com/watch?v=g-Hb26agBFg)

## Version Singular Values Decomposition (SVD)

* Les valeurs singulières d'une matrice X sont liées mathématiquement aux eigenvalues de sa matrice de covariance (1/n XX^T).

  Calculer les eigenvalues [O(p³)] de la matrice de covariance [O(p²n)] a un coût total de O(p³ + p²n).  
  Calculer les valeurs singulières de la matrice d'origine a un coût total de O(min(p²n, n²p)).  
  La seconde approche est donc plus efficace et c'est généralement celle qui est implémentée dans les frameworks de machine learning.

<details>
<summary>Singular values</summary>

* Les eigenvalues ne sont applicables que sur des matrices carrées. Si on multiplie une matrice de dimension n×n avec un vecteur de dimension 1×n, on obtient un vecteur de dimension 1×n. Il est donc sensé qu'il existe des cas dans lesquels le vecteur obtenu est un multiple du vecteur de départ (c'est à dire que Ax&#x0305; = &lambda;x&#x0305;) puisque les deux vecteurs sont de même dimension.

  En revanche, si la matrice n'est pas carrée, on multiplie une matrice de dimension n×m avec un vecteur de dimension 1×n et on obtient un vecteur de dimension 1×m. Un eigenvector ne peut pas exister dans ce cas — puisque les vecteurs avant et après ne sont pas de même dimension.

* Si on veut considérer une matrice de dimension n×m comme une transformation linéaire d'une matrice identité, on doit combiner trois étapes — rotation, étirement, rotation — et on écrit la matrice A de dimension n×m comme le produit d'une matrice identité avec

  * une matrice de rotation (U, n×n),  
    dit *vecteurs singuliers de gauche* (*left singular vectors* en anglais)

  * une matrice de mise à l'échelle (Σ, n×m),  
    dit *valeurs singulières* (*singular values* en anglais)

  * et une autre matrice de rotation (V, m×m),  
    dit *vecteurs singuliers de droite* (*right singular vectors* en anglais)

  Notons que V est la matrice adjointe (ou transposée conjugée) de U — on le note avec le symbole &dagger;.

  ![](https://i.imgur.com/kRfT5A5m.png)

  <ins>Exemple</ins>:

  ![](https://i.imgur.com/aJc5NmQ.png?1)

  <!--
  ![](https://i.imgur.com/dt4UiH7l.png)  
  ![](https://i.imgur.com/pyEjxW4l.png)
  -->

* On calcule les eigenvalues à partir de la matrice de covariance A (1/n X<sup>T</sup>X), tandis qu'on calcule les valeurs singulières à partir de la matrice d'origine X. Si on exprime la formule SVD en fonction de la matrice de covariance, on obtient que &lambda;<sub>i</sub> = 1/n &sigma;<sub>i</sub>².

  $$
  \begin{aligned}
  \text{Eigenvalues}: \\[10pt]
  A &= E D E^T\\[15pt]

  \text{Singular values}: \\[10pt]
  X &= (U \Sigma V^T) \\

  A = \frac{1}{n} X^T X &= \frac{1}{n} (U \Sigma V^T)^T (U \Sigma V^T) \\
        &= \frac{1}{n} V \Sigma^T U^T U \Sigma V^T \\
        &= \frac{1}{n} V(\Sigma^T \Sigma) V^T\\

  &(\text{U et V sont orthogonaux, d'où } U^T U = I)\\[15pt]

  \text{Conclusion}: \\[10pt]

  E D E^T &= \frac{1}{n} V(\Sigma^T \Sigma) V^T \\

  \text{Soit } E \equiv V,\\
  & D = \frac{1}{n} \Sigma^T \Sigma \\
  & \lambda_i = \frac{1}{n} \sigma_i^2
  \end{aligned}
  $$

[Video: Singular Value Decomposition (SVD) and Image Compression](https://www.youtube.com/watch?v=DG7YTlGnCEo)  
[169-[ENG] SVD The relation between PCA and SVD](https://www.youtube.com/watch?v=CDnFXD1h2n8)
</details>

* L'algorithme reste quasimment identique. Ce qui change:
  * <ins>Avec décomposition par eigenvalues</ins>  
    2/ calculer la matrice de covariance  
    3/ calculer les eigenvalues de la matrice de covariance

  * <ins>Avec décomposition par valeurs singulières</ins>  
    2/ calculer les valeurs singulières de la matrice d'origine  
    3/ calculer le carré des valeurs singulières (nous donne les eigenvalues). Les vecteurs singuliers de droites correspondent aux eigenvectors.

[PCA.ipynb](notebooks/PCA.html)