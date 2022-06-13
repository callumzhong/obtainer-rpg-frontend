import { compose, curry } from 'ramda';
import emitter, { eventName } from '../../utils/emitter';
import isSpaceTaken from '../calc/isSpaceTaken';
import moveWall from './moveWall';
import updateSprite from './updateSprite';
const standBehavior = curry((behavior, { gameObject, walls }) => {
	const state = {
		gameObject: {
			...gameObject,
			isStanding: gameObject.isStanding,
		},
		walls,
	};
	if (behavior.type === 'stand') {
		state.gameObject.isStanding = true;
		console.log(state);
		setTimeout(() => {
			emitter.emit(eventName.stand, {
				whoId: state.gameObject.id,
			});
			state.gameObject.isStanding = false;
		}, behavior.time);
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
		walls,
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
				setTimeout(() => {
					callback(behavior, state);
				}, 10);
			return state;
		}
		state = readyWalk(state);
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
