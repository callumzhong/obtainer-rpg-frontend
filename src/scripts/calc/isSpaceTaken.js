import nextPosition from '../calc/nextPosition';

const isSpaceTaken = (walls, currentX, currentY, direction) => {
	const { x, y } = nextPosition(currentX, currentY, direction);
	return walls[`${x},${y}`] || false;
};

export default isSpaceTaken;
