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
import doBehaviorEvent from '../scripts/event/doBehaviorEvent';
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
			behaviorLoop: [
				{ type: 'walk', direction: 'up' },
				{ type: 'walk', direction: 'left' },
				{ type: 'walk', direction: 'down' },
				{ type: 'stand', direction: 'down', time: 5000 },
				{ type: 'walk', direction: 'right' },
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

const mountEventLoop = (layer, gameObject) => {
	setTimeout(() => {
		doBehaviorEvent(layer, gameObject);
	}, 10);
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
			updatedLayer.gameObjects = updatedGameObjects;
			updatedLayer.walls = updatedWalls;
		},
		[directions],
	);
	useRequestAnimationFrame(updateHandler);
	useEffect(() => {
		if (isMounted === true) return;
		const deepLayer = clone(layer);
		Object.keys(layer).reduce((obj, key) => {
			obj[key] = deepLayer[key];
			return obj;
		}, updatedLayer);
		// build ID
		Object.keys(updatedLayer.gameObjects).forEach((key) => {
			const object = updatedLayer.gameObjects[key];
			object.id = key;
			updatedLayer.walls = addWall(
				{ ...updatedLayer.walls },
				object.x,
				object.y,
			);
			mountEventLoop(updatedLayer, object);
		});

		isMounted = true;
	}, []);

	return (
		<Camera>
			<GameCanvas layer={updatedLayer} layerImage={layerImageState} />
		</Camera>
	);
};

export default BlacksmithPage;
