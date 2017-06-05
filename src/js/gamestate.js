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

      //init vid capture
      //E.capturer = new CCapture( {format: 'gif', workersPath: ''});

      //E.capturer.start();

      E.triangles = [];
      for(var i = 0; i < 200; i++){
        let ox = (Math.random() * 255)|0;
        let oy = (Math.random() * 255)|0;
        let rad = 5;
        E.triangles.push({
          x1: ox + (Math.random() * rad * 4) - rad,
          y1: oy + (Math.random() * rad * 4) - rad,
          x2: ox + (Math.random() * rad * 4) - rad,
          y2: oy + (Math.random() * rad * 4) - rad,
          x3: ox + (Math.random() * rad * 4) - rad,
          y3: oy + (Math.random() * rad * 4) - rad,
          color: ( (Math.random() * 2)|0 ) + 1,
        })
      }

        E.t = 0;
        E.moveX = 0;

        // E.renderTarget = E.page2;
        // E.gfx.fillRect(0,0,256,256,1);
        // E.gfx.checker(16,16,2);

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
        //------rotate the spinny background orbs
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
        //------end rotate background orbs

        E.player.update(dt);

        //----hacky sound test
        if(Key.isDown(Key.z)){
          E.songTrigger = true
        }
        if(E.songTrigger){
          E.songTrigger = false;
          E.playSound(E.sounds.song, 1, 1, 0);
          //E.capturer.stop();
          //E.capturer.save();
        }
        //---end hacky sound test



    },

    render: function(dt) {
        //pink background orbs
        E.renderTarget = E.page1;

        E.gfx.fillRect(0,0,256,256,0);
        for(var i = 0; i < E.triangles.length; i++){

            E.gfx.triangle(
              E.triangles[i].x1,
              E.triangles[i].y1,
              E.triangles[i].x2,
              E.triangles[i].y2,
              E.triangles[i].x3,
              E.triangles[i].y3,
              E.triangles[i].color
            )

          }
        //end background

        E.player.draw();

        Txt.text({
                x: 128,
                y: 40 + Math.sin(E.t*2.5)*15,
                text: 'CGA\nJAM',
                hspacing: 8 + Math.cos(E.t*2.9)*4,
                vspacing: 15 + Math.sin(E.t*3.5)*5,
                halign: 'center',
                valign: 'top',
                scale: 10,
                snap: 1,
                render: 1,
                color: E.WHITE,
            });



        //dither-trails effect
        E.renderTarget = E.page3;
        var i = 5000;
        while(i--){
            var x = (Math.random()*256)|0;
            var y = (Math.random()*256)|0;
            var color = E.ram[E.page1 + (y*256+x)];  //get the color at a random location on screen
            E.gfx.circle(x, y-1, 1, color-1); //draw a 1px diameter circle, less 1 from its color index (towards black);
        }
        //end dither-trails effect

        //text test---------

            //console.log(E.sin)


        E.renderTarget = E.page2;
        //page screen clear
        E.gfx.fillRect(0,0,256,256,0);
        Txt.text({
                x: 128,
                y: 200,
                text: "TEXT RENDERER OPERATIONAL\n" + E.player.x.toString().substring(0,15),
                hspacing: 2,
                vspacing: 2,
                halign: 'center',
                valign: 'top',
                scale: 1,
                snap: 1,
                render: 1,
                color: E.CYAN,
            });

            E.renderSource = E.page3;
            E.renderTarget = E.screen;
            E.gfx.fillRect(0,0,256,256,1);
            E.gfx.spr(0,0,256,256);

            E.renderSource = E.page1;
            E.renderTarget = E.screen;
            //E.gfx.fillRect(0,0,256,256,1);
            E.gfx.spr(0,0,256,256);

            E.renderSource = E.page2;
            E.renderTarget = E.screen;
            E.gfx.spr(0,0,256,256);

        E.render();

        //E.capturer.capture(E.canvas);

    },



};
