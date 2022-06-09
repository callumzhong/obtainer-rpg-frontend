import React, { useRef } from 'react';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Canvas from '../modules/Canvas';

const GameCanvas = React.memo(({ map }) => {
	const canvasRef = useRef();
	useRequestAnimationFrame((time) => {
		//camera person (置中)
		const cameraPerson = map.gameObjects.hero;
		canvasRef.current.draw((ctx) => {
			//Draw Lower layer
			map.drawLowerImage(ctx, cameraPerson);

			//Draw Game Objects
			Object.values(map.gameObjects)
				.sort((a, b) => a.y - b.y)
				.forEach((object) => {
					object.sprite.draw(ctx, cameraPerson);
				});

			//Draw Upper layer
			// map.drawUpperImage(ctx, cameraPerson);
		});
	});

	return <Canvas height='198' width='352' ref={canvasRef} />;
});

export default GameCanvas;
