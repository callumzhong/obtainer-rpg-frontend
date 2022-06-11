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
			y: withGrid(8),
			isPlayerControlled: true,
		}),
	},
});

Object.freeze(layer);
const updatedLayer = {};
let isMounted = false;
const BlacksmithPage = () => {
	const [layerImageState, setLayerImageState] = useState(
		new LayerImage({
			lowerSrc: blacksmithLowerImage,
			gameObjects: {
				hero: {
					imageSrc: hero1Image,
				},
			},
		}),
	);
	const [eventState, setEventState] = useState({});
	const directions = useKeyPressListener({});
	const updateHandler = useCallback(
		(state) => updatePerson(setEventState, updatedLayer)(state),
		[],
	);
	const animateHandler = useCallback(
		(time) => {
			if (!isMounted) return;
			let { gameObjects, walls } = updatedLayer;
			// update all objects;
			Object.values(gameObjects).forEach((object) => {
				const { gameObject: updatedGameObject, walls: updatedWalls } =
					updateHandler({
						arrow: directions[0],
						gameObject: object,
						walls: walls,
					});
				gameObjects[updatedGameObject.id] = updatedGameObject;
				walls = updatedWalls;
			});
		},
		[directions, updateHandler],
	);
	useRequestAnimationFrame(animateHandler);

	useEffect(() => {
		if (isMounted === true) return;
		const deepObj = clone(layer);
		updatedLayer.walls = deepObj.walls;
		updatedLayer.gameObjects = deepObj.gameObjects;
		updatedLayer.cutsceneSpaces = deepObj.cutsceneSpaces;
		updatedLayer.isCutscenePlaying = deepObj.isCutscenePlaying;

		// build ID
		Object.keys(updatedLayer.gameObjects).forEach((key) => {
			let object = updatedLayer.gameObjects[key];
			object.id = key;
		});
		isMounted = true;
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			<Camera>
				<GameCanvas layer={updatedLayer} layerImage={layerImageState} />
			</Camera>
			{/* {event.type === 'textMessage' && (
				<Conversation content={event.content} onComplete={event.onComplete} />
			)} */}
		</>
	);
};

export default BlacksmithPage;
