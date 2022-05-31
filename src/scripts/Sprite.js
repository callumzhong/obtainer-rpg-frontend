import imageShadow from '../assets/shadow.png';

class Sprite {
	/**
	 * @param src - image
	 * @param animations - 動畫鏈
	 * @param currentAnimation - 當前動畫
	 * @param gameObject - 遊戲物件
	 */
	constructor(params) {
		this.image = new Image();
		this.image.src = params.src;
		this.image.onload = () => {
			this.isLoaded = true;
		};
		this.useShadow = params.useShadow || false;
		this.imageShadow = new Image();
		this.imageShadow.src = imageShadow;
		this.imageShadow.onload = () => {
			this.isShadowLoaded = true;
		};
		this.animations = params.animations || {
			idleDown: [[0, 0]],
		};
		this.currentAnimation = params.currentAnimation || 'idleDown';
		this.currentAnimationFrame = 0;
		// 外部設置遊戲物件
		this.gameObject = params.gameObject;
	}
	draw(ctx) {
		const x = this.gameObject.x * 16;
		const y = this.gameObject.y * 16;

		this.isShadowLoaded && ctx.drawImage(this.imageShadow, x - 8, y - 12);
		this.isLoaded && ctx.drawImage(this.image, 0, 0, 16, 16, x, y, 16, 16);
	}
}

export default Sprite;
