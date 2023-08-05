---
title: Chaînes de caractères
category: Web, Python
---

## Définition

Il y a différentes manière de créer une chaîne de caractères:

``` python
# Single-line string
text = "Hello World"
print(text)

text = 'Hello World'
print(text)

# Multi-line string
text = """Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua."""
print(text)

text = '''Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua.'''
print(text)
```

`dedent` permet de retirer les indentations en trop

``` python
from textwrap import dedent

def fct():
    content = dedent(r"""
    t,F Resp
    s,1/min
    ,,
    01:20,12.85
    """)
```

## Opérateurs

* <ins>Get (`[i]`)</ins>  
  Une chaîne de caractères est fondamentalement une liste de caractères. On peut accéder aux différents caractères par leur index, de la même manière que si c'était une liste.

  ``` python
  a = "Hello"

  print(a[0])  # H
  print(a[-1]) # o
  ```

* <ins>Slice (`[from:to]`)</ins>  
  On peut récupérer un sous-ensemble d'une chaîne de caractère avec la syntaxe `[from:to:step]`. Le max est non inclus.

  ``` python
  a = "0123456789"

  print(a[2:])       # 23456789
  print(a[:5])       # 01234
  print(a[2:5])      # 234

  print(a[::2])      # 02468
  print(a[::-1])     # 9876543210

  print(a[-5:-2])    # 567
  print(a[-2:-5:-1]) # 876
  ```

* <ins>Concat (`+`)</ins>

  ``` python
  print("abc" + "def") # abcdef

  # Format other types to string to concat
  # Or use a format functions
  age = 36
  print("My name is John, I am " + str(age))
  ```

* <ins>Repeat (`*`)</ins>

  ``` python
  print("Python"*3) # PythonPythonPython
  ```

* <ins>Appartenance (`in`)</ins>

  ``` python
  print("World" in "Hello World") # True
  ```

  ``` python
  print("Bob" not in "Hello World") # True
  ```

## Length

``` python
print(len("Hello World")) # 11
```

## Fonctions

