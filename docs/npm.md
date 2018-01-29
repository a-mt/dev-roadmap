---
title: NPM
category: Web, Node
---

NPM (Node Package Manager) est un système de gestion de dépendances, il permet d'installer des packages Node.js.

Les packages (ou modules) sont de simples dossiers remplis de code réutilisable qui permet d'ajouter des fonctionnalités supplémentaires à une application très rapidement.
L'idée est de décomposer la complexité d'une application en plusieurs sous-modules qui, une fois assemblés créent un projet plus important.

NPM permet de publier, installer ou mettre à jour ces packages en utlisant les commandes du terminal. En utilisant NPM, un développeur peut partager ses modules avec d'autres développeurs. La liste des packages est disponible sur [https://www.npmjs.com/](https://www.npmjs.com/).

---

## Installation

NPM est distributé avec Node.js.  
Pour vérifier si node est installé :

    node --version

Si node.js n'est pas installé, télécharger l'executable sur [https://nodejs.org](https://nodejs.org) et procéder à l'installation.

Pour mettre à jour npm :

    npm install -g npm

---

## Installer un package

Pour installer un package à l'intérieur d'un projet node, se placer à l'intérieur du projet et lancer `npm install`

    cf myproject
    npm install grunt-sass

NPM va créer un dossier node_modules et installer les packages demandés. Ci ces packages ont eux-mêmes des dépendances (ils nécessitent d'autres packages pour fonctionner), NPM va se charger de les télécharger - récursivement.  
Chaque package ayant ses propres dépendances (différentes versions de dfférents packages), le dossier node_modules peut devenir très large très rapidement.

Un package peut également être installés non pas dans node_modules mais au niveau système, ce qui permet de l'utiliser indépendemment du projet en cours. Utiliser le flag `-g`.

    sudo npm install -g grunt-cli

---

## Créer un projet: package.json

Pour garder une trace des dépendances d'un projet, node.js utilise un fichier appelé `package.json` situé à la racine du projet.  
package.json définit au minimum le nom du projet et sa version ([version sémantique](semver.md)) :

    {
        "name": "myproject",
        "version": "0.0.1"
    }

Pour afficher la documentation à propos des champs dans le fichier package.json:

    npm help json

Parce qu'un projet doit pouvoir être soumis sur NPM, le nom du projet doit être slugifié :
- contient uniquement des caractères minuscule
- pas d'espace (- ou _ pour séparateur)
- ne commance pas par . ou _
- doit pouvoir faire partie d'une URL (pas de caractères spéciaux)

Le fichier `package.json` peut être crée manuellement ou interractivement avec la ligne de commande:

    npm init

---

## Liste de dépendances

Le fichier package.json contiendra la liste des dépendances du projet, c'est à dire la liste des packages dont le projet à besoin pour fonctionner de manière optimale ainsi que leur version.

    "dependencies": {
        "grunt-sass": "^1.0.0"
    }

| Version | Description                                               |
|---      |---                                                        |
| *       | La dernière version du package (version de développement) |
| ^1.0.0  | La dernière version stable du package                     |
| 1.0.0   | Cette version exactement                                  |

Un projet peut également avoir des dépendances de développement, c'est à dire des packages qui ne sont utilisés que pendant la phase de développement. Par exemple, grunt-sass pour compiler un fichier sass en css

    "devDependencies": {
        "grunt-sass": "^1.0.0"
    }

Le fichier `package.json` contenant la list de dépendances du projet, le dossier node_modules peut être supprimé à n'importe quel instant. 
Ainsi les dépendances du projet ne vont pas être versionnées, uniquement le fichier package.json.  
Pour réinstaller les dépendances :

    npm install

---

## Maintenir la liste de dépendances

NPM dispose de différentes commandes en ligne de commande pour faciliter le maintien de la liste de dépendances d'un projet.

### Install

<table>
  <tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
  <tr>
    <th align="left">npm install grunt-sass</th>
    <td>Installe grunt-sass</td>
  </tr>
  <tr>
    <th align="left">npm install --save grunt-sass</th>
    <td>Installe grunt-sass et sauvegarde la dépendance dans package.json</td>
  </tr>
  <tr>
    <th align="left">npm install --save-dev grunt-sass</th>
    <td>Ou pour sauvegarder comme dépendance de dev</td>
  </tr>
</table>

Alias: `npm i`

### List

<table>
  <tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
  <tr>
    <th align="left">npm list</th>
    <td>Affiche la liste des packages du projet en cours</td>
  </tr>
  <tr>
    <th align="left">npm -g list</th>
    <td>Afficher la liste des packages installés globallement</td>
  </tr>
</table>

Alias: `npm ls`

### Update

<table>
  <tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
  <tr>
    <th align="left">npm outdated</th>
    <td>Affiche les packages qui devraient être mis à jour</td>
  </tr>
  <tr>
    <th align="left">npm update</th>
    <td>Met à jour les packages</td>
  </tr>
</table>

### Remove

<table>
  <tr><td>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</td><td></td></tr>
  <tr>
    <th align="left">npm uninstall mypackage</th>
    <td>Supprime mypackage de node_modules</td>
  </tr>
  <tr>
    <th align="left">npm uninstall --save mypackage</th>
    <td>Supprime mypackage de node_modules et de package.json</td>
  </tr>
  <tr>
    <th align="left">npm prune</th>
    <td>Supprime les packages dans node_modules qui ne sont pas dans package.json</td>
  </tr>
</table>

Alias: `npm rm`

---

## Lancer des tâches

NPM peut lancer des scripts bash situés dans package.json.

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"  
    }

Pour lancer le script:

    npm test

Seule les noms de scripts whitelistés par NPM sont disponibles, voir [whitelist complète](https://docs.npmjs.com/misc/scripts)
