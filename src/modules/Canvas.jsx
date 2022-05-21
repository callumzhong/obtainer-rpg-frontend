import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
const Canvas = React.forwardRef(({ draw, ...props }, ref) => {
	useEffect(() => {
		const context = ref.current.getContext('2d');
		const reader = () => {
			draw(context);
			requestAnimationFrame(reader);
		};
		reader();
	}, [draw, ref]);

	return <canvas ref={ref} {...props} />;
});

Canvas.propTypes = {
	draw: PropTypes.func.isRequired,
};
export default Canvas;
