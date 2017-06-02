E.game = {

    create: function() {
      // sound hacky stuff-----------
      E.sounds = {};

      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext;

      let soundGen = new sonantx.MusicGenerator(E.assets.song);
        soundGen.createAudioBuffer(function(buffer) {
        //E.sounds.loaded++;
        E.sounds.song = buffer;

      });

      // --------end hacky sound stuff


      E.triangles = [];
      for(var i = 0; i < 150; i++){
        let ox = (Math.random() * 255)|0;
        let oy = (Math.random() * 255)|0;
        let rad = 1;
        E.triangles.push({
          x1: ox + (Math.random() * rad * 4) - rad,
          y1: oy + (Math.random() * rad * 4) - rad,
          x2: ox + (Math.random() * rad * 4) - rad,
          y2: oy + (Math.random() * rad * 4) - rad,
          x3: ox + (Math.random() * rad * 4) - rad,
          y3: oy + (Math.random() * rad * 4) - rad,
          color: ( (Math.random() * 4)|0 ) + 1,
        })
      }


        E.bgColor = 0;
        E.fgColor = 21;
        E.t = 0;
        E.moveX = 0;

        E.renderTarget = E.page2;
        E.gfx.fillRect(0,0,256,256,1);
        E.gfx.checker(16,16,2);


        E.player = {
          x: 128,
          y: 128,
          radius: 10,
          xvel: 0,
          yvel: 0,
          speed: 6

        }

        E.drag = .97;

        E.songTrigger = false;

        E.cursor = {
            x: 0,
            y: 0
        };
    },

    resize: function() {
      E.canvas.width = window.innerWidth;
      E.canvas.height = window.innerHeight;
    },

    step: function(dt) {
        E.t += dt;

        E.cos = Math.cos(dt);
        E.sin = Math.sin(dt);

        for(var i = 0; i < E.triangles.length; i++){

            var tri = E.triangles[i],

            dx1 = tri.x1 + -128,
            dx2 = tri.x2 + -128,
            dx3 = tri.x3 + -128,
            dy1 = tri.y1 + -128,
            dy2 = tri.y2 + -128,
            dy3 = tri.y3 + -128;

            E.triangles[i].x1 = E.cos * dx1 - E.sin * dy1 + 128;
            E.triangles[i].y1 = E.sin * dx1 + E.cos * dy1 + 128;
            E.triangles[i].x2 = E.cos * dx2 - E.sin * dy2 + 128;
            E.triangles[i].y2 = E.sin * dx2 + E.cos * dy2 + 128;
            E.triangles[i].x3 = E.cos * dx3 - E.sin * dy3 + 128;
            E.triangles[i].y3 = E.sin * dx3 + E.cos * dy3 + 128;
        };

        E.player.x += dt * E.player.xvel;
        E.player.y += dt * E.player.yvel;
        E.player.xvel *= E.drag;
        E.player.yvel *= E.drag;

        //player movement
        if (Key.isDown(Key.a)) {
            E.player.xvel -=E.player.speed;
        }
        //----hacky sound test
        if(Key.isDown(Key.z)){
          E.songTrigger = true
        }
        if(E.songTrigger){
          E.songTrigger = false;
          E.playSound(E.sounds.song, 1, 1, 1);
        }
        //---end hacky sound test

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

        //kill key log
    },

    render: function(dt) {

        E.renderTarget = E.screen;
        //E.gfx.fillRect(0,0,256,256,0);
        for(var i = 0; i < E.triangles.length; i++){

            E.gfx.triangle(
              E.triangles[i].x1,
              E.triangles[i].y1,
              E.triangles[i].x2,
              E.triangles[i].y2,
              E.triangles[i].x3,
              E.triangles[i].y3,
              2
            )
          }
        //E.pal = [0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0]

        E.gfx.fillCircle(E.player.x, E.player.y, E.player.radius, 4);

        var i = 4000;
        E.renderTarget = E.screen;
        while(i--){
            var x = (Math.random()*256)|0;
            var y = (Math.random()*256)|0;
            var color = E.ram[E.screen + (y*256+x)];
            E.gfx.circle(x, y, 1, color-1);
        }

        E.gfx.fillCircle(E.player.x, E.player.y, E.player.radius, 4);

        //composite

        E.render();

    },



};
