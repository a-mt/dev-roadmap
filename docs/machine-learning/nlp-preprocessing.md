---
title: Text Preprocessing
category: Machine Learning, NLP
---

* Le pré-traitement des données textuelles est la première étape du NLP.  
  Le but: réduire le texte aux mots dont on a besoin pour comprendre le texte. Ce qui peut impliquer:

  * supprimer les caractères inutiles et le formattage
  * segmenter le texte (*tokenize*)
  * supprimer les mots non significatifs (*stopwords*)
  * rectifier les fautes d'orthographe
  * normaliser le texte (*stemming* ou *lemmatisation*)

* Il peut également être utile de connaître les relations entre les mots — sujet, verbe, COD. L'analyse de texte (*parsing* en anglais) consiste à segmenter le texte en se basant sur son rôle. Elle est souvent effectuée en complément du pré-traitement, pour améliorer la normalisation ou exclure davantage de mots par exemple.

* Souvent, un algorithme ne peut pas manipuler du texte à proprement parler, il va falloir d'une manière ou d'une autre associer des valeurs numériques aux mots pour analyser les données ou pour les donner à un modèle. Il existe différentes techniques NLP pour parvenir à ce but, tels que bag-of-words ou one-hot-encoding.

---

## Language

* <ins>Détecter le language d'un texte</ins>

  <details>
  <summary>python</summary>

  <pre lang="python">
  !git clone https://github.com/facebookresearch/fastText.git
  !cd fastText && pip install .
  !wget -O lid.176.bin https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin

  import fasttext
  model = fasttext.load_model('lid.176.bin')

  model.predict('Wer wartet mit Besonnenheit Der Wird belohnt zur rechten Zeit')
  # (('__label__de',), array([0.97632647]))

  model.predict('恋とか愛とかそーいうの')
  # (('__label__ja',), array([0.9283309]))
  </pre>

  <pre lang="python">
  # Nom du language à partir de son code ISO
  from pycountry import languages

  languages.get(alpha_2='eo').name
  # 'Esperanto'
  </pre>
  </details>

* <ins>Traduire en anglais</ins>

  <details>
  <summary>python</summary>

  <pre lang="python">
  !pip install googletrans

  from googletrans import Translator
  translator = Translator()

  # 私以外私じゃないの - Gesu No Kiwami Otome
  txt = '私以外私じゃないの\n\n冴えない顔で泣いちゃった夜を重ねて\n絶え間のない暮らしを今日も重ねた\n良くなりそうな明日に期待する度に\n何度も今日を鏡台の裏に隠した\n映る私は何回も瞬きしては\n変わる心に簡単に動揺したわ\nだけど意外と目を瞑った瞬間に\n悪くないなって思いながら明日を悟ったんだ\n\n私以外私じゃないの\n当たり前だけどね\nだから報われない気持ちも整理して\n生きていたいの 普通でしょう?\n\n殻を破った気になってる 誰かの声がしたけど\n殻にこもったはずだった 私はもうそこにはいない\n私になってみてよ ねえ 私になってみたいんでしょ?\n声にならない言葉で 自分が煙に巻かれた\n\n恥ずかしくて言えないけど\n私にしか守れないものを\n身を削って紡いだら\n案外さ 悪くないかもよ私以外私じゃないの\n当たり前だけどね\nだから報われない気持ちも整理して\n生きていたいと思うのよ\n\n私以外私じゃないの\n誰も替われないわ\n今日を取り出して逃げないようにして\n明日に投げ込んで目を開けたんだ\n\n私以外私じゃないの\nどうやらあなたもそう\n誰も替われないってことみたいね\n背を向けて言い合った\n\nだから私はもう怖くないんだ\n夜更け過ぎを待つわ\n今日も報われない気持ちを整理して\n生きてたいって思うの 息を吸い込んだ'

  print(translator.translate(txt, src='auto', dest='en').text)
  </pre>
  </details>

---

## Preprocessing

### Lowercase & Noise removal

