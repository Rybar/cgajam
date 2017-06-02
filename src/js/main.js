
var E = ENGINE;
/**
 * Created by ryan on 3/6/17.
 */
/**
 * Created by ryan on 3/3/17.
 */
init = function(){

  E.last = 0;
  E.dt = 0;
  E.now = 0;
  stats = new Stats();
  document.body.appendChild( stats.dom );
  E.canvasInit();
  E.game.create();

      //initialize keypress event listeners
      window.addEventListener('keyup', function (event) {
          Key.onKeyup(event);
      }, false);
      window.addEventListener('keydown', function (event) {
          Key.onKeydown(event);
          // console.log('key pressed');
      }, false);
      window.addEventListener('blur', function (event) {
          paused = true;
      }, false);
      window.addEventListener('focus', function (event) {
          paused = false;
      }, false);
      window.addEventListener('resize', E.game.resize );

      loop();

}

function loop(){
  stats.begin();
  //game timer
  let now = new Date().getTime();
  E.dt = Math.min(1, (now - E.last) / 1000);

  //update
  E.game.step(E.dt);
  E.last = now;

  //draw
  E.game.render();

  stats.end();
  requestAnimationFrame(loop);
}
