const calculateFrame = ({
	animations,
	currentAnimation,
	currentAnimationFrame,
}) => {
	return animations[currentAnimation][currentAnimationFrame];
};

export default calculateFrame;
