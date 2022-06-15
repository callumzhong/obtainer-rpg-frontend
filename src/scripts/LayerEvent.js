import emitter, { eventName } from '../emitter';
import oppositeDirection from '../utils/oppositeDirection';
class LayerEvent {
	constructor({ map, event }) {
		this.map = map;
		this.event = event;
	}

	stand(resolve) {
		const who = this.map.gameObjects[this.event.who];
		who.startBehavior(
			{
				map: this.map,
			},
			{
				type: 'stand',
				direction: this.event.direction,
				time: this.event.time,
			},
		);

		const completeHandler = (e) => {
			if (e.whoId === this.event.who) {
				emitter.off(eventName.stand, completeHandler);
				resolve();
			}
		};
		emitter.on(eventName.stand, completeHandler);
	}

	walk(resolve) {
		const who = this.map.gameObjects[this.event.who];
		who.startBehavior(
			{
				map: this.map,
			},
			{
				type: 'walk',
				direction: this.event.direction,
				retry: true,
			},
		);

		const completeHandler = (e) => {
			if (e.whoId === this.event.who) {
				emitter.off(eventName.walk, completeHandler);
				resolve();
			}
		};
		emitter.on(eventName.walk, completeHandler);
	}

	textMessage(resolve, setEventState) {
		if (this.event.faceHero) {
			const obj = this.map.gameObjects[this.event.faceHero];
			obj.direction = oppositeDirection(this.map.gameObjects['hero'].direction);
		}
		setEventState({
			type: 'textMessage',
			text: this.event.text,
			onComplete: () => {
				resolve();
				setEventState({});
			},
		});
	}

	// changeMap(resolve) {
	// 	const sceneTransition = new SceneTransition();
	// 	sceneTransition.init(document.querySelector('.game-container'), () => {
	// 		this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
	// 		resolve();

	// 		sceneTransition.fadeOut();
	// 	});
	// }

	init(setEventState) {
		return new Promise((resolve) => {
			this[this.event.type](resolve, setEventState);
		});
	}
}

export default LayerEvent;
