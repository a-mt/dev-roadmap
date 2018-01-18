---
title: Installer Linux
category: Linux
---

## Installer Linux

### Pour une installation en dual-boot avec Windows

* Effecuter une défragmentation
* Réduire la partition Windows via le Disk Manager (<kbd>Super</kbd> + <kbd> r </kbd> > `diskmgmt.msc`)
    * Minimum : 60G
    * Pour quleques logiciels / serveur : 100/200G

### Déterminer le BIOS utilisé (Legacy ou UEFI)

* Ouvrir la console en mode admin (Rechercher "cmd" > <kbd>Ctrl</kbd> + <kbd>Maj</kbd> + <kbd>Entrée</kbd>)
* Taper `bcedit`  
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
* Au moment du (re)démarrage : entrer dans le menu du BIOS (F2 au moment du démarrage) et changer l'ordre de boot pour mettre la clé USB en premier

### Installer

* Démarrer une session live avec la clé bootable
* Vérifier que le matériel est bien détecté (touchpad, souris, son, luminosité, ...)
* Se connecter à Internet via un cable ethernet
* Procéder à l'installation
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
