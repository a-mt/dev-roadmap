---
title: Classes & objets
category: Web, Python
---

# Définition

* Le mot-clé `class` permet de déclarer une classe.  
  Par convention, le nom d'une classe commence par une majuscule

  ``` python
  class Test:
    pass

  obj = Test()
  ```

## Méthodes

* Une classe va ensuite déclarer des méthodes de classe.  
  Toute méthode de classe prend forcemment pour premier argument `self`, qui est un paramètre passé par l'intérpréteur, et réprésente l'objet en cours.

  ``` python
  class Test:
    def hello(self, name):
      print("Hello " + name)

  obj = Test()
  obj.hello("Bob") # Hello Bob
  getattr(obj, "hello")("Bob") # Hello Bob
  ```

* Lorsqu'on crée une instance, python lie toutes les fonctions que la classe contient à cet objet.  
  Et quand on appelle cette fonction, l'objet est passé en premier argument.  
  Ainsi appeler `obj.hello("Bob")` revient à appeler `Test.hello(obj, "bob")`

  ``` python
  print(obj.hello)
  <bound method Test.hello of <__main__.Test object at 0x7f344f9889a0>>
  ```

  Par convention, le premier argument d'une méthode est appelé `self`. On pourrait importer quel identificateur à la place, ce n'est pas un mot-clé ni une variable *built-in*.

  Ceci est à mettre en contraste avec le choix fait dans d'autres langages, comme par exemple en C++ où l'instance est référencée par le mot-clé `this`, qui n'est pas mentionné dans la signature de la méthode. En Python, selon le manifeste, *explicit is better than implicit*, c'est pourquoi on mentionne l'instance dans la signature, sous le nom `self`.

## Constructeur, attributs

* La méthode `__init__` est une méthode magique appelée à l'instanciation d'un objet — autrement dit, c'est le constructeur. Elle va par exemple permettre de définir des attributs sur l'objet:

  ``` python
  class Test:
    def __init__(self, name):
      self.name = name

    def hello(self):
      print("Hello " + self.name)

  obj = Test("Bob")
  print(obj.name)  # Bob
  obj.hello()      # Hello Bob
  ```

* Les attributs privés n'existent pas en Python (attributs accesssibles à l'intérieur de la classe mais pas à l'extérieur), mais par convention les attributs et méthodes censés être gardés privés sont préfixés d'un underscore (`_`).

## Debug

* La fonction `dir` retourne l'ensemble des méthodes et attributs d'un objet

  ``` python
  dir(obj)
  '''
  ['__class__',
   '__delattr__',
   '__dict__',
   '__dir__',
   '__doc__',
   '__eq__',
   '__format__',
   '__ge__',
   '__getattribute__',
   '__gt__',
   '__hash__',
   '__init__',
   '__init_subclass__',
   '__le__',
   '__lt__',
   '__module__',
   '__ne__',
   '__new__',
   '__reduce__',
   '__reduce_ex__',
   '__repr__',
   '__setattr__',
   '__sizeof__',
   '__str__',
   '__subclasshook__',
   '__weakref__',
   'hello',
   'name']
  '''
  ```

* L'attribut `__dict__` retourne l'ensemble des attributs de l'objet avec leurs valeurs

  ``` python
  print(obj.__dict__) # {'name': 'Bob'}
  print(vars(obj))    # {'name': 'Bob'}
  ```

* L'attribut `__class__.__name__` retourne le nom de la classe de l'objet

  ``` python
  print(obj.__class__.__name__) # Test
  ```

## Opérateurs

* <ins>Assign (=)</ins>  
  On peut modifier la valeur des attributs

  ``` python
  obj.name = "Alice"
  print(str(obj))    # Test: Alice
  ```

* <ins>Delete (del)</ins>  
  Le mot-clé `del` permet de supprimer des attributs ou des objets

  ``` python
  del obj.name
  print(str(obj))    # AttributeError: 'Test' object has no attribute 'name'
  ```

  ``` python
  del obj
  ```

## Documentation

Comme pour les fonctions, la documentation d'une classe et de ses méthodes doit être placée directement après la ligne d'instanciation. La méthode `help` permet d'afficher la documentation d'une classe.

