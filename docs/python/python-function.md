---
title: Fonctions
category: Web, Python
---

{% raw %}

## Déclarer une fonction

* On déclare une fonction avec la fonction `def`.  
  Par convention, les noms de fonction suivent le *snake case* (underscore_between_words)

  Si aucune valeur n'est retournée explicitement, la fonction retourne `None` 

  ``` python
  def hello(name):
    return "Hello " + name

  print(hello("Bob"))
  ```

## Scope

* La fonction a accès aux variables globales:

  ``` python
  def hello():
      print(myvar) # 2

  myvar = 2
  hello()
  ```

  Mais les variables d'une fonction sont locales à cette fonction:

  ``` python
  def hello():
    myvar2 = 2
    print("Hello World")

  hello()
  print(myvar2) # NameError: name 'myvar' is not defined
  ```

* Une fonction peut déclarer/modifier une variable de portée globale grâce au mot-clé `global`

  ``` python
  def hello():
      global x
      x = 1

  hello()
  print(x) # 1
  ```

## Closure

* Les variables locales sont accessibles aux sous-fonctions définies à l'intérieur de la fonction

  ``` python
  def myfunc():
      x = 300

      def myinnerfunc():
          print(x) # 300
      myinnerfunc()

  myfunc()
  ```

  Par contre, si on assigne une variable du même nom dans une sous-fonction, l'interpréteur considère qu'il s'agit d'une variable différente

  ``` python
  def myfunc():
      x = 300

      def myinnerfunc():
          x = 200
          print(x) # 200

      myinnerfunc()
      print(x) # 300

  myfunc()
  ```

  ``` python
  def myfunc():
      x = 300

      def myinnerfunc():
          print(x) # # UnboundLocalError: local variable 'x' referenced before assignment
          x = 200
          print(x)

      myinnerfunc()

  myfunc()
  ```

* Une sous-fonction peut modifier (et non déclarer) une variable de la fonction parente grâce au mot-clé `nonlocal`

  ``` python
  def myfunc():
      x = 300

      def myinnerfunc():
          nonlocal x
          print(x) # 300
          x = 200
          print(x) # 200

      myinnerfunc()
      print(x) # 200

  myfunc()
  ```

* Techniquement, une variable est dite *libre* si elle n'est ni locale ni globale, donc contenue dans une fonction englobante.  
  Une fonction qui référence des variables libres est appelée une *closure* (clotûre en français)

  ``` python
  def plus_n(y):
    def incremente(x):
      return x + y
    return incremente

  plus3 = plus_n(3)
  plus3(10)
  ```

  Pour récupérer un tuple des variables libres:

  ``` python
  plus3.__closure__
  plus3.__closure__[0].cell_contents  # 3
  ```

## Pointeur

* Tous les paramètres non scalaires sont passés par référence. La référence est perdue si on assigne la variable à une autre valeur

  ``` python
  def f(x):
      x += 1

  x = 1
  f(x)
  print(x) # 1
  ```

  ``` python
  def f(x):
      x += [4]

  x = [1,2,3]
  f(x)
  print(x) # [1,2,3,4]
  ```

  ``` python
  def f(x):
      x = [4]

  x = [1,2,3]
  f(x)
  print(x) # [1,2,3]
  ```

* Pour éviter ce genre de problème, il faut faire une copie.

  ``` python
  def f(x):
      x = x.copy()
      x += [4]

  x = [1,2,3]
  f(x)
  print(x) # [1,2,3]
  ```

* Il n'est pas possible de passer une valeur scalaire par référence.


## Valeur par défaut

* Il est possible de donner des valeurs par défaut aux paramètres d'une fonction.  
  Si la fonction est appelée sans le paramètre, la valeur par défaut du paramètre est attribuée — s'i n'en a pas alors une erreur est levée.

  ``` python
  def sum(n1=10, n2=20, n3=30):
      return n1+n2+n3

  print(sum(0)) # 50
  ```

## Paramètres nommés

* Les paramètres d'une fonction peuvent être passés dans le désordre si on les nomme.  
  On peut ainsi écraser la valeur par défaut d'un paramètre sans avoir à redéfinir tous les paramètres qui le précèdent.

  ``` python
  def sum(n1=10, n2=20, n3=30):
      return n1+n2+n3

  print(sum(n3=0)) # 30
  ```

## Retourner plusieurs valeurs

Pour retourner plusieurs valeurs, on retourne un tuple — une liste de valeurs séparées par des virgules.

