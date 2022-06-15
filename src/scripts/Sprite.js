import withGrid from '../utils/withGrid';

class Sprite {
	constructor(config) {
		this.image = new Image();
		this.image.src = config.src;
		this.image.onload = () => {
			this.isLoaded = true;
		};

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
		this.currentAnimationFrame = 0;

		this.animationFrameLimit = config.animationFrameLimit || 8;
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

	draw(ctx, cameraPerson) {
		const x = this.gameObject.x + withGrid(10.5) - cameraPerson.x;
		const y = this.gameObject.y - 6 + withGrid(6) - cameraPerson.y;

		const [frameX, frameY] = this.frame;

		this.isLoaded &&
			ctx.drawImage(this.image, frameX * 16, frameY * 16, 16, 16, x, y, 16, 16);

		this.updateAnimationProgress();
	}
}

export default Sprite;
