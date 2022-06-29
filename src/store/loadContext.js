import React, { useState } from 'react';

const LoadContext = React.createContext({
  isLoading: false,
  isSwitchScene: false,
  setLoading: () => {},
  setSwitchScene: () => {},
});

export const LoadContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchScene, setIsSwitchScene] = useState(false);

  const setLoadingHandler = (val) => {
    setIsLoading(val);
  };
  const setSwitchSceneHandler = (val) => {
    setIsSwitchScene(val);
  };

  return (
    <LoadContext.Provider
      value={{
        isLoading,
        isSwitchScene,
        setLoading: setLoadingHandler,
        setSwitchScene: setSwitchSceneHandler,
      }}
    >
      {props.children}
    </LoadContext.Provider>
  );
};

export default LoadContext;
