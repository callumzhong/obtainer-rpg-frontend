class LayerMap {
	constructor({ cutsceneSpaces, walls, lowerSrc, upperSrc, gameObjects }) {
		this.cutsceneSpaces = cutsceneSpaces || {};
		this.walls = walls || {};
		this.gameObjects = gameObjects;

		// this.lowerImage = new Image();
		// this.lowerImage.src = lowerSrc;
		// this.upperImage = new Image();
		// this.upperImage.src = upperSrc;
		this.isCutscenePlaying = false; // 過場時設為 true
	}
}

export default LayerMap;
