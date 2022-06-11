import { useCallback, useEffect } from 'react';
const keyCodeMap = {
	ArrowUp: 'up',
	KeyW: 'up',
	ArrowDown: 'down',
	KeyS: 'down',
	ArrowLeft: 'left',
	KeyA: 'left',
	ArrowRight: 'right',
	KeyD: 'right',
};
let keySafe = true;
const directions = [];
const useKeyPressListener = ({ keyDownCallback, keyUpCallback }) => {
	const keyDownHandler = useCallback(
		(event) => {
			const dir = keyCodeMap[event.code];
			if (dir && directions.indexOf(dir) === -1) {
				directions.unshift(dir);
			}
			keyDownCallback && keyDownCallback(event, keySafe);
		},
		[keyDownCallback],
	);

	const keyUpHandler = useCallback(
		(event) => {
			const dir = keyCodeMap[event.code];
			const index = directions.indexOf(dir);
			if (index > -1) {
				directions.splice(index, 1);
			}
			keyUpCallback && keyUpCallback(event, keySafe);
		},
		[keyUpCallback],
	);

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);
		document.addEventListener('keyup', keyUpHandler);
		return () => {
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('keyup', keyUpHandler);
		};
	}, [keyDownHandler, keyUpHandler]);
	return directions;
};

export default useKeyPressListener;