``` python
class Point:
  """
  Classe pour représenter un point dans le plan
  """

  def __init__(self,x,y):
    """
    Creation d'un nouveau point de position (x,y)
    """
    self.x = x
    self.y = y

  def translate(self, dx, dy):
    """
    Ajoute (dx,dy) à (x,y)
    """
    self.x += dx
    self.y += dy

  def __str__(self):
    return "Point: [%f, %f]" % (self.x, self.y)

help(Point)
```

![](https://i.imgur.com/f6BN7Nb.png)

---

## Méthodes de classe

* Une méthode de classe peut accéder et modifier les attributs de classe. On crée une méthode de classe en ajoutant l'annotation `@classmethod` devant la ligne de spécification de la méthode. On déclare un attribut de classe en le mettant directement dans la classe.

  ``` python
  class Test:
      _instance = None

      def __init__(self):
          self.count = 0

      def add(self, k=1):
          self.count += k
          return self

      @classmethod
      def instance(cls):
          if cls._instance == None:
              cls._instance = cls()
          return cls._instance

  print(Test.instance().add(5).count) # 5
  print(Test.instance().add(5).count) # 10
  ```

* Une méthode statique n'a pas accès à la classe, elle n'a accès qu'aux paramètres qu'on lui donne. On crée un méthode statique avec `@staticmethod`

  ``` python
  class Test:
      @staticmethod
      def is_adult(age):
          return age > 18

  print(Test.is_adult(14)) # False
  ```

## Ajouter des méthodes à la volée

* Les méthodes sont implémentées comme des attributs de l’objet classe. On peut donc étendre l’objet classe lui-même dynamiquement:

  ``` python
  def sendmail(self, subject, body):
      "Envoie un mail à la personne"
      print(f"To: {self.email}")
      print(f"Subject: {subject}")
      print(f"Body: {body}")
      
  Personne.sendmail = sendmail
  ```

## Méthodes magiques

Les méthodes magiques permettent de surcharger les opérateurs appliqués sur les objets, ou plus généralement les mécanismes disponibles pour étendre le langage et donner un sens à des fragments de code comme:

  ```
  objet1 + objet2
  item in objet
  objet[key]
  objet.key
  for i in objet:
  if objet:
  objet(arg1, arg2)
  etc...
  ```

### Len

La méthode `__len__` est invoquée quand on utilise la fonction `len(obj)`

``` python
class Test:
    def __init__(self, mots):
      self.mots = mots

    def __len__(self):
      return len(self.mots)

obj = Test(["a", "b", "c"])
len(obj)  # 3
```

### Call

La méthode `__call__` est invoquée quand on utilise une instance de classe comme une fonction

``` python
class Test:
    def __init__(self, name):
      self.name = name

    def __call__(self):
      print("Hello " + self.name)

obj = Test("Bob")
obj() # Hello Bob
```

### Del

La méthode magique `__del__` est appelée quand toute les références vers l'objet ont été supprimées (l'objet va être libéré de la mémoire par le garbage collector).

``` python
class Test:
    def __init__(self):
        print('Constructor called')

    def __del__(self):
        print('Destructor called')

obj = Test() # Constructor called
del obj      # Destructor called
```

Si l'objet n'est jamais supprimé, le destructeur sera appelé après la fin du programme.

``` python
obj = Test()             # Constructor called
print('Program End...')  # Program End
                         # Destructor called
```

### Add & cie

Quand on utilise l'opérateur `+` sur un objet, la méthode magique `__add__` est invoquée.  
Cette méthode peut retourner n'importe quel type de donnée — une instance de classe, un entier, etc.

``` python
class Test:
    def __init__(self, n):
        self.n = n

    def __add__(self, obj):
        return Test(self.n + obj.n)

obj1 = Test(1)
obj2 = Test(2)
obj3 = obj1 + obj2

print(obj3.n) # 3
```

Il existe tout un tas de méthodes magiques permettant de surcharger le résultat des opérateurs mathématiques:

