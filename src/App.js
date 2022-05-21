import React from 'react';
import HomeCanvas from './components/HomeCanvas';
import Camera from './layouts/Camera';
import HomeSprite from './models/homeSprite';
import PlayerSprite from './models/playerSprite';

const playerImage = new Image();
playerImage.src = require('./assets/Heavy_Knight_Non-Combat_Animations.png');
const homeImage = new Image();
homeImage.src = require('./assets/home.png');

const App = () => {
	const homeBackgroundSprite = new HomeSprite({
		image: homeImage,
		position: {
			x: 0,
			y: 0,
		},
	});
	const homePlayerSprite = new PlayerSprite({
		image: playerImage,
		box: {
			w: 4,
			h: 31,
		},
		position: {
			x: 0,
			y: -20,
		},
	});

	window.addEventListener('keydown', (e) => {
		switch (e.key) {
			case 'w':
				homePlayerSprite.top();
				// homeBackgroundSprite.down();
				break;
			case 'a':
				homePlayerSprite.left();
				// homeBackgroundSprite.right();
				break;
			case 's':
				homePlayerSprite.down();
				// homeBackgroundSprite.top();
				break;
			case 'd':
				homePlayerSprite.right();
				// homeBackgroundSprite.left();
				break;
			default:
		}
	});
	return (
		<Camera>
			<HomeCanvas
				backgroundSprite={homeBackgroundSprite}
				playerSprite={homePlayerSprite}
			/>
		</Camera>
	);
};

export default App;
