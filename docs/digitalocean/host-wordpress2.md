---
title: Personnaliser Wordpress
category: Hosting
---

## Protéger le front-end avec un mot de passe

* [Générer une entrée htpasswd](http://www.htaccesstools.com/htpasswd-generator/)

  ![](https://i.imgur.com/9qioEWs.png)

* Créer `~/diary/.htpasswd`  
  Remplacer avec l'entrée htpasswd que vous avez obtenue

  ```
  admin:000fff
  ```

* Créer `~/diary/.htaccess`

  ```
  # BEGIN WordPress
  <IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.php$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.php [L]
  </IfModule>
  # END WordPress

  # Protected access with .htpasswd
  <IfModule mod_proxy.c>
  <Files admin-ajax.php>
    Order allow,deny
    Allow from all
    Satisfy any
  </Files>
  </IfModule>

  <IfModule mod_authn_core.c>
  AuthName "Protected access"
  AuthType Basic
  AuthUserFile "/var/www/html/.htpasswd"
  AuthGroupFile /dev/null
  Require valid-user
  </IfModule>
  ```

* Mettre à jour `~/diary/docker-compose.yml`

  ```
  volumes:
  - ./.htpasswd:/var/www/html/.htpasswd
  - ./.htaccess:/var/www/html/.htaccess
  ```

  Redémarrer le container.

---

## Changer le format des URL

Aller dans Settings > Permalinks et changer le format des URLs des posts.

![](https://i.imgur.com/0sTT2Jc.png)

---

## Utiliser Markdown pour éditer les posts

* Aller à Plugins > Add New et taper "Markdown" dans la barre de recherche

  ![](https://i.imgur.com/mSdBmkP.png)

* Dans le bloc "WP Githuber MD - WordPress Markdown Editor", cliquer "Install Now". Attendre que le plugin soit installé puis cliquer "Activate".

  ![](https://i.imgur.com/ZFMbJo9.png)

## Ajouter la coloration syntaxique

Installer le plugin "Code Prettify" pour ajouter la coloration syntaxique des blocs de code côté front-end.

## Mettre à jour le CSS du back-end

* Installer le plugin "Admin CSS MU"
* Aller à Plugins > Installed Plugins.  
  Dans le bloc "Admin CSS MU" block, cliquer "Add CSS"

  ![](https://i.imgur.com/PZri2Ug.png)

* Modifier le CSS puis cliquer "Save CSS"

  ```
  .editormd-preview ul {
      margin: 1.5em 0 1.571em 1.9em;
      list-style-type: square;
      padding: 0 !important;
  }
  .editormd-preview ul ul {
      list-style-type: circle;
  }
  .editormd .cm-trailingspace {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wUGCjsEh8e91wAAABpJREFUCNdjYICCnTt3ztm1a9ceGJ+JAQcAANW0BbSkiMobAAAAAElFTkSuQmCC') !important;
      background-position: center left !important;
      font-size: 2em;
      line-height: 11px;
      position: relative;
      top: 7px;
  }
  .editormd .cm-tab {
      background-color: white !important;
  }
  .editormd .CodeMirror-activeline .cm-tab {
      background-color: #e8f2ff !important;
  }

  /* CUSTOM BACKGROUND THEME */
  body.wp-admin {
    background: linear-gradient(135deg,#BAC9F4 25%,transparent 25%) -50px 0, linear-gradient(225deg,#BAC9F4 25%,transparent 25%) -50px 0, linear-gradient(315deg,#BAC9F4 25%,transparent 25%), linear-gradient(45deg,#BAC9F4 25%,transparent 25%);
    background-color: rgba(65,105,225,0.2);
  }
  ```

---

## Changer le thème

* Aller à Apparence > Themes et cliquer "Add New

  ![](https://i.imgur.com/JQ0vI9I.png)

* Choisir un theme que vous aimez dans la liste. J'ai pris "Steady Blogging"

## Mettre à jour le CSS du front-end

* Aller à Appearance > Customize.  
  Cela permet de changer les configs du front-end (dont le style) et de voir les résultat en direct.
* Dans le menu gauche, cliquer "Additional CSS"

  ![](https://i.imgur.com/FHch6p5.png)

* Modifier le CSS puis cliquer sur "Publish".  
  Quand c'est fait, vous pouvez quitter la page

  ![](https://i.imgur.com/9jOyqqk.png)

  ```
  /* DARK THEME */
  html {
    box-shadow: inset 0px 0px 149px 20px black;
    background: linear-gradient(to right, rgb(36, 31, 31) 0%, rgb(36, 31, 31) 32%, rgb(74, 71, 70) 100%);
  }
  body {
    background: transparent;
  }
  #site-header,
  footer {
    background: #111;
  }
  #navigation {
    color: white;
  }
  #content,
  #commentsAdd,
  #sidebars .widget,
  .post.excerpt {
    background: #111;
    border-radius: 3px;
    border: 3px solid  black;
  }
  #searchform #s,
  #woocommerce-product-search-field,
  #commentform textarea {
    background: rgba(255,255,255,0.7);
  }

  h1.title,
  .post.excerpt h2.title a,
  #sidebars .widget h3,
  #sidebars .widget h3 a,
  #respond h3,
  .comment-respond h4,
  h1, h2, h3, h4, h5, h6 {
    color: #c9c9c3;
  }
  span.entry-meta,
  .post-date-steady {
    color: #989898;
  }
  body,
  #sidebars .widget,
  #sidebars .widget a {
    color: #929292;
  }

  .article ul ul {
    list-style-type: circle;
  }
  ```