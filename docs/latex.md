---
title: Latex
category: Other
latex: true
---

{% raw %}

Latex (prononcé Latek) est un langage de markup qui permet de contrôler la mise en forme du texte. Contrairement aux autres langages de markup, la puissance de Latex est sa capacité d'afficher des figures complexes : des schémas, des formules mathématiques, des partitions musicales, etc.

OpenOffice et Word sont ce qu’on appelle des WYSIWYG (what you see is what you get = ce que vous voyez est ce que vous obtenez). 
Latex, lui, est un language de markup, basé sur l'idée du WYSIWYM (what you see is what you mean = ce que vous voyez est ce que vous voulez dire): on décrit le contenu et l'ordinateur se chargera de le formatter.

Les fichiers Latex sont de simples fichiers textes, auxquels on donne l'extension `.tex`. Ils peuvent donc s'écrire dans n'importe quel éditeur de texte. Ces fichiers peuvent ensuite être convertits en PDF, HTML, PNG, etc, à partir des instructions du fichier : formules, images, paragraphes de texte, etc...

<ins>Exemple de résultat généré à partir d'instructions Latex</ins> :

$$\sum_{k=2}^{47} k + 1$$

---

Cet article est une introduction à Latex qui indique comment :
- convertir un fichier Latex
- créer un document avec page de garde, sommaire, sections
- inclure des fichiers
- utiliser des labels et références
- créer des commandes et environnements

Un autre article est dédié sur [la manière de formatter le contenu](latex-markup.md) (texte en gras, équation, tableau, liste, etc).

---

## Installation

### Compilateur

Pour générer un document (PDF ou autre) à partir d'un fichier Latex (= compiler le fichier), il est nécessaire d'installer un ensemble de logiciels (= une distribution).

    sudo apt-get install texlive-full