| Opérateur | Méthode magique
|---        |---
| `+`       | `__add__(self, other)`
| `-`       | `__sub__(self, other)`
| `*`       | `__mul__(self, other)`
| `/`       | `__truediv__(self, other)`
| `//`      | `__floordiv__(self, other)`
| `%`       | `__mod__(self, other)`
| `**`      | `__pow__(self, other)`
| |
| `-=`      | `__isub__(self, other)`
| `+=`      | `__iadd__(self, other)`
| `*=`      | `__imul__(self, other)`
| `/=`      | `__idiv__(self, other)`
| `//=`     | `__ifloordiv__(self, other)`
| `%=`      | `__imod__(self, other)`
| `**=`     | `__ipow__(self, other)`
| |
| `-` (unaire) | `__neg__(self)`
| `+` (unaire) | `__pos__(self)`
| `~` (unaire) | `__invert__(self)`
| |
| `<`       | `__lt__(self, other)`
| `>`       | `__gt__(self, other)`
| `<=`      | `__le__(self, other)`
| `>=`      | `__ge__(self, other)`
| `==`      | `__eq__(self, other)`
| `!=`      | `__ne__(self, other)`

### Hash

`__hash__` retourne la clé de hachage sur un objet.  
`__eq__` sert à évaluer p == q. Ces deux méthodes doivent être cohérentes: si deux objets sont égaux, il faut que leurs hashs soient égaux

``` python
class Point2(Point1):

    # l'égalité va se baser naturellement sur x et y
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    # du coup la fonction de hachage 
    # dépend aussi de x et de y
    def __hash__(self):
        return hash((self.x, self.y))
```

### Str, repr

* La méthode `__str__` est une méthode magique appellée lorsqu'on convertit un objet en chaîne de caractères.

  ``` python
  class Test:
    def __init__(self, name):
      self.name = name

    def __str__(self):
      return "Test: " + self.name

  obj = Test("Bob")
  print(str(obj))  # Test: Bob
  ```

* `__repr__` est voisine à `__str__`, elle retourne également une chaîne de caractère mais est utilisée par `repr`.  
  `__repr__` est utilisée **aussi** par `print` si `__str__` n'est pas définie.

  ``` python
  class Point:
      def __init__(self, x, y):
          self.x = x
          self.y = y

  class Point1(Point):
      def __repr__(self):
          return f"Pt[{self.x}, {self.y}]"

  class Point2(Point):
      def __str__(self):
          return f"Pt[{self.x}, {self.y}]"

  p1 = Point1(1, 2)
  print(repr(p1))  # Pt[1, 2]
  print(str(p1))   # Pt[1, 2]

  p2 = Point2(3, 4)
  print(repr(p2))  # <__main__.Point2 object at 0x7f4984a5e3d0>
  print(str(p2))   # Pt[3, 4]
  ```

### Enter, exit

* Les méthodes magiques `__enter__` et `__exit__` permettent d'implémenter des objets qui peuvent être utilisés avec le mot-clé `with`. On dit que l'objet implémente le protocole de *context manager*.

  * La méthode `__enter__` est invoquée au début du bloc `with`.  
    Elle peut retourner ou non une valeur, que l'on peut récupérer avec `as`.

  * La méthode `__exit__` est invoquée à la fin du bloc `with`, qu'une exception ait été levée ou non, et peut "manger" des exceptions.

  ``` python
  class Test:
      def __enter__(self):
          # retourne la valeur récupérée par "as"
          print("__enter__")
          return "Tout va bien"

      def __exit__(self, err_type, err_value, err_traceback):
          print("__exit__")

          # Ignorer les exceptions de type "Exception"
          return err_type == Exception

  with Test() as val:
      print(val)
      raise Exception("whatever")
      print("Inside, après raise")

  print("Outside")
  '''
  __enter__
  Tout va bien
  __exit__
  Outside
  '''
  ```

  ``` python
  import time

  class Timer:
    def __enter__(self):
      self.start = time.time()

    def __exit__(self, *args):
      duree = time.time() - self.start
      print(str(duree) + 's')
      return False

    def __str__(self):
      duree = time.time() - self.start
      print('intermediaire', str(duree) + 's')

  with Timer() as t:
    print(t)  # Appelle __str__

  # Appelle __exit__ à la sortie du "with"
  ```

* Un des exemple les plus connus de cas d'utilisation du bloc `with` est avec `open`, ce qui permet d'ouvrir un fichier en lecture et "manger" les exceptions de type FileNotFoundError.

  ``` python
  with open("x.txt") as f:
      data = f.read()
      print(data)
  ```

