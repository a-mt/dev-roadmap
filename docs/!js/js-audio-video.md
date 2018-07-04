---
title: Audio & vidéo
category: Web, JavaScript, API
---

Les éléments `<audio>` et `<video>` ont une API qui permet de contrôler la lecture/pause, etc.

## Rappel HTML

### Video

L'élément `<video>` permet d'intégrer des vidéos dans une page web. Du contenu alternatif peut être placé dans cette balise, il sera affiché si la navigateur ne prend pas en charge cet élément.

``` html
<video src="rabbit320.webm" controls>
  <p>Votre navigateur ne prend pas en charge les vidéos HTML5.
  Voici, à la place, un <a href="rabbit320.webm">lien sur la vidéo</a>.</p> 
</video>
```

Différents formats vidéos peuvent être utilisés: webm, mp4 ou off. Tous les navigateurs ne prennent pas en charge les mêmes codecs - les navigateurs ne détenant pas les droits du format (brevet) doivent acheter une licence, qui coûte parfois très cher.

Pour pallier à ça, plutôt que de spécifier `src`, vous pouvez spécifier plusieurs `<source>` à l'intérieur, le navigateur affichera la premiière vidéo qu'il peut prendre en charge.

``` html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>Votre navigateur ne supporte pas la vidéo HTML5.
  Voici à la place <a href="rabbit320.mp4">un lien vers la vidéo</a>.</p>
</video>
```

### Attributs

<table>
<tr>
  <td><code>width</code>, <code>height</code></td>
  <td>dimensions du lecteur</td>
</tr>
<tr>
  <td><code>controls</code></td>
  <td>afficher les contrôles natifs du lecteur vidéo</td>
</tr>
<tr>
  <td><code>crossorigin</code></td>
  <td><code>anonymous</code> = envoie une requête CORS avec l'entête HTTP <code>Origin</code><br>
  <code>use-credentials</code> = envoie une requête CORS avec l'entête HTTP <code>Header</code><br>
  Si l'attribut n'est pas définit, la ressource est récupérée sans requête CORS</td>
</tr>
<tr>
  <td><code>autoplay</code></td>
  <td>lancer la lecture de la vidéo dès qu’elle est chargée</td>
</tr>
<tr>
  <td><code>loop</code></td>
  <td>lire en boucle</td>
</tr>
<tr>
  <td><code>muted</code></td>
  <td>mettre en sourdine par défaut</td>
</tr>
<tr>
  <td><code>poster</code></td>
  <td>image affichée avant que la lecture ne soit lancée</td>
</tr>
<tr>
  <td><code>preload</code></td>
  <td>indique au navigateur s’il doit charger la vidéo en même temps que la page (par défaut: <code>metadata</code>)</td>
</tr>
<tr>
  <td><code>src</code></td>
  <td>définit la source du média. Sinon, on peut utiliser des éléments <code>&lt;source&gt;</code> (l'un ou l'autre)</td>
</tr>
<tr>
  <td><code>type</code></td>
  <td>si la source est définit via <code>src</code>, définit son type MIME</td>
</tr>
</table>

``` html
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
```

### Audio

L'élément `<audio>` fonctionne de la même manière que `<video>` mais pour les éléments audio. Les formats audio pouvant être acceptés sont: mp3, wav, ogg.

``` html
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>Votre navigateur ne prend pas en charge l'audio HTML5.
  Voici, à la place, un <a href="viper.mp3">lien sur l'audio</a>.</p>
</audio>
```

Attributs: les mêmes que vidéo sauf `width`, `height` et `poster`.

### Track

Les vidéos HTML peuvent être sous-titrée à l'aide du format WebVTT et de l'élément `<track>`.

WebVTT est un format d'écriture de fichier texte `.vtt`, il contient des chaînes de texte et des metadatas (temps et durée des sous-titres, style et position). Un fichier WebVTT typique ressemblera à ça:

``` txt
WEBVTT

1
00:00:22.230 --> 00:00:24.606
Ceci est le premier sous‑titre.

2
00:00:30.739 --> 00:00:34.074
Ceci est le deuxième.
```

Les éléments `<track>` permettent d'attacher des fichiers WebVTT à la vidéo. On précise son type avec `kind` (`subtitles`, `captions` ou `descriptions`), son emplacement avec `src` et son langage avec `srclang`.

