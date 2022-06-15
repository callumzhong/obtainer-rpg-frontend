import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/characters/people/hero.png';
import blacksmithLowerImage from '../assets/images/map/blacksmithLower.png';
import Conversation from '../components/Conversation/Conversation';
import GameCanvas from '../components/GameCanvas';
import BLACKSMITH_BOUNDARIES from '../data/blacksmithBoundaries';
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
	lowerSrc: blacksmithLowerImage,
	gameObjects: {
		hero: new Person({
			isPlayerControlled: true,
			x: withGrid(12),
			y: withGrid(6),
		}),
		npc1: new Person({
			x: withGrid(15),
			y: withGrid(6),
			src: heroImage,
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
	walls: { ...BLACKSMITH_BOUNDARIES },
	cutsceneSpaces: {
		[asGridCoord(12, 9)]: [
			{
				events: [{ type: 'changeMap', map: 'village' }],
			},
		],
	},
});

const BlacksmithPage = () => {
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
			{eventState.type === 'textMessage' && <Conversation event={eventState} />}
		</>
	);
};

export default BlacksmithPage;
