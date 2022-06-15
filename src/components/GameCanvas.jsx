import { useRef } from 'react';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Canvas from '../modules/Canvas';

const GameCanvas = ({ layer }) => {
	const canvasRef = useRef();
	useRequestAnimationFrame((time) => {
		//camera center
		const cameraPerson = layer.gameObjects.hero;
		canvasRef.current &&
			canvasRef.current.draw((ctx) => {
				layer.drawLowerImage(ctx, cameraPerson);

				Object.values(layer.gameObjects)
					.sort((a, b) => a.y - b.y)
					.forEach((object) => {
						object.sprite.draw(ctx, cameraPerson);
					});

				// layer.drawUpperImage(ctx, cameraPerson);
			});
	});

	return <Canvas height='198' width='352' ref={canvasRef} />;
};

export default GameCanvas;
