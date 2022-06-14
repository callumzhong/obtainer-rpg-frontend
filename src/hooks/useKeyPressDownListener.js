import { useCallback, useEffect } from 'react';

let keySafe = false;
const useKeyPressDownListener = (keyCode, callback) => {
	const keyDownHandler = useCallback(
		(event) => {
			if (event.code === keyCode) {
				if (keySafe) {
					keySafe = false;
					callback();
				}
			}
		},
		[keyCode, callback],
	);

	const keyUpHandler = useCallback(
		(event) => {
			if (event.code === keyCode) {
				keySafe = true;
			}
		},
		[keyCode],
	);

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);
		document.addEventListener('keyup', keyUpHandler);
		return () => {
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('keyup', keyUpHandler);
		};
	}, [keyDownHandler, keyUpHandler]);
};

export default useKeyPressDownListener;
