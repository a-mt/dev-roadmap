---
title: Installer Linux
category: Linux
---

## Installer Linux

### Pour une installation en dual-boot avec Windows

* Effectuer une défragmentation
* Réduire la partition Windows via le Disk Manager (<kbd>Super</kbd> + <kbd> r </kbd> > `diskmgmt.msc`)
    * Minimum : 60G
    * Pour quelques logiciels / serveur : 100/200G

Si votre partition `D:` est vide et que vous souhaitez installer Linux dessus, faire un clic droit sur cette partition dans le Disk Manager et choisir "Supprimer". Cela retirera le formattage NTFS et laissera l'espace libre pour l'installation Linux.

### Déterminer le BIOS utilisé (Legacy ou UEFI)

* Ouvrir la console en mode admin (Rechercher "cmd" > <kbd>Ctrl</kbd> + <kbd>Maj</kbd> + <kbd>Entrée</kbd>)
* Taper `bcdedit`  
  Si le "path" du chargeur de démarrage Windows est "winload.efi" = UEFI, si "winload.exe" = Legacy

  ``` diff
  Windows Boot Loader
  -------------------
  identifier              {current}
  device                  partition=C:
  +path                    \Windows\system32\winload.efi
  description             Windows 7 Home Premium (recovered)
  locale                  en-US
  recoverysequence        {2844aaae-9978-11e0-a381-afc0564c0e08}
  recoveryenabled         Yes
  osdevice                partition=C:
  systemroot              \Windows
  resumeobject            {3aa4c728-9935-11e0-9f12-806e6f6e6963}
  ```

### Créer une clé bootable

