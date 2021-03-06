
var arg = new Object;
var pair = location.search.substring(1).split('&');
for(var i = 0; pair[i] ; i++) {
  var kv = pair[i].split('=');
  arg[kv[0]] = kv[1];
}

GLBoost.VALUE_TARGET_WEBGL_VERSION = arg.webglver ? parseInt(arg.webglver) : 1;

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 640;

phina.globalize();

var guiProps ={

  set x(v){this.target.eye = new GLBoost.Vector3(v, this.y, this.z);},
  get x(){return this.target.eye.x;},
  set y(v){this.target.eye = new GLBoost.Vector3(this.x, v, this.z);},
  get y(){return this.target.eye.y;},
  set z(v){this.target.eye = new GLBoost.Vector3(this.x, this.y, v);},
  get z(){return this.target.eye.z;},
};

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(options) {
    this.superInit();
    var layer = phina.display.GLBoostLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }).addChildTo(this);

    var glBoostContext = layer.glBoostContext;

    var positions = [
      new GLBoost.Vector3(-0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(-0.5,  0.5, 0.0),
      new GLBoost.Vector3(-0.5, 0.5, 0.0),
      new GLBoost.Vector3(0.5, -0.5, 0.0),
      new GLBoost.Vector3(0.5,  0.5, 0.0)
    ];
    var colors = [
      new GLBoost.Vector4(0.0, 1.0, 1.0, 1.0),
      new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(0.0, 0.0, 1.0, 1.0),
      new GLBoost.Vector4(1.0, 1.0, 0.0, 1.0),
      new GLBoost.Vector4(1.0, 0.0, 0.0, 1.0)
    ];
    var geometry = glBoostContext.createGeometry();
    geometry.setVerticesData({
      position: positions,
      color: colors
    });
    var mesh = glBoostContext.createMesh(geometry, null);
    layer.scene.addChild( mesh );
    this.camera = glBoostContext.createPerspectiveCamera({
      eye: new GLBoost.Vector3(0.0, 0, 10.0),
      center: new GLBoost.Vector3(0.0, 0.0, 0.0),
      up: new GLBoost.Vector3(0.0, 1.0, 0.0)
    }, {
      fovy: 45.0,
      aspect: 1.0,
      zNear: 0.1,
      zFar: 1000.0
    });
    layer.scene.addChild( this.camera );

    layer.expression.prepareToRender();

    var label = Label('phina.jsとGLBoostの\n夢の共演！').addChildTo(this);
    label.fill = 'white';
    label.stroke = 'black';
    label.fontSize = 32;
    label.strokeWidth = 4;
    label.x = this.gridX.center();
    label.y = this.gridY.center();

    if (phina.global.gui) {
      this.addDatGUI();
    }
  },
  addDatGUI: function() {
    phina.global.gui.width = 180;
    this.guiCamera = phina.global.gui.addFolder('camera');
    this.guiCameraEye = this.guiCamera.addFolder('eye');
    guiProps.target=this.camera;

    this.guiCameraEye.add(guiProps, 'x', -10, 10).listen();
    this.guiCameraEye.add(guiProps, 'y', -10, 10).listen();
    this.guiCameraEye.add(guiProps, 'z', -10, 10).listen();

    this.guiCameraEye.open();
    this.guiCamera.open();
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });
  app.enableDatGUI(function(gui) {
    phina.global.gui = gui;
    if (app.currentScene.addDatGUI) {
      app.currentScene.addDatGUI();
    }
  });
  app.run();
});

