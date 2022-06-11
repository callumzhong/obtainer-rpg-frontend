import GameObject from './GameObject';

class Person extends GameObject {
	constructor(config) {
		super(config);
		this.movingProgressRemaining = config.movingProgressRemaining || 0;
		this.isPlayerControlled = config.isPlayerControlled || false;
		this.directionUpdate = {
			up: ['y', -1],
			down: ['y', 1],
			left: ['x', -1],
			right: ['x', 1],
		};
	}
}

export default Person;