``` html
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track label="English" kind="subtitles" srclang="en" src="captions/vtt/sintel-en.vtt" default>
    <track label="Deutsch" kind="subtitles" srclang="de" src="captions/vtt/sintel-de.vtt">
    <track label="Español" kind="subtitles" srclang="es" src="captions/vtt/sintel-es.vtt">
</video>
```

NB Si vos sous-titres sont au format SubRip Text (SRT), vous pouvez facilement les [convertir au format WebVTT](https://atelier.u-sub.net/srt2vtt/).  
Les pistes texte sont utiles pour les personnes malentendantes ou qui parlent une langue étrangère mais aussi pour les moteurs de recherche.

### Fallback

Pour les navigateurs qui ne prennent pas en charge les balises `<audio>` et `<video>`, on peut utiliser [mediaelement.js](https://github.com/mediaelement/mediaelement/tree/master/build).

``` html
<video width="320" height="240" poster="poster.jpg" controls="controls" preload="none">
  <source type="video/mp4" src="myvideo.mp4" />
  <source type="video/webm" src="myvideo.webm" />
  <source type="video/ogg" src="myvideo.ogv" />
  <object width="320" height="240" type="application/x-shockwave-flash" data="/path/to/mediaelement-flash-video.swf">
    <param name="movie" value="/path/to/mediaelement-flash-video.swf" />
    <param name="flashvars" value="controls=true&amp;poster=myvideo.jpg&amp;file=myvideo.mp4" />
    <img src="myvideo.jpg" width="320" height="240" title="No video playback capabilities" />
  </object>
</video>
```

---

## Créer les éléments via JavaScript

### Audio

``` js
var myAudio = document.createElement('audio');

if (myAudio.canPlayType('audio/mpeg')) {
    myAudio.setAttribute('src', 'audiofile.mp3');
} else if (myAudio.canPlayType('audio/ogg')) {
    myAudio.setAttribute('src', 'audiofile.ogg');
}

myAudio.currentTime = 5;
myAudio.play();
```

### Vidéo

``` js
var myVideo = document.createElement('video');

if (myVideo.canPlayType('video/mp4')) {
  myVideo.setAttribute('src','videofile.mp4');
} else if (myVideo.canPlayType('video/webm')) {
  myVideo.setAttribute('src','videofile.webm');
}

myVideo.width = 480;
myVideo.height = 320;
```

---

## Contrôles personnalisés

Les contrôles audio et vidéo natifs différent d'un navigateur à l'autre et sont généralement assez peu accessibles au clavier. Pour régler ce problème, on peut masquer les contrôles natifs et afficher les notres, en utilisant l'API HTMLMediaElement côté JavaScript pour déclencher les actions de l'utilisateur.

Les éléments `<audio>` et `<video>` utilisent tous deux l'API HTMLMediaElement, la seule différence entre les deux est qu'un élément audio n'a pas de visuel.

[Exemple lecteur personnalisé](https://codepen.io/a-mt/pen/pKjJdw)  
[Exemple 2](http://iandevlin.github.io/mdn/video-player-with-captions/)

### Afficher les contrôles personnalisés

Le mieux à faire est
* dans un premier temps, mettre l'attribut `controls` sur l'élément (dans le HTML) pour que les contrôles natifs soient affichés
* définir les contrôles personnalisés dans le HTML et les masquer via CSS
* vérifier si le navigateur prend en charge l'élément `<video>` et au moins une des sources vidéo
* si c'est le cas, enlever l'attribut `controls` et afficher les contrôles personnalisés via JavaScript.  
  De cette manière, si le JavaScript ne marche pas, l'utilisateur a les contrôles par défaut du navigateur.

  ``` js
  var media = document.querySelector('video');

  if(media.canPlayType) {
    media.removeAttribute('controls');
    document.querySelector('.controls').style.visibility = 'visible';
  }
  ```

### Play/pause

On peut utiliser la propriété `paused` pour savoir si la vidéo est en cours de lecture ou non et les méthodes `play()` et `pause()` pour lire ou mettre en pause la vidéo (respectivement).

``` js
playBtn.addEventListener('click', playPauseMedia);

function playPauseMedia() {
  if(media.paused || media.ended) {
    media.play();
  } else {
    media.pause();
  }
}
```

### Stop

Il n'y a pas de méthode `stop()`, mais on peut obtenir cet effet en appelant `pause()` puis en mettant `currentTime` à 0.

``` js
stopBtn.addEventListener('click', stopMedia);
media.addEventListener('click', stopMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
}
```

### Temps écoulé

L'événement `timeupdate` est déclenché régulièrement tant que la vidéo est en cours, on peut s'en servir pour mettre à jour l'affichage du temps écoulé. La fréquence à laquelle cet événement est déclenché dépend entre autres de votre navigateur et de la puissance de votre CPU.

Vous pouvez utiliser la propriété `currentTime` pour déterminer la position actuelle de l'utilisateur dans la vidéo (en secondes) ou la mettre à jour. 
La propriété `duration` quant à elle permet de déterminer la durée totale de la vidéo, en secondes.

``` js
media.addEventListener('timeupdate', setTime);

function setTime() {
  var minutes = Math.floor(media.currentTime / 60);
  var seconds = Math.floor(media.currentTime - minutes * 60);

  // Afficher le temps écoulé
  timer.textContent = minutes.padStart(2, "0") + ':' + seconds.padStart(2, "0");

  // Afficher la progressbar
  var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + 'px';
}
```

### Volume

Le volume de la vidéo (ou audio) peut être récupéré ou mis à jour avec la propriété `volume`.  
1 = volume maximal (valeur par défaut), 0 = muet.

``` js
soundRange.addEventListener("change", changeVolume);

function changeVolume(e) {
  media.volume = e.target.value;
}
```

Vous pouvez utiliser la propriété `muted` pour mettre en sourdine l'élément et l'événement `onvolumechange` pour détecter les changements de volume.

### Vitesse de lecture

La vitesse de lecture est accessible via la propriété `playbackRate`.  
2 = deux fois plus rapide, 0.5 = deux fois plus lent.

``` js
rateRange.addEventListener("change", changeRate);

function changeRate(e) {
  media.playbackRate = e.target.value;
}
```

La vitesse de lecture par défaut peut être définie avec la propriété `defaultPlaybackRate`. Cela permet de définir la vitesse de lecture de la vidéo avant qu'elle soit chargée.

L'événement `ratechange` est déclenché à chaque changement de vitesse de lecture.

### Plein écran

Vous pouvez au préalable si le navigateur prend en charge l'API Fullscreen:

``` js
var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled
                            || document.msFullscreenEnabled || document.webkitSupportsFullscreen
                            || document.webkitFullscreenEnabled || media.webkitRequestFullScreen);
```

Et l'appeler quand l'utilisateur clic sur le bouton plein écran:

``` js
if(fullScreenEnabled) {
  fullscreenBtn.style.display = "inline-block";
  fullscreenBtn.addEventListener("click", openFullscreen);
}

function openFullscreen() {
  if (media.requestFullscreen) {
    media.requestFullscreen();
  } else if (media.msRequestFullscreen) {
    media.msRequestFullscreen();
  } else if (media.mozRequestFullScreen) {
    media.mozRequestFullScreen();
  } else if (media.webkitRequestFullscreen) {
    media.webkitRequestFullscreen();
  }
}
```

### Légendes et sous-titres

La propriété `textTracks` contient un tableau de tous les éléments `<track>` attachés à la vidéo. On peut les désactiver en mettant leur `mode` à `hidden` ou en activer un en mettant son code à `showing`.

``` js
// Désactiver tous les sous-titres
for(var i = 0; i < media.textTracks.length; i++) {
  media.textTracks[i].mode = 'hidden';
}
```

``` js
// Activer la première piste de sous-titres
media.textTracks[0].mode = "showing";
```

NB Il est nécessaire d'utiliser CORS lorsque vos fichiers CC ne se trouvent pas sur le même domaine que la page hébergeant l'élément audio/video. Pour que cela fonctionne, il est nécessaire d'ajouter l'attribut `crossorigin` à l'élement audio/video.

``` html
<video ... crossorigin="anonymous">
```

#### CSS

Du CSS peut être appliqué aux sous-titres via le pseudo-élément `::cue`.

``` css
::cue {
   color: #ccc;
}
```

Un fichier WebVTT peut spécifier des "voix":

``` css
0
00:00:00.000 --> 00:00:12.000
<v Test>[Test]</v>
```

Du CSS peut être appliqué en ciblant ces voix comme suit:

``` css
::cue(v[voice='Test']) {
   color:#fff;
   background:#0095dd;
}
```

### Chargement

#### buffered

La propriété `buffered` permet de savoir quelles parties du média sont en mémoire tamppon. À priori, sans interraction utilisateur, la partie mise en mémoire tampon en contigue. Par contre, en cliquant sur la barre de progrès pendant que le média est en cours de chargement pour écouter le média plus loin, plusieurs parties peuvent être chargées, avec des trous entre les deux.

`buffered` retourne un objet `TimeRanges`. Il contient les propriétés/méthodes suivantes:

<table>
<tr><td><code>length</code></td><td>le nombre de plages de temps contenues dans l'objet</td></tr>
<tr><td><code>start(index)</code></td><td>permet de récupérer le temps du début (en seconde) d'une plage de temps</td></tr>
<tr><td><code>end(index)</code></td><td>permet de récupérer le temps de la fin (en seconde) d'une plage de temps</td></tr>
</table>

L'événement `progress` est déclenché au fur et à mesure que les données sont téléchargées, cela peut nous permettre par exemple d'afficher une barre de progrès du chargement de la vidéo.

[JSBin Barre de progrès mémoire tampon](http://jsbin.com/badimipi/1/edit?html,js,output)

#### seekable

La propriété `seekable` permet de savoir quelles parties du média peuvent être jouées sans chargement préalable.  
Elle retourne un `TimeRanges`.

La valeur retournée est différente de `buffered` lorsque le téléchargement de plages d'octets (byte-range requests) est activé sur le serveur. Les requêtes de plage d'octets permettent aux parties du fichier média d'être délivrées du serveur et jouées presque immédiatement — et sont donc seekable.

#### played

La propriété `played` permet de savoir quelles plages de temps de la vidéo ont été jouées. Elle retourne un `TimeRanges`.  
Cela peut être utile si vous voulez savoir quelles parties d'une vidéo ont été visualisées par exemple.

---

## Pour aller plus loin

* [HTMLMediaElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement)
* [Liste des événements sur les médias](https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Events/evenement_medias)

* [JSFiddle Appliquer des filtres sur une vidéo avec Canvas](https://jsfiddle.net/amt01/0q4oaxLn/)

* [Live streaming web Audio et Vidéo](https://developer.mozilla.org/fr/Apps/Build/Audio_and_video_delivery/Live_streaming_web_audio_and_video)  
  Afficher des flux en direct —
  au format DASH, HLS ou Opus (audio) —
  avec le protocole HTTP, RTMP ou RTSP

  ``` html
  <video src="rtsp://myhost.com/mymedia.format">
   <!-- Fallback here -->
  </video>
  ```

* [WebRTC getUserMedia](https://developer.mozilla.org/fr/docs/NavigatorUserMedia.getUserMedia)  
  Utiliser la webcam et/ou le microphone de l'utilisateur.

  ``` html
  <video id="webcam" width="480" height="360"></video>
  ```

  <ins>Version ES6</ins>: `navigator.mediaDevices.getUserMedia` (promesses)

  ``` js
  if(navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })

    // Success
    .then(function(stream) {
      var video = document.getElementById('webcam');
      video.autoplay = true;
      video.src = window.URL.createObjectURL(stream);
    })

    // Error
    .catch(function() {
      alert('Cannot retrieve the stream - are you running on file:/// or did you disallow access?');
    });
  }
  ```

  <ins>Version legacy</ins>: `navigator.getUserMedia` (callbacks)

  ``` js
  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia
                        || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

  if(navigator.getUserMedia) {
    navigator.getUserMedia({
      video: true,
      audio: false

    // Success
    }, function(stream) {
      var video = document.getElementById('webcam');
      video.autoplay = true;
      video.src = window.URL.createObjectURL(stream);

    // Error
    }, function(){
      alert('Cannot retrieve the stream - are you running on file:/// or did you disallow access?');
    });
  }
  ```
  
  [Utiliser des contraintes](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints#Applying_constraints)

* [MediaRecording](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)  
  Enregistrer un flux média, comme la webcam ou le microphone.

  ``` js
  navigator.getUserMedia({audio:true}, function(stream) {

    // Encapsuler l'audio dans un recorder
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function(e) {

      // Utiliser le résultat comme source audio
      var audio = document.createElement('audio');
      audio.src = window.URL.createObjectURL(e.data);
    }
  });
  ```

  Pour les navigateurs qui ne prennent pas en charge MediaRecorder, on peut utiliser la librairie [RecordRTC](https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC)

* [Web Audio](https://developer.mozilla.org/fr/Apps/Build/Audio_and_video_manipulation#Manipulation_Audio)  
  Manipuler l'audio (gain, distortion, etc)

* [Extensions de Source Media (MSE)](https://developer.mozilla.org/fr/Apps/Build/Audio_and_video_delivery#Extensions_de_Source_Media)  
  Génération dynamique de flux média.
