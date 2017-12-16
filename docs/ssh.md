---
title: SSH
category: Other
---

SSH (*Secure Shell*) est un protocole de communication sécurisé.

## SSH vs SSL

SSL est utilisé pour transmettre des données critiques, comme des informations bancaire.   
Pour ce faire, on utilise des **certificats SSL**.  
SSL tourne sur le port 43.

SSH est utilisé pour executer des commandes sur un serveur distant.  
Pour ce faire, on utilise des **clés SSH**.  
SSH tourne sur le port 22.

---

## Créer une clé SSH

1. Vérifier si vous avez une clé SSH  
   Vérifier si le fichier `id_dsa.pub`, `id_ecdsa.pub`, `id_ed25519.pub` ou `id_rsa.pub` existe :

   ``` shell
   ls -al ~/.ssh
   ```

2. Générer une clé SSH   
   Si vous n'avez pas déjà de clé SSH :

   ``` shell
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   # passphrase optionnelle
   ```

## Ajouter la clé à ssh-agent

1. Démarrer ssh-agent

   ``` shell
   eval "$(ssh-agent -s)"
   ```

2. Ajouter la clé

   ``` shell
   ssh-add ~/.ssh/id_rsa
   ```
