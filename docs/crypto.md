---
title: Cryptographie
category: Sécurité informatique
---

La *cryptographie* permet d'assurer la confidentialité et l’intégrité des données sur les réseau dignes de confiance, d'authentifier la source de traffic et d'assurer la non-répudiation des transactions — à condition bien entendu de l'implémenter correctement.
Dans la vie de tous les jours, la cryptographie est utilisée pour les emails, le e-commerce, les données bancaires, les téléphones portables, etc.

## Encryption, decryption

L'encryption/decryption est un mécanisme utilisé pour garantir la confidentialité des données.

**Encrypter**, c'est transformer un texte en clair en texte cipher en utilisant un algorithme de cryptographie et une clé d'encodage.  
**Decrypter**, c'est transformer un texte cipher en texte en clair en utilisant un algorithme de cryptographie et une clé de décodage.  
**Briser l'encryption**, c'est trouver le texte en clair à partir du texte cipher sans connaître la clé de decryption.

---

## Clés symétriques

Certains algorithmes utilisent des **clés symétriques**: la clé utilisée pour décoder les données est la même que celle utilisée pour encoder les données. L'émetteur et le récepteur partagent donc cette même clé et la confidentialité de la communication repose sur la confidentialité de cette clé.

Les clés symétriques mesurent entre 40 et 168 bits.

