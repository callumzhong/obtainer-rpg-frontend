import useHttp from 'hooks/useHttp';
import { useEffect } from 'react';
import * as yup from 'yup';

const useSignInApi = () => {
  const { isLoading, data, error, sendRequest, clear } = useHttp();

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

  return {
    error,
    handleSignIn,
  };
};

export default useSignInApi;
