import { useEffect, useRef } from 'react';
import Canvas from '../modules/Canvas';

const GameCanvas = ({ map, directions }) => {
	const canvasRef = useRef();
	useEffect(() => {
		const timer = requestAnimationFrame(function animate() {
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

			requestAnimationFrame(animate);
		});
		return () => {
			cancelAnimationFrame(timer);
		};
	}, [map, directions]);

	return <Canvas height='198' width='352' ref={canvasRef} />;
};

export default GameCanvas;
