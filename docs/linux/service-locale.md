---
title: Locale
category: Linux
---

## Théorie

* Une *locale* est un ensemble de règles linguistiques et culturelles.  
  Par exemple: la devise aux US est le dollar, représenté par le signe $; tandis que la devise au Royaume-Uni est le livre sterling, représenté par £.  
  Autre exemple: aux US, un nombre avec des décimales s'écrit 3.1 alors qu'en France il s'écrirait 3,1

* Les programmes sont souvents écrits de telle sorte qu'ils ne font aucun a priori sur l'endroit du monde où ils seront utilisés. Ces programmes dépendent des paramètres de locales pour dicter les règles concernant les nombres, la devise, la langue à utiliser, etc. C'est ce qu'on appelle l'*internationalition*, ou i18n.

  On peut également entendre parler de *localisation*, ou l10n, qui est un sous-ensemble de l'internationalisation ne portant que sur les règles linguistiques.  
  Par exemple: en français, 0 est singulier (0 résultat); tandis qu'en anglais 0 est pluriel (0 results).

## Locales Linux

* Sous Linux, le format d'une locale est comme suit:

  ```
  Category="Language_Territory.CharacterSet@Modifier"
  ```

  Par exemple: `LANG="en_US.UTF-8"` ou `LC_MONETARY="ca_ES.UTF-8@valencia"`

* Il y a 12 catégories de locales. Certaines sont définies par le standard POSIX, d'autres sont spécifiques à Linux:

  | Catégorie         | Description
  |---                |---
  | LC_ADDRESS        | Format des adresses (physiques)
  | LC_COLLATE        | Comment ordonner et trier les chaînes de caractères
  | LC_CTYPE          | Détermine l'interprétation des caractères et le comportement des classes de caractères utilisées dans les regex et expansion de nom
  | LC_IDENTIFICATION | Metadonnées de la locale
  | LC_MEASUREMENT    | Unités de mesurement
  | LC_MESSAGES       | Language des messages système
  | LC_MONETARY       | Devise monétaire
  | LC_PAPER          | Dimensions des pages imprimées
  | LC_NAME           | Civilité
  | LC_NUMERIC        | Format des nombres
  | LC_TELEPHONE      | Format des numéros de téléphne
  | LC_TIME           | Format des dates et temps

  Plus d'infos sur leur utilisation: `man 7 locale`

* Il existe des catégories spéciales:

  - LANG permet de définir une locale par défaut. Cette valeur sera utilisée pour toutes les catégories qui ne sont pas explicitement définies

    ```
    LANG=C.UTF-8
    ```

  - LC_ALL permet d'écraser LANG et toutes les variables LC_*, qu'elles soient définies ou non.

    ```
    LC_ALL=
    ```

  - LANGUAGE permet de spécifier des préférences de locales avec fallback, séparés par des deux-points. Certains programmes, tel que `gettext`, utilisent cette variable.  
    Par exemple: utiliser le français canadien si disponible, sinon le français de la france métropolitaine, sinon le français générique.

    ```
    LANGUAGE=fr_CA:fr_FR:fr
    ```

* Il a deux valeurs de locales spéciales:  
  Lorsque la locale définie est C ou POSIX, alors tout fonctionnera comme défini dans le langage de programmation C. C'est pratique pour les scripts shell

---

## Afficher la locale

* La commande `locale` permet d'afficher toutes les locales et leurs valeurs

  ```
  $ locale
  LANG=en_GB.UTF-8
  LANGUAGE=en_GB
  LC_CTYPE="en_GB.UTF-8"
  LC_NUMERIC=fr_FR.UTF-8
  LC_TIME=fr_FR.UTF-8
  LC_COLLATE="en_GB.UTF-8"
  LC_MONETARY=fr_FR.UTF-8
  LC_MESSAGES="en_GB.UTF-8"
  LC_PAPER=fr_FR.UTF-8
  LC_NAME=fr_FR.UTF-8
  LC_ADDRESS=fr_FR.UTF-8
  LC_TELEPHONE=fr_FR.UTF-8
  LC_MEASUREMENT=fr_FR.UTF-8
  LC_IDENTIFICATION=fr_FR.UTF-8
  LC_ALL=
  ```

  Pour voir le détail d'une catégorie:

  ```
  $ locale -ck LC_NUMERIC
  LC_NUMERIC
  decimal_point=","
  thousands_sep=" "
  grouping=3
  numeric-decimal-point-wc=44
  numeric-thousands-sep-wc=8239
  numeric-codeset="UTF-8"
  ```

