---
title: Asyncio
category: Web, Python
---

## Utilité de la programmation asynchrone

* Avec un paradigme de programmation classique, attendre le résultat d'une entrée-sortie (aka *input-output* en anglais, IO), par exemple le résultat d'une requête vers une URL, bloque le programme.  
  Si on veut effectuer plusieurs IO à la suite, il faut attendre le résultat de la première avant de déclencher la deuxième, et ainsi de suite, ce qui peut être problématique.

* On peut essayer de résoudre ce problème de différentes manières:

  - utiliser des threads.  
    Le problème c'est qu'on ne contrôle pas le temps CPU: le scheduler de threads décide d'allouer du temps à un thread ou à l'autre, sans avoir connaissance de la logique de chaque thread

    ``` python
    import threading
    ```

  - utiliser un callback.  
    On associe une fonction à exécuter lorsqu'un événement est déclenché. Le problème c'est qu'on est obligé de découper le programme en petits morceaux, et la logique devient difficile à suivre

    ``` js
    function pong_handler(client) {
      client.on('data', function(data) {
        client.on('data_written', function() {
          client.close()
        });
        client.write(data)
        client.flush()
      });
    }
    ```

  - utiliser la programmation asynchrone.  
    On utilise une coroutine, une fonction asynchrone qui exécute du code contenant des temps d'attente pendant lesquels on rend la main au reste du programme

    ``` js
    async function pong_handler()
    {
      client.write(await client.read())
      await client.flush()
      client.close()
    }
    ```

* Une première logique "asynchrone" a été rendue possible dès python 2.5 avec l'envoi de variable aux générateurs.  
  Des premières librairies (pre-asyncio) ont vu le jour en se basant sur ce mécanisme:

  - gevent: http://www.gevent.org
  - tornado: http://www.tornadoweb.org/en/stable
  - twisted: https://twistedmatrix.com/trac

* Aujourd'hui, la librarie `asyncio` fait partie des librairies directement intégrées à Python et permet l'implémentation de code asynchrone

* La première version d'asyncio a été introduite en python 3.4, avec une syntaxe différente:

  ```
  @asyncio.coroutine -> async def
  yield from         -> await
  ```

* asyncio est un paradigme contagieux: mieux vaut concevoir une application faite pour dès le début.   
  Pour cette raison, il est possible qu'à termes asyncio soit remplacée par d'autres alternatives, telles que uvloop, curio ou trio.

## Déclarer une coroutine: async def

* En Python, on déclare une fonction asynchrone avec le mot-clé `async def`.  
  Un peu sur le même principe que les générateurs, l'appel de cette fonction n'exécute pas le contenu de la fonction mais retourne un objet coroutine.

  ``` python
  import asyncio

  async def example(message):
      print(message, 'debut')

      return f'{message} par morceaux'
  ```
  ``` python
  print(example('run'))  # <coroutine object morceaux at 0x7fd92426b9c0>
  ```

## Exécuter une coroutine: la boucle d'événement

* Pour évaluer une coroutine, il faut déclencher la boucle d'événement (*event loop*) d'asyncio.  
  Une des manières de la créer est d'utiliser la fonction `run_until_complete`:

  ``` python
  loop = asyncio.get_event_loop()
  ret = loop.run_until_complete(example('run'))  # run debut

  print(ret)  # run par morceaux
  ```

* Pour déclencher l'exécution de plusieurs coroutines à la suite,  
  on peut créer un ensemble de coroutines avec `gather`:

  ``` python
  ret = loop.run_until_complete(
    asyncio.gather(
      example('run1'),
      example('run2'),
    )
  )
  # run1 debut
  # run2 debut

  print(ret)  # ['run1 par morceaux', 'run2 par morceaux']
  ```

## Ajouter des temps d'attente: await

* Une coroutine peut appeler une autre coroutine avec le mot-clé `await`.  
  À chaque await, la boucle d'événement reprend le contrôle et donne le temps CPU à la prochaine coroutine.

  ``` python
  async def example2(message):
    print(message, 'debut')

    await asyncio.sleep(0.5)
    print(message, 'inter')

    return f'{message} par morceaux'

  loop = asyncio.get_event_loop()
  ret = loop.run_until_complete(
    asyncio.gather(
      example2('run1'),
      example2('run2'),
    )
  )
  # run1 debut
  # run2 debut
  # run1 inter
  # run2 inter

  print(ret)  # ['run1 par morceaux', 'run2 par morceaux']
  ```

* Idéalement, une coroutine devrait rendre le contrôle le plus souvent possible,  
  avec si nécessaire l'utilisation d'un temps d'arrêt de 0

  ``` python
  await asyncio.sleep(0)
  ```

