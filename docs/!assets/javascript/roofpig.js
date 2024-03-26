/**
 * Source: https://github.com/larspetrus/Roofpig
 */

/**
 * lib/Projector.js
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */
THREE.RenderableObject = function() {
    this.id = 0;
    this.object = null;
    this.z = 0;
};
THREE.RenderableFace = function() {
    this.id = 0;
    this.v1 = new THREE.RenderableVertex();
    this.v2 = new THREE.RenderableVertex();
    this.v3 = new THREE.RenderableVertex();
    this.normalModel = new THREE.Vector3();
    this.vertexNormalsModel = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
    this.vertexNormalsLength = 0;
    this.color = new THREE.Color();
    this.material = null;
    this.uvs = [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()];
    this.z = 0;
};
THREE.RenderableVertex = function() {
    this.position = new THREE.Vector3();
    this.positionWorld = new THREE.Vector3();
    this.positionScreen = new THREE.Vector4();
    this.visible = true;
};
THREE.RenderableVertex.prototype.copy = function(vertex) {
    this.positionWorld.copy(vertex.positionWorld);
    this.positionScreen.copy(vertex.positionScreen);
};
THREE.RenderableLine = function() {
    this.id = 0;
    this.v1 = new THREE.RenderableVertex();
    this.v2 = new THREE.RenderableVertex();
    this.vertexColors = [new THREE.Color(), new THREE.Color()];
    this.material = null;
    this.z = 0;
};
THREE.RenderableSprite = function() {
    this.id = 0;
    this.object = null;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.scale = new THREE.Vector2();
    this.material = null;
};
THREE.Projector = function() {
    var _object, _objectCount, _objectPool = [],
        _objectPoolLength = 0,
        _vertex, _vertexCount, _vertexPool = [],
        _vertexPoolLength = 0,
        _face, _faceCount, _facePool = [],
        _facePoolLength = 0,
        _line, _lineCount, _linePool = [],
        _linePoolLength = 0,
        _sprite, _spriteCount, _spritePool = [],
        _spritePoolLength = 0,

        _renderData = {
            objects: [],
            lights: [],
            elements: []
        },

        _vector3 = new THREE.Vector3(),
        _vector4 = new THREE.Vector4(),
        _clipBox = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
        _boundingBox = new THREE.Box3(),
        _points3 = new Array(3),
        _points4 = new Array(4),

        _viewMatrix = new THREE.Matrix4(),
        _viewProjectionMatrix = new THREE.Matrix4(),
        _modelMatrix,
        _modelViewProjectionMatrix = new THREE.Matrix4(),
        _normalMatrix = new THREE.Matrix3(),
        _frustum = new THREE.Frustum(),

        _clippedVertex1PositionScreen = new THREE.Vector4(),
        _clippedVertex2PositionScreen = new THREE.Vector4();

    this.projectVector = function(vector, camera) {
        console.warn('THREE.Projector: .projectVector() is now vector.project().');
        vector.project(camera);
    };
    this.unprojectVector = function(vector, camera) {
        console.warn('THREE.Projector: .unprojectVector() is now vector.unproject().');
        vector.unproject(camera);
    };
    this.pickingRay = function(vector, camera) {
        console.error('THREE.Projector: .pickingRay() is now raycaster.setFromCamera().');
    };

    var RenderList = function() {
        var normals = [];
        var uvs = [];
        var object = null;
        var material = null;
        var normalMatrix = new THREE.Matrix3();

        var setObject = function(value) {
            object = value;
            material = object.material;
            normalMatrix.getNormalMatrix(object.matrixWorld);
            normals.length = 0;
            uvs.length = 0;
        };
        var projectVertex = function(vertex) {
            var position = vertex.position;
            var positionWorld = vertex.positionWorld;
            var positionScreen = vertex.positionScreen;

            positionWorld.copy(position).applyMatrix4(_modelMatrix);
            positionScreen.copy(positionWorld).applyMatrix4(_viewProjectionMatrix);

            var invW = 1 / positionScreen.w;
            positionScreen.x *= invW;
            positionScreen.y *= invW;
            positionScreen.z *= invW;

            vertex.visible = positionScreen.x >= -1 && positionScreen.x <= 1 &&
                positionScreen.y >= -1 && positionScreen.y <= 1 &&
                positionScreen.z >= -1 && positionScreen.z <= 1;
        };
        var pushVertex = function(x, y, z) {
            _vertex = getNextVertexInPool();
            _vertex.position.set(x, y, z);

            projectVertex(_vertex);
        };
        var pushNormal = function(x, y, z) {
            normals.push(x, y, z);
        };
        var pushUv = function(x, y) {
            uvs.push(x, y);
        };
        var checkTriangleVisibility = function(v1, v2, v3) {
            if (v1.visible === true || v2.visible === true || v3.visible === true) return true;

            _points3[0] = v1.positionScreen;
            _points3[1] = v2.positionScreen;
            _points3[2] = v3.positionScreen;

            return _clipBox.isIntersectionBox(_boundingBox.setFromPoints(_points3));
        };
        var checkBackfaceCulling = function(v1, v2, v3) {
            return ((v3.positionScreen.x - v1.positionScreen.x) *
                (v2.positionScreen.y - v1.positionScreen.y) -
                (v3.positionScreen.y - v1.positionScreen.y) *
                (v2.positionScreen.x - v1.positionScreen.x)) < 0;
        };
        var pushLine = function(a, b) {
            var v1 = _vertexPool[a];
            var v2 = _vertexPool[b];

            _line = getNextLineInPool();
            _line.id = object.id;
            _line.v1.copy(v1);
            _line.v2.copy(v2);
            _line.z = (v1.positionScreen.z + v2.positionScreen.z) / 2;
            _line.material = object.material;
            _renderData.elements.push(_line);
        };
        var pushTriangle = function(a, b, c) {
            var v1 = _vertexPool[a];
            var v2 = _vertexPool[b];
            var v3 = _vertexPool[c];

            if (checkTriangleVisibility(v1, v2, v3) === false)
              return;

            if (material.side === THREE.DoubleSide || checkBackfaceCulling(v1, v2, v3) === true) {
                _face = getNextFaceInPool();
                _face.id = object.id;
                _face.v1.copy(v1);
                _face.v2.copy(v2);
                _face.v3.copy(v3);
                _face.z = (v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z) / 3;

                for (var i = 0; i < 3; i++) {
                    var offset = arguments[i] * 3;
                    var normal = _face.vertexNormalsModel[i];

                    normal.set(normals[offset], normals[offset + 1], normals[offset + 2]);
                    normal.applyMatrix3(normalMatrix).normalize();

                    var offset2 = arguments[i] * 2;
                    var uv = _face.uvs[i];
                    uv.set(uvs[offset2], uvs[offset2 + 1]);
                }
                _face.vertexNormalsLength = 3;
                _face.material = object.material;
                _renderData.elements.push(_face);
            }
        };
        return {
            setObject: setObject,
            projectVertex: projectVertex,
            checkTriangleVisibility: checkTriangleVisibility,
            checkBackfaceCulling: checkBackfaceCulling,
            pushVertex: pushVertex,
            pushNormal: pushNormal,
            pushUv: pushUv,
            pushLine: pushLine,
            pushTriangle: pushTriangle
        }
    };

    var renderList = new RenderList();

    this.projectScene = function(scene, camera, sortObjects, sortElements) {
        _faceCount = 0;
        _lineCount = 0;
        _spriteCount = 0;
        _renderData.elements.length = 0;

        if (scene.autoUpdate === true) scene.updateMatrixWorld();
        if (camera.parent === undefined) camera.updateMatrixWorld();

        _viewMatrix.copy(camera.matrixWorldInverse.getInverse(camera.matrixWorld));
        _viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, _viewMatrix);
        _frustum.setFromMatrix(_viewProjectionMatrix);

        _objectCount = 0;
        _renderData.objects.length = 0;
        _renderData.lights.length = 0;

        scene.traverseVisible(function(object) {

            if (object instanceof THREE.Light) {
                _renderData.lights.push(object);

            } else if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite) {
                if (object.material.visible === false) return;

                if (object.frustumCulled === false || _frustum.intersectsObject(object) === true) {
                    _object = getNextObjectInPool();
                    _object.id = object.id;
                    _object.object = object;

                    _vector3.setFromMatrixPosition(object.matrixWorld);
                    _vector3.applyProjection(_viewProjectionMatrix);
                    _object.z = _vector3.z;

                    _renderData.objects.push(_object);
                }
            }
        });
        if (sortObjects === true) {
            _renderData.objects.sort(painterSort);
        }

        for (var o = 0, ol = _renderData.objects.length; o < ol; o++) {
            var object = _renderData.objects[o].object;
            var geometry = object.geometry;

            renderList.setObject(object);
            _modelMatrix = object.matrixWorld;
            _vertexCount = 0;

            if (object instanceof THREE.Mesh) {
                if (geometry instanceof THREE.BufferGeometry) {
                    var attributes = geometry.attributes;
                    var offsets = geometry.offsets;

                    if (attributes.position === undefined) continue;
                    var positions = attributes.position.array;

                    for (var i = 0, l = positions.length; i < l; i += 3) {
                        renderList.pushVertex(positions[i], positions[i + 1], positions[i + 2]);
                    }
                    if (attributes.normal !== undefined) {
                        var normals = attributes.normal.array;

                        for (var i = 0, l = normals.length; i < l; i += 3) {
                            renderList.pushNormal(normals[i], normals[i + 1], normals[i + 2]);
                        }
                    }

                    if (attributes.uv !== undefined) {
                        var uvs = attributes.uv.array;

                        for (var i = 0, l = uvs.length; i < l; i += 2) {
                            renderList.pushUv(uvs[i], uvs[i + 1]);
                        }
                    }

                    if (attributes.index !== undefined) {
                        var indices = attributes.index.array;

                        if (offsets.length > 0) {
                            for (var o = 0; o < offsets.length; o++) {
                                var offset = offsets[o];
                                var index = offset.index;

                                for (var i = offset.start, l = offset.start + offset.count; i < l; i += 3) {
                                    renderList.pushTriangle(indices[i] + index, indices[i + 1] + index, indices[i + 2] + index);
                                }
                            }
                        } else {
                            for (var i = 0, l = indices.length; i < l; i += 3) {
                                renderList.pushTriangle(indices[i], indices[i + 1], indices[i + 2]);
                            }
                        }

                    } else {
                        for (var i = 0, l = positions.length / 3; i < l; i += 3) {
                            renderList.pushTriangle(i, i + 1, i + 2);
                        }
                    }

                } else if (geometry instanceof THREE.Geometry) {
                    var vertices = geometry.vertices;
                    var faces = geometry.faces;
                    var faceVertexUvs = geometry.faceVertexUvs[0];
                    _normalMatrix.getNormalMatrix(_modelMatrix);

                    var material = object.material;
                    var isFaceMaterial = material instanceof THREE.MeshFaceMaterial;
                    var objectMaterials = isFaceMaterial === true ? object.material : null;

                    for (var v = 0, vl = vertices.length; v < vl; v++) {
                        var vertex = vertices[v];
                        _vector3.copy(vertex);

                        if (material.morphTargets === true) {
                            var morphTargets = geometry.morphTargets;
                            var morphInfluences = object.morphTargetInfluences;

                            for (var t = 0, tl = morphTargets.length; t < tl; t++) {
                                var influence = morphInfluences[t];
                                if (influence === 0) continue;

                                var target = morphTargets[t];
                                var targetVertex = target.vertices[v];

                                _vector3.x += (targetVertex.x - vertex.x) * influence;
                                _vector3.y += (targetVertex.y - vertex.y) * influence;
                                _vector3.z += (targetVertex.z - vertex.z) * influence;
                            }
                        }
                        renderList.pushVertex(_vector3.x, _vector3.y, _vector3.z);
                    }

                    for (var f = 0, fl = faces.length; f < fl; f++) {
                        var face = faces[f];
                        var material = isFaceMaterial === true ?
                            objectMaterials.materials[face.materialIndex] :
                            object.material;

                        if (material === undefined) continue;

                        var side = material.side;
                        var v1 = _vertexPool[face.a];
                        var v2 = _vertexPool[face.b];
                        var v3 = _vertexPool[face.c];

                        if (renderList.checkTriangleVisibility(v1, v2, v3) === false) continue;
                        var visible = renderList.checkBackfaceCulling(v1, v2, v3);

                        if (side !== THREE.DoubleSide) {
                            if (side === THREE.FrontSide && visible === false) continue;
                            if (side === THREE.BackSide && visible === true) continue;
                        }
                        _face = getNextFaceInPool();
                        _face.id = object.id;
                        _face.v1.copy(v1);
                        _face.v2.copy(v2);
                        _face.v3.copy(v3);
                        _face.normalModel.copy(face.normal);

                        if (visible === false && (side === THREE.BackSide || side === THREE.DoubleSide)) {
                            _face.normalModel.negate();
                        }
                        _face.normalModel.applyMatrix3(_normalMatrix).normalize();
                        var faceVertexNormals = face.vertexNormals;

                        for (var n = 0, nl = Math.min(faceVertexNormals.length, 3); n < nl; n++) {
                            var normalModel = _face.vertexNormalsModel[n];
                            normalModel.copy(faceVertexNormals[n]);

                            if (visible === false && (side === THREE.BackSide || side === THREE.DoubleSide)) {
                                normalModel.negate();
                            }
                            normalModel.applyMatrix3(_normalMatrix).normalize();
                        }
                        _face.vertexNormalsLength = faceVertexNormals.length;

                        var vertexUvs = faceVertexUvs[f];
                        if (vertexUvs !== undefined) {
                            for (var u = 0; u < 3; u++) {
                                _face.uvs[u].copy(vertexUvs[u]);
                            }
                        }
                        _face.color = face.color;
                        _face.material = material;
                        _face.z = (v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z) / 3;

                        _renderData.elements.push(_face);
                    }
                }

            } else if (object instanceof THREE.Line) {
                if (geometry instanceof THREE.BufferGeometry) {
                    var attributes = geometry.attributes;

                    if (attributes.position !== undefined) {
                        var positions = attributes.position.array;

                        for (var i = 0, l = positions.length; i < l; i += 3) {
                            renderList.pushVertex(positions[i], positions[i + 1], positions[i + 2]);
                        }
                        if (attributes.index !== undefined) {
                            var indices = attributes.index.array;

                            for (var i = 0, l = indices.length; i < l; i += 2) {
                                renderList.pushLine(indices[i], indices[i + 1]);
                            }

                        } else {
                            var step = object.mode === THREE.LinePieces ? 2 : 1;

                            for (var i = 0, l = (positions.length / 3) - 1; i < l; i += step) {
                                renderList.pushLine(i, i + 1);
                            }
                        }
                    }

                } else if (geometry instanceof THREE.Geometry) {
                    _modelViewProjectionMatrix.multiplyMatrices(_viewProjectionMatrix, _modelMatrix);

                    var vertices = object.geometry.vertices;
                    if (vertices.length === 0) continue;

                    v1 = getNextVertexInPool();
                    v1.positionScreen.copy(vertices[0]).applyMatrix4(_modelViewProjectionMatrix);

                    // Handle LineStrip and LinePieces
                    var step = object.mode === THREE.LinePieces ? 2 : 1;

                    for (var v = 1, vl = vertices.length; v < vl; v++) {
                        v1 = getNextVertexInPool();
                        v1.positionScreen.copy(vertices[v]).applyMatrix4(_modelViewProjectionMatrix);

                        if ((v + 1) % step > 0) continue;
                        v2 = _vertexPool[_vertexCount - 2];

                        _clippedVertex1PositionScreen.copy(v1.positionScreen);
                        _clippedVertex2PositionScreen.copy(v2.positionScreen);

                        if (clipLine(_clippedVertex1PositionScreen, _clippedVertex2PositionScreen) === true) {

                            // Perform the perspective divide
                            _clippedVertex1PositionScreen.multiplyScalar(1 / _clippedVertex1PositionScreen.w);
                            _clippedVertex2PositionScreen.multiplyScalar(1 / _clippedVertex2PositionScreen.w);

                            _line = getNextLineInPool();
                            _line.id = object.id;
                            _line.v1.positionScreen.copy(_clippedVertex1PositionScreen);
                            _line.v2.positionScreen.copy(_clippedVertex2PositionScreen);
                            _line.z = Math.max(_clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z);
                            _line.material = object.material;

                            if (object.material.vertexColors === THREE.VertexColors) {
                                _line.vertexColors[0].copy(object.geometry.colors[v]);
                                _line.vertexColors[1].copy(object.geometry.colors[v - 1]);
                            }
                            _renderData.elements.push(_line);
                        }
                    }
                }

            } else if (object instanceof THREE.Sprite) {
                _vector4.set(_modelMatrix.elements[12], _modelMatrix.elements[13], _modelMatrix.elements[14], 1);
                _vector4.applyMatrix4(_viewProjectionMatrix);

                var invW = 1 / _vector4.w;
                _vector4.z *= invW;

                if (_vector4.z >= -1 && _vector4.z <= 1) {
                    _sprite = getNextSpriteInPool();
                    _sprite.id = object.id;
                    _sprite.x = _vector4.x * invW;
                    _sprite.y = _vector4.y * invW;
                    _sprite.z = _vector4.z;
                    _sprite.object = object;

                    _sprite.rotation = object.rotation;
                    _sprite.scale.x = object.scale.x * Math.abs(
                        _sprite.x - (_vector4.x + camera.projectionMatrix.elements[0]) / (_vector4.w + camera.projectionMatrix.elements[12])
                    );
                    _sprite.scale.y = object.scale.y * Math.abs(
                        _sprite.y - (_vector4.y + camera.projectionMatrix.elements[5]) / (_vector4.w + camera.projectionMatrix.elements[13])
                    );
                    _sprite.material = object.material;
                    _renderData.elements.push(_sprite);
                }
            }
        }

        if (sortElements === true) {
            _renderData.elements.sort(painterSort);
        }
        return _renderData;
    };

    // Pools

    function getNextObjectInPool() {
        if (_objectCount === _objectPoolLength) {
            var object = new THREE.RenderableObject();
            _objectPool.push(object);
            _objectPoolLength++;
            _objectCount++;
            return object;
        }
        return _objectPool[_objectCount++];
    }

    function getNextVertexInPool() {
        if (_vertexCount === _vertexPoolLength) {
            var vertex = new THREE.RenderableVertex();
            _vertexPool.push(vertex);
            _vertexPoolLength++;
            _vertexCount++;
            return vertex;
        }
        return _vertexPool[_vertexCount++];
    }

    function getNextFaceInPool() {
        if (_faceCount === _facePoolLength) {
            var face = new THREE.RenderableFace();
            _facePool.push(face);
            _facePoolLength++;
            _faceCount++;
            return face;
        }
        return _facePool[_faceCount++];
    }

    function getNextLineInPool() {
        if (_lineCount === _linePoolLength) {
            var line = new THREE.RenderableLine();
            _linePool.push(line);
            _linePoolLength++;
            _lineCount++
            return line;
        }
        return _linePool[_lineCount++];
    }

    function getNextSpriteInPool() {
        if (_spriteCount === _spritePoolLength) {
            var sprite = new THREE.RenderableSprite();
            _spritePool.push(sprite);
            _spritePoolLength++;
            _spriteCount++
            return sprite;
        }
        return _spritePool[_spriteCount++];
    }

    function painterSort(a, b) {
        if (a.z !== b.z) {
            return b.z - a.z;
        } else if (a.id !== b.id) {
            return a.id - b.id;
        } else {
            return 0;
        }
    }

    function clipLine(s1, s2) {
        var alpha1 = 0,
            alpha2 = 1,

            // Calculate the boundary coordinate of each vertex for the near and far clip planes,
            // Z = -1 and Z = +1, respectively.
            bc1near = s1.z + s1.w,
            bc2near = s2.z + s2.w,
            bc1far = -s1.z + s1.w,
            bc2far = -s2.z + s2.w;

        // Both vertices lie entirely within all clip planes.
        if (bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0) {
            return true;

        // Both vertices lie entirely outside one of the clip planes.
        } else if ((bc1near < 0 && bc2near < 0) || (bc1far < 0 && bc2far < 0)) {
            return false;

        // The line segment spans at least one clip plane.
        } else {
            // v1 lies outside the near plane, v2 inside
            if (bc1near < 0) {
                alpha1 = Math.max(alpha1, bc1near / (bc1near - bc2near));

            // v2 lies outside the near plane, v1 inside
            } else if (bc2near < 0) {
                alpha2 = Math.min(alpha2, bc1near / (bc1near - bc2near));
            }

            // v1 lies outside the far plane, v2 inside
            if (bc1far < 0) {
                alpha1 = Math.max(alpha1, bc1far / (bc1far - bc2far));

            // v2 lies outside the far plane, v2 inside
            } else if (bc2far < 0) {
                alpha2 = Math.min(alpha2, bc1far / (bc1far - bc2far));
            }

            // The line segment spans two boundaries, but is outside both of them.
            // (This can't happen when we're only clipping against just near/far but good
            //  to leave the check here for future usage if other clip planes are added.)
            if (alpha2 < alpha1) {
                return false;

            // Update the s1 and s2 vertices to match the clipped line segment.
            } else {
                s1.lerp(s2, alpha1);
                s2.lerp(s1, 1 - alpha2);
                return true;
            }
        }
    }
};

