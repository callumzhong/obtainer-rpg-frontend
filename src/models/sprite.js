class Sprite {
	/**
	 * @param {* object} scale image 比例大小
	 * @param {* number} scale.w 寬度 image.width / scale.w
	 * @param {* number} scale.h 高度 image.height / scale.h
	 * @param {* object} position 定位
	 * @param {* number} position.x x軸
	 * @param {* number} position.y y軸
	 * @param {* object} image 圖片- new Image()
	 */
	constructor({ scale, position, velocity, image }) {
		this.scale = scale;
		this.position = position;
		this.image = image;
		this.sx = 0;
		this.sy = 0;
		this.dx = 0;
		this.dy = 0;
	}
}
export default Sprite;