## Awaitable: \_\_await\_\_

* Un awaitable est un objet qu'on va pouvoir await.  
  Pour ce faire, la classe doit implémenter la méthode magique `__await__` qui retourne un itérateur

  ``` python
  class awaitable():
    def __init__(self, message='run'):
      self.message = f'awaitable {message}'

    def __await__(self):
      print(self.message, '>>>')
      yield
      print(self.message, '---')
      yield
      print(self.message, '+++')
      yield
      print(self.message, '<<<')

  async def example3(message):
    print(message, 'debut')

    await awaitable(message)
    print(message, 'inter')

    return f'{message} par morceaux'

  loop = asyncio.get_event_loop()
  ret = loop.run_until_complete(
    asyncio.gather(
      example3('run1'),
      example3('run2'),
    )
  )
  # run1 debut
  # awaitable run1 >>>
  # run2 debut
  # awaitable run2 >>>
  # awaitable run1 ---
  # awaitable run2 ---
  # awaitable run1 +++
  # awaitable run2 +++
  # awaitable run1 <<<
  # run1 inter
  # awaitable run2 <<<
  # run2 inter
  ```

* Pour vérifier si une fonction / objet est awaitable:

  ``` python
  import inspect
  inspect.isawaitable(coro)
  ```

## Context managers asynchrones: async with

