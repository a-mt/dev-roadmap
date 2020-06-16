---
title: JQuery
category: Web, JavaScript, Library
---

JQuery est une librairie qui permet de manipuler le DOM, d'ajouter des animations dans la page,
d'effectuer des requêtes AJAX, etc, tout en s'occupant de la compatibilité des navigateurs.
JQuery offre ainsi une manière simplifié d'utiliser les fonctionnalités du navigateur sans
avoir à s'occuper de quel est le navigateur en cours et quelle est la syntaxe à utiliser.
C'est notamment utile lorsqu'on veut que son code soit compatible avec les anciens navigateurs,
les navigateurs les plus récents suivant généralement les spécifications ECMAScript.

## Fetch

Vanilla JavaScript, Requête AJAX supportant les anciens navigateurs:

``` js
var request;
if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHHTP');
}
request.open('GET', 'data.json');
request.onreadstatechange = function() {
    if(request.status == 200 && request.readyState == 4) {

        // Callback
        var info = JSON.parse(request.responseText);
        console.log(info);
    }
}
request.send();
```

Vanilla JavaScript, Requête AJAX pour les navigateurs modernes:

``` js
fetch('data.json')
.then(response => response.json())
.then(info => { 
  console.log(info);
});
```

JQuery, Requête AJAX supportant les anciens navigateurs:

``` js
$.ajax({
  url: 'data.json',
  dataType: 'json',
  success: function(info){
    console.log(info);
  }
});
```

## Plugin

``` js
/*
 * Slider extension:
 * Call with $(selector).slider();
 */
$.fn.extend({
  slider: function() {
    return this.each(function() {
      new $.slider(this);
    });
  }
});

/*
 * Slider object
 * Call with $.slider(DOMElement)
 */
$.slider = function(obj) {
  var slider = obj;
  var index = 1;
  var marginLeft = -3;
  var itemWidth = false;
  var nbIter = 4;
  var width;
  init();

  function init() {
    $('.prev a', slider).click(prev);
    $('.next a', slider).click(next);
    $('.prev a', slider).hide();

    if($('.miseEnAvant').length > 0) {
      nbIter = 5;
      itemWidth = 188;
    } else {
      itemWidth = 218;
    }

    if($('.item', slider).length <= nbIter) {
      $('.next a', slider).hide();
    }
  }

  function prev() {
    for(var i=0; i<nbIter; i++) {
      if(index > 1) {
        width = (itemWidth ? itemWidth : $('.item', slider).eq(index-2).outerWidth());
        marginLeft = parseInt($('.list', slider).css('margin-left')) + width;

        $('.list', slider).css('margin-left', marginLeft + 'px');
        $('.next a', slider).fadeIn('fast');
        index--;
        if(index == 1) {
          $('.prev a', slider).fadeOut('fast');
        }

      } else {
        $('.prev a', slider).fadeOut('fast');
      }
    }
  }

  function next() {
    for(var i=0; i<nbIter; i++) {
      if(index < $('.item', slider).length - (nbIter - 1)) {
        width = (itemWidth ? itemWidth : $('.item', slider).eq(index-1).outerWidth());
        marginLeft = parseInt($( '.list', slider).css('margin-left')) - width;

        $('.list', slider).css('margin-left', marginLeft + 'px');
        $('.prev a', slider).fadeIn('fast');
        index++;

        if(index == $('.item', slider).length - 2) {
            $('.next a', slider).fadeOut('fast');
        }
      }
    }
    if(index >= $('.item', slider).length - (nbIter - 1)) {
      $('.next a', slider).fadeOut('fast');
    }
  }
};

/*
 * Execute slider extension
 * for each .slider in the page
 */
$(document).ready(function() {
  $('.slider').slider();
});
```

[Is jQuery still relevant?](https://remysharp.com/2017/12/15/is-jquery-still-relevant)