* On peut également implémenter un context manager en utilisant contextlib. Les deux exemples suivants sont équivalents:

  ``` python
  class CustomOpen(object):
      def __init__(self, filename):
          self.file = open(filename)

      def __enter__(self):
          return self.file

      def __exit__(self, ctx_type, ctx_value, ctx_traceback):
          self.file.close()

  with CustomOpen('file') as f:
      contents = f.read()
  ```

  ``` python
  from contextlib import contextmanager

  @contextmanager
  def custom_open(filename):
      f = open(filename)
      try:
          yield f
      finally:
          f.close()

  with custom_open('file') as f:
      contents = f.read()
  ```

### Contains

`__contains__` permet de donner un sens à `item in object`

``` python
class DualQueue:
    def __init__(self):
        self.inputs = []
        self.outputs = []

    def __repr__ (self):
        return f"<DualQueue, inputs={self.inputs}, outputs={self.outputs}>"

    # la partie qui nous intéresse ici
    def __contains__(self, item):
        return item in self.inputs or item in self.outputs
    
    def __len__(self):
        return len(self.inputs) + len(self.outputs)

    ...
```

### Getattr

\_\_setattr\_\_, \_\_getattr\_\_ et \_\_getattribute\_\_ permettent de contrôler l'accès et la modification de n'importe quel attribut

- getattribute: tous les accès à des attributs passerons par cette méthode, même si attr n'est pas défini dans obj.  

- setattr: sera appelé lorsqu'on modifie un attribut. Méthode symétrique à getattribute  

  ``` python
  class Temperature:
    def __get__(self, inst, instype):
      print('desc __get__')
      return inst._temperature

    def __set__(self, inst, t):
      print(f'desc __set__ {t}')
      inst._temperature = t

  class Maison:
    def __init__(self, t=0):
      self.temperature = t

    def __getattribute__(self, a):
      print(f'__getattribute__ {a}')
      return object.__getattribute__(self, a)

    def __setattr__(self, a, v):
      print(f'__setattr__ {a} = {v}')
      return object.__setattr__(self, a, v)

    temperature = Temperature()

  obj = Maison()
  # __setattr__ temperature = 0
  # desc __set__ 0
  # __setattr__ _temperature = 0

  print(obj.temperature)
  # __getattribute__ temperature
  # desc __get__
  # __getattribute__ _temperature
  # 0

  obj.temperature = 2
  # __setattr__ temperature = 2
  # desc __set__ 2
  # __setattr__ _temperature = 2

  obj.nope = 3
  # __setattr__ nope = 3
  ```

- getattr: si getattribute n'est pas implémenté et si l'attribut auquel on essaie d'accéder n'existe pas, getattr est appelé en dernier ressort

``` python
class RPCProxy:
    
    def __init__(self, url, login, password):
        self.url = url
        self.login = login
        self.password = password
        
    def __getattr__(self, function):
        """
        Crée à la volée une méthode sur RPCProxy qui correspond
        à la fonction distante 'function'
        """
        def forwarder(*args):
            print(f"Envoi à {self.url}...")
            print(f"de la fonction {function} -- args= {args}")
            return "retour de la fonction " + function
        return forwarder
```

---

## Héritage

* On définit le parent d'une classe entres parenthèses:

  ``` python
  # Parent
  class Animal:
    def describe(self):
      print("I'm a " + self.__class__.__name__)

  # Enfant
  class Bird(Animal):
    pass

  obj = Bird()
  obj.describe() # I'm a Bird
  ```

* L'enfant peut ajouter et redéfinir les méthodes du parent. Pour appeler une méthode parente, on utilise `super`

  ``` python
  # Parent
  class Person:
    def __init__(self, fname, lname):
      self.firstname = fname
      self.lastname = lname

    def printname(self):
      print(self.firstname, self.lastname)

  # Enfant
  class Student(Person):
    def __init__(self, fname, lname):
      super().__init__(fname, lname)
      self.graduationyear = 2019
  ```

* Python supporte l'héritage multiple

  ``` python
  class Base1(object):
      def __init__(self):
          self.str1 = "#1"

  class Base2(object):
      def __init__(self):
          self.str2 = "#2"

  class Derived(Base1, Base2):
      def __init__(self): 
          Base1.__init__(self)
          Base2.__init__(self)

      def printStrs(self):
          print(self.str1, self.str2)

  obj = Derived()
  obj.printStrs() # #1 #2
  ```

