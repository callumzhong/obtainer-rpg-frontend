import React, { useRef } from 'react';
import Canvas from '../modules/Canvas';
const homeImage = new Image();
homeImage.src = require('../assets/home.png');

const HomeCanvas = ({ playerSprite, backgroundSprite }) => {
	const canvasRef = useRef(null);
	const draw = (ctx) => {
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		backgroundSprite.draw(ctx, canvasRef);
		playerSprite.draw(ctx, canvasRef);
	};

	return <Canvas ref={canvasRef} draw={draw} />;
};

export default HomeCanvas;
