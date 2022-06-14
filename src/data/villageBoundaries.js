import asGridCoord from '../scripts/calc/asGridCoords';
const VILLAGE_BOUNDARIES = [
	{
		x: 23,
		y: 19,
	},
	{
		x: 24,
		y: 19,
	},
	{
		x: 25,
		y: 19,
	},
	{
		x: 26,
		y: 19,
	},
	{
		x: 27,
		y: 19,
	},
	{
		x: 28,
		y: 19,
	},
	{
		x: 29,
		y: 19,
	},
	{
		x: 30,
		y: 19,
	},
	{
		x: 31,
		y: 19,
	},
	{
		x: 32,
		y: 19,
	},
	{
		x: 33,
		y: 19,
	},
	{
		x: 34,
		y: 19,
	},
	{
		x: 35,
		y: 19,
	},
	{
		x: 36,
		y: 19,
	},
	{
		x: 37,
		y: 19,
	},
	{
		x: 38,
		y: 19,
	},
	{
		x: 39,
		y: 19,
	},
	{
		x: 40,
		y: 19,
	},
	{
		x: 25,
		y: 20,
	},
	{
		x: 33,
		y: 20,
	},
	{
		x: 35,
		y: 20,
	},
	{
		x: 39,
		y: 20,
	},
	{
		x: 41,
		y: 20,
	},
	{
		x: 25,
		y: 21,
	},
	{
		x: 30,
		y: 21,
	},
	{
		x: 31,
		y: 21,
	},
	{
		x: 32,
		y: 21,
	},
	{
		x: 33,
		y: 21,
	},
	{
		x: 35,
		y: 21,
	},
	{
		x: 39,
		y: 21,
	},
	{
		x: 41,
		y: 21,
	},
	{
		x: 21,
		y: 22,
	},
	{
		x: 22,
		y: 22,
	},
	{
		x: 25,
		y: 22,
	},
	{
		x: 26,
		y: 22,
	},
	{
		x: 29,
		y: 22,
	},
	{
		x: 33,
		y: 22,
	},
	{
		x: 34,
		y: 22,
	},
	{
		x: 35,
		y: 22,
	},
	{
		x: 39,
		y: 22,
	},
	{
		x: 41,
		y: 22,
	},
	{
		x: 20,
		y: 23,
	},
	{
		x: 23,
		y: 23,
	},
	{
		x: 24,
		y: 23,
	},
	{
		x: 25,
		y: 23,
	},
	{
		x: 29,
		y: 23,
	},
	{
		x: 33,
		y: 23,
	},
	{
		x: 34,
		y: 23,
	},
	{
		x: 41,
		y: 23,
	},
	{
		x: 19,
		y: 24,
	},
	{
		x: 20,
		y: 24,
	},
	{
		x: 23,
		y: 24,
	},
	{
		x: 25,
		y: 24,
	},
	{
		x: 27,
		y: 24,
	},
	{
		x: 29,
		y: 24,
	},
	{
		x: 33,
		y: 24,
	},
	{
		x: 35,
		y: 24,
	},
	{
		x: 39,
		y: 24,
	},
	{
		x: 41,
		y: 24,
	},
	{
		x: 18,
		y: 25,
	},
	{
		x: 27,
		y: 25,
	},
	{
		x: 28,
		y: 25,
	},
	{
		x: 29,
		y: 25,
	},
	{
		x: 30,
		y: 25,
	},
	{
		x: 31,
		y: 25,
	},
	{
		x: 33,
		y: 25,
	},
	{
		x: 35,
		y: 25,
	},
	{
		x: 39,
		y: 25,
	},
	{
		x: 41,
		y: 25,
	},
	{
		x: 19,
		y: 26,
	},
	{
		x: 20,
		y: 26,
	},
	{
		x: 21,
		y: 26,
	},
	{
		x: 27,
		y: 26,
	},
	{
		x: 31,
		y: 26,
	},
	{
		x: 33,
		y: 26,
	},
	{
		x: 41,
		y: 26,
	},
	{
		x: 20,
		y: 27,
	},
	{
		x: 21,
		y: 27,
	},
	{
		x: 22,
		y: 27,
	},
	{
		x: 23,
		y: 27,
	},
	{
		x: 25,
		y: 27,
	},
	{
		x: 26,
		y: 27,
	},
	{
		x: 27,
		y: 27,
	},
	{
		x: 31,
		y: 27,
	},
	{
		x: 33,
		y: 27,
	},
	{
		x: 41,
		y: 27,
	},
	{
		x: 20,
		y: 28,
	},
	{
		x: 31,
		y: 28,
	},
	{
		x: 33,
		y: 28,
	},
	{
		x: 35,
		y: 28,
	},
	{
		x: 39,
		y: 28,
	},
	{
		x: 41,
		y: 28,
	},
	{
		x: 21,
		y: 29,
	},
	{
		x: 30,
		y: 29,
	},
	{
		x: 31,
		y: 29,
	},
	{
		x: 33,
		y: 29,
	},
	{
		x: 35,
		y: 29,
	},
	{
		x: 39,
		y: 29,
	},
	{
		x: 41,
		y: 29,
	},
	{
		x: 21,
		y: 30,
	},
	{
		x: 24,
		y: 30,
	},
	{
		x: 25,
		y: 30,
	},
	{
		x: 26,
		y: 30,
	},
	{
		x: 41,
		y: 30,
	},
	{
		x: 21,
		y: 31,
	},
	{
		x: 24,
		y: 31,
	},
	{
		x: 26,
		y: 31,
	},
	{
		x: 41,
		y: 31,
	},
	{
		x: 21,
		y: 32,
	},
	{
		x: 24,
		y: 32,
	},
	{
		x: 26,
		y: 32,
	},
	{
		x: 35,
		y: 32,
	},
	{
		x: 39,
		y: 32,
	},
	{
		x: 41,
		y: 32,
	},
	{
		x: 21,
		y: 33,
	},
	{
		x: 24,
		y: 33,
	},
	{
		x: 26,
		y: 33,
	},
	{
		x: 35,
		y: 33,
	},
	{
		x: 39,
		y: 33,
	},
	{
		x: 41,
		y: 33,
	},
	{
		x: 22,
		y: 34,
	},
	{
		x: 24,
		y: 34,
	},
	{
		x: 26,
		y: 34,
	},
	{
		x: 41,
		y: 34,
	},
	{
		x: 22,
		y: 35,
	},
	{
		x: 41,
		y: 35,
	},
	{
		x: 22,
		y: 36,
	},
	{
		x: 25,
		y: 36,
	},
	{
		x: 26,
		y: 36,
	},
	{
		x: 27,
		y: 36,
	},
	{
		x: 28,
		y: 36,
	},
	{
		x: 29,
		y: 36,
	},
	{
		x: 30,
		y: 36,
	},
	{
		x: 31,
		y: 36,
	},
	{
		x: 32,
		y: 36,
	},
	{
		x: 33,
		y: 36,
	},
	{
		x: 35,
		y: 36,
	},
	{
		x: 36,
		y: 36,
	},
	{
		x: 37,
		y: 36,
	},
	{
		x: 38,
		y: 36,
	},
	{
		x: 40,
		y: 36,
	},
	{
		x: 41,
		y: 36,
	},
	{
		x: 23,
		y: 37,
	},
	{
		x: 24,
		y: 37,
	},
	{
		x: 34,
		y: 37,
	},
	{
		x: 39,
		y: 37,
	},
].reduce((obj, curr) => {
	const grid = asGridCoord(curr.x, curr.y);
	obj[grid] = true;
	return obj;
}, {});

export default VILLAGE_BOUNDARIES;
