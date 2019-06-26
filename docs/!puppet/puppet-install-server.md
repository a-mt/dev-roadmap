---
title: Installer Puppet Server
category: Puppet
---

## Installer un serveur NTP (optionnel)

Puppet Server agit comme autorité de certification pour les noeuds agent. Le Puppet master doit maintenir une heure système précise afin d'éviter des problèmes potentiels avec la date d'expiration des certifications s'il y a des décalages horaires.

Pour s'assurer que l'heure est synchronisée entre le master et les agents, on peut [installer NTP](ntp.md).

---

## Installer Puppet Server

Note: j'ai utilisé un container Docker pour tester l'installation et activé le port forwarding 8140 sur mon routeur

```
docker run -it --name puppet -p 8140:8140 --privileged ubuntu:basic bash
```

1. Ajouter le repository [Puppet Laps](http://apt.puppetlabs.com/) correspondant à votre OS

    ```
    # Ubuntu 18.04
    curl -O https://apt.puppetlabs.com/puppet6-release-bionic.deb
    sudo dpkg -i puppet6-release-bionic.deb
    sudo apt-get update
    rm puppet6-release-bionic.deb
    ```

2. Installer Puppet Server

    ```
    sudo apt-get -y install puppetserver
    ```

    Cela installera notamment
    * `puppetserver`, le composant principal du Puppet master
    * `puppet`, le composant du Puppet agent. Un master Puppet peut également agir comme agent Puppet — autrement dit, le master peut être utilisé pour apporter des modifications à lui-même.
    * `facter`, le coomposant qui permet de recueillir des informations systèmes (des *facts*), pour personnaliser les configurations de Puppet.

    Vous pouvez tomber sur des articles qui parlent de `puppetmaster`, il s'agit d'une ancienne version de Puppet
    * Le service par défaut Puppet Master avec WEBrick n'est adapté en production
    * Le service par défaut Puppet Master avec Rack et Apache est adapté en production
    * Puppet Server est un projet plus récent, conçu pour remplacer le Puppet Master par défaut et est adapté en production.

3. Vérifier que Puppet Server est bien installé

    ```
    sudo service puppetserver status
    ```

4. Par défaut, Puppet Server est configuré pour utiliser 2Go de RAM mais pour tester Puppet Server, vous pouvez allouer 512M sans problème. Pour modifier la mémoire alloué à Puppet Server, éditer le fichier de configuration `/etc/default/puppetserver`

    ```
    JAVA_ARGS="-Xms512m -Xmx512m"
    ```

    Ces deux valeurs indiquent la quantité minimale et maximale que Java utilisera.

5. Le master doit autoriser les connexions entrantes sur le port 8140, et les noeuds agent doivent pouvoir se connecter au master sur ce port.  
   S'assurer que les communications sur ce port sont autorisées.

    ```
    sudo ufw allow 8140
    ```

6. Pour exécuter les commandes Puppet en ligne de commande, il faut soit ajouter leur emplacement au `PATH` ou les exécuter en entant leur chemin complet.

    ```
    export PATH=$PATH:/opt/puppetlabs/puppet/bin:/opt/puppetlabs/bin
    echo !! >> ~/.bashrc
    puppetserver --version
    sudo -i puppetserver --version
    ```

7. Démarrer Puppet Server.  
   Cela prendre un certain temps

    ```
    sudo service puppetserver start
    ```

8. Activer Puppet Server au démarrage

    ```
    sudo systemctl enable puppetserver
    ```

---

## Configurer le master Puppet

1. Stopper Puppet

    ```
    sudo service puppetserver stop
    ```

2. Supprimer les certificats SSL préinstallés:

    ```
    sudo rm -rf /etc/puppetlabs/puppet/ssl
    sudo -i puppetserver ca clean $(puppet config print certname)
    ```

3. Fournir au master son nom de domaine entièrement qualifié (FQDN), pour les certificats SSL soient correctement formattés.

    ```
    hostnamectl set-hostname  hostname.example.com
    ```

    Vérifier que `facter` récupère bien cette valeur:

    ```
    facter networking
    ```

4. Si vous possédez votre nom de domaine créer un enregistrement DNS A ou CNAME pointant vers votre master — `puppet.exemple.com` par exemple.

    Si non: mettre à jour `/etc/hosts` et mettre votre FQDN et votre nom d'hôte dedans.

    ```
    127.0.0.1   hostname.example.com hostname localhost
    ```

    L'ordre est importante pour votre système reconnaisse votre FQDN correctement:

    ```
    hostname --fqdn
    ```

5. S'assurer que vous pouvez envoyer un ping à votre hôte


    ```
    ping hostname.example.com
    ```

6. Mettre à jour `/etc/puppetlabs/puppet/puppet.conf`  
   Il s'agit du fichier de configuration principal pour le Puppet master et agent (lorsqu'on utilise l'utilisateur `root`).

   Indiquer à Puppet quel serveur utiliser — dans le cas du master, il ne fait que pointer vers lui-même:

    ```
    [main]
    server = hostname.example.com
    certname = hostname.example.com
    dns_alt_names = hostname.example.com,hostname
    ```

    Si vous avez crée un enregistrement DNS CNAME pour votre master et/ou si votre master a des alias de nom d'hôte, il faut lister tous les alias de votre hôte dans `dns_alt_names` (séparés par des virgules). Sinon, vous pouvez omettre cette option.

7. Générer le certificat SSL de la CA

    ```
    sudo -i puppetserver ca setup
    ```

    Vérifier que le Common Name du certificat correspond bien au FQDN:

    ```
    sudo openssl x509 -noout -subject -in /etc/puppetlabs/puppet/ssl/ca/ca_crt.pem
    ```

8. Démarrer Puppet Server

    ```
    sudo service puppetserver start
    ```

9. Lister les certificats SSL que le serveur connaît

    ```
    sudo -i puppetserver ca list --all
    ```

    L'option `-i` permet d'utiliser root en conservant les variables d'environnement de l'utilisateur en cours, dont `PATH`

10. Tester votre installation — comme on a pas crée de manifest, cela ne devrait rien changer:

    ```
    sudo -i puppet agent -t
    ```

---

## Exécuter Puppet agent sans sudo

Les configurations Puppet sont spécifiques à un utilisateur donné. Pour utiliser Puppet avec un utilisateur autre que root, vous devez donc mettre à jour les configurations et certificats pour l'utilisateur que vous souhaitez utiliser.

1. Définir le `server` à utiliser pour l'utilisateur en cours:

    ```
    puppet config set server hostname.example.com
    ```

    Pour connaître l'emplacement des configurations:

    ```
    echo $(puppet config print confdir)/puppet.conf
    ```

2. Copier les clés SSL de root vers le ssldir de l'utilisateur en cours

    ```
    CERT=`puppet config print certname`.pem
    SSLDIR=`puppet config print ssldir`

    sudo cp /etc/puppetlabs/puppet/ssl/certs/$CERT $SSLDIR/certs/$CERT
    sudo cp /etc/puppetlabs/puppet/ssl/public_keys/$CERT $SSLDIR/public_keys/$CERT
    sudo cp /etc/puppetlabs/puppet/ssl/private_keys/$CERT $SSLDIR/private_keys/$CERT

    sudo chown -R $USER: $SSLDIR
    ```

3. Tester l'installation

    ```
    puppet agent -t
    ```