/**
 * lib/CanvasRenderer.js
 * @author mrdoob / http://mrdoob.com/
 */
THREE.SpriteCanvasMaterial = function(parameters) {
    THREE.Material.call(this);

    this.type = 'SpriteCanvasMaterial';
    this.color = new THREE.Color(0xffffff);
    this.program = function(context, color) {};
    this.setValues(parameters);
};
THREE.SpriteCanvasMaterial.prototype = Object.create(THREE.Material.prototype);
THREE.SpriteCanvasMaterial.prototype.constructor = THREE.SpriteCanvasMaterial;

THREE.SpriteCanvasMaterial.prototype.clone = function() {
    var material = new THREE.SpriteCanvasMaterial();
    THREE.Material.prototype.clone.call(this, material);
    material.color.copy(this.color);
    material.program = this.program;
    return material;
};
THREE.CanvasRenderer = function(parameters) {
    console.log('THREE.CanvasRenderer', THREE.REVISION);

    var smoothstep = THREE.Math.smoothstep;
    parameters = parameters || {};

    var _this = this,
        _renderData, _elements, _lights,
        _projector = new THREE.Projector(),

        _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement('canvas'),
        _canvasWidth = _canvas.width,
        _canvasHeight = _canvas.height,
        _canvasWidthHalf = Math.floor(_canvasWidth / 2),
        _canvasHeightHalf = Math.floor(_canvasHeight / 2),
        _viewportX = 0,
        _viewportY = 0,
        _viewportWidth = _canvasWidth,
        _viewportHeight = _canvasHeight,
        pixelRatio = 1,

        _context = _canvas.getContext('2d', {
            alpha: parameters.alpha === true
        }),
        _clearColor = new THREE.Color(0x000000),
        _clearAlpha = parameters.alpha === true ? 0 : 1,
        _contextGlobalAlpha = 1,
        _contextGlobalCompositeOperation = 0,
        _contextStrokeStyle = null,
        _contextFillStyle = null,
        _contextLineWidth = null,
        _contextLineCap = null,
        _contextLineJoin = null,
        _contextLineDash = [],
        _camera,

        _v1, _v2, _v3, _v4,
        _v5 = new THREE.RenderableVertex(),
        _v6 = new THREE.RenderableVertex(),
        _v1x, _v1y, _v2x, _v2y, _v3x, _v3y,
        _v4x, _v4y, _v5x, _v5y, _v6x, _v6y,

        _color = new THREE.Color(),
        _color1 = new THREE.Color(),
        _color2 = new THREE.Color(),
        _color3 = new THREE.Color(),
        _color4 = new THREE.Color(),

        _diffuseColor = new THREE.Color(),
        _emissiveColor = new THREE.Color(),
        _lightColor = new THREE.Color(),
        _patterns = {},
        _image, _uvs,
        _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y,

        _clipBox = new THREE.Box2(),
        _clearBox = new THREE.Box2(),
        _elemBox = new THREE.Box2(),

        _ambientLight = new THREE.Color(),
        _directionalLights = new THREE.Color(),
        _pointLights = new THREE.Color(),

        _vector3 = new THREE.Vector3(), // Needed for PointLight
        _centroid = new THREE.Vector3(),
        _normal = new THREE.Vector3(),
        _normalViewMatrix = new THREE.Matrix3();

    // dash+gap fallbacks for Firefox and everything else
    if (_context.setLineDash === undefined) {
        _context.setLineDash = function() {}
    }
    this.domElement = _canvas;
    this.autoClear = true;
    this.sortObjects = true;
    this.sortElements = true;

    this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    }

    // WebGLRenderer compatibility
    this.supportsVertexTextures = function() {};
    this.setFaceCulling = function() {};

    this.getPixelRatio = function() {
        return pixelRatio;
    };
    this.setPixelRatio = function(value) {
        pixelRatio = value;
    };
    this.setSize = function(width, height, updateStyle) {
        _canvasWidth = width * pixelRatio;
        _canvasHeight = height * pixelRatio;
        _canvas.width = _canvasWidth;
        _canvas.height = _canvasHeight;
        _canvasWidthHalf = Math.floor(_canvasWidth / 2);
        _canvasHeightHalf = Math.floor(_canvasHeight / 2);

        if (updateStyle !== false) {
            _canvas.style.width = width + 'px';
            _canvas.style.height = height + 'px';
        }
        _clipBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);
        _clipBox.max.set(_canvasWidthHalf, _canvasHeightHalf);
        _clearBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);
        _clearBox.max.set(_canvasWidthHalf, _canvasHeightHalf);

        _contextGlobalAlpha = 1;
        _contextGlobalCompositeOperation = 0;
        _contextStrokeStyle = null;
        _contextFillStyle = null;
        _contextLineWidth = null;
        _contextLineCap = null;
        _contextLineJoin = null;

        this.setViewport(0, 0, width, height);
    };
    this.setViewport = function(x, y, width, height) {
        _viewportX = x * pixelRatio;
        _viewportY = y * pixelRatio;
        _viewportWidth = width * pixelRatio;
        _viewportHeight = height * pixelRatio;
    };
    this.setScissor = function() {};
    this.enableScissorTest = function() {};

    this.setClearColor = function(color, alpha) {
        _clearColor.set(color);
        _clearAlpha = alpha !== undefined ? alpha : 1;
        _clearBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);
        _clearBox.max.set(_canvasWidthHalf, _canvasHeightHalf);
    };
    this.setClearColorHex = function(hex, alpha) {
        console.warn('THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead.');
        this.setClearColor(hex, alpha);
    };
    this.getClearColor = function() {
        return _clearColor;
    };
    this.getClearAlpha = function() {
        return _clearAlpha;
    };
    this.getMaxAnisotropy = function() {
        return 0;
    };
    this.clear = function() {
        if (_clearBox.empty() === false) {
            _clearBox.intersect(_clipBox);
            _clearBox.expandByScalar(2);

            _clearBox.min.x = _clearBox.min.x + _canvasWidthHalf;
            _clearBox.min.y = -_clearBox.min.y + _canvasHeightHalf; // higher y value !
            _clearBox.max.x = _clearBox.max.x + _canvasWidthHalf;
            _clearBox.max.y = -_clearBox.max.y + _canvasHeightHalf; // lower y value !

            if (_clearAlpha < 1) {
                _context.clearRect(
                    _clearBox.min.x | 0,
                    _clearBox.max.y | 0,
                    (_clearBox.max.x - _clearBox.min.x) | 0,
                    (_clearBox.min.y - _clearBox.max.y) | 0
                );
            }
            if (_clearAlpha > 0) {
                setBlending(THREE.NormalBlending);
                setOpacity(1);

                setFillStyle(
                    'rgba(' + Math.floor(_clearColor.r * 255)
                    + ',' + Math.floor(_clearColor.g * 255)
                    + ',' + Math.floor(_clearColor.b * 255)
                    + ',' + _clearAlpha + ')'
                );
                _context.fillRect(
                    _clearBox.min.x | 0,
                    _clearBox.max.y | 0,
                    (_clearBox.max.x - _clearBox.min.x) | 0,
                    (_clearBox.min.y - _clearBox.max.y) | 0
                );
            }
            _clearBox.makeEmpty();
        }
    };

    // compatibility
    this.clearColor = function() {};
    this.clearDepth = function() {};
    this.clearStencil = function() {};

    this.render = function(scene, camera) {
        if (camera instanceof THREE.Camera === false) {
            console.error('THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.');
            return;
        }
        if (this.autoClear === true) this.clear();

        _this.info.render.vertices = 0;
        _this.info.render.faces = 0;
        _context.setTransform(
            _viewportWidth / _canvasWidth,
            0,
            0,
            -_viewportHeight / _canvasHeight,
            _viewportX, _canvasHeight - _viewportY
        );
        _context.translate(_canvasWidthHalf, _canvasHeightHalf);

        _renderData = _projector.projectScene(scene, camera, this.sortObjects, this.sortElements);
        _elements = _renderData.elements;
        _lights = _renderData.lights;
        _camera = camera;
        _normalViewMatrix.getNormalMatrix(camera.matrixWorldInverse);

        /* DEBUG
         setFillStyle( 'rgba( 0, 255, 255, 0.5 )' );
         _context.fillRect( _clipBox.min.x, _clipBox.min.y, _clipBox.max.x - _clipBox.min.x, _clipBox.max.y - _clipBox.min.y );
         */
        calculateLights();

        for (var e = 0, el = _elements.length; e < el; e++) {
            var element = _elements[e];
            var material = element.material;

            if (material === undefined || material.opacity === 0) continue;
            _elemBox.makeEmpty();

            if (element instanceof THREE.RenderableSprite) {
                _v1 = element;
                _v1.x *= _canvasWidthHalf;
                _v1.y *= _canvasHeightHalf;
                renderSprite(_v1, element, material);

            } else if (element instanceof THREE.RenderableLine) {
                _v1 = element.v1;
                _v2 = element.v2;
                _v1.positionScreen.x *= _canvasWidthHalf;
                _v1.positionScreen.y *= _canvasHeightHalf;
                _v2.positionScreen.x *= _canvasWidthHalf;
                _v2.positionScreen.y *= _canvasHeightHalf;

                _elemBox.setFromPoints([
                    _v1.positionScreen,
                    _v2.positionScreen
                ]);
                if (_clipBox.isIntersectionBox(_elemBox) === true) {
                    renderLine(_v1, _v2, element, material);
                }

            } else if (element instanceof THREE.RenderableFace) {
                _v1 = element.v1;
                _v2 = element.v2;
                _v3 = element.v3;

                if (_v1.positionScreen.z < -1 || _v1.positionScreen.z > 1) continue;
                if (_v2.positionScreen.z < -1 || _v2.positionScreen.z > 1) continue;
                if (_v3.positionScreen.z < -1 || _v3.positionScreen.z > 1) continue;

                _v1.positionScreen.x *= _canvasWidthHalf;
                _v1.positionScreen.y *= _canvasHeightHalf;
                _v2.positionScreen.x *= _canvasWidthHalf;
                _v2.positionScreen.y *= _canvasHeightHalf;
                _v3.positionScreen.x *= _canvasWidthHalf;
                _v3.positionScreen.y *= _canvasHeightHalf;

                if (material.overdraw > 0) {
                    expand(_v1.positionScreen, _v2.positionScreen, material.overdraw);
                    expand(_v2.positionScreen, _v3.positionScreen, material.overdraw);
                    expand(_v3.positionScreen, _v1.positionScreen, material.overdraw);
                }
                _elemBox.setFromPoints([
                    _v1.positionScreen,
                    _v2.positionScreen,
                    _v3.positionScreen
                ]);

                if (_clipBox.isIntersectionBox(_elemBox) === true) {
                    renderFace3(_v1, _v2, _v3, 0, 1, 2, element, material);
                }
            }

            /* DEBUG
             setLineWidth( 1 );
             setStrokeStyle( 'rgba( 0, 255, 0, 0.5 )' );
             _context.strokeRect( _elemBox.min.x, _elemBox.min.y, _elemBox.max.x - _elemBox.min.x, _elemBox.max.y - _elemBox.min.y );
             */
            _clearBox.union(_elemBox);
        }

        /* DEBUG
         setLineWidth( 1 );
         setStrokeStyle( 'rgba( 255, 0, 0, 0.5 )' );
         _context.strokeRect( _clearBox.min.x, _clearBox.min.y, _clearBox.max.x - _clearBox.min.x, _clearBox.max.y - _clearBox.min.y );
         */
        _context.setTransform(1, 0, 0, 1, 0, 0);
    };

    function calculateLights() {
        _ambientLight.setRGB(0, 0, 0);
        _directionalLights.setRGB(0, 0, 0);
        _pointLights.setRGB(0, 0, 0);

        for (var l = 0, ll = _lights.length; l < ll; l++) {
            var light = _lights[l];
            var lightColor = light.color;

            if (light instanceof THREE.AmbientLight) {
                _ambientLight.add(lightColor);

            } else if (light instanceof THREE.DirectionalLight) {

                // for sprites
                _directionalLights.add(lightColor);

            } else if (light instanceof THREE.PointLight) {

                // for sprites
                _pointLights.add(lightColor);
            }
        }
    }
    function calculateLight(position, normal, color) {

        for (var l = 0, ll = _lights.length; l < ll; l++) {
            var light = _lights[l];
            _lightColor.copy(light.color);

            if (light instanceof THREE.DirectionalLight) {
                var lightPosition = _vector3.setFromMatrixPosition(light.matrixWorld).normalize();
                var amount = normal.dot(lightPosition);

                if (amount <= 0) continue;
                amount *= light.intensity;

                color.add(_lightColor.multiplyScalar(amount));

            } else if (light instanceof THREE.PointLight) {
                var lightPosition = _vector3.setFromMatrixPosition(light.matrixWorld);
                var amount = normal.dot(_vector3.subVectors(lightPosition, position).normalize());

                if (amount <= 0) continue;
                amount *= light.distance == 0 ? 1 : 1 - Math.min(position.distanceTo(lightPosition) / light.distance, 1);

                if (amount == 0) continue;
                amount *= light.intensity;

                color.add(_lightColor.multiplyScalar(amount));
            }
        }
    }

    function renderSprite(v1, element, material) {
        setOpacity(material.opacity);
        setBlending(material.blending);

        var scaleX = element.scale.x * _canvasWidthHalf;
        var scaleY = element.scale.y * _canvasHeightHalf;
        var dist = 0.5 * Math.sqrt(scaleX * scaleX + scaleY * scaleY); // allow for rotated sprite
        _elemBox.min.set(v1.x - dist, v1.y - dist);
        _elemBox.max.set(v1.x + dist, v1.y + dist);

        if (material instanceof THREE.SpriteMaterial) {
            var texture = material.map;

            if (texture !== null && texture.image !== undefined) {
                if (texture.hasEventListener('update', onTextureUpdate) === false) {
                    if (texture.image.width > 0) {
                        textureToPattern(texture);
                    }
                    texture.addEventListener('update', onTextureUpdate);
                }
                var pattern = _patterns[texture.id];

                if (pattern !== undefined) {
                    setFillStyle(pattern);

                } else {
                    setFillStyle('rgba( 0, 0, 0, 1 )');
                }
                var bitmap = texture.image;
                var ox = bitmap.width * texture.offset.x;
                var oy = bitmap.height * texture.offset.y;
                var sx = bitmap.width * texture.repeat.x;
                var sy = bitmap.height * texture.repeat.y;
                var cx = scaleX / sx;
                var cy = scaleY / sy;

                _context.save();
                _context.translate(v1.x, v1.y);
                if (material.rotation !== 0) _context.rotate(material.rotation);
                _context.translate(-scaleX / 2, -scaleY / 2);
                _context.scale(cx, cy);
                _context.translate(-ox, -oy);
                _context.fillRect(ox, oy, sx, sy);
                _context.restore();

            } else {
                // no texture
                setFillStyle(material.color.getStyle());

                _context.save();
                _context.translate(v1.x, v1.y);

                if (material.rotation !== 0)
                    _context.rotate(material.rotation);

                _context.scale(scaleX, -scaleY);
                _context.fillRect(-0.5, -0.5, 1, 1);
                _context.restore();
            }

        } else if (material instanceof THREE.SpriteCanvasMaterial) {
            setStrokeStyle(material.color.getStyle());
            setFillStyle(material.color.getStyle());

            _context.save();
            _context.translate(v1.x, v1.y);

            if (material.rotation !== 0)
                _context.rotate(material.rotation);

            _context.scale(scaleX, scaleY);
            material.program(_context);
            _context.restore();
        }

        /* DEBUG
         setStrokeStyle( 'rgb(255,255,0)' );
         _context.beginPath();
         _context.moveTo( v1.x - 10, v1.y );
         _context.lineTo( v1.x + 10, v1.y );
         _context.moveTo( v1.x, v1.y - 10 );
         _context.lineTo( v1.x, v1.y + 10 );
         _context.stroke();
         */
    }

    function renderLine(v1, v2, element, material) {
        setOpacity(material.opacity);
        setBlending(material.blending);

        _context.beginPath();
        _context.moveTo(v1.positionScreen.x, v1.positionScreen.y);
        _context.lineTo(v2.positionScreen.x, v2.positionScreen.y);

        if (material instanceof THREE.LineBasicMaterial) {
            setLineWidth(material.linewidth);
            setLineCap(material.linecap);
            setLineJoin(material.linejoin);

            if (material.vertexColors !== THREE.VertexColors) {
                setStrokeStyle(material.color.getStyle());

            } else {
                var colorStyle1 = element.vertexColors[0].getStyle();
                var colorStyle2 = element.vertexColors[1].getStyle();

                if (colorStyle1 === colorStyle2) {
                    setStrokeStyle(colorStyle1);

                } else {
                    try {
                        var grad = _context.createLinearGradient(
                            v1.positionScreen.x,
                            v1.positionScreen.y,
                            v2.positionScreen.x,
                            v2.positionScreen.y
                        );
                        grad.addColorStop(0, colorStyle1);
                        grad.addColorStop(1, colorStyle2);

                    } catch (exception) {
                        grad = colorStyle1;
                    }
                    setStrokeStyle(grad);
                }
            }
            _context.stroke();
            _elemBox.expandByScalar(material.linewidth * 2);

        } else if (material instanceof THREE.LineDashedMaterial) {
            setLineWidth(material.linewidth);
            setLineCap(material.linecap);
            setLineJoin(material.linejoin);
            setStrokeStyle(material.color.getStyle());
            setLineDash([material.dashSize, material.gapSize]);

            _context.stroke();
            _elemBox.expandByScalar(material.linewidth * 2);
            setLineDash([]);
        }
    }

    function renderFace3(v1, v2, v3, uv1, uv2, uv3, element, material) {
        _this.info.render.vertices += 3;
        _this.info.render.faces++;

        setOpacity(material.opacity);
        setBlending(material.blending);

        _v1x = v1.positionScreen.x;
        _v1y = v1.positionScreen.y;
        _v2x = v2.positionScreen.x;
        _v2y = v2.positionScreen.y;
        _v3x = v3.positionScreen.x;
        _v3y = v3.positionScreen.y;

        drawTriangle(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y);

        if (
            (material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial)
            && material.map === null
        ) {
            _diffuseColor.copy(material.color);
            _emissiveColor.copy(material.emissive);

            if (material.vertexColors === THREE.FaceColors) {
                _diffuseColor.multiply(element.color);
            }
            _color.copy(_ambientLight);
            _centroid.copy(v1.positionWorld).add(v2.positionWorld).add(v3.positionWorld).divideScalar(3);

            calculateLight(_centroid, element.normalModel, _color);
            _color.multiply(_diffuseColor).add(_emissiveColor);

            material.wireframe === true ?
                strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                fillPath(_color);

        } else if (material instanceof THREE.MeshBasicMaterial ||
            material instanceof THREE.MeshLambertMaterial ||
            material instanceof THREE.MeshPhongMaterial) {

            if (material.map !== null) {
                var mapping = material.map.mapping;

                if (mapping === THREE.UVMapping) {
                    _uvs = element.uvs;
                    patternPath(
                        _v1x,
                        _v1y,
                        _v2x,
                        _v2y,
                        _v3x,
                        _v3y,
                        _uvs[uv1].x,
                        _uvs[uv1].y,
                        _uvs[uv2].x,
                        _uvs[uv2].y,
                        _uvs[uv3].x,
                        _uvs[uv3].y,
                        material.map
                    );
                }

            } else if (material.envMap !== null) {
                if (material.envMap.mapping === THREE.SphericalReflectionMapping) {

                    _normal.copy(element.vertexNormalsModel[uv1]).applyMatrix3(_normalViewMatrix);
                    _uv1x = 0.5 * _normal.x + 0.5;
                    _uv1y = 0.5 * _normal.y + 0.5;

                    _normal.copy(element.vertexNormalsModel[uv2]).applyMatrix3(_normalViewMatrix);
                    _uv2x = 0.5 * _normal.x + 0.5;
                    _uv2y = 0.5 * _normal.y + 0.5;

                    _normal.copy(element.vertexNormalsModel[uv3]).applyMatrix3(_normalViewMatrix);
                    _uv3x = 0.5 * _normal.x + 0.5;
                    _uv3y = 0.5 * _normal.y + 0.5;

                    patternPath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap);
                }

            } else {
                _color.copy(material.color);

                if (material.vertexColors === THREE.FaceColors) {
                    _color.multiply(element.color);

                }
                material.wireframe === true ?
                    strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                    fillPath(_color);

            }

        } else if (material instanceof THREE.MeshDepthMaterial) {
            _color.r = _color.g = _color.b = 1 - smoothstep(
                v1.positionScreen.z * v1.positionScreen.w, _camera.near, _camera.far
            );
            material.wireframe === true ?
                strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                fillPath(_color);

        } else if (material instanceof THREE.MeshNormalMaterial) {
            _normal.copy(element.normalModel).applyMatrix3(_normalViewMatrix);
            _color.setRGB(_normal.x, _normal.y, _normal.z).multiplyScalar(0.5).addScalar(0.5);

            material.wireframe === true ?
                strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                fillPath(_color);

        } else {
            _color.setRGB(1, 1, 1);

            material.wireframe === true ?
                strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) :
                fillPath(_color);
        }
    }

    function drawTriangle(x0, y0, x1, y1, x2, y2) {
        _context.beginPath();
        _context.moveTo(x0, y0);
        _context.lineTo(x1, y1);
        _context.lineTo(x2, y2);
        _context.closePath();
    }

    function strokePath(color, linewidth, linecap, linejoin) {
        setLineWidth(linewidth);
        setLineCap(linecap);
        setLineJoin(linejoin);
        setStrokeStyle(color.getStyle());

        _context.stroke();
        _elemBox.expandByScalar(linewidth * 2);
    }

    function fillPath(color) {
        setFillStyle(color.getStyle());
        _context.fill();
    }

    function onTextureUpdate(event) {
        textureToPattern(event.target);
    }

    function textureToPattern(texture) {
        if (texture instanceof THREE.CompressedTexture) return;

        var repeatX = texture.wrapS === THREE.RepeatWrapping;
        var repeatY = texture.wrapT === THREE.RepeatWrapping;
        var image = texture.image;

        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, -1, 0, image.height);
        context.drawImage(image, 0, 0);

        _patterns[texture.id] = _context.createPattern(canvas,
            repeatX === true && repeatY === true
                ? 'repeat'
                : repeatX === true && repeatY === false
                    ? 'repeat-x'
                    : repeatX === false && repeatY === true
                        ? 'repeat-y'
                        : 'no-repeat'
        );
    }

    function patternPath(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture) {
        if (texture instanceof THREE.DataTexture) return;

        if (texture.hasEventListener('update', onTextureUpdate) === false) {
            if (texture.image !== undefined && texture.image.width > 0) {
                textureToPattern(texture);
            }
            texture.addEventListener('update', onTextureUpdate);
        }
        var pattern = _patterns[texture.id];

        if (pattern !== undefined) {
            setFillStyle(pattern);

        } else {
            setFillStyle('rgba(0,0,0,1)');
            _context.fill();
            return;
        }
        // http://extremelysatisfactorytotalitarianism.com/blog/?p=2120

        var a, b, c, d, e, f, det, idet,
            offsetX = texture.offset.x / texture.repeat.x,
            offsetY = texture.offset.y / texture.repeat.y,
            width = texture.image.width * texture.repeat.x,
            height = texture.image.height * texture.repeat.y;

        u0 = (u0 + offsetX) * width;
        v0 = (v0 + offsetY) * height;
        u1 = (u1 + offsetX) * width;
        v1 = (v1 + offsetY) * height;
        u2 = (u2 + offsetX) * width;
        v2 = (v2 + offsetY) * height;

        x1 -= x0;
        y1 -= y0;
        x2 -= x0;
        y2 -= y0;

        u1 -= u0;
        v1 -= v0;
        u2 -= u0;
        v2 -= v0;
        det = u1 * v2 - u2 * v1;

        if (det === 0) return;
        idet = 1 / det;

        a = (v2 * x1 - v1 * x2) * idet;
        b = (v2 * y1 - v1 * y2) * idet;
        c = (u1 * x2 - u2 * x1) * idet;
        d = (u1 * y2 - u2 * y1) * idet;

        e = x0 - a * u0 - c * v0;
        f = y0 - b * u0 - d * v0;

        _context.save();
        _context.transform(a, b, c, d, e, f);
        _context.fill();
        _context.restore();
    }

    function clipImage(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image) {

        // http://extremelysatisfactorytotalitarianism.com/blog/?p=2120
        var a, b, c, d, e, f, det, idet,
            width = image.width - 1,
            height = image.height - 1;

        u0 *= width;
        v0 *= height;
        u1 *= width;
        v1 *= height;
        u2 *= width;
        v2 *= height;

        x1 -= x0;
        y1 -= y0;
        x2 -= x0;
        y2 -= y0;

        u1 -= u0;
        v1 -= v0;
        u2 -= u0;
        v2 -= v0;

        det = u1 * v2 - u2 * v1;
        idet = 1 / det;

        a = (v2 * x1 - v1 * x2) * idet;
        b = (v2 * y1 - v1 * y2) * idet;
        c = (u1 * x2 - u2 * x1) * idet;
        d = (u1 * y2 - u2 * y1) * idet;

        e = x0 - a * u0 - c * v0;
        f = y0 - b * u0 - d * v0;

        _context.save();
        _context.transform(a, b, c, d, e, f);
        _context.clip();
        _context.drawImage(image, 0, 0);
        _context.restore();
    }

    // Hide anti-alias gaps
    function expand(v1, v2, pixels) {
        var x = v2.x - v1.x,
            y = v2.y - v1.y,
            det = x * x + y * y,
            idet;

        if (det === 0) return;
        idet = pixels / Math.sqrt(det);

        x *= idet;
        y *= idet;

        v2.x += x;
        v2.y += y;
        v1.x -= x;
        v1.y -= y;
    }

    // Context cached methods.
    function setOpacity(value) {
        if (_contextGlobalAlpha !== value) {
            _context.globalAlpha = value;
            _contextGlobalAlpha = value;
        }
    }

    function setBlending(value) {
        if (_contextGlobalCompositeOperation !== value) {
            if (value === THREE.NormalBlending) {
                _context.globalCompositeOperation = 'source-over';

            } else if (value === THREE.AdditiveBlending) {
                _context.globalCompositeOperation = 'lighter';

            } else if (value === THREE.SubtractiveBlending) {
                _context.globalCompositeOperation = 'darker';

            }
            _contextGlobalCompositeOperation = value;
        }
    }

    function setLineWidth(value) {
        if (_contextLineWidth !== value) {
            _context.lineWidth = value;
            _contextLineWidth = value;
        }
    }

    function setLineCap(value) {
        // "butt", "round", "square"
        if (_contextLineCap !== value) {
            _context.lineCap = value;
            _contextLineCap = value;

        }
    }

    function setLineJoin(value) {
        // "round", "bevel", "miter"
        if (_contextLineJoin !== value) {
            _context.lineJoin = value;
            _contextLineJoin = value;
        }
    }

    function setStrokeStyle(value) {
        if (_contextStrokeStyle !== value) {
            _context.strokeStyle = value;
            _contextStrokeStyle = value;
        }
    }

    function setFillStyle(value) {
        if (_contextFillStyle !== value) {
            _context.fillStyle = value;
            _contextFillStyle = value;
        }
    }

    function setLineDash(value) {
        if (_contextLineDash.length !== value.length) {
            _context.setLineDash(value);
            _contextLineDash = value;
        }
    }
};

