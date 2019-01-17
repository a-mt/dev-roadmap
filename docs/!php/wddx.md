---
title: WDDX
category: Web, PHP
---

WDDX (Web Distributed Data Exchange) est un protocole permettant des appels de procédures à distance (Remote Procedure Call, abbr. RPC). Il s'appuie sur l'usage de HTTP et XML.

Pour implémenter un webservice WDDX avec PHP, on utilise les fonctions
* `wddx_deserialize` pour le client
* `wddx_packet_start`, `wddx_add_vars` et `wddx_packet_end` pour le serveur.

<ins>inc.config.php</ins>:

``` php
<?php
define('WEBSERVICE_URI', 'http://127.0.0.1/webservice/Server.php');
```

<ins>client.php</ins>:

``` php
<?php
require 'inc.config.php';

try {
  // Crée un client WDDX
  $client = new WDDXClient(WEBSERVICE_URI);

  // Appelle des méthodes du serveur
  echo $client->__call('hello', array());
  echo $client->__call('donne', array('i' => 5));

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}

/**
 * Classe permettant d'effectuer une requête GET avec WDDX sur un serveur donné
 */
class WDDXClient {
  protected $url,
            $lastRequest,
            $lastResponse;

  public function __construct($url) {
    $this->url = $url;
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
    $args['method']     = $method;
    $this->lastRequest  = $request = '?' . http_build_query($args);
    $this->lastResponse = $rawResponse = file_get_contents($this->url . $request);

    // Récupérer la réponse
    if(!$rawResponse || !$response = wddx_deserialize($rawResponse)) {
      throw new Exception('Looks like we got no xml document');
    }
    if(isset($response['faultString'])) {
      throw new Exception($response['faultString']);
    }
    return $response['response'];
  }
}
```

<ins>server.php</ins>:

``` php
<?php
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
  $server = new WDDXServer();
  $server->setClass("Server");
  $server->handle();

} catch(Exception $e) {
  echo "Exception: " . $e->getMessage();
}

/**
 * Classe permettant de répondre à une requête GET via WDDX
 */
class WDDXServer {
  protected $helper;

  public function setClass($className) {
    $this->helper = new $className;
  }

  /**
   * Effectue la requête GET et affiche la réponse en WDDX
   */
  public function handle() {
    header("Content-Type: text/xml;encoding=utf-8");
    $wid = wddx_packet_start();

    // Récuperer la réponse
    try {
    	$response = $this->call();
    	wddx_add_vars($wid, "response");

    } catch(Exception $e) {
    	$faultString = $e->getMessage();
    	wddx_add_vars($wid, "faultString");
    }

    echo wddx_packet_end($wid);
  }

  /**
   * Traiter la requête grâce à l'objet passé via setClass
   * @return mixed
   */
  protected function call() {

    // Vérifier le nom de la méthode
    $method = (isset($_GET['method']) ? trim($_GET['method']) : '');

    if(!method_exists($this->helper, $method)) {
      $method = false;
    }
    if(!$method) {
      throw new Exception('No valid request.');
    }

    // Vérifier les paramètres
    $aError = array();
    $aParam = array();
    $ref    = new ReflectionMethod($this->helper, $method);

    foreach($ref->getParameters() as $param) {
    	if(isset($_GET[$param->name])) {
        $aParam[] = $_GET[$param->name];
    	} else {
        $aError[] = $param->name;
    	}
    }
    if($aError) {
      throw new Exception('Missing parameter(s) : ' . implode(',', $aError) . '.');
    }

    // Traiter la requête
    return call_user_func_array(array($this->helper, $method), $aParam);
  }
}
```