import { clone } from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import blacksmithLowerImage from '../assets/blacksmithLower.png';
import hero1Image from '../assets/hero1_16.png';
import GameCanvas from '../components/GameCanvas';
import BLACKSMITH_BOUNDARIES from '../data/blacksmithBoundaries';
import useKeyPressListener from '../hooks/useKeyPressListener';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Camera from '../layouts/Camera';
import LayerImage from '../models/LayerImage';
import LayerMap from '../models/LayerMap';
import Person from '../models/Person';
import withGrid from '../scripts/calc/withGrid';
import updatePerson from '../scripts/updatePerson';
const layer = new LayerMap({
	walls: BLACKSMITH_BOUNDARIES,
	gameObjects: {
		hero: new Person({
			x: withGrid(12),
			y: withGrid(6),
			isPlayerControlled: true,
		}),
		npc1: new Person({
			x: withGrid(3),
			y: withGrid(6),
			behaviorLoop: [
				// { type: 'walk', direction: 'up' },
				// { type: 'walk', direction: 'down' },
				{ type: 'stand', direction: 'left', time: 800 },
				{ type: 'stand', direction: 'up', time: 800 },
				{ type: 'stand', direction: 'right', time: 1200 },
				{ type: 'stand', direction: 'up', time: 300 },
			],
		}),
	},
});

Object.freeze(layer);
const updatedLayer = {
	gameObjects: {},
	walls: {},
	isCutscenePlaying: false,
	cutsceneSpaces: {},
};

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
	const [eventState, setEventState] = useState({});
	const directions = useKeyPressListener({});
	const updateHandler = useCallback(
		(time) => {
			if (!isMounted) return;
			let { gameObjects, walls, isCutscenePlaying } = updatedLayer;
			const { walls: updatedWalls, gameObjects: updatedGameObjects } =
				updatePerson(isCutscenePlaying, directions[0], {
					gameObjects,
					walls,
				});
			gameObjects = updatedGameObjects;
			walls = updatedWalls;
		},
		[directions],
	);
	useRequestAnimationFrame(updateHandler);

	useEffect(() => {
		if (isMounted === true) return;
		const deepLayer = clone(layer);
		Object.keys(updatedLayer).forEach(
			(key) => (updatedLayer[key] = deepLayer[key]),
		);

		// build ID
		Object.keys(updatedLayer.gameObjects).forEach((key) => {
			const object = updatedLayer.gameObjects[key];
			object.id = key;
		});
		isMounted = true;
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<Camera>
			<GameCanvas layer={updatedLayer} layerImage={layerImageState} />
		</Camera>
	);
};

export default BlacksmithPage;
