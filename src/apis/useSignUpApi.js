import useHttp from 'hooks/useHttp';
import { useEffect } from 'react';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('email 格式錯誤').required('必填'),
    password: yup.string().min(8, '至少 8 個字元').required('必填'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '與密碼不一致')
      .required('必填'),
    account: yup.string().min(4, '至少 4 個字元').max(12, '最多限制12字元').required('必填'),
  })
  .required();

const useSignUpApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();

  const handleSignUp = (body) => {
    sendRequest({
      url: 'https://obtainer-api-server.herokuapp.com/api/user/sign_up',
      method: 'POST',
      body: JSON.stringify(body),
    });
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
    isLoading,
    error,
    handleSignUp,
  };
};

export { schema };
export default useSignUpApi;
