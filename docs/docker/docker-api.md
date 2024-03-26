---
title: Docker API
category: Workflow, Containers, Docker
---

Le client Docker (les commandes `docker` en ligne de commmande) communique avec le moteur Docker (Docker Engine) en utilisant une API. Plutôt que de passer par le client, on peut directement lancer des requêtes au moteur Docker en utilisant l'API. Pour ce faire, on utilise des requêtes HTTP passant par un socket UNIX, `/var/run/docker.sock`.

## Effectuer des requêtes

* On peut utiliser `curl` (>= 7.40) pour effectuer de telles requêtes

  ```
  curl --unix-socket /var/run/docker.sock http://v1.24/containers/json
  ```

* On peut également passer par PHP (>= 7.0.7)

  ``` php
  /**
   * @param string $endpoint         - Ex: /containers/json
   * @param string[optional] $method - [GET]
   * @param string[optional] $args   - [array()] ex: ["Image":"nginx"]
   * @throws Exception               - You have to enable curl
   * @return array(string,string)    - Returns status + response
   */
  function docker_query($endpoint, $method = 'GET', $args = [])
  {
      if(!$ch = curl_init($this->version . $endpoint)) {
          throw new \Exception('You have to enable curl');
      }
      $stderr = fopen('php://temp', 'w+');

      curl_setopt_array($ch, array(
          CURLOPT_UNIX_SOCKET_PATH => '/var/run/docker.sock',
          CURLOPT_RETURNTRANSFER   => true,
          CURLOPT_FOLLOWLOCATION   => true,
          CURLOPT_CONNECTTIMEOUT   => 10,
          CURLOPT_TIMEOUT          => 50,
          CURLOPT_VERBOSE          => true,
          CURLOPT_STDERR           => $stderr
      ));
      if($method == 'POST') {
          $data_string = json_encode($args);

          curl_setopt($ch, CURLOPT_POST, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
              'Content-Type: application/json',
              'Content-Length: ' . strlen($data_string)
          ));
      } else if($method != 'GET') {
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method); // DELETE
      }

      $response = curl_exec($ch);
      $status = curl_getinfo($ch)['http_code'];

      // Check cUrl response
      if($response === false) {
           $msg = sprintf("cUrl error (#%d): %s\n",
              curl_errno($ch),
              curl_error($ch)
          );
          rewind($stderr);

          $msg .= "\n" . stream_get_contents($stderr);
          throw new \Exception($msg);
      }
      curl_close($ch);

      return [$status, $response];
  }

  // Create a new container
  $container_name = 'mycontainer';
  $domain         = 'mycontainer.localhost';

  list($status, $result) = docker_query('/containers/create?name=' . $container_name, 'POST', [
      'Image'      => 'localcloud9/workspace',
      'Labels'     => ['localcloud9' => '1'],
      'HostConfig' => [
        'Binds'             => [$container_name . ':/home/ubuntu/workspace'], // Volumes
        'MemoryReservation' => 2147483648, // 2G Soft limit
        'Memory'            => 2362232012, // 2.2G Hard limit
        'CpuPeriod'         => 100000,     // Limit to 1 CPU
        'CpuQuota'          => 100000,
      ],
      'NetworkingConfig' => [ // Private network "nginx-proxy"
          'EndpointsConfig' => [
              'nginx-proxy' => [
                  'IPAMConfig' => null,
                  'Links'      => null,
                  'Aliases'    => null
              ]
          ]
      ],
      'Env' => ["VIRTUAL_HOST=${domain}", 'VIRTUAL_PORT=8080', 'EXPOSE_PORT=5050,8080,8081,8082'],
      'Cmd' => ['bash', '-lc', "node /var/c9sdk/server.js "
                                  . "-w /home/ubuntu/workspace "
                                  . "--auth : "
                                  . "--listen 0.0.0.0 --port 5050"],
      'tty' => true
  ]);
  ```

  Si vous passez par Apache, assurez-vous que l'utilisateur Apache a la permission d'utiliser le socket.

  ```
  su - www-data -s /bin/bash -c 'curl --unix-socket /var/run/docker.sock http://v1.24/containers/json'
  ```

---

## Endpoints

### Containers

    GET /containers/json                             List containers
    POST /containers/create?name=(name)              Create a container
    GET /containers/(id or name)/json                Inspect a container
    GET /containers/(id or name)/top                 List processes running in a container
    GET /containers/(id or name)/logs                Get container logs
    GET /containers/(id or name)/changes             Inspect changes on a container's filesystem
    GET /containers/(id or name)/export              Export a container
    GET /containers/(id or name)/stats               Get container resource usage
    POST /containers/(id or name)/resize             Resize a container tty
    POST /containers/(id or name)/start              Start a container
    POST /containers/(id or name)/stop               Stop a container
    POST /containers/(id or name)/restart            Restart a container
    POST /containers/(id or name)/kill               Kill a container
    POST /containers/(id or name)/update             Update a container
    POST /containers/(id or name)/rename             Rename a container
    POST /containers/(id or name)/pause              Pause a container
    POST /containers/(id or name)/unpause            Unpause a container
    POST /containers/(id or name)/attach             Attach to a container
    GET /containers/(id or name)/attach/ws           Attach to a container (websocket)
    POST /containers/(id or name)/wait               Wait until a container stops
    DELETE /containers/(id or name)                  Remove a container
    HEAD /containers/(id or name)/archive            Retrieve information about files in a container
    GET /containers/(id or name)/archive             Get a tr archive of a resource in the container
    PUT /containers/(id or name)/archive?path=(path) Upload a tar archive to be extracted to a path in the filesystem of the container
    POST /containers/prune                           Delete stopped containers
 
