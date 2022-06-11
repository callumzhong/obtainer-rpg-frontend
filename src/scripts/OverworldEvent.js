import oppositeDirection from '../utils/oppositeDirection';

class OverworldEvent {
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

		//Set up a handler to complete when correct person is done walking, then resolve the event
		const completeHandler = (e) => {
			if (e.detail.whoId === this.event.who) {
				document.removeEventListener('PersonStandComplete', completeHandler);
				resolve();
			}
		};
		document.addEventListener('PersonStandComplete', completeHandler);
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

		//Set up a handler to complete when correct person is done walking, then resolve the event
		const completeHandler = (e) => {
			if (e.detail.whoId === this.event.who) {
				document.removeEventListener('PersonWalkingComplete', completeHandler);
				resolve();
			}
		};
		document.addEventListener('PersonWalkingComplete', completeHandler);
	}

	textMessage(resolve, callback) {
		if (this.event.faceHero) {
			const obj = this.map.gameObjects[this.event.faceHero];
			obj.direction = oppositeDirection(this.map.gameObjects['hero'].direction);
		}
		callback({
			type: 'textMessage',
			content: this.event.text,
			onComplete: (setState) => {
				setState({});
				return resolve();
			},
		});
	}

	init(callback) {
		return new Promise((resolve) => {
			this[this.event.type](resolve, callback);
		});
	}
}

export default OverworldEvent;
