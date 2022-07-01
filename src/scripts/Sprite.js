import withGrid from 'utils/withGrid';

class Sprite {
  constructor(config) {
    this.animations = config.animations || {
      'idle-down': [[0, 0]],
      'idle-right': [[0, 2]],
      'idle-up': [[0, 3]],
      'idle-left': [[0, 1]],
      'walk-down': [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      'walk-right': [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
      'walk-up': [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      'walk-left': [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      'fight-down': [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      'fight-right': [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      'fight-up': [
        [0, 3],
        [1, 3],
        [2, 3],
      ],
      'fight-left': [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
    };
    this.currentAnimation = config.currentAnimation || 'idle-down';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 7;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, middle, cameraPerson) {
    const { width, height, zoom, isLoaded, transformX, transformY } = middle;
    const [frameX, frameY] = this.frame;
    const x = this.gameObject.x + withGrid(16) - cameraPerson.x;
    const y = this.gameObject.y + withGrid(7.5) - cameraPerson.y;
    const dWidth = width >= 48 ? width : 48 - width + width;
    const dHeight = height >= 48 ? height : 48 - height + height;

    isLoaded &&
      ctx.drawImage(
        middle.image,
        frameX * width,
        frameY * height,
        width,
        height,
        x + transformX,
        y + transformY,
        dWidth * zoom,
        dHeight * zoom,
      );

    this.updateAnimationProgress();
  }
}

export default Sprite;
