class PrivateImage {
  constructor({ src, width, height, zoom, transformX, transformY }) {
    this.image = new Image();
    this.image.src = src;
    this.isLoaded = false;
    this.width = width || 48;
    this.height = height || 60;
    this.zoom = zoom || 1;
    this.transformX = transformX || 0;
    this.transformY = transformY || 0;
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }
}

class LayerImage {
  constructor({ lowerSrc, upperSrc, gameObjects }) {
    this.lower = new PrivateImage({
      src: lowerSrc,
    });
    this.upper = new PrivateImage({
      src: upperSrc,
    });

    this.gameObjects = {};
    Object.keys(gameObjects).reduce((obj, key) => {
      obj[key] = new PrivateImage({
        src: gameObjects[key].src,
        width: gameObjects[key].width,
        height: gameObjects[key].height,
        zoom: gameObjects[key].zoom,
        transformX: gameObjects[key].transformX,
        transformY: gameObjects[key].transformY,
      });
      return obj;
    }, this.gameObjects);
  }
}

export default LayerImage;
