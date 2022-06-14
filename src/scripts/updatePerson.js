import { curry, ifElse } from 'ramda';
import startBehavior from './update/startBehavior';
import updatePosition from './update/updatePosition';
import updateSprite from './update/updateSprite';

const stillMoving = ({
	gameObject: { x, y, movingProgressRemaining, ...gameObjectOtherArgs },
	walls,
}) => {
	const state = {
		gameObject: {
			x,
			y,
			movingProgressRemaining,
			...gameObjectOtherArgs,
		},
		walls,
	};
	const updated = updatePosition(state.gameObject);
	state.gameObject.x = updated.x;
	state.gameObject.y = updated.y;
	state.gameObject.movingProgressRemaining = updated.movingProgressRemaining;
	return state;
};

const changeMoveDirection = curry(
	(
		isCutscenePlaying,
		arrow,
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
			walls: { ...walls },
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
			walls: walls,
		};

		if (!isCutscenePlaying && state.gameObject.isPlayerControlled && arrow) {
			const { gameObject: updatedGameObject, walls: updatedWalls } =
				startBehavior(
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

const isMoving = ({ gameObject }) => gameObject.movingProgressRemaining > 0;

const updatePerson = (isCutscenePlaying, arrow, { gameObjects, walls }) =>
	Object.keys(gameObjects).reduce(
		(obj, key) => {
			const _ = ifElse(
				isMoving,
				stillMoving,
				changeMoveDirection(isCutscenePlaying, arrow),
			)({ gameObject: obj.gameObjects[key], walls: obj.walls });

			obj.gameObjects[key] = _.gameObject;
			obj.walls = _.walls;
			return obj;
		},
		{
			gameObjects: gameObjects,
			walls: { ...walls },
		},
	);

export default updatePerson;
