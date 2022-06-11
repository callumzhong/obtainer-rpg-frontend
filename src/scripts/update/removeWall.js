const removeWall = (walls, x, y) => {
	const state = {
		...walls,
	};
	delete state[`${x},${y}`];
	return state;
};

export default removeWall;