![Workflow Latex](https://user.oc-static.com/files/235001_236000/235670.png)

Pour lancer la compilation à partir de la ligne de commande, on a les commande `latex` ou `pdflatex` :

    latex file.tex       Compile en file.dvi
    pdflatex file.tex    Compile en file.pdf

### Éditeur

On peut utiliser un éditeur spécial Latex, qui gère la coloration syntaxique des commandes Latex et ajoute des raccourcis par rapport un éditeur texte classique - mais ce n'est pas indispensable.

Les distributions et éditeurs Latex les plus connus sont :

| Plateforme | Distribution | Éditeur      |
|---         |---           |---           |
| Windows    | MiKTeX       | TeXnicCenter |
| Linux      | TeXlive      | Gummy        |
| Mac        | MacTeX       | TeXworks     |

---

## Environnements et commandes

### Environnement

Un environnement est une zone de texte délimitée par deux balises `\begin{nomenv}` et `\end{nomenv}`.  
Le document Latex est un environnement en soi (de type `document`).

<ins>Exemple de contenu d'un fichier Latex</ins> :

``` latex
\documentclass{article}

\begin{document}
Hello world!
\end{document}
```

Un environnement peut être imbriqué à l'intérieur d'un autre

``` latex
\documentclass{book}
\begin{document}

\begin{center}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu tincidunt lectus, ut pellentesque magna.
\end{center}

Aenean interdum ipsum vel libero elementum commodo.

\end{document}
```

%%
\documentclass{book}
\begin{document}

\begin{center}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu tincidunt lectus, ut pellentesque magna.
\end{center}

Aenean interdum ipsum vel libero elementum commodo.

\end{document}
%%

### Commande

Le Latex s'écrit sous la forme de "commandes" qui
- commencent par un backslash, suivit de leur nom (sensible à la casse) `\nomcommande`
- prennent éventuellement des options entre crochets `[]`
- et/ou un paramètre entre accolades `{}`

<!-- -->

    \nomcommande[<option,option,...>]{<param>}

<ins>Exemples</ins> :

    \newline                              Insère un retour à la ligne
    \textsl{Hello World}                  Met "Hello World" en italique
    \documentclass[twocolumn]{article}    Affiche le texte du document sur 2 colonnes

### Commentaire

Tout ce qui est placé après `%` est en commentaire jusqu'à la fin de la ligne et ne sera donc pas présent dans le fichier compilé (PDF, PNG...).

``` latex
Du texte    % un commentaire
```

Pour créer un commentaire sur plusieurs lignes, il faut importer le package `verbatim` et utiliser un environnement de type `comment` (avec les tags `begin` et `end`).

``` latex
\usepackage{verbatim}

Lorem
\begin{comment}
Un commentaire
sur plusieurs ligne
\end{comment}
ipsum
```

---

## 1. Type de document

La première commande du fichier Latex doit être `documentclass` - commande qui spécifie le type de document.  
La manière dont le document va être formatté (indentations, numéro de page, etc) en dépendra.  
Cette commande accepte également des [options](http://mirrors.rit.edu/CTAN/info/lshort/english/lshort.pdf#table.1.2).

    \documentclass[<options>]{<type>}

Par exemple :

``` latex
\documentclass[12pt]{article}

\begin{document}
Hello World
\end{document}
```

[Plus d'exemples de types et options](https://texblog.org/2013/02/13/latex-documentclass-options-illustrated)

<ins>Les types les plus courants sont</ins> :

| Type      | Utilisé pour                         |
|---        |---                                   |
| article   | Article, rapport, documentation, etc |
| report    | Rapport (thèse, stage)               |
| book      | Livre                                |
| slides    | Slides                               |
| letter    | Lettres                              |
| minimal   | Document sans formattage             |

Il est possible de créer de nouveaux types (fichiers .cls)

---

## 2. Préambule

L'endroit entre `\documentclass` et `begin{document}` est ce qu'on appelle le *préambule*. Cette partie n'est pas affichée dans le résultat final, elle sert à importer des packages et à définir des configurations et metadatas.

### Importer un package

Les packages peuvent modifier le style du document et/ou ajouter de nouvelles fonctionnalités.  
Par exemple le package `verbatim` ajoute la gestion des blocs de commentaire.  
On les importe avec la commande `\usepackage`.

    \usepackage[<options>]{<name>}

### Modifier les entêtes et pieds de page

`\pagestyle` définit si le document doit afficher les entêtes et/ou pieds de page sur les pages.

    \pagestyle{<style>}

| Style     | Description                                                       |
|---        |---                                                                |
| plain     | (Valeur par défaut) Pied de page : numéro de page (au centre)     |
| headings  | Entête : titre du chapitre (à gauche) + numéro de page (à droite) |
| empty     | Rien                                                              |

<ins>Exemples</ins> (dans l'ordre) :

![Plain](https://user.oc-static.com/thb/241001_242000/241563.png)
![Headings](https://user.oc-static.com/thb/241001_242000/241562.png)
![Empty](https://user.oc-static.com/thb/241001_242000/241561.png)

On peut également modifier le style de page uniquement pour la page en cours avec `\thispagestyle{<style>}`.  
[Pour plus d'infos](https://fr.sharelatex.com/learn/Headers_and_footers)

### Langage du document

Par défaut, le texte est en anglais (sommaire, chapitre, etc).  
On peut modifier le langage en important le package du language voulu

| Par défaut | En français |
|---         |---          |
| ![Snapchot section](https://i.imgur.com/KjSQVDql.png) | ![Snapshot section fr](https://i.imgur.com/oFtimzsl.png) |

Par exemple pour du français
1. Installer le package

   ``` shell
   sudo apt-get install texlive-fonts-recommended texlive-lang-french
   ```

2. Importer le package

    ``` latex
    \documentclass{report}
    \usepackage[utf8]{inputenc}
    \usepackage[french]{babel}
    \usepackage[T1]{fontenc}
    \begin{document}

    \part{Ma partie}
    \chapter{Mon chapitre}
    \section{Ma section}
    \subsection{Ma sous-section}

    Lorem...

    \end{document}
    ```

    NB Si une erreur `Unknown language 'french'` apparaît à la compilation, supprimer le fichier .aux

### Titre, auteur et date du document

Toujours dans le préambule, on définit les metadatas :

``` latex
\title{Mon rapport}
\author{Bob}
\date{1 Janvier 2010}
```

---

## 3. Page de garde

La commande `\maketitle` crée une page de garde.  
Elle affiche les metadatas du document qui ont été définies dans le préambule.

``` latex
\documentclass{report}
\title{Mon rapport}
\author{Bob}
\date{1 Janvier 2010}

\begin{document}
\maketitle
\end{document}
```

%%
\documentclass{report}
\title{Mon rapport}
\author{Bob}
\date{1 Janvier 2010}

\begin{document}
\maketitle
\end{document}
%%

---

## 4. Sommaire

Une table des matière est automatiquement générée à partir des titres des chapitres, sections, etc, et peut être affiché avec la commande `\tableofcontents`.

Attention, pour que le contenu de la table des matières s'affiche, il est nécessaire de compiler deux fois.

![Snapshot tableofcontents](https://i.imgur.com/zcr5q0Ll.png)

On peut également afficher la liste des figures du document avec `\listoffigures` et la liste des tableaux avec `\listoftables`.

---

## 5. Résumé

Uniquement pour les documents de type `article`, l'environnement `abstract` permet d'ajouter un résumé.

``` latex
\begin{abstract}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Nulla porttitor, mauris in semper faucibus, ante ipsum lacinia est, vitae molestie dolor elit tincidunt eros.
\end{abstract}
```

%%
\documentclass{article}

\begin{document}
\begin{abstract}
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Nulla porttitor, mauris in semper faucibus, ante ipsum lacinia est, vitae molestie dolor elit tincidunt eros.
\end{abstract}
\end{document}
%%

---

## 6. Hiérarchie

Il existe des commandes pour hiérarchiser le contenu

| Hiérarchie        | Commande                                    |
|---                |---                                          |
| Partie            | \part{nom de la partie}                     |
| Chapitre          | \chapter{nom du chapitre}                   |
| Section           | \section{nom de la section}                 |
| Sous-section      | \subsection{nom de la sous section}         |
| Sous-sous-section | \subsubsection{nom de la sous sous section} |
| Paragraphe        | \paragraph{nom du paragraphe}               |
| Sous-paragraphe   | \subparagraph{nom du sous paragraphe}       |

Pour ajouter une chapitre, section, etc, qui n'est pas numéroté, et qui n'est pas affiché dans le sommaire, ajouter un `*` à la fin de la commande. Exemple: `\chapter*{nom du chapitre}`, `\section*{nom de la section}`.

``` latex
\documentclass{report}

\begin{document}
\part{Ma partie}

\chapter{Mon chapitre}
\section{Ma section}
\subsection{Ma sous-section}

Le contenu en dehors d'un paragraphe \\
Sur plusieurs lignes

\paragraph{}
Le contenu d'un paragraphe \\
Sur plusieurs lignes

\subparagraph{}
Le contenu d'un sous-paragraphe \\
Sur plusieurs lignes
```

%%
\documentclass{report}

\begin{document}
\part{Ma partie}

\chapter{Mon chapitre}
\section{Ma section}
\subsection{Ma sous-section}

Le contenu en dehors d'un paragraphe \\
Sur plusieurs lignes

\paragraph{}
Le contenu d'un paragraphe \\
Sur plusieurs lignes

\subparagraph{}
Le contenu d'un sous-paragraphe \\
Sur plusieurs lignes
%%

---

## 7. Meta-hiérarchie

Pour les documents de type `book`, il existe quatres commandes supplémentaires poour séparer les parties du livre : introduction, contenu, annexes et conclusion. Les différentes parties ont pour effet de modifier le libellé associé aux chapitres : par exemple dans la partie `\appendix`, les chapitres sont numérotés "Annexe A", "Annexe B" au lieu de "Chapitre 1", "Chapitre 2".

<table>
  <tr>
    <th>Commande</th>
    <td><code>\frontmatter</code></td>
    <td><code>\mainmatter</code></td>
    <td><code>\appendix</code></td>
    <td><code>\backmatter</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Intro / présentation</td>
    <td>Contenu</td>
    <td>Annexes</td>
    <td>Conclusion / résumé</td>
  </tr>
  <tr>
    <th>Intitulé affiché</th>
    <td>(rien)</td>
    <td>Chapitre 1</td>
    <td>Annexe A</td>
    <td>(rien)</td>
  </tr>
  <tr>
    <th></th>
    <td><img src="https://i.imgur.com/6FnGogU.png" alt="Snapshot frontmatter"></td>
    <td><img src="https://i.imgur.com/wVXwBig.png" alt="Snapshot mainmatter"></td>
    <td><img src="https://i.imgur.com/8d44k6F.png" alt="Snapshot appendix"></td>
    <td><img src="https://i.imgur.com/0Qw1sIU.png" alt="Snapshot backmatter"></td>
  </tr>
  <tr>
    <th>Numéros de page</th>
    <td>i, ii, iii</td>
    <td>1, 2, 3</td>
    <td>1, 2, 3</td>
    <td>1, 2, 3</td>
  </tr>
  <tr>
    <th></th>
    <td><img src="https://i.imgur.com/R3iPNfT.png" alt="Snapshot frontmatter page"></td>
    <td><img src="https://i.imgur.com/FzwP824.png" alt="Snapshot mainmatter page"></td>
    <td><img src="https://i.imgur.com/nKbTFuY.png" alt="Snapshot appendix page"></td>
    <td><img src="https://i.imgur.com/M0qFZzp.png" alt="Snapshot backmatter page"></td>
  </tr>
</table>

<center>
<pre><img src="https://i.imgur.com/wdMvCOm.png" alt="Snapshot tableofcontents"></pre>
</center>

<ins>Code utilisé</ins> :

``` latex
\documentclass[oneside]{book}
\usepackage[utf8]{inputenc}
\usepackage[french]{babel}
\usepackage[T1]{fontenc}
\begin{document}

\tableofcontents

\frontmatter
\chapter{Chapitre frontmatter}
Content

\mainmatter
\chapter{Chapitre mainmatter}
Content

\appendix
\chapter{Chapitre appendix}
Content

\backmatter
\chapter{Chapitre backmatter}
Content

\end{document}
```

---

## 8. Contenu

Voir l'article sur [la manière de formatter le contenu](latex-markup.md) :

- espaces et retours chariot
- caractères spéciaux
- accents
- formattage (italique, souligné, coloré, etc)
- alignement
- verbatim (contenu littéral)
- listes
- tableaux
- images
- citations
- séparateurs
- notes de bas de pages (footnotes)
- mathématiques
- blocs (bordures, couleur de fond)
- liens

---

## Inclure des fichiers

Il est possible d'inclure des fichiers Latex avec la commande `\include`.  
Les fichiers inclus fichiers ne doivent contenir que le corps du document (pas de `documentclass` ni d'environnement `document`).
Il est inutile de préciser l'extension.

``` latex
\include{filename}
```

On peut indiquer au parser d'ignorer les `include` qui n'ont pas été whitelistés avec la commande `\includeonly` (situés après la commande).
Cette commande est utile lors de la rédaction du document, afin d'accélerer le temps de génération du PDF.

``` latex
\includeonly{filename, filename2, ...}
```

Lorsqu'on inclus un fichier avec `\include`, le contenu du fichier est ajouté sur une nouvelle page. On peut insérer sur place avec la commande `\input`. `\includeonly` ne la filtre pas.

``` latex
\input{filename}
```

<ins>Par exemple</ins> :

``` latex
% Fichier principal
\documentclass[oneside]{book}
\include{inc.definitions}
\includeonly{
    04-Listes,
    05-Arbres
}

\begin{document}
\tableofcontents
\include{01-Introduction}
\include{02-Vecteurs}
\include{03-Fichiers}
\include{04-Listes}
\include{05-Arbres}
\end{document}
```

``` latex
% inc.definitions.tex
\usepackage[utf8]{inputenc}
\usepackage[francais]{babel}
\usepackage[T1]{fontenc}
\renewcommand{\familydefault}{\sfdefault}

\usepackage[letterpaper, margin=1in]{geometry}
\usepackage{amsmath,amssymb}
\usepackage{mdframed}
\usepackage[section]{placeins}
\usepackage{fancyvrb}
\fvset{tabsize=4}

\newcommand\tab[1][1cm]{\hspace*{#1}}
```

``` latex
% 01-Introduction
\part*{Introduction}

\section*{Au programme}
Description du programme
```

---

## Labels et références

Un *label* permet de marquer l'emplacement d'un bloc: section, sous-section figure, table ou théorème. 
Un label peut se situer dans un sous-bloc du bloc référencé car c'est le type qui permet de déterminer la cible.  
Une *référence* affiche l'emplacement de ce label (soit la page soit le numéro de section).  
Nécessite d'être compilé deux fois.

- Ajouter un label

  ``` latex
  \label{<type>:<id>}
  ```

- Afficher le numéro de section associé à un label

  ``` latex
  \ref{<type>:<id>}
  ```

- Afficher le numéro de page où se situe la section

  ``` latex
  \pageref{<type>:<id>}
  ```


<ins>Par exemple</ins> :

``` latex
\documentclass{report}
\begin{document}

\section{Ma section}
\subsection{Ma sous-section}
\label{sec:lorem}
\label{subsec:lorem}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida nec massa id consectetur. Nullam condimentum urna nulla, sit amet sodales leo rhoncus nec. Aenean vehicula ante dictum, sagittis augue dapibus, varius elit. Suspendisse porta orci tortor, ac sagittis quam fermentum non.

\section{Mon autre section}
Voir la section \ref{sec:lorem}, page \pageref{sec:lorem} \\
Sous-section \ref{subsec:lorem}

\end{document}
```

%%
\documentclass{report}
\begin{document}

\section{Ma section}
\subsection{Ma sous-section}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida nec massa id consectetur. Nullam condimentum urna nulla, sit amet sodales leo rhoncus nec. Aenean vehicula ante dictum, sagittis augue dapibus, varius elit. Suspendisse porta orci tortor, ac sagittis quam fermentum non.

\section{Mon autre section}
Voir la section 1.1, page 1 \\
Sous-section 1.1.1

\end{document}
%%

<ins>Liste des différents types</ins> :

| Type    | Description          |
|---      |---                   |
| ch:     | chapitre             |
| sec:    | section              |
| subsec: | sous-section         |
| fig:    | figure               |
| tab:    | table                |
| eq:     | equation             |
| lst:    | code listing         |
| itm:    | enumerated list item |
| alg:    | algorithm            |
| app:    | appendix subsection  |

---

## Créer des maccros, environnements et commandes

* Créer une maccro

  ``` latex
  \newcommand*{\helvetica}{\fontfamily{phv}\selectfont}
  ```

  ``` txt
  {\helvetica
  Lorem ipsum dolor sit
  }
  ```

* Créer un environnement

  ``` latex
  \newenvironment{helvetica}{\fontfamily{phv}\selectfont}{\par}
  ```

  ``` txt
  \begin{helvetica}
  Lorem ipsum dolor sit
  \end{helvetica}
  ```

  ``` latex
  \newenvironment{well}
  { \begin{samepage} \begin{mdframed}[backgroundcolor=lightgray!10,linecolor=lightgray] }
  { \end{mdframed} \end{samepage} }
  ```

* Créer une commande

  ``` latex
  \newcommand{\helvetica}[1]{{\fontfamily{phv}\selectfont#1\par}}
  ```

  ``` txt
  \helvetica{Lorem ipsum dolor sit}
  ```

  ``` latex
  \newcommand\tab[1][1cm]{\hspace*{#1}}
  ```

  ``` txt
  \tab
  ```

  ``` latex
  \usepackage[export]{adjustbox}
  \newcommand{\img}[1]{\includegraphics[scale=0.48,cfbox=lightgray 1pt 1pt]{img/#1}}
  ```

  ``` txt
  \img{monimage.png}
  ```

  ``` latex
  \usepackage{xifthen}
  \newcommand{\imglist}[2][]{%
    \begin{figure}[!htbp]
      \centering
      \forcsvlist{\img}{#2}%
      \ifthenelse{\equal{#1}{}}{}{ \caption{#1} }%
    \end{figure}%
  }
  ```

  ``` txt
  \imglist[Legende]{img1.png, img2.ong}
  ```

---

## Templates

### Report

``` latex
\documentclass[11pt]{report}            % Report class in 11 points
\raggedright                            % Do not right-justify
\parindent0pt  \parskip8pt              % make block paragraphs

\begin{document}                        % End of preamble, start of document text.

\title{\bf An Example of Report Class}  % Supply information
\author{Yours Truly}                    %   for the title page.
\date{\today}                           %   Use current date.
\maketitle                              % Print title page.

\pagenumbering{roman}                   % Roman page number for toc
\setcounter{page}{2}                    % Make it start with "ii"
\tableofcontents                        % Print table of contents

\chapter{A Main Heading}                % Make a "chapter" heading
\pagenumbering{arabic}                  % Start text with arabic 1

Most of this example applies to the article and book classes
as well as to the report class. In article class, however,
the default position for the title information is at the top
of the first text page rather than on a separate page. Also, article
class does not have a \"chapter\" command.
A blank line starts a new paragraph.  \textit{Note this: it will be
printed in italic type.}

\section{A Subheading}                  % Make a "section" heading
The following sectioning commands are available:

\begin{quote}                           % Start "set off", indented text
part \\                                 % "\\" forces a new line
chapter \\                              % not available in article class
section \\
subsection \\
subsubsection \\
paragraph \\
subparagraph
\end{quote}                             % End of indented text
The *-form (e.g., \"section\*") suppresses the section number and
does not make a TOC entry.

\end{document}                          % The required last line
```

### Letter

``` latex
\documentclass[12pt]{letter}               % letter class, 12 points

\address{555 Main St.\\Sometown, NY 12345} % Return address
\signature{My Name\\My Title}              % Name for signature

\begin{document}                           % End of preamble
\begin{letter}{Mr.~Smith\\ President,      % Begin letter by giving
Big Name Co.\\Bigburg, MI 45678}           %   recipient’s address

\opening{Dear Mr.~Smith:}                  % Name for salutation
This is the letter class.  It provides a format for standard parts
of a business letter.  As you can see, it uses many commands that
do not exist in the article, report, and book classes.
This is a new paragraph.

\closing{Sincerely,}                       % Format for the closing.
% The name is taken from \signature command above.
\cc{My Boss}                               % Name(s) of those receiving copies
\end{letter}                               % End of letter
\end{document}                             % The required last line
```


{% endraw %}