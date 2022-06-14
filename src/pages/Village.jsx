import { useCallback, useEffect, useState } from 'react';
import hero1Image from '../assets/hero1_16.png';
import plaqueImage from '../assets/plaque.png';
import villageImage from '../assets/village.png';
import Conversation from '../components/Conversation/Conversation';
import GameCanvas from '../components/GameCanvas';
import VILLAGE_BOUNDARIES from '../data/villageBoundaries';
import useKeyPressDirectionListener from '../hooks/useKeyPressDirectionListener';
import useKeyPressDownListener from '../hooks/useKeyPressDownListener';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Camera from '../layouts/Camera';
import LayerImage from '../models/LayerImage';
import LayerMap from '../models/LayerMap';
import Person from '../models/Person';
import withGrid from '../scripts/calc/withGrid';
import checkForActionCutscene from '../scripts/checkForActionCutscene';
import mountEventLoop from '../scripts/mountEventLoop';
import addWall from '../scripts/update/addWall';
import updatePerson from '../scripts/updatePerson';
const layerImage = new LayerImage({
	lowerSrc: villageImage,
	uppers: {
		plaque: {
			imageSrc: plaqueImage,
			x: withGrid(36),
			y: withGrid(20),
		},
	},
	gameObjects: {
		hero: {
			imageSrc: hero1Image,
		},
		npc1: {
			imageSrc: hero1Image,
		},
	},
});

const layer = new LayerMap({
	walls: {
		...VILLAGE_BOUNDARIES,
	},
	gameObjects: {
		hero: new Person({
			x: withGrid(24),
			y: withGrid(25),
			isPlayerControlled: true,
		}),
		npc1: new Person({
			x: withGrid(15),
			y: withGrid(6),
			direction: 'up',
			talking: [
				{
					events: [
						{ type: 'textMessage', text: "I'm busy...", faceHero: 'npc1' },
						{ type: 'textMessage', text: 'Go away!' },
						{ who: 'npc1', type: 'stand', direction: 'up', time: 200 },
					],
				},
			],
		}),
	},
});

let isMounted = false;
const VillagePage = () => {
	const [eventState, setEventState] = useState({
		type: '',
		text: '',
		onComplete: () => {},
	});
	const directions = useKeyPressDirectionListener();
	const updateHandler = useCallback(
		(time) => {
			if (!isMounted) return;
			let { gameObjects, walls, isCutscenePlaying } = layer;
			const { walls: updatedWalls, gameObjects: updatedGameObjects } =
				updatePerson(isCutscenePlaying, directions[0], {
					gameObjects,
					walls,
				});
			layer.gameObjects = updatedGameObjects;
			layer.walls = updatedWalls;
		},
		[directions],
	);
	useKeyPressDownListener('Enter', () => {
		checkForActionCutscene(setEventState, layer);
		if (eventState.type === 'textMessage') {
			eventState.onComplete();
		}
	});
	useRequestAnimationFrame(updateHandler);
	useEffect(() => {
		if (isMounted === true) return;
		// build ID
		Object.keys(layer.gameObjects).forEach((key) => {
			const object = layer.gameObjects[key];
			object.id = key;
			layer.walls = addWall({ ...layer.walls }, object.x, object.y);
			mountEventLoop(layer, object);
		});

		isMounted = true;
	}, []);

	return (
		<>
			<Camera>
				<GameCanvas layer={layer} layerImage={layerImage} />
			</Camera>
			{eventState.type === 'textMessage' && <Conversation event={eventState} />}
		</>
	);
};

export default VillagePage;
