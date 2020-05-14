---
title: PHPUnit
category: Web, PHP
---

PHPUnit est une librairie permettant d'effectuer des tests unitaires
— c'est à dire des tests qui vérifient que le résultat d'une fonction est bien celui attendu pour des paramètres donnés.

* Installer PHPUnit

  ```
  wget -O phpunit https://phar.phpunit.de/phpunit-9.phar
  chmod +x phpunit
  ./phpunit --version
  ```

* Créer le répertoire où seront placés les tests unitaires

  ```
  mkdir tests
  ```

* Créer un fichier `YOURNAMETest.php` dans ce répertoire.  
  Ajouter une classe `YOURNAMETest` qui hérite de `PHPUnit\Framework\TestCase` à l'intérieur.

  ``` php
  <?php
  use PHPUnit\Framework\TestCase;

  final class MainTest extends TestCase
  {
      public function testOK() {
          $this->assertTrue(true);
      }
  }
  ```

* Executer PHPUnit

  ```
  ./phpunit tests/MainTest.php
  ```

  PHPUnit va executer toutes les fonctions `test...` de l'objet et afficher un récaputilatif du nombre de tests effectués.

  ```
  Time: 68 ms, Memory: 10.00 MB

  OK (1 test, 1 assertion)
  ```
  
  En cas d'erreur, PHPUnit s'arrête et affiche le test en erreur:

  ``` php
  <?php
  public function testOK() {
      $this->assertTrue(false);
  }
  ```

  ```
  Time: 71 ms, Memory: 10.00 MB

  There was 1 failure:

  1) MainTest::testOK
  Failed asserting that false is true.
  ```

* Il existe un grand nombre de [fonctions d'assertions disponibles](https://phpunit.readthedocs.io/en/7.1/assertions.html).  
  Les plus couramment utilisées sont:

  ``` php
  <?php
  $this->assertSame('1', $res);
  $this->assertTrue($res ? $res : $mail->getErrorInfo());
  $this->assertGreaterThan(15, $daysLeft);
  ```