![](https://i.imgur.com/DHYBYMa.png)

L'encryption peut se faire
* **par bloc** (block cipher). On encrypte des bloc de n bits (texte en clair) vers des blocs de n bits (texte cipher), en utilisant des substitutions et/ou permutations. Algorithmes: code de César, DES, IDEA, AES
* ou **par flot** (stream cipher). On traite des données de longueur quelconque, en utilisant des calculs simples tels que le XOR, modulo et des rotations de bits. Algorithmes: RC4, Rabbit

### Code César

Avec un décalage de 13:

![](https://i.imgur.com/IHDJig8.jpg)

Les algorithmes d'encryption symétrique sont généralement très rapides (hardwired) mais la gestion des clés et leur partage peut être problématique. Pour N communications, il faut N(N-1)/2 clés.

[Techniques de cryptographie AES, DES et RSA](https://fr.slideshare.net/houdamoutaoukil/technique-de-crypthographie-aes)

---

## Clés asymétriques

D'autres algorithmes utilisent des **clés asymétriques**, une clé permet d'encoder les données et une autre de décoder les données. Une clé permet d'encoder les données, elle est générée par le récepteur et est donnée à tous les émetteurs (elle est publique): n'importe qui y a accès et peut encoder les données. Une clé permet de décoder les données, seul le récepteur la possède (elle est privée): lui seul est en mesure de décoder les données. Pour faire simple, le récepteur donne un cadenas à tout le monde mais conserve la clé qui permet de l'ouvrir.

Les clés asymétriques mesurent entre 512 et 2048 bits.

![](https://i.imgur.com/Kccz3EP.png)

<ins>Algorithmes</ins>: RSA, Diffie-Hellman, Elliptic curves, ElGamal

Les algorithmes d'encryption asymétrique sont relativement lents par rapport aux algorithmes d'encryption symétrique mais ont l'avantage d'une gestion faciles des clés. Ils sont généralement utilisés pour transmettre des informations très courtes: signatures digitales, partage des clés symétriques.

### Algorithme RSA

1. on choisit deux nombres premiers *p* et *q*

       p = 17, q = 19

2. on calcule leur produit *n*

       n = p*q
         = 17*19
         = 323

3. on choisit un nombre *e* premier avec *(p-1)(q-1)*.  
   Deux nombres sont premiers entre eux s'ils n'ont pas d'autre facteur commun que 1.

       (p-1)(q-1) = 16*18
                  = 288
                  = 2 * 2 * 2 * 2 * 2 * 9
       e = 5

4. on choisit un nombre *d* tel que *ed-1* soit un multiple de *(p-1)(q-1)*

       ed-1 = (p-1)(q-1)x
       5d-1 = 288x

       si x = 3, d = 173

5. on distribue le couple `(n, e)` comme clé publique

       (n, e) = (323, 5)

6. on garde le couple `(n, d)` comme clé privée

       (n, d) = (323, 173)

7. on chiffre le message *M* avec `cipher = M^e mod n`

       M =  B   O   N   J   O   U   R
         =  2  15  14  10  15  21  18

       C = M^e mod n
         = M^5 mod 323
         = 32   2  29 193   2  89  18

       (Ex: (2**5)%323 = 32)

8. on déchiffre le cipher *C* avec `message = C^d mod n`

       C = 32   2  29 193   2  89  18

       M = C^d mod n
         = C^173 mod 323
         =  2  15  14  10  15  21  18

       (Ex: (32**173)%323 = 2)

Le chiffrement asymétrique repose donc sur la difficulté de factoriser *n*.  
[Exemple calculs en php encryption/decryption](https://gist.github.com/a-mt/ff8653cdadda419f9066e1ab46ccb469)

---

## Hashing

Une fonction de hashing génère une empreinte digitale de longueur n quelle que soit la longueur des données en entrée et génère toujours le même résultat pour les mêmes données. Il n'est pas possible de récupérer les données en entrée à partir du résultat, on ne peut que comparer le hash obtenu.

![](https://i.imgur.com/kYkqfCG.png)

Un **HMAC** est un code d'authentification de message calculé par une fonction de hashage. Utilisé en combinaison avec une clé secrète, il permet de vérifier l'intégrité et l'authenticité d'un message.  
Grâce au hashing on peut par exemple
* vérifier que les données n'ont pas été modifiées (HMAC)

      // Reconnexion par cookie
      define('COOKIE_KEY','*R}@ox.i{Pu&`n\sOb5-7Ga(X$mTu^#U?C;;r~89p2Kn4O?YA"kfUm+g5:@D\qyIN3tccRy');

      if(isset($_COOKIE['idClient'])
        && $_COOKIE['cookiePass'] == md5(COOKIE_KEY . $_COOKIE['idClient'])) {
        ...
      }

* stocker des mots de passe encryptés en base de données

      SELECT *
      FROM client
      WHERE email  = ${dbh->quote($_POST['email'])}
      AND password = ${dbh->quote(md5($_POST['password']))}

* générer un identifiant de longueur fixe aléatoirement

      $id = md5(uniqid(time()));

<ins>Algorithmes</ins>: MD5 (128 bits), SHA-1 (160 bits), SHA-2 (256 ou 512 bits)

---

## Signatures digitales

Une signature digitale est un mécanisme utilisé pour garantir l'authentification et la non-répudiation d'un document.

Une signature digitale est
- **authentique**. Cela prouve que le document a été signé par l'émetteur de manière délibérée.
- **insalfisable**. Personne d'autre que l'émetteur peut avoir généré la clé.
- **non réutilisable**. Une signature sur un document donné ne peut pas être réutilisée pour un autre document.
- **inaltérable**. Le document une fois signé ne peut plus être modifié.
- **non répudiable**. L'émetteur ne peut pas nier le fait d'avoir signé le document

<ins>Algorithmes</ins>: Signature RSA, signature DS    

### Signature RSA

1. Un hash du document est généré, généralement avec SHA-256.
2. Ce hash est chiffré par l'émetteur avec sa clé privée.

       Signature = Cle_privee(Hash(Document))

3. N'importe qui peut par la suite vérifier avec la clé publique que la signature a bien été générée avec la clé privée de l'émetteur

        Cle_publique(Signature) = Hash(Document)

La signature RSA est la méthode de clé digitale la plus utilisée.  
Elle est notamment utilisée par le protocole [SSL](ssl.md)

---

## Gestion de clés

Par gestion des clés on entend la génération, vérification, sauvegarde, échange et révocation/destruction des clés.  
Avant de pouvoir envoyer des données a une personne, il est nécessaire de connaître sa clé publique. Pour s'assurer que la clé publique obtenue est bien celle de la personne que l'on cible et non celle d'une personne malveillante qui a intercepté la communication et modifié la clé (man in the middle attack), il existe différentes méthodes.

### Code de confirmation

Utiliser un code de confirmation via un autre moyen de communication, par exemple par SMS ou par mail

### Certificats

1. Tout le monde fait confiance a une autorité centrale dont on connait la clé publique, une **autorité de certification**.
2. Lorsqu'une personne physique ou morale souhaite mettre en place un serveur web utilisant une communication sécurisée, elle demande à la CA de lui créer un certificat
3. La CA vérifie la validité de la requête, génère un certificat et le signe avec sa propre clé privée
4. Le certificat est retourné à l'émetteur, et est conservé par ce dernier.  
  Désormais l'émetteur enverra son certificat (lequel contient sa clé publique).
5. Le récepteur peut vérifier que `cle_publique_CA(signature) = cle_publique_utilisateur`.  
  L'identité de la personne est donc confirmée par l'autorité de certication.

Les certificats sont très utilisés
- par les serveurs web (SSL/TLS)
- par les navigateurs web (SSL/TLS)
- par le clients mail (S/MIME)
- par les VPN IPSec (IKE)

<ins>Exemple de certificat</ins> :

``` plain
Certificate:
  Data:
      Version: 3 (0x0)
      Serial Number: 7829 (0x1e95)
      Signature Algorithm: md5WithRSAEncryption
      Issuer: C=ZA, ST=Western Cape, L=Cape Town, O=Thawte Consulting cc,
              OU=Certification Services Division,
              CN=Thawte Server CA/emailAddress=server-certs@thawte.com
      Validity
          Not Before: Jul 9 16:04:02 1998 GMT
          Not After : Jul 9 16:04:02 1999 GMT
      Subject: C=US, ST=Maryland, L=Pasadena, O=Brent Baccala,
               OU=FreeSoft, CN=www.freesoft.org/emailAddress=baccala@freesoft.org
      Subject Public Key Info:
          Public Key Algorithm: rsaEncryption
          RSA Public Key: (1024 bit)
              Modulus (1024 bit):
                  00:b4:31:98:0a:c4:bc:62:c1:88:aa:dc:b0:c8:bb:
                  33:35:19:d5:0c:64:b9:3d:41:b2:96:fc:f3:31:e1:
                  66:36:d0:8e:56:12:44:ba:75:eb:e8:1c:9c:5b:66:
                  70:33:52:14:c9:ec:4f:91:51:70:39:de:53:85:17:
                  16:94:6e:ee:f4:d5:6f:d5:ca:b3:47:5e:1b:0c:7b:
                  c5:cc:2b:6b:c1:90:c3:16:31:0d:bf:7a:c7:47:77:
                  8f:a0:21:c7:4c:d0:16:65:00:c1:0f:d7:b8:80:e3:
                  d2:75:6b:c1:ea:9e:5c:5c:ea:7d:c1:a1:10:bc:b8:
                  e8:35:1c:9e:27:52:7e:41:8f
              Exponent: 65537 (0x10001)
  Signature Algorithm: md5WithRSAEncryption
      93:5f:8f:5f:c5:af:bf:0a:ab:a5:6d:fb:24:5f:b6:59:5d:9d:
      92:2e:4a:1b:8b:ac:7d:99:17:5d:cd:19:f6:ad:ef:63:2f:92:
      ab:2f:4b:cf:0a:13:90:ee:2c:0e:43:03:be:f6:ea:8e:9c:67:
      d0:a2:40:03:f7:ef:6a:15:09:79:a9:46:ed:b7:16:1b:41:72:
      0d:19:aa:ad:dd:9a:df:ab:97:50:65:f5:5e:85:a6:ef:19:d1:
      5a:de:9d:ea:63:cd:cb:cc:6d:5d:01:85:b5:6d:c8:f3:d9:f7:
      8f:0e:fc:ba:1f:34:e9:96:6e:6c:cf:f2:ef:9b:bf:de:b5:22:
      68:9f
```

---

## Protocoles sécurisés

Les mécanismes et algorithmes de cryptographie peuvent être utilisés pour sécuriser la communication entre deux machines.

![](https://i.imgur.com/Zp4P6LJ.png)