* Si un même attribut est définit sur plusieurs classes:  
  l'ordre de résolution des attributs dépend de l'ordre dans lequel les super-classes ont été définies.  
  On va parcourir les classes de bas en haut et de gauche à droite: (D, B, A, object) + (D, C, A, object),  
  et si des classes sont dupliquées, en enlève toutes les classes dupliquées sauf la dernière: D, B, C, A, object

  ![](https://i.imgur.com/6tU2JUfm.png)

## Mangling

* Tout attribut ou méthode commençant par un double underscore (`__`) est remplacé par `_classname__varname` lorsqu'on est à l'extérieur de la classe:

  ``` python
  class Test:
      def __init__(self):
          self.__var = 1

      def printname(self):
          print(self.__var)

  obj = Test()
  obj.printname()       # 1
  print(obj._Test__var) # 1
  print(obj.__var)      # AttributeError: 'Test' object has no attribute '__var'
  ```

* Cette syntaxe est utile pour éviter qu'une classe parente appelle un attribut ou une méthode redéfini(e) par une classe enfant:

  ``` python
  class Person:
      def __init__(self, fname, lname):
        self.firstname = fname
        self.lastname  = lname

      def printname(self):
        print(self.format())

      def format(self):
          return "{fname:s} {lname:s}".format(
              fname=self.firstname,
              lname=self.lastname)

  class Student(Person):
      def __init__(self, fname, lname):
        super().__init__(fname, lname)
        self.graduationyear = 2020

      def printgradname(self):
        print(self.format())

      def format(self):
          return "{year:d}: {fname:s} {lname:s}".format(
              year=self.graduationyear,
              fname=self.firstname,
              lname=self.lastname)

  student = Student("Bob", "Barker")
  student.printname()     # 2020: Bob Barker
  student.printgradname() # 2020: Bob Barker

  # Person.printname a appelé la méthode Student.format
  ```

  ``` python
  class Person:
      def __init__(self, fname, lname):
        self.firstname = fname
        self.lastname = lname

      def printname(self):
        print(self.__format())

      def __format(self):
          return "{fname:s} {lname:s}".format(
              fname=self.firstname,
              lname=self.lastname)

  # Enfant
  class Student(Person):
      def __init__(self, fname, lname):
        super().__init__(fname, lname)
        self.graduationyear = 2020

      def printgradname(self):
        print(self.__format())

      def __format(self):
          return "{year:d}: {fname:s} {lname:s}".format(
              year=self.graduationyear,
              fname=self.firstname,
              lname=self.lastname)

  student = Student("Bob", "Barker")
  student.printname()     # Bob Barker
  student.printgradname() # 2020: Bob Barker

  # Person.printname a appelé la méthode Person._Person__format
  ```

## Getter et setter

* On peut contrôler l'accès à une propriété en définissant un getter et setter. Pour ce faire, on a deux possibilités:

  * utiliser la fonction `property`

    ``` python
    class P:
        def __init__(self, x):
            self.__set_x(x)

        def __get_x(self):
            return self.__x

        def __set_x(self, x):
            if x < 0:
                self.__x = 0
            elif x > 1000:
                self.__x = 1000
            else:
                self.__x = x

        x = property(__get_x, __set_x)
    ```

  * utiliser un décorateur (recommandé):

    ``` python
    class P:
        def __init__(self, x):
            self.x = x

        @property
        def x(self):
            return self.__x

        @x.setter
        def x(self, val):
            if x < 0:
                self.__x = 0
            elif x > 1000:
                self.__x = 1000
            else:
                self.__x = x
    ```

  * utiliser un descripteur: une version plus générale du getter et setter, qui passe par une classe implémentant les méthode \_\_get\_\_ et \_\_set\_\_

    ``` python
    class Temperature:
      def __get__(self, inst, instype):
        return inst.temperature

      def __set__(self, inst, t):
        if 5 < t < 25:
          inst._temperature = t
          return
        raise TemperatureError()

    class TemperatureError(Exception):
      pass

    class Maison:
      def __init__(self, t):
        self.temperature  =t

      temperature = Temperature
    ```

## Vérifier une instance de classe

``` python
class Base(object):  pass
class Derived(Base): pass

# Vérifier une classe
print(issubclass(Derived, Base)) # True

# Lister les superclasses
print(Derived.__bases__)  # (<class '__main__.Base'>,)
print(Base.__bases__)     # (<class 'object'>,)

# Vérifier une instance de classe
objDerived = Derived() 
print(isinstance(objDerived, Derived)) # True
print(isinstance(objDerived, Base))    # True
```

## Metaclass

* `object` est la super classe de toutes les classes.  
  object est instancié par `type`

  ```
  >>> type(object)
  type
  >>> type.__bases__
  (object,)
  ```

* Une metaclasse fonctionne comme un template pour la création de classes, on les appelle parfois des *class factories*. Pour déclarer une métaclasse, on crée une classe qui hérite de `type`

  Ça permet d'ajouter une couche de logique au processus de création des autres classes: modifier l'arbre d'héritage et espace de nommage (bases) de la classe, ajouter la validation d'argumments, création de propriétés ou descripteurs automatiques

  ``` python
  class Meta(type):
     def __new__(cls, name, bases, dict):
      """
      Crée la classe
      """
      x = super().__new__(cls, name, bases, dct)
      x.attr = 100
      return x

  class Foo(metaclass=Meta):
       pass

  Foo.attr
  100
  ```

  ```
  cls = type.__new__(type, name, bases, dict)
  type.__init__(cls, name, bases, dict)
  ```

* L'avantage de la metaclasse, c'est qu'on peut vérifier les attributs qui ont été définis sur la classe et agir en fonction

  ``` python
  class GenericForeignKey(FieldCacheMixin):
      def contribute_to_class(self, cls, name, **kwargs):
          self.name = name
          self.model = cls
          cls._meta.add_field(self, private=True)
          setattr(cls, name, self)

  def _has_contribute_to_class(value):
      # Only call contribute_to_class() if it's bound.
      return not inspect.isclass(value) and hasattr(value, 'contribute_to_class')

  class ModelBase(type):
      """Metaclass for all models."""

      def __new__(cls, name, bases, attrs, **kwargs):
          super_new = super().__new__

          # Also ensure initialization is only performed for subclasses of Model
          # (excluding Model class itself).
          parents = [b for b in bases if isinstance(b, ModelBase)]
          if not parents:
              return super_new(cls, name, bases, attrs)

          # Separate attrs into new_attrs & contributable_attrs
          attr_meta = attrs.pop('Meta', None)
          module = attrs.pop('__module__')

          new_attrs = {
            '__module__': module,
          }
          if (classcell := attrs.pop('__classcell__', None)) is not None:
              new_attrs['__classcell__'] = classcell

          contributable_attrs = {}
          for obj_name, obj in attrs.items():
              if _has_contribute_to_class(obj):
                  contributable_attrs[obj_name] = obj
              else:
                  new_attrs[obj_name] = obj

          # Create the class.
          # Give all attrs without a (Django-specific) contribute_to_class()
          # method to type.__new__() so that they're properly initialized
          new_class = super_new(cls, name, bases, new_attrs, **kwargs)
          meta = attr_meta or getattr(new_class, 'Meta', None)

          # Look for an application configuration to attach the model to.
          app_label = None
          app_config = apps.get_containing_app_config(module)

          if getattr(meta, 'app_label', None) is None:
              if app_config is None:
                    raise RuntimeError(
                        "Model class %s.%s doesn't declare an explicit "
                        "app_label and isn't in an application in "
                        "INSTALLED_APPS." % (module, name)
                    )
              else:
                  app_label = app_config.label

          # Add _meta on class
          base_meta = getattr(new_class, '_meta', None)
          new_class.add_to_class('_meta', Options(meta, app_label))

          # Add remaining attributes (those with a contribute_to_class() method)
          # to the class.
          for obj_name, obj in contributable_attrs.items():
              new_class.add_to_class(obj_name, obj)

      def add_to_class(cls, name, value):
          if _has_contribute_to_class(value):
              value.contribute_to_class(cls, name)
          else:
              setattr(cls, name, value)

  class Model(metaclass=ModelBase):
      pass
  ```

* Le même effet peut parfois être obtenu soit via

  - l'héritage simple

    ``` python
    class Base:
       attr = 100

    class X(Base):
       pass

    X.attr
    100
    ```

  - un décorateur de classe

    ``` python
    def decorator(cls):
       class NewClass(cls):
           attr = 100
       return NewClass

    @decorator
    class X:
       pass

    X.attr
    100
    ```