### Images

    GET /images/json                                 List images
    POST /build                                      Build image from a Dockerfile
    POST /images/create                              Create an image by pulling it from the registry
    GET /images/(name)/json                          Inspect an image
    GET /images/(name)/history                       Get the history of an image
    POST /images/(name)/push                         Push an image on the registry
    POST /images/(name)/tag                          Tag an image into a repository
    DELETE /images/(name)                            Remove an image
    GET /images/search?term=(term)                   Search images
    POST /images/prune                               Delete unused images
    POST /commit?container(id or name)               Create a new image from a container
    GET /images/(name)/get                           Get a tarball of an image in a repository
    GET /images/get?names=(names)                    Get a tarball of several (or all) images in a repository
    POST /images/load                                Load a tarball with a set of images and tags into Docker
    GET /distribution/(name)/json                    Get image information from the registry

### Networks

    GET /networks                                    List networks
    GET /networks/(id or name)                       Inspect network
    DELETE /networks/(id or name)                    Remove a network
    POST /networks/create                            Create a network
    POST /networks/(id or name)/connect              Connect a container to a network
    POST /networks/(id or name)/disconnect           Disconnect a container from a network
    POST /networks/prune                             Delete unused networks

### Volumes

    GET /volumes                                     List volumes
    POST /volumes/create                             Create a volume
    GET /volumes/(name)                              Inspect a volume
    DELETE /volumes/(name)                           Remove a volume
    POST /volumes/prune                              Delete unused volumes

### Exec

    POST /containers/(id or name)/exec               Set up an exec instance in a running container
    POST /exec/(id)/start                            Start a previously set up exec instance
    POST /exec/(id)/resize                           Resize the tty session used by the exec command
    GET /exec/(id)/json                              Inspect the exec command

### Swarm

    GET /swarm                                       Inspect swarm
    POST /swarm/init                                 Initialize a new swarm
    POST /swarm/join                                 Join an existing swarm
    POST /swarm/leave                                Leave a swarm
    POST /swarm/update?version=(version)             Update a swarm
    GET /swarm/unlockey                              Get the unlock key
    POST /swarm/unlock                               Unlock a locked manager

### Nodes

    GET /nodes                                       List nodes
    GET /nodes/(id or name)                          Inspect a node
    DELETE /nodes/(id or name)                       Remove a node
    POST /nodes/(id)/update                          Update a node

### Services

    GET /services                                    List services
    POST /services/create                            Create a service
    DELETE /services/(id or name)                    Remove a service
    GET /services/(id or name)                       Inspect a service
    POST /services/(id)/update                       Update a service
    GET /services/(id)/logs                          Get a service's logs

### Tasks

    GET /tasks                                       List tasks
    GET /tasks/(id)                                  Inspect a task
    GET /tasks/(id)/logs                             Get task logs

### Secrets

    GET /secrets                                     List secrets
    POST /secrets/create                             Create a secret
    GET /secrets/(id)                                Inspect a secret
    DELETE /secrets/(id)                             Delete a secret
    POST /secrets/(id)/update                        Update a secret

### Plugins

    GET /plugins                                     List installed plugins
    GET /plugins/privileges?remote=(name)            Get plugin privileges
    POST /plugins/pull?remote=(ref)                  Install a plugin
    GET /plugins/(name)/json                         Inspect a plugin
    POST /plugins/(name)/enable                      Enable a plugin
    POST /plugins/(name)/disable                     Disable a plugin
    DELETE /plugins/(name)                           Remove a plugin
    POST /plugins/(name)/upgrade?remote=(ref)        Upgrade a plugin
    POST /plugins/create?name=(name)                 Create a plugin
    POST /plugins/(name)/push                        Push a plugin to the registry
    POST /plugins/(name)/set                         Configure a plugin

### System

    POST /auth                                       Check auth configuration
    GET /info                                        Display system-wide information
    GET /version                                     Show the Docker version
    GET /_ping                                       Ping the Docker server
    GET /events                                      Monitor docker's events
    GET /system/df                                   Get data usage information

### Config

    GET /configs                                     List configs
    POST /configs/create                             Create a config
    GET /configs/(id)                                Inspect a config
    DELETE /configs/(id)                             Delete a config
    POST /configs/(id)/update                        Update a a config
 
[Docker Engine API (v1.30)](https://docs.docker.com/engine/api/v1.30/)