import React, { useState } from 'react';

const LoadingContext = React.createContext({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoadingHandler = (val) => {
    setIsLoading(val);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading: isLoading,
        setLoading: setLoadingHandler,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
