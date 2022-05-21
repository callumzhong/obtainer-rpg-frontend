import Sprite from './sprite';

class HomeSprite extends Sprite {
	constructor(params) {
		super(params);
		this.name = 'backgroundSprite';
	}

	draw(ctx, ref) {
		const posX = ref.current.width / 2 - this.image.width / this.box.w;
		const poxY = ref.current.height / 2 - this.image.height / this.box.h;
		ctx.drawImage(
			this.image,
			0,
			0,
			this.image.width / this.box.w,
			this.image.height / this.box.h,
			posX + this.position.x,
			poxY - this.position.y,
			this.image.width / this.box.w,
			this.image.height / this.box.h,
		);
	}
}

export default HomeSprite;
