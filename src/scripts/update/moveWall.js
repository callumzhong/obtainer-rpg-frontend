import nextPosition from '../calc/nextPosition';
import addWall from './addWall';
import removeWall from './removeWall';
const moveWall = ({ ...walls }, wasX, wasY, direction) => {
	walls = removeWall(walls, wasX, wasY);
	const { x, y } = nextPosition(wasX, wasY, direction);
	walls = addWall(walls, x, y);
	return walls;
};

export default moveWall;
