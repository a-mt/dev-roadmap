---
title: WebGL
category: Web, JavaScript, API
---

WebGL est une implémentation 3D de Canvas, c'est une API qui permet de créer de véritables graphiques 3D dans le navigateur web. Elle a été standardisée autour de 2009-2010. C'est une API complètement séparée de l'API [Canvas 2D](js-canvas.md), même si les deux sont affichées sur des éléménts `<canvas>`.

[Exemple animation WebGL](https://mdn.github.io/learning-area/javascript/apis/drawing-graphics/threejs-cube/index.html)

---

## Bibliothèques

WebGL est basée sur la langage de programmation graphique OpenGL, et permet de communiquer directement avec le GPU de l'ordinateur. En soi, l'écriture WebGL est plus proche des langages de bas niveau tel que C++ que du JavaScript normal.

Parce que le code WebGL est complexe à écrire, la plupart des gens utilisent une bibliothèque plutôt que d'écrire du WebGL brut. Les 3 principales sont [Three.js](three.md), PlayCanvas et Babylon.js.