* [Télécharger l'ISO](http://www.ubuntu.com/download/desktop)
* Créer une clé USB bootable à partir de l'ISO, en fonction du BIOS
    * UEFI : [Utiliser Win32DiskImager](https://sourceforge.net/projects/win32diskimager/)
    * Legacy : [Utiliser Unetbootin](https://doc.ubuntu-fr.org/unetbootin)

### Booter sur la clé

* Windows 10 : sur un ordinateur allumé
    * Mettre la clé USB sur l'ordinateur
    * Paramètres > Mise à jour et sécurité > Récupération > Démarrage avancé : Redémarrer maintenant
    * Utiliser un périphérique
* Sinon : sur un ordinateur eteint
    * Mettre la clé USB sur l'ordinateur où installer Ubuntu
    * Démarrer
    * Au moment du (re)démarrage : entrer dans le menu du BIOS (F2, F10, F10 ou Echap au moment du démarrage suivant la marque de l'ordinateur) et changer l'ordre de boot pour mettre la clé USB en premier

### Installer

* Démarrer une session live avec la clé bootable
* Vérifier que le matériel est bien détecté (touchpad, souris, son, luminosité, ...)
* Se connecter à Internet via un cable ethernet
* Procéder à l'installation.  
  À l'écran "type d'installation", le plus simple est de choisir d'"installer Linux à côté de Windows". Linux s'installera sur l'espace vide restant sur la même partition que Windows (généralement /dev/sdb). Ou vous pouvez choisir le [partitionnement manuel](https://openclassrooms.com/fr/courses/43538-reprenez-le-controle-a-laide-de-linux/37192-partitionner-son-disque). NB Depuis Ubuntu 17.04, la swap n'est plus une partition mais un fichier situé dans /swapfile.
* Redémarrer

<ins>Si le démarrage s'effectue toujours sur Windows</ins> :

* Entrer dans le menu du BIOS
* Ajouter "/EFI/ubuntu/shimx64.efi" dans les fichiers EFI autorisés
* Sauvegarder et retourner dans le menu du BIOS
* Modifier l'ordre de boot pour mettre le fichier EFI en premier

---

## Post-installation

### Mettre à jour tous les packets

    sudo apt-get update
    sudo apt-get upgrade

---

### Activer le wifi

    ifconfig                            # Lister les interfaces activées
    iwconfig                            # Lister les interfaces disponibles
     
    sudo ifconfig wlan0 up0             # Activer l'interface wlan0 (wifi)
    sudo /etc/init.d/networking restart # Redémarrer le gestionnaire réseau
     
    sudo iwlist wlan0 scan              # Lister les réseaux wifi

<ins>Troubleshooting</ins> :

* wlan0 n’est pas listé par iwconfig

  ``` shell
  sudo lshw -class network # Lister les cartes réseau
  lspci | grep -i net      # Afficher le nom complet, ex: 07:00.0 Network controller: Qualcomm Atheros QCA6174 802.11ac Wireless Network Adapter (rev 32)
  ```
  Rechercher sur le net s’il existe des drivers, ex "[ubuntu Qualcomm Atheros QCA6174 802.11ac (rev 32)](https://bugs.launchpad.net/ubuntu/+source/linux-firmware/+bug/1520343)"

* SIOCSIFFLAGS: Ressource temporairement non-disponible  
  [Le driver installé n'est pas bon](http://osdir.com/ml/org.user-groups.linux.quebec.aide/2001-07/msg00296.html)

* SIOCSIFFLAGS: Opération impossible du fait de RF-kill soft blocked

  ``` shell
  sudo rfkill list         # Lister les appareils gérés par RF-kill et leur statut
  sudo rfkill unblock wifi # Débloquer un wifi "Soft blocked"
  ```

---

### Activer la répétition des touches

Pour que garder une touche enfoncée répète la touche :

    xset r rate 200 20

Cette commande modifie les configurations ne manière permanente, il n’est donc pas nécessaire de l’ajouter au démarrage

---

### Désactiver la session invité

Modifier le fichier <code>/usr/share/lightdm/lightdm.conf.d/50-ubuntu.conf</code> et ajouter la ligne

    allow-guest=false

Redémarrer

---

### Modifier des entrées Grub (renommer, supprimer)

Rechercher dans <code>/boot/grub/grub.cfg</code>
- L'entrée que vous souhaitez modifier : <code>menuentry 'Windows Boot UEFI loader</code>
- Et le fichier de cette entrée : <code>### BEGIN /etc/grub.d/25_custom</code>

Pour désactiver toutes les entrées du fichier :

``` shell
sudo chmod -x /etc/grub.d/25_custom
sudo update-grub
```

Ou modifier une entrée en particulier

``` shell
sudo cp /etc/grub.d/25_custom /etc/grub.d/25_custom.bak
sudo chmod -x /etc/grub.d/25_custom.bak
sudo gedit /etc/grub.d/25_custom
sudo update-grub
```

[Plus d'infos](http://ubuntuforums.org/showthread.php?t=1287602)

---

### Modifier l'action de la fermeture du capot

Modifier le fichier `/etc/systemd/logind.conf`

    HandleLidSwitch=lock

<ins>Liste des valeurs possibles :</ins>

| Valeur    | Description                                     |
|---        |---                                              |
| poweroff  | Eteindre l'ordinateur (comportement par défaut) |
| reboot    | Redémarrer                                      |
| hibernate | Hiberner                                        |
| suspend   | Suspendre                                       |
| lock      | Locker l'écran                                  |
| ignore    | Ne rien faire                                   |

---

### Désactiver la webcam

* Désactiver le module de la webcam temporairement :

  ``` shell
  sudo modprobe -r uvcvideo
  ```

* Pour qu'elle soit désactivée par défaut au démarrage :

  ``` shell
  sudo vim /etc/modprobe.d/blacklist.conf
  ```

  ```
  #Disabling the webcam device.
  blacklist uvcvideo
  ```

  Redémarrer

* Pour la réactiver temporairement :

  ``` shell
  sudo modprobe uvcvideo
  ```

---

### Modifier la luminosité au démarrage

* Afficher la luminosité en cours

  ``` shell
  xrandr --verbose | grep -i 'backlight\|range' -m 2
  ```

  Exemple :
    
  ```
  BACKLIGHT: 146 
      range: (0, 937)
  ```

* Essayer de modifier la luminosité de l'écran

  ``` shell
  output=`xrandr -q | grep " connected" | cut -d ' ' -f 1`
  xrandr --output $output --set BACKLIGHT 150
  ```

* Pour modifier la luminosité de l'écran au moment du démarrage, ajouter les lignes de commandes à la fin du fichier <code>~/.profile</code>

---

### Modifier le compte utilisateur

* Associer un avatar à son compte  
  Placer une image <code>~/.face</code> de 96×96 pixels dans son home directory

* Créer le répertoire ~/bin  
  Nécessite une reconnection pour être pris en compte

      mkdir ~/bin

---

### Désactiver le clic à 3 doigts

1. Identifier l'ID du touchpad

   ```
   xinput list
   ```

   Par exemple `SynPs/2 Synaptics TouchPad` (id `15`):

   ```
   ⎡ Virtual core pointer                      id=2    [master pointer  (3)]
   ⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
   ⎜   ↳ ELAN Touchscreen                          id=12   [slave  pointer  (2)]
   ⎜   ↳ SynPS/2 Synaptics TouchPad                id=15   [slave  pointer  (2)]
   ⎣ Virtual core keyboard                     id=3    [master keyboard (2)]
       ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
       ↳ Power Button                              id=6    [slave  keyboard (3)]
       ↳ Video Bus                                 id=7    [slave  keyboard (3)]
       ↳ Video Bus                                 id=8    [slave  keyboard (3)]
       ↳ Power Button                              id=9    [slave  keyboard (3)]
       ↳ Sleep Button                              id=10   [slave  keyboard (3)]
       ↳ Integrated Webcam: Integrated W           id=11   [slave  keyboard (3)]
       ↳ Dell WMI hotkeys                          id=13   [slave  keyboard (3)]
       ↳ AT Translated Set 2 keyboard              id=14   [slave  keyboard (3)]
    ```

2. Désactiver le clic du milieu  
   Remplacer `15` par votre propre ID

   ```
   xinput set-button-map 15 1 0 3
   ```

[Touch pad usage will randomly copy-paste text from the screen](https://superuser.com/questions/1300966/touch-pad-usage-will-randomly-copy-paste-text-from-the-screen)

---

### Installer les drivers Nvidia

Pour installer le pilote graphique Nvidia (propriétaire) sous Ubuntu 18.04, avec ses dépendances:

```
sudo ubuntu-drivers autoinstall
sudo reboot
```

#### Secure Boot UEFI

Si le Secure Boot UEFI est activé, l'installation demandera de choisir un mot de passe pour le "MOK Management" (MOK: Machine Owner Key).
Lors du redémarrage, un écran va s'afficher pour confirmer la signature du pilote:

- Choisir "Enroll MOK"

  ![](https://i.imgur.com/oAiwERK.png)

- Vérifier les détails en choisissant "View key 0". Puis "Continue" pour signer.

  ![](https://i.imgur.com/BhEgIEo.png)

- Choisir "Yes" pour confirmer

  ![](https://i.imgur.com/dSabMWs.png)

- Entrer le mot de passe choisit lors de l'installation

  ![](https://i.imgur.com/wxJUd4N.png)

- Redémarrer

  ![](https://i.imgur.com/GCeOKis.png)

#### Mises à jour

Le pilote Nvidia sera également mis à jour automatiquement lorsqu'une mise à jour est disponible.

Il n'est pas nécessaire de désinstaller le pilote graphique open source pré-installé, ils peuvent être installés côte à côte, ce qui permet d'utiliser le pilote graphique open source comme alternative de secours en cas de problème.  
Pour voir la liste des drivers installés, ouvrir Logiciels & mises à jour > Pilotes additionnels

![](https://i.imgur.com/9tVNc8w.jpg)

---

### Mettre à jour le firmware du BIOS

* Vérifier si votre firmware est pris en charge: [LVFS Device List](https://fwupd.org/lvfs/devicelist).  
* Démarrer fwupd

  ```
  sudo service fwupd start
  ```

* Vérifier la version actuelle de votre firmware

  ```
  sudo fwupdmgr get-devices
  ```

* Vérifier les mises à jour

  ```
  sudo fwupdmgr refresh
  sudo fwupdmgr get-updates
  ```

* Mettre à jour

  ```
  sudo fwupdmgr update
  ```

Sinon, télécharger l'exe sur le site du constructeur. Ex: [Drivers Dell](https://www.dell.com/support/home/fr/fr/frbsdt1/product-support/product/inspiron-15-7577-laptop/drivers)

[How to Update Firmware on Ubuntu 18.04](https://itsfoss.com/update-firmware-ubuntu/)

---

### Définir la timezone

``` bash
$ ls -l /etc/localtime
$ ls /usr/share/zoneinfo/Europe/Paris
$ sudo ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime
```

---

### Installation logiciels

[Logiciels](linux-install-soft.md)