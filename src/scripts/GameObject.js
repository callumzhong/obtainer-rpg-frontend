import Sprite from './Sprite';

class GameObject {
	/**
	 * @param x - canvas drawImage dx param
	 * @param y - canvas drawImage dx param
	 * @param src - image
	 */
	constructor(params) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.sprite = new Sprite({
			gameObject: this,
			src: params.src,
			useShadow: params.useShadow,
		});
	}
}

export default GameObject;
