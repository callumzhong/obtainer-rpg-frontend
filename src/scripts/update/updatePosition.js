import emitter, { eventName } from '../../utils/emitter';
const updatePosition = ({
	x,
	y,
	directionUpdate,
	direction,
	movingProgressRemaining,
	id,
}) => {
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
		emitter.emit(eventName.walk, { whoId: id });
	}
	return state;
};

export default updatePosition;
