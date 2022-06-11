import { curry } from 'ramda';
import startBehavior from './update/startBehavior';
import updatePosition from './update/updatePosition';
import updateSprite from './update/updateSprite';

const updatePerson = curry(
	(
		setEventState,
		updatedLayer,
		{
			gameObject: {
				x,
				y,
				sprite: {
					currentAnimation,
					currentAnimationFrame,
					animationFrameProgress,
					...spriteOtherArgs
				},
				movingProgressRemaining,
				...gameObjectOtherArgs
			},
			walls,
			arrow,
		},
	) => {
		const state = {
			gameObject: {
				...gameObjectOtherArgs,
				x,
				y,
				sprite: {
					currentAnimation,
					currentAnimationFrame,
					animationFrameProgress,
					...spriteOtherArgs,
				},
				movingProgressRemaining,
			},
			walls: { ...walls },
		};
		if (state.gameObject.movingProgressRemaining > 0) {
			const { x, y, movingProgressRemaining } = updatePosition(setEventState)(
				state.gameObject,
			);
			state.gameObject.x = x;
			state.gameObject.y = y;
			state.gameObject.movingProgressRemaining = movingProgressRemaining;
			return state;
		}

		if (
			!updatedLayer.isCutscenePlaying &&
			state.gameObject.isPlayerControlled &&
			arrow
		) {
			const { gameObject: updatedGameObject, walls: updatedWalls } =
				startBehavior(
					setEventState,
					{
						type: 'walk',
						direction: arrow,
					},
					state,
				);
			state.gameObject = updatedGameObject;
			state.walls = updatedWalls;
		}
		state.gameObject.sprite = updateSprite(state.gameObject);
		return state;
	},
);

export default updatePerson;
