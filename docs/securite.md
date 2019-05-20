---
title: Fondamentaux
category: Sécurité informatique
---

## Sécurité & sûreté

La **sécurité** (safety) est une mesure contre les accidents, ex: gilet de sauvetage.  
La **sûreté** (security) est une mesure contre les actes délibérés, ex: vérification des sacs.  
Par abus de langage, on parle généralement de sécurité dans les deux cas.

## Principes fondamentaux

La sécurité informatique doit être capable de garantir trois principes primordiaux :

1. La **confidentialité** (confidentiality), interdire l'accès aux donnés aux personnes non légitimes. Ce qui passe par

   * le contrôle de l'usage de données
   * l'anonymat des données / utilisation d'un pseudonyme
   * des communications "invisibles" des personnes externes

2. L'**intégrité** (integrity), protéger les données de mauvaises modifications ou suppressions. Ce qui passe par

   * l'authenticité: la vérification de l'identité des participants à une communication
   * la non-répudiation: qu'émetteur et récepteur du message ne puissent pas être quelqu'un d'autre que celui qu'il dit être
   * l'auditabilité: l'enregistrement des modifications intervenues sur un fichier ou un système

3. La **disponibilité** (availability), que les données soient disponibles pour les utilisateurs légitimes

![](https://i.imgur.com/UGVYy4R.png)

## Menaces

Pour garantir ces principes, il faut se prémunir  
&ndash; des erreurs et défaillances humaines  
&ndash; des défaillances matérielle (panne, incendie, inondation, etc)  
&ndash; des défaillances logicielles (bug)  
&ndash; de la malveillance informatique interne (virus) ou externe (accès illégal, attaques)

![Statistiques sur les types de menaces](https://i.imgur.com/VcQZj7h.png)

## Prévention des accidents

* Sauvegarder les données et mettre en place un système de restauration
* Utiliser du matériel fiable: onduleur, disques RAID, alimentations, liens réseau et machines multiples
* Placer le matériel dans des sites protégés des accidents naturels  data center

## Prévention de la malveillance

* Respecter le principe du triple A
  * authentification: On authentifie l'utilisateur soit par
    - quelque chose que l'utilisateur connaît: code personnel (CB, digicode), mot de passe ou phrase (passphrase)
    - quelque chose que l'utilisateur possède: clé physique, carte d'accès (puce, bande magnétique), téléphone
    - la biométrie de l'utilisateur: empreinte digitale ou palmaire, reconnaissance visuelle, iris ou rétine de l'oeil, ADN
    - ou une emprunte de l'utilisateur: signature manuscrite, emrpunte vocale

  * autorisation: Une fois authentifié, on définit des autorisations pour cet utilisateur: droit de lecture, écriture, exécution, création, suppression, changement des droits... Les droits d'un groupe d'utilisateur peuvent être gérés au niveau système (ACL) ou au niveau réseau (LDAP).

  * journalisation (accounting): Mise en place de journaux (logs).  
    Les logs sont par défaut situés dans le répertoire `/var/log` sous Unix.  
    Un serveur de logs et une surveillance des logs peut être mise en place: alertes par mail, SMS.

* Mettre en place des mesures de contrôle d'accès: ACL, certificats, One-Time Passwords (OTP)
* Utiliser des réseaux sécurisés: VPN, tunnels
* Mettre en place des mécanismes de chiffrement et de signature électronique: cryptographie
* Mettre en place des système de détection/prévention d'intrusion: IDS
* Mettre en place des système de défense contre les attaques: firewall