import useHttp from 'hooks/useHttp';
import { useEffect } from 'react';
import * as yup from 'yup';

const useSignUpApi = () => {
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  const handleSignUp = (body) => {
    sendRequest(
      'https://obtainer-api-server.herokuapp.com/api/user/sign_up',
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
    handleSignUp,
  };
};

export default useSignUpApi;