* Suivant l'objectif et l'origine des données, il peut être nécessaire de supprimer les informations inutiles telles que

  * la ponctuation, les nombres et les caractères spéciaux
  * les accents et les majuscules
  * les espaces en début et fin de texte
  * le formattage HTML
  * les URLs, hashtags, mentions

  Pour ce faire, on utilise des expressions régulières (regex).

  <details>
  <summary>python</summary>

  <pre lang="python">
  import re

  def cleanup(txt):
      txt = re.sub('@\w+',' ', txt)             # remove @mentions
      txt = re.sub('\w+:\/\/\S+', ' ', txt)     # remove link://...
      txt = re.sub('[^0-9a-zA-Z \t]', ' ', txt) # remove punctuation
      return txt.strip().lower()

  cleanup('@Craig_Spur @kev_g1 @davspurs You think people are gonna go out an exercise when we tell them 17m die globally a year through crap lifestyles?')
  # you think people are gonna go out an exercise when we tell them 17m die globally a year through crap lifestyles
  </pre>
  </details>

### Tokenization

* La plupart des tâches de traitement de texte nécessitent que le texte soit découpé en composantes individuelles, dit *tokens*. Le fait de segmenter le texte en tokens est appelé la *tokenisation* de texte. On découpe généralement le texte mot par mot, mais on peut aussi découper en sections ou phrases suivant l'usage.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk.tokenize import word_tokenize, sent_tokenize

  txt = 'An electrocardiogram is used to record the electrical conduction through a person\'s heart. The readings can be used to diagnose cardiac arrhythmias.'

  # Split on spaces
  print(txt.split(' '))
  '''
  ['An', 'electrocardiogram', 'is', 'used', 'to', 'record', 'the', 'electrical', 'conduction', 'through', 'a', "person's", 'heart.', 'The', 'readings', 'can', 'be', 'used', 'to', 'diagnose', 'cardiac', 'arrhythmias.']
  '''

  # Split on words
  print(word_tokenize(txt))
  '''
  ['An', 'electrocardiogram', 'is', 'used', 'to', 'record', 'the', 'electrical', 'conduction', 'through', 'a', 'person', "'s", 'heart', '.', 'The', 'readings', 'can', 'be', 'used', 'to', 'diagnose', 'cardiac', 'arrhythmias', '.']
  '''

  # Split on sentences
  print(sent_tokenize(txt))
  '''
  ["An electrocardiogram is used to record the electrical conduction through a person's heart.", 'The readings can be used to diagnose cardiac arrhythmias.']
  '''
  </pre>
  </details>

### Stopwords removal

* Les *mots vides* (*stopwords* en anglais) sont des mots qui apportent une structure aux phrases mais ne changent pas leur signification. Typiquement, il s'agit des mots les plus courants comme "un", "le", "de". On peut comprendre le message d'une phrase même après avoir supprimé les mots vides — ex: sortir chien, aller supermarché, etc. Supprimer les mots vides, et ne donner à l'algorithme que les données essentielles, permet d'accélerer l'apprentissage.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk.corpus import stopwords 
  stopwords_eng = set(stopwords.words('english')) 

  txt = "NBC was founded in 1926 making it the oldest major broadcast network in the USA"

  " ".join([w for w in word_tokenize(txt)
              if w not in stopwords_eng])
  # 'NBC founded 1926 making oldest major broadcast network USA'
  </pre>

  <pre lang="python">
  from nltk.corpus import stopwords

  # Liste des languages supportées
  print(stopwords.fileids())
  '''
  [
    'arabic',
    'azerbaijani',
    'danish', 'dutch',
    'english',
    'finnish',
    'french',
    'german',
    'greek',
    'hungarian',
    'indonesian',
    'italian',
    'kazakh',
    'nepali',
    'norwegian',
    'portuguese',
    'romanian',
    'russian',
    'slovene',
    'spanish',
    'swedish',
    'tajik',
    'turkish'
  ]
  '''
  </pre>
  </details>

### Spelling correction

* Corriger les fautes d'orthographe peut également aider l'algorithme à comprendre le sens de la phrase plus facilement.  
  Il n'est pas toujours souhaitable de corriger les fautes: dans certains cas, les fautes d'orthographe peuvent apporter des informations supplémentaires — par exemple: les mails de scam contiennent souvent des fautes d'orthographe volontaires.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from spellchecker import SpellChecker

  txt = 'The qiuck brown fox jmps over the lazy dog'

  spell = SpellChecker()
  " ".join([spell.correction(w)for w in word_tokenize(txt)])
  # 'The quick brown fox jumps over the lazy dog'
  </pre>
  </details>

