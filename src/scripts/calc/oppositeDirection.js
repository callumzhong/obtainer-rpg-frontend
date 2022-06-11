const oppositeDirection = (direction) => {
	if (direction === 'left') {
		return 'right';
	}
	if (direction === 'right') {
		return 'left';
	}
	if (direction === 'up') {
		return 'down';
	}
	return 'up';
};

export default oppositeDirection;
