---
title: Vault
category: DevOps, Ansible
---

* Stocker les informations d'identification en dur dans l'inventaire n'est pas une bonne pratique.  
  Ansible Vault nous permet de stocker ces données dans un format encrypté.

* Pour encrypter le fichier d'inventaire:  
  Lorsque la commande est exécutée, il faut entrer un mot de passe, qui sera nécessaire pour voir et utiliser cet inventaire.

  ``` bash
  ansible-vault encrypt inventory
  ```

* Pour modifier le mot de passe: rekey

* Pour voir le contenu d'un fichier encrypté:  
  Ajouter l'option \-\-ask-vault-pass pour qu'ansible demande le mot de passe de l'inventaire.  
  Ou \-\-vault-password-file pour utiliser un fichier (qui a les permissions 640)

  ``` bash
  ansible-vault view inventory
  ```
  ``` bash
  $ ansible-vault view decrypt_me.yml --vault-password-file vault_pass.txt
  ```

* On peut également configurer le fichier à utiliser dans ansible.cfg

  ``` ini
  vault_password_file = /home/thor/playbooks/vault_pass.txt
  ```

[Protecting sensitive data with Ansible vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html)