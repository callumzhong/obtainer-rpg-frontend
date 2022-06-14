import { useCallback, useEffect, useState } from 'react';
import blacksmithLowerImage from '../assets/blacksmithLower.png';
import hero1Image from '../assets/hero1_16.png';
import Conversation from '../components/Conversation/Conversation';
import GameCanvas from '../components/GameCanvas';
import BLACKSMITH_BOUNDARIES from '../data/blacksmithBoundaries';
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

const layer = new LayerMap({
	walls: { ...BLACKSMITH_BOUNDARIES },
	gameObjects: {
		hero: new Person({
			x: withGrid(12),
			y: withGrid(6),
			isPlayerControlled: true,
		}),
		npc1: new Person({
			x: withGrid(3),
			y: withGrid(6),
			talking: [
				{
					events: [
						{ type: 'textMessage', text: "I'm busy...", faceHero: 'npc1' },
						{ type: 'textMessage', text: 'Go away!' },
						{ who: 'hero', type: 'walk', direction: 'right' },
					],
				},
			],
		}),
	},
});

let isMounted = false;
const BlacksmithPage = () => {
	const [layerImageState, setLayerImageState] = useState(
		new LayerImage({
			lowerSrc: blacksmithLowerImage,
			gameObjects: {
				hero: {
					imageSrc: hero1Image,
				},
				npc1: {
					imageSrc: hero1Image,
				},
			},
		}),
	);
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
				<GameCanvas layer={layer} layerImage={layerImageState} />
			</Camera>
			{eventState.type === 'textMessage' && <Conversation event={eventState} />}
		</>
	);
};

export default BlacksmithPage;
