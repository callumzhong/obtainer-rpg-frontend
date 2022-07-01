import { useEffect, useState } from 'react';

const Camera = (props) => {
  const [detectHW, setDetectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    setDetectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [detectHW]);
  return (
    <div
      className={`absolute inset-0 m-auto  overflow-hidden`}
      children={props.children}
      style={{
        height: detectHW.winHeight > 1200 ? 'none' : ` ${detectHW.winHeight}px`,
        width: detectHW.winWidth > 2160 ? 'none' : ` ${detectHW.winWidth}px`,
      }}
    />
  );
};

export default Camera;
