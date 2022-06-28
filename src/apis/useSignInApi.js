import useHttp from 'hooks/useHttp';
import { useContext, useEffect } from 'react';
import LoadingContext from 'store/loadingContext';
import * as yup from 'yup';

const useSignInApi = () => {
  const { isLoading, data, error, sendRequest, clear } = useHttp();
  const loadingCtx = useContext(LoadingContext);

  const handleSignIn = (body) => {
    sendRequest(
      'https://obtainer-api-server.herokuapp.com/api/user/sign_in',
      'POST',
      JSON.stringify(body),
    );
  };

  useEffect(() => {
    yup
      .object()
      .isValid(data)
      .then((isObject) => {
        if (!isObject) return;
        localStorage.setItem('AUTHORIZATION', data.token);
      });
  }, [data]);

  // useEffect(() => {
  //   loadingCtx.setLoading(isLoading);
  // }, [isLoading, loadingCtx]);

  return {
    isLoading,
    error,
    handleSignIn,
  };
};

export default useSignInApi;
