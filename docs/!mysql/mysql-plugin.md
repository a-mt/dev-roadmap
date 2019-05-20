---
title: Plugins
category: BDD, MySQL, Administration
---

## Show

Liste les plugins disponibles et leur statut (activé, désactivé)

    SHOW PLUGINS

### Install

Installe un plugin

    INSTALL PLUGIN nom_plugin SONAME 'nom_librairie'

`nom_plugin` est le nom du plugin tel que définit dans le fichier de [déclaration du plugin](https://dev.mysql.com/doc/refman/5.7/en/plugin-data-structures.html)  
`nom_librairie` est le nom de la librairie qui contient le plugin (exemple: `libmyplugin.so`).  
Cette librairie est située dans le répertoire des plugins (`SHOW GLOBAL VARIABLES like 'plugin_dir'`).

## Uninstall

Désinstalle un plugin

    UNINSTALL PLUGIN nom_plugin
