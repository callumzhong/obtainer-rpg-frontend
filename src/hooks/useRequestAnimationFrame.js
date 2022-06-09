const { useRef, useEffect, useCallback } = require('react');

const useRequestAnimationFrame = (callback) => {
	const requestRef = useRef();
	const previousTimeRef = useRef();

	const animate = useCallback(
		(time) => {
			if (previousTimeRef.current) callback(time - previousTimeRef.current);
			previousTimeRef.current = time;
			requestRef.current = requestAnimationFrame(animate);
		},
		[callback],
	);

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => {
			cancelAnimationFrame(requestRef.current);
		};
	}, [animate]);
};

export default useRequestAnimationFrame;