* Si le système tourne avec systemd, on peut également utiliser `localectl`

  ```
  $ localectl status
     System Locale: LANG=en_GB.UTF-8
                    LC_NUMERIC=fr_FR.UTF-8
                    LC_TIME=fr_FR.UTF-8
                    LC_MONETARY=fr_FR.UTF-8
                    LC_MEASUREMENT=fr_FR.UTF-8
         VC Keymap: fr-latin9
        X11 Layout: fr
         X11 Model: pc105
       X11 Variant: azerty
  ```

* Ou encore afficher le fichier de configuration, qui sera <ins>/etc/locale.conf</ins> ou <ins>/etc/default/locale</ins> suivant la distribution 

  ```
  $ ls /etc/locale.conf || ls /etc/default/locale
  ls: cannot access '/etc/locale.conf': No such file or directory
  /etc/default/locale
  ```

  ```
  $ cat /etc/default/locale
  LANG=en_GB.UTF-8
  LC_NUMERIC=fr_FR.UTF-8
  LC_TIME=fr_FR.UTF-8
  LC_MONETARY=fr_FR.UTF-8
  LC_MEASUREMENT=fr_FR.UTF-8
  ```

## Locales disponibles

Avant de pouvoir utiliser une locale, il faut l'activer 

1. Lister toutes les locales disponibles:  
   Si la locale que vous voulez utiliser n'est pas dans cette liste, il faut l'installer

    ```
    $ locale -a
    bg_BG.utf8
    C
    ca_AD.utf8
    ca_ES.utf8
    ca_ES.utf8@valencia
    ca_FR.utf8
    ca_IT.utf8
    cs_CZ.utf8
    C.UTF-8
    da_DK.utf8
    ```

    ou

    ```
    $ localectl list-locales
    C.UTF-8
    bg_BG.utf8
    ca_AD.utf8
    ca_ES.utf8
    ca_ES.utf8@valencia
    ```

    On peut également lister tous les encodages:

    ```
    $ locale -m
    ANSI_X3.110-1983
    ANSI_X3.4-1968
    ARMSCII-8
    ASMO_449
    BIG5
    BIG5-HKSCS
    BRF
    BS_4730
    BS_VIEWDATA
    CP10007
    ```        

2. Dé-commenter l'entrée dans <in>/etc/locale.gen</ins> puis exécuter `locale-gen`

    ```
    $ sudo cat -n /etc/locale.gen | grep fr
    $ sudo vim /etc/locale.gen
    $ locale-gen
    ```

## Définir une locale

* Une fois activée, on peut définir la locale à utiliser de manière globale (pour tous les utilisateurs du systèmes):

  1. En éditant le fichier de configuration — <ins>/etc/locale.conf</ins> ou <ins>/etc/default/locale</ins> suivant la distribution

      ``` bash
      echo 'LANG="C.UTF-8"' > /etc/default/locale
      ```

  2. Ou en utilisant `localectl --set-locale`

      ``` bash
      localectl set-locale LANG=en_US.UTF-8
      ```

      Ou sous certaines distributions, `update-locale`

* Au niveau utilisateur, on peut définir une variable d'environnement de même nom que la catégorie de locale à écraser

  ``` bash
  $ date
  jeudi 3 novembre 2022, 08:32:48 (UTC+0100)
  $ cal
       Avril 2023       
  di lu ma me je ve sa  
                     1  
   2  3  4  5  6  7  8  
   9 10 11 12 13 14 15  
  16 17 18 19 20 21 22  
  23 24 25 26 27 28 29  
  30                    
  $
  $ export LC_TIME=en_GB.UTF-8
  $ date
  Thu  3 Nov 08:33:13 CET 2022
  $ cal
       April 2023       
  Su Mo Tu We Th Fr Sa  
                     1  
   2  3  4  5  6  7  8  
   9 10 11 12 13 14 15  
  16 17 18 19 20 21 22  
  23 24 25 26 27 28 29  
  30                    
  ```
  ``` bash
  $ LC_NUMERIC=C
  $ printf "%f" 3.1415
  3.141500

  $ LC_NUMERIC=fr_FR.UTF-8
  $ printf "%f" 3.1415
  bash: printf: 3.1415: invalid number
  $ printf "%f" 3,1415
  3,141500
  ```