### Stemming

* Le *stemming* (*word-stem*: *racine du mot* en français) consiste à tronquer un mot pour n'en garder que l'information principale. Par exemple: "globalisé", "globalement" et "globales" deviennent "global".

  On coupe les terminaisons des mots pour réduire la variation des mots (singulier/pluriel, genre, temps, etc), ce qui est utile dans la plupart des cas. Cette méthode est couramment utilisée pour améliorer la correspondance entre une recherche utilisateur et un corpus de texte. Il faut cependant être prudent, le stemming peut parfois faire perdre tout sens au mot: par exemple, en anglais "sing" et "sung" deviennent "s".

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk.stem import PorterStemmer

  txt = "NBC was founded in 1926 making it the oldest major broadcast network in the USA"

  stemmer = PorterStemmer()
  " ".join([stemmer.stem(w) for w in word_tokenize(txt)])
  # 'nbc wa found in 1926 make it the oldest major broadcast network in the usa'
  </pre>
  </details>

### Lemmatization

* La *lemmatisation* consiste à transformer un mot en sa forme singulier-masculin-infinitif: on se débarrasse de l'information de temps, genre et nombre.

  Pour être fiable, la lemmatisation nécessite de connaître le rôle du mot — un nom, un adjectif, un adverbe, etc. Pour augmenter la performance de la lemmatisation, il faut utiliser un algorithme de Part-Of-Speech (POS).

  <details>
  <summary>python</summary>

  <pre lang="python">
  # Lemmatisation nominale
  from nltk.stem import WordNetLemmatizer

  txt = "NBC was founded in 1926 making it the oldest major broadcast network in the USA"

  lemmatizer = WordNetLemmatizer()
  " ".join([lemmatizer.lemmatize(w)
              for w in word_tokenize(txt)])
  # 'NBC wa founded in 1926 making it the oldest major broadcast network in the USA'
  </pre>

  <pre lang="python">
  # Lemmatisation avec Part-Of-Speech tags
  from nltk import pos_tag

  treebank_wordnet_pos = {
      'J': 'a', # adjective
      'V': 'v', # verb
      'N': 'n', # noun
      'R': 'r', # adverb
  }
  def get_wordnet_pos(treebank_pos, default='n'):
      return treebank_wordnet_pos.get(treebank_pos[0], default)

  " ".join([lemmatizer.lemmatize(w[0], get_wordnet_pos(w[1]))
              for w in pos_tag(word_tokenize(txt))])
  # 'NBC be found in 1926 make it the old major broadcast network in the USA'
  </pre>

  <pre lang="python">
  # Lemmatization d'autres langues qu'anglais
  # https://spacy.io/models/de

  !pip install spacy
  !python -m spacy download de_core_news_md

  import spacy
  lemmatizer_de = spacy.load('de_core_news_md')

  [(x.lemma_, x.pos_) for x in lemmatizer_de("Leid")]
  # [('Leid', 'NOUN')]
  </pre>
  </details>

### Synonymes

* On peut remplacer les mots peu courants par leur synonyme le plus commun.  
  Par exemple: "cependant", "néanmoins" et "malgré tout" deviennent "mais".

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk.corpus import wordnet as wn

  synonyms = wn.synsets('nonetheless')

  if len(synonyms) != 0:
      syn = synonyms[0]

      print(syn.pos(), syn._lemma_names[0])
      # r however
  </pre>
  </details>

[Text Preprocessing.ipynb](notebooks/Text Preprocessing.html)

---

## Parsing

### Part-of-Speech Tagging

