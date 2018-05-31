---
title: Three.js
category: Web, JavaScript, Library
---

Three.js est une bibliothèque [WebGL](js-webgl.md). Elle permet de simplifier l'écriture du code WebGL.

---

## Inclure la bibliothèque

La première chose à faire est de [télécharger la bibliothèque](https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js) et l'inclure dans votre page.

``` html
<script src="three.min.js"></script>
```

---

## Créer une scène vide à l'écran

Pour créer une scène vide, on doit créer plusieurs éléments, qui nous permettrons par la suite d'afficher des objets à l'écran:

1. Une **scène** représente l'ensemble du monde 3D que nous essayons d'afficher.

   ``` js
   var scene = new THREE.Scene();
   ```

2. Une **caméra** représente la position du spectateur dans le monde.

   ``` js
   var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.z = 50;
   ```

   `PerspectiveCamera()` prend quatre arguments:
   * Paramètre 1: le champ de vision. La largeur de la zone devant la caméra qui doit être visible à l'écran, en degrés.
   * Paramètre 2: l'*aspect ratio*. Généralement: (largeur / hauteur) de la scène, utiliser un autre ratio déformera la scène.
   * Paramètre 3: *near plane*. Jusqu'où les objets peuvent-ils être près de la caméra avant d'arrêter de les afficher à l'écran.
   * Paramètre 4: *far plane*. Jusqu'où les objets peuvent-ils être loin de la caméra avant d'arrêter de les afficher à l'écran.

3. Un **moteur de rendu** est l'objet qui restitue une scène donnée, vu à travers une caméra donnée.

   ``` js
   var renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor(0xDDDDDD, 1);
   document.body.appendChild(renderer.domElement);
   ```

   * On crée un moteur de rendu
   * On définit la taille à laquelle la vue de la caméra sera dessinée
   * On définit la couleur de fond (noir par défaut)
   * On ajoute le canvas à la page

