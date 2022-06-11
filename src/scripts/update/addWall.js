const addWall = (walls, x, y) => {
	const state = {
		...walls,
	};
	state[`${x},${y}`] = true;
	return state;
};

export default addWall;
