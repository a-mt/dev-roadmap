---
title: SOAP
category: Web, PHP
---

SOAP (Simple Object Access Protocol) est un protocole permettant des appels de procédures à distance (Remote Procedure Call, abbr. RPC). Il s'appuie sur l'usage de HTTP et XML.

Pour implémenter un webservice SOAP avec PHP, on utilise les classes
* `SoapClient` pour le client
* `SoapServer` pour le serveur.

---

## Avec WSDL

Le WSDL (Web Services Description Language, pronconcer "Whiz-Deul") est un fichier qui décrit un service web SOAP, il liste notamment ses méthodes et paramètres.

<ins>wsdl.xml</ins>:

``` xml
<?xml version ='1.0' encoding ='UTF-8' ?> 
<definitions name='Example' 
  targetNamespace='urn:example' 
  xmlns:tns='urn:example' 
  xmlns:soap='http://schemas.xmlsoap.org/wsdl/soap/' 
  xmlns:xsd='http://www.w3.org/2001/XMLSchema' 
  xmlns:soapenc='http://schemas.xmlsoap.org/soap/encoding/'
  xmlns:wsdl='http://schemas.xmlsoap.org/wsdl/' 
  xmlns='http://schemas.xmlsoap.org/wsdl/'> 

<!-- DEFINITION DES PARAMETRES -->
<message name='helloRequest'/>
<message name='helloResponse'> 
  <part name='Result' type='xsd:string'/> 
</message> 

<message name='donneRequest'> 
  <part name='i' type='xsd:integer'/>
</message> 
<message name='donneResponse'> 
  <part name='Result' type='xsd:integer'/> 
</message> 

<!-- LISTE METHODES DISPONIBLES / PARAMETRES IO -->
<portType name='ExamplePortType'> 
  <operation name='hello'> 
    <input message='tns:helloRequest'/> 
    <output message='tns:helloResponse'/> 
  </operation> 

  <operation name='donne'> 
    <input message='tns:donneRequest'/> 
    <output message='tns:donneResponse'/> 
  </operation> 
</portType> 

<!-- DIRECTIONS DU PROTOCOLE SOAP -->
<binding name='ExampleBinding' type='tns:ExamplePortType'> 
  <soap:binding style='rpc' transport='http://schemas.xmlsoap.org/soap/http'/> 

  <operation name='hello'>
    <soap:operation soapAction='urn:hello'/> 
    <input><soap:body use='encoded' namespace='urn:xmethods' encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'/></input> 
    <output><soap:body use='encoded' namespace='urn:xmethods' encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'/></output> 
  </operation>

  <operation name='donne'>
    <soap:operation soapAction='urn:donne'/> 
    <input><soap:body use='encoded' namespace='urn:xmethods' encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'/></input> 
    <output><soap:body use='encoded' namespace='urn:xmethods' encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'/></output> 
  </operation> 
</binding> 

<!-- SERVICE http://127.0.0.1/webservice/SOAP/Server.php -->
<service name='ExampleService'> 
  <port name='ExamplePort' binding='tns:ExampleBinding'> 
    <soap:address location='http://127.0.0.1/webservice/SOAP/Server.php'/> 
  </port> 
</service>
</definitions>
```

<ins>inc.config.php</ins>:

``` php
<?php
// URL du WSDL
define('WEBSERVICE_URI', 'http://127.0.0.1/webservice/Server.php?wsdl');

// Désactive la mise en cache du WSDL
ini_set("soap.wsdl_cache_enabled", "0");
```

<ins>server.php</ins>:

``` php
<?php
require 'inc.config.php';

/**
 * Webservice avec WSDL
 * Attention à bien modifier l'url du webservice dans wsdl.xml pour que ça fonctionne
 */

// Retourner le wsdl
if(isset($_GET['wsdl'])) {
  readfile('wsdl.xml');
  exit();
}

// Fonctions implémentées par le serveur
class Server {
  function donne($i) {
    return $i;
  }
  function hello() {
    return "hello world";
  }
}

// Crée un serveur SOAP
try {
  $server = new SoapServer(WEBSERVICE_URI);
  $server->setClass("Server");
  $server->handle();

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}
```

<ins>client.php</ins>:

``` php
<?php
require 'inc.config.php';

try {

  // Crée un client SOAP
  $client = new SoapClient(WEBSERVICE_URI, array (
      'trace'      => 1,
      'exceptions' => 0
  ));

  // Appelle des méthodes du serveur
  echo $client->__call('hello', array());
  echo $client->__call('donne', array('i'=>5));

} catch(SoapFault $f) {
  echo "Erreur SOAP : " . $f;
}
```

---

## Avec autodiscover

La librairie [`Zend`](https://gist.github.com/a-mt/5a6d06dc9ced06e8aa9c7976a5972797/raw/29cc217cc3c64219ac15674042a3c0380164dabd/Zend.zip) permet d'auto-générer le WSDL.

<ins>server.php</ins>:

``` php
<?php
require 'inc.config.php';

/**
 * Webservice SOAP avec auto-génération du WSDL
 */

// Retourner le wsdl
if(isset($_GET['wsdl'])) {
  require_once 'Zend/Soap/AutoDiscover.php';
  $autodiscover = new \Zend_Soap_AutoDiscover();
  $autodiscover->setClass('Server');
  $autodiscover->handle();
  exit();
}

/**
 * Fonctions implémentées par le serveur
 * Les méthodes doivent être documentées en PHPDoc pour
 * que l'AutoDiscover génère le WSDL correctement
 */
class Server {
  /**
   * Retourne i
   * @param integer $i
   * @return integer
   */
  function donne($i) {
    return $i;
  }
  /**
   * Retourne hello world
   * @return string
   */
  function hello() {
    return "hello world";
  }
}

// Créer un serveur SOAP
try {
  $server = new SoapServer(WEBSERVICE_URI);
  $server->setClass("Server");
  $server->handle();

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}
```

---

## Sans WSDL

<ins>inc.config.php</ins>:

``` php
<?php
// URL du Webservice
define('WEBSERVICE_URI', 'http://127.0.0.1/webservice/Server.php');
```

<ins>server.php</ins>:

``` php
<?php
require 'inc.config.php';

/**
 * Webservice sans WSDL
 */

// Fonctions implémentées par le serveur
class Server {
  function donne($i) {
    return $i;
  }
  function hello() {
    return "hello world";
  }
}

// Crée un serveur SOAP
try {
  $server = new SoapServer(null, array('uri' => WEBSERVICE_URI));
  $server->setClass("Server");
  $server->handle();

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}
```

<ins>client.php</ins>:

``` php
<?php
require 'inc.config.php';

try {

  // Crée un client SOAP
  $client = new SoapClient(null, array (
      'uri'        => WEBSERVICE_URI,
      'location'   => WEBSERVICE_URI,
      'trace'      => 1,
      'exceptions' => 0
  ));

  // Appelle des méthodes du serveur
  echo $client->__call('hello', array());
  echo $client->__call('donne', array('i'=>5));

} catch(SoapFault $f) {
  echo "Erreur SOAP : " . $f;
}
```


