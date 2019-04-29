---
title: Gérer le buffer
category: Web, PHP
---

## Mettre en pause le script

### sleep

Met en pause le script pendant le nombre de secondes donné.

``` php
<?php
// Attendre 1s
sleep(1);
```

### usleep

Met en pause le script pendant le nombre de microsecondes donné.

``` php
<?php
// Attendre 0.5s
usleep(5000);
```

### time_sleep_until

Met en pause le script jusqu'au temps spécifié (timestamp).

``` php
<?php
time_sleep_until(strtotime('+3 second'));
```

---

## Output Buffer

Un buffer (temporisation de sortie) est automatiquement démarré au début du script.
Tout ce qui est dans le buffer est affiché à la fin du script, ou à chaque fois qu'on demande explicitement l'affichage du buffer.  
Manipuler le buffer permet notamment de mettre en cache du contenu, d'écrire dans les logs, ou encore d'utiliser un système de template.

### ob_start

Démarre le buffer.

``` php
<?php
ob_start();
```

### ob_flush

Affiche le contenu du buffer de sortie et le vide.

``` php
<?php
ob_flush();
```

### ob_end_flush

Affiche le contenu du buffer de sortie et désactive le buffer.

``` php
<?php
ob_end_flush();
```

### ob_get_flush

Affiche et retourne le contenu du buffer puis désactive le buffer.

``` php
<?php
if(!is_file($cache_file)) {
  ob_start();
  include 'inc.menu.php';
  file_put_contents($cache_file, ob_get_flush());

} else {
  echo file_get_contents($cache_file);
}
```

### ob_get_contents

Retourne le contenu du buffer.  
Le buffer n'est pas vidé, il peut être réutilisé ultérieurement.

``` php
<?php
ob_start();
echo 'a';
echo ob_get_contents();
echo 'b';
ob_end_flush(); # aab
```

### ob_get_clean

Retourne le contenu du buffer et le vide.  
Revient à `ob_get_contents` suivit de `ob_clean`.

``` php
<?php
function getInclude($filename) {
  ob_start();
  include $filename;
  return ob_get_clean();
}
```

### ob_clean

Vide le contenu du buffer.  
Ne l'affiche pas.

``` php
<?php
ob_clean();
```

### end_end_clean

Vide le contenu du buffer et le désactive.

``` php
<?php
ob_end_clean();
```

### ob_get_level

Retourne le nombre de buffers actifs

``` php
<?php
if(!ob_get_level()) {
    ob_start();
}
```

### ob_get_status

Retourne les infos du dernier buffer actif.

``` php
<?php
$data = ob_get_status();
```

Peut retourner les infos de tous les buffers actifs.

``` php
<?php
$data = ob_get_status(true);
```

---

## Streaming

### flush

Envoit l'affichage au navigateur.  
Il est nécessaire de préciser dans les entêtes HTTP le type d'encodage utilisé pour que le `flush` fonctionne.

La temporisation de sortie n'est pas affecté par le `flush`, par conséquent pour envoyer du texte au client en plusieurs fois, il est nécessaire d'appeler `ob_flush` puis `flush`.

``` php
<?php
// Affiche un entier toutes les secondes

set_time_limit(0);
header('Content-type: text/html; charset=utf-8');

for($i = 0; $i < 10; $i++) {
  for($j = 0; $j < 10; $j++) {
    echo $i;

    if (ob_get_level()) {
      ob_flush();
    }
    flush();
  }
  echo '<br>';
  sleep(1);
}
```

```
while ( @ob_end_flush() );
flush();
```

### set_time_limit

Fixe le temps maximum d'exécution du script.  
Permet d'empêcher le script d'être bloqué et prendre des ressources indéfiniment.  
Durée par défaut indiquée dans php.ini ( `max_execution_time`).

``` php
<?php
set_time_limit(1);
sleep(1); #  Fatal error: Maximum execution time of 1 second exceeded
```

Mis à 0, aucune limite de temps n'est imposée.  
Notamment utile pour les téléchargements de fichier et affichage en temps réel avec `flush`.

---

## Script CLI

### ignore_user_abort

Lorsque PHP est exécuté comme script en ligne de commande, si le terminal ayant lancé le script est fermé avant que le script ne soit terminé, alors le script s'arrêtera dès qu'il essaiera d'écrire quelque chose dans le terminal, à moins que la variable `ignore_user_abort` du fichier php.ini ne soit vrai.

La fonction `ignore_user_abort` peut vérifier ou modifier cette vleur.

``` php
<?php
echo ignore_user_abort() ? 'Y' : 'N';
```

``` php
<?php
ignore_user_abort(true);
```

## Script HTTP

### connection_status

Retourne le statut de connexion HTTP.  
Il est nécessaire de faire un `flush` au préalable pour avoir un statut à jour.

``` php
<?php
if(connection_status() == 3) {
  die;
}
```

| Valeur | Description
|---     |---
| 0      | NORMAL
| 1      | ABORTED
| 2      | TIMEOUT
| 3      | ABORTED et TIMEOUT

### connection_aborted

Vérifie si l'internaute a abandonné la connexion HTTP (a fermé l'onglet, changé de page).

``` php
<?php
set_time_limit(0);
header('Content-type: text/html; charset=utf-8');
ignore_user_abort(true);

sleep(3);

// Envoyer une réponse partielle vide
for($i = 0; $i < 2; $i++) {
  echo " ";
  flush();
  ob_flush();
  sleep(1);
}

// Vérifier le statut HTTP
if(connection_aborted()) {
  @unlink('guardrail');
  exit;
}
touch('guardrail');
```
