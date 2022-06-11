import { compose, curry } from 'ramda';
import isSpaceTaken from '../calc/isSpaceTaken';
import moveWall from './moveWall';
import updateSprite from './updateSprite';
const standBehavior = curry(
	(setEventState, behavior, { gameObject, walls }) => {
		const state = {
			gameObject: {
				...gameObject,
				isStanding: gameObject.isStanding,
			},
			walls,
		};
		if (behavior.type === 'stand') {
			state.gameObject.isStanding = true;
			setTimeout(() => {
				setEventState({
					type: 'PersonStandComplete',
					whoId: state.gameObject.id,
				});
				state.gameObject.isStanding = false;
			}, behavior.time);
		}
		return state;
	},
);

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

const walkBehavior = curry((callback, setEventState, behavior, state) => {
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
					callback(setEventState, behavior, state);
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

const startBehavior = (setEvent, behavior, { gameObject, walls }) =>
	compose(
		standBehavior(setEvent, behavior),
		walkBehavior(startBehavior, setEvent, behavior),
		updateDirection(behavior),
	)({ gameObject, walls });

export default startBehavior;
