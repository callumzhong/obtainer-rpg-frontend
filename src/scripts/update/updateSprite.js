import { curry } from 'ramda';
import resetAnimation from './resetAnimation';
const calledWalkResetAnimation = curry(resetAnimation)('walk-');
const calledIdleResetAnimation = curry(resetAnimation)('idle-');

const updateSprite = ({
	sprite: {
		currentAnimation,
		currentAnimationFrame,
		animationFrameProgress,
		...args
	},
	direction,
	movingProgressRemaining,
}) => {
	const state = {
		sprite: {
			...args,
			currentAnimation,
			currentAnimationFrame,
			animationFrameProgress,
		},
	};

	if (movingProgressRemaining > 0) {
		// 'walk-' + this.direction
		state.sprite = calledWalkResetAnimation(direction, state.sprite);
		return state.sprite;
	}
	// 'idle-' + this.direction
	state.sprite = calledIdleResetAnimation(direction, state.sprite);
	return state.sprite;
};

export default updateSprite;
