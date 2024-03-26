---
title: Expressions mathématiques Latex
category: Other, Latex
latex: true
---

{% raw %}

## Quick ref

Clic droit: `Show Math As` > `TeX Commands` pour afficher le code Latex d'une formule

* Exposants et indices

  $$a_{i_{1}}$$

  $$a^{2}$$

  $$a^{i_{1}}$$

* Limites

  $$\lim_{x \to \infty} f(x)$$

* Intégrales

  $$\int_{0}^{\pi} \sin x \, dx = 2$$

  $$\int_{|x-x_z(t)|<X_0} f(x)$$

  $$\int\limits_{|x-x_z(t)|<X_0} f(x)$$

  $$\iint_{A} f(x,y)dxdy$$

  $$\idotsint\limits_{A} f(x_1, \ldots, x_2)$$

  $$
  \begin{align}
    h(x) &= \int
    \left(
      \frac{ f(x) + g(x) }
           { 1+ f^{2}(x) }
      + \frac{ 1+ f(x)g(x) }
             { \sqrt{1 - \sin x} }
    \right) \, dx\\
      &= \int \frac{ 1 + f(x) }
                   { 1 + g(x) }
      \, dx - 2 \tan^{-1}(x-2)
  \end{align}
  $$

* Fractions

  $$\frac{3+x}{5}$$

  $$\frac{1}{\frac{\pi}{2}} \quad \frac{1}{\dfrac{\pi}{2}}$$

  $$
  \Re{z} =\frac
    {n\pi \dfrac{\theta +\psi}{2}}
    {
      \left(\dfrac{\theta +\psi}{2}\right)^2 + \left( \dfrac{1}{2}
      \log \left\lvert\dfrac{B}{A}\right\rvert\right)^2
    }
  $$

  $$\frac{\sum\nolimits_{n> 0} z^n}
      {\prod\nolimits_{1\leq k\leq n} (1-q^k)}
    \quad
    \frac{{\displaystyle\sum\nolimits_{n> 0} z^n}}
      {{\displaystyle\prod\nolimits_{1\leq k\leq n} (1-q^k)}}$$

* Coefficient binomial

  $$\binom{n}{k}$$

* Délimiteurs

  $$\left( \frac{1 + x}{2 + y^{2}} \right)^{2}$$

  $$\left| \frac{a + b}{2} \right|$$

  $$\left\| A^{2} \right\|$$

  $$\left( \frac{1}{x} \right) \quad
  \bigl( \frac{1}{x} \bigr) \quad
  \Bigl( \frac{1}{x} \Bigr) \quad
  \biggl( \frac{1}{x} \biggr) \quad
  \Biggl( \frac{1}{x} \Biggr)
  $$

* Ellipses

  $$F(x_{1}, x_{2}, \ldots , x_{n})$$

  $$\begin{align}
  2^n & = &\overbrace{2\times2\times\cdots\times 2}^{\mbox{n terms}}\\
  k\cdot x & = &\underbrace{x + x + \cdots + x}_{\mbox{k terms}}
  \end{align}$$

* Ensembles

  $$x \mapsto \{\, c \in C \mid c \leq x \,\}$$

  $$A = \{\, x \in X \mid x \in X_{i}
  \quad \mbox{for some } i \in I \,\}$$

* Matrices

  $$\begin{matrix}
  a+b+c  &uv   &x-y\\
  a+b    &u+v  &z
  \end{matrix}$$

  $$\mathbf{A} =

  \begin{pmatrix}
  a+b+c&
  uv\\
  a+b&u+v
  \end{pmatrix}

  \begin{pmatrix}
  30 & 7\\
  3&17
  \end{pmatrix}$$

  $$\begin{vmatrix}
  a+b+c&
  uv\\
  a+b&c+d
  \end{vmatrix}$$

  $$A = \left(
  \begin{array}{cccc}
  a_{1,1} & a_{1,2} & \ldots & a_{1,n} \\
  a_{2,1} & a_{2,2} & \ldots & a_{2,n} \\
  \vdots  & \vdots  & \ddots & \vdots \\
  a_{m,1} & a_{m,2} & \ldots & a_{m,n}
  \end{array}
  \right)$$

  $$\begin{bmatrix}
      & 1  & 2  \cr
    1 & x1 & x2 \cr
    2 & x3 & x4 \cr
    3 & x5 & x6
  \end{bmatrix}$$

  | Environnement | Caractères    |
  |---            |---            |
  | matrix        |... (aucun)    |
  | pmatrix       | ( ... )       |
  | bmatrix       | [ ... ]       |
  | Bmatrix       | { ... }       |
  | vmatrix       | \| ... \|     |
  | Vmatrix       | \|\| ... \|\| |

* Racines carrées

  $$\sqrt{a + 2b}$$

  $$\sqrt[n]{5}$$

  $$\surd[x^2 + y^2]$$

* Sommes et produits

  $$\sum_{i=1}^{n} x_{i}^{2}$$

  $$\prod_{i=1}^{n} x_{i}^{2}$$

  $$\sum_{\stackrel{i=1}{j=2}}^{\infty}$$

  $$\sum_{\substack{
    0\le i\le m\\
    0<j<n
  }}
  P(i,j)$$

  $$\sideset{}{’}
    \sum_{n<k}$$

  $$\sideset{_1^2}{_3^4}\prod$$

