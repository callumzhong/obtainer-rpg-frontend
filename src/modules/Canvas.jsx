import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
const Canvas = React.forwardRef(({ draw, ...props }, ref) => {
	useEffect(() => {
		const context = ref.current.getContext('2d');
		draw(context);
	}, [draw, ref]);

	return <canvas height={960} width={1160} ref={ref} {...props} />;
});

Canvas.propTypes = {
	draw: PropTypes.func.isRequired,
};
export default Canvas;
