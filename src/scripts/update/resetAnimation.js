const resetAnimation = (key, direction, state) => {
	if (state.currentAnimation !== key + direction) {
		return {
			...state,
			currentAnimation: key + direction,
			currentAnimationFrame: 0,
			animationFrameProgress: state.animationFrameLimit,
		};
	}
	return state;
};

export default resetAnimation;