``` python
def f():
    return "hello", "world"

s1, s2 = res = f()

print(res)            # ('hello', 'world')
print(res[0], res[1]) # hello world
print(s1, s2)         # hell world
```

Le underscore est utilisé pour ignorer des valeurs:

``` python
def f():
    return 1,2,3,4,5

a, _, c, _, e = f()
print(a, c, e) # 1 3 5
```

## Prendre un nombre indéfini d'arguments

* Déclarer un paramètre avec un astérisque `*` (splat) aura pour effet de récupérer la liste des arguments passés à la fonction sous forme de tuple.

  ``` python
  def sum(*args):
      c = 0
      for i in args:
          c += i
      return c

  print(sum(1,2,3)) # 6
  ```

  À l'inverse, passer un tuple précédé d'un astéristique à la fonction  aura pour effet d'éclater le tuple en arguments:

  ``` python
  def sum(a,b,c):
    return a+b+c

  t = (1,2,3)
  print(sum(*t)) # 6
  ```

* Déclarer un paramètre avec un double-astérisque `**` (splatty-splat) aura pour effet de récupérer les paramètres nommés sous forme de dictionnaire.

  ``` python
  def exemple(*args, **kwargs):
      print("Paramètres non nommés: ", args)
      print("Paramètres nommés: ", kwargs)

  exemple("hello", name="Bob")
  '''
  Paramètres non nommés:  ('hello',)
  Paramètres nommés:  {'name': 'Bob'}
  '''
  ```

  À l'inverse, passer un dictionnaire précédé d'un double-astérisque à la fonction aura pour effet d'éclater le dictionnaire en arguments nommés:

  ``` python
  def f(a,b,c):
      return a*100 + b*10 + c

  opts = {"c": 1, "b": 2, "a": 3}
  print(f(**opts)) # 321
  ```

* Autres utilisations de `*`

  ``` python
  [*[1,2,3], *[4]]                # [1, 2, 3, 4]
  {*[1,2,3], *[4]}                # {1, 2, 3, 4}
  (*[1,2,3], *[4])                # (1, 2, 3, 4)
  {**{'a': 1, 'b': 2}, **{'c': 3}}# {'a': 1, 'b': 2, 'c': 3}
  ```
  ``` python
  head, *body, tail = [1,2,3,4,5]
  ```

## Documentation

* Par convention, la documentation d'une fonction est écrite avec des commentaires sous la ligne de spécification de la fonction.

  ``` python
  def f(s):
      """
      Affichage d'une chaîne et de sa longueur
      """
      print("%s est de longeur %d" % (s, len(s)))
  ```

