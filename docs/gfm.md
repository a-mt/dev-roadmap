Markdown est un langage de balisage (*markup langage* en anglais).
Un peu à la manière du HTML, il permet de formatter le texte via un système d'annotations.
Le Markdown se veut facile à lire, y compris dans sa version texte, et il est donc plus instinctif à apprendre.
Il est souvent supporté par les systèmes de commentaires, chats et forums.

<ins>Exemple de syntaxe Markdown</ins> :

    # Titre

    Du *texte en italique*, **en gras**.

    * Une liste
    * d'items

    ``` js
    function hello() {
      alert("Hello");
    }
    ```

En général, un fichier Markdown a l'extension `.md` ou `.markdown`.

Il existe différents parser Markdown, chacun apportant quelques nuances et fonctionnalités différentes.
Par exemple, certains parser acceptent les tags HTML, implémentent les tables, les attributs de bloc (classe, id, etc).

La syntaxe décrite ci-dessous est la syntaxe supportée par Github, dite *Github Flavored Markdown* (GFM).
Le parser utilisé par Github est [CommonMark](https://github.com/gjtorikian/commonmarker).
[Voir les specs](https://github.github.com/gfm/).

---

## Titre

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr><td># h1 Heading</td><td><h1>h1 Heading</h1></td></tr>
    <tr><td>## h2 Heading</td><td><h2>h2 Heading</h2></td></tr>
    <tr><td>### h3 Heading</td><td><h3>h3 Heading</h3></td></tr>
    <tr><td>#### h4 Heading</td><td><h4>h4 Heading</h4></td></tr>
    <tr><td>##### h5 Heading</td><td><h5>h5 Heading</h5></td></tr>
    <tr><td>###### h6 Heading</td><td><h6>h6 Heading</h6></td></tr>
    <tr><td>This is an H1<br>=============</td><td><h1>This is an H1</h1></td></tr>
    <tr><td>This is an H2<br>-------------</td><td><h2>This is an H2</h2></td></tr>
  </tbody>
</table>

---

## Texte

La syntaxe Markdown de formattage de texte n'est pas interprétée à l'intérieur d'un `pre`.  
Pour formatter du texte à l'intérieur d'un `pre`, utiliser des balises HTML.

### En dehors d'un `pre`

<table style="table-layout:fixed">
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr><td>**This is bold text**</td><td><strong>This is bold text</strong></td></tr>
    <tr><td>__This is bold text__</td><td><strong>This is bold text</strong></td></tr>
    <tr><td>*This is italic text*</td><td><em>This is italic text</em></td></tr>
    <tr><td>_This is italic text_</td><td><em>This is italic text</em></td></tr>
    <tr><td>~~Strikethrough~~</td><td><del>Strikethrough</del></td></tr>
    <tr><td>\*Literal asterisks\*</td><td>*Literal asterisks*</td></tr>
  </tbody>
</table>

### Dedans ou en dehors d'un `pre`

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr><td>&lt;strong>This is bold text&lt;/del></td><td><strong>This is bold text<strong></td></tr>
    <tr><td>&lt;em>This is italic text&lt;/em></td><td><em>This is italic text<em></td></tr>
    <tr><td>&lt;del>Strikethrough&lt;/del></td><td><del>Strikethrough<del></td></tr>
    <tr><td>&lt;s>Strikethrough&lt;/s></td><td><s>Strikethrough</s></td></tr>
    <tr><td>&lt;ins>Underline&lt;/ins></td><td><ins>Underline</ins></td></tr>
    <tr><td>Indice &lt;sub>sub&lt;/sub></td><td>Indice <sub>sub</sub></td></tr>
    <tr><td>Exposant &lt;sup>sup&lt;/sup></td><td>Exposant <sup>sup</sup></td></tr>
    <tr><td>&amp;copy;</td><td>&copy;</td></tr>
    <tr><td>&amp;#10148;</td><td>&#10148;</td></tr>
  </tbody>
</table>

---

## Retours à la ligne

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td><p>Les retours à la ligne en fin de ligne<br>sont ignorés</p></td>
      <td><p>Les retours à la ligne en fin de ligne sont ignorés</p></td>
    </tr>
    <tr>
      <td><p>Ajouter deux espaces à la fin&nbsp;&nbsp;<br>Pour préserver le retour à la ligne</p></td>
      <td><p>Ajouter deux espaces à la fin<br>Pour préserver le retour à la ligne</p></td>
    </tr>
    <tr>
      <td><p>Ou séparer les lignes<br><br>D'une ligne vide</p></td>
      <td><p>Ou séparer les lignes</p><p>D'une ligne vide</p></td>
    </tr>
  </tbody>
</table>

---

## Code

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <!-- En ligne -->
    <tr>
      <td>Inline &lt;code>code&lt;/code></td>
      <td>Inline <code>code</code></td>
    </tr>
    <tr>
      <td>Inline `code`</td>
      <td>Inline <code>code</code></td>
    </tr>
    <!-- En bloc -->
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;Non interpreted &lt;i&gt;block code (4 spaces)&lt;/i&gt;<br></td>
      <td><pre><code>Non interpreted &lt;i&gt;block code&lt;/i&gt;</code></pre></td>
    </tr>
    <tr>
      <td>&lt;pre&gt;<br>Interpreted &lt;i&gt;block code&lt;/i&gt;<br>&lt;/pre&gt;</td>
      <td><pre>Interpreted <i>block code</i></pre></td>
    </tr>
    <tr>
      <td>```<br>Non interpreted &lt;i&gt;block code&lt;/i&gt;<br>```</td>
      <td><pre><code>Non interpreted &lt;i&gt;block code&lt;/i&gt;</code></pre></td>
    </tr>
    <!-- Avec coloration syntaxtique -->
    <tr>
      <td>
        &lt;pre lang="diff"&gt;<br>
        diff --git a/filea.extension b/fileb.extension<br>
        index d28nd309d..b3nu834uj 111111<br>
        --- a/filea.extension<br>
        +++ b/fileb.extension<br>
        @@ -1,6 +1,6 @@<br>
        -oldLine<br>
        +newLine<br>
        &lt;/pre&gt;<br>
      </td>
      <td><pre lang="diff">diff --git a/filea.extension b/fileb.extension
index d28nd309d..b3nu834uj 111111
--- a/filea.extension
+++ b/fileb.extension
@@ -1,6 +1,6 @@
-oldLine
+newLine</pre>
      </td>
    </tr>
    <tr>
      <td>``` js<br>
      var foo = function (bar) {<br>
  return bar++;<br>
};<br>
```<br>
      </td>
      <td><pre lang="js">var foo = function (bar) {
  return bar++;
};</pre>
      </td>
    </tr>
    <tr>
      <td>&lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;S&lt;/kbd&gt;</td>
      <td><kbd>Ctrl</kbd> + <kbd>S</kbd></td>
    </tr>
  </tbody>
</table>

---

## Blockquote

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>> Blockquote<br>
        Still blockquote&nbsp;&nbsp;<br>
        Again<br>
        >> sub-blockquote<br>
        > > > sub-sub blockquote.
      </td>
      <td>
        <blockquote>
          <p>Blockquote Still blockquote<br>Again</p>
          <blockquote>
            <p>sub-blockquote</p>
            <blockquote>
              <p>sub-sub blockquote</p>
            </blockquote>
          </blockquote>
        </blockquote>
      </td>
    </tr>
  </tbody>
</table>

---

## Image

Syntaxe interprétée à l'intérieur d'un `pre`

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|--- |--- |
| !\[Alt](h&#8203;ttp://placehold.it/50x50)         | ![Alt](http://placehold.it/50x50)         |
| !\[Alt](h&#8203;ttp://placehold.it/50x50 "title") | ![Alt](http://placehold.it/50x50 "title") |
| !\[Alt]\[id_img]<br>\[id_img]: h&#8203;ttp://placehold.it/50x50 | ![Alt][id_img]              |

[id_img]: http://placehold.it/50x50

---

## Lien

Syntaxe interprétée à l'intérieur d'un `pre`

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|--- |--- |
| h&#8203;ttp://google.com                  | http://google.com                 |
| \[Text](h&#8203;ttp://google.com)         | [Text](http://google.com)         |
| \[Text](h&#8203;ttp://google.com "title") | [Text](http://google.com "title") |
| \[Text]\[id_link]<br>\[id_link]: h&#8203;ttp://google.com "optional title" | [Text][id_link] |
| h&amp;#8203;ttp://google.com              | h&#8203;ttp://google.com          |

[id_link]: http://google.com "optional title"

---

## Liste

### À puce

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
* Item 1<br>
  With content<br>
* Item 2 (2 spaces)&nbsp;&nbsp;<br>
  With content<br>
+ Item 1<br>
+ Item 2<br>
- Item 1<br>
- Item 2<br><br>
      </td>
      <td>
        <ul>
        <li>Item 1
        With content</li>
        <li>Item 2 (2 spaces)<br>
        With content</li>
        </ul>
        <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        </ul>
        <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Énumérée

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
        1. Item 1<br>
        2. Item 2<br>
        3. Item 3<br>
        &nbsp;&nbsp;&nbsp;* Item 3a<br>
        &nbsp;&nbsp;&nbsp;* Item 3b<br>
        1. Item 4<br>
        &nbsp;&nbsp;&nbsp;The number doesn't really matter<br>
        1. Item 5<br>
        2. Item 6<br>
        2. Item 7<br>
      </td>
      <td>
        <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3
        <ul>
        <li>Item 3a</li>
        <li>Item 3b</li>
        </ul>
        </li>
        <li>Item 4
        The number doesn't really matter</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>

### De todos

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
        - [x] This is a complete item<br>
        - [ ] This is an incomplete item<br>
        <br>
      </td>
      <td>

- [x] This is a complete item
- [ ] This is an incomplete item

</td></tr></tbody></table>

### Séparer deux listes

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
        1. Item 1<br>
        <br>
        1. Item 2<br>
        <br>
        &lt;!-- --&gt;<br>
        <br>
        1. Une autre liste !<br>
        <br>
      </td>
      <td>
        <ol>
        <li>
        <p>Item 1</p>
        </li>
        <li>
        <p>Item 2</p>
        </li>
        </ol>
        <!-- -->
        <ol>
        <li>Une autre liste !</li>
        </ol>
        <br><br><br>
      </td>
    </tr>
  </tbody>
</table>

### Texte autour

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>
        du texte avant<br>
        1. Item 1<br>
        du texte après<br>
      </td>
      <td>
        <p>du texte avant</p>
        <ol>
        <li>Item 1
        du texte après</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>
        du texte avant<br>
        * Item 1<br>
        du texte après<br>
      </td>
      <td>
        <p>du texte avant</p>
        <ul>
        <li>Item 1
        du texte après</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

---

## Délimiteur (horizontal rule)

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td>___</td>
      <td><hr></td>
    </tr>
    <tr>
      <td>---</td>
      <td><hr></td>
    </tr>
    <tr>
      <td>***</td>
      <td><hr></td>
    </tr>
  </tbody>
</table>

---

## Table

<table>
  <thead><tr>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
    <th>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
  </tr></thead>
  <tbody>
    <tr>
      <td><pre>
| Default | Align left | Align center | Align right |
| ---     | :---       |     :---:    |        ---: |
| A       | B          | C            | E           |
| F \| G  | H          | I            | J           |
</pre></td>
      <td>
        <table>
        <thead>
        <tr>
        <th>Default is left</th>
        <th align="left">Left-aligned</th>
        <th align="center">Center-aligned</th>
        <th align="right">Right-aligned</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>A</td>
        <td align="left">B</td>
        <td align="center">C</td>
        <td align="right">E</td>
        </tr>
        <tr>
        <td>F | G</td>
        <td align="left">H</td>
        <td align="center">I</td>
        <td align="right">J</td>
        </tr></tbody></table>
      </td>
    </tr>
  </tbody>
</table>

---

## Emojis

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Avant&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; | &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Après&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
|--- |--- |
| :&#8203;sparkles: :&#8203;camel: :&#8203;boom: | :sparkles: :camel: :boom: |

Liste complète des emojis : http://www.emoji-cheat-sheet.com/
