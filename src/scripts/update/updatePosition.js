import { curry } from 'ramda';
const updatePosition = curry(
	(
		setEventStateCallBack,
		{ x, y, directionUpdate, direction, movingProgressRemaining, id },
	) => {
		const state = {
			x,
			y,
			movingProgressRemaining,
		};
		const [property, change] = directionUpdate[direction];
		state[property] += change;
		state.movingProgressRemaining -= 1;
		if (state.movingProgressRemaining === 0) {
			//We finished the walk!
			setEventStateCallBack({
				type: 'personWalkingComplete',
				id,
			});
		}
		return state;
	},
);

export default updatePosition;
