import Sprite from './sprite';

class HomeSprite extends Sprite {
	constructor(params) {
		super(params);
		this.name = 'backgroundSprite';
	}

	draw(ctx, ref) {
		ctx.drawImage(
			this.image,
			0 + this.position.x,
			20 + this.position.y,
			ref.current.width,
			ref.current.height,
			0,
			0,
			ref.current.width,
			ref.current.height,
		);
	}
}

export default HomeSprite;
