import useHttp from 'hooks/useHttp';
import { useEffect } from 'react';
import * as yup from 'yup';

const schema = yup
  .object({
    account: yup.string().min(4, '至少 4 個字元').max(12, '最多限制12字元').required('必填'),
    password: yup.string().min(8, '至少 8 個字元').required('必填'),
  })
  .required();

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

export { schema };
export default useSignInApi;
