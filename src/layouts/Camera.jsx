import React, { useEffect, useState } from 'react';

const Camera = ({ children }) => {
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
    <div className={`absolute inset-0 m-auto overflow-hidden bg-black`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          detectHW,
        }),
      )}
    </div>
  );
};

export default Camera;
