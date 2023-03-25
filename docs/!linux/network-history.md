---
title: Histoire d'Internet
category: Linux, Network
---

## Naissance des réseaux informatiques

* Au début des années 1960, les ordinateurs sont de grosses machines de la taille d'une pièce, coutant dans les 100 000$.
  L'informatique intéresse alors deux types de clients: l'armée et les universités.

* Le temps partagé (*timesharing*) permet à des dizaines de personnes de partager un même ordinateur, en se connectant chacun avec un terminal (souvent un téléprinter reconvertit) via une ligne téléphonique. Chaque personne peut enregistrer son travail et le mettre en file d'attente, le tout est géré dynamiquement par l'ordinateur. Du temps partagé est né le partage de fichiers, l'email et le chat.

* Mis au point en 1949 pour la transmission de signaux radar, le *modem* est un appareil qui module les données numériques en sons, et démodule les sons reçus en données numériques — d'où son nom (MODulation + DEModulation = MODEM).  
  Les modems sont adaptés aux ordinateurs en 1953 et commercialisés par Bell Telephone en 1958, ce qui permet désromais d'utiliser des lignes téléphoniques normales pour faire transiter les données plutôt que des lignes télégraphiques dédiées, et offre ainsi une plus grande couverture et des coûts plus faibles.

  Ce qu'on sait faire à l'époque, c'est des systèmes à *commutation de circuit*: si on veut communiquer avec une personne, on doit être relié physiquement via un câble à la machine distante. Pour communiquer avec quelqu'un d'autre, il faut passer sur un autre circuit, et si on veut communiquer avec deux personnes en même temps, alors il faut deux lignes. Cela limite la taille des réseaux.

  <!-- 2 terminaux peuvent être connectés par téléphone à 2 ordinateurs, mais 2 ordinateurs ou terminaux ne peuvent pas communiquer directement entre eux: il faut obligatoirement faire transiter les données entre terminal et ordinateur et changer de connexion. En reliant les ordinateurs en réseau on pourrait partager le travail entre plusieurs universités, s'envoyer des programmes et éviter les doublons: on pourrait travailler plus efficacement et plus rapidement. -->

* En 1958, le président américain Eisenhower crée l'ARPA (*Advanced Research Projects Agency*), un programme ayant pour but de permettre à la technologie militaire américaine de prendre une longueur d'avance sur ses ennemis. Parmi les projets de l'ARPA: tester la faisabilité d'un réseau informatique à grande échelle.