/**
 * src
 */
var ALG,
ALGDISPLAY,
Alg,
AlgAnimation,
BASE,
COLORED,
COLORS,
Camera,
CameraMovement,
Colors,
CompositeMove,
ConcurrentChangers,
Config,
Css,
CubeAnimation,
Cubexp,
Dom,
EventHandlers,
FLAGS,
HOVER,
Layer,
Move,
MoveExecution,
OneChange,
POV,
PROPERTIES,
Pieces3D,
Pov,
SETUPMOVES,
SOLVED,
SPEED,
TWEAKS,
TimedChanger,
Tweaks,
log_error,
side_name,
standardize_name,
v3,
v3_add,
v3_sub,
v3_x,
extend = function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var r in e) hasProp.call(e, r) && (t[r] = e[r]);
    return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
},
hasProp = {}.hasOwnProperty,
indexOf = [].indexOf || function(t) {
    for (var e = 0, n = this.length; e < n; e++)
        if (e in this && this[e] === t) return e;
    return -1
};
TimedChanger = function() {
    function t(t) {
        this.duration = t, this.start_time = (new Date).getTime(), this.last_time = this.start_time
    }
    return t.prototype.update = function(t) {
        if (!this._finished) return t > this.start_time + this.duration ? this.finish() : this._make_change(t)
    }, t.prototype.finish = function() {
        if (!this.finished()) return this._make_change(this.start_time + this.duration), this._finished = !0, this._realign()
    }, t.prototype.finished = function() {
        return this._finished
    }, t.prototype._make_change = function(t) {
        return this.do_change(this._ease(t) - this._ease(this.last_time)), this.last_time = t
    }, t.prototype._ease = function(t) {
        var e;
        return e = (t - this.start_time) / this.duration, e * e * (2 - e * e)
    }, t
}(),
OneChange = function() {
    function t(t) {
        this.action = t
    }
    return t.prototype.update = function(t) {
        return this.action()
    }, t.prototype.finish = function() {}, t.prototype.finished = function() {
        return !0
    }, t
}(),
MoveExecution = function(t) {
    function e(t, n, r, i, o) {
        this.pieces = t, this.axis = n, this.angle_to_turn = r, e.__super__.constructor.call(this, i), o || this.finish()
    }
    return extend(e, t), e.prototype.do_change = function(t) {
        var e, n, r, i, o;
        for (i = this.pieces, o = [], e = 0, n = i.length; e < n; e++) r = i[e], o.push(this._rotateAroundWorldAxis(r, t * this.angle_to_turn));
        return o
    }, e.prototype._rotateAroundWorldAxis = function(t, e) {
        var n;
        return n = new THREE.Matrix4, n.makeRotationAxis(this.axis, e), n.multiply(t.matrix), t.matrix = n, t.rotation.setFromRotationMatrix(t.matrix)
    }, e.prototype._realign = function() {
        var t, e, n, r, i, o, s, a;
        for (n = Math.PI / 2, o = this.pieces, a = [], t = 0, e = o.length; t < e; t++) r = o[t], i = r.rotation, a.push((s = [Math.round(i.x / n) * n, Math.round(i.y / n) * n, Math.round(i.z / n) * n], i.x = s[0], i.y = s[1], i.z = s[2], s));
        return a
    }, e
}(TimedChanger),
ConcurrentChangers = function() {
    function t(t) {
        this.sub_changers = t
    }
    return t.prototype.update = function(t) {
        var e, n, r, i, o;
        for (i = this.sub_changers, o = [], n = 0, r = i.length; n < r; n++) e = i[n], o.push(e.update(t));
        return o
    }, t.prototype.finish = function() {
        var t, e, n, r, i;
        for (r = this.sub_changers, i = [], e = 0, n = r.length; e < n; e++) t = r[e], i.push(t.finish());
        return i
    }, t.prototype.finished = function() {
        var t, e, n, r;
        for (r = this.sub_changers, e = 0, n = r.length; e < n; e++)
            if (t = r[e], !t.finished()) return !1;
        return !0
    }, t
}(),
CameraMovement = function(t) {
    function e(t, n, r, i, o) {
        this.camera = t, this.axis = n, this.angle_to_turn = r, e.__super__.constructor.call(this, i), o || this.finish()
    }
    return extend(e, t), e.prototype.do_change = function(t) {
        return this.camera.rotate(this.axis, t * this.angle_to_turn)
    }, e.prototype._realign = function() {
        return this.camera.to_position()
    }, e
}(TimedChanger),
AlgAnimation = function() {
    function t(t) {
        this.alg = t, this._next_alg_move()
    }
    return t.prototype.update = function(t) {
        if (!this._finished) return this.move_changer.finished() && this._next_alg_move(), this.move_changer.update(t)
    }, t.prototype.finish = function() {}, t.prototype.finished = function() {
        return this._finished
    }, t.prototype._next_alg_move = function() {
        return this.alg.at_end() || !this.alg.playing ? this._finished = !0 : this.move_changer = this.alg.next_move().show_do()
    }, t
}(),
v3 = function(t, e, n) {
    return new THREE.Vector3(t, e, n)
},
v3_add = function(t, e) {
    return t.clone().add(e)
},
v3_sub = function(t, e) {
    return t.clone().sub(e)
},
v3_x = function(t, e) {
    return t.clone().multiplyScalar(e)
},
standardize_name = function(t) {
    var e, n, r, i, o, s;
    for (s = [t[0], t[1], t[2]], o = "", i = ["U", "D", "F", "B", "R", "L"], e = 0, n = i.length; e < n; e++) r = i[e], indexOf.call(s, r) >= 0 && (o += r);
    return o
},
side_name = function(t) {
    return t ? t.name || t : ""
},
log_error = function(t) {
    return console.log("RoofPig error: " + t)
},
Css = function() {
    function t() {}
    var e, n, r;
    return n = "#ededed", e = "#bbb", r = "#ffffff", t.CODE = "<style>\n</style>", t
}(),

