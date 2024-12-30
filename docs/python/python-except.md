---
title: Exceptions
category: Web, Python
---

## Raise

* `raise` permet de lancer une exception

  ``` python
  raise Exception("404")
  ```

* On peut créer une exception perso en créant une nouvelle classe qui hérite d'`Exception`

  ``` python
  class MyError(Exception):
      def __init__(self, value):
          self.value = value

      def __str__(self):
          return str(self.value)

  try:
      raise(MyError(3*2))
  except MyError as e:
      print('A New Exception occured: ',e.value)
  ```

## Try..except

* `try` délimite un bloc à l'intérieur duquel toutes les exceptions lancées seront attrapées.  
  `except` permet de gérer les exceptions d'un type donné.

  ``` python
  try:
    print(x)
  except NameError:
    print("Variable x is not defined")
  except:
    print("Something else went wrong") 
  ```

  ``` python
  try:
    result = numerator / divisor
  except (TypeError, ZeroDivisionError):
    result = None
  ```

  `except` permet de récupérer l'erreur via `as`:

  ``` python
  try:
  	raise Exception("404")
  	print("Tout va bien")
  except Exception as e:
  	print("Une erreur a été levée : %s" % e)
  ```

* On peut également définir une clause `finally`, qui sera exécutée qu'une excetion ait été levée ou non

  ``` python
  try:
    print(x)
  except:
    print("Something went wrong")
  finally:
    print("The 'try except' is finished") 
  ```

* Ou une clause `else`, qui sera exécutée si aucune exception n'a été levée

  ``` python
  try:
    print("Hello")
  except:
    print("Something went wrong")
  else:
    print("Nothing went wrong") 
  ```

## Assert

Plutôt qu'utiliser `raise`, on peut également utiliser l'instruction `assert` pour lancer une exception AssertionError  si une condition donnée est fausse.

``` python
try:
    assert 1 == 2
except AssertionError as e:
    print('Err:', e)

# Err: 
```

``` python
try:
    assert 1 == 2, "1 est différent de 2"
except AssertionError as e:
    print('Err:', e)

# Err: 1 est différent de 2
```

## Classes

Les exceptions natives de Python sont les suivantes:

``` txt
BaseException
    SystemExit
    KeyboardInterrupt
    GeneratorExit
    Exception
        StopIteration
        ArithmeticError
            FloatingPointError
            OverflowError
            ZeroDivisionError
        AssertionError
        AttributeError
        BufferError
        EnvironmentError
            IOError
            OSError
        EOFError
        ImportError
        LookupError
            IndexError
            KeyError
        MemoryError
        NameError
            UnboundLocalError
        ReferenceError
        RuntimeError
            NotImplementedError
        SyntaxError
            IndentationError
            TabError
        SystemError
        TypeError
        ValueError
            UnicodeError
                UnicodeDecodeError
                UnicodeEncodeError
                UnicodeTranslateError
        Warning
            DeprecationWarning
            PendingDeprecationWarning
            RuntimeWarning
            SyntaxWarning
            UserWarning
            FutureWarning
            ImportWarning
            UnicodeWarning
            BytesWarning
```

[Built-in Exceptions in Python](https://www.geeksforgeeks.org/built-exceptions-python/)

## Créer une classes personnalisée

* Créer une classe qui hérite d'Exception

  ``` python
  class Phrase:
    def __init__(self, ma_phrase):
      if not ma_phrase:
        raise PhraseVideError('phrase vide', 18)

      self.ma_phrase = ma_phrase
      self.mots = ma_phrase.split()

  class PhraseVideError(Exception):
    pass

  try:
    Phrase('')
  except PhraseVideError as e:
    print(e.args)
  ```
