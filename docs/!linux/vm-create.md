---
title: Créer une VM
category: Linux
---

## Vérifications avant de créer une VM

Avant de chercher à créer des VMs, il y a quelques vérifications de base à effectuer,  
relativement indépendantes de l'hyperviseur:

- Support de la <ins>virtualisation par le BIOS</ins>.  
  Vérifier sur le site web du fabricant si la virtualisation est prise en charge  
  et si elle doit être activée dans les paramètres du BIOS.

- Support de la <ins>virtualisation par le CPU</ins>.  
  Le fichier /proc/cpuinfo contient des flags qui permettent de vérifier la prise en charge de la virtualisation

  - `vmx` signifie que le système supporte la virtualisation et qu'il est équipé d'une puce Intel
  - `svm` signifie que le système supporte la virtualisation et qu'il est équipé d'une puce AMD  
     

  ```
  grep ^flags /proc/cpuinfo | grep -e vmx -e sv
  ```

- En cas d'utilisation de KVM comme hyperviseur,  
  vérifier les <ins>modules chargés</ins> sur le système hôte (avec les droits super-utilisateur):

  ```
  lsmod | grep -i kvm
  ```

  Si `kvm-amd` (pour les puces AMD) ou `kvm-intel` (pour les puces Intel) n'est pas chargé,  
  utiliser modprobe pour charger le bon module

- <ins>Resources suffisantes</ins> sur la machine hôte.  
  Vérifier qu'il y ait suffisamment de ressources pour supporter le nombre de VMs souhaitées. Cela inclut:

  - le niveau d'occupation du CPU (`top`)
  - la quantité de RAM (`free`)
  - la quantité d'espace disque (`du`)
  - le nombre de carte d'interface réseau (NIC)

---

## Avec virt-manager

1. S'assurer que libvirt tourne et démarrer virt-manager

    ``` bash
    $ sudo systemctl start libvirtd
    $ sudo virt-manager
    ```

2. Créer une nouvelle VM à partir d'un disque d'installation (image ISO)

    * File > Create New Machine  
    * Cocher Local install media (ISO image or CDROM)  
    * Naviguer dans le système de fichiers et choisir l'image désirée  
       

3. Définir la quantite de mémoire et le nombre de CPU à utiliser.  
  Pour une petite image (TinyCoreLinux), 256 Mo est plus que suffisant

4. Configurer l'emplacement et la taille de la VM crée.  
   L'interface graphique ne vous laissera pas choisir moins de 0.1 Go (soit environ 100 Mo)

    Si vous ne cliquez pas sur Select or Create custom storage,  
    l'image sera placée par défaut dans <ins>/var/lib/libvirt/images</ins>

5. Démarrer l'installation de la VM, à partir du disque d'installation TinyCoreLinux.  
   Une fois l'installation terminée, aller dans le menu File et arrêter la VM

## Avec QEMU

``` bash
$ sudo qemu-img create -f qcow2 /var/lib/libvirtd/myimg.qcow2 24M
$ sudo qemu-system-x86_64 -hda /var/lib/libvirtd/myimg.qcow2 -cdrom CorePlus-current.iso -usbdevice tablet
```

---

## Dupliquer une VM

Après avoir construit une première VM, on peut créer de nouvelles VMs rapidement, soit en utilisant

* Des **fichiers OVF / OVA**.  
  Tout hyperviseur qui respecte les standards permet de créer des fichiers OVF ou OVA  
  puis de créer une VM identique à partir de ces fichiers.

* Le **clonage**  
  Le clonage s'effectue au même sein de l'hyperviseur, sans medium intermédiaire.

* Le **template**  
  On peut démarrer un clone mais on ne peut pas démarrer un template. Comme une blueprint pour construire une maison, un template permet à un hyperviseur de construire une VM, avec un OS et des applications pré-définies.

## Post-duplication

Après avoir dupliqué une VM, il y a potentiellement plusieurs choses à modifier:

1. Supprimer le machine ID,  
   également supprimer et regénérer le D-BUS machine ID.
   Le numéro d'identification doît être unique.

    ``` bash
    $ rm /etc/machine-id
    $ rm /var/lib/dbus/machine-id
    $ dbus-uuidgen --ensure
    ```

   Suivant la distribution Linux invistée, des étapes supplémentaires peuvent être nécessaire,  
   lire la documentation de la distro

2. Modifier le nom d'hôte

    ``` bash
    $ hostnamectl
    $ hostnamectl set-hostname vm-example
    ```

3. Modifier les adresses MAC des NICs,
   ainsi que les adresses IP statiques, s'il y en a.

4. S'il y a des UUID (*Universally unique identifiers*) dans les fichiers de configuration,  
   les régénérer et mettre à jour les fichiers de configuration dans lesquels ils sont listés.

    ``` bash
    $ cat /etc/fstab
    UUID=28a25b21-4cc8-484e-bebe-1d133ce62468  /     ext4    errors=remount-ro 0       1
    ```

---

## Customiser une image VM avec cloud-init

``` bash
$ wget https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-amd64.img

$  cat cloud_init.cfg
#cloud-config
hostname: test1
fqdn: test1.example.com
manage_etc_hosts: true
users:
- name: ubuntu
sudo: ALL=(ALL) NOPASSWD:ALL
groups: users, admin
home: /home/ubuntu
shell: /bin/bash
lock_passwd: false
ssh-authorized-keys:
- ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAQv8lINNJvVpvtCvEXz+HvN146xZTDcJP5KWBLaRNEc test1
# only cert auth via ssh (console access can still login)
ssh_pwauth: false
disable_root: false
chpasswd:
list: |
ubuntu:linux
expire: False
package_update: true
packages:
- qemu-guest-agent
# message to write to /var/log/cloud-init-output.log
final_message:
"The system is finally up, after $UPTIME
seconds"

$ cloud-localds -v --network-config=network_config_static.cfg test1-seed.qcow2 cloud_init.cfg

$ sudo virt-install --name test1 \
    --virt-type kvm \
    --memory 2048 --vcpus 2 \
    --boot hd,menu=on \
    --disk path=test1-seed.qcow2,device=cdrom \
    --disk path=snapshot-bionic-server-cloudimg.qcow2,device=disk \
    --graphics none \
    --os-variant ubuntu18.04 \
    --network network:default \
    --console pty,target_type=serial

$ sudo virsh list --all
$ sudo virsh destroy test1
$ sudo virsh undefine test1
```
