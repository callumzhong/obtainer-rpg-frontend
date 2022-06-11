class PrivateImage {
	constructor({ imageSrc }) {
		this.image = new Image();
		this.image.src = imageSrc;
		this.image.onload = () => {
			this.isLoaded = true;
		};
	}
}

class LayerImage {
	constructor({ lowerSrc, upperSrc, gameObjects }) {
		this.lowerImage = new Image();
		this.lowerImage.src = lowerSrc;
		this.upperImage = new Image();
		this.upperImage.src = upperSrc;
		this.gameObjects = {};
		Object.keys(gameObjects).reduce((prev, key) => {
			prev[key] = new PrivateImage({
				imageSrc: gameObjects[key].imageSrc,
			});
			return prev;
		}, this.gameObjects);
	}
}

export default LayerImage;
