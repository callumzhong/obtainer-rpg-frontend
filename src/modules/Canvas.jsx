import PropTypes from 'prop-types';
import React, { useImperativeHandle, useRef } from 'react';
import styles from './Canvas.module.css';
const Canvas = React.forwardRef((props, ref) => {
	const canvasRef = useRef();
	useImperativeHandle(ref, () => ({
		draw: (draw) => {
			const ctx = canvasRef.current.getContext('2d');
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			draw(ctx);
		},
	}));

	return (
		<canvas
			className={styles.canvas}
			height={props.height}
			width={props.width}
			ref={canvasRef}
		/>
	);
});

Canvas.propTypes = {
	props: PropTypes.exact({
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
	}),
};
export default Canvas;
