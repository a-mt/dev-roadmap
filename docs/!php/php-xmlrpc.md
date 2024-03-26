---
title: XML-RPC
category: Web, PHP
---

XML-RPC (XML Remote Procedure Call) est un protocole permettant des appels de procédures à distance (Remote Procedure Call, abbr. RPC). Il s'appuie sur l'usage de HTTP et XML.

Pour implémenter un webservice XML-RPC avec PHP, on utilise les fonctions
* `xmlrpc_encode_request` et `xmlrpc_decode` pour le client
* `xmlrpc_server_create`, `xmlrpc_server_register_method` et `xmlrpc_server_call_method` pour le serveur.

Pour pouvoir les utiliser, il est nécessaire d'installer et activer l'extension `xmlrpc`.

<ins>inc.config.php</ins>:

``` php
<?php
define('WEBSERVICE_URI', 'http://127.0.0.1/xmlrpc/Server.php');
```

<ins>client.php</ins>:

``` php
<?php
require 'inc.config.php';

# -------------------------------------------------------------------------
# PREREQUIS
# -------------------------------------------------------------------------
# Activer XML-RPC :
# - Windows : extension=php_xmlrpc.dll
# - Linux   : apt-get install php5-xmlrpc
# -------------------------------------------------------------------------

try {
  // Crée un client XML-RPC
  $client = new XMLRPCClient(WEBSERVICE_URI);

  // Appelle les méthodes du serveur
  echo $client->__call('hello', array());
  echo $client->__call('donne', array('i' => 5));

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}

/**
 * Classe permettant d'effectuer une requête XMLRPC sur un serveur donné
 */
class XMLRPCClient {
  protected $url,
            $lastRequest,
            $lastResponse;

  public function __construct($url) {
    $this->url = $url;

    if(!function_exists('xmlrpc_server_create')) {
      throw new Exception('XML-RPC isn\'t enabled');
    }
  }
  public function __getLastRequest() {
    return $this->lastRequest;
  }
  public function __getLastResponse() {
    return $this->lastResponse;
  }
  public function __call($method, $args = array())
  {

    // Requêter l'URL
    $this->lastRequest  = $request = xmlrpc_encode_request($method, array_values($args));
    $this->lastResponse = $rawResponse = file_get_contents($this->url, false, stream_context_create(array(
      'http' => array(
        'method' => "POST",
        'header' => "Content-Type: text/xml\r\nUser-Agent: PHPRPC/1.0\r\n",
        'content' => $request
      )
    )));

    // Récupérer la réponse
    if(!$response = xmlrpc_decode($rawResponse)) {
      throw new Exception('Looks like we got no xml document');
    }
    if(is_array($response) && xmlrpc_is_fault($response)) {
      throw new Exception($response['faultString'], $response['faultCode']);
    }
    return $response;
  }
}
```

<ins>server.php</ins>:

``` php
<?php
<?php
# -------------------------------------------------------------------------
# PREREQUIS
# -------------------------------------------------------------------------
# Activer XML-RPC :
# - Windows : extension=php_xmlrpc.dll
# - Linux   : apt-get install php5-xmlrpc
# -------------------------------------------------------------------------

// Fonctions implémentées par le serveur
class Server {
  function donne($i) {
    return $i;
  }
  function hello() {
    return "hello world";
  }
}

// Crée un serveur XML-RPC
try {
  $server = new XMLRPCServer();
  $server->setClass("Server");
  $server->handle();

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}

/**
 * Classe permettant de répondre à une requête POST XMLRPC
 */
class XMLRPCServer {
  protected $server;

  public function __construct() {
    if(!function_exists('xmlrpc_server_create')) {
      throw new Exception('XML-RPC isn\'t enabled');
    }
  }

  public function setClass($className) {
    $helper = new $className;
    $this->server = xmlrpc_server_create();

    foreach(get_class_methods($helper) as $method) {
      xmlrpc_server_register_method($this->server, $method, function($method, $args) use($helper) {
        return call_user_func_array(array($helper, $method), $args);
      });
    }
  }

  public function handle() {

    // N'accepter que les requêtes POST
    if(isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
      if (function_exists('status_header')) {
        status_header(405);
        header('Allow: POST');
      }
      throw new Exception('XML-RPC server accepts POST requests only.');
    }

    // Traiter la requête
    header('Content-Type: text/xml');

    $request = file_get_contents("php://input");
    print xmlrpc_server_call_method($this->server, $request, array());
  }
}
```
