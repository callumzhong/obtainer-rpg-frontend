import React, { useRef } from 'react';
import homeCollision from '../data/homeCollision';
import Boundary from '../models/boundary';
import HomeSprite from '../models/homeSprite';
import PlayerSprite from '../models/playerSprite';
import Canvas from '../modules/Canvas';

const playerImage = new Image();
playerImage.src = require('../assets/Heavy_Knight_Non-Combat_Animations.png');
const homeImage = new Image();
homeImage.src = require('../assets/home.png');

homeImage.style = 'transform: scale(5)';

const backgroundSprite = new HomeSprite({
	image: homeImage,
	position: {
		x: 0,
		y: 0,
	},
});
const playerSprite = new PlayerSprite({
	image: playerImage,
	scale: {
		w: 4,
		h: 31,
	},
	position: {
		x: 0,
		y: -20,
	},
});

const collisionsMap = [];
for (let i = 0; i < homeCollision.length; i += 70) {
	collisionsMap.push(homeCollision.slice(i, 70 + i));
}
const boundaries = [];
collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol === 5217) {
			boundaries.push(
				new Boundary({
					position: {
						x: j * 16,
						y: i * 16,
					},
				}),
			);
		}
	});
});

const HomePage = ({ animations }) => {
	const canvasRef = useRef(null);
	const draw = (ctx) => {
		/** init start */
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		backgroundSprite.draw(ctx, canvasRef);
		boundaries.forEach((boundary) => {
			boundary.draw(ctx, canvasRef);
		});
		playerSprite.draw(ctx, canvasRef);
		if (animations.length > 0) {
			backgroundSprite[animations[0]]();
			playerSprite[animations[0]]();
		}

		requestAnimationFrame(() => {
			draw(ctx);
		});
	};
	return <Canvas ref={canvasRef} draw={draw} />;
};

export default HomePage;
