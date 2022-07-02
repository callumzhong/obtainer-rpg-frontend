import { useCallback, useEffect } from 'react';

const useKeyPressListener = (
  keyCode,
  keyDownCallback,
  keyUpCallback = () => {},
) => {
  const keyDownHandler = useCallback(
    (event) => {
      if (event.code === keyCode) {
        keyDownCallback();
      }
    },
    [keyCode, keyDownCallback],
  );

  const keyUpHandler = useCallback(
    (event) => {
      if (event.code === keyCode) {
        keyUpCallback();
      }
    },
    [keyCode, keyUpCallback],
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

export default useKeyPressListener;
