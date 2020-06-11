---
title: SSL
category: other
---

[HTTPS explained with carrier pigeons](https://medium.freecodecamp.org/https-explained-with-carrier-pigeons-7029d2193351)

## SSL/TLS

TLS (Transport Layer Security) et son prédecesseur SSL (Secure Socket Layer) sont des protocoles de sécurisation des échanges. SSL/TLS est ajouté par dessus les packets TCP/IP.

![](https://i.imgur.com/omuf6sd.png)

Les packets TCP/IP n'ayant pas besoin d'être modifiés, il est très facile d'ajouter TLS/SSL sur d'autres protocoles — encapsuler une connexion non protégée, non encryptée avec SSL ou TLS.

![](https://i.imgur.com/uR94tTX.png)

Différentes versions de ces protocoles sont utilisés pour tout type d'applications: navigation web, email, fax, messagerie instannée, voice-over-IP (VoIP).
Ils assurent l'authentification, l'intégrité et la confidentialité des échanges.

## SSL ou TLS

Le protocole SSL a été déprécié en faveur de TLS 1.2 en raison de la vulnérabilité [POODLE (Padding Oracle On Downgraded Legacy Encryption)](https://en.wikipedia.org/wiki/POODLE). SSL reste le terme le plus connu et le plus couramment utilisé. La plupart du temps, quand les gens disent SSL, ils parlent de TLS. C'est ce que je vais faire.

La [RFC 2246](https://www.ietf.org/rfc/rfc2246.txt) contient la documentation complète de TLS.

---

## Clé publique et clé privée

SSL repose sur une paire de clés: une clé publique et une clé privée (clés asymétriques).  
La clé publique peut être obtenu par n'importe qui, tandis que la clé privée reste privée.

Les deux clés sont mathématiquement liées, tel que `Clé_privée(Clé_publique(Message)) = Message` et inversement.  
Recalculer la clé privée à partir de la clé publique est théoriquement faisable mais trop difficile à faire en pratique, même avec de très gros ordinateurs, c'est pourquoi la clé publique est publique.

Ces clés sont utilisées lors du Handshake SSL pour négocier une clé partagée (symétrique).

---

## Négociation de la clé partagée

Un texte encrypté est un *cipher text*.  
Un texte lisible sans étape supplémentaire est un *plain text*.

* Lorsqu'un client initie une connexion vers le serveur, celui-ci envoie son certificat.  
  Le certificat du serveur contient sa clé publique, son nom d'hôte et un certain nombre d'information complémentaires sur le serveur.
  
  ![](https://i.imgur.com/eTc37gi.png)
  
  En plus du certificat, le serveur envoie également une valeur aléatoire de 32 octets.
  
  ```
  Serveur:
  envoie Certificat + NonceServer
  ```

* Le client génère à son tour une valeur aléatoire (le secret *premaster*), la crypte avec la clé publique qu'il a reçue du serveur et envoie cette valeur avec un autre valeur aléatoire de 32 octets.

  ```
  Client:
  CipherPremaster = Clé_publique(Premaster)
  envoie CipherPremaster + NonceClient
  ```

* Le seul moyen de déchiffrer le secret premaster est d'avoir la clé privée.  
  Seul le serveur l'a — et il est crucial que la clé privée reste privée pour assurer la confidentialité des communications.
  
  ```
  Serveur:
  Premaster = Clé_privée(CipherPremaster)
  ```

* Une fois que le serveur a décrypté le secret premaster, le serveur et le client connaissent tout deux cette même valeur ainsi que deux valeurs aléatoires de 32 octets.  
  Chacun de leur côté, ils calculent le secret *master* à partir de ces valeurs.

  ```
  def PRF(secret, label, seed):
    return P_MD5(secret, label + seed) XOR
           P_SHA-1(secret, label + seed);

  Master = PRF(Premaster, "master secret", NonceClient + NonceServer)
  ```

* Le client et le serveur ont désormais un secret partagé (la clé master), qui sera utilisée pour crypter/décrypter toutes les futures communications — dans les deux sens.

---

## Signatures numériques

Une signature numérique permet de garantir qu'un message n'a pas été modifié entre le moment où il a été envoyé et le moment où il a été reçu. Il permet également de garantir que le message a été envoyé par l'expéditeur désiré.

Les signatures numériques sont utilisées de la manière suivante:

* L'expéditeur calcule le *message digest*.  
  Un message digest est une représentation numérique (de taille fixe) d'un message, calculée par une fonction de hashage.  
  Un digest crée à l'aide d'une clé symétrique est connu sous le nom de *Message Authentication Code* (MAC).

  Le digest est ensuite crypté à l'aide de la clé privée.  
  Le résultat est un *signature numérique*. Elle est envoyée avec le message.

  ```
  Digest    = Hash(Message)
  Signature = Clé_privée(Digest)
  ```

* Le destinataire décrypte la signature numérique à l'aide de la clé publique de l'expéditeur et calcule le message digest.  
  Si les deux digests sont identiques, l'intégrité et l'authenticité du message sont vérifiées — autrement dit, on est sûr que le message n'a pas été modifié durant la transmission et qu'il a été envoyé par le serveur (puisqu'il est le seul à avoir la clé privée).

  ```
  Digest  = Hash(Message)
  Valide  = (Clé_publique(Signature) == Digest)
  ```

---

## Suite de chiffrement

Comme il est de nombreux protocoles de chiffrement, le client et le serveur doivent négocier et choisir le protocole à utiliser pour sécuriser la connexion.  
Trois algorithmes distincts doivent être décidés:

* L'algorithme d'échange des clés et d'authentification, utilisé durant le handshake
* L’algorithme de cryptage, utilisé pour chiffrer les données
* L'algorithme MAC, utiliser pour générer le message digest.

La négociation se fait à l'aide de suites de chiffrement (*cipher suite* en anglais) — chaque suite de chiffrement décrit entre autres le protocole et la longueur des clés. Par exemple, la suite de chiffrement `SSL_RSA_WITH_RC4_RC4_128_MD5` spécifie

* L'algorithme RSA, pour l'échange des clés et l'authentification
* L'algorithme RC4, en utilisant une clé de 128 bits, pour l'encryption des données
* L'algorithme MD5, pour MAC

Quand le client initie une connexion vers le serveur, il envoie la suite des suites de chiffrement qu'il supporte — il s'agit des *cipher specs*.  
Le serveur choisira le chiffrement le plus fort que lui et le client supporte.  
Si la connexion échoue, il réessaiera automatiquement avec un protocole inférieur, tel que TLS 1.0 ou SSL 3.0, jusqu'à ce que le handshake réussisse.

Toutes les suites de chiffrement ne sont pas fortes. Certaines peuvent être craquées en quelques minutes. Une manière d'éviter cette faille de sécurité est de désactiver SSL 3.0 côté serveur ou côté client.

[Tester vos configurations SSL](https://www.ssllabs.com/ssltest/)

---

## Man in the middle

Un point faible des algorithmes à clés asymétriques est la propagation des clés publiques: si, au début de la connexion, quelqu'un intercepte la réponse du serveur et renvoit sa propre clé publique à la place, il peut alors intercepter toutes les requêtes suivantes du client — se faisant passer pour le serveur — les décrypter puis les envoyer au véritable serveur — se faisant passer pour le client. Même chose dans l'autre sens.

C'est ce qu'on appelle une attaque *man in the middle* (MITM). Cette technique est plus sophistiquée que simplement lire les communications qui passent sur le réseau, mais cela compromet tout de même la confidentialité des communications.

---

## Autorité de Certification

Pour prévenir les attaques MITM, il existe des entités spécialisées dans la vérification des identités physiques, les autorités de certification (*Certificate Authority* en anglais ou CA).  
La vérification varie considérablement d'une CA à l'autre. Par exemple, GoDaddy vérifie s'il peut envoyer un email au propriété du site — tel qu'indiqué dans les enregistrements DNS.

Après vérification, la CA génère un certification de serveur, ajoute sa propre identité dans la section "Issuer" et ajoute sa signature numérique (en utilisant sa propre clé privée).  
Cela garantit que le serveur a bien été vérifié par cette CA et que la clé publique à l'intérieur lui appartient bien.

Maintenant, le client peut faire confiance au certificat du serveur s'il a confiance que la CA a vérifié le serveur avant de la signer. En d'autres termes, si le client fait confiance à l'autorité de certification, il fait confiance à tous certificats de serveur qu'elle a signé.

---

## Trust Store

Les navigateurs sont livrés avec une liste pré-installée de CA de confiance (*trusted CA* en anglais), aussi connue sous le nom de *Trusted Root CA store* — réserve de CA de confiance racine.  
Pour être ajoutée à cette liste, l'entreprise doit se conformer aux normes de sécurité et d'authentification établies par les navigateurs et faire l'objet d'un audit.

Si la CA ayant signé le certificat du serveur n'est pas dans cette liste, le navigateur affiche un avertissement — que [le certificat n'est pas fiable](https://www.sslshopper.com/ssl-certificate-not-trusted-error.html).  
L'utilisateur peut ajouter manuellement de nouveaux certificats de CA à son trust store.

---

## Chaînes de certificats

Une autorité de certification peut non seulement faire confiance à des serveurs, mais aussi à d'autres autorités de certifications.  
Ces CA peuvent à leur tour faire confiance à d'autres CA et serveurs, et ainsi de suite. Ce principe est souvent appelé une chaîne de confiance (*chain of trust* en anglais).

La CA au début de la chaîne, celle à laquelle l'utilisateur doit faire confiance, est appelée la CA racine (*root CA* en anglais). Les CA déléguées sont appelées des *CA intermédiaires* ou *subordonnées*.

Cela permet à la clé privée de la root CA de rester hors-ligne, qu'elle ne soit utilisée que pour signer des certificats intermédiaires.  
Les CA intermédiaires peuvent être utilisés pour signer des certificats de serveur à la demande et ont généralement une période de validité plus courte que les root CA.  
Cela facilite la gestion et la révocation des signatures si la clé privée (de la CA intermédiaire) est compromise.

Le serveur doit détenir tous les certificats intermédiaires ainsi que son propre certificat.

Pour info: Depuis Apache 2.4.8, la directive `SSLCertificateFile` a été étendue pour charger automatiquement les certificats intermédiaires à partir du certificat du serveur. Avant cela, la directive `SSLCertificateChainFile` (désormais obsolète) devait être utilisée.

---

## Période de validité

Chaque certificat a une date de "pas avant" et une date de "pas après" (dates d'activation et d'expiration). Le certificat sera rejeté si la date en cours est en dehors de cette période.

C'est nécessaire car la clé privée est utilisée à plusieurs reprises pour authentifier les connexions SSL. Un attaquant *très* déterminé pourrait utiliser les détails de ces authentifications pour essayer de déterminer la valeur de la clé privée.  
Par conséquent, il est important de changer la clé privée de temps en temps. La période de validité force non seulement l'administrateur du site à le faire, mais empêche également un attaquant qui a compromis la clé privée de l'utiliser.

---

## Révocation

Les certificats peuvent être révoqués par les autorités de certification — par exemple, si la clé privée n'est plus secrète ou le propriété a changé d'organisation.  
L'état de révocation des certifications peut être vérifié à l'aide du protocole OCSP (Online Certificate Status Protocol) ou de la liste de révocation des certificats (*Certificate Revocation List* en anglais, ou CRL).

### CRL

Lorsqu'une autorité de certification reçoit une requête CRL d'un navigateur, elle renvoie la liste complète de tous les certificats révoqués qu'elle gère.  
Le navigateur doit ensuite analyser la liste pour déterminer si le certificat du site a été révoqué.  
Les CRL sont mises en cache pour éviter le coût lié à leur téléchargement répété. Cela en fait une méthode de distribution en temps réel inefficace.

### OCSP

Le protocole OCSP est une alternative aux CRL. Le navigateur envoie le certificat du serveur à l'autorité de certification pour vérification. La CA retourne la valeur "good", "revoked" ou "unknown".

### OCSP stapling

Le serveur peut également activer l'OCSP stapling (l'agrafage OCSP).  
Au lieu de demander au navigateur d'effectuer une connexion externe au serveur de la CA durant le SSL handshake, le serveur le fait lui-même à des intervalles définies par la CA.  
La CA répond avec l'état du certificat et un horodatage signé numériquement.

Lorsque le navigateur se connecte au site Web, le serveur groupe (ou "agrafe") le message reçut par la CA. Le navigateur n'a plus qu'à vérifier l'horodatage et la signature.

---

## Types de certificats

Les autorités de certification peuvent délivrer différents types de certificats SSL:

* Domain Validated (DV)  
  Ils sont délivrés avec très peu de validation (généralement automatisée): le serveur n'a qu'à prouver qu'il détient son nom de domaine. C'est le type de certificat de plus courant.

* Extended Validation (EV)
  Cela exige une validation approfondie de l'entreprise et de son autorisation, cela peut prendre quelques jours à quelques semaines pour la recevoir.  
  Les certificats DV n'assurent pas l’identité de l'organisation en possession du serveur, les certificats EV si. Ils sont plus chers que les autres types de certificats mais activent la "barre d'adresse verte" dans la plupart des navigateurs. Ex: Paypal.

* Wildcard  
  Ils peuvent être utilisés pour sécuriser un nombre illimité de sous-domaines sur un même nom de domaine.  
  Par exemple, un certificat pour `*.mondomaine.com` fonctionnera pour `secure.mondomaine.com`, `www.mondomaine.com`, etc.

* Multi-domaine  
  Aussi connus sous le noms de certificats de Communications Unifiées (*Unified Communications* en anglais, ou UC) ou certificats SAN.  
    Ils utilisent une section SAN (Subject Alternative Names) pour sécuriser une liste d'hôte définie.

* Code Signing  
  Ce type de certificat est différent des autres: il s'agit d'un fichier contenant une signature numérique qui peut être utilisée pour signer des exécutables et des scripts.

  Les certificats auto-signés (*self-signed* en anglais) sont des certificats qui sont signés avec la clé privée du serveur plutôt qu'avec une autorité de certification.  
  Cela permet d'activer l'encryption des communications mais ne protège pas des attaques MITM. Ils sont généralement utilisés en développement.

---

## Demande de Signature de Certificat

Une demande de signature de certificat (*Certificate Signing Request* en anglais, ou CSR) est un fichier encodé qui fournit un moyen normalisé d'envoyer la clé publique du serveur à une autorité de certification — avec un certains nombre d'informations à propos de l'entreprise et du nom de domaine (nom commun, organisation, etc).

Une fois le CSR crée, il faut généralement

1. l'envoyer à l'autorité de certification choisie en copiant/collant la CSR dans la page web de la CA

2. prouver la possession du domaine en complétant un challenge définit par la CA. Il peut s'agir

   * de placer un fichier donné à un emplacement spécifique sur le serveur web
   * d'ajouter une entrée DNS donnée pour le nom de domaine cible
   * de recevoir un email à l'adresse [correspondant au domaine](https://www.namecheap.com/domains/whois/) et envoyer son contenu sur la page web de la CA
   * certaines CA appellent le numéro de téléphone indiqué dans le registre WHOIS

3. télécharger le certificat du serveur (signé par la CA) et l'installer sur le serveur

---

## Automated Certificate Management Environment

Soumettre le CSR, prouver la possession du nom de domaine, télécharger le certificat, tout cela se fait par l'utilisateur en suivant interactivement les instructions de la CA. Le protocole ACME (Automated Certificate Management Environment) a été crée pour automatiser le processus de vérification et de délivrance des certificats, pour qu'il se fasse sans intervention humaine.

---

## Let's Encrypt

Let's Encrypt est une CA à but non lucratif qui délivre des certificats DV gratuitement. Tout [client compatible](https://letsencrypt.org/docs/client-options/) avec le protocole ACME peut demander et récupérer un certificat de la part de Let's Encrypt, le plus populaire est `certbot`.  
Les certificats sont valides pendant 90 jours, mais ils peuvent être renouvelé automatiquement indéfiniment.

---

## PKI

On appelle infrastructure à clé publique (*Public Key Infrastructure* en anglais, ou PKI) l'ensemble des éléments (matériel, logiciels, personnes, politiques et procédures) nécessaires pour créer, gérer, distribuer, utiliser, stocker et révoquer des certificats numériques.

Toutes les autorités de certification commerciales/à but non lucratif ont une PKI sous-jacente.  
Les larges organisations et organismes gouvernementaux ont parfois leur propre PKI.

Cloudflare a son sa PKI open-source: [CFSSL](https://github.com/cloudflare/cfssl). Let's Encrypt l'utilise aussi.

---

## SSL Handshake

Le handshake SSL a 3 rôles: négocier la suite de chiffrement, authentifier le serveur (voire le client) et échanger la clé symétrique.

![](https://i.imgur.com/pczfBx6.png)

Le processus est comme suit:

1. Client Hello    
   Le client envoie la version du protocole supportée la plus élevée, les spécifications de chiffrement (par ordre décroissant de préférence) et une valeur aléatoire de 32 octets.

    ```
    Secure Socket Layer
      SSLv2 Record Layer: Client Hello
          Length: 103
          Handshake Message Type: Client Hello (1)
          Version: SSL 3.0 (0x0300)
          Cipher Spec Length: 78
          Session ID Length: 0
          Challenge Length: 16
          Cipher Specs (26 specs)
              Cipher Spec: SSL2_RC4_128_WITH_MD5 (0x010080)
              [ more Cipher Specs deleted ]
          Challenge
    ```

2. Server Hello  
   Le serveur choisit la suite de chiffrement et une valeur aléatoire de 32 octets.

   ```
    Secure Socket Layer
      SSLv3 Record Layer: Handshake Protocol: Server Hello
          Content Type: Handshake (22)
          Version: SSL 3.0 (0x0300)
          Length: 74
          Handshake Protocol: Server Hello
              Handshake Type: Server Hello (2)
              Length: 70
              Version: SSL 3.0 (0x0300)
              Random
                  gmt_unix_time: Apr 24, 2006 11:04:15.000000000
                  random_bytes: FE81ED93650288A3F8EB63860E2CF68DD00F2C2AD64FCD2D…
              Session ID Length: 32
              Session ID (32 bytes)
              Cipher Suite: TLS_RSA_WITH_AES_256_CBC_SHA (0x0035)
              Compression Method: null (0)
    ```

3. Certificate  
   Le serveur envoie son certificat ainsi que les certificats des CA intermédiaires, s'il y en a.

   ```
    Secure Socket Layer
      SSLv3 Record Layer: Handshake Protocol: Certificate
          Content Type: Handshake (22)
          Version: SSL 3.0 (0x0300)
          Length: 836
          Handshake Protocol: Certificate
              Handshake Type: Certificate (11)
              Length: 832
              [ Certificate details deleted ]
    ```

4. Certificate Request (optionnel)  
   Si le serveur exige des certificats client (définit dans les configurations du serveur), il envoie une demande de certificat au client.

5. Server Key Exchange (optionnel)  
   Dans le cas où Diffie-Hellman Ephemeral est utilisé pour l'échange de clé: le serveur envoie une clé supplémentaire.  
   Les protocoles d'échange de clés tels que DH ou RSA utilisent les numéros du certificat SSL.

6. Server Hello Done  
   Ce message indique que le serveur a terminé et attend une réponse du client

7. Le client vérifie le certificat du serveur. Il vérifie
   - la signature numérique
   - la chaîne de certificats
   - les dates d'expiration et d'activation
   - le statut de révocation

8. Certificate (optionnel)  
   Si demandé (avec une demande de certificat), le client envoie son propre certificat.

9. Certificate Verify (optionnel)  
   Le client envoie une chaîne aléatoire encryptée avec sa clé privée.  
   De cette manière, le serveur peut confirmer qu'il l'a bel et bien.

10. Client Key Exchange  
    Le client envoie la clé premaster

    ```
    Secure Socket Layer
      SSLv3 Record Layer: Handshake Protocol: Client Key Exchange
          Content Type: Handshake (22)
          Version: SSL 3.0 (0x0300)
          Length: 132
          Handshake Protocol: Client Key Exchange
              Handshake Type: Client Key Exchange (16)
              Length: 128
    ```

11. Change Cipher Spec  
    Le client passe au cryptage symétrique

    ```
    Secure Socket Layer
      SSLv3 Record Layer: Change Cipher Spec Protocol: Change Cipher Spec
          Content Type: Change Cipher Spec (20)
          Version: SSL 3.0 (0x0300)
          Length: 1
          Change Cipher Spec Message
    ```

12. Client Finished  
    Le client envoie un hash de l'échange complet du handshake, encrypté avec la clé symétrique.  
    Ce message indique que la partie client du handshake est terminée.

    ```
    Secure Socket Layer
     SSLv3 Record Layer: Handshake Protocol: Finished
         Content Type: Handshake (22)
         Version: SSL 3.0 (0x0300)
         Length: 64
         Handshake Protocol: Finished
             Handshake Type: Finished (20)
             Length: 36
             MD5 Hash
             SHA-1 Hash
    ```

13. Si le serveur requiert un certificat client, il vérifie que le certificat a été reçu et qu'il est valide.

14. Change Cipher Spec  
    Le serveur passe au cryptage symétrique.

    ```
    Secure Socket Layer
      SSLv3 Record Layer: Change Cipher Spec Protocol: Change Cipher Spec
          Content Type: Change Cipher Spec (20)
          Version: SSL 3.0 (0x0300)
          Length: 1
          Change Cipher Spec Message
      SSLv3 Record Layer: Handshake Protocol: Finished
          Content Type: Handshake (22)
          Version: SSL 3.0 (0x0300)
          Length: 64
          Handshake Protocol: Finished
              Handshake Type: Finished (20)
              Length: 36
              MD5 Hash
              SHA-1 Hash
    ```

15. Server Finished  
    Le serveur envoie un hash de l'échange complet du handshake, encrypté avec la clé symétrique.  
    Ce message indique que la partie serveur du handshake est terminée.

16. Le serveur et le client peuvent maintenant échanger des données d'application (par exemple des requêtes HTTP) encryptées avec la clé symétrique.  
    Le protocole utilisé est alors le Record Protocol.

[Processus de négociation SSL](https://www.synetis.com/2015/11/27/ssl-tls-explication/)
