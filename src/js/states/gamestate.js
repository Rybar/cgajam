states.game = {

    onenter: function() {
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
    //  E.capturer = new CCapture( {format: 'gif', workersPath: ''});
      //E.capturer.start();

        bulletPool = new Pool(100, Particle);

        bulletPool.init();



        E.stars = [];
        for(var i = 0; i < 300; i++){
          E.stars.push({
            x: Math.random()*256,
            y: Math.random()*256,
            speed: Math.random() * 6
          })
        };


        E.moveX = 0;
        E.speedFactor = .6;

        // E.renderTarget = E.page2;
        // E.gfx.fillRect(0,0,256,256,1);
        // E.gfx.checker(16,16,2);

        E.songTrigger = false;

        E.player.init();

    },

    onexit: function(event, from, to){


    },

    step: function(dt) {
        //------rotate the spinny background orbs

        //still using these for player doodad rotation
        E.cos = Math.cos(dt);
        E.sin = Math.sin(dt);

        for(var i = 0; i < E.stars.length; i++){
          let star = E.stars[i];
          star.y += star.speed * E.speedFactor * (1 + (2 * E.util.norm(star.y, 0, 365) ) );
          if(star.y > 365){ //magic number; reaches corner of screen
            star.y = 0;
            star.x = Math.random()*256;
          }
        }

        E.player.update(dt);

        //----hacky sound test
        if(Key.isDown(Key.z)){
          E.songTrigger = true
        }
        if(E.songTrigger){
          E.songTrigger = false;
          E.playSound(E.sounds.song, 1, 1, 0);
        }
        //---end hacky sound test

        bulletPool.use();



    },

    render: function(dt) {
        //pink background orbs
        E.renderTarget = E.page1;

        E.gfx.fillRect(0,0,256,256,0);

        for(let i = 0; i < E.stars.length; i++){
          let degrees = (360/256) * E.stars[i].x * 0.0174533;
          let radius = (E.stars[i].y / 2);
          let starDrawPoint = E.util.polarToPoint(degrees, radius);
          E.gfx.pset(starDrawPoint.x+128, starDrawPoint.y+128, E.MAGENTA);
        }
        E.gfx.fillCircle(128,128,10,0);
        /*for(var i = 0; i < E.triangles.length; i++){

          //convert position to polar coordinates

          let screenTriPoint1 = E.util.polarToPoint(
            (360/256) * E.triangles[i].x1 * 0.0174533,
            E.triangles[i].y1 * 0.5
          );

          let screenTriPoint2 = E.util.polarToPoint(
            (360/256) * E.triangles[i].x2 * 0.0174533,
            E.triangles[i].y2 * 0.5
          );

          let screenTriPoint3 = E.util.polarToPoint(
            (360/256) * E.triangles[i].x3 * 0.0174533,
            E.triangles[i].y3 * 0.5
          );

            // E.gfx.triangle(
            //   screenTriPoint1.x + 128,
            //   screenTriPoint1.y +128,
            //   screenTriPoint2.x + 128,
            //   screenTriPoint2.y + 128,
            //   screenTriPoint3.x + 128,
            //   screenTriPoint3.y + 128,
            //   E.triangles[i].color
            // )

          }*/
        //end background

        E.player.draw();
        var bp = bulletPool.getPool();
        //console.log(bp);
        for(let i = 0; i < bp.length; i++){
          if(!bp[i].dead){
            //console.log('drawing bullet '+ i);

            bulletScreenPoint = E.util.toPolarScreen({
              x: bp[i].x,
              y: bp[i].y
            });
            let distFromCenter = E.util.dist(bulletScreenPoint.x+128, bulletScreenPoint.y+128, 128, 128)
            let sizeFactor = E.util.norm(distFromCenter, 0, 128);
            E.gfx.fillCircle(bulletScreenPoint.x+128, bulletScreenPoint.y+128, 4 * sizeFactor, E.WHITE);
            //E.gfx.pset(bulletScreenPoint.x+128, bulletScreenPoint.y+128, E.WHITE);
            //E.gfx.circle(bp[i].x, bp[i].y, 3, 4);
            //console.log(bp[i].x, + " " + bp[i].y);
          }
        }

        //E.gfx.circle(128,128, 127,E.WHITE)4

        //dither-trails effect
        E.renderTarget = E.page3;
        var i = 3000;
        while(i--){
            var x = (Math.random()*256)|0;
            var y = (Math.random()*256)|0;
            var color = E.ram[E.page1 + (y*256+x)];  //get the color at a random location on screen
            E.gfx.pset(x, y, color-1); //draw a 1px diameter circle, less 1 from its color index (towards black);
        }
        //end dither-trails effect

        E.renderTarget = E.page2;
        //page screen clear
        E.gfx.fillRect(0,0,256,256,0);
        Txt.text({
                x: 8,
                y: 240,
                text: "X: "+E.player.x.toString().substring(0,7) +
                      "\nY: "+E.player.y.toString().substring(0,7),
                hspacing: 2,
                vspacing: 2,
                halign: 'left',
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
