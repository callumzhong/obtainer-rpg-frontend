const addWall = ({ ...walls }, x, y) => {
	walls[`${x},${y}`] = true;
	return walls;
};

export default addWall;
