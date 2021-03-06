import emitter, { eventName } from '../../utils/emitter';
import oppositeDirection from '../calc/oppositeDirection';
import startBehavior from '../update/startBehavior';
const eventBox = {
	stand: (resolve, { sourceLayer, event }) => {
		const state = {
			gameObject: sourceLayer.gameObjects[event.who],
			walls: sourceLayer.walls,
		};
		const updated = startBehavior(
			{
				type: 'stand',
				direction: event.direction,
				time: event.time,
			},
			state,
		);
		sourceLayer.gameObjects[event.who] = updated.gameObject;
		sourceLayer.walls = updated.walls;

		const completeHandler = (e) => {
			if (e.whoId === event.who) {
				emitter.off(eventName.stand, completeHandler);
				resolve();
			}
		};
		emitter.on(eventName.stand, completeHandler);
	},
	walk: (resolve, { sourceLayer, event }) => {
		const state = {
			gameObject: sourceLayer.gameObjects[event.who],
			walls: sourceLayer.walls,
		};

		const updated = startBehavior(
			{
				type: 'walk',
				direction: event.direction,
				retry: true,
			},
			state,
		);

		sourceLayer.gameObjects[event.who] = updated.gameObject;
		sourceLayer.walls = updated.walls;

		const completeHandler = (e) => {
			if (e.whoId === event.who) {
				emitter.off(eventName.walk, completeHandler);
				resolve();
			}
		};
		emitter.on(eventName.walk, completeHandler);
	},
	textMessage: (resolve, { sourceLayer, event }) => {
		if (event.faceHero) {
			const obj = sourceLayer.gameObjects[event.faceHero];
			obj.direction = oppositeDirection(
				sourceLayer.gameObjects['hero'].direction,
			);
		}

		event.setEventState({
			type: 'textMessage',
			text: event.text,
			onComplete: () => {
				resolve();
				event.setEventState({});
			},
		});
	},
	changeMap: () => {},
};
/**
 * @param {object} sourceLayer 圖層資料 (依賴參考更新)
 */
const allocateEvent = (sourceLayer, event) =>
	new Promise((resolve) => {
		eventBox[event.type](resolve, { sourceLayer, event });
	});

export default allocateEvent;
