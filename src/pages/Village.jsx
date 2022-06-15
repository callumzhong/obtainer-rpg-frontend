import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import villageLowerImage from '../assets/images/map/villageLower.png';
import GameCanvas from '../components/GameCanvas';
import VILLAGE_BOUNDARIES from '../data/villageBoundaries';
import emitter, { eventName } from '../emitter';
import useKeyPressDirectionListener from '../hooks/useKeyPressDirectionListener';
import useKeyPressDownListener from '../hooks/useKeyPressDownListener';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import Camera from '../layouts/Camera';
import LayerMap from '../scripts/LayerMap';
import Person from '../scripts/Person';
import asGridCoord from '../utils/asGridCoords';
import withGrid from '../utils/withGrid';

const layer = new LayerMap({
	lowerSrc: villageLowerImage,
	gameObjects: {
		hero: new Person({
			isPlayerControlled: true,
			x: withGrid(37),
			y: withGrid(23),
		}),
	},
	walls: { ...VILLAGE_BOUNDARIES },
	cutsceneSpaces: {
		[asGridCoord(24, 24)]: [
			{
				events: [{ type: 'changeMap', map: '/' }],
			},
		],
	},
});

const VillagePage = () => {
	const navigate = useNavigate();
	const [eventState, setEventState] = useState({
		type: '',
		text: '',
		onComplete: () => {},
	});
	const directions = useKeyPressDirectionListener();
	const updateHandler = useCallback(
		(time) => {
			Object.values(layer.gameObjects).forEach((object) => {
				object.update({
					arrow: directions[0],
					map: layer,
				});
			});
		},
		[directions],
	);

	const bindHeroPositionCheck = useCallback(
		(e) => {
			if (e.whoId === 'hero') {
				layer.checkForFootstepCutscene(setEventState, navigate);
			}
		},
		[navigate],
	);

	const bindActionInput = useCallback(() => {
		layer.checkForActionCutscene(setEventState, navigate);
	}, [navigate]);

	useKeyPressDownListener('Enter', bindActionInput);
	useRequestAnimationFrame(updateHandler);
	useEffect(() => {
		layer.route = 'blacksmith';
		layer.mountObjects(setEventState);
		emitter.on(eventName.walk, bindHeroPositionCheck);
		return () => {
			emitter.off(eventName.walk, bindHeroPositionCheck);
		};
	}, [bindHeroPositionCheck]);

	return (
		<>
			<Camera>
				<GameCanvas layer={layer} />
			</Camera>
			{/* {eventState.type === 'textMessage' && <Conversation event={eventState} />} */}
		</>
	);
};

export default VillagePage;
