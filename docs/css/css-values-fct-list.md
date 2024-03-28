---
title: Fonctions listes
category: Web, CSS, Valeurs
---

<style>
  .example {
    border: 1px solid;
    padding: 1.6em;
    padding-left: 0;
  }
  .example ul {
    margin-bottom: 0 !important;
  }
</style>

## counter

* <ins>Exemple</ins>:

  ``` css
  li::before {
    content: "ITEM " counter(my-sec-counter, upper-roman) ". ";
  }
  ```

* Permet de récupérer la valeur d'un counter (incrémenté avec les propriétés `counter-increment`, `counter-reset`).

  ``` plain
  counter(<name>) | counter(<name>, <style>)
  ```

  <ins>Quelques exemples</ins>:

  <table>
    <tbody>
      <tr valign="top">
        <td>
  <pre lang="css">li {
    counter-increment: my-counter1;
  }
  li::before {
    content: "ITEM " counter(my-counter1, upper-roman) ". ";
  }</pre>
        </td>
        <td>
          <div class="example">
            <style>
              .example-counter li {
                counter-increment: my-counter;
              }
              .example-counter li::before {
                content: "ITEM " counter(my-counter, upper-roman) ". ";
              }
            </style>
            <div class="example-counter">
              <ul>
                <li>
                  Hello
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
                <li>
                  World
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
      <tr valign="top">
        <td>
  <pre lang="css">li {
    counter-increment: my-counter2;
  }
  li::before {
    content: "ITEM " counter(my-counter2, upper-roman) ". ";
  }
  li ul {
    counter-reset: my-counter;
  }</pre>
        </td>
        <td>
          <div class="example">
            <style>
              .example-counter2 li {
                counter-increment: my-counter2;
              }
              .example-counter2 li::before {
                content: "ITEM " counter(my-counter2, upper-roman) ". ";
              }
              .example-counter2 li ul {
                counter-reset: my-counter2;
              }
            </style>
            <div class="example-counter2">
              <ul>
                <li>
                  Hello
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
                <li>
                  World
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  [JSFiddle counter](https://jsfiddle.net/amt01/h4p6rjaw/)

## counters

* <ins>Exemple</ins>:

  ``` css
  .nested div::before {
    content: "DIV " counters(moncounter, ".");
  }
  ```

* Retourne la valeur du compteur, en ajoutant un sous-compteur à chaque fois qu'on reset.  
  Les compteurs sont séparés par le délimiteur donné en 2ème argument

  ``` plain
  counters(<name>, <delimiter>) | counters(<name>, <delimiter>, <style>)
  ```

  <ins>Quelques exemples</ins>:

  <table>
    <tbody>
      <tr valign="top">
        <td>
  <pre lang="css">li {
    counter-increment: my-counter3;
  }
  li::before {
    content: "ITEM " counters(my-counter3, ".", upper-roman) ". ";
  }
  li ul {
    counter-reset: my-counter3;
  }</pre>
        </td>
        <td>
          <div class="example">
            <style>
              .example-counter3 li {
                counter-increment: my-counter3;
              }
              .example-counter3 li::before {
                content: "ITEM " counters(my-counter3, ".", upper-roman) ". ";
              }
              .example-counter3 li ul {
                counter-reset: my-counter3;
              }
            </style>
            <div class="example-counter3">
              <ul>
                <li>
                  Hello
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
                <li>
                  World
                  <ul>
                    <li>Sub-item</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

## symbols

* <ins>Exemple</ins>:

  ``` css
  li {
    list-style: symbols(cyclic "◉" "◌");
  }
  ```

* Permet de créer un nouveau style de puce à la volée [CSS3]  
  NB Contraitement à [@counter-style](css-atrules.md#counter-style), les listes de type `additive` et `extends` ne sont pas possible avec cette syntaxe.

  ``` plain
  list-type: symbols([cyclic | numeric | alphabetic | symbolic | fixed] [ <string> | <image> ]+);
  ```

  <ins>Quelques exemples</ins>:

  <table>
    <tbody>
      <tr valign="top">
        <td>
  <pre lang="css">li {
    list-style: symbols(cyclic "◉" "◌");
  }</pre>
        </td>
        <td>
          <div class="example">
            <style>
              .example-symbol li {
                list-style: symbols(cyclic "◉" "◌");
              }
            </style>
            <div class="example-symbol">
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
