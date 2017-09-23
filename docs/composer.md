---
title: Composer
category: web, PHP
---

Composer est un système de gestion de dépendances PHP, qui permet de télécharger des libraires et API de manière automatique.
N'importe quel développeur peut créer ses propres packages ou réutiliser les packages d'autres développeur en allant le rechercher sur le site https://packagist.org.

## Installer

- Windows : Suivre les instructions sur [getcomposer.org](https://getcomposer.org/doc/00-intro.md#installation-windows)
- Linux :

    ``` shell
    curl -sS https://getcomposer.org/installer | php
    sudo mv composer.phar /usr/local/bin/composer
    ```

## Mettre à jour

    composer self-update

## Installer des packages

1. Créer un fichier `composer.json` à la racine du projet

        composer init

2. Déclarer les packages à installer dans `composer.json`

    - Soit en éditant manuellement le fichier

      ``` json
      {
          "name": "MyPackage/Exemple",
          [...]
          "require": {
              "gregwar/image": "*"
          }
      }
      ```

    - Soit en utilisant la ligne de commande
    
          composer require gregwar/image

3. Installer les dépendances listées dans `composer.json`

        composer install

    `composer install` installe les dépendances telles que spécifiées dans `composer.lock`. Si le fichier `composer.lock` n'existe pas, il est crée.

4. Mettre à jour les dépendances

        composer update

    `composer update` va chercher sur Packagist si des versions plus récentes des packages installés sont disponibles et met à jour les packages.
    Mettre à jour les dépendances peut poser des problèmes de compatibilités et il ne faut donc jamais utiliser cette commande en production.

---

## Recap : commandes et fichiers

| Fichier       | Utilité | Contient | Utiliser en |
|---            |---      |---       |---            |
| composer.json | contrat | Liste des packages à installer (utilisation possible de jokers) | dev |
| composer.lock | build   | Liste des packages et dépendances effectivement installés (version précise) | prod |

    composer install              Installer via .lock si existant
    composer update               Mettre à jour .lock + mettre à jour les dépendances
    composer update nothing       Mettre à jour .lock
    composer require mypackage    Ajoute mypackage au .json

---

## Créer un package

1. Créer la structure du répertoire

        monprojet/
          src/
            MyPackage/
              Exemple.php

2. Créer la librairie

    ``` php
    <?php
    namespace MyPackage;

    class Exemple {
        public function hello() {
            return "Hello World";
        }
    }
    ```

3. Créer le fichier `composer.json` à la racine de `monprojet/`

    ``` json
    {
        "name": "MyPackage/Exemple",
        "description": "Description du package",
        "authors": [{
            "name": "Bob",
            "email": "bob@exemple.com"
        }],
        "minimum-stability": "dev",
        "require": {
            "php": ">=5.3.0"
        },
        "autoload": {
            "psr-0": {
                "": "src/"
            }
        }
    }
    ```

    Le package n'est pas référencé sur Packagist, on ne le met donc pas dans `require` mais dans `autoload`.

4. Ajouter des tests

        monprojet/
          src/
            MyPackage/
              Exemple.php
          tests/
            ExempleTest.php

    ``` php
    <?php
    use MyPackage\Exemple;

    class ExempleTest extends PHPUnit_Framework_TestCase
    {
        public function testSimple() {
            $exemple = new Exemple();
            $this->assertEquals("Hello World", $exemple->hello());
        }
    }
    ```

5. Faire tourner les tests

        composer update

    <!-- -->

        phpunit tests --bootstrap vendor/autoload.php

## Mettre un package sur Packagist

1. Commiter le package sur Github (et uniquement le package)  
   Ex : https://github.com/Intervention/image

2. Aller sur https://packagist.org
    * Créer un compte si nécessaire et se connecter
    * Cliquer sur "Submit package"
    * Fournir l'URL du repo Github


