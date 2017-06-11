function Particle() {

  this.inUse = false;

  this.init = function(){
    this.x = -500;
    this.y = -500;
    this.dead = true;
    this.xvel = 0;
    this.yvel = 1;
    this.life = 1;
  }

  Particle.prototype.spawn = function(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.xvel = opt.xvel;
    this.yvel = opt.yvel;
    this.inUse = true;
    this.life = opt.life || 1;
    this.remaining = opt.life || 1;
    this.radius = opt.radius || 1;
    this.color = opt.color || E.WHITE;
    this.dead = false;
  }

  Particle.prototype.use = function(dt){
    if(this.dead) {
      return true;
    }
    else {
      this.remaining -= E.dt;
      this.x += E.dt * this.xvel;
      this.y += E.dt * this.yvel;
      //console.log('bullet used/updated');
        if(this.remaining <= 0) {
          this.dead = true;
          return true;
        }
        if(this.y < 0){
          this.dead = true;
        }
    }
    return false;
  }


  Particle.prototype.clear = function(){
    this.x = -500;
    this.y = -500;
    this.dead = true;
    this.xvel = 0;
    this.yvel = 0;
    this.life = 1;
    this.inUse = false;
  }


}