4. L'étape finale est d'afficher la scène à travers la caméra (pour l'instant, la scène est vide):

  ``` js
  renderer.render(scene, camera);
  ```

[JSFiddle scène vide](https://jsfiddle.net/amt01/bykgmgsh/)

---

## Ajouter un objet à la scène

Three.js fournit des méthodes pour créer des formes en une seule ligne de code. Il y a des cubes, sphères, cylindres, etc. Quelque soit la forme choisie, le processus reste le même:

1. Créer la **géométrie** de l'objet (sa forme). 
   Par exemple, pour créer un cube de 10x10x10 unités:

   ``` js
   var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
   ```

2. Spécifier le **matériau** de l'objet - la couleur ou la texture qui recouvre sa surface.

   ``` js
   var basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD});
   ```

3. Appliquer le matériau sur la géométrique avec un **mesh**.

   ``` js
   var cube = new THREE.Mesh(boxGeometry, basicMaterial);
   ```

3. Par défaut l'objet est affiché en face (un carré), pour le faire pivoter on peut utiliser la propriété `rotation`.

   ``` js
   cube.rotation.set(0.4, 0.2, 0);
   ```

   Note: pour que les bords de l'objet ne soient pas aliasés, vous pouvez passer l'option `antialias` au moteur de rendu.

   ``` js
   var renderer = new THREE.WebGLRenderer({antialias: true});
   ```

4. Finalement, pour ajouter l'objet à la scène (et donc l'afficher), on utilise la méthode `add()` de la scène créée précédemment.

   ``` js
   scene.add(cube);
   ```

[JSFiddle cube](https://jsfiddle.net/amt01/bykgmgsh/2/)

---

## Ajouter des lumières

Pour utiliser des lumières, choisissez un matériau autre que `MeshBasicMaterial` pour vos objets - ce dernier ne prend pas les lumières en considération. `MeshStandardMaterial` par exemple:

 ``` js
 var basicMaterial = new THREE.MeshStandardMaterial({color: 0x0095DD});
 ```

Il existe plusieurs types de lumières.  
[JSFiddle lumières](https://jsfiddle.net/amt01/bykgmgsh/3/) (utiliser la liste déroulante pour voir les différences)

### Ambient

`AmbientLight` est une lumière douce qui illumine toute la scène

``` js
var light = new THREE.AmbientLight('rgb(255, 255, 255)'); 
scene.add(light);
```

![](https://i.imgur.com/qjgEkJvt.png)

### Hemisphere

`HemisphereLight` est une lumière douce qui illumine la scène du haut.

``` js
var hemisphereLight = new THREE.HemisphereLight('rgb(255, 255, 255)', 0x080820);
```

On définit la couleur du ciel et la couleur du sol en paramètre.

![](https://i.imgur.com/10sFIgzt.png)

### Spot

`SpotLight` est un faisceau de lumière émis d'un point lumineux, un projecteur

``` js
var spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);
```

![](https://i.imgur.com/9blcqnAt.png)

### Point

`PointLight` est une lumière diffuse émise d'un point lumineux, une ampoule.  
La différence avec SpotLight n'est visible que quand le point lumineux est proche d'un objet.

``` js
var pointLight = new THREE.PointLight('rgb(255, 255, 255)');
pointLight.position.set(100, 1000, 1000);
pointLight.castShadow = true;
scene.add(pointLight);
```

![](https://i.imgur.com/CpP4bFyt.png)

### Directional

`DirectionalLight` est une lumière émise dans une seule direction.

``` js
var directionalLight = new THREE.DirectionalLight('rgb(255, 255, 255)');
directionalLight.position.set( 100, 1000, 1000 );
directionalLight.castShadow = true;
scene.add(directionalLight);
```

![](https://i.imgur.com/11rM5Wgt.png)

### RectArea

`RectAreaLight` est une lumière diffuse en forme de rectangle.  
Ça permet par exemple de simuler une fenêtre d'où sort de la lumière.

``` js
var rectLight = new THREE.RectAreaLight('rgb(255, 255, 255)');
rectLight.position.set(0, 5, 5);
rectLight.lookAt(0, 0, 0);
```

Ne marche que sur les matériaux `MeshStandardMaterial` et `MeshPhysicalMaterial`.  
On peut spécifier les dimensions du rectangle [en paramètre](https://threejs.org/docs/#api/lights/RectAreaLight).

---

## Formes

### Formes basiques

Three.js fournit des méthodes pour créer des formes 3D basiques et des formes 2D (des plans sans profondeur).  
[JSFiddle formes basiques](https://jsfiddle.net/amt01/bykgmgsh/5/)

#### Box (cube)

``` js
box = new THREE.BoxGeometry(10, 10, 10)
```

![](https://i.imgur.com/JMFzReHt.png)

#### Cone

``` js
cone = new THREE.ConeGeometry(10, 10, 32)
```

![](https://i.imgur.com/q3IsdvZt.png)

#### Sphere

``` js
sphere = new THREE.SphereGeometry(10, 32, 32)
```

![](https://i.imgur.com/HxQ3V37t.png)

#### Cylinder

``` js
cylinder = new THREE.CylinderGeometry(5, 5, 10, 32)
```

![](https://i.imgur.com/3sYu2fYt.png)

#### Torus

``` js
torus = new THREE.TorusGeometry(7, 1, 6, 12)
```

![](https://i.imgur.com/29ak52qt.png)

#### TorusKnot

``` js
torusKnot = new THREE.TorusKnotGeometry(7, 1, 20, 12)
```

![](https://i.imgur.com/sjI3mgxt.png)

#### Dodecahedron

12 facettes en pentagone

``` js
dodecahedron = new THREE.DodecahedronGeometry(7)
```

![](https://i.imgur.com/5yP6mT3t.png)

#### Icosahedron

20 facettes en triangle

``` js
icosahedron = new THREE.IcosahedronGeometry(7)
```

![](https://i.imgur.com/AfqQPb9t.png)

#### Octahedron

8 facettes en triangle

``` js
octahedron = new THREE.OctahedronGeometry(7)
```

![](https://i.imgur.com/HOwdBS1t.png)

#### Tetrahedron

4 facettes en triangle

``` js
tetrahedron = new THREE.TetrahedronGeometry(7)
```

![](https://i.imgur.com/QT289Z2t.png)

#### Circle

``` js
circle = new THREE.CircleGeometry(10, 32)
```

![](https://i.imgur.com/6vSolS3t.png)

#### Plane

``` js
plane = new THREE.PlaneGeometry(10, 10)
```

![](https://i.imgur.com/NGkVlwnt.png)

#### Ring

``` js
ring = new THREE.RingGeometry(5,10,32)
```

![](https://i.imgur.com/tzE1yc2t.png)

### Formes complexes

On peut également créer des formes plus complexes, qui demandent plus de travail:

#### Tube

`Tube` permet de créer un tube 3D qui suit une courbe définie au préalable

``` js
var path = new THREE.SplineCurve3([
  new THREE.Vector3(0, 10, -20),
  new THREE.Vector3(10, -10, -1),
  new THREE.Vector3(2, -10, 15)
]);
var tube = new THREE.TubeGeometry(path, 20, 2, 8, false);
```

![](https://i.imgur.com/WTjoNgnt.png)

#### Shape

`shape` permet de créer une forme en 2D à la manière de l'API Canvas 2D

``` js
var path = new THREE.Shape();
path.quadraticCurveTo(10, -16, 18, -2);
path.quadraticCurveTo(20, -2, 23, -8);
path.quadraticCurveTo(23, 0, 23, 8);
path.quadraticCurveTo(20, 2, 18, 2);
path.quadraticCurveTo(10, 16, 0, 0);

var fish = new THREE.ShapeGeometry(path);
```

[Shapes](https://threejs.org/examples/webgl_geometry_shapes.html)

![](https://i.imgur.com/Bzgq7ult.png)

#### Extrude

`extrude` permet de créer une forme en 3D à partir d'une forme 2D. Il suffit de préciser la profondeur de l'objet.

``` js
var path = new THREE.Shape();
path.quadraticCurveTo(10, -16, 18, -2);
path.quadraticCurveTo(20, -2, 23, -8);
path.quadraticCurveTo(23, 0, 23, 8);
path.quadraticCurveTo(20, 2, 18, 2);
path.quadraticCurveTo(10, 16, 0, 0);

var fish3D = new THREE.ExtrudeGeometry(path,{
  bevelEnabled: false,
  amount: 5
});
```

![](https://i.imgur.com/Wj0gqout.png)

#### Polyhedron

`polyhedron` permet de créer des polyhedrons personnalisés (icosahedron, octahedron, tetrahedron ou autres) en spécifiant les sommets (*vertices* en anglais) et indices de la forme

``` js
var vertices = [
    1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
];
var indices = [
    2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
];
polyhedron = new THREE.PolyhedronGeometry(vertices, indices, controls.radius, controls.detail);
```

[Exemple polyhedron](https://jsfiddle.net/amt01/3qqsf0jz/)  
[Polyhedrons: Tetra, Octa, Icosa](https://gist.github.com/timothypratley/1546370)  
[Autres Polyhedrons](https://stemkoski.github.io/Three.js/Polyhedra.html)  
[BabylonJS Playground](http://www.babylonjs-playground.com/#21QRSK)

![](https://i.imgur.com/sxDHz0rt.png)

#### Lathe

`lathe` permet de répéter une forme autour d'un cercle.

``` js
var data = [
  [3, 0],
  [3, 0.3],
  [2.9, 0.3],
  [0.3, 1],
  [0.3, 6],
  [2, 6],
  [3, 8],
  [3, 9],
  [2.3, 14]
];
var points = data.map((d, i) => new THREE.Vector2(data[i][0], data[i][1]));

shapes.lathe = new THREE.LatheGeometry(points, 24);
```

[Exemple lathe](https://jsfiddle.net/amt01/sfy5pn6s/)

![](https://i.imgur.com/b82WHGpt.png)

#### Parametric

`parametric` prend en paramètre une fonction qui mappe les valeurs u et v (entre 0 et 1) en un vecteur 3D pour chaque point. Cela permet de déformer une surface plane selon une fonction graphique.

``` js
var radialWave = function (u, v, optionalTarget) {
  var result = optionalTarget || new THREE.Vector3();
  var r = 50;

  var x = Math.sin(u) * r;
  var z = Math.sin(v / 2) * 2 * r;
  var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

  return result.set(x/2-10, y/2, z/2);
}
var shape = new THREE.ParametricGeometry(shapes.radialWave, 25, 25);
```

[Exemple parametric](https://jsfiddle.net/amt01/gzwsqj93/)

![](https://i.imgur.com/jKcBJPkt.png)

### Geometry

`geometry` permet de créer un objet 3D de toutes pieces, en indiquant les sommets et les faces de l'objet à afficher.

``` js
// Un plan en forme de triangle
var geometry = new THREE.Geometry();
geometry.vertices.push(
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, -10, 0)
);
geometry.faces.push( new THREE.Face3(0, 1, 2));
```

Il est possible de modifier l'emplacement des sommets pour tous les objets `Geometry`, `PlaneGeometry`, `PolyhedronGeometry`, etc, à travers le tableau `vertices`. Ensuite, mettre `verticesNeedUpdate` à vrai pour que le moteur de rendu prenne en considération les modifications.

``` js
var delta = 0;

function render() {
  delta += 0.1;
  geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
  geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
```

### BufferGeometry

`bufferGeometry` est optimisé pour plus de performances par rapport à `geometry` mais ne permet de modifier les sommets dynamiquement contrairement à `geometry`.

``` js
// Un plan en forme de triangle
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array((
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, -10, 0)
]);
geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
```

### Texte

Pour pouvoir dessiner du texte 3D, il est nécessaire d'inclure une police d'écriture JSON.  
Three.js fournit quelques [polices d'écritures JSON](https://github.com/mrdoob/three.js/tree/master/examples/fonts): helvetiker, optimer, gentilis, droid sans, droid serif.  
Vous pouvez également [convertir vos propres polices en JSON](http://gero3.github.io/facetype.js/).

``` js
new THREE.FontLoader().load(url, function(font) {

  // Créer du texte
  var geometry = new THREE.TextGeometry("Hello World", {
    font: font,
    size: 10,
    height: 5,
    material: 0,
    bevelThickness: 1,
    extrudeMaterial: 1
  }),
  item = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));

  // Ajouter au canvas
  scene.add(item);
  renderer.render(scene, camera);
});
```

[JSFiddle TextGeometry](https://jsfiddle.net/amt01/Lk8c0n2v/)  
[Exemple typing text](https://threejs.org/examples/webgl_geometry_text.html#0C00FF111#uu)

Cette méthode n'est pas appropriée pour écrire du texte 2D. Pour écrire du texte 2D, la manière la plus performante reste d'utiliser du HTML positionné en absolu par dessus le canvas. [JSFiddle Texte 2D](https://jsfiddle.net/amt01/mvqfy4k7/)

---

## Matériaux

Il y a différents types de matériaux dans Three.js qui ont tous des propriétés différentes, comme répondre aux lumières, mapper des textures, ajuster l'opacité...

[JSFiddle materials](https://jsfiddle.net/amt01/wzhxLabo/)

### MeshBasicMaterial

`MeshBasicMaterial` est le matériel le plus basique, il permet de mettre une couleur à un objet. Il ne prend pas en considération la lumière/les ombres. Il peut être semi-transparent en définissant les paramètres `transparent` et `opacity`

``` js
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
});
```

![](https://i.imgur.com/A6fEyWpt.png)

### MeshNormalMaterial

`MeshNormalMaterial` colore les faces de l'objet différemment selon leur direction.

``` js
var material = new THREE.MeshNormalMaterial();
```

![](https://i.imgur.com/Q2bMCrYt.png)

### MeshDepthMaterial

Affiche les objets en niveau de gris. Les objets les plus proches sont plus sombres et les objets les plus éloignés sont plus clairs.

``` js
var material = new THREE.MeshDepthMaterial();
```

![](https://i.imgur.com/h7R0PRat.png)

### MeshLambertMaterial

`MeshLambertMaterial` est un matériel qui permet de colorer un objet, même principe que `MeshBasicMaterial` à la différence qu'il prend en considération les lumières pour afficher certaines zones plus sombres ou plus claires.

``` js
var material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
});
```

#### emissive

En définissant le paramètre `emissive`, l'objet irradie une couleur.  
L'intensité peut être contrôlée avec le paramètre `emissiveIntensity`.

``` js
var material = new THREE.MeshLambertMaterial({
  color: 0xf3ffe2,
  emissive: 0xff0000,
  emissiveIntensity: 0.1
});
```

#### side

Par défaut, les 3 faces du devant d'un cube sont affichées (et les faces de derrière sont dissimulées).  
On peut masquer les faces du devant et afficher celle du derrière à la place:

``` js
side: THREE.BackSide // par défaut: THREE.FrontSide
```

Avec `double`, les faces de devant sont visibles lorsque l'objet est de face et celles de derrière lorsqu'il est vu de derrière (si on le fait tourner sur lui-même à 180°).

``` js
side: THREE.DoubleSide
```

#### map

Plutôt qu'une couleur, on peut ajouter une texture.

``` js
color: 0xf3ffe2,
map: new THREE.TextureLoader().load('wool.jpg')
```

![](https://i.imgur.com/1zqsq7Tt.png)

### MeshPhongMaterial

`MeshPhongMaterial` répond également à la lumière mais est utilisée pour les surfaces qui brillent (tandis que `MeshLambertMaterial` est pour les surfaces mates) - le contraste entre les zones sombres et claires est plus élevé.

``` js
var material = new THREE.MeshPhongMaterial({
  color: 0xf3ff02
})
```

#### specular

On peut contrôler la quantité de lumière que la surface reflète avec `specular` et `shininess`

``` js
specular: 0xff0000,
shininess: 30
```

![](https://i.imgur.com/nojbUzTt.png)

### MeshStandardMaterial

`MeshStandardMaterial` est un nouveau matériel qui permet de rendre à la fois des textures mates et des textures brillantes.  
Il accepte pour ce faire des paramètres:

* `roughness`, rend la surface plus terne ou plus intense (couleur plus unie ou plus contrastée)
* `metalness`, augmente ou diminue le taux de rebondissement de la lumière sur la surface (donne un aspect plus métal ou plus plastique)

``` js
var material = new THREE.MeshStandardMaterial({
  color: 0xf3ffe2,
  roughness: 0.5,
  metalness: 0.5
})
```

![](https://i.imgur.com/me9tHr5t.png)

### LineBasicMaterial

Même principe que `MeshBasicMaterial` mais s'applique aux lignes (côtés) et non aux faces.

``` js
var geometry = new THREE.BoxGeometry(100,100,100),
    material = new THREE.LineBasicMaterial(),
    item = new THREE.Line(geometry, material);
```

![](https://i.imgur.com/I2nkmyat.png)

### LineDashedMaterial

Affiche des lignes avec des pointillés.  
On peut spécifier la taille des tirets et des espaces.

``` js
dashSize: 2,
gapSize: 2
```

Pour que ça fonctionne, il est nécessaire d'appeler `computeLineDistances` sur l'objet pour que le moteur de rendu calcule les distances.

``` js
var geometry = new THREE.BoxGeometry(100,100,100),
    material = new THREE.LineDashedMaterial({ dashSize:2, gapSize:2 }),
    item = new THREE.Line(geometry, material);

item.computeLineDistances();
```

![](https://i.imgur.com/hg8kFKbt.png)

### PointsMaterial

S'applique aux points (sommets).

``` js
var geometry = new THREE.BoxGeometry(100,100,100),
    material = new THREE.PointsMaterial(),
    item = new THREE.Points(geometry, material);
```

#### size

Il est possible de contrôler la taille des points avec le paramètre `size`

``` js
size: 10
```

![](https://i.imgur.com/2q7Fj4Dt.png)

### SpriteMaterial

Permet d'ajouter un sprite à l'écran (un plan).  
Un sprite est toujours orienté en face vers la caméra, on s'en sert pour afficher un fond.

``` js
var material = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('wool.jpg')
}),
mesh = new THREE.Sprite(material);

mesh.scale.set(100,100,100);
mesh.position.z = -1000;
```

---

## Animation

Comme pour un canvas, on utilise `window.requestAnimationFrame()` pour créer une animation de 60 images par secondes (idéalement).

On peut par exemple pour faire tourner un objet sur lui-même:

``` js
function render() {
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
```

On peut mettre à jour les propriétés `x`, `y` et `z` individuellement ou toutes en même temps avec `set(x, y, z)`:

``` js
cube.rotation.set(0.1,0.1,0.1);
```

Notez que les transformations peuvent être appliqués sur les objets ou sur la scène directement.

[Exemple faire tourner/zoomer/déplacer](https://threejs.org/examples/#webgl_animation_scene)  
[Exemple faire tourner](https://threejs.org/examples/webgl_geometry_shapes.html)

### Rotation

``` js
cube.rotation.y += 0.01;
```

### Augmenter/diminuer

``` js
cube.scale.x = Math.abs(Math.sin(0.5));
```

[JSFiddle Scale](https://jsfiddle.net/amt01/efq04gt4/)

### Déplacer

``` js
dodecahedron.position.y = -7 * Math.sin(t*2);
```

---

## Modèles

Il est possible de charger des objets (forme + matériel) à partir de fichiers JSON.  
Cela vous permet de créer vos modèles à partir de logiciels de création 3D, comme Blender.

``` js
var url = "model.json";

var loader = new THREE.JSONLoader(), mesh;
loader.crossOrigin = "";
loader.load(url, function draw_model(geometry, materials){
  var mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);
});
```

[JSFiddle Modèle](https://jsfiddle.net/amt01/no2tLk05/)  
[Modèles](http://va3c.github.io/viewer/cookbook/load-json-parse/r1/load-json-parse-r1.html)

### Modèle avec animation

Il est également de jouer l'animation du modèle, s'il en a:

``` js
var mixer;
loader.load(url, function draw_model(geometry, materials){

  // Display monkey
  var mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  // Create animation mixer
  var clip  = new THREE.AnimationClip.CreateFromMorphTargetSequence("mon_anim", geometry.morphTargets, 30);
  mixer = new THREE.AnimationMixer(mesh);
  mixer.clipAction(clip).setDuration(1).play();
}
```

``` js
// Animation loop
var prevTime = Date.now();

function render() {
  requestAnimationFrame(render);

  if(!mixer) {
    return;
  }
  // Update animation
  var time = Date.now();
  mixer.update((time - prevTime) * 0.0003);
  prevTime = time;

  // Render
  renderer.render(scene, camera);
}
render();
```

[JSFiddle Modèle animé](https://jsfiddle.net/amt01/zvrpww82/)  
[Cours: Three.js Loading Models](http://blog.cjgammon.com/threejs-models)

---

## Ombres

1. Pour pouvoir afficher des ombres, la première chose à faire est de définir quelques propriétés sur le moteur de rendu:

   ``` js
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFShadowMap;
   ```

2. Définir une source de lumière:

   ``` js
   var light = new THREE.SpotLight(0xffffff, 4, 3000);
   light.position.y = 100;
   light.target = mesh;
   ```

3. Définir l'ombre:

   ``` js
   light.castShadow = true;
   light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 1, 1000));
   light.shadow.bias = 0.0001;
   light.shadow.mapSize.width = 2048 * 2;
   light.shadow.mapSize.height = 2048 * 2;
   ```

4. Ajouter la lumière à la scène

   ``` js
   scene.add(light);
   ```

5. Activer le fait que nos objets peuvent projeter et recevoir des ombres:

   ``` js
   cube.castShadow = true;
   floor.receiveShadow = true;
   ```

[JSFiddle Shadow](https://jsfiddle.net/amt01/8fqvmxo5/)

---

## Caméras

Il y a plusieurs types de caméras

### PerspectiveCamera

`PerspectiveCamera` un type de caméra qui affiche les objets tels qu'on les voit dans le même réel: les objets éloignés sont plus petits que les objets proches.

``` js
camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1, 1000
);
```

* Paramètre 1: champs de vision, de haut en bas, en degrés
* Paramètre 2: *aspect ratio*
* Paramètre 3: *near plane*
* Paramètre 4: *far plane*

On peut bouger la caméra pour faire tourner la scène. Par exemple pour faire bouger la caméra autour du point lumineux:

``` js
var delta = 0;
function render() {
  delta += 0.01;

  camera.lookAt(light.position);
  camera.position.x = Math.sin(delta) * 200;
  camera.position.z = Math.cos(delta) * 200;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
```

[JSFiddle Faire bouger la caméra](https://jsfiddle.net/amt01/8fqvmxo5/1/)

### OrthographicCamera

Une `OrthographicCamera` n'a pas de perspective. Tous les objets sont affichés au même niveau.

``` js
camera = new THREE.OrthographicCamera(
  -300, 300,
  400, -400,
  0.1, 1000
)
```

* Paramètres 1 & 2: left, right
* Paramètres 3 & 4: top, bottom
* Paramètres 5 & 6: near & far planes

[JSFiddle Orthographic camera](https://jsfiddle.net/amt01/wzhxLabo/)

---

## Helpers

Three.js fournit des helpers pour afficher la position de la caméra et des lumières. C'est très utile pour debugger.

### Camera

`CameraHelper` permet de visualiser où se situe la caméra.

``` js
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

var newCamera    = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000),
    cameraHelper = new THREE.CameraHelper(newCamera);
scene.add(cameraHelper);
```

[JSFiddle CameraHelper](https://jsfiddle.net/amt01/ybfjqxhm/)

### Light

`PointLightHelper` permet de visualiser où se situe un PointLight.

``` js
var pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
```

[JSFiddle PointLightHelper](https://jsfiddle.net/amt01/ybfjqxhm/1/)

Il existe également des SpotLightHelper, DirectionalLightHelper, etc.

---

## Filtres

Il est possible d'ajouter des filtres à la scène en utilisant un `Composer`. Pour ce faire, on donne une liste de "passes" à effectuer au composer sur le moteur de rendu puis on affiche le résultat avec `composer.render` au lieu de `renderer.render`.

Il faut, au préalable, inclure les fichiers `EffectComposer.js`, `ShaderPass.js` et `RenderPass.js` disponibles sur le [repo Github](https://github.com/mrdoob/three.js/tree/dev/examples/js/postprocessing).  
Ajoutez ensuite les filtres (*shaders*) que vous voulez utiliser, voir les exemples disponibles sur le [repo Github](https://github.com/mrdoob/three.js/tree/dev/examples/js/shaders). Il vous faudra au minimum `CopyShader.js`.

Définissez `renderToScreen` sur votre dernier filtre.

``` js
var composer = new THREE.EffectComposer(renderer);

// Liste de passes
var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
renderPass.renderToScreen = true;

// renderer.render(scene, camera);
composer.render();
```

[JSFiddle EffectComposer](https://jsfiddle.net/amt01/f1o5g9wb/1/)  
[Cours: Three.js Post Processing](http://blog.cjgammon.com/threejs-post-processing)

---

## Pour aller plus loin

[Round corners](https://threejs.org/examples/webgl_modifier_subdivision.html)  
[Graphics and Rendering in Three.js](https://www.oreilly.com/library/view/programming-3d-applications/9781449363918/ch04.html)
