class PrivateImage {
	constructor({ imageSrc, x, y }) {
		this.image = new Image();
		this.image.src = imageSrc;
		this.x = x || 0;
		this.y = y || 0;
		this.image.onload = () => {
			this.isLoaded = true;
		};
	}
}

class LayerImage {
	constructor({ lowerSrc, uppers, gameObjects }) {
		this.lowerImage = new Image();
		this.lowerImage.src = lowerSrc;
		this.uppers = {};
		this.gameObjects = {};
		uppers &&
			Object.keys(uppers).reduce((obj, key) => {
				obj[key] = new PrivateImage({
					imageSrc: uppers[key].imageSrc,
					x: uppers[key].x,
					y: uppers[key].y,
				});
				return obj;
			}, this.uppers);
		Object.keys(gameObjects).reduce((obj, key) => {
			obj[key] = new PrivateImage({
				imageSrc: gameObjects[key].imageSrc,
			});
			return obj;
		}, this.gameObjects);
	}
}

export default LayerImage;
