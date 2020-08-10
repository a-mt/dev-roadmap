---
title: Divers
category: Web, Python
---

## Mémoire

* Vérifier la taille en mémoire d'une valeur/objet

  ``` python
  import sys
  x = 1
  print(sys.getsizeof(x)) # 28
  ```

* Le garbage collector est lancé périodiquement en fonction d'un seuil d'attribution / désattribution d'objets.

  ``` python
  import gc
  print(gc.get_threshold()) # (700, 10, 10)
  ```

  Ici, le seuil du garbage collector est de 700, ce qui signifie que le garbage collector est lancé quand le nombre d'attribution moins le nombre de désattribution vaut 700 (ou plus).

* Si on désalloue une variable qui libère une quantité importante en mémoire, alors il peut être intéressant de lancer le garbage collector manuellement:

  ``` python
  import gc
  collected = gc.collect()
  print("Collected %d objects" % collected)
  ```

## Collections

Le package [collections](https://docs.python.org/3/library/collections.html) fournit des structures de données supplémentaires à celles nativement supportées par Python.

``` python
from collections import OrderedDict, Counter

# Remembers the order the keys are added!
x = OrderedDict(a=1, b=2, c=3)

# Counts the frequency of each character
y = Counter("Hello World!")
```

## Request

``` python
res = requests.get('http://go.codeschool.com/spamvanmenu')
result = res.json() # Convertit le JSON en python
```

``` python
from bs4 import BeautifulSoup
import requests

def login(self, username, password):
    """
        Authenticate on Memrise with the given username and password
        Throws 403 if the username or password isn't right
        @throws requests.exceptions.HTTPError
        @param string username
        @param string password
        @return string - sessionid
    """
    data     = {}
    cookies  = {}

    # Retrieve cookies and CRSF token
    response = requests.get("https://www.memrise.com/login/")
    cookies  = response.cookies
    html     = response.text.encode('utf-8').strip()
    DOM      = BeautifulSoup(html, "html5lib", from_encoding='utf-8')

    form = DOM.find(id="login")

    if form != None:
        for input in form.find_all('input'):
            if "value" in input.attrs and "name" in input.attrs:
                data[input.attrs['name']] = input.attrs['value']

    # Login
    data["username"] = username
    data["password"] = password

    headers = {
        "Origin": "https://www.memrise.com",
        "Referer": "https://www.memrise.com/login/",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/64.0.3282.167 Chrome/64.0.3282.167 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post("https://www.memrise.com/login/", data=data, cookies=cookies, headers=headers)
    response.raise_for_status()

    if "sessionid" in response.cookies:
        return response.cookies["sessionid"]
    elif "sessionid_2" in response.cookies:
        return response.cookies["sessionid_2"]
    else:
        return None
```

``` python
import textwrap

def print_roundtrip(response, *args, **kwargs):
    format_headers = lambda d: '\n'.join(f'{k}: {v}' for k, v in d.items())
    print(textwrap.dedent('''
        ---------------- request ----------------
        {req.method} {req.url}
        {reqhdrs}

        {req.body}
        ---------------- response ----------------
        {res.status_code} {res.reason} {res.url}
        {reshdrs}

        {res.text}
    ''').format(
        req=response.request, 
        res=response, 
        reqhdrs=format_headers(response.request.headers), 
        reshdrs=format_headers(response.headers), 
    ))

response = requests.get(url, hooks={'response': print_roundtrip})
```

## Arguments shell

``` python
import argparse

def main(args):
    """
    Logic to run a cat with arguments
    """
    parser = argparse.ArgumentParser(
        description='Concatenate FILE(s), or '
        'standard input, to standard output')
    parser.add_argument('--version',
        action='version', version=__version__)
    parser.add_argument('-n', '--number',
        action='store_true',
        help='number all output lines')
    parser.add_argument('files', nargs='*',
        type=argparse.FileType('r'),
        default=[sys.stdin], metavar='FILE')
    parser.add_argument('--run-tests',
        action='store_true',
        help='run module tests')
    args = parser.parse_args(args)

    if args.run_tests:
        import doctest
        doctest.testmod()
    else:
        cat = Catter(args.files, args.number)
        cat.run(sys.stdout)
        logging.debug('done catting')

if __name__ == '__main__':
    main(sys.argv[1:])
```

Source: [mattharrison/IllustratedPy3](https://github.com/mattharrison/IllustratedPy3/blob/master/cat.py)

## XML

``` python
from xml.dom.minidom import parseString
dom = parseString('<xml><foo/></xml>')
```

``` python
from xml.etree.ElementTree import XML
elem = XML('<xml><foo/></xml>')
```

## Async/await

``` python
import asyncio
import time

async def coroutine1():
  print("Call 1")
  await asyncio.sleep(3)
  return 1

async def coroutine2():
  print("Call 2")
  await asyncio.sleep(2)
  return 2

async def coroutine3():
  print("Call 3")
  await asyncio.sleep(1)
  return 3

async def main():
  print(time.ctime())

  obj1 = coroutine1()
  obj2 = coroutine2()
  obj3 = coroutine3()

  print(time.ctime(), end=' ')
  res1 = await obj1

  print(time.ctime(), end=' ')
  res2 = await obj2

  print(time.ctime(), end=' ')
  res3 = await obj3

  print(time.ctime())
  print(res1, res2, res3)

# Blocking call to get the event loop, schedule a task, and close
# the event loop
asyncio.run(main()) # si Jupyter: await main()

'''
Mon Jul 27 21:21:23 2020
Mon Jul 27 21:21:23 2020 Call 1
Mon Jul 27 21:21:26 2020 Call 2
Mon Jul 27 21:21:28 2020 Call 3
Mon Jul 27 21:21:29 2020
1 2 3
'''
```

``` python
async def main():
  print(time.ctime())

  obj1 = coroutine1()
  obj2 = coroutine2()
  obj3 = coroutine3()

  print(time.ctime(), end=' ')
  await asyncio.wait([obj1, obj2, obj3])

  print(time.ctime())
  print(res1, res2, res3)

'''
Mon Jul 27 21:24:33 2020
Mon Jul 27 21:24:33 2020 Call 3
Call 1
Call 2
Mon Jul 27 21:24:36 2020
'''
```

`asyncio.run()` ne peut pas être appelé quand une autre boucle asyncio tourne déjà sur le même thread. Jupyter utilise une boucle asyncio, il faut donc utiliser `await main()` à la place de `asyncio.run(main())`.

## Multi-threading

``` python
import _thread
import time

# Define a function for the thread
def print_time( threadName, delay):
   count = 0
   while count < 5:
      time.sleep(delay)
      count += 1
      print ("%s: %s" % ( threadName, time.ctime(time.time()) ))

# Create two threads as follows
try:
   _thread.start_new_thread( print_time, ("Thread-1", 2, ) )
   _thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
   print ("Error: unable to start thread")

while 1:
   pass
```

[Multithreaded Programming](https://www.tutorialspoMultithreaded Programmingint.com/python3/python_multithreading.htm)

## Python debugger

`pdb.set_trace()` pour ajouter un breakpoint  
Lorsque Python arrive à un breakpoint, il affiche un input à l'utilisateur:

* taper `h` + Entrée pour afficher la liste des commandes disponibles.
* `c` pour reprendre l'execution du code

[Demo pdb](https://www.youtube.com/watch?time_continue=6270&v=Z0ssNAbe81M)
