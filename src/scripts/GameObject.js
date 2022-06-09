import OverworldEvent from './OverworldEvent';
import Sprite from './Sprite';

class GameObject {
	/**
	 * @param x - canvas drawImage dx param
	 * @param y - canvas drawImage dx param
	 * @param src - image
	 * @param useShadow - useShadow 啟用陰影
	 */
	constructor(params) {
		this.id = null;
		this.isMounted = false;
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.direction = params.direction || 'down';
		this.sprite = new Sprite({
			gameObject: this,
			src: params.src,
			useShadow: params.useShadow,
		});
		this.behaviorLoop = params.behaviorLoop || [];
		this.behaviorLoopIndex = 0;
	}
	mount(map) {
		this.isMounted = true;
		map.addWall(this.x, this.y);

		// If we have a behavior, kick off after a short delay
		setTimeout(() => {
			this.doBehaviorEvent(map);
		}, 10);
	}
	update() {}
	async doBehaviorEvent(map) {
		//Don't do anything if there is a more important cutscene or I don't have config to do anything
		//anyway.
		if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
			return;
		}

		//Setting up our event with relevant info
		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id;

		//Create an event instance out of our next event config
		const eventHandler = new OverworldEvent({ map, event: eventConfig });
		await eventHandler.init();

		//Setting the next event to fire
		this.behaviorLoopIndex += 1;
		if (this.behaviorLoopIndex === this.behaviorLoop.length) {
			this.behaviorLoopIndex = 0;
		}

		//Do it again!
		this.doBehaviorEvent(map);
	}
}

export default GameObject;
