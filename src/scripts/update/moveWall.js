import nextPosition from '../calc/nextPosition';
import addWall from './addWall';
import removeWall from './removeWall';
const moveWall = (walls, wasX, wasY, direction) => {
	let state = { ...walls };
	state = removeWall(state, wasX, wasY);
	const { x, y } = nextPosition(wasX, wasY, direction);
	state = addWall(state, x, y);
	return state;
};

export default moveWall;
