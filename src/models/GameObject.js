import Sprite from './Sprite';

class GameObject {
	constructor(config) {
		this.id = config.id || null;
		this.isMounted = config.isMounted || false;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.direction = config.direction || 'down';
		this.sprite = new Sprite(config);
		this.behaviorLoop = config.behaviorLoop || [];
		this.behaviorLoopIndex = config.behaviorLoopIndex || 0;

		this.talking = config.talking || [];
	}
}

export default GameObject;
