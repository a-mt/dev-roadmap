---
title: Markup Latex
category: Other, Latex
latex: true
---

{% raw %}

Cet article est dédié est la manière de formatter le contenu Latex.

Il fait suite à [l'article qui présente Latex](latex.md) :
- convertir un fichier Latex
- créer un document (avec page de garde, sommaire, sections)
- inclure des fichiers
- utiliser des labels et références
- créer des commandes et environnements

Voir la [liste complète des symboles](http://mirrors.ircam.fr/pub/CTAN/info/symbols/comprehensive/symbols-letter.pdf)
pour les symboles ajoutés par des packages (anciens langages, musique, science, etc).

---

## Espaces et retours chariot

1. Si plusieurs espaces se suivent, un seul est affiché.
2. Il faut une ligne vide (= deux retours chariots) pour ajouter un retour à la ligne.  
   Si plusieurs retours à la ligne se suivent, un seul est affiché.
3. Les espaces placés après le nom d'une commande sont ignorés.  
   Mettre un paramètre vide pour pouvoir afficher un espace après : `\command{} ` au lieu de `\command `
4. Il est possible de forcer des retours à la ligne et espaces avec des commandes Latex

``` latex
Lorem    ipsum
dolor sit amet

Consectetur adipiscing elit
```

%%
\documentclass{book}
\begin{document}
Lorem    ipsum
dolor sit amet
\\
Consectetur adipiscing elit
\end{document}
%%

``` latex
Lorem ipsum \\
dolor sit amet
```

%%
\documentclass{book}
\begin{document}
Lorem ipsum \\
dolor sit amet
\end{document}
%%

### Retours à la ligne

| Commandes  | Effet |
|---         |---    |
| `\\`       | Commence un nouveau paragraphe |
| `\newline` | Commence un nouveau paragraphe |
| `\*`       | Ajoute un retour à la ligne dans le paragraphe en cours |

### Espaces

[Explication des différents espaces](http://tex.stackexchange.com/questions/74353/what-commands-are-there-for-horizontal-spacing#answer-74354)

![Espaces Latex](https://i.stack.imgur.com/ljZEy.png)

### Espacement des paragraphes

Pour modifier l'indentation, les espaces entre paragraphes, les espaces entre lignes, on peut ajouter des configurations dans le préambule :

``` latex
%--- preamble
\setlength{\parindent}{0cm}
\setlength{\parskip}{\baselineskip}
\renewcommand{\baselinestretch}{1.5}
```

---

## Caractères spéciaux

Certains caractères font partie de la syntaxe Latex, pour pouvoir les afficher littéralement il faut les échapper ou utiliser une commande :

<table>
  <tbody>
    <tr>
      <th>Avant</th>
      <td>\#</td>
      <td>\$</td>
      <td>\%</td>
      <td>\^{}</td>
      <td>\&</td>
      <td>\_</td>
      <td>\{</td>
      <td>\}</td>
      <td>\~{}</td>
      <td>\textbackslash</td>
    </tr>
    <tr>
      <th>Après</th>
      <td>%%  \#  %%</td>
      <td>%%  \$  %%</td>
      <td>%%  \%  %%</td>
      <td>%%  \^{}  %%</td>
      <td>%%  \&  %%</td>
      <td>%%  \_  %%</td>
      <td>%%  \{  %%</td>
      <td>%%  \}  %%</td>
      <td>%%  \~{}  %%</td>
      <td>%%  \textbackslash  %%</td>
    </tr>
  </tbody>
</table>

Il n'y a pas que les caractères spéciaux de Latex qui disposent de commandes mais toute une panoplie.  
En voici quelques uns :

<table>
  <tr>
    <td>\textasciicircum</td>
    <td>%% \textasciicircum %%</td>
    <td>\textcopyright</td>
    <td>%% \textcopyright %%</td>
    <td>\textless</td>
    <td>%% \textless %%</td>
    <td>\textquotedblright</td>
    <td>%% \textquotedblright %%</td>
  </tr>
  <tr>
    <td>\textasciitilde</td>
    <td>%% \textasciitilde %%</td>
    <td>\textdagger</td>
    <td>%% \textdagger %%</td>
    <td>\textordfeminine</td>
    <td>%% \textordfeminine %%</td>
    <td>\textquoteleft</td>
    <td>%% \textquoteleft %%</td>
  </tr>
  <tr>
    <td>\textasteriskcentered</td>
    <td>%% \textasteriskcentered %%</td>
    <td>\textdaggerdbl</td>
    <td>%% \textdaggerdbl %%</td>
    <td>\textordmasculine</td>
    <td>%% \textordmasculine %%</td>
    <td>\textquoteright</td>
    <td>%% \textquoteright %%</td>
  </tr>
  <tr>
    <td>\textbar</td>
    <td>%% \textbar %%</td>
    <td>\textdollar</td>
    <td>%% \textdollar %%</td>
    <td>\textparagraph</td>
    <td>%% \textparagraph %%</td>
    <td>\textregistered</td>
    <td>%% \textregistered %%</td>
  </tr>
  <tr>
    <td>\textbardbl</td>
    <td>%% \textbardbl %%</td>
    <td>\textellipsis</td>
    <td>%% \textellipsis %%</td>
    <td>\textperiodcentered</td>
    <td>%% \textperiodcentered %%</td>
    <td>\textsection</td>
    <td>%% \textsection %%</td>
  </tr>
  <tr>
    <td>\textbigcircle</td>
    <td>%% \textbigcircle %%</td>
    <td>\textemdash</td>
    <td>%% \textemdash %%</td>
    <td>\textpertenthousand</td>
    <td>%% \textpertenthousand %%</td>
    <td>\textsterling</td>
    <td>%% \textsterling %%</td>
  </tr>
  <tr>
    <td>\textbraceleft</td>
    <td>%% \textbraceleft %%</td>
    <td>\textendash</td>
    <td>%% \textendash %%</td>
    <td>\textperthousand</td>
    <td>%% \textperthousand %%</td>
    <td>\texttrademark</td>
    <td>%% \texttrademark %%</td>
  </tr>
  <tr>
    <td>\textbraceright</td>
    <td>%% \textbraceright %%</td>
    <td>\textexclamdown</td>
    <td>%% \textexclamdown %%</td>
    <td>\textquestiondown</td>
    <td>%% \textquestiondown %%</td>
    <td>\textunderscore</td>
    <td>%% \textunderscore %%</td>
  </tr>
  <tr>
    <td>\textbullet</td>
    <td>%% \textbullet %%</td>
    <td>\textgreater</td>
    <td>%% \textgreater %%</td>
    <td>\textquotedblleft</td>
    <td>%% \textquotedblleft %%</td>
    <td>\textvisiblespace</td>
    <td>%% \textvisiblespace %%</td>
  </tr>
</table>

---

## Caractères accentués

Les caractères accentués et liés (é, à, æ, Å, ø…) n'existent pas en anglais et ne sont donc pas suportés tels que par Latex.
Pour les afficher, il faut utiliser une commande : précéder la lettre de « \\' » pour un accent aigüe, « \\` » pour un accent grave, « \\^ » pour un accent circonflexe, et « \\" » pour un tréma, etc.

<table>
  <tbody>
    <tr>
      <th>Avant</th>
      <td>\'{e}</td>
      <td>\`{e}</td>
      <td>\^{e}</td>
      <td>\"{e}</td>
      <td>\.{e}</td>
      <td>\~{e}</td>
      <td>\={e}</td>
      <td>\v{e}</td>
      <td>\b{e}</td>
      <td>\c{e}</td>
    </tr>
    <tr>
      <th>Après</th>
      <td>%%\'{e} %%</td>
      <td>%%\`{e} %%</td>
      <td>%%\^{e} %%</td>
      <td>%%\"{e}%%</td>
      <td>%%\.{e} %%</td>
      <td>%%\~{e} %%</td>
      <td>%%\={e} %%</td>
      <td>%%\v{e} %%</td>
      <td>%%\b{e} %%</td>
      <td>%%\c{e} %%</td>
    </tr>
    <tr>
      <th></th>
      <td>\d{e}</td>
      <td>\H{e}</td>
      <td>\r{e}</td>
      <td>\t{e}</td>
      <td>\u{e}</td>
      <td>\oe</td>
      <td>\OE</td>
      <td>\ae</td>
      <td>\AE</td>
      <td>\ss</td>
    </tr>
    <tr>
      <th></th>
      <td>%%\d{e} %%</td>
      <td>%%\H{e} %%</td>
      <td>%%\r{e} %%</td>
      <td>%%\t{e} %%</td>
      <td>%%\u{e} %%</td>
      <td>%%\oe   %%</td>
      <td>%%\OE   %%</td>
      <td>%%\ae   %%</td>
      <td>%%\AE   %%</td>
      <td>%%\ss   %%</td>
    </tr>
    <tr>
      <th></th>
      <td>\aa</td>
      <td>\AA</td>
      <td>\o</td>
      <td>\O</td>
      <td>\L</td>
      <td>\l</td>
      <td>\i</td>
      <td>\j</td>
      <td>\P</td>
      <td>\S</td>
    </tr>
    <tr>
      <th></th>
      <td>%%\aa   %%</td>
      <td>%%\AA   %%</td>
      <td>%%\o    %%</td>
      <td>%%\O    %%</td>
      <td>%%\L    %%</td>
      <td>%%\l    %%</td>
      <td>%%\i    %%</td>
      <td>%%\j    %%</td>
      <td>%%\P    %%</td>
      <td>%%\S    %%</td>
    </tr>
  </tbody>
</table>

---

## Formatter le texte

### Style de font

| Commande                    | Rendu                           | Description                              |
|---                          |---                                |---                                       |
| \textit{Italic}             | %% \textit{Italic} %%             | Italique                                 |
| \textsl{Slanted}            | %% \textsl{Slanted} %%            | Incliné, légèrement différent d'italique |
| \textup{Normal}             | %% \textup{Normal} %%             | Droit                                    |
| \emph{Emph}                 | %% \emph{Emph} %%                 | Droit si dans bloc italique, italique autrement |
| \underline{Underlined}      | %% \underline{Underlined} %%      | Souligné                                 |
| \textbf{Bold}               | %% \textbf{Bold} %%               | Trait gras                               |
| \textmd{Medium}             | %% \textmd{Medium} %%             | Trait normal                             |
| \textsc{Small scaps}        | %% \textsc{Small scaps} %%        | Petites majuscules                       |
| \textrm{Roman family}       | %% \textrm{Roman family} %%       | Police Roman                             |
| \textsf{Sans-serif family}  | %% \textsf{Sans-serif family} %%  | Police Sans-serif                        |
| \texttt{Typewritter family} | %% \texttt{Typewritter family} %% | Police Typewritter                       |

``` latex
\emph{Lorem ipsum \emph{dolor sit amet}, consectetur adipiscing elit}.
```

%%
\documentclass{report}
\begin{document}

\emph{Lorem ipsum \textup{dolor sit amet}, consectetur adipiscing elit}.
\end{document}
%%

#### Police supplémenaires

Pour créer une nouvelle commande qui change la police (même principe que `\texttt`):

``` latex
%--- preamble
\DeclareTextFontCommand{\helvetica}{\fontfamily{phv}\selectfont}

%--- document
\helvetica{Lorem ipsum dolor sit}
```

On aussi modifier la police du texte pour un bloc avec

``` latex
{\fontfamily{phv}\selectfont
Lorem ipsum dolor sit
}
```

#### Police du document

Pour modifier la famille par défaut du document, placer `\renewcommand{\familydefault}{<famille>}` dans le préambule. Et pour modifier la police par défaut d'une famille : `\renewcommand{<famille>}{<police>}`.  

``` latex
%--- Utiliser Helvetiva par défaut
\renewcommand{\sfdefault}{phv}
\renewcommand{\familydefault}{\sfdefault}
```

Familles possibles :
`\rmdefault` (Roman, par défaut),
`\sfdefault` (Sans Serif),
`\ttdefault` (Typewritter)  
[Liste des polices](https://en.wikibooks.org/wiki/LaTeX/Fonts#Available_LaTeX_Fonts_.5B2.5D)

#### Police des titres

Pour modifier la police des titres uniquement, et éventuellement leur style, importer le package `titlesec` et utiliser la commande `titleformat`

``` latex
\usepackage{titlesec}
\titleformat{\chapter}[display]
  {\normalfont\sffamily\huge\bfseries\color{blue}}
  {\chaptertitlename\ \thechapter}{20pt}{\Huge}
\titleformat{\section}
  {\normalfont\sffamily\Large\bfseries\color{cyan}}
  {\thesection}{1em}{}
```

### Taille

``` latex
{\tiny Lorem ipsum dolor sit amet (tiny)}
{\scriptsize Lorem ipsum dolor sit amet (scriptsize)}
{\footnotesize Lorem ipsum dolor sit amet (footnotesize)}
{\small Lorem ipsum dolor sit amet (small)}
{\normalsize Lorem ipsum dolor sit amet (normalsize)}
{\large Lorem ipsum dolor sit amet (large)}
{\Large Lorem ipsum dolor sit amet (Large)}
{\LARGE Lorem ipsum dolor sit amet (LARGE)}
{\huge Lorem ipsum dolor sit amet (huge)}
{\Huge Lorem ipsum dolor sit amet (Huge)}
```

%%
\documentclass{report}
\begin{document}

{\tiny Lorem ipsum dolor sit amet (tiny)} \\
{\scriptsize Lorem ipsum dolor sit amet (scriptsize)} \\
{\footnotesize Lorem ipsum dolor sit amet (footnotesize)} \\
{\small Lorem ipsum dolor sit amet (small)} \\
{\normalsize Lorem ipsum dolor sit amet (normalsize)} \\
{\large Lorem ipsum dolor sit amet (large)} \\
{\Large Lorem ipsum dolor sit amet (Large)} \\
{\LARGE Lorem ipsum dolor sit amet (LARGE)} \\
{\huge Lorem ipsum dolor sit amet (huge)} \\
{\Huge Lorem ipsum dolor sit amet (Huge)} \\
\end{document}
%%

On peut également modifier la taille du texte pour un bloc avec `\fontsize{<font size>}{<space between lines>}\selectfont`

``` latex
{\fontsize{20}{12}\selectfont
Lorem ipsum dolor sit amet
}
```

### Couleur

Nécessite d'importer le package `xcolor`.

``` latex
\usepackage{xcolor}

Lorem ipsum {\color{blue} dolor sit amet}, consectetur adipiscing edit.
```

%%
\documentclass{report}
\begin{document}

Lorem ipsum {\color{blue} dolor sit amet}, consectetur adipiscing edit.
\end{document}
%%

D'autres formats de couleurs sont disponibles :

``` latex
{\color[rgb]{1,.65,0} orange}
{\color[RGB]{255,165,0} orange}
{\color[HTML]{FFA500} orange}
{\color[cmyk]{0,.5,1,0} orange}
```

Les noms de couleurs définis sont :

<table>
  <tr>
    <td>black</td>
    <td>%% \color{black} black %%</td>
    <td>blue</td>
    <td>%% \color{blue} blue %%</td>
    <td>purple</td>
    <td>%% \color{purple} purple %%</td>
    <td>brown</td>
    <td>%% \color{brown} brown %%</td>
  </tr>
  <tr>
    <td>darkgray</td>
    <td>%% \color{dimgray} darkgray %%</td>
    <td>cyan</td>
    <td>%% \color{cyan} cyan %%</td>
    <td>magenta</td>
    <td>%% \color{magenta} magenta %%</td>
    <td>green</td>
    <td>%% \color{green} green %%</td>
  </tr>
  <tr>
    <td>gray</td>
    <td>%% \color{gray} gray %%</td>
    <td>teal</td>
    <td>%% \color{teal} teal %%</td>
    <td>violet</td>
    <td>%% \color{violet} violet %%</td>
    <td>lime</td>
    <td>%% \color{lime} lime %%</td>
  </tr>
  <tr>
    <td>lightgray</td>
    <td>%% \color{lightgray} lightgray %%</td>
    <td>yellow</td>
    <td>%% \color{yellow} yellow %%</td>
    <td>pink</td>
    <td>%% \color{pink} pink %%</td>
    <td>olive</td>
    <td>%% \color{olive} olive %%</td>
  </tr>
  <tr>
    <td>white</td>
    <td>%% \color{white} white %%</td>
    <td>orange</td>
    <td>%% \color{orange} orange %%</td>
    <td>red</td>
    <td>%% \color{red} red %%</td>
  </tr>
</table>

On peut également modifier la saturation et faire des mixs de couleurs :

<table>
  <tr>
    <td>blue!40</td>
    <td>%% \color{#9999FF} blue!40 %%</td>
    <td>= bleu clair</td>
  </tr>
  <tr>
    <td>blue</td>
    <td>%% \color{blue} blue %%</td>
    <td>= bleu normal</td>
  </tr>
  <tr>
    <td>blue!40!black</td>
    <td>%% \color{#000066} blue!40!black %%</td>
    <td>= bleu foncé</td>
  </tr>
</table>

---

## Alignement

### Justifier

Par défaut le texte est justifié

``` latex
Lorem ipsum dolor sit amet...
```

%%
\documentclass{report}
\begin{document}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero interdum leo consequat sodales at nec ipsum.
\end{document}
%%

On peut l'aligner à gauche

``` latex
\begin{flushleft}
Lorem ipsum dolor sit amet...
\end{flushleft}
```

%%
\documentclass{report}
\begin{document}

\begin{flushleft}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero interdum leo consequat sodales at nec ipsum.
\end{flushleft}
\end{document}
%%

À droite

``` latex
\begin{flushright}
Lorem ipsum dolor sit amet...
\end{flushright}
```

%%
\documentclass{report}
\begin{document}

\begin{flushright}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero interdum leo consequat sodales at nec ipsum.
\end{flushright}
\end{document}
%%

Ou au centre

``` latex
\begin{center}
Lorem ipsum dolor sit amet...
\end{center}
```

%%
\documentclass{report}
\begin{document}

\begin{center}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero interdum leo consequat sodales at nec ipsum.
\end{center}
\end{document}
%%

---

## Texte littéral

Il est possible d'ajouter du texte littéral avec la commande `verb`.  
N'importe quel délimiteur peut être utilisé, ici on utilise `"`.

``` latex
\verb"$\sum$"
```

%%
\documentclass{report}
\begin{document}

\begin{verbatim}
$\sum$
\end{verbatim}
\end{document}
%%

Même chose avec l'environnement `verbatim`, a priori pour un bloc de texte long.

``` latex
\begin{verbatim}
$\sum$
\end{verbatim}
```

%%
\documentclass{report}
\begin{document}

\begin{verbatim}
$\sum$
\end{verbatim}
\end{document}
%%

Pour conserver les tabulations du texte (pour du code par exemple), il faut utiliser l'environnement `Verbatim` du package `fancyvb`.

``` latex
\usepackage{fancyvrb}
\fvset{tabsize=4}

\begin{Verbatim}
function helloWorld() {
  return "Hello world";
}
\end{Verbatim}
```

%%
\documentclass{report}
\begin{document}

\begin{Verbatim}
function helloWorld() {
  return "Hello world";
}
\end{Verbatim}
\end{document}
%%

---

## Listes

Trois types de listes peuvent être crées : une liste énumérée (`enumerate`), une liste à puce (`itemize`) ou une liste de définitions (`description`).

Un item de la liste commence par la commande `\item` et peut contenir tout type de contenu : texte, image, tableau, sous-liste, etc. Le caractère de la puce peut être donné en option (exemple: `\item[-]` pour créer une liste de tirets).

### À puce

``` latex
\begin{itemize}
\item Item 1
Du texte
\item Item 2 \\
Du texte
\item Item 3
  \begin{itemize}
  \item[+] Item 3.1
  \item[-] Item 3.2
  \item[!] Item 3.3
  \end{itemize}
\end{itemize}
```

%%
\documentclass{report}
\begin{document}

\begin{itemize}
\item Item 1
Du texte
\item Item 2 \\
Du texte
\item Item 3
  \begin{itemize}
  \item[+] Item 3.1
  \item[-] Item 3.2
  \item[!] Item 3.3
  \end{itemize}
\end{itemize}
\end{document}
%%

### Énumérée

``` latex
\begin{enumerate}
\item Item 1
\item Item 2
\end{enumerate}

```

%%
\documentclass{report}
\begin{document}

\begin{enumerate}
\item Item 1
\item Item 2
\end{enumerate}
\end{document}
%%

### De définitions

``` latex
\begin{description}
\item[Mot] D\'efinition du mot
\item[Mot 2] Un autre mot
\end{description}
```

%%
\documentclass{report}
\begin{document}

\begin{description}
\item[Mot] D\\'{e}finition du mot
\item[Mot 2] Un autre mot
\end{description}
\end{document}
%%

### Padding

Pour modifier les marges avant/après les listes et entre les items, utiliser le package `enumitem`.  
Pour toutes les listes du documents:

``` latex
\usepackage{enumitem}
\setitemize{noitemsep,topsep=0pt,parsep=0pt,partopsep=0pt}
```

Pour une liste donnée:

``` latex
\usepackage{enumitem}

\begin{itemize}[noitemsep,topsep=0pt,parsep=0pt,partopsep=0pt]
\item item 1
\item item 2
\item item 3
\end{itemize}
```

---

## Tableaux

On peut créer un tableau avec l'environnement `tabular`.  
- La spécification des colonnes est donné en paramètre  
  Par exemple `\begin{tabular}{lll}` crée un tableau de 3 colonnes avec un alignement à gauche  
  Des bordures verticales peuvent être ajoutés au tableau avec `|` dans la spécification  
  Un séparateur différent de espace peut être spécifié avec `@{char}` dans la spécification  
- Le contenu du tableau est à l'intérieur de l'environnement  
  Les colonnes sont séparées par `&`  
  Les lignes sont séparées par `\\`  
  Des bordures horizontales peuvent être ajoutées au tableau avec `\hline` à l'intérieur du bloc  

<ins>Les valeurs de spécification sont</ins> :

| Valeur     | Description                |
|---         |---                         |
| l          | Texte à gauche (left)      |
| c          | Texte centré (center)      |
| r          | Texte à droite (right)     |
| p{largeur} | Texte justifié sur la largeur donnée (paragraph). Largeur: Xpx, Xem ou Xcm |

<ins>Exemples</ins> :

``` latex
\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\end{document}
%%

``` latex
\begin{tabular}{|r@{.}l|l|}
\hline
Chapitre & section & Description \\
\hline
1 & 1 & Item 1.1 \\
1 & 2 & Item 1.2 \\
150 & 3 & Item 150.3 \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|c|l|}
\hline
Chapitre.section & Description \\
\hline
&emsp;1.1 & Item 1.1 \\
&emsp;1.2 & Item 1.2 \\
150.3 & Item 150.3 \\
\hline
\end{tabular}
\end{document}
%%

### Titre

Pour donner un titre à un tableau, il est nécessaire de le mettre dans un environnement `table`.  
Le titre peut être placé en haut ou en bas du tableau avec `\caption[Titre court]{Titre long}`.  
Le titre court est optionnel, il sera affiché dans la liste des tableaux (sommaire) à la place du titre long si spécifié.  
[Cf float](#float)

``` latex
\begin{table}
\centering

\begin{tabular}{|l|l|l|}
\hline\hline
Label1 & Label2 & Label3 \\
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\caption{Le titre}
\end{table}
```

%%
\documentclass{report}
\begin{document}

\begin{center}
\begin{tabular}{ccc}
\hline\hline
Label1 & Label2 & Label3 \\
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\begin{par}Table 1: Le titre\end{par}
\end{center}

\end{document}
%%

Pour placer le titre en haut, la commande `\bigskip` est utile : elle ajoute une marge entre le titre et le tableau.

``` latex
\begin{table}
\centering
\caption{Le titre}
\bigskip

\begin{tabular}{|l|l|l|}
\hline\hline
Label1 & Label2 & Label3 \\
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
\end{table}
```

%%
\documentclass{report}
\begin{document}

\begin{center}
\begin{par}Table 1: Le titre\end{par}

\begin{tabular}{ccc}
\hline\hline
Label1 & Label2 & Label3 \\
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
\end{center}

\end{document}
%%


#### Pour ne pas afficher "Table n:"

- Pour tous les tableaux du documents  
  Placer dans le préambule :

  ``` latex
  \usepackage{caption}
  \captionsetup{labelformat=empty}
  ```

- Pour un tableau en particulier  
  Dans le préambule :

  ``` latex
  \usepackage{caption}
  ```

  Et utiliser la commande `\caption*`   :

  ``` latex
  \caption*{Le titre}
  ```

### Colspan

Des cellules peuvent être mergées horizontalement avec la commande `\multicolumn{nb}{spec}{text}`.

``` latex
\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & \multicolumn{2}{|l|}{Item 2.2 \ Item 2.3} \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & \multicolumn{2}{|l|}{Item 2.2 \ Item 2.3} \\
\hline
\end{tabular}

\end{document}
%%

### Rowspan

Les cellules ne peuvent pas être mergées verticalement à proprement parler.  
On peut simuler visuellement un rowspan en utilisant `\cline{debut-fin}` au lieu de `\hline`

``` latex
\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\cline{2-3}
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\cline{2-3}
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\end{document}
%%

On peut déplacer verticalement le texte à l'intérieur d'une cellule avec `\raisebox{pos}{texte}`.

``` latex
\begin{tabular}{|l|l|l|}
\hline
 & Item 1.2 & Item 1.3 \\
\cline{2-3}
\raisebox{0.5cm}{Item 2.1} & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
 & Item 1.2 & Item 1.3 \\
\cline{2-3}
\raisebox{0.5cm}{Item 2.1} & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\end{document}
%%

### Padding

On peut modifier la hauteur d'une cellule avec `\def\arraystrech{hauteur}`.  
Et la largeur d'une cellule avec `\def\tabcolsep{largeur}`.  
Placer ces commandes et le(s) tableau(x) ciblé(s) dans un même groupe.

``` latex
\begingroup
\def\arraystretch{2}
\def\tabcolsep{0.5cm}

\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
\endgroup
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
 & & \\
&emsp;&emsp;Item 1.1&emsp;&emsp;
& &emsp;&emsp;Item 1.2&emsp;&emsp;
& &emsp;&emsp;Item 1.3&emsp;&emsp;
\\
& & \\
\hline
& & \\
&emsp;&emsp;Item 2.1&emsp;&emsp;
& &emsp;&emsp;Item 2.2&emsp;&emsp;
& &emsp;&emsp;Item 2.3&emsp;&emsp;
\\
& & \\
\hline
\end{tabular}

\end{document}
%%

Pour ajouter un padding à tous les tableaux du document, définir `\renewcommand{\arraystretch}{2}` et `\renewcommand{\tabcolsep{0.5cm}` dans le préambule.

### Row margin

Une ligne peut être déplacée, plus haut ou plus bas avec `[x unit]`

``` latex
\begin{tabular}{lr}
Item                                      & Amount \\
\hline
Salaries (research assistants, secretary) & \$24,000 \\
Travel expenses                           & \$8,000 \\
Software                                  & \$2,000 \\
[8pt]\cline{2-2}
Total                                     & \$34,000
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{lr}
Item                                      & Amount \\
\hline
Salaries (research assistants, secretary) & \\$24,000 \\
Travel expenses                           & \\$8,000 \\
Software                                  & \\$2,000 \\
[15pt]\cline{2-2}
Total                                     & \\$34,000
\end{tabular}

\end{document}
%%

### Couleurs

Pour donner un fond coloré aux lignes/cellules, il faut utiliser les commandes `\rowcolor{color}` et `\cellcolor{color}`.
Nécessite les packages `xcolor` et `colortbl`.

``` latex
\usepackage{xcolor,colortbl}

\begin{tabular}{|l|l|l|}
\hline
\rowcolor{gray!10}Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
\cellcolor{blue!25}Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}
```

%%
\documentclass{report}
\begin{document}

\begin{tabular}{|l|l|l|}
\hline
\rowcolor{#F3F3F3}Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
\cellcolor{#BFBFFF}Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\end{document}
%%

### Paysage

Pour afficher un tableau au format paysage, importer le package `rotating` et utiliser l'environnement `sidewaystable` au lieu de `table`

``` latex
%--- preamble
\usepackage{rotating}

%--- document
\begin{sidewaystable}
\centering

\begin{tabular}{|l|l|l|}
\hline
Item 1.1 & Item 1.2 & Item 1.3 \\
\hline
Item 2.1 & Item 2.2 & Item 2.3 \\
\hline
\end{tabular}

\caption{Turn the page sideways to look at this table.}
\end{sidewaystable}
```

---

## Images

Pour inclure une image, utiliser la commande `\includegraphics{nomfichier}`.  
Attention, en compilant avec `latex`, seuls les fichiers PostScript (.ps ou .eps) sont admis.  
Avec `pdflatex`, les fichiers PDF, PDF et JPG sont également admis.  
L'extension peut être omise.

  ``` latex
  \includegraphics{monimage.jpg}
  ```

%%
\documentclass{report}
\begin{document}

\includegraphics{https://placehold.it/50x50}

\end{document}
%%


### Taille

On peut modifier la taille de l'image avec les options `width`, `height` et `scale`.  
`width=\textwidth` pour élargir à la taille de la page.

``` latex
\includegraphics[scale=0.48]{monimage.png}
```

%%
\documentclass{report}
\begin{document}

\includegraphics[scale=0.48]{https://placehold.it/50x50}

\end{document}
%%


[Taille affichée par includegraphics](https://tex.stackexchange.com/questions/21627/image-from-includegraphics-showing-in-wrong-image-size#answer-21695)

### Faire pivoter

L'option `angle` permet de faire pivoter l'image.

``` latex
\includegraphics[scale=2,angle=90]{myfigure}
```

%%
\documentclass{report}
\begin{document}

\includegraphics[scale=2,angle=90]{https://placehold.it/50x50}

\end{document}
%%


### Bordure

Pour mettre une bordure autour de l'image, importer le package `adjustbox` et passer l'option `cfbox`

``` latex
\usepackage[export]{adjustbox}

\includegraphics[cfbox=lightgray 1pt 1pt]{monimage.png}
```

%%
\documentclass{report}
\begin{document}

\includegraphics[cfbox=lightgray 1pt 1pt]{https://placehold.it/50x50}

\end{document}
%%

### Titre

Pour mettre un titre à une image, mettre l'image dans un environnement `figure` et utiliser la commande `\caption`. 
[Cf float](#float)

``` latex
\begin{figure}[!htbp]
  \centering
  \includegraphics[cfbox=lightgray 1pt 1pt]{monimage.png}
  \caption{Le titre}
\end{figure}
```

%%
\documentclass{report}
\begin{document}

\begin{center}
\includegraphics[cfbox=lightgray 1pt 1pt]{https://placehold.it/50x50}

\begin{par}Figure 1: Le titre\end{par}
\end{center}

\end{document}
%%

### Répertoire

Par défaut l'image est cherchée dans le répertoire du fichier `.tex`.  
On peut spécifier le path des fichiers avec `\graphicspath{{path/}}`

  ``` latex
  \graphicspath{{images/}}
  ```

### Paysage

Pour afficher une image au format paysage, importer le package `rotating` et utiliser l'environnement `sidewaysfigure` au lieu de `figure`

``` latex
\usepackage{rotating}

\begin{sidewaysfigure}
\centering
\includegraphics{myfigure.png}
\caption{Turn the page sideways to look at this figure.}
\end{sidewaysfigure}
```

---

## Float

Les images placées dans un environnement `figure` et les tableaux placés dans un `table` "flottent" dans la page afin d'éviter les espaces vides.

Par défaut, Latex essaie de placer l'image ou tableau en haut de la page en cours, sinon en bas, ou si ni l'un ni l'autre ne marche, en haut de la page suivante. Ce comportement peut être changé avec les options : `\begin{table}[htp]` par exemple.

| Caractère | Signification | Description                                               |
|---        |---            |---                                                        |
| h         | here          | À l'emplacement dans le texte où se situe l'environnement |
| t         | top           | En haut de la page                                        |
| b         | bottom        | En bas de la page                                         |
| p         | page          | Sur une page spéciale qui ne contient que des floats      |

### Clear float

Pour stopper les floats, par exemple pour empêcher une image d'être située après le texte, utiliser `\FloatBarrier` du package `placeins`.

  ``` latex
  \usepackage[section]{placeins}

  Lorem ipsum dolor sit amet
  \begin{figure}[!htbp]
    \centering
    \includegraphics[scale=0.48,cfbox=lightgray 1pt 1pt]{monimage.png}
    \caption{Le titre}
  \end{figure}
  \FloatBarrier
  ```

Pour afficher tous les floats en mémoire et commencer une nouvelle page : `\clearpage`

---

## Citations

Les commandes `quote`, `quotation` et `verse` permettent d'afficher une citation.  
Une citation se distingue par une marge à gauche et droite du texte.

* `quote` pour une citation courte, ou une suite de citations courtes, séparées par des lignes vides.

  ``` latex
  \begin{quote}
  Lorem ipsum....
  \end{quote}
  ```

  %%
  \documentclass{report}
  \begin{document}

  \begin{quote}
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis sapien, eleifend quis consectetur ut, dictum scelerisque nisi.

  Aliquam aliquam pellentesque semper. Donec fringilla enim sem, quis facilisis purus egestas eget. Duis fringilla consequat lorem eu tincidunt. Morbi arcu nulla, laoreet mollis maximus porta, lacinia quis augue.
  \end{quote}
  \end{document}
  %%

* `quotation` pour les citations longues, de plus d'un paragraphe. Indente la première ligne chaque paragraphe.

  ``` latex
  \begin{quotation}
  Lorem ipsum....
  \end{quotation}
  ```

  %%
  \documentclass{report}
  \begin{document}

  \begin{quotation}
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis sapien, eleifend quis consectetur ut, dictum scelerisque nisi.

  Aliquam aliquam pellentesque semper. Donec fringilla enim sem, quis facilisis purus egestas eget. Duis fringilla consequat lorem eu tincidunt. Morbi arcu nulla, laoreet mollis maximus porta, lacinia quis augue.
  \end{quotation}
  \end{document}
  %%

* `verse` pour un poème en verset. Si une ligne occupe plus d'une ligne sur la page, la suite du texte est indentée.

  ``` latex
  \begin{verse}
  Lorem ipsum....
  \end{verse}
  ```

  %%
  \documentclass{report}
  \begin{document}

  \begin{verse}
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis sapien, eleifend quis consectetur ut, dictum scelerisque nisi.

  Aliquam aliquam pellentesque semper. Donec fringilla enim sem, quis facilisis purus egestas eget. Duis fringilla consequat lorem eu tincidunt. Morbi arcu nulla, laoreet mollis maximus porta, lacinia quis augue.
  \end{verse}
  \end{document}
  %%

---

## Séparateurs

Des lignes, horizontales ou verticales, peuvent être crées avec la commande `\rule{width}{height}`.

``` latex
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae cursus nisl.

\rule{\textwidth}{1pt}
```

%%
\documentclass{report}

\begin{document}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae cursus nisl.

\rule{\textwidth}
\end{document}
%%

---

## Notes de bas de page

Les notes de bas de page sont affichées en bas de la page en cours.  
Les numéros s'incrémentent à partir du début du document.

``` latex
Lorem ipsum dolor sit amet, consectetur adipiscing elit\footnote{Ma footnote}.
```

%%
\documentclass{report}
\begin{document}
Lorem ipsum dolor sit amet, consectetur adipiscing elit\footnote{Ma footnote}.
\end{document}
%%

---

## Maths

Latex dispose de plusieurs modes pour afficher du texte mathématique.  
Le package `amssymb` ajoute des symboles mathématiques, `amsmath` ajoute des environnements et `amsfonts` ajoute des polices supplémentaires. Ces packages sont souvent utiles.

* En ligne : `$ ... $`, `\( ... \)` ou `\begin{math} ... \end{math}`  
  Pour afficher des expressions mathématiques à l'intérieur d'un bloc de texte

  ``` latex
  L'équation $d = \sqrt{b^2 - 4ac}$
  ```

  %%
  \documentclass{report}
  \begin{document}
  L'équation $d = \sqrt{b^2 - 4ac}$
  \end{document}
  %%

* En bloc : `$$ ... $$`, `\[ ... \]` ou `\begin{displaymath} ... \end{displaymath}`

  ``` latex
  The quadratic equation $ax^2 + bx + c = 0$ has two roots
  $$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$
  where the nature of the roots is determined by the sign
  of the discriminent $b^2 - 4ac$.
  ```

  %%
  \documentclass{report}
  \begin{document}

  The quadratic equation $ax^2 + bx + c = 0$ has two roots

  \begin{displaymath}
    x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
  \end{displaymath}

  where the nature of the roots is determined by the sign
  of the discriminent $b^2 - 4ac$.
  \end{document}
  %%

* En bloc énuméré : `\begin{equation} ... \end{equation}`

  ``` latex
  The derivative of the function $f(x)$ at the point $x_0$ is
  \begin{equation}
  f’(x_0) =
  \lim_{x \rightarrow x_0}
  \frac{f(x) - f(x_0)}{x - x_0}
  \end{equation}
  ```

  %%
  \documentclass{report}
  \begin{document}

  The derivative of the function $f(x)$ at the point $x_0$ is
  \begin{equation} \tag{1}
  f’(x_0) =
  \lim_{x \rightarrow x_0}
  \frac{f(x) - f(x_0)}{x - x_0}
  \end{equation}
  \end{document}
  %%

  Avec le package `amsmath`, le numéro de l'équation peut être remplacé par un symbole

  ``` latex
  The derivative of the function $f(x)$ at the point $x_0$ is
  \begin{equation} \tag{a}
  f’(x_0) =
  \lim_{x \rightarrow x_0}
  \frac{f(x) - f(x_0)}{x - x_0}
  \end{equation}
  ```

  %%
  \documentclass{report}
  \begin{document}

  The derivative of the function $f(x)$ at the point $x_0$ is
  \begin{equation} \tag{a}
  f’(x_0) =
  \lim_{x \rightarrow x_0}
  \frac{f(x) - f(x_0)}{x - x_0}
  \end{equation}
  \end{document}
  %%

* En bloc multiligne. Nécessite le package `amsmath`  
  Utilser `&` pour contrôler l'alignement des équations  
  Placer `\nonumber` en fin de ligne pour ne pas énumérer cette ligne

  ``` latex
  \begin{align}
  x  & = 2 \\
  x' & = 2 + 3 \\
     & = 5 \nonumber
  \end{align}
  ```

  %%
  \documentclass{report}
  \begin{document}

  \begin{align}
  \tag{1} x  & = 2 \\
  \tag{2} x' & = 2 + 3 \\
             & = 5
  \end{align}
  \end{document}
  %%

  Bloc multiligne non énuméré :

  ``` latex
  \begin{align*}
  x  & = 2 \\
  x' & = 2 + 3 \\
     & = 5
  \end{align*}
  ```

  %%
  \documentclass{report}
  \begin{document}

  \begin{align*}
  x  & = 2 \\
  x' & = 2 + 3 \\
     & = 5
  \end{align*}
  \end{document}
  %%

Voir [expressions mathématiques](latex-maths.md) pour la manière de formatter le contenu d'un bloc de maths.

### Taille

Pour changer la taille des maths dans tout le document, importer `relsize`
et utiliser `\DeclareMathSizes {text size}{math size}{script size}{scriptscript size}`.
Le premier paramètre (text size) doit être exactement la taille actuelle du texte, sinon la commande ne marchera pas.

```
\documentclass[10pt]{report}
\usepackage{relsize}
\DeclareMathSizes{10}{15}{7}{7}
```

Pour changer la taille de quelques caractères, importer `amsmath` et utiliser `\text{<taille>\ensuremath <math>}`

``` latex
$$\text{\huge\ensuremath \alpha}$$
```

### Couleur

Pour changer la couleur des maths :

``` latex
\usepackage{xcolor}
\everymath={\color{blue}}
% tabular, minipage and \parbox all use math mode and their output would be blue
\makeatletter\def\m@th{\color{black}}\makeatother
% output black for any "fake" math
```

[Background](https://tex.stackexchange.com/questions/135053/how-to-highlight-all-inline-math-in-document#answer-135080)

---

## Blocs

Des blocs de texte avec bordure et couleur de fond peuvent être crées avec l'environnement `mdframed` du pakcage `mdframed`.

``` latex
\begin{mdframed}[backgroundcolor=blue!10,linecolor=blue!25]
Lorem ipsum color sit amet
\end{mdframed}
```

%%
\documentclass{report}
\begin{document}

\begin{mdframed}[backgroundcolor=#E6E6FF,linecolor=#BFBFFF]
Lorem ipsum color sit amet
\end{mdframed}

\end{document}
%%

Avec l'option `framemethod=TikZ`, mdframed peut ajouter des bords arrondis, marges et padding

``` latex
\usepackage[framemethod=TikZ]{mdframed}
\begin{document}

\begin{mdframed}[roundcorner=10pt,linecolor=orange,outerlinewidth=1,
  leftmargin=1,rightmargin=1,
  innerleftmargin=15,innertopmargin=15,innerbottommargin=15]

  Lorem ipsum color sit amet
\end{mdframed}

\end{document}
```

%%
\documentclass{report}
\begin{document}

\begin{mdframed}[roundcorner=10pt,linecolor=orange,outerlinewidth=1,leftmargin=1,rightmargin=1,innerleftmargin=15,innertopmargin=15,innerbottommargin=15]
Lorem ipsum color sit amet
\end{mdframed}

\end{document}
%%

On peut également ajouter un titre au bloc

``` latex
\begin{mdframed}[frametitle={\colorbox{white}{\space Infobox\space}},
    innertopmargin=5pt,
    innerbottommargin=10pt,
    frametitleaboveskip=-\ht\strutbox,
    frametitlealignment=\center]

  Lorem ipsum color sit amet
\end{mdframed}
```

%%
\documentclass{report}
\begin{document}

\begin{mdframed}[frametitle={\colorbox{white}{\space Infobox\space}}, innertopmargin=5, innerbottommargin=10, frametitleaboveskip=-\ht\strutbox, frametitlealignment=\center, linecolor=black]
  Lorem ipsum color sit amet
\end{mdframed}

\end{document}
%%

NB `\wd`, `\dp` et `\ht` permettent de récupérer la largeur (width), l'espace sous une ligne (depth) et la hauteur d'une ligne (height). `\ht\strutbox` = hauteur d'une ligne de la boite. [Explications width, depth, height](https://tex.stackexchange.com/questions/40977/confused-with-tex-terminology-height-depth-width#answer-41014).

[Documentation mdframed](https://tools.ietf.org/doc/texlive-doc/latex/mdframed/mdframed.pdf)  
[Quelques exemples avec d'autres packages](https://www.slideshare.net/linjaaho/how-to-make-boxed-text-with-latex)

{% endraw %}

---

## Liens

Des liens HTTP peuvent être ajoutés grâce au package `hyperref`.

`\url{lien}` ajoute un lien cliquable sur une url.  
`\href{lien}{text}` ajoute un lien cliquable sur du texte.

La commande `\urlstyle{<font family>}` permet de changer la famille de font de la commande  `\url`.

Par défaut, les liens sont entourés d'une bordure cyan. Avec les options du packages on peut  

- Changer la bordure des liens: `allbordercolors=couleur`
- Colorer les liens plutôt que de mettre une bordure: `colorlinks`
- Changer la couleur des liens: `allcolors=couleur`
- Enlever complètement la bordure et la couleur des liens: `hidelinks`

[Plus d'options](https://tex.stackexchange.com/questions/50747/options-for-appearance-of-links-in-hyperref#answer-50754)

``` latex
%--- preamble
\usepackage[colorlinks, allcolors=blue]{hyperref}
\urlstyle{rm}

%--- document
\url{http://google.com}
\href{http://google.com}{Google}
```

---

## Schémas

Latex permet de créer des schémas.

### Dessin

[LatexDraw](http://latexdraw.sourceforge.net/) permet d'éditer des figures Latex (nécessite Java Runtime 8).  
Cela permet de placer grossièrement les éléments sur le schéma et de récupérer le code généré pour l'éditer et le personnaliser par la suite avec un éditeur Latex classique.

``` latex
\documentclass[10pt]{report}
\pagenumbering{gobble}

\usepackage[usenames,dvipsnames]{pstricks}
\usepackage{epsfig}
\usepackage{pst-grad} % For gradients
\usepackage{pst-plot} % For axes
\usepackage[space]{grffile} % For spaces in paths
\usepackage{etoolbox} % For spaces in paths
\makeatletter % For spaces in paths
\patchcmd\Gread@eps{\@inputcheck#1 }{\@inputcheck"#1"\relax}{}{}
\makeatother

\begin{document}

\psscalebox{1.0 1.0} % Change this value to rescale the drawing.
{
\begin{pspicture}(0,-0.955)(12.37,0.955)
\psline[linecolor=black, linewidth=0.04, arrowsize=0.05291667cm 5.0,arrowlength=1.4,arrowinset=0.0]{<-}(2.8,0.245)(6.0,0.245)(6.0,0.245)
\psline[linecolor=black, linewidth=0.04, arrowsize=0.05291667cm 5.0,arrowlength=1.4,arrowinset=0.0]{<-}(6.0,-0.155)(2.8,-0.155)
\rput[bl](6.8,-0.445){\shortstack[c]{repr\'esentation \\ interne \\ (\`a l'ordinateur)}}
\rput[bl](0.0,-0.145){\shortstack[c]{repr\'esentation \\ externe}}
\rput[bl](3.7,0.445){\textit{codage}}
\rput[bl](3.7,-0.755){\textit{decodage}}
\end{pspicture}
}

\end{document}
```

### Export SVG

Pour récupérer la figure en SVG
* exporter en PDF
* [convertir le PDF en SVG](https://image.online-convert.com/fr/convertir-en-svg)
* retailler la viewbox avec Inkscape :  
  Fichier > Propriétés du document > onglet Page  
    Redimensionner la page au contenu > Ajuster la page au dessin

<ins>Résultat</ins> :

![](https://rawgit.com/a-mt/5b072a12c29d4e862b32af32c2e191cf/raw/9355a59f310a339300f1b924acf66912b9201671/tmp.svg)
