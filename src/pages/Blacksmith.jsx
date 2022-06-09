import blacksmithLowerImage from '../assets/blacksmithLower.png';
import hero1Image from '../assets/hero1_16.png';
import GameCanvas from '../components/GameCanvas';
import BLACKSMITH_BOUNDARIES from '../data/blacksmithBoundaries';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Camera from '../layouts/Camera';
import OverworldMap from '../scripts/OverworldMap';
import Person from '../scripts/Person';
import withGrid from '../utils/withGrid';

const map = new OverworldMap({
	lowerSrc: blacksmithLowerImage,
	// upperSrc: mapLowerImage,
	gameObjects: {
		hero: new Person({
			x: withGrid(12),
			y: withGrid(8),
			src: hero1Image,
			isPlayerControlled: true,
		}),
	},
	walls: {
		...BLACKSMITH_BOUNDARIES,
	},
});

const BlacksmithPage = ({ directions, isKeyDown }) => {
	useRequestAnimationFrame((time) => {
		// update all objects
		Object.values(map.gameObjects).forEach((object) => {
			object.update({
				arrow: directions[0],
				map: map,
			});
		});
	});

	return (
		<Camera>
			<GameCanvas map={map} directions={directions} />
		</Camera>
	);
};

export default BlacksmithPage;
