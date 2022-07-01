import PropTypes from 'prop-types';
import React, { useImperativeHandle, useRef } from 'react';
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
      className='cursor-[inherit] touch-none rendering-pixelated'
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
