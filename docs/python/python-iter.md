---
title: Itérateur
category: Web, Python
---

## Itérables

* Un itérable est un objet qu'on peut parcourir de multiples fois. On peut utiliser la fonction `for` dessus.  
  Tous les objets builtins sont itérables, à l'exception des types numériques — donc les chaînes de caractères, listes, tuples, dictionnaires et sets sont itérables.  
  Pour obtenir ce même comportement avec un objet, il faut implémenter les méthodes magiques `__iter__` et `__next__`

  ``` python
  class MyRange:
      def __init__(self, _from, _to=None, _step=1):
          if _to==None:
              self._to   = _from
              self._from = 0 
          else:
              self._from = _from
              self._to   = _to

          self._step = _step if _step != 0 else 1

      def __iter__(self):
          self.i = self._from
          return self

      def __next__(self):
          if self._step > 0:
              if self.i >= self._to: raise StopIteration
          elif self.i <= self._to:
              raise StopIteration

          i = self.i
          self.i += self._step
          return i

  obj = MyRange(5)

  for i in obj:
      print(i)
  # 0 1 2 3 4

  for i in obj:
      print(i)
  # 0 1 2 3 4
  ```

  ``` python
  # Iterable
  class Phrase:
    def __init__(self, ma_phrase):
      self.ma_phrase = ma_phrase
      self.words = ma_phrase.split()

     def __iter__(self):
       return IterPhrase(self.mots)

  # Iterateur
  class IterPhrase:
    def __init__(self, mots):
      self.mots = mots[:]

    def __iter__(self):
      return self

    def __next__(self):
      if not self.mots:
        raise StopIteration

      return self.mots.pop(0)
  ```

  ``` python
  class Phrase:
    def __int__(self, ma_phrase):
      self.ma_phrase = ma_phrase
      self.words = ma_phrase.split()

     def __iter__(self):
       for m in self.words:
          yield m
  ```

## Itérateur

* La boucle `for` récupère un itérateur pour parcourir les éléments d'un itérable.  
  Créer un itérateur est très peu coûteux puisque ce n'est qu'au moment de parcourir l'itérateur que les éléments sont évalués

  On peut récupérer directement un itérateur d'un itérable avec la fonction `iter` et récupérer le prochain élément de l'itérateur avec la fonction `next`.
  Un itérateur ne peut être parcouru qu'une seule fois. Lorsque tous les éléments ont été parcouru, une exception StopIteration est levée

  ``` python
  l  = [1,2,3]
  it = iter(l)

  it  # <list_iterator object at 0x7fabaf0149a0>
  print(next(it))  # 1
  print(next(it))  # 2
  print(next(it))  # 3
  print(next(it))  # StopIteration error
  ```
  ``` python
  obj = MyRange(1,4)
  it  = iter(obj)

  print(next(it))  # 1
  print(next(it))  # 2
  print(next(it))  # 3
  print(next(it))  # StopIteration error
  ```

## Itertools

* `chain` permet de concaténer plusieurs itérables sous la forme d'un itérateur

  ``` python
  for x in itertools.chain((1, 2), [3, 4]):
      print(x)
  ```

* `islice` fournit un itérateur sur un slice d’un itérable

  ``` python
  for x in itertools.islice(support, 3, 8):
      print(x)
  ```

## Fonction génératrice aka générateur

* Là où une compréhension de liste crée une liste temporaire, l'appel d'une fonction génératrice crée un objet générateur qui est un itérateur. Elle permet donc d'économiser de la mémoire — mais ne peut être parcourue qu'une seule fois

  ``` python
  carre = [x**2 for x in range(1000)]
  type(carre)  # <class 'list'>
  sum(carre)   # 332833500
  sum(carre)   # 332833500

  carre = (x**2 for x in range(1000))
  type(carre)  # class 'generator'>
  sum(carre)   # 332833500
  sum(carre)   # 0
  ```
  ``` python
  palin = (x for x in carre if str(x) == str(x)[::-1])
  list(palin)
  ```

* Pour vérifier si un objet est un itérateur:
  ``` python
  generator is iter(generator)
  ```

## yield: retourner un générateur

* Plutôt que de retourner une valeur (avec `return`), une fonction peut retourner un générateur.  
  Dès qu'une fonction contient le mot-clé `yield`, alors la fonction retourne un générateur et le prochain élément de l'itérateur est le prochain `yield` (ou `return`, qui aura pour effet de stopper l'itération)

  ``` python
  # return: retourne une valeur
  # Le code après return ne sera jamais évalué
  def f1():
    print("Before")
    return "a"

    print("After")
    return "b"

  res = f1() # Before
  print(res) # a
  ```

  ``` python
  # yield: retourne un générateur
  # Le code est évalué au fur et à mesure des appels à next()
  def f2():
    print("Before")
    yield "a"

    print("After")
    yield "b"

  res = f1()
  print(res) # <generator object f at 0x7f2428e79b10>
  print(next(res)) # Before a
  print(next(res)) # After b
  ````

* Le `yield` peut également récupérer un argument

  ``` python
  def sayHello():
      name = yield "What is your name ?";
      yield "Hello " + name;

      color = yield "What is your favorite color ?";
      yield "Well it don't like it";

  it = sayHello()
  print(next(it))         # What is your name ?
  print(it.send("Bob"));  # Hello Bob

  print(next(it));        # What is your favorite color ?
  print(it.send("black")) # Well it don't like it
  ```

* Et le générateur peut appeler un autre générateur (ce qui revient à concaténer un itérateur) avec `yield from`

  ``` python
  def switchboard():
      while True:
          choice = yield "1 for PL, 2 for support, 3 to exit"
          if choice == 1:
              yield from pig_latin_translator()
          elif choice == 2:
              yield from bad_service_chatbot()
          elif choice == 3:
              return
          else:
              print('Bad choice; try again')
  ```