$(document).ready(function() {
    console.log("Roofpig version 1.4. â™‡ (2017-03-27 14:54). Expecting jQuery 3.1.1 and Three.js 71.");
    console.log("jQuery version", $.fn.jquery);

    $("head").append(Css.CODE);
    CubeAnimation.initialize();

    var $elements = $(".roofpig");
    var n = $elements.length;
    console.log("Found " + n + " .roofpig divs");

    var batch_size = 5;
    var num_epochs = Math.ceil(n / batch_size);
    var t = 0;

    for(let i=0; i<num_epochs; i++) {
        setTimeout(() => {
            for(let j=0; j<batch_size; j++) {
                new CubeAnimation($($elements[t]));

                if(++t == n) {
                    return;
                }
            }
        }, 300*i);
    }
}),
Layer = function() {
    function t(t, e, n, r, i, o) {
        this.name = t,
        this.normal = e,
        this.cycle1 = n,
        this.cycle2 = r,
        this.sticker_cycle = o,
        this.positions = this.cycle1.concat(this.cycle2, i)
    }
    var e, n;
    return t.by_name = function(t) {
        return e[t]
    },
    t.side_by_name = function(t) {
        return n[t]
    },
    t.R = new t("R", v3(-1, 0, 0), ["UFR", "DFR", "DBR", "UBR"], ["UR", "FR", "DR", "BR"], ["R"], {
        B: "D",
        D: "F",
        F: "U",
        U: "B",
        L: "L",
        R: "R"
    }),
    t.L = new t("L", v3(1, 0, 0), ["UBL", "DBL", "DFL", "UFL"], ["BL", "DL", "FL", "UL"], ["L"], {
        B: "U",
        U: "F",
        F: "D",
        D: "B",
        L: "L",
        R: "R"
    }),
    t.F = new t("F", v3(0, 1, 0), ["DFL", "DFR", "UFR", "UFL"], ["FL", "DF", "FR", "UF"], ["F"], {
        U: "R",
        R: "D",
        D: "L",
        L: "U",
        F: "F",
        B: "B"
    }),
    t.B = new t("B", v3(0, -1, 0), ["UBL", "UBR", "DBR", "DBL"], ["UB", "BR", "DB", "BL"], ["B"], {
        U: "L",
        L: "D",
        D: "R",
        R: "U",
        F: "F",
        B: "B"
    }),
    t.U = new t("U", v3(0, 0, 1), ["UBR", "UBL", "UFL", "UFR"], ["UR", "UB", "UL", "UF"], ["U"], {
        F: "R",
        R: "B",
        B: "L",
        L: "F",
        U: "U",
        D: "D"
    }),
    t.D = new t("D", v3(0, 0, -1), ["DFR", "DFL", "DBL", "DBR"], ["DF", "DL", "DB", "DR"], ["D"], {
        F: "L",
        L: "B",
        B: "R",
        R: "F",
        U: "U",
        D: "D"
    }),
    t.M = new t("M", t.L.normal, ["UF", "UB", "DB", "DF"], ["U", "B", "D", "F"], [], t.L.sticker_cycle),
    t.E = new t("E", t.D.normal, ["BL", "BR", "FR", "FL"], ["L", "B", "R", "F"], [], t.D.sticker_cycle),
    t.S = new t("S", t.F.normal, ["DL", "DR", "UR", "UL"], ["L", "D", "R", "U"], [], t.F.sticker_cycle),
    t.prototype.shift = function(t, e) {
        var n, r, i, o;
        if (!this.sticker_cycle[t]) return null;
        if (e < 1) throw new Error("Invalid turn number: '" + e + "'");
        for (o = t, r = n = 1, i = e; 1 <= i ? n <= i : n >= i; r = 1 <= i ? ++n : --n) o = this.sticker_cycle[o];
        return o
    },
    t.prototype.on_same_axis_as = function(t) {
        var e, n, r, i, o;
        for (o = 0, i = ["x", "y", "z"], n = 0, r = i.length; n < r; n++) e = i[n], 0 === this.normal[e] && 0 === t.normal[e] && o++;
        return 2 === o
    },
    e = {
        R: t.R,
        L: t.L,
        F: t.F,
        B: t.B,
        D: t.D,
        U: t.U,
        M: t.M,
        E: t.E,
        S: t.S
    },
    n = {
        R: t.R,
        L: t.L,
        F: t.F,
        B: t.B,
        D: t.D,
        U: t.U
    }, t
}(),
Cubexp = function() {
    function t(t) {
        var n, r, i, o, s, a, h, u, c, p, d, l, _, f, m, g, v, y, b, w, x, k, L, R;
        for (null == t && (t = ""), this.matches = {}, o = 0, h = e.length; o < h; o++) v = e[o], this.matches[v] = {};
        for (b = t.split(" "), s = 0, u = b.length; s < u; s++) switch (i = b[s], r = this._parse(i), r.type) {
            case "XYZ":
                this._add_match(r.piece, r.type_filter, r.sides);
                break;
            case "X-":
                for (a = 0, c = e.length; a < c; a++) {
                    for (v = e[a], n = !1, w = r.piece.split(""), m = 0, p = w.length; m < p; m++) L = w[m], n || (n = v.indexOf(L) > -1);
                    n || this._add_match(v, r.type_filter)
                }
                break;
            case "X*":
                for (g = 0, d = e.length; g < d; g++)
                    for (v = e[g], x = r.piece.split(""), y = 0, l = x.length; y < l; y++) L = x[y], v.indexOf(L) > -1 && this._add_match(v, r.type_filter);
                break;
            case "*":
                for (k = 0, _ = e.length; k < _; k++) v = e[k], this._add_match(v, r.type_filter);
                break;
            case "x":
                for (R = 0, f = e.length; R < f; R++) v = e[R], v.indexOf(r.piece[0]) > -1 && this._add_match(v, r.type_filter, r.piece);
                break;
            default:
                log_error("Ignored unrecognized Cubexp '" + i + "'.")
        }
    }
    var e;
    return e = ["B", "BL", "BR", "D", "DB", "DBL", "DBR", "DF", "DFL", "DFR", "DL", "DR", "F", "FL", "FR", "L", "R", "U", "UB", "UBL", "UBR", "UF", "UFL", "UFR", "UL", "UR"],
    t.prototype.matches_sticker = function(t, e) {
        return null != this.matches[standardize_name(t)][side_name(e)]
    }, t.prototype.selected_pieces = function() {
        var t, e, n, r, i, o, s, a, h, u;
        s = [], i = this.matches;
        for (r in i) {
            for (h = i[r], t = "", a = !1, o = r.split(""), e = 0, n = o.length; e < n; e++) u = o[e], a || (a = h[u]), t += h[u] ? u : u.toLowerCase();
            a && s.push(t)
        }
        return s
    }, t.prototype._add_match = function(t, e, n) {
        var r, i, o, s, a, h;
        if (null == n && (n = t), o = "mec" [t.length - 1], !e || e.indexOf(o) > -1) {
            for (s = n.split(""), a = [], r = 0, i = s.length; r < i; r++) h = s[r], a.push(this.matches[t][h] = !0);
            return a
        }
    }, t.prototype._parse = function(t) {
        var e, n, r, i;
        switch (i = {}, r = t.split("/"), e = r[0], i.type_filter = r[1], i.piece = standardize_name(e.toUpperCase()), n = e[e.length - 1]) {
            case "*":
                i.type = "*" === e ? "*" : "X*";
                break;
            case "-":
                i.type = "X-";
                break;
            default:
                e === i.piece.toLowerCase() ? i.type = "x" : (i.type = "XYZ", i.sides = standardize_name(e))
        }
        return i
    }, t
}(),
Tweaks = function() {
    function t(t) {
        var e, n, r, i, o, s, a, h, u, c, p, d, l, _, f, m, g, v, y, b;
        if (this.tweaks = {}, t)
            for (l = t.split(" "), r = 0, s = l.length; r < s; r++)
                if (e = l[r], _ = e.split(":"), y = _[0], b = _[1], b)
                    if (1 === y.length)
                        for (f = new Cubexp(b).selected_pieces(), i = 0, a = f.length; i < a; i++)
                            for (d = f[i], m = d.split(""), o = 0, h = m.length; o < h; o++) v = m[o], this._add(d.toUpperCase(), v, y);
                    else
                        for (p = standardize_name(b.toUpperCase()), g = b.split(""), n = c = 0, u = g.length; c < u; n = ++c) v = g[n], this._add(p, v, y[n])
    }
    return t.prototype.for_sticker = function(t, e) {
        var n;
        return n = this.tweaks[standardize_name(t)] || {}, n[side_name(e)] || []
    }, t.prototype._add = function(t, e, n) {
        var r, i;
        if (Layer.side_by_name(e)) return null == (r = this.tweaks)[t] && (r[t] = {}), null == (i = this.tweaks[t])[e] && (i[e] = []), this.tweaks[t][e].push(n)
    }, t
}(),
Pov = function() {
    function t(e) {
        this.map = t.start_map(), e && this.track(e)
    }
    return t.start_map = function() {
        return {
            B: "B",
            D: "D",
            F: "F",
            L: "L",
            R: "R",
            U: "U"
        }
    }, t.prototype.track = function(t) {
        var e, n, r, i;
        for (Array.isArray(t) || (t = [t]), i = [], e = 0, n = t.length; e < n; e++) r = t[e], i.push(r.track_pov(this.map));
        return i
    }, t.prototype.hand_to_cube_map = function() {
        var t, e, n, r;
        n = {}, e = this.map;
        for (t in e) hasProp.call(e, t) && (r = e[t], n[r] = t);
        return n
    }, t.prototype.cube_to_hand = function(t) {
        return this._case_map(this.map, t)
    }, t.prototype.hand_to_cube = function(t) {
        return this._case_map(this.hand_to_cube_map(), t)
    }, t.prototype._case_map = function(t, e) {
        var n;
        return e ? function() {
            var r, i, o, s, a;
            for (o = e.split(""), a = [], r = 0, i = o.length; r < i; r++) n = o[r], a.push(t[n] || (null != (s = t[n.toUpperCase()]) ? s.toLowerCase() : void 0) || n);
            return a
        }().join("") : e
    }, t
}(),
Pieces3D = function() {
    function t(t, e, n, r) {
        this.use_canvas = r,
        this.at = {},
        this.cube_surfaces = this.use_canvas ? [!0] : [!0, !1],
        this.sticker_size = this.use_canvas ? .84 : .9,
        this.hover_size = this.use_canvas ? .91 : .97,
        this.make_stickers(t, e, n)
    }
    var e;
    return e = .003, t.prototype.on = function(t) {
        var e, n, r, i, o;
        for (i = t.positions, o = [], e = 0, n = i.length; e < n; e++) r = i[e], o.push(this.at[r]);
        return o
    }, t.prototype.move = function(t, e) {
        var n;
        return n = (e + 4) % 4, this._track_stickers(t, n), this._track_pieces(n, t.cycle1, t.cycle2)
    }, t.prototype.state = function() {
        var t, e, n, r, i;
        for (i = "", r = ["B", "BL", "BR", "D", "DB", "DBL", "DBR", "DF", "DFL", "DFR", "DL", "DR", "F", "FL", "FR", "L", "R", "U", "UB", "UBL", "UBR", "UF", "UFL", "UFR", "UL", "UR"], t = 0, e = r.length; t < e; t++) n = r[t], i += this[n].sticker_locations.join("") + " ";
        return i
    }, t.prototype._track_stickers = function(t, e) {
        var n, r, i, o, s, a;
        for (s = this.on(t), a = [], r = 0, i = s.length; r < i; r++) o = s[r], a.push(o.sticker_locations = function() {
            var r, i, s, a;
            for (s = o.sticker_locations, a = [], r = 0, i = s.length; r < i; r++) n = s[r], a.push(t.shift(n, e));
            return a
        }());
        return a
    }, t.prototype._track_pieces = function(t, e, n) {
        var r, i, o, s;
        for (s = [], i = r = 1, o = t; 1 <= o ? r <= o : r >= o; i = 1 <= o ? ++r : --r) this._permute(e), s.push(this._permute(n));
        return s
    }, t.prototype._permute = function(t) {
        var e;
        return e = [this.at[t[1]], this.at[t[2]], this.at[t[3]], this.at[t[0]]], this.at[t[0]] = e[0], this.at[t[1]] = e[1], this.at[t[2]] = e[2], this.at[t[3]] = e[3], e
    }, t.prototype.make_stickers = function(t, e, n) {
        var r, i, o, s, a, h, u, c, p, d, l;
        for (u = {
                normal: v3(0, 0, 0),
                name: "-"
            }, s = [Layer.R, u, Layer.L], a = [], r = 0, i = s.length; r < i; r++) p = s[r], a.push(function() {
            var r, i, s, a;
            for (s = [Layer.F, u, Layer.B], a = [], r = 0, i = s.length; r < i; r++) d = s[r], a.push(function() {
                var r, i, s, a, _, f, m;
                for (_ = [Layer.U, u, Layer.D], m = [], r = 0, i = _.length; r < i; r++) {
                    for (l = _[r], o = this._new_piece(p, d, l), f = [p, d, l], a = 0, s = f.length; a < s; a++) h = f[a], h !== u && (c = n.to_draw(o.name, h), this._add_sticker(h, o, c), c.hovers && e > 1 && this._add_hover_sticker(h, o, c, e), this._add_cubeside(h, o, n.of("cube")));
                    this[o.name] = this.at[o.name] = o, m.push(t.add(o))
                }
                return m
            }.call(this));
            return a
        }.call(this));
        return a
    }, t.prototype._new_piece = function(t, e, n) {
        var r;
        return r = new THREE.Object3D, r.name = standardize_name(t.name + e.name + n.name), r.sticker_locations = r.name.split(""), r.middle = v3(2 * t.normal.x, 2 * e.normal.y, 2 * n.normal.z), r
    }, t.prototype._add_sticker = function(t, n, r) {
        var i, o, s;
        if (s = this._offsets(t.normal, this.sticker_size, !1), i = s[0], o = s[1], n.add(this._diamond(this._square_center(t, n.middle, 1 + e), i, o, r.color)), r.x_color) return this._add_X(t, n, r.x_color, 1 + 2 * e, !0)
    }, t.prototype._add_hover_sticker = function(t, n, r, i) {
        var o, s, a;
        if (a = this._offsets(t.normal, this.hover_size, !0), o = a[0], s = a[1], n.add(this._diamond(this._square_center(t, n.middle, i), o, s, r.color)), r.x_color) return this._add_X(t, n, r.x_color, i - e, !1)
    }, t.prototype._add_cubeside = function(t, e, n) {
        var r, i, o, s, a, h, u, c;
        for (a = this.cube_surfaces, u = [], o = 0, s = a.length; o < s; o++) c = a[o], h = this._offsets(t.normal, 1, c), r = h[0], i = h[1], u.push(e.add(this._diamond(this._square_center(t, e.middle, 1), r, i, n)));
        return u
    }, t.prototype._add_X = function(t, e, n, r, i) {
        var o, s, a, h;
        return h = this._offsets(t.normal, .54, i), s = h[0], a = h[1], o = this._square_center(t, e.middle, r), e.add(this._rect(o, s, v3_x(a, .14), n)), e.add(this._rect(o, v3_x(s, .14), a, n))
    }, t.prototype._square_center = function(t, e, n) {
        return v3_add(e, v3_x(t.normal, n))
    }, t.prototype._rect = function(t, e, n, r) {
        return this._diamond(t, v3_add(e, n), v3_sub(e, n), r)
    }, t.prototype._diamond = function(t, e, n, r) {
        var i;
        return i = new THREE.Geometry, i.vertices.push(v3_add(t, e), v3_add(t, n), v3_sub(t, e), v3_sub(t, n)), i.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3)), i.computeFaceNormals(), i.computeBoundingSphere(), new THREE.Mesh(i, new THREE.MeshBasicMaterial({
            color: r,
            overdraw: .8
        }))
    }, t.prototype._offsets = function(t, e, n) {
        var r, i, o, s, a;
        return r = v3(t.y, t.z, t.x), i = v3(t.z, t.x, t.y), a = (t.y + t.z + t.x) * (n ? -1 : 1), o = v3_add(r, i).multiplyScalar(e * a), s = v3_sub(r, i).multiplyScalar(e), [o, s]
    }, t
}(),
Move = function() {
    function t(e, n, r) {
        var i;
        this.world3d = n, this.speed = null != r ? r : 400, i = t._parse_code(e), this.layer = i[0], this.turns = i[1], this.is_rotation = i[2], this.turn_time = this.speed / 2 * (1 + Math.abs(this.turns))
    }
    return t._parse_code = function(e) {
        var n, r, i, o;
        if (o = t.parse_turns(e.substring(1)), n = ">" === (i = e.substring(1)) || ">>" === i || "<" === i || "<<" === i, r = Layer.by_name(e[0]), !r || !o) throw new Error("Invalid Move code '" + e + "'");
        return [r, o, n]
    }, t.parse_turns = function(t) {
        switch (t) {
            case "1":
            case "":
            case ">":
                return 1;
            case "2":
            case "Â²":
            case ">>":
                return 2;
            case "3":
            case "'":
            case "<":
                return -1;
            case "Z":
            case "2'":
            case "<<":
                return -2
        }
    }, t.prototype.do = function() {
        return this._do(this.turns, !1)
    }, t.prototype.undo = function() {
        return this._do(-this.turns, !1)
    }, t.prototype.mix = function() {
        if (!this.is_rotation) return this.undo()
    }, t.prototype.track_pov = function(t) {
        var e, n, r, i, o, s, a, h;
        for (s = [this.layer.cycle1, this.layer.cycle2], a = [], r = 0, i = s.length; r < i; r++) e = s[r], 1 === e[0].length && a.push(function() {
            var r;
            r = [];
            for (h in t) o = t[h], r.push(function() {
                var r, i;
                for (i = [], n = r = 0; r <= 3; n = ++r) o === e[n] ? i.push(t[h] = e[(n - this.turns + 4) % 4]) : i.push(void 0);
                return i
            }.call(this));
            return r
        }.call(this));
        return a
    }, t.prototype.as_brdflu = function() {
        var t, e, n;
        if (this.is_rotation) return "";
        switch (t = {
            1: "",
            2: "2",
            "-1": "'",
            "-2": "2"
        }, e = t[this.turns], n = t[-this.turns], this.layer) {
            case Layer.M:
                return "L" + n + " R" + e;
            case Layer.E:
                return "D" + n + " U" + e;
            case Layer.S:
                return "B" + e + " F" + n;
            default:
                return this.to_s().replace("Z", "2")
        }
    }, t.prototype.show_do = function() {
        return this._do(this.turns, !0)
    }, t.prototype.show_undo = function() {
        return this._do(-this.turns, !0)
    }, t.prototype._do = function(t, e) {
        return this.is_rotation ? new CameraMovement(this.world3d.camera, this.layer.normal, t * Math.PI / 2, this.turn_time, e) : (this.world3d.pieces.move(this.layer, t), new MoveExecution(this.world3d.pieces.on(this.layer), this.layer.normal, t * -Math.PI / 2, this.turn_time, e))
    }, t.prototype.count = function(t) {
        return t || !this.is_rotation ? 1 : 0
    }, t.prototype.to_s = function() {
        var t;
        return t = {
            true: {
                1: ">",
                2: ">>",
                "-1": "<",
                "-2": "<<"
            },
            false: {
                1: "",
                2: "2",
                "-1": "'",
                "-2": "Z"
            }
        }, "" + this.layer.name + t[this.is_rotation][this.turns]
    }, t.displayify = function(t, e) {
        var n;
        return n = t.replace("Z", e.Zcode), e.fancy2s && (n = n.replace("2", "Â²")), n
    }, t.prototype.display_text = function(e) {
        return e.rotations || !this.is_rotation ? t.displayify(this.to_s(), e) : ""
    }, t
}(),
EventHandlers = function() {
    function t() {}
    var e, n, r, i, o, s, a, h, u, c, p, d, l, _, f, m, g, v, y, b, w, x, k;
    return t.initialized = !1,
    t.set_focus = function(t) {
        if (this._focus !== t && (this._focus && this.dom.has_focus(!1), this._focus = t, !this.focus().is_null)) return this.camera = this._focus.world3d.camera, this.dom = this._focus.dom, this.dom.has_focus(!0)
    },
    e = {
        add_changer: function() {
            return {}
        },
        is_null: !0
    },
    t.focus = function() {
        return this._focus || e
    },
    t.initialize = function() {
        if (!this.initialized) return $("body").keydown(function(e) {}), $("body").keyup(function(e) {
            return t.key_up(e)
        }), $(document).on("mousedown", ".roofpig", function(e) {
            return t.mouse_down(e, $(this).data("cube-id"))
        }), $("body").mousemove(function(e) {
            return t.mouse_move(e)
        }), $("body").mouseup(function(e) {
            return t.mouse_end(e)
        }), $("body").mouseleave(function(e) {
            return t.mouse_end(e)
        }), $(document).on("click", ".roofpig", function(e) {
            var n;
            return n = CubeAnimation.by_id[$(this).data("cube-id")], t.set_focus(n)
        }), $(document).on("click", ".roofpig button", function(t) {
            var e, n, r;
            return r = $(this).attr("id").split("-"), e = r[0], n = r[1], CubeAnimation.by_id[n].button_click(e, t.shiftKey)
        }), $(document).on("click", ".roofpig-help-button", function(t) {
            var e, n, r;
            return r = $(this).attr("id").split("-"), e = r[0], n = r[1], CubeAnimation.by_id[n].dom.show_help()
        }), this.initialized = !0
    },
    t.mouse_down = function(t, e) {
        if (this.dom.remove_help(), e === this.focus().id) return this.bend_start_x = t.pageX, this.bend_start_y = t.pageY, this.bending = !0
    },
    t.mouse_end = function(t) {
        return this.focus().add_changer("camera", new OneChange(function(t) {
            return function() {
                return t.camera.bend(0, 0)
            }
        }(this))), this.bending = !1
    },
    t.mouse_move = function(t) {
        var e, n;
        if (this.bending) return e = -.02 * (t.pageX - this.bend_start_x) / this.dom.scale, n = -.02 * (t.pageY - this.bend_start_y) / this.dom.scale, t.shiftKey && (n = 0), this.focus().add_changer("camera", new OneChange(function(t) {
            return function() {
                return t.camera.bend(e, n)
            }
        }(this)))
    },
    t.key_down = function(t) {
        var e, s, a, h, d, _, f, v, b;
        if (!this.focus().is_null) return a = this.dom.remove_help(), !(!t.ctrlKey && !t.metaKey) || (_ = [t.keyCode, t.shiftKey, t.altKey], h = _[0], f = _[1], e = _[2], indexOf.call(k, h) >= 0 ? (v = f ? 3 : e ? 2 : 1, this._move("" + x[h] + v)) : e ? b = !0 : h === y ? (d = f ? this.focus().previous_cube() : this.focus().next_cube(), this.set_focus(d)) : h === l || h === g && f ? this.focus().add_changer("pieces", new OneChange(function(t) {
            return function() {
                return t.focus().alg.to_end(t.focus().world3d)
            }
        }(this))) : indexOf.call(n, h) >= 0 ? this._fake_click_down(this._button_for(h, f)) : indexOf.call(w, h) >= 0 ? (s = function() {
            switch (h) {
                case i:
                case p:
                    return "up";
                case r:
                case o:
                    return "dr";
                case u:
                case c:
                    return "dl"
            }
        }(), v = function() {
            switch (h) {
                case i:
                case r:
                case u:
                    return 1;
                case p:
                case o:
                case c:
                    return -1
            }
        }(), this._rotate(s, v)) : h === m ? a || this.focus().dom.show_help() : b = !0, b ? void 0 : (t.preventDefault(), t.stopPropagation()))
    },
    t._button_for = function(t, e) {
        switch (t) {
            case _:
                return this.dom.reset;
            case f:
                return e ? this.dom.reset : this.dom.prev;
            case g:
                return this.dom.next;
            case v:
                return this.dom.play_or_pause
        }
    },
    t.key_up = function(t) {
        var e, r;
        return r = t.keyCode,
            e = indexOf.call(n, r) >= 0,
            e && this.down_button && (this._fake_click_up(this.down_button), this.down_button = null),
            e
    },
    t._fake_click_down = function(t) {
        if (!t.attr("disabled"))
            return this.down_button = t,
                t.addClass("roofpig-button-fake-active")
    },
    t._fake_click_up = function(t) {
        if (!t.attr("disabled"))
            return t.removeClass("roofpig-button-fake-active"),
                t.click()
    },
    t._rotate = function(t, e) {
        var n;
        return n = -Math.PI / 2 * e,
            this.focus().add_changer("camera", new CameraMovement(this.camera, this.camera.user_dir[t], n, 500, (!0)))
    },
    t._move = function(t) {
        return this.focus().add_changer("pieces", new Move(t, this.focus().world3d, 200).show_do())
    },
    y = 9,
    v = 32,
    l = 35,
    _ = 36,
    f = 37,
    b = 38,
    g = 39,
    d = 40,
    r = 65,
    i = 67,
    o = 68,
    s = 74,
    a = 75,
    h = 76,
    u = 83,
    c = 88,
    p = 90,
    m = 191,
    n = [v, _, f, g],
    w = [i, p, r, o, u, c],
    k = [s, a, h],
    x = {},
    x[s] = "U",
    x[a] = "F",
    x[h] = "R",
    t
}(),
Dom = function() {
    function t(t, e, n, r, i) {
        this.cube_id = t,
        this.div = e,
        this.div.css({
            position: "relative",
            "font-family": '"Lucida Sans Unicode", "Lucida Grande", sans-serif'
        }),
        this.has_focus(!1),
        size = this.div.attr("data-size") || this.div.width(),
        this.div.attr("data-cube-id", this.cube_id),
        n.setSize(size, size),
        this.div.append(n.domElement),
        this.scale = this.div.width() / 400,
        this.hscale = Math.max(this.scale, .375),
        r && this.add_alg_area(i)
    }
    var e;
    return t.prototype.has_focus = function(t) {
        var e, n;
        return e = t ? "gray" : "#eee",
            n = t ? "pointer" : "default",
            this.div.css({
                border: "2px solid " + e,
                cursor: n
            })
    },
    t.prototype.alg_changed = function(t, e, n, r, i) {
        var o, s, a, h, u, c, p;
        if (t)
            for (c = this.buttons, s = 0, h = c.length; s < h; s++)
                o = c[s],
                o === this.play ? o.hide() : this._show(o, o === this.pause);
        else
            for (p = this.buttons, a = 0, u = p.length; a < u; a++)
                switch (o = p[a]) {
                    case this.reset:
                    case this.prev:
                        this._show(o, !e);
                        break;
                    case this.next:
                    case this.play:
                        this._show(o, !n);
                        break;
                    case this.pause:
                        o.hide()
                }
        if (this.play_or_pause = t ? this.pause : this.play, this.count.html(r), this.alg_text)
            return this.alg_past.text(i.past),
                this.alg_future.text(" " + i.future)
    },
    t.prototype.show_help = function() {
        return this.help = $("<div/>").addClass("roofpig-help"),
        this.help.append(
            $("<div>Keyboard shortcuts</div>").css({
                "text-align": "center",
                "font-weight": "bold"
            }),
            "<div><span>â†’</span> - Next move</div>",
            "<div/><span>â†</span> - Previous move</div>",
            "<div/><span>â‡§</span>+<span>â†’</span> - To end</div>",
            "<div/><span>â‡§</span>+<span>â†</span> - To start</div>",
            "<div/><span>&nbsp;space&nbsp;</span> - Play/Pause</div>",
            "<div/><span>Tab</span> - Next Cube</div>"
        ),
        this.div.append(this.help),
        this.help.css({
            right: (this.div.width() - this.help.outerWidth()) / 2 + "px"
        })
    },
    t.prototype.remove_help = function() {
        var t;
        return this.help && (this.help.remove(), this.help = null, t = !0), t
    },
    t.prototype.add_alg_area = function(t) {
        this.div.append(
            $("<div/>", {
                text: "?",
                id: "help-" + this.cube_id
            }).addClass("roofpig-help-button")
        );

        this.alg_area = $("<div/>").addClass("roofpig-algarea");
        this.div.append(this.alg_area);

        // Add formula
        t && (
            this.alg_text = $("<div/>").addClass("roofpig-algtext"),
            this.alg_area.append(this.alg_text),
            this.alg_past = $("<span/>").addClass("roofpig-past-algtext"),
            this.alg_future = $("<span/>"),
            this.alg_text.append(this.alg_past, this.alg_future)
        );

        // Add buttons
        this.btn_area = $("<div/>").addClass("roofpig-buttons");
        this.alg_area.append(this.btn_area);

        this.reset = this._make_button("↺", "reset"),
        this.prev = this._make_button("↩", "prev"),
        this.next = this._make_button("↪", "next"),
        this.pause = this._make_button("⏸", "pause"),
        this.play = this._make_button("⏯", "play"),
        this.count = this._make_count_area();

        return this.buttons = [
            this.reset,
            this.prev,
            this.next,
            this.pause,
            this.play
        ];
    },
    e = {
        M: 108,
        "+": 100,
        ">": 100,
        "<": 100,
        w: 98,
        D: 94,
        U: 87,
        2: 80,
        R: 80,
        x: 78,
        Z: 77,
        B: 73,
        z: 73,
        F: 68,
        E: 68,
        S: 68,
        L: 67,
        y: 65,
        "Â²": 53,
        " ": 40,
        "'": 29
    },
    t.prototype.init_alg_text = function(t) {
        var n, r, i, o, s, a;
        if (this.alg_text) {
            for (
                a = 0,
                s = t.split(""),
                i = 0,
                o = s.length; i < o; i++)
                    n = s[i],
                    a += e[n] || 80,
                    e[n] || log_error("Unknown char width: '" + n + "'");

            return r = 24 * this.scale * Math.min(1, 1970 / a),
                this.alg_text.height(1.2 * r).css({
                    "font-size": r
                })
        }
    },
    t.prototype._show = function(t, e) {
        return t.show(),
            e
                ? (t.prop("disabled", !1), t.addClass("roofpig-button-enabled"))
                : (t.prop("disabled", !0), t.removeClass("roofpig-button-enabled"))
    },
    t.prototype._make_button = function(t, e) {
        var n;
        return n = $("<button/>", {
            text: t,
            id: e + "-" + this.cube_id,
            type: "button",
        }),
        this.btn_area.append(n),
        n.addClass("roofpig-button");
    },
    t.prototype._make_count_area = function() {
        var t;
        return t = $("<div/>", {
            id: "count-" + this.cube_id
        }).addClass("roofpig-count"),
        this.btn_area.append(t),
        t.css("font-size", 24 * this.hscale)
    },
    t
}(),
CompositeMove = function() {
    function t(t, e, n, r) {
        var i, o, s, a, h, u, c;
        for (this.official_text = null != r ? r : null, this.moves = function() {
                var r, o, s, a;
                for (s = t.split("+"), a = [], r = 0, o = s.length; r < o; r++) i = s[r], a.push(new Move(i, e, n));
                return a
            }(), u = function() {
                var t, e, n, r;
                for (n = this.moves, r = [], t = 0, e = n.length; t < e; t++) a = n[t], a.is_rotation || r.push(a);
                return r
            }.call(this), c = u.slice(1), o = 0, s = c.length; o < s; o++)
            if (h = c[o], !u[0].layer.on_same_axis_as(h.layer)) throw new Error("Impossible Move combination '" + t + "'")
    }
    return t.prototype.do = function() {
        return new ConcurrentChangers(this.moves.map(function(t) {
            return t.do()
        }))
    }, t.prototype.undo = function() {
        return new ConcurrentChangers(this.moves.map(function(t) {
            return t.undo()
        }))
    }, t.prototype.mix = function() {
        return new ConcurrentChangers(this.moves.map(function(t) {
            return t.mix()
        }))
    }, t.prototype.show_do = function() {
        return new ConcurrentChangers(this.moves.map(function(t) {
            return t.show_do()
        }))
    }, t.prototype.show_undo = function() {
        return new ConcurrentChangers(this.moves.map(function(t) {
            return t.show_undo()
        }))
    }, t.prototype.track_pov = function(t) {
        var e, n, r, i, o;
        for (i = this.moves, o = [], e = 0, n = i.length; e < n; e++) r = i[e], o.push(r.track_pov(t));
        return o
    }, t.prototype.count = function(t) {
        var e, n, r, i, o;
        if (this.official_text) return 1;
        for (o = 0, i = this.moves, e = 0, n = i.length; e < n; e++) r = i[e], o += r.count(t);
        return o
    }, t.prototype.to_s = function() {
        return "(" + this.moves.map(function(t) {
            return t.to_s()
        }).join(" ") + ")"
    }, t.prototype.as_brdflu = function() {
        var t, e, n, r, i;
        for (r = this.moves.map(function(t) {
                return t.as_brdflu()
            }).join(" ").split(" ").sort().join(" "), n = ["B", "R", "D", "F", "L", "U"], t = 0, e = n.length; t < e; t++) i = n[t], r = r.replace(i + " " + i + "'", ""), r = r.replace(i + "2 " + i + "2", "");
        return r.replace(/[ ]+/g, " ").replace(/^ +| +$/g, "")
    }, t.prototype.display_text = function(t) {
        var e, n;
        return this.official_text ? Move.displayify(this.official_text, t) : (e = this.moves.map(function(e) {
            return e.display_text(t)
        }), function() {
            var t, r, i;
            for (i = [], t = 0, r = e.length; t < r; t++) n = e[t], n && i.push(n);
            return i
        }().join("+"))
    }, t
}(),
Alg = function() {
    function t(t, e, n, r, i) {
        var o, s, a, h;
        for (this.move_codes = t, this.world3d = e, this.algdisplay = n, this.speed = r, this.dom = i, this.moves = [], h = this.move_codes.split(" "), s = 0, a = h.length; s < a; s++) o = h[s], o.length > 0 && this.moves.push(this._make_move(o));
        this.next = 0, this.playing = !1, this._update_dom("first time")
    }
    var e;
    return t.prototype.next_move = function() {
        if (!this.at_end()) return this.next += 1, this.at_end() && (this.playing = !1), this._update_dom(), this.moves[this.next - 1]
    }, t.prototype.prev_move = function() {
        if (!this.at_start()) return this.next -= 1, this._update_dom(), this.moves[this.next]
    }, t.prototype.play = function() {
        return this.playing = !0, this._update_dom(), new AlgAnimation(this)
    }, t.prototype.stop = function() {
        return this.playing = !1, this._update_dom()
    }, t.prototype.to_end = function() {
        var t;
        for (t = []; !this.at_end();) t.push(this.next_move().do());
        return t
    }, t.prototype.to_start = function() {
        var t;
        for (t = []; !this.at_start();) t.push(this.prev_move().undo());
        return t
    }, t.prototype.at_start = function() {
        return 0 === this.next
    }, t.prototype.at_end = function() {
        return this.next === this.moves.length
    }, t.prototype.mix = function() {
        var t;
        for (this.next = this.moves.length, t = []; !this.at_start();) t.push(this.prev_move().mix());
        return t
    }, t.prototype.to_s = function() {
        return this.moves.map(function(t) {
            return t.to_s()
        }).join(" ")
    }, t.prototype.display_text = function() {
        var t, e, n, r, i, o, s, a, h;
        for (t = s = [], e = [], a = this.moves, n = r = 0, i = a.length; r < i; n = ++r) o = a[n], this.next === n && (t = e), h = o.display_text(this.algdisplay), h && t.push(h);
        return {
            past: s.join(" "),
            future: e.join(" ")
        }
    }, e = {
        "-2": ["Z", "2"],
        "-1": ["'", ""],
        1: ["", "'"],
        2: ["2", "Z"]
    }, t.prototype._make_move = function(t) {
        var n, r, i, o, s, a, h, u, c;
        return t.indexOf("+") > -1 ? new CompositeMove(t, this.world3d, this.speed) : "x" === (i = t[0]) || "y" === i || "z" === i ? (o = e[Move.parse_turns(t.substring(1))], u = o[0], c = o[1], r = function() {
            switch (t[0]) {
                case "x":
                    return "R" + u + "+M" + c + "+L" + c;
                case "y":
                    return "U" + u + "+E" + c + "+D" + c;
                case "z":
                    return "F" + u + "+S" + u + "+B" + c
            }
        }(), new CompositeMove(r, this.world3d, this.speed, t)) : ("w" !== t[1] || "U" !== (s = t[0]) && "D" !== s && "L" !== s && "R" !== s && "F" !== s && "B" !== s || (n = 2), "u" !== (a = t[0]) && "d" !== a && "l" !== a && "r" !== a && "f" !== a && "b" !== a || (n = 1), n ? (h = e[Move.parse_turns(t.substring(n))], u = h[0], c = h[1], r = function() {
            switch (t[0].toUpperCase()) {
                case "R":
                    return "R" + u + "+M" + c;
                case "L":
                    return "L" + u + "+M" + u;
                case "U":
                    return "U" + u + "+E" + c;
                case "D":
                    return "D" + u + "+E" + u;
                case "F":
                    return "F" + u + "+S" + u;
                case "B":
                    return "B" + u + "+S" + c
            }
        }(), new CompositeMove(r, this.world3d, this.speed, t)) : new Move(t, this.world3d, this.speed))
    },
    t.prototype.unhand = function() {
        var t, e, n, r, i, o;
        for (r = new Pov, o = [], i = this.moves, t = 0, e = i.length; t < e; t++)
            n = i[t], o.push(r.hand_to_cube(n.as_brdflu())), r.track(n);
        return o.join(" ").replace(/[ ]+/g, " ").replace(/^ +| +$/g, "")
    },
    t.pov_from = function(e) {
        return new Pov(new t(e).moves)
    },
    t.prototype._update_dom = function(t) {
        if (null == t && (t = "later"), this.dom && this.moves.length > 0)
            return "first time" === t && this.dom.init_alg_text(this.display_text().future), this.dom.alg_changed(this.playing, this.at_start(), this.at_end(), this._count_text(), this.display_text())
    },
    t.prototype._count_text = function() {
        var t, e, n, r, i, o, s, a;
        for (a = e = 0, s = this.moves, n = r = 0, i = s.length; r < i; n = ++r)
            o = s[n], t = o.count(this.algdisplay.rotations), this.next > n && (e += t), a += t;
        return e + "/" + a
    }, t
}(),
Colors = function() {
    function t(e, n, r, i, o) {
        null == o && (o = ""),
        this.colored = new Cubexp(e.cube_to_hand(n) || "*"),
        this.solved = new Cubexp(e.cube_to_hand(r)),
        this.tweaks = new Tweaks(e.cube_to_hand(i)),
        this.side_colors = t._set_colors(o, e.hand_to_cube_map())
    }
    var e;
    return t.prototype.to_draw = function(t, e) {
        var n, r, i, o, s;
        for (o = {
                hovers: !1,
                color: this.of(e)
            },
            this.solved.matches_sticker(t, e)
                ? o.color = this.of("solved")
                : this.colored.matches_sticker(t, e)
                    ? o.hovers = !0
                    : o.color = this.of("ignored"),
            i = this.tweaks.for_sticker(t, e),
            n = 0,
            r = i.length;
            n < r;
            n++
        )
            switch (s = i[n], o.hovers = !0, s) {
                case "X":
                case "x":
                    o.x_color = {
                        X: "black",
                        x: "white"
                    }[s];
                    break;
                default:
                    Layer.by_name(s) ? o.color = this.of(s) : log_error("Unknown tweak: '" + s + "'")
            }
        return o
    }, t.prototype.of = function(t) {
        var e;
        if (e = t.name || t, !this.side_colors[e]) throw new Error("Unknown sticker type '" + t + "'");
        return this.side_colors[e]
    }, e = {
        g: "#0d0",
        b: "#07f",
        r: "red",
        o: "orange",
        y: "yellow",
        w: "#eee"
    }, t._set_colors = function(t, n) {
        var r, i, o, s, a, h, u, c, p, d, l;
        for (i = e, d = {
                R: i.g,
                L: i.b,
                F: i.r,
                B: i.o,
                U: i.y,
                D: i.w,
                solved: "#444",
                ignored: "#888",
                cube: "black"
            }, u = t.split(" "), o = 0, s = u.length; o < s; o++) a = u[o], c = a.split(":"), l = c[0], r = c[1], l = {
            s: "solved",
            i: "ignored",
            c: "cube"
        }[l] || l, d[l] = e[r] || r;
        return h = d, p = [h[n.U], h[n.D], h[n.R], h[n.L], h[n.F], h[n.B]],
            h.U = p[0], h.D = p[1], h.R = p[2], h.L = p[3], h.F = p[4], h.B = p[5], d
    }, t
}(),
Config = function() {
    function t(e) {
        this.raw_input = t._parse(e),
        this.base = this.base_config(this.raw_input[BASE], e),
        this.alg = this.raw(ALG),
        this.algdisplay = this._alg_display(),
        this.colors = new Colors(
            Alg.pov_from(this.alg),
            this.raw(COLORED),
            this.raw(SOLVED),
            this.raw(TWEAKS),
            this.raw(COLORS)
        ),
        this.flags = this.raw(FLAGS),
        this.hover = this._hover(),
        this.pov = this.raw(POV, "Ufr"),
        this.setup = this.raw(SETUPMOVES),
        this.speed = this.raw(SPEED, 400)
    }
    return t.prototype.flag = function(t) {
        return this.flags.indexOf(t) > -1
    },
    t.prototype.raw = function(t, e) {
        return null == e && (e = ""), this.raw_input[t] || this.base.raw(t) || e
    },
    t.prototype.base_config = function(e, n) {
        var r;
        return r = window["ROOFPIG_CONF_" + e],
            e && !r && log_error("'ROOFPIG_CONF_" + e + "' does not exist"),
            n && n === r && (log_error(r + " tries to inherit from itself."), r = null),
            r ? new t(r) : { raw: function() {} }
    },
    t.prototype._hover = function() {
        var t;
        switch (t = this.raw(HOVER, "near")) {
            case "none":
                return 1;
            case "near":
                return 2;
            case "far":
                return 7.1;
            default:
                return t
        }
    },
    t.prototype._alg_display = function() {
        var t, e;
        return t = this.raw(ALGDISPLAY),
            e = {},
            e.fancy2s = t.indexOf("fancy2s") > -1,
            e.rotations = t.indexOf("rotations") > -1,
            e.Zcode = "2",
            t.indexOf("2p") > -1 && (e.Zcode = "2'"),
            t.indexOf("Z") > -1 && (e.Zcode = "Z"),
            e
    },
    t._parse = function(t) {
        var e, n, r, i, o, s, a, h;
        if (!t) return {};
        for (a = {}, s = t.split("|"), r = 0, o = s.length; r < o; r++)
            e = s[r],
            n = e.indexOf("="),
            i = e.substring(0, n).trim(),
            h = e.substring(n + 1).trim(),
            a[i] = h,
            PROPERTIES.indexOf(i) === -1 && log_error("Unknown config parameter '" + i + "' ignored");
        return a
    }, t
}(),
PROPERTIES = [
    ALG = "alg",
    BASE = "base",
    ALGDISPLAY = "algdisplay",
    COLORED = "colored",
    COLORS = "colors",
    FLAGS = "flags",
    HOVER = "hover",
    POV = "pov",
    SETUPMOVES = "setupmoves",
    SOLVED = "solved",
    SPEED = "speed",
    TWEAKS = "tweaks"
],
CubeAnimation = function() {
    function t(e) {
        var n, r;
        if (!t.canvas_browser)
            return e.html("Your browser does not support <a href='http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation'>WebGL</a>.<p/> Find out how to get it <a href='http://get.webgl.org/'>here</a>."),
                void e.css({
                    background: "#f66"
                });
        try {
            this.id = t.last_id += 1,
            t.by_id[this.id] = this,
            this.config = new Config(e.data("config")),
            r = this.config.flag("canvas") || !t.webgl_browser /*|| t.webgl_cubes >= 16*/,
            r ? this.renderer = new THREE.CanvasRenderer({
                alpha: !0
            }) : (t.webgl_cubes += 1, this.renderer = new THREE.WebGLRenderer({
                antialias: !0,
                alpha: !0
            })),
            this.dom = new Dom(this.id, e, this.renderer, "" !== this.config.alg, this.config.flag("showalg")),
            this.scene = new THREE.Scene,
            this.world3d = {
                camera: new Camera(this.config.hover, this.config.pov),
                pieces: new Pieces3D(this.scene, this.config.hover, this.config.colors, r)
            },
            this.alg = new Alg(this.config.alg, this.world3d, this.config.algdisplay, this.config.speed, this.dom),
            this.config.setup && new Alg(this.config.setup, this.world3d).to_end(),
            this.config.flag("startsolved") || this.alg.mix(),
            1 === this.cube_count() && EventHandlers.set_focus(this),
            this.changers = {},
            this.animate(!0), EventHandlers.initialize()
        } catch (t) {
            n = t, e.html(n.message), e.css({
                background: "#f66"
            })
        }
    }
    return t.last_id = 0, t.by_id = {}, t.webgl_cubes = 0, t.initialize = function() {
        return t.webgl_browser = function() {
            var t;
            try {
                return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
            } catch (e) {
                return t = e, !1
            }
        }(),
        t.canvas_browser = !!window.CanvasRenderingContext2D,
        t.canvas_browser
            ? t.webgl_browser
                ? void 0
                : log_error("No WebGL support in this browser. Falling back on regular Canvas.")
            : log_error("No Canvas support in this browser. Giving up.")
    },
    t.create_in_dom = function(e, n, r) {
        var i;
        return i = $("<div " + r + ' data-config="' + n + '"></div>').appendTo($(e)),
            new t(i)
    },
    t.prototype.next_cube = function() {
        var e, n;
        return e = Object.keys(t.by_id),
            n = e[(e.indexOf(this.id.toString()) + 1) % e.length],
            t.by_id[n]
    },
    t.prototype.previous_cube = function() {
        var e, n;
        return e = Object.keys(t.by_id),
            n = e[(e.indexOf(this.id.toString()) + e.length - 1) % e.length],
            t.by_id[n]
    },
    t.prototype.remove = function() {
        var e;
        return this === EventHandlers.focus() && (e = 1 === this.cube_count() ? null : this.next_cube(), EventHandlers.set_focus(e)),
            delete t.by_id[this.id],
            this.dom.div.remove()
    },
    t.prototype.cube_count = function() {
        return Object.keys(t.by_id).length
    },
    t.prototype.animate = function(t) {
        var e, n, r, i, o;
        null == t && (t = !1), i = (new Date).getTime(), o = this.changers;
        for (n in o) hasProp.call(o, n) && (r = o[n], r && (r.update(i), r.finished() && (this.changers[n] = null), e = !0));
        return (e || t) && this.renderer.render(this.scene, this.world3d.camera.cam), requestAnimationFrame(function(t) {
            return function() {
                return t.animate()
            }
        }(this))
    },
    t.prototype.add_changer = function(t, e) {
        return this.changers[t] && this.changers[t].finish(), this.changers[t] = e
    },
    t.prototype.button_click = function(t, e) {
        var n;
        switch (t) {
            case "play":
                n = e ? new OneChange(function(t) {
                    return function() {
                        return t.alg.to_end(t.world3d)
                    }
                }(this)) : this.alg.play(this.world3d);
                break;
            case "pause":
                this.alg.stop();
                break;
            case "next":
                this.alg.at_end() || (n = this.alg.next_move().show_do(this.world3d));
                break;
            case "prev":
                this.alg.at_start() || (n = this.alg.prev_move().show_undo(this.world3d));
                break;
            case "reset":
                n = new OneChange(function(t) {
                    return function() {
                        return t.alg.to_start(t.world3d)
                    }
                }(this))
        }
        if (n) return this.add_changer("pieces", n)
    },
    t
}(),
Camera = function() {
    function t(n, r) {
        var i;
        this.cam = new THREE.PerspectiveCamera(this._view_angle(n, e), 1, 1, 100),
        i = t._POVs[r],
        i || (i = t._POVs.Ufr, log_error("Invalid POV '" + this.pov_code + "'. Using Ufr")),
        this.cam.position.copy(i.pos),
        this.cam.up.copy(i.up),
        this.user_dir = {
            dr: i.xn.clone(),
            dl: i.yn.clone(),
            up: i.zn.clone()
        },
        this._cam_moved()
    }
    var e;
    return e = 25,
    t.prototype.rotate = function(t, e) {
        var n, r, i, o;
        for (i = [this.cam.position, this.cam.up, this.user_dir.dl, this.user_dir.dr, this.user_dir.up], n = 0, r = i.length; n < r; n++)
            o = i[n],
        o.applyAxisAngle(t, e);
        return this._cam_moved()
    },
    t.prototype.to_position = function() {
        var t, e, n, r, i, o;
        for (n = [this.cam.position, this.cam.up, this.user_dir.dl, this.user_dir.dr, this.user_dir.up], i = [], t = 0, e = n.length; t < e; t++)
            o = n[t],
            i.push((r = [Math.round(o.x), Math.round(o.y), Math.round(o.z)], o.x = r[0], o.y = r[1], o.z = r[2], r));
        return i
    },
    t.prototype.bend = function(t, e) {
        var n, r, i, o, s, a, h;
        for (
            a = v3_x(this.user_dir.up, t),
            h = v3_sub(this.user_dir.dr, this.user_dir.dl).normalize().multiplyScalar(e),
            n = v3_add(a, h).normalize(),
            this.cam.position.copy(this.unbent_position),
            this.cam.up = this.unbent_up.clone(),
            o = [this.cam.position, this.cam.up],
            r = 0,
            i = o.length; r < i; r++
         )
            s = o[r],
            s.applyAxisAngle(n, Math.sqrt(t * t + e * e));
        return this.cam.lookAt(v3(0, 0, 0))
    },
    t.prototype._view_angle = function(t, e) {
        var n, r, i;
        return i = 2 * Math.sqrt(t * t + 4 * t + 13),
            r = Math.sqrt(3 * e * e) - 2,
            n = 1.015 + .13 * (5 - t) / 4,
            2 * n * Math.atan(i / (2 * r)) * (180 / Math.PI)
    },
    t.prototype._cam_moved = function() {
        return this.cam.lookAt(v3(0, 0, 0)),
            this.unbent_up = this.cam.up.clone(),
            this.unbent_position = this.cam.position.clone()
    },
    t._flip = function(t, e) {
        var n;
        return e > 0 && (n = [t.yn, t.xn],
            t.xn = n[0],
            t.yn = n[1]),
        t
    },
    t._set_perms = function(t, e, n, r, i) {
        return t[e + n + r] = t[e + r + n] = t[n + e + r] = t[n + r + e] = t[r + e + n] = t[r + n + e] = i
    },
    t._POVs = function() {
        var n, r, i, o, s, a, h, u, c, p, d, l, _, f, m, g, v, y, b, w, x, k, L, R, D, C, U;
        for (m = {}, c = [Layer.U, Layer.D], n = 0, o = c.length; n < o; n++)
            for (R = c[n], p = [R.name, R.name.toLowerCase(), R.normal.clone()], U = p[0], D = p[1], C = p[2], d = [Layer.F, Layer.B], r = 0, s = d.length; r < s; r++)
                for (w = d[r], l = [w.name, w.name.toLowerCase(), w.normal.clone()], L = l[0], x = l[1], k = l[2], _ = [Layer.R, Layer.L], i = 0, a = _.length; i < a; i++) g = _[i], f = [g.name, g.name.toLowerCase(), g.normal.clone()], b = f[0], v = f[1], y = f[2], u = v3(y.x, k.y, C.z).multiplyScalar(e), h = y.x * k.y * C.z, t._set_perms(m, U, x, v, t._flip({
                    pos: u,
                    up: C,
                    zn: C,
                    yn: k,
                    xn: y
                }, h)), t._set_perms(m, D, L, v, t._flip({
                    pos: u,
                    up: k,
                    zn: k,
                    yn: y,
                    xn: C
                }, h)), t._set_perms(m, D, x, b, t._flip({
                    pos: u,
                    up: y,
                    zn: y,
                    yn: C,
                    xn: k
                }, h));
        return m
    }(),
    t
}();