* Logique

  $$
  \begin{align}
  x &= x \wedge (y \vee z)
  & &\text{(by distributivity)}\\
  &= (x \wedge y) \vee (x \wedge z)
  & &\text{(by condition (M))}\\
  &= y \vee z.
  \end{align}
  $$

* Fonction par morceaux

  $$f(x)=
  \begin{cases}
    -x^{2}        &\text{if $x < 0$}\\
    \alpha + x    &\text{if $0 \leq x \leq 1$}\\
    x^{2}         &\text{otherwise}
  \end{cases}$$

  $$
  f(x) = \left\{
          \begin{array}{ll}
              -x & \quad x \leq 0 \\
              x & \quad x > 0
          \end{array}
      \right.
  $$

* Flèches extensibles

  $$\xleftarrow{n+\mu-1}\quad \xrightarrow[T]{n\pm i-1}$$

---

En mode maths, les espaces sont ignorés, utiliser
- `\;` pour forcer un petit espace
- `\quad` pour un espace moyen
- `\qquad` pour un grand espace

<!-- -->
Pour écrire du texte, utiliser `\mbox{texte}`.  

---

## Lettres grecques

<table>
  <tr>
    <td>$$\alpha \; A$$</td>
    <td>\alpha A</td>
    <td>$$\nu \; N$$</td>
    <td>\nu N</td>
  </tr>
  <tr>
    <td>$$\beta \; B$$</td>
    <td>\beta B</td>
    <td>$$\xi \; \Xi$$</td>
    <td>\xi \Xi</td>
  </tr>
  <tr>
    <td>$$\gamma \; \Gamma$$</td>
    <td>\gamma \Gamma</td>
    <td>$$o \; O$$</td>
    <td>o O</td>
  </tr>
  <tr>
    <td>$$\delta \; \Delta$$</td>
    <td>\delta \Delta</td>
    <td>$$\pi \; \varpi \; \Pi$$</td>
    <td>\pi \varpi \Pi</td>
  </tr>
  <tr>
    <td>$$\epsilon \; \varepsilon\;  E$$</td>
    <td>\epsilon \varepsilon E</td>
    <td>$$\rho \; \varrho\;  P$$</td>
    <td>\rho \varrho P</td>
  </tr>
  <tr>
    <td>$$\zeta \; Z$$</td>
    <td>\zeta Z</td>
    <td>$$\sigma \; \varsigma \; \Sigma$$</td>
    <td>\sigma \varsigma \Sigma</td>
  </tr>
  <tr>
    <td>$$\eta \; H$$</td>
    <td>\eta H</td>
    <td>$$\tau \; T$$</td>
    <td>\tau T</td>
  </tr>
  <tr>
    <td>$$\theta \; \vartheta \; \Theta$$</td>
    <td>\theta \vartheta \Theta</td>
    <td>$$\upsilon \; \Upsilon$$</td>
    <td>\upsilon \Upsilon</td>
  </tr>
  <tr>
    <td>$$\iota \; I$$</td>
    <td>\iota I</td>
    <td>$$\phi \; \varphi \; \Phi$$</td>
    <td>\phi \varphi \Phi</td>
  </tr>
  <tr>
    <td>$$\kappa \; K$$</td>
    <td>\kappa K</td>
    <td>$$\chi \; X$$</td>
    <td>\chi X</td>
  </tr>
  <tr>
    <td>$$\lambda \; \Lambda$$</td>
    <td>\lambda \Lambda</td>
    <td>$$\psi \; \Psi$$</td>
    <td>\psi \Psi</td>
  </tr>
  <tr>
    <td>$$\mu \; M$$</td>
    <td>\mu M</td>
    <td>$$\omega \; \Omega$$</td>
    <td>\omega \Omega</td>
  </tr>
</table>

## Lettres hébraïques

<table>
  <tr>
    <td colspan="4"><code>Package: amssymb</code></td>
  </tr>
  <tr>
    <td>$$\aleph$$</td>
    <td>\aleph</td>
    <td>$$\beth$$</td>
    <td>\beth</td>
  </tr>
  <tr>
    <td>$$\daleth$$</td>
    <td>\daleth</td>
    <td>$$\gimel$$</td>
    <td>\gimel</td>
  </tr>
</table>

## Points

<table>
  <tr>
    <td>$$ \cdotp \; \ldotp$$</td>
    <td>\cdotp \ldotp</td>
    <td>$$ \cdots \; \ldots$$</td>
    <td>\cdots \ldots</td>
  </tr>
  <tr>
    <td>$$ \colon \; \vdots$$</td>
    <td>\colon \vdots</td>
    <td>$$ \ddots $$</td>
    <td>\ddots</td>
  </tr>
</table>

## Réduction de variable

<table>
  <tr>
    <td>$$ \bigcap \; \bigcup$$</td>
    <td>\bigcap \bigcup</td>
    <td>$$ \bigsqcup \; \biguplus$$</td>
    <td>\bigsqcup \biguplus</td>
  </tr>
  <tr>
    <td>$$ \bigwedge \; \bigvee $$</td>
    <td>\bigwedge \bigvee</td>
    <td>$$ \prod \; \coprod$$</td>
    <td>\prod \coprod</td>
  </tr>
  <tr>
    <td>$$ \int \; \oint$$</td>
    <td>\int \oint</td>
    <td>$$\bigotimes \; \bigodot \; \bigoplus$$</td>
    <td>\bigotimes \bigodot \bigoplus</td>
  </tr>
  <tr>
    <td>$$ \sum $$</td>
    <td>\sum</td>
  </tr>
</table>

## Accents groupes

<table>
  <tr>
    <td>$$ \sqrt{abc} $$</td>
    <td>\sqrt{abc}</td>
    <td>$$ \widehat{abc} $$</td>
    <td>\widehat{abc}</td>
  </tr>
  <tr>
    <td>$$ \overleftarrow{abc} \; \overrightarrow{abc}$$</td>
    <td>\overleftarrow{abc} \overrightarrow{abc}</td>
    <td>$$ \overline{abc} \; \underline{abc}$$</td>
    <td>\overline{abc} \underline{abc}</td>
  </tr>
  <tr>
    <td>$$ \overbrace{abc} \; \underbrace{abc}$$</td>
    <td>\overbrace{abc} \underbrace{abc}</td>
    <td>$$ \widetilde{abc} $$</td>
    <td>\widetilde{abc}</td>
  </tr>
</table>

## Accents lettres

<table>
  <tr>
    <td>$$\hat{a} \; \widehat{a}$$</td>
    <td>\hat{a} \widehat{a}</td>
    <td>$$\tilde{a} \; \widetilde{a}$$</td>
    <td>\tilde{a} \widetilde{a}</td>
  </tr>
  <tr>
    <td>$$\acute{a}$$</td>
    <td>\acute{a}</td>
    <td>$$\grave{a}$$</td>
    <td>\grave{a}</td>
  </tr>
  <tr>
    <td>$$\vec{a}$$</td>
    <td>\vec{a}</td>
    <td>$$\bar{a}$$</td>
    <td>\bar{a}</td>
  </tr>
  <tr>
    <td>$$\breve{a}$$</td>
    <td>\breve{a}</td>
    <td>$$\check{a}$$</td>
    <td>\check{a}</td>
  </tr>
  <tr>
    <td>$$\dot{a}$$</td>
    <td>\dot{a}</td>
    <td>$$\ddot{a}$$</td>
    <td>\ddot{a}</td>
  </tr>
  <tr>
    <td>$$\dddot{a}$$</td>
    <td>\dddot{a}</td>
    <td>$$\ddddot{a}$$</td>
    <td>\ddddot{a}</td>
  </tr>
  <tr>
    <td>$$\mathring{a}$$</td>
    <td>\mathring{a}</td>
    <td colspan="2"></td>
  </tr>
</table>

## Opérateurs binaires

<table>
  <tr>
    <td>$$ \times \; \cdot$$</td>
    <td>\times \cdot</td>
    <td>$$ \div \; \setminus $$</td>
    <td>\div \setminus</td>
  </tr>
  <tr>
    <td>$$ \circ \; \bullet $$</td>
    <td>\circ \bullet</td>
    <td>$$ \ast \; \star $$</td>
    <td>\ast \star</td>
  </tr>
  <tr>
    <td>$$ \bigcirc $$</td>
    <td>\bigcirc</td>
    <td>$$ \bigtriangleup \; \bigtriangledown $$</td>
    <td>\bigtriangleup \bigtriangledown</td>
  </tr>
  <tr>
    <td>$$ \diamond $$</td>
    <td>\diamond</td>
    <td>$$ \wr $$</td>
    <td>\wr</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td>$$ \amalg $$</td>
    <td>\amalg</td>
    <td>$$ \dagger \; \ddagger $$</td>
    <td>\dagger \ddagger</td>
  </tr>
  <tr>
    <td>$$ \cup \; \cap$$</td>
    <td>\cup \cap</td>
    <td>$$ \sqcup \; \sqcap$$</td>
    <td>\sqcup \sqcap</td>
  </tr>
  <tr>
    <td>$$ \pm \; \mp $$</td>
    <td>\pm \mp</td>
    <td>$$ \vee \; \wedge $$</td>
    <td>\vee \wedge</td>
  </tr>
  <tr>
    <td>$$ \oplus \; \ominus$$</td>
    <td>\oplus \ominus</td>
    <td>$$ \otimes \; \odot$$</td>
    <td>\otimes \odot</td>
  </tr>
  <tr>
    <td>$$ \oslash $$</td>
    <td>\oslash</td>
    <td>$$ \uplus $$</td>
    <td>\uplus</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\intercal$$</td>
    <td>\intercal</td>
    <td>$$\Cup \; \Cap$$</td>
    <td>\Cup \Cap</td>
  </tr>
  <tr>
    <td>$$\curlyvee \; \curlywedge$$</td>
    <td>\curlyvee \curlywedge</td>
    <td>$$\veebar \; \barwedge \; \doublebarwedge$$</td>
    <td>\veebar \barwedge \doublebarwedge</td>
  </tr>
  <tr>
    <td>$$\boxplus \; \boxminus$$</td>
    <td>\boxplus \boxminus</td>
    <td>$$\boxtimes \; \boxdot$$</td>
    <td>\boxtimes \boxdot</td>
  </tr>
  <tr>
    <td>$$\circleddash \; \circledast \; \circledcirc$$</td>
    <td>\circleddash \circledast \circledcirc</td>
    <td>$$\backepsilon$$</td>
    <td>\backepsilon</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td>$$\rtimes \; \ltimes$$</td>
    <td>\rtimes \ltimes</td>
    <td>$$\leftthreetimes \; \rightthreetimes$$</td>
    <td>\leftthreetimes \rightthreetimes</td>
  </tr>
  <tr>
    <td>$$\smallsetminus$$</td>
    <td>\smallsetminus</td>
    <td>$$\divideontimes$$</td>
    <td>\divideontimes</td>
  </tr>
  <tr>
    <td>$$\centerdot$$</td>
    <td>\centerdot</td>
    <td>$$\dotplus$$</td>
    <td>\dotplus</td>
  </tr>
</table>

## Divers

<table>
  <tr>
    <td>$$ \forall \; \exists $$</td>
    <td>\forall \exists</td>
    <td>$$\in \; \ni$$</td>
    <td>\in \ni</td>
  </tr>
  <tr>
    <td>$$\bot \; \top$$</td>
    <td>\bot \top</td>
    <td>$$ \partial \; \Re $$</td>
    <td>\partial \Re</td>
  </tr>
  <tr>
    <td>$$\imath \; \jmath \; \ell$$</td>
    <td>\imath \jmath \ell</td>
    <td>$$\Im \; \hbar \; \wp$$</td>
    <td>\Im \hbar \wp</td>
  </tr>
  <tr>
    <td>$$ \infty $$</td>
    <td>\infty</td>
    <td>$$ \surd $$</td>
    <td>\surd</td>
  </tr>
  <tr>
    <td>$$ \triangle $$</td>
    <td>\triangle</td>
    <td>$$ \nabla $$</td>
    <td>\nabla</td>
  </tr>
  <tr>
    <td>$$ \emptyset $$</td>
    <td>\emptyset</td>
    <td>$$ \backslash $$</td>
    <td>\backslash</td>
  </tr>
  <tr>
    <td>$$ \neg $$</td>
    <td>\neg</td>
    <td>$$ \angle $$</td>
    <td>\angle</td>
  </tr>
  <tr>
    <td>$$ \prime $$</td>
    <td>\prime</td>
    <td>$$ \natural \; \sharp$$</td>
    <td>\natural \sharp</td>
  </tr>
  <tr>
    <td>$$ \clubsuit \; \spadesuit $$</td>
    <td>\clubsuit \spadesuit</td>
    <td>$$ \diamondsuit \; \heartsuit $$</td>
    <td>\diamondsuit \heartsuit</td>
  </tr>

  <tr><td colspan="4"><code>Package: latexsym</code></td></tr>
  <tr>
    <td>$$ \Box \; \Diamond $$</td>
    <td>\Box \Diamond</td>
    <td>$$ \mho $$</td>
    <td>\mho</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\nexists$$</td>
    <td>\nexists</td>
    <td>$$\notin$$</td>
    <td>\notin</td>
  </tr>
  <tr>
    <td>$$\hslash \; \eth$$</td>
    <td>\hslash \eth</td>
    <td>$$\complement \; \Bbbk \; \Finv$$</td>
    <td>\complement \Bbbk \Finv</td>
  </tr>
  <tr>
    <td>$$\backprime$$</td>
    <td>\backprime</td>
    <td>$$\varnothing$$</td>
    <td>\varnothing</td>
  </tr>
  <tr>
    <td>$$\Game$$</td>
    <td>\Game</td>
    <td>$$\diagup \diagdown$$</td>
    <td>\diagup \diagdown</td>
  </tr>
  <tr>
    <td>$$\blacktriangle \blacktriangledown$$</td>
    <td>\blacktriangle \blacktriangledown</td>
    <td>$$\vartriangle \triangledown$$</td>
    <td>\vartriangle \triangledown</td>
  </tr>
  <tr>
    <td>$$\square \lozenge$$</td>
    <td>\square \lozenge</td>
    <td>$$\blacksquare \blacklozenge$$</td>
    <td>\blacksquare \blacklozenge</td>
  </tr>
  <tr>
    <td>$$\measuredangle \sphericalangle$$</td>
    <td>\measuredangle \sphericalangle</td>
    <td>$$\circledS \; \bigstar$$</td>
    <td>\circledS \bigstar</td>
  </tr>
</table>

## Inégalités

<table>
  <tr>
    <td>$$= \; \equiv \; \neq \; \doteq$$</td>
    <td>= \equiv \neq \doteq</td>
    <td>$$ \sim \; \approx \; \simeq \; \cong$$</td>
    <td>\sim \approx \simeq \cong</td>
  </tr>
  <tr>
    <td>$$> \; \geq \; \gg$$</td>
    <td>&gt; \geq \gg</td>
    <td>$$< \; \leq \; \ll$$</td>
    <td>&lt; \leq \ll</td>
  </tr>
  <tr>
    <td>$$\not> \; \not\geq \; \not\gg$$</td>
    <td>\not&gt; \not\geq \not\gg</td>
    <td>$$\not< \; \not\leq \; \not\ll$$</td>
    <td>\not&lt; \not\leq \not\ll</td>
  </tr>


  <tr>
    <td colspan="4"><code>Package: amssymb</code></td>
  </tr>
  <tr>
    <td>$$\thicksim \; \thickapprox$$</td>
    <td>\thicksim \thickapprox</td>
    <td>$$\backsim \; \backsimeq \; \approxeq$$</td>
    <td>\backsim \backsimeq \approxeq</td>
  </tr>
  <tr>
    <td>$$\doteqdot \; \fallingdotseq \; \risingdotseq$$</td>
    <td>\doteqdot \fallingdotseq \risingdotseq</td>
    <td>$$\eqcirc \; \circeq \; \triangleq$$</td>
    <td>\eqcirc \circeq \triangleq</td>  </tr>
  <tr>
    <td>$$\gtrdot \; \geqq \; \ggg$$</td>
    <td>\gtrdot \qegg \ggg</td>
    <td>$$\geqslant \; \eqslantgtr$$</td>
    <td>\geqslant \eqslantgtr</td>
  </tr>
  <tr>
    <td>$$\lessdot \; \leqq \; \lll$$</td>
    <td>\lessdot \leqq \lll</td>
    <td>$$\leqslant \; \eqslantless$$</td>
    <td>\leqslant \eqslantless</td>
  </tr>
  <tr>
    <td>$$\gtrsim \; \gtrapprox$$</td>
    <td>\gtrsim \gtrapprox</td>
    <td>$$\lesssim \; \lessapprox$$</td>
    <td>\lesssim \lessapprox</td>
  </tr>
  <tr>
    <td>$$\gtrless \; \gtreqless \; \gtreqqless$$</td>
    <td>\gtrless \gtreqless \gtreqqless</td>
    <td>$$\lessgtr \; \lesseqgtr \; \lesseqqgtr$$</td>
    <td>\lessgtr \lesseqgtr \lesseqqgtr</td>
  </tr>

  <tr><td colspan="4"></td></tr>
  <tr>
    <td>$$\ngtr \; \ngeq \; \ngeqq \; \ngeqslant$$</td>
    <td>\ngtr \ngeq \ngeqq \ngeqslant</td>
    <td>$$\gneq \; \gneqq \; \gvertneqq$$</td>
    <td>\gneq \gneqq \gvertneqq</td>
  </tr>
  <tr>
    <td>$$\nless \; \nleq \; \nleqq \; \nleqslant$$</td>
    <td>\nless \nleq \nleqq \nleqslant</td>
    <td>$$\lneq \; \lneqq \; \lvertneqq$$</td>
    <td>\lneq \lneqq \lvertneqq</td>
  </tr>
  <tr>
    <td>$$\gnsim \; \gnapprox$$</td>
    <td>\gnsim \gnapprox</td>
    <td>$$\lnsim \; \lnapprox$$</td>
    <td>\lnsim \lnapprox</td>
  </tr>
  <tr>
    <td>$$\nsim \; \ncong$$</td>
    <td>\nsim \ncong</td>
  </tr>
</table>

## Ordres

<table>
  <tr>
    <td>$$ \prec \; \preceq$$</td>
    <td>\prec \preceq</td>
    <td>$$ \succ \; \succeq$$</td>
    <td>\succ \succeq</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\preccurlyeq \; \curlyeqprec$$</td>
    <td>\preccurlyeq \curlyeqprec</td>
    <td>$$\succcurlyeq \; \curlyeqsucc$$</td>
    <td>\succcurlyeq \curlyeqsucc</td>
  </tr>
  <tr>
    <td>$$\precsim \; \precapprox$$</td>
    <td>\precsim \precapprox</td>
    <td>$$\succsim \; \succapprox$$</td>
    <td>\succsim \succapprox</td>
  </tr>
  <tr>
    <td>$$\nprec \; \npreceq \; \precneqq$$</td>
    <td>\nprec \npreceq \precneqq</td>
    <td>$$\nsucc \; \nsucceq \; \succneqq$$</td>
    <td>\nsucc \nsucceq \succneqq</td>
  </tr>
  <tr>
    <td>$$\precnsim \; \precnapprox$$</td>
    <td>\precnsim \precnapprox</td>
    <td>$$\succnsim \; \succnapprox$$</td>
    <td>\succnsim \succnapprox</td>
  </tr>
</table>

## Ensembles

<table>
  <tr>
    <td>$$ \subset \; \subseteq$$</td>
    <td>\subset \subseteq </td>
    <td>$$ \supset \; \supseteq$$</td>
    <td>\supset \supseteq </td>
  </tr>

  <tr><td colspan="4"><code>Package: latexsym</code></td></tr>
  <tr>
    <td>$$ \sqsubseteq $$</td>
    <td>\sqsubseteq</td>
    <td>$$ \sqsupseteq $$</td>
    <td>\sqsupseteq</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\subseteqq \; \Subset$$</td>
    <td>\subseteqq \Subset</td>
    <td>$$\supseteqq \; \Supset$$</td>
    <td>\supseteqq \Supset</td>
  </tr>
  <tr>
    <td>$$\nsubseteq \; \nsubseteqq$$</td>
    <td>\nsubseteq \nsubseteqq</td>
    <td>$$\nsupseteq \; \nsupseteqq$$</td>
    <td>\nsupseteq \nsupseteqq</td>
  </tr>
  <tr>
    <td>$$\subsetneq \; \subsetneqq$$</td>
    <td>\subsetneq \subsetneqq</td>
    <td>$$\supsetneq \; \supsetneqq$$</td>
    <td>\supsetneq \supsetneqq</td>
  </tr>
  <tr>
    <td>$$\varsubsetneq \; \varsubsetneqq$$</td>
    <td>\varsubsetneq \varsubsetneqq</td>
    <td>$$\varsupsetneq \; \varsupsetneqq$$</td>
    <td>\varsupsetneq \varsupsetneqq</td>
  </tr>
</table>

## Sous-groupes

<table>
  <tr>
    <td>$$ \triangleleft$$</td>
    <td>\triangleleft</td>
    <td>$$\triangleright$$</td>
    <td>\triangleright</td>
  </tr>

  <tr><td colspan="4"><code>Package: latexsym</code></td></tr>
  <tr>
    <td>$$ \lhd \; \unlhd$$</td>
    <td>\lhd \unlhd</td>
    <td>$$ \rhd \; \unrhd$$</td>
    <td>\rhd \unrhd</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\vartriangleleft \; \trianglelefteq$$</td>
    <td>\vartriangleleft \trianglelefteq</td>
    <td>$$\vartriangleright \; \trianglerighteq$$</td>
    <td>\vartriangleright \trianglerighteq</td>
  </tr>
  <tr>
    <td>$$\ntriangleleft \ntrianglelefteq$$</td>
    <td>\ntriangleleft \ntrianglelefteq</td>
    <td>$$\ntriangleright \ntrianglerighteq$$</td>
    <td>\ntriangleright \ntrianglerighteq</td>
  </tr>
  <tr>
    <td>$$\blacktriangleleft$$</td>
    <td>\blacktriangleleft</td>
    <td>$$\blacktriangleright$$</td>
    <td>\blacktriangleright</td>
  </tr>
</table>

## Géométrie

<table>
  <tr>
    <td>$$ \parallel \; \perp \; \mid$$</td>
    <td>\parallel \perp \mid</td>
    <td colspan="2"></td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\shortparallel \; \shortmid$$</td>
    <td>\shortparallel \shortmid</td>
    <td>$$\nshortmid \; \nshortparallel$$</td>
    <td>\nshortmid \nshortparallel</td>
  </tr>
  <tr>
    <td>$$\nmid \; \nparallel$$</td>
    <td>\nmid \nparallel</td>
  </tr>
</table>

## Autres relations

<table>
  <tr>
    <td>$$ \vdash \; \dashv \; \models $$</td>
    <td>\vdash \dashv \models</td>
    <td>$$ \smile \; \frown \; \asymp$$</td>
    <td>\smile \frown \asymp</td>
  </tr>
  <tr>
    <td>$$ \propto $$</td>
    <td>\propto</td>
    <td>$$ \bowtie $$</td>
    <td>\bowtie</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\vDash \; \Vdash \; \Vvdash$$</td>
    <td>\vDash \Vdash \Vvdash</td>
    <td>$$\smallsmile \; \smallfrown$$</td>
    <td>\smallsmile \smallfrown</td>
  </tr>
  <tr>
    <td>$$\pitchfork$$</td>
    <td>\pitchfork</td>
    <td>$$\between$$</td>
    <td>\between</td>
  </tr>
  <tr>
    <td>$$\bumpeq \; \Bumpeq$$</td>
    <td>\bumpeq \Bumpeq</td>
    <td>$$\therefore \; \because$$</td>
    <td>\therefore \because</td>
  </tr>

  <tr><td colspan="4"></td></tr>
  <tr>
    <td>$$\nvdash \; \nvDash$$</td>
    <td>\nvdash \nvDash</td>
    <td>$$\nVdash \; \nVDash$$</td>
    <td>\nVdash \nVDash</td>
  </tr>
</table>

## Fonctions

<table>
  <tr>
    <td>$$ \sin \; \arcsin \; \sinh$$</td>
    <td>\sin \arcsin \sinh</td>
    <td>$$ \cos \; \arccos \; \cosh$$</td>
    <td>\cos \arccos \cosh</td>
  </tr>
  <tr>
    <td>$$ \tan \; \arctan \; \tanh$$</td>
    <td>\tan \arctan \tanh</td>
    <td>$$ \sec \; \csc $$</td>
    <td>\sec \csc</td><!-- Secant, cosecant -->
  </tr>
  <tr>
    <td>$$ \cot \; \coth$$</td>
    <td>\cot \coth</td>
    <td>$$ \arg $$</td>
    <td>\arg</td>
  </tr>
  <tr>
    <td>$$ \varinjlim \; \varprojlim$$</td>
    <td>\varinjlim \varprojlim</td>
    <td>$$ \varliminf \; \varlimsup$$</td>
    <td>\varliminf \varlimsup</td>
  </tr>
  <tr>
    <td>$$ \lim \; \limsup \; \liminf$$</td>
    <td>\lim \limsup \liminf</td>
    <td>$$ \min \; \max $$</td>
    <td>\min \max</td>
  </tr>
  <tr>
    <td>$$ \sup \; \inf$$</td>
    <td>\sup \inf</td>
    <td>$$ \ln \; \log \; \lg$$</td>
    <td>\ln \log \lg</td><!--  log10b = lg b -->
  </tr>
  <tr>
    <td>$$ \ker \; \dim $$</td>
    <td>\ker \dim</td><!-- Matrix kernel, dimension -->
    <td>$$ \gcd $$</td>
    <td>\gcd</td> <!-- Greatest common divisor  -->
  </tr>
  <tr>
    <td>$$ \det \; \hom \; \Pr $$</td>
    <td>\det \hom \Pr</td><!-- Déterminant, Hom, Distribution de Pareto -->
    <td>$$ \deg $$</td>
    <td>\deg</td>
  </tr>
  <tr>
    <td>$$ \exp $$</td>
    <td>\exp</td>
    <td>$$ \operatorname{mafonction}(x) $$</td>
    <td>\operatorname{mafonction}(x)</td>
  </tr>
</table>

Sinon, de nouveeaux noms de fonctions peuvent être crées via `\DeclareMathOperator{\nomfonction}{affiche}`

``` latex
%--- preamble
\DeclareMathOperator{\rank}{rank}

%--- body
$$ \rank(x) $$
```

## Flèches

<table>
  <tr>
    <td>$$ \to \; \mapsto $$</td>
    <td>\to \mapsto</td>
    <td>$$ \longmapsto $$</td>
    <td>\longmapsto</td>
  </tr>
  <tr>
    <td>$$ \rightarrow \; \Rightarrow $$</td>
    <td>\rightarrow \Rightarrow</td>
    <td>$$\longrightarrow \; \Longrightarrow $$</td>
    <td>\longrightarrow \Longrightarrow</td>
  </tr>
  <tr>
    <td>$$ \leftarrow \; \Leftarrow $$</td>
    <td>\leftarrow \Leftarrow</td>
    <td>$$ \longleftarrow \; \Longleftarrow$$</td>
    <td>\longleftarrow \Longleftarrow</td>
  </tr>
  <tr>
    <td>$$ \uparrow \; \Uparrow$$</td>
    <td>\uparrow \Uparrow</td>
    <td>$$\downarrow \; \Downarrow $$</td>
    <td>\downarrow \Downarrow</td>
  </tr>
  <tr>
    <td>$$ \updownarrow \; \Updownarrow$$</td>
    <td>\updownarrow \Updownarrow</td>
    <td>$$ \searrow \; \swarrow \; \nwarrow \; \nearrow$$</td>
    <td>\searrow \swarrow \nwarrow \nearrow</td>
  </tr>
  <tr>
    <td>$$ \leftrightarrow \; \Leftrightarrow$$</td>
    <td>\leftrightarrow \Leftrightarrow</td>
    <td>$$ \longleftrightarrow \; \Longleftrightarrow$$</td>
    <td>\longleftrightarrow \Longleftrightarrow</td>
  </tr>
  <tr>
    <td>$$\rightharpoonup \; \rightharpoondown $$</td>
    <td>\rightharpoonup \rightharpoondown</td>
    <td>$$\leftharpoonup \; \leftharpoondown $$</td>
    <td>\leftharpoonup \leftharpoondown</td>
  </tr>
  <tr>
    <td>$$ \rightleftharpoons $$</td>
    <td>\rightleftharpoons</td>
    <td>$$ \hookrightarrow \; \hookleftarrow$$</td>
    <td>\hookrightarrow \hookleftarrow</td>
  </tr>

  <tr><td colspan="4"><code>Package: latexsym</code></td></tr>
  <tr>
    <td>$$ \leadsto $$</td>
    <td>\leadsto</td>
  </tr>

  <tr><td colspan="4"><code>Package: amssymb</code></td></tr>
  <tr>
    <td>$$\leftleftarrows \rightrightarrows$$</td>
    <td>\leftleftarrows \rightrightarrows</td>
    <td>$$\leftrightarrows \rightleftarrows$$</td>
    <td>\leftrightarrows \rightleftarrows</td>
  </tr>
  <tr>
    <td>$$\Lleftarrow \Rrightarrow$$</td>
    <td>\Lleftarrow \Rrightarrow</td>
    <td>$$\twoheadleftarrow \twoheadrightarrow$$</td>
    <td>\twoheadleftarrow \twoheadrightarrow</td>
  </tr>
  <tr>
    <td>$$\leftarrowtail \rightarrowtail$$</td>
    <td>\leftarrowtail \rightarrowtail</td>
    <td>$$\looparrowleft \looparrowright$$</td>
    <td>\looparrowleft \looparrowright</td>
  </tr>
  <tr>
    <td>$$\upuparrows \downdownarrows$$</td>
    <td>\upuparrows \downdownarrows</td>
    <td>$$\upharpoonleft \upharpoonright$$</td>
    <td>\upharpoonleft \upharpoonright</td>
  </tr>
  <tr>
    <td>$$\downharpoonleft \downharpoonright$$</td>
    <td>\downharpoonleft \downharpoonright</td>
    <td>$$\leftrightsquigarrow \rightsquigarrow$$</td>
    <td>\leftrightsquigarrow \rightsquigarrow</td>
  </tr>
  <tr>
    <td>$$\multimap$$</td>
    <td>\multimap</td>
    <td colspan="2"></td>
  </tr>

  <tr><td colspan="4"></td></tr>
  <tr>
    <td>$$\nleftarrow \; \nrightarrow$$</td>
    <td>\nleftarrow \nrightarrow</td>
    <td>$$\nLeftarrow \; \nRightarrow$$</td>
    <td>\nLeftarrow \nRightarrow</td>
  </tr>
  <tr>
    <td>$$\nleftrightarrow$$</td>
    <td>\nleftrightarrow</td>
    <td>$$\nLeftrightarrow$$</td>
    <td>\nLeftrightarrow</td>
  </tr>
</table>



## Délimiteurs

<table>
  <tr>
    <td>$$ \downarrow \; \Downarrow$$</td>
    <td>\downarrow \Downarrow</td>
    <td>$$ \uparrow \; \Uparrow$$</td>
    <td>\uparrow \Uparrow</td>
  </tr>
  <tr>
    <td>$$ \updownarrow \; \Updownarrow$$</td>
    <td>\updownarrow \Updownarrow</td>
    <td>$$ \langle \; \rangle$$</td>
    <td>\langle \rangle</td>
  </tr>
  <tr>
    <td>$$ \lceil \; \rceil$$</td>
    <td>\lceil \rceil</td>
    <td>$$ \lfloor \; \rfloor$$</td>
    <td>\lfloor \rfloor</td>
  </tr>
  <tr>
    <td>$$ \{ \; \} $$</td>
    <td>\{ \}</td>
    <td>$$ \lmoustache \; \rmoustache$$</td>
    <td>\lmoustache \rmoustache</td>
  </tr>
  <tr>
    <td>$$ \lgroup \; \rgroup$$</td>
    <td>\lgroup \rgroup</td>
    <td>$$ \backslash $$</td>
    <td>\backslash</td>
  </tr>
  <tr>
    <td>$$ \arrowvert \; \Arrowvert$$</td>
    <td>\arrowvert \Arrowvert</td>
    <td>$$ \bracevert $$</td>
    <td>\bracevert</td>
  </tr>

  <tr><td colspan="4"><code>Package: amsmath</code></td></tr>
  <tr>
    <td>$$ \ulcorner \; \urcorner$$</td>
    <td>\ulcorner \urcorner</td>
    <td>$$ \llcorner \; \lrcorner$$</td>
    <td>\llcorner \lrcorner</td>
  </tr>
</table>

## Texte

<table>
  <tr>
    <td>$$ \mathrm{ABCdef123} $$</td>
    <td>\mathrm{ABCdef123}</td>
  </tr>
  <tr>
    <td>$$ \mathsf{ABCdef123} $$</td>
    <td>\mathsf{ABCdef123}</td>
  </tr>
  <tr>
    <td>$$ \mathtt{ABCdef123} $$</td>
    <td>\mathtt{ABCdef123}</td>
  </tr>
  <tr>
    <td>$$ ABCdef123 $$</td>
    <td>\mathnormal{ABCdef123}</td>
  </tr>
  <tr>
    <td>$$ \mathbf{ABCdef123} $$</td>
    <td>\mathbf{ABCdef123}</td>
  </tr>
  <tr>
    <td>$$ \mathit{ABCdef123} $$</td>
    <td>\mathit{ABCdef123}</td>
  </tr>
</table>

Avec le package `amsfonts` :

<table>
  <tr>
    <td>$$ \mathbb{ABCdef123} $$</td>
    <td>\mathbb{ABC}</td>
  </tr>
  <tr>
    <td>$$ \mathcal{ABCdef123} $$</td>
    <td>\mathcal{ABC}</td>
  </tr>
  <tr>
    <td>$$ \mathfrak{ABCdef123} $$</td>
    <td>\mathfrak{ABC}</td>
  </tr>
</table>

Ressources :

- https://www.rpi.edu/dept/arc/training/latex/LaTeX_symbols.pdf
- https://fr.wikipedia.org/wiki/Table_de_symboles_math%C3%A9matiques
- http://tex.loria.fr/general/mil.pdf#page=83
- ftp://ftp.ams.org/pub/tex/doc/amsmath/short-math-guide.pdf
- https://khan.github.io/KaTeX/function-support.html#logic

{% endraw %}