* La commande `help` permet d'afficher la documentation d'une fonction.

  ```
  help(f)
  ```

  ![](https://i.imgur.com/vPonwwD.png)

## Lambda

* Une fonction lambda est une fonction anonyme qui tient sur une seule ligne. Elles sont généralement passées comme argument pour être utilisées comme callback.

  ``` python
  hello = lambda: "Hello"
  print(hello()) # Hello
  ```

  ``` python
  sqr = lambda a: a*a
  print(sqr(3)) # 9
  ```

  ``` python
  f = lambda x,y: 5*x+3*y
  print(f(2,4)) # 22
  ```

  ``` python
  l1 = [1,2,3,4,5]
  l2 = map(lambda a: a*a, l1)
  print(list(l2)) # [1, 4, 9, 16, 25]
  ```

## input()

La fonction `input()` permet de récupérer une valeur entrée interractivement par l'utilisateur. Le script est temporairement interrompu jusqu'à ce que l'utilisateur soumettre une valeur (avec la touche Entrée).

``` python
text = input("Enter a value [default]:") or "default"
print("Your value is:", text)
```

![](https://i.imgur.com/WaG6e5h.png)  
![](https://i.imgur.com/0wAPumF.png)

## Décorateurs

* Un décorateur est une fonction qui prend pour seul argument une fonction, peut y ajoute des fonctionnalités, et retourne une fonction. Les décorateurs sont notamment utilisés pour ajouter des logs ou du cache sur une fonction.

  ``` python
  from datetime import datetime

  # Décorateur qui affiche le temps avant d'appeler la fonction
  def time_decorator(f):
    def wrapper(*args, **kwargs):
        print('[' + datetime.now().strftime("%H:%M:%S") + '] ', end='')
        f(*args, **kwargs)
    return wrapper

  # Fonction normale
  def hello(name):
    print("Hello " + name)

  # Fonction avec décorateur
  hello_decorated = time_decorator(hello)

  # Appelle la fonction décorée
  hello_decorated('Bob') # [10:32:01] Hello Bob
  ```

* On peut appliquer directement un décorateur à une fonction en ajoutant l'annotation `@nom_decorateur` devant la ligne de spécification de la fonction:

  ``` python
  from datetime import datetime

  # Décorateur qui affiche le temps avant d'appeler la fonction
  def time_decorator(f):
    def wrapper(*args, **kwargs):
        print('[' + datetime.now().strftime("%H:%M:%S") + '] ', end='')
        f(*args, **kwargs)
    return wrapper

  # Fonction avec décorateur
  # hello n'est plus la fonction, mais l'objet retourné par time_decorator(hello)
  @time_decorator
  def hello(name):
    print("Hello " + name)

  # Appelle la fonction décorée
  hello('Bob') # [10:32:01] Hello Bob
  ```

* On peut passer des arguments au décorateur comme suit:

  ``` python
  def limit(length):
      def decorator(f):
          def wrapper(*args , **kwargs):
            result = f(*args , **kwargs)
            return result[:length]
          return wrapper
      return decorator

  @limit(3)
  def data3():
      return "limit to 3"

  print(data3()) # lim
  ```

* n peut appliquer plusieurs décorateurs:

  ``` python
  @chatty
  @limit(2)
  def greet ():
      return "Greetings"

  greet()
  # revient à chatty(limit(2)(greet))
  ```

## Propriétés d'un décorateur

* On peut créer un décorateur avec une classe, si cette classe est un callable (implémente \_\_call\_\_):

  ``` python
  class NbAppels:
      def __init__(self, f):
          self.appels = 0
          self.f = f

      def __call__(self, *t, **d):
          self.appels += 1
          s = f"{self.f.__name__} : {self.appels}"
          print(s)
          return self.f(*t, **d)

  @NbAppels
  def f(a, b):
      print(a, b)
  ```

* Une autre alternative est de déclarer un attribut sur la fonction retournée:

  ``` python
  def trace_call(f):
    def wrapper(*args, **kwargs):
      wrapper.called = wrapper.called + 1

      print(f'{wrapper.called} appels de {f.__name__}')
      return f(*args, **kwargs)

    wrapper.called = 0
    return wrapper
  ```

## functools.wrap

* Le décorateur `wrap` du module functools permet de recopier les métadonnées de la fonction décorée (le nom de la fonction et sa description)

  ``` python
  from functools import wraps

  def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        f(*args, **kwargs)
    return wrapper

  @my_decorator
  def hello(name):
    print("Hello " + name)

  # La documentation est bien préservée
  print(hello.__name__) # hello
  print(hello.__doc__)  # This function...

  help(hello)
  '''
  hello(name)
      This function says hello
      :param string name
  '''
  ```

## functools.partial

* `partial` permet de définir une fonction (ou classe) à partir d'une autre en lui spécifiant des paramètres — avant l'appel ou l'instanciation

  ``` python
  client_class = functools.partial(APIClient, enforce_csrf_checks=True)
  ```
  ``` python
  # Convert to string, left-align, and truncate at max_colwidth - 1
  max_colwidth = 60

  form = "{{!s:<{}}}".format(max_colwidth - 1)

  formatter = functools.partial(str.format, form)
  ```

## Type hinting

Depuis Python 3.5, il est possible d'indiquer le type de données attendu et retourné par une fonction. Notons que ces indications n'ont aucune incidances sur l'exécution du code — l'interpréteur ne va pas lever d'erreur si le type de donnée d'une valeur ne correspond pas à celui attendu par la fonction. Elles ne sont là que pour rendre le code plus facile à comprendre.

``` python
def addTwo(x : int) -> int:
    return x + 2

addTwo(2)
```

On peut également créer ses propres types:

``` python
from typing import List

Vector = List[float]
Matrix = List[Vector]

def addMatrix(a : Matrix, b : Matrix) -> Matrix:
    result = []
    for i,row in enumerate(a):
        result_row =[]
        for j, col in enumerate(row):
            result_row += [a[i][j] + b[i][j]]
        result += [result_row]
    return result

x = [[1.0, 0.0], [0.0, 1.0]]
y = [[2.0, 1.0], [0.0, -2.0]]
z = addMatrix(x, y)
```

## Builtins

Le module builtins contient une référence de toutes les fonctions natives python. Ainsi, après avoir écrasé une fonction il est toujours possible de récupérer l'originale

``` python
>>> print(1)
1
>>> print = 10
>>> print(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not callable
```
``` python
>>> import builtins
>>> print = builtins.print
>>> print(1)
1
```

{% endraw %}