E.player = {
  // x: 0,
  // y: 0,
  // radius: 12,
  // xvel: 0,
  // yvel: 0,
  // speed: 6,
  // drag: .97,

  bullet: {
    x: 0, y:0, xvel: 0, yvel: 0
  },

  init: function(){
    this.x = 64;
    this.y =  230;
    this.radius = 12;
    this.xvel = 0;
    this.yvel = 0;
    this.speed = 6;
    this.drag = .97;
  },

  update: function(dt) {
    E.player.bullet.x = E.player.x;
    E.player.bullet.y = E.player.y;
    let xIntegrate = dt * E.player.xvel * E.player.drag;
    let yIntegrate = dt * E.player.yvel * E.player.drag;

    E.player.x += xIntegrate;
    E.player.y += yIntegrate;

    //player movement
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        E.player.xvel -=E.player.speed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        E.player.xvel +=E.player.speed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP)){
      E.player.yvel -=E.player.speed;
    }
    if(Key.isDown(Key.s) || Key.isDown(Key.DOWN)) {
      E.player.yvel +=E.player.speed;
    }

    if(Key.isDown(Key.SPACE || Key.isDown(Key.z))){
      //E.player.bullet.xvel = E.player.xvel;
      E.player.bullet.yvel = -350;
      bulletPool.get(E.player.bullet);
    }

    //world wrap for player
    if(E.player.x > 256){
      E.player.x = 0;
    }
    if(E.player.x < 0){
      E.player.x = 256;
    }
    if(E.player.y > 365){
      E.player.y = 0;
    }
    if(E.player.y < 0){
      fsm.lose();
      E.player.y = 256;
    }
    //end world wrap for player


  },

  draw: function(dt) {

    // let degrees = (360/256) * E.player.x * 0.0174533;
    // let radius = (E.player.y / 2);

    let playerDrawPoint = E.util.toPolarScreen({x:E.player.x, y:E.player.y});

    let distFromCenter = E.util.dist(playerDrawPoint.x+128, playerDrawPoint.y+128, 128,128);

    let playerSizeFactor = E.util.norm(distFromCenter, 0, 128)

    E.gfx.fillCircle(playerDrawPoint.x+128, playerDrawPoint.y+128, E.player.radius * playerSizeFactor, 4);


  },

}
