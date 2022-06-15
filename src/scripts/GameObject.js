import heroImage from '../assets/images/characters/people/hero.png';
import LayerEvent from './LayerEvent';
import Sprite from './Sprite';

class GameObject {
	constructor(config) {
		this.id = null;
		this.isMounted = false;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.direction = config.direction || 'down';
		this.sprite = new Sprite({
			gameObject: this,
			src: config.src || heroImage,
		});

		this.behaviorLoop = config.behaviorLoop || [];
		this.behaviorLoopIndex = 0;

		this.talking = config.talking || [];
	}

	mount(map, setEventState) {
		this.isMounted = true;
		map.addWall(this.x, this.y);

		//If we have a behavior, kick off after a short delay
		setTimeout(() => {
			this.doBehaviorEvent(map, setEventState);
		}, 10);
	}

	async doBehaviorEvent(map, setEventState) {
		if (
			map.isCutscenePlaying ||
			this.behaviorLoop.length === 0 ||
			this.isStanding
		) {
			return;
		}

		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id;

		const eventHandler = new LayerEvent({ map, event: eventConfig });
		await eventHandler.init(setEventState);

		this.behaviorLoopIndex += 1;
		if (this.behaviorLoopIndex === this.behaviorLoop.length) {
			this.behaviorLoopIndex = 0;
		}

		this.doBehaviorEvent(map, setEventState);
	}
}

export default GameObject;
