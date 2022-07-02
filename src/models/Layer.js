class Layer {
  constructor({ cutsceneSpaces, walls, gameObjects }) {
    this.cutsceneSpaces = cutsceneSpaces || {};
    this.walls = walls || {};
    this.gameObjects = gameObjects;
    this.isCutscenePlaying = false; // 過場時設為 true
  }
}

export default Layer;
