import asGridCoord from '../utils/asGridCoords';

const BLACKSMITH_BOUNDARIES = [
	{
		x: 8,
		y: 2,
	},
	{
		x: 9,
		y: 2,
	},
	{
		x: 10,
		y: 2,
	},
	{
		x: 11,
		y: 2,
	},
	{
		x: 12,
		y: 2,
	},
	{
		x: 13,
		y: 2,
	},
	{
		x: 14,
		y: 2,
	},
	{
		x: 15,
		y: 2,
	},
	{
		x: 16,
		y: 2,
	},
	{
		x: 4,
		y: 3,
	},
	{
		x: 5,
		y: 3,
	},
	{
		x: 6,
		y: 3,
	},
	{
		x: 7,
		y: 3,
	},
	{
		x: 17,
		y: 3,
	},
	{
		x: 1,
		y: 4,
	},
	{
		x: 2,
		y: 4,
	},
	{
		x: 3,
		y: 4,
	},
	{
		x: 7,
		y: 4,
	},
	{
		x: 16,
		y: 4,
	},
	{
		x: 0,
		y: 5,
	},
	{
		x: 7,
		y: 5,
	},
	{
		x: 8,
		y: 5,
	},
	{
		x: 9,
		y: 5,
	},
	{
		x: 11,
		y: 5,
	},
	{
		x: 12,
		y: 5,
	},
	{
		x: 13,
		y: 5,
	},
	{
		x: 14,
		y: 5,
	},
	{
		x: 15,
		y: 5,
	},
	{
		x: 16,
		y: 5,
	},
	{
		x: 1,
		y: 6,
	},
	{
		x: 5,
		y: 6,
	},
	{
		x: 6,
		y: 6,
	},
	{
		x: 7,
		y: 6,
	},
	{
		x: 17,
		y: 6,
	},
	{
		x: 1,
		y: 7,
	},
	{
		x: 5,
		y: 7,
	},
	{
		x: 6,
		y: 7,
	},
	{
		x: 7,
		y: 7,
	},
	{
		x: 16,
		y: 7,
	},
	{
		x: 1,
		y: 8,
	},
	{
		x: 5,
		y: 8,
	},
	{
		x: 16,
		y: 8,
	},
	{
		x: 1,
		y: 9,
	},
	{
		x: 7,
		y: 9,
	},
	{
		x: 8,
		y: 9,
	},
	{
		x: 9,
		y: 9,
	},
	{
		x: 10,
		y: 9,
	},
	{
		x: 14,
		y: 9,
	},
	{
		x: 15,
		y: 9,
	},
	{
		x: 16,
		y: 9,
	},
	{
		x: 1,
		y: 10,
	},
	{
		x: 5,
		y: 10,
	},
	{
		x: 6,
		y: 10,
	},
	{
		x: 11,
		y: 10,
	},
	{
		x: 13,
		y: 10,
	},
	{
		x: 2,
		y: 11,
	},
	{
		x: 5,
		y: 11,
	},
	{
		x: 12,
		y: 11,
	},
	{
		x: 2,
		y: 12,
	},
	{
		x: 5,
		y: 12,
	},
	{
		x: 3,
		y: 13,
	},
	{
		x: 4,
		y: 13,
	},
].reduce((obj, curr) => {
	const grid = asGridCoord(curr.x, curr.y);
	obj[grid] = true;
	return obj;
}, {});

export default BLACKSMITH_BOUNDARIES;
