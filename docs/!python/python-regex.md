---
title: Regex
category: Web, Python
---

Pour utiliser des regex en Python, on utilise le package `re`

``` python
import re
```

## Search

* `search` retourne le premier match trouvé suivit des groupes capturants (ou None)  
  `\1` est une back-reference vers le groupe capturant 1

  ``` python
  match = re.search("\+(\w+)", "+Hello +World")
  print(match)    # <re.Match object; span=(0, 6), match='+Hello'>
  print(match[0]) # +Hello
  print(match[1]) # Hello

  match = re.search("\+(\w+)", "Hello World")
  print(match)    # None

  match = re.search(r'[ _](\d{2}(-?)\d{2}\2\d{4})\.' + fr'{filetype}$', filename, re.IGNORECASE)
  ```

* Il est possible de passer des [flag](https://docs.python.org/3/library/re.html#re.A), en 3ème paramètre

  ``` python
  match = re.search("^\+([a-z]+)", "Hello World\n+Hello Bob", re.I | re.MULTILINE)
  print(match) # <re.Match object; span=(12, 18), match='+Hello'>
  ```

* On peut récupérer l'index des match trouvés avec `span`, `start` et `end`

  ``` python
  match = re.search("(\w+)@(\w+).(\w+)", ">> bob@domain.com <<")
  print(match.groups()) # ('bob', 'domain', 'com')

  print(match[0])       # 'bob@domain.com'
  print(match[1])       # 'bob'
  print(match[2])       # 'domain'
  print(match[3])       # 'com'

  print(match.span(0))  # (3, 17) = (start, end) du match entier
  print(match.span(1))  # (3, 6)  = (start, end) du groupe 1
  print(match.span(2))  # (7, 13)
  print(match.span(3))  # (14, 17)

  print(match.start(3)) # 14
  print(match.end(3))   # 17
  ```

## Match, fullmatch

* `match` fait à peu près la même chose mais ne teste que le début de la chaîne  
  (ce qui revient au même comportement que search avec `^`, sauf en cas de multi-ligne).

  ``` python
  print(re.search("c", "abcde"))  # <re.Match object; span=(2, 3), match='c'>
  print(re.search("^c", "abcde")) # None
  print(re.match("c", "abcde"))   # None

  print(re.search("\w", "--\nabcde", re.MULTILINE)) # <re.Match object; span=(3, 4), match='a'>
  print(re.match("\w", "--\nabcde", re.MULTILINE))  # None
  ```

* `fullmatch` teste que l'intégralité de la chaîne correspond  au motif  
  (ce qui revient au même comportement que search avec `^..$`, sauf en cas de multi-ligne)

  ``` python
  print(re.match("\w+", "Hello!"))     # <re.Match object; span=(0, 5), match='Hello'>
  print(re.fullmatch("\w+", "Hello!")) # None
  ```

## Findall, finditer

* `findall` retourne tous les matchs.  
  Si des groupes capturants sont présents dans la regex, la valeur retournée sera le contenu du groupe (scalaire s'il n'y a qu'un groupe, tuple s'il y en a plusieurs).

  ``` python
  match = re.findall("\+\w+", "+Hello +World")
  print(match) # ['+Hello', '+World']
  ```

  ``` python
  match = re.findall("\+(\w+)", "+Hello +World")
  print(match) # ['Hello', 'World']
  ```

  ``` python
  match = re.findall("(\+(\w+))", "+Hello +World")
  print(match) # [('+Hello', 'Hello'), ('+World', 'World')]
  ```

* `finditer` fait à peu près la même chose mais retourne un itérateur. Chaque valeur de l'itérateur est un objet Match (comme pour search), ce qui permet par exemple de récupérer la position du match (avec .span()).

  ``` python
  match = re.finditer("\+\w+", "+Hello +World")
  print(match)        # <callable_iterator object at 0x7f2413f40f98>
  print(next(match))  # <re.Match object; span=(0, 6), match='+Hello'>
  print(next(match))  # <re.Match object; span=(7, 13), match='+World'>
  ```

## Split

* `split` sépare une chaîne de caractère selon un délimiteur donné

  ``` python
  print(re.split("-+", "abc---def-ghi")) # ['abc', 'def', 'ghi']
  print(re.split("-+", "abc,def,ghi"))   # ['abc,def,ghi']
  ```

## Sub, subn, escape

* `sub` permet de remplacer un match par une valeur donnée  
  `\1` est un back-reference au groupe 1

  ``` python
  txt = '>> Hello..World <<'

  print(re.sub('(\w+)', '[\\1]', txt))
  # >> [Hello]..[World] <<
  ```

  ``` python
  def truncate_number(txt, precision=2):
      """
      :param string txt
      :param integer precision
      """
      if not precision:
          return re.sub(r'\..*', '', txt)

      return re.sub(r'(\.[0-9]{%s}).*' % (precision), r'\1', txt)

  def test_truncate_number(self):
      res = functions.truncate_number('2.985', 2)
      self.assertEqual(res, '2.98')

      res = functions.truncate_number('2.98', 2)
      self.assertEqual(res, '2.98')

      res = functions.truncate_number('2', 2)
      self.assertEqual(res, '2')

      res = functions.truncate_number('2.985', 0)
      self.assertEqual(res, '2')
  ```

  Plutôt qu'une chaîne de caractère, `sub` accepte aussi les callbacks

  ``` python
  print(re.sub('\w+', lambda match: '[' + match[0].upper() + ']', txt))
  # >> [HELLO]..[WORLD] <<
  ```

  Il est également possible le nombre de remplacements effectués en passant un 4ème paramètre:

  ``` python
  print(re.sub('(\w+)', '[\\1]', txt, 1))
  # >> [Hello]..World <<
  ```

* `subn` fait la même chose que `sub` mais retourne un tuple avec le nombre d'occurences remplacées

  ``` python
  txt = '>> Hello..World <<'

  print(re.subn('(\w+)', '[\\1]', txt))
  ('>> [Hello]..[World] <<', 2)
  ```

* `escape` échappe les caractères qui ont une signification dans la syntaxe regex

  ``` python
  print(re.escape("Hello !")) # Hello\\ !
  ```

## Compile

* Toutes les fonctions sur les regex peuvent être exécutées soit sous la forme `re.fct(pattern, ...)` soit `obj.fct(...)` — où `obj` est un regex compilé avec la fonction `compile`:

  ``` python
  regex = re.compile('(\w+)')
  print(regex.sub('[\\1]', txt)) # >> [Hello]..[World] <<
  ```

  ``` python
  def curried_normalize_decimal(sep=None):
      """
      Returns a function to normalize decimal values
      :param string decimal - .|,|None
      :return function
      """
      if sep:
        sep = re.escape(sep)

        r'''
        if thousands is None:
            regex = fr"^[\-\+]?[0-9]*({sep}[0-9]*)?([0-9]?(E|e)\-?[0-9]+)?$"
        else:
            thousands = re.escape(thousands)
            regex = (
                fr"^[\-\+]?([0-9]+{thousands}|[0-9])*({sep}[0-9]*)?"
                fr"([0-9]?(E|e)\-?[0-9]+)?$"
            )
        '''
        isnum_regex = re.compile(fr'^[\-\+]?[0-9]*({sep}[0-9]*)?([0-9]?(E|e)\-?[0-9]+)?$')

        def _normalize(value):
            value = value.strip()

            if isnum_regex.search(value):
                return value.replace(sep, '.')
            else:
                return value

          return _normalize
      else:
          return lambda value: value.strip()

  normalize_decimal = curried_normalize_decimal(sep=',')

  value = normalize_decimal('2,01')
  ```

* Un certain nombre de fonction sur les objets regex acceptent des paramètres supplémentaires: `pos` et `endpos`, qui permettent de limiter l'application du regex à une partie de la chaîne de caractères (à partir ou jusqu'à l'index spécifié).

  [Documentation Regular Expression Objects](https://docs.python.org/3/library/re.html#regular-expression-objects)