Il existe différentes [fonctions](https://docs.python.org/2.5/lib/string-methods.html) définies sur les chaînes de caractères.

* Changer la casse

  ``` python
  print("Hello World".lower())    # hello world
  print("Hello World".upper())    # HELLO WORLD
  print("Hello World".swapcase()) # hELLO wORLD
  print("hello world".title())    # Hello World
  ```

* Nettoyer

  ``` python
  print("--Hello World--".strip("-"))    # Hello World
  ```

  ``` python
  print("Hello World".replace("o", "0")) # Hell0 W0rld
  ```

* Localiser

  ``` python
  print("Hello World".find("o"))  # 4, -1 if not found
  print("Hello World".index("o")) # 4, ValueError if not found
  print("Hello World".count("o")) # 2
  ```

* Padding

  ``` python
  print("1".zfill(3))             # 001, pad with 0
  print("1".ljust(3, "."))        # 1.., 2nd param is optional
  print("1".rjust(3, "."))        # ..1, 2nd param is optional
  print("1".center(5,"."))        # ..1.., 2nd param is optional
  ```

* Valider

  ``` python
  print("Hello World".startswith("H"))
  print("Hello World".endswith("d"))

  print("hello world".islower())
  print("HELLO WORLD".isupper())
  print("Hello World".istitle())

  print("abc".isalpha())
  print("123".isdigit())
  print("abc123".isalnum())
  print(" ".isspace())
  ```

* Code décimal

  ``` python
  print(ord("A")) # 65
  print(chr(65))  # A
  ```

## Format

Il existe différentes manières de formatter une chaîne de caractères:

``` python
print('Hello there {} and {}'.format(name1, name2))
print('Hello there %s and %s' %(name1, name2))
print(f'Hello there {name1} and {name2}')
```

1. La fonction [format](https://www.w3schools.com/python/ref_string_format.asp)

    Paramètres non nommés:
    ``` python
    tu = (12,45,22222,103,6)
    print('{0} {2} {1} {2} {3} {2} {4} {2}'.format(*tu))
    # 12 22222 45 22222 103 22222 6 22222

    print("{0:b}".format(9)) # 1001
    ```

    Paramètres nommés:
    ``` python
    print("{track:03d}. {artist:>8s} - {title:s}.mp3".format(track=1, artist="Bob", title="My song"))
    # 001.      Bob - My song.mp3

    print('{chr:0>2s}'.format(chr=str(9))) # 09
    ```

2. La syntaxe `%`

    Paramètres non nommés:
    ``` python
    myvar = "value"
    print("val = %s" % myvar) # val = value

    a = 10
    b = 2
    print("%d/%d = %.2f" % (a, b, a/b)) # 10/2 = 5.00

    a = 1.0
    print("val = %e" % a)       # 1.000000e+00
    print("val = %f" % a)       # 1.000000
    print("val = %.2f" % a)     # 1.00
    print("val = %s" % a)       # 1.0
    print("val = %d" % a)       # 1
    ```

    Paramètres nommés:
    ``` python
    print('invalid %(type)s value: %(value)r' % {'type': "name", 'value': 10})
    # invalid name value: 10

    ngettext("%(count)d mois", "%(count)d mois", months) % {"count": months}
            ```

3. Les [f-strings](https://docs.python.org/3.6/whatsnew/3.6.html#whatsnew36-pep498) (depuis Python 3.6)

    ``` python
    origin = "London"
    destination = "Paris"
    print(f"from {origin} to {destination}") # from London to Paris
    ```

## Caractères spéciaux

Pour afficher les caractères spéciaux d'une chaîne de caractères, on utilise la fonction `repr`

``` python
from string import whitespace

print(repr(whitespace)) # ' \t\n\r\x0b\x0c'
```

Une autre possibilité est de déclarer la chaîne de caractère en mode "raw":


``` python
print('" \t"')  # " 	"
print(r'" \t"') # " \t"
```

## unidecode

`unidecode` permet de remplacer les caractères accentués par leur équivalent non accentué

  ``` python
  from unidecode import unidecode

  txt = unidecode(txt).lower()
  ```

## Bytes

Les chaînes de caractères déclarées en Python utilisent le jeu d'encodage du fichier en cours. Mais ce n'est pas toujours souhaitable: on veut parfois utiliser un encodage différent. Dans ce cas, on utilise un "bytes" — une liste d'octets. On peut ensuite convertir les valeurs numériques récupérées dans un autre jeu d'encodage avec `encode`/`decode`.

* Créer une liste de bytes

  ``` python
  print(bytes.fromhex("80"))  # b'\x80'
  print(b'\x80')              # b'\x80'
  ```

* `decode` convertit des bytes en chaîne de caractères.  
  On précise l'encodage d'origine en paramètre. Sinon, l'encodage en cours est utilisé pour décoder les bytes.

  ``` python
  print(b'\x80'.decode('cp1252')) # €

  print(b'\x80'.decode()) # UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: invalid start byte

  print(b'\x80'.decode('utf8', errors='replace')) # �
  ```

* `encode` convertit une chaîne de caractères en bytes.  
  On précise l'encodage cible en paramètre. Sinon, l'encodage en cours est utilisé.

  ``` python
  print(b'\x80'.decode('cp1252').encode()) # b'\xe2\x82\xac'
  ```

* Les encodages les plus utilisés:

  ```
  ascii
  utf8
  cp1252
  latin1
  latin9
  ```

  [Liste complète des encodages acceptés](https://docs.python.org/3/library/codecs.html#standard-encodings)  
  [Comparaison encodage Latin vs ANSI](https://a-mt.github.io/dev-roadmap/assets/encoding-latin-vs-ansi.html)

## Constantes

``` python
from string import ascii_letters

print(ascii_letters)
# abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```

| Constante | Valeur
|---        |---
| `ascii_letters`   | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
| `ascii_lowercase` | abcdefghijklmnopqrstuvwxyz
| `ascii_uppercase` | ABCDEFGHIJKLMNOPQRSTUVWXYZ
| `digits`          | 0123456789
| `hexdigits`       | 0123456789abcdefABCDEF
| `whitespace`      |  \t\n\r\x0b\x0c