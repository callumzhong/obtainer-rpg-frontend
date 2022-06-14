import { compose, curry } from 'ramda';
import emitter, { eventName } from '../../utils/emitter';
import isSpaceTaken from '../calc/isSpaceTaken';
import moveWall from './moveWall';
import updateSprite from './updateSprite';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const standBehavior = curry((behavior, { gameObject, walls }) => {
	const state = {
		gameObject: {
			...gameObject,
			isStanding: gameObject.isStanding,
		},
		walls,
	};
	if (behavior.type === 'stand') {
		sleep(behavior.time).then((_) => {
			state.gameObject.isStanding = true;
			emitter.emit(eventName.stand, {
				whoId: state.gameObject.id,
			});
			state.gameObject.isStanding = false;
		});
	}
	return state;
});

const readyWalk = ({ gameObject, walls }) => {
	const state = {
		gameObject: {
			...gameObject,
			movingProgressRemaining: 16,
		},
		walls: {
			...walls,
		},
	};
	//Ready to walk!
	state.walls = moveWall(
		state.walls,
		gameObject.x,
		gameObject.y,
		gameObject.direction,
	);

	state.gameObject.sprite = updateSprite(state.gameObject);
	return state;
};

const walkBehavior = curry((callback, behavior, state) => {
	if (behavior.type === 'walk') {
		if (
			isSpaceTaken(
				state.walls,
				state.gameObject.x,
				state.gameObject.y,
				state.gameObject.direction,
			)
		) {
			behavior.retry &&
				sleep(10).then((_) => {
					callback(behavior, state);
				});
			return state;
		}
		return readyWalk(state);
	}
	return state;
});

const updateDirection = curry((behavior, { gameObject, walls }) => {
	return {
		gameObject: {
			...gameObject,
			direction: behavior.direction,
		},
		walls,
	};
});

const startBehavior = (behavior, { gameObject, walls }) =>
	compose(
		standBehavior(behavior),
		walkBehavior(startBehavior, behavior),
		updateDirection(behavior),
	)({ gameObject, walls });

export default startBehavior;
