import React, { useRef } from 'react';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Canvas from '../modules/Canvas';
import calculateFrame from '../scripts/calc/calculateFrame';
import withGrid from '../scripts/calc/withGrid';

const updateAnimationProgress = ({
	sprite: {
		animations,
		currentAnimation,
		animationFrameLimit,
		animationFrameProgress,
		currentAnimationFrame,
	},
}) => {
	const state = {
		animations: { ...animations },
		currentAnimation,
		animationFrameLimit,
		animationFrameProgress,
		currentAnimationFrame,
	};

	//Downtick frame progress
	if (state.animationFrameProgress > 0) {
		state.animationFrameProgress -= 1;
		return state;
	}

	//Reset the counter
	state.animationFrameProgress = state.animationFrameLimit;
	state.currentAnimationFrame += 1;
	if (calculateFrame(state) === undefined) {
		state.currentAnimationFrame = 0;
	}
	return state;
};

const drawImage = (ctx, state, cameraPerson) => {
	ctx.drawImage(
		state.image,
		withGrid(10.5) - cameraPerson.x,
		withGrid(6) - cameraPerson.y,
	);
};

const spriteDrawImage = (ctx, state, cameraPerson) => {
	const x = state.x - 8 + withGrid(10.5) - cameraPerson.x;
	const y = state.y - 18 + withGrid(6) - cameraPerson.y;
	const { animations, currentAnimation, currentAnimationFrame } = state.sprite;
	const [frameX, frameY] = calculateFrame({
		animations,
		currentAnimation,
		currentAnimationFrame,
	});

	state.isLoaded &&
		ctx.drawImage(
			state.image,
			frameX * 16,
			frameY * 16,
			16,
			16,
			x + 8,
			y + 12,
			16,
			16,
		);
};

const GameCanvas = React.memo(({ layer, layerImage }) => {
	const canvasRef = useRef();
	const { gameObjects: gameObjectsImage } = layerImage;
	const gameObjectKeys = Object.keys(gameObjectsImage);
	useRequestAnimationFrame((time) => {
		//camera center
		const cameraPerson = layer.gameObjects.hero;
		canvasRef.current.draw((ctx) => {
			drawImage(ctx, { image: layerImage.lowerImage }, cameraPerson);

			Object.values(layer.gameObjects)
				.sort((a, b) => a.y - b.y)
				.forEach((object, i) => {
					const { sprite } = object;
					const currentImage = gameObjectsImage[gameObjectKeys[i]];
					const spriteDrawState = {
						...object,
						image: currentImage.image,
						isLoaded: currentImage.isLoaded,
					};

					spriteDrawImage(ctx, spriteDrawState, cameraPerson);
					const { animationFrameProgress, currentAnimationFrame } =
						updateAnimationProgress(object);

					sprite.animationFrameProgress = animationFrameProgress;
					sprite.currentAnimationFrame = currentAnimationFrame;
					object.sprite = sprite;
				});
			// maps[0].drawUpperImage(ctx, cameraPerson);
		});
	});

	return <Canvas height='198' width='352' ref={canvasRef} />;
});

export default GameCanvas;