* En 1965, l'entreprise DEC dévoile le PDP-8, le premier mini-ordinateur qui aura un succès commercial. Assez petit pour être posé sur un bureau, il est vendu 18 000$, soit un cinquième du prix d'un ordinateur central IBM/360 bas de gamme. La combinaison de vitesse, taille et coût permet l'implantation du mini-ordinateur dans des milliers d'usines de fabrication, de bureaux et de laboratoires scientifiques.

  <ins>System 360 d'IBM (1964)</ins>:

  ![](https://i.imgur.com/LuPsQCE.png)

  <ins>PDP-8 de DEC (1964)</ins>:

  ![](https://i.imgur.com/tSU2Xxh.jpg)

* En 1966, Honeywell présente le mini-ordinateur DDP-516 et démontre sa robustesse à l'aide d'un marteau de forgeron. Il attire ainsi l'attention de Larry Roberts, alors à la direction de l'ARPA.

* En 1968, Larry Roberts et l'équipe de l'ARPA affinent la structure générale et les spécifications de l'ARPA Network, ou *ARPAnet*.  Ils lancent un appel d'offres pour le développement de mini-ordinateurs chargés de relier différents ordinateurs entre eux.
  Ces mini-ordinateurs sont alors connus sous le nom d'"interfaces processeur de message" (*Interface Message Processors*, IMP). Ils ont depuis évolué vers ce qu'on appelle aujourd'hui des *routeurs*.

* Frank Heart, de l'entreprise Bolt Beranek et Newman (BBN), dirige une équipe chargée de répondre à l'appel d'offre, qu'ils remportent en décembre. Il constitue une équipe chargée d'écrire le logiciel qui fera fonctionner les IMP et de spécifier les modifications à apporter au matériel qu'ils ont choisi, le Honeywell DDP-516.

  4 universités américaines à relier sont sélectionnées. Dans chacun de ces sites, une équipe se met au travail pour produire le logiciel qui permettra à ses ordinateurs et à l'IMP de communiquer. Le 7 avril, un des membres de l'équipe envoie un mémo intitulé "Demande de commentaires" (*Request for Comments*, RFC). Il s'agit du premier de milliers de RFC qui documentent la conception de l'ARPAnet — et de l'Internet qui suivra ensuite.

* La première démonstration d'un réseau informatique à commutation de paquets a lieu en octobre 1969 sur l'ARPAnet.
  Les ordinateurs des 4 universités américaines étaient connectés à l'aide d'IMP.

  D'autres réseaux ont été mis en ligne dans les semaines et mois qui ont suivi: le réseau NPL au Royaume-Uni, le réseau ALOHAnet à Hawaii (financé par l'ARPA) et le HL pour les compagnies aériennes commerciales SITA. Peu de temps après, les travaux CYCLADES sur le réseau français commençent — qui sera à l'origine du Minitel.

## Premières innovations

* Au début des années 1970, le courrier électronique passe des systèmes à temps partagé, où chaque système a maximum quelques centaines d'utilisateurs, aux réseaux informatiques alors en plein essor. Les messages deviennent libres de voyager partout où le réseau va, et le courrier électronique explose.

  Ray Tomlinson (de BBN) choisit le désormais iconique signe "@" pour son protocole de courrier électronique en réseau sur l'ARPAnet et, en 1973, plus de 50% du trafic sur ce réseau dédié à la recherche est constitué de courrier électronique.

* La même année, un ordinateur de l'université de Londres (UK) envoie des paquets à une université en Californie (USA). Il s'agit du premier succès de liaison transatlantique d'ARPAnet.

* 1973 marque aussi la naissance de la norme qui finira par s'imposer: Ethernet. Créé dans le cadre de la vision globale de Xerox PARC d'un "bureau du futur", un bureau composé d'un ensemble de PC connectés, Ethernet adapte les techniques du réseau sans fil ALHAnet pour traiter les câbles pour des medium passifs — comme de l'air (ou "ether") — entre les stations de radio. Il sera fortement concurrencé par diverses normes de réseaux locaux, dont le Token Ring d'IBM et Datapoint d'ARCnet.

## Prolifération

* Le milieu des années 1970 voit apparaître un certain nombre de réseaux commerciaux,
  parmi lesquels les entreprises et les professionnels peuvent choisir.
  La plupart sont à commutation de paquets, comme Telenet, Tymnet et d'autres acteurs majeurs.
  Datran et quelques autres sont à commutation de circuits.

  Les différents réseaux étaient alors incompatibles avec ARPAnet et entres eux, ce qui limitait la taille des communautés en ligne.

* Le mini-ordinateur, désormais plus abordable, rend possible quelque chose d'impensable jusqu'à présent: un ordinateur dédié à une seule personne.  
  Mais connecter un ordinateur à un serveur distant était encore un cauchemar de réglages et de configuration de matériels relativement coûteux, la plupart des propriétaires d'ordinateur ne s'en donnent pas la peine. Certains courageux s'y attelent et s'abonnent aux premiers services en ligne comme MicroNet ou des Bulletin Board Services (BBS) hébergés sur des serveurs distants ou sur le PC de quelqu'un d'autre.

* À partir de la fin des années 1970, les universitaires et les geeks continuent de développer des communautés en ligne "techie" comme Usenet, un tableau de messages conçu par les étudiants de l'Université de Duke, et Bitnet, un réseau pour l'échange de fichiers et emails.

  Usenet, l'une des communauté en ligne les plus durables, fournit des "newsgroups" (groupes de discussions) orientés sur des sujets pour des discussions collaboratives, et sa communauté et son éthique façonneront les débuts du web.

## Besoin de normalisation

* Au début des années 1980, plusieurs protocoles nationaux, ainsi que des réseaux d'entreprise, sont en concurrence les uns avec les autres. Le défi est donc de créer des "réseaux de réseaux", un processus qu'on appellait à l'époque "internet-working" ou "inter-netting".
  Beaucoup sont d'accord sur l'objectif: développer un réseau mondial de réseaux, mais tous ne sont pas d'accord sur la manière de s'y prendre.

* Lancé en 1977 par un membre d'une équipe de CYCLADES, l'OSI (*Open Systems Interconnect*) est le premier à bénéficier d'un soutien international et à recevoir l'appui de l'ISO (*International Standards Organization*) comme standard officiel. Il est officiellement publié en 1984.

  On trouve également un concurrent de taille, le réseau DECnet de Digital Equipment.
  Et la SNA (*System Network Architecture*) d'IBM, qui domine le monde de l'informatique d'entreprise et achemine la majorité du trafic réseau mondial jusqu'à la fin des années 80.

  Le protocole Internet de l'ARPA, TCP/IP, officiellement publié en 1983, n'est à ce moment là qu'un modeste réseau expérimental de réseaux appartenant au gouvernement américain, principalement utilisé par des militaires et chercheurs américains en informatique.

* TCP/IP reçoit un gros boost en 1985 lorsque la NSF (*National Science Foundation*) crée le NSFnet, qui relie 5 centres de super-ordinateurs entre les universités de Princeton, Pittsburg, Californie, Illinois et Cornell.

  Bientôt, plus d'une douzaine de réseaux régionaux et éducatifs s'ajoutent, dont BITnet, CSnet et une dizaine d'autres. Certaines parties de l'ARPAnet sont réaffectées à NSFnet, tandis que d'autres vont au réseau militaire, MILnet. L'Internet se développe pour atteindre 100 000 machines hôtes, chacun avec de multiples utilisateurs.

* Fin années 80, même les initiés parient contre TCP/IP, l'OSI est le favori officiel pour l'avenir de l'internet-working — la connexion de réseaux ensemble.

## WorldWideWeb

* Comme il s'agit d'un réseau fermé, non commercial, utilisé principalement par des geeks, il manque de systèmes en ligne pour aider les gens ordinaires à y naviguer. Et les entreprises qui fabriquent des systèmes en ligne faciles à utiliser, comme le Minitel en France, CompuServe ou AOL, ne veulent pas investir pour les porter sur un réseau universitaire — de toute façon, elles ont leurs propres réseaux.

  Ce vide au sommet de l'Internet crée une opportunité pour les petits acteurs pour essayer de créer ou d'adapter leurs propres systèmes en ligne. Usenet est le premier à s'y atteler, bien qu'il soit surtout destiné aux geeks: ses groupes de discussion sont assez populaires et il est porté pour fonctionner sur l'Internet en 1986. Les autres systèmes vont d'entreprises commerciales discrètes comme WAIS et Hyper-G à des projets étudiants comme Viola, Lynx et Gopher. Plusieurs utilisent des liens hypertextes cliquables — y compris une petite expérience ambitieusement appelée "WorldWideWeb".

* Fin 1990, Tim Berners-Lee, alors physician travaillant au CERN, écrit un premier prototype de "WorldWideWeb" (comme il l'écrit) comprenant un serveur, du HTML, des URLs et le premier navigateur.
  Ce navigateur fait également éditeur, à la manière d'un traitement de texte connecté à l'Internet. L'idée étant qu'un Web de liens utiles va se développer et s'approfondir au fur et à mesure que les gens les créent au cours de leur vie quotidienne.

* Le GUI navigateur-éditeur de Tim Berners-Lee ne fonctionne que sur de rares ordinateurs NeXT. Le CERN refuse de financer d'autres versions pour les plateformes courantes. L'équipe Web écrit donc un simple navigateur en mode texte pour une distribution rapide, et demande à des volontaires d'écrire ou d'adapter les navigateurs graphiques nécessaires pour les PC, Mac et machines UNIX. L'équipe fournit également du code pour commencer: la bibliothèque commune www est essentiellement une boîte à outils pour construire son propre navigateur — écrite par Tim Berners-Lee et Jean-François Groff, assistant de recherche technique.

  8 volontaires répondent à l'appel, ce qui donne lieu à des navigateurs UNIX, Mac et PC. Viola et Midas sont initialement les plus populaires, eclipsés ensuite par Mosaic. Tous n'offrent pas de fonctions d'édition, qui sont plus difficiles à mettre en oeuvre sur des machines autres que le NeXT. Berners-Lee ne reprendra jamais le contrôle de sa création.

* En 1992, l'Internet sera devenu la nouvelle norme mondiale, reliant 1 million d'ordinateurs.   
  Rétrospectivement, l'Internet présente plusieurs avantages essentiels, qu'il s'agisse d'une communauté croissante de geeks produisant des logiciels et du matériel fonctionnel, de la libre distribution du système d'exploitation UNIX ou de son intégration dans du matériel courant comme les routeurs Cisco.

  Le NSFnet est un facteur important qui a permis aux protocoles Internet de l'emporter sur des protocoles rivaux comme OSI, SNA et DECNET. Mais le facteur décisif... probablement l'argent. En particulier le soutien du gouvernement américain, par le biais du NSFnet et d'autres sources.

  À l'instigation des pionniers de l'informatique, le sénateur Al Gore commence à travailler en 1987 sur ce qui deviendra son "High Performance Computing and Communication Act". Lorsqu'elle est financée en 1991, cette loi promeut et finance diverses initiatives de mise en réseau pour plus de 600 millions de dollars. Phrase depuis devenue célèbre, Al Gore appelle cette initiative "l'autoroute de l'information" (*information superhighway*).

## Convergence

* La 1ère guerre des navigateurs était plutôt un coup d'État, début 1994 lorsque la moitié de l'équipe de Mosaic a fait défection pour former Netscape, sous la direction de l'entrepreneur Jim Clark. Mosaic a duré moins d'un an.

* Mais quand Microsoft reprend une version de Mosaic et la rebaptise Internet Explorer, en accordant une license dans chacun de ses ordinateurs, le combat est lancé.

* Au milieu et à la fin des années 1990, Netscape révolutionne le Web et l'aide à se répandre auprès des gens ordinaires et des entreprises. Microsoft distribue gratuitement Explorer avec chaque copie de Windows 95 et au-delà, et à la fin des années 90, Netscape est en faillite.

  Dans une stratégie de dernière chance, le code du navigateur Navigator de Netscape est rendu open source et devient la base de la fondation Mozilla et de son navigateur aujourd'hui Firefox.

* En 1994, Tim Berners-Lee crée le W3C (*World Wide Web Consortium*). Le siège européen est alors prévu au CERN (en Suisse) et le siège américain au MIT de Boston (USA). Mais le CERN change ses plans et l'équipe centrale des développeurs Web est au final répartie entre plusieurs sites de recherche français.

  La même année, le vice-président Al Gore soutient le développement d'un site Web pour la maison blanche et encourage le financement du W3C aux États-Unis.
  Peut-être plus important encore, le Silicon Valley commence à investir dans les possibilités commerciales du Web, notamment Java et la formation de Netscape. La dynamique du développement du Web se déplace vers l'Ouest et ne reviendra jamais en Europe.

* La plupart des grands "jardins clos" — CompuServce, AOL, Minitel — résistent au Web et à Internet.  
  Au milieu des années 90, ils disparaissent ou sont ne passe de devenir des portails web.

  MSN (*Microsoft Network*) est le seul qui aurait pu constituer un défi sérieux. Les dizaines de millions de copies de Windows 95 sont prêtes à se connecter à ce réseau privé, qui possède des protocoles propriétaires: il aurait pu devenir le grand service en ligne du monde presque du jour au lendemain.

  Mais en 1995, le Web se développe rapidement, et Bill Gates (PDG de Microsoft) décide qu'il vaut mieux se battre au sein du Web que contre le Web lui-même. En un seul mémo, il change complètement la stratégie de l'entreprise: se concentrer sur le Web dans presque tous les produits. MSN devient un portail Web.

* Fin 1996, les utilisateurs du Web atteignent 36 millions, devenant ainsi la plus grande communauté d'utilisateurs et dépassant les quelques 30 millions du Minitel français, système en ligne le plus populaire jusqu'à présent. Fin des années 2000, le Web comptera 360 millions d'utilisateurs et en 2010, 2 milliards.

## Le sans-fil

* L'opérateur japonais de téléphonie mobile NTT DoCoMo crée le standard de réseau i-mode pour les données mobiles en 1999. En 2002, plus de 32 millions d'abonnées l'utilisent sur leur téléphones pour accéder au web, e-mail, paiements mobile, streaming vidéo, et bien d'autres fonctions que le reste du monde ne verra pas avant près de 10 ans.

  Les protocles i-mode, une version simplifiée du langage web HTML standard, sont conçus pour fonctionner avec des appareils dotés de petits écrans, des boutons limités et sans clavier. Les systèmes connexes comme la WAP (*Wireless Access Protocol*) ont moins de clients, mais ils contribuent tous à faire de la navigation mobile un marché de masse.

* En 1999, le standard de réseau radio à courte portée IEEE 802.11b est rebaptisé "Wi-Fi" par la Wi-Fi Alliance. C'est la même année qu'Apple lance son routeur Wi-Fi "Airport" et intègre la connectictivité Wi-Fi dans les nouveaux Mac. Ces produits et d'autres produits grand public contribuent à populariser les connexions sans fil au travail, dans les cafés et à la maison.

## Le Web 2.0

* Le concept original du Web, et de nombreux systèmes antérieurs au Web, dépendaient fortement des contributions des utilisateurs. Pourtant, dans les années 90 nombreux sont les sites Web qui ressemblent davantage à des émissions de radio ou de télévision traditionnelles: les fournisseurs diffusent du contenu à des surfeurs passifs. C'est en partie au fait que les principaux navigateurs Web dominants n'ont pas de capacité d'édition.

* À partir du début des années 2000, certains sites commencent à aider les utilisateurs à générer leurs propres sites — wikis, blogs, sites de réseaux sociaux, etc. Les sites de partage de photos et de vidéos profitent de la multiplication des connexions Internet plus rapides pour permettre aux utilisateurs de télécharger et de parcourir ces médias.

* En 2004, O'Reilly and Associates popularise le nom "Web 2.0" avec sa conférence du même nom. La plupart des navigateurs ne prennent toujours pas en charge l'édition de pages Web, mais les sites Web 2.0 trouvent diverses solutions de contournement pour donner la parole aux utilisateurs: des logiciels de wiki et des blogs avec une fonctionnalité de commentaires.

## La commercialisation

* La bulle Internet (ou *dot-com bubble*) est une bulle boursière survenue à la fin des années 90.

  Alors que les utilisateurs affluent sur le Web, les possibilités semblent illimitées. Presque tout ce qu'on peut faire avec les réseaux précédents est porté sur le Web, et chaque secteur d'activité, communauté, religion et sous-culture se fait une place en ligne.

  Les taux d'intérêts faibles favorisent l'entreprenariat. Et au scepticisme initial cède l'expérimentation, puis une excitation croissante lorsque les gens commencent à penser que les anciennes lois du commerce ne s'appliquent pas à ce nouveau média. Personne ne veut rester à la traîne, ce qui alimente une frénésie de projets commerciaux, dont beaucoup reposent sur des bases fragiles.

* En mars 2000, la bulle finit par éclater: c'est le krash boursier. En un an, le stock market des technologies perd environ 60% de sa valeur. Les start-up spécialisées dans le e-commerce représentent 55% des faillites, les sites de contenus 30%, les 15% restant se partagent entre les différents services internet.

  Le boom et l'effondrement ont leur plus grand effet dans la région de la baie de San Francisco, où se trouve la Silicon Valley, et où se sont produits de nombreux booms depuis la ruée vers l'or.

* En 2004, Google est la première grande société Web à entrer en bourse depuis la période faste de la bulle des dot-com. C'est le résultat direct de la résolution par Google de l'éternel problème auquel étaient confrontés tous les moteurs de recherche précédents: comment tirer profit de la recherche. Le secret se révèle être une forme discrète de publicité, basée sur la mise aux enchères de mots-clés pour qu'ils apparaissent comme "résultats sponsorisés" dans la page de résultats de recherche. Nombreux sont ceux qui considèrent l'introduction en bourse de Google comme le signe que le Web n'est pas seulement sorti du creux de la vague qui a suivi la crise, mais qu'il entre dans une nouvelle période d'expansion.

## Le Cloud

* Dans les années 1960, lorsque les ordinateurs étaient extrêmement coûteux, certaines entreprises proposaient ce qu'on appelait des utilitaires informatiques: elles exécutaient vos programmes et stockaient vos données sur leurs ordinateurs, auxquels vous accédiez à l'aide d'un terminal. Avec le temps, des ordinateurs moins chers ont rendu plus économique pour les entreprises (puis pour les particuliers) la maintenance de leurs propres stations de travail et PC.

  Mais à l'ère du Web, les économies d'échelle réalisées grâce aux gros serveurs Web commerciaux ont commencé à faire pencher la balance dans l'autre sens. À partir du milieu des années 2000, le modèle de l'utilitaire informatique redevient à la mode sous le nom de "cloud" et constitue à nouveau une tendance majeure dans le domaine des réseaux et de l'informatique.

* En 2006, l'Elastic Compute Cloud d'Amazon aide à populariser l'idée. Aujourd'hui les entreprises basées sur le cloud proposent presque tous les logiciels ou services, y compris le stockage de données, comme alternative aux tâches qui pourraient être réalisées sur un ordinateur personnel ou sur des machines gérées par le service informatique d'une entreprise.
