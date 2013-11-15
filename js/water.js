define([], function() {
	var Water = me.ColorLayer.extend({
		init: function(level) {
			this.parent('water', '#64B7A9', 100);
			this.alpha = 0.5;
			this.level = level;
			this.pos.x = 0;
			this.width = me.game.world.width;
		},
		draw: function(context) {
			this.pos.y = me.game.world.height - this.level.waterHeight();
			this.height = me.game.world.height - this.pos.y;
			this.drawn = true;
			this.parent(context, this);
		},
		update: function() {
			this.parent();
			var updated = this.updated;
			this.updated = false;
			return updated;
		},
		isOver: function(renderable) {
			return this.drawn && renderable.top > this.pos.y;
		},
		submerged: function(renderable) {
			return this.drawn ? renderable.bottom - this.pos.y : 0;
		}
	});

	return Water;
});
