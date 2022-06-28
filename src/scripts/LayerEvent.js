import emitter, { eventName } from 'emitter';
import oppositeDirection from 'utils/oppositeDirection';
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

	conversation(resolve, setEventState) {
		if (this.event.faceHero) {
			const obj = this.map.gameObjects[this.event.faceHero];
			obj.direction = oppositeDirection(this.map.gameObjects['hero'].direction);
		}
		setEventState({
			type: this.event.type,
			element: this.event.element,
			onComplete: () => {
				resolve();
				setEventState({});
			},
		});
	}

	changeMap(resolve, _, navigate) {
		navigate(this.event.map, { replace: true });
		resolve();
	}

	init(setEventState, navigate) {
		return new Promise((resolve) => {
			this[this.event.type](resolve, setEventState, navigate);
		});
	}
}

export default LayerEvent;
