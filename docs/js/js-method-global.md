---
title: Méthodes globales
category: Web, JavaScript, Méthodes
---

## eval

Permet d'executer du texte comme étant du code.  
Parce qu'il permet l'execution de code arbitraire, `eval()` peut constituer une faille de sécurité. Dans la majorité des cas, il ne devrait pas être nécessaire de l'utiliser.

``` js
var stmt = 'console.log("ok")';
eval(stmt);
```

---

## parseInt

Permet de convertir une valeur en entier.  
Si l'on essaie de convertir une valeur non numérique, le résultat obtenu est `NaN`.

``` js
var howMany = "3 dogs";
console.log(parseInt(howMany)); // 3
```

## parseFloat

Permet de convertir une valeur en float - même principe que `parseInt()` mais pour les nombres à virgule.

``` js
var temp = "3.2°";
console.log(parseFloat(temp)); // 3.2
```

## isNaN

Détermine si la valeur passé en argument est `NaN` ou non.

``` js
var n = parseInt("NOP");       // NaN
console.log(isNan(n));         // true
```

## isFinite

Détermine si la valeur passée en argument est un nombre fini.

``` js
var n = 100/0;                 // Infinity
console.log(isFinite(n));      // false
```

---

## encodeURI

Encode une chaîne de caractère pour être utilisée comme URL

``` js
encodeURI("http://www.google.com/results with spaces#some-anchor")
// http://www.google.com/results%20with%20spaces#some-anchor
```

## encodeURIComponent

Encode une chaîne de caractère pour être utilisée comme un paramètre d'URL

``` js
encodeURIComponent("http://www.google.com/results with spaces#some-anchor")
// http%3A%2F%2Fwww.google.com%2Fresults%20with%20spaces%23some-anchor
```

## decodeURI

Decode une URL

  ``` js
decodeURI("http://www.google.com/results%20with%20spaces#some-anchor")
// http://www.google.com/results with spaces#some-anchor
```

## decodeURIComponent

Décode un paramètre d'URL

``` js
decodeURIComponent("http%3A%2F%2Fwww.google.com%2Fresults%20with%20spaces%23some-anchor")
// http://www.google.com/results with spaces#some-anchor
```