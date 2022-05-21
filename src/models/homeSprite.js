import Sprite from './sprite';

class HomeSprite extends Sprite {
	constructor(params) {
		super(params);
		this.name = 'homeSprite';
		this.sx += this.position.x;
		this.sy += this.position.y;
	}

	draw(ctx, ref) {
		ctx.drawImage(
			this.image,
			this.sx,
			this.sy,
			ref.current.width,
			ref.current.height,
			this.dx,
			this.dy,
			ref.current.width,
			ref.current.height,
		);
	}

	left() {
		this.position.x -= 3;
	}
	right() {
		this.position.x += 3;
	}
	top() {
		this.position.y -= 3;
	}
	down() {
		this.position.y += 3;
	}
}

export default HomeSprite;
