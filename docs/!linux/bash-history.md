---
title: Historique
category: Linux, Shell, Bash
---

## Utiliser l'historique

* Lorsqu'une commande est exécutée dans le terminal, elle est stockée dans l'historique.  
  Appuyer sur la touche "Flèche vers le haut" pour afficher la commande précédente.

  Une autre possibilité est d'utiliser Ctrl + r pour chercher une commande dans l'historique (à partir de la fin).

* Pour afficher l'historique complet, utiliser la commande `history`

  ```
  $ history
    1  ls /var/log
    2  whoami
    3  pwd
    4  ls
    5  uname -r
    6  uname -v
    7  bash --version
    8  exit
    9  pwd
   10  ls
   11  exit
   12  clear
   13  history
  ```

  Ou pour afficher les 10 dernières:

  ```
  $ history 10
  ```

* Pour ré-exécuter la commande n°9 dans l'historique, on peut utiliser l'expansion d'historique de bash:  
  taper `!9` et presser entrée. La commande est affichée puis exécutée.

  ```
  $ !9
  pwd
  /home/christine
  ```

  Pour ré-exécuter la dernière commande, il y a un raccourci: `!!`.

* Pour executer une commande sans l'ajouter à l'historique,  
  ajouter au moins un espace en début de ligne : <code>  cmd</code>

---

## Expansion

### Des commandes

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">!!</th>
  <td>La dernière commande de l'historique<br><code>!!</code> est couramment appelé "bang bang"
  <pre lang="shell">sudo !! # re-execute la derniere commande en mode admin</pre></td>
</tr>
<tr>
  <th align="left">!11</th>
  <td>La commande n°11 de l'historique</td>
</tr>
<tr>
  <th align="left">!-2</th>
  <td>L'avant-dernière commande de l'historique</td>
</tr>
<tr>
  <th align="left">!ssh</th>
  <td>La dernière commande qui commence par "ssh"</td>
</tr>
<tr>
  <th align="left">!?apt-get</th>
  <td>La dernière commande qui contient "apt-get"</td>
</tr>
<tr>
  <th align="left">!#</th>
  <td>La commande en cours<br>
  <code>echo a !#</code> execute <code>echo aecho a</code> (affiche "aecho a")</td>
</tr>
</table>

On peut ajouter des "filtres" à ces expansions:

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">!!:p</th>
  <td>Afficher la dernière commande executée</td>
</tr>
<tr>
  <th align="left">!11-</th>
  <td>Executer la commande n°11 en supprimant le dernier argument
  <pre lang="shell">11                  npm install -S package
!11- newpackage     npm install -S newpackage</pre></td>
</tr>
<tr>
  <th align="left">!11:s/abc/def</th>
  <td>Executer la commande n°11 et remplacer la PREMIERE occurence de "abc" en "def"<br>Il est possible de cumuler les substitutions
  <pre lang="shell">!11:s/abc/def:s/ghi/jkl</pre></td>
</tr>
<tr>
  <th align="left">!11:gs/abc/def</th>
  <td>Executer la commande n°11 et remplacer TOUTES les occurences de "abc" en "def"</td>
</tr>
</table>

Raccourcis pour la dernière commande:

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">^acb^def</th>
  <td>Executer la dernière commande et remplacer la première occurence de "abc" en "def"<br>Particulièrement utile pour les fautes de frappe
  <pre lang="shell">^atp^apt</pre></td>
</tr>
</table>

### Des paramètres

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">!*</th>
  <td>Tous les arguments de la dernière commande</td>
</tr>
<tr>
  <th align="left">!611:*</th>
  <td>Tous les arguments de commande n°611</td>
</tr>
<tr>
  <th align="left">!-2:*</th>
  <td>Tous les arguments de l'avant-dernière commande</td>
</tr>
</table>

On peut cibler différentes commandes de l'historique de la même manière qu'avec `*` pour les expansions de paramètre qui suivent :

<table>
<tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
<tr>
  <th align="left">!$</th>
  <td>Le dernier argument
  <pre lang="shell">ls /media/F468-BB77/Music
find . -ctime 0 -exec cp -v {} !$ \;
# recopier les fichiers crées aujourd'hui dans "/media/..."</pre></td>
</tr>
<tr>
  <th align="left">!$:h</th>
  <td>Le dernier argument, en supprimant le nom de fichier du path
  <pre lang="shell">du -sh /home/tom/work/doc.txt
cd !$:h # cd /home/tom/work</pre></td>
</tr>
<tr>
  <th align="left">!$:t</th>
  <td>Le dernier argument, en supprimant le nom de dossier du path
  <pre lang="shell">ls /home/tom/work/doc.txt
echo document=!$:t # document=doc.txt</pre></td>
</tr>
<tr>
  <th align="left">!$:r</th>
  <td>Le dernier argument, en supprimant l'extension du fichier
  <pre lang="shell">vi /home/tom/work/doc.txt
echo stripext=!$:r # stripext=/home/tom/work/doc</pre></td>
</tr>
<tr>
  <th align="left">!$:e</th>
  <td>Le dernier argument, uniquement l'extension du fichier
  <pre lang="shell">vi /home/tom/work/doc.txt
echo extonly=!$:e # extonly=.txt</pre></td>
</tr>
<tr>
  <th align="left">!^</th>
  <td>Le premier argument</td>
</tr>
<tr>
  <th align="left">!!:2</th>
  <td>Le 2ème argument</td>
</tr>
<tr>
  <th align="left">!!:3-5</th>
  <td>Les arguments 3 à 5 (= 3,4,5)</td>
</tr>
<tr>
  <th align="left">!!:3*</th>
  <td>De l'argument 3 au dernier argument (= de 3 à n)</td>
</tr>
<tr>
  <th align="left">!!:3-</th>
  <td>De l'argument 3 à l'avant-dernier argument (= de 3 à n-1)</td>
</tr>
</table>

---

## .bash_history

* L'historique existe uniquement en mémoire et c'est au moment de se déconnecter, qu'il est sauvegardé  
  dans le fichier `~/.bash_history`

* Il est possible de forcer l'écriture de l'historique en mémoire dans le fichier:

  ```
  $ history -w
  ```

## Supprimer l'historique

* On peut supprimer l'historique en mémoire:

  ```
  $ history -c

  $ history
     1  history
  ```

  Notons que le fichier lui n'est pas vidé:

  ```
  $ cat .bash_history
  ls /var/log
  whoami
  pwd
  ls
  uname -r
  uname -v
  bash --version
  exit
  pwd
  ls
  exit
  clear
  history
  pwd
  clear
  cat .bash_history
  history
  history -w
  ```

* Pour supprimer la commande n°11 de l'historique:

  ```
  $ history -d 11
  ```

   Pour supprimer les commandes 10 à 20:

  ```
  $ for i in {10..20}; do history -d 10; done
  ```

## Variables d'environnement

* HISTFILE: emplacement du fichier history

  ```
  $ echo $HISTFILE
  /home/am/.bash_history
  ```

* HISTFILESIZE: nombre maximum de lignes dans le fichier history

  ```
  $ echo $HISTFILESIZE
  2000
  ```

* HISTSIZE: nombre maximum de lignes dans la session en en cours

  ```
  $ echo $HISTSIZE
  1000
  ```