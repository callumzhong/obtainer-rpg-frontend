import { useCallback, useEffect } from 'react';

const useKeyPressDownListener = (keyCode, callback) => {
	const keyDownHandler = useCallback(
		(event) => {
			if (event.code === keyCode) {
				callback();
			}
		},
		[keyCode, callback],
	);

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler);
		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, [keyDownHandler]);
};

export default useKeyPressDownListener;
