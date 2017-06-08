E.player = {
  x: 128,
  y: 230,
  radius: 3,
  xvel: 0,
  yvel: 0,
  speed: 6,
  drag: .97,

  x1: 128-9,
  x2: 128+9,
  x3: 128,
  y1: 230+9,
  y2: 230+9,
  y3: 230-9,

  update: function(dt) {
    let xIntegrate = dt * E.player.xvel * E.player.drag;
    let yIntegrate = dt * E.player.yvel * E.player.drag;

    E.player.x += xIntegrate;
    E.player.y += yIntegrate;
    //update triangle points
    E.player.x1 += xIntegrate;
    E.player.x2 += xIntegrate;
    E.player.x3 += xIntegrate;
    E.player.y1 += yIntegrate;
    E.player.y2 += yIntegrate;
    E.player.y3 += yIntegrate;

    //player movement
    if (Key.isDown(Key.a)) {
        E.player.xvel -=E.player.speed;
    }


    if (Key.isDown(Key.d)){
        E.player.xvel +=E.player.speed;
    }
    if(Key.isDown(Key.w)){
      E.player.yvel -=E.player.speed;
    }
    if(Key.isDown(Key.s)) {
      E.player.yvel +=E.player.speed;
    }
    //end player movement

    //pew pew pew
    if(Key.isDown(Key.SPACE)){

    }

    //world wrap for player
    if(E.player.x > 256+E.player.radius*2){
      E.player.x = -E.player.radius
      
    }
    if(E.player.x < 0-E.player.radius*2){
      E.player.x = 256+E.player.radius
    }
    if(E.player.y > 256+E.player.radius*2){
      E.player.y = -E.player.radius
    }
    if(E.player.y < 0-E.player.radius*2){
      E.player.y = 256+E.player.radius
    }
    //end world wrap for player


  },

  draw: function(dt) {

    //E.gfx.fillCircle(E.player.x, E.player.y, E.player.radius, 4);
    E.gfx.fillTriangle(
      E.player.x1,
      E.player.y1,
      E.player.x2,
      E.player.y2,
      E.player.x3,
      E.player.y3,
      E.WHITE
    )

  },

}
