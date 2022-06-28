import useHttp from 'hooks/useHttp';
import { useEffect } from 'react';
import * as yup from 'yup';

const useSignInApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();

  const handleSignIn = (body) => {
    sendRequest({
      url: 'https://obtainer-api-server.herokuapp.com/api/user/sign_in',
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  useEffect(() => {
    yup
      .object({
        token: yup.string().required(),
      })
      .isValid(data)
      .then((isValid) => {
        if (!isValid) return;
        localStorage.setItem('AUTHORIZATION', data.token);
      });
  }, [data]);

  return {
    isLoading,
    error,
    handleSignIn,
  };
};

export default useSignInApi;
