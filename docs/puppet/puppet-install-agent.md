---
title: Installer Puppet Agent
category: Puppet
---

Puppet Agent doit être installé sur tout hôte que le master Puppet veut gérer.

## Désinstaller Puppet Agent

```
sudo service puppet stop
sudo apt-get purge --auto-remove puppet-agent
sudo rm -rf /opt/puppetlabs
sudo rm -rf /etc/puppetlabs
rm -rf ~/.puppetlabs
```

---

## Installer Puppet Agent

1. Activer le repository [Puppet Labs](http://apt.puppetlabs.com/) pour votre OS

    ```
    # Ubuntu 18.04
    curl -O https://apt.puppetlabs.com/puppet6-release-bionic.deb
    sudo dpkg -i puppet6-release-bionic.deb
    sudo apt-get update
    rm puppet6-release-bionic.deb
    ```

2. Installer Puppet Agent

    ```
    sudo apt-get install puppet-agent
    ```

3. Vérifier que Puppet Agent est installé

    ```
    sudo service puppet status
    ```

4. Pour exécuter les commandes Puppet en ligne de commande, il faut soit ajouter leur emplacement au `PATH` ou les exécuter en entant leur chemin complet.

    ```
    export PATH=/opt/puppetlabs/puppet/bin/:$PATH
    echo !! >> ~/.bashrc
    puppet --version
    ```

---

## Configurer l'agent Puppet

1. Si vous n'utilisez pas DNS: mettre à jour `/etc/hosts` avec l'adresse IP (publique) du master Puppet.

    ```
    puppet_ip_address hostname.example.com
    ```

2. Vérifier que vous y avez accès

    ```
    telnet hostname.example.com 8140
    ```

    Si la connexion réussit, un écran vide s'affiche, ce qui signifie que le port de l'ordinateur cible est ouvert. Une connexion échouée sera quant à elle accompagnée d'un message d'erreur — indiquant que le serveur indiqué n'écoute pas sur le port demandé.

3. Initialiser Puppet.  
   La commande suivante va échouer mais néanmoins initialiser les fichiers de configuration — qu'on va modifier par la suite.

    ```
    sudo -i puppet agent -t
    ```

4. Mettre à jour la variable `server`

    ```
    sudo -i puppet config set server hostname.example.com
    ```

5. Supprimer les certificats SSL actuels

    ```
    sudo rm -rf /etc/puppetlabs/puppet/ssl/certs/$(puppet config print certname).pem
    rm -rf $(puppet config print ssldir)/certs/$(puppet config print certname).pem
    ```

6. Envoyer une CSR au master.  
   La première fois qu'on exécute Puppet Agent, un certificat SSL est automatiquement généré et envoie une CSR au master.

    ```
    sudo -i puppet agent --test
    ```

    Exemple de résultat:

    ```
    Info: Downloaded certificate for ca from hostname.example.com
    Info: Downloaded certificate revocation list for ca from hostname.example.com
    Info: Creating a new SSL key for ubuntu-test
    Info: csr_attributes file loading from /etc/puppetlabs/etc/puppet/csr_attributes.yaml
    Info: Creating a new SSL certificate request for ubuntu-test
    Info: Certificate Request fingerprint (SHA256): C8:31:A2:9F:9F:63:B0:E7:71:96:AE:E3:54:D1:E6:6B:CB:E4:94:C1:80:43:32:29:C5:93:75:B9:7F:04:4D:F4
    Info: Certificate for ubuntu-test has not been signed yet
    Couldn't fetch certificate from CA server; you might still need to sign this agent's certificate (ubuntu-test). Exiting now because the waitforcert setting is set to 0.
    ```

---

## Signer le certificat de l'agent

* Une fois que la CSR a été envoyée au master, retourner dans le terminal du master et lister toutes les demandes de certificat qui n'ont pas encore été signées:

  ```
  sudo -i puppetserver ca list
  ```

  Il devrait y avoir une requête pour chaque agent pour vous avez configuré, par exemple:

  ```
  Requested Certificates:
      ubuntu-test   (SHA256)  C8:31:A2:9F:9F:63:B0:E7:71:96:AE:E3:54:D1:E6:6B:CB:E4:94:C1:80:43:32:29:C5:93:75:B9:7F:04:4D:F4
  ```

* Signer le certificat  
  On peut utiliser l'option `--all` pour signer tous les certificats non signés.

  ```
  sudo -i puppetserver ca sign --all
  ```

  Ou l'option `--certname` pour signer le certificat d'un hôte donné

  ```
  sudo -i puppetserver ca sign --certname ubuntu-test
  ```

* Pour voir toutes les demandes, signées et non signées:

  ```
  sudo -i puppetserver ca list --all
  ```

  Exemple de résultat:

  ```
  Signed Certificates:
      hostname.example.com   (SHA256)  ED:3D:C3:44:16:75:FF:CB:6D:84:AE:5E:B4:F7:38:3C:1A:8B:FC:6A:AB:E1:56:D3:14:CE:21:98:42:82:88:D1  alt names: ["DNS:hostname.example.com", "DNS:hostname", "DNS:hostname.example.com"]
      ubuntu-test            (SHA256)  2C:73:4A:E6:13:3F:14:EB:D5:24:88:2A:4C:50:69:44:FF:B7:AA:DC:3D:00:9E:B8:B7:35:E3:FC:8D:EB:39:1F
  ```

* Pour supprimer un hôte de Puppet:

  ```
  sudo -i puppetserver ca clean --certname HOSTNAME
  ```

---

## Tester l'installation

1. Retourner dans le terminal de l'agent et lancer Puppet Agent.  
   Puisqu'aucun manifest n'a été configuré, cela ne devrait rien changer au système.

    ```
    sudo -i puppet agent -t
    ```

    Exemple de résultat:

    ```
    Info: csr_attributes file loading from /etc/puppetlabs/etc/puppet/csr_attributes.yaml
    Info: Creating a new SSL certificate request for ubuntu-test
    Info: Certificate Request fingerprint (SHA256): C8:31:A2:9F:9F:63:B0:E7:71:96:AE:E3:54:D1:E6:6B:CB:E4:94:C1:80:43:32:29:C5:93:75:B9:7F:04:4D:F4
    Info: Downloaded certificate for ubuntu-test from hostname.example.com
    Info: Using configured environment 'production'
    Info: Retrieving pluginfacts
    Notice: /File[/etc/puppetlabs/opt/puppet/cache/facts.d]/mode: mode changed '0775' to '0755'
    Info: Retrieving plugin
    Info: Retrieving locales
    Info: Caching catalog for ubuntu-test
    Info: Applying configuration version '1559234292'
    Info: Creating state file /etc/puppetlabs/opt/puppet/cache/state/state.yaml
    Notice: Applied catalog in 0.01 seconds
    ```

2. Pour vérifier tous les certificats SSL que l'agent connait:

    ```
    sudo -i puppet ssl verify
    ```

---

## Démarrer le service Puppet

* Démarrer le service `puppet` pour que l'agent vérifie de temps en temps le manifest du master — et se synchronise si nécessaire.

  ```
  sudo service puppet start
  ```

  Lorsqu'il vérifie auprès du master si des mises à jour doivent être effectuées, l'agent envoie des faits sur lui-même au master et récupère le *catalog*, la liste compilée des ressources et des états souhaités — calculée à partir du manifest et des faits.

* Par défaut, l'Agent se synchronise toutes les 30 minutes.  
  Pour modifier cet intervale:

  ```
  sudo -i puppet config print runinterval  # 1800
  ```

* Pour savoir quand l'agent s'est synchronisé:

  ```
  sudo service puppet status
  ```

  Exemple de résultat:

  ```
  ● puppet.service - Puppet agent
     Loaded: loaded (/lib/systemd/system/puppet.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2019-05-30 20:03:59 UTC; 31min ago
   Main PID: 22421 (puppet)
      Tasks: 2 (limit: 1152)
     CGroup: /system.slice/puppet.service
             └─22421 /opt/puppetlabs/puppet/bin/ruby /opt/puppetlabs/puppet/bin/puppet agent --no-daemonize
  
  May 30 20:03:59 ubuntu-test systemd[1]: Started Puppet agent.
  May 30 20:04:01 ubuntu-test puppet-agent[22421]: Starting Puppet client version 6.4.2
  May 30 20:04:02 ubuntu-test puppet-agent[22445]: (/Stage[main]/Main/File[/tmp/it_works.txt]/ensure) defined content as '{md5}b57bd0dc52ff69de5d1d49b255d009ea' (corrective)
  May 30 20:04:02 ubuntu-test puppet-agent[22445]: Applied catalog in 0.02 seconds
  May 30 20:34:02 ubuntu-test puppet-agent[22758]: (/Stage[main]/Main/File[/tmp/it_works.txt]/ensure) defined content as '{md5}b57bd0dc52ff69de5d1d49b255d009ea' (corrective)
  May 30 20:34:02 ubuntu-test puppet-agent[22758]: Applied catalog in 0.01 seconds
  ```