import { curry } from 'ramda';
import emitter, { eventName } from '../../utils/emitter';
import startBehavior from '../update/startBehavior';
const eventBox = {
	stand: curry(
		(
			resolve,
			_,
			{
				state: {
					gameObjects,
					walls: { ...walls },
				},
				event,
			},
		) => {
			const state = {
				gameObject: gameObjects[event.who],
				walls,
			};
			const updated = startBehavior(
				{
					type: 'stand',
					direction: event.direction,
					time: event.time,
				},
				{
					gameObject: state.gameObject,
					walls: state.walls,
				},
			);

			const completeHandler = (e) => {
				console.log(e);
				if (e.whoId === event.who) {
					emitter.off(eventName.stand, completeHandler);
					state.gameObject = updated.gameObject;
					state.walls = updated.walls;
					resolve(state);
				}
			};
			emitter.on(eventName.stand, completeHandler);
		},
	),
	walk: curry((resolve, _, { state, event }) => {
		const gameObject = state.gameObjects[event.who];
		const updated = startBehavior(
			{
				type: 'walk',
				direction: event.direction,
				retry: true,
			},
			{
				gameObject,
				walls: { ...state.walls },
			},
		);

		const completeHandler = (e) => {
			if (e.whoId === event.who) {
				emitter.off(eventName.walk, completeHandler);
				state.gameObjects[updated.gameObject.id] = updated.gameObject;
				state.walls = updated.walls;
				resolve(state);
			}
		};
		emitter.on(eventName.walk, completeHandler);
	}),
	textMessage: () => {},
	changeMap: () => {},
};

const allocateEvent = (setEventState, { state, event }) => {
	return new Promise((resolve) => {
		eventBox[event.type](resolve, setEventState)({ state, event });
	});
};

export default allocateEvent;
