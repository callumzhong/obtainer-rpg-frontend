import Sprite from './sprite';

class PlayerSprite extends Sprite {
	constructor(params) {
		super(params);
		this.name = 'playerSprite';
		this.imageXMin = 1;
	}

	getScale() {
		return {
			w: this.image.width / this.scale.w,
			h: this.image.height / this.scale.h,
		};
	}

	draw(ctx, ref) {
		const posX = ref.current.width / 2 - this.image.width / this.scale.w;
		const poxY = ref.current.height / 2 - this.image.height / this.scale.h;
		this.dx = posX + this.position.x;
		this.dy = poxY - this.position.y;
		ctx.drawImage(
			this.image,
			this.sx,
			this.sy,
			this.getScale().w,
			this.getScale().h,
			// this.dx,
			// this.dy,
			0,
			0,
			this.getScale().w,
			this.getScale().h,
		);
	}
	left() {
		// this.position.x -= 0.5;
	}
	right() {
		// this.position.x += 0.5;
	}
	top() {
		// this.position.y += 0.5;
	}
	down() {
		// this.position.y -= 0.5;
	}
}

export default PlayerSprite;
