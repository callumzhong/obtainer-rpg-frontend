class Sprite {
  /**
   * @param src - image
   * @param animations - 動畫鏈
   * @param currentAnimation - 當前動畫
   * @param gameObject - 遊戲物件
   */
  constructor(config) {
    this.animations = config.animations || {
      'idle-down': [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      'idle-right': [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ],
      'idle-up': [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      'idle-left': [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      'walk-down': [
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
      ],
      'walk-right': [
        [0, 6],
        [1, 6],
        [2, 6],
        [3, 6],
      ],
      'walk-up': [
        [0, 7],
        [1, 7],
        [2, 7],
        [3, 7],
      ],
      'walk-left': [
        [0, 5],
        [1, 5],
        [2, 5],
        [3, 5],
      ],
    };

    this.currentAnimation = config.currentAnimation || 'idle-down';
    // 動畫影格
    this.currentAnimationFrame = 0;
    // 動畫幀數限制
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
  }
}

export default Sprite;