* Part-of-speech tagging [POS] (*étiquetage de la catégorie grammaticale* en français) consiste à identifier le rôle de chaque mot (verbes, noms, adjectifs, etc) suivant le contexte. C'est particulièrement utile pour améliorer la performance de la lemmatisation.  
  <ins>Catégories grammaticales</ins>:

  * **Nom**:  
    désigne une personne/endroit (nom propre) ou une chose (nom commun).  
    Ex: France, Napoléon

  * **Pronom**:  
    utilisé pour remplacer un nom  
    Ex: il, lui

  * **Déterminant**:  
    précise le genre et le nombre d'un mot  
    Ex: un, le, ta, quelques

  * **Verbe**:  
    exprime une action ou un état  
    Ex: étudier, être, avoir

  * **Adjectif**:  
    modifie ou décrit un nom/pronom  
    Ex: nouveau, bleu

  * **Adverbe**:  
    modifie ou décrit un verbe, adjectif ou un autre adverbe  
    Ex: tout de suite, vivement

  * **Préposition**:  
    exprime une relation spatialle ou temporelle  
    Ex: sur, vers

  * **Conjonction**:  
    relie des mots ou phrases  
    Ex: mais, et

  * **Interjection**:  
    exprime une émotion  
    Ex: wow, aïe

  <!--
  [9 parts of speech](https://s3.amazonaws.com/codecademy-content/courses/nlp-regex-parsing/nlp_regex_parsing_part_of_speech_table.pdf)  
-->
  [upenn_tagset tags examples](https://stackoverflow.com/a/38264311)

* Il existe de nombreux outils pour effectuer un POS automatiquement: NLTK, Spacy, TextBlob, Standford CoreNLP...  
  La fonction `pos_tag` de NLTK prend en argument une liste de tokens, dans l'ordre où ils apparaissent dans la phrase, et renvoie la liste de tokens associés à leur [tag POS](https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html) — on a notamment NN pour les noms, VB pour les verbes, RB pour les adverbes, JJ pour les adjectifs et DT pour les déterminants.

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk.tokenize import word_tokenize
  from nltk import pos_tag

  txt = "NBC was founded in 1926 making it the oldest major broadcast network in the USA"
  pos_tag(word_tokenize(txt))

  '''
  [('NBC', 'NNP'),
   ('was', 'VBD'),
   ('founded', 'VBN'),
   ('in', 'IN'),
   ('1926', 'CD'),
   ('making', 'VBG'),
   ('it', 'PRP'),
   ('the', 'DT'),
   ('oldest', 'JJS'),
   ('major', 'JJ'),
   ('broadcast', 'NN'),
   ('network', 'NN'),
   ('in', 'IN'),
   ('the', 'DT'),
   ('USA', 'NNP')]
  '''
  </pre>

  <pre lang="python">
  from nltk.corpus import wordnet
  from collections import Counter

  def get_part_of_speech(word):
      '''
      Get the most probable part-of-speech
      for a word without any context (not in a sentence)
      '''

      # wordnet.synsets() is a function to get a set of synonyms for a word
      # The returned synonyms come with their part of speech.
      probable_part_of_speech = wordnet.synsets(word)

      # keep a count of the number of synonyms that fall into each part of speech
      pos_counts = Counter()

      pos_counts["n"] = len(  [ item for item in probable_part_of_speech if item.pos()=="n"]  )
      pos_counts["v"] = len(  [ item for item in probable_part_of_speech if item.pos()=="v"]  )
      pos_counts["a"] = len(  [ item for item in probable_part_of_speech if item.pos()=="a"]  )
      pos_counts["r"] = len(  [ item for item in probable_part_of_speech if item.pos()=="r"]  )

      # find and return the most likely part of speech
      most_likely_part_of_speech = pos_counts.most_common(1)[0][0]
      return most_likely_part_of_speech

  tokenized = ["How", "old", "is", "the", "country", "Indonesia"]
  [(token, get_part_of_speech(token)) for token in tokenized]

  '''
  [('How', 'n'),
   ('old', 'a'),
   ('is', 'v'),
   ('the', 'n'),
   ('country', 'n'),
   ('Indonesia', 'n')]
  '''
  </pre>
  </details>

### Chunking

* Une autre application du POS est le *chunking* (*segmentation* en français):

  * On peut avoir un aperçu du sens d'un texte, en se débarassant des informations superflue.
  * On peut effectuer une analyse de fréquence et identifier les termes importants et récurrents.
  * On peut examiner les choix d'adjectif pour différents sujets et mettre en lumière des biais.

  Bien qu'on puisse segmenter le texte comme on veut, certains types de segmentation particulièrement utilisés:

  * <ins>Noun Phrase-chunking</ins>:  
    Récupérer uniquement les phrases nominales: un déterminant (DT) optionnel, un nombre quelconque d'adjectifs (JJ) et un nom (NN). Permet d'identifier les sujets importants dans un texte, ou comment un auteur décrit différents sujets.

    ```
    "NP: {<DT>?<JJ>*<NN>}"
    ```

    ![](https://i.imgur.com/GXLUlFv.jpg)

  * <ins>Verbal Phrase-chunking</ins>:  
    Récupérer uniquement les phrases verbales. Différentes structures sont possibles, comme

    1. un verbe (VB), un nom (NN) et un adverbe (RB) optionnel — ex: il dit.
    2. un nom, un verbe et un adverbe optionnel — ex: dit-il.

    Permet d'avoir un aperçu du type d'action que les différents sujets entreprennent, ou la manière dont les actions des différents sujets sont décrites par un auteur — ce qui peut indiquer un biais.

    ```
    "VP: {<VB.*><DT>?<JJ>*<NN><RB.?>?}"
    "VP: {<DT>?<JJ>*<NN><VB.*><RB.?>?}"
    ```

  * <ins>Chunk filtering</ins>:  
    Supprimer les tags POS qu'on ne veut pas garder.

    ```
    """
    F: {<.*>+}
       }<VB.?|IN>+{
    """
    ```

    Les accolades fermées indiquent les parties à segmenter: `<.*>+` match tous les tags.  
    Les accolades ouvertes indiquent les parties à filtrer: `<VB.?|IN>+` filtre tous les verbes ou prépositions.

### Named entity recognition

* Named Entity Recognition [NER] (*reconnaissance des entités nommées* en français) consiste à classer les entités nommées dans des catégories prédéfinies telles que des noms de personne, d'organisation, de lieux, des expressions de temps, des quantités, etc. NER joue un rôle essentiel dans les chat-box et autres assistants.

  ![](https://i.imgur.com/spw0kxF.jpg)

  <details>
  <summary>python</summary>

  <pre lang="python">
  from nltk import pos_tag
  from nltk.tokenize import word_tokenize
  from nltk import ne_chunk

  txt = 'Prime Minister Narendra Modi on Tuesday announced the 20 Lakh Crore package for the India to fight against the coronavirus pandemic.'

  tokens_pos = pos_tag(word_tokenize(txt))
  res = ne_chunk(tokens_pos, binary=False)
  res
  '''
  (S
    Prime/NNP
    Minister/NNP
    (PERSON Narendra/NNP Modi/NNP)
    on/IN
  ...
  '''
  </pre>

  <pre lang="python">

  !python -m spacy download en_core_web_sm

  import spacy
  nlp = spacy.load('en_core_web_sm')
  doc = nlp(txt)

  for ent in doc.ents:
      print(ent.text, ent.label_)
  '''
  Narendra Modi PERSON
  Tuesday DATE
  20 CARDINAL
  Lakh Crore ORG
  India GPE
  '''
  </pre>
  </details>

### Dependency grammar trees

* Les Dependency Grammar Trees (*arbres de grammaire de dépendance* en français) permettent de représenter les relations entre les différents mots d'une phrase pour facilement les identifier.

  <details>
  <summary>python</summary>

  <pre lang="python">
  # Named entity recognition
  import spacy
  nlp = spacy.load('en_core_web_sm')
  doc = nlp(txt)

  # Dependency grammar tree
  from nltk import Tree

  def to_nltk_tree(node):
      if node.n_lefts + node.n_rights > 0:
          parsed_child_nodes = [to_nltk_tree(child) for child in node.children]
          return Tree(node.orth_, parsed_child_nodes)
      else:
          return node.orth_

  for sent in doc.sents:
      to_nltk_tree(sent.root).pretty_print()

  '''
        is
    ____|_________
   |    |      sentence
   |    |    _____|_______
   |    |   |           simple
   |    |   |             |
  This  !   a           fairly
  '''
  </pre>
  </details>

[Parsing.ipynb](notebooks/Parsing.html)