define(['waterTool'], function(WaterTool) {
  var Character = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.setVelocity(3, 15);
      this.waterTool = new WaterTool();

      //  Add animation sets
      this.renderable.addAnimation('anStill', [0, 1, 2, 3, 4, 5, 6, 7]);
      this.renderable.addAnimation('anRight', [8, 9, 10, 11, 12, 13]);
      this.renderable.addAnimation('anLeft', [16, 17, 18, 19, 20, 21]);
      this.renderable.addAnimation('anJump', [24, 25, 25, 26, 27, 28, 29, 30]);
      this.renderable.setCurrentAnimation('anStill');

      // We need it so when the character falls too quickly,
      // the death by water check can still be done.
      this.alwaysUpdate = true;
    },
    setAnimation: function(Animation){
      if(! this.renderable.isCurrentAnimation(Animation) ){
        this.renderable.setCurrentAnimation(Animation);
      }
    },
    update: function() {
      if (this.isDead()) {
        me.state.current().reset();
        return;
      }

      if (me.input.isKeyPressed('left')) {
        this.setAnimation('anLeft');
        this.vel.x -= this.accel.x * me.timer.tick;
      } else if (me.input.isKeyPressed('right')) {
        this.setAnimation('anRight');
        this.vel.x += this.accel.x * me.timer.tick;
      } else {
        if(!this.jumping){
          this.setAnimation('anStill');
        }

        this.vel.x = 0;
      }

      if (me.input.isKeyPressed('jump')) {
        if (!this.jumping && !this.falling) {
          this.setAnimation('anJump');
          this.vel.y = -this.maxVel.y * me.timer.tick;
          this.jumping = true;
        }
      }

      if (me.input.isKeyPressed('waterTool')) {
        this.waterTool.use();
      }

      this.updateMovement();
      this.parent();

      return true;
    },

    isDead: function() {
      // Check for each possible death condition here

      // is under water
      if (me.state.current().water.isOver(this)) {
        return true;
      }
    }
  });

  return Character;
});