* On peut créer un contexte manager asynchrone (retourner une coroutine plutôt qu'un objet)  
  en implémentant les méthodes magiques `__aenter__` et `__aexit__` (PEP-492)

* Pour appeler un contexte manager asynchrone, on utilise `async with`

  ``` python
  import asyncio
  import aiohttp

  async def fetch(url):
    async with aiohttp.ClientSession() as session:
      async with session.get(url) as response:

        raw = await response.read()
        print(f'{len(raw)} bytes')

  url = 'https://gist.githubusercontent.com/a-mt/876769a7c0ffbcf7fa98927a851f0b9e/raw/d4af3297e8f4abeddc555b1d70701046450bf4f7/lorem.txt'

  asyncio.get_event_loop().run_until_complete(
    fetch(url)
  )
  # 144 bytes
  ```

## Itérateurs asynchrones: async for

* Pour appeler un itérateur asynchrone, on utilise `async for` (PEP-492)

  ``` python
  async with session.get(url) as response:
    async for line in response.content:
        print(line)

  # b'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n'
  # b'Sed non mauris vel ex rutrum semper.\n'
  # b'Integer dignissim quam vel nunc elementum pretium.'
  ```

* Il est également possible d'utiliser une compréhension asynchrone (PEP-530)

  ``` python
  result = [i async for i in aiter() if i % 2]
  ```

## Créer des tâches: ensure_future

* Il est possible de planifier une coroutine pour la prochaine execution de la boucle avec `ensure_future`

  ``` python
  task = asyncio.ensure_future(example2('run1'))
  ret = asyncio.get_event_loop().run_until_complete(example2('run2'))
  # run1 debut
  # run2 debut
  # run1 inter
  # run2 inter

  print(task)  # <Task finished name='Task-1' coro=<example2() done, defined at test.py:3> result='run1 par morceaux'>
  print(ret)   # run2 par morceaux
  ```

* ensure_future retourne une tâche qui permet de connaître l'état et le résultat de l'exécution

  ``` python
  print(task.done())       # True
  print(task.result())     # run1 par morceaux
  print(task.exception())  # None
  ```

* On peut récupérer la liste de toutes les tâches:

  ``` python
  tasks = asyncio.Task.all_tasks()
  print(tasks)  # {<Task finished name='Task-1' coro=<example2() done, defined at test.py:3> result='run1 par morceaux'>}
  print(task in tasks)  # True
  ```

* On peut annuler l'exécution d'une tâche avec `task.cancel()`  
  Une exception `CancelledError` sera levée au prochain tour — et ce sera au programme de correcter gérer les erreurs levées

  ``` python
  async def example_cancel(message):
      asyncio.current_task().cancel()

      print(message, 'debut')

      await asyncio.sleep(0.5)
      print(message, 'inter')

      return f'{message} par morceaux'

  asyncio.get_event_loop().run_until_complete(
    asyncio.gather(
      example_cancel('run1'),
      example_cancel('run2'),
    )
  )
  '''
  run1 debut
  run2 debut
  Traceback (most recent call last):
    File "test.py", line 13, in <module>
      asyncio.get_event_loop().run_until_complete(
    File "/usr/lib/python3.8/asyncio/base_events.py", line 616, in run_until_complete
      return future.result()
  asyncio.exceptions.CancelledError
  '''
  ```

## Créer une boucle d'événements sans fin: run_forever

``` python
asyncio.ensure_future(coro)
try:
  asyncio.get_event_loop().run_forever()
except KeyboardInterrupt:
  print('bye')
```

Cette boucle ne se termine, sauf en cas d'arrêt explicite:

``` python
asyncio.get_event_loop().stop()
```

Pour réinitiliser l'état de la boucle:

``` python
asyncio.set_event_loop(asyncio.new_event_loop())
```

## Synchronisation

Il existe différents mécanismes de synchronisation: `Queue`, `Lock` et `Semaphore`

``` python
queue = asyncio.Queue(maxsize=1)

async def producer(queue):
  count = 1
  while True:
    await queue.put(f'tick{count}')
    count += 1
    await asyncio.sleep(1)

async def consumer(queue):
  while True:
    received = await queue.get()
    print(f'got {received}')

async.ensure_future(producer(queue))
async.ensure_future(consumer(queue))
```

## Transport réseau

* asyncio permet de faire du bas niveau (appels systèmes signal() et select()) avec les classes `Transport`, `Protocol`, `Streams`.  
  On peut commencer avec les librairies de haut niveau:

  - HTTP: aoihttp
  - SSH: asyncssh
  - telent: telnetlib3

## Stdin reader

``` python
def read_keyboard_line(stdin):
    '''
    Callback (et non coroutine)
    appelé quand une nouvelle ligne est entrée dans stdin
    '''
    line = stdin.readline().strip()

    # Ignorer les lignes vides
    if not line:
        return

    # On attend un entier entre 1 et 4
    try:
        value = int(line)
        if not (1 <= value <= 4):
            raise ValueError('entre 1 et 4')

    except Exception as e:
        print(f"{line} doit être entre 1 et 4 {type(e)} - {e}")
        return

    asyncio.ensure_future(new_players(value))

async def run():
  """
  Ajoute une callback sur stdin
  (pour le mode avec clavier, pas fonctionnel dans un notebook)
  """
  asyncio.get_event_loop().add_reader(
      sys.stdin.fileno(),  # file descriptor
      read_keyboard_line,  # callback
      sys.stdin            # callback argument(s)
  )

asyncio.ensure_future(run())
asyncio.get_event_loop().run_forever()
```

## Gestion de sous-process, stdout reader

* `create_subprocess_shell`  
  [Docs](https://docs.python.org/3/library/asyncio-subprocess.html)

  ``` python
  import asyncio

  async def run(cmd):
      proc = await asyncio.create_subprocess_shell(
          cmd,
          stdout=asyncio.subprocess.PIPE,
          stderr=asyncio.subprocess.PIPE)

      stdout, stderr = await proc.communicate()

      print(f'[{cmd!r} exited with {proc.returncode}]')
      if stdout:
          print(f'[stdout]\n{stdout.decode()}')
      if stderr:
          print(f'[stderr]\n{stderr.decode()}')

  asyncio.run(run('ls /zzz'))
  ```

* `create_subprocess_exec`

  <ins>Exemple 1</ins>:

  ``` python
  import asyncio
  import sys

  async def get_date():
      code = 'import datetime; print(datetime.datetime.now())'

      # Create the subprocess; redirect the standard output
      # into a pipe.
      proc = await asyncio.create_subprocess_exec(
          sys.executable, '-c', code,
          stdout=asyncio.subprocess.PIPE)

      # Read one line of output.
      data = await proc.stdout.readline()
      line = data.decode('ascii').rstrip()

      # Wait for the subprocess exit.
      await proc.wait()
      return line

  date = asyncio.run(get_date())
  print(f"Current date: {date}")
  ```

  <ins>Exemple 2</ins>:

  ```python
  import asyncio
  from subprocess import PIPE

  async def read_and_display(stream, name):
      """
      Affiche la sortie de stdout ou stderr
      S'arrête quand le processus est stoppé
      """
      while True:
          bytes = await stream.readline()

          # résultat vide = le processus est terminé
          if not bytes:
              break

          line = bytes.decode().strip()
          print(f'got `{line}` from {name}')

  async def new_player(num):
      command = f'python3 -u players.py {num}'.split()

      process = await asyncio.create_subprocess_exec(
          *command,
          stdout=PIPE,
          stderr=PIPE,
      )
      name = f"ps#{num}"

      # lire et écrire les channels des subprocess
      stdout, stderr = await asyncio.gather(
          read_and_display(process.stdout, name),
          read_and_display(process.stderr, name),
      )
      # attendre pour que l'OS libère la mémoire
      retcod = await process.wait()

      print(name, f'exit code {retcod}')
      return retcod

  # Run two players
  asyncio.get_event_loop().run_until_complete(
      asyncio.gather(
          new_player(1),
          new_player(2),
      )
  )
  ```
