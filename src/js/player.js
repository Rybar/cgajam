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
  y1: 128+9,
  y2: 128+9,
  y3: 128-9,

  update: function(dt) {


    E.player.x += dt * E.player.xvel;
    E.player.y += dt * E.player.yvel;
    E.player.xvel *= E.player.drag;
    E.player.yvel *= E.player.drag;
    E.player.x1 += dt * E.player.xvel;
    E.player.x2 += dt * E.player.xvel;
    E.player.x3 += dt * E.player.xvel;
    E.player.y1 += dt * E.player.yvel;
    E.player.y2 += dt * E.player.yvel;
    E.player.y3 += dt * E.player.yvel;





    // E.player.x1 = E.player.x - 9;
    // E.player.y1 = E.player.y + 9;
    // E.player.x2 = E.player.x + 9;
    // E.player.y2 = E.player.y + 9;
    // E.player.x3 = E.player.x;
    // E.player.y3 = E.player.y - 9;

    let dx1 = E.player.x1 - E.player.x;
    let dx2 = E.player.x2 - E.player.x;
    let dx3 = E.player.x3 - E.player.x;
    let dy1 = E.player.y1 - E.player.y;
    let dy2 = E.player.y2 - E.player.y;
    let dy3 = E.player.y3 - E.player.y;



    E.player.x1 = E.cos * dx1 - E.sin * dy1 + E.player.x;
    E.player.y1 = E.sin * dx1 + E.cos * dy1 + E.player.y;
    E.player.x2 = E.cos * dx2 - E.sin * dy2 + E.player.x;
    E.player.y2 = E.sin * dx2 + E.cos * dy2 + E.player.y;
    E.player.x3 = E.cos * dx3 - E.sin * dy3 + E.player.x;
    E.player.y3 = E.sin * dx3 + E.cos * dy3 + E.player.y;

    //console.log(E.player);





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

    E.gfx.fillCircle(E.player.x, E.player.y, E.player.radius, 4);
    E.gfx.triangle(
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
